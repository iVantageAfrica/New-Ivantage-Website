> [!IMPORTANT]
> Avoid rewriting published git history — force pushing, or
> rebasing/amending/squashing commits that are already pushed — as it rewrites
> history on the remote and the original commits are likely lost. Keep the
> branch you push in a working state.

## Application rules

- Build the website as React components in the plain Vite SPA: routes are
  declared in `src/App.tsx`, screens live in `src/pages/`. Do not reintroduce a
  framework runtime or a server bundle.
- Centralize the visual system in `src/styles.css` and use shared Button
  variants for actions to keep branding consistent.
- Contact inquiries use a public validated client with an insert-only anonymous
  database client plus the PHP mailer in `mailer/`; visitors must never read
  submitted personal data.
- Keep shared inquiry validation in the browser-safe schema module
  (`src/lib/inquiry-schema.ts`) used by the form and tests, and mirror the same
  rules in `mailer/mail.php` so acceptance rules stay consistent.
- Nothing secret belongs in the client bundle: SMTP credentials and the origin
  allowlist live in the git-ignored `mailer/config.php`; only public
  `VITE_`-prefixed values go in `.env`.
- Shared navigation and footer live in `src/components/site-shell.tsx`; named
  sections and company/service details use dedicated routes for direct linking.
- Verified company logos and product lists live in `src/content/portfolio.ts`;
  missing products stay empty rather than presenting generated concepts as
  delivered work.
- Inner pages share editorial hero and process components; page-specific
  layouts remain in their page modules to keep visual updates consistent without
  coupling unrelated content.
- Public company contact details are centralized in `src/content/contact.ts` and
  reused across pages so contact links stay consistent.
