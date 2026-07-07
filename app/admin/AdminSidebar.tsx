'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/admin',               label: 'Dashboard',       exact: true  },
  { href: '/admin/content',       label: 'Content',         exact: false },
  { href: '/admin/knowledge',     label: 'Knowledge Base',  exact: false },
  { href: '/admin/conversations', label: 'Conversations',   exact: false },
  { href: '/admin/prompts',       label: 'Prompt Settings', exact: false },
  { href: '/admin/settings',      label: 'Settings',        exact: false },
]

async function handleLogout() {
  try {
    await fetch('/api/admin/logout', { method: 'POST' })
  } finally {
    window.location.href = '/admin/login'
  }
}

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{
        width:         '224px',
        background:    '#111111',
        flexShrink:    0,
        display:       'flex',
        flexDirection: 'column',
        position:      'sticky',
        top:            0,
        height:        '100vh',
        overflowY:     'auto',
      }}
    >
      {/* Brand */}
      <div
        style={{
          padding:      '28px 20px 22px',
          borderBottom: '0.5px solid rgba(255,255,255,0.08)',
        }}
      >
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#FFFDF8', letterSpacing: '-0.01em' }}>
          Maddy the Techie
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '7px' }}>
          <span
            style={{
              display:     'inline-block',
              width:        '6px',
              height:       '6px',
              borderRadius: '50%',
              background:   '#34D399',
              flexShrink:   0,
            }}
          />
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.02em' }}>
            Chatbot Admin
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        <p
          style={{
            margin:        '0 0 8px 10px',
            fontSize:       '10px',
            fontWeight:     600,
            letterSpacing:  '0.12em',
            textTransform:  'uppercase',
            color:          'rgba(255,255,255,0.22)',
          }}
        >
          Navigation
        </p>
        {NAV.map(item => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display:       'flex',
                alignItems:    'center',
                padding:        '9px 10px',
                paddingLeft:    isActive ? '8px' : '10px',
                borderRadius:   '8px',
                fontSize:       '13.5px',
                fontWeight:     isActive ? 600 : 400,
                textDecoration: 'none',
                marginBottom:   '2px',
                background:     isActive ? 'rgba(227,78,46,0.14)' : 'transparent',
                color:          isActive ? '#E34E2E' : 'rgba(255,255,255,0.55)',
                borderLeft:     isActive ? '2px solid #E34E2E' : '2px solid transparent',
                transition:     'background 0.15s, color 0.15s',
              }}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
        <button
          onClick={handleLogout}
          style={{
            display:        'flex',
            alignItems:     'center',
            width:          '100%',
            padding:         '9px 10px',
            borderRadius:    '8px',
            fontSize:        '13px',
            fontWeight:      400,
            color:           'rgba(255,255,255,0.40)',
            background:      'transparent',
            border:          'none',
            cursor:          'pointer',
            textAlign:       'left',
            marginBottom:    '4px',
            transition:      'color 0.15s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#E34E2E')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.40)')}
        >
          Log out
        </button>
        <Link
          href="/en"
          style={{
            display:        'block',
            padding:         '6px 10px',
            fontSize:        '12px',
            color:           'rgba(255,255,255,0.22)',
            textDecoration:  'none',
          }}
        >
          ← Back to site
        </Link>
      </div>
    </aside>
  )
}
