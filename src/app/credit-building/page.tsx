'use client'

import { Nav } from '@/components/Nav'
import Link from 'next/link'
import { TrendingUp, CheckCircle, ExternalLink, CreditCard, Home, Phone, BookOpen, Users, ArrowRight, Star } from 'lucide-react'

const RENT_REPORTING = [
  {
    name: 'RentReporters',
    url: 'https://www.rentreporters.com',
    description: 'Reports your rent payments to TransUnion. One year of on-time rent can add 50-100 points.',
    price: 'Free to $14.95/mo',
    reportsTo: ['TransUnion'],
  },
  {
    name: 'LevelCredit',
    url: 'https://www.levelcredit.com',
    description: 'Reports rent, utilities, and insurance payments to all three bureaus.',
    price: '$14.95/mo',
    reportsTo: ['Equifax', 'Experian', 'TransUnion'],
  },
  {
    name: 'PRBC (Pay Rent to Build Credit)',
    url: 'https://www.prbc.com',
    description: 'The original rent reporting service. Free option available.',
    price: 'Free to $9.95/mo',
    reportsTo: ['Equifax', 'Experian'],
  },
]

const CREDIT_BUILDER = [
  {
    name: 'Self Financial',
    url: 'https://www.self.inc',
    description: 'Credit-builder loan that reports to all three bureaus. You build credit while saving money.',
    price: 'From $25/mo',
    reportsTo: ['Equifax', 'Experian', 'TransUnion'],
    icon: BookOpen,
  },
  {
    name: 'Chime Credit Builder',
    url: 'https://www.chime.com/credit-builder',
    description: 'Secured credit card that reports to all three bureaus. No credit check to apply.',
    price: 'Free',
    reportsTo: ['Equifax', 'Experian', 'TransUnion'],
    icon: CreditCard,
  },
  {
    name: 'Current Bank',
    url: 'https://www.current.com',
    description: 'Credit-builder account that reports to all three bureaus. No minimum credit score needed.',
    price: 'Free',
    reportsTo: ['Equifax', 'Experian', 'TransUnion'],
    icon: CreditCard,
  },
  {
    name: 'Experian Boost',
    url: 'https://www.experian.com/boost',
    description: 'Connects your bank account to add utility and streaming payments to your Experian report. Free.',
    price: 'Free',
    reportsTo: ['Experian'],
    icon: Star,
  },
]

const TRADELINES = [
  {
    name: 'Authorized User Program',
    description: 'Get added as an authorized user on someone else\'s old, positive account. Their payment history transfers to your report.',
    benefit: 'Can add 20-50 points overnight',
    risk: 'Only works if the primary cardholder is reliable',
  },
  {
    name: 'Business Tradelines',
    description: 'Become an authorized user on established business accounts to build business credit.',
    benefit: 'Builds business credit separate from personal',
    risk: 'Requires business entity (LLC etc)',
  },
]

export default function CreditBuildingToolsPage() {
  const ARR_0 = [
              { tip: 'Keep utilization below 30%', detail: 'If your limit is $1,000, never charge more than $300. Under 10% is even better.' },
              { tip: 'Never miss a payment', detail: 'Set up autopay for at least the minimum. One late payment can drop your score 60-100 points.' },
              { tip: 'Don\'t close old cards', detail: 'Closing a card reduces your available credit AND your average account age. Keep them open.' },
              { tip: 'Be patient', detail: 'Credit building takes 3-6 months to see changes, 12-18 months for significant improvement. Don\'t check your score every day.' },
              { tip: 'Multiple bureau checking is free', detail: 'Check AnnualCreditReport.com for free reports from all three bureaus once per year.' },
            ];

return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      {/* Hero */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="cr-container text-center">
          <TrendingUp className="mx-auto mb-4" size={48} />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Build Credit That Climbs
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            These tools report to credit bureaus and help you build positive credit history. 
            Add points while you sleep.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-cr-surface border-b border-cr-border">
        <div className="cr-container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold mb-2">Report to Bureaus</h3>
              <p className="text-cr-muted text-sm">These services actually report your payments to the credit bureaus — that's what builds your score.</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold mb-2">Watch Your Score Climb</h3>
              <p className="text-cr-muted text-sm">Consistent on-time payments show up on your report. Over time, your score goes up.</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Star className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold mb-2">Access Better Options</h3>
              <p className="text-cr-muted text-sm">Higher score = better credit cards, lower interest rates, more financial opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rent Reporting */}
      <section className="py-16">
        <div className="cr-container">
          <div className="flex items-center gap-3 mb-8">
            <Home className="text-green-600" size={28} />
            <h2 className="text-2xl font-bold">Rent Reporting Services</h2>
          </div>
          <p className="text-cr-muted mb-8 max-w-2xl">
            Your rent payments don't automatically count toward your credit. These services report them for you — 
            and one year of on-time rent can add 50-100 points if you have a thin file.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {RENT_REPORTING.map((service, i) => (
              <div key={i} className="cr-card">
                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                <p className="text-cr-muted text-sm mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.reportsTo.map((bureau) => (
                    <span key={bureau} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      {bureau}
                    </span>
                  ))}
                </div>
                <div className="text-sm font-medium text-green-600 mb-4">{service.price}</div>
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-cr-primary hover:underline"
                >
                  Visit <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Builder */}
      <section className="py-16 bg-cr-surface">
        <div className="cr-container">
          <div className="flex items-center gap-3 mb-8">
            <CreditCard className="text-green-600" size={28} />
            <h2 className="text-2xl font-bold">Credit Builder Cards & Loans</h2>
          </div>
          <p className="text-cr-muted mb-8 max-w-2xl">
            These are designed for people building or rebuilding credit. They report to all three bureaus 
            and don't require good credit to qualify.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CREDIT_BUILDER.map((service, i) => (
              <div key={i} className="cr-card">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  {service.icon && <service.icon className="text-green-600" size={20} />}
                </div>
                <h3 className="font-bold mb-2">{service.name}</h3>
                <p className="text-cr-muted text-sm mb-4">{service.description}</p>
                <div className="text-sm font-medium text-green-600 mb-4">{service.price}</div>
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-cr-primary hover:underline"
                >
                  Visit <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tradelines */}
      <section className="py-16">
        <div className="cr-container">
          <div className="flex items-center gap-3 mb-8">
            <Users className="text-green-600" size={28} />
            <h2 className="text-2xl font-bold">Tradeline Programs</h2>
          </div>
          <p className="text-cr-muted mb-8 max-w-2xl">
            Tradelines are additional credit accounts added to your report. They can boost your score quickly 
            by leveraging someone else's long, positive credit history.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {TRADELINES.map((item, i) => (
              <div key={i} className="cr-card">
                <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                <p className="text-cr-muted text-sm mb-4">{item.description}</p>
                <div className="p-3 bg-green-50 rounded-lg mb-3">
                  <div className="text-sm font-medium text-green-700">
                    <TrendingUp size={14} className="inline mr-1" />
                    {item.benefit}
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-sm text-yellow-700">
                    <strong>Note:</strong> {item.risk}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 bg-cr-surface">
        <div className="cr-container max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">The Rules That Actually Work</h2>
          <div className="space-y-4">
            {ARR_0.map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-cr-bg rounded-lg border border-cr-border">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-semibold">{item.tip}</div>
                  <div className="text-cr-muted text-sm">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="cr-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Climbing?</h2>
          <p className="text-xl opacity-90 mb-8">
            Use our free dispute letters to remove negatives, then these tools to build positives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dispute" className="px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Remove Negative Items — Free
            </Link>
            <Link href="/net30-finder" className="px-8 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-colors">
              Build Business Credit →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-cr-border">
        <div className="cr-container text-center text-cr-muted text-sm">
          <p>CreditKlimb™ — Tools that help your credit actually climb</p>
        </div>
      </footer>
    </div>
  )
}
