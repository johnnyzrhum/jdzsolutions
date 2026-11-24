// Floating "Get in touch" button: shows once the hero has scrolled out of view, and hides again
// while the contact section or footer is on screen, or while a sample video is expanded.
(function () {
  var cta = document.querySelector('.float-cta');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('get-in-touch');
  var footer = document.querySelector('.site-footer');
  if (!cta || !hero || !contact || !('IntersectionObserver' in window)) return;

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

  var seen = { contact: false, footer: false };
  new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { heroVisible = e.isIntersecting; });
    update();
  }).observe(hero);

  var endObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { seen[e.target === contact ? 'contact' : 'footer'] = e.isIntersecting; });
    endVisible = seen.contact || seen.footer;
    update();
  });
  endObserver.observe(contact);
  if (footer) endObserver.observe(footer);

  var samples = document.getElementById('samples');
  if (samples) new MutationObserver(update).observe(samples, { subtree: true, attributes: true, attributeFilter: ['class'] });
})();
