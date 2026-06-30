# Formato de mediciones

Guardar datos crudos en `geogreen-v0/data/` como CSV.

Nombre sugerido:

```text
YYYY-MM-DD_contexto_distancia_o_estado.csv
```

Ejemplos:

```text
2026-06-30_basurero-vacio.csv
2026-06-30_medio-carton.csv
2026-06-30_full-bolsa.csv
```

## Columnas

```csv
timestamp_ms,raw_mm,filtered_mm,fill_pct,state,valid
```

| Columna | Tipo | Descripcion |
|---|---|---|
| `timestamp_ms` | entero | `millis()` del ESP32 |
| `raw_mm` | entero | distancia cruda del ultimo frame valido; `0` si frame invalido |
| `filtered_mm` | entero | mediana de las ultimas lecturas validas |
| `fill_pct` | entero | porcentaje 0-100 calculado desde calibracion |
| `state` | texto | `EMPTY`, `MEDIUM`, `FULL` o `INVALID` |
| `valid` | entero | `1` frame aceptado, `0` frame rechazado |

## Metadata manual recomendada

Anotar junto al CSV:

- Fecha y hora.
- Basurero usado.
- Posicion del sensor.
- Tipo de superficie medida.
- Distancia aproximada real si se midio con huincha.
- Valor de `EMPTY_DISTANCE_MM`.
- Valor de `FULL_DISTANCE_MM`.
- Observaciones de movimiento, inclinacion o rebotes.

