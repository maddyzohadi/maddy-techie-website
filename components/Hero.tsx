import { ArrowRight, Zap, Brain } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function Hero() {
  const [t, locale] = await Promise.all([
    getTranslations('hero'),
    getLocale(),
  ])
  const isRTL = locale === 'fa'

  const stats = [
    { value: t('stat0value'), label: t('stat0label'), color: '#6B9FFF' },
    { value: t('stat1value'), label: t('stat1label'), color: '#A78BFA' },
    { value: t('stat2value'), label: t('stat2label'), color: '#6B9FFF' },
    { value: t('stat3value'), label: t('stat3label'), color: '#A78BFA' },
  ]

  const tools = [
    { label: 'ChatGPT',       color: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.18)' },
    { label: 'Claude AI',     color: 'rgba(107,159,255,0.10)', border: 'rgba(107,159,255,0.18)' },
    { label: 'Google Sheets', color: 'rgba(107,159,255,0.10)', border: 'rgba(107,159,255,0.18)' },
    { label: 'Make',          color: 'rgba(107,159,255,0.08)', border: 'rgba(107,159,255,0.14)' },
    { label: 'Zapier',        color: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.14)' },
    { label: 'Notion',        color: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.09)' },
    { label: 'Airtable',      color: 'rgba(107,159,255,0.08)', border: 'rgba(107,159,255,0.12)' },
    { label: 'n8n',           color: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.12)' },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Subtle grid */}
      <div aria-hidden className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Blue/violet ambient — top center */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 10%, rgba(107,159,255,0.09) 0%, transparent 65%), ' +
            'radial-gradient(ellipse 50% 40% at 85% 65%, rgba(167,139,250,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Cool blue corner — top right */}
      <div
        aria-hidden
        className="absolute -top-52 -right-52 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(107,159,255,0.05) 0%, transparent 65%)' }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 font-body font-semibold text-sm md:text-base uppercase tracking-[0.22em] px-5 py-2 rounded-full"
            style={{ background: 'rgba(107,159,255,0.10)', border: '1px solid rgba(107,159,255,0.22)', color: '#6B9FFF' }}
          >
            <Zap size={11} style={{ fill: '#6B9FFF' }} />
            {t('badge')}
          </span>
        </div>

        {/* Headline block */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-soft-white mb-3">
            {t('title')}
          </h1>

          <p className="gradient-text font-heading font-semibold text-xl md:text-2xl lg:text-3xl leading-tight mb-8">
            {t('titleLine2')}
          </p>

          <p
            className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('subtitle')}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#training"
              className="btn-primary group flex items-center gap-2.5 font-body font-semibold text-base px-9 py-4 rounded-full w-full sm:w-auto justify-center cursor-pointer"
            >
              {t('cta')}
              <ArrowRight
                size={18}
                className={`transition-transform duration-200 ${
                  isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                }`}
              />
            </a>
            <a
              href="#templates"
              className="hero-secondary-btn font-body font-semibold text-base px-9 py-4 rounded-full w-full sm:w-auto flex items-center justify-center cursor-pointer"
            >
              {t('ctaSecondary')}
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card-glass text-center px-4 py-5 rounded-2xl"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="font-heading font-bold text-2xl md:text-3xl mb-1.5" style={{ color: stat.color }}>
                <span dir="ltr">{stat.value}</span>
              </div>
              <div className="font-body text-xs leading-snug" style={{ color: 'var(--color-text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tool pills */}
        <div className="mt-16 text-center">
          <p className="font-body text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(138,154,176,0.5)' }}>
            {t('toolsLabel')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {tools.map((tool) => (
              <span
                key={tool.label}
                dir="ltr"
                className="font-body text-xs px-3.5 py-1.5 rounded-full"
                style={{ background: tool.color, border: `1px solid ${tool.border}`, color: 'var(--color-text-secondary)' }}
              >
                {tool.label}
              </span>
            ))}
          </div>
        </div>

        {/* No-coding pill */}
        <div className="mt-12 flex justify-center">
          <div
            className="flex items-center gap-2.5 rounded-full px-5 py-2.5"
            style={{ background: 'rgba(107,159,255,0.10)', border: '1px solid rgba(107,159,255,0.18)' }}
          >
            <Brain size={14} style={{ color: '#6B9FFF', flexShrink: 0 }} />
            <span className="font-body text-sm font-medium" style={{ color: '#6B9FFF' }}>
              {t('noCoding')}
            </span>
          </div>
        </div>

      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--color-bg), transparent)' }}
      />
    </section>
  )
}
