import { Briefcase, Palette, Store, CheckCircle } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function WhoItsFor() {
  const locale = await getLocale()
  const t = await getTranslations('whoItsFor')
  const isFa = locale === 'fa'

  const enAccent = [
    { text: '#10054d', bg: 'rgba(226,221,253,0.30)', border: 'rgba(226,221,253,0.65)', gradient: 'linear-gradient(135deg, #e2ddfd, #c9c2fb)' },
    { text: '#272625', bg: 'rgba(183,239,178,0.30)', border: 'rgba(183,239,178,0.65)', gradient: 'linear-gradient(135deg, #b7efb2, #8de887)' },
    { text: '#272625', bg: 'rgba(255,215,240,0.30)', border: 'rgba(255,215,240,0.65)', gradient: 'linear-gradient(135deg, #ffd7f0, #ffbce3)' },
  ]
  const faAccent = { text: '#4d4f46', bg: '#eeefe9', border: '#d2d3cc', gradient: '#d2d3cc' }

  const audiences = [
    {
      icon: Briefcase,
      number: '01',
      titleKey: 'aud0title' as const,
      descKey:  'aud0desc'  as const,
      examples: ['aud0ex0', 'aud0ex1', 'aud0ex2', 'aud0ex3'] as const,
      accent: isFa ? faAccent : enAccent[0],
    },
    {
      icon: Palette,
      number: '02',
      titleKey: 'aud1title' as const,
      descKey:  'aud1desc'  as const,
      examples: ['aud1ex0', 'aud1ex1', 'aud1ex2', 'aud1ex3'] as const,
      accent: isFa ? faAccent : enAccent[1],
    },
    {
      icon: Store,
      number: '03',
      titleKey: 'aud2title' as const,
      descKey:  'aud2desc'  as const,
      examples: ['aud2ex0', 'aud2ex1', 'aud2ex2', 'aud2ex3'] as const,
      accent: isFa ? faAccent : enAccent[2],
    },
  ]

  const notKeys = ['not0', 'not1', 'not2', 'not3', 'not4', 'not5'] as const

  const sectionBg    = isFa ? '#fdfdf8' : '#f4f3ef'
  const borderColor  = isFa ? '#d2d3cc' : '#ecebea'
  const headingColor = isFa ? '#111827' : '#272625'
  const bodyColor    = isFa ? '#4d4f46' : '#6d6c6b'
  const badgeColor   = isFa ? '#65675e' : '#272625'

  return (
    <section className="py-24 md:py-32 relative" style={{ background: sectionBg, borderTop: `1px solid ${borderColor}` }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 60%, rgba(177,177,175,0.04) 0%, transparent 55%), ' +
            'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(177,177,175,0.03) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span
            className="inline-block font-body text-sm md:text-base font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: badgeColor }}
          >
            {t('badge')}
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight" style={{ color: headingColor }}>
            {t('title')}{' '}
            <span style={{ color: headingColor }}>{t('titleHighlight')}</span>
          </h2>
          <p
            className="font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: bodyColor }}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {audiences.map((audience) => {
            const Icon = audience.icon
            const a = audience.accent
            return (
              <div key={audience.number} className="card-gradient-border p-7 md:p-8 group">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white flex-shrink-0"
                    style={{ background: isFa ? '#bfc1b7' : a.gradient }}
                  >
                    <span dir="ltr">{audience.number}</span>
                  </span>
                  <div
                    className="p-2.5"
                    style={{ background: a.bg, border: `1px solid ${a.border}`, borderRadius: isFa ? '4px' : '0.75rem' }}
                  >
                    <Icon size={18} style={{ color: a.text }} />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-lg md:text-xl mb-3" style={{ color: headingColor }}>
                  {t(audience.titleKey)}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed mb-5"
                  style={{ color: bodyColor }}
                >
                  {t(audience.descKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {audience.examples.map((exKey) => (
                    <span
                      key={exKey}
                      className="font-body text-xs px-2.5 py-1"
                      style={{ background: '#ffffff', border: `1px solid ${borderColor}`, color: bodyColor, borderRadius: isFa ? '4px' : '9999px' }}
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
          style={{ borderRadius: isFa ? '4px' : '1rem', background: '#FFFFFF', border: `1px solid ${borderColor}` }}
        >
          <div className="text-center mb-8">
            <h3 className="font-heading font-semibold text-xl md:text-2xl" style={{ color: headingColor }}>
              {t('noRequirementsTitle')}
            </h3>
            <p className="font-body text-sm mt-2" style={{ color: bodyColor }}>
              {t('noRequirementsSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {notKeys.map((key) => (
              <div key={key} className="flex items-center gap-2.5 font-body text-sm" style={{ color: bodyColor }}>
                <CheckCircle size={15} style={{ color: isFa ? '#2f80fa' : '#272625', flexShrink: 0 }} />
                <span>{t(key)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
