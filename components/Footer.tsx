import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import FooterIconStrip from './FooterIconStrip'

const NAV_LINKS = [
  { labelKey: 'home'      as const, href: '/'                      },
  { labelKey: 'learn'     as const, href: '/learn'                 },
  { labelKey: 'templates' as const, href: '/templates'             },
  { labelKey: 'services'  as const, href: '/services'              },
  { labelKey: 'about'     as const, href: '/about'                 },
  { labelKey: 'contact'   as const, href: '/services#contact-form' },
] as const

const LEGAL_LINKS = [
  { labelKey: 'privacy' as const, href: '#' },
  { labelKey: 'terms'   as const, href: '#' },
] as const

const BORDER = '#D8C7B8'

export default async function Footer() {
  const t      = await getTranslations('footer')
  const locale = await getLocale()
  const isFa   = locale === 'fa'

  const bodyFont    = isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif'
  const headingFont = isFa ? "'Noto Naskh Arabic', serif" : "'DM Serif Display', serif"

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#F5ECE0', borderTop: `0.5px solid ${BORDER}` }}
    >

      {/* Very subtle top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent, #B53389, transparent)',
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top: brand + icon strip ── */}
        <div
          className="pt-14 pb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
          style={{
            borderBottom: `0.5px solid ${BORDER}`,
            direction: isFa ? 'rtl' : 'ltr',
          }}
        >
          {/* Brand */}
          <div className="max-w-sm">
            <div
              className="font-bold text-xl mb-3"
              style={{
                fontFamily: headingFont,
                color: '#111111',
                letterSpacing: '-0.01em',
              }}
            >
              Maddy the Techie
            </div>

            <p
              className="text-sm leading-relaxed mb-2"
              style={{ fontFamily: bodyFont, color: '#5A504A' }}
            >
              {t('brand')}
            </p>

            <p
              className="text-xs mb-6 font-semibold uppercase tracking-[0.12em]"
              style={{ color: 'rgba(90,80,74,0.60)', fontFamily: 'system-ui, sans-serif' }}
            >
              {t('motto')}
            </p>

            <Link
              href="/services#contact-form"
              className="footer-cta-link inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {t('startProject')}
              <ArrowRight size={13} className={isFa ? 'rotate-180' : ''} />
            </Link>
          </div>

          {/* Animated icon cluster */}
          <FooterIconStrip />
        </div>

        {/* ── Nav links ── */}
        <nav
          className="py-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
          style={{
            borderBottom: `0.5px solid ${BORDER}`,
            direction: isFa ? 'rtl' : 'ltr',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="footer-nav-link-dark font-ui text-sm"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        {/* ── Bottom bar ── */}
        <div
          className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ direction: isFa ? 'rtl' : 'ltr' }}
        >

          {/* Copyright + disclaimer */}
          <div className="flex flex-col gap-1">
            <p className="font-ui text-xs" style={{ color: '#5A504A' }}>
              {'© '}
              <span dir="ltr">2026</span>
              {' Maddy the Techie'}
            </p>
            <p className="font-ui text-xs" style={{ color: 'rgba(90,80,74,0.55)' }}>
              {t('disclaimer')}
            </p>
          </div>

          {/* Locale switcher + legal */}
          <div className="flex items-center gap-5">

            {/* Language */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '11px',
                  color: '#5A504A',
                }}
              >
                Language:
              </span>
              <Link
                href="/"
                locale="en"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: locale === 'en' ? 600 : 400,
                  color: locale === 'en' ? '#B53389' : '#5A504A',
                  textDecoration: 'none',
                }}
              >
                English
              </Link>
              <span style={{ color: '#D8C7B8', fontSize: '11px' }}>|</span>
              <Link
                href="/"
                locale="fa"
                style={{
                  fontFamily: "'Noto Naskh Arabic', serif",
                  fontSize: '12px',
                  fontWeight: locale === 'fa' ? 600 : 400,
                  color: locale === 'fa' ? '#B53389' : '#5A504A',
                  textDecoration: 'none',
                }}
              >
                فارسی
              </Link>
            </div>

            {/* Legal */}
            <div className="flex gap-4">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.labelKey}
                  href={link.href}
                  className="footer-nav-link-dark font-ui text-xs"
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
