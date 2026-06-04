# BUILD PROMPT — All Volleyball Storefront, Top-1% Rebuild

> Paste this into Claude Code with `CLAUDE.md` in the project root and the prototype HTML in the repo as `reference/prototype.html`. Read `CLAUDE.md` first and treat it as binding.

---

## The job

An owner built a working storefront prototype with beginner skills. It is one 686-line HTML file: inline styles, inline `onclick`, `display:none` screen swaps, emoji product art, gradient-blob image placeholders, off-brand red, a banned year reference, and a banned word in the cart. It also happens to have genuinely good merchandising instincts.

Your job is to keep the DNA and replace the execution completely. Rebuild it as the production app a top-1% engineer would ship: a real Next.js application with a proper component and motion system, the locked brand discipline, and the kind of weighted, restrained polish that makes a configured-Porsche ordering screen feel expensive. Same skeleton, new everything else.

Do not port the prototype's code. Read it for intent, then write the real thing.

---

## Keep this DNA

- **Two-audience split.** A homepage that serves retail and teams/clubs from one screen without making either feel secondary. The prototype's split hero (retail on cream, team on near-black) is the right idea.
- **The savings ladder.** The $99 → $150 → $200 free-shipping-and-discount progression, shown consistently on the collection page, the product page, and in the cart, with equipment-excluded stated plainly. It is the core merchandising mechanic. Build it once as a reusable component; the prototype duplicates the markup three times.
- **Package protection as an honest, separate toggle.** Redo free-returns/package-protection is a visible toggle with its price shown, never pre-baked into the checkout button. Keep that integrity.
- **Team CTA that routes to a quote.** The cart and key pages offer a clear path for teams/clubs to a quote request or consultation. Consultative, never instant pricing.
- **The five surfaces:** Homepage, Collection (PLP), Product (PDP), Cart drawer, Mobile cart.
- **A stakeholder walkthrough mode.** The prototype's review-toolbar that flips between surfaces is useful. Reproduce it as a thin, optional dev/preview affordance (a route or a toggle), kept entirely out of the real shopper experience.

## Rip out and rebuild

- Single inline file → Next.js App Router, TypeScript, real routes, componentized.
- `display:none` screen swaps and `onclick="show()"` → routing + React state.
- Emoji and gradient-box placeholders → real photography slots via `next/image` with correct aspect ratios.
- Red `#CE1126` → brand `#D7172A` / `#C8102E`.
- "Experts in Volleyball Since 1995" → seasonal language, no year. (e.g. "thirty seasons of volleyball only.")
- "Bulk pricing" → "team pricing" / "club pricing." Run the full banned-word scan from `CLAUDE.md`.
- Archivo / Hanken Grotesk → the locked type system (Helvetica Neue, Times New Roman italic red accent, SF Mono labels).
- No motion system → Framer Motion with the weighted easing and reduced-motion handling in `CLAUDE.md`.

---

## Surface-by-surface spec

Each surface keeps the prototype's content and merchandising, raised to the standard.

**Homepage.** Utility bar, header with real nav and a cart trigger, the live June promo bar (free shipping $99+, 10% off $150+, 15% off $200+, equipment excluded). Split hero: retail side on cream with the offer, team side on near-black carrying "Built for teams and clubs where average is not good enough" and a quote CTA. Trust strip. Category grid. A "team band" section using the locked positioning lines. Brand row. Footer. Reveal-on-scroll with restraint, not on every element.

**Collection (PLP).** Breadcrumb, title, count. The savings-ladder bar at the top. Left filters (real, accessible checkboxes; collapse on mobile). Responsive product-card grid with badge support, swatch dots, rating, price. Cards lift 2–4px on hover, fast. Real photography slots.

**Product (PDP).** Gallery with thumbnails (photography slots), brand eyebrow, title, rating, price. Color swatches and size grid as real selectable state with sold-out handling. The savings ladder rendered in context. Buy row with Add-to-Cart and the wallet button, shipping note. The verbatim team line where appropriate: "Buying for club? Contact us for special pricing." Adding to cart opens the drawer on a single confident slide.

**Cart drawer.** Overlay + right-side drawer on a weighted slide (the prototype's `cubic-bezier(.4,0,.2,1)` is acceptable; tune to the standard). Rewards progress (free-shipping-unlocked status + one "X away from next tier" nudge + the tiered track). One recommendation row to reach the next tier. Line items with quantity steppers. The team CTA block (fixed copy, no banned words). The Redo protection toggle as a transparent, separate control with its line item in the summary. Summary and a single clear Checkout primary, wallet secondary.

**Mobile cart.** The clutter-cut version: progress collapsed to one status + one nudge, protection still a visible toggle, team CTA compressed to one tap, recommendations and tax-exempt pushed below the fold, one primary action. Build it as the real responsive cart at mobile breakpoints, not a separate fake phone mockup (keep a framed phone preview only inside the optional walkthrough mode).

---

## Motion spec (where the money shows)

- Page and section reveals: opacity + small Y-translate, 400–600ms, expo-out easing, grouped items staggered 40–80ms.
- Drawer: single slide on a weighted curve, overlay fades in parallel, no overshoot.
- Hover: 180–280ms, 2–4px lift, no scale circus.
- Toggle (protection): smooth knob travel, color shift to brand green-equivalent on, instant summary recalculation.
- Savings ladder: the fill animates to the current tier on mount once, then holds. No looping.
- Everything `transform`/`opacity` only, 60fps, fully disabled under `prefers-reduced-motion`.

---

## Build it in phases (ship the simpler thing first, then layer)

1. **Scaffold.** Next.js + TS + Tailwind + shadcn, brand tokens wired into the theme, type system loaded, base layout. Commit.
2. **Design system.** Button, eyebrow/label, photography-slot image, SavingsLadder, ProductCard, section primitives. Storybook-style demo page acceptable internally. Commit.
3. **Surfaces, static.** Build all five with real content and brand-clean copy, no motion yet. Run the banned-word/year/em-dash grep. Commit.
4. **Motion.** Add the motion system to the static surfaces per the spec. Commit.
5. **QA.** Screenshot each surface, compare to standard, fix. Run the `CLAUDE.md` definition-of-done checklist. Lighthouse. Reduced-motion pass. Keyboard pass. Commit.

After each phase, screenshot and self-critique against the bar before moving on.

---

## Acceptance criteria

- Reads as studio-built. No AI-slop tells.
- Passes every box in the `CLAUDE.md` definition of done.
- Same merchandising DNA as the prototype, none of its execution.
- A teammate could open the repo and immediately understand the component and token structure.

Build like the rebuild is going in your portfolio. It is.
