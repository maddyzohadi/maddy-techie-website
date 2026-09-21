import { randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdminUser } from '@/lib/admin/auth'
import { createClient } from '@/lib/supabase/server'
import { validateImageFile } from '@/lib/blog/validation'

const EXT_BY_MIME: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

function folderFor(prefix: string) {
  return prefix === 'cover' ? 'covers' : 'body'
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const formData = await req.formData()
  const file = formData.get('file')
  const folder = folderFor(String(formData.get('prefix') ?? 'body'))

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
  }

  const validationError = validateImageFile({ type: file.type, size: file.size })
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  const ext = EXT_BY_MIME[file.type]
  if (!ext) {
    return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 })
  }

  // Unique, unpredictable filename — never trust the original filename.
  const path = `${folder}/${randomUUID()}.${ext}`

  const supabase = await createClient()
  const buffer = Buffer.from(await file.arrayBuffer())
  const { error } = await supabase.storage.from('blog-images').upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  })

  if (error) {
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 })
  }

  const { data } = supabase.storage.from('blog-images').getPublicUrl(path)
  return NextResponse.json({ url: data.publicUrl, path })
}

export async function GET(req: NextRequest) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const folder = folderFor(req.nextUrl.searchParams.get('prefix') ?? 'body')
  const supabase = await createClient()
  const { data, error } = await supabase.storage.from('blog-images').list(folder, {
    limit: 100,
    sortBy: { column: 'created_at', order: 'desc' },
  })

  if (error || !data) return NextResponse.json({ images: [] })

  const images = data
    .filter((item) => item.id)
    .map((item) => {
      const path = `${folder}/${item.name}`
      const { data: publicUrl } = supabase.storage.from('blog-images').getPublicUrl(path)
      return { path, url: publicUrl.publicUrl }
    })

  return NextResponse.json({ images })
}
