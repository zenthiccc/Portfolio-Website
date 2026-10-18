<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio Website

Personal portfolio for **Joseph Duron Jr.** Dark aesthetic with a sticky header
and experience timeline while the Projects column scrolls. On small screens the
experience timeline stacks above the projects list. Content lives in
`lib/data.ts`.

## Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` tokens in `app/globals.css`)
- Static page; the only client JS is `components/ThemeToggle.tsx`.
- Light/dark theming: dark tokens live in `@theme`; light overrides live under
  `html.light` (cream palette). Default follows the OS (`prefers-color-scheme`);
  the toggle persists to `localStorage` and an inline script in
  `app/layout.tsx` sets the class before paint to avoid a flash.
- Theme switching animates with a sliding wipe using the View Transitions API
  (`document.startViewTransition` in `ThemeToggle`, `::view-transition-*` rules
  in `globals.css`); browsers without it fall back to a plain color transition,
  and `prefers-reduced-motion` disables it. Do not add a `background-color`
  transition on `body` unconditionally — it defeats the view-transition
  snapshot (the "new" frame would capture the old color).

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build (also type-checks)
- `npm run lint` — ESLint

## Conventions

- **Content lives in `lib/data.ts`.** Edit profile copy, links, and experience
  there — do not hardcode content inside components.
- **Projects come from GitHub**, not `lib/data.ts`. `lib/github.ts` exposes
  `getRepos()` (cached via `use cache` + `cacheLife("hours")` +
  `cacheTag("repos")`), which fetches public, non-fork, non-archived repos for
  `GITHUB_USERNAME` (default `zenthiccc`), newest-updated first. On any failure
  it falls back to the committed `lib/repos.snapshot.json`, refreshed by
  `scripts/snapshot-repos.mjs` (`npm run snapshot:repos`, also runs on
  `prebuild`). Optional `GITHUB_TOKEN` env var raises the API rate limit.
- **Language icons** in the Projects meta line come from `simple-icons` via
  `components/LanguageIcon.tsx`, rendered inline as brand-colored SVGs
  (server-rendered, no client JS). The map covers ~100 common GitHub languages
  and matches exact names first, then a normalized (case/space/punctuation
  insensitive) key. Genuinely unmapped languages fall back to the plain name —
  add new mappings to `icons` in that file.
- Components live in `components/`. Presentational only; they read from
  `lib/data.ts`.
- Typography: Inter (body) + Space Grotesk (`font-display`, headings) +
  JetBrains Mono (`font-mono`, meta/periods).
- Experience renders as a timeline (accent dots on a left rule), not cards.
- Sticky layout: the page scrolls normally (so the wheel works over any part
  of the page) while the header (`lg:sticky lg:top-0`) and experience column
  (`lg:sticky lg:top-36`) stay pinned. The header keeps its own `lg:pt-5`/`pb-5`
  padding and an opaque background; its `top-36` offset on the experience
  assumes the header's ~134px height. Do not reintroduce a full-height
  `overflow-hidden` shell — a `flex-1` there overrides `h-screen` and makes the
  whole page grow.
- Company logos are static assets in `public/logos/`; each `Experience` entry
  references one via `logo.src`. Swap the files to update a logo — no code
  change needed if filenames stay the same.
- Styling uses Tailwind utility classes with the theme tokens below. Avoid
  ad-hoc hex values; add a token instead.
- No comments in code unless they explain non-obvious behavior.

## Theme tokens (`app/globals.css`)

| Token                 | Dark        | Light (`.light`) | Use                       |
| --------------------- | ----------- | ---------------- | ------------------------- |
| `--color-background`  | `#020d1cdb` | `#faf6ee`        | page background           |
| `--color-surface`     | `#0a0a0a`   | `#f1ebdd`        | cards / raised surfaces   |
| `--color-border`      | `#1f2937`   | `#e4dccb`        | hairlines, card borders   |
| `--color-foreground`  | `#ededed`   | `#1c1917`        | primary text              |
| `--color-muted`       | `#9ca3af`   | `#6f6757`        | secondary text, dates     |
| `--color-accent`      | `#e09a19`   | `#ac0d0d`        | links, timeline dots, meta |

## Status

See `progress.md` for the current state and open items.
