import Link from 'next/link'
import {
  Shield,
  ArrowRight,
  Eye,
  FileText,
  Lock,
  Users,
  ChevronRight,
  Zap,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react'

function HeroSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="cr-container">
        {/* Pre-headline badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C65D1E] animate-pulse" />
          <span className="text-sm tracking-wide opacity-50 uppercase text-sm">Powered by LikenessVerified™</span>
        </div>

        {/* Headline */}
        <h1 className="cr-headline text-center mb-6">
          Understand your credit.
          <br />
          <span className="text-[#C65D1E]">Fix what matters.</span>
        </h1>

        {/* Subtext */}
        <p className="cr-subheadline text-center max-w-xl mx-auto mb-10">
          No subscriptions. No pressure. Just clarity.
          <br />
          The credit tool built for everyone — not just the ones who can afford it.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/tools" className="cr-btn cr-btn-primary text-base px-8 py-4">
            Start Now
            <ArrowRight size={16} />
          </Link>
          <Link href="/dispute" className="cr-btn cr-btn-outline text-base px-8 py-4">
            Generate Letters
          </Link>
        </div>

        {/* Trust line */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm opacity-40">
          <div className="flex items-center gap-2">
            <Lock size={12} />
            <span>Private</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={12} />
            <span>FCRA-Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={12} />
            <span>For Everyone</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function TruthSection() {
  return (
    <section className="py-20 border-t border-b" style={{borderColor: 'var(--cr-border-dark)'}}>
      <div className="cr-container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-6 tracking-tight">
            The credit industry profits off confusion.
          </h2>
          <p className="text-base leading-relaxed opacity-60 mb-6">
            Most credit services hide behind complexity. They charge monthly fees to do what you could do yourself — if you had the right tools. We built those tools. And we're making them free.
          </p>
          <p className="text-base leading-relaxed font-medium">
            Now anyone can understand their credit. Fix their credit. Own their financial future.
          </p>
        </div>
      </div>
    </section>
  )
}

function ToolsGrid() {
  const tools = [
    {
      icon: FileText,
      title: 'Dispute Letters',
      desc: 'Generate professional dispute letters for any credit error. Free.',
      href: '/dispute',
      badge: 'Free',
    },
    {
      icon: Eye,
      title: 'Credit Analyzer',
      desc: 'Drop your report. Get a breakdown of what\'s hurting you and why.',
      href: '/tools',
      badge: 'Free',
    },
    {
      icon: RefreshCw,
      title: 'Score Simulator',
      desc: 'See how paying debts, removing items, and more affects your score.',
      href: '/simulate',
      badge: 'Free',
    },
    {
      icon: Zap,
      title: 'Instant Report',
      desc: 'Get your free credit reports from all 3 bureaus. Right now.',
      href: '/leads',
      badge: 'Free',
    },
  ]

  return (
    <section className="py-24">
      <div className="cr-container">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Core Tools</p>
          <h2 className="cr-section-title">Everything free. No barriers.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {tools.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className="group p-8 border transition-all duration-150 hover:border-[#C65D1E]"
              style={{borderColor: 'var(--cr-border-dark)'}}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center border" style={{borderColor: 'var(--cr-border-dark)'}}>
                  <tool.icon size={18} className="opacity-70" />
                </div>
                <span className="cr-badge cr-badge-accent text-xs">{tool.badge}</span>
              </div>
              <h3 className="font-semibold text-base mb-2 group-hover:text-[#C65D1E] transition-colors">{tool.title}</h3>
              <p className="text-sm opacity-50 leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function EcosystemSection() {
  return (
    <section className="py-24 border-t" style={{borderColor: 'var(--cr-border-dark)'}}>
      <div className="cr-container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-xs uppercase tracking-widest opacity-40 mb-4">The Ecosystem</p>
            <h2 className="cr-section-title mb-6">
              Sell it. Share it.
              <br />
              Build with it.
            </h2>
            <p className="text-sm opacity-60 leading-relaxed mb-6">
              CreditKlimb is built on the LikenessVerified™ infrastructure — the same identity layer powering tools across the Porterful ecosystem. That means:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Resell CreditKlimb as your own tool',
                'White-label for your brand',
                'Earn commission on every user you bring in',
                'Access the full Likeness identity stack',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 size={14} className="text-[#C65D1E] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/affiliate" className="cr-btn cr-btn-outline text-sm">
              Join the Ecosystem
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Right: Visual */}
          <div className="border p-8" style={{borderColor: 'var(--cr-border-dark)'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full border flex items-center justify-center" style={{borderColor: 'var(--cr-border-dark)'}}>
                <Shield size={14} className="opacity-50" />
              </div>
              <span className="text-sm font-medium">CreditKlimb™</span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Users', value: 'Active daily' },
                { label: 'Letters generated', value: 'Today' },
                { label: 'Ecosystem partners', value: 'Growing' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b" style={{borderColor: 'var(--cr-border-dark)'}}>
                  <span className="text-sm opacity-50">{stat.label}</span>
                  <span className="text-sm font-mono">{stat.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs opacity-30 mt-6 text-center">Infrastructure shared with Porterful ecosystem</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BureausSection() {
  const bureaus = [
    { name: 'Equifax', type: 'Primary' },
    { name: 'Experian', type: 'Primary' },
    { name: 'TransUnion', type: 'Primary' },
    { name: 'LexisNexis', type: 'Sub-bureau' },
    { name: 'ChexSystems', type: 'Sub-bureau' },
  ]

  return (
    <section className="py-20 border-t" style={{borderColor: 'var(--cr-border-dark)'}}>
      <div className="cr-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Coverage</p>
            <h2 className="cr-section-title">All bureaus. All sub-bureaus.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {bureaus.map((b, i) => (
              <div key={i} className="cr-badge cr-badge-dark text-sm px-4 py-2">
                <span className="font-medium">{b.name}</span>
                <span className="opacity-50 text-xs ml-2">{b.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24">
      <div className="cr-container">
        <div className="border text-center p-16" style={{borderColor: 'var(--cr-border-dark)'}}>
          <h2 className="cr-headline text-xl mb-4">Stop paying for what you can do yourself.</h2>
          <p className="cr-subheadline mb-8 max-w-md mx-auto">
            Your credit. Your tools. Your future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tools" className="cr-btn cr-btn-primary px-10 py-4">
              Use the Tools — It's Free
              <ArrowRight size={16} />
            </Link>
            <Link href="/affiliate" className="cr-btn cr-btn-outline px-10 py-4">
              Join the Ecosystem
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function MinimalNav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md" style={{backgroundColor: 'rgba(17,17,17,0.8)', borderBottom: '1px solid var(--cr-border-dark)'}}>
      <div className="cr-container py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield size={18} className="text-[#C65D1E]" />
          <span className="font-semibold text-sm tracking-tight">CreditKlimb<span className="text-[#C65D1E]">™</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/tools" className="text-sm opacity-50 hover:opacity-100 transition-opacity">Tools</Link>
          <Link href="/dispute" className="text-sm opacity-50 hover:opacity-100 transition-opacity">Dispute</Link>
          <Link href="/learn" className="text-sm opacity-50 hover:opacity-100 transition-opacity">Learn</Link>
          <Link href="/affiliate" className="text-sm opacity-50 hover:opacity-100 transition-opacity">Ecosystem</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/tools" className="cr-btn cr-btn-primary text-xs px-4 py-2">
            Start Free
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
      <ToolsGrid />
      <EcosystemSection />
      <BureausSection />
      <CTASection />

      {/* Footer */}
      <footer className="py-12 border-t" style={{borderColor: 'var(--cr-border-dark)'}}>
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
            </div>
            <p className="text-xs opacity-30">© {new Date().getFullYear()} CreditKlimb™ — Built on LikenessVerified™</p>
          </div>
        </div>
      </footer>
    </div>
  )
}