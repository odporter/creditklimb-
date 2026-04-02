'use client'

import { Nav } from '@/components/Nav'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function HowToDisputeTransUnionPage() {
  const ARR_0 = ['Go to transunion.com/dispute', 'Create account or sign in', 'Select the account to dispute', 'Choose dispute reason', 'Submit — TransUnion has 30 days under FCRA'];

return (
    <T title="How to Dispute on TransUnion — Free Guide" desc="Dispute inaccurate information with TransUnion online or by mail.">
      <div className="cr-card mb-8">
        <h2 className="text-2xl font-bold mb-4">Online dispute</h2>
        <ol className="space-y-2 text-cr-muted text-sm">
          {ARR_0.map((s, i) => <li key={i} className="flex items-start gap-2"><span className="text-cr-primary font-bold">{i + 1}. </span>{s}</li>)}
        </ol>
      </div>
      <div className="cr-card mb-8">
        <h2 className="text-2xl font-bold mb-4">Mail dispute</h2>
        <p className="text-cr-muted text-sm mb-3">TransUnion Consumer Solutions, P.O. Box 2000, Chester, PA 19016. Send certified mail with return receipt.</p>
      </div>
      <div className="cr-card">
        <h2 className="text-2xl font-bold mb-3">Generate your TransUnion dispute letter free</h2>
        <p className="text-cr-muted mb-4">Professionally formatted FCRA-compliant letter.</p>
        <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate free letter <ArrowRight size={16} /></Link>
      </div>
    </T>
  )
}
