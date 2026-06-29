// Marquee using /images/maddy-ribbon-divider.png as a tiling background strip.
// background-size: auto 100% preserves the image aspect ratio at container height.
// background-position-x animates by one tile width for a seamless loop.
// The color overlay uses mix-blend-mode: color to remap the red marks to the
// raspberry palette while preserving each pixel's original luminance.
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
      style={{ position: 'relative', isolation: 'isolate' } as React.CSSProperties}
    >
      <div
        className={`mrda-wrap mrda-${direction}${className ? ` ${className}` : ''}`}
        style={{ '--mrda-dur': `${duration}s` } as React.CSSProperties}
      />
      {/* Recolor overlay: applies hue/sat of #F2C1D1 to the ribbon marks */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#F2C1D1',
          mixBlendMode: 'color',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
