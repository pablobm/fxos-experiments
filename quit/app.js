function quit() {
  window.close()
}

function tickTimer() {
  var now = new Date()
  var elapsed = Math.round((now.getTime() - startTime.getTime())/1000)
  var newTxt = document.createTextNode(elapsed + ' seconds elapsed')
  var oldTxt = timer.childNodes.item(0)
  timer.replaceChild(newTxt, oldTxt)
}

var startTime = new Date()
var timer = document.getElementById('timer')

document.getElementById('quit')
  .addEventListener('click', quit)

setInterval(tickTimer, 1000)
