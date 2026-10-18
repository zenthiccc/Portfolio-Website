# Portfolio Website

A dark-first, single-page site
with a sticky header and an experience timeline that stays pinned while the
projects list scrolls. On small screens the timeline stacks above the projects.

Projects are pulled from GitHub at request time; profile and experience content
live in `lib/data.ts`.

## Stack

- [Next.js 16](https://nextjs.org) — App Router, TypeScript, Turbopack
- [Tailwind CSS v4](https://tailwindcss.com) — `@import "tailwindcss"` + `@theme` tokens
- [`simple-icons`](https://simple-icons.org) — brand-colored language icons
- Light/dark theming with a View Transitions wipe; the only client component is
  `components/ThemeToggle.tsx`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and adjust as needed:

| Variable           | Required | Default     | Purpose                                                        |
| ------------------ | -------- | ----------- | -------------------------------------------------------------- |
| `GITHUB_USERNAME`  | No       | `zenthiccc` | User whose public repos are shown.                             |
| `GITHUB_TOKEN`     | No       | —           | Raises the GitHub API rate limit from 60 to 5,000 requests/hr. |
| `SITE_URL`         | No       | `https://example.com` | Absolute site URL used for Open Graph metadata.      |

## Scripts

| Command                  | Description                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| `npm run dev`            | Start the dev server.                                             |
| `npm run build`          | Production build (also type-checks).                              |
| `npm run start`          | Serve the production build.                                       |
| `npm run lint`           | Run ESLint.                                                       |
| `npm run snapshot:repos` | Refresh `lib/repos.snapshot.json` from the GitHub API.            |

`prebuild` runs `snapshot:repos` automatically, so every build ships a fresh
fallback snapshot. If the GitHub API is unreachable at runtime, the site falls
back to `lib/repos.snapshot.json`.

## Project structure

```
app/                 routes, layout, global styles
components/          presentational UI
lib/
  data.ts            profile + experience content
  github.ts          getRepos() (cached fetch)
  repos.snapshot.json  committed fallback data
public/logos/        company logos
scripts/             snapshot-repos.mjs
```

## Deployment

Deploys anywhere that runs Next.js (Vercel recommended). Set `GITHUB_TOKEN` in
the host's environment for API headroom. Replace the placeholder `metadataBase`
URL in `app/layout.tsx` with the production domain.

## Notes

- Content is edited in `lib/data.ts`; projects come from GitHub rather than
  being hardcoded.
- See `AGENTS.md` for repo conventions and `progress.md` for current status.
