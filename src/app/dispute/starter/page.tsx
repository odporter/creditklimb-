'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { FileText, CheckCircle, ArrowRight, Copy, Download, Heart, Lock, CreditCard } from 'lucide-react'

const DISPUTE_TYPES = [
  { id: 'late-payment', name: 'Late Payment', description: 'Reported as late but I paid on time' },
  { id: 'not-mine', name: 'Not My Account', description: 'This account doesn\'t belong to me' },
  { id: 'wrong-balance', name: 'Wrong Balance', description: 'Showing incorrect amount owed' },
  { id: 'duplicate', name: 'Duplicate', description: 'Same item listed twice' },
  { id: 'closed-wrong', name: 'Closed Incorrectly', description: 'Account shows closed but I didn\'t close it' },
  { id: 'other', name: 'Other Error', description: 'Something else is wrong' },
]

const BUREAUS = [
  { id: 'equifax', name: 'Equifax', address: 'P.O. Box 740256, Atlanta, GA 30374' },
  { id: 'experian', name: 'Experian', address: 'P.O. Box 4500, Allen, TX 75013' },
  { id: 'transunion', name: 'TransUnion', address: 'P.O. Box 2000, Chester, PA 19016' },
]

export default function DisputeStarterPage() {
  const [step, setStep] = useState(1)
  const [disputeType, setDisputeType] = useState('')
  const [bureau, setBureau] = useState('')
  const [showDonation, setShowDonation] = useState(false)
  const [donated, setDonated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    accountName: '',
    accountNumber: '',
    reason: '',
  })

  const selectedBureau = BUREAUS.find(b => b.id === bureau)
  const selectedType = DISPUTE_TYPES.find(t => t.id === disputeType)

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateLetter())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadLetter = () => {
    const blob = new Blob([generateLetter()], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dispute-letter-${bureau}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const generateLetter = () => {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    return `${formData.fullName}
${formData.address}
${formData.city}, ${formData.state} ${formData.zip}

${date}

${selectedBureau?.name}
${selectedBureau?.address}

RE: Dispute of Inaccurate Information on Credit Report

Dear Sir or Madam,

I am writing to formally dispute the following account appearing on my credit report:

Account Name: ${formData.accountName}
Account Number: ${formData.accountNumber}
Reported by: ${selectedBureau?.name}

I believe this information is inaccurate and hereby request its investigation and removal from my credit file pursuant to the Fair Credit Reporting Act (FCRA), Section 611.

The specific nature of this dispute is: ${selectedType?.name}

Additional details: ${formData.reason}

I request that you:

1. Investigate this matter within 30 days as required by law
2. Remove or correct any information that cannot be verified
3. Provide me with written confirmation of the results of your investigation

Under FCRA Section 611(a), if the furnisher cannot verify the accuracy of the disputed information within 30 days, the bureau must delete the information from your file.

Please send all correspondence regarding this dispute to my address listed above.

Sincerely,

${formData.fullName}
${formData.address}
${formData.city}, ${formData.state} ${formData.zip}

Enclosures:
- Copy of Government-Issued ID
- Proof of Residence (utility bill or bank statement)`
  }

  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <div className="cr-container py-8 max-w-3xl">
        
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <span className={step >= 1 ? 'text-cr-primary font-medium' : 'text-cr-muted'}>1. Type</span>
          <span className="text-cr-muted">→</span>
          <span className={step >= 2 ? 'text-cr-primary font-medium' : 'text-cr-muted'}>2. Your Info</span>
          <span className="text-cr-muted">→</span>
          <span className={step >= 3 ? 'text-cr-primary font-medium' : 'ż-cr-muted'}>3. Letter Ready</span>
        </div>

        {/* Step 1: Dispute Type */}
        {step === 1 && (
          <div className="cr-card">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">What needs to be disputed?</h1>
              <p className="text-cr-muted">Select the type of error you want to dispute</p>
            </div>

            <div className="grid gap-3 mb-6">
              {DISPUTE_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => setDisputeType(type.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    disputeType === type.id
                      ? 'border-cr-primary bg-cr-primary/5'
                      : 'border-cr-border hover:border-cr-primary/50'
                  }`}
                >
                  <div className="font-medium">{type.name}</div>
                  <div className="text-sm text-cr-muted">{type.description}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => disputeType && setStep(2)}
              disabled={!disputeType}
              className="cr-btn cr-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        )}

        {/* Step 2: User Info + Bureau */}
        {step === 2 && (
          <div className="cr-card">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Your Information</h2>
              <p className="text-cr-muted text-sm">Enter your details and select a bureau</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="cr-label">Full Legal Name</label>
                <input
                  type="text"
                  className="cr-input"
                  value={formData.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                  placeholder="John Michael Smith"
                />
              </div>
              <div>
                <label className="cr-label">Street Address</label>
                <input
                  type="text"
                  className="cr-input"
                  value={formData.address}
                  onChange={e => handleChange('address', e.target.value)}
                  placeholder="123 Main Street, Apt 4B"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="cr-label">City</label>
                  <input type="text" className="cr-input" value={formData.city} onChange={e => handleChange('city', e.target.value)} placeholder="Chicago" />
                </div>
                <div>
                  <label className="cr-label">State</label>
                  <input type="text" className="cr-input" value={formData.state} onChange={e => handleChange('state', e.target.value)} placeholder="IL" />
                </div>
                <div>
                  <label className="cr-label">ZIP</label>
                  <input type="text" className="cr-input" value={formData.zip} onChange={e => handleChange('zip', e.target.value)} placeholder="60601" />
                </div>
              </div>
              <div>
                <label className="cr-label">Which bureau? (select one)</label>
                <div className="grid grid-cols-3 gap-3">
                  {BUREAUS.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setBureau(b.id)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        bureau === b.id
                          ? 'border-cr-primary bg-cr-primary/5'
                          : 'border-cr-border hover:border-cr-primary/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{b.name}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="cr-label">Account Name (as shown on your report)</label>
                <input
                  type="text"
                  className="cr-input"
                  value={formData.accountName}
                  onChange={e => handleChange('accountName', e.target.value)}
                  placeholder="CAPITAL ONE BANK"
                />
              </div>
              <div>
                <label className="cr-label">Account Number (last 4 digits is fine)</label>
                <input
                  type="text"
                  className="cr-input"
                  value={formData.accountNumber}
                  onChange={e => handleChange('accountNumber', e.target.value)}
                  placeholder="XXXX1234"
                />
              </div>
              <div>
                <label className="cr-label">Why is this wrong? (brief description)</label>
                <textarea
                  className="cr-textarea"
                  value={formData.reason}
                  onChange={e => handleChange('reason', e.target.value)}
                  placeholder="This account does not belong to me..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(1)} className="cr-btn cr-btn-secondary">Back</button>
              <button
                onClick={() => setStep(3)}
                disabled={!bureau || !formData.fullName}
                className="cr-btn cr-btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate My Letter — Free <ArrowRight size={16} className="ml-2" />
              </button>
            </div>

            <p className="text-center text-cr-muted text-sm mt-4">
              <Lock size={12} className="inline mr-1" />
              No payment required. This tool is 100% free.
            </p>
          </div>
        )}

        {/* Step 3: Letter Ready */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="cr-card">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="text-green-500" size={32} />
                <div>
                  <h2 className="text-xl font-bold">Your Letter is Ready!</h2>
                  <p className="text-cr-muted text-sm">Download or copy the letter below. It's yours to use.</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap border border-cr-border">
                {generateLetter()}
              </div>

              <div className="flex gap-4 mt-6">
                <button onClick={copyToClipboard} className="cr-btn cr-btn-secondary flex-1">
                  <Copy size={16} className="mr-2" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={downloadLetter} className="cr-btn cr-btn-primary flex-1">
                  <Download size={16} className="mr-2" />
                  Download
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                  <li>Download and print the letter</li>
                  <li>Sign your name at the bottom</li>
                  <li>Attach copies of your ID and a utility bill</li>
                  <li>Mail to {selectedBureau?.name} via <strong>certified mail</strong> with return receipt</li>
                  <li>Keep the receipt — your proof of mailing</li>
                  <li>Wait 30 days — by law they must respond</li>
                </ol>
              </div>
            </div>

            {/* Optional Donation */}
            {!donated && !showDonation && (
              <div className="cr-card text-center">
                <p className="text-cr-muted mb-4">Help us keep this free for everyone</p>
                <button
                  onClick={() => setShowDonation(true)}
                  className="cr-btn cr-btn-secondary"
                >
                  <Heart size={16} className="mr-2" />
                  Proud to Pay — Optional
                </button>
              </div>
            )}

            {showDonation && !donated && (
              <div className="cr-card">
                <h3 className="font-bold text-center mb-4">Support Free Credit Repair</h3>
                <p className="text-cr-muted text-sm text-center mb-6">
                  Every contribution helps us keep this tool free and add more features.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[5, 10, 25].map(amount => (
                    <button
                      key={amount}
                      className="p-4 rounded-lg border-2 border-cr-border hover:border-cr-primary transition-colors text-lg font-bold"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <p className="text-center text-cr-muted text-sm">
                  (Stripe integration would go here)
                </p>
                <button
                  onClick={() => setDonated(true)}
                  className="cr-btn cr-btn-secondary w-full mt-4"
                >
                  Maybe Later
                </button>
              </div>
            )}

            {donated && (
              <div className="cr-card text-center">
                <Heart className="mx-auto mb-2 text-red-500" size={32} />
                <h3 className="font-bold">Thank you!</h3>
                <p className="text-cr-muted text-sm">You're helping us help more people.</p>
              </div>
            )}

            {/* Upsell to Full System */}
            <div className="cr-card bg-gradient-to-r from-cr-primary to-blue-700 text-white">
              <h3 className="text-lg font-bold mb-2">Need More Letters?</h3>
              <p className="opacity-90 mb-4 text-sm">
                Get letters for all 3 bureaus, sub-bureaus, furnisher notices, and escalation letters — all free.
              </p>
              <Link href="/dispute/full" className="cr-btn bg-white text-cr-primary hover:bg-gray-100 w-full text-center block">
                Access Full System — Free →
              </Link>
            </div>

            <div className="flex gap-4">
              <Link href="/dispute" className="flex-1 text-center py-3 bg-cr-surface border border-cr-border rounded-lg hover:border-cr-primary transition-colors text-sm">
                Dispute Another Item
              </Link>
              <Link href="/tools" className="flex-1 text-center py-3 bg-cr-surface border border-cr-border rounded-lg hover:border-cr-primary transition-colors text-sm">
                More Free Tools
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
