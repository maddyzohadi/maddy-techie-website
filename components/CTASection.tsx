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

  if (isFa) {
    return (
      <section
        id="contact"
        className="py-24 md:py-32 relative overflow-hidden scroll-mt-24"
        style={{ background: '#eeefe9', borderTop: '1px solid #d2d3cc' }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="flex justify-center mb-8">
            <span
              className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.22em] px-5 py-2"
              style={{ background: '#fdfdf8', border: '1px solid #d2d3cc', borderRadius: '9999px', color: '#65675e' }}
            >
              <Zap size={11} style={{ color: '#f1a82c' }} />
              {t('badge')}
            </span>
          </div>

          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight" style={{ color: '#111827', letterSpacing: '-0.025em' }}>
            {t('title')}{' '}
            <span style={{ color: '#4d4f46' }}>{t('titleHighlight')}</span>
          </h2>

          <p className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: '#4d4f46' }}>
            {t('subtitle')}
          </p>

          <div className="mb-5">
            <StarterKitCTA label={t('starterKitLabel')} className="w-full sm:w-auto justify-center" />
          </div>

          <div className="mb-16">
            <Link
              href="/services"
              className="font-body text-base transition-opacity hover:opacity-80"
              style={{ color: '#2f80fa' }}
            >
              {t('getStarterKit')}
            </Link>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-3 md:gap-5 py-5 px-6"
            style={{ borderRadius: '4px', background: '#ffffff', border: '1px solid #d2d3cc' }}
          >
            {pills.map((pill) => (
              <div key={pill.textKey} className="flex items-center gap-2 font-body text-sm" style={{ color: '#4d4f46' }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#9ea096' }} />
                {t(pill.textKey)}
              </div>
            ))}
          </div>

        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden scroll-mt-24"
      style={{ background: '#e8400d' }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 font-body text-sm md:text-base font-semibold uppercase tracking-[0.22em] px-5 py-2 rounded-full"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', color: '#ffffff' }}
          >
            <Zap size={11} style={{ fill: '#ffffff' }} />
            {t('badge')}
          </span>
        </div>

        <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight" style={{ color: '#ffffff' }}>
          {t('title')}{' '}
          <span style={{ color: 'rgba(255,255,255,0.80)' }}>{t('titleHighlight')}</span>
        </h2>

        <p className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.82)' }}>
          {t('subtitle')}
        </p>

        <div className="mb-5">
          <StarterKitCTA label={t('starterKitLabel')} className="w-full sm:w-auto justify-center" />
        </div>

        <div className="mb-16">
          <Link
            href="/services"
            className="font-body text-base transition-opacity hover:opacity-90"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            {t('getStarterKit')}
          </Link>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-5 py-5 px-6 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)' }}
        >
          {pills.map((pill) => (
            <div key={pill.textKey} className="flex items-center gap-2 font-body text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.65)' }} />
              {t(pill.textKey)}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
