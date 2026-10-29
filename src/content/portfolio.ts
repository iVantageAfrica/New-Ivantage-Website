import imperialLogo from "@/assets/clients/imperial-homes-logo.webp";
import homebaseLogo from "@/assets/clients/homebase-logo.png";
import homecoLogo from "@/assets/clients/homeco-logo.png";
import zylusLogo from "@/assets/clients/zylus-logo.png";
import buildconnectLogo from "@/assets/clients/buildconnect-logo.png";
import nrcLogo from "@/assets/clients/nrc-logo.png";
import imperialAccountOpening from "@/assets/work/imperial-account-opening.webp";
import imperialPlus from "@/assets/work/imperial-plus-app.webp";
import imperialLms from "@/assets/work/imperial-lms.webp";
import homecoLanding from "@/assets/work/homeco-landing-page.webp";
import buildconnectLanding from "@/assets/work/buildconnect-landing-page.webp";
import nrcProperty from "@/assets/work/nrc-property-management.webp";

export type Screenshot = { url: string; alt: string };

// Businesses iVantage works with, shown in the home logo strip. Entries with a
// companySlug link to a portfolio page; the rest are relationship logos only.
export type Client = {
  name: string;
  shortName: string;
  sector: string;
  logoUrl: string;
  companySlug?: string;
  variant?: "mark" | "stacked";
};

export const clients: Client[] = [
  {
    name: "Imperial Homes Mortgage Bank",
    shortName: "Imperial Homes",
    sector: "Banking & mortgage",
    logoUrl: imperialLogo,
    companySlug: "imperial-homes",
    variant: "mark",
  },
  {
    name: "Homebase Mortgage Bank",
    shortName: "Homebase",
    sector: "Mortgage banking",
    logoUrl: homebaseLogo,
    variant: "mark",
  },
  {
    name: "HomeCo Development",
    shortName: "HomeCo",
    sector: "Real estate",
    logoUrl: homecoLogo,
    companySlug: "homeco",
  },
  {
    name: "Zylus Homes & Property",
    shortName: "Zylus",
    sector: "Homes & property",
    logoUrl: zylusLogo,
    variant: "stacked",
  },
  {
    name: "BuildConnect",
    shortName: "BuildConnect",
    sector: "Construction technology",
    logoUrl: buildconnectLogo,
    companySlug: "buildconnect",
  },
  {
    name: "Nigerian Railway Corporation",
    shortName: "Nigerian Railway",
    sector: "Transportation",
    logoUrl: nrcLogo,
    companySlug: "nigerian-railway",
    variant: "mark",
  },
];
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
  card?: Screenshot;
  theme: string;
  logoUrl?: string;
  logoKind?: "mark" | "wordmark";
  products: Product[];
};

// Single source of truth for client work. To add a project: drop the image in
// src/assets/work, import it above, then append an object to that company's
// products array. New companies appear automatically across the site.
export const companies: Company[] = [
  {
    slug: "imperial-homes",
    name: "Imperial Homes Mortgage Bank",
    shortName: "Imperial Homes",
    sector: "Banking & financial technology",
    summary: "Digital solutions for the mortgage and banking sector.",
    cover: imperialAccountOpening,
    coverAlt: "Imperial Homes account opening interface",
    card: { url: imperialPlus, alt: "Imperial+ mobile app property listings and login screens" },
    theme: "banking",
    logoUrl: imperialLogo,
    logoKind: "mark",
    products: [
      {
        slug: "imperial-plus",
        name: "Imperial+ Mobile App",
        category: "Mobile banking",
        summary:
          "An Android app that puts Imperial Homes Mortgage Bank in customers' hands — browse verified homes, request to buy, and manage accounts, savings, investments and equity contributions in one place.",
        screenshots: [
          { url: imperialPlus, alt: "Imperial+ mobile app property listings and login screens" },
        ],
        features: [
          "Verified off-plan and completed property listings",
          "Account, savings and investment balances in one view",
          "Secure sign-in with phone, email or account number",
        ],
      },
      {
        slug: "account-opening",
        name: "Account Opening",
        category: "Digital banking",
        summary:
          "A guided digital account opening experience that lets new customers onboard with the bank online.",
        screenshots: [
          { url: imperialAccountOpening, alt: "Imperial Homes account opening screen" },
        ],
        features: [],
      },
      {
        slug: "loan-management-system",
        name: "Loan Management System",
        category: "Banking software",
        summary:
          "A loan management platform for processing applications, tracking repayments, and managing the full loan lifecycle.",
        screenshots: [{ url: imperialLms, alt: "Imperial Homes loan management system screen" }],
        features: [],
      },
    ],
  },
  {
    slug: "homeco",
    name: "HomeCo Development",
    shortName: "HomeCo",
    sector: "Real estate & property technology",
    summary: "Digital experiences for property and real estate.",
    cover: homecoLanding,
    coverAlt: "HomeCo landing page design",
    theme: "property",
    logoUrl: homecoLogo,
    products: [
      {
        slug: "homeco-landing-page",
        name: "HomeCo Landing Page",
        category: "Web experience",
        summary:
          "A modern marketing landing page introducing HomeCo developments and driving qualified enquiries.",
        screenshots: [{ url: homecoLanding, alt: "HomeCo landing page" }],
        features: [],
      },
    ],
  },
  {
    slug: "buildconnect",
    name: "BuildConnect",
    shortName: "BuildConnect",
    sector: "Construction technology & marketplace",
    summary: "Digital experiences for the construction ecosystem.",
    cover: buildconnectLanding,
    coverAlt: "BuildConnect landing page design",
    theme: "construction",
    logoUrl: buildconnectLogo,
    products: [
      {
        slug: "buildconnect-landing-page",
        name: "BuildConnect Landing Page",
        category: "Web experience",
        summary:
          "A conversion-focused landing page presenting the BuildConnect platform and its value to the construction market.",
        screenshots: [{ url: buildconnectLanding, alt: "BuildConnect landing page" }],
        features: [],
      },
    ],
  },
  {
    slug: "nigerian-railway",
    name: "Nigerian Railway Corporation",
    shortName: "Nigerian Railway",
    sector: "Digital solutions & enterprise technology",
    summary: "Technology for an essential transportation institution.",
    cover: nrcProperty,
    coverAlt: "Nigerian Railway property management platform",
    theme: "rail",
    logoUrl: nrcLogo,
    logoKind: "mark",
    products: [
      {
        slug: "property-management",
        name: "Property Management Platform",
        category: "Enterprise software",
        summary: "A platform for managing and tracking the corporation's property and assets.",
        screenshots: [{ url: nrcProperty, alt: "Nigerian Railway property management platform" }],
        features: [],
      },
    ],
  },
];

export const findCompany = (slug: string) => companies.find((c) => c.slug === slug);
