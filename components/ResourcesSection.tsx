import { Download, FileText, Workflow, CheckSquare, BookOpen, Lightbulb, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function ResourcesSection() {
  const t = await getTranslations('resources')

  const includedKeys = ['res0inc0', 'res0inc1', 'res0inc2', 'res0inc3'] as const

  const resources = [
    {
      icon: Lightbulb,
      titleKey: 'res1title',
      descKey:  'res1desc',
      badgeKey: 'res1badge',
      accent: { text: '#A78BFA', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.22)' },
    },
    {
      icon: Workflow,
      titleKey: 'res2title',
      descKey:  'res2desc',
      badgeKey: 'res2badge',
      accent: { text: '#6B9FFF', bg: 'rgba(107,159,255,0.12)', border: 'rgba(107,159,255,0.22)' },
    },
    {
      icon: CheckSquare,
      titleKey: 'res3title',
      descKey:  'res3desc',
      badgeKey: 'res3badge',
      accent: { text: '#A78BFA', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.22)' },
    },
    {
      icon: BookOpen,
      titleKey: 'res4title',
      descKey:  'res4desc',
      badgeKey: 'res4badge',
      accent: { text: '#6B9FFF', bg: 'rgba(107,159,255,0.12)', border: 'rgba(107,159,255,0.22)' },
    },
    {
      icon: FileText,
      titleKey: 'res5title',
      descKey:  'res5desc',
      badgeKey: 'res5badge',
      accent: { text: '#A78BFA', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.18)' },
    },
  ] as const

  return (
    <section id="templates" className="py-24 md:py-32 relative scroll-mt-24" style={{ background: '#060B14' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(107,159,255,0.05) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="inline-block font-body text-sm md:text-base font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: '#6B9FFF' }}
          >
            {t('badge')}
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5 leading-tight">
            {t('title')}
          </h2>
          <p
            className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Featured card — Free Starter Kit */}
        <div
          className="card-gradient-border p-7 md:p-10 mb-5 flex flex-col md:flex-row gap-8 md:gap-10 items-start"
          style={{ boxShadow: '0 0 32px rgba(107,159,255,0.10), 0 4px 24px rgba(0,0,0,0.25)' }}
        >
          {/* Left — content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(107,159,255,0.12)', border: '1px solid rgba(107,159,255,0.24)' }}
              >
                <Download size={22} style={{ color: '#6B9FFF' }} />
              </div>
              <span
                className="font-body text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(107,159,255,0.10)', border: '1px solid rgba(107,159,255,0.25)', color: '#6B9FFF' }}
              >
                {t('res0badge')}
              </span>
            </div>
            <h3 className="font-heading font-bold text-soft-white text-2xl md:text-3xl mb-3 leading-snug">
              {t('res0title')}
            </h3>
            <p
              className="font-body text-base md:text-lg leading-relaxed mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {t('res0desc')}
            </p>
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-full cursor-pointer"
            >
              {t('res0cta')}
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Right — what's included */}
          <div
            className="w-full md:w-60 lg:w-72 rounded-2xl p-5 flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p
              className="font-body text-xs uppercase tracking-[0.18em] font-semibold mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {t('whatsIncluded')}
            </p>
            <div className="space-y-3">
              {includedKeys.map((k) => (
                <div
                  key={k}
                  className="flex items-start gap-2.5 font-body text-sm leading-snug"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <CheckCircle size={14} style={{ color: '#6B9FFF', flexShrink: 0, marginTop: 2 }} />
                  <span>{t(k)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resource cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {resources.map((resource) => {
            const Icon = resource.icon
            const a = resource.accent
            return (
              <div
                key={resource.titleKey}
                className="card-gradient-border p-6 md:p-7 flex flex-col"
              >
                {/* Icon + type badge */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: a.bg, border: `1px solid ${a.border}` }}
                  >
                    <Icon size={20} style={{ color: a.text }} />
                  </div>
                  <span
                    className="font-body text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {t(resource.badgeKey)}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-soft-white text-xl md:text-2xl mb-3 leading-snug">
                  {t(resource.titleKey)}
                </h3>
                <p
                  className="font-body text-base md:text-lg leading-relaxed flex-1"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {t(resource.descKey)}
                </p>

                {/* Coming soon footer */}
                <div
                  className="mt-5 pt-4 flex items-center gap-2"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <Clock size={12} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                  <span className="font-body text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {t('comingSoon')}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom callout */}
        <div className="mt-14 max-w-xl mx-auto">
          <div
            className="rounded-2xl p-7 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(107,159,255,0.08) 0%, rgba(167,139,250,0.06) 100%)',
              border: '1px solid rgba(107,159,255,0.16)',
            }}
          >
            <h3 className="font-heading font-semibold text-soft-white text-xl md:text-2xl mb-2">
              {t('starterTitle')}
            </h3>
            <p
              className="font-body text-base md:text-lg mb-5 leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {t('starterDesc')}
            </p>
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-full cursor-pointer"
            >
              {t('getStarterKit')}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
