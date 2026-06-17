'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const navKeys: { key: 'home' | 'learn' | 'templates' | 'projects' | 'workWithMe' | 'about'; href: string }[] = [
  { key: 'home',       href: '#home' },
  { key: 'learn',      href: '#training' },
  { key: 'templates',  href: '#templates' },
  { key: 'projects',   href: '#projects' },
  { key: 'workWithMe', href: '#services' },
  { key: 'about',      href: '#about' },
]

export default function Navigation() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  const [isOpen, setIsOpen]         = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setActiveLink(href)
    setIsOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        {/* Gradient line on scroll */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(107,159,255,0.30) 20%, rgba(167,139,250,0.20) 80%, transparent 100%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <a
              href="#home"
              className="flex flex-col leading-tight group flex-shrink-0"
              onClick={() => handleNavClick('#home')}
            >
              <span
                className="font-heading font-bold text-xl"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #6B9FFF, #A78BFA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Maddy the Techie
              </span>
              <span className="font-body text-xs font-medium tracking-wide" style={{ color: '#6B9FFF' }}>
                Practical AI &amp; Automation
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navKeys.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-3.5 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 ${
                    activeLink === link.href
                      ? 'text-electric bg-electric/[0.07]'
                      : 'text-cool-gray hover:text-soft-white hover:bg-white/[0.04]'
                  }`}
                >
                  {t(link.key)}
                  {activeLink === link.href && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#6B9FFF' }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* Desktop right: language switcher + CTA */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              {/* Language switcher */}
              <div
                className="flex items-center gap-1 rounded-full px-1 py-1"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Link
                  href={pathname}
                  locale="en"
                  className={`px-3 py-1 rounded-full text-xs font-body font-semibold transition-all duration-200 ${
                    locale === 'en' ? '' : 'text-cool-gray hover:text-soft-white'
                  }`}
                  style={locale === 'en' ? { background: 'rgba(107,159,255,0.18)', color: '#6B9FFF' } : {}}
                >
                  EN
                </Link>
                <Link
                  href={pathname}
                  locale="fa"
                  className={`px-3 py-1 rounded-full text-xs font-body font-semibold transition-all duration-200 ${
                    locale === 'fa' ? '' : 'text-cool-gray hover:text-soft-white'
                  }`}
                  style={locale === 'fa' ? { background: 'rgba(107,159,255,0.18)', color: '#6B9FFF' } : {}}
                >
                  FA
                </Link>
              </div>

              <a
                href="#contact"
                onClick={() => handleNavClick('#contact')}
                className="btn-primary inline-flex items-center gap-2 font-body font-semibold text-sm px-5 py-2.5 rounded-full cursor-pointer"
              >
                {t('startProject')}
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-cool-gray hover:text-soft-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-20 left-0 right-0 mx-4 rounded-2xl card-glass border border-white/[0.08] shadow-2xl transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <nav className="flex flex-col p-4 gap-1">
            {navKeys.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-3.5 rounded-xl font-body text-sm font-medium transition-all duration-200 ${
                  activeLink === link.href
                    ? 'text-electric bg-electric/[0.07]'
                    : 'text-cool-gray hover:text-soft-white hover:bg-white/[0.04]'
                }`}
              >
                {t(link.key)}
              </a>
            ))}
            <div className="pt-3 border-t border-white/[0.06] mt-2 flex flex-col gap-3">
              {/* Mobile language switcher */}
              <div className="flex items-center gap-2 px-1">
                <Link
                  href={pathname}
                  locale="en"
                  onClick={() => setIsOpen(false)}
                  className={`flex-1 text-center py-2 rounded-xl text-sm font-body font-semibold transition-all duration-200 ${
                    locale === 'en'
                      ? 'text-electric bg-electric/[0.07]'
                      : 'text-cool-gray hover:text-soft-white hover:bg-white/[0.04]'
                  }`}
                >
                  English
                </Link>
                <Link
                  href={pathname}
                  locale="fa"
                  onClick={() => setIsOpen(false)}
                  className={`flex-1 text-center py-2 rounded-xl text-sm font-body font-semibold transition-all duration-200 ${
                    locale === 'fa'
                      ? 'text-electric bg-electric/[0.07]'
                      : 'text-cool-gray hover:text-soft-white hover:bg-white/[0.04]'
                  }`}
                >
                  فارسی
                </Link>
              </div>
              <a
                href="#contact"
                onClick={() => handleNavClick('#contact')}
                className="btn-primary inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-5 py-3 rounded-full text-center cursor-pointer"
              >
                {t('startProject')}
                <ArrowRight size={14} />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
