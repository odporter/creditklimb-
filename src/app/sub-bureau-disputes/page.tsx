'use client'

import { Nav } from '@/components/Nav'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function Page() {
  return (
    <T title="Sub-Bureau Disputes — The Credit Bureaus Nobody Talks About" desc="LexisNexis, ChexSystems, MicroBilt — these hidden bureaus affect housing, jobs, and loans.">
      
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">What are sub-bureaus?</h2><p className="text-cr-muted mb-4">Sub-bureaus collect information beyond your traditional credit report. Landlords, employers, insurers, and banks use them for decisions that don't touch your credit score.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Major sub-bureaus</h2><p className="text-cr-muted mb-4"><strong>LexisNexis</strong> — Background checks. <strong>ChexSystems</strong> — Bank account history. <strong>FactorTrust / MicroBilt</strong> — Alternative credit. <strong>Early Warning</strong> — Deposit accounts. <strong>TeleCheck</strong> — Check writing history.</p></div>
<div className="cr-card"><h2 className="text-2xl font-bold mb-3">Dispute sub-bureau items free</h2><p className="text-cr-muted mb-4">Generate dispute letters for all major sub-bureaus in one place.</p><Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate free letters <ArrowRight size={16} /></Link></div>
    </T>
  )
}