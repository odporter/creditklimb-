'use client'

import { Nav } from '@/components/Nav'
import { FileText, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function FreeDisputeLetterTemplatePage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Credit Dispute Letter Templates</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Download free FCRA-compliant dispute letter templates for Equifax, Experian, TransUnion, and collection agencies.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="cr-container max-w-3xl">
          <div className="cr-card mb-6">
            <h2 className="text-xl font-bold mb-3">Equifax Dispute Letter</h2>
            <p className="text-cr-muted text-sm mb-3">Address: P.O. Box 740256, Atlanta, GA 30374</p>
            <div className="bg-cr-surface rounded-lg p-4 text-sm text-cr-muted font-mono mb-3">
              <p>[Your Name]</p>
              <p>[Your Address]</p>
              <p>[City, State ZIP]</p>
              <br />
              <p>Equifax Information Services LLC</p>
              <p>P.O. Box 740256</p>
              <p>Atlanta, GA 30374</p>
              <br />
              <p>RE: Dispute of Account #[Account Number]</p>
              <br />
              <p>Dear Equifax:</p>
              <p>I am writing to dispute the following information on my credit report...</p>
            </div>
            <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2 text-sm">Generate full letter →</Link>
          </div>
          <div className="cr-card mb-6">
            <h2 className="text-xl font-bold mb-3">Experian Dispute Letter</h2>
            <p className="text-cr-muted text-sm mb-3">Address: P.O. Box 4500, Allen, TX 75013</p>
            <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2 text-sm">Generate full letter →</Link>
          </div>
          <div className="cr-card mb-6">
            <h2 className="text-xl font-bold mb-3">TransUnion Dispute Letter</h2>
            <p className="text-cr-muted text-sm mb-3">Address: P.O. Box 2000, Chester, PA 19016</p>
            <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2 text-sm">Generate full letter →</Link>
          </div>
          <div className="cr-card mb-6">
            <h2 className="text-xl font-bold mb-3">Debt Validation Letter (for collectors)</h2>
            <p className="text-cr-muted text-sm mb-4">Use this within 30 days of first contact with a collection agency.</p>
            <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2 text-sm">Generate full letter →</Link>
          </div>
          <div className="cr-card">
            <h2 className="text-xl font-bold mb-3">Pay-for-Delete Letter</h2>
            <p className="text-cr-muted text-sm mb-4">Negotiate removal of collections in exchange for payment.</p>
            <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2 text-sm">Generate full letter →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
