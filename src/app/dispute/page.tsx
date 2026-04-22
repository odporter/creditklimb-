'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, CreditCard, Send, CheckCircle, Shield, ArrowRight, AlertTriangle, Building, ChevronDown, ChevronUp, Copy, Download } from 'lucide-react'

const BUREAUS = [
  { id: 'equifax', name: 'Equifax', address: 'P.O. Box 740256, Atlanta, GA 30374', phone: '1-800-525-6285' },
  { id: 'experian', name: 'Experian', address: 'P.O. Box 4500, Allen, TX 75013', phone: '1-888-397-3742' },
  { id: 'transunion', name: 'TransUnion', address: 'P.O. Box 2000, Chester, PA 19016', phone: '1-800-916-8800' },
]

const SUB_BUREAUS = [
  { id: 'lexisnexis', name: 'LexisNexis', address: 'P.O. Box 105, Atlanta, GA 30348', phone: '1-800-456-6004', description: 'Background checks for employment, housing, insurance' },
  { id: 'chexsystems', name: 'ChexSystems', address: 'P.O. Box 105, Minneapolis, MN 55480', phone: '1-800-977-7284', description: 'Bank account history and consumer banking reports' },
  { id: 'factortrust', name: 'FactorTrust', address: 'P.O. Box 851, Atlanta, GA 30301', phone: '1-855-366-2727', description: 'Alternative credit data for short-term lending decisions' },
  { id: 'microbilt', name: 'MicroBilt', address: 'P.O. Box 968, Atlanta, GA 30301', phone: '1-800-884-4744', description: 'Consumer credit reports for alternative lending' },
  { id: 'telecheck', name: 'TeleCheck', address: 'P.O. Box 5589, Louisville, KY 40255', phone: '1-800-537-5424', description: 'Check writing history and banking history' },
]

const FURNISHER_CATEGORIES = [
  { id: 'bank', name: 'Banks & Credit Unions', examples: 'Chase, Bank of America, Wells Fargo, Capital One' },
  { id: 'collection', name: 'Collection Agencies', examples: 'Portfolio Recovery, Midland Credit, LVNV, Creditors Financial' },
  { id: 'medical', name: 'Medical Providers', examples: 'Hospitals, doctor\'s offices, labs, pharmacies' },
  { id: 'auto', name: 'Auto Finance', examples: 'Toyota Financial, Honda Financial, Ally Financial' },
  { id: 'utility', name: 'Utilities & Telecom', examples: 'AT&T, Comcast, Verizon, water, electric' },
]

const DISPUTE_TYPES = [
  { id: 'late', label: 'Late Payments', desc: 'Payments that were 30/60/90/120 days late' },
  { id: 'collection', label: 'Collections', desc: 'Accounts sent to collection agencies' },
  { id: 'chargeoff', label: 'Charge-Offs', desc: 'Accounts written off by the lender' },
  { id: 'identity', label: 'Identity Theft', desc: 'Accounts or inquiries you didn\'t authorize' },
  { id: 'wrong', label: 'Wrong Information', desc: 'Incorrect balances, dates, or account details' },
  { id: 'duplicate', label: 'Duplicate Accounts', desc: 'Same account listed multiple times' },
  { id: 'inquiry', label: 'Unauthorized Inquiries', desc: 'Hard inquiries you didn\'t approve' },
  { id: 'medical', label: 'Medical Bills', desc: 'Medical collections and billing errors' },
]

function generateBureauLetter(params: { name: string; address: string; city: string; state: string; zip: string; accountNumber: string; bureauName: string; bureauAddress: string; disputeType: string; reason: string }) {
  return `${params.name}
${params.address}
${params.city}, ${params.state} ${params.zip}

${params.bureauName}
${params.bureauAddress}

${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

RE: Dispute of Inaccurate Information — Account #${params.accountNumber}

To Whom It May Concern:

I am writing to formally dispute the following account currently appearing on my credit report with ${params.bureauName}. After reviewing my credit report, I have identified information that is inaccurate and/or unverifiable.

Account Information in Dispute:
- Account Holder: ${params.name}
- Account Number: ${params.accountNumber}
- Type of Dispute: ${params.disputeType}
- Reason for Dispute: ${params.reason}

Please investigate this matter and correct any inaccurate information in accordance with the Fair Credit Reporting Act (FCRA), specifically Section 611.

Under the FCRA, you are required to:
1. Investigate the disputed information within 30 days
2. Review all relevant information provided by me
3. Remove or correct any information that is inaccurate or cannot be verified
4. Notify all parties who received my credit report of the correction

I request that you remove this inaccurate information from my credit file and provide written confirmation of the action taken.

If the information cannot be verified, it must be deleted from my credit report. I reserve all rights under the FCRA, including the right to pursue legal action if my rights are violated.

Please respond in writing within 30 days of receiving this letter.

Sincerely,

${params.name}
${params.address}
${params.city}, ${params.state} ${params.zip}
Phone: ${params.zip}
Email: ${params.zip}@email.com`
}

function generateSubBureauLetter(params: { name: string; address: string; city: string; state: string; zip: string; accountNumber: string; bureauName: string; bureauAddress: string; description: string }) {
  return `${params.name}
${params.address}
${params.city}, ${params.state} ${params.zip}

${params.bureauName}
${params.bureauAddress}

${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

RE: Consumer Dispute — Account #${params.accountNumber}

To Whom It May Concern:

I am writing to dispute information contained in my consumer report maintained by ${params.bureauName}. ${params.description}

Personal Information:
- Full Name: ${params.name}
- Address: ${params.address}, ${params.city}, ${params.state} ${params.zip}
- Date of Birth: [Your DOB]
- Social Security Number: [Last 4: XXXX]

Account in Dispute:
- Account Number: ${params.accountNumber}
- Reported by: [Original Furnisher Name]

I believe this information is inaccurate and request a full investigation under the FCRA. Please verify that the information reported is accurate and complete. If it cannot be verified, it must be removed.

I request written confirmation of the results of your investigation within 30 days.

Sincerely,

${params.name}
${params.address}
${params.city}, ${params.state} ${params.zip}`
}

function generateFurnisherLetter(params: { name: string; address: string; city: string; state: string; zip: string; furnisherName: string; furnisherAddress: string; accountNumber: string; bureauName: string; disputeType: string; reason: string }) {
  return `${params.name}
${params.address}
${params.city}, ${params.state} ${params.zip}

${params.furnisherName}
${params.furnisherAddress}

${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

RE: FCRA Furnisher Notice — Account #${params.accountNumber}

To ${params.furnisherName}:

I am writing to notify you that I have disputed the following account with ${params.bureauName}, which was reported by your organization.

Account Information:
- Account Holder: ${params.name}
- Account Number: ${params.accountNumber}
- Account Type: ${params.disputeType}
- Bureau Reported To: ${params.bureauName}

Under the Fair Credit Reporting Act, Section 623, you are required to:
1. Investigate and correct any inaccurate information within 30 days of receiving this notice
2. Report the results of your investigation to the credit bureau
3. If the information is inaccurate or cannot be verified, correct or delete it

If you fail to respond or correct inaccurate information within 30 days, you may be subject to civil liability under the FCRA.

Please investigate and respond in writing within 30 days.

Sincerely,

${params.name}
${params.address}
${params.city}, ${params.state} ${params.zip}`
}

export default function DisputePage() {
  const [step, setStep] = useState<'menu' | 'bureau' | 'sub' | 'furnisher'>('menu')
  const [form, setForm] = useState({
    name: '', address: '', city: '', state: '', zip: '', accountNumber: '',
    bureauId: 'equifax', subBureauId: 'lexisnexis', furnisherName: '', furnisherAddress: '',
    disputeType: 'late', reason: ''
  })
  const [letter, setLetter] = useState('')
  const [copied, setCopied] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const bureaus = BUREAUS
  const subBureaus = SUB_BUREAUS

  const faqs = [
    { q: 'Is this really free?', a: 'Yes. Every letter. Every bureau. No credit card. No subscription. No "unlock premium." We built it free because the people who need it most often can least afford to pay.' },
    { q: 'Why do I need to dispute with sub-bureaus too?', a: 'Most people only check the big 3 bureaus (Equifax, Experian, TransUnion). But landlords, employers, insurers, and banks also check LexisNexis, ChexSystems, and others. Negative items on sub-bureaus can block housing, jobs, and loans even when your credit score looks fine.' },
    { q: 'What\'s a furnisher notice?', a: 'A furnisher is the bank, lender, or collection agency that reported the information to the credit bureau. Under the FCRA, when you dispute with a bureau, the bureau forwards your dispute to the furnisher — but sending a furnisher notice directly puts legal pressure on the source. If they don\'t respond within 30 days, they\'re in violation of the FCRA.' },
    { q: 'Do I need to claim my likeness to use this?', a: 'No. CreditKlimb is free for everyone. Claiming your likeness through LikenessVerified is optional — it\'s for people who want to join the network, white-label the tools, and earn commission. The tools work fine without it.' },
  ]

  function buildBureauLetter() {
    const bureau = bureaus.find(b => b.id === form.bureauId)!
    const typeLabel = DISPUTE_TYPES.find(t => t.id === form.disputeType)?.label || form.disputeType
    const l = generateBureauLetter({
      name: form.name, address: form.address, city: form.city, state: form.state, zip: form.zip,
      accountNumber: form.accountNumber, bureauName: bureau.name, bureauAddress: bureau.address,
      disputeType: typeLabel, reason: form.reason
    })
    setLetter(l)
  }

  function buildSubBureauLetter() {
    const bureau = subBureaus.find(b => b.id === form.subBureauId)!
    const l = generateSubBureauLetter({
      name: form.name, address: form.address, city: form.city, state: form.state, zip: form.zip,
      accountNumber: form.accountNumber, bureauName: bureau.name, bureauAddress: bureau.address,
      description: bureau.description
    })
    setLetter(l)
  }

  function buildFurnisherLetter() {
    const bureau = bureaus.find(b => b.id === form.bureauId)!
    const typeLabel = DISPUTE_TYPES.find(t => t.id === form.disputeType)?.label || form.disputeType
    const l = generateFurnisherLetter({
      name: form.name, address: form.address, city: form.city, state: form.state, zip: form.zip,
      furnisherName: form.furnisherName, furnisherAddress: form.furnisherAddress,
      accountNumber: form.accountNumber, bureauName: bureau.name, disputeType: typeLabel, reason: form.reason
    })
    setLetter(l)
  }

  function copyLetter() {
    navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function downloadTxt() {
    const blob = new Blob([letter], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dispute-letter-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', background: 'transparent',
    border: '1px solid var(--cr-border)', borderRadius: '0.375rem',
    color: '#fff', fontSize: '0.9375rem'
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#111111', color: '#ffffff'}}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md" style={{backgroundColor: 'rgba(17,17,17,0.9)', borderBottom: '1px solid var(--cr-border)'}}>
        <div className="cr-container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield size={18} className="text-[#C65D1E]" />
            <span className="font-semibold text-sm tracking-tight">CreditKlimb<span className="text-[#C65D1E]">™</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dispute" className="text-sm opacity-100 font-medium">Dispute</Link>
            <Link href="/network" className="text-sm opacity-50">Network</Link>
            <Link href="/tools" className="text-sm opacity-50">Tools</Link>
          </div>
        </div>
      </nav>

      <div className="cr-container py-12 max-w-2xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Free Dispute Letters</p>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Every bureau. Free.</h1>
          <p className="text-sm opacity-50">Major bureaus, sub-bureaus, and furnisher notices. No paywall. No catch.</p>
        </div>

        {/* Menu */}
        {step === 'menu' && (
          <div className="space-y-3">
            {[
              { icon: CreditCard, label: 'Major Bureau Dispute', desc: 'Equifax · Experian · TransUnion', sub: 'Free letter for any credit error', key: 'bureau' as const },
              { icon: AlertTriangle, label: 'Sub-Bureau Dispute', desc: 'LexisNexis · ChexSystems · FactorTrust', sub: 'The hidden reports landlords and employers check', key: 'sub' as const },
              { icon: Building, label: 'Furnisher Notice', desc: 'Banks · Collections · Medical', sub: 'Put legal pressure directly on the source', key: 'furnisher' as const },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => setStep(item.key)}
                className="w-full text-left p-6 border transition-all hover:border-[#C65D1E] flex items-start gap-4"
                style={{borderColor: 'var(--cr-border)', background: 'transparent'}}
              >
                <div className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5" style={{borderColor: 'var(--cr-border)'}}>
                  <item.icon size={18} className="opacity-60" />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1">{item.label}</div>
                  <div className="text-xs opacity-40 mb-0.5">{item.desc}</div>
                  <div className="text-xs text-[#C65D1E]">{item.sub}</div>
                </div>
                <ArrowRight size={16} className="ml-auto opacity-30 flex-shrink-0 mt-1" />
              </button>
            ))}
          </div>
        )}

        {/* Bureau Form */}
        {step === 'bureau' && (
          <div className="space-y-5">
            <button onClick={() => setStep('menu')} className="text-xs opacity-40 hover:opacity-100 transition-opacity">
              ← Back
            </button>

            <div className="grid grid-cols-3 gap-3">
              {bureaus.map(b => (
                <button
                  key={b.id}
                  onClick={() => setForm(f => ({...f, bureauId: b.id}))}
                  className="p-4 border text-center text-sm transition-all"
                  style={{
                    borderColor: form.bureauId === b.id ? '#C65D1E' : 'var(--cr-border)',
                    background: form.bureauId === b.id ? 'rgba(198,93,30,0.1)' : 'transparent'
                  }}
                >
                  {b.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {DISPUTE_TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setForm(f => ({...f, disputeType: t.id}))}
                  className="p-3 border text-left text-sm transition-all"
                  style={{
                    borderColor: form.disputeType === t.id ? '#C65D1E' : 'var(--cr-border)',
                    background: form.disputeType === t.id ? 'rgba(198,93,30,0.1)' : 'transparent'
                  }}
                >
                  <div className="font-medium text-xs">{t.label}</div>
                  <div className="text-xs opacity-40">{t.desc}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} style={inputStyle} />
              <input placeholder="Account Number" value={form.accountNumber} onChange={e => setForm(f => ({...f, accountNumber: e.target.value}))} style={inputStyle} />
            </div>
            <input placeholder="Street Address" value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} style={inputStyle} />
            <div className="grid grid-cols-3 gap-3">
              <input placeholder="City" value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))} style={inputStyle} />
              <input placeholder="State" value={form.state} onChange={e => setForm(f => ({...f, state: e.target.value}))} style={inputStyle} />
              <input placeholder="ZIP" value={form.zip} onChange={e => setForm(f => ({...f, zip: e.target.value}))} style={inputStyle} />
            </div>
            <textarea
              placeholder="Why is this information inaccurate? (e.g. 'Payment was made on time but reported late', 'Never authorized this account')"
              value={form.reason}
              onChange={e => setForm(f => ({...f, reason: e.target.value}))}
              rows={3}
              style={{...inputStyle, resize: 'vertical', minHeight: '80px'}}
            />
            <button
              onClick={buildBureauLetter}
              disabled={!form.name || !form.address || !form.city || !form.state || !form.zip || !form.accountNumber}
              className="w-full py-3 text-sm font-medium border transition-all disabled:opacity-30"
              style={{borderColor: 'var(--cr-border)', background: form.name && form.address ? '#C65D1E' : 'transparent', color: form.name && form.address ? '#fff' : '#888'}}
            >
              Generate Letter
            </button>
          </div>
        )}

        {/* Sub-Bureau Form */}
        {step === 'sub' && (
          <div className="space-y-5">
            <button onClick={() => setStep('menu')} className="text-xs opacity-40 hover:opacity-100 transition-opacity">
              ← Back
            </button>

            <div className="grid grid-cols-2 gap-3">
              {subBureaus.map(b => (
                <button
                  key={b.id}
                  onClick={() => setForm(f => ({...f, subBureauId: b.id}))}
                  className="p-4 border text-left text-sm transition-all"
                  style={{
                    borderColor: form.subBureauId === b.id ? '#C65D1E' : 'var(--cr-border)',
                    background: form.subBureauId === b.id ? 'rgba(198,93,30,0.1)' : 'transparent'
                  }}
                >
                  <div className="font-medium text-xs">{b.name}</div>
                  <div className="text-xs opacity-40">{b.description}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} style={inputStyle} />
              <input placeholder="Account Number" value={form.accountNumber} onChange={e => setForm(f => ({...f, accountNumber: e.target.value}))} style={inputStyle} />
            </div>
            <input placeholder="Street Address" value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} style={inputStyle} />
            <div className="grid grid-cols-3 gap-3">
              <input placeholder="City" value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))} style={inputStyle} />
              <input placeholder="State" value={form.state} onChange={e => setForm(f => ({...f, state: e.target.value}))} style={inputStyle} />
              <input placeholder="ZIP" value={form.zip} onChange={e => setForm(f => ({...f, zip: e.target.value}))} style={inputStyle} />
            </div>
            <button
              onClick={buildSubBureauLetter}
              disabled={!form.name || !form.address || !form.city || !form.state || !form.zip || !form.accountNumber}
              className="w-full py-3 text-sm font-medium border transition-all disabled:opacity-30"
              style={{borderColor: 'var(--cr-border)', background: form.name && form.address ? '#C65D1E' : 'transparent', color: form.name && form.address ? '#fff' : '#888'}}
            >
              Generate Letter
            </button>
          </div>
        )}

        {/* Furnisher Form */}
        {step === 'furnisher' && (
          <div className="space-y-5">
            <button onClick={() => setStep('menu')} className="text-xs opacity-40 hover:opacity-100 transition-opacity">
              ← Back
            </button>

            <div className="grid grid-cols-2 gap-3">
              {FURNISHER_CATEGORIES.map(f => (
                <button
                  key={f.id}
                  onClick={() => setForm(f => ({...f, furnisherName: f.name}))}
                  className="p-4 border text-left text-sm transition-all"
                  style={{
                    borderColor: form.furnisherName === f.name ? '#C65D1E' : 'var(--cr-border)',
                    background: form.furnisherName === f.name ? 'rgba(198,93,30,0.1)' : 'transparent'
                  }}
                >
                  <div className="font-medium text-xs">{f.name}</div>
                  <div className="text-xs opacity-40">{f.examples}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} style={inputStyle} />
              <input placeholder="Account Number" value={form.accountNumber} onChange={e => setForm(f => ({...f, accountNumber: e.target.value}))} style={inputStyle} />
            </div>
            <input placeholder="Furnisher Address (P.O. Box or street)" value={form.furnisherAddress} onChange={e => setForm(f => ({...f, furnisherAddress: e.target.value}))} style={inputStyle} />
            <div className="grid grid-cols-3 gap-3">
              <input placeholder="City" value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))} style={inputStyle} />
              <input placeholder="State" value={form.state} onChange={e => setForm(f => ({...f, state: e.target.value}))} style={inputStyle} />
              <input placeholder="ZIP" value={form.zip} onChange={e => setForm(f => ({...f, zip: e.target.value}))} style={inputStyle} />
            </div>
            <button
              onClick={buildFurnisherLetter}
              disabled={!form.name || !form.furnisherName || !form.furnisherAddress || !form.city || !form.state || !form.zip}
              className="w-full py-3 text-sm font-medium border transition-all disabled:opacity-30"
              style={{borderColor: 'var(--cr-border)', background: form.name && form.furnisherName && form.furnisherAddress ? '#C65D1E' : 'transparent', color: form.name && form.furnisherName && form.furnisherAddress ? '#fff' : '#888'}}
            >
              Generate Furnisher Notice
            </button>
          </div>
        )}

        {/* Letter Output */}
        {letter && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={16} className="text-[#C65D1E]" />
                <span className="text-sm font-medium">Your Letter</span>
              </div>
              <div className="flex gap-3">
                <button onClick={copyLetter} className="text-xs px-3 py-1.5 border" style={{borderColor: 'var(--cr-border)'}}>
                  {copied ? 'Copied!' : <><Copy size={12} className="inline mr-1" />Copy</>}
                </button>
                <button onClick={downloadTxt} className="text-xs px-3 py-1.5 border" style={{borderColor: 'var(--cr-border)'}}>
                  <Download size={12} className="inline mr-1" />Download .txt
                </button>
              </div>
            </div>
            <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '0.8125rem', lineHeight: 1.7, opacity: 0.85}}>{letter}</pre>
          </div>
        )}

        {/* FAQ */}
        {step === 'menu' && (
          <div className="mt-16">
            <h2 className="text-lg font-semibold mb-6">Common Questions</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border" style={{borderColor: 'var(--cr-border)'}}>
                  <button
                    className="w-full text-left p-4 flex items-center justify-between text-sm"
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  >
                    <span className="font-medium">{faq.q}</span>
                    {expandedFaq === i ? <ChevronUp size={14} className="opacity-50 flex-shrink-0" /> : <ChevronDown size={14} className="opacity-50 flex-shrink-0" />}
                  </button>
                  {expandedFaq === i && (
                    <div className="px-4 pb-4 text-sm opacity-60" style={{paddingTop: 0}}>{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Network CTA */}
        {step === 'menu' && (
          <div className="mt-12 border p-8 text-center" style={{borderColor: 'var(--cr-border)'}}>
            <p className="text-xs uppercase tracking-widest opacity-40 mb-3">LikenessVerified Network</p>
            <h3 className="font-semibold text-sm mb-2">Want to offer this under your own brand?</h3>
            <p className="text-xs opacity-40 mb-4">White-label the tools. Earn commission. Join the network.</p>
            <Link href="/network" className="cr-btn cr-btn-primary text-xs px-6 py-2">
              Join the Network
              <ArrowRight size={12} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}