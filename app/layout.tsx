import type { Metadata } from 'next'
import { Sora, Inter, Vazirmatn } from 'next/font/google'
import { headers } from 'next/headers'
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

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const locale = headersList.get('x-next-intl-locale') ?? 'en'
  const dir = locale === 'fa' ? 'rtl' : 'ltr'

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${sora.variable} ${inter.variable} ${vazirmatn.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
