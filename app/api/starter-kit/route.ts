import { NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// TODO: connect to email service such as ConvertKit, Mailchimp, Resend, or Supabase
// Replace the no-op below with your chosen provider's API call.
// Environment variables to fill in .env.local:
//   STARTER_KIT_PROVIDER — identifier for the chosen service (e.g. "convertkit")
//   STARTER_KIT_API_KEY  — API key or secret for the email service
//   STARTER_KIT_FORM_ID  — form / list / audience ID to subscribe the user to
async function addStarterKitSubscriber(email: string): Promise<void> {
  const provider = process.env.STARTER_KIT_PROVIDER
  const apiKey   = process.env.STARTER_KIT_API_KEY
  const formId   = process.env.STARTER_KIT_FORM_ID

  // Example: ConvertKit
  // await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ api_key: apiKey, email }),
  // })

  // Example: Mailchimp
  // const dc = apiKey?.split('-').pop()
  // await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${formId}/members`, {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ email_address: email, status: 'subscribed' }),
  // })

  // Example: Resend audience
  // const { Resend } = await import('resend')
  // const resend = new Resend(apiKey)
  // await resend.contacts.create({ email, audienceId: formId! })

  // Example: Supabase table
  // const { createClient } = await import('@/lib/supabase/server')
  // const supabase = await createClient()
  // await supabase.from('starter_kit_subscribers').insert({ email })

  // No-op until a provider is configured
  void provider
  void apiKey
  void formId
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
    console.error('Starter Kit subscriber error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { message: "You're in! Check your inbox for the Starter Kit." },
    { status: 200 }
  )
}
