# GeoGreen V1 - roadmap de producto

> **Roadmap histórico de transición.** La PCB V1 ya fue materializada como
> candidata de diseño en [`../../geogreen-v1/`](../../geogreen-v1/). Este archivo
> conserva la intención que originó esa etapa; el estado técnico vigente y las
> revisiones pendientes se mantienen en `geogreen-v1/README.md`.

V0.1 valida medicion con ESP32 DevKit + A02YYUW. V1 es otra etapa: una PCB
interna de producto y una carcasa sellada para instalacion real bajo tapa.

## V1 - PCB interna

Render 3D desde KiCad con:

- ESP32-C6.
- USB-C.
- Conector de sensor IP67.
- Conectores para semaforo.
- Buzzer.
- Proteccion de energia.
- Pads de fabrica.

## V1 - producto instalado

Mockup de carcasa:

- Caja sellada en tapa.
- Sensor ultrasonico hacia abajo.
- Aro o semaforo RGB visible.
- QR de instalacion.

## Decisiones resueltas en la candidata actual

- Módulo representado: ESP32-C6-MINI-1.
- Alimentación e interfaz de servicio: USB-C con protección y regulación 3V3.
- Sensor externo A02YYUW mediante conector JST-PH de 4 pines.
- Conector de semáforo/RGB, buzzer y pads de fábrica integrados en la placa.

## Revisiones aún necesarias antes de fabricar

- Confirmar el módulo, circuito recomendado, BOM y MPN contra datasheets y stock.
- Confirmar el cable y conector físicos del A02YYUW.
- Cerrar alimentación de uso, sellado, carcasa y alturas 3D.
- Ejecutar revisión completa de esquemático/ERC antes de ordenar unidades.

## Relacion V0.1 -> V1

- V0.1 entrega datos reales de estabilidad `EMPTY/MEDIUM/FULL`.
- V0.1 confirma calibracion y riesgos mecanicos bajo tapa.
- V1 solo deberia cerrarse despues de medir:
  - comportamiento del sensor,
  - dimensiones del basurero,
  - altura disponible,
  - acceso para mantencion,
  - visibilidad del indicador externo.
