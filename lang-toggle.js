(function () {
  Array.prototype.slice.call(document.querySelectorAll('.lang-toggle')).forEach(function (group) {
    var player = group.closest('.cine-flow').querySelector('video');
    var buttons = Array.prototype.slice.call(group.querySelectorAll('.lang-btn'));

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.getAttribute('aria-pressed') === 'true') return;

        buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });

        player.pause();
        player.src = btn.getAttribute('data-src');
        player.load();
      });
    });
  });
})();
