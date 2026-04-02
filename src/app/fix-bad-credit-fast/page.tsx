import { Nav } from '@/components/Nav'
import { FileText, ArrowRight, CheckCircle, Shield } from '@/components/Icons'
import Link from 'next/link'

export default function FixBadCreditFastPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How to Fix Bad Credit Fast</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            The truth about credit repair — and the fastest way to get real results.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="cr-container max-w-3xl">
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">The fastest way to fix bad credit</h2>
            <p className="text-cr-muted mb-4">
              Most "credit repair" companies charge $100+/month and do the same thing you can do yourself: 
              write dispute letters. Here's how to do it right — in under an hour.
            </p>
            <ol className="space-y-4">
              {[
                'Get your free credit reports from all 3 bureaus at AnnualCreditReport.com',
                'Circle every item you didn\'t authorize or that\'s inaccurate',
                'Write formal dispute letters to each bureau listing each error',
                'Send via certified mail with return receipt requested',
                'Wait 30 days — bureaus are legally required to investigate',
                'If items aren\'t removed, send escalation letters to the furnisher',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-7 h-7 bg-cr-primary/20 rounded-full flex items-center justify-center flex-shrink-0 text-cr-primary font-bold text-sm">{i + 1}</span>
                  <span className="text-cr-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="cr-card">
            <h2 className="text-2xl font-bold mb-4">What actually works</h2>
            <ul className="space-y-2 mb-6">
              {[
                'Bureau disputes — challenge inaccurate items directly with Equifax, Experian, TransUnion',
                'Furnisher notices — contact the lender directly; they have 30 days to respond under FCRA',
                'Pay-for-delete negotiations — some collectors will remove items in exchange for payment',
                ' goodwill letters — goodwill adjustments can remove late payments from creditors you have a history with',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-cr-muted">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">
              Generate your dispute letters now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
