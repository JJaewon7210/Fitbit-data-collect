# Fitbit-data-collect
Fitbit sensor application for collecting data (GPS, Heartrate, Barometer, Gyroscope, Accelerometer)

- fetch data to HTTPS json database (ex.firebase) automatically

- Free!! you can change this app for developing your own app.

- Downlaod: https://gallery.fitbit.com/details/56ee59c0-769a-4bfc-a76f-fed6133f393d

<img src="https://user-images.githubusercontent.com/96426723/146900568-b8ca1e7e-b822-4134-a386-d7b9fa5d2863.png" width="30%">


### Configuration setting
> dbURL: example>> https://xxxxxxxx-default-rtdb.firebaseio.com
> 
> user name: example>>JeoungJaewon

<img src="https://user-images.githubusercontent.com/96426723/146898105-aecf44a6-73b3-40ea-b902-9b2ca99c3c40.png" width="30%">

- json Structure example

```json

"name":{
  "2021_10_22" : {

    "1637559542006" : { #time

      "latitude" : 37.56227893540608,

      "longitude" : 126.93642697886477, 

      "timestamp" : "2021. 11. 22. 오후 2:39:02", #localtime

      "value" : {

        "accelerometer_x" : "2.01 1.96 0.84 1.15 1.10 0.95 0.97 1.01 0.92 1.00 1.08 0.96 0.96 1.00 0.95 0.92 0.85 0.89 0.98 ",

        "accelerometer_y" : "2.00 2.55 2.62 2.58 2.59 2.61 2.65 2.60 2.83 2.69 2.69 2.73 2.57 2.76 2.49 2.64 2.58 2.71 2.70 ",

        "accelerometer_z" : "9.12 9.47 9.64 9.61 9.63 9.36 9.26 9.38 9.55 9.33 9.19 9.27 9.31 9.27 9.45 9.51 9.31 9.56 9.42 ",

        "barometer" : "101117 101119 101117 101121 101122 101123 ",

        "gyroscope_x" : "-0.01 0.05 -0.01 -0.04 -0.00 -0.00 0.03 0.01 0.02 0.03 0.07 0.01 -0.06 -0.05 -0.01 0.01 0.02 -0.00 0.01 ",

        "gyroscope_y" : "0.21 0.02 -0.01 -0.04 -0.02 -0.06 0.14 -0.05 -0.08 0.13 0.15 0.04 0.02 -0.05 -0.06 0.02 -0.04 -0.08 0.01 ",

        "gyroscope_z" : "0.01 -0.02 0.03 0.02 -0.02 -0.01 0.00 0.02 -0.02 -0.01 0.00 -0.01 0.01 -0.01 0.00 -0.00 -0.01 -0.02 -0.05 ",

        "heartrate" : "71 71 72 72 73 73 "

      }
    }
}
```

### Stupid things : alarm disconnection with server

I am new to javascript with this project.
To alarm the disconnection with server, I add the simple 'for' script below.

It check the disconnection with server every 10 seconds. 

If the watch vibrates when using this app, it means you have to check follow things
- (i) internet connection, 
- (ii) pairing with mobile phone and fitibit 
- (iii) correct dbURL in Configuration setting

```javascript
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
```
