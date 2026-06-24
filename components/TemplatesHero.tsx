'use client'

import { useLocale } from 'next-intl'

export default function TemplatesHero() {
  const locale = useLocale()
  const isFa = locale === 'fa'

  return (
    <section
      style={{
        background: '#F7F3EC',
        borderBottom: '0.5px solid #E7DED2',
        paddingTop: 'calc(68px + 56px)',
        paddingBottom: '60px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      <div
        className="max-w-3xl mx-auto text-center"
        dir={isFa ? 'rtl' : 'ltr'}
      >
        {/* Eyebrow */}
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

        {/* Headline */}
        <h2
          className={isFa ? 'font-fa' : 'font-en'}
          style={{
            fontSize: 'clamp(34px, 5vw, 58px)',
            fontWeight: 700,
            color: '#111111',
            lineHeight: 1.1,
            letterSpacing: isFa ? undefined : '-0.025em',
            marginBottom: '20px',
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

        {/* Subtitle */}
        <p
          className={isFa ? 'font-fa' : 'font-ui'}
          style={{
            fontSize: '17px',
            color: 'rgba(17,17,17,0.52)',
            lineHeight: 1.65,
            maxWidth: '560px',
            margin: '0 auto 32px',
          }}
        >
          {isFa
            ? 'گردش‌کارهای هوش مصنوعی آماده که می‌توانی همین امروز بگیری، تنظیم کنی و اجرا کنی.'
            : 'Grab practical AI templates for emails, reports, content planning, and client workflows — built to save time without starting from scratch.'}
        </p>

        {/* Primary CTA */}
        <a
          href="#templates"
          className="font-ui font-bold inline-flex items-center gap-2 text-white no-underline rounded-full bg-brand-orange hover:bg-brand-coral transition-colors duration-150"
          style={{ padding: '13px 28px', fontSize: '14.5px' }}
        >
          {isFa ? 'مشاهده قالب‌ها ↓' : 'Browse templates ↓'}
        </a>

      </div>
    </section>
  )
}
