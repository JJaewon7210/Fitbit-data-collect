import document from "document";
import * as messaging from "../messaging/";
import { HeartRateSensor } from "heart-rate";
import { Accelerometer } from "accelerometer";
import { Barometer } from "barometer";
import { display } from "display";
import { Gyroscope } from "gyroscope";
import { me } from "appbit";


// Disable app timeout
if (me.appTimeoutEnabled) {
  me.appTimeoutEnabled = false;
  console.log("--Infinite Running--");
}

// Buttons
let ButtonPostSensorData = document.getElementById("ButtonPostSensorData");
let LabelPostSensorData = document.getElementById("LabelPostSensorData");
let LabelPostSensorDataResult = document.getElementById("isSend");

// Labels

let LabelAccelerometerx = document.getElementById("LabelAccelerometerx");
let LabelAccelerometery = document.getElementById("LabelAccelerometery");
let LabelAccelerometerz = document.getElementById("LabelAccelerometerz");
let LabelGyroscopex = document.getElementById("LabelGyroscopex");
let LabelGyroscopey = document.getElementById("LabelGyroscopey");
let LabelGyroscopez = document.getElementById("LabelGyroscopez");
let LabelHeartRate = document.getElementById("LabelHeartRate");
let LabelBarometer = document.getElementById("LabelBarometer");


const accel = new Accelerometer({frequency: 4});
const gyro  = new Gyroscope({frequency: 4})
const hrm   = new HeartRateSensor({frequency: 1})
const baro  = new Barometer({frequency: 1})

var accelerometerx_text = ''
var accelerometery_text = ''
var accelerometerz_text = ''
var gyroscopex_text = ''
var gyroscopey_text = ''
var gyroscopez_text = ''
var heartrate_text = ''
var barometer_text = ''

var i = 0;
let timer = null;
const sendMessageInterval = 6;
// sendMessageInterval(sec) * frequency = 24이 최대인가

function sendMessage() {
  if (Accelerometer) {
    accel.start()
    accel.addEventListener("reading", () => {
      LabelAccelerometerx.text = `${accel.x.toFixed(2)} `;
      LabelAccelerometery.text = `${accel.y.toFixed(2)} `;
      LabelAccelerometerz.text = `${accel.z.toFixed(2)} `;
      accelerometerx_text += `${accel.x.toFixed(2)} `;
      accelerometery_text += `${accel.y.toFixed(2)} `;
      accelerometerz_text += `${accel.z.toFixed(2)} `;
    }
    )
  }

  if (Gyroscope) {
    gyro.start()
    gyro.addEventListener("reading", () => {
      LabelGyroscopex.text = `${gyro.x.toFixed(2)} `
      LabelGyroscopey.text = `${gyro.y.toFixed(2)} `
      LabelGyroscopez.text = `${gyro.z.toFixed(2)} `
      gyroscopex_text += `${gyro.x.toFixed(2)} `
      gyroscopey_text += `${gyro.y.toFixed(2)} `
      gyroscopez_text += `${gyro.z.toFixed(2)} `
    }
    )
  }

  if (HeartRateSensor) {
    hrm.start()
    hrm.addEventListener("reading", () => {
      LabelHeartRate.text = `${hrm.heartRate} `;
      heartrate_text     += `${hrm.heartRate} `;
    }
    )
  }

  if (Barometer) {
    baro.start()
    baro.addEventListener("reading", () => {
      LabelBarometer.text = `${baro.pressure} `;
      barometer_text     += `${baro.pressure} `;
      i++
      if (i > sendMessageInterval) {
        i = 0
        accelerometerx_text = ''
        accelerometery_text = ''
        accelerometerz_text = ''
        gyroscopex_text = ''
        gyroscopey_text = ''
        gyroscopez_text = ''
        heartrate_text = ''
        barometer_text = ''
      }
      if (i % sendMessageInterval == 0) {
        // reset data and send message
        messaging.sendVal({
          key: "PostSensorData",
          value: {
            accelerometer_x: accelerometerx_text,
            accelerometer_y: accelerometery_text,
            accelerometer_z: accelerometerz_text,
            gyroscope_x: gyroscopex_text,
            gyroscope_y: gyroscopey_text,
            gyroscope_z: gyroscopez_text,
            heartrate: heartrate_text,
            barometer: barometer_text
          }
        })
        i = 0
        accelerometerx_text = ''
        accelerometery_text = ''
        accelerometerz_text = ''
        gyroscopex_text     = ''
        gyroscopey_text     = ''
        gyroscopez_text     = ''
        heartrate_text      = ''
        barometer_text      = ''

      }

    }
    )
  }
}

export function populateResultLabel(value) {
  LabelPostSensorDataResult.text = value;
}

export function initialiseComponents() {
  sendMessage();
}
