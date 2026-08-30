// Submits every .contact-form via fetch (AJAX) instead of a plain HTML POST, so a successful
// submission can redirect to our own thank-you.html. Formspree's free plan supports AJAX
// submissions but gates the server-side `_next` redirect behind a paid plan — this achieves the
// same visitor-facing result without needing that.
(function () {
  var forms = document.querySelectorAll('.contact-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var submitButton = form.querySelector('button[type="submit"]');
      var originalButtonText = submitButton ? submitButton.textContent : '';
      var errorNote = form.querySelector('.form-error');

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';
      }
      if (errorNote) errorNote.hidden = true;

      fetch(form.action, {
        method: form.method || 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then(function (response) {
          if (response.ok) {
            window.location.href = 'thank-you.html';
            return;
          }
          throw new Error('Form submission failed');
        })
        .catch(function () {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
          }
          if (errorNote) errorNote.hidden = false;
        });
    });
  });
})();
