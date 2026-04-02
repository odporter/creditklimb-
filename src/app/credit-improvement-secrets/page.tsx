'use client'

import { Nav } from '@/components/Nav'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function Page() {
  return (
    <T title="Credit Improvement Secrets" desc="Lesser-known tactics that can boost your credit score faster than conventional advice.">
      
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Secret 1: The 30-day utilization rule</h2><p className="text-cr-muted mb-4">Pay down credit card balances before the statement closes, not after. The balance reported to bureaus is what's on your statement date — not what you owe right now.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Secret 2: Multiple dispute method</h2><p className="text-cr-muted mb-4">Send disputes with supporting documentation (ID, proof of address, records). Vague disputes get closed faster. Detailed ones get investigated.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Secret 3: Authorized user accounts</h2><p className="text-cr-muted mb-4">Being added as an authorized user on an old, well-maintained account can boost your score quickly. One older account with perfect history can outweigh several negative items.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Secret 4: Escalation letters work</h2><p className="text-cr-muted mb-4">After 30 days, send an escalation letter to the furnisher's legal department. Mention FCRA liability and CFPB complaint intent.</p></div>
<div className="cr-card"><h2 className="text-2xl font-bold mb-3">Generate escalation letters free</h2><p className="text-cr-muted mb-4">Our escalation letter templates are ready to use.</p><Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Get free letters <ArrowRight size={16} /></Link></div>
    </T>
  )
}