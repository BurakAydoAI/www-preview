import $ from "jquery";

function initFAQ() {
  $(".question").click(function () {
    $(this).next().slideToggle();
  });
}

window.scripts = window.scripts || [];
window.scripts.push(initFAQ);
