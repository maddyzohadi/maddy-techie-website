import { Zap, CheckCircle, Star } from 'lucide-react'

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
    <section id="about" className="py-24 md:py-32 bg-navy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — image placeholder */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Main image card */}
              <div className="card-gradient-border p-1 rounded-2xl overflow-hidden">
                <div
                  className="rounded-xl w-full aspect-[4/3] flex flex-col items-center justify-center gap-4"
                  style={{
                    background:
                      'linear-gradient(135deg, #0d1b2e 0%, #1B2433 50%, #0f1e31 100%)',
                  }}
                >
                  {/* Placeholder avatar */}
                  <div className="w-24 h-24 rounded-full bg-electric/20 border-2 border-electric/30 flex items-center justify-center">
                    <span className="font-heading font-bold text-3xl text-electric">M</span>
                  </div>
                  <div className="text-center px-6">
                    <div className="font-heading font-bold text-soft-white text-xl mb-1">
                      Maddy the Techie
                    </div>
                    <div className="font-body text-cool-gray text-sm">
                      AI &amp; Automation Educator
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-coral fill-coral" />
                    ))}
                  </div>
                  <div className="font-body text-cool-gray text-xs italic px-8 text-center">
                    "Making AI practical for everyone who doesn't code."
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-5 -right-4 md:-right-8 bg-slate border border-white/10 rounded-xl px-5 py-3.5 shadow-xl">
                <div className="font-body text-xs text-cool-gray mb-0.5">Approach</div>
                <div className="font-heading font-bold text-soft-white text-sm">
                  100% Project-based
                </div>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div className="order-1 lg:order-2">
            <span className="inline-block font-body text-xs text-electric font-semibold uppercase tracking-widest mb-4">
              About
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-6 leading-tight">
              Practical AI education
              <br />
              <span className="gradient-text">for the real world</span>
            </h2>

            <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-5">
              Maddy the Techie teaches non-technical professionals how to use AI and
              automation in real work situations. The goal is to make modern tools
              simple, useful, and approachable.
            </p>
            <p className="font-body text-cool-gray text-base leading-relaxed mb-8">
              You don't need to understand how AI works under the hood. You need to
              know how to use it confidently in your daily work — and that's exactly
              what this training delivers.
            </p>

            {/* Beliefs */}
            <div className="space-y-3 mb-8">
              {beliefs.map((belief) => (
                <div key={belief} className="flex items-start gap-3 font-body text-sm text-soft-white">
                  <CheckCircle size={17} className="text-electric flex-shrink-0 mt-0.5" />
                  <span>{belief}</span>
                </div>
              ))}
            </div>

            {/* Highlight grid */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="bg-slate/60 border border-white/5 rounded-xl px-4 py-3"
                >
                  <div className="font-body text-xs text-cool-gray mb-0.5 uppercase tracking-wide">
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
