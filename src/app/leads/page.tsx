'use client'

import { useState, useEffect, useRef } from 'react'
import { Nav } from '@/components/Nav'
import { LeadForm } from '@/components/LeadForm'
import { Shield, CheckCircle, ArrowRight, Zap, Clock, X, Loader2, Send } from 'lucide-react'

const POPUP_ITEMS = [
  'Personalized credit analysis',
  'Step-by-step action plan',
  'Which items to dispute first',
  'Score range assessment',
  'Free dispute letter access',
  'Priority support if desired',
]

export default function LeadsPage() {
  const [popupVisible, setPopupVisible] = useState(false)
  const [popupEmail, setPopupEmail] = useState('')
  const [popupSubmitting, setPopupSubmitting] = useState(false)
  const [popupDone, setPopupDone] = useState(false)
  const popupShownRef = useRef(false)

  useEffect(() => {
    if (popupShownRef.current) return
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !popupShownRef.current) {
        popupShownRef.current = true
        setPopupVisible(true)
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!popupEmail) return
    setPopupSubmitting(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: popupEmail, source: 'exit-intent' }),
      })
    } catch {}
    setPopupSubmitting(false)
    setPopupDone(true)
    setTimeout(() => setPopupVisible(false), 2500)
  }

  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />

      {/* Exit-Intent Popup */}
      {popupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setPopupVisible(false)}
              className="absolute top-4 right-4 text-cr-muted hover:text-cr-text"
            >
              <X size={20} />
            </button>
            {!popupDone ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-cr-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-cr-primary" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Wait! Get your free credit analysis before you go</h2>
                  <p className="text-cr-muted">
                    Enter your email and we'll send you a personalized breakdown of what's hurting your credit score.
                  </p>
                </div>
                <form onSubmit={handlePopupSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={popupEmail}
                    onChange={e => setPopupEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none"
                    placeholder="your@email.com"
                    required
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={popupSubmitting}
                    className="cr-btn cr-btn-primary w-full py-3 disabled:opacity-50"
                  >
                    {popupSubmitting ? <Loader2 size={18} className="animate-spin mx-auto" /> : <><Send size={16} className="inline mr-2" />Send My Free Analysis</>}
                  </button>
                  <p className="text-center text-xs text-cr-muted">No spam. Unsubscribe anytime.</p>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="text-green-500 mx-auto mb-3" size={48} />
                <h3 className="text-xl font-bold mb-2">You're in!</h3>
                <p className="text-cr-muted">Check your email for your free credit analysis.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sticky mobile CTA */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white border-t border-cr-border p-3 md:hidden shadow-lg">
        <a href="#get-started" className="cr-btn cr-btn-primary w-full text-center block">
          Get My Free Analysis →
        </a>
      </div>
      
      <section className="py-16" id="get-started">
        <div className="cr-container max-w-2xl">
          <div className="text-center mb-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <Zap size={16} />
              100% Free — No Credit Card Required
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your Free Credit Analysis
            </h1>
            <p className="text-cr-muted text-lg mb-6">
              Answer 3 quick questions and we'll show you exactly what's hurting your credit —
              plus send you a personalized action plan at no cost.
            </p>

            {/* Urgency + trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-cr-muted mb-2">
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-green-500" />
                <span>No credit card needed</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield size={14} className="text-green-500" />
                <span>Data stays private</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-green-500" />
                <span>3 minutes to complete</span>
              </div>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cr-surface border border-cr-border rounded-full text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Specialists available — response within 24 hours
              </span>
            </div>
          </div>

          <LeadForm />

          {/* What you get */}
          <div className="mt-8 p-4 bg-cr-surface rounded-xl border border-cr-border">
            <h3 className="font-semibold mb-3 text-center">What you'll receive:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {POPUP_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
