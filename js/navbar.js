/* ==========================================================================
   Golden Steam Dim Sum House — navbar.js
   The COMPLETE navbar markup (desktop bar + mobile/tablet drawer) lives in
   this file only. Every page renders just <div id="navbar"></div>.
   ========================================================================== */
(function () {
  "use strict";

  var GS = (window.GS = window.GS || {});

  /* ------------------------------- icons ------------------------------- */
  function svg(inner, cls) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' +
      'focusable="false" class="' +
      (cls || "h-5 w-5") +
      '">' +
      inner +
      "</svg>"
    );
  }

  var ICON = {
    chevron: svg('<path d="m6 9 6 6 6-6"/>', "h-4 w-4"),
    arrow: svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', "h-4 w-4")
  };

  /* ---------------------------- link helpers --------------------------- */
  var NAV_LINKS = [
    { label: "About", href: "about.html" },
    { label: "Menu", href: "menu.html" },
    { label: "Weekend Brunch", href: "weekend-brunch.html" },
    { label: "Contact", href: "contact.html" }
  ];

  var HOME_LINKS = [
    { label: "Home 1", href: "index.html", note: "Classic experience" },
    { label: "Home 2", href: "home2.html", note: "Editorial experience" }
  ];

  function isActive(href) {
    var page = GS.currentPage ? GS.currentPage() : "";
    return page === href.split("#")[0];
  }

  function brandMarkup() {
    return (
      '<span class="flex items-center gap-3">' +
      '<img src="images/logo/golden-steam-logo.svg" alt="Golden Steam Dim Sum House logo" ' +
      'width="44" height="44" class="h-11 w-11 shrink-0" />' +
      '<span class="flex flex-col leading-tight">' +
      '<span class="font-display text-lg font-bold tracking-tight text-ink">Golden Steam</span>' +
      '<span class="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-gold sm:text-[0.62rem]">' +
      "Dim Sum House</span>" +
      "</span></span>"
    );
  }

  function navListItem(link) {
    var active = isActive(link.href);
    return (
      '<li><a href="' + link.href + '" data-nav-link class="nav-link' + (active ? " is-active" : "") + '"' +
      (active ? ' aria-current="page"' : "") +
      ">" + link.label + "</a></li>"
    );
  }

  /* ------------------------------ markup ------------------------------- */
  function navbarMarkup() {
    var homeActive = isActive("index.html") || isActive("home2.html");
    var onContact = isActive("contact.html");

    var desktopLinks = NAV_LINKS.map(navListItem).join("");
    var mobileLinks = NAV_LINKS.map(function (link) {
      var active = isActive(link.href);
      return (
        '<li><a href="' + link.href + '" data-nav-link ' +
        'class="mobile-nav-link' + (active ? " is-active" : "") + '"' +
        (active ? ' aria-current="page"' : "") +
        ">" + link.label + "</a></li>"
      );
    }).join("");

    var homeSubLinks = HOME_LINKS.map(function (link) {
      var active = isActive(link.href);
      return (
        '<li><a href="' + link.href + '" data-nav-link ' +
        'class="mobile-nav-link' + (active ? " is-active" : "") + '"' +
        (active ? ' aria-current="page"' : "") +
        "><span>" + link.label + "</span><span class=\"text-[0.7rem] text-muted/80\">" + link.note + "</span></a></li>"
      );
    }).join("");

    return (
      /* ======================= HEADER ======================= */
      '<header id="site-header" class="sticky top-0 z-50">' +
      '<div class="h-1 w-full bg-gradient-to-r from-primary via-gold to-primary" aria-hidden="true"></div>' +
      '<div class="site-header-bar border-b border-line bg-page/95 backdrop-blur-md transition-shadow duration-300">' +
      '<div class="container-site flex h-[4.5rem] items-center justify-between gap-4 nav:h-20">' +

      /* Brand (visible at every size — the navbar bar doubles as the mobile
         drawer header, so the drawer itself carries no brand row) */
      '<a href="index.html" data-nav-link class="group flex shrink-0 items-center rounded-lg" aria-label="Golden Steam Dim Sum House — go to home page">' +
      brandMarkup() +
      "</a>" +

      /* ---- Desktop centre navigation (>=1040px) ---- */
      '<nav class="hidden nav:flex" aria-label="Primary navigation">' +
      '<ul class="flex items-center gap-1 xl:gap-2">' +
      '<li class="gs-dropdown relative" data-dropdown>' +
      '<button type="button" data-dropdown-toggle aria-expanded="false" aria-controls="home-submenu" ' +
      'class="nav-link nav-link-btn' + (homeActive ? " is-active" : "") + '">' +
      "<span>Home</span>" + ICON.chevron +
      "</button>" +
      '<div id="home-submenu" class="gs-dropdown-menu absolute start-0 top-[calc(100%+0.75rem)] z-20 w-60 rounded-2xl border border-line bg-surface p-2 shadow-lift">' +
      '<ul class="space-y-1">' +
      HOME_LINKS.map(function (l) {
        var act = isActive(l.href);
        return (
          '<li><a href="' + l.href + '" data-nav-link class="dropdown-link' + (act ? " is-active" : "") + '">' +
          '<span class="flex flex-col"><span class="font-medium">' + l.label + "</span>" +
          '<span class="text-[0.7rem] text-muted">' + l.note + "</span></span></a></li>"
        );
      }).join("") +
      "</ul></div></li>" +
      desktopLinks +
      "</ul></nav>" +

      /* ---- Desktop actions (>=1040px) ---- */
      '<div class="hidden items-center gap-2 nav:flex xl:gap-3">' +
      '<button type="button" data-theme-toggle class="icon-btn" aria-label="Switch to dark mode" aria-pressed="false">' +
      '<span data-theme-icon class="flex h-5 w-5 items-center justify-center"></span></button>' +
      '<button type="button" data-rtl-toggle class="icon-btn" aria-label="Switch to right-to-left layout" aria-pressed="false">' +
      '<span data-rtl-icon class="flex h-5 w-5 items-center justify-center"></span></button>' +
      '<a href="login.html" class="btn-outline ms-1">Login</a>' +
      '<a href="contact.html#reservation" class="btn-primary ms-1 ps-5 xl:ps-6">Reserve a Table</a>' +
      "</div>" +

      /* ---- Hamburger (only brand + burger are visible below 1040px) ---- */
      '<button type="button" data-hamburger aria-expanded="false" aria-controls="mobile-drawer" ' +
      'aria-label="Open navigation menu" class="icon-btn group shrink-0 nav:hidden" data-nav-hamburger>' +
      '<span class="relative block h-6 w-6">' +
      '<span class="absolute start-0 top-[5px] block h-0.5 w-6 rounded bg-ink transition-all duration-300 ' +
      "group-aria-expanded:translate-y-[6px] group-aria-expanded:rotate-45\"></span>" +
      '<span class="absolute start-0 top-[11px] block h-0.5 w-6 rounded bg-ink transition-all duration-200 ' +
      'group-aria-expanded:opacity-0"></span>' +
      '<span class="absolute start-0 top-[17px] block h-0.5 w-6 rounded bg-ink transition-all duration-300 ' +
      'group-aria-expanded:-translate-y-[6px] group-aria-expanded:-rotate-45"></span>' +
      "</span></button>" +

      "</div></div>" +

      /* ================= MOBILE / TABLET DRAWER (below 1040px) =================
         NOTE: the drawer deliberately has NO header row of its own — the sticky
         navbar bar (brand + morphing hamburger) stays visible above the backdrop
         and acts as the drawer header / close control.                        */
      '<div class="gs-backdrop fixed inset-0 z-[60] bg-[#211815]/60 backdrop-blur-sm nav:hidden" ' +
      'data-drawer-backdrop></div>' +
      '<aside id="mobile-drawer" data-drawer role="dialog" aria-modal="true" aria-label="Site navigation menu" ' +
      'aria-hidden="true" inert ' +
      'class="gs-drawer fixed end-0 bottom-0 z-[70] flex w-[min(88vw,22.5rem)] flex-col border-s border-line ' +
      'bg-surface shadow-lift nav:hidden">' +

      '<nav class="flex-1 overflow-y-auto overscroll-contain px-4 py-6" aria-label="Mobile navigation">' +
      '<ul class="space-y-1">' +
      /* Home (expandable) */
      '<li class="rounded-xl">' +
      '<button type="button" data-mobile-submenu-toggle aria-expanded="false" aria-controls="mobile-home-submenu" ' +
      'class="mobile-nav-link justify-between' + (homeActive ? " is-active" : "") + '">' +
      "<span>Home</span>" + ICON.chevron +
      "</button>" +
      '<div id="mobile-home-submenu" class="gs-submenu"><div><ul class="ms-3 mt-1 space-y-1 border-s border-line ps-3">' +
      homeSubLinks +
      "</ul></div></div></li>" +
      mobileLinks +
      "</ul>" +

      /* Controls inside the drawer */
      '<div class="mt-6 space-y-2 border-t border-line pt-5">' +
      '<button type="button" data-theme-toggle class="mobile-control" aria-pressed="false">' +
      '<span class="flex items-center gap-3">' +
      '<span data-theme-icon class="flex h-5 w-5 items-center justify-center text-primary"></span>' +
      "<span data-theme-label>Switch to dark mode</span></span>" +
      '<span data-theme-state class="tag tag-gold">Light mode</span></button>' +
      '<button type="button" data-rtl-toggle class="mobile-control" aria-pressed="false">' +
      '<span class="flex items-center gap-3">' +
      '<span data-rtl-icon class="flex h-5 w-5 items-center justify-center text-primary"></span>' +
      "<span data-rtl-label>Switch to right-to-left layout</span></span>" +
      '<span data-rtl-state class="tag tag-gold">Left to right</span></button>' +
      "</div>" +

      '<a href="login.html" data-nav-link class="btn-outline mt-6 w-full">Login' +
      ICON.arrow +
      "</a>" +

      '<a href="contact.html#reservation" data-nav-link class="btn-primary mt-3 w-full">Reserve a Table' +
      ICON.arrow +
      "</a>" +

      '<p class="mt-6 text-center text-xs leading-relaxed text-muted">' +
      "<span class=\"font-display italic\">&ldquo;Little Bites. Timeless Traditions.&rdquo;</span><br />" +
      "Add your restaurant details in <code class=\"text-primary\">js/footer.js</code>." +
      "</p>" +
      "</nav></aside>" +
      "</header>"
    );
  }

  /* ------------------------------ mount -------------------------------- */
  function mount() {
    var host = document.getElementById("navbar");
    if (!host) {
      GS.onReady(mount);
      return;
    }
    if (host.dataset.mounted === "1") return;
    host.dataset.mounted = "1";
    host.innerHTML = navbarMarkup();

    if (typeof GS.paintControls === "function") GS.paintControls();
    wireDropdown();
    wireDrawer();
    wireHeaderShadow();
  }

  /* --------------------- desktop "Home" dropdown ----------------------- */
  /* State model: open = hovered || pinned.
     Hovering opens it; clicking the toggle "pins" it open (so a click after
     hover does not immediately close it); clicking again unpins. Outside
     click and Escape clear both. */
  function wireDropdown() {
    var dropdown = document.querySelector("[data-dropdown]");
    if (!dropdown) return;
    var toggle = dropdown.querySelector("[data-dropdown-toggle]");
    var hovered = false;
    var pinned = false;

    var render = function () {
      var state = hovered || pinned;
      dropdown.classList.toggle("is-open", state);
      toggle.setAttribute("aria-expanded", String(state));
    };

    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      pinned = !pinned;
      render();
    });

    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
      dropdown.addEventListener("mouseenter", function () {
        hovered = true;
        render();
      });
      dropdown.addEventListener("mouseleave", function () {
        hovered = false;
        render();
      });
    }

    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) {
        pinned = false;
        hovered = false;
        render();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && (hovered || pinned)) {
        pinned = false;
        hovered = false;
        render();
        toggle.focus();
      }
    });
  }

  /* ---------------- mobile / tablet hamburger drawer ------------------- */
  function wireDrawer() {
    var hamburger = document.querySelector("[data-hamburger]");
    var drawer = document.querySelector("[data-drawer]");
    var backdrop = document.querySelector("[data-drawer-backdrop]");
    var closeBtn = document.querySelector("[data-drawer-close]");
    if (!hamburger || !drawer) return;

    var FOCUSABLE =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function isOpen() {
      return drawer.classList.contains("is-open");
    }

    function openDrawer() {
      drawer.classList.add("is-open");
      if (backdrop) backdrop.classList.add("is-open");
      drawer.removeAttribute("inert");
      drawer.setAttribute("aria-hidden", "false");
      hamburger.setAttribute("aria-expanded", "true");
      hamburger.setAttribute("aria-label", "Close navigation menu");
      document.body.classList.add("nav-locked");
      var first = drawer.querySelector(FOCUSABLE);
      if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 120);
    }

    function closeDrawer(returnFocus) {
      drawer.classList.remove("is-open");
      if (backdrop) backdrop.classList.remove("is-open");
      drawer.setAttribute("inert", "");
      drawer.setAttribute("aria-hidden", "true");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open navigation menu");
      document.body.classList.remove("nav-locked");
      if (returnFocus !== false) hamburger.focus({ preventScroll: true });
    }

    hamburger.addEventListener("click", function () {
      isOpen() ? closeDrawer() : openDrawer();
    });
    if (closeBtn) closeBtn.addEventListener("click", function () { closeDrawer(); });
    if (backdrop) backdrop.addEventListener("click", function () { closeDrawer(); });

    /* nested Home submenu */
    var subToggle = drawer.querySelector("[data-mobile-submenu-toggle]");
    if (subToggle) {
      var submenu = document.getElementById(subToggle.getAttribute("aria-controls"));
      subToggle.addEventListener("click", function () {
        var openSub = subToggle.getAttribute("aria-expanded") === "true";
        subToggle.setAttribute("aria-expanded", String(!openSub));
        if (submenu) submenu.classList.toggle("is-open", !openSub);
      });
    }

    /* any link inside the drawer closes it */
    drawer.addEventListener("click", function (e) {
      var link = e.target.closest("a[href]");
      if (link) closeDrawer(false);
    });

    /* outside click + escape */
    document.addEventListener("click", function (e) {
      if (!isOpen()) return;
      if (drawer.contains(e.target) || hamburger.contains(e.target)) return;
      closeDrawer(false);
    });

    document.addEventListener("keydown", function (e) {
      if (!isOpen()) return;
      if (e.key === "Escape") {
        closeDrawer();
        return;
      }
      /* simple focus trap */
      if (e.key === "Tab") {
        var nodes = Array.prototype.filter.call(drawer.querySelectorAll(FOCUSABLE), function (n) {
          return n.offsetParent !== null;
        });
        if (!nodes.length) return;
        var first = nodes[0];
        var last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    /* rotating to desktop size must reset the drawer */
    var mq = window.matchMedia("(min-width: 1040px)");
    var onResize = function (e) {
      if (e.matches && isOpen()) closeDrawer(false);
    };
    if (mq.addEventListener) mq.addEventListener("change", onResize);
    else if (mq.addListener) mq.addListener(onResize);
  }

  /* ---------------- header shadow while scrolling ---------------------- */
  function wireHeaderShadow() {
    var bar = document.querySelector(".site-header-bar");
    if (!bar) return;
    var update = function () {
      bar.classList.toggle("shadow-soft", window.scrollY > 12);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  mount();
})();
