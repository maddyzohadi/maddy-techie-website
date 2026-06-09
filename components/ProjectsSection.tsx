import { Mail, FileText, Users, BarChart2, LayoutDashboard, BookOpen, ArrowRight } from 'lucide-react'

const projects = [
  {
    icon: Mail,
    title: 'AI Email Assistant Workflow',
    description:
      'Connect your inbox to an AI that reads, categorises, and drafts replies to common messages. Spend minutes, not hours, in your email.',
    tag: 'Beginner-friendly',
    tagColor: 'text-electric',
    tagBg: 'bg-electric/10',
  },
  {
    icon: LayoutDashboard,
    title: 'Content Planning System',
    description:
      'Turn a simple idea list into a structured content calendar. AI suggests topics, angles, and post formats based on your audience.',
    tag: 'Great for creators',
    tagColor: 'text-coral',
    tagBg: 'bg-coral/10',
  },
  {
    icon: Users,
    title: 'Lead Follow-Up Automation',
    description:
      'When someone fills out a form or books a call, the system logs the lead, sends a personalised follow-up, and reminds your team.',
    tag: 'For business owners',
    tagColor: 'text-coral',
    tagBg: 'bg-coral/10',
  },
  {
    icon: BarChart2,
    title: 'Report Generator',
    description:
      'Pull data from a spreadsheet, pass it to AI, and generate a clean written summary or weekly report — automatically, on schedule.',
    tag: 'High-value workflow',
    tagColor: 'text-electric',
    tagBg: 'bg-electric/10',
  },
  {
    icon: LayoutDashboard,
    title: 'AI Workflow Dashboard',
    description:
      'A central view of all your active automations and AI tasks. Track what\'s running, what\'s completed, and what needs your attention.',
    tag: 'Advanced project',
    tagColor: 'text-electric',
    tagBg: 'bg-electric/10',
  },
  {
    icon: BookOpen,
    title: 'Document Summary Workflow',
    description:
      'Upload a PDF, contract, or long document. AI extracts the key points, action items, and a plain-English summary in seconds.',
    tag: 'Time saver',
    tagColor: 'text-coral',
    tagBg: 'bg-coral/10',
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-slate/20 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-xs text-coral font-semibold uppercase tracking-widest mb-4">
            Project-based learning
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5">
            Learn by building
            <br />
            <span className="gradient-text-coral">real workflows</span>
          </h2>
          <p className="font-body text-cool-gray text-lg max-w-2xl mx-auto leading-relaxed">
            This is not just educational theory. Every module ends with a real
            workflow you can use in your actual work — starting on day one.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <div
                key={project.title}
                className="card-gradient-border p-6 md:p-7 group hover:scale-[1.02] transition-transform duration-200 flex flex-col"
              >
                {/* Tag */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`inline-flex items-center font-body text-xs font-semibold px-3 py-1 rounded-full ${project.tagBg} ${project.tagColor}`}
                  >
                    {project.tag}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                    <Icon size={18} className="text-cool-gray" />
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-soft-white text-base md:text-lg leading-snug mb-3">
                  {project.title}
                </h3>
                <p className="font-body text-cool-gray text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-1.5 font-body text-xs text-electric group-hover:gap-2.5 transition-all duration-200">
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
            className="btn-glow inline-flex items-center gap-2 bg-electric hover:bg-blue-600 text-white font-body font-semibold text-base px-8 py-4 rounded-full transition-all duration-200"
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
