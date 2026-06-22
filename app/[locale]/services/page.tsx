import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import ServicesPageContent from '@/components/ServicesPageContent'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { routing } from '@/i18n/routing'

const BASE = 'https://www.maddythetechie.com'
const PATH = '/services'

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
      ? 'خدمات هوش مصنوعی و اتوماسیون برای کسب‌وکارها'
      : 'AI Workflow Setup for Non-Technical Teams | Maddy',
    description: isFa
      ? 'راهکارهای کاربردی برای برنامه‌ریزی مدیریت کارها گزارش‌سازی و کاهش کارهای تکراری با هوش مصنوعی و اتوماسیون'
      : 'Done-with-you AI and no-code workflow setup with ChatGPT, Claude, and Google Sheets. Start with a workflow audit.',
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

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      <div className="pt-[72px]">
        <ServicesPageContent />
      </div>
      <Footer />
      <AIAssistant />
    </main>
  )
}
