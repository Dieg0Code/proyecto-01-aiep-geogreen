# GeoGreen V0.1

Repositorio experimental de hardware y firmware para validar si un sensor
ultrasonico A02YYUW / SEN0311, montado bajo la tapa de un basurero, permite
clasificar de forma estable tres estados:

- `EMPTY`
- `MEDIUM`
- `FULL`

V0.1 no es el producto final. Es una prueba de medicion: sensor, lectura UART,
filtrado, calibracion y registro CSV por monitor serie.

El planteamiento inicial de la etapa posterior se conserva en
[`docs/v1-roadmap.md`](docs/v1-roadmap.md). Su implementación actual vive en
[`../geogreen-v1/`](../geogreen-v1/): PCB interna con ESP32-C6, USB-C, conector
de sensor, semáforo, buzzer y protección de energía.

## Arquitectura

```text
A02YYUW / SEN0311
  UART TX 9600 8N1
      |
      v
ESP32 Serial2 RX GPIO16
      |
      v
parser 4 bytes: 0xFF DATA_H DATA_L CHECKSUM
      |
      v
mediana ultimas 7 lecturas validas
      |
      v
fill_pct por calibracion EMPTY_DISTANCE_MM / FULL_DISTANCE_MM
      |
      v
CSV por USB Serial
```

Salida CSV:

```csv
timestamp_ms,raw_mm,filtered_mm,fill_pct,state,valid
```

## Alcance V0.1

Incluye:

- Lectura UART por `Serial2`.
- Validacion de header y checksum.
- Rechazo de frames invalidos.
- Mediana de las ultimas 7 lecturas validas.
- Calculo de porcentaje de llenado.
- Clasificacion `EMPTY`, `MEDIUM`, `FULL`.
- Documentacion base para futura PCB carrier de dos capas.

No incluye:

- Wi-Fi.
- Bluetooth.
- Backend.
- LEDs.
- Buzzer.
- Pantalla.
- PCB final.
- Footprint final del ESP32 DevKit.

## Carpetas

```text
geogreen-v0/
├── README.md
├── docs/
│   ├── requirements.md
│   ├── pinout.md
│   ├── test-plan.md
│   ├── measurements-format.md
│   └── v1-roadmap.md
├── firmware/
│   ├── geogreen_v0.ino
│   └── parser_tests.md
├── hardware/
│   ├── kicad-v0-checklist.md
│   └── schematic-plan.md
└── data/
    └── .gitkeep
```

## Flujo de trabajo recomendado

1. Confirmar modelo fisico exacto del ESP32 DevKit.
2. Confirmar distancia vacio/lleno del basurero real.
3. Cargar `firmware/geogreen_v0.ino` desde Arduino IDE.
4. Registrar CSV en `data/` durante pruebas controladas.
5. Evaluar estabilidad de `EMPTY`, `MEDIUM`, `FULL`.
6. Recien despues cerrar medidas para KiCad y una PCB fabricable.

## Riesgos de medicion

- El A02YYUW entrega distancia estable con RX alto, pero la estabilidad real bajo
  tapa depende del angulo, superficie del residuo y rebotes internos del basurero.
- La clasificacion puede oscilar cerca de los cortes si las distancias de
  calibracion quedan demasiado cerca.
- Residuos blandos, inclinados o con superficies irregulares pueden reflejar mal
  el ultrasonido.
- El montaje bajo tapa debe evitar que el sensor apunte a paredes laterales o
  bordes del contenedor.
- Alimentar el sensor a 3.3 V es parte de esta prueba; falta confirmar desempeno
  real frente a alimentacion nominal indicada por proveedor.

## Abrir el proyecto preliminar en KiCad

1. Abrir KiCad.
2. Abrir `geogreen-v0/hardware/kicad/geogreen-v0.kicad_pro`.
3. Revisar el PCB carrier y el reporte `hardware/kicad/exports/drc.rpt`.
4. Tratar el footprint ESP32 DevKit de 30 pines como referencia visual, no como
   una huella confirmada para fabricación.
5. Completar `hardware/kicad-v0-checklist.md` antes de cerrar medidas o conectores.

## KiCad CLI

En esta maquina `kicad-cli` esta instalado en:

```powershell
& "C:\Program Files\KiCad\10.0\bin\kicad-cli.exe" version
```

Exportaciones disponibles desde la CLI:

```powershell
& "C:\Program Files\KiCad\10.0\bin\kicad-cli.exe" sch export pdf geogreen-v0\hardware\kicad\geogreen-v0.kicad_sch -o geogreen-v0\hardware\kicad\exports\schematic.pdf
& "C:\Program Files\KiCad\10.0\bin\kicad-cli.exe" pcb export pdf geogreen-v0\hardware\kicad\geogreen-v0.kicad_pcb -o geogreen-v0\hardware\kicad\exports\pcb.pdf
```

El repositorio incluye un PCB preliminar en
`geogreen-v0/hardware/kicad/geogreen-v0.kicad_pcb`. Sirve para abrir en KiCad,
mirar 3D y exportar STEP para conversar carcasa. No es fabricable todavia: el
footprint del ESP32 DevKit es una referencia visual de 30 pines.

Artefactos ya exportados:

- Render: `hardware/kicad/exports/geogreen-v0-render.jpg`
- STEP para carcasa: `hardware/kicad/exports/geogreen-v0-carrier.step`
- DRC: `hardware/kicad/exports/drc.rpt`

El DRC actual no tiene cortos ni pads desconectados; quedan advertencias de
serigrafia por ser un layout preliminar.
