import { CheckCircle2 } from 'lucide-react'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

const ITEMS = [
  'مناسب برای کارهای روزمره',
  'آموزش مرحله به مرحله',
  'تمرین با پروژه واقعی',
  'بدون نیاز به پیش‌زمینه',
]

export default function FaSimpleStart() {
  return (
    <section
      dir="rtl"
      style={{
        background: '#FFF9F1',
        borderTop: '0.5px solid #E6D7C8',
        padding: '72px 24px',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontFamily: vaFont,
            fontSize: '11px',
            fontWeight: 600,
            color: '#ED5821',
            background: 'rgba(237,88,33,0.09)',
            border: '0.5px solid rgba(237,88,33,0.20)',
            borderRadius: '100px',
            padding: '4px 14px',
            marginBottom: '20px',
          }}
        >
          شروع ساده
        </span>
        <h2
          style={{
            fontFamily: vaFont,
            fontSize: 'clamp(20px, 2.8vw, 30px)',
            fontWeight: 800,
            color: '#111111',
            lineHeight: 1.55,
            marginBottom: '12px',
          }}
        >
          مسیر <span style={{ color: '#3F8DDE' }}>ساده</span> برای شروع
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
          با چند قدم ساده می‌توانی اولین سیستم کاری خودت را بسازی
        </p>
        <ul
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            gap: '14px',
            listStyle: 'none',
            margin: '0 auto',
            padding: 0,
            textAlign: 'right',
          }}
        >
          {ITEMS.map((item) => (
            <li
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: vaFont,
                fontSize: '15px',
                color: '#111111',
              }}
            >
              <CheckCircle2 size={18} style={{ color: '#3F8DDE', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
