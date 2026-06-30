'use client'

import { Zap, MessageSquare, LayoutGrid, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { motion } from 'motion/react'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

const FA_SERVICES = [
  {
    num: '۱',
    title: 'شناسایی کارهای قابل ساده‌سازی',
    desc: 'می‌بینیم کدام کارها وقتت را می‌گیرند و هوش مصنوعی کجا واقعاً می‌تواند کمک کند.',
  },
  {
    num: '۲',
    title: 'سیستم پرامپت اختصاصی',
    desc: 'پرامپت‌های قابل استفاده دوباره برای ایمیل، گزارش، محتوا، تحقیق و برنامه‌ریزی آماده می‌کنیم.',
  },
  {
    num: '۳',
    title: 'قالب‌ها و گردش‌کارهای ساده',
    desc: 'trackerها، فایل‌های Google Sheets و روندهای کاری سبک می‌سازیم که بتوانی واقعاً استفاده کنی.',
  },
]

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: 'easeOut' },
} as const

export default function ServicesSection() {
  const t = useTranslations('services')
  const locale = useLocale()
  const isFa = locale === 'fa'

  if (isFa) {
    return (
      <section
        id="services"
        dir="rtl"
        style={{
          background: '#EFE7DC',
          borderTop: '0.5px solid #D8C7B8',
          padding: '64px 24px',
          scrollMarginTop: '96px',
        }}
      >
        <motion.div style={{ maxWidth: '640px', margin: '0 auto' }} {...fadeIn}>
          {/* Header */}
          <div style={{ marginBottom: '36px' }}>
            <p
              style={{
                fontFamily: vaFont,
                fontSize: '11px',
                fontWeight: 600,
                color: '#C08064',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              خدمات
            </p>
            <h2
              style={{
                fontFamily: vaFont,
                fontSize: 'clamp(17px, 2.4vw, 22px)',
                fontWeight: 700,
                color: '#111111',
                lineHeight: 1.6,
                marginBottom: '12px',
              }}
            >
              کارهای تکراری را به یک سیستم ساده تبدیل کن
            </h2>
            <p
              style={{
                fontFamily: vaFont,
                fontSize: '14px',
                color: '#5A504A',
                lineHeight: 1.9,
                maxWidth: '520px',
              }}
            >
              اگر ایمیل‌ها، گزارش‌ها، برنامه‌ریزی یا فایل‌هایت پراکنده‌اند، با کمک هوش مصنوعی یک روند کاری سبک و قابل استفاده می‌سازیم.
            </p>
          </div>

          {/* Service list */}
          <ul style={{ listStyle: 'none', margin: '0 0 32px', padding: 0 }}>
            {FA_SERVICES.map((svc, i) => (
              <li
                key={svc.num}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '20px 0',
                  borderBottom:
                    i < FA_SERVICES.length - 1 ? '0.5px solid #D8C7B8' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: vaFont,
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#C08064',
                    flexShrink: 0,
                    width: '20px',
                    textAlign: 'center',
                    marginTop: '3px',
                  }}
                >
                  {svc.num}
                </span>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: vaFont,
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#111111',
                      lineHeight: 1.5,
                      marginBottom: '5px',
                    }}
                  >
                    {svc.title}
                  </p>
                  <p
                    style={{
                      fontFamily: vaFont,
                      fontSize: '13px',
                      color: '#5A504A',
                      lineHeight: 1.85,
                      margin: 0,
                    }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/services"
            style={{
              fontFamily: vaFont,
              fontSize: '14px',
              fontWeight: 600,
              color: '#FFFFFF',
              background: '#4B92DB',
              padding: '11px 24px',
              borderRadius: '100px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            مشاهده خدمات
            <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} />
          </Link>
        </motion.div>
      </section>
    )
  }

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
            className="inline-flex items-center font-ui text-xs font-semibold uppercase tracking-[0.14em] mb-4 bg-brand-babyblue text-brand-text px-3 py-1.5 rounded-full"
          >
            {t('badge')}
          </span>
          <h2
            className="font-en font-bold text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight"
            style={{ color: '#111111', letterSpacing: '-.02em' }}
          >
            {t('title')}
          </h2>
          <p
            className="font-ui text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
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
                  className="font-en font-semibold text-xl md:text-2xl mb-3 leading-snug"
                  style={{ color: '#111111' }}
                >
                  {t(service.titleKey)}
                </h3>
                <p
                  className="font-ui text-base md:text-lg leading-relaxed flex-1"
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
            className="font-ui inline-flex items-center gap-2.5 font-semibold text-base px-9 py-4 rounded-full text-white no-underline bg-brand-blue hover:bg-brand-blue-dark transition-colors duration-150"
          >
            {t('cta')}
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  )
}
