import { RefreshCw, AlertCircle, MessageSquare, TrendingUp } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function ProblemSection() {
  const locale = await getLocale()
  const t = await getTranslations('problem')
  const isFa = locale === 'fa'

  const accent = { text: '#1A1A2E', bg: 'rgba(123,47,190,0.12)', border: 'rgba(123,47,190,0.30)' }

  const headingColor = '#1A1A2E'
  const bodyColor    = 'rgba(26,26,46,0.60)'
  const badgeColor   = 'rgba(26,26,46,0.50)'

  const allProblems = [
    { icon: RefreshCw,     title: t('item0title'), description: t('item0desc'), number: '01' },
    { icon: AlertCircle,   title: t('item1title'), description: t('item1desc'), number: '02' },
    { icon: MessageSquare, title: t('item2title'), description: t('item2desc'), number: '03' },
    { icon: TrendingUp,    title: t('item3title'), description: t('item3desc'), number: '04' },
  ]

  const problems = isFa ? [] : allProblems

  return (
    <section className="py-24 md:py-32 relative" style={{ background: '#F5F0E8' }}>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="inline-block font-ui text-sm md:text-base font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: badgeColor }}
          >
            {t('badge')}
          </span>
          <h2
            className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight`}
            style={{ color: headingColor }}
          >
            {t('title')}
          </h2>
          <p
            className="font-ui text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: bodyColor }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Problem cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5 ${isFa ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
          {problems.map((problem) => {
            const Icon = problem.icon
            return (
              <div
                key={problem.number}
                className="p-7 group flex flex-col"
                style={{
                  background: '#FFFFFF',
                  border: '0.5px solid rgba(123,47,190,0.25)',
                  borderRadius: '12px',
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="font-ui text-[10px] font-bold tracking-widest px-2 py-1 rounded-md leading-none"
                    style={{ background: accent.bg, color: accent.text, border: `0.5px solid ${accent.border}` }}
                  >
                    <span dir="ltr">{problem.number}</span>
                  </span>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: accent.bg, border: `0.5px solid ${accent.border}` }}
                  >
                    <Icon size={20} style={{ color: accent.text }} />
                  </div>
                </div>

                <h3
                  className={`${isFa ? 'font-fa' : 'font-en'} font-semibold text-xl md:text-2xl mb-3 leading-snug`}
                  style={{ color: headingColor }}
                >
                  {problem.title}
                </h3>
                <p
                  className="font-ui text-base md:text-lg leading-relaxed flex-1"
                  style={{ color: bodyColor }}
                >
                  {problem.description}
                </p>

                <div
                  className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: 'rgba(123,47,190,0.20)' }}
                />
              </div>
            )
          })}
        </div>

        {/* Bottom hint */}
        <div className="mt-14 flex justify-center">
          <div
            className="px-8 py-5 text-center"
            style={{
              borderRadius: '12px',
              background: 'rgba(123,47,190,0.08)',
              border: '0.5px solid rgba(123,47,190,0.20)',
            }}
          >
            <p className="font-ui text-base" style={{ color: bodyColor }}>
              {t('hint')}
            </p>
            <p
              className={`${isFa ? 'font-fa' : 'font-en'} font-semibold text-base mt-1.5`}
              style={{ color: headingColor }}
            >
              {t('hintHighlight')}
            </p>
          </div>
        </div>

      </div>

    </section>
  )
}
