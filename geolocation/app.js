// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([51.505, -0.09], 13);
var markers = []
var polyline = L.polyline([]).addTo(map)
var startTime = new Date();

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var positionOptions = {
  enableHighAccuracy: true,
  maximumAge        : 30000,
  timeout           : 27000
}

navigator.geolocation.watchPosition(positionSuccess, positionError, positionOptions)

function positionSuccess(position) {
  var p = position.coords
  var ll = [p.latitude, p.longitude]
  var html = elapsedTimeStr() + "<br>" + p.accuracy + 'm'
  var timeIcon = L.divIcon({className: 'time-marker', html: html, iconAnchor: [0, 0], iconSize: null})
  var marker = L.marker(ll, {icon: timeIcon}).addTo(map)
  markers.push(marker)
  polyline.addLatLng(ll)
  map.setView(ll, 15)
}

function positionError(error) {
  alert("Error " + error.code + "\n" + error.messsage)
}

function elapsedTimeStr() {
  var now = new Date
  var diff = Math.floor((now.getTime() - startTime.getTime())/1000)
  var secs = diff%60
  var mins = Math.floor(diff/60)
  return twoDigits(mins) + ':' + twoDigits(secs)
}

function twoDigits(num) {
  return num < 10 ? '0' + num : '' + num
}
