'use client'

import { motion } from 'motion/react'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"
const EASE   = [0.22, 1, 0.36, 1] as const

export default function FaHomepageCTA() {
  return (
    <section
      dir="rtl"
      style={{
        background:  '#FFFDF8',
        padding:     'clamp(80px, 10vw, 116px) clamp(24px, 8vw, 80px)',
        borderTop:   '0.5px solid rgba(17,17,17,0.07)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, ease: EASE }}
        style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}
      >
        {/* Container */}
        <div
          style={{
            background:    '#FAF6EF',
            borderRadius:  '20px',
            padding:       'clamp(48px, 7vw, 72px) clamp(32px, 6vw, 64px)',
            border:        '0.5px solid rgba(17,17,17,0.07)',
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily:    vaFont,
              fontSize:      '11px',
              fontWeight:     700,
              letterSpacing: '0.16em',
              color:          '#E34E2E',
              marginBottom:  '20px',
            }}
          >
            از همین‌جا شروع کن
          </p>

          {/* Headline */}
          <h2
            style={{
              fontFamily:    vaFont,
              fontSize:      'clamp(24px, 3.2vw, 44px)',
              fontWeight:     800,
              color:          '#111111',
              lineHeight:     1.28,
              letterSpacing: '-0.01em',
              marginBottom:  '20px',
            }}
          >
            هوش مصنوعی را وارد کارهای روزمره‌ات کن
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily:  vaFont,
              fontSize:    'clamp(14px, 1.3vw, 17px)',
              color:       '#625B55',
              lineHeight:   1.85,
              maxWidth:    '520px',
              margin:      '0 auto 40px',
            }}
          >
            آموزش‌های ساده، قالب‌های آماده و جریان‌های کاری‌ای که برای افراد غیر فنی ساخته شده‌اند، نه فقط متخصص‌ها
          </p>

          {/* CTA */}
          <a
            href="/fa/learn"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              padding:        '15px 36px',
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
            از اینجا شروع کن
          </a>
        </div>
      </motion.div>
    </section>
  )
}
