"use client"

import { motion } from "motion/react"

// ── Dither blob ─────────────────────────────────────────────────────────────
// SVG technique: feTurbulence generates organic noise → feColorMatrix thresholds
// it into a binary alpha mask → that mask is applied to a dot-grid pattern fill.
// Each blob gets a unique id so filter/mask/pattern refs don't collide on the page.
interface DitherBlobProps {
  id: string
  seed: number
  w: number
  h: number
  opacity?: number
  baseFreq?: number
}

function DitherBlob({ id, seed, w, h, opacity = 0.20, baseFreq = 0.022 }: DitherBlobProps) {
  const dotId      = `dot-${id}`
  const filterId   = `flt-${id}`
  const maskId     = `msk-${id}`

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden
      focusable="false"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        {/* Dot grid — 7×7px cell, 1.1px radius dot */}
        <pattern id={dotId} x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.1" fill="#FF6A32" />
        </pattern>

        {/* Organic noise → binary alpha mask
            A_out = 18 * R_noise − 10
            Pixels where noise R > 0.555 become opaque; rest transparent.
            Adjust seed for different shapes; baseFreq controls blob scale. */}
        <filter id={filterId} colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFreq}
            numOctaves={4}
            seed={seed}
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  18 0 0 0 -10"
          />
        </filter>

        <mask id={maskId}>
          <rect width={w} height={h} fill="black" />
          <rect width={w} height={h} fill="white" filter={`url(#${filterId})`} />
        </mask>
      </defs>

      {/* Dot fill clipped to organic blob shape */}
      <rect
        width={w}
        height={h}
        fill={`url(#${dotId})`}
        mask={`url(#${maskId})`}
        fillOpacity={opacity}
      />
    </svg>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function HeroEn() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#F7F3EC" }}
    >

      {/* ── Top-left blob — largest, anchored to corner ── */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 pointer-events-none select-none"
        style={{ willChange: "transform" }}
        animate={{ y: [0, -22, 0], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <DitherBlob id="tl" seed={3}  w={560} h={500} opacity={0.22} baseFreq={0.019} />
      </motion.div>

      {/* ── Bottom-right blob ── */}
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -right-24 pointer-events-none select-none"
        style={{ willChange: "transform" }}
        animate={{ y: [0, 20, 0], x: [0, -14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <DitherBlob id="br" seed={7}  w={480} h={440} opacity={0.18} baseFreq={0.023} />
      </motion.div>

      {/* ── Top-right accent — smaller, slower ── */}
      <motion.div
        aria-hidden
        className="absolute -top-12 -right-12 pointer-events-none select-none"
        style={{ willChange: "transform" }}
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      >
        <DitherBlob id="tr" seed={11} w={320} h={300} opacity={0.14} baseFreq={0.028} />
      </motion.div>

      {/* ── Bottom-left whisper ── */}
      <motion.div
        aria-hidden
        className="absolute -bottom-10 left-10 pointer-events-none select-none"
        style={{ willChange: "transform" }}
        animate={{ y: [0, 14, 0], x: [0, 8, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      >
        <DitherBlob id="bl" seed={19} w={260} h={240} opacity={0.12} baseFreq={0.031} />
      </motion.div>

      {/* ── Center glow — keeps text readable over the dot pattern ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 68% 58% at 50% 50%, rgba(247,243,236,0.92) 0%, rgba(247,243,236,0.55) 55%, transparent 100%)",
        }}
      />

      {/* ── Content — unchanged ─────────────────────────────────────────── */}
      <div
        className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-[68px]"
        dir="ltr"
      >
        <div className="text-center w-full max-w-2xl mx-auto">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: "rgba(255,106,50,0.08)",
                border: "0.5px solid rgba(255,106,50,0.20)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#FF6A32",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "11px",
                  color: "rgba(17,17,17,0.55)",
                  letterSpacing: "0.08em",
                  fontWeight: 500,
                }}
              >
                AI for work &amp; productivity
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            dir="ltr"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(40px, 6.5vw, 72px)",
              fontWeight: 700,
              color: "#111111",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              margin: "0 0 24px",
            }}
          >
            Work Smarter. Move Faster.
            <br />
            <span style={{ color: "#FF6A32" }}>AI Powers</span>{" "}
            <span style={{ color: "#5F5A54" }}>You Up.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "17px",
              color: "rgba(17,17,17,0.55)",
              lineHeight: 1.75,
              maxWidth: "460px",
              margin: "0 auto 40px",
            }}
          >
            Automate your daily tasks without writing a single line of code
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
            className="flex gap-3 flex-wrap justify-center"
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-full no-underline bg-brand-orange hover:bg-brand-coral transition-colors duration-150"
              style={{ padding: "13px 28px", fontFamily: "system-ui, sans-serif" }}
            >
              Start a Project →
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 rounded-full no-underline text-sm font-medium transition-opacity hover:opacity-70"
              style={{
                padding: "13px 28px",
                fontFamily: "system-ui, sans-serif",
                color: "rgba(17,17,17,0.55)",
                background: "rgba(0,0,0,0.06)",
                border: "0.5px solid rgba(0,0,0,0.10)",
              }}
            >
              View Services
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
