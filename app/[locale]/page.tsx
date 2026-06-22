import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import CaptureStrip from '@/components/CaptureStrip'
import ProblemSection from '@/components/ProblemSection'
import MethodSection from '@/components/MethodSection'
import CurriculumSection from '@/components/CurriculumSection'
import ResourcesSection from '@/components/ResourcesSection'
import OutcomesSection from '@/components/OutcomesSection'
import ServicesSection from '@/components/ServicesSection'
import WhoItsFor from '@/components/WhoItsFor'
import FAQSection from '@/components/FAQSection'
import AboutSection from '@/components/AboutSection'
import CTASection from '@/components/CTASection'
import FaSimpleStart from '@/components/FaSimpleStart'
import FaHomeCta from '@/components/FaHomeCta'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { routing } from '@/i18n/routing'

const BASE = 'https://www.maddythetechie.com'

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
      ? 'هوش مصنوعی و اتوماسیون برای کارهای روزمره'
      : 'Maddy the Techie — Learn AI & No-Code Automation',
    description: isFa
      ? 'آموزش و خدمات کاربردی برای استفاده از هوش مصنوعی اتوماسیون ChatGPT Claude و Google Sheets در کارهای روزمره'
      : 'Practical AI and no-code automation for non-technical professionals, creators, and small business owners. No coding required.',
    alternates: {
      canonical: `${BASE}/${locale}`,
      languages: {
        en: `${BASE}/en`,
        fa: `${BASE}/fa`,
        'x-default': `${BASE}/en`,
      },
    },
  }
}

export default async function Home() {
  const locale = await getLocale()
  const isFa = locale === 'fa'

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <CaptureStrip />
      <ProblemSection />
      <MethodSection />
      <CurriculumSection />
      {!isFa && <ResourcesSection />}
      {!isFa && <OutcomesSection />}
      {!isFa && <ServicesSection />}
      {!isFa && <WhoItsFor />}
      {!isFa && <FAQSection />}
      {!isFa && <AboutSection />}
      {!isFa && <CTASection />}
      {isFa && <FaSimpleStart />}
      {isFa && <FaHomeCta />}
      <Footer />
      <AIAssistant />
    </main>
  )
}
