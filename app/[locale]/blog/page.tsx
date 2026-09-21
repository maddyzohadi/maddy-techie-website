import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import BlogListContent from '@/components/blog/BlogListContent'
import { getPublishedPosts } from '@/lib/blog/queries'
import { getSiteUrl } from '@/lib/siteUrl'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/lib/blog/types'

export const revalidate = 3600

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
  const BASE = getSiteUrl()

  const title = isFa ? 'وبلاگ — مدی د تکی' : 'Blog — Maddy the Techie'
  const description = isFa
    ? 'آموزش کاربردی هوش مصنوعی و اتوماسیون، به زبان ساده.'
    : 'Practical AI and no-code automation, explained simply — no jargon.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE}/${locale}/blog`,
      languages: {
        en: `${BASE}/en/blog`,
        fa: `${BASE}/fa/blog`,
        'x-default': `${BASE}/en/blog`,
      },
    },
    openGraph: { title, description, type: 'website', locale },
    twitter: { card: 'summary', title, description },
  }
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const posts = await getPublishedPosts(locale)
  const t = await getTranslations('blog')

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      <div className="pt-[72px]">
        <BlogListContent
          posts={posts}
          locale={locale}
          strings={{
            title: t('title'),
            subtitle: t('subtitle'),
            empty: t('empty'),
            readMore: t('readMore'),
          }}
        />
      </div>
      <Footer />
      <AIAssistant />
    </main>
  )
}
