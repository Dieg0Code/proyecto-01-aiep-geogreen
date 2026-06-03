# Guía para armar el pictórico en Fritzing

Esta guía es para que **tú** dibujes el plano pictórico (el clásico con el
Arduino, la protoboard y los cablecitos de colores) en **Fritzing**. Fritzing se
arma a mano en su interfaz gráfica — no se puede generar por línea de comandos —
pero es el plano más fácil de seguir cuando tengas las piezas en la mano.

> Plano alternativo ya generado por CLI: el **mapa de conexiones** en
> [`docs/cableado.png`](../docs/cableado.png) (fuente `wiring.yml`). Esta guía y
> ese diagrama dicen lo mismo; usa el que te acomode.

## 1. Instalar Fritzing

- Descarga desde <https://fritzing.org/download/> (aporte voluntario; en Linux
  está en repos). Es app de escritorio, no CLI.
- Abre Fritzing y quédate en la pestaña **Protoboard** (Breadboard).

## 2. Colocar las piezas

Arrastra desde el panel de la derecha (Core Parts) al lienzo:

1. **Arduino Nano** (busca "Arduino Nano" en el buscador de piezas).
2. **Protoboard** (media o pequeña).
3. **Sensor HC-SR04** (búscalo; si no está, instálalo desde "Parts" → import, o
   usa un módulo de 4 pines genérico).
4. **3 LEDs** (verde, amarillo, rojo).
5. **3 resistencias** → haz clic en cada una y pon **220 Ω** en Inspector.
6. **Buzzer** (piezo/buzzer).
7. **Porta-pilas 3×AAA** (busca "battery 3xAAA" o "battery holder") y un
   **interruptor** (slide switch).

## 3. Conexiones (cablecitos de colores)

Sigue esta tabla — es exactamente la lógica del firmware (`src/main.cpp`):

| Desde (Arduino Nano) | Hacia | Color sugerido |
|---|---|---|
| `5V` | HC-SR04 **VCC** | rojo |
| `GND` | HC-SR04 **GND** | negro |
| `D9` | HC-SR04 **TRIG** | azul |
| `D10` | HC-SR04 **ECHO** | verde |
| `D2` | resistencia 220 Ω → **LED rojo (+)** | naranjo |
| `D3` | resistencia 220 Ω → **LED amarillo (+)** | amarillo |
| `D4` | resistencia 220 Ω → **LED verde (+)** | verde |
| `D8` | **Buzzer (+)** | morado |
| `GND` | cátodo (–) de los 3 LEDs y Buzzer (–) | negro |

**Alimentación (para que ande sin USB):**

| Desde | Hacia | Color |
|---|---|---|
| Pilas **(+)** | **Interruptor** pata 1 | rojo |
| Interruptor pata 2 | Arduino **VIN** | rojo |
| Pilas **(–)** | Arduino **GND** | negro |

> El cátodo del LED es la pata corta / el lado plano. El ánodo (+) va a la
> resistencia, nunca el LED directo al pin (se quema).

## 4. Verificar y exportar

- Revisa que no haya cables sueltos (Fritzing marca en rojo los pines sin
  conectar al pasar el mouse).
- **Archivo → Exportar → como Imagen (PNG/PDF)** para tener tu plano.
- Guarda el `.fzz` en `arduino/` si quieres versionarlo.

## 5. Del protoboard al módulo

Cuando funcione en protoboard, ese mismo circuito se suelda compacto dentro de
la **caja del módulo** (ver [`3d/modulo.scad`](3d/modulo.scad) y el plano
explosionado en [`docs/modulo-3d.png`](../docs/modulo-3d.png)). El sensor queda
mirando hacia abajo y la caja se pega con adhesivo 3M a la cara interior de la
tapa del basurero — sin perforar ni modificar el basurero.
