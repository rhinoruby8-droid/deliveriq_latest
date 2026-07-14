# Platform Features List — DeliverIQ

This document catalogs the current functional features of the **DeliverIQ** platform, alongside planned/extensible features.

---

## 1. Core Event Platform (Current Pages & Content)

### Homepage (`/`)
- **Hero Video & Ticker**: High-end landing hero with an embedded loop video showcasing webinars, sliding ticker with disciplines, and dual action call-to-actions (CTAs).
- **Upcoming Sessions List**: Shows sessions currently in development with status indicators ("Coming Soon").
- **FAQ Accordion**: Interactive, animated FAQ section built with `framer-motion` for smooth accordion toggles.
- **Email Notification Forms**: Captures user work email to notify them of session openings, implementing visual feedback on successful signup.

### Sessions Hub (`/sessions`)
- **Topic Categories**: Organized lists across three primary project management disciplines:
  - **Project Controls**: Schedule risk, EVM, cost forecasting, risk registers.
  - **Project Management**: Prompting, reporting, stakeholder communications, planning.
  - **Delivery Leadership / PMO**: Lessons learned, knowledge capture, program delivery.
- **Teaser & Interest Registration**: User signup forms for session notification lists. Calls `notifySubmission` to send data to the backend notifications API.
- **Host / Speaker CTAs**: Clear directional links inviting speakers and sponsors to explore partnership opportunities.

### Speaker Portal (`/for-speakers`)
- Information page explaining presentation benefits, topics of interest (AI in real project environments), and an integrated speaker application form.

### Sponsor Portal (`/for-sponsors`)
- Detail list of audience demographics and package offerings (e.g. logo placement, dedicated session slots, registration list sharing). Included sponsor enquiry form.

### Media & Replays (`/replays`)
- Video listing page containing on-demand replays of past sessions. Users can watch free sessions or pay for premium ticket replays.

### Privacy Policy & Terms (`/privacy`, `/terms`)
- Complete compliance documents specifying privacy regulations, data use, terms of service, and cookie policies.

---

## 2. Payments & Registration Workflow

### Stripe Checkout Button (`src/components/CheckoutButton.tsx`)
- Triggered by clicking "Register & Pay" on premium sessions or paid replays.
- Communicates with `/api/stripe/checkout` to generate a secure Stripe-hosted checkout page.
- Tracks `begin_checkout` custom events via Google Analytics client.

### Stripe Webhook Receiver (`src/server/api/stripe/webhook/POST.ts`)
- Listens to Stripe events (e.g., `checkout.session.completed`).
- Verifies payload signatures using `STRIPE_WEBHOOK_SECRET` for secure event handling.
- Triggers ticket issuance or confirmation emails to registered attendees.

---

## 3. SEO, Crawling & Metadata Engine

### Page-level SEO Injection
- Custom tags injected using `@dr.pogodin/react-helmet` on both client side and server side:
  - Meta titles, descriptions, and keywords.
  - Canonical links matching request path.
  - Open Graph (OG) tags for rich social sharing previews (e.g. LinkedIn, Twitter).

### Structured JSON-LD Data
- Automated structured schemas (Schema.org `WebSite`, `WebPage`, `Organization`) injected on index and sessions routes to improve rich search snippets.

### System-level SEO Routing (`src/server/entry.ts`)
- **Robot filtering**: Identifies system test hosts (`isSystemHost`) and dynamically injects `<meta name="robots" content="noindex,nofollow">` or serves a blocking `robots.txt` to prevent test servers from getting indexed.
- **Sitemap Engine**: Generates `sitemap.xml` dynamically by filtering valid routes declared in `src/lib/seo-routes.ts` and prefixing the active hostname.
- **LLM/AI indexing**: Implements `/llms.txt` specification to allow AI and LLM agents to easily map the site structure.

---

## 4. Analytical Tracking & Consent Management
- **Consent Banner**: Beautiful bottom banner component (`CookieBanner.tsx`) checking user choice before loading external scripts.
- **Analytics Client**: Modular script (`analytics.ts`) executing Google Analytics tracking calls safely (using safe guards to ensure data isn't tracked before user consent).

---

## 5. Developer & AI Introspection Utilities
- **Vite Source Mapper**: Injects `data-source-file`, `data-source-line`, and `data-source-component` attributes to DOM elements in development.
- **Dev Tools UI Overlay**: Custom overlay helping developers and AI agents select elements, inspect their properties, and map them to local files instantly.
