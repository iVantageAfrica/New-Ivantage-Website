import { Facebook, Instagram, Linkedin } from "lucide-react";
import { contact } from "@/content/contact";

const icons = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
} as const;

export function SocialLinks({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className={`social-links social-links-${tone}`}>
      {contact.socials.map((social) => {
        const Icon = icons[social.id];
        return (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.label} (opens in a new tab)`}
            title={social.label}
          >
            <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
