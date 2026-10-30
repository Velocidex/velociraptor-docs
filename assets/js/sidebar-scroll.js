/* Sidebar scroll-position persistence.
 *
 * The theme's scrollToActiveItem() snaps the sidebar menu to the active item
 * on every DOMContentLoaded. Our menu is tall enough to scroll on its own (the
 * VeloR7 logo at the top of the menu adds to its height), so on every
 * navigation the menu jumps to wherever the new active item happens to sit.
 * Remember where the reader left the menu and restore it instead, so the
 * sidebar stays put from page to page.
 *
 * Restoring alone is not enough. This is a deferred script, and the browser
 * paints the menu at scrollTop 0 before deferred scripts run, so the reader
 * still sees the jump. The inline script in
 * layouts/partials/custom/head-end.html adds html.sidebar-loading during
 * <head> parse, which holds the menu at visibility:hidden from the first
 * paint; this script removes the class once the position below is settled, so
 * the menu is first seen already in place.
 *
 * On a fresh tab there is nothing saved and the theme's behaviour is left
 * untouched, so the first page still scrolls its active item into view.
 */
(function () {
  "use strict";

  var KEY = "hextra-sidebar-scroll";
  var LOADING_CLASS = "sidebar-loading";

  // First statement, so the inline head failsafe can tell that this script
  // ran and leave the reveal to us rather than un-hiding the menu early.
  window.__sidebarScrollInit = true;

  // rAF alone is not enough: it never fires in a background tab, which would
  // leave the menu hidden until the tab is focused. The timeout covers that
  // and the rAF keeps the reveal on the frame after the restore.
  var reveal = function () {
    var done = false;
    var go = function () {
      if (done) return;
      done = true;
      document.documentElement.classList.remove(LOADING_CLASS);
    };
    window.requestAnimationFrame(go);
    window.setTimeout(go, 300);
  };

  var el = document.querySelector(
    "aside.hextra-sidebar-container > .hextra-scrollbar"
  );
  if (!el) {
    reveal();
    return;
  }

  var saved = sessionStorage.getItem(KEY);
  var y = saved === null ? NaN : parseFloat(saved);

  if (!isNaN(y)) {
    // Neutralise the theme's snap. scrollToActiveItem is a top-level function
    // declaration in the classic (non-module) main.js, so it is a global; if a
    // future build mangles the name this is a no-op and the restore below
    // still wins because our listener is registered after the theme's.
    if (typeof window.scrollToActiveItem === "function") {
      window.scrollToActiveItem = function () {};
    }

    var restore = function () {
      el.scrollTop = y;
    };

    // Restore twice. Immediately, so the position is already right for the
    // reveal below (which does not wait for DOMContentLoaded). And again on
    // DOMContentLoaded, which this deferred script is guaranteed to register
    // before it fires - so that restore runs after the theme's handler and
    // re-asserts the position even if the scrollToActiveItem override above
    // ever stops matching. Restoring only immediately would leave the theme's
    // snap as the last word in that case.
    if (document.readyState !== "complete") {
      document.addEventListener("DOMContentLoaded", restore);
    }
    restore();
    // Layout can still settle after DOMContentLoaded (webfonts, images), so
    // re-apply once the load event fires.
    window.addEventListener("load", restore);
  }

  // Reveal last. reveal() is called now - this is a deferred script, so the
  // DOM is already parsed - but it only schedules the un-hiding for the next
  // animation frame. Deferred scripts and DOMContentLoaded run in the same
  // task, before the browser's next rendering opportunity, so the theme's
  // scrollToActiveItem has already moved the menu (and the restore above has
  // re-applied the saved position) by the time that frame is painted. The
  // class therefore comes off with the menu already where it belongs, on a
  // first visit as well as on a navigation.
  reveal();

  var write = function () {
    try {
      sessionStorage.setItem(KEY, String(el.scrollTop));
    } catch (e) {
      /* private mode / quota - nothing useful to do */
    }
  };

  var pending = false;
  var saveSoon = function () {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(function () {
      pending = false;
      write();
    });
  };

  el.addEventListener("scroll", saveSoon, { passive: true });
  window.addEventListener("pagehide", write);
})();
