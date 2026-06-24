'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { motion } from 'motion/react'

const FA_SERVICES = [
  { number: '۰۱', title: 'آموزش هوش مصنوعی',         desc: 'یاد بگیر ChatGPT و Claude رو مثل یه حرفه‌ای استفاده کنی' },
  { number: '۰۲', title: 'ساخت اتوماسیون',   desc: 'کارهای تکراری رو به سیستم بده' },
  { number: '۰۳', title: 'قالب‌های آماده',   desc: 'از صفر شروع نکن' },
  { number: '۰۴', title: 'مشاوره',            desc: 'یه جلسه، یه نقشه راه' },
]

const EN_SERVICES = [
  { number: '01', title: 'AI Training',           desc: 'Learn to use ChatGPT and Claude like a professional' },
  { number: '02', title: 'Automation Build',       desc: 'Hand off your repetitive tasks to a system' },
  { number: '03', title: 'Ready-made Templates',   desc: "Don't start from scratch" },
  { number: '04', title: 'Consulting',             desc: 'One session, one roadmap' },
]

export default function ServicesListSection() {
  const locale      = useLocale()
  const isFa        = locale === 'fa'
  const services    = isFa ? FA_SERVICES : EN_SERVICES
  const headingFont = isFa ? "'Noto Naskh Arabic', serif" : "'DM Serif Display', serif"
  const bodyFont    = isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif'
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      style={{
        background: '#F7F3EC',
        padding: '96px 24px',
        borderTop: '0.5px solid rgba(0,0,0,0.06)',
        direction: isFa ? 'rtl' : 'ltr',
      }}
    >
      <motion.div
        style={{ maxWidth: '1280px', margin: '0 auto' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >

        {/* Eyebrow */}
        <span
          style={{
            display: 'block',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#999',
            marginBottom: '48px',
            textAlign: isFa ? 'center' : 'left',
          }}
        >
          {isFa ? 'خدمات' : 'SERVICES'}
        </span>

        {/* List */}
        <div>
          {services.map((svc, i) => (
            <div key={i}>
              {i > 0 && (
                <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.08)' }} />
              )}
              <motion.div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '28px',
                  padding: '26px 16px',
                  borderRadius: '8px',
                  background: hovered === i ? 'rgba(0,0,0,0.03)' : 'transparent',
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <span
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#bbb',
                    flexShrink: 0,
                    letterSpacing: '0.06em',
                    minWidth: '36px',
                  }}
                >
                  ({svc.number})
                </span>

                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '20px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily: headingFont,
                      fontSize: hovered === i ? '24px' : '20px',
                      fontWeight: hovered === i ? 800 : 700,
                      color: '#111111',
                      lineHeight: 1.2,
                      transition: 'font-size 0.18s ease, font-weight 0.18s ease',
                    }}
                  >
                    {svc.title}
                  </span>
                  <span
                    style={{
                      fontFamily: bodyFont,
                      fontSize: '14px',
                      color: '#888',
                      lineHeight: 1.5,
                    }}
                  >
                    {svc.desc}
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  )
}
