/*
 * GeoGreen - Demo de matriz LED 12x8 (Arduino UNO R4 WiFi)
 * ---------------------------------------------------------
 * Demostración para la placa SIN sensores ni protoboard: usa solo la
 * matriz LED integrada y el USB. Simula el ciclo de un contenedor:
 *
 *   1. Texto "GeoGreen" desplazándose.
 *   2. Barra de llenado que sube de 0% a 100% (como el contenedor
 *      llenándose). Crece desde abajo hacia arriba.
 *   3. Al llegar a nivel crítico, la matriz parpadea = ALERTA "lleno".
 *
 * Cuando lleguen el HC-SR04 y el resto del kit, el porcentaje vendrá
 * de la distancia medida en vez de simularse.
 *
 * Placa: Arduino UNO R4 WiFi  (FQBN arduino:renesas_uno:unor4wifi)
 * Flasheo por USB, sin componentes externos.
 */

#include "ArduinoGraphics.h"
#include "Arduino_LED_Matrix.h"

ArduinoLEDMatrix matrix;

const int W = 12;  // ancho de la matriz
const int H = 8;   // alto de la matriz

uint8_t frame[H][W];  // buffer 8 filas x 12 columnas

// Apaga todos los LEDs del buffer.
void clearFrame() {
  for (int y = 0; y < H; y++)
    for (int x = 0; x < W; x++)
      frame[y][x] = 0;
}

// Dibuja la barra de llenado para un porcentaje 0..100.
// Crece desde la fila inferior (y=H-1) hacia arriba.
void drawFill(int pct) {
  clearFrame();
  int rows = (pct * H + 50) / 100;          // filas encendidas (redondeo)
  for (int r = 0; r < rows; r++) {
    int y = H - 1 - r;                       // de abajo hacia arriba
    for (int x = 0; x < W; x++) frame[y][x] = 1;
  }
  matrix.renderBitmap(frame, H, W);
}

// Parpadeo de alerta: toda la matriz prende/apaga 'veces' veces.
void alert(int veces) {
  for (int i = 0; i < veces; i++) {
    for (int y = 0; y < H; y++)
      for (int x = 0; x < W; x++) frame[y][x] = 1;
    matrix.renderBitmap(frame, H, W);
    delay(180);
    clearFrame();
    matrix.renderBitmap(frame, H, W);
    delay(140);
  }
}

void scrollTexto(const char* txt) {
  matrix.beginDraw();
  matrix.stroke(0xFF, 0xFF, 0xFF);
  matrix.textScrollSpeed(70);
  matrix.textFont(Font_5x7);
  matrix.beginText(W, 1, 0xFF, 0xFF, 0xFF);  // empieza fuera de pantalla (derecha)
  matrix.println(txt);
  matrix.endText(SCROLL_LEFT);
  matrix.endDraw();
}

void setup() {
  matrix.begin();
}

void loop() {
  // 1. Marca del proyecto
  scrollTexto(" GeoGreen ");
  delay(300);

  // 2. Llenado progresivo 0 -> 100 %
  for (int pct = 0; pct <= 100; pct += 4) {
    drawFill(pct);
    delay(120);
  }

  // 3. Lleno -> alerta
  alert(5);

  // 4. Se vacía de golpe (contenedor recolectado) y repite
  for (int pct = 100; pct >= 0; pct -= 10) {
    drawFill(pct);
    delay(60);
  }
  delay(500);
}
