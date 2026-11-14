# Golden Steam Dim Sum House — Restaurant Website

**"Little Bites. Timeless Traditions."**

A complete, premium, fully responsive multi-page website for a traditional-yet-modern dim sum
restaurant, built with **HTML5**, **Tailwind CSS** and **vanilla JavaScript** — no frameworks.

---

## 1. Project overview

Golden Steam Dim Sum House is a seven-page restaurant website with a traditional Chinese-inspired
visual identity (imperial red `#9F2525`, imperial gold `#D4A64A`, warm ivory surfaces), Playfair
Display headings, Inter body text, authentic dim sum photography, dark mode, RTL support,
category-filtered menu, weekend brunch content and a validated demo reservation form.

### Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home 1 | `index.html` | Split-layout hero, story, signature baskets, collection, why dine with us, CTA |
| Home 2 | `home2.html` | Full-bleed photographic hero, dim sum experience, chef's favorites, kitchen, brunch, CTA |
| About | `about.html` | Story, food philosophy, kitchen process, dining experience, CTA |
| Menu | `menu.html` | Filter + search toolbar, signature / steamed / fried / dessert sections, CTA |
| Weekend Brunch | `weekend-brunch.html` | Brunch hero, experience, favourites, packages, details + FAQ, CTA |
| Contact | `contact.html` | Contact cards, reservation form, location, reservation FAQ, CTA |
| Login | `login.html` | Member sign-in hero, demo login form, benefits, sign-in support, CTA |

### Features

- **Shared dynamic navbar** — complete markup lives **only** in `js/navbar.js`, injected into `<div id="navbar"></div>`.
  It is **sticky** on every page, lists *Home → About → Menu → Weekend Brunch → Contact*, and carries a
  **Login** button directly before the *Reserve a Table* CTA (in the desktop bar and in the mobile drawer).
- **Shared dynamic footer** — complete markup lives **only** in `js/footer.js`, injected into `<div id="footer"></div>`.
- **Equal-height hero banner** — every page's first section uses the shared `.hero-banner` class, so all
  heroes render at exactly the same height (44rem) on every breakpoint. Heroes without a photo centre
  their content both vertically and horizontally.
- **Demo login page** (`login.html` + `js/login.js`) — client-side validation, password show/hide,
  loading state and a clearly-marked demo success panel. The page intentionally has **no navbar**:
  the sign-in card carries the centred logo + wordmark lockup (which links back to `index.html`) and
  headings, while a floating theme + RTL toggle pill stays pinned to the top-right corner at every
  breakpoint. The editorial side panel is hidden on phones and small tablets, where only the sign-in
  card is shown. It is **not** a real authentication system: nothing is sent, stored or verified.
- **Hamburger-only navigation below 1040px** — tablets (768px / 1024px / 1032px) and phones show
  *only* the logo and hamburger icon; every link, control and CTA lives inside the full-height
  drawer. The hamburger morphs into a cross (X) while the drawer is open.
- **Home dropdown** (desktop) with smooth animation, keyboard support and active states.
- **Theme toggle** (sun/moon) with `localStorage` persistence and system-theme detection.
- **RTL toggle** — flips `document.dir`, persists per page, uses CSS logical properties throughout.
- **Menu filtering + search** with dietary labels, result counts, empty state and detail modals.
- **Weekend brunch** dishes, package cards, editable details and FAQ accordion.
- **Reservation form** with required/email/phone/date/guest validation, past-date blocking,
  configurable time slots, loading state, demo reference number and confirmation summary.
- **Accessibility**: skip link, semantic landmarks, ARIA states, focus management, focus trap in the
  drawer and modals, `prefers-reduced-motion` support, visible focus rings, descriptive alt text.
- **Responsive** from 320px → 1920px, no horizontal overflow, RTL-safe layouts.

---

## 2. Technology stack

- HTML5 (semantic, SEO-friendly meta tags)
- Tailwind CSS 3 (compiled — `css/input.css` → `css/style.css`)
- Vanilla JavaScript (ES5-compatible modules, no framework, no build step for JS)
- Local webfonts (Playfair Display, Inter, tiny Noto Serif SC subset) — works fully offline
- Local JPEG/SVG imagery in `images/` (no hotlinking, no external CDN dependencies)

---

## 3. Folder structure

```text
golden-steam-dim-sum/
│
├── index.html                 # Home 1
├── home2.html                 # Home 2 (different layout)
├── about.html
├── menu.html
├── weekend-brunch.html
├── contact.html
├── login.html                  # Demo member sign-in page
│
├── css/
│   ├── input.css              # Tailwind source (design tokens, components, themes)
│   └── style.css              # Compiled output — the file pages actually load
│
├── js/
│   ├── navbar.js              # ALL navbar markup + interactions (injected)
│   ├── footer.js              # ALL footer markup + dynamic year (injected)
│   ├── main.js                # theme, RTL, FAQ, toast, modal, reveal, back-to-top
│   ├── menu.js                # menu data + rendering + filter/search/modal
│   ├── brunch.js              # brunch data + rendering + FAQ + CTA behaviour
│   ├── reservation.js         # form validation + demo submission
│   └── login.js               # demo sign-in validation + simulated submit
│
├── images/
│   ├── hero/  logo/  signature-baskets/  steamed/  fried/  desserts/
│   └── brunch/  restaurant/  interior/  chefs/  gallery/  decorative/
│
├── assets/
│   └── fonts/                 # .woff2 files + fonts.txt reference
│
├── package.json
├── package-lock.json
├── tailwind.config.js
├── vercel.json                 # Static deploy config (no install / no build on Vercel)
├── .gitignore                  # node_modules, .vercel, logs, OS files
└── README.md
```

---

## 4. Installation

Requirements: **Node.js 18+** and **npm**.

```bash
# 1. enter the project folder
cd golden-steam-dim-sum

# 2. install Tailwind (dev dependency)
npm install

# 3. compile the stylesheet
npm run build
```

`css/style.css` is already committed in a compiled state, so the site opens in a browser
**without** running a build. Rebuild only when you change `css/input.css`, the Tailwind config,
or add new class names to HTML/JS.

### Tailwind build commands

| Command | What it does |
| --- | --- |
| `npm run build` | One-off production build → `css/style.css` (minified) |
| `npm run dev` | Watch mode: rebuilds `css/style.css` on every source change |
| `npm start` | Alias of `npm run dev` |
| `npm run serve` | Serves the folder locally at `http://localhost:4173` |

> Keep `npm run dev` running in a terminal while you work on the markup.

### Local development

Any static server works:

```bash
# option 1 — npm script
npm run serve

# option 2 — Python
python -m http.server 4173

# option 3 — VS Code "Live Preview" / "Live Server" extension
```

Then open <http://localhost:4173/index.html>.

Opening the files directly with `file://` also works (no fetch/XHR is used anywhere), although a
local server is recommended so relative paths behave exactly like production.

### Deploying to Vercel

The site is **fully static** and `css/style.css` is committed, so Vercel does not need to install or
build anything. `vercel.json` sets:

```json
{
  "framework": null,
  "installCommand": "",
  "buildCommand": "",
  "outputDirectory": "."
}
```

- `framework: null` → Vercel treats the project as "Other" (static).
- `installCommand: ""` and `buildCommand: ""` → the install and build steps are skipped.
- `outputDirectory: "."` → the repository root is served as-is.

`node_modules/` is intentionally **not** committed (see `.gitignore`); it only exists on a machine
where you run the Tailwind build locally. If you prefer Vercel to compile Tailwind on every deploy
instead, delete the empty `installCommand` / `buildCommand` entries and commit the rebuilt
`css/style.css` locally first (run `npm run build` and push it).

> After changing `css/input.css`, `tailwind.config.js` or adding new Tailwind class names, always
> run `npm run build` locally and commit the regenerated `css/style.css` — that file is what gets
> served in production.

---

## 5. Customising content

### 5.1 How to edit menu items & prices

All dishes live in **`js/menu.js`** inside the `ITEMS` array:

```js
{
  id: "st-har-gow",                  // unique id (used by the detail modal)
  name: "Har Gow — Shrimp Dumplings",
  category: "steamed",               // signature | steamed | fried | desserts
  dietary: "non-veg",                // "veg" | "non-veg"
  price: 8.4,                        // ← editable sample price
  image: "images/steamed/steamed-shrimp-dumplings.jpg",
  alt: "Steamed shrimp dumplings with translucent pleated wrappers",
  short: "One-line card description.",
  long: "Longer description shown in the detail modal.",
  tags: ["Popular"]                  // optional ribbon label
}
```

- Change `price` to update a dish price everywhere it appears (home pages + menu page).
- Change `CURRENCY` at the top of `js/menu.js` (default `"$"`).
- The "sample price" note is `PRICE_NOTE` in the same file.
- `categories` are listed in the `CATEGORIES` array — add a new category there **and** a matching
  `<section data-menu-section="…">` in `menu.html`.

### 5.2 Brunch dishes, packages, details and FAQ

Everything brunch-specific is in **`js/brunch.js`**:

- `DISHES` — brunch favourite cards
- `PACKAGES` — brunch combination cards (name, price, `includes[]`, note)
- `DETAILS` — the editable "Brunch Details" tiles (weekend days, hours, policies…)
- `FAQ` — questions and answers rendered into the accordion

### 5.3 How to change restaurant details

**`js/footer.js`** contains the single `RESTAURANT` object:

```js
var RESTAURANT = {
  name: "Golden Steam",
  legalName: "Golden Steam Dim Sum House",
  tagline: "Little Bites. Timeless Traditions.",
  description: "…",
  address: "[Restaurant street address, city, postal code]",   // ← edit
  phone:   "[+00 0000 000 000]",                              // ← edit
  email:   "[hello@yourdomain.example]",                      // ← edit
  hours:   [ { days: "[Monday – Friday]", time: "[Add opening hours]" }, … ],
  social:  [ { label: "Instagram", href: "#", icon: "instagram" }, … ]  // ← real URLs
};
```

The contact cards on `contact.html` (address / phone / email / hours) and the location block are
plain HTML — search `contact.html` for `[` placeholders and replace them.

### 5.4 How to configure opening hours

Edit the `hours` array in `js/footer.js`. Each entry renders one line in footer column 4.

### 5.5 How to customise theme colours

Colours are CSS variables defined in **`css/input.css`** (RGB triplets so Tailwind opacity
modifiers keep working):

```css
:root {
  --c-primary: 159 37 37;   /* #9F2525 Traditional Chinese Red */
  --c-gold:    212 166 74;  /* #D4A64A Imperial Gold          */
  --c-cream:   255 245 230;
  --c-page:    255 252 247;
  --c-surface: 255 255 255;
  --c-ink:     51  37  31;
  --c-muted:   128 107 93;
  --c-line:    233 220 203;
  …
}
html.dark { …dark values… }
```

Each token is exposed to Tailwind in `tailwind.config.js` (`primary`, `gold`, `page`, `surface`,
`card`, `ink`, `muted`, `line`, `tintred`, `tintgold`). After changing a token run `npm run build`.

### 5.6 How to replace food images

1. Drop the new photo into the matching folder (`images/steamed/`, `images/fried/…), keeping a
   descriptive file name.
2. If you keep the same file name **nothing else needs changing** — all references stay valid.
3. If you rename it, update the path in `js/menu.js` / `js/brunch.js` (dishes) or in the HTML page
   (heroes, editorial images).
4. Recommended sizes: heroes 1920px wide, section images 1400–1600px, cards 800–1200px (JPEG q≈80).
5. Always write descriptive `alt` text for food photos.
6. Run `npm run build` only if you added new Tailwind classes.

Image credits are listed in the [Image credits](#image-credits) section of this README.

### 5.7 Reservation time slots, guest limits and dates

At the top of **`js/reservation.js`**:

```js
var CONFIG = {
  leadTimeDays: 0,     // 0 = today allowed; past dates are always blocked
  maxDateDays: 60,     // how far ahead guests can book
  maxGuests: 12,       // larger parties → "contact the restaurant"
  timeSlots: ["11:00 AM", "11:30 AM", … ],   // ← edit freely
  diningOptions: [ … ],
  occasions: [ … ]
};
```

---

## 6. Integrating a real reservation system

The form is **frontend-only**. `js/reservation.js` validates the input, simulates a network delay
and renders a demo confirmation marked as *not confirmed*. No data leaves the browser (demo
records may be stored in `localStorage` under `gs-demo-reservations` — no payment or card data is
ever collected).

To accept real bookings:

1. **Form endpoint (your own backend)**
   Replace the `setTimeout(...)` inside the `submit` handler with:

   ```js
   const res = await fetch("https://api.yourrestaurant.com/reservations", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(data)
   });
   if (!res.ok) throw new Error("Request failed");
   const { reference, status } = await res.json();
   ```
   Keep `CONFIG.demoMode = false` and show `status === "confirmed"` only when the server says so.

2. **Third-party booking providers** — embed or link:
   - OpenTable / Resy / SevenRooms / TheFork widget (they provide an iframe or deep link),
   - Cal.com / Calendly style slot booking,
   - Google Reservations / Reserve with Google.

   Typical integration: replace the form with the provider's widget, or keep the form and post to
   the provider's API. Deep links can preselect the dining option the same way
   `contact.html?dining=weekend-brunch#reservation` already does.

3. **Email fallback** — services such as Formspree, Basin or Netlify Forms accept a `POST` to an
   endpoint by adding `action` + `method` attributes to the `<form>` and removing
   `event.preventDefault()`.

4. **Always show real availability** — do not display "table available" until a backend confirms it.

---

## 7. Frontend-only limitations

- Submissions are **not** delivered to the restaurant; the confirmation screen is explicitly a demo.
- There is no live table availability, no payment processing and no server-side storage.
- Prices, opening hours, address, phone, email, policies, social links and dietary labels are
  **placeholders** and must be verified by the business before publishing.
- Menu dietary labels are sample content — **not** allergen declarations.
- Reservation records kept in `localStorage` exist only in the current browser.

---

## 8. Testing checklist

- [x] Seven pages with working navigation between them
- [x] Navbar markup exists only in `js/navbar.js`; footer markup only in `js/footer.js`
- [x] Sticky navbar on every page (stays pinned after scrolling) + sticky menu filter toolbar
- [x] Nav order Home → About → Menu → Weekend Brunch → Contact; Login button sits directly
      before *Reserve a Table* in the desktop bar and the mobile drawer
- [x] All page heroes share one equal height (`.hero-banner`); photo-less heroes centre content
- [x] Desktop navbar (≥1040px): brand, centre links, Home dropdown, theme + RTL toggles, CTA
- [x] Tablet & mobile (<1040px): **only** brand + hamburger; everything else inside the drawer
- [x] Hamburger turns into a cross (X) while the drawer is open
- [x] Drawer: open/close animation, outside click, Escape, scroll lock, focus trap, link close
- [x] Theme toggle + RTL toggle persist across all pages (`localStorage`)
- [x] Menu category filter, search, empty state and item detail modal
- [x] Weekend brunch rendering, packages, editable details and FAQ
- [x] Reservation validation: required, email, phone, past dates, guest limits, time slots
- [x] Demo confirmation clearly marked as unconfirmed
- [x] Login form validation (email, password length), loading state, demo-only success panel
- [x] Local images only, descriptive alt text, lazy loading below the fold, JS image fallback
- [x] Responsive 320 → 1920px, RTL-safe, no horizontal overflow
- [x] `npm run build` compiles `css/style.css` successfully

---

## 9. Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari — last 2 years). Uses CSS logical
properties, `grid-template-rows` transitions, `IntersectionObserver`, `inert` and CSS variables;
a graceful fallback exists for `IntersectionObserver` and `localStorage`.
