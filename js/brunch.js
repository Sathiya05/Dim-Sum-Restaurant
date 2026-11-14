/* ==========================================================================
   Golden Steam Dim Sum House — brunch.js
   - Weekend brunch dish + package data (fully editable)
   - Brunch menu rendering
   - Brunch package cards
   - Brunch details + FAQ accordion wiring
   - Brunch CTA behaviour (preselects the brunch dining option)
   ========================================================================== */
(function () {
  "use strict";

  var GS = (window.GS = window.GS || {});

  /* ======================================================================
     EDITABLE BRUNCH DATA
     ====================================================================== */
  var CURRENCY = "$";

  /* --------------------------- BRUNCH DISHES --------------------------- */
  var DISHES = [
    {
      id: "br-steamer-platter",
      name: "Weekend Steamer Platter",
      price: 15.9,
      image: "images/brunch/brunch-spread.jpg",
      alt: "Dim sum brunch spread with several bamboo steamers on a table",
      dietary: "non-veg",
      short:
        "A generous table platter of steamed favourites — the easiest way to start a slow weekend morning.",
      long:
        "A shareable selection of steamed baskets chosen by the kitchen: dumplings, buns and open-top " +
        "favourites served hot, basket after basket."
    },
    {
      id: "br-duo",
      name: "Har Gow & Siu Mai Duo",
      price: 12.5,
      image: "images/steamed/steamed-shrimp-dumplings.jpg",
      alt: "Shrimp dumplings and siu mai served together",
      dietary: "non-veg",
      short: "The two classics side by side — shrimp har gow and hand-filled siu mai.",
      long: "Our two most requested dumplings served together so the table can compare textures and fillings."
    },
    {
      id: "br-xlb",
      name: "Morning Soup Dumplings",
      price: 13.2,
      image: "images/steamed/soup-dumplings.jpg",
      alt: "Xiao long bao soup dumplings in a steamer",
      dietary: "non-veg",
      short: "Xiao long bao steamed to order for a comforting weekend start.",
      long: "Thin-skinned soup dumplings filled with seasoned pork and hot broth — best enjoyed first."
    },
    {
      id: "br-fried",
      name: "Golden Fried Breakfast Basket",
      price: 11.4,
      image: "images/fried/spring-rolls.jpg",
      alt: "Crispy golden fried dim sum basket",
      dietary: "veg",
      short: "Crispy spring rolls and golden bites for a satisfying crunch alongside tea.",
      long: "A plate of crisp fried favourites to balance the steamed baskets at the table."
    },
    {
      id: "br-tea",
      name: "Tea & Dim Sum Pairing",
      price: 6.8,
      image: "images/brunch/tea-and-dim-sum.jpg",
      alt: "Chinese tea served alongside dim sum",
      dietary: "veg",
      short: "Traditional leaf tea served in the classic yum-cha style, refilled at the table.",
      long: "Choose from a selection of traditional teas to accompany the meal — the heart of weekend yum cha."
    },
    {
      id: "br-sweet",
      name: "Sweet Brunch Finish",
      price: 9.6,
      image: "images/desserts/egg-tarts.jpg",
      alt: "Warm egg tarts served for dessert",
      dietary: "veg",
      short: "Warm egg tarts and a small dessert bite to end the brunch slowly.",
      long: "A small plate of baked and sweet treats to share at the end of the weekend meal."
    }
  ];

  /* -------------------------- BRUNCH PACKAGES -------------------------- */
  var PACKAGES = [
    {
      id: "pk-classic",
      name: "Classic Brunch Basket",
      price: 24.0,
      serves: "Serves 1–2 (sample)",
      note: "Sample package — confirm contents and price with the restaurant.",
      includes: [
        "2 steamed dumpling baskets",
        "1 fried basket",
        "Pot of traditional leaf tea",
        "1 sweet bite to finish"
      ],
      featured: false
    },
    {
      id: "pk-family",
      name: "Family Sharing Basket",
      price: 58.0,
      serves: "Serves 4 (sample)",
      note: "Sample package — confirm contents and price with the restaurant.",
      includes: [
        "4 steamed baskets of choice",
        "2 fried baskets",
        "Char siu bao (3 pcs)",
        "2 pots of tea",
        "Mango pudding to share"
      ],
      featured: true
    },
    {
      id: "pk-veg",
      name: "Vegetarian Brunch Selection",
      price: 22.0,
      serves: "Serves 1–2 (sample)",
      note: "Sample package — confirm contents and price with the restaurant.",
      includes: [
        "Vegetable dumpling basket",
        "Crispy spring rolls",
        "Sesame balls",
        "Pot of traditional leaf tea"
      ],
      featured: false
    },
    {
      id: "pk-signature",
      name: "Signature Brunch Experience",
      price: 76.0,
      serves: "Serves 4 (sample)",
      note: "Sample package — confirm contents and price with the restaurant.",
      includes: [
        "Chef's special basket",
        "Har gow, siu mai & xiao long bao",
        "Fried favourites selection",
        "Premium tea service",
        "Dessert selection for the table"
      ],
      featured: false
    }
  ];

  /* ------------------------ BRUNCH DETAILS (editable) ------------------ */
  var DETAILS = [
    {
      label: "Weekend days",
      value: "[Add weekend operating days]",
      hint: "Edit this row inside js/brunch.js."
    },
    {
      label: "Brunch hours",
      value: "[Add brunch service hours]",
      hint: "Edit this row inside js/brunch.js."
    },
    {
      label: "Reservations",
      value: "[Add recommended booking window]",
      hint: "Weekend tables are busiest — add your own guidance here."
    },
    {
      label: "Group seating",
      value: "[Add large-group policy]",
      hint: "Tell guests how many people can be seated together."
    },
    {
      label: "Dietary enquiries",
      value: "[Add allergy & dietary contact]",
      hint: "Only add guidance your kitchen can verify."
    },
    {
      label: "Restaurant policies",
      value: "[Add cancellation / timing policies]",
      hint: "All policies must be verified by the business."
    }
  ];

  /* ----------------------------- BRUNCH FAQ ---------------------------- */
  var FAQ = [
    {
      q: "When is weekend brunch served?",
      a: "Weekend operating days and brunch hours are editable placeholders — set them in js/brunch.js (Brunch details) and they will appear on this page. Until the restaurant confirms its schedule, please contact us before visiting."
    },
    {
      q: "Do I need to reserve a brunch table?",
      a: "Weekend tables fill up quickly, especially for families and larger groups. You can send a reservation request from the contact page; the restaurant will confirm availability directly with you."
    },
    {
      q: "Can you seat larger groups together?",
      a: "Group seating depends on table availability. Mention your party size in the reservation form's special requests field, and the restaurant will confirm what is possible."
    },
    {
      q: "Do you cater to dietary requirements?",
      a: "Vegetarian dishes are marked on our sample menu. For allergies or specific dietary requirements, please contact the restaurant before ordering — our kitchen is not an allergen-free environment and labels on this site are not verified ingredient declarations."
    },
    {
      q: "Are the brunch packages unlimited?",
      a: "No — the packages shown here are sample combinations with placeholder prices. Nothing on this page should be read as an unlimited or all-you-can-eat offer unless the restaurant states so directly."
    }
  ];

  GS.brunchData = { dishes: DISHES, packages: PACKAGES, details: DETAILS, faq: FAQ };

  /* ---------------------------------------------------------------------
     Rendering
     --------------------------------------------------------------------- */
  function money(v) {
    return CURRENCY + Number(v).toFixed(2);
  }

  var ARROW =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' +
    'class="h-3.5 w-3.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';

  function renderDishes() {
    var host = document.querySelector("[data-brunch-grid]");
    if (!host) return;
    host.innerHTML = DISHES.map(function (d) {
      var tag =
        d.dietary === "veg"
          ? '<span class="tag tag-veg">Vegetarian</span>'
          : '<span class="tag tag-nonveg">Non-vegetarian</span>';
      return (
        '<article class="menu-card">' +
        '<div class="menu-card-media">' +
        '<img src="' + d.image + '" alt="' + d.alt + '" loading="lazy" width="800" height="600" />' +
        '<span class="absolute start-3 top-3">' + tag + "</span>" +
        "</div>" +
        '<div class="menu-card-body">' +
        '<div class="flex items-start justify-between gap-3">' +
        '<h3 class="font-display text-lg sm:text-xl">' + d.name + "</h3>" +
        '<span class="price no-wrap shrink-0">' + money(d.price) + "</span></div>" +
        '<p class="mt-2 flex-1 text-sm leading-relaxed text-muted">' + d.short + "</p>" +
        '<div class="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-line pt-3">' +
        '<span class="text-[0.66rem] leading-tight text-muted/85">Sample price — editable in js/brunch.js</span>' +
        '<button type="button" class="link-arrow" data-brunch-detail="' + d.id + '">Details' + ARROW + "</button>" +
        "</div></div></article>"
      );
    }).join("");
    if (typeof GS.initImageFallback === "function") GS.initImageFallback(host);
  }

  function renderPackages() {
    var host = document.querySelector("[data-brunch-packages]");
    if (!host) return;
    host.innerHTML = PACKAGES.map(function (p) {
      var list = p.includes
        .map(function (inc) {
          return (
            '<li class="flex items-start gap-2.5 text-sm text-muted">' +
            '<span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tintgold text-primary">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3" aria-hidden="true">' +
            '<path d="M20 6 9 17l-5-5"/></svg></span>' +
            "<span>" + inc + "</span></li>"
          );
        })
        .join("");

      return (
        '<article class="card card-hover relative flex flex-col overflow-hidden p-6' +
        (p.featured ? " border-gold/70 ring-1 ring-gold/40" : "") + '">' +
        (p.featured
          ? '<span class="tag tag-gold absolute end-5 top-5">Most popular</span>'
          : "") +
        '<p class="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">Weekend brunch package</p>' +
        '<h3 class="mt-2 font-display text-xl sm:text-2xl">' + p.name + "</h3>" +
        '<p class="mt-1 text-xs text-muted">' + p.serves + "</p>" +
        '<div class="mt-4 flex items-end gap-2 border-y border-line py-4">' +
        '<span class="price text-2xl">' + money(p.price) + "</span>" +
        '<span class="pb-1 text-xs text-muted">sample price</span></div>' +
        '<ul class="mt-4 space-y-2.5">' + list + "</ul>" +
        '<p class="mt-4 text-[0.68rem] leading-relaxed text-muted/85">' + p.note + "</p>" +
        '<a href="contact.html?dining=weekend-brunch#reservation" class="btn-outline mt-5 w-full">Reserve this package</a>' +
        "</article>"
      );
    }).join("");
  }

  function renderDetails() {
    var host = document.querySelector("[data-brunch-details]");
    if (!host) return;
    host.innerHTML = DETAILS.map(function (d) {
      return (
        '<div class="card p-5">' +
        '<p class="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">' + d.label + "</p>" +
        '<p class="mt-2 font-display text-base text-ink">' + d.value + "</p>" +
        '<p class="mt-2 text-xs leading-relaxed text-muted">' + d.hint + "</p>" +
        "</div>"
      );
    }).join("");
  }

  function renderFaq() {
    var host = document.querySelector("[data-brunch-faq]");
    if (!host) return;
    host.innerHTML = FAQ.map(function (f, i) {
      return (
        '<div class="faq-item' + (i === 0 ? " is-open" : "") + '">' +
        '<button type="button" class="faq-question">' +
        "<span>" + f.q + "</span>" +
        '<span class="faq-icon" aria-hidden="true">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" class="h-4 w-4"><path d="M12 5v14M5 12h14"/></svg>' +
        "</span></button>" +
        '<div class="faq-answer"><div><p>' + f.a + "</p></div></div>" +
        "</div>"
      );
    }).join("");
    if (typeof GS.initFaqs === "function") GS.initFaqs(host);
  }

  /* ---------------------------------------------------------------------
     Detail modal for brunch dishes
     --------------------------------------------------------------------- */
  function wireDetail() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-brunch-detail]");
      if (!btn || !GS.modal) return;
      var id = btn.getAttribute("data-brunch-detail");
      var dish = DISHES.filter(function (d) {
        return d.id === id;
      })[0];
      if (!dish) return;
      var tag =
        dish.dietary === "veg"
          ? '<span class="tag tag-veg">Vegetarian</span>'
          : '<span class="tag tag-nonveg">Non-vegetarian</span>';
      GS.modal.open({
        eyebrow: "Weekend brunch",
        title: dish.name,
        body:
          '<img src="' + dish.image + '" alt="' + dish.alt + '" loading="lazy" ' +
          'class="mb-4 h-56 w-full rounded-xl object-cover" />' +
          "<p>" + dish.long + "</p>" +
          '<div class="mt-4 flex flex-wrap gap-2">' + tag +
          '<span class="tag tag-gold">' + money(dish.price) + "</span></div>" +
          '<p class="mt-4 text-xs leading-relaxed text-muted/90">' +
          "Sample price — editable in js/brunch.js. Dietary labels are sample content, not verified allergen " +
          "information.</p>",
        actions: [
          { label: "Reserve a brunch table", href: "contact.html?dining=weekend-brunch#reservation", className: "btn-primary" }
        ]
      });
    });
  }

  /* ---------------------------------------------------------------------
     Brunch CTA behaviour — preselect the brunch dining preference
     --------------------------------------------------------------------- */
  function wireCta() {
    document.addEventListener("click", function (e) {
      var link = e.target.closest("[data-brunch-cta]");
      if (!link) return;
      /* reservation.js reads ?dining= and preselects the option */
      GS.storage.set("gs-pending-dining", "weekend-brunch");
    });
  }

  /* ---------------------------------------------------------------------
     Initialiser (called by main.js)
     --------------------------------------------------------------------- */
  GS.initBrunchPage = function () {
    renderDishes();
    renderPackages();
    renderDetails();
    renderFaq();
    wireDetail();
    wireCta();
  };

  /* If main.js already booted, start immediately. */
  if (GS.booted) GS.initBrunchPage();
})();
