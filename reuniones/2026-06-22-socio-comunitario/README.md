# Reunión socio comunitario — lunes 2026-06-22

> **Registro histórico de una reunión ya realizada.** Este README documenta el
> deck y su construcción; no es fuente de fechas ni del estado actual del
> programa. Para coordinación vigente usar `../../cronograma/README.md` y para el
> Taller 3 usar `../../talleres/03/README.md`.

Presentación de GeoGreen al **socio comunitario (Instituto Comercial Liceo Bicentenario, Osorno)**.
Objetivo: **sumar al liceo como aliado**. Audiencia: directiva + docentes. Presenta Diego, en vivo.

## El deck

**`GeoGreen-socio-comunitario-2026-06-22.pptx`** (25 slides), armado en dos partes fusionadas:

- **Slides 1–5:** la base institucional de la directora, **intactas** (portada, Misión/Visión/Valores,
  Vinculación con el Medio + definición + Modelo VcM).
- **Slides 6–25:** generadas con **nuestro sistema** (`tools/slides-system`, PptxGenJS + tema AIEP),
  pulidas y audience-facing, con el **lockup "Vinculación con el Medio"** (el sello) en cada una:
  6 divisor GeoGreen · 7 problema Osorno · 8 qué es GeoGreen (pipeline + semáforo) · 9 el dispositivo ·
  **10 visualización 3D del dispositivo** (render del modelo + **video reproducible** embebido) ·
  11 componente tecnológico real (Arduino R4 + sensores) · 12 sensores y actuadores (infografías) ·
  13 la visión/app · 14 GeoGreen Escolar · 15 objetivo transversal · 16 recorrido · 17–19 Talleres 1·2·3
  (cada uno protagoniza su infografía-resumen + bullets de apoyo) · **20 el wow técnico** (slide navy:
  Arduino R4 + sensores + infografía de la protoboard) · 21 lo que producen los estudiantes ·
  22 mentorías · 23 evento final/pitch (panel hero + tarjetas) · 24 la alianza · 25 cierre.

Sistema visual común en 6–23: rail de acento, badges numerados, timelines con track-line, tarjetas
con sombra, infografías enmarcadas y el semáforo dibujado nativo. Cada taller usa un template
imagen-protagonista: frase ancla + mini stepper del recorrido + tarjeta de producto, con la
infografía-resumen del taller a la derecha. Las infografías con sello interno ("VIBE AIEP · SIN LOGOS",
"Coordinación interna", "Verificadores") se **recortan** antes de embeber (ver `assets/info-*`).

De cara al liceo: **sin contexto interno** (nada de "demo/simulado", fechas tentativas, ESP32,
abreviaturas ni referencias de coordinación). Verificado con un chequeo anti-meta.

## Cómo se arma

```bash
node build/armar-geogreen.js     # genera build/parte-geogreen.pptx (slides 6-25, PptxGenJS)
uv run --with python-pptx python build/fusionar.py        # recorta su base a 1-5 + fusiona -> .pptx final
uv run --with python-pptx python build/agregar-video.py   # incrusta el video 3D reproducible (post-fusión)
"/c/Program Files/LibreOffice/program/soffice.exe" --headless --convert-to pdf --outdir build GeoGreen-socio-comunitario-2026-06-22.pptx
```

`fusionar.py` copia cada slide nuestra (formas + fondo + imágenes con remapeo de rId) sobre el layout
"Blank" de su base. Cada slide nuestra pinta un fondo opaco a sangre, así no hereda formas de su master.

## Archivos

- `build/armar-geogreen.js` — generador de las slides 6–25 (contenido + estilo).
- `build/fusionar.py` — recorte (a 1–5) + fusión.
- `build/agregar-video.py` — incrusta el video 3D reproducible en el deck final (post-fusión,
  `python-pptx add_movie`); `fusionar.py` solo copia imágenes, no media.
- `assets/render-poster.jpg` / `assets/render-carcasa-crop.mp4` — portada y video del modelo 3D
  (recortados del screencast de Blender para mostrar solo el modelo).
- `build/parte-geogreen.pptx` — parte 6–22 (intermedio).
- `build/GeoGreen-socio-comunitario-2026-06-22.pdf` — export para revisar/compartir.
- `build/montage-final.png` — las 22 slides de un vistazo.
- `assets/lockup-vinculacion-dark.png` / `-white.png` — el sello (extraído de `image1.svg` de su PPTX,
  recoloreado a navy para fondo claro / blanco para el divisor y el cierre oscuros).
- `base/` — la base original de la directora + montaje. `base-directora-vibe.md` — destilación de su onda.

Assets de contenido embebidos: `app-geogreen-mapa-osorno.png` (de `../2026-06-15/`),
`docs/infografias/infografia-prototipo-original-sim-geogreen.jpg`,
`cronograma/infografias/infografia-objetivo-transversal-geogreen.png`,
`docs/arduino-uno-r4-wifi-dibujo-digital-crop.png`, fotos de `docs/kit-sensores/assets/`, las
infografías de sensores/actuadores recortadas a `assets/info-sensores.png` · `info-actuadores.png`,
y las infografías-resumen de cada taller recortadas (sin sello) a `assets/info-taller1.png` ·
`info-taller2.png` · `info-taller3.png`. El slide del wow técnico usa `assets/info-protoboard2.png`
(= `docs/infografias/infografia-protoboard-que-es-como-usarla.jpg`). Disponibles sin usar aún:
`info-protoboard.png` (MB-102) e `info-electricidad.png` (= `docs/infografias/infografia-electricidad-para-electronica.jpg`,
candidata a un slide companion de circuitos/Ley de Ohm).
