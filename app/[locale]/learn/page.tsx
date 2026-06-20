import Navigation from '@/components/Navigation'
import MethodSection from '@/components/MethodSection'
import CurriculumSection from '@/components/CurriculumSection'
import WhoItsFor from '@/components/WhoItsFor'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-navy overflow-x-hidden">
      <Navigation />
      <div className="pt-[72px]">
        <MethodSection />
        <CurriculumSection />
        <WhoItsFor />
      </div>
      <CTASection />
      <Footer />
      <AIAssistant />
    </main>
  )
}
