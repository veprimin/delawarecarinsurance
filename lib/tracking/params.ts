const STORAGE_KEY = 'tracking_params';
export const CRITICAL_AD_PARAMS = ['gclid', 'fbclid', 'msclkid', 'ttclid', 'utm_source', 'utm_medium', 'utm_campaign', 'gbraid', 'wbraid', 'tblci', 'taboola_click_id'];

export function parseQueryParams(queryString: string): Record<string, string> {
  const params: Record<string, string> = {};

  if (!queryString) return params;

  const urlParams = new URLSearchParams(queryString);
  urlParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

export function storeTrackingParams(params: Record<string, string>): void {
  setStoredParams(params);
}

export function getStoredParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('[params] Failed to get stored params:', error);
    return {};
  }
}

export function setStoredParams(params: Record<string, string>): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch (error) {
    console.error('[params] Failed to set stored params:', error);
  }
}

export function mergeQueryParams(
  url: string,
  params: Record<string, string>,
  preserveExisting: boolean = true
): string {
  try {
    // Handle relative URLs by creating a temporary absolute URL
    const isAbsolute = url.startsWith('http://') || url.startsWith('https://');
    const baseUrl = isAbsolute ? '' : 'https://temp.com';
    const fullUrl = isAbsolute ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;

    const urlObj = new URL(fullUrl);

    Object.entries(params).forEach(([key, value]) => {
      if (!preserveExisting || !urlObj.searchParams.has(key)) {
        urlObj.searchParams.set(key, value);
      }
    });

    // Return just the path + search for relative URLs
    if (!isAbsolute) {
      return urlObj.pathname + urlObj.search + urlObj.hash;
    }

    return urlObj.toString();
  } catch (error) {
    console.error('[params] Failed to merge query params:', error);
    return url;
  }
}

export function getCriticalAdParams(params: Record<string, string>): Record<string, string> {
  const critical: Record<string, string> = {};

  CRITICAL_AD_PARAMS.forEach(key => {
    if (params[key]) {
      critical[key] = params[key];
    }
  });

  return critical;
}
