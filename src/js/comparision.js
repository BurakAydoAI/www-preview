// function initComparision() {
//   return;
//   var s = $(".content").width() / $(".comparision").width();
//   $(".comparision").css("transform", "scale(" + s + ", " + s + ")");
//   //$('.comparision').css('margin-top', -$('.comparision').position().top);
//   $(".comparision").css("margin-left", -$(".comparision").position().left);
//   return;
//   $.fn.extend({
//     extractCols: function () {
//       for (var i = 0; i < arguments.length; i++) {
//         this.find("td:nth-child(" + arguments[i] + ")").attr("keep", "true");
//       }
//       this.find('td[keep!="true"]').remove();
//       this.find("td[keep]").removeAttr("keep");
//       return this;
//     },
//     removeRowSpans: function () {
//       this.find("tr").each(function () {
//         var tr = $(this);
//         // remove row span
//         var tds = $(this).find("td[rowspan]");
//         if (tds.length > 0) {
//           tds.each(function () {
//             var r = parseInt($(this).attr("rowspan"));
//             $(this).removeAttr("rowspan");
//             var i = $(this).index();
//             var trr = tr;
//             while (--r > 0) {
//               var a = tr
//                 .next()
//                 .find("td")
//                 .get(i - 1);
//               if (a === undefined) {
//                 tr.next().append(
//                   '<td colspan="' + $(this).attr("colspan") + '">foo</td>'
//                 );
//               } else {
//                 i = $(this).attr("colspan") || 0;
//                 $(
//                   '<td colspan="' + i + '">' + $(this).html() + "</td>"
//                 ).insertAfter(a);
//               }
//               trr = trr.next();
//             }
//           });
//         }
//       });
//       return this;
//     },
//     removeColSpans: function () {
//       this.find("tr").each(function () {
//         $(this)
//           .find("td[colspan]")
//           .each(function () {
//             var c = parseInt($(this).attr("colspan"));
//             $(this).removeAttr("colspan");
//             while (--c > 0) {
//               $(this).clone().insertAfter(this);
//             }
//           });
//       });
//       return this;
//     },
//   });

//   var tbl = $("table.comparision");

//   // add images
//   /*
// tbl.find('tr:first>td').each(function() {
//   var text = $(this).text().trim();
//   if (text.length === 0) {
//     return;
//   }
//   $(this).append($('<div class="image"></div>').
//                   css('background-image','url("/finals/' + text + '.jpeg")'));
// });*/

//   // Generate mobile comparision UI
//   var mobileTable = tbl.clone().show().removeColSpans();

//   // Fixed column headers
//   var header = $(".col-header");
//   mobileTable.clone().appendTo(".col-header");
//   var colWidth = header.find("td:first").outerWidth();
//   header.width(colWidth);

//   // Comparision data
//   mobileTable.clone().appendTo(".swipe");
//   var dataColWidth = $(document).width() - colWidth - 50;
//   $(".small-comparator")
//     .find("td:not(:nth-child(1))")
//     .css("min-width", dataColWidth);

//   function offset(i) {
//     // css index starts from 1 and we also have col header
//     i += 2;
//     var o = $(".swipe td:nth-child(" + i + ")").offset();
//     if (o === undefined) {
//       return undefined;
//     }
//     return o.left;
//   }

//   function scrollTo(i) {
//     if (i < 0) {
//       return false;
//     }
//     var o = offset(i);
//     console.log("scrolling to", i, o);
//     if (o === undefined) {
//       return false;
//     }
//     $(".swipe").css("margin-left", "-=" + (o - colWidth - 20));
//     return true;
//   }

//   var active = 0;
//   $(".small-comparator").swipe({
//     swipRight: function () {
//       //event.preventDefault();
//       console.log("ri");
//       if (scrollTo(active - 1) === true) {
//         active--;
//       }
//     },
//     swipeLeft: function () {
//       //event.preventDefault();
//       console.log("le");
//       if (scrollTo(active + 1)) {
//         active++;
//       }
//     },
//     allowPageScroll: "vertical",
//     threshold: 40,
//     //preventDefaultEvents: false
//   });
// }

// window.scripts = window.scripts || [];
// window.scripts.push(initComparision);
