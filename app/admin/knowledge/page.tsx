import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Knowledge Base — Chatbot Admin',
}

// ── Knowledge base items derived from the active system prompt ────────────

const KB_ITEMS = [
  {
    category:    'Brand',
    title:       'About Maddy the Techie',
    description:
      'Brand identity, mission, and voice. AI education and no-code automation for non-technical professionals. Short, clear, friendly, practical — never hyped or salesy.',
    tags:        ['brand', 'about', 'voice'],
  },
  {
    category:    'Programs',
    title:       'Training Program Modules',
    description:
      '4 core modules: (1) Automation Foundations — triggers, actions, Make/Zapier. (2) AI for Work — prompting, emails, reports. (3) AI Agents & Smart Systems — memory, multi-step workflows. (4) Workflow Projects — practical builds.',
    tags:        ['training', 'curriculum', 'modules'],
  },
  {
    category:    'Services',
    title:       'Services Offered',
    description:
      'AI Setup (one-session onboarding), Workflow Design (custom automations for your work), Templates & Training (ready-to-use kits + group/1:1 training). Results start the same week.',
    tags:        ['services', 'setup', 'training'],
  },
  {
    category:    'Resources',
    title:       'Templates & Free Starter Kit',
    description:
      '6 free templates in the Starter Kit: AI Email Reply Kit, Weekly Report Summary, Content Planner, Prompt Library Tracker, Client Lead Tracker, Meeting Summary. Downloadable.',
    tags:        ['templates', 'starter-kit', 'free'],
  },
  {
    category:    'Workflows',
    title:       'Recommended Workflow Patterns',
    description:
      '6 beginner-friendly patterns: Form → Sheets → auto-reply, email sorting and draft reply, lead follow-up automation, content calendar with AI, weekly report generator, document Q&A.',
    tags:        ['workflows', 'automation', 'beginner'],
  },
  {
    category:    'Tools',
    title:       'Tool Integrations',
    description:
      'ChatGPT, Claude, Google Sheets, Make (Integromat), Zapier. The assistant explains each tool and how they fit together for non-technical users.',
    tags:        ['chatgpt', 'claude', 'sheets', 'make', 'zapier'],
  },
  {
    category:    'Lead Capture',
    title:       'Lead Capture Protocol',
    description:
      'Use capture_lead tool only when visitor wants personal help, a session, or to book work. Always collect name + email naturally in conversation first. Confirm warmly after capture.',
    tags:        ['lead', 'crm', 'tool-call'],
  },
  {
    category:    'Rules',
    title:       'Hard Rules & Safety Boundaries',
    description:
      'Never claim to be human. No legal, medical, or financial advice. Only collect name and email. Respond in the session language. Max 2–4 short paragraphs per response.',
    tags:        ['safety', 'rules', 'compliance'],
  },
]

const CAT_BG: Record<string, string> = {
  Brand:         'rgba(227,78,46,0.09)',
  Programs:      'rgba(59,130,246,0.09)',
  Services:      'rgba(16,185,129,0.09)',
  Resources:     'rgba(245,158,11,0.09)',
  Workflows:     'rgba(139,92,246,0.09)',
  Tools:         'rgba(20,184,166,0.09)',
  'Lead Capture':'rgba(236,72,153,0.09)',
  Rules:         'rgba(107,114,128,0.10)',
}

const CAT_TEXT: Record<string, string> = {
  Brand:         '#C43E22',
  Programs:      '#1D4ED8',
  Services:      '#065F46',
  Resources:     '#B45309',
  Workflows:     '#6D28D9',
  Tools:         '#0F766E',
  'Lead Capture':'#9D174D',
  Rules:         '#374151',
}

export default function KnowledgePage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1000px' }}>

      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em' }}>
          Knowledge Base
        </h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#8C7E74', lineHeight: 1.6 }}>
          Topics and information the assistant uses to answer visitor questions. All knowledge is
          currently embedded in the system prompt inside{' '}
          <code style={{ fontSize: '12px', background: 'rgba(17,17,17,0.06)', padding: '1px 5px', borderRadius: '4px' }}>
            app/api/chat/route.ts
          </code>.
        </p>
      </div>

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {KB_ITEMS.map(item => (
          <div
            key={item.title}
            style={{
              background:   '#FFFDF8',
              border:       '0.5px solid rgba(17,17,17,0.09)',
              borderRadius: '14px',
              padding:       '20px 24px',
              display:       'flex',
              alignItems:    'flex-start',
              gap:           '18px',
            }}
          >
            {/* Category pill */}
            <span
              style={{
                display:      'inline-block',
                padding:       '4px 11px',
                borderRadius:  '100px',
                fontSize:      '11px',
                fontWeight:    600,
                background:    CAT_BG[item.category]   ?? 'rgba(17,17,17,0.06)',
                color:         CAT_TEXT[item.category] ?? '#625B55',
                flexShrink:    0,
                marginTop:     '1px',
                minWidth:      '76px',
                textAlign:     'center',
              }}
            >
              {item.category}
            </span>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 5px', fontSize: '14px', fontWeight: 600, color: '#111111' }}>
                {item.title}
              </p>
              <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#625B55', lineHeight: 1.65 }}>
                {item.description}
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding:      '2px 8px',
                      borderRadius: '100px',
                      fontSize:     '11px',
                      background:   'rgba(17,17,17,0.05)',
                      color:        '#8C7E74',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Status dot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0, paddingTop: '2px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34D399' }} />
              <span style={{ fontSize: '12px', color: '#8C7E74' }}>Active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div
        style={{
          padding:      '16px 20px',
          background:   'rgba(227,78,46,0.05)',
          border:       '0.5px solid rgba(227,78,46,0.18)',
          borderRadius: '10px',
        }}
      >
        <p style={{ margin: 0, fontSize: '13px', color: '#625B55', lineHeight: 1.65 }}>
          <strong style={{ color: '#C43E22' }}>To update knowledge:</strong> Edit the{' '}
          <code style={{ fontSize: '12px', background: 'rgba(17,17,17,0.06)', padding: '1px 5px', borderRadius: '4px' }}>SYSTEM_EN</code>{' '}
          or{' '}
          <code style={{ fontSize: '12px', background: 'rgba(17,17,17,0.06)', padding: '1px 5px', borderRadius: '4px' }}>SYSTEM_FA</code>{' '}
          constants in{' '}
          <code style={{ fontSize: '12px', background: 'rgba(17,17,17,0.06)', padding: '1px 5px', borderRadius: '4px' }}>app/api/chat/route.ts</code>.
          Future versions can load knowledge dynamically from Supabase.
        </p>
      </div>

    </div>
  )
}
