'use client'

import { Nav } from '@/components/Nav'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const NEGOTIATE_STEPS = [
  'Send a debt validation letter first — if they can\'t verify the debt, you may not owe anything',
  'Once validated, offer a settlement (typically 30-50% of the balance)',
  'Explicitly request deletion as part of the agreement before paying',
  'Get the agreement in writing before sending any payment',
  'Pay with a method that leaves a paper trail',
  'Send follow-up letters to bureaus if collector doesn\'t honor the agreement',
]

export default function PayForDeletePage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pay for Delete Letter — Remove Collections by Paying</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">How to negotiate collection removal with a pay-for-delete letter.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="cr-container max-w-3xl">
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">What is pay-for-delete?</h2>
            <p className="text-cr-muted mb-4">Pay-for-delete is an agreement where a collection agency agrees to remove the collection from your credit report in exchange for payment of the debt. It&apos;s not guaranteed — collectors aren&apos;t obligated to agree — but it&apos;s a widely used negotiation tactic.</p>
          </div>
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">How to negotiate</h2>
            <ol className="space-y-3">
              {NEGOTIATE_STEPS.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-cr-primary/20 rounded-full flex items-center justify-center flex-shrink-0 text-cr-primary font-bold text-sm">{i + 1}</span>
                  <span className="text-cr-muted text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">What to say</h2>
            <div className="bg-cr-surface rounded-lg p-4 text-sm text-cr-muted font-mono">
              <p>&quot;I am willing to pay [amount] in full settlement of this account. As part of this agreement, I request that you remove this collection from my credit report with all three bureaus: Equifax, Experian, and TransUnion. Please confirm this agreement in writing before I submit payment.&quot;</p>
            </div>
          </div>
          <div className="cr-card">
            <h2 className="text-2xl font-bold mb-3">Get your pay-for-delete letter template free</h2>
            <p className="text-cr-muted mb-4">We generate professionally formatted pay-for-delete letters ready to send.</p>
            <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate free letter <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
