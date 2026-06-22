import { Zap, Brain, Plus } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function MethodSection() {
  const locale = await getLocale()
  const t = await getTranslations('method')
  const isFa = locale === 'fa'

  const part1Items = [t('part1item0'), t('part1item1'), t('part1item2'), t('part1item3')]
  const part2Items = [t('part2item0'), t('part2item1'), t('part2item2'), t('part2item3')]

  const headingColor    = isFa ? '#111827' : '#111111'
  const bodyColor       = isFa ? '#4d4f46' : '#6d6c6b'
  const badgeColor      = isFa ? '#65675e' : '#6d6c6b'
  const borderColor     = isFa ? '#d2d3cc' : '#ecebea'
  const panel1Bg        = isFa ? '#ffffff' : '#ffffff'
  const panel2Bg        = isFa ? '#fdfdf8' : '#f4f3ef'
  const iconBg          = isFa ? '#eeefe9' : '#f4f3ef'
  const plusCircleBg    = isFa ? '#eeefe9' : '#f4f3ef'
  const dotBg           = isFa ? '#111827' : '#272625'
  const sectionBg       = isFa ? '#ffffff' : '#ffffff'

  return (
    <section className="py-24 md:py-32 relative" style={{ background: sectionBg }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="inline-block font-body text-sm md:text-base font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: badgeColor }}
          >
            {t('badge')}
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight" style={{ color: headingColor, letterSpacing: isFa ? '-0.025em' : undefined }}>
            {t('title')}{' '}
            <br className="hidden md:block" />
            <span style={{ color: bodyColor }}>{t('titleHighlight')}</span>
          </h2>
          <p
            className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: bodyColor }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Two-panel layout */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 max-w-5xl mx-auto">

          {/* Part 1 — Automation */}
          <div
            className="flex-1 p-8 md:p-10"
            style={{
              background: panel1Bg,
              border: `1px solid ${borderColor}`,
              borderRadius: '4px',
            }}
          >
            <div
              className="w-14 h-14 flex items-center justify-center mb-5"
              style={{ background: iconBg, border: `1px solid ${borderColor}`, borderRadius: '4px' }}
            >
              <Zap size={26} style={{ color: dotBg }} />
            </div>

            <div
              className="font-body text-xs font-semibold uppercase tracking-[0.22em] mb-3"
              style={{ color: badgeColor }}
            >
              {t('part1badge')}
            </div>

            <h3 className="font-heading font-bold text-xl md:text-2xl mb-4" style={{ color: headingColor }}>
              {t('part1title')}
            </h3>

            <p
              className="font-body text-base md:text-lg leading-relaxed mb-7"
              style={{ color: bodyColor }}
            >
              {t('part1desc')}
            </p>

            <ul className="space-y-3.5">
              {part1Items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 font-body text-base md:text-lg"
                  style={{ color: bodyColor }}
                >
                  <span
                    className="mt-1.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: iconBg, border: `1px solid ${borderColor}` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full block" style={{ background: dotBg }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Plus separator */}
          <div className="flex items-center justify-center lg:flex-col gap-4 py-4 lg:py-0">
            <div
              className="hidden lg:block w-px flex-1"
              style={{ background: `linear-gradient(to bottom, transparent, ${borderColor}, transparent)` }}
            />
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: plusCircleBg, border: `1px solid ${borderColor}` }}
            >
              <Plus size={18} style={{ color: bodyColor }} />
            </div>
            <div
              className="hidden lg:block w-px flex-1"
              style={{ background: `linear-gradient(to bottom, transparent, ${borderColor}, transparent)` }}
            />
            <div
              className="lg:hidden h-px flex-1"
              style={{ background: `linear-gradient(to right, transparent, ${borderColor}, transparent)` }}
            />
            <div
              className="lg:hidden h-px flex-1"
              style={{ background: `linear-gradient(to right, transparent, ${borderColor}, transparent)` }}
            />
          </div>

          {/* Part 2 — AI */}
          <div
            className="flex-1 p-8 md:p-10"
            style={{
              background: panel2Bg,
              border: `1px solid ${borderColor}`,
              borderRadius: '4px',
            }}
          >
            <div
              className="w-14 h-14 flex items-center justify-center mb-5"
              style={{ background: '#ffffff', border: `1px solid ${borderColor}`, borderRadius: '4px' }}
            >
              <Brain size={26} style={{ color: dotBg }} />
            </div>

            <div
              className="font-body text-xs font-semibold uppercase tracking-[0.22em] mb-3"
              style={{ color: badgeColor }}
            >
              {t('part2badge')}
            </div>

            <h3 className="font-heading font-bold text-xl md:text-2xl mb-4" style={{ color: headingColor }}>
              {t('part2title')}
            </h3>

            <p
              className="font-body text-base md:text-lg leading-relaxed mb-7"
              style={{ color: bodyColor }}
            >
              {t('part2desc')}
            </p>

            <ul className="space-y-3.5">
              {part2Items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 font-body text-base md:text-lg"
                  style={{ color: bodyColor }}
                >
                  <span
                    className="mt-1.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#ffffff', border: `1px solid ${borderColor}` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full block" style={{ background: dotBg }} />
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
