'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const SERIF = "'DM Serif Display', serif"
const SANS  = 'system-ui, -apple-system, sans-serif'
const BORDER = '0.5px solid rgba(17,17,17,0.07)'

export default function EnAboutPageContent() {
  const reduced = useReducedMotion()

  // ── Newsletter form state ────────────────────────────────────────────────
  const [email,   setEmail]   = useState('')
  const [status,  setStatus]  = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('submitting')
    try {
      const res  = await fetch('/api/waitlist', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error ?? 'Something went wrong. Try again.')
        setStatus('error')
      } else {
        setMessage(data.message ?? "You're on the list!")
        setStatus('success')
        setEmail('')
      }
    } catch {
      setMessage('Something went wrong. Try again.')
      setStatus('error')
    }
  }

  // ── Shared animation presets ─────────────────────────────────────────────
  const fadeUp = (delay: number) => ({
    initial:    { opacity: 0, y: reduced ? 0 : 18 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  const scrollFade = {
    initial:    { opacity: 0, y: reduced ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport:   { once: true, margin: '-60px' as const },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }

  return (
    <>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        dir="ltr"
        style={{
          background: '#FAF6EF',
          padding: 'clamp(80px, 11vw, 120px) clamp(24px, 8vw, 80px) clamp(80px, 10vw, 112px)',
          borderBottom: BORDER,
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>

          <motion.p {...fadeUp(0)} style={{
            fontFamily: SANS,
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: '#E34E2E',
            marginBottom: '28px',
          }}>
            About Maddy the Techie
          </motion.p>

          <motion.h1 {...fadeUp(0.09)} style={{
            fontFamily: SERIF,
            fontSize: 'clamp(38px, 6vw, 72px)',
            fontWeight: 400,
            color: '#111111',
            lineHeight: 1.07,
            letterSpacing: '-0.025em',
            marginBottom: '28px',
          }}>
            Practical AI education{' '}
            <em style={{ fontStyle: 'italic' }}>for modern work</em>
          </motion.h1>

          <motion.p {...fadeUp(0.18)} style={{
            fontFamily: SANS,
            fontSize: 'clamp(16px, 1.4vw, 18px)',
            color: '#625B55',
            lineHeight: 1.72,
            maxWidth: '540px',
            margin: '0 auto',
          }}>
            Maddy the Techie helps non-technical professionals use AI with clarity and
            confidence. Real tools, real work — no jargon, no code.
          </motion.p>

        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <section
        dir="ltr"
        style={{
          background: '#FFFDF8',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 80px)',
          borderBottom: BORDER,
        }}
      >
        <motion.div
          {...scrollFade}
          style={{ maxWidth: '560px', margin: '0 auto' }}
        >
          {/* Card */}
          <div
            style={{
              background: '#FAF6EF',
              border: '0.5px solid rgba(17,17,17,0.09)',
              borderRadius: '24px',
              padding: 'clamp(40px, 6vw, 64px) clamp(28px, 5vw, 52px)',
              textAlign: 'center',
              boxShadow: '0 2px 24px rgba(0,0,0,0.04)',
            }}
          >
            <p style={{
              fontFamily: SANS,
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: '#E34E2E',
              marginBottom: '20px',
            }}>
              Get the notes
            </p>

            <h2 style={{
              fontFamily: SERIF,
              fontSize: 'clamp(26px, 3.5vw, 48px)',
              fontWeight: 400,
              color: '#111111',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              marginBottom: '16px',
            }}>
              The Practical AI Letter
            </h2>

            <p style={{
              fontFamily: SANS,
              fontSize: 'clamp(15px, 1.3vw, 17px)',
              color: '#625B55',
              lineHeight: 1.70,
              marginBottom: '10px',
            }}>
              Practical AI tips, templates, and workflow ideas in your inbox.
            </p>

            <p style={{
              fontFamily: SANS,
              fontSize: '14px',
              color: '#8C7E74',
              lineHeight: 1.65,
              marginBottom: '36px',
            }}>
              Subscribe to get new tutorials, useful templates, and simple AI workflow
              ideas when I publish them.
            </p>

            {/* Success state */}
            {status === 'success' ? (
              <div style={{
                padding: '20px 24px',
                background: 'rgba(227,78,46,0.07)',
                border: '0.5px solid rgba(227,78,46,0.22)',
                borderRadius: '14px',
              }}>
                <p style={{
                  fontFamily: SANS,
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#E34E2E',
                  margin: 0,
                }}>
                  {message}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate>
                {/* Visually-hidden label for accessibility */}
                <label
                  htmlFor="nl-email"
                  style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                    clip: 'rect(0,0,0,0)',
                    whiteSpace: 'nowrap',
                    border: 0,
                  }}
                >
                  Email address
                </label>

                <input
                  id="nl-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  disabled={status === 'submitting'}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '52px',
                    padding: '0 20px',
                    fontFamily: SANS,
                    fontSize: '15px',
                    color: '#111111',
                    background: '#FFFDF8',
                    border: focused
                      ? '1px solid rgba(227,78,46,0.45)'
                      : '0.5px solid rgba(0,0,0,0.13)',
                    borderRadius: '100px',
                    outline: 'none',
                    marginBottom: '10px',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s',
                  }}
                />

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '52px',
                    background: status === 'submitting' ? 'rgba(227,78,46,0.55)' : '#E34E2E',
                    color: '#FFFDF8',
                    borderRadius: '100px',
                    border: 'none',
                    fontFamily: SANS,
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'submitting')
                      (e.currentTarget as HTMLButtonElement).style.background = '#C63C1E'
                  }}
                  onMouseLeave={(e) => {
                    if (status !== 'submitting')
                      (e.currentTarget as HTMLButtonElement).style.background = '#E34E2E'
                  }}
                >
                  {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
                </button>

                {status === 'error' && (
                  <p style={{
                    fontFamily: SANS,
                    fontSize: '13px',
                    color: '#EF4444',
                    marginTop: '10px',
                    textAlign: 'center',
                  }}>
                    {message}
                  </p>
                )}
              </form>
            )}

            <p style={{
              fontFamily: SANS,
              fontSize: '12px',
              color: 'rgba(140,126,116,0.70)',
              marginTop: '18px',
            }}>
              No spam. Just practical AI ideas you can actually use.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Why this exists ───────────────────────────────────────────────── */}
      <section
        dir="ltr"
        style={{
          background: '#F1E8DD',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 80px)',
          borderBottom: BORDER,
        }}
      >
        <motion.div
          {...scrollFade}
          style={{ maxWidth: '720px', margin: '0 auto' }}
        >
          <p style={{
            fontFamily: SANS,
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: '#8C7E74',
            marginBottom: '28px',
          }}>
            Why this exists
          </p>

          <p style={{
            fontFamily: SERIF,
            fontSize: 'clamp(22px, 2.8vw, 36px)',
            fontWeight: 400,
            color: '#111111',
            lineHeight: 1.45,
            letterSpacing: '-0.015em',
            margin: 0,
          }}>
            AI should make work easier, not more overwhelming. Maddy the Techie is built
            for people who want clear explanations, practical systems, and tools they can
            use without becoming technical experts.
          </p>
        </motion.div>
      </section>

    </>
  )
}
