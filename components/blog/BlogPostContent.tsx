import Image from 'next/image'
import Link from 'next/link'
import type { PublicPost } from '@/lib/blog/types'
import BlogPostBody from './BlogPostBody'

// Plain next/link with manually-prefixed paths (not the next-intl-aware
// Link) so this component also works inside /admin's preview, which has
// no NextIntlClientProvider in its tree.

export default function BlogPostContent({ post, strings }: {
  post: PublicPost
  strings: {
    backToBlog: string
    readInEnglish: string
    readInPersian: string
    publishedOn: string
  }
}) {
  const { translation, counterpart } = post
  const locale = translation.locale
  const isFa = locale === 'fa'
  const category = isFa ? post.post.category_fa : post.post.category_en
  const coverAlt = (isFa ? post.post.cover_alt_fa : post.post.cover_alt_en) || translation.title
  const headingFont = isFa ? "'Noto Naskh Arabic', serif" : "'DM Serif Display', serif"
  const bodyFont = isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif'

  const date = translation.published_at
    ? new Date(translation.published_at).toLocaleDateString(isFa ? 'fa-IR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null

  return (
    <article dir={isFa ? 'rtl' : 'ltr'} style={{ maxWidth: '760px', margin: '0 auto', padding: '48px clamp(20px, 6vw, 24px) 96px' }}>
      <Link
        href={`/${locale}/blog`}
        style={{
          display: 'inline-block',
          marginBottom: '24px',
          fontFamily: bodyFont,
          fontSize: '13px',
          fontWeight: 600,
          color: '#8C7E74',
          textDecoration: 'none',
        }}
      >
        {strings.backToBlog}
      </Link>

      <header style={{ marginBottom: '28px', textAlign: isFa ? 'right' : 'left' }}>
        {category && (
          <span
            style={{
              display: 'inline-block',
              marginBottom: '14px',
              fontFamily: bodyFont,
              fontSize: '11px',
              fontWeight: 600,
              color: '#C43E22',
              background: 'rgba(227,78,46,0.08)',
              padding: '3px 10px',
              borderRadius: '100px',
              textTransform: isFa ? 'none' : 'uppercase',
              letterSpacing: isFa ? 'normal' : '0.06em',
            }}
          >
            {category}
          </span>
        )}
        <h1
          style={{
            margin: '0 0 14px',
            fontFamily: headingFont,
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: 700,
            color: '#111111',
            lineHeight: 1.3,
          }}
        >
          {translation.title}
        </h1>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontFamily: bodyFont, fontSize: '13px', color: '#8C7E74' }}>
          {post.post.author && <span>{post.post.author}</span>}
          {date && <span>{strings.publishedOn} {date}</span>}
        </div>
      </header>

      {post.post.cover_image_url && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: '16px', overflow: 'hidden', marginBottom: '32px' }}>
          <Image
            src={post.post.cover_image_url}
            alt={coverAlt}
            fill
            sizes="(max-width: 768px) 100vw, 760px"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      <BlogPostBody html={translation.body} locale={locale} />

      {counterpart && (
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '0.5px solid rgba(17,17,17,0.09)' }}>
          <Link
            href={`/${counterpart.locale}/blog/${counterpart.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: counterpart.locale === 'fa' ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: '#E34E2E',
              textDecoration: 'none',
            }}
          >
            {counterpart.locale === 'fa' ? strings.readInPersian : strings.readInEnglish}
            <span aria-hidden>{counterpart.locale === 'fa' ? '←' : '→'}</span>
          </Link>
        </div>
      )}
    </article>
  )
}
