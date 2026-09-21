'use client'

import BlogPostContent from '@/components/blog/BlogPostContent'
import type { Post, PostTranslation } from '@/lib/blog/types'

// Renders the exact public post template against in-memory (possibly
// unsaved) draft state — used for "preview before publishing." Uses plain
// next/link internally (see BlogPostContent), so it works here even though
// /admin has no next-intl provider in its tree.
export default function BlogPreview({ post, translation, onClose }: {
  post: Post
  translation: PostTranslation
  onClose: () => void
}) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#FFF9F1', zIndex: 200, overflowY: 'auto' }}>
      <div
        style={{
          position: 'sticky', top: 0, zIndex: 1, background: '#111111', color: '#fff',
          padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 600 }}>
          Preview — {translation.status === 'published' ? 'Published' : 'Draft'} ({translation.locale.toUpperCase()})
        </span>
        <button
          onClick={onClose}
          style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px' }}
        >
          Close preview
        </button>
      </div>
      <BlogPostContent
        post={{ post, translation, counterpart: null }}
        strings={{
          backToBlog: `← Back to ${translation.locale === 'fa' ? 'Persian' : 'English'} Blog`,
          readInEnglish: 'Read in English',
          readInPersian: 'Read in Persian',
          publishedOn: 'Published',
        }}
      />
    </div>
  )
}
