import { Nav } from '@/components/Nav'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      <section className="py-16">
        <div className="cr-container max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          <div className="cr-card space-y-6 text-cr-muted">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Information We Collect</h2>
            <p>We collect information you provide directly, such as your name and email address when you submit our contact forms or sign up for our newsletter. We do not collect sensitive financial information like Social Security numbers or bank account details.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you about credit repair resources, and to send you relevant updates and offers. We never sell your personal information to third parties.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Cookies</h2>
            <p>We use essential cookies to operate our website. We do not use advertising or tracking cookies.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Third-Party Services</h2>
            <p>We may use third-party services like Stripe for payment processing. These services have their own privacy policies governing how they handle your information.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Data Security</h2>
            <p>We take reasonable measures to protect your personal information from unauthorized access or disclosure.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Your Rights</h2>
            <p>You have the right to request access to, correction of, or deletion of your personal information. Contact us at privacy@creditfix.example to make such requests.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Changes to This Policy</h2>
            <p>We may update this policy from time to time. We will notify you of any material changes by posting the new policy on this page.</p>
            
            <h2 className="text-xl font-semibold text-cr-text">Contact Us</h2>
            <p>If you have questions about this privacy policy, please contact us at privacy@creditfix.example.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
