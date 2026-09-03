'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { parseQueryParams, storeTrackingParams, getStoredParams, getCriticalAdParams, CRITICAL_AD_PARAMS } from '@/lib/tracking/params';

/** Captures URL ad params (gclid, fbclid, utm_*, ...) on every page load and persists them to localStorage. */
function TrackingParamsListenerInner() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const search = searchParams.toString();
    const currentParams = parseQueryParams(search);

    if (Object.keys(currentParams).length) {
      const criticalParams = getCriticalAdParams(currentParams);
      const hasCriticalParams = Object.keys(criticalParams).length > 0;

      if (hasCriticalParams) {
        let trafficSource = 'unknown';
        if (criticalParams.gclid || criticalParams.gbraid || criticalParams.wbraid) {
          trafficSource = 'Google Ads';
        } else if (criticalParams.fbclid) {
          trafficSource = 'Facebook Ads';
        } else if (criticalParams.ttclid) {
          trafficSource = 'TikTok Ads';
        } else if (criticalParams.msclkid) {
          trafficSource = 'Microsoft Ads';
        } else if (criticalParams.tblci || criticalParams.taboola_click_id) {
          trafficSource = 'Taboola';
        }

        try {
          sessionStorage.setItem('traffic_type', 'paid');
          sessionStorage.setItem('traffic_source', trafficSource);
        } catch (e) {
          console.error('[TrackingParamsListener] Failed to set traffic type:', e);
        }
      }

      const existingParams = getStoredParams();
      const mergedParams = { ...existingParams, ...currentParams };
      storeTrackingParams(mergedParams);

      const cleanUrl = new URL(window.location.href);
      const paramsToClean = [...CRITICAL_AD_PARAMS, 'utm_term', 'utm_content'];
      let urlChanged = false;
      for (const p of paramsToClean) {
        if (cleanUrl.searchParams.has(p)) {
          cleanUrl.searchParams.delete(p);
          urlChanged = true;
        }
      }
      if (urlChanged) {
        const newPath =
          cleanUrl.pathname +
          (cleanUrl.searchParams.toString() ? '?' + cleanUrl.searchParams.toString() : '') +
          cleanUrl.hash;
        window.history.replaceState(null, '', newPath);
      }
    }
  }, [searchParams, pathname]);

  return null;
}

export function TrackingParamsListener() {
  return (
    <Suspense fallback={null}>
      <TrackingParamsListenerInner />
    </Suspense>
  );
}
