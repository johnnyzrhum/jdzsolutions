(function () {
  Array.prototype.slice.call(document.querySelectorAll('.lang-toggle')).forEach(function (group) {
    var player = group.closest('.cine-flow').querySelector('video');
    var buttons = Array.prototype.slice.call(group.querySelectorAll('.lang-btn'));

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.getAttribute('aria-pressed') === 'true') return;

        var time = player.currentTime;
        var wasPlaying = !player.paused;
        var src = btn.getAttribute('data-src');

        buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });

        player.addEventListener('loadedmetadata', function restore() {
          player.removeEventListener('loadedmetadata', restore);
          if (time > 0) player.currentTime = Math.min(time, Math.max(player.duration - 0.1, 0));
          if (wasPlaying) player.play();
        });
        player.src = src;
        player.load();
      });
    });
  });
})();
