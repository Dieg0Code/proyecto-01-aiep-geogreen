# Banco de ideas semilla

Recurso libre del programa GeoGreen Escolar (mentorías / desarrollo de prototipos), **no atado a
un taller**. Proyectos listos para ofrecer cuando un equipo se bloquea ("profe, no se me ocurre
nada"). Pensado para el **equipo docente / mentores**: no se entrega un proyecto cerrado, sino 2–3
ideas para que el estudiante **elija y adapte**. Todas se arman con el kit que ya tenemos y con el
patrón del prototipo: **sensar → umbral → semáforo + alarma**.

## Archivos

- `banco-ideas-semilla.tex` — fuente LaTeX (identidad AIEP, compila con `tectonic`).
- `banco-ideas-semilla.pdf` — documento para imprimir/compartir.
- `assets/` — fotos de los sensores del pool (reutilizadas del manual del kit de los 45).

Recompilar: `tectonic banco-ideas/banco-ideas-semilla.tex`

## Audiencia (importante al escribir / editar)

Este material lo lee un grupo **académico pero diverso**: jefe administrativo del AIEP, la
Directora, Don Elías (Jefe de Escuela de Ingeniería, Energía y Tecnología), una coordinadora de
Don Elías que es **docente de Electricidad**, el asistente de laboratorio, y los estudiantes de
Programación. **No todos son del área de programación.** Por eso:

- **Lenguaje llano, no pecar de técnico.** Nombres simples (ej. "sensor de distancia"), con la
  etiqueta técnica (`HC-SR04`) solo como dato secundario para quien arma el circuito.
- **Apoyarse en imágenes** (fotos de los sensores), como en el manual del kit de los 45.
- **Nada de rutas de archivos, comandos ni referencias al repo/git** dentro de los documentos que
  se comparten: la mayoría no sabe que existe un repositorio. Esas referencias van solo en los
  README internos como este.

## Contenido

- **Pool de sensores** (con foto) — 7 sensores fáciles del kit + 3 salidas (semáforo, buzzer,
  relé). Recorta los ~45 módulos a los que cada idea usa de verdad. Inventario completo en
  `docs/kit-sensores/`.
- **12 ideas con impacto territorial y social**, ancladas a problemas reales de Osorno y la región
  de Los Lagos, por tema: aire y calefacción (leña/aire saturado), agua (crisis hídrica y APR),
  ríos y clima, residuos, energía e infraestructura, producción local (cadena de frío). Cada idea
  trae nivel (Fácil / Intermedio / Desafío), **umbral concreto** y una pista de "sube de nivel" que
  la escala a un mapa o red comunitaria. Pensadas para pegar frente a un jurado, pero simples de
  construir.
- **De la maqueta al territorio** — cada idea arranca simple y barata pero escala a un mapa o red
  comunitaria. El tono es ambicioso y marketinero (se presenta a un jurado), con títulos de gancho;
  la mecánica de fondo es técnicamente correcta (pasó un **review adversarial con Codex** + spike de
  contexto territorial) pero sin disclaimers que le bajen el perfil al pitch.
- **Ficha de idea** — plantilla de 4 líneas para que un equipo describa su idea tecnológica
  inicial (problema → qué mide → cuándo se activa → cómo avisa).

### El aparato primero, el software es el "sube de nivel"

El prototipo base es solo el dispositivo físico (sensor + luz/alarma) y lo puede armar cualquier
equipo, incluso los que no programan. Sumarle software — app, panel en vivo, mapa, aviso al
celular — es el "sube de nivel", y conecta con la app de GeoGreen y la placa con WiFi (UNO R4).
Por eso cada idea reserva su capa de software para esa pista.

## Regla de oro para destrabar

> "**Cuando** [el sensor] pase de [un umbral], **entonces** [avisa o acciona]."
> Si el equipo completa esa frase, ya tiene proyecto.
