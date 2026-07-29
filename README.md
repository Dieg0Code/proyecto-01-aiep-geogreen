# GeoGreen Escolar

GeoGreen comenzó como una propuesta para monitorear el llenado de contenedores de
reciclaje y evolucionó hacia un programa educativo de AIEP Osorno. El dispositivo
funciona como caso central para enseñar sostenibilidad, sensores, datos,
prototipado, desarrollo agéntico y comunicación de soluciones.

- **Socio comunitario:** Instituto Comercial Liceo Bicentenario, Osorno.
- **Público objetivo:** cerca de 60 estudiantes, organizados en equipos.
- **Programa:** tres talleres, cuatro mentorías, ensayo y competencia final.
- **Lógica tecnológica:** `sensar → enviar → visualizar → alertar`.

## Estado vigente · julio de 2026

El repositorio reúne dos líneas de trabajo conectadas:

1. **El dispositivo:** firmware, simulación, prototipos físicos, visualización,
   diseño 3D y PCB.
2. **El programa educativo:** talleres, cronograma, presentaciones, infografías,
   banco de ideas, inventario y materiales para la competencia.

Los Talleres 1 y 2 cuentan con planificación y presentación. El Taller 3 dispone
de un paquete completo de 90 minutos: README pedagógico, deck editable, banco
audiovisual, podcast de coordinación y una serie de cuatro infografías.

El calendario operativo vigente está centralizado en
[`cronograma/README.md`](cronograma/README.md). Los talleres se realizarán el 17,
18 y 24 de agosto; las mentorías se extenderán hasta el 28 de septiembre; el
evento final con jurado y premiación está programado para el 5 de octubre; y el
cierre interno corresponde a la semana del 12 de octubre.

## Evolución del dispositivo

GeoGreen no corresponde a un único circuito inmutable. El repositorio conserva
distintas versiones porque cada una responde a una etapa del proceso.

| Versión o track | Propósito | Estado |
|---|---|---|
| Prototipo original de referencia | `HC-SR04` + módulo de comunicación celular. No incluía semáforo ni buzzer. | Antecedente histórico reconstruido para explicar la evolución. |
| `arduino/` | Firmware base con porcentaje, semáforo y buzzer; simulación y pruebas con PlatformIO + Wokwi CLI. | Implementado y automatizado. |
| `arduino-r4/` | Prototipo físico con UNO R4 WiFi, `HC-SR04`, OLED, semáforo y buzzer; además, demos en la matriz LED integrada. | Construido y probado en protoboard. |
| `geogreen-v0/` | Validación de medición con ESP32 DevKit + sensor ultrasónico impermeable `A02YYUW`. | Track experimental de medición. |
| `geogreen-v1/` | PCB interna de dos capas con ESP32-C6, USB-C, conectores, semáforo y buzzer. | Candidata de diseño con DRC limpio; requiere revisión de ingeniería antes de fabricar. |
| `app/` | PWA con mapa de Osorno, estados, historial, batería, señal y alertas. | Interfaz funcional sobre una capa de telemetría reemplazable. |
| `web/` | Contenedor 3D interactivo y plano explosionado del módulo. | Demos funcionales sin proceso de build. |

La versión física educativa utilizada como demostración transforma una medición
de distancia en una respuesta comprensible:

1. El `HC-SR04` mide la distancia entre la tapa y el contenido.
2. La placa calcula un porcentaje de llenado.
3. El semáforo utiliza los umbrales `< 40 %`, `40–79 %` y `≥ 80 %`.
4. La OLED muestra porcentaje y estado.
5. El buzzer se activa en el estado rojo.
6. Una versión conectada puede enviar el dato para visualizarlo y generar alertas.

## Programa educativo y competencia

| Etapa | Fecha | Propósito |
|---|---|---|
| Taller 1 | Lunes 17 de agosto | Identificar un problema ambiental concreto y formar los equipos. |
| Taller 2 | Martes 18 de agosto | Comprender residuos, materiales, separación y reciclabilidad. |
| Taller 3 | Lunes 24 de agosto | Relacionar el problema con una variable, un sensor y una primera prueba segura. |
| Mentorías 1–4 | 31 de agosto al 28 de septiembre | Revisar avances, orientar decisiones y destrabar dificultades. |
| Evento final | Lunes 5 de octubre | Presentar ante el jurado, recibir retroalimentación y participar en la premiación. |

El desarrollo de las propuestas ocurre principalmente mediante el trabajo
autónomo de cada equipo entre sesiones. Las mentorías no sustituyen ese trabajo:
sirven para revisar evidencia, orientar y ayudar a resolver bloqueos concretos.

GeoGreen muestra hasta dónde puede crecer una idea, pero no es una solución que
los equipos deban copiar. La competencia valora la relación entre problema,
sensor, respuesta, evidencia, mejora y claridad de la presentación.

Los lineamientos comunes de participación, presentación, jurado, evaluación,
desempate y seguridad se encuentran en
[`concurso/README.md`](concurso/README.md). La versión institucional para
distribución está disponible en
[`concurso/documentos/lineamientos-concurso-final-geogreen.pdf`](concurso/documentos/lineamientos-concurso-final-geogreen.pdf).

## Inicio rápido

### Simulación y pruebas del firmware base

Requiere PlatformIO, Wokwi CLI y un token de Wokwi guardado fuera del repositorio
en `~/.wokwi_token`.

```bash
bash arduino/sim.sh
bash arduino/test.sh
```

### Prototipo físico UNO R4 WiFi

```bash
pio run -d arduino-r4/geogreen_proto
pio run -d arduino-r4/geogreen_proto -t upload
```

### Aplicación de monitoreo

```bash
cd app
npm install
npm run dev
```

### Visualización 3D

```bash
python -m http.server 8099 --directory web
```

Abrir `http://localhost:8099/` para el contenedor o
`http://localhost:8099/plano.html` para el plano del módulo.

## Mapa del repositorio

```text
.
├── arduino/                 # Firmware base, Wokwi, pruebas, cableado y 3D
├── arduino-r4/              # Demos y prototipo físico UNO R4 WiFi
├── geogreen-v0/             # Validación ESP32 DevKit + A02YYUW
├── geogreen-v1/             # PCB interna con ESP32-C6
├── app/                     # PWA de monitoreo
├── web/                     # Contenedor 3D y plano interactivo
├── talleres/01-03/          # Paquetes pedagógicos de los talleres
├── banco-ideas/             # Ideas semilla y sensores seleccionados
├── concurso/                # Lineamientos y documentos del evento final
├── cronograma/              # Calendario operativo vigente
├── reuniones/               # Materiales y antecedentes de coordinación
├── docs/                    # Inventario, infografías, presupuestos y guías
└── tools/                   # Sistema de slides y validadores
```

Índice ampliado de materiales: [`MATERIALES.md`](MATERIALES.md).

## Seguridad eléctrica esencial

- La UNO R4 WiFi trabaja con lógica de `5 V`; el pin `Echo` del `HC-SR04` puede
  conectarse directamente.
- Un ESP32 DevKit trabaja normalmente con lógica de `3,3 V`; el mismo `Echo` de
  `5 V` requiere divisor de voltaje o adaptación de nivel.
- Todo circuito se arma y revisa desconectado. Antes de energizar se comprueban
  voltaje, pinout, polaridad, resistencias y posibles cortocircuitos.

## Fuentes documentales

- [`RESUMEN-PROYECTO.md`](RESUMEN-PROYECTO.md) — alcance formal de la postulación y
  diferencia respecto del calendario operativo.
- [`PLAN-GEOGREEN-ESCOLAR.md`](PLAN-GEOGREEN-ESCOLAR.md) — estado de ejecución y
  articulación del programa.
- [`cronograma/documentos/cronograma-vigente-2026.md`](cronograma/documentos/cronograma-vigente-2026.md)
  — fuente única de fechas operativas.
- [`talleres/03/README.md`](talleres/03/README.md) — fuente pedagógica del Taller 3.
- [`concurso/README.md`](concurso/README.md) — lineamientos del Concurso Final
  GeoGreen Escolar 2026.

---

Proyecto académico de Vinculación con el Medio · AIEP Osorno · Ingeniería,
Energía y Tecnología + Desarrollo Social y Educación.
