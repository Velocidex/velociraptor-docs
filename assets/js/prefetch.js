// Velociraptor docs: hover-based prefetching of internal links.
// When the pointer enters an internal <a>, request its page with <link
// rel="prefetch"> (and <link rel="preconnect"> to the origin if it's remote)
// so the next navigation starts from the cache instead of the network.
(function () {
  "use strict";

  var prefetched = {};

  function prefetch(href) {
    if (prefetched[href]) {
      return;
    }
    prefetched[href] = true;

    var link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  }

  function preconnect(href) {
    var link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    link.crossOrigin = "";
    document.head.appendChild(link);
  }

  document.addEventListener(
    "pointerover",
    function (event) {
      var anchor = event.target.closest && event.target.closest("a");
      if (!anchor || !anchor.getAttribute("href")) {
        return;
      }

      var href = anchor.getAttribute("href");
      var url;

      try {
        url = new URL(href, window.location.href);
      } catch (err) {
        return;
      }

      // Only prefetch same-origin, same-scheme pages (skip downloads, mailto,
      // javascript:, anchor-only links, and external sites).
      if (url.origin !== window.location.origin) {
        if (url.protocol === "http:" || url.protocol === "https:") {
          preconnect(url.origin);
        }
        return;
      }
      if (url.hash && url.pathname === window.location.pathname) {
        return;
      }
      if (/\.(jpg|jpeg|png|gif|svg|webp|pdf|zip|gz|exe|sig|xml|json)$/i.test(url.pathname)) {
        return;
      }

      // Shallow-copy the URL so the fragment never leaks into the prefetch.
      url.hash = "";
      prefetch(url.href);
    },
    true
  );
})();