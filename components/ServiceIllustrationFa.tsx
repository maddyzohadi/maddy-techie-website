'use client'

export type IllustrationVariant = 'workflow' | 'templates' | 'training'

// ─────────────────────────────────────────────────────────────────────────────
// Shared AI head "anatomy" — consistent robot-inspired face across all 3 cards
// Usage: pass center (hx, hy) and the SVG renders the head at that point.
// Head: 56 × 64, rx=16 | Eyes: 9 × 7 rounded squares | Antenna dot on top
// ─────────────────────────────────────────────────────────────────────────────

interface AiHeadProps {
  hx: number      // center X
  hy: number      // center Y (mid of head body)
  headH?: number  // head height, default 64
}

function AiHead({ hx, hy, headH = 64 }: AiHeadProps) {
  const hw = 56                // head width
  const rx = 16                // corner radius
  const x  = hx - hw / 2      // rect left edge
  const y  = hy - headH / 2   // rect top edge
  const eyeY  = hy - headH * 0.14
  const dotY  = hy + headH * 0.20
  const stemY = y - 5
  const antY  = y - 12

  return (
    <>
      {/* Drop shadow */}
      <rect x={x + 2} y={y + 3} width={hw} height={headH} rx={rx}
        fill="rgba(0,0,0,0.07)"/>
      {/* Head body */}
      <rect x={x} y={y} width={hw} height={headH} rx={rx}
        fill="#FFFDF8" stroke="rgba(227,78,46,0.22)" strokeWidth="0.75"/>
      {/* Antenna stem */}
      <line x1={hx} y1={y} x2={hx} y2={stemY}
        stroke="rgba(227,78,46,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Antenna glow dot */}
      <circle cx={hx} cy={antY} r={5} fill="#E34E2E" fillOpacity="0.18"/>
      <circle cx={hx} cy={antY} r={3} fill="#E34E2E" fillOpacity="0.72"/>
      {/* Eyes — rounded square "LED" style */}
      <rect x={x + 7}      y={eyeY - 3.5} width={9} height={7} rx={3.5}
        fill="#E34E2E" fillOpacity="0.84"/>
      <rect x={x + hw - 16} y={eyeY - 3.5} width={9} height={7} rx={3.5}
        fill="#E34E2E" fillOpacity="0.84"/>
      {/* Processing dots — three dots in a row */}
      <circle cx={hx - 10} cy={dotY} r={2.2} fill="#E34E2E" fillOpacity="0.38"/>
      <circle cx={hx}      cy={dotY} r={2.2} fill="#E34E2E" fillOpacity="0.38"/>
      <circle cx={hx + 10} cy={dotY} r={2.2} fill="#E34E2E" fillOpacity="0.38"/>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Card 1 — Workflow: AI at center routing input → output
// Layout: [output card] ← AI head ← [input card]  (RTL flow)
// ─────────────────────────────────────────────────────────────────────────────
function WorkflowSvg() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden>
      <defs>
        <linearGradient id="svcWfBg" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FEF0E5"/>
          <stop offset="1" stopColor="#FAE4CE"/>
        </linearGradient>
      </defs>

      <rect width="280" height="180" fill="url(#svcWfBg)"/>

      {/* Accent dots */}
      <circle cx="256" cy="18"  r="5"   fill="#E34E2E" fillOpacity="0.18"/>
      <circle cx="24"  cy="160" r="3.5" fill="#E34E2E" fillOpacity="0.13"/>
      <circle cx="140" cy="168" r="2.5" fill="#F4A082" fillOpacity="0.50"/>

      {/* ── Connection arrows (drawn first, behind cards) ── */}
      {/* Right card → AI head: RTL flow, tip at AI right edge */}
      <line x1="192" y1="80" x2="171" y2="80"
        stroke="#E34E2E" strokeWidth="1.5" strokeDasharray="2.5,3"
        strokeOpacity="0.50" strokeLinecap="round"/>
      <path d="M 174 76 L 170 80 L 174 84"
        stroke="#E34E2E" strokeWidth="1.3" strokeLinecap="round"
        strokeLinejoin="round" strokeOpacity="0.55" fill="none"/>

      {/* AI head → Left card: tip at left card right edge */}
      <line x1="110" y1="80" x2="89" y2="80"
        stroke="#E34E2E" strokeWidth="1.5" strokeDasharray="2.5,3"
        strokeOpacity="0.50" strokeLinecap="round"/>
      <path d="M 92 76 L 88 80 L 92 84"
        stroke="#E34E2E" strokeWidth="1.3" strokeLinecap="round"
        strokeLinejoin="round" strokeOpacity="0.55" fill="none"/>

      {/* ── Left card — Output / Done ── */}
      <rect x="18"  y="51" width="70" height="64" rx="12" fill="rgba(0,0,0,0.055)"/>
      <rect x="16"  y="49" width="70" height="64" rx="12"
        fill="rgba(227,78,46,0.07)"
        stroke="#E34E2E" strokeWidth="0.6" strokeOpacity="0.28"/>
      <circle cx="51" cy="81" r="17" fill="#E34E2E" fillOpacity="0.10"/>
      <circle cx="51" cy="81" r="11.5" fill="#FFFDF8"/>
      <path d="M 43 81 L 49 87 L 61 71"
        stroke="#E34E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

      {/* ── Right card — Input / Email trigger ── */}
      <rect x="196" y="51" width="70" height="64" rx="12" fill="rgba(0,0,0,0.055)"/>
      <rect x="194" y="49" width="70" height="64" rx="12"
        fill="#FFFDF8" stroke="rgba(17,17,17,0.07)" strokeWidth="0.5"/>
      <rect x="207" y="64" width="44" height="32" rx="5"
        fill="#FEF0E8" stroke="#E34E2E" strokeWidth="0.8" strokeOpacity="0.42"/>
      <path d="M 207 64 L 229 80 L 251 64"
        stroke="#E34E2E" strokeWidth="1.2" strokeLinecap="round"
        strokeLinejoin="round" strokeOpacity="0.85"/>

      {/* ── AI head — center focal point ── */}
      <AiHead hx={140} hy={78}/>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Card 2 — Templates: AI at top generating three template cards below
// Layout: AI head (top-center) → three cards fan out beneath
// ─────────────────────────────────────────────────────────────────────────────
function TemplatesSvg() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden>
      <defs>
        <linearGradient id="svcTpBg" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FEF4EC"/>
          <stop offset="1" stopColor="#FAE9D4"/>
        </linearGradient>
      </defs>

      <rect width="280" height="180" fill="url(#svcTpBg)"/>

      {/* Accent dots */}
      <circle cx="258" cy="130" r="4"   fill="#E34E2E" fillOpacity="0.16"/>
      <circle cx="22"  cy="158" r="3"   fill="#F4A082" fillOpacity="0.42"/>
      <circle cx="260" cy="24"  r="3.5" fill="#F4A082" fillOpacity="0.45"/>

      {/* ── Dotted connection lines from AI to each card ── */}
      {/* To left card center (51, 108) */}
      <path d="M 140 79 C 140 92 51 94 51 108"
        stroke="#E34E2E" strokeWidth="1.2" strokeDasharray="2,3.5"
        strokeOpacity="0.42" fill="none" strokeLinecap="round"/>
      {/* To center card top (140, 100) */}
      <line x1="140" y1="79" x2="140" y2="100"
        stroke="#E34E2E" strokeWidth="1.2" strokeDasharray="2,3.5"
        strokeOpacity="0.42" strokeLinecap="round"/>
      {/* To right card center (229, 108) */}
      <path d="M 140 79 C 140 92 229 94 229 108"
        stroke="#E34E2E" strokeWidth="1.2" strokeDasharray="2,3.5"
        strokeOpacity="0.42" fill="none" strokeLinecap="round"/>

      {/* ── Left template card ── */}
      <rect x="15"  y="109" width="72" height="56" rx="10" fill="rgba(0,0,0,0.05)"/>
      <rect x="14"  y="108" width="72" height="56" rx="10"
        fill="#FFFDF8" stroke="rgba(17,17,17,0.07)" strokeWidth="0.5"/>
      <rect x="22"  y="120" width="56" height="4"   rx="2"    fill="#625B55" fillOpacity="0.20"/>
      <rect x="22"  y="130" width="44" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.15"/>
      <rect x="22"  y="139" width="50" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.15"/>
      <rect x="22"  y="148" width="38" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.12"/>

      {/* ── Center template card (featured / selected) ── */}
      <rect x="97"  y="101" width="86" height="68" rx="10" fill="rgba(0,0,0,0.055)"/>
      <rect x="96"  y="100" width="86" height="68" rx="10"
        fill="#FFFDF8" stroke="rgba(17,17,17,0.09)" strokeWidth="0.5"/>
      {/* Orange header bar */}
      <rect x="96"  y="100" width="86" height="18" rx="10" fill="#E34E2E"/>
      <rect x="96"  y="108" width="86" height="10" fill="#E34E2E"/>
      {/* Dots in header */}
      <circle cx="108" cy="109" r="2.5" fill="rgba(255,253,248,0.50)"/>
      <circle cx="116" cy="109" r="2.5" fill="rgba(255,253,248,0.32)"/>
      <circle cx="124" cy="109" r="2.5" fill="rgba(255,253,248,0.18)"/>
      {/* Content lines */}
      <rect x="106" y="126" width="66" height="5"   rx="2.5" fill="#111111" fillOpacity="0.18"/>
      <rect x="106" y="137" width="52" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.18"/>
      <rect x="106" y="146" width="58" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.15"/>
      <rect x="106" y="155" width="44" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.12"/>

      {/* ── Right template card ── */}
      <rect x="194" y="109" width="72" height="56" rx="10" fill="rgba(0,0,0,0.05)"/>
      <rect x="193" y="108" width="72" height="56" rx="10"
        fill="#FFFDF8" stroke="rgba(17,17,17,0.07)" strokeWidth="0.5"/>
      <rect x="201" y="120" width="56" height="4"   rx="2"    fill="#625B55" fillOpacity="0.20"/>
      <rect x="201" y="130" width="44" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.15"/>
      <rect x="201" y="139" width="50" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.15"/>
      <rect x="201" y="148" width="38" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.12"/>

      {/* ── AI head — top center, clearly dominant ── */}
      <AiHead hx={140} hy={50} headH={60}/>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Card 3 — Training: AI on the left, knowledge panel on the right
// The AI character looks directly at the learning panel — most approachable
// ─────────────────────────────────────────────────────────────────────────────
function TrainingSvg() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden>
      <defs>
        <linearGradient id="svcTrBg" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FEF2EA"/>
          <stop offset="1" stopColor="#FAE8D8"/>
        </linearGradient>
      </defs>

      <rect width="280" height="180" fill="url(#svcTrBg)"/>

      {/* Accent dots */}
      <circle cx="256" cy="152" r="3.5" fill="#E34E2E" fillOpacity="0.16"/>
      <circle cx="22"  cy="152" r="2.5" fill="#F4A082" fillOpacity="0.42"/>
      <circle cx="258" cy="22"  r="4"   fill="#F4A082" fillOpacity="0.40"/>

      {/* ── Knowledge sparks (4-pointed stars near AI head) ── */}
      <path d="M 108 36 L 109.5 31 L 111 36 L 116 37.5 L 111 39 L 109.5 44 L 108 39 L 103 37.5 Z"
        fill="#E34E2E" fillOpacity="0.30"/>
      <path d="M 116 78 L 117 74 L 118 78 L 122 79 L 118 80 L 117 84 L 116 80 L 112 79 Z"
        fill="#F4A082" fillOpacity="0.55"/>
      <circle cx="104" cy="57" r="2.5" fill="#E34E2E" fillOpacity="0.28"/>

      {/* ── Connection: dashed line from AI to knowledge panel ── */}
      <line x1="89" y1="72" x2="128" y2="72"
        stroke="#E34E2E" strokeWidth="1.3" strokeDasharray="2,3.5"
        strokeOpacity="0.44" strokeLinecap="round"/>
      <circle cx="128" cy="72" r="2.5" fill="#E34E2E" fillOpacity="0.35"/>

      {/* ── Knowledge panel — right side ── */}
      <rect x="131" y="28" width="122" height="112" rx="12" fill="rgba(0,0,0,0.055)"/>
      <rect x="129" y="26" width="122" height="112" rx="12"
        fill="#FFFDF8" stroke="rgba(17,17,17,0.08)" strokeWidth="0.5"/>

      {/* Panel header / eyebrow */}
      <rect x="140" y="40" width="38" height="4" rx="2" fill="#E34E2E" fillOpacity="0.72"/>
      {/* Heading line */}
      <rect x="140" y="50" width="94" height="5.5" rx="2.75" fill="#111111" fillOpacity="0.22"/>
      {/* Body lines */}
      <rect x="140" y="62"  width="84" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.20"/>
      <rect x="140" y="70"  width="76" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.20"/>
      <rect x="140" y="78"  width="88" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.18"/>
      {/* Divider */}
      <line x1="140" y1="90" x2="240" y2="90"
        stroke="rgba(17,17,17,0.08)" strokeWidth="0.5"/>
      {/* Orange highlight block (active/learning section) */}
      <rect x="140" y="98"  width="94" height="20" rx="6"
        fill="#E34E2E" fillOpacity="0.08"
        stroke="#E34E2E" strokeWidth="0.5" strokeOpacity="0.22"/>
      <rect x="148" y="105" width="38" height="3.5" rx="1.75" fill="#E34E2E" fillOpacity="0.55"/>
      <rect x="148" y="112" width="54" height="3"   rx="1.5"  fill="#E34E2E" fillOpacity="0.30"/>
      {/* Footer lines */}
      <rect x="140" y="124" width="72" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.16"/>
      <rect x="140" y="132" width="60" height="3.5" rx="1.75" fill="#625B55" fillOpacity="0.13"/>

      {/* ── AI head — left side, "looking" toward the panel ── */}
      <AiHead hx={60} hy={72} headH={68}/>
    </svg>
  )
}

// ── Public component ───────────────────────────────────────────────────────────
export default function ServiceIllustrationFa({ variant }: { variant: IllustrationVariant }) {
  if (variant === 'workflow')  return <WorkflowSvg />
  if (variant === 'templates') return <TemplatesSvg />
  return <TrainingSvg />
}
