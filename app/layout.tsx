import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Maddy the Techie — Learn AI. Automate Work. No Coding.',
  description:
    'Practical AI and no-code automation education for non-technical professionals, creators, and small business owners. Build smarter workflows without writing a single line of code.',
  keywords: [
    'AI automation',
    'no-code',
    'workflow automation',
    'AI for work',
    'automation training',
    'non-technical professionals',
    'Maddy the Techie',
  ],
  openGraph: {
    title: 'Maddy the Techie — Learn AI. Automate Work. No Coding.',
    description:
      'Practical AI and no-code automation education for non-technical professionals, creators, and small business owners.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
