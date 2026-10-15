import imperialLogo from '@/assets/clients/imperial-homes-logo.webp';
import homecoLogo from '@/assets/clients/homeco-logo.png';
import buildconnectLogo from '@/assets/clients/buildconnect-logo.png';
import nrcLogo from '@/assets/clients/nrc-logo.png';
import imperialAccountOpening from '@/assets/work/imperial-account-opening.png';
import imperialLms from '@/assets/work/imperial-lms.png';
import homecoLanding from '@/assets/work/homeco-landing-page.png';
import buildconnectLanding from '@/assets/work/buildconnect-landing-page.png';
import nrcProperty from '@/assets/work/nrc-property-management.png';

export type Screenshot = { url: string; alt: string };
export type Product = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  screenshots: Screenshot[];
  liveUrl?: string;
  features: string[];
};
export type Company = {
  slug: string;
  name: string;
  shortName: string;
  sector: string;
  summary: string;
  cover: string;
  coverAlt: string;
  theme: string;
  logoUrl?: string;
  products: Product[];
};

// Single source of truth for client work. To add a project: drop the image in
// src/assets/work, import it above, then append an object to that company's
// products array. New companies appear automatically across the site.
export const companies: Company[] = [
  {
    slug: 'imperial-homes',
    name: 'Imperial Homes Mortgage Bank',
    shortName: 'Imperial Homes',
    sector: 'Banking & financial technology',
    summary: 'Digital solutions for the mortgage and banking sector.',
    cover: imperialAccountOpening,
    coverAlt: 'Imperial Homes account opening interface',
    theme: 'banking',
    logoUrl: imperialLogo,
    products: [
      {
        slug: 'account-opening',
        name: 'Account Opening',
        category: 'Digital banking',
        summary:
          'A guided digital account opening experience that lets new customers onboard with the bank online.',
        screenshots: [{ url: imperialAccountOpening, alt: 'Imperial Homes account opening screen' }],
        features: [],
      },
      {
        slug: 'learning-management-system',
        name: 'Learning Management System',
        category: 'Enterprise software',
        summary:
          'An internal learning platform for delivering courses, tracking progress, and supporting staff development.',
        screenshots: [{ url: imperialLms, alt: 'Imperial Homes learning management system screen' }],
        features: [],
      },
    ],
  },
  {
    slug: 'homeco',
    name: 'HomeCo Development',
    shortName: 'HomeCo',
    sector: 'Real estate & property technology',
    summary: 'Digital experiences for property and real estate.',
    cover: homecoLanding,
    coverAlt: 'HomeCo landing page design',
    theme: 'property',
    logoUrl: homecoLogo,
    products: [
      {
        slug: 'homeco-landing-page',
        name: 'HomeCo Landing Page',
        category: 'Web experience',
        summary:
          'A modern marketing landing page introducing HomeCo developments and driving qualified enquiries.',
        screenshots: [{ url: homecoLanding, alt: 'HomeCo landing page' }],
        features: [],
      },
    ],
  },
  {
    slug: 'buildconnect',
    name: 'BuildConnect',
    shortName: 'BuildConnect',
    sector: 'Construction technology & marketplace',
    summary: 'Digital experiences for the construction ecosystem.',
    cover: buildconnectLanding,
    coverAlt: 'BuildConnect landing page design',
    theme: 'construction',
    logoUrl: buildconnectLogo,
    products: [
      {
        slug: 'buildconnect-landing-page',
        name: 'BuildConnect Landing Page',
        category: 'Web experience',
        summary:
          'A conversion-focused landing page presenting the BuildConnect platform and its value to the construction market.',
        screenshots: [{ url: buildconnectLanding, alt: 'BuildConnect landing page' }],
        features: [],
      },
    ],
  },
  {
    slug: 'nigerian-railway',
    name: 'Nigerian Railway Corporation',
    shortName: 'Nigerian Railway',
    sector: 'Digital solutions & enterprise technology',
    summary: 'Technology for an essential transportation institution.',
    cover: nrcProperty,
    coverAlt: 'Nigerian Railway property management platform',
    theme: 'rail',
    logoUrl: nrcLogo,
    products: [
      {
        slug: 'property-management',
        name: 'Property Management Platform',
        category: 'Enterprise software',
        summary: "A platform for managing and tracking the corporation's property and assets.",
        screenshots: [{ url: nrcProperty, alt: 'Nigerian Railway property management platform' }],
        features: [],
      },
    ],
  },
];

export const findCompany = (slug: string) => companies.find((c) => c.slug === slug);
