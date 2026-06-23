import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

const stageNodes = [
  { title: 'جمع‌آوری',  sub: 'اطلاعات',                  top: '236px', delay: '0s' },
  { title: 'سازماندهی', sub: 'مرتب‌سازی با هوش مصنوعی',  top: '340px', delay: '.6s' },
  { title: 'اتوماسیون', sub: 'اجرای خودکار',              top: '444px', delay: '1.2s' },
  { title: 'تحویل',     sub: 'نتیجه آماده',               top: '548px', delay: '1.8s' },
]

const cardStyle = {
  background: 'rgba(123,47,190,0.12)',
  border: '0.5px solid rgba(123,47,190,0.3)',
  borderRadius: '12px',
} as const

export default async function HeroFa() {
  const t = await getTranslations('hero')

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center"
      style={{ background: '#1A1A2E' }}
    >
      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 lg:px-14 pt-28 pb-20">
        <div className="flex items-center gap-10">

          {/* ── Copy column ─────────────────────────────── */}
          <div style={{ flex: '1 1 0', minWidth: 0, maxWidth: '600px' }}>

            {/* Badge */}
            <div className="badge mb-8" style={{ display: 'inline-flex' }}>
              <span className="badge-dot" aria-hidden />
              {t('badge')}
            </div>

            {/* H1 — one word in champagne */}
            <h1
              className="font-fa mb-5"
              style={{
                fontSize: 'clamp(32px, 3.2vw, 50px)',
                lineHeight: 1.4,
                fontWeight: 700,
                color: '#F5F0E8',
              }}
            >
              {t('title')}
            </h1>

            {/* Subtitle */}
            <p
              className="font-fa mb-6"
              style={{
                fontSize: 'clamp(16px, 1.8vw, 22px)',
                lineHeight: 1.55,
                fontWeight: 600,
                color: '#F5F0E8',
              }}
            >
              {t('titleLine2')}
            </p>

            {/* Body copy */}
            <p
              className="font-fa mb-10"
              style={{ fontSize: '17px', lineHeight: 1.9, color: 'rgba(245,240,232,0.60)', maxWidth: '440px' }}
            >
              {t('subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-9">
              <Link
                href="/services"
                className="font-fa inline-flex items-center gap-2 transition-opacity duration-150 hover:opacity-88"
                style={{
                  padding: '10px 22px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#ffffff',
                  background: '#7B2FBE',
                  border: 'none',
                  textDecoration: 'none',
                }}
              >
                {t('ctaPrimary')}
                <ArrowRight size={15} className="rotate-180" />
              </Link>
              <Link
                href="/services"
                className="font-fa inline-flex items-center gap-2 transition-opacity duration-150 hover:opacity-80"
                style={{
                  padding: '10px 22px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(245,240,232,0.80)',
                  background: 'transparent',
                  border: '0.5px solid rgba(245,240,232,0.25)',
                  textDecoration: 'none',
                }}
              >
                {t('ctaSecondary')}
              </Link>
            </div>

            {/* Byline */}
            <div className="flex items-center gap-3" style={{ fontSize: '13.5px', color: 'rgba(245,240,232,0.55)' }}>
              <div
                aria-hidden
                className="flex-shrink-0 flex items-center justify-center font-fa font-semibold"
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(123,47,190,0.12)',
                  border: '0.5px solid rgba(123,47,190,0.3)',
                  fontSize: '14px', color: '#F5F0E8',
                }}
              >
                م
              </div>
              <span className="font-fa" style={{ lineHeight: 1.9 }}>
                {t('byline')}
              </span>
            </div>
          </div>

          {/* ── Visual column ────────────────────────────── */}
          <div className="hidden xl:flex flex-shrink-0 justify-center items-center">
            <div style={{ position: 'relative', width: '680px', height: '700px' }}>

              {/* SVG connector — solid stroke, no gradient */}
              <svg
                aria-hidden
                width="680" height="700" viewBox="0 0 680 700"
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
              >
                <path
                  d="M 200 200 C 300 250, 300 210, 360 258"
                  fill="none"
                  stroke="rgba(123,47,190,0.40)"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  style={{ animation: 'mhDash 6s linear infinite' }}
                />
              </svg>

              {/* "Before" messy cards — Persian */}
              {([
                { rot: '-6deg', top: '24px',  left: '24px',  w: '148px', text: 'پیام ایمیل',        bar: true,  delay: '0s',   blur: '.2px', pad: '13px 15px', fs: '13px' },
                { rot:  '5deg', top: '62px',  left: '196px', w: '138px', text: 'تماس با مشتری',     bar: false, delay: '.6s',  blur: '.3px', pad: '13px 15px', fs: '13px' },
                { rot: '-3deg', top: '150px', left: '62px',  w: '156px', text: 'کجا بود آن فایل',   bar: true,  delay: '1.1s', blur: '.2px', pad: '13px 15px', fs: '13px' },
                { rot:  '9deg', top: '118px', left: '248px', w: '120px', text: 'پیگیری دوشنبه',    bar: false, delay: '.3s',  blur: '.4px', pad: '11px 14px', fs: '12.5px' },
              ] as const).map((c, i) => (
                <div
                  key={i}
                  aria-hidden
                  style={{
                    '--rot': c.rot,
                    position: 'absolute', top: c.top, left: c.left, width: c.w,
                    padding: c.pad, borderRadius: '8px',
                    background: 'rgba(26,26,46,0.80)',
                    border: '0.5px dashed rgba(123,47,190,0.35)',
                    backdropFilter: 'blur(3px)',
                    transform: `rotate(${c.rot})`,
                    color: 'rgba(245,240,232,0.50)', fontSize: c.fs,
                    filter: `blur(${c.blur})`,
                    animation: `mhDrift ${7.5 + i * 0.5}s ease-in-out infinite ${c.delay}`,
                  } as React.CSSProperties}
                >
                  {c.bar && (
                    <div style={{ height: '5px', width: '60%', background: 'rgba(123,47,190,0.35)', borderRadius: '3px', marginBottom: '7px' }} />
                  )}
                  {c.text}
                </div>
              ))}

              {/* Workflow spine — solid */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', left: '359px', top: '252px',
                  width: '1.5px', height: '340px',
                  background: '#7B2FBE',
                  borderRadius: '2px', opacity: 0.45,
                }}
              />

              {/* Traveling pulse dot — no shadow */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', left: '351px',
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: '#7B2FBE',
                  animation: 'mhTravel 5s ease-in-out infinite',
                }}
              />

              {/* Accent card — tasks sorted */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', top: '356px', left: '128px',
                  padding: '10px 14px',
                  ...cardStyle,
                  display: 'flex', alignItems: 'center', gap: '9px',
                  animation: 'mhFloatA 6s ease-in-out infinite',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: '18px', height: '18px', borderRadius: '6px',
                    background: '#7B2FBE',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '11px', fontWeight: 700, flexShrink: 0,
                  }}
                >✓</span>
                <span className="font-fa whitespace-nowrap" style={{ fontSize: '13px', color: '#F5F0E8', fontWeight: 600 }}>
                  ۱۲ کار مرتب‌شده
                </span>
              </div>

              {/* Accent card — draft ready */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', top: '498px', left: '104px',
                  padding: '10px 14px',
                  ...cardStyle,
                  display: 'flex', alignItems: 'center', gap: '9px',
                  animation: 'mhFloatB 7s ease-in-out infinite .9s',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: '18px', height: '18px', borderRadius: '6px',
                    background: 'rgba(232,184,109,0.15)',
                    border: '0.5px solid rgba(232,184,109,0.40)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: '#E8B86D', fontSize: '11px', fontWeight: 700, flexShrink: 0,
                  }}
                >↗</span>
                <span className="font-fa whitespace-nowrap" style={{ fontSize: '13px', color: '#F5F0E8', fontWeight: 600 }}>
                  پیش‌نویس آماده‌ی ارسال
                </span>
              </div>

              {/* Stage nodes */}
              {stageNodes.map((node, i) => (
                <div key={i} style={{ position: 'absolute', left: '392px', width: '272px', top: node.top }}>
                  {/* Spine badge */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute', left: '-41px', top: '18px',
                      width: '34px', height: '34px',
                      ...cardStyle,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      animation: 'mhRing 4s ease-in-out infinite',
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7B2FBE', display: 'inline-block' }} />
                  </div>
                  {/* Card */}
                  <div
                    style={{
                      padding: '16px 18px',
                      ...cardStyle,
                      animation: `mhFloatA 7s ease-in-out infinite ${node.delay}`,
                    }}
                  >
                    <div className="font-fa" style={{ fontSize: '15.5px', fontWeight: 700, color: '#F5F0E8', marginBottom: '3px' }}>
                      {node.title}
                    </div>
                    <div className="font-fa" style={{ fontSize: '13px', color: 'rgba(245,240,232,0.55)', lineHeight: 1.6 }}>
                      {node.sub}
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
