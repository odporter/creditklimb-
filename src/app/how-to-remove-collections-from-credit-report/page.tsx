import { Nav } from '@/components/Nav'
import { FileText, ArrowRight, CheckCircle } from '@/components/Icons'
import Link from 'next/link'

export default function RemoveCollectionsPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How to Remove Collections From Your Credit Report</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Collections accounts drop your score significantly. Here's how to challenge and remove them.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="cr-container max-w-3xl">
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">Can you remove collections?</h2>
            <p className="text-cr-muted mb-4">
              Yes — if any of these apply: the collection isn't yours, the amount is wrong, 
              the original debt is beyond the statute of limitations, or the collector cannot verify the debt.
            </p>
            <p className="text-cr-muted mb-4">
              <strong className="text-white">Important:</strong> Even paid collections should be removed. 
              A "paid" collection still damages your score.
            </p>
          </div>
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">Step 1: Send a debt validation letter</h2>
            <p className="text-cr-muted mb-4">
              Within 30 days of first contact, send a debt validation letter demanding proof 
              the debt is yours and the amount is accurate. Collectors must stop collection efforts until they provide verification.
            </p>
          </div>
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">Step 2: Send a bureau dispute</h2>
            <p className="text-cr-muted mb-4">
              Dispute with all 3 bureaus. If the collector can't verify the debt within 30 days, 
              the bureau must remove it by law.
            </p>
          </div>
          <div className="cr-card mb-8">
            <h2 className="text-2xl font-bold mb-4">Step 3: Try pay-for-delete</h2>
            <p className="text-cr-muted mb-4">
              Negotiate directly with the collector: "I'll pay if you remove from all 3 bureaus." 
              Get agreements in writing before paying anything.
            </p>
          </div>
          <div className="cr-card">
            <h2 className="text-2xl font-bold mb-3">Get pre-written dispute letters free</h2>
            <p className="text-cr-muted mb-4">
              We generate debt validation letters, bureau disputes, and pay-for-delete letters — 
              formatted correctly and ready to send.
            </p>
            <Link href="/dispute" className="cr-btn cr-btn-primary inline-flex items-center gap-2">
              Generate letters free <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
