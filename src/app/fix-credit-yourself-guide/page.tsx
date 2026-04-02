import { Nav } from '@/components/Nav'
import { ArrowRight } from '@/components/Icons'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function Page() {
  return (
    <T title="DIY Credit Repair — Fix Your Credit Without a Company" desc="A complete guide to fixing your own credit without paying monthly fees.">
      
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Why DIY is better</h2><p className="text-cr-muted mb-4">Credit repair companies do exactly what you can do yourself: write dispute letters. They charge $79-199/month for letters you could write in an afternoon.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Step 1: Know your rights</h2><p className="text-cr-muted mb-4">The FCRA gives you the right to dispute inaccurate items. Bureaus must investigate within 30 days. Furnishers must correct errors.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Step 2: Audit your reports</h2><p className="text-cr-muted mb-4">Get reports from AnnualCreditReport.com. Go line by line. Is each account accurate, yours, current, and for the right amount?</p></div>
<div className="cr-card"><h2 className="text-2xl font-bold mb-3">Start with free dispute letters</h2><p className="text-cr-muted mb-4">Generate professionally formatted, FCRA-compliant dispute letters for all bureaus and furnishers — free.</p><Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate free letters <ArrowRight size={16} /></Link></div>
    </T>
  )
}