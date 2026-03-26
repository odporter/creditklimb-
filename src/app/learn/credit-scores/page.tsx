import { Nav } from '@/components/Nav'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, CreditCard, TrendingUp, Clock, AlertCircle } from 'lucide-react'

export default function CreditScoresPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <div className="cr-container py-8 max-w-4xl">
        <Link href="/learn" className="inline-flex items-center gap-2 text-cr-muted hover:text-cr-text mb-6">
          <ArrowLeft size={16} /> Back to Learn
        </Link>

        <div className="cr-card mb-8">
          <h1 className="text-3xl font-bold mb-4">Understanding Credit Scores</h1>
          <div className="flex items-center gap-4 text-sm text-cr-muted mb-6">
            <span className="flex items-center gap-1"><Clock size={14} /> 5 min read</span>
            <span className="flex items-center gap-1"><AlertCircle size={14} /> Beginner</span>
          </div>
          
          <div className="prose max-w-none space-y-6 text-cr-muted">
            <p className="text-lg">Your credit score is a three-digit number that tells lenders how risky you are to lend to. Scores range from 300 to 850.</p>
            
            <h2 className="text-xl font-bold text-cr-text">How FICO Scores Are Calculated</h2>
            <p>FICO is the most widely used credit scoring model. Here is what determines your score:</p>
            
            <div className="grid gap-4">
              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-cr-primary flex items-center justify-center text-white font-bold">35%</div>
                  <div>
                    <div className="font-bold text-cr-text">Payment History</div>
                    <div className="text-sm">Do you pay on time?</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-cr-primary flex items-center justify-center text-white font-bold">30%</div>
                  <div>
                    <div className="font-bold text-cr-text">Amounts Owed</div>
                    <div className="text-sm">Credit utilization ratio</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-cr-primary flex items-center justify-center text-white font-bold">15%</div>
                  <div>
                    <div className="font-bold text-cr-text">Length of Credit History</div>
                    <div className="text-sm">How long have you had credit?</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-cr-primary flex items-center justify-center text-white font-bold">10%</div>
                  <div>
                    <div className="font-bold text-cr-text">New Credit</div>
                    <div className="text-sm">Recent inquiries and accounts</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-cr-bg rounded-lg border border-cr-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-cr-primary flex items-center justify-center text-white font-bold">10%</div>
                  <div>
                    <div className="font-bold text-cr-text">Credit Mix</div>
                    <div className="text-sm">Types of credit (cards, loans, etc.)</div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-cr-text">Score Ranges</h2>
            <div className="grid grid-cols-5 gap-2 text-center text-sm">
              <div className="p-3 bg-red-100 text-red-800 rounded-lg">
                <div className="font-bold">300-579</div>
                <div>Poor</div>
              </div>
              <div className="p-3 bg-orange-100 text-orange-800 rounded-lg">
                <div className="font-bold">580-669</div>
                <div>Fair</div>
              </div>
              <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg">
                <div className="font-bold">670-739</div>
                <div>Good</div>
              </div>
              <div className="p-3 bg-lime-100 text-lime-800 rounded-lg">
                <div className="font-bold">740-799</div>
                <div>Very Good</div>
              </div>
              <div className="p-3 bg-green-100 text-green-800 rounded-lg">
                <div className="font-bold">800-850</div>
                <div>Exceptional</div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-cr-text">What You Can Do</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Pay all bills on time, every time</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Keep credit card balances below 30% of your limit</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Don't close old credit cards</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Only apply for new credit when you need it</li>
              <li className="flex items-start gap-2"><CheckCircle className="text-cr-success flex-shrink-0 mt-0.5" size={18} /> Check your credit reports for errors</li>
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
