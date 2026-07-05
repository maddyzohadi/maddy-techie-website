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
    desc: 'Write and reply to emails in minutes — never start from a blank page.',
    preview: '3 ready-made prompt templates for writing new emails, replying to messages, and following up. Copy, paste, and adapt — works in Gmail, Outlook, or any email client.',
    tools: ['ChatGPT', 'Claude'],
    tier: 'Free',
  },
  {
    id: 2,
    name: 'Weekly Report Summary',
    cat: 'Reports',
    desc: 'Paste your notes, get a clean formatted summary ready to send.',
    preview: 'A structured prompt that takes your raw weekly notes and outputs a formatted summary with highlights, decisions made, and next steps. Paste in, copy out.',
    tools: ['Google Sheets', 'Claude'],
    tier: 'Free',
  },
  {
    id: 3,
    name: 'Content Planner',
    cat: 'Content',
    desc: 'Plan a full month of posts — topics, captions, and status in one sheet.',
    preview: 'A Google Sheets file with columns for topic, post format, caption, status, and scheduled date. Includes integrated ChatGPT prompt suggestions for each content type.',
    tools: ['Google Sheets', 'ChatGPT'],
    tier: 'Premium',
  },
  {
    id: 4,
    name: 'Prompt Library Tracker',
    cat: 'Google Sheets',
    desc: 'Organize your best prompts so they\'re always ready when you need them.',
    preview: 'A Google Sheets tracker with columns for prompt name, category, use case, and effectiveness rating. Never recreate a good prompt from scratch again.',
    tools: ['Google Sheets', 'ChatGPT'],
    tier: 'Free',
  },
  {
    id: 5,
    name: 'Client Lead Tracker',
    cat: 'Client Work',
    desc: 'Track every lead and follow-up in one place — no chaos.',
    preview: 'A Google Sheets CRM with columns for name, contact, status (cold/warm/hot), last follow-up, and notes. Simple enough to use daily, detailed enough to actually be useful.',
    tools: ['Google Sheets'],
    tier: 'Free',
  },
  {
    id: 6,
    name: 'Meeting Notes Summary',
    cat: 'Reports',
    desc: 'Turn meeting notes into a clean summary and action list.',
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
    desc: 'پاسخ‌های ایمیلی واضح، محترمانه و حرفه‌ای بنویس، بدون اینکه هر بار از صفر شروع کنی',
    preview: '۳ قالب پرامپت آماده برای نوشتن ایمیل جدید، پاسخ به پیام‌ها و پیگیری. کپی کن، جای‌گذاری کن، تنظیم کن.',
    tools: ['ChatGPT', 'کار روزمره'],
    tier: 'Free',
  },
  {
    id: 2,
    name: 'خلاصه گزارش هفتگی',
    cat: 'Reports',
    desc: 'یادداشت‌ها و کارهای هفته را به یک گزارش مرتب و قابل ارسال تبدیل کن',
    preview: 'یک پرامپت ساختارمند که یادداشت‌های خام هفتگی را به خلاصه‌ای با نقاط کلیدی، تصمیمات و کارهای بعدی تبدیل می‌کند.',
    tools: ['Claude', 'ChatGPT'],
    tier: 'Free',
  },
  {
    id: 3,
    name: 'برنامه‌ریز محتوا',
    cat: 'Content',
    desc: 'ایده‌ها، موضوعات، کپشن‌ها و برنامه‌ی انتشار محتوا را در یک سیستم ساده مرتب کن',
    preview: 'فایل Google Sheets با ستون‌هایی برای موضوع، قالب پست، کپشن، وضعیت و تاریخ انتشار. شامل پیشنهاد پرامپت برای هر نوع محتوا.',
    tools: ['Google Sheets', 'ChatGPT'],
    tier: 'Premium',
  },
  {
    id: 4,
    name: 'ردیاب کتابخانه پرامپت',
    cat: 'AI Prompts',
    desc: 'پرامپت‌های خوبت را بر اساس ابزار، کاربرد و موضوع ذخیره کن تا هر بار دوباره دنبالش نگردی',
    preview: 'ردیاب Google Sheets با ستون‌هایی برای نام پرامپت، دسته‌بندی، موارد استفاده و امتیاز. دیگر پرامپت خوب را از صفر نساز.',
    tools: ['Google Sheets', 'ChatGPT'],
    tier: 'Free',
  },
  {
    id: 5,
    name: 'ردیاب مشتری‌های احتمالی',
    cat: 'Client Work',
    desc: 'مشتری‌های احتمالی، پیگیری‌ها، وضعیت گفتگو و قدم بعدی را در یک جای مرتب نگه دار',
    preview: 'CRM ساده در Google Sheets با ستون‌هایی برای نام، تماس، وضعیت گفتگو، آخرین پیگیری و یادداشت. ساده برای استفاده روزانه، کامل برای کار واقعی.',
    tools: ['Google Sheets', 'کار با مشتری'],
    tier: 'Premium',
  },
  {
    id: 6,
    name: 'خلاصه جلسه و کارهای بعدی',
    cat: 'Reports',
    desc: 'یادداشت‌های جلسه را به خلاصه‌ای تمیز با تصمیم‌ها، نکته‌های مهم و کارهای بعدی تبدیل کن',
    preview: 'دو قالب پرامپت: یکی برای خلاصه‌سازی یادداشت‌های جلسه به نکات کلیدی، دیگری برای تبدیل یادداشت‌ها به ایمیل پیگیری آماده‌ی ارسال.',
    tools: ['Claude', 'ChatGPT'],
    tier: 'Free',
  },
]

const CATEGORIES = ['All', 'AI Prompts', 'Google Sheets', 'Content', 'Reports', 'Client Work']

const FA_CATEGORY_LABELS: Record<string, string> = {
  'All':          'همه',
  'AI Prompts':   'پرامپت‌های هوش مصنوعی',
  'Google Sheets': 'Google Sheets',
  'Content':      'محتوا',
  'Reports':      'گزارش‌ها',
  'Client Work':  'کار با مشتری',
}

const FA_CATEGORIES = ['All', 'AI Prompts', 'Reports', 'Content', 'Client Work']

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"

const toPersianNum = (n: number) =>
  n.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)])

// ── EN Thumbnail (editorial, no blue) ─────────────────────────────────────
function ThumbnailEN({ cat }: { cat: string }) {
  const base: React.CSSProperties = {
    height: '148px',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    background: '#FFFDF8',
    border: '0.5px solid rgba(17,17,17,0.08)',
    flexShrink: 0,
  }

  if (cat === 'AI Prompts') {
    return (
      <div style={base} aria-hidden>
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
          {/* User message */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ background: '#F1E8DD', border: '0.5px solid #E6D7C8', borderRadius: '8px 8px 2px 8px', padding: '7px 10px', maxWidth: '80%' }}>
              <div style={{ height: 3, borderRadius: 2, background: '#D4CCC5', width: '88%', marginBottom: 4 }} />
              <div style={{ height: 3, borderRadius: 2, background: '#D4CCC5', width: '60%' }} />
            </div>
          </div>
          {/* AI reply */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(227,78,46,0.12)', border: '0.5px solid rgba(227,78,46,0.22)', flexShrink: 0, marginTop: 1 }} />
            <div style={{ background: 'rgba(227,78,46,0.06)', border: '0.5px solid rgba(227,78,46,0.14)', borderRadius: '2px 8px 8px 8px', padding: '7px 10px', flex: 1 }}>
              <div style={{ height: 3, borderRadius: 2, background: 'rgba(227,78,46,0.26)', width: '76%', marginBottom: 4 }} />
              <div style={{ height: 3, borderRadius: 2, background: 'rgba(227,78,46,0.15)', width: '52%' }} />
            </div>
          </div>
          {/* Second user message */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ background: '#F1E8DD', border: '0.5px solid #E6D7C8', borderRadius: '8px 8px 2px 8px', padding: '7px 10px', maxWidth: '65%' }}>
              <div style={{ height: 3, borderRadius: 2, background: '#D4CCC5', width: '80%' }} />
            </div>
          </div>
          {/* Typing dots */}
          <div style={{ display: 'flex', gap: 4, paddingLeft: 22, alignItems: 'center', marginTop: 2 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(227,78,46,0.30)' }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (cat === 'Reports') {
    return (
      <div style={base} aria-hidden>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ background: '#111111', padding: '9px 13px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#E34E2E', flexShrink: 0 }} />
            <div style={{ height: 4, width: 58, borderRadius: 3, background: 'rgba(255,249,241,0.28)' }} />
          </div>
          <div style={{ padding: '11px 13px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            {[90, 76, 84, 56].map((w, i) => (
              <div key={i} style={{ height: 4, borderRadius: 3, background: i === 3 ? 'rgba(227,78,46,0.20)' : '#E6D7C8', width: `${w}%` }} />
            ))}
            <div style={{ display: 'flex', gap: 6, marginTop: 1 }}>
              <div style={{ background: 'rgba(227,78,46,0.08)', border: '0.5px solid rgba(227,78,46,0.18)', borderRadius: 5, width: 50, height: 16 }} />
              <div style={{ background: '#F1E8DD', border: '0.5px solid #E6D7C8', borderRadius: 5, width: 38, height: 16 }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cat === 'Content') {
    return (
      <div style={base} aria-hidden>
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 6, height: '100%' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['M', 'T', 'W', 'T', 'F'] as const).map((d, i) => (
              <div
                key={i}
                style={{
                  flex: 1, height: 22, borderRadius: 5,
                  background: i === 2 ? '#E34E2E' : '#FFFDF8',
                  border: `0.5px solid ${i === 2 ? 'rgba(227,78,46,0.42)' : '#E6D7C8'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '8px', fontFamily: 'system-ui', fontWeight: 700, color: i === 2 ? '#fff' : '#B8B0A7' }}>{d}</span>
              </div>
            ))}
          </div>
          {[
            ['rgba(227,78,46,0.07)', 'rgba(227,78,46,0.16)', '56%'],
            ['#FFFDF8', '#E6D7C8', '40%'],
            ['#FFFDF8', '#E6D7C8', '64%'],
            ['rgba(227,78,46,0.04)', 'rgba(227,78,46,0.12)', '48%'],
          ].map(([bg, border, w], i) => (
            <div key={i} style={{ height: 18, borderRadius: 5, background: bg, border: `0.5px solid ${border}`, width: w }} />
          ))}
        </div>
      </div>
    )
  }

  if (cat === 'Google Sheets') {
    return (
      <div style={{ ...base }} aria-hidden>
        <div style={{ display: 'flex', borderBottom: '0.5px solid rgba(255,255,255,0.18)' }}>
          {(['Name', 'Category', '★'] as const).map((h, i) => (
            <div
              key={i}
              style={{
                flex: i === 0 ? 2 : 1,
                padding: '7px 9px',
                background: '#111111',
                borderRight: i < 2 ? '0.5px solid rgba(255,255,255,0.14)' : 'none',
                display: 'flex', alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '9px', fontFamily: 'system-ui', fontWeight: 700, color: 'rgba(255,249,241,0.82)' }}>{h}</span>
            </div>
          ))}
        </div>
        {[0, 1, 2, 3].map((ri) => (
          <div key={ri} style={{ display: 'flex', borderBottom: ri < 3 ? '0.5px solid #E6D7C8' : 'none', background: ri % 2 === 0 ? '#FFFDF8' : '#FAF6EF' }}>
            {[2, 1, 1].map((flex, ci) => (
              <div key={ci} style={{ flex, padding: '8px 9px', borderRight: ci < 2 ? '0.5px solid #E6D7C8' : 'none', display: 'flex', alignItems: 'center' }}>
                <div style={{ height: 4, borderRadius: 2, background: ci === 2 ? 'rgba(227,78,46,0.22)' : '#E6D7C8', width: ci === 0 ? '68%' : '52%' }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  // Client Work (default)
  const enStatuses = [
    { color: '#E34E2E', label: 'HOT' },
    { color: '#8C7E74', label: 'WARM' },
    { color: 'rgba(17,17,17,0.28)', label: 'cold' },
  ]
  return (
    <div style={{ ...base }} aria-hidden>
      <div style={{ background: '#111111', padding: '8px 12px', display: 'flex', gap: 6 }}>
        {(['Name', 'Status', 'Follow-up'] as const).map((h, i) => (
          <div key={i} style={{ flex: i === 0 ? 2 : 1 }}>
            <span style={{ fontSize: '8px', fontFamily: 'system-ui', fontWeight: 700, color: 'rgba(255,249,241,0.40)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
          </div>
        ))}
      </div>
      {enStatuses.map((s, ri) => (
        <div key={ri} style={{ display: 'flex', padding: '9px 12px', borderBottom: '0.5px solid #E6D7C8', alignItems: 'center', gap: 6, background: '#FFFDF8' }}>
          <div style={{ flex: 2 }}>
            <div style={{ height: 4, borderRadius: 2, background: '#E6D7C8', width: '68%' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: '8px', fontFamily: 'system-ui', fontWeight: 700, color: s.color, textTransform: 'uppercase' }}>{s.label}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ height: 4, borderRadius: 2, background: '#E6D7C8', width: '78%' }} />
          </div>
        </div>
      ))}
      <div style={{ flex: 1, background: '#FAF6EF' }} />
    </div>
  )
}

// ── FA Thumbnail — soft 3D SVG illustrations, warm brand palette ───────────
function ThumbnailFA({ id }: { id: number }) {
  const wrap: React.CSSProperties = {
    height:       '148px',
    borderRadius: '8px',
    overflow:     'hidden',
    position:     'relative',
    border:       '0.5px solid rgba(17,17,17,0.08)',
    flexShrink:    0,
  }

  /* ── ID 1 : AI Email Reply Kit ──────────────────────────────────────────── */
  if (id === 1) return (
    <div style={wrap} aria-hidden>
      <svg viewBox="0 0 320 148" width="100%" height="148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="fa1sh" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#111111" floodOpacity="0.08"/>
          </filter>
        </defs>
        <rect width="320" height="148" fill="#FFFDF8"/>
        <ellipse cx="268" cy="18" rx="96" ry="68" fill="rgba(227,78,46,0.05)"/>
        {/* Stacked cards — depth layers */}
        <rect x="68" y="50" width="190" height="74" rx="9" fill="#F1E8DD" opacity="0.65"/>
        <rect x="62" y="42" width="190" height="74" rx="9" fill="#FAF6EF" stroke="#E6D7C8" strokeWidth="0.5"/>
        {/* Main email card */}
        <rect x="56" y="34" width="190" height="76" rx="9" fill="#FFFDF8" stroke="#E6D7C8" strokeWidth="0.5" filter="url(#fa1sh)"/>
        {/* Header strip */}
        <rect x="56" y="34" width="190" height="22" rx="9" fill="#F1E8DD"/>
        <rect x="56" y="46" width="190" height="10" fill="#F1E8DD"/>
        {/* From indicator */}
        <circle cx="70" cy="45" r="4" fill="#E6D7C8"/>
        <rect x="80" y="42" width="46" height="5" rx="2.5" fill="#D4C5B5"/>
        <rect x="132" y="42" width="28" height="5" rx="2.5" fill="rgba(227,78,46,0.40)"/>
        {/* Body lines */}
        <rect x="68" y="63" width="122" height="4" rx="2" fill="#E6D7C8"/>
        <rect x="68" y="72" width="152" height="4" rx="2" fill="#E6D7C8"/>
        <rect x="68" y="81" width="95" height="4" rx="2" fill="#E6D7C8"/>
        {/* AI reply bubble */}
        <rect x="174" y="58" width="62" height="46" rx="8" fill="rgba(227,78,46,0.09)" stroke="rgba(227,78,46,0.24)" strokeWidth="0.5"/>
        <rect x="183" y="69" width="42" height="3.5" rx="1.75" fill="rgba(227,78,46,0.50)"/>
        <rect x="183" y="77" width="33" height="3.5" rx="1.75" fill="rgba(227,78,46,0.28)"/>
        <rect x="183" y="85" width="38" height="3.5" rx="1.75" fill="rgba(227,78,46,0.18)"/>
        <path d="M181 104 L174 114 L194 104 Z" fill="rgba(227,78,46,0.09)"/>
        {/* AI sparkle */}
        <circle cx="270" cy="38" r="16" fill="rgba(227,78,46,0.08)" stroke="rgba(227,78,46,0.18)" strokeWidth="0.5"/>
        <rect x="269" y="30" width="2" height="16" rx="1" fill="rgba(227,78,46,0.60)"/>
        <rect x="262" y="37" width="16" height="2" rx="1" fill="rgba(227,78,46,0.60)"/>
        <path d="M266 33 L274 41" stroke="rgba(227,78,46,0.28)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M274 33 L266 41" stroke="rgba(227,78,46,0.28)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )

  /* ── ID 2 : Weekly Report Summary ──────────────────────────────────────── */
  if (id === 2) return (
    <div style={wrap} aria-hidden>
      <svg viewBox="0 0 320 148" width="100%" height="148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="fa2sh" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#111111" floodOpacity="0.07"/>
          </filter>
        </defs>
        <rect width="320" height="148" fill="#FFFDF8"/>
        <ellipse cx="290" cy="138" rx="110" ry="75" fill="rgba(241,232,221,0.42)"/>
        {/* Document shadow + body */}
        <rect x="86" y="25" width="154" height="108" rx="10" fill="#111" opacity="0.03"/>
        <rect x="84" y="22" width="154" height="108" rx="10" fill="#FFFDF8" stroke="#E6D7C8" strokeWidth="0.5" filter="url(#fa2sh)"/>
        {/* Dark header */}
        <rect x="84" y="22" width="154" height="28" rx="10" fill="#111111"/>
        <rect x="84" y="40" width="154" height="10" fill="#111111"/>
        <circle cx="99" cy="36" r="5" fill="#E34E2E"/>
        <rect x="111" y="32" width="68" height="5" rx="2.5" fill="rgba(255,249,241,0.30)"/>
        <rect x="111" y="40" width="40" height="4" rx="2" fill="rgba(255,249,241,0.14)"/>
        {/* Check rows */}
        <circle cx="99" cy="60" r="4" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
        <path d="M97 60 L98.5 61.5 L102 58" stroke="#8C7E74" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="110" y="57" width="112" height="4" rx="2" fill="#E6D7C8"/>
        <circle cx="99" cy="74" r="4" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
        <path d="M97 74 L98.5 75.5 L102 72" stroke="#8C7E74" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="110" y="71" width="90" height="4" rx="2" fill="#E6D7C8"/>
        <circle cx="99" cy="88" r="4" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
        <path d="M97 88 L98.5 89.5 L102 86" stroke="#8C7E74" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="110" y="85" width="124" height="4" rx="2" fill="#E6D7C8"/>
        {/* Orange summary highlight */}
        <rect x="92" y="100" width="138" height="16" rx="5" fill="rgba(227,78,46,0.10)" stroke="rgba(227,78,46,0.22)" strokeWidth="0.5"/>
        <rect x="101" y="106" width="62" height="3.5" rx="1.75" fill="rgba(227,78,46,0.48)"/>
        <rect x="168" y="106" width="36" height="3.5" rx="1.75" fill="rgba(227,78,46,0.24)"/>
        {/* Tags */}
        <rect x="92" y="120" width="44" height="12" rx="6" fill="rgba(227,78,46,0.08)" stroke="rgba(227,78,46,0.20)" strokeWidth="0.5"/>
        <rect x="142" y="120" width="36" height="12" rx="6" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
      </svg>
    </div>
  )

  /* ── ID 3 : Content Planner ─────────────────────────────────────────────── */
  if (id === 3) return (
    <div style={wrap} aria-hidden>
      <svg viewBox="0 0 320 148" width="100%" height="148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="fa3sh" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#111111" floodOpacity="0.06"/>
          </filter>
        </defs>
        <rect width="320" height="148" fill="#FFFDF8"/>
        <ellipse cx="48" cy="138" rx="110" ry="72" fill="rgba(241,232,221,0.36)"/>
        {/* Board background */}
        <rect x="22" y="13" width="278" height="126" rx="12" fill="#FAF6EF" stroke="#E6D7C8" strokeWidth="0.5" filter="url(#fa3sh)"/>
        {/* Header band */}
        <rect x="22" y="13" width="278" height="36" rx="12" fill="#F1E8DD"/>
        <rect x="22" y="37" width="278" height="12" fill="#F1E8DD"/>
        {/* 5 day cells */}
        <rect x="30" y="19" width="42" height="24" rx="6" fill="#FFFDF8" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="76" y="19" width="42" height="24" rx="6" fill="#FFFDF8" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="122" y="19" width="48" height="24" rx="6" fill="#E34E2E"/>
        <rect x="174" y="19" width="42" height="24" rx="6" fill="#FFFDF8" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="220" y="19" width="42" height="24" rx="6" fill="#FFFDF8" stroke="#E6D7C8" strokeWidth="0.5"/>
        {/* Cell content lines */}
        <rect x="37" y="26" width="26" height="3.5" rx="1.75" fill="#E6D7C8"/>
        <rect x="83" y="26" width="26" height="3.5" rx="1.75" fill="#E6D7C8"/>
        <rect x="130" y="26" width="30" height="3.5" rx="1.75" fill="rgba(255,255,255,0.52)"/>
        <rect x="181" y="26" width="26" height="3.5" rx="1.75" fill="#E6D7C8"/>
        <rect x="227" y="26" width="26" height="3.5" rx="1.75" fill="#E6D7C8"/>
        {/* Content card rows */}
        <rect x="30" y="56" width="244" height="18" rx="5" fill="rgba(227,78,46,0.09)" stroke="rgba(227,78,46,0.22)" strokeWidth="0.5"/>
        <rect x="39" y="62" width="140" height="4" rx="2" fill="rgba(227,78,46,0.42)"/>
        <rect x="238" y="59" width="28" height="12" rx="6" fill="rgba(227,78,46,0.18)" stroke="rgba(227,78,46,0.32)" strokeWidth="0.5"/>
        <rect x="30" y="80" width="204" height="18" rx="5" fill="#FFFDF8" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="39" y="86" width="112" height="4" rx="2" fill="#E6D7C8"/>
        <rect x="198" y="83" width="28" height="12" rx="6" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="30" y="104" width="222" height="18" rx="5" fill="#FFFDF8" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="39" y="110" width="130" height="4" rx="2" fill="#E6D7C8"/>
        <rect x="218" y="107" width="28" height="12" rx="6" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
      </svg>
    </div>
  )

  /* ── ID 4 : Prompt Library Tracker ─────────────────────────────────────── */
  if (id === 4) return (
    <div style={wrap} aria-hidden>
      <svg viewBox="0 0 320 148" width="100%" height="148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="fa4sh" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#111111" floodOpacity="0.08"/>
          </filter>
        </defs>
        <rect width="320" height="148" fill="#FFFDF8"/>
        <ellipse cx="278" cy="26" rx="106" ry="74" fill="rgba(227,78,46,0.05)"/>
        {/* Back cards fanned */}
        <rect x="96" y="44" width="150" height="92" rx="10" fill="#F1E8DD" opacity="0.72" transform="rotate(-6 171 90)"/>
        <rect x="96" y="38" width="150" height="92" rx="10" fill="#FAF6EF" stroke="#E6D7C8" strokeWidth="0.5" transform="rotate(-2 171 84)"/>
        {/* Front selected card */}
        <rect x="84" y="22" width="152" height="102" rx="10" fill="#FFFDF8" stroke="rgba(227,78,46,0.28)" strokeWidth="1" filter="url(#fa4sh)"/>
        {/* Orange header */}
        <rect x="84" y="22" width="152" height="28" rx="10" fill="rgba(227,78,46,0.10)"/>
        <rect x="84" y="40" width="152" height="10" fill="rgba(227,78,46,0.10)"/>
        <rect x="97" y="30" width="64" height="5" rx="2.5" fill="rgba(227,78,46,0.48)"/>
        <rect x="200" y="27" width="24" height="17" rx="5" fill="rgba(227,78,46,0.18)" stroke="rgba(227,78,46,0.32)" strokeWidth="0.5"/>
        {/* Tag chips */}
        <rect x="97" y="57" width="38" height="12" rx="6" fill="#E34E2E"/>
        <rect x="141" y="57" width="44" height="12" rx="6" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="191" y="57" width="34" height="12" rx="6" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
        {/* Prompt entries */}
        <rect x="97" y="75" width="118" height="4" rx="2" fill="#E6D7C8"/>
        <rect x="218" y="72" width="18" height="10" rx="5" fill="rgba(227,78,46,0.15)" stroke="rgba(227,78,46,0.28)" strokeWidth="0.5"/>
        <rect x="97" y="89" width="98" height="4" rx="2" fill="#E6D7C8"/>
        <rect x="218" y="86" width="18" height="10" rx="5" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="97" y="103" width="108" height="4" rx="2" fill="#E6D7C8"/>
        <rect x="218" y="100" width="18" height="10" rx="5" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
        {/* Search pill */}
        <rect x="97" y="116" width="104" height="14" rx="7" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
        <circle cx="109" cy="123" r="3.5" stroke="#D4C5B5" strokeWidth="1"/>
        <path d="M111.5 125.5 L114 128" stroke="#D4C5B5" strokeWidth="1" strokeLinecap="round"/>
        <rect x="117" y="121" width="52" height="3" rx="1.5" fill="#D4C5B5"/>
      </svg>
    </div>
  )

  /* ── ID 5 : Client Lead Tracker ─────────────────────────────────────────── */
  if (id === 5) return (
    <div style={wrap} aria-hidden>
      <svg viewBox="0 0 320 148" width="100%" height="148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="fa5sh" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#111111" floodOpacity="0.06"/>
          </filter>
        </defs>
        <rect width="320" height="148" fill="#FFFDF8"/>
        <ellipse cx="160" cy="148" rx="170" ry="52" fill="rgba(241,232,221,0.36)"/>
        {/* Board */}
        <rect x="14" y="13" width="294" height="126" rx="12" fill="#FAF6EF" stroke="#E6D7C8" strokeWidth="0.5" filter="url(#fa5sh)"/>
        {/* Column dividers */}
        <line x1="112" y1="13" x2="112" y2="139" stroke="#E6D7C8" strokeWidth="0.5"/>
        <line x1="210" y1="13" x2="210" y2="139" stroke="#E6D7C8" strokeWidth="0.5"/>
        {/* Column headers */}
        <circle cx="30" cy="27" r="5" fill="rgba(227,78,46,0.18)" stroke="#E34E2E" strokeWidth="0.5" strokeOpacity="0.38"/>
        <rect x="41" y="24" width="36" height="5" rx="2.5" fill="rgba(227,78,46,0.30)"/>
        <circle cx="128" cy="27" r="5" fill="rgba(140,126,116,0.18)" stroke="#8C7E74" strokeWidth="0.5" strokeOpacity="0.38"/>
        <rect x="139" y="24" width="36" height="5" rx="2.5" fill="rgba(140,126,116,0.28)"/>
        <circle cx="226" cy="27" r="5" fill="rgba(212,197,181,0.40)" stroke="#D4C5B5" strokeWidth="0.5"/>
        <rect x="237" y="24" width="36" height="5" rx="2.5" fill="#D4C5B5"/>
        {/* Hot column cards */}
        <rect x="20" y="40" width="84" height="22" rx="6" fill="#FFFDF8" stroke="rgba(227,78,46,0.28)" strokeWidth="1"/>
        <circle cx="31" cy="51" r="3" fill="#E34E2E"/>
        <rect x="39" y="47" width="50" height="3.5" rx="1.75" fill="#E6D7C8"/>
        <rect x="39" y="54" width="36" height="3" rx="1.5" fill="rgba(227,78,46,0.26)"/>
        <rect x="20" y="68" width="84" height="22" rx="6" fill="#FAF6EF" stroke="#E6D7C8" strokeWidth="0.5"/>
        <circle cx="31" cy="79" r="3" fill="#E34E2E" fillOpacity="0.32"/>
        <rect x="39" y="75" width="50" height="3.5" rx="1.75" fill="#E6D7C8"/>
        <rect x="39" y="82" width="34" height="3" rx="1.5" fill="#E6D7C8"/>
        <rect x="20" y="96" width="84" height="22" rx="6" fill="#FAF6EF" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="30" y="103" width="62" height="3.5" rx="1.75" fill="#E6D7C8"/>
        <rect x="30" y="110" width="42" height="3" rx="1.5" fill="#E6D7C8"/>
        {/* Warm column cards */}
        <rect x="118" y="40" width="84" height="22" rx="6" fill="#FAF6EF" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="128" y="47" width="62" height="3.5" rx="1.75" fill="#E6D7C8"/>
        <rect x="128" y="54" width="42" height="3" rx="1.5" fill="#E6D7C8"/>
        <rect x="118" y="68" width="84" height="22" rx="6" fill="#FAF6EF" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="128" y="75" width="62" height="3.5" rx="1.75" fill="#E6D7C8"/>
        <rect x="128" y="82" width="46" height="3" rx="1.5" fill="#E6D7C8"/>
        {/* Dashed follow-up */}
        <rect x="118" y="96" width="84" height="22" rx="6" fill="rgba(227,78,46,0.06)" stroke="rgba(227,78,46,0.24)" strokeWidth="0.5" strokeDasharray="4 2"/>
        <rect x="128" y="104" width="54" height="3" rx="1.5" fill="rgba(227,78,46,0.34)"/>
        {/* Cold column */}
        <rect x="216" y="40" width="84" height="22" rx="6" fill="#FAF6EF" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="226" y="47" width="62" height="3.5" rx="1.75" fill="#E6D7C8"/>
        <rect x="226" y="54" width="42" height="3" rx="1.5" fill="#E6D7C8"/>
      </svg>
    </div>
  )

  /* ── ID 6 : Meeting Summary and Next Steps (default) ────────────────────── */
  return (
    <div style={wrap} aria-hidden>
      <svg viewBox="0 0 320 148" width="100%" height="148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="fa6sh" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#111111" floodOpacity="0.07"/>
          </filter>
        </defs>
        <rect width="320" height="148" fill="#FFFDF8"/>
        <ellipse cx="60" cy="16" rx="108" ry="72" fill="rgba(241,232,221,0.36)"/>
        {/* Page stack — depth */}
        <rect x="114" y="26" width="140" height="108" rx="10" fill="#F1E8DD" opacity="0.58"/>
        <rect x="108" y="20" width="140" height="108" rx="10" fill="#FAF6EF" stroke="#E6D7C8" strokeWidth="0.5"/>
        {/* Main page */}
        <rect x="100" y="14" width="142" height="112" rx="10" fill="#FFFDF8" stroke="#E6D7C8" strokeWidth="0.5" filter="url(#fa6sh)"/>
        {/* Dark header */}
        <rect x="100" y="14" width="142" height="24" rx="10" fill="#111111"/>
        <rect x="100" y="28" width="142" height="10" fill="#111111"/>
        <rect x="113" y="20" width="72" height="4.5" rx="2.25" fill="rgba(255,249,241,0.32)"/>
        {/* Bullet rows */}
        <circle cx="115" cy="47" r="3.5" fill="rgba(227,78,46,0.20)" stroke="rgba(227,78,46,0.44)" strokeWidth="0.5"/>
        <rect x="124" y="44" width="90" height="4" rx="2" fill="#E6D7C8"/>
        <circle cx="115" cy="61" r="3.5" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="124" y="58" width="72" height="4" rx="2" fill="#E6D7C8"/>
        {/* Checkboxes */}
        <rect x="111" y="72" width="8" height="8" rx="1.5" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
        <rect x="124" y="74" width="88" height="4" rx="2" fill="#E6D7C8"/>
        <rect x="111" y="86" width="8" height="8" rx="1.5" fill="#F1E8DD" stroke="#E6D7C8" strokeWidth="0.5"/>
        <path d="M113 90 L114.5 91.5 L118 88" stroke="#8C7E74" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="124" y="88" width="78" height="4" rx="2" fill="#E6D7C8"/>
        {/* Orange next-steps footer */}
        <rect x="100" y="102" width="142" height="24" rx="10" fill="rgba(227,78,46,0.09)" stroke="rgba(227,78,46,0.22)" strokeWidth="0.5"/>
        <rect x="100" y="102" width="142" height="12" fill="rgba(227,78,46,0.09)"/>
        <circle cx="113" cy="114" r="3.5" fill="rgba(227,78,46,0.50)"/>
        <rect x="122" y="111" width="54" height="3.5" rx="1.75" fill="rgba(227,78,46,0.48)"/>
        <rect x="182" y="111" width="32" height="3.5" rx="1.75" fill="rgba(227,78,46,0.24)"/>
      </svg>
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
        style={{ position: 'absolute', inset: 0, background: 'rgba(17,17,17,0.72)', backdropFilter: 'blur(4px)' }}
      />

      <div
        style={{
          position: 'relative', zIndex: 1,
          background: isFa ? '#FAF6EF' : '#FAF1E6',
          border: '0.5px solid #E6D7C8',
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
            background: 'rgba(0,0,0,0.05)',
            border: '0.5px solid #E6D7C8',
            cursor: 'pointer', color: '#111111',
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
              ? { background: '#171717', color: '#FFF9F1' }
              : { background: 'rgba(0,0,0,0.05)', border: '0.5px solid #E6D7C8', color: '#625B55' }),
          }}
        >
          {tierLabel}
        </span>

        <h3
          className={isFa ? 'font-fa' : 'font-en font-bold'}
          style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: isFa ? 800 : undefined, color: '#111111', marginBottom: '8px', lineHeight: 1.2 }}
        >
          {tmpl.name}
        </h3>

        <p
          className={`${isFa ? 'font-fa' : 'font-ui'}`}
          style={{ fontSize: '16px', color: '#625B55', lineHeight: 1.55, marginBottom: '16px' }}
        >
          {tmpl.desc}
        </p>

        <div style={{ height: '0.5px', background: '#E6D7C8', marginBottom: '16px' }} />

        <p
          className={isFa ? 'font-fa' : 'font-ui font-semibold'}
          style={{ fontSize: '12px', letterSpacing: isFa ? '0.06em' : '.18em', textTransform: isFa ? 'none' : 'uppercase', color: 'rgba(98,91,85,0.55)', marginBottom: '10px', fontWeight: isFa ? 700 : undefined }}
        >
          {isFa ? 'چه شامل می‌شود' : "What's inside"}
        </p>
        <p
          className={`${isFa ? 'font-fa' : 'font-ui'}`}
          style={{ fontSize: '15px', color: '#625B55', lineHeight: 1.6, marginBottom: '22px' }}
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
                color: '#625B55',
                background: 'rgba(0,0,0,0.04)',
                border: '0.5px solid #E6D7C8',
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
            borderRadius: '100px',
            fontSize: '15px',
            color: '#FFFDF8', textDecoration: 'none',
            background: isFa ? '#E34E2E' : '#111111',
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

  // ── EN: editorial premium design ────────────────────────────────────
  if (!isFa) {
    return (
      <>
        <section
          id="templates"
          className="scroll-mt-24"
          style={{
            background: '#FFFDF8',
            padding: 'clamp(56px, 7vw, 80px) clamp(24px, 8vw, 80px) clamp(80px, 10vw, 104px)',
          }}
        >
          <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

            {/* Filter pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
              {CATEGORIES.map((cat) => {
                const active = filter === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    className="font-ui cursor-pointer transition-all duration-200"
                    style={{
                      padding: '8px 20px',
                      borderRadius: '100px',
                      fontSize: '13.5px',
                      fontWeight: active ? 600 : 400,
                      border: active ? 'none' : '0.5px solid rgba(17,17,17,0.14)',
                      background: active ? '#111111' : 'transparent',
                      color: active ? '#FFFDF8' : '#625B55',
                    }}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Template count */}
            <p
              className="font-ui text-center mb-10"
              style={{ fontSize: '12px', color: 'rgba(17,17,17,0.32)', letterSpacing: '0.06em' }}
            >
              {visible.length} ready-to-run template{visible.length !== 1 ? 's' : ''}
            </p>

            {/* Card grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '24px',
              }}
            >
              {visible.map((tmpl) => (
                <div
                  key={tmpl.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    padding: '20px',
                    borderRadius: '12px',
                    background: '#FFFDF8',
                    border: '0.5px solid rgba(17,17,17,0.09)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)',
                  }}
                >
                  <ThumbnailEN cat={tmpl.cat} />

                  {/* Tier + name */}
                  <div>
                    <span
                      className="font-ui"
                      style={{
                        display: 'inline-block',
                        marginBottom: '7px',
                        padding: '3px 9px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '.06em',
                        ...(tmpl.tier === 'Premium'
                          ? { background: '#111111', color: '#FFFDF8' }
                          : { background: 'rgba(17,17,17,0.05)', border: '0.5px solid rgba(17,17,17,0.09)', color: '#8C7E74' }),
                      }}
                    >
                      {tmpl.tier.toUpperCase()}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 'clamp(18px, 1.6vw, 21px)',
                        fontWeight: 400,
                        color: '#111111',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                        margin: 0,
                      }}
                    >
                      {tmpl.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className="font-ui"
                    style={{ fontSize: '14px', color: '#625B55', lineHeight: 1.55, margin: 0, flexGrow: 1 }}
                  >
                    {tmpl.desc}
                  </p>

                  {/* Tool tags */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {tmpl.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-ui"
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          fontWeight: 500,
                          color: '#8C7E74',
                          background: 'rgba(17,17,17,0.04)',
                          border: '0.5px solid rgba(17,17,17,0.09)',
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Footer actions */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '14px',
                      borderTop: '0.5px solid rgba(17,17,17,0.07)',
                    }}
                  >
                    <a
                      href="#contact"
                      className="font-ui font-bold inline-flex items-center gap-1.5"
                      style={{ fontSize: '14px', color: '#E34E2E', textDecoration: 'none' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Get template
                      <ArrowRight size={13} />
                    </a>
                    <button
                      type="button"
                      className="font-ui cursor-pointer"
                      style={{
                        fontSize: '13px', fontWeight: 500, color: '#625B55',
                        background: 'none',
                        border: '0.5px solid rgba(17,17,17,0.12)',
                        padding: '6px 14px', borderRadius: '8px',
                        transition: 'color 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.color = '#E34E2E'
                        el.style.borderColor = 'rgba(227,78,46,0.30)'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.color = '#625B55'
                        el.style.borderColor = 'rgba(17,17,17,0.12)'
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreviewId(tmpl.id)
                      }}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {previewTmpl && (
          <PreviewModal
            tmpl={previewTmpl}
            isFa={false}
            onClose={() => setPreviewId(null)}
          />
        )}
      </>
    )
  }

  // ── FA: warm editorial design with illustrated thumbnails ────────────────
  return (
    <>
      <section
        id="templates"
        dir="rtl"
        className="scroll-mt-24"
        style={{
          background: '#FFFDF8',
          padding: 'clamp(56px, 7vw, 80px) clamp(24px, 8vw, 80px) clamp(80px, 10vw, 104px)',
        }}
      >
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

          {/* Filter pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
            {FA_CATEGORIES.map((cat) => {
              const active = filter === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  style={{
                    fontFamily:  vaFont,
                    padding:     '8px 20px',
                    borderRadius: '100px',
                    fontSize:    '13.5px',
                    fontWeight:   active ? 700 : 400,
                    border:       active ? 'none' : '0.5px solid rgba(17,17,17,0.14)',
                    background:   active ? '#111111' : 'transparent',
                    color:        active ? '#FFFDF8' : '#625B55',
                    cursor:      'pointer',
                    transition:  'all 0.15s',
                  }}
                >
                  {catLabel(cat)}
                </button>
              )
            })}
          </div>

          {/* Template count */}
          <p
            style={{
              fontFamily: vaFont,
              textAlign:  'center',
              marginBottom: '40px',
              fontSize:   '12px',
              color:      'rgba(17,17,17,0.32)',
              letterSpacing: '0.04em',
            }}
          >
            {toPersianNum(visible.length)} قالب آماده
          </p>

          {/* Card grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px',
            }}
          >
            {visible.map((tmpl) => (
              <div
                key={tmpl.id}
                style={{
                  display:       'flex',
                  flexDirection: 'column',
                  gap:           '16px',
                  padding:       '20px',
                  borderRadius:  '12px',
                  background:    '#FFFDF8',
                  border:        '0.5px solid rgba(17,17,17,0.09)',
                  boxShadow:     '0 1px 4px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <ThumbnailFA id={tmpl.id} />

                <div>
                  <span
                    style={{
                      display:     'inline-block',
                      marginBottom: '7px',
                      padding:     '3px 9px',
                      borderRadius: '4px',
                      fontFamily:   vaFont,
                      fontSize:    '10px',
                      fontWeight:   700,
                      letterSpacing: '.06em',
                      ...(tmpl.tier === 'Premium'
                        ? { background: '#111111', color: '#FFFDF8' }
                        : { background: 'rgba(17,17,17,0.05)', border: '0.5px solid rgba(17,17,17,0.09)', color: '#8C7E74' }),
                    }}
                  >
                    {tierLabel(tmpl.tier)}
                  </span>
                  <h3
                    style={{
                      fontFamily:    vaFont,
                      fontSize:      'clamp(17px, 1.5vw, 20px)',
                      fontWeight:     800,
                      color:          '#111111',
                      letterSpacing: '-0.01em',
                      lineHeight:     1.25,
                      margin:         0,
                    }}
                  >
                    {tmpl.name}
                  </h3>
                </div>

                <p
                  style={{
                    fontFamily: vaFont,
                    fontSize:   '14px',
                    color:      '#625B55',
                    lineHeight:  1.65,
                    margin:      0,
                    flexGrow:    1,
                  }}
                >
                  {tmpl.desc}
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {tmpl.tools.map((tool) => (
                    <span
                      key={tool}
                      style={{
                        fontFamily:  vaFont,
                        padding:     '4px 10px',
                        borderRadius: '6px',
                        fontSize:    '11.5px',
                        fontWeight:   500,
                        color:        '#8C7E74',
                        background:  'rgba(17,17,17,0.04)',
                        border:      '0.5px solid rgba(17,17,17,0.09)',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display:         'flex',
                    justifyContent:  'space-between',
                    alignItems:      'center',
                    paddingTop:      '14px',
                    borderTop:       '0.5px solid rgba(17,17,17,0.07)',
                  }}
                >
                  <a
                    href="#contact"
                    style={{
                      fontFamily:     vaFont,
                      fontSize:       '14px',
                      fontWeight:      700,
                      color:           '#E34E2E',
                      textDecoration: 'none',
                      display:        'inline-flex',
                      alignItems:     'center',
                      gap:            '4px',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    دریافت قالب
                    <ArrowRight size={13} className="rotate-180" />
                  </a>
                  <button
                    type="button"
                    style={{
                      fontFamily:  vaFont,
                      fontSize:    '13px',
                      fontWeight:   500,
                      color:        '#625B55',
                      background:  'none',
                      border:      '0.5px solid rgba(17,17,17,0.12)',
                      padding:     '6px 14px',
                      borderRadius: '8px',
                      cursor:      'pointer',
                      transition:  'color 0.15s, border-color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.color = '#E34E2E'
                      el.style.borderColor = 'rgba(227,78,46,0.30)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.color = '#625B55'
                      el.style.borderColor = 'rgba(17,17,17,0.12)'
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setPreviewId(tmpl.id)
                    }}
                  >
                    پیش‌نمایش
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              marginTop:     '80px',
              padding:       'clamp(40px, 6vw, 64px) clamp(28px, 5vw, 52px)',
              background:    '#FAF6EF',
              borderRadius:  '16px',
              border:        '0.5px solid rgba(17,17,17,0.07)',
              textAlign:     'center',
            }}
          >
            <p
              style={{
                fontFamily:    vaFont,
                fontSize:      '11px',
                fontWeight:     700,
                letterSpacing: '0.14em',
                color:          '#E34E2E',
                marginBottom:  '20px',
              }}
            >
              از همین‌جا شروع کن
            </p>
            <h2
              style={{
                fontFamily:    vaFont,
                fontSize:      'clamp(26px, 3.5vw, 44px)',
                fontWeight:     800,
                color:          '#111111',
                lineHeight:     1.22,
                letterSpacing: '-0.01em',
                marginBottom:  '16px',
              }}
            >
              از یک قالب ساده شروع کن و سیستم خودت را بساز
            </h2>
            <p
              style={{
                fontFamily:  vaFont,
                fontSize:    'clamp(14px, 1.3vw, 17px)',
                color:       '#625B55',
                lineHeight:   1.80,
                maxWidth:    '500px',
                margin:      '0 auto 36px',
              }}
            >
              قالب‌ها برای آدم‌هایی طراحی شده‌اند که می‌خواهند کارشان را ساده‌تر کنند، نه آنها که دنبال ابزار پیچیده‌اند
            </p>
            <a
              href="#contact"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '8px',
                padding:        '14px 32px',
                background:     '#E34E2E',
                color:          '#FFFDF8',
                borderRadius:   '100px',
                textDecoration: 'none',
                fontFamily:      vaFont,
                fontSize:        '15px',
                fontWeight:       700,
                transition:      'background 0.15s, transform 0.15s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.background = '#C63C1E'
                ;(e.currentTarget as HTMLAnchorElement).style.transform  = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.background = '#E34E2E'
                ;(e.currentTarget as HTMLAnchorElement).style.transform  = 'translateY(0)'
              }}
            >
              دیدن قالب‌ها
            </a>
          </div>

        </div>
      </section>

      {previewTmpl && (
        <PreviewModal
          tmpl={previewTmpl}
          isFa={true}
          onClose={() => setPreviewId(null)}
        />
      )}
    </>
  )
}
