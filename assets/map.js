var map = L.map("mapid").setView([45.40797, 11.88586], 13);
map.locate({ setView: false, maxZoom: 16 });

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var Marker,
  Circle = {};

// Custom Icon

// var houseIcon = L.icon({
//   iconUrl: "assets/icons/house.png",
//   iconSize: [56, 56],
// });

function onLocationFound(e) {
  addPoint(e, "Questa è l'area concessa per la posizione rilevata");
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

function addPoint(e, text) {
  lat = e.latlng.lat;
  lon = e.latlng.lng;

  // Clear existing
  if (Marker !== undefined) {
    map.removeLayer(Marker);
    map.removeLayer(Circle);
  }

  // Add a marker+circle to show where you clicked
  Marker = L.marker([lat, lon]).addTo(map);
  if (text !== undefined) {
    Marker.bindPopup(text).openPopup();
  }
  Circle = L.circle([lat, lon], 200).addTo(map);
  map.setView(e.latlng, 16);
}

map.on("locationfound", onLocationFound);
map.on("click", addPoint);
