import { Mail, LayoutGrid, BookOpen, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

const BLUE   = { text: '#272625', bg: 'rgba(177,177,175,0.08)',   border: 'rgba(177,177,175,0.18)'   }
const VIOLET = { text: '#272625', bg: 'rgba(177,177,175,0.07)',   border: 'rgba(177,177,175,0.15)'   }

const TEMPLATES = [
  { icon: Mail,        badgeKey: 't0badge' as const, titleKey: 't0title' as const, descKey: 't0desc' as const, ctaKey: 't0cta' as const, accent: BLUE   },
  { icon: LayoutGrid,  badgeKey: 't1badge' as const, titleKey: 't1title' as const, descKey: 't1desc' as const, ctaKey: 't1cta' as const, accent: VIOLET },
  { icon: BookOpen,    badgeKey: 't2badge' as const, titleKey: 't2title' as const, descKey: 't2desc' as const, ctaKey: 't2cta' as const, accent: BLUE   },
] as const

export default async function HomepageTemplatesSection() {
  const t = await getTranslations('homepageTemplates')

  return (
    <section className="py-24 md:py-32 relative" style={{ background: '#f4f3ef' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(177,177,175,0.04) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 50% 40% at 75% 60%, rgba(177,177,175,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span
            className="inline-block font-body text-sm md:text-base font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: '#272625' }}
          >
            {t('badge')}
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight" style={{ color: '#272625' }}>
            {t('title')}
          </h2>
          <p
            className="font-body text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
            style={{ color: '#6d6c6b' }}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon
            const a = tmpl.accent
            return (
              <div key={tmpl.titleKey} className="card-gradient-border p-7 md:p-8 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: a.bg, border: `1px solid ${a.border}` }}
                  >
                    <Icon size={20} style={{ color: a.text }} />
                  </div>
                  <span
                    className="font-body text-xs font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
                    style={{ background: a.bg, border: `1px solid ${a.border}`, color: a.text }}
                  >
                    {t(tmpl.badgeKey)}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-xl md:text-2xl mb-2 leading-snug" style={{ color: '#272625' }}>
                    {t(tmpl.titleKey)}
                  </h3>
                  <p
                    className="font-body text-base leading-relaxed"
                    style={{ color: '#6d6c6b' }}
                  >
                    {t(tmpl.descKey)}
                  </p>
                </div>

                <Link
                  href="/templates"
                  className="inline-flex items-center gap-1.5 font-body font-semibold text-sm transition-opacity duration-200 hover:opacity-75 self-start"
                  style={{ color: a.text }}
                >
                  {t(tmpl.ctaKey)}
                  <ArrowRight size={13} />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/templates"
            className="btn-primary inline-flex items-center gap-2.5 font-body font-semibold text-base px-9 py-4 rounded-full"
          >
            {t('allCta')}
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  )
}
