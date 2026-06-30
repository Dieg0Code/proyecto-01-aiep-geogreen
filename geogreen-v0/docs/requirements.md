# Requerimientos GeoGreen V0.1

## Objetivo

Validar si el sensor ultrasonico A02YYUW / SEN0311, montado bajo la tapa de un
basurero, permite clasificar de forma estable `EMPTY`, `MEDIUM` y `FULL`.

## Hardware actual

- ESP32 DevKit existente.
- Modelo logico para firmware: ESP32 DevKit V1 / `esp32dev`.
- Modelo fisico exacto del ESP32: TODO, porque falta confirmar si la placa real
  es 30 pines, 38 pines u otra variante mecanica.
- Sensor A02YYUW / SEN0311.
- Alimentacion inicial por USB del ESP32.
- Sensor alimentado desde `3V3` del ESP32.

## Firmware

El firmware debe:

- Usar Arduino C++ para ESP32.
- Leer el sensor por `Serial2`.
- Configurar UART a 9600 baud, 8N1.
- Usar `GPIO16` como RX de `Serial2`.
- No transmitir hacia el sensor en V0.1.
- Validar frames de 4 bytes:
  - `0xFF`
  - `DATA_H`
  - `DATA_L`
  - `CHECKSUM`
- Calcular `distance_mm = DATA_H * 256 + DATA_L`.
- Validar `checksum = (0xFF + DATA_H + DATA_L) & 0xFF`.
- Rechazar frames con header o checksum invalido.
- Mantener mediana de las ultimas 7 lecturas validas.
- Calcular `fill_pct` con constantes configurables.
- Clasificar `EMPTY`, `MEDIUM`, `FULL`.
- Imprimir CSV por USB Serial:
  - `timestamp_ms`
  - `raw_mm`
  - `filtered_mm`
  - `fill_pct`
  - `state`
  - `valid`
- Evitar `delay()` y esperas bloqueantes.

## Fuera de alcance V0.1

- Wi-Fi.
- Bluetooth.
- Backend.
- LEDs.
- Buzzer.
- Pantalla.
- PCB final.
- Footprint final del ESP32 DevKit.
- Caja final.

## TODO tecnicos

- Confirmar modelo exacto del ESP32 DevKit.
- Confirmar pines fisicos disponibles y rotulos reales de la placa.
- Confirmar si el pin `GPIO16` esta libre en la placa usada.
- Confirmar rango real del A02YYUW alimentado a 3.3 V.
- Confirmar distancias reales:
  - `EMPTY_DISTANCE_MM`
  - `FULL_DISTANCE_MM`
- Confirmar si se requiere histeresis despues de medir datos reales.
