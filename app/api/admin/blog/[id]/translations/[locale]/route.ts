import { NextRequest, NextResponse } from 'next/server'
import { requireAdminUser } from '@/lib/admin/auth'
import { createClient } from '@/lib/supabase/server'
import { sanitizeBody } from '@/lib/blog/sanitize'
import { assertBilingualPublishable, assertStatusTransition, isPostStatus, PublishValidationError } from '@/lib/blog/validation'
import { revalidateBlogPaths } from '@/lib/blog/revalidate'
import type { Locale, PostStatus } from '@/lib/blog/types'

function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'fa'
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string; locale: string }> }) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const { id, locale } = await params
  if (!isLocale(locale)) {
    return NextResponse.json({ error: 'Invalid locale.' }, { status: 400 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!isPostStatus(body.status)) {
    return NextResponse.json({ error: 'Invalid status.' }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('post_translations')
    .select('*')
    .eq('post_id', id)
    .eq('locale', locale)
    .maybeSingle()

  const status = body.status as PostStatus
  try {
    assertStatusTransition(existing?.status as PostStatus | undefined, status)
  } catch (error) {
    if (error instanceof PublishValidationError) {
      return NextResponse.json({ error: error.message }, { status: 409 })
    }
    throw error
  }

  if (status === 'published') {
    const { data: allTranslations, error: translationsError } = await supabase
      .from('post_translations')
      .select('*')
      .eq('post_id', id)

    if (translationsError) {
      return NextResponse.json({ error: 'Failed to load bilingual publication state.' }, { status: 500 })
    }

    const english = allTranslations?.find((translation) => translation.locale === 'en') ?? null
    const persian = allTranslations?.find((translation) => translation.locale === 'fa') ?? null

    try {
      assertBilingualPublishable(english, persian)
    } catch (error) {
      if (error instanceof PublishValidationError) {
        return NextResponse.json({ error: error.message }, { status: 409 })
      }
      throw error
    }

    const { error: publishError } = await supabase.rpc('admin_publish_bilingual_post', {
      p_post_id: id,
    })

    if (publishError) {
      return NextResponse.json({ error: publishError.message }, { status: 409 })
    }

    const { data: publishedTranslations } = await supabase
      .from('post_translations')
      .select('*')
      .eq('post_id', id)

    for (const translation of publishedTranslations ?? []) {
      revalidateBlogPaths({
        locale: translation.locale as Locale,
        slug: translation.slug,
        previousSlug: translation.slug,
      })
    }

    return NextResponse.json({ translations: publishedTranslations ?? [] })
  }

  const now = new Date().toISOString()

  const row = {
    post_id: id,
    locale,
    title: String(body.title ?? ''),
    slug: String(body.slug ?? ''),
    excerpt: String(body.excerpt ?? ''),
    body: sanitizeBody(String(body.body ?? '')),
    seo_title: String(body.seo_title ?? ''),
    meta_description: String(body.meta_description ?? ''),
    status,
    submitted_for_review_at:
      status === 'in_review'
        ? (existing?.submitted_for_review_at ?? now)
        : null,
    approved_at:
      status === 'approved'
        ? (existing?.approved_at ?? now)
        : null,
    approved_by:
      status === 'approved'
        ? (auth.user.id ?? existing?.approved_by ?? null)
        : null,
    published_at: null,
  }

  if (status === 'approved') {
    const { data: sources, error: sourcesError } = await supabase
      .from('article_sources')
      .select('id')
      .eq('post_id', id)
      .eq('is_verified', true)
      .limit(1)

    if (sourcesError) {
      return NextResponse.json({ error: 'Failed to verify article sources.' }, { status: 500 })
    }

    if (!sources || sources.length === 0) {
      return NextResponse.json(
        { error: 'Approval requires at least one verified source for this article.' },
        { status: 409 }
      )
    }
  }

  const { data: saved, error } = await supabase
    .from('post_translations')
    .upsert(row, { onConflict: 'post_id,locale' })
    .select()
    .maybeSingle()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'That slug is already in use for this language.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to save.' }, { status: 500 })
  }

  revalidateBlogPaths({ locale, slug: saved?.slug, previousSlug: existing?.slug })

  return NextResponse.json({ translation: saved })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string; locale: string }> }) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const { id, locale } = await params
  if (!isLocale(locale)) {
    return NextResponse.json({ error: 'Invalid locale.' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: existing } = await supabase
    .from('post_translations')
    .select('slug')
    .eq('post_id', id)
    .eq('locale', locale)
    .maybeSingle()

  const { error } = await supabase
    .from('post_translations')
    .delete()
    .eq('post_id', id)
    .eq('locale', locale)

  if (error) {
    return NextResponse.json({ error: 'Failed to delete translation.' }, { status: 500 })
  }

  if (existing?.slug) {
    revalidateBlogPaths({ locale, slug: existing.slug })
  }

  return NextResponse.json({ ok: true })
}
