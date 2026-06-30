# Pruebas documentadas del parser UART

El parser de `geogreen_v0.ino` procesa un byte a la vez y mantiene estado interno.
Esto permite recibir frames completos o parciales sin bloquear.

Formato esperado:

```text
0xFF DATA_H DATA_L CHECKSUM
```

Distancia:

```text
distance_mm = DATA_H * 256 + DATA_L
```

Checksum:

```text
checksum = (0xFF + DATA_H + DATA_L) & 0xFF
```

## Caso 1: frame valido

Entrada:

```text
0xFF 0x01 0x2C 0x2C
```

Calculo:

```text
distance_mm = 0x01 * 256 + 0x2C = 300
checksum = (0xFF + 0x01 + 0x2C) & 0xFF = 0x2C
```

Resultado esperado:

- Parser retorna `PARSE_VALID` al cuarto byte.
- `distanceMm = 300`.
- Se imprime una fila CSV con `valid=1`.

## Caso 2: checksum invalido

Entrada:

```text
0xFF 0x01 0x2C 0x00
```

Resultado esperado:

- Parser retorna `PARSE_INVALID_CHECKSUM` al cuarto byte.
- Se rechaza el frame.
- Se imprime una fila CSV con `state=INVALID` y `valid=0`.
- La ventana de mediana no incorpora esa lectura.

## Caso 3: header invalido

Entrada:

```text
0x00
```

Resultado esperado:

- Parser retorna `PARSE_INVALID_HEADER`.
- Se mantiene en `WAIT_HEADER`.
- Se imprime una fila CSV con `state=INVALID` y `valid=0`.
- La ventana de mediana no incorpora esa lectura.

## Caso 4: datos parciales

Entrada en dos tandas:

```text
tanda 1: 0xFF 0x01
tanda 2: 0x2C 0x2C
```

Resultado esperado:

- Despues de la tanda 1 no se imprime medicion valida.
- El parser conserva `DATA_H = 0x01` y espera `DATA_L`.
- Al recibir la tanda 2 completa el frame.
- Parser retorna `PARSE_VALID`.
- `distanceMm = 300`.

## Caso 5: resincronizacion despues de frame invalido

Entrada:

```text
0xFF 0x01 0x2C 0x00 0xFF 0x00 0x64 0x63
```

Resultado esperado:

- El primer frame se rechaza por checksum.
- El parser vuelve a `WAIT_HEADER`.
- El segundo frame se acepta.
- `distanceMm = 100`.

