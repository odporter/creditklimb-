import { Nav } from '@/components/Nav'
import { ArrowRight } from '@/components/Icons'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function Page() {
  return (
    <T title="Credit Report Errors — A Complete Guide" desc="1 in 5 credit reports contains errors. Here's how to find and fix them.">
      
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Most common errors</h2><p className="text-cr-muted mb-4">Accounts that don't belong to you. Closed accounts showing as open. Late payments marked incorrectly. Same debt listed multiple times. Outdated information. Wrong balances. Unauthorized accounts.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">How to find errors</h2><p className="text-cr-muted mb-4">Pull reports from all 3 bureaus — errors may appear on one but not others. Match against your own records. Look for accounts you don't recognize. Check the status column.</p></div>
<div className="cr-card"><h2 className="text-2xl font-bold mb-3">Generate dispute letters for all errors — free</h2><p className="text-cr-muted mb-4">Each error requires a separate dispute letter. We generate them all.</p><Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Start free <ArrowRight size={16} /></Link></div>
    </T>
  )
}