import { Mail, LayoutDashboard, FileText, BookOpen, Users } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function ProjectsSection() {
  const t = await getTranslations('projects')

  const projects = [
    {
      icon: Mail,
      titleKey: 'proj0title',
      descKey:  'proj0desc',
      tagKey:   'proj0tag',
      accent: { text: '#6B9FFF', bg: 'rgba(107,159,255,0.12)', border: 'rgba(107,159,255,0.22)' },
    },
    {
      icon: LayoutDashboard,
      titleKey: 'proj1title',
      descKey:  'proj1desc',
      tagKey:   'proj1tag',
      accent: { text: '#A78BFA', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.22)' },
    },
    {
      icon: FileText,
      titleKey: 'proj2title',
      descKey:  'proj2desc',
      tagKey:   'proj2tag',
      accent: { text: '#6B9FFF', bg: 'rgba(107,159,255,0.12)', border: 'rgba(107,159,255,0.22)' },
    },
    {
      icon: BookOpen,
      titleKey: 'proj3title',
      descKey:  'proj3desc',
      tagKey:   'proj3tag',
      accent: { text: '#A78BFA', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.22)' },
    },
    {
      icon: Users,
      titleKey: 'proj4title',
      descKey:  'proj4desc',
      tagKey:   'proj4tag',
      accent: { text: '#6B9FFF', bg: 'rgba(107,159,255,0.12)', border: 'rgba(107,159,255,0.22)' },
    },
  ] as const

  return (
    <section id="projects" className="py-24 md:py-32 relative scroll-mt-24" style={{ background: '#060B14' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 75% 60%, rgba(167,139,250,0.05) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 45% 40% at 20% 30%, rgba(107,159,255,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="inline-block font-body text-sm md:text-base font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: '#6B9FFF' }}
          >
            {t('badge')}
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5 leading-tight">
            {t('title')}{' '}
            <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p
            className="font-body text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Project cards — 3-col grid, 5 cards (3 + 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {projects.map((project) => {
            const Icon = project.icon
            const a = project.accent
            return (
              <div
                key={project.titleKey}
                className="card-gradient-border p-6 md:p-7 flex flex-col group"
              >
                {/* Icon + tool tag row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: a.bg, border: `1px solid ${a.border}` }}
                  >
                    <Icon size={18} style={{ color: a.text }} />
                  </div>
                  <span
                    className="font-body text-[11px] font-medium px-2.5 py-1 rounded-full leading-none mt-1"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {t(project.tagKey)}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-heading font-semibold text-soft-white text-xl md:text-2xl leading-snug mb-2.5"
                >
                  {t(project.titleKey)}
                </h3>

                {/* Description */}
                <p
                  className="font-body text-base md:text-lg leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {t(project.descKey)}
                </p>

                {/* Subtle hover accent line */}
                <div
                  className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${a.text}50, transparent)` }}
                />
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#training"
            className="btn-primary inline-flex items-center gap-2.5 font-body font-semibold text-base px-9 py-4 rounded-full cursor-pointer"
          >
            {t('seeFull')}
          </a>
        </div>

      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
