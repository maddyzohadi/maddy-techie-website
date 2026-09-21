'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const navLinks: { key: 'home' | 'learn' | 'templates' | 'services' | 'about' | 'blog'; href: string }[] = [
  { key: 'home',      href: '/'          },
  { key: 'learn',     href: '/learn'     },
  { key: 'templates', href: '/templates' },
  { key: 'services',  href: '/services'  },
  { key: 'about',     href: '/about'     },
  { key: 'blog',      href: '/blog'      },
]

export default function Navigation() {
  const t        = useTranslations('nav')
  const locale   = useLocale()
  const pathname = usePathname()
  const isFa     = locale === 'fa'

  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!langOpen) return
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [langOpen])

  const isActive   = (href: string) => pathname === href
  const navFont    = isFa ? "'Noto Naskh Arabic', serif" : "system-ui, sans-serif"
  const activeColor = '#E34E2E'

  return (
    <>
      <header
        dir={isFa ? 'rtl' : 'ltr'}
        style={{
          position: 'fixed',
          top: '12px',
          left: '12px',
          right: '12px',
          zIndex: 100,
          background: 'rgba(255,249,241,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '16px',
          border: '0.5px solid rgba(17,17,17,0.08)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.10)'
            : '0 2px 12px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.25s',
        }}
      >
        <div style={{ maxWidth: '1480px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

            {/* Logo + Desktop nav — grouped left */}
            <div className="flex items-center" style={{ gap: '28px' }}>
              <Link href="/" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#111111',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Maddy the Techie
                </span>
              </Link>

              <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '20px' }}>
                {navLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.key}
                      href={link.href}
                      style={{
                        fontFamily: navFont,
                        fontSize: isFa ? '14px' : '12px',
                        fontWeight: active ? 600 : 500,
                        color: active ? activeColor : '#625B55',
                        textDecoration: 'none',
                        transition: 'color 0.15s',
                        textTransform: isFa ? 'none' : 'uppercase',
                        letterSpacing: isFa ? 'normal' : '0.07em',
                        borderBottom: active ? `1.5px solid ${activeColor}` : '1.5px solid transparent',
                        paddingBottom: '2px',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = activeColor }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = active ? activeColor : '#625B55' }}
                    >
                      {t(link.key)}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Desktop right: language dropdown + CTA */}
            <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '12px', flexShrink: 0 }}>

              {/* Language dropdown */}
              <div ref={langRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px 11px',
                    background: 'transparent',
                    border: '0.5px solid rgba(0,0,0,0.18)',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#333',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <span aria-hidden>🌐</span>
                  <span>{locale.toUpperCase()}</span>
                  <span style={{ fontSize: '8px', opacity: 0.55, marginLeft: '1px' }}>▾</span>
                </button>

                {langOpen && (
                  <div
                    role="listbox"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      insetInlineEnd: 0,
                      background: '#FFFDF8',
                      border: '0.5px solid rgba(0,0,0,0.10)',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.09)',
                      overflow: 'hidden',
                      minWidth: '136px',
                      zIndex: 200,
                    }}
                  >
                    <Link
                      href={pathname}
                      locale="en"
                      onClick={() => setLangOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        fontFamily: 'system-ui, sans-serif',
                        fontSize: '13px',
                        fontWeight: locale === 'en' ? 600 : 500,
                        color: locale === 'en' ? '#111' : '#625B55',
                        textDecoration: 'none',
                        background: locale === 'en' ? 'rgba(0,0,0,0.04)' : 'transparent',
                      }}
                    >
                      English
                      {locale === 'en' && (
                        <span style={{ color: activeColor, fontSize: '11px' }}>✓</span>
                      )}
                    </Link>
                    <Link
                      href={pathname}
                      locale="fa"
                      onClick={() => setLangOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        fontFamily: "'Noto Naskh Arabic', serif",
                        fontSize: '13px',
                        fontWeight: locale === 'fa' ? 600 : 500,
                        color: locale === 'fa' ? '#111' : '#625B55',
                        textDecoration: 'none',
                        background: locale === 'fa' ? 'rgba(0,0,0,0.04)' : 'transparent',
                        borderTop: '0.5px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      فارسی
                      {locale === 'fa' && (
                        <span style={{ color: activeColor, fontSize: '11px', fontFamily: 'system-ui' }}>✓</span>
                      )}
                    </Link>
                  </div>
                )}
              </div>

              {/* CTA */}
              <Link
                href="/services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 20px',
                  background: '#E34E2E',
                  color: '#fff',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  fontFamily: navFont,
                  fontSize: '13px',
                  fontWeight: 600,
                  transition: 'background 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#C43E22' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#E34E2E' }}
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
            left: '12px',
            right: '12px',
            top: '88px',
            background: '#FFFDF8',
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
                  color: isActive(link.href) ? activeColor : '#444',
                  background: isActive(link.href) ? 'rgba(227,78,46,0.06)' : 'transparent',
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
              <span
                style={{
                  padding: '0 8px',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#8C7E74',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Language
              </span>

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

              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '13px 20px',
                  background: '#E34E2E',
                  color: '#fff',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: navFont,
                }}
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
