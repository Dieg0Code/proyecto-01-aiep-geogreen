# Cronograma — GeoGreen Escolar Osorno

> Plan de trabajo del programa, basado en la Carta Gantt de la postulación
> (Fondo VCM 2026). Es una **propuesta de ejecución**: fechas y responsables son
> tentativos hasta la reunión de coordinación. Resumen del proyecto:
> [`../RESUMEN-PROYECTO.md`](../RESUMEN-PROYECTO.md).

## Información General

- **Período (según Carta Gantt):** Mayo – Septiembre de 2026
- **Fechas de ficha del fondo:** inicio 06-04-2026 · término 30-10-2026 *(a conciliar con la Gantt)*
- **Modalidad:** programa de talleres + mentorías + desafío final (pitch escolar)
- **Socio comunitario:** Instituto Comercial Liceo Bicentenario, Osorno
- **Beneficiarios:** 60 estudiantes del colegio
- **Equipo AIEP:** 2 docentes (1 Ingeniería/Energía/Tecnología + 1 Desarrollo Social y Educación) + estudiantes AIEP
- **Caso central:** GeoGreen (sensar → enviar → visualizar → alertar)

> **Responsables (abreviaturas):** **I/E/T** = Ingeniería, Energía y Tecnología
> (parte técnica) · **DSE** = Desarrollo Social y Educación (parte pedagógica) ·
> **Ambos** = trabajo conjunto.

## Enfoque del Programa

- Conciencia ambiental, economía circular y separación de residuos en origen.
- Ciencia y tecnología del reciclaje: sensores, microcontroladores, telemetría
  (WiFi/LoRa) y tableros de visualización.
- Pensamiento computacional aplicado (descomposición, patrones, algoritmos simples).
- Innovación con propósito: usar GeoGreen como caso real del territorio.
- Desafío final: que los equipos diseñen miniprototipos o **simulaciones**.

## Cronograma Detallado

### Mes 1 — Mayo · Alistamiento y codiseño
**Foco:** dejar todo listo (acuerdos con el colegio, temario, materiales y la demo técnica).

| Hito | Actividad | Verificador | Responsable |
|---|---|---|---|
| _Semana 1–2_ | _Coordinación con el colegio_ | | |
| Reunión inicial | Acuerdos con el establecimiento, calendarización, expectativas | Acta | Ambos |
| Cierre de temario | Definir contenidos de los 3 talleres y el desafío | Plan de trabajo | Ambos |
| _Semana 3–4_ | _Preparación de materiales_ | | |
| Materiales y kits | Reunir kits educativos y materiales de prototipado escolar | Lista de materiales | DSE |
| **Demo técnica lista** | Prototipo GeoGreen + simulación funcionando para mostrar | Prototipo/sim operativos | I/E/T |

### Mes 2 — Junio · Talleres formativos
**Foco:** los tres talleres con los estudiantes del colegio.

| Hito | Actividad | Verificador | Responsable |
|---|---|---|---|
| **Taller 1** | Conciencia ambiental local: problemas de residuos, hábitos, separación en origen | Lista, fotos, material | DSE |
| **Taller 2** | Ciencia del reciclaje: propiedades de materiales, ciclo de vida, demostraciones simples | Lista, fotos, fichas | Ambos |
| **Taller 3** | Innovación con propósito (GeoGreen como caso): ideación guiada, sensores/datos, rutas eficientes | Lista, fotos, guía del desafío | I/E/T |

### Mes 3 — Julio–Agosto · Acompañamiento y ensayo
**Foco:** mentorear a los equipos y preparar el pitch.

| Hito | Actividad | Verificador | Responsable |
|---|---|---|---|
| _Julio–Agosto_ | _Mentorías_ | | |
| Acompañamiento | Mentorías breves por equipo; revisión de ideas y miniprototipos | Registro de mentorías | Ambos |
| _Agosto_ | _Preparación del pitch_ | | |
| Ensayo de pitch | Entrenamiento de presentación y soporte visual | Listas, rúbricas | DSE |

### Mes 4 — Septiembre · Cierre
**Foco:** el evento final y el cierre del programa.

| Hito | Actividad | Verificador | Responsable |
|---|---|---|---|
| **Evento final** | Muestra/pitch de los equipos; retroalimentación y reconocimientos | Programa, jurado, fotos | Ambos |
| Devolución y cierre | Informe, recomendaciones y set de materiales reutilizables | Informe final | Ambos |

## Preparación técnica (lo que corre en paralelo — área I/E/T)

Esto es lo que se prepara antes/durante para sostener los talleres, y gran parte
**ya está avanzado** en este repositorio:

| Insumo | Estado | Dónde |
|---|---|---|
| Firmware del prototipo (semáforo + buzzer) | ✅ Listo | [`../arduino/src/main.cpp`](../arduino/src/main.cpp) |
| Simulación para demostrar sin hardware | ✅ Lista | [`../arduino/`](../arduino/) · `bash arduino/sim.sh` |
| Visualización web del llenado (para mostrar a los chicos) | ✅ Lista | [`../web/index.html`](../web/index.html) |
| Diagrama de cableado y guía de armado | ✅ Listo | [`../docs/cableado.png`](../docs/cableado.png) · [`../arduino/GUIA-FRITZING.md`](../arduino/GUIA-FRITZING.md) |
| Prototipo físico (maqueta como la infografía) | ⏳ Por armar | — |
| Material de los talleres (PPTs) | 🔜 En preparación | — |

## Resultado Esperado del Programa

Al finalizar, los estudiantes del colegio deberían poder:

- Comprender sostenibilidad, economía circular y gestión responsable de residuos.
- Reconocer los principios de sensores, microcontroladores y visualización de datos.
- Interpretar información ambiental/tecnológica para tomar decisiones.
- Idear y simular soluciones con la lógica **sensar → enviar → visualizar → alertar**.
- Presentar una propuesta propia en el desafío final.
- Adoptar hábitos de manejo responsable de residuos como agentes de cambio.

## Notas / a confirmar en la reunión

- **Fechas:** conciliar el período de la Gantt (mayo–sept) con las fechas de la
  ficha (abril–octubre).
- **Roles:** hay un segundo docente involucrado; definir quién toma I/E/T y quién
  DSE, y qué parte asume cada uno. Este cronograma deja la repartición propuesta,
  no la final.
- **Nombre del colegio:** confirmar (en la descripción aparece como placeholder).
