// Shared SEO page template
import { Nav } from '@/components/Nav'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function SEOPage({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <section className="py-16 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">{description}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="cr-container max-w-3xl">{children}</div>
      </section>
    </div>
  )
}

export function SEOCTASection({ starterHref = '/dispute/starter', fullHref = '/dispute/full' }: { starterHref?: string; fullHref?: string }) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-4">
      <Link href={starterHref} className="flex-1 text-center py-3 px-6 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
        Get Free Letter <ArrowRight size={16} />
      </Link>
      <Link href={fullHref} className="flex-1 text-center py-3 px-6 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
        Full Repair — $29 <ArrowRight size={16} />
      </Link>
    </div>
  )
}

export function SEOStepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="w-6 h-6 bg-cr-primary/20 rounded-full flex items-center justify-center flex-shrink-0 text-cr-primary font-bold text-sm">{i + 1}</span>
          <span className="text-cr-muted text-sm">{step}</span>
        </li>
      ))}
    </ol>
  )
}
