let wssUrl = 'wss://echo.websocket.org/';
const output = document.querySelector('.bottom-part');
const btn = document.querySelector('.j-btn');
const btnLocation = document.querySelector('.j-btn-location');
let websocket = new WebSocket(wssUrl);

websocket.onopen = function(evt) {
  console.log("CONNECTED");
  document.querySelector('#text').textContent = 'Hello! Write me smth and I\'ll repeat it!'
};

function writeToScreen(message, num) {
  const par = document.createElement('p');
  num === 1 ? par.setAttribute('class', 'text server-text') : 
  par.setAttribute('class', 'text client-text');
  par.innerHTML = message;
  output.appendChild(par);
}

btn.addEventListener('click', () => {
  const message = document.querySelector('.input').value;
  writeToScreen(message);
  if (websocket.readyState === 1)
  {
      websocket.send(message);
      websocket.onmessage = function(evt) {
         writeToScreen(evt.data, 1);
      }
      websocket.onerror = function(evt) {
         writeToScreen('Error' + evt.data);
      };
   }
});

btnLocation.addEventListener('click', () => {
  let lat, long;
  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
         const { coords } = position;
         lat = coords.latitude, long = coords.longitude;
         ref = `<a href=\'https://www.openstreetmap.org/#map=18/${lat}/${long}\'
         target=\'_blank\'>Geolocation</a>`
         writeToScreen(ref, 1);
      });
  }
});