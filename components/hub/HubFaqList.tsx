'use client';

import { useState } from 'react';
import { HUB_HEADING, HUB_TEXT, HUB_FAQ_BORDER, HUB_CTA } from './theme';

/**
 * Flat grey FAQ bars with an accordion.
 *
 * Each row is a real `<button>` with `aria-expanded` and a controlled region,
 * so the accordion is operable by keyboard and announced correctly. Answers
 * stay in the DOM when collapsed (hidden, not unmounted) so the FAQPage
 * structured data on the page always has visible-on-expand backing text.
 */
export function HubFaqList({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2.5">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.q} style={{ border: `1px solid ${HUB_FAQ_BORDER}`, borderRadius: 4 }}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`hub-faq-panel-${index}`}
                id={`hub-faq-button-${index}`}
                className="flex w-full items-center justify-between gap-3 text-left"
                style={{ padding: '8px 16px', minHeight: 48, backgroundColor: '#fff', color: HUB_TEXT, fontSize: 16 }}
              >
                <span>{item.q}</span>
                <span className="relative flex-none" style={{ width: 14, height: 14 }} aria-hidden="true">
                  <span
                    className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded"
                    style={{ backgroundColor: HUB_CTA }}
                  />
                  <span
                    className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded transition-transform duration-200"
                    style={{ backgroundColor: HUB_CTA, transform: isOpen ? 'scaleY(0)' : 'scaleY(1)' }}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`hub-faq-panel-${index}`}
              role="region"
              aria-labelledby={`hub-faq-button-${index}`}
              hidden={!isOpen}
              className="bg-white leading-relaxed"
              style={{ padding: '0 16px 12px', color: HUB_TEXT, fontSize: 16 }}
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
