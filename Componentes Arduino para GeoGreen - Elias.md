# Componentes mínimos para prototipo GeoGreen con Arduino

Don Elías, para armar una maqueta funcional del proyecto GeoGreen con Arduino necesitamos confirmar o conseguir estos componentes:

| Componente | Cantidad mínima | Para qué sirve |
|---|---:|---|
| Arduino UNO o Arduino Nano | 1 | Es el controlador principal del prototipo. Lee el sensor y activa las alertas. |
| Sensor ultrasónico HC-SR04 | 1 | Mide la distancia entre la tapa y el contenido del contenedor. Con eso se calcula el nivel de llenado. |
| Protoboard | 1 | Permite armar el circuito sin soldar, ideal para taller y pruebas. |
| Cables jumper | 1 pack | Conectan Arduino, sensor, luces y buzzer. |
| LED verde, amarillo y rojo | 1 de cada uno | Funcionan como semáforo: bajo, medio y alto nivel de llenado. |
| Resistencias 220 ohm o 330 ohm | 3 | Protegen los LED para que no se quemen. |
| Buzzer activo 5V | 1 | Emite una alerta sonora cuando el contenedor está lleno. |
| Cable USB Arduino | 1 | Sirve para programar y alimentar el Arduino. |
| Contenedor pequeño o maqueta | 1 | Representa el basurero/contenedor donde se probará el sensor. |

## Resultado esperado

Con estos materiales podemos construir una maqueta que:

- Mida el nivel de llenado de un contenedor.
- Muestre el estado con luces verde, amarilla y roja.
- Active una alarma cuando el contenedor esté lleno.
- Sirva como demostración práctica para estudiantes.

## Proyección del prototipo

En una segunda etapa, el prototipo puede escalarse hacia una aplicación o tablero donde se registren los contenedores, su ubicación y su estado de llenado. Para eso se podría trabajar una georreferenciación simple de los puntos de reciclaje y una visualización tipo mapa.

## Opcional recomendado

Si está disponible, agregar una pantalla LCD u OLED para mostrar el porcentaje de llenado en pantalla. No es obligatorio, pero mejora mucho la presentación del prototipo.
