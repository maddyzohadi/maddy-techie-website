import { NextRequest, NextResponse } from 'next/server'
import { requireAdminUser } from '@/lib/admin/auth'
import { createClient } from '@/lib/supabase/server'
import { isValidCoverUrl } from '@/lib/blog/validation'
import { revalidateBlogPaths } from '@/lib/blog/revalidate'
import { getPostForAdmin } from '@/lib/blog/queries'
import type { Locale } from '@/lib/blog/types'

const POST_FIELDS = ['cover_image_url', 'cover_alt_en', 'cover_alt_fa', 'category_en', 'category_fa', 'author'] as const

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const { id } = await params
  const post = await getPostForAdmin(id)
  if (!post) return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const { id } = await params
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (typeof body.cover_image_url === 'string' && !isValidCoverUrl(body.cover_image_url)) {
    return NextResponse.json({ error: 'Invalid cover image URL.' }, { status: 400 })
  }

  const updates: Record<string, unknown> = {}
  for (const key of POST_FIELDS) {
    if (key in body) updates[key] = body[key]
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle()

  if (error || !data) {
    return NextResponse.json({ error: 'Failed to update post.' }, { status: 500 })
  }

  // Cover/category/author changes affect every published translation's
  // rendered page — revalidate all of them.
  const { data: translations } = await supabase
    .from('post_translations')
    .select('locale, slug, status')
    .eq('post_id', id)

  for (const t of translations ?? []) {
    if (t.status === 'published') revalidateBlogPaths({ locale: t.locale as Locale, slug: t.slug })
  }

  return NextResponse.json({ post: data })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const { id } = await params
  const supabase = await createClient()

  const { data: translations } = await supabase
    .from('post_translations')
    .select('locale, slug, status')
    .eq('post_id', id)

  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) {
    return NextResponse.json({ error: 'Failed to delete post.' }, { status: 500 })
  }

  for (const t of translations ?? []) {
    if (t.status === 'published') revalidateBlogPaths({ locale: t.locale as Locale, slug: t.slug })
  }

  return NextResponse.json({ ok: true })
}
