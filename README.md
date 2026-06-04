# All Volleyball — Team Order

The cinematic order experience a coach or club director enters to configure a
team package and request a consultative quote. Volleyball only.

Built to the brand standard in [`CLAUDE.md`](./CLAUDE.md). Read that first; it is
binding. Stack: Next.js (App Router) + TypeScript + Tailwind + Framer Motion +
Lenis. No instant team pricing anywhere. Quoting is a conversation.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static)
```

## The two surfaces

- **`/`** — the cinematic landing. Hero, positioning marquee, the "started in
  spring" statement, how-it-works, the package, the standard, and the closing
  CTA into the order room.
- **`/order`** — the order room. A five-step configurator (Program, Package,
  Look, Roster, Request) with a live jersey preview that recolors as you go, then
  a request that routes to a consultative quote. Never a checkout.

## How it is organized

```
app/
  layout.tsx          Root chrome: preloader, grain, custom cursor, smooth scroll
  page.tsx            Landing, composed from components/flow/*
  order/page.tsx      The order room shell + <OrderBuilder/>
components/
  ui/                 Design system: Button, Eyebrow, SplitText, Reveal, PhotoSlot
  site/               Header, Footer, Preloader, Cursor
  flow/               Landing sections (Hero, Statement, Process, KitShowcase, …)
  order/              OrderBuilder, JerseyPreview, steps, fields
  providers/          SmoothScroll (Lenis)
lib/
  order.ts            Configurator data model + types (single source)
  motion.ts           House easing + reveal variants
  clsx.ts             Class joiner
tailwind.config.ts    Brand tokens (color, type, the expo easing curve)
app/globals.css       CSS variable token layer + motion primitives
```

## Brand non-negotiables (enforced in this build)

- Color: red `#D7172A` / `#C8102E` as an accent only; cream and ink carry the
  screen. Tokens live in `tailwind.config.ts` and `app/globals.css`, never as raw
  hexes in components.
- Type: Helvetica Neue everywhere, Times New Roman italic in red for accents
  (`.accent`), SF Mono for labels (`.label`). No web fonts.
- Voice: no em dashes, no year references, no banned words, no turnaround
  promises. Team paths go to a quote.
- Imagery: real product photography (`public/photos`) or typed photography slots.
  No emoji, no AI imagery. Apparel shots are slots until real photos land.

## Motion

Weighted easing (`cubic-bezier(0.16, 1, 0.3, 1)`), transform/opacity only,
60fps. Every motion path is disabled under `prefers-reduced-motion`: Lenis is
skipped, the preloader resolves instantly, reveals render static, the jersey
recolor is immediate.

## Real photography

Drop final apparel photos into `public/photos` and point the matching entries in
`lib/order.ts` (`KIT_PIECES[].photo`) at them. The typed slot disappears and the
photo takes over automatically, no other change needed.
