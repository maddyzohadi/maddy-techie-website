import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import TemplatesHero from '@/components/TemplatesHero'
import ResourcesSection from '@/components/ResourcesSection'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { routing } from '@/i18n/routing'

const BASE = 'https://www.maddythetechie.com'
const PATH = '/templates'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFa = locale === 'fa'
  return {
    title: isFa
      ? 'قالب‌های هوش مصنوعی و بدون‌کد برای کار | مدی'
      : 'AI & No-Code Templates for Work | Maddy',
    description: isFa
      ? 'قالب‌های رایگان و حرفه‌ای پرامپت و گوگل‌شیت برای ایمیل، گزارش، محتوا و کار مشتری. بردار، تنظیم کن، همین امروز اجرا کن.'
      : 'Free and premium AI prompts and Google Sheets templates for emails, reports, content, and client work. Grab, tweak, run today.',
    alternates: {
      canonical: `${BASE}/${locale}${PATH}`,
      languages: {
        en: `${BASE}/en${PATH}`,
        fa: `${BASE}/fa${PATH}`,
        'x-default': `${BASE}/en${PATH}`,
      },
    },
  }
}

export default async function TemplatesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFa = locale === 'fa'

  return (
    <main className="min-h-screen overflow-x-hidden">
      <h1 className="sr-only">
        {isFa ? 'قالب‌های آماده‌ی هوش مصنوعی و بدون‌کد' : 'AI & No-Code Templates for Work'}
      </h1>
      <Navigation />
      <TemplatesHero />
      <ResourcesSection />
      <Footer />
      <AIAssistant />
    </main>
  )
}
