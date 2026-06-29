'use client'

import { useLocale } from 'next-intl'
import { motion } from 'motion/react'

const FA_STEPS = [
  { week: 'هفته ۱', title: 'آشنایی با نیاز',    body: 'می‌فهمیم کجا وقت هدر می‌ره و چه کاری واقعاً کمک می‌کنه.' },
  { week: 'هفته ۲', title: 'طراحی سیستم',       body: 'یه مسیر ساده طراحی می‌کنیم.' },
  { week: 'هفته ۳', title: 'اجرا و آموزش',      body: 'سیستم رو می‌سازیم. یاد می‌گیری چطور کار کنه.' },
  { week: 'هفته ۴', title: 'تحویل و پشتیبانی', body: 'آماده‌ست. ادامه رو خودت می‌دی.' },
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
    return (
      <section className="py-24 px-6 bg-[#EFE7DC]" dir="rtl">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeIn}>
            <div className="text-center mb-16">
              <p className="text-sm text-[#5A504A] opacity-60 tracking-widest mb-4 font-['Noto_Naskh_Arabic']">
                روش کار
              </p>
              <h2 className="font-['Noto_Naskh_Arabic'] text-4xl text-[#111111] leading-relaxed">
                از اولین پیام تا سیستم آماده
              </h2>
            </div>

            <div className="flex flex-col divide-y divide-[#D8C7B8]">
              {FA_STEPS.map(({ week, title, body }) => (
                <motion.div
                  key={week}
                  className="flex items-start gap-6 py-8"
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <div className="flex-1 text-right">
                    <h3 className="font-['Noto_Naskh_Arabic'] text-lg font-medium text-[#111111] mb-2">
                      {title}
                    </h3>
                    <p className="font-['Noto_Naskh_Arabic'] text-sm text-[#5A504A] leading-loose">
                      {body}
                    </p>
                  </div>
                  <div className="shrink-0 bg-white border border-[#D8C7B8] rounded-full px-4 py-1.5 text-sm text-[#5A504A] opacity-60 font-['Noto_Naskh_Arabic']">
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
        background: '#EFE7DC',
        padding: '96px 24px',
        borderTop: '0.5px solid #D8C7B8',
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
