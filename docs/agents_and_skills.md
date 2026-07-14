# Agentic Skills & Subagents Guide — DeliverIQ

This document describes the agentic AI capabilities, plugins, specialized skills, and subagents recommended to construct, verify, and maintain the **DeliverIQ** platform.

---

## 1. Required Agentic Skills (Plugins)

Skills provide tools and protocols that enhance the capabilities of coding assistants when working on the DeliverIQ codebase.

### A. Credentials Management (`credentials`)
- **How it is used**: Handles Stripe API keys (`STRIPE_SECRET_KEY`), database login details, and notification emails safely.
- **Action Pattern**: The assistant runs silent check commands (e.g. `grep -sq`) on the `.env` file before executing scripts that require keys. It prevents API tokens from being leaked in LLM conversation contexts.

### B. Node/Express Environment & Package Management (`uv` and general terminal tools)
- **How it is used**: Coordinates environment installations. Since the project uses Node v22+ and package scripts, the assistant uses these tools to install dependencies, run development servers (`npm run dev`), build the production bundle (`npm run build`), and execute Vitest suites (`npm run test`).
- **Action Pattern**: Used during project setup, linting, and automated code builds.

### C. Workflow Creator (`workflow-skill-creator`)
- **How it is used**: Distills common development operations (e.g., adding a new session route, updating email schemas, or registering a new payment webhook) into a reusable skill.
- **Action Pattern**: Once a workflow (such as adding the "For Speakers" page) is completed and verified, this skill can write a script package so the assistant can regenerate similar pages in seconds.

---

## 2. Recommended Subagents

Subagents are specialized, isolated instances of AI models configured with dedicated prompts and tool sets to execute development tasks concurrently or in the background.

```
                  ┌──────────────────────────────┐
                  │          MAIN AGENT          │
                  │   (Orchestrator/Architect)   │
                  └──────────────┬───────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
 ┌──────────────┐        ┌──────────────┐        ┌──────────────┐
 │  UIBuilder   │        │BackendEng    │        │TestEngineer  │
 │ (Subagent)   │        │ (Subagent)   │        │ (Subagent)   │
 └──────────────┘        └──────────────┘        └──────────────┘
```

### A. Research Subagent (`research`)
* **Role**: Codebase & Documentation Researcher.
* **How it is used**: Explores the routing declarations, reads component files, checks package configurations, or researches external APIs (like Stripe API reference, React 19 hooks, and Tailwind CSS patterns). Runs in the background without cluttering the main conversation context.
* **Usage Example**:
  ```tsx
  // Prompt given to Research Subagent:
  "Search the codebase for how the CheckOutButton links to stripe and list the exact fields expected by `/api/stripe/checkout`."
  ```

### B. UI Builder Subagent (`UIBuilder`)
* **Role**: React & Tailwind Component Developer.
* **How it is used**: Focuses exclusively on creating and styling beautiful, modern user interfaces. Equipped with tools to write/edit components and run Vite compilers.
* **Usage Example**:
  ```tsx
  // Prompt given to UIBuilder:
  "Create a new premium ReplayCard component in `src/components/ReplayCard.tsx` using tailwind classes, supporting Framer Motion hover animations and an embedded CheckoutButton."
  ```

### C. Backend & Integrations Subagent (`BackendEngineer`)
* **Role**: Node.js & Express API Developer.
* **How it is used**: Configures API routes, manages email transmissions, sets up Stripe webhook authentications, and establishes database connectors.
* **Usage Example**:
  ```tsx
  // Prompt given to BackendEngineer:
  "Write an Express endpoint at `src/server/api/sessions/POST.ts` that receives a new session object, validates its parameters with Zod, and appends it to the sessions database."
  ```

### D. Quality Assurance & Test Subagent (`TestEngineer`)
* **Role**: Vitest QA Automator.
* **How it is used**: Writes unit tests for React components (using React Testing Library) and backend controllers, runs the testing suite using `npm run test`, and fixes TypeScript type-check and compiler errors.
* **Usage Example**:
  ```tsx
  // Prompt given to TestEngineer:
  "Create a Vitest test file in `src/components/__tests__/CheckoutButton.test.tsx` verifying that clicking the checkout button invokes the fetch api with correct session details."
  ```
