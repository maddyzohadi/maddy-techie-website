import Navigation from '@/components/Navigation'
import ServicesSection from '@/components/ServicesSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default function CollaboratePage() {
  return (
    <main className="min-h-screen bg-navy overflow-x-hidden">
      <Navigation />
      <div className="pt-[72px]">
        <ServicesSection />
      </div>
      <CTASection />
      <Footer />
      <AIAssistant />
    </main>
  )
}
