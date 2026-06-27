"use client"

import { motion } from "motion/react"

export default function HeroEn() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Full-bleed video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 1 }}
      />

      {/* Subtle dark overlay for text contrast */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.2)" }}
      />

      {/* Content */}
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
                background: "rgba(255,106,50,0.18)",
                border: "0.5px solid rgba(255,106,50,0.45)",
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
                  color: "rgba(255,255,255,0.80)", letterSpacing: "0.08em", fontWeight: 500,
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
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              margin: "0 0 24px",
            }}
          >
            Work Smarter. Move Faster.
            <br />
            <span style={{ color: "#FF6A32" }}>AI Powers</span>{" "}
            <span style={{ color: "rgba(255,255,255,0.75)" }}>You Up.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "17px",
              color: "rgba(255,255,255,0.70)",
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
                color: "rgba(255,255,255,0.80)",
                background: "rgba(255,255,255,0.12)",
                border: "0.5px solid rgba(255,255,255,0.25)",
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
