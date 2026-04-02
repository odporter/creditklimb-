'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, CreditCard, Send, Lock, ArrowLeft, ArrowRight, CheckCircle, Download, Copy, Building, AlertTriangle, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { Nav } from '@/components/Nav'

// ============================================================
// DATA: ALL BUREAUS, SUB-BUREAUS, AND FURNISHERS
// ============================================================

const MAJOR_BUREAUS = [
  { id: 'equifax', name: 'Equifax', address: 'P.O. Box 740256, Atlanta, GA 30374', phone: '1-800-525-6285' },
  { id: 'experian', name: 'Experian', address: 'P.O. Box 4500, Allen, TX 75013', phone: '1-888-397-3742' },
  { id: 'transunion', name: 'TransUnion', address: 'P.O. Box 2000, Chester, PA 19016', phone: '1-800-916-8800' },
]

const SUB_BUREAUS = [
  { id: 'lexisnexis', name: 'LexisNexis', address: 'P.O. Box 105, Atlanta, GA 30348', phone: '1-800-456-6004', description: 'Background checks for employment, housing, insurance' },
  { id: 'chexsystems', name: 'ChexSystems', address: 'P.O. Box 105, Minneapolis, MN 55480', phone: '1-800-977-7284', description: 'Bank account history and consumer banking reports' },
  { id: 'factortrust', name: 'FactorTrust', address: 'P.O. Box 851, Atlanta, GA 30301', phone: '1-855-366-2727', description: 'Alternative credit data for short-term lending' },
  { id: 'microbilt', name: 'MicroBilt', address: 'P.O. Box 968, Atlanta, GA 30301', phone: '1-800-884-4744', description: 'Consumer credit for alternative lending' },
  { id: 'earlywarning', name: 'Early Warning Services', address: 'P.O. Box 2187, Omaha, NE 68103', phone: '1-800-745-7994', description: 'Deposit account verification and fraud prevention' },
  { id: 'teledata', name: 'TeleCheck', address: 'P.O. Box 5589, Louisville, KY 40255', phone: '1-800-537-5424', description: 'Check writing and banking history' },
  { id: 'clerical', name: 'Clerical Solutions', address: 'P.O. Box 220, Southgate, MI 48195', phone: '1-800-368-5123', description: 'Employment and income verification' },
  { id: 'global', name: 'Global Payments', address: 'P.O. Box 511689, Los Angeles, CA 90051', phone: '1-800-367-0774', description: 'Check and payment history for merchants' },
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

// Furnisher categories with template types
const FURNISHER_CATEGORIES = [
  { id: 'bank', name: 'Bank or Credit Union', letterType: 'furnisher-dispute' },
  { id: 'collection', name: 'Collection Agency', letterType: 'furnisher-notice' },
  { id: 'credit-card', name: 'Credit Card Company', letterType: 'furnisher-dispute' },
  { id: 'auto', name: 'Auto Finance', letterType: 'furnisher-dispute' },
  { id: 'mortgage', name: 'Mortgage Servicer', letterType: 'furnisher-dispute' },
  { id: 'medical', name: 'Medical Provider', letterType: 'furnisher-notice' },
  { id: 'utility', name: 'Utility/Telecom', letterType: 'utility-dispute' },
]

// ============================================================
// LETTER TEMPLATES
// ============================================================

function generateBureauLetter(data: any, bureau: any, disputeType: any) {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${bureau.name}
${bureau.address}

${date}

To Whom It May Concern:

I am writing to dispute the following information appearing on my credit report. I believe this information is inaccurate and request that you investigate and correct or remove it pursuant to the Fair Credit Reporting Act (FCRA), Section 611.

DISPUTED INFORMATION:
Account Name: ${data.accountName || '[Account Name]'}
Account Number: ${data.accountNumber || '[Account Number]'}
Dispute Type: ${disputeType?.name || data.disputeType}

REASON FOR DISPUTE:
${data.reason || '[Explain why this information is inaccurate]'}

I request that you:
1. Investigate this matter within 30 days as required by the FCRA
2. Contact the furnisher of this information to verify its accuracy
3. Correct any inaccurate information or remove it from my credit report
4. Provide written notification of the results within 30 days

IMPORTANT: If the furnisher fails to respond within the 30-day investigation period, you are legally required to delete this information from my credit report.

I have enclosed copies of supporting documentation. Please investigate promptly.

Sincerely,
${data.fullName || '[Your Name]'}
${data.address || '[Your Address]'}
${data.city ? `${data.city}, ${data.state} ${data.zip}` : '[City, State ZIP]'}

Enclosures:
- Copy of Government-Issued ID
- Proof of Current Address
- [Supporting Documentation]`
}

function generateFurnisherLetter(data: any, furnisherType: any, disputeType: any) {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${date}

To the Compliance Officer / Dispute Department:

RE: Formal Dispute Notice — Account ${data.accountNumber || '[Account Number]'}
Reference: ${data.fullName || '[Your Name]'}, SSN: XXX-XX-${data.ssnLast4 || 'XXXX'}

Dear Compliance Officer:

I am writing to formally dispute inaccurate information that your organization has furnished to consumer reporting agencies, including Equifax, Experian, and/or TransUnion.

DISPUTED ITEM:
Furnisher: ${furnisherType.name}
Account Name: ${data.accountName || '[Account Name]'}
Account Number: ${data.accountNumber || '[Account Number]'}
Dispute Type: ${disputeType?.name || data.disputeType}

BASIS FOR DISPUTE:
${data.reason || 'This information is inaccurate because: [explain]'}

Under the Fair Credit Reporting Act (FCRA), specifically Section 623(a)(8), you are required to investigate and respond to this dispute within 30 days of receipt. If you fail to investigate and correct inaccurate information, you may be liable under Section 616 of the FCRA.

DEMAND:
1. Investigate this dispute within 30 days
2. Report the accurate status of this account to all consumer reporting agencies
3. Provide me with written confirmation of the investigation results

If this information is inaccurate or cannot be verified, I demand that you immediately:
- Correct the information on my credit report
- Notify all consumer reporting agencies to which you have reported this information

Failure to respond or correct inaccurate information may result in further legal action.

Sincerely,
${data.fullName || '[Your Name]'}
${data.address || '[Your Address]'}
${data.city ? `${data.city}, ${data.state} ${data.zip}` : '[City, State ZIP]'}

cc: Consumer Reporting Agencies (Equifax, Experian, TransUnion)
Legal Department — FCRA Compliance`
}

function generate60DayEscalation(data: any) {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${date}

VIA CERTIFIED MAIL — RETURN RECEIPT REQUESTED

To the Compliance Officer / Legal Department:

RE: SECOND NOTICE — FCRA VIOLATION — 60-DAY ESCALATION
Account: ${data.accountNumber || '[Account Number]'}
Consumer: ${data.fullName || '[Your Name]'}

Dear Sir or Madam:

This is a SECOND REQUEST for investigation of disputed information that your organization furnished to consumer reporting agencies. This letter serves as formal notice that your organization has FAILED to respond to my initial dispute within the 30-day period required by the Fair Credit Reporting Act (FCRA), Section 623(a)(8).

BACKGROUND:
I submitted an initial dispute on ${date} regarding inaccurate information your organization reported concerning account ${data.accountNumber || '[Account Number]'}. To date, I have received no response and the inaccurate information remains on my credit report.

DEMAND:
You are hereby demanded to:
1. Immediately investigate and correct the inaccurate information
2. Report the accurate status to all consumer reporting agencies within 15 days
3. Provide me with written confirmation of all actions taken

NOTICE OF LIABILITY:
If you fail to comply with your obligations under the FCRA, please be advised that:
- You are liable for actual damages, punitive damages up to $1,000, and attorney's fees under Section 616
- I will file complaints with the Consumer Financial Protection Bureau (CFPB)
- I will file complaints with the Federal Trade Commission (FTC)
- I may pursue additional remedies under state law

I expect written response within 15 business days or I will proceed with legal action and regulatory complaints.

Sincerely,
${data.fullName || '[Your Name]'}
${data.address || '[Your Address]'}
${data.city ? `${data.city}, ${data.state} ${data.zip}` : '[City, State ZIP]'}

cc: Consumer Financial Protection Bureau (CFPB)
Federal Trade Commission (FTC)
State Attorney General`
}

function generateSubBureauLetter(data: any, bureau: any, disputeType: any) {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${bureau.name}
${bureau.address}

${date}

To Whom It May Concern:

I am writing to dispute information your organization holds about me. Under the Fair Credit Reporting Act (FCRA), you are required to investigate disputed information within 30 days.

MY INFORMATION:
Name: ${data.fullName || '[Your Name]'}
Current Address: ${data.address || '[Your Address]'}, ${data.city || ''}, ${data.state || ''} ${data.zip || ''}
SSN: XXX-XX-${data.ssnLast4 || 'XXXX'}

DISPUTED INFORMATION:
Account/Item: ${data.accountName || '[Describe the item]'}
Account Number: ${data.accountNumber || '[Account Number]'}
Dispute Type: ${disputeType?.name || data.disputeType}

REASON FOR DISPUTE:
${data.reason || 'This information is inaccurate because: [explain]'}

DEMAND:
Pursuant to the FCRA, I demand that you:
1. Investigate this dispute within 30 days
2. Correct or remove inaccurate information
3. Notify any user of this information that a dispute has been filed
4. Provide me with written confirmation of your findings

If this information cannot be verified as accurate, I demand its immediate removal.

Sincerely,
${data.fullName || '[Your Name]'}
${data.address || '[Your Address]'}
${data.city ? `${data.city}, ${data.state} ${data.zip}` : '[City, State ZIP]'}

Enclosures: Copy of ID, Proof of Address`
}

function generatePayForDelete(data: any) {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${date}

To: ${data.collectionAgency || '[Collection Agency Name]'}
Attention: Dispute / Settlement Department

RE: Settlement Offer — Pay for Delete
Account: ${data.accountNumber || '[Account Number]'}
Consumer: ${data.fullName || '[Your Name]'}

Dear Sir or Madam:

I am writing regarding the above-referenced debt, which I believe is being reported to consumer reporting agencies as inaccurate or unverifiable.

OFFER:
I am willing to pay the sum of $${data.settlementAmount || '[Amount]'} as a full and final settlement of this account. In exchange, you agree to:

1. Remove all references to this account from my credit report at Equifax, Experian, and TransUnion
2. Confirm in writing that this account has been updated to "Paid" or "Removed"
3. Refrain from selling or transferring this debt to any other collection agency

TERMS:
Upon receipt of your written agreement to these terms, I will submit payment of $${data.settlementAmount || '[Amount]'}. Payment will be made within 5 business days of your written confirmation.

WARNING:
Please note that if this account is not accurately reported, your continued reporting of inaccurate information may violate the Fair Credit Reporting Act (FCRA), potentially exposing your organization to liability under Section 616.

Please respond within 10 business days to confirm acceptance.

Sincerely,
${data.fullName || '[Your Name]'}
${data.address || '[Your Address]'}
${data.city ? `${data.city}, ${data.state} ${data.zip}` : '[City, State ZIP]'}

Enclosures: Copy of correspondence (if any)`
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function FullDisputePage() {
  const [step, setStep] = useState(1)
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

  const generateAllLetters = () => {
    const letters: { label: string, content: string, type: string }[] = []
    const dispute = DISPUTE_TYPES.find(d => d.id === disputeType)
    const furnisherType = FURNISHER_CATEGORIES.find(f => f.id === selectedFurnisherType)

    // Bureau letters
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

    // Sub-bureau letters
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

    // Furnisher letters
    if (selectedFurnisherType) {
      letters.push({
        label: `${furnisherType?.name || 'Furnisher'} — Furnisher Dispute`,
        content: generateFurnisherLetter(formData, furnisherType, dispute),
        type: 'furnisher'
      })
    }

    // 60-day escalation
    if (includeEscalation) {
      letters.push({
        label: '60-Day Escalation Notice',
        content: generate60DayEscalation(formData),
        type: 'escalation'
      })
    }

    // Pay for delete
    if (includePayForDelete) {
      letters.push({
        label: 'Pay-for-Delete Agreement',
        content: generatePayForDelete(formData),
        type: 'payfordelete'
      })
    }

    setGeneratedLetters(letters)
    setStep(4)
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
          <ArrowLeft size={16} />
          Back to Dispute Options
        </Link>

        <div className="max-w-4xl mx-auto">
          
          {/* Step 1: Dispute Type */}
          {step === 1 && (
            <div className="cr-card">
              <h2 className="text-xl font-bold mb-2">Step 1: What are you disputing?</h2>
              <p className="text-cr-muted text-sm mb-6">Select the type of dispute. This determines the letter language used.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {DISPUTE_TYPES.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setDisputeType(type.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      disputeType === type.id ? 'border-cr-primary bg-cr-primary/5' : 'border-cr-border hover:border-cr-primary/50'
                    }`}
                  >
                    <div className="font-medium">{type.name}</div>
                    <div className="text-sm text-cr-muted">{type.description}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!disputeType}
                className="cr-btn cr-btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <span className="ml-2">→</span>
              </button>
            </div>
          )}

          {/* Step 2: Who to contact */}
          {step === 2 && (
            <div className="space-y-6">
              
              {/* Major Bureaus */}
              <div className="cr-card">
                <h2 className="text-xl font-bold mb-2">Step 2: Which bureaus? (select all)</h2>
                <p className="text-cr-muted text-sm mb-4">Check all you want dispute letters generated for.</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {MAJOR_BUREAUS.map(bureau => (
                    <button
                      key={bureau.id}
                      onClick={() => toggleBureau(bureau.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedBureaus.includes(bureau.id) ? 'border-cr-primary bg-cr-primary/5' : 'border-cr-border hover:border-cr-primary/50'
                      }`}
                    >
                      <div className="font-medium">{bureau.name}</div>
                      <div className="text-xs text-cr-muted">{bureau.phone}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-Bureaus */}
              <div className="cr-card">
                <button 
                  onClick={() => setShowSubBureaus(!showSubBureaus)}
                  className="w-full flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-xl font-bold mb-1">Sub-Bureaus (optional)</h2>
                    <p className="text-cr-muted text-sm">
                      {selectedSubBureaus.length === 0 
                        ? 'Click to expand — LexisNexis, ChexSystems, and others'
                        : `${selectedSubBureaus.length} selected`}
                    </p>
                  </div>
                  {showSubBureaus ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
                {showSubBureaus && (
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    {SUB_BUREAUS.map(bureau => (
                      <button
                        key={bureau.id}
                        onClick={() => toggleSubBureau(bureau.id)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          selectedSubBureaus.includes(bureau.id) ? 'border-cr-primary bg-cr-primary/5' : 'border-cr-border hover:border-cr-primary/50'
                        }`}
                      >
                        <div className="font-medium text-sm">{bureau.name}</div>
                        <div className="text-xs text-cr-muted">{bureau.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Furnisher */}
              <div className="cr-card">
                <button 
                  onClick={() => setShowFurnisher(!showFurnisher)}
                  className="w-full flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-xl font-bold mb-1">Furnisher Notice (optional)</h2>
                    <p className="text-cr-muted text-sm">
                      {selectedFurnisherType ? `Selected: ${FURNISHER_CATEGORIES.find(f => f.id === selectedFurnisherType)?.name}` 
                        : 'Click to expand — Send directly to the bank/lender'}
                    </p>
                  </div>
                  {showFurnisher ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
                {showFurnisher && (
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    {FURNISHER_CATEGORIES.map(f => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFurnisherType(f.id)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          selectedFurnisherType === f.id ? 'border-cr-primary bg-cr-primary/5' : 'border-cr-border hover:border-cr-primary/50'
                        }`}
                      >
                        <div className="font-medium text-sm">{f.name}</div>
                        <div className="text-xs text-cr-muted">Generates: {f.letterType.replace(/-/g, ' ')}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Options */}
              <div className="cr-card">
                <h2 className="text-lg font-bold mb-4">Additional Letters</h2>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeEscalation}
                      onChange={e => setIncludeEscalation(e.target.checked)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium">60-Day Escalation Notice</div>
                      <div className="text-sm text-cr-muted">For when bureaus/furnishers don't respond. Escalates to legal threats and CFPB complaints.</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includePayForDelete}
                      onChange={e => setIncludePayForDelete(e.target.checked)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium">Pay-for-Delete Agreement</div>
                      <div className="text-sm text-cr-muted">Negotiate with collectors to remove item in exchange for payment.</div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={selectedBureaus.length === 0}
                className="cr-btn cr-btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Your Info — {selectedBureaus.length + selectedSubBureaus.length + (selectedFurnisherType ? 1 : 0) + (includeEscalation ? 1 : 0) + (includePayForDelete ? 1 : 0)} letters →
              </button>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div className="cr-card">
              <h2 className="text-xl font-bold mb-2">Step 3: Your Information</h2>
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
                <button onClick={() => setStep(2)} className="cr-btn cr-btn-secondary">Back</button>
                <button
                  onClick={generateAllLetters}
                  disabled={!formData.fullName || !formData.accountName}
                  className="cr-btn cr-btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate {selectedBureaus.length + selectedSubBureaus.length + (selectedFurnisherType ? 1 : 0) + (includeEscalation ? 1 : 0) + (includePayForDelete ? 1 : 0)} Letters →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Generated Letters */}
          {step === 4 && generatedLetters.length > 0 && (
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

              {/* Inline Upsell — right after letter generation */}
              <div className="cr-card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex-1">
                    <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">Save Time. Guaranteed Delivery.</div>
                    <h3 className="font-bold text-lg mb-1">Want us to mail this letter AND handle everything?</h3>
                    <p className="text-cr-muted text-sm">
                      We print, sign, and mail via certified mail — plus follow up at 30 and 60 days. You do nothing.
                    </p>
                  </div>
                  <Link
                    href="/dispute/mail-service"
                    className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap flex items-center gap-2 flex-shrink-0"
                  >
                    We Handle It — $49
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={downloadAll} className="cr-btn cr-btn-primary">
                  <Download size={16} className="mr-2" />
                  Download All
                </button>
              </div>

              {generatedLetters.map((letter, i) => (
                <div key={i} className="cr-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        letter.type === 'bureau' ? 'bg-blue-100 text-blue-700' :
                        letter.type === 'sub-bureau' ? 'bg-purple-100 text-purple-700' :
                        letter.type === 'furnisher' ? 'bg-orange-100 text-orange-700' :
                        letter.type === 'escalation' ? 'bg-red-100 text-red-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {letter.type}
                      </span>
                      <h3 className="font-semibold">{letter.label}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => copyLetter(letter.content)} className="cr-btn cr-btn-secondary text-sm py-1 px-3">
                        <Copy size={14} className="mr-1" />
                        Copy
                      </button>
                      <button onClick={() => {
                        const blob = new Blob([letter.content], { type: 'text/plain' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = `letter-${i + 1}-${letter.type}.txt`
                        a.click()
                      }} className="cr-btn cr-btn-primary text-sm py-1 px-3">
                        <Download size={14} className="mr-1" />
                        Download
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
                <button onClick={() => { setStep(1); setGeneratedLetters([]); }} className="cr-btn cr-btn-secondary flex-1">
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
    </div>
  )
}
