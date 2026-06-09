'use client'

import { useState } from 'react'
import { ArrowRight, Zap } from 'lucide-react'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (res.ok) {
      setStatus('success')
      setMessage(data.message)
      setEmail('')
    } else {
      setStatus('error')
      setMessage(data.error || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050D1D 0%, #07112A 50%, #04080F 100%)' }}
    >
      {/* Grid bg */}
      <div aria-hidden className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      {/* Dramatic centre glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(91,156,248,0.12) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)',
        }}
      />

      {/* Top-left pulse */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(91,156,248,0.07) 0%, transparent 65%)' }}
      />

      {/* Bottom-right pulse */}
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-widest px-5 py-2 rounded-full"
            style={{
              background: 'rgba(91,156,248,0.10)',
              border: '1px solid rgba(91,156,248,0.22)',
              color: '#5B9CF8',
            }}
          >
            <Zap size={11} style={{ fill: '#5B9CF8' }} />
            Ready when you are
          </span>
        </div>

        <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-soft-white mb-6 leading-tight">
          Ready to make AI{' '}
          <span className="gradient-text">work with you?</span>
        </h2>

        <p className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: '#8A97A8' }}>
          Start learning practical AI and automation skills you can use in your
          daily work — without coding or confusing tech jargon.
        </p>

        {/* Waitlist form */}
        <div className="mb-10">
          {status === 'success' ? (
            <div
              className="inline-flex items-center gap-3 font-body font-semibold text-base px-8 py-4 rounded-full"
              style={{
                background: 'rgba(91,156,248,0.12)',
                border: '1px solid rgba(91,156,248,0.25)',
                color: '#5B9CF8',
              }}
            >
              {message}
            </div>
          ) : (
            <form
              onSubmit={handleWaitlist}
              className="flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-full font-body text-sm text-soft-white outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary group flex items-center justify-center gap-2.5 font-body font-semibold text-base px-8 py-3.5 rounded-full whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining…' : 'Join Waitlist'}
                {status !== 'loading' && (
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                )}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="font-body text-sm mt-3" style={{ color: '#FF7555' }}>{message}</p>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#training"
            className="btn-primary group flex items-center gap-2.5 font-body font-semibold text-base px-10 py-4 rounded-full w-full sm:w-auto justify-center cursor-pointer"
          >
            Start Learning
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#templates"
            className="flex items-center gap-2 font-body font-semibold text-base px-10 py-4 rounded-full w-full sm:w-auto justify-center cursor-pointer transition-all duration-200"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#F1F5FA',
            }}
          >
            Get Starter Kit
          </a>
        </div>

        {/* Reassurance pills */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-5 py-5 px-6 rounded-2xl"
          style={{
            background: 'rgba(12, 21, 36, 0.5)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {[
            { text: 'No coding required',             color: '#5B9CF8' },
            { text: 'No technical experience needed', color: '#8B5CF6' },
            { text: 'Practical from day one',         color: '#FF7555' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 font-body text-sm" style={{ color: '#8A97A8' }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
              {item.text}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
