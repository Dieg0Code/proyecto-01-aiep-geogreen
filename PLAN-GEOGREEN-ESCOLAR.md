# GeoGreen Escolar — Plan de ejecución

> One-pager para alinear el equipo. Proyecto de **continuidad**, Fondo Concursable
> VCM 2026, AIEP Osorno. Líder de ejecución: **Diego Obando** (Programación y
> Análisis de Sistemas).
>
> Resumen completo de la postulación: [`RESUMEN-PROYECTO.md`](RESUMEN-PROYECTO.md).

## En una frase

GeoGreen sensorea el llenado de contenedores, los **georreferencia** y avisa para
optimizar los retiros. Esta versión lo convierte en un **programa educativo**
(*GeoGreen Escolar*) que AIEP dicta a un colegio, usando el dispositivo como caso
central de aprendizaje STEM + ambiental.

## Qué es esta versión (importante)

La etapa anterior **construyó y probó el aparato**. Esta etapa **NO es repetir el
aparato**: es un **programa formativo estructurado** — talleres + demostraciones +
un desafío final — dictado al socio comunitario.

- **Socio comunitario:** Instituto Comercial Liceo Bicentenario (Osorno)
- **Beneficiarios:** ~60 · **Estudiantes AIEP:** 30 · **Docentes:** 2
- **Ejecución:** 06-04-2026 → 30-10-2026 · **Presupuesto:** $2.080.000

## La lógica del sistema (del documento)

```
   sensar   →    enviar    →   visualizar   →   alertar
  (HC-SR04)   (WiFi / LoRa)   (tablero+mapa)   (semáforo+buzzer)
     ✅           Fase 2          Fase 3           ✅
```

El prototipo Arduino de hoy cubre **sensar** y **alertar**. La "gracia" completa
(la **G** de Geo) es **enviar + visualizar** en un mapa georreferenciado.

## Roadmap en 3 fases

| Fase | Qué | Hardware | Estado |
|---|---|---|---|
| **1. Prototipo** | Mide llenado y avisa con semáforo + buzzer. Para los talleres/demos. | Arduino UNO/Nano + HC-SR04 + LEDs + buzzer | ✅ **Funcionando** (simulado y documentado) |
| **2. Conectividad** | "Enviar" el dato. | ESP32 (WiFi integrado) **o** módulo WiFi/LoRa al Arduino | ⏳ Por adquirir (está en presupuesto) |
| **3. Tablero / App** | "Visualizar" los contenedores en un mapa + alertas. | — (software) | 🔜 Diseño |

## Roles por carrera

| Carrera | Responsable | Aporte |
|---|---|---|
| Programación y Análisis de Sistemas | **Diego** | Firmware, telemetría, tablero/app |
| Electricidad y Electrónica | **Don Elías** | Sensores, circuito, telemetría, seguridad |
| Desarrollo Social / Trabajo Social | — | Talleres socioeducativos: participación, corresponsabilidad, materiales |

## Estado actual (lo que ya está hecho)

Prototipo Fase 1 **operativo y documentado** en el repositorio
([github.com/Dieg0Code/proyecto-01-aiep-geogreen](https://github.com/Dieg0Code/proyecto-01-aiep-geogreen)):

- Firmware del semáforo + simulación que corre por terminal (sin placa física).
- Diagrama de cableado y guía de armado (Fritzing).
- Maqueta 3D imprimible y visualización web 3D del llenado.

→ Esto permite empezar los **talleres/demos** sin esperar a comprar nada.

## Decisiones / pedidos para la reunión

1. **Aprobar la compra de Fase 2** (ESP32 recomendado, o WiFi/LoRa) para habilitar
   "enviar → visualizar".
2. **Coordinar con Desarrollo Social** el calendario y formato de los talleres.
3. **Confirmar el colegio y fechas** del primer taller piloto.
4. Definir quién arma el **tablero/app** (Fase 3) y con qué alcance para esta etapa.

## Próximo paso técnico inmediato

Cerrar Fase 1: armar el prototipo físico (como la infografía) y calibrarlo con el
contenedor real. El firmware y los planos ya están listos para seguir.
