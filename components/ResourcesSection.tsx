import { Download, FileText, Workflow, CheckSquare, BookOpen, Lightbulb, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function ResourcesSection() {
  const t = await getTranslations('resources')

  const resources = [
    { icon: Download,    titleKey: 'res0title', descKey: 'res0desc', badgeKey: 'res0badge', ctaKey: 'res0cta', featured: true,  accent: { text: '#6B9FFF', bg: 'rgba(107,159,255,0.10)', border: 'rgba(107,159,255,0.22)', ring: 'rgba(107,159,255,0.20)' } },
    { icon: Lightbulb,   titleKey: 'res1title', descKey: 'res1desc', badgeKey: 'res1badge', ctaKey: 'res1cta', featured: false, accent: { text: '#A78BFA', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.20)', ring: 'transparent' } },
    { icon: Workflow,    titleKey: 'res2title', descKey: 'res2desc', badgeKey: 'res2badge', ctaKey: 'res2cta', featured: false, accent: { text: '#6B9FFF', bg: 'rgba(107,159,255,0.10)', border: 'rgba(107,159,255,0.18)', ring: 'transparent' } },
    { icon: CheckSquare, titleKey: 'res3title', descKey: 'res3desc', badgeKey: 'res3badge', ctaKey: 'res3cta', featured: false, accent: { text: '#A78BFA', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.18)', ring: 'transparent' } },
    { icon: BookOpen,    titleKey: 'res4title', descKey: 'res4desc', badgeKey: 'res4badge', ctaKey: 'res4cta', featured: false, accent: { text: '#6B9FFF', bg: 'rgba(107,159,255,0.10)', border: 'rgba(107,159,255,0.18)', ring: 'transparent' } },
    { icon: FileText,    titleKey: 'res5title', descKey: 'res5desc', badgeKey: 'res5badge', ctaKey: 'res5cta', featured: false, accent: { text: 'var(--color-text-muted)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)', ring: 'transparent' } },
  ] as const

  return (
    <section id="templates" className="py-24 md:py-32 relative" style={{ background: '#060B14' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(107,159,255,0.05) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((resource) => {
            const Icon = resource.icon
            const a = resource.accent
            return (
              <div
                key={resource.titleKey}
                className="card-gradient-border p-6 md:p-7 flex flex-col group"
                style={resource.featured ? { boxShadow: `0 0 28px ${a.ring}, 0 4px 24px rgba(0,0,0,0.3)`, borderColor: a.border } : {}}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <Icon size={20} style={{ color: 'var(--color-text-muted)' }} />
                  </div>
                  <span
                    className="font-body text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: a.bg, border: `1px solid ${a.border}`, color: a.text }}
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
                <button
                  className="mt-5 pt-4 flex items-center gap-2 font-body text-xs transition-all duration-200 group-hover:gap-3 w-full text-left cursor-pointer"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: a.text }}
                >
                  <span>{t(resource.ctaKey)}</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            )
          })}
        </div>

        <div className="mt-14 max-w-xl mx-auto">
          <div
            className="rounded-2xl p-7 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(107,159,255,0.10) 0%, rgba(167,139,250,0.07) 100%)', border: '1px solid rgba(107,159,255,0.18)' }}
          >
            <h3 className="font-heading font-semibold text-soft-white text-xl md:text-2xl mb-2">{t('starterTitle')}</h3>
            <p className="font-body text-base md:text-lg mb-5 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
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
