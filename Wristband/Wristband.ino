#include <Wire.h> 
#include <Adafruit_MLX90614.h>

#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

/* CREDENCIALES */
// Red Wifi
/* #define WIFI_SSID "MEGACABLE-2.4G-18A5"
#define WIFI_PASSWORD "77ZDgpaTuM" */
#define WIFI_SSID "ESP32"
#define WIFI_PASSWORD "Access18"
#define WIFI_TIMEOUT_MS 10000
bool isConnected = false;

// Firebase Realtime Database
#define API_KEY "AIzaSyCTmRH6aLIM9vpYyFk82sH8sF6foG8rHdg"
#define DATABASE_URL "https://watercarestesting-default-rtdb.firebaseio.com/" 

// Firebase User
#define USER_EMAIL "enriquez.emiliano16@outlook.com"
#define USER_PASSWORD "$Fire.En24"


/* OBJETOS */
// Define firebase database objecto
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Define objeto del sensor de temperaturas
Adafruit_MLX90614 mlx = Adafruit_MLX90614();

unsigned long sendDataPrevMillis = 0;

void sendData(String path, float value) {
  if (Firebase.ready() && (millis() - sendDataPrevMillis > 2000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    // Enviar los datos
    if (Firebase.RTDB.setInt(&fbdo, path, value)){
      Serial.println("Dato enviado correctamente");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("Fallo al enviar el dato");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  }
}

unsigned long sendDataPrevMillis2 = 0;

float getData(String path) {
  if (Firebase.ready() && (millis() - sendDataPrevMillis2 > 500 || sendDataPrevMillis2 == 0)){
    sendDataPrevMillis2 = millis();

    Serial.println(Firebase.RTDB.getInt(&fbdo, path));
    // Recivir los datos
    if (Firebase.RTDB.getInt(&fbdo, path)){
      Serial.println("PATH: " + fbdo.dataPath());
      // Serial.println("TYPE: " + fbdo.dataType());
      return fbdo.floatData();
    }
    else {
      Serial.println("Fallo al enviar el dato");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  }
}

bool connectToWifi() {
  Serial.print("Connecting to Wifi");
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  unsigned long startAttempTime = millis();

  while(WiFi.status() != WL_CONNECTED && millis() - startAttempTime < WIFI_TIMEOUT_MS) {
    Serial.print(".");
    delay(100);
  }

  if(WiFi.status() != WL_CONNECTED) {
    Serial.println("");
    Serial.println("Failed to Connect");
    return false;
  }

  Serial.println("");
  Serial.println("Connected Correctly");
  Serial.println(WiFi.localIP());
  return true;
}

void setup() {
  Serial.begin(9600);
  while (!Serial);

  pinMode(8, OUTPUT); // aMARILLO
  pinMode(9, OUTPUT); // vERDE

  Serial.println("Adafruit MLX90614 test");

  // Conectarse a la red WiFi
  isConnected = connectToWifi();

  if(isConnected) {
    Wire.begin(6, 7);

    if (!mlx.begin()) {
      Serial.println("Error connecting to MLX sensor. Check wiring.");
      while (1);
    };

    Serial.print("Emissivity = "); Serial.println(mlx.readEmissivity());
    Serial.println("================================================");

    // Asignar credenciales de Firebase
    config.api_key = API_KEY;

    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;

    config.database_url = DATABASE_URL;

    // Iniciar conexión a Firebase
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
  } else {
    Serial.println("FATAL ERROR");
  }
}

void loop() {
  Serial.print("Ambient = "); Serial.print(mlx.readAmbientTempC());
  Serial.print("*C\tObject = "); Serial.print(mlx.readObjectTempC()); Serial.println("*C");

  float data = getData("flow/water_flow");
  Serial.print("Flujo: ");
  Serial.println(data);

  if(data > 0.15) {
    if (mlx.readObjectTempC() < mlx.readAmbientTempC()) {
      Serial.println("");
      Serial.println("====================================================");
      Serial.println("Using Water...............");
      Serial.println("====================================================");
      Serial.println("");
      delay(350);
    }
  }

  if(mlx.readObjectTempC() < mlx.readAmbientTempC()) {
    digitalWrite(9, HIGH);
    digitalWrite(8, LOW);
  } else if (mlx.readObjectTempC() > mlx.readAmbientTempC()) {
    digitalWrite(9, LOW);
    digitalWrite(8, HIGH);
  }

  Serial.println();
  delay(100);
  
}