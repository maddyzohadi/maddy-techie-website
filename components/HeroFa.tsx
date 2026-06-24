"use client"

import React from "react"
import { motion } from "motion/react"
import HeroDarkPanel from "./HeroDarkPanel"

export default function HeroFa() {
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
      {/* Atmospheric glow — top-right (mirrored for RTL): orange → cream → soft lavender */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "80%",
          height: "90%",
          background:
            "radial-gradient(ellipse at top right, rgba(255,106,50,0.14) 0%, rgba(246,210,191,0.09) 28%, rgba(200,185,255,0.06) 52%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      {/* Faint left counter-glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "-15%",
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(246,210,191,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Text content — RTL */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "680px",
          width: "100%",
          direction: "rtl",
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
                fontFamily: "'Noto Naskh Arabic', serif",
                fontWeight: 500,
              }}
            >
              هوش مصنوعی برای کار و بهره‌وری
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(34px, 5.5vw, 56px)",
            fontWeight: 700,
            color: "#111111",
            lineHeight: 1.35,
            margin: "0 0 22px",
          }}
        >
          ساده‌سازی کارهای پیچیده با کمک هوش مصنوعی
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "17px",
            color: "#777",
            lineHeight: 1.8,
            margin: "0 auto 40px",
            maxWidth: "480px",
            fontWeight: 400,
          }}
        >
          با ابزارهای هوشمند مسیر کارت را بدون کدنویسی ساده‌تر کن
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
            href="/fa/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-full no-underline bg-brand-orange hover:bg-brand-coral transition-colors duration-150"
            style={{ padding: "13px 28px", fontFamily: "'Noto Naskh Arabic', serif" }}
          >
            شروع پروژه ←
          </a>
          <a
            href="/fa/services"
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
              fontFamily: "'Noto Naskh Arabic', serif",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.07)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
          >
            مشاهده خدمات
          </a>
        </motion.div>
      </div>

      {/* Dark hero panel — always LTR (decorative UI mockup) */}
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
          direction: "ltr",
        }}
      >
        <HeroDarkPanel />
      </motion.div>
    </section>
  )
}
