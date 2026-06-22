// ============================================================
//  GeoGreen - Prototipo fisico (Arduino UNO R4 WiFi)
//  Mide el llenado de un contenedor con un HC-SR04 y lo muestra
//  con un semaforo de 3 LEDs + buzzer de alerta + pantalla OLED.
//
//  La medicion ultrasonica es ruidosa, asi que se filtra en varias capas:
//    1) mediana de N lecturas validas (descarta "sin eco" y picos),
//    2) anti-saltos: un cambio grande de golpe se ignora salvo que se REPITA
//       varios ciclos (asi un eco falso lejano no tira el valor a 0),
//    3) suavizado ADAPTATIVO de la distancia (estable quieto, rapido al mover),
//    4) deadband/enganche del % mostrado (no "baila" cuando la mano esta quieta),
//    5) histeresis de color (el LED no titila justo en los umbrales).
//
//  Al encender hace un AUTOTEST: prende verde -> amarillo -> rojo
//  uno por uno, para confirmar que los 3 LEDs estan bien cableados.
//
//  Cableado (protoboard, alimentado por USB):
//    HC-SR04: VCC->5V  GND->GND  Trig->D9  Echo->D10  (Echo directo: R4 es 5V)
//    LED rojo:     D2 -> resistencia -> anodo(+) ... catodo(-) -> GND
//    LED amarillo: D3 -> resistencia -> anodo(+) ... catodo(-) -> GND
//    LED verde:    D4 -> resistencia -> anodo(+) ... catodo(-) -> GND
//    Buzzer:  + -> D8     - -> GND
//    OLED:    GND->GND  VCC->5V  SDA->SDA  SCL->SCL  (I2C, dir 0x3C)
// ============================================================

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "ArduinoGraphics.h"     // debe ir ANTES que Arduino_LED_Matrix
#include "Arduino_LED_Matrix.h"
#include "TextAnimation.h"

// --- Pines ---
const int PIN_TRIG     = 9;   // Disparo del HC-SR04
const int PIN_ECHO     = 10;  // Eco del HC-SR04
const int PIN_VERDE    = 4;   // LED verde    -> nivel bajo
const int PIN_AMARILLO = 3;   // LED amarillo -> nivel medio
const int PIN_ROJO     = 2;   // LED rojo     -> nivel alto / lleno
const int PIN_BUZZER   = 8;   // Buzzer activo -> alerta de lleno

// --- Pantalla OLED 0.96" (128x64, I2C) ---
const int ANCHO_OLED = 128;
const int ALTO_OLED  = 64;
const uint8_t DIR_OLED = 0x3C;   // direccion I2C tipica de la SSD1306
Adafruit_SSD1306 oled(ANCHO_OLED, ALTO_OLED, &Wire, -1);
bool hayPantalla = false;        // se enciende en setup() si la OLED responde

// --- Matriz LED integrada: marca del proyecto desplazandose ---
// Corre asincrona (por interrupcion), asi no frena el sensor.
ArduinoLEDMatrix matrix;
TEXT_ANIMATION_DEFINE(marca, 140)            // buffer de frames (texto * 5 px)
const char TEXTO_MARCA[] = " GeoGreen   AIEP  ";
volatile bool marcaSiguiente = false;        // la pone el callback al terminar

void marcaCallback() { marcaSiguiente = true; }   // se ejecuta en IRQ: minimo

// (Re)lanza el desplazamiento de la marca; al terminar, el callback pide repetir.
void reproducirMarca() {
  matrix.beginText(0, 1, 0xFFFFFF);
  matrix.println(TEXTO_MARCA);
  matrix.endTextAnimation(SCROLL_LEFT, marca);
  matrix.loadTextAnimationSequence(marca);
  matrix.play();
}

// --- Geometria del contenedor (en cm) ---
// Rango de escritorio para demo: con la mano entre ~25 cm y ~3 cm se recorre
// todo el semaforo. Para un contenedor real, sube DIST_VACIO (p.ej. 100).
const float DIST_VACIO = 25.0;   // distancia sensor->fondo cuando esta VACIO -> 0 %
const float DIST_LLENO = 3.0;    // distancia sensor->contenido cuando esta LLENO -> 100 %

// --- Umbrales del semaforo (% de llenado) ---
const int UMBRAL_MEDIO = 40;   // < 40 %  -> verde
const int UMBRAL_ALTO  = 80;   // >= 80 % -> rojo + buzzer

// --- Perillas del filtrado (subir/bajar para tunear precision vs respuesta) ---
const int   N_MUESTRAS        = 7;     // lecturas por ciclo para sacar la mediana
const int   MIN_VALIDAS       = 3;     // minimo de lecturas validas para confiar en el ciclo
const float ALFA_MIN          = 0.05;  // suavizado cuando la mano esta quieta (muy estable)
const float ALFA_MAX          = 0.60;  // suavizado cuando la mano se mueve (rapido)
const float DELTA_RAPIDO      = 5.0;   // cm de cambio a partir del cual se usa ALFA_MAX
const float SALTO_MAX         = 6.0;   // cm: un cambio mayor a esto se considera sospechoso
const int   CONFIRMAR         = 3;     // ciclos seguidos para aceptar un salto grande
const float DEADBAND_PCT      = 1.5;   // el % mostrado solo cambia si se mueve mas que esto
const int   MARGEN_HISTERESIS = 3;     // zona muerta (%) alrededor de cada umbral de color

// --- Estado del filtro (se mantiene entre ciclos) ---
float distFiltrada   = DIST_VACIO;  // distancia suavizada (capa 2)
bool  primeraLectura = true;        // para arrancar clavado en la primera medida buena
float candidato      = 0.0;         // salto grande en evaluacion (capa "anti-salto")
int   confirmaciones = 0;           // cuantos ciclos seguidos lleva ese candidato
float pctMostrado    = 0.0;         // % enganchado por el deadband (capa 3)
int   estadoColor    = 0;           // 0=verde, 1=amarillo, 2=rojo (capa 4)
int   ultPctDibujado    = -1;       // ultimo % pintado en la OLED (para no redibujar de mas)
int   ultEstadoDibujado = -1;

// Una sola lectura del HC-SR04 en cm. Devuelve -1 si no hay eco o esta fuera de rango.
float pulsoCm() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  unsigned long duracion = pulseIn(PIN_ECHO, HIGH, 30000UL);  // timeout 30 ms (~5 m)
  if (duracion == 0) return -1.0;                 // sin eco
  float cm = duracion * 0.0343 / 2.0;             // velocidad del sonido / ida y vuelta
  if (cm > 400.0) return -1.0;                    // fuera del rango util del sensor
  return cm;
}

// Capa 1: toma N lecturas, descarta las invalidas (-1) y devuelve la MEDIANA de
// las validas (robusta ante picos). Devuelve -1 si hubo muy pocas validas: en ese
// caso no confiamos en este ciclo y se mantiene el ultimo valor bueno.
float medirDistancia() {
  float v[N_MUESTRAS];
  int n = 0;
  for (int i = 0; i < N_MUESTRAS; i++) {
    float d = pulsoCm();
    if (d > 0) v[n++] = d;
    delay(8);
  }
  if (n < MIN_VALIDAS) return -1.0;

  // Ordena las validas (insertion sort; n es chico).
  for (int i = 1; i < n; i++) {
    float clave = v[i];
    int j = i - 1;
    while (j >= 0 && v[j] > clave) { v[j + 1] = v[j]; j--; }
    v[j + 1] = clave;
  }
  return v[n / 2];   // mediana
}

// Convierte una distancia en porcentaje de llenado (0-100, en float).
float calcularLlenado(float distancia) {
  float pct = (DIST_VACIO - distancia) * 100.0 / (DIST_VACIO - DIST_LLENO);
  if (pct < 0)   pct = 0;
  if (pct > 100) pct = 100;
  return pct;
}

// Capa 4: estado de color con histeresis. Sube de nivel en umbral+MARGEN y baja
// en umbral-MARGEN, dejando una zona muerta que evita el parpadeo en los bordes.
int calcularEstado(int actual, int pct) {
  switch (actual) {
    case 0:  // verde
      if (pct >= UMBRAL_ALTO  + MARGEN_HISTERESIS) return 2;
      if (pct >= UMBRAL_MEDIO + MARGEN_HISTERESIS) return 1;
      break;
    case 1:  // amarillo
      if (pct >= UMBRAL_ALTO  + MARGEN_HISTERESIS) return 2;
      if (pct <  UMBRAL_MEDIO - MARGEN_HISTERESIS) return 0;
      break;
    case 2:  // rojo
      if (pct <  UMBRAL_MEDIO - MARGEN_HISTERESIS) return 0;
      if (pct <  UMBRAL_ALTO  - MARGEN_HISTERESIS) return 1;
      break;
  }
  return actual;
}

// --- Alerta sonora: "pip pip" al llenarse y luego cada 5 min (no molesta) ---
const unsigned long INTERVALO_ALERTA_MS = 5UL * 60UL * 1000UL;
unsigned long ultimaAlerta = 0;
bool alertaArmada = true;

void pipPip() {
  for (int i = 0; i < 2; i++) {
    tone(PIN_BUZZER, 2000);
    delay(120);
    noTone(PIN_BUZZER);
    delay(120);
  }
}

// Palabra de estado segun el color (mismo criterio que los LEDs).
const char* etiquetaEstado(int estado) {
  if (estado == 2) return "LLENO";
  if (estado == 1) return "MEDIO";
  return "OK";
}

// Enciende el LED del estado y maneja el buzzer (solo suena en rojo).
void mostrarEstado(int estado) {
  digitalWrite(PIN_VERDE,    estado == 0 ? HIGH : LOW);
  digitalWrite(PIN_AMARILLO, estado == 1 ? HIGH : LOW);
  digitalWrite(PIN_ROJO,     estado == 2 ? HIGH : LOW);

  if (estado == 2) {
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

// Dibuja en la OLED: titulo, porcentaje grande, estado y barra de llenado.
// Solo redibuja si cambio el % o el estado (evita parpadeo y trabajo inutil).
void dibujarPantalla(int pct, int estado) {
  if (!hayPantalla) return;
  if (pct == ultPctDibujado && estado == ultEstadoDibujado) return;
  ultPctDibujado    = pct;
  ultEstadoDibujado = estado;

  oled.clearDisplay();

  // Titulo + estado
  oled.setTextSize(1);
  oled.setTextColor(SSD1306_WHITE);
  oled.setCursor(0, 0);
  oled.print("GeoGreen");
  oled.setCursor(86, 0);
  oled.print(etiquetaEstado(estado));

  // Porcentaje grande
  oled.setTextSize(3);
  oled.setCursor(24, 18);
  oled.print(pct);
  oled.print("%");

  // Barra de llenado
  int w = (int)(pct * 1.24);            // 0..100 -> 0..124 px
  oled.drawRect(2, 50, 124, 12, SSD1306_WHITE);
  oled.fillRect(2, 50, w, 12, SSD1306_WHITE);

  oled.display();
}

// Autotest de arranque: enciende cada LED 1 s para verificar el cableado.
void autotestLEDs() {
  const int pines[3] = {PIN_VERDE, PIN_AMARILLO, PIN_ROJO};
  for (int i = 0; i < 3; i++) {
    digitalWrite(pines[i], HIGH);
    delay(800);
    digitalWrite(pines[i], LOW);
    delay(200);
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

  // Marca en la matriz: arranca a desplazarse en segundo plano (no bloquea).
  matrix.begin();
  matrix.beginDraw();
  matrix.stroke(0xFFFFFFFF);
  matrix.textFont(Font_5x7);
  matrix.textScrollSpeed(65);
  matrix.setCallback(marcaCallback);
  reproducirMarca();

  // La pantalla es opcional: si no responde, el resto sigue funcionando.
  hayPantalla = oled.begin(SSD1306_SWITCHCAPVCC, DIR_OLED);
  if (hayPantalla) {
    oled.clearDisplay();
    oled.setTextSize(2);
    oled.setTextColor(SSD1306_WHITE);
    oled.setCursor(8, 24);
    oled.print("GeoGreen");
    oled.display();
    delay(800);
  }

  autotestLEDs();   // verde -> amarillo -> rojo, uno por uno
}

void loop() {
  // Mantiene la marca en bucle: al terminar un pase, lanza el siguiente.
  if (marcaSiguiente) {
    marcaSiguiente = false;
    reproducirMarca();
  }

  // Capa 1: mediana de lecturas validas (o -1 si hubo muy pocas).
  float m = medirDistancia();

  if (m > 0) {
    if (primeraLectura) {
      distFiltrada = m;                 // arranca clavado en la primera medida buena
      primeraLectura = false;
    } else {
      float delta = fabs(m - distFiltrada);
      if (delta <= SALTO_MAX) {
        // Cambio razonable: suavizado adaptativo (alfa segun cuanto cambio).
        float alfa = ALFA_MIN + (ALFA_MAX - ALFA_MIN) * constrain(delta / DELTA_RAPIDO, 0.0, 1.0);
        distFiltrada += alfa * (m - distFiltrada);
        confirmaciones = 0;             // se acabo cualquier salto en evaluacion
      } else {
        // Salto grande y sospechoso: solo lo aceptamos si se REPITE varios ciclos.
        if (fabs(m - candidato) <= SALTO_MAX) confirmaciones++;
        else { candidato = m; confirmaciones = 1; }
        if (confirmaciones >= CONFIRMAR) {   // se confirmo: es un cambio real
          distFiltrada = m;
          confirmaciones = 0;
        }
        // si no se confirma, distFiltrada se mantiene (no salta a la basura)
      }
    }
  }
  // si m <= 0 (muy pocas lecturas validas): se mantiene el ultimo valor bueno

  // Capa 3: % con deadband/enganche -> queda clavado cuando la mano no se mueve.
  float pctObjetivo = calcularLlenado(distFiltrada);
  if (fabs(pctObjetivo - pctMostrado) >= DEADBAND_PCT) pctMostrado = pctObjetivo;
  int pct = (int)round(pctMostrado);

  // Capa 4: estado de color con histeresis.
  estadoColor = calcularEstado(estadoColor, pct);

  mostrarEstado(estadoColor);
  dibujarPantalla(pct, estadoColor);

  Serial.print("Distancia: ");
  Serial.print(distFiltrada, 1);
  Serial.print(" cm  |  Llenado: ");
  Serial.print(pct);
  Serial.println(" %");

  delay(30);
}
