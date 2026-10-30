// Velociraptor docs: collapsible right-hand "On this page" column.
// Two floating chevron buttons (right-facing collapse, left-facing expand)
// park at the article column's top-right corner. Collapsing hides the TOC
// column entirely, letting the article expand; the expand chevron floats over
// the article's edge to reopen it. The choice persists in localStorage, like
// the sidebar scroll state and theme toggle. Collapsing adds
// html.hextra-toc-collapsed, which the CSS in assets/css/custom.css uses to
// hide the nav and switch which chevron shows.
//
// The persisted state is applied before first paint by an inline script in
// layouts/partials/custom/head-end.html; this script only handles clicks and
// keeps the aria-expanded attributes in sync with that pre-paint state.
(function () {
  "use strict";

  var KEY = "hextra-toc-collapsed";
  var root = document.documentElement;
  var collapseBtn = document.querySelector("[data-toc-collapse]");
  var expandBtn = document.querySelector("[data-toc-expand]");

  if (!collapseBtn || !expandBtn) {
    return;
  }

  function setCollapsed(collapsed) {
    root.classList.toggle("hextra-toc-collapsed", collapsed);
    collapseBtn.setAttribute("aria-expanded", collapsed ? "false" : "true");
    expandBtn.setAttribute("aria-expanded", collapsed ? "true" : "false");
    try {
      if (collapsed) {
        localStorage.setItem(KEY, "1");
      } else {
        localStorage.removeItem(KEY);
      }
    } catch (e) {
      // Ignore: persistence is best-effort (e.g. private mode).
    }
  }

  collapseBtn.addEventListener("click", function () {
    setCollapsed(true);
  });

  expandBtn.addEventListener("click", function () {
    setCollapsed(false);
  });

  // Sync the attribute state with whatever the head script already applied.
  if (root.classList.contains("hextra-toc-collapsed")) {
    collapseBtn.setAttribute("aria-expanded", "false");
    expandBtn.setAttribute("aria-expanded", "true");
  }
})();