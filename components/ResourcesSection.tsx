'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

// ── Data ───────────────────────────────────────────────────────────────────
type Tier = 'Free' | 'Premium'

interface Template {
  id: number
  name: string
  cat: string
  desc: string
  tools: string[]
  tier: Tier
}

const TEMPLATES: Template[] = [
  {
    id: 1,
    name: 'AI Email Reply Kit',
    cat: 'AI Prompts',
    desc: 'Reusable prompts that help you write, reply, and clear your inbox in minutes, no starting from scratch.',
    tools: ['ChatGPT', 'Claude'],
    tier: 'Free',
  },
  {
    id: 2,
    name: 'Weekly Report Summary Sheet',
    cat: 'Reports',
    desc: 'Paste your notes or data and get a clean written summary with key highlights, ready to send.',
    tools: ['Google Sheets', 'Claude'],
    tier: 'Free',
  },
  {
    id: 3,
    name: 'Google Sheets Content Planner',
    cat: 'Content Planning',
    desc: 'Plan a full month of content with topics, post formats, and captions, all in one organized sheet.',
    tools: ['Google Sheets', 'ChatGPT'],
    tier: 'Premium',
  },
  {
    id: 4,
    name: 'Prompt Library Tracker',
    cat: 'Google Sheets',
    desc: 'Save and organize your best prompts by task so you reuse what works without starting over every time.',
    tools: ['Google Sheets', 'ChatGPT'],
    tier: 'Free',
  },
  {
    id: 5,
    name: 'Client Lead Tracker',
    cat: 'Client Work',
    desc: 'Track leads and follow-ups with status columns, notes, and simple filters, ready to use in minutes.',
    tools: ['Google Sheets'],
    tier: 'Free',
  },
  {
    id: 6,
    name: 'Meeting Notes Summary Prompt',
    cat: 'Reports',
    desc: 'Turn raw meeting notes into clean summaries, action items, and follow-up email drafts instantly.',
    tools: ['Claude', 'ChatGPT'],
    tier: 'Premium',
  },
]

const CATEGORIES = ['All', 'AI Prompts', 'Google Sheets', 'Content Planning', 'Reports', 'Client Work']

const ACCENTS: Record<string, { color: string; glow: string; soft: string }> = {
  'AI Prompts':       { color: '#6B9FFF', glow: 'rgba(107,159,255,.40)', soft: 'rgba(107,159,255,.13)' },
  'Google Sheets':    { color: '#8b7bff', glow: 'rgba(139,123,255,.40)', soft: 'rgba(139,123,255,.13)' },
  'Content Planning': { color: '#5b9bff', glow: 'rgba(91,155,255,.40)',  soft: 'rgba(91,155,255,.13)'  },
  'Reports':          { color: '#a99bff', glow: 'rgba(169,155,255,.40)', soft: 'rgba(169,155,255,.13)' },
  'Client Work':      { color: '#4aa8ff', glow: 'rgba(74,168,255,.40)',  soft: 'rgba(74,168,255,.13)'  },
}

// ── Thumbnail ──────────────────────────────────────────────────────────────
function Thumbnail({ accent }: { accent: { color: string; glow: string; soft: string } }) {
  return (
    <div
      style={{
        height: '152px',
        borderRadius: '15px',
        overflow: 'hidden',
        position: 'relative',
        background: `linear-gradient(158deg, ${accent.soft}, rgba(255,255,255,.015))`,
        border: '1px solid rgba(255,255,255,.07)',
        flexShrink: 0,
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Connector line */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '63px',
          left: '40px',
          right: '40px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${accent.color}55, transparent)`,
        }}
      />

      {/* 3 nodes */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '55px',
          left: 0, right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '38px',
        }}
      >
        <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: accent.color, opacity: 0.55 }} />
        <div style={{
          width: '18px', height: '18px', borderRadius: '50%',
          background: accent.color,
          boxShadow: `0 0 12px 4px ${accent.glow}`,
          animation: 'mtPulse 3.4s ease-in-out infinite',
        }} />
        <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: accent.color, opacity: 0.55 }} />
      </div>

      {/* Mini frosted cards */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '14px', left: '14px', right: '14px',
          display: 'flex', gap: '8px',
        }}
      >
        {[{ w: '55%', opacity: 0.055 }, { w: '38%', opacity: 0.04 }].map((c, i) => (
          <div
            key={i}
            style={{
              flex: 1, height: '28px',
              borderRadius: '9px',
              background: `rgba(255,255,255,${c.opacity})`,
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,.08)',
              padding: '0 10px',
              display: 'flex', alignItems: 'center',
            }}
          >
            <div style={{ width: c.w, height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,.22)' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main section ───────────────────────────────────────────────────────────
export default function ResourcesSection() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.cat === filter)

  return (
    <section id="templates" className="py-24 md:py-32 relative scroll-mt-24" style={{ background: '#060B14' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 15% 50%, rgba(107,159,255,.05) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Intro ──────────────────────────────────── */}
        <div className="text-center mb-12">
          <p
            className="font-body font-bold mb-5"
            style={{ fontSize: '13px', letterSpacing: '.22em', color: '#5b9bff', textTransform: 'uppercase' }}
          >
            TEMPLATES
          </p>
          <h2
            className="font-heading font-extrabold mx-auto mb-5"
            style={{
              fontSize: 'clamp(36px, 5.4vw, 62px)',
              lineHeight: 1.04,
              letterSpacing: '-.025em',
              color: '#f4f5fb',
              maxWidth: '14ch',
            }}
          >
            Start with{' '}
            <span
              style={{
                background: 'linear-gradient(100deg, #a99bff, #5cb2ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              a system
            </span>
            , not a blank page
          </h2>
          <p
            className="font-body mx-auto"
            style={{ fontSize: '18.5px', lineHeight: 1.55, color: '#9da0b6', maxWidth: '600px' }}
          >
            Plug-and-play AI and no-code workflows you can grab, tweak, and run today. Built for real work, no building from scratch.
          </p>
        </div>

        {/* ── Filter pills ───────────────────────────── */}
        <div
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}
        >
          {CATEGORIES.map((cat) => {
            const active = filter === cat
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="font-body font-semibold cursor-pointer transition-all duration-200"
                style={{
                  padding: '10px 20px',
                  borderRadius: '999px',
                  fontSize: '14.5px',
                  border: active ? 'none' : '1px solid rgba(255,255,255,.13)',
                  background: active
                    ? 'linear-gradient(135deg, #a99bff, #5cb2ff)'
                    : 'rgba(255,255,255,.03)',
                  color: active ? '#0a0e17' : '#c2c5d6',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Count line */}
        <p
          className="font-body text-center mb-10"
          style={{ fontSize: '13.5px', color: '#787c92' }}
        >
          {visible.length} ready-to-run template{visible.length !== 1 ? 's' : ''}
        </p>

        {/* ── Template card grid ─────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
            gap: '22px',
            marginBottom: '72px',
          }}
        >
          {visible.map((tmpl) => {
            const accent = ACCENTS[tmpl.cat]
            return (
              <div
                key={tmpl.id}
                className="template-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  padding: '15px',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,.025)',
                  border: '1px solid rgba(255,255,255,.08)',
                  cursor: 'pointer',
                  '--card-glow': accent.glow,
                } as React.CSSProperties}
              >
                {/* Thumbnail + tier badge overlay */}
                <div style={{ position: 'relative' }}>
                  <Thumbnail accent={accent} />
                  <span
                    className="font-body font-bold"
                    style={{
                      position: 'absolute', top: '10px', right: '10px',
                      padding: '5px 11px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      letterSpacing: '.03em',
                      ...(tmpl.tier === 'Premium'
                        ? {
                            background: 'linear-gradient(135deg, #a99bff, #5cb2ff)',
                            color: '#0a0e17',
                            boxShadow: '0 6px 16px -6px rgba(120,110,255,.6)',
                          }
                        : {
                            background: 'rgba(10,14,23,.55)',
                            border: '1px solid rgba(255,255,255,.18)',
                            color: '#d2d5e2',
                            backdropFilter: 'blur(4px)',
                          }),
                    }}
                  >
                    {tmpl.tier.toUpperCase()}
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="font-heading"
                  style={{ fontSize: '18px', fontWeight: 700, color: '#f1f2f8', letterSpacing: '-.01em', lineHeight: 1.25, margin: 0 }}
                >
                  {tmpl.name}
                </h3>

                {/* Description */}
                <p
                  className="font-body"
                  style={{ fontSize: '14px', color: '#9598ab', lineHeight: 1.5, margin: 0, flexGrow: 1 }}
                >
                  {tmpl.desc}
                </p>

                {/* Tool tags */}
                <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
                  {tmpl.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-body"
                      style={{
                        padding: '5px 10px',
                        borderRadius: '7px',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#b7bacb',
                        background: 'rgba(255,255,255,.04)',
                        border: '1px solid rgba(255,255,255,.09)',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Card footer */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255,255,255,.06)',
                  }}
                >
                  <a
                    href="#contact"
                    className="font-body font-bold inline-flex items-center gap-1.5"
                    style={{ fontSize: '14.5px', color: accent.color, textDecoration: 'none' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Get template
                    <ArrowRight size={14} />
                  </a>
                  <button
                    className="font-body cursor-pointer transition-colors duration-200"
                    style={{ fontSize: '13.5px', fontWeight: 500, color: '#82859b', background: 'none', border: 'none', padding: 0 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#c7cad9' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#82859b' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Preview
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Custom template CTA ────────────────────── */}
        <div
          className="relative overflow-hidden text-center"
          style={{
            padding: 'clamp(40px, 5vw, 64px) 32px',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,.10)',
            background: [
              'radial-gradient(700px 320px at 50% 0%, rgba(120,100,255,.18), transparent 65%)',
              'rgba(255,255,255,.022)',
            ].join(', '),
          }}
        >
          {/* Dot grid overlay */}
          <div
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          />
          <div className="relative z-10">
            <p
              className="font-body font-bold mb-4"
              style={{ fontSize: '13px', letterSpacing: '.20em', color: '#5b9bff', textTransform: 'uppercase' }}
            >
              Can&apos;t find your exact workflow?
            </p>
            <h2
              className="font-heading font-extrabold mx-auto mb-4"
              style={{
                fontSize: 'clamp(26px, 3.4vw, 42px)',
                color: '#f4f5fb',
                maxWidth: '16ch',
                letterSpacing: '-.02em',
                lineHeight: 1.1,
              }}
            >
              Tell me how you work<br />I&apos;ll build the system for it
            </h2>
            <p
              className="font-body mx-auto mb-8"
              style={{ fontSize: '16.5px', color: '#9da0b6', maxWidth: '480px', lineHeight: 1.6 }}
            >
              A template made for your real day-to-day tasks, set up in plain English with no code and no jargon<br />You bring the workflow, I&apos;ll do the building
            </p>
            <a
              href="#contact"
              className="font-body font-bold inline-flex items-center gap-2 cursor-pointer"
              style={{
                padding: '15px 28px',
                borderRadius: '13px',
                fontSize: '15.5px',
                color: '#0a0e17',
                background: 'linear-gradient(140deg, #a99bff, #5cb2ff)',
                boxShadow: '0 12px 32px -10px rgba(120,110,255,.6), inset 0 1px 0 rgba(255,255,255,.4)',
                textDecoration: 'none',
              }}
            >
              Get my custom template
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
