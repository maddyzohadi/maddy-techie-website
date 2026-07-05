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

  // ── FA: editorial accordion matching EN quality ──────────────────────
  const vaFont  = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"
  const SERIF   = "'DM Serif Display', serif"

  const faParts = [
    {
      number: '01',
      label:  'بخش ۰۱',
      title:  'مبانی هوش مصنوعی و اتوماسیون',
      tagline: 'اول یاد می‌گیری هوش مصنوعی و اتوماسیون دقیقاً چه کار می‌کنند، کجا به درد می‌خورند و چطور می‌شود از آن‌ها بدون پیچیدگی در کار روزمره استفاده کرد',
      items: [
        'هوش مصنوعی چیست و کجا مفید است',
        'تفاوت ابزار، پرامپت و جریان کاری',
        'اتوماسیون یعنی چه',
        'چطور یک کار تکراری را برای هوش مصنوعی آماده کنیم',
      ],
    },
    {
      number: '02',
      label:  'بخش ۰۲',
      title:  'ChatGPT و Claude برای کار روزمره',
      tagline: 'یاد می‌گیری چطور از ChatGPT و Claude برای نوشتن، خلاصه‌سازی، تحقیق، ایده‌پردازی و تصمیم‌گیری بهتر استفاده کنی',
      items: [
        'نوشتن پرامپت‌های واضح',
        'ساخت ایمیل، گزارش و خلاصه',
        'تبدیل یادداشت‌های پراکنده به خروجی منظم',
        'تشخیص محدودیت‌ها و خطاهای هوش مصنوعی',
      ],
    },
    {
      number: '03',
      label:  'بخش ۰۳',
      title:  'ساخت جریان‌های کاری هوشمند',
      tagline: 'در این بخش یاد می‌گیری چطور چند ابزار را کنار هم قرار بدهی و برای کارهای تکراری یک سیستم ساده بسازی',
      items: [
        'طراحی جریان کاری از یک کار واقعی',
        'استفاده از قالب‌ها و فایل‌ها',
        'ترکیب هوش مصنوعی با Google Sheets',
        'ساده‌سازی کارهای تکراری',
      ],
    },
    {
      number: '04',
      label:  'بخش ۰۴',
      title:  'پروژه‌های قابل استفاده',
      tagline: 'در پایان، با چند پروژه واقعی تمرین می‌کنی تا چیزی بسازی که بعداً بتوانی در کار خودت استفاده کنی',
      items: [
        'سیستم پاسخ ایمیل',
        'خلاصه جلسه و کارهای بعدی',
        'برنامه‌ریز محتوا',
        'گزارش هفتگی با کمک هوش مصنوعی',
      ],
    },
  ]

  return (
    <section
      id="training"
      dir="rtl"
      style={{
        background:      '#FFFDF8',
        padding:         'clamp(72px, 9vw, 104px) clamp(24px, 8vw, 80px)',
        scrollMarginTop: '88px',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 72px)' }}>
          <p
            style={{
              fontFamily:    vaFont,
              fontSize:      '11px',
              fontWeight:     700,
              letterSpacing: '0.16em',
              color:          '#E34E2E',
              marginBottom:  '20px',
            }}
          >
            مسیر یادگیری
          </p>
          <h2
            style={{
              fontFamily:    vaFont,
              fontSize:      'clamp(28px, 4vw, 48px)',
              fontWeight:     800,
              color:          '#111111',
              lineHeight:     1.22,
              letterSpacing: '-0.01em',
              marginBottom:  '20px',
            }}
          >
            از پایه شروع کن، با سیستم‌های واقعی تمرین کن
          </h2>
          <p
            style={{
              fontFamily:  vaFont,
              fontSize:    'clamp(15px, 1.3vw, 17px)',
              color:       '#625B55',
              lineHeight:   1.80,
              maxWidth:    '580px',
              margin:      '0 auto',
            }}
          >
            این آموزش‌ها برای آدم‌های غیر فنی ساخته شده‌اند؛ برای اینکه یاد بگیری هوش مصنوعی را در ایمیل، گزارش، برنامه‌ریزی، محتوا و جریان‌های کاری روزمره استفاده کنی
          </p>
        </div>

        {/* Accordion */}
        <div>
          {faParts.map((part, index) => {
            const isOpen = openPart === index
            return (
              <div key={part.number} style={{ borderTop: '0.5px solid rgba(17,17,17,0.09)' }}>

                {/* Trigger row */}
                <button
                  type="button"
                  onClick={() => setOpenPart(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  style={{
                    width:      '100%',
                    display:    'flex',
                    alignItems: 'flex-start',
                    gap:        '24px',
                    padding:    '28px 0',
                    background: 'none',
                    border:     'none',
                    cursor:     'pointer',
                    textAlign:  'right',
                  }}
                >
                  {/* Chevron on far LEFT in RTL */}
                  <ChevronDown
                    size={17}
                    style={{
                      color:      '#8C7E74',
                      flexShrink:  0,
                      transform:  isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.25s ease',
                      marginTop:  '8px',
                      order:       3,
                    }}
                  />

                  {/* Title + tagline */}
                  <div style={{ flex: 1, paddingTop: '4px', order: 2 }}>
                    <p
                      style={{
                        fontFamily:    vaFont,
                        fontSize:      'clamp(18px, 1.8vw, 24px)',
                        fontWeight:     800,
                        color:          '#111111',
                        lineHeight:     1.20,
                        letterSpacing: '-0.01em',
                        marginBottom:  '5px',
                      }}
                    >
                      {part.title}
                    </p>
                    <p
                      style={{
                        fontFamily: vaFont,
                        fontSize:   'clamp(13px, 1.1vw, 15px)',
                        color:      '#8C7E74',
                        lineHeight:  1.65,
                        margin:      0,
                      }}
                    >
                      {part.label}
                    </p>
                  </div>

                  {/* Orange italic number on RIGHT in RTL */}
                  <span
                    style={{
                      fontFamily:    SERIF,
                      fontStyle:     'italic',
                      fontSize:      'clamp(36px, 4vw, 48px)',
                      color:          '#E34E2E',
                      lineHeight:     1,
                      letterSpacing: '-0.02em',
                      flexShrink:     0,
                      width:         '52px',
                      textAlign:     'left',
                      display:       'block',
                      order:          1,
                    }}
                  >
                    {part.number}
                  </span>
                </button>

                {/* Expanded content */}
                <div
                  style={{
                    overflow:   'hidden',
                    maxHeight:  isOpen ? '500px' : '0',
                    transition: 'max-height 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', gap: '24px', paddingBottom: '36px' }}>
                    {/* Spacer matching number column — on RIGHT in RTL */}
                    <div style={{ width: '52px', flexShrink: 0, order: 1 }} className="hidden sm:block" />

                    {/* Description + topics */}
                    <div style={{ flex: 1, order: 2 }}>
                      <p
                        style={{
                          fontFamily:   vaFont,
                          fontSize:     'clamp(14px, 1.2vw, 15px)',
                          color:        '#625B55',
                          lineHeight:    1.78,
                          marginBottom: '20px',
                        }}
                      >
                        {part.tagline}
                      </p>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {part.items.map((item, i) => (
                          <li
                            key={i}
                            style={{
                              display:    'flex',
                              alignItems: 'flex-start',
                              gap:        '12px',
                              padding:    '9px 0',
                              borderTop:  i > 0 ? '0.5px solid rgba(17,17,17,0.06)' : 'none',
                              fontFamily: vaFont,
                              fontSize:   'clamp(14px, 1.1vw, 15px)',
                              color:      '#625B55',
                              lineHeight:  1.65,
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                flexShrink:   0,
                                marginTop:    '8px',
                                width:        '4px',
                                height:       '4px',
                                borderRadius: '50%',
                                background:   'rgba(227,78,46,0.40)',
                                display:      'block',
                              }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Spacer on LEFT in RTL (chevron column) */}
                    <div style={{ width: '17px', flexShrink: 0, order: 3 }} className="hidden sm:block" />
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
            fontFamily: vaFont,
            fontSize:   '14px',
            color:      '#8C7E74',
            marginTop:  '48px',
            textAlign:  'center',
            lineHeight:  1.7,
          }}
        >
          هر بخش باید به یک خروجی واقعی ختم شود؛{' '}
          <span style={{ color: '#625B55', fontWeight: 500 }}>نه فقط توضیح، نه فقط تئوری</span>
        </p>

      </div>
    </section>
  )
}
