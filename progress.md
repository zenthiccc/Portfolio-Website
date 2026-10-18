# Progress

Living tracker for the portfolio website build. Update as work lands.

Legend: ✅ done · 🚧 in progress · ⬜ todo

## Phases

| #   | Phase                                        | Status |
| --- | -------------------------------------------- | ------ |
| 1   | Project docs (`AGENTS.md`, `progress.md`)    | ✅     |
| 2   | Scaffold Next.js + Tailwind                  | ✅     |
| 3   | Theme tokens + base layout                   | ✅     |
| 4   | `lib/data.ts` (profile + experience content) | ✅     |
| 5   | `Header` (name + contact links)              | ✅     |
| 6   | `ProjectsList` (left column)                 | ✅     |
| 7   | `ExperienceCard` (right column)              | ✅     |
| 8   | Responsive two-column layout                 | ✅     |
| 9   | Verify: `npm run build` + `npm run lint`     | ✅     |

## Log

- 2026-10-18 — Scaffolded Next.js 16.4.2 (App Router, TS, Turbopack) + Tailwind v4.
- 2026-10-18 — Added `AGENTS.md` project guide and this tracker.
- 2026-10-18 — Implemented theme tokens, `Header`, `ProjectsList`, `ExperienceCard`.
- 2026-10-18 — Verified with `npm run build` and `npm run lint`.
- 2026-10-18 — Widened Experience column (equal split, `max-w-7xl`) and
  removed truncation so company/role wrap fully. Header + Experience now stay
  fixed while only the Projects column scrolls (on `lg`+).
- 2026-10-18 — Reworked the visual identity so it no longer mirrors the
  reference: renamed sections ("Selected Work" / "Where I've worked"),
  projects now use a numbered index + category tags with the title itself as
  the link (dropped the GitHub glyph and "See more in github"), experience is
  a left-rule timeline instead of a bordered logo-tile card, added Space
  Grotesk for headings, and moved the accent from teal to violet (`#a78bfa`).
- 2026-10-18 — Added company logo icons beside each experience entry
  (placeholder SVGs in `public/logos/`, rendered via `next/image`) and the new
  General Motors "Transformation Analyst" role.
- 2026-10-18 — Fixed the sticky layout: dropped `flex-1` from the page shell
  (its flex-basis was overriding `lg:h-screen`, letting the whole page grow and
  scroll). Verified via headless Chrome at multiple sizes — the document no
  longer scrolls; only the Projects column scrolls.
- 2026-10-18 — Switched to a normal page scroll with `sticky` header
  (`lg:top-0`) and experience (`lg:top-24`), so the wheel scrolls the projects
  from anywhere on the page while header + experience stay pinned. Gave the
  header a fixed `lg:h-20` to keep the offsets aligned. On small screens the
  experience section now stacks above the projects (`order-*`).
- 2026-10-18 — Gave the sticky header real vertical padding (`lg:pt-5`, `pb-5`,
  opaque `bg-background`) and removed the fixed `lg:h-20` that was too short
  once the tagline wrapped (content overflowed, so project text bled into the
  header). Header is a stable 134.5px on desktop; experience offset updated to
  `lg:top-36` (9.5px clearance).
- 2026-10-18 — Added a light/dark `ThemeToggle` (header, top-right). Light
  mode uses a cream palette (`html.light` token overrides). Default follows the
  OS via `prefers-color-scheme`; choice persists to `localStorage`; an inline
  script in `app/layout.tsx` applies the class pre-paint to avoid a flash.
  Verified in headless Chrome (dark default, toggle → cream, light default).
- 2026-10-18 — Added a sliding theme wipe via the View Transitions API
  (`document.startViewTransition` + `::view-transition-new(root)` clip-path in
  `globals.css`); reduced-motion and unsupported browsers fall back gracefully.
- 2026-10-18 — Replaced the hand-curated Projects list with live public GitHub
  repos for `zenthiccc` (`lib/github.ts`, `getRepos()` with `use cache` +
  `cacheLife("hours")` + `cacheTag("repos")`). Each item shows name, language
  meta, description, and a "See more in github" link. A committed
  `lib/repos.snapshot.json` (refreshed by `scripts/snapshot-repos.mjs` via
  `prebuild`) is used when the API call fails. Env: `GITHUB_USERNAME` (default
  `zenthiccc`), optional `GITHUB_TOKEN`.
- 2026-10-18 — Project items now drop the index number and show the last-pushed
  date (`pushed_at`, "Mar 2026") in the accent meta line alongside the language
  (`Language · Mon YYYY`); repos without a description render no description
  line (no placeholder).
- 2026-10-18 — Swapped the Projects language name for a brand-colored language
  icon (`components/LanguageIcon.tsx`, `simple-icons`), shown inline before the
  date; the language name is kept for screen readers (`sr-only`) and as a hover
  title. Unmapped languages fall back to the plain name.
- 2026-10-18 — Expanded the language map to ~100 common GitHub languages
  (verified against installed `simple-icons`), with a normalized
  case/space/punctuation-insensitive fallback lookup for future names).
- 2026-10-18 — Production prep for publishing: sanitized the placeholder token
  from `.env.example`, allowed it through `.gitignore`, removed the unused
  create-next-app SVGs, replaced the default README, and refreshed this file /
  `AGENTS.md` (dropped the `resume.md` references).

## Open items

- ⬜ Real company logos are in `public/logos/` (filenames unchanged).
- ⬜ Deploy target is Vercel / Node host; set `GITHUB_TOKEN` there for headroom.
- ⬜ Replace the placeholder `metadataBase` URL in `app/layout.tsx` once the
  production domain is known.
- ⬜ Optional: scheduled GitHub Action to commit `lib/repos.snapshot.json`.
- ⬜ Optional: add education section / profile photo hero.
- ⬜ Optional: real blog posts + per-post routes for "Click to read more".
