#include <Arduino.h>

// ============================================================
//  GeoGreen - Prototipo Arduino UNO
//  Mide el llenado de un contenedor con un sensor ultrasonico
//  HC-SR04 y lo muestra con un semaforo de LEDs + buzzer.
// ============================================================

// --- Pines ---
const int PIN_TRIG     = 9;   // Disparo del HC-SR04
const int PIN_ECHO     = 10;  // Eco del HC-SR04
const int PIN_VERDE    = 4;   // LED verde  -> nivel bajo
const int PIN_AMARILLO = 3;   // LED amarillo -> nivel medio
const int PIN_ROJO     = 2;   // LED rojo   -> nivel alto / lleno
const int PIN_BUZZER   = 8;   // Buzzer activo -> alerta de lleno

// --- Geometria del contenedor (en cm) ---
// Distancia del sensor (en la tapa) al fondo cuando esta VACIO.
const float DIST_VACIO = 100.0;  // -> 0 % de llenado
// Distancia del sensor al contenido cuando esta LLENO.
const float DIST_LLENO = 10.0;   // -> 100 % de llenado

// --- Umbrales del semaforo (% de llenado) ---
const int UMBRAL_MEDIO = 40;   // < 40 %  -> verde
const int UMBRAL_ALTO  = 80;   // >= 80 % -> rojo + buzzer

// Devuelve la distancia medida en cm (o DIST_VACIO si no hay eco).
float medirDistanciaCm() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  // Timeout de 30 ms (~5 m) para que pulseIn no bloquee si no hay eco.
  unsigned long duracion = pulseIn(PIN_ECHO, HIGH, 30000UL);
  if (duracion == 0) return DIST_VACIO;        // sin eco -> lo tratamos como vacio
  return duracion * 0.0343 / 2.0;              // velocidad del sonido / ida y vuelta
}

// Convierte una distancia en porcentaje de llenado (0-100).
int calcularLlenado(float distancia) {
  // Mientras mas cerca del sensor esta el contenido, mas lleno esta.
  float pct = (DIST_VACIO - distancia) * 100.0 / (DIST_VACIO - DIST_LLENO);
  if (pct < 0)   pct = 0;
  if (pct > 100) pct = 100;
  return (int)round(pct);
}

// Enciende el LED correspondiente y activa el buzzer si esta lleno.
// --- Alerta sonora: "pip pip" y luego silencio largo (no molesta) ---
const unsigned long INTERVALO_ALERTA_MS = 15UL * 60UL * 1000UL;  // repetir cada 15 min
unsigned long ultimaAlerta = 0;
bool alertaArmada = true;   // suena apenas se detecta "lleno"

// Emite dos beeps cortos: "pip pip".
void pipPip() {
  for (int i = 0; i < 2; i++) {
    tone(PIN_BUZZER, 2000);
    delay(120);
    noTone(PIN_BUZZER);
    delay(120);
  }
}

void mostrarEstado(int porcentaje) {
  bool amarillo = (porcentaje >= UMBRAL_MEDIO) && (porcentaje < UMBRAL_ALTO);
  bool rojo     = (porcentaje >= UMBRAL_ALTO);
  bool verde    = (porcentaje < UMBRAL_MEDIO);

  digitalWrite(PIN_VERDE,    verde    ? HIGH : LOW);
  digitalWrite(PIN_AMARILLO, amarillo ? HIGH : LOW);
  digitalWrite(PIN_ROJO,     rojo     ? HIGH : LOW);

  // Lleno: "pip pip" al detectarlo y luego cada 15 min. Al vaciarse se rearma.
  // tone() suena en Wokwi (buzzer pasivo) y en un buzzer activo real.
  if (rojo) {
    if (alertaArmada || (millis() - ultimaAlerta >= INTERVALO_ALERTA_MS)) {
      pipPip();
      ultimaAlerta = millis();
      alertaArmada = false;
    }
  } else {
    noTone(PIN_BUZZER);
    alertaArmada = true;
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_VERDE, OUTPUT);
  pinMode(PIN_AMARILLO, OUTPUT);
  pinMode(PIN_ROJO, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);
}

void loop() {
  float distancia = medirDistanciaCm();
  int   porcentaje = calcularLlenado(distancia);
  mostrarEstado(porcentaje);

  Serial.print("Distancia: ");
  Serial.print(distancia, 1);
  Serial.print(" cm  |  Llenado: ");
  Serial.print(porcentaje);
  Serial.println(" %");

  delay(500);
}
