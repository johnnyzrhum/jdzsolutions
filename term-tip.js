// Info bubble on the product name: a click or tap shows it; clicking again, Esc, or a click
// elsewhere hides it. It never navigates, so a visitor can't leave the page by accident.
(function () {
  document.querySelectorAll('.term-wrap').forEach(function (wrap) {
    var button = wrap.querySelector('.term');
    var tip = wrap.querySelector('.term-tip');
    if (!button || !tip) return;

    function show() {
      tip.hidden = false;
      tip.style.left = '0px';
      var rect = tip.getBoundingClientRect();
      var overflow = rect.right - (window.innerWidth - 12);
      if (overflow > 0) tip.style.left = -overflow + 'px';
      button.setAttribute('aria-expanded', 'true');
    }
    function hide() {
      tip.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    }

    button.addEventListener('click', function (e) {
      if (tip.hidden) show(); else hide();
    });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) hide(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
  });
})();
