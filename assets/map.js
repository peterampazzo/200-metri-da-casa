var map = L.map("mapid").setView([45.40797, 11.88586], 13);
map.locate({ setView: false, maxZoom: 16 });

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.easyButton('<i class="fas fa-map-marker"></i>', (btn, map) => {
  map.locate({ setView: false, maxZoom: 16 });
}).addTo(map);

// GeoCoder

// L.Control.geocoder({
//   defaultMarkGeocode: false,
//   position: "topleft",
//   placeholder: "Cerca..",
//   errorMessage: "Nessun risultato."
// })
//   .on("markgeocode", function(e) {
//     var coords = {
//       latlng: {}
//     };
//     coords.latlng = e.geocode.center;
//     var text = e.geocode.html; // Address al popup
//     addPoint(coords, text);
//   })
//   .addTo(map);

let Marker,
  Circle = {};

let latlng = {};
let radius = 200;

function onLocationFound(e) {
  latlng = e.latlng;
  addPoint("Questa è l'area concessa per la posizione rilevata.");
}

// onLocationError

// function onLocationError(e) {
//     if (e.code === 1) {
//         alert("Puoi cliccare sulla mappa per visualizzare l'area concessa");
//     }
//     else {
//         alert(e.message);
//     }
// }

// map.on('locationerror', onLocationError);

function addPoint(text) {
  // Clear existing
  if (Marker !== undefined) {
    map.removeLayer(Marker);
    map.removeLayer(Circle);
  }

  // Add a marker+circle to show where you clicked
  Marker = L.marker([latlng.lat, latlng.lng]).addTo(map);
  if (text !== undefined) {
    Marker.bindPopup(
      text + "<br>Il raggio è di " + radius + " metri."
    ).openPopup();
  } else {
    Marker.bindPopup("Il raggio è di " + radius + " metri.").openPopup();
  }
  Circle = L.circle([latlng.lat, latlng.lng], parseInt(radius)).addTo(map);
  map.setView(latlng, 15);
}

map.on("locationfound", onLocationFound);
map.on("click", (e) => {
  latlng = e.latlng;
  addPoint();
});

// Tools

const collapse = document.querySelector("#collapse");
const tools = document.querySelector("#tools");
const inputRadius = document.querySelector("#radius");
const bubble = document.querySelector(".bubble");

inputRadius.addEventListener("input", () => {
  const val = inputRadius.value;
  const min = inputRadius.min ? inputRadius.min : 0;
  const max = inputRadius.max ? inputRadius.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;

  radius = val;
  addPoint();
});

collapse.addEventListener("click", () => {
  console.log(tools.className);
  if (tools.style.height === "340px") {
    tools.style.height = "5px";
    collapse.className = "fas fa-chevron-circle-down";
  } else {
    tools.style.height = "340px";
    collapse.className = "fas fa-times-circle";
  }
});
