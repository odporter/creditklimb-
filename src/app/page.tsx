import Link from 'next/link'
import {
  Shield,
  FileText,
  Calculator,
  TrendingUp,
  CreditCard,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Clock,
  DollarSign,
  Briefcase,
  Star,
  Phone,
  Mail,
  Lock,
  HelpCircle,
  MessageSquare,
} from 'lucide-react'
import { Nav } from '@/components/Nav'
import { NewsletterForm } from '@/components/NewsletterForm'

const FEATURES = [
  {
    icon: FileText,
    title: 'Dispute Letter Generator',
    description: 'Create professional dispute letters for late payments, collections, charge-offs, and more.',
    free: true,
  },
  {
    icon: Calculator,
    title: 'Credit Score Calculator',
    description: 'See how different actions affect your score. Plan your credit repair strategy.',
    free: true,
  },
  {
    icon: TrendingUp,
    title: 'Score Simulator',
    description: 'Simulate paying off debts, opening accounts, and other credit actions.',
    free: true,
  },
  {
    icon: CreditCard,
    title: 'Debt Payoff Planner',
    description: 'Create a custom debt payoff plan with avalanche or snowball method.',
    free: true,
  },
]

const STATISTICS = [
  { value: '100%', label: 'Free to Start', icon: DollarSign },
  { value: '50+', label: 'Dispute Templates', icon: FileText },
  { value: '3 Min', label: 'Average Setup', icon: Clock },
  { value: '24/7', label: 'Access', icon: Shield },
]

const BUREAUS = [
  { name: 'Equifax', letters: '3 bureaus' },
  { name: 'Experian', letters: '3 bureaus' },
  { name: 'TransUnion', letters: '3 bureaus' },
  { name: 'LexisNexis', letters: 'Premium' },
  { name: 'ChexSystems', letters: 'Premium' },
]

const TESTIMONIALS = [
  {
    name: 'Marcus T.',
    location: 'Atlanta, GA',
    text: 'I had 7 collection accounts on my report. Used the free dispute letters and got 5 removed in 60 days. The templates actually work.',
    score: '+89 points',
  },
  {
    name: 'Sandra K.',
    location: 'Houston, TX',
    text: 'The step-by-step guide made everything simple. I didn\'t need the paid version — the free tools were enough to get started.',
    score: '+64 points',
  },
  {
    name: 'James R.',
    location: 'Phoenix, AZ',
    text: 'I was skeptical at first. But the dispute system covered all 3 bureaus AND the sub-bureaus I\'d never even heard of.',
    score: '+112 points',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />

      {/* Lead Magnet Banner */}
      <section className="py-5 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full flex-shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-medium opacity-90 mb-0.5">
                  <span className="bg-white/25 px-2 py-0.5 rounded text-xs font-bold">FREE</span>
                  <span>No credit card required</span>
                </div>
                <h3 className="text-lg font-bold leading-tight">Answer 3 Questions — Get Your Personalized Credit Plan</h3>
              </div>
            </div>
            <Link
              href="/leads"
              className="px-6 py-3 bg-white text-cr-primary font-bold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center gap-2 flex-shrink-0"
            >
              Get My Free Plan →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-3 bg-white border-b border-gray-100">
        <div className="cr-container">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-cr-muted">
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-green-500" />
              <span>FCRA-Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock size={14} className="text-green-500" />
              <span>Your Data Stays Private</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign size={14} className="text-green-500" />
              <span>100% Free to Start</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-green-500" />
              <span>10,000+ People Helped</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Credit Report Banner */}
      <section className="py-4 bg-yellow-50 border-b border-yellow-200">
        <div className="cr-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText size={14} className="text-yellow-700" />
              </div>
              <div>
                <div className="text-sm font-medium text-yellow-800">Start here first</div>
                <div className="text-sm text-yellow-700">
                  Get your <strong>free credit reports</strong> from all 3 bureaus at AnnualCreditReport.com
                </div>
              </div>
            </div>
            <a
              href="https://www.annualcreditreport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-yellow-500 text-yellow-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap text-sm"
            >
              Get Free Reports →
            </a>
          </div>
        </div>
      </section>

      {/* Urgency / Social Proof Ticker */}
      <section className="py-3 bg-cr-surface border-b border-cr-border overflow-hidden">
        <div className="flex items-center gap-8">
          <div className="flex-shrink-0 px-4 py-1 bg-cr-primary text-white text-sm font-bold rounded-r-full">
            🔔 Live
          </div>
          <div className="flex gap-8 overflow-hidden">
            {[
              'Marcus from Atlanta just generated his first dispute letter',
              'Sandra from Houston completed her credit analysis',
              'James from Phoenix is disputing 7 items on his report',
              'A new member joined from Chicago',
              'Tyrone from Detroit upgraded to We Handle It',
              'Keisha from Houston downloaded her dispute letters',
            ].map((msg, i) => (
              <span key={i} className="text-sm text-cr-muted whitespace-nowrap">
                {msg} <span className="text-green-500 mx-2">✓</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="cr-container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
            <CheckCircle size={16} />
            100% Free Credit Repair Tools — No Credit Card Required
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cr-primary/10 text-cr-primary rounded-full text-sm font-medium mb-6 ml-4">
            <Users size={16} />
            Join 10,000+ members who've improved their credit
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Don't Just Check Your Credit.
            <br />
            <span className="text-cr-primary">Climb It.</span>
          </h1>
          <p className="text-xl text-cr-muted mb-8 max-w-2xl mx-auto">
            CreditKlimb helps you actually improve your credit — for free.
            Dispute letters, Net30 vendors, business credit building.
            Everything you need to climb to better credit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools" className="cr-btn cr-btn-primary text-lg px-8 py-4">
              Explore Free Tools
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link href="/dispute" className="cr-btn cr-btn-secondary text-lg px-8 py-4">
              Generate Dispute Letters
            </Link>
          </div>
          {/* Trust row under CTA */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-cr-muted">
            <div className="flex items-center gap-2">
              <Lock size={14} className="text-green-500" />
              <span>Private & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={14} className="text-green-500" />
              <span>100% Free to Start</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-green-500" />
              <span>FCRA-Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-green-500" />
              <span>10,000+ People Helped</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-cr-surface border-y border-cr-border">
        <div className="cr-container">
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="cr-card bg-cr-bg">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-cr-text mb-3 text-sm italic">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-cr-muted">{t.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-bold text-sm">{t.score}</div>
                    <div className="text-xs text-cr-muted">credit score</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bureaus Covered */}
      <section className="py-16">
        <div className="cr-container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">We Cover All Major Bureaus</h2>
            <p className="text-cr-muted">Dispute with every bureau that affects your credit</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {BUREAUS.map((bureau, i) => (
              <div key={i} className="cr-card text-center py-4">
                <div className="font-semibold">{bureau.name}</div>
                <div className="text-xs text-cr-muted">{bureau.letters}</div>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-cr-muted text-sm">
            Premium includes outreach to all bureaus + follow-up letters
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-cr-surface">
        <div className="cr-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATISTICS.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="mx-auto mb-2 text-cr-primary" size={28} />
                <div className="text-3xl md:text-4xl font-bold text-cr-primary mb-1">{stat.value}</div>
                <div className="text-cr-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="cr-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-cr-muted">Professional tools, completely free. No credit card required.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <div key={i} className="cr-card hover:border-cr-primary transition-all hover:shadow-sm">
                <div className="w-12 h-12 rounded-lg tint-primary-10 flex items-center justify-center mb-4">
                  <feature.icon className="text-cr-primary" size={24} />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-cr-muted text-sm mb-3">{feature.description}</p>
                {feature.free && (
                  <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                    <CheckCircle size={14} />
                    Free Forever
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/tools" className="cr-btn cr-btn-secondary">
              View All Free Tools
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Don't See It? Ask Us */}
      <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-100">
        <div className="cr-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <HelpCircle size={22} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-amber-900">Didn't see what you need?</h3>
                <p className="text-amber-700 text-sm">
                  We probably cover it. Net30 vendors, specific dispute types, furnisher notices — if it's credit-related, just ask.
                </p>
              </div>
            </div>
            <Link
              href="/ask"
              className="px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors whitespace-nowrap flex items-center gap-2 flex-shrink-0"
            >
              <MessageSquare size={16} />
              Ask Us — Free
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-cr-surface">
        <div className="cr-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-cr-muted">Three simple steps to better credit</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Get Your Reports',
                desc: 'Download your free credit reports from all three bureaus. We\'ll show you how.',
                cta: { text: 'Get Free Reports', href: 'https://www.annualcreditreport.com' },
              },
              {
                step: 2,
                title: 'Generate Disputes',
                desc: 'Use our free tools to create professional dispute letters for any error.',
                cta: { text: 'Start Disputing', href: '/dispute' },
              },
              {
                step: 3,
                title: 'Track Progress',
                desc: 'Monitor your disputes, see results, and watch your score improve.',
                cta: { text: 'Learn How', href: '/learn' },
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-cr-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-cr-muted text-sm mb-4">{item.desc}</p>
                <Link href={item.cta.href} className="text-cr-primary text-sm font-medium hover:underline">
                  {item.cta.text} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dispute Types */}
      <section className="py-16">
        <div className="cr-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dispute Anything</h2>
            <p className="text-cr-muted">We have templates for every type of credit error</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Late Payments',
              'Collections',
              'Charge-Offs',
              'Bankruptcies',
              'Repossessions',
              'Medical Bills',
              'Identity Theft',
              'Wrong Balances',
              'Duplicate Accounts',
              'Unauthorized Inquiries',
              'Wrong Addresses',
              'Wrong Names',
            ].map((type, i) => (
              <Link
                key={i}
                href={`/dispute?type=${type.toLowerCase().replace(/ /g, '-')}`}
                className="cr-card text-center hover:border-cr-primary transition-all hover:shadow-sm"
              >
                <FileText className="mx-auto mb-2 text-cr-primary" size={24} />
                <span className="font-medium text-sm">{type}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Upsell */}
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                <Star size={14} />
                Optional Upgrade
              </div>
              <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
              <p className="mb-6 opacity-90">
                Our free tools handle most credit repairs. For complex cases, our paid plans
                include professional review, certified mail handling, and expert guidance.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Professional letter review',
                  'We mail letters via certified mail',
                  'Dedicated credit advisor',
                  'Money-back guarantee',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle size={20} className="flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/premium" className="cr-btn bg-white text-cr-primary hover:bg-gray-100">
                View Plans & Pricing
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="text-center">
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur">
                <div className="text-6xl font-bold mb-2">$29</div>
                <div className="opacity-80 text-sm">Full Repair — one-time</div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-5xl font-bold mb-1">$49</div>
                  <div className="opacity-80 text-sm">We Handle It — we mail everything</div>
                </div>
                <p className="mt-4 text-xs opacity-70">Free plan always available — upgrade anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16">
        <div className="cr-container text-center">
          <h2 className="text-3xl font-bold mb-4">Why People Trust Us</h2>
          <p className="text-cr-muted mb-12">Transparent, free, and effective</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Clock className="mx-auto mb-4 text-cr-primary" size={32} />
              <h3 className="font-semibold mb-2">Save Time</h3>
              <p className="text-cr-muted text-sm">
                Generate professional disputes in minutes, not hours.
              </p>
            </div>
            <div>
              <DollarSign className="mx-auto mb-4 text-cr-primary" size={32} />
              <h3 className="font-semibold mb-2">Save Money</h3>
              <p className="text-cr-muted text-sm">
                Credit repair companies charge $100+/month. We're free.
              </p>
            </div>
            <div>
              <Shield className="mx-auto mb-4 text-cr-primary" size={32} />
              <h3 className="font-semibold mb-2">Private & Secure</h3>
              <p className="text-cr-muted text-sm">
                Your data stays private. We don't sell or share your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Credit Section */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
      >
        <div className="cr-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-sm" style={{ backgroundColor: '#1e3a5f', color: '#60a5fa' }}>
                <Briefcase size={14} />
                Also Available
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">Build Business Credit</h2>
              <p className="mb-6" style={{ color: '#94a3b8' }}>
                Separate your business finances from personal. Access credit cards, loans,
                and lines of credit up to $5 million — without affecting your personal credit score.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'D-U-N-S number setup',
                  'Business tradeline building',
                  'FICO SBSS score improvement',
                  'Vendor & supplier credit',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3" style={{ color: '#e2e8f0' }}>
                    <CheckCircle size={18} className="text-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/business-credit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all"
                style={{ backgroundColor: '#3b82f6' }}
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
            <div
              className="p-8 rounded-2xl text-center"
              style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
            >
              <TrendingUp className="mx-auto mb-4 text-blue-400" size={48} />
              <div className="text-5xl font-bold text-white mb-2">$5M+</div>
              <div style={{ color: '#94a3b8' }}>Max business credit available</div>
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid #334155' }}>
                <div className="text-sm" style={{ color: '#64748b' }}>Different from personal credit</div>
                <div className="text-sm" style={{ color: '#64748b' }}>D-U-N-S • PAYDEX • FICO SBSS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cr-surface border-t border-cr-border">
        <div className="cr-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Fix Your Credit?</h2>
          <p className="text-cr-muted mb-8">
            Start with our free tools. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools" className="cr-btn cr-btn-primary text-lg px-8 py-4">
              Use Free Tools
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link href="/leads" className="cr-btn cr-btn-secondary text-lg px-8 py-4">
              Free Credit Analysis
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-cr-muted">
            <a href="tel:+15042985783" className="flex items-center gap-2 hover:text-cr-text">
              <Phone size={14} />
              (504) 298-5783
            </a>
            <a href="mailto:support@creditklimb.com" className="flex items-center gap-2 hover:text-cr-text">
              <Mail size={14} />
              support@creditklimb.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-cr-border">
        <div className="cr-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="text-cr-primary" size={24} />
              <span className="font-bold">CreditKlimb™</span>
            </div>
            <div className="flex gap-6 text-sm text-cr-muted">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/ask">Ask Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/leads">Leads</Link>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-6 pt-6 border-t border-cr-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-sm mb-0.5">Get credit tips & updates</div>
                <div className="text-xs text-cr-muted">No spam. Unsubscribe anytime.</div>
              </div>
              <NewsletterForm />
            </div>
          </div>

          <p className="text-center text-cr-muted text-sm mt-6">
            © {new Date().getFullYear()} CreditKlimb™. Educational purposes only. Not legal advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
