# RS Studio — Web App Rebuild Design Spec
**Date:** 2026-03-19
**Author:** Semion Rutshtein / Red Stone Dev Studio
**Status:** Approved

---

## Overview

Rebuild the current static `index.html` site into a Docker-deployable full-stack web app using React + Express. Keep all existing landing page content and sections, improve the visual design, and add a new client intake questionnaire system that collects structured data from potential clients and notifies the owner via email.

---

## Goals

1. Make the app Docker-deployable (VPS-ready, one-command startup)
2. Rebuild the landing page in React with component architecture
3. Add a `/intake` route with a 5-step client questionnaire
4. Email owner on every intake submission (no admin dashboard needed)

---

## Architecture

### Monorepo Structure

```
rs-studio/
├── client/                        # React + Vite frontend
│   ├── public/
│   │   └── videos/                # macbook-explode.mp4
│   ├── src/
│   │   ├── components/            # Shared UI (Navbar, Footer, Button, ProgressBar)
│   │   ├── sections/              # Landing page sections (one file each)
│   │   │   ├── Hero.jsx
│   │   │   ├── MacbookScroll.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Business.jsx
│   │   │   ├── Process.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── Cases.jsx
│   │   │   ├── TechStack.jsx
│   │   │   ├── ROICalculator.jsx
│   │   │   ├── FAQ.jsx
│   │   │   └── Contact.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Assembles all sections
│   │   │   └── Intake.jsx         # Multi-step form
│   │   ├── styles/
│   │   │   └── tokens.css         # CSS custom properties (design tokens)
│   │   └── App.jsx                # React Router setup
│   ├── Dockerfile
│   └── vite.config.js
│
├── server/                        # Express backend
│   ├── routes/
│   │   └── intake.js              # POST /api/intake
│   ├── services/
│   │   └── mailer.js              # Nodemailer email formatting + send
│   ├── middleware/
│   │   └── validate.js            # Basic input validation
│   ├── index.js
│   └── Dockerfile
│
├── nginx/
│   └── nginx.conf                 # Serves /client/dist, proxies /api → server:3001
│
├── docker-compose.yml
├── .env.example
└── .gitignore
```

### Services (Docker Compose)

| Service | Image | Port | Role |
|---------|-------|------|------|
| `client` | Nginx + React build | 80 / 443 | Serves static assets, proxies API |
| `server` | Node.js 20 Alpine | 3001 (internal) | Express API, email sending |

### Data Flow

```
User → Nginx (port 80)
  ├── /* → React SPA (static files)
  └── /api/* → Express server (port 3001, internal)
                └── POST /api/intake → Nodemailer → owner inbox
```

---

## Landing Page

### Design Direction

- Keep: dark theme, red/gold accent palette, Bebas Neue headings, all existing sections
- Improve: typography hierarchy, spacing rhythm, card designs, section transitions
- Keep GSAP for scroll animations and the MacBook video section
- Keep canvas particle system in hero

### Sections (in order)

1. **Hero** — headline, subheadline, particle canvas, two CTAs: "See Our Work" (scrolls) + "Start a Project" (→ `/intake`)
2. **MacbookScroll** — sticky 300vh GSAP video scrub (same as current)
3. **Services** — 6 cards: Agentic AI, Bots, Database, Web Dev, Integrations, Consulting
4. **Business** — startup vs enterprise split layout
5. **Process** — 4-step timeline with animated SVG connector
6. **Stats** — animated counters (IntersectionObserver)
7. **Cases** — 3 expandable deep-dive case studies with canvas animations
8. **TechStack** — dual-row horizontal marquee
9. **ROICalculator** — interactive Shekel-based savings calculator
10. **FAQ** — accordion
11. **Contact** — form + contact details, secondary CTA to `/intake`

### Color Palette (preserved)

```css
--bg-deep:    #0A0A0F
--bg-section: #0F0F16
--bg-card:    #13131C
--red-dark:   #C0392B
--red-bright: #E74C3C
--gold:       #F39C12
--text-primary: #F0EDE8
--text-muted:   #9B9A96
--border:       #2A2A35
```

---

## Client Intake System

### Route

`/intake` — standalone page, linked from Hero CTA and Contact section

### UX: 5-Step Multi-Step Form

Progress bar at top shows current step (1/5 → 5/5). Each step is a single screen. User can go Back. No step is skippable except Step 4 optional fields.

**Step 1 — Services**
- Heading: "What do you need help with?"
- Multi-select cards (can pick multiple):
  - Agentic AI Automation
  - Intelligent Bots (WhatsApp, Telegram, Web)
  - Database Architecture
  - Web Development
  - System Integrations
  - AI Consulting & Roadmap

**Step 2 — Your Business**
- Industry (dropdown): Restaurant & Cafe, Real Estate, E-Commerce, Law & Accounting, Healthcare, B2B Services, Other
- Company size (radio): Solo / 2–10 / 11–50 / 50+
- Current tools (text input, placeholder: "e.g. Notion, Monday.com, custom CRM")

**Step 3 — Your Problem**
- "What's your biggest pain point?" (textarea, placeholder: "e.g. We spend 20 hours/week on manual data entry and our team is burnt out...")
- "What have you already tried?" (textarea, optional)

**Step 4 — Scope**
- Budget range (radio):
  - Under $1,000
  - $1,000 – $5,000
  - $5,000 – $15,000
  - $15,000 – $50,000
  - $50,000+
- Timeline (radio): ASAP / 1–3 months / 3–6 months / No rush
- How did you hear about us? (dropdown): Google, LinkedIn, Referral, Social Media, Other

**Step 5 — Contact**
- Full name (required)
- Email (required)
- Company name (required)
- Phone / WhatsApp (optional)

**Success Screen**
- "We've received your brief. Semion will be in touch within 24 hours."
- Button: "Back to Home"

**Error States (client)**
- On 400/500 response: show inline error below the submit button — "Something went wrong. Please try again or email us directly at semion@redstonedev.online"
- Form stays on Step 5 (contact step), all fields preserved
- No automatic retry

**Navigation & Validation**
- Back button is always available from Step 2 onward; form state is preserved when going back
- Validation fires on "Next" click (not on blur)
- Required field errors appear inline below the field
- Step 1 requires at least one service selected before proceeding
- Steps 2–4: all non-optional fields required before Next
- Step 5: name, email (valid format), company required before Submit

**GSAP in React**
- All GSAP ScrollTrigger animations use `useEffect` with `useRef` for DOM targets
- ScrollTrigger instances are killed on component unmount (`return () => trigger.kill()`)
- MacbookScroll video uses `useRef` on the `<video>` element for GSAP scrubbing
- Particle canvas uses `useRef` on `<canvas>` element

### Email Notification

On submission, Express sends a formatted email to `RECIPIENT_EMAIL`:

```
Subject: New Client Intake — [Company Name] ([Service(s)])

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW CLIENT INTAKE SUBMISSION
Red Stone Dev Studio
Submitted: [timestamp]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT
Name:    [name]
Email:   [email]
Company: [company]
Phone:   [phone or "not provided"]

SERVICES REQUESTED
[list of selected services]

BUSINESS PROFILE
Industry:      [industry]
Company size:  [size]
Current tools: [tools]

THE PROBLEM
Pain point:
  [pain point text]

Already tried:
  [tried text or "not provided"]

PROJECT SCOPE
Budget:   [budget range]
Timeline: [timeline]
Source:   [how they heard]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## API

### `POST /api/intake`

**Request body:**
```json
{
  "services": ["Agentic AI Automation", "Intelligent Bots"],
  "industry": "E-Commerce",
  "companySize": "11–50",
  "currentTools": "Shopify, Notion, Slack",
  "painPoint": "We spend 20hrs/week on manual order handling",
  "alreadyTried": "Zapier automations",
  "budget": "$5,000 – $15,000",
  "timeline": "1–3 months",
  "source": "LinkedIn",
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Store",
  "phone": "+972501234567"
}
```

**Responses:**
- `200 OK` — email sent successfully
- `400 Bad Request` — validation error (missing required fields)
- `500 Internal Server Error` — email send failed

**Validation (server-side):**
- Required: `services` (non-empty array), `industry`, `companySize`, `painPoint`, `budget`, `timeline`, `name`, `email`, `company`
- `email` must be valid format

---

## Docker Setup

### `docker-compose.yml`

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
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - server
    restart: unless-stopped
```

### Nginx Config (key rule)

```nginx
location /api/ {
    proxy_pass http://server:3001;
}
location / {
    try_files $uri $uri/ /index.html;
}
```

### Email Provider

Nodemailer with Gmail SMTP. `EMAIL_PASS` must be a Gmail App Password (not account password — requires 2FA enabled on Google account).

### `.env.example`

```
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-gmail-app-password
RECIPIENT_EMAIL=semion@redstonedev.online
```

### Deployment (VPS)

```bash
git clone <repo>
cp .env.example .env
# fill in .env
docker-compose up -d --build
```

---

## Out of Scope (this phase)

- Admin dashboard / CRM for managing submissions
- Authentication / login
- Blog or CMS
- Payment processing
- Multi-language support
- Analytics integration

These can be added in future phases.

---

## Success Criteria

- [ ] `docker-compose up --build` starts the full app with no errors
- [ ] Landing page renders all sections with animations working
- [ ] `/intake` form completes all 5 steps and submits
- [ ] Owner receives formatted email on submission
- [ ] App is deployable to any VPS with Docker installed
- [ ] Mobile responsive (390px iPhone 16 viewport)
