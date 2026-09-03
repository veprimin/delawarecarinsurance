import OutboundLink from '@/components/OutboundLink';
import { HubStars } from './HubStars';
import { HUB_CTA, HUB_ACCENT } from './theme';
import type { HubProvider } from './types';

/**
 * Top 3 flashcard strip — the three-up band directly under the hero.
 *
 * Each card is a self-contained comparison unit: brand logo and one-line
 * differentiator on the LEFT, the score + star row and the CTA stacked on the
 * RIGHT. A visitor who wants the answer rather than the analysis can act from
 * here without scrolling; anyone who wants the reasoning continues into the
 * ranked rows below.
 *
 * Two layout decisions worth keeping:
 *
 *  - The #1 pick renders in the CENTRE column via CSS `order`, not by
 *    reordering the array. DOM order stays #1, #2, #3, so the top pick is
 *    still first in the source and first for a screen reader, while the eye
 *    lands on it in the middle of the row.
 *  - The centre card is bordered in the CTA colour and lifted a few pixels so
 *    the row reads as a podium — the top pick sits proud of its neighbours.
 */

/** Tracking vertical when a page does not pass its own. */
const DEFAULT_VERTICAL = 'best-delaware-car-insurance';

/** Visual column per rank — #1 centre, #2 left, #3 right. */
const COLUMN_ORDER: Record<number, number> = { 1: 2, 2: 1, 3: 3 };

export function HubTopThreeFlashcard({
  providers,
  vertical = DEFAULT_VERTICAL,
}: {
  providers: HubProvider[];
  vertical?: string;
}) {
  return (
    <div>
      <div className="grid items-stretch gap-4 sm:grid-cols-3">
        {providers.map((provider) => {
          const isTop = provider.rank === 1;
          return (
            <div
              key={provider.slug}
              className={`relative flex flex-col rounded-2xl bg-white transition-shadow duration-200 ${
                isTop
                  ? 'shadow-[0_12px_30px_var(--hub-glow,rgba(43,109,241,0.18))] hover:shadow-[0_18px_40px_var(--hub-glow-strong,rgba(43,109,241,0.30))] p-5'
                  : 'shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_26px_rgba(0,0,0,0.13)] p-4'
              }`}
              style={{
                order: COLUMN_ORDER[provider.rank] ?? provider.rank,
                border: isTop ? `2px solid ${HUB_CTA}` : '1px solid #e5e7eb',
                transform: isTop ? 'translateY(-6px)' : undefined,
              }}
            >
              <OutboundLink
                href={provider.affiliateUrl}
                ariaLabel={`Visit ${provider.name}`}
                payload={{ vertical, provider: provider.name, providerSlug: provider.slug, placement: 'hero', rank: provider.rank }}
                className="absolute inset-0 z-[1] rounded-2xl"
                style={{ textDecoration: 'none' }}
              />

              <div className="flex flex-1 items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className={`flex items-center ${isTop ? 'h-9' : 'h-7'}`}>
                    {provider.logoUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={provider.logoUrl}
                        alt={`${provider.name} logo`}
                        width={150}
                        height={isTop ? 36 : 28}
                        style={{
                          height: isTop ? 36 : 28,
                          maxWidth: '100%',
                          objectFit: 'contain',
                          objectPosition: 'left center',
                        }}
                        loading="eager"
                      />
                    ) : (
                      <span className="truncate text-base font-bold" style={{ color: HUB_ACCENT }}>
                        {provider.name}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-[13px] leading-snug" style={{ color: '#4b5563' }}>
                    {provider.tagline}
                  </p>
                </div>

                <div className="flex flex-none flex-col items-end gap-2">
                  <div className="flex items-center gap-1.5">
                    <HubStars rating={provider.rating} size={13} />
                    <span
                      className="tabular-nums leading-none"
                      style={{ fontSize: isTop ? 22 : 20, fontWeight: 700, color: '#000' }}
                    >
                      {provider.rating.toFixed(1)}
                    </span>
                  </div>

                  <OutboundLink
                    href={provider.affiliateUrl}
                    payload={{
                      vertical,
                      provider: provider.name,
                      providerSlug: provider.slug,
                      placement: 'hero',
                      rank: provider.rank,
                    }}
                    className="relative z-[2] inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: HUB_CTA, textDecoration: 'none' }}
                  >
                    Get a Quote
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </OutboundLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
