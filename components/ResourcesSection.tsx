'use client'

import { useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { useLocale } from 'next-intl'

// ── Data ───────────────────────────────────────────────────────────────────
type Tier = 'Free' | 'Premium'

interface Template {
  id: number
  name: string
  cat: string
  desc: string
  preview: string
  tools: string[]
  tier: Tier
}

const TEMPLATES: Template[] = [
  {
    id: 1,
    name: 'AI Email Reply Kit',
    cat: 'AI Prompts',
    desc: 'Write, reply, and clear your inbox in minutes — never from a blank page.',
    preview: '3 ready-made prompt templates for writing new emails, replying to messages, and following up. Copy, paste, and adapt — works in Gmail, Outlook, or any email client.',
    tools: ['ChatGPT', 'Claude'],
    tier: 'Free',
  },
  {
    id: 2,
    name: 'Weekly Report Summary',
    cat: 'Reports',
    desc: 'Paste your notes or data, get a clean summary ready to send.',
    preview: 'A structured prompt that takes your raw weekly notes and outputs a formatted summary with highlights, decisions made, and next steps. Paste in, copy out.',
    tools: ['Google Sheets', 'Claude'],
    tier: 'Free',
  },
  {
    id: 3,
    name: 'Content Planner',
    cat: 'Content',
    desc: 'Plan a full month of content with topics, post formats, and captions — all in one organized sheet.',
    preview: 'A Google Sheets file with columns for topic, post format, caption, status, and scheduled date. Includes integrated ChatGPT prompt suggestions for each content type.',
    tools: ['Google Sheets', 'ChatGPT'],
    tier: 'Premium',
  },
  {
    id: 4,
    name: 'Prompt Library Tracker',
    cat: 'Google Sheets',
    desc: 'Save and organize your best prompts so you always have them ready when you need them.',
    preview: 'A Google Sheets tracker with columns for prompt name, category, use case, and effectiveness rating. Never recreate a good prompt from scratch again.',
    tools: ['Google Sheets', 'ChatGPT'],
    tier: 'Free',
  },
  {
    id: 5,
    name: 'Client Lead Tracker',
    cat: 'Client Work',
    desc: 'Track every lead and follow-up in one place — no spreadsheet chaos.',
    preview: 'A Google Sheets CRM with columns for name, contact, status (cold/warm/hot), last follow-up, and notes. Simple enough to use daily, detailed enough to actually be useful.',
    tools: ['Google Sheets'],
    tier: 'Free',
  },
  {
    id: 6,
    name: 'Meeting Notes Summary',
    cat: 'Reports',
    desc: 'Turn raw meeting notes into a clean summary and action list in seconds.',
    preview: 'Two prompt templates: one for summarizing meeting notes into bullet-point highlights, and one for turning those notes into a ready-to-send follow-up email draft.',
    tools: ['Claude', 'ChatGPT'],
    tier: 'Premium',
  },
]

const FA_TEMPLATES: Template[] = [
  {
    id: 1,
    name: 'کیت پاسخ ایمیل با هوش مصنوعی',
    cat: 'AI Prompts',
    desc: 'ایمیل بنویس، پاسخ بده و صندوق ورودی‌ات را در چند دقیقه خالی کن — هیچ‌وقت از صفحه‌ی خالی شروع نکن.',
    preview: '۳ قالب پرامپت آماده برای نوشتن ایمیل جدید، پاسخ به پیام‌ها و پیگیری. کپی کن، جای‌گذاری کن، تنظیم کن — در Gmail، Outlook یا هر کلاینت ایمیل کار می‌کند.',
    tools: ['ChatGPT', 'Claude'],
    tier: 'Free',
  },
  {
    id: 2,
    name: 'خلاصه‌ی گزارش هفتگی',
    cat: 'Reports',
    desc: 'یادداشت یا داده‌هایت را paste کن، یک خلاصه‌ی تمیز آماده‌ی ارسال بگیر.',
    preview: 'یک پرامپت ساختارمند که یادداشت‌های خام هفتگی‌ات را دریافت می‌کند و خلاصه‌ای با برجسته‌سازی‌ها، تصمیمات و قدم‌های بعدی تولید می‌کند.',
    tools: ['Google Sheets', 'Claude'],
    tier: 'Free',
  },
  {
    id: 3,
    name: 'برنامه‌ریزی محتوا',
    cat: 'Content',
    desc: 'یک ماه کامل محتوا را با موضوع، قالب پست و کپشن برنامه‌ریزی کن — همه در یک شیت منظم.',
    preview: 'یک فایل Google Sheets با ستون‌هایی برای موضوع، قالب پست، کپشن، وضعیت و تاریخ انتشار. شامل پیشنهاد پرامپت ChatGPT برای هر نوع محتوا.',
    tools: ['Google Sheets', 'ChatGPT'],
    tier: 'Premium',
  },
  {
    id: 4,
    name: 'ردیاب کتابخانه‌ی پرامپت',
    cat: 'Google Sheets',
    desc: 'بهترین پرامپت‌هایت را ذخیره و سازماندهی کن تا هر وقت لازم داشتی آماده باشند.',
    preview: 'یک ردیاب Google Sheets با ستون‌هایی برای نام پرامپت، دسته‌بندی، موارد استفاده و امتیاز اثربخشی. دیگر هیچ‌وقت پرامپت خوب را از صفر نساز.',
    tools: ['Google Sheets', 'ChatGPT'],
    tier: 'Free',
  },
  {
    id: 5,
    name: 'ردیاب مشتری و سرنخ',
    cat: 'Client Work',
    desc: 'هر سرنخ و پیگیری را در یک جا دنبال کن — بدون سردرگمی در شیت‌های مختلف.',
    preview: 'یک CRM ساده در Google Sheets با ستون‌هایی برای نام، تماس، وضعیت (سرد/گرم/داغ)، آخرین پیگیری و یادداشت‌ها. به اندازه‌ی کافی ساده برای استفاده‌ی روزانه.',
    tools: ['Google Sheets'],
    tier: 'Free',
  },
  {
    id: 6,
    name: 'خلاصه‌ی یادداشت‌های جلسه',
    cat: 'Reports',
    desc: 'یادداشت‌های خام جلسه را در چند ثانیه به خلاصه‌ی تمیز و فهرست اقدامات تبدیل کن.',
    preview: 'دو قالب پرامپت: یکی برای خلاصه‌سازی یادداشت‌های جلسه به نکات کلیدی، دیگری برای تبدیل همان یادداشت‌ها به پیش‌نویس ایمیل پیگیری آماده‌ی ارسال.',
    tools: ['Claude', 'ChatGPT'],
    tier: 'Premium',
  },
]

const CATEGORIES = ['All', 'AI Prompts', 'Google Sheets', 'Content', 'Reports', 'Client Work']

const FA_CATEGORY_LABELS: Record<string, string> = {
  'All': 'همه',
  'AI Prompts': 'پرامپت هوش مصنوعی',
  'Google Sheets': 'گوگل‌شیت',
  'Content': 'محتوا',
  'Reports': 'گزارش',
  'Client Work': 'کار مشتری',
}

const ACCENTS: Record<string, { color: string; glow: string; soft: string }> = {
  'AI Prompts':    { color: '#272625', glow: 'rgba(177,177,175,.35)',  soft: 'rgba(177,177,175,.10)'  },
  'Google Sheets': { color: '#272625', glow: 'rgba(177,177,175,.30)',   soft: 'rgba(177,177,175,.07)'   },
  'Content':       { color: '#272625', glow: 'rgba(177,177,175,.35)',  soft: 'rgba(177,177,175,.10)'  },
  'Reports':       { color: '#272625', glow: 'rgba(42,54,86,.30)',   soft: 'rgba(42,54,86,.07)'   },
  'Client Work':   { color: '#272625', glow: 'rgba(177,177,175,.35)',  soft: 'rgba(177,177,175,.10)'  },
}

// ── Thumbnail ──────────────────────────────────────────────────────────────
function Thumbnail({ accent }: { accent: { color: string; glow: string; soft: string } }) {
  return (
    <div
      style={{
        height: '152px',
        borderRadius: '15px',
        overflow: 'hidden',
        position: 'relative',
        background: `linear-gradient(158deg, ${accent.soft}, rgba(252,250,238,.50))`,
        border: '1px solid #ecebea',
        flexShrink: 0,
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(177,177,175,.04) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '63px',
          left: '40px',
          right: '40px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${accent.color}55, transparent)`,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '55px',
          left: 0, right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '38px',
        }}
      >
        <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: accent.color, opacity: 0.55 }} />
        <div style={{
          width: '18px', height: '18px', borderRadius: '50%',
          background: accent.color,
          boxShadow: `0 0 12px 4px ${accent.glow}`,
          animation: 'mtPulse 3.4s ease-in-out infinite',
        }} />
        <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: accent.color, opacity: 0.55 }} />
      </div>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '14px', left: '14px', right: '14px',
          display: 'flex', gap: '8px',
        }}
      >
        {[{ w: '55%' }, { w: '38%' }].map((c, i) => (
          <div
            key={i}
            style={{
              flex: 1, height: '28px',
              borderRadius: '9px',
              background: '#FFFFFF',
              border: '1px solid #ecebea',
              padding: '0 10px',
              display: 'flex', alignItems: 'center',
            }}
          >
            <div style={{ width: c.w, height: '3px', borderRadius: '2px', background: '#ecebea' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Preview modal ──────────────────────────────────────────────────────────
function PreviewModal({
  tmpl,
  isFa,
  onClose,
}: {
  tmpl: Template
  isFa: boolean
  onClose: () => void
}) {
  const accent = ACCENTS[tmpl.cat]
  const tierLabel = tmpl.tier === 'Free'
    ? (isFa ? 'رایگان' : 'FREE')
    : (isFa ? 'ویژه' : 'PREMIUM')

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tmpl.name}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(177,177,175,0.55)', backdropFilter: 'blur(4px)' }}
      />

      {/* Modal panel */}
      <div
        style={{
          position: 'relative', zIndex: 1,
          background: '#FFFFFF',
          border: '1px solid #ecebea',
          borderRadius: '24px',
          padding: 'clamp(28px, 5vw, 44px)',
          maxWidth: '520px', width: '100%',
          boxShadow: '0 32px 80px -16px rgba(177,177,175,0.22)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label={isFa ? 'بستن' : 'Close'}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '36px', height: '36px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#f4f3ef', border: '1px solid #ecebea',
            cursor: 'pointer', color: '#6d6c6b',
          }}
        >
          <X size={16} />
        </button>

        {/* Tier badge */}
        <span
          className="font-body font-bold"
          style={{
            display: 'inline-block',
            marginBottom: '14px',
            padding: '5px 13px',
            borderRadius: '999px',
            fontSize: '11px',
            letterSpacing: '.05em',
            ...(tmpl.tier === 'Premium'
              ? {
                  background: 'linear-gradient(135deg, #272625, #272625)',
                  color: '#FFFFFF',
                }
              : {
                  background: '#f4f3ef',
                  border: '1px solid rgba(177,177,175,0.25)',
                  color: '#272625',
                }),
          }}
        >
          {tierLabel}
        </span>

        {/* Name */}
        <h3
          className="font-heading font-bold"
          style={{ fontSize: 'clamp(20px, 4vw, 26px)', color: '#272625', marginBottom: '8px', lineHeight: 1.2 }}
        >
          {tmpl.name}
        </h3>

        {/* One-liner */}
        <p
          className="font-body"
          style={{ fontSize: '16px', color: '#6d6c6b', lineHeight: 1.55, marginBottom: '16px' }}
        >
          {tmpl.desc}
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: '#ecebea', marginBottom: '16px' }} />

        {/* What's inside */}
        <p
          className="font-body font-semibold"
          style={{ fontSize: '12px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#6d6c6b', marginBottom: '10px' }}
        >
          {isFa ? 'چه شامل می‌شود' : "What's inside"}
        </p>
        <p
          className="font-body"
          style={{ fontSize: '15px', color: '#6d6c6b', lineHeight: 1.6, marginBottom: '22px' }}
        >
          {tmpl.preview}
        </p>

        {/* Tools */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {tmpl.tools.map((tool) => (
            <span
              key={tool}
              className="font-body"
              style={{
                padding: '5px 11px', borderRadius: '7px',
                fontSize: '12px', fontWeight: 500,
                color: '#6d6c6b', background: '#f4f3ef', border: '1px solid #ecebea',
              }}
            >
              {tool}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={onClose}
          className="font-body font-bold inline-flex items-center justify-center gap-2"
          style={{
            width: '100%', padding: '14px 24px',
            borderRadius: '12px', fontSize: '15px',
            color: '#FFFFFF', textDecoration: 'none',
            background: 'linear-gradient(135deg, #272625, #272625)',
            boxShadow: '0 10px 28px -8px rgba(177,177,175,.42)',
          }}
        >
          {isFa ? 'دریافت قالب' : 'Get template'}
          <ArrowRight size={15} className={isFa ? 'rotate-180' : ''} />
        </a>
      </div>
    </div>
  )
}

// ── Main section ───────────────────────────────────────────────────────────
export default function ResourcesSection() {
  const locale = useLocale()
  const isFa = locale === 'fa'
  const [filter, setFilter] = useState('All')
  const [previewId, setPreviewId] = useState<number | null>(null)

  const allTemplates = isFa ? FA_TEMPLATES : TEMPLATES
  const visible = filter === 'All' ? allTemplates : allTemplates.filter((t) => t.cat === filter)
  const previewTmpl = previewId !== null ? allTemplates.find((t) => t.id === previewId) ?? null : null

  const tierLabel = (tier: Tier) => {
    if (!isFa) return tier.toUpperCase()
    return tier === 'Free' ? 'رایگان' : 'ویژه'
  }

  const catLabel = (cat: string) => isFa ? (FA_CATEGORY_LABELS[cat] ?? cat) : cat

  return (
    <>
      <section id="templates" className="py-24 md:py-32 relative scroll-mt-24" style={{ background: '#FFFFFF' }}>
        <div className="section-divider absolute top-0 left-0 right-0" />

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 15% 50%, rgba(177,177,175,.04) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Intro ──────────────────────────────────── */}
          <div className="text-center mb-12">
            <p
              className="font-body font-bold mb-5"
              style={{ fontSize: '13px', letterSpacing: '.22em', color: '#272625', textTransform: 'uppercase' }}
            >
              {isFa ? 'قالب‌ها' : 'TEMPLATES'}
            </p>
            <h2
              className="font-heading font-extrabold mx-auto mb-5"
              style={{
                fontSize: 'clamp(36px, 5.4vw, 62px)',
                lineHeight: 1.04,
                letterSpacing: '-.025em',
                color: '#272625',
                maxWidth: isFa ? '20ch' : '14ch',
              }}
            >
              {isFa ? (
                <>
                  با یک سیستم شروع کن،{' '}
                  <span style={{ color: '#272625' }}>
                    نه یک صفحه‌ی خالی
                  </span>
                </>
              ) : (
                <>
                  Start with{' '}
                  <span style={{ color: '#272625' }}>
                    a system
                  </span>
                  , not a blank page
                </>
              )}
            </h2>
            <p
              className="font-body mx-auto"
              style={{ fontSize: '18.5px', lineHeight: 1.55, color: '#6d6c6b', maxWidth: '600px' }}
            >
              {isFa
                ? 'گردش‌کارهای AI و بدون‌کد آماده که می‌توانی همین امروز بگیری، تنظیم کنی و اجرا کنی. ساخته‌شده برای کار واقعی.'
                : 'Plug-and-play AI and no-code workflows you can grab, tweak, and run today. Built for real work, no building from scratch.'}
            </p>
          </div>

          {/* ── Filter pills ───────────────────────────── */}
          <div
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}
          >
            {CATEGORIES.map((cat) => {
              const active = filter === cat
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="font-body font-semibold cursor-pointer transition-all duration-200"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '999px',
                    fontSize: '14.5px',
                    border: active ? 'none' : '1px solid #ecebea',
                    background: active
                      ? 'linear-gradient(135deg, #272625, #272625)'
                      : '#f4f3ef',
                    color: active ? '#FFFFFF' : '#6d6c6b',
                  }}
                >
                  {catLabel(cat)}
                </button>
              )
            })}
          </div>

          {/* Count line */}
          <p
            className="font-body text-center mb-10"
            style={{ fontSize: '13.5px', color: '#6d6c6b' }}
          >
            {isFa
              ? `${visible.length} قالب آماده`
              : `${visible.length} ready-to-run template${visible.length !== 1 ? 's' : ''}`}
          </p>

          {/* ── Template card grid ─────────────────────── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
              gap: '22px',
              marginBottom: '72px',
            }}
          >
            {visible.map((tmpl) => {
              const accent = ACCENTS[tmpl.cat]
              return (
                <div
                  key={tmpl.id}
                  className="template-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    padding: '15px',
                    borderRadius: '20px',
                    background: '#FFFFFF',
                    border: '1px solid #ecebea',
                    '--card-glow': accent.glow,
                  } as React.CSSProperties}
                >
                  {/* Thumbnail + tier badge overlay */}
                  <div style={{ position: 'relative' }}>
                    <Thumbnail accent={accent} />
                    <span
                      className="font-body font-bold"
                      style={{
                        position: 'absolute', top: '10px', right: '10px',
                        padding: '5px 11px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        letterSpacing: '.03em',
                        ...(tmpl.tier === 'Premium'
                          ? {
                              background: 'linear-gradient(135deg, #272625, #272625)',
                              color: '#FFFFFF',
                              boxShadow: '0 6px 16px -6px rgba(177,177,175,.50)',
                            }
                          : {
                              background: '#f4f3ef',
                              border: '1px solid #ecebea',
                              color: '#6d6c6b',
                            }),
                      }}
                    >
                      {tierLabel(tmpl.tier)}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    className="font-heading"
                    style={{ fontSize: '18px', fontWeight: 700, color: '#272625', letterSpacing: '-.01em', lineHeight: 1.25, margin: 0 }}
                  >
                    {tmpl.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-body"
                    style={{ fontSize: '14px', color: '#6d6c6b', lineHeight: 1.5, margin: 0, flexGrow: 1 }}
                  >
                    {tmpl.desc}
                  </p>

                  {/* Tool tags */}
                  <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
                    {tmpl.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-body"
                        style={{
                          padding: '5px 10px',
                          borderRadius: '7px',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#6d6c6b',
                          background: '#f4f3ef',
                          border: '1px solid #ecebea',
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Card footer */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '12px',
                      borderTop: '1px solid #ecebea',
                    }}
                  >
                    <a
                      href="#contact"
                      className="font-body font-bold inline-flex items-center gap-1.5"
                      style={{ fontSize: '14.5px', color: accent.color, textDecoration: 'none' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isFa ? 'دریافت قالب' : 'Get template'}
                      <ArrowRight size={14} className={isFa ? 'rotate-180' : ''} />
                    </a>
                    <button
                      className="font-body cursor-pointer transition-colors duration-200"
                      style={{
                        fontSize: '13.5px', fontWeight: 500, color: '#6d6c6b',
                        background: 'none', border: '1px solid #ecebea',
                        padding: '6px 14px', borderRadius: '8px',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.color = '#272625'
                        el.style.borderColor = '#272625'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.color = '#6d6c6b'
                        el.style.borderColor = '#ecebea'
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreviewId(tmpl.id)
                      }}
                    >
                      {isFa ? 'پیش‌نمایش' : 'Preview'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Custom template CTA ────────────────────── */}
          <div
            className="relative overflow-hidden text-center"
            style={{
              padding: 'clamp(40px, 5vw, 64px) 32px',
              borderRadius: '24px',
              border: '1px solid #ecebea',
              background: [
                'radial-gradient(700px 320px at 50% 0%, rgba(177,177,175,.07), transparent 65%)',
                '#f4f3ef',
              ].join(', '),
            }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(rgba(177,177,175,.04) 1px, transparent 1px)',
                backgroundSize: '34px 34px',
                opacity: 0.5,
                pointerEvents: 'none',
              }}
            />
            <div className="relative z-10">
              <p
                className="font-body font-bold mb-4"
                style={{ fontSize: '13px', letterSpacing: '.20em', color: '#272625', textTransform: 'uppercase' }}
              >
                {isFa ? 'گردش‌کار دقیق خودت را پیدا نکردی؟' : "Can't find your exact workflow?"}
              </p>
              <h2
                className="font-heading font-extrabold mx-auto mb-4"
                style={{
                  fontSize: 'clamp(26px, 3.4vw, 42px)',
                  color: '#272625',
                  maxWidth: '20ch',
                  letterSpacing: '-.02em',
                  lineHeight: 1.1,
                }}
              >
                {isFa
                  ? 'بگو چطور کار می‌کنی، سیستمش را برات می‌سازم'
                  : <>Tell me how you work<br />I&apos;ll build the system for it</>}
              </h2>
              <p
                className="font-body mx-auto mb-8"
                style={{ fontSize: '16.5px', color: '#6d6c6b', maxWidth: '480px', lineHeight: 1.6 }}
              >
                {isFa
                  ? 'یک قالب برای کارهای واقعی روزمره‌ات، با زبان ساده و بدون کد و اصطلاحات پیچیده. تو گردش‌کار را بگو، ساختنش با من.'
                  : <>A template made for your real day-to-day tasks, set up in plain English with no code and no jargon<br />You bring the workflow, I&apos;ll do the building</>}
              </p>
              <a
                href="#contact"
                className="font-body font-bold inline-flex items-center gap-2 cursor-pointer"
                style={{
                  padding: '15px 28px',
                  borderRadius: '13px',
                  fontSize: '15.5px',
                  color: '#FFFFFF',
                  background: 'linear-gradient(135deg, #272625, #272625)',
                  boxShadow: '0 12px 32px -10px rgba(177,177,175,.45), inset 0 1px 0 rgba(255,255,255,.25)',
                  textDecoration: 'none',
                }}
              >
                {isFa ? 'قالب اختصاصی‌ام را بساز' : 'Get my custom template'}
                <ArrowRight size={16} className={isFa ? 'rotate-180' : ''} />
              </a>
            </div>
          </div>

        </div>

        <div className="section-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Preview modal */}
      {previewTmpl && (
        <PreviewModal
          tmpl={previewTmpl}
          isFa={isFa}
          onClose={() => setPreviewId(null)}
        />
      )}
    </>
  )
}
