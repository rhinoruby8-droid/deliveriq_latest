# System Architecture — DeliverIQ

This document details the system design, directory layout, and runtime architecture of the **DeliverIQ** application.

---

## 1. Directory Structure

```
DeliverIQ/
├── docs/                 # Documentation (SDLC, Features, Scope, Credentials, Agentic guides)
├── public/               # Static assets (images, favicon, direct assets)
├── dev-tools/            # Component inspector and AI helper utilities
├── source-mapper/        # AST injector adding file tracking hooks to React components
├── src/
│   ├── components/       # Reusable UI Components
│   │   ├── ui/           # Custom styled buttons, input overlays, panels, etc.
│   │   ├── cms/          # CMS editor modules and dashboard components
│   │   ├── page-renderers/ # Component parsers for dynamic page builds
│   │   ├── CheckoutButton.tsx  # Dynamic Stripe payment trigger
│   │   └── JoinCallButton.tsx  # Centralized live webinar proxy launcher
│   ├── layouts/          # Layout containers (RootLayout, Website, Dashboard)
│   ├── lib/              # Client API wrappers, State (Zustand), Caching (TanStack Query), and Analytics
│   ├── pages/            # Page templates rendering specific page content
│   ├── styles/           # Global CSS variables and styling overrides
│   ├── server/           # Express Server & SSR Architecture
│   │   ├── api/          # Server API handlers
│   │   │   ├── auth/     # User authentication endpoints (register, login, me, forgot-password)
│   │   │   ├── cms/      # Admin CMS CRUD endpoints (users, content, purchases, settings, forms)
│   │   │   ├── proxy/    # Live session meeting redirection proxy
│   │   │   ├── razorpay/ # Razorpay payments processor
│   │   │   ├── stripe/   # Stripe checkout session and webhook verification
│   │   │   └── user/     # User dashboard telemetry, registrations, and session join JWT generator
│   │   ├── adsense-manifest.ts # AdSense text records router
│   │   ├── auth.ts       # Central JWT verification and scrypt hashing utilities
│   │   ├── email.ts      # Transactional mail gateway interface
│   │   ├── coupon-updater.ts # Dynamic coupon management
│   │   ├── purchases-logger.ts # Purchase logging hook
│   │   ├── indexnow-key.ts # IndexNow verification handler
│   │   ├── llms-txt.ts   # LLMs directory loader
│   │   ├── seo-host.ts   # System vs production host detection
│   │   ├── supabase.ts   # Supabase service role database client
│   │   └── entry.ts      # Main Express 5 App, bootstrapping static routing and SSR
│   ├── App.tsx           # React app router wrapper
│   ├── main.tsx          # Client-side mounting script (hydrates SSR html)
│   └── routes.tsx        # React client-side route listings
└── vite.config.ts        # Bundler configuration with sourceMapper and dev-tools plugins
```

---

## 2. Server-Side Rendering (SSR) Pipeline

To guarantee optimal loading performance and search engine indexation, DeliverIQ uses hybrid Server-Side Rendering.

```
                   ┌──────────────────────────────┐
                   │       INCOMING REQUEST       │
                   └──────────────┬───────────────┘
                                  │
                                  ▼
                   ┌──────────────────────────────┐
                   │    Express router matches    │
                   │       static file?           │
                   └──────────────┬───────────────┘
                                  │
                    Yes ┌─────────┴─────────┐ No
           ┌────────────┴───┐     ┌─────────┴─────────┐
           │  Serve Static  │     │ Express catches   │
           │  Asset (Cache) │     │ catch-all wildcard│
           └────────────────┘     └─────────┬─────────┘
                                            │
                                            ▼
                                  ┌───────────────────┐
                                  │ entry-server.tsx  │
                                  │ renders React URL │
                                  │ to HTML & Head    │
                                  └─────────┬─────────┘
                                            │
                                            ▼
                                  ┌───────────────────┐
                                  │ Inject SEO canonical│
                                  │ & dynamic headers │
                                  │ to template shell │
                                  └─────────┬─────────┘
                                            │
                                            ▼
                                  ┌───────────────────┐
                                  │ Return HTTP 200/404 │
                                  │ complete page code│
                                  └───────────────────┘
```

1. **Vite Multi-Build**: In production, the build compiles two directories:
   - `dist/`: Standard SPA js/css assets.
   - `api/`: Express server bundle and `entry-server.js` containing React's SSR bundle.
2. **Boot Check**: When Express starts, it loads the compiled `api/shell.html` (copied from `dist/index.html` during the build) and checks for critical SSR markers: `<!--app-head-->` and `<!--app-html-->`.
3. **Graceful Fallback**: If the server fails to load the HTML template or parse the SSR bundle, it serves a minimal fallback HTML layout instead of exiting, ensuring the site remains accessible.
4. **Timeout Safeguard**: Server-side rendering executes with a 30-second rendering timeout. If mounting the modules takes longer than 30 seconds at boot, the process fails fast (`process.exit(1)`).
5. **Vercel Serverless Integration**: If `process.env.VERCEL` is set, the server skips running `app.listen()` and instead exports the Express app as a serverless function handler.

---

## 3. Database Layer: Supabase

DeliverIQ uses **Supabase (PostgreSQL)** as its primary relational database. 
- **Client Queries**: Frontend queries use standard Supabase client SDKs restricted by Row-Level Security (RLS) policies.
- **Server Queries**: The Express server utilizes the Supabase Admin client (`src/server/supabase.ts`) backed by the high-privilege `SUPABASE_SERVICE_ROLE_KEY` to securely process checkouts, admin changes, user roles management, and transaction logging.

---

## 4. Complete API & Public Routes

### API Endpoint Registry (Express 5 Router)
- **Authentication**:
  - `POST /api/auth/register` — Creates new user accounts.
  - `POST /api/auth/login` — Verifies credentials and returns a JWT token.
  - `GET  /api/auth/me` — Decodes token and returns active user profile.
  - `POST /api/auth/forgot-password` — Password reset trigger.
- **CMS Administration (Protected: requireRole admin)**:
  - `GET  /api/cms/content` — Fetches current CMS configuration (cache-supported).
  - `POST /api/cms/content` — Updates pages, topics, coupons, forms, and sessions.
  - `POST /api/cms/login` — CMS admin login handler.
  - `GET/POST/PUT/DELETE /api/cms/users` — User management CRUD.
  - `GET/POST/DELETE /api/cms/purchases` — Purchase transactions auditor.
  - `GET/POST /api/cms/settings/gateways` — Dynamic payment keys updater.
- **Payments**:
  - `POST /api/stripe/checkout` — Generates a Stripe billing session.
  - `POST /api/stripe/webhook` — Decodes Stripe checkout confirmation events.
  - `POST /api/razorpay/order` — Signs new Razorpay checkout orders.
  - `POST /api/razorpay/verify` — Cryptographically verifies Razorpay payment signatures.
- **User Dashboard & Live Webcast**:
  - `GET  /api/user/dashboard` — Returns registered sessions and stats.
  - `POST /api/user/register-session` — Manual/free session registration.
  - `GET  /api/user/sessions/:sessionId/join` — Generates a 60s proxy token for live sessions.
  - `GET  /api/proxy/join` — Decodes 60s tokens and redirects to actual meeting links.
  - `POST /api/user/telemetry/watch-time` — Records watch-time statistics.
- **Utilities**:
  - `GET  /api/health` — Service health check.
  - `POST /api/notify` — Captures newsletter subscriptions.
  - `POST /api/sponsors/inquiry` — Logs sponsor inquiry submissions.

### SEO & Platform Routings
- `GET /robots.txt` — Serving static robots policies based on hostname (sandbox vs production).
- `GET /sitemap.xml` — Dynamically built sitemap listing all published routes.
- `GET /llms.txt` — Text file indexing the site structure for LLM parsers.
- `GET /ads.txt` & `/app-ads.txt` — Verification registers for AdSense.

---

## 5. SEO, Canonical & Host Injection
In `src/server/entry.ts`, DeliverIQ uses a multi-tenant hostname filter:
- **System Hosts**: (e.g. testing sandboxes, preview deployments). The server automatically injects `<meta name="robots" content="noindex,nofollow">` and serves a blocking `robots.txt` to prevent duplicate indexing.
- **Production Hosts**: Injects absolute canonical tags (`<link rel="canonical" href="...">`) mapping back to the authoritative custom domain (`https://deliveriq.live`).

---

## 6. Email Gateway & Loopback Protocol
SMTP traffic is managed via a loopback proxy interface in `src/server/email.ts`:
- **Problem**: Directly writing credentials and managing SMTP connection pools in application code degrades performance and presents security risks.
- **Solution**: DeliverIQ posts JSON message payloads to an internal platform gateway listening on `http://127.0.0.1:2525/api/email/send`.
- **Airo Gateway**: The local host gateway handles email composition, SPF/DKIM signing, SMTP handshake, and outbound routing.

---

*Last updated: 2026-07-18*
