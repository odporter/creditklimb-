'use client'

import Link from 'next/link'
import { Calculator, FileText, TrendingUp, CreditCard, BookOpen, Download, CheckCircle, ArrowRight } from 'lucide-react'

const TOOLS = [
  { icon: FileText, title: 'Dispute Letter Generator', desc: 'Generate letters for any bureau, any furnisher, any sub-bureau.', href: '/dispute', free: true },
  { icon: TrendingUp, title: 'Score Simulator', desc: 'See how different actions affect your score before you act.', href: '/simulate', free: true },
  { icon: Calculator, title: 'Credit Calculator', desc: 'Debt-to-income ratios, credit utilization, payoff timelines.', href: '/calculate', free: true },
  { icon: CreditCard, title: 'Debt Payoff Planner', desc: 'Avalanche vs snowball method. See the math.', href: '/debt', free: true },
  { icon: BookOpen, title: 'Credit Education', desc: 'How credit works, how to read reports, how to improve.', href: '/learn', free: true },
  { icon: Download, title: 'Template Library', desc: 'Standalone templates for every dispute type.', href: '/templates', free: true },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#111111', color: '#ffffff'}}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md" style={{backgroundColor: 'rgba(17,17,17,0.9)', borderBottom: '1px solid var(--cr-border)'}}>
        <div className="cr-container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-semibold text-sm tracking-tight">CreditKlimb<span className="text-[#C65D1E]">™</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dispute" className="text-sm opacity-50">Dispute</Link>
            <Link href="/tools" className="text-sm opacity-100 font-medium">Tools</Link>
            <Link href="/network" className="text-sm opacity-50">Network</Link>
          </div>
        </div>
      </nav>

      <div className="cr-container py-16 max-w-2xl">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Free Tools</p>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Everything free.</h1>
          <p className="text-sm opacity-50">No credit card. No subscription. No paywall. All of it.</p>
        </div>

        <div className="space-y-3">
          {TOOLS.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className="flex items-center justify-between p-6 border transition-all hover:border-[#C65D1E]"
              style={{borderColor: 'var(--cr-border)'}}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0" style={{borderColor: 'var(--cr-border)'}}>
                  <tool.icon size={18} className="opacity-60" />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-0.5">{tool.title}</div>
                  <div className="text-xs opacity-40">{tool.desc}</div>
                </div>
              </div>
              <ArrowRight size={14} className="opacity-30 flex-shrink-0" />
            </Link>
          ))}
        </div>

        <div className="mt-12 border p-8 text-center" style={{borderColor: 'var(--cr-border)'}}>
          <p className="text-xs uppercase tracking-widest opacity-40 mb-3">LikenessVerified Network</p>
          <h3 className="font-semibold text-sm mb-2">Want to offer these tools under your own brand?</h3>
          <p className="text-xs opacity-40 mb-4">White-label. Commission. One verified identity.</p>
          <Link href="/network" className="cr-btn cr-btn-primary text-xs px-6 py-2">
            Join the Network
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  )
}