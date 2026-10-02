(function () {
  Array.prototype.slice.call(document.querySelectorAll('.cine-flow')).forEach(function (panel) {
    var player = panel.querySelector('video');
    var scenes = Array.prototype.slice.call(panel.querySelectorAll('.scene'));
    var info = panel.querySelector('.sp-info');
    if (!player || !scenes.length) return;

    var starts = scenes.map(function (s) { return parseFloat(s.getAttribute('data-start')) || 0; });

    function sync() {
      var t = player.currentTime;
      var active = -1;
      if (t > 0 || !player.paused) {
        active = 0;
        starts.forEach(function (start, i) { if (t >= start - 0.05) active = i; });
      }
      scenes.forEach(function (scene, i) {
        scene.classList.toggle('is-active', i === active);
        if (i === active) scene.setAttribute('aria-current', 'true');
        else scene.removeAttribute('aria-current');
      });
    }

    function jump(i) {
      function go() {
        player.currentTime = starts[i];
        var started = player.play();
        if (started && started.catch) started.catch(function () {});
      }
      if (player.readyState >= 1) {
        go();
      } else {
        player.addEventListener('loadedmetadata', go, { once: true });
        player.load();
      }
    }

    scenes.forEach(function (scene, i) {
      scene.addEventListener('click', function () { jump(i); });
    });

    ['timeupdate', 'play', 'pause', 'seeked', 'loadedmetadata'].forEach(function (name) {
      player.addEventListener(name, sync);
    });

    if (info) {
      info.addEventListener('click', function (e) {
        e.stopPropagation();
        info.setAttribute('aria-expanded', info.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
      });
      info.addEventListener('blur', function () { info.setAttribute('aria-expanded', 'false'); });
      info.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') info.setAttribute('aria-expanded', 'false');
      });
      document.addEventListener('click', function () { info.setAttribute('aria-expanded', 'false'); });
    }
  });
})();
