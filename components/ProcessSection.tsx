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
  { week: 'Week 2', title: 'System design',            desc: 'A simple, clear plan built around your work.' },
  { week: 'Week 3', title: 'Build & training',         desc: 'We build it together. You learn how it works.' },
  { week: 'Week 4', title: 'Delivery & support',       desc: 'Ready to go. You take it from here.' },
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
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'rgba(98,91,85,0.55)',
                  marginBottom: '10px',
                  letterSpacing: '0.04em',
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

  return (
    <section
      style={{
        background: '#F1E8DD',
        padding: '96px 24px',
        borderTop: '0.5px solid rgba(17,17,17,0.12)',
      }}
    >
      <motion.div
        style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'flex-start', flexWrap: 'wrap' }}
        {...fadeIn}
      >
        {/* Left: eyebrow + heading */}
        <div style={{ flex: '1 1 260px', maxWidth: '340px' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#8C7E74',
              marginBottom: '16px',
            }}
          >
            THE PROCESS
          </span>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(26px, 3.5vw, 42px)',
              fontWeight: 700,
              color: '#111111',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            From first message to working system
          </h2>
        </div>

        {/* Right: timeline */}
        <div style={{ flex: '2 1 360px' }}>
          {EN_STEPS.map((step, i) => (
            <div key={i}>
              {i > 0 && (
                <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.08)' }} />
              )}
              <motion.div
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                  padding: '28px 0',
                }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#8C7E74',
                    letterSpacing: '0.06em',
                    background: 'rgba(0,0,0,0.05)',
                    border: '0.5px solid rgba(0,0,0,0.08)',
                    borderRadius: '100px',
                    padding: '4px 12px',
                    whiteSpace: 'nowrap',
                    marginTop: '2px',
                  }}
                >
                  {step.week}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: '17px',
                      fontWeight: 700,
                      color: '#111111',
                      lineHeight: 1.3,
                      marginBottom: '6px',
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    style={{
                      fontFamily: 'system-ui, sans-serif',
                      fontSize: '14px',
                      color: '#5A504A',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
