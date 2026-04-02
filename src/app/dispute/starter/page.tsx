'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { CheckCircle, ArrowLeft, FileText, Shield, CreditCard, Clock, Download, Copy } from 'lucide-react'

const BUREAUS = [
  { id: 'equifax', name: 'Equifax', address: 'P.O. Box 740256, Atlanta, GA 30374' },
  { id: 'experian', name: 'Experian', address: 'P.O. Box 4500, Allen, TX 75013' },
  { id: 'transunion', name: 'TransUnion', address: 'P.O. Box 2000, Chester, PA 19016' },
]

function generateStarterLetter(data: any, bureau: any) {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${bureau.name}\n${bureau.address}\n\n${date}\n\nTo Whom It May Concern:\n\nI am writing to dispute the following information appearing on my credit report. I believe this information is inaccurate and request that you investigate and correct or remove it pursuant to the Fair Credit Reporting Act (FCRA), Section 611.\n\nDISPUTED INFORMATION:\nAccount Name: ${data.accountName || '[Account Name]'}\nAccount Number: ${data.accountNumber || '[Account Number]'}\n\nREASON FOR DISPUTE:\n${data.reason || '[Explain why this information is inaccurate]'}\n\nI request that you:\n1. Investigate this matter within 30 days as required by the FCRA\n2. Contact the furnisher of this information to verify its accuracy\n3. Correct any inaccurate information or remove it from my credit report\n4. Provide written notification of the results within 30 days\n\nIMPORTANT: If the furnisher fails to respond within the 30-day investigation period, you are legally required to delete this information from my credit report.\n\nI have enclosed copies of supporting documentation.\n\nSincerely,\n${data.fullName || '[Your Name]'}\n${data.address || '[Your Address]'}\n${data.city ? `${data.city}, ${data.state} ${data.zip}` : '[City, State ZIP]'}\n\nEnclosures:\n- Copy of Government-Issued ID\n- Proof of Current Address`
}

export default function StarterDisputePage() {
  const [step, setStep] = useState(1)
  const [selectedBureau, setSelectedBureau] = useState('')
  const [formData, setFormData] = useState({
    fullName: '', address: '', city: '', state: '', zip: '', ssnLast4: '',
    accountName: '', accountNumber: '', reason: ''
  })
  const [email, setEmail] = useState('')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [paid, setPaid] = useState(false)
  const [letter, setLetter] = useState('')
  const [unlockMethod, setUnlockMethod] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Submit lead to Supabase (fire-and-forget)
  const submitLead = async (method: string) => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName || 'Unknown',
          email: email || 'noemail@starter.local',
          tier: 'starter',
          unlockMethod: method,
          scoreRange: 'Unknown',
          goal: 'dispute_single',
          timeline: 'Unknown',
        })
      })
    } catch { /* non-blocking */ }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true' && params.get('tier') === 'starter') {
      const bureau = BUREAUS.find(b => b.id === params.get('bureau')) || BUREAUS[0]
      setSelectedBureau(params.get('bureau') || 'equifax')
      setLetter(generateStarterLetter(formData, bureau))
      setPaid(true)
      setStep(4)
      setUnlockMethod('paid')
      submitLead('paid')
      window.history.replaceState({}, '', '/dispute/starter')
    }
  }, [])

  const bureau = BUREAUS.find(b => b.id === selectedBureau)

  const handleShare = (method: string) => {
    const texts: Record<string, string> = {
      twitter: "I just used CreditKlimb to generate a free credit dispute letter. Get yours at creditklimb.com — no signup, no credit card. #CreditRepair #Finance",
      facebook: "I just used CreditKlimb to generate a free credit dispute letter. Get yours free at creditklimb.com #CreditRepair",
      copy: "I just used CreditKlimb to generate a free credit dispute letter. Get yours free at creditklimb.com — no signup, no credit card. #CreditRepair #Finance"
    }
    if (method === 'copy') {
      navigator.clipboard.writeText(texts.copy)
      alert('Copied! Paste it on X, Facebook, or anywhere.')
    } else if (method === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(texts.twitter)}`, '_blank', 'width=550,height=420')
    } else if (method === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://creditklimb.com')}&quote=${encodeURIComponent(texts.facebook)}`, '_blank', 'width=600,height=400')
    }
    setUnlockMethod(method)
    setLetter(generateStarterLetter(formData, bureau))
    setPaid(true)
    setStep(4)
    submitLead(method)
  }

  const handleStripePayment = async () => {
    if (!email || !formData.fullName || !formData.accountName) { setPaymentError('All fields required'); return }
    setPaymentLoading(true)
    setPaymentError('')
    try {
      const base = window.location.origin
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: 'starter',
          email,
          name: formData.fullName,
          successUrl: `${base}/dispute/starter?success=true&tier=starter&bureau=${selectedBureau}`,
          cancelUrl: `${base}/dispute/starter`,
        })
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        // Demo fallback
        setUnlockMethod('paid')
        setLetter(generateStarterLetter(formData, bureau))
        setPaid(true)
        setStep(4)
        submitLead('paid')
      }
    } catch {
      setUnlockMethod('paid')
      setLetter(generateStarterLetter(formData, bureau))
      setPaid(true)
      setStep(4)
      submitLead('paid')
    }
    setPaymentLoading(false)
  }

  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />

      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-sm font-medium mb-6">
            <FileText size={14} />
            Starter — 1 Bureau. 1 Letter.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fix 1 Item on Your Report</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            One bureau. One letter. Real FCRA-compliant document — free if you share, or $1 if you skip.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="cr-container max-w-2xl">

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s || (s === 4 && paid) ? 'bg-cr-primary text-white' : 'bg-cr-surface text-cr-muted'}`}>
                  {s < step || (s === 4 && paid) ? <CheckCircle size={16} /> : s}
                </div>
                <div className={`flex-1 h-1 rounded-full transition-colors ${step >= s || (s === 4 && paid) ? 'bg-cr-primary' : 'bg-cr-surface'}`} />
              </div>
            ))}
          </div>

          {/* Step 1: Choose bureau */}
          {step === 1 && (
            <div>
              <div className="cr-card mb-6">
                <h2 className="text-xl font-bold mb-4">Which bureau has the error?</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  {BUREAUS.map(b => (
                    <button key={b.id} onClick={() => setSelectedBureau(b.id)} className={`p-4 rounded-lg border-2 text-left transition ${selectedBureau === b.id ? 'border-cr-primary bg-cr-primary/5' : 'border-cr-border hover:border-cr-primary/50'}`}>
                      <div className="font-semibold mb-1">{b.name}</div>
                      <div className="text-xs text-cr-muted">{b.address}</div>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setStep(2)} disabled={!selectedBureau} className="cr-btn cr-btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2">
                Continue <ArrowLeft size={16} className="rotate-180" />
              </button>
            </div>
          )}

          {/* Step 2: Info */}
          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
                <ArrowLeft size={16} /> Back
              </button>
              <div className="cr-card mb-6">
                <h2 className="text-xl font-bold mb-4">Tell us about you</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="cr-label">Full Legal Name</label>
                      <input type="text" className="cr-input" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} placeholder="John Smith" />
                    </div>
                    <div>
                      <label className="cr-label">Last 4 of SSN</label>
                      <input type="text" className="cr-input" value={formData.ssnLast4} onChange={e => setFormData({ ...formData, ssnLast4: e.target.value })} placeholder="1234" maxLength={4} />
                    </div>
                  </div>
                  <div>
                    <label className="cr-label">Street Address</label>
                    <input type="text" className="cr-input" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} placeholder="123 Main St" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <label className="cr-label">City</label>
                      <input type="text" className="cr-input" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} placeholder="Chicago" />
                    </div>
                    <div>
                      <label className="cr-label">State</label>
                      <input type="text" className="cr-input" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} placeholder="IL" />
                    </div>
                    <div>
                      <label className="cr-label">ZIP</label>
                      <input type="text" className="cr-input" value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} placeholder="60601" />
                    </div>
                  </div>
                  <div className="border-t border-cr-border pt-4">
                    <h3 className="font-semibold mb-3">The account you&apos;re disputing</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="cr-label">Company Name</label>
                        <input type="text" className="cr-input" value={formData.accountName} onChange={e => setFormData({ ...formData, accountName: e.target.value })} placeholder="CAPITAL ONE" />
                      </div>
                      <div>
                        <label className="cr-label">Account Number (last 4)</label>
                        <input type="text" className="cr-input" value={formData.accountNumber} onChange={e => setFormData({ ...formData, accountNumber: e.target.value })} placeholder="XXXX1234" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="cr-label">Why is this wrong?</label>
                      <textarea className="cr-textarea" value={formData.reason} onChange={e => setFormData({ ...formData, reason: e.target.value })} placeholder="This account does not belong to me..." rows={3} />
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => setStep(3)} disabled={!formData.fullName || !formData.accountName} className="cr-btn cr-btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2">
                Continue <ArrowLeft size={16} className="rotate-180" />
              </button>
            </div>
          )}

          {/* Step 3: Unlock */}
          {step === 3 && (
            <div>
              <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
                <ArrowLeft size={16} /> Back
              </button>
              <div className="cr-card mb-4">
                <div className="text-center mb-5">
                  <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <h2 className="text-xl font-bold mb-1">Your Letter is Ready — Free</h2>
                  <p className="text-cr-muted text-sm">Unlock it by sharing CreditKlimb with your network. Takes 10 seconds.</p>
                </div>

                {/* Benefits */}
                <div className="bg-cr-surface rounded-xl p-4 mb-5">
                  <div className="text-xs font-bold text-cr-muted uppercase tracking-wide mb-3">What you get:</div>
                  <div className="space-y-2">
                    {[
                      'FCRA-compliant dispute letter ready to mail today',
                      'Step-by-step mailing instructions included',
                      'Certifiable proof of mailing guidance',
                    ].map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Unlock options */}
                <div className="space-y-3">
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just used CreditKlimb to generate a free credit dispute letter. Get yours at creditklimb.com — no signup, no credit card. #CreditRepair #Finance")}`} target="_blank" rel="noopener noreferrer" onClick={() => handleShare('twitter')}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1DA1F2] text-white font-bold rounded-lg hover:bg-[#1a8cd8] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Share on X (Twitter) — Unlock Free
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://creditklimb.com')}&quote=${encodeURIComponent("I just used CreditKlimb to generate a free credit dispute letter. Get yours free at creditklimb.com #CreditRepair")}`} target="_blank" rel="noopener noreferrer" onClick={() => handleShare('facebook')}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] text-white font-bold rounded-lg hover:bg-[#166fe5] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Share on Facebook — Unlock Free
                  </a>
                  <button onClick={() => handleShare('copy')} className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-cr-surface border border-cr-border text-white font-bold rounded-lg hover:border-cr-primary transition-colors">
                    <Copy size={18} />
                    Copy Text to Share Anywhere
                  </button>
                </div>

                {/* OR divider */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-cr-border" />
                  <span className="text-xs text-cr-muted">OR</span>
                  <div className="flex-1 h-px bg-cr-border" />
                </div>

                {/* $1 fallback */}
                <div className="bg-cr-surface rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-semibold text-sm">Don&apos;t want to share?</span>
                      <p className="text-xs text-cr-muted">Skip the share, pay $1 instead</p>
                    </div>
                    <button onClick={handleStripePayment} disabled={paymentLoading} className="cr-btn cr-btn-primary text-sm py-2 px-4 disabled:opacity-50 flex items-center gap-2">
                      {paymentLoading ? <Clock size={14} className="animate-spin" /> : <CreditCard size={14} />}
                      Pay $1
                    </button>
                  </div>
                  {paymentError && <p className="text-red-500 text-xs">{paymentError}</p>}
                </div>

                {submitted && <p className="text-green-500 text-xs mt-2 text-center">✓ Shared! Scroll down for your letter.</p>}
              </div>

              {/* Upgrade nudge */}
              <div className="cr-card border-2 border-purple-200 bg-purple-50/50">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex-1">
                    <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">Want ALL bureaus covered?</div>
                    <h3 className="font-bold mb-1">Go Pro — $29 Full Repair Pack</h3>
                    <p className="text-cr-muted text-sm">3 bureaus + sub-bureaus + furnisher notices + escalation + pay-for-delete. Everything you need to fix your whole report.</p>
                  </div>
                  <Link href="/dispute/full" className="px-5 py-2.5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap flex items-center gap-2 flex-shrink-0">
                    See Full Pack — $29 <ArrowLeft size={14} className="rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Letter (paid/unlocked) */}
          {step === 4 && paid && (
            <div>
              <div className="cr-card bg-green-50 border-green-200 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={28} />
                  <div>
                    <h2 className="font-bold text-green-900">Your {bureau?.name} Letter is Ready!</h2>
                    <p className="text-green-700 text-sm">Unlocked via {unlockMethod === 'paid' ? '$1 payment' : unlockMethod}. Download or copy below.</p>
                  </div>
                </div>
              </div>

              <div className="cr-card mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">bureau</span>
                    <h3 className="font-semibold mt-2">{bureau?.name} Dispute Letter</h3>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigator.clipboard.writeText(letter)} className="cr-btn cr-btn-secondary text-sm py-1.5 px-3">
                      <Copy size={14} className="mr-1" /> Copy
                    </button>
                    <button onClick={() => {
                      const blob = new Blob([letter], { type: 'text/plain' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `dispute-letter-${selectedBureau}.txt`
                      a.click()
                    }} className="cr-btn cr-btn-primary text-sm py-1.5 px-3">
                      <Download size={14} className="mr-1" /> Download
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {letter}
                </div>
              </div>

              {/* Next steps */}
              <div className="cr-card bg-cr-surface mb-6">
                <h3 className="font-semibold mb-3">Next Steps</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-cr-muted">
                  <li>Download or copy the letter above</li>
                  <li>Sign at the bottom</li>
                  <li>Attach a copy of your government-issued ID</li>
                  <li>Mail via <strong>certified mail with return receipt</strong></li>
                  <li>Wait 30 days — bureaus must respond by law</li>
                </ol>
              </div>

              {/* Referral prompt */}
              <div className="cr-card border-2 border-green-200 bg-green-50/50 mb-6">
                <div className="text-center">
                  <span className="text-2xl mb-2 block">🌱</span>
                  <h3 className="font-bold mb-1">Want to earn rewards?</h3>
                  <p className="text-cr-muted text-sm mb-3">Share your CreditKlimb link. When others use it, you earn credit toward premium tools.</p>
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => {
                      const ref = `https://creditklimb.com/ref/${encodeURIComponent(email.split('@')[0])}`
                      navigator.clipboard.writeText(ref)
                      alert('Your referral link is in your clipboard!')
                    }} className="cr-btn cr-btn-primary text-sm">
                      <Copy size={14} className="mr-1" /> Get My Referral Link
                    </button>
                    <Link href="/dispute/full" className="cr-btn cr-btn-secondary text-sm">
                      Fix More — $29
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/dispute/full" className="cr-btn cr-btn-secondary w-full text-center block">
                ← Back to Home
              </Link>
            </div>
          )}

          {step < 4 && (
            <div className="flex items-center gap-3 text-sm text-cr-muted mt-4">
              <Shield size={16} className="text-green-500" />
              <span>30-day money-back guarantee on paid plans</span>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
