import { RefreshCw, AlertCircle, MessageSquare, TrendingUp } from 'lucide-react'

const problems = [
  {
    icon: RefreshCw,
    title: 'Repetitive manual tasks',
    description:
      "You copy the same data, send the same emails, and follow the same steps every day. It works — but it takes hours you don't have.",
    accent: { text: '#5B9CF8', bg: 'rgba(91,156,248,0.10)', border: 'rgba(91,156,248,0.20)' },
    number: '01',
  },
  {
    icon: AlertCircle,
    title: 'AI overwhelm',
    description:
      "Every week there's a new AI tool, a new trend, a new thing to learn. It's hard to know where to start or what actually matters for your work.",
    accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.10)', border: 'rgba(255,117,85,0.20)' },
    number: '02',
  },
  {
    icon: MessageSquare,
    title: 'Using AI like a search bar',
    description:
      "You use ChatGPT or Claude, but only for basic questions. You know there's more it can do — you just haven't figured out how yet.",
    accent: { text: '#8B5CF6', bg: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.20)' },
    number: '03',
  },
  {
    icon: TrendingUp,
    title: 'Afraid of falling behind',
    description:
      "AI is changing how people work, fast. You want to stay confident, relevant, and ahead — without needing a tech degree to do it.",
    accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.10)', border: 'rgba(255,117,85,0.20)' },
    number: '04',
  },
]

export default function ProblemSection() {
  return (
    <section className="py-24 md:py-32 relative" style={{ background: '#04080F' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Mesh background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(255,117,85,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block font-body text-[11px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#FF7555' }}
          >
            Sound familiar?
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5 leading-tight">
            Does this sound like you?
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#8A97A8' }}>
            You don't have a technical problem. You have a starting-point problem.
            Once you know the right tools and the right order, everything clicks.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((problem) => {
            const Icon = problem.icon
            const a = problem.accent
            return (
              <div
                key={problem.title}
                className="card-gradient-border p-7 group flex flex-col"
              >
                {/* Number + icon */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="font-heading font-bold text-4xl leading-none select-none"
                    style={{ color: 'rgba(255,255,255,0.04)' }}
                  >
                    {problem.number}
                  </span>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: a.bg, border: `1px solid ${a.border}` }}
                  >
                    <Icon size={20} style={{ color: a.text }} />
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-soft-white text-base md:text-lg mb-3 leading-snug">
                  {problem.title}
                </h3>
                <p className="font-body text-sm leading-relaxed flex-1" style={{ color: '#8A97A8' }}>
                  {problem.description}
                </p>

                {/* Accent line on hover */}
                <div
                  className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${a.text}60, transparent)` }}
                />
              </div>
            )
          })}
        </div>

        {/* Resolution hint */}
        <div className="mt-14 text-center">
          <p className="font-body text-base" style={{ color: '#8A97A8' }}>
            You don't need to become a developer.{' '}
            <span className="text-soft-white font-medium">
              You just need the right system.
            </span>
          </p>
        </div>

      </div>
    </section>
  )
}
