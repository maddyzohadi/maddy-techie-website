'use client'

import { CheckCircle2 } from 'lucide-react'

const PAIN_POINTS = [
  'از هوش مصنوعی استفاده می‌کنی، اما هنوز نمی‌دانی چطور آن را به یک روند کاری واقعی تبدیل کنی.',
  'زمان زیادی را صرف ایمیل‌ها، گزارش‌ها، برنامه‌ریزی یا کارهای تکراری می‌کنی.',
  'پرامپت‌ها، فایل‌ها و ابزارهایت پراکنده‌اند.',
  'می‌خواهی از هوش مصنوعی استفاده کنی، اما نمی‌خواهی وارد کدنویسی یا تنظیمات پیچیده شوی.',
]

const OUTCOMES = [
  'یک مسیر ساده‌تر برای استفاده از هوش مصنوعی در کارهای روزمره',
  'پرامپت‌های قابل استفاده دوباره برای ایمیل، گزارش، محتوا و برنامه‌ریزی',
  'یک سیستم سبک برای نظم دادن به کارها، فایل‌ها یا ایده‌ها',
  'اعتمادبه‌نفس بیشتر برای استفاده از هوش مصنوعی بدون حس فنی بودن',
]

const faFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

export default function FaPainPoints() {
  return (
    <>
      {/* Section 1: Who it's for */}
      <section
        dir="rtl"
        style={{
          background: '#EFE7DC',
          borderTop: '0.5px solid #D8C7B8',
          padding: '72px 24px',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: faFont,
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: 'rgba(90,80,74,0.55)',
              marginBottom: '12px',
              textAlign: 'center',
            }}
          >
            این برای توست اگر
          </p>
          <h2
            style={{
              fontFamily: faFont,
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontWeight: 700,
              color: '#111111',
              lineHeight: 1.6,
              marginBottom: '36px',
              textAlign: 'center',
            }}
          >
            این برای تو مناسب است اگر…
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', margin: 0, padding: 0 }}>
            {PAIN_POINTS.map((point, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px 18px',
                  background: '#F5ECE0',
                  border: '0.5px solid #D8C7B8',
                  borderRadius: '12px',
                  flexDirection: 'row-reverse',
                }}
              >
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(75,146,219,0.08)',
                    border: '0.5px solid rgba(75,146,219,0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#4B92DB',
                      display: 'block',
                    }}
                  />
                </span>
                <p
                  style={{
                    fontFamily: faFont,
                    fontSize: '14px',
                    color: '#5A504A',
                    lineHeight: 1.85,
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
        </div>
      </section>

      {/* Section 2: What you get */}
      <section
        dir="rtl"
        style={{
          background: '#F5ECE0',
          borderTop: '0.5px solid #D8C7B8',
          padding: '72px 24px',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: faFont,
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: 'rgba(90,80,74,0.55)',
              marginBottom: '12px',
              textAlign: 'center',
            }}
          >
            نتیجه
          </p>
          <h2
            style={{
              fontFamily: faFont,
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontWeight: 700,
              color: '#111111',
              lineHeight: 1.6,
              marginBottom: '36px',
              textAlign: 'center',
            }}
          >
            بعد از این چه چیزی به دست می‌آوری
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', margin: 0, padding: 0 }}>
            {OUTCOMES.map((outcome, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  flexDirection: 'row-reverse',
                }}
              >
                <CheckCircle2
                  size={18}
                  style={{ color: '#4B92DB', flexShrink: 0, marginTop: '2px' }}
                />
                <p
                  style={{
                    fontFamily: faFont,
                    fontSize: '15px',
                    color: '#5A504A',
                    lineHeight: 1.75,
                    margin: 0,
                    textAlign: 'right',
                  }}
                >
                  {outcome}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
