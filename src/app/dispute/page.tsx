import { Nav } from '@/components/Nav'
import { FileText, CreditCard, Send, CheckCircle, Shield, ArrowRight, Clock, AlertTriangle, Building } from 'lucide-react'
import Link from 'next/link'

const BUREAUS = [
  { 
    id: 'equifax', 
    name: 'Equifax', 
    address: 'P.O. Box 740256, Atlanta, GA 30374',
    phone: '1-800-525-6285',
    website: 'equifax.com',
    reportCode: 'EQUIFAX'
  },
  { 
    id: 'experian', 
    name: 'Experian', 
    address: 'P.O. Box 4500, Allen, TX 75013',
    phone: '1-888-397-3742',
    website: 'experian.com',
    reportCode: 'EXPERIAN'
  },
  { 
    id: 'transunion', 
    name: 'TransUnion', 
    address: 'P.O. Box 2000, Chester, PA 19016',
    phone: '1-800-916-8800',
    website: 'transunion.com',
    reportCode: 'TRANSUNION'
  },
]

const SUB_BUREAUS = [
  { 
    id: 'lexisnexis', 
    name: 'LexisNexis', 
    address: 'P.O. Box 105, Atlanta, GA 30348',
    phone: '1-800-456-6004',
    description: 'Used by insurers, employers, and landlords for background checks',
    category: 'Background Check'
  },
  { 
    id: 'chexsystems', 
    name: 'ChexSystems', 
    address: 'P.O. Box 105, Minneapolis, MN 55480',
    phone: '1-800-977-7284',
    description: 'Bank account history and consumer banking reports',
    category: 'Banking'
  },
  { 
    id: 'factortrust', 
    name: 'FactorTrust', 
    address: 'P.O. Box 851, Atlanta, GA 30301',
    phone: '1-855-366-2727',
    description: 'Alternative credit data for short-term lending decisions',
    category: 'Alternative Credit'
  },
  { 
    id: 'microbilt', 
    name: 'MicroBilt', 
    address: 'P.O. Box 968, Atlanta, GA 30301',
    phone: '1-800-884-4744',
    description: 'Consumer credit reports for alternative lending',
    category: 'Alternative Credit'
  },
  { 
    id: 'earlywarning', 
    name: 'Early Warning Services', 
    address: 'P.O. Box 2187, Omaha, NE 68103',
    phone: '1-800-745-7994',
    description: 'Cash正向 deposit account verification and fraud prevention',
    category: 'Banking'
  },
  { 
    id: 'teledata', 
    name: 'TeleCheck', 
    address: 'P.O. Box 5589, Louisville, KY 40255',
    phone: '1-800-537-5424',
    description: 'Check writing history and banking history',
    category: 'Banking'
  },
  { 
    id: 'global', 
    name: 'Global Payments', 
    address: 'P.O. Box 511689, Los Angeles, CA 90051',
    phone: '1-800-367-0774',
    description: 'Check and payment history for merchants',
    category: 'Payment History'
  },
]

const FURNISHER_CATEGORIES = [
  {
    id: 'bank',
    name: 'Banks & Credit Unions',
    examples: 'Chase, Bank of America, Wells Fargo, Capital One, US Bank',
    letterType: 'Furnisher Dispute'
  },
  {
    id: 'credit-card',
    name: 'Credit Card Companies',
    examples: 'Discover, American Express, Citi, Synchrony, Barclays',
    letterType: 'Furnisher Dispute'
  },
  {
    id: 'auto',
    name: 'Auto Finance',
    examples: 'Toyota Financial, Honda Financial, Ally Financial, GM Financial',
    letterType: 'Furnisher Dispute'
  },
  {
    id: 'mortgage',
    name: 'Mortgage Servicers',
    examples: 'LoanDepot, Mr. Cooper, Nationstar, Shellpoint',
    letterType: 'Furnisher Dispute'
  },
  {
    id: 'collection',
    name: 'Collection Agencies',
    examples: 'Portfolio Recovery, Midland Credit, LVNV, Creditors Financial',
    letterType: 'Debt Validation + Furnisher Notice'
  },
  {
    id: 'medical',
    name: 'Medical Providers',
    examples: 'Hospitals, doctor\'s offices, labs, pharmacies',
    letterType: 'Medical Dispute + Furnisher Notice'
  },
  {
    id: 'utility',
    name: 'Utilities & Telecom',
    examples: 'AT&T, Comcast, Verizon, water, electric, gas companies',
    letterType: 'Utility Dispute'
  },
  {
    id: 'tenant',
    name: 'Landlords',
    examples: 'Property management companies, housing authorities',
    letterType: 'Landlord Reference'
  },
]

const PRICING_TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1,
    description: 'Try it out. Get 1 bureau dispute letter.',
    features: [
      '1 dispute letter (your choice of bureau)',
      'Professional formatting',
      'Step-by-step instructions',
      'Certified mail guidance',
    ],
    popular: false,
  },
  {
    id: 'full',
    name: 'Full Repair',
    price: 29,
    description: 'Everything you need to fix your report.',
    features: [
      'Unlimited bureau dispute letters',
      'All 3 major bureaus (Equifax, Experian, TransUnion)',
      'Furnisher dispute letters',
      'All sub-bureaus (LexisNexis, ChexSystems, etc.)',
      'Pay-for-delete templates',
      '60-day escalation letters',
      'Email support',
    ],
    popular: true,
  },
  {
    id: 'mail-service',
    name: 'We Handle It',
    price: 49,
    description: 'We print, sign, and mail everything for you.',
    features: [
      'Everything in Full Repair',
      'We mail to ALL bureaus and sub-bureaus',
      'We mail to furnisher directly',
      'Certified mail with tracking',
      'Escalation letters at 30 and 60 days',
      'Dedicated advisor',
      'Money-back guarantee',
    ],
    popular: false,
  },
]

export default function DisputePage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      {/* Free Reports CTA */}
      <section className="py-8 bg-yellow-50 border-bottom border-yellow-200">
        <div className="cr-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-yellow-800 mb-1">Before you dispute — get your reports</div>
              <h3 className="text-lg font-bold text-yellow-900">You need to know what's on your report first</h3>
              <p className="text-sm text-yellow-700">Get free reports from all 3 bureaus at AnnualCreditReport.com — the only official government-recognized source.</p>
            </div>
            <a 
              href="https://www.annualcreditreport.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-yellow-500 text-yellow-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              Get Free Reports →
            </a>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <FileText className="mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">Full Credit Dispute System</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Bureau disputes, furnisher notices, sub-bureau coverage, and mail service.
            Everything you need to fix your credit — all in one place.
          </p>
        </div>
      </section>

      {/* What We Cover */}
      <section className="py-16">
        <div className="cr-container">
          <h2 className="text-2xl font-bold text-center mb-4">What We Cover</h2>
          <p className="text-cr-muted text-center mb-12 max-w-2xl mx-auto">
            Most credit repair only touches the big 3 bureaus. We go further.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Major Bureaus */}
            <div className="cr-card">
              <div className="w-12 h-12 rounded-full bg-cr-primary/10 flex items-center justify-center mb-4">
                <CreditCard className="text-cr-primary" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Major Bureaus</h3>
              <p className="text-cr-muted text-sm mb-4">
                Equifax, Experian, and TransUnion — the big 3 that affect your credit score.
              </p>
              <ul className="space-y-2 text-sm">
                {BUREAUS.map(b => (
                  <li key={b.id} className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                    <span>{b.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sub-Bureaus */}
            <div className="cr-card">
              <div className="w-12 h-12 rounded-full bg-cr-primary/10 flex items-center justify-center mb-4">
                <AlertTriangle className="text-cr-primary" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Sub-Bureaus</h3>
              <p className="text-cr-muted text-sm mb-4">
                The hidden bureaus that landlords, employers, and insurers check.
              </p>
              <ul className="space-y-2 text-sm">
                {SUB_BUREAUS.slice(0, 5).map(b => (
                  <li key={b.id} className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                    <span>{b.name}</span>
                  </li>
                ))}
                <li className="text-cr-muted">
                  + {SUB_BUREAUS.length - 5} more sub-bureaus
                </li>
              </ul>
            </div>

            {/* Furnishers */}
            <div className="cr-card">
              <div className="w-12 h-12 rounded-full bg-cr-primary/10 flex items-center justify-center mb-4">
                <Building className="text-cr-primary" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Furnishers</h3>
              <p className="text-cr-muted text-sm mb-4">
                The banks and lenders who report to bureaus — and are legally required to fix errors.
              </p>
              <ul className="space-y-2 text-sm">
                {FURNISHER_CATEGORIES.slice(0, 4).map(f => (
                  <li key={f.id} className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                    <span>{f.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-cr-surface">
        <div className="cr-container">
          <h2 className="text-2xl font-bold text-center mb-4">Choose Your Level</h2>
          <p className="text-cr-muted text-center mb-12 max-w-2xl mx-auto">
            Start for $1. Upgrade when you're ready. Cancel anytime.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_TIERS.map((tier) => (
              <div 
                key={tier.id} 
                className={`cr-card relative ${tier.popular ? 'border-cr-primary' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cr-primary text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold">{tier.name}</h3>
                  <div className="text-4xl font-bold mt-2">
                    ${tier.price}
                    {tier.price > 1 && <span className="text-lg font-normal text-cr-muted"> one-time</span>}
                  </div>
                  <p className="text-cr-muted text-sm mt-2">{tier.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    const base = window.location.origin
                    fetch('/api/stripe/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        tier: tier.id,
                        successUrl: `${base}/dispute/${tier.id}/success`,
                        cancelUrl: `${base}/dispute`,
                      })
                    }).then(r => r.json()).then(d => {
                      if (d.url) window.location.href = d.url
                      else alert('Payment not configured yet — check back soon!')
                    }).catch(() => alert('Payment not configured yet!'))
                  }}
                  className={`w-full text-center py-3 rounded-lg font-medium transition-colors ${
                    tier.popular 
                      ? 'bg-cr-primary text-white hover:bg-cr-primary/90' 
                      : 'bg-cr-surface border border-cr-border hover:border-cr-primary'
                  }`}
                >
                  {tier.price === 1 ? 'Get Started — $1' : tier.price === 29 ? 'Get Full System — $29' : 'We Handle It — $49'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Furnisher Notices Work */}
      <section className="py-16">
        <div className="cr-container max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">Why Furnisher Notices Matter</h2>
          <div className="cr-card">
            <div className="space-y-6">
              <p className="text-cr-muted">
                When you dispute with a bureau, the bureau sends your dispute to the furnisher (the bank, lender, or collection agency). 
                Under the FCRA, furnishers have <strong>30 days</strong> to investigate and correct errors.
              </p>
              <p className="text-cr-muted">
                Most people stop at the bureau. That's a mistake — because if the furnisher doesn't respond, 
                the bureau has to remove the item by law. Our furnisher notices put legal pressure directly on the source.
              </p>
              <div className="tint-primary-10 border border-cr-primary/20 rounded-lg p-4">
                <h3 className="font-semibold mb-2">The 30-Day Clock</h3>
                <p className="text-cr-muted text-sm">
                  We send bureau disputes AND furnisher notices simultaneously. If the furnisher doesn't respond within 30 days, 
                  we send a 60-day escalation notice — and if they still don't respond, we send a cease-and-desist with FCRA liability warnings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-cr-surface">
        <div className="cr-container max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">Common Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Is credit repair legal?',
                a: 'Yes. The Fair Credit Reporting Act (FCRA) gives you the legal right to dispute inaccurate information on your credit report. Credit repair companies have been operating legally since 1996.'
              },
              {
                q: 'How long does credit repair take?',
                a: 'Typically 3-6 months to see significant changes. The bureaus have 30 days to respond to disputes. If items are removed, they usually fall off within 1-2 billing cycles.'
              },
              {
                q: 'What\'s the difference between bureau and furnisher disputes?',
                a: 'Bureau disputes go to Equifax, Experian, or TransUnion. Furnisher disputes go directly to the bank or lender who reported the information. Both are important — furnisher notices often get faster results.'
              },
              {
                q: 'What are sub-bureaus?',
                a: 'Sub-bureaus like LexisNexis, ChexSystems, and FactorTrust collect information beyond what\'s on your credit score. Landlords, employers, insurers, and banks often check these reports. Negative items on sub-bureaus can block housing, jobs, and loans even when your credit score looks fine.'
              },
              {
                q: 'What\'s pay-for-delete?',
                a: 'Pay-for-delete is when you negotiate with a collection agency to remove the negative item from your report in exchange for paying the debt. We provide the exact letter templates and negotiation scripts to use.'
              },
              {
                q: 'Do you guarantee results?',
                a: 'We can\'t guarantee specific items will be removed — that\'s up to the bureaus and furnishers. What we guarantee is that we\'ll file everything properly, follow up at the right times, and escalate when required by law.'
              },
            ].map((faq, i) => (
              <div key={i} className="cr-card">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-cr-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Fix Your Credit?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Start for $1 or get the full system for $29. Your first letter could make the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dispute/starter" className="px-8 py-3 bg-white text-cr-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Start for $1
            </Link>
            <Link href="/dispute/full" className="px-8 py-3 bg-cr-primary/20 text-white font-bold rounded-lg hover:bg-cr-primary/30 transition-colors">
              Full System — $29
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
