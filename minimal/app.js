var txt = document.createTextNode("Blah, blah, blah")
var p = document.createElement('p')
p.appendChild(txt)
var body = document.getElementsByTagName('body')[0]
body.appendChild(p)
