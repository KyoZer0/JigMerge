# JigMerge

JigMerge is a Next.js site that wraps a browser-based tile-swap puzzle game.

## Project Shape

- `app/` contains the marketing site, SEO pages, blog, sitemap, and collection landing pages
- `public/game/` contains the embedded standalone puzzle game loaded by the `/` and `/play` iframes
- `app/lib/gameData.ts` is the shared catalog for live game collections used by the app layer
- `public/levels/` stores the playable puzzle images used by the embedded game

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
```

## Notes

- The embedded game is served from `public/game/index.html`
- Deep links such as `/play?collection=8&puzzle=4` pass collection state into the iframe game
- Collection metadata in the app should stay aligned with the live embedded game catalog
