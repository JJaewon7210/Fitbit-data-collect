import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { geolocation } from "geolocation";

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("[Phone] Companion Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("[Phone] Companion Socket Closed");
};

// A user changes settings
settingsStorage.onchange = evt => {


  let data = {
    key: evt.key,
    newValue: evt.newValue,
  };
  sendVal(data);
};

// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`[Phone] Message received`);

  let event = evt.data.key;

  if (event == "PostSensorData") {
    
    geolocation.getCurrentPosition(function(position) {
      fetchData(position)
    })
    
    function fetchData (position) {
    let today = new Date();
    let time = today.toLocaleString()
    let UTC = today.getTime()
    let DATE = `${today.getFullYear()}_${today.getMonth()}_${today.getDate()}`
    let data = {
      value:evt.data.value,
      timestamp:time,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    sendVal({ key: 'LabelPostSensorData', newValue: 'Requesting...' });
    let user = ""
    try { user = JSON.parse(settingsStorage.getItem('user')).name} catch (err) {}
    let dbURL = ""
    try { dbURL = JSON.parse(settingsStorage.getItem('dbURL')).name} catch (err) {}
    let url = `${dbURL}/${user}/${DATE}/${UTC}.json`

    fetch(url, { method: "PUT", body: JSON.stringify(data) }).then(function (response) {
      sendVal({ key: 'LabelPostSensorDataResult', newValue: 'Last request completed at ' + time });
    });
  }
}
}