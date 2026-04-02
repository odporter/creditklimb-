import { Nav } from '@/components/Nav'
import { FileText, ArrowRight, CheckCircle } from '@/components/Icons'
import Link from 'next/link'

export default function CreditDisputeLetterPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <FileText size={48} className="mx-auto mb-4 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Credit Dispute Letter — What It Is and How to Write One</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            A credit dispute letter is your first and most powerful tool for removing inaccurate items from your credit report.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="cr-container max-w-3xl">
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">What is a credit dispute letter?</h2>
            <p className="text-cr-muted mb-4">
              A credit dispute letter is a formal written challenge to a credit bureau (Equifax, Experian, or TransUnion) 
              requesting investigation and removal of inaccurate or unverifiable information on your credit report.
            </p>
            <p className="text-cr-muted">
              Under the <strong className="text-white">Fair Credit Reporting Act (FCRA)</strong>, bureaus must investigate 
              disputes within <strong className="text-white">30 days</strong> and correct or remove inaccurate items.
            </p>
          </div>
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">What makes a dispute letter effective?</h2>
            <ul className="space-y-2">
              {[
                'Identifies the specific account and item being disputed',
                'States the factual basis for the dispute (not yours, paid, settled, etc.)',
                'Requests formal investigation under FCRA Section 611',
                'Demands removal if the furnisher cannot verify the debt within 30 days',
                'Includes your full contact information and signature',
                'Sent via certified mail with return receipt',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-cr-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="cr-card bg-cr-surface">
            <h2 className="text-2xl font-bold mb-3">Stop writing letters from scratch</h2>
            <p className="text-cr-muted mb-4">
              Our free dispute letter generator creates professionally formatted, FCRA-compliant letters for 
              Equifax, Experian, TransUnion — and goes further with furnisher notices to put pressure on the source.
            </p>
            <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">
              Generate your letters free <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
