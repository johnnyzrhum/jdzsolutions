// Plays the landing-page recording inside each phone frame (muted, looping) only while it is on
// screen and its tab is showing, and leaves the still image for visitors who prefer reduced
// motion. Nothing downloads until a recording is first played.
(function () {
  var videos = document.querySelectorAll('.proof-phone video');
  if (!videos.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      } else {
        video.pause();
      }
    });
  }, { threshold: [0, 0.4, 0.7] });

  videos.forEach(function (video) { observer.observe(video); });
})();
