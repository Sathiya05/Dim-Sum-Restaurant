/* ==========================================================================
   Golden Steam Dim Sum House — menu.js
   - Editable menu data (items, categories, prices, dietary labels)
   - Signature basket rendering (home 1 + menu page)
   - Steamed / fried / dessert rendering
   - Category filtering, search, dietary labels, item detail modal
   ========================================================================== */
(function () {
  "use strict";

  var GS = (window.GS = window.GS || {});

  /* ======================================================================
     EDITABLE MENU DATA  ← change names, descriptions, prices and images
     here. Every card on the site is rendered from this array.
     ====================================================================== */
  var CURRENCY = "$"; /* sample currency symbol — edit freely */

  var CATEGORIES = [
    { id: "all", label: "All Menu" },
    { id: "signature", label: "Signature Baskets", sectionId: "signature-baskets" },
    { id: "steamed", label: "Steamed", sectionId: "steamed" },
    { id: "fried", label: "Fried", sectionId: "fried" },
    { id: "desserts", label: "Desserts", sectionId: "desserts" }
  ];

  var ITEMS = [
    /* ------------------------- SIGNATURE BASKETS ------------------------ */
    {
      id: "sig-har-gow",
      name: "Classic Har Gow Basket",
      category: "signature",
      dietary: "non-veg",
      price: 9.8,
      image: "images/signature-baskets/har-gow.jpg",
      alt: "Translucent steamed shrimp dumplings (har gow) in a bamboo basket",
      short:
        "Translucent wrappers folded around seasoned shrimp — the benchmark basket of any dim sum table.",
      long:
        "Delicate, crystal-like wrappers encasing juicy shrimp. Steamed to order in bamboo baskets and served " +
        "with a light dipping sauce. Four pieces per basket.",
      tags: ["Signature"],
      featured: true
    },
    {
      id: "sig-siu-mai",
      name: "Signature Siu Mai Basket",
      category: "signature",
      dietary: "non-veg",
      price: 9.5,
      image: "images/signature-baskets/siu-mai.jpg",
      alt: "Open-top siu mai dumplings topped with roe in a steamer",
      short:
        "Open-topped dumplings of seasoned pork and shrimp, hand-filled and steamed the traditional way.",
      long:
        "An open-top classic: seasoned pork and shrimp filling wrapped by hand, steamed until juicy and served " +
        "with a touch of garnish. Six pieces per basket.",
      tags: ["Signature", "Popular"],
      featured: true
    },
    {
      id: "sig-xiao-long-bao",
      name: "Pork Xiao Long Bao",
      category: "signature",
      dietary: "non-veg",
      price: 10.2,
      image: "images/signature-baskets/xiao-long-bao.jpg",
      alt: "Soup dumplings (xiao long bao) in a bamboo steamer",
      short:
        "Soup dumplings with a rich, savoury broth sealed inside a thin, carefully pleated wrapper.",
      long:
        "Thinly rolled wrappers are pleated around seasoned pork and a chilled broth that melts into soup while " +
        "steaming. Pierce the skin, sip the broth, then enjoy. Six pieces per basket.",
      tags: ["Signature"],
      featured: true
    },
    {
      id: "sig-vegetable",
      name: "Vegetable Dumpling Basket",
      category: "signature",
      dietary: "veg",
      price: 8.6,
      image: "images/signature-baskets/vegetable-dumplings.jpg",
      alt: "Pleated vegetable dumplings steamed in a basket",
      short:
        "Bright seasonal vegetables and aromatic herbs folded into soft, hand-pleated wrappers.",
      long:
        "A lighter basket of hand-pleated dumplings filled with seasoned seasonal vegetables and herbs. " +
        "Steamed fresh to order. Six pieces per basket.",
      tags: ["Vegetarian"],
      featured: true
    },
    {
      id: "sig-mixed",
      name: "Mixed Dim Sum Selection",
      category: "signature",
      dietary: "non-veg",
      price: 14.5,
      image: "images/signature-baskets/mixed-dim-sum.jpg",
      alt: "Assorted dim sum dishes served together in bamboo steamers",
      short:
        "A shared platter of house favourites — perfect for first visits and shared tables.",
      long:
        "A generous sampling of popular baskets chosen by the kitchen so a table can taste a little of " +
        "everything. Ideal for two to share.",
      tags: ["Sharing"],
      featured: true
    },
    {
      id: "sig-chef",
      name: "Chef's Special Basket",
      category: "signature",
      dietary: "non-veg",
      price: 16.8,
      image: "images/signature-baskets/chefs-special.jpg",
      alt: "Premium assorted dim sum platter prepared by the chef",
      short:
        "A premium selection of the kitchen's most-loved dumplings and buns, arranged for sharing.",
      long:
        "The chef's choice of premium pieces — including seasonal dumplings and hand-finished buns — presented " +
        "as one abundant basket for the table.",
      tags: ["Chef's Pick"],
      featured: true
    },

    /* ----------------------------- STEAMED ------------------------------ */
    {
      id: "st-har-gow",
      name: "Har Gow — Shrimp Dumplings",
      category: "steamed",
      dietary: "non-veg",
      price: 8.4,
      image: "images/steamed/steamed-shrimp-dumplings.jpg",
      alt: "Steamed shrimp dumplings with translucent pleated wrappers",
      short: "Crystal wrappers, whole shrimp, delicate pleats — a dim sum house signature.",
      long:
        "Fresh shrimp encased in a thin, translucent wrapper and pleated by hand. Steamed in bamboo and served " +
        "immediately for the best texture.",
      tags: ["Popular"]
    },
    {
      id: "st-siu-mai",
      name: "Siu Mai — Open-Top Dumplings",
      category: "steamed",
      dietary: "non-veg",
      price: 8.2,
      image: "images/steamed/steamed-pork-dumplings.jpg",
      alt: "Open-top siu mai dumplings steaming in a basket",
      short: "Juicy pork and shrimp filling in an open wrapper, steamed in small batches.",
      long: "A classic open-top dumpling of seasoned pork and shrimp, hand-filled and steamed to order.",
      tags: []
    },
    {
      id: "st-vegetable",
      name: "Vegetable Dumplings",
      category: "steamed",
      dietary: "veg",
      price: 7.4,
      image: "images/steamed/steamed-vegetable-dumplings.jpg",
      alt: "Steamed vegetable dumplings with pleated wrappers",
      short: "Seasonal vegetables and herbs in a soft, hand-pleated wrapper.",
      long: "A fresh, lighter option filled with seasoned seasonal vegetables and aromatics.",
      tags: ["Vegetarian"]
    },
    {
      id: "st-xlb",
      name: "Xiao Long Bao — Soup Dumplings",
      category: "steamed",
      dietary: "non-veg",
      price: 9.6,
      image: "images/steamed/soup-dumplings.jpg",
      alt: "Soup dumplings in a bamboo steamer basket",
      short: "Thin-skinned dumplings filled with seasoned pork and hot savoury broth.",
      long: "Pleated by hand and steamed so the broth inside turns to soup. Served with ginger-vinegar dip.",
      tags: ["Popular"]
    },
    {
      id: "st-char-siu-bao",
      name: "Char Siu Bao — BBQ Pork Buns",
      category: "steamed",
      dietary: "non-veg",
      price: 7.9,
      image: "images/steamed/bbq-pork-buns.jpg",
      alt: "Fluffy steamed BBQ pork buns",
      short: "Cloud-soft buns filled with savoury-sweet BBQ pork, steamed until pillowy.",
      long: "Fluffy steamed buns wrapped around a sweet and savoury BBQ pork filling. Three pieces per basket.",
      tags: []
    },
    {
      id: "st-chicken",
      name: "Chicken Dumplings",
      category: "steamed",
      dietary: "non-veg",
      price: 7.8,
      image: "images/steamed/chicken-dumplings.jpg",
      alt: "Steamed chicken dumplings in a bamboo basket",
      short: "Tender seasoned chicken with aromatics, folded and steamed fresh.",
      long: "A gently seasoned chicken filling folded into thin wrappers and steamed in bamboo.",
      tags: []
    },

    /* ------------------------------ FRIED ------------------------------- */
    {
      id: "fr-spring-rolls",
      name: "Crispy Spring Rolls",
      category: "fried",
      dietary: "veg",
      price: 6.9,
      image: "images/fried/spring-rolls.jpg",
      alt: "Golden fried spring rolls stacked on a plate",
      short: "Shatteringly crisp rolls with a finely shredded vegetable filling.",
      long: "Rolled to order and fried until golden, with a crunchy vegetable centre. Four pieces per plate.",
      tags: ["Vegetarian"]
    },
    {
      id: "fr-wontons",
      name: "Crispy Wontons",
      category: "fried",
      dietary: "non-veg",
      price: 7.2,
      image: "images/fried/crispy-wontons.jpg",
      alt: "Golden fried wontons served crispy",
      short: "Thin wonton parcels fried to a deep gold, served with a dipping sauce.",
      long: "Crisp, golden parcels with a seasoned filling, fried fresh and served hot.",
      tags: []
    },
    {
      id: "fr-sesame",
      name: "Golden Sesame Balls",
      category: "fried",
      dietary: "veg",
      price: 6.4,
      image: "images/fried/sesame-balls.jpg",
      alt: "Golden sesame balls coated in toasted sesame seeds",
      short: "Chewy, sesame-crusted balls with a lightly sweet centre.",
      long: "A much-loved fried favourite: crisp outside, chewy inside, rolled in toasted sesame seeds.",
      tags: ["Vegetarian"]
    },
    {
      id: "fr-dumplings",
      name: "Pan-Fried Dumplings",
      category: "fried",
      dietary: "non-veg",
      price: 8.1,
      image: "images/fried/fried-dumplings.jpg",
      alt: "Pan-fried dumplings with crisp golden bottoms",
      short: "Crisp-bottomed dumplings with a juicy seasoned filling.",
      long: "Pan-fried until the base is crisp while the top stays tender — a satisfying contrast in every bite.",
      tags: ["Popular"]
    },
    {
      id: "fr-taro",
      name: "Crispy Taro Puffs",
      category: "fried",
      dietary: "veg",
      price: 7.6,
      image: "images/fried/taro-puffs.jpg",
      alt: "Crispy fried taro puffs with lacy golden crust",
      short: "Lacy, golden taro puffs with a smooth savoury centre.",
      long: "A lacy-crust classic: mashed taro shaped around a savoury filling and fried until crisp.",
      tags: ["Vegetarian"]
    },

    /* ----------------------------- DESSERTS ----------------------------- */
    {
      id: "de-mango",
      name: "Mango Pudding",
      category: "desserts",
      dietary: "veg",
      price: 5.8,
      image: "images/desserts/mango-pudding.jpg",
      alt: "Chilled mango pudding served in a bowl",
      short: "Silky chilled mango pudding — a light, classic finish to the meal.",
      long: "Smooth, refreshing mango pudding served chilled. A traditional end to a dim sum meal.",
      tags: ["Popular"]
    },
    {
      id: "de-egg-tart",
      name: "Egg Tarts",
      category: "desserts",
      dietary: "veg",
      price: 6.2,
      image: "images/desserts/egg-tarts.jpg",
      alt: "Baked Chinese egg tarts with flaky pastry",
      short: "Silky custard set in flaky pastry, baked fresh through the day.",
      long: "Golden custard tarts with a delicate crust — best enjoyed warm from the oven. Two pieces per order.",
      tags: []
    },
    {
      id: "de-sesame",
      name: "Sweet Sesame Balls",
      category: "desserts",
      dietary: "veg",
      price: 6.4,
      image: "images/desserts/sesame-balls-dessert.jpg",
      alt: "Sweet sesame balls served as dessert",
      short: "Warm, chewy and nutty — a comforting traditional sweet bite.",
      long: "The sweet version of a dim sum classic: crisp, chewy and rolled in toasted sesame seeds.",
      tags: ["Vegetarian"]
    },
    {
      id: "de-red-bean",
      name: "Sweet Red Bean Buns",
      category: "desserts",
      dietary: "veg",
      price: 5.9,
      image: "images/desserts/sweet-red-bean-buns.jpg",
      alt: "Soft steamed buns filled with sweet red bean paste",
      short: "Pillowy steamed buns filled with smooth sweet red bean paste.",
      long: "Soft, fluffy buns wrapped around a lightly sweet red bean filling and steamed to order.",
      tags: []
    },
    {
      id: "de-selection",
      name: "Traditional Dessert Selection",
      category: "desserts",
      dietary: "veg",
      price: 8.9,
      image: "images/desserts/chinese-dessert-selection.jpg",
      alt: "Assortment of traditional Chinese desserts",
      short: "A shared plate of traditional sweet bites to close the meal.",
      long: "A changing selection of traditional desserts — ideal for sharing at the end of brunch.",
      tags: ["Sharing"]
    }
  ];

  /* expose data so it can be edited or extended from the console */
  GS.menuData = { categories: CATEGORIES, items: ITEMS, currency: CURRENCY };

  var PRICE_NOTE = "Sample price — editable in js/menu.js";

  /* ---------------------------------------------------------------------
     Helpers
     --------------------------------------------------------------------- */
  function money(value) {
    return CURRENCY + Number(value).toFixed(2);
  }

  function categoryLabel(id) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === id) return CATEGORIES[i].label;
    }
    return "";
  }

  function dietaryTag(item) {
    if (item.dietary === "veg") return '<span class="tag tag-veg">Vegetarian</span>';
    if (item.dietary === "non-veg")
      return '<span class="tag tag-nonveg">Non-vegetarian</span>';
    return "";
  }

  function extraTag(item) {
    if (!item.tags || !item.tags.length) return "";
    return '<span class="tag tag-gold">' + item.tags[0] + "</span>";
  }

  var ARROW =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' +
    'class="h-3.5 w-3.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';

  /* ---------------------------------------------------------------------
     Card renderer (shared by home pages and the menu page)
     --------------------------------------------------------------------- */
  function itemCard(item, options) {
    options = options || {};
    var searchable =
      (item.name + " " + item.short + " " + categoryLabel(item.category)).toLowerCase();
    var dataAttrs =
      'data-menu-item data-item-id="' + item.id + '" data-search="' +
      searchable.replace(/"/g, "") + '" data-category="' + item.category + '"';

    /* ---- variant: editorial image-overlay card (home 2) ---- */
    if (options.variant === "overlay") {
      return (
        '<article class="group relative block overflow-hidden rounded-2xl border border-line shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift" ' +
        dataAttrs + ">" +
        '<div class="relative aspect-[4/5] overflow-hidden bg-tintgold">' +
        '<img src="' + item.image + '" alt="' + item.alt + '" loading="' +
        (options.eager ? "eager" : "lazy") + '" width="800" height="1000" ' +
        'class="media-cover transition-transform duration-700 group-hover:scale-105" />' +
        '<div class="absolute inset-0 bg-gradient-to-t from-[#211815] via-[#211815]/55 to-transparent" aria-hidden="true"></div>' +
        '<span class="absolute start-4 top-4">' + dietaryTag(item) + "</span>" +
        '<div class="absolute inset-x-0 bottom-0 p-5">' +
        '<div class="flex items-start justify-between gap-3">' +
        '<h3 class="font-display text-xl leading-snug text-cream">' + item.name + "</h3>" +
        '<span class="price no-wrap shrink-0 text-gold">' + money(item.price) + "</span></div>" +
        '<p class="mt-1.5 line-clamp-3 text-sm leading-relaxed text-cream/80">' + item.short + "</p>" +
        '<button type="button" class="link-arrow mt-3 text-gold hover:text-cream" data-item-detail="' +
        item.id + '">View details' + ARROW + "</button>" +
        "</div></div></article>"
      );
    }

    /* ---- variant: standard surface card ---- */
    return (
      '<article class="menu-card" ' + dataAttrs + ">" +

      '<div class="menu-card-media">' +
      '<img src="' + item.image + '" alt="' + item.alt + '" loading="' +
      (options.eager ? "eager" : "lazy") + '" width="800" height="600" />' +
      '<span class="absolute start-3 top-3">' + dietaryTag(item) + "</span>" +
      (item.tags && item.tags.length
        ? '<span class="absolute end-3 top-3">' + extraTag(item) + "</span>"
        : "") +
      "</div>" +

      '<div class="menu-card-body">' +
      '<div class="flex items-start justify-between gap-3">' +
      '<h3 class="font-display text-lg leading-snug sm:text-xl">' + item.name + "</h3>" +
      '<span class="price no-wrap shrink-0">' + money(item.price) + "</span>" +
      "</div>" +
      '<p class="mt-2 flex-1 text-sm leading-relaxed text-muted">' + item.short + "</p>" +
      '<div class="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-line pt-3">' +
      '<span class="text-[0.66rem] leading-tight text-muted/85">' + PRICE_NOTE + "</span>" +
      '<button type="button" class="link-arrow" data-item-detail="' + item.id + '">' +
      "View details" + ARROW +
      "</button></div>" +
      "</div></article>"
    );
  }

  GS.renderItemCard = itemCard;

  function renderInto(selector, items, options) {
    var host = document.querySelector(selector);
    if (!host) return false;
    if (!items.length) {
      host.innerHTML =
        '<p class="text-sm text-muted">No dishes to show here yet.</p>';
      return true;
    }
    var variant = host.getAttribute("data-variant");
    host.innerHTML = items
      .map(function (item, i) {
        return itemCard(item, {
          eager: options && options.eager && i < 3,
          variant: variant
        });
      })
      .join("");
    if (typeof GS.initImageFallback === "function") GS.initImageFallback(host);
    return true;
  }

  function byCategory(id) {
    return ITEMS.filter(function (i) {
      return i.category === id;
    });
  }

  /* ---------------------------------------------------------------------
     Menu page : sections, filter chips, search, empty state
     --------------------------------------------------------------------- */
  function renderMenuSections() {
    ["signature", "steamed", "fried", "desserts"].forEach(function (cat) {
      var section = document.querySelector('[data-menu-section="' + cat + '"]');
      if (!section) return;
      var grid = section.querySelector("[data-item-grid]");
      if (!grid) return;
      grid.innerHTML = byCategory(cat)
        .map(function (item) {
          return itemCard(item);
        })
        .join("");
      var count = section.querySelector("[data-section-count]");
      if (count) count.textContent = byCategory(cat).length + " dishes";
      if (typeof GS.initImageFallback === "function") GS.initImageFallback(grid);
    });
  }

  function renderChips() {
    var host = document.querySelector("[data-menu-filters]");
    if (!host) return;
    host.innerHTML = CATEGORIES.map(function (cat, i) {
      return (
        '<button type="button" class="menu-chip' + (i === 0 ? " is-active" : "") +
        '" data-filter="' + cat.id + '" aria-pressed="' + (i === 0 ? "true" : "false") + '">' +
        cat.label +
        "</button>"
      );
    }).join("");
  }

  function applyFilter() {
    var activeChip = document.querySelector("[data-filter].is-active");
    var filter = activeChip ? activeChip.getAttribute("data-filter") : "all";
    var searchInput = document.querySelector("[data-menu-search]");
    var q = searchInput ? searchInput.value.trim().toLowerCase() : "";

    var totalVisible = 0;

    document.querySelectorAll("[data-menu-section]").forEach(function (section) {
      var cat = section.getAttribute("data-menu-section");
      var sectionMatches = filter === "all" || filter === cat;
      var visibleInSection = 0;

      section.querySelectorAll("[data-menu-item]").forEach(function (card) {
        var haystack = card.getAttribute("data-search") || "";
        var matchesQuery = !q || haystack.indexOf(q) !== -1;
        var show = sectionMatches && matchesQuery;
        card.classList.toggle("hidden", !show);
        if (show) {
          visibleInSection++;
          totalVisible++;
        }
      });

      section.classList.toggle("hidden", !sectionMatches || visibleInSection === 0);
    });

    var empty = document.querySelector("[data-menu-empty]");
    if (empty) empty.classList.toggle("hidden", totalVisible !== 0);

    var countEl = document.querySelector("[data-results-count]");
    if (countEl) {
      countEl.textContent = q
        ? totalVisible + ' result' + (totalVisible === 1 ? "" : "s") + ' for "' + searchInput.value.trim() + '"'
        : totalVisible + " dishes on the menu";
    }
  }

  function wireMenuControls() {
    var filters = document.querySelector("[data-menu-filters]");
    if (filters) {
      filters.addEventListener("click", function (e) {
        var chip = e.target.closest("[data-filter]");
        if (!chip) return;
        filters.querySelectorAll("[data-filter]").forEach(function (c) {
          c.classList.remove("is-active");
          c.setAttribute("aria-pressed", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
        applyFilter();

        var id = chip.getAttribute("data-filter");
        var target = CATEGORIES.filter(function (c) {
          return c.id === id;
        })[0];
        if (target && target.sectionId) {
          var section = document.getElementById(target.sectionId);
          if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }

    var search = document.querySelector("[data-menu-search]");
    if (search) {
      search.addEventListener("input", applyFilter);
      search.addEventListener("search", applyFilter);
      var clear = document.querySelector("[data-menu-clear]");
      if (clear) {
        clear.addEventListener("click", function () {
          search.value = "";
          applyFilter();
          search.focus();
        });
      }
    }

    var reset = document.querySelector("[data-menu-reset]");
    if (reset) {
      reset.addEventListener("click", function () {
        var allChip = document.querySelector('[data-filter="all"]');
        if (allChip) allChip.click();
        if (search) search.value = "";
        applyFilter();
      });
    }
  }

  /* ---------------------------------------------------------------------
     Item detail modal
     --------------------------------------------------------------------- */
  function wireDetailTriggers() {
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-item-detail]");
      if (!trigger || !GS.modal) return;
      var id = trigger.getAttribute("data-item-detail");
      var item = ITEMS.filter(function (i) {
        return i.id === id;
      })[0];
      if (!item) return;

      GS.modal.open({
        eyebrow: categoryLabel(item.category),
        title: item.name,
        body:
          '<img src="' + item.image + '" alt="' + item.alt + '" loading="lazy" ' +
          'class="mb-4 h-56 w-full rounded-xl object-cover" />' +
          "<p>" + item.long + "</p>" +
          '<div class="mt-4 flex flex-wrap items-center gap-2">' +
          dietaryTag(item) + extraTag(item) +
          '<span class="tag tag-gold">' + money(item.price) + "</span></div>" +
          '<p class="mt-4 text-xs leading-relaxed text-muted/90">' + PRICE_NOTE +
          " — prices are placeholders until the restaurant supplies its menu. Dietary labels are sample content " +
          "and are not verified allergen information.</p>",
        actions: [
          { label: "Reserve a Table", href: "contact.html#reservation", className: "btn-primary" },
          { label: "Back to menu", href: "#", className: "btn-ghost", onClick: function (ev) {
              ev.preventDefault();
              GS.modal.close();
            }
          }
        ]
      });
    });
  }

  /* ---------------------------------------------------------------------
     Public initialisers (called by main.js on DOMContentLoaded)
     --------------------------------------------------------------------- */
  GS.initMenuPage = function () {
    renderChips();
    renderMenuSections();
    wireMenuControls();
    applyFilter();
    var countEl = document.querySelector("[data-results-count]");
    if (countEl && !countEl.textContent) countEl.textContent = ITEMS.length + " dishes on the menu";
  };

  GS.initHomeSections = function () {
    /* Home 1 — signature baskets */
    renderInto("[data-signature-grid]", byCategory("signature").slice(0, 6), { eager: true });

    /* Home 2 / Home 1 — chef's favourites (flagged items) */
    var featured = ITEMS.filter(function (i) {
      return i.featured;
    }).slice(0, 6);
    renderInto("[data-favorites-grid]", featured);

    /* Home 2 — mixed editorial strip */
    renderInto("[data-picks-grid]", ITEMS.filter(function (i) { return i.tags && i.tags[0] === "Popular"; }));
  };

  wireDetailTriggers();

  /* If main.js already booted (dynamic script loading), start immediately. */
  if (GS.booted) {
    GS.initMenuPage();
    GS.initHomeSections();
  }
})();
