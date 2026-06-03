# GeoGreen 🌱

**Medidor IoT de llenado de contenedores de reciclaje** — proyecto de la postulación
al Fondo Concursable VCM 2026, **AIEP Osorno** (Chile).

Un sensor ultrasónico mide cuánto le falta a un contenedor para llenarse y lo
informa con un **semáforo de LEDs** y una **alerta sonora**. La versión completa
proyecta enviar el dato por WiFi a un tablero con la ubicación de cada punto de
reciclaje (de ahí *Geo* + *Green*).

<p align="center">
  <img src="componenetes-arduino.png" alt="Componentes del prototipo GeoGreen con Arduino" width="360">
</p>

## Estado actual

El **track Arduino** ya está implementado y se puede **simular 100 % por terminal**,
sin placa física ni VS Code, usando PlatformIO + Wokwi CLI.

## Qué hace el prototipo

1. El sensor **HC-SR04** mide la distancia entre la tapa y el contenido.
2. El código la convierte en un **porcentaje de llenado** (0–100 %).
3. El semáforo indica el estado:

   | Llenado | LED | Buzzer |
   |---|---|---|
   | `< 40 %` | 🟢 verde | — |
   | `40–79 %` | 🟡 amarillo | — |
   | `≥ 80 %` | 🔴 rojo | 🔊 suena |

## Cómo simularlo (sin VS Code ni Arduino físico)

Requisitos: [PlatformIO Core](https://platformio.org/) y
[Wokwi CLI](https://docs.wokwi.com/wokwi-ci/getting-started) + un token gratuito
de <https://wokwi.com/dashboard/ci> guardado en `~/.wokwi_token`.

```bash
bash arduino/sim.sh         # compila + simula y muestra el Monitor Serie
bash arduino/sim.sh shot    # igual, y genera un screenshot run.png
bash arduino/test.sh        # verifica automáticamente los 3 estados del semáforo
```

Salida esperada de `test.sh`:

```
 80cm -> Llenado: 22 %  (verde)        ... PASS
 50cm -> Llenado: 55 %  (amarillo)     ... PASS
 20cm -> Llenado: 89 %  (rojo+buzzer)  ... PASS
TODOS LOS CASOS PASARON ✓
```

### Cableado

Diagrama generado por CLI con [WireViz](https://github.com/wireviz/WireViz)
(fuente: [`arduino/wiring.yml`](arduino/wiring.yml), regenerar con `wireviz arduino/wiring.yml`):

<p align="center">
  <img src="docs/cableado.png" alt="Diagrama de cableado del prototipo Arduino" width="420">
</p>

Detalle del circuito, mapa de pines y calibración: [`arduino/README.md`](arduino/README.md).

## Maqueta 3D (imprimible)

Carcasa diseñada por código con [OpenSCAD](https://openscad.org/): un contenedor
y una tapa con los huecos para los dos transductores del HC-SR04, la fila de
3 LEDs y el buzzer. Fuente: [`arduino/3d/carcasa.scad`](arduino/3d/carcasa.scad).

<p align="center">
  <img src="docs/carcasa-3d.png" alt="Render 3D de la carcasa de la maqueta" width="440">
</p>

STL listos para imprimir: [`contenedor.stl`](arduino/3d/contenedor.stl) ·
[`tapa.stl`](arduino/3d/tapa.stl). Regenerar:

```bash
openscad -o docs/carcasa-3d.png --viewall --autocenter arduino/3d/carcasa.scad
openscad -D 'parte="tapa"' -o arduino/3d/tapa.stl arduino/3d/carcasa.scad
```

## Estructura

```
.
├── arduino/                 # Track Arduino UNO (firmware + simulación CLI)
│   ├── src/main.cpp         # Lógica de llenado + semáforo + buzzer
│   ├── diagram.json         # Circuito virtual de Wokwi
│   ├── platformio.ini       # Configuración de compilación
│   ├── sim.sh / test.sh     # Scripts de simulación y test por CLI
│   └── README.md
├── docs/                    # Imágenes del proyecto
├── *.md / *.docx / *.pdf    # Documentación: postulación y listas de componentes
└── componentes-*.png        # Fotos de los componentes
```

## Próximos pasos

- Calibrar `DIST_VACIO` / `DIST_LLENO` al contenedor real.
- Track **ESP32**: pantalla OLED + envío por WiFi a un dashboard.
- Georreferenciar los puntos de reciclaje en un mapa.

---

*Proyecto académico — AIEP Osorno. Carreras de Programación y Análisis de Sistemas,
Electricidad y Electrónica, y Trabajo Social.*
