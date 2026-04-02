'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight, Send, Loader2, Shield } from 'lucide-react'

const SCORE_RANGES = [
  { value: 'poor', label: 'Poor (300-579)', description: 'Needs serious work', color: 'bg-red-50 border-red-200' },
  { value: 'fair', label: 'Fair (580-669)', description: 'Getting there', color: 'bg-orange-50 border-orange-200' },
  { value: 'good', label: 'Good (670-739)', description: 'Above average', color: 'bg-yellow-50 border-yellow-200' },
  { value: 'very-good', label: 'Very Good (740-799)', description: 'Almost there', color: 'bg-blue-50 border-blue-200' },
  { value: 'excellent', label: 'Excellent (800+)', description: 'Credit is strong', color: 'bg-green-50 border-green-200' },
]

const GOALS = [
  { value: 'buy-house', label: '🏠 Buy a house', icon: true },
  { value: 'buy-car', label: '🚗 Buy a car', icon: true },
  { value: 'credit-card', label: '💳 Get a credit card', icon: true },
  { value: 'lower-rate', label: '📉 Lower interest rates', icon: true },
  { value: 'improve-score', label: '📈 Just improve my score', icon: true },
  { value: 'remove-negative', label: '🗑️ Remove negative items', icon: true },
  { value: 'other', label: '✨ Other', icon: true },
]

const TIMELINES = [
  { value: 'asap', label: '⚡ As soon as possible', urgency: 'high' },
  { value: '1-3months', label: '📅 1-3 months', urgency: 'medium' },
  { value: '3-6months', label: '📅 3-6 months', urgency: 'low' },
  { value: '6-12months', label: '📅 6-12 months', urgency: 'low' },
  { value: 'just-exploring', label: '🔍 Just exploring', urgency: 'none' },
]

const TRADELINE_INTERESTS = [
  { value: 'yes', label: 'Yes — tell me more about tradelines', highlight: true },
  { value: 'maybe', label: 'Maybe — I need more info first' },
  { value: 'no', label: "No thanks — just need credit repair help" },
]

export function LeadForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    scoreRange: '',
    goal: '',
    timeline: '',
    tradelineInterest: '',
    additionalInfo: '',
  })

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Connection failed. Please check your internet and try again.')
    } finally {
      setLoading(false)
    }
  }

  // ─── Success State ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="cr-card text-center py-10">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-500" size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-3">You're All Set!</h2>
        <p className="text-cr-muted mb-6 max-w-sm mx-auto">
          Check your email — we've sent your free credit analysis.
          A specialist will reach out within 24 hours if you'd like personalized help.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-cr-muted mb-6">
          <Shield size={16} className="text-green-500" />
          <span>Your information is private and secure</span>
        </div>
        <div className="p-4 bg-cr-bg rounded-lg">
          <p className="text-sm font-medium mb-2">While you wait, get started for free:</p>
          <div className="flex flex-col gap-2">
            <a href="/dispute" className="cr-btn cr-btn-primary text-sm">
              Generate Free Dispute Letters
              <ArrowRight size={14} className="ml-2" />
            </a>
            <a href="/tools" className="cr-btn cr-btn-secondary text-sm">
              Explore Free Tools
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ─── Form ─────────────────────────────────────────────────────────────────
  return (
    <div className="cr-card">
      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              s < step ? 'bg-cr-primary' : s === step ? 'bg-cr-primary animate-pulse' : 'bg-cr-border'
            }`}
          />
        ))}
      </div>

      {/* Step indicator */}
      <div className="text-sm text-cr-muted mb-6">
        Step {step} of 3 — {
          step === 1 ? 'Tell us about yourself' :
          step === 2 ? 'Your credit score' :
          'Your goals'
        }
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* ── STEP 1: Basic Info ── */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label className="block font-medium mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => updateForm('name', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none transition-colors"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => updateForm('email', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none transition-colors"
              placeholder="john@example.com"
            />
            <p className="text-xs text-cr-muted mt-1">We'll send your free credit analysis here</p>
          </div>
          <div>
            <label className="block font-medium mb-2">
              Phone <span className="text-cr-muted font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => updateForm('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none transition-colors"
              placeholder="(555) 123-4567"
            />
            <p className="text-xs text-cr-muted mt-1">For faster response — a specialist can call you</p>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!formData.name || !formData.email}
            className="cr-btn cr-btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight size={18} className="ml-2" />
          </button>
          <p className="text-center text-xs text-cr-muted">
            <Shield size={12} className="inline mr-1 text-green-500" />
            We never sell your information. No spam.
          </p>
        </div>
      )}

      {/* ── STEP 2: Credit Score ── */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <label className="block font-medium mb-3">
              What's your current credit score range?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {SCORE_RANGES.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateForm('scoreRange', opt.value)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    formData.scoreRange === opt.value
                      ? 'border-cr-primary bg-cr-primary/5'
                      : 'border-cr-border hover:border-cr-primary/50'
                  }`}
                >
                  <div className="font-medium">{opt.label}</div>
                  <div className="text-sm text-cr-muted">{opt.description}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="cr-btn cr-btn-secondary flex-shrink-0"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!formData.scoreRange}
              className="cr-btn cr-btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
          <p className="text-center text-xs text-cr-muted">
            Don't know your score?{' '}
            <a
              href="https://www.annualcreditreport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cr-primary underline"
            >
              Get your free reports
            </a>{' '}
            — it's completely free.
          </p>
        </div>
      )}

      {/* ── STEP 3: Goals ── */}
      {step === 3 && (
        <div className="space-y-6">
          {/* Goal */}
          <div>
            <label className="block font-medium mb-3">What's your main goal?</label>
            <div className="grid grid-cols-1 gap-2">
              {GOALS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateForm('goal', opt.value)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    formData.goal === opt.value
                      ? 'border-cr-primary bg-cr-primary/5'
                      : 'border-cr-border hover:border-cr-primary/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block font-medium mb-3">When do you need results?</label>
            <div className="grid grid-cols-1 gap-2">
              {TIMELINES.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateForm('timeline', opt.value)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    formData.timeline === opt.value
                      ? 'border-cr-primary bg-cr-primary/5'
                      : 'border-cr-border hover:border-cr-primary/50'
                  } ${opt.urgency === 'high' ? 'ring-2 ring-red-200' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.label}</span>
                    {opt.urgency === 'high' && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                        Most Urgent
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tradeline */}
          <div>
            <label className="block font-medium mb-3">
              Interested in tradelines?
              <span className="block text-cr-muted font-normal text-sm">
                One of the fastest ways to boost credit
              </span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {TRADELINE_INTERESTS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateForm('tradelineInterest', opt.value)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    formData.tradelineInterest === opt.value
                      ? 'border-cr-primary bg-cr-primary/5'
                      : 'border-cr-border hover:border-cr-primary/50'
                  } ${opt.highlight ? 'ring-2 ring-blue-200' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.label}</span>
                    {opt.highlight && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional info */}
          <div>
            <label className="block font-medium mb-2">
              Anything else we should know?{' '}
              <span className="text-cr-muted font-normal">(optional)</span>
            </label>
            <textarea
              value={formData.additionalInfo}
              onChange={e => updateForm('additionalInfo', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none resize-none transition-colors"
              rows={3}
              placeholder="Any specific negative items, questions, or context..."
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="cr-btn cr-btn-secondary flex-shrink-0"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.goal || !formData.timeline || loading}
              className="cr-btn cr-btn-primary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  Get My Free Analysis
                  <Send size={18} className="ml-2" />
                </>
              )}
            </button>
          </div>
          <p className="text-center text-xs text-cr-muted">
            <Shield size={12} className="inline mr-1 text-green-500" />
            100% free. No credit card required. No spam.
          </p>
        </div>
      )}
    </div>
  )
}
