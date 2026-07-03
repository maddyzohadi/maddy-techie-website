'use client'

import { ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { motion } from 'motion/react'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

const FA_SERVICES = [
  {
    num: '۱',
    title: 'شناسایی کارهای قابل ساده‌سازی',
    desc: 'می‌بینیم کدام کارها وقتت را می‌گیرند و هوش مصنوعی کجا واقعاً می‌تواند کمک کند.',
  },
  {
    num: '۲',
    title: 'سیستم پرامپت اختصاصی',
    desc: 'پرامپت‌های قابل استفاده دوباره برای ایمیل، گزارش، محتوا، تحقیق و برنامه‌ریزی آماده می‌کنیم.',
  },
  {
    num: '۳',
    title: 'قالب‌ها و گردش‌کارهای ساده',
    desc: 'trackerها، فایل‌های Google Sheets و روندهای کاری سبک می‌سازیم که بتوانی واقعاً استفاده کنی.',
  },
]

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: 'easeOut' },
} as const

export default function ServicesSection() {
  const locale = useLocale()
  const isFa = locale === 'fa'

  if (isFa) {
    return (
      <section
        id="services"
        dir="rtl"
        style={{
          background: '#FAF1E6',
          borderTop: '0.5px solid #E6D7C8',
          padding: '64px 24px',
          scrollMarginTop: '96px',
        }}
      >
        <motion.div style={{ maxWidth: '640px', margin: '0 auto' }} {...fadeIn}>
          {/* Header */}
          <div style={{ marginBottom: '36px' }}>
            <p
              style={{
                fontFamily: vaFont,
                fontSize: '13px',
                fontWeight: 700,
                color: '#E34E2E',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              خدمات
            </p>
            <h2
              style={{
                fontFamily: vaFont,
                fontSize: 'clamp(17px, 2.4vw, 22px)',
                fontWeight: 700,
                color: '#111111',
                lineHeight: 1.6,
                marginBottom: '12px',
              }}
            >
              کارهای تکراری را به یک سیستم ساده تبدیل کن
            </h2>
            <p
              style={{
                fontFamily: vaFont,
                fontSize: '14px',
                color: '#625B55',
                lineHeight: 1.9,
                maxWidth: '520px',
              }}
            >
              اگر ایمیل‌ها، گزارش‌ها، برنامه‌ریزی یا فایل‌هایت پراکنده‌اند، با کمک هوش مصنوعی یک روند کاری سبک و قابل استفاده می‌سازیم.
            </p>
          </div>

          {/* Service list */}
          <ul style={{ listStyle: 'none', margin: '0 0 32px', padding: 0 }}>
            {FA_SERVICES.map((svc, i) => (
              <li
                key={svc.num}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '20px 0',
                  borderBottom:
                    i < FA_SERVICES.length - 1 ? '0.5px solid #E6D7C8' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: vaFont,
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#E34E2E',
                    flexShrink: 0,
                    width: '20px',
                    textAlign: 'center',
                    marginTop: '3px',
                  }}
                >
                  {svc.num}
                </span>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: vaFont,
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#111111',
                      lineHeight: 1.5,
                      marginBottom: '5px',
                    }}
                  >
                    {svc.title}
                  </p>
                  <p
                    style={{
                      fontFamily: vaFont,
                      fontSize: '13px',
                      color: '#625B55',
                      lineHeight: 1.85,
                      margin: 0,
                    }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/services"
            style={{
              fontFamily: vaFont,
              fontSize: '14px',
              fontWeight: 600,
              color: '#FFFDF8',
              background: '#3F8DDE',
              padding: '11px 24px',
              borderRadius: '100px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            مشاهده خدمات
            <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} />
          </Link>
        </motion.div>
      </section>
    )
  }

  return (
    <section
      dir="ltr"
      id="services"
      style={{
        background: '#FAF6EF',
        padding: 'clamp(96px, 12vw, 140px) clamp(24px, 8vw, 80px)',
        borderTop: '0.5px solid rgba(17,17,17,0.07)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        style={{ maxWidth: '1200px', margin: '0 auto' }}
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
                02
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
                WORKFLOWS
              </span>
            </div>
            <div style={{ height: '0.5px', background: 'rgba(17,17,17,0.14)' }} />
          </div>

          {/* Right: content */}
          <div>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(38px, 5vw, 68px)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                marginBottom: '28px',
              }}
            >
              Practical AI that works with you.
            </h2>

            <p
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(16px, 1.4vw, 19px)',
                color: '#625B55',
                lineHeight: 1.72,
                marginBottom: '40px',
                maxWidth: '580px',
              }}
            >
              I help you set up AI workflows, templates, and simple automations that reduce
              repetitive work and make your daily tools easier to use.
            </p>

            <Link
              href="/services"
              style={{
                display: 'inline-block',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '16px',
                fontWeight: 700,
                color: '#111111',
                textDecoration: 'none',
                paddingBottom: '6px',
                borderBottom: '1.5px solid rgba(17,17,17,0.22)',
                transition: 'opacity 0.15s',
              }}
            >
              Explore more →
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
