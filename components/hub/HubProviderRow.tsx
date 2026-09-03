import OutboundLink from '@/components/OutboundLink';
import { HubStars } from './HubStars';
import {
  HUB_HEADING,
  HUB_CARD_HEADER,
  HUB_CTA,
  HUB_ACCENT,
  HUB_RANK_CHIP,
  HUB_TEXT,
  HUB_CARD_SHADOW,
  HUB_CARD_RADIUS,
  HUB_HERO_BG,
} from './theme';
import { scoreWording } from '@/lib/ratings';
import type { HubProvider } from './types';

/**
 * Ranked provider row, ported 1:1 from the exploretreatments.com
 * `/best-ed-providers/` layout spec:
 *
 *   card        shadow 3px 3px 12px rgba(0,0,0,.4), radius 0 10px, mb 16px
 *   header      32px tall, black rank chip padded 4px 16px,
 *               provider name 16px/500 white
 *   columns     25% / 50% / 25% (229 / 458 / 229 of 915), padding 0 16px /
 *               16px / 0 16px
 *   name line   16px, 700
 *   bullets     16px, 8px apart, check mark at 12px, 16px gap
 *   score grid  2 columns — wording over stars on the left, the score itself
 *               spanning both rows on the right, 24px/700 (30px from `md`)
 *   CTA         radius 4px, 42px tall, ~18.7px/500
 *
 * The structure is what is borrowed. Every score, bullet and sentence rendered
 * through it is ours.
 */

/** Tracking vertical when a page does not pass its own. */
const DEFAULT_VERTICAL = 'best-delaware-car-insurance';

function CheckMark() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ stroke: HUB_CTA, flexShrink: 0, marginTop: 5 }}
      aria-hidden="true"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function ProviderLogo({ provider, height = 40 }: { provider: HubProvider; height?: number }) {
  if (!provider.logoUrl) {
    return <span style={{ color: HUB_ACCENT, fontSize: 18, fontWeight: 700 }}>{provider.logoText}</span>;
  }
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={provider.logoUrl}
      alt={`${provider.name} logo`}
      width={150}
      height={height}
      style={{ height, maxWidth: '100%', objectFit: 'contain' }}
      loading={provider.rank <= 3 ? 'eager' : 'lazy'}
    />
  );
}

/** Big number over the score wording over the stars, stacked and centered. */
function RatingBlock({ provider }: { provider: HubProvider }) {
  return (
    <div className="flex flex-col items-center" style={{ rowGap: 2, marginBottom: 4 }}>
      <span
        className="text-[24px] md:text-[30px]"
        style={{ fontWeight: 700, color: '#000', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}
      >
        {provider.rating.toFixed(2)}
      </span>
      <p style={{ fontSize: 18, fontWeight: 600, color: HUB_ACCENT, margin: 0, lineHeight: 1.2 }}>
        {scoreWording(provider.rating)}
      </p>
      <HubStars rating={provider.rating} />
    </div>
  );
}

function VisitButton({
  provider,
  placement,
  vertical,
}: {
  provider: HubProvider;
  placement: 'card' | 'list';
  vertical: string;
}) {
  return (
    <OutboundLink
      href={provider.affiliateUrl}
      payload={{
        vertical,
        provider: provider.name,
        providerSlug: provider.slug,
        placement,
        rank: provider.rank,
      }}
      className="flex w-full items-center justify-center"
      style={{
        backgroundColor: HUB_CTA,
        color: '#fff',
        borderRadius: 4,
        height: 42,
        fontSize: 18.67,
        fontWeight: 500,
        textDecoration: 'none',
        lineHeight: 1,
      }}
    >
      Get a Quote
    </OutboundLink>
  );
}

export function HubProviderRow({
  provider,
  /**
   * The Best Overall Pick block renders row #1 a second time; that copy must
   * not carry the anchor id again, or the jump links resolve to whichever node
   * the browser finds first.
   */
  duplicate = false,
  vertical = DEFAULT_VERTICAL,
}: {
  provider: HubProvider;
  duplicate?: boolean;
  /** Tracking vertical for this page. */
  vertical?: string;
}) {
  return (
    <div
      {...(duplicate ? {} : { id: `provider-${provider.slug}` })}
      className="relative scroll-mt-24 bg-white shadow-[3px_3px_12px_rgba(0,0,0,0.4)] transition-shadow duration-200 hover:shadow-[3px_3px_22px_rgba(0,0,0,0.55)]"
      style={{ borderRadius: HUB_CARD_RADIUS, overflow: 'hidden' }}
    >
      {/* Whole-card affiliate link. It sits beneath the CTA buttons (z-index),
          so those keep their own tracking while a click anywhere else on the
          row still opens the provider. */}
      <OutboundLink
        href={provider.affiliateUrl}
        ariaLabel={`Visit ${provider.name}`}
        payload={{ vertical, provider: provider.name, providerSlug: provider.slug, placement: 'card', rank: provider.rank }}
        className="absolute inset-0 z-[1]"
        style={{ textDecoration: 'none' }}
      />

      {/* Header bar: black rank chip, then the provider name. Only the top
          pick (and its restatement below the list) gets the dark heading tone;
          the rest of the list runs on the lighter tone. */}
      <div
        className="flex items-center"
        style={{ backgroundColor: provider.rank === 1 ? HUB_HEADING : HUB_CARD_HEADER, height: 32 }}
      >
        <p
          className="m-0 tabular-nums"
          style={{ backgroundColor: HUB_RANK_CHIP, color: '#fff', fontSize: 16, padding: '4px 16px', lineHeight: 1.5 }}
        >
          {String(provider.rank).padStart(2, '0')}
        </p>
        <p className="m-0 truncate" style={{ color: '#fff', fontSize: 16, fontWeight: 500, padding: '0 16px' }}>
          {provider.name}
        </p>
      </div>

      {/* Body: 25 / 50 / 25 on desktop; stacked on mobile with the logo and the
          score sharing the first line. */}
      <div className="flex flex-wrap items-center md:flex-nowrap">
        {/* Logo — takes the remaining width on mobile and shrinks (min-w-0) so a
            wide logo can never push the score block off the row; fixed column on
            desktop. */}
        <div
          className="order-1 flex min-w-0 flex-1 items-center justify-start md:w-1/4 md:flex-none md:justify-center"
          style={{ padding: '16px' }}
        >
          <ProviderLogo provider={provider} />
        </div>

        {/* Score + CTA — beside the logo on mobile (flex-none so it keeps its
            width), right column on desktop */}
        <div
          className="order-2 flex flex-none flex-col items-center justify-center md:order-3 md:w-1/4"
          style={{ padding: '0 16px' }}
        >
          <RatingBlock provider={provider} />
          <span className="hidden md:block" style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
            {provider.userVotes.toLocaleString('en-US')} user votes
          </span>
          <div className="relative z-[2] hidden w-full md:block">
            <VisitButton provider={provider} placement="card" vertical={vertical} />
          </div>
        </div>

        {/* Headline + bullets */}
        <div className="order-3 w-full md:order-2 md:w-1/2" style={{ padding: 16, minWidth: 0 }}>
          <p style={{ color: HUB_ACCENT, fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{provider.tagline}</p>

          <ul className="m-0 list-none p-0">
            {provider.differentiators.slice(0, 5).map((point) => (
              <li
                key={point}
                className="flex items-start"
                style={{ fontSize: 16, color: HUB_TEXT, marginBottom: 8, gap: 16, lineHeight: 1.4 }}
              >
                <CheckMark />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="relative z-[2] mt-3 md:hidden">
            <VisitButton provider={provider} placement="card" vertical={vertical} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** "Best Overall Pick" — the #1 row restated below the list. */
export function HubBestOverallPick({
  provider,
  vertical = DEFAULT_VERTICAL,
  heading = 'Best Overall Pick',
}: {
  provider: HubProvider;
  vertical?: string;
  heading?: string;
}) {
  return (
    <section aria-label="Best overall pick" className="mt-10">
      <h2 className="text-center" style={{ fontSize: 20, fontWeight: 600, color: HUB_HEADING, marginBottom: 12 }}>
        {heading}
      </h2>
      <HubProviderRow provider={provider} duplicate vertical={vertical} />
    </section>
  );
}

/**
 * Interstitial offer banner between ranked rows. It restates a provider's own
 * published positioning — never a discount, deadline or scarcity claim we
 * invented.
 */
export function HubOfferBanner({
  provider,
  vertical = DEFAULT_VERTICAL,
}: {
  provider: HubProvider;
  vertical?: string;
}) {
  return (
    <div
      className="relative flex flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:gap-5"
      style={{ boxShadow: HUB_CARD_SHADOW, borderRadius: HUB_CARD_RADIUS, backgroundColor: HUB_HERO_BG }}
    >
      {/* Whole-banner affiliate link, beneath the CTA button. */}
      <OutboundLink
        href={provider.affiliateUrl}
        ariaLabel={`Visit ${provider.name}`}
        payload={{ vertical, provider: provider.name, providerSlug: provider.slug, placement: 'list', rank: provider.rank }}
        className="absolute inset-0 z-[1]"
        style={{ textDecoration: 'none' }}
      />

      <div className="flex flex-none items-center" style={{ height: 32 }}>
        <ProviderLogo provider={provider} height={28} />
      </div>

      <div className="min-w-0 flex-1 text-center">
        <p
          className="text-[12px] leading-tight sm:text-[24px] sm:leading-[1.2]"
          style={{ fontWeight: 700, color: '#000', margin: 0 }}
        >
          {provider.tagline}
        </p>
        <p className="text-[13px] sm:text-[16px]" style={{ color: HUB_TEXT, margin: '2px 0 0' }}>
          Our #{provider.rank} pick · {provider.bestFor}
        </p>
      </div>

      <div className="relative z-[2] w-full flex-none sm:w-[197px]">
        <VisitButton provider={provider} placement="list" vertical={vertical} />
      </div>
    </div>
  );
}
