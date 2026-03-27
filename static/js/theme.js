
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

        nodes = $("section#body a:not(.redirected)");
    };

    nodes.each(function() {
        $(this).click(function(e) {
            let target = $(this).attr("href");
            return navigateTo(target);
        }).addClass("redirected");
    });

    installFigureHandlers();
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
                // console.log("Saving scroll " + target + " " + window.scrollY);
                window.history.pushState({
                    scroll: window.scrollY,
                }, null, target);
            }

            decorateLinks();

        }
    });

    var dom = $(html);
    dom.filter('section').each(function(){
        $(this).find("script").each(function() {
            $.globalEval(this.text);
        });
    });

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
        });
    } else {
        DrawResultsKB(all_kb_data);
    }
    $('#myInput').focus();
}

function doSearchKB() {
  // Declare variables
  let input = document.getElementById('myInput');
  let filter = input.value.toUpperCase();

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
    let node = $(".search_results");

    node.empty();

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
        });
    } else {
        DrawResultsArtifacts(all_artifact_data);
    }
    $('#myInput').focus();
}

function doSearchArtifacts() {
  // Declare variables
  let input = document.getElementById('myInput');
  let filter = input.value.toUpperCase();

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
    let node = $(".search_results");
    node.empty();

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
        });
    } else {
        DrawResultsExchange(all_exchange_data);
    }

    $('#myInput').focus();
};

function doSearchExchange() {
  // Declare variables
  let input = document.getElementById('myInput');
  let filter = input.value.toUpperCase();

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
    let node = $(".search_results");
        node.empty();

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
        });
    } else {
        DrawResultsBlog(all_blog_data);
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
  let filter = input.value.toUpperCase();

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
    let node = $(".search_results");
    node.empty();

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
        });
    } else {
        DrawResultsVQL(all_vql_data);
    }

    $('#myInput').focus();
};

function doSearchVQL() {
  // Declare variables
  let input = document.getElementById('myInput');
  let filter = input.value.toUpperCase();

  let result = [];
  for(let i=0;i<all_vql_data.length; i++) {
    let item = all_vql_data[i];

    if (item.name.toUpperCase().includes(filter)) {
      result.push(item);
    }
  };
  DrawResultsVQL(result);
}

function DrawResultsVQL(data) {
    let node =  $(".search_results");
    node.empty();

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

function getLink(item) {
    if (item.category) {
        return "/vql_reference/" + item.category + "/" + item.name;
    }
    return "/vql_reference/other/" + item.name;
}


$(window).bind('popstate', function(event) {
    let target = event.currentTarget.location.pathname;
    let original_scroll = history.state.scroll || 0;
    navigateTo(target, {scroll: original_scroll, popstate: true});
    return false;
});

let blockUpdate = false;

function updateScroll() {
    //console.log("Update scroll " + window.location + " " + window.scrollY);
    if(!blockUpdate) {
        window.history.replaceState({
            scroll: window.scrollY,
        }, null, window.location);
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

function restoreScroll(scroll) {
    // console.log("Restoring scroll " + target + " " + opts.scroll);
    if(!blockUpdate) {
        blockUpdate = true;
        for(let i=0; i<50; i+=50) {
            setTimeout(function() {
                window.scrollTo(0, scroll);
            }, i);
        };

        setTimeout(function() {
            blockUpdate = false;
        }, 500);
    };
}

// Constantly update the scroll state so going back and forth
// replicates the state of the page at that time.
window.setInterval(updateScroll, 2000);

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
