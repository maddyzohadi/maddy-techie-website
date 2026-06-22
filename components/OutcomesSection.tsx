'use client'

// TODO: Replace with Option A (2-3 real testimonial cards) once feedback is collected.
// Brief spec: Option B — "What you'll be able to do" outcome strip.

import { useLocale } from 'next-intl'
import { CheckCircle2 } from 'lucide-react'

const EN_OUTCOMES = [
  {
    headline: 'Clear your inbox in minutes',
    body: 'Use ready-made prompts to write, reply, and follow up — no blank-page paralysis.',
  },
  {
    headline: 'Turn notes into a sent-ready summary',
    body: 'Paste raw notes, get back a clean, formatted summary ready to share.',
  },
  {
    headline: 'Plan a month of content in one sheet',
    body: 'Topics, formats, and captions organised in a single Google Sheets file.',
  },
  {
    headline: 'Track every lead without spreadsheet chaos',
    body: 'A simple lead tracker that fits daily work — no IT setup needed.',
  },
]

const FA_OUTCOMES = [
  {
    headline: 'صندوقت را در چند دقیقه خالی کن',
    body: 'از پرامپت‌های آماده برای نوشتن، پاسخ و پیگیری استفاده کن — هیچ‌وقت از صفحه‌ی خالی شروع نکن.',
  },
  {
    headline: 'یادداشت‌ها را به خلاصه‌ی آماده‌ی ارسال تبدیل کن',
    body: 'یادداشت‌های خامت را paste کن، یک خلاصه‌ی تمیز و آماده‌ی اشتراک‌گذاری بگیر.',
  },
  {
    headline: 'یک ماه محتوا را در یک شیت برنامه‌ریزی کن',
    body: 'موضوع، قالب و کپشن — همه در یک فایل گوگل‌شیت منظم.',
  },
  {
    headline: 'هر سرنخ را بدونِ شلوغیِ اکسل ردیابی کن',
    body: 'یک ردیاب ساده که با کار روزانه‌ات جور درمی‌آید — بدون نیاز به تیم IT.',
  },
]

const OUTCOME_ACCENTS = [
  { bg: 'rgba(226,221,253,0.45)', border: 'rgba(226,221,253,0.70)', icon: '#10054d' },
  { bg: 'rgba(183,239,178,0.45)', border: 'rgba(183,239,178,0.70)', icon: '#272625' },
  { bg: 'rgba(255,239,153,0.45)', border: 'rgba(255,239,153,0.70)', icon: '#272625' },
  { bg: 'rgba(255,215,240,0.45)', border: 'rgba(255,215,240,0.70)', icon: '#272625' },
]

export default function OutcomesSection() {
  const locale = useLocale()
  const isFa = locale === 'fa'
  const outcomes = isFa ? FA_OUTCOMES : EN_OUTCOMES

  return (
    <section
      className="py-20 md:py-28 relative"
      style={{ background: '#f4f3ef', borderTop: '1px solid #ecebea' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(177,177,175,0.04) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="font-body font-bold mb-4"
            style={{ fontSize: '13px', letterSpacing: '.22em', color: '#272625', textTransform: 'uppercase' }}
          >
            {isFa ? 'چه چیزی ممکن می‌شود' : 'What you\'ll be able to do'}
          </p>
          <h2
            className="font-heading font-extrabold"
            style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', lineHeight: 1.1, letterSpacing: '-.02em', color: '#272625' }}
          >
            {isFa ? (
              <>نتیجه‌های واقعی،{' '}<span style={{ color: '#272625' }}>از همین امروز</span></>
            ) : (
              <>Real results,{' '}<span style={{ color: '#272625' }}>starting today</span></>
            )}
          </h2>
        </div>

        {/* 2×2 outcome grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {outcomes.map((item, i) => {
            const acc = OUTCOME_ACCENTS[i % 4]
            return (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                border: '1px solid #ecebea',
                borderRadius: '16px',
                padding: '24px 26px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  width: '36px', height: '36px',
                  borderRadius: '10px',
                  background: acc.bg,
                  border: `1px solid ${acc.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: '2px',
                }}
              >
                <CheckCircle2 size={18} style={{ color: acc.icon }} />
              </span>
              <div>
                <p
                  className="font-heading font-bold"
                  style={{ fontSize: '16.5px', color: '#272625', lineHeight: 1.3, marginBottom: '6px' }}
                >
                  {item.headline}
                </p>
                <p
                  className="font-body"
                  style={{ fontSize: '14px', color: '#6d6c6b', lineHeight: 1.55 }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          )})}
        </div>

      </div>
    </section>
  )
}
