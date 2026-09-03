/**
 * Hosted on Cloudflare Pages as a static export — this site has no API
 * routes, server actions, middleware or per-request personalization, so
 * `output: 'export'` (plain static HTML/JS in `out/`) is simpler and more
 * reliable than an edge-runtime adapter. Cloudflare Pages project settings:
 * build command `npm run build`, build output directory `out`.
 *
 * `output: 'export'` drops support for next/image's optimization server,
 * next.config `redirects()`/`headers()`/`rewrites()`, and middleware — none
 * of which this site uses. Response headers instead live in `public/_headers`
 * (Cloudflare Pages' static-header mechanism).
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  images: {
    // No Image Optimization server under static export — every <img> here is
    // already a plain tag, so this only guards against a future next/image use.
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
