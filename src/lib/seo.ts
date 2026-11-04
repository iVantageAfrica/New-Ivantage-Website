import { useEffect } from "react";

export const pageTitle = (name: string) => `${name} — iVantage`;

function setMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  const tag =
    document.head.querySelector<HTMLMetaElement>(selector) ?? document.createElement("meta");
  if (!tag.isConnected) {
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
  }, [title, description]);
}
