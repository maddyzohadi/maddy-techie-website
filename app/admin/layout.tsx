import type { Metadata } from 'next'
import AdminSidebar from './AdminSidebar'

export const metadata: Metadata = {
  title: 'Chatbot Admin — Maddy the Techie',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
