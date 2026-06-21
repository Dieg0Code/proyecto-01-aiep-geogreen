# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What GeoGreen is

GeoGreen started as a grant proposal (Fondo Concursable VCM 2026, AIEP Osorno, Chile) for a
smart waste-container fill-level monitor, and has **grown into an educational program in
execution — "GeoGreen Escolar"**: workshops + STEM demos + a final challenge delivered to a
school, using the device as the central case. Socio comunitario: **Instituto Comercial Liceo
Bicentenario, Osorno**; ~60 student beneficiaries; program window **May–Sep 2026**. It spans
three AIEP programs: Programación y Análisis de Sistemas (software), Electricidad y Electrónica
(hardware), and Trabajo Social (community).

The device pipeline is **sensar → enviar → visualizar → alertar** (later: geo-map of recycling
points — hence *Geo* + *Green*):

1. An **HC-SR04** ultrasonic sensor measures the distance from the bin lid to the contents.
2. The firmware converts it to a **fill percentage**.
3. A **LED traffic light** shows the state: **< 40 % verde · 40–80 % amarillo · ≥ 80 % rojo**.
4. A **buzzer** alerts when full.
5. (Networked builds) the reading is sent over WiFi and shown on a **dashboard / map**.

The repo has effectively **two halves**: the **device** (firmware + 3D + web + app) and the
**program** (workshops, schedule, decks, content tooling). The grant application
`1_Proyecto (1).docx` is still the authoritative source for formal scope; `RESUMEN-PROYECTO.md`
and `PLAN-GEOGREEN-ESCOLAR.md` summarize it.

## Device tracks (firmware + software)

- **`arduino/`** — baseline Arduino track. Firmware (`src/main.cpp`: fill logic + semáforo +
  buzzer), fully **simulable/automatable from the CLI** (PlatformIO + Wokwi CLI — no VS Code, no
  arduino-cli, no board). The intended physical product is a **clip-on module**
  (`arduino/3d/modulo.scad`): a sealed box that sticks with 3M adhesive to the underside of any
  existing bin lid (sensor down; no drilling), holding an Arduino Nano + HC-SR04 + 3×AAA + buzzer
  + LED traffic light. `carcasa.scad` is a separate demo-container maquette.
- **`arduino-r4/`** — the physical **Arduino UNO R4 WiFi** Diego owns (Renesas RA4M1 at 5V +
  onboard ESP32-S3 WiFi + integrated 12×8 LED matrix). This is the track that **unifies the old
  Arduino + ESP32 plans** (5V *and* WiFi *and* a display). Built/flashed with **PlatformIO**
  (platform `renesas-ra`, board `uno_r4_wifi`); **each sketch is its own pio project folder**
  with its own `platformio.ini`. USB-only demos on the built-in matrix — no external parts.
  Sketches: `geogreen_show/` (cinematic ~25–30 s demo, Binary Code Modulation for 8 brightness
  levels), `geogreen_matrix/` (simpler fallback), `hacker_show/` (personal cyberpunk reel, not
  GeoGreen). Flash with `pio run -d arduino-r4/<sketch> -t upload`. See `arduino-r4/README.md`.
- **`app/`** — **PWA monitoring dashboard** (Vite + React + TypeScript + Tailwind). Shows the
  fleet georeferenced on a real Osorno map (react-leaflet), with fill gauge, history, battery,
  signal and alerts — closing the `visualizar/alertar` end. Telemetry today is a **deterministic
  simulator** behind a `TelemetryService` interface (`src/lib/telemetry.ts`); swapping in real
  ESP32 `fetch` calls leaves the UI unchanged. Same semáforo thresholds as firmware
  (`src/lib/status.ts`). Tailwind palette mirrors `tools/slides-system/theme/tokens.js`.
- **`web/`** — no-build Three.js demos: `index.html` (a **real GLB container**,
  `web/vendor/models/contenedor.glb`, that fills and lights the semáforo with the firmware
  logic) and `plano.html` (interactive exploded assembly plano of the clip-on module).

**Voltage gotcha:** the HC-SR04 Echo pin outputs **5 V**. The UNO R4 (5 V) connects Echo
**direct, no divider**. A **3.3 V ESP32 DevKit** would need a voltage divider / level shifter on
Echo — don't write firmware or wiring that connects Echo straight to a 3.3 V GPIO. (The ESP32
DevKit firmware track itself is not built; R4 is the physical networked path now.)

## Program & content (GeoGreen Escolar)

- **`talleres/01–03/`** — workshop kits (planning docs, student PDFs, infografías, PPTs). 01
  conciencia ambiental, 02 ciencia del reciclaje, 03 Arduino/sensores/prototipado.
- **`cronograma/`** — program schedule based on the grant Gantt (see `cronograma/README.md`).
- **`reuniones/<fecha>/`** — meeting decks. `2026-06-15/` (coordinación, PptxGenJS source) and
  `2026-06-22-socio-comunitario/` (presentation to the liceo; built on the director's base —
  see `base-directora-vibe.md` there).
- **`docs/`** — generated/shared assets: `infografias/`, `podcasts/`, `presupuestos/` (LaTeX),
  `kit-sensores/` (LaTeX manual identifying the 45-sensor kit), `guia-arduino.*`, 3D/web renders.
- **`.agent/skills/`** — AIEP content skills used to produce program material: `clase-design`,
  `evaluacion-design`, `cohort-comms`, `slides-aiep` (these are pedagogical — they don't cover
  hardware/reference docs).
- **`tools/`** — `slides-system` (shared deck theme/components for PptxGenJS), `pptx-validator`,
  `pbip-validator`.

## Toolchain (all installed, CLI-driven)

**Device:**
- **PlatformIO** (`pio`, via `uv tool` → `~/.local/bin/pio.exe`) — compiles firmware.
- **Wokwi CLI** (`wokwi-cli` → `~/.local/bin/wokwi-cli.exe`) — headless sim. Needs a free token
  in `~/.wokwi_token` (read by the scripts; **never commit it**).
- **WireViz** (`uv tool`) + **Graphviz** (`scoop`) — wiring diagram from `arduino/wiring.yml`.
- **OpenSCAD** (`scoop`) — 3D render/STL. NOTE: call the real path
  `~/scoop/apps/openscad/2021.01/openscad.exe`; the `current` symlink crashes OpenSCAD on Windows.

**Web/app:** Node + npm + **Vite** (the `app/` PWA and `tools/slides-system`).

**Docs & decks:**
- **tectonic** (`scoop`) — LaTeX → PDF (XeTeX, self-contained; compiles `fontspec` + Arial).
  Used for `docs/presupuestos/`, `docs/kit-sensores/`.
- **LibreOffice** (`soffice`) — convert `.pptx` → PDF (e.g. to inspect/render a deck).
- **poppler** (`pdftoppm`) + **ImageMagick** (`magick`) — render PDF pages to PNG, montages,
  image conversion (incl. WebP). No Ghostscript installed, so use `pdftoppm` (not `magick`) for
  PDF→PNG.
- **Chromium/Edge headless** — HTML → PDF (see the `generar-pdf-desde-html` approach).
- The **`slides`** skill (PptxGenJS) builds/edits `.pptx` decks.

**Python:** use **uv** (not pip — system Python can't write to its Scripts dir).

## Common commands

```
bash arduino/sim.sh            # compile + headless simulate, prints serial
bash arduino/test.sh           # asserts the 3 semaforo states (verde/amarillo/rojo)
wireviz arduino/wiring.yml     # regenerate the wiring diagram
pio run -d arduino-r4/geogreen_show -t upload   # flash the R4 demo (auto-detects COM port)
python -m http.server 8099 --directory web      # serve the Three.js viz / plano
cd app && npm run dev          # PWA dashboard at http://localhost:5173
tectonic docs/kit-sensores/kit-45-sensores-identificacion.tex   # rebuild a LaTeX PDF
```

`arduino/test.sh` is the closest thing to a hardware test suite (Wokwi `--expect-text`
assertions). Zero-install sim alternative: paste `src/main.cpp` + `diagram.json` into a new
Arduino Uno project at wokwi.com. See `arduino/README.md`.

## Conventions

- **Documentation is written in Spanish** — keep that language for new docs/decks unless asked.
- **No meta commentary inside product UIs** (e.g. don't label things "datos simulados" / "demo"
  in the app or decks).
- New program material follows the **AIEP visual identity** (institutional palette; see
  `slides-aiep` and `tools/slides-system`).
- Reference photos / BOMs per track live at the repo root
  (`Componentes Arduino…`, `Componentes ESP32…`, `componenetes-arduino.png`, etc.).
