import document from 'document'
import * as messaging from "messaging";
import { vibration } from "haptics";

let LabelisSend = document.getElementById("isSend");
LabelisSend.text = "Firebase: not Connected";

// Message socket opens
messaging.peerSocket.onopen = () => {
    console.log("[App] Socket open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
    console.log("[App] Socket closed");
};

// Message is received
messaging.peerSocket.onmessage = evt => {
  if (evt.data.key == 'LabelPostSensorDataResult'){
    LabelisSend.text = "Firebase: Connected";
    LabelisSend.class = "isSend";
    setTimeout(function (){
      LabelisSend.text = "Firebase: not Connected";
      LabelisSend.class = "isSendFalse";
    }, 5500)
  }
    
    let label = document.getElementById(evt.data.key);
    label.text = evt.data.newValue;
};

// Send data to Phone using Messaging API
export function sendVal(data) {
    // console.log("[App] Message being sent");
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);               
    }
}

//Check the connection and give vibration
setInterval(function(){
  let ZeroCheck = 1;
  let FirstCheck = 1;
  let SecondCheck = 1;
  let ThirdCheck = 1;
  let ForthCheck = 1;
  // 0
  if (LabelisSend.text == "Firebase: not Connected"){
    ZeroCheck = 0;
  }
  // 2000
  setTimeout(function(){
    if (LabelisSend.text == "Firebase: not Connected"){
      FirstCheck = 0;
    }
  },2100)
  // 4000
  setTimeout(function(){
    if (LabelisSend.text == "Firebase: not Connected"){
      SecondCheck = 0;
    }
  },4100)
  // 6000
  setTimeout(function(){
    if (LabelisSend.text == "Firebase: not Connected"){
      ThirdCheck = 0;
    }
  },6100)
  // 8000 and check
  setTimeout(function(){
    if (LabelisSend.text == "Firebase: not Connected"){
      ForthCheck = 0;
    }
    if (ZeroCheck + FirstCheck + SecondCheck + ThirdCheck + ForthCheck== 0){
      vibration.start("ring");
    }
  },8100)
},10000)