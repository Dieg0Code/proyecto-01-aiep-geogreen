/*
 * Hacker Show - animacion ciberpunk para la matriz LED 12x8 (UNO R4 WiFi)
 * =======================================================================
 * Demo personal (NO GeoGreen) para grabar y subir de historia de Instagram.
 * Pura visual, sin texto, en bucle (~15-20s):
 *
 *   1. digitalRain() - lluvia estilo Matrix: gotas cayendo con cola que se
 *      desvanece (cabeza brillante, estela atenuandose).
 *   2. skullReveal()  - una calavera que emerge del ruido, se sostiene con
 *      parpadeo de scanline y golpes de glitch, y se disuelve.
 *   con glitchBurst() de transicion entre escenas.
 *
 * Brillo simulado con Binary Code Modulation (8 niveles) sobre una matriz que
 * de fabrica es binaria. Solo matriz integrada + USB.
 *
 * Placa: Arduino UNO R4 WiFi (FQBN arduino:renesas_uno:unor4wifi). Flasheo USB.
 */

#include "Arduino_LED_Matrix.h"

ArduinoLEDMatrix matrix;

static const int W = 12;
static const int H = 8;
static const uint8_t MAXL = 7;

uint8_t gray[H][W];   // niveles 0..7 que dibujan las escenas
uint8_t bin[H][W];    // subframe binario hacia la matriz (BCM)

#define BCM_UNIT 200  // unidad de tiempo del BCM en us (brillo vs parpadeo)

// =====================  MOTOR DE GRISES (BCM)  =====================

void clearGray() {
  for (int y = 0; y < H; y++)
    for (int x = 0; x < W; x++) gray[y][x] = 0;
}

inline void setPx(int x, int y, int level) {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  if (level < 0) level = 0;
  if (level > MAXL) level = MAXL;
  if (level > gray[y][x]) gray[y][x] = level;   // modo "max"
}

inline void putPx(int x, int y, int level) {     // pisa siempre
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  if (level < 0) level = 0;
  if (level > MAXL) level = MAXL;
  gray[y][x] = level;
}

void fadeBuffer(uint8_t amount) {
  for (int y = 0; y < H; y++)
    for (int x = 0; x < W; x++)
      gray[y][x] = (gray[y][x] > amount) ? gray[y][x] - amount : 0;
}

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

void fadeOut(uint16_t ms) {
  for (int step = MAXL; step >= 0; step--) {
    for (int y = 0; y < H; y++)
      for (int x = 0; x < W; x++)
        if (gray[y][x] > step) gray[y][x] = step;
    render(ms / (MAXL + 1));
  }
  clearGray();
}

// =====================  LLUVIA MATRIX  =====================

float dropY[W];     // posicion de la cabeza de cada columna
float dropSpd[W];   // velocidad px/frame
bool  dropOn[W];    // columna activa

void respawnDrop(int x) {
  dropOn[x]  = true;
  dropY[x]   = -(float)random(0, 6);          // arranca por encima
  dropSpd[x] = 0.30f + random(0, 60) / 100.0f; // 0.30 .. 0.90
}

void digitalRain(uint16_t frames) {
  for (int x = 0; x < W; x++) dropOn[x] = false;
  for (uint16_t f = 0; f < frames; f++) {
    fadeBuffer(2);                              // estela que se desvanece
    for (int x = 0; x < W; x++) {
      if (!dropOn[x]) {
        if (random(0, 100) < 9) respawnDrop(x); // aparecer al azar
        continue;
      }
      dropY[x] += dropSpd[x];
      int hy = (int)(dropY[x] + 0.5f);
      putPx(x, hy, MAXL);                        // cabeza brillante
      putPx(x, hy - 1, 4);                       // medio cuerpo
      if (dropY[x] > H + 1) dropOn[x] = false;   // se apaga (respawn luego)
    }
    render(45);
  }
}

// =====================  CALAVERA  =====================
// Sprite 8x8 (bit7 = columna izquierda). Ojos/nariz/dientes = pixeles apagados.

const uint8_t SKULL[8] = {
  0b00111100,   // ..####..
  0b01111110,   // .######.
  0b11111111,   // ########
  0b11011011,   // ##.##.##   ojos
  0b11111111,   // ########
  0b11100111,   // ###..###   nariz
  0b01111110,   // .######.
  0b01011010    // .#.##.#.   dientes
};

// Dibuja la calavera centrada (x=2..9). Cada bit encendido -> nivel 'level'.
void drawSkull(int level, int shiftRow, int shiftAmt) {
  for (int gy = 0; gy < 8; gy++) {
    int sx = (gy == shiftRow) ? shiftAmt : 0;   // glitch: fila desplazada
    for (int gx = 0; gx < 8; gx++)
      if ((SKULL[gy] >> (7 - gx)) & 1)
        putPx(2 + gx + sx, gy, level);
  }
}

// Ruido aleatorio breve (transicion / glitch).
void glitchBurst(int frames) {
  for (int i = 0; i < frames; i++) {
    clearGray();
    for (int y = 0; y < H; y++)
      for (int x = 0; x < W; x++)
        if (random(0, 100) < 35) putPx(x, y, random(1, MAXL + 1));
    render(28);
  }
}

void skullReveal() {
  // -- Aparicion: ruido que resuelve en la calavera --
  for (int s = 0; s <= 8; s++) {
    clearGray();
    int noiseChance = 40 - s * 5;               // el ruido baja
    for (int y = 0; y < H; y++)
      for (int x = 0; x < W; x++)
        if (random(0, 100) < noiseChance) putPx(x, y, random(1, MAXL));
    if (s > 2) drawSkull(MAXL, -1, 0);          // la calavera sube
    render(60);
  }

  // -- Sostiene con vida: scanline + golpes de glitch --
  for (int t = 0; t < 26; t++) {
    clearGray();
    drawSkull(MAXL, -1, 0);
    // scanline: una fila recorre la calavera, mas tenue
    int scan = t % H;
    for (int x = 0; x < W; x++)
      if (gray[scan][x] > 0) gray[scan][x] = 3;
    // golpe de glitch ocasional: desplaza una fila + speckles
    if (t == 9 || t == 18) {
      clearGray();
      drawSkull(MAXL, random(0, 8), random(-2, 3));
      for (int k = 0; k < 6; k++) putPx(random(0, W), random(0, H), random(2, MAXL));
      render(70);
      continue;
    }
    render(70);
  }

  // -- Sale disolviendose a ruido --
  for (int s = 0; s < 6; s++) {
    clearGray();
    if (s < 3) drawSkull(MAXL - s * 2, -1, 0);
    for (int y = 0; y < H; y++)
      for (int x = 0; x < W; x++)
        if (random(0, 100) < 10 + s * 6) putPx(x, y, random(1, MAXL));
    render(55);
  }
}

// =====================  SETUP / LOOP  =====================

void setup() {
  matrix.begin();
  randomSeed(analogRead(A0));   // semilla variable cada arranque
  clearGray();
}

void loop() {
  digitalRain(150);
  glitchBurst(5);
  skullReveal();
  glitchBurst(5);
}
