import { useEffect, useRef } from 'react'
import './Stats.css'

const STATS = [
  { value: 80, suffix: '%', label: 'Average manual workload eliminated per client' },
  { value: 3, suffix: '×', label: 'Average ROI achieved within 6 months of deployment' },
  { value: 200, suffix: '+', label: 'Automation pipelines and integrations shipped to production' },
  { value: null, display: '24/7', label: 'Uptime on all managed AI systems and bots' },
]

function easeOutQuad(t) {
  return t * (2 - t)
}

function animateCounter(el, target, suffix, duration = 2000) {
  const start = performance.now()
  let rafId
  function step(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const value = Math.floor(easeOutQuad(progress) * target)
    el.textContent = value + suffix
    if (progress < 1) {
      rafId = requestAnimationFrame(step)
    }
  }
  rafId = requestAnimationFrame(step)
  return () => cancelAnimationFrame(rafId)
}

export default function Stats() {
  const sectionRef = useRef(null)
  const counterRefs = useRef([])
  const animatedRef = useRef(false)
  const cleanupFns = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true
            counterRefs.current.forEach((el, i) => {
              if (!el) return
              const stat = STATS[i]
              if (stat.value === null) return // static display
              const cleanup = animateCounter(el, stat.value, stat.suffix)
              cleanupFns.current.push(cleanup)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      cleanupFns.current.forEach((fn) => fn && fn())
    }
  }, [])

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-radial" />
      <div className="container relative">
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div className="stat-item" key={i}>
              <div
                className="stat-number"
                ref={(el) => (counterRefs.current[i] = el)}
              >
                {stat.value === null ? stat.display : `0${stat.suffix}`}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
