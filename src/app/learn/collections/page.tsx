import { Nav } from '@/components/Nav'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertCircle, Clock, Phone, DollarSign, Shield } from 'lucide-react'

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <div className="cr-container py-8 max-w-4xl">
        <Link href="/learn" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
          <ArrowLeft size={16} /> Back to Learn
        </Link>

        <div className="cr-card mb-8">
          <h1 className="text-3xl font-bold mb-4">Collections & How to Handle Them</h1>
          <div className="flex items-center gap-4 text-sm text-cr-muted mb-6">
            <span className="flex items-center gap-1"><Clock size={14} /> 9 min read</span>
            <span className="flex items-center gap-1"><AlertCircle size={14} /> Intermediate</span>
          </div>
          
          <div className="prose max-w-none space-y-6 text-cr-muted">
            <p className="text-lg">Collections are one of the most frustrating items on a credit report. A debt you thought was paid — or maybe forgot about — suddenly appears and tanks your score. Here's what you need to know.</p>
            
            <h2 className="text-xl font-bold text-cr-text">What Is a Collection?</h2>
            <p>When you fail to pay a debt, the original creditor eventually gives up trying to collect and sells the debt to a collection agency for a fraction of its value. The collection agency then tries to collect the full amount from you.</p>
            <p>Collections can come from:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Credit card companies</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Medical providers</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Utilities and telecommunications</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Auto lenders and landlords</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Student loans (rare but happens)</li>
            </ul>

            <h2 className="text-xl font-bold text-cr-text">The 7-Year Clock</h2>
            <p>Collections have a expiration date on your credit report — <strong>7 years from the date of first delinquency (DOFD)</strong>. After that, they must be removed. This is critical:</p>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800"><strong>Warning:</strong> If a collector tells you they can reset the clock by making a payment — they're lying. A partial payment does NOT restart the 7-year period. Only the original DOFD matters.</p>
            </div>

            <h2 className="text-xl font-bold text-cr-text">Your Rights Under the FDCPA</h2>
            <p>The Fair Debt Collection Practices Act gives you powerful protections:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Collectors must verify the debt in writing within 30 days of your written request</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> They cannot call before 8am or after 9pm</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> They cannot discuss your debt with anyone but you (or your attorney)</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> They cannot threaten legal action they can't or won't take</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> They cannot add interest or fees not in the original contract</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> If you dispute in writing, they must stop collection until they verify</li>
            </ul>

            <h2 className="text-xl font-bold text-cr-text">Option 1: Pay for Delete</h2>
            <p>The gold standard of collections. You negotiate with the collector to pay the debt in exchange for them removing it from your credit report.</p>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800"><strong>How it works:</strong> Send a written offer: "I'll pay the debt in full if you remove it from my credit report." Get the agreement in writing BEFORE you pay. Never pay before getting it in writing.</p>
            </div>
            <p><strong>Negotiate down first:</strong> Collectors buy debts for 5-25 cents on the dollar. You can often settle for 30-50% of the balance. Say: "I can pay [X] as a settlement in full. Will you remove it from my credit report?"</p>

            <h2 className="text-xl font-bold text-cr-text">Option 2: Dispute the Collection</h2>
            <p>If the collection is not yours, is older than 7 years, or the collector can't verify it — dispute it with the credit bureau and it should be removed.</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Dispute with the bureau online at their website</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Also send a written dispute by mail (certified)</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Request debt validation from the collector</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Wait 30 days — if they don't verify, it must be removed</li>
            </ul>

            <h2 className="text-xl font-bold text-cr-text">Option 3: Let It Age Out</h2>
            <p>If the collection is already 5+ years old, it may be close to the 7-year mark. At that point, it makes more sense to wait than to pay it — because paying it can actually reset the clock on your credit report (though not the statute of limitations for lawsuits).</p>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800"><strong>Pro tip:</strong> Check the "Date of First Delinquency" on your report. If it's within 12 months of the 7-year mark, wait. The damage is almost done.</p>
            </div>

            <h2 className="text-xl font-bold text-cr-text">Medical Collections: Special Rules</h2>
            <p>As of 2023, medical collections under $500 are no longer reported to credit bureaus. And paid medical collections must be removed. If you have old medical collections, always try to pay for delete or dispute.</p>

            <h2 className="text-xl font-bold text-cr-text">Don't Ignore a Collection</h2>
            <p>Collections don't go away on their own. Even if you don't think you owe it, it will continue to damage your score until you deal with it — either by paying, disputing, or waiting for it to fall off. And in some states, collectors can sue you for old debts.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/dispute" className="cr-btn cr-btn-primary flex-1 text-center">Generate Dispute Letter</Link>
          <Link href="/tradelines" className="cr-btn cr-btn-secondary flex-1 text-center">Build Credit with Tradelines</Link>
        </div>
      </div>
    </div>
  )
}
