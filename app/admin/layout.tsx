import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import AdminSidebar from './AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin — Maddy the Techie',
  robots: 'noindex, nofollow',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const session     = cookieStore.get('admin_session')
  // If ADMIN_PASSWORD is not set, always allow (dev mode)
  const isAuth = !process.env.ADMIN_PASSWORD || !!session

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
