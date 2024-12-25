import $ from "jquery";

function initSupport() {
  $("#product-search").on(click, function (e) {
    e.preventDefault();
    if ($(window).width() >= 768) {
      $("input#search").trigger("focus");
    } else {
      $("a.menu").trigger("click");
      $('inp[data-go-to="search"]').trigger("click");
    }
  });
}

window.WScript = window.WScript || [];
window.WScript.push(initSupport);
