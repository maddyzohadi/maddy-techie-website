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

  // ── FA: keep existing design unchanged ────────────────────────────────
  return (
    <section
      style={{
        position: 'relative',
        background: '#FFF9F1',
        borderBottom: '0.5px solid #E6D7C8',
        paddingTop: 'calc(68px + 40px)',
        paddingBottom: '52px',
        overflow: 'hidden',
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg" dir="rtl">
          <p
            className="font-ui font-bold mb-5"
            style={{
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '.12em',
              color: '#E34E2E',
              textTransform: 'uppercase',
            }}
          >
            سیستم‌های آماده
          </p>

          <h2
            className="font-fa"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 46px)',
              fontWeight: 700,
              color: '#111111',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            هوش مصنوعی را به یک سیستم ساده{' '}
            <span style={{ color: 'rgba(17,17,17,0.38)' }}>تبدیل کن</span>
          </h2>

          <p
            className="font-fa"
            style={{
              fontSize: '16px',
              color: '#625B55',
              lineHeight: 1.65,
              marginBottom: '28px',
            }}
          >
            با یک قالب رایگان شروع کن. بدون شروع از صفر، بدون وقت‌تلف.
          </p>

          <a
            href="#templates"
            className="font-ui font-bold inline-flex items-center gap-2 text-white no-underline rounded-full bg-brand-blue hover:bg-brand-blue-dark transition-colors duration-150"
            style={{ padding: '13px 28px', fontSize: '14.5px' }}
          >
            مشاهده قالب‌ها ↓
          </a>
        </div>
      </div>
    </section>
  )
}
