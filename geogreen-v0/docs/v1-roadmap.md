# GeoGreen V1 - roadmap de producto

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

## Decisiones abiertas

- Modulo exacto ESP32-C6 o SoC directo.
- Alimentacion: USB-C solamente, bateria, powerbank o fuente externa.
- Nivel de sellado objetivo: TODO.
- Conector IP67 exacto: TODO.
- Si el semaforo sera aro RGB, tira LED, LEDs discretos o modulo externo.
- Ubicacion del QR y flujo de instalacion.
- Si V1 mantiene A02YYUW o migra a otro sensor industrial.

## Relacion V0.1 -> V1

- V0.1 entrega datos reales de estabilidad `EMPTY/MEDIUM/FULL`.
- V0.1 confirma calibracion y riesgos mecanicos bajo tapa.
- V1 solo deberia cerrarse despues de medir:
  - comportamiento del sensor,
  - dimensiones del basurero,
  - altura disponible,
  - acceso para mantencion,
  - visibilidad del indicador externo.

