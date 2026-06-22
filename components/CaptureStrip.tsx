import { getLocale } from 'next-intl/server'

const EN_STAGES = [
  { title: 'Capture',  sub: 'Every note, email & idea in one place' },
  { title: 'Organize', sub: 'AI sorts and labels it automatically' },
  { title: 'Automate', sub: 'The repetitive busywork runs itself' },
  { title: 'Deliver',  sub: 'Polished output, every single time' },
]

const FA_STAGES = [
  { title: 'جمع‌آوری',  sub: 'اطلاعات' },
  { title: 'سازماندهی', sub: 'مرتب‌سازی با هوش مصنوعی' },
  { title: 'اتوماسیون', sub: 'اجرای خودکار' },
  { title: 'تحویل',     sub: 'نتیجه آماده' },
]

export default async function CaptureStrip() {
  const locale = await getLocale()
  const isFa = locale === 'fa'
  const stages: { title: string; sub: string }[] = isFa ? FA_STAGES : EN_STAGES

  return (
    <div
      style={{
        background: '#1A1A2E',
        borderTop: '0.5px solid rgba(245,240,232,0.10)',
        borderBottom: '0.5px solid rgba(245,240,232,0.10)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: 'flex', alignItems: 'stretch', overflowX: 'auto' }}>
          {stages.map((stage, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'stretch', flex: '1 0 auto', minWidth: 0 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: isFa ? '20px 24px' : '18px 20px',
                  flex: 1,
                  minWidth: isFa ? '140px' : '160px',
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <p
                    className="font-ui font-bold"
                    style={{
                      fontSize: isFa ? '15px' : '14.5px',
                      color: '#F5F0E8',
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {stage.title}
                  </p>
                  <p
                    className="font-ui"
                    style={{
                      fontSize: isFa ? '13px' : '12.5px',
                      color: 'rgba(245,240,232,0.60)',
                      lineHeight: 1.4,
                      marginTop: '3px',
                    }}
                  >
                    {stage.sub}
                  </p>
                </div>
              </div>

              {i < stages.length - 1 && (
                <div
                  aria-hidden
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 2px',
                    flexShrink: 0,
                    color: 'rgba(245,240,232,0.25)',
                    fontSize: '16px',
                    userSelect: 'none',
                  }}
                >
                  {isFa ? '←' : '→'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
