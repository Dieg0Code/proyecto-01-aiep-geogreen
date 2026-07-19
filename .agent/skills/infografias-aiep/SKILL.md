---
name: infografias-aiep
description: Diseñar infografías educativas verticales con identidad visual AIEP mediante GPT Image. Usar para crear una infografía de apoyo, lámina resumen, cronograma visual o material complementario en imagen; incluye brief, generación, revisión del texto y archivado del PNG con su prompt.
---

# Infografías AIEP

Skill para producir infografías educativas generadas con GPT Image y coherentes con la familia visual AIEP.

## Flujo de trabajo

1. Declarar audiencia y propósito. Para público escolar, usar lenguaje cercano, motivador y concreto, sin perder precisión ni caer en un tono infantil.
2. Leer la fuente de verdad del material: README de la clase o taller, cronograma y documentos vigentes. No inventar datos ni compromisos.
3. Revisar infografías `*-gptimage.png` previas para mantener la familia visual y comprender la preferencia del docente.
4. Escribir el brief con `references/brief-template.md` y `references/estilo-aiep-infografia.md`.
5. Generar con GPT Image en formato vertical largo, por defecto `1024x1536`, calidad alta.
6. Revisar con `references/checklist-revision.md`, especialmente ortografía, tildes, ñ, cifras y ausencia de texto inventado.
7. Archivar en `infografia/` o `infografias/`:
   - `infografia-<tema>-gptimage.png`;
   - prompt reproducible junto al PNG con el mismo nombre base y extensión `.prompt.md`.
8. Si la imagen no pasa la revisión, ajustar el prompt y regenerar. No tapar errores editando manualmente el PNG.

## Reglas duras

- **VIBE AIEP · SIN LOGOS.** La identidad proviene de la paleta y la composición, no de marcas registradas.
- Fondo claro, navy + rojo, tarjetas blancas con borde fino, iconografía lineal, secciones numeradas y mucho aire.
- Poco texto. La infografía es un mapa visual, no un documento.
- Texto perfecto en español. Revisar siempre el resultado.
- Traducir característica técnica a utilidad comprensible para la audiencia.
- No incluir contexto interno, notas de coordinación ni mensajes meta.

## Recursos obligatorios

- `references/estilo-aiep-infografia.md`
- `references/brief-template.md`
- `references/checklist-revision.md`
- `references/audiencias.md`

## Checklist mínimo

- Audiencia y propósito claros.
- Contenido derivado de la fuente real.
- Familia visual consistente con las infografías previas.
- Sin logos ni marcas.
- Español correcto y legible en teléfono.
- PNG y prompt archivados juntos.
