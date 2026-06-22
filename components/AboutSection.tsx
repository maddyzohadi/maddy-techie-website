import { Sparkles, ArrowRight } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function AboutSection() {
  const locale = await getLocale()
  const t = await getTranslations('about')
  const isFa = locale === 'fa'

  const sectionBg    = isFa ? '#fdfdf8' : '#f4f3ef'
  const borderColor  = isFa ? '#d2d3cc' : '#ecebea'
  const headingColor = isFa ? '#111827' : '#272625'
  const bodyColor    = isFa ? '#4d4f46' : '#6d6c6b'
  const badgeColor   = isFa ? '#65675e' : '#272625'

  return (
    <>
      <section id="about" className="py-24 md:py-32 relative scroll-mt-[88px]" style={{ background: sectionBg }}>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(177,177,175,0.04) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — avatar card */}
            <div className="order-2 lg:order-1">
              <div
                className="rounded-3xl overflow-hidden relative max-w-sm mx-auto"
                style={{
                  background: '#FFFFFF',
                  border: `1px solid ${borderColor}`,
                }}
              >
                <div aria-hidden className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(177,177,175,0.06) 0%, transparent 70%)' }} />

                <div className="relative z-10 p-10 flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{
                        background: isFa ? '#eeefe9' : '#f4f3ef',
                        border: isFa ? `2px solid ${borderColor}` : '2px solid rgba(177,177,175,0.25)',
                      }}
                    >
                      <span className="font-heading font-bold text-4xl" style={{ color: headingColor }}>M</span>
                    </div>
                    <div
                      className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: isFa ? '#2f80fa' : 'linear-gradient(135deg, #272625, #272625)' }}
                    >
                      <Sparkles size={13} className="text-white" />
                    </div>
                  </div>

                  <div className="font-heading font-bold text-xl mb-1" style={{ color: headingColor }}>Maddy the Techie</div>
                  <div className="font-body text-sm mb-4" style={{ color: bodyColor }}>{t('subtitle')}</div>

                  <p className="font-body text-sm italic max-w-xs leading-relaxed" style={{ color: bodyColor }}>
                    {t('tagline')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right — short intro */}
            <div className="order-1 lg:order-2">
              <span
                className="inline-block font-body text-sm md:text-base font-semibold uppercase tracking-[0.22em] mb-4"
                style={{ color: badgeColor }}
              >
                {t('badge')}
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight" style={{ color: headingColor }}>
                {t('title')}
                <br />
                <span className="gradient-text">{t('titleHighlight')}</span>
              </h2>

              <p className="font-body text-lg leading-relaxed mb-7" style={{ color: bodyColor }}>
                {t('desc1')}
              </p>

              {/* Stat strip */}
              <div
                className="flex flex-wrap gap-x-6 gap-y-2 mb-8"
                style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '20px' }}
              >
                {([t('stat0'), t('stat1'), t('stat2')] as string[]).map((stat, i) => (
                  <span
                    key={i}
                    className="font-body font-semibold text-sm"
                    style={{ color: headingColor }}
                  >
                    {stat}
                  </span>
                ))}
              </div>

              <Link
                href="/about"
                className="btn-primary inline-flex items-center gap-2.5 font-body font-semibold text-base px-9 py-4 rounded-full"
              >
                {t('ctaLabel')}
                <ArrowRight size={16} className={locale === 'fa' ? 'rotate-180' : ''} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA — FA only */}
      {locale === 'fa' && <FaFinalCTA />}
    </>
  )
}

async function FaFinalCTA() {
  const t = await getTranslations('homepageFaCta')
  return (
    <section
      className="py-20 md:py-24 relative overflow-hidden"
      style={{ background: '#eeefe9', borderTop: '1px solid #d2d3cc' }}
    >
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="font-heading font-bold text-2xl md:text-3xl mb-4 leading-snug"
          style={{ color: '#111827' }}
        >
          {t('title')}
        </h2>
        <p
          className="font-body text-base md:text-lg leading-relaxed mb-8"
          style={{ color: '#4d4f46' }}
        >
          {t('subtitle')}
        </p>
        <Link
          href="/services#contact-form"
          className="btn-primary inline-flex items-center gap-2.5 font-body font-semibold text-base px-9 py-4 rounded-full"
        >
          {t('cta')}
          <ArrowRight size={16} className="rotate-180" />
        </Link>
      </div>
    </section>
  )
}
