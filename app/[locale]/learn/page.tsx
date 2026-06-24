import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import MethodSection from '@/components/MethodSection'
import CurriculumSection from '@/components/CurriculumSection'
import WhoItsFor from '@/components/WhoItsFor'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { routing } from '@/i18n/routing'

const BASE = 'https://www.maddythetechie.com'
const PATH = '/learn'

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
      ? 'یادگیری هوش مصنوعی و اتوماسیون بدون کدنویسی | مدی'
      : 'Learn AI & Automation Without Coding | Maddy',
    description: isFa
      ? 'یک آموزشی عملی و پروژه‌محور که از «از کجا شروع کنم» می‌رساندت به ساختن گردش‌کارهای واقعی روزمره.'
      : 'A practical, project-based training that takes you from "where do I start" to real AI workflows you use daily.',
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

export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFa = locale === 'fa'

  return (
    <main className="min-h-screen overflow-x-hidden">
      <h1 className="sr-only">
        {isFa ? 'یادگیری هوش مصنوعی و اتوماسیون بدون کدنویسی' : 'Learn AI & Automation Without Coding'}
      </h1>
      <Navigation />
      <div className="pt-[72px]">
        <MethodSection />
        <CurriculumSection />
        <WhoItsFor />
      </div>
      <CTASection />
      <Footer />
      <AIAssistant />
    </main>
  )
}
