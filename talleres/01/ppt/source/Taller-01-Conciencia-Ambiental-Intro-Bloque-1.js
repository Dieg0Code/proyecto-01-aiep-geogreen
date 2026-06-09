const path = require("path");
const PptxGenJS = require("../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../tools/slides-system");
const { imageSizingCrop } = require("../../../../tools/slides-system/vendor/pptxgenjs_helpers/image");

const { theme, utils } = slidesSystem;
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
const outputPptx = path.join(rootDir, "Taller-01-Conciencia-Ambiental-Intro-Bloque-1.pptx");
const imgDir = path.resolve(__dirname, "assets/images");

const IMG = {
  bins: path.join(imgDir, "recycling-bins-orchard-road.jpg"),
  schoolBin: path.join(imgDir, "school-recycling-bin-lagos.jpg"),
  schoolBinCrop: path.join(imgDir, "school-recycling-bin-lagos-crop.jpg"),
  schoolBinFocus: path.join(imgDir, "school-recycling-bin-lagos-bin-focus.jpg"),
  poorSorting: path.join(imgDir, "poor-recycling-education-sydney.jpg"),
  poorSortingCrop: path.join(imgDir, "poor-recycling-education-sydney-crop.jpg"),
  audit: path.join(imgDir, "recycling-sorting-audit.jpg"),
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
    fontSize: 8.2,
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
      fontSize: 10.4,
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
    fontSize: 7.4,
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
    fontSize: 6.8,
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
    fontSize: 8.9,
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
  imageCover(slide, IMG.bins, 0, 0, SLIDE_W, SLIDE_H, { cx: 0.08, cy: 0.05, cw: 0.84, ch: 0.9 });
  rect(slide, 0, 0, SLIDE_W, SLIDE_H, GEO.navyDeep, { transparency: 14 });
  rect(slide, 0, 0, 7.3, SLIDE_H, GEO.navyDeep, { transparency: 4 });
  bars(slide, 0.86, 0.78, 1.36);
  slide.addText("GEOGREEN ESCOLAR OSORNO", {
    x: 0.86,
    y: 1.58,
    w: 5.2,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.3,
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
    fontSize: 13.4,
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
      fontSize: 9.2,
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
      fontSize: 8.6,
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
  imageCover(slide, IMG.poorSortingCrop, 0, 0, SLIDE_W, SLIDE_H);
  rect(slide, 0, 0, SLIDE_W, SLIDE_H, GEO.navyDeep, { transparency: 18 });
  rect(slide, 0, 0, 7.8, SLIDE_H, GEO.navyDeep, { transparency: 2 });
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
    fontSize: 8,
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
    fontSize: 14,
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
      fontSize: 9.2,
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
    fontSize: 7.8,
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
    fontSize: 9.2,
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
    const x = 0.92 + i * 3.15;
    panel(slide, x, 2.36, 2.5, 1.48, { fill, line: i === 0 ? C.red : C.border, shadow: true });
    slide.addText(k.toUpperCase(), {
      x: x + 0.22,
      y: 2.64,
      w: 1.76,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 7.8,
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
        x: x + 2.62,
        y: 2.92,
        w: 0.34,
        h: 0.26,
        fontFace: TYPOGRAPHY.display,
        fontSize: 24,
        bold: true,
        color: C.red,
        align: "center",
        margin: 0,
      });
    }
  });
  slide.addText("=", {
    x: 10.32,
    y: 2.92,
    w: 0.34,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 24,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  panel(slide, 0.92, 4.38, 10.28, 0.74, { fill: C.navy, line: C.navy, shadow: false });
  slide.addText("material difícil de recuperar", {
    x: 1.18,
    y: 4.64,
    w: 9.72,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17.2,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  panel(slide, 11.42, 2.18, 0.76, 3.24, { fill: GEO.redSoft, line: GEO.redSoft, shadow: false });
  slide.addText("pista", {
    x: 11.52,
    y: 3.48,
    w: 0.56,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.4,
    bold: true,
    color: C.red,
    rotate: 90,
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
      fontSize: 8.4,
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
      fontSize: 14,
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
      fontSize: 8.8,
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
    fontSize: 9.4,
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
      fontSize: 7.6,
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
      fontSize: 9.2,
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
      fontSize: 8.8,
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
    fontSize: 8.9,
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
    fontSize: 11.4,
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
      fontSize: 7.6,
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
      fontSize: 9.4,
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
].forEach((buildSlide) => buildSlide());

pptx.writeFile({ fileName: outputPptx });
