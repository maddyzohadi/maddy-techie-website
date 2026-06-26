"use client"

import { motion } from "motion/react"

const VIDEO_SRC = "/videos/hero.mp4"

export default function HeroEn() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#F7F3EC' }}
    >

      {/* Atmospheric background video */}
      <video
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.80 }}
      />

      {/* Light cream wash — barely there, keeps warmth without washing out the video */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(247,243,236,0.22)' }}
      />

      {/* Soft radial glow behind text for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 55% at 50% 50%, rgba(247,243,236,0.55) 0%, transparent 100%)',
        }}
      />

      {/* Content */}
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
                background: 'rgba(255,106,50,0.08)',
                border: '0.5px solid rgba(255,106,50,0.20)',
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
                background: 'rgba(0,0,0,0.06)',
                border: '0.5px solid rgba(0,0,0,0.10)',
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
