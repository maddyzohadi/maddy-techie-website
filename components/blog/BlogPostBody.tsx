import type { Locale } from '@/lib/blog/types'
import { sanitizeBody } from '@/lib/blog/sanitize'

// Re-sanitizes at render time too (cheap, and a safety net independent of
// whatever sanitization ran at save time) before this is ever trusted
// enough to go through dangerouslySetInnerHTML.
export default function BlogPostBody({ html, locale }: { html: string; locale: Locale }) {
  const safeHtml = sanitizeBody(html)
  const isFa = locale === 'fa'

  return (
    <div
      dir={isFa ? 'rtl' : 'ltr'}
      className="blog-body"
      style={{ fontFamily: isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif' }}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  )
}
