# Track Arduino UNO R4 WiFi

Firmware para la **Arduino UNO R4 WiFi** (MCU Renesas RA4M1 a 5V + coprocesador
ESP32-S3 para WiFi, matriz LED 12x8 integrada). Todo corre **solo con USB y la
matriz integrada** — no necesita sensores, protoboard ni componentes externos.

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
pio run -d arduino-r4/hacker_show     -t upload
pio run -d arduino-r4/geogreen_matrix -t upload

# Monitor serial (si hiciera falta):
pio device monitor -d arduino-r4/geogreen_show
```

> `pio` está instalado vía `uv tool` en `~/.local/bin/pio.exe` (ya en el PATH).

### Comando para la reunión

La placa **ya queda con `geogreen_show` flasheado**, así que para mostrarlo basta
**enchufarla por USB** (a un notebook o a un cargador/powerbank) y el show arranca
solo en bucle. Si querés re-flashearlo en el momento:

```bash
pio run -d arduino-r4/geogreen_show -t upload
```

## Ajustes del show

En `geogreen_show.ino` (y `hacker_show.ino`), `#define BCM_UNIT` controla el balance
brillo/parpadeo del motor de grises (subir = más brillo y estabilidad, bajar =
menos flicker). Se afina mirando la matriz. Si al **grabar en video** aparecen
bandas/parpadeo, subir `BCM_UNIT` estabiliza la imagen en cámara.

## Próximo paso (cuando llegue el HC-SR04)

`sceneFill` del show pasará a alimentarse de la **distancia real** medida por el
ultrasónico en vez de simular el porcentaje. El WiFi (librería `WiFiS3`, incluida en
el core) habilita la subida al dashboard del track ESP32. Para sumar la librería del
sensor u otras, se agregan a `lib_deps` en el `platformio.ini` del sketch.

## Nota

Los `.ino` se conservan, así que los sketches también se pueden abrir/flashear desde
el Arduino IDE si hiciera falta. Las carpetas de build `.pio/` están gitignoreadas.
