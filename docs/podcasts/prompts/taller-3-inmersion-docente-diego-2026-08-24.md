# Podcast · Inmersión docente para facilitar el Taller 3

Generen una conversación en profundidad, completamente en español de Chile, dirigida a Diego,
facilitador principal del Taller 3 de GeoGreen Escolar. Este audio es una preparación docente
personal: debe permitirle comprender, recordar y conectar todo lo que enseñará sin tener que leer
una por una las 67 diapositivas.

No narren el PowerPoint ni enumeren diapositivas. Construyan una clase maestra oral, coherente y
memorable, que explique el razonamiento pedagógico y técnico detrás del taller: qué idea debe quedar
en cada tramo, por qué importa, cómo explicarla con lenguaje accesible, qué pregunta hacer al curso,
qué confusión anticipar y cómo conectar el concepto siguiente. Hablen directamente a Diego usando
“tú”. Trátenlo como un docente técnico que necesita dominar el mapa completo, no como un principiante
que memoriza un guion.

## Jerarquía de las fuentes

- El PDF de 67 diapositivas y el README vigente del Taller 3 definen el contenido pedagógico.
- El cronograma ajustado del Liceo es la única fuente válida para cursos, fecha y horarios. Si otra
  fuente conserva horarios preliminares, ignórenlos. Los bloques vigentes del lunes 24 de agosto son
  3° C de 09:45 a 11:15 y 3° A de 11:30 a 13:00.
- La ficha de propuesta tecnológica define el producto que debe completar cada equipo.
- El informe anonimizado de los Talleres 1 y 2 entrega contexto real sobre los problemas investigados.
  Úsenlo para preparar ejemplos y preguntas, nunca para calificar, ridiculizar o identificar equipos.

## Recorrido requerido

### 1. Mapa mental del taller

Expliquen primero la arquitectura completa de los 90 minutos y la transformación que se busca:
pasar desde un problema ambiental ya investigado hacia una propuesta tecnológica inicial con una
variable observable, un sensor pertinente, una regla “cuando…, entonces…”, una primera prueba segura,
evidencia y un próximo hito demostrable.

Presenten GeoGreen como referente y caso de evolución, no como receta que todos deban copiar. La idea
central es que una solución madura mediante decisiones, pruebas y evidencia; no mediante acumulación
decorativa de componentes.

### 2. Bloque 1 · Una idea puede crecer

Desarrollen en profundidad:

- el problema que resuelve GeoGreen;
- la cadena sensar → enviar → visualizar → alertar;
- la diferencia entre medir un número y producir información que permita actuar;
- la evolución desde problema y simulación hasta prototipo físico, dashboard, diseño 3D y PCB;
- la relación problema → prueba → evidencia → mejora;
- el desafío para los equipos y por qué “llegar más lejos” significa resolver mejor, no agregar más.

Incluyan una transición oral clara desde GeoGreen hacia las ideas de los estudiantes y sugieran las
preguntas más útiles para comprobar comprensión.

### 3. Bloque 2 · Del mundo físico al dato

Enseñen los fundamentos que Diego necesita explicar con seguridad:

- fenómeno físico, sensor, placa, regla y salida;
- qué hace una placa y qué no “comprende” por sí sola;
- diferencia entre entrada, procesamiento y actuador;
- Arduino UNO R4 WiFi frente a ESP32 DevKitC, sin convertirlo en una competencia de marcas;
- lógica de 5 V y 3,3 V;
- caso crítico del HC-SR04: Echo de 5 V directo en UNO R4 y con adaptación de nivel en ESP32;
- conexiones internas de una protoboard;
- función de VCC, GND y señal;
- señales analógicas y digitales;
- sensores, actuadores, resistencias y tierra común;
- protocolo de seguridad antes de conectar USB.

Para cada concepto importante incluyan una analogía útil, una explicación técnicamente correcta, una
pregunta breve para el curso y un error frecuente que Diego debe detectar. Destaquen que el color de
un cable no demuestra su función y que pinout, voltaje y polaridad se verifican antes de energizar.

### 4. Bloque 3 · Prototipar con sensores y agentes

Traten este bloque como el corazón práctico del taller. Expliquen:

- cómo pasar de un problema amplio a una variable observable;
- cómo justificar un sensor por lo que realmente puede detectar;
- por qué una causa plausible no equivale a evidencia local;
- cómo formular la lógica “cuando [sensor] detecte [condición], entonces [el sistema] avisa o actúa”;
- cómo escribir una especificación breve antes del código;
- cómo dirigir un agente entregando intención, componentes, placa, restricciones y evidencia esperada;
- diferencia entre “hazme el sistema completo” y pedir una primera prueba pequeña y verificable;
- qué debe comprobar el equipo humano antes de aceptar conexiones o código;
- rutas Wokwi y hardware físico;
- cómo registrar tanto resultados exitosos como errores útiles;
- por qué las mentorías orientan, revisan y destraban, pero no sustituyen el trabajo autónomo.

Usen los hallazgos anonimizados de los Talleres 1 y 2 para construir ejemplos situados: restos de comida
y residuos orgánicos, envases de compota, botellas PET, bolsas plásticas, cáscaras de naranja y
envoltorios. No asignen automáticamente un sensor a cada residuo. Muestren cómo preguntar primero qué
fenómeno es realmente observable —distancia, presencia, cantidad, temperatura, humedad, luz,
apertura o frecuencia— y reconozcan que no todos los problemas se resuelven únicamente poniendo un
sensor. Enseñen a Diego a reconducir soluciones prematuras hacia preguntas comprobables sin desautorizar
el trabajo anterior de los estudiantes.

### 5. Bloque 4 · Del prototipo al producto

Expliquen:

- la escala de madurez desde problema y variable hasta lectura, respuesta, sistema, experiencia y
  producto;
- por qué una interfaz bonita no corrige una lectura poco confiable;
- cómo software, visualización, conectividad, diseño 3D y PCB agregan valor solamente cuando resuelven
  una necesidad demostrable;
- la diferencia entre protoboard flexible y PCB que integra un circuito ya comprendido;
- cómo elegir un próximo hito pequeño y demostrable;
- cómo completar la ficha de propuesta tecnológica;
- cómo realizar el pitch de 40 segundos;
- qué evidencia conviene llevar a las mentorías y cómo se conecta el taller con la competencia final.

### 6. Capa de facilitación

Después de explicar cada bloque, indiquen a Diego:

- la idea que no puede perder aunque deba abreviar;
- una pregunta de activación;
- una señal de que el curso no está comprendiendo;
- una forma breve de recuperar el foco;
- qué contenido puede resumir si el tiempo se estrecha;
- y una frase de transición hacia el bloque siguiente.

No sugieran decir que Diego “no sabía” electrónica, protoboard o programación cuando comenzó. Su relato
debe mostrar liderazgo técnico: investigó, dirigió agentes, contrastó fuentes, probó, corrigió e integró
evidencia. Tampoco atribuyan al facilitador experiencias, opiniones o frases que no figuren en las
fuentes.

## Cierre del audio

Terminen con un repaso oral utilizable justo antes de entrar a la sala:

1. las doce ideas esenciales que Diego debe tener en la cabeza;
2. diez preguntas de mediación que puede usar mientras circula por los equipos;
3. la lista de seguridad antes del USB;
4. los mínimos que debe contener cada ficha al finalizar;
5. un plan de rescate si queda poco tiempo;
6. y una explicación final de la frase: “GeoGreen demuestra hasta dónde puede crecer una idea. Hoy
   comienza la de ustedes”.

El tono debe ser lúcido, técnico, cercano y exigente, con dos voces que dialoguen de manera natural y
se ayuden a comprender, no que compitan. Eviten bromas, relleno, dramatización, comentarios sobre la
producción del podcast, lectura administrativa del cronograma y repeticiones vacías. Busquen una
duración aproximada de 25 a 35 minutos y prioricen comprensión profunda, conexiones y ejemplos sobre
la simple cobertura superficial.
