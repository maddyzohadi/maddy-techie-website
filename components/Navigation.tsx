'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const navLinks: { key: 'home' | 'learn' | 'templates' | 'services' | 'about'; href: string }[] = [
  { key: 'home',      href: '/'         },
  { key: 'learn',     href: '/learn'    },
  { key: 'templates', href: '/templates'},
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
          scrolled ? 'backdrop-blur-xl border-b' : 'bg-transparent'
        }`}
        style={scrolled
          ? { background: 'rgba(26,26,46,0.95)', borderBottomColor: 'rgba(245,240,232,0.08)' }
          : {}}
      >
        <div className="max-w-[1480px] mx-auto px-6 lg:px-14">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 flex-shrink-0"
            >
              <div
                style={{
                  width: '30px', height: '30px', borderRadius: '9px',
                  background: '#7B2FBE',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF', lineHeight: 1 }}>M</span>
              </div>
              <span className="font-ui hidden sm:inline" style={{ fontSize: '15.5px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                <span style={{ fontWeight: 600, color: '#F5F0E8' }}>Maddy</span>
                <span style={{ fontWeight: 500, color: 'rgba(245,240,232,0.60)' }}> the Techie</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center" style={{ gap: '24px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="font-ui font-medium transition-colors duration-200 cursor-pointer"
                  style={{ fontSize: '14.5px', color: isActive(link.href) ? '#F5F0E8' : 'rgba(245,240,232,0.60)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#F5F0E8' }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = isActive(link.href) ? '#F5F0E8' : 'rgba(245,240,232,0.60)'
                  }}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            {/* Desktop right: lang switcher + CTA */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
              <div
                className="flex items-center gap-1 rounded-full px-1 py-1"
                style={{ background: 'rgba(123,47,190,0.15)', border: '0.5px solid rgba(123,47,190,0.30)' }}
              >
                <Link
                  href={pathname}
                  locale="en"
                  className="px-3 py-1 rounded-full font-ui font-semibold transition-all duration-200"
                  style={{
                    fontSize: '12px',
                    ...(locale === 'en'
                      ? { background: '#7B2FBE', color: '#FFFFFF' }
                      : { color: 'rgba(245,240,232,0.60)' }),
                  }}
                >
                  EN
                </Link>
                <Link
                  href={pathname}
                  locale="fa"
                  className="px-3 py-1 rounded-full font-ui font-semibold transition-all duration-200"
                  style={{
                    fontSize: '12px',
                    ...(locale === 'fa'
                      ? { background: '#7B2FBE', color: '#FFFFFF' }
                      : { color: 'rgba(245,240,232,0.60)' }),
                  }}
                >
                  FA
                </Link>
              </div>

              <Link
                href="/services"
                className="font-ui font-medium inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-88 cursor-pointer"
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#7B2FBE',
                  color: '#ffffff',
                  border: 'none',
                  textDecoration: 'none',
                }}
              >
                {t('startProject')}
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl transition-colors cursor-pointer"
              style={{ color: 'rgba(245,240,232,0.70)' }}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{ background: 'rgba(26,26,46,0.80)' }}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute left-0 right-0 mx-4 rounded-2xl transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
          style={{
            top: '80px',
            background: '#1A1A2E',
            border: '0.5px solid rgba(123,47,190,0.30)',
          }}
        >
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3.5 rounded-xl font-ui font-medium transition-all duration-200 cursor-pointer"
                style={{
                  fontSize: '15px',
                  color: isActive(link.href) ? '#F5F0E8' : 'rgba(245,240,232,0.60)',
                  background: isActive(link.href) ? 'rgba(123,47,190,0.12)' : undefined,
                }}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="pt-3 mt-2 flex flex-col gap-3" style={{ borderTop: '0.5px solid rgba(245,240,232,0.10)' }}>
              <div className="flex items-center gap-2 px-1">
                <Link
                  href={pathname}
                  locale="en"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl font-ui font-semibold transition-all duration-200"
                  style={{
                    fontSize: '14px',
                    ...(locale === 'en'
                      ? { color: '#FFFFFF', background: '#7B2FBE' }
                      : { color: 'rgba(245,240,232,0.60)' }),
                  }}
                >
                  English
                </Link>
                <Link
                  href={pathname}
                  locale="fa"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl font-ui font-semibold transition-all duration-200"
                  style={{
                    fontSize: '14px',
                    ...(locale === 'fa'
                      ? { color: '#FFFFFF', background: '#7B2FBE' }
                      : { color: 'rgba(245,240,232,0.60)' }),
                  }}
                >
                  فارسی
                </Link>
              </div>
              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className="font-ui font-medium inline-flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-88 cursor-pointer"
                style={{
                  padding: '13px 20px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  background: '#7B2FBE',
                  color: '#ffffff',
                  border: 'none',
                  textDecoration: 'none',
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
