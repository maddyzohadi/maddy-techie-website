import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export default function FaHomeCta() {
  return (
    <section
      className="py-20 md:py-24 relative"
      style={{ background: '#E9DFFF', borderTop: '1px solid #D8CFF0' }}
    >
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-5"
          style={{ color: '#171321', letterSpacing: '-0.025em' }}
        >
          شروع ساده با یک سیستم کاربردی
        </h2>
        <p
          className="font-body text-lg md:text-xl leading-relaxed mb-10"
          style={{ color: '#5B536A' }}
        >
          اگر می‌خواهی کارهای روزمره‌ات را با هوش مصنوعی و اتوماسیون ساده‌تر کنی از همین جا شروع کن
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2.5 font-body font-medium text-base px-9 py-4"
          style={{
            borderRadius: '4px',
            background: '#8B5CF6',
            color: '#ffffff',
            border: '1px solid #6D28D9',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(109,40,217,0.20)',
          }}
        >
          شروع پروژه
          <ArrowRight size={16} className="rotate-180" />
        </Link>
      </div>
    </section>
  )
}
