'use client'

import { motion, useReducedMotion } from 'motion/react'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"
const EASE   = [0.22, 1, 0.36, 1] as const

// ── Fingerprint SVG — same visual as HeroEn, Fa-scoped IDs/class names ──────
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
        <clipPath id="hFpOvalFa">
          <ellipse cx="20" cy="25" rx="17.5" ry="22"/>
        </clipPath>
        <radialGradient id="hFpGlowFa" cx="38%" cy="35%" r="58%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#F4A082" stopOpacity="0.72"/>
          <stop offset="100%" stopColor="#F4A082" stopOpacity="0"/>
        </radialGradient>
        <style>{`
          @keyframes hFpPulseFa {
            0%,100% { opacity:0.48; }
            50%     { opacity:1.00; }
          }
          .hFpGlowLayerFa { animation: hFpPulseFa 3.2s ease-in-out infinite; }
          @media (prefers-reduced-motion:reduce) {
            .hFpGlowLayerFa { animation:none; opacity:0.65; }
          }
        `}</style>
      </defs>

      <ellipse cx="20" cy="25" rx="17.5" ry="22" fill="#E34E2E" fillOpacity="0.055"/>

      <g clipPath="url(#hFpOvalFa)">
        <ellipse cx="20" cy="25" rx="17.0" ry="21.5" stroke="#E34E2E" strokeWidth="1.35" strokeOpacity="0.40"/>
        <ellipse cx="20" cy="25" rx="13.8" ry="17.5" stroke="#E34E2E" strokeWidth="1.35" strokeOpacity="0.56"/>
        <ellipse cx="20" cy="25" rx="10.6" ry="13.5" stroke="#E34E2E" strokeWidth="1.35" strokeOpacity="0.70"/>
        <ellipse cx="20" cy="25" rx="7.4"  ry="9.4"  stroke="#E34E2E" strokeWidth="1.35" strokeOpacity="0.83"/>
        <ellipse cx="20" cy="25" rx="4.2"  ry="5.4"  stroke="#E34E2E" strokeWidth="1.35" strokeOpacity="0.92"/>
        <ellipse cx="20" cy="25" rx="1.5"  ry="1.9"  stroke="#E34E2E" strokeWidth="1.35" strokeOpacity="1.00"/>
        <ellipse className="hFpGlowLayerFa" cx="20" cy="25" rx="17" ry="21" fill="url(#hFpGlowFa)"/>
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
          <radialGradient id="hgAFa" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#E34E2E" stopOpacity="0.28"/>
            <stop offset="100%" stopColor="#E34E2E" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="hgBFa" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#F4A082" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="#F4A082" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <ellipse cx="900" cy="220" rx="420" ry="340" fill="url(#hgAFa)"/>
        <ellipse cx="260" cy="1020" rx="380" ry="300" fill="url(#hgBFa)"/>
      </svg>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function HeroFa() {
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
      <style>{`
        @keyframes hSweepFa {
          0%   { transform: skewX(-14deg) translateX(-130%); opacity: 0; }
          4%   { opacity: 1; }
          33%  { transform: skewX(-14deg) translateX(360%); opacity: 1; }
          34%  { opacity: 0; }
          100% { opacity: 0; transform: skewX(-14deg) translateX(360%); }
        }
        .h-sweep-fa {
          animation: hSweepFa 9s linear infinite;
          animation-delay: 1.6s;
        }
        @media (prefers-reduced-motion: reduce) {
          .h-sweep-fa { animation: none; opacity: 0; }
        }
      `}</style>

      {/* Background drift */}
      <motion.div
        aria-hidden
        animate={reduced ? {} : { y: [0, -28, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      >
        <HeroBackground />
      </motion.div>

      {/* Light sweep */}
      <div
        aria-hidden
        className="h-sweep-fa"
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
          padding:        'clamp(72px, 9dvh, 88px) clamp(20px, 4vw, 44px) clamp(40px, 5dvh, 56px)',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '820px', width: '100%' }}>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, filter: reduced ? 'blur(0px)' : 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.72, ease: EASE }}
            dir="rtl"
            style={{
              fontFamily:   vaFont,
              fontSize:     'clamp(13px, 1.3vw, 15px)',
              fontWeight:    600,
              color:         '#A09288',
              marginBottom:  '22px',
            }}
          >
            یادگیری هوش مصنوعی، ساده‌تر از همیشه
          </motion.p>

          {/* Headline — fingerprint floats, headline fades in */}
          <h1
            style={{
              fontFamily:    vaFont,
              fontSize:      'clamp(40px, 6vw, 78px)',
              fontWeight:     800,
              color:          '#111111',
              lineHeight:     1.12,
              letterSpacing: '-0.02em',
              marginBottom:   '28px',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            '0.22em',
              flexWrap:       'wrap',
            }}
          >
            {/* Fingerprint — own flex slot, floats on y only */}
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

            {/* Headline text — fades and lifts in */}
            <motion.span
              dir="rtl"
              initial={{ opacity: 0, y: reduced ? 0 : 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.80, delay: 0.10, ease: EASE }}
            >
              هوشمندتر کار کن
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.60, delay: 0.36, ease: EASE }}
          >
            <p
              dir="rtl"
              style={{
                fontFamily:  vaFont,
                fontSize:    'clamp(14px, 1.3vw, 17px)',
                color:       '#625B55',
                lineHeight:   1.90,
                maxWidth:    '560px',
                margin:      '0 auto 36px',
              }}
            >
              ابزارهای هوش مصنوعی را بدون کدنویسی یاد بگیر؛ ساده، واضح و بدون سردرگمی
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.60, delay: 0.52, ease: EASE }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <a
              href="/fa/learn"
              dir="rtl"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '8px',
                padding:        '14px 32px',
                background:     '#E34E2E',
                color:          '#fff',
                borderRadius:   '100px',
                textDecoration: 'none',
                fontFamily:     vaFont,
                fontSize:       '15px',
                fontWeight:      700,
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
              از اینجا شروع کن
            </a>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom strip ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.62, ease: EASE }}
        style={{ position: 'relative', zIndex: 10, borderTop: '0.5px solid rgba(17,17,17,0.09)' }}
      >
        <div
          dir="rtl"
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
              fontFamily: vaFont,
              fontSize:   'clamp(14px, 1.3vw, 16px)',
              color:      '#625B55',
              lineHeight:  1.80,
              margin:      0,
              flex:        '1 1 240px',
              maxWidth:    '480px',
              textAlign:   'right',
            }}
          >
            هوش مصنوعی و اتوماسیون برای ساده‌تر کردن کارهای روزمره، نظم بیشتر و ساختن جریان‌های کاری بهتر
          </p>
          <p
            style={{
              fontFamily: vaFont,
              fontSize:   '13px',
              color:      '#8C7E74',
              lineHeight:  1.75,
              margin:      0,
              flex:        '1 1 180px',
              maxWidth:    '280px',
              textAlign:   'right',
            }}
          >
            برای افراد غیر فنی که می‌خواهند هوش مصنوعی را واضح، مفید و انسانی تجربه کنند
          </p>
        </div>
      </motion.div>

    </section>
  )
}
