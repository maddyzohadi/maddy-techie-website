import { Zap, Brain, Plus } from 'lucide-react'

export default function MethodSection() {
  return (
    <section className="py-24 md:py-32 relative" style={{ background: '#060B14' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Mesh bg */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 15% 50%, rgba(91,156,248,0.07) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 60% 70% at 85% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block font-body text-[11px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#5B9CF8' }}
          >
            The method
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5 leading-tight">
            Two tools. One system.{' '}
            <br className="hidden md:block" />
            <span className="gradient-text">Completely no-code.</span>
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#8A97A8' }}>
            Most people try to use AI and automation separately. The real power
            is combining them into a single, connected workflow.
          </p>
        </div>

        {/* Method cards */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 max-w-5xl mx-auto">

          {/* Left — Automation */}
          <div
            className="flex-1 card-gradient-border p-8 md:p-10 group"
            style={{ border: '1px solid rgba(91,156,248,0.14)' }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: 'rgba(91,156,248,0.12)', border: '1px solid rgba(91,156,248,0.22)' }}
            >
              <Zap size={26} style={{ color: '#5B9CF8', fill: 'rgba(91,156,248,0.25)' }} />
            </div>
            <div
              className="font-body text-[11px] font-semibold uppercase tracking-widest mb-2"
              style={{ color: '#5B9CF8' }}
            >
              Part 1
            </div>
            <h3 className="font-heading font-bold text-soft-white text-2xl md:text-3xl mb-4">
              No-code Automation
            </h3>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: '#8A97A8' }}>
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
                <li key={item} className="flex items-start gap-3 font-body text-sm" style={{ color: '#8A97A8' }}>
                  <span
                    className="mt-1.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(91,156,248,0.15)', border: '1px solid rgba(91,156,248,0.30)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full block"
                      style={{ background: '#5B9CF8' }}
                    />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Plus separator */}
          <div className="flex items-center justify-center lg:flex-col gap-4 py-4 lg:py-0">
            <div
              className="hidden lg:block w-px flex-1"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)' }}
            />
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#0C1524', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <Plus size={18} style={{ color: '#6A7A8E' }} />
            </div>
            <div
              className="hidden lg:block w-px flex-1"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)' }}
            />
            <div
              className="lg:hidden h-px flex-1"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
            />
            <div
              className="lg:hidden h-px flex-1"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
            />
          </div>

          {/* Right — AI */}
          <div
            className="flex-1 card-gradient-border p-8 md:p-10 group"
            style={{ border: '1px solid rgba(139,92,246,0.14)' }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.22)' }}
            >
              <Brain size={26} style={{ color: '#8B5CF6' }} />
            </div>
            <div
              className="font-body text-[11px] font-semibold uppercase tracking-widest mb-2"
              style={{ color: '#8B5CF6' }}
            >
              Part 2
            </div>
            <h3 className="font-heading font-bold text-soft-white text-2xl md:text-3xl mb-4">
              AI for Thinking Work
            </h3>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: '#8A97A8' }}>
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
                <li key={item} className="flex items-start gap-3 font-body text-sm" style={{ color: '#8A97A8' }}>
                  <span
                    className="mt-1.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.30)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full block"
                      style={{ background: '#8B5CF6' }}
                    />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quote card */}
        <div className="mt-14 max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-7 md:p-9 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(91,156,248,0.08) 0%, rgba(139,92,246,0.07) 100%)',
              border: '1px solid rgba(91,156,248,0.15)',
            }}
          >
            {/* Corner accent */}
            <div
              aria-hidden
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }}
            />
            <p className="font-heading font-semibold text-soft-white text-lg md:text-xl leading-relaxed relative z-10">
              "Automation handles the repetitive work. AI helps with the thinking
              work.{' '}
              <span className="gradient-text">Together, they change how you work."</span>
            </p>
          </div>
        </div>

      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
