'use client'

import { useLocale } from 'next-intl'
import { motion } from 'motion/react'

export default function TemplatesHero() {
  const locale = useLocale()
  const isFa = locale === 'fa'

  // ── EN: editorial hero ────────────────────────────────────────────────
  if (!isFa) {
    return (
      <section
        dir="ltr"
        style={{
          background: '#FAF6EF',
          paddingTop: 'clamp(120px, 14vw, 160px)',
          paddingBottom: 'clamp(72px, 9vw, 100px)',
          paddingLeft: 'clamp(24px, 8vw, 80px)',
          paddingRight: 'clamp(24px, 8vw, 80px)',
          borderBottom: '0.5px solid rgba(17,17,17,0.07)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}
        >
          <p
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: '#E34E2E',
              marginBottom: '28px',
            }}
          >
            Ready-to-use Systems
          </p>

          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(40px, 6vw, 74px)',
              fontWeight: 400,
              color: '#111111',
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              marginBottom: '28px',
            }}
          >
            Ready-to-use AI systems{' '}
            <em style={{ fontStyle: 'italic' }}>for everyday work</em>
          </h1>

          <p
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(16px, 1.4vw, 18px)',
              color: '#625B55',
              lineHeight: 1.72,
              maxWidth: '560px',
              margin: '0 auto 44px',
            }}
          >
            Start with practical templates for prompts, emails, reports, content planning, and simple workflows — built for people who want results without starting from scratch.
          </p>

          <a
            href="#templates"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: '#E34E2E',
              color: '#FFFDF8',
              borderRadius: '100px',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.01em',
              transition: 'background 0.15s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#C63C1E'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#E34E2E'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
            }}
          >
            Browse templates ↓
          </a>
        </motion.div>
      </section>
    )
  }

  // ── FA: editorial hero matching EN style ─────────────────────────────
  const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

  return (
    <section
      dir="rtl"
      style={{
        background: '#FAF6EF',
        paddingTop:    'clamp(120px, 14vw, 160px)',
        paddingBottom: 'clamp(72px, 9vw, 100px)',
        paddingLeft:   'clamp(24px, 8vw, 80px)',
        paddingRight:  'clamp(24px, 8vw, 80px)',
        borderBottom:  '0.5px solid rgba(17,17,17,0.07)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}
      >
        <p
          style={{
            fontFamily:    vaFont,
            fontSize:      '11px',
            fontWeight:     700,
            letterSpacing: '0.16em',
            color:          '#E34E2E',
            marginBottom:  '28px',
          }}
        >
          قالب‌های آماده
        </p>

        <h1
          style={{
            fontFamily:    vaFont,
            fontSize:      'clamp(36px, 5.5vw, 68px)',
            fontWeight:     800,
            color:          '#111111',
            lineHeight:     1.15,
            letterSpacing: '-0.01em',
            marginBottom:  '28px',
          }}
        >
          سیستم‌های آماده برای کارهای روزمره با هوش مصنوعی
        </h1>

        <p
          style={{
            fontFamily:  vaFont,
            fontSize:    'clamp(15px, 1.4vw, 18px)',
            color:       '#625B55',
            lineHeight:   1.80,
            maxWidth:    '560px',
            margin:      '0 auto 44px',
          }}
        >
          با قالب‌های آماده شروع کن؛ برای نوشتن، برنامه‌ریزی، گزارش‌سازی، مدیریت مشتری و ساخت جریان‌های کاری ساده، بدون اینکه از صفر شروع کنی
        </p>

        <a
          href="#templates"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '8px',
            padding:        '14px 32px',
            background:     '#E34E2E',
            color:          '#FFFDF8',
            borderRadius:   '100px',
            textDecoration: 'none',
            fontFamily:      vaFont,
            fontSize:        '15px',
            fontWeight:       700,
            transition:      'background 0.15s, transform 0.15s',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.background = '#C63C1E'
            ;(e.currentTarget as HTMLAnchorElement).style.transform  = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.background = '#E34E2E'
            ;(e.currentTarget as HTMLAnchorElement).style.transform  = 'translateY(0)'
          }}
        >
          دیدن قالب‌ها ↓
        </a>
      </motion.div>
    </section>
  )
}
