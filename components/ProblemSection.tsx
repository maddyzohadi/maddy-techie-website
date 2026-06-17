import { RefreshCw, AlertCircle, MessageSquare, TrendingUp } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function ProblemSection() {
  const t = await getTranslations('problem')

  const problems = [
    {
      icon: RefreshCw,
      title: t('item0title'),
      description: t('item0desc'),
      accent: { text: '#6B9FFF', bg: 'rgba(107,159,255,0.10)', border: 'rgba(107,159,255,0.20)' },
      number: '01',
    },
    {
      icon: AlertCircle,
      title: t('item1title'),
      description: t('item1desc'),
      accent: { text: '#A78BFA', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.20)' },
      number: '02',
    },
    {
      icon: MessageSquare,
      title: t('item2title'),
      description: t('item2desc'),
      accent: { text: '#6B9FFF', bg: 'rgba(107,159,255,0.10)', border: 'rgba(107,159,255,0.20)' },
      number: '03',
    },
    {
      icon: TrendingUp,
      title: t('item3title'),
      description: t('item3desc'),
      accent: { text: '#A78BFA', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.20)' },
      number: '04',
    },
  ]

  return (
    <section className="py-24 md:py-32 relative" style={{ background: '#04080F' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(255,117,85,0.06) 0%, transparent 65%)' }}
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

        {/* Problem cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((problem) => {
            const Icon = problem.icon
            const a = problem.accent
            return (
              <div key={problem.number} className="card-gradient-border p-7 group flex flex-col">

                {/* Number badge + icon */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="font-body text-[10px] font-bold tracking-widest px-2 py-1 rounded-md leading-none"
                    style={{ background: a.bg, color: a.text, border: `1px solid ${a.border}` }}
                  >
                    <span dir="ltr">{problem.number}</span>
                  </span>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: a.bg, border: `1px solid ${a.border}` }}
                  >
                    <Icon size={20} style={{ color: a.text }} />
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-soft-white text-xl md:text-2xl mb-3 leading-snug">
                  {problem.title}
                </h3>
                <p
                  className="font-body text-base md:text-lg leading-relaxed flex-1"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {problem.description}
                </p>

                {/* Hover accent line */}
                <div
                  className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${a.text}60, transparent)` }}
                />
              </div>
            )
          })}
        </div>

        {/* Bottom hint — soft callout */}
        <div className="mt-14 flex justify-center">
          <div
            className="rounded-2xl px-8 py-5 text-center"
            style={{ background: 'rgba(107,159,255,0.06)', border: '1px solid rgba(107,159,255,0.12)' }}
          >
            <p className="font-body text-base" style={{ color: 'var(--color-text-secondary)' }}>
              {t('hint')}
            </p>
            <p className="font-heading font-semibold text-base mt-1.5" style={{ color: 'var(--color-text-primary)' }}>
              {t('hintHighlight')}
            </p>
          </div>
        </div>

      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
