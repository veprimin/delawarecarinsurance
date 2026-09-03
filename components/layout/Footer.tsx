import SmartLink from '@/components/SmartLink';

const COVERAGE_LINKS = [
  { href: '/#rankings', label: 'Compare Providers' },
  { href: '/#top-picks', label: 'Top Picks' },
  { href: '/#treatment-types', label: 'Coverage Types' },
  { href: '/#methodology', label: 'Our Methodology' },
  { href: '/#faq', label: 'FAQs' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/editorial-policy', label: 'Editorial Policy' },
  { href: '/advertising-disclosure', label: 'Advertising Disclosure' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50" aria-label="Site footer">
      <div className="container-shell grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-2">
          <SmartLink href="/" className="text-xl font-bold text-neutral-900 transition-colors hover:text-primary-600">
            Delaware<span className="text-primary-600">CarInsurance</span>
          </SmartLink>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-600">
            Independent comparison platform for Delaware auto insurance. We compare coverage, pricing and quote
            experience across licensed carriers so you can find the right policy faster.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Coverage</p>
          <ul className="space-y-2 text-sm text-neutral-700">
            {COVERAGE_LINKS.map((link) => (
              <li key={link.href}>
                <SmartLink href={link.href} className="transition-colors duration-200 hover:text-primary-600">
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Company</p>
          <ul className="space-y-2 text-sm text-neutral-700">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <SmartLink href={link.href} className="transition-colors hover:text-primary-600">
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-200 bg-white">
        <div className="container-shell flex flex-col items-start justify-between gap-4 py-5 md:flex-row md:items-center">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} DelawareCarInsurance.com. All rights reserved.
          </p>
          <p className="max-w-2xl text-xs leading-relaxed text-neutral-500">
            <strong>Not Insurance Advice:</strong> Content is educational only and does not constitute insurance,
            legal, or financial advice. Confirm coverage and rates with the provider directly.{' '}
            <SmartLink href="/advertising-disclosure" className="underline hover:text-neutral-700">
              Affiliate disclosure.
            </SmartLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
