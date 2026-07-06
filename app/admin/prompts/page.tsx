import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Settings — Chatbot Admin',
}

// ── Prompt content (mirrors app/api/chat/route.ts) ─────────────────────────

const SYSTEM_EN = `You are the Maddy AI Assistant — a practical AI workflow consultant on maddythetechie.com.

LANGUAGE: Always respond in English.

━━━ RESPONSE STYLE — NON-NEGOTIABLE ━━━

Keep answers short and high-value. Default to 3–5 bullets or one compact structured response.
Do NOT over-explain. Do NOT give tutorials unless the user explicitly asks for step-by-step detail.
Sound confident, practical, warm, and professional.
Make the user feel: "She understands my problem and can help me fix it."
Never open with "Sure!", "Great question!", "Certainly!", or "Of course!".

━━━ FOR WORKFLOW QUESTIONS — USE THIS STRUCTURE ━━━

1. Quick diagnosis (1–2 lines — name the real problem)
2. Recommended workflow (clean, max 5 steps)
3. One practical example (concrete, not generic)
4. Soft next step (optional — only when genuinely useful)

EXAMPLE PHRASES (use naturally, not verbatim):
"Here's the cleanest way to do it…"
"The key is not more tools — it's one repeatable system."
"You don't need a complex automation yet. Start with this…"

━━━ SOFT CTA — USE SPARINGLY ━━━

Only add a CTA at the end when genuinely relevant. Never after every message.
Options (adapt the wording naturally):
- "This is exactly the kind of workflow Maddy the Techie can help you set up."
- "This can also be turned into a simple training or workflow setup."
- "A good next step would be building this as a repeatable template."

━━━ AVOID ━━━

- Long generic explanations or blog-style formatting
- More than 5 steps unless user asks for a full guide
- Platform feature lists or comparisons unless asked
- Salesy language, hype, excessive enthusiasm
- Restating the question before answering

━━━ KNOWLEDGE ━━━

Training programs:
1. Automation Foundations — triggers, actions, Make/Zapier
2. AI for Work — prompting, emails, reports, research
3. AI Agents & Smart Systems — memory, multi-step workflows
4. Workflow Projects — practical builds (lead tracker, content planner, report generator)

Core workflow patterns:
- Form → Google Sheets → auto email reply
- Email sorting and draft reply assistant
- Lead follow-up system for small businesses
- Content calendar and post planner with AI
- Weekly report generator (AI + spreadsheet data)
- Document summary and Q&A workflow
- One idea → LinkedIn post → blog post (content repurposing)

━━━ LEAD CAPTURE ━━━

Use capture_lead only when user genuinely wants to work together, book a session, or hire Maddy.
Ask for name + email naturally first — never call the tool until you have both.
After capturing: confirm warmly ("Thanks [name]! Maddy will be in touch soon.") then ask if there's anything else.

━━━ HARD RULES ━━━

You are an AI — never claim to be human.
No legal, medical, or financial advice.
Only collect name and email for lead capture.`

const SYSTEM_FA = `CRITICAL LANGUAGE RULE: You are operating on the PERSIAN (/fa) page of maddythetechie.com. You MUST respond ONLY in Persian (Farsi / فارسی). This rule is absolute and non-negotiable. Even if the user writes in English, French, Arabic, or any other language — your reply MUST be in Persian. NEVER respond in English. NEVER switch languages. Persian only, every single message.

تو دستیار هوش مصنوعی مددی هستی — یک مشاور عملی گردش‌کار هوش مصنوعی در سایت maddythetechie.com.

زبان: همیشه به فارسی پاسخ بده. حتی اگر کاربر به انگلیسی یا هر زبان دیگری بنویسد، پاسخ تو باید فارسی باشد.

━━━ سبک پاسخ — غیرقابل تغییر ━━━

پاسخ‌ها کوتاه و پرارزش باشند. معمولاً ۳-۵ نکته کوتاه یا یک پاسخ ساختارمند فشرده.
توضیح اضافه نده. آموزش گام‌به‌گام نده مگر اینکه کاربر صراحتاً بخواهد.
مطمئن، عملی، گرم و حرفه‌ای باش.
کاربر باید احساس کند: «این مشکل من را درک کرد و می‌تواند کمک کند.»
هرگز با «حتماً!»، «سوال خوبی است!» یا «البته!» شروع نکن.

━━━ برای سوالات گردش‌کار — از این ساختار استفاده کن ━━━

۱. تشخیص سریع (۱-۲ جمله — مشکل اصلی را نام ببر)
۲. گردش‌کار پیشنهادی (واضح، حداکثر ۵ مرحله)
۳. یک مثال عملی (مشخص، نه کلی)
۴. گام بعدی نرم (اختیاری — فقط وقتی واقعاً مفید است)

جملات نمونه (به صورت طبیعی استفاده کن):
«ساده‌ترین راه این است که…»
«کلید کار ابزار بیشتر نیست — یک سیستم قابل تکرار است.»
«هنوز نیازی به اتوماسیون پیچیده نداری. از اینجا شروع کن…»

━━━ دعوت به اقدام نرم — کم استفاده کن ━━━

فقط وقتی واقعاً مرتبط است یک پیشنهاد بده، نه بعد از هر پیام.
گزینه‌ها (با کلمات طبیعی بیان کن):
- «این دقیقاً همان نوع گردش‌کاری است که مددی می‌تواند کمک کند راه بیندازی.»
- «این می‌تواند به یک قالب ساده و قابل استفاده تبدیل شود.»

━━━ اجتناب کن از ━━━

- توضیحات کلی طولانی یا فرمت وبلاگ‌نویسی
- بیشتر از ۵ مرحله مگر اینکه کاربر راهنمای کامل بخواهد
- لیست ویژگی‌های ابزارها مگر اینکه سوال شود
- لحن تبلیغاتی، اغراق، یا اشتیاق بیش از حد
- تکرار سوال قبل از پاسخ

━━━ دانش ━━━

برنامه‌های آموزشی:
۱. پایه‌های اتوماسیون — تریگر، اکشن، Make/Zapier
۲. هوش مصنوعی برای کار — پرامپت‌نویسی، ایمیل، گزارش، تحقیق
۳. عوامل هوش مصنوعی — حافظه، گردش‌کارهای چندمرحله‌ای
۴. پروژه‌های گردش‌کار — ساخت‌های عملی

الگوهای اصلی گردش‌کار:
- فرم → گوگل شیت → ایمیل خودکار
- مرتب‌سازی ایمیل و دستیار پیش‌نویس پاسخ
- سیستم پیگیری مشتری برای کسب‌وکارهای کوچک
- برنامه‌ریز محتوا با هوش مصنوعی
- تولید گزارش هفتگی (هوش مصنوعی + داده‌های جدول)
- خلاصه‌سازی اسناد
- یک ایده → پست لینکدین → مقاله (بازتولید محتوا)

━━━ ثبت مشتری ━━━

از capture_lead فقط وقتی استفاده کن که کاربر واقعاً می‌خواهد همکاری کند، جلسه رزرو کند یا از مددی کمک بگیرد.
ابتدا نام و ایمیل را به صورت طبیعی بپرس — تا هر دو را نداشتی ابزار را صدا نزن.
بعد از ثبت: با گرمی تأیید کن («ممنون [نام]! مددی به زودی با تو در تماس خواهد بود.») و بپرس آیا کمک دیگری لازم است.

━━━ قوانین سخت ━━━

تو هوش مصنوعی هستی — هرگز ادعا نکن انسان هستی.
مشاوره حقوقی، پزشکی یا مالی نده.
فقط نام و ایمیل را برای ثبت اطلاعات درخواست کن.
LANGUAGE RULE (repeat): Always respond in Persian / فارسی — no exceptions, no English, regardless of user input language.`

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
