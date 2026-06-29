import StarterKitCTA from './StarterKitCTA'

export default function StarterKitBridge() {
  return (
    <div
      className="relative py-16 text-center overflow-hidden"
      style={{
        background: '#111111',
        borderTop: '0.5px solid rgba(245,240,232,0.10)',
        borderBottom: '0.5px solid rgba(245,240,232,0.10)',
      }}
    >
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6">
        <p
          className="font-ui text-xs font-semibold uppercase tracking-[0.20em] mb-3"
          style={{ color: 'rgba(245,240,232,0.60)' }}
        >
          Free Resource
        </p>
        <h3
          className="font-en font-bold text-2xl md:text-3xl mb-4 leading-snug"
          style={{ color: '#F5F0E8' }}
        >
          Start with the Starter Kit
        </h3>
        <p
          className="font-ui text-base mb-7 mx-auto"
          style={{ color: 'rgba(245,240,232,0.60)', maxWidth: '360px' }}
        >
          Ready-to-use prompts and templates for your first AI workflows
        </p>
        <StarterKitCTA />
      </div>
    </div>
  )
}
