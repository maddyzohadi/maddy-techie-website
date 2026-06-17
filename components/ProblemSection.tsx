import { RefreshCw, AlertCircle, MessageSquare, TrendingUp } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function ProblemSection() {
  const t = await getTranslations('problem')

  const problems = [
    {
      icon: RefreshCw,
      title: t('item0title'),
      description: t('item0desc'),
      accent: { text: '#5B9CF8', bg: 'rgba(91,156,248,0.10)', border: 'rgba(91,156,248,0.20)' },
      number: '01',
    },
    {
      icon: AlertCircle,
      title: t('item1title'),
      description: t('item1desc'),
      accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.10)', border: 'rgba(255,117,85,0.20)' },
      number: '02',
    },
    {
      icon: MessageSquare,
      title: t('item2title'),
      description: t('item2desc'),
      accent: { text: '#8B5CF6', bg: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.20)' },
      number: '03',
    },
    {
      icon: TrendingUp,
      title: t('item3title'),
      description: t('item3desc'),
      accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.10)', border: 'rgba(255,117,85,0.20)' },
      number: '04',
    },
  ]

  return (
    <section className="py-24 md:py-32 relative" style={{ background: '#04080F' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(255,117,85,0.05) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block font-body text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: '#FF7555' }}>
            {t('badge')}
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5 leading-tight">
            {t('title')}
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#8A97A8' }}>
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((problem) => {
            const Icon = problem.icon
            const a = problem.accent
            return (
              <div key={problem.number} className="card-gradient-border p-7 group flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-heading font-bold text-4xl leading-none select-none" style={{ color: 'rgba(255,255,255,0.04)' }}>
                    <span dir="ltr">{problem.number}</span>
                  </span>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: a.bg, border: `1px solid ${a.border}` }}>
                    <Icon size={20} style={{ color: a.text }} />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-soft-white text-base md:text-lg mb-3 leading-snug">
                  {problem.title}
                </h3>
                <p className="font-body text-sm leading-relaxed flex-1" style={{ color: '#8A97A8' }}>
                  {problem.description}
                </p>
                <div className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: `linear-gradient(90deg, ${a.text}60, transparent)` }} />
              </div>
            )
          })}
        </div>

        <div className="mt-14 text-center">
          <p className="font-body text-base" style={{ color: '#8A97A8' }}>
            {t('hint')}{' '}
            <span className="text-soft-white font-medium">{t('hintHighlight')}</span>
          </p>
        </div>

      </div>
    </section>
  )
}
