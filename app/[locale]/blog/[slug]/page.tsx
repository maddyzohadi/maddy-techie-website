import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import BlogPostContent from '@/components/blog/BlogPostContent'
import { getPublishedPostBySlug } from '@/lib/blog/queries'
import { getSiteUrl } from '@/lib/siteUrl'
import type { Locale } from '@/lib/blog/types'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string }
  const post = await getPublishedPostBySlug(locale, slug)
  if (!post) return {}

  const BASE = getSiteUrl()
  const url = `${BASE}/${locale}/blog/${slug}`
  const title = post.translation.seo_title || post.translation.title
  const description = post.translation.meta_description || post.translation.excerpt

  // Only include an alternate-language link if that translation actually
  // exists and is published — never point hreflang at a page that 404s.
  const languages: Record<string, string> = { [locale]: url }
  if (post.counterpart) {
    languages[post.counterpart.locale] = `${BASE}/${post.counterpart.locale}/blog/${post.counterpart.slug}`
  }
  languages['x-default'] = languages.en ?? url

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      publishedTime: post.translation.published_at ?? undefined,
      modifiedTime: post.translation.updated_at,
      images: post.post.cover_image_url ? [{ url: post.post.cover_image_url }] : undefined,
      locale,
      alternateLocale: post.counterpart ? [post.counterpart.locale] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.post.cover_image_url ? [post.post.cover_image_url] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string }
  const post = await getPublishedPostBySlug(locale, slug)

  // Drafts and missing translations 404 publicly — RLS already hides them
  // from this query entirely, this is the page-level backstop.
  if (!post) notFound()

  const t = await getTranslations('blog')
  const BASE = getSiteUrl()
  const url = `${BASE}/${locale}/blog/${slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.translation.title,
    description: post.translation.meta_description || post.translation.excerpt,
    image: post.post.cover_image_url ? [post.post.cover_image_url] : undefined,
    datePublished: post.translation.published_at ?? undefined,
    dateModified: post.translation.updated_at,
    author: post.post.author ? { '@type': 'Person', name: post.post.author } : undefined,
    inLanguage: locale,
    mainEntityOfPage: url,
    url,
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <div className="pt-[72px]">
        <BlogPostContent
          post={post}
          strings={{
            backToBlog: t('backToBlog'),
            readInEnglish: t('readInEnglish'),
            readInPersian: t('readInPersian'),
            publishedOn: t('publishedOn'),
          }}
        />
      </div>
      <Footer />
      <AIAssistant />
    </main>
  )
}
