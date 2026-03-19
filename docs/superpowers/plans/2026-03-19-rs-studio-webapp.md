# RS Studio Web App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the current static index.html site into a Docker-deployable React + Express monorepo with a 5-step client intake form that emails the owner on submission.

**Architecture:** Monorepo with `client/` (React + Vite) and `server/` (Express). Nginx container serves the React build on port 80 and proxies `/api/*` to the internal Express container on port 3001. All content from the existing `index.html` is ported to React components section-by-section.

**Tech Stack:** React 18, Vite 5, React Router 6, GSAP 3, Express 5, Nodemailer, Jest + Supertest (server), Vitest + React Testing Library (client), Docker + Docker Compose, Nginx.

**Reference spec:** `docs/superpowers/specs/2026-03-19-rs-studio-webapp-design.md`
**Reference source:** `index.html` (current static site — all content, colors, copy, animations)

---

## File Map

### New files to create

```
rs-studio/
├── client/
│   ├── public/
│   │   └── videos/                      # copy macbook-explode.mp4 here
│   ├── src/
│   │   ├── App.jsx                      # React Router: / and /intake routes
│   │   ├── main.jsx                     # ReactDOM.createRoot entry point
│   │   ├── styles/
│   │   │   └── tokens.css               # All CSS custom properties from index.html
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Sticky nav, hamburger, scrollspy
│   │   │   ├── Footer.jsx               # Footer with links + contact info
│   │   │   └── ProgressBar.jsx          # Step indicator for intake form
│   │   ├── sections/
│   │   │   ├── Hero.jsx                 # Canvas particles, word reveal, CTAs
│   │   │   ├── MacbookScroll.jsx        # GSAP ScrollTrigger video scrub
│   │   │   ├── Services.jsx             # 6 service cards
│   │   │   ├── Business.jsx             # Startup vs enterprise split
│   │   │   ├── Process.jsx              # 4-step timeline, animated SVG connector
│   │   │   ├── Stats.jsx                # Animated counters
│   │   │   ├── Cases.jsx                # 3 expandable case study panels
│   │   │   ├── TechStack.jsx            # Dual-row horizontal marquee
│   │   │   ├── ROICalculator.jsx        # Interactive Shekel savings calculator
│   │   │   ├── FAQ.jsx                  # Accordion
│   │   │   └── Contact.jsx              # Contact form + details
│   │   └── pages/
│   │       ├── Home.jsx                 # Assembles all sections in order
│   │       └── Intake.jsx               # 5-step multi-step form + success screen
│   ├── index.html                       # Vite HTML template
│   ├── vite.config.js                   # Proxy /api to localhost:3001 in dev
│   ├── package.json
│   └── Dockerfile                       # Build React, serve with Nginx
│
├── server/
│   ├── src/
│   │   ├── index.js                     # Express app, mounts routes
│   │   ├── routes/
│   │   │   └── intake.js                # POST /api/intake handler
│   │   ├── services/
│   │   │   └── mailer.js                # Nodemailer Gmail SMTP, formatEmail()
│   │   └── middleware/
│   │       └── validate.js              # validateIntake() middleware
│   ├── tests/
│   │   ├── validate.test.js             # Unit tests for validation
│   │   └── intake.test.js               # Integration tests for POST /api/intake
│   ├── package.json
│   ├── jest.config.js
│   └── Dockerfile                       # Node 20 Alpine
│
├── nginx/
│   └── nginx.conf                       # SPA fallback + /api proxy
│
├── docker-compose.yml
├── .env.example
└── .gitignore                           # update to add node_modules, dist, .env
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `docker-compose.yml`
- Create: `.env.example`
- Create: `nginx/nginx.conf`
- Create: `server/package.json`
- Create: `server/Dockerfile`
- Create: `client/package.json`
- Create: `client/Dockerfile`
- Create: `client/vite.config.js`
- Modify: `.gitignore`

- [ ] **Step 1: Create root `.gitignore` additions**

Add to existing `.gitignore`:
```
node_modules/
dist/
.env
client/node_modules/
server/node_modules/
```

- [ ] **Step 2: Create `.env.example`**

```
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-gmail-app-password
RECIPIENT_EMAIL=semion@redstonedev.online
```

- [ ] **Step 3: Create `docker-compose.yml`**

```yaml
version: '3.8'
services:
  server:
    build: ./server
    env_file: .env
    expose:
      - "3001"
    restart: unless-stopped

  client:
    build:
      context: .                  # repo root — so Dockerfile can access nginx/nginx.conf
      dockerfile: client/Dockerfile
    ports:
      - "80:80"
    depends_on:
      - server
    restart: unless-stopped
```

- [ ] **Step 4: Create `nginx/nginx.conf`**

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location /api/ {
        proxy_pass http://server:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets 1 year
    location ~* \.(js|css|png|jpg|mp4|svg|ico|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

- [ ] **Step 5: Create `server/package.json`**

```json
{
  "name": "rs-studio-server",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest --runInBand"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^5.0.0",
    "nodemailer": "^6.9.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^3.0.0",
    "supertest": "^7.0.0"
  }
}
```

- [ ] **Step 6: Create `server/Dockerfile`**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src/ ./src/
EXPOSE 3001
CMD ["node", "src/index.js"]
```

- [ ] **Step 7: Create `client/package.json`**

```json
{
  "name": "rs-studio-client",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "gsap": "^3.12.5",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.26.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "jsdom": "^25.0.0",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 8: Create `client/vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})
```

- [ ] **Step 9: Create `client/Dockerfile`**

```dockerfile
# Stage 1: build
# Note: build context is repo root (set in docker-compose.yml)
FROM node:20-alpine AS builder
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client/ .
RUN npm run build

# Stage 2: serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- [ ] **Step 10: Create `client/index.html`** (Vite entry template)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Red Stone Dev Studio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 11: Install server dependencies**

```bash
cd server && npm install
```

- [ ] **Step 12: Install client dependencies**

```bash
cd client && npm install
```

- [ ] **Step 13: Commit scaffold**

```bash
git add docker-compose.yml .env.example nginx/ server/package.json server/Dockerfile \
        client/package.json client/Dockerfile client/vite.config.js client/index.html .gitignore
git commit -m "feat: add monorepo scaffold with Docker, Nginx, client and server packages"
```

---

## Task 2: Express Server + Email API

**Files:**
- Create: `server/src/index.js`
- Create: `server/src/middleware/validate.js`
- Create: `server/src/services/mailer.js`
- Create: `server/src/routes/intake.js`
- Create: `server/jest.config.js`
- Create: `server/tests/validate.test.js`
- Create: `server/tests/intake.test.js`

- [ ] **Step 1: Create `server/jest.config.js`**

```js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js']
}
```

- [ ] **Step 2: Write failing validation tests**

Create `server/tests/validate.test.js`:
```js
const { validateIntake } = require('../src/middleware/validate')

function mockRes() {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

const validBody = {
  services: ['Agentic AI Automation'],
  industry: 'E-Commerce',
  companySize: '11–50',
  painPoint: 'We spend 20hrs/week on manual order handling',
  budget: '$5,000 – $15,000',
  timeline: '1–3 months',
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Acme Store'
}

describe('validateIntake', () => {
  test('passes with all required fields', () => {
    const req = { body: { ...validBody } }
    const res = mockRes()
    const next = jest.fn()
    validateIntake(req, res, next)
    expect(next).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
  })

  test('rejects when services is empty array', () => {
    const req = { body: { ...validBody, services: [] } }
    const res = mockRes()
    validateIntake(req, res, jest.fn())
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }))
  })

  test('rejects when required string field is missing', () => {
    const { name, ...bodyWithoutName } = validBody
    const req = { body: bodyWithoutName }
    const res = mockRes()
    validateIntake(req, res, jest.fn())
    expect(res.status).toHaveBeenCalledWith(400)
  })

  test('rejects invalid email format', () => {
    const req = { body: { ...validBody, email: 'not-an-email' } }
    const res = mockRes()
    validateIntake(req, res, jest.fn())
    expect(res.status).toHaveBeenCalledWith(400)
  })

  test('accepts optional fields as missing', () => {
    const req = { body: { ...validBody } } // no phone, alreadyTried, etc.
    const res = mockRes()
    const next = jest.fn()
    validateIntake(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
```

- [ ] **Step 3: Run tests — verify they fail**

```bash
cd server && npm test tests/validate.test.js
```
Expected: `Cannot find module '../src/middleware/validate'`

- [ ] **Step 4: Implement `server/src/middleware/validate.js`**

```js
const REQUIRED_STRINGS = ['industry', 'companySize', 'painPoint', 'budget', 'timeline', 'name', 'email', 'company']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateIntake(req, res, next) {
  const body = req.body

  if (!Array.isArray(body.services) || body.services.length === 0) {
    return res.status(400).json({ error: 'services must be a non-empty array' })
  }

  for (const field of REQUIRED_STRINGS) {
    if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
      return res.status(400).json({ error: `${field} is required` })
    }
  }

  if (!EMAIL_RE.test(body.email)) {
    return res.status(400).json({ error: 'email must be a valid email address' })
  }

  next()
}

module.exports = { validateIntake }
```

- [ ] **Step 5: Run validation tests — verify they pass**

```bash
cd server && npm test tests/validate.test.js
```
Expected: All 5 tests PASS

- [ ] **Step 6: Implement `server/src/services/mailer.js`**

```js
const nodemailer = require('nodemailer')

function createTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
}

function formatEmail(data) {
  const services = Array.isArray(data.services) ? data.services.join(', ') : data.services
  const line = '━'.repeat(32)

  return {
    subject: `New Client Intake — ${data.company} (${services})`,
    text: `
${line}
NEW CLIENT INTAKE SUBMISSION
Red Stone Dev Studio
Submitted: ${new Date().toISOString()}
${line}

CONTACT
Name:    ${data.name}
Email:   ${data.email}
Company: ${data.company}
Phone:   ${data.phone || 'not provided'}

SERVICES REQUESTED
${services}

BUSINESS PROFILE
Industry:      ${data.industry}
Company size:  ${data.companySize}
Current tools: ${data.currentTools || 'not provided'}

THE PROBLEM
Pain point:
  ${data.painPoint}

Already tried:
  ${data.alreadyTried || 'not provided'}

PROJECT SCOPE
Budget:   ${data.budget}
Timeline: ${data.timeline}
Source:   ${data.source || 'not provided'}
${line}
`.trim()
  }
}

async function sendIntakeEmail(data) {
  const transport = createTransport()
  const { subject, text } = formatEmail(data)
  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject,
    text
  })
}

module.exports = { sendIntakeEmail, formatEmail }
```

- [ ] **Step 7: Write failing intake route tests**

Create `server/tests/intake.test.js`:
```js
const request = require('supertest')
const express = require('express')

// Mock mailer before requiring the route
jest.mock('../src/services/mailer', () => ({
  sendIntakeEmail: jest.fn().mockResolvedValue(undefined)
}))

const { sendIntakeEmail } = require('../src/services/mailer')
const intakeRouter = require('../src/routes/intake')

function buildApp() {
  const app = express()
  app.use(express.json())
  app.use('/api/intake', intakeRouter)
  return app
}

const validPayload = {
  services: ['Agentic AI Automation'],
  industry: 'E-Commerce',
  companySize: '11–50',
  painPoint: 'We spend 20hrs/week on manual order handling',
  budget: '$5,000 – $15,000',
  timeline: '1–3 months',
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Acme Store'
}

describe('POST /api/intake', () => {
  beforeEach(() => jest.clearAllMocks())

  test('returns 200 and calls sendIntakeEmail with valid payload', async () => {
    const res = await request(buildApp()).post('/api/intake').send(validPayload)
    expect(res.status).toBe(200)
    expect(sendIntakeEmail).toHaveBeenCalledWith(expect.objectContaining({ name: 'John Doe' }))
  })

  test('returns 400 when services is empty', async () => {
    const res = await request(buildApp()).post('/api/intake').send({ ...validPayload, services: [] })
    expect(res.status).toBe(400)
    expect(sendIntakeEmail).not.toHaveBeenCalled()
  })

  test('returns 400 when required field is missing', async () => {
    const { name, ...payload } = validPayload
    const res = await request(buildApp()).post('/api/intake').send(payload)
    expect(res.status).toBe(400)
  })

  test('returns 500 when mailer throws', async () => {
    sendIntakeEmail.mockRejectedValueOnce(new Error('SMTP error'))
    const res = await request(buildApp()).post('/api/intake').send(validPayload)
    expect(res.status).toBe(500)
    expect(res.body).toMatchObject({ error: expect.any(String) })
  })
})
```

- [ ] **Step 8: Run intake tests — verify they fail**

```bash
cd server && npm test tests/intake.test.js
```
Expected: `Cannot find module '../src/routes/intake'`

- [ ] **Step 9: Implement `server/src/routes/intake.js`**

```js
const { Router } = require('express')
const { validateIntake } = require('../middleware/validate')
const { sendIntakeEmail } = require('../services/mailer')

const router = Router()

router.post('/', validateIntake, async (req, res) => {
  try {
    await sendIntakeEmail(req.body)
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Mailer error:', err)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

module.exports = router
```

- [ ] **Step 10: Implement `server/src/index.js`**

```js
const express = require('express')
const cors = require('cors')
const intakeRouter = require('./routes/intake')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/intake', intakeRouter)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
```

- [ ] **Step 11: Run all server tests — verify they pass**

```bash
cd server && npm test
```
Expected: All tests PASS (validate + intake)

- [ ] **Step 12: Commit server**

```bash
git add server/
git commit -m "feat: add Express server with intake validation, email service, and tests"
```

---

## Task 3: React App Shell + Design Tokens

**Files:**
- Create: `client/src/main.jsx`
- Create: `client/src/App.jsx`
- Create: `client/src/styles/tokens.css`
- Create: `client/src/components/Navbar.jsx`
- Create: `client/src/components/Footer.jsx`
- Create: `client/src/pages/Home.jsx` (shell only)
- Create: `client/src/pages/Intake.jsx` (shell only)

- [ ] **Step 1: Create `client/src/styles/tokens.css`**

Copy all CSS custom properties and global resets from `index.html`. This file is the single source of truth for all design tokens used across the React app.

```css
/* ─── Fonts ─────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:ital,wght@0,400;0,500;1,400&family=Nunito:wght@300;400;600;700&display=swap');

:root {
  --bg-deep:      #0A0A0F;
  --bg-section:   #0F0F16;
  --bg-card:      #13131C;
  --red-dark:     #C0392B;
  --red-bright:   #E74C3C;
  --gold:         #F39C12;
  --text-primary: #F0EDE8;
  --text-muted:   #9B9A96;
  --border:       #2A2A35;
  --glow-red:     rgba(231, 76, 60, 0.35);
  --glow-gold:    rgba(243, 156, 18, 0.25);

  --font-display: 'Bebas Neue', sans-serif;
  --font-body:    'Nunito', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg-deep);
  color: var(--text-primary);
  font-family: var(--font-body);
  line-height: 1.6;
  overflow-x: hidden;
}

a { color: inherit; text-decoration: none; }
img, video { max-width: 100%; display: block; }
```

- [ ] **Step 2: Create `client/src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/tokens.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 3: Create `client/src/App.jsx`**

```jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Intake from './pages/Intake'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intake" element={<Intake />} />
      </Routes>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Create `client/src/pages/Home.jsx`** (shell — sections added in Task 4)

```jsx
export default function Home() {
  return <main>{ /* sections will be added here */ }</main>
}
```

- [ ] **Step 5: Create `client/src/pages/Intake.jsx`** (shell — form added in Task 5)

```jsx
export default function Intake() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-muted)' }}>Intake form coming soon</p>
    </main>
  )
}
```

- [ ] **Step 6: Create `client/src/components/Navbar.jsx`**

Port the `<nav id="navbar">` from `index.html`. Key behaviours:
- Sticky after 80px scroll (`scrolled` class toggles `position: fixed`)
- Hamburger menu toggle on mobile
- Scrollspy: highlight active nav link based on current section in viewport
- Logo SVG inline (copy from `index.html`)
- Links: Home (scroll to #hero), Services (#services), Process (#process), Cases (#cases), Contact (#contact)
- CTA button: "Start a Project" → `<Link to="/intake">`

```jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Cases', href: '#cases' },
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
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection('#' + e.target.id) })
      },
      { threshold: 0.3 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <a href="/" className="nav-logo">
        {/* Paste logo SVG from index.html here */}
        <span>RS</span>
      </a>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(l => (
          <li key={l.href}>
            <a href={l.href} className={activeSection === l.href ? 'active' : ''}>
              {l.label}
            </a>
          </li>
        ))}
        <li><Link to="/intake" className="nav-cta">Start a Project</Link></li>
      </ul>
      <button
        className={`hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(m => !m)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
```

Add matching CSS (scoped in component or in tokens.css) — port navbar styles directly from `index.html`.

- [ ] **Step 7: Create `client/src/components/Footer.jsx`**

Port `<footer>` from `index.html`. Contains:
- Logo + tagline
- Nav links (Services, Process, Cases, Contact)
- Contact details (email, phone, address, LinkedIn)
- Copyright line

- [ ] **Step 8: Verify dev server starts**

```bash
cd client && npm run dev
```
Expected: Vite starts at http://localhost:5173, page shows with Navbar and "Intake form coming soon" placeholder.

- [ ] **Step 9: Commit app shell**

```bash
git add client/src/
git commit -m "feat: add React app shell with routing, design tokens, Navbar, Footer"
```

---

## Task 4: Landing Page Sections

**Note:** For each section, port the HTML structure and embedded CSS/JS from `index.html` into a React component. All copy (text, numbers, service names, case study content) must match exactly. GSAP animations use `useRef` + `useEffect` with cleanup on unmount.

### Task 4a: Hero + MacbookScroll

**Files:**
- Create: `client/src/sections/Hero.jsx`
- Create: `client/src/sections/MacbookScroll.jsx`

- [ ] **Step 1: Create `client/src/sections/Hero.jsx`**

Structure:
- `<section id="hero">` with canvas particle system
- Word-reveal animated headline (split text into `<span>` via JS)
- Subheadline and badges
- Two CTAs: `<a href="#services">See Our Work</a>` and `<Link to="/intake">Start a Project →</Link>`
- Canvas particle system via `useRef` + `useEffect` (port JS from `index.html`)
  - 90 particles on desktop, 40 on mobile (check `window.innerWidth < 768`)
  - Mouse parallax: attach `mousemove` listener, clean up on unmount

```jsx
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    // Port entire particle system init + animation loop from index.html
    // Return cleanup: cancelAnimationFrame + removeEventListener
  }, [])

  return (
    <section id="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      {/* Port all hero HTML from index.html */}
    </section>
  )
}
```

- [ ] **Step 2: Create `client/src/sections/MacbookScroll.jsx`**

Structure:
- `<section id="macbook-video-section">` with 300vh height
- Sticky inner container
- `<video>` element via `useRef`
- GSAP ScrollTrigger scrubbing in `useEffect`:

```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MacbookScroll() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    let trigger = null

    // iOS unlock on first user interaction
    const unlock = () => { video.play().then(() => video.pause()).catch(() => {}) }
    document.addEventListener('touchstart', unlock, { once: true })

    const onMeta = () => {
      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: self => {
          video.currentTime = self.progress * video.duration
        }
      })
    }
    video.addEventListener('loadedmetadata', onMeta)

    return () => {
      document.removeEventListener('touchstart', unlock)
      video.removeEventListener('loadedmetadata', onMeta)
      if (trigger) trigger.kill()
    }
  }, [])

  return (
    <section id="macbook-video-section" ref={sectionRef}>
      <div className="video-sticky">
        <video
          ref={videoRef}
          src="/videos/macbook-explode.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add both sections to `Home.jsx`**

```jsx
import Hero from '../sections/Hero'
import MacbookScroll from '../sections/MacbookScroll'

export default function Home() {
  return (
    <main>
      <Hero />
      <MacbookScroll />
    </main>
  )
}
```

- [ ] **Step 4: Copy video asset**

```bash
mkdir -p client/public/videos/
cp videos/macbook-explode.mp4 client/public/videos/
```

- [ ] **Step 5: Verify Hero and video scroll render**

```bash
cd client && npm run dev
```
Open http://localhost:5173. Verify particle canvas in hero, video scrubbing on scroll.

- [ ] **Step 6: Commit**

```bash
git add client/src/sections/Hero.jsx client/src/sections/MacbookScroll.jsx \
        client/src/pages/Home.jsx client/public/videos/
git commit -m "feat: add Hero and MacbookScroll sections with GSAP video scrub"
```

### Task 4b: Services + Business + Process

**Files:**
- Create: `client/src/sections/Services.jsx`
- Create: `client/src/sections/Business.jsx`
- Create: `client/src/sections/Process.jsx`

- [ ] **Step 1: Create `Services.jsx`**

Port `<section id="services">` from `index.html`. Contains:
- Section header with label + headline
- 6 service cards in a CSS grid, each with:
  - Icon (SVG inline), title, metric tag, description
  - "Most Popular" badge on card 1 (Agentic AI)
- Scroll-reveal class (use `IntersectionObserver` in a `useEffect` or a shared `useReveal` hook)

Services data (hardcode as array in the component):
```js
const SERVICES = [
  { icon: '…svg…', title: 'Agentic AI Automation', metric: '80% fewer admin hours', desc: '…', popular: true },
  { icon: '…svg…', title: 'Intelligent Bots', metric: '60% support load eliminated', desc: '…' },
  { icon: '…svg…', title: 'Database Architecture', metric: 'Millisecond query speeds', desc: '…' },
  { icon: '…svg…', title: 'High-Velocity Web Development', metric: 'Perfect Lighthouse scores', desc: '…' },
  { icon: '…svg…', title: 'System Integrations', metric: 'Zero silos', desc: '…' },
  { icon: '…svg…', title: 'AI Consulting & Roadmap', metric: 'Clear ROI in 30 days', desc: '…' },
]
```
Copy exact copy and SVG icons from `index.html`.

- [ ] **Step 2: Create `Business.jsx`**

Port `<section id="business">` — startup vs enterprise split grid. Copy HTML structure and all text exactly from `index.html`.

- [ ] **Step 3: Create `Process.jsx`**

Port `<section id="process">` — 4-step timeline. Includes animated SVG connector line driven by `IntersectionObserver` + scroll progress. Port the `timelineDraw` JS logic from `index.html` using `useEffect` + `useRef`.

- [ ] **Step 4: Add to `Home.jsx`**

```jsx
import Services from '../sections/Services'
import Business from '../sections/Business'
import Process from '../sections/Process'
// add after MacbookScroll
```

- [ ] **Step 5: Commit**

```bash
git add client/src/sections/Services.jsx client/src/sections/Business.jsx \
        client/src/sections/Process.jsx client/src/pages/Home.jsx
git commit -m "feat: add Services, Business, and Process sections"
```

### Task 4c: Stats + Cases + TechStack

**Files:**
- Create: `client/src/sections/Stats.jsx`
- Create: `client/src/sections/Cases.jsx`
- Create: `client/src/sections/TechStack.jsx`

- [ ] **Step 1: Create `Stats.jsx`**

Animated counters using `IntersectionObserver`. When section enters viewport, run `easeOutQuad` counter animation for each stat. Port counter animation function from `index.html`.

Stats data:
```js
const STATS = [
  { value: 50, suffix: '+', label: 'Automations Deployed' },
  { value: 80, suffix: '%', label: 'Avg Admin Time Saved' },
  { value: 24, suffix: '/7', label: 'Bot Uptime' },
  { value: 30, suffix: 'd', label: 'Avg Time to ROI' },
]
```

- [ ] **Step 2: Create `Cases.jsx`**

Port `<section id="cases">` — 3 expandable deep-dive panels. Each panel has:
- Toggle open/closed on header click (only one open at a time — manage with `useState`)
- Canvas animation inside each panel (port canvas drawing functions from `index.html` using `useRef` + `useEffect`)

Cases data (titles, metrics, descriptions — copy from `index.html`).

- [ ] **Step 3: Create `TechStack.jsx`**

Dual-row marquee. Port tech list and CSS marquee animation from `index.html`. The marquee is CSS `animation: marquee linear infinite` — no GSAP needed.

- [ ] **Step 4: Add to `Home.jsx`**, commit

```bash
git add client/src/sections/Stats.jsx client/src/sections/Cases.jsx \
        client/src/sections/TechStack.jsx client/src/pages/Home.jsx
git commit -m "feat: add Stats, Cases, and TechStack sections"
```

### Task 4d: ROICalculator + FAQ + Contact

**Files:**
- Create: `client/src/sections/ROICalculator.jsx`
- Create: `client/src/sections/FAQ.jsx`
- Create: `client/src/sections/Contact.jsx`

- [ ] **Step 1: Create `ROICalculator.jsx`**

Port the interactive Shekel-based ROI calculator. Use `useState` for the three slider values (team size, hourly rate, hours saved). Calculate and display live results. Copy formula and all labels from `index.html`.

- [ ] **Step 2: Create `FAQ.jsx`**

Accordion — use `useState` to track which item is open. Only one item open at a time. Port all Q&A content from `index.html`.

- [ ] **Step 3: Create `Contact.jsx`**

Port `<section id="contact">` — 2-column layout:
- Left: contact form (name, email, company, service interest, budget, message)
  - On submit: `preventDefault`, show success state (button text changes)
  - **Note:** this form is separate from the intake form — it's a simple "get in touch" form. For now, it shows a client-side success state (no API call). It will be wired to an API in a future phase.
- Right: contact details (email, phone, address, LinkedIn) + CTA: "Fill Out Full Brief" → `<Link to="/intake">`

- [ ] **Step 4: Add all to `Home.jsx`** — complete home page assembly

```jsx
import Hero from '../sections/Hero'
import MacbookScroll from '../sections/MacbookScroll'
import Services from '../sections/Services'
import Business from '../sections/Business'
import Process from '../sections/Process'
import Stats from '../sections/Stats'
import Cases from '../sections/Cases'
import TechStack from '../sections/TechStack'
import ROICalculator from '../sections/ROICalculator'
import FAQ from '../sections/FAQ'
import Contact from '../sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <MacbookScroll />
      <Services />
      <Business />
      <Process />
      <Stats />
      <Cases />
      <TechStack />
      <ROICalculator />
      <FAQ />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 5: Verify full landing page**

```bash
cd client && npm run dev
```
Scroll through all sections. Verify animations, counters, marquee, accordion, ROI calculator.

- [ ] **Step 6: Commit**

```bash
git add client/src/sections/ROICalculator.jsx client/src/sections/FAQ.jsx \
        client/src/sections/Contact.jsx client/src/pages/Home.jsx
git commit -m "feat: add ROICalculator, FAQ, Contact — landing page complete"
```

---

## Task 5: Intake Form

**Files:**
- Create: `client/src/components/ProgressBar.jsx`
- Modify: `client/src/pages/Intake.jsx`
- Create: `client/src/tests/Intake.test.jsx`

- [ ] **Step 1: Add Vitest config and setup file BEFORE writing tests**

Update `client/vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { '/api': 'http://localhost:3001' }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
  }
})
```

Create `client/src/tests/setup.js`:
```js
import '@testing-library/jest-dom'
```

- [ ] **Step 2: Create `client/src/components/ProgressBar.jsx`**

```jsx
export default function ProgressBar({ current, total }) {
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`progress-step${i < current ? ' completed' : ''}${i === current - 1 ? ' active' : ''}`}
        />
      ))}
      <span className="progress-label">{current} / {total}</span>
    </div>
  )
}
```

- [ ] **Step 3: Write failing intake form tests**

Create `client/src/tests/Intake.test.jsx`:
```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import Intake from '../pages/Intake'

// Mock fetch
global.fetch = vi.fn()

function renderIntake() {
  return render(<MemoryRouter><Intake /></MemoryRouter>)
}

describe('Intake form', () => {
  beforeEach(() => vi.clearAllMocks())

  test('renders Step 1 on load', () => {
    renderIntake()
    expect(screen.getByText(/what do you need help with/i)).toBeInTheDocument()
  })

  test('Next button disabled until at least one service selected', () => {
    renderIntake()
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
  })

  test('advances to Step 2 after selecting a service', async () => {
    renderIntake()
    await userEvent.click(screen.getByText('Agentic AI Automation'))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText(/tell us about your business/i)).toBeInTheDocument()
  })

  test('Back button returns to previous step with state preserved', async () => {
    renderIntake()
    await userEvent.click(screen.getByText('Agentic AI Automation'))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    await userEvent.click(screen.getByRole('button', { name: /back/i }))
    // Service card should still appear selected
    expect(screen.getByText('Agentic AI Automation').closest('[data-selected]')).toBeTruthy()
  })

  test('shows validation error on Step 5 when email is invalid', async () => {
    // Navigate to step 5 by filling all previous steps
    renderIntake()
    // Step 1
    await userEvent.click(screen.getByText('Web Development'))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 2
    await userEvent.selectOptions(screen.getByLabelText(/industry/i), 'E-Commerce')
    await userEvent.click(screen.getByLabelText('11–50'))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 3
    await userEvent.type(screen.getByLabelText(/pain point/i), 'Too much manual work')
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 4
    await userEvent.click(screen.getByLabelText(/\$5,000/i))
    await userEvent.click(screen.getByLabelText(/1–3 months/i))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 5
    await userEvent.type(screen.getByLabelText(/full name/i), 'John')
    await userEvent.type(screen.getByLabelText(/email/i), 'not-an-email')
    await userEvent.type(screen.getByLabelText(/company/i), 'Acme')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(screen.getByText(/valid email/i)).toBeInTheDocument()
  })

  async function fillAndSubmit() {
    renderIntake()
    // Step 1
    await userEvent.click(screen.getByText('Web Development'))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 2
    await userEvent.selectOptions(screen.getByLabelText(/industry/i), 'E-Commerce')
    await userEvent.click(screen.getByLabelText('11–50'))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 3
    await userEvent.type(screen.getByLabelText(/pain point/i), 'Too much manual work')
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 4
    await userEvent.click(screen.getByLabelText(/\$5,000/i))
    await userEvent.click(screen.getByLabelText(/1–3 months/i))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    // Step 5
    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/company/i), 'Acme')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  }

  test('shows success screen after successful submit', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) })
    await fillAndSubmit()
    await waitFor(() => {
      expect(screen.getByText(/brief received/i)).toBeInTheDocument()
      expect(screen.getByText(/semion will be in touch/i)).toBeInTheDocument()
    })
  })

  test('shows error message when API returns 500', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 500 })
    await fillAndSubmit()
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
      // Form stays on Step 5 — contact fields still visible
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 4: Run tests — verify they fail**

```bash
cd client && npm test
```
Expected: Tests fail (Intake is a placeholder)

- [ ] **Step 5: Implement `client/src/pages/Intake.jsx`**

Full multi-step form implementation:

```jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'

const SERVICES = [
  'Agentic AI Automation',
  'Intelligent Bots (WhatsApp, Telegram, Web)',
  'Database Architecture',
  'Web Development',
  'System Integrations',
  'AI Consulting & Roadmap',
]

const INDUSTRIES = ['Restaurant & Cafe', 'Real Estate', 'E-Commerce', 'Law & Accounting', 'Healthcare', 'B2B Services', 'Other']
const BUDGETS = ['Under $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+']
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
```

- [ ] **Step 6: Run intake tests — verify they pass**

```bash
cd client && npm test
```
Expected: All tests PASS

- [ ] **Step 7: Verify intake form manually (run dev server)**

```bash
cd client && npm run dev
```
Navigate to http://localhost:5173/intake. Complete all 5 steps. Verify validation, back navigation, and step transitions.

- [ ] **Step 8: Commit intake form**

```bash
git add client/src/pages/Intake.jsx client/src/components/ProgressBar.jsx \
        client/src/tests/ client/vite.config.js
git commit -m "feat: add 5-step intake form with validation, error states, and tests"
```

**Note on running tests (Task 6, Step 7):** Server tests (`cd server && npm test`) run locally against a local `node_modules` install — not inside the Docker container (which has `--only=production` and no devDependencies). Always run tests locally, not inside the container.

---

## Task 6: Docker Integration + Final Verification

**Files:**
- Verify: `docker-compose.yml`
- Verify: `client/Dockerfile`
- Verify: `server/Dockerfile`

- [ ] **Step 1: Copy `.env.example` to `.env` and fill in credentials**

```bash
cp .env.example .env
```

Edit `.env` with real Gmail credentials:
- `EMAIL_USER`: your Gmail address
- `EMAIL_PASS`: Gmail App Password (Settings → Security → 2-Step Verification → App passwords)
- `RECIPIENT_EMAIL`: email where you want to receive intake submissions

- [ ] **Step 2: Build and start Docker Compose**

```bash
docker-compose up --build
```
Expected: both `client` and `server` containers start without errors.

- [ ] **Step 3: Verify landing page at http://localhost**

Open http://localhost. Verify:
- All landing sections render
- Particle animation in hero works
- GSAP video scroll works
- Counters animate
- Marquee scrolls

- [ ] **Step 4: Verify `/intake` page**

Navigate to http://localhost/intake. Complete all 5 steps with valid data. Click Submit.
Expected: success screen appears, email arrives at `RECIPIENT_EMAIL`.

- [ ] **Step 5: Verify React Router direct navigation**

Navigate directly to http://localhost/intake (hard refresh).
Expected: page loads correctly (Nginx `try_files` handles SPA routing).

- [ ] **Step 6: Verify API health endpoint**

```bash
curl http://localhost/api/health
```
Expected: `{"ok":true}`

- [ ] **Step 7: Run all tests one final time**

```bash
cd server && npm test
cd ../client && npm test
```
Expected: All pass.

- [ ] **Step 8: Final commit**

```bash
git add .
git commit -m "feat: complete RS Studio web app — React + Express + Docker

- Landing page rebuilt in React with all sections and GSAP animations
- 5-step client intake form with validation and email notification
- Docker Compose: Nginx (client) + Node (server)
- All tests passing"
```

---

## Running Locally (Development)

```bash
# Terminal 1 — server
cd server && npm run dev

# Terminal 2 — client (proxies /api to localhost:3001)
cd client && npm run dev
```

## Running in Docker (Production)

```bash
cp .env.example .env  # fill in credentials
docker-compose up -d --build
# App available at http://localhost
```

## VPS Deployment

```bash
ssh user@your-vps
git clone <repo>
cd rs-studio
cp .env.example .env  # fill in credentials
docker-compose up -d --build
```
Point your domain DNS A record to the VPS IP. Done.
