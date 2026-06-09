import { RefreshCw, AlertCircle, MessageSquare, TrendingUp } from 'lucide-react'

const problems = [
  {
    icon: RefreshCw,
    title: 'Repetitive manual tasks',
    description:
      'You copy the same data, send the same emails, and follow the same steps every day. It works — but it takes hours you don\'t have.',
    color: 'text-electric',
    bg: 'bg-electric/10',
    border: 'border-electric/20',
  },
  {
    icon: AlertCircle,
    title: 'AI overwhelm',
    description:
      'Every week there\'s a new AI tool, a new trend, a new thing to learn. It\'s hard to know where to start or what actually matters for your work.',
    color: 'text-coral',
    bg: 'bg-coral/10',
    border: 'border-coral/20',
  },
  {
    icon: MessageSquare,
    title: 'Using AI like a search bar',
    description:
      'You use ChatGPT or Claude, but only for basic questions. You know there\'s more it can do — you just haven\'t figured out how yet.',
    color: 'text-electric',
    bg: 'bg-electric/10',
    border: 'border-electric/20',
  },
  {
    icon: TrendingUp,
    title: 'Afraid of falling behind',
    description:
      'AI is changing how people work, fast. You want to stay confident, relevant, and ahead — without needing a tech degree to do it.',
    color: 'text-coral',
    bg: 'bg-coral/10',
    border: 'border-coral/20',
  },
]

export default function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-navy relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-xs text-coral font-semibold uppercase tracking-widest mb-4">
            Sound familiar?
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5">
            Does this sound like you?
          </h2>
          <p className="font-body text-cool-gray text-lg max-w-2xl mx-auto leading-relaxed">
            You don't have a technical problem. You have a starting point problem.
            Once you know the right tools and the right order, everything clicks.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((problem) => {
            const Icon = problem.icon
            return (
              <div
                key={problem.title}
                className="card-gradient-border p-6 md:p-7 group hover:scale-[1.02] transition-transform duration-200"
              >
                <div className={`inline-flex p-3 rounded-xl ${problem.bg} border ${problem.border} mb-5`}>
                  <Icon size={22} className={problem.color} />
                </div>
                <h3 className="font-heading font-semibold text-soft-white text-base md:text-lg mb-3 leading-snug">
                  {problem.title}
                </h3>
                <p className="font-body text-cool-gray text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Resolution hint */}
        <div className="mt-14 text-center">
          <p className="font-body text-cool-gray text-base">
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
