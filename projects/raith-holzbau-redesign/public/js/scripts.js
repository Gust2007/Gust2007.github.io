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
});
