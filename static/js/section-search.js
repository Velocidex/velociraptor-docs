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
//
// Results are rendered as Hextra-style cards (same markup/classes as the
// theme's {{< card >}} shortcode, minus the parts we don't need) laid out
// in the theme's .hextra-cards grid.
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

  // Existing /tags/<slug>/ URLs (from the build-time taxonomy partial).
  // Used to link pill badges only when the target page really exists, so
  // ad-hoc data.json tags (e.g. KB "Tags: #debugging" lines) don't produce
  // dead links.  Lazily parsed: this script executes BEFORE the partial's
  // <script type="application/json"> in the DOM, so the element is only
  // available by the time pills() actually renders (post DOMContentLoaded).
  let tagSlugSet = null;
  let tagSlugSetLoaded = false;
  function getTagSlugSet() {
    if (tagSlugSetLoaded) return tagSlugSet;
    tagSlugSetLoaded = true;
    try {
      const el = document.getElementById("section-tag-slugs");
      if (!el) return null;
      tagSlugSet = new Set(JSON.parse(el.textContent || el.text || "[]"));
    } catch (e) {
      tagSlugSet = null;
    }
    return tagSlugSet;
  }

  function slugify(tag) {
    return String(tag).toLowerCase().replace(/\s+/g, "-");
  }

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

  // Tags are rendered as pill badges (same .tag-badge styling as
  // search-result chips).  A tag is hyperlinked to its /tags/... taxonomy
  // page only when that page exists (see tagSlugSet above).
  function pills(tags) {
    if (!tags || !tags.length) {
      return "";
    }
    return (
      '<div class="hx:mt-1 hx:mb-4 hx:flex hx:flex-wrap hx:gap-1 hx:px-4">' +
      tags
        .map(function (tag) {
          const href = "/tags/" + slugify(tag) + "/";
          const label = esc(tag);
          const slugSet = getTagSlugSet();
          if (slugSet && slugSet.has(href)) {
            return '<a href="' + esc(href) + '" class="tag-badge">' + label + "</a>";
          }
          return '<span class="tag-badge">' + label + "</span>";
        })
        .join("") +
      "</div>"
    );
  }

  // Mirrors the theme's card shortcode wrapper classes (see
  // layouts/_partials/shortcodes/card.html) with dark-mode border/bg
  // accents for the section index grids.
  const CARD_CLASS =
    "hextra-card hx:group hx:flex hx:flex-col hx:justify-start hx:overflow-hidden " +
    "hx:rounded-lg hx:border hx:border-gray-200 hx:text-current hx:no-underline " +
    "hx:dark:shadow-none hx:hover:shadow-gray-100 hx:dark:hover:shadow-none " +
    "hx:shadow-gray-100 hx:active:shadow-sm hx:active:shadow-gray-200 " +
    "hx:transition-all hx:duration-200 hx:hover:border-gray-300 hx:bg-transparent " +
    "hx:shadow-xs hx:dark:border-neutral-800 hx:dark:hover:border-neutral-700 " +
    "hx:dark:hover:bg-neutral-900";

  function card(link, title, metaHtml, description, extraHtml) {
    return (
      '<a href="' +
      esc(link) +
      '" class="' +
      CARD_CLASS +
      '">' +
      '<div class="hx:mt-auto">' +
      '<span class="hextra-card-icon hx:flex hx:font-semibold hx:items-start ' +
      'hx:gap-2 hx:p-4 hx:text-gray-700 hx:hover:text-gray-900 hx:dark:text-neutral-200 ' +
      'hx:dark:hover:text-neutral-50">' +
      esc(title) +
      "</span>" +
      (metaHtml
        ? '<div class="hx:px-4 hx:text-xs hx:font-normal hx:text-gray-500 hx:dark:text-gray-400">' +
          metaHtml +
          "</div>"
        : "") +
      (description
        ? '<div class="hextra-card-subtitle hx:line-clamp-3 hx:text-sm hx:font-normal ' +
          'hx:text-gray-500 hx:dark:text-gray-400 hx:px-4 hx:mb-4 hx:mt-2">' +
          esc(description) +
          "</div>"
        : "") +
      (extraHtml || "") +
      "</div></a>"
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
      rows += "<tr><td>**</td><td>Free form args</td><td></td></tr>";
    }
    return (
      '<div class="hx:mt-2 hx:mb-4 hx:overflow-x-auto hx:px-4"><table class="hx:w-full hx:text-sm">' +
      "<thead><tr><th>Arg</th><th>Description</th><th>Type</th></tr></thead><tbody>" +
      rows +
      "</tbody></table></div>"
    );
  }

  function vqlCard(item) {
    const category = item.category || "other";
    const permissions = (item.metadata && item.metadata.permissions) || "";
    const meta = [item.type || "", category]
      .filter(function (x) {
        return x;
      })
      .join(" &middot; ");
    let extra = "";
    if (permissions) {
      extra +=
        '<div class="hx:mb-2 hx:flex hx:flex-wrap hx:gap-1 hx:px-4 hx:text-xs ' +
        'hx:text-gray-500 hx:dark:text-gray-400"><span>Required permissions:</span> ' +
        permissions
          .split(",")
          .map(function (p) {
            return (
              '<span class="hx:font-medium hx:text-primary-800 hx:dark:text-primary-600">' +
              esc(p.trim()) +
              "</span>"
            );
          })
          .join(" ") +
        "</div>";
    }
    extra += argsTable(item.args, item.free_form_args);
    return card(linkFor("vql", item), item.name, meta, item.description, extra);
  }

  function genericCard(item) {
    const meta = [];
    // Author is shown with their GitHub avatar (author_avatar) and name as
    // plain text: the whole card is a single anchor, and nesting an <a> for
    // the author inside it would make browsers auto-close the outer anchor
    // and corrupt the card markup. An <img> is fine inside the anchor, and
    // the card itself links to the item, so the avatar need not be a link.
    if (item.author) {
      let author = "";
      if (item.author_avatar) {
        author +=
          '<img src="' +
          esc(item.author_avatar) +
          '" alt="" loading="lazy" width="16" height="16" ' +
          'class="hx:mr-2 hx:inline-block hx:size-4 hx:rounded-full hx:align-middle" />';
      }
      meta.push(author + esc(item.author));
    }
    if (item.date) {
      meta.push(esc(item.date));
    }
    const extra = pills(item.tags);
    return card(item.link, item.title, meta.join(" &middot; "), item.description, extra);
  }

  function render(section, items) {
    const results = document.getElementById("ssr-" + section);
    if (!results) {
      return;
    }
    if (!items.length) {
      results.innerHTML =
        '<div class="hx:text-neutral-500 hx:dark:text-neutral-400">No results available</div>';
      return;
    }
    const amount = items.length + (section === "vql" ? " elements" : " entries");
    let html =
      '<div class="hx:mb-2 hx:text-xs hx:text-gray-500 hx:dark:text-gray-400">' +
      esc(amount) +
      "</div>";
    html +=
      '<div class="hextra-cards hx:mt-4 hx:gap-4 hx:grid not-prose" style="--hextra-cards-grid-cols: 1;">';
    items.forEach(function (item) {
      html += section === "vql" ? vqlCard(item) : genericCard(item);
    });
    html += "</div>";
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
            '<div class="hx:text-neutral-500 hx:dark:text-neutral-400 hx:font-bold">Error loading search index: ' +
            esc(err.message) +
            "</div>";
        }
      });
  }

  function initWidget(section, root) {
    // The <input> is placed by the shortcode template.
    const input = root.querySelector(
      'input[type="search"], input[type="text"]'
    );
    if (!input) {
      return;
    }
    input.placeholder = PROMPTS[section] || "Search";
    input.setAttribute("aria-label", input.placeholder);

    const results = document.createElement("div");
    results.id = "ssr-" + section;
    results.className = "search_results hx:mt-2";
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