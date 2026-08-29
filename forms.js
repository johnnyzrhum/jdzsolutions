// Shows the organization-scale question set only when it's relevant, so visitors don't have to
// wade through fields that don't apply to them (e.g. a growing business doesn't need to answer
// "how many brands do you support").
(function () {
  var orgType = document.getElementById('org-type');
  var scaleFields = document.getElementById('scale-fields');
  if (!orgType || !scaleFields) return;

  var SCALE_RELEVANT = ['Agency', 'Enterprise', 'Multi-Brand Organization'];

  function sync() {
    scaleFields.hidden = SCALE_RELEVANT.indexOf(orgType.value) === -1;
  }

  orgType.addEventListener('change', sync);
  sync();
})();

// Pre-selects the "What would you like to discuss?" dropdown when a link points here with
// ?type=<value>, so a visitor who clicked "Request a Demo" doesn't have to re-tell us what they
// just told us by clicking. Falls back to the default unselected state if the param is missing
// or doesn't match a real option.
(function () {
  var inquiryType = document.getElementById('inquiry-type');
  if (!inquiryType) return;

  var params = new URLSearchParams(window.location.search);
  var requested = params.get('type');
  if (!requested) return;

  var matched = Array.prototype.some.call(inquiryType.options, function (option) {
    return option.value === requested;
  });
  if (matched) inquiryType.value = requested;
})();
