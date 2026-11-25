// Floating "Get in touch" button: shows once the hero has scrolled out of view, and hides again
// while the contact section or footer is on screen, or while a sample video is expanded.
(function () {
  var cta = document.querySelector('.float-cta');
  var hero = document.querySelector('.hero');
  // End markers: elements tagged data-float-end (the form itself on short pages), else the whole contact section.
  var ends = Array.prototype.slice.call(document.querySelectorAll('[data-float-end]'));
  if (!ends.length) { var contact = document.getElementById('get-in-touch'); if (contact) ends = [contact]; }
  var footer = document.querySelector('.site-footer');
  if (!cta || !hero || !ends.length || !('IntersectionObserver' in window)) return;

  var heroVisible = true;
  var endVisible = false;

  function update() {
    var expanded = !!document.querySelector('.film-player.is-expanded');
    var show = !heroVisible && !endVisible && !expanded;
    if (show) {
      cta.hidden = false;
      requestAnimationFrame(function () { cta.classList.add('is-shown'); });
    } else {
      cta.classList.remove('is-shown');
      cta.hidden = true;
    }
  }

  var seen = [];
  var endObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { seen[e.target.__floatIdx] = e.isIntersecting; });
    endVisible = seen.some(Boolean);
    update();
  });
  new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { heroVisible = e.isIntersecting; });
    update();
  }).observe(hero);
  ends.concat(footer ? [footer] : []).forEach(function (el, i) {
    el.__floatIdx = i;
    seen[i] = false;
    endObserver.observe(el);
  });

  var samples = document.getElementById('samples');
  if (samples) new MutationObserver(update).observe(samples, { subtree: true, attributes: true, attributeFilter: ['class'] });
})();
