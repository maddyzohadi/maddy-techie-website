import { Briefcase, Palette, Store, CheckCircle } from 'lucide-react'

const audiences = [
  {
    icon: Briefcase,
    number: '01',
    title: 'Non-Technical Professionals',
    description:
      'Admin, marketing, operations, HR, project coordinators, remote workers, and knowledge workers who want practical AI skills without needing to code.',
    examples: ['Marketing managers', 'Operations leads', 'HR professionals', 'Project coordinators'],
    accent: 'electric',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Creators',
    description:
      'YouTube creators, newsletter writers, and digital product sellers who want faster, smarter content workflows without spending all day on production.',
    examples: ['YouTube creators', 'Newsletter writers', 'Digital product sellers', 'Course creators'],
    accent: 'coral',
  },
  {
    icon: Store,
    number: '03',
    title: 'Small Business Owners',
    description:
      'Owners who need simple, reliable systems for leads, follow-ups, bookings, customer replies, content, and reports — without hiring a developer.',
    examples: ['Service business owners', 'Consultants & coaches', 'Freelancers', 'Agency owners'],
    accent: 'electric',
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
    <section className="py-24 md:py-32 bg-navy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-xs text-electric font-semibold uppercase tracking-widest mb-4">
            Built for you
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5">
            Who this training is for
          </h2>
          <p className="font-body text-cool-gray text-lg max-w-2xl mx-auto leading-relaxed">
            This training was built for people who work hard and want to work
            smarter — not for engineers or data scientists.
          </p>
        </div>

        {/* Audience cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {audiences.map((audience) => {
            const Icon = audience.icon
            const isElectric = audience.accent === 'electric'
            return (
              <div key={audience.title} className="card-gradient-border p-7 md:p-8">
                {/* Number + icon */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white flex-shrink-0 ${
                      isElectric ? 'bg-electric' : 'bg-coral'
                    }`}
                  >
                    {audience.number}
                  </span>
                  <div
                    className={`p-2 rounded-lg ${
                      isElectric ? 'bg-electric/10 border border-electric/20' : 'bg-coral/10 border border-coral/20'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isElectric ? 'text-electric' : 'text-coral'}
                    />
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-soft-white text-lg md:text-xl mb-3">
                  {audience.title}
                </h3>
                <p className="font-body text-cool-gray text-sm leading-relaxed mb-5">
                  {audience.description}
                </p>

                {/* Examples */}
                <div className="flex flex-wrap gap-2">
                  {audience.examples.map((ex) => (
                    <span
                      key={ex}
                      className="font-body text-xs text-cool-gray bg-white/5 border border-white/5 px-2.5 py-1 rounded-full"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* You don't need section */}
        <div className="max-w-4xl mx-auto bg-slate/60 border border-white/5 rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h3 className="font-heading font-semibold text-soft-white text-xl md:text-2xl">
              You do not need any of these to start
            </h3>
            <p className="font-body text-cool-gray text-sm mt-2">
              If you use a computer for work, you have everything you need.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {nots.map((item) => (
              <div key={item} className="flex items-center gap-2.5 font-body text-sm text-cool-gray">
                <CheckCircle size={15} className="text-electric flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
