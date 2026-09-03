'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/tracking/events';

export function TrackEventProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    track('page_viewed', {
      path: pathname,
      ...params,
      timestamp: Date.now()
    });
  }, [pathname]);

  return <>{children}</>;
}
