import { getTranslations } from 'next-intl/server'
import { ArrowRight, Zap, MessageSquare, PenLine, LayoutGrid } from 'lucide-react'
import ServiceInquiryForm from '@/components/ServiceInquiryForm'

const SERVICES = [
  { icon: Zap,           titleKey: 'svc1title' as const, descKey: 'svc1desc' as const, ctaKey: 'svc1cta' as const },
  { icon: MessageSquare, titleKey: 'svc2title' as const, descKey: 'svc2desc' as const, ctaKey: 'svc2cta' as const },
  { icon: PenLine,       titleKey: 'svc3title' as const, descKey: 'svc3desc' as const, ctaKey: 'svc3cta' as const },
  { icon: LayoutGrid,    titleKey: 'svc4title' as const, descKey: 'svc4desc' as const, ctaKey: 'svc4cta' as const },
] as const

export default async function ServicesPageContentFa() {
  const t = await getTranslations('servicesPageFa')

  return (
    <>
      {/* Hero */}
      <section
        className="pt-20 pb-8 md:pt-28 md:pb-10 relative overflow-hidden"
        style={{ background: '#F5ECE0' }}
        dir="rtl"
      >
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <span
            className="inline-flex items-center font-ui text-xs font-semibold uppercase tracking-[0.14em] mb-5 bg-brand-babyblue text-brand-text px-3 py-1.5 rounded-full"
          >
            {t('heroBadge')}
          </span>
          <h1
            className="font-fa font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
            style={{ color: '#111111' }}
          >
            {t('heroTitle')}
          </h1>
          <p
            className="font-fa text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: '#5A504A' }}
          >
            {t('heroSubtitle')}
          </p>
          <a
            href="#contact-form"
            className="font-fa inline-flex items-center gap-2.5 font-medium text-base px-9 py-4 rounded-full text-white no-underline bg-brand-blue hover:bg-brand-blue-dark transition-colors duration-150"
          >
            {t('heroCta')}
            <ArrowRight size={16} className="rotate-180" />
          </a>
        </div>
      </section>

      {/* Service Cards */}
      <section
        className="pt-8 pb-20 md:pt-10 md:pb-24 relative"
        style={{ background: '#F5ECE0', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
        dir="rtl"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((svc) => {
              const Icon = svc.icon
              return (
                <div
                  key={svc.titleKey}
                  style={{
                    background: '#EFE7DC',
                    border: '0.5px solid #D8C7B8',
                    borderRadius: '16px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(75,146,219,0.08)',
                      border: '0.5px solid rgba(75,146,219,0.20)',
                    }}
                  >
                    <Icon size={20} style={{ color: '#4B92DB' }} />
                  </div>
                  <div>
                    <h2 className="font-fa font-semibold text-xl mb-2 leading-snug" style={{ color: '#111111' }}>
                      {t(svc.titleKey)}
                    </h2>
                    <p className="font-fa text-sm leading-relaxed" style={{ color: '#5A504A' }}>
                      {t(svc.descKey)}
                    </p>
                  </div>
                  <a
                    href="#contact-form"
                    className="mt-auto inline-flex items-center gap-1.5 font-fa font-semibold text-sm transition-opacity duration-200 hover:opacity-75 self-start"
                    style={{ color: '#4B92DB' }}
                  >
                    <ArrowRight size={13} className="rotate-180" />
                    {t(svc.ctaKey)}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contact-form"
        className="py-20 md:py-24 relative"
        style={{ background: '#F5ECE0', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
        dir="rtl"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-flex items-center font-ui text-xs font-semibold uppercase tracking-[0.14em] mb-4 bg-brand-babyblue text-brand-text px-3 py-1.5 rounded-full"
            >
              {t('formBadge')}
            </span>
            <h2
              className="font-fa font-bold text-3xl md:text-4xl leading-tight mb-4"
              style={{ color: '#111111' }}
            >
              {t('formTitle')}
            </h2>
            {t('formSubtitle') && (
              <p className="font-fa text-base leading-relaxed" style={{ color: '#5A504A' }}>
                {t('formSubtitle')}
              </p>
            )}
          </div>
          <ServiceInquiryForm />
        </div>
      </section>
    </>
  )
}
