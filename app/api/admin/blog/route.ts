import { NextRequest, NextResponse } from 'next/server'
import { requireAdminUser } from '@/lib/admin/auth'
import { createClient } from '@/lib/supabase/server'
import { isValidCoverUrl } from '@/lib/blog/validation'
import { listAllPostsForAdmin } from '@/lib/blog/queries'

export async function GET() {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const posts = await listAllPostsForAdmin()
  return NextResponse.json({ posts })
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  let body: Record<string, unknown> = {}
  try {
    body = await req.json()
  } catch {
    // empty body is fine — creates a blank post shell to edit
  }

  const coverUrl = String(body.cover_image_url ?? '')
  if (!isValidCoverUrl(coverUrl)) {
    return NextResponse.json({ error: 'Invalid cover image URL.' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .insert({
      cover_image_url: coverUrl || null,
      cover_alt_en: body.cover_alt_en ? String(body.cover_alt_en) : null,
      cover_alt_fa: body.cover_alt_fa ? String(body.cover_alt_fa) : null,
      category_en: body.category_en ? String(body.category_en) : null,
      category_fa: body.category_fa ? String(body.category_fa) : null,
      author: body.author ? String(body.author) : null,
    })
    .select()
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Failed to create post.' }, { status: 500 })
  }

  return NextResponse.json({ post: data }, { status: 201 })
}
