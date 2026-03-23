# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Red Stone Studio — company website for Semion Rutshtein's AI/automation consultancy (Bat Yam, Israel). Monorepo: React + Vite frontend, Express backend, served via Docker + Nginx. Live at **redstonedev.online** via Cloudflare Tunnel running on a local Mac.

## Commands

### Local development (no Docker)
```bash
# Terminal 1 — backend
cd server && npm run dev        # nodemon on port 3001

# Terminal 2 — frontend (proxies /api → localhost:3001)
cd client && npm run dev        # Vite on port 5173
```

### Tests
```bash
cd server && npm test                        # Jest + Supertest (10 tests)
cd client && npm test                        # Vitest + RTL (7 tests)
cd client && npm test -- --reporter=verbose  # with test names
```

### Docker (production-equivalent)
```bash
docker-compose up -d --build    # builds + starts (http://localhost)
docker-compose down
```

### Deployment
The app runs in Docker on a Mac and is exposed via Cloudflare Tunnel:
```bash
# Tunnel auto-starts on login via launchd. Manual control:
cloudflared tunnel run rs-studio   # start manually
cloudflared service uninstall      # stop auto-start
```

## Architecture

```
client/          React + Vite SPA
server/          Express API
nginx/           nginx.conf (local HTTP) + nginx.prod.conf (HTTPS via Let's Encrypt)
docker-compose.yml          local (port 80)
docker-compose.prod.yml     production override (port 443 + certbot)
~/.cloudflared/config.yml   Cloudflare Tunnel → localhost:80
```

**Request flow:** `redstonedev.online` → Cloudflare Tunnel → Docker Nginx (port 80) → static React build OR proxy `/api/*` → Express (port 3001 internal).

## Key Architectural Decisions

**GSAP ScrollTrigger cleanup:** Every `useEffect` that creates ScrollTrigger instances must store them and call `.kill()` in the cleanup return. `ScrollTrigger.normalizeScroll(false)` must also be called on unmount. See `MacbookScroll.jsx` for the reference pattern.

**Reveal animations:** Sections use `.reveal` / `.revealed` CSS classes triggered by `IntersectionObserver` in each section's own `useEffect`. The pattern is in `Services.jsx` — every section that has `.reveal` elements needs its own observer or elements stay `opacity:0`.

**SVG elements created in JS:** Always use `document.createElementNS('http://www.w3.org/2000/svg', tagName)` — never `innerHTML` on SVG elements. SVG SMIL (`animateMotion`) won't work if parsed via innerHTML. See `Business.jsx` `NetworkDiagram`.

**Video scrubbing:** The MacBook scroll section uses a specially encoded video (`macbook-explode-scrub.mp4`) with `-g 1` (every frame is a keyframe) for smooth `currentTime` seeking. The source HQ video is in `assets/new/`. First/last frame PNGs are in `client/public/images/` and used as poster + end-of-scroll overlay.

**Client Dockerfile build arg:** `NGINX_CONF` build arg selects which nginx config to bake in (defaults to `nginx/nginx.conf`). The prod compose override passes `nginx/nginx.prod.conf`.

## Email (intake form)
Server sends via Gmail SMTP (Nodemailer). Requires `.env` with `EMAIL_USER`, `EMAIL_PASS` (Gmail App Password — not account password), `RECIPIENT_EMAIL`. Subject fields are sanitized against header injection. Server validates all required fields + email format before sending.

## Design Tokens
All CSS variables in `client/src/styles/tokens.css`. Key palette: `--bg-deep: #0A0A0F`, `--red-bright: #E74C3C`, `--gold: #F39C12`, `--text-primary: #F0EDE8`. Fonts: Bebas Neue (headings), Nunito (body), JetBrains Mono (code labels) — loaded via Google Fonts in `index.html`.

## Languages Supported
Hebrew (RTL), English, Ukrainian, Polish, German, French. Russian was intentionally removed.
