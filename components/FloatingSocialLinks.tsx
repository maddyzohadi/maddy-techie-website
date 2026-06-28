'use client'

import { useEffect, useRef, useState } from 'react'

const INSTAGRAM_URL = 'https://instagram.com/maddythetechie'
const TELEGRAM_URL  = 'https://t.me/maddythetechie_bot'
const SPOTIFY_URL   = 'https://open.spotify.com/user/maddythetechie'
const X_URL         = 'https://x.com/maddythetechie'
const LINKEDIN_URL  = 'https://www.linkedin.com/in/maddy-techie-08362b418/'

const btnBase: React.CSSProperties = {
  display:              'flex',
  alignItems:           'center',
  justifyContent:       'center',
  width:                '40px',
  height:               '40px',
  borderRadius:         '100px',
  background:           'rgba(255,255,255,0.85)',
  backdropFilter:       'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  border:               '0.5px solid rgba(0,0,0,0.08)',
  cursor:               'pointer',
  transition:           'background 200ms ease, color 200ms ease, transform 200ms ease',
  textDecoration:       'none',
  flexShrink:           0,
}

function SocialLink({
  href,
  label,
  color,
  children,
}: {
  href:     string
  label:    string
  color:    string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ ...btnBase, color }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.background  = '#111111'
        el.style.color       = '#fff'
        el.style.transform   = 'scale(1.08) translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.background  = 'rgba(255,255,255,0.85)'
        el.style.color       = color
        el.style.transform   = 'scale(1) translateY(0)'
      }}
    >
      {children}
    </a>
  )
}

export default function FloatingSocialLinks() {
  const [visible, setVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion — keep always visible
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const show = () => setVisible(true)
    const hide = () => {
      setVisible(false)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(show, 600)
    }

    window.addEventListener('scroll', hide, { passive: true })
    return () => {
      window.removeEventListener('scroll', hide)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position:        'fixed',
        right:           '1rem',
        top:             '55%',
        transform:       'translateY(-50%)',
        zIndex:          40,
        display:         'flex',
        flexDirection:   'column',
        gap:             '10px',
        pointerEvents:   visible ? 'auto' : 'none',
        opacity:         visible ? 1 : 0,
        transition:      'opacity 0.35s ease',
      }}
    >
      <SocialLink href={INSTAGRAM_URL} label="Instagram" color="#E1306C">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </SocialLink>

      <SocialLink href={TELEGRAM_URL} label="Telegram" color="#229ED9">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      </SocialLink>

      <SocialLink href={SPOTIFY_URL} label="Spotify" color="#1DB954">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </SocialLink>

      <SocialLink href={X_URL} label="X" color="#999">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </SocialLink>

      <SocialLink href={LINKEDIN_URL} label="LinkedIn" color="#0A66C2">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </SocialLink>
    </div>
  )
}
