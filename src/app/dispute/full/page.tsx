'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, CreditCard, Send, Lock, ArrowLeft, ArrowRight, CheckCircle, Download, Copy, Building, AlertTriangle, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { Nav } from '@/components/Nav'

const MAJOR_BUREAUS = [
  { id: 'equifax', name: 'Equifax', address: 'P.O. Box 740256, Atlanta, GA 30374', phone: '1-800-525-6285' },
  { id: 'experian', name: 'Experian', address: 'P.O. Box 4500, Allen, TX 75013', phone: '1-888-397-3742' },
  { id: 'transunion', name: 'TransUnion', address: 'P.O. Box 2000, Chester, PA 19016', phone: '1-800-916-8800' },
]

const SUB_BUREAUS = [
  { id: 'lexisnexis', name: 'LexisNexis', address: 'P.O. Box 105, Atlanta, GA 30348', description: 'Background checks for employment, housing, insurance' },
  { id: 'chexsystems', name: 'ChexSystems', address: 'P.O. Box 105, Minneapolis, MN 55480', description: 'Bank account history' },
  { id: 'factortrust', name: 'FactorTrust', address: 'P.O. Box 851, Atlanta, GA 30301', description: 'Alternative credit data for short-term lending' },
  { id: 'microbilt', name: 'MicroBilt', address: 'P.O. Box 968, Atlanta, GA 30301', description: 'Consumer credit for alternative lending' },
  { id: 'earlywarning', name: 'Early Warning Services', address: 'P.O. Box 2187, Omaha, NE 68103', description: 'Deposit account verification and fraud prevention' },
  { id: 'teledata', name: 'TeleCheck', address: 'P.O. Box 5589, Louisville, KY 40255', description: 'Check writing history' },
  { id: 'clerical', name: 'Clerical Solutions', address: 'P.O. Box 220, Southgate, MI 48195', description: 'Employment and income verification' },
  { id: 'global', name: 'Global Payments', address: 'P.O. Box 511689, Los Angeles, CA 90051', description: 'Check and payment history for merchants' },
]

const DISPUTE_TYPES = [
  { id: 'late-payment', name: 'Late Payment', description: 'Incorrect late payment on your report' },
  { id: 'collection', name: 'Collection Account', description: 'Collection that doesn\'t belong to you or is inaccurate' },
  { id: 'charge-off', name: 'Charge-Off', description: 'Account incorrectly charged off' },
  { id: 'bankruptcy', name: 'Bankruptcy', description: 'Not yours or should be removed' },
  { id: 'repossession', name: 'Repossession', description: 'Vehicle or property repossession' },
  { id: 'medical', name: 'Medical Bill', description: 'Medical collection or billing error' },
  { id: 'identity', name: 'Identity Theft', description: 'Accounts opened fraudulently in your name' },
  { id: 'wrong-balance', name: 'Wrong Balance', description: 'Account balance is incorrect' },
  { id: 'duplicate', name: 'Duplicate Account', description: 'Same account listed multiple times' },
  { id: 'inquiry', name: 'Unauthorized Inquiry', description: 'Credit inquiry you didn\'t authorize' },
  { id: 'address', name: 'Wrong Address', description: 'Incorrect addresses on your report' },
  { id: 'name', name: 'Wrong Name', description: 'Name variations that aren\'t you' },
  { id: 'public-record', name: 'Public Record Error', description: 'Judgment, lien, or other public record error' },
]

const FURNISHER_CATEGORIES = [
  { id: 'bank', name: 'Bank or Credit Union', letterType: 'furnisher-dispute' },
  { id: 'collection', name: 'Collection Agency', letterType: 'furnisher-notice' },
  { id: 'credit-card', name: 'Credit Card Company', letterType: 'furnisher-dispute' },
  { id: 'auto', name: 'Auto Finance', letterType: 'furnisher-dispute' },
  { id: 'mortgage', name: 'Mortgage Servicer', letterType: 'furnisher-dispute' },
  { id: 'medical', name: 'Medical Provider', letterType: 'furnisher-notice' },
  { id: 'utility', name: 'Utility/Telecom', letterType: 'utility-dispute' },
]

function generateBureauLetter(data: any, bureau: any, disputeType: any) {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${bureau.name}\n${bureau.address}\n\n${date}\n\nTo Whom It May Concern:\n\nI am writing to dispute the following information appearing on my credit report. I believe this information is inaccurate and request that you investigate and correct or remove it pursuant to the Fair Credit Reporting Act (FCRA), Section 611.\n\nDISPUTED INFORMATION:\nAccount Name: ${data.accountName || '[Account Name]'}\nAccount Number: ${data.accountNumber || '[Account Number]'}\nDispute Type: ${disputeType?.name || data.disputeType}\n\nREASON FOR DISPUTE:\n${data.reason || '[Explain why this information is inaccurate]'}\n\nI request that you:\n1. Investigate this matter within 30 days as required by the FCRA\n2. Contact the furnisher of this information to verify its accuracy\n3. Correct any inaccurate information or remove it from my credit report\n4. Provide written notification of the results within 30 days\n\nIMPORTANT: If the furnisher fails to respond within the 30-day investigation period, you are legally required to delete this information from my credit report.\n\nI have enclosed copies of supporting documentation. Please investigate promptly.\n\nSincerely,\n${data.fullName || '[Your Name]'}\n${data.address || '[Your Address]'}\n${data.city ? `${data.city}, ${data.state} ${data.zip}` : '[City, State ZIP]'}\n\nEnclosures:\n- Copy of Government-Issued ID\n- Proof of Current Address\n- [Supporting Documentation]`
}

function generateFurnisherLetter(data: any, furnisherType: any, disputeType: any) {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${date}\n\nTo the Compliance Officer / Dispute Department:\n\nRE: Formal Dispute Notice — Account ${data.accountNumber || '[Account Number]'}\nReference: ${data.fullName || '[Your Name]'}, SSN: XXX-XX-${data.ssnLast4 || 'XXXX'}\n\nDear Compliance Officer:\n\nI am writing to formally dispute inaccurate information that your organization has furnished to consumer reporting agencies.\n\nDISPUTED ITEM:\nFurnisher: ${furnisherType.name}\nAccount Name: ${data.accountName || '[Account Name]'}\nAccount Number: ${data.accountNumber || '[Account Number]'}\nDispute Type: ${disputeType?.name || data.disputeType}\n\nBASIS FOR DISPUTE:\n${data.reason || 'This information is inaccurate because: [explain]'}\n\nUnder the Fair Credit Reporting Act (FCRA), specifically Section 623(a)(8), you are required to investigate and respond to this dispute within 30 days of receipt. If you fail to investigate and correct inaccurate information, you may be liable under Section 616.\n\nDEMAND:\n1. Investigate this dispute within 30 days\n2. Report the accurate status of this account to all consumer reporting agencies\n3. Provide me with written confirmation of the investigation results\n\nIf this information is inaccurate or cannot be verified, I demand that you immediately correct the information on my credit report and notify all consumer reporting agencies.\n\nFailure to respond or correct inaccurate information may result in further legal action.\n\nSincerely,\n${data.fullName || '[Your Name]'}\n${data.address || '[Your Address]'}\n${data.city ? `${data.city}, ${data.state} ${data.zip}` : '[City, State ZIP]'}\n\ncc: Consumer Reporting Agencies (Equifax, Experian, TransUnion)\nLegal Department — FCRA Compliance`
}

function generate60DayEscalation(data: any) {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${date}\n\nVIA CERTIFIED MAIL — RETURN RECEIPT REQUESTED\n\nTo the Compliance Officer / Legal Department:\n\nRE: SECOND NOTICE — FCRA VIOLATION — 60-DAY ESCALATION\nAccount: ${data.accountNumber || '[Account Number]'}\nConsumer: ${data.fullName || '[Your Name]'}\n\nDear Sir or Madam:\n\nThis is a SECOND REQUEST for investigation of disputed information your organization furnished to consumer reporting agencies. This letter serves as formal notice that your organization has FAILED to respond to my initial dispute within the 30-day period required by the Fair Credit Reporting Act (FCRA), Section 623(a)(8).\n\nBACKGROUND:\nI submitted an initial dispute on ${date} regarding inaccurate information your organization reported concerning account ${data.accountNumber || '[Account Number]'}. To date, I have received no response and the inaccurate information remains on my credit report.\n\nDEMAND:\nYou are hereby demanded to:\n1. Immediately investigate and correct the inaccurate information\n2. Report the accurate status to all consumer reporting agencies within 15 days\n3. Provide me with written confirmation of all actions taken\n\nNOTICE OF LIABILITY:\nIf you fail to comply with your obligations under the FCRA:\n- You are liable for actual damages, punitive damages up to $1,000, and attorney's fees under Section 616\n- I will file complaints with the Consumer Financial Protection Bureau (CFPB)\n- I will file complaints with the Federal Trade Commission (FTC)\n- I may pursue additional remedies under state law\n\nI expect written response within 15 business days or I will proceed with legal action and regulatory complaints.\n\nSincerely,\n${data.fullName || '[Your Name]'}\n${data.address || '[Your Address]'}\n${data.city ? `${data.city}, ${data.state} ${data.zip}` : '[City, State ZIP]'}\n\ncc: Consumer Financial Protection Bureau (CFPB)\nFederal Trade Commission (FTC)\nState Attorney General`
}

function generateSubBureauLetter(data: any, bureau: any, disputeType: any) {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${bureau.name}\n${bureau.address}\n\n${date}\n\nTo Whom It May Concern:\n\nI am writing to dispute information your organization holds about me. Under the Fair Credit Reporting Act (FCRA), you are required to investigate disputed information within 30 days.\n\nMY INFORMATION:\nName: ${data.fullName || '[Your Name]'}\nCurrent Address: ${data.address || '[Your Address]'}, ${data.city || ''}, ${data.state || ''} ${data.zip || ''}\nSSN: XXX-XX-${data.ssnLast4 || 'XXXX'}\n\nDISPUTED INFORMATION:\nAccount/Item: ${data.accountName || '[Describe the item]'}\nAccount Number: ${data.accountNumber || '[Account Number]'}\nDispute Type: ${disputeType?.name || data.disputeType}\n\nREASON FOR DISPUTE:\n${data.reason || 'This information is inaccurate because: [explain]'}\n\nDEMAND:\nPursuant to the FCRA, I demand that you:\n1. Investigate this dispute within 30 days\n2. Correct or remove inaccurate information\n3. Notify any user of this information that a dispute has been filed\n4. Provide me with written confirmation of your findings\n\nIf this information cannot be verified as accurate, I demand its immediate removal.\n\nSincerely,\n${data.fullName || '[Your Name]'}\n${data.address || '[Your Address]'}\n${data.city ? `${data.city}, ${data.state} ${data.zip}` : '[City, State ZIP]'}\n\nEnclosures: Copy of ID, Proof of Address`
}

function generatePayForDelete(data: any) {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${date}\n\nTo: ${data.collectionAgency || '[Collection Agency Name]'}\nAttention: Dispute / Settlement Department\n\nRE: Settlement Offer — Pay for Delete\nAccount: ${data.accountNumber || '[Account Number]'}\nConsumer: ${data.fullName || '[Your Name]'}\n\nDear Sir or Madam:\n\nI am writing regarding the above-referenced debt. In exchange for payment, I request that you remove all references to this account from my credit report at Equifax, Experian, and TransUnion.\n\nOFFER:\nI am willing to pay $${data.settlementAmount || '[Amount]'} as a full and final settlement. In exchange, you agree to:\n1. Remove all references to this account from my credit report\n2. Confirm in writing that this account has been updated to "Paid" or "Removed"\n3. Refrain from selling or transferring this debt to any other collection agency\n\nTERMS:\nUpon receipt of your written agreement to these terms, I will submit payment within 5 business days.\n\nWARNING:\nContinued reporting of inaccurate information may violate the FCRA, potentially exposing your organization to liability under Section 616.\n\nPlease respond within 10 business days to confirm acceptance.\n\nSincerely,\n${data.fullName || '[Your Name]'}\n${data.address || '[Your Address]'}\n${data.city ? `${data.city}, ${data.state} ${data.zip}` : '[City, State ZIP]'}\n\nEnclosures: Copy of correspondence (if any)`
}

export default function FullDisputePage() {
  const [step, setStep] = useState(1)
  const [paid, setPaid] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [selectedBureaus, setSelectedBureaus] = useState<string[]>(['equifax', 'experian', 'transunion'])
  const [selectedSubBureaus, setSelectedSubBureaus] = useState<string[]>([])
  const [selectedFurnisherType, setSelectedFurnisherType] = useState('')
  const [includeEscalation, setIncludeEscalation] = useState(false)
  const [includePayForDelete, setIncludePayForDelete] = useState(false)
  const [disputeType, setDisputeType] = useState('')
  const [showSubBureaus, setShowSubBureaus] = useState(false)
  const [showFurnisher, setShowFurnisher] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    ssnLast4: '',
    accountName: '',
    accountNumber: '',
    reason: '',
    collectionAgency: '',
    settlementAmount: '',
  })
  const [generatedLetters, setGeneratedLetters] = useState<{ label: string, content: string, type: string }[]>([])
  const [email, setEmail] = useState('')

  // Check for Stripe success redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true' && params.get('tier') === 'full') {
      setPaid(true)
      setStep(4)
      generateLetters()
      window.history.replaceState({}, '', '/dispute/full')
    }
  }, [])

  const toggleBureau = (id: string) => {
    setSelectedBureaus(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    )
  }

  const toggleSubBureau = (id: string) => {
    setSelectedSubBureaus(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    )
  }

  const letterCount = selectedBureaus.length + selectedSubBureaus.length +
    (selectedFurnisherType ? 1 : 0) +
    (includeEscalation ? 1 : 0) +
    (includePayForDelete ? 1 : 0)

  const handleProceedToPayment = () => {
    if (!formData.fullName || !formData.accountName) return
    setStep(3.5)
  }

  const handleStripePayment = async () => {
    if (!email) { setPaymentError('Email is required'); return }
    setPaymentLoading(true)
    setPaymentError('')
    try {
      const base = window.location.origin
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: 'full',
          email,
          name: formData.fullName,
          successUrl: `${base}/dispute/full?success=true&tier=full`,
          cancelUrl: `${base}/dispute/full`,
        })
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setPaymentError(data.error || 'Payment failed. Try again.')
      }
    } catch {
      setPaymentError('Payment failed. Please try again.')
    }
    setPaymentLoading(false)
  }

  const generateLetters = () => {
    const letters: { label: string, content: string, type: string }[] = []
    const dispute = DISPUTE_TYPES.find(d => d.id === disputeType)
    const furnisherType = FURNISHER_CATEGORIES.find(f => f.id === selectedFurnisherType)

    selectedBureaus.forEach(bureauId => {
      const bureau = MAJOR_BUREAUS.find(b => b.id === bureauId)
      if (bureau) {
        letters.push({
          label: `${bureau.name} — Bureau Dispute`,
          content: generateBureauLetter(formData, bureau, dispute),
          type: 'bureau'
        })
      }
    })

    selectedSubBureaus.forEach(bureauId => {
      const bureau = SUB_BUREAUS.find(b => b.id === bureauId)
      if (bureau) {
        letters.push({
          label: `${bureau.name} — Sub-Bureau Dispute`,
          content: generateSubBureauLetter(formData, bureau, dispute),
          type: 'sub-bureau'
        })
      }
    })

    if (selectedFurnisherType) {
      letters.push({
        label: `${furnisherType?.name || 'Furnisher'} — Furnisher Dispute`,
        content: generateFurnisherLetter(formData, furnisherType, dispute),
        type: 'furnisher'
      })
    }

    if (includeEscalation) {
      letters.push({
        label: '60-Day Escalation Notice',
        content: generate60DayEscalation(formData),
        type: 'escalation'
      })
    }

    if (includePayForDelete) {
      letters.push({
        label: 'Pay-for-Delete Agreement',
        content: generatePayForDelete(formData),
        type: 'payfordelete'
      })
    }

    setGeneratedLetters(letters)
    setPaid(true)
  }

  const copyLetter = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const downloadAll = () => {
    generatedLetters.forEach((letter, i) => {
      const blob = new Blob([letter.content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `letter-${i + 1}-${letter.type}.txt`
      a.click()
    })
  }

  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />

      <div className="cr-container py-8">
        <Link href="/dispute" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
          <ArrowLeft size={16} /> Back to Dispute Options
        </Link>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-cr-primary text-white' : 'bg-cr-surface text-cr-muted'}`}>
                {s < step || (s === 4 && paid) ? <CheckCircle size={16} /> : s}
              </div>
              <div className={`flex-1 h-1 rounded-full transition-colors ${step >= s || (s === 4 && paid) ? 'bg-cr-primary' : 'bg-cr-surface'}`} />
            </div>
          ))}
        </div>

        {/* Step 1: Choose bureaus */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="cr-card">
              <h2 className="text-xl font-bold mb-2">Step 1: Choose What to Dispute</h2>
              <p className="text-cr-muted text-sm mb-6">Select the bureaus and sub-bureaus that have the item you want to dispute.</p>

              <h3 className="font-semibold mb-3">Major Credit Bureaus</h3>
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                {MAJOR_BUREAUS.map(b => (
                  <button key={b.id} onClick={() => toggleBureau(b.id)} className={`p-4 rounded-lg border-2 text-left transition ${selectedBureaus.includes(b.id) ? 'border-cr-primary bg-cr-primary/5' : 'border-cr-border hover:border-cr-primary/50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedBureaus.includes(b.id) ? 'border-cr-primary bg-cr-primary' : 'border-cr-border'}`}>
                        {selectedBureaus.includes(b.id) && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <span className="font-semibold">{b.name}</span>
                    </div>
                    <p className="text-xs text-cr-muted pl-7">{b.address}</p>
                  </button>
                ))}
              </div>

              {/* Sub-bureaus */}
              <button onClick={() => setShowSubBureaus(!showSubBureaus)} className="flex items-center gap-2 text-cr-primary font-semibold mb-3">
                <ChevronDown size={16} className={`transition-transform ${showSubBureaus ? 'rotate-180' : ''}`} />
                Add Sub-Bureaus (+8 more agencies)
              </button>

              {showSubBureaus && (
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {SUB_BUREAUS.map(b => (
                    <button key={b.id} onClick={() => toggleSubBureau(b.id)} className={`p-3 rounded-lg border-2 text-left transition ${selectedSubBureaus.includes(b.id) ? 'border-cr-primary bg-cr-primary/5' : 'border-cr-border hover:border-cr-primary/50'}`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selectedSubBureaus.includes(b.id) ? 'border-cr-primary bg-cr-primary' : 'border-cr-border'}`}>
                          {selectedSubBureaus.includes(b.id) && <CheckCircle size={12} className="text-white" />}
                        </div>
                        <div>
                          <span className="font-semibold text-sm">{b.name}</span>
                          <p className="text-xs text-cr-muted">{b.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Furnisher */}
              <button onClick={() => setShowFurnisher(!showFurnisher)} className="flex items-center gap-2 text-cr-primary font-semibold mb-3">
                <ChevronDown size={16} className={`transition-transform ${showFurnisher ? 'rotate-180' : ''}`} />
                Add Furnisher Dispute (goes directly to the source)
              </button>

              {showFurnisher && (
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {FURNISHER_CATEGORIES.map(f => (
                    <button key={f.id} onClick={() => setSelectedFurnisherType(selectedFurnisherType === f.id ? '' : f.id)} className={`p-3 rounded-lg border-2 text-left transition ${selectedFurnisherType === f.id ? 'border-cr-primary bg-cr-primary/5' : 'border-cr-border hover:border-cr-primary/50'}`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selectedFurnisherType === f.id ? 'border-cr-primary bg-cr-primary' : 'border-cr-border'}`}>
                          {selectedFurnisherType === f.id && <CheckCircle size={12} className="text-white" />}
                        </div>
                        <span className="font-semibold text-sm">{f.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Options */}
              <div className="border-t border-cr-border pt-4 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={includeEscalation} onChange={e => setIncludeEscalation(e.target.checked)} className="mt-1" />
                  <div>
                    <span className="font-medium">60-Day Escalation Letter</span>
                    <p className="text-xs text-cr-muted">Send this if the bureau doesn't respond. Puts legal pressure on the furnisher.</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={includePayForDelete} onChange={e => setIncludePayForDelete(e.target.checked)} className="mt-1" />
                  <div>
                    <span className="font-medium">Pay-for-Delete Agreement</span>
                    <p className="text-xs text-cr-muted">Negotiate with collectors to remove item in exchange for payment.</p>
                  </div>
                </label>
              </div>
            </div>

            <button onClick={() => setStep(2)} disabled={selectedBureaus.length === 0} className="cr-btn cr-btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2">
              Continue to Your Info <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: User info */}
        {step === 2 && (
          <div className="cr-card">
            <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
              <ArrowLeft size={16} /> Back
            </button>

            <h2 className="text-xl font-bold mb-2">Step 2: Your Information</h2>
            <p className="text-cr-muted text-sm mb-6">This goes on all your letters.</p>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="cr-label">Full Legal Name</label>
                  <input type="text" className="cr-input" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} placeholder="John Michael Smith" />
                </div>
                <div>
                  <label className="cr-label">Last 4 of SSN</label>
                  <input type="text" className="cr-input" value={formData.ssnLast4} onChange={e => setFormData({ ...formData, ssnLast4: e.target.value })} placeholder="1234" maxLength={4} />
                </div>
              </div>
              <div>
                <label className="cr-label">Street Address</label>
                <input type="text" className="cr-input" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} placeholder="123 Main Street, Apt 4B" />
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

              <div className="border-t border-cr-border pt-4 mt-4">
                <h3 className="font-semibold mb-3">The Item You're Disputing</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="cr-label">Account/Company Name</label>
                    <input type="text" className="cr-input" value={formData.accountName} onChange={e => setFormData({ ...formData, accountName: e.target.value })} placeholder="CAPITAL ONE BANK" />
                  </div>
                  <div>
                    <label className="cr-label">Account Number (last 4 digits)</label>
                    <input type="text" className="cr-input" value={formData.accountNumber} onChange={e => setFormData({ ...formData, accountNumber: e.target.value })} placeholder="XXXX1234" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="cr-label">Why is this wrong? (be specific)</label>
                  <textarea className="cr-textarea" value={formData.reason} onChange={e => setFormData({ ...formData, reason: e.target.value })} placeholder="This account does not belong to me. I have never had an account with this company. The SSN on this account does not match mine..." rows={4} />
                </div>
              </div>

              {includePayForDelete && (
                <div className="border-t border-cr-border pt-4 mt-4">
                  <h3 className="font-semibold mb-3">Pay-for-Delete Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="cr-label">Collection Agency Name</label>
                      <input type="text" className="cr-input" value={formData.collectionAgency} onChange={e => setFormData({ ...formData, collectionAgency: e.target.value })} placeholder="Portfolio Recovery Associates" />
                    </div>
                    <div>
                      <label className="cr-label">Settlement Amount You'll Offer</label>
                      <input type="text" className="cr-input" value={formData.settlementAmount} onChange={e => setFormData({ ...formData, settlementAmount: e.target.value })} placeholder="50" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(1)} className="cr-btn cr-btn-secondary">Back</button>
              <button onClick={handleProceedToPayment} disabled={!formData.fullName || !formData.accountName} className="cr-btn cr-btn-primary flex-1 disabled:opacity-50 flex items-center justify-center gap-2">
                Continue to Payment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3.5: Payment gate */}
        {step === 3.5 && (
          <div className="cr-card">
            <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
              <ArrowLeft size={16} /> Back
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={28} className="text-purple-900" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Full Repair Pack — {letterCount} Letters</h2>
              <p className="text-cr-muted">This is your complete credit repair package. Pay once, use forever.</p>
            </div>

            {/* Full pack benefits */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-5">
              <div className="text-xs font-bold text-purple-900 uppercase tracking-wide mb-3">What's included:</div>
              <div className="space-y-2">
                {[
                  `${letterCount} FCRA-compliant letters — bureaus, sub-bureaus, and furnishers`,
                  "60-Day Escalation Letter if bureaus don't respond (puts legal pressure on)",
                  'Pay-for-Delete template to negotiate with collectors off your report',
                  'Step-by-step mailing guide + certified mail instructions included',
                  'Unlimited use — dispute multiple items with these templates forever',
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={14} className="text-purple-700 flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cr-surface rounded-xl p-4 mb-5">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">Your letter pack</span>
                <span className="text-cr-muted">{letterCount} letters</span>
              </div>
              <ul className="space-y-1 text-sm text-cr-muted max-h-32 overflow-y-auto">
                {selectedBureaus.map(id => {
                  const b = MAJOR_BUREAUS.find(x => x.id === id)
                  return b ? <li key={id}>• {b.name} Bureau Dispute</li> : null
                })}
                {selectedSubBureaus.map(id => {
                  const b = SUB_BUREAUS.find(x => x.id === id)
                  return b ? <li key={id}>• {b.name} Dispute</li> : null
                })}
                {selectedFurnisherType && <li>• Furnisher Dispute Notice</li>}
                {includeEscalation && <li>• 60-Day Escalation Letter</li>}
                {includePayForDelete && <li>• Pay-for-Delete Agreement</li>}
              </ul>
              <div className="border-t border-cr-border mt-3 pt-3 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-purple-900">$29</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="cr-label">Email (for receipt)</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="cr-input" />
              </div>

              {paymentError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-red-700 text-sm">
                  {paymentError}
                </div>
              )}

              <button onClick={handleStripePayment} disabled={paymentLoading || !email} className="cr-btn cr-btn-primary w-full py-4 text-lg disabled:opacity-50 flex items-center justify-center gap-2">
                {paymentLoading ? (
                  <Clock size={18} className="animate-spin" />
                ) : (
                  <CreditCard size={18} />
                )}
                {paymentLoading ? 'Redirecting to payment...' : 'Pay $29 — Full Repair Pack'}
              </button>

              <p className="text-center text-cr-muted text-xs flex items-center justify-center gap-1">
                <Lock size={12} /> Secured by Stripe. One-time payment, no subscription.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-cr-border">
              <p className="text-cr-muted text-sm text-center">
                Can't afford $29 right now?{' '}
                <Link href="/dispute/starter" className="text-cr-primary hover:underline">
                  Start for free
                </Link>
                {' '}— 1 bureau, 1 letter, share to unlock.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Generated Letters (only shown after payment) */}
        {step === 4 && paid && (
          <div className="space-y-6">
            <div className="cr-card bg-green-50 border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={32} />
                <div>
                  <h2 className="text-xl font-bold text-green-900">{generatedLetters.length} Letters Generated!</h2>
                  <p className="text-green-700">Review, copy, or download each letter below.</p>
                </div>
              </div>
            </div>

            {/* Upsell */}
            <div className="cr-card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1">
                  <div className="text-xs font-bold text-purple-900 uppercase tracking-wide mb-1">Save Time. Guaranteed Delivery.</div>
                  <h3 className="font-bold text-lg mb-1">Want us to mail this letter AND handle everything?</h3>
                  <p className="text-cr-muted text-sm">
                    We print, sign, and mail via certified mail — plus follow up at 30 and 60 days. You do nothing.
                  </p>
                </div>
                <Link href="/dispute/mail-service" className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap flex items-center gap-2 flex-shrink-0">
                  We Handle It — $49 <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={downloadAll} className="cr-btn cr-btn-primary">
                <Download size={16} className="mr-2" /> Download All
              </button>
            </div>

            {generatedLetters.map((letter, i) => (
              <div key={i} className="cr-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${letter.type === 'bureau' ? 'bg-blue-100 text-blue-700' : letter.type === 'sub-bureau' ? 'bg-purple-100 text-purple-700' : letter.type === 'furnisher' ? 'bg-orange-100 text-orange-700' : letter.type === 'escalation' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {letter.type}
                    </span>
                    <h3 className="font-semibold">{letter.label}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => copyLetter(letter.content)} className="cr-btn cr-btn-secondary text-sm py-1 px-3">
                      <Copy size={14} className="mr-1" /> Copy
                    </button>
                    <button onClick={() => {
                      const blob = new Blob([letter.content], { type: 'text/plain' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `letter-${i + 1}-${letter.type}.txt`
                      a.click()
                    }} className="cr-btn cr-btn-primary text-sm py-1 px-3">
                      <Download size={14} className="mr-1" /> Download
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {letter.content}
                </div>
              </div>
            ))}

            <div className="cr-card bg-cr-surface">
              <h3 className="font-semibold mb-3">Next Steps</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-cr-muted">
                <li>Download or copy each letter</li>
                <li>Sign every letter at the bottom</li>
                <li>Attach copies of your ID and proof of address</li>
                <li>Mail via <strong>certified mail with return receipt</strong> to each address</li>
                <li>Keep all receipts — your proof of mailing</li>
                <li>Wait 30 days. By law, they must respond.</li>
                <li>If no response after 30 days, send the 60-day escalation letter</li>
              </ol>
            </div>

            <div className="flex gap-4">
              <button onClick={() => { setStep(1); setGeneratedLetters([]); setPaid(false); }} className="cr-btn cr-btn-secondary flex-1">
                Generate More Letters
              </button>
              <Link href="/dispute/mail-service" className="cr-btn cr-btn-primary flex-1 text-center">
                Let Us Mail This For You — $49
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
