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
      style={{ background: '#F5ECE0', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className="inline-flex items-center font-ui text-xs font-semibold uppercase tracking-[0.14em] mb-4 bg-brand-peach text-brand-charcoal px-3 py-1.5 rounded-full"
        >
          شروع ساده
        </span>
        <h2
          className="font-fa font-bold text-3xl md:text-4xl leading-tight mb-4"
          style={{ color: '#111111', letterSpacing: '-0.025em' }}
        >
          مسیر <span style={{ color: '#B53389' }}>ساده</span> برای شروع
        </h2>
        <p
          className="font-fa text-lg md:text-xl leading-relaxed mb-10"
          style={{ color: '#5A504A' }}
        >
          با چند قدم ساده می‌توانی اولین سیستم کاری خودت را بسازی
        </p>
        <ul className="inline-flex flex-col gap-4 text-right">
          {ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 font-fa text-base md:text-lg"
              style={{ color: '#111111' }}
            >
              <CheckCircle2 size={20} style={{ color: '#B53389', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
