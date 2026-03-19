import { useEffect, useRef } from 'react'
import './Process.css'

const STEPS = [
  {
    number: 1,
    title: 'Discovery Call',
    duration: '[ FREE · DAY 1 ]',
    desc: '30 minutes. We map your pain points, identify the top 3 automation wins, and tell you honestly if we\'re the right fit. No commitment, just clarity.',
    includes: ['Custom opportunity map', 'Rough timeline', 'Ballpark budget'],
    delay: '0ms',
    icon: (
      <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    number: 2,
    title: 'Audit & Architecture',
    duration: '[ WEEK 1 ]',
    desc: 'We go deep into your existing systems, data flows, and processes. You receive a technical blueprint with exact scope, timeline, and fixed price. No surprises. Ever.',
    includes: ['Technical architecture doc', 'Fixed-price proposal', 'Project kickoff'],
    delay: '150ms',
    icon: (
      <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    number: 3,
    title: 'Build & Integrate',
    duration: '[ WEEKS 2–4 ]',
    desc: 'Iterative development with weekly live demos. Full Git history, documented code, tested, reviewed, and built as if your senior engineer wrote it. You have visibility at every step.',
    includes: ['Weekly live demos', 'Full source code ownership', 'Documented APIs'],
    delay: '300ms',
    icon: (
      <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    number: 4,
    title: 'Deploy & Optimize',
    duration: '[ GO-LIVE + 30 DAYS ]',
    desc: "Production deployment with monitoring, alerting, and runbook documentation. 30-day hypercare: we fix anything, optimize performance, and train your team. We don't disappear.",
    includes: ['Live production system', 'Monitoring dashboard', '30-day hypercare'],
    delay: '450ms',
    icon: (
      <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
        <path d="M13.5 10.5L21 3" />
        <path d="M16 3h5v5" />
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
        <circle cx="10" cy="14" r="2" />
      </svg>
    ),
  },
]

export default function Process() {
  const sectionRef = useRef(null)
  const connectorRef = useRef(null)

  // Reveal animation for steps
  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    if (!reveals) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const delay = el.dataset.delay || '0ms'
            el.style.setProperty('--delay', delay)
            el.classList.add('revealed')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Timeline draw animation — port from index.html
  useEffect(() => {
    const cLine = connectorRef.current
    const cSection = sectionRef.current
    if (!cLine || !cSection) return

    const onScroll = () => {
      const rect = cSection.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = 1 - Math.max(0, Math.min(1, rect.bottom / (window.innerHeight + rect.height)))
        cLine.style.strokeDashoffset = String(1000 - progress * 1000)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Trigger once on mount in case section is already visible
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="process-section section-padding" id="process" ref={sectionRef}>
      <div className="watermark">03</div>
      <div className="container relative">
        <div className="section-header reveal">
          <div className="section-label text-gold jetbrains">// THE PROCESS</div>
          <h2 className="section-title bebas">FROM FIRST CALL TO LIVE SYSTEM</h2>
          <p className="section-sub text-muted">
            We move fast, stay transparent, and hand you production-quality code.
          </p>
        </div>
        <div className="process-grid">
          <div className="process-connector" />
          <svg className="connector-svg" preserveAspectRatio="none">
            <path
              d="M0 2 L 1000 2"
              className="connector-path"
              ref={connectorRef}
            />
          </svg>
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="process-step reveal"
              data-delay={step.delay}
            >
              <div className="step-number-bg">{step.number}</div>
              {step.icon}
              <h4 className="step-title">{step.title}</h4>
              <span className="step-duration">{step.duration}</span>
              <p className="step-desc">{step.desc}</p>
              <ul className="step-includes">
                {step.includes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
