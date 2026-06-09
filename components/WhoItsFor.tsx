import { Briefcase, Palette, Store, CheckCircle } from 'lucide-react'

const audiences = [
  {
    icon: Briefcase,
    number: '01',
    title: 'Non-Technical Professionals',
    description:
      'Admin, marketing, operations, HR, project coordinators, remote workers, and knowledge workers who want practical AI skills without needing to code.',
    examples: ['Marketing managers', 'Operations leads', 'HR professionals', 'Project coordinators'],
    accent: { text: '#5B9CF8', bg: 'rgba(91,156,248,0.12)', border: 'rgba(91,156,248,0.22)', gradient: 'linear-gradient(135deg, #5B9CF8, #8B5CF6)' },
  },
  {
    icon: Palette,
    number: '02',
    title: 'Creators',
    description:
      'YouTube creators, newsletter writers, and digital product sellers who want faster, smarter content workflows without spending all day on production.',
    examples: ['YouTube creators', 'Newsletter writers', 'Digital product sellers', 'Course creators'],
    accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.12)', border: 'rgba(255,117,85,0.22)', gradient: 'linear-gradient(135deg, #FF7555, #FF5A2E)' },
  },
  {
    icon: Store,
    number: '03',
    title: 'Small Business Owners',
    description:
      'Owners who need simple, reliable systems for leads, follow-ups, bookings, customer replies, content, and reports — without hiring a developer.',
    examples: ['Service business owners', 'Consultants & coaches', 'Freelancers', 'Agency owners'],
    accent: { text: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.22)', gradient: 'linear-gradient(135deg, #8B5CF6, #C084FC)' },
  },
]

const nots = [
  'Coding experience',
  'A technical background',
  'Expensive software subscriptions',
  'Prior knowledge of AI',
  'A computer science degree',
  'Previous automation experience',
]

export default function WhoItsFor() {
  return (
    <section className="py-24 md:py-32 relative" style={{ background: '#04080F' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 60%, rgba(91,156,248,0.05) 0%, transparent 55%), ' +
            'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(139,92,246,0.05) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block font-body text-[11px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#5B9CF8' }}
          >
            Built for you
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5 leading-tight">
            Who this training is for
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#8A97A8' }}>
            This training was built for people who work hard and want to work
            smarter — not for engineers or data scientists.
          </p>
        </div>

        {/* Audience cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {audiences.map((audience) => {
            const Icon = audience.icon
            const a = audience.accent
            return (
              <div key={audience.title} className="card-gradient-border p-7 md:p-8 group">
                {/* Number + icon */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white flex-shrink-0"
                    style={{ background: a.gradient }}
                  >
                    {audience.number}
                  </span>
                  <div
                    className="p-2.5 rounded-xl"
                    style={{ background: a.bg, border: `1px solid ${a.border}` }}
                  >
                    <Icon size={18} style={{ color: a.text }} />
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-soft-white text-lg md:text-xl mb-3">
                  {audience.title}
                </h3>
                <p className="font-body text-sm leading-relaxed mb-5" style={{ color: '#8A97A8' }}>
                  {audience.description}
                </p>

                {/* Examples */}
                <div className="flex flex-wrap gap-2">
                  {audience.examples.map((ex) => (
                    <span
                      key={ex}
                      className="font-body text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: '#8A97A8',
                      }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* No requirements box */}
        <div
          className="max-w-4xl mx-auto rounded-2xl p-8 md:p-10"
          style={{
            background: 'rgba(12, 21, 36, 0.8)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="text-center mb-8">
            <h3 className="font-heading font-semibold text-soft-white text-xl md:text-2xl">
              You do not need any of these to start
            </h3>
            <p className="font-body text-sm mt-2" style={{ color: '#8A97A8' }}>
              If you use a computer for work, you have everything you need.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {nots.map((item) => (
              <div key={item} className="flex items-center gap-2.5 font-body text-sm" style={{ color: '#8A97A8' }}>
                <CheckCircle size={15} style={{ color: '#5B9CF8', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
