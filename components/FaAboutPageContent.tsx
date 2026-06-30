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

export default function FaAboutPageContent() {
  return (
    <>
      {/* Hero — editorial light */}
      <section
        dir="rtl"
        style={{
          background: '#FFF9F1',
          padding: '80px 24px 72px',
          borderBottom: '0.5px solid #E6D7C8',
        }}
      >
        <motion.div
          style={{ maxWidth: '680px', margin: '0 auto' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p
            style={{
              fontFamily: vaFont,
              fontSize: '11px',
              fontWeight: 600,
              color: '#ED5821',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            درباره
          </p>
          <h1
            style={{
              fontFamily: vaFont,
              fontSize: 'clamp(32px, 5.5vw, 60px)',
              fontWeight: 800,
              color: '#111111',
              lineHeight: 1.35,
              marginBottom: '24px',
            }}
          >
            آموزش کاربردی
            <br />
            هوش مصنوعی
          </h1>
          <p
            style={{
              fontFamily: vaFont,
              fontSize: '16px',
              color: '#625B55',
              lineHeight: 1.9,
              maxWidth: '520px',
            }}
          >
            Maddy the Techie به متخصصان غیرفنی کمک می‌کند از هوش مصنوعی با وضوح و اعتمادبه‌نفس استفاده کنند — با ابزارهای واقعی و روندهای کاری ساده.
          </p>
        </motion.div>
      </section>

      {/* Mission — pull quote + description */}
      <section
        dir="rtl"
        style={{
          background: '#FAF1E6',
          padding: '72px 24px',
          borderBottom: '0.5px solid #E6D7C8',
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
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  fontWeight: 700,
                  color: '#111111',
                  lineHeight: 1.75,
                  marginBottom: '14px',
                  borderRight: '2px solid #ED5821',
                  paddingRight: '16px',
                }}
              >
                «هوش مصنوعی را برای همه‌ی کسانی که کد نمی‌زنند، کاربردی می‌کنم.»
              </p>
              <p
                style={{
                  fontFamily: vaFont,
                  fontSize: '12px',
                  color: 'rgba(98,91,85,0.50)',
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
                  color: '#625B55',
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

      {/* Beliefs — numbered list */}
      <section
        dir="rtl"
        style={{
          background: '#FFF9F1',
          padding: '72px 24px',
          borderBottom: '0.5px solid #E6D7C8',
        }}
      >
        <motion.div style={{ maxWidth: '640px', margin: '0 auto' }} {...fadeIn}>
          <h2
            style={{
              fontFamily: vaFont,
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontWeight: 800,
              color: '#111111',
              lineHeight: 1.5,
              marginBottom: '40px',
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
                    i < BELIEFS.length - 1 ? '0.5px solid #E6D7C8' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: vaFont,
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#ED5821',
                    flexShrink: 0,
                    width: '22px',
                    textAlign: 'center',
                    marginTop: '2px',
                  }}
                >
                  {['۱', '۲', '۳', '۴'][i]}
                </span>
                <p
                  style={{
                    fontFamily: vaFont,
                    fontSize: '15px',
                    color: '#625B55',
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

      {/* CTA — editorial dark closing panel */}
      <section
        dir="rtl"
        style={{
          background: '#111111',
          padding: '72px 24px',
        }}
      >
        <motion.div
          style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}
          {...fadeIn}
        >
          <h2
            style={{
              fontFamily: vaFont,
              fontSize: 'clamp(20px, 2.8vw, 28px)',
              fontWeight: 800,
              color: '#FFFDF8',
              lineHeight: 1.5,
              marginBottom: '14px',
            }}
          >
            آماده شروع هستی؟
          </h2>
          <p
            style={{
              fontFamily: vaFont,
              fontSize: '14px',
              color: 'rgba(255,255,255,0.52)',
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
                color: '#FFFDF8',
                background: '#3F8DDE',
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
                color: 'rgba(255,255,255,0.65)',
                background: 'rgba(255,255,255,0.07)',
                border: '0.5px solid rgba(255,255,255,0.16)',
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
