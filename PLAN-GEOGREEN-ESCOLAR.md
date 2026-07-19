# GeoGreen Escolar · Plan de ejecución vigente

> Actualizado: 13 de julio de 2026.
>
> Este documento describe el estado operativo del programa. El alcance formal de
> la postulación se conserva en [`RESUMEN-PROYECTO.md`](RESUMEN-PROYECTO.md) y las
> fechas vigentes en [`cronograma/README.md`](cronograma/README.md).

## En una frase

GeoGreen Escolar utiliza la evolución de un sistema de monitoreo de contenedores
para que estudiantes de tercero medio comprendan un problema ambiental,
investiguen sensores, formulen una solución propia, produzcan evidencia y la
presenten en una competencia final.

## Alcance actual

- **Socio comunitario:** Instituto Comercial Liceo Bicentenario, Osorno.
- **Beneficiarios proyectados:** cerca de 60 estudiantes, distribuidos en dos
  bloques y organizados en equipos.
- **Institución ejecutora:** AIEP Osorno, desde Vinculación con el Medio.
- **Áreas involucradas:** Programación y Análisis de Sistemas; Electricidad y
  Electrónica; Trabajo Social / Desarrollo Social.
- **Fondo:** Fondo Concursable VCM 2026, línea de continuidad.
- **Presupuesto formal:** `$2.080.000`, según la postulación.

## Propuesta formativa

El programa se articula como un recorrido continuo:

```text
PROBLEMA AMBIENTAL
        ↓
RESIDUOS Y MATERIALES
        ↓
SENSORES, DATOS Y PRIMERA PRUEBA
        ↓
TRABAJO AUTÓNOMO + MENTORÍAS
        ↓
EVIDENCIA, PRESENTACIÓN Y COMPETENCIA
```

GeoGreen funciona como referente visible, no como solución obligatoria. Su ciclo
tecnológico permite mostrar cómo una idea puede crecer:

```text
SENSAR → ENVIAR → VISUALIZAR → ALERTAR
```

Cada equipo decide hasta dónde necesita avanzar. Agregar WiFi, una aplicación,
una carcasa o una PCB solo tiene valor cuando responde al problema y puede
justificarse con evidencia.

## Estado de los entregables

| Área | Estado vigente | Fuente principal |
|---|---|---|
| Postulación | Resumen formal disponible y separado del calendario operativo. | `1_Proyecto (1).docx`, `RESUMEN-PROYECTO.md` |
| Lanzamiento | Reunión con el socio comunitario realizada; deck y registros conservados. | `reuniones/2026-06-22-socio-comunitario/` |
| Taller 1 | Planificación, presentación, documentos e infografías disponibles. | `talleres/01/` |
| Taller 2 | README y presentación terminados, con material complementario. | `talleres/02/` |
| Taller 3 | Clase de 90 minutos y paquete completo terminados: README, PPT, media, podcast e infografías por bloque. | `talleres/03/` |
| Equipos | Seis responsabilidades definidas para distribuir propósito, documentación, agente, seguridad, evidencia y vocería. | `docs/infografias/infografia-roles-equipo-geogreen-gptimage.png` |
| Banco de ideas | Ideas semilla y sensores seleccionados disponibles como apoyo no obligatorio. | `banco-ideas/` |
| Cronograma | Calendario operativo único desde agosto hasta el cierre de octubre. | `cronograma/` |
| Inventario | Catálogo visual e inventario preliminar fechado; manual del kit de sensores disponible. | `docs/inventario/`, `docs/kit-sensores/` |
| Prototipo físico | UNO R4 WiFi con HC-SR04, OLED, semáforo y buzzer construido en protoboard. | `arduino-r4/geogreen_proto/`, `talleres/03/media/fotos/` |
| Simulación | Firmware base compilable, simulable y verificable desde CLI. | `arduino/` |
| Visualización | PWA de monitoreo y demos 3D funcionales. | `app/`, `web/` |
| PCB | Diseño V1 de dos capas con DRC limpio; sujeto a revisión de ingeniería antes de fabricación. | `geogreen-v1/` |

## Evolución técnica que se transfiere en el Taller 3

El prototipo original de referencia utilizaba un `HC-SR04` y un módulo de
comunicación celular. No incluía semáforo ni buzzer. La versión educativa actual
añadió respuestas locales, una pantalla y una placa con WiFi; después se amplió
con software de visualización, diseño 3D y una PCB.

La enseñanza no se organiza como una clase de electrónica avanzada. Los 90
minutos transfieren una ruta de prototipado:

```text
PROBLEMA → INTENCIÓN → CONTEXTO → PLAN → PRUEBA → EVIDENCIA → MEJORA
```

Los agentes pueden ayudar a investigar, explicar, proponer conexiones, escribir
una primera versión de código y operar herramientas. El equipo humano conserva
el propósito, la seguridad, la verificación y la decisión de avanzar.

## Trabajo de los equipos y mentorías

El Taller 3 deja una propuesta tecnológica inicial: problema, variable, sensor,
regla `cuando… entonces…`, primera prueba y siguiente hito.

El desarrollo posterior ocurre principalmente con el tiempo y la constancia de
cada equipo. Las mentorías cumplen tres funciones:

1. **Revisar** lo que el equipo ya hizo y la evidencia que presenta.
2. **Orientar** decisiones técnicas, ambientales, sociales o comunicacionales.
3. **Destrabar** una dificultad concreta sin reemplazar el trabajo del equipo.

Docentes y monitores no conectan el circuito ni producen la solución completa
por los estudiantes. Intervienen directamente cuando existe riesgo eléctrico o
una condición técnica que impide continuar con seguridad.

## Competencia final

El evento del 5 de octubre incluye presentación ante jurado, retroalimentación y
premiación. Una propuesta se fortalece cuando:

- aborda un problema relevante;
- relaciona coherentemente sensor, datos y respuesta;
- presenta evidencia de pruebas y mejoras;
- utiliza cada recurso técnico con un propósito claro;
- comunica qué hace, para quién y por qué importa.

Mientras más lejos lleve un equipo su idea con coherencia y evidencia, más
sólida será su presentación. Superar el referente GeoGreen es válido siempre que
el avance pueda demostrarse y explicarse.

## Cronograma operativo

| Fecha | Instancia | Foco |
|---|---|---|
| Lunes 22 de junio | Lanzamiento | Presentación del programa al socio comunitario. |
| Junio–julio | Preparación interna | Materiales, inventario y producción docente. |
| Lunes 17 de agosto | Taller 1 | Problema ambiental y formación de equipos. |
| Martes 18 de agosto | Taller 2 | Ciencia del reciclaje y materiales. |
| Lunes 24 de agosto | Taller 3 | Sensores, prototipado y desarrollo agéntico. |
| Lunes 31 de agosto | Mentoría 1 | Problema, usuario, contexto y primera solución. |
| Lunes 7 de septiembre | Mentoría 2 | Solución, recursos, materiales y roles. |
| Semana del 14 de septiembre | Sin actividades | Fiestas Patrias. |
| Lunes 21 de septiembre | Mentoría 3 | Evidencia de maqueta, simulación, diagrama o prototipo. |
| Lunes 28 de septiembre | Mentoría 4 y ensayo | Guion, soporte visual, roles y tiempos. |
| Viernes 2 de octubre | Hito comunicacional | Comunicación del cierre próximo. |
| Lunes 5 de octubre | Evento final | Jurado, retroalimentación y premiación. |
| Semana del 12 de octubre | Cierre interno | Consolidación de evidencias y materiales. |

## Aporte por área

| Área | Aporte principal |
|---|---|
| Programación y Análisis de Sistemas | Firmware, simulación, agentes, software, datos, dashboard y comunicación técnica. |
| Electricidad y Electrónica | Sensores, placas, actuadores, seguridad, montaje y validación física. |
| Trabajo Social / Desarrollo Social | Facilitación, participación, contexto comunitario, evidencias y comunicación. |
| Liceo | Contexto escolar, estudiantes, problemas reales, espacios y retroalimentación. |

## Material prioritario para coordinación

1. `cronograma/documentos/cronograma-vigente-2026.md`.
2. `cronograma/documentos/lineamientos-transversales-equipos-entregables-geogreen.pdf`.
3. `talleres/03/README.md`.
4. `talleres/03/ppt/Taller-03-De-la-idea-al-prototipo.pptx`.
5. `talleres/03/podcast/Electrónica_y_pensamiento_crítico_en_GeoGreen_Escolar_interno.m4a`.

Los decks de reuniones anteriores se conservan como antecedentes históricos y
no deben utilizarse como fuente de fechas cuando contradigan el cronograma
vigente.
