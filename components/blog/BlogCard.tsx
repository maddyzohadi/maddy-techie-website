import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/lib/blog/types'
import type { PublicPost } from '@/lib/blog/types'

export default function BlogCard({ post, locale, readMoreLabel }: {
  post: PublicPost
  locale: Locale
  readMoreLabel: string
}) {
  const isFa = locale === 'fa'
  const category = isFa ? post.post.category_fa : post.post.category_en
  const coverAlt = (isFa ? post.post.cover_alt_fa : post.post.cover_alt_en) || post.translation.title
  const bodyFont = isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif'
  const headingFont = isFa ? "'Noto Naskh Arabic', serif" : "'DM Serif Display', serif"

  const date = post.translation.published_at
    ? new Date(post.translation.published_at).toLocaleDateString(isFa ? 'fa-IR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null

  return (
    <Link
      href={`/blog/${post.translation.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        background: '#FFFDF8',
        border: '0.5px solid rgba(17,17,17,0.09)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
      className="hover:shadow-lg hover:-translate-y-0.5"
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#FAF1E6' }}>
        {post.post.cover_image_url && (
          <Image
            src={post.post.cover_image_url}
            alt={coverAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {category && (
          <span
            style={{
              alignSelf: isFa ? 'flex-end' : 'flex-start',
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
        <h3
          style={{
            margin: 0,
            fontFamily: headingFont,
            fontSize: '18px',
            fontWeight: 700,
            color: '#111111',
            lineHeight: 1.35,
          }}
        >
          {post.translation.title}
        </h3>
        {post.translation.excerpt && (
          <p style={{ margin: 0, fontFamily: bodyFont, fontSize: '14px', color: '#625B55', lineHeight: 1.6 }}>
            {post.translation.excerpt}
          </p>
        )}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px' }}>
          {date && (
            <span style={{ fontFamily: bodyFont, fontSize: '12px', color: '#8C7E74' }}>{date}</span>
          )}
          <span style={{ fontFamily: bodyFont, fontSize: '13px', fontWeight: 600, color: '#E34E2E' }}>
            {readMoreLabel} {isFa ? '←' : '→'}
          </span>
        </div>
      </div>
    </Link>
  )
}
