'use client';

import { ReactNode, CSSProperties, MouseEvent, useState, useEffect, useRef } from 'react';
import { getStoredParams, mergeQueryParams } from '@/lib/tracking/params';
import { track, trackVisitSite, trackCardClick, trackTopChoice } from '@/lib/tracking/events';

/**
 * The only correct way to render an affiliate link. Forwards any stored ad
 * params (gclid, fbclid, utm_*, ...) onto the destination URL and fires
 * analytics before letting the browser open the link natively in a new tab.
 *
 * Never build a plain `<a>` or call `window.open()` for an affiliate URL —
 * doing so drops the ad-param forwarding this component exists for.
 */

type OutboundLinkProps = {
  href: string;
  className?: string;
  children?: ReactNode;
  payload: {
    vertical: string;
    provider: string;
    providerSlug: string;
    placement: 'hero' | 'list' | 'card' | 'sticky' | 'footer' | 'sidebar' | 'success_stories';
    rank: number | null;
  };
  style?: CSSProperties;
  onMouseEnter?: (e: MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /** Accessible label for the anchor (useful when the whole card is the link). */
  ariaLabel?: string;
};

export default function OutboundLink({ href, className, children, payload, style, onMouseEnter, onMouseLeave, ariaLabel }: OutboundLinkProps) {
  const [finalHref, setFinalHref] = useState<string | null>(null);
  const clickInFlight = useRef(false);

  useEffect(() => {
    const storedParams = getStoredParams();
    setFinalHref(mergeQueryParams(href, storedParams, true));
  }, [href]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Stop propagation to prevent parent card click handlers from firing
    e.stopPropagation();

    // Middle-click / ctrl+click / cmd+click / shift/alt: let the browser open
    // naturally via target="_blank".
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    // Guard against double-clicks or rapid re-clicks.
    if (clickInFlight.current) {
      e.preventDefault();
      return;
    }
    clickInFlight.current = true;

    const freshParams = getStoredParams();
    const clickTimeHref = mergeQueryParams(href, freshParams, true);
    const eventPayload = { ...payload, url: clickTimeHref, paramsIncluded: true, timestamp: Date.now() };

    // Fire tracking immediately, all fire-and-forget, never block navigation.
    trackVisitSite(eventPayload);
    if (payload.placement === 'card') trackCardClick(eventPayload);
    if (payload.rank === 1) trackTopChoice(eventPayload);
    track('affiliate_cta_clicked', eventPayload);
    track('outbound_link_clicked', eventPayload);

    // Point the anchor at the freshest, fully param-forwarded affiliate URL and
    // let the browser's own target="_blank" open the new tab — a trusted user
    // gesture that popup blockers never catch.
    e.currentTarget.href = clickTimeHref;

    // Reset after 1 s, absorbs double-clicks while still allowing deliberate re-clicks.
    setTimeout(() => { clickInFlight.current = false; }, 1000);
  };

  return (
    <a
      href={finalHref ?? href}
      target="_blank"
      rel="sponsored noopener"
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      suppressHydrationWarning
    >
      {children}
    </a>
  );
}
