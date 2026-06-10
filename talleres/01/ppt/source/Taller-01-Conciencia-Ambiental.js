const path = require("path");
const PptxGenJS = require("../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../tools/slides-system");
const { imageSizingCrop } = require("../../../../tools/slides-system/vendor/pptxgenjs_helpers/image");

const { theme, components, utils } = slidesSystem;
const { applyAiepTheme, TOKENS: C, TYPOGRAPHY } = theme;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

applyAiepTheme(pptx, {
  author: "GeoGreen Escolar Osorno",
  company: "AIEP Osorno",
  subject: "Taller 1 - Conciencia ambiental local",
  title: "Taller 1 - Conciencia ambiental local",
});

const SH = pptx.ShapeType;
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Taller-01-Conciencia-Ambiental.pptx");
const imgDir = path.resolve(__dirname, "assets/images");

const IMG = {
  bins: path.join(imgDir, "recycling-bins-orchard-road.jpg"),
  schoolBin: path.join(imgDir, "school-recycling-bin-lagos.jpg"),
  schoolBinCrop: path.join(imgDir, "school-recycling-bin-lagos-crop.jpg"),
  schoolBinFocus: path.join(imgDir, "school-recycling-bin-lagos-bin-focus.jpg"),
  poorSorting: path.join(imgDir, "poor-recycling-education-sydney.jpg"),
  poorSortingCrop: path.join(imgDir, "poor-recycling-education-sydney-crop.jpg"),
  audit: path.join(imgDir, "recycling-sorting-audit.jpg"),
  rossAudit: path.join(imgDir, "ross-waste-audit-education-day.jpg"),
  aurariaAudit: path.join(imgDir, "auraria-campus-waste-audit.jpg"),
};

const GEO = {
  navyDeep: "061E3A",
  navyInk: "082B5C",
  paper: "F5F2EC",
  green: "2E9C5B",
  greenSoft: "E8F4EC",
  redSoft: "F8E7E8",
  blueSoft: "E9EEF4",
  goldSoft: "F3E7C3",
  ink: "182B3A",
};

function imageCover(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({
    path: imagePath,
    ...imageSizingCrop(imagePath, x, y, w, h, opts.cx, opts.cy, opts.cw, opts.ch),
  });
}

function bg(slide, color = GEO.paper) {
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

function panel(slide, x, y, w, h, opts = {}) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: opts.radius ?? 0.08,
    fill: { color: opts.fill ?? C.white, transparency: opts.transparency ?? 0 },
    line: { color: opts.line ?? C.border, transparency: opts.lineTransparency ?? 0, pt: opts.pt ?? 0.8 },
    shadow: opts.shadow ? { type: "outer", color: "D8DEE6", opacity: 0.14, blur: 1, angle: 45, distance: 1 } : undefined,
  });
}

function bars(slide, x, y, scale = 1, color = C.red) {
  slide.addShape(SH.rect, { x, y: y + 0.16 * scale, w: 0.14 * scale, h: 0.42 * scale, fill: { color }, line: { color } });
  slide.addShape(SH.rect, { x: x + 0.2 * scale, y, w: 0.16 * scale, h: 0.58 * scale, fill: { color }, line: { color } });
  slide.addShape(SH.rect, { x: x + 0.42 * scale, y: y + 0.16 * scale, w: 0.14 * scale, h: 0.42 * scale, fill: { color }, line: { color } });
}

function header(slide, eyebrow, title, subtitle = "") {
  bars(slide, 0.74, 0.48, 1.0);
  slide.addText(eyebrow.toUpperCase(), {
    x: 1.42,
    y: 0.48,
    w: 7.6,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    bold: true,
    color: C.red,
    charSpace: 1.1,
    margin: 0,
  });
  slide.addText(title, {
    x: 1.42,
    y: 0.76,
    w: 8.7,
    h: 0.44,
    fontFace: TYPOGRAPHY.display,
    fontSize: 23.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 1.42,
      y: 1.28,
      w: 8.8,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      color: C.slate,
      margin: 0,
    });
  }
}

function footer(slide, number, dark = false) {
  const lineColor = dark ? "FFFFFF" : C.border;
  slide.addShape(SH.line, {
    x: 0.74,
    y: 7.02,
    w: 11.82,
    h: 0,
    line: { color: lineColor, transparency: dark ? 72 : 0, pt: 0.65 },
  });
  slide.addText("GeoGreen Escolar Osorno · Taller 1", {
    x: 0.74,
    y: 7.14,
    w: 4.4,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.2,
    color: dark ? "DCE6F2" : C.slate,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 12.16,
    y: 7.08,
    w: 0.42,
    h: 0.24,
    rectRadius: 0.05,
    fill: { color: dark ? C.red : C.navy },
    line: { color: dark ? C.red : C.navy, transparency: 100 },
  });
  slide.addText(String(number).padStart(2, "0"), {
    x: 12.16,
    y: 7.145,
    w: 0.42,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.6,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
}

function thesis(slide, text, dark = false) {
  panel(slide, 0.86, 6.36, 11.18, 0.42, {
    fill: dark ? "123C69" : C.navy,
    line: dark ? "123C69" : C.navy,
    shadow: false,
  });
  slide.addText(text, {
    x: 1.12,
    y: 6.515,
    w: 10.66,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.8,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
}

function label(slide, text, x, y, w, opts = {}) {
  panel(slide, x, y, w, 0.34, {
    fill: opts.fill ?? C.white,
    line: opts.line ?? C.border,
    shadow: false,
  });
  slide.addText(text, {
    x: x + 0.12,
    y: y + 0.115,
    w: w - 0.24,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.fontSize ?? 7.7,
    bold: true,
    color: opts.color ?? C.navy,
    align: "center",
    margin: 0,
  });
}

function slide01Cover() {
  const slide = pptx.addSlide();
  // Overlaps intencionales: foto con velo suave solo en la franja derecha; izquierda navy sólido.
  imageCover(slide, IMG.bins, 7.3, 0, 6.03, SLIDE_H, { cx: 0.38, cy: 0.1, cw: 0.5, ch: 0.88 });
  rect(slide, 7.3, 0, 6.03, SLIDE_H, GEO.navyDeep, { transparency: 76 });
  rect(slide, 0, 0, 7.3, SLIDE_H, GEO.navyDeep);
  rect(slide, 7.27, 0, 0.05, SLIDE_H, C.gold);
  bars(slide, 0.86, 0.78, 1.36);
  slide.addText("GEOGREEN ESCOLAR OSORNO", {
    x: 0.86,
    y: 1.58,
    w: 5.2,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    bold: true,
    color: C.red,
    charSpace: 1.35,
    margin: 0,
  });
  slide.addText("Taller 1\nConciencia ambiental local", {
    x: 0.86,
    y: 2.16,
    w: 6.3,
    h: 1.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 34,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
  });
  slide.addText("Antes de diseñar soluciones, aprendemos a mirar el problema.", {
    x: 0.9,
    y: 3.74,
    w: 5.95,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.4,
    color: "E9EEF4",
    margin: 0,
  });
  label(slide, "Bloque A 09:00-10:30", 0.9, 5.48, 1.75, { fill: "FFFFFF", color: C.navy });
  label(slide, "Bloque B 10:45-12:15", 2.82, 5.48, 1.75, { fill: "FFFFFF", color: C.navy });
  footer(slide, 1, true);
  validateSlide(slide, pptx);
}

function slide02Purpose() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Propósito", "Hoy no partimos por la tecnología", "Primero construimos una mirada común sobre residuos, hábitos y lugares.");
  panel(slide, 0.88, 2.02, 5.58, 2.38, { fill: C.white, shadow: true });
  slide.addText("La tecnología aparece después", {
    x: 1.18,
    y: 2.44,
    w: 4.9,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Si el problema queda mal entendido, cualquier sensor o prototipo queda respondiendo a una pregunta equivocada.", {
    x: 1.2,
    y: 3.14,
    w: 4.84,
    h: 0.52,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.2,
    color: GEO.ink,
    margin: 0,
    breakLine: false,
  });
  imageCover(slide, IMG.audit, 7.12, 1.42, 4.62, 3.36, { cx: 0.18, cy: 0.16, cw: 0.64, ch: 0.72 });
  rect(slide, 7.12, 1.42, 4.62, 3.36, C.navy, { transparency: 86, line: C.border, lineTransparency: 0, pt: 0.75 });
  label(slide, "observar", 7.38, 5.14, 1.16, { fill: GEO.redSoft, color: C.red, line: GEO.redSoft });
  label(slide, "conversar", 8.72, 5.14, 1.22, { fill: C.white, color: C.navy });
  label(slide, "formular", 10.14, 5.14, 1.16, { fill: GEO.greenSoft, color: GEO.green, line: GEO.greenSoft });
  thesis(slide, "Una solución sostenible empieza con una observación honesta.");
  footer(slide, 2);
  validateSlide(slide, pptx);
}

function slide03Map() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Mapa de clase", "El recorrido de este taller", "Al cierre, cada equipo tendrá una primera frase de problema ambiental.");
  const steps = [
    ["01", "Mirar residuos", "qué aparece"],
    ["02", "Ubicar lugares", "dónde se repite"],
    ["03", "Leer hábitos", "qué hacemos"],
    ["04", "Nombrar problema", "por qué importa"],
  ];
  steps.forEach(([n, title, body], i) => {
    const x = 0.92 + i * 3.05;
    const active = i === 0;
    panel(slide, x, 2.48, 2.54, 2.28, {
      fill: active ? GEO.redSoft : C.white,
      line: active ? C.red : C.border,
      shadow: true,
    });
    slide.addText(n, {
      x: x + 0.22,
      y: 2.78,
      w: 0.42,
      h: 0.14,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10,
      bold: true,
      color: active ? C.red : C.navy,
      margin: 0,
    });
    slide.addText(title, {
      x: x + 0.22,
      y: 3.18,
      w: 2.02,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16.8,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(body, {
      x: x + 0.24,
      y: 3.86,
      w: 1.9,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
      bold: true,
      color: C.slate,
      margin: 0,
    });
    if (i < 3) {
      slide.addShape(SH.chevron, {
        x: x + 2.64,
        y: 3.3,
        w: 0.32,
        h: 0.34,
        fill: { color: C.red, transparency: 16 },
        line: { color: C.red, transparency: 100 },
      });
    }
  });
  thesis(slide, "No vamos de la respuesta al problema; vamos del problema a una posible respuesta.");
  footer(slide, 3);
  validateSlide(slide, pptx);
}

function slide04BlockIntro() {
  const slide = pptx.addSlide();
  // Overlaps intencionales: foto legible (contenedor abierto) con velo navy solo a la derecha.
  imageCover(slide, IMG.poorSorting, 7.8, 0, 5.53, SLIDE_H, { cx: 0.42, cy: 0.0, cw: 0.55, ch: 1.0 });
  rect(slide, 7.8, 0, 5.53, SLIDE_H, GEO.navyDeep, { transparency: 72 });
  rect(slide, 0, 0, 7.8, SLIDE_H, GEO.navyDeep);
  rect(slide, 7.78, 0, 0.05, SLIDE_H, C.gold);
  slide.addText("01", {
    x: 0.86,
    y: 0.74,
    w: 0.9,
    h: 0.46,
    fontFace: TYPOGRAPHY.display,
    fontSize: 32,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText("BLOQUE 1 · 20 MIN", {
    x: 1.92,
    y: 0.96,
    w: 2.2,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    color: C.red,
    charSpace: 1.2,
    margin: 0,
  });
  bars(slide, 0.88, 1.62, 1.14);
  slide.addText("La basura no\naparece de la nada", {
    x: 0.88,
    y: 2.44,
    w: 6.7,
    h: 1.0,
    fontFace: TYPOGRAPHY.display,
    fontSize: 31.5,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
  });
  slide.addText("Miramos residuos cotidianos como pistas de hábitos, decisiones y espacios compartidos.", {
    x: 0.92,
    y: 4.18,
    w: 5.86,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.8,
    color: "E9EEF4",
    margin: 0,
  });
  thesis(slide, "Si algo aparece todos los días en el mismo lugar, probablemente no es casualidad.", true);
  footer(slide, 4, true);
  validateSlide(slide, pptx);
}

function slide05EverydayWaste() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Activación", "¿Qué residuos vemos todos los días?", "El primer paso es nombrar lo concreto, no hablar de la basura en general.");
  const items = [
    ["botellas", GEO.redSoft, C.red],
    ["latas", C.white, C.navy],
    ["envoltorios", C.white, C.navy],
    ["papel", GEO.blueSoft, C.navy],
    ["cartón", C.white, C.navy],
    ["restos de comida", GEO.greenSoft, GEO.green],
  ];
  items.forEach(([text, fill, color], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    panel(slide, 0.92 + col * 2.08, 2.24 + row * 0.84, 1.74, 0.56, { fill, line: fill === C.white ? C.border : fill, shadow: false });
    slide.addText(text, {
      x: 1.08 + col * 2.08,
      y: 2.44 + row * 0.84,
      w: 1.42,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10,
      bold: true,
      color,
      align: "center",
      margin: 0,
    });
  });
  panel(slide, 0.92, 4.32, 5.94, 0.82, { fill: C.navy, line: C.navy, shadow: false });
  slide.addText("Consigna oral", {
    x: 1.18,
    y: 4.55,
    w: 1.32,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.6,
    bold: true,
    color: C.red,
    charSpace: 0.8,
    margin: 0,
  });
  slide.addText("Nombren un residuo que ven todos los días y dónde aparece.", {
    x: 2.46,
    y: 4.53,
    w: 4.02,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.white,
    margin: 0,
  });
  imageCover(slide, IMG.audit, 8.0, 1.5, 3.9, 3.72, { cx: 0.16, cy: 0.08, cw: 0.64, ch: 0.74 });
  rect(slide, 8.0, 1.5, 3.9, 3.72, C.navy, { transparency: 88, line: C.border, lineTransparency: 0, pt: 0.75 });
  thesis(slide, "Mientras más concreto sea el residuo, más fácil será entender el problema.");
  footer(slide, 5);
  validateSlide(slide, pptx);
}

function slide06WasteAsClue() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Herramienta mental", "Un residuo también es una pista", "La botella no explica todo: importa el lugar, el hábito y la decisión que la rodea.");
  const blocks = [
    ["Residuo", "botella plástica", GEO.redSoft, C.red],
    ["Lugar", "patio / casino", GEO.blueSoft, C.navy],
    ["Hábito", "se mezcla con comida", C.white, GEO.ink],
  ];
  blocks.forEach(([k, v, fill, accent], i) => {
    const x = 0.92 + i * 3.62;
    panel(slide, x, 2.36, 3.0, 1.48, { fill, line: i === 0 ? C.red : C.border, shadow: true });
    slide.addText(k.toUpperCase(), {
      x: x + 0.22,
      y: 2.64,
      w: 1.76,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.6,
      bold: true,
      color: accent,
      charSpace: 0.8,
      margin: 0,
    });
    slide.addText(v, {
      x: x + 0.22,
      y: 3.04,
      w: 2.08,
      h: 0.2,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.8,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    if (i < 2) {
      slide.addText("+", {
        x: x + 3.1,
        y: 2.92,
        w: 0.4,
        h: 0.26,
        fontFace: TYPOGRAPHY.display,
        fontSize: 26,
        bold: true,
        color: C.red,
        align: "center",
        margin: 0,
      });
    }
  });
  panel(slide, 0.92, 4.38, 10.24, 0.84, { fill: C.navy, line: C.navy, shadow: false });
  slide.addText("=  material difícil de recuperar", {
    x: 1.18,
    y: 4.7,
    w: 9.72,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  thesis(slide, "El residuo es la evidencia visible; el hábito también forma parte del problema.");
  footer(slide, 6);
  validateSlide(slide, pptx);
}

function slide07FromObjectToSystem() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Lectura social", "Del objeto al sistema", "Una solución escolar necesita mirar más allá del contenedor.");
  const rows = [
    ["Objeto", "Lo que se ve", "botellas, papeles, envoltorios"],
    ["Práctica", "Lo que se hace", "separar, mezclar, ignorar, retirar"],
    ["Sistema", "Lo que lo permite", "señalética, horarios, cultura, contenedores"],
  ];
  rows.forEach(([a, b, c], i) => {
    const y = 2.0 + i * 1.08;
    panel(slide, 0.92, y, 10.72, 0.74, { fill: i === 2 ? GEO.blueSoft : C.white, line: i === 2 ? GEO.blueSoft : C.border, shadow: false });
    slide.addText(a, {
      x: 1.18,
      y: y + 0.24,
      w: 1.18,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.2,
      bold: true,
      color: i === 0 ? C.red : C.navy,
      margin: 0,
    });
    slide.addText(b, {
      x: 2.72,
      y: y + 0.2,
      w: 2.12,
      h: 0.14,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.8,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(c, {
      x: 5.26,
      y: y + 0.24,
      w: 5.52,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.6,
      bold: true,
      color: C.slate,
      margin: 0,
    });
  });
  panel(slide, 0.92, 5.52, 10.72, 0.62, { fill: C.navy, line: C.navy, shadow: false });
  slide.addText("Problema ambiental = residuo + lugar + hábito + consecuencia", {
    x: 1.18,
    y: 5.75,
    w: 10.2,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  footer(slide, 7);
  validateSlide(slide, pptx);
}

function slide08MiniCase() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Mini caso", "El contenedor está, pero el problema sigue", "El caso sirve para conversar: no para buscar culpables, sino causas.");
  imageCover(slide, IMG.schoolBinFocus, 0.9, 1.64, 4.18, 3.72);
  rect(slide, 0.9, 1.64, 4.18, 3.72, C.navy, { transparency: 90, line: C.border, lineTransparency: 0, pt: 0.75 });
  const qs = [
    ["1", "¿Qué residuo se repite?"],
    ["2", "¿Por qué llega ahí?"],
    ["3", "¿Qué información falta?"],
    ["4", "¿Qué pasaría si nadie lo retira?"],
  ];
  qs.forEach(([n, q], i) => {
    const y = 1.78 + i * 0.86;
    panel(slide, 5.64, y, 5.92, 0.58, { fill: i === 0 ? GEO.redSoft : C.white, line: i === 0 ? C.red : C.border, shadow: false });
    slide.addText(n, {
      x: 5.84,
      y: y + 0.2,
      w: 0.24,
      h: 0.08,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.4,
      bold: true,
      color: C.red,
      margin: 0,
    });
    slide.addText(q, {
      x: 6.24,
      y: y + 0.18,
      w: 4.92,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10,
      bold: true,
      color: C.navy,
      margin: 0,
    });
  });
  thesis(slide, "Una buena pregunta abre posibilidades; una mala pregunta apura una solución débil.");
  footer(slide, 8);
  validateSlide(slide, pptx);
}

function slide09GoodObservation() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Criterio de observación", "¿Qué hace buena a una observación?", "La idea no es opinar más fuerte, sino mirar con más precisión.");
  const cards = [
    ["Concreta", "nombra residuo, lugar y momento", C.red, GEO.redSoft],
    ["Comprobable", "se podría volver a mirar", C.navy, GEO.blueSoft],
    ["Respetuosa", "no culpa personas ni cursos", GEO.green, GEO.greenSoft],
    ["Útil", "ayuda a pensar una mejora", C.navy, C.white],
  ];
  cards.forEach(([title, body, accent, fill], i) => {
    const x = 0.92 + (i % 2) * 5.48;
    const y = 2.16 + Math.floor(i / 2) * 1.4;
    panel(slide, x, y, 4.82, 0.92, { fill, line: fill === C.white ? C.border : fill, shadow: true });
    slide.addText(title, {
      x: x + 0.26,
      y: y + 0.22,
      w: 1.48,
      h: 0.14,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15,
      bold: true,
      color: accent,
      margin: 0,
    });
    slide.addText(body, {
      x: x + 1.86,
      y: y + 0.28,
      w: 2.58,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.6,
      bold: true,
      color: C.slate,
      margin: 0,
    });
  });
  panel(slide, 0.92, 5.32, 10.78, 0.58, { fill: C.navy, line: C.navy, shadow: false });
  slide.addText("Ejemplo: En el patio, después del recreo, quedan botellas mezcladas con restos de comida.", {
    x: 1.2,
    y: 5.54,
    w: 10.2,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.8,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  footer(slide, 9);
  validateSlide(slide, pptx);
}

function slide10BlockQuestions() {
  const slide = pptx.addSlide();
  bg(slide, C.navy);
  bars(slide, 0.86, 0.74, 1.12);
  slide.addText("Cierre del Bloque 1", {
    x: 0.86,
    y: 1.42,
    w: 5.8,
    h: 0.44,
    fontFace: TYPOGRAPHY.display,
    fontSize: 26,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Antes de avanzar, dejamos tres preguntas instaladas.", {
    x: 0.9,
    y: 2.04,
    w: 5.8,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.2,
    color: "DCE6F2",
    margin: 0,
  });
  const questions = [
    "¿Qué residuo se repite más?",
    "¿Dónde aparece con más claridad?",
    "¿Qué hábito o decisión podría estar mostrando?",
  ];
  questions.forEach((q, i) => {
    panel(slide, 0.92, 3.0 + i * 0.82, 6.18, 0.58, { fill: i === 2 ? C.red : "123C69", line: i === 2 ? C.red : "123C69", shadow: false });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: 1.14,
      y: 3.2 + i * 0.82,
      w: 0.32,
      h: 0.08,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.4,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(q, {
      x: 1.64,
      y: 3.18 + i * 0.82,
      w: 5.12,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      bold: true,
      color: C.white,
      margin: 0,
    });
  });
  imageCover(slide, IMG.audit, 8.12, 1.08, 3.82, 4.88, { cx: 0.14, cy: 0.02, cw: 0.62, ch: 0.84 });
  rect(slide, 8.12, 1.08, 3.82, 4.88, GEO.navyDeep, { transparency: 82, line: "FFFFFF", lineTransparency: 72, pt: 0.7 });
  thesis(slide, "Ahora toca mirar cuándo eso se transforma en un problema ambiental.", true);
  footer(slide, 10, true);
  validateSlide(slide, pptx);
}

function slide11Block2Intro() {
  const slide = pptx.addSlide();
  // Overlaps intencionales: foto + velo navy en la franja izquierda, banda de tesis y footer encima.
  imageCover(slide, IMG.schoolBin, 0, 0, 5.56, SLIDE_H, { cx: 0.1, cy: 0.0, cw: 0.66, ch: 0.74 });
  rect(slide, 0, 0, 5.56, SLIDE_H, GEO.navyDeep, { transparency: 68 });
  rect(slide, 5.53, 0, 7.8, SLIDE_H, GEO.navyDeep, { transparency: 2 });
  rect(slide, 5.53, 0, 0.05, SLIDE_H, C.gold);
  slide.addText("02", {
    x: 6.16,
    y: 0.74,
    w: 0.9,
    h: 0.46,
    fontFace: TYPOGRAPHY.display,
    fontSize: 32,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText("BLOQUE 2 · 15 MIN", {
    x: 7.22,
    y: 0.96,
    w: 2.2,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    color: C.red,
    charSpace: 1.2,
    margin: 0,
  });
  bars(slide, 6.18, 1.62, 1.14);
  slide.addText("Cuando el residuo se\ntransforma en problema", {
    x: 6.18,
    y: 2.44,
    w: 6.6,
    h: 1.0,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
  });
  slide.addText("Pasamos de nombrar residuos a entender por qué algunos se vuelven un problema ambiental.", {
    x: 6.22,
    y: 4.18,
    w: 5.9,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.8,
    color: "E9EEF4",
    margin: 0,
  });
  thesis(slide, "Un problema local puede ser pequeño a simple vista, pero importante si se repite todos los días.", true);
  footer(slide, 11, true);
  validateSlide(slide, pptx);
}

function slide12NotADisaster() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Idea clave", "No todo problema se ve como desastre", "Sin humo ni titulares: la mayoría aparece como una escena común y corriente.");
  panel(slide, 0.92, 2.08, 4.42, 3.74, { fill: C.navy, line: C.navy, shadow: true });
  slide.addText("TAMBIÉN SE VE ASÍ", {
    x: 1.22,
    y: 2.5,
    w: 2.6,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    color: C.gold,
    charSpace: 1.1,
    margin: 0,
  });
  slide.addText("Un problema ambiental puede verse completamente cotidiano.", {
    x: 1.22,
    y: 3.16,
    w: 3.84,
    h: 0.84,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19.5,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
  });
  slide.addText("Si solo buscamos catástrofes, los problemas de todos los días pasan inadvertidos.", {
    x: 1.22,
    y: 4.78,
    w: 3.8,
    h: 0.4,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.4,
    color: "DCE6F2",
    margin: 0,
    breakLine: false,
  });
  const signals = [
    ["un basurero que siempre está lleno", GEO.redSoft, C.red],
    ["botellas mezcladas con restos de comida", C.white, C.navy],
    ["papel limpio que termina en basura común", C.white, C.navy],
    ["un punto limpio que casi nadie usa", GEO.blueSoft, C.navy],
    ["contenedores sin señalética clara", C.white, C.navy],
    ["residuos acumulados después del recreo", GEO.greenSoft, GEO.green],
  ];
  signals.forEach(([text, fill, color], i) => {
    const col = Math.floor(i / 3);
    const row = i % 3;
    const x = 5.74 + col * 3.18;
    const y = 2.18 + row * 1.18 + col * 0.52;
    panel(slide, x, y, 2.98, 0.86, { fill, line: fill === C.white ? C.border : fill, shadow: false });
    slide.addText(text, {
      x: x + 0.2,
      y: y + 0.24,
      w: 2.58,
      h: 0.38,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      bold: true,
      color,
      margin: 0,
      breakLine: false,
    });
  });
  thesis(slide, "Una situación pequeña y repetida puede estar mostrando una falla del sistema.");
  footer(slide, 12);
  validateSlide(slide, pptx);
}

function slide13OnceVsDaily() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Distinción", "¿Accidente o costumbre?", "La repetición es la pista más valiosa de todo este taller.");
  panel(slide, 0.92, 2.14, 5.22, 3.06, { fill: C.white, line: C.border, shadow: true });
  slide.addText("OCURRE UNA VEZ", {
    x: 1.22,
    y: 2.56,
    w: 2.4,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    color: C.slate,
    charSpace: 1.0,
    margin: 0,
  });
  slide.addText("Accidente", {
    x: 1.22,
    y: 3.1,
    w: 4.4,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Se limpia, se corrige y no vuelve a aparecer. Todavía no alcanza a ser un patrón.", {
    x: 1.22,
    y: 3.86,
    w: 4.56,
    h: 0.46,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12,
    color: GEO.ink,
    margin: 0,
    breakLine: false,
  });
  panel(slide, 6.5, 2.14, 5.22, 3.06, { fill: C.navy, line: C.navy, shadow: true });
  slide.addText("OCURRE TODOS LOS DÍAS", {
    x: 6.8,
    y: 2.56,
    w: 2.8,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    color: C.red,
    charSpace: 1.0,
    margin: 0,
  });
  slide.addText("Costumbre + entorno", {
    x: 6.8,
    y: 3.1,
    w: 4.6,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Algo lo está produciendo: un hábito, una falta de información o una condición del lugar.", {
    x: 6.8,
    y: 3.86,
    w: 4.56,
    h: 0.46,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12,
    color: "DCE6F2",
    margin: 0,
    breakLine: false,
  });
  slide.addShape(SH.rect, { x: 6.18, y: 3.32, w: 0.28, h: 0.06, fill: { color: C.gold }, line: { color: C.gold } });
  panel(slide, 0.92, 5.5, 10.8, 0.6, { fill: GEO.goldSoft, line: GEO.goldSoft, shadow: false });
  slide.addText("Pregunta al curso: ¿qué situación con residuos se repite tanto que ya nadie la nota?", {
    x: 1.2,
    y: 5.74,
    w: 10.24,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  thesis(slide, "Si ocurre una vez es un accidente; si ocurre todos los días, algo lo está produciendo.");
  footer(slide, 13);
  validateSlide(slide, pptx);
}

function slide14SymptomCauseTool() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Herramienta", "Síntoma, causa y consecuencia", "Tres preguntas para no quedarnos con lo primero que se ve.");
  const cols = [
    ["SÍNTOMA", "Lo que se ve primero", GEO.redSoft, C.red, "Hay basura en el patio"],
    ["CAUSA POSIBLE", "Lo que podría producirlo", GEO.blueSoft, C.navy, "No hay contenedores claros ni cercanos"],
    ["CONSECUENCIA", "Lo que pasa si se mantiene", C.navy, C.white, "Se normaliza botar residuos al suelo"],
  ];
  cols.forEach(([k, body, fill, accent, example], i) => {
    const x = 0.92 + i * 3.78;
    panel(slide, x, 2.1, 3.3, 1.5, { fill, line: fill === C.navy ? C.navy : fill, shadow: true });
    slide.addText(k, {
      x: x + 0.24,
      y: 2.42,
      w: 2.6,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.2,
      bold: true,
      color: accent,
      charSpace: 0.9,
      margin: 0,
    });
    slide.addText(body, {
      x: x + 0.24,
      y: 2.92,
      w: 2.86,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.6,
      bold: true,
      color: fill === C.navy ? C.white : C.navy,
      margin: 0,
      breakLine: false,
    });
    if (i < 2) {
      slide.addShape(SH.chevron, {
        x: x + 3.38,
        y: 2.7,
        w: 0.3,
        h: 0.32,
        fill: { color: C.red, transparency: 16 },
        line: { color: C.red, transparency: 100 },
      });
    }
    slide.addShape(SH.line, {
      x: x + 1.57,
      y: 3.6,
      w: 0,
      h: 0.5,
      line: { color: accent === C.white ? C.navy : accent, pt: 1.0, dashType: "dash" },
    });
    panel(slide, x, 4.1, 3.3, 0.92, { fill: C.white, line: C.border, shadow: false });
    rect(slide, x, 4.1, 0.07, 0.92, accent === C.white ? C.navy : accent);
    slide.addText(example, {
      x: x + 0.26,
      y: 4.38,
      w: 2.86,
      h: 0.36,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.4,
      bold: true,
      color: GEO.ink,
      margin: 0,
      breakLine: false,
    });
  });
  label(slide, "ejemplo trabajado", 5.36, 5.32, 2.6, { fill: GEO.goldSoft, line: GEO.goldSoft, color: C.navy });
  thesis(slide, "Mirar causas no es buscar culpables; es entender qué condiciones repiten el problema.");
  footer(slide, 14);
  validateSlide(slide, pptx);
}

function slide15ThreeCases() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Práctica guiada", "Tres casos para leer juntos", "Antes del trabajo en equipos, aplicamos la herramienta en voz alta.");
  const cases = [
    ["Botellas junto a la comida", [
      ["S", "se mezclan durante el recreo", C.red],
      ["C", "no hay separación en ese momento", C.navy],
      ["Q", "el material reciclable se contamina", GEO.green],
    ], C.red],
    ["El punto limpio sin visitas", [
      ["S", "casi nadie lo usa", C.red],
      ["C", "queda lejos o falta información", C.navy],
      ["Q", "se pierde reciclaje disponible", GEO.green],
    ], C.navy],
    ["El basurero que rebalsa", [
      ["S", "se llena antes del mediodía", C.red],
      ["C", "mucho envase y poco retiro", C.navy],
      ["Q", "el desorden se vuelve lo normal", GEO.green],
    ], C.gold],
  ];
  cases.forEach(([title, rows, accent], i) => {
    const x = 0.92 + i * 3.78;
    panel(slide, x, 2.04, 3.3, 3.58, { fill: C.white, line: C.border, shadow: true });
    rect(slide, x, 2.04, 3.3, 0.09, accent);
    slide.addText(title, {
      x: x + 0.24,
      y: 2.42,
      w: 2.86,
      h: 0.52,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.4,
      bold: true,
      color: C.navy,
      margin: 0,
      breakLine: false,
    });
    rows.forEach(([tag, text, tagColor], j) => {
      const y = 3.42 + j * 0.7;
      slide.addShape(SH.roundRect, {
        x: x + 0.24,
        y,
        w: 0.3,
        h: 0.3,
        rectRadius: 0.05,
        fill: { color: tagColor },
        line: { color: tagColor, transparency: 100 },
      });
      slide.addText(tag === "Q" ? "→" : tag, {
        x: x + 0.24,
        y: y + 0.105,
        w: 0.3,
        h: 0.08,
        fontFace: TYPOGRAPHY.body,
        fontSize: 8.8,
        bold: true,
        color: C.white,
        align: "center",
        margin: 0,
      });
      slide.addText(text, {
        x: x + 0.68,
        y: y - 0.02,
        w: 2.46,
        h: 0.36,
        fontFace: TYPOGRAPHY.body,
        fontSize: 9.8,
        bold: true,
        color: GEO.ink,
        margin: 0,
        breakLine: false,
      });
    });
  });
  label(slide, "S síntoma", 3.32, 5.86, 1.5, { fill: GEO.redSoft, line: GEO.redSoft, color: C.red });
  label(slide, "C causa posible", 5.0, 5.86, 1.7, { fill: GEO.blueSoft, line: GEO.blueSoft, color: C.navy });
  label(slide, "→ consecuencia", 6.88, 5.86, 1.7, { fill: GEO.greenSoft, line: GEO.greenSoft, color: GEO.green });
  thesis(slide, "En problemas reales casi siempre hay varias causas mezcladas; no buscamos una única respuesta.");
  footer(slide, 15);
  validateSlide(slide, pptx);
}

function slide16SixCategories() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Organizar la mirada", "Seis puertas de entrada al problema", "Serán nuestra pauta de observación para el trabajo en equipos.");
  const cats = [
    ["01", "Hábitos", "lo que hacemos de forma repetida", GEO.redSoft, C.red],
    ["02", "Información", "lo que se sabe, se ignora o se comunica mal", C.white, C.navy],
    ["03", "Infraestructura", "contenedores, señalética y espacios", GEO.blueSoft, C.navy],
    ["04", "Retiro y gestión", "qué pasa después de depositar el residuo", C.white, C.navy],
    ["05", "Clasificación", "distinguir materiales y separarlos bien", GEO.greenSoft, GEO.green],
    ["06", "Participación", "compromiso y coordinación entre personas", C.white, C.gold],
  ];
  cats.forEach(([n, title, body, fill, accent], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.92 + col * 3.78;
    const y = 2.12 + row * 1.94;
    panel(slide, x, y, 3.3, 1.66, { fill, line: fill === C.white ? C.border : fill, shadow: true });
    slide.addText(n, {
      x: x + 0.24,
      y: y + 0.3,
      w: 0.6,
      h: 0.14,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      bold: true,
      color: accent,
      margin: 0,
    });
    slide.addText(title, {
      x: x + 0.24,
      y: y + 0.68,
      w: 2.8,
      h: 0.26,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.6,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(body, {
      x: x + 0.26,
      y: y + 1.18,
      w: 2.82,
      h: 0.32,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
      bold: true,
      color: C.slate,
      margin: 0,
      breakLine: false,
    });
  });
  thesis(slide, "Una solución puede ser educativa, organizativa, de señalética, de infraestructura o tecnológica.");
  footer(slide, 16);
  validateSlide(slide, pptx);
}

function slide17Block2Close() {
  const slide = pptx.addSlide();
  bg(slide, C.navy);
  imageCover(slide, IMG.bins, 0.92, 1.08, 3.82, 4.88, { cx: 0.3, cy: 0.12, cw: 0.42, ch: 0.78 });
  rect(slide, 0.92, 1.08, 3.82, 4.88, GEO.navyDeep, { transparency: 82, line: "FFFFFF", lineTransparency: 72, pt: 0.7 });
  bars(slide, 5.42, 0.74, 1.12);
  slide.addText("Cierre del Bloque 2", {
    x: 5.42,
    y: 1.42,
    w: 5.8,
    h: 0.44,
    fontFace: TYPOGRAPHY.display,
    fontSize: 26,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Tres preguntas quedan trabajando para el siguiente bloque.", {
    x: 5.46,
    y: 2.04,
    w: 5.8,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.2,
    color: "DCE6F2",
    margin: 0,
  });
  const questions = [
    "¿Vemos el problema completo o solo un síntoma?",
    "¿Qué parte depende de hábitos y qué parte de información?",
    "¿Qué consecuencia tiene que los residuos se mezclen?",
  ];
  questions.forEach((q, i) => {
    panel(slide, 5.46, 3.0 + i * 0.82, 6.36, 0.58, { fill: i === 2 ? C.red : "123C69", line: i === 2 ? C.red : "123C69", shadow: false });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: 5.68,
      y: 3.2 + i * 0.82,
      w: 0.32,
      h: 0.08,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.4,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(q, {
      x: 6.18,
      y: 3.18 + i * 0.82,
      w: 5.5,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      bold: true,
      color: C.white,
      margin: 0,
    });
  });
  thesis(slide, "En el próximo bloque, cada equipo convierte una situación real en un mapa de problema.", true);
  footer(slide, 17, true);
  validateSlide(slide, pptx);
}

function slide18Block3Intro() {
  const slide = pptx.addSlide();
  bg(slide, GEO.navyDeep);
  // Overlaps intencionales: foto con velo navy en la banda superior.
  imageCover(slide, IMG.rossAudit, 0, 0, SLIDE_W, 4.3, { cx: 0.0, cy: 0.12, cw: 1.0, ch: 0.74 });
  rect(slide, 0, 0, SLIDE_W, 4.3, GEO.navyDeep, { transparency: 56 });
  rect(slide, 0, 4.24, SLIDE_W, 0.06, C.gold);
  slide.addText("03", {
    x: 0.86,
    y: 4.62,
    w: 0.9,
    h: 0.46,
    fontFace: TYPOGRAPHY.display,
    fontSize: 32,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText("BLOQUE 3 · 35 MIN · TRABAJO EN EQUIPOS", {
    x: 1.92,
    y: 4.84,
    w: 4.2,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    color: C.red,
    charSpace: 1.2,
    margin: 0,
  });
  bars(slide, 12.0, 4.58, 1.0);
  slide.addText("Mapa de problemas y clasificación de residuos", {
    x: 0.86,
    y: 5.36,
    w: 11.6,
    h: 0.5,
    fontFace: TYPOGRAPHY.display,
    fontSize: 26.5,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("El taller pasa a manos de los equipos: observar una situación real, ordenarla y ponerla a prueba.", {
    x: 0.9,
    y: 6.0,
    w: 10.6,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.4,
    color: "E9EEF4",
    margin: 0,
  });
  thesis(slide, "Trabajamos sobre escenas reales del colegio, no sobre ideas generales.", true);
  footer(slide, 18, true);
  validateSlide(slide, pptx);
}

function slide19TeamsAndRoles() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Organización", "Cinco equipos, seis miradas", "Los roles no son burocracia: hacen visible que un problema se entiende desde varias perspectivas.");
  // Overlaps intencionales: foto de equipo + velo navy bajo las cifras del panel izquierdo.
  imageCover(slide, IMG.aurariaAudit, 0.92, 2.08, 3.3, 3.94, { cx: 0.0, cy: 0.02, cw: 0.56, ch: 0.96 });
  rect(slide, 0.92, 2.08, 3.3, 3.94, GEO.navyDeep, { transparency: 26 });
  slide.addText("5 × 6", {
    x: 1.2,
    y: 2.66,
    w: 2.7,
    h: 0.5,
    fontFace: TYPOGRAPHY.display,
    fontSize: 38,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("cinco equipos de seis integrantes", {
    x: 1.2,
    y: 3.5,
    w: 2.74,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.8,
    color: "DCE6F2",
    margin: 0,
    breakLine: false,
  });
  slide.addText("una situación real por equipo", {
    x: 1.2,
    y: 4.18,
    w: 2.74,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.8,
    bold: true,
    color: C.gold,
    margin: 0,
    breakLine: false,
  });
  label(slide, "armar equipos · 5 min", 1.2, 5.42, 2.6, { fill: GEO.goldSoft, line: GEO.goldSoft, color: C.navy });
  const roles = [
    ["Coordinación", "mantiene el foco del equipo", C.red],
    ["Registro", "anota acuerdos e ideas", C.navy],
    ["Vocería", "comparte la síntesis al curso", GEO.green],
    ["Causas", "pregunta por qué ocurre", C.navy],
    ["Consecuencias", "pregunta qué pasa si sigue", C.red],
    ["Materiales", "ordena tarjetas y recursos", C.gold],
  ];
  roles.forEach(([title, body, accent], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 4.62 + col * 3.78;
    const y = 2.08 + row * 1.36;
    panel(slide, x, y, 3.3, 1.1, { fill: C.white, line: C.border, shadow: false });
    rect(slide, x, y, 0.07, 1.1, accent);
    slide.addText(title, {
      x: x + 0.26,
      y: y + 0.3,
      w: 2.8,
      h: 0.16,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.8,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(body, {
      x: x + 0.26,
      y: y + 0.74,
      w: 2.86,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
      bold: true,
      color: C.slate,
      margin: 0,
    });
  });
  thesis(slide, "Seis roles simples para que el trabajo no quede concentrado en una sola persona.");
  footer(slide, 19);
  validateSlide(slide, pptx);
}

function slide20PickSituation() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Punto de partida", "Elijan una escena que puedan mirar", "Una situación observable vale más que un tema gigante.");
  components.addMythRealityGrid(slide, SH, {
    x: 0.92,
    y: 1.98,
    w: 10.8,
    h: 3.06,
    columns: 3,
    title: "Tema gigante → escena observable",
    entries: [
      {
        badge: "AMPLIO",
        myth: "“La contaminación”",
        reality: "Mírenlo aquí: el patio después del recreo, cuando quedan botellas fuera del basurero.",
        accent: C.red,
        badgeFill: GEO.redSoft,
        mythFontSize: 14.5,
        realityFontSize: 11,
      },
      {
        badge: "AMPLIO",
        myth: "“El reciclaje”",
        reality: "Mírenlo aquí: el punto limpio cercano que casi nadie visita durante la semana.",
        accent: C.navy,
        badgeFill: GEO.blueSoft,
        mythFontSize: 14.5,
        realityFontSize: 11,
      },
      {
        badge: "AMPLIO",
        myth: "“La basura del mundo”",
        reality: "Mírenlo aquí: los basureros del casino que rebalsan a la hora de colación.",
        accent: C.gold,
        badgeFill: GEO.goldSoft,
        mythFontSize: 14.5,
        realityFontSize: 11,
      },
    ],
  });
  slide.addText("OTRAS ESCENAS POSIBLES", {
    x: 0.94,
    y: 5.78,
    w: 2.6,
    h: 0.14,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    bold: true,
    color: C.red,
    charSpace: 1.0,
    margin: 0,
  });
  [
    ["sala al final de la jornada", GEO.blueSoft, C.navy],
    ["entrada y salida del liceo", GEO.greenSoft, GEO.green],
    ["residuos en casa", GEO.redSoft, C.red],
    ["trayecto casa-colegio", GEO.goldSoft, C.navy],
  ].forEach(([text, fill, color], i) => {
    components.addChip(slide, SH, text, {
      x: 3.62 + i * 2.08,
      y: 5.66,
      w: 1.94,
      h: 0.38,
      fill,
      color,
      fontSize: 9.4,
    });
  });
  thesis(slide, "Si no puedes pararte a mirarlo esta semana, todavía no es tu situación.");
  footer(slide, 20);
  validateSlide(slide, pptx);
}

function slide21ProblemMapSheet() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Mapa de problema", "La ficha que completa cada equipo", "El mapa ordena lo observado; una impresión suelta no alcanza.");
  components.addFormMock(slide, SH, {
    x: 0.92,
    y: 1.9,
    w: 6.5,
    h: 5.0,
    title: "Ficha · Mapa de problema",
    fields: [
      { label: "Lugar o situación" },
      { label: "Residuo principal" },
      { label: "Causa posible" },
      { label: "Consecuencia" },
    ],
    buttonLabel: "Mapa listo",
    buttonW: 1.8,
  });
  const formula = [
    ["residuo", GEO.redSoft, C.red],
    ["+ lugar", GEO.blueSoft, C.navy],
    ["+ hábito", C.white, C.navy],
    ["+ consecuencia", GEO.greenSoft, GEO.green],
  ];
  formula.forEach(([t, fill, color], i) => {
    panel(slide, 7.92, 1.9 + i * 0.66, 3.82, 0.5, { fill, line: fill === C.white ? C.border : fill, shadow: false });
    slide.addText(t, {
      x: 8.14,
      y: 2.05 + i * 0.66,
      w: 3.4,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      bold: true,
      color,
      margin: 0,
    });
  });
  panel(slide, 7.92, 4.6, 3.82, 0.6, { fill: C.navy, line: C.navy, shadow: false });
  slide.addText("= problema mejor observado", {
    x: 8.14,
    y: 4.85,
    w: 3.46,
    h: 0.14,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.4,
    bold: true,
    color: C.white,
    margin: 0,
  });
  panel(slide, 7.92, 5.4, 3.82, 0.78, { fill: C.white, line: C.border, shadow: false });
  slide.addText("Registren también quiénes participan y qué información falta.", {
    x: 8.14,
    y: 5.66,
    w: 3.42,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.6,
    bold: true,
    color: C.slate,
    margin: 0,
    breakLine: false,
  });
  label(slide, "completar el mapa · 15 min", 7.92, 6.38, 2.9, { fill: GEO.goldSoft, line: GEO.goldSoft, color: C.navy });
  footer(slide, 21);
  validateSlide(slide, pptx);
}

function slide22WeakToUseful() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Afinar la frase", "De la queja a la observación", "Una frase vaga expresa molestia; una concreta permite pensar una solución.");
  const pairs = [
    ["“Hay mucha basura.”", "En el patio se mezclan botellas y restos de comida durante los recreos."],
    ["“La gente no recicla.”", "El punto limpio se usa poco porque no se sabe qué materiales recibe."],
    ["“El colegio está sucio.”", "En las salas se acumula papel porque no existe una rutina de separación."],
  ];
  pairs.forEach(([weak, useful], i) => {
    const y = 2.12 + i * 1.32;
    panel(slide, 0.92, y, 3.06, 1.04, { fill: GEO.redSoft, line: GEO.redSoft, shadow: false });
    slide.addText("FRASE DÉBIL", {
      x: 1.14,
      y: y + 0.22,
      w: 1.8,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.2,
      bold: true,
      color: C.red,
      charSpace: 0.8,
      margin: 0,
    });
    slide.addText(weak, {
      x: 1.14,
      y: y + 0.56,
      w: 2.66,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13,
      bold: true,
      color: C.navy,
      margin: 0,
      breakLine: false,
    });
    slide.addShape(SH.chevron, {
      x: 4.14,
      y: y + 0.36,
      w: 0.3,
      h: 0.32,
      fill: { color: C.red, transparency: 16 },
      line: { color: C.red, transparency: 100 },
    });
    panel(slide, 4.66, y, 7.06, 1.04, { fill: C.white, line: C.border, shadow: true });
    rect(slide, 4.66, y, 0.07, 1.04, GEO.green);
    slide.addText("OBSERVACIÓN ÚTIL", {
      x: 4.94,
      y: y + 0.22,
      w: 2.2,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.2,
      bold: true,
      color: GEO.green,
      charSpace: 0.8,
      margin: 0,
    });
    slide.addText(useful, {
      x: 4.94,
      y: y + 0.5,
      w: 6.56,
      h: 0.4,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12,
      bold: true,
      color: GEO.ink,
      margin: 0,
      breakLine: false,
    });
  });
  thesis(slide, "La diferencia no es el largo de la frase: es que se pueda observar y trabajar.");
  footer(slide, 22);
  validateSlide(slide, pptx);
}

function slide23ClassifyDynamic() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Dinámica", "Clasificar y justificar", "El foco no es acertar: es explicar el porqué de cada decisión.");
  const cats = [
    ["Reciclable", "limpio y separado puede recuperarse", GEO.greenSoft, GEO.green],
    ["No reciclable", "va a disposición común", C.white, C.navy],
    ["Orgánico", "restos de comida y vegetales", GEO.goldSoft, C.gold],
    ["Manejo especial", "pilas, electrónicos, aceites", GEO.redSoft, C.red],
    ["Genera duda", "reconocerlo también es aprender", GEO.blueSoft, C.navy],
  ];
  cats.forEach(([title, body, fill, accent], i) => {
    const x = 0.92 + i * 2.24;
    panel(slide, x, 2.1, 2.04, 1.84, { fill, line: fill === C.white ? C.border : fill, shadow: true });
    rect(slide, x, 2.1, 2.04, 0.08, accent);
    slide.addText(title, {
      x: x + 0.16,
      y: 2.46,
      w: 1.74,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.2,
      bold: true,
      color: C.navy,
      margin: 0,
      breakLine: false,
    });
    slide.addText(body, {
      x: x + 0.16,
      y: 3.18,
      w: 1.76,
      h: 0.52,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9,
      bold: true,
      color: C.slate,
      margin: 0,
      breakLine: false,
    });
  });
  panel(slide, 0.92, 4.42, 7.0, 1.62, { fill: C.navy, line: C.navy, shadow: false });
  slide.addText("PARA JUSTIFICAR", {
    x: 1.2,
    y: 4.74,
    w: 2.4,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.6,
    bold: true,
    color: C.gold,
    charSpace: 1.0,
    margin: 0,
  });
  const justify = [
    "¿Qué material lo compone?",
    "¿Qué pasa si está sucio?",
    "¿Se recicla si va mezclado?",
    "¿Qué información falta?",
  ];
  justify.forEach((q, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    slide.addText("· " + q, {
      x: 1.2 + col * 3.35,
      y: 5.12 + row * 0.44,
      w: 3.2,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.4,
      bold: true,
      color: C.white,
      margin: 0,
    });
  });
  // Overlaps intencionales: foto de contenedores con marco y chip de tiempo encima.
  imageCover(slide, IMG.poorSorting, 8.12, 4.42, 3.62, 1.62, { cx: 0.0, cy: 0.1, cw: 0.6, ch: 0.85 });
  rect(slide, 8.12, 4.42, 3.62, 1.62, C.navy, { transparency: 88, line: C.border, lineTransparency: 0, pt: 0.75 });
  label(slide, "clasificación · 10 min", 8.32, 5.56, 2.2, { fill: GEO.goldSoft, line: GEO.goldSoft, color: C.navy });
  thesis(slide, "La categoría “genera duda” existe para no inventar respuestas falsas.");
  footer(slide, 23);
  validateSlide(slide, pptx);
}

function slide24MinimumProducts() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Antes de cerrar", "Dos productos quedan sobre la mesa", "La versión final de la frase se trabaja en el bloque siguiente.");
  const products = [
    ["01", "Mapa de problema completado", "todas las filas de la ficha tienen algo escrito y discutido por el equipo", C.red, GEO.redSoft],
    ["02", "Idea preliminar del problema", "una primera frase, aunque todavía no esté perfecta", C.navy, GEO.blueSoft],
  ];
  products.forEach(([n, title, body, accent, fill], i) => {
    const x = 0.92 + i * 5.56;
    panel(slide, x, 2.14, 5.08, 2.2, { fill, line: fill, shadow: true });
    slide.addText(n, {
      x: x + 0.32,
      y: 2.52,
      w: 0.8,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 20,
      bold: true,
      color: accent,
      margin: 0,
    });
    slide.addText(title, {
      x: x + 0.32,
      y: 3.04,
      w: 4.5,
      h: 0.26,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16.4,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(body, {
      x: x + 0.34,
      y: 3.62,
      w: 4.46,
      h: 0.42,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      bold: true,
      color: C.slate,
      margin: 0,
      breakLine: false,
    });
  });
  slide.addText("AUTOCHEQUEO RÁPIDO · EL MAPA RESPONDE:", {
    x: 0.94,
    y: 4.84,
    w: 5.4,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    bold: true,
    color: C.red,
    charSpace: 0.9,
    margin: 0,
  });
  ["¿dónde ocurre?", "¿qué residuo?", "¿qué hábito?", "¿qué consecuencia?"].forEach((t, i) => {
    label(slide, t, 0.94 + i * 2.78, 5.18, 2.56, { fill: i === 3 ? C.navy : C.white, color: i === 3 ? C.white : C.navy, line: i === 3 ? C.navy : C.border });
  });
  thesis(slide, "Un problema bien descrito permite imaginar mejores soluciones.");
  footer(slide, 24);
  validateSlide(slide, pptx);
}

function slide25Block3Close() {
  const slide = pptx.addSlide();
  bg(slide, C.navy);
  bars(slide, 0.86, 0.74, 1.12);
  slide.addText("Cierre del Bloque 3", {
    x: 0.86,
    y: 1.42,
    w: 5.8,
    h: 0.44,
    fontFace: TYPOGRAPHY.display,
    fontSize: 26,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Cada vocería revisa su trabajo con cuatro preguntas antes del bloque final.", {
    x: 0.9,
    y: 2.04,
    w: 7.2,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.2,
    color: "DCE6F2",
    margin: 0,
  });
  const checks = [
    ["¿La situación ocurre en un lugar claro?", "123C69"],
    ["¿Qué residuo o hábito está al centro?", "123C69"],
    ["¿A quién afecta directa o indirectamente?", "123C69"],
    ["¿Qué residuo generó más duda al clasificar?", C.red],
  ];
  checks.forEach(([q, fill], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.92 + col * 5.84;
    const y = 2.78 + row * 1.5;
    panel(slide, x, y, 5.36, 1.22, { fill, line: fill, shadow: false });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: x + 0.28,
      y: y + 0.32,
      w: 0.5,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.2,
      bold: true,
      color: fill === C.red ? C.white : C.gold,
      margin: 0,
    });
    slide.addText(q, {
      x: x + 0.28,
      y: y + 0.68,
      w: 4.86,
      h: 0.3,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.4,
      bold: true,
      color: C.white,
      margin: 0,
      breakLine: false,
    });
  });
  thesis(slide, "En el bloque final, el mapa se convierte en una frase clara de problema ambiental.", true);
  footer(slide, 25, true);
  validateSlide(slide, pptx);
}

function slide26Block4Intro() {
  const slide = pptx.addSlide();
  bg(slide, GEO.navyDeep);
  // Overlap intencional: número fantasma de gran escala detrás del contenido.
  slide.addText("04", {
    x: 7.8,
    y: 1.3,
    w: 5.2,
    h: 3.6,
    fontFace: TYPOGRAPHY.display,
    fontSize: 230,
    bold: true,
    color: "123C69",
    align: "center",
    margin: 0,
  });
  bars(slide, 0.86, 0.78, 1.36);
  slide.addText("BLOQUE 4 · 20 MIN · SÍNTESIS", {
    x: 0.86,
    y: 1.66,
    w: 4.6,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    bold: true,
    color: C.red,
    charSpace: 1.35,
    margin: 0,
  });
  slide.addText("Nombrar el problema\npara poder transformarlo", {
    x: 0.86,
    y: 2.3,
    w: 6.9,
    h: 1.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 31,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
  });
  slide.addText("El mapa del equipo se convierte en una frase breve, clara y discutible.", {
    x: 0.9,
    y: 4.2,
    w: 6.4,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.8,
    color: "E9EEF4",
    margin: 0,
  });
  thesis(slide, "Lo que se puede nombrar con claridad, se puede transformar.", true);
  footer(slide, 26, true);
  validateSlide(slide, pptx);
}

function slide27SentenceTemplate() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "La frase de problema", "Una plantilla para nombrar bien", "Ni queja ni opinión: una situación que se puede observar, discutir y trabajar.");
  function connector(text, x, y, w) {
    slide.addText(text, {
      x,
      y: y + 0.22,
      w,
      h: 0.2,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.8,
      bold: true,
      color: C.navy,
      margin: 0,
    });
  }
  function segment(text, x, y, w, fill, color) {
    panel(slide, x, y, w, 0.62, { fill, line: fill === C.white ? C.border : fill, shadow: false });
    slide.addText(text, {
      x: x + 0.16,
      y: y + 0.22,
      w: w - 0.32,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.8,
      bold: true,
      color,
      align: "center",
      margin: 0,
    });
  }
  connector("En", 0.94, 2.18, 0.44);
  segment("lugar o situación", 1.48, 2.18, 2.62, GEO.blueSoft, C.navy);
  connector("ocurre", 4.28, 2.18, 1.0);
  segment("problema observable", 5.38, 2.18, 3.1, GEO.redSoft, C.red);
  connector("porque", 0.94, 3.18, 1.06);
  segment("causa posible", 2.1, 3.18, 2.5, C.white, C.navy);
  connector("lo que provoca", 4.78, 3.18, 2.06);
  segment("consecuencia", 6.94, 3.18, 2.5, GEO.greenSoft, GEO.green);
  connector("para", 0.94, 4.18, 0.72);
  segment("personas, comunidad o entorno", 1.76, 4.18, 4.3, GEO.goldSoft, C.navy);
  label(slide, "redactar la frase · 7 min", 9.16, 4.32, 2.5, { fill: GEO.goldSoft, line: GEO.goldSoft, color: C.navy });
  panel(slide, 0.92, 5.12, 10.8, 0.98, { fill: C.navy, line: C.navy, shadow: false });
  slide.addText("EJEMPLO", {
    x: 1.2,
    y: 5.4,
    w: 1.2,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.4,
    bold: true,
    color: C.gold,
    charSpace: 1.0,
    margin: 0,
  });
  slide.addText("En el patio se mezclan botellas y restos de comida durante los recreos porque no hay una separación clara, lo que dificulta recuperar materiales reciclables.", {
    x: 1.2,
    y: 5.62,
    w: 10.2,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.4,
    bold: true,
    color: C.white,
    margin: 0,
    breakLine: false,
  });
  thesis(slide, "Si la frase responde dónde, qué, por qué y con qué consecuencia, está lista.");
  footer(slide, 27);
  validateSlide(slide, pptx);
}

function slide28ShareOut() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Puesta en común", "Cada vocería, en menos de un minuto", "Escuchamos los problemas del curso y buscamos patrones.");
  const steps = [
    ["01", "Lugar o situación elegida", false],
    ["02", "Residuo o hábito principal", false],
    ["03", "Frase de problema", true],
    ["04", "Qué información falta", false],
  ];
  steps.forEach(([n, t, hot], i) => {
    const y = 2.1 + i * 0.92;
    panel(slide, 0.92, y, 5.5, 0.68, { fill: hot ? GEO.redSoft : C.white, line: hot ? C.red : C.border, shadow: false });
    slide.addText(n, {
      x: 1.18,
      y: y + 0.25,
      w: 0.4,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
      bold: true,
      color: hot ? C.red : C.slate,
      margin: 0,
    });
    slide.addText(t, {
      x: 1.7,
      y: y + 0.22,
      w: 4.5,
      h: 0.18,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14,
      bold: true,
      color: C.navy,
      margin: 0,
    });
  });
  label(slide, "30–45 segundos por equipo · 8 min en total", 0.92, 5.84, 3.9, { fill: GEO.goldSoft, line: GEO.goldSoft, color: C.navy });
  panel(slide, 7.0, 2.1, 4.74, 4.08, { fill: C.navy, line: C.navy, shadow: true });
  slide.addText("MIENTRAS ESCUCHAMOS", {
    x: 7.3,
    y: 2.46,
    w: 3.2,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    color: C.gold,
    charSpace: 1.0,
    margin: 0,
  });
  slide.addText("¿Qué se repite entre equipos?", {
    x: 7.3,
    y: 2.86,
    w: 4.2,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.6,
    bold: true,
    color: C.white,
    margin: 0,
  });
  const tags = [
    "separación",
    "información",
    "señalética",
    "material contaminado",
    "hábitos repetidos",
    "retiro y acumulación",
  ];
  tags.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    panel(slide, 7.3 + col * 2.14, 3.5 + row * 0.78, 1.98, 0.54, { fill: "123C69", line: "123C69", shadow: false });
    slide.addText(t, {
      x: 7.36 + col * 2.14,
      y: 3.69 + row * 0.78,
      w: 1.86,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
  });
  thesis(slide, "Los problemas ambientales rara vez son casos aislados; se repiten con formas parecidas.");
  footer(slide, 28);
  validateSlide(slide, pptx);
}

function slide29ExitTicket() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Salida reflexiva", "Tres preguntas en una nota", "En ficha o nota adhesiva; queda como evidencia para retomar en el próximo taller.");
  const qs = [
    ["01", "¿Qué problema ambiental merece atención en nuestro entorno?", GEO.redSoft, C.red],
    ["02", "¿Por qué ese problema importa?", C.white, C.navy],
    ["03", "¿Qué información necesitamos para entenderlo mejor?", GEO.blueSoft, C.navy],
  ];
  qs.forEach(([n, q, fill, accent], i) => {
    const x = 0.92 + i * 3.78;
    panel(slide, x, 2.12, 3.3, 2.4, { fill, line: fill === C.white ? C.border : fill, shadow: true });
    slide.addText(n, {
      x: x + 0.26,
      y: 2.48,
      w: 0.8,
      h: 0.18,
      fontFace: TYPOGRAPHY.display,
      fontSize: 17,
      bold: true,
      color: accent,
      margin: 0,
    });
    slide.addText(q, {
      x: x + 0.26,
      y: 3.06,
      w: 2.82,
      h: 1.0,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.2,
      bold: true,
      color: C.navy,
      margin: 0,
      breakLine: false,
    });
  });
  label(slide, "nota de salida · 5 min", 9.6, 4.86, 2.1, { fill: C.white, line: C.border, color: C.navy });
  panel(slide, 0.92, 4.86, 8.5, 0.94, { fill: GEO.goldSoft, line: GEO.goldSoft, shadow: false });
  slide.addText("Si falta tiempo, una sola línea:", {
    x: 1.2,
    y: 5.12,
    w: 4.2,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.8,
    bold: true,
    color: C.slate,
    margin: 0,
  });
  slide.addText("«El problema que deberíamos seguir mirando es…»", {
    x: 1.2,
    y: 5.42,
    w: 7.9,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.4,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  thesis(slide, "Una respuesta breve y honesta vale más que una respuesta perfecta.");
  footer(slide, 29);
  validateSlide(slide, pptx);
}

function slide30GeoGreenSequence() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Lo que viene", "El problema de hoy guía toda la secuencia", "GeoGreen aparece cuando el problema ya está bien mirado.");
  slide.addShape(SH.line, {
    x: 1.4,
    y: 2.62,
    w: 10.4,
    h: 0,
    line: { color: C.border, pt: 1.4 },
  });
  const stages = [
    ["HOY", "Taller 1", "problema observado", C.red, GEO.redSoft],
    ["", "Taller 2", "ciencia del reciclaje", C.navy, C.white],
    ["", "Taller 3", "sensores y tecnología", C.navy, GEO.blueSoft],
    ["", "Mentorías", "propuesta y prototipo", GEO.green, GEO.greenSoft],
    ["", "Concurso", "pitch de innovación", C.gold, GEO.goldSoft],
  ];
  stages.forEach(([tag, title, body, accent, fill], i) => {
    const x = 0.92 + i * 2.24;
    const cx = x + 1.02;
    slide.addShape(SH.ellipse, {
      x: cx - 0.09,
      y: 2.53,
      w: 0.18,
      h: 0.18,
      fill: { color: accent },
      line: { color: accent, transparency: 100 },
    });
    panel(slide, x, 2.94, 2.04, 1.78, { fill, line: fill === C.white ? C.border : fill, shadow: true });
    if (tag) {
      slide.addText(tag, {
        x: x + 0.16,
        y: 3.18,
        w: 0.9,
        h: 0.1,
        fontFace: TYPOGRAPHY.body,
        fontSize: 8.2,
        bold: true,
        color: C.red,
        charSpace: 1.0,
        margin: 0,
      });
    }
    slide.addText(title, {
      x: x + 0.16,
      y: 3.52,
      w: 1.74,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.4,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(body, {
      x: x + 0.16,
      y: 4.08,
      w: 1.76,
      h: 0.4,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
      bold: true,
      color: C.slate,
      margin: 0,
      breakLine: false,
    });
  });
  panel(slide, 0.92, 5.16, 10.8, 0.86, { fill: C.navy, line: C.navy, shadow: false });
  slide.addText("Una tecnología tiene sentido cuando responde a un problema real. Por eso hoy partimos por mirar.", {
    x: 1.2,
    y: 5.52,
    w: 10.2,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.6,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  thesis(slide, "Sensores y datos vendrán a medir lo que ustedes decidieron que importa.");
  footer(slide, 30);
  validateSlide(slide, pptx);
}

function slide31TakeAways() {
  const slide = pptx.addSlide();
  bg(slide, C.navy);
  bars(slide, 0.86, 0.74, 1.12);
  slide.addText("Lo que nos llevamos", {
    x: 0.86,
    y: 1.42,
    w: 6.4,
    h: 0.44,
    fontFace: TYPOGRAPHY.display,
    fontSize: 26,
    bold: true,
    color: C.white,
    margin: 0,
  });
  const ideas = [
    "Los residuos están conectados con hábitos, lugares, decisiones e información.",
    "Un problema pequeño que se repite todos los días es un problema importante.",
    "Antes de proponer soluciones, hay que observar y formular bien el problema.",
  ];
  ideas.forEach((t, i) => {
    panel(slide, 0.92, 2.34 + i * 0.96, 10.8, 0.72, { fill: "123C69", line: "123C69", shadow: false });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: 1.18,
      y: 2.6 + i * 0.96,
      w: 0.4,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
      bold: true,
      color: C.gold,
      margin: 0,
    });
    slide.addText(t, {
      x: 1.74,
      y: 2.58 + i * 0.96,
      w: 9.7,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.6,
      bold: true,
      color: C.white,
      margin: 0,
    });
  });
  slide.addText("«Hoy no buscamos resolver todo. Buscamos aprender a mirar mejor.»", {
    x: 0.92,
    y: 5.7,
    w: 10.8,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19,
    bold: true,
    color: C.gold,
    align: "center",
    margin: 0,
  });
  footer(slide, 31, true);
  validateSlide(slide, pptx);
}

function slide32Closing() {
  const slide = pptx.addSlide();
  // Overlaps intencionales: foto de cierre con velo navy y contenido centrado encima.
  imageCover(slide, IMG.bins, 0, 0, SLIDE_W, SLIDE_H, { cx: 0.06, cy: 0.18, cw: 0.88, ch: 0.74 });
  rect(slide, 0, 0, SLIDE_W, SLIDE_H, GEO.navyDeep, { transparency: 10 });
  bars(slide, 6.38, 1.18, 1.2);
  slide.addText("GEOGREEN ESCOLAR OSORNO", {
    x: 3.67,
    y: 2.18,
    w: 6.0,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    bold: true,
    color: C.red,
    charSpace: 1.5,
    align: "center",
    margin: 0,
  });
  slide.addText("Gracias por mirar distinto.", {
    x: 1.67,
    y: 2.78,
    w: 10.0,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 36,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("Las frases de problema de cada equipo abren el camino del programa.", {
    x: 2.67,
    y: 3.86,
    w: 8.0,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.8,
    color: "E9EEF4",
    align: "center",
    margin: 0,
  });
  label(slide, "Próxima sesión · Taller 2: la ciencia del reciclaje", 4.42, 4.9, 4.5, { fill: C.white, color: C.navy });
  footer(slide, 32, true);
  validateSlide(slide, pptx);
}

[
  slide01Cover,
  slide02Purpose,
  slide03Map,
  slide04BlockIntro,
  slide05EverydayWaste,
  slide06WasteAsClue,
  slide07FromObjectToSystem,
  slide08MiniCase,
  slide09GoodObservation,
  slide10BlockQuestions,
  slide11Block2Intro,
  slide12NotADisaster,
  slide13OnceVsDaily,
  slide14SymptomCauseTool,
  slide15ThreeCases,
  slide16SixCategories,
  slide17Block2Close,
  slide18Block3Intro,
  slide19TeamsAndRoles,
  slide20PickSituation,
  slide21ProblemMapSheet,
  slide22WeakToUseful,
  slide23ClassifyDynamic,
  slide24MinimumProducts,
  slide25Block3Close,
  slide26Block4Intro,
  slide27SentenceTemplate,
  slide28ShareOut,
  slide29ExitTicket,
  slide30GeoGreenSequence,
  slide31TakeAways,
  slide32Closing,
].forEach((buildSlide) => buildSlide());

pptx.writeFile({ fileName: outputPptx });
