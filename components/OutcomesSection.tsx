'use client'

import { useLocale } from 'next-intl'
import { CheckCircle2 } from 'lucide-react'

const EN_OUTCOMES = [
  { headline: 'Clear your inbox in minutes', body: 'Use ready-made prompts to write, reply, and follow up — no blank-page paralysis.' },
  { headline: 'Turn notes into a sent-ready summary', body: 'Paste raw notes, get back a clean, formatted summary ready to share.' },
  { headline: 'Plan a month of content in one sheet', body: 'Topics, formats, and captions organised in a single Google Sheets file.' },
  { headline: 'Track every lead without spreadsheet chaos', body: 'A simple lead tracker that fits daily work — no IT setup needed.' },
]

const FA_OUTCOMES = [
  { headline: 'صندوقت را در چند دقیقه خالی کن', body: 'از پرامپت‌های آماده برای نوشتن، پاسخ و پیگیری استفاده کن — هیچ‌وقت از صفحه‌ی خالی شروع نکن.' },
  { headline: 'یادداشت‌ها را به خلاصه‌ی آماده‌ی ارسال تبدیل کن', body: 'یادداشت‌های خامت را paste کن، یک خلاصه‌ی تمیز و آماده‌ی اشتراک‌گذاری بگیر.' },
  { headline: 'یک ماه محتوا را در یک شیت برنامه‌ریزی کن', body: 'موضوع، قالب و کپشن — همه در یک فایل گوگل‌شیت منظم.' },
  { headline: 'هر سرنخ را بدونِ شلوغیِ اکسل ردیابی کن', body: 'یک ردیاب ساده که با کار روزانه‌ات جور درمی‌آید — بدون نیاز به تیم IT.' },
]

export default function OutcomesSection() {
  const locale = useLocale()
  const isFa = locale === 'fa'
  const outcomes = isFa ? FA_OUTCOMES : EN_OUTCOMES

  return (
    <section
      className="py-20 md:py-28 relative"
      style={{ background: '#F5ECE0', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p
            className="font-ui font-bold mb-4"
            style={{ fontSize: '13px', letterSpacing: '.22em', color: 'rgba(90,80,74,0.55)', textTransform: 'uppercase' }}
          >
            {isFa ? 'چه چیزی ممکن می‌شود' : "What you'll be able to do"}
          </p>
          <h2
            className={`${isFa ? 'font-fa' : 'font-en'} font-extrabold`}
            style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', lineHeight: 1.1, letterSpacing: '-.02em', color: '#111111' }}
          >
            {isFa ? (
              <>نتیجه‌های واقعی،{' '}<span style={{ color: '#5A504A' }}>از همین امروز</span></>
            ) : (
              <>Real results,{' '}<span style={{ color: '#5A504A' }}>starting today</span></>
            )}
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {outcomes.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                border: '0.5px solid rgba(0,0,0,0.10)',
                borderRadius: '12px',
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
                  background: 'rgba(0,0,0,0.05)',
                  border: '0.5px solid rgba(0,0,0,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: '2px',
                }}
              >
                <CheckCircle2 size={18} style={{ color: '#111111' }} />
              </span>
              <div>
                <p
                  className={`${isFa ? 'font-fa' : 'font-en'} font-bold`}
                  style={{ fontSize: '16.5px', color: '#111111', lineHeight: 1.3, marginBottom: '6px' }}
                >
                  {item.headline}
                </p>
                <p
                  className={`${isFa ? 'font-fa' : 'font-ui'}`}
                  style={{ fontSize: '14px', color: '#5A504A', lineHeight: 1.55 }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
