import Link from 'next/link'
import {
  Shield,
  ArrowRight,
  FileText,
  Lock,
  Users,
  ChevronRight,
  Zap,
  RefreshCw,
  CheckCircle2,
  Network,
} from 'lucide-react'

function HeroSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="cr-container">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C65D1E] animate-pulse-dot" />
          <span className="text-xs tracking-widest opacity-40 uppercase">Built on the LikenessVerified™ network</span>
        </div>

        <h1 className="cr-headline text-center mb-6">
          The credit industry
          <br />
          <span className="text-[#C65D1E]">built wrong.</span>
          <br />
          We built it free.
        </h1>

        <p className="cr-subheadline text-center max-w-xl mx-auto mb-10">
          Dispute letters for every bureau. Sub-bureaus. Furnishers.
          <br />
          No paywall. No subscription. No catch.
          <br />
          Claim your likeness through LikenessVerified and join the network — it's the only membership that matters.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/dispute" className="cr-btn cr-btn-primary text-base px-8 py-4">
            Generate Free Letters
            <ArrowRight size={16} />
          </Link>
          <Link href="/network" className="cr-btn cr-btn-outline text-base px-8 py-4">
            Join the Network
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs opacity-30">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={12} />
            <span>Equifax · Experian · TransUnion</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={12} />
            <span>LexisNexis · ChexSystems · FactorTrust</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={12} />
            <span>Furnishers · Medical · Utilities</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function TruthSection() {
  return (
    <section className="py-20 border-y" style={{borderColor: 'var(--cr-border)'}}>
      <div className="cr-container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-6">
            The game is rigged against people who don't know the rules.
          </h2>
          <p className="text-sm leading-relaxed opacity-60 mb-6">
            Credit repair companies charge $100–$500/month to send the same letters you could generate here in 5 minutes. They profit because most people don't know the law — or don't know they can do it themselves.
          </p>
          <p className="text-sm leading-relaxed opacity-60">
            CreditKlimb breaks that. Every letter. Every bureau. Every sub-bureau. Free.
            <br />
            And when you're ready to join something bigger — claim your likeness through LikenessVerified and step into the network.
          </p>
        </div>
      </div>
    </section>
  )
}

function ToolsSection() {
  const tools = [
    {
      icon: FileText,
      title: 'Dispute Letter Generator',
      desc: 'Generate letters for any bureau, any furnisher, any sub-bureau. Free.',
      href: '/dispute',
      tag: 'Free',
    },
    {
      icon: RefreshCw,
      title: 'Score Simulator',
      desc: 'See how paying debts, removing items, and more affects your score before you act.',
      href: '/simulate',
      tag: 'Free',
    },
    {
      icon: Zap,
      title: 'Free Credit Reports',
      desc: 'Get your free reports from all 3 bureaus. Official source only.',
      href: '/leads',
      tag: 'Free',
    },
    {
      icon: Network,
      title: 'Sub-Bureau Disputes',
      desc: 'LexisNexis, ChexSystems, FactorTrust, TeleCheck — the bureaus they don\'t tell you about.',
      href: '/sub-bureau-disputes',
      tag: 'Free',
    },
  ]

  return (
    <section className="py-24">
      <div className="cr-container">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Free Tools</p>
          <h2 className="cr-section-title">Everything free. No paywall.</h2>
          <p className="text-sm opacity-50 mt-2">No credit card. No subscription. No "unlock premium."</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {tools.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className="group p-8 border transition-all duration-150 hover:border-[#C65D1E]"
              style={{borderColor: 'var(--cr-border)'}}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg border flex items-center justify-center" style={{borderColor: 'var(--cr-border)'}}>
                  <tool.icon size={18} className="opacity-60" />
                </div>
                <span className="cr-badge cr-badge-accent text-xs">{tool.tag}</span>
              </div>
              <h3 className="font-semibold text-base mb-2 group-hover:text-[#C65D1E] transition-colors">{tool.title}</h3>
              <p className="text-sm opacity-40 leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/tools" className="cr-btn cr-btn-outline text-sm">
            View All Free Tools
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function NetworkSection() {
  return (
    <section className="py-24 border-t" style={{borderColor: 'var(--cr-border)'}}>
      <div className="cr-container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-40 mb-4">The Network</p>
            <h2 className="cr-section-title mb-6">
              LikenessVerified
              <br />
              is the membership.
            </h2>
            <p className="text-sm opacity-60 leading-relaxed mb-6">
              CreditKlimb is free for everyone. But the people who claim their likeness through LikenessVerified? They're in the network. They can resell it. White-label it. Offer it as a service. Earn from it.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Resell CreditKlimb tools under your own brand',
                'White-label for your clients',
                'Commission on every user you bring in',
                'Access the full LikenessVerified tool suite',
                'Claim your likeness once — access every ecosystem product',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 size={14} className="text-[#C65D1E] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              <Link href="/network" className="cr-btn cr-btn-primary text-sm">
                Join the Network
                <ChevronRight size={14} />
              </Link>
              <Link href="/dispute" className="cr-btn cr-btn-outline text-sm">
                Start Free First
              </Link>
            </div>
          </div>

          <div className="border p-8" style={{borderColor: 'var(--cr-border)'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full border flex items-center justify-center" style={{borderColor: 'var(--cr-border)'}}>
                <Shield size={14} className="opacity-50" />
              </div>
              <span className="text-sm font-medium">LikenessVerified™ Network</span>
            </div>
            <div className="space-y-1">
              {[
                { label: 'Members', value: 'Growing' },
                { label: 'Products in network', value: '7 active' },
                { label: 'Your commission', value: '3% – 20%' },
                { label: 'Likeness claim', value: 'Required' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b" style={{borderColor: 'var(--cr-border)'}}>
                  <span className="text-sm opacity-40">{stat.label}</span>
                  <span className="text-sm font-mono font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs opacity-25 mt-6 text-center">One likeness. Every tool. Every network.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BureauSection() {
  const primary = ['Equifax', 'Experian', 'TransUnion']
  const sub = ['LexisNexis', 'ChexSystems', 'FactorTrust', 'MicroBilt', 'TeleCheck', 'Early Warning']

  return (
    <section className="py-20 border-t" style={{borderColor: 'var(--cr-border)'}}>
      <div className="cr-container">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Coverage</p>
          <h2 className="cr-section-title">Every bureau. Free.</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {primary.map((b, i) => (
            <div key={i} className="cr-badge cr-badge-dark px-4 py-2">{b}</div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {sub.map((b, i) => (
            <div key={i} className="cr-badge cr-badge-dark text-xs px-3 py-1.5 opacity-60">{b}</div>
          ))}
        </div>
        <p className="text-xs opacity-25 text-center mt-6">All included in free tools — no premium tier</p>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24">
      <div className="cr-container">
        <div className="border text-center p-16" style={{borderColor: 'var(--cr-border)'}}>
          <h2 className="cr-headline text-xl mb-4">Stop paying for what you can do yourself.</h2>
          <p className="cr-subheadline mb-8 max-w-md mx-auto">
            Your credit. Your letters. Your future.
            <br />
            The network is there when you're ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dispute" className="cr-btn cr-btn-primary px-10 py-4">
              Generate Free Letters
              <ArrowRight size={16} />
            </Link>
            <Link href="/network" className="cr-btn cr-btn-outline px-10 py-4">
              Join the Network
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function MinimalNav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md" style={{backgroundColor: 'rgba(17,17,17,0.85)', borderBottom: '1px solid var(--cr-border)'}}>
      <div className="cr-container py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield size={18} className="text-[#C65D1E]" />
          <span className="font-semibold text-sm tracking-tight">CreditKlimb<span className="text-[#C65D1E]">™</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/tools" className="text-sm opacity-50 hover:opacity-100 transition-opacity">Tools</Link>
          <Link href="/dispute" className="text-sm opacity-50 hover:opacity-100 transition-opacity">Dispute</Link>
          <Link href="/learn" className="text-sm opacity-50 hover:opacity-100 transition-opacity">Learn</Link>
          <Link href="/network" className="text-sm opacity-50 hover:opacity-100 transition-opacity">Network</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dispute" className="cr-btn cr-btn-primary text-xs px-4 py-2">
            Free Letters
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#111111', color: '#ffffff'}}>
      <MinimalNav />
      <HeroSection />
      <TruthSection />
      <ToolsSection />
      <NetworkSection />
      <BureauSection />
      <CTASection />

      <footer className="py-12 border-t" style={{borderColor: 'var(--cr-border)'}}>
        <div className="cr-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-[#C65D1E]" />
              <span className="font-semibold text-sm">CreditKlimb™</span>
            </div>
            <div className="flex gap-6 text-xs opacity-40">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/ask">Ask</Link>
              <Link href="/network">Network</Link>
            </div>
            <p className="text-xs opacity-25">© {new Date().getFullYear()} CreditKlimb™ — Part of the LikenessVerified™ network</p>
          </div>
        </div>
      </footer>
    </div>
  )
}