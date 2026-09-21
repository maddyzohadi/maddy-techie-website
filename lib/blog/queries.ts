import { createClient } from '@/lib/supabase/server'
import type { AdminPost, Locale, Post, PostTranslation, PublicPost } from './types'

type TranslationWithPost = PostTranslation & { post: Post }

// ── Public reads (RLS restricts these to status = 'published' regardless
//    of who's asking — anon or a logged-in admin browsing the public site) ──

export async function getPublishedPosts(locale: Locale): Promise<PublicPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('post_translations')
    .select('*, post:posts(*)')
    .eq('locale', locale)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error || !data) return []

  return (data as unknown as TranslationWithPost[]).map((row) => {
    const { post, ...translation } = row
    return { post, translation, counterpart: null }
  })
}

export async function getPublishedPostBySlug(locale: Locale, slug: string): Promise<PublicPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('post_translations')
    .select('*, post:posts(*)')
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  if (error || !data) return null

  const { post, ...translation } = data as unknown as TranslationWithPost
  const otherLocale: Locale = locale === 'en' ? 'fa' : 'en'

  const { data: counterpartRow } = await supabase
    .from('post_translations')
    .select('locale, slug')
    .eq('post_id', translation.post_id)
    .eq('locale', otherLocale)
    .eq('status', 'published')
    .maybeSingle()

  return {
    post,
    translation,
    counterpart: counterpartRow ? { locale: counterpartRow.locale as Locale, slug: counterpartRow.slug } : null,
  }
}

// ── Admin reads (RLS only allows these when the caller's session carries
//    app_metadata.is_admin = true — enforced at the database, not just here) ──

export async function listAllPostsForAdmin(): Promise<AdminPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*, translations:post_translations(*)')
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return data.map((row) => {
    const { translations, ...post } = row as Post & { translations: PostTranslation[] }
    const byLocale: Partial<Record<Locale, PostTranslation>> = {}
    for (const t of translations) byLocale[t.locale] = t
    return { post, translations: byLocale }
  })
}

export async function getPostForAdmin(id: string): Promise<AdminPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*, translations:post_translations(*)')
    .eq('id', id)
    .maybeSingle()

  if (error || !data) return null

  const { translations, ...post } = data as Post & { translations: PostTranslation[] }
  const byLocale: Partial<Record<Locale, PostTranslation>> = {}
  for (const t of translations) byLocale[t.locale] = t
  return { post, translations: byLocale }
}
