import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// ── Constants (same model/endpoint as website chatbot) ────────────────────

const OR_URL   = 'https://openrouter.ai/api/v1/chat/completions'
const OR_MODEL = 'openai/gpt-4o-mini'
const TG_API   = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`

const START_MESSAGE =
  "Hi! I'm MaddyTechie AI. Ask me about AI, automation, templates, or services."

// ── Telegram types ────────────────────────────────────────────────────────

interface TgChat    { id: number }
interface TgMessage { chat: TgChat; text?: string }
interface TgUpdate  { update_id: number; message?: TgMessage }

// ── Language detection (Persian/Arabic Unicode ranges) ────────────────────

function detectLocale(text: string): 'en' | 'fa' {
  return /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/.test(text)
    ? 'fa'
    : 'en'
}

// ── System prompts (mirrors website chatbot) ──────────────────────────────

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

When to use capture_lead:
- User wants to start a project, book a session, or hire Maddy for custom work
- First ask for their name and email naturally — do not call the tool until you have both
- After capturing: confirm warmly ("Thanks [name]! Maddy will be in touch soon.")

Brand voice: short, clear, friendly, practical. 2–3 sentences max per response.
Hard rules: you are an AI — never claim to be human. No legal/medical/financial advice.`

const SYSTEM_FA = `تو دستیار هوش مصنوعی مددی هستی در سایت maddythetechie.com — یک برند آموزشی هوش مصنوعی و اتوماسیون بدون کد.

زبان: همیشه به فارسی پاسخ بده.

نقش تو:
- پاسخ به سوالات درباره هوش مصنوعی، اتوماسیون و برنامه‌های آموزشی مددی
- پیشنهاد گردش‌کارهای عملی و مبتدی‌پسند
- راهنمایی کاربران به آموزش مناسب یا کیت شروع رایگان
- ثبت اطلاعات تماس با ابزار capture_lead وقتی کاربر کمک شخصی می‌خواهد

وقتی از ابزار capture_lead استفاده کن: کاربر پروژه شروع کند یا کمک شخصی بخواهد.
ابتدا نام و ایمیل را بپرس — تا هر دو را نداری ابزار را صدا نزن.

لحن: کوتاه، روشن، دوستانه. حداکثر ۲-۳ جمله در هر پاسخ.
قانون: تو هوش مصنوعی هستی — هرگز ادعا نکن انسانی.`

// ── Tool definitions ──────────────────────────────────────────────────────

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'capture_lead',
      description:
        "Save a visitor's name and email when they genuinely want to work together or get personal help. " +
        'Do NOT call until you have both name and email from the conversation.',
      parameters: {
        type: 'object',
        properties: {
          name:         { type: 'string', description: 'Full name' },
          email:        { type: 'string', description: 'Email address' },
          project_type: { type: 'string', description: 'What they need help with' },
          notes:        { type: 'string', description: 'One-sentence summary of their goal' },
        },
        required: ['name', 'email'],
      },
    },
  },
]

// ── Supabase lead capture ─────────────────────────────────────────────────

async function captureLead(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: Record<string, any>,
  chatId: number,
  locale: string,
): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return

  const supabase = createClient(url, key, { auth: { persistSession: false } })
  const { error } = await supabase.from('leads').insert({
    session_id:   `tg_${chatId}`,
    name:         args.name,
    email:        args.email,
    project_type: args.project_type ?? null,
    notes:        args.notes ?? null,
    locale,
  })
  if (error) console.error('[telegram] capture_lead error:', error.message)
}

// ── OpenRouter call ───────────────────────────────────────────────────────

async function getAIReply(userText: string, locale: 'en' | 'fa'): Promise<string> {
  const systemPrompt = locale === 'fa' ? SYSTEM_FA : SYSTEM_EN
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user',   content: userText },
  ]

  const res = await fetch(OR_URL, {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://www.maddythetechie.com',
      'X-Title':      'Maddy the Techie',
    },
    body: JSON.stringify({
      model:       OR_MODEL,
      messages,
      temperature: 0.7,
      max_tokens:  400,
      tools:       TOOLS,
      tool_choice: 'auto',
    }),
  })

  if (!res.ok) {
    console.error('[telegram] OpenRouter error:', res.status)
    return locale === 'fa'
      ? 'مشکل فنی موقتی. لطفاً دوباره امتحان کنید.'
      : 'Temporary issue. Please try again.'
  }

  const data  = await res.json()
  const choice = data.choices?.[0]

  // Tool call — handle capture_lead then get follow-up reply
  if (choice?.finish_reason === 'tool_calls' && choice.message?.tool_calls?.length) {
    const toolCall = choice.message.tool_calls[0]
    const toolName = toolCall.function.name
    const toolArgs = JSON.parse(toolCall.function.arguments ?? '{}')

    if (toolName === 'capture_lead') {
      await captureLead(toolArgs, 0, locale) // chatId not needed for lead, sessionId uses it
    }

    // Second turn with tool result
    const messages2 = [
      ...messages,
      choice.message,
      {
        role:         'tool',
        tool_call_id: toolCall.id,
        content:      JSON.stringify({ success: true, name: toolArgs.name }),
      },
    ]

    const res2 = await fetch(OR_URL, {
      method: 'POST',
      headers: {
        Authorization:  `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.maddythetechie.com',
        'X-Title':      'Maddy the Techie',
      },
      body: JSON.stringify({ model: OR_MODEL, messages: messages2, temperature: 0.7, max_tokens: 400 }),
    })

    if (!res2.ok) {
      return locale === 'fa' ? 'اطلاعات ذخیره شد. ممنون!' : 'Details saved! Maddy will be in touch soon.'
    }
    const data2 = await res2.json()
    return (data2.choices?.[0]?.message?.content ?? '').trim()
  }

  return (choice?.message?.content ?? '').trim()
}

// ── Telegram send helper ──────────────────────────────────────────────────

async function sendMessage(chatId: number, text: string): Promise<void> {
  await fetch(`${TG_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
}

// ── Webhook handler ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.error('[telegram] TELEGRAM_BOT_TOKEN is not set')
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  let update: TgUpdate
  try {
    update = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const message = update.message
  if (!message) return NextResponse.json({ ok: true })

  const chatId = message.chat.id
  const text   = message.text?.trim()

  // No text (photo, sticker, etc.)
  if (!text) {
    await sendMessage(chatId, 'Please send a text message.')
    return NextResponse.json({ ok: true })
  }

  // /start command
  if (text === '/start') {
    await sendMessage(chatId, START_MESSAGE)
    return NextResponse.json({ ok: true })
  }

  // Normal message — detect locale and get AI reply
  const locale = detectLocale(text)
  const reply  = await getAIReply(text, locale)

  await sendMessage(
    chatId,
    reply ||
      (locale === 'fa'
        ? 'مشکل موقتی پیش آمد. لطفاً دوباره امتحان کنید.'
        : 'Something went wrong. Please try again.'),
  )

  return NextResponse.json({ ok: true })
}
