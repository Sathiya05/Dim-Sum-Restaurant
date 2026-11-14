/* ==========================================================================
   Golden Steam Dim Sum House — reservation.js
   - Reservation form validation (required, email, phone, past dates, guests)
   - Configurable demo time slots
   - Demo submission with loading state + reference number
   - Reservation confirmation summary (clearly marked as a demo)
   - Toast notifications
   NOTE: this is a FRONTEND DEMO. No request is sent to a restaurant.
   ========================================================================== */
(function () {
  "use strict";

  var GS = (window.GS = window.GS || {});

  /* ======================================================================
     RESERVATION CONFIGURATION — edit these values freely
     ====================================================================== */
  var CONFIG = {
    demoMode: true,                 /* keep true unless a real API is wired */
    leadTimeDays: 0,                /* 0 = today allowed; past dates blocked */
    maxDateDays: 60,                /* how far ahead guests may book */
    maxGuests: 12,                  /* larger parties → ask to contact you   */
    minGuests: 1,
    timeSlots: [
      "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
      "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
      "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
      "7:30 PM", "8:00 PM", "8:30 PM"
    ],
    diningOptions: [
      { value: "", label: "Select a dining option" },
      { value: "regular-dining", label: "Regular Dining" },
      { value: "weekend-brunch", label: "Weekend Brunch" },
      { value: "family-gathering", label: "Family Gathering" },
      { value: "group-reservation", label: "Group Reservation" }
    ],
    occasions: ["", "Birthday", "Anniversary", "Business Meal", "Family Celebration", "Date Night", "Other"]
  };

  GS.reservationConfig = CONFIG;

  var STORAGE_KEY = "gs-demo-reservations";

  /* ---------------------------------------------------------------------
     Helpers
     --------------------------------------------------------------------- */
  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  function isoPlusDays(days) {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + days);
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
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

  var RULES = {
    name: function (v) {
      if (!v.trim()) return "Please enter your full name.";
      if (v.trim().length < 2) return "Please enter at least 2 characters.";
      return "";
    },
    email: function (v) {
      if (!v.trim()) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "Please enter a valid email address.";
      return "";
    },
    phone: function (v) {
      if (!v.trim()) return "Please enter your phone number.";
      var digits = v.replace(/[^\d]/g, "");
      if (digits.length < 7 || digits.length > 15) return "Please enter a valid phone number (7–15 digits).";
      if (!/^[+\d][\d\s().-]*$/.test(v.trim())) return "Use digits only, with optional + ( ) - characters.";
      return "";
    },
    date: function (v) {
      if (!v) return "Please choose a reservation date.";
      var chosen = new Date(v + "T00:00:00");
      var today = new Date(isoPlusDays(CONFIG.leadTimeDays) + "T00:00:00");
      var max = new Date(isoPlusDays(CONFIG.maxDateDays) + "T00:00:00");
      if (isNaN(chosen.getTime())) return "Please choose a valid date.";
      if (chosen < today) return "The reservation date cannot be in the past.";
      if (chosen > max) return "Please choose a date within the next " + CONFIG.maxDateDays + " days.";
      return "";
    },
    time: function (v) {
      if (!v) return "Please select a preferred time.";
      if (CONFIG.timeSlots.indexOf(v) === -1) return "Please select a time from the list.";
      return "";
    },
    guests: function (v) {
      if (v === "" || v === null) return "Please tell us how many guests.";
      var n = Number(v);
      if (!Number.isInteger(n)) return "Number of guests must be a whole number.";
      if (n < CONFIG.minGuests) return "At least " + CONFIG.minGuests + " guest is required.";
      if (n > CONFIG.maxGuests)
        return "For parties larger than " + CONFIG.maxGuests + ", please contact the restaurant directly.";
      return "";
    },
    dining: function (v) {
      if (!v) return "Please choose a dining preference.";
      return "";
    }
  };

  var OPTIONAL_RULES = {
    email: function (v) {
      if (!v.trim()) return "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "Please enter a valid email address.";
      return "";
    }
  };

  function validateInput(input, optional) {
    var name = input.getAttribute("name");
    var rule = optional ? OPTIONAL_RULES[name] : RULES[name];
    if (!rule) return true;
    var message = rule(String(input.value || ""));
    setError(input, message);
    return !message;
  }

  /* ---------------------------------------------------------------------
     Populate dynamic selects (time slots, dining, occasions) from CONFIG
     --------------------------------------------------------------------- */
  function fillSelect(select, values, placeholder) {
    if (!select || select.dataset.filled === "1") return;
    select.innerHTML = "";
    values.forEach(function (value, index) {
      var opt = document.createElement("option");
      if (typeof value === "object") {
        opt.value = value.value;
        opt.textContent = value.label;
      } else {
        opt.value = value;
        opt.textContent = index === 0 && value === "" && placeholder ? placeholder : value;
      }
      select.appendChild(opt);
    });
    select.dataset.filled = "1";
  }

  function populate(form) {
    var time = form.querySelector('[name="time"]');
    if (time && time.dataset.filled !== "1") {
      time.innerHTML = "";
      var ph = document.createElement("option");
      ph.value = "";
      ph.textContent = "Select a time";
      time.appendChild(ph);
      CONFIG.timeSlots.forEach(function (t) {
        var o = document.createElement("option");
        o.value = t;
        o.textContent = t;
        time.appendChild(o);
      });
      time.dataset.filled = "1";
    }

    fillSelect(form.querySelector('[name="dining"]'), CONFIG.diningOptions);
    fillSelect(form.querySelector('[name="occasion"]'), CONFIG.occasions, "No special occasion");

    /* Date limits */
    var date = form.querySelector('[name="date"]');
    if (date) {
      date.min = isoPlusDays(CONFIG.leadTimeDays);
      date.max = isoPlusDays(CONFIG.maxDateDays);
    }

    var guests = form.querySelector('[name="guests"]');
    if (guests) {
      guests.min = String(CONFIG.minGuests);
      guests.max = String(CONFIG.maxGuests);
    }

    /* Preselect dining preference (deep link / brunch CTA) */
    var params = new URLSearchParams(window.location.search);
    var preselect = params.get("dining") || GS.storage.get("gs-pending-dining");
    var dining = form.querySelector('[name="dining"]');
    if (preselect && dining) {
      var exists = Array.prototype.some.call(dining.options, function (o) {
        return o.value === preselect;
      });
      if (exists) dining.value = preselect;
    }
    GS.storage.set("gs-pending-dining", "");
  }

  /* ---------------------------------------------------------------------
     Loading state
     --------------------------------------------------------------------- */
  function setLoading(btn, loading) {
    var label = btn.querySelector("[data-submit-label]");
    if (loading) {
      btn.dataset.original = label ? label.textContent : btn.textContent;
      btn.disabled = true;
      btn.setAttribute("aria-busy", "true");
      btn.classList.add("opacity-80", "cursor-wait");
      if (label) {
        label.textContent = "Sending request…";
      }
      var spinner = btn.querySelector("[data-spinner]");
      if (spinner) spinner.classList.remove("hidden");
    } else {
      btn.disabled = false;
      btn.removeAttribute("aria-busy");
      btn.classList.remove("opacity-80", "cursor-wait");
      if (label && btn.dataset.original) label.textContent = btn.dataset.original;
      var sp = btn.querySelector("[data-spinner]");
      if (sp) sp.classList.add("hidden");
    }
  }

  /* ---------------------------------------------------------------------
     Demo reference + local storage of demo records (non-sensitive only)
     --------------------------------------------------------------------- */
  function makeReference() {
    var d = new Date();
    var ymd =
      d.getFullYear() +
      String(d.getMonth() + 1).padStart(2, "0") +
      String(d.getDate()).padStart(2, "0");
    var rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return "GS-" + ymd + "-" + rand;
  }

  function storeDemoRecord(record) {
    try {
      var all = JSON.parse(GS.storage.get(STORAGE_KEY) || "[]");
      if (!Array.isArray(all)) all = [];
      all.push(record);
      GS.storage.set(STORAGE_KEY, JSON.stringify(all.slice(-10)));
    } catch (e) {
      /* ignore storage failures */
    }
  }

  /* ---------------------------------------------------------------------
     Confirmation summary
     --------------------------------------------------------------------- */
  function summaryRow(label, value) {
    if (!value) return "";
    return (
      '<div class="flex items-start justify-between gap-4 border-b border-line py-2.5 last:border-0">' +
      '<dt class="text-xs font-semibold uppercase tracking-wider text-muted">' + label + "</dt>" +
      '<dd class="text-end text-sm font-medium text-ink">' + value + "</dd></div>"
    );
  }

  function renderSuccess(host, data, reference) {
    host.innerHTML =
      '<div class="summary-box animate-fadeUp">' +
      '<div class="flex flex-wrap items-center gap-3">' +
      '<span class="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-cream">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" aria-hidden="true">' +
      '<path d="M20 6 9 17l-5-5"/></svg></span>' +
      '<div><h3 class="font-display text-xl sm:text-2xl">Reservation request received</h3>' +
      '<p class="text-sm text-muted">Reference <strong class="text-primary">' + reference + "</strong></p></div></div>" +

      '<div class="mt-4 rounded-xl border border-primary/30 bg-tintred px-4 py-3 text-sm leading-relaxed text-ink">' +
      "<strong>Demo only.</strong> This form is a frontend demonstration — nothing has been sent to the " +
      "restaurant and your table is <strong>not confirmed</strong>. The restaurant would need to accept the " +
      "request through a connected booking system or by contacting you directly.</div>" +

      '<dl class="mt-5 grid gap-x-8 sm:grid-cols-2">' +
      summaryRow("Guest name", data.name) +
      summaryRow("Email", data.email) +
      summaryRow("Phone", data.phone) +
      summaryRow("Date", GS.fmtDate(data.date)) +
      summaryRow("Time", data.time) +
      summaryRow("Guests", data.guests + (Number(data.guests) === 1 ? " guest" : " guests")) +
      summaryRow("Dining preference", data.diningLabel) +
      summaryRow("Occasion", data.occasion) +
      summaryRow("Special requests", data.requests) +
      summaryRow("Dietary / allergy notes", data.dietary) +
      "</dl>" +

      '<div class="mt-6 flex flex-wrap gap-3">' +
      '<button type="button" data-reservation-reset class="btn-primary">Make another request</button>' +
      '<a href="menu.html" class="btn-ghost">Explore the menu</a>' +
      "</div></div>";

    host.classList.remove("hidden");
    host.scrollIntoView({ behavior: "smooth", block: "center" });

    var reset = host.querySelector("[data-reservation-reset]");
    if (reset) {
      reset.addEventListener("click", function () {
        host.classList.add("hidden");
        host.innerHTML = "";
        var form = document.querySelector("[data-reservation-form]");
        if (form) {
          form.reset();
          $$(".field", form).forEach(function (f) {
            f.classList.remove("is-invalid");
          });
          populate(form);
          form.scrollIntoView({ behavior: "smooth", block: "center" });
          var first = form.querySelector(".field-input");
          if (first) first.focus({ preventScroll: true });
        }
      });
    }
  }

  /* ---------------------------------------------------------------------
     Initialiser
     --------------------------------------------------------------------- */
  GS.initReservationPage = function () {
    var form = document.querySelector("[data-reservation-form]");
    if (!form || form.dataset.bound === "1") return;
    form.dataset.bound = "1";

    var submitBtn = form.querySelector("[data-submit]");
    var successHost = document.querySelector("[data-reservation-success]");
    var summaryBox = form.querySelector("[data-form-summary]");

    populate(form);

    /* Validate on blur / change once the user has left a field */
    $$(".field-input", form).forEach(function (input) {
      var evt = input.tagName === "SELECT" || input.type === "date" || input.type === "number" ? "change" : "blur";
      input.addEventListener(evt, function () {
        if (input.value || input.required) validateInput(input, input.hasAttribute("data-optional"));
      });
      input.addEventListener("input", function () {
        var wrap = fieldWrap(input);
        if (wrap && wrap.classList.contains("is-invalid")) validateInput(input, input.hasAttribute("data-optional"));
      });
    });

    /* Map / directions placeholder feedback */
    var directions = document.querySelector("[data-directions]");
    if (directions) {
      directions.addEventListener("click", function () {
        if (GS.toast) {
          GS.toast(
            "Add the restaurant's real address and map embed in contact.html to enable directions.",
            "info"
          );
        }
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var invalid = [];
      $$(".field-input", form).forEach(function (input) {
        var ok = validateInput(input, input.hasAttribute("data-optional"));
        if (!ok) invalid.push(input);
      });

      if (invalid.length) {
        if (summaryBox) {
          summaryBox.classList.remove("hidden");
          summaryBox.innerHTML =
            "<strong>Please review " +
            invalid.length +
            " field" +
            (invalid.length === 1 ? "" : "s") +
            ".</strong> We highlighted the answers we still need before this demo request can be sent.";
        }
        if (GS.toast) GS.toast("Some reservation details need your attention.", "error");
        invalid[0].focus({ preventScroll: false });
        invalid[0].scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      if (summaryBox) summaryBox.classList.add("hidden");

      var diningSelect = form.querySelector('[name="dining"]');
      var data = {
        name: form.querySelector('[name="name"]').value.trim(),
        email: form.querySelector('[name="email"]').value.trim(),
        phone: form.querySelector('[name="phone"]').value.trim(),
        date: form.querySelector('[name="date"]').value,
        time: form.querySelector('[name="time"]').value,
        guests: form.querySelector('[name="guests"]').value,
        dining: diningSelect.value,
        diningLabel:
          diningSelect.selectedOptions && diningSelect.selectedOptions.length
            ? diningSelect.selectedOptions[0].textContent
            : "",
        occasion: form.querySelector('[name="occasion"]').value,
        requests: form.querySelector('[name="requests"]').value.trim(),
        dietary: form.querySelector('[name="dietary"]').value.trim()
      };

      setLoading(submitBtn, true);
      if (GS.toast) GS.toast("Sending your reservation request…", "info", 2200);

      /* Simulated async request — replace with a real API/booking call. */
      setTimeout(function () {
        setLoading(submitBtn, false);
        var reference = makeReference();

        storeDemoRecord({
          reference: reference,
          name: data.name,
          date: data.date,
          time: data.time,
          guests: data.guests,
          dining: data.dining,
          createdAt: new Date().toISOString()
        });

        if (successHost) renderSuccess(successHost, data, reference);
        if (GS.toast) GS.toast("Demo reservation request created: " + reference, "success");
      }, 1400);
    });
  };

  /* If main.js already booted, start immediately. */
  if (GS.booted) GS.initReservationPage();
})();
