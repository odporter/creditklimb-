import { Nav } from '@/components/Nav'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, FileText, Clock, AlertCircle } from 'lucide-react'

export default function CreditReportsPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <div className="cr-container py-8 max-w-4xl">
        <Link href="/learn" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
          <ArrowLeft size={16} /> Back to Learn
        </Link>

        <div className="cr-card mb-8">
          <h1 className="text-3xl font-bold mb-4">How Credit Reports Work</h1>
          <div className="flex items-center gap-4 text-sm text-cr-muted mb-6">
            <span className="flex items-center gap-1"><Clock size={14} /> 7 min read</span>
            <span className="flex items-center gap-1"><AlertCircle size={14} /> Beginner</span>
          </div>
          
          <div className="prose max-w-none space-y-6 text-cr-muted">
            <p className="text-lg">Your credit report is a detailed record of your credit history. It's what lenders, landlords, and even employers look at when they want to know how trustworthy you are.</p>
            
            <h2 className="text-xl font-bold text-cr-text">What's On Your Report</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> <strong>Personal Information</strong> — Name, address, Social Security number, employers</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> <strong>Credit Accounts</strong> — Credit cards, loans, mortgages — open and closed</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> <strong>Payment History</strong> — Whether you pay on time, every month</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> <strong>Credit Inquiries</strong> — Who has looked at your report</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> <strong>Public Records</strong> — Bankruptcies, liens, judgments</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> <strong>Collections</strong> — Debts that have been sold to collection agencies</li>
            </ul>

            <h2 className="text-xl font-bold text-cr-text">The Three Bureaus Are Different</h2>
            <p>There isn't just one credit report — there are three major credit bureaus: <strong>Equifax</strong>, <strong>Experian</strong>, and <strong>TransUnion</strong>. Each collects information independently, so your reports can be different at each one.</p>
            <p>This is important because a lender might check only one bureau. A negative item could appear on one report but not the others. That's why it's worth checking all three.</p>

            <h2 className="text-xl font-bold text-cr-text">How Long Things Stay On</h2>
            <div className="grid gap-3">
              <div className="p-3 bg-cr-bg rounded-lg border border-cr-border">
                <div className="font-medium">Late Payments</div>
                <div className="text-sm">7 years from date of delinquency</div>
              </div>
              <div className="p-3 bg-cr-bg rounded-lg border border-cr-border">
                <div className="font-medium">Collections</div>
                <div className="text-sm">7 years from date of first delinquency</div>
              </div>
              <div className="p-3 bg-cr-bg rounded-lg border border-cr-border">
                <div className="font-medium">Bankruptcies</div>
                <div className="text-sm">7-10 years depending on type</div>
              </div>
              <div className="p-3 bg-cr-bg rounded-lg border border-cr-border">
                <div className="font-medium">Hard Inquiries</div>
                <div className="text-sm">2 years (stops affecting score after 12 months)</div>
              </div>
              <div className="p-3 bg-cr-bg rounded-lg border border-cr-border">
                <div className="font-medium">Closed Accounts</div>
                <div className="text-sm">10 years after closing (positive accounts stay indefinitely)</div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-cr-text">Your Rights Under the FCRA</h2>
            <p>The Fair Credit Reporting Act gives you important rights:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> You can request a free copy of your report once per year from each bureau</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> You can dispute inaccurate information</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Negative information must be removed after the legally mandated time period</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> You can freeze your credit to prevent new accounts from being opened</li>
            </ul>

            <h2 className="text-xl font-bold text-cr-text">How to Get Your Reports</h2>
            <p>The only official source for free annual reports is <a href="https://www.annualcreditreport.com" target="_blank" rel="noopener noreferrer" className="text-cr-primary underline">AnnualCreditReport.com</a>. Don't pay for credit reports — they're free by law.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/dispute" className="cr-btn cr-btn-primary flex-1 text-center">Start Disputing Errors</Link>
          <Link href="/learn" className="cr-btn cr-btn-secondary flex-1 text-center">More Lessons</Link>
        </div>
      </div>
    </div>
  )
}
