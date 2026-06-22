'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  q: string
  a: string
}

const EN_FAQ: FAQItem[] = [
  { q: 'Do I need any coding or technical background?', a: 'No. If you use a computer for work, you have everything you need.' },
  { q: 'Which tools will I use?', a: 'Mostly ChatGPT, Claude, and Google Sheets — tools you may already have.' },
  { q: 'How long until I can use something?', a: 'Every template works today, and every training part ends with something you can use immediately.' },
  { q: 'Is this for my type of work?', a: "It's built for non-technical professionals, creators, and small business owners — admin, marketing, ops, content, client work." },
  { q: "What's free vs paid?", a: 'The Starter Kit and several templates are free. Premium templates and done-with-you services are paid.' },
  { q: 'Is the site available in Persian?', a: 'Yes — switch to فارسی anytime from the top menu.' },
]

const FA_FAQ: FAQItem[] = [
  { q: 'به دانشِ کدنویسی یا فنی نیاز دارم؟', a: 'نه. اگر برای کار با کامپیوتر کار می‌کنی، همه‌چیزِ لازم را داری.' },
  { q: 'از چه ابزارهایی استفاده می‌کنم؟', a: 'بیشتر ChatGPT، کلود و گوگل‌شیت — ابزارهایی که شاید همین حالا داشته باشی.' },
  { q: 'چقدر طول می‌کشد تا بتوانم چیزی را استفاده کنم؟', a: 'هر قالب همین امروز کار می‌کند و هر بخشِ آموزش با چیزی تمام می‌شود که فوراً قابلِ استفاده است.' },
  { q: 'این برای نوعِ کارِ من هست؟', a: 'برای افرادِ غیرفنی، تولیدکننده‌های محتوا و صاحبانِ کسب‌وکار ساخته شده — اداری، بازاریابی، عملیات، محتوا و کارِ مشتری.' },
  { q: 'چه چیزی رایگان است و چه چیزی پولی؟', a: 'کیتِ شروع و چند قالب رایگان‌اند. قالب‌های حرفه‌ای و خدماتِ اختصاصی پولی‌اند.' },
  { q: 'سایت به فارسی هم هست؟', a: 'بله — هر زمان از منوی بالا به فارسی سوییچ کن.' },
]

function buildJsonLd(faq: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export default function FAQSection() {
  const locale = useLocale()
  const isFa = locale === 'fa'
  const faq = isFa ? FA_FAQ : EN_FAQ
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen(open === i ? null : i)
  const jsonLd = buildJsonLd(EN_FAQ)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        id="faq"
        className="py-24 md:py-32 relative scroll-mt-24"
        style={{ background: '#F5F0E8', borderTop: '0.5px solid rgba(123,47,190,0.15)' }}
      >
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <p
              className="font-ui font-bold mb-4"
              style={{ fontSize: '13px', letterSpacing: '.22em', color: 'rgba(26,26,46,0.50)', textTransform: 'uppercase' }}
            >
              {isFa ? 'سوالات رایج' : 'FAQ'}
            </p>
            <h2
              className={`${isFa ? 'font-fa' : 'font-en'} font-extrabold`}
              style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-.02em', color: '#1A1A2E' }}
            >
              {isFa ? (
                <>سوال داری؟{' '}<span style={{ color: 'rgba(26,26,46,0.60)' }}>جواب داریم.</span></>
              ) : (
                <>Got questions?{' '}<span style={{ color: 'rgba(26,26,46,0.60)' }}>We have answers.</span></>
              )}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faq.map((item, i) => {
              const isOpen = open === i
              return (
                <div
                  key={i}
                  style={{
                    background: '#FFFFFF',
                    border: `0.5px solid ${isOpen ? 'rgba(26,26,46,0.20)' : 'rgba(26,26,46,0.12)'}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className={`${isFa ? 'font-fa' : 'font-ui'} font-semibold cursor-pointer w-full`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '18px 22px',
                      background: 'none',
                      border: 'none',
                      textAlign: isFa ? 'right' : 'left',
                      color: '#1A1A2E',
                      fontSize: '15.5px',
                      lineHeight: 1.4,
                    }}
                  >
                    <span style={{ flex: 1 }}>{item.q}</span>
                    <span
                      style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: 'rgba(123,47,190,0.08)',
                        border: `0.5px solid ${isOpen ? 'rgba(123,47,190,0.30)' : 'rgba(123,47,190,0.20)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, color: '#1A1A2E',
                        transition: 'all 0.2s',
                      }}
                    >
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      className={`${isFa ? 'font-fa' : 'font-ui'}`}
                      style={{
                        padding: '14px 22px 18px',
                        fontSize: '15px',
                        color: 'rgba(26,26,46,0.60)',
                        lineHeight: 1.65,
                        borderTop: '0.5px solid rgba(123,47,190,0.12)',
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </section>
    </>
  )
}
