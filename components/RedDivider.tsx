// Decorative M-chevron red divider — section separator.
// aria-hidden, pointer-events-none; animation respects prefers-reduced-motion via globals.css.
const W = 88   // pattern unit width (px)
const H = 52   // divider height (px)

export default function RedDivider({
  id,
  animated = false,
}: {
  id: string
  animated?: boolean
}) {
  const pid = `mc-${id}`

  return (
    <div
      aria-hidden
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: H,
        lineHeight: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    >
      <svg
        className={animated ? 'rda-animated' : undefined}
        style={{
          display: 'block',
          width: animated ? `calc(100% + ${W}px)` : '100%',
          height: H,
        }}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={pid}
            x="0"
            y="0"
            width={W}
            height={H}
            patternUnits="userSpaceOnUse"
          >
            {/* M-shaped chevron: two peaks (y=4) with a valley (y=28) between */}
            <polygon
              points={`0,${H} 22,4 44,28 66,4 ${W},${H}`}
              fill="#D50B1F"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
    </div>
  )
}
