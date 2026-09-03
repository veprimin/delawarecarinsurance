'use client';

import { useState } from 'react';
import SmartLink from '@/components/SmartLink';

const NAV_ITEMS = [
  { label: 'Compare Providers', href: '/#rankings' },
  { label: 'Coverage Guide', href: '/#treatment-types' },
  { label: 'Methodology', href: '/#methodology' },
  { label: 'FAQs', href: '/#faq' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm" aria-label="Site header">
      <div className="container-shell py-2.5 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <SmartLink href="/" className="select-none text-xl font-bold text-neutral-900 sm:text-2xl">
            Delaware<span className="text-primary-600">CarInsurance</span>
          </SmartLink>

          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-6 text-sm font-semibold text-neutral-700 md:flex" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <SmartLink key={item.href} href={item.href} className="transition-colors duration-200 hover:text-primary-600">
                  {item.label}
                </SmartLink>
              ))}
            </nav>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 text-neutral-700 transition-colors duration-200 hover:bg-neutral-50 sm:h-10 sm:w-10 md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="mt-3 space-y-2 border-t border-neutral-200 pt-3 md:hidden" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <SmartLink
                key={item.href}
                href={item.href}
                className="block rounded-md px-2 py-2 text-sm font-semibold text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </SmartLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
