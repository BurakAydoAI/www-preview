"use strict";

import $ from "jquery";
import jQuery from "jquery";
import Cookies from "js-cookie";
import idleInit from "./idle";

import "./jquery.touchSwipe";

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  };
}

// declare global {
//   interface JQueryStatic {
//     event?: any; // You can replace `any` with a more specific type if you know what it should be
//   }
// }

function init() {
  console.log(
    [
      "███████╗███╗   ██╗██████╗  █████╗ ",
      "██╔════╝████╗  ██║██╔══██╗██╔══██╗",
      "█████╗  ██╔██╗ ██║██║  ██║███████║",
      "██╔══╝  ██║╚██╗██║██║  ██║██╔══██║",
      "███████╗██║ ╚████║██████╔╝██║  ██║",
      "╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝",
    ].join("\n")
  );
  console.log("Think you can help us? Reach out to us at jobs@enda.com");
  jQuery.event.special.touchstart = {
    setup: function (_, ns, handle) {
      this.addEventListener("touchstart", handle, {
        passive: !ns.includes("noPreventDefault"),
      });
    },
  };
  jQuery.event.special.touchmove = {
    setup: function (_, ns, handle) {
      this.addEventListener("touchmove", handle, {
        passive: !ns.includes("noPreventDefault"),
      });
    },
  };
  jQuery.event.special.wheel = {
    setup: function (_, ns, handle) {
      this.addEventListener("wheel", handle, { passive: true });
    },
  };
  jQuery.event.special.mousewheel = {
    setup: function (_, ns, handle) {
      this.addEventListener("mousewheel", handle, { passive: true });
    },
  };
  $(document).ready(function () {
    (function (a) {
      if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define(["jquery"], a);
      } else {
        a(jQuery);
      }
    })(function (f) {
      var y = "1.6.12",
        p = "left",
        o = "right",
        e = "up",
        x = "down",
        c = "in",
        A = "out",
        m = "none",
        s = "auto",
        l = "swipe",
        t = "pinch",
        B = "tap",
        j = "doubletap",
        b = "longtap",
        z = "hold",
        E = "horizontal",
        u = "vertical",
        i = "all",
        r = 10,
        g = "start",
        k = "move",
        h = "end",
        q = "cancel",
        a = "ontouchstart" in window,
        v =
          window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
        d =
          window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
        C = "TouchSwipe";
      var n = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe",
        preventDefaultEvents: true,
      };
      f.fn.swipe = function (H) {
        var G = f(this),
          F = G.data(C);
        if (F && typeof H === "string") {
          if (F[H]) {
            return F[H].apply(this, Array.prototype.slice.call(arguments, 1));
          } else {
            f.error("Method " + H + " does not exist on jQuery.swipe");
          }
        } else {
          if (F && typeof H === "object") {
            F.option.apply(this, arguments);
          } else {
            if (!F && (typeof H === "object" || !H)) {
              return w.apply(this, arguments);
            }
          }
        }
        return G;
      };
      f.fn.swipe.version = y;
      f.fn.swipe.defaults = n;
      f.fn.swipe.phases = {
        PHASE_START: g,
        PHASE_MOVE: k,
        PHASE_END: h,
        PHASE_CANCEL: q,
      };
      f.fn.swipe.directions = {
        LEFT: p,
        RIGHT: o,
        UP: e,
        DOWN: x,
        IN: c,
        OUT: A,
      };
      f.fn.swipe.pageScroll = { NONE: m, HORIZONTAL: E, VERTICAL: u, AUTO: s };
      f.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        ALL: i,
      };
      function w(F) {
        if (
          F &&
          F.allowPageScroll === undefined &&
          (F.swipe !== undefined || F.swipeStatus !== undefined)
        ) {
          F.allowPageScroll = m;
        }
        if (F.click !== undefined && F.tap === undefined) {
          F.tap = F.click;
        }
        if (!F) {
          F = {};
        }
        F = f.extend({}, f.fn.swipe.defaults, F);
        return this.each(function () {
          var H = f(this);
          var G = H.data(C);
          if (!G) {
            G = new D(this, F);
            H.data(C, G);
          }
        });
      }
      class D {
        constructor(a4, au) {
          var au = f.extend({}, au);
          var az = a || d || !au.fallbackToMouseEvents,
            K = az
              ? d
                ? v
                  ? "MSPointerDown"
                  : "pointerdown"
                : "touchstart"
              : "mousedown",
            ax = az
              ? d
                ? v
                  ? "MSPointerMove"
                  : "pointermove"
                : "touchmove"
              : "mousemove",
            V = az
              ? d
                ? v
                  ? "MSPointerUp"
                  : "pointerup"
                : "touchend"
              : "mouseup",
            T = az ? null : "mouseleave",
            aD = d ? (v ? "MSPointerCancel" : "pointercancel") : "touchcancel";
          var ag = 0,
            aP = null,
            ac = 0,
            a1 = 0,
            aZ = 0,
            H = 1,
            ap = 0,
            aJ = 0,
            N = null;
          var aR = f(a4);
          var aa = "start";
          var X = 0;
          var aQ = {};
          var U = 0,
            a2 = 0,
            a5 = 0,
            ay = 0,
            O = 0;
          var aW = null,
            af = null;
          try {
            aR.bind(K, aN);
            aR.bind(aD, a9);
          } catch (aj) {
            f.error(
              "events not supported " + K + "," + aD + " on jQuery.swipe"
            );
          }
          this.enable = function () {
            aR.bind(K, aN);
            aR.bind(aD, a9);
            return aR;
          };
          this.disable = function () {
            aK();
            return aR;
          };
          this.destroy = function () {
            aK();
            aR.data(C, null);
            aR = null;
          };
          this.option = function (bc, bb) {
            if (typeof bc === "object") {
              au = f.extend(au, bc);
            } else {
              if (au[bc] !== undefined) {
                if (bb === undefined) {
                  return au[bc];
                } else {
                  au[bc] = bb;
                }
              } else {
                if (!bc) {
                  return au;
                } else {
                  f.error(
                    "Option " + bc + " does not exist on jQuery.swipe.options"
                  );
                }
              }
            }
            return null;
          };
          function aN(bd) {
            if (aB()) {
              return;
            }
            if (f(bd.target).closest(au.excludedElements, aR).length > 0) {
              return;
            }
            var be = bd.originalEvent ? bd.originalEvent : bd;
            var bc,
              bf = be.touches,
              bb = bf ? bf[0] : be;
            aa = g;
            if (bf) {
              X = bf.length;
            } else {
              if (au.preventDefaultEvents !== false) {
                bd.preventDefault();
              }
            }
            ag = 0;
            aP = null;
            aJ = null;
            ac = 0;
            a1 = 0;
            aZ = 0;
            H = 1;
            ap = 0;
            N = ab();
            S();
            ai(0, bb);
            if (!bf || X === au.fingers || au.fingers === i || aX()) {
              U = ar();
              if (X == 2) {
                ai(1, bf[1]);
                a1 = aZ = at(aQ[0].start, aQ[1].start);
              }
              if (au.swipeStatus || au.pinchStatus) {
                bc = P(be, aa);
              }
            } else {
              bc = false;
            }
            if (bc === false) {
              aa = q;
              P(be, aa);
              return bc;
            } else {
              if (au.hold) {
                af = setTimeout(
                  f.proxy(function () {
                    aR.trigger("hold", [be.target]);
                    if (au.hold) {
                      bc = au.hold.call(aR, be, be.target);
                    }
                  }, this),
                  au.longTapThreshold
                );
              }
              an(true);
            }
            return null;
          }
          function a3(be) {
            var bh = be.originalEvent ? be.originalEvent : be;
            if (aa === h || aa === q || al()) {
              return;
            }
            var bd,
              bi = bh.touches,
              bc = bi ? bi[0] : bh;
            var bf = aH(bc);
            a2 = ar();
            if (bi) {
              X = bi.length;
            }
            if (au.hold) {
              clearTimeout(af);
            }
            aa = k;
            if (X == 2) {
              if (a1 == 0) {
                ai(1, bi[1]);
                a1 = aZ = at(aQ[0].start, aQ[1].start);
              } else {
                aH(bi[1]);
                aZ = at(aQ[0].end, aQ[1].end);
                aJ = aq(aQ[0].end, aQ[1].end);
              }
              H = a7(a1, aZ);
              ap = Math.abs(a1 - aZ);
            }
            if (X === au.fingers || au.fingers === i || !bi || aX()) {
              aP = aL(bf.start, bf.end);
              ak(be, aP);
              ag = aS(bf.start, bf.end);
              ac = aM();
              aI(aP, ag);
              if (au.swipeStatus || au.pinchStatus) {
                bd = P(bh, aa);
              }
              if (!au.triggerOnTouchEnd || au.triggerOnTouchLeave) {
                var bb = true;
                if (au.triggerOnTouchLeave) {
                  var bg = aY(this);
                  bb = F(bf.end, bg);
                }
                if (!au.triggerOnTouchEnd && bb) {
                  aa = aC(k);
                } else {
                  if (au.triggerOnTouchLeave && !bb) {
                    aa = aC(h);
                  }
                }
                if (aa == q || aa == h) {
                  P(bh, aa);
                }
              }
            } else {
              aa = q;
              P(bh, aa);
            }
            if (bd === false) {
              aa = q;
              P(bh, aa);
            }
          }
          function M(bb) {
            var bc = bb.originalEvent ? bb.originalEvent : bb,
              bd = bc.touches;
            if (bd) {
              if (bd.length && !al()) {
                G();
                return true;
              } else {
                if (bd.length && al()) {
                  return true;
                }
              }
            }
            if (al()) {
              X = ay;
            }
            a2 = ar();
            ac = aM();
            if (ba() || !am()) {
              aa = q;
              P(bc, aa);
            } else {
              if (
                au.triggerOnTouchEnd ||
                (au.triggerOnTouchEnd == false && aa === k)
              ) {
                if (au.preventDefaultEvents !== false) {
                  bb.preventDefault();
                }
                aa = h;
                P(bc, aa);
              } else {
                if (!au.triggerOnTouchEnd && a6()) {
                  aa = h;
                  aF(bc, aa, B);
                } else {
                  if (aa === k) {
                    aa = q;
                    P(bc, aa);
                  }
                }
              }
            }
            an(false);
            return null;
          }
          function a9() {
            X = 0;
            a2 = 0;
            U = 0;
            a1 = 0;
            aZ = 0;
            H = 1;
            S();
            an(false);
          }
          function L(bb) {
            var bc = bb.originalEvent ? bb.originalEvent : bb;
            if (au.triggerOnTouchLeave) {
              aa = aC(h);
              P(bc, aa);
            }
          }
          function aK() {
            aR.unbind(K, aN);
            aR.unbind(aD, a9);
            aR.unbind(ax, a3);
            aR.unbind(V, M);
            if (T) {
              aR.unbind(T, L);
            }
            an(false);
          }
          function aC(bf) {
            var be = bf;
            var bd = aA();
            var bc = am();
            var bb = ba();
            if (!bd || bb) {
              be = q;
            } else {
              if (
                bc &&
                bf == k &&
                (!au.triggerOnTouchEnd || au.triggerOnTouchLeave)
              ) {
                be = h;
              } else {
                if (!bc && bf == h && au.triggerOnTouchLeave) {
                  be = q;
                }
              }
            }
            return be;
          }
          function P(bd, bb) {
            var bc,
              be = bd.touches;
            if ((J() && W()) || (Q() && aX())) {
              if (J() && W()) {
                bc = aF(bd, bb, l);
              }
              if (Q() && aX() && bc !== false) {
                bc = aF(bd, bb, t);
              }
            } else {
              if (aG() && bc !== false) {
                bc = aF(bd, bb, j);
              } else {
                if (ao() && bc !== false) {
                  bc = aF(bd, bb, b);
                } else {
                  if (ah() && bc !== false) {
                    bc = aF(bd, bb, B);
                  }
                }
              }
            }
            if (bb === q) {
              if (W()) {
                bc = aF(bd, bb, l);
              }
              if (aX()) {
                bc = aF(bd, bb, t);
              }
              a9(bd);
            }
            if (bb === h) {
              if (be) {
                if (!be.length) {
                  a9(bd);
                }
              } else {
                a9(bd);
              }
            }
            return bc;
          }
          function aF(be, bb, bd) {
            var bc;
            if (bd == l) {
              aR.trigger("swipeStatus", [
                bb,
                aP || null,
                ag || 0,
                ac || 0,
                X,
                aQ,
              ]);
              if (au.swipeStatus) {
                bc = au.swipeStatus.call(
                  aR,
                  be,
                  bb,
                  aP || null,
                  ag || 0,
                  ac || 0,
                  X,
                  aQ
                );
                if (bc === false) {
                  return false;
                }
              }
              if (bb == h && aV()) {
                aR.trigger("swipe", [aP, ag, ac, X, aQ]);
                if (au.swipe) {
                  bc = au.swipe.call(aR, be, aP, ag, ac, X, aQ);
                  if (bc === false) {
                    return false;
                  }
                }
                switch (aP) {
                  case p:
                    aR.trigger("swipeLeft", [aP, ag, ac, X, aQ]);
                    if (au.swipeLeft) {
                      bc = au.swipeLeft.call(aR, be, aP, ag, ac, X, aQ);
                    }
                    break;
                  case o:
                    aR.trigger("swipeRight", [aP, ag, ac, X, aQ]);
                    if (au.swipeRight) {
                      bc = au.swipeRight.call(aR, be, aP, ag, ac, X, aQ);
                    }
                    break;
                  case e:
                    aR.trigger("swipeUp", [aP, ag, ac, X, aQ]);
                    if (au.swipeUp) {
                      bc = au.swipeUp.call(aR, be, aP, ag, ac, X, aQ);
                    }
                    break;
                  case x:
                    aR.trigger("swipeDown", [aP, ag, ac, X, aQ]);
                    if (au.swipeDown) {
                      bc = au.swipeDown.call(aR, be, aP, ag, ac, X, aQ);
                    }
                    break;
                }
              }
            }
            if (bd == t) {
              aR.trigger("pinchStatus", [
                bb,
                aJ || null,
                ap || 0,
                ac || 0,
                X,
                H,
                aQ,
              ]);
              if (au.pinchStatus) {
                bc = au.pinchStatus.call(
                  aR,
                  be,
                  bb,
                  aJ || null,
                  ap || 0,
                  ac || 0,
                  X,
                  H,
                  aQ
                );
                if (bc === false) {
                  return false;
                }
              }
              if (bb == h && a8()) {
                switch (aJ) {
                  case c:
                    aR.trigger("pinchIn", [
                      aJ || null,
                      ap || 0,
                      ac || 0,
                      X,
                      H,
                      aQ,
                    ]);
                    if (au.pinchIn) {
                      bc = au.pinchIn.call(
                        aR,
                        be,
                        aJ || null,
                        ap || 0,
                        ac || 0,
                        X,
                        H,
                        aQ
                      );
                    }
                    break;
                  case A:
                    aR.trigger("pinchOut", [
                      aJ || null,
                      ap || 0,
                      ac || 0,
                      X,
                      H,
                      aQ,
                    ]);
                    if (au.pinchOut) {
                      bc = au.pinchOut.call(
                        aR,
                        be,
                        aJ || null,
                        ap || 0,
                        ac || 0,
                        X,
                        H,
                        aQ
                      );
                    }
                    break;
                }
              }
            }
            if (bd == B) {
              if (bb === q || bb === h) {
                clearTimeout(aW);
                clearTimeout(af);
                if (Z() && !I()) {
                  O = ar();
                  aW = setTimeout(
                    f.proxy(function () {
                      O = null;
                      aR.trigger("tap", [be.target]);
                      if (au.tap) {
                        bc = au.tap.call(aR, be, be.target);
                      }
                    }, this),
                    au.doubleTapThreshold
                  );
                } else {
                  O = null;
                  aR.trigger("tap", [be.target]);
                  if (au.tap) {
                    bc = au.tap.call(aR, be, be.target);
                  }
                }
              }
            } else {
              if (bd == j) {
                if (bb === q || bb === h) {
                  clearTimeout(aW);
                  O = null;
                  aR.trigger("doubletap", [be.target]);
                  if (au.doubleTap) {
                    bc = au.doubleTap.call(aR, be, be.target);
                  }
                }
              } else {
                if (bd == b) {
                  if (bb === q || bb === h) {
                    clearTimeout(aW);
                    O = null;
                    aR.trigger("longtap", [be.target]);
                    if (au.longTap) {
                      bc = au.longTap.call(aR, be, be.target);
                    }
                  }
                }
              }
            }
            return bc;
          }
          function am() {
            var bb = true;
            if (au.threshold !== null) {
              bb = ag >= au.threshold;
            }
            return bb;
          }
          function ba() {
            var bb = false;
            if (au.cancelThreshold !== null && aP !== null) {
              bb = aT(aP) - ag >= au.cancelThreshold;
            }
            return bb;
          }
          function ae() {
            if (au.pinchThreshold !== null) {
              return ap >= au.pinchThreshold;
            }
            return true;
          }
          function aA() {
            var bb;
            if (au.maxTimeThreshold) {
              if (ac >= au.maxTimeThreshold) {
                bb = false;
              } else {
                bb = true;
              }
            } else {
              bb = true;
            }
            return bb;
          }
          function ak(bb, bc) {
            if (au.preventDefaultEvents === false) {
              return;
            }
            if (au.allowPageScroll === m) {
              bb.preventDefault();
            } else {
              var bd = au.allowPageScroll === s;
              switch (bc) {
                case p:
                  if (
                    (au.swipeLeft && bd) ||
                    (!bd && au.allowPageScroll != E)
                  ) {
                    bb.preventDefault();
                  }
                  break;
                case o:
                  if (
                    (au.swipeRight && bd) ||
                    (!bd && au.allowPageScroll != E)
                  ) {
                    bb.preventDefault();
                  }
                  break;
                case e:
                  if ((au.swipeUp && bd) || (!bd && au.allowPageScroll != u)) {
                    bb.preventDefault();
                  }
                  break;
                case x:
                  if (
                    (au.swipeDown && bd) ||
                    (!bd && au.allowPageScroll != u)
                  ) {
                    bb.preventDefault();
                  }
                  break;
              }
            }
          }
          function a8() {
            var bc = aO();
            var bb = Y();
            var bd = ae();
            return bc && bb && bd;
          }
          function aX() {
            return !!(au.pinchStatus || au.pinchIn || au.pinchOut);
          }
          function Q() {
            return !!(a8() && aX());
          }
          function aV() {
            var be = aA();
            var bg = am();
            var bd = aO();
            var bb = Y();
            var bc = ba();
            var bf = !bc && bb && bd && bg && be;
            return bf;
          }
          function W() {
            return !!(
              au.swipe ||
              au.swipeStatus ||
              au.swipeLeft ||
              au.swipeRight ||
              au.swipeUp ||
              au.swipeDown
            );
          }
          function J() {
            return !!(aV() && W());
          }
          function aO() {
            return X === au.fingers || au.fingers === i || !a;
          }
          function Y() {
            return aQ[0].end.x !== 0;
          }
          function a6() {
            return !!au.tap;
          }
          function Z() {
            return !!au.doubleTap;
          }
          function aU() {
            return !!au.longTap;
          }
          function R() {
            if (O == null) {
              return false;
            }
            var bb = ar();
            return Z() && bb - O <= au.doubleTapThreshold;
          }
          function I() {
            return R();
          }
          function aw() {
            return (X === 1 || !a) && (isNaN(ag) || ag < au.threshold);
          }
          function a0() {
            return ac > au.longTapThreshold && ag < r;
          }
          function ah() {
            return !!(aw() && a6());
          }
          function aG() {
            return !!(R() && Z());
          }
          function ao() {
            return !!(a0() && aU());
          }
          function G() {
            a5 = ar();
            ay = event.touches.length + 1;
          }
          function S() {
            a5 = 0;
            ay = 0;
          }
          function al() {
            var bb = false;
            if (a5) {
              var bc = ar() - a5;
              if (bc <= au.fingerReleaseThreshold) {
                bb = true;
              }
            }
            return bb;
          }
          function aB() {
            return !!(aR.data(C + "_intouch") === true);
          }
          function an(bb) {
            if (bb === true) {
              aR.bind(ax, a3);
              aR.bind(V, M);
              if (T) {
                aR.bind(T, L);
              }
            } else {
              aR.unbind(ax, a3, false);
              aR.unbind(V, M, false);
              if (T) {
                aR.unbind(T, L, false);
              }
            }
            aR.data(C + "_intouch", bb === true);
          }
          function ai(bd, bb) {
            var bc = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
            bc.start.x = bc.end.x = bb.pageX || bb.clientX;
            bc.start.y = bc.end.y = bb.pageY || bb.clientY;
            aQ[bd] = bc;
            return bc;
          }
          function aH(bb) {
            var bd = bb.identifier !== undefined ? bb.identifier : 0;
            var bc = ad(bd);
            if (bc === null) {
              bc = ai(bd, bb);
            }
            bc.end.x = bb.pageX || bb.clientX;
            bc.end.y = bb.pageY || bb.clientY;
            return bc;
          }
          function ad(bb) {
            return aQ[bb] || null;
          }
          function aI(bb, bc) {
            bc = Math.max(bc, aT(bb));
            N[bb].distance = bc;
          }
          function aT(bb) {
            if (N[bb]) {
              return N[bb].distance;
            }
            return undefined;
          }
          function ab() {
            var bb = {};
            bb[p] = av(p);
            bb[o] = av(o);
            bb[e] = av(e);
            bb[x] = av(x);
            return bb;
          }
          function av(bb) {
            return { direction: bb, distance: 0 };
          }
          function aM() {
            return a2 - U;
          }
          function at(be, bd) {
            var bc = Math.abs(be.x - bd.x);
            var bb = Math.abs(be.y - bd.y);
            return Math.round(Math.sqrt(bc * bc + bb * bb));
          }
          function a7(bb, bc) {
            var bd = (bc / bb) * 1;
            return bd.toFixed(2);
          }
          function aq() {
            if (H < 1) {
              return A;
            } else {
              return c;
            }
          }
          function aS(bc, bb) {
            return Math.round(
              Math.sqrt(Math.pow(bb.x - bc.x, 2) + Math.pow(bb.y - bc.y, 2))
            );
          }
          function aE(be, bc) {
            var bb = be.x - bc.x;
            var bg = bc.y - be.y;
            var bd = Math.atan2(bg, bb);
            var bf = Math.round((bd * 180) / Math.PI);
            if (bf < 0) {
              bf = 360 - Math.abs(bf);
            }
            return bf;
          }
          function aL(bc, bb) {
            var bd = aE(bc, bb);
            if (bd <= 45 && bd >= 0) {
              return p;
            } else {
              if (bd <= 360 && bd >= 315) {
                return p;
              } else {
                if (bd >= 135 && bd <= 225) {
                  return o;
                } else {
                  if (bd > 45 && bd < 135) {
                    return x;
                  } else {
                    return e;
                  }
                }
              }
            }
          }
          function ar() {
            var bb = new Date();
            return bb.getTime();
          }
          function aY(bb) {
            bb = f(bb);
            var bd = bb.offset();
            var bc = {
              left: bd.left,
              right: bd.left + bb.outerWidth(),
              top: bd.top,
              bottom: bd.top + bb.outerHeight(),
            };
            return bc;
          }
          function F(bb, bc) {
            return (
              bb.x > bc.left &&
              bb.x < bc.right &&
              bb.y > bc.top &&
              bb.y < bc.bottom
            );
          }
        }
      }
    });

    var scripts = window.scripts || [];
    for (var si in scripts) {
      var s = scripts[si];
      s();
    }

    var isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(
      navigator.userAgent
    );
    if (!isBot) {
      $("#menu a[data-href]").each(function () {
        $(this).attr("href", $(this).attr("data-href"));
      });
    }

    if (navigator.languages === undefined) {
      // classic IE...
      navigator.languages = [];
      if (navigator.browserLanguage) {
        navigator.languages.push(navigator.browserLanguage);
      }
      if (navigator.userLanguage) {
        navigator.languages.push(navigator.userLanguage);
      }
      if (navigator.systemLanguage) {
        navigator.languages.push(navigator.systemLanguage);
      }
    }
    var languages = navigator.languages.map(function (lang) {
      return lang.split("-")[0].toLowerCase();
    });
    if (
      Cookies.get("dont-offer-english") !== "true" &&
      $("html").attr("lang") === "tr" &&
      languages.indexOf("tr") === -1
    ) {
      $("#offer-english").show().css("display", "flex");
    }

    $("#offer-english-decline").click(function () {
      Cookies.set("dont-offer-english", "true", { expires: 365 });
      $("#offer-english").hide();
    });

    if (Cookies.get("cookie-consent") !== "true") {
      $("#cookie-consent").css("display", "flex").show();
    }

    $("#cookie-consent .button").click(function () {
      Cookies.set("cookie-consent", "true", { expires: 365 });
      $("#cookie-consent").hide();
    });

    function fileTrack() {
      var href = $(this).attr("href");
      if (href[0] === "/") {
        // absolute link
      } else if (href.startsWith("http")) {
        // external link
      } else {
        // relative link
        href = location.pathname + href;
      }
      var fileTokens = href.split(".");
      var ext = fileTokens[fileTokens.length - 1].toUpperCase();
      ga("send", "pageview", href, {
        transport: "beacon",
      });
    }
    $('a[href$=".pdf"]').click(fileTrack);
    $('a[href$=".zip"]').click(fileTrack);
  });
}

$(() => {
  init();
  idleInit();
});
