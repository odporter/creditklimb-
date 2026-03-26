import Link from 'next/link'
import { Calculator, FileText, TrendingUp, CreditCard, BookOpen, Download, CheckCircle } from 'lucide-react'
import { Nav } from '@/components/Nav'

const FREE_TOOLS = [
  {
    icon: FileText,
    title: 'Dispute Letter Generator',
    description: 'Create professional dispute letters for any credit error. Customize for all three bureaus.',
    href: '/dispute',
    free: true,
  },
  {
    icon: Calculator,
    title: 'Credit Score Calculator',
    description: 'See how different actions affect your credit score. Plan your repair strategy.',
    href: '/calculate',
    free: true,
  },
  {
    icon: TrendingUp,
    title: 'Score Simulator',
    description: 'Simulate paying off debts, opening accounts, and other credit actions.',
    href: '/simulate',
    free: true,
  },
  {
    icon: CreditCard,
    title: 'Debt Payoff Planner',
    description: 'Create a custom debt payoff plan using avalanche or snowball method.',
    href: '/debt',
    free: true,
  },
  {
    icon: BookOpen,
    title: 'Credit Education',
    description: 'Learn about credit scores, reports, and how to improve them.',
    href: '/learn',
    free: true,
  },
  {
    icon: Download,
    title: 'Template Library',
    description: 'Download free dispute letter templates for every situation.',
    href: '/templates',
    free: true,
  },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      <div className="cr-container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Free Credit Repair Tools</h1>
          <p className="text-cr-muted text-lg">
            Everything you need to fix your credit yourself. No credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FREE_TOOLS.map((tool, i) => (
            <Link key={i} href={tool.href} className="cr-card hover:border-cr-primary transition-colors group">
              <div className="w-12 h-12 rounded-lg tint-primary-10 flex items-center justify-center mb-4 group-hover:tint-primary-20 transition-colors">
                <tool.icon className="text-cr-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">{tool.title}</h3>
              <p className="text-cr-muted text-sm mb-3">{tool.description}</p>
              {tool.free && (
                <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                  <CheckCircle size={14} />
                  Free Forever
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Premium Upsell */}
        <div className="cr-card bg-gradient-to-r from-cr-primary to-blue-700 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Need Extra Help?</h2>
              <p className="opacity-90 mb-4">
                Our free tools handle most credit repair cases. For complex situations,
                Premium includes professional support.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Professional letter review
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Priority processing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Dedicated credit advisor
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Money-back guarantee
                </li>
              </ul>
              <Link href="/premium" className="cr-btn bg-white text-cr-primary hover:bg-gray-100">
                View Premium Plans
              </Link>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold">$29</div>
              <div className="opacity-80">One-time setup fee</div>
              <div className="mt-4 text-sm opacity-70">
                Only if you need extra help
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}