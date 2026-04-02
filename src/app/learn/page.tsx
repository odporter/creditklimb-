'use client'

import { Nav } from '@/components/Nav'
import Link from 'next/link'
import { BookOpen, CreditCard, FileText, TrendingUp, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'

const LESSONS = [
  {
    icon: CreditCard,
    title: 'Understanding Credit Scores',
    description: 'Learn how FICO scores are calculated — payment history, utilization, age, inquiries, and mix.',
    level: 'Beginner',
    duration: '5 min read',
    href: '/learn/credit-scores',
  },
  {
    icon: FileText,
    title: 'How Credit Reports Work',
    description: 'What\'s on your report, how to read it, and why all three bureaus might have different info.',
    level: 'Beginner',
    duration: '7 min read',
    href: '/learn/credit-reports',
  },
  {
    icon: AlertTriangle,
    title: 'Common Credit Report Errors',
    description: 'The most frequent mistakes bureaus and lenders make — and how to dispute them.',
    level: 'Intermediate',
    duration: '6 min read',
    href: '/learn/report-errors',
  },
  {
    icon: CheckCircle,
    title: 'Late Payments & How to Remove Them',
    description: 'Why late payments hurt so much, and the exact process to get them removed.',
    level: 'Advanced',
    duration: '8 min read',
    href: '/learn/late-payments',
  },
  {
    icon: TrendingUp,
    title: 'Building Credit From Scratch',
    description: 'Secured cards, authorized users, credit-builder loans — what actually works.',
    level: 'Beginner',
    duration: '6 min read',
    href: '/learn/building-credit',
  },
  {
    icon: FileText,
    title: 'Collections & Charge-Offs',
    description: 'How collections work, your rights under the FCRA, and how to dispute or negotiate.',
    level: 'Intermediate',
    duration: '7 min read',
    href: '/learn/collections',
  },
]

export default function LearnPage() {
  const ARR_0 = [
              { tip: 'Keep utilization below 30%', detail: 'ideally under 10%' },
              { tip: 'Never close old cards', detail: 'it hurts your credit age' },
              { tip: 'Dispute in writing', detail: 'keep copies of everything' },
              { tip: 'Check reports yearly', detail: 'annualcreditreport.com is free' },
            ];

return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      {/* Hero */}
      <section className="py-12 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <BookOpen className="mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">Credit Education</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Learn how credit actually works. No jargon, no fluff — just the stuff that matters.
          </p>
        </div>
      </section>

      {/* Lessons */}
      <section className="py-16">
        <div className="cr-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LESSONS.map((lesson, i) => (
              <Link key={i} href={lesson.href} className="cr-card hover:border-cr-primary transition-colors cursor-pointer group block">
                <div className="w-12 h-12 rounded-lg tint-primary-10 flex items-center justify-center mb-4">
                  <lesson.icon className="text-cr-primary" size={24} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    lesson.level === 'Beginner' ? 'level-beginner' :
                    lesson.level === 'Intermediate' ? 'level-intermediate' :
                    'level-advanced'
                  }`}>
                    {lesson.level}
                  </span>
                  <span className="text-xs text-cr-muted">{lesson.duration}</span>
                </div>
                <h3 className="font-semibold mb-2">{lesson.title}</h3>
                <p className="text-cr-muted text-sm mb-4">{lesson.description}</p>
                <span className="text-cr-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 bg-cr-surface">
        <div className="cr-container">
          <h2 className="text-2xl font-bold text-center mb-8">Quick Credit Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {ARR_0.map((item, i) => (
              <div key={i} className="cr-card text-center">
                <CheckCircle className="mx-auto mb-2 text-cr-success" size={24} />
                <p className="font-medium text-sm text-cr-text">{item.tip}</p>
                <p className="text-cr-muted text-xs mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="cr-container text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Take Action?</h2>
          <p className="text-cr-muted mb-6">Use our free tools to start fixing your credit today.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/dispute" className="cr-btn cr-btn-primary">Generate Dispute Letters</Link>
            <Link href="/leads" className="cr-btn cr-btn-secondary">Get Free Analysis</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
