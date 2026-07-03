'use client'

import { motion, useReducedMotion } from 'motion/react'
import ServiceInquiryForm from '@/components/ServiceInquiryForm'
import ServiceIllustrationFa, { type IllustrationVariant } from '@/components/ServiceIllustrationFa'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"
const BORDER = '0.5px solid rgba(17,17,17,0.07)'
const EASE   = [0.22, 1, 0.36, 1] as const

const FA_CARDS: Array<{
  variant: IllustrationVariant
  label:   string
  title:   string
  desc:    string
  cta:     string
}> = [
  {
    variant: 'workflow',
    label:   'جریان کاری',
    title:   'راه‌اندازی جریان کاری با AI',
    desc:    'برای کارهای تکراری مثل ایمیل، خلاصه‌سازی، برنامه‌ریزی محتوا، فایل‌ها و گزارش‌ها، یک جریان کاری ساده و قابل استفاده طراحی می‌کنم.',
    cta:     'شروع پروژه ←',
  },
  {
    variant: 'templates',
    label:   'قالب‌ها',
    title:   'قالب‌ها و سیستم‌های آماده',
    desc:    'قالب‌هایی می‌سازم که کمک می‌کنند سریع‌تر بنویسی، ایده‌هایت را مرتب کنی، محتوا بسازی و کارهای روزمره را بدون شروع از صفر جلو ببری.',
    cta:     'دیدن نمونه‌ها ←',
  },
  {
    variant: 'training',
    label:   'آموزش',
    title:   'آموزش و همراهی ساده',
    desc:    'به زبان ساده یاد می‌گیری چطور از ChatGPT، Claude و ابزارهای هوش مصنوعی برای کار واقعی استفاده کنی، نه فقط برای تست و سرگرمی.',
    cta:     'دیدن آموزش‌ها ←',
  },
]

const FA_STEPS = [
  { num: '۰۱', title: 'شناخت نیاز',    desc: 'می‌فهمیم دقیقاً کدام بخش کار وقتت را می‌گیرد و چه چیزی واقعاً کمکت می‌کند.' },
  { num: '۰۲', title: 'طراحی سیستم',   desc: 'یک ساختار ساده برای ابزارها، قالب‌ها یا جریان کاری مورد نیازت طراحی می‌کنم.' },
  { num: '۰۳', title: 'ساخت و تنظیم',  desc: 'سیستم را می‌سازیم، تست می‌کنیم و برای استفاده روزمره آماده می‌کنیم.' },
  { num: '۰۴', title: 'آموزش و تحویل', desc: 'یاد می‌گیری چطور از آن استفاده کنی و بعد با خیال راحت ادامه بدهی.' },
] as const

export default function ServicesPageContentFa() {
  const reduced = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial:    { opacity: 0, y: reduced ? 0 : 18 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: EASE },
  })

  const scrollFade = {
    initial:     { opacity: 0, y: reduced ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-60px' as const },
    transition:  { duration: 0.65, ease: EASE },
  }

  return (
    <>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        dir="rtl"
        style={{
          background:   '#FAF6EF',
          padding:      'clamp(80px, 11vw, 120px) clamp(24px, 8vw, 80px) clamp(80px, 10vw, 112px)',
          borderBottom: BORDER,
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'right' }}>

          <motion.p {...fadeUp(0)} style={{
            fontFamily:    vaFont,
            fontSize:      '12px',
            fontWeight:     700,
            letterSpacing: '0.06em',
            color:          '#E34E2E',
            marginBottom:  '28px',
          }}>
            خدمات
          </motion.p>

          <motion.h1 {...fadeUp(0.09)} style={{
            fontFamily:   vaFont,
            fontSize:     'clamp(34px, 5.5vw, 68px)',
            fontWeight:    800,
            color:         '#111111',
            lineHeight:    1.30,
            letterSpacing: '-0.01em',
            marginBottom:  '28px',
          }}>
            سیستم‌های ساده هوش مصنوعی
            <br />
            <span style={{ color: '#E34E2E' }}>برای کار واقعی</span>
          </motion.h1>

          <motion.p {...fadeUp(0.18)} style={{
            fontFamily:   vaFont,
            fontSize:     'clamp(15px, 1.4vw, 17px)',
            color:        '#625B55',
            lineHeight:    1.90,
            maxWidth:     '580px',
            marginBottom: '40px',
          }}>
            کمکت می‌کنم ابزارهای هوش مصنوعی، قالب‌ها و جریان‌های کاری ساده بسازی تا کارهای
            تکراری کمتر شوند و روزت منظم‌تر پیش برود — بدون کدنویسی و بدون پیچیدگی.
          </motion.p>

          <motion.div
            {...fadeUp(0.26)}
            style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}
          >
            <a
              href="#contact-form"
              style={{
                fontFamily:     vaFont,
                fontSize:       '15px',
                fontWeight:      700,
                color:          '#FFFDF8',
                background:     '#E34E2E',
                padding:        '13px 30px',
                borderRadius:   '100px',
                textDecoration: 'none',
                display:        'inline-flex',
                alignItems:     'center',
                transition:     'background 0.15s, transform 0.15s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.background  = '#C63C1E'
                ;(e.currentTarget as HTMLAnchorElement).style.transform   = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.background  = '#E34E2E'
                ;(e.currentTarget as HTMLAnchorElement).style.transform   = 'translateY(0)'
              }}
            >
              شروع پروژه
            </a>
            <a
              href="#process"
              style={{
                fontFamily:     vaFont,
                fontSize:       '14px',
                fontWeight:      500,
                color:          '#625B55',
                textDecoration: 'none',
                borderBottom:   '0.5px solid rgba(98,91,85,0.35)',
                paddingBottom:  '2px',
                transition:     'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color       = '#111111'
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(17,17,17,0.40)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color       = '#625B55'
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(98,91,85,0.35)'
              }}
            >
              دیدن روند کار
            </a>
          </motion.div>

        </div>
      </section>

      {/* ── Services — illustrated card grid ──────────────────────────────── */}
      <section
        dir="rtl"
        style={{
          background:   '#FFFDF8',
          padding:      'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 80px)',
          borderBottom: BORDER,
        }}
      >
        <motion.div {...scrollFade} style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <p style={{
            fontFamily:    vaFont,
            fontSize:      '11px',
            fontWeight:     700,
            letterSpacing: '0.06em',
            color:          '#E34E2E',
            marginBottom:  '16px',
            textAlign:     'right',
          }}>
            خدمات من
          </p>

          <h2 style={{
            fontFamily:   vaFont,
            fontSize:     'clamp(24px, 3vw, 40px)',
            fontWeight:    800,
            color:         '#111111',
            lineHeight:    1.25,
            letterSpacing: '-0.01em',
            marginBottom:  'clamp(40px, 6vw, 64px)',
            textAlign:     'right',
          }}>
            از ایده تا سیستم قابل استفاده
          </h2>

          {/* 3-card grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            style={{ alignItems: 'start' }}
          >
            {FA_CARDS.map((card, i) => (
              <motion.div
                key={card.variant}
                initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.60, delay: i * 0.10, ease: EASE }}
                style={{
                  background:   '#FAF6EF',
                  border:        BORDER,
                  borderRadius:  '16px',
                  overflow:      'hidden',
                  boxShadow:    '0 1px 12px rgba(0,0,0,0.04)',
                }}
              >
                {/* Illustration area */}
                <div style={{ height: '190px', overflow: 'hidden' }}>
                  <ServiceIllustrationFa variant={card.variant} />
                </div>

                {/* Content area */}
                <div style={{ padding: '24px 26px 28px', textAlign: 'right' }}>
                  <p style={{
                    fontFamily:    vaFont,
                    fontSize:      '10px',
                    fontWeight:     700,
                    letterSpacing: '0.06em',
                    color:          '#E34E2E',
                    marginBottom:  '10px',
                  }}>
                    {card.label}
                  </p>

                  <h3 style={{
                    fontFamily:   vaFont,
                    fontSize:     'clamp(16px, 1.5vw, 20px)',
                    fontWeight:    800,
                    color:         '#111111',
                    lineHeight:    1.40,
                    letterSpacing: '-0.01em',
                    marginBottom:  '12px',
                  }}>
                    {card.title}
                  </h3>

                  <p style={{
                    fontFamily:   vaFont,
                    fontSize:     'clamp(13px, 1.1vw, 15px)',
                    color:        '#625B55',
                    lineHeight:    1.85,
                    marginBottom: '20px',
                    margin:        '0 0 20px',
                  }}>
                    {card.desc}
                  </p>

                  <a
                    href="#contact-form"
                    style={{
                      fontFamily:     vaFont,
                      fontSize:       '13px',
                      fontWeight:      600,
                      color:          '#E34E2E',
                      textDecoration: 'none',
                      borderBottom:   '0.5px solid rgba(227,78,46,0.35)',
                      paddingBottom:  '2px',
                      transition:     'color 0.15s, border-color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLAnchorElement).style.color       = '#C63C1E'
                      ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(198,60,30,0.50)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLAnchorElement).style.color       = '#E34E2E'
                      ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(227,78,46,0.35)'
                    }}
                  >
                    {card.cta}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section
        id="process"
        dir="rtl"
        style={{
          background:   '#F1E8DD',
          padding:      'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 80px)',
          borderBottom: BORDER,
        }}
      >
        <motion.div {...scrollFade} style={{ maxWidth: '720px', margin: '0 auto' }}>

          <p style={{
            fontFamily:    vaFont,
            fontSize:      '11px',
            fontWeight:     700,
            letterSpacing: '0.06em',
            color:          '#8C7E74',
            marginBottom:  '16px',
          }}>
            روند همکاری
          </p>

          <h2 style={{
            fontFamily:   vaFont,
            fontSize:     'clamp(22px, 2.8vw, 36px)',
            fontWeight:    800,
            color:         '#111111',
            lineHeight:    1.35,
            letterSpacing: '-0.01em',
            marginBottom:  'clamp(44px, 6vw, 64px)',
          }}>
            از اولین پیام تا یک سیستم قابل استفاده
          </h2>

          <div>
            {FA_STEPS.map((step) => (
              <div
                key={step.num}
                style={{
                  display:    'flex',
                  alignItems: 'flex-start',
                  gap:        'clamp(20px, 3.5vw, 40px)',
                  padding:    'clamp(24px, 3.5vw, 36px) 0',
                  borderTop:  '0.5px solid rgba(17,17,17,0.10)',
                }}
              >
                <span style={{
                  fontFamily: vaFont,
                  fontSize:   'clamp(13px, 1.1vw, 15px)',
                  fontWeight:  700,
                  color:      '#E34E2E',
                  flexShrink:  0,
                  width:      '36px',
                  textAlign:  'center',
                  paddingTop: '3px',
                  opacity:     0.90,
                }}>
                  {step.num}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily:   vaFont,
                    fontSize:     'clamp(15px, 1.4vw, 18px)',
                    fontWeight:    700,
                    color:         '#111111',
                    lineHeight:    1.45,
                    marginBottom:  '8px',
                  }}>
                    {step.title}
                  </p>
                  <p style={{
                    fontFamily: vaFont,
                    fontSize:   'clamp(13px, 1.1vw, 15px)',
                    color:      '#625B55',
                    lineHeight:  1.90,
                    margin:      0,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
            <div aria-hidden="true" style={{ height: '0.5px', background: 'rgba(17,17,17,0.10)' }} />
          </div>

        </motion.div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        dir="rtl"
        style={{
          background:   '#FAF6EF',
          padding:      'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 80px)',
          borderBottom: BORDER,
          textAlign:    'center',
        }}
      >
        <motion.div {...scrollFade} style={{ maxWidth: '600px', margin: '0 auto' }}>

          <p style={{
            fontFamily:    vaFont,
            fontSize:      '11px',
            fontWeight:     700,
            letterSpacing: '0.06em',
            color:          '#E34E2E',
            marginBottom:  '20px',
          }}>
            آماده‌ای شروع کنیم؟
          </p>

          <h2 style={{
            fontFamily:   vaFont,
            fontSize:     'clamp(24px, 3vw, 42px)',
            fontWeight:    800,
            color:         '#111111',
            lineHeight:    1.30,
            letterSpacing: '-0.01em',
            marginBottom:  '20px',
          }}>
            یک سیستم ساده بساز که واقعاً در کارت استفاده شود
          </h2>

          <p style={{
            fontFamily:   vaFont,
            fontSize:     'clamp(14px, 1.3vw, 16px)',
            color:        '#625B55',
            lineHeight:    1.80,
            marginBottom:  '40px',
          }}>
            از یک قالب کوچک شروع کن یا برای راه‌اندازی یک جریان کاری کامل پیام بده.
          </p>

          <a
            href="#contact-form"
            style={{
              fontFamily:     vaFont,
              fontSize:       '15px',
              fontWeight:      700,
              color:          '#FFFDF8',
              background:     '#E34E2E',
              padding:        '14px 36px',
              borderRadius:   '100px',
              textDecoration: 'none',
              display:        'inline-flex',
              alignItems:     'center',
              transition:     'background 0.15s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background  = '#C63C1E'
              ;(e.currentTarget as HTMLAnchorElement).style.transform   = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background  = '#E34E2E'
              ;(e.currentTarget as HTMLAnchorElement).style.transform   = 'translateY(0)'
            }}
          >
            شروع پروژه
          </a>

        </motion.div>
      </section>

      {/* ── Contact form ──────────────────────────────────────────────────── */}
      <section
        id="contact-form"
        dir="rtl"
        style={{
          background:     '#FFFDF8',
          padding:        'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 80px)',
          scrollMarginTop: '88px',
        }}
      >
        <motion.div {...scrollFade} style={{ maxWidth: '560px', margin: '0 auto' }}>

          <p style={{
            fontFamily:    vaFont,
            fontSize:      '11px',
            fontWeight:     700,
            letterSpacing: '0.06em',
            color:          '#E34E2E',
            marginBottom:  '16px',
            textAlign:     'right',
          }}>
            تماس
          </p>

          <h2 style={{
            fontFamily:   vaFont,
            fontSize:     'clamp(22px, 2.8vw, 34px)',
            fontWeight:    800,
            color:         '#111111',
            lineHeight:    1.35,
            letterSpacing: '-0.01em',
            marginBottom:  '10px',
            textAlign:     'right',
          }}>
            از کاری که می‌خواهی ساده‌تر شود بگو
          </h2>

          <p style={{
            fontFamily:   vaFont,
            fontSize:     '14px',
            color:        '#625B55',
            lineHeight:    1.85,
            marginBottom:  '40px',
            textAlign:    'right',
          }}>
            چند خط درباره کاری که می‌خواهی ساده‌تر، سریع‌تر یا منظم‌تر شود بنویس.
            حداکثر تا ۴۸ ساعت پاسخ می‌دهم.
          </p>

          <ServiceInquiryForm />

        </motion.div>
      </section>

    </>
  )
}
