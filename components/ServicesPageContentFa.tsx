'use client'

import { Zap, MessageSquare, PenLine, LayoutGrid } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import ServiceInquiryForm from '@/components/ServiceInquiryForm'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: 'easeOut' },
} as const

const SERVICES = [
  { Icon: Zap,           titleKey: 'svc1title' as const, descKey: 'svc1desc' as const, ctaKey: 'svc1cta' as const },
  { Icon: MessageSquare, titleKey: 'svc2title' as const, descKey: 'svc2desc' as const, ctaKey: 'svc2cta' as const },
  { Icon: PenLine,       titleKey: 'svc3title' as const, descKey: 'svc3desc' as const, ctaKey: 'svc3cta' as const },
  { Icon: LayoutGrid,    titleKey: 'svc4title' as const, descKey: 'svc4desc' as const, ctaKey: 'svc4cta' as const },
] as const

export default function ServicesPageContentFa() {
  const t = useTranslations('servicesPageFa')

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
            {t('heroBadge')}
          </p>
          <h1
            style={{
              fontFamily: vaFont,
              fontSize: 'clamp(30px, 5vw, 56px)',
              fontWeight: 800,
              color: '#111111',
              lineHeight: 1.35,
              marginBottom: '22px',
            }}
          >
            {t('heroTitle')}
          </h1>
          <p
            style={{
              fontFamily: vaFont,
              fontSize: '16px',
              color: '#625B55',
              lineHeight: 1.9,
              maxWidth: '480px',
              marginBottom: '36px',
            }}
          >
            {t('heroSubtitle')}
          </p>
          <a
            href="#contact-form"
            style={{
              fontFamily: vaFont,
              fontSize: '14px',
              fontWeight: 600,
              color: '#FFFDF8',
              background: '#3F8DDE',
              padding: '12px 28px',
              borderRadius: '100px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {t('heroCta')}
          </a>
        </motion.div>
      </section>

      {/* Services — list with dividers */}
      <section
        dir="rtl"
        style={{
          background: '#FFF9F1',
          padding: '64px 24px',
          borderBottom: '0.5px solid #E6D7C8',
        }}
      >
        <motion.div style={{ maxWidth: '680px', margin: '0 auto' }} {...fadeIn}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {SERVICES.map(({ Icon, titleKey, descKey, ctaKey }, i) => (
              <li
                key={titleKey}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px',
                  padding: '28px 0',
                  borderBottom:
                    i < SERVICES.length - 1 ? '0.5px solid #E6D7C8' : 'none',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(156,204,239,0.12)',
                    border: '0.5px solid rgba(156,204,239,0.28)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                  }}
                >
                  <Icon size={17} style={{ color: '#3F8DDE' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontFamily: vaFont,
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#111111',
                      lineHeight: 1.5,
                      marginBottom: '6px',
                    }}
                  >
                    {t(titleKey)}
                  </h2>
                  <p
                    style={{
                      fontFamily: vaFont,
                      fontSize: '14px',
                      color: '#625B55',
                      lineHeight: 1.85,
                      margin: '0 0 10px',
                    }}
                  >
                    {t(descKey)}
                  </p>
                  <a
                    href="#contact-form"
                    style={{
                      fontFamily: vaFont,
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#3F8DDE',
                      textDecoration: 'none',
                    }}
                  >
                    {t(ctaKey)} ←
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Process — 3 steps */}
      <section
        dir="rtl"
        style={{
          background: '#FAF1E6',
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
            {t('howTitle')}
          </h2>

          <div>
            {[
              { num: t('step1num'), title: t('step1title'), desc: t('step1desc') },
              { num: t('step2num'), title: t('step2title'), desc: t('step2desc') },
              { num: t('step3num'), title: t('step3title'), desc: t('step3desc') },
            ].map((step, i, arr) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '20px',
                  padding: '24px 0',
                  borderBottom: i < arr.length - 1 ? '0.5px solid #E6D7C8' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: vaFont,
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#ED5821',
                    flexShrink: 0,
                    width: '28px',
                    textAlign: 'center',
                    marginTop: '2px',
                  }}
                >
                  {step.num}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: vaFont,
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#111111',
                      lineHeight: 1.5,
                      marginBottom: '5px',
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    style={{
                      fontFamily: vaFont,
                      fontSize: '13px',
                      color: '#625B55',
                      lineHeight: 1.85,
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact form */}
      <section
        id="contact-form"
        dir="rtl"
        style={{
          background: '#FFF9F1',
          padding: '72px 24px',
        }}
      >
        <motion.div style={{ maxWidth: '560px', margin: '0 auto' }} {...fadeIn}>
          <div style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: vaFont,
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                fontWeight: 800,
                color: '#111111',
                lineHeight: 1.5,
                marginBottom: '8px',
              }}
            >
              {t('formTitle')}
            </h2>
            <p
              style={{
                fontFamily: vaFont,
                fontSize: '14px',
                color: '#625B55',
                lineHeight: 1.85,
              }}
            >
              {t('formSubtitle')}
            </p>
          </div>
          <ServiceInquiryForm />
        </motion.div>
      </section>
    </>
  )
}
