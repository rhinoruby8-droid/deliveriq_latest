# Scope & Tech Stack — DeliverIQ

This document defines the functional scope and technical specifications of the **DeliverIQ** platform.

---

## 1. Product Scope
**DeliverIQ** is a modern, premium online learning and event platform specifically built for project delivery practitioners. The core product revolves around:

- **Live Webinar Rooms**: Low-friction landing zones for upcoming expert sessions.
- **Paid On-demand Content**: Stripe checkout integrations for premium replay tickets.
- **B2B Intake Forms**: Applications for speakers to present their work, and sponsors to buy reach packages.
- **No-Login Signups**: An optimized signup flow where users register using their email directly without having to maintain a user password dashboard, reducing signup drop-off.
- **Advanced SEO Engine**: Complete server-side rendering (SSR), automated dynamic sitemaps, robots configurations, and JSON-LD structured schemas to capture organic search traffic for terms like "AI for Project Schedulers" or "Schedule Risk Analysis using LLMs".

---

## 2. Technical Stack

```
   ┌─────────────────────────────────────────────────────────────┐
   │                       CLIENT BROWSER                        │
   │   React 19 + TypeScript + Tailwind CSS + Framer Motion      │
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
   │ Stripe API  │         │ Loopback    │         │ Database    │
   │ Checkout    │         │ SMTP Mailer │         │ MySQL/PG    │
   └─────────────┘         └─────────────┘         └─────────────┘
```

### Frontend Architecture
- **Framework**: **React 19** (uses functional hooks, modern layout wrappers, and dynamic hydration).
- **Languages**: **TypeScript 5** (strict typing across paths, props, layouts, and backend APIs).
- **Build Tool / Bundler**: **Vite 6** (lightning-fast HMR and optimized asset compilation).
- **Styling**: 
  - **Tailwind CSS 3**: Utility-first CSS layout styling.
  - **Vanilla CSS**: Global theme tokens, typography presets (Inter, Playfair, Outfit styles), and shadow values defined in `src/styles/globals.css`.
- **UI Primitives**: **shadcn/ui** components built on **Radix UI** primitives for full web accessibility (WAI-ARIA).
- **Routing**: **React Router DOM 7** (client-side rendering routes defined inside `src/routes.tsx` and wrapped inside custom layout elements).
- **Animations**: **Framer Motion** (for smooth scroll animations, fading, and interactive tabs/accordions).
- **SEO/Helmet**: `@dr.pogodin/react-helmet` (injects page tags dynamically on both server and client).

### Backend Architecture
- **Runtime**: **Node.js 22** (configured with ES Modules).
- **Server Framework**: **Express.js** (acts as API router, static assets server, and Server-Side Renderer).
- **Email Service**: **Nodemailer** + custom loopback proxy interface. Connects internally to Airo Gateway at `127.0.0.1:2525` to manage domain authentication policies.
- **Payment Processing**: **Stripe SDK** (creates hosted billing pages, handles checkout events, and runs secure cryptographic signature validations on webhooks).
- **Database (Configured, optional)**: Auto-management placeholders for **MySQL** / **PostgreSQL** to record tickets, attendees, or user tracking variables.

---

## 3. Directory Layout and Routing Patterns

- **`src/pages/`**: Content-only components corresponding to URLs. These do not duplicate layout components like headers or footers.
- **`src/layouts/`**: Wrappers implementing visual structure.
  - `RootLayout.tsx`: General wrapper rendering the shared navigation bar and bottom footer.
  - `Website.tsx`: Container bounding standard width pages.
  - `Dashboard.tsx`: Clean side-bar layout for admin and ticket portals.
- **`src/server/entry.ts`**: Main entry point for node. Bootstraps Express, mounts API handlers, serves compiled static files, and invokes the Vite-compiled `render` function from `entry-server.tsx` to return HTML pre-rendered on the server.
