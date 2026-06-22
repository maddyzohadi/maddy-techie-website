import { getTranslations, getLocale } from 'next-intl/server'
import { ArrowRight, Zap, MessageSquare, LayoutGrid, PenLine, CheckCircle } from 'lucide-react'
import ServiceInquiryForm from '@/components/ServiceInquiryForm'
import ServicesPageContentFa from '@/components/ServicesPageContentFa'

const gradientText = {
  color: '#272625',
}

const SERVICES = [
  {
    icon: Zap,
    titleKey:   'svc1title' as const,
    descKey:    'svc1desc'  as const,
    bestForKey: 'svc1bestFor' as const,
    ctaKey:     'svc1cta'   as const,
    tools: ['ChatGPT', 'Claude', 'Google Sheets'],
    accent: { text: '#10054d', bg: 'rgba(226,221,253,0.30)', border: 'rgba(226,221,253,0.65)' },
  },
  {
    icon: MessageSquare,
    titleKey:   'svc2title' as const,
    descKey:    'svc2desc'  as const,
    bestForKey: 'svc2bestFor' as const,
    ctaKey:     'svc2cta'   as const,
    tools: ['ChatGPT', 'Claude'],
    accent: { text: '#272625', bg: 'rgba(183,239,178,0.30)', border: 'rgba(183,239,178,0.65)' },
  },
  {
    icon: LayoutGrid,
    titleKey:   'svc3title' as const,
    descKey:    'svc3desc'  as const,
    bestForKey: 'svc3bestFor' as const,
    ctaKey:     'svc3cta'   as const,
    tools: ['Google Sheets', 'Make', 'Zapier'],
    accent: { text: '#272625', bg: 'rgba(255,239,153,0.30)', border: 'rgba(255,239,153,0.65)' },
  },
  {
    icon: PenLine,
    titleKey:   'svc4title' as const,
    descKey:    'svc4desc'  as const,
    bestForKey: 'svc4bestFor' as const,
    ctaKey:     'svc4cta'   as const,
    tools: ['ChatGPT', 'Claude', 'Google Sheets'],
    accent: { text: '#272625', bg: 'rgba(255,215,240,0.30)', border: 'rgba(255,215,240,0.65)' },
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
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: '#f4f3ef' }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(177,177,175,0.06) 0%, transparent 65%), ' +
              'radial-gradient(ellipse 50% 40% at 80% 80%, rgba(177,177,175,0.04) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span
            className="inline-block font-body text-sm font-semibold uppercase tracking-[0.22em] mb-5"
            style={{ color: '#272625' }}
          >
            {t('heroBadge')}
          </span>
          <h1
            className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
            style={gradientText}
          >
            {t('heroTitle')}
          </h1>
          <p
            className="font-body text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: '#6d6c6b' }}
          >
            {t('heroSubtitle')}
          </p>
          <a
            href="#contact-form"
            className="btn-primary inline-flex items-center gap-2.5 font-body font-semibold text-base px-9 py-4 rounded-full"
          >
            {t('heroCta')}
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ── Service Cards ──────────────────────────────────────── */}
      <section
        className="py-20 md:py-24 relative"
        style={{ background: '#FFFFFF' }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(177,177,175,0.03) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((svc) => {
              const Icon = svc.icon
              const a = svc.accent
              return (
                <div
                  key={svc.titleKey}
                  className="card-gradient-border p-7 md:p-8 flex flex-col gap-4"
                >
                  {/* icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: a.bg, border: `1px solid ${a.border}` }}
                  >
                    <Icon size={20} style={{ color: a.text }} />
                  </div>

                  {/* title + desc */}
                  <div>
                    <h2 className="font-heading font-semibold text-xl md:text-2xl mb-2 leading-snug" style={{ color: '#272625' }}>
                      {t(svc.titleKey)}
                    </h2>
                    <p
                      className="font-body text-base leading-relaxed"
                      style={{ color: '#6d6c6b' }}
                    >
                      {t(svc.descKey)}
                    </p>
                  </div>

                  {/* best for */}
                  <div>
                    <span
                      className="font-body text-xs font-semibold uppercase tracking-[0.14em] block mb-1"
                      style={{ color: a.text }}
                    >
                      {t('bestForLabel')}
                    </span>
                    <p className="font-body text-sm" style={{ color: '#6d6c6b' }}>
                      {t(svc.bestForKey)}
                    </p>
                  </div>

                  {/* tools */}
                  <div>
                    <span
                      className="font-body text-xs font-semibold uppercase tracking-[0.14em] block mb-2"
                      style={{ color: a.text }}
                    >
                      {t('toolsLabel')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {svc.tools.map((tool) => (
                        <span
                          key={tool}
                          className="font-body text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: a.bg,
                            border: `1px solid ${a.border}`,
                            color: a.text,
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* cta */}
                  <a
                    href="#contact-form"
                    className="mt-auto inline-flex items-center gap-1.5 font-body font-semibold text-sm transition-opacity duration-200 hover:opacity-75 self-start"
                    style={{ color: a.text }}
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

      {/* ── How It Works ───────────────────────────────────────── */}
      <section
        className="py-20 md:py-24 relative overflow-hidden"
        style={{ background: '#f4f3ef', borderTop: '1px solid #ecebea' }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(177,177,175,0.04) 0%, transparent 65%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span
              className="inline-block font-body text-sm font-semibold uppercase tracking-[0.22em] mb-4"
              style={{ color: '#272625' }}
            >
              {t('howBadge')}
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight" style={{ color: '#272625' }}>
              {t('howTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_STEPS.map((step, i) => (
              <div
                key={step.numKey}
                className="relative p-6 rounded-2xl"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #ecebea',
                }}
              >
                <div
                  className="font-heading font-bold text-4xl mb-4 leading-none"
                  style={{ color: i % 2 === 0 ? 'rgba(177,177,175,0.20)' : 'rgba(177,177,175,0.15)' }}
                >
                  {t(step.numKey)}
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: '#272625' }}>
                  {t(step.titleKey)}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#6d6c6b' }}>
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who This Is For ────────────────────────────────────── */}
      <section
        className="py-20 md:py-24 relative"
        style={{ background: '#f4f3ef', borderTop: '1px solid #ecebea' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-block font-body text-sm font-semibold uppercase tracking-[0.22em] mb-4"
              style={{ color: '#272625' }}
            >
              {t('whoBadge')}
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight" style={{ color: '#272625' }}>
              {t('whoTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHO_KEYS.map((key) => (
              <div
                key={key}
                className="flex items-start gap-3 p-5 rounded-xl"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #ecebea',
                }}
              >
                <CheckCircle
                  size={18}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: '#272625' }}
                />
                <p className="font-body text-sm leading-relaxed" style={{ color: '#6d6c6b' }}>
                  {t(key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inquiry Form ───────────────────────────────────────── */}
      <section
        id="contact-form"
        className="py-20 md:py-24 relative"
        style={{ background: '#f4f3ef', borderTop: '1px solid #ecebea' }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-block font-body text-sm font-semibold uppercase tracking-[0.22em] mb-4"
              style={{ color: '#272625' }}
            >
              {t('formBadge')}
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-4" style={{ color: '#272625' }}>
              {t('formTitle')}
            </h2>
            <p className="font-body text-base leading-relaxed" style={{ color: '#6d6c6b' }}>
              {t('formSubtitle')}
            </p>
          </div>
          <ServiceInquiryForm />
        </div>
      </section>

      {/* ── Start CTA ──────────────────────────────────────────── */}
      <section
        className="py-20 md:py-24 relative overflow-hidden"
        style={{ background: '#f4f3ef', borderTop: '1px solid #ecebea' }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(177,177,175,0.05) 0%, transparent 65%)',
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="font-heading font-bold text-2xl md:text-3xl mb-4 leading-snug"
            style={gradientText}
          >
            {t('startTitle')}
          </h2>
          <p
            className="font-body text-base md:text-lg leading-relaxed mb-8"
            style={{ color: '#6d6c6b' }}
          >
            {t('startDesc')}
          </p>
          <a
            href="#contact-form"
            className="btn-primary inline-flex items-center gap-2.5 font-body font-semibold text-base px-9 py-4 rounded-full"
          >
            {t('startCta')}
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  )
}
