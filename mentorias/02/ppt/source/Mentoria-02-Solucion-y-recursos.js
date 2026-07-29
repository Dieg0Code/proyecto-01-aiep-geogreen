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
  subject: "Mentoría 2 - Solución propuesta y recursos definidos",
  title: "Mentoría 2 - De la idea a un producto mínimo viable",
});

const SH = pptx.ShapeType;
const W = 13.333;
const H = 7.5;
const rootDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "../../../..");
const outputPptx = path.join(rootDir, "Mentoria-02-Solucion-y-recursos.pptx");

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
    "portada-estudiantes-mvp-hardware-software-geogreen.png",
  ),
  prototype: path.join(
    repoRoot,
    "talleres",
    "03",
    "media",
    "fotos",
    "prototipo-oled-geogreen-landscape.png",
  ),
  dashboardMap: path.join(
    repoRoot,
    "mentorias",
    "02",
    "media",
    "capturas",
    "dashboard-geogreen-mapa-osorno.png",
  ),
  dashboardDetail: path.join(
    repoRoot,
    "mentorias",
    "02",
    "media",
    "capturas",
    "dashboard-geogreen-detalle-contenedor.png",
  ),
};

function addImageCrop(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({
    path: imagePath,
    ...imageSizingCrop(imagePath, x, y, w, h),
    ...opts,
  });
}

function addImageContain(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({
    path: imagePath,
    ...imageSizingContain(imagePath, x, y, w, h),
    ...opts,
  });
}

function addTopBars(slide, colors = [C.red, C.cyan, C.gold]) {
  const widths = [0.76, 0.42, 0.22];
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
  const x = opts.x ?? 11.42;
  const y = opts.y ?? 0.22;
  const w = opts.w ?? 1.55;
  const h = opts.h ?? 1.02;
  if (opts.panel) {
    slide.addShape(SH.roundRect, {
      x: x - 0.12,
      y: y - 0.06,
      w: w + 0.24,
      h: h + 0.12,
      rectRadius: 0.04,
      fill: {
        color: opts.panelFill ?? C.white,
        transparency: opts.panelTransparency ?? 4,
      },
      line: { color: opts.panelLine ?? C.white, transparency: 100 },
    });
  }
  addImageContain(slide, opts.white ? IMG.lockupW : IMG.lockup, x, y, w, h);
}

function addFooter(slide, number, opts = {}) {
  const color = opts.white ? C.paleInk : C.slate;
  slide.addText("GeoGreen Escolar · Mentoría 2", {
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
    w: 6.1,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.25,
    color: opts.kickerColor ?? C.red,
    margin: 0,
  });
  slide.addText(title, {
    x: 0.72,
    y: 0.7,
    w: opts.titleW ?? 10.15,
    h: opts.titleH ?? 0.58,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.titleFontSize ?? 27,
    bold: true,
    color: opts.titleColor ?? C.navy,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.74,
      y: opts.subtitleY ?? 1.33,
      w: opts.subtitleW ?? 9.8,
      h: opts.subtitleH ?? 0.4,
      fontFace: TYPOGRAPHY.body,
      fontSize: opts.subtitleFontSize ?? 14.5,
      color: opts.subtitleColor ?? C.slate,
      margin: 0,
    });
  }
  addInstitutionalLockup(slide, { white: opts.whiteLockup });
  addFooter(slide, number, { white: opts.whiteFooter });
}

function addCenteredTextInCircle(slide, text, opts) {
  const inset = 0.01;
  slide.addText(text, {
    x: opts.x + inset,
    y: opts.y + inset,
    w: opts.d - inset * 2,
    h: opts.d - inset * 2,
    fontFace: opts.fontFace ?? TYPOGRAPHY.display,
    fontSize: opts.fontSize,
    bold: opts.bold ?? true,
    color: opts.color,
    align: "center",
    valign: "mid",
    margin: 0,
  });
}

function addNumberCircle(slide, x, y, d, number, color, textColor = C.white) {
  slide.addShape(SH.ellipse, {
    x,
    y,
    w: d,
    h: d,
    fill: { color },
    line: { color: C.white, transparency: 85, pt: 1 },
  });
  addCenteredTextInCircle(slide, number, {
    x,
    y,
    d,
    fontSize: d >= 0.7 ? 14 : 11,
    color: textColor,
  });
}

function addNotesAndValidate(slide, opts = {}) {
  // Fondos, fotografías, etiquetas y conectores se superponen intencionalmente.
  warnIfSlideHasOverlaps(slide, pptx, {
    muteContainment: true,
    ignoreLines: opts.ignoreLines ?? false,
    ignoreDecorativeShapes: opts.ignoreDecorativeShapes ?? false,
  });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

// 01 · Portada
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.cover, 0, 0, W, H);
  slide.addShape(SH.rect, {
    x: 0,
    y: 0,
    w: 6.1,
    h: H,
    fill: { color: C.navyDeep, transparency: 22 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  addTopBars(slide);
  addInstitutionalLockup(slide, {
    white: true,
    panel: true,
    panelFill: C.navyDeep,
    panelTransparency: 10,
    x: 11.4,
    y: 0.26,
    w: 1.54,
    h: 0.98,
  });
  slide.addText("GEOGREEN ESCOLAR · MENTORÍA 2", {
    x: 0.78,
    y: 0.72,
    w: 4.55,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.6,
    bold: true,
    charSpacing: 1.35,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("De la idea a un\nproducto mínimo viable", {
    x: 0.78,
    y: 1.18,
    w: 4.9,
    h: 1.64,
    fontFace: TYPOGRAPHY.display,
    fontSize: 31.5,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
  });
  slide.addText("Solución propuesta y recursos definidos", {
    x: 0.8,
    y: 3.05,
    w: 4.45,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 16.2,
    color: C.paleInk,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 0.78,
    y: 4.02,
    w: 4.38,
    h: 1.06,
    rectRadius: 0.05,
    fill: { color: C.white, transparency: 90 },
    line: { color: C.white, transparency: 72, pt: 1.1 },
  });
  slide.addText("OBSERVAR  →  DECIDIR  →  RESPONDER  →  MOSTRAR", {
    x: 1.06,
    y: 4.27,
    w: 3.84,
    h: 0.25,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("60 minutos · trabajo por equipos", {
    x: 1.1,
    y: 4.64,
    w: 3.76,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.8,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  slide.addText("07 · SEPTIEMBRE · 2026", {
    x: 0.8,
    y: 6.67,
    w: 3.5,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.6,
    bold: true,
    charSpacing: 1.3,
    color: C.white,
    margin: 0,
  });
  addNotesAndValidate(slide);
}

// 02 · Apertura: hardware + software
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La idea central",
    "Una señal se convierte en una decisión",
    "El dispositivo observa el mundo. El software hace que el dato pueda viajar, acumularse y servir.",
    2,
  );

  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 1.92,
    w: 5.15,
    h: 4.72,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.border, pt: 1.1 },
    shadow: { type: "outer", color: "8A96A3", blur: 1.2, angle: 45, distance: 1, opacity: 0.15 },
  });
  addImageCrop(slide, IMG.prototype, 0.86, 2.06, 4.87, 3.68);
  slide.addShape(SH.rect, {
    x: 0.86,
    y: 5.18,
    w: 4.87,
    h: 0.56,
    fill: { color: C.navyDeep, transparency: 8 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  slide.addText("HARDWARE · observa y responde aquí", {
    x: 1.08,
    y: 5.34,
    w: 4.42,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.4,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("Sensor · regla · luz · sonido · pantalla", {
    x: 1.02,
    y: 5.98,
    w: 4.56,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.2,
    color: C.slate,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.chevron, {
    x: 5.9,
    y: 3.63,
    w: 0.56,
    h: 0.88,
    fill: { color: C.red },
    line: { color: C.red },
  });

  slide.addShape(SH.roundRect, {
    x: 6.49,
    y: 1.92,
    w: 6.12,
    h: 4.72,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.border, pt: 1.1 },
    shadow: { type: "outer", color: "8A96A3", blur: 1.2, angle: 45, distance: 1, opacity: 0.15 },
  });
  addImageCrop(slide, IMG.dashboardMap, 6.63, 2.06, 5.84, 3.68);
  slide.addShape(SH.rect, {
    x: 6.63,
    y: 5.18,
    w: 5.84,
    h: 0.56,
    fill: { color: C.navyDeep, transparency: 8 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  slide.addText("SOFTWARE · muestra y permite decidir", {
    x: 6.93,
    y: 5.34,
    w: 5.24,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.4,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("Estado · historial · comparación · alertas · mapa", {
    x: 6.9,
    y: 5.98,
    w: 5.28,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.2,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide);
}

// 03 · Entradas y salida obligatoria
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Continuidad del proyecto",
    "Hoy no comienzan desde cero",
    "Traigan sus decisiones anteriores a la mesa: esta sesión las convierte en un plan construible.",
    3,
  );

  const inputs = [
    {
      n: "01",
      label: "MENTORÍA 1",
      title: "Problema validado",
      body: "Contexto y personas relacionadas.",
      color: C.red,
    },
    {
      n: "02",
      label: "TALLER 3",
      title: "Idea tecnológica inicial",
      body: "Variable, sensor posible y primera lógica.",
      color: C.cyan,
    },
    {
      n: "03",
      label: "ENTRE SESIONES",
      title: "Próximo paso",
      body: "Compromiso verificable del equipo.",
      color: C.gold,
    },
  ];

  inputs.forEach((item, index) => {
    const y = 1.96 + index * 1.42;
    const textColor = item.color === C.gold ? C.navyDeep : C.white;
    slide.addShape(SH.roundRect, {
      x: 0.76,
      y,
      w: 5.18,
      h: 1.14,
      rectRadius: 0.05,
      fill: { color: C.white },
      line: { color: C.border, pt: 1 },
    });
    addNumberCircle(slide, 1.02, y + 0.2, 0.72, item.n, item.color, textColor);
    slide.addText(item.label, {
      x: 1.96,
      y: y + 0.16,
      w: 1.75,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.6,
      bold: true,
      charSpacing: 1.1,
      color: item.color === C.gold ? C.slate : item.color,
      margin: 0,
    });
    const isLongTitle = index === 1;
    slide.addText(item.title, {
      x: 1.96,
      y: y + (isLongTitle ? 0.4 : 0.42),
      w: 2.72,
      h: isLongTitle ? 0.48 : 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: isLongTitle ? 15.2 : 16.2,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(item.body, {
      x: 1.96,
      y: y + (isLongTitle ? 0.9 : 0.76),
      w: 3.55,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.6,
      color: C.slate,
      margin: 0,
    });
  });

  slide.addShape(SH.chevron, {
    x: 5.98,
    y: 3.32,
    w: 0.74,
    h: 1.16,
    fill: { color: C.red },
    line: { color: C.red },
  });

  slide.addShape(SH.roundRect, {
    x: 6.76,
    y: 1.96,
    w: 5.84,
    h: 4.98,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("SALIDA OBLIGATORIA", {
    x: 7.16,
    y: 2.32,
    w: 4.98,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    charSpacing: 1.3,
    color: C.cyan,
    align: "center",
    margin: 0,
  });
  slide.addText("Producto mínimo\nviable definido", {
    x: 7.16,
    y: 2.78,
    w: 4.98,
    h: 0.96,
    fontFace: TYPOGRAPHY.display,
    fontSize: 27,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  const outputItems = [
    "Variable + umbral",
    "Sensor o fuente de datos",
    "Respuesta + capa de software",
    "Recursos + seguridad",
    "Responsables + fechas",
    "Evidencia para Mentoría 3",
  ];
  outputItems.forEach((text, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 7.24 + col * 2.58;
    const y = 4.04 + row * 0.7;
    slide.addShape(SH.ellipse, {
      x,
      y: y + 0.08,
      w: 0.24,
      h: 0.24,
      fill: { color: index === 5 ? C.gold : C.cyan },
      line: { color: index === 5 ? C.gold : C.cyan },
    });
    slide.addText(text, {
      x: x + 0.38,
      y,
      w: 2.04,
      h: 0.38,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.5,
      bold: index === 5,
      color: C.white,
      margin: 0,
      valign: "mid",
    });
  });
  slide.addShape(SH.roundRect, {
    x: 7.22,
    y: 6.22,
    w: 4.92,
    h: 0.46,
    rectRadius: 0.04,
    fill: { color: C.white, transparency: 90 },
    line: { color: C.white, transparency: 76 },
  });
  slide.addText("Debe poder construirse, probarse y explicarse.", {
    x: 7.48,
    y: 6.34,
    w: 4.4,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { ignoreDecorativeShapes: true });
}

// 04 · Mapa de 60 minutos
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Recorrido de la mentoría",
    "60 minutos para dejar una ruta de construcción",
    "Cada bloque toma una decisión que el siguiente necesita.",
    4,
  );

  const stages = [
    { min: "10", title: "DEFINIR", body: "Del problema al MVP.", color: C.red, w: 2.18 },
    { min: "15", title: "MEDIR", body: "Variable, sensor y umbral.", color: C.cyan, w: 2.56 },
    { min: "20", title: "ACOTAR", body: "Recursos, software y seguridad.", color: C.navy, w: 3.26 },
    { min: "12", title: "REPARTIR", body: "Tareas, rama y evidencia.", color: C.green, w: 2.38 },
    { min: "03", title: "CERRAR", body: "Ficha y próximo paso.", color: C.gold, w: 1.64 },
  ];
  let x = 0.72;
  stages.forEach((stage, index) => {
    const textColor = stage.color === C.gold ? C.navyDeep : C.white;
    slide.addShape(SH.roundRect, {
      x,
      y: 2.12,
      w: stage.w,
      h: 3.72,
      rectRadius: 0.05,
      fill: { color: stage.color },
      line: { color: stage.color },
    });
    addNumberCircle(
      slide,
      x + stage.w / 2 - 0.44,
      2.52,
      0.88,
      stage.min,
      stage.color === C.gold ? C.white : C.white,
      stage.color === C.gold ? C.navy : stage.color,
    );
    slide.addText("MIN", {
      x: x + stage.w / 2 - 0.42,
      y: 3.48,
      w: 0.84,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.5,
      bold: true,
      charSpacing: 1.1,
      color: textColor,
      align: "center",
      margin: 0,
    });
    slide.addText(stage.title, {
      x: x + 0.18,
      y: 4.02,
      w: stage.w - 0.36,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: stage.w < 1.8 ? 13.5 : 16,
      bold: true,
      color: textColor,
      align: "center",
      margin: 0,
    });
    slide.addText(stage.body, {
      x: x + 0.24,
      y: 4.54,
      w: stage.w - 0.48,
      h: 0.72,
      fontFace: TYPOGRAPHY.body,
      fontSize: stage.w < 1.8 ? 10.4 : 11.8,
      color: textColor,
      align: "center",
      valign: "mid",
      margin: 0,
    });
    x += stage.w + 0.12;
  });

  slide.addShape(SH.roundRect, {
    x: 2.2,
    y: 6.18,
    w: 8.92,
    h: 0.58,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Al terminar: una solución definida, una semana útil de trabajo y evidencia comprometida.", {
    x: 2.56,
    y: 6.35,
    w: 8.2,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.3,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { ignoreDecorativeShapes: true });
}

// 05 · Apertura del Bloque 1
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("BLOQUE 1 · 10 MINUTOS", {
    x: 0.74,
    y: 0.46,
    w: 4.6,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.35,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Una solución se describe\npor su función", {
    x: 0.74,
    y: 0.9,
    w: 6.18,
    h: 1.08,
    fontFace: TYPOGRAPHY.display,
    fontSize: 29,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("No por la lista de piezas que contiene.", {
    x: 0.76,
    y: 2.12,
    w: 5.52,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.6,
    color: C.paleInk,
    margin: 0,
  });

  const functions = [
    { n: "01", verb: "OBSERVAR", q: "¿Qué cambia?", color: C.red },
    { n: "02", verb: "DECIDIR", q: "¿Con qué condición?", color: C.cyan },
    { n: "03", verb: "RESPONDER", q: "¿Qué ocurre aquí?", color: C.gold },
    { n: "04", verb: "MOSTRAR", q: "¿Quién puede actuar?", color: C.green },
  ];
  functions.forEach((item, index) => {
    const x = 0.8 + index * 3.12;
    const textColor = item.color === C.gold ? C.navyDeep : C.white;
    slide.addShape(SH.roundRect, {
      x,
      y: 3.0,
      w: 2.64,
      h: 2.12,
      rectRadius: 0.05,
      fill: { color: C.white, transparency: 94 },
      line: { color: item.color, pt: 1.4 },
    });
    addNumberCircle(slide, x + 0.89, 3.27, 0.86, item.n, item.color, textColor);
    slide.addText(item.verb, {
      x: x + 0.2,
      y: 4.28,
      w: 2.24,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.5,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
    slide.addText(item.q, {
      x: x + 0.2,
      y: 4.7,
      w: 2.24,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.4,
      color: C.paleInk,
      align: "center",
      margin: 0,
    });
    if (index < functions.length - 1) {
      slide.addShape(SH.chevron, {
        x: x + 2.67,
        y: 3.69,
        w: 0.38,
        h: 0.72,
        fill: { color: C.cyan },
        line: { color: C.cyan },
      });
    }
  });

  slide.addShape(SH.roundRect, {
    x: 1.38,
    y: 5.68,
    w: 10.56,
    h: 0.92,
    rectRadius: 0.05,
    fill: { color: C.white },
    line: { color: C.white },
  });
  slide.addText("DESAFÍO", {
    x: 1.72,
    y: 5.94,
    w: 1.2,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    charSpacing: 1.2,
    color: C.red,
    margin: 0,
  });
  slide.addText("Describan su solución sin nombrar ningún componente.", {
    x: 3.0,
    y: 5.87,
    w: 7.98,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17.2,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText("Si solo aparece “Arduino + sensor + alarma”, todavía falta el propósito.", {
    x: 3.0,
    y: 6.25,
    w: 7.98,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.3,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 5, { white: true });
  addNotesAndValidate(slide);
}

// 06 · Definición operativa de MVP
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Producto mínimo viable",
    "La versión más pequeña que ya sirve",
    "No necesita estar terminada: necesita medir, decidir, responder y poder mostrarse.",
    6,
  );

  const proofs = [
    { n: "01", title: "MIDE ALGO REAL", body: "La lectura cambia y puede repetirse.", color: C.red },
    { n: "02", title: "DECIDE CON SU REGLA", body: "El umbral tiene un origen explicable.", color: C.cyan },
    { n: "03", title: "RESPONDE", body: "El cambio se ve, se oye o produce una acción.", color: C.gold },
    { n: "04", title: "SE MUESTRA", body: "Otra persona entiende qué está pasando.", color: C.green },
  ];
  proofs.forEach((item, index) => {
    const y = 1.95 + index * 1.1;
    const textColor = item.color === C.gold ? C.navyDeep : C.white;
    slide.addShape(SH.roundRect, {
      x: 0.76,
      y,
      w: 5.06,
      h: 0.9,
      rectRadius: 0.05,
      fill: { color: C.white },
      line: { color: item.color, pt: 1.15 },
    });
    addNumberCircle(slide, 0.98, y + 0.13, 0.64, item.n, item.color, textColor);
    slide.addText(item.title, {
      x: 1.84,
      y: y + 0.14,
      w: 2.64,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.4,
      bold: true,
      color: item.color === C.gold ? C.navy : item.color,
      margin: 0,
    });
    slide.addText(item.body, {
      x: 1.84,
      y: y + 0.48,
      w: 3.62,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.4,
      color: C.slate,
      margin: 0,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 6.1,
    y: 1.95,
    w: 6.5,
    h: 4.98,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.border, pt: 1.1 },
  });
  addImageCrop(slide, IMG.dashboardDetail, 6.24, 2.09, 6.22, 3.5);
  slide.addShape(SH.rect, {
    x: 6.24,
    y: 4.88,
    w: 6.22,
    h: 0.71,
    fill: { color: C.navyDeep, transparency: 6 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  slide.addText("Una lectura se vuelve información cuando alguien puede comprenderla y actuar.", {
    x: 6.66,
    y: 5.06,
    w: 5.38,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.2,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("HARDWARE", {
    x: 6.55,
    y: 5.92,
    w: 1.38,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    charSpacing: 1.1,
    color: C.red,
    align: "center",
    margin: 0,
  });
  slide.addText("+", {
    x: 8.0,
    y: 5.87,
    w: 0.42,
    h: 0.3,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText("SOFTWARE", {
    x: 8.48,
    y: 5.92,
    w: 1.46,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    charSpacing: 1.1,
    color: C.cyan,
    align: "center",
    margin: 0,
  });
  slide.addText("=", {
    x: 9.98,
    y: 5.87,
    w: 0.42,
    h: 0.3,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 10.42,
    y: 5.78,
    w: 1.7,
    h: 0.52,
    rectRadius: 0.04,
    fill: { color: C.greenSoft },
    line: { color: C.green, pt: 1 },
  });
  slide.addText("PROPUESTA DE VALOR", {
    x: 10.55,
    y: 5.93,
    w: 1.44,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 10.4,
    bold: true,
    color: C.green,
    align: "center",
    margin: 0,
  });
  slide.addText("No basta con que encienda. Debe quedar claro qué observa, qué significa y para quién sirve.", {
    x: 6.62,
    y: 6.46,
    w: 5.46,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.5,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide);
}

// 07 · Regla de las dos velocidades
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Método de trabajo",
    "Dos velocidades para avanzar de verdad",
    "Aceleren donde el agente multiplica el trabajo. Frenen donde una equivocación puede dañar el montaje.",
    7,
  );

  slide.addShape(SH.roundRect, {
    x: 0.74,
    y: 1.94,
    w: 5.78,
    h: 3.56,
    rectRadius: 0.06,
    fill: { color: C.cyanSoft },
    line: { color: C.cyan, pt: 1.2 },
  });
  slide.addShape(SH.ellipse, {
    x: 1.08,
    y: 2.24,
    w: 0.82,
    h: 0.82,
    fill: { color: C.cyan },
    line: { color: C.cyan },
  });
  addCenteredTextInCircle(slide, ">>", {
    x: 1.08,
    y: 2.24,
    d: 0.82,
    fontSize: 16,
    color: C.white,
  });
  slide.addText("RÁPIDO CON EL AGENTE", {
    x: 2.14,
    y: 2.32,
    w: 3.82,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Investigar · comparar · comprender · calcular\nprogramar · diseñar · planificar · explicar", {
    x: 1.08,
    y: 3.22,
    w: 4.96,
    h: 0.82,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15,
    color: C.ink,
    breakLine: false,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 1.16,
    y: 4.42,
    w: 4.82,
    h: 0.66,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.cyan, transparency: 55 },
  });
  slide.addText("El agente entrega velocidad. El equipo entrega criterio.", {
    x: 1.48,
    y: 4.62,
    w: 4.18,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.3,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 6.8,
    y: 1.94,
    w: 5.78,
    h: 3.56,
    rectRadius: 0.06,
    fill: { color: C.redSoft },
    line: { color: C.red, pt: 1.2 },
  });
  slide.addShape(SH.ellipse, {
    x: 7.14,
    y: 2.24,
    w: 0.82,
    h: 0.82,
    fill: { color: C.red },
    line: { color: C.red },
  });
  addCenteredTextInCircle(slide, "!", {
    x: 7.14,
    y: 2.24,
    d: 0.82,
    fontSize: 20,
    color: C.white,
  });
  slide.addText("DESPACIO CON EL MONTAJE", {
    x: 8.2,
    y: 2.32,
    w: 3.92,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Voltaje · polaridad · tierra común\nresistencias · cables · conexión · energía", {
    x: 7.14,
    y: 3.22,
    w: 4.96,
    h: 0.82,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15,
    color: C.ink,
    breakLine: false,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 7.22,
    y: 4.42,
    w: 4.82,
    h: 0.66,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.red, transparency: 55 },
  });
  slide.addText("Un agente explica conexiones. No puede ver sus cables.", {
    x: 7.54,
    y: 4.62,
    w: 4.18,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.3,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  const method = ["CONTEXTO", "TAREA PEQUEÑA", "VERIFICAR", "DECIDIR"];
  method.forEach((label, index) => {
    const x = 1.46 + index * 2.7;
    const color = [C.red, C.cyan, C.gold, C.green][index];
    const textColor = color === C.gold ? C.navyDeep : C.white;
    addNumberCircle(slide, x, 5.88, 0.56, String(index + 1), color, textColor);
    slide.addText(label, {
      x: x + 0.7,
      y: 5.97,
      w: 1.66,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.4,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    if (index < method.length - 1) {
      slide.addShape(SH.line, {
        x: x + 2.12,
        y: 6.16,
        w: 0.44,
        h: 0,
        line: { color: C.border, pt: 1.8, endArrowType: "triangle" },
      });
    }
  });
  slide.addShape(SH.roundRect, {
    x: 2.02,
    y: 6.55,
    w: 9.3,
    h: 0.38,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Usar un agente no es hacer trampa. Entregar algo que no pueden explicar, sí.", {
    x: 2.36,
    y: 6.64,
    w: 8.62,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.1,
    bold: true,
    color: C.white,
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
