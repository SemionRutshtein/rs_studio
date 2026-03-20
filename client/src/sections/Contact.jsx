import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Contact.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire to API in future phase
    setSubmitted(true)
  }

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="watermark jetbrains">08</div>
      <div className="contact-glow"></div>
      <div className="container relative">
        <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2
            className="bebas"
            style={{ fontSize: 'clamp(52px, 7vw, 90px)', lineHeight: 1.05 }}
          >
            READY TO BUILD SOMETHING INTELLIGENT?
          </h2>
          <p className="section-sub text-muted" style={{ margin: '0 auto', maxWidth: '800px' }}>
            First consultation is free. Fixed prices. Live in weeks. Real ROI.<br />
            No commitment &middot; No long contracts &middot; Just results
          </p>
        </div>

        <div className="contact-container">

          {/* Contact Form */}
          <div className="form-wrapper reveal" data-delay="200ms">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-name">Full Name *</label>
                <input type="text" id="cf-name" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-email">Email Address *</label>
                <input type="email" id="cf-email" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-company">Company / Organization</label>
                <input type="text" id="cf-company" className="form-control" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-service">Service Interest *</label>
                <select id="cf-service" className="form-control" required defaultValue="">
                  <option value="" disabled>Select a service...</option>
                  <option value="automation">AI Automation Pipeline</option>
                  <option value="bot">Intelligent Bot (WhatsApp/Web/Telegram)</option>
                  <option value="db">Database Architecture</option>
                  <option value="web">Web Development</option>
                  <option value="integration">System Integrations</option>
                  <option value="audit">AI Consulting / Audit</option>
                  <option value="multiple">Multiple Services</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-budget">Monthly Budget</label>
                <select id="cf-budget" className="form-control">
                  <option value="tier1">Under ₪3,000/month</option>
                  <option value="tier2">₪3,000–10,000/month</option>
                  <option value="tier3">₪10,000–30,000/month</option>
                  <option value="enterprise">Enterprise (custom)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-msg">Tell us about your project</label>
                <textarea id="cf-msg" className="form-control" rows="4"></textarea>
              </div>
              <button type="submit" className={`btn-submit${submitted ? ' success' : ''}`}>
                <span className="submit-text">
                  {submitted ? "✓ Message Received! We'll reply within 24h" : 'Send Message →'}
                </span>
                {submitted && (
                  <svg
                    className="check-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="contact-details reveal" data-delay="300ms">
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div className="contact-text">
                <a href="tel:+9720586799369">+972-058-679-9369</a>
                <span>Phone / WhatsApp</span>
              </div>
            </div>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <div className="contact-text">
                <a
                  href="https://www.linkedin.com/in/semion-rutshtein-5091b31b0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Semion Rutshtein
                </a>
                <span>LinkedIn Profile</span>
              </div>
            </div>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div className="contact-text">
                <span className="contact-text-primary">Bat Yam, Tel Aviv Area, Israel</span>
                <span>Serving clients worldwide</span>
              </div>
            </div>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div className="contact-text">
                <span className="contact-text-primary">Response Time</span>
                <span>We reply to all inquiries within 24 hours.<br />Urgent? Call or WhatsApp directly.</span>
              </div>
            </div>

            <div className="contact-divider"></div>

            <div className="contact-confidential">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              All conversations are confidential. NDA available upon request.
            </div>

            <div>
              <Link to="/intake" className="contact-brief-cta">
                Fill Out Full Brief &rarr;
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
