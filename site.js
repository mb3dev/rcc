/* Progressive enhancement only — every page works fully without this file. */
(function () {
  document.documentElement.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    /* Menu overlay: lock page scroll while open, close on Escape. */
    var menu = document.querySelector('details.menu');
    if (menu) {
      menu.addEventListener('toggle', function () {
        document.body.classList.toggle('menu-open', menu.open);
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menu.open) {
          menu.open = false;
          menu.querySelector('summary').focus();
        }
      });
    }

    /* Scroll reveals. */
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var revealed = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduced) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealed.forEach(function (el) { observer.observe(el); });
    } else {
      revealed.forEach(function (el) { el.classList.add('in'); });
    }

    /* Forms: compose a pre-addressed email (no backend on static hosting). */
    document.querySelectorAll('form[data-mailto]').forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var lines = [];
        var subject = form.getAttribute('data-subject') || 'Website inquiry';
        form.querySelectorAll('input, select, textarea').forEach(function (field) {
          if (!field.name || !field.value.trim()) { return; }
          if (field.name === 'subject') { subject = field.value.trim(); return; }
          var label = field.closest('.field');
          label = label ? label.querySelector('span').textContent : field.name;
          lines.push(label + ': ' + field.value.trim());
        });
        window.location.href = 'mailto:' + form.getAttribute('data-mailto') +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(lines.join('\n\n'));
        var confirmation = form.querySelector('.form-confirmation');
        if (confirmation) { confirmation.hidden = false; }
      });
    });
  });
})();
