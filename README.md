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

## Hosting on Cloudflare Pages

This site is a fully static export, so it deploys to Cloudflare Pages
directly with no adapter or Workers runtime needed.

**Dashboard (Git integration):**
- Framework preset: `Next.js (Static HTML Export)`
- Build command: `npm run build`
- Build output directory: `out`

**Wrangler CLI:**
```
npm run build
npx wrangler pages deploy out
```

Response headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
and long-lived caching for `/_next/static/*`) are set via `public/_headers`,
Cloudflare Pages' static-headers file — `next.config.mjs`'s `headers()` isn't
available under `output: 'export'` since there's no server to run it.

If this site ever needs a real server feature (an API route, ISR, ad-hoc
personalization), switch to
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) and deploy to
Cloudflare Workers instead of extending the static export — trying to bolt
a server route onto `output: 'export'` will just fail the build.
