'use client'

import { CheckCircle2 } from 'lucide-react'
import { motion } from 'motion/react'

const PAIN_POINTS = [
  'از هوش مصنوعی استفاده می‌کنی، اما هنوز نمی‌دانی چطور آن را به یک روند کاری واقعی تبدیل کنی.',
  'زمان زیادی را صرف ایمیل‌ها، گزارش‌ها، برنامه‌ریزی یا کارهای تکراری می‌کنی.',
  'پرامپت‌ها، فایل‌ها و ابزارهایت پراکنده‌اند و نمی‌دانی از کجا شروع کنی.',
  'می‌خواهی از هوش مصنوعی استفاده کنی، اما نمی‌خواهی وارد کدنویسی یا تنظیمات پیچیده شوی.',
]

const OUTCOMES = [
  'مسیری ساده‌تر برای استفاده از هوش مصنوعی در کارهای روزمره',
  'پرامپت‌های قابل استفاده برای ایمیل، گزارش، محتوا و برنامه‌ریزی',
  'سیستمی سبک برای نظم دادن به کارها، فایل‌ها و ایده‌ها',
  'اعتمادبه‌نفس بیشتر برای استفاده از هوش مصنوعی، بدون حس فنی بودن',
]

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: 'easeOut' },
} as const

export default function FaPainPoints() {
  return (
    <>
      {/* Section 1: Pain Points — dark premium panel */}
      <section
        dir="rtl"
        style={{
          background: '#351C1C',
          padding: '72px 24px',
        }}
      >
        <motion.div style={{ maxWidth: '680px', margin: '0 auto' }} {...fadeIn}>
          <h2
            style={{
              fontFamily: vaFont,
              fontSize: 'clamp(17px, 2vw, 22px)',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.95)',
              lineHeight: 1.65,
              marginBottom: '36px',
              textAlign: 'center',
            }}
          >
            این آموزش برای توست اگر…
          </h2>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {PAIN_POINTS.map((point, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '18px 0',
                  borderBottom:
                    i < PAIN_POINTS.length - 1
                      ? '0.5px solid rgba(255,255,255,0.10)'
                      : 'none',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#89CFF0',
                    flexShrink: 0,
                    marginTop: '10px',
                    display: 'block',
                  }}
                />
                <p
                  style={{
                    fontFamily: vaFont,
                    fontSize: '15px',
                    color: 'rgba(239,231,220,0.85)',
                    lineHeight: 1.9,
                    margin: 0,
                    flex: 1,
                    textAlign: 'right',
                  }}
                >
                  {point}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Section 2: Outcomes — warm light */}
      <section
        dir="rtl"
        style={{
          background: '#F5ECE0',
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
          padding: '64px 24px',
        }}
      >
        <motion.div style={{ maxWidth: '680px', margin: '0 auto' }} {...fadeIn}>
          <h2
            style={{
              fontFamily: vaFont,
              fontSize: 'clamp(16px, 2vw, 21px)',
              fontWeight: 700,
              color: '#111111',
              lineHeight: 1.65,
              marginBottom: '32px',
              textAlign: 'center',
            }}
          >
            بعد از این، چه چیزی به دست می‌آوری
          </h2>
          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {OUTCOMES.map((outcome, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px 18px',
                  background: '#EFE7DC',
                  border: '0.5px solid #D8C7B8',
                  borderRadius: '12px',
                }}
              >
                <CheckCircle2
                  size={17}
                  style={{ color: '#C08064', flexShrink: 0, marginTop: '3px' }}
                />
                <p
                  style={{
                    fontFamily: vaFont,
                    fontSize: '14px',
                    color: '#5A504A',
                    lineHeight: 1.8,
                    margin: 0,
                    flex: 1,
                    textAlign: 'right',
                  }}
                >
                  {outcome}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </>
  )
}
