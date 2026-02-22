# Oblique Strategy — Project Plan

A minimal, beautifully crafted web experience inspired by Brian Eno & Peter Schmidt's *Oblique Strategies* (1975). The original deck of cards offered cryptic prompts to break creative deadlock. This project translates that concept into an interactive digital experience with a focus on UI polish, animation, and tactile feel.

---

## Vision

A single-purpose tool: **draw a card, sit with it, move forward.**

No accounts. No dashboards. No feature bloat. Just a beautifully animated card-drawing ritual that injects lateral thinking into a stuck creative process. The quality is in the craft — transitions, physics, typography, and the feeling of pulling a card from a deck.

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **SvelteKit** | Lightweight, reactive, excellent animation primitives via `svelte/transition` and `svelte/motion` |
| Styling | **CSS (vanilla)** | Full control over animations, no utility class overhead. CSS custom properties for theming |
| Animation | **Svelte motion** + **CSS keyframes** | `spring()` and `tweened()` for physics-based motion; CSS for sequenced micro-interactions |
| Deployment | **Vercel** or **Cloudflare Pages** | Zero-config SvelteKit deployment, edge-fast |
| Data | **Static JSON** | The card deck is a static dataset (~115 cards). No database needed |

---

## Core Experience

### The Draw

The entire app centers on one interaction: **drawing a card from the deck.**

```
┌─────────────────────────────────┐
│                                 │
│         ┌───────────┐           │
│         │           │           │
│         │  OBLIQUE  │           │
│         │ STRATEGIES│           │
│         │           │           │
│         │    ✦      │           │
│         └───────────┘           │
│                                 │
│       [ Draw a card ]           │
│                                 │
└─────────────────────────────────┘
              ↓ click / tap
┌─────────────────────────────────┐
│                                 │
│     ┌───────────────────┐       │
│     │                   │       │
│     │   "Use an old     │       │
│     │      idea"        │       │
│     │                   │       │
│     └───────────────────┘       │
│                                 │
│     [ Draw another ]            │
│                                 │
└─────────────────────────────────┘
```

### Interaction Flow

1. **Land** — Deck sits centered on screen. Subtle idle animation (gentle float/breathe). Minimal typography sets the tone.
2. **Draw** — User clicks/taps the deck or a prompt. The top card lifts, flips, and reveals the strategy with a satisfying spring animation.
3. **Sit** — The revealed card holds center stage. The background subtly shifts. Space to absorb the prompt.
4. **Again** — User can draw another card. The current card dismisses (slides away or fades back into the deck) and a new one draws.

---

## Feature Scope

### Phase 1 — The Deck (MVP)

The core card-draw experience, polished to a high standard.

- [ ] **Card deck data** — Static JSON with all ~115 original Oblique Strategies prompts
- [ ] **Card component** — Front (deck back design) and back (strategy text) with flip animation
- [ ] **Draw interaction** — Click/tap to draw. Spring-based lift + flip + settle animation
- [ ] **Shuffle logic** — Randomized draw without repeats until the deck is exhausted, then reshuffle
- [ ] **Redraw** — Dismiss current card, draw the next one with smooth transition
- [ ] **Typography** — Careful type selection. The text *is* the UI. Consider a serif for the strategy text, sans-serif for chrome
- [ ] **Responsive layout** — Works beautifully on mobile, tablet, and desktop. Card scales proportionally
- [ ] **Idle state** — Subtle deck animation when no interaction is happening (gentle hover/breathe/shadow pulse)
- [ ] **Sound design (optional)** — Subtle card-flip sound effect. Off by default, toggleable

### Phase 2 — Polish & Presence

Refinements that elevate the experience from functional to memorable.

- [ ] **Dark/light mode** — System-preference aware with manual toggle. Smooth theme transition
- [ ] **Card physics** — Slight parallax tilt on mouse move / device orientation. Cards feel physical
- [ ] **Deck depth** — Visual stack of cards (layered edges, shadow) so it feels like a real deck
- [ ] **Keyboard support** — Spacebar or Enter to draw. Escape to dismiss. Full keyboard navigation
- [ ] **Share** — Copy the current strategy as text, or generate a shareable card image (canvas/SVG snapshot)
- [ ] **History (session)** — Light in-memory history of drawn cards for the current session. Swipe/arrow to revisit
- [ ] **Page transitions** — If adding an about/info page, animate route transitions

### Phase 3 — Extended Deck

Optional expansions, only if the core is rock-solid.

- [ ] **Custom decks** — Let users add their own prompts alongside or replacing the original deck
- [ ] **Daily card** — A deterministic "card of the day" based on the date (seeded random)
- [ ] **Ambient mode** — Auto-cycle through cards on a timer. Screensaver / installation mode
- [ ] **PWA support** — Installable, works offline. The deck should work without a network

---

## Design Principles

1. **Less is more** — Every element must earn its place. If it doesn't serve the card-draw ritual, cut it.
2. **Motion with meaning** — Animations aren't decoration. They convey physics, state change, and tactile feedback. Every transition should feel inevitable.
3. **Typography is the interface** — The strategy text is the entire point. Give it room to breathe. Let the words land.
4. **Respect the original** — Eno and Schmidt made something deliberately simple. The digital version shouldn't overcomplicate it. No gamification, no streaks, no metrics.
5. **Craft over features** — One interaction done beautifully beats ten done adequately.

---

## Project Structure

```
ObliqueStrategy/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Card.svelte           # The card (front/back, flip animation)
│   │   │   ├── Deck.svelte           # The deck stack (idle animation, draw trigger)
│   │   │   └── Strategy.svelte       # The revealed strategy text with entrance animation
│   │   ├── data/
│   │   │   └── strategies.json       # The complete deck of oblique strategies
│   │   ├── stores/
│   │   │   └── deck.js               # Shuffle, draw, history state
│   │   └── styles/
│   │       ├── global.css             # Reset, custom properties, typography
│   │       └── theme.css              # Dark/light mode variables
│   ├── routes/
│   │   ├── +layout.svelte            # App shell, theme provider
│   │   └── +page.svelte              # Main (and likely only) page
│   └── app.html                       # HTML shell
├── static/
│   └── fonts/                         # Self-hosted typefaces
├── PROJECT_PLAN.md
├── README.md
├── package.json
├── svelte.config.js
└── vite.config.js
```

---

## Animation Inventory

Key animations to design and implement:

| Animation | Technique | Feel |
|-----------|-----------|------|
| **Deck idle** | CSS keyframe (translateY oscillation + shadow pulse) | Gentle breathing, alive |
| **Card lift** | Svelte `spring()` on Y-axis + scale | Weightless lift off the deck |
| **Card flip** | CSS 3D transform (rotateY) with backface-visibility | Satisfying physical flip |
| **Text reveal** | Staggered opacity + translateY per word or line | Words arriving, not appearing |
| **Card dismiss** | Svelte `fly` transition or spring-based slide | Swept aside naturally |
| **Theme toggle** | CSS transition on custom properties | Smooth, no flash |
| **Tilt/parallax** | Transform based on pointer/gyroscope | Card feels 3D, tangible |

---

## Implementation Order

1. **Scaffold** — `npx sv create` with TypeScript, minimal template
2. **Data** — Create `strategies.json` with the full deck
3. **Card component** — Build the card with flip animation (front/back)
4. **Deck store** — Shuffle + draw logic
5. **Main page** — Compose Deck + Card, wire up the draw interaction
6. **Animation pass** — Refine all motion (spring tuning, easing curves, timing)
7. **Typography pass** — Select and integrate typefaces, set scale and spacing
8. **Responsive pass** — Test and tune across viewport sizes
9. **Polish pass** — Idle animation, deck depth, tilt, micro-interactions
10. **Theme** — Dark/light mode with smooth transition
11. **Deploy** — Ship to Vercel/Cloudflare

---

## References

- [Oblique Strategies — Wikipedia](https://en.wikipedia.org/wiki/Oblique_Strategies)
- [Complete list of strategies](https://mattrickard.com/list-of-all-oblique-strategies)
- [Original digital version](http://stoney.sb.org/eno/oblique.html)
- [obliquestrategies.ca](https://obliquestrategies.ca/)
- [Svelte motion docs](https://svelte.dev/docs/svelte-motion)
- [Svelte transition docs](https://svelte.dev/docs/svelte-transition)
