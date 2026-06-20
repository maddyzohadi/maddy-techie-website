'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const navLinks: { key: 'home' | 'learn' | 'templates' | 'projects' | 'services' | 'about'; href: string }[] = [
  { key: 'home',      href: '/'         },
  { key: 'learn',     href: '/learn'    },
  { key: 'templates', href: '/templates'},
  { key: 'projects',  href: '/projects' },
  { key: 'services',  href: '/services' },
  { key: 'about',     href: '/about'    },
]

export default function Navigation() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isActive = (href: string) => pathname === href

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'bg-transparent'
        }`}
        style={scrolled ? { background: 'rgba(8,12,18,0.88)' } : {}}
      >
        {/* Gradient accent line on scroll */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(139,123,255,0.35) 30%, rgba(74,168,255,0.25) 70%, transparent 100%)' }}
        />

        <div className="max-w-[1480px] mx-auto px-6 lg:px-14">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo lockup */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 flex-shrink-0 group"
            >
              <div
                style={{
                  width: '30px', height: '30px', borderRadius: '9px',
                  background: 'linear-gradient(150deg, #8b7bff, #4aa8ff)',
                  boxShadow: '0 0 18px rgba(120,110,255,0.50)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '15px', color: '#0a0a0f', lineHeight: 1 }}>M</span>
              </div>
              <span className="font-body hidden sm:inline" style={{ fontSize: '15.5px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                <span style={{ fontWeight: 600, color: '#f4f3f9' }}>Maddy</span>
                <span style={{ fontWeight: 500, color: '#8e8aa6' }}> the Techie</span>
              </span>
            </Link>

            {/* Desktop nav — shown at lg+ */}
            <nav className="hidden lg:flex items-center" style={{ gap: '24px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="font-body font-medium transition-colors duration-200 cursor-pointer"
                  style={{ fontSize: '14.5px', color: isActive(link.href) ? '#ffffff' : '#a8a6bd' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff' }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = isActive(link.href) ? '#ffffff' : '#a8a6bd'
                  }}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            {/* Desktop right: language switcher + ghost pill CTA */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
              <div
                className="flex items-center gap-1 rounded-full px-1 py-1"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Link
                  href={pathname}
                  locale="en"
                  className="px-3 py-1 rounded-full font-body font-semibold transition-all duration-200"
                  style={{
                    fontSize: '12px',
                    ...(locale === 'en'
                      ? { background: 'rgba(139,123,255,0.18)', color: '#a99bff' }
                      : { color: '#a8a6bd' }),
                  }}
                >
                  EN
                </Link>
                <Link
                  href={pathname}
                  locale="fa"
                  className="px-3 py-1 rounded-full font-body font-semibold transition-all duration-200"
                  style={{
                    fontSize: '12px',
                    ...(locale === 'fa'
                      ? { background: 'rgba(139,123,255,0.18)', color: '#a99bff' }
                      : { color: '#a8a6bd' }),
                  }}
                >
                  FA
                </Link>
              </div>

              <Link
                href="/services"
                className="font-body font-medium inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
                style={{
                  padding: '9px 16px',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: '999px',
                  fontSize: '14.5px',
                  color: '#e9e8f0',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = 'rgba(255,255,255,0.32)'
                  el.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = 'rgba(255,255,255,0.14)'
                  el.style.color = '#e9e8f0'
                }}
              >
                {t('startProject')}
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Mobile hamburger — shown below lg */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl transition-colors cursor-pointer"
              style={{ color: '#a8a6bd' }}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay — shown below lg */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{ background: 'rgba(8,12,18,0.80)' }}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute left-0 right-0 mx-4 rounded-2xl shadow-2xl transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
          style={{
            top: '80px',
            background: 'rgba(13,17,28,0.97)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3.5 rounded-xl font-body font-medium transition-all duration-200 cursor-pointer"
                style={{
                  fontSize: '15px',
                  color: isActive(link.href) ? '#ffffff' : '#a8a6bd',
                  background: isActive(link.href) ? 'rgba(139,123,255,0.07)' : undefined,
                }}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="pt-3 mt-2 flex flex-col gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 px-1">
                <Link
                  href={pathname}
                  locale="en"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl font-body font-semibold transition-all duration-200"
                  style={{
                    fontSize: '14px',
                    ...(locale === 'en'
                      ? { color: '#a99bff', background: 'rgba(139,123,255,0.08)' }
                      : { color: '#a8a6bd' }),
                  }}
                >
                  English
                </Link>
                <Link
                  href={pathname}
                  locale="fa"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl font-body font-semibold transition-all duration-200"
                  style={{
                    fontSize: '14px',
                    ...(locale === 'fa'
                      ? { color: '#a99bff', background: 'rgba(139,123,255,0.08)' }
                      : { color: '#a8a6bd' }),
                  }}
                >
                  فارسی
                </Link>
              </div>
              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className="font-body font-medium inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                style={{
                  padding: '13px 20px',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: '999px',
                  fontSize: '15px',
                  color: '#e9e8f0',
                }}
              >
                {t('startProject')}
                <ArrowRight size={14} />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
