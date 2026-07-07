import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conversations — Chatbot Admin',
}

// ── Sub-components ────────────────────────────────────────────────────────

function Counter({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background:   '#FFFDF8',
        border:       '0.5px solid rgba(17,17,17,0.09)',
        borderRadius: '10px',
        padding:      '12px 20px',
        minWidth:     '96px',
      }}
    >
      <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#8C7E74', fontWeight: 500 }}>
        {label}
      </p>
      <p style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#C0B8B2' }}>
        {value}
      </p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ConversationsPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1100px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em' }}>
          Conversations
        </h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#8C7E74', lineHeight: 1.5 }}>
          Connect Supabase to start tracking real chatbot conversations, leads, and session activity.
        </p>
      </div>

      {/* Summary counters — empty state */}
      <div style={{ display: 'flex', gap: '14px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <Counter label="Total"   value="0" />
        <Counter label="English" value="0" />
        <Counter label="Persian" value="0" />
        <Counter label="Leads"   value="0" />
      </div>

      {/* Table — empty state */}
      <div
        style={{
          background:   '#FFFDF8',
          border:       '0.5px solid rgba(17,17,17,0.09)',
          borderRadius: '14px',
          overflow:     'hidden',
          marginBottom: '20px',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(17,17,17,0.02)' }}>
              {['Session ID', 'Language', 'Messages', 'Lead Captured', 'Started'].map(h => (
                <th
                  key={h}
                  style={{
                    padding:       '12px 22px',
                    textAlign:     'left',
                    fontSize:      '11px',
                    fontWeight:    600,
                    color:         '#8C7E74',
                    letterSpacing: '0.05em',
                    borderBottom:  '0.5px solid rgba(17,17,17,0.07)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5}>
                <div
                  style={{
                    padding:        '64px 32px',
                    textAlign:      'center',
                    display:        'flex',
                    flexDirection:  'column',
                    alignItems:     'center',
                    gap:            '10px',
                  }}
                >
                  <div
                    style={{
                      width:          '44px',
                      height:         '44px',
                      borderRadius:   '12px',
                      background:     'rgba(17,17,17,0.05)',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      marginBottom:   '4px',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(17,17,17,0.28)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#625B55' }}>
                    No real conversations yet.
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#B0A89E', maxWidth: '400px', lineHeight: 1.6 }}>
                    Connect Supabase later to track real chatbot conversations, leads, messages, and session activity.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <p style={{ margin: 0, fontSize: '12px', color: '#C0B8B2', fontStyle: 'italic' }}>
        Real conversation data requires database integration.
      </p>

    </div>
  )
}
