'use client'

import { useState, FormEvent } from 'react'

export default function AdminLoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [devMode,  setDevMode]  = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res  = await fetch('/api/admin/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(email.trim() ? { email: email.trim(), password } : { password }),
      })
      const contentType = res.headers.get('content-type') ?? ''
      const responseText = await res.text()
      let data: { error?: string } = {}
      if (!contentType.includes('application/json')) {
        setError('Login failed. Please try again.')
        setLoading(false)
        return
      }
      if (responseText) {
        try {
          data = JSON.parse(responseText) as { error?: string }
        } catch {
          setError('Login failed. Please try again.')
          setLoading(false)
          return
        }
      }

      if (res.status === 500 && data.error?.includes('not configured')) {
        setDevMode(true)
        setLoading(false)
        return
      }

      if (!res.ok) {
        setError(data.error ?? 'Login failed. Please try again.')
        setLoading(false)
        return
      }

      // Full reload so the layout server-reads the new cookie
      window.location.href = '/admin'
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '24px',
        background:     '#FAF6EF',
      }}
    >
      <div style={{ width: '100%', maxWidth: '380px' }}>

        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              justifyContent: 'center',
              width:          '48px',
              height:         '48px',
              borderRadius:   '14px',
              background:     '#ED5821',
              marginBottom:   '14px',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em' }}>
            Maddy the Techie
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#8C7E74' }}>
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background:   '#FFFDF8',
            border:       '0.5px solid rgba(17,17,17,0.10)',
            borderRadius: '18px',
            padding:      '32px',
            boxShadow:    '0 2px 16px rgba(17,17,17,0.06)',
          }}
        >
          {/* Dev mode notice */}
          {devMode && (
            <div
              style={{
                padding:      '14px 16px',
                borderRadius: '10px',
                background:   'rgba(237,88,33,0.07)',
                border:       '0.5px solid rgba(237,88,33,0.22)',
                marginBottom: '24px',
              }}
            >
              <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 700, color: '#C43E22' }}>
                ADMIN_PASSWORD is not configured.
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: '#8C7E74', lineHeight: 1.5 }}>
                Add <code style={{ background: 'rgba(17,17,17,0.07)', padding: '1px 5px', borderRadius: '4px' }}>ADMIN_PASSWORD=yourpassword</code> to your <code style={{ background: 'rgba(17,17,17,0.07)', padding: '1px 5px', borderRadius: '4px' }}>.env.local</code> file, then restart the server.
              </p>
              <button
                onClick={() => { window.location.href = '/admin' }}
                style={{
                  marginTop:    '12px',
                  padding:      '7px 14px',
                  borderRadius: '8px',
                  fontSize:     '12px',
                  fontWeight:   600,
                  background:   '#ED5821',
                  color:        '#fff',
                  border:       'none',
                  cursor:       'pointer',
                }}
              >
                Access Admin (dev mode) →
              </button>
            </div>
          )}

          {!devMode && (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="email"
                  style={{
                    display:       'block',
                    fontSize:      '11px',
                    fontWeight:    600,
                    color:         '#8C7E74',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    marginBottom:  '7px',
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="username"
                  autoFocus
                  style={{
                    width:        '100%',
                    padding:      '10px 14px',
                    fontSize:     '14px',
                    background:   '#FAF6EF',
                    border:       '0.5px solid rgba(17,17,17,0.14)',
                    borderRadius: '10px',
                    color:        '#111111',
                    outline:      'none',
                    boxSizing:    'border-box',
                  }}
                />
                <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#B0A89E' }}>
                  Leave blank to use the legacy shared password instead.
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="password"
                  style={{
                    display:       'block',
                    fontSize:      '11px',
                    fontWeight:    600,
                    color:         '#8C7E74',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    marginBottom:  '7px',
                  }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  style={{
                    width:        '100%',
                    padding:      '10px 14px',
                    fontSize:     '14px',
                    background:   '#FAF6EF',
                    border:       `0.5px solid ${error ? '#C43E22' : 'rgba(17,17,17,0.14)'}`,
                    borderRadius: '10px',
                    color:        '#111111',
                    outline:      'none',
                    boxSizing:    'border-box',
                  }}
                />
              </div>

              {error && (
                <p
                  style={{
                    margin:       '0 0 16px',
                    fontSize:     '12.5px',
                    color:        '#C43E22',
                    background:   'rgba(200,60,30,0.06)',
                    padding:      '9px 12px',
                    borderRadius: '8px',
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !password.trim()}
                style={{
                  width:        '100%',
                  padding:      '11px',
                  borderRadius: '10px',
                  fontSize:     '14px',
                  fontWeight:   600,
                  background:   loading ? 'rgba(237,88,33,0.60)' : '#ED5821',
                  color:        '#fff',
                  border:       'none',
                  cursor:       loading ? 'default' : 'pointer',
                  transition:   'background 0.15s',
                  opacity:      !password.trim() ? 0.5 : 1,
                }}
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '11.5px', color: 'rgba(17,17,17,0.28)' }}>
          Admin access only · Not a public page
        </p>
      </div>
    </div>
  )
}
