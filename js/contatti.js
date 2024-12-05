// Set view: latitudine, longitudine, zoom 
var map = L.map('map-osm').setView([43.80622885921796, 12.27502836335974], 7);

// Qui vado a pescare dai server di OpenStreetMap i mattoncini della cartina
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Aggiungo un marker su Roma
var markerRoma = L.marker([41.9007456561872, 12.483459086515177]).addTo(map);

// Posso aggiungere un popup al marker appena creato
markerRoma.bindPopup("<b>Via delle Meraviglie, 45</b>");

// Aggiungo un marker su Milano
var markerMilano = L.marker([45.464188539723935, 9.192938386212308]).addTo(map);

// Posso aggiungere un popup al marker appena creato
markerMilano.bindPopup("<b>Piazza dei Sogni, 10</b>");

//per approfondire: https://leafletjs.com/examples.html
