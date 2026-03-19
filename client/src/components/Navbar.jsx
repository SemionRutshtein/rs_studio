import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'For Business', href: '#business' },
  { label: 'How It Works', href: '#process' },
  { label: 'Tech', href: '#tech' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href)).filter(Boolean)
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection('#' + e.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo-container">
          <svg
            className="logo-svg"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="nlg1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#EB6153" />
                <stop offset="100%" stopColor="#A93226" />
              </linearGradient>
              <linearGradient id="nlg2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C0392B" />
                <stop offset="100%" stopColor="#7B1D14" />
              </linearGradient>
              <linearGradient id="nlg3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F39C12" />
                <stop offset="100%" stopColor="#FDEBD0" />
              </linearGradient>
            </defs>
            <polygon points="2,18 20,2 38,18" fill="url(#nlg1)" opacity="0.9" />
            <polygon points="2,18 20,38 20,18" fill="url(#nlg2)" />
            <polygon points="38,18 20,38 20,18" fill="#6E1A10" />
            <line x1="2" y1="18" x2="38" y2="18" stroke="rgba(255,255,255,0.09)" strokeWidth="0.6" />
            <line x1="20" y1="2" x2="20" y2="38" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
            <polygon points="20,2 26,11 14,11" fill="url(#nlg3)" opacity="0.65" />
            <polygon points="20,11 26,16 20,21 14,16" fill="#F39C12" />
            <polygon points="20,11 26,16 20,16 14,16" fill="#FDEBD0" opacity="0.45" />
            <polygon
              className="logo-ring-a"
              points="20,2 38,18 20,38 2,18"
              stroke="#E74C3C"
              strokeWidth="1.5"
              fill="none"
            />
            <polygon
              className="logo-ring-b"
              points="20,2 38,18 20,38 2,18"
              stroke="rgba(243,156,18,0.55)"
              strokeWidth="0.8"
              fill="none"
            />
          </svg>
          <div className="logo-text-group">
            <span className="logo-main space-between">
              <span>RED STONE</span>
            </span>
            <span className="logo-sub">DEV STUDIO</span>
          </div>
        </Link>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="nav-links">
          {NAV_LINKS.map((l, i) => (
            <li key={l.href} style={{ '--delay': `${(i + 1) * 80}ms` }}>
              <a
                href={l.href}
                className={activeSection === l.href ? 'active' : ''}
                onClick={closeMenu}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li style={{ '--delay': `${(NAV_LINKS.length + 1) * 80}ms` }}>
            <Link
              to="/intake"
              className="btn-primary"
              style={{ padding: '10px 24px', animation: 'none' }}
              onClick={closeMenu}
            >
              Start a Project &rarr;
            </Link>
          </li>
        </ul>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          id="hamburger"
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
