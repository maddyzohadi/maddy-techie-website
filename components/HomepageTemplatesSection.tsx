import { Mail, LayoutGrid, BookOpen, ArrowRight } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

const TEMPLATES = [
  { icon: Mail,       badgeKey: 't0badge' as const, titleKey: 't0title' as const, descKey: 't0desc' as const, ctaKey: 't0cta' as const },
  { icon: LayoutGrid, badgeKey: 't1badge' as const, titleKey: 't1title' as const, descKey: 't1desc' as const, ctaKey: 't1cta' as const },
  { icon: BookOpen,   badgeKey: 't2badge' as const, titleKey: 't2title' as const, descKey: 't2desc' as const, ctaKey: 't2cta' as const },
] as const

export default async function HomepageTemplatesSection() {
  const t = await getTranslations('homepageTemplates')
  const locale = await getLocale()
  const isFa = locale === 'fa'

  return (
    <section
      className="py-24 md:py-32 relative"
      style={{ background: '#F5ECE0', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span
            className="inline-flex items-center font-ui text-xs font-semibold uppercase tracking-[0.14em] mb-4 bg-brand-peach text-brand-charcoal px-3 py-1.5 rounded-full"
          >
            {t('badge')}
          </span>
          <h2
            className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight`}
            style={{ color: '#111111', letterSpacing: '-.02em' }}
          >
            {t('title')}
          </h2>
          <p
            className={`${isFa ? 'font-fa' : 'font-ui'} text-lg md:text-xl max-w-xl mx-auto leading-relaxed`}
            style={{ color: '#5A504A' }}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon
            return (
              <div
                key={tmpl.titleKey}
                style={{
                  background: '#EFE7DC',
                  border: '0.5px solid #D8C7B8',
                  borderRadius: '12px',
                  padding: '28px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(181,51,137,0.08)',
                      border: '0.5px solid rgba(181,51,137,0.20)',
                    }}
                  >
                    <Icon size={20} style={{ color: '#B53389' }} />
                  </div>
                  <span
                    className="font-ui text-xs font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-md bg-brand-peach text-brand-charcoal"
                  >
                    {t(tmpl.badgeKey)}
                  </span>
                </div>

                <div className="flex-1">
                  <h3
                    className={`${isFa ? 'font-fa' : 'font-en'} font-semibold text-xl md:text-2xl mb-2 leading-snug`}
                    style={{ color: '#111111' }}
                  >
                    {t(tmpl.titleKey)}
                  </h3>
                  <p
                    className={`${isFa ? 'font-fa' : 'font-ui'} text-base leading-relaxed`}
                    style={{ color: '#5A504A' }}
                  >
                    {t(tmpl.descKey)}
                  </p>
                </div>

                <Link
                  href="/templates"
                  className={`${isFa ? 'font-fa' : 'font-ui'} inline-flex items-center gap-1.5 font-semibold text-sm transition-opacity duration-200 hover:opacity-75 self-start`}
                  style={{ color: '#B53389', textDecoration: 'none' }}
                >
                  {t(tmpl.ctaKey)}
                  <ArrowRight size={13} className={isFa ? 'rotate-180' : ''} />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/templates"
            className={`${isFa ? 'font-fa' : 'font-ui'} inline-flex items-center gap-2.5 font-semibold text-base px-9 py-4 rounded-full text-white no-underline bg-brand-orange hover:bg-brand-coral transition-colors duration-150`}
          >
            {t('allCta')}
            <ArrowRight size={16} className={isFa ? 'rotate-180' : ''} />
          </Link>
        </div>

      </div>
    </section>
  )
}
