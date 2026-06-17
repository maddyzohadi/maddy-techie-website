import { CheckCircle, Star, Sparkles } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function AboutSection() {
  const t = await getTranslations('about')

  const beliefs = ['belief0', 'belief1'] as const
  const highlights = [
    { labelKey: 'highlight0label', valueKey: 'highlight0value' },
    { labelKey: 'highlight1label', valueKey: 'highlight1value' },
    { labelKey: 'highlight2label', valueKey: 'highlight2value' },
    { labelKey: 'highlight3label', valueKey: 'highlight3value' },
  ] as const

  const stats = [
    { value: '4',    labelKey: 'statModules'   },
    { value: '12+',  labelKey: 'statProjects'  },
    { value: '100%', labelKey: 'statPractical' },
  ] as const

  return (
    <section id="about" className="py-24 md:py-32 relative scroll-mt-24" style={{ background: '#04080F' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(107,159,255,0.06) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — visual card */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div
                className="rounded-3xl overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, #0A1525 0%, #0C1B2E 50%, #091421 100%)',
                  border: '1px solid rgba(107,159,255,0.15)',
                }}
              >
                <div aria-hidden className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(107,159,255,0.08) 0%, transparent 70%)' }} />
                <div aria-hidden className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)' }} />

                <div className="relative z-10 p-10 flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div
                      className="w-28 h-28 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(107,159,255,0.20), rgba(167,139,250,0.20))',
                        border: '2px solid rgba(107,159,255,0.25)',
                      }}
                    >
                      <span className="font-heading font-bold text-4xl" style={{ color: '#6B9FFF' }}>M</span>
                    </div>
                    <div
                      className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #6B9FFF, #A78BFA)' }}
                    >
                      <Sparkles size={13} className="text-white" />
                    </div>
                  </div>

                  <div className="font-heading font-bold text-soft-white text-xl mb-1">Maddy the Techie</div>
                  <div className="font-body text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>{t('subtitle')}</div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} style={{ color: '#A78BFA', fill: '#A78BFA' }} />
                    ))}
                  </div>
                  <p className="font-body text-xs italic max-w-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {t('tagline')}
                  </p>

                  <div className="mt-7 grid grid-cols-3 gap-3 w-full">
                    {stats.map((s) => (
                      <div
                        key={s.labelKey}
                        className="rounded-xl py-3 text-center"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div className="font-heading font-bold text-base" style={{ color: '#6B9FFF' }}>
                          <span dir="ltr">{s.value}</span>
                        </div>
                        <div className="font-body text-[10px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                          {t(s.labelKey)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-5 -right-4 md:-right-8 rounded-2xl px-5 py-3.5 shadow-2xl"
                style={{
                  background: '#0C1524',
                  border: '1px solid rgba(167,139,250,0.20)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}
              >
                <div className="font-body text-xs mb-0.5" style={{ color: 'var(--color-text-muted)' }}>{t('badgeLabel')}</div>
                <div className="font-heading font-bold text-soft-white text-sm">{t('badge100')}</div>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div className="order-1 lg:order-2">
            <span
              className="inline-block font-body text-sm md:text-base font-semibold uppercase tracking-[0.22em] mb-4"
              style={{ color: '#6B9FFF' }}
            >
              {t('badge')}
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-6 leading-tight">
              {t('title')}
              <br />
              <span className="gradient-text">{t('titleHighlight')}</span>
            </h2>

            <p className="font-body text-lg md:text-xl leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)' }}>
              {t('desc1')}
            </p>
            <p className="font-body text-base md:text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              {t('desc2')}
            </p>

            <div className="space-y-3.5 mb-8">
              {beliefs.map((key) => (
                <div key={key} className="flex items-start gap-3 font-body text-base md:text-lg text-soft-white">
                  <CheckCircle size={17} style={{ color: '#6B9FFF', flexShrink: 0, marginTop: 2 }} />
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div
                  key={h.labelKey}
                  className="rounded-xl px-4 py-3.5 transition-colors duration-200"
                  style={{ background: 'rgba(12, 21, 36, 0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="font-body text-[10px] uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>
                    {t(h.labelKey)}
                  </div>
                  <div className="font-heading font-semibold text-soft-white text-sm leading-snug">
                    {t(h.valueKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
