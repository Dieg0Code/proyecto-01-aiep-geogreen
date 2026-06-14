# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

The repository root holds **planning and specification documents** (the grant
application and component lists). The Arduino track is implemented in `arduino/`
and is fully simulable/automatable **from the CLI — no VS Code, no arduino-cli,
no physical board**. The intended physical product is a **clip-on module**
(`arduino/3d/modulo.scad`): a sealed box that sticks with 3M adhesive to the
underside of any existing bin lid (sensor faces down; no drilling), holding an
Arduino Nano + HC-SR04 + 3xAAA + buzzer + LED traffic light. `carcasa.scad` is a
separate demo-container maquette. `web/index.html` is a fill-level 3D viz;
`web/plano.html` is an interactive exploded assembly plano. ESP32 track not done.

A **third track lives in `arduino-r4/`** for the physical **Arduino UNO R4 WiFi**
Diego now owns (Renesas RA4M1 at 5V + onboard ESP32-S3 WiFi + integrated 12x8 LED
matrix). Built/flashed with **PlatformIO** (`pio`, platform `renesas-ra`, board
`uno_r4_wifi`) — **each sketch is its own pio project folder** with a
`platformio.ini`, because each `.ino` is a standalone program. USB-only demos on the
built-in matrix — no external parts. Sketches: `geogreen_show/` (cinematic ~25-30s
demo; uses Binary Code Modulation for 8 brightness levels), `geogreen_matrix/`
(simpler fallback), `hacker_show/` (personal cyberpunk reel, not GeoGreen). Flash
with `pio run -d arduino-r4/<sketch> -t upload` (auto-detects the COM port); see
`arduino-r4/README.md`. The `.ino` files are kept so the Arduino IDE still works.
Being 5V, this board connects HC-SR04 Echo direct with **no voltage divider**
(unlike the 3.3V ESP32 DevKit track).

### Toolchain (all installed, all CLI-driven)

- **PlatformIO** (`pio`) installed via `uv tool` → `~/.local/bin/pio.exe`. Compiles the firmware (bundles its own AVR compiler).
- **Wokwi CLI** (`wokwi-cli`) → `~/.local/bin/wokwi-cli.exe`. Headless simulation. Needs a free token in `~/.wokwi_token` (read by the scripts; never commit it).
- **WireViz** (`uv tool`) + **Graphviz** (`scoop`, on `~/scoop/shims`) → wiring diagram from `arduino/wiring.yml`.
- **OpenSCAD** (`scoop`, extras bucket) → 3D render/STL from `arduino/3d/carcasa.scad`. NOTE: call the real path `~/scoop/apps/openscad/2021.01/openscad.exe`; the `current` symlink crashes OpenSCAD on Windows.
- Use **uv** for any Python, not pip (system Python can't write to its Scripts dir).

### Common commands

```
bash arduino/sim.sh            # compile + headless simulate, prints serial
bash arduino/test.sh           # asserts the 3 semaforo states (verde/amarillo/rojo)
wireviz arduino/wiring.yml     # regenerate the wiring diagram
openscad ... arduino/3d/carcasa.scad   # regenerate render/STL (see arduino/3d header)
python -m http.server 8099 --directory web   # serve the Three.js viz
```

`test.sh` is the closest thing to a test suite (Wokwi `--expect-text` assertions).
Zero-install alternative for the sim: paste `src/main.cpp` + `diagram.json` into a
new Arduino Uno project at wokwi.com. See `arduino/README.md`.

## What GeoGreen is

GeoGreen is a grant proposal (Fondo Concursable VCM 2026, AIEP Osorno, Chile) for a smart waste-container fill-level monitor. The physical prototype:

1. An ultrasonic sensor (HC-SR04) measures the distance from the container lid to the contents.
2. The controller converts that distance into a **fill percentage**.
3. A LED "traffic light" (green / yellow / red) shows low / medium / high fill.
4. A buzzer alerts when the container is full.
5. (ESP32 track only) An OLED shows the percentage locally and WiFi sends the reading to a simple dashboard.

A later stage envisions georeferencing recycling points on a map dashboard — hence "Geo" + "Green". The project spans three AIEP programs: Programación y Análisis de Sistemas (software), Electricidad y Electrónica (hardware), and Trabajo Social (community).

## Two hardware tracks

The component lists describe two parallel hardware approaches; firmware will differ between them:

- **Arduino track** (`Componentes Arduino para GeoGreen - Elias.md`, led by Don Elías): Arduino UNO/Nano, no networking. Minimal demo maquette — sensor + LEDs + buzzer only. This is the baseline prototype.
- **ESP32 track** (`Componentes ESP32 para GeoGreen - Diego.md`): ESP32 DevKit V1 with built-in WiFi, adds OLED display and dashboard upload. The more complete version.

Key hardware constraint to remember when writing/reviewing ESP32 firmware: the ESP32 runs at **3.3V** but the HC-SR04 Echo pin outputs **5V** — the design requires a voltage divider or logic-level converter on Echo to protect the board. Don't write firmware or wiring docs that connect Echo directly to a GPIO.

## File guide

- `1_Proyecto (1).docx` — the master grant application (project metadata, dates, budget, participants). The authoritative source for project scope.
- `Componentes ESP32 para GeoGreen - Diego.md` / `Componentes Arduino para GeoGreen - Elias.md` — bills of materials and expected behavior per track.
- `Componentes Arduino para GeoGreen - Don Elias.pdf` / `.html` — same Arduino BOM in other formats.
- `componenetes-arduino.png`, `componentes-don-elias.png` — reference photos of components.

Documentation is written in Spanish; keep that language for new docs unless asked otherwise.
