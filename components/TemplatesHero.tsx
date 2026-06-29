'use client'

import { useLocale } from 'next-intl'

export default function TemplatesHero() {
  const locale = useLocale()
  const isFa = locale === 'fa'

  return (
    <section
      style={{
        position: 'relative',
        background: '#F5ECE0',
        borderBottom: '0.5px solid #D8C7B8',
        paddingTop: 'calc(68px + 40px)',
        paddingBottom: '52px',
        overflow: 'hidden',
      }}
    >
      {/* Text content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg" dir={isFa ? 'rtl' : 'ltr'}>
          <p
            className="font-ui font-bold mb-5"
            style={{
              fontSize: '12px',
              letterSpacing: '.20em',
              color: '#4B92DB',
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
                هوش مصنوعی را به یک سیستم ساده{' '}
                <span style={{ color: 'rgba(17,17,17,0.38)' }}>تبدیل کن</span>
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
              ? 'با یک قالب رایگان شروع کن. بدون شروع از صفر، بدون وقت‌تلف.'
              : 'Start with a ready-made AI template. Save time without starting from scratch.'}
          </p>

          <a
            href="#templates"
            className="font-ui font-bold inline-flex items-center gap-2 text-white no-underline rounded-full bg-brand-blue hover:bg-brand-blue-dark transition-colors duration-150"
            style={{ padding: '13px 28px', fontSize: '14.5px' }}
          >
            {isFa ? 'مشاهده قالب‌ها ↓' : 'Browse templates ↓'}
          </a>
        </div>
      </div>
    </section>
  )
}
