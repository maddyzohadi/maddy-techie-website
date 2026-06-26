"use client"

import { motion } from "motion/react"

const VIDEO_SRC = "/videos/Hero-design.mp4"

export default function HeroFa() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">

      {/* Background video */}
      <video
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Content — RTL */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-[68px]">
        <div
          className="text-center w-full max-w-2xl mx-auto"
          dir="rtl"
        >

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
                  fontFamily: "'Noto Naskh Arabic', serif",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.75)",
                  fontWeight: 500,
                }}
              >
                هوش مصنوعی برای کار و بهره‌وری
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            style={{
              fontFamily: "'Noto Naskh Arabic', serif",
              fontSize: "clamp(34px, 5.5vw, 64px)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.3,
              margin: "0 0 24px",
              textShadow: "0 2px 24px rgba(0,0,0,0.45)",
            }}
          >
            ساده‌سازی کارهای پیچیده با کمک هوش مصنوعی
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            style={{
              fontFamily: "'Noto Naskh Arabic', serif",
              fontSize: "17px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.8,
              maxWidth: "460px",
              margin: "0 auto 40px",
              textShadow: "0 1px 10px rgba(0,0,0,0.4)",
            }}
          >
            با ابزارهای هوشمند مسیر کارت را بدون کدنویسی ساده‌تر کن
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
            className="flex gap-3 flex-wrap justify-center"
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
              className="liquid-glass inline-flex items-center gap-2 rounded-full no-underline text-sm font-medium"
              style={{
                padding: "13px 28px",
                fontFamily: "'Noto Naskh Arabic', serif",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              مشاهده خدمات
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
