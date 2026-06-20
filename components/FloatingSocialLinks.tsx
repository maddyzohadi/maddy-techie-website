'use client'

const INSTAGRAM_URL = 'https://instagram.com/maddythetechie'
const TIKTOK_URL   = 'https://www.tiktok.com/@maddythetechie'
const X_URL        = 'https://x.com/maddythetechie'
const LINKEDIN_URL = 'https://www.linkedin.com/in/maddy-techie-08362b418/'

const IDLE_BORDER   = 'rgba(107,159,255,0.38)'
const HOVER_BORDER  = 'rgba(140,120,255,0.70)'
const IDLE_COLOR    = '#C2D4F0'
const HOVER_COLOR   = '#EEF2F8'
const IDLE_SHADOW   = '0 2px 10px rgba(107,159,255,0.10)'
const HOVER_SHADOW  = '0 4px 22px rgba(107,159,255,0.32), 0 0 10px rgba(167,139,250,0.18)'

const btnBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(18,26,52,0.95) 0%, rgba(22,18,46,0.95) 100%)',
  border: `1.5px solid ${IDLE_BORDER}`,
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  boxShadow: IDLE_SHADOW,
  color: IDLE_COLOR,
  cursor: 'pointer',
  transition: 'transform 200ms ease, border-color 200ms ease, color 200ms ease, box-shadow 200ms ease',
  textDecoration: 'none',
  flexShrink: 0,
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={btnBase}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'scale(1.13) translateY(-1px)'
        el.style.borderColor = HOVER_BORDER
        el.style.color = HOVER_COLOR
        el.style.boxShadow = HOVER_SHADOW
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'scale(1) translateY(0)'
        el.style.borderColor = IDLE_BORDER
        el.style.color = IDLE_COLOR
        el.style.boxShadow = IDLE_SHADOW
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
      <SocialLink href={INSTAGRAM_URL} label="Instagram">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </SocialLink>

      <SocialLink href={TIKTOK_URL} label="TikTok">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </SocialLink>

      <SocialLink href={X_URL} label="X">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </SocialLink>

      <SocialLink href={LINKEDIN_URL} label="LinkedIn">
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
