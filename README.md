# DelawareCarInsurance

Next.js site for delawarecarinsurance.com — a comparison hub for Delaware car
insurance providers.

## Layout

The home page (`app/page.tsx`) renders through `components/hub/HubPage.tsx`,
a 1:1 port of exploretreatments.com's `/best-ed-providers/` hub template
(`components/ed/EdHubPage.tsx` in that repo): hero → quick-pick strip →
ranked provider rows → sidebar → best-overall restatement → coverage-type
cards → methodology band → long-form guide → FAQ accordion → disclaimer.
Only the copy, palette and roster are this site's own — the structure,
spacing and component behavior are unchanged from the reference.

## Providers

`data/providers.ts` currently holds **3 placeholder providers** ("Placeholder
Provider One/Two/Three") standing in for real, vetted Delaware carriers.
Replace them with researched providers (real names, verified pricing and
coverage, real affiliate URLs) before this page goes live — see the comment
at the top of that file.

## Affiliate link tracking

Affiliate links must go through `components/OutboundLink.tsx`, which forwards
stored ad params (`gclid`, `fbclid`, `utm_*`, ...) onto the destination URL
before opening it — see `lib/tracking/params.ts`. Internal links use
`components/SmartLink.tsx` so the same params carry across on-site
navigation. Never use a plain `<a>`/`window.open()` for an affiliate URL.

## Development

```
npm install
npm run dev
```

## Build

```
npm run build
```

`npm run build` produces a static export in `out/` (`output: 'export'` in
`next.config.mjs`) — there is no Next.js server at runtime.

## Hosting on Cloudflare

This site is a fully static export (`output: 'export'` in `next.config.mjs`),
so it deploys as plain static files — no Next.js server, no edge runtime,
no SSR adapter.

### Cloudflare Workers (this project's actual setup — Workers Builds, git-connected)

`wrangler.jsonc` is committed as a **Workers Static Assets** config: it has
no `main` script, just `assets.directory: "./out"`, so `wrangler deploy`
uploads the static export directly with no Worker code involved.

**This file matters more than it looks.** Without it, `wrangler deploy`
auto-detects "Next.js" and runs its OpenNext migration wizard, which expects
a full SSR build (`.next/standalone/...`) — a build our static export never
produces, and the wizard's build step fails immediately with an `ENOENT` on
`pages-manifest.json`. Committing `wrangler.jsonc` skips that wizard
entirely. If this file is ever deleted, the next deploy will regress into
that same failure.

```
npm run build       # produces out/
npm run deploy       # wrangler deploy — reads wrangler.jsonc, uploads out/
```

Local dev against the Worker: `npm run preview` (`wrangler dev`).

### Cloudflare Pages (alternative)

The same `out/` export also deploys to Pages directly, with no adapter:

**Dashboard (Git integration):**
- Framework preset: `Next.js (Static HTML Export)`
- Build command: `npm run build`
- Build output directory: `out`

**Wrangler CLI:** `npx wrangler pages deploy out`

### Response headers

`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and long-lived
caching for `/_next/static/*` are set via `public/_headers` — the static
headers convention both Workers Static Assets and Pages support. Next's own
`headers()` config isn't available under `output: 'export'`, since there's no
server to run it.

### If this site ever needs a real server feature

An API route, ISR, or per-request personalization means switching to
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) (drop
`output: 'export'`, add a `main` Worker entry) rather than bolting a server
route onto the static export — that combination doesn't build.
