import { Nav } from '@/components/Nav'
import { ArrowRight } from '@/components/Icons'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function Page() {
  return (
    <T title="How to Dispute Late Payments on Your Credit Report" desc="Late payments are one of the most damaging items. Here's how to challenge incorrect ones.">
      
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Can you dispute a legitimate late payment?</h2><p className="text-cr-muted mb-4">If it's accurate, harder to remove. But incorrect late payments (wrong date, wrong amount, wrong creditor) can be disputed. Goodwill letters to the original creditor sometimes work too.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Goodwill adjustment letter</h2><p className="text-cr-muted mb-4">Send to the creditor's customer relations department. Explain your situation, acknowledge the late payment, request removal as a goodwill gesture.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Bureau dispute for late payments</h2><p className="text-cr-muted mb-4">If the payment was reported incorrectly (wrong date, wrong amount, not yours), dispute with the bureau. Include supporting documentation.</p></div>
<div className="cr-card"><h2 className="text-2xl font-bold mb-3">Generate goodwill and dispute letters free</h2><p className="text-cr-muted mb-4">Both templates included in our free letter generator.</p><Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate free letters <ArrowRight size={16} /></Link></div>
    </T>
  )
}