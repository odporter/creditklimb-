import { Nav } from '@/components/Nav'
import { CheckCircle, ArrowRight, Users, TrendingUp, CreditCard, Clock } from 'lucide-react'

export default function TradelinesPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      {/* Hero */}
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
            <TrendingUp size={16} />
            Fastest Way to Boost Your Credit Score
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Need Credit Fast?
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Tradelines are one of the most powerful (and least known) ways to improve your credit score quickly. We connect you with the right people.
          </p>
        </div>
      </section>

      {/* What are Tradelines */}
      <section className="py-16">
        <div className="cr-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">What is a Tradeline?</h2>
            <div className="cr-card">
              <p className="text-lg text-cr-muted mb-6">
                A tradeline is simply a credit account that appears on your credit report. When you become an 
                <strong> authorized user</strong> on someone else's old, established credit card — that tradeline 
                shows up on your report too.
              </p>
              <p className="text-lg text-cr-muted mb-6">
                The key? The account's entire payment history (10-20+ years of on-time payments) 
                can boost your credit score almost immediately.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  💡 This is NOT opening a new account in your name. You don't need credit to qualify. 
                  The primary account holder's credit is never affected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-cr-surface">
        <div className="cr-container">
          <h2 className="text-3xl font-bold text-center mb-12">How Tradelines Work</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cr-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Connect</h3>
              <p className="text-cr-muted text-sm">
                We match you with a verified tradeline provider who has aged accounts that fit your profile.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cr-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Get Added</h3>
              <p className="text-cr-muted text-sm">
                You become an authorized user on their credit card. It appears on your report within 30-60 days.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cr-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Score Jumps</h3>
              <p className="text-cr-muted text-sm">
                Your credit age and payment history improve instantly. Many people see 20-50+ point increases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="py-16">
        <div className="cr-container">
          <h2 className="text-3xl font-bold text-center mb-8">Who Are Tradelines For?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              'First-time credit builders',
              'People recovering from bankruptcy',
              'Anyone with thin credit files',
              'Those needing credit for a mortgage',
              'People with collections or late payments',
              'Anyone wanting to maximize their score',
            ].map((item, i) => (
              <div key={i} className="cr-card flex items-center gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-16 bg-cr-surface">
        <div className="cr-container">
          <h2 className="text-3xl font-bold text-center mb-4">Typical Costs</h2>
          <p className="text-cr-muted text-center mb-12 max-w-2xl mx-auto">
            Tradeline pricing varies by the age of the account and your goals. Here's what to expect:
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="cr-card text-center">
              <div className="text-sm text-cr-muted mb-2">Starter</div>
              <div className="text-3xl font-bold mb-2">$200-400</div>
              <div className="text-cr-muted text-sm">1 tradeline, 3-5 year old account</div>
              <div className="mt-4 text-sm text-green-600 font-medium">Good for minor boosts</div>
            </div>
            <div className="cr-card text-center border-cr-primary">
              <div className="text-sm text-cr-muted mb-2">Popular</div>
              <div className="text-3xl font-bold mb-2">$500-900</div>
              <div className="text-cr-muted text-sm">1-2 tradelines, 7-10 year accounts</div>
              <div className="mt-4 text-sm text-green-600 font-medium">Most common choice</div>
            </div>
            <div className="cr-card text-center">
              <div className="text-sm text-cr-muted mb-2">Premium</div>
              <div className="text-3xl font-bold mb-2">$1,000-2,500</div>
              <div className="text-cr-muted text-sm">Multiple tradelines, 15+ year accounts</div>
              <div className="mt-4 text-sm text-green-600 font-medium">Maximum impact</div>
            </div>
          </div>
          <p className="text-center text-cr-muted text-sm mt-8">
            * Prices are estimates. We'll connect you with a provider and get exact quotes based on your situation.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Tradelines?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get matched with a tradeline provider. No obligation — just information about your options.
          </p>
          <a 
            href="/leads?type=tradeline" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-cr-primary font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get My Tradeline Options
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="cr-container max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">Common Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Is this legal?',
                a: 'Yes. Becoming an authorized user on someone else\'s account is completely legal and a well-established practice in the credit industry.',
              },
              {
                q: 'Does it hurt the primary account holder\'s credit?',
                a: 'No. As an authorized user, you have no control over the account and it doesn\'t affect their credit.',
              },
              {
                q: 'How long does it take to see results?',
                a: 'Typically 30-60 days for the tradeline to appear on your credit report. Results can last 1-3 years.',
              },
              {
                q: 'Can I do this more than once?',
                a: 'Yes. Some people add multiple tradelines over time for continued improvement.',
              },
            ].map((faq, i) => (
              <div key={i} className="cr-card">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-cr-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 border-t border-cr-border">
        <div className="cr-container text-center">
          <p className="text-cr-muted mb-4">Not sure if tradelines are right for you?</p>
          <a href="/leads" className="text-cr-primary underline font-medium">
            Get our free credit analysis →
          </a>
          <span className="text-cr-muted mx-2">or</span>
          <a href="/dispute" className="text-cr-primary underline font-medium">
            try our free dispute tools
          </a>
        </div>
      </section>
    </div>
  )
}
