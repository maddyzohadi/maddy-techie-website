import { getTranslations } from 'next-intl/server'
import { ArrowRight, Zap, MessageSquare, PenLine, LayoutGrid, Lightbulb, Briefcase, Globe } from 'lucide-react'
import ServiceInquiryForm from '@/components/ServiceInquiryForm'

const NEUTRAL = { text: '#4d4f46', bg: '#eeefe9', border: '#d2d3cc' }

const SERVICES = [
  { icon: Zap,           titleKey: 'svc1title' as const, descKey: 'svc1desc' as const, ctaKey: 'svc1cta' as const, accent: NEUTRAL },
  { icon: MessageSquare, titleKey: 'svc2title' as const, descKey: 'svc2desc' as const, ctaKey: 'svc2cta' as const, accent: NEUTRAL },
  { icon: PenLine,       titleKey: 'svc3title' as const, descKey: 'svc3desc' as const, ctaKey: 'svc3cta' as const, accent: NEUTRAL },
  { icon: LayoutGrid,    titleKey: 'svc4title' as const, descKey: 'svc4desc' as const, ctaKey: 'svc4cta' as const, accent: NEUTRAL },
] as const

const WHY_CARDS = [
  { icon: Lightbulb, titleKey: 'why1title' as const, descKey: 'why1desc' as const },
  { icon: Zap,       titleKey: 'why2title' as const, descKey: 'why2desc' as const },
  { icon: Briefcase, titleKey: 'why3title' as const, descKey: 'why3desc' as const },
  { icon: Globe,     titleKey: 'why4title' as const, descKey: 'why4desc' as const },
] as const

export default async function ServicesPageContentFa() {
  const t = await getTranslations('servicesPageFa')

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: '#fdfdf8' }}
      >
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <span
            className="inline-block font-body text-sm font-semibold uppercase tracking-[0.22em] mb-5"
            style={{ color: '#65675e' }}
          >
            {t('heroBadge')}
          </span>
          <h1
            className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
            style={{ color: '#111827', letterSpacing: '-0.025em' }}
          >
            {t('heroTitle')}
          </h1>
          <p
            className="font-body text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: '#4d4f46' }}
          >
            {t('heroSubtitle')}
          </p>
          <a
            href="#contact-form"
            className="btn-primary inline-flex items-center gap-2.5 font-body font-medium text-base px-9 py-4"
            style={{ borderRadius: '4px', textDecoration: 'none' }}
          >
            {t('heroCta')}
            <ArrowRight size={16} className="rotate-180" />
          </a>
        </div>
      </section>

      {/* ── Service Cards ──────────────────────────────────────── */}
      <section
        className="py-20 md:py-24 relative"
        style={{ background: '#ffffff' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((svc) => {
              const Icon = svc.icon
              const a = svc.accent
              return (
                <div
                  key={svc.titleKey}
                  className="card-gradient-border p-7 flex flex-col gap-4"
                >
                  <div
                    className="w-11 h-11 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: a.bg, border: `1px solid ${a.border}` }}
                  >
                    <Icon size={20} style={{ color: a.text }} />
                  </div>
                  <div>
                    <h2 className="font-heading font-semibold text-xl mb-2 leading-snug" style={{ color: '#111827' }}>
                      {t(svc.titleKey)}
                    </h2>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: '#4d4f46' }}
                    >
                      {t(svc.descKey)}
                    </p>
                  </div>
                  <a
                    href="#contact-form"
                    className="mt-auto inline-flex items-center gap-1.5 font-body font-semibold text-sm transition-opacity duration-200 hover:opacity-75 self-start"
                    style={{ color: '#2f80fa' }}
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

      {/* ── Why Maddy the Techie ──────────────────────────────── */}
      <section
        className="py-20 md:py-24 relative"
        style={{ background: '#eeefe9', borderTop: '1px solid #d2d3cc' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-block font-body text-sm font-semibold uppercase tracking-[0.22em] mb-4"
              style={{ color: '#65675e' }}
            >
              {t('whyBadge')}
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight" style={{ color: '#111827', letterSpacing: '-0.025em' }}>
              {t('whyTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_CARDS.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.titleKey}
                  className="flex items-start gap-4 p-6"
                  style={{ borderRadius: '4px', background: '#ffffff', border: '1px solid #d2d3cc' }}
                >
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#eeefe9', border: '1px solid #d2d3cc' }}
                  >
                    <Icon size={18} style={{ color: '#4d4f46' }} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-base mb-1" style={{ color: '#111827' }}>
                      {t(card.titleKey)}
                    </h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: '#4d4f46' }}>
                      {t(card.descKey)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Contact Form ───────────────────────────────────────── */}
      <section
        id="contact-form"
        className="py-20 md:py-24 relative"
        style={{ background: '#fdfdf8', borderTop: '1px solid #d2d3cc' }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-block font-body text-sm font-semibold uppercase tracking-[0.22em] mb-4"
              style={{ color: '#65675e' }}
            >
              {t('formBadge')}
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-4" style={{ color: '#111827', letterSpacing: '-0.025em' }}>
              {t('formTitle')}
            </h2>
            {t('formSubtitle') && (
              <p className="font-body text-base leading-relaxed" style={{ color: '#4d4f46' }}>
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
