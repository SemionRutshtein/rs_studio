import { useState } from 'react'
import './FAQ.css'

const FAQ_ITEMS = [
  {
    question: 'How is Red Stone different from a regular software agency?',
    answer: "Most agencies charge by the hour and run 3-month discovery phases before writing a single line of code. We operate as an 'anti-consultancy': every project starts with a free 30-minute call, followed by a fixed-price proposal. You know the exact cost before we start. We also build for production from day one — not prototypes that need to be rebuilt later. Our background in banking and enterprise systems means we understand compliance, uptime, and the cost of failure.",
  },
  {
    question: 'How long does it take to get an AI automation system live?',
    answer: 'Most workflow automations go live in 2–4 weeks. A simple WhatsApp bot: 1 week. A full invoice processing pipeline: 2–3 weeks. Complex enterprise integrations with existing legacy systems: 6–10 weeks. We give you a precise timeline in the architecture document — and we stick to it.',
  },
  {
    question: 'Is AI safe for banking and financial data?',
    answer: 'Yes, and this is an area we specialize in. We can deploy entirely on your private infrastructure — no data touches OpenAI or any external cloud service unless you explicitly approve it. We use private LLM hosting (Ollama, AWS Bedrock) for sensitive environments, implement full audit logging, and design for compliance from the first line of code.',
  },
  {
    question: 'Do I need to replace my current software to use AI?',
    answer: 'Almost never. We integrate with what you already use — your CRM, ERP, accounting system, or internal database. We add an intelligence layer on top, not instead. In fact, the most valuable automations we build connect 3–5 existing tools that were never talking to each other before.',
  },
  {
    question: 'Do your systems support Hebrew and RTL layout?',
    answer: 'Yes — natively. All our bots support Hebrew, including proper RTL text handling in interfaces. We also support English, Ukrainian, Polish, German, and French. We understand the local Israeli business context, local ERP systems, and regional compliance requirements.',
  },
  {
    question: 'What happens if something breaks after launch?',
    answer: "Every project includes 30 days of hypercare support at no extra charge. During this period, we fix bugs, optimize performance, and train your team. After hypercare, we offer optional monthly maintenance retainers. All code is fully documented and owned by you — you're never locked in.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq-section" id="faq">
      <div className="watermark jetbrains">07</div>
      <div className="container relative">
        <div className="section-header reveal" style={{ textAlign: 'center' }}>
          <div className="section-label text-gold jetbrains">// COMMON QUESTIONS</div>
          <h2 className="section-title bebas">YOUR QUESTIONS, ANSWERED</h2>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`accordion-item${openIndex === index ? ' open' : ''}`}
            >
              <div
                className="accordion-header"
                onClick={() => toggle(index)}
              >
                <span className="accordion-title">{item.question}</span>
                <svg
                  className="accordion-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              <div className="accordion-content">
                <div className="accordion-inner">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
