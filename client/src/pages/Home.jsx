import Hero from '../sections/Hero'
import MacbookScroll from '../sections/MacbookScroll'
import Services from '../sections/Services'
import Business from '../sections/Business'
import Process from '../sections/Process'
import Stats from '../sections/Stats'
import Cases from '../sections/Cases'
import TechStack from '../sections/TechStack'
import ROICalculator from '../sections/ROICalculator'
import FAQ from '../sections/FAQ'
import Contact from '../sections/Contact'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <Hero />
      <MacbookScroll />
      <Services />
      <Business />
      <Process />
      <Stats />
      <Cases />
      <TechStack />
      <ROICalculator />
      <FAQ />
      <Contact />
    </main>
  )
}
