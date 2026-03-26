import { Nav } from '@/components/Nav'
import { FileText, Download, Clock, CheckCircle } from 'lucide-react'

const TEMPLATES = [
  {
    category: 'Late Payments',
    items: [
      { name: 'Late Payment Removal Request', time: '5 min', difficulty: 'Easy' },
      { name: 'Goodwill Adjustment Letter', time: '10 min', difficulty: 'Medium' },
      { name: 'Reaging Notification Dispute', time: '7 min', difficulty: 'Medium' },
    ]
  },
  {
    category: 'Collections',
    items: [
      { name: 'Debt Validation Letter', time: '8 min', difficulty: 'Easy' },
      { name: 'Collection Removal Request', time: '6 min', difficulty: 'Easy' },
      { name: 'Pay for Delete Agreement', time: '10 min', difficulty: 'Medium' },
      { name: 'Trade Line Classification Dispute', time: '7 min', difficulty: 'Medium' },
    ]
  },
  {
    category: 'Charge-Offs',
    items: [
      { name: 'Charge-Off Removal Letter', time: '6 min', difficulty: 'Easy' },
      { name: 'Partial Payment Settlement', time: '10 min', difficulty: 'Medium' },
      { name: 'Charge-Off Reaging Dispute', time: '8 min', difficulty: 'Hard' },
    ]
  },
  {
    category: 'Identity & Errors',
    items: [
      { name: 'Identity Theft Report', time: '15 min', difficulty: 'Hard' },
      { name: 'Wrong Name Dispute', time: '5 min', difficulty: 'Easy' },
      { name: 'Wrong Address Dispute', time: '5 min', difficulty: 'Easy' },
      { name: 'Duplicate Account Dispute', time: '7 min', difficulty: 'Medium' },
      { name: 'Unauthorized Inquiry Dispute', time: '5 min', difficulty: 'Easy' },
    ]
  },
  {
    category: 'Bankruptcy',
    items: [
      { name: 'Bankruptcy Discharge Dispute', time: '8 min', difficulty: 'Medium' },
      { name: 'Inaccurate Bankruptcy Status', time: '7 min', difficulty: 'Medium' },
    ]
  },
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      {/* Hero */}
      <section className="py-12 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <FileText className="mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">Dispute Letter Templates</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Professional-grade templates used by credit repair companies. 
            Customize and download for free.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-cr-surface border-b border-cr-border">
        <div className="cr-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cr-primary">50+</div>
              <div className="text-sm text-cr-muted">Templates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cr-primary">3</div>
              <div className="text-sm text-cr-muted">Bureaus Covered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cr-primary">100%</div>
              <div className="text-sm text-cr-muted">Free</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cr-primary">5 min</div>
              <div className="text-sm text-cr-muted">Average Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-16">
        <div className="cr-container">
          <div className="space-y-8">
            {TEMPLATES.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="text-cr-primary" size={20} />
                  {section.category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.items.map((template, j) => (
                    <div key={j} className="cr-card hover:border-cr-primary transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-sm">{template.name}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-cr-muted mb-3">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {template.time}
                        </span>
                        <span className={`flex items-center gap-1 ${
                          template.difficulty === 'Easy' ? 'text-green-600' :
                          template.difficulty === 'Medium' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          <CheckCircle size={14} />
                          {template.difficulty}
                        </span>
                      </div>
                      <a 
                        href="/dispute" 
                        className="cr-btn cr-btn-primary w-full text-center text-sm py-2"
                      >
                        <Download size={14} className="inline mr-1" />
                        Use Template
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-cr-surface border-t border-cr-border">
        <div className="cr-container text-center">
          <h2 className="text-xl font-bold mb-4">Need Help with a Specific Issue?</h2>
          <p className="text-cr-muted mb-6">Our interactive dispute tool walks you through exactly what to say.</p>
          <a href="/dispute" className="cr-btn cr-btn-primary">
            Go to Dispute Tool
          </a>
        </div>
      </section>
    </div>
  )
}
