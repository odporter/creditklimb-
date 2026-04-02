'use client'

import { Nav } from '@/components/Nav'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function HowToDisputeEquifaxPage() {
  const ARR_0 = ['Go to equifax.com/personal/credit-report-services/credit-dispute/', 'Create an account or sign in', 'Select the item you want to dispute', 'Choose reason: "Not my account" / "Inaccurate" / "Outdated"', 'Submit — Equifax has 30 days to investigate'];

return (
    <T title="How to Dispute on Equifax — Free Step-by-Step Guide" desc="Step-by-step guide to disputing inaccurate information with Equifax.">
      <div className="cr-card mb-8">
        <h2 className="text-2xl font-bold mb-4">Online dispute (fastest)</h2>
        <ol className="space-y-2 text-cr-muted text-sm">
          {ARR_0.map((s, i) => <li key={i} className="flex items-start gap-2"><span className="text-cr-primary font-bold">{i + 1}. </span>{s}</li>)}
        </ol>
      </div>
      <div className="cr-card mb-8">
        <h2 className="text-2xl font-bold mb-4">Mail dispute (most thorough)</h2>
        <p className="text-cr-muted text-sm mb-3">Send to: Equifax Information Services LLC, P.O. Box 740256, Atlanta, GA 30374</p>
        <p className="text-cr-muted text-sm">Include: your full name, address, SSN last 4, specific account number, reason for dispute, copies of supporting documents. Send via certified mail with return receipt.</p>
      </div>
      <div className="cr-card">
        <h2 className="text-2xl font-bold mb-3">Generate your Equifax dispute letter free</h2>
        <p className="text-cr-muted mb-4">Our letter includes all required FCRA language and formats it correctly for Equifax.</p>
        <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate free letter <ArrowRight size={16} /></Link>
      </div>
    </T>
  )
}
