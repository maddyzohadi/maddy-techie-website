import { CheckCircle2 } from 'lucide-react'

const ITEMS = [
  'مناسب برای کارهای روزمره',
  'آموزش مرحله به مرحله',
  'تمرین با پروژه واقعی',
  'بدون نیاز به پیش‌زمینه',
]

export default function FaSimpleStart() {
  return (
    <section
      className="py-20 md:py-24 relative"
      style={{ background: '#F5F0E8', borderTop: '0.5px solid rgba(123,47,190,0.15)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className="inline-block font-ui text-sm font-semibold uppercase tracking-[0.22em] mb-4"
          style={{ color: 'rgba(26,26,46,0.50)' }}
        >
          شروع ساده
        </span>
        <h2
          className="font-fa font-bold text-3xl md:text-4xl leading-tight mb-4"
          style={{ color: '#1A1A2E', letterSpacing: '-0.025em' }}
        >
          مسیر ساده برای شروع
        </h2>
        <p
          className="font-fa text-lg md:text-xl leading-relaxed mb-10"
          style={{ color: 'rgba(26,26,46,0.60)' }}
        >
          با چند قدم ساده می‌توانی اولین سیستم کاری خودت را بسازی
        </p>
        <ul className="inline-flex flex-col gap-4 text-right">
          {ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 font-fa text-base md:text-lg"
              style={{ color: 'rgba(26,26,46,0.60)' }}
            >
              <CheckCircle2 size={20} style={{ color: '#1A1A2E', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
