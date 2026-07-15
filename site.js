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

    /* Forms compose a pre-addressed email (static hosting has no backend). */
    document.querySelectorAll('form[data-mailto]').forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var lines = [];
        var subject = form.getAttribute('data-subject') || 'Website inquiry';
        form.querySelectorAll('input, select, textarea').forEach(function (f) {
          if (!f.name || !f.value.trim()) { return; }
          if (f.name === 'subject') { subject = f.value.trim(); return; }
          var lab = f.closest('.field');
          lab = lab ? lab.querySelector('span').textContent : f.name;
          lines.push(lab + ': ' + f.value.trim());
        });
        window.location.href = 'mailto:' + form.getAttribute('data-mailto') +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(lines.join('\n\n'));
        var s = form.querySelector('.form-status');
        if (s) { s.hidden = false; }
      });
    });
  });
})();
