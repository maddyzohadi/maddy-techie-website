import type { Locale, PublicPost } from '@/lib/blog/types'
import BlogCard from './BlogCard'

export default function BlogListContent({ posts, locale, strings }: {
  posts: PublicPost[]
  locale: Locale
  strings: { title: string; subtitle: string; empty: string; readMore: string }
}) {
  const isFa = locale === 'fa'

  return (
    <section
      dir={isFa ? 'rtl' : 'ltr'}
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px clamp(20px, 6vw, 64px) 96px' }}
    >
      <header style={{ textAlign: isFa ? 'right' : 'left', marginBottom: '48px' }}>
        <h1
          style={{
            margin: '0 0 10px',
            fontFamily: isFa ? "'Noto Naskh Arabic', serif" : "'DM Serif Display', serif",
            fontSize: 'clamp(32px, 5vw, 44px)',
            fontWeight: 700,
            color: '#111111',
          }}
        >
          {strings.title}
        </h1>
        <p style={{ margin: 0, fontFamily: isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif', fontSize: '16px', color: '#625B55' }}>
          {strings.subtitle}
        </p>
      </header>

      {posts.length === 0 ? (
        <p style={{ fontFamily: isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif', fontSize: '15px', color: '#8C7E74', textAlign: 'center', padding: '64px 0' }}>
          {strings.empty}
        </p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '24px' }}
        >
          {posts.map((post) => (
            <BlogCard key={post.translation.id} post={post} locale={locale} readMoreLabel={strings.readMore} />
          ))}
        </div>
      )}
    </section>
  )
}
