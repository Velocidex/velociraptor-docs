// Self-contained section search widgets for the Velociraptor docs site.
// Replaces the old jQuery/Bootstrap/theme.js search boxes. Each widget
// reads its pre-built static JSON index and filters client side.
//
// Usage (see the shortcode templates):
//   <div class="search-box" data-section-search="vql">
//     <input type="search" ...>
//   </div>
//   <div class="search_results"></div>
//   <script src="/js/section-search.js"></script>
//
// Supported sections: vql, artifact_reference, exchange, kb, blog.
(function () {
  "use strict";

  const DATA_URLS = {
    vql: "/reference/data.json",
    artifact_reference: "/artifact_reference/data.json",
    exchange: "/exchange/data.json",
    kb: "/kb/data.json",
    blog: "/blog/data.json",
  };

  const PROMPTS = {
    vql: "Search for VQL plugins, functions, or accessors",
    artifact_reference: "Search for an artifact",
    exchange: "Search for an exchange artifact",
    kb: "Search the knowledge base",
    blog: "Search blog posts",
  };

  const dataCache = {};

  function esc(value) {
    return String(value == null ? "" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function fetchData(section) {
    const url = DATA_URLS[section];
    if (dataCache[url]) {
      return Promise.resolve(dataCache[url]);
    }
    return fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("HTTP " + resp.status);
        }
        return resp.json();
      })
      .then((data) => {
        dataCache[url] = data;
        return data;
      });
  }

  // Generic matches used by most sections.
  function includesField(value, filter) {
    return (value || "").toUpperCase().includes(filter);
  }

  function matches(section, item, filter) {
    switch (section) {
      case "vql":
        return includesField(item.name, filter);
      case "artifact_reference":
        return includesField(item.title, filter);
      case "exchange":
        return (
          includesField(item.title, filter) ||
          includesField(item.description, filter)
        );
      case "kb":
        return includesField(item.title, filter);
      case "blog":
        return (
          includesField(item.title, filter) ||
          includesField(item.description, filter) ||
          (item.tags || []).some((t) => includesField(t, filter))
        );
      default:
        return true;
    }
  }

  function linkFor(section, item) {
    if (section === "vql") {
      const name = (item.name || "").toLowerCase();
      if (item.category) {
        return "/vql_reference/" + item.category + "/" + name + "/";
      }
      return "/vql_reference/other/" + name + "/";
    }
    return item.link;
  }

  function pills(tags) {
    if (!tags || !tags.length) {
      return "";
    }
    return (
      '<div class="mt-1 flex flex-wrap gap-1">' +
      tags
        .map(function (tag) {
          const slug = String(tag)
            .toLowerCase()
            .replaceAll(" ", "-");
          return (
            '<a href="/tags/' + esc(slug) + '" class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">' +
            esc(tag) +
            "</a>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function argsTable(args, freeFormArgs) {
    if (!args || !args.length) {
      return "";
    }
    let rows = "";
    args.forEach(function (arg) {
      let type = arg.type || "";
      if (arg.repeated) {
        type = "repeated " + type;
      }
      if (arg.required) {
        type += " (required)";
      }
      rows +=
        "<tr><td>" +
        esc(arg.name) +
        "</td><td>" +
        esc(arg.description) +
        "</td><td>" +
        esc(type) +
        "</td></tr>";
    });
    if (freeFormArgs) {
      rows +=
        "<tr><td>**</td><td>Free form args</td><td></td></tr>";
    }
    return (
      '<div class="mt-2 overflow-x-auto"><table class="text-sm"><thead><tr><th>Arg</th><th>Description</th><th>Type</th></tr></thead><tbody>' +
      rows +
      "</tbody></table></div>"
    );
  }

  function vqlCard(item) {
    const category = item.category || "other";
    const permissions = (item.metadata && item.metadata.permissions) || "";
    return (
      '<div class="mb-2">' +
      '<a href="' +
      esc(linkFor("vql", item)) +
      '" class="block rounded-md bg-neutral-100 px-3 py-2 hover:bg-primary-100 dark:bg-neutral-700 dark:hover:bg-primary-900">' +
      '<div class="grow"><div class="-mb-1 text-lg font-bold">' +
      esc(item.name) +
      "</div>" +
      '<div class="text-sm text-neutral-500 dark:text-neutral-400">' +
      esc(item.type || "") +
      (category ? " &middot; " + esc(category) : "") +
      "</div>" +
      (item.description
        ? '<div class="text-sm italic">' + esc(item.description) + "</div>"
        : "") +
      (permissions
        ? '<div class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Required permissions: ' +
          permissions
            .split(",")
            .map(function (p) {
              return (
                '<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">' +
                esc(p.trim()) +
                "</span>"
              );
            })
            .join(" ") +
          "</div>"
        : "") +
      argsTable(item.args, item.free_form_args) +
      "</div></a></div>"
    );
  }

  function genericCard(item) {
    const meta = [];
    if (item.author && item.author_link) {
      meta.push(
        '<a href="' +
          esc(item.author_link) +
          '" class="underline">' +
          esc(item.author) +
          "</a>"
      );
    } else if (item.author) {
      meta.push(esc(item.author));
    }
    if (item.date) {
      meta.push(esc(item.date));
    }
    return (
      '<div class="mb-2">' +
      '<a href="' +
      esc(item.link) +
      '" class="block rounded-md bg-neutral-100 px-3 py-2 hover:bg-primary-100 dark:bg-neutral-700 dark:hover:bg-primary-900">' +
      '<div class="grow"><div class="-mb-1 text-lg font-bold">' +
      esc(item.title) +
      "</div>" +
      (meta.length
        ? '<div class="text-sm text-neutral-500 dark:text-neutral-400">' +
          meta.join(" &middot; ") +
          "</div>"
        : "") +
      (item.description
        ? '<div class="text-sm italic">' + esc(item.description) + "</div>"
        : "") +
      pills(item.tags) +
      "</div></a></div>"
    );
  }

  function render(section, items) {
    const results = document.getElementById("ssr-" + section);
    if (!results) {
      return;
    }
    if (!items.length) {
      results.innerHTML = '<div class="text-neutral-500 dark:text-neutral-400">No results available</div>';
      return;
    }
    let html = "";
    items.forEach(function (item) {
      html += section === "vql" ? vqlCard(item) : genericCard(item);
    });
    results.innerHTML = html;
  }

  function doSearch(section, input) {
    const filter = input.value.trim();
    const params = new URLSearchParams(window.location.search);
    if (filter) {
      params.set("query", filter);
    } else {
      params.delete("query");
    }
    history.replaceState(null, "", "?" + params.toString());

    fetchData(section)
      .then(function (data) {
        const upper = filter.toUpperCase();
        const results = data.filter(function (item) {
          return matches(section, item, upper);
        });
        render(section, results);
      })
      .catch(function (err) {
        console.error("Section search failed for " + section, err);
        const results = document.getElementById("ssr-" + section);
        if (results) {
          results.innerHTML =
            '<div class="text-neutral-500 dark:text-neutral-400 font-bold">Error loading search index: ' +
            esc(err.message) +
            "</div>";
        }
      });
  }

  function initWidget(section, root) {
    // The <input> is placed by the shortcode template.
    const input = root.querySelector('input[type="search"], input[type="text"]');
    if (!input) {
      return;
    }
    input.placeholder = PROMPTS[section] || "Search";
    input.setAttribute("aria-label", input.placeholder);

    const results = document.createElement("div");
    results.id = "ssr-" + section;
    results.className = "search_results mt-2";
    root.after(results);

    let timer = 0;
    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        doSearch(section, input);
      }, 200);
    });

    // Restore query from the URL, e.g. ?query=foo.
    const initial = new URLSearchParams(window.location.search).get("query");
    if (initial) {
      input.value = initial;
    }
    doSearch(section, input);
    input.focus();
  }

  function initAll() {
    document
      .querySelectorAll("[data-section-search]")
      .forEach(function (root) {
        initWidget(root.getAttribute("data-section-search"), root);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();