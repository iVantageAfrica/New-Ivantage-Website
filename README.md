# iVantage website

The iVantage agency site: a plain React single-page app built with Vite, plus a
small self-hosted PHP mailer for contact-form inquiries.

## Stack

- React 19 + TypeScript
- Vite 8 (`@vitejs/plugin-react`) — static `dist/` output, no server runtime
- react-router-dom for client routing
- Tailwind CSS v4, GSAP for the scroll reveals
- Zod for inquiry validation, shared by the form, the mailer's rules and the tests
- Supabase (publishable key, insert-only) to store inquiries
- PHP 8 + PHPMailer in `mailer/` to email them

## Development

Needs Node.js — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
npm install
cp .env.example .env   # fill in the VITE_ values
npm run dev            # http://localhost:8080
```

```sh
npm run build          # static site in dist/
npm run preview        # serve the built output
npm run lint           # eslint + prettier rules
npm run format         # write prettier fixes
npm test               # vitest
```

## The contact form

`src/lib/inquiry.ts` runs in the browser and does two things in parallel:
inserts the inquiry into Supabase, and posts the JSON to the PHP mailer. Either
success is enough to confirm the submission to the visitor.

### PHP mailer

`mailer/mail.php` is the whole email endpoint. It is not a general-purpose API:
it only accepts an inquiry, and it rejects anything that fails validation, comes
from an origin outside its allowlist, trips the per-IP rate limit, or fills the
honeypot field.

```sh
cd mailer
cp config.example.php config.php   # fill in SMTP details + your site's origins
composer install                   # PHPMailer
```

- `allowed_origins` in `config.php` lists every origin the site is served from
  (`https://ivantage.africa`, plus `http://localhost:8080` while testing).
  Remove the localhost entry before you go live.
- `config.php` and `vendor/` are git-ignored; `mailer/.htaccess` denies direct
  reads of the config. Prefer a folder outside the web root if your host allows it.
- Point `VITE_INQUIRY_MAIL_ENDPOINT` at the script's URL, e.g.
  `https://ivantage.africa/mailer/mail.php`. Empty falls back to the
  same-origin `/mailer/mail.php`.

Because a browser bundle cannot hold a secret, the gate is an origin allowlist
rather than a shared key. Rate limiting, the honeypot and the server-side
re-validation are what stand in front of a spammer who spoofs the header.

## Deployment

`npm run build` produces a static site: `dist/index.html` plus `dist/assets/`.
Anything that serves files and runs PHP can host it.

Serve `dist/` as the web root and copy `mailer/` next to it (or wherever PHP
executes). The SPA owns routing, so requests for a path that is not a real file
must return `index.html`.

Apache — `public/.htaccess` is already copied into `dist/`, and works out of the
box when `AllowOverride All` is on.

Nginx — add the fallback to the server block:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Without that rule, reloading `/work/imperial-homes` returns 404.

## Migration notes

The project started life on Lovable with TanStack Start, which meant a Node
server and a router plugin. It is now a plain Vite SPA: `src/pages/` holds the
screens, `src/App.tsx` declares the routes, and `src/lib/seo.ts` sets the page
title and description per route with a hook.

That trade removes the server entirely, so the site renders client-side. If you
want full HTML for crawlers later, the next step is prerendering each route to
its own `index.html` at build time — worth doing before the site starts relying
on search traffic.
