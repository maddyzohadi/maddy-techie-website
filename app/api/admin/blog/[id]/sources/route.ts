import { NextRequest, NextResponse } from 'next/server'
import { requireAdminUser } from '@/lib/admin/auth'
import { createClient } from '@/lib/supabase/server'
import type { ArticleSource } from '@/lib/blog/types'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('article_sources')
    .select('*')
    .eq('post_id', id)
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: 'Failed to load sources.' }, { status: 500 })
  }

  return NextResponse.json({ sources: (data ?? []) as ArticleSource[] })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const { id } = await params
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const supabase = await createClient()
  const row = {
    post_id: id,
    title: String(body.title ?? ''),
    source_name: String(body.source_name ?? ''),
    url: String(body.url ?? ''),
    published_at: body.published_at ? String(body.published_at) : null,
    date_accessed: body.date_accessed ? String(body.date_accessed) : new Date().toISOString(),
    evidence_summary: String(body.evidence_summary ?? ''),
    supported_claims: String(body.supported_claims ?? ''),
    is_verified: Boolean(body.is_verified),
  }

  const { data, error } = await supabase
    .from('article_sources')
    .insert(row)
    .select()
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Failed to create source.' }, { status: 500 })
  }

  return NextResponse.json({ source: data as ArticleSource }, { status: 201 })
}
