import { Download, FileText, Workflow, CheckSquare, BookOpen, Lightbulb, ArrowRight } from 'lucide-react'

const resources = [
  {
    icon: Download,
    title: 'Free AI Starter Kit',
    description:
      'A curated pack of beginner-friendly prompts, tool recommendations, and a step-by-step checklist to start using AI in your work this week.',
    badge: 'Free',
    badgeColor: 'text-electric',
    badgeBg: 'bg-electric/10',
    featured: true,
  },
  {
    icon: Lightbulb,
    title: 'Prompt Templates',
    description:
      'Ready-to-use prompts for emails, reports, meeting summaries, content ideas, research, and more. Copy, paste, and customise.',
    badge: 'Templates',
    badgeColor: 'text-coral',
    badgeBg: 'bg-coral/10',
    featured: false,
  },
  {
    icon: Workflow,
    title: 'Workflow Templates',
    description:
      'Pre-built workflow blueprints for the most common automation setups. Import directly into Make or Zapier and customise for your needs.',
    badge: 'Templates',
    badgeColor: 'text-coral',
    badgeBg: 'bg-coral/10',
    featured: false,
  },
  {
    icon: CheckSquare,
    title: 'Automation Checklists',
    description:
      'Simple checklists to help you plan, test, and launch your first automations without skipping important steps.',
    badge: 'Guides',
    badgeColor: 'text-electric',
    badgeBg: 'bg-electric/10',
    featured: false,
  },
  {
    icon: BookOpen,
    title: 'Mini Guides',
    description:
      'Short, focused guides covering specific tools and topics: Getting started with Make, Understanding AI agents, Writing effective prompts, and more.',
    badge: 'Guides',
    badgeColor: 'text-electric',
    badgeBg: 'bg-electric/10',
    featured: false,
  },
  {
    icon: FileText,
    title: 'AI Tool Comparison',
    description:
      'A plain-English breakdown of the top AI and automation tools — what each does, when to use it, and which ones are worth your time.',
    badge: 'Coming soon',
    badgeColor: 'text-cool-gray',
    badgeBg: 'bg-white/5',
    featured: false,
  },
]

export default function ResourcesSection() {
  return (
    <section id="templates" className="py-24 md:py-32 bg-slate/20 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-xs text-coral font-semibold uppercase tracking-widest mb-4">
            Resources
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5">
            Free templates &amp; tools
          </h2>
          <p className="font-body text-cool-gray text-lg max-w-2xl mx-auto leading-relaxed">
            Start before the full training. Practical resources you can use right
            now to begin saving time and building better workflows.
          </p>
        </div>

        {/* Resource cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <div
                key={resource.title}
                className={`card-gradient-border p-6 md:p-7 flex flex-col group hover:scale-[1.02] transition-transform duration-200 ${
                  resource.featured ? 'ring-1 ring-electric/30' : ''
                }`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Icon size={20} className="text-cool-gray" />
                  </div>
                  <span
                    className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full ${resource.badgeBg} ${resource.badgeColor}`}
                  >
                    {resource.badge}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-soft-white text-base md:text-lg mb-3 leading-snug">
                  {resource.title}
                </h3>
                <p className="font-body text-cool-gray text-sm leading-relaxed flex-1">
                  {resource.description}
                </p>

                <button className="mt-5 pt-4 border-t border-white/5 flex items-center gap-1.5 font-body text-xs text-electric group-hover:gap-3 transition-all duration-200 w-full text-left">
                  <span>{resource.featured ? 'Get free starter kit' : 'Coming soon'}</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 max-w-xl mx-auto">
          <div className="bg-electric/10 border border-electric/20 rounded-2xl p-7 text-center">
            <h3 className="font-heading font-semibold text-soft-white text-lg mb-2">
              Get the Free Starter Kit
            </h3>
            <p className="font-body text-cool-gray text-sm mb-5 leading-relaxed">
              Prompts, templates, and a beginner checklist — everything you need
              to start this week, free.
            </p>
            <a
              href="#contact"
              className="btn-glow inline-flex items-center gap-2 bg-electric hover:bg-blue-600 text-white font-body font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200"
            >
              Get Starter Kit
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
