import { Nav } from '@/components/Nav'
import { ArrowRight } from '@/components/Icons'
import Link from 'next/link'
const T = ({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) => (
  <div className="min-h-screen bg-cr-bg"><Nav /><section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white"><div className="cr-container text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1><p className="text-xl opacity-90 max-w-2xl mx-auto">{desc}</p></div></section><section className="py-16"><div className="cr-container max-w-3xl">{children}</div></section></div>
)
export default function Page() {
  return (
    <T title="Remove Medical Collections From Credit Report" desc="Medical collections damage your credit score. Here's how to dispute and remove them.">
      
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Can medical collections be removed?</h2><p className="text-cr-muted mb-4">Yes. Medical collections can be disputed just like any other collection. Under the FCRA, bureaus must investigate within 30 days. If the collector cannot verify the debt or the amount is wrong, it must be removed.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Step 1: Check if it's yours</h2><p className="text-cr-muted mb-4">Request full records from the medical provider. Verify your name, date of service, and account number. If anything is wrong, dispute immediately.</p></div>
<div className="cr-card mb-8"><h2 className="text-2xl font-bold mb-4">Step 2: Send a debt validation letter</h2><p className="text-cr-muted mb-4">Within 30 days of first contact, demand proof the debt is yours. Collectors must stop collection until they validate.</p></div>
<div className="cr-card"><h2 className="text-2xl font-bold mb-3">Get your medical collection dispute letter free</h2><p className="text-cr-muted mb-4">Generate FCRA-compliant dispute and validation letters for free.</p><Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">Generate free letter <ArrowRight size={16} /></Link></div>
    </T>
  )
}