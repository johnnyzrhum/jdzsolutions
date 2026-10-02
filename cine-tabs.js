(function () {
  Array.prototype.slice.call(document.querySelectorAll('.cine-tabs')).forEach(function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll('.cine-tab'));

    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        panel.hidden = !on;
        if (!on) {
          var v = panel.querySelector('video');
          if (v) v.pause();
        }
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (e) {
        var next;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else return;
        e.preventDefault();
        select(next);
        next.focus();
      });
    });
  });
})();
