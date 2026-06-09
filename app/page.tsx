import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import MethodSection from '@/components/MethodSection'
import CurriculumSection from '@/components/CurriculumSection'
import ProjectsSection from '@/components/ProjectsSection'
import WhoItsFor from '@/components/WhoItsFor'
import ResourcesSection from '@/components/ResourcesSection'
import AboutSection from '@/components/AboutSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'

export default function Home() {
  return (
    <main className="min-h-screen bg-navy overflow-x-hidden">
      <Navigation />
      <Hero />
      <ProblemSection />
      <MethodSection />
      <CurriculumSection />
      <ProjectsSection />
      <WhoItsFor />
      <ResourcesSection />
      <AboutSection />
      <CTASection />
      <Footer />
      <AIAssistant />
    </main>
  )
}
