export function track(eventName: string, payload: any): void {
  if (typeof window === 'undefined') return;

  try {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[track] ${eventName}:`, payload);
    }

    const dataLayerEvent = { event: eventName, ...payload };
    const w = window as any;

    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push(dataLayerEvent);
    }

    if (w.gtag) {
      w.gtag('event', eventName, payload);
    }

    if (w.fbq) {
      w.fbq('track', eventName, payload);
    }
  } catch (error) {
    console.error('[track] Error:', error);
  }
}

// Fired when a user clicks any outbound affiliate "Visit Site" button
export function trackVisitSite(payload: any): void {
  track('visit_site_clicked', payload);
}

// Fired when a user clicks a provider card (card placement)
export function trackCardClick(payload: any): void {
  track('provider_card_clicked', payload);
}

// Fired when a user clicks the #1 ranked provider CTA
export function trackTopChoice(payload: any): void {
  track('top_provider_clicked', payload);
}
