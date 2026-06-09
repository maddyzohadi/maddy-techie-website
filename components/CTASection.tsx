import { ArrowRight, Zap } from 'lucide-react'

export default function CTASection() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f1e38 50%, #08121F 100%)' }}
    >
      {/* Dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 dot-bg opacity-60 pointer-events-none"
      />

      {/* Blue glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 bg-electric/10 border border-electric/20 text-electric font-body text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
            <Zap size={12} className="fill-electric" />
            Ready when you are
          </span>
        </div>

        <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-soft-white mb-6 leading-tight">
          Ready to make AI{' '}
          <span className="gradient-text">work with you?</span>
        </h2>

        <p className="font-body text-cool-gray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Start learning practical AI and automation skills you can use in your
          daily work — without coding or confusing tech jargon.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#training"
            className="btn-glow group flex items-center gap-2 bg-electric hover:bg-blue-600 text-white font-body font-semibold text-base px-9 py-4 rounded-full transition-all duration-200 w-full sm:w-auto justify-center"
          >
            Start Learning
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#templates"
            className="flex items-center gap-2 border border-white/15 hover:border-white/30 hover:bg-white/5 text-soft-white font-body font-semibold text-base px-9 py-4 rounded-full transition-all duration-200 w-full sm:w-auto justify-center"
          >
            Get Starter Kit
          </a>
        </div>

        {/* Reassurance row */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {[
            'No coding required',
            'No technical experience needed',
            'Practical from day one',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 font-body text-sm text-cool-gray">
              <span className="w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
