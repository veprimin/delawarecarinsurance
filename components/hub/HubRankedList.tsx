'use client';

import { Children, useState } from 'react';
import { HUB_CTA } from './theme';

/**
 * The ranked provider list with a "show more" expander.
 *
 * Rows beyond `initialVisibleCount` are rendered and hidden with
 * `display:none` rather than sliced out of the tree, so the markup crawlers
 * see includes every provider, the ItemList schema stays honest, and
 * expanding is instant.
 */

type HubRankedListProps = {
  /** One element per provider, already ordered — rank N is `children[N - 1]`. */
  children: React.ReactNode;
  /** Rows shown before the reader expands. */
  initialVisibleCount?: number;
  moreLabel?: string;
  fewerLabel?: string;
};

export function HubRankedList({
  children,
  initialVisibleCount = 7,
  moreLabel = 'Explore More Providers',
  fewerLabel = 'Show Fewer Providers',
}: HubRankedListProps) {
  const [showAll, setShowAll] = useState(false);

  const rows = Children.toArray(children);
  const hasMore = rows.length > initialVisibleCount;

  return (
    <>
      <div className="space-y-4">
        {rows.map((row, index) => (
          <div
            key={index}
            className={hasMore && !showAll && index >= initialVisibleCount ? 'hidden' : 'space-y-4'}
          >
            {row}
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            aria-expanded={showAll}
            className="inline-flex items-center justify-center gap-2 px-8 text-center transition-opacity hover:opacity-90"
            style={{
              backgroundColor: HUB_CTA,
              color: '#fff',
              borderRadius: 4,
              minHeight: 48,
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            {showAll ? fewerLabel : moreLabel}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: showAll ? 'rotate(180deg)' : undefined }}
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
