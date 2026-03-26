'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight, Send, Loader2 } from 'lucide-react'

const SCORE_RANGES = [
  { value: 'poor', label: 'Poor (300-579)', description: 'Needs serious work' },
  { value: 'fair', label: 'Fair (580-669)', description: 'Getting there' },
  { value: 'good', label: 'Good (670-739)', description: 'Above average' },
  { value: 'very-good', label: 'Very Good (740-799)', description: 'Almost there' },
  { value: 'excellent', label: 'Excellent (800+)', description: 'Credit is strong' },
]

const GOALS = [
  { value: 'buy-house', label: 'Buy a house' },
  { value: 'buy-car', label: 'Buy a car' },
  { value: 'credit-card', label: 'Get a credit card' },
  { value: 'lower-rate', label: 'Lower interest rates' },
  { value: 'improve-score', label: 'Just improve my score' },
  { value: 'remove-negative', label: 'Remove negative items' },
  { value: 'other', label: 'Other' },
]

const TIMELINES = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3months', label: '1-3 months' },
  { value: '3-6months', label: '3-6 months' },
  { value: '6-12months', label: '6-12 months' },
  { value: 'just-exploring', label: 'Just exploring' },
]

const TRADELINE_INTERESTS = [
  { value: 'yes', label: 'Yes, I want to learn more about tradelines' },
  { value: 'maybe', label: 'Maybe, I need more information first' },
  { value: 'no', label: 'No, I\'m just looking for credit repair help' },
]

export function LeadForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
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
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return
    
    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="cr-card text-center py-12">
        <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
        <h2 className="text-2xl font-bold mb-4">You're All Set!</h2>
        <p className="text-cr-muted mb-6">
          Check your email — we've sent your free credit analysis. 
          A specialist will reach out within 24 hours if you want to chat.
        </p>
        <p className="text-sm text-cr-muted">
          In the meantime, explore our{' '}
          <a href="/dispute" className="text-cr-primary underline">free dispute tools</a>.
        </p>
      </div>
    )
  }

  return (
    <div className="cr-card">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition-colors ${
              s <= step ? 'bg-cr-primary' : 'bg-cr-border'
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Your Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => updateForm('name', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => updateForm('email', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Phone (optional)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => updateForm('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none"
              placeholder="(555) 123-4567"
            />
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!formData.name || !formData.email}
            className="cr-btn cr-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-3">What's your current credit score range?</label>
            <div className="grid grid-cols-1 gap-3">
              {SCORE_RANGES.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateForm('scoreRange', opt.value)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
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
          <button
            onClick={() => setStep(3)}
            disabled={!formData.scoreRange}
            className="cr-btn cr-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-3">What's your main goal?</label>
            <div className="grid grid-cols-1 gap-3">
              {GOALS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateForm('goal', opt.value)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
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

          <div>
            <label className="block font-medium mb-3">When do you need results?</label>
            <div className="grid grid-cols-1 gap-3">
              {TIMELINES.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateForm('timeline', opt.value)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    formData.timeline === opt.value
                      ? 'border-cr-primary bg-cr-primary/5'
                      : 'border-cr-border hover:border-cr-primary/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-3">
              Interested in learning about tradelines? (One of the fastest ways to boost credit)
            </label>
            <div className="grid grid-cols-1 gap-3">
              {TRADELINE_INTERESTS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateForm('tradelineInterest', opt.value)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    formData.tradelineInterest === opt.value
                      ? 'border-cr-primary bg-cr-primary/5'
                      : 'border-cr-border hover:border-cr-primary/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Anything else we should know? (optional)</label>
            <textarea
              value={formData.additionalInfo}
              onChange={e => updateForm('additionalInfo', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none resize-none"
              rows={3}
              placeholder="Any specific negative items, questions, or context..."
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!formData.goal || !formData.timeline || loading}
            className="cr-btn cr-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
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
      )}
    </div>
  )
}
