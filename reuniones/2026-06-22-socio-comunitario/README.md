# Reunión socio comunitario — lunes 2026-06-22

Presentación de GeoGreen al **socio comunitario (Instituto Comercial Liceo Bicentenario, Osorno)**.
Objetivo: **sumar al liceo como aliado**. Audiencia: directiva + docentes. Presenta Diego, en vivo.

## El deck

**`GeoGreen-socio-comunitario-2026-06-22.pptx`** (24 slides), armado en dos partes fusionadas:

- **Slides 1–5:** la base institucional de la directora, **intactas** (portada, Misión/Visión/Valores,
  Vinculación con el Medio + definición + Modelo VcM).
- **Slides 6–24:** generadas con **nuestro sistema** (`tools/slides-system`, PptxGenJS + tema AIEP),
  pulidas y audience-facing, con el **lockup "Vinculación con el Medio"** (el sello) en cada una:
  6 divisor GeoGreen · 7 problema Osorno · 8 qué es GeoGreen (pipeline + semáforo) · 9 el dispositivo ·
  10 componente tecnológico real (Arduino R4 + sensores) · 11 sensores y actuadores (infografías) ·
  12 la visión/app · 13 GeoGreen Escolar · 14 objetivo transversal · 15 recorrido · 16–18 Talleres 1·2·3
  (cada uno protagoniza su infografía-resumen + bullets de apoyo) · **19 el wow técnico** (slide navy:
  Arduino R4 + sensores + infografía de la protoboard) · 20 lo que producen los estudiantes ·
  21 mentorías · 22 evento final/pitch (panel hero + tarjetas) · 23 la alianza · 24 cierre.

Sistema visual común en 6–23: rail de acento, badges numerados, timelines con track-line, tarjetas
con sombra, infografías enmarcadas y el semáforo dibujado nativo. Cada taller usa un template
imagen-protagonista: frase ancla + mini stepper del recorrido + tarjeta de producto, con la
infografía-resumen del taller a la derecha. Las infografías con sello interno ("VIBE AIEP · SIN LOGOS",
"Coordinación interna", "Verificadores") se **recortan** antes de embeber (ver `assets/info-*`).

De cara al liceo: **sin contexto interno** (nada de "demo/simulado", fechas tentativas, ESP32,
abreviaturas ni referencias de coordinación). Verificado con un chequeo anti-meta.

## Cómo se arma

```bash
node build/armar-geogreen.js     # genera build/parte-geogreen.pptx (slides 6-22, PptxGenJS)
uv run --with python-pptx python build/fusionar.py   # recorta su base a 1-5 + fusiona -> .pptx final
"/c/Program Files/LibreOffice/program/soffice.exe" --headless --convert-to pdf --outdir build GeoGreen-socio-comunitario-2026-06-22.pptx
```

`fusionar.py` copia cada slide nuestra (formas + fondo + imágenes con remapeo de rId) sobre el layout
"Blank" de su base. Cada slide nuestra pinta un fondo opaco a sangre, así no hereda formas de su master.

## Archivos

- `build/armar-geogreen.js` — generador de las slides 6–22 (contenido + estilo).
- `build/fusionar.py` — recorte (a 1–5) + fusión.
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
