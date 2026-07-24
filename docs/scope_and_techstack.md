# Scope & Tech Stack — DeliverIQ

This document defines the functional scope and technical specifications of the **DeliverIQ** platform.

---

## 1. Product Scope
**DeliverIQ** is a premium, high-performance online learning and event platform specifically built for project delivery practitioners. The core product revolves around:

- **User Accounts & Dashboard**: Personalized attendee portal where delegates manage registrations, view event schedules, watch replays, and monitor watch-time metrics.
- **Secure Live Webinar Join Flow**: JWT-protected proxy redirect system preventing raw meeting URL exposure.
- **Headless CMS Admin Suite**: Complete administrative controls managing sessions, takeaways ("What to Expect"), speakers, sponsors, forms, coupon codes, users, purchases, and gateway credentials.
- **Dual Payment Integrations**: Supports both Stripe and Razorpay checkout workflows, dynamically toggleable from settings.
- **No-Login Guest Checkout Option**: An optimized registration path allowing non-authenticated guests to purchase session tickets and create accounts inline.
- **Dynamic Form Embeds**: Generates embeddable, iframe-friendly customer intake forms (`/embed/form/:id`) with customizable fields.
- **Advanced SEO Engine**: Complete server-side rendering (SSR), absolute canonical hostname injection, dynamic sitemap generators, robots controls, and JSON-LD structured schemas to capture organic search traffic.

---

## 2. Technical Stack

```
   ┌─────────────────────────────────────────────────────────────┐
   │                       CLIENT BROWSER                        │
   │   React 19 + TypeScript 5 + Tailwind CSS 3 + Motion 12      │
   │   Zustand (State) + TanStack Query (Server State)           │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                           JSON API & SSR Shell
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                       EXPRESS SERVER                        │
   │               Node.js 22 + entry-server.tsx                 │
   └──────┬───────────────────────┬───────────────────────┬──────┘
           │                       │                       │
           ▼                       ▼                       ▼
   ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
   │ Payment     │         │ Loopback    │         │ Primary DB  │
   │ Gateways    │         │ SMTP Mailer │         │ Supabase    │
   │ Stripe/Rzp  │         │ Nodemailer  │         │ PostgreSQL  │
   └─────────────┘         └─────────────┘         └─────────────┘
```

### Frontend Architecture
- **Framework**: **React 19** (utilizes functional hooks, modern layout wrappers, and server hydration).
- **Language**: **TypeScript 5** (strict typing across routing paths, page props, layout wrappers, and API integrations).
- **Build Tool / Bundler**: **Vite 6** (provides fast HMR in development and optimized asset compilation).
- **Styling**: 
  - **Tailwind CSS 3**: Utility-first CSS layout styling.
  - **Vanilla CSS**: Global theme tokens, typography presets (Inter, Playfair, Outfit styles), and shadow values defined in `src/styles/globals.css`.
- **UI Primitives**: **shadcn/ui** components built on **Radix UI** primitives for full web accessibility (WAI-ARIA).
- **Client State Management**: **Zustand** (lightweight client state container).
- **Server State / Data Fetching**: **TanStack React Query** (manages caching, background updates, and network synchronization).
- **Rich Text Editors**: **Lexical** and **TipTap** (powering the administrative CMS content builders).
- **Routing**: **React Router DOM 7** (client-side rendering routes defined inside `src/routes.tsx` and wrapped inside custom layout elements).
- **Animations**: **Motion v12** (Framer Motion's upgraded packaging for smooth scroll animations, fading, and interactive tabs/accordions).
- **SEO/Helmet**: `@dr.pogodin/react-helmet` (injects page tags dynamically on both server and client).

### Backend Architecture
- **Runtime**: **Node.js 22** (configured with ES Modules).
- **Server Framework**: **Express.js 5.1.0** (acts as API router, static assets server, and Server-Side Renderer).
- **Primary Database**: **Supabase (PostgreSQL)** (handles all user profiles, transactional purchases, sessions registry, speakers/sponsors metadata, forms, and gateway configurations).
- **Email Service**: **Nodemailer** + custom loopback proxy interface. Connects internally to Airo Gateway at `127.0.0.1:2525` to manage domain authentication policies.
- **Payment Processing**: 
  - **Stripe SDK** (creates hosted billing pages, handles checkout events, and runs secure webhook signature validations).
  - **Razorpay SDK** (creates payment orders, verifies transaction authenticity via cryptographically signed hashes).
- **Secret Management**: `#airo/secrets` import map alias pointing to `./airo-secrets/src/index.ts` for secure environment variable isolation.

---

## 3. Directory Layout and Routing Patterns

### Core Directory Layout
- **`src/pages/`**: Content-only components corresponding to URLs. These do not duplicate layout components like headers or footers.
- **`src/layouts/`**: Wrappers implementing visual structure.
  - `RootLayout.tsx`: General wrapper rendering the shared navigation bar and bottom footer.
  - `Website.tsx`: Container bounding standard width pages.
  - `Dashboard.tsx`: Clean side-bar layout for admin and delegate portals.
- **`src/components/`**: Reusable component catalog (e.g., `<JoinCallButton />`, `<CheckoutButton />`, `<RichTextEditor />`, `<CookieBanner />`).
- **`src/server/entry.ts`**: Main entry point for node. Bootstraps Express 5, mounts API handlers, serves compiled static files, and invokes the Vite-compiled `render` function from `entry-server.tsx` to return HTML pre-rendered on the server.

---

*Last updated: 2026-07-18*
