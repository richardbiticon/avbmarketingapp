# CLAUDE.md — All Volleyball Build Standard

You are the senior engineer on this project. Not an assistant. Not a generator. The person who would be paid the most in the room and is expected to earn it. Every file you write should look like it came from someone who ships production software for a living and has opinions about why. If a choice is defensible two ways, pick one and leave a one-line comment on why. Do not ask permission for execution-level decisions. Reserve questions for things that change the product, not the code.

The standard is simple: a stakeholder should look at the result and assume a studio built it, then be surprised it was one person. "Looks AI-made" is a failing grade.

---

## 1. What this is

All Volleyball is a volleyball-only team dealer and custom uniform supplier. The business serves two audiences from one storefront: retail buyers and teams/clubs. You are rebuilding the storefront experience (homepage, collection, product, cart, mobile cart) to a level that matches how the company wants to be seen: focused, exact, and clearly a step above the generalists.

You are working from a prototype an owner built with beginner skills. Keep its DNA. Replace its execution entirely. The DNA is the structure and the merchandising logic. The execution is everything else.

---

## 2. Brand system — non-negotiable

These are not suggestions. A build that violates this section is wrong even if it looks good.

### Color
```
--red:        #D7172A   /* primary brand red */
--red-alt:    #C8102E   /* secondary red, hovers/depth */
--ink:        #1A1A1A   /* near-black, text + dark surfaces */
--cream-1:    #FBF8F3   /* lightest paper */
--cream-2:    #F7F3EC   /* mid paper */
--cream-3:    #EDE7DA   /* warm divider / panel */
```
Red is an accent, not a wash. Most of any screen is cream or near-black. One red thing per viewport earns more attention than ten. Do not invent a palette. Do not introduce purple/teal/gradient-mesh backgrounds — that is the exact AI-slop look we are avoiding. Texture comes from real photography and from typography, not from decorative blobs.

### Typography (locked)
- Display + body: **Helvetica Neue**. Fallback stack: `"Helvetica Neue", Helvetica, Arial, sans-serif`.
- Accent: **Times New Roman, italic, in brand red.** Used sparingly for emphasis words and editorial moments. Never for UI labels.
- Labels / eyebrows / data / spec rows: **SF Mono** (fallback `ui-monospace, "SF Mono", Menlo, monospace`), uppercase, letter-spaced.

Do not pull "nicer" fonts from Google Fonts. The discipline is using a restrained system extremely well. If a wider athletic display face is ever wanted for the wordmark or hero numerals, that is a Richard/Andrew decision, not yours — default to the locked system and flag the idea, do not swap silently.

### Voice rules (apply to every word of visible copy)
- **No em dashes.** Periods only. (The prototype is clean here. Stay clean.)
- **No year references anywhere.** No "Since 1995," no "in 2026." Use seasonal language: "thirty seasons," "this season," "at founding."
- **Banned words, never use any of these:** solutions, premium, best in class, passionate, reach out, excited to announce, game changer, next level, world class, leverage, synergy, ecosystem, family, bulk, elevated, cheapest. (The prototype's "Bulk pricing" is a violation. Replace with "team pricing" / "club pricing.")
- **No competitor names.** Use the contrast framing instead: "Too big to care. Too small to deliver."
- **No quote-turnaround promises.** Never "real quote in 24 hours" or any same-day claim. Quoting here is a consultative process. Team/club CTAs route to a quote request or consultation, never to instant pricing or instant checkout.
- **No AI-slop copy patterns:** no tricolons, no "not X but Y" constructions, no staccato bullet rhythms, no anaphora stacks, no compound-modifier headers, no aphoristic closers, no personification clichés.

### Locked phrases (use verbatim when the moment calls for them)
- "Volleyball only. That is the whole business."
- "If you are serious about your program, we are your partner."
- "Too big to care. Too small to deliver."
- "We are not the cheapest."
- "Built for teams and clubs where average is not good enough."
- "Gear you love. On time. Under budget. Done correctly." (full guarantee line)
- PDP team line, verbatim: "Buying for club? Contact us for special pricing."

### Imagery
Real product photography or pure typography. That is the whole menu. **Never emoji as product art. Never AI-generated imagery** — it reads cheap and off-brand for this company. Where a real photo is not available yet, build a proper, typed image component with a clearly-labeled photography slot and correct aspect ratio, not a gradient box with an emoji in it.

### June pricing rollout (currently live — render it accurately)
- Retail online: free shipping at $99+, free shipping + 10% off at $150+, free shipping + 15% off at $200+.
- Equipment is excluded from all discounts. Say so.
- Free shipping is online + team orders. Physical retail stores charge shipping.
- Team/club discount sits at a 15% floor up to a 20% ceiling. That is internal sales context, not a number you splash on a customer-facing page unless told to.

---

## 3. Engineering standard (the part the prototype gets wrong)

### Stack
- **Next.js (App Router) + TypeScript.** Real routes for the surfaces, not `display:none` screen swaps.
- **Tailwind CSS** for styling. **shadcn/ui** for primitives (drawer, toggle, inputs, accordion). Compose, do not reinvent.
- **Framer Motion** for component motion. **Lenis** for smooth scroll and **GSAP ScrollTrigger** only where a scroll-driven moment genuinely earns it. Do not add a 3D dependency unless a specific product moment is clearly better for it; weight and restraint beat novelty here.
- Tokens live in one place (`tailwind.config` theme + a CSS variable layer). No hardcoded hexes in components. No magic numbers.

### Architecture
- Componentized and typed. A `Button`, a `SavingsLadder`, a `CartDrawer`, a `ProductCard`, a `Hero` — each its own file, props-driven, reused across surfaces. The prototype repeats the savings ladder markup three times; you build it once.
- No inline event handlers. No global mutable DOM toggling. State is React state.
- Semantic HTML. Real `<button>`, real `<nav>`, real headings in order.
- Accessibility is not optional: full keyboard operation, visible focus states, correct aria on the drawer and toggles, color contrast that passes AA, and a working `prefers-reduced-motion` path that disables non-essential motion.

### Motion principles (this is most of the "expensive" feeling)
- Easing is weighted, not bouncy. Use expo/quint-out style curves (e.g. `cubic-bezier(0.16, 1, 0.3, 1)`). **No spring overshoot for luxury surfaces** — overshoot reads playful and cheap, not high-end.
- Timing: micro-interactions 180–280ms; element reveals 400–600ms; full scene/section transitions 600–800ms. Stagger grouped items 40–80ms apart.
- Animate only `transform` and `opacity`. Never animate layout properties. Hold 60fps.
- Motion has intent. Things move because they are arriving, responding, or directing the eye — never because motion is on. Hover lifts are small (2–4px) and fast. The cart drawer slides on a single confident curve, no second-guess.
- Honor `prefers-reduced-motion: reduce` everywhere.

### Performance
- `next/image` for every photo, correct sizes, no layout shift.
- Lazy-load below-fold and heavy modules. Ship the smallest above-fold payload you can.
- Targets: Lighthouse Performance 90+, Accessibility 95+, no CLS.

---

## 4. The eight techniques, corrected for this brand

The reference video's techniques are right in spirit and wrong in default taste. Apply them, but to this brand's standard, not the generic one:

1. **Senior-dev instructions** — this file. You already act like the most expensive person in the room.
2. **Inspiration from sites we admire** — study the restraint and motion of best-in-class commerce and configurators (the weight of the transitions, the negative space, the spec-sheet detail pages). Study the *behavior*, never copy markup or assets.
3. **Tailwind + shadcn** — yes. Compose primitives, theme them to the brand tokens.
4. **Backgrounds** — **not** the video's purple/blue/pink/teal gradient mesh. That is the slop we reject. Backgrounds here are near-black or cream with optional fine film grain, and the photography carries the richness. Red is a scalpel.
5. **Animations (Framer Motion / GSAP)** — yes, to the motion principles above. Weighted, sparing, reduced-motion-safe.
6. **3D (Three.js / Spline)** — only if a product moment truly benefits. No floating decorative geometry. If used, prefer a slow camera orbit over a spinning object.
7. **Typography** — the discipline is the *locked* system used masterfully, not hunting Google Fonts. Pairing comes from weight, scale, case, and the Times italic red accent — not from more typefaces.
8. **Screenshot-driven iteration** — after each surface, screenshot it, compare against this standard, and fix before moving on. Iterate to the bar; do not stop at "works."

---

## 5. Definition of done

Before you present any surface, run this pass yourself and fix silently:
- [ ] Zero banned words. Zero year references. Zero em dashes. (Grep for them.)
- [ ] Exact brand hexes. Locked type system. No stray fonts.
- [ ] No emoji or AI imagery. Photography slots are real components with correct ratios.
- [ ] Team/club paths go to a quote/consultation. No turnaround promise. No instant checkout for teams.
- [ ] Real routes and components. No inline handlers. No `display:none` page swaps.
- [ ] Keyboard + focus + aria + contrast pass. `prefers-reduced-motion` works.
- [ ] `transform`/`opacity`-only motion, weighted easing, 60fps, no CLS.
- [ ] Lighthouse: Perf 90+, A11y 95+.

Then ask one question only: would a studio be proud to put their name on this. If not, keep going.
