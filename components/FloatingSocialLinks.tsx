'use client'

const INSTAGRAM_URL = 'https://instagram.com/maddythetechie'
const SPOTIFY_URL   = 'https://open.spotify.com/user/maddythetechie'
const X_URL         = 'https://x.com/maddythetechie'
const LINKEDIN_URL  = 'https://www.linkedin.com/in/maddy-techie-08362b418/'

const btnBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '100px',
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  border: '0.5px solid rgba(0,0,0,0.08)',
  cursor: 'pointer',
  transition: 'background 200ms ease, color 200ms ease, transform 200ms ease',
  textDecoration: 'none',
  flexShrink: 0,
}

function SocialLink({
  href,
  label,
  color,
  children,
}: {
  href: string
  label: string
  color: string
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
        el.style.background = '#1A1A1A'
        el.style.color = '#fff'
        el.style.transform = 'scale(1.08) translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.background = 'rgba(255,255,255,0.85)'
        el.style.color = color
        el.style.transform = 'scale(1) translateY(0)'
      }}
    >
      {children}
    </a>
  )
}

export default function FloatingSocialLinks() {
  return (
    <div
      style={{
        position: 'fixed',
        right: '1rem',
        top: '55%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'auto',
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
