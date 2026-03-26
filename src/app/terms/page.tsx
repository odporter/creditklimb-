import { Nav } from '@/components/Nav'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <section className="py-16">
        <div className="cr-container max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          <div className="cr-card space-y-6 text-cr-muted">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Acceptance of Terms</h2>
            <p>By accessing and using CreditKlimb™, you accept and agree to be bound by the terms and conditions of this agreement.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Description of Service</h2>
            <p>CreditKlimb™ provides free credit repair tools, dispute letter generators, and educational resources. Our services are intended for informational purposes only and do not constitute legal or financial advice.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">No Legal or Professional Advice</h2>
            <p>CreditKlimb™ is not a law firm and does not provide legal, accounting, or financial advice. The information provided through our service is for general informational purposes only. Consult with a qualified professional before making any financial decisions.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">User Responsibilities</h2>
            <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for any actions you take based on information obtained from our website.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Dispute Letters</h2>
            <p>The dispute letter templates and generators on our site are provided as general guidance. We do not guarantee specific outcomes from the use of these letters. Credit bureaus and creditors have their own procedures for handling disputes.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Premium Services</h2>
            <p>Premium services are billed on a one-time or subscription basis as described on our pricing page. Refunds are provided at our discretion for unsatisfactory service.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Limitation of Liability</h2>
            <p>CreditKlimb™ shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of our service after any changes constitutes acceptance of the new terms.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Contact</h2>
            <p>If you have questions about these Terms, please contact us at legal@creditfix.example.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
