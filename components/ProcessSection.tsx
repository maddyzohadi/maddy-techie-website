'use client'

import { useLocale } from 'next-intl'
import { motion } from 'motion/react'

const FA_STEPS = [
  { step: 'مرحله ۰۱', title: 'شناخت نیاز',      body: 'اول می‌فهمیم کدام بخش کار نیاز به تغییر دارد و چه چیزی واقعاً می‌تواند کمکت کند' },
  { step: 'مرحله ۰۲', title: 'طراحی مسیر',       body: 'یک مسیر ساده و قابل اجرا برای جریان کاری، قالب‌ها یا ابزارهایی که نیاز داری طراحی می‌شود' },
  { step: 'مرحله ۰۳', title: 'ساخت و تنظیم',    body: 'سیستم ساخته، تست و برای استفاده روزمره آماده می‌شود' },
  { step: 'مرحله ۰۴', title: 'آموزش و تحویل',   body: 'یاد می‌گیری چطور از سیستم استفاده کنی و بعد با اطمینان ادامه بدهی' },
]

const EN_STEPS = [
  { week: 'Week 1', title: 'Understanding your needs', desc: "We find what's slowing you down and what would actually help." },
  { week: 'Week 2', title: 'System design',            desc: 'A simple, clear plan built around your work.'               },
  { week: 'Week 3', title: 'Build & training',         desc: 'We build it together. You learn how it works.'              },
  { week: 'Week 4', title: 'Delivery & support',       desc: 'Ready to go. You take it from here.'                       },
]

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

export default function ProcessSection() {
  const locale = useLocale()
  const isFa   = locale === 'fa'

  /* ── FA: editorial two-column layout ── */
  if (isFa) {
    const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"
    const SERIF  = "'DM Serif Display', serif"
    return (
      <section
        dir="rtl"
        style={{
          background: '#FFFDF8',
          padding:    'clamp(96px, 12vw, 140px) clamp(24px, 8vw, 80px)',
          borderTop:  '0.5px solid rgba(17,17,17,0.07)',
        }}
      >
        <motion.div style={{ maxWidth: '1200px', margin: '0 auto' }} {...fadeIn}>
          <div
            className="grid grid-cols-1 md:grid-cols-[196px_1fr] gap-10 md:gap-[72px]"
            style={{ alignItems: 'start' }}
          >

            {/* Right: section label (first in DOM = right in RTL) */}
            <div style={{ paddingTop: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '16px' }}>
                <span style={{
                  fontFamily:    SERIF,
                  fontStyle:     'italic',
                  fontSize:      'clamp(38px, 4vw, 58px)',
                  color:          '#E34E2E',
                  lineHeight:     1,
                  letterSpacing: '-0.02em',
                }}>
                  05
                </span>
                <span style={{
                  fontFamily:    vaFont,
                  fontSize:      '11px',
                  fontWeight:     700,
                  letterSpacing: '0.10em',
                  color:          '#8C7E74',
                }}>
                  روند کار
                </span>
              </div>
              <div style={{ height: '0.5px', background: 'rgba(17,17,17,0.14)' }} />
            </div>

            {/* Left: headline + steps */}
            <div>
              <h2 style={{
                fontFamily:    vaFont,
                fontSize:      'clamp(26px, 3.2vw, 48px)',
                fontWeight:     800,
                color:          '#111111',
                lineHeight:     1.28,
                letterSpacing: '-0.01em',
                marginBottom:  '20px',
              }}>
                از اولین ایده تا یک سیستم قابل استفاده
              </h2>

              <p style={{
                fontFamily:   vaFont,
                fontSize:     'clamp(15px, 1.4vw, 18px)',
                color:        '#625B55',
                lineHeight:    1.80,
                marginBottom: '52px',
                maxWidth:     '480px',
              }}>
                چند مرحله‌ی ساده برای اینکه یک جریان کاری واقعی بسازی
              </p>

              {/* Steps */}
              <div>
                {FA_STEPS.map((step, i) => (
                  <div
                    key={step.step}
                    style={{
                      paddingTop:    i === 0 ? 0 : '32px',
                      paddingBottom: i < FA_STEPS.length - 1 ? '32px' : 0,
                      borderTop:     i === 0 ? 'none' : '0.5px solid rgba(17,17,17,0.09)',
                    }}
                  >
                    <p style={{
                      fontFamily:    vaFont,
                      fontSize:      '10px',
                      fontWeight:     700,
                      letterSpacing: '0.14em',
                      color:          '#8C7E74',
                      marginBottom:  '10px',
                    }}>
                      {step.step}
                    </p>
                    <h3 style={{
                      fontFamily:    vaFont,
                      fontSize:      'clamp(18px, 1.8vw, 24px)',
                      fontWeight:     800,
                      color:          '#111111',
                      lineHeight:     1.22,
                      letterSpacing: '-0.01em',
                      marginBottom:  '10px',
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontFamily:  vaFont,
                      fontSize:    'clamp(14px, 1.2vw, 16px)',
                      color:       '#625B55',
                      lineHeight:   1.78,
                      margin:       0,
                      maxWidth:    '480px',
                    }}>
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </section>
    )
  }

  /* ── EN: editorial two-column layout ── */
  return (
    <section
      dir="ltr"
      style={{
        background: '#FFFDF8',
        padding: 'clamp(96px, 12vw, 140px) clamp(24px, 8vw, 80px)',
        borderTop: '0.5px solid rgba(17,17,17,0.07)',
      }}
    >
      <motion.div
        style={{ maxWidth: '1200px', margin: '0 auto' }}
        {...fadeIn}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-[196px_1fr] gap-10 md:gap-[72px]"
          style={{ alignItems: 'start' }}
        >

          {/* Left: section label */}
          <div style={{ paddingTop: '6px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '14px',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(52px, 6vw, 80px)',
                  color: '#E34E2E',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                05
              </span>
              <span
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#8C7E74',
                }}
              >
                PROCESS
              </span>
            </div>
            <div style={{ height: '0.5px', background: 'rgba(17,17,17,0.14)' }} />
          </div>

          {/* Right: headline + steps */}
          <div>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(38px, 5vw, 68px)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
              }}
            >
              From first message to working system
            </h2>

            <p
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(16px, 1.4vw, 19px)',
                color: '#625B55',
                lineHeight: 1.72,
                marginBottom: '56px',
                maxWidth: '480px',
              }}
            >
              Four focused weeks. One clear system. Ready to use on day one.
            </p>

            {/* Steps */}
            <div>
              {EN_STEPS.map((step, i) => (
                <div
                  key={step.week}
                  style={{
                    paddingTop: i === 0 ? 0 : '32px',
                    paddingBottom: i < EN_STEPS.length - 1 ? '32px' : 0,
                    borderTop: i === 0 ? 'none' : '0.5px solid rgba(17,17,17,0.09)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#8C7E74',
                      marginBottom: '10px',
                    }}
                  >
                    {step.week}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: 'clamp(20px, 2vw, 26px)',
                      fontWeight: 400,
                      color: '#111111',
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      marginBottom: '10px',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: 'clamp(15px, 1.3vw, 17px)',
                      color: '#625B55',
                      lineHeight: 1.70,
                      margin: 0,
                      maxWidth: '520px',
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
