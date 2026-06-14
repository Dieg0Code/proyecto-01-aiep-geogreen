/*
 * GeoGreen Show - demo cinematografica para la matriz LED 12x8 (UNO R4 WiFi)
 * =========================================================================
 * Corre SOLO con la matriz integrada + USB (sin sensores ni protoboard).
 * Cuenta la historia del producto GeoGreen en ~25-30s, en bucle:
 *
 *   1. sceneSonar()     - el HC-SR04 midiendo: arcos que bajan y rebotan.
 *   2. sceneWaveFill()  - el contenedor llenandose, superficie con ola.
 *   3. sceneFullAlert() - "LLENO": latido de alerta + ondas WiFi (transmite).
 *   4. sceneGeoPin()    - un pin de mapa cae y rebota; cierra "GeoGreen" + hoja.
 *
 * TRUCO VISUAL: la matriz es binaria (LED prendido/apagado), pero simulamos
 * 8 niveles de BRILLO con Binary Code Modulation (BCM): mantenemos un buffer
 * gray[8][12] con niveles 0..7 y, desde loop(), reescribimos el framebuffer
 * por planos de bits con tiempos ponderados (1,2,4). El ojo integra y ve
 * grises -> fundidos suaves y movimiento "anti-aliased".
 *
 * Placa: Arduino UNO R4 WiFi (FQBN arduino:renesas_uno:unor4wifi). Flasheo USB.
 * Cuando llegue el HC-SR04, sceneWaveFill se alimentara de la distancia real.
 */

#include <math.h>
#include "ArduinoGraphics.h"
#include "Arduino_LED_Matrix.h"

ArduinoLEDMatrix matrix;

// ---- geometria de la matriz ----
static const int W = 12;   // ancho (x: 0..11)
static const int H = 8;    // alto  (y: 0..7)
static const uint8_t MAXL = 7;  // nivel de brillo maximo (3 bitplanes)

// ---- buffers ----
uint8_t gray[H][W];        // niveles 0..7 que "dibujan" las escenas
uint8_t bin[H][W];         // subframe binario que se manda a la matriz (BCM)

// Unidad de tiempo del BCM en microsegundos. Subir = mas brillo/estable,
// bajar = menos parpadeo. Se afina mirando la matriz.
#define BCM_UNIT 200

// =====================  MOTOR DE GRISES (BCM)  =====================

void clearGray() {
  for (int y = 0; y < H; y++)
    for (int x = 0; x < W; x++) gray[y][x] = 0;
}

inline void setPx(int x, int y, int level) {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  if (level < 0) level = 0;
  if (level > MAXL) level = MAXL;
  if (level > gray[y][x]) gray[y][x] = level;   // modo "max": no pisa lo mas brillante
}

inline void putPx(int x, int y, int level) {     // pisa siempre
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  if (level < 0) level = 0;
  if (level > MAXL) level = MAXL;
  gray[y][x] = level;
}

// Atenua todo el buffer (para dejar estelas / colas de movimiento).
void fadeBuffer(uint8_t amount) {
  for (int y = 0; y < H; y++)
    for (int x = 0; x < W; x++)
      gray[y][x] = (gray[y][x] > amount) ? gray[y][x] - amount : 0;
}

// Muestra gray[][] durante 'ms' refrescando los 3 bitplanes (BCM).
void render(uint16_t ms) {
  static const uint16_t planeUs[3] = { BCM_UNIT, BCM_UNIT * 2, BCM_UNIT * 4 };
  uint32_t t0 = millis();
  do {
    for (uint8_t b = 0; b < 3; b++) {
      for (int y = 0; y < H; y++)
        for (int x = 0; x < W; x++)
          bin[y][x] = (gray[y][x] >> b) & 1;
      matrix.renderBitmap(bin, H, W);
      delayMicroseconds(planeUs[b]);
    }
  } while ((millis() - t0) < ms);
}

// Funde gray[][] a negro en 'ms' (transicion entre escenas).
void fadeOut(uint16_t ms) {
  for (int step = MAXL; step >= 0; step--) {
    for (int y = 0; y < H; y++)
      for (int x = 0; x < W; x++)
        if (gray[y][x] > 0) gray[y][x] = step < gray[y][x] ? step : gray[y][x];
    render(ms / (MAXL + 1));
  }
  clearGray();
}

// =====================  TEXTO EN GRISES  =====================
// Blit de glifos de Font_5x7 dentro de gray[][] (bit 7 = columna izquierda).

void blitChar(char c, int x0, int y0, int level) {
  const uint8_t* g = Font_5x7.data[(uint8_t)c];
  if (g == NULL) return;
  for (int gy = 0; gy < Font_5x7.height; gy++) {
    uint8_t row = g[gy];
    for (int gx = 0; gx < Font_5x7.width; gx++)
      if ((row >> (7 - gx)) & 1) setPx(x0 + gx, y0 + gy, level);
  }
}

int textWidthPx(const char* s) {
  int w = 0;
  for (const char* p = s; *p; p++) w += Font_5x7.width + 1;
  return w;
}

// Desplaza un texto de derecha a izquierda, en grises (nivel 'level').
void scrollTextGray(const char* s, int level, uint16_t stepMs) {
  int tw = textWidthPx(s);
  for (int ox = W; ox > -tw; ox--) {
    clearGray();
    int x = ox;
    for (const char* p = s; *p; p++) {
      blitChar(*p, x, 0, level);
      x += Font_5x7.width + 1;
    }
    render(stepMs);
  }
}

// Blit de un glifo de cualquier fuente (bit 7 = columna izquierda).
void blitGlyph(const Font& f, char c, int x0, int y0, int level) {
  const uint8_t* g = f.data[(uint8_t)c];
  if (g == NULL) return;
  for (int gy = 0; gy < f.height; gy++) {
    uint8_t row = g[gy];
    for (int gx = 0; gx < f.width; gx++)
      if ((row >> (7 - gx)) & 1) setPx(x0 + gx, y0 + gy, level);
  }
}

// Dibuja un numero centrado en la matriz con la fuente chica 4x6
// (asi "100" entra justo en los 12px de ancho).
void drawNumberCentered(int n, int level) {
  char buf[8];
  snprintf(buf, sizeof(buf), "%d", n);
  int len = strlen(buf);
  int gw = Font_4x6.width;                 // 4 px por digito (sin separacion)
  int x = (W - len * gw) / 2;
  int y = (H - Font_4x6.height) / 2;       // centrado vertical
  for (int i = 0; i < len; i++) {
    blitGlyph(Font_4x6, buf[i], x, y, level);
    x += gw;
  }
}

// =====================  ESCENA 1: SONAR  =====================
// El sensor (arriba-centro) emite arcos que bajan; brillo cae con la distancia;
// al tocar la basura del fondo, rebota un eco mas tenue.

const int SX = 5, SY = 0;   // posicion del "sensor"

void drawStaticSonar() {
  setPx(SX, SY, MAXL);                 // sensor brillante
  for (int x = 0; x < W; x++) {        // pila de basura al fondo
    putPx(x, H - 1, 3);
    if (x % 2 == 0) putPx(x, H - 2, 2);
  }
}

void sceneSonar() {
  for (int ping = 0; ping < 3; ping++) {
    // onda que se expande hacia abajo
    for (int r = 1; r <= 9; r++) {
      fadeBuffer(2);
      drawStaticSonar();
      for (int y = 0; y < H; y++)
        for (int x = 0; x < W; x++) {
          int d = (int)lroundf(sqrtf((x - SX) * (x - SX) + (y - SY) * (y - SY)));
          if (d == r) setPx(x, y, MAXL - r);     // mas lejos = mas tenue
        }
      render(55);
    }
    // flash al impactar el fondo
    for (int x = 0; x < W; x++) putPx(x, H - 1, MAXL);
    render(60);
    // eco que vuelve, mas debil
    for (int r = 9; r >= 1; r--) {
      fadeBuffer(2);
      drawStaticSonar();
      for (int y = 0; y < H; y++)
        for (int x = 0; x < W; x++) {
          int d = (int)lroundf(sqrtf((x - SX) * (x - SX) + (y - SY) * (y - SY)));
          if (d == r) setPx(x, y, 3);
        }
      render(35);
    }
  }
  fadeOut(180);
}

// =====================  ESCENA 2: LLENADO (NUMEROS)  =====================
// Un contador de porcentaje sube de 0% a 100% (intuitivo, se lee el nivel).
// Al llegar a 100, dispara una alarma tipo buzzer: estrobo + "100" parpadeando.

void sceneFill() {
  // Cuenta 0 -> 100 (acelera un poco al final para dar tension).
  for (int pct = 0; pct <= 100; pct++) {
    clearGray();
    drawNumberCentered(pct, MAXL);
    render(pct < 80 ? 32 : 22);
  }
  // Alarma "buzzer": alterna pantalla llena <-> "100", como una sirena.
  for (int i = 0; i < 6; i++) {
    for (int y = 0; y < H; y++)
      for (int x = 0; x < W; x++) putPx(x, y, MAXL);   // flash total
    render(70);
    clearGray();
    drawNumberCentered(100, MAXL);                      // "100" sobre negro
    render(130);
  }
  fadeOut(140);
}

// =====================  ESCENA 3: WIFI  =====================
// Primero el ICONO de WiFi (punto + 3 arcos encendiendose por etapas, la
// animacion clasica de "conectando"); luego las ondas saliendo = transmitiendo.

void sceneWifi() {
  // -- Icono: punto abajo-centro + arcos hacia arriba, por etapas --
  const int DX = 6, DY = 7;
  const int arcR[3] = { 2, 4, 6 };
  for (int cycle = 0; cycle < 2; cycle++) {
    for (int stage = 0; stage <= 3; stage++) {
      clearGray();
      putPx(DX, DY, MAXL);                       // punto base
      for (int k = 0; k < stage; k++) {
        for (int y = 0; y < DY; y++)             // solo arcos por encima del punto
          for (int x = 0; x < W; x++) {
            int d = (int)lroundf(sqrtf((x - DX) * (x - DX) + (y - DY) * (y - DY)));
            if (d == arcR[k]) putPx(x, y, MAXL);
          }
      }
      render(180);
    }
    render(160);                                 // sostiene el icono completo
    clearGray(); render(110);                    // breve apagado
  }
  fadeOut(120);

  // -- Ondas saliendo desde arriba-izquierda en rafagas (transmitiendo) --
  const int TXx = 0, TXy = 0;
  for (int burst = 0; burst < 3; burst++) {
    for (int r = 0; r <= 16; r++) {
      fadeBuffer(2);
      putPx(TXx, TXy, MAXL);                      // antena
      for (int y = 0; y < H; y++)
        for (int x = 0; x < W; x++) {
          int d = (int)lroundf(sqrtf((x - TXx) * (x - TXx) + (y - TXy) * (y - TXy)));
          if (d == r) setPx(x, y, (MAXL - r / 2 > 1) ? MAXL - r / 2 : 1);
        }
      render(45);
    }
  }
  fadeOut(160);
}

// =====================  ESCENA 4: GEO PIN + MARCA  =====================
// Pin de mapa (5 ancho x 6 alto). bit4..bit0 = columnas x0..x4.

const uint8_t PIN[6] = {
  0b01110,   // .###.
  0b10001,   //  #...#
  0b10001,   //  #...#
  0b01010,   //  .#.#.
  0b00100,   //  ..#..
  0b00100    //  ..#..
};

void drawPin(int px, int py, int level) {
  for (int gy = 0; gy < 6; gy++)
    for (int gx = 0; gx < 5; gx++)
      if ((PIN[gy] >> (4 - gx)) & 1) setPx(px + gx, py + gy, level);
}

void sceneGeoPin() {
  const int pinX = 4;        // centrado (pin de 5 ancho)
  const int restY = 1;       // fila final de la cabeza
  // Caida con rebote: y va de -6 hasta restY, rebota un par de veces.
  float y = -6, v = 0;
  const float g = 0.55f;
  int bounces = 0;
  while (bounces < 3) {
    v += g;
    y += v;
    if (y >= restY) { y = restY; v = -v * 0.45f; bounces++; if (fabsf(v) < 0.6f) break; }
    clearGray();
    drawPin(pinX, (int)floorf(y + 0.5f), MAXL);
    render(45);
  }
  // onda en el suelo al asentarse
  for (int r = 0; r <= 8; r++) {
    clearGray();
    drawPin(pinX, restY, MAXL);
    int baseY = restY + 5;
    for (int x = 0; x < W; x++) {
      int d = abs(x - (pinX + 2));
      if (d == r) setPx(x, baseY, (MAXL - r > 1) ? MAXL - r : 1);
    }
    render(55);
  }
  // sostiene el pin un momento
  clearGray(); drawPin(pinX, restY, MAXL); render(400);
  fadeOut(180);

  // Marca: "GeoGreen" desplazandose (cierre)
  scrollTextGray("GeoGreen", MAXL, 60);
  clearGray(); render(250);
  fadeOut(120);
}

// =====================  SETUP / LOOP  =====================

void setup() {
  matrix.begin();
  clearGray();
}

void loop() {
  sceneSonar();
  sceneFill();
  sceneWifi();
  sceneGeoPin();
}
