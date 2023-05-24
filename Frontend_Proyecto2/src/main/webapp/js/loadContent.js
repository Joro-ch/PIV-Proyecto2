function loadHTMLContent(file, containerId) {
    $.get(file, function(data) {
        $("#" + containerId).html(data);
    });
}

loadHTMLContent("Header.html", "header");
loadHTMLContent("Footer.html", "footer");


$(document).ready(function() {
  var headElements = 'Head.html';
  $.get(headElements, function(data) {
    $('head').append(data);
  });
});

