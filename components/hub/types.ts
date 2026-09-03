/**
 * The provider shape every hub surface renders from — exactly the fields the
 * ranked row, the flashcard strip and the sidebar actually read.
 */
export type HubProvider = {
  slug: string;
  name: string;
  /** Empty string falls back to `logoText`. */
  logoUrl: string;
  logoText: string;
  /** Punchy one-liner: what it is, then the number that matters. */
  tagline: string;
  /** Positioning badge — a differentiator, not a compliment. */
  bestFor: string;
  /** 3–5 benefit bullets; only the first five render. */
  differentiators: string[];
  affiliateUrl: string;
  rating: number;
  userVotes: number;
  /** Standalone review, when one exists. */
  reviewPath: string | null;
  /** Position in the visible list, 1-based. */
  rank: number;
};
