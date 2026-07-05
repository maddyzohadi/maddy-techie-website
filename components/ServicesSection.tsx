'use client'

import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { motion } from 'motion/react'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

export default function ServicesSection() {
  const locale = useLocale()
  const isFa = locale === 'fa'

  if (isFa) {
    const SERIF  = "'DM Serif Display', serif"
    const BORDER = '0.5px solid rgba(17,17,17,0.07)'
    const EASE   = [0.22, 1, 0.36, 1] as const
    return (
      <section
        id="services"
        dir="rtl"
        style={{
          background:      '#FAF6EF',
          padding:         'clamp(96px, 12vw, 140px) clamp(24px, 8vw, 80px)',
          borderTop:        BORDER,
          scrollMarginTop: '96px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-[196px_1fr] gap-10 md:gap-[72px]"
            style={{ alignItems: 'start' }}
          >

            {/* Right: section label */}
            <div style={{ paddingTop: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '16px' }}>
                <span style={{
                  fontFamily:    SERIF,
                  fontStyle:     'italic',
                  fontSize:      'clamp(38px, 4vw, 58px)',
                  color:         '#E34E2E',
                  lineHeight:     1,
                  letterSpacing: '-0.02em',
                }}>
                  03
                </span>
                <span style={{
                  fontFamily:    vaFont,
                  fontSize:      '11px',
                  fontWeight:     700,
                  letterSpacing: '0.10em',
                  color:         '#8C7E74',
                }}>
                  خدمات
                </span>
              </div>
              <div style={{ height: '0.5px', background: 'rgba(17,17,17,0.14)' }} />
            </div>

            {/* Left: content */}
            <div>
              <h2 style={{
                fontFamily:    vaFont,
                fontSize:      'clamp(26px, 3.2vw, 48px)',
                fontWeight:     800,
                color:          '#111111',
                lineHeight:     1.28,
                letterSpacing: '-0.01em',
                marginBottom:  '28px',
              }}>
                کارهای تکراری را به هوش مصنوعی بسپار
              </h2>

              <p style={{
                fontFamily:   vaFont,
                fontSize:     'clamp(15px, 1.4vw, 18px)',
                color:        '#625B55',
                lineHeight:    1.85,
                marginBottom: '40px',
                maxWidth:     '560px',
              }}>
                از پیش‌نویس ایمیل و ایده‌های محتوا تا فایل‌ها، گزارش‌ها و جریان‌های کاری ساده، کمکت می‌کنم سیستم‌هایی بسازی که کارهایت روان‌تر جلو بروند
              </p>

              <Link
                href="/services"
                style={{
                  display:        'inline-block',
                  fontFamily:      vaFont,
                  fontSize:       '16px',
                  fontWeight:      700,
                  color:           '#111111',
                  textDecoration: 'none',
                  paddingBottom:  '6px',
                  borderBottom:   '1.5px solid rgba(17,17,17,0.22)',
                  transition:     'opacity 0.15s',
                }}
              >
                بیشتر ببین ←
              </Link>
            </div>

          </div>
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
