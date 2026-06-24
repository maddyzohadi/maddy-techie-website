'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const navLinks: { key: 'home' | 'learn' | 'templates' | 'services' | 'about'; href: string }[] = [
  { key: 'home',      href: '/'          },
  { key: 'learn',     href: '/learn'     },
  { key: 'templates', href: '/templates' },
  { key: 'services',  href: '/services'  },
  { key: 'about',     href: '/about'     },
]

export default function Navigation() {
  const t         = useTranslations('nav')
  const locale    = useLocale()
  const pathname  = usePathname()
  const isFa      = locale === 'fa'

  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isActive = (href: string) => pathname === href
  const navFont  = isFa ? "'Noto Naskh Arabic', serif" : "system-ui, sans-serif"

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(247,243,236,0.85)' : '#F7F3EC',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: '0.5px solid #E7DED2',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
          transition: 'box-shadow 0.25s, backdrop-filter 0.25s, background 0.25s',
        }}
      >
        <div style={{ maxWidth: '1480px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

            {/* Logo */}
            <Link href="/" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', flexShrink: 0 }}>
              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#111111',
                  letterSpacing: '-0.01em',
                }}
              >
                Maddy the Techie
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '28px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  style={{
                    fontFamily: navFont,
                    fontSize: '14px',
                    fontWeight: isActive(link.href) ? 600 : 500,
                    color: isActive(link.href) ? '#111111' : '#555',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                    borderBottom: isActive(link.href) ? '1.5px solid #111111' : '1.5px solid transparent',
                    paddingBottom: '2px',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#111111' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = isActive(link.href) ? '#111111' : '#555' }}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            {/* Desktop right: locale switcher + CTA */}
            <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '12px', flexShrink: 0 }}>

              {/* Locale pill switcher */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  background: 'rgba(0,0,0,0.06)',
                  borderRadius: '100px',
                  padding: '3px',
                }}
              >
                {(['en', 'fa'] as const).map((loc) => (
                  <Link
                    key={loc}
                    href={pathname}
                    locale={loc}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '100px',
                      fontSize: '12px',
                      fontWeight: 600,
                      fontFamily: 'system-ui, sans-serif',
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                      ...(locale === loc
                        ? { background: '#111111', color: '#fff' }
                        : { background: 'transparent', color: '#333' }),
                    }}
                  >
                    {loc.toUpperCase()}
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white rounded-full no-underline bg-brand-orange hover:bg-brand-coral transition-colors duration-150"
                style={{ padding: '10px 22px', fontFamily: navFont }}
              >
                {isFa ? 'شروع پروژه ←' : 'Start a Project →'}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
              style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#111111' }}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className="lg:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          visibility: isOpen ? 'visible' : 'hidden',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.2s, visibility 0.2s',
        }}
      >
        {/* Backdrop */}
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.20)' }}
          onClick={() => setIsOpen(false)}
        />

        {/* Panel */}
        <div
          style={{
            position: 'absolute',
            left: '16px',
            right: '16px',
            top: '80px',
            background: '#fff',
            borderRadius: '16px',
            border: '0.5px solid rgba(0,0,0,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            transform: isOpen ? 'translateY(0)' : 'translateY(-12px)',
            transition: 'transform 0.2s',
            overflow: 'hidden',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', padding: '8px', direction: isFa ? 'rtl' : 'ltr' }}>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontFamily: navFont,
                  fontSize: '15px',
                  fontWeight: isActive(link.href) ? 600 : 500,
                  color: isActive(link.href) ? '#111111' : '#444',
                  background: isActive(link.href) ? 'rgba(0,0,0,0.05)' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {t(link.key)}
              </Link>
            ))}

            <div
              style={{
                padding: '12px 8px 8px',
                marginTop: '4px',
                borderTop: '0.5px solid rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {/* Locale switcher mobile */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  href={pathname}
                  locale="en"
                  onClick={() => setIsOpen(false)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'system-ui, sans-serif',
                    textDecoration: 'none',
                    ...(locale === 'en'
                      ? { background: '#111111', color: '#fff' }
                      : { background: 'rgba(0,0,0,0.05)', color: '#333' }),
                  }}
                >
                  English
                </Link>
                <Link
                  href={pathname}
                  locale="fa"
                  onClick={() => setIsOpen(false)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: "'Noto Naskh Arabic', serif",
                    textDecoration: 'none',
                    ...(locale === 'fa'
                      ? { background: '#111111', color: '#fff' }
                      : { background: 'rgba(0,0,0,0.05)', color: '#333' }),
                  }}
                >
                  فارسی
                </Link>
              </div>

              {/* CTA mobile */}
              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 font-semibold text-white rounded-full no-underline bg-brand-orange hover:bg-brand-coral transition-colors duration-150"
                style={{ padding: '13px 20px', fontSize: '15px', fontFamily: navFont }}
              >
                {isFa ? 'شروع پروژه ←' : 'Start a Project →'}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
