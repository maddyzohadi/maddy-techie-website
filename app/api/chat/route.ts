import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import type { FunctionDeclaration } from '@google/generative-ai'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// ── Gemini client ─────────────────────────────────────────────────────────

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')

// ── Supabase admin client (service role bypasses RLS) ─────────────────────

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

// ── Tool definitions (Gemini function declarations) ───────────────────────

const FUNCTION_DECLARATIONS = [
  {
    name: 'capture_lead',
    description:
      "Save a visitor's name and email when they genuinely want to work together, book a service, " +
      'or get personal help. Always ask for their name and email naturally in the conversation first. ' +
      'Do NOT call this tool unless you already have both from the conversation.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        name: {
          type: SchemaType.STRING,
          description: 'Full name of the visitor',
        },
        email: {
          type: SchemaType.STRING,
          description: 'Email address',
        },
        project_type: {
          type: SchemaType.STRING,
          description: 'What they want help with — e.g. "AI workflow setup", "automation training"',
        },
        notes: {
          type: SchemaType.STRING,
          description: 'One-sentence summary of their goal from the conversation',
        },
      },
      required: ['name', 'email'],
    },
  },
  {
    name: 'check_enrollment_status',
    description:
      'Check whether someone has previously been in touch or registered. ' +
      'Use only when the user explicitly asks if their details are on file.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        email: {
          type: SchemaType.STRING,
          description: 'Email address to look up',
        },
      },
      required: ['email'],
    },
  },
]

// ── Bilingual system prompts ──────────────────────────────────────────────

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
- After capturing: confirm warmly ("Thanks [name]! Maddy will be in touch soon.") then ask if there's anything else

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

زبان: همیشه به فارسی پاسخ بده. حتی اگر کاربر به زبان دیگری بنویسد، پاسخ تو باید فارسی باشد.

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

وقتی از ابزار capture_lead استفاده کن:
- کاربر می‌خواهد پروژه شروع کند، جلسه رزرو کند یا کمک شخصی بگیرد
- ابتدا نام و ایمیل را به صورت طبیعی در مکالمه بپرس — تا هر دو را نداری ابزار را صدا نزن
- بعد از ثبت: تأیید گرم ("ممنون [نام]! مددی به زودی با تو در تماس خواهد بود.")

لحن برند:
- جملات کوتاه و روشن. بدون اصطلاحات فنی پیچیده.
- دوستانه، مستقیم و کاربردی.
- پاسخ‌ها حداکثر ۲-۴ پاراگراف کوتاه.
- مستقیم با "تو" صحبت کن. مثل یک راهنمای صبور و دانا.
- اگر اصطلاح فنی به‌کار بردی، بلافاصله توضیح ساده بده.

قوانین سخت:
- تو هوش مصنوعی هستی — هرگز ادعا نکن انسان هستی
- مشاوره حقوقی، پزشکی یا مالی نده
- فقط نام و ایمیل را برای ثبت اطلاعات درخواست کن`

// ── Types ─────────────────────────────────────────────────────────────────

interface ChatRequest {
  message:   string
  sessionId: string
  locale?:   'en' | 'fa'
  history?:  { role: 'user' | 'assistant'; content: string }[]
}

// ── Tool executor ─────────────────────────────────────────────────────────

async function executeTool(
  toolName:  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args:      Record<string, any>,
  sessionId: string,
  locale:    string,
): Promise<Record<string, unknown>> {
  const supabase = getSupabase()

  if (toolName === 'capture_lead') {
    if (supabase) {
      const { error } = await supabase.from('leads').insert({
        session_id:   sessionId,
        name:         args.name,
        email:        args.email,
        project_type: args.project_type ?? null,
        notes:        args.notes ?? null,
        locale,
      })
      if (error) console.error('[capture_lead] insert error:', error.message)
    }
    return { success: true, name: args.name }
  }

  if (toolName === 'check_enrollment_status') {
    if (supabase) {
      const { data } = await supabase
        .from('leads')
        .select('created_at, project_type')
        .eq('email', args.email)
        .order('created_at', { ascending: false })
        .limit(1)
      if (data && data.length > 0) {
        return { found: true, project_type: data[0].project_type, since: data[0].created_at }
      }
    }
    return { found: false }
  }

  return { error: 'unknown_tool' }
}

// ── Supabase memory helpers ───────────────────────────────────────────────

async function getOrCreateConversation(
  supabase:  SupabaseClient,
  sessionId: string,
  locale:    string,
): Promise<string | null> {
  try {
    const { data: existing } = await supabase
      .from('conversations')
      .select('id')
      .eq('session_id', sessionId)
      .maybeSingle()

    if (existing) return existing.id as string

    const { data: created, error } = await supabase
      .from('conversations')
      .insert({ session_id: sessionId, locale })
      .select('id')
      .single()

    if (error) { console.error('[conversations] insert error:', error.message); return null }
    return (created?.id as string) ?? null
  } catch (e) {
    console.error('[getOrCreateConversation]', e)
    return null
  }
}

async function loadHistory(
  supabase:       SupabaseClient,
  conversationId: string,
): Promise<{ role: 'user' | 'assistant'; content: string }[]> {
  try {
    const { data } = await supabase
      .from('messages')
      .select('role, content')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(20)
    return (data ?? []) as { role: 'user' | 'assistant'; content: string }[]
  } catch {
    return []
  }
}

async function persistMessages(
  supabase:         SupabaseClient,
  conversationId:   string,
  userContent:      string,
  assistantContent: string,
): Promise<void> {
  try {
    await supabase.from('messages').insert([
      { conversation_id: conversationId, role: 'user',      content: userContent },
      { conversation_id: conversationId, role: 'assistant', content: assistantContent },
    ])
  } catch (e) {
    console.error('[persistMessages]', e)
  }
}

// ── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set')
    return NextResponse.json({ error: 'AI service is not configured.' }, { status: 500 })
  }

  let body: ChatRequest
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { message, sessionId, locale = 'en', history: clientHistory = [] } = body

  if (!message?.trim()) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required.' }, { status: 400 })
  }

  const systemPrompt = locale === 'fa' ? SYSTEM_FA : SYSTEM_EN
  const userText     = message.trim()

  // ── Load history from Supabase ──────────────────────────────────
  const supabase = getSupabase()
  let conversationId: string | null = null
  let history: { role: 'user' | 'assistant'; content: string }[] = []

  if (supabase) {
    conversationId = await getOrCreateConversation(supabase, sessionId, locale)
    if (conversationId) {
      history = await loadHistory(supabase, conversationId)
    }
  }

  if (history.length === 0 && clientHistory.length > 0) {
    history = clientHistory.slice(-12)
  }

  // ── Call Gemini ───────────────────────────────────────────────────
  let reply        = ''
  let leadCaptured = false

  try {
    // Gemini history uses 'model' instead of 'assistant'
    const geminiHistory = history.map(m => ({
      role:  m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const model = genAI.getGenerativeModel({
      model:             'gemini-1.5-flash',
      systemInstruction: systemPrompt,
      tools:             [{ functionDeclarations: FUNCTION_DECLARATIONS as unknown as FunctionDeclaration[] }],
    })

    const chat = model.startChat({ history: geminiHistory })

    // First turn
    const result1   = await chat.sendMessage(userText)
    const response1 = result1.response
    const calls     = response1.functionCalls()

    if (calls && calls.length > 0) {
      // Execute the first tool call
      const call = calls[0]
      if (call.name === 'capture_lead') leadCaptured = true

      const toolResponse = await executeTool(call.name, call.args as Record<string, string>, sessionId, locale)

      // Send tool result back — Gemini continues the conversation
      const result2   = await chat.sendMessage([{
        functionResponse: { name: call.name, response: toolResponse },
      }])

      reply = result2.response.text().trim()
    } else {
      reply = response1.text().trim()
    }

    if (!reply) {
      reply = locale === 'fa'
        ? 'مشکل موقتی پیش آمد. لطفاً دوباره امتحان کنید.'
        : "I'm having trouble responding right now. Please try again shortly."
    }

  } catch (err: unknown) {
    console.error('[Gemini error]', err)

    const msg = err instanceof Error ? err.message : ''
    const isRate = msg.includes('429') || msg.toLowerCase().includes('quota')

    if (isRate) {
      return NextResponse.json(
        { error: locale === 'fa'
            ? 'دستیار هوش مصنوعی موقتاً مشغول است. لطفاً یک لحظه دیگر امتحان کنید.'
            : 'The AI assistant is temporarily busy. Please try again in a moment.' },
        { status: 429 },
      )
    }

    return NextResponse.json(
      { error: locale === 'fa'
          ? 'مشکل فنی موقتی. لطفاً دوباره امتحان کنید.'
          : 'Could not reach AI service. Please try again.' },
      { status: 502 },
    )
  }

  // ── Persist turn to Supabase ────────────────────────────────────
  if (supabase && conversationId) {
    await persistMessages(supabase, conversationId, userText, reply)
  }

  return NextResponse.json({ reply, leadCaptured })
}
