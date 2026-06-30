# Pinout V0.1

## Cableado propuesto

| A02YYUW / SEN0311 | ESP32 DevKit | Nota |
|---|---|---|
| VCC | 3V3 | Alimentacion V0.1 desde ESP32 |
| GND | GND | Tierra comun |
| TX | GPIO16 / RX2 | Dato UART desde sensor hacia ESP32 |
| RX | 3V3 mediante pull-up 10 kOhm | Mantener alto para salida procesada estable |

## Reglas V0.1

- No conectar TX del ESP32 al RX del sensor durante V0.1.
- El RX del sensor queda alto mediante pull-up de 10 kOhm.
- La lectura se hace solo desde `TX` del sensor hacia `GPIO16 / RX2`.
- La alimentacion inicial es USB al ESP32.
- Firmware: usar target PlatformIO `esp32dev`.
- PCB preliminar: asumir ESP32 DevKit V1 de 30 pines solo como referencia
  visual/mecanica no final.

## TODO antes de PCB

- Confirmar modelo exacto del ESP32 DevKit.
- Medir ancho, largo y alto maximo del DevKit.
- Medir separacion entre hileras de pines.
- Contar pines por lado.
- Registrar orden real de pines impreso en la serigrafia.
- Confirmar posicion del conector USB.
- Confirmar lado de antena y zona que no debe quedar cubierta por cobre.
- Confirmar diametro de pines/header que se usara.
