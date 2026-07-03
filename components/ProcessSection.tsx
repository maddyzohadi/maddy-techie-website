'use client'

import { useLocale } from 'next-intl'
import { motion } from 'motion/react'

const FA_STEPS = [
  { week: 'هفته ۱', title: 'آشنایی با نیاز',    body: 'می‌فهمیم کجا وقت هدر می‌رود و چه کاری واقعاً کمک می‌کند.' },
  { week: 'هفته ۲', title: 'طراحی سیستم',       body: 'یک مسیر ساده برای کار روزانه طراحی می‌کنیم.' },
  { week: 'هفته ۳', title: 'اجرا و آموزش',      body: 'سیستم را با هم می‌سازیم. یاد می‌گیری چطور کار کند.' },
  { week: 'هفته ۴', title: 'تحویل و پشتیبانی', body: 'همه چیز آماده است. بقیه‌اش را خودت پیش می‌بری.' },
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

  /* ── FA: keep existing design unchanged ── */
  if (isFa) {
    const faFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"
    return (
      <section className="py-20 px-6 bg-[#FAF1E6]" dir="rtl" style={{ borderTop: '0.5px solid #E6D7C8' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeIn}>
            <div className="text-center mb-12">
              <p
                style={{
                  fontFamily: faFont,
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#E34E2E',
                  marginBottom: '12px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                روش کار
              </p>
              <h2
                style={{
                  fontFamily: faFont,
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  fontWeight: 700,
                  color: '#111111',
                  lineHeight: 1.6,
                }}
              >
                از اولین پیام تا سیستم آماده
              </h2>
            </div>

            <div className="flex flex-col divide-y divide-[#E6D7C8]">
              {FA_STEPS.map(({ week, title, body }) => (
                <motion.div
                  key={week}
                  className="flex items-start gap-5 py-6"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <div className="flex-1 text-right">
                    <h3
                      style={{
                        fontFamily: faFont,
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#111111',
                        marginBottom: '6px',
                        lineHeight: 1.5,
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontFamily: faFont,
                        fontSize: '13px',
                        color: '#625B55',
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                  <div
                    style={{
                      flexShrink: 0,
                      background: '#FFF9F1',
                      border: '0.5px solid #E6D7C8',
                      borderRadius: '100px',
                      padding: '4px 14px',
                      fontSize: '12px',
                      fontFamily: faFont,
                      color: 'rgba(98,91,85,0.65)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {week}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
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
