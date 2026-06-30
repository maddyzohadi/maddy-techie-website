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
      {/* Hero — dark premium */}
      <section
        dir="rtl"
        style={{
          background: '#351C1C',
          padding: '72px 24px 80px',
        }}
      >
        <motion.div
          style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}
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
            {t('heroBadge')}
          </p>
          <h1
            style={{
              fontFamily: vaFont,
              fontSize: 'clamp(22px, 3.5vw, 38px)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.5,
              marginBottom: '18px',
            }}
          >
            {t('heroTitle')}
          </h1>
          <p
            style={{
              fontFamily: vaFont,
              fontSize: '15px',
              color: 'rgba(239,231,220,0.72)',
              lineHeight: 1.9,
              maxWidth: '440px',
              margin: '0 auto 32px',
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
              color: '#FFFFFF',
              background: '#4B92DB',
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
          background: '#F5ECE0',
          padding: '72px 24px',
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
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
                    i < SERVICES.length - 1 ? '0.5px solid #D8C7B8' : 'none',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(75,146,219,0.07)',
                    border: '0.5px solid rgba(75,146,219,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                  }}
                >
                  <Icon size={18} style={{ color: '#4B92DB' }} />
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
                      color: '#5A504A',
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
                      color: '#4B92DB',
                      textDecoration: 'none',
                      opacity: 0.9,
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
          background: '#EFE7DC',
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
              marginBottom: '10px',
              textAlign: 'center',
            }}
          >
            {t('howBadge')}
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
            {t('howTitle')}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
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
                  borderBottom: i < arr.length - 1 ? '0.5px solid #D8C7B8' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: vaFont,
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#C08064',
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
                      color: '#5A504A',
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
          background: '#F5ECE0',
          padding: '72px 24px',
          borderTop: '0.5px solid #D8C7B8',
        }}
      >
        <motion.div style={{ maxWidth: '560px', margin: '0 auto' }} {...fadeIn}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: vaFont,
                fontSize: 'clamp(17px, 2.2vw, 24px)',
                fontWeight: 700,
                color: '#111111',
                lineHeight: 1.6,
                marginBottom: '10px',
              }}
            >
              {t('formTitle')}
            </h2>
            <p
              style={{
                fontFamily: vaFont,
                fontSize: '14px',
                color: '#5A504A',
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
