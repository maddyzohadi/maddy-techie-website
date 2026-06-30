import { Briefcase, Palette, Store, CheckCircle } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function WhoItsFor() {
  const locale = await getLocale()
  const t = await getTranslations('whoItsFor')
  const isFa = locale === 'fa'

  const cardAccent = {
    bg: 'rgba(63,141,222,0.08)',
    border: 'rgba(63,141,222,0.20)',
    icon: '#3F8DDE',
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
      style={{ background: '#FFF9F1', borderTop: '0.5px solid #E6D7C8' }}
      dir={isFa ? 'rtl' : 'ltr'}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span
            className="inline-flex items-center font-ui text-xs font-semibold uppercase tracking-[0.14em] mb-4 bg-brand-surface text-brand-coral px-3 py-1.5 rounded-full"
          >
            {t('badge')}
          </span>
          <h2
            className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-2xl md:text-3xl lg:text-4xl mb-5 leading-tight max-w-xl mx-auto`}
            style={{ color: '#111111', letterSpacing: '-.02em' }}
          >
            {t('title')}{' '}
            <span style={{ color: '#625B55' }}>{t('titleHighlight')}</span>
          </h2>
          <p
            className={`${isFa ? 'font-fa' : 'font-ui'} text-base md:text-lg max-w-2xl mx-auto leading-relaxed`}
            style={{ color: '#625B55' }}
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
                  background: '#FAF1E6',
                  border: '0.5px solid #E6D7C8',
                  borderRadius: '12px',
                  padding: '28px 30px',
                }}
              >
                <div className={`flex items-center gap-3 mb-6 ${isFa ? 'flex-row-reverse' : ''}`}>
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center font-ui font-bold text-sm flex-shrink-0"
                    style={{
                      background: cardAccent.bg,
                      border: `0.5px solid ${cardAccent.border}`,
                      color: '#111111',
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
                  style={{ color: '#111111' }}
                >
                  {t(audience.titleKey)}
                </h3>
                <p
                  className={`${isFa ? 'font-fa' : 'font-ui'} text-sm leading-relaxed mb-5`}
                  style={{ color: '#625B55' }}
                >
                  {t(audience.descKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {audience.examples.map((exKey) => (
                    <span
                      key={exKey}
                      className={`${isFa ? 'font-fa' : 'font-ui'} text-xs px-2.5 py-1`}
                      style={{
                        background: 'rgba(63,141,222,0.06)',
                        border: '0.5px solid rgba(63,141,222,0.15)',
                        color: '#625B55',
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
            background: '#FAF1E6',
            border: '0.5px solid #E6D7C8',
          }}
        >
          <div className="text-center mb-8">
            <h3
              className={`${isFa ? 'font-fa' : 'font-en'} font-semibold text-xl md:text-2xl`}
              style={{ color: '#111111' }}
            >
              {t('noRequirementsTitle')}
            </h3>
            <p
              className={`${isFa ? 'font-fa' : 'font-ui'} text-sm mt-2`}
              style={{ color: '#625B55' }}
            >
              {t('noRequirementsSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {notKeys.map((key) => (
              <div
                key={key}
                className={`flex items-center gap-2.5 ${isFa ? 'font-fa flex-row-reverse' : 'font-ui'} text-sm`}
                style={{ color: '#625B55' }}
              >
                <CheckCircle size={15} style={{ color: '#3F8DDE', flexShrink: 0 }} />
                <span>{t(key)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
