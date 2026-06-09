import { Zap, CheckCircle, Star, Sparkles } from 'lucide-react'

const beliefs = [
  "You don't need to code to work smarter with AI.",
  "Every lesson should end with something you can actually use.",
  "The best AI workflow is one you understand and can maintain yourself.",
  "Practical beats theoretical, every single time.",
]

const highlights = [
  { label: 'Focus',     value: 'No-code AI & Automation' },
  { label: 'Approach', value: 'Project-based & Practical' },
  { label: 'Built for', value: 'Non-technical professionals' },
  { label: 'Goal',     value: 'Real skills, real results' },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative" style={{ background: '#04080F' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(91,156,248,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — visual card */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Main profile card */}
              <div
                className="rounded-3xl overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, #0A1525 0%, #0C1B2E 50%, #091421 100%)',
                  border: '1px solid rgba(91,156,248,0.15)',
                }}
              >
                {/* Background decoration */}
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(91,156,248,0.08) 0%, transparent 70%)' }}
                />
                <div
                  aria-hidden
                  className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }}
                />

                <div className="relative z-10 p-10 flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-5">
                    <div
                      className="w-28 h-28 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(91,156,248,0.2), rgba(139,92,246,0.2))',
                        border: '2px solid rgba(91,156,248,0.25)',
                      }}
                    >
                      <span className="font-heading font-bold text-4xl" style={{ color: '#5B9CF8' }}>M</span>
                    </div>
                    {/* Sparkle accent */}
                    <div
                      className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #5B9CF8, #8B5CF6)' }}
                    >
                      <Sparkles size={13} className="text-white" />
                    </div>
                  </div>

                  <div className="font-heading font-bold text-soft-white text-xl mb-1">
                    Maddy the Techie
                  </div>
                  <div className="font-body text-sm mb-4" style={{ color: '#8A97A8' }}>
                    AI &amp; Automation Educator
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} style={{ color: '#FF7555', fill: '#FF7555' }} />
                    ))}
                  </div>
                  <p className="font-body text-xs italic max-w-xs leading-relaxed" style={{ color: '#8A97A8' }}>
                    "Making AI practical for everyone who doesn't code."
                  </p>

                  {/* Stats row */}
                  <div className="mt-7 grid grid-cols-3 gap-3 w-full">
                    {[
                      { value: '4',    label: 'Modules' },
                      { value: '12+',  label: 'Projects' },
                      { value: '100%', label: 'Practical' },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl py-3 text-center"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div className="font-heading font-bold text-base" style={{ color: '#5B9CF8' }}>
                          {s.value}
                        </div>
                        <div className="font-body text-[10px] mt-0.5" style={{ color: '#6A7A8E' }}>
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-5 -right-4 md:-right-8 rounded-2xl px-5 py-3.5 shadow-2xl"
                style={{
                  background: '#0C1524',
                  border: '1px solid rgba(139,92,246,0.20)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}
              >
                <div className="font-body text-xs mb-0.5" style={{ color: '#8A97A8' }}>Approach</div>
                <div className="font-heading font-bold text-soft-white text-sm">
                  100% Project-based
                </div>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div className="order-1 lg:order-2">
            <span
              className="inline-block font-body text-[11px] font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#5B9CF8' }}
            >
              About
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-6 leading-tight">
              Practical AI education
              <br />
              <span className="gradient-text">for the real world</span>
            </h2>

            <p className="font-body text-base md:text-lg leading-relaxed mb-5" style={{ color: '#8A97A8' }}>
              Maddy the Techie teaches non-technical professionals how to use AI and
              automation in real work situations. The goal is to make modern tools
              simple, useful, and approachable.
            </p>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: '#8A97A8' }}>
              You don't need to understand how AI works under the hood. You need to
              know how to use it confidently in your daily work — and that's exactly
              what this training delivers.
            </p>

            {/* Beliefs */}
            <div className="space-y-3.5 mb-8">
              {beliefs.map((belief) => (
                <div key={belief} className="flex items-start gap-3 font-body text-sm text-soft-white">
                  <CheckCircle size={17} style={{ color: '#5B9CF8', flexShrink: 0, marginTop: 2 }} />
                  <span>{belief}</span>
                </div>
              ))}
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-xl px-4 py-3.5 group hover:border-electric/20 transition-colors duration-200"
                  style={{
                    background: 'rgba(12, 21, 36, 0.8)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="font-body text-[10px] uppercase tracking-wide mb-1"
                    style={{ color: '#6A7A8E' }}
                  >
                    {h.label}
                  </div>
                  <div className="font-heading font-semibold text-soft-white text-sm leading-snug">
                    {h.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
