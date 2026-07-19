# GeoGreen Escolar Osorno

## Desarrollo de talleres y mentorías

> Documento de apoyo para alinear el contenido formativo del proyecto GeoGreen
> Escolar Osorno, a partir de la postulación Fondo VCM 2026 y su cronograma de
> trabajo. Actualizado al 13 de julio de 2026 y subordinado al calendario vigente
> de `cronograma-vigente-2026.md`.

## 1. Propósito general

GeoGreen Escolar Osorno busca acercar a estudiantes del Instituto Comercial
Liceo Bicentenario a la sostenibilidad, la economía circular y la innovación
tecnológica, usando como caso central el sistema GeoGreen: una solución de bajo
costo para monitorear el nivel de llenado de contenedores, visualizar datos y
activar alertas que permitan mejorar la gestión de residuos.

La secuencia formativa se organiza en tres talleres, un período de mentorías,
un ensayo de pitch y un evento final. El foco no está solamente en mostrar un
prototipo, sino en que los estudiantes comprendan el problema, exploren cómo la
tecnología puede aportar y propongan sus propias ideas o miniprototipos bajo la
lógica:

```text
sensar -> enviar -> visualizar -> alertar
```

## 2. Enfoque metodológico

Los talleres se plantean como experiencias breves, prácticas y participativas.
Cada sesión combina explicación simple, demostración, trabajo grupal y cierre
reflexivo. La idea es que los estudiantes puedan conectar los contenidos con su
propio entorno escolar y barrial.

Principios de trabajo:

- Aprender haciendo, con ejemplos visibles y materiales concretos.
- Usar lenguaje claro, evitando tecnicismos innecesarios.
- Relacionar sostenibilidad, tecnología y vida cotidiana.
- Organizar equipos de seis con responsabilidades persistentes de coordinación,
  investigación, diseño, tecnología, pruebas y evidencia, y comunicación. Los
  roles pueden rotar; las decisiones siguen perteneciendo al equipo completo.
- Recoger evidencias simples: listas de asistencia, fotografías, fichas de
  trabajo, registros de mentoría y rúbricas.

## 3. Taller 1: Conciencia ambiental local

**Fecha:** lunes 17 de agosto de 2026

**Responsable principal sugerido:** Desarrollo Social y Educación  
**Verificadores:** lista de asistencia, fotografías y material de trabajo.

### Objetivo

Introducir a los estudiantes en los principales problemas asociados a los
residuos, la separación en origen y los hábitos de reciclaje, situando la
conversación en el contexto de Osorno y del propio establecimiento.

### ¿De qué se trata?

Este taller abre el programa desde la pregunta ambiental y social: qué residuos
generamos, qué pasa cuando se mezclan, por qué cuesta reciclar bien y cómo los
hábitos cotidianos afectan la gestión de residuos. Antes de hablar de sensores
o microcontroladores, se busca que los estudiantes entiendan que GeoGreen nace
para responder a un problema real del territorio.

### Actividades sugeridas

1. **Activación inicial:** conversación guiada sobre qué residuos se generan en
   el colegio y en la casa.
2. **Mapa de problemas:** los equipos identifican puntos críticos: basureros
   llenos, mala separación, poca señalética, desconocimiento de puntos limpios o
   baja frecuencia de retiro.
3. **Clasificación de residuos:** dinámica breve para distinguir reciclables,
   no reciclables y residuos que requieren manejo especial.
4. **Cierre reflexivo:** cada equipo define un problema ambiental concreto que
   podría mejorar con información, organización o tecnología.

### Resultado esperado

Al finalizar, los estudiantes deberían reconocer que la gestión de residuos no
depende solo de tener contenedores, sino también de hábitos, información,
coordinación y decisiones oportunas.

## 4. Taller 2: Ciencia del reciclaje

**Fecha:** martes 18 de agosto de 2026

**Responsable principal sugerido:** trabajo conjunto entre DSE e I/E/T  
**Verificadores:** lista de asistencia, fotografías y fichas de trabajo.

### Objetivo

Explicar de forma simple cómo las propiedades de los materiales, su ciclo de
vida y su correcta separación influyen en la posibilidad de reciclarlos.

### ¿De qué se trata?

Este taller conecta la educación ambiental con nociones científicas básicas. Se
trabaja la idea de que no todos los residuos se comportan igual: algunos se
pueden recuperar con facilidad, otros se contaminan si se mezclan y otros
requieren procesos específicos. El objetivo es que los estudiantes comprendan
que reciclar también implica observar, clasificar, medir y tomar decisiones.

### Actividades sugeridas

1. **Exploración de materiales:** revisión de ejemplos de plástico, papel,
   cartón, vidrio, metal y residuos orgánicos.
2. **Propiedades y decisiones:** discusión simple sobre peso, volumen,
   limpieza, compactación y contaminación del material.
3. **Ciclo de vida:** representación breve del camino de un residuo desde el
   consumo hasta su recuperación o disposición final.
4. **Mini desafío:** los equipos proponen una mejora concreta para reducir,
   reutilizar o separar mejor un residuo frecuente del establecimiento.

### Resultado esperado

Los estudiantes deberían comprender que la separación correcta en origen mejora
la recuperación de materiales y reduce la cantidad de residuos mal dispuestos.

## 5. Taller 3: Innovación con propósito, GeoGreen como caso

**Fecha:** lunes 24 de agosto de 2026

**Responsable principal sugerido:** Ingeniería, Energía y Tecnología  
**Verificadores:** lista de asistencia, fotografías y guía del desafío.

### Objetivo

Relacionar un problema ambiental con una variable observable y un sensor,
formular una propuesta inicial, utilizar agentes para planificar una prueba
pequeña y comprender cómo un prototipo puede crecer hacia una solución integrada.

### ¿De qué se trata?

En este taller GeoGreen aparece como referente de una ruta completa: simulación,
prototipo físico, software, diseño 3D y PCB. La sesión dura 90 minutos y no busca
enseñar electrónica avanzada. Su propósito es que los estudiantes comprendan
las herramientas disponibles, identifiquen un sensor pertinente y produzcan una
primera dirección de trabajo segura y comprobable.

El prototipo original de referencia utilizaba un `HC-SR04` y un módulo de
comunicación celular; no incluía semáforo ni buzzer. La versión educativa actual
añade respuestas locales, OLED y una placa UNO R4 WiFi. Esta comparación muestra
que una solución evoluciona mediante decisiones, pruebas y evidencia.

### Contenidos clave

- Placa, protoboard, sensor, salida, voltaje y pinout.
- Protocolo de seguridad antes de conectar USB.
- Selección `problema → variable observable → sensor`.
- Desarrollo agéntico con intención, contexto, preguntas, plan y prueba pequeña.
- Verificación humana de conexiones, código y evidencia.
- Ruta `sensar → enviar → visualizar → alertar` y aporte de software, diseño 3D y PCB.

### Actividades sugeridas

1. **Evolución GeoGreen:** contrastar simulación, prototipo físico, visualización y PCB.
2. **Del mundo físico al dato:** reconocer placa, protoboard, sensor, salida y precauciones.
3. **Prototipado agéntico:** elegir una variable y un sensor, entregar contexto al
   agente y acordar una primera prueba segura.
4. **Proyección:** registrar la propuesta, el nivel de madurez y un siguiente hito verificable.

### Resultado esperado

Al finalizar, cada equipo conserva una propuesta tecnológica inicial: problema,
variable, sensor, regla `cuando… entonces…`, plan de prueba, primera evidencia o
prueba pendiente y próximo hito. El desarrollo continúa con trabajo autónomo
entre sesiones; las mentorías revisan y orientan ese avance.

## 6. Mentorías a equipos escolares

**Periodo:** 31 de agosto al 28 de septiembre de 2026

**Responsable sugerido:** trabajo conjunto entre DSE e I/E/T  
**Verificador:** registro de mentorías por equipo.

### Objetivo

Acompañar a los equipos para transformar sus ideas iniciales en propuestas más
claras, viables y presentables para el desafío final.

### ¿De qué se tratan?

Las mentorías son espacios breves para **revisar, orientar y destrabar**. El
trabajo de desarrollo ocurre principalmente entre sesiones con el tiempo y la
constancia de cada equipo. Algunos equipos podrán presentar una maqueta física,
otros una simulación, un diagrama, un tablero o una propuesta de intervención.
La mentoría no construye esos productos por los estudiantes: examina lo realizado,
formula preguntas, entrega referencias y ayuda a decidir el siguiente paso.

### Estructura sugerida de cada mentoría

1. **Revisión del problema:** comprobar que el equipo entiende qué quiere
   resolver y para quién.
2. **Revisión de la solución:** verificar si la propuesta responde al problema.
3. **Aplicación de la lógica GeoGreen:** identificar cómo la idea sensa, envía,
   visualiza o alerta.
4. **Viabilidad:** ajustar la idea a materiales, tiempo y nivel escolar.
5. **Próximo paso:** dejar una tarea concreta para la siguiente revisión.

El acompañamiento avanza desde pregunta, pista y referencia hacia la revisión
técnica. La intervención directa se reserva para riesgos eléctricos, daño posible
o una condición que impida continuar de forma segura.

### Preguntas guía para los equipos

- ¿Qué problema de residuos queremos resolver?
- ¿Dónde ocurre y a quién afecta?
- ¿Qué información necesitamos medir u observar?
- ¿Cómo se avisaría que hay un problema?
- ¿Quién usaría la solución?
- ¿Cómo sabríamos que funcionó?
- ¿Qué podemos mostrar en el evento final?

### Rol de I/E/T durante las mentorías

- Orientar el componente técnico de la idea.
- Explicar límites simples de sensores, datos, energía y conectividad.
- Ayudar a convertir ideas generales en diagramas o prototipos comprensibles.
- Revisar seguridad básica en cualquier maqueta o demostración.

### Rol de DSE durante las mentorías

- Facilitar la participación de todos los integrantes del equipo.
- Apoyar la claridad del problema social o ambiental.
- Cuidar el lenguaje, la inclusión y la distribución de roles.
- Ayudar a preparar la comunicación de la propuesta para el pitch.

## 7. Ensayo de pitch escolar

**Fecha:** lunes 28 de septiembre de 2026, integrado a la Mentoría 4

**Responsable principal sugerido:** Desarrollo Social y Educación  
**Verificadores:** listas de asistencia y rúbricas.

### Objetivo

Preparar a los equipos para presentar sus ideas de manera clara, breve y
convincente en el evento final.

### ¿De qué se trata?

El ensayo de pitch ayuda a ordenar la presentación de cada equipo. Se busca que
los estudiantes puedan explicar el problema, la solución, el uso de tecnología y
el impacto esperado sin depender de una exposición larga o demasiado técnica.

### Estructura sugerida del pitch

1. Problema detectado.
2. A quién afecta.
3. Solución propuesta.
4. Cómo aplica la lógica sensar -> enviar -> visualizar -> alertar.
5. Beneficio ambiental o comunitario.
6. Qué mostrarán: maqueta, simulación, afiche, diagrama o prototipo.

### Resultado esperado

Cada equipo debería llegar al evento final con una presentación breve,
ordenada, ensayada y acompañada de algún soporte visual.

## 8. Evento final y cierre

**Evento final:** lunes 5 de octubre de 2026

**Cierre interno:** semana del 12 de octubre de 2026

**Responsable sugerido:** trabajo conjunto entre DSE e I/E/T  
**Verificadores:** programa, jurado, fotografías e informe final.

### Objetivo

Realizar la competencia final donde los equipos presenten sus propuestas ante un
jurado, reciban retroalimentación y participen en la premiación.

### ¿De qué se trata?

El evento final funciona como cierre pedagógico, comunitario y competitivo.
Permite comparar propuestas, reconocer los avances más sólidos y recoger
evidencia para el informe de cierre. La premiación no considera solamente la
cantidad de componentes: también valora la comprensión del problema, la
coherencia técnica, las pruebas y mejoras, el trabajo en equipo, la claridad de
la presentación y el posible impacto.

### Criterios sugeridos de retroalimentación

- Claridad del problema.
- Relación con residuos, reciclaje o sostenibilidad.
- Uso comprensible de tecnología o datos.
- Aplicación de la lógica GeoGreen.
- Viabilidad de la propuesta.
- Trabajo colaborativo.
- Claridad de la presentación.

## 9. Productos y evidencias esperadas

Durante el programa deberían generarse evidencias simples pero suficientes para
respaldar la ejecución:

- Listas de asistencia por taller.
- Fotografías de actividades, mentorías y evento final.
- Fichas de trabajo de los equipos.
- Registro de mentorías.
- Rúbrica o pauta del pitch.
- Materiales reutilizables: guías, infografías, plantillas o presentaciones.
- Informe final con aprendizajes, recomendaciones y posibilidades de continuidad.

## 10. Criterios operativos vigentes

- Usar el cronograma operativo único del repositorio; no reutilizar fechas de
  decks o alternativas anteriores.
- Trabajar con lenguaje adecuado para tercero medio, manteniendo precisión para
  docentes y stakeholders.
- Mantener los circuitos desconectados hasta completar revisión de voltaje,
  pinout, polaridad, resistencias y posibles cortocircuitos.
- Usar GeoGreen como referente y demostración, no como respuesta que todos los
  equipos deban copiar.
- Preservar la autonomía: docentes y monitores orientan y protegen la seguridad,
  pero no producen la solución por el equipo.
- Registrar avances, errores, decisiones y evidencias; el proceso también forma
  parte de lo que se presenta y evalúa.
