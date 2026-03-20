import { useEffect, useRef } from 'react'
import './Business.css'

function FakeDashboard() {
  const containerRef = useRef(null)
  const typingRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const typing = typingRef.current
    if (!container || !typing) return

    const msgs = [
      { text: 'Hi! How can I help you today?', type: 'bot' },
      { text: 'I need a quote for 50 units', type: 'user' },
      { text: 'Got it! Let me check your pricing tier...', type: 'bot' },
      { text: '✓ Quote sent to your email. Booking a call?', type: 'bot' },
    ]
    let i = 0
    let rafId = null
    let timeouts = []

    const cycle = () => {
      if (i >= msgs.length) {
        const t = setTimeout(() => {
          container.querySelectorAll('.fd-msg').forEach((e) => e.remove())
          i = 0
          cycle()
        }, 3000)
        timeouts.push(t)
        return
      }
      const msg = msgs[i]
      if (msg.type === 'bot') typing.classList.add('visible')
      const t = setTimeout(() => {
        typing.classList.remove('visible')
        const div = document.createElement('div')
        div.className = `fd-msg ${msg.type}`
        div.innerText = msg.text
        container.insertBefore(div, typing)
        const t2 = setTimeout(() => div.classList.add('visible'), 50)
        timeouts.push(t2)
        i++
        const t3 = setTimeout(cycle, msg.type === 'bot' ? 1500 : 800)
        timeouts.push(t3)
      }, msg.type === 'bot' ? 800 : 400)
      timeouts.push(t)
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        cycle()
        observer.disconnect()
      }
    })
    observer.observe(container)

    return () => {
      observer.disconnect()
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="fake-dashboard">
      <div className="fd-header">
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="fd-dot" style={{ background: '#ff5f56' }} />
          <div className="fd-dot" style={{ background: '#ffbd2e' }} />
          <div className="fd-dot" style={{ background: '#27c93f' }} />
        </div>
        <div className="fd-title" style={{ marginLeft: '10px' }}>Red Stone Dashboard</div>
      </div>
      <div className="fd-metrics">
        <div className="fd-metric-card">LEADS<span>1,420</span></div>
        <div className="fd-metric-card">AUTOMATED<span>85%</span></div>
        <div className="fd-metric-card">HOURS SAVED<span>214h</span></div>
      </div>
      <div className="fd-chat" ref={containerRef}>
        <div className="fd-typing" ref={typingRef}>Agent is typing...</div>
      </div>
    </div>
  )
}

function NetworkDiagram() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const nodes = [
      { id: 'crm', label: 'CRM', x: 60, y: 150 },
      { id: 'erp', label: 'ERP', x: 120, y: 60 },
      { id: 'kafka', label: 'Kafka', x: 280, y: 60 },
      { id: 'agent', label: 'AI Agent', x: 200, y: 150, glow: true },
      { id: 'db', label: 'DB', x: 120, y: 240 },
      { id: 'bot', label: 'Bot', x: 280, y: 240 },
      { id: 'api', label: 'API', x: 340, y: 150 },
    ]

    let html = ''
    nodes.forEach((n, idx) => {
      if (idx === 3) return
      const dur = (Math.random() * 2 + 2).toFixed(1)
      html += `<line x1="${nodes[3].x}" y1="${nodes[3].y}" x2="${n.x}" y2="${n.y}" class="diagram-link" id="link-${n.id}" />`
      html += `<circle class="packet" id="pkt-${n.id}">
        <animateMotion dur="${dur}s" repeatCount="indefinite" path="M ${nodes[3].x},${nodes[3].y} L ${n.x},${n.y}" />
      </circle>`
    })
    nodes.forEach((n) => {
      const r = n.glow ? 14 : 10
      const extraStyle = n.glow ? 'style="stroke: var(--red-bright);"' : ''
      html += `<g class="diagram-node">
        <circle cx="${n.x}" cy="${n.y}" r="${r}" ${extraStyle} />
        <text x="${n.x}" y="${n.y + 24}" text-anchor="middle">${n.label}</text>
      </g>`
    })
    svg.innerHTML = html
  }, [])

  return (
    <svg
      className="svg-network"
      viewBox="0 0 400 300"
      ref={svgRef}
    />
  )
}

export default function Business() {
  const sectionRef = useRef(null)

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

            // Animate list items inside revealed split-benefits
            el.querySelectorAll('.split-benefits li').forEach((li, idx) => {
              setTimeout(() => li.classList.add('revealed'), idx * 80)
            })

            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section-padding business-section" id="business" ref={sectionRef}>
      <div className="watermark">02</div>
      <div className="div-glow section-glow" />
      <div className="container relative">
        <div className="section-header reveal">
          <div className="section-label text-gold jetbrains">// WHO WE BUILD FOR</div>
          <h2 className="section-title bebas">AI THAT ACTUALLY MOVES THE NEEDLE</h2>
          <p className="section-sub text-muted">
            Whether you're a 3-person startup or a 300-person enterprise — we have a proven path to ROI.
          </p>
        </div>

        {/* Split A */}
        <div className="split-grid border-bottom" style={{ paddingBottom: '80px', marginBottom: '80px' }}>
          <div className="split-text reveal">
            <div className="badge gold">SMALL BUSINESS &amp; STARTUPS</div>
            <h3 className="split-title bebas">You Don't Need a Tech Giant's Budget to Have an AI Department</h3>
            <p className="split-desc">
              We've productized our most common automation wins into fixed-price packages. In 2–4 weeks,
              your team stops doing repetitive work and starts focusing on what actually grows the business.
            </p>
            <ul className="split-benefits">
              <li>24/7 WhatsApp/Telegram bot — answers, qualifies leads, books meetings</li>
              <li>Automated invoice processing and payment reminder workflows</li>
              <li>AI-powered content pipeline (blog, social, newsletters)</li>
              <li>CRM auto-update from all inbound channels</li>
              <li>Weekly business digest — auto-generated from your own data</li>
              <li>Voice bot for appointment scheduling (clinics, agents, consultants)</li>
            </ul>
            <div className="split-price-badge">【 Starting from ₪1,500 / month · Fixed price · No surprises 】</div>
          </div>
          <div className="split-visual reveal" data-delay="300ms">
            <FakeDashboard />
          </div>
        </div>

        {/* Split B */}
        <div className="split-grid split-reverse">
          <div className="split-visual reveal">
            <NetworkDiagram />
          </div>
          <div className="split-text reveal" data-delay="300ms">
            <div className="badge red">ENTERPRISE &middot; BANKING &middot; FINANCE</div>
            <h3 className="split-title bebas">Built for the Complexity of Real Business</h3>
            <p className="split-desc">
              We don't just know AI — we know the systems it needs to connect to. Spring Boot microservices,
              Kafka event streams, compliance audit logging, private LLM deployment — this is our native
              language. No learning curve on your budget.
            </p>
            <ul className="split-benefits">
              <li>Kafka-based AI event processing — real-time decisions on high-volume data</li>
              <li>Private LLM deployment — your data never leaves your infrastructure</li>
              <li>Compliance-aware automation with full audit log and rollback</li>
              <li>Custom MCP integrations into existing banking and ERP systems</li>
              <li>Internal AI tools for Java development teams (code review, doc gen)</li>
              <li>Multilingual systems — Hebrew RTL, English, Ukrainian, Polish, German, French</li>
            </ul>
            <div className="split-price-badge">【 Custom pricing · NDA available · On-premises deployment option 】</div>
          </div>
        </div>
      </div>
    </section>
  )
}
