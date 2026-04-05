// The default value - this is set in the site config file and updated
// by the search.html partial.
let searchUrl = "https://search.velociraptor-docs.org/query";
let searchInitialized = false;

function setParamsToHistory(params) {
  let state = window.history.state || {};
  let location = new URL(window.location);
  location.search = "?" + params.toString();
  window.history.replaceState(state, null, location);
}

function expandNode() {
    let node = $(this);

    node.parents("li.dd-item").each(function() {
        let parent = $(this);
        let closed = parent.find("> div > i.fa-angle-right");
        if (closed) {
            closed.toggleClass("fa-angle-right fa-angle-down");
            parent.find("> ul").show();
        }
    });
}

// Decorate all links with click() handlers. Safe to call multiple
// times.
function decorateLinks(nodes) {
    if(!nodes) {
        // Do not redirect the TableOfContents because it messes
        // up the tooltip overlay.
        $("#TableOfContents a").addClass("redirected");

        nodes = $("section#body a:not(.redirected),#header a:not(.redirected)");
    };

    nodes.each(function() {
        let node = $(this);
        if(node.attr("href")) {
            node.click(function(e) {
                let target = $(this).attr("href");
                return navigateTo(target);
            }).addClass("redirected");
        };
    });

    installFigureHandlers();
    decorateAnchors();
}

function decorateAnchors() {
    // Add link button for every header
    var text, clip = new ClipboardJS('.anchor');
    $("section#body h1~h2,h1~h3,h1~h4,h1~h5,h1~h6").append(function(index, html){
        var element = $(this);
        var url = encodeURI(document.location.origin + document.location.pathname);
        var link = url + "#"+element[0].id;
        return " <span class='anchor' data-clipboard-text='"+link+"'>" +
            "<i class='fas fa-link fa-lg'></i>" +
            "</span>"
        ;
    });

    $(".anchor").on('mouseleave', function(e) {
        $(this).attr('aria-label', null).removeClass('tooltipped tooltipped-s tooltipped-w');
    });

    clip.on('success', function(e) {
        e.clearSelection();
        $(e.trigger).attr('aria-label', 'Link copied to clipboard!').addClass('tooltipped tooltipped-s');
    });

}



function copyDom(id, new_dom) {
    let part = $(new_dom).find(id);
    let existing = $(id);
    if(existing.length && part.length) {
        existing.replaceWith(part);
    }
}

function setActiveMenu(bare_link) {
   let menu = $(".sidemenu");
    menu.find("li.active").removeClass("active");

    let active_node = menu.find("li[linkTo='" + bare_link + "']").
        addClass("active");

    // Expand the parents of the active node
    active_node.each(expandNode);
}

function insertHTML(html, target, opts) {
    let body = jQuery.parseHTML(html);
    jQuery.each(body, function(idx, x) {
        if(x.id == "body") {
            // Now mutate the dom.
            copyDom("#TableOfContents", x);
            copyDom("span.links", x);
            copyDom("#body-inner", x);
            copyDom("#head-tags", x);

            // Do this when the dom has finished rendering.
            if(opts.scroll) {
                restoreScroll(opts.scroll);

            } else if(opts.hash) {
                // There is a hash in the url - scroll the
                // ID into view.
                scrollToHash(opts.hash);

            } else {
                // Scroll the top into view
                $("body").each(function() {
                    $(this)[0].scrollIntoView();
                });
            }

            // Do not push history on popstate as it will clear
            // the forward history. We need to wait for the page to settle down.
            if(!opts.popstate && !opts.scroll &&
               target != window.location.pathname) {
                window.history.pushState({
                    scroll: window.scrollY,
                }, null, target);
            }

            decorateLinks();
        }
    });

    $("#top-bar").removeClass("hidden");
    $("#body-inner").removeClass("loading");

    // Execute any scripts in the new page
    var dom = $(html);
    dom.filter('section').each(function(){
        $(this).find("script").each(function() {
            $.globalEval(this.text);
        });
    });

    $("#body-inner").removeClass("loading");
    hljs.highlightAll();
}

const ignoreExtentions = new RegExp(/(png|svg)$/i);

function navigateTo(target, opts) {
    if(!opts) {
        opts = {};
    }

    let url = new URL(target, window.location.href);
    if(url.origin != window.location.origin) {
        // External URL
        return true;
    }

    // Only navigate internal links
    let bare_link = url.pathname;
    if(ignoreExtentions.test(bare_link)) {
        return true;
    }

    opts.hash = url.hash.slice(1);
    setActiveMenu(bare_link);

    if(!opts.popstate) {
        updateScroll();
    }

    $("#body-inner").addClass("loading");

    jQuery.ajax({
        url: target,
        type: "GET",
        success: function(resp, status, xhr) {
            insertHTML(resp, url.href, opts);
        },
        error: function(xhr, status, error) {
            insertHTML(xhr.responseText, url.href, opts);
        },
    });

    return false;
}


// Knowledge Base search
let all_kb_data = [];

function initKB() {
    if (!all_kb_data.length) {
        $.ajax({
            url: "/kb/data.json",
        }).done(function( data ) {
            all_kb_data = data;
            DrawResultsKB(data);
            doSearchKB();
        });
    } else {
        DrawResultsKB(all_kb_data);
        doSearchKB();
    }
    $('#myInput').focus();
}

function doSearchKB() {
  // Declare variables
  let input = document.getElementById('myInput');
  let filter = input.value;

  let params = new URLSearchParams(window.location.search);
  if(!searchInitialized) {
      filter = params.get("query") || "";
      input.value = filter;
      searchInitialized = true;
  }

  params.set("query", filter);
  setParamsToHistory(params);

  filter = filter.toUpperCase();
  let result = [];
  for(let i=0;i<all_kb_data.length; i++) {
    let item = all_kb_data[i];

    if (item.title.toUpperCase().includes(filter)) {
      result.push(item);
    }
  };
  DrawResultsKB(result);
}

function DrawResultsKB(data) {
    let node = clearSearchPane(data);

  for(let i=0;i<data.length; i++) {
    let item = data[i];
    let template = $(`
<div class="well well-sm color container-fluid">
  <div class="row">
    <div class="col-md-10">
      <div class="row">
         <div class="col-md-12">
           <a class="title" href=""><h3 class="panel-title color " ></h3></a>
         </div>
      </div>
      <div class="row">
         <div class="col-md-12 kb-tag">
           <div class="idea-tag"/>
         </div>
      </div>
    </div>
    <div class="col-md-2">
      <span class="user-name" href=""></span>
      <span class="date"></span>
      <a class="user-name-link"></a>
      <img class="user-avatar inline">
    </div>
  </div>
</div>`);

    template.find(".title").append(item.title);
    template.find(".user-name-link").append(item.author);
    template.find(".description").append(item.description);
    template.find(".user-name-link").attr("href", item.author_link);
    template.find(".user-avatar").attr("src", item.author_avatar);
    template.find(".title").attr("href", item.link);
    template.find(".date").append(item.date);

    for (let j=0; j<item.tags.length; j++) {
        let tag = item.tags[j];
        template.find(".idea-tag").
            append($(`<a class="tag">`).attr("href", "/tags/" + tag).
                   append(`<i class="linkcolour tag label label-success">` + tag + `</i>&nbsp;`));
    }
    let new_item = node.append(template);
  }

    decorateLinks();
};



let all_artifact_data = [];

function initArtifactReference() {
    if(!all_artifact_data.length) {
        $.ajax({
            url: "/artifact_reference/data.json",
        }).done(function( data ) {
            all_artifact_data = data;
            DrawResultsArtifacts(data);
            doSearchArtifacts();
        });
    } else {
        DrawResultsArtifacts(all_artifact_data);
        doSearchArtifacts();
    }
    $('#myInput').focus();
}

function doSearchArtifacts() {
  // Declare variables
  let input = document.getElementById('myInput');
  let filter = input.value;

  let params = new URLSearchParams(window.location.search);
  if(!searchInitialized) {
      filter = params.get("query") || "";
      input.value = filter;
      searchInitialized = true;
  }

  params.set("query", filter);
  setParamsToHistory(params);

  filter = filter.toUpperCase();
  let result = [];
  for(let i=0;i<all_artifact_data.length; i++) {
    let item = all_artifact_data[i];

    if (item.title.toUpperCase().includes(filter)) {
      result.push(item);
    }
  };
  DrawResultsArtifacts(result);
}

function DrawResultsArtifacts(data) {
    let node = clearSearchPane(data);

  for(let i=0;i<data.length; i++) {
    let item = data[i];
    let template = $(`<div class="panel panel-default color">
  <div class="panel-heading color">
    <a class="title" href=""><h3 class="panel-title color " ></h3></a>
    <div class="date pull-right"></div>
  </div>
  <div class="panel-body color">
   <div class="border color">
     <div class="border color">
      <div class="idea-inner-text-main color">
        <p class="description"></p>
        <p class="idea-tag space"/>
      </div>
     </div>
   </div>
  </div>`);

    template.find(".title").append(item.title);
    template.find(".description").append(item.description);
    template.find(".title").attr("href", item.link);

    for (let j=0; j<item.tags.length; j++) {
        let tag = item.tags[j];
        template.find(".idea-tag").
            append($(`<a class="tag">`).attr("href", "/tags/" + tag.toLowerCase().replace(" ","-")).
                   append(`<i class="linkcolour tag label label-success">` + tag + `</i>&nbsp;`));
    }
    let new_item = node.append(template);
  }

    decorateLinks();
};


let all_exchange_data = [];

function initExchange() {
    if(!all_exchange_data.length) {
        $.ajax({
            url: "/exchange/data.json",
        }).done(function( data ) {
            all_exchange_data = data;
            DrawResultsExchange(all_exchange_data);
            doSearchExchange();
        });
    } else {
        DrawResultsExchange(all_exchange_data);
        doSearchExchange();
    }

    $('#myInput').focus();
};

function doSearchExchange() {
  // Declare variables
  let input = document.getElementById('myInput');
  let filter = input.value;

  let params = new URLSearchParams(window.location.search);
  if(!searchInitialized) {
      filter = params.get("query") || "";
      input.value = filter;
      searchInitialized = true;
  }

  params.set("query", filter);
  setParamsToHistory(params);

   filter = filter.toUpperCase();
  let result = [];
  for(let i=0;i<all_exchange_data.length; i++) {
    let item = all_exchange_data[i];

    if (item.title.toUpperCase().includes(filter)) {
      result.push(item);
    } else if(item.description &&
              item.description.toUpperCase().includes(filter)) {
        result.push(item);
    }
  };
  DrawResultsExchange(result);
}

function DrawResultsExchange(data) {
    let node = clearSearchPane(data);

  for(let i=0;i<data.length; i++) {
    let item = data[i];
    let template = $(`<div class="panel panel-default color">
  <div class="panel-heading color">
    <a class="title" href=""><h3 class="panel-title color " ></h3></a>
    <div class="date pull-right"></div>
  </div>
  <div class="panel-body color">
   <div class="border color">
     <div class="border color">
      <div class="idea-inner-text-main color">
        <p class="description"></p>
        <span class="user-name" href="">Contributed by <a class="user-name-link"></a>
          <img class="user-avatar inline">
        </span>

        <p class="idea-tag space"/>
      </div>
     </div>
   </div>
  </div>`);

    template.find(".title").append(item.title);
    template.find(".user-name-link").append(item.author);
    template.find(".description").append(item.description);
    template.find(".user-name-link").attr("href", item.author_link);
    template.find(".user-avatar").attr("src", item.author_avatar);
    template.find(".title").attr("href", item.link);
    template.find(".date").append(item.date);

    for (let j=0; j<item.tags.length; j++) {
        let tag = item.tags[j];
        template.find(".idea-tag").
            append($(`<a class="tag">`).attr("href", "/tags/" + tag).
                   append(`<i class="linkcolour tag label label-success">` + tag + `</i>&nbsp;`));
    }
    let new_item = node.append(template);
  }

    decorateLinks();
};

let all_blog_data = [];

function initBlog() {
    if(!all_blog_data.length) {
        $.ajax({
            url: "/blog/data.json",
        }).done(function( data ) {
            all_blog_data = data;
            DrawResultsBlog(all_blog_data);
            doSearchBlog();
        });
    } else {
        DrawResultsBlog(all_blog_data);
        doSearchBlog();
    }

    $('#myInput').focus();
};

function matchItem(filter, item) {
    if (item.title.toUpperCase().includes(filter) ||
        item.description.toUpperCase().includes(filter)) {
        return true;
    }
    let labels = item.tags || [];
    for(let j=0;j<labels.length;j++) {
        if (labels[j].toUpperCase().includes(filter)) {
            return true;
        }
    }
    return false;
}

function doSearchBlog() {
  // Declare variables
  let input = document.getElementById('myInput');
  let filter = input.value;

  let params = new URLSearchParams(window.location.search);

  // Load page from URL
  if(!searchInitialized) {
      filter = params.get("query") || "";
      input.value = filter;
      searchInitialized = true;
  }

  params.set("query", filter);
  setParamsToHistory(params);

  filter = filter.toUpperCase();
  let result = [];
  for(let i=0;i<all_blog_data.length; i++) {
      let item = all_blog_data[i];
      if (matchItem(filter, item)) {
          result.push(item);
      }
  };
  DrawResultsBlog(result);
}

function DrawResultsBlog(data) {
    let node = clearSearchPane(data);

  for(let i=0;i<data.length; i++) {
    let item = data[i];
    let template = $(`<div class="panel panel-default color">
  <div class="panel-heading color">
    <a class="title" href=""><h3 class="panel-title color " ></h3></a>
    <div class="date pull-right"></div>
  </div>
  <div class="panel-body color">
    <div class="border color">
       <div class="border color">
         <div class="idea-inner-text-main color">
           <img class="user-avatar inline">
           <p class="description "></p>
           <p class="idea-tag space"></p>
         </div>
       </div>
    </div>
</div>`);

    template.find(".title").append(item.title);
    template.find(".description").append(item.description);
    template.find(".title").attr("href", item.link);
      template.find(".date").append(item.date);

    for (let j=0; j<item.tags.length; j++) {
        let tag = item.tags[j];
        let link = $(`<a class="space tag"><i class="linkcolour label label-success">` +
                     tag + `</i></a>`).click(function() {
                         document.getElementById('myInput').value = tag;
                         doSearchBlog();
                     });
        template.find(".idea-tag").append(link);
    }
    let new_item = node.append(template);
  }

    decorateLinks();
};


let all_vql_data = [];

function initVQLReference() {
    if(!all_vql_data.length) {
        $.ajax({
            url: "/reference/data.json",
        }).done(function( data ) {
            all_vql_data = data;
            DrawResultsVQL(all_vql_data);
            doSearchVQL();
        });
    } else {
        DrawResultsVQL(all_vql_data);
        doSearchVQL();
    }

    $('#myInput').focus();
};

function doSearchVQL() {
  // Declare variables
  let input = document.getElementById('myInput');
  let filter = input.value;

  let params = new URLSearchParams(window.location.search);

  // Load page from URL
  if(!searchInitialized) {
      filter = params.get("query") || "";
      input.value = filter;
      searchInitialized = true;
  }

  params.set("query", filter);
  setParamsToHistory(params);

  let result = [];
  filter = filter.toUpperCase();

  for(let i=0;i<all_vql_data.length; i++) {
    let item = all_vql_data[i];

    if (item.name.toUpperCase().includes(filter)) {
      result.push(item);
    }
  };
  DrawResultsVQL(result);
}

function DrawResultsVQL(data) {
    let node = clearSearchPane(data);

  for(let i=0;i<data.length; i++) {
    let item = data[i];
    let template = $(`
<div class="panel panel-default color">
  <div class="panel-heading color">
    <a class="title link" href=""><h3 class="panel-title color " ></h3></a>
    <div class="type vql_type label label-warning pull-right"></div>
  </div>
  <div class="panel-body color">
    <div class="border color">
      <div class="border color">
        <div class="idea-inner-text-main color">
          <img class="user-avatar inline">
          <p class="description"></p>
          <p class="args"/>
        </div>
      </div>
    </div>
  </div>
</div>`);

      template.find(".title").append(item.name);
      template.find(".description").append(item.description);
      template.find(".link").attr("href", getLink(item));
      template.find(".type").append(item.type);
      template.find(".idea-tag").append(
          `<i class="linkcolour label label-info pull-right">` +
              (item.category || "other") + `</i>`);

      if (item.metadata && item.metadata.permissions) {
          let html = $(`
            <span class="vql_type">Required permissions:</span>
            <span class="permission_list linkcolour "></span>`);
          template.find(".permissions").append(html);

          for(x of item.metadata.permissions.split(",")) {
              template.find(".permission_list").append(
                  `<span class=" label label-important">` + x + `</span>`);
          };
      }

      let args = item.args || [];
      if (args.length > 0) {
          let args_template = $(`
<table>
  <thead>
   <tr>
    <th>Arg</th>
    <th>Description</th>
    <th>Type</th>
   </tr>
  </thead>
  <tbody>
  </tbody>
</table>
`);
          for(let i=0;i<item.args.length; i++) {
              let arg = item.args[i];
              let row = $(`<tr>
   <td class="name"></td>
   <td class="description"></td>
   <td class="type"></td>
   </tr>`);
              let type = arg.type;
              if (arg.repeated) {
                  type = "repeated " + type;
              }

              if (arg.required) {
                  type += " (required) ";
              }

              row.find(".name").append(arg.name);
              row.find(".description").append(arg.description);
              row.find(".type").append(type);
              args_template.find("tbody").append(row);
          };

          if(item.free_form_args) {
              args_template.find("tbody").append(`<tr>
   <td class="name">**</td>
   <td class="description">Free form args</td>
   <td class="type"></td>
   </tr>`);
          }
          template.find(".args").append(args_template);
      };

    node.append(template);
  }

    decorateLinks();
};


function doSearch() {
  // Declare variables
  let input = document.getElementById('myInput');
  let filter = input.value;
  let start_count = parseInt($("#start-count").text() || 0);

  let params = new URLSearchParams(window.location.search);

  // Load page from URL
  if(!searchInitialized) {
      filter = params.get("query") || "";
      input.value = filter;
      start_count = parseInt(params.get("start") || 0);
      $("#start-count").text(start_count);
      searchInitialized = true;
  }

  params.set("query", filter);
  params.set("start", start_count);
  setParamsToHistory(params);

  if(!filter) {
      $("#body-inner").removeClass("loading");
      return;
  }

  console.log("Searching for ", filter);
  $("#body-inner").addClass("loading");

  jQuery.ajax({
      url: searchUrl,
      data: {q: filter,
             start: start_count,
             len: 50},
      type: "GET",
      success: function(resp, status, xhr) {
          DrawResultsSearch(resp.hits);

          let total_hits = "";
          if(resp.total_hits) {
              total_hits = "Total " + resp.total_hits;
          }

          // Store the total hits in this dom
          $("#page-count").text(total_hits).
              data("total_hits", resp.total_hits);

          $("#body-inner").removeClass("loading");

          let start_count = parseInt($("#start-count").text() || 0);
          if(start_count > resp.total_hits) {
              $("#start-count").text(0);
          }
      },
      error: function(xhr, status, error) {
          let node = clearSearchPane();

          let resp_text = xhr.responseText || '';
          let error_message = "Error connecting to search server "+resp_text;

          node.append($('<div class="error">').text(error_message));
          $("#body-inner").removeClass("loading");
      },
  });
}

function SearchPageForward() {
    let page_count = parseInt(
        $("#page-count").data("total_hits") || 0);
    let start_count = parseInt($("#start-count").text() || 0);

    let next = start_count + 50;
    if(next>page_count) {
        return;
    }

    $("#start-count").text(next);
    doSearchDelay();
}

function SearchPageBack() {
    let start_count = parseInt($("#start-count").text() || 0);
    if(start_count == 0) {
        return;
    }
    let prev = start_count - 50;
    if(prev < 0) {
        prev = 0;
    }

    $("#start-count").text(prev);
    doSearchDelay();
}

function DrawResultsSearch(data) {
    let node = clearSearchPane(data);

  for(let i=0;i<data.length; i++) {
    let hit = data[i];
    let item = hit.fields;
    let template = $(`<div class="panel panel-default color">
  <div class="panel-heading color">
    <div class="search-breadcrumb"></div>
    <a class="title" href=""><h3 class="panel-title color " ></h3></a>
    <div class="date pull-right"></div>
  </div>
  <div class="panel-body color">
    <div class="border color">
       <div class="border color">
         <div class="idea-inner-text-main color">
           <div class="description "></div>
           <p class="idea-tag space"></p>
         </div>
       </div>
    </div>
</div>`);

    template.find(".title").append(item.title);
    let desc = template.find(".description");
    $.each(hit.fragments.text, function(idx, x) {
        let newp = $("<p>").html(jQuery.parseHTML(x));
        desc.append(newp);
    });

    // Rebase the URL to the current site location.
    let url = new URL(item.url);
    let base = new URL(window.location);
    base.search = "";
    base.pathname = url.pathname;

    template.find(".title").attr("href", base.toString());
    template.find(".date").append(item.date);

    let breadcrumbs_div = template.find(".search-breadcrumb");
    try {
        let breadcrumbs = JSON.parse(item.crumbs);
        $.each(breadcrumbs, function(idx, x) {
            let new_a = $("<a>");
            let suffix = " /";
            if (idx == breadcrumbs.length-1) {
                suffix = "";
            }
            new_a.attr("href", x.url).text(x.name + suffix);
            breadcrumbs_div.append(new_a);
        });
    } catch(e) {
        console.log(e);
    }
    let tags = item.tags;
    if(typeof tags === 'string') {
        tags = [tags];
    }
    for (let j=0; j<tags.length; j++) {
        let tag = tags[j];
        let link = $(`
<a class="space tag">
<i class="linkcolour label label-success">
</i></a>`);
        link.find("i").text(tag);
        link.click(function() {
            document.getElementById('myInput').value += " +tags:" + tag;
            doSearchDelay();
            return false;
        });
        template.find(".idea-tag").append(link);
    }
    let new_item = node.append(template);
  }

    decorateLinks();
};


function initSearch() {
    doSearch();
}

function getLink(item) {
    if (item.category) {
        return "/vql_reference/" + item.category + "/" + item.name + "/";
    }
    return "/vql_reference/other/" + item.name + "/";
}


$(window).bind('popstate', function(event) {
    let target = event.currentTarget.location.pathname;
    let state = history.state || {};
    let original_scroll = state.scroll || 0;

    // Navigating to state is just like loading a new page, reinit the
    // search
    searchInitialized = false;
    navigateTo(target, {scroll: original_scroll, popstate: true});
    return false;
});

let blockUpdate = false;

function updateScroll() {
    if(!blockUpdate) {
        // Only update if necessary
        let current_scroll = window.scrollY;
        let state_scroll = window.history.state &&
            window.history.state.scroll;
        if(current_scroll != state_scroll) {
            window.history.replaceState({
                scroll: current_scroll,
            }, null, window.location);
        }
    }
};

function scrollToHash(hash) {
    if(!blockUpdate) {
        blockUpdate = true;
        for(let i=0; i<50; i+=50) {
            setTimeout(function() {
                $("#" + $.escapeSelector(hash)).each(function() {
                    $(this)[0].scrollIntoView();
                });
            }, i);
        };

        setTimeout(function() {
            blockUpdate = false;
        }, 500);
    };
}

let scrollRestoreActive = false;


// Due to reflow the initial scroll position may not be correct. Keep
// trying to reset the scroll position for some time to allow the page
// to reflow into position.
function restoreScroll(scroll) {
    let end = 2000;

    if(!blockUpdate) {
        blockUpdate = true;
        scrollRestoreActive = true;

        for(let i=0; i<end; i+=50) {
            setTimeout(function() {
                if(scrollRestoreActive && scroll != window.scrollY) {
                    window.scrollTo(0, scroll);
                }
            }, i);
        };

        setTimeout(function() {
            blockUpdate = false;
        }, end);
    };
}

// When the user starts to manually scroll, abort the restoreScroll() function.
$(window).on("scroll", function() {
    scrollRestoreActive = false;
});


// Constantly update the scroll state so going back and forth
// replicates the state of the page at that time.
window.setInterval(updateScroll, 1000);

function installFigureHandlers() {
    $("div.figure").on("click", function() {
        let new_node = $(`
<div class="featherlight modal"
  style="display: block;">
<div class="featherlight-content">
<button class="featherlight-close-icon featherlight-close"
   aria-label="Close">✕</button>
<figure class="featherlight-inner">
<div class="figure">
  <img>
</div>
<figcaption>
<a class="image-link" target="_blank" rel="noopener noreferrer" href="attack_timeline.svg" tabindex="-1">
<i class="fa fa-download"></i>
</a>
</figcaption></figure></div></div>`);
        new_node.on("click", function() {
            $(".modal").remove();
            return false;
        });

        let img = $(this).find("img");
        new_node.find("img").
            attr("src", img.attr("src")).
            attr("alt", img.attr("alt"));

        new_node.find("figcaption").append(img.attr("alt"));

        $("body").append(new_node);
        return false;
    });
}

/*!
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery throttle / debounce: Sometimes, less is more!
//
// *Version: 1.1, Last updated: 3/7/2010*
//
// Project Home - http://benalman.com/projects/jquery-throttle-debounce-plugin/
// GitHub       - http://github.com/cowboy/jquery-throttle-debounce/
// Source       - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.js
// (Minified)   - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.min.js (0.7kb)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
//
// Throttle - http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
// Debounce - http://benalman.com/code/projects/jquery-throttle-debounce/examples/debounce/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
//
// jQuery Versions - none, 1.3.2, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome 4-5, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-throttle-debounce/unit/
//
// About: Release History
//
// 1.1 - (3/7/2010) Fixed a bug in <jQuery.throttle> where trailing callbacks
//       executed later than they should. Reworked a fair amount of internal
//       logic as well.
// 1.0 - (3/6/2010) Initial release as a stand-alone project. Migrated over
//       from jquery-misc repo v0.4 to jquery-throttle repo v1.0, added the
//       no_trailing throttle parameter and debounce functionality.
//
// Topic: Note for non-jQuery users
//
// jQuery isn't actually required for this plugin, because nothing internal
// uses any jQuery methods or properties. jQuery is just used as a namespace
// under which these methods can exist.
//
// Since jQuery isn't actually required for this plugin, if jQuery doesn't exist
// when this plugin is loaded, the method described below will be created in
// the `Cowboy` namespace. Usage will be exactly the same, but instead of
// $.method() or jQuery.method(), you'll need to use Cowboy.method().

(function(window,undefined){
  '$:nomunge'; // Used by YUI compressor.

  // Since jQuery really isn't required for this plugin, use `jQuery` as the
  // namespace only if it already exists, otherwise use the `Cowboy` namespace,
  // creating it if necessary.
  var $ = window.jQuery || window.Cowboy || ( window.Cowboy = {} ),

    // Internal method reference.
    jq_throttle;

  // Method: jQuery.throttle
  //
  // Throttle execution of a function. Especially useful for rate limiting
  // execution of handlers on events like resize and scroll. If you want to
  // rate-limit execution of a function to a single time, see the
  // <jQuery.debounce> method.
  //
  // In this visualization, | is a throttled-function call and X is the actual
  // callback execution:
  //
  // > Throttled with `no_trailing` specified as false or unspecified:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X    X    X    X    X    X        X    X    X    X    X    X
  // >
  // > Throttled with `no_trailing` specified as true:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X    X    X    X    X             X    X    X    X    X
  //
  // Usage:
  //
  // > var throttled = jQuery.throttle( delay, [ no_trailing, ] callback );
  // >
  // > jQuery('selector').bind( 'someevent', throttled );
  // > jQuery('selector').unbind( 'someevent', throttled );
  //
  // This also works in jQuery 1.4+:
  //
  // > jQuery('selector').bind( 'someevent', jQuery.throttle( delay, [ no_trailing, ] callback ) );
  // > jQuery('selector').unbind( 'someevent', callback );
  //
  // Arguments:
  //
  //  delay - (Number) A zero-or-greater delay in milliseconds. For event
  //    callbacks, values around 100 or 250 (or even higher) are most useful.
  //  no_trailing - (Boolean) Optional, defaults to false. If no_trailing is
  //    true, callback will only execute every `delay` milliseconds while the
  //    throttled-function is being called. If no_trailing is false or
  //    unspecified, callback will be executed one final time after the last
  //    throttled-function call. (After the throttled-function has not been
  //    called for `delay` milliseconds, the internal counter is reset)
  //  callback - (Function) A function to be executed after delay milliseconds.
  //    The `this` context and all arguments are passed through, as-is, to
  //    `callback` when the throttled-function is executed.
  //
  // Returns:
  //
  //  (Function) A new, throttled, function.

  $.throttle = jq_throttle = function( delay, no_trailing, callback, debounce_mode ) {
    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeout_id,

      // Keep track of the last time `callback` was executed.
      last_exec = 0;

    // `no_trailing` defaults to falsy.
    if ( typeof no_trailing !== 'boolean' ) {
      debounce_mode = callback;
      callback = no_trailing;
      no_trailing = undefined;
    }

    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper() {

      var that = this,
        elapsed = +new Date() - last_exec,
        args = arguments;

      // Execute `callback` and update the `last_exec` timestamp.
      function exec() {
        last_exec = +new Date();
        callback.apply( that, args );
      };

      // If `debounce_mode` is true (at_begin) this is used to clear the flag
      // to allow future `callback` executions.
      function clear() {
        timeout_id = undefined;
      };

      if ( debounce_mode && !timeout_id ) {
        // Since `wrapper` is being called for the first time and
        // `debounce_mode` is true (at_begin), execute `callback`.
        exec();
      }

      // Clear any existing timeout.
      timeout_id && clearTimeout( timeout_id );

      if ( debounce_mode === undefined && elapsed > delay ) {
        // In throttle mode, if `delay` time has been exceeded, execute
        // `callback`.
        exec();

      } else if ( no_trailing !== true ) {
        // In trailing throttle mode, since `delay` time has not been
        // exceeded, schedule `callback` to execute `delay` ms after most
        // recent execution.
        //
        // If `debounce_mode` is true (at_begin), schedule `clear` to execute
        // after `delay` ms.
        //
        // If `debounce_mode` is false (at end), schedule `callback` to
        // execute after `delay` ms.
        timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
      }
    };

    // Set the guid of `wrapper` function to the same of original callback, so
    // it can be removed in jQuery 1.4+ .unbind or .die by using the original
    // callback as a reference.
    if ( $.guid ) {
      wrapper.guid = callback.guid = callback.guid || $.guid++;
    }

    // Return the wrapper function.
    return wrapper;
  };

  // Method: jQuery.debounce
  //
  // Debounce execution of a function. Debouncing, unlike throttling,
  // guarantees that a function is only executed a single time, either at the
  // very beginning of a series of calls, or at the very end. If you want to
  // simply rate-limit execution of a function, see the <jQuery.throttle>
  // method.
  //
  // In this visualization, | is a debounced-function call and X is the actual
  // callback execution:
  //
  // > Debounced with `at_begin` specified as false or unspecified:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // >                          X                                 X
  // >
  // > Debounced with `at_begin` specified as true:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X                                 X
  //
  // Usage:
  //
  // > var debounced = jQuery.debounce( delay, [ at_begin, ] callback );
  // >
  // > jQuery('selector').bind( 'someevent', debounced );
  // > jQuery('selector').unbind( 'someevent', debounced );
  //
  // This also works in jQuery 1.4+:
  //
  // > jQuery('selector').bind( 'someevent', jQuery.debounce( delay, [ at_begin, ] callback ) );
  // > jQuery('selector').unbind( 'someevent', callback );
  //
  // Arguments:
  //
  //  delay - (Number) A zero-or-greater delay in milliseconds. For event
  //    callbacks, values around 100 or 250 (or even higher) are most useful.
  //  at_begin - (Boolean) Optional, defaults to false. If at_begin is false or
  //    unspecified, callback will only be executed `delay` milliseconds after
  //    the last debounced-function call. If at_begin is true, callback will be
  //    executed only at the first debounced-function call. (After the
  //    throttled-function has not been called for `delay` milliseconds, the
  //    internal counter is reset)
  //  callback - (Function) A function to be executed after delay milliseconds.
  //    The `this` context and all arguments are passed through, as-is, to
  //    `callback` when the debounced-function is executed.
  //
  // Returns:
  //
  //  (Function) A new, debounced, function.

  $.debounce = function( delay, at_begin, callback ) {
    return callback === undefined
      ? jq_throttle( delay, at_begin, false )
      : jq_throttle( delay, callback, at_begin !== false );
  };

})(this);

const _doSearchDelay = $.debounce(500, false, doSearch);

function clearSearchPane(data) {
    let node = $(".search_results");
    node.empty();
    if (!data || !data.length) {
        node.text("No results available");
    }
    return node;
};


function doSearchDelay() {
    $("#body-inner").addClass("loading");
    clearSearchPane();

    _doSearchDelay();
};


function searchShortcutMust(value) {
    let input = document.getElementById('myInput');
    let filter = input.value;

    let terms = filter.split(" ");
    filter = $.map(terms, function(x, idx){
        if(!x.startsWith("+")) {
            return "+" + x;
        }
        return x;
    });
    input.value = filter.join(" ");
    doSearch();
}

function searchShortcutTag(value) {
    let input = document.getElementById('myInput');
    let filter = input.value;

    let term = " +tags:" + value;
    if(filter.includes(term)) {
        filter = filter.replace(term, "");
    } else {
        filter += term;
    }

    input.value = filter;
    doSearch();
}
