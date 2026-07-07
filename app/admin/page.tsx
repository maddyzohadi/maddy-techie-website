import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard — Chatbot Admin',
}

// ── Sub-components ────────────────────────────────────────────────────────

function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div
      style={{
        background:   '#FFFDF8',
        border:       '0.5px solid rgba(17,17,17,0.09)',
        borderRadius: '14px',
        padding:       '24px',
      }}
    >
      <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#8C7E74', fontWeight: 500 }}>
        {label}
      </p>
      <p style={{ margin: '0 0 6px', fontSize: '30px', fontWeight: 700, color: '#C0B8B2', lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ margin: 0, fontSize: '12px', color: '#C0B8B2' }}>{note}</p>
    </div>
  )
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ margin: '0 0 4px', fontSize: '10px', color: '#8C7E74', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.09em' }}>
        {label}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#111111' }}>{value}</span>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  return (
    <div style={{ padding: '40px', maxWidth: '1100px' }}>

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em' }}>
          Dashboard
        </h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#8C7E74', lineHeight: 1.6, maxWidth: '560px' }}>
          Connect Supabase to start tracking real chatbot conversations, leads, and messages.
        </p>
      </div>

      {/* Metric cards — empty state */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(196px, 1fr))',
          gap:                 '16px',
          marginBottom:        '12px',
        }}
      >
        <StatCard label="Total Conversations" value="0"  note="No data yet" />
        <StatCard label="Leads Captured"      value="0"  note="No data yet" />
        <StatCard label="Messages Sent"       value="0"  note="No data yet" />
        <StatCard label="Avg. Session Length" value="—"  note="No data yet" />
      </div>

      {/* Disclaimer */}
      <p style={{ margin: '0 0 28px', fontSize: '12px', color: '#C0B8B2', fontStyle: 'italic' }}>
        Real analytics will require database integration.
      </p>

      {/* Recent conversations — empty state */}
      <div
        style={{
          background:   '#FFFDF8',
          border:       '0.5px solid rgba(17,17,17,0.09)',
          borderRadius: '14px',
          overflow:     'hidden',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            padding:      '18px 24px',
            borderBottom: '0.5px solid rgba(17,17,17,0.07)',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111111' }}>
            Recent Conversations
          </h2>
        </div>

        <div
          style={{
            padding:        '56px 32px',
            textAlign:      'center',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            gap:            '10px',
          }}
        >
          <div
            style={{
              width:        '44px',
              height:       '44px',
              borderRadius: '12px',
              background:   'rgba(17,17,17,0.05)',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              marginBottom: '4px',
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
            Connect Supabase later to track chatbot conversations, leads, messages, and session activity.
          </p>
        </div>
      </div>

      {/* System status */}
      <div
        style={{
          background:   '#FFFDF8',
          border:       '0.5px solid rgba(17,17,17,0.09)',
          borderRadius: '14px',
          padding:      '22px 28px',
          display:      'flex',
          gap:          '40px',
          flexWrap:     'wrap',
        }}
      >
        <StatusRow label="AI Model"     value="GPT-4o Mini (OpenRouter)" />
        <StatusRow label="Lead Capture" value="Active · Supabase"        />
        <StatusRow label="Languages"    value="English · Persian"         />
        <StatusRow label="Rate Limit"   value="30 req / min"              />
        <StatusRow label="Widget"       value="Live on all pages"         />
      </div>

    </div>
  )
}
