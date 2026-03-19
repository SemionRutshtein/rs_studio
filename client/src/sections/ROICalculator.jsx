import { useState, useEffect, useCallback } from 'react'
import './ROICalculator.css'

export default function ROICalculator() {
  const [team, setTeam] = useState(5)
  const [rate, setRate] = useState(80)
  const [hours, setHours] = useState(12)

  const [monthlyCost, setMonthlyCost] = useState(0)
  const [monthlySavings, setMonthlySavings] = useState(0)
  const [ratio, setRatio] = useState('0.0')

  const recalc = useCallback(() => {
    const t = parseInt(team) || 0
    const r = parseInt(rate) || 0
    const h = parseInt(hours) || 0

    const cost = t * r * h * 4.33
    const savings = cost * 0.80
    const roi = (savings / 1500).toFixed(1)

    setMonthlyCost(Math.round(cost))
    setMonthlySavings(Math.round(savings))
    setRatio(roi)
  }, [team, rate, hours])

  useEffect(() => {
    recalc()
  }, [recalc])

  return (
    <section className="roi-section" id="roi">
      <div className="watermark jetbrains">06</div>
      <div className="container relative">
        <div className="section-header reveal">
          <div className="section-label text-gold jetbrains">// CALCULATE YOUR ROI</div>
          <h2 className="section-title bebas">HOW MUCH IS MANUAL WORK COSTING YOU?</h2>
          <p className="section-sub text-muted">Rough estimate — no sign-up required. Takes 20 seconds.</p>
        </div>

        <div className="roi-widget">
          <div className="roi-group">
            <div className="roi-label">
              <span>Team size handling repetitive tasks</span>
              <span className="roi-value-display">{team} people</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={team}
              onChange={e => setTeam(e.target.value)}
            />
          </div>

          <div className="roi-group">
            <div className="roi-label">
              <span>Average hourly rate (₪)</span>
              <input
                type="number"
                value={rate}
                min="1"
                onChange={e => setRate(e.target.value)}
              />
            </div>
          </div>

          <div className="roi-group">
            <div className="roi-label">
              <span>Hours/week spent on manual tasks per person</span>
              <span className="roi-value-display">{hours} hours</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={hours}
              onChange={e => setHours(e.target.value)}
            />
          </div>

          <div className="roi-results">
            <div className="res-item">
              <span className="res-label">Current monthly cost of manual work:</span>
              <span className="res-value gold flash-text">₪{monthlyCost.toLocaleString()}</span>
            </div>
            <div className="res-item">
              <span className="res-label">Estimated savings with AI automation:</span>
              <span className="res-value red flash-text">₪{monthlySavings.toLocaleString()}</span>
            </div>
            <div className="res-item">
              <span className="res-label">Estimated monthly investment:</span>
              <span className="res-value" style={{ fontSize: '24px', marginTop: '10px' }}>from ₪1,500</span>
            </div>
            <div className="res-item">
              <span className="res-label">First year ROI:</span>
              <span className="res-value green flash-text">{ratio}x</span>
            </div>
          </div>

          <div className="roi-cta-wrap">
            <a href="#contact" className="btn-primary">Get a Custom ROI Analysis &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  )
}
