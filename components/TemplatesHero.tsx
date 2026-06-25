'use client'

import { useLocale } from 'next-intl'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_145119_f4ec4d9f-3ecd-4116-baa3-26e8cf2df976.mp4'

export default function TemplatesHero() {
  const locale = useLocale()
  const isFa = locale === 'fa'

  return (
    <section
      style={{
        background: '#F7F3EC',
        borderBottom: '0.5px solid #E7DED2',
        paddingTop: 'calc(68px + 40px)',
        paddingBottom: '52px',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
          dir={isFa ? 'rtl' : 'ltr'}
        >

          {/* Left column: text */}
          <div>
            <p
              className="font-ui font-bold mb-5"
              style={{
                fontSize: '12px',
                letterSpacing: '.20em',
                color: '#FF6A32',
                textTransform: 'uppercase',
              }}
            >
              {isFa ? 'سیستم‌های آماده' : 'Ready-to-use systems'}
            </p>

            <h2
              className={isFa ? 'font-fa' : 'font-en'}
              style={{
                fontSize: 'clamp(28px, 3.5vw, 46px)',
                fontWeight: 700,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: isFa ? undefined : '-0.025em',
                marginBottom: '16px',
              }}
            >
              {isFa ? (
                <>
                  با یک سیستم شروع کن،{' '}
                  <span style={{ color: 'rgba(17,17,17,0.38)' }}>نه یک صفحه‌ی خالی</span>
                </>
              ) : (
                <>
                  Ready-to-use AI systems{' '}
                  <span style={{ color: 'rgba(17,17,17,0.38)' }}>for everyday work</span>
                </>
              )}
            </h2>

            <p
              className={isFa ? 'font-fa' : 'font-ui'}
              style={{
                fontSize: '16px',
                color: 'rgba(17,17,17,0.52)',
                lineHeight: 1.65,
                marginBottom: '28px',
              }}
            >
              {isFa
                ? 'گردش‌کارهای هوش مصنوعی آماده که می‌توانی همین امروز بگیری، تنظیم کنی و اجرا کنی.'
                : 'Grab practical AI templates for emails, reports, content planning, and client workflows — built to save time without starting from scratch.'}
            </p>

            <a
              href="#templates"
              className="font-ui font-bold inline-flex items-center gap-2 text-white no-underline rounded-full bg-brand-orange hover:bg-brand-coral transition-colors duration-150"
              style={{ padding: '13px 28px', fontSize: '14.5px' }}
            >
              {isFa ? 'مشاهده قالب‌ها ↓' : 'Browse templates ↓'}
            </a>
          </div>

          {/* Right column: video */}
          <div className="w-full overflow-hidden rounded-2xl" style={{ border: '1px solid #E7DED2' }}>
            <video
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              className="w-full object-cover"
              style={{
                display: 'block',
                height: 'clamp(220px, 28vw, 320px)',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
