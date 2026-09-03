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
