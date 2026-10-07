/* Patrick Romero — personal site v2 interactions */
(function () {
  "use strict";

  /* header shadow on scroll */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* dropdowns */
  var dropdowns = Array.prototype.slice.call(document.querySelectorAll(".dropdown"));
  function closeAll(except) {
    dropdowns.forEach(function (d) {
      if (d !== except) {
        d.classList.remove("open");
        d.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
      }
    });
  }
  dropdowns.forEach(function (dd) {
    var btn = dd.querySelector(".dropdown-toggle");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var willOpen = !dd.classList.contains("open");
      closeAll(dd);
      dd.classList.toggle("open", willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
    /* hover intent on fine pointers */
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      var t;
      dd.addEventListener("mouseenter", function () {
        clearTimeout(t);
        closeAll(dd);
        dd.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      });
      dd.addEventListener("mouseleave", function () {
        t = setTimeout(function () {
          dd.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
        }, 180);
      });
    }
  });
  document.addEventListener("click", function () { closeAll(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });

  /* mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      links.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  /* scroll reveals with stagger */
  var revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach(function (el, i) {
    var siblings = el.parentElement ? el.parentElement.querySelectorAll(":scope > .reveal") : [];
    var idx = Array.prototype.indexOf.call(siblings, el);
    if (idx > 0) el.style.transitionDelay = Math.min(idx * 110, 440) + "ms";
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  revealEls.forEach(function (el) { io.observe(el); });

  /* animated counters */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function fmt(n) {
      return prefix + n.toLocaleString("en-US") + suffix;
    }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll(".stat-num[data-count]");
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        animateCount(en.target);
        cio.unobserve(en.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(function (el) { cio.observe(el); });
})();
