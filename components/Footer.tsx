import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

export default async function Footer() {
  const t = await getTranslations('footer')
  const locale = await getLocale()

  const navLinks = [
    { labelKey: 'learn'     as const, href: '#training' },
    { labelKey: 'templates' as const, href: '#templates' },
    { labelKey: 'projects'  as const, href: '#projects' },
    { labelKey: 'services'  as const, href: '#services' },
    { labelKey: 'about'     as const, href: '#about' },
  ]

  const legalLinks = [
    { labelKey: 'privacy' as const, href: '#' },
    { labelKey: 'terms'   as const, href: '#' },
  ]

  return (
    <footer className="relative" style={{ background: '#02060D', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(107,159,255,0.30) 20%, rgba(167,139,250,0.20) 80%, transparent 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Top: brand left, nav + CTA right */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-7">

          {/* Brand */}
          <div className="max-w-xs">
            <div
              className="font-heading font-bold text-xl mb-2"
              style={{
                background: 'linear-gradient(135deg, #6B9FFF, #A78BFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Maddy the Techie
            </div>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {t('brand')}
            </p>
          </div>

          {/* Nav links + CTA */}
          <div className="flex flex-col gap-4">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm transition-colors duration-200 hover:text-soft-white"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {t(link.labelKey)}
                </a>
              ))}
              <a
                href="https://instagram.com/maddythetechie"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-soft-white"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                {t('instagram')}
              </a>
            </nav>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 font-body font-semibold text-sm self-start transition-opacity duration-200 hover:opacity-80"
              style={{ color: '#6B9FFF' }}
            >
              {t('startProject')}
              <ArrowRight size={13} />
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="section-divider mb-6" />

        {/* Bottom: copyright + disclaimer left, lang switcher + legal right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          <div className="flex flex-col gap-1.5">
            <p className="font-body text-xs" style={{ color: 'rgba(106,122,142,0.65)' }}>
              © <span dir="ltr">2026</span> Maddy the Techie
            </p>
            <p className="font-body text-xs" style={{ color: 'rgba(106,122,142,0.60)' }}>
              {t('disclaimer')}
            </p>
          </div>

          <div className="flex items-center gap-5">
            {/* Language switcher */}
            <div
              className="flex items-center gap-1 rounded-full px-1 py-1"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <Link
                href="/"
                locale="en"
                className={`px-3 py-1 rounded-full text-xs font-body font-semibold transition-all duration-200 ${
                  locale === 'en' ? '' : 'text-cool-gray hover:text-soft-white'
                }`}
                style={locale === 'en' ? { background: 'rgba(107,159,255,0.18)', color: '#6B9FFF' } : {}}
              >
                EN
              </Link>
              <Link
                href="/"
                locale="fa"
                className={`px-3 py-1 rounded-full text-xs font-body font-semibold transition-all duration-200 ${
                  locale === 'fa' ? '' : 'text-cool-gray hover:text-soft-white'
                }`}
                style={locale === 'fa' ? { background: 'rgba(107,159,255,0.18)', color: '#6B9FFF' } : {}}
              >
                FA
              </Link>
            </div>

            {/* Legal links */}
            <div className="flex gap-4">
              {legalLinks.map((link) => (
                <a
                  key={link.labelKey}
                  href={link.href}
                  className="font-body text-xs transition-colors duration-200 hover:text-cool-gray"
                  style={{ color: 'rgba(106,122,142,0.6)' }}
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </footer>
  )
}
