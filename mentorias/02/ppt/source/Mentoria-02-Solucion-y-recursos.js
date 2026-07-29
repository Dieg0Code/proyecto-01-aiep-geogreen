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
  systemFlow: path.join(
    repoRoot,
    "talleres",
    "03",
    "media",
    "generadas",
    "sistema-geogreen-sensor-dato-respuesta.png",
  ),
  sensorDistance: path.join(repoRoot, "banco-ideas", "assets", "hc-sr04.jpg"),
  sensorAir: path.join(repoRoot, "banco-ideas", "assets", "ky-015.jpg"),
  sensorTemperature: path.join(repoRoot, "banco-ideas", "assets", "ky-001.jpg"),
  sensorLight: path.join(repoRoot, "banco-ideas", "assets", "ky-018.jpg"),
  sensorSoil: path.join(repoRoot, "banco-ideas", "assets", "soil-moisture.jpg"),
  sensorWater: path.join(repoRoot, "banco-ideas", "assets", "water-level.jpg"),
  sensorMagnetic: path.join(repoRoot, "banco-ideas", "assets", "ky-021.jpg"),
  outputLight: path.join(repoRoot, "banco-ideas", "assets", "ky-011.jpg"),
  outputBuzzer: path.join(repoRoot, "banco-ideas", "assets", "ky-012.jpg"),
  outputRelay: path.join(repoRoot, "banco-ideas", "assets", "ky-019.jpg"),
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
  if (!opts.skipOverlap) {
    warnIfSlideHasOverlaps(slide, pptx, {
      muteContainment: true,
      ignoreLines: opts.ignoreLines ?? false,
      ignoreDecorativeShapes: opts.ignoreDecorativeShapes ?? false,
    });
  }
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
    {
      x: 0.72,
      w: 2.12,
      min: "10",
      title: "DEFINIR",
      body: "Problema → MVP",
      output: "FUNCIÓN",
      color: C.red,
    },
    {
      x: 2.98,
      w: 2.22,
      min: "15",
      title: "MEDIR",
      body: "Variable + sensor + umbral",
      output: "REGLA",
      color: C.cyan,
    },
    {
      x: 5.34,
      w: 3.08,
      min: "20",
      title: "ACOTAR",
      body: "Recursos + software + seguridad",
      output: "ALCANCE",
      color: C.navy,
    },
    {
      x: 8.56,
      w: 2.24,
      min: "12",
      title: "REPARTIR",
      body: "Tareas + rama + evidencia",
      output: "PLAN",
      color: C.green,
    },
    {
      x: 10.94,
      w: 1.66,
      min: "03",
      title: "CERRAR",
      body: "Ficha + próximo paso",
      output: "COMPROMISO",
      color: C.gold,
    },
  ];

  slide.addText("0′", {
    x: 0.73,
    y: 2.08,
    w: 0.46,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.5,
    bold: true,
    color: C.slate,
    margin: 0,
  });
  slide.addText("60′", {
    x: 12.17,
    y: 2.08,
    w: 0.44,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.5,
    bold: true,
    color: C.navy,
    align: "right",
    margin: 0,
  });
  slide.addShape(SH.line, {
    x: 1.18,
    y: 2.42,
    w: 10.94,
    h: 0,
    line: { color: C.navy, pt: 3, endArrowType: "triangle" },
  });

  stages.forEach((stage, index) => {
    const textColor = stage.color === C.gold ? C.navyDeep : C.white;
    const cx = stage.x + stage.w / 2;

    slide.addShape(SH.ellipse, {
      x: cx - 0.31,
      y: 2.11,
      w: 0.62,
      h: 0.62,
      fill: { color: stage.color },
      line: { color: C.white, pt: 1.3 },
    });
    addCenteredTextInCircle(slide, String(index + 1), {
      x: cx - 0.31,
      y: 2.11,
      d: 0.62,
      fontSize: 11.2,
      color: textColor,
    });

    slide.addShape(SH.roundRect, {
      x: stage.x,
      y: 3.02,
      w: stage.w,
      h: 2.76,
      rectRadius: 0.05,
      fill: { color: C.white },
      line: { color: stage.color, pt: 1.2 },
    });
    slide.addShape(SH.rect, {
      x: stage.x,
      y: 3.02,
      w: stage.w,
      h: 0.16,
      fill: { color: stage.color },
      line: { color: stage.color },
    });
    slide.addText(stage.min, {
      x: stage.x + 0.18,
      y: 3.38,
      w: stage.w - 0.36,
      h: 0.5,
      fontFace: TYPOGRAPHY.display,
      fontSize: stage.w < 1.8 ? 22 : 26,
      bold: true,
      color: stage.color === C.gold ? C.navy : stage.color,
      align: "center",
      margin: 0,
    });
    slide.addText("MINUTOS", {
      x: stage.x + 0.2,
      y: 3.89,
      w: stage.w - 0.4,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: stage.w < 1.8 ? 8.6 : 9.3,
      bold: true,
      charSpacing: 1.1,
      color: C.slate,
      align: "center",
      margin: 0,
    });
    slide.addText(stage.title, {
      x: stage.x + 0.18,
      y: 4.28,
      w: stage.w - 0.36,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: stage.w < 1.8 ? 12.5 : 15.2,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(stage.body, {
      x: stage.x + 0.2,
      y: 4.75,
      w: stage.w - 0.48,
      h: 0.5,
      fontFace: TYPOGRAPHY.body,
      fontSize: stage.w < 1.8 ? 9.6 : 10.8,
      color: C.slate,
      align: "center",
      valign: "mid",
      margin: 0,
    });
    slide.addShape(SH.roundRect, {
      x: stage.x + 0.18,
      y: 5.35,
      w: stage.w - 0.36,
      h: 0.34,
      rectRadius: 0.04,
      fill: { color: stage.color === C.gold ? C.goldSoft : stage.color, transparency: stage.color === C.gold ? 0 : 88 },
      line: { color: stage.color, transparency: 65 },
    });
    slide.addText(`SALE · ${stage.output}`, {
      x: stage.x + 0.28,
      y: 5.44,
      w: stage.w - 0.56,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: stage.w < 1.8 ? 8.1 : 9.2,
      bold: true,
      charSpacing: stage.w < 1.8 ? 0.45 : 0.8,
      color: stage.color === C.gold ? C.navy : stage.color,
      align: "center",
      margin: 0,
    });
  });

  slide.addShape(SH.chevron, {
    x: 1.36,
    y: 6.08,
    w: 10.62,
    h: 0.68,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("UNA DECISIÓN ALIMENTA LA SIGUIENTE", {
    x: 1.9,
    y: 6.2,
    w: 3.2,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.8,
    bold: true,
    charSpacing: 0.9,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Al final: solución definida + semana útil + evidencia comprometida", {
    x: 5.28,
    y: 6.18,
    w: 5.85,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 05 · Apertura del Bloque 1
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  slide.addShape(SH.rect, {
    x: 0,
    y: 0,
    w: 4.18,
    h: H,
    fill: { color: C.navyDeep },
    line: { color: C.navyDeep },
  });
  addTopBars(slide);
  addInstitutionalLockup(slide);
  slide.addText("BLOQUE 1 · 10 MINUTOS", {
    x: 0.74,
    y: 0.52,
    w: 3.0,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.35,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Una solución\nse describe por\nsu función", {
    x: 0.74,
    y: 1.0,
    w: 3.05,
    h: 1.45,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Las piezas dicen con qué.\nLa función explica para qué.", {
    x: 0.76,
    y: 2.62,
    w: 2.94,
    h: 0.58,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15,
    color: C.paleInk,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 3.55,
    w: 2.98,
    h: 0.88,
    rectRadius: 0.04,
    fill: { color: C.white, transparency: 94 },
    line: { color: C.red, pt: 1.1 },
  });
  slide.addText("PIEZAS", {
    x: 0.98,
    y: 3.75,
    w: 0.72,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    bold: true,
    charSpacing: 1.1,
    color: C.red,
    margin: 0,
  });
  slide.addText("Arduino + sensor + alarma", {
    x: 1.76,
    y: 3.69,
    w: 1.66,
    h: 0.3,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.chevron, {
    x: 1.85,
    y: 4.55,
    w: 0.72,
    h: 0.46,
    rotate: 90,
    fill: { color: C.cyan },
    line: { color: C.cyan },
  });
  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 5.12,
    w: 2.98,
    h: 1.12,
    rectRadius: 0.05,
    fill: { color: C.cyan, transparency: 88 },
    line: { color: C.cyan, pt: 1.2 },
  });
  slide.addText("FUNCIÓN", {
    x: 0.98,
    y: 5.34,
    w: 0.88,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    bold: true,
    charSpacing: 1.2,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Observar → decidir\n→ responder → mostrar", {
    x: 1.02,
    y: 5.64,
    w: 2.38,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.8,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });

  addImageCrop(slide, IMG.systemFlow, 4.34, 2.15, 8.48, 3.48);

  const functions = [
    { x: 4.45, n: "01", verb: "OBSERVAR", q: "¿Qué cambia?", color: C.red },
    { x: 6.48, n: "02", verb: "DECIDIR", q: "¿Con qué regla?", color: C.cyan },
    { x: 8.56, n: "03", verb: "RESPONDER", q: "¿Qué ocurre?", color: C.gold },
    { x: 10.68, n: "04", verb: "MOSTRAR", q: "¿Quién actúa?", color: C.green },
  ];
  functions.forEach((item) => {
    const textColor = item.color === C.gold ? C.navyDeep : C.white;
    slide.addShape(SH.roundRect, {
      x: item.x,
      y: 1.52,
      w: 1.72,
      h: 0.76,
      rectRadius: 0.04,
      fill: { color: C.white, transparency: 4 },
      line: { color: item.color, pt: 1.2 },
    });
    addNumberCircle(slide, item.x + 0.12, 1.64, 0.48, item.n, item.color, textColor);
    slide.addText(item.verb, {
      x: item.x + 0.67,
      y: 1.64,
      w: 1.0,
      h: 0.2,
      fontFace: TYPOGRAPHY.display,
      fontSize: 9.6,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(item.q, {
      x: item.x + 0.64,
      y: 1.93,
      w: 0.98,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      color: C.slate,
      align: "center",
      margin: 0,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 4.76,
    y: 6.0,
    w: 7.46,
    h: 0.78,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("DESAFÍO · 30 SEGUNDOS", {
    x: 5.06,
    y: 6.16,
    w: 1.74,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.2,
    bold: true,
    charSpacing: 1,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Describan su solución sin nombrar componentes.", {
    x: 6.82,
    y: 6.11,
    w: 4.98,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.4,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("Si solo aparecen piezas, todavía falta el propósito.", {
    x: 6.82,
    y: 6.42,
    w: 4.98,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.8,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  slide.addText("GeoGreen Escolar · Mentoría 2", {
    x: 0.72,
    y: 7.12,
    w: 3.1,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    color: C.paleInk,
    margin: 0,
  });
  slide.addText("05", {
    x: 11.72,
    y: 7.03,
    w: 0.86,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color: C.navy,
    align: "right",
    margin: 0,
  });
  addNotesAndValidate(slide, { skipOverlap: true });
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
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("MÉTODO DE TRABAJO", {
    x: 0.72,
    y: 0.42,
    w: 3.5,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    charSpacing: 1.25,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Dos velocidades para avanzar de verdad", {
    x: 0.72,
    y: 0.8,
    w: 9.9,
    h: 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Aceleren donde el agente multiplica el trabajo. Frenen donde una equivocación puede dañar el montaje.", {
    x: 0.74,
    y: 1.43,
    w: 9.92,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.2,
    color: C.paleInk,
    margin: 0,
  });

  slide.addShape(SH.chevron, {
    x: 0.72,
    y: 2.02,
    w: 5.66,
    h: 3.14,
    fill: { color: C.cyan },
    line: { color: C.cyan },
  });
  slide.addShape(SH.ellipse, {
    x: 1.02,
    y: 2.34,
    w: 0.88,
    h: 0.88,
    fill: { color: C.navy },
    line: { color: C.white, transparency: 65, pt: 1.2 },
  });
  addCenteredTextInCircle(slide, ">>", {
    x: 1.02,
    y: 2.34,
    d: 0.88,
    fontSize: 17,
    color: C.white,
  });
  slide.addText("ACELERAR CON EL AGENTE", {
    x: 2.12,
    y: 2.36,
    w: 3.44,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17.4,
    bold: true,
    color: C.navyDeep,
    margin: 0,
  });
  const fastTags = ["INVESTIGAR", "COMPARAR", "PROGRAMAR", "DISEÑAR"];
  fastTags.forEach((tag, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 1.02 + col * 2.16;
    const y = 3.22 + row * 0.64;
    slide.addShape(SH.roundRect, {
      x,
      y,
      w: 1.92,
      h: 0.44,
      rectRadius: 0.04,
      fill: { color: C.white, transparency: 10 },
      line: { color: C.white, transparency: 75 },
    });
    slide.addText(tag, {
      x: x + 0.12,
      y: y + 0.12,
      w: 1.68,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      bold: true,
      charSpacing: 0.7,
      color: C.navyDeep,
      align: "center",
      margin: 0,
    });
  });
  slide.addText("El agente entrega velocidad.\nEl equipo entrega criterio.", {
    x: 1.02,
    y: 4.58,
    w: 4.12,
    h: 0.4,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.1,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.chevron, {
    x: 6.54,
    y: 2.02,
    w: 6.06,
    h: 3.14,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addShape(SH.ellipse, {
    x: 6.88,
    y: 2.34,
    w: 0.88,
    h: 0.88,
    fill: { color: C.white },
    line: { color: C.white, pt: 1.2 },
  });
  addCenteredTextInCircle(slide, "!", {
    x: 6.88,
    y: 2.34,
    d: 0.88,
    fontSize: 20,
    color: C.red,
  });
  slide.addText("FRENAR CON EL MONTAJE", {
    x: 7.98,
    y: 2.36,
    w: 3.9,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17.4,
    bold: true,
    color: C.white,
    margin: 0,
  });
  const slowTags = ["VOLTAJE", "POLARIDAD", "CABLES", "ENERGÍA"];
  slowTags.forEach((tag, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 6.9 + col * 2.22;
    const y = 3.22 + row * 0.64;
    slide.addShape(SH.roundRect, {
      x,
      y,
      w: 1.98,
      h: 0.44,
      rectRadius: 0.04,
      fill: { color: C.white, transparency: 8 },
      line: { color: C.white, transparency: 70 },
    });
    slide.addText(tag, {
      x: x + 0.12,
      y: y + 0.12,
      w: 1.74,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      bold: true,
      charSpacing: 0.7,
      color: C.red,
      align: "center",
      margin: 0,
    });
  });
  slide.addText("El agente puede explicar conexiones.\nNo puede ver sus cables.", {
    x: 7.02,
    y: 4.58,
    w: 4.28,
    h: 0.4,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.1,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });

  slide.addText("UN SOLO MÉTODO", {
    x: 0.76,
    y: 5.48,
    w: 1.72,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.5,
    bold: true,
    charSpacing: 1.1,
    color: C.gold,
    margin: 0,
  });
  slide.addShape(SH.line, {
    x: 1.62,
    y: 6.07,
    w: 9.6,
    h: 0,
    line: { color: C.paleInk, transparency: 35, pt: 1.8, endArrowType: "triangle" },
  });
  const method = ["CONTEXTO", "TAREA PEQUEÑA", "VERIFICAR", "DECIDIR"];
  method.forEach((label, index) => {
    const x = 1.48 + index * 2.74;
    const color = [C.red, C.cyan, C.gold, C.green][index];
    const textColor = color === C.gold ? C.navyDeep : C.white;
    addNumberCircle(slide, x, 5.78, 0.58, String(index + 1), color, textColor);
    slide.addText(label, {
      x: x + 0.72,
      y: 5.9,
      w: 1.74,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 10.9,
      bold: true,
      color: C.white,
      margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 1.48,
    y: 6.48,
    w: 10.38,
    h: 0.46,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.white },
  });
  slide.addText("Usar un agente no es hacer trampa. Entregar algo que no pueden explicar, sí.", {
    x: 1.84,
    y: 6.59,
    w: 9.66,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.3,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 7, { white: true });
  addNotesAndValidate(slide, { ignoreLines: true });
}

// 08 · Apertura del Bloque 2
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });

  slide.addText("BLOQUE 2 · 15 MINUTOS", {
    x: 0.76,
    y: 0.54,
    w: 4.0,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.6,
    bold: true,
    charSpacing: 1.35,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Qué medimos,\ncon qué y cuándo\nse activa", {
    x: 0.76,
    y: 1.0,
    w: 5.25,
    h: 1.92,
    fontFace: TYPOGRAPHY.display,
    fontSize: 31.5,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
  });
  slide.addShape(SH.line, {
    x: 0.78,
    y: 3.18,
    w: 4.52,
    h: 0,
    line: { color: C.red, pt: 4 },
  });
  slide.addText("Una idea empieza a funcionar cuando puede observar algo real y decidir con una regla propia.", {
    x: 0.78,
    y: 3.48,
    w: 4.65,
    h: 0.92,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17.2,
    color: C.paleInk,
    breakLine: false,
    margin: 0,
  });

  const openerSensors = [
    { path: IMG.sensorDistance, x: 6.12, y: 1.36, color: C.red, label: "DISTANCIA" },
    { path: IMG.sensorAir, x: 8.13, y: 1.36, color: C.cyan, label: "AMBIENTE" },
    { path: IMG.sensorLight, x: 10.14, y: 1.36, color: C.gold, label: "LUZ" },
    { path: IMG.sensorSoil, x: 6.12, y: 3.69, color: C.green, label: "HUMEDAD" },
    { path: IMG.sensorWater, x: 8.13, y: 3.69, color: C.blue, label: "NIVEL" },
    { path: IMG.sensorMagnetic, x: 10.14, y: 3.69, color: C.red, label: "ESTADO" },
  ];
  openerSensors.forEach((item) => {
    slide.addShape(SH.roundRect, {
      x: item.x,
      y: item.y,
      w: 1.72,
      h: 2.02,
      rectRadius: 0.05,
      fill: { color: C.white, transparency: 2 },
      line: { color: item.color, pt: 1.4 },
      shadow: { type: "outer", color: "000000", opacity: 0.18, blur: 1.5, angle: 45, distance: 1 },
    });
    addImageContain(slide, item.path, item.x + 0.16, item.y + 0.15, 1.4, 1.35);
    slide.addShape(SH.rect, {
      x: item.x,
      y: item.y + 1.68,
      w: 1.72,
      h: 0.34,
      fill: { color: item.color },
      line: { color: item.color },
    });
    slide.addText(item.label, {
      x: item.x + 0.08,
      y: item.y + 1.77,
      w: 1.56,
      h: 0.16,
      fontFace: TYPOGRAPHY.display,
      fontSize: 9.4,
      bold: true,
      charSpacing: 0.8,
      color: item.color === C.gold ? C.navyDeep : C.white,
      align: "center",
      margin: 0,
    });
  });
  slide.addText("PROBLEMA", {
    x: 1.02,
    y: 5.46,
    w: 1.52,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.chevron, {
    x: 2.45,
    y: 5.34,
    w: 2.0,
    h: 0.55,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("VARIABLE", {
    x: 4.52,
    y: 5.46,
    w: 1.52,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.chevron, {
    x: 5.96,
    y: 5.34,
    w: 2.0,
    h: 0.55,
    fill: { color: C.cyan },
    line: { color: C.cyan },
  });
  slide.addText("SENSOR", {
    x: 8.03,
    y: 5.46,
    w: 1.52,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.chevron, {
    x: 9.47,
    y: 5.34,
    w: 2.0,
    h: 0.55,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("UMBRAL", {
    x: 11.38,
    y: 5.46,
    w: 1.18,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("Primero entendemos qué cambia. Después elegimos con qué medirlo.", {
    x: 1.3,
    y: 6.29,
    w: 10.72,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16,
    bold: true,
    color: C.cyan,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 8, { white: true });
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 09 · De intención a variable
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Variable observable",
    "Un sistema no puede medir una intención",
    "Necesita algo que cambie y que pueda leerse.",
    9,
  );

  slide.addShape(SH.roundRect, {
    x: 0.76,
    y: 2.0,
    w: 4.32,
    h: 2.32,
    rectRadius: 0.06,
    fill: { color: C.redSoft },
    line: { color: C.red, pt: 1.4 },
  });
  slide.addText("INTENCIÓN", {
    x: 1.08,
    y: 2.31,
    w: 1.42,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    charSpacing: 1.2,
    color: C.red,
    margin: 0,
  });
  slide.addText("“Queremos cuidar el agua”", {
    x: 1.08,
    y: 2.78,
    w: 3.68,
    h: 0.72,
    fontFace: TYPOGRAPHY.display,
    fontSize: 24,
    bold: true,
    color: C.navy,
    valign: "mid",
    margin: 0,
  });
  slide.addText("Es un propósito valioso, pero todavía no produce un dato.", {
    x: 1.08,
    y: 3.67,
    w: 3.55,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.3,
    color: C.slate,
    margin: 0,
  });
  slide.addShape(SH.chevron, {
    x: 5.25,
    y: 2.78,
    w: 1.28,
    h: 0.8,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("PREGUNTEN", {
    x: 5.16,
    y: 3.77,
    w: 1.44,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.6,
    bold: true,
    charSpacing: 0.9,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText("¿Qué cambia cuando el problema empeora?", {
    x: 4.97,
    y: 4.05,
    w: 1.84,
    h: 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: 10.5,
    bold: true,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 6.72,
    y: 2.0,
    w: 5.82,
    h: 2.32,
    rectRadius: 0.06,
    fill: { color: C.cyanSoft },
    line: { color: C.cyan, pt: 1.4 },
  });
  slide.addText("VARIABLE OBSERVABLE", {
    x: 7.07,
    y: 2.31,
    w: 2.48,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    charSpacing: 1.15,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Nivel de agua", {
    x: 7.07,
    y: 2.76,
    w: 2.82,
    h: 0.48,
    fontFace: TYPOGRAPHY.display,
    fontSize: 24,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("cm  o  %", {
    x: 10.04,
    y: 2.65,
    w: 1.88,
    h: 0.64,
    fontFace: TYPOGRAPHY.display,
    fontSize: 26,
    bold: true,
    color: C.cyan,
    align: "center",
    margin: 0,
  });
  slide.addText("Sube o baja · puede registrarse · permite decidir", {
    x: 7.09,
    y: 3.58,
    w: 4.92,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.4,
    color: C.slate,
    margin: 0,
  });

  const examples = [
    { x: 0.78, wish: "Sala saludable", variable: "Humedad del aire", unit: "%" },
    { x: 4.94, wish: "Patio más limpio", variable: "Cantidad de residuos", unit: "unidades" },
    { x: 9.1, wish: "Tapa cerrada", variable: "Estado de la tapa", unit: "abierta / cerrada" },
  ];
  examples.forEach((item, index) => {
    const color = [C.green, C.gold, C.blue][index];
    slide.addShape(SH.roundRect, {
      x: item.x,
      y: 5.04,
      w: 3.58,
      h: 1.2,
      rectRadius: 0.05,
      fill: { color: C.white },
      line: { color, pt: 1.2 },
    });
    slide.addText(item.wish.toUpperCase(), {
      x: item.x + 0.22,
      y: 5.24,
      w: 1.55,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.7,
      bold: true,
      charSpacing: 0.7,
      color,
      margin: 0,
    });
    slide.addText(item.variable, {
      x: item.x + 0.22,
      y: 5.55,
      w: 2.2,
      h: 0.25,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.5,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(item.unit, {
      x: item.x + 2.35,
      y: 5.42,
      w: 0.95,
      h: 0.42,
      fontFace: TYPOGRAPHY.display,
      fontSize: item.unit.length > 6 ? 10.2 : 15,
      bold: true,
      color,
      align: "center",
      valign: "mid",
      margin: 0,
    });
  });
  slide.addText("Si no pueden nombrar la unidad o los dos estados, todavía tienen un deseo.", {
    x: 1.5,
    y: 6.52,
    w: 10.34,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.2,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 10 · Una variable principal
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("ALCANCE INTELIGENTE", {
    x: 0.76,
    y: 0.48,
    w: 3.6,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.3,
    color: C.gold,
    margin: 0,
  });
  slide.addText("Una variable bien probada vale más que cuatro a medias", {
    x: 0.76,
    y: 0.92,
    w: 10.45,
    h: 0.76,
    fontFace: TYPOGRAPHY.display,
    fontSize: 29.5,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("El desafío no premia cuántas piezas conectan. Premia qué tan bien resuelven el problema.", {
    x: 0.78,
    y: 1.78,
    w: 9.8,
    h: 0.4,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.6,
    color: C.paleInk,
    margin: 0,
  });

  slide.addShape(SH.ellipse, {
    x: 1.02,
    y: 2.52,
    w: 3.34,
    h: 3.34,
    fill: { color: C.cyan },
    line: { color: C.white, pt: 1.5 },
  });
  addCenteredTextInCircle(slide, "1", {
    x: 1.02,
    y: 2.5,
    d: 3.34,
    fontSize: 66,
    color: C.navyDeep,
  });
  slide.addText("VARIABLE PRINCIPAL", {
    x: 1.38,
    y: 4.91,
    w: 2.62,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    charSpacing: 0.9,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });
  slide.addText("medida · explicada · demostrable", {
    x: 1.36,
    y: 5.22,
    w: 2.66,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });

  const ghosts = [
    { x: 6.05, y: 2.62, n: "1" },
    { x: 8.55, y: 2.62, n: "2" },
    { x: 6.05, y: 4.54, n: "3" },
    { x: 8.55, y: 4.54, n: "4" },
  ];
  ghosts.forEach((item) => {
    slide.addShape(SH.ellipse, {
      x: item.x,
      y: item.y,
      w: 1.52,
      h: 1.52,
      fill: { color: C.white, transparency: 92 },
      line: { color: C.white, transparency: 55, pt: 1.2 },
    });
    addCenteredTextInCircle(slide, item.n, {
      x: item.x,
      y: item.y,
      d: 1.52,
      fontSize: 23,
      color: C.paleInk,
    });
  });
  slide.addShape(SH.line, {
    x: 5.66,
    y: 2.5,
    w: 4.82,
    h: 3.7,
    line: { color: C.red, pt: 5, beginArrowType: "none", endArrowType: "none" },
    rotate: 0,
  });
  slide.addShape(SH.line, {
    x: 5.66,
    y: 2.5,
    w: 4.82,
    h: 3.7,
    line: { color: C.red, pt: 5, beginArrowType: "none", endArrowType: "none" },
    flipV: true,
  });
  slide.addText("CUATRO MEDIDAS A MEDIAS", {
    x: 5.72,
    y: 6.28,
    w: 4.92,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.5,
    bold: true,
    charSpacing: 0.8,
    color: C.red,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 10.75,
    y: 2.55,
    w: 1.84,
    h: 3.72,
    rectRadius: 0.06,
    fill: { color: C.white, transparency: 4 },
    line: { color: C.gold, pt: 1.4 },
  });
  slide.addText("¿QUIEREN UNA SEGUNDA?", {
    x: 11.0,
    y: 2.93,
    w: 1.34,
    h: 0.52,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.6,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText("Expliquen qué decisión permite tomar que la primera no permite.", {
    x: 10.98,
    y: 3.75,
    w: 1.38,
    h: 1.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.1,
    color: C.slate,
    align: "center",
    valign: "mid",
    margin: 0,
  });
  slide.addText("Si no cambia una decisión, no entra al MVP.", {
    x: 10.96,
    y: 5.39,
    w: 1.42,
    h: 0.48,
    fontFace: TYPOGRAPHY.display,
    fontSize: 10.7,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 10, { white: true });
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 11 · Problema → variable → sensor
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Orden de decisión",
    "El sensor se elige después de la variable",
    "Una pieza tiene sentido cuando cumple una función de la regla.",
    11,
  );

  const chain = [
    {
      x: 0.76,
      w: 3.06,
      n: "01",
      title: "PROBLEMA",
      body: "El contenedor se desborda antes de que alguien alcance a retirarlo.",
      color: C.red,
    },
    {
      x: 4.28,
      w: 3.06,
      n: "02",
      title: "VARIABLE",
      body: "Distancia entre la tapa y los residuos, convertida a porcentaje.",
      color: C.cyan,
    },
    {
      x: 7.8,
      w: 4.75,
      n: "03",
      title: "SENSOR",
      body: "HC-SR04: mide distancia sin tocar el contenido.",
      color: C.green,
    },
  ];
  chain.forEach((item) => {
    slide.addShape(SH.roundRect, {
      x: item.x,
      y: 2.08,
      w: item.w,
      h: 3.68,
      rectRadius: 0.06,
      fill: { color: C.white },
      line: { color: item.color, pt: 1.5 },
    });
    slide.addShape(SH.rect, {
      x: item.x,
      y: 2.08,
      w: item.w,
      h: 0.52,
      fill: { color: item.color },
      line: { color: item.color },
    });
    slide.addText(item.n, {
      x: item.x + 0.18,
      y: 2.23,
      w: 0.46,
      h: 0.18,
      fontFace: TYPOGRAPHY.display,
      fontSize: 10.4,
      bold: true,
      color: item.color === C.cyan ? C.navyDeep : C.white,
      margin: 0,
    });
    slide.addText(item.title, {
      x: item.x + 0.7,
      y: 2.21,
      w: item.w - 0.92,
      h: 0.2,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.5,
      bold: true,
      charSpacing: 0.9,
      color: item.color === C.cyan ? C.navyDeep : C.white,
      margin: 0,
    });
    if (item.n !== "03") {
      slide.addText(item.body, {
        x: item.x + 0.32,
        y: 3.18,
        w: item.w - 0.64,
        h: 1.14,
        fontFace: TYPOGRAPHY.display,
        fontSize: 17,
        bold: true,
        color: C.navy,
        align: "center",
        valign: "mid",
        margin: 0,
      });
    } else {
      addImageContain(slide, IMG.sensorDistance, item.x + 0.25, 2.83, 2.2, 2.05);
      slide.addText(item.body, {
        x: item.x + 2.48,
        y: 3.15,
        w: 1.92,
        h: 1.18,
        fontFace: TYPOGRAPHY.display,
        fontSize: 15.4,
        bold: true,
        color: C.navy,
        valign: "mid",
        margin: 0,
      });
    }
    slide.addShape(SH.roundRect, {
      x: item.x + 0.32,
      y: 5.06,
      w: item.w - 0.64,
      h: 0.42,
      rectRadius: 0.04,
      fill: { color: item.color, transparency: 88 },
      line: { color: item.color, transparency: 55 },
    });
    slide.addText(
      item.n === "01" ? "¿QUÉ NECESITA CAMBIAR?" : item.n === "02" ? "¿QUÉ DATO LO REPRESENTA?" : "¿QUÉ PIEZA PRODUCE ESE DATO?",
      {
        x: item.x + 0.45,
        y: 5.18,
        w: item.w - 0.9,
        h: 0.16,
        fontFace: TYPOGRAPHY.body,
        fontSize: item.n === "03" ? 8.7 : 9.2,
        bold: true,
        charSpacing: 0.45,
        color: item.color,
        align: "center",
        margin: 0,
      },
    );
  });
  [3.85, 7.37].forEach((x, index) => {
    slide.addShape(SH.chevron, {
      x,
      y: 3.61,
      w: 0.38,
      h: 0.56,
      fill: { color: index === 0 ? C.red : C.cyan },
      line: { color: index === 0 ? C.red : C.cyan },
    });
  });
  slide.addText("Si parten por la pieza, terminan buscando un problema que la justifique.", {
    x: 1.3,
    y: 6.25,
    w: 10.72,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.2,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 12 · Selección acotada de sensores
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Banco de sensores",
    "Siete formas de observar el mundo",
    "Elijan por lo que necesitan medir; el código del módulo viene después.",
    12,
    { titleW: 8.6 },
  );
  const sensors = [
    { path: IMG.sensorDistance, measure: "DISTANCIA", code: "HC-SR04", color: C.red },
    { path: IMG.sensorAir, measure: "AIRE", code: "KY-015", color: C.cyan },
    { path: IMG.sensorTemperature, measure: "TEMPERATURA", code: "KY-001", color: C.gold },
    { path: IMG.sensorLight, measure: "LUZ", code: "KY-018", color: C.green },
    { path: IMG.sensorSoil, measure: "TIERRA", code: "SOIL", color: C.blue },
    { path: IMG.sensorWater, measure: "NIVEL DE AGUA", code: "WATER", color: C.cyan },
    { path: IMG.sensorMagnetic, measure: "ABIERTO / CERRADO", code: "KY-021", color: C.red },
  ];
  const positions = [
    { x: 0.76, y: 2.02 },
    { x: 3.02, y: 2.02 },
    { x: 5.28, y: 2.02 },
    { x: 7.54, y: 2.02 },
    { x: 9.8, y: 2.02 },
    { x: 3.02, y: 4.53 },
    { x: 7.54, y: 4.53 },
  ];
  sensors.forEach((sensor, index) => {
    const pos = positions[index];
    slide.addShape(SH.roundRect, {
      x: pos.x,
      y: pos.y,
      w: 2.0,
      h: 2.18,
      rectRadius: 0.05,
      fill: { color: C.white },
      line: { color: sensor.color, pt: 1.2 },
      shadow: { type: "outer", color: "7A8794", opacity: 0.12, blur: 1.2, angle: 45, distance: 0.8 },
    });
    addImageContain(slide, sensor.path, pos.x + 0.16, pos.y + 0.12, 1.68, 1.32);
    slide.addText(sensor.measure, {
      x: pos.x + 0.12,
      y: pos.y + 1.54,
      w: 1.76,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: sensor.measure.length > 12 ? 8.8 : 10.8,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addShape(SH.roundRect, {
      x: pos.x + 0.55,
      y: pos.y + 1.86,
      w: 0.9,
      h: 0.24,
      rectRadius: 0.03,
      fill: { color: sensor.color, transparency: sensor.color === C.gold ? 20 : 88 },
      line: { color: sensor.color, transparency: 55 },
    });
    slide.addText(sensor.code, {
      x: pos.x + 0.59,
      y: pos.y + 1.92,
      w: 0.82,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 7.8,
      bold: true,
      color: sensor.color === C.gold ? C.navyDeep : sensor.color,
      align: "center",
      margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 5.28,
    y: 4.53,
    w: 2.0,
    h: 2.18,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.cyan, pt: 1.2 },
  });
  slide.addText("1 : 1", {
    x: 5.62,
    y: 4.9,
    w: 1.32,
    h: 0.58,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.cyan,
    align: "center",
    margin: 0,
  });
  slide.addText("UNA VARIABLE\nUN SENSOR PRINCIPAL", {
    x: 5.49,
    y: 5.66,
    w: 1.58,
    h: 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.3,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("PRUEBA MÍNIMA", {
    x: 5.56,
    y: 6.37,
    w: 1.44,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.2,
    bold: true,
    charSpacing: 0.7,
    color: C.gold,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 0.78,
    y: 4.53,
    w: 2.0,
    h: 2.18,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("¿NO ESTÁ\nAQUÍ?", {
    x: 1.04,
    y: 4.94,
    w: 1.48,
    h: 0.66,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("El kit tiene más opciones. La exigencia es justificar la elección.", {
    x: 1.01,
    y: 5.83,
    w: 1.54,
    h: 0.58,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.7,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 9.8,
    y: 4.53,
    w: 2.0,
    h: 2.18,
    rectRadius: 0.05,
    fill: { color: C.goldSoft },
    line: { color: C.gold, pt: 1.2 },
  });
  slide.addText("PREGUNTA\nDECISIVA", {
    x: 10.07,
    y: 4.91,
    w: 1.46,
    h: 0.52,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.2,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText("¿Qué parte de nuestra regla cumple este sensor?", {
    x: 10.04,
    y: 5.66,
    w: 1.52,
    h: 0.62,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.3,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 13 · Salidas del sistema
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La respuesta",
    "Medir no basta: el sistema debe hacer algo perceptible",
    "La salida convierte el dato en una acción que otra persona puede notar.",
    13,
    { titleFontSize: 25.5 },
  );
  const outputs = [
    {
      x: 0.78,
      path: IMG.outputLight,
      title: "VER",
      module: "Luz de colores · KY-011",
      body: "Comunica un estado a distancia: normal, atención o crítico.",
      color: C.green,
      note: "SE VE",
    },
    {
      x: 4.65,
      path: IMG.outputBuzzer,
      title: "OÍR",
      module: "Zumbador · KY-012",
      body: "Llama la atención cuando ocurre una condición urgente.",
      color: C.red,
      note: "SE OYE",
    },
    {
      x: 8.52,
      path: IMG.outputRelay,
      title: "ACTUAR",
      module: "Relé · KY-019",
      body: "Permite activar otro dispositivo con supervisión docente.",
      color: C.gold,
      note: "SE ACTIVA",
    },
  ];
  outputs.forEach((item, index) => {
    slide.addShape(SH.roundRect, {
      x: item.x,
      y: 2.05,
      w: 3.48,
      h: 4.26,
      rectRadius: 0.06,
      fill: { color: C.white },
      line: { color: item.color, pt: 1.4 },
    });
    slide.addShape(SH.rect, {
      x: item.x,
      y: 2.05,
      w: 0.18,
      h: 4.26,
      fill: { color: item.color },
      line: { color: item.color },
    });
    addImageContain(slide, item.path, item.x + 0.44, 2.28, 2.6, 1.84);
    slide.addText(item.title, {
      x: item.x + 0.44,
      y: 4.26,
      w: 1.32,
      h: 0.34,
      fontFace: TYPOGRAPHY.display,
      fontSize: 21,
      bold: true,
      color: item.color === C.gold ? C.navy : item.color,
      margin: 0,
    });
    slide.addShape(SH.roundRect, {
      x: item.x + 2.08,
      y: 4.25,
      w: 1.02,
      h: 0.32,
      rectRadius: 0.03,
      fill: { color: item.color, transparency: item.color === C.gold ? 15 : 88 },
      line: { color: item.color, transparency: 50 },
    });
    slide.addText(item.note, {
      x: item.x + 2.16,
      y: 4.34,
      w: 0.86,
      h: 0.13,
      fontFace: TYPOGRAPHY.body,
      fontSize: 7.8,
      bold: true,
      charSpacing: 0.6,
      color: item.color === C.gold ? C.navyDeep : item.color,
      align: "center",
      margin: 0,
    });
    slide.addText(item.module, {
      x: item.x + 0.44,
      y: 4.8,
      w: 2.72,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.2,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(item.body, {
      x: item.x + 0.44,
      y: 5.24,
      w: 2.68,
      h: 0.66,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.3,
      color: C.slate,
      margin: 0,
    });
    if (index === 2) {
      slide.addText("Siempre con revisión antes de energizar.", {
        x: item.x + 0.44,
        y: 5.91,
        w: 2.65,
        h: 0.2,
        fontFace: TYPOGRAPHY.body,
        fontSize: 9,
        bold: true,
        color: C.red,
        margin: 0,
      });
    }
  });
  slide.addText("Una salida sirve cuando la persona correcta la percibe y sabe qué hacer.", {
    x: 1.48,
    y: 6.52,
    w: 10.35,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.4,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 14 · Método para dominar un componente
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  addInstitutionalLockup(slide);
  slide.addText("APRENDER TECNOLOGÍA NUEVA", {
    x: 0.76,
    y: 0.42,
    w: 4.1,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.25,
    color: C.red,
    margin: 0,
  });
  slide.addText("No necesitan conocer todos los sensores.\nNecesitan un método para dominar cualquiera.", {
    x: 0.76,
    y: 0.82,
    w: 9.5,
    h: 1.02,
    fontFace: TYPOGRAPHY.display,
    fontSize: 26.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  const mastery = [
    { n: "1", title: "IDENTIFICAR", body: "Leer la etiqueta exacta del módulo.", color: C.red },
    { n: "2", title: "REDUCIR", body: "Qué mide · voltaje · función de cada cable.", color: C.cyan },
    { n: "3", title: "PREGUNTAR", body: "Dar al agente componente, placa y objetivo.", color: C.gold },
    { n: "4", title: "PROBAR", body: "Conectar solo el sensor y ver su lectura.", color: C.green },
    { n: "5", title: "CONTRASTAR", body: "Cambiar el mundo y comprobar que cambia el dato.", color: C.blue },
  ];
  slide.addShape(SH.line, {
    x: 1.55,
    y: 3.2,
    w: 9.75,
    h: 0,
    line: { color: C.navy, pt: 2.4, endArrowType: "triangle" },
  });
  mastery.forEach((item, index) => {
    const x = 0.86 + index * 2.38;
    const textColor = item.color === C.gold ? C.navyDeep : C.white;
    addNumberCircle(slide, x + 0.64, 2.73, 0.94, item.n, item.color, textColor);
    slide.addShape(SH.roundRect, {
      x,
      y: 3.55,
      w: 2.12,
      h: 2.25,
      rectRadius: 0.05,
      fill: { color: C.white },
      line: { color: item.color, pt: 1.25 },
    });
    slide.addText(item.title, {
      x: x + 0.18,
      y: 3.91,
      w: 1.76,
      h: 0.26,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.4,
      bold: true,
      color: item.color === C.gold ? C.navy : item.color,
      align: "center",
      margin: 0,
    });
    slide.addText(item.body, {
      x: x + 0.22,
      y: 4.44,
      w: 1.68,
      h: 0.86,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.7,
      color: C.slate,
      align: "center",
      valign: "mid",
      margin: 0,
    });
    slide.addText(index === 3 ? "PRUEBA MÍNIMA" : index === 4 ? "EVIDENCIA REAL" : "AVANCE RÁPIDO", {
      x: x + 0.26,
      y: 5.39,
      w: 1.6,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.1,
      bold: true,
      charSpacing: 0.65,
      color: item.color,
      align: "center",
      margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 1.62,
    y: 6.12,
    w: 10.08,
    h: 0.55,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("La meta no es memorizar un catálogo. Es aprender a aprender una pieza nueva.", {
    x: 1.95,
    y: 6.27,
    w: 9.42,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.2,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 14);
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 15 · Prueba mínima
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Prueba mínima",
    "Antes del proyecto completo: hagan aparecer un número que reaccione",
    "Sensor + placa + lectura. Nada más.",
    15,
    { titleFontSize: 24.8 },
  );
  slide.addShape(SH.roundRect, {
    x: 0.76,
    y: 2.05,
    w: 3.32,
    h: 4.1,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.cyan, pt: 1.4 },
  });
  addImageContain(slide, IMG.sensorDistance, 1.18, 2.48, 2.48, 2.12);
  slide.addText("HC-SR04", {
    x: 1.2,
    y: 4.77,
    w: 2.44,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText("Solo el sensor conectado", {
    x: 1.24,
    y: 5.24,
    w: 2.36,
    h: 0.25,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.4,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.chevron, {
    x: 4.22,
    y: 3.42,
    w: 1.0,
    h: 0.76,
    fill: { color: C.cyan },
    line: { color: C.cyan },
  });
  slide.addShape(SH.roundRect, {
    x: 5.4,
    y: 2.05,
    w: 3.28,
    h: 4.1,
    rectRadius: 0.06,
    fill: { color: C.navyDeep },
    line: { color: C.navyDeep },
  });
  slide.addShape(SH.rect, {
    x: 5.4,
    y: 2.05,
    w: 3.28,
    h: 0.48,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("LECTURA DEL SENSOR", {
    x: 5.68,
    y: 2.2,
    w: 2.72,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    bold: true,
    charSpacing: 0.8,
    color: C.paleInk,
    margin: 0,
  });
  const readings = [
    { y: 2.92, value: "42 cm", color: C.cyan, note: "mano lejos" },
    { y: 3.73, value: "24 cm", color: C.gold, note: "mano al medio" },
    { y: 4.54, value: "08 cm", color: C.red, note: "mano cerca" },
  ];
  readings.forEach((reading) => {
    slide.addText(">", {
      x: 5.75,
      y: reading.y + 0.05,
      w: 0.28,
      h: 0.24,
      fontFace: "Consolas",
      fontSize: 14,
      bold: true,
      color: C.green,
      margin: 0,
    });
    slide.addText(reading.value, {
      x: 6.05,
      y: reading.y,
      w: 1.22,
      h: 0.35,
      fontFace: "Consolas",
      fontSize: 19,
      bold: true,
      color: reading.color,
      margin: 0,
    });
    slide.addText(reading.note, {
      x: 7.12,
      y: reading.y + 0.08,
      w: 1.16,
      h: 0.18,
      fontFace: "Consolas",
      fontSize: 9.5,
      color: C.paleInk,
      margin: 0,
    });
  });
  slide.addText("EL DATO CAMBIA\nCON EL MUNDO REAL", {
    x: 5.75,
    y: 5.42,
    w: 2.58,
    h: 0.44,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.8,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.chevron, {
    x: 8.84,
    y: 3.42,
    w: 1.0,
    h: 0.76,
    fill: { color: C.green },
    line: { color: C.green },
  });
  slide.addShape(SH.roundRect, {
    x: 10.02,
    y: 2.05,
    w: 2.52,
    h: 4.1,
    rectRadius: 0.06,
    fill: { color: C.greenSoft },
    line: { color: C.green, pt: 1.4 },
  });
  slide.addText("✓", {
    x: 10.72,
    y: 2.6,
    w: 1.1,
    h: 1.02,
    fontFace: TYPOGRAPHY.display,
    fontSize: 47,
    bold: true,
    color: C.green,
    align: "center",
    margin: 0,
  });
  slide.addText("YA PUEDEN\nCONSTRUIR ENCIMA", {
    x: 10.32,
    y: 3.88,
    w: 1.92,
    h: 0.64,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText("Recién ahora agregan luces, alarmas, panel o carcasa.", {
    x: 10.34,
    y: 4.92,
    w: 1.88,
    h: 0.62,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  slide.addText("Si el dato no reacciona, detenerse aquí es avanzar.", {
    x: 1.8,
    y: 6.5,
    w: 9.7,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 16 · Orden de diagnóstico
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("CUANDO ALGO NO FUNCIONA", {
    x: 0.76,
    y: 0.46,
    w: 4.2,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.25,
    color: C.red,
    margin: 0,
  });
  slide.addText("Revisen en este orden", {
    x: 0.76,
    y: 0.88,
    w: 7.0,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 29,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("El programa suele ser el sospechoso. Muchas veces el problema está antes.", {
    x: 0.78,
    y: 1.57,
    w: 8.8,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.4,
    color: C.paleInk,
    margin: 0,
  });
  const diagnosis = [
    {
      x: 0.78,
      n: "1",
      title: "ENERGÍA",
      q: "¿La placa está encendida?\n¿El voltaje corresponde?",
      color: C.red,
      label: "PRIMERO",
    },
    {
      x: 4.53,
      n: "2",
      title: "CABLES",
      q: "¿Cada cable está donde debe?\n¿Comparten tierra?",
      color: C.gold,
      label: "DESPUÉS",
    },
    {
      x: 8.28,
      n: "3",
      title: "PROGRAMA",
      q: "¿El pin y la lectura coinciden\ncon el montaje real?",
      color: C.cyan,
      label: "AL FINAL",
    },
  ];
  diagnosis.forEach((item, index) => {
    const textColor = item.color === C.gold ? C.navyDeep : C.white;
    slide.addShape(SH.roundRect, {
      x: item.x,
      y: 2.42,
      w: 3.22,
      h: 3.62,
      rectRadius: 0.06,
      fill: { color: C.white, transparency: 5 },
      line: { color: item.color, pt: 1.5 },
    });
    addNumberCircle(slide, item.x + 1.1, 2.78, 1.02, item.n, item.color, textColor);
    slide.addText(item.label, {
      x: item.x + 0.72,
      y: 3.96,
      w: 1.78,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      bold: true,
      charSpacing: 1,
      color: item.color,
      align: "center",
      margin: 0,
    });
    slide.addText(item.title, {
      x: item.x + 0.38,
      y: 4.35,
      w: 2.46,
      h: 0.34,
      fontFace: TYPOGRAPHY.display,
      fontSize: 19,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(item.q, {
      x: item.x + 0.38,
      y: 4.95,
      w: 2.46,
      h: 0.65,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.1,
      color: C.slate,
      align: "center",
      margin: 0,
    });
    if (index < 2) {
      slide.addShape(SH.chevron, {
        x: item.x + 3.31,
        y: 3.83,
        w: 0.36,
        h: 0.58,
        fill: { color: item.color },
        line: { color: item.color },
      });
    }
  });
  slide.addShape(SH.roundRect, {
    x: 1.44,
    y: 6.36,
    w: 10.42,
    h: 0.5,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.white },
  });
  slide.addText("Antes de conectar energía: revisen la etiqueta real, el voltaje y la polaridad.", {
    x: 1.8,
    y: 6.5,
    w: 9.72,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.2,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 16, { white: true });
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 17 · Qué es un umbral
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La regla de decisión",
    "El umbral es la frontera que activa una respuesta",
    "No describe solamente el dato: define cuándo alguien necesita enterarse.",
    17,
    { titleFontSize: 25.8 },
  );

  slide.addText("VARIABLE", {
    x: 0.86,
    y: 2.34,
    w: 1.38,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.8,
    bold: true,
    charSpacing: 1,
    color: C.slate,
    margin: 0,
  });
  slide.addText("Nivel de llenado", {
    x: 0.86,
    y: 2.72,
    w: 2.4,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("0 %", {
    x: 0.9,
    y: 4.29,
    w: 0.62,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color: C.slate,
    margin: 0,
  });
  slide.addText("100 %", {
    x: 11.78,
    y: 4.29,
    w: 0.7,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color: C.slate,
    align: "right",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 1.16,
    y: 3.52,
    w: 4.3,
    h: 0.74,
    rectRadius: 0.05,
    fill: { color: C.green },
    line: { color: C.green },
  });
  slide.addShape(SH.rect, {
    x: 5.46,
    y: 3.52,
    w: 3.95,
    h: 0.74,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addShape(SH.roundRect, {
    x: 9.41,
    y: 3.52,
    w: 2.77,
    h: 0.74,
    rectRadius: 0.05,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("NORMAL", {
    x: 2.48,
    y: 3.76,
    w: 1.68,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("ATENCIÓN", {
    x: 6.56,
    y: 3.76,
    w: 1.72,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.5,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });
  slide.addText("ACTUAR", {
    x: 9.95,
    y: 3.76,
    w: 1.68,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  [5.46, 9.41].forEach((x, index) => {
    slide.addShape(SH.line, {
      x,
      y: 2.74,
      w: 0,
      h: 1.94,
      line: { color: index === 0 ? C.gold : C.red, pt: 3, dash: "dash" },
    });
    slide.addShape(SH.downArrow, {
      x: x - 0.25,
      y: 2.66,
      w: 0.5,
      h: 0.55,
      fill: { color: index === 0 ? C.gold : C.red },
      line: { color: index === 0 ? C.gold : C.red },
    });
    slide.addText(index === 0 ? "40 %" : "80 %", {
      x: x - 0.45,
      y: 2.28,
      w: 0.9,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15,
      bold: true,
      color: index === 0 ? C.navy : C.red,
      align: "center",
      margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 1.14,
    y: 5.13,
    w: 11.04,
    h: 1.12,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("UMBRAL", {
    x: 1.5,
    y: 5.43,
    w: 1.18,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    charSpacing: 1.1,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Una frontera que cambia la decisión del sistema.", {
    x: 2.87,
    y: 5.32,
    w: 4.06,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.2,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("La pregunta no es solo “¿cuánto marca?”.\nEs “¿qué hacemos desde aquí?”.", {
    x: 7.19,
    y: 5.28,
    w: 4.52,
    h: 0.52,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.2,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  slide.addText("Un número sin una acción asociada todavía no es una regla.", {
    x: 1.68,
    y: 6.53,
    w: 9.98,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.8,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 18 · Origen del umbral
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Criterio verificable",
    "El umbral no se inventa: tiene un origen",
    "Estas cuatro fuentes convierten un número en una decisión defendible.",
    18,
  );
  const sources = [
    {
      x: 0.76,
      y: 2.05,
      n: "01",
      title: "MEDICIÓN PREVIA",
      body: "Comparar varias lecturas en situación normal y problemática.",
      example: "vacío ↔ casi lleno",
      color: C.red,
    },
    {
      x: 6.84,
      y: 2.05,
      n: "02",
      title: "CÁLCULO",
      body: "Deducir el valor desde una dimensión o relación conocida.",
      example: "distancia → porcentaje",
      color: C.cyan,
    },
    {
      x: 0.76,
      y: 4.45,
      n: "03",
      title: "DATO PUBLICADO",
      body: "Usar una recomendación identificable y citar su fuente.",
      example: "rango saludable",
      color: C.gold,
    },
    {
      x: 6.84,
      y: 4.45,
      n: "04",
      title: "ACUERDO PROVISIONAL",
      body: "Partir con un valor razonable y declarar cómo se ajustará.",
      example: "70 % → probar → corregir",
      color: C.green,
    },
  ];
  sources.forEach((item) => {
    const textColor = item.color === C.gold ? C.navyDeep : C.white;
    slide.addShape(SH.roundRect, {
      x: item.x,
      y: item.y,
      w: 5.72,
      h: 2.0,
      rectRadius: 0.06,
      fill: { color: C.white },
      line: { color: item.color, pt: 1.3 },
    });
    addNumberCircle(slide, item.x + 0.3, item.y + 0.3, 0.74, item.n, item.color, textColor);
    slide.addText(item.title, {
      x: item.x + 1.28,
      y: item.y + 0.3,
      w: 2.6,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.5,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(item.body, {
      x: item.x + 1.28,
      y: item.y + 0.78,
      w: 3.96,
      h: 0.5,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      color: C.slate,
      margin: 0,
    });
    slide.addShape(SH.roundRect, {
      x: item.x + 1.28,
      y: item.y + 1.43,
      w: 3.96,
      h: 0.34,
      rectRadius: 0.04,
      fill: { color: item.color, transparency: item.color === C.gold ? 15 : 88 },
      line: { color: item.color, transparency: 60 },
    });
    slide.addText(item.example, {
      x: item.x + 1.42,
      y: item.y + 1.52,
      w: 3.68,
      h: 0.15,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9,
      bold: true,
      color: item.color === C.gold ? C.navyDeep : item.color,
      align: "center",
      margin: 0,
    });
  });
  slide.addText("“Sonaba bien” no es una quinta fuente.", {
    x: 3.4,
    y: 6.69,
    w: 6.52,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.2,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 19 · Caso GeoGreen: 80 % y no 100 %
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  addInstitutionalLockup(slide);
  slide.addText("CASO GEOGREEN", {
    x: 0.76,
    y: 0.42,
    w: 3.0,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.25,
    color: C.red,
    margin: 0,
  });
  slide.addText("¿Por qué alertar al 80 % y no al 100 %?", {
    x: 0.76,
    y: 0.82,
    w: 9.0,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Porque la persona necesita tiempo para reaccionar.", {
    x: 0.78,
    y: 1.5,
    w: 7.3,
    h: 0.4,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.5,
    color: C.slate,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 2.19,
    w: 3.15,
    h: 4.05,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.navy, pt: 1.6 },
  });
  slide.addShape(SH.rect, {
    x: 1.23,
    y: 3.08,
    w: 2.53,
    h: 2.77,
    fill: { color: C.softBlue },
    line: { color: C.border, pt: 1 },
  });
  slide.addShape(SH.rect, {
    x: 1.23,
    y: 3.63,
    w: 2.53,
    h: 2.22,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addShape(SH.line, {
    x: 1.03,
    y: 3.63,
    w: 3.0,
    h: 0,
    line: { color: C.red, pt: 3, dash: "dash" },
  });
  slide.addText("80 %", {
    x: 1.53,
    y: 4.21,
    w: 1.92,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 31,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });
  slide.addText("ALERTA", {
    x: 1.7,
    y: 5.02,
    w: 1.58,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.1,
    color: C.red,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.chevron, {
    x: 4.35,
    y: 3.52,
    w: 1.05,
    h: 0.78,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addShape(SH.roundRect, {
    x: 5.62,
    y: 2.32,
    w: 2.78,
    h: 3.8,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("TIEMPO DE\nREACCIÓN", {
    x: 6.05,
    y: 2.8,
    w: 1.92,
    h: 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("recibir aviso", {
    x: 6.12,
    y: 3.7,
    w: 1.78,
    h: 0.23,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  slide.addText("↓", {
    x: 6.64,
    y: 3.98,
    w: 0.76,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21,
    bold: true,
    color: C.cyan,
    align: "center",
    margin: 0,
  });
  slide.addText("llegar", {
    x: 6.12,
    y: 4.5,
    w: 1.78,
    h: 0.23,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  slide.addText("↓", {
    x: 6.64,
    y: 4.78,
    w: 0.76,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21,
    bold: true,
    color: C.cyan,
    align: "center",
    margin: 0,
  });
  slide.addText("retirar", {
    x: 6.12,
    y: 5.3,
    w: 1.78,
    h: 0.23,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.chevron, {
    x: 8.62,
    y: 3.52,
    w: 1.05,
    h: 0.78,
    fill: { color: C.green },
    line: { color: C.green },
  });
  slide.addShape(SH.roundRect, {
    x: 9.88,
    y: 2.32,
    w: 2.54,
    h: 3.8,
    rectRadius: 0.06,
    fill: { color: C.greenSoft },
    line: { color: C.green, pt: 1.4 },
  });
  slide.addText("ANTES DEL\nDESBORDE", {
    x: 10.21,
    y: 3.0,
    w: 1.88,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.green,
    align: "center",
    margin: 0,
  });
  slide.addText("✓", {
    x: 10.58,
    y: 4.0,
    w: 1.15,
    h: 1.02,
    fontFace: TYPOGRAPHY.display,
    fontSize: 46,
    bold: true,
    color: C.green,
    align: "center",
    margin: 0,
  });
  slide.addText("La alerta todavía permite actuar.", {
    x: 10.28,
    y: 5.24,
    w: 1.74,
    h: 0.48,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.7,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 1.48,
    y: 6.48,
    w: 10.4,
    h: 0.48,
    rectRadius: 0.04,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("El umbral se elige por la necesidad humana, no por el sensor.", {
    x: 1.84,
    y: 6.62,
    w: 9.68,
    h: 0.19,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.2,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 19);
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 20 · Ruido y banda de tolerancia
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una regla estable",
    "Si el valor vive en la frontera, el sistema no debe parpadear",
    "Las mediciones reales tienen ruido. La lógica necesita margen.",
    20,
    { titleFontSize: 24.7 },
  );
  const panels = [
    { x: 0.76, title: "SIN TOLERANCIA", color: C.red, stable: false },
    { x: 6.84, title: "CON TOLERANCIA", color: C.green, stable: true },
  ];
  panels.forEach((panel) => {
    slide.addShape(SH.roundRect, {
      x: panel.x,
      y: 2.02,
      w: 5.72,
      h: 4.3,
      rectRadius: 0.06,
      fill: { color: C.white },
      line: { color: panel.color, pt: 1.3 },
    });
    slide.addText(panel.title, {
      x: panel.x + 0.32,
      y: 2.32,
      w: 2.35,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.5,
      bold: true,
      color: panel.color,
      margin: 0,
    });
    slide.addText(panel.stable ? "80 % para entrar · 75 % para salir" : "80 % para entrar y salir", {
      x: panel.x + 2.66,
      y: 2.36,
      w: 2.68,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.8,
      bold: true,
      color: C.slate,
      align: "right",
      margin: 0,
    });
    slide.addShape(SH.line, {
      x: panel.x + 0.52,
      y: 5.36,
      w: 4.68,
      h: 0,
      line: { color: C.border, pt: 1.3 },
    });
    slide.addShape(SH.line, {
      x: panel.x + 0.52,
      y: 3.0,
      w: 0,
      h: 2.36,
      line: { color: C.border, pt: 1.3 },
    });
    slide.addShape(SH.line, {
      x: panel.x + 0.52,
      y: 3.8,
      w: 4.68,
      h: 0,
      line: { color: C.red, pt: 1.6, dash: "dash" },
    });
    slide.addText("80", {
      x: panel.x + 0.02,
      y: 3.68,
      w: 0.42,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.2,
      bold: true,
      color: C.red,
      align: "right",
      margin: 0,
    });
    if (panel.stable) {
      slide.addShape(SH.line, {
        x: panel.x + 0.52,
        y: 4.37,
        w: 4.68,
        h: 0,
        line: { color: C.green, pt: 1.4, dash: "dash" },
      });
      slide.addText("75", {
        x: panel.x + 0.02,
        y: 4.25,
        w: 0.42,
        h: 0.2,
        fontFace: TYPOGRAPHY.body,
        fontSize: 9.2,
        bold: true,
        color: C.green,
        align: "right",
        margin: 0,
      });
      slide.addShape(SH.rect, {
        x: panel.x + 0.52,
        y: 3.8,
        w: 4.68,
        h: 0.57,
        fill: { color: C.gold, transparency: 75 },
        line: { color: C.gold, transparency: 100 },
      });
    }
    const points = panel.stable
      ? [
          [0.0, 1.7],
          [0.7, 1.0],
          [1.4, 0.64],
          [2.1, 0.86],
          [2.8, 0.52],
          [3.5, 0.75],
          [4.2, 0.42],
          [4.65, 0.58],
        ]
      : [
          [0.0, 1.64],
          [0.65, 0.94],
          [1.25, 0.73],
          [1.85, 0.92],
          [2.45, 0.68],
          [3.05, 0.9],
          [3.65, 0.62],
          [4.2, 0.88],
          [4.65, 0.58],
        ];
    points.slice(0, -1).forEach((point, index) => {
      const next = points[index + 1];
      const startY = 3.02 + point[1];
      const endY = 3.02 + next[1];
      slide.addShape(SH.line, {
        x: panel.x + 0.56 + point[0],
        y: Math.min(startY, endY),
        w: next[0] - point[0],
        h: Math.max(0.01, Math.abs(endY - startY)),
        line: { color: C.navy, pt: 2.6 },
        flipV: endY < startY,
      });
    });
    slide.addText(panel.stable ? "El estado permanece estable." : "La salida cambia a cada instante.", {
      x: panel.x + 0.58,
      y: 5.64,
      w: 4.56,
      h: 0.26,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.3,
      bold: true,
      color: panel.color,
      align: "center",
      margin: 0,
    });
    slide.addText(panel.stable ? "La banda de tolerancia evita falsas alarmas." : "Un poco de ruido cruza la misma frontera una y otra vez.", {
      x: panel.x + 0.62,
      y: 5.98,
      w: 4.48,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.8,
      color: C.slate,
      align: "center",
      margin: 0,
    });
  });
  slide.addText("Una lectura rara se filtra. Una frontera inestable necesita una banda de tolerancia.", {
    x: 1.42,
    y: 6.57,
    w: 10.48,
    h: 0.25,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.2,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { skipOverlap: true });
}

// 21 · Regla escrita del MVP
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("PRODUCTO DEL BLOQUE 2", {
    x: 0.76,
    y: 0.46,
    w: 4.2,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.25,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Escriban la regla completa de su MVP", {
    x: 0.76,
    y: 0.87,
    w: 8.2,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Debe entenderse de corrido, sin explicaciones adicionales.", {
    x: 0.78,
    y: 1.54,
    w: 7.3,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.2,
    color: C.paleInk,
    margin: 0,
  });
  const ruleFields = [
    { y: 2.18, label: "MEDIMOS", hint: "variable + unidad", color: C.red },
    { y: 2.82, label: "CON", hint: "sensor, instrumento u observación", color: C.cyan },
    { y: 3.46, label: "ES NORMAL CUANDO", hint: "rango o estado esperado", color: C.green },
    { y: 4.1, label: "SE ACTIVA CUANDO", hint: "umbral + origen del número", color: C.gold },
    { y: 4.74, label: "ENTONCES", hint: "respuesta perceptible", color: C.red },
    { y: 5.38, label: "Y MUESTRA", hint: "dónde se ve la información", color: C.cyan },
    { y: 6.02, label: "PARA QUE", hint: "persona + acción posible", color: C.green },
  ];
  ruleFields.forEach((field) => {
    slide.addShape(SH.roundRect, {
      x: 0.82,
      y: field.y,
      w: 11.7,
      h: 0.48,
      rectRadius: 0.04,
      fill: { color: C.white, transparency: 3 },
      line: { color: field.color, pt: 1.1 },
    });
    slide.addShape(SH.rect, {
      x: 0.82,
      y: field.y,
      w: 2.35,
      h: 0.48,
      fill: { color: field.color },
      line: { color: field.color },
    });
    slide.addText(field.label, {
      x: 1.04,
      y: field.y + 0.15,
      w: 1.91,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: field.label.length > 14 ? 8.6 : 9.3,
      bold: true,
      charSpacing: 0.65,
      color: field.color === C.gold ? C.navyDeep : C.white,
      margin: 0,
    });
    slide.addText(field.hint, {
      x: 3.52,
      y: field.y + 0.14,
      w: 3.4,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10,
      color: C.slate,
      margin: 0,
    });
    slide.addShape(SH.line, {
      x: 7.03,
      y: field.y + 0.31,
      w: 4.95,
      h: 0,
      line: { color: C.border, pt: 1.1, dash: "dash" },
    });
  });
  slide.addText("La regla conecta dato → decisión → respuesta → persona.", {
    x: 8.34,
    y: 1.57,
    w: 4.14,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.8,
    bold: true,
    color: C.gold,
    align: "right",
    margin: 0,
  });
  addFooter(slide, 21, { white: true });
  addNotesAndValidate(slide, { ignoreLines: true });
}

// 22 · Cierre del Bloque 2
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Comprobación del bloque",
    "Lean su regla en voz alta",
    "Si necesita aclaraciones para entenderse, todavía no está lista.",
    22,
  );
  slide.addShape(SH.roundRect, {
    x: 0.78,
    y: 2.03,
    w: 5.06,
    h: 3.9,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("UNA SOLA PASADA", {
    x: 1.18,
    y: 2.43,
    w: 2.22,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    charSpacing: 1.1,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("“Medimos…\ncon…\nse activa cuando…\nentonces…”", {
    x: 1.18,
    y: 2.93,
    w: 4.22,
    h: 1.67,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21.5,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 1.16,
    y: 4.92,
    w: 4.28,
    h: 0.55,
    rectRadius: 0.04,
    fill: { color: C.cyan },
    line: { color: C.cyan },
  });
  slide.addText("¿OTRO EQUIPO LA ENTIENDE?", {
    x: 1.46,
    y: 5.08,
    w: 3.68,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.4,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });
  const checks = [
    { n: "01", title: "UNIDAD", q: "¿En qué se mide?", color: C.red },
    { n: "02", title: "ORIGEN", q: "¿De dónde salió el umbral?", color: C.cyan },
    { n: "03", title: "FRONTERA", q: "¿Qué pasa justo en el límite?", color: C.gold },
    { n: "04", title: "DESTINATARIO", q: "¿Quién se entera y qué hace?", color: C.green },
  ];
  checks.forEach((item, index) => {
    const y = 2.03 + index * 1.0;
    const textColor = item.color === C.gold ? C.navyDeep : C.white;
    slide.addShape(SH.roundRect, {
      x: 6.23,
      y,
      w: 6.28,
      h: 0.78,
      rectRadius: 0.05,
      fill: { color: C.white },
      line: { color: item.color, pt: 1.25 },
    });
    addNumberCircle(slide, 6.45, y + 0.13, 0.52, item.n, item.color, textColor);
    slide.addText(item.title, {
      x: 7.15,
      y: y + 0.16,
      w: 1.65,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.2,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(item.q, {
      x: 8.78,
      y: y + 0.18,
      w: 3.35,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.7,
      color: C.slate,
      margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 6.23,
    y: 6.13,
    w: 6.28,
    h: 0.62,
    rectRadius: 0.05,
    fill: { color: C.greenSoft },
    line: { color: C.green, pt: 1.2 },
  });
  slide.addText("SALE DEL BLOQUE", {
    x: 6.52,
    y: 6.32,
    w: 1.65,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    charSpacing: 0.8,
    color: C.green,
    margin: 0,
  });
  slide.addText("Variable + sensor + umbral + regla escrita", {
    x: 8.2,
    y: 6.27,
    w: 3.94,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.6,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText("Siguiente: recursos, software, seguridad y alcance real.", {
    x: 1.45,
    y: 6.5,
    w: 4.02,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.8,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, { skipOverlap: true });
}

(async () => {
  await pptx.writeFile({ fileName: outputPptx });
  console.log(`PPTX generado: ${outputPptx}`);
  console.log(`Diapositivas: ${pptx._slides.length}`);
})();
