export const contact = {
  email: "support@ivantage.africa",
  emailHref: "mailto:support@ivantage.africa",
  socials: [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/ivantage-technology-services-limited/",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/ivantagetech/",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://web.facebook.com/profile.php?id=100088414636870",
    },
  ],
} as const;

export type SocialLink = (typeof contact.socials)[number];
