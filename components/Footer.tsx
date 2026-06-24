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

  return (
    <footer
      className="relative"
      style={{ background: '#F7F3EC', borderTop: '0.5px solid #E7DED2' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Top: brand left, nav + CTA right */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-7">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="font-ui font-bold text-xl mb-2" style={{ color: '#111111' }}>
              Maddy the Techie
            </div>
            <p className="font-ui text-sm leading-relaxed" style={{ color: '#888' }}>
              {t('brand')}
            </p>
          </div>

          {/* Nav + CTA */}
          <div className="flex flex-col gap-3">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-nav-link font-ui text-sm"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
            <Link
              href="/services#contact-form"
              className="inline-flex items-center gap-1.5 font-ui font-semibold text-sm self-start transition-opacity duration-200 hover:opacity-80"
              style={{ color: '#111111' }}
            >
              {t('startProject')}
              <ArrowRight size={13} />
            </Link>
          </div>

        </div>

        {/* Divider */}
        <div className="mb-6" style={{ height: '1px', background: '#E7DED2' }} />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          <div className="flex flex-col gap-1.5">
            <p className="font-ui text-xs" style={{ color: '#888' }}>
              © <span dir="ltr">2026</span> Maddy the Techie
            </p>
            <p className="font-ui text-xs" style={{ color: '#888' }}>
              {t('disclaimer')}
            </p>
          </div>

          <div className="flex items-center gap-5">
            {/* Language switcher */}
            <div
              className="flex items-center gap-1 px-1 py-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.05)', border: '0.5px solid #E7DED2' }}
            >
              <Link
                href="/"
                locale="en"
                className="px-3 py-1 text-xs font-ui font-semibold transition-all duration-200 rounded-full"
                style={locale === 'en'
                  ? { background: '#111111', color: '#ffffff' }
                  : { color: '#888' }}
              >
                EN
              </Link>
              <Link
                href="/"
                locale="fa"
                className="px-3 py-1 text-xs font-ui font-semibold transition-all duration-200 rounded-full"
                style={locale === 'fa'
                  ? { background: '#111111', color: '#ffffff' }
                  : { color: '#888' }}
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
                  className="font-ui text-xs transition-opacity duration-200 hover:opacity-70"
                  style={{ color: '#888' }}
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
