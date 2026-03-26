import { Nav } from '@/components/Nav'
import { LeadForm } from '@/components/LeadForm'

export default function LeadsPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <section className="py-16">
        <div className="cr-container max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your Free Credit Analysis
            </h1>
            <p className="text-cr-muted text-lg">
              Answer a few questions and we'll show you exactly what's hurting your credit — 
              plus send you a personalized action plan at no cost.
            </p>
          </div>
          
          <LeadForm />
        </div>
      </section>
    </div>
  )
}
