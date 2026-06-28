import { getLocale } from 'next-intl/server'
import AskMaddyCTA from './AskMaddyCTA'

const FA_CARDS = [
  { number: '01', title: 'کارهای تکراری', desc: 'همان مراحل هر روز — ساعت‌هایی که می‌توانستند جای دیگری باشند.' },
  { number: '02', title: 'گم شدن توی ابزارها', desc: 'ابزار زیاد، بدون یک سیستم مشخص.' },
  { number: '03', title: 'AI رو درست استفاده نمیکنی', desc: 'ChatGPT داری اما بیشتر ازش سوال می‌پرسی.' },
  { number: '04', title: 'نگران عقب موندن هستی', desc: 'می‌خوای جلوتر باشی ولی نمی‌دونی از کجا شروع کنی.' },
]

const EN_CARDS = [
  { number: '01', title: 'Repetitive manual tasks', desc: 'Same steps every day — hours spent on work that could run itself.' },
  { number: '02', title: 'AI overwhelm', desc: 'Too many tools, no clear system to tie them together.' },
  { number: '03', title: 'Using AI like a search bar', desc: "You have ChatGPT — but you're mostly just asking it questions." },
  { number: '04', title: 'Afraid of falling behind', desc: "Everyone's using AI. You want to keep up — without a tech degree." },
]

export default async function ProblemSection() {
  const locale = await getLocale()
  const isFa = locale === 'fa'

  const cards      = isFa ? FA_CARDS : EN_CARDS
  const headingFont = isFa ? "'Noto Naskh Arabic', serif" : "'DM Serif Display', serif"
  const bodyFont    = isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif'

  return (
    <section
      style={{
        background: '#EDE5DC',
        padding: '96px 24px',
        borderTop: '0.5px solid rgba(0,0,0,0.06)',
        direction: isFa ? 'rtl' : 'ltr',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#999',
              marginBottom: '16px',
            }}
          >
            {isFa ? 'مسئله اصلی' : 'SOUND FAMILIAR?'}
          </span>
          <h2
            style={{
              fontFamily: headingFont,
              fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: 700,
              color: '#111111',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            {isFa
              ? 'هوش مصنوعی که کارهای سخت رو ساده میکنه'
              : 'AI should make work easier, not harder'}
          </h2>
          <p
            style={{
              fontFamily: bodyFont,
              fontSize: '17px',
              color: '#555',
              lineHeight: 1.7,
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            {isFa
              ? 'وقتی ابزارها درست کنار هم باشن کارها سریعتر پیش میرن'
              : "Once you have the right tools in the right order, everything clicks."}
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          {cards.map((card) => (
            <div
              key={card.number}
              style={{
                background: '#fff',
                border: '0.5px solid rgba(0,0,0,0.08)',
                borderRadius: '16px',
                padding: '28px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#bbb',
                  letterSpacing: '0.08em',
                  marginBottom: '14px',
                }}
              >
                {card.number}
              </span>
              <h3
                style={{
                  fontFamily: headingFont,
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#111111',
                  lineHeight: 1.3,
                  marginBottom: '8px',
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: bodyFont,
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Soft CTA */}
        <div style={{ textAlign: isFa ? 'right' : 'left' }}>
          <AskMaddyCTA />
        </div>

      </div>
    </section>
  )
}
