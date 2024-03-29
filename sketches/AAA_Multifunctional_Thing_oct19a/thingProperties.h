// Code generated by Arduino IoT Cloud, DO NOT EDIT.

#include <ArduinoIoTCloud.h>
#include <Arduino_ConnectionHandler.h>

const char DEVICE_LOGIN_NAME[]  = "YOUR_DEVICE_ID";

const char SSID[]               = SECRET_SSID;    // Network SSID (name)
const char PASS[]               = SECRET_OPTIONAL_PASS;    // Network password (use for WPA, or use as key for WEP)
const char DEVICE_KEY[]  = SECRET_DEVICE_KEY;    // Secret device password

void onBuzzerChange();

String logMessage;
float humidity;
int distance;
int distance_threshold;
bool buzzer;

void initProperties(){

  ArduinoCloud.setBoardId(DEVICE_LOGIN_NAME);
  ArduinoCloud.setSecretDeviceKey(DEVICE_KEY);
  ArduinoCloud.addProperty(logMessage, READ, ON_CHANGE, NULL);
  ArduinoCloud.addProperty(humidity, READ, ON_CHANGE, NULL);
  ArduinoCloud.addProperty(distance, READ, ON_CHANGE, NULL);
  ArduinoCloud.addProperty(distance_threshold, READ, ON_CHANGE, NULL);
  ArduinoCloud.addProperty(buzzer, READWRITE, ON_CHANGE, onBuzzerChange);

}

WiFiConnectionHandler ArduinoIoTPreferredConnection(SSID, PASS);
