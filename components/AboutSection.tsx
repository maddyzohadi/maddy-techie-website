import { ArrowRight } from 'lucide-react'
import MotionFadeIn from './MotionFadeIn'
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
      <section id="about" className="py-24 md:py-32 relative scroll-mt-[88px]" style={{ background: '#F5ECE0' }}>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionFadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — avatar card */}
            <div className="order-2 lg:order-1">
              <div className="bg-white border border-[#E8E3DA] rounded-2xl p-8 max-w-sm mx-auto">
                <p className="font-['DM_Serif_Display'] text-lg text-[#111111] mb-1">
                  Maddy the Techie
                </p>
                <p className="text-sm text-[#888] mb-6">
                  AI &amp; Automation Educator · Silicon Valley
                </p>

                <p className="text-sm text-[#666] leading-relaxed italic border-l-2 border-[#B53389] pl-3 mb-6">
                  Making AI practical for everyone who doesn&apos;t code
                </p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { num: '4', label: 'Modules' },
                    { num: '12+', label: 'Projects' },
                    { num: '100%', label: 'No-code' },
                  ].map(({ num, label }) => (
                    <div key={label} className="bg-[#F5ECE0] rounded-xl p-3 text-center">
                      <span className="block text-xl font-medium text-[#111111]">{num}</span>
                      <span className="block text-[11px] text-[#888] mt-0.5">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['ChatGPT', 'Claude', 'n8n', 'Google Sheets', 'Make'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-[#888] border border-[#E8E3DA] rounded-full px-2.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — intro */}
            <div className="order-1 lg:order-2">
              <span
                className="inline-flex items-center font-ui text-xs font-semibold uppercase tracking-[0.14em] mb-4 bg-brand-peach text-brand-charcoal px-3 py-1.5 rounded-full"
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
                className="inline-flex items-center gap-2.5 font-ui font-semibold text-base px-9 py-4 rounded-full text-white no-underline bg-brand-red hover:bg-brand-red-dark transition-colors duration-150"
              >
                {t('ctaLabel')}
                <ArrowRight size={16} className={locale === 'fa' ? 'rotate-180' : ''} />
              </Link>
            </div>

          </div>
          </MotionFadeIn>
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
      style={{ background: '#F5ECE0', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
    >
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="font-fa font-bold text-2xl md:text-3xl mb-4 leading-snug"
          style={{ color: '#111111' }}
        >
          {t('title')}
        </h2>
        <p
          className="font-fa text-base md:text-lg leading-relaxed mb-8"
          style={{ color: '#5A504A' }}
        >
          {t('subtitle')}
        </p>
        <Link
          href="/services#contact-form"
          className="inline-flex items-center gap-2.5 font-fa font-semibold text-base px-9 py-4"
          style={{
            background: '#111111',
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
