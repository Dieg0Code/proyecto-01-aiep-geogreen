# Capturas de la aplicación GeoGreen

Set de capturas del panel de monitoreo GeoGreen (`app/`), tomadas sobre la versión vigente
de la interfaz para usarlas como material gráfico en presentaciones y documentos del programa.

Capturadas el **4 de agosto de 2026** con navegador automatizado sobre el entorno local,
en español de Chile.

## Contenido

| Archivo | Vista | Resolución | Para qué sirve |
| --- | --- | --- | --- |
| `01-mapa-red-contenedores.png` | Mapa de la red completa sobre Osorno | 3840×2160 | Lámina principal: la flota georreferenciada y el semáforo de llenado |
| `02-ficha-contenedor.png` | Ficha del contenedor seleccionado | 3840×2160 | Muestra el dato del sensor convertido en decisión: nivel, respuesta operativa, batería, señal, historial y ubicación verificada |
| `03-ruta-retiro.png` | Ruta de retiro optimizada | 3840×2160 | Cierra el relato: 8 paradas, 32,7 km y ~58 min desde el Vertedero Curaco |
| `04-inventario-contenedores.png` | Inventario operacional | 3840×2160 | Tabla de los 12 puntos con llenado, respuesta y salud del módulo |
| `05-alertas.png` | Panel de alertas | 3840×2160 | Encuadre completo de la vista |
| `05-alertas-recorte.png` | Panel de alertas, sin área vacía | 3840×1400 | Versión recomendada para diapositiva |
| `06-movil-mapa.png` | Mapa en teléfono | 1170×2532 | Evidencia de que es una PWA usable en terreno |
| `07-movil-ficha-contenedor.png` | Ficha en teléfono | 1170×2532 | La misma información operativa en pantalla pequeña |
| `00-hoja-de-contacto.jpg` | Mosaico de todas las capturas | 1980×4215 | Vista rápida para elegir qué lámina usar |

## Notas de uso

- Las capturas de escritorio están en 16:9 (3840×2160), así que entran completas en una
  diapositiva sin deformarse y admiten recortes sin perder nitidez.
- Las ubicaciones del mapa corresponden a lugares reales de Osorno y sus coordenadas fueron
  verificadas contra cartografía actual. Los niveles de llenado, batería, señal e historial
  responden al simulador de telemetría del proyecto, con perfiles horarios distintos por punto.
- Para regenerarlas basta levantar la aplicación (`cd app && npm run dev`) y repetir el recorrido:
  mapa → seleccionar un contenedor → planificar retiro → inventario → alertas, en escritorio y
  en 390×844.
