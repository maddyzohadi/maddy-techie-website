import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

const EXPLORE_LINKS = [
  { labelKey: 'home'      as const, href: '/'         },
  { labelKey: 'learn'     as const, href: '/learn'    },
  { labelKey: 'templates' as const, href: '/templates'},
  { labelKey: 'services'  as const, href: '/services' },
  { labelKey: 'about'     as const, href: '/about'    },
] as const

const LEGAL_LINKS = [
  { labelKey: 'privacy' as const, href: '#' },
  { labelKey: 'terms'   as const, href: '#' },
] as const

const BORDER = 'rgba(17,17,17,0.09)'

export default async function Footer() {
  const t      = await getTranslations('footer')
  const locale = await getLocale()
  const isFa   = locale === 'fa'

  const bodyFont = isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif'

  return (
    <footer
      style={{
        background: '#FFFDF8',
        borderTop: `0.5px solid ${BORDER}`,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(24px, 8vw, 80px)',
        }}
      >

        {/* ── Main grid: brand | explore | get started ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-14 md:gap-20"
          style={{
            paddingTop: 'clamp(56px, 8vw, 80px)',
            paddingBottom: 'clamp(48px, 7vw, 72px)',
            borderBottom: `0.5px solid ${BORDER}`,
            direction: isFa ? 'rtl' : 'ltr',
            alignItems: 'start',
          }}
        >

          {/* ── Brand column ── */}
          <div style={{ maxWidth: '380px' }}>
            {/* Stylised brand name */}
            <div style={{ marginBottom: '10px' }}>
              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 'clamp(20px, 2vw, 24px)',
                  fontWeight: 700,
                  color: '#111111',
                  letterSpacing: '-0.01em',
                }}
              >
                Maddy
              </span>
              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(20px, 2vw, 24px)',
                  color: '#E34E2E',
                  letterSpacing: '-0.01em',
                  marginLeft: '5px',
                }}
              >
                the Techie
              </span>
            </div>

            {/* Tagline */}
            <p
              style={{
                fontFamily: bodyFont,
                fontSize: '14px',
                color: '#625B55',
                marginBottom: '20px',
                letterSpacing: '0.01em',
              }}
            >
              {isFa ? t('motto') : 'Human + AI, made practical.'}
            </p>

            {/* Description */}
            <p
              style={{
                fontFamily: bodyFont,
                fontSize: '15px',
                color: '#5A504A',
                lineHeight: 1.72,
              }}
            >
              {t('brand')}
            </p>
          </div>

          {/* ── Explore column ── */}
          <div>
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#8C7E74',
                marginBottom: '24px',
              }}
            >
              {isFa ? 'صفحات' : 'Explore'}
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {EXPLORE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: isFa ? "'Noto Naskh Arabic', serif" : "'DM Serif Display', serif",
                    fontSize: 'clamp(16px, 1.5vw, 20px)',
                    fontWeight: 400,
                    color: '#111111',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Get Started column ── */}
          <div style={{ minWidth: '220px' }}>
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#8C7E74',
                marginBottom: '24px',
              }}
            >
              {isFa ? 'شروع کن' : 'Get Started'}
            </p>

            <Link
              href="/learn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 28px',
                background: '#111111',
                color: '#FFFDF8',
                borderRadius: '100px',
                textDecoration: 'none',
                fontFamily: bodyFont,
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '20px',
                transition: 'background 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {isFa ? 'شروع یادگیری' : 'Start learning AI'}
              <span
                aria-hidden
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(255,253,248,0.15)',
                  fontSize: '12px',
                  flexShrink: 0,
                }}
              >
                ↗
              </span>
            </Link>

            <p
              style={{
                fontFamily: bodyFont,
                fontSize: '13px',
                color: '#8C7E74',
                lineHeight: 1.65,
                maxWidth: '200px',
              }}
            >
              {isFa
                ? 'آموزش، قالب‌ها، و گردش‌کارها — بدون اسپم.'
                : 'Newsletter, templates, and workflow drops — no spam.'}
            </p>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            padding: 'clamp(20px, 3vw, 28px) 0',
            direction: isFa ? 'rtl' : 'ltr',
          }}
        >
          {/* Copyright */}
          <p
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '12px',
              color: '#8C7E74',
            }}
          >
            {'© '}
            <span dir="ltr">2026</span>
            {' Maddy the Techie.'}
            {!isFa && ' Crafted with intent.'}
          </p>

          {/* Right: tagline + language + legal */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            {!isFa && (
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '12px',
                  color: 'rgba(140,126,116,0.60)',
                  fontStyle: 'italic',
                }}
              >
                Human + AI · a signature identity.
              </span>
            )}

            {/* Language */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Link
                href="/"
                locale="en"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: locale === 'en' ? 600 : 400,
                  color: locale === 'en' ? '#E34E2E' : '#8C7E74',
                  textDecoration: 'none',
                }}
              >
                EN
              </Link>
              <span style={{ color: 'rgba(17,17,17,0.15)', fontSize: '11px' }}>|</span>
              <Link
                href="/"
                locale="fa"
                style={{
                  fontFamily: "'Noto Naskh Arabic', serif",
                  fontSize: '12px',
                  fontWeight: locale === 'fa' ? 600 : 400,
                  color: locale === 'fa' ? '#E34E2E' : '#8C7E74',
                  textDecoration: 'none',
                }}
              >
                FA
              </Link>
            </div>

            {/* Legal */}
            <div style={{ display: 'flex', gap: '14px' }}>
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.labelKey}
                  href={link.href}
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '11px',
                    color: '#8C7E74',
                    textDecoration: 'none',
                  }}
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
