/* ==========================================================================
   Golden Steam Dim Sum House — main.js
   Shared website functionality:
   - Theme init / persistence / toggle   (light + dark)
   - RTL init / persistence / toggle
   - FAQ accordion
   - Smooth scrolling
   - Back-to-top button
   - Toast notifications
   - Scroll reveal animations
   - Image fallback handling
   - Shared interaction utilities
   ========================================================================== */
(function () {
  "use strict";

  var GS = (window.GS = window.GS || {});

  var THEME_KEY = "gs-theme";
  var RTL_KEY = "gs-rtl";

  /* ---------------------------------------------------------------------
     ICONS (Lucide-style inline SVG, no icon library required)
     --------------------------------------------------------------------- */
  function svg(paths, extra) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true" focusable="false" class="' +
      (extra || "h-5 w-5") +
      '">' +
      paths +
      "</svg>"
    );
  }

  var ICONS = {
    sun: svg(
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>'
    ),
    moon: svg('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'),
    /* RTL / LTR directional control — bidirectional left-right arrows */
    rtl: svg(
      '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>'
    ),
    arrowUp: svg('<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>'),
    check: svg('<path d="M20 6 9 17l-5-5"/>'),
    close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    chevronDown: svg('<path d="m6 9 6 6 6-6"/>')
  };

  GS.icons = ICONS;
  GS.svg = svg;

  /* ---------------------------------------------------------------------
     Utilities
     --------------------------------------------------------------------- */
  GS.storage = {
    get: function (key) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    },
    set: function (key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        /* storage unavailable (private mode) — ignore */
      }
    }
  };

  GS.qs = function (sel, ctx) {
    return (ctx || document).querySelector(sel);
  };
  GS.qsa = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  GS.onReady = function (fn) {
    /* Deferred scripts run with readyState "interactive", *before*
       DOMContentLoaded — page initialisers defined by scripts further down
       the list must still be able to register here. */
    if (document.readyState === "complete") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  };

  GS.emit = function (name, detail) {
    window.dispatchEvent(new CustomEvent(name, { detail: detail || {} }));
  };

  GS.fmtDate = function (isoDate) {
    if (!isoDate) return "";
    var parts = String(isoDate).split("-");
    if (parts.length !== 3) return isoDate;
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  GS.todayISO = function () {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  };

  /* ---------------------------------------------------------------------
     THEME  (light / dark)
     --------------------------------------------------------------------- */
  var theme = {
    system: function () {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    },
    stored: function () {
      var v = GS.storage.get(THEME_KEY);
      return v === "dark" || v === "light" ? v : null;
    },
    current: function () {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    },
    apply: function (mode, persist) {
      var isDark = mode === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      if (persist) GS.storage.set(THEME_KEY, mode);
      paintThemeControls();
      GS.emit("gs:theme", { theme: mode });
    },
    init: function () {
      /* The <head> bootstrap script already applied the saved/system theme
         to avoid a flash of wrong theme; here we only wire up the UI. */
      paintThemeControls();
      GS.qsa("[data-theme-toggle]").forEach(function (btn) {
        if (btn.dataset.bound === "1") return;
        btn.dataset.bound = "1";
        btn.addEventListener("click", function () {
          theme.apply(theme.current() === "dark" ? "light" : "dark", true);
        });
      });
      if (window.matchMedia && theme._mqBound !== true) {
        theme._mqBound = true;
        var mq = window.matchMedia("(prefers-color-scheme: dark)");
        var onChange = function (e) {
          if (!GS.storage.get(THEME_KEY)) theme.apply(e.matches ? "dark" : "light", false);
        };
        if (mq.addEventListener) mq.addEventListener("change", onChange);
        else if (mq.addListener) mq.addListener(onChange);
      }
    },
    toggle: function () {
      theme.apply(theme.current() === "dark" ? "light" : "dark", true);
    }
  };

  function paintThemeControls() {
    var isDark = theme.current() === "dark";
    var label = isDark ? "Switch to light mode" : "Switch to dark mode";

    GS.qsa("[data-theme-icon]").forEach(function (el) {
      el.innerHTML = isDark ? ICONS.moon : ICONS.sun;
    });
    GS.qsa("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
      btn.setAttribute("aria-pressed", String(isDark));
      var txt = btn.querySelector("[data-theme-label]");
      if (txt) txt.textContent = label;
      var state = btn.querySelector("[data-theme-state]");
      if (state) state.textContent = isDark ? "Dark mode" : "Light mode";
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark ? "#211815" : "#FFFCF7");
  }

  GS.theme = theme;

  /* ---------------------------------------------------------------------
     RTL  (left-to-right / right-to-left)
     --------------------------------------------------------------------- */
  var rtl = {
    stored: function () {
      var v = GS.storage.get(RTL_KEY);
      return v === "rtl" || v === "ltr" ? v : null;
    },
    current: function () {
      return document.documentElement.dir === "rtl" ? "rtl" : "ltr";
    },
    apply: function (dir, persist) {
      document.documentElement.dir = dir;
      document.documentElement.lang = "en";
      if (persist) GS.storage.set(RTL_KEY, dir);
      paintRtlControls();
      GS.emit("gs:rtl", { dir: dir });
    },
    init: function () {
      paintRtlControls();
      GS.qsa("[data-rtl-toggle]").forEach(function (btn) {
        if (btn.dataset.bound === "1") return;
        btn.dataset.bound = "1";
        btn.addEventListener("click", function () {
          rtl.apply(rtl.current() === "rtl" ? "ltr" : "rtl", true);
        });
      });
    },
    toggle: function () {
      rtl.apply(rtl.current() === "rtl" ? "ltr" : "rtl", true);
    }
  };

  function paintRtlControls() {
    var isRtl = rtl.current() === "rtl";
    var label = isRtl ? "Switch to left-to-right layout" : "Switch to right-to-left layout";

    GS.qsa("[data-rtl-icon]").forEach(function (el) {
      el.innerHTML = ICONS.rtl;
    });
    GS.qsa("[data-rtl-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
      btn.setAttribute("aria-pressed", String(isRtl));
      var txt = btn.querySelector("[data-rtl-label]");
      if (txt) txt.textContent = label;
      var state = btn.querySelector("[data-rtl-state]");
      if (state) state.textContent = isRtl ? "Right to left" : "Left to right";
    });
  }

  GS.rtl = rtl;

  /* ---------------------------------------------------------------------
     TOAST NOTIFICATIONS
     --------------------------------------------------------------------- */
  var toastHost = null;

  function ensureToastHost() {
    if (toastHost && document.body.contains(toastHost)) return toastHost;
    toastHost = document.createElement("div");
    toastHost.className =
      "pointer-events-none fixed bottom-5 left-1/2 z-[120] flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col items-stretch gap-3";
    toastHost.setAttribute("role", "status");
    toastHost.setAttribute("aria-live", "polite");
    document.body.appendChild(toastHost);
    return toastHost;
  }

  var toastStyles = {
    success: "border-gold bg-surface text-ink",
    error: "border-primary bg-surface text-ink",
    info: "border-line bg-surface text-ink"
  };
  var toastIconWrap = {
    success: "bg-tintgold text-[#8a6415] dark:text-[#e7c983]",
    error: "bg-tintred text-primary",
    info: "bg-tintgold text-[#8a6415] dark:text-[#e7c983]"
  };

  /* ---------------------------------------------------------------------
     ACCESSIBLE MODAL  (GS.modal.open / GS.modal.close)
     --------------------------------------------------------------------- */
  var modal = {
    el: null,
    lastFocus: null,

    ensure: function () {
      if (modal.el && document.body.contains(modal.el)) return modal.el;
      var wrap = document.createElement("div");
      wrap.className =
        "gs-modal fixed inset-0 z-[110] hidden items-center justify-center p-4 sm:p-6";
      wrap.innerHTML =
        '<div class="gs-modal-backdrop absolute inset-0 bg-[#211815]/70 backdrop-blur-sm" data-modal-close></div>' +
        '<div class="gs-modal-panel relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-2xl border ' +
        'border-line bg-surface p-6 shadow-lift sm:p-8" role="dialog" aria-modal="true" aria-labelledby="gs-modal-title">' +
        '<button type="button" data-modal-close aria-label="Close dialog" class="icon-btn absolute end-3 top-3">' +
        ICONS.close +
        "</button>" +
        '<p class="eyebrow" data-modal-eyebrow>Golden Steam</p>' +
        '<h3 id="gs-modal-title" class="mt-2 font-display text-2xl sm:text-[1.7rem]" data-modal-title></h3>' +
        '<div class="mt-4 text-sm leading-relaxed text-muted" data-modal-body></div>' +
        '<div class="mt-6 flex flex-wrap gap-3" data-modal-actions></div>' +
        "</div>";
      document.body.appendChild(wrap);
      modal.el = wrap;

      wrap.addEventListener("click", function (e) {
        if (e.target.closest("[data-modal-close]")) modal.close();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && wrap.classList.contains("is-open")) modal.close();
      });
      return wrap;
    },

    open: function (opts) {
      opts = opts || {};
      var wrap = modal.ensure();
      modal.lastFocus = document.activeElement;
      wrap.querySelector("[data-modal-title]").textContent = opts.title || "";
      wrap.querySelector("[data-modal-body]").innerHTML = opts.body || "";
      var eyebrow = wrap.querySelector("[data-modal-eyebrow]");
      if (eyebrow) eyebrow.textContent = opts.eyebrow || "Golden Steam";

      var actions = wrap.querySelector("[data-modal-actions]");
      actions.innerHTML = "";
      actions.classList.remove("hidden");
      (opts.actions || []).forEach(function (action) {
        var a = document.createElement("a");
        a.href = action.href || "#";
        a.className = action.className || "btn-ghost";
        a.textContent = action.label;
        if (action.onClick) a.addEventListener("click", action.onClick);
        actions.appendChild(a);
      });
      if (!actions.children.length) actions.classList.add("hidden");

      wrap.classList.remove("hidden");
      wrap.classList.add("flex");
      document.body.classList.add("nav-locked");
      requestAnimationFrame(function () {
        wrap.classList.add("is-open");
        var closeBtn = wrap.querySelector("button");
        if (closeBtn) closeBtn.focus({ preventScroll: true });
      });
    },

    close: function () {
      if (!modal.el) return;
      var wrap = modal.el;
      wrap.classList.remove("is-open");
      document.body.classList.remove("nav-locked");
      setTimeout(function () {
        wrap.classList.add("hidden");
        wrap.classList.remove("flex");
      }, 300);
      if (modal.lastFocus && modal.lastFocus.focus) {
        modal.lastFocus.focus({ preventScroll: true });
      }
    }
  };

  GS.modal = modal;

  GS.toast = function (message, type, duration) {
    type = toastStyles[type] ? type : "info";
    var host = ensureToastHost();

    var el = document.createElement("div");
    el.className =
      "gs-toast pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lift " +
      toastStyles[type];
    el.innerHTML =
      '<span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ' +
      toastIconWrap[type] +
      '">' +
      (type === "error" ? ICONS.close : ICONS.check).replace('class="h-5 w-5"', 'class="h-3.5 w-3.5"') +
      '</span><p class="flex-1 text-sm leading-snug">' +
      String(message) +
      "</p>";

    host.appendChild(el);
    /* next frame → animate in */
    requestAnimationFrame(function () {
      el.classList.add("is-visible");
    });

    var timer = setTimeout(function () {
      el.classList.remove("is-visible");
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 420);
    }, duration || 4600);

    el.addEventListener("click", function () {
      clearTimeout(timer);
      el.classList.remove("is-visible");
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 420);
    });

    return el;
  };

  /* ---------------------------------------------------------------------
     FAQ ACCORDION   markup:  [data-faq] > .faq-item > button.faq-question + .faq-answer
     --------------------------------------------------------------------- */
  GS.initFaqs = function (root) {
    GS.qsa("[data-faq]", root || document).forEach(function (group) {
      var single = group.getAttribute("data-faq") !== "multi";
      GS.qsa(".faq-item", group).forEach(function (item) {
        var btn = item.querySelector(".faq-question");
        var answer = item.querySelector(".faq-answer");
        if (!btn || !answer || btn.dataset.bound === "1") return;
        btn.dataset.bound = "1";
        if (!btn.id) btn.id = "faq-q-" + Math.random().toString(36).slice(2, 9);
        answer.id = answer.id || btn.id + "-a";
        btn.setAttribute("aria-controls", answer.id);
        answer.setAttribute("role", "region");
        answer.setAttribute("aria-labelledby", btn.id);
        btn.setAttribute("aria-expanded", item.classList.contains("is-open") ? "true" : "false");

        btn.addEventListener("click", function () {
          var isOpen = item.classList.contains("is-open");
          if (single) {
            GS.qsa(".faq-item.is-open", group).forEach(function (other) {
              if (other !== item) {
                other.classList.remove("is-open");
                var ob = other.querySelector(".faq-question");
                if (ob) ob.setAttribute("aria-expanded", "false");
              }
            });
          }
          item.classList.toggle("is-open", !isOpen);
          btn.setAttribute("aria-expanded", String(!isOpen));
        });
      });
    });
  };

  /* ---------------------------------------------------------------------
     SMOOTH SCROLLING (in-page anchors)
     --------------------------------------------------------------------- */
  GS.initSmoothScroll = function () {
    document.addEventListener("click", function (e) {
      var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!link) return;
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });
      history.replaceState(null, "", id);
      /* move focus for keyboard users */
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  };

  /* ---------------------------------------------------------------------
     BACK TO TOP
     --------------------------------------------------------------------- */
  GS.initBackToTop = function () {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "gs-top fixed bottom-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 " +
      "bg-primary text-cream shadow-lift transition hover:bg-[#8b1f1f] end-6";
    btn.setAttribute("aria-label", "Back to top");
    btn.title = "Back to top";
    btn.innerHTML = ICONS.arrowUp;
    document.body.appendChild(btn);

    var toggle = function () {
      btn.classList.toggle("is-visible", window.scrollY > 600);
    };
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();

    btn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    });
  };

  /* ---------------------------------------------------------------------
     SCROLL REVEAL
     --------------------------------------------------------------------- */
  GS.initReveal = function (root) {
    var items = GS.qsa(".reveal", root || document);
    if (!items.length) return;

    function show(el) {
      if (el.dataset.revealDone === "1") return;
      el.dataset.revealDone = "1";
      var delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
      if (delay > 0) {
        setTimeout(function () { el.classList.add("is-visible"); }, delay);
      } else {
        el.classList.add("is-visible");
      }
    }

    function inView(el) {
      /* In view OR already scrolled past — content above the fold must
         never stay hidden (back-scroll, coalesced events, headless). */
      var r = el.getBoundingClientRect();
      return r.top < window.innerHeight - 40;
    }

    /* Safety net: a rAF-throttled sweep guarantees anything entering the
       viewport becomes visible even if an IntersectionObserver entry is
       coalesced/missed (fast scrolling, print, headless capture, …). */
    var pending = items.slice();
    var ticking = false;
    function sweep() {
      ticking = false;
      if (!pending.length) return;
      pending = pending.filter(function (el) {
        if (el.dataset.revealDone === "1") return false;
        if (inView(el)) { show(el); return false; }
        return true;
      });
      if (!pending.length) stopAll();
    }
    function onScroll() {
      ensureTimer();
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sweep);
    }
    var timer = null;
    var idleTicks = 0;
    function ensureTimer() {
      if (timer || !pending.length) return;
      idleTicks = 0;
      /* Low-frequency fallback for environments where scroll/frame
         callbacks are heavily coalesced (throttled/background rendering).
         Stops itself once nothing new enters the fold for ~4s — any later
         scroll restarts it via onScroll(). */
      timer = setInterval(function () {
        var before = pending.length;
        sweep();
        if (!pending.length || timer === null) {
          if (timer) { clearInterval(timer); timer = null; }
          return;
        }
        idleTicks = pending.length < before ? 0 : idleTicks + 1;
        if (idleTicks >= 10) { clearInterval(timer); timer = null; }
      }, 400);
    }
    function stopAll() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (timer) { clearInterval(timer); timer = null; }
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (timer) { clearInterval(timer); timer = null; }
      } else {
        ensureTimer();
        sweep();
      }
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    if (!("IntersectionObserver" in window)) {
      pending.forEach(show);
      pending = [];
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) {
      if (el.dataset.revealDone !== "1") io.observe(el);
    });

    sweep(); /* anything already on screen at boot */
    ensureTimer(); /* keep sweeping until everything above the fold is shown */
    window.addEventListener("load", sweep);
  };

  /* ---------------------------------------------------------------------
     IMAGE FALLBACK  (broken local path → branded placeholder)
     --------------------------------------------------------------------- */
  GS.initImageFallback = function (root) {
    GS.qsa("img", root || document).forEach(function (img) {
      if (img.dataset.fbBound === "1") return;
      img.dataset.fbBound = "1";
      img.addEventListener("error", function () {
        if (img.dataset.fallback === "off") return;
        var host = img.parentElement || img;
        host.classList.add("img-fallback");
        img.style.visibility = "hidden";
      });
    });
  };

  /* ---------------------------------------------------------------------
     ACTIVE NAV LINK HIGHLIGHTING helper (used by navbar.js)
     --------------------------------------------------------------------- */
  GS.currentPage = function () {
    var file = window.location.pathname.split("/").pop();
    return !file || file === "" ? "index.html" : file;
  };

  /* Re-paint theme / RTL controls after late markup injection (navbar /
     drawer buttons are created by navbar.js, which may mount after boot —
     init() is idempotent thanks to the dataset.bound guard, so calling it
     here safely binds any newly-created buttons). */
  GS.paintControls = function () {
    theme.init();
    rtl.init();
  };

  /* ---------------------------------------------------------------------
     GLOBAL BUTTON RIPPLE-FREE FEEDBACK for demo-only controls
     --------------------------------------------------------------------- */
  GS.demoNotice = function (feature) {
    GS.toast(
      (feature || "This feature") + " is a frontend demonstration and is not connected to a live backend.",
      "info"
    );
  };

  /* ---------------------------------------------------------------------
     BOOT
     --------------------------------------------------------------------- */
  GS.onReady(function () {
    theme.init();
    rtl.init();
    GS.initSmoothScroll();
    GS.initFaqs();
    GS.initReveal();
    GS.initBackToTop();
    GS.initImageFallback();

    /* page-level initialisers (present only on their own pages) */
    if (typeof GS.initMenuPage === "function") GS.initMenuPage();
    if (typeof GS.initBrunchPage === "function") GS.initBrunchPage();
    if (typeof GS.initReservationPage === "function") GS.initReservationPage();
    if (typeof GS.initLoginPage === "function") GS.initLoginPage();
    if (typeof GS.initHomeSections === "function") GS.initHomeSections();

    /* Page scripts loaded after boot can check this flag and self-start. */
    GS.booted = true;
  });
})();
