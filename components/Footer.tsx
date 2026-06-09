const navLinks = [
  { label: 'Home',      href: '#home' },
  { label: 'Training',  href: '#training' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Templates', href: '#templates' },
  { label: 'About',     href: '#about' },
  { label: 'Contact',   href: '#contact' },
]

const legal = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use',   href: '#' },
]

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        background: '#02060D',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(91,156,248,0.3) 20%, rgba(139,92,246,0.2) 80%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          {/* Brand */}
          <div className="max-w-xs">
            <div
              className="font-heading font-bold text-xl mb-1"
              style={{
                background: 'linear-gradient(135deg, #5B9CF8, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Maddy the Techie
            </div>
            <div className="font-body text-sm font-medium mb-3" style={{ color: '#5B9CF8' }}>
              Practical AI &amp; automation for modern work
            </div>
            <p className="font-body text-xs leading-relaxed" style={{ color: '#6A7A8E' }}>
              Learn AI. Automate Work. No Coding.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm transition-colors duration-200 hover:text-soft-white"
                style={{ color: '#6A7A8E' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>

        {/* Divider */}
        <div className="section-divider my-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs" style={{ color: 'rgba(106,122,142,0.6)' }}>
            © {new Date().getFullYear()} Maddy the Techie. All rights reserved.
          </p>
          <div className="flex gap-5">
            {legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-xs transition-colors duration-200 hover:text-cool-gray"
                style={{ color: 'rgba(106,122,142,0.6)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
