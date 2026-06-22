import { Inbox, LayoutGrid, Zap, CheckCircle2 } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import StarterKitCTA from './StarterKitCTA'
import HeroFa from './HeroFa'

const stageNodes = [
  {
    no: '01', title: 'Capture',  sub: 'Every note, email & idea in one place', top: '236px', delay: '0s',
    Icon: Inbox,        accent: { text: '#272625', bg: '#f4f3ef', border: 'rgba(177,177,175,0.20)', card: 'rgba(177,177,175,0.06)' },
  },
  {
    no: '02', title: 'Organize', sub: 'AI sorts and labels it automatically',   top: '340px', delay: '.6s',
    Icon: LayoutGrid,   accent: { text: '#272625', bg: '#f4f3ef', border: 'rgba(177,177,175,0.20)', card: 'rgba(177,177,175,0.06)' },
  },
  {
    no: '03', title: 'Automate', sub: 'The repetitive busywork runs itself',    top: '444px', delay: '1.2s',
    Icon: Zap,          accent: { text: '#272625', bg: '#f4f3ef', border: 'rgba(177,177,175,0.20)', card: 'rgba(177,177,175,0.06)' },
  },
  {
    no: '04', title: 'Deliver',  sub: 'Polished and ready, every single time',  top: '548px', delay: '1.8s',
    Icon: CheckCircle2, accent: { text: '#272625', bg: '#f4f3ef', border: 'rgba(177,177,175,0.20)', card: 'rgba(177,177,175,0.06)' },
  },
]

export default async function Hero() {
  const locale = await getLocale()
  if (locale === 'fa') return <HeroFa />

  const t = await getTranslations('hero')

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex flex-col justify-center"
      style={{
        background: [
          'radial-gradient(1100px 700px at 78% 18%, rgba(177,177,175,0.06), transparent 60%)',
          'radial-gradient(900px 640px at 92% 88%, rgba(177,177,175,0.04), transparent 60%)',
          'radial-gradient(700px 520px at 8% 92%, rgba(177,177,175,0.04), transparent 65%)',
          '#f4f3ef',
        ].join(', '),
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(177,177,175,.04) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          opacity: 0.6,
        }}
      />
      {/* Subtle vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(120% 120% at 50% 0%, transparent 55%, rgba(252,250,238,.80) 100%)' }}
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
                border: '1px solid #ecebea',
                borderRadius: '999px',
                background: '#f4f3ef',
              }}
            >
              <span
                aria-hidden
                style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#e8400d',
                  boxShadow: '0 0 8px rgba(232,64,13,0.5)',
                  flexShrink: 0, display: 'inline-block',
                }}
              />
              <span
                className="font-body"
                style={{ fontSize: '12px', letterSpacing: '.16em', fontWeight: 600, color: '#272625' }}
              >
                {t('badge')}
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-heading font-bold mb-5"
              style={{
                fontSize: 'clamp(36px, 3.2vw, 54px)',
                lineHeight: 1.04,
                letterSpacing: '-.022em',
                color: '#272625',
              }}
            >
              Use AI for the<br />
              <span style={{ whiteSpace: 'nowrap' }}>
                work you{' '}
                <em
                  style={{
                    fontStyle: 'italic',
                    color: '#272625',
                    WebkitTextFillColor: 'initial',
                  }}
                >
                  already do
                </em>
              </span>
            </h1>

            {/* Subtitle line */}
            <p
              className="font-heading font-semibold mb-6"
              style={{
                fontSize: 'clamp(17px, 1.8vw, 24px)',
                lineHeight: 1.3,
                color: '#272625',
              }}
            >
              {t('titleLine2')}
            </p>

            {/* Body copy */}
            <p
              className="font-body mb-10"
              style={{ fontSize: '18px', lineHeight: 1.6, color: '#6d6c6b', maxWidth: '440px' }}
            >
              {t('subtitle')}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-3.5 mb-9">
              <StarterKitCTA />
              <a
                href="#training"
                className="font-body inline-flex items-center gap-2.5 cursor-pointer"
                style={{
                  padding: '14px 22px',
                  borderRadius: '13px',
                  fontSize: '15.5px',
                  fontWeight: 500,
                  color: '#272625',
                  border: '1px solid #ecebea',
                  background: 'rgba(252,250,238,0.6)',
                  textDecoration: 'none',
                  transition: 'border-color .2s, background .2s',
                }}
              >
                {t('ctaSecondary')}
              </a>
            </div>

            {/* Byline */}
            <div className="flex items-center gap-3" style={{ color: '#6d6c6b', fontSize: '13.5px' }}>
              <div
                aria-hidden
                className="flex-shrink-0 flex items-center justify-center font-body font-semibold"
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: '#f4f3ef',
                  border: '1px solid #ecebea',
                  fontSize: '14px', color: '#272625',
                }}
              >
                M
              </div>
              <span className="font-body" style={{ lineHeight: 1.5 }}>
                AI doesn&apos;t have to be complicated<br />
                <strong style={{ color: '#272625', fontWeight: 600 }}>Maddy</strong>
                {' '}makes it simple for everyday work
              </span>
            </div>
          </div>

          {/* ── Right column: transformation visual stage ─── */}
          {/* Hidden below xl — shown xl+ (1280px+) */}
          <div className="hidden xl:flex flex-shrink-0 justify-center items-center">
            {/* Stage: 680×700, all children absolutely positioned */}
            <div style={{ position: 'relative', width: '680px', height: '700px' }}>

              {/* Glow blobs */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', top: '-60px', left: '90px',
                  width: '380px', height: '380px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(177,177,175,.12), transparent 65%)',
                  filter: 'blur(70px)',
                  animation: 'mhGlow 7s ease-in-out infinite',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute', bottom: '-40px', right: '30px',
                  width: '340px', height: '340px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(177,177,175,.08), transparent 65%)',
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
                  <linearGradient id="mhConnLine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0"   stopColor="#272625" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#272625" stopOpacity=".45" />
                    <stop offset="1"   stopColor="#272625" stopOpacity=".6" />
                  </linearGradient>
                </defs>
                <path
                  d="M 200 200 C 300 250, 300 210, 360 258"
                  fill="none"
                  stroke="url(#mhConnLine)"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  style={{ animation: 'mhDash 6s linear infinite' }}
                />
              </svg>

              {/* ── Messy "before" cards ── */}
              <div
                aria-hidden
                style={{
                  '--rot': '-6deg',
                  position: 'absolute', top: '24px', left: '24px',
                  width: '148px', padding: '13px 15px',
                  borderRadius: '11px',
                  background: 'rgba(252,250,238,0.80)',
                  border: '1px dashed #ecebea',
                  backdropFilter: 'blur(3px)',
                  transform: 'rotate(-6deg)',
                  color: '#6d6c6b', fontSize: '13px',
                  filter: 'blur(.2px)',
                  animation: 'mhDrift 8s ease-in-out infinite',
                } as React.CSSProperties}
              >
                <div style={{ height: '6px', width: '60%', background: '#ecebea', borderRadius: '3px', marginBottom: '8px' }} />
                re: invoices?
              </div>

              <div
                aria-hidden
                style={{
                  '--rot': '5deg',
                  position: 'absolute', top: '62px', left: '196px',
                  width: '138px', padding: '13px 15px',
                  borderRadius: '11px',
                  background: 'rgba(252,250,238,0.70)',
                  border: '1px dashed #ecebea',
                  backdropFilter: 'blur(3px)',
                  transform: 'rotate(5deg)',
                  color: '#6d6c6b', fontSize: '13px',
                  filter: 'blur(.3px)',
                  animation: 'mhDrift 9s ease-in-out infinite .6s',
                } as React.CSSProperties}
              >
                call client back
              </div>

              <div
                aria-hidden
                style={{
                  '--rot': '-3deg',
                  position: 'absolute', top: '150px', left: '62px',
                  width: '156px', padding: '13px 15px',
                  borderRadius: '11px',
                  background: 'rgba(252,250,238,0.75)',
                  border: '1px dashed #ecebea',
                  backdropFilter: 'blur(3px)',
                  transform: 'rotate(-3deg)',
                  color: '#6d6c6b', fontSize: '13px',
                  filter: 'blur(.2px)',
                  animation: 'mhDrift 7.5s ease-in-out infinite 1.1s',
                } as React.CSSProperties}
              >
                <div style={{ height: '6px', width: '75%', background: '#ecebea', borderRadius: '3px', marginBottom: '8px' }} />
                where&rsquo;s that file&hellip;
              </div>

              <div
                aria-hidden
                style={{
                  '--rot': '9deg',
                  position: 'absolute', top: '118px', left: '248px',
                  width: '120px', padding: '11px 14px',
                  borderRadius: '11px',
                  background: 'rgba(252,250,238,0.65)',
                  border: '1px dashed #ecebea',
                  backdropFilter: 'blur(2px)',
                  transform: 'rotate(9deg)',
                  color: '#6d6c6b', fontSize: '12.5px',
                  filter: 'blur(.4px)',
                  animation: 'mhDrift 8.5s ease-in-out infinite .3s',
                } as React.CSSProperties}
              >
                follow up Mon
              </div>

              {/* ── Workflow spine ── */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', left: '359px', top: '252px',
                  width: '2px', height: '340px',
                  background: 'linear-gradient(#272625, #272625)',
                  borderRadius: '2px',
                  opacity: 0.4,
                }}
              />

              {/* Traveling pulse dot */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', left: '351px',
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: '#272625',
                  boxShadow: '0 0 22px 6px rgba(177,177,175,.45)',
                  animation: 'mhTravel 5s ease-in-out infinite',
                }}
              />

              {/* ── Transformation accent cards ── */}

              {/* "12 tasks sorted" */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', top: '356px', left: '128px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: '1px solid rgba(232,64,13,0.20)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex', alignItems: 'center', gap: '9px',
                  boxShadow: '0 12px 30px -12px rgba(232,64,13,0.15)',
                  animation: 'mhFloatA 6s ease-in-out infinite',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: '18px', height: '18px', borderRadius: '6px',
                    background: '#e8400d',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ffffff', fontSize: '11px', fontWeight: 700, flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span className="font-body whitespace-nowrap" style={{ fontSize: '13px', color: '#272625', fontWeight: 600 }}>
                  12 tasks sorted
                </span>
              </div>

              {/* "Draft ready to send" */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', top: '498px', left: '104px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: '#f4f3ef',
                  border: '1px solid #ecebea',
                  backdropFilter: 'blur(6px)',
                  display: 'flex', alignItems: 'center', gap: '9px',
                  boxShadow: '0 4px 16px rgba(177,177,175,0.10)',
                  animation: 'mhFloatB 7s ease-in-out infinite .9s',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: '18px', height: '18px', borderRadius: '6px',
                    background: '#ffffff',
                    border: '1px solid #ecebea',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: '#272625', fontSize: '11px', fontWeight: 700, flexShrink: 0,
                  }}
                >
                  ↗
                </span>
                <span className="font-body whitespace-nowrap" style={{ fontSize: '13px', color: '#272625', fontWeight: 600 }}>
                  Draft ready to send
                </span>
              </div>

              {/* ── Organized workflow nodes ── */}
              {stageNodes.map((node) => {
                const NodeIcon = node.Icon
                return (
                  <div
                    key={node.no}
                    style={{ position: 'absolute', left: '392px', width: '280px', top: node.top }}
                  >
                    {/* Icon badge — sits on the spine */}
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute', left: '-41px', top: '18px',
                        width: '34px', height: '34px', borderRadius: '11px',
                        background: node.accent.bg,
                        border: `1px solid ${node.accent.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        animation: 'mhRing 4s ease-in-out infinite',
                      }}
                    >
                      <NodeIcon size={15} style={{ color: node.accent.text }} />
                    </div>
                    {/* Card */}
                    <div
                      style={{
                        padding: '13px 16px', borderRadius: '15px',
                        background: '#FFFFFF',
                        border: `1px solid ${node.accent.border}`,
                        boxShadow: `0 4px 24px rgba(177,177,175,0.07)`,
                        display: 'flex', alignItems: 'center', gap: '12px',
                        animation: `mhFloatA 7s ease-in-out infinite ${node.delay}`,
                      }}
                    >
                      {/* Icon chip */}
                      <div
                        aria-hidden
                        style={{
                          width: '38px', height: '38px', borderRadius: '11px',
                          background: node.accent.bg,
                          border: `1px solid ${node.accent.border}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <NodeIcon size={18} style={{ color: node.accent.text }} />
                      </div>
                      <div>
                        <div
                          className="font-body"
                          style={{ fontSize: '15px', fontWeight: 700, color: '#272625', letterSpacing: '-.01em', marginBottom: '2px' }}
                        >
                          {node.title}
                        </div>
                        <div className="font-body" style={{ fontSize: '12.5px', color: '#6d6c6b', lineHeight: 1.35 }}>
                          {node.sub}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
          {/* End right column */}

        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #f4f3ef, transparent)' }}
      />
    </section>
  )
}
