import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import MethodSection from '@/components/MethodSection'
import CurriculumSection from '@/components/CurriculumSection'
import ProjectsSection from '@/components/ProjectsSection'
import StarterKitBridge from '@/components/StarterKitBridge'
import WhoItsFor from '@/components/WhoItsFor'
import ResourcesSection from '@/components/ResourcesSection'
import ServicesSection from '@/components/ServicesSection'
import AboutSection from '@/components/AboutSection'
import InstagramSection from '@/components/InstagramSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default function Home() {
  return (
    <main className="min-h-screen bg-navy overflow-x-hidden">
      <Navigation />
      <Hero />
      <ProblemSection />
      <MethodSection />
      <CurriculumSection />
      <ResourcesSection />
      <ProjectsSection />
      <StarterKitBridge />
      <WhoItsFor />
      <ServicesSection />
      <AboutSection />
      <InstagramSection />
      <CTASection />
      <Footer />
      <AIAssistant />
    </main>
  )
}
