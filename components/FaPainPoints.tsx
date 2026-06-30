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
      {/* Section 1: Pain Points — editorial light panel */}
      <section
        dir="rtl"
        style={{
          background: '#FFF9F1',
          padding: '72px 24px',
          borderTop: '0.5px solid #E6D7C8',
        }}
      >
        <motion.div style={{ maxWidth: '680px', margin: '0 auto' }} {...fadeIn}>
          <p
            style={{
              fontFamily: vaFont,
              fontSize: '11px',
              fontWeight: 600,
              color: '#ED5821',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            این آموزش برای توست اگر
          </p>
          <h2
            style={{
              fontFamily: vaFont,
              fontSize: 'clamp(20px, 2.8vw, 30px)',
              fontWeight: 800,
              color: '#111111',
              lineHeight: 1.55,
              marginBottom: '36px',
            }}
          >
            هنوز مطمئن نیستی هوش مصنوعی
            <br />
            کجای کارت می‌تواند واقعاً کمک کند
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
                      ? '0.5px solid #E6D7C8'
                      : 'none',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#ED5821',
                    flexShrink: 0,
                    marginTop: '10px',
                    display: 'block',
                  }}
                />
                <p
                  style={{
                    fontFamily: vaFont,
                    fontSize: '15px',
                    color: '#625B55',
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

      {/* Section 2: Outcomes — warm surface */}
      <section
        dir="rtl"
        style={{
          background: '#FAF1E6',
          borderTop: '0.5px solid #E6D7C8',
          padding: '64px 24px',
        }}
      >
        <motion.div style={{ maxWidth: '680px', margin: '0 auto' }} {...fadeIn}>
          <h2
            style={{
              fontFamily: vaFont,
              fontSize: 'clamp(17px, 2.2vw, 22px)',
              fontWeight: 700,
              color: '#111111',
              lineHeight: 1.6,
              marginBottom: '32px',
            }}
          >
            بعد از این، چه چیزی به دست می‌آوری
          </h2>
          <ul
            style={{
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
                  gap: '14px',
                  padding: '18px 0',
                  borderBottom:
                    i < OUTCOMES.length - 1
                      ? '0.5px solid #E6D7C8'
                      : 'none',
                }}
              >
                <CheckCircle2
                  size={16}
                  style={{ color: '#ED5821', flexShrink: 0, marginTop: '3px' }}
                />
                <p
                  style={{
                    fontFamily: vaFont,
                    fontSize: '14px',
                    color: '#625B55',
                    lineHeight: 1.85,
                    margin: 0,
                    flex: 1,
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
