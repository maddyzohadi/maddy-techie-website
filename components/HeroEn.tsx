"use client"

import { useRef, useEffect } from "react"
import { motion } from "motion/react"

const VIDEO_SRC = "/videos/hero.mp4"

export default function HeroEn() {
  const videoRef       = useRef<HTMLVideoElement>(null)
  const rafRef         = useRef<number | null>(null)
  const fadingOutRef   = useRef(false)
  const hasStartedRef  = useRef(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    function cancelRaf() {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    function fadeIn(video: HTMLVideoElement) {
      cancelRaf()
      const start = parseFloat(video.style.opacity || "0")
      const t0    = performance.now()
      const tick  = (now: number) => {
        const p = Math.min((now - t0) / 500, 1)
        video.style.opacity = String(start + (1 - start) * p)
        if (p < 1) rafRef.current = requestAnimationFrame(tick)
        else rafRef.current = null
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    function fadeOut(video: HTMLVideoElement) {
      cancelRaf()
      const start = parseFloat(video.style.opacity || "1")
      const t0    = performance.now()
      const tick  = (now: number) => {
        const p = Math.min((now - t0) / 500, 1)
        video.style.opacity = String(start * (1 - p))
        if (p < 1) rafRef.current = requestAnimationFrame(tick)
        else rafRef.current = null
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const onPlaying = () => {
      if (!hasStartedRef.current) {
        hasStartedRef.current = true
        fadeIn(v)
      }
    }

    const onTimeUpdate = () => {
      if (!v.duration) return
      const remaining = v.duration - v.currentTime
      if (remaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true
        fadeOut(v)
      }
    }

    const onEnded = () => {
      v.style.opacity = "0"
      setTimeout(() => {
        v.currentTime     = 0
        fadingOutRef.current = false
        v.play().then(() => fadeIn(v)).catch(() => {})
      }, 100)
    }

    v.addEventListener("playing",    onPlaying)
    v.addEventListener("timeupdate", onTimeUpdate)
    v.addEventListener("ended",      onEnded)

    return () => {
      cancelRaf()
      v.removeEventListener("playing",    onPlaying)
      v.removeEventListener("timeupdate", onTimeUpdate)
      v.removeEventListener("ended",      onEnded)
    }
  }, [])

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">

      {/* Background video */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
        style={{ opacity: 0 }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-[68px]">
        <div className="text-center w-full max-w-2xl mx-auto">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <span className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2">
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
                  color: "rgba(255,255,255,0.75)",
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
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(40px, 6.5vw, 72px)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              margin: "0 0 24px",
              textShadow: "0 2px 24px rgba(0,0,0,0.45)",
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
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.75,
              maxWidth: "460px",
              margin: "0 auto 40px",
              textShadow: "0 1px 10px rgba(0,0,0,0.4)",
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
              className="liquid-glass inline-flex items-center gap-2 rounded-full no-underline text-sm font-medium"
              style={{
                padding: "13px 28px",
                fontFamily: "system-ui, sans-serif",
                color: "rgba(255,255,255,0.85)",
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
