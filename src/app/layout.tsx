import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CreditKlimb™ — Understand Your Credit. Fix What Matters.',
  description: 'Free credit tools for everyone. Dispute letters, credit analysis, score simulation. No subscriptions. No pressure. Just clarity.',
  keywords: ['credit repair', 'credit score', 'dispute letters', 'financial tools', 'free credit'],
  openGraph: {
    title: 'CreditKlimb™ — Understand Your Credit. Fix What Matters.',
    description: 'Free credit tools for everyone. No subscriptions. No pressure. Just clarity.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
        {/* Tawk.to Live Chat — only loads when NEXT_PUBLIC_TAWK_ID is set */}
        {process.env.NEXT_PUBLIC_TAWK_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/${process.env.NEXT_PUBLIC_TAWK_ID}/1';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}