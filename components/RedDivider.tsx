// Decorative M-chevron motion ribbon — section separator.
// aria-hidden, pointer-events-none; respects prefers-reduced-motion via globals.css.
export default function RedDivider({
  id: _id,
  direction = 'left',
  duration = 14,
}: {
  id: string
  direction?: 'left' | 'right'
  duration?: number
}) {
  return (
    <div
      aria-hidden
      className={`rda-wrap rda-${direction}`}
      style={{ '--rda-dur': `${duration}s` } as React.CSSProperties}
    />
  )
}
