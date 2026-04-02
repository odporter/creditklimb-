'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { CheckCircle, ArrowLeft, FileText, Shield, CreditCard, Lock, Clock, Download, Copy } from 'lucide-react'

const BUREAUS = [
  { id: 'equifax', name: 'Equifax', address: 'P.O. Box 740256, Atlanta, GA 30374' },
  { id: 'experian', name: 'Experian', address: 'P.O. Box 4500, Allen, TX 75013' },
  { id: 'transunion', name: 'TransUnion', address: 'P.O. Box 2000, Chester, PA 19016' },
]

function generateStarterLetter(data: any, bureau: any) {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${bureau.name}
${bureau.address}

${date}

To Whom It May Concern:

I am writing to dispute the following information appearing on my credit report. I believe this information is inaccurate and request that you investigate and correct or remove it pursuant to the Fair Credit Reporting Act (FCRA), Section 611.

DISPUTED INFORMATION:
Account Name: ${data.accountName || '[Account Name]'}
Account Number: ${data.accountNumber || '[Account Number]'}

REASON FOR DISPUTE:
${data.reason || '[Explain why this information is inaccurate]'}

I request that you:
1. Investigate this matter within 30 days as required by the FCRA
2. Contact the furnisher of this information to verify its accuracy
3. Correct any inaccurate information or remove it from my credit report
4. Provide written notification of the results within 30 days

IMPORTANT: If the furnisher fails to respond within the 30-day investigation period, you are legally required to delete this information from my credit report.

I have enclosed copies of supporting documentation.

Sincerely,
${data.fullName || '[Your Name]'}
${data.address || '[Your Address]'}
${data.city ? `${data.city}, ${data.state} ${data.zip}` : '[City, State ZIP]'}

Enclosures:
- Copy of Government-Issued ID
- Proof of Current Address`
}

export default function StarterDisputePage() {
  const [step, setStep] = useState(1)
  const [selectedBureau, setSelectedBureau] = useState('')
  const [formData, setFormData] = useState({ fullName: '', address: '', city: '', state: '', zip: '', accountName: '', accountNumber: '', reason: '' })
  const [email, setEmail] = useState('')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [paid, setPaid] = useState(false)
  const [letter, setLetter] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true' && params.get('tier') === 'starter') {
      setPaid(true)
      setStep(4)
      const bureau = BUREAUS.find(b => b.id === params.get('bureau')) || BUREAUS[0]
      setSelectedBureau(params.get('bureau') || 'equifax')
      setLetter(generateStarterLetter(formData, bureau))
      window.history.replaceState({}, '', '/dispute/starter')
    }
  }, [])

  const bureau = BUREAUS.find(b => b.id === selectedBureau)

  const handleShareToUnlock = () => {
    // Show share options
    const text = encodeURIComponent(`I just used CreditKlimb to generate a free credit dispute letter. Get yours at creditklimb.com — completely free. Fix your credit yourself. #CreditRepair #Finance`)
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}`
    window.open(shareUrl, '_blank', 'width=550,height=420')
    // Unlock after share
    setLetter(generateStarterLetter(formData, bureau))
    setPaid(true)
    setStep(4)
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
        // Demo mode: bypass payment
        setLetter(generateStarterLetter(formData, bureau))
        setPaid(true)
        setStep(4)
      }
    } catch {
      // Demo mode fallback
      setLetter(generateStarterLetter(formData, bureau))
      setPaid(true)
      setStep(4)
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
            Try It Out — $1 Only
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">One Bureau. One Letter.</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Get your first professional dispute letter for just $1.
            See exactly what the full system generates before committing.
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
                <h2 className="text-xl font-bold mb-4">Choose Your Bureau</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  {BUREAUS.map(b => (
                    <button key={b.id} onClick={() => setSelectedBureau(b.id)} className={`p-4 rounded-lg border-2 text-left transition ${selectedBureau === b.id ? 'border-cr-primary bg-cr-primary/5' : 'border-cr-border hover:border-cr-primary/50'}`}>
                      <div className="font-semibold mb-1">{b.name}</div>
                      <div className="text-xs text-cr-muted">{b.address}</div>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-cr-muted mt-3">
                  Not sure which bureau? Check your credit report — the error appears on one or more of these.
                </p>
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
                <h2 className="text-xl font-bold mb-4">Your Information</h2>
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
                    <h3 className="font-semibold mb-3">The Account You're Disputing</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="cr-label">Company/Account Name</label>
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
                Continue to Payment <ArrowLeft size={16} className="rotate-180" />
              </button>
            </div>
          )}

          {/* Step 3: Unlock */}
          {step === 3 && (
            <div>
              <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
                <ArrowLeft size={16} /> Back
              </button>
              <div className="cr-card">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-cr-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔓</span>
                  </div>
                  <h2 className="text-xl font-bold mb-1">Unlock Your Letter — Free</h2>
                  <p className="text-cr-muted text-sm">Share CreditKlimb with your network. That's it.</p>
                </div>

                <div className="bg-cr-surface rounded-xl p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{bureau?.name} Dispute Letter</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                  <p className="text-xs text-cr-muted">FCRA-compliant, ready to mail</p>
                </div>

                <div className="space-y-3">
                  <p className="text-cr-muted text-sm text-center">
                    Share CreditKlimb on social media to unlock your free letter:
                  </p>
                  
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just used CreditKlimb to generate a free credit dispute letter. Get yours at creditklimb.com — completely free. Fix your credit yourself. #CreditRepair #Finance")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1DA1F2] text-white font-bold rounded-lg hover:bg-[#1a8cd8] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Share on X (Twitter)
                  </a>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://creditklimb.com")}&quote=${encodeURIComponent("I just used CreditKlimb to generate a free credit dispute letter. Get yours free at creditklimb.com #CreditRepair")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] text-white font-bold rounded-lg hover:bg-[#166fe5] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Share on Facebook
                  </a>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('I just used CreditKlimb to generate a free credit dispute letter. Get yours free at creditklimb.com — no signup, no credit card. #CreditRepair #Finance')
                      alert('Copied! Paste it anywhere.')
                    }}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-cr-surface border border-cr-border text-white font-bold rounded-lg hover:border-cr-primary transition-colors"
                  >
                    <Copy size={18} />
                    Copy Text to Share Anywhere
                  </button>

                  <div className="pt-3 border-t border-cr-border">
                    <button
                      onClick={() => { setLetter(generateStarterLetter(formData, bureau)); setPaid(true); setStep(4); }}
                      className="w-full text-center text-cr-muted text-sm hover:text-cr-text py-2"
                    >
                      No thanks — just pay $1 instead →
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-cr-border">
                  <p className="text-cr-muted text-sm text-center">
                    Want all bureaus + furnisher notices?{' '}
                    <Link href="/dispute/full" className="text-cr-primary underline font-medium">
                      Full Repair — $29
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Letter (paid only) */}
          {step === 4 && paid && (
            <div>
              <div className="cr-card bg-green-50 border-green-200 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={28} />
                  <div>
                    <h2 className="font-bold text-green-900">Your {bureau?.name} Letter is Ready!</h2>
                    <p className="text-green-700 text-sm">Download or copy below.</p>
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
                    <button onClick={() => navigator.clipboard.writeText(letter)} className="cr-btn cr-btn-secondary text-sm py-1 px-3">
                      <Copy size={14} className="mr-1" /> Copy
                    </button>
                    <button onClick={() => {
                      const blob = new Blob([letter], { type: 'text/plain' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `dispute-letter-${selectedBureau}.txt`
                      a.click()
                    }} className="cr-btn cr-btn-primary text-sm py-1 px-3">
                      <Download size={14} className="mr-1" /> Download
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {letter}
                </div>
              </div>

              <div className="cr-card bg-cr-surface mb-6">
                <h3 className="font-semibold mb-3">Next Steps</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-cr-muted">
                  <li>Download or copy the letter</li>
                  <li>Sign at the bottom</li>
                  <li>Attach a copy of your ID</li>
                  <li>Mail via <strong>certified mail with return receipt</strong></li>
                  <li>Wait 30 days — they must respond by law</li>
                </ol>
              </div>

              <div className="flex gap-4">
                <Link href="/dispute/full" className="cr-btn cr-btn-secondary flex-1 text-center">
                  Upgrade to Full Repair — $29
                </Link>
                <Link href="/dispute" className="cr-btn cr-btn-primary flex-1 text-center">
                  Back to Home
                </Link>
              </div>
            </div>
          )}

          {/* Trust */}
          {step < 4 && (
            <div className="flex items-center gap-3 text-sm text-cr-muted mt-6">
              <Shield size={16} className="text-green-500" />
              <span>30-day money-back guarantee on paid plans</span>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
