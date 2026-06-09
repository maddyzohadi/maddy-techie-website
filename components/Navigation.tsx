'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home',      href: '#home' },
  { label: 'Training',  href: '#training' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Templates', href: '#templates' },
  { label: 'About',     href: '#about' },
  { label: 'Contact',   href: '#contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen]         = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setActiveLink(href)
    setIsOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <a
              href="#home"
              className="flex flex-col leading-tight group"
              onClick={() => handleNavClick('#home')}
            >
              <span className="font-heading font-bold text-xl text-soft-white group-hover:text-electric transition-colors duration-200">
                Maddy the Techie
              </span>
              <span className="text-electric text-xs font-body font-medium tracking-wide">
                Practical AI &amp; Automation
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 ${
                    activeLink === link.href
                      ? 'text-electric bg-electric/10'
                      : 'text-cool-gray hover:text-soft-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#training"
                className="btn-glow bg-electric hover:bg-blue-600 text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200"
              >
                Start Learning
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-cool-gray hover:text-soft-white hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-20 left-0 right-0 bg-slate border-b border-white/5 shadow-2xl transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-3.5 rounded-xl font-body text-sm font-medium transition-all duration-200 ${
                  activeLink === link.href
                    ? 'text-electric bg-electric/10'
                    : 'text-cool-gray hover:text-soft-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/5 mt-2">
              <a
                href="#training"
                onClick={() => handleNavClick('#training')}
                className="block btn-glow bg-electric hover:bg-blue-600 text-white font-body font-semibold text-sm px-5 py-3 rounded-full text-center transition-all duration-200"
              >
                Start Learning
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
