'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Zap, CheckCircle } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: '#04080F' }}
      >
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle size={48} style={{ color: '#5B9CF8' }} />
          </div>
          <h1 className="font-heading font-bold text-2xl text-soft-white mb-3">Check your inbox</h1>
          <p className="font-body text-sm leading-relaxed" style={{ color: '#6A7A8E' }}>
            We sent a confirmation link to <span style={{ color: '#8A97A8' }}>{email}</span>.
            Click it to activate your account.
          </p>
          <Link
            href="/auth/login"
            className="inline-block mt-8 font-body text-sm font-semibold"
            style={{ color: '#5B9CF8' }}
          >
            Back to login
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#04080F' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 font-body font-semibold text-[11px] uppercase tracking-widest px-5 py-2 rounded-full"
            style={{
              background: 'rgba(91,156,248,0.10)',
              border: '1px solid rgba(91,156,248,0.22)',
              color: '#5B9CF8',
            }}
          >
            <Zap size={11} style={{ fill: '#5B9CF8' }} />
            Maddy the Techie
          </span>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(12,21,36,0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <h1 className="font-heading font-bold text-2xl text-soft-white mb-2">Create an account</h1>
          <p className="font-body text-sm mb-8" style={{ color: '#6A7A8E' }}>
            Join to access AI &amp; automation training
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="font-body text-sm font-medium block mb-1.5" style={{ color: '#8A97A8' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-soft-white outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
              />
            </div>

            <div>
              <label className="font-body text-sm font-medium block mb-1.5" style={{ color: '#8A97A8' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-soft-white outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
              />
            </div>

            {error && (
              <p className="font-body text-sm rounded-xl px-4 py-3" style={{ background: 'rgba(255,117,85,0.10)', color: '#FF7555', border: '1px solid rgba(255,117,85,0.20)' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 rounded-full font-body font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="font-body text-sm text-center mt-6" style={{ color: '#6A7A8E' }}>
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold" style={{ color: '#5B9CF8' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
