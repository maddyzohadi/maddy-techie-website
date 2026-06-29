// Marquee using /images/maddy-ribbon-divider.png as a tiling background strip.
// background-size: auto 100% preserves the image aspect ratio at container height.
// background-position-x animates by one tile width for a seamless loop.
export default function MaddyRibbonDivider({
  direction = 'left',
  duration = 2,
  className,
}: {
  direction?: 'left' | 'right'
  duration?: number
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={`mrda-wrap mrda-${direction}${className ? ` ${className}` : ''}`}
      style={{ '--mrda-dur': `${duration}s` } as React.CSSProperties}
    />
  )
}
