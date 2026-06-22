import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export default function FaHomeCta() {
  return (
    <section
      className="py-20 md:py-24 relative"
      style={{ background: '#eeefe9', borderTop: '1px solid #d2d3cc' }}
    >
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-5"
          style={{ color: '#111827', letterSpacing: '-0.025em' }}
        >
          شروع ساده با یک سیستم کاربردی
        </h2>
        <p
          className="font-body text-lg md:text-xl leading-relaxed mb-10"
          style={{ color: '#4d4f46' }}
        >
          اگر می‌خواهی کارهای روزمره‌ات را با هوش مصنوعی و اتوماسیون ساده‌تر کنی از همین جا شروع کن
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2.5 font-body font-medium text-base px-9 py-4"
          style={{
            borderRadius: '4px',
            background: '#f1a82c',
            color: '#000000',
            border: '1px solid #b17816',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(177,120,22,0.20)',
          }}
        >
          شروع پروژه
          <ArrowRight size={16} className="rotate-180" />
        </Link>
      </div>
    </section>
  )
}
