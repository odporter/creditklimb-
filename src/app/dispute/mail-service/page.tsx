'use client'

import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { CheckCircle, Clock, Shield, Phone, Mail, ArrowLeft, FileText, CreditCard } from 'lucide-react'

export default function MailServicePage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      {/* Hero */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-purple-900 text-white">
        <div className="cr-container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-sm font-medium mb-6">
            <CreditCard size={14} />
            Most Complete Package
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            We Handle Everything
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We print, sign, and mail all your dispute letters via certified mail. 
            You do nothing — we take care of it all.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="cr-container max-w-3xl">
          
          {/* What's Included */}
          <div className="cr-card mb-8">
            <h2 className="text-xl font-bold mb-6">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'All 3 major bureau letters printed & mailed',
                'All sub-bureau letters (LexisNexis, ChexSystems + more)',
                'Direct furnisher notices to banks & lenders',
                'Certified mail with return receipt',
                '30-day follow-up letters automatically mailed',
                '60-day escalation letters if no response',
                'Dedicated credit advisor (phone support)',
                'Personalized dispute strategy document',
                'Document checklist & instructions',
                'Money-back guarantee (90 days)',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="cr-card mb-8">
            <h2 className="text-xl font-bold mb-6">How It Works</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'You fill out a short form', desc: 'Tell us what items you want to dispute. Takes about 5 minutes.' },
                { step: '2', title: 'We generate & review your letters', desc: 'We create professional dispute letters and review them for accuracy.' },
                { step: '3', title: 'We print, sign & mail via certified mail', desc: 'We handle the mailing. You get tracking numbers for every letter.' },
                { step: '4', title: 'We follow up automatically', desc: 'At 30 days (and 60 days if needed), we mail follow-up letters.' },
                { step: '5', title: 'You get results', desc: 'Items get removed. You watch your credit improve.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-cr-primary/10 flex items-center justify-center text-cr-primary font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-cr-muted">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="cr-card mb-8">
            <h2 className="text-xl font-bold mb-4">What to Expect</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-cr-muted flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Week 1-2</div>
                  <div className="text-cr-muted text-sm">Letters arrive at bureaus. Investigation begins.</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-cr-muted flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Day 30</div>
                  <div className="text-cr-muted text-sm">Bureaus must respond. If no response, we send 30-day follow-up.</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-cr-muted flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Day 60</div>
                  <div className="text-cr-muted text-sm">We send escalation letters to non-responsive bureaus.</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Ongoing</div>
                  <div className="text-cr-muted text-sm">Items removed. Score improves. We'll notify you.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="cr-card bg-gradient-to-r from-purple-700 to-purple-900 text-white mb-8">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold mb-1">$49</div>
              <div className="opacity-80">One-time payment</div>
            </div>
            <div className="text-center text-sm opacity-90 mb-6">
              90-day money-back guarantee if you're not satisfied.
              <br />No hidden fees. No recurring charges.
            </div>
            <Link 
              href="/dispute/full" 
              className="block w-full text-center py-4 bg-white text-purple-700 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Get Started — $49
            </Link>
            <p className="text-center text-xs opacity-60 mt-3">
              You'll fill out the dispute form on the next page, then we'll handle everything.
            </p>
          </div>

          {/* Trust */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="cr-card text-center">
              <Shield className="mx-auto mb-2 text-cr-primary" size={24} />
              <div className="font-semibold text-sm">90-Day Guarantee</div>
              <div className="text-cr-muted text-xs">Full refund if not satisfied</div>
            </div>
            <div className="cr-card text-center">
              <FileText className="mx-auto mb-2 text-cr-primary" size={24} />
              <div className="font-semibold text-sm">Everything Included</div>
              <div className="text-cr-muted text-xs">No add-ons or upsells</div>
            </div>
            <div className="cr-card text-center">
              <Phone className="mx-auto mb-2 text-cr-primary" size={24} />
              <div className="font-semibold text-sm">Dedicated Advisor</div>
              <div className="text-cr-muted text-xs">Phone support included</div>
            </div>
          </div>

          {/* FAQ */}
          <div className="cr-card">
            <h2 className="text-xl font-bold mb-4">Common Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How is this different from the $29 Full Repair plan?',
                  a: 'Full Repair ($29) gives you all the letter templates — you print and mail them yourself. Mail Service ($49) means we do it for you: we print, sign, and mail everything via certified mail. We also handle the 30 and 60-day follow-up letters automatically.',
                },
                {
                  q: 'How do I know what to dispute?',
                  a: 'Before using any credit repair service, you should pull your free credit reports from AnnualCreditReport.com. Review them for errors, accounts that aren\'t yours, or items you don\'t recognize. Our form will guide you through selecting what to dispute.',
                },
                {
                  q: 'Is this legal?',
                  a: 'Yes. The Fair Credit Reporting Act (FCRA) gives you the legal right to dispute inaccurate information. We simply handle the administrative work of generating, printing, signing, and mailing the letters — all activities you could do yourself.',
                },
                {
                  q: 'What if nothing gets removed?',
                  a: 'We offer a 90-day money-back guarantee. If our service doesn\'t help you, you get a full refund. We can\'t guarantee specific results because that depends on the accuracy of your disputes — but we guarantee everything is filed properly and on time.',
                },
              ].map((faq, i) => (
                <div key={i} className="border-b border-cr-border last:border-0 pb-3 last:pb-0">
                  <div className="font-medium text-sm mb-1">{faq.q}</div>
                  <div className="text-cr-muted text-sm">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/dispute" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mt-8">
            <ArrowLeft size={16} />
            Back to Dispute Options
          </Link>
        </div>
      </section>
    </div>
  )
}
