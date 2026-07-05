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

  // ── FA: editorial CTA matching EN quality ────────────────────────────
  const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

  return (
    <section
      id="contact"
      dir="rtl"
      style={{
        background: [
          'radial-gradient(ellipse 70% 90% at 15% 0%, rgba(227,78,46,0.12) 0%, rgba(244,160,130,0.07) 40%, transparent 68%)',
          '#FFFDF8',
        ].join(', '),
        padding:         'clamp(80px, 10vw, 116px) clamp(24px, 8vw, 80px)',
        borderTop:       '0.5px solid rgba(17,17,17,0.07)',
        scrollMarginTop: '88px',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily:    vaFont,
            fontSize:      '11px',
            fontWeight:     700,
            letterSpacing: '0.16em',
            color:          '#E34E2E',
            marginBottom:  '24px',
          }}
        >
          آماده‌ای شروع کنی؟
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily:    vaFont,
            fontSize:      'clamp(30px, 4.5vw, 60px)',
            fontWeight:     800,
            color:          '#111111',
            lineHeight:     1.18,
            letterSpacing: '-0.01em',
            marginBottom:  '24px',
          }}
        >
          اولین سیستم کاری خودت را با هوش مصنوعی بساز
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily:  vaFont,
            fontSize:    'clamp(15px, 1.4vw, 18px)',
            color:       '#625B55',
            lineHeight:   1.80,
            maxWidth:    '540px',
            margin:      '0 auto 44px',
          }}
        >
          از یک آموزش ساده شروع کن، بعد با قالب‌ها و جریان‌های کاری آماده، استفاده از هوش مصنوعی را وارد کار روزمره‌ات کن
        </p>

        {/* Primary CTA */}
        <div style={{ marginBottom: '20px' }}>
          <a
            href="#training"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              padding:        '16px 40px',
              background:     '#E34E2E',
              color:          '#FFFDF8',
              borderRadius:   '100px',
              textDecoration: 'none',
              fontFamily:      vaFont,
              fontSize:        '16px',
              fontWeight:       700,
              transition:      'background 0.15s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = '#C63C1E'
              ;(e.currentTarget as HTMLAnchorElement).style.transform  = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = '#E34E2E'
              ;(e.currentTarget as HTMLAnchorElement).style.transform  = 'translateY(0)'
            }}
          >
            شروع یادگیری
          </a>
        </div>

        {/* Secondary link */}
        <div style={{ marginBottom: '44px' }}>
          <Link
            href="/templates"
            style={{
              fontFamily:     vaFont,
              fontSize:       '15px',
              color:           '#8C7E74',
              textDecoration: 'none',
              transition:     'color 0.15s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#111111'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#8C7E74'
            }}
          >
            دیدن قالب‌ها ←
          </Link>
        </div>

        {/* Pills */}
        <p
          style={{
            fontFamily: vaFont,
            fontSize:   '13px',
            color:      '#8C7E74',
            lineHeight:  1.7,
          }}
        >
          {['بدون کدنویسی', 'بدون پیش‌نیاز فنی', 'کاربردی از همان ابتدا'].map((label, i) => (
            <span key={label}>
              {i > 0 && (
                <span aria-hidden="true" style={{ margin: '0 12px', color: 'rgba(17,17,17,0.20)' }}>·</span>
              )}
              {label}
            </span>
          ))}
        </p>

      </div>
    </section>
  )
}
