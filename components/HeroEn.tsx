'use client'

import { motion, useReducedMotion } from 'motion/react'

const SERIF = "'DM Serif Display', serif"
const SANS  = 'system-ui, -apple-system, sans-serif'
const EASE  = [0.22, 1, 0.36, 1] as const

// ── Fingerprint SVG ──────────────────────────────────────────────────────────
function FingerprintIcon() {
  return (
    <svg
      viewBox="0 0 40 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{
        height:        '0.82em',
        width:         'auto',
        display:       'inline-block',
        verticalAlign: 'middle',
        flexShrink:    0,
        marginBottom:  '0.05em',
      }}
    >
      <defs>
        <clipPath id="hFpOval">
          <ellipse cx="20" cy="25" rx="17.5" ry="22"/>
        </clipPath>
        <radialGradient id="hFpGlow" cx="38%" cy="35%" r="58%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#F4A082" stopOpacity="0.72"/>
          <stop offset="100%" stopColor="#F4A082" stopOpacity="0"/>
        </radialGradient>
        <style>{`
          @keyframes hFpPulse {
            0%,100% { opacity:0.48; }
            50%     { opacity:1.00; }
          }
          .hFpGlowLayer { animation: hFpPulse 3.2s ease-in-out infinite; }
          @media (prefers-reduced-motion:reduce) {
            .hFpGlowLayer { animation:none; opacity:0.65; }
          }
        `}</style>
      </defs>

      <ellipse cx="20" cy="25" rx="17.5" ry="22" fill="#E34E2E" fillOpacity="0.055"/>

      <g clipPath="url(#hFpOval)">
        <ellipse cx="20" cy="25" rx="17.0" ry="21.5" stroke="#E34E2E" strokeWidth="1.35" strokeOpacity="0.40"/>
        <ellipse cx="20" cy="25" rx="13.8" ry="17.5" stroke="#E34E2E" strokeWidth="1.35" strokeOpacity="0.56"/>
        <ellipse cx="20" cy="25" rx="10.6" ry="13.5" stroke="#E34E2E" strokeWidth="1.35" strokeOpacity="0.70"/>
        <ellipse cx="20" cy="25" rx="7.4"  ry="9.4"  stroke="#E34E2E" strokeWidth="1.35" strokeOpacity="0.83"/>
        <ellipse cx="20" cy="25" rx="4.2"  ry="5.4"  stroke="#E34E2E" strokeWidth="1.35" strokeOpacity="0.92"/>
        <ellipse cx="20" cy="25" rx="1.5"  ry="1.9"  stroke="#E34E2E" strokeWidth="1.35" strokeOpacity="1.00"/>
        <ellipse className="hFpGlowLayer" cx="20" cy="25" rx="17" ry="21" fill="url(#hFpGlow)"/>
      </g>

      <ellipse cx="20" cy="25" rx="17.5" ry="22" stroke="#E34E2E" strokeWidth="1.1" strokeOpacity="0.26"/>
    </svg>
  )
}

// ── Background ────────────────────────────────────────────────────────────────
function HeroBackground() {
  return (
    <div
      aria-hidden
      style={{
        position:      'absolute',
        top:           '50%',
        left:          '50%',
        transform:     'translate(-50%, -50%)',
        width:         'max(100vw, 100vh)',
        height:        'max(100vw, 100vh)',
        pointerEvents: 'none',
        zIndex:        0,
      }}
    >
      <svg
        viewBox="0 0 1200 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <radialGradient id="hgA" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#E34E2E" stopOpacity="0.28"/>
            <stop offset="100%" stopColor="#E34E2E" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="hgB" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#F4A082" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="#F4A082" stopOpacity="0"/>
          </radialGradient>
        </defs>

        <ellipse cx="900" cy="220" rx="420" ry="340" fill="url(#hgA)"/>
        <ellipse cx="260" cy="1020" rx="380" ry="300" fill="url(#hgB)"/>
      </svg>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function HeroEn() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      dir="ltr"
      style={{
        background:    '#FAF6EF',
        minHeight:     '100dvh',
        display:       'flex',
        flexDirection: 'column',
        overflow:      'hidden',
        position:      'relative',
      }}
    >
      {/*
        Light-sweep CSS animation — pure CSS so it is immune to Framer Motion
        hydration timing. Fires 1.6s after page load, repeats every 9s.
        prefers-reduced-motion disables it via media query.
      */}
      <style>{`
        @keyframes hSweep {
          0%   { transform: skewX(-14deg) translateX(-130%); opacity: 0; }
          4%   { opacity: 1; }
          33%  { transform: skewX(-14deg) translateX(360%); opacity: 1; }
          34%  { opacity: 0; }
          100% { opacity: 0; transform: skewX(-14deg) translateX(360%); }
        }
        .h-sweep {
          animation: hSweep 9s linear infinite;
          animation-delay: 1.6s;
        }
        @media (prefers-reduced-motion: reduce) {
          .h-sweep { animation: none; opacity: 0; }
        }
      `}</style>

      {/*
        Background drift — increased y amplitude (12→28) and halved duration
        (18s→10s) so the movement is clearly visible at normal viewing distance.
      */}
      <motion.div
        aria-hidden
        animate={reduced ? {} : { y: [0, -28, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      >
        <HeroBackground />
      </motion.div>

      {/* Diagonal light sweep — warm cream band moving L→R every 9s */}
      <div
        aria-hidden
        className="h-sweep"
        style={{
          position:      'absolute',
          top:            0,
          left:           0,
          width:         '34%',
          height:        '100%',
          background:    'linear-gradient(to right, transparent, rgba(244,160,130,0.09) 30%, rgba(255,250,245,0.22) 50%, rgba(244,160,130,0.09) 70%, transparent)',
          pointerEvents: 'none',
          zIndex:         2,
          willChange:    'transform',
        }}
      />

      {/* Centre vignette */}
      <div
        aria-hidden
        style={{
          position:      'absolute',
          inset:          0,
          pointerEvents: 'none',
          zIndex:         3,
          background:
            'radial-gradient(ellipse 54% 62% at 50% 48%, rgba(250,246,239,0.46) 0%, rgba(250,246,239,0.14) 55%, rgba(250,246,239,0.02) 100%)',
        }}
      />

      {/* ── Main centred content ─────────────────────────────────────────── */}
      <div
        style={{
          position:      'relative',
          zIndex:         10,
          flex:            1,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        'clamp(80px, 10dvh, 100px) clamp(20px, 4vw, 44px) clamp(48px, 6dvh, 64px)',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '760px', width: '100%' }}>

          {/* Pre-headline — blur-to-focus reveal */}
          <motion.p
            initial={{ opacity: 0, filter: reduced ? 'blur(0px)' : 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.72, ease: EASE }}
            style={{
              fontFamily:   SANS,
              fontSize:     'clamp(13px, 1.3vw, 15px)',
              fontWeight:    500,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color:         '#A09288',
              marginBottom:  '22px',
            }}
          >
            The future of work is
          </motion.p>

          {/*
            Main headline — fingerprint in its own isolated flex slot; "Human + AI"
            text trio in a separate clipped container. overflow:hidden on the text
            wrapper means x-translations are invisible outside that box, so "Human"
            and "AI" can never visually enter the fingerprint's column.
          */}
          <h1
            style={{
              fontFamily:    SERIF,
              fontSize:      'clamp(44px, 7.5vw, 96px)',
              fontWeight:     700,
              color:          '#111111',
              lineHeight:     1.05,
              letterSpacing:  '-0.03em',
              marginBottom:   '36px',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            '0.26em',
              flexWrap:       'wrap',
            }}
          >
            {/*
              Fingerprint — own fixed flex item, flexShrink:0 so it never
              gets squeezed. Only animates on y (float). Never moves horizontally.
            */}
            <motion.span
              initial={{ opacity: 0, scale: reduced ? 1 : 0.78, rotate: reduced ? 0 : -6 }}
              animate={{
                opacity: 1,
                scale:   1,
                rotate:  0,
                y:       reduced ? 0 : [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.65, delay: 0.04, ease: EASE },
                scale:   { duration: 0.65, delay: 0.04, ease: EASE },
                rotate:  { duration: 0.65, delay: 0.04, ease: EASE },
                y:       { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8, repeatType: 'mirror' },
              }}
              style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
            >
              <FingerprintIcon />
            </motion.span>

            {/*
              Clipped text container — the animation domain for "Human" and "AI".
              overflow:hidden clips any x-translation at this box's boundary, so
              neither word can visually cross into the fingerprint's space.
              Vertical padding prevents ascenders/descenders from being clipped.
            */}
            <span
              style={{
                display:    'inline-flex',
                alignItems: 'center',
                gap:        '0.18em',
                overflow:   'hidden',
                padding:    '0.12em 0.06em',
              }}
            >
              {/* "Human" — slides in from the left edge of the clipped container */}
              <motion.span
                initial={{ opacity: 0, x: reduced ? 0 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 3.4, delay: 0.08, ease: EASE }}
              >
                Human
              </motion.span>

              {/* "+" — blooms from center with spring */}
              <motion.span
                initial={{ opacity: 0, scale: reduced ? 1 : 0.45 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  reduced
                    ? { duration: 0.35, delay: 0.22 }
                    : { type: 'spring', stiffness: 260, damping: 14, delay: 0.22 }
                }
                style={{ color: '#E34E2E' }}
              >
                +
              </motion.span>

              {/* "AI" — slides in from the right edge of the clipped container */}
              <motion.span
                initial={{ opacity: 0, x: reduced ? 0 : 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 3.4, delay: 0.08, ease: EASE }}
              >
                AI
              </motion.span>
            </span>
          </h1>

          {/* CTA — y offset increased from 16→24 for more visible entrance */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.60, delay: 0.46, ease: EASE }}
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}
          >
            <a
              href="/learn"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '8px',
                padding:        '14px 30px',
                background:     '#E34E2E',
                color:          '#fff',
                borderRadius:   '100px',
                textDecoration: 'none',
                fontFamily:     SANS,
                fontSize:       '15px',
                fontWeight:      600,
                letterSpacing:  '0.01em',
                transition:     'background 0.15s, transform 0.15s',
                whiteSpace:     'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#C43E22'
                e.currentTarget.style.transform  = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#E34E2E'
                e.currentTarget.style.transform  = 'translateY(0)'
              }}
            >
              Start learning AI
              <span aria-hidden>→</span>
            </a>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom strip ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.62, ease: EASE }}
        style={{
          position:  'relative',
          zIndex:     10,
          borderTop: '0.5px solid rgba(17,17,17,0.09)',
        }}
      >
        <div
          style={{
            maxWidth:   '1200px',
            margin:     '0 auto',
            padding:    'clamp(24px, 3.5vw, 40px) clamp(20px, 4vw, 44px)',
            display:    'flex',
            flexWrap:   'wrap',
            gap:        'clamp(20px, 5vw, 72px)',
            alignItems: 'start',
          }}
        >
          <p
            style={{
              fontFamily: SANS,
              fontSize:   'clamp(14px, 1.3vw, 16px)',
              color:      '#625B55',
              lineHeight:  1.72,
              margin:      0,
              flex:        '1 1 240px',
              maxWidth:    '480px',
            }}
          >
            AI and automation to help you work faster, stay organized, and build smarter
            workflows without coding.
          </p>
          <p
            style={{
              fontFamily: SANS,
              fontSize:   '13px',
              color:      '#8C7E74',
              lineHeight:  1.65,
              margin:      0,
              flex:        '1 1 180px',
              maxWidth:    '280px',
            }}
          >
            Built for non-technical professionals who want AI to feel clear, useful, and
            human.
          </p>
        </div>
      </motion.div>

    </section>
  )
}
