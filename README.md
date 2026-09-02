# Ritu Raj Bora — Cinematic Portfolio

Next.js portfolio for Ritu Raj Bora, built around a restrained cinematic editorial system. Content is grounded in the supplied résumé; project case-study outcomes are intentionally not invented.

## Run locally

```bash
npm install
npm run dev
```

Build for production with `npm run build`, then serve with `npm run start`.

## Structure

- `app/page.tsx` contains the page composition and reusable project scene.
- `app/globals.css` contains the responsive visual system, motion tokens, and reduced-motion fallback.
- `lib/data.ts` contains verified experience, awards, roles, and languages/skills.

Quick View preference is stored in local storage. No custom cursor or external media dependency is required.
