import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export default function FaHomeCta() {
  return (
    <section
      className="py-20 md:py-24 relative"
      style={{ background: '#1A1A2E', borderTop: '0.5px solid rgba(245,240,232,0.10)' }}
    >
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="font-fa font-bold text-3xl md:text-4xl leading-tight mb-5"
          style={{ color: '#F5F0E8', letterSpacing: '-0.025em' }}
        >
          شروع ساده با یک سیستم کاربردی
        </h2>
        <p
          className="font-fa text-lg md:text-xl leading-relaxed mb-10"
          style={{ color: 'rgba(245,240,232,0.60)' }}
        >
          اگر می‌خواهی کارهای روزمره‌ات را با هوش مصنوعی و اتوماسیون ساده‌تر کنی از همین جا شروع کن
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2.5 font-fa font-semibold text-base px-9 py-4"
          style={{
            borderRadius: '8px',
            background: '#7B2FBE',
            color: '#ffffff',
            textDecoration: 'none',
          }}
        >
          شروع پروژه
          <ArrowRight size={16} className="rotate-180" />
        </Link>
      </div>
    </section>
  )
}
