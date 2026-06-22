import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

export default async function Footer() {
  const t = await getTranslations('footer')
  const locale = await getLocale()

  const navLinks = [
    { labelKey: 'learn'     as const, href: '/learn' },
    { labelKey: 'templates' as const, href: '/templates' },
    { labelKey: 'services'  as const, href: '/services' },
    { labelKey: 'about'     as const, href: '/about' },
  ]

  const legalLinks = [
    { labelKey: 'privacy' as const, href: '#' },
    { labelKey: 'terms'   as const, href: '#' },
  ]

  const isFa = locale === 'fa'

  return (
    <footer
      className="relative"
      style={isFa
        ? { background: '#eeefe9', borderTop: '1px solid #d2d3cc' }
        : { background: '#f4f3ef', borderTop: '1px solid #ecebea' }}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Top: brand left, nav + CTA right */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-7">

          {/* Brand */}
          <div className="max-w-xs">
            <div
              className="font-heading font-bold text-xl mb-2"
              style={{ color: isFa ? '#111827' : '#272625' }}
            >
              Maddy the Techie
            </div>
            <p className="font-body text-sm leading-relaxed" style={{ color: isFa ? '#4d4f46' : '#6d6c6b' }}>
              {t('brand')}
            </p>
          </div>

          {/* Nav links + CTA */}
          <div className="flex flex-col gap-3">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-nav-link font-body text-sm"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
            <Link
              href="/services#contact-form"
              className="inline-flex items-center gap-1.5 font-body font-semibold text-sm self-start transition-opacity duration-200 hover:opacity-80"
              style={{ color: isFa ? '#2f80fa' : '#272625' }}
            >
              {t('startProject')}
              <ArrowRight size={13} />
            </Link>
          </div>

        </div>

        {/* Divider */}
        <div className="mb-6" style={{ height: '1px', background: isFa ? '#d2d3cc' : '#ecebea' }} />

        {/* Bottom: copyright + disclaimer left, lang switcher + legal right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          <div className="flex flex-col gap-1.5">
            <p className="font-body text-xs" style={{ color: isFa ? '#65675e' : '#6d6c6b' }}>
              © <span dir="ltr">2026</span> Maddy the Techie
            </p>
            <p className="font-body text-xs" style={{ color: isFa ? '#65675e' : '#6d6c6b' }}>
              {t('disclaimer')}
            </p>
          </div>

          <div className="flex items-center gap-5">
            {/* Language switcher */}
            <div
              className="flex items-center gap-1 px-1 py-1"
              style={isFa
                ? { background: '#fdfdf8', border: '1px solid #d2d3cc', borderRadius: '4px' }
                : { background: '#ffffff', border: '1px solid #ecebea', borderRadius: '9999px' }}
            >
              <Link
                href="/"
                locale="en"
                className="px-3 py-1 text-xs font-body font-semibold transition-all duration-200"
                style={locale === 'en'
                  ? { background: isFa ? '#111827' : '#272625', color: '#ffffff', borderRadius: isFa ? '4px' : '9999px' }
                  : { color: isFa ? '#65675e' : '#6d6c6b' }}
              >
                EN
              </Link>
              <Link
                href="/"
                locale="fa"
                className="px-3 py-1 text-xs font-body font-semibold transition-all duration-200"
                style={locale === 'fa'
                  ? { background: isFa ? '#111827' : '#272625', color: '#ffffff', borderRadius: isFa ? '4px' : '9999px' }
                  : { color: isFa ? '#65675e' : '#6d6c6b' }}
              >
                FA
              </Link>
            </div>

            {/* Legal links */}
            <div className="flex gap-4">
              {legalLinks.map((link) => (
                <a
                  key={link.labelKey}
                  href={link.href}
                  className="font-body text-xs transition-colors duration-200"
                  style={{ color: isFa ? '#65675e' : '#6d6c6b' }}
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </footer>
  )
}
