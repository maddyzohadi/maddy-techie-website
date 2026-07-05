import MotionFadeIn from './MotionFadeIn'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"
const SERIF  = "'DM Serif Display', serif"

export default async function AboutSection() {
  const locale = await getLocale()
  const t      = await getTranslations('about')
  const isFa   = locale === 'fa'

  /* ── FA: editorial two-column layout matching homepage system ── */
  if (isFa) {
    return (
      <section
        id="about"
        dir="rtl"
        style={{
          background:      '#F1E8DD',
          padding:         'clamp(96px, 12vw, 140px) clamp(24px, 8vw, 80px)',
          borderTop:       '0.5px solid rgba(17,17,17,0.07)',
          scrollMarginTop: '88px',
        }}
      >
        <MotionFadeIn>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              className="grid grid-cols-1 md:grid-cols-[196px_1fr] gap-10 md:gap-[72px]"
              style={{ alignItems: 'start' }}
            >

              {/* Right: section label (first in DOM = right in RTL) */}
              <div style={{ paddingTop: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '16px' }}>
                  <span style={{
                    fontFamily:    SERIF,
                    fontStyle:     'italic',
                    fontSize:      'clamp(38px, 4vw, 58px)',
                    color:          '#E34E2E',
                    lineHeight:     1,
                    letterSpacing: '-0.02em',
                  }}>
                    04
                  </span>
                  <span style={{
                    fontFamily:    vaFont,
                    fontSize:      '11px',
                    fontWeight:     700,
                    letterSpacing: '0.10em',
                    color:          '#8C7E74',
                  }}>
                    درباره
                  </span>
                </div>
                <div style={{ height: '0.5px', background: 'rgba(17,17,17,0.14)' }} />
              </div>

              {/* Left: content */}
              <div>
                <h2 style={{
                  fontFamily:    vaFont,
                  fontSize:      'clamp(26px, 3.2vw, 48px)',
                  fontWeight:     800,
                  color:          '#111111',
                  lineHeight:     1.28,
                  letterSpacing: '-0.01em',
                  marginBottom:  '28px',
                }}>
                  آموزش هوش مصنوعی برای ساده‌تر کردن کارهای پیچیده
                </h2>

                <p style={{
                  fontFamily:   vaFont,
                  fontSize:     'clamp(15px, 1.4vw, 18px)',
                  color:        '#625B55',
                  lineHeight:    1.85,
                  marginBottom: '40px',
                  maxWidth:     '560px',
                }}>
                  Maddy the Techie برای افرادی ساخته شده که می‌خواهند از هوش مصنوعی در کارهای واقعی استفاده کنند، بدون اینکه در اصطلاحات فنی، ابزارهای گیج‌کننده یا کدنویسی گیر بیفتند
                </p>

                <Link
                  href="/about"
                  style={{
                    display:        'inline-block',
                    fontFamily:      vaFont,
                    fontSize:       '16px',
                    fontWeight:      700,
                    color:           '#111111',
                    textDecoration: 'none',
                    paddingBottom:  '6px',
                    borderBottom:   '1.5px solid rgba(17,17,17,0.22)',
                    transition:     'opacity 0.15s',
                  }}
                >
                  درباره مدی بیشتر بخوان ←
                </Link>
              </div>

            </div>
          </div>
        </MotionFadeIn>
      </section>
    )
  }

  /* ── EN: editorial two-column layout ── */
  return (
    <section
      id="about"
      dir="ltr"
      style={{
        background: '#F1E8DD',
        padding: 'clamp(96px, 12vw, 140px) clamp(24px, 8vw, 80px)',
        borderTop: '0.5px solid rgba(17,17,17,0.07)',
        scrollMarginTop: '88px',
      }}
    >
      <MotionFadeIn>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            className="grid grid-cols-1 md:grid-cols-[196px_1fr] gap-10 md:gap-[72px]"
            style={{ alignItems: 'start' }}
          >

            {/* Left: section label */}
            <div style={{ paddingTop: '6px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '14px',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontStyle: 'italic',
                    fontSize: 'clamp(52px, 6vw, 80px)',
                    color: '#E34E2E',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  04
                </span>
                <span
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#8C7E74',
                  }}
                >
                  ABOUT
                </span>
              </div>
              <div style={{ height: '0.5px', background: 'rgba(17,17,17,0.14)' }} />
            </div>

            {/* Right: content */}
            <div>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 'clamp(38px, 5vw, 68px)',
                  fontWeight: 400,
                  color: '#111111',
                  lineHeight: 1.06,
                  letterSpacing: '-0.02em',
                  marginBottom: '28px',
                }}
              >
                Practical AI education for modern work
              </h2>

              <p
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: 'clamp(16px, 1.4vw, 19px)',
                  color: '#625B55',
                  lineHeight: 1.72,
                  marginBottom: '40px',
                  maxWidth: '580px',
                }}
              >
                {t('desc1')}
              </p>

              <Link
                href="/about"
                style={{
                  display: 'inline-block',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#111111',
                  textDecoration: 'none',
                  paddingBottom: '6px',
                  borderBottom: '1.5px solid rgba(17,17,17,0.22)',
                  transition: 'opacity 0.15s',
                }}
              >
                {t('ctaLabel')} →
              </Link>
            </div>

          </div>
        </div>
      </MotionFadeIn>
    </section>
  )
}

