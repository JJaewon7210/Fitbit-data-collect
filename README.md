# Fitbit-data-collect
Fitbit sensor (GPS, Heartrate, Barometer, Gyroscope, Accelerometer) monitoring app

- fetch data to HTTPS json database (ex.firebase) automatically

- Free!! you can change this app for developing your own app.

- Downlaod: https://gallery.fitbit.com/details/56ee59c0-769a-4bfc-a76f-fed6133f393d

- Configuration setting

- dbURL: example>> https://xxxxxxxx-default-rtdb.firebaseio.com

- user name: example>>JeoungJaewon

<img src="https://user-images.githubusercontent.com/96426723/146898105-aecf44a6-73b3-40ea-b902-9b2ca99c3c40.png" width="40%">

- json Structure example

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

            },

            "1637559550674" : {

              "latitude" : 37.56227040077878,

              "longitude" : 126.9364415420644,

              "timestamp" : "2021. 11. 22. 오후 2:39:10",

              "value" : {

                "accelerometer_x" : "0.93 0.84 1.01 1.03 0.90 0.97 0.94 0.92 0.85 0.68 0.72 -0.20 1.61 5.76 4.03 3.77 5.57 6.58 1.32 0.08 1.03 0.38 0.84 1.89 ",

                "accelerometer_y" : "2.66 2.77 2.79 2.75 2.85 2.71 2.67 2.69 2.77 2.94 3.01 4.79 2.84 0.61 0.98 1.78 0.30 8.73 10.29 11.29 8.11 1.59 16.02 6.56 ",

                "accelerometer_z" : "9.46 9.43 9.52 9.33 9.33 9.40 9.57 9.48 9.42 9.50 9.68 8.21 6.96 8.93 8.33 8.29 8.53 4.08 -0.52 -4.13 2.01 10.18 3.76 5.90 ",

                "barometer" : "101124 101124 101132 101127 101125 101131 ",

                "gyroscope_x" : "-0.02 0.03 0.01 0.02 0.00 -0.03 -0.01 -0.01 0.04 0.16 0.03 0.56 -0.23 0.28 -0.08 -0.49 1.15 2.80 -4.40 0.15 -3.31 1.81 0.94 ",

                "gyroscope_y" : "-0.04 0.01 -0.03 0.06 0.07 -0.03 -0.04 -0.05 0.03 -0.04 -0.15 -0.38 0.22 0.55 0.65 -1.59 -3.38 -5.63 1.32 -1.35 -0.06 -0.57 -0.40 ",

                "gyroscope_z" : "-0.02 0.01 -0.00 0.02 0.01 -0.01 -0.01 -0.01 -0.01 -0.03 0.15 -0.09 -0.39 0.32 -0.47 -1.31 -2.00 -3.94 -1.49 0.74 0.76 -1.20 -0.29 ",

                "heartrate" : "73 75 75 76 77 "

              }

            }

        }
        

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
