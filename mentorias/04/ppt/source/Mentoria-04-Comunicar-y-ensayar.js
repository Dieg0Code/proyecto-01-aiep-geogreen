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
const { components } = slidesSystem;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
applyAiepTheme(pptx, {
  author: "GeoGreen Escolar Osorno",
  company: "AIEP Osorno",
  subject: "Mentoría 4 - Comunicar la propuesta y ensayar el pitch",
  title: "Mentoría 4 - Comunicar para que la idea avance",
});

const SH = pptx.ShapeType;
const W = 13.333;
const H = 7.5;
const rootDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "../../../..");
const outputPptx = path.join(rootDir, "Mentoria-04-Comunicar-y-ensayar.pptx");

const C = {
  navy: "082B5C",
  navyDeep: "031D3B",
  blue: "1D4E89",
  cyan: "35B7C6",
  cyanSoft: "DDF4F6",
  red: "D62027",
  redSoft: "F8E4E5",
  paper: "F5F2EC",
  white: "FFFFFF",
  ink: "182B3A",
  slate: "5F6B7A",
  border: "D8DEE6",
  softBlue: "E9EEF4",
  softNeutral: "EEF3EF",
  gold: "E0BC5A",
  goldSoft: "FBF3DE",
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
    rootDir,
    "source",
    "assets",
    "images",
    "portada-estudiantes-ensayo-pitch-geogreen.png",
  ),
  prototype: path.join(
    repoRoot,
    "talleres",
    "03",
    "media",
    "fotos",
    "prototipo-oled-geogreen-landscape.png",
  ),
  systemFlow: path.join(
    repoRoot,
    "talleres",
    "03",
    "media",
    "generadas",
    "sistema-geogreen-sensor-dato-respuesta.png",
  ),
};

function addImageCrop(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({ path: imagePath, ...imageSizingCrop(imagePath, x, y, w, h), ...opts });
}

function addImageContain(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({ path: imagePath, ...imageSizingContain(imagePath, x, y, w, h), ...opts });
}

function addTopBars(slide, colors = [C.red, C.cyan, C.gold]) {
  const widths = [0.72, 0.42, 0.22];
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
  const x = opts.x ?? 11.43;
  const y = opts.y ?? 0.24;
  const w = opts.w ?? 1.52;
  const h = opts.h ?? 0.96;
  if (opts.panel) {
    slide.addShape(SH.roundRect, {
      x: x - 0.12,
      y: y - 0.08,
      w: w + 0.24,
      h: h + 0.16,
      rectRadius: 0.04,
      fill: { color: opts.panelFill ?? C.white, transparency: opts.panelTransparency ?? 6 },
      line: { color: opts.panelLine ?? C.white, transparency: 100 },
    });
  }
  addImageContain(slide, opts.white ? IMG.lockupW : IMG.lockup, x, y, w, h);
}

function addFooter(slide, number, opts = {}) {
  const color = opts.white ? C.paleInk : C.slate;
  slide.addText(opts.label ?? "GeoGreen Escolar · Mentoría 4", {
    x: 0.72,
    y: 7.12,
    w: 5.8,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    color,
    margin: 0,
  });
  slide.addText(String(number).padStart(2, "0"), {
    x: 11.72,
    y: 7.03,
    w: 0.86,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color,
    align: "right",
    margin: 0,
  });
}

function addHeader(slide, kicker, title, subtitle, number, opts = {}) {
  slide.background = { color: opts.background ?? C.paper };
  addTopBars(slide, opts.bars);
  slide.addText(kicker.toUpperCase(), {
    x: 0.72,
    y: 0.36,
    w: 5.6,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    bold: true,
    charSpacing: 1.3,
    color: opts.kickerColor ?? C.red,
    margin: 0,
  });
  slide.addText(title, {
    x: 0.72,
    y: 0.7,
    w: opts.titleW ?? 10.1,
    h: opts.titleH ?? 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.titleFontSize ?? 27,
    bold: true,
    color: opts.titleColor ?? C.navy,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.74,
      y: opts.subtitleY ?? 1.32,
      w: opts.subtitleW ?? 9.9,
      h: opts.subtitleH ?? 0.36,
      fontFace: TYPOGRAPHY.body,
      fontSize: opts.subtitleFontSize ?? 15,
      color: opts.subtitleColor ?? C.slate,
      margin: 0,
    });
  }
  addInstitutionalLockup(slide, { white: opts.whiteLockup });
  addFooter(slide, number, { white: opts.whiteFooter });
}

function addNotesAndValidate(slide, opts = {}) {
  // Los solapamientos de fondos, conectores, fotografías y badges son intencionales.
  warnIfSlideHasOverlaps(slide, pptx, {
    muteContainment: true,
    ignoreLines: opts.ignoreLines ?? false,
    ignoreDecorativeShapes: opts.ignoreDecorativeShapes ?? false,
  });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

function addStepCircle(slide, x, y, number, color, label, body) {
  slide.addShape(SH.ellipse, {
    x,
    y,
    w: 0.74,
    h: 0.74,
    fill: { color },
    line: { color: C.white, pt: 1.4 },
  });
  slide.addText(String(number).padStart(2, "0"), {
    x,
    y: y + 0.2,
    w: 0.74,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.5,
    bold: true,
    color: color === C.gold ? C.navyDeep : C.white,
    align: "center",
    margin: 0,
  });
  slide.addText(label, {
    x: x - 0.36,
    y: y + 0.92,
    w: 1.46,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText(body, {
    x: x - 0.76,
    y: y + 1.28,
    w: 2.26,
    h: 0.64,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.4,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
}

// 01 · Portada
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.cover, 0, 0, W, H);
  addTopBars(slide);
  addInstitutionalLockup(slide, {
    white: true,
    panel: true,
    panelFill: C.navyDeep,
    panelTransparency: 8,
    panelLine: C.navyDeep,
    x: 11.36,
    y: 0.28,
    w: 1.56,
    h: 0.98,
  });
  slide.addText("GEOGREEN ESCOLAR · MENTORÍA 4", {
    x: 0.78,
    y: 0.68,
    w: 4.65,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.35,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Comunicar para que\nla idea avance", {
    x: 0.76,
    y: 1.34,
    w: 5.2,
    h: 1.45,
    fontFace: TYPOGRAPHY.display,
    fontSize: 35.5,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
  });
  slide.addShape(SH.rect, {
    x: 0.78,
    y: 3.06,
    w: 1.0,
    h: 0.08,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Guion · soporte visual · roles · ensayo", {
    x: 0.78,
    y: 3.42,
    w: 4.85,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 16,
    bold: true,
    color: C.paleInk,
    margin: 0,
  });
  slide.addText("Una propuesta crece cuando otras personas pueden comprenderla.", {
    x: 0.78,
    y: 4.18,
    w: 4.82,
    h: 0.78,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20.5,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  components.addPill(slide, SH, "LUN 28 SEP · 60 MIN", {
    x: 0.78,
    y: 6.28,
    w: 2.42,
    h: 0.42,
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 10.2,
  });
  slide.addText("AIEP Osorno · Instituto Comercial Liceo Bicentenario", {
    x: 3.48,
    y: 6.37,
    w: 3.94,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.5,
    color: C.paleInk,
    margin: 0,
  });
  addNotesAndValidate(slide);
}

// 02 · Misión de la mentoría
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("MISIÓN DE HOY", {
    x: 0.74,
    y: 0.48,
    w: 3.0,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11,
    bold: true,
    charSpacing: 1.5,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Transformar trabajo en una presentación que se entienda", {
    x: 0.74,
    y: 0.9,
    w: 10.25,
    h: 0.66,
    fontFace: TYPOGRAPHY.display,
    fontSize: 29,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("No comenzamos otra idea. Recuperamos, ordenamos, coordinamos y mejoramos la que el equipo ya construyó.", {
    x: 0.76,
    y: 1.68,
    w: 9.85,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.5,
    color: C.paleInk,
    margin: 0,
  });

  slide.addShape(SH.line, {
    x: 1.58,
    y: 3.08,
    w: 9.92,
    h: 0,
    line: { color: C.blue, pt: 3.2, transparency: 5 },
  });
  addStepCircle(slide, 1.2, 2.72, 1, C.red, "RECUPERAR", "Lo que ya sabemos y podemos mostrar.");
  addStepCircle(slide, 4.15, 2.72, 2, C.cyan, "ORDENAR", "Un relato que otra persona pueda seguir.");
  addStepCircle(slide, 7.1, 2.72, 3, C.gold, "COORDINAR", "Seis aportes, soporte y transiciones.");
  addStepCircle(slide, 10.05, 2.72, 4, C.green, "MEJORAR", "Ensayar, observar, ajustar y comprobar.");

  slide.addShape(SH.roundRect, {
    x: 1.36,
    y: 5.58,
    w: 10.6,
    h: 0.84,
    rectRadius: 0.04,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("SALIDA OBLIGATORIA", {
    x: 1.68,
    y: 5.78,
    w: 1.9,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    bold: true,
    charSpacing: 1.05,
    color: C.navyDeep,
    margin: 0,
  });
  slide.addText("Guion + soporte visual + seis roles y tiempos + una corrección comprobada", {
    x: 3.62,
    y: 5.72,
    w: 7.94,
    h: 0.3,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.5,
    bold: true,
    color: C.navyDeep,
    margin: 0,
  });
  addFooter(slide, 2, { white: true });
  addNotesAndValidate(slide);
}

// 03 · Mapa de la mentoría
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Ruta de 60 minutos",
    "Una hora, cinco movimientos",
    "Cada movimiento produce algo concreto y prepara el siguiente.",
    3,
  );

  const route = [
    { cx: 1.45, d: 0.86, min: "10", title: "RECUPERAR", body: "Historia + respaldo", color: C.red },
    { cx: 3.88, d: 0.98, min: "15", title: "CONSTRUIR", body: "Guion comprensible", color: C.cyan },
    { cx: 6.32, d: 0.94, min: "13", title: "COORDINAR", body: "Soporte + seis voces", color: C.gold },
    { cx: 8.87, d: 1.12, min: "19", title: "ENSAYAR", body: "Corregir + comprobar", color: C.green },
    { cx: 11.66, d: 0.72, min: "03", title: "CERRAR", body: "Versión preparada", color: C.navy },
  ];

  slide.addText("00:00", {
    x: 0.72,
    y: 2.2,
    w: 0.86,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.5,
    bold: true,
    color: C.slate,
    margin: 0,
  });
  slide.addText("01:00", {
    x: 11.42,
    y: 2.2,
    w: 0.86,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.5,
    bold: true,
    color: C.slate,
    align: "right",
    margin: 0,
  });
  slide.addShape(SH.line, {
    x: 1.45,
    y: 3.46,
    w: 10.21,
    h: 0,
    line: { color: C.softBlue, pt: 11, beginArrowType: "none", endArrowType: "triangle" },
  });

  route.forEach((item) => {
    const x = item.cx - item.d / 2;
    const textColor = item.color === C.gold ? C.navyDeep : C.white;
    slide.addText(item.title, {
      x: item.cx - 1.08,
      y: 2.5,
      w: 2.16,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.5,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addShape(SH.ellipse, {
      x,
      y: 3.46 - item.d / 2,
      w: item.d,
      h: item.d,
      fill: { color: item.color },
      line: { color: C.white, pt: 2 },
    });
    slide.addText(item.min, {
      x,
      y: 3.26,
      w: item.d,
      h: 0.29,
      fontFace: TYPOGRAPHY.display,
      fontSize: item.d < 0.8 ? 17 : 21,
      bold: true,
      color: textColor,
      align: "center",
      margin: 0,
    });
    slide.addText("min", {
      x,
      y: 3.62,
      w: item.d,
      h: 0.14,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.5,
      bold: true,
      color: textColor,
      align: "center",
      margin: 0,
    });
    slide.addText(item.body, {
      x: item.cx - 1.06,
      y: 4.18,
      w: 2.12,
      h: 0.48,
      fontFace: TYPOGRAPHY.body,
      fontSize: 13,
      bold: true,
      color: C.ink,
      align: "center",
      valign: "mid",
      margin: 0,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 1.06,
    y: 5.3,
    w: 11.2,
    h: 0.94,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addShape(SH.roundRect, {
    x: 1.24,
    y: 5.52,
    w: 1.72,
    h: 0.5,
    rectRadius: 0.04,
    fill: { color: C.green },
    line: { color: C.green },
  });
  slide.addText("TRAMO CLAVE", {
    x: 1.38,
    y: 5.68,
    w: 1.44,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 0.8,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("19 minutos para ensayar, observar y convertir una dificultad en una mejora comprobable.", {
    x: 3.26,
    y: 5.55,
    w: 8.45,
    h: 0.4,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16,
    bold: true,
    color: C.white,
    valign: "mid",
    margin: 0,
  });
  addNotesAndValidate(slide, { ignoreLines: true });
}

// 04 · Apertura Bloque 1
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addImageCrop(slide, IMG.prototype, 7.36, 0, 5.97, H);
  addInstitutionalLockup(slide, {
    white: true,
    panel: true,
    panelFill: C.navyDeep,
    panelTransparency: 10,
  });
  components.addPill(slide, SH, "BLOQUE 1 · 10 MINUTOS", {
    x: 0.76,
    y: 0.56,
    w: 2.72,
    h: 0.4,
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 10.8,
  });
  slide.addText("Antes de presentar,\nrecuperen su historia", {
    x: 0.76,
    y: 1.34,
    w: 5.7,
    h: 1.25,
    fontFace: TYPOGRAPHY.display,
    fontSize: 32,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("No parten de cero. Cada mentoría dejó una decisión, un producto o una evidencia que ahora debe entrar al relato.", {
    x: 0.8,
    y: 2.96,
    w: 5.42,
    h: 0.84,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.1,
    color: C.paleInk,
    margin: 0,
  });
  const chips = [
    { x: 0.8, text: "PROBLEMA", fill: C.red },
    { x: 2.66, text: "SOLUCIÓN", fill: C.cyan },
    { x: 4.52, text: "EVIDENCIA", fill: C.gold, color: C.navyDeep },
  ];
  chips.forEach((chip) => {
    components.addPill(slide, SH, chip.text, {
      x: chip.x,
      y: 4.48,
      w: 1.62,
      h: 0.42,
      fill: chip.fill,
      line: chip.fill,
      color: chip.color ?? C.white,
      fontSize: 11.2,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 0.8,
    y: 5.44,
    w: 5.45,
    h: 0.84,
    rectRadius: 0.04,
    fill: { color: C.darkPanel },
    line: { color: C.blue, pt: 1.2 },
  });
  slide.addText("La presentación no inventa valor: hace visible el proceso que el equipo puede respaldar.", {
    x: 1.08,
    y: 5.68,
    w: 4.9,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.4,
    bold: true,
    color: C.gold,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 4, { white: true });
  addNotesAndValidate(slide);
}

// 05 · Cadena de productos
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Trazabilidad del proyecto",
    "Tres productos entran. Una historia sale.",
    "La presentación conecta lo que el equipo ya investigó, decidió y puso a prueba.",
    5,
  );

  const stages = [
    {
      x: 0.72,
      badge: "M1",
      title: "PROBLEMA",
      body: "Situación + contexto",
      question: "¿Qué necesita cambiar?",
      fill: C.redSoft,
      accent: C.red,
    },
    {
      x: 3.22,
      badge: "M2",
      title: "SOLUCIÓN",
      body: "Respuesta + recursos",
      question: "¿Qué decidimos hacer?",
      fill: C.cyanSoft,
      accent: C.cyan,
    },
    {
      x: 5.72,
      badge: "M3",
      title: "EVIDENCIA",
      body: "Prueba + aprendizaje",
      question: "¿Qué podemos mostrar?",
      fill: C.goldSoft,
      accent: C.gold,
    },
  ];

  slide.addText("ENTRADAS", {
    x: 0.72,
    y: 1.88,
    w: 7.3,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    bold: true,
    charSpacing: 1.2,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  slide.addText("SALIDA", {
    x: 8.82,
    y: 1.88,
    w: 3.8,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    bold: true,
    charSpacing: 1.2,
    color: C.green,
    align: "center",
    margin: 0,
  });

  stages.forEach((stage) => {
    slide.addShape(SH.roundRect, {
      x: stage.x,
      y: 2.2,
      w: 2.28,
      h: 3.12,
      rectRadius: 0.04,
      fill: { color: stage.fill },
      line: { color: stage.accent, pt: 1.7 },
    });
    slide.addShape(SH.ellipse, {
      x: stage.x + 0.82,
      y: 2.43,
      w: 0.64,
      h: 0.64,
      fill: { color: stage.accent },
      line: { color: C.white, pt: 1.5 },
    });
    slide.addText(stage.badge, {
      x: stage.x + 0.82,
      y: 2.61,
      w: 0.64,
      h: 0.2,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.5,
      bold: true,
      color: stage.accent === C.gold ? C.navyDeep : C.white,
      align: "center",
      margin: 0,
    });
    slide.addText(stage.title, {
      x: stage.x + 0.18,
      y: 3.22,
      w: 1.92,
      h: 0.32,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16.5,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(stage.body, {
      x: stage.x + 0.18,
      y: 3.78,
      w: 1.92,
      h: 0.5,
      fontFace: TYPOGRAPHY.body,
      fontSize: 14,
      bold: true,
      color: C.ink,
      align: "center",
      valign: "mid",
      margin: 0,
    });
    slide.addShape(SH.line, {
      x: stage.x + 0.26,
      y: 4.42,
      w: 1.76,
      h: 0,
      line: { color: stage.accent, pt: 1.2, transparency: 25 },
    });
    slide.addText(stage.question, {
      x: stage.x + 0.18,
      y: 4.65,
      w: 1.92,
      h: 0.42,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.4,
      bold: true,
      italic: true,
      color: C.slate,
      align: "center",
      margin: 0,
    });
  });

  slide.addShape(SH.chevron, {
    x: 8.18,
    y: 3.16,
    w: 0.5,
    h: 1.1,
    fill: { color: C.green },
    line: { color: C.green },
  });
  slide.addShape(SH.roundRect, {
    x: 8.88,
    y: 2.2,
    w: 3.72,
    h: 3.12,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.green, pt: 2 },
  });
  components.addPill(slide, SH, "M4 · PITCH", {
    x: 9.18,
    y: 2.48,
    w: 1.44,
    h: 0.42,
    fill: C.green,
    line: C.green,
    color: C.white,
    fontSize: 11.5,
  });
  slide.addText("UNA HISTORIA\nQUE SE ENTIENDE", {
    x: 9.17,
    y: 3.16,
    w: 3.14,
    h: 0.72,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Guion + soporte visual\n+ seis voces + una corrección", {
    x: 9.18,
    y: 4.08,
    w: 3.04,
    h: 0.62,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15,
    bold: true,
    color: C.paleInk,
    margin: 0,
  });
  slide.addText("¿Cómo lo comprenderá otra persona?", {
    x: 9.18,
    y: 4.84,
    w: 3.04,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.8,
    bold: true,
    italic: true,
    color: C.gold,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 1.08,
    y: 5.72,
    w: 11.16,
    h: 0.76,
    rectRadius: 0.04,
    fill: { color: C.redSoft },
    line: { color: C.red },
  });
  slide.addText("SI FALTA RESPALDO: SE REGISTRA. NO SE INVENTA.", {
    x: 1.42,
    y: 5.96,
    w: 10.48,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { ignoreLines: true });
}

// 06 · Cuatro anclajes
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("ACTIVIDAD · INVENTARIO NARRATIVO", {
    x: 0.74,
    y: 0.46,
    w: 4.2,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    bold: true,
    charSpacing: 1.25,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Cuatro anclajes sostienen el pitch", {
    x: 0.74,
    y: 0.82,
    w: 8.2,
    h: 0.58,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Escriban una frase clara por anclaje utilizando solamente información que el equipo pueda explicar o respaldar.", {
    x: 0.76,
    y: 1.48,
    w: 9.5,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.2,
    color: C.paleInk,
    margin: 0,
  });

  const anchors = [
    {
      x: 0.76,
      y: 2.18,
      w: 3.56,
      h: 1.48,
      n: "01",
      title: "PROBLEMA Y CONTEXTO",
      body: "¿Qué ocurre, dónde ocurre y quiénes se relacionan con la situación?",
      accent: C.red,
    },
    {
      x: 8.0,
      y: 2.18,
      w: 4.56,
      h: 1.48,
      n: "02",
      title: "SOLUCIÓN PROPUESTA",
      body: "¿Qué propone el equipo y de qué manera responde al problema?",
      accent: C.cyan,
    },
    {
      x: 0.76,
      y: 4.46,
      w: 3.56,
      h: 1.48,
      n: "03",
      title: "EVIDENCIA",
      body: "¿Qué podemos mostrar para respaldar que la propuesta avanzó?",
      accent: C.gold,
    },
    {
      x: 8.0,
      y: 4.46,
      w: 4.56,
      h: 1.48,
      n: "04",
      title: "APRENDIZAJE O APORTE",
      body: "¿Qué comprendimos mejor y qué mejora busca favorecer la propuesta?",
      accent: C.green,
    },
  ];
  anchors.forEach((anchor) => {
    slide.addShape(SH.roundRect, {
      x: anchor.x,
      y: anchor.y,
      w: anchor.w,
      h: anchor.h,
      rectRadius: 0.04,
      fill: { color: C.darkPanel },
      line: { color: anchor.accent, pt: 1.25 },
    });
    slide.addShape(SH.ellipse, {
      x: anchor.x + 0.2,
      y: anchor.y + 0.25,
      w: 0.54,
      h: 0.54,
      fill: { color: anchor.accent },
      line: { color: anchor.accent },
    });
    slide.addText(anchor.n, {
      x: anchor.x + 0.2,
      y: anchor.y + 0.4,
      w: 0.54,
      h: 0.18,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.2,
      bold: true,
      color: anchor.accent === C.gold ? C.navyDeep : C.white,
      align: "center",
      margin: 0,
    });
    slide.addText(anchor.title, {
      x: anchor.x + 0.9,
      y: anchor.y + 0.28,
      w: anchor.w - 1.14,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: anchor.title.length > 20 ? 13.8 : 15.2,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(anchor.body, {
      x: anchor.x + 0.24,
      y: anchor.y + 0.84,
      w: anchor.w - 0.48,
      h: 0.5,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.4,
      color: C.paleInk,
      align: "center",
      margin: 0,
    });
  });

  slide.addShape(SH.ellipse, {
    x: 5.0,
    y: 2.84,
    w: 2.34,
    h: 2.34,
    fill: { color: C.gold },
    line: { color: C.white, pt: 1.7 },
  });
  slide.addText("HISTORIA\nDEL PROYECTO", {
    x: 5.24,
    y: 3.55,
    w: 1.86,
    h: 0.7,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17.5,
    bold: true,
    color: C.navyDeep,
    align: "center",
    valign: "mid",
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 1.28,
    y: 6.28,
    w: 10.75,
    h: 0.54,
    rectRadius: 0.04,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("6 MINUTOS · UNA FRASE POR ANCLAJE · SI NO HAY RESPALDO, ESCRIBAN “FALTA COMPROBAR”", {
    x: 1.58,
    y: 6.43,
    w: 10.15,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.3,
    bold: true,
    charSpacing: 0.45,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 6, { white: true });
  addNotesAndValidate(slide, { ignoreLines: true });
}

// 07 · Apertura Bloque 2
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  components.addPill(slide, SH, "BLOQUE 2 · 15 MINUTOS", {
    x: 0.76,
    y: 0.56,
    w: 2.72,
    h: 0.42,
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 10.8,
  });
  slide.addText("Una buena idea necesita\nun orden que se pueda seguir", {
    x: 0.76,
    y: 1.34,
    w: 6.18,
    h: 1.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 31,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("El guion decide qué necesita saber primero una persona que escucha la propuesta por primera vez.", {
    x: 0.8,
    y: 2.9,
    w: 5.86,
    h: 0.76,
    fontFace: TYPOGRAPHY.body,
    fontSize: 16,
    color: C.paleInk,
    margin: 0,
  });

  const openerSteps = [
    { y: 1.4, n: "01", label: "PROBLEMA", color: C.red, x: 7.72 },
    { y: 2.12, n: "02", label: "PERSONAS", color: C.cyan, x: 8.12 },
    { y: 2.84, n: "03", label: "SOLUCIÓN", color: C.gold, x: 8.52 },
    { y: 3.56, n: "04", label: "FUNCIÓN", color: C.green, x: 8.92 },
    { y: 4.28, n: "05", label: "EVIDENCIA", color: C.blue, x: 9.32 },
    { y: 5.0, n: "06", label: "APORTE", color: C.red, x: 9.72 },
  ];
  openerSteps.forEach((step) => {
    const textColor = step.color === C.gold ? C.navyDeep : C.white;
    slide.addShape(SH.roundRect, {
      x: step.x,
      y: step.y,
      w: 2.78,
      h: 0.54,
      rectRadius: 0.04,
      fill: { color: C.darkPanel },
      line: { color: step.color, pt: 1.5 },
    });
    slide.addShape(SH.ellipse, {
      x: step.x + 0.1,
      y: step.y + 0.07,
      w: 0.4,
      h: 0.4,
      fill: { color: step.color },
      line: { color: step.color },
    });
    slide.addText(step.n, {
      x: step.x + 0.1,
      y: step.y + 0.18,
      w: 0.4,
      h: 0.16,
      fontFace: TYPOGRAPHY.display,
      fontSize: 9.5,
      bold: true,
      color: textColor,
      align: "center",
      margin: 0,
    });
    slide.addText(step.label, {
      x: step.x + 0.66,
      y: step.y + 0.15,
      w: 1.86,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.8,
      bold: true,
      color: C.white,
      margin: 0,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 0.8,
    y: 5.18,
    w: 5.86,
    h: 1.02,
    rectRadius: 0.04,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("El pitch no es una lista de piezas.", {
    x: 1.12,
    y: 5.42,
    w: 5.2,
    h: 0.3,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });
  slide.addText("Es una historia donde cada parte prepara la siguiente.", {
    x: 1.12,
    y: 5.78,
    w: 5.2,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.5,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 7, { white: true });
  addNotesAndValidate(slide);
}

// 08 · Recorrido narrativo
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Recorrido del pitch",
    "Cada parte prepara la siguiente",
    "El orden permite comprender por qué existe la propuesta antes de conocer sus detalles.",
    8,
  );

  const story = [
    { cx: 1.32, n: "01", title: "PROBLEMA", prompt: "¿Qué ocurre?", color: C.red },
    { cx: 3.43, n: "02", title: "PERSONAS", prompt: "¿A quiénes implica?", color: C.cyan },
    { cx: 5.54, n: "03", title: "SOLUCIÓN", prompt: "¿Qué proponemos?", color: C.gold },
    { cx: 7.65, n: "04", title: "FUNCIÓN", prompt: "¿Qué hace?", color: C.green },
    { cx: 9.76, n: "05", title: "EVIDENCIA", prompt: "¿Qué mostramos?", color: C.blue },
    { cx: 11.87, n: "06", title: "APORTE", prompt: "¿Qué busca mejorar?", color: C.red },
  ];
  slide.addShape(SH.line, {
    x: 1.32,
    y: 3.32,
    w: 10.55,
    h: 0,
    line: { color: C.softBlue, pt: 9, endArrowType: "triangle" },
  });
  story.forEach((item) => {
    const textColor = item.color === C.gold ? C.navyDeep : C.white;
    slide.addText(item.title, {
      x: item.cx - 0.94,
      y: 2.34,
      w: 1.88,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.2,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addShape(SH.ellipse, {
      x: item.cx - 0.43,
      y: 2.89,
      w: 0.86,
      h: 0.86,
      fill: { color: item.color },
      line: { color: C.white, pt: 1.8 },
    });
    slide.addText(item.n, {
      x: item.cx - 0.43,
      y: 3.12,
      w: 0.86,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14,
      bold: true,
      color: textColor,
      align: "center",
      margin: 0,
    });
    slide.addText(item.prompt, {
      x: item.cx - 0.92,
      y: 4.06,
      w: 1.84,
      h: 0.46,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.8,
      bold: true,
      color: C.ink,
      align: "center",
      valign: "mid",
      margin: 0,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 1.14,
    y: 5.18,
    w: 11.05,
    h: 1.08,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("COLUMNA VERTEBRAL", {
    x: 1.46,
    y: 5.42,
    w: 2.1,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    bold: true,
    charSpacing: 0.9,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("PROBLEMA  ↔  SOLUCIÓN  ↔  EVIDENCIA", {
    x: 3.68,
    y: 5.34,
    w: 7.72,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("Si una de estas relaciones se rompe, la historia pierde coherencia.", {
    x: 3.68,
    y: 5.76,
    w: 7.72,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.2,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { ignoreLines: true });
}

// 09 · Lenguaje claro y situado
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Lenguaje para una audiencia diversa",
    "Explica funciones, contextos y alcances",
    "La precisión no exige hablar difícil: exige decir qué hace la propuesta y qué puede respaldar.",
    9,
  );

  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 2.02,
    w: 6.16,
    h: 3.78,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1.2 },
  });
  components.addPill(slide, SH, "EJEMPLO GEOGREEN", {
    x: 0.98,
    y: 2.26,
    w: 1.86,
    h: 0.4,
    fill: C.navy,
    line: C.navy,
    color: C.white,
    fontSize: 10.5,
  });
  addImageContain(slide, IMG.systemFlow, 0.9, 2.7, 5.8, 2.75);

  slide.addShape(SH.roundRect, {
    x: 7.16,
    y: 2.02,
    w: 5.46,
    h: 3.78,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  const languageRows = [
    {
      y: 2.28,
      label: "FUNCIÓN",
      color: C.cyan,
      body: "Un sensor mide la distancia y permite estimar el nivel de llenado.",
      hint: "Empieza por lo que permite hacer.",
    },
    {
      y: 3.38,
      label: "CONTEXTO",
      color: C.gold,
      body: "En el espacio observado, la separación de residuos no es constante.",
      hint: "Describe situaciones observables, no culpas.",
    },
    {
      y: 4.48,
      label: "ALCANCE",
      color: C.green,
      body: "La propuesta busca facilitar una acción y muestra una primera evidencia.",
      hint: "Distingue avance comprobado de aporte esperado.",
    },
  ];
  languageRows.forEach((row, index) => {
    if (index > 0) {
      slide.addShape(SH.line, {
        x: 7.5,
        y: row.y - 0.16,
        w: 4.78,
        h: 0,
        line: { color: C.blue, pt: 1.1 },
      });
    }
    slide.addShape(SH.rect, {
      x: 7.5,
      y: row.y,
      w: 0.12,
      h: 0.84,
      fill: { color: row.color },
      line: { color: row.color },
    });
    slide.addText(row.label, {
      x: 7.82,
      y: row.y,
      w: 1.2,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.8,
      bold: true,
      charSpacing: 0.8,
      color: row.color,
      margin: 0,
    });
    slide.addText(row.body, {
      x: 7.82,
      y: row.y + 0.27,
      w: 4.34,
      h: 0.38,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.8,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(row.hint, {
      x: 7.82,
      y: row.y + 0.69,
      w: 4.34,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.5,
      italic: true,
      color: C.paleInk,
      margin: 0,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 1.32,
    y: 6.06,
    w: 10.7,
    h: 0.54,
    rectRadius: 0.04,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("SENSAR  →  ENVIAR  →  VISUALIZAR  →  ALERTAR", {
    x: 1.68,
    y: 6.21,
    w: 9.98,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { ignoreLines: true });
}

// 10 · Taller de guion
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("ACTIVIDAD · PRIMERA VERSIÓN", {
    x: 0.74,
    y: 0.46,
    w: 4.2,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    bold: true,
    charSpacing: 1.2,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Construyan el guion del pitch", {
    x: 0.74,
    y: 0.82,
    w: 7.6,
    h: 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Una idea principal por tramo. Frases breves. Información que el equipo pueda explicar o respaldar.", {
    x: 0.76,
    y: 1.43,
    w: 8.0,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.5,
    color: C.paleInk,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 1.94,
    w: 7.74,
    h: 4.74,
    rectRadius: 0.04,
    fill: { color: C.paper },
    line: { color: C.white, pt: 1.4 },
  });
  const starters = [
    "En [lugar o contexto] observamos que...",
    "Esta situación afecta o se relaciona con...",
    "Frente a este problema, nuestro equipo propone...",
    "La propuesta funciona de la siguiente manera...",
    "Podemos respaldar nuestro avance mostrando...",
    "Con esta propuesta esperamos aportar a...",
    "La idea principal que queremos dejar es...",
  ];
  starters.forEach((starter, index) => {
    const y = 2.16 + index * 0.61;
    const accent = [C.red, C.cyan, C.gold, C.green, C.blue, C.cyan, C.red][index];
    slide.addShape(SH.ellipse, {
      x: 1.0,
      y: y + 0.04,
      w: 0.38,
      h: 0.38,
      fill: { color: accent },
      line: { color: accent },
    });
    slide.addText(String(index + 1), {
      x: 1.0,
      y: y + 0.14,
      w: 0.38,
      h: 0.16,
      fontFace: TYPOGRAPHY.display,
      fontSize: 9.5,
      bold: true,
      color: accent === C.gold ? C.navyDeep : C.white,
      align: "center",
      margin: 0,
    });
    slide.addText(starter, {
      x: 1.58,
      y,
      w: 6.32,
      h: 0.32,
      fontFace: TYPOGRAPHY.body,
      fontSize: 13.6,
      bold: true,
      color: C.ink,
      margin: 0,
    });
    slide.addShape(SH.line, {
      x: 1.58,
      y: y + 0.44,
      w: 6.2,
      h: 0,
      line: { color: C.border, pt: 1 },
    });
  });

  slide.addText("4 MOVIMIENTOS", {
    x: 8.86,
    y: 2.02,
    w: 3.66,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    bold: true,
    charSpacing: 1,
    color: C.gold,
    margin: 0,
  });
  const writingMoves = [
    { y: 2.42, n: "01", title: "ORDENAR", body: "Ubicar cada idea.", color: C.red },
    { y: 3.22, n: "02", title: "CONECTAR", body: "Explicar relaciones.", color: C.cyan },
    { y: 4.02, n: "03", title: "DEPURAR", body: "Quitar repeticiones.", color: C.gold },
    { y: 4.82, n: "04", title: "LEER EN VOZ ALTA", body: "Comprobar naturalidad.", color: C.green },
  ];
  writingMoves.forEach((move) => {
    slide.addShape(SH.roundRect, {
      x: 8.82,
      y: move.y,
      w: 3.78,
      h: 0.66,
      rectRadius: 0.04,
      fill: { color: C.darkPanel },
      line: { color: move.color, pt: 1.3 },
    });
    slide.addText(move.n, {
      x: 9.04,
      y: move.y + 0.18,
      w: 0.42,
      h: 0.18,
      fontFace: TYPOGRAPHY.display,
      fontSize: 10.5,
      bold: true,
      color: move.color,
      margin: 0,
    });
    slide.addText(move.title, {
      x: 9.52,
      y: move.y + 0.1,
      w: 2.76,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.5,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(move.body, {
      x: 9.52,
      y: move.y + 0.36,
      w: 2.76,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.5,
      color: C.paleInk,
      margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 8.82,
    y: 5.86,
    w: 3.78,
    h: 0.82,
    rectRadius: 0.04,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("7 MINUTOS", {
    x: 9.06,
    y: 6.07,
    w: 1.0,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Primera versión completa", {
    x: 10.28,
    y: 6.03,
    w: 2.0,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.5,
    bold: true,
    color: C.white,
    align: "right",
    margin: 0,
  });
  addFooter(slide, 10, { white: true });
  addNotesAndValidate(slide, { ignoreLines: true });
}

// 11 · Prueba de comprensión
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Prueba entre pares",
    "¿Otra persona puede reconstruir la propuesta?",
    "La claridad se comprueba cuando alguien entiende el guion sin recibir explicaciones adicionales.",
    11,
    { titleFontSize: 25.5 },
  );

  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 2.08,
    w: 4.18,
    h: 3.86,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  const testSteps = [
    { y: 2.46, n: "1", title: "LEER", body: "Una persona lee el guion completo.", color: C.red },
    { y: 3.5, n: "2", title: "RECONSTRUIR", body: "Otra persona explica qué entendió.", color: C.cyan },
    { y: 4.54, n: "3", title: "CORREGIR", body: "El equipo ajusta el punto de quiebre.", color: C.gold },
  ];
  testSteps.forEach((step, index) => {
    slide.addShape(SH.ellipse, {
      x: 1.08,
      y: step.y,
      w: 0.64,
      h: 0.64,
      fill: { color: step.color },
      line: { color: C.white, pt: 1.4 },
    });
    slide.addText(step.n, {
      x: 1.08,
      y: step.y + 0.17,
      w: 0.64,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14,
      bold: true,
      color: step.color === C.gold ? C.navyDeep : C.white,
      align: "center",
      margin: 0,
    });
    slide.addText(step.title, {
      x: 1.98,
      y: step.y + 0.02,
      w: 2.38,
      h: 0.26,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.5,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(step.body, {
      x: 1.98,
      y: step.y + 0.33,
      w: 2.42,
      h: 0.32,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.5,
      color: C.paleInk,
      margin: 0,
    });
    if (index < testSteps.length - 1) {
      slide.addShape(SH.line, {
        x: 1.4,
        y: step.y + 0.68,
        w: 0,
        h: 0.34,
        line: { color: C.blue, pt: 2.2, endArrowType: "triangle" },
      });
    }
  });

  slide.addText("SIN MIRAR EL GUION, RESPONDE:", {
    x: 5.3,
    y: 2.08,
    w: 6.86,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    bold: true,
    charSpacing: 1,
    color: C.red,
    margin: 0,
  });
  const questions = [
    "¿Cuál es el problema y en qué contexto ocurre?",
    "¿Qué propone el equipo?",
    "¿Cómo funciona la propuesta?",
    "¿Qué evidencia existe y qué aporte se espera?",
  ];
  questions.forEach((question, index) => {
    const y = 2.5 + index * 0.78;
    slide.addShape(SH.ellipse, {
      x: 5.32,
      y: y + 0.02,
      w: 0.38,
      h: 0.38,
      fill: { color: C.white },
      line: { color: C.border, pt: 1.3 },
    });
    slide.addText(String(index + 1), {
      x: 5.32,
      y: y + 0.1,
      w: 0.38,
      h: 0.18,
      fontFace: TYPOGRAPHY.display,
      fontSize: 10.5,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(question, {
      x: 5.94,
      y,
      w: 6.1,
      h: 0.42,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.2,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addShape(SH.line, {
      x: 5.94,
      y: y + 0.54,
      w: 5.94,
      h: 0,
      line: { color: C.border, pt: 1 },
    });
  });

  slide.addShape(SH.roundRect, {
    x: 5.26,
    y: 5.66,
    w: 7.02,
    h: 0.88,
    rectRadius: 0.04,
    fill: { color: C.redSoft },
    line: { color: C.red, pt: 1.3 },
  });
  slide.addText("Si necesitan explicar algo fuera del guion, esa parte aún no está clara.", {
    x: 5.64,
    y: 5.91,
    w: 6.26,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { ignoreLines: true });
}

(async () => {
  await pptx.writeFile({ fileName: outputPptx });
  console.log(`PPTX generado: ${outputPptx}`);
  console.log(`Diapositivas: ${pptx._slides.length}`);
})();
