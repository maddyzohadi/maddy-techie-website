'use client'

import { motion } from 'motion/react'
import { Link } from '@/i18n/navigation'

export default function StartTodayCTA() {
  return (
    <section
      dir="ltr"
      style={{
        background: [
          'radial-gradient(ellipse 70% 90% at 85% 0%, rgba(227,78,46,0.14) 0%, rgba(244,160,130,0.09) 40%, transparent 68%)',
          '#FFFDF8',
        ].join(', '),
        padding: 'clamp(96px, 12vw, 140px) clamp(24px, 8vw, 80px)',
        borderTop: '0.5px solid rgba(17,17,17,0.07)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}
      >

        {/* Eyebrow */}
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
          Start Today
        </p>

        {/* Headline — italic emphasis on second line */}
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(36px, 5.5vw, 76px)',
            fontWeight: 400,
            color: '#111111',
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            marginBottom: '28px',
          }}
        >
          Build the version of you that{' '}
          <em style={{ fontStyle: 'italic' }}>works with AI.</em>
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(16px, 1.4vw, 19px)',
            color: '#625B55',
            lineHeight: 1.72,
            marginBottom: '52px',
            maxWidth: '520px',
            margin: '0 auto 52px',
          }}
        >
          Simple lessons, ready-to-use templates, and workflows designed for
          people — not engineers.
        </p>

        {/* Dark pill CTA */}
        <Link
          href="/learn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '18px 44px',
            background: '#111111',
            color: '#FFFDF8',
            borderRadius: '100px',
            textDecoration: 'none',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '17px',
            fontWeight: 600,
            letterSpacing: '0.01em',
            transition: 'background 0.15s, transform 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#2A2A2A'
            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#111111'
            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
          }}
        >
          Start learning AI
          <span
            aria-hidden
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'rgba(255,253,248,0.15)',
              fontSize: '13px',
              flexShrink: 0,
            }}
          >
            ↗
          </span>
        </Link>
      </motion.div>
    </section>
  )
}
