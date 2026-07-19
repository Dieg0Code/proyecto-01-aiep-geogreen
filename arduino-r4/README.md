# Track Arduino UNO R4 WiFi

Firmware para la **Arduino UNO R4 WiFi** (MCU Renesas RA4M1 a 5V + coprocesador
ESP32-S3 para WiFi, matriz LED 12x8 integrada). La carpeta incluye tanto demos
que funcionan solo con USB y la matriz integrada como el prototipo físico
GeoGreen montado en protoboard.

A diferencia del track ESP32 DevKit (3.3V), la R4 es 5V: el pin Echo del HC-SR04
se conecta directo a un GPIO **sin divisor de voltaje**.

## Sketches

- **`geogreen_show/`** — la demo "wow" para presentar. Show cinematográfico de
  ~25-30s en bucle que narra el producto: sonar midiendo → contador 0-100% +
  alarma buzzer → ícono WiFi + ondas (transmite) → pin de mapa y marca "GeoGreen".
  Usa *Binary Code Modulation* para simular 8 niveles de brillo (grises y fundidos)
  sobre una matriz que de fábrica es binaria.
- **`geogreen_matrix/`** — demo simple de respaldo: texto + barra de llenado +
  parpadeo de alerta.
- **`geogreen_proto/`** — prototipo físico completo: `HC-SR04`, semáforo de tres
  LEDs, buzzer y OLED SSD1306. Calcula porcentaje, filtra lecturas ultrasónicas,
  aplica histéresis a los estados y mantiene la identidad GeoGreen en la matriz
  integrada sin bloquear la medición.
- **`hacker_show/`** — demo personal (no GeoGreen): animación ciberpunk en bucle
  (lluvia estilo Matrix + calavera con glitch), pensada para grabar y subir de
  historia.

## Build / flasheo con PlatformIO (pio)

Usamos **PlatformIO** (`pio`), que es como `npm` para firmware: cada sketch tiene
su `platformio.ini` (como un `package.json`) que declara plataforma (`renesas-ra`),
placa (`uno_r4_wifi`), framework (`arduino`) y librerías. `pio` descarga e instala
todo solo la primera vez. **Cada sketch es un proyecto pio aparte** (su propia
carpeta), porque cada `.ino` es un programa independiente con su `setup()`/`loop()`.

Parado en la **raíz del repo**:

```bash
# Solo compilar (no necesita la placa):
pio run -d arduino-r4/geogreen_show

# Compilar + flashear (con la placa conectada por USB; detecta el puerto solo):
pio run -d arduino-r4/geogreen_show   -t upload
pio run -d arduino-r4/geogreen_proto  -t upload
pio run -d arduino-r4/hacker_show     -t upload
pio run -d arduino-r4/geogreen_matrix -t upload

# Monitor serial (si hiciera falta):
pio device monitor -d arduino-r4/geogreen_show
```

> `pio` está instalado vía `uv tool` en `~/.local/bin/pio.exe` (ya en el PATH).

### Demos para presentación

`geogreen_show` sirve como demo autónoma cuando no se quiere conectar hardware
externo. `geogreen_proto` corresponde a la demostración con sensor, OLED,
semáforo y buzzer. Para cargar cualquiera:

```bash
pio run -d arduino-r4/geogreen_show -t upload
pio run -d arduino-r4/geogreen_proto -t upload
```

## Ajustes del show

En `geogreen_show.ino` (y `hacker_show.ino`), `#define BCM_UNIT` controla el balance
brillo/parpadeo del motor de grises (subir = más brillo y estabilidad, bajar =
menos flicker). Se afina mirando la matriz. Si al **grabar en video** aparecen
bandas/parpadeo, subir `BCM_UNIT` estabiliza la imagen en cámara.

## Estado de la integración

La medición física ya está implementada en `geogreen_proto`; no se incorporó a
`geogreen_show` porque ese sketch se conserva como pieza audiovisual autónoma.
La conexión de telemetría real con el dashboard sigue siendo una integración
separada: la R4 dispone de WiFi mediante `WiFiS3`, mientras la aplicación mantiene
la fuente de datos detrás de la interfaz `TelemetryService`.

Mapa de pines, armado y evidencia del prototipo:
[`../docs/armado-prototipo/`](../docs/armado-prototipo/).

## Nota

Los `.ino` se conservan, así que los sketches también se pueden abrir/flashear desde
el Arduino IDE si hiciera falta. Las carpetas de build `.pio/` están gitignoreadas.
