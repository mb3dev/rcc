# Religious Cognition Collaborative website

Static, dependency-free website deployed with GitHub Pages. Content follows the
approved RCC website content brief: every page is plain HTML with the brief's
copy, and components the brief marks as unverified are omitted rather than
filled with placeholder text.

## How deployment works

Pushing to `main` runs `.github/workflows/deploy.yml`, which:

1. Validates every internal link and asset (`scripts/check_site.py`) — a broken
   link fails the build instead of publishing a broken site.
2. Publishes the site to GitHub Pages via the official Pages actions.

### One-time setup

The workflow attempts to enable Pages automatically on first run. If the first
deploy fails with a Pages error, enable it manually once: repository
**Settings → Pages → Source → GitHub Actions**, then re-run the workflow.

The site will be served at `https://mb3dev.github.io/rcc/`. A custom domain can
be added later under **Settings → Pages** — no site changes needed, since every
page uses relative URLs.

## Design decisions for robustness

- **No build step, no framework, no JavaScript routing.** Each URL is a real
  HTML file (`about/index.html` → `/about/`), so pages load even if JavaScript
  is disabled and nothing can break at build time.
- **Relative URLs everywhere**, so the site works under the `/rcc/` project
  path today and a custom domain later without modification.
- **No external requests** — system fonts, inline SVG assets, no CDNs.
- **Forms have no backend** (GitHub Pages is static hosting): the Collaborate
  and Contact forms open the visitor's email app with a pre-addressed,
  pre-filled message. To switch to a hosted form service later (e.g.
  Formspree), replace the `data-mailto` forms' submit handling.
- **404.html** works at any URL depth via a dynamically computed `<base>` tag.

## Editing content

Pages are plain HTML — edit them directly. The shared header/footer appear in
every file; if you change navigation, change it on all pages (or regenerate:
the pages were originally emitted by a small Python generator, and
`scripts/check_site.py` will catch any link you break).

## Before final public launch (from the content brief)

- Replace the temporary contact email (`barrostheology@gmail.com`) once a
  general RCC address exists — it appears in the footer of every page and on
  the Contact, Collaborate, and People pages.
- Add the sponsoring nonprofit's exact legal name, approved logo, and the
  "Organizational Home" / "How support is administered" sections (About and
  Support pages) — currently omitted per the brief.
- Add the current project module (Home and Projects pages) once the title and
  approved summary are released.
- Replace the initials portrait on the People page with an approved headshot.
- Add verified publications to the Publications page and restore the filter
  bar when there are entries to filter.
- Add a donation button routed through the sponsor's payment system (Support
  page) — currently links to the Contact page instead.
