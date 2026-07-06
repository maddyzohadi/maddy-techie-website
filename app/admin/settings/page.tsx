import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings — Chatbot Admin',
}

// ── Settings sections ─────────────────────────────────────────────────────

const CONFIG = [
  {
    section: 'AI Model',
    description: 'Language model and generation parameters used by the assistant.',
    items: [
      { label: 'Provider',    value: 'OpenRouter',             type: 'text',   editable: false },
      { label: 'Model',       value: 'openai/gpt-4o-mini',     type: 'text',   editable: false },
      { label: 'Temperature', value: '0.7',                    type: 'number', editable: true  },
      { label: 'Max Tokens',  value: '600',                    type: 'number', editable: true  },
    ],
  },
  {
    section: 'Widget',
    description: 'Chatbot widget visibility and behaviour across the site.',
    items: [
      { label: 'Widget Enabled',  value: 'Yes',                type: 'toggle', editable: true  },
      { label: 'Pages Active',    value: 'All pages',          type: 'text',   editable: false },
      { label: 'Default Language','value': 'Detected from URL', type: 'text',  editable: false },
      { label: 'Position',        value: 'Bottom-right',       type: 'text',   editable: false },
    ],
  },
  {
    section: 'Lead Capture',
    description: 'How visitor contact information is collected and stored.',
    items: [
      { label: 'Lead Capture',   value: 'Enabled',             type: 'toggle', editable: true  },
      { label: 'Storage',        value: 'Supabase (leads)',     type: 'text',   editable: false },
      { label: 'Fields Stored',  value: 'name, email, project_type, notes', type: 'text', editable: false },
      { label: 'Notification',   value: 'Telegram bot',        type: 'text',   editable: false },
    ],
  },
  {
    section: 'Rate Limiting',
    description: 'Controls to prevent abuse and manage API costs.',
    items: [
      { label: 'Rate Limit',     value: '30 requests / min',   type: 'text',   editable: false },
      { label: 'Session History','value': 'Last 12 messages',  type: 'text',   editable: false },
      { label: 'Timeout',        value: '30 seconds',          type: 'text',   editable: false },
    ],
  },
  {
    section: 'Language Support',
    description: 'Languages the assistant can communicate in.',
    items: [
      { label: 'English', value: 'Active · SYSTEM_EN prompt',  type: 'text', editable: false },
      { label: 'Persian', value: 'Active · SYSTEM_FA prompt',  type: 'text', editable: false },
    ],
  },
  {
    section: 'Voice Chat',
    description: 'Voice input (speech-to-text) and text-to-speech output for the chatbot widget. Uses native browser APIs — no third-party service required.',
    items: [
      { label: 'Voice Input (STT)',    value: 'Web Speech API · SpeechRecognition',              type: 'text',   editable: false },
      { label: 'Voice Output (TTS)',   value: 'Browser SpeechSynthesis API',                     type: 'text',   editable: false },
      { label: 'Preferred Voice',      value: 'Female · auto-detected from available voices',     type: 'text',   editable: false },
      { label: 'STT Languages',        value: 'en-US · fa-IR (matches current page locale)',      type: 'text',   editable: false },
      { label: 'Auto-Read Responses',  value: 'Off — manual play button per message',            type: 'toggle-off', editable: true  },
      { label: 'Browser Support',      value: 'Chrome / Edge: full · Firefox / Safari: partial', type: 'text',   editable: false },
      { label: 'Mic Permission',       value: 'Requested on first use · graceful fallback',      type: 'text',   editable: false },
    ],
  },
]

// ── Page ──────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '900px' }}>

      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em' }}>
          Settings
        </h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#8C7E74', lineHeight: 1.5 }}>
          Configuration for the Maddy AI Assistant. Editable fields are managed via environment variables and code.
        </p>
      </div>

      {/* Config sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {CONFIG.map(section => (
          <div
            key={section.section}
            style={{
              background:   '#FFFDF8',
              border:       '0.5px solid rgba(17,17,17,0.09)',
              borderRadius: '14px',
              overflow:     'hidden',
            }}
          >
            {/* Section header */}
            <div
              style={{
                padding:      '18px 24px',
                borderBottom: '0.5px solid rgba(17,17,17,0.07)',
              }}
            >
              <h2 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600, color: '#111111' }}>
                {section.section}
              </h2>
              <p style={{ margin: 0, fontSize: '13px', color: '#8C7E74', lineHeight: 1.5 }}>
                {section.description}
              </p>
            </div>

            {/* Items */}
            <div>
              {section.items.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    padding:         '14px 24px',
                    borderBottom:   i < section.items.length - 1 ? '0.5px solid rgba(17,17,17,0.05)' : 'none',
                    gap:            '16px',
                  }}
                >
                  <div style={{ flex: '0 0 180px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#625B55' }}>
                      {item.label}
                    </span>
                  </div>

                  <div style={{ flex: 1 }}>
                    {item.type === 'toggle' || item.type === 'toggle-off' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width:        '36px',
                            height:       '20px',
                            borderRadius: '100px',
                            background:   item.type === 'toggle' ? '#E34E2E' : 'rgba(17,17,17,0.14)',
                            position:     'relative',
                          }}
                        >
                          <div
                            style={{
                              position:     'absolute',
                              left:          item.type === 'toggle' ? 'auto' : '3px',
                              right:         item.type === 'toggle' ? '3px' : 'auto',
                              top:           '3px',
                              width:         '14px',
                              height:        '14px',
                              borderRadius:  '50%',
                              background:    '#FFFDF8',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 500, color: '#111111' }}>
                          {item.value}
                        </span>
                      </div>
                    ) : (
                      <span
                        style={{
                          fontSize:   '13px',
                          color:      '#111111',
                          fontFamily: item.type === 'text' && (item.value as string).includes('/') ? 'monospace' : 'inherit',
                        }}
                      >
                        {item.value as string}
                      </span>
                    )}
                  </div>

                  <div style={{ flex: '0 0 80px', textAlign: 'right' }}>
                    {item.editable ? (
                      <span
                        style={{
                          fontSize:     '11px',
                          fontWeight:   600,
                          color:        '#E34E2E',
                          background:   'rgba(227,78,46,0.08)',
                          padding:       '3px 9px',
                          borderRadius:  '100px',
                        }}
                      >
                        Editable
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize:     '11px',
                          color:        '#C0B8B2',
                          background:   'rgba(17,17,17,0.04)',
                          padding:       '3px 9px',
                          borderRadius:  '100px',
                        }}
                      >
                        Read-only
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Env vars reference */}
      <div
        style={{
          marginTop:    '24px',
          padding:      '18px 22px',
          background:   'rgba(17,17,17,0.03)',
          border:       '0.5px solid rgba(17,17,17,0.09)',
          borderRadius: '12px',
        }}
      >
        <p style={{ margin: '0 0 10px', fontSize: '12px', fontWeight: 600, color: '#625B55', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Required environment variables
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { key: 'OPENROUTER_API_KEY',           desc: 'OpenRouter API key for GPT-4o Mini access'      },
            { key: 'NEXT_PUBLIC_SUPABASE_URL',      desc: 'Supabase project URL for conversation storage'  },
            { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', desc: 'Supabase anonymous key (public)'               },
            { key: 'SUPABASE_SERVICE_ROLE_KEY',     desc: 'Supabase service key (server-only, optional)'  },
            { key: 'TELEGRAM_BOT_TOKEN',            desc: 'Telegram bot token for lead notifications'     },
          ].map(v => (
            <div key={v.key} style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
              <code
                style={{
                  fontSize:     '12px',
                  fontFamily:   'monospace',
                  color:        '#C43E22',
                  background:   'rgba(227,78,46,0.07)',
                  padding:       '2px 7px',
                  borderRadius:  '4px',
                  flexShrink:    0,
                  minWidth:      '280px',
                }}
              >
                {v.key}
              </code>
              <span style={{ fontSize: '12px', color: '#8C7E74' }}>{v.desc}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
