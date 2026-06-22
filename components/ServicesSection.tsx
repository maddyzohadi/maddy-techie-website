import { Zap, MessageSquare, LayoutGrid, ArrowRight } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function ServicesSection() {
  const t = await getTranslations('services')
  const locale = await getLocale()
  const isFa = locale === 'fa'

  const services = [
    { icon: Zap,           titleKey: 'svc0title', descKey: 'svc0desc' },
    { icon: MessageSquare, titleKey: 'svc1title', descKey: 'svc1desc' },
    { icon: LayoutGrid,    titleKey: 'svc2title', descKey: 'svc2desc' },
  ] as const

  return (
    <section
      id="services"
      className="py-24 md:py-32 relative scroll-mt-24"
      style={{ background: '#F5F0E8', borderTop: '0.5px solid rgba(123,47,190,0.15)' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span
            className="inline-block font-ui text-sm md:text-base font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: 'rgba(26,26,46,0.50)' }}
          >
            {t('badge')}
          </span>
          <h2
            className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight`}
            style={{ color: '#1A1A2E', letterSpacing: '-.02em' }}
          >
            {t('title')}
          </h2>
          <p
            className={`${isFa ? 'font-fa' : 'font-ui'} text-lg md:text-xl max-w-2xl mx-auto leading-relaxed`}
            style={{ color: 'rgba(26,26,46,0.60)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.titleKey}
                style={{
                  background: '#FFFFFF',
                  border: '0.5px solid rgba(26,26,46,0.12)',
                  borderRadius: '12px',
                  padding: '28px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(123,47,190,0.12)',
                    border: '0.5px solid rgba(123,47,190,0.30)',
                  }}
                >
                  <Icon size={22} style={{ color: '#1A1A2E' }} />
                </div>
                <h3
                  className={`${isFa ? 'font-fa' : 'font-en'} font-semibold text-xl md:text-2xl mb-3 leading-snug`}
                  style={{ color: '#1A1A2E' }}
                >
                  {t(service.titleKey)}
                </h3>
                <p
                  className={`${isFa ? 'font-fa' : 'font-ui'} text-base md:text-lg leading-relaxed flex-1`}
                  style={{ color: 'rgba(26,26,46,0.60)' }}
                >
                  {t(service.descKey)}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className={`${isFa ? 'font-fa' : 'font-ui'} inline-flex items-center gap-2.5 font-semibold text-base px-9 py-4`}
            style={{
              background: '#7B2FBE',
              color: '#ffffff',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            {t('cta')}
            <ArrowRight size={16} className={isFa ? 'rotate-180' : ''} />
          </Link>
        </div>

      </div>
    </section>
  )
}
