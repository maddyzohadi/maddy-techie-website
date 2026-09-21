import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getSiteUrl } from '@/lib/siteUrl'
import { routing } from '@/i18n/routing'
import type { PostTranslation } from '@/lib/blog/types'

const STATIC_PATHS = ['', '/about', '/services', '/learn', '/templates']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = getSiteUrl()
  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({ url: `${BASE}/${locale}${path}`, lastModified: new Date() })
    }
  }

  const supabase = await createClient()
  const { data } = await supabase
    .from('post_translations')
    .select('locale, slug, updated_at, post_id')
    .eq('status', 'published')

  const rows = (data ?? []) as Pick<PostTranslation, 'locale' | 'slug' | 'updated_at' | 'post_id'>[]

  // One sitemap entry per published translation — never for a draft, and
  // never pointing hreflang at a sibling that isn't published too.
  for (const row of rows) {
    const counterpart = rows.find((r) => r.post_id === row.post_id && r.locale !== row.locale)
    const languages: Record<string, string> = {
      [row.locale]: `${BASE}/${row.locale}/blog/${row.slug}`,
    }
    if (counterpart) {
      languages[counterpart.locale] = `${BASE}/${counterpart.locale}/blog/${counterpart.slug}`
    }

    entries.push({
      url: `${BASE}/${row.locale}/blog/${row.slug}`,
      lastModified: new Date(row.updated_at),
      alternates: { languages },
    })
  }

  return entries
}
