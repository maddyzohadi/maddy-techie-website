"use client"

import { useEffect, useRef } from "react"
import { motion } from "motion/react"

// ── Smooth 2D value noise (sin-hash, no bitops) ───────────────────────────

function h2(ix: number, iy: number, s: number): number {
  const v = Math.sin(ix * 127.1 + iy * 311.7 + s * 74.3) * 43758.5453
  return v - Math.floor(v)  // fractional part → [0, 1]
}

function noise2(x: number, y: number, s: number = 0): number {
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix,        fy = y - iy
  const ux = fx * fx * (3 - 2 * fx)   // smoothstep
  const uy = fy * fy * (3 - 2 * fy)
  return (
    h2(ix,   iy,   s) * (1 - ux) * (1 - uy) +
    h2(ix+1, iy,   s) * ux       * (1 - uy) +
    h2(ix,   iy+1, s) * (1 - ux) * uy       +
    h2(ix+1, iy+1, s) * ux       * uy
  )
}

// 3-octave fractal brownian motion
function fbm(x: number, y: number, s: number = 0): number {
  return (
    noise2(x,     y,     s      ) * 0.571 +
    noise2(x * 2, y * 2, s + 100) * 0.286 +
    noise2(x * 4, y * 4, s + 200) * 0.143
  )
}

// ── Canvas hook ───────────────────────────────────────────────────────────

function useDitherCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const syncSize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    syncSize()
    const ro = new ResizeObserver(syncSize)
    ro.observe(canvas)

    const STEP  = 9      // dot grid spacing (px)
    const R     = 3.5    // dot radius — large enough to see clearly
    const MIN_A = 0.25   // minimum alpha for any visible dot
    const MAX_A = 0.52   // maximum alpha at blob core

    let raf: number
    let drift = 0

    const frame = () => {
      const W = canvas.width
      const H = canvas.height
      if (!W || !H) { raf = requestAnimationFrame(frame); return }

      ctx.clearRect(0, 0, W, H)
      drift += 0.00012   // very slow drift for organic float

      // Batch dots by alpha bucket
      const buckets = new Map<number, number[]>()

      for (let px = 0; px <= W; px += STEP) {
        for (let py = 0; py <= H; py += STEP) {
          const nx = px / W
          const ny = py / H

          // Corner influence — larger radii = bigger blobs extending from corners
          const tl = Math.max(0, 1 - Math.sqrt(nx*nx + ny*ny)                 / 0.76)
          const br = Math.max(0, 1 - Math.sqrt((1-nx)*(1-nx) + (1-ny)*(1-ny)) / 0.64)
          const tr = Math.max(0, 1 - Math.sqrt((1-nx)*(1-nx) + ny*ny)         / 0.42)

          const corner = Math.max(tl, br, tr)
          if (corner <= 0) continue

          // Low-frequency fBm (2.8×) → large organic blob shapes, not tiny ripples
          const n = fbm(nx * 2.8 + drift, ny * 2.8, 0)

          // Multiply noise by corner strength; hard threshold creates clear blob edges
          const v = n * corner * 1.65
          if (v < 0.47) continue

          // Remap [0.47, 0.75] → [MIN_A, MAX_A]
          const t = Math.min(1, (v - 0.47) / 0.28)
          const alpha = MIN_A + t * (MAX_A - MIN_A)

          // 4 alpha buckets (0.25 / 0.34 / 0.43 / 0.52)
          const key = Math.round(alpha / 0.09) * 0.09
          if (!buckets.has(key)) buckets.set(key, [])
          buckets.get(key)!.push(px, py)
        }
      }

      for (const [key, coords] of buckets) {
        ctx.fillStyle = `rgba(255,106,50,${key.toFixed(2)})`
        ctx.beginPath()
        for (let i = 0; i < coords.length; i += 2) {
          ctx.moveTo(coords[i] + R, coords[i + 1])
          ctx.arc(coords[i], coords[i + 1], R, 0, Math.PI * 2)
        }
        ctx.fill()
      }

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return ref
}

// ── Component ─────────────────────────────────────────────────────────────

export default function HeroEn() {
  const canvasRef = useDitherCanvas()

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#F7F3EC" }}
    >

      {/* Animated dither canvas — z-index 0 */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Radial cream glow — keeps center text area clean — z-index 1 */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(ellipse 64% 56% at 50% 50%, rgba(247,243,236,0.96) 0%, rgba(247,243,236,0.48) 58%, transparent 100%)",
        }}
      />

      {/* Content — z-index 10 */}
      <div
        className="relative flex min-h-screen items-center justify-center px-6 pt-[68px]"
        style={{ zIndex: 10 }}
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
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#FF6A32", display: "inline-block", flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "system-ui, sans-serif", fontSize: "11px",
                  color: "rgba(17,17,17,0.55)", letterSpacing: "0.08em", fontWeight: 500,
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
