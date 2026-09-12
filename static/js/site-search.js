// Temporary site-wide search for the /search page. Reads the Hugo
// index.json index and filters client side. This is a stopgap that will be
// replaced by Pagefind.
(function () {
  "use strict";

  const MAX_RESULTS = 100;

  function esc(value) {
    return String(value == null ? "" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function card(hit) {
    const href = hit.externalUrl || hit.permalink;
    const meta = [];
    if (hit.section) {
      meta.push(esc(hit.section));
    }
    if (hit.date) {
      meta.push(esc(hit.date));
    }
    return (
      '<div class="mb-2">' +
      '<a href="' +
      esc(href) +
      '" class="block rounded-md bg-neutral-100 px-3 py-2 hover:bg-primary-100 dark:bg-neutral-700 dark:hover:bg-primary-900">' +
      '<div class="grow"><div class="-mb-1 text-lg font-bold">' +
      esc(hit.title) +
      "</div>" +
      (meta.length
        ? '<div class="text-sm text-neutral-500 dark:text-neutral-400">' +
          meta.join(" &middot; ") +
          "</div>"
        : "") +
      (hit.summary
        ? '<div class="text-sm italic">' + esc(hit.summary) + "</div>"
        : "") +
      "</div></a></div>"
    );
  }

  function init(root, input, results) {
    let indexPromise = null;

    function loadIndex() {
      if (!indexPromise) {
        indexPromise = fetch("/index.json").then(function (resp) {
          if (!resp.ok) {
            throw new Error("HTTP " + resp.status);
          }
          return resp.json();
        });
      }
      return indexPromise;
    }

    function search(filter) {
      loadIndex()
        .then(function (index) {
          const upper = filter.toUpperCase();
          const matches = index.filter(function (hit) {
            return (
              (hit.title || "").toUpperCase().includes(upper) ||
              (hit.section || "").toUpperCase().includes(upper) ||
              (hit.summary || "").toUpperCase().includes(upper)
            );
          });
          const shown = matches.slice(0, MAX_RESULTS);
          let html = shown.map(card).join("");
          if (matches.length > MAX_RESULTS) {
            html +=
              '<div class="text-sm text-neutral-500 dark:text-neutral-400">Showing ' +
              MAX_RESULTS +
              " of " +
              matches.length +
              " results.</div>";
          }
          if (!matches.length) {
            html =
              '<div class="text-neutral-500 dark:text-neutral-400">No results available</div>';
          }
          results.innerHTML = html;
        })
        .catch(function (err) {
          console.error("Site search failed", err);
          results.innerHTML =
            '<div class="text-neutral-500 dark:text-neutral-400 font-bold">Error loading search index: ' +
            esc(err.message) +
            "</div>";
        });
    }

    let timer = 0;
    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        const filter = input.value.trim();
        const params = new URLSearchParams(window.location.search);
        if (filter) {
          params.set("query", filter);
        } else {
          params.delete("query");
        }
        history.replaceState(null, "", "?" + params.toString());
        search(filter);
      }, 200);
    });

    const initial = new URLSearchParams(window.location.search).get("query");
    if (initial) {
      input.value = initial;
    }
    search(initial || "");
    input.focus();
  }

  function initAll() {
    document.querySelectorAll("[data-site-search]").forEach(function (root) {
      const input = root.querySelector(
        'input[type="search"], input[type="text"]'
      );
      if (!input) {
        return;
      }
      const results = document.createElement("div");
      results.id = "ssr-site";
      results.className = "search_results mt-2";
      root.after(results);
      init(root, input, results);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();