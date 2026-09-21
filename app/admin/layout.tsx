import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from './AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin — Maddy the Techie',
  robots: 'noindex, nofollow',
}

// Dual-gate during the Supabase Auth migration: a Supabase admin session OR
// the legacy password cookie is accepted. See proxy.ts for the matching
// middleware-level check.
async function hasSupabaseAdminSession(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user?.app_metadata?.is_admin === true
  } catch {
    return false
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const session     = cookieStore.get('admin_session')
  const supabaseAdmin = await hasSupabaseAdminSession()
  // If ADMIN_PASSWORD is not set and there's no Supabase admin session, dev mode allows through
  const isAuth = supabaseAdmin || !process.env.ADMIN_PASSWORD || !!session

  if (!isAuth) {
    return (
      <div
        style={{
          minHeight:  '100vh',
          background: '#FAF6EF',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      style={{
        display:    'flex',
        minHeight:  '100vh',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <AdminSidebar />
      <div style={{ flex: 1, background: '#FAF6EF', overflow: 'auto', minWidth: 0 }}>
        {children}
      </div>
    </div>
  )
}
