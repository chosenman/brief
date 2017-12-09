var getLocation = function(href){
  var l = document.createElement("a");
  l.href = href;
  return l;
}

// USAGE
// var curUrl = getLocation(window.location.href);
// window.location= curUrl.hostname;
