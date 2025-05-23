
# 🌡️ Arduino Temperature Monitoring and Control Web App

## Overview
This project is a real-time, web-based temperature monitoring and control system built using an **Arduino UNO R4 WiFi**, **React Native (Web)**, and **Firebase**. It enables users to:
- View live temperature data from a DS18B20 sensor
- Control a Peltier module remotely via a web dashboard
- Log temperature data to Firebase Firestore
- Visualize historical trends using charts

## Features
- 🔐 User authentication with Firebase
- 📡 Real-time temperature data fetch from Arduino via REST API
- 🌬️ Remote control of Peltier module (cooling/heating)
- 📊 Data logging and historical charting via Firestore
- 💻 Fully responsive web interface built with React Native for Web

## Hardware Used
- Arduino UNO R4 WiFi
- DS18B20 Digital Temperature Sensor
- Peltier Module with Heat Sink and Fan
- N-channel MOSFET
- 12V Power Supply
- Jumper Wires and Breadboard

## Software Stack
| Layer          | Technology Used        |
|----------------|-------------------------|
| Frontend       | React Native (Expo Web) |
| Backend        | Firebase (Firestore + Auth) |
| Embedded       | Arduino IDE (C++)       |
| Communication  | HTTP REST API over WiFi |

## Project Structure
```
├── App/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── LoginScreen.js
│   │   └── HistoryScreen.js
│   ├── firebase.js
│   ├── App.js
├── Arduino/
│   └── temperature_monitor.ino
├── README.md
```

## Setup Instructions

### 🛠️ Arduino
1. Connect the DS18B20 to pin 2 and the MOSFET gate to pin 3.
2. Upload the `temperature_monitor.ino` sketch using Arduino IDE.
3. Note the local IP address shown in the Serial Monitor.

### 🌐 Web App
1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Replace Firebase config in `firebase.js` with your project credentials.
4. Run `npm start` to launch Expo Web.
5. Input your Arduino IP in the app and interact with the dashboard.

## Example API Endpoints
- GET `/temperature` → returns latest temperature
- GET `/peltier/on` → turns Peltier module ON
- GET `/peltier/off` → turns Peltier module OFF

## Screenshots
📌 _You can insert UI screenshots and circuit diagrams in this section._

## Limitations
- Currently supports web only due to Firebase-Hermes conflict on mobile.
- Arduino must remain on the same network as the client browser.
- IP must be manually entered in the dashboard.

## Future Improvements
- Enable mobile deployment
- Add threshold-based automation and push notifications
- Integrate cloud-based Arduino (via MQTT or HTTPS)

## License
MIT License
