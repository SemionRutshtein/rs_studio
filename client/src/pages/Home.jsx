import Hero from '../sections/Hero'
import MacbookScroll from '../sections/MacbookScroll'
import Services from '../sections/Services'
import Business from '../sections/Business'
import Process from '../sections/Process'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <Hero />
      <MacbookScroll />
      <Services />
      <Business />
      <Process />
    </main>
  )
}
