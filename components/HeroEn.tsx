"use client"

import React from "react"
import { motion } from "motion/react"
import {
  Inbox, Sparkles, FileText, CheckCircle,
  Mail, Bot, Zap, ArrowRight, MessageSquare, Table2,
} from "lucide-react"

const WORKFLOW_STEPS = [
  { Icon: Inbox,       label: "Collect",     sub: "Input",     active: false, done: false },
  { Icon: Sparkles,    label: "AI",          sub: "Processing", active: true,  done: false },
  { Icon: FileText,    label: "Draft",       sub: "Content",   active: false, done: false },
  { Icon: CheckCircle, label: "Deliver",     sub: "& Save",    active: false, done: true  },
] as const

const STATUS_ITEMS = [
  { Icon: Zap,           text: "Analyzing emails..." },
  { Icon: Bot,           text: "Generating summary..." },
  { Icon: MessageSquare, text: "Drafting replies..." },
  { Icon: Table2,        text: "Saving to Sheets" },
] as const

const TOOL_ICONS = [
  { bg: "#16A34A", Icon: Table2,   label: "Sheets" },
  { bg: "#DC2626", Icon: Mail,     label: "Gmail"  },
  { bg: "#111111", Icon: FileText, label: "Notion" },
] as const

const CARD: React.CSSProperties = {
  background: "#FFF8F1",
  border: "0.5px solid #E7DED2",
  boxShadow: "0 8px 28px rgba(0,0,0,0.07)",
}

export default function HeroEn() {
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
        padding: "110px 24px 80px",
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

      {/* ── Text content ── */}
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

      {/* ── Hero visual: [chat | main panel | docs] ── */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        className="relative z-[2] w-full grid grid-cols-1 lg:grid-cols-[196px_1fr_188px] gap-4"
        style={{ maxWidth: "1060px", marginTop: "48px" }}
      >

        {/* ── LEFT: chat card + tool icons ── */}
        <div className="hidden lg:flex flex-col justify-between py-6">

          {/* Chat card */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            style={{ ...CARD, borderRadius: "16px", padding: "14px 16px" }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "10px",
              }}
            >
              <Bot size={13} style={{ color: "#FF6A32" }} />
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#111111",
                }}
              >
                AI Assistant
              </span>
            </div>

            {/* User message */}
            <div
              style={{
                background: "#FFFFFF",
                border: "0.5px solid #E7DED2",
                borderRadius: "10px",
                padding: "8px 10px",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: "11.5px",
                  color: "#555",
                  lineHeight: 1.5,
                }}
              >
                What do you want to automate?
              </span>
            </div>

            {/* AI reply bubble */}
            <div
              style={{
                background: "rgba(255,106,50,0.08)",
                border: "0.5px solid rgba(255,106,50,0.18)",
                borderRadius: "10px",
                padding: "8px 10px",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: "11px",
                  color: "#FF6A32",
                  lineHeight: 1.5,
                }}
              >
                Summarize my emails and draft replies
              </span>
            </div>

            {/* Typing dots */}
            <div
              style={{
                display: "inline-flex",
                gap: "3px",
                padding: "6px 10px",
                background: "#FFFFFF",
                border: "0.5px solid #E7DED2",
                borderRadius: "100px",
              }}
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay, ease: "easeInOut" }}
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#ccc",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Tool icon badges */}
          <div style={{ display: "flex", gap: "6px", paddingTop: "12px" }}>
            {TOOL_ICONS.map(({ bg, Icon, label }) => (
              <div
                key={label}
                title={label}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.14)",
                  flexShrink: 0,
                }}
              >
                <Icon size={16} style={{ color: "#fff" }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── CENTER: main dark workflow panel ── */}
        <div
          style={{
            background: "#171717",
            borderRadius: "20px",
            padding: "20px 24px",
            border: "0.5px solid rgba(247,243,236,0.08)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
          }}
        >
          {/* Panel header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <Sparkles size={14} style={{ color: "#FF6A32" }} />
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#F7F3EC",
                  letterSpacing: "0.01em",
                }}
              >
                AI Workflow
              </span>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                background: "rgba(82,196,122,0.12)",
                border: "0.5px solid rgba(82,196,122,0.25)",
                borderRadius: "100px",
                padding: "4px 10px",
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#52C47A",
                }}
              />
              <span
                style={{ fontFamily: "system-ui", fontSize: "10px", color: "#52C47A" }}
              >
                Active
              </span>
            </div>
          </div>

          {/* Workflow steps */}
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon      = step.Icon
              const isActive  = step.active
              const isDone    = step.done
              const iconColor = isActive ? "#FF6A32" : isDone ? "#52C47A" : "#888"
              return (
                <React.Fragment key={i}>
                  <motion.div
                    animate={
                      isActive
                        ? {
                            boxShadow: [
                              "0 0 0px rgba(255,106,50,0)",
                              "0 0 20px rgba(255,106,50,0.22)",
                              "0 0 0px rgba(255,106,50,0)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      flex: 1,
                      background: isActive
                        ? "rgba(255,106,50,0.10)"
                        : isDone
                        ? "rgba(82,196,122,0.10)"
                        : "#FFF8F1",
                      border: `0.5px solid ${
                        isActive
                          ? "rgba(255,106,50,0.28)"
                          : isDone
                          ? "rgba(82,196,122,0.25)"
                          : "#E7DED2"
                      }`,
                      borderRadius: "14px",
                      padding: "16px 8px",
                      textAlign: "center",
                      minWidth: 0,
                    }}
                  >
                    <Icon
                      size={18}
                      style={{
                        color: iconColor,
                        margin: "0 auto 8px",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "system-ui",
                        fontSize: "10.5px",
                        fontWeight: 600,
                        color: "#111111",
                        lineHeight: 1.25,
                      }}
                    >
                      {step.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "system-ui",
                        fontSize: "10px",
                        color: iconColor,
                        marginTop: "2px",
                        lineHeight: 1.25,
                      }}
                    >
                      {step.sub}
                    </div>
                  </motion.div>

                  {i < WORKFLOW_STEPS.length - 1 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ArrowRight
                        size={12}
                        style={{ color: "rgba(247,243,236,0.22)" }}
                      />
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>

          {/* What's happening */}
          <div
            style={{
              background: "rgba(247,243,236,0.03)",
              border: "0.5px solid rgba(247,243,236,0.07)",
              borderRadius: "12px",
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontFamily: "system-ui",
                fontSize: "10px",
                color: "rgba(247,243,236,0.30)",
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              What&apos;s happening
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
              {STATUS_ITEMS.map((item, i) => {
                const Icon = item.Icon
                return (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: "5px" }}
                  >
                    <Icon size={11} style={{ color: "#FF6A32", flexShrink: 0 }} />
                    <span
                      style={{
                        fontFamily: "system-ui",
                        fontSize: "10.5px",
                        color: "rgba(247,243,236,0.48)",
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── RIGHT: document output cards ── */}
        <div
          className="hidden lg:flex flex-col gap-3"
          style={{ paddingTop: "28px" }}
        >

          {/* Content Brief card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            style={{ ...CARD, borderRadius: "14px", padding: "14px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "10px",
              }}
            >
              <FileText size={12} style={{ color: "#888" }} />
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#111111",
                }}
              >
                Content Brief
              </span>
            </div>
            {[100, 80, 60].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: "#E7DED2",
                  marginBottom: 6,
                  width: `${w}%`,
                }}
              />
            ))}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginTop: "4px",
                padding: "3px 9px",
                background: "rgba(255,106,50,0.08)",
                border: "0.5px solid rgba(255,106,50,0.20)",
                borderRadius: "100px",
              }}
            >
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: "10px",
                  color: "#FF6A32",
                  fontWeight: 600,
                }}
              >
                Generated
              </span>
            </div>
          </motion.div>

          {/* Email Reply card */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            style={{ ...CARD, borderRadius: "14px", padding: "14px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "10px",
              }}
            >
              <Mail size={12} style={{ color: "#888" }} />
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#111111",
                }}
              >
                Email Reply
              </span>
            </div>
            {[100, 70].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: "#E7DED2",
                  marginBottom: 6,
                  width: `${w}%`,
                }}
              />
            ))}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginTop: "4px",
                padding: "3px 9px",
                background: "rgba(255,106,50,0.08)",
                border: "0.5px solid rgba(255,106,50,0.20)",
                borderRadius: "100px",
              }}
            >
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: "10px",
                  color: "#FF6A32",
                  fontWeight: 600,
                }}
              >
                Ready to Send
              </span>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}
