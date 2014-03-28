// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([51.505, -0.09], 13);
var markers = []
var polyline = L.polyline([]).addTo(map)
var startTime = new Date();

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var adder = document.getElementById('add-point')
adder.addEventListener('click', addPoint)

function addPoint() {
  var position = {
    coords: {
      longitude: nextLon(),
      latitude: nextLat()
    }
  }

  positionSuccess(position)
}

function generator() {
  return function () {
    this.value = this.value || 0
    this.variation = this.variation || 0

    var varvar = Math.random() > 0.9 ? 1 : 4
    this.variation += Math.sin((Math.random()-2)/varvar)
    this.value += Math.random()*0.001 * this.variation

    return this.value
  }
}

var nextLon = generator()
var nextLat = generator()

function positionSuccess(position) {
  var p = position.coords
  var ll = [p.latitude, p.longitude]
  var marker = L.marker(ll).addTo(map)
  markers.push(marker)
  polyline.addLatLng(ll)
  map.fitBounds(polyline.getBounds())
}
