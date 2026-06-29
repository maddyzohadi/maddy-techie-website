import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export default function FaHomeCta() {
  return (
    <section
      className="pt-20 md:pt-24 pb-0 relative"
      style={{ background: 'linear-gradient(135deg, #F5ECE0 0%, #F2C1D1 60%, #EFE7DC 100%)', borderTop: '0.5px solid #D8C7B8' }}
    >
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="font-fa font-bold text-3xl md:text-4xl leading-tight mb-5"
          style={{ color: '#111111', letterSpacing: '-0.025em' }}
        >
          شروع ساده با یک سیستم کاربردی
        </h2>
        <p
          className="font-fa text-lg md:text-xl leading-relaxed mb-10"
          style={{ color: '#5A504A' }}
        >
          اگر می‌خواهی کارهای روزمره‌ات را با هوش مصنوعی و اتوماسیون ساده‌تر کنی از همین جا شروع کن
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2.5 font-fa font-semibold text-base px-9 py-4 rounded-full text-white no-underline bg-brand-orange hover:bg-brand-coral transition-colors duration-150"
        >
          شروع پروژه
          <ArrowRight size={16} className="rotate-180" />
        </Link>
      </div>
    </section>
  )
}
