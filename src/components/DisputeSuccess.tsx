'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, Mail, ArrowRight, Clock, FileText } from 'lucide-react'

const TIER_INFO: Record<string, { name: string; color: string; includes: string[]; nextTier?: { name: string; price: number; id: string } }> = {
  starter: {
    name: 'Starter',
    color: 'from-gray-500 to-gray-600',
    includes: ['1 dispute letter', '1 bureau of your choice', 'Step-by-step instructions'],
    nextTier: { name: 'Full Repair', price: 29, id: 'full' },
  },
  full: {
    name: 'Full Repair',
    color: 'from-blue-600 to-blue-700',
    includes: ['All bureau dispute letters', 'Furnisher notices', 'All sub-bureaus', 'Pay-for-delete templates', '60-day escalation letters'],
    nextTier: { name: 'Mail Service', price: 49, id: 'mail-service' },
  },
  'mail-service': {
    name: 'We Handle It',
    color: 'from-blue-700 to-blue-800',
    includes: ['We mail everything', 'Certified tracking', 'Dedicated advisor', 'Money-back guarantee', 'We handle all follow-ups'],
  },
}

export default function DisputeSuccessPage({ tier }: { tier: string }) {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const tierInfo = TIER_INFO[tier] || TIER_INFO['starter']

  // Auto-email the letter after payment
  useEffect(() => {
    if (sessionId) {
      fetch(`/api/stripe/checkout?session_id=${sessionId}`)
        .then(r => r.json())
        .then(data => {
          if (data.customerEmail) setEmail(data.customerEmail)
        })
        .catch(() => {})
    }
  }, [sessionId])

  const sendLetterEmail = async () => {
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/dispute/deliver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, email, sessionId })
      })
      setSent(true)
    } catch {
      alert('Could not send — contact support@creditklimb.com')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cr-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="cr-container text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Payment confirmed!</h1>
          <p className="text-xl opacity-90">
            Your {tierInfo.name} access is ready.
          </p>
        </div>
      </div>

      <div className="cr-container py-12 max-w-2xl">
        {/* What's included */}
        <div className="cr-card mb-8">
          <h2 className="text-xl font-bold mb-4">What's included in {tierInfo.name}</h2>
          <ul className="space-y-2">
            {tierInfo.includes.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Email delivery */}
        <div className="cr-card mb-8">
          <div className="flex items-start gap-3 mb-4">
            <Mail className="text-cr-primary mt-1 flex-shrink-0" size={20} />
            <div>
              <h2 className="font-bold">Your letters are ready</h2>
              <p className="text-cr-muted text-sm">
                Enter your email to receive all letters immediately as downloadable files.
                {email && <span className="block mt-1 text-green-600">Found: {email}</span>}
              </p>
            </div>
          </div>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <CheckCircle size={24} className="text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-green-800">Letters sent!</p>
              <p className="text-sm text-green-600">Check your inbox. Also check spam.</p>
            </div>
          ) : (
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-cr-surface border border-cr-border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-cr-primary focus:outline-none"
              />
              <button
                onClick={sendLetterEmail}
                disabled={!email || loading}
                className="px-6 py-2 bg-cr-primary text-white font-semibold rounded-lg hover:bg-cr-primary/90 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Clock size={16} className="animate-spin" /> : <Download size={16} />}
                Send My Letters
              </button>
            </div>
          )}
        </div>

        {/* Upgrade offer */}
        {tierInfo.nextTier && (
          <div className="cr-card bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-700/30 mb-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-1">Upgrade available</div>
                <h3 className="font-bold text-white">{tierInfo.nextTier.name}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Get everything — bureaus, furnishers, sub-bureaus, escalation letters.
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-white">${tierInfo.nextTier.price}</div>
                <Link
                  href={`/dispute/${tierInfo.nextTier.id}`}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 justify-end"
                >
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Land Freedom System cross-sell */}
        <div className="cr-card bg-[#0A1A0F] border-green-800/50 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <div className="text-xs font-bold text-green-400 uppercase tracking-wide mb-1">Now Building →</div>
              <h3 className="font-bold text-white mb-1">Land Freedom System™</h3>
              <p className="text-gray-400 text-sm">
                Own your own acre. 120 plots available. $7,500 per acre. Self-sustaining community. No mortgage, no landlord.
              </p>
            </div>
            <a
              href="https://land-freedom-system.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 flex-shrink-0"
            >
              See Land <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Referrals */}
        <div className="cr-card bg-yellow-50/10 border border-yellow-500/30">
          <h3 className="font-bold text-yellow-500 mb-2">Earn by sharing</h3>
          <p className="text-cr-muted text-sm mb-3">
            Share CreditKlimb with your link. Earn $5 for every person who submits a lead.
          </p>
          <div className="flex gap-2">
            <input
              readOnly
              value={`${typeof window !== 'undefined' ? window.location.origin : ''}/?ref=YOURCODE`}
              className="flex-1 bg-cr-surface border border-cr-border rounded-lg px-3 py-2 text-sm text-gray-400"
            />
            <button
              onClick={() => navigator.clipboard.writeText(window.location.origin + '/?ref=YOURCODE')}
              className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 text-sm"
            >
              Copy Link
            </button>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-cr-muted hover:text-white text-sm">
            ← Back to CreditKlimb
          </Link>
        </div>
      </div>
    </div>
  )
}
