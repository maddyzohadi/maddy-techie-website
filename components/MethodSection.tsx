import { Zap, Brain, Plus } from 'lucide-react'

export default function MethodSection() {
  return (
    <section className="py-24 md:py-32 bg-slate/30 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-xs text-electric font-semibold uppercase tracking-widest mb-4">
            The method
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5">
            Two tools. One system.
            <br />
            <span className="gradient-text">Completely no-code.</span>
          </h2>
          <p className="font-body text-cool-gray text-lg max-w-2xl mx-auto leading-relaxed">
            Most people try to use AI and automation separately. The real power
            is combining them into a single, connected workflow.
          </p>
        </div>

        {/* Method cards */}
        <div className="flex flex-col lg:flex-row items-stretch gap-5 max-w-5xl mx-auto">

          {/* Left — Automation */}
          <div className="flex-1 card-gradient-border p-8 md:p-10">
            <div className="inline-flex p-3.5 rounded-xl bg-electric/10 border border-electric/20 mb-6">
              <Zap size={26} className="text-electric fill-electric/20" />
            </div>
            <div className="font-body text-xs text-electric font-semibold uppercase tracking-widest mb-2">
              Part 1
            </div>
            <h3 className="font-heading font-bold text-soft-white text-2xl md:text-3xl mb-4">
              No-code Automation
            </h3>
            <p className="font-body text-cool-gray text-base leading-relaxed mb-6">
              Automation handles the repetitive work — the copy-paste, the data
              entry, the follow-up emails, the scheduling. Set it up once, and it
              runs by itself every time.
            </p>
            <ul className="space-y-3">
              {[
                'Triggers, actions, and logic — no code',
                'Connect your tools automatically',
                'Save hours every single week',
                'Works while you focus on real work',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 font-body text-sm text-cool-gray">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-electric/10 border border-electric/30 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric block" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Plus separator */}
          <div className="flex items-center justify-center lg:flex-col gap-4 py-4 lg:py-0">
            <div className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="w-10 h-10 rounded-full bg-slate border border-white/10 flex items-center justify-center flex-shrink-0">
              <Plus size={18} className="text-cool-gray" />
            </div>
            <div className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            {/* horizontal line for mobile */}
            <div className="lg:hidden h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="lg:hidden h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Right — AI */}
          <div className="flex-1 card-gradient-border p-8 md:p-10">
            <div className="inline-flex p-3.5 rounded-xl bg-coral/10 border border-coral/20 mb-6">
              <Brain size={26} className="text-coral" />
            </div>
            <div className="font-body text-xs text-coral font-semibold uppercase tracking-widest mb-2">
              Part 2
            </div>
            <h3 className="font-heading font-bold text-soft-white text-2xl md:text-3xl mb-4">
              AI for Thinking Work
            </h3>
            <p className="font-body text-cool-gray text-base leading-relaxed mb-6">
              AI handles the thinking work — writing, summarising, analysing,
              planning. It drafts emails, summarises reports, and suggests next
              steps based on your instructions.
            </p>
            <ul className="space-y-3">
              {[
                'Prompting for practical real-world tasks',
                'AI agents that work across multiple steps',
                'Smarter emails, reports, and notes',
                'Safe, honest, and useful — not just hype',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 font-body text-sm text-cool-gray">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-coral/10 border border-coral/30 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral block" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-14 max-w-3xl mx-auto">
          <div className="bg-slate/60 border border-white/5 rounded-2xl p-7 md:p-8 text-center">
            <p className="font-heading font-semibold text-soft-white text-lg md:text-xl leading-relaxed">
              "Automation handles the repetitive work.
              AI helps with the thinking work.{' '}
              <span className="gradient-text">Together, they change how you work."</span>
            </p>
          </div>
        </div>

      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
