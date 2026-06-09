import { ArrowRight, Zap, Brain, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: '#04080F' }}
    >
      {/* Grid background */}
      <div aria-hidden className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

      {/* Animated mesh gradients */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 20%, rgba(91,156,248,0.10) 0%, transparent 65%), ' +
            'radial-gradient(ellipse 60% 50% at 80% 70%, rgba(139,92,246,0.07) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 50% 50% at 10% 80%, rgba(255,117,85,0.05) 0%, transparent 55%)',
        }}
      />

      {/* Top-left large blob */}
      <div
        aria-hidden
        className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(91,156,248,0.06) 0%, transparent 65%)' }}
      />

      {/* Bottom-right violet blob */}
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)' }}
      />

      {/* Floating decorative cards */}
      <div
        aria-hidden
        className="float absolute top-32 right-8 lg:right-24 hidden lg:flex flex-col gap-3 pointer-events-none z-10"
      >
        <div
          className="card-glass px-4 py-3 flex items-center gap-3 w-48"
          style={{ borderColor: 'rgba(91,156,248,0.15)' }}
        >
          <div className="w-8 h-8 rounded-lg icon-electric flex-shrink-0 p-1.5">
            <Zap size={16} className="text-electric" />
          </div>
          <div>
            <div className="font-heading text-soft-white text-xs font-semibold">Automation</div>
            <div className="font-body text-cool-gray text-[10px]">Running 3 workflows</div>
          </div>
        </div>
        <div
          className="card-glass px-4 py-3 flex items-center gap-3 w-48 ml-6"
          style={{ borderColor: 'rgba(139,92,246,0.15)' }}
        >
          <div className="w-8 h-8 rounded-lg icon-violet flex-shrink-0 p-1.5">
            <Brain size={16} className="text-violet" />
          </div>
          <div>
            <div className="font-heading text-soft-white text-xs font-semibold">AI Assistant</div>
            <div className="font-body text-cool-gray text-[10px]">Draft ready</div>
          </div>
        </div>
      </div>

      {/* Left floating card */}
      <div
        aria-hidden
        className="float-slow absolute bottom-36 left-8 lg:left-24 hidden lg:flex items-center gap-3 pointer-events-none z-10"
      >
        <div
          className="card-glass px-4 py-3 flex items-center gap-3 w-52"
          style={{ borderColor: 'rgba(255,117,85,0.15)' }}
        >
          <div className="w-8 h-8 rounded-lg icon-coral flex-shrink-0 p-1.5">
            <Sparkles size={16} className="text-coral" />
          </div>
          <div>
            <div className="font-heading text-soft-white text-xs font-semibold">No coding needed</div>
            <div className="font-body text-cool-gray text-[10px]">100% practical</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 font-body font-semibold text-[11px] uppercase tracking-widest px-5 py-2 rounded-full"
            style={{
              background: 'rgba(91,156,248,0.10)',
              border: '1px solid rgba(91,156,248,0.22)',
              color: '#5B9CF8',
            }}
          >
            <Zap size={11} style={{ fill: '#5B9CF8' }} />
            Complete AI + Automation Training
          </span>
        </div>

        {/* Headline */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.08] tracking-tight text-soft-white mb-7">
            Automate your work.{' '}
            <span className="gradient-text">
              Use AI like a&nbsp;pro.
            </span>
          </h1>

          <p className="font-body text-lg md:text-xl text-cool-gray max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: '#8A97A8' }}>
            Learn practical AI and no-code automation skills to save time,
            simplify work, and build smarter workflows — without writing a
            single line of code.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#training"
              className="btn-primary group flex items-center gap-2.5 font-body font-semibold text-base px-9 py-4 rounded-full w-full sm:w-auto justify-center cursor-pointer"
            >
              Start Learning
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#templates"
              className="hero-secondary-btn group flex items-center gap-2 font-body font-semibold text-base px-9 py-4 rounded-full w-full sm:w-auto justify-center cursor-pointer"
            >
              Get Starter Kit
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: '4',    label: 'Training Modules',       color: '#5B9CF8' },
            { value: '12+',  label: 'Real Workflow Projects',  color: '#8B5CF6' },
            { value: '0',    label: 'Lines of Code Needed',    color: '#5B9CF8' },
            { value: '100%', label: 'Practical & Hands-On',    color: '#FF7555' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card-glass text-center px-4 py-5 rounded-2xl"
              style={{ border: `1px solid rgba(255,255,255,0.06)` }}
            >
              <div
                className="font-heading font-bold text-2xl md:text-3xl mb-1.5"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="font-body text-xs leading-snug" style={{ color: '#6A7A8E' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tool logos */}
        <div className="mt-16 text-center">
          <p className="font-body text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(138,151,168,0.5)' }}>
            Build workflows with tools like
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[
              { label: 'Make',         color: 'rgba(91,156,248,0.12)',  border: 'rgba(91,156,248,0.18)' },
              { label: 'Zapier',       color: 'rgba(255,117,85,0.10)',  border: 'rgba(255,117,85,0.18)' },
              { label: 'Notion',       color: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.10)' },
              { label: 'Google Sheets',color: 'rgba(91,156,248,0.10)',  border: 'rgba(91,156,248,0.15)' },
              { label: 'Claude AI',    color: 'rgba(255,117,85,0.10)',  border: 'rgba(255,117,85,0.15)' },
              { label: 'ChatGPT',      color: 'rgba(139,92,246,0.10)',  border: 'rgba(139,92,246,0.18)' },
              { label: 'Airtable',     color: 'rgba(255,117,85,0.08)',  border: 'rgba(255,117,85,0.12)' },
              { label: 'n8n',          color: 'rgba(91,156,248,0.08)',  border: 'rgba(91,156,248,0.12)' },
            ].map((tool) => (
              <span
                key={tool.label}
                className="font-body text-xs px-3.5 py-1.5 rounded-full"
                style={{
                  background: tool.color,
                  border: `1px solid ${tool.border}`,
                  color: '#8A97A8',
                }}
              >
                {tool.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom pill */}
        <div className="mt-12 flex justify-center">
          <div
            className="flex items-center gap-2.5 rounded-full px-5 py-2.5"
            style={{
              background: 'rgba(255,117,85,0.10)',
              border: '1px solid rgba(255,117,85,0.20)',
            }}
          >
            <Brain size={14} style={{ color: '#FF7555', flexShrink: 0 }} />
            <span className="font-body text-sm font-medium" style={{ color: '#FF7555' }}>
              No coding experience required — ever.
            </span>
          </div>
        </div>

      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #04080F, transparent)' }}
      />
    </section>
  )
}
