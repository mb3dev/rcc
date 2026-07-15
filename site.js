/* Progressive enhancement only — every page works fully without this file. */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    /* Mobile nav drawer (CSS checkbox toggle) — close on Escape/outside/link. */
    var cb = document.getElementById('nav-cb');
    var wrap = document.querySelector('.nav-wrap');
    if (cb && wrap) {
      var close = function () { cb.checked = false; };
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && cb.checked) { close(); wrap.querySelector('.nav-toggle').focus(); }
      });
      wrap.querySelectorAll('.primary-nav a').forEach(function (a) { a.addEventListener('click', close); });
      document.addEventListener('click', function (e) { if (cb.checked && !wrap.contains(e.target)) { close(); } });
    }
  });
})();
