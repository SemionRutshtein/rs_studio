import { useState, useEffect, useRef } from 'react'
import './Cases.css'

// Canvas animation for Panel 1 — Data Stream
function DataStreamCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const cp1 = canvasRef.current
    if (!cp1) return
    const cx1 = cp1.getContext('2d')
    let cw1 = (cp1.width = 400)
    let ch1 = (cp1.height = 300)
    let cp1_parts = []
    for (let i = 0; i < 30; i++) {
      cp1_parts.push({ x: Math.random() * cw1, y: Math.random() * ch1, vx: Math.random() * 2 + 1 })
    }
    let rafId
    const renderP1 = () => {
      cx1.fillStyle = 'rgba(10,10,15,0.2)'
      cx1.fillRect(0, 0, cw1, ch1)
      cp1_parts.forEach((p) => {
        p.x += p.vx
        if (p.x > cw1) p.x = -10
        cx1.fillStyle = p.x > cw1 / 2 ? '#F39C12' : '#E74C3C'
        cx1.fillRect(p.x, p.y, 4, 4)
      })
      rafId = requestAnimationFrame(renderP1)
    }
    renderP1()
    return () => cancelAnimationFrame(rafId)
  }, [])

  return <canvas className="data-stream-canvas" ref={canvasRef} />
}

// Animation 2 — Reactive Pulse (CSS-driven, no canvas needed)
function ReactivePulse() {
  return (
    <div className="reactive-pulse">
      <div className="orbit-dot orb-1" />
      <div className="orbit-dot orb-2" />
      <div className="orbit-dot orb-3" />
    </div>
  )
}

// Animation 3 — Grid Rise
function GridRise() {
  const cells = []
  for (let i = 0; i < 100; i++) {
    cells.push(
      <div className="grid-cell" key={i}>
        <div className="grid-node" style={{ transitionDelay: `${(Math.random() * 0.5).toFixed(2)}s` }} />
      </div>
    )
  }
  return (
    <div className="grid-rise-container">
      <div className="grid-rise">{cells}</div>
    </div>
  )
}

// Animation 4 — Glass Cards
function GlassCards() {
  return (
    <div className="glass-cards">
      <div className="g-card">
        <div className="g-bar" style={{ height: '30%' }} />
        <div className="g-bar" style={{ height: '60%' }} />
        <div className="g-bar" style={{ height: '80%' }} />
      </div>
      <div className="g-card">
        <div className="g-bar" style={{ height: '50%' }} />
        <div className="g-bar" style={{ height: '30%' }} />
        <div className="g-bar" style={{ height: '70%' }} />
      </div>
      <div className="g-card">
        <div className="g-bar" style={{ height: '20%' }} />
        <div className="g-bar" style={{ height: '90%' }} />
        <div className="g-bar" style={{ height: '40%' }} />
      </div>
    </div>
  )
}

// Animation 5 — Neural Link (SVG)
function NeuralLink() {
  return (
    <svg className="neural-link" viewBox="0 0 200 200">
      <polygon points="100,20 180,80 150,180 50,180 20,80" className="nc-edge" />
      <line x1="100" y1="20" x2="150" y2="180" className="nc-edge" />
      <line x1="100" y1="20" x2="50" y2="180" className="nc-edge" />
      <line x1="180" y1="80" x2="50" y2="180" className="nc-edge" />
      <line x1="180" y1="80" x2="20" y2="80" className="nc-edge" />
      <line x1="150" y1="180" x2="20" y2="80" className="nc-edge" />
      <circle cx="100" cy="20" r="10" className="nc-node" />
      <circle cx="180" cy="80" r="10" className="nc-node" />
      <circle cx="150" cy="180" r="10" className="nc-node" />
      <circle cx="50" cy="180" r="10" className="nc-node" />
      <circle cx="20" cy="80" r="10" className="nc-node" />
      <circle cx="100" cy="20" r="0" className="pulse-circle" />
    </svg>
  )
}

// Animation 6 — Reveal Audit
function RevealAudit() {
  return (
    <div className="reveal-audit">
      <div className="r-scanner" />
      <div className="reveal-doc">
        <div className="r-line" data-line="1">Invoice Processing ₪3,200/month saved</div>
        <div className="r-line" data-line="2">Support Bot ₪4,800/month saved</div>
        <div className="r-line" data-line="3">Automated Reporting ₪7,000/month saved</div>
        <div className="r-line" style={{ opacity: 0.05 }}>Database migration review pending</div>
        <div className="r-line" style={{ opacity: 0.05 }}>Legacy systems architecture upgrade</div>
      </div>
    </div>
  )
}

const PANELS = [
  {
    titleClass: 'text-red',
    title: 'Invoice-to-ERP Pipeline',
    preview: 'Replaced 40% of manual entry workload using LLMs',
    animation: <DataStreamCanvas />,
    meta: [
      { label: 'Client', value: 'Finance department, 500+ invoices/month' },
      { label: 'Problem', value: '3 staff spending 40% of time on manual invoice entry' },
      {
        label: 'What we built',
        value: 'Python + LLM pipeline: OCR reads PDF → LLM validates totals → auto-pushes to accounting ERP via API.',
      },
      {
        label: 'Tech utilized',
        badges: ['[Python]', '[Claude API]', '[n8n]', '[REST API]', '[AWS Lambda]'],
      },
    ],
    result: 'Invoice processing time: 45 minutes → 8 seconds.\n3 staff reassigned to higher-value work.',
  },
  {
    titleClass: 'text-gold',
    title: 'Real Estate Closer Bot',
    preview: 'Qualified leads and booked viewings 24/7 on WhatsApp',
    animation: <ReactivePulse />,
    meta: [
      { label: 'Client', value: 'Real estate agency, Tel Aviv' },
      { label: 'Problem', value: 'Agents missing leads outside business hours' },
      {
        label: 'What we built',
        value: 'WhatsApp bot (Twilio + Claude API): greets, qualifies by budget/area, sends Calendly link automatically.',
      },
      {
        label: 'Tech utilized',
        badges: ['[Claude AI]', '[Twilio]', '[Node.js]', '[MongoDB]', '[Calendly API]'],
      },
    ],
    result: 'Lead response time: 4 hours → 90 seconds.\n23% increase in booked viewings in month 1.',
  },
  {
    titleClass: 'text-red',
    title: 'E-Commerce Event Layer',
    preview: 'Real-time inventory sync handling 10,000+ users',
    animation: <GridRise />,
    meta: [
      { label: 'Client', value: 'E-commerce platform outgrowing Shopify' },
      { label: 'Problem', value: 'Inventory sync failures, 2-3 second page loads, lost sales' },
      {
        label: 'What we built',
        value: 'PostgreSQL primary + Redis cache layer + Kafka event bus for real-time inventory state management.',
      },
      {
        label: 'Tech utilized',
        badges: ['[PostgreSQL]', '[Redis]', '[Apache Kafka]', '[AWS RDS]', '[Docker]'],
      },
    ],
    result: 'Page load: 2.8s → 180ms.\nZero inventory sync failures since deployment. Handles 10,000+ concurrent users.',
  },
  {
    titleClass: 'text-gold',
    title: 'Executive Intelligence Dashboard',
    preview: 'Unified real-time data spanning 6 disparate APIs',
    animation: <GlassCards />,
    meta: [
      { label: 'Client', value: 'SaaS company CEO' },
      { label: 'Problem', value: 'KPIs scattered across 6 different tools, no single view' },
      {
        label: 'What we built',
        value:
          'React + Next.js private portal. Real-time data from all APIs. Bot conversation stats, automation savings, system health — all in one view with role-based access.',
      },
      {
        label: 'Tech utilized',
        badges: ['[React]', '[Next.js]', '[Node.js]', '[MongoDB]', '[Chart.js]', '[AWS]'],
      },
    ],
    result: 'CEO reduced weekly reporting prep from 3 hours to 0.\nFull operational visibility in one screen.',
  },
  {
    titleClass: 'text-red',
    title: 'Omnichannel Commerce Sync',
    preview: 'Eliminated 4 manual data-entry steps per order',
    animation: <NeuralLink />,
    meta: [
      { label: 'Client', value: 'Multi-channel retailer (5+ SaaS tools)' },
      { label: 'Problem', value: 'Sale in Shopify required manual updates in 4 other systems' },
      {
        label: 'What we built',
        value:
          'n8n orchestration layer: Shopify webhook → auto-generate shipping, update HubSpot deal, post to Slack channel, reconcile in Xero.',
      },
      {
        label: 'Tech utilized',
        badges: ['[n8n]', '[Shopify API]', '[HubSpot API]', '[Slack API]', '[REST]', '[MCP]'],
      },
    ],
    result:
      '4 manual steps eliminated per order.\n500 orders/month = 2,000 manual actions saved.\nTeam of 2 now manages what needed 4 people.',
  },
  {
    titleClass: 'text-gold',
    title: 'AI Readiness Audit',
    preview: 'Identified ₪15,000/month recurring ROI within 48h',
    animation: <RevealAudit />,
    meta: [
      { label: 'Client', value: 'Law firm, 45 employees' },
      {
        label: 'Problem',
        value: '"We hear AI is important but don\'t know what to do first without wasting budget."',
      },
      {
        label: 'What we built',
        value:
          '2-day audit → 12-page AI Readiness Report. 5 prioritized wins, 3-6-9 month roadmap, vendor recommendations, total budget breakdown.',
      },
      {
        label: 'Tech utilized',
        badges: ['[Workshop]', '[Process Mapping]', '[ROI Modeling]', '[Architecture Review]'],
      },
    ],
    result: '₪15,000/month overhead savings identified.\n3 wins implemented in 6 weeks. Client now on monthly retainer.',
  },
]

function Panel({ panel, index, isOpen, onToggle }) {
  return (
    <div className={`panel${isOpen ? ' open' : ''}`}>
      <div className="panel-header" onClick={() => onToggle(index)}>
        <div className="panel-title-group">
          <span className={`panel-title ${panel.titleClass}`}>{panel.title}</span>
          <span className="panel-preview-text">{panel.preview}</span>
        </div>
        <div className="panel-toggle">{isOpen ? 'Collapse −' : 'Expand +'}</div>
      </div>
      <div className="panel-content">
        <div className="panel-inner">
          <div className="panel-animation">{panel.animation}</div>
          <div className="panel-details">
            <div className="panel-meta">
              {panel.meta.map((row, i) => (
                <div key={i} className="panel-meta-row">
                  <div className="panel-meta-label">{row.label}</div>
                  <div className="panel-meta-value">
                    {row.badges ? (
                      <div className="panel-tech">
                        {row.badges.map((b, j) => (
                          <span className="tech-badge" key={j}>{b}</span>
                        ))}
                      </div>
                    ) : (
                      row.value
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="panel-result">
              {panel.result.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < panel.result.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
            <a href="#contact" className="panel-cta">Build Something Similar →</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Cases() {
  const [openPanel, setOpenPanel] = useState(null)

  const handleToggle = (index) => {
    setOpenPanel((prev) => (prev === index ? null : index))
  }

  return (
    <section className="deep-dives section-padding cases-section" id="cases">
      <div className="watermark jetbrains">04</div>
      <div className="container relative">
        <div className="section-header">
          <div className="section-label text-gold jetbrains">// REAL WORK EXAMPLES</div>
          <h2 className="section-title bebas">SEE THE SYSTEMS WE BUILD</h2>
          <p className="section-sub text-muted">Every project below was delivered at fixed price, on schedule.</p>
        </div>

        <div className="panel-container">
          {PANELS.map((panel, i) => (
            <Panel
              key={i}
              panel={panel}
              index={i}
              isOpen={openPanel === i}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
