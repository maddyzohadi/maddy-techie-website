const LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/maddythetechie',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@maddythetechie',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/maddythetechie',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/maddy-techie-08362b418/',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

export default function FloatingSocialLinks() {
  return (
    <div
      className="fixed z-40 flex flex-col gap-2.5 right-3 bottom-24 sm:right-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/4"
    >
      {LINKS.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-200 hover:scale-110 hover:border-[rgba(107,159,255,0.35)] hover:text-[#EEF2F8]"
          style={{
            background: 'rgba(6,10,18,0.82)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            color: '#7A8BA0',
          }}
        >
          {icon}
        </a>
      ))}
    </div>
  )
}
