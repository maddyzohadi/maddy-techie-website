import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import RedDivider from '@/components/RedDivider'
import ProblemSection from '@/components/ProblemSection'
import MethodSection from '@/components/MethodSection'
import ProcessSection from '@/components/ProcessSection'
import ServicesListSection from '@/components/ServicesListSection'
import CurriculumSection from '@/components/CurriculumSection'
import ServicesSection from '@/components/ServicesSection'
import FAQSection from '@/components/FAQSection'
import AboutSection from '@/components/AboutSection'
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

      {/* Divider 1 — after hero (animated scroll) */}
      <RedDivider id="hero" animated />

      {!isFa && <ProblemSection />}

      {/* Divider 2 — EN: problem→method | FA: hero-divider already placed, this is method→process */}
      {!isFa && <RedDivider id="problem" />}

      <MethodSection />

      {/* Divider 2 — FA: after method, before process */}
      {isFa && <RedDivider id="fa2" />}

      <ProcessSection />
      <ServicesListSection />
      <CurriculumSection />

      {/* Divider 3 — FA: before footer (last content is curriculum) */}
      {isFa && <RedDivider id="fa-final" />}

      {!isFa && <ServicesSection />}
      {!isFa && <FAQSection />}

      {/* Divider 3 — EN: before final CTA / about section */}
      {!isFa && <RedDivider id="final" />}

      {!isFa && <AboutSection />}
      <Footer />
      <AIAssistant />
    </main>
  )
}
