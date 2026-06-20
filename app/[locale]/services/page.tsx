import Navigation from '@/components/Navigation'
import ServicesPageContent from '@/components/ServicesPageContent'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-navy overflow-x-hidden">
      <Navigation />
      <div className="pt-[72px]">
        <ServicesPageContent />
      </div>
      <Footer />
      <AIAssistant />
    </main>
  )
}
