import { Fragment, type ReactNode } from 'react';
import SmartLink from '@/components/SmartLink';
import { ConsolidatedDisclaimer } from '@/components/content/ConsolidatedDisclaimer';
import { PageEvent } from '@/components/tracking/PageEvent';
import {
  generateWebPageSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { HubFaqList } from './HubFaqList';
import { HubProviderRow, HubBestOverallPick, HubOfferBanner } from './HubProviderRow';
import { HubRankedList } from './HubRankedList';
import { HubSidebar, type RelatedLink } from './HubSidebar';
import { HubTopThreeFlashcard } from './HubTopThreeFlashcard';
import { HUB_HEADING, HUB_CTA, HUB_HERO_BG, hubThemeVars, type HubTheme } from './theme';
import type { HubProvider } from './types';

/**
 * The vertical hub page template — the structure of exploretreatments.com's
 * `/best-ed-providers/` page (components/ed/EdHubPage.tsx) lifted 1:1 so this
 * page renders through the same layout instead of inventing its own hero,
 * card style, palette and section order. Pages supply copy and a roster —
 * never layout.
 *
 * Section order is decision-first on purpose: quick picks, then the ranked
 * cards, then the supporting sections, and only then the educational content.
 * A visitor with purchase intent should never have to scroll past an essay to
 * reach a provider.
 */

export type HubLink = { href: string; label: string };

export type HubPageProps = {
  /** Tracking vertical for every affiliate payload on the page. */
  vertical: string;
  /** Page-view event. */
  pageEvent?: { name: string; payload?: Record<string, string> };

  /** Canonical path, leading and trailing slash — used for schema URLs. */
  canonical: string;
  /** Also the H1 unless `heading` overrides it. */
  metaTitle: string;
  metaDescription: string;
  heading?: string;
  /** Hero sub-line, shown from the `sm` breakpoint up. */
  intro: string;
  trustStrip?: string[];
  /** Cover photo behind the hero. Pass `null` for a flat, colour-only band. */
  heroImageUrl?: string | null;

  /** Palette. Omit for the default colours — see `theme.ts`. */
  theme?: HubTheme;

  providers: HubProvider[];
  /** Defaults to the top three of `providers`. Pass `[]` to hide the strip. */
  quickPicks?: HubProvider[];
  /** Index after which the interstitial offer banner renders. `null` hides it. */
  offerBannerAfterIndex?: number | null;
  /** Heading for the restated #1 block. `null` hides the block. */
  bestOverallHeading?: string | null;
  /**
   * The "Explore More Providers" expander under the ranked list. It reveals
   * the rest of the roster in place — it never navigates. `null` renders the
   * whole list uncollapsed. Only shows when the roster is longer than the
   * count.
   */
  showMore?: { initialVisibleCount?: number; moreLabel?: string; fewerLabel?: string } | null;

  /** Right rail. */
  sidebarArticles?: RelatedLink[];
  /** Wording and destination of the rail's guides module. */
  sidebarGuides?: { heading?: string; href?: string; linkLabel?: string };

  /** "Which coverage is right for me?" — the category explainer cards. */
  treatmentTypes?: {
    heading: string;
    intro: string;
    items: { name: string; body: string; onPage?: string }[];
    callout?: { heading: string; body: string };
  } | null;

  /** "How we evaluate" — the dark methodology band. */
  methodology?: {
    heading?: string;
    intro?: string;
    criteria?: { title: string; body: string }[];
    footnote?: string;
  } | null;

  /** Long-form guide. `children` is the body; the primitives live in HubGuide. */
  guide?: {
    heading: string;
    contents?: HubLink[];
    children: ReactNode;
    moreGuides?: RelatedLink[];
    moreGuidesHeading?: string;
  } | null;

  faqs: { q: string; a: string }[];
  faqHeading?: string;

  schema?: {
    breadcrumbName?: string;
    itemListName?: string;
    itemListDescription?: string;
  };
};

/** Default trust-strip badges shown from `sm` up. */
export const DEFAULT_TRUST_STRIP = [
  '100% Free Comparisons',
  'Delaware-Licensed Carriers',
  'No Obligation Quotes',
  'Provider & Pricing Comparisons',
];

const METHODOLOGY_INTRO =
  'Our comparison is a documentary review of what each provider publishes, checked against its own site. We do not sell insurance ourselves, and rankings are editorial, not paid placement.';

const METHODOLOGY_FOOTNOTE =
  'Editorial scores and reader vote counts shown on the cards reflect our own assessment and the votes cast on our pages. They are not a guarantee of price or availability — always confirm current rates and coverage on the provider’s own site before you buy.';

export const DEFAULT_EVALUATION_CRITERIA = [
  {
    title: 'Coverage options',
    body: 'Which coverage types a provider actually offers — liability, collision, comprehensive, uninsured motorist, and whether add-ons like roadside assistance and rental reimbursement are available.',
  },
  {
    title: 'Pricing and discounts',
    body: 'Whether starting rates are published, whether the discount stack (safe driver, multi-policy, bundling) is disclosed, and whether the quoted price is transparent before you hand over contact details.',
  },
  {
    title: 'Quote experience',
    body: 'How long an online quote takes, whether a real quote requires a phone call, and how many data points you have to hand over just to see a price.',
  },
  {
    title: 'Digital tools',
    body: 'Mobile app quality, ability to file and track a claim online, and whether policy documents and ID cards are available digitally.',
  },
  {
    title: 'Financial strength',
    body: "The carrier's published financial-strength ratings, where available, and how long it has operated in Delaware.",
  },
  {
    title: 'Overall value',
    body: 'Coverage received against price paid at the tier a typical Delaware driver would realistically buy, not the cheapest headline figure advertised.',
  },
];

const cardStyle = { border: '1px solid #e5e7eb', borderRadius: 2 } as const;

export function HubPage({
  vertical,
  pageEvent,
  canonical,
  metaTitle,
  metaDescription,
  heading,
  intro,
  trustStrip = DEFAULT_TRUST_STRIP,
  heroImageUrl = null,
  theme,
  providers,
  quickPicks,
  offerBannerAfterIndex = 1,
  bestOverallHeading = 'Best Overall Pick',
  showMore,
  sidebarArticles = [],
  sidebarGuides,
  treatmentTypes,
  methodology,
  guide,
  faqs,
  faqHeading = 'Delaware Car Insurance FAQs',
  schema,
}: HubPageProps) {
  const h1 = heading ?? metaTitle;
  const topPick = providers[0];
  const strip = quickPicks ?? providers.slice(0, 3);
  const reviewedProviders = providers.filter((provider) => provider.reviewPath);

  const methodologyConfig =
    methodology === null
      ? null
      : {
          heading: methodology?.heading ?? 'How We Evaluate Delaware Car Insurance Providers',
          intro: methodology?.intro ?? METHODOLOGY_INTRO,
          criteria: methodology?.criteria ?? DEFAULT_EVALUATION_CRITERIA,
          footnote: methodology?.footnote ?? METHODOLOGY_FOOTNOTE,
        };

  // One element per provider, so `HubRankedList` can count rows and collapse
  // the tail. The offer banner rides inside the row it follows rather than
  // being a sibling, which keeps that indexing one-to-one with `providers`.
  const rows = providers.map((provider, index) => (
    <Fragment key={provider.slug}>
      <HubProviderRow provider={provider} vertical={vertical} />
      {index === offerBannerAfterIndex && <HubOfferBanner provider={topPick} vertical={vertical} />}
    </Fragment>
  ));

  const rankedRows =
    showMore === null ? (
      <div className="space-y-4">{rows}</div>
    ) : (
      <HubRankedList
        initialVisibleCount={showMore?.initialVisibleCount}
        moreLabel={showMore?.moreLabel}
        fewerLabel={showMore?.fewerLabel}
      >
        {rows}
      </HubRankedList>
    );

  const url = `${SITE_CONFIG.domain}${canonical}`;

  const schemas = [
    generateWebPageSchema({
      name: metaTitle,
      description: metaDescription,
      url,
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: SITE_CONFIG.domain },
      { name: schema?.breadcrumbName ?? 'Car Insurance', url },
    ]),
    generateItemListSchema({
      name: schema?.itemListName ?? metaTitle,
      description: schema?.itemListDescription ?? metaDescription,
      items: providers.map((provider) => ({
        name: provider.name,
        ...(provider.reviewPath && { url: `${SITE_CONFIG.domain}${provider.reviewPath}` }),
        position: provider.rank,
      })),
    }),
    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
  ];

  // The hero's readability wash needs the same colour at four alphas, so the
  // theme carries bare `r, g, b` channels and the gradients are composed here.
  const overlay = 'var(--hub-hero-overlay-rgb, 236, 242, 254)';
  const overlayAt = (alpha: number) => `rgba(${overlay}, ${alpha})`;

  return (
    // Palette variables are declared here, so every card, rail and band inside
    // resolves against this page's colours rather than the default fallbacks.
    <div className="min-h-screen bg-white" style={hubThemeVars(theme)}>
      <PageEvent eventName={pageEvent?.name ?? 'vertical_page_viewed'} payload={pageEvent?.payload ?? { vertical }} />

      {/* --------------------------------------------------------------- 1. Hero */}
      <header className="relative isolate overflow-hidden" style={{ backgroundColor: HUB_HERO_BG }}>
        {heroImageUrl && (
          <>
            <div
              className="absolute inset-0 -z-10 bg-no-repeat bg-cover"
              style={{ backgroundImage: `url('${heroImageUrl}')`, backgroundPosition: 'right center' }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 -z-10 sm:hidden"
              style={{
                backgroundImage: `linear-gradient(to right, rgb(${overlay}) 0%, rgb(${overlay}) 45%, ${overlayAt(0.55)} 72%, ${overlayAt(0.1)} 100%)`,
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 -z-10 hidden sm:block"
              style={{
                backgroundImage: `linear-gradient(to right, rgb(${overlay}) 0%, rgb(${overlay}) 40%, ${overlayAt(0.55)} 56%, ${overlayAt(0)} 70%)`,
              }}
              aria-hidden="true"
            />
          </>
        )}

        {/* On mobile the band collapses to a short (~72px) hero showing only the
            H1; the intro copy and trust strip appear from `sm` up. */}
        <div className="container-shell flex min-h-[72px] flex-col justify-center py-2 sm:block sm:min-h-0 sm:py-9">
          <div className="max-w-2xl">
            <h1 className="text-[21px] leading-[1.15] sm:text-[36px] sm:leading-[1.1]" style={{ fontWeight: 700, color: '#000' }}>
              {h1}
            </h1>
            <p className="mt-3 hidden text-[15px] leading-relaxed sm:block sm:text-base" style={{ color: '#374151' }}>
              {intro}
            </p>
          </div>

          <ul className="mt-4 hidden flex-wrap items-center gap-x-5 gap-y-2 sm:flex">
            {trustStrip.map((item, i) => (
              <li
                key={item}
                className={`items-center gap-1.5 text-xs font-semibold sm:text-sm ${i < 2 ? 'flex' : 'hidden sm:flex'}`}
                style={{ color: '#374151' }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-none"
                  style={{ color: HUB_CTA }}
                  aria-hidden="true"
                >
                  <path d="m5 13 4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* --------------------------------------------- 2. Top 3 flashcard strip */}
      {strip.length > 0 && (
        <section id="top-picks" className="hidden scroll-mt-16 pt-6 pb-2 sm:block">
          <div className="container-shell">
            <HubTopThreeFlashcard providers={strip} vertical={vertical} />
          </div>
        </section>
      )}

      {/* ------------------- 3 + 4. Ranked rows, best pick and table, with rail */}
      <div className="container-shell pb-8 pt-4 sm:pb-10 sm:pt-5">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,915fr)_257fr]">
          <div className="min-w-0">
            <section id="rankings" className="scroll-mt-16">
              {rankedRows}

              {bestOverallHeading && (
                <HubBestOverallPick provider={topPick} vertical={vertical} heading={bestOverallHeading} />
              )}
            </section>
          </div>

          <HubSidebar
            topPick={topPick}
            articles={sidebarArticles}
            reviewedProviders={reviewedProviders}
            vertical={vertical}
            {...(sidebarGuides?.href && { guidesHref: sidebarGuides.href })}
            {...(sidebarGuides?.heading && { guidesHeading: sidebarGuides.heading })}
            {...(sidebarGuides?.linkLabel && { guidesLinkLabel: sidebarGuides.linkLabel })}
          />
        </div>
      </div>

      {/* ------------------------------------------------- 5. Which coverage is right? */}
      {treatmentTypes && (
        <section id="treatment-types" className="scroll-mt-16 py-10 sm:py-12">
          <div className="container-shell">
            <div className="max-w-3xl">
              <h2 style={{ fontSize: 20, fontWeight: 600, color: HUB_HEADING }}>{treatmentTypes.heading}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 sm:text-base">{treatmentTypes.intro}</p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {treatmentTypes.items.map((type) => (
                <div key={type.name} className="bg-white p-5" style={cardStyle}>
                  <h3 className="text-lg font-bold text-neutral-900">{type.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{type.body}</p>
                  {type.onPage && (
                    <p className="mt-3 border-t border-neutral-100 pt-3 text-sm leading-relaxed text-neutral-700">
                      <span className="font-semibold">On this page: </span>
                      {type.onPage}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {treatmentTypes.callout && (
              <div className="mt-6 border border-amber-200 bg-amber-50 p-5" style={{ borderRadius: 2 }}>
                <h3 className="text-base font-bold text-amber-900">{treatmentTypes.callout.heading}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-amber-900/90">{treatmentTypes.callout.body}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- 6. How we evaluate */}
      {methodologyConfig && (
        <section id="methodology" className="scroll-mt-16 py-10 text-white sm:py-12" style={{ backgroundColor: HUB_HEADING }}>
          <div className="container-shell">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold sm:text-3xl">{methodologyConfig.heading}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-300 sm:text-base">{methodologyConfig.intro}</p>
            </div>

            <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {methodologyConfig.criteria.map((criterion) => (
                <div key={criterion.title}>
                  <h3 className="text-base font-bold text-white">{criterion.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-400">{criterion.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-7 max-w-3xl border-t border-neutral-700 pt-5 text-sm leading-relaxed text-neutral-400">
              {methodologyConfig.footnote}
            </p>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- 8. Educational content */}
      {guide && (
        <section id="education" className="scroll-mt-16 bg-neutral-50 py-10 sm:py-12">
          <div className="container-shell">
            <div className="mx-auto max-w-3xl">
              <h2 style={{ fontSize: 20, fontWeight: 600, color: HUB_HEADING }}>{guide.heading}</h2>
              {guide.children}
            </div>

            {guide.moreGuides && guide.moreGuides.length > 0 && (
              <div className="mx-auto mt-8 max-w-3xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
                  {guide.moreGuidesHeading ?? 'More guides'}
                </h3>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {guide.moreGuides.map((link) => (
                    <li key={link.href}>
                      <SmartLink
                        href={link.href}
                        className="block bg-white p-4 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
                        style={cardStyle}
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------- 9. FAQs */}
      <section id="faq" className="scroll-mt-16 py-10 sm:py-12">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl">
            <h2 style={{ fontSize: 20, fontWeight: 600, color: HUB_HEADING }}>{faqHeading}</h2>
            <div className="mt-6">
              <HubFaqList items={faqs} />
            </div>
          </div>
        </div>
      </section>

      <div className="container-shell pb-12">
        <div className="mx-auto max-w-3xl">
          <ConsolidatedDisclaimer />
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </div>
  );
}
