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
      <body>{children}</body>
    </html>
  )
}
