'use client'

import { Nav } from '@/components/Nav'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function RemoveChexSystemsPage() {
  const ARR_0 = ['Request your full ChexSystems report: 1-800-307-2837 or chexsystems.com', 'Review every item — dispute anything inaccurate or unresolved', 'Send a written dispute to ChexSystems, P.O. Box 105, Minneapolis, MN 55480', 'Include your full name, address, SSN, specific items disputed, and reason', 'Send via certified mail — they have 30 days to investigate'];

return (
    <T title="How to Remove Items From ChexSystems Report" desc="ChexSystems tracks bank account history. Here's how to dispute and remove negative items.">
      <div className="cr-card mb-8">
        <h2 className="text-2xl font-bold mb-4">What is ChexSystems?</h2>
        <p className="text-cr-muted mb-4">ChexSystems is a consumer reporting agency that collects data about deposit account history. Banks use it to decide whether to open new accounts. Negative items can prevent you from opening a checking or savings account for up to 7 years.</p>
      </div>
      <div className="cr-card mb-8">
        <h2 className="text-2xl font-bold mb-4">How to dispute ChexSystems</h2>
        <ol className="space-y-3 text-cr-muted text-sm">
          {ARR_0.map((s, i) => <li key={i} className="flex items-start gap-2"><span className="text-cr-primary font-bold">{i + 1}. </span>{s}</li>)}
        </ol>
      </div>
      <div className="cr-card">
        <h2 className="text-2xl font-bold mb-3">Generate your ChexSystems dispute letter free</h2>
        <p className="text-cr-muted mb-4">We generate properly formatted dispute letters for ChexSystems and other sub-bureaus.</p>
        <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate free letter <ArrowRight size={16} /></Link>
      </div>
    </T>
  )
}
