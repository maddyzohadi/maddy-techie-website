import { getTranslations } from 'next-intl/server'

const INSTAGRAM_URL = 'https://instagram.com/maddythetechie'

// Inline SVG — lucide-react removed brand icons
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default async function InstagramSection() {
  const t = await getTranslations('instagram')

  return (
    <section
      className="py-14 md:py-16 relative overflow-hidden"
      style={{ background: '#04080F', borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(167,139,250,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
        <p
          className="font-body text-xs font-semibold uppercase tracking-[0.20em] mb-4"
          style={{ color: '#A78BFA' }}
        >
          {t('eyebrow')}
        </p>

        <p
          className="font-body text-base md:text-lg leading-relaxed mb-7"
          style={{ color: '#9DB0C8', maxWidth: '440px', margin: '0 auto 28px' }}
        >
          {t('body')}
        </p>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body font-semibold inline-flex items-center gap-2.5 transition-all duration-200"
          style={{
            padding: '12px 26px',
            borderRadius: '999px',
            fontSize: '15px',
            color: '#EEF2F8',
            border: '1px solid rgba(167,139,250,0.30)',
            background: 'rgba(167,139,250,0.08)',
          }}
          onMouseEnter={undefined}
        >
          <InstagramIcon size={16} />
          {t('cta')}
        </a>
      </div>
    </section>
  )
}
