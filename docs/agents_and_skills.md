# Agentic Skills & Subagents Guide — DeliverIQ

This document describes the agentic AI capabilities, plugins, specialized skills, and subagents recommended to construct, verify, and maintain the **DeliverIQ** platform.

---

## 1. Required Agentic Skills (Plugins)

Skills provide tools and protocols that enhance the capabilities of coding assistants when working on the DeliverIQ codebase.

### A. Credentials Management (`credentials`)
- **How it is used**: Handles Stripe API keys (`STRIPE_SECRET_KEY`), Razorpay credentials, database URLs, and notification emails safely.
- **Action Pattern**: The assistant runs silent checks on the `.env.local` file or uses the `#airo/secrets` API before executing scripts that require keys. It prevents API tokens from being leaked in LLM conversation contexts.

### B. Architectural Reviewer (`architectural-reviewer`)
- **How it is used**: Automatically triggers when the assistant is asked to "Run an architectural review" or "Review architecture". Analyzes codebase features, enforces industry standards, and refactors routine issues.
- **Action Pattern**: Prevents over-engineering, checks for correct API typing, ensures form input sanitization, and verifies that UI components containing critical business logic are not duplicated across multiple pages.

### C. Node/Express Environment & Package Management (`uv` and general terminal tools)
- **How it is used**: Coordinates environment installations. Since the project uses Node v22+ and package scripts, the assistant uses these tools to install dependencies, run development servers (`npm run dev`), build the production bundle (`npm run build`), and execute Vitest suites (`npm run test`).
- **Action Pattern**: Used during project setup, linting, and automated code builds.

### D. Workflow Creator (`workflow-skill-creator`)
- **How it is used**: Distills common development operations (e.g., adding a new session route, updating email schemas, or registering a new payment webhook) into a reusable skill.
- **Action Pattern**: Once a workflow (such as adding the "For Speakers" page) is completed and verified, this skill can write a script package so the assistant can regenerate similar pages in seconds.

---

## 2. Platform Architecture Coding Patterns

### A. Centralized Component DRY Pattern
- **Standard**: Actionable UI components containing critical business logic (e.g., secure proxy joins, authenticated checkout buttons) must be centralized in the `src/components/` directory (like `JoinCallButton.tsx` and `CheckoutButton.tsx`) and imported where needed, rather than duplicated inline across multiple page layouts.

### B. Secure Tokenized Redirect (Proxy Join Flow)
- **Standard**: High-value meeting links must never be exposed raw in the client DOM.
- **Implementation**: The page calls `/api/user/sessions/:sessionId/join` with an authorization token. The server generates a short-lived (60s) JWT containing the target URL and user info, then returns a proxy URL `/api/proxy/join?token=...`. The proxy endpoint verifies the JWT and performs a redirect.

### C. Dual-Token Authorization Handling
- **Standard**: The application supports both attendee delegates and admin CMS managers.
- **Implementation**: Regular users authenticate with a token stored in `deliveriq_delegate_token`, while administrators authenticate with a token stored in `deliveriq_cms_token`. The global client helper `getUserToken()` in `src/lib/user-auth.ts` automatically falls back between both keys, allowing administrative accounts to test frontend portals without separate logins.

---

## 3. Recommended Subagents

Subagents are specialized, isolated instances of AI models configured with dedicated prompts and tool sets to execute development tasks concurrently or in the background.

### A. Research Subagent (`research`)
* **Role**: Codebase & Documentation Researcher.
* **How it is used**: Explores routing declarations, reads component files, checks package configurations, or researches external APIs (like Supabase, Razorpay, Stripe, React 19 hooks, and Tailwind CSS patterns). Runs in the background without cluttering the main conversation context.

### B. Self-Cloned Subagent (`self`)
* **Role**: General-purpose Developer clone.
* **How it is used**: Inherits the parent agent's full configuration, tools, and context to execute tasks in isolated workspaces. Great for running long-running operations or side tasks concurrently.

---

*Last updated: 2026-07-18*
