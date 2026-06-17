import { ArrowRight, Zap, Brain, Sparkles } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function Hero() {
  const [t, locale] = await Promise.all([
    getTranslations('hero'),
    getLocale(),
  ])
  const isRTL = locale === 'fa'

  const stats = [
    { value: t('stat0value'), label: t('stat0label'), color: '#FF7555' },   // coral  — 100% Practical
    { value: t('stat1value'), label: t('stat1label'), color: '#6B9FFF' },   // electric — 0 Coding Required
    { value: t('stat2value'), label: t('stat2label'), color: '#A78BFA' },   // violet — 3 Core Tools
    { value: t('stat3value'), label: t('stat3label'), color: '#F97B4B' },   // warm — Templates & Services
  ]

  const tools = [
    { label: 'ChatGPT',       color: 'rgba(167,139,250,0.10)',  border: 'rgba(167,139,250,0.18)' },
    { label: 'Claude AI',     color: 'rgba(249,123,75,0.10)',   border: 'rgba(249,123,75,0.18)' },
    { label: 'Google Sheets', color: 'rgba(107,159,255,0.10)',  border: 'rgba(107,159,255,0.18)' },
    { label: 'Make',          color: 'rgba(107,159,255,0.10)',  border: 'rgba(107,159,255,0.15)' },
    { label: 'Zapier',        color: 'rgba(255,117,85,0.08)',   border: 'rgba(255,117,85,0.14)' },
    { label: 'Notion',        color: 'rgba(255,255,255,0.05)',  border: 'rgba(255,255,255,0.09)' },
    { label: 'Airtable',      color: 'rgba(107,159,255,0.08)',  border: 'rgba(107,159,255,0.12)' },
    { label: 'n8n',           color: 'rgba(167,139,250,0.08)',  border: 'rgba(167,139,250,0.12)' },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Subtle grid */}
      <div aria-hidden className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

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

      {/* Warm accent glow — bottom left */}
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,123,75,0.07) 0%, transparent 60%)' }}
      />

      {/* Cool blue corner — top right */}
      <div
        aria-hidden
        className="absolute -top-52 -right-52 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(107,159,255,0.05) 0%, transparent 65%)' }}
      />

      {/* Floating decorative cards — desktop only */}
      <div
        aria-hidden
        className="float absolute top-32 right-8 lg:right-24 hidden lg:flex flex-col gap-3 pointer-events-none z-10"
      >
        <div className="card-glass px-4 py-3 flex items-center gap-3 w-48" style={{ borderColor: 'rgba(107,159,255,0.15)' }}>
          <div className="w-8 h-8 rounded-lg icon-electric flex-shrink-0 p-1.5">
            <Zap size={16} className="text-electric" />
          </div>
          <div>
            <div className="font-heading text-soft-white text-xs font-semibold">{t('card1Title')}</div>
            <div className="font-body text-cool-gray text-[10px]">{t('card1Sub')}</div>
          </div>
        </div>
        <div className="card-glass px-4 py-3 flex items-center gap-3 w-48 ml-6" style={{ borderColor: 'rgba(167,139,250,0.15)' }}>
          <div className="w-8 h-8 rounded-lg icon-violet flex-shrink-0 p-1.5">
            <Brain size={16} className="text-violet" />
          </div>
          <div>
            <div className="font-heading text-soft-white text-xs font-semibold">{t('card2Title')}</div>
            <div className="font-body text-cool-gray text-[10px]">{t('card2Sub')}</div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="float-slow absolute bottom-36 left-8 lg:left-24 hidden lg:flex items-center gap-3 pointer-events-none z-10"
      >
        <div className="card-glass px-4 py-3 flex items-center gap-3 w-52" style={{ borderColor: 'rgba(255,117,85,0.15)' }}>
          <div className="w-8 h-8 rounded-lg icon-coral flex-shrink-0 p-1.5">
            <Sparkles size={16} className="text-coral" />
          </div>
          <div>
            <div className="font-heading text-soft-white text-xs font-semibold">{t('card3Title')}</div>
            <div className="font-body text-cool-gray text-[10px]">{t('card3Sub')}</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 font-body font-semibold text-[11px] uppercase tracking-widest px-5 py-2 rounded-full"
            style={{ background: 'rgba(107,159,255,0.10)', border: '1px solid rgba(107,159,255,0.22)', color: '#6B9FFF' }}
          >
            <Zap size={11} style={{ fill: '#6B9FFF' }} />
            {t('badge')}
          </span>
        </div>

        {/* Headline block */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-soft-white mb-3">
            {t('title')}
          </h1>

          {/* Second line — gradient accent */}
          <p className="gradient-text font-heading font-semibold text-2xl sm:text-3xl md:text-3xl lg:text-4xl leading-tight mb-8">
            {t('titleLine2')}
          </p>

          <p className="font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: 'var(--color-text-secondary)' }}>
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
                  isRTL
                    ? 'rotate-180 group-hover:-translate-x-1'
                    : 'group-hover:translate-x-1'
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

        {/* Tool logos */}
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
            style={{ background: 'rgba(249,123,75,0.10)', border: '1px solid rgba(249,123,75,0.20)' }}
          >
            <Brain size={14} style={{ color: '#F97B4B', flexShrink: 0 }} />
            <span className="font-body text-sm font-medium" style={{ color: '#F97B4B' }}>
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
