# 🔴 Red Stone Studio — Official Website

<div align="center">

![Red Stone Studio](https://img.shields.io/badge/Red%20Stone%20Studio-AI%20%26%20Tech-C0392B?style=for-the-badge&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/Dependencies-Zero-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)

**Production-ready studio landing page for Red Stone Studio — Bat Yam, Israel**

*AI Automation · Intelligent Bots · Database Architecture · Web Development*

[🌐 Live Demo](#) · [📞 Contact](#contact) · [💼 LinkedIn](https://www.linkedin.com/in/semion-rutshtein-5091b31b0)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [About Red Stone Studio](#-about-red-stone-studio)
- [Features](#-features)
- [Animations & Interactions](#-animations--interactions)
- [Page Sections](#-page-sections)
- [Tech Stack (Site)](#-tech-stack-site)
- [Services Covered](#-services-covered)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Performance](#-performance)
- [Browser Support](#-browser-support)
- [Roadmap](#-roadmap)
- [Contact](#-contact)
- [License](#-license)

---

## 🧠 Overview

This is the official website for **Red Stone Studio**, a technology consultancy based in Bat Yam, Israel, led by founder and lead architect **Semion Rutshtein**. The studio specializes in AI automation systems, intelligent bots, database architecture, and full-stack web development — serving both small businesses and large enterprise clients, including banking and finance organizations.

The site was generated using a carefully crafted AI prompt executed via **Claude CLI** and **antigravity**, resulting in a fully handcrafted-quality, single-file HTML page with zero external dependencies beyond Google Fonts.

> **Goal:** Make any visitor immediately think — *"These people know what they're doing. I want to hire them."*

---

## 🏢 About Red Stone Studio

| | |
|---|---|
| **Studio** | Red Stone Studio |
| **Founder** | Semion Rutshtein |
| **Role** | Founder & Lead Solutions Architect |
| **Location** | Bat Yam, Tel Aviv Area, Israel |
| **Phone** | +972-058-679-9369 |
| **LinkedIn** | [semion-rutshtein-5091b31b0](https://www.linkedin.com/in/semion-rutshtein-5091b31b0) |
| **Serving** | Local Israeli clients + International |
| **Languages** | Hebrew · English · Ukrainian · Russian |

### What We Do

Red Stone Studio delivers end-to-end technology solutions at the intersection of AI and enterprise software engineering:

- **AI Automation** — intelligent pipelines that eliminate manual work using n8n, Zapier, Python, and custom LLM workflows
- **Intelligent Bots** — customer support, sales, HR, and voice agents built on Claude AI and OpenAI with full CRM integration
- **Database Architecture** — MongoDB, PostgreSQL, Redis, Apache Kafka; from schema design to cloud deployment
- **Web Development** — modern React / Next.js / Node.js applications, dashboards, and internal tools
- **System Integrations** — connecting ERP, CRM, banking systems, payment gateways via REST, GraphQL, and MCP protocols
- **AI Consulting** — workflow audits, automation opportunity mapping, ROI-backed AI roadmaps

### Core Expertise

```
Backend:     Java · Spring Boot · Apache Kafka · Python · Node.js · FastAPI
Frontend:    React · Next.js · TypeScript · Tailwind CSS
Databases:   MongoDB · PostgreSQL · Redis · Qdrant (vector DB)
Cloud:       AWS · Docker · Kubernetes · Tailscale
AI/LLM:      Claude AI · OpenAI · LangChain · n8n · Zapier · MCP
Finance:     Banking microservices · Kafka event streams · compliance-aware systems
```

---

## ✨ Features

### 🎨 Design
- **"Volcanic Intelligence"** aesthetic — deep charcoal black with ember red and warm gold accents
- Cohesive dark theme with CSS noise grain overlay for texture depth
- Red ember glow pockets behind key sections for atmospheric depth
- Distinctive typography: **Bebas Neue** headlines + **Nunito** body + **JetBrains Mono** code labels
- Fully custom SVG illustrations — no stock images, no external image assets
- Section number watermarks — huge faint red numerals behind section headers

### 🧩 Structure
- **Single file** — 100% self-contained `index.html`, zero build step
- **Zero JavaScript frameworks** — pure vanilla JS
- **Zero CSS preprocessors** — pure CSS with custom properties
- Google Fonts only external dependency (loaded via `<link>`)
- Semantic HTML5 throughout (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Full ARIA labeling on interactive elements

### 📱 Responsive
- Works perfectly from **320px** (small mobile) to **2560px** (4K desktop)
- Mobile-first media queries
- Hamburger menu on mobile with full-screen overlay nav
- All grid layouts collapse gracefully at breakpoints

---

## 🎬 Animations & Interactions

| # | Animation | Description |
|---|-----------|-------------|
| 1 | **Particle Canvas** | ~80 ember dots drifting upward, connecting with red lines when within 120px. Mouse parallax shifts particles toward cursor. |
| 2 | **Word Reveal** | Hero headline words animate in one by one — opacity 0→1, translateY 20px→0, 80ms stagger |
| 3 | **Scroll Reveal** | All sections fade + slide up via `IntersectionObserver`. 0.6s ease. |
| 4 | **Staggered Cards** | Service cards appear with 120ms delay between each on scroll entry |
| 5 | **Navbar Transform** | Transparent → dark + `backdrop-filter: blur(16px)` + red bottom border after 80px scroll |
| 6 | **Scrollspy** | Active nav link gets red underline as user scrolls through sections |
| 7 | **Counter Animation** | Stats count up from 0 on viewport entry, 1.5s eased duration |
| 8 | **Marquee Strip** | Two-row infinite CSS keyframe tech badges — opposite scroll directions. Pauses on hover. |
| 9 | **Timeline Draw** | Process step connector line animates left-to-right on scroll |
| 10 | **SVG Network Diagram** | Enterprise section: nodes (CRM, ERP, Kafka, AI, DB, Bot) with lines that draw on scroll via `stroke-dashoffset` |
| 11 | **Fake Dashboard** | Small business section: CSS skeleton blocks that "load in" sequentially, chat bubbles appear in loop |
| 12 | **Card Hover Glow** | `box-shadow: 0 0 24px rgba(231,76,60,0.5)` + `translateY(-6px)` + red border on hover |
| 13 | **Button Pulse** | Primary CTA has pulsing glow box-shadow CSS keyframe animation |
| 14 | **Accordion** | FAQ: `max-height` transition, arrow SVG rotates 180° on open |
| 15 | **Form Success State** | Submit button morphs to green ✓ with "Message Sent!" text animation |
| 16 | **Cursor Glow** | JS `mousemove` tracks cursor, radial red gradient overlay follows at 8% opacity |
| 17 | **Mobile Menu** | Full-screen dark overlay, links slide in from right with staggered delay, hamburger → X morph |
| 18 | **Smooth Scroll** | CSS `scroll-behavior: smooth` + JS override for sticky nav offset compensation |

> All animations use only `transform` and `opacity` — GPU-composited for consistent **60fps**.

---

## 📄 Page Sections

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR — sticky, transparent → dark on scroll      │
├─────────────────────────────────────────────────────┤
│  1. HERO — particle canvas, word reveal, CTAs        │
├─────────────────────────────────────────────────────┤
│  2. SERVICES — 6 cards, staggered grid              │
├─────────────────────────────────────────────────────┤
│  3. AI FOR BUSINESS                                  │
│     ├── Small Business (dashboard mockup)           │
│     └── Enterprise / Finance (SVG network)          │
├─────────────────────────────────────────────────────┤
│  4. HOW IT WORKS — 4-step animated timeline         │
├─────────────────────────────────────────────────────┤
│  5. STATS — 4 animated counters                     │
├─────────────────────────────────────────────────────┤
│  6. TECH STACK — infinite dual marquee              │
├─────────────────────────────────────────────────────┤
│  7. FAQ — smooth accordion (6 questions)            │
├─────────────────────────────────────────────────────┤
│  8. CONTACT — form + details                        │
├─────────────────────────────────────────────────────┤
│  FOOTER — links, copyright, tagline                 │
└─────────────────────────────────────────────────────┘
```

### Section Details

#### Hero
Full-viewport section with live canvas particle system. Animated headline reveal, two CTAs, founder badge, and location badge. Scroll indicator arrow bounces at bottom.

#### Services (6 cards)
- 🤖 AI Automation
- 💬 Intelligent Bots
- 🗄️ Database Architecture
- 🌐 Web Development
- 🔗 System Integrations
- 🧠 AI Consulting

#### AI For Business
Two alternating split sections — one targeting small businesses (starting from ₪1,500/month) and one for enterprise and banking clients (custom pricing, NDA available). Each with animated visual and scrolling benefit checklist.

#### How It Works
Four-step client journey:
1. **Discovery Call** (free) — workflow mapping
2. **Audit & Architecture** — technical plan + budget
3. **Build & Integrate** — iterative dev, weekly demos
4. **Deploy & Optimize** — go-live + 30-day hypercare

#### Stats
`80%` workflow automation · `3×` ROI in 6 months · `200+` automations shipped · `24/7` uptime

#### FAQ (6 Questions)
Covers implementation timelines, banking data security, existing software compatibility, pricing, Hebrew language support, and post-launch support policy.

---

## 🛠️ Tech Stack (Site)

The website itself is built with:

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic structure, accessibility |
| **CSS3** | Custom properties, Grid, Flexbox, keyframe animations, backdrop-filter |
| **Vanilla JavaScript** | Canvas API, IntersectionObserver, scroll events, form handling |
| **Google Fonts** | Bebas Neue, Nunito, JetBrains Mono |
| **SVG** | Inline icons, network diagram, logo |
| **Canvas API** | Particle system in hero background |

**No React. No Vue. No jQuery. No webpack. No npm. Just open and run.**

---

## 💼 Services Covered

The website showcases and sells the following Red Stone Studio capabilities:

### AI Automation
Workflow automation using **n8n**, **Zapier**, **Python**, and custom LLM pipelines. Handles invoicing, data processing, reporting, and cross-system sync. Average manual work reduction: **80%**.

### Intelligent Bots
Customer support bots, sales assistants, internal HR bots, voice agents. Built on **Claude AI** and **OpenAI**. Full CRM integration, 24/7 availability, multilingual (Hebrew, English, Ukrainian, Russian).

### Database Architecture
Design and deployment of **MongoDB**, **PostgreSQL**, **Redis**, **Apache Kafka** event streams. From schema design to production deployment on **AWS**.

### Web Development
Modern applications with **React**, **Next.js**, **Node.js**. Landing pages, complex dashboards, internal tooling — pixel-perfect, performance-optimized, production-ready.

### System Integrations
ERP, CRM, banking systems, payment gateways connected via **REST**, **GraphQL**, **MCP protocols**. No silo stays disconnected.

### AI Consulting
Business workflow audits, automation opportunity identification, concrete AI roadmaps with ROI projections. Specialized experience in **banking and finance** compliance environments.

---

## 🚀 Getting Started

### Option 1: Open Directly
No installation required. Just open the file in any browser:

```bash
# Clone the repository
git clone https://github.com/yourusername/redstone-studio-website.git

# Navigate to the project
cd redstone-studio-website

# Open in browser (macOS)
open index.html

# Open in browser (Linux)
xdg-open index.html

# Open in browser (Windows)
start index.html
```

### Option 2: Local Dev Server (recommended for testing)

```bash
# Using Python
python3 -m http.server 3000

# Using Node.js (npx)
npx serve .

# Using PHP
php -S localhost:3000
```

Then open `http://localhost:3000` in your browser.

### Option 3: Deploy to Production

```bash
# Netlify (drag & drop the index.html)
# Vercel
npx vercel deploy index.html

# GitHub Pages
# Push to main branch, enable Pages in repo settings → root folder

# AWS S3 Static Site
aws s3 cp index.html s3://your-bucket-name/ --acl public-read
```

---

## 📁 Project Structure

```
redstone-studio-website/
│
├── index.html          # ← THE ENTIRE WEBSITE (HTML + CSS + JS inline)
├── README.md           # ← This file
├── LICENSE             # MIT License
│
└── assets/             # Optional: extracted assets for maintainability
    ├── favicon.ico
    └── og-image.png    # Open Graph preview image (for social sharing)
```

> The site is intentionally a single file for maximum portability and zero-config deployment. If the project grows, CSS and JS can be extracted into separate files without any functional change.

---

## 🎨 Design System

### Color Palette

```css
--color-bg:           #0A0A0F;   /* Deep charcoal black — main background */
--color-bg-section:   #0F0F16;   /* Slightly lighter for alternating sections */
--color-accent-red:   #C0392B;   /* Deep crimson — primary brand color */
--color-accent-red-2: #E74C3C;   /* Bright ember red — hover states, glows */
--color-accent-gold:  #F39C12;   /* Warm gold — icons, highlights, badges */
--color-text:         #F0EDE8;   /* Near-white — primary text */
--color-text-muted:   #9B9A96;   /* Muted grey — secondary text */
--color-border:       #2A2A35;   /* Subtle dark border */
--color-card:         #13131C;   /* Card backgrounds */
```

### Typography

| Role | Font | Weight | Use |
|------|------|--------|-----|
| Display Headlines | Bebas Neue | 400 | Hero, section titles |
| Body Text | Nunito | 300–700 | Paragraphs, descriptions |
| Code / Tech Labels | JetBrains Mono | 400 | Tech badges, code snippets |

### Spacing Scale
Based on an 8px base unit: `8 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

### Border Radius
Sharp and minimal — `4px` for cards, `2px` for buttons. Intentionally not round.

---

## ⚡ Performance

| Metric | Target |
|--------|--------|
| **LCP** (Largest Contentful Paint) | < 1.5s |
| **FID** (First Input Delay) | < 50ms |
| **CLS** (Cumulative Layout Shift) | < 0.05 |
| **Animation FPS** | 60fps (GPU-composited only) |
| **File Size** | < 150KB (single HTML) |
| **External Requests** | 1 (Google Fonts) |

**Why it's fast:**
- Zero JavaScript frameworks
- All animations use only `transform` and `opacity` (no layout thrashing)
- IntersectionObserver for scroll effects (no scroll event listeners)
- Canvas particle system uses `requestAnimationFrame`
- No render-blocking resources

---

## 🌍 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome | ✅ Full |
| Mobile Safari | ✅ Full |
| IE 11 | ❌ Not supported |

> `backdrop-filter` is used for navbar glass effect. Falls back to solid dark background on unsupported browsers — no functionality lost.

---

## 🗺️ Roadmap

- [x] Initial production release
- [x] Full animation suite
- [x] Mobile responsive layout
- [x] Contact form with success state
- [ ] Hebrew (RTL) language version
- [ ] Ukrainian language version
- [ ] Case studies / portfolio section
- [ ] Blog section (AI insights)
- [ ] Dark/light theme toggle
- [ ] Backend form submission (EmailJS or Formspree)
- [ ] Analytics integration (privacy-first)
- [ ] Open Graph / Twitter Card meta tags
- [ ] Structured data (JSON-LD) for SEO

---

## 📞 Contact

**Semion Rutshtein** — Founder & Lead Architect, Red Stone Studio

| Channel | Details |
|---------|---------|
| 📱 Phone / WhatsApp | [+972-058-679-9369](tel:+972058679-9369) |
| 💼 LinkedIn | [semion-rutshtein-5091b31b0](https://www.linkedin.com/in/semion-rutshtein-5091b31b0) |
| 📍 Location | Bat Yam, Tel Aviv Area, Israel |
| 🌐 Website | [Coming Soon](#) |

> **Free consultation available.** Reach out on LinkedIn or phone — we respond within 24 hours.

---

## 🏷️ Topics

`landing-page` `html-css-js` `ai-automation` `portfolio` `dark-theme` `animations` `israel` `single-page` `vanilla-js` `studio-website` `tech-consultancy` `web-development` `no-framework` `particle-animation` `scroll-animation` `bat-yam` `red-stone-studio`

---

## 📜 License

```
MIT License

Copyright (c) 2025 Semion Rutshtein — Red Stone Studio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">

**Built with AI · Deployed with Pride**

*Red Stone Studio © 2025 · Bat Yam, Israel*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/semion-rutshtein-5091b31b0)
[![Phone](https://img.shields.io/badge/Phone-+972--058--679--9369-C0392B?style=flat&logo=whatsapp&logoColor=white)](tel:+972058679-9369)

</div>
