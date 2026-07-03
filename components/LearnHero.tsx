'use client'

import { motion } from 'motion/react'

export default function LearnHero() {
  return (
    <section
      dir="ltr"
      style={{
        background: '#FAF6EF',
        padding: 'clamp(72px, 10vw, 108px) clamp(24px, 8vw, 80px) clamp(72px, 9vw, 96px)',
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
          The Training
        </p>

        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(42px, 6vw, 76px)',
            fontWeight: 400,
            color: '#111111',
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            marginBottom: '28px',
          }}
        >
          Learn by building{' '}
          <em style={{ fontStyle: 'italic' }}>real workflows.</em>
        </h1>

        <p
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(16px, 1.4vw, 19px)',
            color: '#625B55',
            lineHeight: 1.70,
            maxWidth: '520px',
            margin: '0 auto',
          }}
        >
          Four modules. Real workflows. Something you can use after every one.
        </p>
      </motion.div>
    </section>
  )
}
