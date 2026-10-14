/* PfotenParadies – eigene Skripte (JARVIS). Alles optional: Ohne JavaScript bleiben alle Inhalte sichtbar und nutzbar. */

/* 1) Voraussichtliches Lieferdatum. Feiertage werden nicht berücksichtigt, daher "voraussichtlich". */
(function () {
  var fmt;
  try {
    fmt = new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
  } catch (e) {
    return;
  }
  function addWorkdays(date, n) {
    var d = new Date(date.getTime());
    var added = 0;
    while (added < n) {
      d.setDate(d.getDate() + 1);
      var w = d.getDay();
      if (w !== 0 && w !== 6) added++;
    }
    return d;
  }
  function run() {
    var els = document.querySelectorAll('[data-hh-eta]:not([data-hh-done])');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var min = parseInt(el.getAttribute('data-min'), 10);
      var max = parseInt(el.getAttribute('data-max'), 10);
      var t = el.querySelector('[data-hh-eta-text]');
      if (!t || !min || !max) continue;
      var now = new Date();
      t.textContent = fmt.format(addWorkdays(now, min)) + ' – ' + fmt.format(addWorkdays(now, max));
      el.setAttribute('data-hh-done', '');
    }
  }
  window.hhRunEta = run;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();

/* 2) Größenhilfe: markiert die Zeile der gewählten Größe sofort (Server markiert sie nach dem Neuladen ebenfalls). */
(function () {
  function sync() {
    var boxes = document.querySelectorAll('[data-hh-size]');
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      var opt = box.getAttribute('data-option');
      if (!opt) continue;
      var scope = box.closest('product-form-component, .product-details, .product-information, form, main') || document;
      var checked = scope.querySelector('input[type="radio"][data-option-name="' + opt.replace(/"/g, '\\"') + '"]:checked');
      var select = scope.querySelector('select[data-option-name="' + opt.replace(/"/g, '\\"') + '"]');
      var value = checked ? checked.value : (select ? select.value : null);
      if (!value) continue;
      var rows = box.querySelectorAll('tr[data-value]');
      var label = box.querySelector('[data-hh-size-current]');
      for (var r = 0; r < rows.length; r++) {
        var on = rows[r].getAttribute('data-value') === value;
        rows[r].classList.toggle('is-active', on);
        if (on && label) label.textContent = rows[r].getAttribute('data-summary') || '';
      }
    }
  }
  document.addEventListener('change', function (e) {
    if (e.target && e.target.matches && e.target.matches('[data-option-name]')) requestAnimationFrame(sync);
  });
  window.hhSyncSize = sync;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync);
  else sync();
})();

/* 3) Abschnitte beim Scrollen einmalig einblenden. Was beim Laden schon sichtbar ist, wird nicht animiert. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  function init() {
    var els = document.querySelectorAll('.hh-reveal:not([data-hh-rv])');
    var vh = window.innerHeight || 800;
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      el.setAttribute('data-hh-rv', '');
      if (el.getBoundingClientRect().top < vh * 0.95) el.classList.add('is-in');
      else io.observe(el);
    }
    document.documentElement.classList.add('hh-js');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  /* Sicherheitsnetz: nach 4 s ist alles sichtbar, auch wenn der Beobachter nicht auslöst. */
  setTimeout(function () {
    var left = document.querySelectorAll('.hh-reveal:not(.is-in)');
    for (var i = 0; i < left.length; i++) left[i].classList.add('is-in');
  }, 4000);
})();

/* 4) Dropdown der Hauptnavigation mittig unter dem Menüpunkt (Desktop). */
(function () {
  var mq = window.matchMedia('(min-width: 750px)');
  function place(li) {
    var sub = li.querySelector(':scope > .menu-list__submenu');
    if (!sub || !mq.matches) return;
    var cb = sub.offsetParent || li.closest('.header__row') || document.body;
    var r = li.getBoundingClientRect();
    var c = cb.getBoundingClientRect();
    var inner = sub.querySelector('.menu-list__submenu-inner');
    var w = (inner && inner.offsetWidth) || sub.offsetWidth || 0;
    var x = r.left + r.width / 2;
    var half = w / 2 + 16;
    var vw = document.documentElement.clientWidth;
    if (half * 2 < vw) x = Math.max(half, Math.min(vw - half, x));
    sub.style.setProperty('--hh-dd-x', Math.round(x - c.left) + 'px');
  }
  function bind() {
    var items = document.querySelectorAll('header-menu .menu-list__list-item');
    for (var i = 0; i < items.length; i++) {
      var li = items[i];
      if (!li.querySelector(':scope > .menu-list__submenu')) continue;
      if (!li.hasAttribute('data-hh-dd')) {
        li.setAttribute('data-hh-dd', '');
        li.addEventListener('pointerenter', place.bind(null, li));
        li.addEventListener('focusin', place.bind(null, li));
      }
      place(li);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
  window.addEventListener('load', bind);
  window.addEventListener('resize', function () { requestAnimationFrame(bind); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(bind);
})();

/* 5) Nach Teil-Neuladen von Abschnitten (Variante, Warenkorb) alles erneut anwenden. */
(function () {
  var pending = false;
  new MutationObserver(function () {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      pending = false;
      if (window.hhRunEta) window.hhRunEta();
      if (window.hhSyncSize) window.hhSyncSize();
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
