'use client'

import { Nav } from '@/components/Nav'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function HowToDisputeExperianPage() {
  const ARR_0 = ['Go to experian.com/dispute', 'Sign in or create an account', 'Select "Dispute by Computer" for direct processing', 'Choose account and reason for dispute', 'Submit — Experian typically investigates in 14-21 days'];

return (
    <T title="How to Dispute on Experian — Step-by-Step" desc="Dispute inaccurate information with Experian online or by mail.">
      <div className="cr-card mb-8">
        <h2 className="text-2xl font-bold mb-4">Online dispute</h2>
        <ol className="space-y-2 text-cr-muted text-sm">
          {ARR_0.map((s, i) => <li key={i} className="flex items-start gap-2"><span className="text-cr-primary font-bold">{i + 1}. </span>{s}</li>)}
        </ol>
      </div>
      <div className="cr-card mb-8">
        <h2 className="text-2xl font-bold mb-4">Mail dispute</h2>
        <p className="text-cr-muted text-sm mb-3">Experian, P.O. Box 4500, Allen, TX 75013. Include your name, address, DOB, SSN last 4, account details, and reason. Send certified.</p>
      </div>
      <div className="cr-card">
        <h2 className="text-2xl font-bold mb-3">Generate your Experian dispute letter free</h2>
        <p className="text-cr-muted mb-4">FCRA-compliant letter ready to download and send.</p>
        <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate free letter <ArrowRight size={16} /></Link>
      </div>
    </T>
  )
}
