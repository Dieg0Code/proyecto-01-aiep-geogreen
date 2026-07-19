# Plan de esquematico GeoGreen V0.1

> Documento de diseño preliminar. El proyecto KiCad ya existe en `hardware/kicad/`
> y conserva un footprint visual no confirmado para el ESP32 DevKit. No usar este
> plan ni esa placa como paquete listo para fabricación.

Objetivo: preparar una PCB carrier de dos capas para enchufar un ESP32 DevKit y
conectar un sensor A02YYUW / SEN0311, sin cerrar todavia footprint ni layout final.

## Bloques

### 1. ESP32 DevKit enchufable

- Representar como modulo con dos hileras de headers hembra.
- Para avanzar en render, usar referencia preliminar ESP32 DevKit V1 de 30 pines.
- No tratar ese footprint como final hasta medir la placa real.
- Exponer al menos:
  - `3V3`
  - `GND`
  - `GPIO16 / RX2`

TODO:

- Confirmar modelo exacto del ESP32 DevKit.
- Confirmar si la placa real es de 30 o 38 pines.
- Confirmar separacion entre hileras.
- Confirmar cantidad de pines por lado.
- Confirmar rotulos reales de pines.

### 2. Conector sensor 1x4

Conector propuesto:

| Pin | Senal | Conexion |
|---:|---|---|
| 1 | `VCC_SENSOR` | `3V3` |
| 2 | `GND` | `GND` |
| 3 | `SENSOR_TX` | `GPIO16 / RX2` del ESP32 |
| 4 | `SENSOR_RX_PULLUP` | `3V3` via 10 kOhm |

TODO:

- Confirmar orden fisico real de cables del sensor.
- Confirmar tipo de conector o si sera bornera/header.

### 3. Pull-up RX del sensor

- Resistencia `R1 = 10 kOhm`.
- Un extremo a `3V3`.
- Otro extremo a `SENSOR_RX_PULLUP`.
- `SENSOR_RX_PULLUP` llega al pin RX del sensor.
- En V0.1 no conectar TX del ESP32 al sensor.

### 4. Test pads

Agregar test pads rotulados:

- `TP_3V3`
- `TP_GND`
- `TP_UART_RX` conectado a la linea `SENSOR_TX` / `GPIO16`.

### 5. Montaje

- Cuatro agujeros de montaje.
- Diametro: TODO.
- Separacion: TODO.
- Mantener margen mecanico: TODO.

### 6. Serigrafia

Texto minimo:

```text
GeoGreen V0.1
SENSOR: VCC GND TX RX
ESP32 USB ->
```

TODO:

- Confirmar orientacion final para que la serigrafia coincida con el montaje real.

## Reglas de PCB V0.1

- Dos capas.
- Plano o relleno de GND si el layout lo permite.
- Pistas cortas para UART.
- Mantener zona de antena del ESP32 sin cobre debajo si la placa real lo requiere.
- No ubicar tornillos ni cobre cerca de la antena sin revisar el modulo real.
- No asumir footprint del ESP32 desde internet sin medir la placa.

## Pasos en KiCad

1. Crear proyecto en `geogreen-v0/hardware/kicad/geogreen-v0.kicad_pro`.
2. Crear esquematico con simbolos genericos.
3. Nombrar redes:
   - `3V3`
   - `GND`
   - `SENSOR_TX`
   - `SENSOR_RX_PULLUP`
   - `UART_RX_GPIO16`
4. Agregar `R1 10k` entre `3V3` y `SENSOR_RX_PULLUP`.
5. Agregar conector sensor 1x4.
6. Agregar test pads.
7. Ejecutar ERC.
8. Completar checklist de medidas.
9. Solo despues asignar footprints.

## CLI disponible

Ruta detectada en Windows:

```powershell
& "C:\Program Files\KiCad\10.0\bin\kicad-cli.exe" version
```

La CLI servira para exportar PDF, Gerbers y BOM cuando exista el proyecto KiCad.
No reemplaza la confirmacion fisica del footprint del ESP32 DevKit.
