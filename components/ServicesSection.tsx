import { Zap, MessageSquare, LayoutGrid, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function ServicesSection() {
  const t = await getTranslations('services')

  const services = [
    {
      icon: Zap,
      titleKey: 'svc0title',
      descKey:  'svc0desc',
      accent: { text: '#6B9FFF', bg: 'rgba(107,159,255,0.12)', border: 'rgba(107,159,255,0.22)' },
    },
    {
      icon: MessageSquare,
      titleKey: 'svc1title',
      descKey:  'svc1desc',
      accent: { text: '#A78BFA', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.22)' },
    },
    {
      icon: LayoutGrid,
      titleKey: 'svc2title',
      descKey:  'svc2desc',
      accent: { text: '#6B9FFF', bg: 'rgba(107,159,255,0.12)', border: 'rgba(107,159,255,0.22)' },
    },
  ] as const

  return (
    <section id="services" className="py-24 md:py-32 relative scroll-mt-24" style={{ background: '#04080F' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 40%, rgba(167,139,250,0.06) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 50% 40% at 20% 70%, rgba(107,159,255,0.05) 0%, transparent 60%)',
        }}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {services.map((service) => {
            const Icon = service.icon
            const a = service.accent
            return (
              <div key={service.titleKey} className="card-gradient-border p-7 md:p-8 flex flex-col">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: a.bg, border: `1px solid ${a.border}` }}
                >
                  <Icon size={22} style={{ color: a.text }} />
                </div>
                <h3 className="font-heading font-semibold text-soft-white text-xl md:text-2xl mb-3 leading-snug">
                  {t(service.titleKey)}
                </h3>
                <p
                  className="font-body text-base md:text-lg leading-relaxed flex-1"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {t(service.descKey)}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2.5 font-body font-semibold text-base px-9 py-4 rounded-full cursor-pointer"
          >
            {t('cta')}
            <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  )
}
