import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard — Chatbot Admin',
}

// ── Demo data ─────────────────────────────────────────────────────────────

const STATS = [
  { label: 'Total Conversations', value: '248',   note: '+12 this week' },
  { label: 'Leads Captured',      value: '34',    note: '+4 this week'  },
  { label: 'Messages Sent',       value: '1,842', note: 'Last 30 days'  },
  { label: 'Avg. Session Length', value: '4.2',   note: 'messages / session' },
]

const RECENT = [
  { session: 'a1b2c3d4', lang: 'EN', msgs: 8,  lead: 'Sarah M.',  ago: '2 hours ago',  preview: 'How do I connect ChatGPT to Google Sheets?' },
  { session: 'e5f6g7h8', lang: 'FA', msgs: 5,  lead: null,        ago: '4 hours ago',  preview: 'درباره برنامه‌های آموزشی هوش مصنوعی بیشتر توضیح بده' },
  { session: 'i9j0k1l2', lang: 'EN', msgs: 12, lead: 'James T.',  ago: '6 hours ago',  preview: 'I need help setting up an email automation workflow.' },
  { session: 'm3n4o5p6', lang: 'EN', msgs: 3,  lead: null,        ago: '1 day ago',    preview: 'What is the difference between Make and Zapier?' },
  { session: 'q7r8s9t0', lang: 'FA', msgs: 7,  lead: null,        ago: '1 day ago',    preview: 'چطور یک گردش‌کار اتوماسیون ایمیل بسازم؟' },
  { session: 'u1v2w3x4', lang: 'EN', msgs: 15, lead: 'Priya K.',  ago: '2 days ago',   preview: 'I\'m interested in the custom training program.' },
]

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
      <p style={{ margin: '0 0 6px', fontSize: '30px', fontWeight: 700, color: '#111111', lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ margin: 0, fontSize: '12px', color: '#8C7E74' }}>{note}</p>
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
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em' }}>
          Dashboard
        </h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#8C7E74', lineHeight: 1.5 }}>
          Overview of Maddy AI Assistant activity. Demo data shown — connect Supabase to see live metrics.
        </p>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(196px, 1fr))',
          gap:                 '16px',
          marginBottom:        '32px',
        }}
      >
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Recent conversations table */}
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
            padding:        '18px 24px',
            borderBottom:   '0.5px solid rgba(17,17,17,0.07)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111111' }}>
            Recent Conversations
          </h2>
          <a
            href="/admin/conversations"
            style={{ fontSize: '13px', color: '#E34E2E', textDecoration: 'none', fontWeight: 500 }}
          >
            View all →
          </a>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(17,17,17,0.02)' }}>
              {['Session', 'Lang', 'Msgs', 'Lead', 'Time', 'Last message'].map(h => (
                <th
                  key={h}
                  style={{
                    padding:       '10px 20px',
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
            {RECENT.map((row, i) => (
              <tr
                key={row.session}
                style={{ borderBottom: i < RECENT.length - 1 ? '0.5px solid rgba(17,17,17,0.05)' : 'none' }}
              >
                <td style={{ padding: '13px 20px', fontFamily: 'monospace', fontSize: '12px', color: '#625B55' }}>
                  {row.session}
                </td>
                <td style={{ padding: '13px 20px' }}>
                  <span
                    style={{
                      display:      'inline-block',
                      padding:       '2px 8px',
                      borderRadius:  '100px',
                      fontSize:      '11px',
                      fontWeight:    600,
                      background:    row.lang === 'EN' ? 'rgba(17,17,17,0.06)' : 'rgba(227,78,46,0.08)',
                      color:         row.lang === 'EN' ? '#625B55' : '#C43E22',
                    }}
                  >
                    {row.lang}
                  </span>
                </td>
                <td style={{ padding: '13px 20px', fontSize: '13px', color: '#111111' }}>
                  {row.msgs}
                </td>
                <td style={{ padding: '13px 20px' }}>
                  {row.lead ? (
                    <span
                      style={{
                        display:      'inline-flex',
                        alignItems:   'center',
                        gap:          '4px',
                        padding:       '2px 8px',
                        borderRadius:  '100px',
                        fontSize:      '11px',
                        fontWeight:    600,
                        background:    'rgba(52,211,153,0.10)',
                        color:         '#059669',
                      }}
                    >
                      ✓ {row.lead}
                    </span>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#C0B8B2' }}>—</span>
                  )}
                </td>
                <td style={{ padding: '13px 20px', fontSize: '12px', color: '#8C7E74', whiteSpace: 'nowrap' }}>
                  {row.ago}
                </td>
                <td style={{ padding: '13px 20px', fontSize: '13px', color: '#625B55', maxWidth: '260px' }}>
                  <span
                    style={{
                      display:      'block',
                      overflow:     'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace:   'nowrap',
                    }}
                  >
                    {row.preview}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <StatusRow label="AI Model"      value="GPT-4o Mini (OpenRouter)" />
        <StatusRow label="Lead Capture"  value="Active · Supabase"        />
        <StatusRow label="Languages"     value="English · Persian"         />
        <StatusRow label="Rate Limit"    value="30 req / min"              />
        <StatusRow label="Widget"        value="Live on all pages"         />
      </div>

    </div>
  )
}
