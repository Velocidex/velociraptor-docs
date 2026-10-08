// Velociraptor docs: copy permalink URLs to the clipboard.
// Hextra renders every h2+ heading with a .subheading-anchor link, and the
// config reference page renders an .anchorlink icon on every item (see
// scripts/config_reference/main.go). Clicking either updates the URL hash
// (default anchor behaviour, left untouched here) and additionally copies
// the full page URL - fragment included - to the clipboard so it can be
// shared directly. A small transient toast confirms the copy.
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

  // Transient "Link copied to clipboard!" toast. One shared element is
  // reused so rapid clicks on several anchors restart the same toast
  // instead of stacking copies.  Position and colours live in
  // assets/css/custom.css (.anchor-copy-toast), including the dark-mode
  // inversion; only the opacity fade is driven from here.
  var toastEl = null;
  var toastTimer = null;

  function showCopied() {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.id = "anchor-copy-toast";
      toastEl.className = "anchor-copy-toast";
      toastEl.textContent = "Link copied to clipboard!";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    // Restart the fade-in even if the toast is mid-fade.
    toastEl.style.opacity = "0";
    void toastEl.offsetWidth; // force reflow
    toastEl.style.opacity = "1";
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toastTimer = setTimeout(function () {
      toastEl.style.opacity = "0";
    }, 1800);
  }

  document.addEventListener("click", function (event) {
    var anchor =
      event.target.closest &&
      event.target.closest(".subheading-anchor, .anchorlink");
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
    showCopied();
  });
})();