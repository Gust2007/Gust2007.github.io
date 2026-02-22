# Manual Test Checklist

Use this checklist after each modernization phase to ensure nothing is broken. Check each item before considering the phase complete.

## Navigation

- [ ] All main nav links work (Raith Holzbau, Über uns, Zimmerei, Kranverleih, Lohnabbund)
- [ ] Current page is highlighted in nav (`.active` state visible)
- [ ] Footer links work (Kontakt, Impressum, Datenschutz)
- [ ] Facebook link in header opens correctly
- [ ] Sidebar box links work (Kontakt, Galerie, Leistungen)

## Content & Functionality

- [ ] Email address renders on pages with contact info (deobfuscation works)
- [ ] All images load (logo, banner, box backgrounds, gallery, content images)
- [ ] No broken image icons or 404s
- [ ] External links (e.g. Eternit) open correctly

## Layout & Responsiveness

- [ ] No horizontal scrolling on desktop (1920px)
- [ ] No horizontal scrolling on tablet (768px)
- [ ] Page is readable on mobile (375px) — content stacks or scales appropriately
- [ ] Logo and banner display correctly
- [ ] Sidebar boxes / content area don’t overlap or break layout

## Visual Regression (after styling changes)

- [ ] Typography is readable (no cut-off text, reasonable line length)
- [ ] Colors have sufficient contrast
- [ ] Focus states visible when tabbing through links (accessibility)

---

**Phase 0 baseline:** Run this checklist on the current site and note any existing issues before starting Phase 1.
