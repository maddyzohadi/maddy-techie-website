"use client"

import React from "react"
import { motion } from "motion/react"
import HeroDarkPanel from "./HeroDarkPanel"

export default function HeroEn() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100dvh",
        background: "#FDFAF7",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 72px",
      }}
    >
      {/* Atmospheric glow — top-left: orange → cream → soft lavender */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: "80%",
          height: "90%",
          background:
            "radial-gradient(ellipse at top left, rgba(255,106,50,0.14) 0%, rgba(246,210,191,0.09) 28%, rgba(200,185,255,0.06) 52%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      {/* Faint right counter-glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-15%",
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(246,210,191,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Text content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "680px",
          width: "100%",
          direction: "ltr",
        }}
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "rgba(255,106,50,0.07)",
              border: "0.5px solid rgba(255,106,50,0.18)",
              borderRadius: "100px",
              padding: "6px 16px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FF6A32",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "11px",
                color: "#666",
                letterSpacing: "0.08em",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 500,
              }}
            >
              AI for work &amp; productivity
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(38px, 6vw, 62px)",
            fontWeight: 700,
            color: "#111111",
            lineHeight: 1.2,
            margin: "0 0 22px",
            letterSpacing: "-0.02em",
          }}
        >
          AI that turns hard work
          <br />
          into <span style={{ color: "#FF6A32" }}>easy</span> work
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "17px",
            color: "#777",
            lineHeight: 1.8,
            margin: "0 auto 40px",
            maxWidth: "480px",
            fontWeight: 400,
          }}
        >
          Automate your daily tasks without writing a single line of code
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
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
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(0,0,0,0.04)",
              color: "#555",
              fontSize: "14px",
              fontWeight: 500,
              padding: "13px 28px",
              borderRadius: "100px",
              textDecoration: "none",
              border: "0.5px solid rgba(0,0,0,0.10)",
              fontFamily: "system-ui, sans-serif",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.07)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
          >
            View Services
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{
            marginTop: "24px",
            fontSize: "12px",
            color: "#aaa",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          Work smarter with intelligent tools
        </motion.p>
      </div>

      {/* Dark hero panel */}
      <motion.div
        initial={{ opacity: 0, y: 52 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "980px",
          marginTop: "52px",
        }}
      >
        <HeroDarkPanel />
      </motion.div>
    </section>
  )
}
