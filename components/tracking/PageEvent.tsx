'use client';

import { useEffect, useRef, useMemo } from 'react';
import { track } from '@/lib/tracking/events';

export function PageEvent({ eventName, payload }: { eventName: string; payload: Record<string, string> }) {
  const hasTracked = useRef(false);
  const payloadString = useMemo(() => JSON.stringify(payload), [payload]);

  useEffect(() => {
    if (!hasTracked.current) {
      track(eventName, { ...payload, timestamp: Date.now() });
      hasTracked.current = true;
    }
  }, [eventName, payload, payloadString]);

  return null;
}
