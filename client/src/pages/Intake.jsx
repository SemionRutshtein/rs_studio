import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import './Intake.css'

const SERVICES = [
  'Agentic AI Automation',
  'Intelligent Bots (WhatsApp, Telegram, Web)',
  'Database Architecture',
  'Web Development',
  'System Integrations',
  'AI Consulting & Roadmap',
]

const INDUSTRIES = ['Restaurant & Cafe', 'Real Estate', 'E-Commerce', 'Law & Accounting', 'Healthcare', 'B2B Services', 'Other']
const BUDGETS = ['Under $1,000', '$1,000 – $4,999', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+']
const TIMELINES = ['ASAP', '1–3 months', '3–6 months', 'No rush']
const SOURCES = ['Google', 'LinkedIn', 'Referral', 'Social Media', 'Other']
const COMPANY_SIZES = ['Solo', '2–10', '11–50', '50+']

const TOTAL_STEPS = 5

const INITIAL_STATE = {
  services: [],
  industry: '',
  companySize: '',
  currentTools: '',
  painPoint: '',
  alreadyTried: '',
  budget: '',
  timeline: '',
  source: '',
  name: '',
  email: '',
  company: '',
  phone: '',
}

export default function Intake() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(false)

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function toggleService(s) {
    setForm(f => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s]
    }))
  }

  function validateStep() {
    const e = {}
    if (step === 1 && form.services.length === 0) e.services = 'Select at least one service'
    if (step === 2) {
      if (!form.industry) e.industry = 'Required'
      if (!form.companySize) e.companySize = 'Required'
    }
    if (step === 3 && !form.painPoint.trim()) e.painPoint = 'Required'
    if (step === 4) {
      if (!form.budget) e.budget = 'Required'
      if (!form.timeline) e.timeline = 'Required'
    }
    if (step === 5) {
      if (!form.name.trim()) e.name = 'Required'
      if (!form.email.trim()) e.email = 'Required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
      if (!form.company.trim()) e.company = 'Required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (validateStep()) setStep(s => s + 1)
  }

  function back() {
    setStep(s => s - 1)
  }

  async function submit() {
    if (!validateStep()) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setSuccess(true)
    } catch {
      setSubmitError('Something went wrong. Please try again or email us at semion@redstonedev.online')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <main className="intake-page">
        <div className="intake-success">
          <div className="intake-success-icon">✓</div>
          <h1>Brief Received</h1>
          <p>We've received your brief. Semion will be in touch within 24 hours.</p>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="intake-page">
      <div className="intake-container">
        <ProgressBar current={step} total={TOTAL_STEPS} />

        {step === 1 && (
          <div className="intake-step">
            <h2>What do you need help with?</h2>
            <p className="intake-hint">Select all that apply</p>
            {errors.services && <p className="intake-error">{errors.services}</p>}
            <div className="service-cards">
              {SERVICES.map(s => (
                <button
                  key={s}
                  className={`service-card${form.services.includes(s) ? ' selected' : ''}`}
                  data-selected={form.services.includes(s) ? '' : undefined}
                  onClick={() => toggleService(s)}
                  type="button"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="intake-step">
            <h2>Tell us about your business</h2>
            <div className="intake-field">
              <label htmlFor="industry">Industry</label>
              <select id="industry" aria-label="Industry" value={form.industry} onChange={e => update('industry', e.target.value)}>
                <option value="">Select industry…</option>
                {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
              </select>
              {errors.industry && <p className="intake-error">{errors.industry}</p>}
            </div>
            <div className="intake-field">
              <label>Company size</label>
              <div className="radio-group">
                {COMPANY_SIZES.map(s => (
                  <label key={s} className="radio-option">
                    <input type="radio" name="companySize" aria-label={s} value={s} checked={form.companySize === s} onChange={() => update('companySize', s)} />
                    {s}
                  </label>
                ))}
              </div>
              {errors.companySize && <p className="intake-error">{errors.companySize}</p>}
            </div>
            <div className="intake-field">
              <label htmlFor="currentTools">Current tools <span className="optional">(optional)</span></label>
              <input id="currentTools" type="text" placeholder="e.g. Notion, Monday.com, custom CRM" value={form.currentTools} onChange={e => update('currentTools', e.target.value)} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="intake-step">
            <h2>Tell us about your problem</h2>
            <div className="intake-field">
              <label htmlFor="painPoint">What's your biggest pain point?</label>
              <textarea id="painPoint" aria-label="pain point" placeholder="e.g. We spend 20 hours/week on manual data entry and our team is burnt out…" value={form.painPoint} onChange={e => update('painPoint', e.target.value)} rows={4} />
              {errors.painPoint && <p className="intake-error">{errors.painPoint}</p>}
            </div>
            <div className="intake-field">
              <label htmlFor="alreadyTried">What have you already tried? <span className="optional">(optional)</span></label>
              <textarea id="alreadyTried" placeholder="e.g. We tried Zapier but it kept breaking…" value={form.alreadyTried} onChange={e => update('alreadyTried', e.target.value)} rows={3} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="intake-step">
            <h2>Project scope</h2>
            <div className="intake-field">
              <label>Budget range</label>
              <div className="radio-group">
                {BUDGETS.map(b => (
                  <label key={b} className="radio-option">
                    <input type="radio" name="budget" aria-label={b} value={b} checked={form.budget === b} onChange={() => update('budget', b)} />
                    {b}
                  </label>
                ))}
              </div>
              {errors.budget && <p className="intake-error">{errors.budget}</p>}
            </div>
            <div className="intake-field">
              <label>Timeline</label>
              <div className="radio-group">
                {TIMELINES.map(t => (
                  <label key={t} className="radio-option">
                    <input type="radio" name="timeline" aria-label={t} value={t} checked={form.timeline === t} onChange={() => update('timeline', t)} />
                    {t}
                  </label>
                ))}
              </div>
              {errors.timeline && <p className="intake-error">{errors.timeline}</p>}
            </div>
            <div className="intake-field">
              <label htmlFor="source">How did you hear about us? <span className="optional">(optional)</span></label>
              <select id="source" value={form.source} onChange={e => update('source', e.target.value)}>
                <option value="">Select…</option>
                {SOURCES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="intake-step">
            <h2>Your contact details</h2>
            <div className="intake-field">
              <label htmlFor="name">Full name</label>
              <input id="name" type="text" aria-label="Full name" value={form.name} onChange={e => update('name', e.target.value)} />
              {errors.name && <p className="intake-error">{errors.name}</p>}
            </div>
            <div className="intake-field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={e => update('email', e.target.value)} />
              {errors.email && <p className="intake-error">{errors.email}</p>}
            </div>
            <div className="intake-field">
              <label htmlFor="company">Company name</label>
              <input id="company" type="text" value={form.company} onChange={e => update('company', e.target.value)} />
              {errors.company && <p className="intake-error">{errors.company}</p>}
            </div>
            <div className="intake-field">
              <label htmlFor="phone">Phone / WhatsApp <span className="optional">(optional)</span></label>
              <input id="phone" type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} />
            </div>
            {submitError && <p className="intake-error submit-error">{submitError}</p>}
          </div>
        )}

        <div className="intake-actions">
          {step > 1 && <button type="button" className="btn-secondary" onClick={back}>Back</button>}
          {step < TOTAL_STEPS
            ? <button type="button" className="btn-primary" onClick={next} disabled={step === 1 && form.services.length === 0}>Next</button>
            : <button type="button" className="btn-primary" onClick={submit} disabled={submitting}>{submitting ? 'Sending…' : 'Submit Brief'}</button>
          }
        </div>
      </div>
    </main>
  )
}
