import { revalidatePath } from 'next/cache'
import type { Locale } from './types'

interface RevalidateBlogPathsArgs {
  locale: Locale
  slug?: string | null
  previousSlug?: string | null
}

// Called after any create/update/publish/unpublish/delete so changes show
// up immediately without a new deployment (Next's on-demand ISR).
export function revalidateBlogPaths({ locale, slug, previousSlug }: RevalidateBlogPathsArgs): void {
  revalidatePath(`/${locale}/blog`)
  if (slug) revalidatePath(`/${locale}/blog/${slug}`)
  if (previousSlug && previousSlug !== slug) revalidatePath(`/${locale}/blog/${previousSlug}`)
  revalidatePath('/sitemap.xml')
}
