/**
 * Design tokens for the vertical hub template, ported 1:1 from
 * exploretreatments.com's `/best-ed-providers/` layout (components/ed/theme.ts)
 * so this page matches on colour, size and spacing rather than merely
 * resembling it.
 *
 * Centralised so a palette change is one edit rather than a sweep through six
 * components. Every token a hub component paints with resolves through a
 * `--hub-*` CSS custom property whose fallback is the default palette below —
 * a page opts into a different palette by passing `theme` to `HubPage`, which
 * declares the variables on its root element (see `hubThemeVars`).
 *
 * Because these strings are `var(...)` expressions they must only ever be used
 * in a `style` prop — never as an SVG presentation attribute like
 * `stroke="..."`, which does not resolve custom properties.
 */

/** Header/footer navy. */
export const HUB_NAVY = '#132F69';

/** Rank-tab bar and section headings. */
export const HUB_HEADING = 'var(--hub-heading, #2153b6)';

/**
 * Header bar for rows 2..N. The reference reserves the darker `HUB_HEADING`
 * for the #1 row and its bottom restatement only, which is most of how the
 * top pick reads as the top pick at a glance.
 */
export const HUB_CARD_HEADER = 'var(--hub-card-header, #99b9f9)';

/** Every call to action. Also the bullet check marks. */
export const HUB_CTA = 'var(--hub-cta, #2B6DF1)';

/** Score wording and the provider name above the bullets. */
export const HUB_ACCENT = 'var(--hub-accent, #084DAA)';

/** Hero band. */
export const HUB_HERO_BG = 'var(--hub-hero-bg, rgba(128, 167, 247, 0.15))';

/** Rank chip sitting at the left of the header bar. */
export const HUB_RANK_CHIP = '#000000';

/** Body copy. */
export const HUB_TEXT = '#212529';

export const HUB_STAR_FILL = '#F3B42C';
export const HUB_STAR_EMPTY = '#E5E5E5';

/** Card and module borders. */
export const HUB_BORDER = 'rgba(0,0,0,.125)';
export const HUB_FAQ_BORDER = 'rgba(0,0,0,.1)';

/** Card frame: shadow and the asymmetric corner rounding. */
export const HUB_CARD_SHADOW = '3px 3px 12px rgba(0,0,0,.4)';
export const HUB_CARD_RADIUS = '0 10px';

/**
 * A hub palette. Every field is required so a new page cannot half-theme
 * itself and end up with, say, green cards under a blue methodology band.
 */
export type HubTheme = {
  /** Section headings, the #1 row header bar and the methodology band. */
  heading: string;
  /** Header bar for rows 2..N. Carries white text, so keep it mid-tone. */
  cardHeader: string;
  /** Buttons, check marks, bullet dots. The brightest colour in the palette. */
  cta: string;
  /** Provider name and score wording on the ranked rows. */
  accent: string;
  /** Hero band and the interstitial offer banner. */
  heroBg: string;
  /**
   * The hero's readability wash, as bare `r, g, b` channels — the gradient
   * needs the same colour at four different alphas, so it cannot be a hex.
   */
  heroOverlayRgb: string;
  /** Coloured lift under the #1 flashcard, and its hover state. */
  glow: string;
  glowStrong: string;
};

/** Default palette, stated explicitly. Identical to the fallbacks above. */
export const DEFAULT_HUB_THEME: HubTheme = {
  heading: '#2153b6',
  cardHeader: '#99b9f9',
  cta: '#2B6DF1',
  accent: '#084DAA',
  heroBg: 'rgba(128, 167, 247, 0.15)',
  heroOverlayRgb: '236, 242, 254',
  glow: 'rgba(43, 109, 241, 0.18)',
  glowStrong: 'rgba(43, 109, 241, 0.30)',
};

/**
 * A theme as the custom-property declarations to put on a hub's root element.
 * Returns `{}` for the default palette so the page emits no inline variables
 * at all and keeps rendering off the fallbacks.
 */
export function hubThemeVars(theme?: HubTheme): React.CSSProperties {
  if (!theme) return {};
  return {
    '--hub-heading': theme.heading,
    '--hub-card-header': theme.cardHeader,
    '--hub-cta': theme.cta,
    '--hub-accent': theme.accent,
    '--hub-hero-bg': theme.heroBg,
    '--hub-hero-overlay-rgb': theme.heroOverlayRgb,
    '--hub-glow': theme.glow,
    '--hub-glow-strong': theme.glowStrong,
  } as React.CSSProperties;
}
