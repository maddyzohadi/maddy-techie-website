import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import StarterKitCTA from './StarterKitCTA'

const INSTAGRAM_URL = 'https://instagram.com/maddythetechie'
const LINKEDIN_URL = 'https://linkedin.com/in/maddythetechie'

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default async function Footer() {
  const t = await getTranslations('footer')
  const locale = await getLocale()

  const legalLinks = [
    { labelKey: 'privacy' as const, href: '#' },
    { labelKey: 'terms'   as const, href: '#' },
  ]

  const gradientText = {
    background: 'linear-gradient(135deg, #6B9FFF, #A78BFA)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
  }

  return (
    <footer className="relative" style={{ background: '#02060D', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(107,159,255,0.30) 20%, rgba(167,139,250,0.20) 80%, transparent 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* Main grid: left (social + contact) | right (CTA) */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 mb-12">

          {/* Left column */}
          <div className="flex flex-col gap-9">

            {/* Social links */}
            <div>
              <p
                className="font-body text-xs font-semibold uppercase tracking-[0.20em] mb-4"
                style={{ color: '#6B9FFF' }}
              >
                {t('socialLabel')}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-body text-sm transition-colors duration-200 hover:text-soft-white w-fit"
                  style={{ color: '#9DA8BE' }}
                >
                  <InstagramIcon />
                  {t('instagram')}
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-body text-sm transition-colors duration-200 hover:text-soft-white w-fit"
                  style={{ color: '#9DA8BE' }}
                >
                  <LinkedInIcon />
                  {t('linkedin')}
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p
                className="font-body text-xs font-semibold uppercase tracking-[0.20em] mb-3"
                style={{ color: '#6B9FFF' }}
              >
                {t('contactLabel')}
              </p>
              <a
                href="mailto:hello@maddythetechie.com"
                className="font-body text-sm transition-colors duration-200 hover:text-soft-white"
                style={{ color: '#9DA8BE' }}
              >
                hello@maddythetechie.com
              </a>
            </div>
          </div>

          {/* Right column: CTA */}
          <div className="flex flex-col justify-start max-w-lg">
            <h3
              className="font-heading font-bold text-xl md:text-2xl mb-3"
              style={gradientText}
            >
              {t('ctaTitle')}
            </h3>
            <p
              className="font-body text-sm leading-relaxed mb-7"
              style={{ color: '#8A9AB0', maxWidth: '420px' }}
            >
              {t('ctaBody')}
            </p>
            <StarterKitCTA />
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

          <div>
            <span className="font-heading font-bold text-sm" style={gradientText}>
              Maddy the Techie
            </span>
            <p className="font-body text-xs mt-1.5" style={{ color: 'rgba(106,122,142,0.60)' }}>
              {t('tagline')}
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
