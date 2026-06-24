"use client";

import React from "react";
import { motion } from "motion/react";
import { Mail, Zap, FileText, CheckCircle, Bot, ArrowRight } from "lucide-react";

const STEPS = [
  { Icon: Mail,        label: "Emails",  color: "#888",    bg: "#F7F3EC",               border: "none"                                    },
  { Icon: Zap,         label: "Process", color: "#FF6A32", bg: "rgba(255,106,50,0.08)", border: "0.5px solid rgba(255,106,50,0.20)"        },
  { Icon: FileText,    label: "Draft",   color: "#888",    bg: "#F7F3EC",               border: "none"                                    },
  { Icon: CheckCircle, label: "Done",    color: "#52C47A", bg: "rgba(82,196,122,0.08)", border: "0.5px solid rgba(82,196,122,0.20)"        },
];

export default function HeroFa() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100dvh",
        background: "#F7F3EC",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 72px",
      }}
    >
      {/* Soft radial glow */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(251,180,150,0.38) 0%, rgba(220,170,210,0.18) 50%, transparent 70%)",
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />

      {/* Text content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "640px",
          width: "100%",
          direction: "rtl",
        }}
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.75)",
            border: "0.5px solid rgba(0,0,0,0.08)",
            borderRadius: "100px",
            padding: "6px 16px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#E8774A",
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
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 700,
            color: "#111111",
            lineHeight: 1.35,
            margin: "0 0 20px",
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
            color: "#666",
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
              background: "rgba(255,255,255,0.75)",
              color: "#111111",
              fontSize: "14px",
              fontWeight: 500,
              padding: "13px 28px",
              borderRadius: "100px",
              textDecoration: "none",
              border: "0.5px solid rgba(0,0,0,0.12)",
              fontFamily: "'Noto Naskh Arabic', serif",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.95)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.75)")
            }
          >
            مشاهده خدمات
          </a>
        </motion.div>
      </div>

      {/* Workflow visual card — always LTR */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: "48px",
          width: "100%",
          maxWidth: "600px",
          direction: "ltr",
        }}
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "22px 24px",
            border: "0.5px solid rgba(255,255,255,0.95)",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04), inset 0 0.5px 0 rgba(255,255,255,0.8)",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px",
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFCAB4" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFE4C2" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8E3DA" }} />
            </div>
            <span
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "11px",
                color: "#bbb",
                letterSpacing: "0.04em",
              }}
            >
              Daily Report Workflow
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div
                style={{ width: 6, height: 6, borderRadius: "50%", background: "#52C47A" }}
              />
              <span
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "11px",
                  color: "#888",
                }}
              >
                Active
              </span>
            </div>
          </div>

          {/* Workflow steps */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "16px",
            }}
          >
            {STEPS.map((step, i) => {
              const Icon = step.Icon;
              return (
                <React.Fragment key={i}>
                  <div
                    style={{
                      flex: 1,
                      background: step.bg,
                      border: step.border,
                      borderRadius: "10px",
                      padding: "10px 4px",
                      textAlign: "center",
                    }}
                  >
                    <Icon
                      size={15}
                      style={{
                        color: step.color,
                        margin: "0 auto 4px",
                        display: "block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        fontSize: "10px",
                        color: step.color === "#888" ? "#bbb" : step.color,
                        display: "block",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ArrowRight
                      size={11}
                      style={{ color: "#FF6A32", flexShrink: 0, opacity: 0.5 }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* AI response bubble */}
          <div
            style={{
              background: "#F7F3EC",
              borderRadius: "12px",
              padding: "12px 14px",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "7px",
              }}
            >
              <Bot size={12} style={{ color: "#FF6A32" }} />
              <span
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#888",
                }}
              >
                Claude
              </span>
            </div>
            <p
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "13px",
                color: "#555",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Processed{" "}
              <strong style={{ color: "#111111" }}>14 emails</strong>, drafted 3
              replies, and updated your tracker.{" "}
              <strong style={{ color: "#FF6A32" }}>Saved 2.4 hrs</strong> of
              manual work.
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {["ChatGPT", "Claude", "n8n", "Sheets"].map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: "10px",
                    padding: "3px 8px",
                    borderRadius: "100px",
                    background: "rgba(0,0,0,0.04)",
                    border: "0.5px solid rgba(0,0,0,0.08)",
                    color: "#888",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
            <span
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "10px",
                color: "#bbb",
              }}
            >
              Runs daily · 0 errors
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
