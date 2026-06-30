'use client'

import { motion } from 'motion/react'
import { Link } from '@/i18n/navigation'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: 'easeOut' },
} as const

const BELIEFS = [
  'برای کار هوشمندانه‌تر با هوش مصنوعی لازم نیست کدنویس باشی.',
  'هر درس باید با چیزی که واقعاً می‌توانی استفاده کنی پایان یابد.',
  'بهترین سیستم هوش مصنوعی آن است که خودت بفهمیش و بتوانی نگهداریش کنی.',
  'کاربردی بودن همیشه بر تئوری‌پردازی برتری دارد.',
]

const PILLARS = [
  { label: 'رویکرد', value: 'عملی و پروژه‌محور' },
  { label: 'طراحی شده برای', value: 'متخصصان غیرفنی' },
  { label: 'زبان', value: 'فارسی و انگلیسی' },
]

export default function FaAboutPageContent() {
  return (
    <>
      {/* Hero — dark premium */}
      <section
        dir="rtl"
        style={{
          background: '#351C1C',
          padding: '72px 24px 80px',
        }}
      >
        <motion.div
          style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p
            style={{
              fontFamily: vaFont,
              fontSize: '11px',
              fontWeight: 600,
              color: '#C08064',
              letterSpacing: '0.06em',
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}
          >
            درباره
          </p>
          <h1
            style={{
              fontFamily: vaFont,
              fontSize: 'clamp(24px, 4vw, 40px)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.45,
              marginBottom: '22px',
            }}
          >
            آموزش کاربردی هوش مصنوعی
            <br />
            <span
              style={{
                color: 'rgba(239,231,220,0.55)',
                fontWeight: 400,
                fontSize: '74%',
              }}
            >
              برای کار امروز
            </span>
          </h1>
          <p
            style={{
              fontFamily: vaFont,
              fontSize: '15px',
              color: 'rgba(239,231,220,0.72)',
              lineHeight: 1.9,
              maxWidth: '460px',
              margin: '0 auto 32px',
            }}
          >
            Maddy the Techie به متخصصان غیرفنی کمک می‌کند از هوش مصنوعی با وضوح و اعتمادبه‌نفس استفاده کنند — با ابزارهای واقعی و روندهای کاری ساده.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
            }}
          >
            {PILLARS.map((p) => (
              <span
                key={p.label}
                style={{
                  display: 'inline-flex',
                  gap: '5px',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.06)',
                  border: '0.5px solid rgba(255,255,255,0.12)',
                  borderRadius: '100px',
                  padding: '6px 14px',
                  fontFamily: vaFont,
                  fontSize: '12px',
                }}
              >
                <span style={{ color: 'rgba(239,231,220,0.38)', fontWeight: 400 }}>
                  {p.label}:
                </span>
                <span style={{ color: 'rgba(239,231,220,0.80)', fontWeight: 600 }}>
                  {p.value}
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Mission — two-column on warm card */}
      <section
        dir="rtl"
        style={{
          background: '#EFE7DC',
          padding: '72px 24px',
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
        }}
      >
        <motion.div style={{ maxWidth: '760px', margin: '0 auto' }} {...fadeIn}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: vaFont,
                  fontSize: 'clamp(16px, 2vw, 19px)',
                  fontWeight: 700,
                  color: '#111111',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                }}
              >
                «هوش مصنوعی را برای همه‌ی کسانی که کد نمی‌زنند، کاربردی می‌کنم.»
              </p>
              <p
                style={{
                  fontFamily: vaFont,
                  fontSize: '12px',
                  color: 'rgba(90,80,74,0.50)',
                }}
              >
                — Maddy the Techie
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: vaFont,
                  fontSize: '15px',
                  color: '#5A504A',
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                Maddy the Techie آموزش هوش مصنوعی را برای آدم‌های غیرفنی ساده می‌کند — بدون اصطلاحات پیچیده، بدون کد، با ابزارهایی که واقعاً در کار روزمره استفاده می‌شوند.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Beliefs — numbered list on warm bg */}
      <section
        dir="rtl"
        style={{
          background: '#F5ECE0',
          padding: '72px 24px',
          borderTop: '0.5px solid #D8C7B8',
        }}
      >
        <motion.div style={{ maxWidth: '640px', margin: '0 auto' }} {...fadeIn}>
          <p
            style={{
              fontFamily: vaFont,
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: 'rgba(90,80,74,0.48)',
              marginBottom: '12px',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            باورها
          </p>
          <h2
            style={{
              fontFamily: vaFont,
              fontSize: 'clamp(17px, 2.2vw, 22px)',
              fontWeight: 700,
              color: '#111111',
              lineHeight: 1.6,
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            اینها را باور دارم
          </h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {BELIEFS.map((belief, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '20px 0',
                  borderBottom:
                    i < BELIEFS.length - 1 ? '0.5px solid #D8C7B8' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: vaFont,
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#C08064',
                    marginTop: '2px',
                    flexShrink: 0,
                    width: '22px',
                    textAlign: 'center',
                  }}
                >
                  {['۱', '۲', '۳', '۴'][i]}
                </span>
                <p
                  style={{
                    fontFamily: vaFont,
                    fontSize: '15px',
                    color: '#5A504A',
                    lineHeight: 1.9,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {belief}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* CTA — dark closing panel */}
      <section
        dir="rtl"
        style={{
          background: '#351C1C',
          padding: '72px 24px',
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
        }}
      >
        <motion.div
          style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}
          {...fadeIn}
        >
          <h2
            style={{
              fontFamily: vaFont,
              fontSize: 'clamp(17px, 2.5vw, 24px)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.6,
              marginBottom: '14px',
            }}
          >
            آماده شروع هستی؟
          </h2>
          <p
            style={{
              fontFamily: vaFont,
              fontSize: '14px',
              color: 'rgba(239,231,220,0.68)',
              lineHeight: 1.85,
              marginBottom: '32px',
            }}
          >
            از آموزش شروع کن، یا اگر می‌خواهی روی یک پروژه با هم کار کنیم، در تماس باش.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
            }}
          >
            <Link
              href="/learn"
              style={{
                fontFamily: vaFont,
                fontSize: '14px',
                fontWeight: 600,
                color: '#FFFFFF',
                background: '#4B92DB',
                padding: '12px 26px',
                borderRadius: '100px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              شروع یادگیری
            </Link>
            <Link
              href="/services"
              style={{
                fontFamily: vaFont,
                fontSize: '14px',
                fontWeight: 500,
                color: 'rgba(239,231,220,0.72)',
                background: 'rgba(255,255,255,0.07)',
                border: '0.5px solid rgba(255,255,255,0.14)',
                padding: '12px 26px',
                borderRadius: '100px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              مشاهده خدمات
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}
