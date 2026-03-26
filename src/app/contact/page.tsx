import { Nav } from '@/components/Nav'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      {/* Hero */}
      <section className="py-12 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
        <div className="cr-container text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl opacity-90">We typically respond within 24 hours</p>
        </div>
      </section>

      <section className="py-16">
        <div className="cr-container">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Contact Options</h2>
                <div className="space-y-4">
                  <div className="cr-card flex items-start gap-4">
                    <Mail className="text-cr-primary flex-shrink-0 mt-1" size={24} />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:support@creditfix.example" className="text-cr-primary">support@creditfix.example</a>
                    </div>
                  </div>
                  <div className="cr-card flex items-start gap-4">
                    <Phone className="text-cr-primary flex-shrink-0 mt-1" size={24} />
                    <div>
                      <div className="font-medium">Phone</div>
                      <a href="tel:+15042985783" className="text-cr-primary">(504) 298-5783</a>
                      <p className="text-sm text-cr-muted mt-1">Mon-Fri 9am-6pm CST</p>
                    </div>
                  </div>
                  <div className="cr-card flex items-start gap-4">
                    <Clock className="text-cr-primary flex-shrink-0 mt-1" size={24} />
                    <div>
                      <div className="font-medium">Response Time</div>
                      <p className="text-cr-muted">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Common Questions</h2>
                <div className="cr-card space-y-3">
                  {[
                    { q: 'How long does credit repair take?', a: 'Typically 3-6 months for noticeable results.' },
                    { q: 'Do you offer refunds?', a: 'Refund policies vary by service. Contact us for details.' },
                    { q: 'Is credit repair legal?', a: 'Yes! The FCRA gives you the right to dispute inaccurate information.' },
                  ].map((item, i) => (
                    <div key={i} className="border-b border-cr-border pb-3 last:border-0 last:pb-0">
                      <div className="font-medium text-sm">{item.q}</div>
                      <div className="text-cr-muted text-sm">{item.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="cr-card">
              <h2 className="text-xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-4" action="/api/contact" method="POST">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select 
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none"
                  >
                    <option value="general">General inquiry</option>
                    <option value="support">Technical support</option>
                    <option value="billing">Billing question</option>
                    <option value="partnership">Partnership opportunity</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-cr-border bg-cr-bg focus:border-cr-primary focus:outline-none resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button 
                  type="submit"
                  className="cr-btn cr-btn-primary w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
