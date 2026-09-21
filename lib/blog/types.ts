export type Locale = 'en' | 'fa'
export type PostStatus = 'draft' | 'in_review' | 'approved' | 'published'

export interface Post {
  id: string
  cover_image_url: string | null
  cover_alt_en: string | null
  cover_alt_fa: string | null
  category_en: string | null
  category_fa: string | null
  author: string | null
  topic_key: string | null
  created_at: string
  updated_at: string
}

export interface PostTranslation {
  id: string
  post_id: string
  locale: Locale
  title: string
  slug: string
  excerpt: string
  body: string
  seo_title: string
  meta_description: string
  status: PostStatus
  submitted_for_review_at: string | null
  approved_at: string | null
  approved_by: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface ArticleSource {
  id: string
  post_id: string
  title: string
  source_name: string
  url: string
  published_at: string | null
  date_accessed: string | null
  evidence_summary: string
  supported_claims: string
  is_verified: boolean
  created_at: string
  updated_at: string
}

// A published translation joined with its parent post's shared fields —
// what public pages actually render.
export interface PublicPost {
  post: Post
  translation: PostTranslation
  counterpart: { locale: Locale; slug: string } | null
}

// A post with both translations (whichever exist) — what the admin editor works with.
export interface AdminPost {
  post: Post
  translations: Partial<Record<Locale, PostTranslation>>
}
