# GeoGreen V1 - PCB interna pro

Esta carpeta modela la direccion de producto para GeoGreen: una PCB interna
soldada, pensada para vivir dentro de una carcasa sellada bajo la tapa del
basurero.

V1 no reemplaza V0.1. V0.1 valida medicion con ESP32 DevKit + A02YYUW. V1
visualiza y ordena el producto final:

- modulo ESP32-C6 soldado;
- USB-C;
- proteccion de energia;
- regulacion 3V3;
- conector sensor IP67 candidato;
- conector A02YYUW 4 hilos como fallback electrico;
- conector RGB/semaforo;
- buzzer;
- LEDs de estado;
- pads de fabrica;
- agujeros de montaje para carcasa.

## Estado

Concepto KiCad, no fabricable todavia.

El PCB esta pensado para render, conversacion tecnica y trabajo mecanico de
carcasa. Antes de fabricar faltan:

- seleccionar modulo ESP32-C6 exacto;
- confirmar circuito recomendado de alimentacion/USB/BOOT/EN del modulo elegido;
- seleccionar conector IP67 real de 4 hilos para el sensor;
- cerrar BOM;
- hacer esquematico completo;
- rutear con reglas electricas reales;
- revisar DRC/ERC;
- validar alturas 3D para carcasa.

## Archivos

- `hardware/kicad/geogreen-v1.kicad_pcb`: PCB conceptual.
- `hardware/kicad/create_v1_product_board.py`: generador reproducible via KiCad Python.
- `hardware/kicad/create_mechanical_models.py`: genera modelos STEP mecanicos
  simplificados con CadQuery.
- `hardware/kicad/models/ESP32-C6-MINI-1-simple.step`: volumen mecanico del
  modulo ESP32-C6-MINI-1 para render/carcasa.
- `hardware/kicad/models/M8-4pin-IP67-simple.step`: volumen mecanico de conector
  M8 4 pines IP67 para render/carcasa.
- `hardware/kicad/exports/geogreen-v1-product-render.jpg`: render 3D.
- `hardware/kicad/exports/geogreen-v1-product.step`: STEP para carcasa.
- `hardware/kicad/exports/drc.rpt`: reporte DRC actual.

## Para carcasa

El archivo STEP sirve como base para Blender/FreeCAD/Fusion. El ESP32-C6 y el
conector M8 4 pines tienen modelos STEP mecanicos simplificados generados en el
repo. Son volumenes utiles para carcasa, pero no reemplazan el modelo CAD oficial
del proveedor cuando se cierre la BOM.

Para regenerar:

```powershell
cd geogreen-v1\hardware\kicad
uv run --with cadquery python .\create_mechanical_models.py
& "C:\Program Files\KiCad\10.0\bin\python.exe" .\create_v1_product_board.py
& "C:\Program Files\KiCad\10.0\bin\kicad-cli.exe" pcb render .\geogreen-v1.kicad_pcb --output .\exports\geogreen-v1-product-render.jpg --width 1200 --height 800 --side top --quality basic --perspective --rotate "-55,0,35"
& "C:\Program Files\KiCad\10.0\bin\kicad-cli.exe" pcb export step .\geogreen-v1.kicad_pcb --output .\exports\geogreen-v1-product.step --force --include-silkscreen --include-pads
```
