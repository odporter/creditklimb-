import { Nav } from '@/components/Nav'
import { ArrowRight } from '@/components/Icons'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function Page() {
  return (
    <T title="The Credit Dispute Timeline — What Happens at Every Step" desc="How long does credit repair take? Here's the exact timeline from dispute to resolution.">
      
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Day 1-7: File disputes</h2><p className="text-cr-muted mb-4">Submit disputes online or by mail. Online is faster — bureaus acknowledge within 5 days. Mail takes 7-10 days to process.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Day 8-30: Investigation</h2><p className="text-cr-muted mb-4">Bureaus have 30 days to investigate. If the furnisher doesn't respond within 30 days, the bureau must remove the item. Check your report weekly.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Day 31-45: Results</h2><p className="text-cr-muted mb-4">If items are removed — done. If marked verified and you disagree — send escalation letters to furnisher and CFPB.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Day 45-60: Escalation</h2><p className="text-cr-muted mb-4">Send furnisher escalation letter. File CFPB complaint. Most legitimate errors get corrected at this stage.</p></div>
<div className="cr-card"><h2 className="text-2xl font-bold mb-3">Start now — generate your first dispute letters</h2><p className="text-cr-muted mb-4">Day 1 starts when you file.</p><Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate free letters <ArrowRight size={16} /></Link></div>
    </T>
  )
}