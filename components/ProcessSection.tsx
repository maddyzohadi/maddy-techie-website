import { getLocale } from 'next-intl/server'

const FA_STEPS = [
  { week: 'هفته ۱', title: 'آشنایی با نیاز',    desc: 'با هم بررسی می‌کنیم چی لازم داری و کجا وقت هدر می‌ره' },
  { week: 'هفته ۲', title: 'طراحی سیستم',       desc: 'یه نقشه راه ساده و اجرایی برات می‌سازیم' },
  { week: 'هفته ۳', title: 'اجرا و آموزش',      desc: 'سیستم رو راه می‌ندازیم و یاد می‌گیری چطور ازش استفاده کنی' },
  { week: 'هفته ۴', title: 'تحویل و پشتیبانی', desc: 'همه چیز آماده‌ست، تو فقط کار می‌کنی' },
]

const EN_STEPS = [
  { week: 'Week 1', title: 'Understanding your needs', desc: 'We look at what you actually need and where your time is being wasted' },
  { week: 'Week 2', title: 'System design',            desc: 'We build a simple, executable roadmap tailored to your work' },
  { week: 'Week 3', title: 'Build & training',         desc: 'We set up the system and you learn exactly how to use it' },
  { week: 'Week 4', title: 'Delivery & support',       desc: "Everything is ready — you just do the work" },
]

export default async function ProcessSection() {
  const locale      = await getLocale()
  const isFa        = locale === 'fa'
  const steps       = isFa ? FA_STEPS : EN_STEPS
  const headingFont = isFa ? "'Noto Naskh Arabic', serif" : "'DM Serif Display', serif"
  const bodyFont    = isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif'

  return (
    <section
      dir={isFa ? 'rtl' : 'ltr'}
      style={{
        background: '#F5F0EB',
        padding: '96px 24px',
        borderTop: '0.5px solid rgba(0,0,0,0.06)',
        direction: isFa ? 'rtl' : 'ltr',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          gap: '80px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* Left: eyebrow + heading */}
        <div style={{ flex: '1 1 260px', maxWidth: '340px' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#999',
              marginBottom: '16px',
            }}
          >
            {isFa ? 'روش کار' : 'THE PROCESS'}
          </span>
          <h2
            style={{
              fontFamily: headingFont,
              fontSize: 'clamp(26px, 3.5vw, 42px)',
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {isFa
              ? 'از اولین پیام تا سیستم آماده'
              : 'From first message to working system'}
          </h2>
        </div>

        {/* Right: timeline */}
        <div style={{ flex: '2 1 360px' }}>
          {steps.map((step, i) => (
            <div key={i}>
              {i > 0 && (
                <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.08)' }} />
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: isFa ? 'row-reverse' : 'row',
                  gap: '24px',
                  alignItems: 'flex-start',
                  padding: '28px 0',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#999',
                    letterSpacing: '0.06em',
                    background: 'rgba(0,0,0,0.05)',
                    border: '0.5px solid rgba(0,0,0,0.08)',
                    borderRadius: '100px',
                    padding: '4px 12px',
                    whiteSpace: 'nowrap',
                    marginTop: '2px',
                  }}
                >
                  {step.week}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: headingFont,
                      fontSize: '17px',
                      fontWeight: 700,
                      color: '#1A1A1A',
                      lineHeight: 1.3,
                      marginBottom: '6px',
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    style={{
                      fontFamily: bodyFont,
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
