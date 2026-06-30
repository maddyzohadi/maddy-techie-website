import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

export default function FaHomeCta() {
  return (
    <section
      dir="rtl"
      style={{
        background: '#FAF1E6',
        borderTop: '0.5px solid #E6D7C8',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: vaFont,
            fontSize: 'clamp(20px, 2.8vw, 30px)',
            fontWeight: 800,
            color: '#111111',
            lineHeight: 1.55,
            marginBottom: '14px',
          }}
        >
          شروع ساده با یک سیستم کاربردی
        </h2>
        <p
          style={{
            fontFamily: vaFont,
            fontSize: '15px',
            color: '#625B55',
            lineHeight: 1.9,
            marginBottom: '36px',
          }}
        >
          اگر می‌خواهی کارهای روزمره‌ات را با هوش مصنوعی و اتوماسیون ساده‌تر کنی از همین جا شروع کن
        </p>
        <Link
          href="/services"
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
            gap: '8px',
          }}
        >
          شروع پروژه
          <ArrowRight size={15} style={{ transform: 'rotate(180deg)' }} />
        </Link>
      </div>
    </section>
  )
}
