import { Nav } from '@/components/Nav'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertCircle, Clock, FileText } from 'lucide-react'

export default function LatePaymentsPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <div className="cr-container py-8 max-w-4xl">
        <Link href="/learn" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
          <ArrowLeft size={16} /> Back to Learn
        </Link>

        <div className="cr-card mb-8">
          <h1 className="text-3xl font-bold mb-4">Late Payments & How to Remove Them</h1>
          <div className="flex items-center gap-4 text-sm text-cr-muted mb-6">
            <span className="flex items-center gap-1"><Clock size={14} /> 8 min read</span>
            <span className="flex items-center gap-1"><AlertCircle size={14} /> Advanced</span>
          </div>
          
          <div className="prose max-w-none space-y-6 text-cr-muted">
            <p className="text-lg">Late payments are one of the most damaging items on your credit report. A single 30-day late can drop your score 60-110 points. Here's how they work and what you can do about them.</p>
            
            <h2 className="text-xl font-bold text-cr-text">How Lates Are Reported</h2>
            <p>A late payment is typically reported when you're 30 days past the due date. Creditors don't report lates to the bureaus at exactly 30 days — some report at 30, some at 60, some at 90. Here's what each tier does:</p>
            
            <div className="grid gap-3">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-bold text-green-800">30 Days Late</div>
                <div className="text-sm text-green-700">Usually the first reported tier. Can drop score 60-80 points if you have good credit. Stays on report 7 years.</div>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="font-bold text-yellow-800">60 Days Late</div>
                <div className="text-sm text-yellow-700">More serious. Additional 20-30 point drop. More damaging to lower scores.</div>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="font-bold text-orange-800">90 Days Late</div>
                <div className="text-sm text-orange-700">Major red flag to lenders. Additional 20-30 point drop. Account may be charged off.</div>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="font-bold text-red-800">120+ Days / Charge-Off</div>
                <div className="text-sm text-red-700">Extremely damaging. Lender has given up on collecting and written it off. Stays 7 years from date of first delinquency.</div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-cr-text">Why a Single Late Hurts So Much</h2>
            <p>Payment history makes up 35% of your FICO score — the single biggest factor. Here's why a 30-day late is worse than people think:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> It can drop your score 60-110 points depending on your starting score</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Recent lates hurt more than old lates — last 12 months matter most</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> It affects all three bureaus even if only one shows it</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> It can trigger higher interest rates on existing cards</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> It stays on your report for 7 years from the date of first delinquency</li>
            </ul>

            <h2 className="text-xl font-bold text-cr-text">Can You Get a Late Payment Removed?</h2>
            <p>Yes — but it depends on the circumstances. Here are your options:</p>

            <div className="space-y-4">
              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <h3 className="font-bold text-cr-text mb-2">Goodwill Removal</h3>
                <p className="text-sm mb-2">If you have a long history of on-time payments and the late was an isolated incident, write a goodwill letter to the creditor asking them to remove it as a courtesy.</p>
                <div className="text-sm"><strong>Best for:</strong> One-time lates from job loss, illness, or temporary hardship. First-time offenders with otherwise perfect payment history.</div>
              </div>

              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <h3 className="font-bold text-cr-text mb-2">Dispute as Inaccurate</h3>
                <p className="text-sm mb-2">If the late was reported incorrectly — wrong date, wrong amount, or you actually paid on time — dispute it with the bureau and directly with the furnisher.</p>
                <div className="text-sm"><strong>Best for:</strong> Clerical errors, reporting mistakes, or if you have documentation proving you paid on time.</div>
              </div>

              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <h3 className="font-bold text-cr-text mb-2">Pay for Delete (Collections Only)</h3>
                <p className="text-sm mb-2">If the late has been sold to collections, negotiate to pay the debt in exchange for removal of the late payment and collection from your report.</p>
                <div className="text-sm"><strong>Best for:</strong> Older lates that have been charged off and sold to collection agencies.</div>
              </div>

              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <h3 className="font-bold text-cr-text mb-2">Secondary Offering / Authorized User</h3>
                <p className="text-sm mb-2">Add the account as an authorized user on a family member's old, positive account. The positive payment history can offset the late in the eyes of lenders.</p>
                <div className="text-sm"><strong>Best for:</strong> People who can't get the late removed and need a faster score boost.</div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-cr-text">How to Write a Goodwill Letter</h2>
            <p>A goodwill letter should be personal, humble, and brief. Include:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Your account number (masked)</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Acknowledge the late payment was your fault</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Explain the circumstances briefly (one sentence)</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Emphasize your long history of on-time payments</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Ask specifically for removal, not correction</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Send certified mail with return receipt</li>
            </ul>

            <h2 className="text-xl font-bold text-cr-text">The 7-Year Rule</h2>
            <p>Late payments must be removed from your credit report after <strong>7 years from the date of first delinquency</strong>. If a late payment is older than 7 years and still on your report, dispute it and it should be removed.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/dispute" className="cr-btn cr-btn-primary flex-1 text-center">Generate Dispute Letter</Link>
          <Link href="/learn" className="cr-btn cr-btn-secondary flex-1 text-center">More Lessons</Link>
        </div>
      </div>
    </div>
  )
}
