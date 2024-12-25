function initAnim() {
  const cnvElm = document.getElementById("canvas-bg");
  const ctx = cnvElm.getContext("2d");
  ctx.filter = 'blur(10px)';
  ctx.width = cnvElm.width;
  ctx.height = cnvElm.height;

  var x = 0;
  var y = 0;

  var step = 0.2;

  function RandomPosition(x, y, max, freq, speed) {
    var direction = 1;
    var directionCounter = 0;
    var offsetX = 0;
    var offsetY = 0;
    speed = speed || 1;
    function get() {
      if (max === 0) { return { x: x, y: y }; }
      // console.log(offsetX, offsetY);
      if (directionCounter++ % freq === 0) {
        direction = Math.random() * Math.PI * 2;
      }
      var rnd = Math.cos(direction) * Math.random() / (100 / speed);
      offsetX += rnd;
      if (offsetX > max) {
        offsetX = max;
      }
      else if (offsetX < -max) {
        offsetX = -max;
      }
      rnd = Math.sin(direction) * Math.random() / (100 / speed);
      offsetY += rnd;
      if (offsetY > max) {
        offsetY = max;
      }
      else if (offsetY < -max) {
        offsetY = -max;
      }
      return { x: x + offsetX, y: y + offsetY };
    }
    return { get: get };
  }
  function blob(ctx, v2arr, o, colors) {
    var colorOffset = new RandomPosition(3, 0, 20, 100, 1);
    o = o || { x: 0, y: 0 };
    for (var i = 0; i < v2arr.length; i++) {
      v2arr[i].x += o.x;
      v2arr[i].y += o.y;
    }
    var morphs = [];
    var directions = [];
    for (var i = 0; i < v2arr.length; i++) {
      var p1 = v2arr[i];
      directions.push(new RandomPosition(p1.x, p1.y, 10, 200, 10));
      morphs.push(new RandomPosition(0, 0, 15, 100, 10));
    }
    var offset = new RandomPosition(0, 0, 40, 400, 2);
    colors = colors || ['#F72432', '#535572'];
    function paint() {
      ctx.beginPath();

      var co = colorOffset.get();
      var conicGradient = ctx.createConicGradient(co.x, 0, 50);
      for (var i = 0; i < colors.length; i++) {
        conicGradient.addColorStop(i / colors.length, colors[i]);
      }
      conicGradient.addColorStop(1, colors[0]);

      for (var i = 0; i < v2arr.length; i++) {
        var o = offset.get();
        // o = { x: 0, y: 0 };
        var p1 = directions[i].get();
        var p1x = p1.x + o.x;
        var p1y = p1.y + o.y;
        var p2 = directions[(i + 1) % v2arr.length].get();
        var p2x = p2.x + o.x;
        var p2y = p2.y + o.y;
        var morph = morphs[i].get();
        // ctx.bezierCurveTo(p1x - morph.x, p1y + 0, p2x - 0, p2y + morph.y, p2x, p2y);
        ctx.lineTo(p2x, p2y);
      }
      ctx.fillStyle = conicGradient;
      ctx.closePath();
      ctx.fill();
    }
    return { paint: paint };
  }
  var b1 = new blob(ctx, [
    { x: 0, y: 0 },
    { x: 20, y: -10 },
    { x: 40, y: 0 },
    { x: 50, y: 20 },
    { x: 30, y: 30 },
    { x: 10, y: 20 }], { x: 50 + Math.random() * 40 * 0, y: 30 + Math.random() * 40 * 0 }, ['#535572', '#F72432']);

  var b2 = new blob(ctx, [
    { x: 0, y: 0 },
    { x: 15, y: -10 },
    { x: 30, y: -10 },
    { x: 30, y: 0 },
    { x: 20, y: 15 },
    { x: 5, y: 15 }], { x: 150 + Math.random() * 50 * 0, y: 30 + Math.random() * 20 }, ['#F72432', '#535572']);

  function anim() {
    ctx.clearRect(0, 0, cnvElm.width, cnvElm.height);
    // ctx.bezierCurveTo(0, 0, x + 10, y * 10, 50, 50);
    ctx.fillStyle = 'rgb(' + x + ',' + y + ', 0)';
    ctx.strokeStyle = 'rgb(' + x + ',' + y + ', 0)';
    b1.paint();
    b2.paint();
    // x = (x + step) % 200;
    // y = (y + step) % 200;

    // requestAnimationFrame(anim);

    setTimeout(anim, 1000 / 2);
  }

  anim();
}

window.scripts.push(initAnim);

