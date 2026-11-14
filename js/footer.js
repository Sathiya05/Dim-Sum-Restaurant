/* ==========================================================================
   Golden Steam Dim Sum House — footer.js
   The COMPLETE footer markup lives in this file only. Every page renders
   just <div id="footer"></div>.
   ========================================================================== */
(function () {
  "use strict";

  var GS = (window.GS = window.GS || {});

  /* ======================================================================
     EDITABLE RESTAURANT DETAILS  ← replace the values below with the
     restaurant's real information before publishing.
     ====================================================================== */
  var RESTAURANT = {
    name: "Golden Steam",
    legalName: "Golden Steam Dim Sum House",
    tagline: "Little Bites. Timeless Traditions.",
    description:
      "Handcrafted dim sum, delicate steamed baskets and warm hospitality — " +
      "a premium Chinese dining experience made for sharing.",
    address: "[Restaurant street address, city, postal code]",
    phone: "[+00 0000 000 000]",
    email: "[hello@yourdomain.example]",
    hours: [
      { days: "[Monday – Friday]", time: "[Add opening hours]" },
      { days: "[Saturday – Sunday]", time: "[Add opening hours]" },
      { days: "[Weekend brunch]", time: "[Add brunch hours]" }
    ],
    /* Clearly editable placeholders — add the real account URLs here. */
    social: [
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Facebook", href: "#", icon: "facebook" },
      { label: "X (Twitter)", href: "#", icon: "twitter" }
    ]
  };

  GS.restaurant = RESTAURANT;

  /* ------------------------------- icons ------------------------------- */
  function svg(inner) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" ' +
      'class="h-[1.15rem] w-[1.15rem]">' +
      inner +
      "</svg>"
    );
  }

  var ICONS = {
    instagram: svg(
      '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>'
    ),
    facebook: svg(
      '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'
    ),
    twitter: svg(
      '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>'
    ),
    pin: svg(
      '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'
    ),
    phone: svg(
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>'
    ),
    mail: svg(
      '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'
    ),
    clock: svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    calendar: svg(
      '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'
    )
  };

  /* ---------------------------- link groups ---------------------------- */
  var QUICK_LINKS = [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html" },
    { label: "Menu", href: "menu.html" },
    { label: "Weekend Brunch", href: "weekend-brunch.html" },
    { label: "Contact", href: "contact.html" },
    { label: "Login", href: "login.html" }
  ];

  var MENU_LINKS = [
    { label: "Signature Baskets", href: "menu.html#signature-baskets" },
    { label: "Steamed Dim Sum", href: "menu.html#steamed" },
    { label: "Fried Dim Sum", href: "menu.html#fried" },
    { label: "Dim Sum Desserts", href: "menu.html#desserts" }
  ];

  /* ------------------------------ markup ------------------------------- */
  function footerMarkup() {
    var socials = RESTAURANT.social
      .map(function (s) {
        return (
          '<a href="' + s.href + '" data-social="' + s.label + '" ' +
          'class="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted ' +
          "transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-tintgold hover:text-primary\" " +
          'aria-label="' + s.label + '" title="' + s.label + '">' +
          ICONS[s.icon] +
          "</a>"
        );
      })
      .join("");

    var quick = QUICK_LINKS.map(function (l) {
      return '<li><a href="' + l.href + '" class="footer-link">' + l.label + "</a></li>";
    }).join("");

    var menus = MENU_LINKS.map(function (l) {
      return '<li><a href="' + l.href + '" class="footer-link">' + l.label + "</a></li>";
    }).join("");

    var hours = RESTAURANT.hours
      .map(function (h) {
        return (
          '<li class="flex items-start gap-3 text-sm text-muted">' +
          '<span class="mt-0.5 shrink-0 text-gold">' + ICONS.clock + "</span>" +
          '<span><span class="block font-medium text-ink/90">' + h.days + "</span>" +
          '<span class="text-[0.82rem]">' + h.time + "</span></span></li>"
        );
      })
      .join("");

    return (
      '<footer class="mt-auto border-t border-line bg-surface">' +
      /* decorative top edge */
      '<div class="h-1 w-full bg-gradient-to-r from-primary via-gold to-primary" aria-hidden="true"></div>' +

      '<div class="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-16">' +

      /* ---- Column 1 : brand ---- */
      '<div class="sm:col-span-2 lg:col-span-1">' +
      '<a href="index.html" class="flex items-center gap-3" aria-label="Golden Steam Dim Sum House — home">' +
      '<img src="images/logo/golden-steam-logo.svg" alt="Golden Steam Dim Sum House logo" width="46" height="46" class="h-12 w-12" />' +
      '<span class="flex flex-col leading-tight">' +
      '<span class="font-display text-xl font-bold text-ink">' + RESTAURANT.name + "</span>" +
      '<span class="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold">Dim Sum House</span>' +
      "</span></a>" +
      '<p class="mt-4 max-w-sm text-sm leading-relaxed text-muted">' + RESTAURANT.description + "</p>" +
      '<p class="mt-4 font-display text-sm italic text-primary">&ldquo;' + RESTAURANT.tagline + '&rdquo;</p>' +
      '<div class="mt-5 flex flex-wrap gap-3">' + socials + "</div>" +
      '<p class="mt-4 text-[0.7rem] leading-relaxed text-muted/80">' +
      "Social links are editable placeholders in <code class=\"text-primary\">js/footer.js</code>.</p>" +
      "</div>" +

      /* ---- Column 2 : quick links ---- */
      '<nav aria-label="Footer quick links">' +
      '<h2 class="footer-heading">Quick Links</h2>' +
      '<ul class="mt-5 space-y-2.5">' + quick + "</ul>" +
      "</nav>" +

      /* ---- Column 3 : our menu ---- */
      '<nav aria-label="Footer menu categories">' +
      '<h2 class="footer-heading">Our Menu</h2>' +
      '<ul class="mt-5 space-y-2.5">' + menus + "</ul>" +
      "</nav>" +

      /* ---- Column 4 : contact ---- */
      '<div>' +
      '<h2 class="footer-heading">Contact</h2>' +
      '<ul class="mt-5 space-y-3.5">' +
      '<li class="flex items-start gap-3 text-sm text-muted">' +
      '<span class="mt-0.5 shrink-0 text-gold">' + ICONS.pin + "</span>" +
      '<span class="footer-contact">' + RESTAURANT.address + "</span></li>" +
      '<li class="flex items-start gap-3 text-sm text-muted">' +
      '<span class="mt-0.5 shrink-0 text-gold">' + ICONS.phone + "</span>" +
      '<span class="footer-contact no-wrap">' + RESTAURANT.phone + "</span></li>" +
      '<li class="flex items-start gap-3 text-sm text-muted">' +
      '<span class="mt-0.5 shrink-0 text-gold">' + ICONS.mail + "</span>" +
      '<span class="footer-break-all">' + RESTAURANT.email + "</span></li>" +
      "</ul>" +
      '<ul class="mt-5 space-y-2.5">' + hours + "</ul>" +
      '<a href="contact.html#reservation" class="btn-outline mt-6 w-full sm:w-auto">' +
      "Reserve a Table</a>" +
      "</div>" +

      "</div>" +

      /* ---------------- bottom bar ---------------- */
      '<div class="border-t border-line bg-page/70">' +
      '<div class="container-site flex flex-col items-center gap-4 py-6 text-center lg:flex-row lg:justify-between lg:text-start">' +
      '<p class="text-xs text-muted">&copy; <span data-year></span> ' +
      RESTAURANT.legalName +
      '. All rights reserved. <span class="opacity-80">Placeholder content — verify before publishing.</span></p>' +
      '<ul class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">' +
      '<li><button type="button" data-legal="privacy" class="footer-legal">Privacy Policy</button></li>' +
      '<li><button type="button" data-legal="terms" class="footer-legal">Terms &amp; Conditions</button></li>' +
      '<li><button type="button" data-legal="allergen" class="footer-legal">Allergen &amp; Food Information</button></li>' +
      "</ul></div>" +

      '<div class="container-site pb-6">' +
      '<p class="mx-auto max-w-4xl border-s-2 border-gold/60 ps-3 text-start text-[0.72rem] leading-relaxed text-muted/90">' +
      "Allergen &amp; food information disclaimer: dish descriptions, prices, opening hours and dietary labels on this " +
      "website are editable sample content. They are not verified ingredient or allergen declarations. Guests with " +
      "allergies or dietary requirements must speak with the restaurant before ordering." +
      "</p></div>" +
      "</div>" +
      "</footer>"
    );
  }

  /* ---------------------------- legal modals --------------------------- */
  var LEGAL = {
    privacy: {
      title: "Privacy Policy",
      body:
        "<p><strong>Placeholder policy.</strong> Replace this text with the restaurant's actual privacy policy.</p>" +
        "<p class=\"mt-3\">This frontend demo does not send reservation data to a server. Submitted reservation " +
        "details are only displayed in your browser and, where implemented, stored locally on your own device " +
        "(<code>localStorage</code>). No payment or card information is ever collected by this website.</p>" +
        "<p class=\"mt-3\">Add here: what personal data you collect, why you collect it, how long you keep it, " +
        "who you share it with, and how customers can request deletion.</p>"
    },
    terms: {
      title: "Terms & Conditions",
      body:
        "<p><strong>Placeholder terms.</strong> Replace this text with the restaurant's actual terms and conditions.</p>" +
        "<p class=\"mt-3\">Suggested topics: reservations and no-show policy, opening hours, pricing and sample price " +
        "disclaimers, service charges, cancellation rules, photography policy, and applicable local regulations.</p>" +
        "<p class=\"mt-3\">Any reservation submitted through this website is a <em>demo request</em> and is not a " +
        "confirmed booking until the restaurant confirms it directly.</p>"
    },
    allergen: {
      title: "Allergen & Food Information",
      body:
        "<p><strong>Placeholder notice.</strong> Our menu descriptions, dietary labels (vegetarian / non-vegetarian) " +
        "and prices are sample content provided for layout purposes only.</p>" +
        "<p class=\"mt-3\">They are <em>not</em> verified allergen information. Dishes may contain or be prepared " +
        "near common allergens including shellfish, wheat/gluten, egg, soy, sesame, peanuts and dairy. Our kitchen " +
        "is not an allergen-free environment.</p>" +
        "<p class=\"mt-3\">Always confirm ingredients and cross-contamination risks with the restaurant before ordering.</p>"
    }
  };

  function wireLegal() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-legal]");
      if (btn) {
        var entry = LEGAL[btn.getAttribute("data-legal")];
        if (entry && GS.modal) {
          GS.modal.open({ eyebrow: "Golden Steam", title: entry.title, body: entry.body });
        }
        return;
      }
      var social = e.target.closest("[data-social]");
      if (social) {
        e.preventDefault();
        if (GS.toast) {
          GS.toast(
            'Add the real "' + social.getAttribute("data-social") +
              '" profile URL for this link inside js/footer.js.',
            "info"
          );
        }
      }
    });
  }

  /* ------------------------------ mount -------------------------------- */
  function mount() {
    var host = document.getElementById("footer");
    if (!host) {
      GS.onReady(mount);
      return;
    }
    if (host.dataset.mounted === "1") return;
    host.dataset.mounted = "1";
    host.innerHTML = footerMarkup();

    var year = host.querySelector("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());

    wireLegal();
  }

  mount();
})();
