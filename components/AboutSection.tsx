import { Sparkles, ArrowRight } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function AboutSection() {
  const locale = await getLocale()
  const t = await getTranslations('about')
  const isFa = locale === 'fa'

  const headingColor = '#1A1A2E'
  const bodyColor    = 'rgba(26,26,46,0.60)'
  const badgeColor   = 'rgba(26,26,46,0.50)'

  return (
    <>
      <section id="about" className="py-24 md:py-32 relative scroll-mt-[88px]" style={{ background: '#F5F0EB' }}>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — avatar card */}
            <div className="order-2 lg:order-1">
              <div
                className="rounded-3xl overflow-hidden relative max-w-sm mx-auto"
                style={{
                  background: '#FFFFFF',
                  border: '0.5px solid rgba(26,26,46,0.12)',
                }}
              >
                <div className="relative z-10 p-10 flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(0,0,0,0.05)',
                        border: '0.5px solid rgba(0,0,0,0.08)',
                      }}
                    >
                      <span
                        className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-4xl`}
                        style={{ color: headingColor }}
                      >
                        M
                      </span>
                    </div>
                    <div
                      className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(0,0,0,0.05)',
                        border: '0.5px solid rgba(0,0,0,0.08)',
                      }}
                    >
                      <Sparkles size={13} style={{ color: '#1A1A2E' }} />
                    </div>
                  </div>

                  <div
                    className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-xl mb-1`}
                    style={{ color: headingColor }}
                  >
                    Maddy the Techie
                  </div>
                  <div className="font-ui text-sm mb-4" style={{ color: bodyColor }}>{t('subtitle')}</div>

                  <p className="font-ui text-sm italic max-w-xs leading-relaxed" style={{ color: bodyColor }}>
                    {t('tagline')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right — intro */}
            <div className="order-1 lg:order-2">
              <span
                className="inline-block font-ui text-sm md:text-base font-semibold uppercase tracking-[0.22em] mb-4"
                style={{ color: badgeColor }}
              >
                {t('badge')}
              </span>
              <h2
                className={`${isFa ? 'font-fa' : 'font-en'} font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight`}
                style={{ color: headingColor }}
              >
                {t('title')}
                <br />
                <span style={{ color: bodyColor }}>{t('titleHighlight')}</span>
              </h2>

              <p className="font-ui text-lg leading-relaxed mb-7" style={{ color: bodyColor }}>
                {t('desc1')}
              </p>

              {/* Stat strip */}
              <div
                className="flex flex-wrap gap-x-6 gap-y-2 mb-8"
                style={{ borderTop: '0.5px solid rgba(0,0,0,0.08)', paddingTop: '20px' }}
              >
                {([t('stat0'), t('stat1'), t('stat2')] as string[]).map((stat, i) => (
                  <span key={i} className="font-ui font-semibold text-sm" style={{ color: headingColor }}>
                    {stat}
                  </span>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 font-ui font-semibold text-base px-9 py-4"
                style={{
                  background: '#1A1A1A',
                  color: '#ffffff',
                  borderRadius: '100px',
                  border: 'none',
                  textDecoration: 'none',
                }}
              >
                {t('ctaLabel')}
                <ArrowRight size={16} className={locale === 'fa' ? 'rotate-180' : ''} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {locale === 'fa' && <FaFinalCTA />}
    </>
  )
}

async function FaFinalCTA() {
  const t = await getTranslations('homepageFaCta')
  return (
    <section
      className="py-20 md:py-24 relative overflow-hidden"
      style={{ background: '#F5F0EB', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
    >
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="font-fa font-bold text-2xl md:text-3xl mb-4 leading-snug"
          style={{ color: '#1A1A1A' }}
        >
          {t('title')}
        </h2>
        <p
          className="font-fa text-base md:text-lg leading-relaxed mb-8"
          style={{ color: '#666' }}
        >
          {t('subtitle')}
        </p>
        <Link
          href="/services#contact-form"
          className="inline-flex items-center gap-2.5 font-fa font-semibold text-base px-9 py-4"
          style={{
            background: '#1A1A1A',
            color: '#ffffff',
            borderRadius: '100px',
            border: 'none',
            textDecoration: 'none',
          }}
        >
          {t('cta')}
          <ArrowRight size={16} className="rotate-180" />
        </Link>
      </div>
    </section>
  )
}
