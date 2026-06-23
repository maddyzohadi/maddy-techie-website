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
      style={{ background: '#F5F0EB', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 font-ui text-sm font-semibold uppercase tracking-[0.22em] px-5 py-2 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.05)',
              border: '0.5px solid rgba(0,0,0,0.08)',
              color: '#666',
            }}
          >
            <Zap size={11} style={{ color: '#1A1A1A' }} />
            {t('badge')}
          </span>
        </div>

        <h2
          className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight`}
          style={{ color: '#1A1A1A' }}
        >
          {t('title')}{' '}
          <span style={{ color: '#999' }}>{t('titleHighlight')}</span>
        </h2>

        <p
          className={`${isFa ? 'font-fa' : 'font-ui'} text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10`}
          style={{ color: '#666' }}
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
            style={{ color: '#666' }}
          >
            {t('getStarterKit')}
          </Link>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-5 py-5 px-6"
          style={{
            borderRadius: '12px',
            background: 'rgba(0,0,0,0.04)',
            border: '0.5px solid rgba(0,0,0,0.08)',
          }}
        >
          {pills.map((pill) => (
            <div
              key={pill.textKey}
              className={`flex items-center gap-2 ${isFa ? 'font-fa' : 'font-ui'} text-sm`}
              style={{ color: '#666' }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#bbb' }} />
              {t(pill.textKey)}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
