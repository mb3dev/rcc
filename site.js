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
  });
})();
