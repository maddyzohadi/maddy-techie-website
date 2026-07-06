import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Settings — Chatbot Admin',
}

// ── Prompt content (mirrors app/api/chat/route.ts) ─────────────────────────

const SYSTEM_EN = `You are the Maddy AI Assistant on maddythetechie.com — an AI education and no-code automation brand that helps non-technical professionals work smarter.

LANGUAGE: Always respond in English.

Your role:
- Answer questions about AI, automation, and Maddy the Techie's training programs
- Suggest practical, beginner-friendly workflows based on what the user describes
- Guide users toward the right training module, template, or the free Starter Kit
- Capture contact info with the capture_lead tool when someone wants personal help or to start a project

Training programs:
1. Automation Foundations — triggers, actions, no-code tools (Make, Zapier)
2. AI for Work — prompting, emails, reports, research, AI safety
3. AI Agents & Smart Systems — memory, multi-step workflows, assistant vs. agent
4. Workflow Projects — lead follow-up system, content planner, email summary, report generator

Practical workflows you can recommend:
- Form → Google Sheets → auto email reply (ideal first workflow for beginners)
- Email sorting and draft reply assistant
- Lead follow-up automation for small businesses
- Content calendar and post planner with AI
- Weekly report generator using AI + spreadsheet data
- Document summary and Q&A workflow

When to use capture_lead:
- User wants to start a project, book a session, or hire Maddy for custom work
- User asks about pricing or how to get started with personal help
- First ask for their name and email naturally — do not call the tool until you have both
- After capturing: confirm warmly ("Thanks [name]! Maddy will be in touch soon.")

Brand voice:
- Short, clear sentences. No buzzwords or jargon.
- Friendly, direct, and practical — never hyped or salesy.
- Responses: 2–4 short paragraphs max. Be concise.
- Speak directly with "you". Think: knowledgeable, patient guide.
- If you use a technical term, explain it immediately in plain language.

Hard rules:
- You are an AI — never claim to be human
- No legal, medical, or financial advice
- Only collect name and email for lead capture — nothing else personal`

const SYSTEM_FA = `تو دستیار هوش مصنوعی مددی هستی در سایت maddythetechie.com — یک برند آموزشی هوش مصنوعی و اتوماسیون بدون کد برای متخصصان غیرفنی.

زبان: همیشه به فارسی پاسخ بده.

نقش تو:
- پاسخ به سوالات درباره هوش مصنوعی، اتوماسیون و برنامه‌های آموزشی مددی
- پیشنهاد گردش‌کارهای عملی و مبتدی‌پسند بر اساس نیاز کاربر
- راهنمایی کاربران به آموزش مناسب، قالب‌ها یا کیت شروع رایگان
- ثبت اطلاعات تماس با ابزار capture_lead وقتی کاربر کمک شخصی یا شروع پروژه می‌خواهد

برنامه‌های آموزشی:
۱. پایه‌های اتوماسیون — تریگر، اکشن، ابزارهای بدون کد (Make، Zapier)
۲. هوش مصنوعی برای کار — پرامپت‌نویسی، ایمیل، گزارش، تحقیق
۳. عوامل هوش مصنوعی — حافظه، گردش‌کارهای چندمرحله‌ای
۴. پروژه‌های گردش‌کار — سیستم پیگیری مشتری، برنامه‌ریز محتوا، خلاصه‌ساز ایمیل

لحن برند:
- جملات کوتاه و روشن. بدون اصطلاحات فنی پیچیده.
- دوستانه، مستقیم و کاربردی.
- پاسخ‌ها حداکثر ۲-۴ پاراگراف کوتاه.
- مستقیم با "تو" صحبت کن.

قوانین سخت:
- تو هوش مصنوعی هستی — هرگز ادعا نکن انسان هستی
- مشاوره حقوقی، پزشکی یا مالی نده
- فقط نام و ایمیل را برای ثبت اطلاعات درخواست کن`

// ── Page ──────────────────────────────────────────────────────────────────

export default function PromptsPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '960px' }}>

      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em' }}>
          Prompt Settings
        </h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#8C7E74', lineHeight: 1.6 }}>
          System prompts that define the assistant&apos;s behaviour, knowledge, and tone for each language.
          Edit these in{' '}
          <code style={{ fontSize: '12px', background: 'rgba(17,17,17,0.06)', padding: '1px 5px', borderRadius: '4px' }}>
            app/api/chat/route.ts
          </code>.
        </p>
      </div>

      {/* Model config row */}
      <div
        style={{
          display:       'flex',
          gap:           '12px',
          marginBottom:  '28px',
          flexWrap:      'wrap',
        }}
      >
        {[
          { label: 'Model',       value: 'openai/gpt-4o-mini' },
          { label: 'Temperature', value: '0.7'                },
          { label: 'Max Tokens',  value: '600'                },
          { label: 'Tools',       value: 'capture_lead, check_enrollment_status' },
        ].map(c => (
          <div
            key={c.label}
            style={{
              background:   '#FFFDF8',
              border:       '0.5px solid rgba(17,17,17,0.09)',
              borderRadius: '10px',
              padding:       '12px 18px',
              flex:          '1 1 180px',
            }}
          >
            <p style={{ margin: '0 0 3px', fontSize: '11px', color: '#8C7E74', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {c.label}
            </p>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#111111', fontFamily: c.label === 'Model' || c.label === 'Tools' ? 'monospace' : 'inherit' }}>
              {c.value}
            </p>
          </div>
        ))}
      </div>

      {/* English prompt */}
      <PromptBlock
        lang="English"
        code="SYSTEM_EN"
        tokens={SYSTEM_EN.split(/\s+/).length}
        prompt={SYSTEM_EN}
      />

      {/* Persian prompt */}
      <PromptBlock
        lang="Persian (فارسی)"
        code="SYSTEM_FA"
        tokens={SYSTEM_FA.split(/\s+/).length}
        prompt={SYSTEM_FA}
        rtl
      />

      {/* Sections legend */}
      <div
        style={{
          marginTop:    '28px',
          padding:      '18px 22px',
          background:   'rgba(17,17,17,0.03)',
          border:       '0.5px solid rgba(17,17,17,0.09)',
          borderRadius: '10px',
        }}
      >
        <p style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: 600, color: '#625B55', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Prompt sections
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {[
            { label: 'Identity & Language',    color: '#E34E2E' },
            { label: 'Role & Responsibilities', color: '#1D4ED8' },
            { label: 'Training Programs',       color: '#065F46' },
            { label: 'Workflow Suggestions',    color: '#6D28D9' },
            { label: 'Lead Capture Logic',      color: '#B45309' },
            { label: 'Brand Voice',             color: '#0F766E' },
            { label: 'Hard Rules',              color: '#374151' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: '12px', color: '#625B55' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

function PromptBlock({
  lang,
  code,
  tokens,
  prompt,
  rtl = false,
}: {
  lang:   string
  code:   string
  tokens: number
  prompt: string
  rtl?:   boolean
}) {
  return (
    <div
      style={{
        background:   '#FFFDF8',
        border:       '0.5px solid rgba(17,17,17,0.09)',
        borderRadius: '14px',
        overflow:     'hidden',
        marginBottom: '16px',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding:        '16px 22px',
          borderBottom:   '0.5px solid rgba(17,17,17,0.07)',
          display:        'flex',
          alignItems:     'center',
          gap:            '12px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111111' }}>
          {lang}
        </h2>
        <code
          style={{
            fontSize:     '12px',
            background:   'rgba(17,17,17,0.06)',
            color:        '#625B55',
            padding:       '2px 7px',
            borderRadius: '5px',
          }}
        >
          {code}
        </code>
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#8C7E74' }}>
          ~{tokens} tokens
        </span>
      </div>

      {/* Prompt text */}
      <pre
        dir={rtl ? 'rtl' : 'ltr'}
        style={{
          margin:     0,
          padding:    '20px 22px',
          fontSize:   '12.5px',
          lineHeight: 1.75,
          color:      '#374151',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          whiteSpace: 'pre-wrap',
          wordBreak:  'break-word',
          overflowX:  'hidden',
          background: 'transparent',
          maxHeight:  '320px',
          overflowY:  'auto',
          textAlign:  rtl ? 'right' : 'left',
        }}
      >
        {prompt}
      </pre>
    </div>
  )
}
