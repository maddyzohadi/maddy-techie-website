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

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 80)
      return () => clearTimeout(t)
    }
    setEmail('')
    setEmailError('')
    setStatus('idle')
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

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
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'rgba(90,80,74,0.75)', backdropFilter: 'blur(8px)' }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="skm-title"
        aria-describedby="skm-desc"
        className="relative w-full max-w-md overflow-hidden"
        style={{
          background: '#FFFFFF',
          border: '0.5px solid rgba(123,47,190,0.30)',
          borderRadius: '16px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative z-10 p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 rounded-xl transition-colors"
            style={{ color: '#5A504A' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#111111')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#5A504A')}
          >
            <X size={18} />
          </button>

          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="flex justify-center mb-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(123,47,190,0.12)',
                    border: '0.5px solid rgba(123,47,190,0.30)',
                  }}
                >
                  <CheckCircle size={32} style={{ color: '#111111' }} />
                </div>
              </div>
              <h2 className="font-en font-bold text-2xl mb-2" style={{ color: '#111111' }}>
                Check your inbox
              </h2>
              <p className="font-ui text-sm" style={{ color: '#5A504A' }}>
                Your Starter Kit is on the way
              </p>
            </div>
          ) : (
            <>
              <p
                className="font-ui text-xs font-semibold uppercase tracking-[0.20em] mb-4"
                style={{ color: 'rgba(90,80,74,0.55)' }}
              >
                Free Resource
              </p>

              <h2
                id="skm-title"
                className="font-en font-bold mb-3"
                style={{ fontSize: 'clamp(22px, 3vw, 28px)', lineHeight: 1.15, color: '#111111' }}
              >
                Get the Free Starter Kit
              </h2>

              <p
                id="skm-desc"
                className="font-ui text-sm leading-relaxed mb-6"
                style={{ color: '#5A504A' }}
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
                    className="w-full font-ui text-sm rounded-xl px-4 py-3 disabled:opacity-50 placeholder:opacity-50"
                    style={{
                      background: 'rgba(123,47,190,0.06)',
                      color: '#111111',
                      border: `0.5px solid ${emailError ? 'rgba(239,68,68,0.55)' : 'rgba(123,47,190,0.25)'}`,
                      caretColor: '#111111',
                      outline: 'none',
                    }}
                  />
                  {emailError && (
                    <p
                      id="skm-email-error"
                      role="alert"
                      className="font-ui text-xs mt-2"
                      style={{ color: '#EF4444' }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full font-ui font-semibold text-sm inline-flex items-center justify-center gap-2.5 rounded-xl py-3.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    color: '#ffffff',
                    background: '#4B92DB',
                  }}
                >
                  {status === 'submitting' ? (
                    <><Loader2 size={15} className="animate-spin" /> Sending…</>
                  ) : (
                    <>Send me the Starter Kit <ArrowRight size={15} /></>
                  )}
                </button>
              </form>

              <p className="font-ui text-xs text-center mt-4" style={{ color: 'rgba(90,80,74,0.55)' }}>
                No spam. Unsubscribe any time.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
