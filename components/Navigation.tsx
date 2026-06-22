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
  const isFa = locale === 'fa'
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
          scrolled ? 'backdrop-blur-xl border-b shadow-[0_4px_24px_rgba(177,177,175,0.08)]' : 'bg-transparent'
        }`}
        style={scrolled
          ? { background: locale === 'fa' ? 'rgba(225,215,194,0.95)' : 'rgba(252,250,238,0.92)', borderBottomColor: locale === 'fa' ? '#d2d3cc' : '#ecebea' }
          : {}}
      >
        {/* Gradient accent line on scroll */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(177,177,175,0.40) 30%, rgba(177,177,175,0.30) 70%, transparent 100%)' }}
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
                  background: 'linear-gradient(150deg, #272625, #272625)',
                  boxShadow: '0 0 14px rgba(177,177,175,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF', lineHeight: 1 }}>M</span>
              </div>
              <span className="font-body hidden sm:inline" style={{ fontSize: '15.5px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                <span style={{ fontWeight: 600, color: '#272625' }}>Maddy</span>
                <span style={{ fontWeight: 500, color: '#6d6c6b' }}> the Techie</span>
              </span>
            </Link>

            {/* Desktop nav — shown at lg+ */}
            <nav className="hidden lg:flex items-center" style={{ gap: '24px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="font-body font-medium transition-colors duration-200 cursor-pointer"
                  style={{ fontSize: '14.5px', color: isActive(link.href) ? (isFa ? '#2f80fa' : '#272625') : (isFa ? '#65675e' : '#6d6c6b') }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = isFa ? '#111827' : '#272625' }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = isActive(link.href) ? (isFa ? '#2f80fa' : '#272625') : (isFa ? '#65675e' : '#6d6c6b')
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
                style={{ background: '#f4f3ef', border: '1px solid #ecebea' }}
              >
                <Link
                  href={pathname}
                  locale="en"
                  className="px-3 py-1 rounded-full font-body font-semibold transition-all duration-200"
                  style={{
                    fontSize: '12px',
                    ...(locale === 'en'
                      ? { background: '#f4f3ef', color: '#272625' }
                      : { color: '#6d6c6b' }),
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
                      ? { background: '#f4f3ef', color: '#272625' }
                      : { color: '#6d6c6b' }),
                  }}
                >
                  FA
                </Link>
              </div>

              <Link
                href="/services"
                className="font-body font-medium inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
                style={isFa ? {
                  padding: '9px 16px',
                  border: '1px solid #b17816',
                  borderRadius: '4px',
                  fontSize: '14.5px',
                  background: '#f1a82c',
                  color: '#000000',
                } : {
                  padding: '9px 16px',
                  border: '1px solid #272625',
                  borderRadius: '999px',
                  fontSize: '14.5px',
                  color: '#272625',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  if (isFa) { el.style.background = '#eb9d2a' } else { el.style.background = '#f4f3ef'; el.style.color = '#272625' }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  if (isFa) { el.style.background = '#f1a82c' } else { el.style.background = 'transparent'; el.style.color = '#272625' }
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
              style={{ color: '#6d6c6b' }}
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
          style={{ background: 'rgba(252,250,238,0.80)' }}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute left-0 right-0 mx-4 rounded-2xl shadow-2xl transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
          style={{
            top: '80px',
            background: '#FFFFFF',
            border: '1px solid #ecebea',
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
                  color: isActive(link.href) ? '#272625' : '#6d6c6b',
                  background: isActive(link.href) ? '#f4f3ef' : undefined,
                }}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="pt-3 mt-2 flex flex-col gap-3" style={{ borderTop: '1px solid #ecebea' }}>
              <div className="flex items-center gap-2 px-1">
                <Link
                  href={pathname}
                  locale="en"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl font-body font-semibold transition-all duration-200"
                  style={{
                    fontSize: '14px',
                    ...(locale === 'en'
                      ? { color: '#272625', background: '#f4f3ef' }
                      : { color: '#6d6c6b' }),
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
                      ? { color: '#272625', background: '#f4f3ef' }
                      : { color: '#6d6c6b' }),
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
                  border: '1px solid #272625',
                  borderRadius: '999px',
                  fontSize: '15px',
                  color: '#272625',
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
