# GeoGreen V1 — PCB fab candidate (KiCad)

Placa V1 candidata a fabricacion: ruteada en 2 capas, sin ratsnest, con reporte
DRC limpio en KiCad 10 (`0 DRC violations`, `0 unconnected pads`). Sigue siendo
necesaria una revision humana de BOM/MPN/datasheets antes de ordenar unidades.

La placa se genera por script con la API Python de **KiCad 10** (`pcbnew`) y el
logo de serigrafía se vectoriza con **OpenCV**. Todos los componentes usan
footprints y modelos 3D estándar de KiCad, salvo el ESP32-C6 que usa el STEP
oficial de Espressif (con color).

## Cómo regenerar (orden)

Desde cualquier directorio (los scripts anclan sus rutas a su propia carpeta):

```bash
KDIR=geogreen-v1/hardware/kicad

# 1. Modelo 3D oficial del ESP32-C6.
#    Ya vive en models/ESP32-C6-MINI-1.step para que el render sea reproducible.
#    Fuente original: github.com/espressif/kicad-libraries

# 2. Logo AIEP -> poligonos de serigrafia (brand/logo_silk.json).
uv run --with opencv-python-headless --with numpy python "$KDIR/brand/vectorize_logo.py"

# 3. Generar la placa .kicad_pcb.
"/c/Program Files/KiCad/10.0/bin/python.exe" "$KDIR/create_v1_product_board.py"

# 4. Autorutear pistas 45°/ortogonales con Freerouting headless.
"/c/Program Files/KiCad/10.0/bin/python.exe" "$KDIR/autoroute.py"

# 5. Validar DRC.
kicad-cli pcb drc "$KDIR/geogreen-v1.kicad_pcb" --output "$KDIR/exports/drc.rpt"
```

Requisitos:
- `models/ESP32-C6-MINI-1.step` debe existir (paso 1) — es el módulo real con color.
- `brand/logo_silk.json` lo produce el paso 2 desde `brand/logo-aiep-source.png`.
- El root de footprints de KiCad se resuelve por la variable `KICAD10_FOOTPRINT_DIR`
  (o `KICAD_FOOTPRINT_DIR`), con fallback a la ruta por defecto de Windows.
- `autoroute.py` espera Java 25 en Scoop (`temurin-lts-jdk`) y Freerouting en
  `~/.local/lib/freerouting.jar`. Se puede sobrescribir con `GEOGREEN_JAVA` y
  `GEOGREEN_FREEROUTING_JAR`.

## Render 3D

Render fotorrealista (raytracing) — **usar `--quality high`**, no el `basic` por
defecto (que se ve gris/mate):

```bash
kicad-cli pcb render -o exports/geogreen-v1-product-render.jpg \
  --quality high --floor --perspective --width 1920 --height 1200 \
  --rotate '-25,0,-25' --background opaque geogreen-v1.kicad_pcb
```

## Fabricacion

```bash
kicad-cli pcb export gerbers geogreen-v1.kicad_pcb \
  --output exports/fabrication \
  --layers F.Cu,B.Cu,F.Paste,B.Paste,F.SilkS,B.SilkS,F.Mask,B.Mask,Edge.Cuts \
  --subtract-soldermask --check-zones

kicad-cli pcb export drill geogreen-v1.kicad_pcb \
  --output exports/fabrication --format excellon --excellon-units mm \
  --excellon-separate-th --generate-map --generate-report \
  --report-path exports/fabrication/drill-report.rpt

kicad-cli pcb export pos geogreen-v1.kicad_pcb \
  --output exports/fabrication/geogreen-v1-pos.csv \
  --format csv --units mm --side both
```

## Notas de diseño

- **Sensor ultrasónico A02YYUW**: es externo, impermeable (IP67), conectado por
  **cable con conector PH2.0-4P** (JST PH, paso 2.0 mm, 4 pines: VCC/GND/TX/RX).
  En la PCB solo va el header JST-PH que aparea con ese cable; el sensor no va
  montado en la placa y no se muestra en el render.
- Los designadores de referencia se ocultan en el render limpio; el archivo PCB
  mantiene referencias internas y la posicion de componentes se exporta en CSV.
- Algunos valores siguen siendo funcionales/genericos (`PTC`, `3V3_REG`) hasta
  cerrar BOM/MPN. No ordenar ensamble sin revisar esos MPN.
- El script genera zonas GND con hueco bajo la antena, pero no llama
  `ZONE_FILLER.Fill()` desde Python: KiCad 10 en Windows puede hacer crash con
  el footprint real `ESP32-C6-MINI-1` y ese keep-out. El autoruteo exporta DSN
  sin zonas para enrutar GND como pistas reales; los Gerbers se exportan con
  `--check-zones`.
