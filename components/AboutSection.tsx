import MotionFadeIn from './MotionFadeIn'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

export default async function AboutSection() {
  const locale = await getLocale()
  const t      = await getTranslations('about')
  const isFa   = locale === 'fa'

  /* ── FA: keep existing editorial design unchanged ── */
  if (isFa) {
    return (
      <>
        <section
          id="about"
          dir="rtl"
          className="py-24 md:py-32 relative scroll-mt-[88px]"
          style={{ background: '#FFF9F1', borderTop: '0.5px solid #E6D7C8' }}
        >
          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionFadeIn>
              <div>
                <span
                  className="inline-flex items-center font-fa text-[13px] font-bold uppercase tracking-[0.06em] mb-4 px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(156,204,239,0.14)', color: '#E34E2E', border: '0.5px solid rgba(156,204,239,0.30)' }}
                >
                  {t('badge')}
                </span>

                <h2
                  className="font-fa font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight"
                  style={{ color: '#111111', lineHeight: 1.4 }}
                >
                  {t('title')}
                  <br />
                  <span style={{ color: '#625B55' }}>{t('titleHighlight')}</span>
                </h2>

                <p
                  className="font-fa text-lg leading-relaxed mb-10"
                  style={{ color: '#625B55' }}
                >
                  {t('desc1')}
                </p>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 font-fa font-semibold text-base px-9 py-4 rounded-full text-white no-underline"
                  style={{ background: '#3F8DDE' }}
                >
                  {t('ctaLabel')}
                  <ArrowRight size={16} className="rotate-180" />
                </Link>
              </div>
            </MotionFadeIn>
          </div>
        </section>

        <FaFinalCTA />
      </>
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

async function FaFinalCTA() {
  const t = await getTranslations('homepageFaCta')
  return (
    <section
      className="py-20 md:py-24 relative overflow-hidden"
      style={{ background: '#FAF1E6', borderTop: '0.5px solid #E6D7C8' }}
    >
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="font-fa font-bold text-2xl md:text-3xl mb-4 leading-snug"
          style={{ color: '#111111' }}
        >
          {t('title')}
        </h2>
        <p
          className="font-fa text-base md:text-lg leading-relaxed mb-8"
          style={{ color: '#625B55' }}
        >
          {t('subtitle')}
        </p>
        <Link
          href="/services#contact-form"
          className="inline-flex items-center gap-2.5 font-fa font-semibold text-base px-9 py-4"
          style={{
            background:     '#111111',
            color:          '#ffffff',
            borderRadius:   '100px',
            border:         'none',
            textDecoration: 'none',
          }}
        >
          {t('cta')}
          <ArrowRight size={16} className="rotate-180" />
        </Link>
      </div>
    </section>
  )
}
