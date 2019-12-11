function parseQueryString(queryString) {
  const matches = queryString.match(new RegExp("[?&][^?&]+=[^?&]+", "g"));
  let params = {};
  if (matches !== null) {
    params = matches.reduce(function(obj, item) {
      const pairs = item.substring(1).split("=");
      obj[pairs[0]] = pairs[1];
      return obj;
    }, {});
  }
  return params;
}

const params = parseQueryString(document.location.search);

const menuExtend = document.createElement("div");
menuExtend.setAttribute("id", "menu-extend");
menuExtend.setAttribute("title", "click twice to hide this");
menuExtend.addEventListener("dblclick", function() {
  menuExtend.remove();
});

document.querySelector("#menu h1").appendChild(menuExtend);

chrome.storage.local.get("map", function(result) {
  map = result.map || {};
  const env = params.server || location.hostname;
  if (env === "0.0.0.0" || env === "127.0.0.1") {
    env = location.hostname;
  }
  const alias = map[env] || params.server || "local";
  menuExtend.innerHTML = "ADMINER - " + alias.toUpperCase();
  menuExtend.classList = "menu-extend-" + alias;
  console.log(
    "%c ADMINER - A+  %c # " + alias.toUpperCase() + " ",
    "background:#aaa;color:green;font-size:20px;border-top-left-radius: 4px; border-bottom-left-radius:4px",
    "color:red;backgroud:#CC9999;font-size:20px;background:#ccc;border-top-right-radius: 4px; border-bottom-right-radius:4px"
  );
});
