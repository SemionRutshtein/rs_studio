export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a href="/" className="logo-container">
            <svg
              className="logo-svg"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="flg1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#EB6153" />
                  <stop offset="100%" stopColor="#A93226" />
                </linearGradient>
                <linearGradient id="flg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C0392B" />
                  <stop offset="100%" stopColor="#7B1D14" />
                </linearGradient>
                <linearGradient id="flg3" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F39C12" />
                  <stop offset="100%" stopColor="#FDEBD0" />
                </linearGradient>
              </defs>
              <polygon points="2,18 20,2 38,18" fill="url(#flg1)" opacity="0.9" />
              <polygon points="2,18 20,38 20,18" fill="url(#flg2)" />
              <polygon points="38,18 20,38 20,18" fill="#6E1A10" />
              <line x1="2" y1="18" x2="38" y2="18" stroke="rgba(255,255,255,0.09)" strokeWidth="0.6" />
              <line x1="20" y1="2" x2="20" y2="38" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
              <polygon points="20,2 26,11 14,11" fill="url(#flg3)" opacity="0.65" />
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
          </a>
          <div className="footer-tagline">We Turn Business Logic Into Intelligent Systems</div>
        </div>

        <div className="footer-grid">
          <div>
            <h4 className="footer-col-title">SERVICES</h4>
            <ul className="footer-links">
              <li><a href="#services">AI Automation</a></li>
              <li><a href="#services">Intelligent Bots</a></li>
              <li><a href="#services">Database Architecture</a></li>
              <li><a href="#services">Web Development</a></li>
              <li><a href="#services">Integrations</a></li>
              <li><a href="#services">AI Consulting</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">COMPANY</h4>
            <ul className="footer-links">
              <li><a href="#hero">About</a></li>
              <li><a href="#business">How It Works</a></li>
              <li><a href="#process">Our Process</a></li>
              <li><a href="#tech">Tech Stack</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">CONTACT</h4>
            <ul className="footer-links">
              <li><span>+972-058-679-9369</span></li>
              <li>
                <a
                  href="https://www.linkedin.com/in/semion-rutshtein-5091b31b0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li><span>Bat Yam, Israel</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="fb-left">
            &copy; 2026 Red Stone Dev Studio &middot; Semion Rutshtein &middot; All rights reserved
          </div>
          <div className="fb-right">
            Built with AI &middot; Deployed with Pride &middot; &#128308; Made in Israel
          </div>
        </div>
      </div>
    </footer>
  )
}
