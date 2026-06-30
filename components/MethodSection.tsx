'use client'

import { Zap, Sparkles } from 'lucide-react'
import { useLocale } from 'next-intl'
import { motion } from 'motion/react'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

const FA_CARDS = [
  {
    Icon: Sparkles,
    badge: 'کاربرد عملی هوش مصنوعی',
    title: 'هوش مصنوعی را وارد کارهای روزمره‌ات کن',
    desc:  'با Claude و ChatGPT برای نوشتن، خلاصه‌سازی، برنامه‌ریزی و کارهای فکری ساده‌تر کار کن.',
  },
  {
    Icon: Zap,
    badge: 'اتوماسیون بدون کدنویسی',
    title: 'کارهای تکراری را ساده کن',
    desc:  'با Claude، ChatGPT و Google Sheets مسیرهای کاری سبک بساز، بدون اینکه وارد کدنویسی شوی.',
  },
]

const EN_CARDS = [
  {
    Icon: Zap,
    badge: 'NO-CODE AUTOMATION',
    title: 'Connect your tools together',
    desc:  'Link Make, Zapier, and ChatGPT so tasks complete themselves — no developer required.',
  },
  {
    Icon: Sparkles,
    badge: 'AI IN DAILY WORK',
    title: 'Put AI inside your workflow',
    desc:  'Use ChatGPT and Claude to handle thinking tasks — drafts, summaries, and plans.',
  },
]

export default function MethodSection() {
  const locale = useLocale()
  const isFa   = locale === 'fa'

  const headingFont = isFa ? vaFont : "'DM Serif Display', serif"
  const bodyFont    = isFa ? vaFont : 'system-ui, sans-serif'
  const cards       = isFa ? FA_CARDS : EN_CARDS

  const iconBox: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'rgba(63,141,222,0.06)',
    border: '0.5px solid rgba(63,141,222,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    flexShrink: 0,
  }

  const cardStyle: React.CSSProperties = {
    background: '#FAF1E6',
    border: '0.5px solid #E6D7C8',
    borderRadius: '14px',
    padding: '28px',
  }

  return (
    <section
      style={{
        background: '#FFF9F1',
        padding: '64px 24px',
        borderTop: '0.5px solid #E6D7C8',
        direction: isFa ? 'rtl' : 'ltr',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: isFa ? vaFont : 'system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: isFa ? undefined : '0.12em',
              textTransform: isFa ? 'none' : 'uppercase',
              color: '#625B55',
              background: '#FAF1E6',
              padding: '5px 12px',
              borderRadius: '100px',
              marginBottom: '16px',
            }}
          >
            {isFa ? 'روش کار' : 'HOW IT WORKS'}
          </span>
          <h2
            style={{
              fontFamily: headingFont,
              fontSize: 'clamp(22px, 2.8vw, 34px)',
              fontWeight: 700,
              color: '#111111',
              lineHeight: isFa ? 1.5 : 1.2,
              letterSpacing: isFa ? undefined : '-0.02em',
              margin: '0 auto',
            }}
          >
            {isFa
              ? 'از ایده تا اجرای عملی، بدون نیاز به کدنویسی'
              : 'From idea to execution, without writing code'}
          </h2>
        </div>

        {/* Two cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            maxWidth: '860px',
            margin: '0 auto',
          }}
        >
          {cards.map((card) => {
            const { Icon, badge, title, desc } = card
            return (
              <motion.div
                key={badge}
                style={cardStyle}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.07)' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div style={iconBox}>
                  <Icon size={20} style={{ color: '#3F8DDE' }} />
                </div>
                <span
                  style={{
                    fontFamily: isFa ? vaFont : 'system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: isFa ? undefined : '0.1em',
                    textTransform: isFa ? 'none' : 'uppercase',
                    color: '#625B55',
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  {badge}
                </span>
                <h3
                  style={{
                    fontFamily: headingFont,
                    fontSize: isFa ? '20px' : '22px',
                    fontWeight: 700,
                    color: '#111111',
                    lineHeight: isFa ? 1.55 : 1.3,
                    marginBottom: '10px',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: bodyFont,
                    fontSize: '15px',
                    color: '#625B55',
                    lineHeight: isFa ? 1.85 : 1.7,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
