import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { App } from "@/App";

const pages = [
  { path: "/", heading: /Software built for/ },
  { path: "/work", heading: /Different businesses/ },
  { path: "/work/imperial-homes", heading: /Imperial Homes Mortgage Bank/ },
  { path: "/services", heading: /Design\. Develop/ },
  { path: "/services/web-applications", heading: /Web Application Development/ },
  { path: "/about", heading: /We are iVantage/ },
  { path: "/contact", heading: /Let’s talk about/ },
  { path: "/work/not-a-client", heading: /^404$/ },
  { path: "/nowhere", heading: /^404$/ },
];

// Rendering is enough to prove the route table resolves; nothing here needs a
// server, so the SPA can be verified with no network.
describe("App routing", () => {
  it.each(pages)("renders $path", ({ path, heading }) => {
    const { unmount } = render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
    unmount();
  });
});
