var locField = document.getElementById('location');
var form = document.getElementById('controls');
var goBtn = document.getElementById('go-btn');
var purgeBtn = document.getElementById('purge-btn');
var iframe = document.querySelector('#content iframe');
var messages = document.getElementById('messages');

var setMessage = function (msg) {
  while (messages.firstChild) {
    messages.removeChild(messages.firstChild);
  }
  var txt = document.createTextNode(msg);
  messages.appendChild(txt);
};

var stopPropagationAnd = function (nextAction) {
  return function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    nextAction();
  };
};

var goToLocation = function () {
  var newLocation = locField.value;
  if (!newLocation.match(/^https?:/)) {
    newLocation = 'http://' + newLocation;
  }
  iframe.setAttribute('src', newLocation);
};

var purge = function () {
  var req;
  setMessage('about to purge');
  try {
    req = navigator.mozApps.getSelf();
    req.onerror = function () {
      setMessage("error: " + req.error.name);
    };
    req.onsuccess = function () {
      setMessage("success? " + req.result.clearBrowserData());
    }
    setMessage('allegedly purged');
  }
  catch (e) {
    setMessage("ERROR: " + e.message);
  }
};

form.addEventListener('submit', stopPropagationAnd(goToLocation));
purgeBtn.addEventListener('click', purge);

iframe.addEventListener('mozbrowserlocationchange', function (evt) {
  locField.value = evt.detail;
});
