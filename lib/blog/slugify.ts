import type { Locale } from './types'

// English: ascii slug. Persian: keep Persian letters (they're valid,
// readable, and good for SEO in URLs) and just normalize separators.
export function slugify(input: string, locale: Locale): string {
  const trimmed = input.trim()

  if (locale === 'en') {
    return trimmed
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '') // strip accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  // Persian: allow Persian/Arabic letters + digits, collapse everything
  // else (spaces, punctuation) into single hyphens.
  return trimmed
    .replace(/[^؀-ۿݐ-ݿ0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
