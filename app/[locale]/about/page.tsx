import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import AboutSection from '@/components/AboutSection'
import FaAboutPageContent from '@/components/FaAboutPageContent'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { routing } from '@/i18n/routing'

const BASE = 'https://www.maddythetechie.com'
const PATH = '/about'

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
      ? 'درباره‌ی مدی د تکی — آموزش کاربردی هوش مصنوعی'
      : 'About Maddy the Techie — Practical AI Education',
    description: isFa
      ? 'مدی د تکی کمک می‌کند آدم‌های غیرفنی با شایستگی و اعتماد از هوش مصنوعی استفاده کنند — بدون اصطلاحات پیچیده، بدون کد.'
      : 'Maddy the Techie helps non-technical people use AI with clarity and confidence — no jargon, no code.',
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFa = locale === 'fa'

  return (
    <main className="min-h-screen overflow-x-hidden">
      <h1 className="sr-only">
        {isFa ? 'درباره‌ی مدی د تکی — آموزش کاربردی هوش مصنوعی' : 'About Maddy the Techie — Practical AI Education'}
      </h1>
      <Navigation />
      <div className="pt-[72px]">
        {isFa ? <FaAboutPageContent /> : <AboutSection />}
      </div>
      <Footer />
      <AIAssistant />
    </main>
  )
}
