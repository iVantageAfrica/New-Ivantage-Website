<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Build the website as React components within the existing TanStack routing shell; preserve the supported bootstrap and routing architecture.
- Centralize the visual system in src/styles.css and use shared Button variants for actions to keep branding consistent.
- Contact inquiries use a public validated server function with an insert-only anonymous database client; visitors must never read submitted personal data.
- Keep shared inquiry validation in a browser-safe schema module used by the form, server function, and tests so acceptance rules stay consistent.

- Shared navigation and footer live in the root shell; named sections and company/service details use dedicated leaf routes for direct linking.
- Verified company logos and product lists live in src/content/portfolio.ts; missing products stay empty rather than presenting generated concepts as delivered work.
- Inner pages share editorial hero and process components; page-specific layouts remain in their leaf routes to keep visual updates consistent without coupling unrelated content.
