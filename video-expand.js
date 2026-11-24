// Adds an "Expand" button to each sample video. Expand enlarges the player to fill the window
// inside the page (not fullscreen), without moving the <video> element, so playback carries on.
// Close button, Esc, or a click on the dark backdrop closes it, pauses the video and restores
// the page scroll position. Native fullscreen stays available in the player's own controls.
(function () {
  var players = document.querySelectorAll('.sample .film-player');
  var open = null;

  function close() {
    if (!open) return;
    var p = open;
    open = null;
    p.player.classList.remove('is-expanded');
    p.player.removeAttribute('role');
    p.player.removeAttribute('aria-modal');
    p.button.textContent = 'Expand';
    p.button.setAttribute('aria-label', 'Expand video');
    p.figure.style.minHeight = '';
    document.body.style.overflow = '';
    p.video.pause();
    window.scrollTo(0, p.scrollY);
    p.button.focus({ preventScroll: true });
  }

  players.forEach(function (player) {
    var video = player.querySelector('video');
    var figure = player.closest('.sample');
    if (!video) return;

    video.setAttribute('controlslist', 'nodownload noplaybackrate');
    video.setAttribute('disablepictureinpicture', '');
    video.setAttribute('disableremoteplayback', '');
    player.addEventListener('contextmenu', function (e) { e.preventDefault(); });

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'expand-btn';
    button.textContent = 'Expand';
    button.setAttribute('aria-label', 'Expand video');
    player.appendChild(button);

    button.addEventListener('click', function () {
      if (open && open.player === player) { close(); return; }
      close();
      open = { player: player, video: video, button: button, figure: figure, scrollY: window.scrollY };
      figure.style.minHeight = figure.offsetHeight + 'px';
      player.classList.add('is-expanded');
      player.setAttribute('role', 'dialog');
      player.setAttribute('aria-modal', 'true');
      button.textContent = 'Close';
      button.setAttribute('aria-label', 'Close expanded video');
      document.body.style.overflow = 'hidden';
    });

    player.addEventListener('click', function (e) {
      if (e.target === player && open && open.player === player) close();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
