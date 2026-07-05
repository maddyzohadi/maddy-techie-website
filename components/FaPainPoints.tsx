'use client'

import { motion } from 'motion/react'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"
const SERIF  = "'DM Serif Display', serif"
const BORDER = '0.5px solid rgba(17,17,17,0.07)'
const EASE   = [0.22, 1, 0.36, 1] as const

const scrollFade = {
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-80px' as const },
  transition:  { duration: 0.65, ease: EASE },
} as const

export default function FaPainPoints() {
  return (
    <>
      {/* ── Section 01 / یادگیری ─────────────────────────────────────────── */}
      <section
        dir="rtl"
        id="learn"
        style={{
          background: '#FAF6EF',
          padding:    'clamp(96px, 12vw, 140px) clamp(24px, 8vw, 80px)',
          borderTop:   BORDER,
        }}
      >
        <motion.div {...scrollFade} style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            className="grid grid-cols-1 md:grid-cols-[196px_1fr] gap-10 md:gap-[72px]"
            style={{ alignItems: 'start' }}
          >

            {/* Right: section label (first DOM child = right in RTL grid) */}
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
                  01
                </span>
                <span style={{
                  fontFamily:    vaFont,
                  fontSize:      '11px',
                  fontWeight:     700,
                  letterSpacing: '0.10em',
                  color:         '#8C7E74',
                }}>
                  یادگیری
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
                هوش مصنوعی کارها را ساده‌تر می‌کند
              </h2>

              <p style={{
                fontFamily:   vaFont,
                fontSize:     'clamp(15px, 1.4vw, 18px)',
                color:        '#625B55',
                lineHeight:    1.85,
                marginBottom: '40px',
                maxWidth:     '560px',
              }}>
                یاد بگیر چطور از هوش مصنوعی برای نوشتن، برنامه‌ریزی، خلاصه‌سازی و ساختن جریان‌های کاری ساده‌تر استفاده کنی؛ بدون نیاز به دانش فنی یا کدنویسی
              </p>

              <a
                href="/fa/learn"
                style={{
                  display:       'inline-block',
                  fontFamily:     vaFont,
                  fontSize:      '16px',
                  fontWeight:     700,
                  color:          '#111111',
                  textDecoration: 'none',
                  paddingBottom:  '6px',
                  borderBottom:   '1.5px solid rgba(17,17,17,0.22)',
                  transition:     'opacity 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.55' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
              >
                بیشتر ببین ←
              </a>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ── Section 02 / جریان‌های کاری ─────────────────────────────────── */}
      <section
        dir="rtl"
        id="workflows"
        style={{
          background: '#FFFDF8',
          padding:    'clamp(96px, 12vw, 140px) clamp(24px, 8vw, 80px)',
          borderTop:   BORDER,
        }}
      >
        <motion.div {...scrollFade} style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
                  02
                </span>
                <span style={{
                  fontFamily:    vaFont,
                  fontSize:      '11px',
                  fontWeight:     700,
                  letterSpacing: '0.10em',
                  color:         '#8C7E74',
                }}>
                  جریان‌های کاری
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
                سیستم‌هایی که همراه کارت کار می‌کنند
              </h2>

              <p style={{
                fontFamily:   vaFont,
                fontSize:     'clamp(15px, 1.4vw, 18px)',
                color:        '#625B55',
                lineHeight:    1.85,
                marginBottom: '40px',
                maxWidth:     '560px',
              }}>
                کمکت می‌کنم جریان‌های کاری، قالب‌ها و اتوماسیون‌های ساده‌ای بسازی که کارهای تکراری را کمتر کنند و ابزارهای روزمره‌ات را راحت‌تر قابل استفاده کنند
              </p>

              <a
                href="/fa/services"
                style={{
                  display:       'inline-block',
                  fontFamily:     vaFont,
                  fontSize:      '16px',
                  fontWeight:     700,
                  color:          '#111111',
                  textDecoration: 'none',
                  paddingBottom:  '6px',
                  borderBottom:   '1.5px solid rgba(17,17,17,0.22)',
                  transition:     'opacity 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.55' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
              >
                بیشتر ببین ←
              </a>
            </div>

          </div>
        </motion.div>
      </section>
    </>
  )
}
