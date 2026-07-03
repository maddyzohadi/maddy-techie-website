'use client'

import { useState } from 'react'
import { ChevronDown, Zap, Brain, Bot, Layers } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

export default function CurriculumSection() {
  const t = useTranslations('curriculum')
  const locale = useLocale()
  const isFa = locale === 'fa'
  const [openPart, setOpenPart] = useState<number | null>(0)

  const parts = [
    { number: '01', icon: Zap,    title: t('part0title'), tagline: t('part0tagline'), items: [t('part0item0'), t('part0item1'), t('part0item2'), t('part0item3')] },
    { number: '02', icon: Brain,  title: t('part1title'), tagline: t('part1tagline'), items: [t('part1item0'), t('part1item1'), t('part1item2'), t('part1item3')] },
    { number: '03', icon: Bot,    title: t('part2title'), tagline: t('part2tagline'), items: [t('part2item0'), t('part2item1'), t('part2item2'), t('part2item3')] },
    { number: '04', icon: Layers, title: t('part3title'), tagline: t('part3tagline'), items: [t('part3item0'), t('part3item1'), t('part3item2'), t('part3item3')] },
  ]

  // ── EN: editorial accordion ──────────────────────────────────────────
  if (!isFa) {
    return (
      <section
        id="training"
        dir="ltr"
        style={{
          background: '#FFFDF8',
          padding: 'clamp(72px, 9vw, 104px) clamp(24px, 8vw, 80px)',
          scrollMarginTop: '88px',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* Module accordion */}
          <div>
            {parts.map((part, index) => {
              const isOpen = openPart === index
              return (
                <div key={part.number} style={{ borderTop: '0.5px solid rgba(17,17,17,0.09)' }}>

                  {/* Trigger row */}
                  <button
                    type="button"
                    onClick={() => setOpenPart(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '28px',
                      padding: '28px 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {/* Italic orange number */}
                    <span
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontStyle: 'italic',
                        fontSize: 'clamp(36px, 4vw, 48px)',
                        color: '#E34E2E',
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                        flexShrink: 0,
                        width: '52px',
                        textAlign: 'right',
                        display: 'block',
                      }}
                    >
                      {part.number}
                    </span>

                    {/* Title + tagline */}
                    <div style={{ flex: 1, paddingTop: '4px' }}>
                      <p
                        style={{
                          fontFamily: "'DM Serif Display', serif",
                          fontSize: 'clamp(20px, 2vw, 26px)',
                          fontWeight: 400,
                          color: '#111111',
                          lineHeight: 1.15,
                          letterSpacing: '-0.01em',
                          marginBottom: '5px',
                        }}
                      >
                        {part.title}
                      </p>
                      <p
                        style={{
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          fontSize: 'clamp(13px, 1.1vw, 15px)',
                          color: '#8C7E74',
                          lineHeight: 1.55,
                          margin: 0,
                        }}
                      >
                        {part.tagline}
                      </p>
                    </div>

                    {/* Chevron */}
                    <ChevronDown
                      size={17}
                      style={{
                        color: '#8C7E74',
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.25s ease',
                        marginTop: '8px',
                      }}
                    />
                  </button>

                  {/* Expanded content */}
                  <div
                    style={{
                      overflow: 'hidden',
                      maxHeight: isOpen ? '400px' : '0',
                      transition: 'max-height 0.3s ease',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '28px', paddingBottom: '36px' }}>
                      {/* Spacer matching number column — hidden on mobile */}
                      <div className="hidden sm:block" style={{ width: '52px', flexShrink: 0 }} />
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', flex: 1 }}>
                        {part.items.map((item, i) => (
                          <li
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                              padding: '9px 0',
                              borderTop: i > 0 ? '0.5px solid rgba(17,17,17,0.06)' : 'none',
                              fontFamily: 'system-ui, -apple-system, sans-serif',
                              fontSize: 'clamp(14px, 1.1vw, 15px)',
                              color: '#625B55',
                              lineHeight: 1.65,
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                flexShrink: 0,
                                marginTop: '7px',
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: 'rgba(227,78,46,0.40)',
                                display: 'block',
                              }}
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
            {/* Bottom rule */}
            <div style={{ height: '0.5px', background: 'rgba(17,17,17,0.09)' }} />
          </div>

          {/* Bottom note */}
          <p
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '14px',
              color: '#8C7E74',
              marginTop: '48px',
              textAlign: 'center',
              lineHeight: 1.7,
            }}
          >
            {t('bottomNote')}{' '}
            <span style={{ color: '#625B55', fontWeight: 500 }}>{t('bottomNoteHighlight')}</span>
          </p>

        </div>
      </section>
    )
  }

  // ── FA: keep existing design unchanged ───────────────────────────────
  const headingColor = '#111111'
  const bodyColor    = '#625B55'
  const accent = { text: '#3F8DDE', bg: 'rgba(63,141,222,0.06)', border: 'rgba(63,141,222,0.15)' }

  return (
    <section id="training" className="py-24 md:py-32 relative scroll-mt-24" style={{ background: '#FFF9F1' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span
            className="inline-flex items-center font-fa text-[13px] font-bold uppercase tracking-[0.10em] mb-4 bg-brand-surface text-brand-coral px-3 py-1.5 rounded-full"
          >
            {t('badge')}
          </span>
          <h2
            className="font-fa font-bold text-2xl md:text-3xl lg:text-4xl mb-5 leading-tight max-w-xl mx-auto"
            style={{ color: headingColor }}
          >
            {t('title')}{' '}
            <span style={{ color: bodyColor }}>{t('titleHighlight')}</span>
          </h2>
          <p
            className="font-fa text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: bodyColor }}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-2.5" dir="rtl">
          {parts.map((part, index) => {
            const Icon = part.icon
            const isOpen = openPart === index
            return (
              <div
                key={part.number}
                className="overflow-hidden transition-all duration-300"
                style={{
                  background: '#FAF1E6',
                  border: '0.5px solid #E6D7C8',
                  borderRadius: '12px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenPart(isOpen ? null : index)}
                  className="w-full flex items-center gap-4 p-6 md:p-7 text-right group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div
                    className="flex-shrink-0 p-2 rounded-xl"
                    style={{ background: accent.bg, border: `0.5px solid ${accent.border}` }}
                  >
                    <Icon size={18} style={{ color: accent.text }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-fa font-semibold text-xl md:text-2xl leading-snug"
                      style={{ color: headingColor }}
                    >
                      {part.title}
                    </div>
                    <div
                      className="font-fa text-base md:text-lg mt-0.5 hidden sm:block"
                      style={{ color: bodyColor }}
                    >
                      {part.tagline}
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: '#625B55' }}
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                  <div
                    className="px-6 md:px-7 pb-7 pt-5"
                    style={{ borderTop: '0.5px solid #E6D7C8' }}
                  >
                    <p
                      className="font-fa text-base md:text-lg mb-5 sm:hidden"
                      style={{ color: bodyColor }}
                    >
                      {part.tagline}
                    </p>
                    <ul className="space-y-3">
                      {part.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-base md:text-lg"
                          style={{ color: bodyColor }}
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-brand-blue" />
                          <span className="font-fa flex-1 text-right">{item}</span>
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
          style={{ color: '#625B55' }}
        >
          {t('bottomNote')}{' '}
          <span className="font-medium" style={{ color: '#111111' }}>{t('bottomNoteHighlight')}</span>
        </p>

      </div>
    </section>
  )
}
