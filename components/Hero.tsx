import { getTranslations } from 'next-intl/server'
import StarterKitCTA from './StarterKitCTA'

const stageNodes = [
  { no: '01', title: 'Capture',  sub: 'Every note, email & idea in one place', top: '236px', delay: '0s'   },
  { no: '02', title: 'Organize', sub: 'AI sorts and labels it automatically',   top: '340px', delay: '.6s'  },
  { no: '03', title: 'Automate', sub: 'The repetitive busywork runs itself',    top: '444px', delay: '1.2s' },
  { no: '04', title: 'Deliver',  sub: 'Polished and ready, every single time',  top: '548px', delay: '1.8s' },
]

export default async function Hero() {
  const t = await getTranslations('hero')

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex flex-col justify-center"
      style={{
        background: [
          'radial-gradient(1100px 700px at 78% 18%, rgba(96,76,220,.18), transparent 60%)',
          'radial-gradient(900px 640px at 92% 88%, rgba(40,120,230,.13), transparent 60%)',
          'radial-gradient(700px 520px at 8% 92%, rgba(70,60,180,.09), transparent 65%)',
          '#080C12',
        ].join(', '),
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          opacity: 0.5,
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(120% 120% at 50% 0%, transparent 55%, rgba(0,0,0,.50) 100%)' }}
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
                border: '1px solid rgba(255,255,255,.12)',
                borderRadius: '999px',
                background: 'rgba(255,255,255,.025)',
              }}
            >
              <span
                aria-hidden
                style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#8b7bff',
                  boxShadow: '0 0 10px #8b7bff',
                  flexShrink: 0, display: 'inline-block',
                }}
              />
              <span
                className="font-body"
                style={{ fontSize: '12px', letterSpacing: '.16em', fontWeight: 600, color: '#b9b6d0' }}
              >
                {t('badge')}
              </span>
            </div>

            {/* H1 — line 1: "Use AI for the" / line 2: "work you already do" */}
            <h1
              className="font-heading font-bold mb-5"
              style={{
                fontSize: 'clamp(36px, 3.2vw, 54px)',
                lineHeight: 1.04,
                letterSpacing: '-.022em',
                color: '#f4f3f9',
              }}
            >
              Use AI for the<br />
              <span style={{ whiteSpace: 'nowrap' }}>
                work you{' '}
                <em
                  style={{
                    fontStyle: 'italic',
                    background: 'linear-gradient(100deg, #a99bff, #5cb2ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
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
                background: 'linear-gradient(100deg, #a99bff, #5cb2ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('titleLine2')}
            </p>

            {/* Body copy */}
            <p
              className="font-body mb-10"
              style={{ fontSize: '18px', lineHeight: 1.6, color: '#b5b3c9', maxWidth: '440px' }}
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
                  color: '#e9e8f0',
                  border: '1px solid rgba(255,255,255,.16)',
                  background: 'rgba(255,255,255,.02)',
                  textDecoration: 'none',
                  transition: 'border-color .2s, background .2s',
                }}
              >
                {t('ctaSecondary')}
              </a>
            </div>

            {/* Byline */}
            <div className="flex items-center gap-3" style={{ color: '#8f8da6', fontSize: '13.5px' }}>
              <div
                aria-hidden
                className="flex-shrink-0 flex items-center justify-center font-body font-semibold"
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(150deg, #3a3550, #211f33)',
                  border: '1px solid rgba(255,255,255,.14)',
                  fontSize: '14px', color: '#cfcce0',
                }}
              >
                M
              </div>
              <span className="font-body" style={{ lineHeight: 1.5 }}>
                AI doesn&apos;t have to be complicated<br />
                <strong style={{ color: '#cdcbe0', fontWeight: 600 }}>Maddy</strong>
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
                  background: 'radial-gradient(circle, rgba(120,100,255,.42), transparent 65%)',
                  filter: 'blur(70px)',
                  animation: 'mhGlow 7s ease-in-out infinite',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute', bottom: '-40px', right: '30px',
                  width: '340px', height: '340px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(50,130,240,.33), transparent 65%)',
                  filter: 'blur(75px)',
                  animation: 'mhGlow 9s ease-in-out infinite .8s',
                }}
              />

              {/* SVG connector: messy cluster → spine entry */}
              <svg
                aria-hidden
                width="680"
                height="700"
                viewBox="0 0 680 700"
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
              >
                <defs>
                  <linearGradient id="mhConnLine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0"   stopColor="#8b7bff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#8b7bff" stopOpacity=".55" />
                    <stop offset="1"   stopColor="#5cb2ff" stopOpacity=".7" />
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
                  background: 'rgba(255,255,255,.04)',
                  border: '1px dashed rgba(255,255,255,.16)',
                  backdropFilter: 'blur(3px)',
                  transform: 'rotate(-6deg)',
                  color: '#9b98b2', fontSize: '13px',
                  filter: 'blur(.2px)',
                  animation: 'mhDrift 8s ease-in-out infinite',
                } as React.CSSProperties}
              >
                <div style={{ height: '6px', width: '60%', background: 'rgba(255,255,255,.14)', borderRadius: '3px', marginBottom: '8px' }} />
                re: invoices?
              </div>

              <div
                aria-hidden
                style={{
                  '--rot': '5deg',
                  position: 'absolute', top: '62px', left: '196px',
                  width: '138px', padding: '13px 15px',
                  borderRadius: '11px',
                  background: 'rgba(255,255,255,.035)',
                  border: '1px dashed rgba(255,255,255,.15)',
                  backdropFilter: 'blur(3px)',
                  transform: 'rotate(5deg)',
                  color: '#9794ae', fontSize: '13px',
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
                  background: 'rgba(255,255,255,.045)',
                  border: '1px dashed rgba(255,255,255,.16)',
                  backdropFilter: 'blur(3px)',
                  transform: 'rotate(-3deg)',
                  color: '#9b98b2', fontSize: '13px',
                  filter: 'blur(.2px)',
                  animation: 'mhDrift 7.5s ease-in-out infinite 1.1s',
                } as React.CSSProperties}
              >
                <div style={{ height: '6px', width: '75%', background: 'rgba(255,255,255,.12)', borderRadius: '3px', marginBottom: '8px' }} />
                where&rsquo;s that file&hellip;
              </div>

              <div
                aria-hidden
                style={{
                  '--rot': '9deg',
                  position: 'absolute', top: '118px', left: '248px',
                  width: '120px', padding: '11px 14px',
                  borderRadius: '11px',
                  background: 'rgba(255,255,255,.03)',
                  border: '1px dashed rgba(255,255,255,.14)',
                  backdropFilter: 'blur(2px)',
                  transform: 'rotate(9deg)',
                  color: '#8f8ca6', fontSize: '12.5px',
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
                  background: 'linear-gradient(#8b7bff, #5cb2ff)',
                  borderRadius: '2px',
                  opacity: 0.5,
                }}
              />

              {/* Traveling pulse dot */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', left: '351px',
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: '#cdb6ff',
                  boxShadow: '0 0 22px 6px rgba(150,120,255,.7)',
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
                  background: 'linear-gradient(150deg, rgba(140,120,255,.22), rgba(90,160,255,.12))',
                  border: '1px solid rgba(160,150,255,.3)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex', alignItems: 'center', gap: '9px',
                  boxShadow: '0 12px 30px -12px rgba(120,110,255,.6)',
                  animation: 'mhFloatA 6s ease-in-out infinite',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: '18px', height: '18px', borderRadius: '6px',
                    background: 'linear-gradient(140deg, #a99bff, #5cb2ff)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: '#0a0a0f', fontSize: '11px', fontWeight: 700, flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span className="font-body whitespace-nowrap" style={{ fontSize: '13px', color: '#e7e6f2', fontWeight: 600 }}>
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
                  background: 'linear-gradient(150deg, rgba(90,160,255,.2), rgba(140,120,255,.1))',
                  border: '1px solid rgba(150,180,255,.28)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex', alignItems: 'center', gap: '9px',
                  boxShadow: '0 12px 30px -12px rgba(70,130,240,.55)',
                  animation: 'mhFloatB 7s ease-in-out infinite .9s',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: '18px', height: '18px', borderRadius: '6px',
                    background: 'linear-gradient(140deg, #5cb2ff, #a99bff)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: '#0a0a0f', fontSize: '11px', fontWeight: 700, flexShrink: 0,
                  }}
                >
                  ↗
                </span>
                <span className="font-body whitespace-nowrap" style={{ fontSize: '13px', color: '#e7e6f2', fontWeight: 600 }}>
                  Draft ready to send
                </span>
              </div>

              {/* ── Organized workflow nodes ── */}
              {stageNodes.map((node) => (
                <div
                  key={node.no}
                  style={{ position: 'absolute', left: '392px', width: '272px', top: node.top }}
                >
                  {/* Number badge — sits on the spine */}
                  <div
                    aria-hidden
                    className="font-body"
                    style={{
                      position: 'absolute', left: '-41px', top: '18px',
                      width: '34px', height: '34px', borderRadius: '11px',
                      background: 'linear-gradient(150deg, #1b1830, #13111f)',
                      border: '1px solid rgba(150,130,255,.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 700, color: '#bdb2ff',
                      animation: 'mhRing 4s ease-in-out infinite',
                    }}
                  >
                    {node.no}
                  </div>
                  {/* Card */}
                  <div
                    style={{
                      padding: '16px 18px', borderRadius: '15px',
                      background: 'linear-gradient(155deg, rgba(255,255,255,.06), rgba(255,255,255,.02))',
                      border: '1px solid rgba(255,255,255,.1)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 18px 40px -18px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.08)',
                      animation: `mhFloatA 7s ease-in-out infinite ${node.delay}`,
                    }}
                  >
                    <div
                      className="font-body"
                      style={{ fontSize: '15.5px', fontWeight: 700, color: '#f1f0f8', letterSpacing: '-.01em', marginBottom: '3px' }}
                    >
                      {node.title}
                    </div>
                    <div className="font-body" style={{ fontSize: '13px', color: '#a3a0ba', lineHeight: 1.35 }}>
                      {node.sub}
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
          {/* End right column */}

        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #080C12, transparent)' }}
      />
    </section>
  )
}
