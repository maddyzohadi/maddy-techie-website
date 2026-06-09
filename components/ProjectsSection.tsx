import { Mail, FileText, Users, BarChart2, LayoutDashboard, BookOpen, ArrowRight } from 'lucide-react'

const projects = [
  {
    icon: Mail,
    title: 'AI Email Assistant Workflow',
    description:
      'Connect your inbox to an AI that reads, categorises, and drafts replies to common messages. Spend minutes, not hours, in your email.',
    tag: 'Beginner-friendly',
    accent: { text: '#5B9CF8', bg: 'rgba(91,156,248,0.10)', border: 'rgba(91,156,248,0.18)' },
  },
  {
    icon: LayoutDashboard,
    title: 'Content Planning System',
    description:
      'Turn a simple idea list into a structured content calendar. AI suggests topics, angles, and post formats based on your audience.',
    tag: 'Great for creators',
    accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.10)', border: 'rgba(255,117,85,0.18)' },
  },
  {
    icon: Users,
    title: 'Lead Follow-Up Automation',
    description:
      'When someone fills out a form or books a call, the system logs the lead, sends a personalised follow-up, and reminds your team.',
    tag: 'For business owners',
    accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.10)', border: 'rgba(255,117,85,0.18)' },
  },
  {
    icon: BarChart2,
    title: 'Report Generator',
    description:
      'Pull data from a spreadsheet, pass it to AI, and generate a clean written summary or weekly report — automatically, on schedule.',
    tag: 'High-value workflow',
    accent: { text: '#5B9CF8', bg: 'rgba(91,156,248,0.10)', border: 'rgba(91,156,248,0.18)' },
  },
  {
    icon: LayoutDashboard,
    title: 'AI Workflow Dashboard',
    description:
      "A central view of all your active automations and AI tasks. Track what's running, what's completed, and what needs your attention.",
    tag: 'Advanced project',
    accent: { text: '#8B5CF6', bg: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.18)' },
  },
  {
    icon: BookOpen,
    title: 'Document Summary Workflow',
    description:
      'Upload a PDF, contract, or long document. AI extracts the key points, action items, and a plain-English summary in seconds.',
    tag: 'Time saver',
    accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.10)', border: 'rgba(255,117,85,0.18)' },
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32 relative" style={{ background: '#060B14' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 60%, rgba(255,117,85,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block font-body text-[11px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#FF7555' }}
          >
            Project-based learning
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5 leading-tight">
            Learn by building{' '}
            <br />
            <span className="gradient-text-coral">real workflows</span>
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#8A97A8' }}>
            This is not just educational theory. Every module ends with a real
            workflow you can use in your actual work — starting on day one.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => {
            const Icon = project.icon
            const a = project.accent
            return (
              <div
                key={project.title}
                className="card-gradient-border p-6 md:p-7 group flex flex-col"
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="inline-flex items-center font-body text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: a.bg, border: `1px solid ${a.border}`, color: a.text }}
                  >
                    {project.tag}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <Icon size={18} style={{ color: '#6A7A8E' }} />
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-soft-white text-base md:text-lg leading-snug mb-3">
                  {project.title}
                </h3>
                <p className="font-body text-sm leading-relaxed flex-1" style={{ color: '#8A97A8' }}>
                  {project.description}
                </p>

                {/* Bottom link */}
                <div
                  className="mt-5 pt-4 flex items-center gap-2 font-body text-xs transition-all duration-200 group-hover:gap-3"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: a.text }}
                >
                  <span>Included in training</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#training"
            className="btn-primary inline-flex items-center gap-2.5 font-body font-semibold text-base px-9 py-4 rounded-full cursor-pointer"
          >
            See full training
            <ArrowRight size={18} />
          </a>
        </div>

      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
