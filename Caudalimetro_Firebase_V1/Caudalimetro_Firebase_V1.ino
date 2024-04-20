/* LIBRERIAS */
#include <WiFi.h>
#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"


/* CREDENCIALES */
// Red Wifi
#define WIFI_SSID "MEGACABLE-2.4G-18A5"
#define WIFI_PASSWORD "77ZDgpaTuM"
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

unsigned long sendDataPrevMillis = 0;

void sendData(String path, float value) {
  if (Firebase.ready() && (millis() - sendDataPrevMillis > 3000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    // Mandar los datos
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
    Serial.println("Failed to Connect");
    return false;
  }

  Serial.println("Connected Correctly");
  Serial.println(WiFi.localIP());
  return true;
}


// MEDICIONES DE AGUA
volatile int NumPulsos; //variable para la cantidad de pulsos recibidos
float factor_conversion=7.5; //para convertir de frecuencia a caudal

float frecuencia; //Frecuencia de los pulsos en Hz
float caudal_L_m; //Caudal en L/m
float caudal_L_s; // Caudal en L/s

float aguaConsumida = 0;

/* OBTENCIÓN DEL CAUDAL DE AGUA */

  //---Función que se ejecuta en interrupción
void ContarPulsos ()
{ 
  NumPulsos++;  //incrementamos la variable de pulsos
} 

  //---Función para obtener frecuencia de los pulsos
int ObtenerFrecuencia() 
{
  int frecuencia;
  NumPulsos = 0;   //Ponemos a 0 el número de pulsos
  interrupts();    //Habilitamos las interrupciones
  // Mandar datos
  sendData("sensores/sensor_1", aguaConsumida);
  delay(1000);   //muestra de 1 segundo
  noInterrupts(); //Desabilitamos las interrupciones
  frecuencia=NumPulsos; //Hz(pulsos por segundo)
  return frecuencia;
}

/* -------- */

unsigned long tiempoSumarConsumo = 0;

// Suma el agua consumida por cada segundo en el que hay flujo de agua
void obtenerConsumo() {
  // Si hay caudal
  if(caudal_L_m > 0) {
    // Si ha pasado 1 segundo, suma
    if (millis() - tiempoSumarConsumo > 1000 || tiempoSumarConsumo == 0){
      tiempoSumarConsumo = millis();
      aguaConsumida += caudal_L_s;
    }

    return;
  }

  tiempoSumarConsumo = 0;
}

void setup()
{
  // Inicializar Monitor Serial
  Serial.begin(115200); 

  // Pin de recopilación de datos del caudalimetro 
  attachInterrupt(digitalPinToInterrupt(27), ContarPulsos, RISING);

  // Conectarse a la red WiFi
  isConnected = connectToWifi();

  // Asignar credenciales de Firebase
  config.api_key = API_KEY;

  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  config.database_url = DATABASE_URL;

  // Iniciar conexión a Firebase
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop ()    
{
  /* FUNCION PARA OBTENER EL CAUDAL */

  frecuencia = ObtenerFrecuencia(); //obtenemos la Frecuencia de los pulsos en Hz
  caudal_L_m = frecuencia/factor_conversion; //calculamos el caudal en L/m
  caudal_L_s = caudal_L_m/60; //calculamos el caudal en L/s

  /* ------------ */

  // Sumar costantemente el Agua Consumida
  obtenerConsumo();

  Serial.print(aguaConsumida);
  Serial.println(" L");
}

