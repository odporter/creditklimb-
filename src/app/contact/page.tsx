'use client'

import { useState } from 'react'
import { Nav } from '@/components/Nav'
import { Mail, Phone, Clock, Send, CheckCircle, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to send message. Please try again.')
      }
    } catch {
      setError('Connection failed. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />

      {/* Hero */}
      <section className="py-12 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl opacity-90">We typically respond within 24 hours</p>
        </div>
      </section>

      <section className="py-16">
        <div className="cr-container">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Contact Options</h2>
                <div className="space-y-4">
                  <div className="cr-card flex items-start gap-4">
                    <Mail className="text-cr-primary flex-shrink-0 mt-1" size={24} />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:support@creditklimb.com" className="text-cr-primary hover:underline">
                        support@creditklimb.com
                      </a>
                    </div>
                  </div>
                  <div className="cr-card flex items-start gap-4">
                    <Phone className="text-cr-primary flex-shrink-0 mt-1" size={24} />
                    <div>
                      <div className="font-medium">Phone</div>
                      <a href="tel:+15042985783" className="text-cr-primary hover:underline">(504) 298-5783</a>
                      <p className="text-sm text-cr-muted mt-1">Mon-Fri 9am-6pm CST</p>
                    </div>
                  </div>
                  <div className="cr-card flex items-start gap-4">
                    <Clock className="text-cr-primary flex-shrink-0 mt-1" size={24} />
                    <div>
                      <div className="font-medium">Response Time</div>
                      <p className="text-cr-muted">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Common Questions</h2>
                <div className="cr-card space-y-3">
                  {[
                    {
                      q: 'How long does credit repair take?',
                      a: 'Typically 3-6 months for noticeable results. The bureaus have 30 days to investigate by law.',
                    },
                    {
                      q: 'Do you offer refunds?',
                      a: 'Yes — Premium and Enterprise plans have a 30-day money-back guarantee if you are not satisfied.',
                    },
                    {
                      q: 'Is credit repair legal?',
                      a: 'Absolutely. The FCRA gives you the legal right to dispute inaccurate information on your credit report.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="border-b border-cr-border pb-3 last:border-0 last:pb-0">
                      <div className="font-medium text-sm">{item.q}</div>
                      <div className="text-cr-muted text-sm">{item.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            {submitted ? (
              <div className="cr-card text-center py-12">
                <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
                <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                <p className="text-cr-muted mb-6">
                  Thanks, {formData.name}. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="cr-btn cr-btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="cr-card">
                <h2 className="text-xl font-bold mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => handleChange('name', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => handleChange('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={e => handleChange('subject', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none"
                    >
                      <option value="general">General inquiry</option>
                      <option value="support">Technical support</option>
                      <option value="billing">Billing question</option>
                      <option value="partnership">Partnership opportunity</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={e => handleChange('message', e.target.value)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none resize-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="cr-btn cr-btn-primary w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
