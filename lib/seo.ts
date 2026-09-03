import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'Delaware Car Insurance',
  domain: 'https://www.delawarecarinsurance.com',
  description: 'Compare Delaware car insurance providers on coverage, pricing and quote experience.',
  logo: 'https://www.delawarecarinsurance.com/images/logo.png',
  ogImage: 'https://www.delawarecarinsurance.com/images/home_hero.png',
} as const;

/**
 * Bing flags meta descriptions outside ~25–160 chars, which can reduce
 * indexing reliability and ranking. Truncates on a word boundary.
 */
export const clampDescription = (text: string, max = 160): string => {
  const t = text.trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.domain}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    description: SITE_CONFIG.description,
    publisher: {
      '@id': `${SITE_CONFIG.domain}/#organization`,
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.domain}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    description: SITE_CONFIG.description,
    areaServed: {
      '@type': 'State',
      name: 'Delaware',
    },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'DE',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${SITE_CONFIG.domain}/contact`,
    },
  };
}

export function generateWebPageSchema({ name, description, url }: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
    },
  };
}

export function generateItemListSchema({
  name,
  description,
  items,
}: {
  name: string;
  description: string;
  items: Array<{ name: string; url?: string; position: number }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      ...(item.url && { url: item.url }),
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqItems: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateBaseMetadata({
  title,
  description: rawDescription,
  canonical,
  noindex = false,
  ogImage,
}: {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
}): Metadata {
  const description = clampDescription(rawDescription);
  const fullUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : canonical.includes('?') || canonical.includes('#') || canonical.endsWith('/')
        ? `${SITE_CONFIG.domain}${canonical}`
        : `${SITE_CONFIG.domain}${canonical}/`
    : undefined;

  return {
    title,
    description,
    metadataBase: new URL(SITE_CONFIG.domain),
    ...(fullUrl && { alternates: { canonical: fullUrl } }),
    ...(noindex && { robots: { index: false, follow: false } }),
    openGraph: {
      title,
      description,
      ...(fullUrl && { url: fullUrl }),
      siteName: SITE_CONFIG.name,
      type: 'website',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}
