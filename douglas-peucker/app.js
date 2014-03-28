// create a map in the "map" div, set the view to a given place and zoom
var initialLat = 51.508611
var initialLon = -0.163611
var map = L.map('map').setView([initialLat, initialLon], 13);
var markers = []
var polyline = L.polyline([]).addTo(map)
var startTime = new Date();

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

document.getElementById('add-point')
  .addEventListener('click', addPoint)

document.getElementById('simplify')
  .addEventListener('click', simplify)

function addPoint() {
  var position = {
    coords: {
      longitude: nextLon(),
      latitude: nextLat()
    }
  }

  positionSuccess(position)
}

function generator(initialValue) {
  var state = {}
  return function () {
    state.value = state.value || initialValue
    state.variation = state.variation || 0

    var varvar = Math.random() > 0.9 ? 1 : 4
    state.variation += Math.sin((Math.random()-2)/varvar)
    state.value += Math.random()*0.00001 * state.variation

    return state.value
  }
}

var nextLon = generator(initialLon)
var nextLat = generator(initialLat)

function simplify() {
  var points = polyline.getLatLngs().map(function(ll) { return L.point(ll.lng, ll.lat)})
  var newPoints = L.LineUtil.simplify(points, 0.00002).map(function(p){ return L.latLng(p.y, p.x) })
  polyline.setLatLngs(newPoints)

  markers.forEach(function(m){ map.removeLayer(m) })
  markers = []
  polyline.getLatLngs().forEach(function(ll){
    markers.push(createMarker(ll))
  })
}

function positionSuccess(position) {
  var p = position.coords
  var ll = [p.latitude, p.longitude]
  markers.push(createMarker(ll))
  polyline.addLatLng(ll)
  map.fitBounds(polyline.getBounds())
}

function createMarker(ll) {
  var div = L.divIcon({className: 'marker', html: 'blah', iconAnchor: [0, 0], iconSize: null})
  return L.marker(ll, {icon: div}).addTo(map)
}
