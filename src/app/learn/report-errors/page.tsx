import { Nav } from '@/components/Nav'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertTriangle, FileText, Clock, Shield } from 'lucide-react'

export default function ReportErrorsPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <div className="cr-container py-8 max-w-4xl">
        <Link href="/learn" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
          <ArrowLeft size={16} /> Back to Learn
        </Link>

        <div className="cr-card mb-8">
          <h1 className="text-3xl font-bold mb-4">Common Credit Report Errors</h1>
          <div className="flex items-center gap-4 text-sm text-cr-muted mb-6">
            <span className="flex items-center gap-1"><Clock size={14} /> 6 min read</span>
            <span className="flex items-center gap-1"><AlertTriangle size={14} /> Intermediate</span>
          </div>
          
          <div className="prose max-w-none space-y-6 text-cr-muted">
            <p className="text-lg">Studies show that up to 1 in 5 credit reports contains errors. These errors can cost you thousands of dollars in higher interest rates — or flat-out denials. Here's what to look for.</p>
            
            <h2 className="text-xl font-bold text-cr-text">Most Common Errors</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <h3 className="font-bold text-cr-text mb-2">Wrong Personal Information</h3>
                <p className="text-sm mb-2">Incorrect names, addresses, phone numbers, or employers. While these don't directly affect your score, they can mix your file with someone else's.</p>
                <div className="text-sm"><strong>Fix:</strong> Dispute with the bureau to correct the information.</div>
              </div>

              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <h3 className="font-bold text-cr-text mb-2">Accounts That Aren't Yours</h3>
                <p className="text-sm mb-2">Someone else's credit card, loan, or account appearing on your report. Could be identity theft or a clerical error.</p>
                <div className="text-sm"><strong>Fix:</strong> Dispute as "not my account" and consider filing an identity theft report.</div>
              </div>

              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <h3 className="font-bold text-cr-text mb-2">Duplicate Listings</h3>
                <p className="text-sm mb-2">The same debt or account listed multiple times. This can make it look like you owe more than you do.</p>
                <div className="text-sm"><strong>Fix:</strong> Dispute and ask the bureau to consolidate or remove duplicates.</div>
              </div>

              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <h3 className="font-bold text-cr-text mb-2">Wrong Balance or Credit Limit</h3>
                <p className="text-sm mb-2">An account showing the wrong amount owed or incorrect credit limit. Affects your utilization ratio calculation.</p>
                <div className="text-sm"><strong>Fix:</strong> Get your statement and dispute with current correct information.</div>
              </div>

              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <h3 className="font-bold text-cr-text mb-2">Payments Shown as Late When You Paid</h3>
                <p className="text-sm mb-2">On-time payments incorrectly marked as late. Often happens with consolidation loans or servicemember errors.</p>
                <div className="text-sm"><strong>Fix:</strong> Submit proof of payment (bank statements, canceled checks) with your dispute.</div>
              </div>

              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <h3 className="font-bold text-cr-text mb-2">Old Debts Showing as New</h3>
                <p className="text-sm mb-2">A debt that's been paid or settled is still showing with the original delinquency date — restarting the 7-year clock.</p>
                <div className="text-sm"><strong>Fix:</strong> Dispute and provide documentation that the debt was previously resolved.</div>
              </div>

              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <h3 className="font-bold text-cr-text mb-2">Accounts Still Open That Are Closed</h3>
                <p className="text-sm mb-2">Closed accounts showing as open, or open accounts showing as closed. Affects credit age calculations.</p>
                <div className="text-sm"><strong>Fix:</strong> Dispute with documentation from the creditor showing the correct status.</div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-cr-text">How to Dispute</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li>Get your reports from <a href="https://www.annualcreditreport.com" target="_blank" rel="noopener noreferrer" className="text-cr-primary underline">AnnualCreditReport.com</a></li>
              <li>Circle every error you find</li>
              <li>Write a dispute letter explaining each error</li>
              <li>Include copies of supporting documents (never originals)</li>
              <li>Mail certified with return receipt</li>
              <li>Wait 30 days — the bureau must respond by law</li>
            </ol>

            <h2 className="text-xl font-bold text-cr-text">The Furnisher Rule</h2>
            <p>If the bureau says the information is "accurate," don't stop there. <strong>Also dispute directly with the furnisher</strong> (the bank or lender). Furnishers have 30 days to respond, and if they don't, the bureau must remove the item.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/dispute" className="cr-btn cr-btn-primary flex-1 text-center">Generate Dispute Letters</Link>
          <Link href="/learn" className="cr-btn cr-btn-secondary flex-1 text-center">More Lessons</Link>
        </div>
      </div>
    </div>
  )
}
