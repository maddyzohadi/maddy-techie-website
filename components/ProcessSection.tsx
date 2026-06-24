'use client'

import { useLocale } from 'next-intl'
import { motion } from 'motion/react'

const FA_STEPS = [
  { week: 'هفته ۱', title: 'آشنایی با نیاز',    body: 'با هم بررسی می‌کنیم چی لازم داری و کجا وقت هدر می‌ره' },
  { week: 'هفته ۲', title: 'طراحی سیستم',       body: 'یه نقشه راه ساده و اجرایی برات می‌سازیم' },
  { week: 'هفته ۳', title: 'اجرا و آموزش',      body: 'سیستم رو راه می‌ندازیم و یاد می‌گیری چطور ازش استفاده کنی' },
  { week: 'هفته ۴', title: 'تحویل و پشتیبانی', body: 'همه چیز آماده‌ست، تو فقط کار می‌کنی' },
]

const EN_STEPS = [
  { week: 'Week 1', title: 'Understanding your needs', desc: 'We look at what you actually need and where your time is being wasted' },
  { week: 'Week 2', title: 'System design',            desc: 'We build a simple, executable roadmap tailored to your work' },
  { week: 'Week 3', title: 'Build & training',         desc: 'We set up the system and you learn exactly how to use it' },
  { week: 'Week 4', title: 'Delivery & support',       desc: "Everything is ready — you just do the work" },
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
      <section className="py-24 px-6 bg-[#FDF0EE]" dir="rtl">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeIn}>
            <div className="text-center mb-16">
              <p className="text-sm text-[#888] tracking-widest mb-4 font-['Noto_Naskh_Arabic']">
                روش کار
              </p>
              <h2 className="font-['Noto_Naskh_Arabic'] text-4xl text-[#1A1A1A] leading-relaxed">
                از اولین پیام تا سیستم آماده
              </h2>
            </div>

            <div className="flex flex-col divide-y divide-[#E8E3DA]">
              {FA_STEPS.map(({ week, title, body }) => (
                <motion.div
                  key={week}
                  className="flex items-start gap-6 py-8"
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <div className="flex-1 text-right">
                    <h3 className="font-['Noto_Naskh_Arabic'] text-lg font-medium text-[#1A1A1A] mb-2">
                      {title}
                    </h3>
                    <p className="font-['Noto_Naskh_Arabic'] text-sm text-[#666] leading-loose">
                      {body}
                    </p>
                  </div>
                  <div className="shrink-0 bg-white border border-[#E8E3DA] rounded-full px-4 py-1.5 text-sm text-[#888] font-['Noto_Naskh_Arabic']">
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
        background: '#F5F0EB',
        padding: '96px 24px',
        borderTop: '0.5px solid rgba(0,0,0,0.06)',
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
              color: '#999',
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
              color: '#1A1A1A',
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
                    color: '#999',
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
                      color: '#1A1A1A',
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
                      color: '#666',
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
