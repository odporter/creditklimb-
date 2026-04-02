'use client'

import { Nav } from '@/components/Nav'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Score520to700Page() {
  const ARR_0 = ['Dispute all errors on your credit report', 'Remove collections that aren\'t yours', 'Challenge accounts that show late payments you didn\'t make', 'Remove duplicates or accounts that don\'t belong to you'];

const ARR_1 = ['Secured credit card — put $200-500 deposit, use 10% or less', 'Become an authorized user on someone else\'s old account', 'Get a credit-builder loan from a local credit union', 'Never use more than 30% of your available credit'];

const ARR_2 = ['Keep old accounts open — your credit history length matters', 'Never close your oldest card', 'Monitor your report monthly', 'Dispute remaining negatives using escalation letters'];

return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">From 520 to 700: A Real Credit Rebuild Plan</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Real people have done this. It takes 12-24 months of consistent work — but it's possible.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="cr-container max-w-3xl">
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">Month 1-3: Remove the dead weight</h2>
            <p className="text-cr-muted mb-4">Start here — removing errors is free and doesn't require financial discipline.</p>
            <ul className="space-y-2 mb-4">
              {ARR_0.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-cr-muted">{item}</span></li>
              ))}
            </ul>
            <p className="text-cr-muted text-sm">Expected impact: +20 to +50 points</p>
          </div>
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">Month 4-6: Build positive credit</h2>
            <ul className="space-y-2 mb-4">
              {ARR_1.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-cr-muted">{item}</span></li>
              ))}
            </ul>
            <p className="text-cr-muted text-sm">Expected impact: +30 to +60 points</p>
          </div>
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">Month 7-12: Optimize and protect</h2>
            <ul className="space-y-2">
              {ARR_2.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-cr-muted">{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="cr-card">
            <h2 className="text-2xl font-bold mb-3">Start with dispute letters — free</h2>
            <p className="text-cr-muted mb-4">The fastest score gains come from removing errors. Generate your letters now.</p>
            <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Get your free dispute letters <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
