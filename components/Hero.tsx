import { ArrowRight, Zap, Brain } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center dot-bg overflow-hidden"
    >
      {/* Radial gradient overlay — blue centre glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Top-left accent blob */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Bottom-right coral blob */}
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,138,91,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 bg-electric/10 border border-electric/20 text-electric font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full">
            <Zap size={12} className="fill-electric" />
            Complete AI + Automation Training
          </span>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-soft-white mb-6">
            Automate your work.{' '}
            <span className="gradient-text">Use AI like a professional.</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-cool-gray max-w-2xl mx-auto leading-relaxed mb-10">
            Learn practical AI and no-code automation skills to save time, simplify
            work, and build smarter workflows — without writing a single line of code.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#training"
              className="btn-glow group flex items-center gap-2 bg-electric hover:bg-blue-600 text-white font-body font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 w-full sm:w-auto justify-center"
            >
              Start Learning
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#templates"
              className="flex items-center gap-2 border border-white/15 hover:border-white/30 hover:bg-white/5 text-soft-white font-body font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 w-full sm:w-auto justify-center"
            >
              Get Starter Kit
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: '4',    label: 'Training Modules' },
            { value: '12+',  label: 'Real Workflow Projects' },
            { value: '0',    label: 'Lines of Code Needed' },
            { value: '100%', label: 'Practical & Hands-On' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-slate/60 border border-white/5 rounded-2xl px-4 py-5 text-center backdrop-blur-sm"
            >
              <div className="font-heading font-bold text-2xl md:text-3xl text-electric mb-1">
                {stat.value}
              </div>
              <div className="font-body text-xs text-cool-gray leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tool logos strip */}
        <div className="mt-16 text-center">
          <p className="font-body text-xs text-cool-gray/60 uppercase tracking-widest mb-5">
            Build workflows with tools like
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {[
              'Make (Integromat)',
              'Zapier',
              'Notion',
              'Google Sheets',
              'Claude AI',
              'ChatGPT',
              'Airtable',
              'n8n',
            ].map((tool) => (
              <span
                key={tool}
                className="bg-slate/80 border border-white/5 text-cool-gray font-body text-xs px-3 py-1.5 rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Floating pill — practical reminder */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2.5 bg-coral/10 border border-coral/20 rounded-full px-5 py-2.5">
            <Brain size={14} className="text-coral flex-shrink-0" />
            <span className="font-body text-sm text-coral font-medium">
              No coding experience required — ever.
            </span>
          </div>
        </div>

      </div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #08121F, transparent)',
        }}
      />
    </section>
  )
}
