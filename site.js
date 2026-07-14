/* Progressive enhancement only — every page works fully without this file.
   No scroll-reveal (content is visible on load). The mobile nav is a CSS
   checkbox toggle; this only adds close-on-Escape / outside / link. */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var cb = document.getElementById('nav-cb');
    var wrap = document.querySelector('.nav-wrap');
    if (!cb || !wrap) { return; }
    var close = function () { cb.checked = false; };
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && cb.checked) { close(); wrap.querySelector('.nav-toggle').focus(); }
    });
    wrap.querySelectorAll('.primary-nav a').forEach(function (a) {
      a.addEventListener('click', close);
    });
    document.addEventListener('click', function (e) {
      if (cb.checked && !wrap.contains(e.target)) { close(); }
    });
  });
})();
