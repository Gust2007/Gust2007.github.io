# Joomla Static Site Cleanup Plan

## Overview

Clean up an HTTrack-downloaded Joomla site into a lean static site by flattening the directory structure, removing all Joomla/HTTrack artifacts, consolidating CSS into a single file, removing jQuery/MooTools entirely, and converting the minimal jQuery usage to vanilla JavaScript.

## Todos

- [ ] Flatten directory structure: move site files from Raith Holzbau/www.raith-holzbau.de/ to project root, rename über-uns.html to ueber-uns.html, reorganize into css/, js/, images/, assets/ folders
- [ ] Delete HTTrack artifacts (hts-cache, cookies.txt, hts-log.txt, top-level index files), browser-update.org folder, entire media/ folder, templates/system/ folder
- [ ] Create css/style.css from template.css, add minimal CSS reset, update image paths to new structure, add alternating table row colors via CSS (replacing jQuery)
- [ ] Create new vanilla js/scripts.js with email deobfuscation logic; remove all jQuery/MooTools/Joomla JS dependencies
- [ ] Clean all 10 HTML pages: remove Joomla meta/script/link tags, clean up Joomla CSS classes, update asset paths, add viewport meta, fix encoded URLs, replace inline scripts
- [ ] Verify all internal links and image paths work, test site in browser

## Current State

The site lives deep inside `Raith Holzbau/www.raith-holzbau.de/` with 10 content HTML pages, 4 CSS files (3 Joomla boilerplate + 1 actual template), and 9 JS files (jQuery, MooTools, Joomla system scripts + 1 custom `scripts.js`). The actual jQuery/MooTools usage is negligible -- only JCaption (unused in practice) and two jQuery calls in `scripts.js` (Google Maps gMap plugin + table row coloring).

## Phase 1: Flatten Directory Structure

Move the actual site content out of the HTTrack nesting into the project root.

**Target structure:**

```
raith-holzbau-redesign/
  index.html
  datenschutz.html
  dachsanierung.html
  galerie.html
  impressum.html
  kontakt.html
  kranverleih.html
  leistungen.html
  ueber-uns.html          (renamed from über-uns.html)
  zimmerei.html
  css/
    style.css              (consolidated from template.css + needed system bits)
  js/
    scripts.js             (rewritten in vanilla JS)
  images/
    galerie/               (17 gallery JPGs)
    kranverleih/           (3 JPGs)
    eternit.png
  assets/
    bg.jpg, bg_galerie.jpg, bg_kontakt.jpg, bg_leistungen.jpg
    dachstuhl.jpg, fb.png, favicon.ico, list-icon.png
    logo.jpg, logo_h.jpg, readmore.png, readmore_h.png
```

**Delete entirely:**

- `Raith Holzbau/index.html` (HTTrack nav page)
- `Raith Holzbau/hts-cache/` (HTTrack cache)
- `Raith Holzbau/cookies.txt`, `hts-log.txt`
- `Raith Holzbau/browser-update.org/` (outdated browser nag -- not needed)
- Top-level `index.html` (HTTrack project index)
- `media/` folder entirely (jQuery, MooTools, Joomla system JS/CSS/images)
- `templates/system/` entirely (Joomla system CSS + images like `j_button2_*.png`, `calendar.png`)
- `templates/default/css/ie7fixes.css` reference (IE7 is long dead)

## Phase 2: CSS Consolidation

Only `templates/default/css/template.css` (281 lines) contains actual site styles. The other 3 CSS files are Joomla boilerplate:

- `media/system/css/system.css` -- Joomla system messages (not used) -- **remove**
- `templates/system/css/general.css` -- Joomla editor buttons, tooltips (not used) -- **remove**
- `templates/system/css/system.css` -- Joomla unpublished content styles (not used) -- **remove**

**Actions:**

- Copy `template.css` to `css/style.css`
- Remove the `@import` of `system.css` if referenced
- Update all image paths (e.g., `url(../images/bg.jpg)` becomes `url(../assets/bg.jpg)`)
- Add a basic CSS reset at the top (the site currently relies on browser defaults + Joomla system resets)
- Remove any Joomla-specific selectors if present (`.system-unpublished`, etc.)

## Phase 3: JavaScript -- Remove jQuery/MooTools, Convert to Vanilla JS

**Files to delete (all Joomla/library JS):**

- `media/jui/js/jquery.min8a2f.js` (jQuery 1.12.4)
- `media/jui/js/jquery-noconflict8a2f.js`
- `media/jui/js/jquery-migrate.min8a2f.js`
- `media/system/js/mootools-core8a2f.js` (MooTools 1.4.5)
- `media/system/js/mootools-more8a2f.js`
- `media/system/js/core8a2f.js` (Joomla core utils)
- `media/system/js/caption8a2f.js` (JCaption -- not actually used)
- `browser-update.org/update.js`

**Rewrite `scripts.js` in vanilla JS:**

The current jQuery code does only two things:

1. **Table row coloring** (`$('.colored tr:even/.odd')`) -- replace with CSS `tr:nth-child(even/odd)` selectors (no JS needed)
2. **Google Maps via gMap plugin** (`$('#map').gMap(...)`) -- the gMap jQuery plugin is not even included in the downloaded files, so this code is dead. Replace with a vanilla Google Maps embed or an `<iframe>` embed if maps are still wanted on the contact page

**New `js/scripts.js` will contain:**

- Email deobfuscation (vanilla JS version of the inline email script found in all pages)
- Optionally: a simple vanilla JS lightbox for gallery images (currently the gallery is static thumbnails with no interactivity)

## Phase 4: HTML Cleanup (All 10 Pages)

Apply these changes to every HTML file:

**Head section cleanup:**

- Remove `<meta name="generator" content="Joomla!...">`
- Remove the Joomla JSON config `<script>` block (CSRF tokens, system URIs)
- Remove all jQuery/MooTools/Joomla `<script>` tags (8 script references)
- Remove Joomla system CSS `<link>` tags (3 references)
- Remove IE7 conditional CSS
- Update remaining CSS/JS paths to new flat structure
- Add a proper `<meta charset="utf-8">` and `<meta name="viewport">` tag

**Body markup cleanup:**

- Remove Joomla-specific attributes: `itemscope`, `itemtype`, `itemprop` (Schema.org from Joomla)
- Remove Joomla menu item classes: `item-101`, `item-115`, `item-116`, etc.
- Clean up nav classes: `nav menu mod-list` to just `nav`
- Remove `default current active` Joomla state classes, keep just `active` for current page
- Remove the inline JCaption initialization script
- Remove inline `jQuery.noConflict()` call
- Replace inline email obfuscation script with a cleaner approach (or move to `scripts.js`)
- Remove the `<noscript>` reDim ImageSizer plugin text
- Fix URL-encoded link `%c3%bcber-uns.html` to `ueber-uns.html`
- Remove the browser-update script block

**Per-page specifics:**

- `kontakt.html`: Remove or replace the Google Maps `#map` div (gMap plugin is missing anyway) -- consider a simple Google Maps iframe embed instead
- `galerie.html`: The 110x82px thumbnails could optionally be enhanced later with a lightbox

## Phase 5: Final Cleanup

- Verify all internal links work with the new flat structure
- Verify all image paths resolve correctly
- Ensure the CSS image paths (`url(...)`) are updated
- Remove any empty or orphaned files
- Test in a browser by opening `index.html` locally

## Summary of Removals

- **jQuery + MooTools:** 5 large library JS files
- **Joomla system JS:** 3 files (core, caption, noconflict)
- **Joomla system CSS:** 3 files
- **Joomla system images:** ~11 files (notice icons, button sprites, calendar)
- **HTTrack artifacts:** 2 index files, cache folder, cookies, logs
- **Browser-update.org:** 1 JS file

**Net result:** From ~35 files and deep Joomla directory nesting down to ~10 HTML + 1 CSS + 1 JS + ~35 image/asset files in a clean flat structure.
