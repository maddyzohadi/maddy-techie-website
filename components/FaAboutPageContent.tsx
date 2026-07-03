'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const vaFont = "var(--font-vazirmatn), 'Vazirmatn', sans-serif"
const BORDER = '0.5px solid rgba(17,17,17,0.07)'

const BELIEFS = [
  'برای کار هوشمندانه‌تر با هوش مصنوعی لازم نیست کدنویس باشی.',
  'هر درس باید با چیزی که واقعاً می‌توانی استفاده کنی پایان یابد.',
  'بهترین سیستم هوش مصنوعی آن است که خودت بفهمیش و بتوانی نگهداریش کنی.',
  'عملی بودن همیشه بر تئوری‌پردازی برتری دارد.',
]

export default function FaAboutPageContent() {
  const reduced = useReducedMotion()

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
        setMessage(data.error ?? 'مشکلی پیش آمد. دوباره تلاش کن.')
        setStatus('error')
      } else {
        setMessage(data.message ?? 'ثبت‌نام موفق بود!')
        setStatus('success')
        setEmail('')
      }
    } catch {
      setMessage('مشکلی پیش آمد. دوباره تلاش کن.')
      setStatus('error')
    }
  }

  const fadeUp = (delay: number) => ({
    initial:    { opacity: 0, y: reduced ? 0 : 18 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  const scrollFade = {
    initial:     { opacity: 0, y: reduced ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-60px' as const },
    transition:  { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }

  return (
    <>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        dir="rtl"
        style={{
          background:   '#FAF6EF',
          padding:      'clamp(80px, 11vw, 120px) clamp(24px, 8vw, 80px) clamp(80px, 10vw, 112px)',
          borderBottom: BORDER,
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'right' }}>

          <motion.p {...fadeUp(0)} style={{
            fontFamily:    vaFont,
            fontSize:      '12px',
            fontWeight:     700,
            letterSpacing: '0.06em',
            color:          '#E34E2E',
            marginBottom:  '28px',
          }}>
            درباره Maddy the Techie
          </motion.p>

          <motion.h1 {...fadeUp(0.09)} style={{
            fontFamily:   vaFont,
            fontSize:     'clamp(34px, 5.5vw, 68px)',
            fontWeight:    800,
            color:         '#111111',
            lineHeight:    1.30,
            letterSpacing: '-0.01em',
            marginBottom:  '28px',
          }}>
            آموزش هوش مصنوعی
            <br />
            <span style={{ color: '#E34E2E' }}>برای کار مدرن</span>
          </motion.h1>

          <motion.p {...fadeUp(0.18)} style={{
            fontFamily: vaFont,
            fontSize:   'clamp(15px, 1.4vw, 17px)',
            color:      '#625B55',
            lineHeight:  1.90,
            maxWidth:   '560px',
          }}>
            Maddy the Techie به آدم‌های غیر فنی کمک می‌کند با وضوح و اعتمادبه‌نفس از هوش مصنوعی
            استفاده کنند. ابزار واقعی، کار واقعی — بدون اصطلاحات پیچیده و بدون کدنویسی.
          </motion.p>

        </div>
      </section>

      {/* ── Quote ─────────────────────────────────────────────────────────── */}
      <section
        dir="rtl"
        style={{
          background:   '#F1E8DD',
          padding:      'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 80px)',
          borderBottom: BORDER,
        }}
      >
        <motion.div
          {...scrollFade}
          style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'right' }}
        >
          <p style={{
            fontFamily:   vaFont,
            fontSize:     'clamp(20px, 2.6vw, 34px)',
            fontWeight:    700,
            color:         '#111111',
            lineHeight:    1.60,
            letterSpacing: '-0.01em',
            marginBottom:  '20px',
          }}>
            «کمک می‌کنم هوش مصنوعی را بدون کدنویسی، در کار واقعی و روزمره به کار بگیری.»
          </p>
          <p style={{
            fontFamily:   vaFont,
            fontSize:     '13px',
            color:        'rgba(98,91,85,0.60)',
            letterSpacing: '0.02em',
          }}>
            — Maddy the Techie
          </p>
        </motion.div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <section
        dir="rtl"
        style={{
          background:   '#FFFDF8',
          padding:      'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 80px)',
          borderBottom: BORDER,
        }}
      >
        <motion.div
          {...scrollFade}
          style={{ maxWidth: '560px', margin: '0 auto' }}
        >
          <div
            style={{
              background:   '#FAF6EF',
              border:        '0.5px solid rgba(17,17,17,0.09)',
              borderRadius:  '24px',
              padding:       'clamp(40px, 6vw, 64px) clamp(28px, 5vw, 52px)',
              textAlign:     'right',
              boxShadow:     '0 2px 24px rgba(0,0,0,0.04)',
            }}
          >
            <p style={{
              fontFamily:    vaFont,
              fontSize:      '11px',
              fontWeight:     700,
              letterSpacing: '0.06em',
              color:          '#E34E2E',
              marginBottom:  '20px',
            }}>
              یادداشت‌های مدی
            </p>

            <h2 style={{
              fontFamily:    vaFont,
              fontSize:      'clamp(26px, 3.5vw, 44px)',
              fontWeight:     800,
              color:          '#111111',
              lineHeight:     1.20,
              letterSpacing: '-0.01em',
              marginBottom:  '16px',
            }}>
              Maddy Notes
            </h2>

            <p style={{
              fontFamily: vaFont,
              fontSize:   'clamp(14px, 1.3vw, 16px)',
              color:      '#625B55',
              lineHeight:  1.80,
              marginBottom: '10px',
            }}>
              نکته‌ها، قالب‌ها و ایده‌های ساده برای استفاده بهتر از هوش مصنوعی در کار روزمره.
            </p>

            <p style={{
              fontFamily:   vaFont,
              fontSize:     '14px',
              color:        '#8C7E74',
              lineHeight:    1.75,
              marginBottom: '36px',
            }}>
              هر وقت آموزش، قالب یا ایده‌ی جدیدی منتشر کنم، برایت می‌فرستم.
            </p>

            {status === 'success' ? (
              <div style={{
                padding:      '20px 24px',
                background:   'rgba(227,78,46,0.07)',
                border:        '0.5px solid rgba(227,78,46,0.22)',
                borderRadius:  '14px',
              }}>
                <p style={{
                  fontFamily: vaFont,
                  fontSize:   '15px',
                  fontWeight:  600,
                  color:      '#E34E2E',
                  margin:      0,
                }}>
                  {message}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate>
                <label
                  htmlFor="fa-nl-email"
                  style={{
                    position:   'absolute',
                    width:      '1px',
                    height:     '1px',
                    overflow:   'hidden',
                    clip:       'rect(0,0,0,0)',
                    whiteSpace: 'nowrap',
                    border:      0,
                  }}
                >
                  آدرس ایمیل
                </label>

                <input
                  id="fa-nl-email"
                  type="email"
                  required
                  placeholder="ایمیل شما"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  disabled={status === 'submitting'}
                  dir="ltr"
                  style={{
                    display:      'block',
                    width:        '100%',
                    height:       '52px',
                    padding:      '0 20px',
                    fontFamily:   vaFont,
                    fontSize:     '15px',
                    color:        '#111111',
                    background:   '#FFFDF8',
                    border:       focused
                      ? '1px solid rgba(227,78,46,0.45)'
                      : '0.5px solid rgba(0,0,0,0.13)',
                    borderRadius: '100px',
                    outline:      'none',
                    marginBottom: '10px',
                    boxSizing:    'border-box',
                    transition:   'border-color 0.15s',
                    textAlign:    'left',
                  }}
                />

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    display:      'block',
                    width:        '100%',
                    height:       '52px',
                    background:   status === 'submitting' ? 'rgba(227,78,46,0.55)' : '#E34E2E',
                    color:        '#FFFDF8',
                    borderRadius: '100px',
                    border:       'none',
                    fontFamily:   vaFont,
                    fontSize:     '16px',
                    fontWeight:    700,
                    cursor:       status === 'submitting' ? 'not-allowed' : 'pointer',
                    transition:   'background 0.15s',
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
                  {status === 'submitting' ? '…' : 'عضویت'}
                </button>

                {status === 'error' && (
                  <p style={{
                    fontFamily: vaFont,
                    fontSize:   '13px',
                    color:      '#EF4444',
                    marginTop:  '10px',
                    textAlign:  'right',
                  }}>
                    {message}
                  </p>
                )}
              </form>
            )}

            <p style={{
              fontFamily: vaFont,
              fontSize:   '12px',
              color:      'rgba(140,126,116,0.70)',
              marginTop:  '18px',
              textAlign:  'right',
            }}>
              بدون اسپم. فقط ایده‌های مفید برای کار هوشمندتر.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Beliefs ───────────────────────────────────────────────────────── */}
      <section
        dir="rtl"
        style={{
          background: '#FAF6EF',
          padding:    'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 80px)',
        }}
      >
        <motion.div
          {...scrollFade}
          style={{ maxWidth: '720px', margin: '0 auto' }}
        >
          <p style={{
            fontFamily:    vaFont,
            fontSize:      '11px',
            fontWeight:     700,
            letterSpacing: '0.06em',
            color:          '#8C7E74',
            marginBottom:  '32px',
          }}>
            باور دارم که
          </p>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {BELIEFS.map((belief, i) => (
              <li
                key={i}
                style={{
                  display:    'flex',
                  alignItems: 'flex-start',
                  gap:        '16px',
                  padding:    '24px 0',
                  borderTop:  '0.5px solid rgba(17,17,17,0.08)',
                }}
              >
                {/* Number on the right (first child in RTL flex = rightmost) */}
                <span style={{
                  fontFamily: vaFont,
                  fontSize:   '13px',
                  fontWeight:  700,
                  color:      '#E34E2E',
                  flexShrink:  0,
                  width:      '20px',
                  textAlign:  'center',
                  marginTop:  '3px',
                }}>
                  {['۱', '۲', '۳', '۴'][i]}
                </span>
                <p style={{
                  fontFamily: vaFont,
                  fontSize:   'clamp(14px, 1.3vw, 16px)',
                  color:      '#625B55',
                  lineHeight:  1.90,
                  margin:      0,
                  flex:        1,
                }}>
                  {belief}
                </p>
              </li>
            ))}
            {/* Closing rule */}
            <li
              aria-hidden="true"
              style={{ height: '0.5px', background: 'rgba(17,17,17,0.08)' }}
            />
          </ul>
        </motion.div>
      </section>

    </>
  )
}
