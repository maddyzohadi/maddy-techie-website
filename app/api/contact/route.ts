import { Resend } from 'resend'
import { NextResponse } from 'next/server'

// FROM must be a domain you have verified in your Resend dashboard.
// During development you can use: onboarding@resend.dev
// In production set RESEND_FROM_EMAIL=Maddy the Techie <noreply@maddythetechie.com>
const TO = 'hello@maddythetechie.com'

interface ContactPayload {
  name:         string
  email:        string
  help?:        string
  tools?:       string[]
  projectType?: string
  timeline?:    string
  budget?:      string
  message:      string
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:7px 20px 7px 0;font-weight:600;vertical-align:top;white-space:nowrap;color:#0f172a">${label}</td>
      <td style="padding:7px 0;color:#334155">${value.replace(/\n/g, '<br>')}</td>
    </tr>`
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[/api/contact] RESEND_API_KEY is not set')
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
  }

  const resend = new Resend(apiKey)
  const FROM   = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

  try {
    const body = await request.json() as ContactPayload
    const { name, email, help, tools, projectType, timeline, budget, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;color:#1e293b">
        <h2 style="margin:0 0 8px;font-size:22px;color:#0f172a">New project request</h2>
        <p style="margin:0 0 24px;font-size:14px;color:#64748b">Submitted via maddythetechie.com</p>
        <table style="border-collapse:collapse;width:100%;font-size:15px">
          ${row('Name',         name)}
          ${row('Email',        email)}
          ${row('Help needed',  help        || '—')}
          ${row('Tools',        tools?.length ? tools.join(', ') : '—')}
          ${row('Project type', projectType || '—')}
          ${row('Timeline',     timeline    || '—')}
          ${row('Budget',       budget      || '—')}
          ${row('Message',      message)}
        </table>
        <hr style="margin:28px 0;border:none;border-top:1px solid #e2e8f0">
        <p style="margin:0;font-size:12px;color:#94a3b8">Reply directly to this email to respond to ${name}.</p>
      </div>
    `

    await resend.emails.send({
      from:     FROM,
      to:       TO,
      replyTo:  email,
      subject:  `Project request from ${name}`,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[/api/contact] failed to send:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
