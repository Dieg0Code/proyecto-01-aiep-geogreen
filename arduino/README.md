# GeoGreen — Track Arduino (simulación digital)

Prototipo del medidor de llenado de contenedores con **Arduino UNO + HC-SR04**,
semáforo de LEDs (verde/amarillo/rojo) y buzzer de alerta.
Todo se puede **simular sin placa física ni arduino-cli**.

## Qué hace

1. El sensor ultrasónico mide la distancia entre la tapa y el contenido.
2. El código convierte esa distancia en un **porcentaje de llenado** (0–100 %).
3. El semáforo muestra el estado:
   - **Verde** → < 40 % (bajo)
   - **Amarillo** → 40–79 % (medio)
   - **Rojo + buzzer** → ≥ 80 % (lleno)
4. Por el Monitor Serie se imprime la distancia y el porcentaje.

## Archivos

| Archivo | Para qué |
|---|---|
| `src/main.cpp` | El código del prototipo (lógica de llenado y semáforo). |
| `diagram.json` | El circuito virtual de Wokwi (placa, sensor, LEDs, resistencias, buzzer). |
| `platformio.ini` | Configuración de PlatformIO para compilar a Arduino UNO. |
| `wokwi.toml` | Le dice a la extensión de Wokwi dónde está el firmware compilado. |

## Cómo simularlo

### Opción A — wokwi.com (cero instalación, lo más rápido para empezar)

1. Entra a <https://wokwi.com> → **New Project** → **Arduino Uno**.
2. Copia el contenido de `src/main.cpp` y pégalo en `sketch.ino`
   (deja el `#include <Arduino.h>`, no estorba).
3. Abre la pestaña `diagram.json` y pega el contenido de este `diagram.json`.
4. Dale ▶ **Play**. Haz clic en el sensor HC-SR04 y **arrastra el control de
   distancia**: al acercar el objeto verás cambiar los LEDs y sonar el buzzer.

### Opción B — VS Code (PlatformIO + Wokwi, local)

Requiere instalar dos extensiones en VS Code (no necesitas arduino-cli aparte):

1. Instala las extensiones **PlatformIO IDE** y **Wokwi Simulator**.
2. Abre esta carpeta `arduino/` en VS Code.
3. Compila: PlatformIO → `Build` (o en terminal `pio run`).
   Esto genera `.pio/build/uno/firmware.hex` que usa `wokwi.toml`.
4. Abre `diagram.json` y ejecuta el comando **Wokwi: Start Simulator**.

> La primera compilación de PlatformIO descarga el compilador AVR; tarda un
> poco solo la primera vez. No hace falta tener un Arduino conectado.

## Calibración

Ajusta estas dos constantes en `src/main.cpp` según tu contenedor real:

```cpp
const float DIST_VACIO = 100.0;  // distancia (cm) sensor->fondo con el bote vacío
const float DIST_LLENO = 10.0;   // distancia (cm) sensor->contenido con el bote lleno
```

Y los umbrales del semáforo si quieres otros cortes:

```cpp
const int UMBRAL_MEDIO = 40;
const int UMBRAL_ALTO  = 80;
```

## Mapa de pines

| Componente | Pin Arduino |
|---|---|
| HC-SR04 TRIG | D9 |
| HC-SR04 ECHO | D10 |
| LED verde (+ R 220 Ω) | D4 |
| LED amarillo (+ R 220 Ω) | D3 |
| LED rojo (+ R 220 Ω) | D2 |
| Buzzer activo | D8 |
| HC-SR04 VCC | 5V |
| GND comunes | GND |

> Nota: en el Arduino UNO el ECHO de 5 V se conecta directo sin problema. En la
> versión ESP32 (3.3 V) **sí** hay que bajar ese 5 V con divisor de voltaje.
