import Link from 'next/link'
import { CheckCircle, Zap, Clock, Shield, Users, Phone, Mail, ArrowLeft } from 'lucide-react'
import { Nav } from '@/components/Nav'

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to repair your credit',
    features: [
      'Unlimited dispute letters',
      'Credit score calculator',
      'Debt payoff planner',
      'Template library',
      'Self-guided process',
    ],
    cta: 'Get Started Free',
    href: '/dispute',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$29',
    period: 'one-time',
    description: 'Professional support for complex cases',
    features: [
      'Everything in Free',
      'Professional letter review',
      'Priority mail processing',
      'Dedicated credit advisor',
      'Document checklist',
      '30-day follow-up',
      'Money-back guarantee',
    ],
    cta: 'Get Premium',
    href: '/premium',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'one-time',
    description: 'Full-service credit repair',
    features: [
      'Everything in Premium',
      'We file everything for you',
      'Direct bureau communication',
      '3-bureau disputes included',
      'Identity theft assistance',
      'Ongoing credit monitoring',
      '90-day guarantee',
    ],
    cta: 'Contact Us',
    href: '/contact',
    highlighted: false,
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
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-cr-muted text-lg max-w-2xl mx-auto">
            Our free tools handle 90% of credit repairs. Premium is for those who want extra help.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`cr-card relative ${plan.highlighted ? 'border-cr-primary border-2' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cr-primary text-white text-sm font-bold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-cr-muted">/{plan.period}</span>
                </div>
                <p className="text-cr-muted text-sm mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-green-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`cr-btn w-full ${plan.highlighted ? 'cr-btn-primary' : 'cr-btn-secondary'}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="cr-card">
              <summary className="font-semibold cursor-pointer">Is the free plan really free?</summary>
              <p className="mt-3 text-cr-muted">
                Yes, 100% free. We offer premium services for those who need extra help, but our free tools 
                include everything you need to repair your credit yourself.
              </p>
            </details>
            <details className="cr-card">
              <summary className="font-semibold cursor-pointer">What's included in Premium?</summary>
              <p className="mt-3 text-cr-muted">
                Premium includes professional review of your dispute letters, priority processing, 
                a dedicated credit advisor to answer questions, and a document checklist to ensure 
                you have everything you need.
              </p>
            </details>
            <details className="cr-card">
              <summary className="font-semibold cursor-pointer">Do you guarantee results?</summary>
              <p className="mt-3 text-cr-muted">
                We can't guarantee specific results (no legitimate service can), but we guarantee our 
                tools work. If Premium doesn't help you, we offer a money-back guarantee within 30 days.
              </p>
            </details>
            <details className="cr-card">
              <summary className="font-semibold cursor-pointer">How does Enterprise work?</summary>
              <p className="mt-3 text-cr-muted">
                Enterprise is full-service credit repair. We handle everything: pulling your reports, 
                identifying errors, writing and sending disputes, and following up with bureaus. 
                You just provide information and we do the rest.
              </p>
            </details>
          </div>
        </div>

        {/* Trust */}
        <div className="mt-12 text-center">
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-cr-muted">
              <Shield size={20} className="text-green-500" />
              <span>256-bit encryption</span>
            </div>
            <div className="flex items-center gap-2 text-cr-muted">
              <Clock size={20} className="text-green-500" />
              <span>24/7 access</span>
            </div>
            <div className="flex items-center gap-2 text-cr-muted">
              <Users size={20} className="text-green-500" />
              <span>10,000+ users</span>
            </div>
          </div>
          <p className="text-sm text-cr-muted">
            Your data is processed locally and never stored on our servers.
          </p>
        </div>
      </div>
    </div>
  )
}