import { getTranslations, getLocale } from 'next-intl/server'
import { ArrowRight, Zap, MessageSquare, LayoutGrid, PenLine, CheckCircle } from 'lucide-react'
import ServiceInquiryForm from '@/components/ServiceInquiryForm'
import ServicesPageContentFa from '@/components/ServicesPageContentFa'

const SERVICES = [
  {
    icon: Zap,
    titleKey:   'svc1title' as const,
    descKey:    'svc1desc'  as const,
    bestForKey: 'svc1bestFor' as const,
    ctaKey:     'svc1cta'   as const,
    tools: ['ChatGPT', 'Claude', 'Google Sheets'],
  },
  {
    icon: MessageSquare,
    titleKey:   'svc2title' as const,
    descKey:    'svc2desc'  as const,
    bestForKey: 'svc2bestFor' as const,
    ctaKey:     'svc2cta'   as const,
    tools: ['ChatGPT', 'Claude'],
  },
  {
    icon: LayoutGrid,
    titleKey:   'svc3title' as const,
    descKey:    'svc3desc'  as const,
    bestForKey: 'svc3bestFor' as const,
    ctaKey:     'svc3cta'   as const,
    tools: ['Google Sheets', 'Make', 'Zapier'],
  },
  {
    icon: PenLine,
    titleKey:   'svc4title' as const,
    descKey:    'svc4desc'  as const,
    bestForKey: 'svc4bestFor' as const,
    ctaKey:     'svc4cta'   as const,
    tools: ['ChatGPT', 'Claude', 'Google Sheets'],
  },
] as const

const HOW_STEPS = [
  { numKey: 'step1num' as const, titleKey: 'step1title' as const, descKey: 'step1desc' as const },
  { numKey: 'step2num' as const, titleKey: 'step2title' as const, descKey: 'step2desc' as const },
  { numKey: 'step3num' as const, titleKey: 'step3title' as const, descKey: 'step3desc' as const },
  { numKey: 'step4num' as const, titleKey: 'step4title' as const, descKey: 'step4desc' as const },
] as const

const WHO_KEYS = ['who0', 'who1', 'who2', 'who3'] as const

export default async function ServicesPageContent() {
  const locale = await getLocale()
  if (locale === 'fa') return <ServicesPageContentFa />

  const t = await getTranslations('servicesPage')

  return (
    <>
      {/* Hero */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: '#F5ECE0' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span
            className="inline-flex items-center font-ui text-xs font-semibold uppercase tracking-[0.14em] mb-5 bg-brand-babyblue text-brand-text px-3 py-1.5 rounded-full"
          >
            {t('heroBadge')}
          </span>
          <h1
            className="font-en font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
            style={{ color: '#111111', letterSpacing: '-.025em' }}
          >
            {t('heroTitle')}
          </h1>
          <p
            className="font-ui text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: '#5A504A' }}
          >
            {t('heroSubtitle')}
          </p>
          <a
            href="#contact-form"
            className="font-ui inline-flex items-center gap-2.5 font-semibold text-base px-9 py-4 rounded-full text-white no-underline bg-brand-blue hover:bg-brand-blue-dark transition-colors duration-150"
          >
            {t('heroCta')}
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Service Cards */}
      <section
        className="py-20 md:py-24 relative"
        style={{ background: '#F5ECE0', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((svc) => {
              const Icon = svc.icon
              return (
                <div
                  key={svc.titleKey}
                  style={{
                    background: '#EFE7DC',
                    border: '0.5px solid #D8C7B8',
                    borderRadius: '16px',
                    padding: '28px 30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(75,146,219,0.08)', border: '0.5px solid rgba(75,146,219,0.20)' }}
                  >
                    <Icon size={20} style={{ color: '#4B92DB' }} />
                  </div>

                  <div>
                    <h2 className="font-en font-semibold text-xl md:text-2xl mb-2 leading-snug" style={{ color: '#111111' }}>
                      {t(svc.titleKey)}
                    </h2>
                    <p className="font-ui text-base leading-relaxed" style={{ color: '#5A504A' }}>
                      {t(svc.descKey)}
                    </p>
                  </div>

                  <div>
                    <span
                      className="font-ui text-xs font-semibold uppercase tracking-[0.14em] block mb-1"
                      style={{ color: '#8C7E74' }}
                    >
                      {t('bestForLabel')}
                    </span>
                    <p className="font-ui text-sm" style={{ color: '#5A504A' }}>
                      {t(svc.bestForKey)}
                    </p>
                  </div>

                  <div>
                    <span
                      className="font-ui text-xs font-semibold uppercase tracking-[0.14em] block mb-2"
                      style={{ color: '#8C7E74' }}
                    >
                      {t('toolsLabel')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {svc.tools.map((tool) => (
                        <span
                          key={tool}
                          className="font-ui text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: 'rgba(0,0,0,0.04)',
                            border: '0.5px solid rgba(0,0,0,0.08)',
                            color: '#8C7E74',
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#contact-form"
                    className="mt-auto inline-flex items-center gap-1.5 font-ui font-semibold text-sm transition-opacity duration-200 hover:opacity-75 self-start"
                    style={{ color: '#4B92DB' }}
                  >
                    {t(svc.ctaKey)}
                    <ArrowRight size={13} />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="py-20 md:py-24 relative overflow-hidden"
        style={{ background: '#F5ECE0', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span
              className="inline-flex items-center font-ui text-xs font-semibold uppercase tracking-[0.14em] mb-4 bg-brand-babyblue text-brand-text px-3 py-1.5 rounded-full"
            >
              {t('howBadge')}
            </span>
            <h2
              className="font-en font-bold text-3xl md:text-4xl leading-tight"
              style={{ color: '#111111', letterSpacing: '-.02em' }}
            >
              {t('howTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_STEPS.map((step) => (
              <div
                key={step.numKey}
                className="relative p-6 rounded-2xl"
                style={{
                  background: '#EFE7DC',
                  border: '0.5px solid #D8C7B8',
                }}
              >
                <div
                  className="font-en font-bold text-4xl mb-4 leading-none"
                  style={{ color: 'rgba(0,0,0,0.08)' }}
                >
                  {t(step.numKey)}
                </div>
                <h3 className="font-en font-semibold text-lg mb-2" style={{ color: '#111111' }}>
                  {t(step.titleKey)}
                </h3>
                <p className="font-ui text-sm leading-relaxed" style={{ color: '#5A504A' }}>
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section
        className="py-20 md:py-24 relative"
        style={{ background: '#F5ECE0', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-flex items-center font-ui text-xs font-semibold uppercase tracking-[0.14em] mb-4 bg-brand-babyblue text-brand-text px-3 py-1.5 rounded-full"
            >
              {t('whoBadge')}
            </span>
            <h2
              className="font-en font-bold text-3xl md:text-4xl leading-tight"
              style={{ color: '#111111', letterSpacing: '-.02em' }}
            >
              {t('whoTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHO_KEYS.map((key) => (
              <div
                key={key}
                className="flex items-start gap-3 p-5 rounded-xl"
                style={{
                  background: '#EFE7DC',
                  border: '0.5px solid #D8C7B8',
                }}
              >
                <CheckCircle
                  size={18}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: '#4B92DB' }}
                />
                <p className="font-ui text-sm leading-relaxed" style={{ color: '#5A504A' }}>
                  {t(key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section
        id="contact-form"
        className="py-20 md:py-24 relative"
        style={{ background: '#F5ECE0', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-flex items-center font-ui text-xs font-semibold uppercase tracking-[0.14em] mb-4 bg-brand-babyblue text-brand-text px-3 py-1.5 rounded-full"
            >
              {t('formBadge')}
            </span>
            <h2
              className="font-en font-bold text-3xl md:text-4xl leading-tight mb-4"
              style={{ color: '#111111', letterSpacing: '-.02em' }}
            >
              {t('formTitle')}
            </h2>
            <p className="font-ui text-base leading-relaxed" style={{ color: '#5A504A' }}>
              {t('formSubtitle')}
            </p>
          </div>
          <ServiceInquiryForm />
        </div>
      </section>

      {/* Start CTA */}
    </>
  )
}
