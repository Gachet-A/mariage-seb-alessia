# Design — « Programme de salle »

An elegant single-page wedding invitation: script names and titles over a clean sans, in the original site's warm palette. Single static page; tokens live at the top of `styles.css`.

## Colour (the original site's palette; light fields own whole sections)

| Token | Value | Role |
|---|---|---|
| `--paper` | `#f7f3f3` | Page ground, masthead: cover, Hébergement, notes, FAQ |
| `--card` | `#ffffff` | The RSVP ticket |
| `--greige` | `#cec8c3` | Lieu, Réponse |
| `--caramel` | `#d2996c` | Footer, and every primary button (ink text) |
| `--sun` | `#f6e18a` | Programme (Déroulement) background, chosen by the couple |
| `--caramel-hover` | `#c5885a` | Button hover |
| `--ink` | `#191009` | All text (deep brown) |
| `--ink-soft` | `#5e4c3e` | Secondary text on paper/greige |
| `--accent-deep` | `#9a5f33` | Text accents on light grounds: ampersand, required marks, focus ring, FAQ target |

Sections alternate paper / greige / caramel; caramel text accents are never used on caramel (use ink there).

## Type

- **Pinyon Script** (self-hosted, OFL): names, section titles, monogram, day names (Samedi / Dimanche), "Merci !". Free stand-in for Vladimir Script, which the couple asked for but which can't be licensed for the web. Never uppercase.
- **Dubai** (self-hosted Latin subset, 300/400/500/700): all other text, including nav, labels, buttons, times. Body 19–22px, line-height 1.6.
- Running text (`.prose`, photographer note) is justified with automatic French hyphenation.

## Components

- **Stub** (`.stub`): ink rectangle with semicircle notches on both ends (CSS mask); the only primary-action shape.
- **Ruled lists** (`.ruled`, `.cues`, `.bill-meta`): heavy top rule, 1px hairline rows; running order is a fixed 5.5rem time column + text.
- **Ticket** (`.ticket`): stone-hi card with perforated top edge on a green section; inputs are underline-only, radios are printed squares that fill with ink.
- **FAQ**: `<details>` with drawn +/− glyph; every item has an id and opens from a URL hash.

## Motion

`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`. One entrance (cover billing rises line by line, photo settles; ≤1s, `backwards` fill so press feedback keeps working); running-order "house lights" once on first view (opacity only, 45ms stagger); conditional RSVP fields unfold (280ms grid rows); FAQ answers expand via `::details-content`; thanks panel + tick draw; inline errors fade in. Reduced motion: fades only. No scroll reveals, no parallax.

## Layout

Gutter `clamp(1rem, 4vw, 3.5rem)`, section rhythm `clamp(4.5rem, 10vw, 9rem)`. Desktop ≥960px uses 5/7 or 4/8 splits with sticky titles; the meadow photo sticks for the length of the running order. Square corners everywhere.
