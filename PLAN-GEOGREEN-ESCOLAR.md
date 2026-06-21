# GeoGreen Escolar - Plan de ejecucion actualizado

> Actualizado: 2026-06-21. Documento base para alinear el relato del proyecto,
> preparar la reunion de lanzamiento con el socio comunitario y seleccionar fuentes
> para NotebookLM.
>
> Resumen formal de la postulacion: [`RESUMEN-PROYECTO.md`](RESUMEN-PROYECTO.md).

## En una frase

GeoGreen Escolar convierte un prototipo de monitoreo de contenedores en una
experiencia educativa de vinculacion con el medio: estudiantes del liceo observan
un problema ambiental real, entienden los residuos y materiales, conocen sensores
y datos, y terminan proponiendo una solucion en formato de pitch.

## Que se presenta al socio comunitario

La reunion del lunes 22 de junio de 2026 no es solo una muestra tecnica. Es el
lanzamiento de una alianza entre AIEP Osorno y el Instituto Comercial Liceo
Bicentenario para ejecutar un programa formativo con tres momentos:

1. Talleres: conciencia ambiental, ciencia del reciclaje y tecnologia/prototipado.
2. Mentorias: acompanamiento de equipos escolares para convertir problemas en ideas.
3. Cierre: evento final con presentacion/pitch de soluciones.

El dispositivo GeoGreen funciona como caso central: permite explicar la cadena
**sensar -> enviar -> visualizar -> alertar** usando un problema cercano, concreto
y territorial.

## Socio, alcance y marco institucional

- **Socio comunitario:** Instituto Comercial Liceo Bicentenario, Osorno.
- **Beneficiarios esperados:** cerca de 60 estudiantes del liceo, organizados en
  dos bloques de 30.
- **Institucion ejecutora:** AIEP Osorno, desde Vinculacion con el Medio.
- **Carreras involucradas:** Programacion y Analisis de Sistemas, Electricidad y
  Electronica, y Trabajo Social/Desarrollo Social.
- **Fondo:** Fondo Concursable VCM 2026, proyecto de continuidad.
- **Presupuesto formal:** $2.080.000, segun postulacion.

La idea clave para el liceo: no vienen a "recibir una charla", sino a participar
como aliado territorial. El liceo aporta contexto, problemas reales, organizacion
escolar y retroalimentacion; AIEP aporta talleres, demostraciones, tecnologia,
materiales y acompanamiento.

## Estado actual del proyecto

El proyecto avanzo bastante despues del primer one-pager. Hoy ya no estamos solo
en planificacion general.

| Area | Estado actual | Archivos principales |
|---|---|---|
| Postulacion y relato | Resumen formal listo; alcance VCM clarificado. | `1_Proyecto (1).docx`, `RESUMEN-PROYECTO.md` |
| Reunion socio comunitario | PPT final armado sobre base institucional de la directora, con seccion GeoGreen completa. | `reuniones/2026-06-22-socio-comunitario/GeoGreen-socio-comunitario-2026-06-22.pptx` |
| Taller 1 | Planificacion, deck e infografias listas. Foco: observar problemas ambientales locales. | `talleres/01/` |
| Taller 2 | README y PPT terminados. Foco: ciencia del reciclaje, materiales, separacion y puente a tecnologia. | `talleres/02/` |
| Taller 3 | Carpeta definida; foco previsto en Arduino, sensores, actuadores, simulacion y GeoGreen como caso. | `talleres/03/README.md`, `docs/infografias/` |
| Arduino base | Firmware con semaforo + buzzer, simulacion Wokwi y tests CLI. | `arduino/` |
| Arduino UNO R4 WiFi | Track fisico real disponible; demos en matriz LED integradas y compiladas con PlatformIO. | `arduino-r4/` |
| Web 3D | Visualizacion con contenedor GLB real, modulo clip-on y modal de circuito Wokwi. | `web/index.html`, `web/plano.html` |
| App de monitoreo | PWA React lista como simulador determinista: mapa de Osorno, contenedores, alertas, bateria, senal e historico. | `app/` |
| Cronograma | Existen opciones antes y despues de vacaciones, con talleres, mentorias y cierre. | `cronograma/` |
| Kit de sensores | Manual/identificacion de kit de 45 sensores en desarrollo/documentado. | `docs/kit-sensores/` |

## La logica tecnica actual

```text
sensar -> enviar -> visualizar -> alertar
```

- **Sensar:** HC-SR04 mide distancia desde la tapa al contenido.
- **Procesar:** firmware convierte la distancia a porcentaje de llenado.
- **Alertar localmente:** semaforo de estados: verde bajo 40 %, amarillo entre
  40 % y 80 %, rojo desde 80 %; buzzer cuando esta lleno.
- **Visualizar:** la PWA muestra contenedores en mapa de Osorno con indicadores.
- **Enviar:** la conectividad real queda como siguiente paso fisico; la ruta
  recomendada hoy es aprovechar Arduino UNO R4 WiFi como placa fisica 5V + WiFi.

Nota tecnica importante: el HC-SR04 entrega Echo a 5 V. En Arduino UNO R4 WiFi se
puede conectar directo; en un ESP32 DevKit de 3.3 V se requiere divisor de voltaje
o level shifter.

## Roadmap realista desde hoy

| Fase | Proposito | Estado |
|---|---|---|
| 1. Relato y lanzamiento | Presentar oficialmente GeoGreen Escolar al liceo y acordar marco de trabajo. | Listo para reunion del 22 de junio. |
| 2. Talleres formativos | Ejecutar Taller 1, 2 y 3 con dos bloques de estudiantes. | Taller 1 y 2 listos; Taller 3 en preparacion. |
| 3. Demo tecnologica | Mostrar la cadena sensar -> enviar -> visualizar -> alertar con firmware, R4, web 3D y app. | Demo base lista; falta calibrar con hardware/sensor real si se usara en vivo. |
| 4. Mentorias | Acompanamiento semanal para que equipos transformen problemas en propuestas. | Cronogramas propuestos; fechas por confirmar con liceo. |
| 5. Evento final | Pitch escolar con retroalimentacion y evidencia de cierre. | Disenado a nivel de programa; pendiente coordinacion fina. |

## Cronograma operativo vigente

La version de coordinacion actual mueve el inicio formativo a agosto:

- **Lunes 22 de junio:** reunion de lanzamiento con el socio comunitario.
- **Junio-julio:** preparacion interna, inventario y coordinacion fina.
- **Lunes 17 de agosto:** Taller 1, problema ambiental / conciencia ambiental local.
- **Martes 18 de agosto:** Taller 2, ciencia del reciclaje / materiales.
- **Lunes 24 de agosto:** Taller 3, sensores, Arduino y GeoGreen.
- **Lunes 31 de agosto:** Mentoria 1.
- **Septiembre:** mentorias, avances y ensayo de pitch, sin actividad la semana del 14 de septiembre por Fiestas Patrias.
- **Lunes 5 de octubre:** evento final tentativo.
- **Semana del 12 de octubre:** cierre interno tentativo.

Fuente principal: `cronograma/documentos/cronograma-vigente-2026.md`. Las
infografias y opciones anteriores quedan como antecedentes historicos, no como la
ultima version de calendario.

## Roles por area

| Area | Aporte |
|---|---|
| Programacion y Analisis de Sistemas | Firmware, app, dashboard, visualizaciones, datos, simulacion y relato tecnico. |
| Electricidad y Electronica | Sensores, conexiones, actuadores, seguridad electrica, prototipado y montaje. |
| Trabajo Social / Desarrollo Social | Facilitacion, participacion estudiantil, enfoque comunitario, evidencias y cierre pedagogico. |
| Liceo | Contexto escolar, estudiantes, problemas reales, espacios, horarios y retroalimentacion. |

## Material listo para usar en la reunion

- PPT final para el socio comunitario:
  `reuniones/2026-06-22-socio-comunitario/GeoGreen-socio-comunitario-2026-06-22.pptx`
- PDF de revision:
  `reuniones/2026-06-22-socio-comunitario/build/GeoGreen-socio-comunitario-2026-06-22.pdf`
- Montaje visual del deck:
  `reuniones/2026-06-22-socio-comunitario/build/montage-final.png`
- Demo Arduino R4:
  `pio run -d arduino-r4/geogreen_show -t upload`
- App PWA:
  `cd app && npm run dev`
- Web 3D:
  `python -m http.server 8099 --directory web`

## Decisiones a cerrar con el liceo

1. Cursos o niveles participantes.
2. Fechas de talleres y opcion de cronograma.
3. Horarios de los dos bloques de 30 estudiantes.
4. Espacios disponibles: sala, laboratorio, proyector, internet, mesas de trabajo.
5. Docentes o encargados del liceo que acompanaran cada sesion.
6. Tipo de evidencia esperada: asistencia, fotos, productos por equipo, rubrica,
   cierre/pitch.
7. Nivel de exposicion publica del evento final: interno, comunidad escolar o con
   invitados AIEP.

## Mensaje guia para Diego

La reunion debe sonar asi: GeoGreen Escolar no llega a instalar una solucion desde
afuera; llega a abrir un proceso de aprendizaje aplicado con el liceo. La tecnologia
es el caso vivo que permite unir reciclaje, sensores, datos, comunidad e innovacion.

Frase util para presentar:

> GeoGreen Escolar parte mirando un problema cotidiano del liceo, lo entiende desde
> los residuos y los materiales, y luego muestra como la tecnologia puede ayudar a
> medir, visualizar y tomar mejores decisiones.

## Fuentes recomendadas para NotebookLM

Para un podcast personal de preparacion, seleccionar:

1. `PLAN-GEOGREEN-ESCOLAR.md` - este documento actualizado.
2. `reuniones/2026-06-22-socio-comunitario/GeoGreen-socio-comunitario-2026-06-22.pptx`
   o su PDF exportado.
3. `RESUMEN-PROYECTO.md`.
4. `cronograma/README.md` y/o las opciones de cronograma en `cronograma/documentos/`.
5. `talleres/01/README.md`, `talleres/02/README.md`, `talleres/03/README.md` si
   quieres que el audio repase el contenido de los talleres.

Evitar para ese podcast personal las fuentes muy tecnicas de componentes, salvo
que quieras un segundo audio solo para preparar respuestas tecnicas.
