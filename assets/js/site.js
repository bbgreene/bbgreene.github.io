document.querySelectorAll('[data-current-year]').forEach(function (element) {
  element.textContent = new Date().getFullYear();
});

var timelineLinks = Array.from(document.querySelectorAll('.timeline-track a'));
var releases = Array.from(document.querySelectorAll('.release-card[id]'));

if ('IntersectionObserver' in window && timelineLinks.length && releases.length) {
  var releaseObserver = new IntersectionObserver(function (entries) {
    var visibleRelease = entries
      .filter(function (entry) { return entry.isIntersecting; })
      .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];

    if (!visibleRelease) return;

    timelineLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + visibleRelease.target.id) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: [0, 0.1, 0.3] });

  releases.forEach(function (release) { releaseObserver.observe(release); });
}
