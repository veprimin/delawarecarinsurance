import OutboundLink from '@/components/OutboundLink';
import SmartLink from '@/components/SmartLink';
import type { HubProvider } from './types';
import { HUB_HEADING as BRAND_DARK, HUB_HEADING as HUB_BLUE, HUB_CTA, HUB_BORDER } from './theme';
import { HubStars } from './HubStars';

export type RelatedLink = { href: string; label: string; description?: string };

/** Tracking vertical when a page does not pass its own. */
const DEFAULT_VERTICAL = 'best-delaware-car-insurance';

function Module({ title, children, relative = false }: { title: string; children: React.ReactNode; relative?: boolean }) {
  return (
    <section className={relative ? 'relative bg-white' : 'bg-white'} style={{ border: `1px solid ${HUB_BORDER}`, borderRadius: 0, padding: 16 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#212529', margin: '0 0 12px' }}>{title}</h2>
      {children}
    </section>
  );
}

export function HubSidebar({
  topPick,
  articles,
  reviewedProviders,
  vertical = DEFAULT_VERTICAL,
  guidesHref = '/#education',
  guidesHeading = 'Insurance Guides',
  guidesLinkLabel = 'See all guides →',
}: {
  topPick: HubProvider;
  articles: RelatedLink[];
  reviewedProviders: HubProvider[];
  /** Tracking vertical for this page. */
  vertical?: string;
  guidesHref?: string;
  guidesHeading?: string;
  guidesLinkLabel?: string;
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-16 space-y-5">
        <Module title="Editor’s Top Pick" relative>
          {/* Whole-card affiliate link, beneath the CTA button. */}
          <OutboundLink
            href={topPick.affiliateUrl}
            ariaLabel={`Visit ${topPick.name}`}
            payload={{ vertical, provider: topPick.name, providerSlug: topPick.slug, placement: 'sidebar', rank: topPick.rank }}
            className="absolute inset-0 z-[1]"
            style={{ textDecoration: 'none' }}
          />
          <div className="flex h-10 items-center">
            {topPick.logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={topPick.logoUrl}
                alt={`${topPick.name} logo`}
                width={140}
                height={36}
                style={{ height: 36, maxWidth: 140, objectFit: 'contain', objectPosition: 'left center' }}
                loading="lazy"
              />
            ) : (
              <span className="text-base font-bold" style={{ color: BRAND_DARK }}>
                {topPick.name}
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-2xl font-black leading-none tabular-nums" style={{ color: '#000' }}>
              {topPick.rating.toFixed(2)}
            </span>
            <HubStars rating={topPick.rating} />
          </div>

          <p className="mt-2 text-sm leading-snug" style={{ color: '#374151' }}>
            {topPick.tagline}
          </p>

          <OutboundLink
            href={topPick.affiliateUrl}
            payload={{
              vertical,
              provider: topPick.name,
              providerSlug: topPick.slug,
              placement: 'sidebar',
              rank: topPick.rank,
            }}
            className="relative z-[2] mt-3 flex w-full items-center justify-center px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: HUB_CTA, borderRadius: 4, textDecoration: 'none' }}
          >
            Get a Quote
          </OutboundLink>
        </Module>

        {articles.length > 0 && (
          <Module title={guidesHeading}>
            <ul className="space-y-3">
              {articles.slice(0, 5).map((article) => (
                <li key={article.href} className="border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0">
                  <SmartLink
                    href={article.href}
                    className="block text-sm font-semibold leading-snug hover:underline"
                    style={{ color: BRAND_DARK }}
                  >
                    {article.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
            <SmartLink
              href={guidesHref}
              className="mt-3 inline-block text-xs font-bold underline underline-offset-2"
              style={{ color: HUB_BLUE }}
            >
              {guidesLinkLabel}
            </SmartLink>
          </Module>
        )}

        {reviewedProviders.length > 0 && (
          <Module title="Provider Reviews">
            <ul className="space-y-3">
              {reviewedProviders.slice(0, 5).map((provider) => (
                <li
                  key={provider.slug}
                  className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold" style={{ color: BRAND_DARK }}>
                    {provider.name}
                  </span>
                  <SmartLink
                    href={provider.reviewPath as string}
                    className="flex-none text-xs font-bold underline underline-offset-2"
                    style={{ color: HUB_BLUE }}
                  >
                    Learn more
                  </SmartLink>
                </li>
              ))}
            </ul>
          </Module>
        )}

        <Module title="How We Rank">
          <ul className="space-y-2 text-sm leading-snug" style={{ color: '#374151' }}>
            <li>Only figures a provider publishes on its own site.</li>
            <li>No paid placement — rankings are editorial.</li>
            <li>Unverifiable numbers are shown as “not published”.</li>
            <li>Pricing and coverage details are checked against the provider's own site.</li>
          </ul>
          <a
            href="#methodology"
            className="mt-3 inline-block text-xs font-bold underline underline-offset-2"
            style={{ color: HUB_BLUE }}
          >
            Read our full methodology →
          </a>
        </Module>
      </div>
    </aside>
  );
}
