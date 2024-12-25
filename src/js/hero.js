import $ from "jquery";

export default function initHero() {
  var HERO_DURATION = 5000;
  var timer = null;

  function startHeroCarousel() {
    //$('.banner-container div.fill')
    //.animate({'width': '100%'}, HERO_DURATION);
    timer = setInterval(function () {
      nextBanner();
      $(".banner-container div.fill").toggleClass("animate");
      //.animate({'width': '0%'}, 400)
      //.animate({'width': '100%'}, HERO_DURATION - 400);
    }, HERO_DURATION);
  }
  function stopHeroCarousel() {
    $(".banner-container div.fill").hide();
    clearInterval(timer);
  }
  startHeroCarousel();
  $(window).keyup(function (e) {
    if (e.which === 37) {
      prevBanner();
      stopHeroCarousel();
    } else if (e.which === 39) {
      nextBanner();
      stopHeroCarousel();
    }
  });

  var touchStartX = 0;
  var touchStartTime = 0;
  $(".banner-container a").on("touchstart", function (e) {
    touchStartX = e.originalEvent.pageX;
    touchStartTime = Date.now();
    stopHeroCarousel();
  });

  $(".banner-container a").on("touchend", function (e) {
    var elapsed = Date.now() - touchStartTime;
    var diff = touchStartX - e.originalEvent.pageX;
    if (elapsed < 1000) {
      if (diff < -30) {
        // console.log('swipe right');
        prevBanner();
      } else if (diff > 30) {
        // console.log('swipe left');
        nextBanner();
      } else {
        startHeroCarousel();
      }
    } else {
      startHeroCarousel();
    }
  });

  $(".banner-container > .nav > button").click(function (e) {
    stopHeroCarousel();
    e.preventDefault();
    setBanner($(this).index());
  });

  function currentBanner() {
    return $(".banner-container > .nav > button.active").index();
  }

  function nextBanner() {
    setBanner(currentBanner() + 1);
  }

  function prevBanner() {
    setBanner(currentBanner() - 1);
  }

  function setBanner(i) {
    var totalBanners = $(".banner-container .banner").length;
    if (i < 0) {
      i = totalBanners - 1;
    } else if (i >= totalBanners) {
      i = 0;
    }
    $(".banner-container > .nav > button")
      .eq(i)
      .addClass("active")
      .siblings()
      .removeClass("active");
    $(".banner-container > div")
      .eq(i)
      .addClass("active")
      .siblings()
      .removeClass("active");

    $(".banner-container .banner")
      .eq(0)
      .css("margin-left", "-" + i * 100 + "%");
  }
}

window.scripts = window.scripts || [];
window.scripts.push(initHero);
