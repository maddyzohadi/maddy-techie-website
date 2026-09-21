import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const password = typeof body.password === 'string' ? body.password : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''

  // ── Supabase Auth path (used whenever an email is submitted) ───────────
  if (email) {
    if (!password) {
      return NextResponse.json({ error: 'Password is required.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error || !data.user) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 })
    }

    if (data.user.app_metadata?.is_admin !== true) {
      await supabase.auth.signOut()
      return NextResponse.json({ error: 'This account is not authorized for admin access.' }, { status: 403 })
    }

    // @supabase/ssr already wrote the session cookies onto this request's
    // cookie store via lib/supabase/server.ts's setAll handler.
    return NextResponse.json({ ok: true })
  }

  // ── Legacy shared-password path (fallback during the auth migration) ───
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD is not configured.' },
      { status: 500 },
    )
  }

  if (!password || password !== adminPassword) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  }

  // Derive a session token from the password (never sent back to client)
  const token = createHash('sha256')
    .update(adminPassword + ':maddy_admin_v1')
    .digest('hex')

  const res = new NextResponse(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
  res.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: req.nextUrl.protocol === 'https:',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return res
}
