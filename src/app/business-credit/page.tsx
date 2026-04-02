'use client'

import { DarkNav } from '@/components/Nav'
import Link from 'next/link'
import { Building2, TrendingUp, CreditCard, FileText, Shield, CheckCircle, ArrowRight, DollarSign, Briefcase, Globe, Lock } from 'lucide-react'

const BENEFITS = [
  {
    icon: Building2,
    title: 'Separate From Personal Credit',
    description: 'Business credit doesn\'t affect your personal credit score. Build your business without risking your personal score.',
  },
  {
    icon: DollarSign,
    title: 'Higher Credit Limits',
    description: 'Business lines of credit can range from $10,000 to $5 million. Way more capacity than personal cards.',
  },
  {
    icon: TrendingUp,
    title: 'Tax Benefits',
    description: 'Business expenses on business credit are tax-deductible. Personal expenses on business credit are not.',
  },
  {
    icon: Globe,
    title: 'Vendor Relationships',
    description: 'Many vendors report to business credit bureaus. Build trade credit to access better financing.',
  },
]

const STEPS = [
  {
    step: '01',
    title: 'Form Your Business Entity',
    description: 'LLC, C-Corp, or S-Corp — you need a formal business structure before you can build business credit.',
  },
  {
    step: '02',
    title: 'Get an EIN & Business Phone',
    description: 'Your Employer Identification Number (EIN) from the IRS is required. Get a dedicated business phone line.',
  },
  {
    step: '03',
    title: 'Set Up Business Banking',
    description: 'Open a business checking account. Keep personal and business finances completely separate.',
  },
  {
    step: '04',
    title: 'Build Your D-U-N-S Number',
    description: 'Get a D-U-N-S number from Dun & Bradstreet. This is the foundation of business credit.',
  },
  {
    step: '05',
    title: 'Add Vendor Trade Lines',
    description: 'Open accounts with vendors that report to business credit bureaus (Sam\'s Club, Grainger, Uline).',
  },
  {
    step: '06',
    title: 'Get Business Credit Cards',
    description: 'Use business cards from issuers that don\'t report to personal credit (Amex, some banks).',
  },
]

const BUREAUS = [
  { name: 'Dun & Bradstreet', score: 'PAYDEX', range: '0-100', icon: Building2 },
  { name: 'Experian Business', score: 'Intelliscore Plus', range: '0-100', icon: TrendingUp },
  { name: 'Equifax Business', score: 'Business Credit Score', range: '0-100', icon: CreditCard },
]

export default function BusinessCreditPage() {
  const ARR_0 = [
              {
                q: 'Does business credit affect my personal credit score?',
                a: 'No. Business credit is completely separate from personal credit. Opening business cards or loans doesn\'t show up on your personal credit report — unless you personally guarantee and default.',
              },
              {
                q: 'How long does it take to build business credit?',
                a: 'It typically takes 6-12 months of active tradeline building to establish meaningful business credit. Some businesses see scores within 90 days.',
              },
              {
                q: 'Do I need an LLC to build business credit?',
                a: 'Yes, you need a formal business entity (LLC, C-Corp, S-Corp). Sole proprietorships can\'t establish separate business credit.',
              },
              {
                q: 'How much can I borrow with business credit?',
                a: 'Depending on your business credit profile, you can access $10,000 to $5 million+. Business credit cards often start at $5,000-$25,000 and grow with your profile.',
              },
              {
                q: 'What\'s a D-U-N-S number?',
                a: 'A D-U-N-S number is a unique identifier assigned by Dun & Bradstreet. It\'s the foundation of business credit — lenders, vendors, and insurers use it to look up your business.',
              },
            ];

return (
    <div className="min-h-screen" style={{backgroundColor: '#0f172a', color: '#e2e8f0'}}>
      <DarkNav />
      
      {/* Hero */}
      <section className="py-16 px-6" style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{backgroundColor: '#1e293b', border: '1px solid #334155'}}>
            <Briefcase size={16} className="text-blue-400" />
            <span className="text-sm">Business Credit Building</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-white">
            Build Business Credit <br />
            <span style={{color: '#60a5fa'}}>That Doesn't Touch Your Personal Score</span>
          </h1>
          <p className="text-xl mb-8" style={{color: '#94a3b8'}}>
            Separate your business finances from personal. Access credit cards, loans, and lines of credit up to $5 million.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 rounded-lg font-bold text-white transition-all" style={{backgroundColor: '#3b82f6'}}>
              Get Your Free Analysis →
            </Link>
            <Link href="#how-it-works" className="px-8 py-4 rounded-lg font-medium transition-all" style={{backgroundColor: 'transparent', border: '1px solid #475569', color: '#94a3b8'}}>
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Why Business Credit Matters */}
      <section className="py-16 px-6" style={{backgroundColor: '#0f172a'}}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Business Credit Is Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="p-6 rounded-xl" style={{backgroundColor: '#1e293b', border: '1px solid #334155'}}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#1e3a5f'}}>
                  <benefit.icon className="text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
                <p style={{color: '#94a3b8'}}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Credit Bureaus */}
      <section className="py-16 px-6" style={{backgroundColor: '#1e293b'}}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">The 3 Business Credit Bureaus</h2>
          <p className="text-center mb-12" style={{color: '#94a3b8'}}>Different from personal bureaus. Each tracks business credit differently.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {BUREAUS.map((bureau, i) => (
              <div key={i} className="p-6 rounded-xl text-center" style={{backgroundColor: '#0f172a', border: '1px solid #334155'}}>
                <bureau.icon className="mx-auto mb-4 text-blue-400" size={40} />
                <h3 className="text-xl font-bold mb-2 text-white">{bureau.name}</h3>
                <div className="text-sm mb-2" style={{color: '#60a5fa'}}>{bureau.score}</div>
                <div className="text-sm" style={{color: '#64748b'}}>Range: {bureau.range}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-6" style={{backgroundColor: '#0f172a'}}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">How to Build Business Credit</h2>
          <div className="space-y-6">
            {STEPS.map((item, i) => (
              <div key={i} className="flex gap-6 items-start p-6 rounded-xl" style={{backgroundColor: '#1e293b', border: '1px solid #334155'}}>
                <div className="text-4xl font-bold text-blue-400 flex-shrink-0 w-16">{item.step}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                  <p style={{color: '#94a3b8'}}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6" style={{backgroundColor: '#1e293b'}}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Common Questions</h2>
          <div className="space-y-4">
            {ARR_0.map((faq, i) => (
              <div key={i} className="p-6 rounded-xl" style={{backgroundColor: '#0f172a', border: '1px solid #334155'}}>
                <h3 className="font-bold mb-2 text-white">{faq.q}</h3>
                <p style={{color: '#94a3b8'}}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'}}>
        <div className="max-w-3xl mx-auto text-center">
          <Lock className="mx-auto mb-4 text-blue-200" size={40} />
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Separate Business and Personal Credit?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get a free business credit analysis. We'll tell you where you are and exactly what to do next.
          </p>
          <Link href="/contact" className="inline-block px-8 py-4 rounded-lg font-bold text-blue-600 transition-all" style={{backgroundColor: '#ffffff'}}>
            Get Your Free Analysis →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6" style={{backgroundColor: '#0f172a', borderTop: '1px solid #1e293b'}}>
        <div className="max-w-5xl mx-auto text-center" style={{color: '#64748b'}}>
          <p>CreditKlimb™ Business Credit — Build Without Touching Personal Credit</p>
        </div>
      </footer>
    </div>
  )
}
