'use client'

import { useLocale } from 'next-intl'

export default function AskMaddyCTA() {
  const locale = useLocale()
  const isFa   = locale === 'fa'

  return (
    <button
      onClick={() => document.dispatchEvent(new CustomEvent('open-ai-chat'))}
      style={{
        background:    'none',
        border:        'none',
        padding:       0,
        cursor:        'pointer',
        fontFamily:    isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif',
        fontSize:      '14px',
        fontWeight:    500,
        color:         '#FF6A32',
        display:       'inline-flex',
        alignItems:    'center',
        gap:           '5px',
        opacity:       1,
        transition:    'opacity 0.15s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.65' }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
    >
      {isFa ? 'از Maddy AI بپرس ↓' : 'Ask Maddy AI →'}
    </button>
  )
}
