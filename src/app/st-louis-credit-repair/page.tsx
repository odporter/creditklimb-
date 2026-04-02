'use client'

import { Nav } from '@/components/Nav'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function Page() {
  return (
    <T title="St. Louis Credit Repair — Missouri Resources" desc="Credit repair resources specific to St. Louis and Missouri residents.">
      
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Missouri credit laws</h2><p className="text-cr-muted mb-4">Missouri follows federal FCRA guidelines. You have the right to dispute and request investigation within 30 days. The Missouri Merchandising Practices Act (MMPA) provides additional consumer protection.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Missouri statute of limitations</h2><p className="text-cr-muted mb-4">Credit card debt: 5 years. Oral agreements: 3 years. Medical debt: varies. Missouri has newer laws restricting collection of old medical debt.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">St. Louis resources</h2><p className="text-cr-muted mb-4">Urban League of Metro St. Louis — financial coaching. St. Louis Public Library — free financial literacy. Missouri Legal Services — free legal help. Better Business Bureau — check companies before paying.</p></div>
<div className="cr-card"><h2 className="text-2xl font-bold mb-3">Start your STL credit repair for free</h2><p className="text-cr-muted mb-4">Generate FCRA-compliant dispute letters for all bureaus and furnishers — free.</p><Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate free letters <ArrowRight size={16} /></Link></div>
    </T>
  )
}