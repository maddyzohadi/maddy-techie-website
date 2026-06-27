"use client"

import { motion } from "motion/react"

// ── Workflow card row ─────────────────────────────────────────────────────

function Row({
  icon, label, bold = false, accent = false,
}: {
  icon: string; label: string; bold?: boolean; accent?: boolean
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <span style={{ fontSize: 14, flexShrink: 0, lineHeight: 1 }}>{icon}</span>
      <span
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 12,
          fontWeight: bold || accent ? 600 : 400,
          color: accent ? "#FF6A32" : bold ? "#111111" : "#888",
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ── Floating workflow cards — desktop xl+ only ────────────────────────────

function WorkflowCards() {
  return (
    <div
      aria-hidden
      className="hidden xl:flex flex-col gap-5 absolute pointer-events-none select-none"
      style={{ right: 48, top: "50%", transform: "translateY(-50%)", zIndex: 5 }}
    >
      {/* BEFORE card */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.55, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 212,
            background: "#ffffff",
            borderRadius: 14,
            border: "0.5px solid rgba(0,0,0,0.08)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            padding: "15px 16px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              marginBottom: 11,
              fontFamily: "system-ui, sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.10em",
              textTransform: "uppercase" as const,
              color: "#bbb",
            }}
          >
            Before
          </span>
          <Row icon="📋" label="Manual email sorting" bold />
          <Row icon="⏰" label="~2 hours every morning" />
          <Row icon="😓" label="Requests still get missed" />
        </motion.div>
      </motion.div>

      {/* AFTER card — offset right so the two cards feel layered */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.80, ease: "easeOut" }}
        style={{ marginLeft: 22 }}
      >
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
          style={{
            width: 212,
            background: "#ffffff",
            borderRadius: 14,
            border: "0.5px solid rgba(255,106,50,0.22)",
            boxShadow: "0 4px 20px rgba(255,106,50,0.10)",
            padding: "15px 16px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              marginBottom: 11,
              fontFamily: "system-ui, sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.10em",
              textTransform: "uppercase" as const,
              color: "#FF6A32",
              background: "rgba(255,106,50,0.08)",
              padding: "3px 9px",
              borderRadius: 100,
            }}
          >
            ⚡ After · AI
          </span>
          <Row icon="✅" label="Done automatically" bold />
          <Row icon="⚡" label="3 minutes · Zero missed" accent />
          <Row icon="🌙" label="Runs while you sleep" />
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────

export default function HeroEn() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#F7F3EC" }}
    >

      {/* Warm orange radial bloom — very subtle, adds depth without weight */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,106,50,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Floating workflow cards */}
      <WorkflowCards />

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
                background: "rgba(255,106,50,0.08)",
                border: "0.5px solid rgba(255,106,50,0.22)",
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
