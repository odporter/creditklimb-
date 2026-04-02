'use client'

import { Nav } from '@/components/Nav'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function Page() {
  return (
    <T title="Bureau vs Furnisher Dispute — What's the Difference?" desc="Most people only dispute with bureaus. Here's why you should also dispute directly with furnishers.">
      
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">What is a bureau dispute?</h2><p className="text-cr-muted mb-4">A bureau dispute goes to Equifax, Experian, or TransUnion. The bureau contacts the furnisher and waits for a response. If the furnisher doesn't respond within 30 days, the bureau must remove the item.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">What is a furnisher dispute?</h2><p className="text-cr-muted mb-4">A furnisher dispute goes directly to the source — the bank, lender, or collection agency. Under FCRA Section 623, furnishers must correct or delete inaccurate information within 30 days.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Why furnisher disputes often work faster</h2><p className="text-cr-muted mb-4">Bureaus are middlemen. Furnishers who don't respond within 30 days face FCRA liability. Direct pressure on the source is more effective.</p></div>
<div className="cr-card"><h2 className="text-2xl font-bold mb-3">Get bureau AND furnisher dispute letters free</h2><p className="text-cr-muted mb-4">We send to both — bureaus and furnishers — for maximum pressure.</p><Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate all letters <ArrowRight size={16} /></Link></div>
    </T>
  )
}