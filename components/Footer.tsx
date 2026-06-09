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
    <footer className="bg-slate/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="font-heading font-bold text-xl text-soft-white mb-1">
              Maddy the Techie
            </div>
            <div className="font-body text-electric text-sm font-medium mb-3">
              Practical AI &amp; automation for modern work
            </div>
            <p className="font-body text-cool-gray text-xs leading-relaxed">
              Learn AI. Automate Work. No Coding.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm text-cool-gray hover:text-soft-white transition-colors duration-200"
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
          <p className="font-body text-xs text-cool-gray/60">
            © {new Date().getFullYear()} Maddy the Techie. All rights reserved.
          </p>
          <div className="flex gap-5">
            {legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-xs text-cool-gray/60 hover:text-cool-gray transition-colors duration-200"
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
