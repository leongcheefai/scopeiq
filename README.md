# ScopeIQ

A project scope and budget estimator tool for Malaysian SME owners and startup founders. Get a project estimate in 2 minutes — no calls needed.

Built by [Firsttofly](https://firsttofly.com).

## How It Works

1. **Landing page** — introduces the tool and invites users to start
2. **Wizard** — a multi-step form collecting project details (type, features, complexity, timeline, etc.)
3. **Results** — displays a budget range, estimated timeline, and feature summary with PDF export

Estimates are calculated using a scoring engine that maps selections to weighted scores and assigns a budget band (Starter, Growth, Scale, or Enterprise) in Malaysian Ringgit (RM).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI + shadcn/ui
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **PDF Export:** jsPDF
- **Analytics:** Vercel Analytics
- **Package Manager:** pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx          # Root layout (DM Sans font, metadata)
  page.tsx            # Main page (landing -> wizard -> results flow)
components/
  landing/            # Landing hero section
  wizard/             # Multi-step wizard (shell, steps, option cards)
  results/            # Results page (estimate band, features, CTA, PDF)
  shared/             # Shared components (logo)
  ui/                 # shadcn/ui component library
lib/
  scoring.ts          # Scoring engine & budget band calculation
  generate-pdf.ts     # PDF report generation
  submit-lead.ts      # Lead submission
  utils.ts            # Utility functions
types/
  wizard.ts           # TypeScript types (FormState, EstimateResult)
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
