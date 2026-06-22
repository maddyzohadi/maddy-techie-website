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
      style={{ background: '#eeefe9', borderTop: '1px solid #d2d3cc' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className="inline-block font-body text-sm font-semibold uppercase tracking-[0.22em] mb-4"
          style={{ color: '#65675e' }}
        >
          شروع ساده
        </span>
        <h2
          className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-4"
          style={{ color: '#111827', letterSpacing: '-0.025em' }}
        >
          مسیر ساده برای شروع
        </h2>
        <p
          className="font-body text-lg md:text-xl leading-relaxed mb-10"
          style={{ color: '#4d4f46' }}
        >
          با چند قدم ساده می‌توانی اولین سیستم کاری خودت را بسازی
        </p>
        <ul className="inline-flex flex-col gap-4 text-right">
          {ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-3 font-body text-base md:text-lg" style={{ color: '#4d4f46' }}>
              <CheckCircle2 size={20} style={{ color: '#2f80fa', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
