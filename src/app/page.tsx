import Link from 'next/link'
import { Shield, FileText, Calculator, TrendingUp, CreditCard, Users, CheckCircle, ArrowRight, Zap, Clock, DollarSign, Briefcase } from 'lucide-react'
import { Nav } from '@/components/Nav'

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
  { value: '100%', label: 'Free to Start' },
  { value: '50+', label: 'Dispute Templates' },
  { value: '3 Min', label: 'Average Setup' },
  { value: '24/7', label: 'Access' },
]

const BUREAUS = [
  { name: 'Equifax', letters: '3 bureaus' },
  { name: 'Experian', letters: '3 bureaus' },
  { name: 'TransUnion', letters: '3 bureaus' },
  { name: 'LexisNexis', letters: 'Premium' },
  { name: 'ChexSystems', letters: 'Premium' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      {/* Lead Magnet Banner */}
      <section className="py-8 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-sm font-medium opacity-80 mb-1">Free Credit Analysis</div>
              <h3 className="text-xl md:text-2xl font-bold">Not sure where to start?</h3>
              <p className="text-sm opacity-80 mt-1">Answer 3 questions and get a personalized action plan. No email required to start.</p>
            </div>
            <Link 
              href="/leads" 
              className="px-6 py-3 bg-white text-cr-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Get My Free Analysis →
            </Link>
          </div>
        </div>
      </section>

      {/* Annual Credit Report Banner */}
      <section className="py-6 bg-yellow-50 border-b border-yellow-200">
        <div className="cr-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-sm font-medium text-yellow-800 mb-1">Start here first</div>
              <h3 className="text-lg font-bold text-yellow-900">Get your free credit reports</h3>
              <p className="text-sm text-yellow-700">You can get free reports from all 3 bureaus once per year at AnnualCreditReport.com</p>
            </div>
            <a 
              href="https://www.annualcreditreport.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-yellow-500 text-yellow-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              Get Free Reports →
            </a>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="cr-container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
            <Zap size={16} />
            100% Free Credit Repair Tools
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Don't Just Check Your Credit.
            <br />
            <span className="text-cr-primary">Climb It.</span>
          </h1>
          <p className="text-xl text-cr-muted mb-8 max-w-2xl mx-auto">
            CreditKlimb helps you actually improve your credit — for free. Dispute letters, Net30 vendors, business credit building.
            Everything you need to climb to better credit.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dispute" className="cr-btn cr-btn-primary text-lg">
              Start Free Dispute
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link href="/tools" className="cr-btn cr-btn-secondary text-lg">
              Explore Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Bureaus Covered */}
      <section className="py-16 bg-cr-surface">
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
          <p className="text-center mt-6 text-cr-muted">
            Premium includes outreach to all bureaus + follow-up
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16">
        <div className="cr-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATISTICS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cr-primary mb-2">{stat.value}</div>
                <div className="text-cr-muted">{stat.label}</div>
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
              <div key={i} className="cr-card hover:border-cr-primary transition-colors">
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
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cr-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Get Your Reports</h3>
              <p className="text-cr-muted text-sm">
                Download your free credit reports from all three bureaus. We'll show you how.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cr-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Generate Disputes</h3>
              <p className="text-cr-muted text-sm">
                Use our free tools to create professional dispute letters for any error.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cr-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-cr-muted text-sm">
                Monitor your disputes, see results, and watch your score improve.
              </p>
            </div>
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
                href={`/dispute?type=${type.toLowerCase().replace(' ', '-')}`}
                className="cr-card text-center hover:border-cr-primary transition-colors"
              >
                <FileText className="mx-auto mb-2 text-cr-primary" size={24} />
                <span className="font-medium">{type}</span>
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
              <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
              <p className="mb-6 opacity-90">
                Our free tools handle 90% of credit repairs. For complex cases, our Premium service
                includes professional review, priority processing, and expert guidance.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} />
                  Professional dispute review
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} />
                  Priority mail processing
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} />
                  Dedicated credit advisor
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} />
                  Money-back guarantee
                </li>
              </ul>
              <Link href="/premium" className="cr-btn bg-white text-cr-primary hover:bg-gray-100">
                View Premium Plans
              </Link>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">$29</div>
              <div className="opacity-80">One-time setup fee</div>
              <div className="mt-4 text-sm opacity-70">
                Only if you need extra help
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
              <Users className="mx-auto mb-4 text-cr-primary" size={32} />
              <h3 className="font-semibold mb-2">Private & Secure</h3>
              <p className="text-cr-muted text-sm">
                Your data stays on your device. We don't store sensitive info.
              </p>
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
          <Link href="/dispute" className="cr-btn cr-btn-primary text-lg">
            Get Started Free
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Business Credit Section */}
      <section className="py-16" style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'}}>
        <div className="cr-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-sm" style={{backgroundColor: '#1e3a5f', color: '#60a5fa'}}>
                <Briefcase size={14} />
                Also Available
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">Build Business Credit</h2>
              <p className="mb-6" style={{color: '#94a3b8'}}>
                Separate your business finances from personal. Access credit cards, loans, and lines of credit up to $5 million — without affecting your personal credit score.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'D-U-N-S number setup',
                  'Business tradeline building',
                  'FICO SBSS score improvement',
                  'Vendor & supplier credit',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3" style={{color: '#e2e8f0'}}>
                    <CheckCircle size={18} className="text-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/business-credit" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all" style={{backgroundColor: '#3b82f6'}}>
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
            <div className="p-8 rounded-2xl text-center" style={{backgroundColor: '#1e293b', border: '1px solid #334155'}}>
              <TrendingUp className="mx-auto mb-4 text-blue-400" size={48} />
              <div className="text-5xl font-bold text-white mb-2">$5M+</div>
              <div style={{color: '#94a3b8'}}>Max business credit available</div>
              <div className="mt-6 pt-6" style={{borderTop: '1px solid #334155'}}>
                <div className="text-sm" style={{color: '#64748b'}}>Different from personal credit</div>
                <div className="text-sm" style={{color: '#64748b'}}>D-U-N-S • PAYDEX • FICO SBSS</div>
              </div>
            </div>
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
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <p className="text-center text-cr-muted text-sm mt-8">
            © {new Date().getFullYear()} CreditKlimb™. Educational purposes only. Not legal advice.
          </p>
        </div>
      </footer>
    </div>
  )
}