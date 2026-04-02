import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CreditKlimb™ — Don\'t Just Check Your Credit. Climb It.',
  description: 'Free credit repair tools, dispute letters, and financial guidance. Fix your credit score yourself with our free tools.',
  keywords: ['credit repair', 'credit score', 'dispute letters', 'debt management', 'financial tools', 'business credit'],
  openGraph: {
    title: 'CreditKlimb™ — Don\'t Just Check Your Credit. Climb It.',
    description: 'Free credit repair tools. Dispute letters, Net30 finder, business credit building. Help people actually improve their credit.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Tawk.to Live Chat — configure YOUR_PROPERTY_ID in SETUP.md */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/1');
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
