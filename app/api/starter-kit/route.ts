import { NextResponse } from 'next/server'

const EMAIL_RE    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const KIT_V4_BASE = 'https://api.kit.com/v4'
const isDev       = process.env.NODE_ENV === 'development'

async function addStarterKitSubscriber(email: string): Promise<void> {
  const provider  = process.env.STARTER_KIT_PROVIDER
  const apiKey    = process.env.STARTER_KIT_API_KEY
  const apiSecret = process.env.STARTER_KIT_API_SECRET
  const formId    = process.env.STARTER_KIT_FORM_ID

  // Log env var presence only — never log key or secret values
  console.info('[starter-kit] env check:', {
    STARTER_KIT_PROVIDER:   !!provider,
    STARTER_KIT_API_KEY:    !!apiKey,
    STARTER_KIT_API_SECRET: !!apiSecret,
    STARTER_KIT_FORM_ID:    !!formId,
    formIdValue:            formId ?? '(not set)',
    providerValue:          provider ?? '(not set)',
  })

  if (provider !== 'kit') {
    console.info(`[starter-kit] STARTER_KIT_PROVIDER is "${provider ?? ''}" — expected "kit". Skipping delivery.`)
    return
  }

  if (!apiKey) throw new Error('STARTER_KIT_API_KEY is not configured.')
  if (!formId) throw new Error('STARTER_KIT_FORM_ID is not configured.')

  // Kit v4 authentication: X-Kit-Api-Key header only — never in request body
  const kitHeaders = {
    'Content-Type': 'application/json',
    'X-Kit-Api-Key': apiKey,
  }

  // ── Step 1: create or upsert subscriber ─────────────────────────────────────
  const subEndpoint = `${KIT_V4_BASE}/subscribers`
  console.info(`[starter-kit] POST ${subEndpoint}`)

  const subRes    = await fetch(subEndpoint, {
    method: 'POST',
    headers: kitHeaders,
    body: JSON.stringify({ email_address: email }),
  })
  const subRawBody = await subRes.text()

  console.info(`[starter-kit] /subscribers → status ${subRes.status}`)

  if (!subRes.ok) {
    // Kit response body contains error messages, not secrets — safe to log
    console.error(`[starter-kit] /subscribers error body:`, subRawBody)
    throw new Error(`Kit /subscribers ${subRes.status}: ${subRawBody}`)
  }

  let subBody: { subscriber?: { id: number } }
  try {
    subBody = JSON.parse(subRawBody) as { subscriber?: { id: number } }
  } catch {
    console.error('[starter-kit] /subscribers response is not valid JSON:', subRawBody)
    throw new Error('Kit /subscribers returned non-JSON response')
  }

  const subscriberId = subBody?.subscriber?.id
  if (!subscriberId) {
    console.error('[starter-kit] /subscribers response missing subscriber.id:', subRawBody)
    throw new Error('Kit /subscribers response missing subscriber.id')
  }

  console.info(`[starter-kit] Subscriber id: ${subscriberId}`)

  // ── Step 2: attach subscriber to form ───────────────────────────────────────
  const formEndpoint = `${KIT_V4_BASE}/forms/${formId}/subscribers/${subscriberId}`
  console.info(`[starter-kit] POST ${formEndpoint}`)

  const formRes     = await fetch(formEndpoint, {
    method: 'POST',
    headers: kitHeaders,
  })
  const formRawBody = await formRes.text()

  console.info(`[starter-kit] forms/${formId}/subscribers/${subscriberId} → status ${formRes.status}`)

  if (!formRes.ok) {
    console.error(`[starter-kit] form subscribe error body:`, formRawBody)
    throw new Error(`Kit form subscribe ${formRes.status}: ${formRawBody}`)
  }

  console.info(`[starter-kit] Successfully subscribed to form ${formId}`)
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const raw = (body as Record<string, unknown>)?.email
  if (!raw || typeof raw !== 'string' || !raw.trim()) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  const email = raw.trim().toLowerCase()

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    )
  }

  try {
    await addStarterKitSubscriber(email)
  } catch (err) {
    const internalMsg = err instanceof Error ? err.message : String(err)
    console.error('[starter-kit] Subscriber error:', internalMsg)

    // In development return the exact error so you can diagnose without reading server logs
    // In production return a safe generic message
    return NextResponse.json(
      { error: isDev ? `[dev] ${internalMsg}` : 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { message: "You're in! Check your inbox for the Starter Kit." },
    { status: 200 }
  )
}
