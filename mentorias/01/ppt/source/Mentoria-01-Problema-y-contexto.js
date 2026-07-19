const path = require("path");
const PptxGenJS = require("../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../tools/slides-system");
const {
  imageSizingCrop,
  imageSizingContain,
} = require("../../../../tools/slides-system/vendor/pptxgenjs_helpers/image");
const {
  warnIfSlideHasOverlaps,
  warnIfSlideElementsOutOfBounds,
} = require("../../../../tools/slides-system/vendor/pptxgenjs_helpers/layout");

const { applyAiepTheme, TYPOGRAPHY } = slidesSystem.theme;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
applyAiepTheme(pptx, {
  author: "GeoGreen Escolar Osorno",
  company: "AIEP Osorno",
  subject: "Mentoría 1 - Problema y contexto afectado",
  title: "Mentoría 1 - ¿El problema es real?",
});

const SH = pptx.ShapeType;
const W = 13.333;
const H = 7.5;
const rootDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "../../../..");
const outputPptx = path.join(rootDir, "Mentoria-01-Problema-y-contexto.pptx");

const C = {
  navy: "082B5C",
  navyDeep: "031D3B",
  blue: "1D4E89",
  cyan: "35B7C6",
  cyanSoft: "DDF4F6",
  red: "D62027",
  paper: "F5F2EC",
  white: "FFFFFF",
  ink: "182B3A",
  slate: "5F6B7A",
  border: "D8DEE6",
  softBlue: "E9EEF4",
  softNeutral: "EEF3EF",
  gold: "E0BC5A",
  green: "2E8B57",
  greenSoft: "E5F3EA",
  darkPanel: "0D223A",
  paleInk: "D8E7F5",
};

const IMG = {
  lockup: path.join(
    repoRoot,
    "reuniones",
    "2026-06-22-socio-comunitario",
    "assets",
    "lockup-vinculacion-dark.png",
  ),
  lockupW: path.join(
    repoRoot,
    "reuniones",
    "2026-06-22-socio-comunitario",
    "assets",
    "lockup-vinculacion-white.png",
  ),
  cover: path.join(
    repoRoot,
    "talleres",
    "01",
    "ppt",
    "source",
    "assets",
    "images",
    "ross-waste-audit-education-day.jpg",
  ),
};

function addImageCrop(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({ path: imagePath, ...imageSizingCrop(imagePath, x, y, w, h), ...opts });
}

function addImageContain(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({ path: imagePath, ...imageSizingContain(imagePath, x, y, w, h), ...opts });
}

function addTopBars(slide, colors = [C.red, C.cyan, C.gold]) {
  const widths = [0.78, 0.44, 0.22];
  let x = 0;
  colors.forEach((color, index) => {
    slide.addShape(SH.rect, {
      x,
      y: 0,
      w: widths[index],
      h: 0.12,
      fill: { color },
      line: { color },
    });
    x += widths[index] + 0.08;
  });
}

function addInstitutionalLockup(slide, opts = {}) {
  addImageContain(
    slide,
    opts.white ? IMG.lockupW : IMG.lockup,
    opts.x ?? 11.55,
    opts.y ?? 0.24,
    opts.w ?? 1.42,
    opts.h ?? 1.06,
  );
}

function addFooter(slide, number, label = "GeoGreen Escolar · Mentoría 1") {
  slide.addText(label, {
    x: 0.72,
    y: 7.14,
    w: 6.3,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    color: C.slate,
    margin: 0,
  });
  slide.addText(String(number).padStart(2, "0"), {
    x: 11.72,
    y: 7.05,
    w: 0.86,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color: C.navy,
    align: "right",
    margin: 0,
  });
}

function addHeader(slide, kicker, title, subtitle, number) {
  slide.background = { color: C.paper };
  addTopBars(slide);
  slide.addText(kicker.toUpperCase(), {
    x: 0.72,
    y: 0.36,
    w: 4.6,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.45,
    color: C.red,
    margin: 0,
  });
  slide.addText(title, {
    x: 0.72,
    y: 0.7,
    w: 10.25,
    h: 0.54,
    fontFace: TYPOGRAPHY.display,
    fontSize: 27,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.72,
      y: 1.3,
      w: 10.15,
      h: 0.4,
      fontFace: TYPOGRAPHY.body,
      fontSize: 14,
      color: C.slate,
      margin: 0,
    });
  }
  addInstitutionalLockup(slide);
  addFooter(slide, number);
}

function pill(slide, text, x, y, w, opts = {}) {
  const h = opts.h ?? 0.38;
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.05,
    fill: { color: opts.fill ?? C.white },
    line: { color: opts.line ?? opts.fill ?? C.border, pt: opts.linePt ?? 1 },
  });
  slide.addText(text, {
    x: x + 0.1,
    y: y + 0.075,
    w: w - 0.2,
    h: h - 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.fontSize ?? 10,
    bold: opts.bold !== false,
    color: opts.color ?? C.navy,
    align: opts.align ?? "center",
    margin: 0,
  });
}

function numberBadge(slide, text, x, y, color = C.red, size = 0.46) {
  slide.addShape(SH.ellipse, {
    x,
    y,
    w: size,
    h: size,
    fill: { color },
    line: { color },
  });
  slide.addText(String(text), {
    x,
    y: y + size * 0.23,
    w: size,
    h: size * 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: size > 0.6 ? 13 : 10.5,
    bold: true,
    color: color === C.gold ? C.navyDeep : C.white,
    align: "center",
    margin: 0,
  });
}

function addNotesAndValidate(slide, notes) {
  if (notes) slide.addNotes(notes);
  // Los solapamientos de fondos, fotografías, números y etiquetas son intencionales.
  warnIfSlideHasOverlaps(slide, pptx, { muteContainment: true });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

// 01 · Portada
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.cover, 0, 0, W, H);
  slide.addShape(SH.rect, {
    x: 0,
    y: 0,
    w: 7.15,
    h: H,
    fill: { color: C.navyDeep, transparency: 4 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  slide.addShape(SH.rect, {
    x: 0.72,
    y: 1.1,
    w: 0.12,
    h: 4.4,
    fill: { color: C.red },
    line: { color: C.red },
  });
  pill(slide, "GEOGREEN ESCOLAR · MENTORÍA 1", 1.06, 0.7, 3.18, {
    fill: C.white,
    line: C.white,
    color: C.navy,
    fontSize: 10.1,
  });
  slide.addText("¿El problema\nes real?", {
    x: 1.05,
    y: 1.3,
    w: 5.55,
    h: 1.58,
    fontFace: TYPOGRAPHY.display,
    fontSize: 38,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Problema · contexto · evidencia", {
    x: 1.07,
    y: 3.08,
    w: 5.4,
    h: 0.4,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17.5,
    bold: true,
    color: C.paleInk,
    margin: 0,
  });
  slide.addText("Validar antes de seguir construyendo.", {
    x: 1.07,
    y: 4.28,
    w: 5.3,
    h: 0.44,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 11.24,
    y: 0.2,
    w: 1.72,
    h: 1.28,
    rectRadius: 0.04,
    fill: { color: C.white, transparency: 4 },
    line: { color: C.white, transparency: 100 },
  });
  addInstitutionalLockup(slide, { x: 11.39, y: 0.3, w: 1.42, h: 1.06 });
  slide.addText("31 AGO 2026 · AIEP OSORNO", {
    x: 1.07,
    y: 6.62,
    w: 4.2,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    charSpacing: 1.05,
    color: "C4D7EA",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 15 segundos. Recibir al curso y leer la pregunta central sin responderla todavía. La fotografía instala observación y trabajo colectivo; no abrir una nueva explicación sobre reciclaje.",
  );
}

// 02 · Misión de la mentoría
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("CHECKPOINT 1 · MISIÓN DE HOY", {
    x: 0.74,
    y: 0.48,
    w: 5.2,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.5,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Validar antes de seguir construyendo", {
    x: 0.74,
    y: 0.92,
    w: 10.6,
    h: 0.58,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Hoy comprobaremos si la idea responde a una necesidad real y situada.", {
    x: 0.76,
    y: 1.64,
    w: 9.9,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 16,
    color: C.paleInk,
    margin: 0,
  });

  const steps = [
    ["01", "INTEGRAR", "problema · material · idea", C.red],
    ["02", "SITUAR", "lugar · momento · actores", C.cyan],
    ["03", "CONTRASTAR", "evidencia · hipótesis · supuesto", C.gold],
    ["04", "VALIDAR", "problema · contexto · próximo paso", C.green],
  ];
  steps.forEach((step, index) => {
    const x = 0.76 + index * 3.12;
    slide.addShape(SH.roundRect, {
      x,
      y: 2.46,
      w: 2.66,
      h: 2.42,
      rectRadius: 0.06,
      fill: { color: "12385E" },
      line: { color: step[3], pt: 1.25 },
    });
    numberBadge(slide, step[0], x + 0.24, 2.8, step[3], 0.62);
    slide.addText(step[1], {
      x: x + 0.24,
      y: 3.66,
      w: 2.18,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.5,
      bold: true,
      color: step[3],
      margin: 0,
    });
    slide.addText(step[2], {
      x: x + 0.24,
      y: 4.14,
      w: 2.16,
      h: 0.44,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.5,
      bold: true,
      color: C.white,
      margin: 0,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 1.26,
    y: 5.54,
    w: 10.8,
    h: 0.92,
    rectRadius: 0.05,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("SALIDA OBLIGATORIA", {
    x: 1.62,
    y: 5.76,
    w: 2.28,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    color: C.navyDeep,
    margin: 0,
  });
  slide.addText("Problema validado + contexto afectado + próximo paso", {
    x: 4.02,
    y: 5.71,
    w: 7.56,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });
  slide.addText("60 minutos · 5 equipos por bloque · el trabajo pertenece al equipo", {
    x: 1.9,
    y: 6.78,
    w: 9.54,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 45 segundos. Presentar la mentoría como un checkpoint del proyecto. Leer la salida obligatoria. Evitar explicar los cuatro bloques en detalle: basta con mostrar la dirección general.",
  );
}

// 03 · Cadena obligatoria de entregables
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Lógica del proyecto",
    "Cada etapa recibe lo anterior y lo hace avanzar",
    "No son actividades sueltas: forman una cadena obligatoria de entregables.",
    3,
  );

  const stages = [
    {
      x: 0.7,
      n: "T1",
      title: "PROBLEMA",
      detail: "frase ambiental concreta",
      color: C.red,
      fill: C.white,
    },
    {
      x: 3.78,
      n: "T2",
      title: "MATERIAL",
      detail: "ficha de residuo asociado",
      color: C.cyan,
      fill: C.softBlue,
    },
    {
      x: 6.86,
      n: "T3",
      title: "IDEA",
      detail: "propuesta tecnológica inicial",
      color: C.gold,
      fill: C.white,
    },
    {
      x: 9.94,
      n: "M1",
      title: "VALIDACIÓN",
      detail: "problema + contexto + próximo paso",
      color: C.green,
      fill: C.greenSoft,
    },
  ];

  stages.forEach((stage, index) => {
    slide.addShape(SH.roundRect, {
      x: stage.x,
      y: 2.18,
      w: 2.46,
      h: 3.18,
      rectRadius: 0.06,
      fill: { color: stage.fill },
      line: { color: stage.color, pt: index === 3 ? 2 : 1.3 },
      shadow: { type: "outer", color: "8A97A6", opacity: 0.13, blur: 1.4, angle: 45, distance: 0.7 },
    });
    numberBadge(slide, stage.n, stage.x + 0.88, 2.55, stage.color, 0.72);
    slide.addText(stage.title, {
      x: stage.x + 0.24,
      y: 3.56,
      w: 1.98,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(stage.detail, {
      x: stage.x + 0.24,
      y: 4.14,
      w: 1.98,
      h: 0.7,
      fontFace: TYPOGRAPHY.body,
      fontSize: 13.2,
      bold: true,
      color: C.ink,
      align: "center",
      valign: "mid",
      margin: 0,
    });
    if (index < stages.length - 1) {
      slide.addShape(SH.chevron, {
        x: stage.x + 2.54,
        y: 3.46,
        w: 0.42,
        h: 0.62,
        fill: { color: C.navy },
        line: { color: C.navy },
      });
    }
  });

  slide.addShape(SH.roundRect, {
    x: 1.18,
    y: 5.92,
    w: 11.0,
    h: 0.72,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Los tres entregables de entrada deben estar presentes sobre la mesa.", {
    x: 1.56,
    y: 6.15,
    w: 10.24,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 60 segundos. Pedir que los equipos pongan a la vista los tres entregables. Aclarar que la Mentoría 1 no reemplaza productos faltantes por una explicación oral; una ausencia se registra como brecha del proceso.",
  );
}

// 04 · Activación de roles
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });

  pill(slide, "CONFIRMEN RESPONSABILIDADES · 1 MIN", 0.74, 0.48, 3.62, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 9.8,
  });
  slide.addText("Seis roles, una lectura compartida", {
    x: 0.74,
    y: 1.03,
    w: 8.4,
    h: 0.52,
    fontFace: TYPOGRAPHY.display,
    fontSize: 29,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Cada responsabilidad aporta al diagnóstico; la decisión pertenece al equipo completo.", {
    x: 0.76,
    y: 1.66,
    w: 8.8,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.5,
    color: C.paleInk,
    margin: 0,
  });

  const roles = [
    { x: 0.74, y: 2.38, n: "01", name: "COORDINACIÓN", task: "ordena tiempo y entregables", color: C.red, side: "left" },
    { x: 0.74, y: 3.82, n: "02", name: "INVESTIGACIÓN", task: "aclara contexto y actores", color: C.cyan, side: "left" },
    { x: 0.74, y: 5.26, n: "03", name: "DISEÑO", task: "organiza mapas y relaciones", color: C.gold, side: "left" },
    { x: 9.72, y: 2.38, n: "04", name: "TECNOLOGÍA", task: "explica qué busca observar", color: C.cyan, side: "right" },
    { x: 9.72, y: 3.82, n: "05", name: "PRUEBAS Y EVIDENCIA", task: "distingue respaldo y supuestos", color: C.green, side: "right" },
    { x: 9.72, y: 5.26, n: "06", name: "COMUNICACIÓN", task: "prepara la síntesis del equipo", color: C.red, side: "right" },
  ];

  roles.forEach((role) => {
    slide.addShape(SH.roundRect, {
      x: role.x,
      y: role.y,
      w: 2.86,
      h: 1.0,
      rectRadius: 0.05,
      fill: { color: "12385E" },
      line: { color: role.color, pt: 1.25 },
    });
    numberBadge(slide, role.n, role.x + 0.18, role.y + 0.25, role.color, 0.5);
    slide.addText(role.name, {
      x: role.x + 0.82,
      y: role.y + 0.17,
      w: 1.86,
      h: 0.26,
      fontFace: TYPOGRAPHY.display,
      fontSize: role.name.length > 16 ? 10.8 : 12.4,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(role.task, {
      x: role.x + 0.82,
      y: role.y + 0.52,
      w: 1.86,
      h: 0.3,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.8,
      bold: true,
      color: C.paleInk,
      margin: 0,
    });

    const lineX = role.side === "left" ? role.x + 2.86 : 7.92;
    const lineW = role.side === "left" ? 1.58 : 1.8;
    slide.addShape(SH.line, {
      x: lineX,
      y: role.y + 0.5,
      w: lineW,
      h: 0,
      line: { color: role.color, pt: 1.1, transparency: 35 },
    });
  });

  slide.addShape(SH.ellipse, {
    x: 5.18,
    y: 3.1,
    w: 2.74,
    h: 2.02,
    fill: { color: C.gold },
    line: { color: C.white, pt: 1.6 },
  });
  slide.addText("PROBLEMA\nA VALIDAR", {
    x: 5.42,
    y: 3.58,
    w: 2.26,
    h: 0.74,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.navyDeep,
    align: "center",
    valign: "mid",
    margin: 0,
  });

  slide.addText("6 PERSONAS · 6 RESPONSABILIDADES · 1 EQUIPO", {
    x: 3.18,
    y: 6.72,
    w: 6.98,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.8,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("04", {
    x: 11.72,
    y: 7.05,
    w: 0.86,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color: C.paleInk,
    align: "right",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 60 segundos. Los equipos ya están formados y los seis roles son obligatorios. Pedir confirmación rápida. No explicar cada rol desde cero: cada responsable identifica qué debe cuidar durante la mentoría.",
  );
}

// 05 · Apertura Bloque 1
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true, y: 0.16, h: 0.9 });

  slide.addText("BLOQUE 1 · 10 MINUTOS", {
    x: 0.76,
    y: 0.54,
    w: 4.5,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.45,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Volver al problema", {
    x: 0.76,
    y: 1.06,
    w: 6.1,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 32,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("No comenzamos de nuevo. Revisamos si el problema, el material y la idea cuentan una misma historia.", {
    x: 0.78,
    y: 1.88,
    w: 5.62,
    h: 1.0,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17,
    bold: true,
    color: C.paleInk,
    margin: 0,
  });

  const layers = [
    ["TALLER 1", "PROBLEMA", "¿Qué situación necesita cambiar?", C.red],
    ["TALLER 2", "MATERIAL", "¿Qué residuo está involucrado?", C.cyan],
    ["TALLER 3", "IDEA", "¿Cómo busca aportar la propuesta?", C.gold],
  ];
  layers.forEach((layer, index) => {
    const x = 7.0 + index * 0.56;
    const y = 1.26 + index * 1.38;
    slide.addShape(SH.roundRect, {
      x,
      y,
      w: 4.78,
      h: 1.28,
      rectRadius: 0.05,
      fill: { color: index === 1 ? "153C64" : "12385E" },
      line: { color: layer[3], pt: 1.4 },
      shadow: { type: "outer", color: "000000", opacity: 0.2, blur: 1.2, angle: 45, distance: 0.8 },
    });
    slide.addText(layer[0], {
      x: x + 0.22,
      y: y + 0.17,
      w: 1.12,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.8,
      bold: true,
      color: layer[3],
      margin: 0,
    });
    slide.addText(layer[1], {
      x: x + 1.4,
      y: y + 0.14,
      w: 2.98,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(layer[2], {
      x: x + 0.22,
      y: y + 0.66,
      w: 4.22,
      h: 0.34,
      fontFace: TYPOGRAPHY.body,
      fontSize: 13,
      bold: true,
      color: C.paleInk,
      margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 7.72,
    y: 5.64,
    w: 4.8,
    h: 0.76,
    rectRadius: 0.05,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("¿MISMA HISTORIA?", {
    x: 8.06,
    y: 5.88,
    w: 4.12,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });

  slide.addText("05", {
    x: 11.72,
    y: 7.05,
    w: 0.86,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color: C.paleInk,
    align: "right",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 15 segundos. Abrir el Bloque 1 con la idea de trazabilidad. Los tres productos se leen como una trayectoria; no se corrigen todavía.",
  );
}

// 06 · Situación, problema y respuesta
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Primera distinción",
    "Situación, problema y respuesta no son lo mismo",
    "Una solución adquiere sentido cuando nace de una necesidad observada.",
    6,
  );

  const cards = [
    {
      x: 0.72,
      title: "SITUACIÓN OBSERVADA",
      question: "¿Qué está ocurriendo?",
      example: "El contenedor se desborda en momentos de la jornada.",
      color: C.red,
      fill: C.white,
      n: "01",
    },
    {
      x: 4.52,
      title: "PROBLEMA O NECESIDAD",
      question: "¿Qué condición requiere atención?",
      example: "Falta información oportuna para gestionar el retiro.",
      color: C.cyan,
      fill: C.softBlue,
      n: "02",
    },
    {
      x: 8.32,
      title: "RESPUESTA PROPUESTA",
      question: "¿Cómo busca aportar el equipo?",
      example: "Detectar el nivel de llenado y comunicar una alerta.",
      color: C.gold,
      fill: C.white,
      n: "03",
    },
  ];

  cards.forEach((card, index) => {
    slide.addShape(SH.roundRect, {
      x: card.x,
      y: 2.12,
      w: 3.42,
      h: 3.72,
      rectRadius: 0.06,
      fill: { color: card.fill },
      line: { color: card.color, pt: 1.3 },
      shadow: { type: "outer", color: "8A97A6", opacity: 0.12, blur: 1.2, angle: 45, distance: 0.6 },
    });
    numberBadge(slide, card.n, card.x + 0.22, 2.42, card.color, 0.58);
    slide.addText(card.title, {
      x: card.x + 0.96,
      y: 2.44,
      w: 2.12,
      h: 0.52,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.2,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(card.question, {
      x: card.x + 0.28,
      y: 3.32,
      w: 2.86,
      h: 0.36,
      fontFace: TYPOGRAPHY.body,
      fontSize: 14,
      bold: true,
      color: card.color === C.gold ? C.navy : card.color,
      align: "center",
      margin: 0,
    });
    slide.addShape(SH.line, {
      x: card.x + 0.42,
      y: 3.92,
      w: 2.58,
      h: 0,
      line: { color: C.border, pt: 1.1 },
    });
    slide.addText(card.example, {
      x: card.x + 0.34,
      y: 4.2,
      w: 2.74,
      h: 1.02,
      fontFace: TYPOGRAPHY.body,
      fontSize: 14.2,
      bold: true,
      color: C.ink,
      align: "center",
      valign: "mid",
      margin: 0,
    });
    if (index < cards.length - 1) {
      slide.addShape(SH.chevron, {
        x: card.x + 3.46,
        y: 3.56,
        w: 0.28,
        h: 0.62,
        fill: { color: C.navy },
        line: { color: C.navy },
      });
    }
  });

  slide.addShape(SH.roundRect, {
    x: 1.62,
    y: 6.18,
    w: 10.08,
    h: 0.62,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("No partimos por una tecnología atractiva para buscar después un problema que la justifique.", {
    x: 1.94,
    y: 6.37,
    w: 9.44,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.8,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 90 segundos. Leer las tres preguntas y usar GeoGreen como ejemplo breve. Reforzar que el sensor no es el problema y que la respuesta debe nacer de la necesidad. No entrar en funcionamiento técnico.",
  );
}

// 07 · Actividad de coherencia
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  addInstitutionalLockup(slide);

  slide.addShape(SH.roundRect, {
    x: 0.62,
    y: 0.54,
    w: 3.16,
    h: 6.3,
    rectRadius: 0.06,
    fill: { color: C.navyDeep },
    line: { color: C.navyDeep },
  });
  pill(slide, "TRABAJO POR EQUIPOS", 0.94, 0.92, 2.52, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 9.8,
  });
  slide.addText("05:00", {
    x: 0.9,
    y: 1.62,
    w: 2.6,
    h: 0.86,
    fontFace: TYPOGRAPHY.display,
    fontSize: 41,
    bold: true,
    color: C.gold,
    align: "center",
    margin: 0,
  });
  slide.addText("PRIMERA REVISIÓN\nDE COHERENCIA", {
    x: 0.98,
    y: 2.86,
    w: 2.46,
    h: 0.74,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("El equipo decide.\nLa mentoría pregunta y orienta.", {
    x: 1.0,
    y: 4.12,
    w: 2.42,
    h: 0.76,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.2,
    bold: true,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  pill(slide, "ENTREGABLES SOBRE LA MESA", 0.92, 5.7, 2.56, {
    fill: C.cyan,
    line: C.cyan,
    color: C.navyDeep,
    fontSize: 9.2,
  });

  slide.addText("¿Los tres productos cuentan una misma historia?", {
    x: 4.24,
    y: 0.72,
    w: 6.92,
    h: 0.52,
    fontFace: TYPOGRAPHY.display,
    fontSize: 26,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Revisen sin empezar de nuevo y sin agregar componentes.", {
    x: 4.26,
    y: 1.38,
    w: 7.54,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.5,
    color: C.slate,
    margin: 0,
  });

  const tasks = [
    ["01", "RELACIONEN", "¿El residuo analizado corresponde al problema?", C.red],
    ["02", "COMPRUEBEN", "¿La idea tecnológica responde a ese mismo problema?", C.cyan],
    ["03", "DETECTEN", "¿Cambió el problema solo para justificar la tecnología?", C.gold],
    ["04", "REDACTEN", "Completen juntos la frase de cierre.", C.green],
  ];
  tasks.forEach((task, index) => {
    const y = 2.0 + index * 0.84;
    numberBadge(slide, task[0], 4.28, y, task[3], 0.48);
    slide.addText(task[1], {
      x: 4.98,
      y: y + 0.02,
      w: 1.48,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14,
      bold: true,
      color: task[3] === C.gold ? C.navy : task[3],
      margin: 0,
    });
    slide.addText(task[2], {
      x: 6.56,
      y: y - 0.02,
      w: 5.5,
      h: 0.48,
      fontFace: TYPOGRAPHY.body,
      fontSize: 13.6,
      bold: true,
      color: C.ink,
      margin: 0,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 4.22,
    y: 5.54,
    w: 8.16,
    h: 1.06,
    rectRadius: 0.05,
    fill: { color: C.white },
    line: { color: C.red, pt: 1.5 },
  });
  slide.addText("NUESTRA IDEA TECNOLÓGICA SE RELACIONA CON EL PROBLEMA PORQUE…", {
    x: 4.54,
    y: 5.78,
    w: 7.52,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    color: C.red,
    charSpacing: 0.4,
    margin: 0,
  });
  slide.addShape(SH.line, {
    x: 4.56,
    y: 6.3,
    w: 7.46,
    h: 0,
    line: { color: C.navy, pt: 1.2 },
  });
  addFooter(slide, 7, "GeoGreen Escolar · Mentoría 1 · Bloque 1");
  addNotesAndValidate(
    slide,
    "Tiempo: 5 minutos de trabajo y 30 segundos para escuchar una o dos frases. Mantener esta diapositiva proyectada. Circular entre equipos con preguntas, sin redactar por ellos. Si falta un entregable, registrar la brecha. Cerrar preguntando qué relación todavía necesita claridad.",
  );
}

// 08 · Apertura Bloque 2
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });

  pill(slide, "BLOQUE 2 · 15 MINUTOS", 0.76, 0.52, 2.42, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 10,
  });
  slide.addText("¿Dónde ocurre\ny a quién afecta?", {
    x: 0.76,
    y: 1.26,
    w: 5.4,
    h: 1.48,
    fontFace: TYPOGRAPHY.display,
    fontSize: 35,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Pasamos de una idea general a un diagnóstico situado.", {
    x: 0.78,
    y: 3.04,
    w: 5.2,
    h: 0.7,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17,
    bold: true,
    color: C.paleInk,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 0.78,
    y: 4.3,
    w: 5.48,
    h: 1.08,
    rectRadius: 0.05,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("Un problema cambia cuando cambia el lugar, el momento o las personas que participan.", {
    x: 1.12,
    y: 4.58,
    w: 4.8,
    h: 0.54,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17.2,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });

  const dimensions = [
    { x: 7.04, y: 1.42, n: "01", title: "LUGAR", cue: "espacio y recorrido", color: C.red },
    { x: 9.74, y: 1.42, n: "02", title: "MOMENTO", cue: "frecuencia y duración", color: C.cyan },
    { x: 7.04, y: 3.92, n: "03", title: "PERSONAS", cue: "actores y relaciones", color: C.gold },
    { x: 9.74, y: 3.92, n: "04", title: "CONDICIONES", cue: "normas e infraestructura", color: C.green },
  ];
  dimensions.forEach((dimension) => {
    slide.addShape(SH.roundRect, {
      x: dimension.x,
      y: dimension.y,
      w: 2.24,
      h: 1.88,
      rectRadius: 0.06,
      fill: { color: "12385E" },
      line: { color: dimension.color, pt: 1.35 },
    });
    numberBadge(slide, dimension.n, dimension.x + 0.18, dimension.y + 0.2, dimension.color, 0.52);
    slide.addText(dimension.title, {
      x: dimension.x + 0.74,
      y: dimension.y + 0.24,
      w: 1.34,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: dimension.title.length > 9 ? 9.8 : 13.5,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(dimension.cue, {
      x: dimension.x + 0.26,
      y: dimension.y + 0.94,
      w: 1.72,
      h: 0.44,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.2,
      bold: true,
      color: C.paleInk,
      align: "center",
      margin: 0,
    });
  });

  slide.addText("08", {
    x: 11.72,
    y: 7.05,
    w: 0.86,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color: C.paleInk,
    align: "right",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 15 segundos. Introducir el cambio de foco: la relación problema-solución ya fue revisada; ahora se delimita el contexto. Leer la frase central y avanzar.",
  );
}

// 09 · Cuatro dimensiones del contexto
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Diagnóstico situado",
    "Cuatro lentes para comprender la situación completa",
    "No buscamos resolver las causas todavía: primero delimitamos qué ocurre.",
    9,
  );

  const lenses = [
    {
      x: 0.72,
      w: 2.86,
      label: "ESPACIAL",
      big: "¿DÓNDE?",
      detail: "lugar · recorrido · características",
      color: C.red,
      fill: "FCEBEC",
    },
    {
      x: 3.74,
      w: 2.86,
      label: "TEMPORAL",
      big: "¿CUÁNDO?",
      detail: "momento · frecuencia · duración",
      color: C.cyan,
      fill: C.cyanSoft,
    },
    {
      x: 6.76,
      w: 2.86,
      label: "RELACIONAL",
      big: "¿QUIÉNES?",
      detail: "personas · grupos · interacciones",
      color: C.gold,
      fill: "FBF3D9",
    },
    {
      x: 9.78,
      w: 2.86,
      label: "INSTITUCIONAL Y MATERIAL",
      big: "¿QUÉ INFLUYE?",
      detail: "normas · información · infraestructura",
      color: C.green,
      fill: C.greenSoft,
    },
  ];

  lenses.forEach((lens, index) => {
    slide.addShape(SH.roundRect, {
      x: lens.x,
      y: 2.16,
      w: lens.w,
      h: 3.78,
      rectRadius: 0.06,
      fill: { color: lens.fill },
      line: { color: lens.color, pt: 1.25 },
      shadow: { type: "outer", color: "8A97A6", opacity: 0.1, blur: 1.2, angle: 45, distance: 0.5 },
    });
    slide.addShape(SH.rect, {
      x: lens.x,
      y: 2.16,
      w: lens.w,
      h: 0.16,
      fill: { color: lens.color },
      line: { color: lens.color },
    });
    numberBadge(slide, `0${index + 1}`, lens.x + 0.24, 2.54, lens.color, 0.54);
    slide.addText(lens.label, {
      x: lens.x + 0.96,
      y: 2.58,
      w: 1.58,
      h: 0.42,
      fontFace: TYPOGRAPHY.body,
      fontSize: lens.label.length > 16 ? 9.4 : 11.2,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(lens.big, {
      x: lens.x + 0.24,
      y: 3.48,
      w: 2.38,
      h: 0.44,
      fontFace: TYPOGRAPHY.display,
      fontSize: lens.big.length > 10 ? 17.2 : 20,
      bold: true,
      color: lens.color === C.gold ? C.navy : lens.color,
      align: "center",
      margin: 0,
    });
    slide.addShape(SH.line, {
      x: lens.x + 0.46,
      y: 4.2,
      w: 1.94,
      h: 0,
      line: { color: C.border, pt: 1 },
    });
    slide.addText(lens.detail, {
      x: lens.x + 0.3,
      y: 4.58,
      w: 2.26,
      h: 0.78,
      fontFace: TYPOGRAPHY.body,
      fontSize: 13.2,
      bold: true,
      color: C.ink,
      align: "center",
      valign: "mid",
      margin: 0,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 1.44,
    y: 6.28,
    w: 10.46,
    h: 0.54,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Un problema bien delimitado se puede observar, discutir y contrastar.", {
    x: 1.78,
    y: 6.44,
    w: 9.78,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.8,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 90 segundos. Recorrer las cuatro lentes con preguntas breves. Evitar pedir causas definitivas. La meta es que el equipo ubique su situación en espacio, tiempo, relaciones y condiciones institucionales o materiales.",
  );
}

// 10 · Mapa de actores sin culpabilización
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  addInstitutionalLockup(slide);

  slide.addShape(SH.roundRect, {
    x: 0.64,
    y: 0.62,
    w: 3.74,
    h: 6.08,
    rectRadius: 0.06,
    fill: { color: C.navyDeep },
    line: { color: C.navyDeep },
  });
  pill(slide, "LECTURA RELACIONAL", 0.98, 0.96, 2.22, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 9.8,
  });
  slide.addText("No buscamos\nculpables", {
    x: 0.98,
    y: 1.64,
    w: 3.04,
    h: 1.02,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Buscamos comprender personas, prácticas y condiciones.", {
    x: 1.0,
    y: 2.96,
    w: 2.96,
    h: 0.8,
    fontFace: TYPOGRAPHY.body,
    fontSize: 16,
    bold: true,
    color: C.paleInk,
    margin: 0,
  });
  slide.addShape(SH.line, {
    x: 1.0,
    y: 4.08,
    w: 2.94,
    h: 0,
    line: { color: C.gold, pt: 2 },
  });
  slide.addText("Eviten frases como:", {
    x: 1.0,
    y: 4.4,
    w: 2.9,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.5,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("“Nadie recicla”\n“A todos les molesta”\n“Siempre ocurre”", {
    x: 1.0,
    y: 4.82,
    w: 2.9,
    h: 1.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
  });

  slide.addText("Tres posiciones dentro de la red del problema", {
    x: 4.82,
    y: 0.78,
    w: 6.46,
    h: 0.46,
    fontFace: TYPOGRAPHY.display,
    fontSize: 25,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Una misma persona o grupo puede aparecer en más de una.", {
    x: 4.84,
    y: 1.38,
    w: 6.56,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.2,
    color: C.slate,
    margin: 0,
  });

  const actorGroups = [
    {
      y: 2.04,
      n: "01",
      title: "DIRECTAMENTE INVOLUCRADOS",
      detail: "Interactúan cotidianamente con la situación.",
      color: C.red,
    },
    {
      y: 3.56,
      n: "02",
      title: "AFECTADOS DIRECTA O INDIRECTAMENTE",
      detail: "Experimentan alguna consecuencia del problema.",
      color: C.cyan,
    },
    {
      y: 5.08,
      n: "03",
      title: "CON CAPACIDAD DE APORTAR",
      detail: "Entregan información o participan en una mejora.",
      color: C.green,
    },
  ];

  actorGroups.forEach((group) => {
    slide.addShape(SH.roundRect, {
      x: 4.82,
      y: group.y,
      w: 7.46,
      h: 1.16,
      rectRadius: 0.05,
      fill: { color: C.white },
      line: { color: group.color, pt: 1.25 },
    });
    numberBadge(slide, group.n, 5.08, group.y + 0.32, group.color, 0.52);
    slide.addText(group.title, {
      x: 5.86,
      y: group.y + 0.2,
      w: 3.52,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: group.title.length > 28 ? 12.2 : 14.2,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(group.detail, {
      x: 9.38,
      y: group.y + 0.18,
      w: 2.54,
      h: 0.56,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.4,
      bold: true,
      color: C.ink,
      valign: "mid",
      margin: 0,
    });
  });

  addFooter(slide, 10, "GeoGreen Escolar · Mentoría 1 · Bloque 2");
  addNotesAndValidate(
    slide,
    "Tiempo: 90 segundos. Presentar las tres posiciones y detener cualquier formulación que responsabilice a un grupo completo. La tarea es reconocer relaciones y condiciones, no asignar culpas. Una persona puede estar involucrada, afectada y también aportar.",
  );
}

// 11 · Actividad: mapa situado
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  addInstitutionalLockup(slide);

  slide.addShape(SH.roundRect, {
    x: 0.62,
    y: 0.54,
    w: 3.18,
    h: 6.3,
    rectRadius: 0.06,
    fill: { color: C.navyDeep },
    line: { color: C.navyDeep },
  });
  pill(slide, "TRABAJO POR EQUIPOS", 0.94, 0.9, 2.54, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 9.8,
  });
  slide.addText("08:00", {
    x: 0.9,
    y: 1.58,
    w: 2.62,
    h: 0.86,
    fontFace: TYPOGRAPHY.display,
    fontSize: 41,
    bold: true,
    color: C.gold,
    align: "center",
    margin: 0,
  });
  slide.addText("MAPA SITUADO\nDEL PROBLEMA", {
    x: 0.98,
    y: 2.82,
    w: 2.46,
    h: 0.76,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("Precisen el alcance.\nNo completen con suposiciones.", {
    x: 1.0,
    y: 4.12,
    w: 2.42,
    h: 0.72,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.2,
    bold: true,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  pill(slide, "EL EQUIPO REDACTA", 1.06, 5.72, 2.3, {
    fill: C.cyan,
    line: C.cyan,
    color: C.navyDeep,
    fontSize: 9.2,
  });

  slide.addText("Construyan la escena completa", {
    x: 4.24,
    y: 0.7,
    w: 6.72,
    h: 0.48,
    fontFace: TYPOGRAPHY.display,
    fontSize: 26,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Respondan desde sus entregables y lo que realmente conocen.", {
    x: 4.26,
    y: 1.32,
    w: 6.8,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.2,
    color: C.slate,
    margin: 0,
  });

  const fields = [
    { x: 4.24, y: 1.94, w: 3.62, title: "LUGAR ESPECÍFICO", hint: "¿Dónde ocurre?", color: C.red },
    { x: 8.06, y: 1.94, w: 3.72, title: "MOMENTO Y FRECUENCIA", hint: "¿Cuándo y cuánto se repite?", color: C.cyan },
    { x: 4.24, y: 3.08, w: 3.62, title: "ACTORES INVOLUCRADOS", hint: "¿Quiénes interactúan?", color: C.gold },
    { x: 8.06, y: 3.08, w: 3.72, title: "PERSONAS O GRUPOS AFECTADOS", hint: "¿Quiénes reciben consecuencias?", color: C.green },
  ];
  fields.forEach((field) => {
    slide.addShape(SH.roundRect, {
      x: field.x,
      y: field.y,
      w: field.w,
      h: 0.9,
      rectRadius: 0.04,
      fill: { color: C.white },
      line: { color: field.color, pt: 1.15 },
    });
    slide.addText(field.title, {
      x: field.x + 0.2,
      y: field.y + 0.16,
      w: field.w - 0.4,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.8,
      bold: true,
      color: field.color === C.gold ? C.navy : field.color,
      margin: 0,
    });
    slide.addText(field.hint, {
      x: field.x + 0.2,
      y: field.y + 0.48,
      w: field.w - 0.4,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.4,
      bold: true,
      color: C.ink,
      margin: 0,
    });
  });

  slide.addText("CONDICIONES QUE PODRÍAN INFLUIR", {
    x: 4.26,
    y: 4.28,
    w: 3.6,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  const conditions = [
    { label: "HÁBITOS", x: 4.24, w: 1.42, color: C.red },
    { label: "INFORMACIÓN", x: 5.78, w: 1.48, color: C.cyan },
    { label: "INFRAESTRUCTURA", x: 7.38, w: 1.78, color: C.gold },
    { label: "ORGANIZACIÓN", x: 9.28, w: 1.48, color: C.green },
    { label: "NORMAS", x: 10.88, w: 1.42, color: C.red },
  ];
  conditions.forEach((condition, index) => {
    pill(slide, condition.label, condition.x, 4.66, condition.w, {
      fill: index % 2 === 0 ? C.softBlue : C.white,
      line: condition.color,
      color: C.navy,
      fontSize: condition.label.length > 12 ? 7.7 : 8.8,
      h: 0.36,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 4.22,
    y: 5.34,
    w: 8.18,
    h: 1.28,
    rectRadius: 0.05,
    fill: { color: C.white },
    line: { color: C.red, pt: 1.4 },
  });
  slide.addText("EN __________, DURANTE __________, OCURRE __________.", {
    x: 4.52,
    y: 5.58,
    w: 7.58,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.6,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("INVOLUCRA O AFECTA A __________ Y PODRÍA RELACIONARSE CON __________.", {
    x: 4.52,
    y: 6.02,
    w: 7.58,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.6,
    bold: true,
    color: C.red,
    margin: 0,
  });
  addFooter(slide, 11, "GeoGreen Escolar · Mentoría 1 · Bloque 2");
  addNotesAndValidate(
    slide,
    "Tiempo: 8 minutos de trabajo y hasta 2 minutos para escuchar una síntesis. Mantener esta diapositiva proyectada. Circular por las cinco mesas y pedir precisión cuando aparezcan palabras como nadie, todos, siempre o nunca. No completar la ficha por el equipo.",
  );
}

// 12 · Apertura Bloque 3
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });

  pill(slide, "BLOQUE 3 · 20 MINUTOS", 0.76, 0.52, 2.42, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 10,
  });
  slide.addText("Lo que sabemos\ny lo que suponemos", {
    x: 0.76,
    y: 1.3,
    w: 5.72,
    h: 1.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 34,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Validar es reconocer cuánto respaldo tiene cada afirmación.", {
    x: 0.78,
    y: 3.02,
    w: 5.5,
    h: 0.64,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17,
    bold: true,
    color: C.paleInk,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 0.78,
    y: 4.56,
    w: 5.52,
    h: 1.16,
    rectRadius: 0.05,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("Estar de acuerdo no reemplaza la evidencia.", {
    x: 1.1,
    y: 4.91,
    w: 4.88,
    h: 0.4,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.line, {
    x: 8.3,
    y: 1.74,
    w: 0,
    h: 3.94,
    line: { color: "52759A", pt: 2 },
  });
  const certaintyPath = [
    { y: 1.54, n: "01", title: "LO QUE OBSERVAMOS", cue: "hecho o antecedente", color: C.green },
    { y: 3.12, n: "02", title: "LO QUE EXPLICAMOS", cue: "interpretación o hipótesis", color: C.gold },
    { y: 4.7, n: "03", title: "LO QUE ASUMIMOS", cue: "supuesto o generalización", color: C.red },
  ];
  certaintyPath.forEach((item) => {
    slide.addShape(SH.ellipse, {
      x: 7.75,
      y: item.y,
      w: 1.1,
      h: 1.1,
      fill: { color: item.color },
      line: { color: item.color },
    });
    slide.addText(item.n, {
      x: 7.75,
      y: item.y + 0.36,
      w: 1.1,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13,
      bold: true,
      color: item.color === C.gold ? C.navyDeep : C.white,
      align: "center",
      margin: 0,
    });
    slide.addText(item.title, {
      x: 9.2,
      y: item.y + 0.14,
      w: 2.96,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.4,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(item.cue, {
      x: 9.2,
      y: item.y + 0.56,
      w: 2.86,
      h: 0.3,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.2,
      bold: true,
      color: C.paleInk,
      margin: 0,
    });
  });

  slide.addText("12", {
    x: 11.72,
    y: 7.05,
    w: 0.86,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color: C.paleInk,
    align: "right",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 20 segundos. Introducir el cambio de foco: el contexto ya está delimitado; ahora se revisará la calidad de las afirmaciones. Leer la frase central y aclarar que ajustar una idea es una señal de avance.",
  );
}

// 13 · Tres niveles de certeza
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Lectura crítica",
    "No todo lo que decimos tiene el mismo respaldo",
    "La diferencia está en el origen de la información y en cómo la comunicamos.",
    13,
  );

  const certaintyLevels = [
    {
      x: 0.78,
      y: 2.0,
      w: 11.72,
      n: "01",
      title: "OBSERVACIÓN O ANTECEDENTE",
      definition: "Fue visto, registrado, medido o informado por una fuente identificable.",
      example: "“Al finalizar dos recreos observamos residuos fuera del contenedor”.",
      color: C.green,
      fill: C.greenSoft,
    },
    {
      x: 1.18,
      y: 3.44,
      w: 11.32,
      n: "02",
      title: "INTERPRETACIÓN O HIPÓTESIS",
      definition: "Es una explicación posible construida desde lo observado.",
      example: "“La ubicación del contenedor podría dificultar su uso”.",
      color: C.gold,
      fill: "FBF3D9",
    },
    {
      x: 1.58,
      y: 4.88,
      w: 10.92,
      n: "03",
      title: "SUPUESTO O GENERALIZACIÓN",
      definition: "Se presenta como certeza sin antecedentes suficientes.",
      example: "“A nadie le interesa reciclar”.",
      color: C.red,
      fill: "FCEBEC",
    },
  ];
  certaintyLevels.forEach((level) => {
    slide.addShape(SH.roundRect, {
      x: level.x,
      y: level.y,
      w: level.w,
      h: 1.12,
      rectRadius: 0.05,
      fill: { color: level.fill },
      line: { color: level.color, pt: 1.2 },
    });
    numberBadge(slide, level.n, level.x + 0.2, level.y + 0.3, level.color, 0.52);
    slide.addText(level.title, {
      x: level.x + 0.92,
      y: level.y + 0.16,
      w: 2.78,
      h: 0.42,
      fontFace: TYPOGRAPHY.display,
      fontSize: level.title.length > 25 ? 11.6 : 13.2,
      bold: true,
      color: C.navy,
      valign: "mid",
      margin: 0,
    });
    slide.addText(level.definition, {
      x: level.x + 3.76,
      y: level.y + 0.16,
      w: 3.4,
      h: 0.72,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.1,
      bold: true,
      color: C.ink,
      valign: "mid",
      margin: 0,
    });
    slide.addText(level.example, {
      x: level.x + 7.32,
      y: level.y + 0.16,
      w: level.w - 7.62,
      h: 0.72,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.8,
      italic: true,
      color: C.slate,
      valign: "mid",
      margin: 0,
    });
  });

  slide.addText("Una hipótesis orienta la búsqueda. El error es presentarla como un hecho confirmado.", {
    x: 1.76,
    y: 6.36,
    w: 9.82,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.4,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 2 minutos. Leer las tres categorías de arriba hacia abajo. Destacar los verbos: observamos, podría y la generalización absoluta. Una hipótesis es útil cuando se declara como hipótesis y se transforma en una pregunta por contrastar.",
  );
}

// 14 · Semáforo de evidencia
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Semáforo de evidencia",
    "El color indica qué decisión tomar",
    "No evalúa al equipo: muestra cuánto respaldo existe hoy.",
    14,
  );

  slide.addShape(SH.roundRect, {
    x: 0.82,
    y: 2.02,
    w: 11.7,
    h: 2.26,
    rectRadius: 0.06,
    fill: { color: C.navyDeep },
    line: { color: C.navyDeep },
  });
  const signals = [
    {
      x: 1.26,
      color: C.green,
      status: "TENEMOS RESPALDO",
      cue: "Hay una fuente identificable.",
      action: "MANTENER",
      actionCue: "Anotar qué evidencia la sostiene.",
    },
    {
      x: 4.92,
      color: C.gold,
      status: "NECESITAMOS CONTRASTAR",
      cue: "Es una explicación posible.",
      action: "CONTRASTAR",
      actionCue: "Buscar otra fuente o perspectiva.",
    },
    {
      x: 8.58,
      color: C.red,
      status: "NO PODEMOS AFIRMARLO",
      cue: "Falta respaldo o generaliza.",
      action: "REFORMULAR",
      actionCue: "Describir solo lo que conocemos.",
    },
  ];
  signals.forEach((signal, index) => {
    slide.addShape(SH.ellipse, {
      x: signal.x,
      y: 2.5,
      w: 1.24,
      h: 1.24,
      fill: { color: signal.color },
      line: { color: signal.color },
      shadow: { type: "outer", color: "000000", opacity: 0.2, blur: 1, angle: 45, distance: 0.4 },
    });
    slide.addText(String(index + 1).padStart(2, "0"), {
      x: signal.x,
      y: 2.91,
      w: 1.24,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.5,
      bold: true,
      color: signal.color === C.gold ? C.navyDeep : C.white,
      align: "center",
      margin: 0,
    });
    slide.addText(signal.status, {
      x: signal.x + 1.48,
      y: 2.46,
      w: 1.78,
      h: 0.46,
      fontFace: TYPOGRAPHY.display,
      fontSize: signal.status.length > 21 ? 11.2 : 12.6,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(signal.cue, {
      x: signal.x + 1.48,
      y: 3.18,
      w: 1.82,
      h: 0.38,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      bold: true,
      color: C.paleInk,
      margin: 0,
    });
    slide.addShape(SH.roundRect, {
      x: signal.x,
      y: 4.7,
      w: 3.22,
      h: 1.28,
      rectRadius: 0.05,
      fill: { color: C.white },
      line: { color: signal.color, pt: 1.25 },
    });
    slide.addText(signal.action, {
      x: signal.x + 0.2,
      y: 4.94,
      w: 2.82,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15,
      bold: true,
      color: signal.color === C.gold ? C.navy : signal.color,
      align: "center",
      margin: 0,
    });
    slide.addText(signal.actionCue, {
      x: signal.x + 0.24,
      y: 5.36,
      w: 2.74,
      h: 0.36,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.4,
      bold: true,
      color: C.ink,
      align: "center",
      margin: 0,
    });
  });

  slide.addText("El estado puede cambiar cuando aparece nueva información.", {
    x: 2.4,
    y: 6.38,
    w: 8.54,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.6,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 2 minutos. Explicar que verde, amarillo y rojo describen el respaldo disponible, no la calidad del equipo ni su posición en la competencia. Reforzar que una afirmación amarilla puede convertirse en verde al obtener información suficiente.",
  );
}

// 15 · Triangulación y resguardo ético
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Contraste responsable",
    "Una fuente aporta; dos perspectivas permiten contrastar",
    "Si la información falta, se registra. No se inventa.",
    15,
  );

  const sourceNodes = [
    { x: 0.82, y: 2.16, w: 2.34, title: "OBSERVACIÓN DIRECTA", cue: "Lo visto en el espacio", color: C.green },
    { x: 4.92, y: 2.16, w: 2.34, title: "FICHA O REGISTRO", cue: "Lo documentado", color: C.cyan },
    { x: 0.82, y: 5.02, w: 2.34, title: "VOZ DE LA COMUNIDAD", cue: "Otra perspectiva", color: C.gold },
    { x: 4.92, y: 5.02, w: 2.34, title: "INFORMACIÓN INSTITUCIONAL", cue: "Normas o datos disponibles", color: C.red },
  ];
  slide.addText("CONTRASTAR", {
    x: 3.16,
    y: 3.1,
    w: 1.44,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.8,
    bold: true,
    charSpacing: 1.1,
    color: C.red,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.ellipse, {
    x: 3.08,
    y: 3.3,
    w: 1.6,
    h: 1.6,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("AFIRMACIÓN\nA REVISAR", {
    x: 3.23,
    y: 3.79,
    w: 1.3,
    h: 0.48,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.4,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  sourceNodes.forEach((node) => {
    slide.addShape(SH.roundRect, {
      x: node.x,
      y: node.y,
      w: node.w,
      h: 0.94,
      rectRadius: 0.05,
      fill: { color: C.white },
      line: { color: node.color, pt: 1.2 },
    });
    slide.addText(node.title, {
      x: node.x + 0.16,
      y: node.y + 0.15,
      w: node.w - 0.32,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: node.title.length > 22 ? 9.2 : 10.2,
      bold: true,
      color: node.color === C.gold ? C.navy : node.color,
      align: "center",
      margin: 0,
    });
    slide.addText(node.cue, {
      x: node.x + 0.16,
      y: node.y + 0.52,
      w: node.w - 0.32,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.4,
      bold: true,
      color: C.ink,
      align: "center",
      margin: 0,
    });
  });
  slide.addText("Comparen al menos dos fuentes disponibles.", {
    x: 1.1,
    y: 6.24,
    w: 5.88,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.4,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 8.06,
    y: 2.04,
    w: 4.44,
    h: 4.52,
    rectRadius: 0.06,
    fill: { color: C.navyDeep },
    line: { color: C.navyDeep },
  });
  pill(slide, "CUIDADO ÉTICO", 8.42, 2.38, 1.82, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 9.8,
  });
  slide.addText("La calidad también depende de cómo obtenemos y comunicamos la información.", {
    x: 8.44,
    y: 3.02,
    w: 3.68,
    h: 0.72,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.2,
    bold: true,
    color: C.white,
    margin: 0,
  });
  const ethics = [
    "Sin nombres ni datos personales innecesarios",
    "Sin fotografías de personas sin autorización",
    "Sin atribuir una conducta a un grupo completo",
    "Describir sin ridiculizar ni estigmatizar",
  ];
  ethics.forEach((item, index) => {
    numberBadge(slide, String(index + 1).padStart(2, "0"), 8.44, 4.0 + index * 0.56, index === 1 ? C.cyan : C.red, 0.38);
    slide.addText(item, {
      x: 9.04,
      y: 4.04 + index * 0.56,
      w: 3.0,
      h: 0.28,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.1,
      bold: true,
      color: C.paleInk,
      margin: 0,
    });
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 2 minutos. Presentar la triangulación como contraste entre fuentes disponibles. No exigir una segunda fuente inexistente: el equipo debe registrar qué falta y cómo podría obtenerlo. Recordar brevemente los cuatro resguardos éticos antes de iniciar la actividad.",
  );
}

// 16 · Actividad: matriz de validación
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  addInstitutionalLockup(slide);

  slide.addShape(SH.roundRect, {
    x: 0.62,
    y: 0.54,
    w: 3.18,
    h: 6.3,
    rectRadius: 0.06,
    fill: { color: C.navyDeep },
    line: { color: C.navyDeep },
  });
  pill(slide, "TRABAJO POR EQUIPOS", 0.94, 0.9, 2.54, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 9.8,
  });
  slide.addText("12:00", {
    x: 0.9,
    y: 1.52,
    w: 2.62,
    h: 0.86,
    fontFace: TYPOGRAPHY.display,
    fontSize: 41,
    bold: true,
    color: C.gold,
    align: "center",
    margin: 0,
  });
  slide.addText("MATRIZ DE\nVALIDACIÓN", {
    x: 0.98,
    y: 2.68,
    w: 2.46,
    h: 0.76,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  const workSteps = ["Elijan 3 afirmaciones", "Marquen el estado", "Anoten la fuente", "Decidan qué sigue"];
  workSteps.forEach((step, index) => {
    numberBadge(slide, String(index + 1).padStart(2, "0"), 0.98, 3.82 + index * 0.52, index === 2 ? C.cyan : C.red, 0.36);
    slide.addText(step, {
      x: 1.5,
      y: 3.86 + index * 0.52,
      w: 1.88,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.8,
      bold: true,
      color: C.paleInk,
      margin: 0,
    });
  });

  slide.addText("Revisen lo que afirman, no lo que desean demostrar", {
    x: 4.22,
    y: 0.7,
    w: 6.92,
    h: 0.48,
    fontFace: TYPOGRAPHY.display,
    fontSize: 24,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Trabajen desde el mapa situado y los antecedentes disponibles.", {
    x: 4.24,
    y: 1.32,
    w: 6.86,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.2,
    color: C.slate,
    margin: 0,
  });

  const tableX = 4.22;
  const widths = [3.02, 1.24, 1.72, 2.16];
  const headers = ["AFIRMACIÓN", "ESTADO", "FUENTE", "QUÉ FALTA O DECIDIMOS"];
  let hx = tableX;
  headers.forEach((header, index) => {
    slide.addShape(SH.rect, {
      x: hx,
      y: 1.96,
      w: widths[index],
      h: 0.48,
      fill: { color: index === 0 ? C.navy : C.softBlue },
      line: { color: C.border, pt: 1 },
    });
    slide.addText(header, {
      x: hx + 0.08,
      y: 2.1,
      w: widths[index] - 0.16,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: header.length > 14 ? 8.5 : 9.4,
      bold: true,
      color: index === 0 ? C.white : C.navy,
      align: "center",
      margin: 0,
    });
    hx += widths[index];
  });
  for (let row = 0; row < 3; row += 1) {
    const rowY = 2.44 + row * 1.04;
    let cellX = tableX;
    widths.forEach((width, index) => {
      slide.addShape(SH.rect, {
        x: cellX,
        y: rowY,
        w: width,
        h: 1.04,
        fill: { color: C.white },
        line: { color: C.border, pt: 1 },
      });
      if (index === 0) {
        slide.addText(`0${row + 1}  Escriban una afirmación central`, {
          x: cellX + 0.14,
          y: rowY + 0.38,
          w: width - 0.28,
          h: 0.24,
          fontFace: TYPOGRAPHY.body,
          fontSize: 11.2,
          bold: true,
          color: C.slate,
          margin: 0,
        });
      } else if (index === 1) {
        [C.green, C.gold, C.red].forEach((color, dotIndex) => {
          slide.addShape(SH.ellipse, {
            x: cellX + 0.14 + dotIndex * 0.34,
            y: rowY + 0.38,
            w: 0.24,
            h: 0.24,
            fill: { color: C.white, transparency: 100 },
            line: { color, pt: 1.6 },
          });
        });
      } else {
        slide.addText(index === 2 ? "¿Qué la respalda?" : "Mantener · contrastar · reformular", {
          x: cellX + 0.12,
          y: rowY + 0.34,
          w: width - 0.24,
          h: 0.3,
          fontFace: TYPOGRAPHY.body,
          fontSize: index === 2 ? 10.4 : 9.6,
          bold: true,
          color: C.slate,
          align: "center",
          margin: 0,
        });
      }
      cellX += width;
    });
  }

  slide.addShape(SH.roundRect, {
    x: 4.22,
    y: 5.84,
    w: 8.14,
    h: 0.76,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("SALIDA: una afirmación sostenible · una hipótesis por contrastar · una generalización reformulada", {
    x: 4.52,
    y: 6.08,
    w: 7.54,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.8,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 16, "GeoGreen Escolar · Mentoría 1 · Bloque 3");
  addNotesAndValidate(
    slide,
    "Tiempo: 12 minutos de trabajo y hasta 90 segundos de comprobación. Mantener esta diapositiva proyectada. Realizar una ronda por las cinco mesas con la secuencia: cómo lo saben, qué tipo de información es, qué otra fuente ayudaría y qué decisión toma el equipo. Escuchar al final una afirmación verde y una amarilla.",
  );
}

// 17 · Apertura Bloque 4
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });

  pill(slide, "BLOQUE 4 · 12 MINUTOS", 0.76, 0.52, 2.42, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 10,
  });
  slide.addText("¿La idea responde\nal problema validado?", {
    x: 0.76,
    y: 1.28,
    w: 5.78,
    h: 1.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 33,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Ahora comprobamos la pertinencia social de la propuesta.", {
    x: 0.78,
    y: 3.1,
    w: 5.46,
    h: 0.58,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17,
    bold: true,
    color: C.paleInk,
    margin: 0,
  });
  slide.addText("No se trata de agregar más tecnología, sino de explicar con claridad qué aporta.", {
    x: 0.78,
    y: 4.36,
    w: 5.42,
    h: 0.8,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.gold,
    margin: 0,
  });

  const bridgeCards = [
    {
      x: 6.86,
      title: "PROBLEMA VALIDADO",
      color: C.cyan,
      items: ["situado", "respaldado", "sin generalizaciones"],
    },
    {
      x: 10.08,
      title: "APORTE DE LA IDEA",
      color: C.green,
      items: ["con propósito", "útil para alguien", "con alcance realista"],
    },
  ];
  bridgeCards.forEach((card, cardIndex) => {
    slide.addShape(SH.roundRect, {
      x: card.x,
      y: 1.7,
      w: 2.48,
      h: 3.18,
      rectRadius: 0.06,
      fill: { color: "12385E" },
      line: { color: card.color, pt: 1.4 },
    });
    numberBadge(slide, `0${cardIndex + 1}`, card.x + 0.22, 1.96, card.color, 0.52);
    slide.addText(card.title, {
      x: card.x + 0.2,
      y: 2.66,
      w: 2.08,
      h: 0.42,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
    card.items.forEach((item, index) => {
      slide.addShape(SH.ellipse, {
        x: card.x + 0.34,
        y: 3.36 + index * 0.42,
        w: 0.18,
        h: 0.18,
        fill: { color: card.color },
        line: { color: card.color },
      });
      slide.addText(item, {
        x: card.x + 0.66,
        y: 3.32 + index * 0.42,
        w: 1.5,
        h: 0.24,
        fontFace: TYPOGRAPHY.body,
        fontSize: 11.1,
        bold: true,
        color: C.paleInk,
        margin: 0,
      });
    });
  });
  slide.addShape(SH.chevron, {
    x: 9.52,
    y: 2.92,
    w: 0.38,
    h: 0.54,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addShape(SH.roundRect, {
    x: 6.86,
    y: 5.34,
    w: 5.7,
    h: 1.18,
    rectRadius: 0.05,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("Si funcionara como esperan, ¿qué parte concreta del problema cambiaría y para quién?", {
    x: 7.18,
    y: 5.63,
    w: 5.06,
    h: 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.4,
    bold: true,
    color: C.navyDeep,
    align: "center",
    valign: "mid",
    margin: 0,
  });

  slide.addText("17", {
    x: 11.72,
    y: 7.05,
    w: 0.86,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color: C.paleInk,
    align: "right",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 30 segundos. Introducir la revisión de pertinencia social. En esta mentoría no se evalúan circuitos, programación ni componentes. Leer la pregunta central y pedir que cada equipo la mantenga presente durante la revisión.",
  );
}

// 18 · Cinco criterios de pertinencia
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Pertinencia social",
    "Una respuesta útil declara qué puede aportar",
    "La propuesta se revisa desde el problema validado y las personas relacionadas.",
    18,
  );

  slide.addShape(SH.roundRect, {
    x: 0.74,
    y: 2.02,
    w: 3.76,
    h: 4.62,
    rectRadius: 0.06,
    fill: { color: C.navyDeep },
    line: { color: C.navyDeep },
  });
  pill(slide, "PREGUNTA CENTRAL", 1.08, 2.38, 2.02, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 9.4,
  });
  slide.addText("¿Qué cambio concreto busca facilitar y quién podría beneficiarse?", {
    x: 1.08,
    y: 3.08,
    w: 3.0,
    h: 1.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Una idea puede:", {
    x: 1.08,
    y: 4.62,
    w: 2.96,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  const contributionVerbs = ["OBSERVAR", "PREVENIR", "INFORMAR", "MEJORAR"];
  contributionVerbs.forEach((verb, index) => {
    pill(slide, verb, 1.08 + (index % 2) * 1.46, 5.08 + Math.floor(index / 2) * 0.62, 1.28, {
      fill: index === 1 ? C.cyan : "12385E",
      line: index === 1 ? C.cyan : C.gold,
      color: index === 1 ? C.navyDeep : C.white,
      fontSize: 9.4,
      h: 0.4,
    });
  });

  const criteria = [
    { n: "01", title: "PERTINENCIA", question: "¿Responde al problema que validaron?", color: C.red },
    { n: "02", title: "COHERENCIA", question: "¿Se entiende qué parte busca cambiar?", color: C.cyan },
    { n: "03", title: "UTILIDAD SOCIAL", question: "¿Quién usaría el resultado, información o alerta?", color: C.gold },
    { n: "04", title: "ALCANCE", question: "¿Describe un aporte realista sin prometer resolver todo?", color: C.green },
    { n: "05", title: "RESPETO POR EL CONTEXTO", question: "¿Considera a las personas sin culpabilizar ni excluir?", color: C.red },
  ];
  criteria.forEach((criterion, index) => {
    const y = 2.02 + index * 0.91;
    const x = 4.92 + index * 0.16;
    const w = 7.42 - index * 0.16;
    slide.addShape(SH.roundRect, {
      x,
      y,
      w,
      h: 0.72,
      rectRadius: 0.04,
      fill: { color: index % 2 === 0 ? C.white : C.softBlue },
      line: { color: criterion.color, pt: 1.05 },
    });
    numberBadge(slide, criterion.n, x + 0.16, y + 0.17, criterion.color, 0.38);
    slide.addText(criterion.title, {
      x: x + 0.74,
      y: y + 0.15,
      w: 1.88,
      h: 0.2,
      fontFace: TYPOGRAPHY.display,
      fontSize: criterion.title.length > 18 ? 9.4 : 11.2,
      bold: true,
      color: criterion.color === C.gold ? C.navy : criterion.color,
      margin: 0,
    });
    slide.addText(criterion.question, {
      x: x + 2.78,
      y: y + 0.13,
      w: w - 3.02,
      h: 0.38,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      bold: true,
      color: C.ink,
      valign: "mid",
      margin: 0,
    });
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 2 minutos. Recorrer los cinco criterios con rapidez. Aclarar que una solución tecnológica puede informar, advertir, facilitar una decisión o apoyar una práctica; no reemplaza por sí sola la participación y coordinación que el problema pueda requerir.",
  );
}

// 19 · Actividad: ficha final y declaración
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  addInstitutionalLockup(slide);

  slide.addShape(SH.roundRect, {
    x: 0.62,
    y: 0.54,
    w: 3.18,
    h: 6.3,
    rectRadius: 0.06,
    fill: { color: C.navyDeep },
    line: { color: C.navyDeep },
  });
  pill(slide, "ENTREGABLE OBLIGATORIO", 0.9, 0.9, 2.62, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 9.2,
  });
  slide.addText("09:30", {
    x: 0.9,
    y: 1.54,
    w: 2.62,
    h: 0.86,
    fontFace: TYPOGRAPHY.display,
    fontSize: 41,
    bold: true,
    color: C.gold,
    align: "center",
    margin: 0,
  });
  slide.addText("FICHA FINAL DE\nVALIDACIÓN", {
    x: 0.96,
    y: 2.72,
    w: 2.5,
    h: 0.76,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("07:00 · completar ficha\n02:30 · declaraciones", {
    x: 1.04,
    y: 3.8,
    w: 2.34,
    h: 0.58,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.2,
    bold: true,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  pill(slide, "30 SEGUNDOS POR EQUIPO", 0.98, 5.62, 2.46, {
    fill: C.cyan,
    line: C.cyan,
    color: C.navyDeep,
    fontSize: 8.8,
  });

  slide.addText("Conviertan lo validado en una decisión clara", {
    x: 4.2,
    y: 0.7,
    w: 6.9,
    h: 0.48,
    fontFace: TYPOGRAPHY.display,
    fontSize: 25,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Completen la ficha y preparen una declaración breve.", {
    x: 4.22,
    y: 1.32,
    w: 6.78,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.2,
    color: C.slate,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 4.18,
    y: 1.82,
    w: 8.16,
    h: 4.22,
    rectRadius: 0.05,
    fill: { color: C.white },
    line: { color: C.border, pt: 1.2 },
  });
  slide.addText("PROBLEMA VALIDADO", {
    x: 4.48,
    y: 2.08,
    w: 2.28,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText("En __________, ocurre __________, afecta o involucra a __________ y sabemos que ocurre porque __________.", {
    x: 4.48,
    y: 2.42,
    w: 7.56,
    h: 0.5,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.8,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addShape(SH.line, {
    x: 4.48,
    y: 3.04,
    w: 7.56,
    h: 0,
    line: { color: C.border, pt: 1 },
  });
  const validationFields = [
    { x: 4.48, y: 3.28, title: "CONSECUENCIA OBSERVABLE", hint: "¿Qué efecto produce?", color: C.red },
    { x: 8.34, y: 3.28, title: "HIPÓTESIS PENDIENTE", hint: "¿Qué falta contrastar?", color: C.gold },
    { x: 4.48, y: 4.12, title: "APORTE DE LA IDEA", hint: "¿Qué busca observar, prevenir, informar o mejorar?", color: C.cyan },
    { x: 8.34, y: 4.12, title: "LÍMITE ACTUAL", hint: "¿Qué queda fuera de su alcance?", color: C.green },
    { x: 4.48, y: 4.96, title: "PRÓXIMO PASO VERIFICABLE", hint: "¿Qué avance podrán demostrar?", color: C.red, wide: true },
  ];
  validationFields.forEach((field) => {
    const fieldW = field.wide ? 7.56 : 3.58;
    slide.addShape(SH.roundRect, {
      x: field.x,
      y: field.y,
      w: fieldW,
      h: 0.66,
      rectRadius: 0.03,
      fill: { color: field.color === C.gold ? "FBF3D9" : C.paper },
      line: { color: field.color, pt: 1 },
    });
    slide.addText(field.title, {
      x: field.x + 0.14,
      y: field.y + 0.1,
      w: fieldW - 0.28,
      h: 0.17,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.6,
      bold: true,
      color: field.color === C.gold ? C.navy : field.color,
      margin: 0,
    });
    slide.addText(field.hint, {
      x: field.x + 0.14,
      y: field.y + 0.36,
      w: fieldW - 0.28,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: field.hint.length > 38 ? 9.4 : 10.3,
      bold: true,
      color: C.ink,
      margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 4.18,
    y: 6.2,
    w: 8.16,
    h: 0.58,
    rectRadius: 0.04,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("“Nuestro problema ocurre en… Sabemos que ocurre porque… Nuestra idea aporta mediante… Antes de la Mentoría 2 necesitamos…”", {
    x: 4.46,
    y: 6.36,
    w: 7.6,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 10.7,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 19, "GeoGreen Escolar · Mentoría 1 · Bloque 4");
  addNotesAndValidate(
    slide,
    "Tiempo: 7 minutos para completar la ficha y 2 minutos 30 segundos para las cinco declaraciones. Mantener esta diapositiva proyectada. La persona responsable de Comunicación presenta en un máximo de 30 segundos. Verificar problema, evidencia, aporte y próximo paso; no abrir aquí una evaluación técnica.",
  );
}

// 20 · Cierre y continuidad
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });

  pill(slide, "CIERRE · 3 MINUTOS", 0.76, 0.52, 1.98, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 9.8,
  });
  slide.addText("El problema validado abre la siguiente etapa", {
    x: 0.76,
    y: 1.12,
    w: 9.82,
    h: 0.54,
    fontFace: TYPOGRAPHY.display,
    fontSize: 29,
    bold: true,
    color: C.white,
    margin: 0,
  });
  const learningChips = [
    { label: "SITUADO", x: 0.78, color: C.cyan },
    { label: "RESPALDADO", x: 2.44, color: C.gold },
    { label: "PERTINENTE", x: 4.38, color: C.green },
  ];
  learningChips.forEach((chip) => {
    pill(slide, chip.label, chip.x, 1.86, 1.52, {
      fill: "12385E",
      line: chip.color,
      color: C.white,
      fontSize: 9.4,
      h: 0.4,
    });
  });

  const continuity = [
    {
      x: 0.78,
      label: "MENTORÍA 1",
      title: "Problema validado\n+ contexto afectado",
      color: C.cyan,
    },
    {
      x: 4.82,
      label: "ENTRE SESIONES",
      title: "Próximo paso\nverificable",
      color: C.gold,
    },
    {
      x: 8.86,
      label: "MENTORÍA 2",
      title: "Solución + componentes,\nmateriales o recursos",
      color: C.green,
    },
  ];
  continuity.forEach((stage, index) => {
    slide.addShape(SH.roundRect, {
      x: stage.x,
      y: 2.62,
      w: 3.18,
      h: 1.36,
      rectRadius: 0.05,
      fill: { color: "12385E" },
      line: { color: stage.color, pt: 1.3 },
    });
    slide.addText(stage.label, {
      x: stage.x + 0.22,
      y: 2.88,
      w: 2.74,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
      bold: true,
      color: stage.color,
      align: "center",
      margin: 0,
    });
    slide.addText(stage.title, {
      x: stage.x + 0.22,
      y: 3.28,
      w: 2.74,
      h: 0.42,
      fontFace: TYPOGRAPHY.display,
      fontSize: index === 2 ? 12.2 : 14,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
    if (index < 2) {
      slide.addShape(SH.chevron, {
        x: stage.x + 3.44,
        y: 3.04,
        w: 0.42,
        h: 0.48,
        fill: { color: C.red },
        line: { color: C.red },
      });
    }
  });

  slide.addShape(SH.roundRect, {
    x: 0.78,
    y: 4.52,
    w: 11.26,
    h: 1.4,
    rectRadius: 0.05,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("VALIDAMOS QUE ________________________________________________.", {
    x: 1.14,
    y: 4.86,
    w: 10.54,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.4,
    bold: true,
    color: C.navyDeep,
    margin: 0,
  });
  slide.addText("ANTES DE LA MENTORÍA 2 AVANZAREMOS EN ____________________________.", {
    x: 1.14,
    y: 5.34,
    w: 10.54,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.2,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText("Cada equipo conserva: entregables de talleres · mapa situado · matriz de evidencia · ficha final · próximo paso", {
    x: 1.0,
    y: 6.38,
    w: 10.82,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.8,
    bold: true,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  slide.addText("20", {
    x: 11.72,
    y: 7.05,
    w: 0.86,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color: C.paleInk,
    align: "right",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Tiempo: 3 minutos. Recuperar las tres ideas: problema situado, información respaldada y respuesta pertinente. Cada equipo completa las dos frases, conserva los cinco productos obligatorios y deja registrado su próximo paso. Reforzar que el trabajo continúa entre sesiones y será revisado en la Mentoría 2.",
  );
}

(async () => {
  await pptx.writeFile({ fileName: outputPptx });
  console.log(`PPTX generado: ${outputPptx}`);
  console.log(`Diapositivas: ${pptx._slides.length}`);
})();
