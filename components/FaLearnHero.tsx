'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Link } from '@/i18n/navigation'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"
const EASE   = [0.22, 1, 0.36, 1] as const

export default function FaLearnHero() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      dir="rtl"
      style={{
        background:     '#FAF6EF',
        paddingTop:     'clamp(80px, 12vw, 120px)',
        paddingBottom:  'clamp(72px, 9vw, 96px)',
        paddingLeft:    'clamp(24px, 8vw, 80px)',
        paddingRight:   'clamp(24px, 8vw, 80px)',
        borderBottom:   '0.5px solid rgba(17,17,17,0.07)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily:    vaFont,
            fontSize:      '11px',
            fontWeight:     700,
            letterSpacing: '0.18em',
            color:          '#E34E2E',
            marginBottom:  '28px',
          }}
        >
          آموزش
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily:    vaFont,
            fontSize:      'clamp(36px, 5.5vw, 68px)',
            fontWeight:     800,
            color:          '#111111',
            lineHeight:     1.18,
            letterSpacing: '-0.01em',
            marginBottom:  '28px',
          }}
        >
          یاد بگیر چطور با هوش مصنوعی بهتر کار کنی
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily:  vaFont,
            fontSize:    'clamp(15px, 1.4vw, 18px)',
            color:       '#625B55',
            lineHeight:   1.80,
            maxWidth:    '580px',
            margin:      '0 auto 44px',
          }}
        >
          آموزش‌های ساده و مرحله‌به‌مرحله برای استفاده از ChatGPT، Claude و ابزارهای اتوماسیون در کارهای واقعی روزمره؛ بدون کدنویسی و بدون سردرگمی
        </p>

        {/* CTAs */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '24px',
            flexWrap:       'wrap',
          }}
        >
          <a
            href="#training"
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
              whiteSpace:     'nowrap',
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
            شروع یادگیری
          </a>

          <Link
            href="/templates"
            style={{
              fontFamily:     vaFont,
              fontSize:       '15px',
              fontWeight:      500,
              color:           '#8C7E74',
              textDecoration: 'none',
              transition:     'color 0.15s',
              whiteSpace:     'nowrap',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#111111'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#8C7E74'
            }}
          >
            دیدن قالب‌ها ←
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
