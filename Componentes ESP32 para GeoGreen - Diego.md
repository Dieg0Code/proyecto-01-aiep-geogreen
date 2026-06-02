# Componentes para mi versión GeoGreen con ESP32

Objetivo: armar una versión más completa del prototipo, con medición de llenado, alerta visual/sonora, pantalla local y posibilidad de enviar datos por WiFi a un dashboard simple.

## Compra principal

| Componente | Cantidad | Para qué sirve |
|---|---:|---|
| ESP32 DevKit V1 | 1 | Controlador principal con WiFi integrado. Mejor que Arduino para IoT. |
| Sensor ultrasónico HC-SR04 | 1 | Mide distancia para calcular el porcentaje de llenado. |
| Protoboard 830 puntos | 1 | Armar y modificar el circuito sin soldar. |
| Cables Dupont M/M, M/H y H/H | 1 pack | Conexiones entre placa, sensor, pantalla y alertas. |
| Kit de resistencias | 1 | Para LEDs y divisor de voltaje del sensor. |
| LED verde, amarillo y rojo | 1 de cada uno | Semáforo de estado del contenedor. |
| Buzzer activo 5V | 1 | Alerta sonora cuando el contenedor está lleno. |
| Pantalla OLED 0.96 I2C | 1 | Mostrar porcentaje de llenado y estado localmente. |
| Conversor de nivel lógico o resistencias | 1 | Proteger el ESP32, porque trabaja a 3.3V y el HC-SR04 puede entregar 5V en Echo. |
| Powerbank o fuente USB | 1 | Alimentación portátil para demo. |
| Caja plástica o contenedor chico | 1 | Montaje presentable para la maqueta. |

## Resultado esperado

La demo debería hacer esto:

```text
Sensor mide distancia
-> ESP32 calcula porcentaje de llenado
-> OLED muestra porcentaje
-> LEDs indican estado
-> buzzer alerta si está lleno
-> WiFi envía dato a dashboard simple
```

## Presupuesto estimado

- Versión funcional: $30.000 a $45.000 CLP aprox.
- Versión más presentable con caja, powerbank y repuestos: $45.000 a $60.000 CLP aprox.

## Notas técnicas

- El ESP32 es mejor opción para mi versión porque ya trae WiFi.
- No compraría LoRa todavía; para esta etapa basta WiFi.
- El punto delicado es proteger el pin Echo del HC-SR04 con divisor de voltaje o conversor lógico.
- Conviene comprar componentes duplicados baratos: 2 sensores HC-SR04, LEDs extra y cables extra.

## Compra extra recomendada

| Extra | Motivo |
|---|---|
| Segundo HC-SR04 | Repuesto por si falla o queda mal soldado/conectado. |
| Botón pulsador | Para reset/calibración manual. |
| Mini interruptor | Para encender/apagar la maqueta. |
| Cinta doble contacto o silicona caliente | Para fijar sensor y cables. |
| Caja organizadora pequeña | Para transportar componentes al taller. |
