const path = require("path");
const PptxGenJS = require("../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../tools/slides-system");
const { imageSizingCrop, imageSizingContain } = require("../../../../tools/slides-system/vendor/pptxgenjs_helpers/image");

const { theme, utils } = slidesSystem;
const { applyAiepTheme, TOKENS: C, TYPOGRAPHY } = theme;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "GeoGreen Escolar Osorno";
pptx.company = "AIEP Osorno";
pptx.subject = "Reunion de coordinacion GeoGreen Escolar Osorno";
pptx.title = "GeoGreen Escolar Osorno - Reunion de coordinacion";
pptx.lang = "es-CL";

applyAiepTheme(pptx, {
  author: "GeoGreen Escolar Osorno",
  company: "AIEP Osorno",
  subject: "Reunion de coordinacion GeoGreen Escolar Osorno",
  title: "GeoGreen Escolar Osorno - Reunion de coordinacion",
});

const SH = pptx.ShapeType;
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const rootDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "../../../..");
const outputPptx = path.join(rootDir, "Reunion-Geogreen-2026-06-15.pptx");
const logoDir = path.resolve("C:/Users/Diego Obando/.agents/skills/slides-aiep/assets");

const IMG = {
  logo: path.join(logoDir, "logo-aiep.png"),
  mark: path.join(logoDir, "logo-aiep-mark.png"),
  osorno: path.join(repoRoot, "docs/infografias/infografia-contexto-osorno-reciclaje-geogreen-gptimage.png"),
  pseudo: path.join(repoRoot, "cronograma/infografias/infografia-maestra-pseudocronograma-geogreen.png"),
  cronograma: path.join(repoRoot, "cronograma/infografias/infografia-cronograma-post-vacaciones-octubre-2026-2160w.png"),
  objetivo: path.join(repoRoot, "cronograma/infografias/infografia-objetivo-transversal-geogreen.png"),
  t1Producto: path.join(repoRoot, "talleres/01/infografias/infografia-taller-1-producto-esperado-2160w.png"),
  t2Producto: path.join(repoRoot, "talleres/02/infografias/infografia-taller-2-producto-esperado-2160w.png"),
  t3: path.join(repoRoot, "talleres/03/infografias/infografia-taller-3-innovacion-proposito.png"),
  arduino: path.join(repoRoot, "docs/infografias/infografia-arduino-r4-wifi-geogreen.png"),
  sensores: path.join(repoRoot, "docs/infografias/infografia-sensores-arduino.png"),
};

const A = {
  navy: C.navy,
  navyDeep: "061E3A",
  red: C.red,
  gold: C.gold,
  paper: "F5F2EC",
  white: "FFFFFF",
  slate: C.slate,
  border: C.border,
  softBlue: "E9EEF4",
  softGreen: "EEF3EF",
  softGold: "F3E7C3",
  softRed: "F8E7E8",
  green: "2E7D4F",
  ink: "182B3A",
};

function bg(slide, color = A.paper) {
  slide.background = { color };
}

function rect(slide, x, y, w, h, fill, opts = {}) {
  slide.addShape(SH.rect, {
    x,
    y,
    w,
    h,
    fill: { color: fill, transparency: opts.transparency ?? 0 },
    line: { color: opts.line ?? fill, transparency: opts.lineTransparency ?? 100, pt: opts.pt ?? 0 },
  });
}

function line(slide, x, y, w, color = A.border, pt = 0.8) {
  slide.addShape(SH.line, { x, y, w, h: 0, line: { color, pt } });
}

function panel(slide, x, y, w, h, opts = {}) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: opts.radius ?? 0.08,
    fill: { color: opts.fill ?? A.white, transparency: opts.transparency ?? 0 },
    line: { color: opts.line ?? A.border, transparency: opts.lineTransparency ?? 0, pt: opts.pt ?? 0.8 },
    shadow: opts.shadow ? { type: "outer", color: "D8DEE6", opacity: 0.12, blur: 1, angle: 45, distance: 1 } : undefined,
  });
}

function imageCover(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({
    path: imagePath,
    ...imageSizingCrop(imagePath, x, y, w, h, opts.cx, opts.cy, opts.cw, opts.ch),
  });
}

function imageContain(slide, imagePath, x, y, w, h) {
  slide.addImage({ path: imagePath, ...imageSizingContain(imagePath, x, y, w, h) });
}

function bars(slide, x, y, scale = 1, color = A.red) {
  rect(slide, x, y + 0.16 * scale, 0.14 * scale, 0.42 * scale, color);
  rect(slide, x + 0.2 * scale, y, 0.16 * scale, 0.58 * scale, color);
  rect(slide, x + 0.42 * scale, y + 0.16 * scale, 0.14 * scale, 0.42 * scale, color);
}

function addLogo(slide, dark = false) {
  if (dark) {
    rect(slide, 11.44, 0.33, 1.3, 0.62, A.white, { transparency: 6 });
    imageContain(slide, IMG.logo, 11.55, 0.42, 1.08, 0.45);
  } else {
    imageContain(slide, IMG.logo, 11.55, 0.42, 1.08, 0.45);
  }
}

function header(slide, eyebrow, title, subtitle = "", opts = {}) {
  bars(slide, 0.74, 0.48, 1.0, opts.accent ?? A.red);
  slide.addText(eyebrow.toUpperCase(), {
    x: 1.42,
    y: 0.48,
    w: 8.6,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.6,
    bold: true,
    color: opts.eyebrowColor ?? A.red,
    charSpace: 0.9,
    margin: 0,
    breakLine: false,
  });
  slide.addText(title, {
    x: 1.42,
    y: 0.76,
    w: opts.titleW ?? 9.35,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.titleSize ?? 23,
    bold: true,
    color: opts.titleColor ?? A.navy,
    margin: 0,
    breakLine: false,
    fit: "shrink",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 1.42,
      y: 1.28,
      w: opts.subtitleW ?? 9.1,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.8,
      color: opts.subtitleColor ?? A.slate,
      margin: 0,
      fit: "shrink",
    });
  }
}

function footer(slide, number, dark = false) {
  line(slide, 0.74, 7.02, 11.82, dark ? "FFFFFF" : A.border, 0.65);
  slide.addText("GeoGreen Escolar Osorno · Reunión de coordinación", {
    x: 0.74,
    y: 7.14,
    w: 5.4,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.0,
    color: dark ? "DCE6F2" : A.slate,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 12.12,
    y: 7.08,
    w: 0.46,
    h: 0.24,
    rectRadius: 0.05,
    fill: { color: dark ? A.red : A.navy },
    line: { color: dark ? A.red : A.navy, transparency: 100 },
  });
  slide.addText(String(number).padStart(2, "0"), {
    x: 12.12,
    y: 7.145,
    w: 0.46,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.6,
    bold: true,
    color: A.white,
    align: "center",
    margin: 0,
  });
}

function titleBlock(slide, text, x, y, w, opts = {}) {
  slide.addText(text, {
    x,
    y,
    w,
    h: opts.h ?? 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.size ?? 27,
    bold: true,
    color: opts.color ?? A.navy,
    margin: 0,
    fit: "shrink",
  });
}

function bodyText(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x,
    y,
    w,
    h,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.size ?? 12.2,
    color: opts.color ?? A.ink,
    bold: opts.bold ?? false,
    margin: opts.margin ?? 0.04,
    breakLine: false,
    fit: "shrink",
    valign: opts.valign ?? "mid",
    align: opts.align ?? "left",
  });
}

function chip(slide, text, x, y, w, opts = {}) {
  panel(slide, x, y, w, 0.32, {
    fill: opts.fill ?? A.navy,
    line: opts.fill ?? A.navy,
    radius: 0.06,
    pt: 0,
  });
  bodyText(slide, text, x + 0.12, y + 0.1, w - 0.24, 0.08, {
    size: opts.size ?? 7.9,
    color: opts.color ?? A.white,
    bold: true,
    align: "center",
  });
}

function statCard(slide, number, label, x, y, w, h, opts = {}) {
  panel(slide, x, y, w, h, { fill: opts.fill ?? A.white, line: opts.line ?? A.border, shadow: true });
  bodyText(slide, number, x + 0.2, y + 0.24, w - 0.4, 0.5, {
    size: opts.numberSize ?? 22,
    color: opts.color ?? A.navy,
    bold: true,
    align: "center",
  });
  bodyText(slide, label, x + 0.18, y + 0.82, w - 0.36, h - 0.95, {
    size: opts.labelSize ?? 9.2,
    color: opts.textColor ?? A.ink,
    align: "center",
    valign: "top",
  });
}

function bulletList(slide, items, x, y, w, opts = {}) {
  const gap = opts.gap ?? 0.54;
  items.forEach((item, i) => {
    const yy = y + i * gap;
    slide.addShape(SH.ellipse, {
      x,
      y: yy + 0.07,
      w: 0.15,
      h: 0.15,
      fill: { color: opts.accent ?? A.red },
      line: { color: opts.accent ?? A.red, transparency: 100 },
    });
    bodyText(slide, item, x + 0.28, yy, w - 0.28, opts.itemH ?? 0.34, {
      size: opts.size ?? 11.2,
      color: opts.color ?? A.ink,
      valign: "top",
    });
  });
}

function stageRow(slide, n, title, owner, deliverable, y, color) {
  panel(slide, 0.9, y, 11.55, 0.58, { fill: A.white, line: A.border });
  slide.addShape(SH.ellipse, { x: 1.03, y: y + 0.11, w: 0.36, h: 0.36, fill: { color }, line: { color } });
  bodyText(slide, String(n), 1.03, y + 0.22, 0.36, 0.08, { size: 8.3, color: A.white, bold: true, align: "center" });
  bodyText(slide, title, 1.56, y + 0.15, 2.4, 0.2, { size: 10.2, color: A.navy, bold: true });
  bodyText(slide, owner, 4.35, y + 0.14, 2.42, 0.22, { size: 8.6, color, bold: true });
  bodyText(slide, deliverable, 7.05, y + 0.12, 5.0, 0.26, { size: 8.4, color: A.ink });
}

function slide01() {
  const slide = pptx.addSlide();
  bg(slide, A.navyDeep);
  rect(slide, 0, 0, SLIDE_W, SLIDE_H, A.navyDeep);
  panel(slide, 7.05, 1.22, 4.92, 5.2, { fill: A.white, line: "DCE6F2", radius: 0.04 });
  imageContain(slide, IMG.osorno, 7.32, 1.48, 4.38, 4.68);
  rect(slide, 6.76, 0.82, 0.06, 5.86, A.gold);
  addLogo(slide, true);
  bars(slide, 0.88, 0.56, 1.1, A.red);
  slide.addText("GeoGreen Escolar Osorno", {
    x: 1.68,
    y: 1.48,
    w: 4.72,
    h: 0.74,
    fontFace: TYPOGRAPHY.display,
    fontSize: 31,
    bold: true,
    color: A.white,
    margin: 0,
  });
  slide.addText("Reunión de coordinación", {
    x: 0.92,
    y: 2.42,
    w: 4.95,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 18.5,
    color: "DCE6F2",
    margin: 0,
  });
  panel(slide, 0.92, 4.72, 5.22, 0.86, { fill: "123C69", line: "123C69", radius: 0.07 });
  bodyText(slide, "15 de junio de 2026 · AIEP Osorno", 1.18, 5.02, 4.7, 0.16, { size: 12.3, color: A.white, bold: true });
  bodyText(slide, "Cronograma, responsabilidades, talleres y componente Arduino", 0.92, 6.2, 5.3, 0.32, {
    size: 12.4,
    color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function slide02() {
  const slide = pptx.addSlide();
  bg(slide);
  addLogo(slide);
  header(slide, "Coordinación", "Temas para revisar", "Propuesta de conversación para ordenar avances y recoger orientaciones.");
  const goals = [
    ["Responsabilidades", "Revisar la distribución propuesta para talleres, mentorías y cierre."],
    ["Fechas", "Contrastar el calendario post vacaciones con disponibilidad del establecimiento."],
    ["Materiales", "Mostrar qué está preparado y qué requiere ajuste o validación."],
    ["Evidencias", "Confirmar qué respaldos conviene levantar durante la ejecución."],
  ];
  goals.forEach(([t, b], i) => {
    const x = 0.9 + (i % 2) * 5.95;
    const y = 2.0 + Math.floor(i / 2) * 1.62;
    panel(slide, x, y, 5.35, 1.16, { fill: i % 2 === 0 ? A.white : A.softBlue, line: A.border, shadow: true });
    chip(slide, `0${i + 1}`, x + 0.22, y + 0.22, 0.56, { fill: i === 0 ? A.red : A.navy });
    bodyText(slide, t, x + 0.96, y + 0.22, 3.75, 0.2, { size: 14.2, color: A.navy, bold: true });
    bodyText(slide, b, x + 0.96, y + 0.56, 3.88, 0.34, { size: 10.7, color: A.ink });
  });
  panel(slide, 1.05, 5.72, 11.2, 0.68, { fill: A.navy, line: A.navy });
  bodyText(slide, "La intención es facilitar una revisión ejecutiva: avance disponible, puntos abiertos y acuerdos operativos por precisar.", 1.32, 5.93, 10.64, 0.18, {
    size: 11.4,
    color: A.white,
    bold: true,
    align: "center",
  });
  footer(slide, 2);
  validateSlide(slide, pptx);
}

function slide03() {
  const slide = pptx.addSlide();
  bg(slide, A.white);
  addLogo(slide);
  header(slide, "Contexto territorial", "Osorno: desafío local de reciclaje", "El programa se ancla en un problema visible del territorio, no solo en una actividad tecnológica.");
  imageContain(slide, IMG.osorno, 0.78, 1.82, 5.16, 4.86);
  rect(slide, 6.22, 1.94, 0.05, 4.5, A.red);
  titleBlock(slide, "GeoGreen conecta datos, hábitos y tecnología", 6.62, 2.02, 5.15, { size: 24, h: 1.05 });
  bulletList(slide, [
    "Reciclaje como desafío territorial y escolar.",
    "Separación en origen como brecha crítica.",
    "Datos y visualización para decidir mejor.",
    "Tecnología como medio, no como fin.",
  ], 6.7, 3.38, 5.1, { accent: A.green, gap: 0.58, size: 10.8 });
  panel(slide, 6.62, 6.02, 5.22, 0.52, { fill: A.softGreen, line: "C8D9CC" });
  bodyText(slide, "Este contexto orienta la secuencia formativa y el componente tecnológico.", 6.88, 6.2, 4.72, 0.12, {
    size: 9.4,
    color: A.navy,
    bold: true,
    align: "center",
  });
  footer(slide, 3);
  validateSlide(slide, pptx);
}

function slide04() {
  const slide = pptx.addSlide();
  bg(slide);
  addLogo(slide);
  header(slide, "Avance disponible", "Qué hemos desarrollado", "Ya existe una base de materiales para revisar y ajustar con el equipo.");
  const cards = [
    ["Taller 1", "PPT, planificación docente e infografías de producto esperado."],
    ["Taller 2", "PPT, guía estudiante, planificación docente, PDF e infografías."],
    ["Cronograma", "Pseudocronograma, fechas tentativas, pendientes y fase final."],
    ["Arduino", "Firmware, simulación Wokwi, visualizador 3D y material técnico."],
    ["Evidencias", "Fichas, registros, rúbricas y productos esperados por equipo."],
    ["Cierre", "Pitch, devolución, recomendaciones y materiales reutilizables."],
  ];
  cards.forEach(([t, b], i) => {
    const x = 0.88 + (i % 3) * 4.1;
    const y = 1.95 + Math.floor(i / 3) * 1.58;
    panel(slide, x, y, 3.72, 1.16, { fill: i % 2 === 0 ? A.white : A.softBlue, line: A.border, shadow: true });
    bodyText(slide, t, x + 0.24, y + 0.25, 3.18, 0.18, { size: 13.2, color: A.navy, bold: true });
    bodyText(slide, b, x + 0.24, y + 0.58, 3.18, 0.34, { size: 8.9, color: A.ink, valign: "top" });
  });
  panel(slide, 1.15, 5.58, 10.92, 0.66, { fill: A.navy, line: A.navy });
  bodyText(slide, "La conversación puede apoyarse en materiales concretos y concentrarse en ajustes operativos.", 1.45, 5.83, 10.34, 0.1, {
    size: 10.5,
    color: A.white,
    bold: true,
    align: "center",
  });
  footer(slide, 4);
  validateSlide(slide, pptx);
}

function slide05() {
  const slide = pptx.addSlide();
  bg(slide, A.white);
  addLogo(slide);
  header(slide, "Mapa de trabajo", "Lógica del proyecto", "El pseudocronograma sin fechas funciona como referencia de coordinación para esta reunión.");
  imageContain(slide, IMG.pseudo, 0.82, 1.68, 5.38, 5.18);
  rect(slide, 6.55, 1.78, 0.05, 4.8, A.red);
  titleBlock(slide, "Primero la lógica, después las fechas", 6.9, 2.0, 4.9, { size: 23.5, h: 0.92 });
  bulletList(slide, [
    "Ordena etapas, responsables y entregables.",
    "Separa la lógica de trabajo de la calendarización.",
    "Permite ajustar fechas sin cambiar la arquitectura del programa.",
    "Define productos mínimos por taller y mentoría.",
  ], 6.98, 3.28, 5.05, { accent: A.red, gap: 0.58, size: 10.5 });
  panel(slide, 6.9, 6.15, 4.98, 0.48, { fill: A.softGold, line: "E7D39A" });
  bodyText(slide, "Referencia de trabajo: pseudocronograma de coordinación.", 7.12, 6.34, 4.55, 0.08, { size: 8.8, color: A.navy, bold: true, align: "center" });
  footer(slide, 5);
  validateSlide(slide, pptx);
}

function slide06() {
  const slide = pptx.addSlide();
  bg(slide);
  addLogo(slide);
  header(slide, "Responsabilidades", "Distribución preliminar", "Referencia tomada del pseudocronograma de coordinación.");
  stageRow(slide, 1, "Taller 1", "Desarrollo Social", "Equipos formados + problema ambiental.", 1.8, A.red);
  stageRow(slide, 2, "Taller 2", "Desarrollo Social", "Ficha de residuo/material.", 2.48, A.red);
  stageRow(slide, 3, "Taller 3", "Programación/Sistemas", "Idea tecnológica inicial.", 3.16, A.navy);
  stageRow(slide, 4, "Mentoría 1", "Desarrollo Social", "Problema validado + contexto afectado.", 3.84, A.red);
  stageRow(slide, 5, "Mentorías 2 y 3", "Programación/Sistemas", "Solución, componentes, maqueta o simulación.", 4.52, A.navy);
  stageRow(slide, 6, "Mentoría 4", "Desarrollo Social", "Guion de pitch + soporte visual.", 5.2, A.red);
  stageRow(slide, 7, "Ensayo y cierre", "Equipo conjunto", "Presentación corregida, propuestas e informe.", 5.88, A.green);
  footer(slide, 6);
  validateSlide(slide, pptx);
}

function slide07() {
  const slide = pptx.addSlide();
  bg(slide, A.white);
  addLogo(slide);
  header(slide, "Calendario tentativo", "Fechas post vacaciones", "El cronograma fechado aterriza la lógica; todavía puede ajustarse con el establecimiento.");
  imageContain(slide, IMG.cronograma, 8.0, 1.54, 3.9, 5.42);
  const dates = [
    ["27 jul", "Retorno y coordinación", "Reenganche, acuerdos y preparación."],
    ["03 ago", "Taller 1", "Conciencia ambiental local."],
    ["10 ago", "Taller 2", "Ciencia del reciclaje y materiales."],
    ["17 ago", "Taller 3", "Arduino, sensores y GeoGreen como caso."],
    ["24 ago - 28 sep", "Mentorías", "Avance por equipos y ensayo de pitch."],
    ["02 oct / 05 oct", "Hito y evento final", "Día ambiental viernes y muestra final lunes."],
  ];
  dates.forEach(([d, t, b], i) => {
    const y = 1.72 + i * 0.78;
    chip(slide, d, 0.9, y, 1.02, { fill: i >= 4 ? A.red : A.navy, size: 7.7 });
    bodyText(slide, t, 2.18, y + 0.04, 2.7, 0.14, { size: 10.6, color: A.navy, bold: true });
    bodyText(slide, b, 4.95, y + 0.02, 2.45, 0.2, { size: 8.8, color: A.ink });
    if (i < dates.length - 1) line(slide, 1.42, y + 0.48, 0, A.border, 0.8);
  });
  panel(slide, 0.9, 6.42, 6.5, 0.4, { fill: A.softBlue, line: A.border });
  bodyText(slide, "La fecha final queda alineada con el hito ambiental del 2 de octubre y el evento del lunes 5 de octubre.", 1.1, 6.56, 6.1, 0.08, {
    size: 8.6,
    color: A.navy,
    bold: true,
    align: "center",
  });
  footer(slide, 7);
  validateSlide(slide, pptx);
}

function slide08() {
  const slide = pptx.addSlide();
  bg(slide);
  addLogo(slide);
  header(slide, "Objetivo transversal", "Unir sostenibilidad, datos y tecnología", "El programa forma mirada ambiental y capacidad de proponer soluciones.");
  imageContain(slide, IMG.objetivo, 0.8, 1.72, 4.08, 4.95);
  const flow = [
    ["Sostenibilidad", "Problema situado en el colegio y la comuna.", A.green],
    ["Reciclaje", "Materiales, separación y condiciones reales.", A.gold],
    ["Datos", "Medición, evidencia y lectura de información.", A.navy],
    ["Tecnología", "Sensores, Arduino, alertas y visualización.", A.red],
    ["Pitch", "Comunicar una propuesta viable y útil.", A.green],
  ];
  flow.forEach(([t, b, color], i) => {
    const x = 5.35 + (i % 2) * 3.25;
    const y = 1.82 + Math.floor(i / 2) * 1.42;
    panel(slide, x, y, 2.82, 0.96, { fill: A.white, line: color, pt: 1.1 });
    bodyText(slide, t, x + 0.2, y + 0.22, 2.42, 0.16, { size: 10.8, color, bold: true, align: "center" });
    bodyText(slide, b, x + 0.22, y + 0.5, 2.38, 0.22, { size: 7.6, color: A.ink, align: "center" });
  });
  panel(slide, 7.0, 5.98, 3.66, 0.42, { fill: A.navy, line: A.navy });
  bodyText(slide, "El valor está en la integración, no en una actividad aislada.", 7.22, 6.14, 3.22, 0.08, {
    size: 8.4,
    color: A.white,
    bold: true,
    align: "center",
  });
  footer(slide, 8);
  validateSlide(slide, pptx);
}

function slide09() {
  const slide = pptx.addSlide();
  bg(slide, A.white);
  addLogo(slide);
  header(slide, "Taller 1", "Conciencia ambiental local", "Antes de proponer tecnología, los equipos aprenden a observar bien el problema.", {
    titleW: 6.45,
    subtitleW: 6.2,
  });
  panel(slide, 8.05, 1.72, 3.35, 4.82, { fill: A.white, line: A.border, radius: 0.04 });
  imageContain(slide, IMG.t1Producto, 8.24, 1.94, 2.98, 4.36);
  titleBlock(slide, "Mirar el residuo como señal de un problema", 0.9, 2.0, 6.45, { size: 27, h: 0.82 });
  bulletList(slide, [
    "Reconocer residuos frecuentes y lugares críticos.",
    "Distinguir síntoma, causa y consecuencia.",
    "Formar equipos de trabajo.",
    "Nombrar un problema ambiental concreto.",
  ], 1.0, 3.35, 5.85, { accent: A.green, gap: 0.64, size: 12.0, itemH: 0.38 });
  panel(slide, 0.95, 6.05, 5.9, 0.52, { fill: A.softGreen, line: "C8D9CC" });
  bodyText(slide, "Referencia de coordinación: Desarrollo Social.", 1.18, 6.23, 5.44, 0.08, { size: 10.2, color: A.green, bold: true, align: "center" });
  footer(slide, 9);
  validateSlide(slide, pptx);
}

function slide10() {
  const slide = pptx.addSlide();
  bg(slide);
  addLogo(slide);
  header(slide, "Producto Taller 1", "Mapa de problema + frase ambiental", "El equipo sale con una base clara para los talleres posteriores.");
  imageContain(slide, IMG.t1Producto, 0.8, 1.62, 4.2, 5.28);
  panel(slide, 5.48, 1.82, 5.85, 1.0, { fill: A.white, line: A.green, pt: 1.1 });
  bodyText(slide, "Mapa de problema", 5.78, 2.12, 5.25, 0.14, { size: 15.2, color: A.green, bold: true, align: "center" });
  bodyText(slide, "Lugar + residuo + hábito + consecuencia.", 5.78, 2.43, 5.25, 0.12, { size: 9.2, color: A.ink, align: "center" });
  panel(slide, 5.48, 3.22, 5.85, 1.0, { fill: A.white, line: A.navy, pt: 1.1 });
  bodyText(slide, "Frase ambiental", 5.78, 3.52, 5.25, 0.14, { size: 15.2, color: A.navy, bold: true, align: "center" });
  bodyText(slide, "Problema observable, situado y trabajable.", 5.78, 3.83, 5.25, 0.12, { size: 9.2, color: A.ink, align: "center" });
  panel(slide, 5.48, 4.62, 5.85, 1.0, { fill: A.navy, line: A.navy });
  bodyText(slide, "Puente", 5.78, 4.92, 5.25, 0.12, { size: 13.4, color: A.white, bold: true, align: "center" });
  bodyText(slide, "Ese problema alimenta la ficha de material del Taller 2.", 5.78, 5.22, 5.25, 0.12, { size: 9.2, color: "DCE6F2", align: "center" });
  footer(slide, 10);
  validateSlide(slide, pptx);
}

function slide11() {
  const slide = pptx.addSlide();
  bg(slide, A.white);
  addLogo(slide);
  header(slide, "Taller 2", "Ciencia del reciclaje", "El problema se vuelve más preciso al entender de qué está hecho el residuo.", {
    titleW: 6.45,
    subtitleW: 6.2,
  });
  panel(slide, 8.05, 1.72, 3.35, 4.82, { fill: A.white, line: A.border, radius: 0.04 });
  imageContain(slide, IMG.t2Producto, 8.24, 1.94, 2.98, 4.36);
  titleBlock(slide, "No se reciclan objetos: se recuperan materiales", 0.9, 1.96, 6.5, { size: 26.5, h: 0.88 });
  bulletList(slide, [
    "Distinguir objeto y material.",
    "Comprender reciclable versus reciclado.",
    "Aplicar limpio, seco y separado.",
    "Clasificar con criterio y justificar decisiones.",
  ], 1.0, 3.36, 5.95, { accent: A.gold, gap: 0.64, size: 12.0, itemH: 0.38 });
  panel(slide, 0.95, 6.05, 5.9, 0.52, { fill: A.softGold, line: "E7D39A" });
  bodyText(slide, "Referencia de coordinación: Desarrollo Social.", 1.18, 6.23, 5.44, 0.08, { size: 10.2, color: A.navy, bold: true, align: "center" });
  footer(slide, 11);
  validateSlide(slide, pptx);
}

function slide12() {
  const slide = pptx.addSlide();
  bg(slide);
  addLogo(slide);
  header(slide, "Producto Taller 2", "Ficha de residuo/material", "El producto conecta ciencia del material con el problema ambiental del equipo.");
  imageContain(slide, IMG.t2Producto, 0.78, 1.62, 4.2, 5.28);
  const fields = [
    ["Material elegido", "Residuo concreto y observable."],
    ["Familia", "Plástico, papel/cartón, vidrio, metal, orgánico o multicapa."],
    ["Condiciones", "Cuándo se recupera y qué lo arruina."],
    ["Relación", "Cómo se conecta con el problema del Taller 1."],
  ];
  fields.forEach(([t, b], i) => {
    const x = 5.42 + (i % 2) * 3.2;
    const y = 1.92 + Math.floor(i / 2) * 1.5;
    panel(slide, x, y, 2.82, 1.02, { fill: A.white, line: i < 2 ? A.gold : A.navy, pt: 1 });
    bodyText(slide, t, x + 0.2, y + 0.22, 2.42, 0.14, { size: 10.6, color: i < 2 ? A.gold : A.navy, bold: true, align: "center" });
    bodyText(slide, b, x + 0.22, y + 0.52, 2.38, 0.24, { size: 7.6, color: A.ink, align: "center" });
  });
  panel(slide, 5.42, 5.24, 6.02, 0.62, { fill: A.navy, line: A.navy });
  bodyText(slide, "Este producto prepara la pregunta tecnológica: qué conviene medir, avisar o visualizar.", 5.74, 5.48, 5.4, 0.12, {
    size: 9.4,
    color: A.white,
    bold: true,
    align: "center",
  });
  footer(slide, 12);
  validateSlide(slide, pptx);
}

function slide13() {
  const slide = pptx.addSlide();
  bg(slide, A.white);
  addLogo(slide);
  header(slide, "Taller 3", "Arduino y GeoGreen como caso", "La tecnología entra como una forma de responder a un problema ya observado.");
  imageContain(slide, IMG.t3, 0.82, 1.58, 3.52, 5.22);
  imageContain(slide, IMG.arduino, 9.62, 1.8, 2.18, 2.8);
  const steps = [
    ["Sensar", "HC-SR04 mide distancia al contenido.", A.green],
    ["Calcular", "Arduino convierte distancia en porcentaje.", A.navy],
    ["Alertar", "Semáforo y buzzer indican estado lleno.", A.red],
    ["Visualizar", "Simulación o tablero muestra el dato.", A.gold],
  ];
  steps.forEach(([t, b, color], i) => {
    const y = 1.72 + i * 1.08;
    panel(slide, 4.82, y, 4.1, 0.78, { fill: A.white, line: color, pt: 1.0 });
    chip(slide, String(i + 1), 5.02, y + 0.22, 0.42, { fill: color, size: 8 });
    bodyText(slide, t, 5.68, y + 0.2, 1.1, 0.12, { size: 9.8, color, bold: true });
    bodyText(slide, b, 7.08, y + 0.18, 1.42, 0.2, { size: 7.2, color: A.ink });
  });
  panel(slide, 9.28, 5.02, 2.92, 0.72, { fill: A.softBlue, line: A.border });
  bodyText(slide, "Referencia de coordinación: Programación/Sistemas.", 9.5, 5.3, 2.48, 0.12, {
    size: 8.0,
    color: A.navy,
    bold: true,
    align: "center",
  });
  footer(slide, 13);
  validateSlide(slide, pptx);
}

function slide14() {
  const slide = pptx.addSlide();
  bg(slide);
  addLogo(slide);
  header(slide, "Acompañamiento", "Mentorías y pitch", "Las mentorías transforman productos de taller en propuestas presentables.");
  const rows = [
    ["Mentoría 1", "Desarrollo Social", "Problema validado + contexto afectado.", A.red],
    ["Mentoría 2", "Programación/Sistemas", "Solución + componentes definidos.", A.navy],
    ["Mentoría 3", "Programación/Sistemas", "Maqueta, simulación, diagrama o prototipo.", A.navy],
    ["Mentoría 4", "Desarrollo Social", "Guion de pitch + soporte visual.", A.red],
    ["Ensayo", "Desarrollo Social + apoyo técnico", "Presentación corregida.", A.green],
  ];
  rows.forEach(([t, owner, product, color], i) => {
    const y = 1.82 + i * 0.82;
    panel(slide, 1.02, y, 11.0, 0.62, { fill: A.white, line: A.border });
    bodyText(slide, t, 1.28, y + 0.2, 1.68, 0.12, { size: 11.6, color: A.navy, bold: true });
    bodyText(slide, owner, 3.35, y + 0.19, 2.85, 0.12, { size: 10.6, color, bold: true });
    bodyText(slide, product, 6.48, y + 0.18, 5.0, 0.14, { size: 10.7, color: A.ink });
  });
  panel(slide, 1.02, 6.22, 11.0, 0.58, { fill: A.navy, line: A.navy });
  bodyText(slide, "Cierre esperado: propuestas presentadas, retroalimentación, reconocimientos e informe final.", 1.28, 6.42, 10.48, 0.1, {
    size: 12.0,
    color: A.white,
    bold: true,
    align: "center",
  });
  footer(slide, 14);
  validateSlide(slide, pptx);
}

function slide15() {
  const slide = pptx.addSlide();
  bg(slide, A.navyDeep);
  rect(slide, 0, 0, SLIDE_W, SLIDE_H, A.navyDeep);
  addLogo(slide, true);
  bars(slide, 0.86, 0.52, 1.0, A.red);
  slide.addText("Acuerdos a cerrar", {
    x: 1.58,
    y: 1.42,
    w: 6.5,
    h: 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: 32,
    bold: true,
    color: A.white,
    margin: 0,
  });
  slide.addText("Para iniciar el programa con una base operativa clara.", {
    x: 0.9,
    y: 2.22,
    w: 5.6,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.8,
    color: "DCE6F2",
    margin: 0,
  });
  const asks = [
    ["Fechas", "Días, horarios y evento final."],
    ["Participantes", "Curso, estudiantes y equipos."],
    ["Coordinación", "Ajustes necesarios por etapa."],
    ["Arduino", "Demo, simulación y materiales."],
    ["Evidencias", "Listas, fotos, fichas e informe."],
    ["Cierre", "Pitch, jurado y reconocimientos."],
  ];
  asks.forEach(([t, b], i) => {
    const x = 0.95 + (i % 2) * 5.7;
    const y = 3.0 + Math.floor(i / 2) * 0.94;
    panel(slide, x, y, 5.08, 0.66, { fill: "123C69", line: "2D5D86", radius: 0.06 });
    bodyText(slide, t, x + 0.24, y + 0.21, 1.48, 0.1, { size: 11.2, color: A.white, bold: true });
    bodyText(slide, b, x + 1.94, y + 0.18, 2.64, 0.12, { size: 10.0, color: "DCE6F2" });
  });
  rect(slide, 0, 7.03, SLIDE_W, 0.08, A.red);
  bodyText(slide, "GeoGreen Escolar Osorno · Coordinación interna", 0.9, 7.2, 5.6, 0.1, { size: 8.3, color: "DCE6F2" });
  validateSlide(slide, pptx);
}

[
  slide01,
  slide02,
  slide03,
  slide04,
  slide05,
  slide06,
  slide07,
  slide08,
  slide09,
  slide10,
  slide11,
  slide12,
  slide13,
  slide14,
  slide15,
].forEach((fn) => fn());

pptx.writeFile({ fileName: outputPptx });
