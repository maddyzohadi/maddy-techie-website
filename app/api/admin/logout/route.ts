import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch {
    // Supabase not configured / no session — fine, still clear the legacy cookie below
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_session', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })
  return res
}
