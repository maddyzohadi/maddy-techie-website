import { NextRequest, NextResponse } from 'next/server'

// Change the model here — the frontend never sees this value
const OPENROUTER_MODEL = 'qwen/qwen3-next-80b-a3b-instruct:free'
const OPENROUTER_URL   = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT = `You are the Maddy AI Assistant for Maddy the Techie — an AI and no-code automation education brand. You help non-technical professionals, creators, and small business owners understand what AI and automation can do for their daily work.

Your role:
- Answer questions about AI, no-code automation, and the Maddy the Techie training
- Recommend practical beginner workflows based on the user's role or task
- Explain AI and automation concepts in plain, clear English
- Guide users toward the Training, Templates, or Starter Kit sections when appropriate

The training has four parts:
1. Automation Foundations — triggers, actions, workflow logic, no-code tools (Make, Zapier)
2. AI for Work — prompting, emails, reports, research, limitations and safety
3. AI Agents & Smart Systems — assistant vs. agent, memory, multi-step workflows
4. Workflow Projects — lead follow-up system, content planning, email summary, report generator

Practical workflow examples you can recommend:
- Form → Google Sheets → auto email (great first workflow)
- Email assistant that drafts replies
- Lead follow-up automation for small businesses
- Content planning system for creators
- Weekly report generator using AI + spreadsheet data
- Document summary workflow

Brand voice rules:
- Short, clear sentences. No buzzwords or tech jargon.
- Friendly, direct, and practical — not hyped or salesy.
- Use "you" directly. Speak like a knowledgeable, patient guide.
- When you must use a technical term, explain it in one plain sentence.
- Responses should be 2–4 short paragraphs at most. Be concise.

Hard rules:
- You are an AI assistant — do not claim to be human.
- Do not give legal, medical, or financial advice.
- Do not ask for personal or sensitive information.
- Do not recommend tools outside the no-code / AI automation space unless directly asked.
- If a user seems ready to start, point them to "Start Learning" or the free Starter Kit.`

interface HistoryMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  message: string
  history: HistoryMessage[]
}

interface OpenRouterResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    console.error('OPENROUTER_API_KEY is not set')
    return NextResponse.json(
      { error: 'AI service is not configured.' },
      { status: 500 }
    )
  }

  let body: ChatRequest
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { message, history = [] } = body

  if (!message || typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }

  // Build the message array: system + capped history + current user message
  const recentHistory = history.slice(-12) // keep last 6 turns (12 messages)
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...recentHistory,
    { role: 'user', content: message.trim() },
  ]

  let openRouterRes: Response
  try {
    openRouterRes = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://maddythetechie.com',
        'X-Title': 'Maddy the Techie',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
      }),
    })
  } catch (err) {
    console.error('OpenRouter fetch failed:', err)
    return NextResponse.json(
      { error: 'Could not reach AI service. Please try again.' },
      { status: 502 }
    )
  }

  if (!openRouterRes.ok) {
    const errBody = await openRouterRes.json().catch(() => ({}))
    console.error(`OpenRouter error ${openRouterRes.status}:`, errBody)

    // Free-tier upstream rate limit — surface a friendly, actionable message
    const isRateLimit =
      openRouterRes.status === 429 ||
      String(errBody?.error?.metadata?.raw ?? '').includes('rate-limited')

    if (isRateLimit) {
      const retryAfter = errBody?.error?.metadata?.retry_after_seconds
      const seconds = retryAfter ? Math.ceil(retryAfter) : 30
      return NextResponse.json(
        {
          error: `The free AI model is briefly busy. Please try again in ${seconds} seconds — no action needed on your end.`,
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'AI service returned an error. Please try again.' },
      { status: 502 }
    )
  }

  let data: OpenRouterResponse
  try {
    data = await openRouterRes.json()
  } catch {
    return NextResponse.json(
      { error: 'Unexpected response from AI service.' },
      { status: 502 }
    )
  }

  const reply =
    data.choices?.[0]?.message?.content?.trim() ??
    "I'm having trouble responding right now. Please try again shortly."

  return NextResponse.json({ reply })
}
