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
│   ├── api/              # Legacy API endpoints (replaced by Express router)
│   ├── components/       # UI Components
│   │   ├── ui/           # shadcn/ui custom styled buttons, tabs, overlays, etc.
│   │   └── CheckoutButton.tsx  # Stripe checkout component
│   ├── layouts/          # RootLayout, Website, and Dashboard containers
│   ├── lib/              # Client API, Analytics tracking, Utilities, and SEO configurations
│   ├── pages/            # Page templates rendering specific page content
│   ├── styles/           # Global CSS variables and styling overrides
│   ├── server/           # Express Server & SSR Architecture
│   │   ├── api/          # Server HTTP Endpoints (health, notify, stripe)
│   │   ├── adsense-manifest.ts # AdSense text records router
│   │   ├── email.ts      # Transactional mail gateway interface
│   │   ├── seo-host.ts   # System vs production host detection
│   │   └── entry.ts      # Main Express App, bootstrapping static routing and SSR
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
          │  Asset (Cache) │     │ regex wildcard    │
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
                                 │ & AdSense tags to │
                                 │ template shell    │
                                 └─────────┬─────────┘
                                           │
                                           ▼
                                 ┌───────────────────┐
                                 │ Return HTTP 200/404 │
                                 │ complete page code│
                                 └───────────────────┘
```

1. **Vite Multi-Build**: In production, the build compiles two directories:
   - `dist/client`: Standard SPA js/css assets and `index.html` shell.
   - `dist/server`: Express application and `entry-server.js` containing React's SSR bundle.
2. **Boot Check**: When Express starts, it loads `dist/client/index.html` and checks for the critical SSR markers: `<!--app-head-->` and `<!--app-html-->`.
3. **Routing Wildcard**: The catch-all GET route redirects to the SSR renderer. If the renderer fails, it falls back to serving the raw client-side HTML shell to maintain page accessibility.

---

## 3. SEO, Canonical & Host Injection
In `src/server/entry.ts`, DeliverIQ uses a multi-tenant hostname filter:
- **System Hosts**: (e.g. testing sandboxes, preview deployments). The server automatically injects `<meta name="robots" content="noindex,nofollow">` and serves a blocking `robots.txt` to prevent duplicate indexing.
- **Production Hosts**: Injects absolute canonical tags (`<link rel="canonical" href="...">`) mapping back to the authoritative custom domain (`https://deliveriq.live`).

---

## 4. Email Gateway & Loopback Protocol
SMTP traffic is managed via a loopback proxy interface in `src/server/email.ts`:
- **Problem**: Directly writing credentials and managing SMTP connection pools in application code degrades performance and presents security risks.
- **Solution**: DeliverIQ posts JSON message payloads to an internal platform gateway listening on `http://127.0.0.1:2525/api/email/send`.
- **Airo Gateway**: The local host gateway handles email composition, SPF/DKIM signing, SMTP handshake, and outbound routing.
