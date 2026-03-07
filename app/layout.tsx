import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'ScopeIQ | Project Scope & Budget Estimator',
  description: 'Get a project estimate in 2 minutes. No calls needed. A free tool for Malaysian SME owners and startup founders.',
  generator: 'Praxor',
  metadataBase: new URL('https://estimate.praxor.dev'),
  openGraph: {
    title: 'ScopeIQ | Project Scope & Budget Estimator',
    description: 'Get a project estimate in 2 minutes. No calls needed. A free tool for Malaysian SME owners and startup founders.',
    url: 'https://scope-estimate.praxor.dev',
    siteName: 'ScopeIQ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScopeIQ | Project Scope & Budget Estimator',
    description: 'Get a project estimate in 2 minutes. No calls needed.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
