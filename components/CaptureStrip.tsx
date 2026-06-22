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

  const borderColor  = isFa ? '#d2d3cc' : '#ecebea'
  const titleColor   = isFa ? '#111827' : '#272625'
  const subColor     = isFa ? '#65675e' : '#6d6c6b'

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            overflowX: 'auto',
          }}
        >
          {stages.map((stage, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'stretch', flex: '1 0 auto', minWidth: 0 }}
            >
              {/* Stage item */}
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
                {/* Text */}
                <div style={{ minWidth: 0 }}>
                  <p
                    className="font-heading font-bold"
                    style={{
                      fontSize: isFa ? '15px' : '14.5px',
                      color: titleColor,
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {stage.title}
                  </p>
                  <p
                    className="font-body"
                    style={{
                      fontSize: isFa ? '13px' : '12.5px',
                      color: subColor,
                      lineHeight: 1.4,
                      marginTop: '3px',
                    }}
                  >
                    {stage.sub}
                  </p>
                </div>
              </div>

              {/* Arrow separator (not after last item) */}
              {i < stages.length - 1 && (
                <div
                  aria-hidden
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 2px',
                    flexShrink: 0,
                    color: borderColor,
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
