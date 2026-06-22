'use client'

import { useState, useEffect, useRef } from 'react'
import { X, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

async function submitStarterKit(email: string): Promise<void> {
  const res = await fetch('/api/starter-kit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(
      (data as { error?: string }).error ?? 'Something went wrong. Please try again.'
    )
  }
}

interface StarterKitModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function StarterKitModal({ isOpen, onClose }: StarterKitModalProps) {
  const [email, setEmail]           = useState('')
  const [emailError, setEmailError] = useState('')
  const [status, setStatus]         = useState<'idle' | 'submitting' | 'success'>('idle')
  const inputRef                    = useRef<HTMLInputElement>(null)

  // Focus input when opened, reset state when closed
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 80)
      return () => clearTimeout(t)
    }
    setEmail('')
    setEmailError('')
    setStatus('idle')
  }, [isOpen])

  // Close on Esc
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    setStatus('submitting')
    try {
      await submitStarterKit(email.trim())
      setStatus('success')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setEmailError(msg)
      setStatus('idle')
    }
  }

  if (!isOpen) return null

  return (
    // Overlay — click outside card to close
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'rgba(177,177,175,0.55)', backdropFilter: 'blur(8px)' }}
      />

      {/* Dialog card — stopPropagation prevents overlay click from closing */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="skm-title"
        aria-describedby="skm-desc"
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: '#FFFFFF',
          border: '1px solid #ecebea',
          boxShadow: '0 32px 64px rgba(177,177,175,0.16), 0 0 0 1px rgba(177,177,175,0.04)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative glows */}
        <div aria-hidden className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(177,177,175,0.07) 0%, transparent 65%)' }} />
        <div aria-hidden className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(177,177,175,0.04) 0%, transparent 65%)' }} />

        <div className="relative z-10 p-8">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#272625] focus-visible:outline-offset-2"
            style={{ color: '#6d6c6b' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#272625')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#6d6c6b')}
          >
            <X size={18} />
          </button>

          {status === 'success' ? (
            /* ── Success state ───────────────────────── */
            <div className="text-center py-6">
              <div className="flex justify-center mb-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: '#f4f3ef', border: '1px solid rgba(177,177,175,0.30)' }}
                >
                  <CheckCircle size={32} style={{ color: '#272625' }} />
                </div>
              </div>
              <h2 className="font-heading font-bold text-2xl mb-2" style={{ color: '#272625' }}>
                Check your inbox
              </h2>
              <p className="font-body text-sm" style={{ color: '#6d6c6b' }}>
                Your Starter Kit is on the way
              </p>
            </div>
          ) : (
            /* ── Default / submitting state ──────────── */
            <>
              <p
                className="font-body text-xs font-semibold uppercase tracking-[0.20em] mb-4"
                style={{ color: '#272625' }}
              >
                Free Resource
              </p>

              <h2
                id="skm-title"
                className="font-heading font-bold mb-3"
                style={{ fontSize: 'clamp(22px, 3vw, 28px)', lineHeight: 1.15, color: '#272625' }}
              >
                Get the Free Starter Kit
              </h2>

              <p
                id="skm-desc"
                className="font-body text-sm leading-relaxed mb-6"
                style={{ color: '#6d6c6b' }}
              >
                Start with ready-to-use prompts, templates, and workflow ideas for your everyday work
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="skm-email" className="sr-only">Email address</label>
                  <input
                    ref={inputRef}
                    id="skm-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError('') }}
                    placeholder="your@email.com"
                    disabled={status === 'submitting'}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'skm-email-error' : undefined}
                    className="w-full font-body text-sm rounded-xl px-4 py-3 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#272625] focus-visible:outline-offset-1 placeholder:opacity-50"
                    style={{
                      background: '#f4f3ef',
                      color: '#272625',
                      border: `1px solid ${emailError ? 'rgba(239,68,68,0.55)' : '#ecebea'}`,
                      caretColor: '#272625',
                    }}
                  />
                  {emailError && (
                    <p
                      id="skm-email-error"
                      role="alert"
                      className="font-body text-xs mt-2"
                      style={{ color: '#EF4444' }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full font-body font-semibold text-sm inline-flex items-center justify-center gap-2.5 rounded-xl py-3.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#272625] focus-visible:outline-offset-2"
                  style={{
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #272625, #272625)',
                    boxShadow: status !== 'submitting'
                      ? '0 8px 24px -6px rgba(177,177,175,0.40)'
                      : 'none',
                  }}
                >
                  {status === 'submitting' ? (
                    <><Loader2 size={15} className="animate-spin" /> Sending…</>
                  ) : (
                    <>Send me the Starter Kit <ArrowRight size={15} /></>
                  )}
                </button>
              </form>

              <p className="font-body text-xs text-center mt-4" style={{ color: '#6d6c6b' }}>
                No spam. Unsubscribe any time.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
