import { Nav } from '@/components/Nav'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertCircle, Clock, TrendingUp, CreditCard, Shield } from 'lucide-react'

export default function BuildingCreditPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <div className="cr-container py-8 max-w-4xl">
        <Link href="/learn" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
          <ArrowLeft size={16} /> Back to Learn
        </Link>

        <div className="cr-card mb-8">
          <h1 className="text-3xl font-bold mb-4">Building Credit From Scratch</h1>
          <div className="flex items-center gap-4 text-sm text-cr-muted mb-6">
            <span className="flex items-center gap-1"><Clock size={14} /> 6 min read</span>
            <span className="flex items-center gap-1"><AlertCircle size={14} /> Beginner</span>
          </div>
          
          <div className="prose max-w-none space-y-6 text-cr-muted">
            <p className="text-lg">No credit? Bad credit? Starting from zero? Here's what actually works to build or rebuild your credit score.</p>
            
            <h2 className="text-xl font-bold text-cr-text">First: Understand What You're Building</h2>
            <p>Credit scores are based on what's in your credit reports. If you have no credit history, you have no score. Here's what lenders want to see:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> <strong>Payment history</strong> — Do you pay on time?</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> <strong>Credit age</strong> — How long have you had credit?</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> <strong>Utilization</strong> — How much of your available credit are you using?</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> <strong>Credit mix</strong> — Do you have different types of credit?</li>
            </ul>

            <h2 className="text-xl font-bold text-cr-text">Option 1: Secured Credit Cards</h2>
            <p>The most common path for building credit from scratch. You put down a deposit (usually $200-$500) as collateral, and you get a credit card with a limit equal to your deposit.</p>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800"><strong>Tip:</strong> Look for cards that report to all three bureaus and don't have annual fees. Discover It Secured and Capital One Secured are popular choices.</p>
            </div>

            <h2 className="text-xl font-bold text-cr-text">Option 2: Credit-Builder Loans</h2>
            <p>Small loans designed for people with no or bad credit. You make monthly payments, and at the end of the loan term, you get the money back minus interest. The payments are reported to bureaus, building your history.</p>
            <div className="p-4 bg-cr-bg border border-cr-border rounded-lg">
              <p className="text-sm"><strong>Where to get them:</strong> Local credit unions, Self Financial, Chime Credit Builder</p>
            </div>

            <h2 className="text-xl font-bold text-cr-text">Option 3: Authorized User</h2>
            <p>Someone with good credit adds you as an authorized user on their old credit card. The card's history — 10, 15, even 20 years of on-time payments — appears on your report. You don't even need to use the card.</p>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800"><strong>Warning:</strong> Make sure the primary cardholder is reliable. If they miss payments, it can hurt YOUR credit too.</p>
            </div>

            <h2 className="text-xl font-bold text-cr-text">Option 4: Rent Reporting</h2>
            <p>Your rent payments can be reported to credit bureaus. Services like RentReporters, LevelCredit, and PRBC let you add your rental history to your credit file. One year of on-time rent payments can add 50-100 points for people with thin files.</p>

            <h2 className="text-xl font-bold text-cr-text">The Rules That Actually Matter</h2>
            
            <div className="space-y-3">
              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <div className="font-bold text-cr-text mb-1">Keep utilization below 30%</div>
                <p className="text-sm">If your limit is $500, never charge more than $150. Better yet, stay under 10% ($50). This is one of the fastest ways to boost your score.</p>
              </div>
              
              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <div className="font-bold text-cr-text mb-1">Never miss a payment</div>
                <p className="text-sm">Set up autopay for at least the minimum. A single late payment can destroy months of progress.</p>
              </div>
              
              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <div className="font-bold text-cr-text mb-1">Don't close old cards</div>
                <p className="text-sm">Closing a card reduces your available credit and can lower your average account age. Keep them open even if you don't use them.</p>
              </div>
              
              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <div className="font-bold text-cr-text mb-1">Be patient</div>
                <p className="text-sm">Credit building takes time. You'll see progress in 3-6 months, significant improvement in 12-18 months. Don't apply for multiple cards at once — each application drops your score 2-5 points.</p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-cr-text">What NOT to Do</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} /> Don't max out your cards — high utilization destroys scores</li>
              <li className="flex items-start gap-2"><AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} /> Don't apply for many cards at once — multiple hard inquiries</li>
              <li className="flex items-start gap-2"><AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} /> Don't close old cards after paying them off</li>
              <li className="flex items-start gap-2"><AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} /> Don't ignore collections — they don't go away on their own</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/dispute" className="cr-btn cr-btn-primary flex-1 text-center">Start Disputing Errors</Link>
          <Link href="/calculate" className="cr-btn cr-btn-secondary flex-1 text-center">Calculate Your Score</Link>
        </div>
      </div>
    </div>
  )
}
