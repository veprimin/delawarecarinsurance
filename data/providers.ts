import type { HubProvider } from '@/components/hub/types';

/**
 * PLACEHOLDER ROSTER — three placeholder providers standing in for real,
 * vetted Delaware carriers. Replace with researched providers (real names,
 * verified pricing/coverage, real affiliate URLs) before this page goes live.
 * `affiliateUrl` is a `#` stub for all three until real offers are wired up.
 *
 * Ranked order is editorial: array position drives `rank`, same convention
 * as the reference `/best-ed-providers/` roster.
 */
export const providers: HubProvider[] = [
  {
    slug: 'placeholder-provider-one',
    name: 'Placeholder Provider One',
    logoUrl: '',
    logoText: 'Provider One',
    tagline: 'Sample placeholder — replace with a real Delaware carrier',
    bestFor: 'Best overall value',
    differentiators: [
      'Placeholder differentiator bullet — replace with a verified claim',
      'Placeholder differentiator bullet — replace with a verified claim',
      'Placeholder differentiator bullet — replace with a verified claim',
      'Placeholder differentiator bullet — replace with a verified claim',
    ],
    affiliateUrl: '#',
    rating: 9.68,
    userVotes: 4820,
    reviewPath: null,
    rank: 1,
  },
  {
    slug: 'placeholder-provider-two',
    name: 'Placeholder Provider Two',
    logoUrl: '',
    logoText: 'Provider Two',
    tagline: 'Sample placeholder — replace with a real Delaware carrier',
    bestFor: 'Best for discounts',
    differentiators: [
      'Placeholder differentiator bullet — replace with a verified claim',
      'Placeholder differentiator bullet — replace with a verified claim',
      'Placeholder differentiator bullet — replace with a verified claim',
    ],
    affiliateUrl: '#',
    rating: 9.42,
    userVotes: 3610,
    reviewPath: null,
    rank: 2,
  },
  {
    slug: 'placeholder-provider-three',
    name: 'Placeholder Provider Three',
    logoUrl: '',
    logoText: 'Provider Three',
    tagline: 'Sample placeholder — replace with a real Delaware carrier',
    bestFor: 'Best digital experience',
    differentiators: [
      'Placeholder differentiator bullet — replace with a verified claim',
      'Placeholder differentiator bullet — replace with a verified claim',
      'Placeholder differentiator bullet — replace with a verified claim',
    ],
    affiliateUrl: '#',
    rating: 9.15,
    userVotes: 2940,
    reviewPath: null,
    rank: 3,
  },
];
