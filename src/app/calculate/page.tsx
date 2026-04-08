'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calculator, TrendingUp, ArrowLeft, CreditCard, DollarSign, PiggyBank, Target } from 'lucide-react'
import { Nav } from '@/components/Nav'

export default function CalculatorPage() {
  const [currentScore, setCurrentScore] = useState(580)
  const [scenario, setScenario] = useState('pay-debt')
  const [amount, setAmount] = useState(1000)
  const [accounts, setAccounts] = useState(3)
  const [creditAge, setCreditAge] = useState(2)

  // Simplified score impact calculation
  const calculateImpact = () => {
    let impact = 0
    let points = 0
    const factors: string[] = []

    switch (scenario) {
      case 'pay-debt':
        impact = Math.round(amount / 100)
        points = impact
        factors.push(`Paying off $${amount.toLocaleString()} can improve your score by ${points} points`)
        if (currentScore < 600) {
          factors.push('Higher impact for lower scores')
          points += 10
        }
        break
      case 'open-card':
        points = -5
        impact = -5
        factors.push('New account lowers average age')
        factors.push('Hard inquiry reduces score temporarily')
        factors.push('More available credit helps utilization')
        factors.push('Net impact: -5 to +15 over 6 months')
        break
      case 'close-card':
        points = -10
        impact = -10
        factors.push('Reduces available credit')
        factors.push('May increase utilization ratio')
        factors.push('Lowers average account age')
        break
      case 'late-payment':
        points = -50
        impact = -50
        factors.push('A single late payment can drop your score 50+ points')
        factors.push('Impact lasts 7 years on your report')
        factors.push('Recent late payments hurt more')
        break
      case 'dispute-removed':
        points = 20
        impact = 20
        factors.push('Removing a negative item can improve your score')
        factors.push('Impact varies based on other factors')
        factors.push('Collection removals often have the biggest impact')
        break
      case 'reduce-utilization':
        const util = Math.round((amount / 10000) * 100)
        const newUtil = Math.max(10, util - 20)
        points = Math.round((util - newUtil) * 0.5)
        impact = points
        factors.push(`Reducing utilization from ${util}% to ${newUtil}% helps significantly`)
        factors.push('Utilization is 30% of your score')
        break
    }

    const newScore = Math.max(300, Math.min(850, currentScore + points))

    return { impact, points, newScore, factors }
  }

  const result = calculateImpact()

  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      <div className="cr-container py-8">
        <Link href="/tools" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
          <ArrowLeft size={16} />
          Back to Tools
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Credit Score Calculator</h1>
          <p className="text-cr-muted mb-8">
            See how different actions affect your credit score.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input */}
            <div className="cr-card">
              <h2 className="text-xl font-semibold mb-6">Your Scenario</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="cr-label">Current Credit Score</label>
                  <input
                    type="number"
                    className="cr-input"
                    value={currentScore}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val === '') return
                      const num = parseInt(val)
                      if (!isNaN(num)) setCurrentScore(Math.max(300, Math.min(850, num)))
                    }}
                    onBlur={(e) => {
                      const val = e.target.value
                      if (val === '') setCurrentScore(580)
                    }}
                    min={300}
                    max={850}
                  />
                </div>

                <div>
                  <label className="cr-label">What action are you considering?</label>
                  <select
                    className="cr-input"
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                  >
                    <option value="pay-debt">Pay Off Debt</option>
                    <option value="open-card">Open New Credit Card</option>
                    <option value="close-card">Close Credit Card</option>
                    <option value="late-payment">Miss a Payment</option>
                    <option value="dispute-removed">Remove Negative Item</option>
                    <option value="reduce-utilization">Reduce Credit Utilization</option>
                  </select>
                </div>

                {(scenario === 'pay-debt' || scenario === 'reduce-utilization') && (
                  <div>
                    <label className="cr-label">
                      {scenario === 'pay-debt' ? 'Amount to Pay Off' : 'Current Credit Limit'}
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-cr-muted" size={18} />
                      <input
                        type="number"
                        className="cr-input pl-10"
                        value={amount}
                        onChange={(e) => {
                          const val = e.target.value
                          if (val === '') return
                          const num = parseInt(val)
                          if (!isNaN(num)) setAmount(Math.max(0, num))
                        }}
                        onBlur={(e) => {
                          const val = e.target.value
                          if (val === '') setAmount(1000)
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Result */}
            <div className="cr-card">
              <h2 className="text-xl font-semibold mb-6">Estimated Impact</h2>
              
              <div className="text-center mb-6">
                <div className="text-sm text-cr-muted mb-2">Current Score</div>
                <div className="text-4xl font-bold">{currentScore}</div>
              </div>

              <div className="text-center mb-6">
                <div className={`text-2xl font-bold ${result.points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.points >= 0 ? '+' : ''}{result.points} points
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-sm text-cr-muted mb-2">New Score (estimated)</div>
                <div className="text-5xl font-bold text-cr-primary">{result.newScore}</div>
              </div>

              <div className="border-t border-cr-border pt-4">
                <h3 className="font-medium mb-3">Why?</h3>
                <ul className="space-y-2">
                  {result.factors.map((factor, i) => (
                    <li key={i} className="text-sm text-cr-muted flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${result.points >= 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> This calculator provides estimates only. Your actual score impact 
              depends on many factors including your complete credit history, current utilization, 
              payment history, and more.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link href="/dispute" className="cr-btn cr-btn-primary">
              Generate Dispute Letter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}