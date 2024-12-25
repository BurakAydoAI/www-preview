import $ from "jquery";
import * as L from "leaflet";
import worldGeoJSON from "../ts/mapWorld";
import turkeyGeoJSON from "../ts/mapTurkiye";
import DistGlobal from "../content/data/globaldistributors.yml";
import DistLocal from "../content/data/localdistributors.yml";

function initDistributors() {
  class AstroGreet extends HTMLElement {
    connectedCallback() {
      // Read the message from the data attribute.
      const message = this.dataset.message;
      const button = this.querySelector("button");
      button?.addEventListener("click", () => {
        alert(message);
      });
    }
  }

  customElements.define("astro-greet", AstroGreet);

  function initDistributorsMobile() {
    $(".selector > .button").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
      if ($(this).hasClass("global")) {
        $(".box.domestic").hide();
        $(".box.global").show();
        console.log("buttom press");
      } else {
        $(".box.domestic").show();
        $(".box.global").hide();
      }
    });

    if ($("html").attr("lang") === "en") {
      $(".selector > .global").click();
    } else {
      $(".selector > .domestic").click();
    }
  }

  var map;
  function initMap(lat, long, zoom, controls) {
    map = L.map("distributorsMap", {
      center: [lat, long],
      zoom: zoom,
      zoomControl: controls,
      attributionControl: false,
      doubleClickZoom: controls,
      dragging: controls,
      scrollWheelZoom: false,
      zoomSnap: 0.1,
    });
  }

  function initDistributorsDesktop() {
    if (worldGeoJSON === undefined) {
      return;
    }
    var tr;
    var world;
    $(".selector > .button").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
      map.remove();
      if ($(this).hasClass("global")) {
        initMap(45, 20, 1.2, true);
        // world = loadGeoJSON(worldGeoJSON, globalDistributors);
        world = loadGeoJSON(worldGeoJSON, DistGlobal.country);
        $(".box.domestic").hide();
        $(".box.global").show();
      } else {
        initMap(39.16414104768742, 35.37597656250001, 6, false);
        // tr = loadGeoJSON(turkeyGeoJSON, localDistributors);
        tr = loadGeoJSON(turkeyGeoJSON, DistLocal.country);
        $(".box.domestic").show();
        $(".box.global").hide();
      }
    });

    function initMap(lat, long, zoom, controls) {
      map = L.map("distributorsMap", {
        center: [lat, long],
        zoom: zoom,
        zoomControl: controls,
        attributionControl: false,
        doubleClickZoom: controls,
        dragging: controls,
        scrollWheelZoom: false,
        zoomSnap: 0.1,
      });
    }

    function loadGeoJSON(geoJSON, distributors) {
      return L.geoJSON(geoJSON.features, {
        onEachFeature: onEachFeature,
        style: function (feature) {
          var name = feature.properties.name;
          return {
            fillColor: distributors[name] !== undefined ? "#f72432" : "#ccc",
            fillOpacity: 1,
            weight: 1,
            color: "#fff",
          };
        },
      }).addTo(map);
    }

    function resize() {
      if (tr) map.fitBounds(tr.getBounds());
      // if (world) map.fitBounds(world.getBounds());
    }

    $(window).resize(resize);
    $(window).on("load", resize);

    function highlightFeature(e) {
      var layer = e.target;
      layer.setStyle({
        fillOpacity: 0.7,
      });
    }

    function resetHighlight(e) {
      e.target.setStyle({
        fillOpacity: 1,
      });
    }

    var view = $("html, body");

    function regionSelect(e) {
      var region = e.target.feature.properties.name.replace(/ /g, "-");
      console.log(region);
      view.animate(
        {
          scrollTop: $("#region-" + region.replace(" ", "-")).offset().top,
        },
        500
      );
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: regionSelect,
      });
    }

    if ($("html").attr("lang") === "en") {
      $(".selector > .global").click();
    } else {
      $(".selector > .domestic").click();
    }
  }

  function resizeHandler() {
    console.log("resize", $(window).width());
    if ($(window).width() >= 768) {
      initDistributorsDesktop();
    } else {
      initDistributorsMobile();
    }
  }

  function initToggle() {
    $(".country-header").click(function () {
      $(this).next().slideToggle();
    });
  }

  $(document).ready(() => {
    $(window).resize(resizeHandler);
    initMap();
    resizeHandler();
    initToggle();
  });
}

window.scripts = window.scripts || [];
window.scripts.push(initDistributors);
i;
