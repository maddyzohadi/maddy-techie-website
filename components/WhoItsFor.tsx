import { Briefcase, Palette, Store, CheckCircle } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function WhoItsFor() {
  const t = await getTranslations('whoItsFor')

  const audiences = [
    {
      icon: Briefcase,
      number: '01',
      titleKey: 'aud0title' as const,
      descKey: 'aud0desc' as const,
      examples: ['aud0ex0', 'aud0ex1', 'aud0ex2', 'aud0ex3'] as const,
      accent: { text: '#5B9CF8', bg: 'rgba(91,156,248,0.12)', border: 'rgba(91,156,248,0.22)', gradient: 'linear-gradient(135deg, #5B9CF8, #8B5CF6)' },
    },
    {
      icon: Palette,
      number: '02',
      titleKey: 'aud1title' as const,
      descKey: 'aud1desc' as const,
      examples: ['aud1ex0', 'aud1ex1', 'aud1ex2', 'aud1ex3'] as const,
      accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.12)', border: 'rgba(255,117,85,0.22)', gradient: 'linear-gradient(135deg, #FF7555, #FF5A2E)' },
    },
    {
      icon: Store,
      number: '03',
      titleKey: 'aud2title' as const,
      descKey: 'aud2desc' as const,
      examples: ['aud2ex0', 'aud2ex1', 'aud2ex2', 'aud2ex3'] as const,
      accent: { text: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.22)', gradient: 'linear-gradient(135deg, #8B5CF6, #C084FC)' },
    },
  ]

  const notKeys = ['not0', 'not1', 'not2', 'not3', 'not4', 'not5'] as const

  return (
    <section className="py-24 md:py-32 relative" style={{ background: '#04080F' }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 20% 60%, rgba(91,156,248,0.05) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(139,92,246,0.05) 0%, transparent 55%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block font-body text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: '#5B9CF8' }}>
            {t('badge')}
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5 leading-tight">
            {t('title')}
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#8A97A8' }}>
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
                  <span className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white flex-shrink-0" style={{ background: a.gradient }}>
                    <span dir="ltr">{audience.number}</span>
                  </span>
                  <div className="p-2.5 rounded-xl" style={{ background: a.bg, border: `1px solid ${a.border}` }}>
                    <Icon size={18} style={{ color: a.text }} />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-soft-white text-lg md:text-xl mb-3">
                  {t(audience.titleKey)}
                </h3>
                <p className="font-body text-sm leading-relaxed mb-5" style={{ color: '#8A97A8' }}>
                  {t(audience.descKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {audience.examples.map((exKey) => (
                    <span key={exKey} className="font-body text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8A97A8' }}>
                      {t(exKey)}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl p-8 md:p-10" style={{ background: 'rgba(12, 21, 36, 0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="text-center mb-8">
            <h3 className="font-heading font-semibold text-soft-white text-xl md:text-2xl">
              {t('noRequirementsTitle')}
            </h3>
            <p className="font-body text-sm mt-2" style={{ color: '#8A97A8' }}>
              {t('noRequirementsSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {notKeys.map((key) => (
              <div key={key} className="flex items-center gap-2.5 font-body text-sm" style={{ color: '#8A97A8' }}>
                <CheckCircle size={15} style={{ color: '#5B9CF8', flexShrink: 0 }} />
                <span>{t(key)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
