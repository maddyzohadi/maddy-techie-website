import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conversations — Chatbot Admin',
}

// ── Demo data ─────────────────────────────────────────────────────────────

const CONVERSATIONS = [
  {
    id:      'a1b2c3d4-e5f6-7890',
    lang:    'EN',
    msgs:    8,
    lead:    { name: 'Sarah M.',  email: 'sarah@example.com',  type: 'AI workflow setup'   },
    started: 'Jul 6 · 14:32',
  },
  {
    id:      'e5f6g7h8-i9j0-1234',
    lang:    'FA',
    msgs:    5,
    lead:    null,
    started: 'Jul 6 · 12:15',
  },
  {
    id:      'i9j0k1l2-m3n4-5678',
    lang:    'EN',
    msgs:    12,
    lead:    { name: 'James T.',  email: 'james@example.com',  type: 'Custom AI training'  },
    started: 'Jul 6 · 10:08',
  },
  {
    id:      'm3n4o5p6-q7r8-9012',
    lang:    'EN',
    msgs:    3,
    lead:    null,
    started: 'Jul 5 · 18:44',
  },
  {
    id:      'q7r8s9t0-u1v2-3456',
    lang:    'FA',
    msgs:    7,
    lead:    null,
    started: 'Jul 5 · 16:20',
  },
  {
    id:      'u1v2w3x4-y5z6-7890',
    lang:    'EN',
    msgs:    15,
    lead:    { name: 'Priya K.',  email: 'priya@example.com',  type: 'Workflow design'     },
    started: 'Jul 4 · 09:30',
  },
]

// Full sample conversation for the expanded preview
const SAMPLE_MESSAGES = [
  {
    role:    'assistant' as const,
    content: 'Hi! What would you like to simplify today?',
  },
  {
    role:    'user' as const,
    content: 'How do I connect ChatGPT to Google Sheets?',
  },
  {
    role:    'assistant' as const,
    content:
      "Great question! You can connect ChatGPT to Google Sheets using Make (formerly Integromat). The basic flow: a new row in your sheet triggers Make, which sends that data to ChatGPT, then writes the AI response back into another column. No coding needed.\n\nWould you like me to walk through the setup steps?",
  },
  {
    role:    'user' as const,
    content: "Yes please! Also, do you offer help setting this up?",
  },
  {
    role:    'assistant' as const,
    content:
      "Yes — Maddy offers a one-session AI Setup service where she walks you through the exact workflow for your use case. To get you started personally, could I get your name and email?",
  },
  {
    role:    'user' as const,
    content: "Sure! I'm Sarah, sarah@example.com",
  },
  {
    role:    'assistant' as const,
    content:
      "Thanks Sarah! Your details are saved — Maddy will be in touch soon. In the meantime, the free Starter Kit has a Google Sheets + AI template you can try right now. Anything else I can help with?",
  },
]

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
          All visitor sessions with the Maddy AI Assistant. Demo data shown — connect Supabase to load live conversations.
        </p>
      </div>

      {/* Summary counters */}
      <div style={{ display: 'flex', gap: '14px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total',  value: '248' },
          { label: 'English', value: '172' },
          { label: 'Persian', value: '76'  },
          { label: 'Leads',   value: '34'  },
        ].map(s => (
          <div
            key={s.label}
            style={{
              background:   '#FFFDF8',
              border:       '0.5px solid rgba(17,17,17,0.09)',
              borderRadius: '10px',
              padding:       '12px 20px',
              minWidth:      '96px',
            }}
          >
            <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#8C7E74', fontWeight: 500 }}>{s.label}</p>
            <p style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#111111' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        style={{
          background:   '#FFFDF8',
          border:       '0.5px solid rgba(17,17,17,0.09)',
          borderRadius: '14px',
          overflow:     'hidden',
          marginBottom: '28px',
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
            {CONVERSATIONS.map((conv, i) => (
              <tr
                key={conv.id}
                style={{
                  borderBottom: i < CONVERSATIONS.length - 1 ? '0.5px solid rgba(17,17,17,0.05)' : 'none',
                  background:   i === 0 ? 'rgba(227,78,46,0.025)' : 'transparent',
                }}
              >
                <td style={{ padding: '14px 22px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#625B55' }}>
                    {conv.id.slice(0, 14)}…
                  </span>
                  {i === 0 && (
                    <span
                      style={{
                        marginLeft:  '8px',
                        fontSize:    '10px',
                        color:       '#E34E2E',
                        fontWeight:  600,
                        fontFamily:  'system-ui',
                      }}
                    >
                      expanded ↓
                    </span>
                  )}
                </td>
                <td style={{ padding: '14px 22px' }}>
                  <span
                    style={{
                      display:      'inline-block',
                      padding:       '2px 8px',
                      borderRadius:  '100px',
                      fontSize:      '11px',
                      fontWeight:    600,
                      background:    conv.lang === 'EN' ? 'rgba(17,17,17,0.06)' : 'rgba(227,78,46,0.08)',
                      color:         conv.lang === 'EN' ? '#625B55' : '#C43E22',
                    }}
                  >
                    {conv.lang}
                  </span>
                </td>
                <td style={{ padding: '14px 22px', fontSize: '13px', color: '#111111' }}>
                  {conv.msgs}
                </td>
                <td style={{ padding: '14px 22px' }}>
                  {conv.lead ? (
                    <span
                      style={{
                        display:      'inline-flex',
                        alignItems:   'center',
                        gap:          '4px',
                        padding:       '3px 9px',
                        borderRadius:  '100px',
                        fontSize:      '11px',
                        fontWeight:    600,
                        background:    'rgba(52,211,153,0.10)',
                        color:         '#059669',
                      }}
                    >
                      ✓ {conv.lead.name}
                    </span>
                  ) : (
                    <span style={{ fontSize: '13px', color: '#C0B8B2' }}>—</span>
                  )}
                </td>
                <td style={{ padding: '14px 22px', fontSize: '12px', color: '#8C7E74', whiteSpace: 'nowrap' }}>
                  {conv.started}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expanded conversation preview */}
      <div
        style={{
          background:   '#FFFDF8',
          border:       '0.5px solid rgba(17,17,17,0.09)',
          borderRadius: '14px',
          overflow:     'hidden',
        }}
      >
        {/* Panel header */}
        <div
          style={{
            padding:      '18px 24px',
            borderBottom: '0.5px solid rgba(17,17,17,0.07)',
            display:      'flex',
            alignItems:   'center',
            gap:          '12px',
            flexWrap:     'wrap',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111111' }}>
            Conversation Preview
          </h2>
          <span
            style={{
              padding:      '2px 9px',
              borderRadius: '100px',
              fontSize:     '11px',
              fontWeight:   600,
              background:   'rgba(52,211,153,0.10)',
              color:        '#059669',
            }}
          >
            Lead captured · Sarah M.
          </span>
          <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: '11px', color: '#8C7E74' }}>
            a1b2c3d4-e5f6-7890 · EN · 8 messages
          </span>
        </div>

        {/* Lead card */}
        <div
          style={{
            margin:       '20px 24px 0',
            padding:       '14px 18px',
            background:    'rgba(52,211,153,0.06)',
            border:        '0.5px solid rgba(52,211,153,0.22)',
            borderRadius:  '10px',
            display:       'flex',
            gap:           '28px',
            flexWrap:      'wrap',
          }}
        >
          {[
            { label: 'Name',    value: 'Sarah M.'           },
            { label: 'Email',   value: 'sarah@example.com'  },
            { label: 'Project', value: 'AI workflow setup'  },
            { label: 'Session', value: 'Jul 6 · 14:32'      },
          ].map(f => (
            <div key={f.label}>
              <p style={{ margin: '0 0 2px', fontSize: '10px', color: '#8C7E74', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                {f.label}
              </p>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 500, color: '#111111' }}>{f.value}</p>
            </div>
          ))}
        </div>

        {/* Messages */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {SAMPLE_MESSAGES.map((msg, i) => (
            <div
              key={i}
              style={{
                display:       'flex',
                gap:           '10px',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width:         '26px',
                  height:        '26px',
                  borderRadius:  '50%',
                  flexShrink:    0,
                  background:    msg.role === 'user' ? 'rgba(17,17,17,0.07)' : 'rgba(237,88,33,0.10)',
                  border:        '0.5px solid ' + (msg.role === 'user' ? 'rgba(17,17,17,0.14)' : 'rgba(237,88,33,0.22)'),
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent:'center',
                  fontSize:      '11px',
                  marginTop:     '2px',
                }}
              >
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              {/* Bubble */}
              <div
                style={{
                  maxWidth:     '68%',
                  padding:       '10px 14px',
                  borderRadius:  msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  fontSize:      '13px',
                  lineHeight:    1.6,
                  whiteSpace:    'pre-line',
                  background:    msg.role === 'user' ? '#ED5821' : '#EFE7DC',
                  color:         msg.role === 'user' ? '#FFFDF8' : '#111111',
                  border:        '0.5px solid ' + (msg.role === 'user' ? '#ED5821' : 'rgba(17,17,17,0.09)'),
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
