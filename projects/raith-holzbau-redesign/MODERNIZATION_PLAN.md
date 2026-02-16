---
name: Modernize Raith Holzbau UI
overview: Iteratively modernize the site’s look (layout, typography, colors, responsiveness) while preserving all existing texts and images. Start with low-risk CSS tokenization + responsive layout, then progressively upgrade header/nav, page layouts, and components across all 10 pages.
---

## Goals and constraints

- **Preserve content**: keep all existing texts and images; only change presentation (layout, spacing, typography, colors) in early phases.
- **Static hosting**: plain HTML/CSS/JS (no build step); changes must work on GitHub Pages.
- **Iterative rollout**: make improvements that can ship in small steps without breaking pages.

## What’s there today (baseline)

- **10 standalone pages** (duplicate header/nav/footer in each): `index.html`, `ueber-uns.html`, `zimmerei.html`, `kranverleih.html`, `dachsanierung.html`, `leistungen.html`, `galerie.html`, `kontakt.html`, `impressum.html`, `datenschutz.html`.
- **Single stylesheet**: `css/style.css` using fixed-width + floats (`#body { width: 954px; }`, `#navi/#banner/#left/#content` floated). Colors are hard-coded (`#603913`, `#8dc63f`, etc.) and repeated.
- **Minimal JS**: `js/scripts.js` for email de-obfuscation.

## Modernization strategy (phased)

### Phase 0 — Visual baseline + safety net

- Capture “before” screenshots of: home, one content page, gallery, contact, legal.
- Add a simple manual test checklist: nav works, active state highlights, email renders, images load, page readable on mobile.

### Phase 1 — Introduce design tokens (no layout rewrite yet)

- In `css/style.css`, add `:root` CSS custom properties for:
  - **colors** (surface/background/text/accent)
  - **typography** (font families, base size/line-height)
  - **spacing + radius + shadow** (to enable modern cards)
- Replace scattered hex colors with variables.
- Add modern focus styles (restore accessible focus outlines; currently `a:focus { outline: 0; }`).

### Phase 2 — Responsive foundation (container + breakpoints)

- Convert fixed `954px` layout to a **responsive container**:
  - Use `max-width` + `margin: auto` + fluid padding.
  - Introduce 2–3 breakpoints (mobile/tablet/desktop).
- Ensure the existing structure still works, but becomes usable on phones:
  - Stack sidebar (`#left`) above content (`#content`) on small screens.
  - Make images fluid (`max-width: 100%`) while keeping proportions.

### Phase 3 — Replace float layout with Flex/Grid (same markup)

- Upgrade the main layout to modern CSS:
  - Header area (`#top`): flex layout for nav block + banner.
  - Center area (`#center`): CSS Grid for sidebar/content.
  - Remove reliance on `.clear` for layout.
- Keep HTML unchanged in this phase to reduce risk (same IDs/classes, new layout rules override old float rules).

### Phase 4 — Modern header/navigation (small HTML touch, repeated across pages)

- Refresh nav styling: reduce oversized 27px uppercase, add spacing, hover/focus, and a clearer active state.
- Add a **mobile nav pattern**:
  - Minimal JS toggle (or pure-CSS checkbox pattern) to collapse/expand the menu.
  - Ensure it works across all pages (since header is duplicated).

### Phase 5 — Component facelift (cards, sections, typography rhythm)

- Convert “boxes” (`.box`, `#box_1..3`) into modern **card components**:
  - Consistent padding, radius, subtle shadow, improved text contrast.
  - Preserve existing background images, but adjust overlays/legibility.
- Improve content readability:
  - Define consistent spacing between headings/paragraphs/lists.
  - Set a typographic scale for `h1–h5` using `rem`.

### Phase 6 — Page-specific refinements (still preserving content)

- **Home** (`index.html`): make the three boxes a responsive card grid; improve hero/banner balance.
- **Gallery** (`galerie.html`): turn floated thumbnails into a responsive grid; optional lightbox later (no content change).
- **Contact** (`kontakt.html`): modernize the contact info layout; ensure map container (`#map`) behaves responsively.
- **Tables** (if present): replace the bright blue row colors with tokenized, brand-appropriate neutrals.

### Phase 7 — Optional maintainability upgrade (recommended)

Because header/footer/sidebar are duplicated in all 10 pages:

- Option A (no tooling): keep duplication but make a “change checklist” for edits across all pages.
- Option B (light JS includes): load `partials/header.html` + `partials/footer.html` into each page at runtime.
- Option C (add build tooling later): introduce a small static-site build (only if you want that complexity).

## Files to touch first

- `css/style.css` — primary modernization work (tokens, responsive, layout, components).
- `index.html` — verify home-specific layout (`#boxnavi`, `#home_left/#home_right`).
- One representative subpage like `ueber-uns.html` — validate sidebar + content behavior.
- Later: apply small repeated header changes across all `.html` files.

## Definition of done (for the first modernization iteration)

- Looks modern on mobile + desktop (responsive, no horizontal scrolling).
- Colors are centralized via CSS variables.
- Typography and spacing feel consistent.
- Navigation remains functional with clear active/focus states.
- No content changes (same text and images, just repositioned/styled).

