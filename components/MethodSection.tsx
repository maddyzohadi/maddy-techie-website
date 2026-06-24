'use client'

import { Zap, Brain } from 'lucide-react'
import { useLocale } from 'next-intl'
import { motion } from 'motion/react'

export default function MethodSection() {
  const locale   = useLocale()
  const isFa     = locale === 'fa'

  const headingFont = isFa ? "'Noto Naskh Arabic', serif" : "'DM Serif Display', serif"
  const bodyFont    = isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif'

  const card1 = {
    badge: isFa ? 'اتوماسیون'       : 'NO-CODE AUTOMATION',
    title: isFa ? 'ابزارها رو به هم وصل کن'  : 'Connect your tools together',
    desc:  isFa
      ? 'یاد می‌گیری چطور Make، Zapier و ChatGPT رو کنار هم بذاری تا کارها خودشون انجام بشن'
      : 'Link Make, Zapier, and ChatGPT so tasks complete themselves — no developer required',
  }

  const card2 = {
    badge: isFa ? 'هوش مصنوعی'     : 'AI IN DAILY WORK',
    title: isFa ? 'هوش مصنوعی رو وارد کارت کن' : 'Put AI inside your workflow',
    desc:  isFa
      ? 'با ابزارهای هوش مصنوعی مثل ChatGPT و Claude کارهای تکراری رو حذف کن و سریع‌تر خروجی بده'
      : 'Use ChatGPT and Claude to cut repetitive work and deliver faster, without sacrificing quality',
  }

  const iconBox: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'rgba(255,106,50,0.08)',
    border: '0.5px solid rgba(255,106,50,0.20)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    flexShrink: 0,
  }

  const cardStyle: React.CSSProperties = {
    background: '#FFF8F1',
    border: '0.5px solid #E7DED2',
    borderRadius: '16px',
    padding: '32px',
  }

  return (
    <section
      style={{
        background: '#F7F3EC',
        padding: '96px 24px',
        borderTop: '0.5px solid rgba(0,0,0,0.06)',
        direction: isFa ? 'rtl' : 'ltr',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span
            className="inline-flex items-center font-ui text-[11px] font-semibold uppercase tracking-[0.12em] mb-4 bg-brand-peach text-brand-charcoal px-3 py-1.5 rounded-full"
          >
            {isFa ? 'روش کار' : 'HOW IT WORKS'}
          </span>
          <h2
            style={{
              fontFamily: headingFont,
              fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: 700,
              color: '#111111',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {isFa
              ? 'از ایده تا اجرا، بدون کدنویسی'
              : 'From idea to execution, without writing code'}
          </h2>
        </div>

        {/* Two cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          <motion.div
            style={cardStyle}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div style={iconBox}>
              <Zap size={20} style={{ color: '#FF6A32' }} />
            </div>
            <span
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#999',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              {card1.badge}
            </span>
            <h3
              style={{
                fontFamily: headingFont,
                fontSize: '22px',
                fontWeight: 700,
                color: '#111111',
                lineHeight: 1.3,
                marginBottom: '12px',
              }}
            >
              {card1.title}
            </h3>
            <p
              style={{
                fontFamily: bodyFont,
                fontSize: '15px',
                color: '#666',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {card1.desc}
            </p>
          </motion.div>

          <motion.div
            style={cardStyle}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div style={iconBox}>
              <Brain size={20} style={{ color: '#FF6A32' }} />
            </div>
            <span
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#999',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              {card2.badge}
            </span>
            <h3
              style={{
                fontFamily: headingFont,
                fontSize: '22px',
                fontWeight: 700,
                color: '#111111',
                lineHeight: 1.3,
                marginBottom: '12px',
              }}
            >
              {card2.title}
            </h3>
            <p
              style={{
                fontFamily: bodyFont,
                fontSize: '15px',
                color: '#666',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {card2.desc}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
