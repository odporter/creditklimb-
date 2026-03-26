'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, DollarSign, TrendingDown, Target, Zap } from 'lucide-react'
import { Nav } from '@/components/Nav'

interface Debt {
  id: string
  name: string
  balance: number
  interestRate: number
  minimumPayment: number
}

type Strategy = 'avalanche' | 'snowball'

export default function DebtPage() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card', balance: 5000, interestRate: 22.99, minimumPayment: 150 },
    { id: '2', name: 'Car Loan', balance: 12000, interestRate: 6.5, minimumPayment: 280 },
    { id: '3', name: 'Student Loan', balance: 25000, interestRate: 4.5, minimumPayment: 250 },
  ])
  const [extraPayment, setExtraPayment] = useState(200)
  const [strategy, setStrategy] = useState<Strategy>('avalanche')

  const addDebt = () => {
    setDebts(prev => [
      ...prev,
      { id: Date.now().toString(), name: '', balance: 0, interestRate: 0, minimumPayment: 0 }
    ])
  }

  const removeDebt = (id: string) => {
    setDebts(prev => prev.filter(d => d.id !== id))
  }

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(prev => prev.map(d =>
      d.id === id ? { ...d, [field]: field === 'name' ? value : Number(value) } : d
    ))
  }

  // Sort debts by strategy
  const sortedDebts = [...debts].sort((a, b) => {
    if (strategy === 'avalanche') {
      return b.interestRate - a.interestRate // Highest interest first
    } else {
      return a.balance - b.balance // Smallest balance first
    }
  })

  // Calculate payoff
  const calculatePayoff = () => {
    const debtData = sortedDebts.map(d => ({
      ...d,
      balance: d.balance,
      monthlyRate: d.interestRate / 100 / 12,
      payment: d.minimumPayment,
    }))

    let months = 0
    let totalInterest = 0
    const extraPerMonth = extraPayment
    let currentExtra = extraPerMonth

    while (debtData.some(d => d.balance > 0) && months < 600) {
      months++
      
      // Apply minimum payments and interest
      for (const debt of debtData) {
        if (debt.balance <= 0) continue
        const interest = debt.balance * debt.monthlyRate
        totalInterest += interest
        debt.balance = debt.balance + interest - debt.payment
        if (debt.balance < 0) debt.balance = 0
      }

      // Apply extra payment to target debt
      for (let i = 0; i < debtData.length; i++) {
        const debt = debtData[i]
        if (debt.balance <= 0) continue
        
        const extraToApply = currentExtra
        debt.balance -= extraToApply
        currentExtra -= extraToApply
        
        if (debt.balance <= 0) {
          // This debt is paid off! Roll its payment + extra to next debt
          currentExtra += debt.payment
        }
        break
      }
    }

    const monthlyPayment = sortedDebts.reduce((sum, d) => sum + d.minimumPayment, 0)
    const totalPaid = sortedDebts.reduce((sum, d) => sum + d.balance + (d.balance * d.interestRate / 100 / 12 * months), 0) + totalInterest

    return { months, totalInterest, monthlyPayment: monthlyPayment + extraPayment }
  }

  const result = calculatePayoff()

  const formatMonths = (m: number) => {
    const years = Math.floor(m / 12)
    const months = m % 12
    if (years === 0) return `${months} months`
    if (months === 0) return `${years} year${years > 1 ? 's' : ''}`
    return `${years}y ${months}m`
  }

  const debtOrderLabel = strategy === 'avalanche' 
    ? 'Highest interest rate first (save the most money)'
    : 'Smallest balance first (quick psychological wins)'

  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      <div className="cr-container py-8">
        <Link href="/tools" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
          <ArrowLeft size={16} />
          Back to Tools
        </Link>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Debt Payoff Planner</h1>
          <p className="text-cr-muted mb-8">
            Create a custom debt payoff plan using the avalanche or snowball method.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Strategy Selection */}
              <div className="cr-card">
                <h2 className="text-lg font-semibold mb-4">Payoff Strategy</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setStrategy('avalanche')}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      strategy === 'avalanche' 
                        ? 'border-cr-primary bg-cr-primary/5' 
                        : 'border-cr-border hover:border-cr-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className={`${strategy === 'avalanche' ? 'text-cr-primary' : 'text-cr-muted'}`} size={20} />
                      <span className="font-semibold">Avalanche</span>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Saves most</span>
                    </div>
                    <p className="text-sm text-cr-muted">Pay highest interest rate first</p>
                  </button>
                  <button
                    onClick={() => setStrategy('snowball')}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      strategy === 'snowball' 
                        ? 'border-cr-primary bg-cr-primary/5' 
                        : 'border-cr-border hover:border-cr-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className={`${strategy === 'snowball' ? 'text-cr-primary' : 'text-cr-muted'}`} size={20} />
                      <span className="font-semibold">Snowball</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">Quick wins</span>
                    </div>
                    <p className="text-sm text-cr-muted">Pay smallest balance first</p>
                  </button>
                </div>
                <p className="text-sm text-cr-muted mt-3">
                  {debtOrderLabel}
                </p>
              </div>

              {/* Debts */}
              <div className="cr-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Your Debts</h2>
                  <button
                    onClick={addDebt}
                    className="flex items-center gap-1 text-sm text-cr-primary hover:text-cr-primary/80"
                  >
                    <Plus size={16} /> Add Debt
                  </button>
                </div>

                <div className="space-y-4">
                  {debts.map(debt => (
                    <div key={debt.id} className="flex flex-wrap gap-3 items-end p-4 bg-cr-bg rounded-lg">
                      <div className="flex-1 min-w-32">
                        <label className="text-xs text-cr-muted block mb-1">Debt Name</label>
                        <input
                          type="text"
                          value={debt.name}
                          onChange={e => updateDebt(debt.id, 'name', e.target.value)}
                          placeholder="Credit Card"
                          className="w-full px-3 py-2 rounded border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none text-sm"
                        />
                      </div>
                      <div className="w-28">
                        <label className="text-xs text-cr-muted block mb-1">Balance ($)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-cr-muted" size={14} />
                          <input
                            type="number"
                            value={debt.balance}
                            onChange={e => updateDebt(debt.id, 'balance', e.target.value)}
                            className="w-full pl-8 pr-2 py-2 rounded border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none text-sm"
                          />
                        </div>
                      </div>
                      <div className="w-24">
                        <label className="text-xs text-cr-muted block mb-1">APR (%)</label>
                        <input
                          type="number"
                          value={debt.interestRate}
                          onChange={e => updateDebt(debt.id, 'interestRate', e.target.value)}
                          step="0.01"
                          className="w-full px-3 py-2 rounded border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none text-sm"
                        />
                      </div>
                      <div className="w-28">
                        <label className="text-xs text-cr-muted block mb-1">Min Payment ($)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-cr-muted" size={14} />
                          <input
                            type="number"
                            value={debt.minimumPayment}
                            onChange={e => updateDebt(debt.id, 'minimumPayment', e.target.value)}
                            className="w-full pl-8 pr-2 py-2 rounded border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none text-sm"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => removeDebt(debt.id)}
                        className="p-2 text-cr-muted hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Payment */}
              <div className="cr-card">
                <h2 className="text-lg font-semibold mb-4">Extra Monthly Payment</h2>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-xs">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-cr-muted" size={18} />
                    <input
                      type="number"
                      value={extraPayment}
                      onChange={e => setExtraPayment(Number(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none text-lg"
                    />
                  </div>
                  <span className="text-cr-muted">per month above minimums</span>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="space-y-6">
              <div className="cr-card bg-gradient-to-br from-cr-primary to-blue-700 text-white">
                <div className="text-center mb-4">
                  <Target className="mx-auto mb-2" size={32} />
                  <div className="text-sm opacity-80">Time to be debt-free</div>
                  <div className="text-4xl font-bold">{formatMonths(result.months)}</div>
                </div>
                <div className="space-y-3 border-t border-white/20 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-80">Total Interest</span>
                    <span className="font-semibold">{`$${result.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-80">Monthly Payment</span>
                    <span className="font-semibold">{`${result.monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}</span>
                  </div>
                </div>
              </div>

              <div className="cr-card">
                <h3 className="font-semibold mb-4">Payoff Order</h3>
                <div className="space-y-3">
                  {sortedDebts.filter(d => d.balance > 0).map((debt, i) => (
                    <div key={debt.id} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        i === 0 ? 'bg-cr-primary text-white' : 'bg-cr-surface text-cr-muted'
                      }`}>
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{debt.name || 'Unnamed'}</div>
                        <div className="text-xs text-cr-muted">{`${debt.balance.toLocaleString()} @ ${debt.interestRate}% APR`}</div>
                      </div>
                      {i === 0 && (
                        <span className="text-xs text-cr-primary font-medium">Focus</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="cr-card bg-green-50 border-green-200">
                <h3 className="font-semibold mb-2 text-green-800">How it works</h3>
                <ol className="text-sm text-green-700 space-y-1">
                  <li>1. Pay minimums on all debts</li>
                  <li>2. Put extra {`${extraPayment}`}/month toward #1</li>
                  <li>3. When #1 is paid, roll its payment to #2</li>
                  <li>4. Repeat until debt-free!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
