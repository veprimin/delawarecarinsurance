import type { ReactNode } from 'react';
import SmartLink from '@/components/SmartLink';
import { HUB_HEADING, HUB_CTA, HUB_TEXT } from './theme';

/**
 * Building blocks for the long-form guide section of the hub page. All of
 * these are server components: no state, no hooks, no `use client`.
 */

/** "What is on this page" jump list that opens the guide. */
export function HubGuideContents({ items }: { items: { href: string; label: string }[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Guide contents" className="mt-4 bg-white p-4" style={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: HUB_HEADING }}>
        What is on this page
      </p>
      <ul className="mt-2 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href} className="flex items-start gap-2 text-sm">
            <span className="mt-2 h-1 w-1 flex-none rounded-full" style={{ backgroundColor: HUB_CTA }} aria-hidden="true" />
            <a href={item.href} className="font-medium underline underline-offset-2 hover:opacity-80" style={{ color: HUB_HEADING }}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Section heading inside the guide. Pass `id` when it is a contents target. */
export function HubGuideHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3 {...(id ? { id } : {})} className={id ? 'mt-8 scroll-mt-16' : 'mt-7'} style={{ fontSize: 20, fontWeight: 600, color: HUB_HEADING }}>
      {children}
    </h3>
  );
}

/** Body paragraph. `first` tightens the gap under a heading. */
export function HubGuideText({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return (
    <p className={first ? 'mt-2 leading-relaxed' : 'mt-3 leading-relaxed'} style={{ fontSize: 16, color: HUB_TEXT }}>
      {children}
    </p>
  );
}

/** Bulleted list, one or two columns. */
export function HubGuideList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`mt-3 grid gap-2 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-[15px] leading-snug text-neutral-700">
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full" style={{ backgroundColor: HUB_CTA }} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Grid of bordered cards. */
export function HubGuideCards({
  items,
  columns = 3,
}: {
  items: { title: string; note?: string; body?: string; points?: string[] }[];
  columns?: 1 | 2 | 3;
}) {
  const grid = columns === 3 ? 'md:grid-cols-3' : columns === 2 ? 'md:grid-cols-2' : '';
  return (
    <div className={`mt-4 grid gap-4 ${grid}`}>
      {items.map((item) => (
        <div key={item.title} className="bg-white p-4 sm:p-5" style={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
          <h4 className="text-base font-bold" style={{ color: HUB_HEADING }}>
            {item.title}
          </h4>
          {item.note && <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">{item.note}</p>}
          {item.body && <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-700">{item.body}</p>}
          {item.points && item.points.length > 0 && (
            <ul className="mt-2.5 space-y-1.5">
              {item.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm leading-snug text-neutral-700">
                  <span className="mt-1.5 h-1 w-1 flex-none rounded-full" style={{ backgroundColor: HUB_CTA }} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Comparison table. The first cell of each row renders as a row header, so the
 * table stays navigable when it scrolls sideways on a phone.
 */
export function HubGuideTable({
  headers,
  rows,
  minWidth = '46rem',
}: {
  headers: string[];
  rows: string[][];
  minWidth?: string;
}) {
  return (
    <div className="mt-4 overflow-x-auto bg-white" style={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
      <table className="w-full border-collapse text-left" style={{ minWidth }}>
        <thead>
          <tr className="text-white" style={{ backgroundColor: HUB_HEADING }}>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-neutral-200 align-top even:bg-neutral-50/70">
              <th scope="row" className="px-4 py-3 text-left text-sm font-bold" style={{ color: HUB_HEADING }}>
                {row[0]}
              </th>
              {row.slice(1).map((cell, index) => (
                <td key={`${row[0]}-${index}`} className="px-4 py-3 text-sm text-neutral-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Safety / caveat box. */
export function HubGuideCallout({
  title,
  children,
  tone = 'amber',
}: {
  title: string;
  children: ReactNode;
  tone?: 'amber' | 'neutral';
}) {
  if (tone === 'neutral') {
    return (
      <div className="mt-6 bg-white p-5" style={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <h3 className="text-base font-bold text-neutral-900">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">{children}</p>
      </div>
    );
  }
  return (
    <div className="mt-6 border border-amber-200 bg-amber-50 p-5" style={{ borderRadius: 2 }}>
      <h3 className="text-base font-bold text-amber-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-amber-900/90">{children}</p>
    </div>
  );
}

/** Inline on-site link — SmartLink, so stored ad params survive the hop. */
export function HubGuideLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SmartLink href={href} className="font-semibold underline underline-offset-2" style={{ color: HUB_HEADING }}>
      {children}
    </SmartLink>
  );
}

/**
 * Outbound link to an authority source (DMV, state insurance department,
 * NAIC, etc). Deliberately a plain anchor: these are citations, not
 * affiliate links, and must never be routed through `OutboundLink`.
 */
export function HubAuthorityLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2" style={{ color: HUB_HEADING }}>
      {children}
    </a>
  );
}
