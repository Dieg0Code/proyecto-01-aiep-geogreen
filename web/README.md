# Simulador 3D GeoGreen

Demo interactiva offline para apoyar el **Taller 3: Innovación con propósito**.
No requiere prototipo físico: permite explicar la lógica GeoGreen mediante un
contenedor municipal simulado que se llena al agregar residuos.

## Cómo abrirlo

Desde la raíz del proyecto:

```bash
uv run python -m http.server 8099 --directory web
```

Luego abrir:

```text
http://localhost:8099/
```

La demo usa Three.js desde `web/vendor/`, por lo que funciona sin internet una
vez levantado el servidor local.

## URLs útiles

```text
http://localhost:8099/?fill=85
```

Abre la demo directamente con el contenedor en estado lleno.

```text
http://localhost:8099/?mode=auto
```

Inicia una secuencia automática de llenado para exposición.

## Uso pedagógico

La pantalla permite mostrar la lógica:

```text
sensar -> enviar -> visualizar -> alertar
```

- **Sensar:** el sensor simulado estima distancia al contenido.
- **Enviar:** la lectura podría transmitirse por WiFi o LoRa.
- **Visualizar:** el tablero muestra porcentaje, distancia y estado.
- **Alertar:** desde 80% recomienda programar retiro.

## Interacciones disponibles

- Botones para agregar residuos rápidamente durante la explicación.
- Objetos en el suelo que se pueden arrastrar al contenedor: botellas, cajas,
  latas y residuos mixtos.
- Botón **Abrir tapa / ver circuito** para mostrar una representación simple del
  módulo GeoGreen: sensor, placa, batería, cables, semáforo y buzzer.
- Botón **Vaciar contenedor** para reiniciar la simulación.

## Modelo 3D del contenedor

El contenedor es un modelo 3D real cargado desde `web/vendor/models/contenedor.glb`
con `GLTFLoader`. La tapa (primitive separado del GLB) se anima sobre un pivote
para conservar el "Abrir tapa / ver circuito"; si el GLB no carga, la demo cae a
un contenedor procedural de respaldo.

- Modelo: "Dumpster" de **Quaternius** — licencia **CC0** (dominio público, sin
  atribución requerida), vía [Poly Pizza](https://poly.pizza/m/PKsbolkZSr).
- Para cambiarlo, reemplaza `web/vendor/models/contenedor.glb` por otro `.glb`
  (se reescala automáticamente a las proporciones de la escena).
