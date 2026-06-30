# Plan de pruebas V0.1

## Preparacion

1. Cargar `firmware/geogreen_v0.ino` en el ESP32.
2. Cablear el sensor segun `docs/pinout.md`.
3. Abrir monitor serie a 115200 baud.
4. Guardar la salida CSV en un archivo dentro de `data/`.

## Prueba 1: sensor al aire

Objetivo: confirmar que llegan frames validos.

Procedimiento:

1. Poner el sensor apuntando a una pared o superficie plana.
2. Mantener distancia fija durante 30 segundos.
3. Revisar que `valid=1` en la mayoria de las filas.
4. Revisar que `filtered_mm` varie menos que `raw_mm`.

Criterio de aceptacion:

- El CSV se emite de forma continua.
- No hay rachas largas de frames invalidos con el cableado quieto.

## Prueba 2: basurero vacio

Objetivo: calibrar `EMPTY_DISTANCE_MM`.

Procedimiento:

1. Montar el sensor bajo la tapa.
2. Dejar el basurero vacio.
3. Registrar 60 segundos de datos.
4. Calcular mediana de `filtered_mm`.
5. Ajustar `EMPTY_DISTANCE_MM`.

Criterio de aceptacion:

- Estado dominante: `EMPTY`.
- `fill_pct` cercano a 0.

## Prueba 3: nivel medio

Objetivo: verificar separacion entre `EMPTY` y `MEDIUM`.

Procedimiento:

1. Simular contenido a nivel intermedio.
2. Registrar 60 segundos.
3. Repetir con al menos 3 superficies distintas si es posible.

Criterio de aceptacion:

- Estado dominante: `MEDIUM`.
- No debe alternar frecuentemente entre `EMPTY` y `FULL`.

## Prueba 4: lleno

Objetivo: calibrar `FULL_DISTANCE_MM`.

Procedimiento:

1. Simular contenido cerca del nivel lleno.
2. Registrar 60 segundos.
3. Ajustar `FULL_DISTANCE_MM`.

Criterio de aceptacion:

- Estado dominante: `FULL`.
- `fill_pct` cercano a 100.

## Prueba 5: estabilidad cerca de cortes

Objetivo: detectar si hace falta histeresis.

Procedimiento:

1. Ubicar contenido cerca del corte `EMPTY`/`MEDIUM`.
2. Registrar 60 segundos.
3. Ubicar contenido cerca del corte `MEDIUM`/`FULL`.
4. Registrar 60 segundos.

Criterio de aceptacion:

- Si el estado oscila muchas veces por minuto, agregar histeresis en una V0.2.

