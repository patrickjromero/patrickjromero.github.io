// Mobile nav + dropdown behavior. Desktop hover handled in CSS.

(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Touch / click dropdown toggles (works on all viewports).
  var dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(function (dd) {
    var btn = dd.querySelector('.dropdown-toggle');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = dd.classList.contains('open');
      closeAll();
      if (!wasOpen) {
        dd.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  function closeAll() {
    dropdowns.forEach(function (dd) {
      dd.classList.remove('open');
      dd.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeAll(); }
  });

  // Close the mobile menu after tapping a plain nav link.
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
