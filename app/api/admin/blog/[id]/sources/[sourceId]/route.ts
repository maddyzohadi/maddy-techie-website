import { NextRequest, NextResponse } from 'next/server'
import { requireAdminUser } from '@/lib/admin/auth'
import { createClient } from '@/lib/supabase/server'
import type { ArticleSource } from '@/lib/blog/types'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string; sourceId: string }> }) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const { id, sourceId } = await params
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const supabase = await createClient()
  const updates: Record<string, unknown> = {}

  for (const key of [
    'title',
    'source_name',
    'url',
    'published_at',
    'date_accessed',
    'evidence_summary',
    'supported_claims',
    'is_verified',
  ] as const) {
    if (key in body) updates[key] = key === 'is_verified' ? Boolean(body[key]) : String(body[key] ?? '')
  }

  if (updates.published_at === '') updates.published_at = null
  if (updates.date_accessed === '') updates.date_accessed = null

  const { data, error } = await supabase
    .from('article_sources')
    .update(updates)
    .eq('id', sourceId)
    .eq('post_id', id)
    .select()
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Failed to update source.' }, { status: 500 })
  }

  return NextResponse.json({ source: data as ArticleSource })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string; sourceId: string }> }) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const { id, sourceId } = await params
  const supabase = await createClient()

  const { error } = await supabase
    .from('article_sources')
    .delete()
    .eq('id', sourceId)
    .eq('post_id', id)

  if (error) {
    return NextResponse.json({ error: 'Failed to delete source.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
