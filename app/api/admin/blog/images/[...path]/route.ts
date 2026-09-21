import { NextRequest, NextResponse } from 'next/server'
import { requireAdminUser } from '@/lib/admin/auth'
import { createClient } from '@/lib/supabase/server'

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const { path } = await params
  const fullPath = path.join('/')

  const supabase = await createClient()
  const { error } = await supabase.storage.from('blog-images').remove([fullPath])

  if (error) {
    return NextResponse.json({ error: 'Failed to delete image.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
