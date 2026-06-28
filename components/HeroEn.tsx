"use client"

import { motion, useReducedMotion } from "motion/react"

// Shared card shell: entrance fade-up + continuous float
function FloatCard({
  pos,
  inDelay,
  floatDur,
  floatDelay,
  children,
}: {
  pos:        string
  inDelay:    number
  floatDur:   number
  floatDelay: number
  children:   React.ReactNode
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: inDelay, ease: "easeOut" }}
      className={`hidden xl:block absolute pointer-events-none select-none ${pos}`}
    >
      <motion.div
        animate={{ y: reduced ? 0 : [0, -6, 0] }}
        transition={{ duration: reduced ? 0 : floatDur, repeat: reduced ? 0 : Infinity, ease: "easeInOut", delay: floatDelay }}
        style={{
          background:           "rgba(255,255,255,0.82)",
          backdropFilter:       "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border:               "0.5px solid rgba(0,0,0,0.08)",
          borderRadius:         "14px",
          padding:              "14px 18px",
          boxShadow:            "0 4px 20px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
          minWidth:             "174px",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

const label: React.CSSProperties = {
  fontSize: 12, fontWeight: 600, color: "#111111",
  margin: 0, lineHeight: 1.4, fontFamily: "system-ui, sans-serif",
}
const sub: React.CSSProperties = {
  fontSize: 11, color: "rgba(17,17,17,0.42)",
  margin: "3px 0 0", fontFamily: "system-ui, sans-serif", lineHeight: 1.4,
}

export default function HeroEn() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#F7F3EC" }}
    >

      {/* Warm orange radial bloom */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,106,50,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Editorial side labels — xl+ only */}
      <div
        aria-hidden
        className="hidden xl:flex absolute left-5 top-1/2 -translate-y-1/2 flex-col gap-12 pointer-events-none select-none"
        style={{ zIndex: 5 }}
      >
        {['01 Learn', '02 Build', '03 Automate'].map((text) => (
          <span
            key={text}
            style={{
              writingMode:   'vertical-rl',
              transform:     'rotate(180deg)',
              fontSize:      '11px',
              fontWeight:    500,
              letterSpacing: '0.16em',
              color:         'rgba(17,17,17,0.32)',
              fontFamily:    'system-ui, sans-serif',
              textTransform: 'uppercase',
            }}
          >
            {text}
          </span>
        ))}
      </div>

      {/* ── Decorative floating workflow cards (xl+, aria-hidden) ─────── */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none select-none">

        {/* Card A — left · "Email drafted" */}
        <FloatCard pos="left-[10%] top-[32%]" inDelay={0.8} floatDur={7.0} floatDelay={1.6}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "#FF6A32",
              flexShrink: 0, marginTop: 3,
            }} />
            <div>
              <p style={label}>Email drafted</p>
              <p style={sub}>Prompt → Reply · 2 min</p>
            </div>
          </div>
        </FloatCard>

        {/* Card B — right top · "Automation active" */}
        <FloatCard pos="right-[10%] top-[25%]" inDelay={1.0} floatDur={6.5} floatDelay={0.4}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{
              display: "inline-block", width: 8, height: 8, borderRadius: "50%",
              background: "#22C55E", boxShadow: "0 0 0 3px rgba(34,197,94,0.20)",
              flexShrink: 0,
            }} />
            <p style={label}>Automation active</p>
          </div>
          <p style={sub}>3 workflows running</p>
        </FloatCard>

        {/* Card C — right lower · "Report ready" */}
        <FloatCard pos="right-[10%] top-[57%]" inDelay={1.2} floatDur={7.8} floatDelay={1.0}>
          <p style={{ fontSize: 11, color: "rgba(17,17,17,0.38)", margin: "0 0 4px",
                      fontFamily: "system-ui, sans-serif", textTransform: "uppercase",
                      letterSpacing: "0.06em" }}>
            Report
          </p>
          <p style={{ ...label, margin: "0 0 10px" }}>Summary ready</p>
          <div style={{ display: "flex", gap: 3 }}>
            {[0,1,2,3].map(i => (
              <span key={i} style={{
                display: "block", height: 4, flex: 1, borderRadius: 2,
                background: i < 3 ? "#FF6A32" : "rgba(0,0,0,0.09)",
              }} />
            ))}
          </div>
          <p style={{ fontSize: 10, color: "rgba(17,17,17,0.38)", margin: "6px 0 0",
                      fontFamily: "system-ui, sans-serif" }}>
            AI generated · 4 sec
          </p>
        </FloatCard>

      </div>

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
            Too Many AI Tools?
            <br />
            <span style={{ color: "#5F5A54" }}>Start With the Right One.</span>
          </motion.h1>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center"
            style={{ marginTop: "40px" }}
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-full no-underline bg-brand-orange hover:bg-brand-coral transition-colors duration-150"
              style={{ padding: "13px 28px", fontFamily: "system-ui, sans-serif" }}
            >
              Start a Project →
            </a>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade — softens the edge into the next section */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          height:     '160px',
          background: 'linear-gradient(to bottom, transparent, rgba(247,243,236,0.95))',
          zIndex:     15,
        }}
      />
    </section>
  )
}
