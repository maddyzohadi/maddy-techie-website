'use client'

import { useState, useEffect, useRef } from 'react'
import { X, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

// TODO: connect to email service
async function submitStarterKit(email: string): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 900))
  // TODO: connect to email service — replace with real API call
  void email
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
    } catch {
      setEmailError('Something went wrong. Please try again.')
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
        style={{ background: 'rgba(4,8,15,0.85)', backdropFilter: 'blur(8px)' }}
      />

      {/* Dialog card — stopPropagation prevents overlay click from closing */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="skm-title"
        aria-describedby="skm-desc"
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #080e1f 0%, #0c1630 55%, #070c1a 100%)',
          border: '1px solid rgba(139,123,255,0.22)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(139,123,255,0.07)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative glows */}
        <div aria-hidden className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(91,140,255,0.14) 0%, transparent 65%)' }} />
        <div aria-hidden className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(155,125,240,0.12) 0%, transparent 65%)' }} />

        <div className="relative z-10 p-8">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8cff] focus-visible:outline-offset-2"
            style={{ color: '#7589A3' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E4EAF3')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#7589A3')}
          >
            <X size={18} />
          </button>

          {status === 'success' ? (
            /* ── Success state ───────────────────────── */
            <div className="text-center py-6">
              <div className="flex justify-center mb-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(91,140,255,0.14)', border: '1px solid rgba(91,140,255,0.30)' }}
                >
                  <CheckCircle size={32} style={{ color: '#5b8cff' }} />
                </div>
              </div>
              <h2 className="font-heading font-bold text-2xl mb-2" style={{ color: '#EEF2F8' }}>
                Check your inbox
              </h2>
              <p className="font-body text-sm" style={{ color: '#9DB0C8' }}>
                Your Starter Kit is on the way
              </p>
            </div>
          ) : (
            /* ── Default / submitting state ──────────── */
            <>
              <p
                className="font-body text-xs font-semibold uppercase tracking-[0.20em] mb-4"
                style={{ color: '#6f9bff' }}
              >
                Free Resource
              </p>

              <h2
                id="skm-title"
                className="font-heading font-bold mb-3"
                style={{ fontSize: 'clamp(22px, 3vw, 28px)', lineHeight: 1.15, color: '#EEF2F8' }}
              >
                Get the Free Starter Kit
              </h2>

              <p
                id="skm-desc"
                className="font-body text-sm leading-relaxed mb-6"
                style={{ color: '#9DB0C8' }}
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
                    className="w-full font-body text-sm rounded-xl px-4 py-3 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8cff] focus-visible:outline-offset-1 placeholder:opacity-50"
                    style={{
                      background: '#0e1b2e',
                      color: '#E4EAF3',
                      border: `1px solid ${emailError ? 'rgba(239,68,68,0.55)' : 'rgba(140,175,225,0.14)'}`,
                      caretColor: '#5b8cff',
                    }}
                  />
                  {emailError && (
                    <p
                      id="skm-email-error"
                      role="alert"
                      className="font-body text-xs mt-2"
                      style={{ color: '#f87171' }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full font-body font-semibold text-sm inline-flex items-center justify-center gap-2.5 rounded-xl py-3.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8cff] focus-visible:outline-offset-2"
                  style={{
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #5b8cff, #7b78f2, #9b7df0)',
                    boxShadow: status !== 'submitting'
                      ? '0 8px 24px -6px rgba(120,110,240,0.55)'
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

              <p className="font-body text-xs text-center mt-4" style={{ color: '#4d5e75' }}>
                No spam. Unsubscribe any time.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
