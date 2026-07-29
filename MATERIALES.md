# Mapa de materiales GeoGreen Escolar

Índice del repositorio para distinguir rápidamente las fuentes vigentes, los
paquetes docentes, las versiones técnicas y los antecedentes históricos.

## Fuentes vigentes

- `README.md`: estado general del dispositivo y del programa educativo.
- `PLAN-GEOGREEN-ESCOLAR.md`: ejecución, alcance y articulación del proyecto.
- `RESUMEN-PROYECTO.md`: digest de la postulación formal, con el calendario
  operativo añadido como actualización separada.
- `cronograma/documentos/cronograma-vigente-2026.md`: fuente única de fechas.

## Cronograma y coordinación

- `cronograma/README.md`: calendario resumido y rutas de los documentos vigentes.
- `cronograma/documentos/`: cronograma ejecutivo, lineamientos y desarrollo de
  talleres, mentorías y cierre.
- `cronograma/infografias/`: infografía vigente para coordinación y WhatsApp.
- `reuniones/`: presentaciones y antecedentes históricos de reuniones ya
  realizadas; no sustituyen al cronograma vigente.

## Talleres

- `talleres/01/`: conciencia ambiental y definición del problema.
- `talleres/02/`: ciencia del reciclaje, materiales y separación.
- `talleres/03/`: sensores, prototipado, desarrollo agéntico y proyección a la
  competencia.

Cada taller conserva su README como fuente pedagógica. Según el paquete existen
subcarpetas `documentos/`, `ppt/`, `infografias/`, `media/` y `podcast/`.

El Taller 3 incluye:

- `talleres/03/README.md`: clase completa de 90 minutos.
- `talleres/03/ppt/`: deck editable y presentación final.
- `talleres/03/media/`: banco oficial, fotografías, videos y piezas generadas.
- `talleres/03/infografias/`: serie de una lámina por bloque, con sus prompts.
- `talleres/03/podcast/`: material de coordinación para el equipo ampliado.

## Desafío y equipos

- `banco-ideas/`: propuestas semilla y sensores seleccionados. Es un apoyo para
  desbloquear ideas, no una lista de soluciones obligatorias.
- `docs/infografias/infografia-roles-equipo-geogreen-gptimage.png`: seis
  responsabilidades para distribuir el trabajo dentro de cada equipo.
- `cronograma/documentos/lineamientos-transversales-equipos-entregables-geogreen.*`:
  continuidad, productos y criterios comunes.

## Concurso final

- `concurso/README.md`: lineamientos de participación, presentación, jurado,
  evaluación, desempate, seguridad y reconocimientos.
- `concurso/documentos/lineamientos-concurso-final-geogreen.pdf`: versión
  institucional lista para distribución.
- `concurso/documentos/lineamientos-concurso-final-geogreen.tex`: fuente
  editable del documento.

## Dispositivo y software

- `arduino/`: firmware base, simulación Wokwi, pruebas, cableado y módulo 3D.
- `arduino-r4/`: prototipo físico UNO R4 WiFi y demos de matriz LED.
- `geogreen-v0/`: validación experimental con ESP32 DevKit + A02YYUW.
- `geogreen-v1/`: PCB interna ESP32-C6 candidata de diseño.
- `app/`: PWA de monitoreo y visualización de datos.
- `web/`: contenedor 3D interactivo y plano explosionado.

## Inventario, sensores y compras

- `docs/inventario/`: fotografía e inventario preliminar fechado de los
  componentes disponibles en AIEP.
- `docs/kit-sensores/`: manual para identificar el kit de 45 sensores.
- `docs/presupuestos/`: presupuesto, cotizaciones y antecedentes de compra.
- `Componentes Arduino para GeoGreen - Elias.md` y
  `Componentes ESP32 para GeoGreen - Diego.md`: listas tempranas conservadas como
  antecedentes; no describen por sí solas la arquitectura vigente.

## Herramientas de producción

- `.agent/skills/`: skills pedagógicas y visuales del proyecto.
- `tools/slides-system/`: tema y componentes compartidos para PptxGenJS.
- `tools/pptx-validator/`: validación OpenXML de presentaciones PowerPoint.
- `tools/pbip-validator/`: validación de artefactos Power BI cuando corresponda.
