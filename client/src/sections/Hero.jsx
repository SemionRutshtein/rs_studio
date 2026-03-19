import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)
  const heroRef = useRef(null)

  // Trigger word-reveal animation on mount
  useEffect(() => {
    const words = heroRef.current?.querySelectorAll('.hero-word')
    // Small delay so the browser paints first
    const t = setTimeout(() => {
      words.forEach(span => span.classList.add('visible'))
    }, 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width, height
    let particles = []
    let mouse = { x: -1000, y: -1000 }
    let rafId = null

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)
    resize()

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = -(Math.random() * 0.4 + 0.2)
        this.size = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.2
        this.color = Math.random() > 0.5 ? '#E74C3C' : '#F39C12'
        this.baseX = this.x
        this.baseY = this.y
      }

      update() {
        this.baseX += this.vx
        this.baseY += this.vy

        const dx = mouse.x - this.baseX
        const dy = mouse.y - this.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 300) {
          this.x = this.baseX + dx * 0.008
          this.y = this.baseY + dy * 0.008
        } else {
          this.x += (this.baseX - this.x) * 0.1
          this.y += (this.baseY - this.y) * 0.1
        }

        if (this.baseY < -10) {
          this.baseY = height + 10
          this.baseX = Math.random() * width
        }
        if (this.baseX < -10) this.baseX = width + 10
        if (this.baseX > width + 10) this.baseX = -10
      }

      draw() {
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particleCount = window.innerWidth < 768 ? 40 : 90
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(192, 57, 43, ${1 - dist / 130})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      rafId = requestAnimationFrame(animateCanvas)
    }

    animateCanvas()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Word-reveal: split into spans with staggered transition-delay
  const headline = 'WE BUILD INTELLIGENT SYSTEMS THAT WORK WHILE YOU SLEEP'
  const words = headline.split(' ')

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <canvas ref={canvasRef} id="hero-canvas" />
      <div className="hero-radial-glow" />

      <div className="hero-content">
        <div className="hero-eyebrow text-gold jetbrains">
          // BAT YAM, ISRAEL &middot; WORLDWIDE CLIENTS &middot; EST. 2020
        </div>

        <h1 className="hero-title bebas">
          {words.map((word, i) => (
            <span
              key={i}
              className="hero-word"
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              {word}
              {i < words.length - 1 ? '\u00a0' : ''}
            </span>
          ))}
        </h1>

        <p className="hero-sub text-muted">
          Red Stone Dev Studio delivers agentic AI automation, intelligent bots, and production-grade
          software for businesses that want to lead—not follow. Fixed prices. Live in weeks. ROI you
          can measure.
        </p>

        <div className="hero-ctas">
          <a href="#services" className="btn-primary">See Our Work</a>
          <Link to="/intake" className="btn-secondary">Start a Project &rarr;</Link>
        </div>
      </div>

      <div className="hero-badges">
        <div className="hero-badge-btm jetbrains text-muted">
          &varhex; Semion Rutshtein &middot; Founder &amp; Lead Architect
        </div>
        <div className="hero-badge-btm jetbrains text-muted">
          &#128205; Bat Yam, Israel &middot; Serving Global Clients
        </div>
      </div>

      <div className="scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  )
}
