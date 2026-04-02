import { Nav } from '@/components/Nav'
import { ArrowRight, CheckCircle } from '@/components/Icons'
import Link from 'next/link'

export default function WhatIsFCRAPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">What Is the FCRA? Your Rights Under Federal Law</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">The Fair Credit Reporting Act is the law that protects your right to dispute inaccurate information.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="cr-container max-w-3xl">
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">What is the FCRA?</h2>
            <p className="text-cr-muted mb-4">The Fair Credit Reporting Act (FCRA), passed in 1970, is a federal law that regulates how credit reporting agencies (Equifax, Experian, TransUnion) collect and use your credit information. It gives you specific rights.</p>
          </div>
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">Your FCRA Rights</h2>
            <ul className="space-y-3">
              {['Right to know what\'s on your credit report — you can request it for free once a year', 'Right to dispute inaccurate information — bureaus must investigate within 30 days', 'Right to have inaccurate items corrected or removed', 'Right to know who has accessed your credit report in the last 2 years', 'Right to a secure, accurate credit report — bureaus are responsible for accuracy', 'Right to sue credit bureaus and furnishers that violate the FCRA'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-cr-muted">{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">Key FCRA Sections for Credit Disputes</h2>
            <ul className="space-y-2 text-cr-muted text-sm">
              {['Section 611 — Bureaus must complete investigation within 30 days', 'Section 611A — Bureaus must forward all relevant information to the furnisher', 'Section 623 — Furnishers must correct or delete inaccurate information', 'Section 616 — You can dispute directly with furnishers for faster results', 'Section 623(b) — Collection agencies must validate debts on request'].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-cr-primary font-bold">{i + 1}.</span><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="cr-card">
            <h2 className="text-2xl font-bold mb-3">Use FCRA protections to fix your credit</h2>
            <p className="text-cr-muted mb-4">Our dispute letter generator uses exact FCRA-compliant language. Start for free.</p>
            <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate dispute letters <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
