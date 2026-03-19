import { useEffect, useRef } from 'react'
import './Services.css'

const SERVICES = [
  {
    popular: true,
    title: 'Agentic AI Automation',
    desc: "We build self-correcting pipelines that don't just move data — they reason about it. Using n8n, custom Python agents, and LLM orchestration, your workflows handle exceptions, validate outputs, and loop back when something looks wrong.",
    metrics: ['⚡ 80% admin hours eliminated', '✓ Zero manual data entry errors'],
    preview: '"Invoice-to-ERP Pipeline — PDF invoices OCR\'d, validated by LLM, pushed directly to accounting software. Zero human touch."',
    cta: 'Explore Automation',
    iconStroke: 'var(--red-bright)',
    icon: (
      <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="var(--red-bright)" strokeWidth="2" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="12" r="2" />
        <circle cx="20" cy="12" r="2" />
        <line x1="6" y1="12" x2="9" y2="12" />
        <line x1="15" y1="12" x2="18" y2="12" />
      </svg>
    ),
  },
  {
    title: 'Intelligent Bots',
    desc: 'Custom-trained agents on Claude AI and OpenAI that handle judgment-based tasks—not just FAQs. Available 24/7 on WhatsApp, Telegram, and Web. 60% of support queries resolved instantly with consistent brand voice.',
    metrics: ['⚡ 60% support load eliminated', '✓ 24/7 lead qualification'],
    preview: '"Real Estate Closer Bot — WhatsApp bot qualifies leads, checks budget/location match, books Calendly in 90 seconds flat."',
    cta: 'Explore Bots',
    icon: (
      <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M9 9h.01" />
        <path d="M15 9h.01" />
        <path d="M12 14c-.8-1.5-2-2-3-2" />
      </svg>
    ),
  },
  {
    title: 'Database Architecture',
    desc: 'High-performance data layers designed for the AI era. We architect MongoDB, PostgreSQL, Redis, and Kafka stacks optimized for RAG retrieval, LLM training, and high-throughput event processing — built by engineers who\'ve run these systems in production banking environments.',
    metrics: ['⚡ Millisecond query speeds', '✓ 99.9% availability SLA'],
    preview: '"E-Commerce Event Layer — PostgreSQL + Redis handling 10,000+ concurrent users with real-time inventory sync."',
    cta: 'Explore Architecture',
    icon: (
      <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="var(--red-bright)" strokeWidth="2" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: 'High-Velocity Web Development',
    desc: 'React and Next.js applications built for conversion, not just aesthetics. Perfect Lighthouse scores, SEO-optimized structure, and dashboards that give your team real-time intelligence — not static reports.',
    metrics: ['⚡ 100/100 Lighthouse score', '✓ Built for AI integration from day 1'],
    preview: '"Executive Dashboard — Private portal showing automation ROI, bot performance, and system health in real-time."',
    cta: 'Explore Web Dev',
    icon: (
      <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <path d="M13 15l-3 4-1-6 3-4 1 6z" />
      </svg>
    ),
  },
  {
    title: 'System Integrations',
    desc: 'We eliminate data silos by connecting your entire stack via REST, GraphQL, and MCP (Model Context Protocol) — a more extensible and secure integration architecture than standard API-only approaches. One source of truth, finally.',
    metrics: ['⚡ No more copy-paste between tools', '✓ Real-time cross-platform sync'],
    preview: '"Omnichannel Sync — Shopify sale triggers shipping label, HubSpot CRM update, and Slack notification simultaneously."',
    cta: 'Explore Integrations',
    icon: (
      <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="var(--red-bright)" strokeWidth="2" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M13 6h3a2 2 0 0 1 2 2v7" />
        <path d="M11 18H8a2 2 0 0 1-2-2V9" />
      </svg>
    ),
  },
  {
    title: 'AI Strategy & Consulting',
    desc: "For CEOs and founders who know AI matters but don't know where to start without wasting budget. We deliver a concrete audit with 3-6-9 month milestones, ROI projections, and zero 'shiny object' distractions.",
    metrics: ['⚡ Avg ₪15,000/month saved post-launch', '✓ Fixed-fee audit'],
    preview: '"2026 AI Readiness Audit — Law firm received 5 automation wins identified in a 2-day audit, implemented over 6 weeks."',
    cta: 'Explore Consulting',
    icon: (
      <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 12a4 4 0 0 0-8 0" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
]

const DELAYS = ['0ms', '120ms', '240ms', '0ms', '120ms', '240ms']

export default function Services() {
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
    <section className="services section-padding" id="services" ref={sectionRef}>
      <div className="watermark">01</div>
      <div className="div-glow section-glow" />
      <div className="container relative">
        <div className="section-header reveal">
          <div className="section-label text-gold jetbrains">// WHAT WE BUILD</div>
          <h2 className="section-title bebas">SIX WAYS WE TRANSFORM YOUR BUSINESS</h2>
          <p className="section-sub text-muted">
            Every service is production-ready, fixed-price, and built to generate ROI from day one.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((svc, i) => (
            <div
              key={i}
              className="service-card reveal"
              data-delay={DELAYS[i]}
            >
              {svc.icon}
              {svc.popular && <div className="service-tag">MOST POPULAR</div>}
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <div className="service-metrics">
                {svc.metrics.map((m, j) => (
                  <span key={j}>{m}</span>
                ))}
              </div>
              <div className="service-preview">{svc.preview}</div>
              <a href="#contact" className="service-cta">{svc.cta} &rarr;</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
