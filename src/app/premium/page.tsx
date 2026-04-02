import Link from 'next/link'
import { Shield, CheckCircle, ArrowLeft, Clock, Users, Lock, Star, ArrowRight, FileText } from 'lucide-react'
import { Nav } from '@/components/Nav'

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to repair your credit yourself',
    features: [
      'Unlimited dispute letter templates',
      'Bureau dispute letters (Equifax, Experian, TransUnion)',
      'Sub-bureau coverage (LexisNexis, ChexSystems + more)',
      'Furnisher dispute notices',
      '60-day escalation letter templates',
      'Pay-for-delete negotiation templates',
      'Credit score calculator',
      'Debt payoff planner',
      'Score simulator',
      'Access to all learn articles',
    ],
    cta: 'Get Started Free',
    href: '/dispute',
    highlighted: false,
    note: 'The free plan is genuinely free. No hidden fees.',
  },
  {
    name: 'Full Repair',
    price: '$29',
    period: 'one-time',
    description: 'Professional review + priority processing for complex cases',
    features: [
      'Everything in Free',
      'Professional review of your dispute letters',
      'Priority processing',
      'Dedicated credit advisor (email support)',
      'Document checklist customized to your situation',
      '30-day follow-up guidance',
      'Furnisher escalation support',
      'Money-back guarantee (30 days)',
    ],
    cta: 'Get Full Repair',
    href: '/dispute/full',
    highlighted: true,
    note: 'One-time payment. Lifetime access to all future updates.',
  },
  {
    name: 'We Handle It',
    price: '$49',
    period: 'one-time',
    description: 'We print, sign, and mail everything via certified mail',
    features: [
      'Everything in Full Repair',
      'We print and mail all your letters',
      'Certified mail with tracking included',
      'We mail to all bureaus AND sub-bureaus',
      'We mail directly to furnishers',
      '30-day and 60-day follow-up letters mailed automatically',
      'Dedicated advisor (phone support)',
      '90-day money-back guarantee',
    ],
    cta: 'Get Mail Service',
    href: '/dispute/full',
    highlighted: false,
    note: 'You do nothing. We handle the mailing for you.',
  },
]

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />

      <div className="cr-container py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-8">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <Shield size={14} />
            No monthly fees. No hidden costs.
          </div>
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-cr-muted text-lg max-w-2xl mx-auto">
            Our free tools handle most credit repairs. Upgrade when you need extra support.
            Every plan includes a money-back guarantee.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`cr-card relative flex flex-col ${plan.highlighted ? 'border-cr-primary border-2' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cr-primary text-white text-sm font-bold rounded-full flex items-center gap-1">
                  <Star size={12} />
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-cr-muted text-sm">{plan.period === 'forever' ? '' : '/ ' + plan.period}</span>
                </div>
                <p className="text-cr-muted text-sm mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link
                  href={plan.href}
                  className={`cr-btn w-full ${plan.highlighted ? 'cr-btn-primary' : 'cr-btn-secondary'}`}
                >
                  {plan.cta}
                </Link>
                <p className="text-xs text-cr-muted text-center mt-2">{plan.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-cr-muted">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-green-500" />
            <span>256-bit SSL encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-green-500" />
            <span>10,000+ people helped</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-green-500" />
            <span>Cancel anytime</span>
          </div>
        </div>

        <p className="text-center text-sm text-cr-muted mb-12">
          Your data is private. We never sell or share your information.
        </p>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="cr-card cursor-pointer">
              <summary className="font-semibold">Is the free plan really free?</summary>
              <p className="mt-3 text-cr-muted">
                Yes, 100% free. You get unlimited access to all our dispute letter templates, bureau coverage,
                sub-bureau coverage, furnisher notices, escalation letters, and all our tools — forever.
                We make money from optional paid upgrades, not from trapping you.
              </p>
            </details>
            <details className="cr-card cursor-pointer">
              <summary className="font-semibold">What's included in Full Repair ($29)?</summary>
              <p className="mt-3 text-cr-muted">
                Full Repair includes everything in the free plan, plus: professional review of your dispute letters
                by our team, priority processing, email access to a dedicated credit advisor,
                a personalized document checklist, 30-day follow-up guidance, and furnisher escalation support.
                It's a one-time payment for lifetime access.
              </p>
            </details>
            <details className="cr-card cursor-pointer">
              <summary className="font-semibold">What's the difference with We Handle It ($49)?</summary>
              <p className="mt-3 text-cr-muted">
                With We Handle It, we do everything for you. We print your letters, sign them on your behalf,
                and mail them via certified mail to every bureau, sub-bureau, and furnisher.
                We also automatically send 30-day and 60-day follow-up letters.
                You literally do nothing except fill out the form.
              </p>
            </details>
            <details className="cr-card cursor-pointer">
              <summary className="font-semibold">Do you guarantee results?</summary>
              <p className="mt-3 text-cr-muted">
                We can't guarantee specific items will be removed — that's determined by the bureaus and furnishers.
                What we guarantee: we file everything properly, on time, with the correct legal language.
                If a paid plan doesn't help you, we offer a money-back guarantee: 30 days for Full Repair,
                90 days for We Handle It.
              </p>
            </details>
            <details className="cr-card cursor-pointer">
              <summary className="font-semibold">How does credit repair actually work?</summary>
              <p className="mt-3 text-cr-muted">
                Under the Fair Credit Reporting Act (FCRA), you have the right to dispute inaccurate information
                on your credit report. When you submit a dispute, the bureau has 30 days to investigate.
                If they can't verify the information, it must be removed. Accurate information that you
                don't recognize may indicate identity theft. We give you the templates and tools to
                exercise your legal rights — for free.
              </p>
            </details>
            <details className="cr-card cursor-pointer">
              <summary className="font-semibold">Is credit repair legal?</summary>
              <p className="mt-3 text-cr-muted">
                Yes. The Fair Credit Reporting Act of 1970 (and its amendments) guarantees every American
                the right to dispute inaccurate information on their credit report. Credit repair companies
                have been operating legally since the FCRA was passed. We simply help you use the tools
                the law already gives you.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
