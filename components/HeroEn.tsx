"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const floatingItems = [
  { icon: "https://cdn.worldvectorlogo.com/logos/chatgpt-6.svg",            label: "ChatGPT",       x: 88.0, y: 50.0, delay: 0,   rotation: -8, color: "#10A37F" },
  { icon: "https://cdn.worldvectorlogo.com/logos/claude-1.svg",             label: "Claude",        x: 73.9, y: 79.5, delay: 0.4, rotation:  6, color: "#CC785C" },
  { icon: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg",             label: "Zapier",        x: 42.1, y: 87.2, delay: 0.8, rotation: -5, color: "#FF4A00" },
  { icon: "https://cdn.worldvectorlogo.com/logos/google-sheets-logo-1.svg", label: "Google Sheets", x: 16.1, y: 67.3, delay: 1.2, rotation:  7, color: "#34A853" },
  { icon: "https://cdn.worldvectorlogo.com/logos/notion-logo-1.svg",        label: "Notion",        x: 15.3, y: 34.5, delay: 0.6, rotation: -6, color: "#1A1A1A" },
  { icon: "https://cdn.worldvectorlogo.com/logos/make-1.svg",               label: "Make",          x: 40.2, y: 13.3, delay: 1.0, rotation:  5, color: "#6D00CC" },
  { icon: "https://cdn.worldvectorlogo.com/logos/google-gemini.svg",        label: "Gemini",        x: 72.3, y: 19.3, delay: 1.4, rotation: -4, color: "#4285F4" },
];

export default function HeroEn() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#F5F0EB",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
      }}
    >
      {/* Radial gradient blob */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(251,180,150,0.45) 0%, rgba(220,170,210,0.35) 40%, transparent 70%)",
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />

      {/* Floating AI tool cards */}
      {floatingItems.map((item, i) => (
        <FloatingCard key={i} item={item} mounted={mounted} index={i} />
      ))}

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "680px",
          direction: "ltr",
        }}
      >
        {/* Eyebrow badge */}
        <div
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
              letterSpacing: "0.08em",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 500,
            }}
          >
            AI for work &amp; productivity
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 700,
            color: "#1A1A1A",
            lineHeight: 1.25,
            margin: "0 0 20px",
            letterSpacing: "-0.01em",
          }}
        >
          AI that turns hard work
          <br />
          into <span style={{ color: "#C85A2A" }}>easy</span> work
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "17px",
            color: "#666",
            lineHeight: 1.8,
            margin: "0 auto 40px",
            maxWidth: "480px",
            fontWeight: 400,
          }}
        >
          Automate your daily tasks without writing a single line of code
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#1A1A1A",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              padding: "13px 28px",
              borderRadius: "100px",
              textDecoration: "none",
              fontFamily: "system-ui, sans-serif",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Start a Project →
          </a>
          <a
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.75)",
              color: "#1A1A1A",
              fontSize: "14px",
              fontWeight: 500,
              padding: "13px 28px",
              borderRadius: "100px",
              textDecoration: "none",
              border: "0.5px solid rgba(0,0,0,0.12)",
              fontFamily: "system-ui, sans-serif",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.95)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.75)")
            }
          >
            View Services
          </a>
        </div>

        {/* Social proof */}
        <p
          style={{
            marginTop: "32px",
            fontSize: "12px",
            color: "#999",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          Work smarter with intelligent tools
        </p>
      </div>
    </section>
  );
}

const FLOAT_AMOUNTS = [8, 6, 10, 7, 9, 6, 8];

function FloatingCard({
  item,
  mounted,
  index,
}: {
  item: (typeof floatingItems)[0];
  mounted: boolean;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const floatY = FLOAT_AMOUNTS[index % FLOAT_AMOUNTS.length];

  return (
    <div
      style={{
        position: "absolute",
        left: `${item.x}%`,
        top: `${item.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 1,
      }}
    >
      <motion.div
        style={{ rotate: item.rotation }}
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1, y: [0, -floatY, 0] } : { opacity: 0 }}
        transition={{
          opacity: { duration: 0.6, delay: item.delay, ease: "easeOut" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: item.delay },
        }}
      >
      <div
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "14px",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "0.5px solid rgba(255,255,255,0.9)",
          whiteSpace: "nowrap",
        }}
      >
        {imgError ? (
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: item.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "12px",
              fontWeight: 700,
              color: "#fff",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {item.label[0]}
          </div>
        ) : (
          <img
            src={item.icon}
            alt={item.label}
            onError={() => setImgError(true)}
            style={{ width: "28px", height: "28px", objectFit: "contain", flexShrink: 0 }}
          />
        )}
        <span
          style={{
            fontSize: "12px",
            color: "#333",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
          }}
        >
          {item.label}
        </span>
      </div>
      </motion.div>
    </div>
  );
}
