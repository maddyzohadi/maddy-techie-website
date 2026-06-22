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

// ── Thumbnail ──────────────────────────────────────────────────────────────
function Thumbnail() {
  return (
    <div
      style={{
        height: '152px',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        background: 'rgba(123,47,190,0.06)',
        border: '0.5px solid rgba(123,47,190,0.20)',
        flexShrink: 0,
      }}
    >
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
        <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: 'rgba(123,47,190,0.30)' }} />
        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(123,47,190,0.50)', border: '0.5px solid rgba(123,47,190,0.60)' }} />
        <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: 'rgba(123,47,190,0.30)' }} />
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
              borderRadius: '8px',
              background: '#FFFFFF',
              border: '0.5px solid rgba(123,47,190,0.20)',
              padding: '0 10px',
              display: 'flex', alignItems: 'center',
            }}
          >
            <div style={{ width: c.w, height: '3px', borderRadius: '2px', background: 'rgba(123,47,190,0.20)' }} />
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
      <div
        aria-hidden
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,46,0.75)', backdropFilter: 'blur(4px)' }}
      />

      <div
        style={{
          position: 'relative', zIndex: 1,
          background: '#FFFFFF',
          border: '0.5px solid rgba(123,47,190,0.30)',
          borderRadius: '16px',
          padding: 'clamp(28px, 5vw, 44px)',
          maxWidth: '520px', width: '100%',
        }}
      >
        <button
          onClick={onClose}
          aria-label={isFa ? 'بستن' : 'Close'}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '36px', height: '36px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(123,47,190,0.08)',
            border: '0.5px solid rgba(123,47,190,0.25)',
            cursor: 'pointer', color: '#1A1A2E',
          }}
        >
          <X size={16} />
        </button>

        <span
          className="font-ui font-bold"
          style={{
            display: 'inline-block',
            marginBottom: '14px',
            padding: '5px 13px',
            borderRadius: '8px',
            fontSize: '11px',
            letterSpacing: '.05em',
            ...(tmpl.tier === 'Premium'
              ? { background: '#7B2FBE', color: '#FFFFFF' }
              : { background: 'rgba(123,47,190,0.10)', border: '0.5px solid rgba(123,47,190,0.25)', color: '#1A1A2E' }),
          }}
        >
          {tierLabel}
        </span>

        <h3
          className="font-en font-bold"
          style={{ fontSize: 'clamp(20px, 4vw, 26px)', color: '#1A1A2E', marginBottom: '8px', lineHeight: 1.2 }}
        >
          {tmpl.name}
        </h3>

        <p
          className={`${isFa ? 'font-fa' : 'font-ui'}`}
          style={{ fontSize: '16px', color: 'rgba(26,26,46,0.60)', lineHeight: 1.55, marginBottom: '16px' }}
        >
          {tmpl.desc}
        </p>

        <div style={{ height: '0.5px', background: 'rgba(123,47,190,0.15)', marginBottom: '16px' }} />

        <p
          className="font-ui font-semibold"
          style={{ fontSize: '12px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.50)', marginBottom: '10px' }}
        >
          {isFa ? 'چه شامل می‌شود' : "What's inside"}
        </p>
        <p
          className={`${isFa ? 'font-fa' : 'font-ui'}`}
          style={{ fontSize: '15px', color: 'rgba(26,26,46,0.60)', lineHeight: 1.6, marginBottom: '22px' }}
        >
          {tmpl.preview}
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {tmpl.tools.map((tool) => (
            <span
              key={tool}
              className="font-ui"
              style={{
                padding: '5px 11px', borderRadius: '7px',
                fontSize: '12px', fontWeight: 500,
                color: 'rgba(26,26,46,0.60)',
                background: 'rgba(123,47,190,0.08)',
                border: '0.5px solid rgba(123,47,190,0.25)',
              }}
            >
              {tool}
            </span>
          ))}
        </div>

        <a
          href="#contact"
          onClick={onClose}
          className="font-ui font-bold inline-flex items-center justify-center gap-2"
          style={{
            width: '100%', padding: '14px 24px',
            borderRadius: '8px', fontSize: '15px',
            color: '#FFFFFF', textDecoration: 'none',
            background: '#7B2FBE',
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
      <section
        id="templates"
        className="py-24 md:py-32 relative scroll-mt-24"
        style={{ background: '#F5F0E8', borderTop: '0.5px solid rgba(123,47,190,0.15)' }}
      >
        <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <p
              className="font-ui font-bold mb-5"
              style={{ fontSize: '13px', letterSpacing: '.22em', color: 'rgba(26,26,46,0.50)', textTransform: 'uppercase' }}
            >
              {isFa ? 'قالب‌ها' : 'TEMPLATES'}
            </p>
            <h2
              className={`${isFa ? 'font-fa' : 'font-en'} font-extrabold mx-auto mb-5`}
              style={{
                fontSize: 'clamp(36px, 5.4vw, 62px)',
                lineHeight: 1.04,
                letterSpacing: '-.025em',
                color: '#1A1A2E',
                maxWidth: isFa ? '20ch' : '14ch',
              }}
            >
              {isFa ? (
                <>با یک سیستم شروع کن، <span style={{ color: 'rgba(26,26,46,0.60)' }}>نه یک صفحه‌ی خالی</span></>
              ) : (
                <>Start with <span style={{ color: 'rgba(26,26,46,0.60)' }}>a system</span>, not a blank page</>
              )}
            </h2>
            <p
              className={`${isFa ? 'font-fa' : 'font-ui'} mx-auto`}
              style={{ fontSize: '18.5px', lineHeight: 1.55, color: 'rgba(26,26,46,0.60)', maxWidth: '600px' }}
            >
              {isFa
                ? 'گردش‌کارهای AI و بدون‌کد آماده که می‌توانی همین امروز بگیری، تنظیم کنی و اجرا کنی. ساخته‌شده برای کار واقعی.'
                : 'Plug-and-play AI and no-code workflows you can grab, tweak, and run today. Built for real work, no building from scratch.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
            {CATEGORIES.map((cat) => {
              const active = filter === cat
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`${isFa ? 'font-fa' : 'font-ui'} font-semibold cursor-pointer transition-all duration-200`}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    border: active ? 'none' : '0.5px solid rgba(123,47,190,0.25)',
                    background: active ? '#7B2FBE' : '#FFFFFF',
                    color: active ? '#FFFFFF' : 'rgba(26,26,46,0.60)',
                  }}
                >
                  {catLabel(cat)}
                </button>
              )
            })}
          </div>

          <p
            className={`${isFa ? 'font-fa' : 'font-ui'} text-center mb-10`}
            style={{ fontSize: '13.5px', color: 'rgba(26,26,46,0.50)' }}
          >
            {isFa
              ? `${visible.length} قالب آماده`
              : `${visible.length} ready-to-run template${visible.length !== 1 ? 's' : ''}`}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
              gap: '20px',
              marginBottom: '72px',
            }}
          >
            {visible.map((tmpl) => (
              <div
                key={tmpl.id}
                className="template-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  padding: '15px',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '0.5px solid rgba(26,26,46,0.12)',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <Thumbnail />
                  <span
                    className="font-ui font-bold"
                    style={{
                      position: 'absolute', top: '10px', right: '10px',
                      padding: '5px 11px',
                      borderRadius: '7px',
                      fontSize: '11px',
                      letterSpacing: '.03em',
                      ...(tmpl.tier === 'Premium'
                        ? { background: '#7B2FBE', color: '#FFFFFF' }
                        : { background: 'rgba(123,47,190,0.10)', border: '0.5px solid rgba(123,47,190,0.25)', color: '#1A1A2E' }),
                    }}
                  >
                    {tierLabel(tmpl.tier)}
                  </span>
                </div>

                <h3
                  className={`${isFa ? 'font-fa' : 'font-en'}`}
                  style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A2E', letterSpacing: '-.01em', lineHeight: 1.25, margin: 0 }}
                >
                  {tmpl.name}
                </h3>

                <p
                  className={`${isFa ? 'font-fa' : 'font-ui'}`}
                  style={{ fontSize: '14px', color: 'rgba(26,26,46,0.60)', lineHeight: 1.5, margin: 0, flexGrow: 1 }}
                >
                  {tmpl.desc}
                </p>

                <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
                  {tmpl.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-ui"
                      style={{
                        padding: '5px 10px',
                        borderRadius: '7px',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'rgba(26,26,46,0.60)',
                        background: 'rgba(123,47,190,0.08)',
                        border: '0.5px solid rgba(123,47,190,0.20)',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '0.5px solid rgba(123,47,190,0.15)',
                  }}
                >
                  <a
                    href="#contact"
                    className={`${isFa ? 'font-fa' : 'font-ui'} font-bold inline-flex items-center gap-1.5`}
                    style={{ fontSize: '14.5px', color: '#7B2FBE', textDecoration: 'none' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isFa ? 'دریافت قالب' : 'Get template'}
                    <ArrowRight size={14} className={isFa ? 'rotate-180' : ''} />
                  </a>
                  <button
                    className={`${isFa ? 'font-fa' : 'font-ui'} cursor-pointer transition-colors duration-200`}
                    style={{
                      fontSize: '13.5px', fontWeight: 500, color: 'rgba(26,26,46,0.60)',
                      background: 'none',
                      border: '0.5px solid rgba(123,47,190,0.25)',
                      padding: '6px 14px', borderRadius: '8px',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.color = '#1A1A2E'
                      el.style.borderColor = 'rgba(123,47,190,0.55)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.color = 'rgba(26,26,46,0.60)'
                      el.style.borderColor = 'rgba(123,47,190,0.25)'
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
            ))}
          </div>

          {/* Custom template CTA block */}
          <div
            className="relative overflow-hidden text-center"
            style={{
              padding: 'clamp(40px, 5vw, 64px) 32px',
              borderRadius: '16px',
              border: '0.5px solid rgba(123,47,190,0.25)',
              background: '#FFFFFF',
            }}
          >
            <div className="relative z-10">
              <p
                className={`${isFa ? 'font-fa' : 'font-ui'} font-bold mb-4`}
                style={{ fontSize: '13px', letterSpacing: '.20em', color: 'rgba(26,26,46,0.50)', textTransform: 'uppercase' }}
              >
                {isFa ? 'گردش‌کار دقیق خودت را پیدا نکردی؟' : "Can't find your exact workflow?"}
              </p>
              <h2
                className={`${isFa ? 'font-fa' : 'font-en'} font-extrabold mx-auto mb-4`}
                style={{
                  fontSize: 'clamp(26px, 3.4vw, 42px)',
                  color: '#1A1A2E',
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
                className={`${isFa ? 'font-fa' : 'font-ui'} mx-auto mb-8`}
                style={{ fontSize: '16.5px', color: 'rgba(26,26,46,0.60)', maxWidth: '480px', lineHeight: 1.6 }}
              >
                {isFa
                  ? 'یک قالب برای کارهای واقعی روزمره‌ات، با زبان ساده و بدون کد و اصطلاحات پیچیده. تو گردش‌کار را بگو، ساختنش با من.'
                  : <>A template made for your real day-to-day tasks, set up in plain English with no code and no jargon<br />You bring the workflow, I&apos;ll do the building</>}
              </p>
              <a
                href="#contact"
                className={`${isFa ? 'font-fa' : 'font-ui'} font-bold inline-flex items-center gap-2 cursor-pointer`}
                style={{
                  padding: '14px 28px',
                  borderRadius: '8px',
                  fontSize: '15.5px',
                  color: '#FFFFFF',
                  background: '#7B2FBE',
                  textDecoration: 'none',
                }}
              >
                {isFa ? 'قالب اختصاصی‌ام را بساز' : 'Get my custom template'}
                <ArrowRight size={16} className={isFa ? 'rotate-180' : ''} />
              </a>
            </div>
          </div>

        </div>
      </section>

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
