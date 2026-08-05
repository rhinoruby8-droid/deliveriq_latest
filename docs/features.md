# Platform Features List — DeliverIQ

This document catalogs the current functional features of the **DeliverIQ** platform, including frontend portals, the user dashboard, the CMS admin suite, payment workflows, and SEO/analytics systems.

---

## 1. Core Event Platform & Public Portals

### Homepage (`/`)
- **Hero Video & Ticker**: High-end landing hero with an embedded loop video showcasing webinars, a sliding ticker with disciplines, and dual action call-to-actions (CTAs).
- **Upcoming Sessions List**: Shows sessions currently in development with status indicators ("Coming Soon"). Uses robust fallback data (`FALLBACK_CMS_CONTENT`) merged with database records to guarantee full rendering parity across the homepage and sessions page.
- **FAQ Accordion**: Interactive, animated FAQ section built with `motion` for smooth accordion toggles.
- **Email Notification Forms**: Captures user work email to notify them of session openings, implementing visual feedback on successful signup.

### Sessions Hub (`/sessions`)
- **Topic Categories**: Organized lists across primary project management disciplines:
  - **Project Controls**: Schedule risk, EVM, cost forecasting, risk registers.
  - **Project Management**: Prompting, reporting, stakeholder communications, planning.
  - **Delivery Leadership / PMO**: Lessons learned, knowledge capture, program delivery.
- **Teaser & Interest Registration**: User signup forms for session notification lists. Calls `notifySubmission` to send data to the backend notifications API.
- **Host / Speaker CTAs**: Clear directional links inviting speakers and sponsors to explore partnership opportunities.

### Session Details (`/sessions/:id`)
- **Detailed Session Info**: Renders full session descriptions, schedule times, pricing, dynamic speaker profiles, and sponsor details.
- **Registration Hub**: Allows unauthenticated users to sign up and pay (via Stripe or Razorpay) or authenticated users to register instantly.
- **What to Expect Module**: Renders key takeaway points and structured learning goals dynamically input from the CMS admin panel.

### Speaker Portal (`/for-speakers`)
- Information page explaining presentation benefits, topics of interest (AI in real project environments), and an integrated speaker application form. Features a seamless video background (`hero-loop_speaker.mp4`) integrated directly inside the hero section.

### Sponsor Portal (`/for-sponsors`)
- Detail list of audience demographics and package offerings (e.g. logo placement, dedicated session slots, registration list sharing). Includes a sponsor enquiry form.

### Media & Replays (`/replays`)
- Video listing page containing on-demand replays of past sessions. Users can watch free sessions or pay for premium ticket replays.

### Privacy Policy & Terms (`/privacy`, `/terms`)
- Complete compliance documents specifying privacy regulations, data use, terms of service, and cookie policies.

---

## 2. Centralized Hero Video Background Engine
- **Centralized `<HeroVideoBackground />`**: Standardized reusable video component (`src/components/HeroVideoBackground.tsx`) used across Homepage, Sessions, and Speakers portals.
- **Section-Level Ingestion**: Embedded directly inside hero `<section>` elements rather than wrapping entire page roots in disjointed containers. Eliminates fixed `70vh` height clipping, blurriness, and Z-index layout conflicts.
- **Dynamic Widget Support**: Integrated token `[HeroVideoBackground]` inside `PageHtmlRenderer` allowing HTML-driven pages (such as `/sessions` and `/for-speakers`) to position background video loops (`hero-loop_2.mp4` / `hero-loop_speaker.mp4`) dynamically without hardcoded background overlays blocking visibility.

---

## 3. User Accounts & Dashboard

### Registration & Authentication (`/register`, `/login`)
- **Account Creation**: Full sign-up flow requesting name, email, and password.
- **Scrypt Password Hashing**: Passwords are securely hashed on the backend before storage.
- **JWT-Based Sessions**: Successful authentication issues a JSON Web Token stored locally.
- **Role-Based Routing**: Supports roles (`delegate`, `speaker`, `admin`) to determine dashboard permissions.

### User Dashboard (`/dashboard`)
- **Metrics/Telemetry Tracking**: Displays user stats like minutes of live content attended and hours of replays watched.
- **My Calendar / Registered Sessions**: Lists all sessions the user has registered or paid for.
- **Pro Upgrades**: Links delegates to Stripe Checkout to upgrade their account to the "Pro Tier" (tier3).

### Dedicated Sessions View (`/dashboard/sessions`)
- **Clean Event Board**: Searchable and filterable dashboard listing the user's upcoming registered live events.
- **Centralized "Join Call" Action**: Houses the secure, token-protected event link launcher.

---

## 4. Secure Live Event Join Flow

### Centralized Join Component (`src/components/JoinCallButton.tsx`)
- Centralized component implementing the DRY (Don't Repeat Yourself) principle.
- Handles authorization checking, connecting state toggles, and tokenized proxy redirection.
- Intelligently parses and supports both regular user tokens (`deliveriq_delegate_token`) and CMS admin tokens (`deliveriq_cms_token`).

### Backend Token Proxy (`/api/user/sessions/:sessionId/join` & `/api/proxy/join`)
- **Token Generation**: Clicking "Join Call" triggers a backend request that checks user registration and generates a short-lived (60-second) JWT containing the session's meeting link (Zoom, Teams, Meet, etc.) and the user's ID.
- **Token Proxy Redirect**: Redirects the user to `/api/proxy/join?token=...`. The proxy endpoint decodes the short-lived JWT, verifies its signature and expiration, and redirects the client browser to the actual meeting URL.
- **Zero Raw URL Leakage**: Meeting credentials and raw link queries are never rendered in the client DOM, preventing link sharing.

---

### Headless CMS & Admin Control Panel (`/admin`)

- **Secure Login (`/admin/login`)**: Custom credentials verification protecting admin routes.
- **Dynamic Content Managers**: Full CRUD managers for:
  - **Global Content Tab (`global-content`)**: Centralized administrative panel for global site settings:
    - **Global SEO Defaults**: Drag-and-drop / binary buffer upload for site-wide default Open Graph (OG) Image (`defaultOgImageUrl`).
    - **Header Links & Branding**: Full management of header navigation labels and target paths.
    - **Footer Configuration**: Management of tagline, contact email, copyright entity name, and footer link arrays.
    - **Sponsors Extended Metrics**: Demographic percentages for Decision Makers, Senior Leaders, Practitioners, and footnote copy.
    - **Replays & Payment Pages**: Customization of empty state titles, descriptions, fallback avatars, and payment cancellation notice text.
  - **Sessions**: Titles, descriptions, date, time, duration, status (draft/published), pricing configs, custom Zoom/Teams registration URLs, and session-level Open Graph preview card image (`sessionOgImageUrl`).
  - **What to Expect**: Configures custom takeaways/bullet points rendered on the frontend sessions detail page.
  - **Speakers & Sponsors**: Profiles, logos, bios, social/website links.
    - **Avatar Upload**: Supports external public URLs (Google Drive, LinkedIn) as well as direct file browsing from the local machine (with a "Browse Local Machine" button). Uploaded images are encoded to base64, sent to `/api/cms/upload`, and saved in the public Supabase storage bucket `deliveriq-assets`. Includes frontend fallback UI (e.g., Lucide `User` icon) in case of empty or broken image links.
  - **Topics & Categories**: Dynamic tags and categories filters.
- **Full Database Deletion Reconciliation**: Admin array deletions (speakers, sponsors, sessions, forms) calculate missing IDs against Supabase database state and execute permanent database deletion calls (`supabaseAdmin.from(...).delete()`), preventing hardcoded fallback content from reappearing on refresh.
- **Purchase Ledger**: Auditable table showing all Stripe and Razorpay transactions with option to manually override/delete purchases.
- **Coupons Management**: Configures coupon codes (stored in the Supabase settings table) supporting custom percentages (e.g. 100% off for free access) or flat discounts.
- **Forms & Submissions Manager**: View inquiries from speakers, sponsors, and general contact forms.
- **Settings & Gateway Configs**: Enable, disable, and configure API keys for Stripe and Razorpay payment gateways dynamically.
- **Embeddable Forms (`/embed/form/:id`)**: Generates modular iframe-friendly forms with custom fields (text, email, select, textarea) defined in the admin builder.
- **Subscription Module Editor**: Configure dynamic Subscription tiers, edit their durations, modify prices directly (always stored and calculated in USD), and toggle subscription kill-switches to instantly pause or retire legacy plans.

---

## 5. Payment Gateways & Subscription Module

### Subscription & Access Gating
- Checkout flows intelligently recognize Subscription Tiers, calculating the correct total and dynamically applying access durations (e.g. 1-year, 3-months) as defined by the CMS payload.
- Dynamically generates billing description templates using CMS variables.

### Stripe Integration
- **Checkout (`/api/stripe/checkout`)**: Redirects users to Stripe-hosted checkouts.
- **Webhook (`/api/stripe/webhook`)**: Cryptographically signs checkout completions, logs successful transactions, and adds the session to the user's `registered_session_ids` array in Supabase. Applies duration math based on the active CMS-configured subscription plan.

### Razorpay Integration
- **Order Generation (`/api/razorpay/order`)**: Signs payment requests with API keys.
- **Payment Verification (`/api/razorpay/verify`)**: Validates the Razorpay payment signature on the backend to confirm transaction success and grants access, applying the same dynamic duration logic.

---

## 6. SEO, Crawling & Metadata Engine

### Centralized SEO & Meta Injection (`<SeoHead />`)
- Centralized component using `@dr.pogodin/react-helmet` on both client side and server side (`entry-server.tsx` pre-fetching):
  - Dynamic Meta titles, descriptions, and keywords.
  - Dynamic Open Graph (OG) image hierarchy: Page/Session-level override (`sessionOgImageUrl`) falling back to Global Default (`defaultOgImageUrl`).
  - Canonical links matching the request path.
  - SSR-safe pre-fetching of CMS data prior to rendering HTML template shell.

### Structured JSON-LD Data
- Automated structured schemas (Schema.org `WebSite`, `WebPage`, `Organization`) injected on index and sessions routes to improve rich search snippets.

### System-level SEO Routing (`src/server/entry.ts`)
- **Robot Filtering**: Identifies system test hosts (`isSystemHost`) and dynamically injects `<meta name="robots" content="noindex,nofollow">` or serves a blocking `robots.txt` to prevent test servers from getting indexed.
- **Sitemap Engine**: Generates `sitemap.xml` dynamically by filtering valid routes declared in `src/lib/seo-routes.ts` and prefixing the active hostname.
- **LLM/AI Indexing**: Implements `/llms.txt` specification to allow AI and LLM agents to easily map the site structure.

---

## 7. Analytical Tracking & Consent Management
- **Consent Banner**: Bottom banner component (`CookieBanner.tsx`) checking user choice before loading external scripts.
- **Analytics Client**: Modular script (`analytics.ts`) executing Google Analytics tracking calls safely (using safeguards to ensure data isn't tracked before user consent).

---

## 8. Developer & AI Introspection Utilities
- **Vite Source Mapper**: Injects `data-source-file`, `data-source-line`, and `data-source-component` attributes to DOM elements in development.
- **Dev Tools UI Overlay**: Custom overlay helping developers and AI agents select elements, inspect their properties, and map them to local files instantly.

---

*Last updated: 2026-08-03*
