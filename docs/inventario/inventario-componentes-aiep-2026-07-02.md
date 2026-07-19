# Inventario preliminar de componentes AIEP para GeoGreen

Fecha de revisión: 2026-07-02
Fuente: 19 fotos descargadas desde WhatsApp en `Downloads` (`WhatsApp Image 2026-06-08 at 23.29...`).
Estado: inventario visual preliminar; debe verificarse físicamente con don Elías antes de armar kits.

## Lectura rápida

AIEP ya tiene material útil para armar kits de prototipado: placas Arduino/SparkFun, protoboards, cables, LEDs, resistencias, sensores y al menos un kit MCI de 37 sensores. Esto puede cubrir parte importante del Taller 3 y servir como respaldo mientras se gestiona la compra nueva.

La compra de 5 Arduino UNO R4 WiFi + kit de sensores sigue teniendo sentido porque el material existente está repartido, mezclado y no necesariamente alcanza para grupos completos y homogéneos.

## Componentes observados

| Categoría | Elemento observado | Cantidad visible | Utilidad para GeoGreen | Confiabilidad |
|---|---:|---:|---|---|
| Placas | SparkFun RedBoard / compatible Arduino UNO | 2 kits visibles | Alta: prototipos con HC-SR04, LEDs, buzzer, pruebas de clase | Alta |
| Placas | Arduino UNO R3 compatible | 1 visible | Alta: prototipo base sin WiFi | Alta |
| Placas | Arduino Mega 2560 compatible | 1 visible | Media: útil para demos grandes, no necesario para kits básicos | Alta |
| Placas WiFi | WeMos D1 R32 (formato UNO, ESP32) | 2 visibles o probables | Alta: WiFi, pero ojo con lógica 3.3 V y HC-SR04 Echo | Media |
| Placas WiFi | WeMos D1 (ESP8266) | 1 visible | Media: IoT simple, menos directo para estudiantes | Alta |
| Sensores | Kit MCI de 37 sensores para Arduino | 1 caja visible | Alta: pool variado para taller e ideas de proyectos | Alta |
| Sensores | HC-SR04 ultrasónico | 2 visibles o probables | Muy alta: sensor central de GeoGreen | Media |
| Sensores/IoT | Dragino A02-15 / probe ultrasónico para LDDS04 | 1 visible | Alta para demo avanzada, no para kits estudiantiles básicos | Alta |
| Módulos comunicación | SIMCom SIM7600SA | 2 visibles | Baja-media: celular/GNSS avanzado, fuera del taller básico | Alta |
| Módulos ubicación | GPS externo tipo antena/módulo | 1 visible | Media: posible demo de georreferencia, no esencial | Media |
| Módulos red | Conversor Ethernet fibra multimodo 100M | 1 visible | Baja para Taller 3; guardar como material de telecom | Alta |
| Shields | Shield rojo tipo protoboard/proto shield SparkFun | 1+ visible | Media: montaje ordenado sobre Arduino | Media |
| Displays | LCD 16x2 | 1 visible | Media-alta: mostrar % llenado o estado | Alta |
| Prototipado | Protoboards medianas | 3 visibles | Muy alta: armado de circuitos por grupo | Media |
| Prototipado | Jumpers Dupont multicolor | 1 paquete grande + cables en kits | Muy alta | Alta |
| Prototipado | Cables USB tipo A-B / micro USB | varios visibles | Alta: cargar/programar placas | Media |
| Electrónica básica | LEDs rojo/amarillo/verde y otros | varios visibles | Muy alta: semáforo GeoGreen | Alta |
| Electrónica básica | Resistencias | varias visibles | Muy alta: LEDs, divisores de voltaje, prácticas | Media |
| Actuadores | Servo motor | 1 visible | Media: demo de actuador | Alta |
| Actuadores | Motor DC pequeño | 1 visible | Media-baja para GeoGreen, útil como demo | Alta |
| Actuadores | Buzzer / zumbador | probable en kit 37 sensores | Alta: alerta de contenedor lleno | Media |

## Kits que conviene armar físicamente

### Kit GeoGreen mínimo por grupo

Para cada grupo:

- 1 placa Arduino o compatible.
- 1 protoboard.
- 1 cable USB compatible con la placa.
- 1 sensor ultrasónico HC-SR04.
- LEDs verde, amarillo y rojo.
- Resistencias para LEDs.
- Jumpers macho-macho.
- 1 buzzer o módulo buzzer.

Este kit permite replicar la lógica central: medir distancia, calcular porcentaje, mostrar semáforo y activar alerta.

### Kit de demostración avanzada

Guardar separado para demos del equipo AIEP:

- WeMos D1 R32 / WeMos D1.
- Dragino A02-15.
- SIM7600SA.
- GPS.
- LCD 16x2.

Estos componentes son útiles para explicar IoT, georreferencia o comunicación, pero no conviene mezclarlos con los kits básicos si el objetivo es que estudiantes armen rápido sin bloquearse.

## Verificaciones pendientes del corte del 2 de julio

Esta lista pertenece al inventario preliminar de esa fecha. Debe contrastarse con
el recuento físico más reciente antes de utilizarla para preparar kits o compras.

1. Reunir físicamente todo el material en una mesa y separar por tipo: placas, protoboards, sensores, cables, LEDs/resistencias, actuadores.
2. Contar cuántos kits mínimos completos se pueden armar hoy.
3. Confirmar cuántos HC-SR04 hay realmente; en fotos se ven al menos 2, pero podrían estar dentro del kit MCI.
4. Revisar estado de placas y cables USB: que enciendan y que el computador las detecte.
5. Separar los módulos avanzados para no perderlos ni entregarlos como material de grupo.
6. Etiquetar cajas o bolsas por kit antes del Taller 3.

## Nota técnica

Si se usa WeMos D1 R32, WeMos D1 u otra placa ESP32/ESP8266 con HC-SR04, no conectar Echo directo si la placa trabaja a 3.3 V. Usar divisor de voltaje o adaptador de nivel. En Arduino UNO/RedBoard de 5 V, Echo puede ir directo.
