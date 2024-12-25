import $ from "jquery";
import * as L from "leaflet";
import worldGeoJSON from "../ts/mapWorld";
import turkeyGeoJSON from "../ts/mapTurkiye";
import DistGlobal from "../data/globaldistributors.yaml";
import DistLocal from "../data/localdistributors.yaml";

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

function initDistributors() {
  if ($(window).width() >= 768) {
    initDistributorsDesktop();
  } else {
    initDistributorsMobile();
  }
}

function initDistributorsMobile() {
  $(".selector > .button").on(click, function () {
    $(this).addClass("active").siblings().removeClass("active");
    if ($(this).hasClass("global")) {
      $(".box.domestic").hide();
      $(".box.global").show();
    } else {
      $(".box.domestic").show();
      $(".box.global").hide();
    }
  });

  if ($("html").attr("lang") !== "tr") {
    $(".selector > .domestic").on(click);
  } else {
    $(".selector > .global").on(click);
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
    console.log("no json");
    return;
  }
  var tr;
  $(".selector > .button").on(click, function () {
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

  $(window).on("resize", resize);
  $(window).load(resize);

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
    var region = e.target.feature.properties.name;
    console.log(region);
    view.animate(
      {
        scrollTop: $("#region-" + region.replace(" ", "-")).offset().top,
      },
      500
    );
  }

  function onEachFeature(layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: regionSelect,
    });
  }

  if ($("html").attr("lang") === "en") {
    $(".selector > .global").on(click);
  } else {
    $(".selector > .domestic").on(click);
  }
}

$(document).on(ready)(() => {
  initMap();
  initDistributors();
});

scripts = scripts || [];
scripts.push(initDistributors);
