import { NextResponse } from 'next/server'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

type AdminAuthResult =
  | { user: User; error?: undefined }
  | { user?: undefined; error: NextResponse }

/**
 * Every admin API route must call this independently — middleware does not
 * run for /api/* in this app, and RLS alone isn't a substitute for an
 * explicit check at the route (defense in depth: route check + RLS both
 * have to agree before any write happens).
 */
export async function requireAdminUser(): Promise<AdminAuthResult> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return { error: NextResponse.json({ error: 'Not authenticated.' }, { status: 401 }) }
  }

  if (user.app_metadata?.is_admin !== true) {
    return { error: NextResponse.json({ error: 'Not authorized.' }, { status: 403 }) }
  }

  return { user }
}
