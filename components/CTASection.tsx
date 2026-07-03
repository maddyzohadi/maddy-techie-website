'use client'

import { Zap } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import StarterKitCTA from './StarterKitCTA'
import { Link } from '@/i18n/navigation'

export default function CTASection() {
  const t = useTranslations('cta')
  const locale = useLocale()
  const isFa = locale === 'fa'

  const pills = [
    { textKey: 'pill0' as const },
    { textKey: 'pill1' as const },
    { textKey: 'pill2' as const },
  ]

  // ── EN: editorial style matching Start Today CTA ─────────────────────
  if (!isFa) {
    return (
      <section
        id="contact"
        dir="ltr"
        style={{
          background: [
            'radial-gradient(ellipse 70% 90% at 85% 0%, rgba(227,78,46,0.14) 0%, rgba(244,160,130,0.09) 40%, transparent 68%)',
            '#FFFDF8',
          ].join(', '),
          padding: 'clamp(80px, 10vw, 116px) clamp(24px, 8vw, 80px)',
          borderTop: '0.5px solid rgba(17,17,17,0.07)',
          scrollMarginTop: '88px',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>

          {/* Eyebrow */}
          <p
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: '#E34E2E',
              marginBottom: '24px',
            }}
          >
            {t('badge')}
          </p>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontWeight: 400,
              color: '#111111',
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              marginBottom: '24px',
            }}
          >
            {t('title')}{' '}
            <em style={{ fontStyle: 'italic' }}>{t('titleHighlight')}</em>
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(16px, 1.4vw, 18px)',
              color: '#625B55',
              lineHeight: 1.72,
              maxWidth: '520px',
              margin: '0 auto 44px',
            }}
          >
            {t('subtitle')}
          </p>

          {/* Primary CTA */}
          <div style={{ marginBottom: '20px' }}>
            <StarterKitCTA label={t('starterKitLabel')} dark />
          </div>

          {/* Secondary link */}
          <div style={{ marginBottom: '44px' }}>
            <Link
              href="/services"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '15px',
                color: '#8C7E74',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
            >
              {t('getStarterKit')}
            </Link>
          </div>

          {/* Pills as inline separated text */}
          <p
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '13px',
              color: '#8C7E74',
              lineHeight: 1.7,
            }}
          >
            {pills.map((pill, i) => (
              <span key={pill.textKey}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    style={{ margin: '0 12px', color: 'rgba(17,17,17,0.20)' }}
                  >
                    ·
                  </span>
                )}
                {t(pill.textKey)}
              </span>
            ))}
          </p>

        </div>
      </section>
    )
  }

  // ── FA: keep existing design unchanged ───────────────────────────────
  return (
    <section
      id="contact"
      className="pt-14 pb-14 md:pt-20 md:pb-20 relative overflow-hidden scroll-mt-24"
      style={{ background: '#FAF1E6', borderTop: '0.5px solid #E6D7C8' }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div className="flex justify-center mb-5">
          <span
            className="inline-flex items-center gap-2 font-ui text-[13px] font-bold uppercase tracking-[0.12em] px-5 py-2 rounded-full bg-brand-surface text-brand-coral"
          >
            <Zap size={11} style={{ color: '#3F8DDE' }} />
            {t('badge')}
          </span>
        </div>

        <h2
          className="font-fa text-2xl md:text-3xl lg:text-4xl max-w-xl font-bold mb-5 leading-tight mx-auto"
          style={{ color: '#111111' }}
        >
          {t('title')}{' '}
          <span style={{ color: '#625B55' }}>{t('titleHighlight')}</span>
        </h2>

        <p
          className="font-fa text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
          style={{ color: '#625B55' }}
        >
          {t('subtitle')}
        </p>

        <div className="mb-4">
          <StarterKitCTA label={t('starterKitLabel')} className="w-full sm:w-auto justify-center" />
        </div>

        <div className="mb-10">
          <Link
            href="/services"
            className="font-fa text-base transition-opacity hover:opacity-80"
            style={{ color: '#625B55' }}
          >
            {t('getStarterKit')}
          </Link>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-2 md:gap-4 py-3.5 px-5 max-w-sm mx-auto"
          style={{
            borderRadius: '12px',
            background: 'rgba(230,215,200,0.40)',
            border: '0.5px solid #E6D7C8',
          }}
        >
          {pills.map((pill) => (
            <div
              key={pill.textKey}
              className="flex items-center gap-2 font-fa text-sm"
              style={{ color: '#625B55' }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-brand-blue opacity-60" />
              {t(pill.textKey)}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
