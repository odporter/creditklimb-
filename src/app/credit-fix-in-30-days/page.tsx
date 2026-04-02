'use client'

import { Nav } from '@/components/Nav'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function Page() {
  return (
    <T title="How to Fix Your Credit in 30 Days" desc="Aggressive but realistic credit repair plan for the next 30 days.">
      
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Week 1: Get your reports</h2><p className="text-cr-muted mb-4">Request free reports at AnnualCreditReport.com. Review every account. Flag anything inaccurate, outdated, or not yours. File disputes immediately.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Week 2: Challenge collections</h2><p className="text-cr-muted mb-4">Send debt validation letters to collectors. Dispute with all 3 bureaus simultaneously. If collector can't verify in 30 days, bureau must remove it.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Week 3: Goodwill and pay-for-delete</h2><p className="text-cr-muted mb-4">Send goodwill letters to creditors. Negotiate pay-for-delete on collections you decide to pay. Get agreements in writing before paying.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Week 4: Follow up</h2><p className="text-cr-muted mb-4">Call bureaus to confirm disputes. Send escalation letters to non-responsive furnishers. Check credit monitoring for updates.</p></div>
<div className="cr-card"><h2 className="text-2xl font-bold mb-3">Use our free dispute letter generator</h2><p className="text-cr-muted mb-4">Generate all letters — bureau disputes, furnisher notices, validation, and pay-for-delete.</p><Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate free letters <ArrowRight size={16} /></Link></div>
    </T>
  )
}