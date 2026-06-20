import StarterKitCTA from './StarterKitCTA'

export default function StarterKitBridge() {
  return (
    <div
      className="relative py-16 text-center overflow-hidden"
      style={{
        background: '#060B14',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(91,140,255,0.07) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6">
        <p
          className="font-body text-xs font-semibold uppercase tracking-[0.20em] mb-3"
          style={{ color: '#6f9bff' }}
        >
          Free Resource
        </p>
        <h3
          className="font-heading font-bold text-2xl md:text-3xl text-soft-white mb-4 leading-snug"
        >
          Start with the Starter Kit
        </h3>
        <p
          className="font-body text-base mb-7 mx-auto"
          style={{ color: '#9DB0C8', maxWidth: '360px' }}
        >
          Ready-to-use prompts and templates for your first AI workflows
        </p>
        <StarterKitCTA />
      </div>
    </div>
  )
}
