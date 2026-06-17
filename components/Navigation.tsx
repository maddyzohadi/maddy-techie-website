'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const navKeys: { key: 'home' | 'learn' | 'templates' | 'projects' | 'workWithMe' | 'about' | 'contact'; href: string }[] = [
  { key: 'home',       href: '#home' },
  { key: 'learn',      href: '#training' },
  { key: 'templates',  href: '#templates' },
  { key: 'projects',   href: '#projects' },
  { key: 'workWithMe', href: '#contact' },
  { key: 'about',      href: '#about' },
  { key: 'contact',    href: '#contact' },
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
            background: 'linear-gradient(90deg, transparent 0%, rgba(91,156,248,0.3) 20%, rgba(139,92,246,0.2) 80%, transparent 100%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <a
              href="#home"
              className="flex flex-col leading-tight group"
              onClick={() => handleNavClick('#home')}
            >
              <span className="font-heading font-bold text-xl text-soft-white group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #5B9CF8, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Maddy the Techie
              </span>
              <span className="text-electric text-xs font-body font-medium tracking-wide" style={{ color: '#5B9CF8' }}>
                Practical AI &amp; Automation
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navKeys.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 ${
                    activeLink === link.href
                      ? 'text-electric bg-electric/[0.08]'
                      : 'text-cool-gray hover:text-soft-white hover:bg-white/[0.04]'
                  }`}
                >
                  {t(link.key)}
                  {activeLink === link.href && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#5B9CF8' }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* Desktop right: language switcher + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language switcher */}
              <div className="flex items-center gap-1 rounded-full px-1 py-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Link
                  href={pathname}
                  locale="en"
                  className={`px-3 py-1 rounded-full text-xs font-body font-semibold transition-all duration-200 ${
                    locale === 'en'
                      ? 'text-white'
                      : 'text-cool-gray hover:text-soft-white'
                  }`}
                  style={locale === 'en' ? { background: 'rgba(91,156,248,0.18)', color: '#5B9CF8' } : {}}
                >
                  EN
                </Link>
                <Link
                  href={pathname}
                  locale="fa"
                  className={`px-3 py-1 rounded-full text-xs font-body font-semibold transition-all duration-200 ${
                    locale === 'fa'
                      ? 'text-white'
                      : 'text-cool-gray hover:text-soft-white'
                  }`}
                  style={locale === 'fa' ? { background: 'rgba(91,156,248,0.18)', color: '#5B9CF8' } : {}}
                >
                  FA
                </Link>
              </div>

              <a
                href="#training"
                className="btn-primary font-body font-semibold text-sm px-5 py-2.5 rounded-full cursor-pointer"
              >
                {t('startLearning')}
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
                    ? 'text-electric bg-electric/[0.08]'
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
                      ? 'text-electric bg-electric/[0.08]'
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
                      ? 'text-electric bg-electric/[0.08]'
                      : 'text-cool-gray hover:text-soft-white hover:bg-white/[0.04]'
                  }`}
                >
                  فارسی
                </Link>
              </div>
              <a
                href="#training"
                onClick={() => handleNavClick('#training')}
                className="block btn-primary font-body font-semibold text-sm px-5 py-3 rounded-full text-center cursor-pointer"
              >
                {t('startLearning')}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
