# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server on http://localhost:3000
- `npm run build` — production build (runs TS + ESLint)
- `npm run start` — serve the production build
- `npm run lint` — ESLint only

Env: `ANTHROPIC_API_KEY` must be set in `.env.local` (see `.env.local.example`). All Claude calls are server-side only (`src/app/api/*`); never import the SDK into client components.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind + Recharts + `@anthropic-ai/sdk`. Korean-only UI.

## Two-Stage API Flow (token control)

The app deliberately splits the Claude work into two calls:

1. **Stage 1 — `POST /api/summary`** (`claude-haiku-4-5`): returns `{ overallScore, summary: string[] }`. Cheap, fires on form submit. Frontend renders `SummaryCard` with the score and a ≤5-line summary.
2. **Stage 2 — `POST /api/details`** (`claude-sonnet-4-6`): returns the full `DetailsResult` shaped for every tab. Fires only when the user clicks "자세히 보기". Payment gating is stubbed in the MVP — the button goes straight through.

Do not move Stage-2-sized content into Stage 1. When adding a new per-tab field, update all three of: `src/lib/types.ts` (the contract), `src/lib/prompts/details.ts` (so Claude emits it), and the corresponding tab component in `src/components/tabs/` (so it renders).

## Five Elements Persistence

Five Elements (오행) values per person **must be stable across sessions** — they are cached in `data/five-elements.json` keyed by `sha256(name|birthDate|birthTime|birthPlace)` (see `src/lib/personKey.ts`). `getOrComputeFiveElements` in `src/lib/fiveElements.ts` reads first, computes once via Haiku if missing, then persists. The details route injects the resolved values into the Sonnet prompt so the narrative matches the stored numbers, and also overwrites `result.saju.personA/personB` with the stored values before responding — the chart and the text cannot drift.

The JSON file is gitignored. A simple in-process write lock serializes concurrent writes; this is adequate for single-instance dev/prod only.

## Relationship-Dependent Tabs

The tab set is computed in `src/app/details/page.tsx`. Common tabs (8): 총평, 사주(오행), 별자리, MBTI, 올해 함께하기 좋은 때, 갈등 해결, 함께 하면 좋은 것, 행복의 비결. When `relationship === "연인"`, two extra tabs are appended: 연애 스타일, 결혼·자녀운. The details route also strips `datingStyle`/`marriageChildren` from the response when the relationship is not 연인, so a stale Claude response can't leak couple-only content.

## State Passing Between Pages

`/` (form + summary) stores both the raw `MatchRequest` and the Stage-2 `DetailsResult` in `sessionStorage` before routing to `/details`. `/details` reads them on mount and redirects back to `/` if either is missing — no server-side session is used.

## Data Flow Cheat Sheet

- User submits form → `page.tsx` calls `/api/summary` → `SummaryCard` renders.
- Click "자세히 보기" → `page.tsx` calls `/api/details` → write to `sessionStorage` → `router.push("/details")`.
- `/api/details` resolves both people's Five Elements (cache-or-compute), calls Sonnet with those values as given inputs, normalizes `saju.*` back to stored values, strips couple-only fields for non-couples.

## MVP Scope (explicit)

- No auth, no DB, no real payments.
- No tests yet.
- JSON output from Claude is parsed; one retry on parse failure (see `callClaude` in `src/lib/claude.ts`). If you change the schema, also update the retry nudge.
- `next@14.2.15` has a known advisory; upgrade before any real deploy.
