# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm start        # Start production server
```

No test framework is configured.

## Architecture

ScopeIQ is a single-page project scope & budget estimator for Malaysian SMEs, built by Praxor. It's a Next.js 16 App Router app with a single route (`app/page.tsx`) that manages three states via React `useState`:

**Landing → Wizard → Results**

- `app/page.tsx` — Client component that orchestrates the three-state flow (`'landing' | 'wizard' | 'results'`). All state lives here: `FormState`, `EstimateResult`, and `AppState`.
- `components/landing/landing-hero.tsx` — Hero section with CTA to start the wizard.
- `components/wizard/wizard-shell.tsx` — Multi-step form driven by `config/steps.ts`. Steps are data-driven: each step has a `key` (maps to `FormState` field), `type` (`'single' | 'multi' | 'form'`), and optional `options`. Single-select auto-advances after 200ms delay.
- `components/results/results-page.tsx` — Displays estimate band, feature summary, disclaimer, and CTA buttons (PDF download, booking link).

**Scoring engine** (`lib/scoring.ts`): Maps wizard selections to weighted numeric scores via `SCORES` lookup tables, sums them with a base score of 10, then assigns a budget band (Starter/Growth/Scale/Enterprise) based on score ranges in `BANDS`. All budgets are in Malaysian Ringgit (RM).

**External integrations** (all optional, controlled via env vars):
- **Airtable** (`NEXT_PUBLIC_AIRTABLE_API_KEY`, `NEXT_PUBLIC_AIRTABLE_BASE_ID`) — Stores leads on wizard completion
- **Resend** (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`) — Sends confirmation emails
- **Calendly/Cal.com** (`NEXT_PUBLIC_CALENDLY_URL`) — Booking link on results page
- **Vercel Analytics** — Included in root layout

**Key types** (`types/wizard.ts`): `FormState` (all wizard fields), `Step` (step config), `EstimateResult` (score, budgetRange, timeline, band).

## Tech Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS 4, pnpm
- UI: shadcn/ui (in `components/ui/`) + Radix UI primitives + Lucide icons
- PDF export: jsPDF (`lib/generate-pdf.ts`)
- Path alias: `@/*` maps to project root
