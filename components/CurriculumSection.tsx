'use client'

import { useState } from 'react'
import { ChevronDown, Zap, Brain, Bot, Layers } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

export default function CurriculumSection() {
  const t = useTranslations('curriculum')
  const locale = useLocale()
  const isFa = locale === 'fa'
  const [openPart, setOpenPart] = useState<number | null>(0)

  const accent = { text: '#1A1A2E', bg: 'rgba(123,47,190,0.12)', border: 'rgba(123,47,190,0.30)' }

  const parts = [
    { number: '01', icon: Zap,    title: t('part0title'), tagline: t('part0tagline'), items: [t('part0item0'), t('part0item1'), t('part0item2'), t('part0item3')] },
    { number: '02', icon: Brain,  title: t('part1title'), tagline: t('part1tagline'), items: [t('part1item0'), t('part1item1'), t('part1item2'), t('part1item3')] },
    { number: '03', icon: Bot,    title: t('part2title'), tagline: t('part2tagline'), items: [t('part2item0'), t('part2item1'), t('part2item2'), t('part2item3')] },
    { number: '04', icon: Layers, title: t('part3title'), tagline: t('part3tagline'), items: [t('part3item0'), t('part3item1'), t('part3item2'), t('part3item3')] },
  ]

  const headingColor = '#1A1A2E'
  const bodyColor    = 'rgba(26,26,46,0.60)'
  const badgeColor   = 'rgba(26,26,46,0.50)'

  return (
    <section id="training" className="py-24 md:py-32 relative scroll-mt-24" style={{ background: '#F5F0E8' }}>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
            <span style={{ color: bodyColor }}>{t('titleHighlight')}</span>
          </h2>
          <p
            className="font-ui text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: bodyColor }}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-2.5">
          {parts.map((part, index) => {
            const Icon = part.icon
            const isOpen = openPart === index
            return (
              <div
                key={part.number}
                className="overflow-hidden transition-all duration-300"
                style={{
                  background: '#FFFFFF',
                  border: `0.5px solid ${isOpen ? 'rgba(123,47,190,0.40)' : 'rgba(123,47,190,0.20)'}`,
                  borderRadius: '12px',
                }}
              >
                <button
                  onClick={() => setOpenPart(isOpen ? null : index)}
                  className="w-full flex items-center gap-4 p-6 md:p-7 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  {!isFa && (
                    <span
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-ui font-bold text-sm"
                      style={{ background: accent.bg, border: `0.5px solid ${accent.border}`, color: accent.text }}
                    >
                      <span dir="ltr">{part.number}</span>
                    </span>
                  )}
                  <div
                    className="flex-shrink-0 p-2 rounded-xl"
                    style={{ background: accent.bg, border: `0.5px solid ${accent.border}` }}
                  >
                    <Icon size={18} style={{ color: accent.text }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`${isFa ? 'font-fa' : 'font-en'} font-semibold text-xl md:text-2xl leading-snug`}
                      style={{ color: headingColor }}
                    >
                      {isFa ? part.title : `${t('partLabel')} ${part.number} · ${part.title}`}
                    </div>
                    <div
                      className="font-ui text-base md:text-lg mt-0.5 hidden sm:block"
                      style={{ color: bodyColor }}
                    >
                      {part.tagline}
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: '#1A1A2E' }}
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                  <div
                    className="px-6 md:px-7 pb-7 pt-5"
                    style={{ borderTop: '0.5px solid rgba(123,47,190,0.12)' }}
                  >
                    <p
                      className="font-ui text-base md:text-lg mb-5 sm:hidden"
                      style={{ color: bodyColor }}
                    >
                      {part.tagline}
                    </p>
                    <ul className="space-y-3">
                      {part.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 font-ui text-base md:text-lg"
                          style={{ color: bodyColor }}
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: '#1A1A2E' }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p
          className="text-center font-ui text-sm mt-10"
          style={{ color: bodyColor }}
        >
          {t('bottomNote')}{' '}
          <span className="font-medium" style={{ color: headingColor }}>{t('bottomNoteHighlight')}</span>
        </p>

      </div>
    </section>
  )
}
