'use client'

import { Zap, MessageSquare, LayoutGrid, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { motion } from 'motion/react'

export default function ServicesSection() {
  const t = useTranslations('services')
  const locale = useLocale()
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
      style={{ background: '#EFE7DC', borderTop: '0.5px solid #D8C7B8' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span
            className={`inline-flex items-center ${isFa ? 'font-fa' : 'font-ui'} text-xs font-semibold uppercase tracking-[0.14em] mb-4 bg-brand-babyblue text-brand-text px-3 py-1.5 rounded-full`}
          >
            {t('badge')}
          </span>
          <h2
            className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight`}
            style={{ color: '#111111', ...(isFa ? {} : { letterSpacing: '-.02em' }) }}
          >
            {t('title')}
          </h2>
          <p
            className={`${isFa ? 'font-fa' : 'font-ui'} text-lg md:text-xl max-w-2xl mx-auto leading-relaxed`}
            style={{ color: '#5A504A' }}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.titleKey}
                style={{
                  background: '#F5ECE0',
                  border: '0.5px solid #D8C7B8',
                  borderRadius: '16px',
                  padding: '28px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(75,146,219,0.06)',
                    border: '0.5px solid rgba(75,146,219,0.15)',
                  }}
                >
                  <Icon size={22} style={{ color: '#4B92DB' }} />
                </div>
                <h3
                  className={`${isFa ? 'font-fa' : 'font-en'} font-semibold text-xl md:text-2xl mb-3 leading-snug`}
                  style={{ color: '#111111' }}
                >
                  {t(service.titleKey)}
                </h3>
                <p
                  className={`${isFa ? 'font-fa' : 'font-ui'} text-base md:text-lg leading-relaxed flex-1`}
                  style={{ color: '#5A504A' }}
                >
                  {t(service.descKey)}
                </p>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className={`${isFa ? 'font-fa' : 'font-ui'} inline-flex items-center gap-2.5 font-semibold text-base px-9 py-4 rounded-full text-white no-underline bg-brand-blue hover:bg-brand-blue-dark transition-colors duration-150`}
          >
            {t('cta')}
            <ArrowRight size={16} className={isFa ? 'rotate-180' : ''} />
          </Link>
        </div>

      </div>
    </section>
  )
}
