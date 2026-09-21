import sanitizeHtml from 'sanitize-html'

// Allowlist for TipTap's HTML output. Applied on every save (not just
// render) so what's stored in the database is already clean — defense in
// depth in case this config is ever loosened or a row is edited directly.
export function sanitizeBody(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'br', 'strong', 'em', 's', 'u', 'code', 'pre', 'blockquote',
      'h1', 'h2', 'h3', 'h4',
      'ul', 'ol', 'li',
      'a', 'img', 'figure', 'figcaption', 'span',
    ],
    allowedAttributes: {
      a:   ['href', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      span: ['class'],
      '*': [],
    },
    allowedSchemes: ['https', 'http'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
    // Never allow inline event handlers, javascript: URLs, <script>, <style>, <iframe>, etc.
    disallowedTagsMode: 'discard',
  })
}
