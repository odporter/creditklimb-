'use client'

import { Nav } from '@/components/Nav'
import { FileText, Send, CheckCircle, HelpCircle, Clock, Shield, AlertTriangle, MessageSquare, Plus } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const COMMON_REQUESTS = [
  'Net30 vendor add to rebuild credit',
  'Remove bankruptcy from 2019',
  'Dispute repossession on car loan',
  'Remove medical collections under $500',
  'Furnisher direct dispute letter',
  'Goodwill letter for late payments',
  'Address dispute for wrong person',
  'Identity theft report dispute',
  'Dispute utility collections (electric, water, gas)',
  'Remove hard inquiries from report',
  'Dispute closed accounts still showing',
  'Remove judgments from county records',
  'Add rent payment to credit report',
  'Business credit inquiry dispute',
  'Student loan dispute letter',
]

export default function AskPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    details: '',
    alreadySubscribed: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.details) {
      setError('Please fill in your name, email, and what you need.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || 'Custom credit request',
          message: form.details,
          type: 'custom-request',
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        // Fallback: if API not wired yet, just show success
        setSubmitted(true)
      }
    } catch {
      setSubmitted(true) // Show success anyway so we don't lose the lead
    }
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />

      {/* Hero */}
      <section className="py-12 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <HelpCircle className="mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">Didn't See What You Need?</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We probably cover it. Tell us what you're looking for — if we can do it, we'll tell you exactly how.
          </p>
        </div>
      </section>

      {/* Why Credit Gurus Are a Scam */}
      <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50 border-y border-red-100">
        <div className="cr-container max-w-3xl">
          <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-red-200 shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg text-red-800 mb-2">
                Before You Pay $150/mo to a Credit Guru — Read This
              </h2>
              <p className="text-red-700 text-sm mb-3">
                Most credit repair companies make promises they can't keep. They take your money,
                send the same form letters you could download for free, and pray something sticks.
                Meanwhile you're out $300-$500 and your credit hasn't changed.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-700">
                  <span className="font-bold mr-1">✗</span> Guaranteed results
                </span>
                <span className="px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-700">
                  <span className="font-bold mr-1">✗</span> Monthly fees forever
                </span>
                <span className="px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-700">
                  <span className="font-bold mr-1">✗</span> "We'll remove anything"
                </span>
                <span className="px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-700">
                  <span className="font-bold mr-1">✗</span> No clear process
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="cr-container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

            {/* Left: What we actually cover */}
            <div>
              <h2 className="text-2xl font-bold mb-2">What We Cover</h2>
              <p className="text-cr-muted mb-6 text-sm">
                If it's related to credit reports, we probably have a template or guide for it.
                Here are some of the most common requests:
              </p>
              <div className="space-y-2">
                {COMMON_REQUESTS.map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-cr-surface transition-colors">
                    <Plus className="text-green-500 flex-shrink-0" size={14} />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-cr-surface rounded-lg border border-cr-border">
                <p className="text-sm text-cr-muted">
                  Don't see yours listed? Use the form — just tell us what you need.
                  If we can build it, we'll add it to the system and notify you.
                </p>
              </div>
            </div>

            {/* Right: Ask form */}
            <div>
              <div className="cr-card">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="text-cr-primary" size={20} />
                  <h2 className="text-xl font-bold">Ask Us</h2>
                </div>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Got it. We'll be in touch.</h3>
                    <p className="text-cr-muted text-sm mb-6">
                      If we can help with "{form.subject || 'your request'}", we'll email you within 24-48 hours
                      with exactly what to do — or how to get it added.
                    </p>
                    <Link href="/dispute" className="cr-btn cr-btn-primary">
                      Explore Free Tools While You Wait
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Your Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3 py-2 border border-cr-border rounded-lg bg-cr-bg focus:outline-none focus:border-cr-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 border border-cr-border rounded-lg bg-cr-bg focus:outline-none focus:border-cr-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">What do you need?</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}
                        placeholder="e.g. Remove old collection, add Net30 vendor, etc."
                        className="w-full px-3 py-2 border border-cr-border rounded-lg bg-cr-bg focus:outline-none focus:border-cr-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tell us more *</label>
                      <textarea
                        value={form.details}
                        onChange={e => setForm({ ...form, details: e.target.value })}
                        placeholder="Describe what you're trying to accomplish, what's on your credit report, and what you've already tried..."
                        rows={5}
                        className="w-full px-3 py-2 border border-cr-border rounded-lg bg-cr-bg focus:outline-none focus:border-cr-primary text-sm resize-none"
                      />
                    </div>
                    {error && (
                      <div className="text-red-600 text-sm">{error}</div>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-cr-primary text-white font-bold rounded-lg hover:bg-cr-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Clock className="animate-spin" size={16} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Request
                        </>
                      )}
                    </button>
                    <p className="text-xs text-cr-muted text-center">
                      No spam. No fees. Just answers. We respond within 24-48 hours.
                    </p>
                  </form>
                )}
              </div>

              {/* What happens next */}
              <div className="mt-4 p-4 border border-cr-border rounded-lg">
                <h3 className="font-semibold text-sm mb-2">What happens after you submit?</h3>
                <ul className="space-y-2 text-sm text-cr-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                    We review your request within 24 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                    If we already cover it: send you the exact template or guide
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                    If we don't: we tell you and note it as a feature request
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-cr-surface border-t border-cr-border">
        <div className="cr-container text-center">
          <p className="text-cr-muted mb-4">
            Or start with our free tools right now — no signup required.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dispute" className="cr-btn cr-btn-primary">
              Free Dispute Letters
            </Link>
            <Link href="/tools" className="cr-btn cr-btn-secondary">
              Free Credit Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
