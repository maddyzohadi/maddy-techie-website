'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const SERIF = "'DM Serif Display', serif"
const SANS  = 'system-ui, -apple-system, sans-serif'

// Headline rendered as three intentional lines — each animates as a unit
const LINES = [
  { text: 'AI workflow',   italic: false },
  { text: 'services for',  italic: false },
  { text: 'modern work',   italic: true  },
] as const

const SERVICES = [
  { num: '01', label: 'AI Setup' },
  { num: '02', label: 'Workflow Design' },
  { num: '03', label: 'Templates & Training' },
] as const

export default function ServicesHero() {
  const reduced = useReducedMotion()

  // Spring-feel ease used throughout
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section
      dir="ltr"
      style={{
        background: '#FAF6EF',
        padding: 'clamp(72px, 9vw, 108px) clamp(24px, 8vw, 80px) 0',
        borderBottom: '0.5px solid rgba(17,17,17,0.07)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── Top strip: eyebrow + animated rule ─────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: 'clamp(44px, 7vw, 80px)',
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease }}
            style={{
              fontFamily: SANS,
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: '#E34E2E',
              flexShrink: 0,
            }}
          >
            Services
          </motion.span>

          {/* Animated rule — extends from the eyebrow to the right */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.90, delay: 0.15, ease }}
            style={{
              flex: 1,
              height: '0.5px',
              background: 'rgba(17,17,17,0.16)',
              transformOrigin: 'left',
            }}
          />
        </div>

        {/* ── Main asymmetric grid ────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_268px] gap-8 md:gap-14"
          style={{ alignItems: 'start' }}
        >

          {/* Left: oversized headline — left-anchored, NOT centered */}
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(52px, 9vw, 112px)',
              fontWeight: 400,
              color: '#111111',
              lineHeight: 0.96,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            {LINES.map((line, i) => (
              <motion.span
                key={line.text}
                initial={{ opacity: 0, y: reduced ? 0 : 36, skewY: reduced ? 0 : 4 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.70, delay: 0.08 + i * 0.10, ease }}
                style={{ display: 'block' }}
              >
                {line.italic
                  ? <em style={{ fontStyle: 'italic' }}>{line.text}</em>
                  : line.text}
              </motion.span>
            ))}
          </h1>

          {/* Right: service index + CTA */}
          <div style={{ paddingTop: 'clamp(12px, 2vw, 28px)' }}>

            {/* "What I offer" micro-label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.42, ease }}
              style={{
                fontFamily: SANS,
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#8C7E74',
                marginBottom: '14px',
              }}
            >
              What I offer
            </motion.p>

            {/* Service list */}
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {SERVICES.map((svc, i) => (
                <motion.li
                  key={svc.num}
                  initial={{ opacity: 0, x: reduced ? 0 : 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.46 + i * 0.09, ease }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 0',
                    borderTop: '0.5px solid rgba(17,17,17,0.09)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontStyle: 'italic',
                      fontSize: '13px',
                      color: '#E34E2E',
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {svc.num}
                  </span>
                  <span
                    style={{
                      fontFamily: SANS,
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#625B55',
                      lineHeight: 1.3,
                    }}
                  >
                    {svc.label}
                  </span>
                </motion.li>
              ))}
              {/* Closing rule */}
              <li
                aria-hidden="true"
                style={{ height: '0.5px', background: 'rgba(17,17,17,0.09)' }}
              />
            </ul>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.50, delay: 0.78, ease }}
              style={{ marginTop: '24px' }}
            >
              <a
                href="#contact-form"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 28px',
                  background: '#E34E2E',
                  color: '#FFFDF8',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  fontFamily: SANS,
                  fontSize: '15px',
                  fontWeight: 600,
                  transition: 'background 0.15s, transform 0.15s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.background = '#C63C1E'
                  ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.background = '#E34E2E'
                  ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
                }}
              >
                Start a Project
                <ArrowRight size={14} />
              </a>
            </motion.div>

          </div>
        </div>

        {/* ── Bottom strip: subheadline — full-width, ruled off ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.60, delay: 0.82, ease }}
          style={{
            marginTop: 'clamp(44px, 7vw, 80px)',
            paddingTop: 'clamp(24px, 3.5vw, 40px)',
            paddingBottom: 'clamp(44px, 7vw, 80px)',
            borderTop: '0.5px solid rgba(17,17,17,0.09)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'clamp(32px, 6vw, 80px)',
            flexWrap: 'wrap',
          }}
        >
          <p
            style={{
              fontFamily: SANS,
              fontSize: 'clamp(15px, 1.4vw, 17px)',
              color: '#625B55',
              lineHeight: 1.72,
              margin: 0,
              maxWidth: '480px',
              flex: '1 1 260px',
            }}
          >
            Focused AI setup for real work — ChatGPT, Claude, and Google Sheets.
            No code, no wasted sessions.
          </p>
          <p
            style={{
              fontFamily: SANS,
              fontSize: '13px',
              color: '#8C7E74',
              lineHeight: 1.65,
              margin: 0,
              flex: '1 1 200px',
              maxWidth: '280px',
            }}
          >
            Setup takes one session.
            <br />
            Results start the same week.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
