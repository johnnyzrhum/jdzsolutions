// Info bubble on the product name: hover, focus or tap shows it; Esc, a tap elsewhere or the
// mouse leaving hides it. It never navigates, so a visitor can't leave the page by accident.
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
      e.stopPropagation();
      if (tip.hidden) show();
    });
    wrap.addEventListener('mouseenter', show);
    wrap.addEventListener('mouseleave', hide);
    button.addEventListener('focus', show);
    button.addEventListener('blur', hide);
    document.addEventListener('click', hide);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
  });
})();
