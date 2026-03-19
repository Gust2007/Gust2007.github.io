document.addEventListener('DOMContentLoaded', function () {
  var emailSpans = document.querySelectorAll('.email-cloak');
  emailSpans.forEach(function (span) {
    var user = span.getAttribute('data-user');
    var domain = span.getAttribute('data-domain');
    if (user && domain) {
      var addr = user + '@' + domain;
      span.innerHTML = '<a href="mailto:' + addr + '">' + addr + '</a>';
    }
  });

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');

  if (prefersReduced) {
    reveals.forEach(function (el) {
      el.classList.remove('opacity-0', 'translate-y-6');
      el.classList.add('opacity-100', 'translate-y-0');
    });
    return;
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-6');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) {
      el.classList.remove('opacity-0', 'translate-y-6');
      el.classList.add('opacity-100', 'translate-y-0');
    });
  }
});
