import $ from "jquery";

export default function idleInit() {
  var timer = 0;
  var fps = 3;
  var interval = 1000 / fps;
  $(document).ready(function () {
    // Increment the idle time counter every minute.

    // Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
      timer = 0;
    });
    $(this).keypress(function (e) {
      timer = 0;
    });
  });

  var anim = [
    [0, document.title],
    [12, "technology"],
    [14, "intelligence"],
    [16, "automation"],
  ];
  var animateEnabled = false;
  var timer;
  var originalTitle = document.title;
  document.addEventListener("visibilitychange", function (event) {
    if (document.hidden) {
      timer = setTimeout(function () {
        animateEnabled = true;
      }, 1000 * 60 * 15);
    } else {
      animateEnabled = false;
      document.title = originalTitle;
      clearTimeout(timer);
    }
  });
  var anim = ["technology", "intelligence", "automation", "enda"];
  var anim = "••••••••••••••" + originalTitle;
  var frame = 0;
  setInterval(function () {
    if (animateEnabled) {
      document.title = anim.slice(frame++);
      if (frame >= anim.length) {
        frame = 0;
      }
    }
  }, 200);
}
