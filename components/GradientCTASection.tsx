import { getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function GradientCTASection() {
  const locale      = await getLocale()
  const isFa        = locale === 'fa'
  const headingFont = isFa ? "'Noto Naskh Arabic', serif" : "'DM Serif Display', serif"
  const bodyFont    = isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif'

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #E8D5F0 0%, #F5C5D0 50%, #F0D5C0 100%)',
        padding: '96px 24px',
        direction: isFa ? 'rtl' : 'ltr',
      }}
    >
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '48px',
            textAlign: 'center',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          }}
        >
          <h2
            style={{
              fontFamily: headingFont,
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            {isFa ? 'آماده‌ای شروع کنی؟' : 'Ready to get started?'}
          </h2>

          <p
            style={{
              fontFamily: bodyFont,
              fontSize: '16px',
              color: '#666',
              lineHeight: 1.7,
              maxWidth: '420px',
              margin: '0 auto 32px',
            }}
          >
            {isFa
              ? 'اگه میخوای کارهای روزمره‌ات رو با هوش مصنوعی ساده‌تر کنی از همینجا شروع کن'
              : "If you want to simplify your daily work with AI, this is where you start"}
          </p>

          <Link
            href="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#1A1A1A',
              color: '#fff',
              fontFamily: bodyFont,
              fontSize: '15px',
              fontWeight: 600,
              padding: '14px 32px',
              borderRadius: '100px',
              textDecoration: 'none',
            }}
          >
            {isFa ? 'شروع پروژه ←' : 'Start a Project →'}
          </Link>
        </div>
      </div>
    </section>
  )
}
