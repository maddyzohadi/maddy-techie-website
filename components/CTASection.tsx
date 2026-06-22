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

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden scroll-mt-24"
      style={{ background: '#1A1A2E', borderTop: '0.5px solid rgba(245,240,232,0.08)' }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 font-ui text-sm font-semibold uppercase tracking-[0.22em] px-5 py-2 rounded-full"
            style={{
              background: 'rgba(123,47,190,0.15)',
              border: '0.5px solid rgba(245,240,232,0.15)',
              color: 'rgba(245,240,232,0.80)',
            }}
          >
            <Zap size={11} style={{ color: '#E8B86D' }} />
            {t('badge')}
          </span>
        </div>

        <h2
          className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight`}
          style={{ color: '#F5F0E8' }}
        >
          {t('title')}{' '}
          <span style={{ color: 'rgba(245,240,232,0.60)' }}>{t('titleHighlight')}</span>
        </h2>

        <p
          className={`${isFa ? 'font-fa' : 'font-ui'} text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10`}
          style={{ color: 'rgba(245,240,232,0.60)' }}
        >
          {t('subtitle')}
        </p>

        <div className="mb-5">
          <StarterKitCTA label={t('starterKitLabel')} className="w-full sm:w-auto justify-center" />
        </div>

        <div className="mb-16">
          <Link
            href="/services"
            className={`${isFa ? 'font-fa' : 'font-ui'} text-base transition-opacity hover:opacity-80`}
            style={{ color: 'rgba(245,240,232,0.55)' }}
          >
            {t('getStarterKit')}
          </Link>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-5 py-5 px-6"
          style={{
            borderRadius: '12px',
            background: 'rgba(123,47,190,0.12)',
            border: '0.5px solid rgba(245,240,232,0.10)',
          }}
        >
          {pills.map((pill) => (
            <div
              key={pill.textKey}
              className={`flex items-center gap-2 ${isFa ? 'font-fa' : 'font-ui'} text-sm`}
              style={{ color: 'rgba(245,240,232,0.70)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(245,240,232,0.40)' }} />
              {t(pill.textKey)}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
