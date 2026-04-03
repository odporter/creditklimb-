'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, ArrowLeft, Plus, Minus, RefreshCw, Target } from 'lucide-react'
import { Nav } from '@/components/Nav'

interface Scenario {
  id: string
  name: string
  type: 'positive' | 'negative' | 'neutral'
  points: number
  description: string
}

const SCENARIOS: Scenario[] = [
  { id: 'dispute-remove', name: 'Negative Item Removed', type: 'positive', points: 25, description: 'A collection, late payment, or charge-off is removed from your report' },
  { id: 'pay-collection', name: 'Pay Off Collection', type: 'positive', points: 10, description: 'Paying off a collection account' },
  { id: 'new-card', name: 'Open New Credit Card', type: 'neutral', points: -5, description: 'Hard inquiry + new account lowers average age temporarily' },
  { id: 'authorized-user', name: 'Become Authorized User', type: 'positive', points: 20, description: 'Added as authorized user on old established account' },
  { id: 'utilization-30', name: 'Lower Utilization to 30%', type: 'positive', points: 15, description: 'Reduce credit card balances to under 30% of limit' },
  { id: 'utilization-10', name: 'Lower Utilization to 10%', type: 'positive', points: 20, description: 'Aggressively reduce balances to under 10% of limit' },
  { id: 'late-payment', name: 'Late Payment (30 days)', type: 'negative', points: -40, description: 'A single 30-day late payment on your report' },
  { id: 'hard-inquiry', name: 'Hard Inquiry', type: 'negative', points: -5, description: 'New credit application creates a hard inquiry' },
  { id: 'close-card', name: 'Close Credit Card', type: 'negative', points: -15, description: 'Closing an old credit card reduces available credit and account age' },
  { id: 'bankruptcy', name: 'Bankruptcy Removed', type: 'positive', points: 50, description: 'Bankruptcy falls off or is discharged' },
]

export default function SimulatePage() {
  const [currentScore, setCurrentScore] = useState(620)
  const [appliedScenarios, setAppliedScenarios] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'add' | 'applied'>('add')

  const toggleScenario = (id: string) => {
    setAppliedScenarios(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const calculateNewScore = () => {
    const changes = appliedScenarios.reduce((sum, id) => {
      const scenario = SCENARIOS.find(s => s.id === id)
      return sum + (scenario?.points || 0)
    }, 0)
    return Math.max(300, Math.min(850, currentScore + changes))
  }

  const totalChange = appliedScenarios.reduce((sum, id) => {
    const scenario = SCENARIOS.find(s => s.id === id)
    return sum + (scenario?.points || 0)
  }, 0)

  const newScore = calculateNewScore()

  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      <div className="cr-container py-8">
        <Link href="/tools" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
          <ArrowLeft size={16} />
          Back to Tools
        </Link>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Credit Score Simulator</h1>
          <p className="text-cr-muted mb-8">
            See how different actions stack up and affect your credit score.
          </p>

          {/* Current Score */}
          <div className="cr-card mb-8">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                <div className="text-sm text-cr-muted mb-1">Current Score</div>
                <input
                  type="number"
                  value={currentScore}
                  onChange={(e) => {
                    const val = e.target.value
                    if (val === '') return // Let user backspace to empty
                    const num = parseInt(val)
                    if (!isNaN(num)) setCurrentScore(Math.max(300, Math.min(850, num)))
                  }}
                  onBlur={(e) => {
                    const val = e.target.value
                    if (val === '') setCurrentScore(620) // Reset to default on empty blur
                  }}
                  className="text-4xl font-bold bg-transparent border-b-2 border-cr-primary focus:outline-none w-32"
                  min={300}
                  max={850}
                />
              </div>
              <div className="text-center">
                <div className="text-sm text-cr-muted mb-1">Simulated Score</div>
                <div className={`text-4xl font-bold ${newScore >= currentScore ? 'text-green-600' : 'text-red-600'}`}>
                  {newScore}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-cr-muted mb-1">Total Change</div>
                <div className={`text-4xl font-bold ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalChange >= 0 ? '+' : ''}{totalChange}
                </div>
              </div>
              <button
                onClick={() => setAppliedScenarios([])}
                className="flex items-center gap-2 px-4 py-2 text-cr-muted hover:text-cr-text"
              >
                <RefreshCw size={16} />
                Reset
              </button>
            </div>
          </div>

          {/* Score Range Indicator */}
          <div className="mb-8">
            <div className="h-4 rounded-full bg-gradient-to-r from-red-500 through-yellow-500 to-green-500 relative">
              <div 
                className="absolute top-0 w-3 h-6 bg-white border-2 border-cr-text rounded-full -translate-x-1/2 transition-all"
                style={{ left: `${((currentScore - 300) / 550) * 100}%` }}
              />
              <div 
                className="absolute top-0 w-3 h-6 bg-white border-2 border-cr-primary rounded-full -translate-x-1/2 transition-all"
                style={{ left: `${((newScore - 300) / 550) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-cr-muted mt-2">
              <span>300</span>
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Excellent</span>
              <span>850</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-cr-border">
            <button
              onClick={() => setActiveTab('add')}
              className={`pb-3 px-2 font-medium ${activeTab === 'add' ? 'border-b-2 border-cr-primary text-cr-primary' : 'text-cr-muted'}`}
            >
              + Add Actions
            </button>
            <button
              onClick={() => setActiveTab('applied')}
              className={`pb-3 px-2 font-medium ${activeTab === 'applied' ? 'border-b-2 border-cr-primary text-cr-primary' : 'text-cr-muted'}`}
            >
              Applied ({appliedScenarios.length})
            </button>
          </div>

          {/* Scenario Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {activeTab === 'add' ? (
              SCENARIOS.map(scenario => (
                <button
                  key={scenario.id}
                  onClick={() => toggleScenario(scenario.id)}
                  className={`cr-card text-left hover:border-cr-primary transition-colors ${
                    appliedScenarios.includes(scenario.id) ? 'border-cr-primary bg-cr-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        scenario.type === 'positive' ? 'bg-green-100 text-green-600' :
                        scenario.type === 'negative' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {scenario.type === 'positive' ? <Plus size={16} /> :
                         scenario.type === 'negative' ? <Minus size={16} /> :
                         <RefreshCw size={16} />}
                      </div>
                      <div>
                        <div className="font-medium">{scenario.name}</div>
                        <div className="text-sm text-cr-muted">{scenario.description}</div>
                      </div>
                    </div>
                    <div className={`font-bold ${
                      scenario.points >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {scenario.points >= 0 ? '+' : ''}{scenario.points}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              appliedScenarios.length === 0 ? (
                <div className="col-span-2 text-center py-12 text-cr-muted">
                  No actions applied yet. Go to "Add Actions" to simulate changes.
                </div>
              ) : (
                SCENARIOS.filter(s => appliedScenarios.includes(s.id)).map(scenario => (
                  <button
                    key={scenario.id}
                    onClick={() => toggleScenario(scenario.id)}
                    className="cr-card text-left hover:border-red-500 transition-colors border-cr-primary bg-cr-primary/5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          scenario.type === 'positive' ? 'bg-green-100 text-green-600' :
                          scenario.type === 'negative' ? 'bg-red-100 text-red-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          <Minus size={16} />
                        </div>
                        <div>
                          <div className="font-medium">{scenario.name}</div>
                          <div className="text-sm text-cr-muted">{scenario.description}</div>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        scenario.points >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {scenario.points >= 0 ? '+' : ''}{scenario.points}
                      </div>
                    </div>
                  </button>
                ))
              )
            )}
          </div>

          {/* Actions Summary */}
          {appliedScenarios.length > 0 && (
            <div className="mt-8 cr-card bg-cr-surface">
              <h3 className="font-semibold mb-4">Applied Actions Summary</h3>
              <div className="flex flex-wrap gap-2">
                {appliedScenarios.map(id => {
                  const s = SCENARIOS.find(s => s.id === id)
                  return s ? (
                    <span key={id} className="inline-flex items-center gap-2 px-3 py-1 bg-cr-primary/10 text-cr-primary rounded-full text-sm">
                      {s.name}
                      <button onClick={() => toggleScenario(id)} className="hover:text-red-500">
                        ×
                      </button>
                    </span>
                  ) : null
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
