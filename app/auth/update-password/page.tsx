'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Zap } from 'lucide-react'

const supabase = createClient()

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    supabase.auth.getUser().then(({ data, error: sessionError }) => {
      if (!active) return
      if (sessionError || !data.user) setError('This recovery link is expired or invalid. Request a new one.')
      else setReady(true)
      setLoading(false)
    })
    return () => { active = false }
  }, [])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (password.length < 8) {
      setError('Use at least 8 characters for your new password.')
      return
    }
    if (password !== confirmation) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    setError('')
    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) setError(updateError.message)
    else setSaved(true)
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#04080F' }}>
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8"><span className="inline-flex items-center gap-2 font-body font-semibold text-[11px] uppercase tracking-widest px-5 py-2 rounded-full" style={{ background: 'rgba(91,156,248,0.10)', border: '1px solid rgba(91,156,248,0.22)', color: '#5B9CF8' }}><Zap size={11} style={{ fill: '#5B9CF8' }} />Maddy the Techie</span></div>
        <div className="rounded-2xl p-8" style={{ background: 'rgba(12,21,36,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {saved ? (
            <div className="text-center"><h1 className="font-heading font-bold text-2xl text-soft-white mb-3">Password updated</h1><p className="font-body text-sm" style={{ color: '#6A7A8E' }}>Your password has been changed successfully.</p><Link href="/auth/login" className="inline-block mt-8 font-body text-sm font-semibold" style={{ color: '#5B9CF8' }}>Sign in</Link></div>
          ) : (
            <>
              <h1 className="font-heading font-bold text-2xl text-soft-white mb-2">Choose a new password</h1>
              {loading && <p className="font-body text-sm mb-6" style={{ color: '#6A7A8E' }}>Checking your recovery link…</p>}
              {!loading && error && !ready && <p className="font-body text-sm rounded-xl px-4 py-3 mb-6" style={{ background: 'rgba(255,117,85,0.10)', color: '#FF7555', border: '1px solid rgba(255,117,85,0.20)' }}>{error}</p>}
              {!loading && ready && <form onSubmit={handleSubmit} className="space-y-4">
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} placeholder="New password" autoComplete="new-password" className="w-full px-4 py-3 rounded-xl font-body text-sm text-soft-white outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }} />
                <input type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required minLength={8} placeholder="Confirm new password" autoComplete="new-password" className="w-full px-4 py-3 rounded-xl font-body text-sm text-soft-white outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }} />
                {error && <p className="font-body text-sm rounded-xl px-4 py-3" style={{ background: 'rgba(255,117,85,0.10)', color: '#FF7555', border: '1px solid rgba(255,117,85,0.20)' }}>{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 rounded-full font-body font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed">Update password</button>
              </form>}
              {!loading && !ready && <p className="font-body text-sm text-center mt-6"><Link href="/auth/forgot-password" className="font-semibold" style={{ color: '#5B9CF8' }}>Request a new link</Link></p>}
            </>
          )}
        </div>
      </div>
    </main>
  )
}