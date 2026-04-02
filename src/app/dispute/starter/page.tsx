import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { CheckCircle, ArrowLeft, FileText, Shield } from 'lucide-react'

export default function StarterDisputePage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-sm font-medium mb-6">
            <FileText size={14} />
            Try It Out — $1 Only
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            One Bureau. One Letter.
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Get your first professional dispute letter for just $1. 
            See exactly what the full system generates before committing.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="cr-container max-w-2xl">
          
          <div className="cr-card mb-8">
            <h2 className="text-xl font-bold mb-4">What's Included</h2>
            <ul className="space-y-3">
              {[
                '1 dispute letter (your choice of Equifax, Experian, or TransUnion)',
                'Professional formatting and FCRA-compliant language',
                'Step-by-step mailing instructions',
                'Certified mail guidance',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cr-card mb-8">
            <h2 className="text-xl font-bold mb-4">Choose Your Bureau</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { name: 'Equifax', address: 'P.O. Box 740256, Atlanta, GA 30374' },
                { name: 'Experian', address: 'P.O. Box 4500, Allen, TX 75013' },
                { name: 'TransUnion', address: 'P.O. Box 2000, Chester, PA 19016' },
              ].map((bureau) => (
                <div key={bureau.name} className="p-4 rounded-lg border-2 border-cr-border hover:border-cr-primary/50 transition-colors cursor-pointer">
                  <div className="font-semibold mb-1">{bureau.name}</div>
                  <div className="text-xs text-cr-muted">{bureau.address}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-cr-muted mt-3">
              Not sure which bureau? Check your credit report — the error appears on one or more of these.
            </p>
          </div>

          {/* Pricing */}
          <div className="cr-card bg-cr-surface mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-cr-muted text-sm">Starter Plan</div>
                <div className="text-4xl font-bold">$1</div>
              </div>
              <Link 
                href="/dispute/full" 
                className="cr-btn cr-btn-primary text-center text-sm px-4 py-2"
              >
                Get Started
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-cr-border">
              <p className="text-cr-muted text-sm">
                Want all 3 bureaus, sub-bureaus, furnisher notices, and escalation letters?{' '}
                <Link href="/dispute/full" className="text-cr-primary underline font-medium">
                  Upgrade to Full Repair — $29
                </Link>
              </p>
            </div>
          </div>

          {/* Trust */}
          <div className="flex items-center gap-3 text-sm text-cr-muted mb-8">
            <Shield size={16} className="text-green-500" />
            <span>30-day money-back guarantee on paid plans</span>
          </div>

          <Link href="/dispute" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text">
            <ArrowLeft size={16} />
            Back to Dispute Options
          </Link>
        </div>
      </section>
    </div>
  )
}
