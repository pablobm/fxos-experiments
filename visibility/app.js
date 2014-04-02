var ul = document.getElementById('log')

function log(str) {
  var li = document.createElement('li')
  var txt = document.createTextNode(str + ' at ' + new Date().toISOString())
  li.appendChild(txt)
  ul.appendChild(li)
}

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    log("backgrounded")
  } else {
    log("foregrounded")
  }
})

log("started")
