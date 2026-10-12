/* PfotenParadies – voraussichtliches Lieferdatum (JARVIS). Feiertage werden nicht berücksichtigt, daher "voraussichtlich". */
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  var pending = false;
  new MutationObserver(function () {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      pending = false;
      run();
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

/* PfotenParadies – Dropdown der Hauptnavigation mittig unter dem Menüpunkt (JARVIS v4) */
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
