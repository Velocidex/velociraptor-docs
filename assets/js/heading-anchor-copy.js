// Velociraptor docs: copy heading permalink URLs to the clipboard.
// Hextra renders every h2+ heading with a .subheading-anchor link that points
// at the heading's id. Clicking it updates the URL hash (default anchor
// behaviour, left untouched here) and additionally copies the full page URL -
// fragment included - to the clipboard so it can be shared directly.
(function () {
  "use strict";

  function fallbackCopy(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (e) {
      // Ignore: copy is best-effort.
    }
    document.body.removeChild(textarea);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {}, function () {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  document.addEventListener("click", function (event) {
    var anchor =
      event.target.closest && event.target.closest(".subheading-anchor");
    if (!anchor) {
      return;
    }
    var href = anchor.getAttribute("href");
    if (!href || href.charAt(0) !== "#") {
      return;
    }
    // Only plain left-clicks; a modified click (new tab/window) is a normal
    // navigation and must not be hijacked.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    // The post-click URL is the current page path (any existing query kept)
    // plus the anchor fragment - exactly what the default click's hash set.
    var base = window.location.href.split("#")[0];
    copyText(base + href);
  });
})();