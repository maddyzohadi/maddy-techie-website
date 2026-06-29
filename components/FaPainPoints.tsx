'use client'

import { CheckCircle2 } from 'lucide-react'

const PAIN_POINTS = [
  'از هوش مصنوعی استفاده می‌کنی، اما هنوز نمی‌دانی چطور آن را به یک روند کاری واقعی تبدیل کنی.',
  'زمان زیادی را صرف ایمیل‌ها، گزارش‌ها، برنامه‌ریزی یا کارهای تکراری می‌کنی.',
  'پرامپت‌ها، فایل‌ها و ابزارهایت پراکنده‌اند.',
  'می‌خواهی از AI استفاده کنی، اما نمی‌خواهی وارد کدنویسی یا تنظیمات پیچیده شوی.',
]

const OUTCOMES = [
  'یک مسیر ساده‌تر برای استفاده از AI در کارهای روزمره',
  'پرامپت‌های قابل استفاده دوباره برای ایمیل، گزارش، محتوا و برنامه‌ریزی',
  'یک سیستم سبک برای نظم دادن به کارها، فایل‌ها یا ایده‌ها',
  'اعتمادبه‌نفس بیشتر برای استفاده از AI بدون حس فنی بودن',
]

const faFont = "'Noto Naskh Arabic', serif"

export default function FaPainPoints() {
  return (
    <>
      {/* Section 1: Who it's for */}
      <section
        dir="rtl"
        style={{
          background: '#EFE7DC',
          borderTop: '0.5px solid #D8C7B8',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: faFont,
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: '#8C7E74',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            این برای توست اگر
          </p>
          <h2
            style={{
              fontFamily: faFont,
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 700,
              color: '#111111',
              lineHeight: 1.5,
              marginBottom: '44px',
              textAlign: 'center',
            }}
          >
            این برای تو مناسب است اگر…
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none', margin: 0, padding: 0 }}>
            {PAIN_POINTS.map((point, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '20px 22px',
                  background: '#F5ECE0',
                  border: '0.5px solid #D8C7B8',
                  borderRadius: '12px',
                  flexDirection: 'row-reverse',
                }}
              >
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'rgba(75,146,219,0.08)',
                    border: '0.5px solid rgba(75,146,219,0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#4B92DB',
                      display: 'block',
                    }}
                  />
                </span>
                <p
                  style={{
                    fontFamily: faFont,
                    fontSize: '16px',
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
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: faFont,
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: '#8C7E74',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            نتیجه
          </p>
          <h2
            style={{
              fontFamily: faFont,
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 700,
              color: '#111111',
              lineHeight: 1.5,
              marginBottom: '44px',
              textAlign: 'center',
            }}
          >
            بعد از این چه چیزی به دست می‌آوری
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '18px', listStyle: 'none', margin: 0, padding: 0 }}>
            {OUTCOMES.map((outcome, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  flexDirection: 'row-reverse',
                }}
              >
                <CheckCircle2
                  size={20}
                  style={{ color: '#4B92DB', flexShrink: 0, marginTop: '3px' }}
                />
                <p
                  style={{
                    fontFamily: faFont,
                    fontSize: '17px',
                    color: '#111111',
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
