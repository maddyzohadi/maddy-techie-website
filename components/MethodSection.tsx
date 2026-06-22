import { Zap, Brain, Plus } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function MethodSection() {
  const locale = await getLocale()
  const t = await getTranslations('method')
  const isFa = locale === 'fa'

  const part1Items = [t('part1item0'), t('part1item1'), t('part1item2'), t('part1item3')]
  const part2Items = [t('part2item0'), t('part2item1'), t('part2item2'), t('part2item3')]

  const headingColor = isFa ? '#F5F0E8'               : '#1A1A2E'
  const bodyColor    = isFa ? 'rgba(245,240,232,0.60)' : 'rgba(26,26,46,0.60)'
  const badgeColor   = isFa ? 'rgba(245,240,232,0.50)' : 'rgba(26,26,46,0.50)'
  const iconBg       = isFa ? 'rgba(123,47,190,0.15)'  : 'rgba(123,47,190,0.08)'
  const iconBorder   = isFa ? 'rgba(123,47,190,0.35)'  : 'rgba(123,47,190,0.20)'
  const sepColor     = isFa ? 'rgba(245,240,232,0.12)' : 'rgba(123,47,190,0.20)'
  const sectionBg    = isFa ? '#1A1A2E'               : '#F5F0E8'
  const cardBg       = isFa ? 'rgba(123,47,190,0.12)' : '#FFFFFF'
  const cardBorder   = isFa ? 'rgba(123,47,190,0.30)' : 'rgba(123,47,190,0.25)'
  const bulletColor  = isFa ? '#F5F0E8'               : '#1A1A2E'

  return (
    <section
      className="py-24 md:py-32 relative"
      style={{
        background: sectionBg,
        borderTop: isFa ? '0.5px solid rgba(245,240,232,0.08)' : '0.5px solid rgba(123,47,190,0.15)',
      }}
    >
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
            {t('title')}{' '}
            <br className="hidden md:block" />
            <span style={{ color: bodyColor }}>{t('titleHighlight')}</span>
          </h2>
          <p
            className="font-ui text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: bodyColor }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Two-panel layout */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 max-w-5xl mx-auto">

          {/* Part 1 */}
          <div
            className="flex-1 p-8 md:p-10"
            style={{
              background: cardBg,
              border: `0.5px solid ${cardBorder}`,
              borderRadius: '12px',
            }}
          >
            <div
              className="w-14 h-14 flex items-center justify-center mb-5"
              style={{ background: iconBg, border: `0.5px solid ${iconBorder}`, borderRadius: '8px' }}
            >
              <Zap size={26} style={{ color: headingColor }} />
            </div>

            <div className="font-ui text-xs font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: badgeColor }}>
              {t('part1badge')}
            </div>

            <h3
              className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-xl md:text-2xl mb-4`}
              style={{ color: headingColor }}
            >
              {t('part1title')}
            </h3>

            <p className="font-ui text-base md:text-lg leading-relaxed mb-7" style={{ color: bodyColor }}>
              {t('part1desc')}
            </p>

            <ul className="space-y-3.5">
              {part1Items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-ui text-base md:text-lg" style={{ color: bodyColor }}>
                  <span
                    className="mt-1.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: iconBg, border: `0.5px solid ${iconBorder}` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full block" style={{ background: bulletColor }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Plus separator */}
          <div className="flex items-center justify-center lg:flex-col gap-4 py-4 lg:py-0">
            <div className="hidden lg:block w-px flex-1" style={{ background: sepColor }} />
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: iconBg, border: `0.5px solid ${iconBorder}` }}
            >
              <Plus size={18} style={{ color: bodyColor }} />
            </div>
            <div className="hidden lg:block w-px flex-1" style={{ background: sepColor }} />
            <div className="lg:hidden h-px flex-1" style={{ background: sepColor }} />
            <div className="lg:hidden h-px flex-1" style={{ background: sepColor }} />
          </div>

          {/* Part 2 */}
          <div
            className="flex-1 p-8 md:p-10"
            style={{
              background: cardBg,
              border: `0.5px solid ${cardBorder}`,
              borderRadius: '12px',
            }}
          >
            <div
              className="w-14 h-14 flex items-center justify-center mb-5"
              style={{ background: iconBg, border: `0.5px solid ${iconBorder}`, borderRadius: '8px' }}
            >
              <Brain size={26} style={{ color: headingColor }} />
            </div>

            <div className="font-ui text-xs font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: badgeColor }}>
              {t('part2badge')}
            </div>

            <h3
              className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-xl md:text-2xl mb-4`}
              style={{ color: headingColor }}
            >
              {t('part2title')}
            </h3>

            <p className="font-ui text-base md:text-lg leading-relaxed mb-7" style={{ color: bodyColor }}>
              {t('part2desc')}
            </p>

            <ul className="space-y-3.5">
              {part2Items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-ui text-base md:text-lg" style={{ color: bodyColor }}>
                  <span
                    className="mt-1.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: iconBg, border: `0.5px solid ${iconBorder}` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full block" style={{ background: bulletColor }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}
