import Link from 'next/link'
import { Shield, ArrowRight, CheckCircle2, Users, Globe, Network, Zap, Star, Lock } from 'lucide-react'

export default function NetworkPage() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#111111', color: '#ffffff'}}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md" style={{backgroundColor: 'rgba(17,17,17,0.9)', borderBottom: '1px solid var(--cr-border)'}}>
        <div className="cr-container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield size={18} className="text-[#C65D1E]" />
            <span className="font-semibold text-sm tracking-tight">CreditKlimb<span className="text-[#C65D1E]">™</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dispute" className="text-sm opacity-50">Dispute</Link>
            <Link href="/network" className="text-sm opacity-100 font-medium">Network</Link>
            <Link href="/tools" className="text-sm opacity-50">Tools</Link>
          </div>
        </div>
      </nav>

      <div className="cr-container py-16 max-w-2xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C65D1E] animate-pulse-dot" />
            <span className="text-xs tracking-widest opacity-40 uppercase">LikenessVerified™ Network</span>
          </div>
          <h1 className="cr-headline text-3xl mb-4">
            The network that pays
            <br />
            <span className="text-[#C65D1E]">to be in it.</span>
          </h1>
          <p className="cr-subheadline mb-8 max-w-lg mx-auto">
            CreditKlimb is free for everyone. But verified members of the LikenessVerified network get more — white-label tools, commissions, and a full ecosystem.
          </p>
          <Link href="https://likenessverified.com" className="cr-btn cr-btn-primary">
            Verify Your Identity
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest opacity-40 mb-6">How It Works</p>
          <div className="space-y-4">
            {[
              { n: '01', title: 'Verify once', desc: 'One identity verification through LikenessVerified. Covers every tool in the ecosystem.' },
              { n: '02', title: 'Access everything', desc: 'White-label tools, commission tracking, referral links, and the full product suite.' },
              { n: '03', title: 'Earn from referrals', desc: 'Every user you bring in pays you. Every sale through your link earns commission.' },
              { n: '04', title: 'Build on it', desc: 'Offer CreditKlimb as your own service. Your clients never see the CreditKlimb brand.' },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-6 border" style={{borderColor: 'var(--cr-border)'}}>
                <div className="text-xs font-mono opacity-30 flex-shrink-0 mt-0.5 w-6">{step.n}</div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                  <p className="text-sm opacity-40">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What You Get */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest opacity-40 mb-6">Network Benefits</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Globe, title: 'White-Label', desc: 'CreditKlimb under your brand, your domain, your clients' },
              { icon: Network, title: 'Referral Commission', desc: '3–20% on every sale made through your link' },
              { icon: Users, title: 'Sub-Affiliates', desc: 'Build a team. Earn from their sales too.' },
              { icon: Lock, title: 'Verified Identity', desc: 'One verification. Every ecosystem tool unlocked.' },
              { icon: Zap, title: 'Priority Access', desc: 'New tools and features before public release' },
              { icon: Star, title: 'Ecosystem Badge', desc: 'Verified network badge on your profile and referrals' },
            ].map((item, i) => (
              <div key={i} className="p-5 border" style={{borderColor: 'var(--cr-border)'}}>
                <item.icon size={16} className="text-[#C65D1E] mb-3" />
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs opacity-40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ecosystem Products */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest opacity-40 mb-6">The Ecosystem</p>
          <h2 className="cr-section-title text-xl mb-6">One identity. Seven products.</h2>
          <div className="space-y-2">
            {[
              { name: 'CreditKlimb', tag: 'Live', desc: 'Credit repair tools — free for everyone, commission for network' },
              { name: 'LikenessVerified™', tag: 'Live', desc: 'Biometric identity — the verification layer for the whole ecosystem' },
              { name: 'Porterful', tag: 'Live', desc: 'Music and commerce platform for artists' },
              { name: 'NLDS', tag: 'Live', desc: 'National Land Data System — real estate leads and deals' },
              { name: 'Overstood™', tag: 'Coming', desc: 'Curiosity app — snap or type anything, get an AI explanation' },
              { name: 'FamilyOS', tag: 'Coming', desc: 'Family legacy and records management' },
              { name: 'IHD™', tag: 'Coming', desc: 'Inmate Help Desk — document assistance for families' },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between p-4 border" style={{borderColor: 'var(--cr-border)'}}>
                <div>
                  <span className="font-medium text-sm">{product.name}</span>
                  <p className="text-xs opacity-40">{product.desc}</p>
                </div>
                <span className={`text-xs px-2 py-1 border flex-shrink-0 ml-4 ${product.tag === 'Live' ? 'border-green-500/30 text-green-500' : 'border-[#C65D1E]/30 text-[#C65D1E]'}`}>
                  {product.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border p-10 text-center" style={{borderColor: 'var(--cr-border)'}}>
          <h2 className="font-semibold text-lg mb-3">Ready to join the network?</h2>
          <p className="text-sm opacity-40 mb-6 max-w-sm mx-auto">
            Verify your identity once. Access everything. Earn from the ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://likenessverified.com" className="cr-btn cr-btn-primary">
              Verify Identity
              <ArrowRight size={14} />
            </Link>
            <Link href="/dispute" className="cr-btn cr-btn-outline">
              Use Free Tools First
            </Link>
          </div>
          <p className="text-xs opacity-25 mt-6">Verification through LikenessVerified™ — inquiringminds.co</p>
        </div>
      </div>
    </div>
  )
}