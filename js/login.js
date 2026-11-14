/* ==========================================================================
   Golden Steam Dim Sum House — login.js
   Demo sign-in form: local validation + simulated submission.

   IMPORTANT: this is NOT a real authentication system. Nothing is sent to a
   server, no password is stored, and no session is created. Wire this file
   to your own auth endpoint (see README → "Connecting a real backend") to
   make it functional.
   ========================================================================== */
(function () {
  "use strict";

  var GS = (window.GS = window.GS || {});

  /* ------------------------------ helpers ------------------------------ */
  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  function fieldWrap(input) {
    return input.closest("[data-field]") || input.closest(".field") || input.parentElement;
  }

  function setError(input, message) {
    var wrap = fieldWrap(input);
    if (!wrap) return;
    var err = wrap.querySelector(".field-error");
    var hasError = Boolean(message);
    wrap.classList.toggle("is-invalid", hasError);
    input.setAttribute("aria-invalid", hasError ? "true" : "false");
    if (err) {
      if (hasError) err.textContent = message;
      if (input.id) {
        input.setAttribute("aria-describedby", hasError ? err.id || (err.id = input.id + "-error") : "");
        if (hasError) err.id = err.id || input.id + "-error";
      }
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var RULES = {
    email: function (v) {
      if (!v.trim()) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "Please enter a valid email address.";
      return "";
    },
    password: function (v) {
      if (!v) return "Please enter your password.";
      if (v.length < 6) return "Your password must be at least 6 characters.";
      return "";
    }
  };

  function validateInput(input) {
    var rule = RULES[input.name];
    if (!rule) return true;
    var message = rule(input.value || "");
    setError(input, message);
    return !message;
  }

  function setLoading(btn, loading) {
    if (!btn) return;
    if (!btn.dataset.label) {
      var label = btn.querySelector("[data-submit-label]");
      btn.dataset.label = label ? label.textContent : "Sign In";
    }
    var labelEl = btn.querySelector("[data-submit-label]");
    var spinner = btn.querySelector("[data-spinner]");
    btn.disabled = loading;
    btn.setAttribute("aria-busy", loading ? "true" : "false");
    if (labelEl) labelEl.textContent = loading ? "Signing in…" : btn.dataset.label;
    if (spinner) spinner.classList.toggle("hidden", !loading);
  }

  /* --------------------------- success panel --------------------------- */
  function renderSuccess(host, email) {
    host.innerHTML =
      '<div class="card border-primary/40 bg-tintred/60 p-6 text-center sm:p-8">' +
      '<span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-cream">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>' +
      "</span>" +
      '<h3 class="mt-4 font-display text-2xl font-semibold">Demo sign-in successful</h3>' +
      '<p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">Signed in as <strong class="text-ink">' +
      escapeHtml(email) +
      "</strong>. No credentials were verified, sent or stored — this is a front-end demo only.</p>" +
      '<div class="mt-6 flex flex-wrap justify-center gap-3">' +
      '<a href="contact.html#reservation" class="btn-primary">Reserve a Table</a>' +
      '<button type="button" data-sign-out class="btn-ghost">Sign out</button>' +
      "</div></div>";
    host.classList.remove("hidden");
  }

  /* ----------------------------- initialiser --------------------------- */
  GS.initLoginPage = function () {
    var form = document.querySelector("[data-login-form]");
    if (!form || form.dataset.bound === "1") return;
    form.dataset.bound = "1";

    var submitBtn = form.querySelector("[data-submit]");
    var summaryBox = form.querySelector("[data-form-summary]");
    var successHost = document.querySelector("[data-login-success]");

    /* Validate once the user has left a field */
    $$(".field-input", form).forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.value || input.required) validateInput(input);
      });
      input.addEventListener("input", function () {
        var wrap = fieldWrap(input);
        if (wrap && wrap.classList.contains("is-invalid")) validateInput(input);
      });
    });

    /* Show / hide password */
    var toggle = form.querySelector("[data-password-toggle]");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var input = form.querySelector("#login-password") || form.querySelector('[name="password"]');
        if (!input) return;
        var show = input.type === "password";
        input.type = show ? "text" : "password";
        toggle.textContent = show ? "Hide" : "Show";
        toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
      });
    }

    /* Forgot password — demo feedback only */
    var forgot = form.querySelector("[data-forgot]");
    if (forgot) {
      forgot.addEventListener("click", function () {
        if (GS.toast) {
          GS.toast("Password reset is not enabled in this demo — please contact the restaurant.", "info");
        }
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var invalid = [];
      $$(".field-input", form).forEach(function (input) {
        if (!validateInput(input)) invalid.push(input);
      });

      if (invalid.length) {
        if (summaryBox) {
          summaryBox.classList.remove("hidden");
          summaryBox.innerHTML =
            "<strong>Please review " +
            invalid.length +
            " field" +
            (invalid.length === 1 ? "" : "s") +
            ".</strong> We highlighted the details we still need before this demo sign-in can continue.";
        }
        if (GS.toast) GS.toast("Some sign-in details need your attention.", "error");
        invalid[0].focus({ preventScroll: false });
        invalid[0].scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      if (summaryBox) summaryBox.classList.add("hidden");

      var email = form.querySelector('[name="email"]').value.trim();

      setLoading(submitBtn, true);
      if (GS.toast) GS.toast("Signing in…", "info", 2000);

      /* Simulated async request — replace with a real auth call. */
      setTimeout(function () {
        setLoading(submitBtn, false);
        if (successHost) {
          form.classList.add("hidden");
          renderSuccess(successHost, email);
        }
        if (GS.toast) GS.toast("Demo sign-in complete for " + email, "success");

        var signOut = successHost && successHost.querySelector("[data-sign-out]");
        if (signOut) {
          signOut.addEventListener("click", function () {
            successHost.classList.add("hidden");
            successHost.innerHTML = "";
            form.classList.remove("hidden");
            form.reset();
            $$(".field", form).forEach(function (f) {
              f.classList.remove("is-invalid");
            });
            var first = form.querySelector(".field-input");
            if (first) first.focus({ preventScroll: true });
            form.scrollIntoView({ behavior: "smooth", block: "center" });
          });
        }
      }, 1200);
    });
  };

  /* If main.js already booted, start immediately. */
  if (GS.booted) GS.initLoginPage();
})();
