import $ from "jquery";

function initHamburger() {
  $(".header .menu").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("flipV");
    $("#menu").toggleClass("menuOpen");
    $("#menu > .page > div").toggleClass("slideUp");
    $("html").toggleClass("hidescrolls");
    if ($("#menu").hasClass("menuOpen")) {
      $("#menu > .page")
        .removeClass("current prev")
        .first()
        .addClass("current");
      history.pushState("main", null, null);
      preloadNextPages();
    } else {
      // closing
      $("#menu .page").css("display", "none");
      $("#menu .page").first().css("display", "block");
    }
  });

  $("#menu").swipe({
    swipeRight: function () {
      history.back();
    },
    swipeLeft: function () {
      history.forward();
    },
    threshold: 80,
    excludedElements: "input",
  });

  function preloadNextPages() {
    $("#menu > .page.current button[data-go-to]").each(function () {
      var possibleTarget = $(this).attr("data-go-to");
      console.log(possibleTarget);
      $('#menu .page[data-menu-name="' + possibleTarget + '"]').css(
        "display",
        "block"
      );
    })
  }

  function menuGoTo(menu, dontModifyHistory) {
    var cur = $("#menu > .page.current");
    var dst = $('#menu > .page[data-menu-name="' + menu + '"]');
    if (cur.index() < dst.index()) {
      // forward
      cur.removeClass("current").addClass("prev");
      dst
        .css("display", "block")
        .addClass("current")
        .children("div")
        .addClass("slideUp noanimation");
    } else {
      // back
      cur.removeClass("current");
      dst.removeClass("prev").addClass("current");
    }
    if (dontModifyHistory !== true) {
      history.pushState(menu, null, null);
    }
    preloadNextPages();
  }

  $("#menu button, #menu a[data-go-to]").click(function () {
    var goto = $(this).attr("data-go-to");
    if (goto === "search") {
      // $('#hamburger-search').focus();
    }
    menuGoTo(goto);
  });

  $(window).on("popstate", function (e) {
    var menu = e.originalEvent.state;
    if (menu === null && $("#menu").hasClass("menuOpen")) {
      $(".header .menu").click();
      return;
    }
    menuGoTo(menu, true);
  });
}

window.scripts = window.scripts || [];
window.scripts.push(initHamburger);
