import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TrackEventProvider } from '@/components/tracking/TrackEventProvider';
import { TrackingParamsListener } from '@/components/tracking/TrackingParamsListener';
import { generateBaseMetadata, generateWebsiteSchema, generateOrganizationSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  ...generateBaseMetadata({
    title: 'Delaware Car Insurance | Compare Top Providers',
    description: 'Compare Delaware car insurance providers on coverage, pricing, discounts and quote experience.',
    ogImage: SITE_CONFIG.ogImage,
  }),
  metadataBase: new URL(SITE_CONFIG.domain),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="format-detection" content="telephone=no" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </head>
      <body>
        <Suspense fallback={null}>
          <TrackingParamsListener />
        </Suspense>
        <TrackEventProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-primary-300 focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-primary-700 focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </TrackEventProvider>
      </body>
    </html>
  );
}
