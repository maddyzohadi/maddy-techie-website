import { Briefcase, Palette, Store, CheckCircle } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function WhoItsFor() {
  const locale = await getLocale()
  const t = await getTranslations('whoItsFor')
  const isFa = locale === 'fa'

  const cardAccent = {
    bg: 'rgba(123,47,190,0.12)',
    border: 'rgba(123,47,190,0.30)',
    icon: '#1A1A2E',
  }

  const audiences = [
    {
      icon: Briefcase,
      number: '01',
      titleKey: 'aud0title' as const,
      descKey:  'aud0desc'  as const,
      examples: ['aud0ex0', 'aud0ex1', 'aud0ex2', 'aud0ex3'] as const,
    },
    {
      icon: Palette,
      number: '02',
      titleKey: 'aud1title' as const,
      descKey:  'aud1desc'  as const,
      examples: ['aud1ex0', 'aud1ex1', 'aud1ex2', 'aud1ex3'] as const,
    },
    {
      icon: Store,
      number: '03',
      titleKey: 'aud2title' as const,
      descKey:  'aud2desc'  as const,
      examples: ['aud2ex0', 'aud2ex1', 'aud2ex2', 'aud2ex3'] as const,
    },
  ]

  const notKeys = ['not0', 'not1', 'not2', 'not3', 'not4', 'not5'] as const

  return (
    <section
      className="py-24 md:py-32 relative"
      style={{ background: '#F5F0E8', borderTop: '0.5px solid rgba(123,47,190,0.15)' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span
            className="inline-block font-ui text-sm md:text-base font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: 'rgba(26,26,46,0.50)' }}
          >
            {t('badge')}
          </span>
          <h2
            className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight`}
            style={{ color: '#1A1A2E', letterSpacing: '-.02em' }}
          >
            {t('title')}{' '}
            <span style={{ color: 'rgba(26,26,46,0.60)' }}>{t('titleHighlight')}</span>
          </h2>
          <p
            className={`${isFa ? 'font-fa' : 'font-ui'} text-base md:text-lg max-w-2xl mx-auto leading-relaxed`}
            style={{ color: 'rgba(26,26,46,0.60)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {audiences.map((audience) => {
            const Icon = audience.icon
            return (
              <div
                key={audience.number}
                style={{
                  background: '#FFFFFF',
                  border: '0.5px solid rgba(123,47,190,0.25)',
                  borderRadius: '12px',
                  padding: '28px 30px',
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center font-ui font-bold text-sm flex-shrink-0"
                    style={{
                      background: cardAccent.bg,
                      border: `0.5px solid ${cardAccent.border}`,
                      color: '#1A1A2E',
                    }}
                  >
                    <span dir="ltr">{audience.number}</span>
                  </span>
                  <div
                    className="p-2.5 rounded-xl"
                    style={{ background: cardAccent.bg, border: `0.5px solid ${cardAccent.border}` }}
                  >
                    <Icon size={18} style={{ color: cardAccent.icon }} />
                  </div>
                </div>
                <h3
                  className={`${isFa ? 'font-fa' : 'font-en'} font-semibold text-lg md:text-xl mb-3`}
                  style={{ color: '#1A1A2E' }}
                >
                  {t(audience.titleKey)}
                </h3>
                <p
                  className={`${isFa ? 'font-fa' : 'font-ui'} text-sm leading-relaxed mb-5`}
                  style={{ color: 'rgba(26,26,46,0.60)' }}
                >
                  {t(audience.descKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {audience.examples.map((exKey) => (
                    <span
                      key={exKey}
                      className={`${isFa ? 'font-fa' : 'font-ui'} text-xs px-2.5 py-1`}
                      style={{
                        background: '#FFFFFF',
                        border: '0.5px solid rgba(123,47,190,0.25)',
                        color: 'rgba(26,26,46,0.60)',
                        borderRadius: '6px',
                      }}
                    >
                      {t(exKey)}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div
          className="max-w-4xl mx-auto p-8 md:p-10"
          style={{
            borderRadius: '12px',
            background: '#FFFFFF',
            border: '0.5px solid rgba(123,47,190,0.25)',
          }}
        >
          <div className="text-center mb-8">
            <h3
              className={`${isFa ? 'font-fa' : 'font-en'} font-semibold text-xl md:text-2xl`}
              style={{ color: '#1A1A2E' }}
            >
              {t('noRequirementsTitle')}
            </h3>
            <p
              className={`${isFa ? 'font-fa' : 'font-ui'} text-sm mt-2`}
              style={{ color: 'rgba(26,26,46,0.60)' }}
            >
              {t('noRequirementsSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {notKeys.map((key) => (
              <div
                key={key}
                className={`flex items-center gap-2.5 ${isFa ? 'font-fa' : 'font-ui'} text-sm`}
                style={{ color: 'rgba(26,26,46,0.60)' }}
              >
                <CheckCircle size={15} style={{ color: '#1A1A2E', flexShrink: 0 }} />
                <span>{t(key)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
