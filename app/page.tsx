import {
  HubGuideCards,
  HubGuideContents,
  HubGuideHeading,
  HubGuideList,
  HubGuideTable,
  HubGuideText,
  HubAuthorityLink,
} from '@/components/hub/HubGuide';
import { HubPage } from '@/components/hub/HubPage';
import { providers } from '@/data/providers';
import { FAQS } from '@/data/faqs';
import { generateBaseMetadata } from '@/lib/seo';

/**
 * Home page — the Delaware car insurance comparison experience, built on
 * `components/hub/HubPage`, a 1:1 layout port of exploretreatments.com's
 * `/best-ed-providers/` page (components/ed/EdHubPage.tsx in that repo).
 *
 * The layout (hero, quick-pick strip, ranked rows, sidebar, coverage-type
 * cards, methodology band, long-form guide, FAQ accordion, disclaimer) is
 * the reference structure, unchanged. Only the copy and the roster are
 * Delaware Car Insurance's own — this file is copy and data, not markup.
 */

const META_TITLE = 'Best Delaware Car Insurance Providers of 2026';
const META_DESCRIPTION =
  'Compare the best Delaware car insurance providers of 2026 — coverage, pricing and discounts ranked side by side.';

const CANONICAL = '/';

export async function generateMetadata() {
  return generateBaseMetadata({
    title: META_TITLE,
    description: META_DESCRIPTION,
    canonical: CANONICAL,
  });
}

const COVERAGE_TYPES = [
  {
    name: 'Liability coverage',
    body: 'Pays for the other driver’s injuries and property damage when you are at fault. Delaware requires at least 25/50/10 — $25,000 per person and $50,000 per accident for bodily injury, plus $10,000 for property damage.',
    onPage: 'Every provider on this page publishes its liability limits and starting rate for Delaware’s state minimum.',
  },
  {
    name: 'Personal Injury Protection (PIP)',
    body: 'Delaware requires PIP regardless of fault — it covers your own medical bills and lost wages after an accident, before liability from the other driver comes into play.',
    onPage: 'Required on every policy written in Delaware; the providers here include it by default at the state minimum.',
  },
  {
    name: 'Collision coverage',
    body: 'Pays to repair or replace your own vehicle after a crash, regardless of fault. Optional under Delaware law, but usually required by a lender if you are financing or leasing.',
    onPage: 'Available as an add-on from every provider compared here, at varying deductible levels.',
  },
  {
    name: 'Comprehensive coverage',
    body: 'Covers non-collision damage — theft, vandalism, weather, animal strikes. Also optional, and also commonly required alongside collision by a lender.',
    onPage: 'Bundled with collision in most of the plans shown on this page.',
  },
  {
    name: 'Uninsured/underinsured motorist coverage',
    body: 'Pays your costs when the at-fault driver has no insurance or not enough. Delaware has a meaningful share of uninsured drivers, which is why several carriers include it by default rather than as a pure opt-in.',
    onPage: 'Offered by every provider on this page; check whether it is included or priced separately.',
  },
  {
    name: 'Gap insurance',
    body: 'Covers the difference between what you owe on a loan or lease and what the car is actually worth if it is totaled. Worth considering on a newer vehicle with a small down payment.',
    onPage: 'Available as an optional add-on from select providers — confirm availability directly with the carrier.',
  },
];

export default function HomePage() {
  return (
    <HubPage
      vertical="best-delaware-car-insurance"
      canonical={CANONICAL}
      metaTitle={META_TITLE}
      metaDescription={META_DESCRIPTION}
      heading="Best Delaware Car Insurance Providers of 2026"
      intro="Top providers ranked on coverage, starting price, discounts and how fast you can actually get a quote."
      providers={providers}
      schema={{
        itemListName: 'Best Delaware Car Insurance Providers of 2026',
        itemListDescription: 'Delaware car insurance providers compared on coverage, price, discounts and quote experience',
      }}
      treatmentTypes={{
        heading: 'Which Coverage Is Right for Me?',
        intro:
          'Delaware sets a legal floor — liability plus PIP — but the right policy for you is usually more than the minimum. The categories below cover what each type of coverage actually does, so you can decide what to add before you compare quotes.',
        items: COVERAGE_TYPES,
        callout: {
          heading: 'Delaware’s minimum is not automatically enough',
          body: 'The state-required 25/50/10 liability limits can be exhausted quickly by a serious accident, leaving you personally responsible for the rest. Many Delaware drivers carry higher liability limits than the minimum for that reason — talk to a licensed agent about what limit fits your situation before you buy.',
        },
      }}
      guide={{
        heading: 'The Complete Guide to Delaware Car Insurance in 2026',
        children: (
          <>
            <HubGuideContents
              items={[
                { href: '#requirements', label: 'Delaware’s minimum requirements' },
                { href: '#rate-factors', label: 'What affects your rate' },
                { href: '#lower-rate', label: 'How to lower your premium' },
                { href: '#sr22', label: 'SR-22 in Delaware' },
                { href: '#switching', label: 'Switching providers' },
              ]}
            />

            <HubGuideHeading id="requirements">Delaware’s minimum car insurance requirements</HubGuideHeading>
            <HubGuideText first>
              Delaware law requires every registered vehicle to carry liability insurance of at least $25,000 per
              person and $50,000 per accident for bodily injury, plus $10,000 for property damage — commonly written
              as 25/50/10. Delaware also requires Personal Injury Protection (PIP) of at least $15,000 per person and
              $30,000 per accident, which pays your own medical bills and lost wages regardless of who caused the
              crash. For the current, authoritative figures, check the{' '}
              <HubAuthorityLink href="https://insurance.delaware.gov/">
                Delaware Department of Insurance
              </HubAuthorityLink>
              , since minimums can change and this page is not a substitute for the state’s own published
              requirements.
            </HubGuideText>
            <HubGuideList
              items={[
                '$25,000 bodily injury liability per person',
                '$50,000 bodily injury liability per accident',
                '$10,000 property damage liability',
                '$15,000 / $30,000 Personal Injury Protection (PIP)',
              ]}
            />

            <HubGuideHeading id="rate-factors">What affects your rate in Delaware</HubGuideHeading>
            <HubGuideText first>
              Delaware rates run higher than the national average in most comparisons, driven in part by dense
              corridors like I-95 and Wilmington-area traffic. Within that baseline, insurers price individual
              policies on the factors below.
            </HubGuideText>
            <HubGuideCards
              columns={3}
              items={[
                {
                  title: 'Driving record',
                  points: ['At-fault accidents', 'Moving violations', 'DUI/DWI history', 'Years licensed'],
                },
                {
                  title: 'Vehicle & usage',
                  points: ['Make, model and age', 'Annual mileage', 'Where the car is garaged', 'Safety features'],
                },
                {
                  title: 'Coverage choices',
                  points: ['Liability limits selected', 'Deductible on collision/comprehensive', 'Add-ons like gap or roadside', 'Bundling with other policies'],
                },
              ]}
            />

            <HubGuideHeading id="lower-rate">How to lower your Delaware car insurance premium</HubGuideHeading>
            <HubGuideText first>
              The fastest lever is usually shopping around — rates for an identical driver and vehicle can differ
              significantly between carriers, which is the reason to compare more than one quote rather than
              renewing on autopilot. Beyond that:
            </HubGuideText>
            <HubGuideList
              items={[
                'Ask about safe-driver, good-student and low-mileage discounts',
                'Bundle auto with a renters or homeowners policy where available',
                'Raise your collision/comprehensive deductible if you can cover it out of pocket',
                'Enroll in a telematics or usage-based program if your driving is genuinely low-risk',
                'Re-shop at renewal instead of letting a policy auto-renew for years',
              ]}
            />

            <HubGuideHeading id="sr22">SR-22 in Delaware</HubGuideHeading>
            <HubGuideText first>
              An SR-22 is a certificate of financial responsibility your insurer files with the state, usually
              required after a DUI, a serious at-fault accident, or driving without insurance. Not every provider
              files SR-22s, and those that do typically charge a higher premium for the higher-risk profile. If you
              need one, confirm directly with a provider before you buy that it will file on your behalf.
            </HubGuideText>

            <HubGuideHeading id="switching">Switching Delaware car insurance providers</HubGuideHeading>
            <HubGuideText first>
              Get a quote from the provider you are moving to and confirm the new policy’s effective date before
              canceling your current one — a coverage lapse, even a short one, can raise your future rates
              independent of your driving record. Once the new policy is active, cancel the old one and confirm you
              will not be billed for an overlapping period.
            </HubGuideText>

            <HubGuideHeading>Delaware minimums at a glance</HubGuideHeading>
            <HubGuideTable
              headers={['Coverage', 'Delaware minimum', 'Required?']}
              rows={[
                ['Bodily injury liability', '$25,000/$50,000', 'Required'],
                ['Property damage liability', '$10,000', 'Required'],
                ['Personal Injury Protection (PIP)', '$15,000/$30,000', 'Required'],
                ['Collision', 'N/A', 'Optional (often lender-required)'],
                ['Comprehensive', 'N/A', 'Optional (often lender-required)'],
                ['Uninsured/underinsured motorist', 'Varies by carrier', 'Optional'],
              ]}
            />
          </>
        ),
      }}
      faqs={FAQS}
    />
  );
}
