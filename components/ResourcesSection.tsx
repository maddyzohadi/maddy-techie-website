import { Download, FileText, Workflow, CheckSquare, BookOpen, Lightbulb, ArrowRight } from 'lucide-react'

const resources = [
  {
    icon: Download,
    title: 'Free AI Starter Kit',
    description:
      'A curated pack of beginner-friendly prompts, tool recommendations, and a step-by-step checklist to start using AI in your work this week.',
    badge: 'Free',
    accent: { text: '#5B9CF8', bg: 'rgba(91,156,248,0.10)', border: 'rgba(91,156,248,0.22)', ring: 'rgba(91,156,248,0.20)' },
    featured: true,
    cta: 'Get free starter kit',
  },
  {
    icon: Lightbulb,
    title: 'Prompt Templates',
    description:
      'Ready-to-use prompts for emails, reports, meeting summaries, content ideas, research, and more. Copy, paste, and customise.',
    badge: 'Templates',
    accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.10)', border: 'rgba(255,117,85,0.20)', ring: 'transparent' },
    featured: false,
    cta: 'Coming soon',
  },
  {
    icon: Workflow,
    title: 'Workflow Templates',
    description:
      'Pre-built workflow blueprints for the most common automation setups. Import directly into Make or Zapier and customise for your needs.',
    badge: 'Templates',
    accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.10)', border: 'rgba(255,117,85,0.20)', ring: 'transparent' },
    featured: false,
    cta: 'Coming soon',
  },
  {
    icon: CheckSquare,
    title: 'Automation Checklists',
    description:
      'Simple checklists to help you plan, test, and launch your first automations without skipping important steps.',
    badge: 'Guides',
    accent: { text: '#8B5CF6', bg: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.20)', ring: 'transparent' },
    featured: false,
    cta: 'Coming soon',
  },
  {
    icon: BookOpen,
    title: 'Mini Guides',
    description:
      'Short, focused guides covering specific tools and topics: Getting started with Make, Understanding AI agents, Writing effective prompts, and more.',
    badge: 'Guides',
    accent: { text: '#5B9CF8', bg: 'rgba(91,156,248,0.10)', border: 'rgba(91,156,248,0.20)', ring: 'transparent' },
    featured: false,
    cta: 'Coming soon',
  },
  {
    icon: FileText,
    title: 'AI Tool Comparison',
    description:
      'A plain-English breakdown of the top AI and automation tools — what each does, when to use it, and which ones are worth your time.',
    badge: 'Coming soon',
    accent: { text: '#6A7A8E', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)', ring: 'transparent' },
    featured: false,
    cta: 'Coming soon',
  },
]

export default function ResourcesSection() {
  return (
    <section id="templates" className="py-24 md:py-32 relative" style={{ background: '#060B14' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(91,156,248,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block font-body text-[11px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#FF7555' }}
          >
            Resources
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5 leading-tight">
            Free templates &amp; tools
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#8A97A8' }}>
            Start before the full training. Practical resources you can use right
            now to begin saving time and building better workflows.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((resource) => {
            const Icon = resource.icon
            const a = resource.accent
            return (
              <div
                key={resource.title}
                className="card-gradient-border p-6 md:p-7 flex flex-col group"
                style={resource.featured ? {
                  boxShadow: `0 0 28px ${a.ring}, 0 4px 24px rgba(0,0,0,0.3)`,
                  border: `1px solid ${a.border}`,
                } : {}}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <Icon size={20} style={{ color: '#6A7A8E' }} />
                  </div>
                  <span
                    className="font-body text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: a.bg, border: `1px solid ${a.border}`, color: a.text }}
                  >
                    {resource.badge}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-soft-white text-base md:text-lg mb-3 leading-snug">
                  {resource.title}
                </h3>
                <p className="font-body text-sm leading-relaxed flex-1" style={{ color: '#8A97A8' }}>
                  {resource.description}
                </p>

                <button
                  className="mt-5 pt-4 flex items-center gap-2 font-body text-xs transition-all duration-200 group-hover:gap-3 w-full text-left cursor-pointer"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: a.text }}
                >
                  <span>{resource.cta}</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 max-w-xl mx-auto">
          <div
            className="rounded-2xl p-7 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(91,156,248,0.10) 0%, rgba(139,92,246,0.07) 100%)',
              border: '1px solid rgba(91,156,248,0.18)',
            }}
          >
            <h3 className="font-heading font-semibold text-soft-white text-lg mb-2">
              Get the Free Starter Kit
            </h3>
            <p className="font-body text-sm mb-5 leading-relaxed" style={{ color: '#8A97A8' }}>
              Prompts, templates, and a beginner checklist — everything you need
              to start this week, free.
            </p>
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-full cursor-pointer"
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
