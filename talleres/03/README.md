# Taller 03 - GeoGreen Escolar - De la idea al prototipo

- Programa: GeoGreen Escolar Osorno
- Sesión: Taller 3
- Fecha: lunes 24 de agosto de 2026
- Responsable principal: Ingeniería, Energía y Tecnología (I/E/T)
- Duración: 90 minutos por bloque
- Bloque A: 09:00 - 10:30
- Bloque B: 10:45 - 12:15
- Modalidad: presencial, demostrativa, práctica y grupal
- Público objetivo: estudiantes de tercero medio
- Participantes: 60 estudiantes, organizados en 2 bloques de 30
- Organización sugerida: 5 equipos de 6 estudiantes por bloque
- Continuidad: cuatro mentorías y desafío final con jurado y premiación

---

## Paquete docente disponible

- `ppt/Taller-03-De-la-idea-al-prototipo.pptx`: presentación final editable y
  validada para PowerPoint.
- `media/`: fotografías del prototipo, videos, referencias oficiales, pinouts,
  logos de herramientas y piezas generadas para el relato visual.
- `infografias/`: serie vertical de una lámina por bloque, con el prompt
  reproducible junto a cada PNG.
- `podcast/Electrónica_y_pensamiento_crítico_en_GeoGreen_Escolar_interno.m4a`:
  audio de coordinación para el equipo ampliado.
- `../../docs/infografias/infografia-roles-equipo-geogreen-gptimage.png`:
  infografía de las seis responsabilidades del equipo.

Este README es la fuente pedagógica del taller. El PPT ayuda a facilitar la
sesión y las infografías permiten repasar cada bloque, pero no sustituyen las
decisiones, precauciones y matices descritos aquí.

---

# Objetivos de la Clase

## Objetivo General

Al terminar esta clase, el estudiante podrá relacionar el problema ambiental y el material estudiado por su equipo con una posibilidad tecnológica, seleccionar un sensor pertinente y formular una propuesta inicial de prototipo para el desafío GeoGreen Escolar, utilizando agentes de inteligencia artificial como apoyo para investigar, planificar y revisar decisiones sin reemplazar la comprensión, la seguridad ni la validación humana.

## Objetivos Específicos

Al finalizar la sesión, el estudiante será capaz de:

1. Explicar cómo una idea puede evolucionar desde un problema observable hasta una simulación, un prototipo físico y una solución con mayor nivel de desarrollo, utilizando GeoGreen como caso demostrativo.
2. Reconocer la función básica de una placa Arduino o ESP32, una protoboard, un sensor, una resistencia y una salida como un LED, buzzer o pantalla.
3. Identificar reglas esenciales de seguridad antes de energizar un circuito, incluyendo la revisión de voltaje, polaridad, resistencias, alimentación y conexiones comunes a tierra.
4. Distinguir el propósito de herramientas como Wokwi, Wokwi CLI y PlatformIO dentro de una ruta de prototipado que puede continuar hacia software, visualización, diseño 3D y PCB.
5. Seleccionar uno de los sensores definidos para el programa y formular una lógica inicial mediante la estructura: "cuando [sensor] detecte [condición], entonces [el sistema] avisa o actúa".
6. Utilizar un agente de manera supervisada para convertir una intención en preguntas, plan, conexiones posibles y una primera prueba, revisando críticamente sus propuestas antes de aplicarlas.
7. Construir con su equipo una idea tecnológica inicial para desarrollar mediante trabajo autónomo entre sesiones, utilizando las mentorías para recibir orientación, revisión y apoyo ante bloqueos antes de la competencia final.

## Competencias Transversales

- Innovación con propósito: relacionar tecnología y sostenibilidad con una necesidad ambiental o comunitaria concreta.
- Pensamiento computacional: organizar una solución como una secuencia de entrada, procesamiento, decisión y respuesta.
- Desarrollo agéntico supervisado: entregar contexto, definir restricciones, dividir el trabajo y verificar los resultados producidos con apoyo de inteligencia artificial.
- Pensamiento crítico: evaluar si una propuesta tecnológica responde realmente al problema y si puede probarse con los recursos disponibles.
- Seguridad y responsabilidad tecnológica: revisar conexiones, alimentación y riesgos antes de utilizar hardware físico.
- Trabajo colaborativo: distribuir roles, contrastar decisiones y construir una propuesta común.
- Comunicación efectiva: explicar el problema, el sensor elegido, el funcionamiento esperado y la proyección del prototipo.

---

# Mapa de la Clase

| Minutos | Sección | Propósito |
|---:|---|---|
| 0 - 15 | Bloque 1: GeoGreen, de proyecto emblemático a desafío de innovación | Presentar el contexto de GeoGreen Escolar, recorrer su evolución técnica y abrir formalmente la competencia. |
| 15 - 35 | Bloque 2: Del mundo físico al dato | Comprender Arduino/ESP32, protoboard, sensores, salidas y reglas mínimas de seguridad. |
| 35 - 70 | Bloque 3: Prototipar con sensores y agentes | Elegir un sensor, formular una idea, explorar conexiones y realizar una primera prueba con apoyo agéntico supervisado. |
| 70 - 90 | Bloque 4: De prototipo a producto | Mostrar cómo una solución puede avanzar hacia simulación, software, diseño 3D y PCB; registrar la propuesta inicial y proyectar las mentorías. |

---

# BLOQUE 1: GeoGreen, de proyecto emblemático a desafío de innovación

- Duración: 15 minutos
- Objetivo del bloque: presentar GeoGreen Escolar como un proyecto que ha evolucionado mediante decisiones, herramientas, pruebas y colaboración, y utilizar esa trayectoria para abrir el desafío de innovación que los equipos desarrollarán con trabajo autónomo entre sesiones y revisarán durante las mentorías.
- Modalidad: demostrativa y conversada, con evidencia visual, preguntas de activación y presentación breve del desafío final.

## Desarrollo

### 1.1 Tres momentos de una misma idea

El bloque comienza mostrando tres evidencias, sin explicarlas inmediatamente:

1. una simulación de GeoGreen en Wokwi;
2. el prototipo físico funcionando con sensor, semáforo, buzzer y pantalla;
3. la imagen de la PCB diseñada en KiCad.

La pregunta de apertura es:

> ¿Qué creen que tuvo que ocurrir para que una misma idea pasara de una pantalla a un circuito físico y después a una placa diseñada especialmente para ella?

Se escuchan dos o tres respuestas breves. No se busca que el curso nombre herramientas técnicas todavía. La intención es que reconozca que entre una idea y un producto existe un proceso: observar, decidir, construir, probar y mejorar.

El/la docente introduce entonces el marco del taller:

> GeoGreen es un proyecto emblemático de AIEP Osorno que ha evolucionado a través de distintas versiones. En esta etapa se transforma además en una experiencia educativa: no solo permite mostrar una solución tecnológica, sino enseñar cómo una idea puede crecer cuando se investiga, se prueba y se mejora con propósito.

Esta presentación debe ser breve. El foco no está en enumerar logros ni en explicar todavía cada componente, sino en instalar una idea central: GeoGreen no apareció terminado; avanzó mediante una secuencia de decisiones verificables.

### 1.2 ¿Qué problema busca resolver GeoGreen?

GeoGreen nace de una situación sencilla de observar: un contenedor puede llenarse sin que la persona responsable lo advierta a tiempo. Eso puede generar acumulación de residuos, desorden, malos olores, retiro ineficiente y dificultades para organizar mejor los puntos de reciclaje.

La respuesta tecnológica completa se puede explicar con la lógica propia del proyecto:

```text
SENSAR → ENVIAR → VISUALIZAR → ALERTAR
```

- **Sensar:** un sensor ultrasónico mide la distancia entre la tapa y los residuos.
- **Enviar:** una placa Arduino o ESP32 interpreta la lectura y, en una versión conectada, puede transmitir el dato.
- **Visualizar:** una pantalla, un semáforo, un tablero o un mapa muestran el estado de forma comprensible.
- **Alertar:** un buzzer o una notificación indican que es necesario revisar o retirar el contenido.

Aquí conviene demostrar el prototipo durante algunos segundos. Al mover una mano frente al sensor, el curso puede observar que cambia el porcentaje, se modifica el color del semáforo y se activa una respuesta. La demostración permite conectar inmediatamente un fenómeno físico con un dato y una decisión.

Antes de continuar, se plantea una pregunta de comprensión:

> Si el sensor solamente entregara un número, pero nadie pudiera interpretarlo ni recibir una alerta, ¿el problema estaría realmente resuelto?

La respuesta esperada no es un “sí” o “no” aislado. Se busca que los estudiantes expliquen que una medición adquiere valor cuando ayuda a comprender una situación o tomar una decisión.

### 1.3 La ruta de prototipado

La evolución de GeoGreen se presenta como una ruta de trabajo, no como una lista de tecnologías independientes:

| Etapa | Pregunta que permitió avanzar | Evidencia |
|---|---|---|
| Comprender el caso | ¿Qué debe medir el sistema y para qué? | Problema y comportamiento esperado. |
| Simular | ¿Podemos probar la lógica antes de tener el hardware? | Circuito y programa funcionando en Wokwi. |
| Automatizar | ¿Podemos compilar, ejecutar y repetir pruebas de manera ordenada? | Wokwi CLI y comandos reproducibles. |
| Llevar al mundo físico | ¿Cómo se comporta la solución en una placa real? | Arduino UNO R4 WiFi programado con PlatformIO. |
| Integrar componentes | ¿Cómo conectamos sensor, pantalla, luces y buzzer con seguridad? | Prototipo montado en protoboard. |
| Validar y mejorar | ¿La medición es estable?, ¿qué ocurre con el ruido o los valores falsos? | Filtrado, calibración y nuevas pruebas. |
| Ampliar la experiencia | ¿Cómo protegemos, visualizamos o comunicamos mejor la información? | Dashboard, mapa, visualización y carcasa 3D. |
| Profesionalizar | ¿Cómo pasamos de cables de prueba a una solución diseñada como producto? | PCB, conectores y archivos de fabricación. |

El punto metodológico debe quedar explícito:

> Los agentes de inteligencia artificial ayudaron a investigar, proponer código, explicar conexiones, ejecutar herramientas y revisar resultados. Sin embargo, cada avance tuvo que contrastarse con evidencia: una simulación, una compilación, una lectura real, una inspección o una prueba física.

La lógica de trabajo que se transferirá a los equipos es:

```text
PROBLEMA → INTENCIÓN → CONTEXTO → PLAN → PRUEBA → EVIDENCIA → MEJORA
```

Esto diferencia el desarrollo agéntico de una petición genérica como “hazme un proyecto”. El equipo humano define qué quiere lograr, entrega restricciones, revisa lo propuesto y decide si el resultado funciona en el mundo real.

### 1.4 El desafío para los equipos

GeoGreen se presenta como referencia de lo que puede alcanzar una idea cuando avanza por etapas. No es un modelo que los equipos deban copiar ni un requisito de construir exactamente los mismos componentes.

La consigna general es:

> GeoGreen pasó de una necesidad a una simulación, un prototipo físico y una propuesta de producto. El desafío de cada equipo será tomar su propio problema ambiental y llevar una solución tan lejos como pueda mediante investigación, sensores, pruebas y mejoras.

Durante este taller, los equipos definirán una primera propuesta tecnológica. El desarrollo ocurrirá principalmente mediante el trabajo que cada equipo realice entre sesiones. Las cuatro mentorías servirán para revisar avances, orientar decisiones, detectar riesgos y destrabar dificultades; no reemplazarán el trabajo autónomo del equipo. El proceso culminará en un evento final ante jurado, con retroalimentación y premiación.

Debe aclararse que “llegar más lejos” no significa agregar componentes sin propósito. Una solución gana madurez cuando:

- responde claramente al problema elegido;
- utiliza el sensor de manera coherente;
- presenta evidencia de funcionamiento o aprendizaje;
- mejora después de ser probada;
- y puede explicarse con claridad.

Si un equipo desarrolla una solución que amplía o supera el referente GeoGreen, ese resultado forma parte natural del propósito de la competencia.

### Preguntas guía

- ¿Qué diferencia hay entre tener una idea y demostrar que funciona?
- ¿En qué momento una medición se transforma en información útil?
- ¿Qué etapa de la evolución de GeoGreen les parece más importante y por qué?
- ¿Qué debería decidir siempre el equipo humano, aunque utilice agentes de inteligencia artificial?
- ¿Qué tendría que mostrar una propuesta para convencer a un jurado de que vale la pena desarrollarla?

### Cierre del bloque

- Idea clave: una solución tecnológica no se define por la cantidad de componentes, sino por la relación entre problema, decisiones, pruebas, evidencia y mejora.
- Comprobación breve: pedir a dos estudiantes que identifiquen una entrada del sistema GeoGreen, una respuesta y una evidencia de que el sistema funciona.
- Apertura del desafío: confirmar que los equipos conservarán el problema trabajado en los talleres anteriores y comenzarán a explorar una respuesta tecnológica propia.
- Puente: para proponer una solución responsable, primero es necesario comprender cómo una placa, una protoboard, un sensor y una salida convierten un fenómeno físico en una respuesta observable.

---

# BLOQUE 2: Del mundo físico al dato

- Duración: 20 minutos
- Objetivo del bloque: comprender la función básica de una placa Arduino o ESP32, una protoboard, un sensor y una salida, y aplicar un protocolo mínimo de seguridad antes de energizar cualquier circuito.
- Modalidad: demostrativa y participativa, con componentes reales en mano, inspección de un kit desconectado y preguntas breves de comprobación.

## Desarrollo

### 2.1 Un computador que puede observar el mundo

Un computador tradicional trabaja principalmente con información que ya está en formato digital: texto, imágenes, archivos, formularios o datos de internet. Una placa como Arduino o ESP32 permite conectar ese mundo digital con fenómenos físicos como distancia, temperatura, humedad, luz, movimiento o nivel de agua.

La idea se presenta mediante una cadena simple:

```text
FENÓMENO FÍSICO → SENSOR → PLACA → REGLA → SALIDA
```

Por ejemplo:

```text
El contenedor se llena
        ↓
El sensor mide distancia
        ↓
La placa calcula el porcentaje
        ↓
Si supera un límite
        ↓
Enciende una luz y activa una alerta
```

Cada parte cumple una función distinta:

| Parte | Función | Ejemplo en GeoGreen |
|---|---|---|
| Fenómeno | Situación del mundo que queremos observar. | Nivel de llenado del contenedor. |
| Sensor | Convierte el fenómeno en una señal que la placa puede leer. | HC-SR04 mide distancia. |
| Placa | Ejecuta instrucciones, interpreta la lectura y toma decisiones. | Arduino UNO R4 WiFi. |
| Regla | Define qué debe ocurrir ante una condición. | Si el llenado llega a 80 %, activar estado rojo. |
| Salida | Comunica información o produce una acción. | LED, buzzer, pantalla o notificación. |

Se puede utilizar la analogía del cuerpo humano con una precisión acotada: los sensores se parecen a los sentidos, la placa procesa información como un cerebro muy pequeño y las salidas permiten responder. La diferencia importante es que la placa no comprende por sí sola el problema; ejecuta las reglas que fueron diseñadas y programadas por personas.

### 2.2 Arduino, ESP32 y protoboard: herramientas para experimentar

Arduino y ESP32 no se presentan como tecnologías rivales. Son familias de placas utilizadas para aprender, experimentar y construir prototipos electrónicos.

- **Arduino** ofrece un ecosistema educativo amplio y una forma accesible de controlar sensores y salidas. La placa UNO R4 WiFi utilizada en GeoGreen trabaja con señales de 5 V y además incorpora conectividad y una matriz LED.
- **ESP32** se utiliza con frecuencia en proyectos conectados porque integra WiFi y Bluetooth. Sus pines normalmente trabajan a 3,3 V, por lo que no deben recibir directamente señales de 5 V.

La selección de una placa depende de la necesidad, los componentes disponibles, el voltaje, la conectividad y la forma en que se probará el proyecto. “Más potente” no significa automáticamente “más apropiada”.

La **protoboard** permite construir un circuito temporal sin soldar. Bajo sus orificios existen contactos metálicos que unen grupos de puntos. Esto hace posible insertar componentes y cables, corregir una conexión y volver a probar.

Para explicarla se muestra una protoboard real sin alimentación y se identifican tres zonas:

1. **Rieles laterales de alimentación:** suelen estar marcados con `+` y `-` y permiten distribuir voltaje y tierra. En algunos modelos están interrumpidos en la mitad, por lo que siempre deben revisarse antes de asumir que recorren toda la placa.
2. **Grupos centrales de cinco orificios conectados:** permiten unir eléctricamente patas y cables sin soldadura.
3. **Canal central:** separa ambos lados y permite instalar circuitos integrados sin unir sus patas opuestas.

La regla visual más importante es:

> Dos componentes insertados en puntos que están unidos internamente comparten la misma conexión eléctrica, aunque no exista un cable visible entre ellos.

La protoboard facilita experimentar, pero no elimina la necesidad de revisar. Una conexión puede verse ordenada y seguir siendo incorrecta.

En los módulos del kit aparecerán tres tipos de conexión con frecuencia:

- **Alimentación (`VCC`, `5V` o `3V3`):** entrega la energía adecuada al componente.
- **Tierra (`GND`):** funciona como referencia común y camino de retorno del circuito.
- **Señal (`SIG`, `OUT`, `AO`, `DO`, `TRIG`, `ECHO`, entre otras):** transporta una lectura o una orden.

Alimentación, tierra y señal no son intercambiables. Antes de insertar un cable, el equipo debe poder explicar a cuál de estas funciones corresponde.

### 2.3 Sensores, salidas y resistencias

El programa trabajará inicialmente con los siete sensores seleccionados en el Banco de Ideas:

| Qué observa | Sensor disponible |
|---|---|
| Distancia | `HC-SR04` |
| Temperatura y humedad del aire | `KY-015` |
| Temperatura | `KY-001` |
| Luz | `KY-018` |
| Humedad de la tierra | `Soil` |
| Nivel o presencia de agua | `Water` |
| Apertura o cierre mediante imán | `KY-021` |

Las salidas principales son:

- **Luz bicolor `KY-011`:** comunica estados mediante colores.
- **Zumbador `KY-012`:** produce una alerta sonora.
- **Relé `KY-019`:** permite controlar otra carga eléctrica; durante el taller se utilizará únicamente con demostraciones educativas de bajo voltaje, nunca con la red eléctrica de 220 V.

Una **resistencia** limita la corriente. En un LED evita que circule más corriente de la que el componente o el pin de la placa pueden soportar. No se instala como decoración ni para “hacer que el programa funcione”: cumple una función de protección eléctrica.

En este punto no es necesario memorizar valores ni diagramas completos. Sí deben quedar claras tres preguntas que todo equipo tendrá que responder antes de conectar:

1. ¿Con qué voltaje funciona este componente?
2. ¿Qué significa cada pin?
3. ¿Necesita resistencia, divisor de voltaje, librería o alguna precaución especial?

### 2.4 Protocolo antes de conectar USB

La seguridad se presenta como parte normal del prototipado. No busca generar temor, sino establecer un método de trabajo confiable. Un cortocircuito puede activar la protección del puerto USB, reiniciar el computador o, en el peor caso, dañar la placa o el puerto; por eso la revisión ocurre antes de conectar.

Antes de energizar un circuito, cada equipo debe seguir esta secuencia:

1. **Mantener la placa desconectada del USB.** El circuito se arma y revisa sin alimentación.
2. **Identificar el componente exacto.** Se observa su nombre, etiqueta y texto impreso; dos módulos parecidos pueden utilizar pines distintos.
3. **Comprobar voltaje y pinout.** Se consulta la ficha del programa, el manual o la documentación técnica.
4. **Preparar un diagrama.** Cada cable debe tener una razón comprensible.
5. **Pedir explicación al agente.** El agente puede proponer conexiones, pero debe explicar qué hace cada una.
6. **Realizar revisión humana.** Un docente o monitor verifica alimentación, `GND`, polaridad, resistencias y posibles cortocircuitos.
7. **Conectar y observar.** Solo después de la revisión se conecta el USB y se ejecuta una prueba pequeña.
8. **Desconectar ante una señal extraña.** Si un componente se calienta, aparece olor, el computador se reinicia o la placa se comporta de forma inesperada, se corta la alimentación antes de investigar.

Errores que deben prevenirse explícitamente:

- unir directamente `5V` con `GND`, provocando un cortocircuito;
- conectar un LED sin resistencia;
- invertir la polaridad de un LED, buzzer o módulo polarizado;
- alimentar un sensor con un voltaje incorrecto;
- confiar únicamente en el color de un cable en vez de seguir su conexión;
- conectar la salida `Echo` de 5 V del HC-SR04 directamente a un ESP32 de 3,3 V;
- aceptar un diagrama generado por inteligencia artificial sin compararlo con el componente real.

La diferencia de voltaje del HC-SR04 permite mostrar por qué el contexto importa: en la Arduino UNO R4 WiFi, que trabaja a 5 V, `Echo` puede conectarse directamente; en un ESP32 de 3,3 V se requiere un divisor de voltaje o adaptación de nivel.

### Actividad breve de inspección

Cada equipo recibe un kit todavía desconectado y dispone de dos minutos para identificar:

- la placa;
- la protoboard;
- un sensor;
- una salida;
- los pines de alimentación `VCC` y `GND`, cuando estén claramente rotulados;
- y una precaución que debería comprobar antes de conectar.

La actividad no pide armar todavía el circuito. Su propósito es instalar el hábito de observar e identificar antes de actuar.

### Preguntas guía

- ¿Por qué una placa necesita un sensor para conocer algo del mundo físico?
- ¿Qué ventaja ofrece una protoboard y cuál es su principal riesgo si no entendemos sus conexiones internas?
- ¿Por qué no basta con saber que un cable “va al rojo” o “va al azul”?
- ¿Qué información mínima necesitan antes de conectar un sensor desconocido?
- ¿Qué puede hacer bien un agente en esta etapa y qué debe verificar obligatoriamente una persona?
- ¿Por qué una conexión correcta para Arduino podría ser peligrosa para un ESP32?

### Cierre del bloque

- Idea clave: un prototipo seguro comienza por comprender la función y los límites de cada componente antes de energizarlo.
- Comprobación breve: mostrar un sensor, una placa y un LED; pedir al curso que identifique entrada, procesamiento y salida, y que nombre una revisión necesaria antes de conectar.
- Evidencia del bloque: cada equipo reconoce las partes principales de su kit y registra al menos una precaución técnica.
- Puente: con el hardware básico identificado y el protocolo de seguridad acordado, el siguiente bloque permitirá escoger un sensor, formular una idea y utilizar un agente para planificar una primera prueba.

---

# BLOQUE 3: Prototipar con sensores y agentes

- Duración: 35 minutos
- Objetivo del bloque: que cada equipo conecte su problema ambiental con un sensor pertinente, formule una especificación inicial, utilice un agente para planificar una prueba y produzca una primera evidencia técnica sin delegar sus decisiones ni omitir la revisión de seguridad.
- Modalidad: trabajo colaborativo por equipos, investigación guiada, interacción supervisada con agentes y experimentación física o simulada.

## Desarrollo

Distribución sugerida del tiempo:

| Minutos del bloque | Acción principal |
|---:|---|
| 0 - 5 | Retomar el problema y elegir una variable observable y un sensor. |
| 5 - 11 | Distribuir roles y completar la especificación inicial. |
| 11 - 19 | Interactuar con el agente, revisar preguntas y acordar una primera prueba. |
| 19 - 31 | Diseñar, revisar y ejecutar la prueba simulada o física. |
| 31 - 35 | Registrar evidencia y definir el siguiente paso. |

### 3.1 Del problema a una variable que pueda observarse

Los equipos mantienen el problema trabajado en los Talleres 1 y 2. No comienzan desde un componente llamativo ni desde una solución ya escrita. Comienzan preguntando:

> ¿Qué tendría que observar, medir o detectar nuestro sistema para ayudar con este problema?

Ejemplos:

| Situación | Variable observable | Sensor posible |
|---|---|---|
| Un contenedor se llena sin aviso. | Distancia hasta los residuos. | `HC-SR04` |
| Una zona de cultivo se riega sin saber si lo necesita. | Humedad de la tierra. | `Soil` |
| Un espacio permanece demasiado húmedo. | Humedad del aire. | `KY-015` |
| Una luminaria funciona cuando todavía hay luz natural. | Nivel de luz. | `KY-018` |
| Una tapa queda abierta. | Presencia o ausencia de un imán. | `KY-021` |

Cada equipo puede seguir una de estas rutas:

1. **Idea propia:** propone una solución relacionada con su problema y selecciona un sensor del conjunto principal.
2. **Idea adaptada:** toma una propuesta del Banco de Ideas y modifica su contexto, condición, forma de respuesta o proyección.
3. **Exploración ampliada:** propone utilizar otro sensor del kit de 45 cuando los siete sensores principales no permitan observar la variable necesaria. Esta elección debe justificarse y revisarse técnicamente antes de conectar.

El Banco de Ideas funciona como apoyo para desbloquear, no como una lista de respuestas que deban copiarse. El equipo sigue siendo responsable de explicar por qué ese sensor sirve para su caso.

### 3.2 Organizar el equipo y escribir una especificación breve

Para que las seis personas participen, se mantienen las responsabilidades
iniciadas en el Taller 1 y adaptadas en el Taller 2:

- **Coordinación:** ordena tiempos, turnos y tareas; mantiene visible el problema elegido.
- **Investigación:** identifica el sensor exacto, sus pines, voltaje, documentación y tipo de lectura.
- **Diseño:** convierte la propuesta en especificación, flujo, boceto y diagrama de conexiones.
- **Tecnología:** opera el agente con el contexto acordado y participa en simulación, conexión y programación.
- **Pruebas y evidencia:** coordina la revisión de seguridad, define qué observar y registra resultados, errores y cambios.
- **Comunicación:** prepara el pitch, la demostración y la distribución de la explicación.

Los roles pueden rotar. Ordenan el trabajo, pero no convierten cada decisión en
propiedad de una sola persona. La IA es una herramienta compartida, la propuesta
pertenece al equipo y todos deben poder explicar su lógica básica.

Antes de pedir código o conexiones, cada grupo completa este encuadre:

```text
Nombre provisional:
Problema que queremos mejorar:
Lugar, persona o comunidad afectada:
Qué necesitamos observar o medir:
Sensor que proponemos utilizar:
Placa disponible:
Cuando el sensor detecte:
Entonces el sistema debe:
Primera prueba que demostraría que la idea funciona:
Restricciones o riesgos que debemos respetar:
```

Esta ficha funciona como una especificación inicial. No describe todavía un producto completo; define una intención suficientemente clara para que un agente pueda ayudar sin inventar el objetivo.

### 3.3 Dirigir al agente: contexto antes que código

El equipo utiliza el agente como asistente de investigación y prototipado. La interacción comienza con contexto y preguntas, no con “hazme el proyecto completo”.

Prompt base sugerido:

```text
Somos un equipo de tercero medio participando en el desafío GeoGreen Escolar.

Problema: [describir el problema y a quién afecta].
Queremos observar: [variable].
Sensor disponible: [nombre y modelo exacto].
Placa disponible: [Arduino o ESP32 exacta].
Respuesta esperada: cuando [condición], entonces [acción o aviso].

Actúa como asistente de prototipado. Antes de escribir código, haz hasta tres
preguntas que necesites para entender el caso. Después propón una primera prueba
pequeña y segura. Explica para qué sirve cada conexión, diferencia los datos
verificados de tus supuestos y advierte si falta revisar voltaje, pinout,
resistencia o compatibilidad. No avances a energizar el circuito hasta que
confirmemos una revisión humana.
```

Después de recibir la respuesta, el equipo debe revisar:

- si el agente entendió correctamente el problema;
- si nombró el sensor y la placa exactos;
- si cada conexión tiene una explicación;
- si el voltaje y los pines coinciden con la ficha o documentación disponible;
- si propuso una prueba pequeña antes de integrar todo;
- y qué partes de la respuesta siguen siendo supuestos.

Si el agente entrega directamente un circuito o programa completo, el equipo no tiene que aceptarlo. Puede detenerlo y pedir:

> Divide la propuesta en pasos. Comencemos solamente por leer el sensor y comprobar que el valor cambia.

Esta interacción hace visible la metodología del taller:

```text
INTENCIÓN → CONTEXTO → PREGUNTAS → PLAN → TAREA PEQUEÑA → PRUEBA → EVIDENCIA
```

### 3.4 Diseñar y ejecutar la primera prueba

La primera prueba debe responder una pregunta concreta. No busca terminar el proyecto completo durante este bloque.

Ejemplos de preguntas de prueba:

- ¿El valor cambia cuando acerco o alejo un objeto?
- ¿La lectura de luz disminuye al cubrir el sensor?
- ¿El sensor de humedad distingue tierra seca y húmeda?
- ¿El sensor magnético detecta cuándo se acerca el imán?
- ¿La salida cambia cuando se supera un umbral sencillo?

Cada equipo avanza por una misma secuencia de hitos:

| Hito | Evidencia esperada |
|---|---|
| 1. Propuesta | Problema, variable, sensor y regla “cuando… entonces…”. |
| 2. Plan de prueba | Diagrama inicial, comportamiento esperado y criterio para decidir si funciona. |
| 3. Lectura | Valor observado en simulación, monitor serie o prueba física. |
| 4. Respuesta | LED, buzzer, pantalla u otra salida reacciona ante una condición. |
| 5. Mejora | El equipo identifica ruido, error, límite o cambio necesario. |

Todos los equipos deben completar los dos primeros hitos. Los siguientes dependen del sensor, la complejidad de la propuesta y la evidencia que alcancen a producir. Estos hitos no clasifican todavía a los equipos: permiten saber desde qué punto continuará cada uno trabajando y qué preguntas conviene llevar a las mentorías.

La prueba puede realizarse de dos formas:

- **Simulación:** cuando el sensor o un equivalente esté disponible en Wokwi, se prueba primero el comportamiento sin arriesgar hardware.
- **Prototipo físico:** cuando la conexión haya sido revisada, se carga una prueba mínima en la placa y se observa el sensor real.

El/la docente puede mostrar cómo el mismo principio se verifica desde herramientas de línea de comandos:

```bash
# Compilar y ejecutar la simulación GeoGreen de referencia
bash arduino/sim.sh

# Ejecutar las pruebas automatizadas del semáforo
bash arduino/test.sh

# Compilar y cargar un proyecto PlatformIO en una placa física
pio run -d <carpeta-del-proyecto> -t upload
```

No se espera que los estudiantes memoricen los comandos. Se busca que comprendan qué evidencia entrega cada uno: compilar confirma que el programa puede construirse, simular permite observar su comportamiento sin placa y cargar permite contrastarlo con hardware real.

Antes de conectar USB, el equipo debe presentar:

1. modelo exacto de placa y sensor;
2. voltaje de alimentación;
3. diagrama de conexiones;
4. función de cada cable;
5. resistencia o adaptación requerida;
6. comportamiento esperado durante la prueba.

Un docente o monitor autoriza la energización solamente después de revisar esos puntos.

### 3.5 Registrar evidencia sin ocultar los errores

La evidencia no consiste únicamente en que algo “funcionó”. También puede mostrar qué se intentó, qué ocurrió y qué debe modificarse.

Cada equipo registra:

```text
Qué intentamos probar:
Qué esperábamos observar:
Qué ocurrió realmente:
Qué evidencia guardamos:
Qué explicación proponemos:
Cuál será el siguiente cambio o prueba:
```

Una lectura que no cambia, un error de compilación o un sensor que entrega valores inestables no convierten automáticamente la idea en un fracaso. Se transforman en aprendizaje cuando el equipo puede describir el problema, formular una hipótesis y decidir el siguiente paso.

### Regla de acompañamiento para docentes y monitores

Para mantener la autonomía de los equipos, el acompañamiento sigue una escalera:

1. **Pregunta:** “¿Qué quieren medir y qué han comprobado hasta ahora?”.
2. **Pista:** orientar hacia voltaje, pinout, tipo de lectura o condición esperada.
3. **Referencia:** dirigir a la ficha del sensor, manual o documentación pertinente.
4. **Revisión:** evaluar el diagrama, el código o la evidencia producida por el equipo.
5. **Intervención directa:** actuar solamente cuando exista riesgo eléctrico, daño posible o una condición técnica que impida continuar de forma segura.

El monitor no conecta el circuito ni produce la solución completa por el equipo. Su función es hacer preguntas, proteger la seguridad y ayudar a que los estudiantes comprendan sus propias decisiones.

### Preguntas guía

- ¿Qué variable de su problema puede observarse realmente con un sensor?
- ¿Por qué eligieron ese sensor y no otro?
- ¿Cuál es la prueba más pequeña que podría mostrar que van por buen camino?
- ¿Qué parte de la propuesta del agente verificaron y qué parte sigue siendo un supuesto?
- Si la lectura no cambia, ¿qué revisarían antes de reemplazar todo el proyecto?
- ¿Qué evidencia convencería a otra persona de que el avance es real?
- ¿Cuál es el siguiente paso que el equipo puede realizar sin depender de que alguien le entregue la solución?

### Cierre del bloque

- Idea clave: el agente puede acelerar la investigación y la implementación, pero el equipo conserva la responsabilidad de definir el propósito, verificar las conexiones, interpretar la evidencia y decidir la siguiente mejora.
- Comprobación breve: cada vocería explica en una frase qué medirá su equipo, con qué sensor y cuál será su primera prueba.
- Producto del bloque: especificación inicial, sensor seleccionado, regla “cuando… entonces…”, plan seguro de prueba y primera evidencia disponible.
- Puente: el siguiente bloque mostrará cómo esa primera prueba puede crecer hacia una solución más completa, cómo se registrará la propuesta para la competencia y cómo organizar el trabajo autónomo entre sesiones para aprovechar las mentorías como instancias de orientación y revisión.

---

# BLOQUE 4: Del prototipo al producto

- Duración: 20 minutos
- Modalidad: exposición breve, consolidación por equipos y presentaciones relámpago

### Propósito del bloque

Que cada equipo sitúe su propuesta en una ruta de desarrollo posible, reconozca cómo distintas disciplinas pueden fortalecerla y cierre el taller con un próximo paso autónomo concreto, además de una pregunta útil para las mentorías y la competencia final.

### Distribución sugerida

| Minutos | Actividad | Resultado esperado |
|---:|---|---|
| 0–5 | Recorrer la escala de madurez de un prototipo | El equipo reconoce su avance actual y una meta realista. |
| 5–8 | Conectar disciplinas y formas de profesionalización | El equipo identifica qué especialidad puede aportar valor a su solución. |
| 8–14 | Completar la ficha de propuesta tecnológica inicial | La idea queda registrada con problema, sensor, evidencia y siguiente hito. |
| 14–18 | Presentaciones relámpago de los cinco equipos | Cada equipo comunica su propuesta y recibe una pregunta de contraste. |
| 18–20 | Síntesis y proyección hacia las mentorías | Cada equipo declara el próximo paso que realizará. |

### 4.1 Una solución crece por evidencia, no por cantidad de componentes

El prototipo inicial no es el final del proyecto: es una primera respuesta que permite aprender. Desde ahí, una propuesta puede avanzar por distintos niveles de madurez:

1. **Problema y propósito:** existe una necesidad clara, un contexto y una persona o comunidad a la que la solución busca aportar.
2. **Variable y regla:** el equipo define qué observará y qué debería ocurrir ante una condición determinada.
3. **Lectura comprobable:** el sensor entrega datos en una simulación o prueba física.
4. **Respuesta funcional:** una salida comunica o ejecuta una acción a partir de esos datos.
5. **Sistema validado:** el equipo repite pruebas, reconoce límites y mejora la estabilidad de la solución.
6. **Experiencia integrada:** la propuesta incorpora, cuando tiene sentido, conectividad, visualización de datos, una interfaz o una carcasa.
7. **Producto desarrollado:** el montaje se ordena, protege y documenta; una PCB puede integrar el circuito para hacerlo más compacto y reproducible.

GeoGreen permite visualizar esa evolución completa: comenzó como una necesidad ambiental que podía medirse, se convirtió en lógica de sensores y alertas, se probó en simulación y hardware, y luego se amplió con visualización, diseño 3D y una placa electrónica propia. Esa trayectoria funciona como referencia de lo que es posible, no como una lista obligatoria para todos los equipos.

El software completa el ciclo de una solución conectada. El sensor produce una lectura, la placa la procesa y, cuando existe conectividad, el dato puede enviarse a una aplicación que lo ordena, lo representa y permite tomar decisiones. En la versión actual de GeoGreen, el dashboard transforma lecturas de distintos contenedores en estados, alertas, historial y una vista georreferenciada. La interfaz no reemplaza al hardware: hace comprensible su información para la persona que debe actuar.

El ciclo completo puede resumirse como **sensar → enviar → visualizar → alertar**. Cada equipo decidirá hasta qué etapa necesita avanzar. Una propuesta sencilla puede resolver su propósito con una respuesta local; otra puede requerir almacenar datos, mostrarlos en una pantalla o construir una aplicación. La elección debe surgir del problema y de la evidencia, no de agregar software solamente porque está disponible.

Una propuesta no mejora automáticamente por agregar WiFi, una pantalla, una aplicación o más sensores. Avanza cuando cada elemento responde al problema, funciona de forma coherente y puede sostenerse con evidencia.

### 4.2 Profesionalizar también significa integrar conocimientos

Un producto tecnológico reúne decisiones de distintas áreas:

| Área | Pregunta que aporta al proyecto |
|---|---|
| Problema ambiental o social | ¿A quién ayuda la solución y por qué sería relevante utilizarla? |
| Sensores y electrónica | ¿Qué puede medirse y cómo se conecta de forma segura? |
| Programación y desarrollo agéntico | ¿Cómo se transforman los datos en una regla, respuesta o automatización verificable? |
| Software, datos, conectividad e interfaz | ¿Cómo se registrará, enviará, visualizará y comprenderá la información para apoyar una decisión? |
| Diseño 3D y fabricación | ¿Cómo se protegerán, fijarán y mantendrán los componentes en el mundo real? |
| Comunicación | ¿Cómo se explicará el problema, la solución y la evidencia ante otras personas? |

La carcasa, por ejemplo, no es solamente decoración: puede proteger el circuito, ordenar el montaje, facilitar su uso y permitir mantenimiento. Un modelo realizado en Blender u otra herramienta 3D ayuda a estudiar dimensiones, ubicación de componentes y experiencia de uso antes de fabricar. Del mismo modo, una PCB no reemplaza las pruebas en protoboard: aparece al final de un proceso de validación para integrar y profesionalizar un circuito que ya se comprende.

En este punto puede incorporarse una intervención breve de un estudiante colaborador con experiencia en modelado 3D para mostrar cómo su especialidad se conecta con el trabajo de sensores y programación. El mensaje para los equipos es que no necesitan dominar todas las áreas individualmente: deben aprender a formular buenas preguntas, colaborar y comprobar que los aportes formen una solución coherente.

Los agentes de IA también pueden apoyar estas etapas —por ejemplo, comparando alternativas, proponiendo una estructura de código o ayudando a revisar un diseño—, pero las medidas físicas, los voltajes, las conexiones y el comportamiento real deben ser verificados por personas.

### 4.3 Registrar la propuesta para la competencia

Cada equipo completa una **ficha de propuesta tecnológica inicial**. No se exige llegar hoy a un producto terminado; se exige salir con una dirección clara y un avance que pueda continuar.

```text
Nombre provisional del equipo o proyecto:
Problema y contexto:
Personas o comunidad a quienes podría aportar:
Variable que mediremos:
Sensor seleccionado y razón de la elección:
Regla “cuando… entonces…”:
Primera evidencia obtenida o prueba pendiente:
Nivel de madurez actual:
Próximo hito verificable:
Responsabilidades del equipo:
Qué adaptamos, cambiamos o proponemos de manera propia:
```

El banco de ideas y sensores sigue disponible como punto de partida. Un equipo puede adaptar una propuesta del banco, combinarla con otra necesidad o plantear una idea propia. La diferencia no está en evitar toda referencia, sino en tomar decisiones justificadas y construir una respuesta que el equipo pueda explicar como propia.

De cara a la competencia, una propuesta se fortalece cuando:

- responde a un problema relevante;
- conecta de forma coherente el sensor, los datos y la respuesta;
- presenta evidencia de pruebas y mejoras;
- utiliza los recursos técnicos con un propósito claro;
- comunica con precisión qué hace, para quién y por qué importa.

GeoGreen representa un estándar visible de desarrollo: mientras más lejos logre llevar un equipo su idea con coherencia y evidencia, más sólida será su presentación. Si una propuesta encuentra una respuesta distinta o supera el referente en algún aspecto, ese avance debe poder demostrarse y explicarse.

### 4.4 Presentación relámpago de los equipos

Cada equipo dispone de **30 a 40 segundos** para presentar su punto de partida:

> “Somos el equipo ________. Queremos abordar ________. Mediremos ________ con el sensor ________. Nuestra regla inicial es ________. Hoy comprobamos / necesitamos comprobar ________. Antes de la próxima mentoría avanzaremos con ________.”

Después de cada presentación se formula una sola pregunta breve, orientada a precisar el problema, la medición o la evidencia. No se busca resolver la propuesta frente al curso, sino ayudar al equipo a reconocer el paso que sigue.

### 4.5 Ruta de continuidad

El taller abre el proceso de desarrollo. El avance se construye con trabajo autónomo entre sesiones; las mentorías permiten revisar lo realizado, recibir orientación y resolver bloqueos concretos:

| Fecha | Instancia | Foco de avance |
|---|---|---|
| Lunes 31 de agosto | Mentoría 1 | Revisar problema, usuario, contexto y primera solución. |
| Lunes 7 de septiembre | Mentoría 2 | Ajustar solución, recursos, materiales y roles de trabajo. |
| Lunes 21 de septiembre | Mentoría 3 | Revisar maqueta, simulación, diagrama, prototipo o evidencia de avance. |
| Lunes 28 de septiembre | Mentoría 4 y ensayo | Afinar guion, soporte visual, roles y tiempos de presentación. |
| Lunes 5 de octubre | Evento final | Presentar ante el jurado y participar en la premiación. |

Cada equipo termina el bloque declarando un próximo hito verificable que realizará con su propio tiempo. “Seguir trabajando” no basta: el hito debe poder observarse, por ejemplo, obtener una lectura estable, activar una salida, comparar dos sensores, validar una necesidad con usuarios, construir una interfaz o comprobar el ajuste de una carcasa. La solidez alcanzada para el evento final dependerá de la constancia, las iteraciones y la evidencia que cada equipo decida producir.

### Preguntas guía

- ¿Qué evidencia haría que su propuesta resultara más creíble?
- ¿Qué nivel de madurez alcanzaron y cuál es el siguiente?
- ¿Qué área profesional podría aportar más valor real a su solución?
- ¿Qué elemento añadirían por necesidad y cuál evitarían si solo agregara complejidad?
- ¿Qué puede apoyar un agente y qué decisión debe conservar el equipo?
- ¿Qué debe estar resuelto para aprovechar la primera mentoría?

### Cierre del bloque

- Idea clave: profesionalizar una propuesta significa hacerla más útil, segura, comprobable, integrada y comunicable; no solamente agregar tecnología.
- Comprobación breve: cada equipo entrega su ficha y declara en una frase su próximo hito verificable.
- Producto del bloque: propuesta tecnológica inicial registrada, nivel de madurez identificado y ruta de continuidad hacia la competencia.

---

# Cierre de la clase

El/la docente recupera cuatro aprendizajes que conectan todo el taller:

1. Un sensor permite transformar un fenómeno físico en datos que una placa puede interpretar.
2. Un prototipo seguro requiere comprender la placa, revisar las conexiones y probar de forma gradual.
3. Un agente de IA puede acelerar la exploración y el desarrollo, pero el equipo define el propósito, valida la información y responde por sus decisiones.
4. Una propuesta competitiva se construye con coherencia, evidencia y mejora continua, no con una acumulación de componentes.

> **Una idea no se convierte en proyecto solamente porque suene bien; se convierte en proyecto cuando puede explicarse, probarse y mejorarse.**

### Producto esperado al finalizar los 90 minutos

Cada equipo debe conservar:

- una necesidad o problema definido en un contexto;
- una variable observable y un sensor seleccionado;
- una regla inicial “cuando… entonces…”;
- un plan de prueba revisado desde la seguridad;
- una primera evidencia o la prueba exacta que debe realizar a continuación;
- una ficha de propuesta tecnológica inicial;
- un próximo hito para la primera mentoría.

Como salida, cada estudiante completa oralmente o por escrito una frase breve:

> “Nuestra propuesta avanzará cuando podamos demostrar que ________.”

El taller termina con una invitación concreta: tomar la referencia de GeoGreen, construir una respuesta propia con trabajo sostenido y utilizar las mentorías para orientar, revisar y destrabar una solución que el propio equipo pueda presentar, defender y llevar a la competencia final.

---

# Material vigente del taller

- **Planificación docente:** [`documentos/taller-3-planificacion-docente.pdf`](documentos/taller-3-planificacion-docente.pdf)
- **Ficha de propuesta tecnológica inicial:** [`documentos/taller-3-ficha-propuesta-tecnologica.pdf`](documentos/taller-3-ficha-propuesta-tecnologica.pdf)
- **Guía rápida del paquete:** [`documentos/taller-3-leeme-docentes.pdf`](documentos/taller-3-leeme-docentes.pdf)
- **Presentación:** [`ppt/Taller-03-De-la-idea-al-prototipo.pptx`](ppt/Taller-03-De-la-idea-al-prototipo.pptx)
- **Mapa de la clase:** [`infografias/taller-3-mapa-de-la-clase.png`](infografias/taller-3-mapa-de-la-clase.png)
- **Serie por bloques:** [`infografias/README.md`](infografias/README.md)

La carpeta [`documentos/`](documentos/) distingue el material vigente de dos antecedentes
históricos que ya no forman parte del paquete de ejecución.
