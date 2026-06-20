import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import FloatingSocialLinks from '@/components/FloatingSocialLinks'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      <FloatingSocialLinks />
    </NextIntlClientProvider>
  )
}
