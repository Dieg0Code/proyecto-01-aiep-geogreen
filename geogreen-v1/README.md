# GeoGreen V1 - PCB interna fab candidate

Esta carpeta modela la direccion de producto para GeoGreen: una PCB interna
soldada, pensada para vivir dentro de una carcasa sellada bajo la tapa del
basurero.

V1 no reemplaza V0.1. V0.1 valida medicion con ESP32 DevKit + A02YYUW. V1
es una PCB interna candidata a fabricacion:

- modulo ESP32-C6 soldado;
- USB-C;
- proteccion de energia;
- regulacion 3V3;
- conector A02YYUW 4 hilos para cable de sensor IP67 externo;
- conector RGB/semaforo;
- buzzer;
- LEDs de estado;
- pads de fabrica;
- agujeros de montaje para carcasa.

## Estado

PCB ruteada en 2 capas, sin ratsnest, con DRC limpio en KiCad 10:

- `0 DRC violations`
- `0 unconnected pads`
- Gerbers, Excellon drill, pick-and-place, STEP y render exportados.

Antes de pedir una tanda real faltan revisiones de ingenieria:

- confirmar modulo ESP32-C6 exacto contra stock/proveedor final;
- confirmar circuito recomendado de alimentacion/USB/BOOT/EN del modulo elegido;
- confirmar conector/cable real de 4 hilos para el sensor A02YYUW;
- cerrar BOM;
- hacer esquematico completo y correr ERC;
- revisar BOM/MPN contra datasheets;
- validar alturas 3D para carcasa.

## Archivos

- `hardware/kicad/geogreen-v1.kicad_pcb`: PCB ruteada DRC-clean.
- `hardware/kicad/create_v1_product_board.py`: generador reproducible via KiCad Python.
- `hardware/kicad/models/ESP32-C6-MINI-1.step`: modelo STEP oficial de Espressif
  para render/carcasa.
- `hardware/kicad/brand/`: fuente y vectorizacion del logo AIEP para serigrafia.
- `hardware/kicad/autoroute.py`: exporta DSN, ejecuta Freerouting headless e
  importa SES para dejar pistas reales 45°/ortogonales.
- `hardware/kicad/exports/geogreen-v1-product-render.jpg`: render 3D.
- `hardware/kicad/exports/geogreen-v1-product.step`: STEP para carcasa.
- `hardware/kicad/exports/fabrication/`: Gerbers, drill y posicionamiento.
- `hardware/kicad/exports/geogreen-v1-fabrication.zip`: paquete comprimido para fab review.
- `hardware/kicad/exports/drc.rpt`: reporte DRC actual.

## Para carcasa

El archivo STEP sirve como base para Blender/FreeCAD/Fusion. El ESP32-C6 y el
resto de componentes montados en la placa exportan volumenes utiles para carcasa.
El sensor A02YYUW es externo a la PCB: en la placa solo se representa el header
JST-PH de 4 pines para su cable.

Para regenerar:

```powershell
cd geogreen-v1\hardware\kicad
uv run --with opencv-python-headless --with numpy python .\brand\vectorize_logo.py
& "C:\Program Files\KiCad\10.0\bin\python.exe" .\create_v1_product_board.py
& "C:\Program Files\KiCad\10.0\bin\python.exe" .\autoroute.py
& "C:\Program Files\KiCad\10.0\bin\kicad-cli.exe" pcb render .\geogreen-v1.kicad_pcb --output .\exports\geogreen-v1-product-render.jpg --quality high --floor --perspective --width 1920 --height 1200 --rotate "-25,0,-25" --background opaque
& "C:\Program Files\KiCad\10.0\bin\kicad-cli.exe" pcb export step .\geogreen-v1.kicad_pcb --output .\exports\geogreen-v1-product.step --force --include-silkscreen --include-pads
```
