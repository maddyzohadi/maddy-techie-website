"use client";

import React, { useEffect, useRef, useState } from "react";

const floatingItems = [
  { icon: "https://cdn.worldvectorlogo.com/logos/chatgpt-6.svg",           label: "ChatGPT",      x: 8,  y: 18, delay: 0,   rotation: -8, color: "#10A37F" },
  { icon: "https://cdn.worldvectorlogo.com/logos/claude-1.svg",            label: "Claude",       x: 72, y: 12, delay: 0.4, rotation:  6, color: "#CC785C" },
  { icon: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg",            label: "اتوماسیون",    x: 82, y: 55, delay: 0.8, rotation: -5, color: "#FF4A00" },
  { icon: "https://cdn.worldvectorlogo.com/logos/google-sheets-logo-1.svg",label: "Google Sheets",x: 6,  y: 62, delay: 1.2, rotation:  7, color: "#34A853" },
  { icon: "https://cdn.worldvectorlogo.com/logos/notion-logo-1.svg",       label: "Notion",       x: 60, y: 78, delay: 0.6, rotation: -6, color: "#1A1A1A" },
  { icon: "https://cdn.worldvectorlogo.com/logos/make-1.svg",              label: "Make",         x: 22, y: 80, delay: 1.0, rotation:  5, color: "#6D00CC" },
  { icon: "https://cdn.worldvectorlogo.com/logos/google-gemini.svg",       label: "Gemini",       x: 75, y: 30, delay: 1.4, rotation: -4, color: "#4285F4" },
];

export default function HeroFa() {
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
      {/* Radial gradient blob - center */}
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
        <FloatingCard key={i} item={item} mounted={mounted} />
      ))}

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "680px",
          direction: "rtl",
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
            هوش مصنوعی برای کار و بهره‌وری
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 700,
            color: "#1A1A1A",
            lineHeight: 1.25,
            margin: "0 0 20px",
            letterSpacing: "-0.01em",
          }}
        >
          هوش مصنوعی که کارهای
          <br />
          <span style={{ color: "#C85A2A" }}>سخت رو ساده</span> میکنه
        </h1>

        {/* Subheading */}
        <p
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
            href="/fa/contact"
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
              fontFamily: "'Noto Naskh Arabic', serif",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
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
              color: "#1A1A1A",
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
          با ابزارهای هوشمند سریع‌تر و بهتر کار کن
        </p>
      </div>
    </section>
  );
}

function FloatingCard({
  item,
  mounted,
}: {
  item: (typeof floatingItems)[0];
  mounted: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      style={{
        position: "absolute",
        left: `${item.x}%`,
        top: `${item.y}%`,
        zIndex: 1,
        opacity: mounted ? 1 : 0,
        transform: mounted
          ? `rotate(${item.rotation}deg) translateY(0px)`
          : `rotate(${item.rotation}deg) translateY(20px)`,
        transition: `opacity 0.6s ease ${item.delay}s, transform 0.6s ease ${item.delay}s`,
        animation: mounted
          ? `float${Math.abs(item.rotation) % 3} 4s ease-in-out ${item.delay}s infinite`
          : "none",
      }}
    >
      <style>{`
        @keyframes float0 {
          0%, 100% { transform: rotate(${item.rotation}deg) translateY(0px); }
          50% { transform: rotate(${item.rotation}deg) translateY(-8px); }
        }
        @keyframes float1 {
          0%, 100% { transform: rotate(${item.rotation}deg) translateY(0px); }
          50% { transform: rotate(${item.rotation}deg) translateY(-6px); }
        }
        @keyframes float2 {
          0%, 100% { transform: rotate(${item.rotation}deg) translateY(0px); }
          50% { transform: rotate(${item.rotation}deg) translateY(-10px); }
        }
      `}</style>
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
            fontFamily: "'Noto Naskh Arabic', serif",
            fontWeight: 500,
            direction: "rtl",
          }}
        >
          {item.label}
        </span>
      </div>
    </div>
  );
}
