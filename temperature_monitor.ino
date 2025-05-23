#include <WiFiS3.h>
#include <OneWire.h>
#include <DallasTemperature.h>


// --- WiFi Credentials ---
char ssid[] = "Three_000933";           // your WiFi network SSID
char pass[] = "75mBb4R68i2";            // your WiFi network password

// --- Web Server ---
WiFiServer server(80);

// --- Temperature Sensor (DS18B20) ---
#define ONE_WIRE_BUS 2                  // GPIO pin for DS18B20
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// --- Peltier Module Control ---
#define PELTIER_PIN 3                   // Digital pin to control Peltier
bool peltierState = false;

void setup() {
  Serial.begin(9600);
  delay(1000);
  
  // Start Temperature Sensor
  sensors.begin();
  Serial.print("Found ");
  Serial.print(sensors.getDeviceCount());
  Serial.println(" DS18B20 sensor(s).");

  pinMode(PELTIER_PIN, OUTPUT);
  digitalWrite(PELTIER_PIN, LOW); // Start OFF

  // Connect to WiFi
  WiFi.begin(ssid, pass);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.begin();
}

void loop() {
  WiFiClient client = server.available();
  if (!client) return;

  String request = client.readStringUntil('\r');
  client.flush();

  // Read temperature
  sensors.requestTemperatures();
  float temp = sensors.getTempCByIndex(0);
  Serial.print("Temp read: ");
  Serial.println(temp);


  // Respond to endpoints
  if (request.indexOf("/temperature") >= 0) {
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: application/json");
    client.println("Access-Control-Allow-Origin: *");
    client.println();
    client.print("{\"temperature\":");
    client.print(temp);
    client.println("}");

  } else if (request.indexOf("/peltier/on") >= 0) {
    digitalWrite(PELTIER_PIN, HIGH);
    peltierState = true;
    client.println("HTTP/1.1 200 OK");
    client.println("Access-Control-Allow-Origin: *");
    client.println();
    client.println("Peltier ON");

  } else if (request.indexOf("/peltier/off") >= 0) {
    digitalWrite(PELTIER_PIN, LOW);
    peltierState = false;
    client.println("HTTP/1.1 200 OK");
    client.println("Access-Control-Allow-Origin: *");
    client.println();
    client.println("Peltier OFF");

  } else {
    client.println("HTTP/1.1 404 Not Found");
    client.println("Access-Control-Allow-Origin: *");
    client.println();
    client.println("Not Found");
  }

  delay(10); // slight delay for stability
  client.stop();
}
