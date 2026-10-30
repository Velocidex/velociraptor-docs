/* Navbar-logo visibility on desktop.
 *
 * The full-colour VeloR7 mark lives at the top of the scrollable sidebar
 * menu (layouts/_partials/sidebar.html).  When the reader scrolls the menu
 * far enough that the mark leaves the viewport, the small raptor mark in
 * the top navbar appears in its place, so there is always a link back to
 * the landing page.  The navbar mark is hidden with visibility (not
 * display) so its slot stays reserved and the always-visible navbar
 * buttons never shift (see the matching rules in assets/css/custom.css).
 *
 * Pages without a sidebar logo (wide layouts, e.g. downloads) have no
 * other home link, so the navbar mark stays visible there.  On mobile the
 * sidebar logo is hidden and the navbar mark is the only logo, so nothing
 * is toggled.
 */
(function () {
  "use strict";

  var mq = window.matchMedia("(min-width: 768px)");
  var navbarLogo = document.querySelector(".hextra-navbar-logo");
  if (!navbarLogo) return;

  var setVisible = function (visible) {
    navbarLogo.classList.toggle("hextra-navbar-logo-visible", visible);
  };

  var sidebarLogo = document.querySelector(
    ".hextra-sidebar-container .hextra-sidebar-logo"
  );

  // No sidebar logo (wide layout): the navbar mark is the only home link.
  if (!sidebarLogo) {
    if (mq.matches) setVisible(true);
    return;
  }

  var scrollEl = document.querySelector(
    "aside.hextra-sidebar-container > .hextra-scrollbar"
  );
  if (!scrollEl) return;

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        if (!mq.matches) return;
        setVisible(!entries[0].isIntersecting);
      },
      { root: scrollEl, threshold: 0 }
    );
    observer.observe(sidebarLogo);
  } else {
    // Fallback: scroll listener on the sidebar container.
    var update = function () {
      if (!mq.matches) return;
      var rect = sidebarLogo.getBoundingClientRect();
      var containerRect = scrollEl.getBoundingClientRect();
      var visible =
        rect.bottom > containerRect.top && rect.top < containerRect.bottom;
      setVisible(!visible);
    };
    scrollEl.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
})();