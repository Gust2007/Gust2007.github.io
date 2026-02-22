---

## name: Modernize Raith Holzbau UI
overview: Iteratively modernize the site's look (layout, typography, colors, responsiveness) while preserving all existing texts and images. Driven by the "Warm Craftsman Editorial" aesthetic direction.

## Aesthetic direction — "Warm Craftsman Editorial"

Four generations of precision woodworking. The design should feel like a master craftsman's trade catalogue: warm, authoritative, precise. Not rustic kitsch, not corporate sterile.


| Token               | Decision                     | Rationale                                             |
| ------------------- | ---------------------------- | ----------------------------------------------------- |
| Background          | Aged paper cream `#f7f3ec`   | Warmth over cold white; feels printed                 |
| Text                | Deep warm charcoal `#1e1a14` | Better readability than brown                         |
| Nav background      | Deep espresso `#1c1510`      | Authority without the chocolate-brown kitsch          |
| Primary accent      | Forest green `#3b6934`       | Mature, serious — not the old lime `#8dc63f`          |
| Hover/active accent | Amber `#b5762e`              | Wood-tone warmth; pairs with the craft theme          |
| Heading font        | Playfair Display (serif)     | Editorial, crafted — the most impactful single change |
| Body font           | Source Sans 3                | Clean, readable, no-nonsense                          |


**The one unforgettable thing**: Playfair Display headings on cream — makes the whole site feel like a quality printed brochure.

---

## Progress


| Phase                                           | Status  | Notes                                                                                    |
| ----------------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| 0 — Visual baseline + safety net                | Done    | Screenshots in `baseline/`, `TEST_CHECKLIST.md` created                                  |
| 1 — Design tokens                               | Done    | CSS variables in `:root`, colors replaced, focus styles added                            |
| 2 — Responsive foundation                       | Done    | Container max-width, breakpoint at 768px, stacked layout, fluid images                   |
| 3 — Flex/Grid layout                            | Done    | `#top` flex, `#center` grid, `#boxnavi` flex, footer flex                                |
| 4 — Modern nav                                  | Done    | Small-caps nav, amber active state, mobile hamburger (pure CSS) across all 10 pages      |
| 5 — Component facelift                          | Done    | Playfair Display + Source Sans 3, new palette, card gradient overlays, typographic scale |
| 6 — Design showcase (gallery, homepage, motion) | Done    | CSS Grid gallery, page-header accent bar, page fade-in + card/gallery hover, contact card |
| 7 — Content-page polish                         | Done    | Floated image radius+cap, h2/list spacing, legal-block reading width + strong-headings   |
| 8 — Optional maintainability                    | Pending |                                                                                          |


## Goals and constraints

- **Preserve content**: keep all existing texts and images; only change presentation (layout, spacing, typography, colors).
- **Static hosting**: plain HTML/CSS/JS (no build step); must work on GitHub Pages.
- **Aesthetic intent**: every decision should serve the "Warm Craftsman Editorial" direction, not just generic modernization.

## What's there today (after Phase 5)

- **10 standalone pages** (duplicate header/nav/footer in each).
- **Single stylesheet** `css/style.css`: Playfair Display + Source Sans 3 from Google Fonts; cream background; espresso nav; forest green + amber accents; Flex/Grid layout; card gradient overlays; mobile hamburger menu.
- **Minimal JS**: `js/scripts.js` for email de-obfuscation only.

---

## Modernization strategy (phased)

### Phase 0 — Visual baseline + safety net ✓

Capture "before" screenshots. Manual test checklist created.

### Phase 1 — Design tokens ✓

CSS custom properties for colors, typography, spacing, radius, shadow.

### Phase 2 — Responsive foundation ✓

Fluid container, 768px breakpoint, stacked mobile layout, fluid images.

### Phase 3 — Flex/Grid layout ✓

`#top` flex, `#center` grid, footer flex. Float layout removed.

### Phase 4 — Modern navigation ✓

Small-caps nav, amber active state, mobile hamburger (pure CSS, no JS), applied across all 10 pages.

### Phase 5 — Component facelift ✓

- **Palette overhaul**: cream surface, espresso nav, deep forest green, amber hover accent.
- **Typography**: Playfair Display for all headings (h1–h5), Source Sans 3 for body. Fluid `clamp()` sizing for h1/h2.
- **Card overlays**: cinematic `linear-gradient` via `::after` pseudo-element ensures text legibility over background photos.
- **Content area**: improved paragraph/list spacing, `text-align: left` replacing `justify`, better line-height.
- **Footer**: subtle top border, muted link color, spaced letter-tracking.

### Phase 6 — Design showcase (gallery, homepage, motion)

This is where the site goes from "technically modern" to *memorable*. Each sub-task is driven by the aesthetic direction, not just technical correctness.

#### 6a — Gallery: curated photo grid

- Replace floated `<img>` thumbnails with a proper **CSS Grid** multi-column layout.
- Add a subtle **hover reveal** on each thumbnail (slight scale + brightness lift) using CSS transitions only.
- Goal: the gallery should feel like a portfolio, not a list of thumbnails.

#### 6b — Homepage: hero moment

- The `#banner` image deserves better treatment: consider adding a tagline or subtle text overlay positioned over the photo.
- Ensure the three cards (`#boxnavi`) have consistent height and the gradient overlays look intentional.
- Add a thin decorative rule or section divider between the banner area and the intro text.

#### 6c — Motion pass (CSS only, no JS)

- **Page entry**: short `opacity` + `translateY` fade-in on `#body` using `@keyframes`.
- **Nav links**: smooth background-color slide on hover (refine existing transition).
- **Cards**: scale or brightness shift on hover.
- **Gallery thumbnails**: scale + brightness reveal (see 6a).
- All animations under 300ms. Wrap in `@media (prefers-reduced-motion: no-preference)` to respect user settings.

#### 6d — Contact page

- Modernize the contact information layout (address, phone, email into a clean block).
- Ensure `#map` iframe is fully responsive (`width: 100%`, `height` via `clamp` or `aspect-ratio`).

#### 6e — Table styling

- Replace the bright blue row colors (`#488dc6` / `#63b0de`) with brand-appropriate tones via the existing `.colored` class.
- Warm neutral rows with forest green as the accent for the header row.

### Phase 7 — Content-page polish

Final refinements to individual page layouts not covered in Phase 6:

- `**ueber-uns.html`**: ensure floated team/history image integrates naturally with the new text styling.
- `**zimmerei.html`, `dachsanierung.html`, `kranverleih.html`, `leistungen.html**`: check heading hierarchy and list spacing on each page individually.
- `**impressum.html`, `datenschutz.html**`: text-heavy pages benefit most from the typography upgrade; verify line-length and spacing feel comfortable.

### Phase 8 — Optional maintainability upgrade

Because header/footer/sidebar are duplicated in all 10 pages:

- **Option A** (no tooling): keep duplication; maintain a change checklist for cross-page edits.
- **Option B** (light JS includes): load `partials/header.html` + `partials/footer.html` at runtime with `fetch`.
- **Option C** (build tooling): introduce a small static-site build only if the complexity is wanted.

---

## Definition of done

- Feels like a quality printed trade catalogue on both desktop and mobile.
- The gallery is a visual showcase, not a float dump.
- Animations are present but subtle; `prefers-reduced-motion` is respected.
- Colors, fonts, and spacing consistently serve the "Warm Craftsman Editorial" direction.
- All 10 pages pass the `TEST_CHECKLIST.md` manually.

