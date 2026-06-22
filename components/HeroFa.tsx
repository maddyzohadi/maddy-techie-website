import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

const stageNodes = [
  { title: 'جمع‌آوری',  sub: 'اطلاعات',                  top: '236px', delay: '0s',   accent: { bg: '#E9DFFF', border: '#D8CFF0', dot: '#8B5CF6' } },
  { title: 'سازماندهی', sub: 'مرتب‌سازی با هوش مصنوعی',  top: '340px', delay: '.6s',  accent: { bg: '#E9DFFF', border: '#D8CFF0', dot: '#8B5CF6' } },
  { title: 'اتوماسیون', sub: 'اجرای خودکار',              top: '444px', delay: '1.2s', accent: { bg: '#E9DFFF', border: '#D8CFF0', dot: '#8B5CF6' } },
  { title: 'تحویل',     sub: 'نتیجه آماده',               top: '548px', delay: '1.8s', accent: { bg: '#E9DFFF', border: '#D8CFF0', dot: '#8B5CF6' } },
]

export default async function HeroFa() {
  const t = await getTranslations('hero')

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex flex-col justify-center"
      style={{ background: '#F5F0FF' }}
    >
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(139,92,246,.06) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          opacity: 0.8,
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(120% 120% at 50% 0%, transparent 55%, rgba(240,233,255,.70) 100%)' }}
      />

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 lg:px-14 pt-28 pb-20">
        <div className="flex items-center gap-10">

          {/* ── Left column: copy ─────────────────────────── */}
          <div style={{ flex: '1 1 0', minWidth: 0, maxWidth: '600px' }}>

            {/* Eyebrow pill */}
            <div
              className="inline-flex items-center gap-2.5 mb-8"
              style={{
                padding: '7px 14px',
                border: '1px solid #D8CFF0',
                borderRadius: '9999px',
                background: '#E9DFFF',
              }}
            >
              <span
                aria-hidden
                style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#8B5CF6',
                  boxShadow: '0 0 8px rgba(47,128,250,0.45)',
                  flexShrink: 0, display: 'inline-block',
                }}
              />
              <span
                className="font-body"
                style={{ fontSize: '12px', letterSpacing: '.16em', fontWeight: 600, color: '#5B536A' }}
              >
                {t('badge')}
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-heading font-bold mb-5"
              style={{
                fontSize: 'clamp(36px, 3.2vw, 54px)',
                lineHeight: 1.1,
                letterSpacing: '-.025em',
                color: '#171321',
              }}
            >
              {t('title')}
            </h1>

            {/* Subtitle line */}
            <p
              className="font-heading font-semibold mb-6"
              style={{
                fontSize: 'clamp(17px, 1.8vw, 24px)',
                lineHeight: 1.3,
                color: '#171321',
              }}
            >
              {t('titleLine2')}
            </p>

            {/* Body copy */}
            <p
              className="font-body mb-10"
              style={{ fontSize: '18px', lineHeight: 1.6, color: '#5B536A', maxWidth: '440px' }}
            >
              {t('subtitle')}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-3.5 mb-9">
              <Link
                href="/services"
                className="font-body inline-flex items-center gap-2.5"
                style={{
                  padding: '13px 28px',
                  borderRadius: '4px',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#000000',
                  background: '#8B5CF6',
                  border: '1px solid #6D28D9',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(109,40,217,0.20)',
                }}
              >
                {t('ctaPrimary')}
                <ArrowRight size={16} className="rotate-180" />
              </Link>

              <Link
                href="/services"
                className="font-body inline-flex items-center gap-2.5"
                style={{
                  padding: '13px 22px',
                  borderRadius: '4px',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#5B536A',
                  border: '1px solid #D8CFF0',
                  background: '#E9DFFF',
                  textDecoration: 'none',
                }}
              >
                {t('ctaSecondary')}
              </Link>
            </div>

            {/* Byline */}
            <div className="flex items-center gap-3" style={{ color: '#5B536A', fontSize: '13.5px' }}>
              <div
                aria-hidden
                className="flex-shrink-0 flex items-center justify-center font-body font-semibold"
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: '#E9DFFF',
                  border: '1px solid #D8CFF0',
                  fontSize: '14px', color: '#171321',
                }}
              >
                M
              </div>
              <span className="font-body" style={{ lineHeight: 1.6 }}>
                {t('byline')}
              </span>
            </div>
          </div>

          {/* ── Right column: stage visual ─── */}
          <div className="hidden xl:flex flex-shrink-0 justify-center items-center">
            <div style={{ position: 'relative', width: '680px', height: '700px' }}>

              {/* Glow blobs */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', top: '-60px', left: '90px',
                  width: '380px', height: '380px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(139,92,246,.10), transparent 65%)',
                  filter: 'blur(70px)',
                  animation: 'mhGlow 7s ease-in-out infinite',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute', bottom: '-40px', right: '30px',
                  width: '340px', height: '340px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(109,40,217,.08), transparent 65%)',
                  filter: 'blur(75px)',
                  animation: 'mhGlow 9s ease-in-out infinite .8s',
                }}
              />

              {/* SVG connector */}
              <svg
                aria-hidden
                width="680"
                height="700"
                viewBox="0 0 680 700"
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
              >
                <defs>
                  <linearGradient id="mhConnLineFa" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0"   stopColor="#8B5CF6" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#8B5CF6" stopOpacity=".35" />
                    <stop offset="1"   stopColor="#8B5CF6" stopOpacity=".5" />
                  </linearGradient>
                </defs>
                <path
                  d="M 200 200 C 300 250, 300 210, 360 258"
                  fill="none"
                  stroke="url(#mhConnLineFa)"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  style={{ animation: 'mhDash 6s linear infinite' }}
                />
              </svg>

              {/* Messy "before" cards */}
              <div aria-hidden style={{ '--rot': '-6deg', position: 'absolute', top: '24px', left: '24px', width: '148px', padding: '13px 15px', borderRadius: '4px', background: '#F5F0FF', border: '1px dashed #D8CFF0', backdropFilter: 'blur(3px)', transform: 'rotate(-6deg)', color: '#5B536A', fontSize: '13px', filter: 'blur(.2px)', animation: 'mhDrift 8s ease-in-out infinite' } as React.CSSProperties}>
                <div style={{ height: '6px', width: '60%', background: '#D8CFF0', borderRadius: '2px', marginBottom: '8px' }} />
                re: invoices?
              </div>
              <div aria-hidden style={{ '--rot': '5deg', position: 'absolute', top: '62px', left: '196px', width: '138px', padding: '13px 15px', borderRadius: '4px', background: '#F5F0FF', border: '1px dashed #D8CFF0', backdropFilter: 'blur(3px)', transform: 'rotate(5deg)', color: '#5B536A', fontSize: '13px', filter: 'blur(.3px)', animation: 'mhDrift 9s ease-in-out infinite .6s' } as React.CSSProperties}>
                call client back
              </div>
              <div aria-hidden style={{ '--rot': '-3deg', position: 'absolute', top: '150px', left: '62px', width: '156px', padding: '13px 15px', borderRadius: '4px', background: '#F5F0FF', border: '1px dashed #D8CFF0', backdropFilter: 'blur(3px)', transform: 'rotate(-3deg)', color: '#5B536A', fontSize: '13px', filter: 'blur(.2px)', animation: 'mhDrift 7.5s ease-in-out infinite 1.1s' } as React.CSSProperties}>
                <div style={{ height: '6px', width: '75%', background: '#D8CFF0', borderRadius: '2px', marginBottom: '8px' }} />
                where&rsquo;s that file&hellip;
              </div>
              <div aria-hidden style={{ '--rot': '9deg', position: 'absolute', top: '118px', left: '248px', width: '120px', padding: '11px 14px', borderRadius: '4px', background: '#F5F0FF', border: '1px dashed #D8CFF0', backdropFilter: 'blur(2px)', transform: 'rotate(9deg)', color: '#5B536A', fontSize: '12.5px', filter: 'blur(.4px)', animation: 'mhDrift 8.5s ease-in-out infinite .3s' } as React.CSSProperties}>
                follow up Mon
              </div>

              {/* Workflow spine */}
              <div aria-hidden style={{ position: 'absolute', left: '359px', top: '252px', width: '2px', height: '340px', background: '#A78BFA', borderRadius: '2px', opacity: 0.7 }} />

              {/* Traveling pulse dot */}
              <div aria-hidden style={{ position: 'absolute', left: '351px', width: '18px', height: '18px', borderRadius: '50%', background: '#8B5CF6', boxShadow: '0 0 22px 6px rgba(139,92,246,.45)', animation: 'mhTravel 5s ease-in-out infinite' }} />

              {/* Accent cards */}
              <div aria-hidden style={{ position: 'absolute', top: '356px', left: '128px', padding: '10px 14px', borderRadius: '4px', background: '#ffffff', border: '1px solid #6D28D9', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', gap: '9px', boxShadow: '0 4px 16px rgba(109,40,217,0.12)', animation: 'mhFloatA 6s ease-in-out infinite' }}>
                <span aria-hidden style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#8B5CF6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span className="font-body whitespace-nowrap" style={{ fontSize: '13px', color: '#171321', fontWeight: 600 }}>۱۲ کار مرتب‌شده</span>
              </div>
              <div aria-hidden style={{ position: 'absolute', top: '498px', left: '104px', padding: '10px 14px', borderRadius: '4px', background: '#ffffff', border: '1px solid #D8CFF0', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', gap: '9px', boxShadow: '0 4px 16px rgba(139,92,246,0.10)', animation: 'mhFloatB 7s ease-in-out infinite .9s' }}>
                <span aria-hidden style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#E9DFFF', border: '1px solid #D8CFF0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#5B536A', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>↗</span>
                <span className="font-body whitespace-nowrap" style={{ fontSize: '13px', color: '#171321', fontWeight: 600 }}>پیش‌نویس آماده‌ی ارسال</span>
              </div>

              {/* Stage nodes */}
              {stageNodes.map((node, i) => (
                <div key={i} style={{ position: 'absolute', left: '392px', width: '272px', top: node.top }}>
                  {/* Spine badge */}
                  <div
                    aria-hidden
                    style={{ position: 'absolute', left: '-41px', top: '18px', width: '34px', height: '34px', borderRadius: '4px', background: node.accent.bg, border: `1px solid ${node.accent.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'mhRing 4s ease-in-out infinite' }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: node.accent.dot, display: 'inline-block' }} />
                  </div>
                  {/* Card */}
                  <div style={{ padding: '16px 18px', borderRadius: '4px', background: '#ffffff', border: `1px solid ${node.accent.border}`, boxShadow: '0 2px 12px rgba(139,92,246,0.08)', animation: `mhFloatA 7s ease-in-out infinite ${node.delay}` }}>
                    <div className="font-body" style={{ fontSize: '15.5px', fontWeight: 700, color: '#171321', letterSpacing: '-.025em', marginBottom: '3px' }}>{node.title}</div>
                    <div className="font-body" style={{ fontSize: '13px', color: '#5B536A', lineHeight: 1.35 }}>{node.sub}</div>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #E9DFFF, transparent)' }}
      />
    </section>
  )
}
