'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Zap, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const redirectTo = `${window.location.origin}/auth/callback?next=/auth/update-password`
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#04080F' }}>
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 font-body font-semibold text-[11px] uppercase tracking-widest px-5 py-2 rounded-full" style={{ background: 'rgba(91,156,248,0.10)', border: '1px solid rgba(91,156,248,0.22)', color: '#5B9CF8' }}>
            <Zap size={11} style={{ fill: '#5B9CF8' }} />
            Maddy the Techie
          </span>
        </div>

        <div className="rounded-2xl p-8" style={{ background: 'rgba(12,21,36,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {sent ? (
            <div className="text-center">
              <div className="flex justify-center mb-6"><CheckCircle size={48} style={{ color: '#5B9CF8' }} /></div>
              <h1 className="font-heading font-bold text-2xl text-soft-white mb-3">Check your inbox</h1>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#6A7A8E' }}>
                If an account exists for {email}, we sent a password reset link.
              </p>
              <Link href="/auth/login" className="inline-block mt-8 font-body text-sm font-semibold" style={{ color: '#5B9CF8' }}>
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-heading font-bold text-2xl text-soft-white mb-2">Reset your password</h1>
              <p className="font-body text-sm mb-8" style={{ color: '#6A7A8E' }}>Enter your email and we&apos;ll send a secure reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl font-body text-sm text-soft-white outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }} />
                {error && <p className="font-body text-sm rounded-xl px-4 py-3" style={{ background: 'rgba(255,117,85,0.10)', color: '#FF7555', border: '1px solid rgba(255,117,85,0.20)' }}>{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 rounded-full font-body font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? 'Sending…' : 'Send reset link'}
                </button>
              </form>
              <p className="font-body text-sm text-center mt-6"><Link href="/auth/login" className="font-semibold" style={{ color: '#5B9CF8' }}>Back to login</Link></p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}