const path = require("path");
const fs = require("fs");
const JSZip = require("../../../../tools/slides-system/node_modules/jszip");
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
  subject: "Taller 4 - Del dato a la accion",
  title: "Taller 4 - Del dato a la accion",
});

const SH = pptx.ShapeType;
const W = 13.333;
const H = 7.5;
const rootDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "../../../..");
const outputPptx = path.join(rootDir, "Taller-04-Del-dato-a-la-accion.pptx");
const t3Media = path.join(repoRoot, "talleres", "03", "media");
const assetsDir = path.join(__dirname, "assets");

const C = {
  navy: "082B5C",
  navyDeep: "031D3B",
  blue: "1D4E89",
  cyan: "35B7C6",
  cyanSoft: "DDF4F6",
  red: "D62027",
  redSoft: "FBE7E8",
  paper: "F5F2EC",
  white: "FFFFFF",
  ink: "182B3A",
  slate: "5F6B7A",
  border: "D8DEE6",
  softBlue: "E9EEF4",
  softNeutral: "EEF3EF",
  gold: "E0BC5A",
  goldSoft: "FAF1DA",
  green: "2E8B57",
  greenSoft: "E5F3EA",
  amber: "E0A323",
  mist: "EDF1F5",
};

const IMG = {
  lockup: path.join(repoRoot, "reuniones", "2026-06-22-socio-comunitario", "assets", "lockup-vinculacion-dark.png"),
  lockupW: path.join(repoRoot, "reuniones", "2026-06-22-socio-comunitario", "assets", "lockup-vinculacion-white.png"),
  mapa: path.join(assetsDir, "mapa-limpio.png"),
  mapaZoom: path.join(assetsDir, "mapa-zoom.png"),
  ficha: path.join(assetsDir, "ficha-panel-geogreen.png"),
  inventario: path.join(assetsDir, "inventario-filas.png"),
  alertas: path.join(assetsDir, "alertas-tarjetas.png"),
  mapaFull: path.join(repoRoot, "docs", "capturas-app", "01-mapa-red-contenedores.png"),
  fichaFull: path.join(repoRoot, "docs", "capturas-app", "02-ficha-contenedor.png"),
  inventarioFull: path.join(repoRoot, "docs", "capturas-app", "04-inventario-contenedores.png"),
  alertasFull: path.join(repoRoot, "docs", "capturas-app", "05-alertas-recorte.png"),
  ruta: path.join(repoRoot, "docs", "capturas-app", "03-ruta-retiro.png"),
  movil: path.join(repoRoot, "docs", "capturas-app", "07-movil-ficha-contenedor.png"),
  estudiantes: path.join(t3Media, "generadas", "apertura-estudiantes-innovacion-geogreen.png"),
  sistema: path.join(t3Media, "generadas", "sistema-geogreen-sensor-dato-respuesta.png"),
  agentico: path.join(t3Media, "generadas", "desarrollo-agentico-prototipado-supervisado.png"),
  agenticoVert: path.join(t3Media, "generadas", "desarrollo-agentico-apertura-bloque3.png"),
  prototipo: path.join(t3Media, "fotos", "prototipo-oled-geogreen-landscape.png"),
  roles: path.join(repoRoot, "docs", "infografias", "infografia-roles-equipo-geogreen-operativa-gptimage.png"),
};

function addImageCrop(slide, p, x, y, w, h, opts = {}) {
  slide.addImage({ path: p, ...imageSizingCrop(p, x, y, w, h), ...opts });
}

function addImageContain(slide, p, x, y, w, h, opts = {}) {
  slide.addImage({ path: p, ...imageSizingContain(p, x, y, w, h), ...opts });
}

function addTopBars(slide, colors = [C.red, C.cyan, C.gold]) {
  const widths = [0.78, 0.44, 0.22];
  let x = 0;
  colors.forEach((color, i) => {
    slide.addShape(SH.rect, { x, y: 0, w: widths[i], h: 0.12, fill: { color }, line: { color } });
    x += widths[i] + 0.08;
  });
}

function addInstitutionalLockup(slide, opts = {}) {
  addImageContain(
    slide,
    opts.white ? IMG.lockupW : IMG.lockup,
    opts.x ?? 11.55,
    opts.y ?? 0.24,
    opts.w ?? 1.42,
    opts.h ?? 1.06
  );
}

function addFooter(slide, number, opts = {}) {
  slide.addText(opts.label || "GeoGreen Escolar · Taller 4", {
    x: 0.72,
    y: 7.16,
    w: 6.2,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.5,
    color: opts.color || C.slate,
    margin: 0,
  });
  slide.addText(String(number).padStart(2, "0"), {
    x: 11.72,
    y: 7.08,
    w: 0.86,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color: opts.color || C.navy,
    align: "right",
    margin: 0,
  });
}

function addHeader(slide, kicker, title, subtitle, number, opts = {}) {
  slide.background = { color: opts.bg || C.paper };
  addTopBars(slide);
  slide.addText(kicker.toUpperCase(), {
    x: 0.72,
    y: 0.36,
    w: 5.6,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    charSpacing: 1.5,
    color: C.red,
    margin: 0,
  });
  slide.addText(title, {
    x: 0.72,
    y: 0.68,
    w: 10.35,
    h: 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.titleSize || 27,
    bold: true,
    color: C.navy,
    margin: 0,
    breakLine: false,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.72,
      y: 1.32,
      w: 10.25,
      h: 0.34,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.4,
      color: C.slate,
      margin: 0,
    });
  }
  addInstitutionalLockup(slide);
  addFooter(slide, number);
}

/** Cierre rojo centrado: la firma de cierre de lamina del programa. */
function closingLine(slide, text, opts = {}) {
  slide.addText(text, {
    x: 0.72,
    y: opts.y ?? 6.48,
    w: 11.89,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.fontSize || 13.6,
    bold: true,
    color: opts.color || C.red,
    align: "center",
    margin: 0,
  });
}

function pill(slide, text, x, y, w, opts = {}) {
  const h = opts.h || 0.36;
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.05,
    fill: { color: opts.fill || C.white },
    line: { color: opts.line || opts.fill || C.border, pt: opts.linePt || 1 },
  });
  slide.addText(text, {
    x: x + 0.1,
    y,
    w: w - 0.2,
    h,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.fontSize || 9.6,
    bold: opts.bold !== false,
    color: opts.color || C.navy,
    align: opts.align || "center",
    valign: "mid",
    margin: 0,
  });
}

/** Tarjeta navy con rotulo y bajada, usada sobre imagenes a sangre. */
function overlayCard(slide, x, y, w, h, label, body, opts = {}) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.05,
    fill: { color: opts.fill || C.navy },
    line: { color: opts.line || opts.accent || C.navy, pt: opts.line ? 1.5 : 1 },
  });
  slide.addText(label.toUpperCase(), {
    x: x + 0.18,
    y: y + 0.16,
    w: w - 0.36,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.labelSize || 13,
    bold: true,
    color: opts.accent || C.cyan,
    align: "center",
    margin: 0,
  });
  slide.addText(body, {
    x: x + 0.18,
    y: y + 0.48,
    w: w - 0.36,
    h: h - 0.62,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.bodySize || 10.4,
    color: "D8E7F5",
    align: "center",
    margin: 0,
  });
}

function addNotesAndValidate(slide, notes) {
  if (notes) slide.addNotes(notes);
  // Los rotulos van sobre las imagenes de forma intencional.
  warnIfSlideHasOverlaps(slide, pptx, { muteContainment: true });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

/* ============================================================
   INTRODUCCION
   ============================================================ */

// 01 · Portada
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addImageCrop(slide, IMG.mapa, 5.05, 0, 8.28, H);
  // El mapa conserva color y detalle: es la primera evidencia de que el software ya existe.
  slide.addShape(SH.rect, {
    x: 5.05,
    y: 0,
    w: 2.1,
    h: H,
    fill: { color: C.navyDeep, transparency: 20 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  slide.addShape(SH.rect, {
    x: 5.05,
    y: 0,
    w: 0.08,
    h: H,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addShape(SH.rect, {
    x: 5.13,
    y: 5.95,
    w: 8.2,
    h: 1.55,
    fill: { color: C.navyDeep, transparency: 8 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  pill(slide, "GEOGREEN ESCOLAR · TALLER 4", 0.7, 0.64, 2.84, {
    fill: "153B61",
    line: "315779",
    color: C.white,
  });
  slide.addText("Del dato\na la acción", {
    x: 0.7,
    y: 1.44,
    w: 4.05,
    h: 1.86,
    fontFace: TYPOGRAPHY.display,
    fontSize: 43,
    bold: true,
    color: C.white,
    margin: 0,
    lineSpacingMultiple: 0.94,
    breakLine: false,
  });
  slide.addShape(SH.rect, { x: 0.72, y: 3.58, w: 1.28, h: 0.08, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("REGLAS · INTERFACES · PRUEBAS", {
    x: 0.72,
    y: 3.9,
    w: 4.1,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    charSpacing: 1.4,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Un número no decide.", {
    x: 0.72,
    y: 4.58,
    w: 4.1,
    h: 0.4,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.4,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("Hoy construyen el sistema que convierte ese dato en una respuesta.", {
    x: 0.72,
    y: 5.02,
    w: 4.04,
    h: 1.0,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19.2,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("25 AGO 2026 · AIEP OSORNO", {
    x: 0.72,
    y: 6.72,
    w: 4.1,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    charSpacing: 1.2,
    color: "9FB6CE",
    margin: 0,
  });
  const flujo = [
    ["01", "DATO", C.cyan],
    ["02", "REGLA", C.gold],
    ["03", "RESPUESTA", C.red],
  ];
  flujo.forEach((item, i) => {
    const x = 6.0 + i * 2.14;
    slide.addText(item[0], {
      x,
      y: 6.35,
      w: 0.35,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.4,
      bold: true,
      color: item[2],
      margin: 0,
    });
    slide.addText(item[1], {
      x: x + 0.42,
      y: 6.31,
      w: 1.22,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.4,
      bold: true,
      color: C.white,
      margin: 0,
    });
    if (i < flujo.length - 1) {
      slide.addShape(SH.chevron, {
        x: x + 1.66,
        y: 6.36,
        w: 0.18,
        h: 0.18,
        fill: { color: "7792AC" },
        line: { color: "7792AC" },
      });
    }
  });
  addInstitutionalLockup(slide, { white: true, x: 11.5, y: 0.44, w: 1.5, h: 1.12 });
  addNotesAndValidate(slide, "Abrir con el mapa real de GeoGreen. Hoy el software convierte una medicion en una decision.");
}

// 02 · Continuidad
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  slide.addText("LO QUE YA CONSTRUYERON", {
    x: 0.72,
    y: 0.44,
    w: 6,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    charSpacing: 1.6,
    color: C.red,
    margin: 0,
  });
  slide.addText("Tres piezas. Un sistema.", {
    x: 0.72,
    y: 0.8,
    w: 7.0,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 29,
    bold: true,
    color: C.navy,
    margin: 0,
    breakLine: false,
  });
  slide.addText("El software conecta lo que ya investigaron, eligieron y prototiparon.", {
    x: 0.72,
    y: 1.45,
    w: 7.2,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.4,
    color: C.slate,
    margin: 0,
  });

  const hitos = [
    { k: "TALLER 1", t: "PROBLEMA", d: "Qué ocurre y a quién afecta.", accent: C.cyan },
    { k: "TALLER 2", t: "MATERIAL", d: "Qué residuo permite comprenderlo.", accent: C.gold },
    { k: "TALLER 3", t: "VARIABLE", d: "Qué sensor puede observarla.", accent: C.green },
  ];
  hitos.forEach((h, i) => {
    const y = 2.2 + i * 1.18;
    slide.addShape(SH.rect, {
      x: 0.72,
      y,
      w: 0.09,
      h: 0.88,
      fill: { color: h.accent },
      line: { color: h.accent },
    });
    slide.addText(h.k, {
      x: 1.04,
      y: y + 0.03,
      w: 1.1,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.6,
      bold: true,
      charSpacing: 1.2,
      color: h.accent,
      margin: 0,
    });
    slide.addText(h.t, {
      x: 2.08,
      y: y + 0.02,
      w: 1.65,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.5,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(h.d, {
      x: 1.04,
      y: y + 0.4,
      w: 3.3,
      h: 0.32,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.7,
      color: C.slate,
      margin: 0,
    });
  });
  slide.addShape(SH.chevron, {
    x: 4.54,
    y: 3.12,
    w: 0.52,
    h: 0.72,
    fill: { color: C.red },
    line: { color: C.red },
  });
  // El producto digital domina la lámina: las tres piezas previas desembocan aquí.
  slide.addShape(SH.roundRect, {
    x: 5.2,
    y: 1.92,
    w: 7.42,
    h: 4.54,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
    shadow: { type: "outer", color: "7B8A99", opacity: 0.18, blur: 2, angle: 45, distance: 1 },
  });
  slide.addShape(SH.rect, { x: 5.2, y: 1.92, w: 7.42, h: 0.38, fill: { color: C.navy }, line: { color: C.navy } });
  [[5.42, C.red], [5.63, C.gold], [5.84, C.green]].forEach(([x, color]) => {
    slide.addShape(SH.ellipse, { x, y: 2.04, w: 0.1, h: 0.1, fill: { color }, line: { color } });
  });
  slide.addText("PROTOTIPO DIGITAL · TALLER 4", {
    x: 6.08,
    y: 2.0,
    w: 3.2,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.6,
    bold: true,
    charSpacing: 1,
    color: C.white,
    margin: 0,
  });
  addImageCrop(slide, IMG.mapaFull, 5.38, 2.48, 7.06, 3.72);
  slide.addShape(SH.roundRect, {
    x: 9.24,
    y: 5.72,
    w: 2.92,
    h: 0.54,
    rectRadius: 0.04,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("DATO → DECISIÓN", {
    x: 9.24,
    y: 5.72,
    w: 2.92,
    h: 0.54,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.8,
    bold: true,
    color: C.white,
    align: "center",
    valign: "mid",
    margin: 0,
  });

  slide.addText("Hoy no parten de cero: integran lo que ya saben en una experiencia que otra persona puede usar.", {
    x: 0.72,
    y: 6.45,
    w: 11.89,
    h: 0.4,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.2,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addInstitutionalLockup(slide, { x: 11.5, y: 0.28, w: 1.44, h: 1.08 });
  addFooter(slide, 2);
  addNotesAndValidate(slide, "Pedir que cada equipo tenga a la vista sus tres productos anteriores antes de avanzar.");
}

// 03 · Objetivo de la sesion
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addTopBars(slide);
  slide.addText("OBJETIVO DE LA SESIÓN", {
    x: 0.72,
    y: 0.78,
    w: 6,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    charSpacing: 1.6,
    color: C.cyan,
    margin: 0,
  });
  slide.addText(
    [
      { text: "Construir un prototipo que ", options: { color: C.white } },
      { text: "recibe un dato", options: { color: C.cyan, bold: true } },
      { text: ", ", options: { color: C.white } },
      { text: "aplica su regla", options: { color: C.gold, bold: true } },
      { text: " y ", options: { color: C.white } },
      { text: "propone una respuesta", options: { color: C.red, bold: true } },
      { text: ".", options: { color: C.white } },
    ],
    {
      x: 0.72,
      y: 1.3,
      w: 6.3,
      h: 2.16,
      fontFace: TYPOGRAPHY.display,
      fontSize: 29,
      bold: true,
      lineSpacingMultiple: 1.08,
      margin: 0,
    }
  );
  const verbo = [
    ["01", "RECIBE", "una entrada que puede cambiar", C.cyan],
    ["02", "INTERPRETA", "una regla que el equipo definió", C.gold],
    ["03", "RESPONDE", "un mensaje que orienta una acción", C.red],
  ];
  verbo.forEach((item, i) => {
    const y = 3.84 + i * 0.66;
    slide.addText(item[0], {
      x: 0.72,
      y,
      w: 0.42,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      bold: true,
      color: item[3],
      margin: 0,
    });
    slide.addText(item[1], {
      x: 1.2,
      y: y - 0.03,
      w: 1.38,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(item[2], {
      x: 2.58,
      y: y - 0.02,
      w: 3.8,
      h: 0.3,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.4,
      color: "AFC4D8",
      margin: 0,
    });
  });
  slide.addShape(SH.rect, { x: 0.72, y: 6.04, w: 5.98, h: 0.02, fill: { color: "315779" }, line: { color: "315779" } });
  slide.addText("Y demostrar con pruebas qué funciona, qué cambió y qué todavía debe validarse.", {
    x: 0.72,
    y: 6.28,
    w: 5.98,
    h: 0.62,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.1,
    bold: true,
    color: C.white,
    margin: 0,
  });

  // La ficha real funciona como una radiografía del objetivo, no como decoración.
  slide.addShape(SH.roundRect, {
    x: 7.38,
    y: 1.36,
    w: 5.22,
    h: 5.72,
    rectRadius: 0.05,
    fill: { color: "0C2B4C" },
    line: { color: "315779", pt: 1.2 },
  });
  addImageContain(slide, IMG.ficha, 7.68, 1.66, 2.74, 5.16);
  slide.addText("UN DATO", {
    x: 10.72,
    y: 2.0,
    w: 1.55,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.6,
    bold: true,
    charSpacing: 1.1,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("91 %", {
    x: 10.72,
    y: 2.28,
    w: 1.55,
    h: 0.6,
    fontFace: TYPOGRAPHY.display,
    fontSize: 31,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addShape(SH.rect, { x: 10.72, y: 3.2, w: 1.42, h: 0.04, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("UNA REGLA", {
    x: 10.72,
    y: 3.48,
    w: 1.55,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.6,
    bold: true,
    charSpacing: 1.1,
    color: C.gold,
    margin: 0,
  });
  slide.addText("≥ 80\nNIVEL LLENO", {
    x: 10.72,
    y: 3.78,
    w: 1.55,
    h: 0.74,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addShape(SH.rect, { x: 10.72, y: 4.86, w: 1.42, h: 0.04, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("UNA RESPUESTA", {
    x: 10.72,
    y: 5.14,
    w: 1.55,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.6,
    bold: true,
    charSpacing: 0.9,
    color: C.red,
    margin: 0,
  });
  slide.addText("Programar retiro", {
    x: 10.72,
    y: 5.48,
    w: 1.55,
    h: 0.7,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.2,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addInstitutionalLockup(slide, { white: true, x: 11.5, y: 0.42, w: 1.44, h: 1.08 });
  addFooter(slide, 3, { color: "7E97B4" });
  addNotesAndValidate(slide, "La ficha de la derecha es GeoGreen funcionando: el mismo recorrido que ellos van a construir en pequeno.");
}

// 04 · Tres capacidades
{
  const slide = pptx.addSlide();
  addHeader(slide, "Lo que se practica hoy", "Tres capacidades, en este orden", "Ninguna se puede saltar: cada una habilita la siguiente.", 4);

  const bloques = [
    {
      n: "01",
      t: "Comprender",
      d: "¿Qué significa el dato dentro del problema?",
      verbos: "dato · unidad · contexto",
      color: C.cyan,
    },
    {
      n: "02",
      t: "Especificar",
      d: "¿Qué debe ocurrir con cada valor posible?",
      verbos: "reglas · límites · mensajes",
      color: C.gold,
    },
    {
      n: "03",
      t: "Construir y comprobar",
      d: "¿La interfaz responde como el equipo definió?",
      verbos: "interfaz · casos · evidencia",
      color: C.red,
    },
  ];

  bloques.forEach((b, i) => {
    const x = 0.78 + i * 4.04;
    const y = 2.14 + i * 0.42;
    slide.addText(b.n, {
      x,
      y,
      w: 1.25,
      h: 0.76,
      fontFace: TYPOGRAPHY.display,
      fontSize: 44,
      bold: true,
      color: b.color,
      margin: 0,
    });
    slide.addShape(SH.rect, {
      x,
      y: y + 0.92,
      w: 3.52,
      h: 0.06,
      fill: { color: b.color },
      line: { color: b.color },
    });
    slide.addText("CAPACIDAD", {
      x: x + 1.34,
      y: y + 0.18,
      w: 2.05,
      h: 0.28,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      bold: true,
      charSpacing: 1.1,
      color: C.slate,
      margin: 0,
    });
    slide.addText(b.t, {
      x,
      y: y + 1.22,
      w: 3.52,
      h: 0.66,
      fontFace: TYPOGRAPHY.display,
      fontSize: 21.5,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(b.d, {
      x,
      y: y + 2.0,
      w: 3.45,
      h: 0.7,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.2,
      color: C.slate,
      margin: 0,
    });
    slide.addText(b.verbos.toUpperCase(), {
      x,
      y: y + 2.9,
      w: 3.48,
      h: 0.28,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.6,
      bold: true,
      charSpacing: 1.05,
      color: b.color,
      margin: 0,
    });
    if (i < 2) {
      slide.addShape(SH.line, {
        x: x + 3.56,
        y: y + 0.62,
        w: 0.46,
        h: 0.42,
        line: { color: "B6C0CA", pt: 1.4, beginArrowType: "none", endArrowType: "triangle" },
      });
    }
  });

  slide.addShape(SH.rect, { x: 0.72, y: 6.34, w: 11.89, h: 0.02, fill: { color: C.border }, line: { color: C.border } });
  slide.addText("El agente acelera la construcción.", {
    x: 0.72,
    y: 6.54,
    w: 4.3,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.6,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("El equipo conserva el significado y la comprobación.", {
    x: 5.4,
    y: 6.54,
    w: 6.7,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.6,
    bold: true,
    color: C.red,
    align: "right",
    margin: 0,
  });
  addNotesAndValidate(
    slide,
    "Los siete objetivos especificos del programa se agrupan aqui: 1-2 en Comprender, 3-4 en Especificar, 5-7 en Construir y comprobar."
  );
}

// 05 · Mapa de la clase
{
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa de la clase", "Noventa minutos con ritmo de taller", "Primero se entiende. Después se construye, se prueba y se explica.", 5);

  const bloques = [
    { n: "1", t: "Un número no toma decisiones", min: 15, color: C.navy },
    { n: "2", t: "Del dato al estado", min: 20, color: C.blue },
    { n: "3", t: "Construir una interfaz que responda", min: 35, color: C.red },
    { n: "4", t: "Probar, explicar y dejar evidencia", min: 20, color: C.amber },
  ];

  // Agenda editorial: una línea por movimiento, con el trabajo práctico como masa dominante.
  bloques.forEach((b, i) => {
    const y = 2.12 + i * 0.92;
    slide.addText(b.n.padStart(2, "0"), {
      x: 0.76,
      y: y + 0.03,
      w: 0.42,
      h: 0.28,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9,
      bold: true,
      color: b.color,
      margin: 0,
    });
    slide.addText(`${b.min} min`, {
      x: 1.18,
      y: y - 0.08,
      w: 1.02,
      h: 0.42,
      fontFace: TYPOGRAPHY.display,
      fontSize: 17,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addShape(SH.rect, {
      x: 2.25,
      y: y + 0.03,
      w: 0.08,
      h: 0.4,
      fill: { color: b.color },
      line: { color: b.color },
    });
    slide.addText(b.t, {
      x: 2.58,
      y: y - 0.06,
      w: 5.12,
      h: 0.48,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.2,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addShape(SH.rect, {
      x: 0.76,
      y: y + 0.58,
      w: 7.18,
      h: 0.012,
      fill: { color: C.border },
      line: { color: C.border },
    });
  });

  slide.addShape(SH.rect, {
    x: 8.42,
    y: 1.96,
    w: 4.18,
    h: 3.98,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("55", {
    x: 8.8,
    y: 2.25,
    w: 2.0,
    h: 1.15,
    fontFace: TYPOGRAPHY.display,
    fontSize: 66,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("MINUTOS", {
    x: 10.75,
    y: 2.83,
    w: 1.4,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    bold: true,
    charSpacing: 1.2,
    color: C.white,
    margin: 0,
  });
  slide.addText("construyendo, probando y dejando evidencia", {
    x: 8.82,
    y: 3.62,
    w: 3.36,
    h: 1.14,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addShape(SH.rect, { x: 8.82, y: 5.1, w: 0.9, h: 0.06, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("La explicación abre el camino. El trabajo del equipo produce el aprendizaje.", {
    x: 8.82,
    y: 5.38,
    w: 3.34,
    h: 0.48,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.6,
    color: "C9DAEC",
    margin: 0,
  });

  const barX = 0.76;
  const barY = 6.28;
  const barW = 11.84;
  let cursor = barX;
  bloques.forEach((b) => {
    const w = (b.min / 90) * barW;
    slide.addShape(SH.rect, { x: cursor, y: barY, w: w - 0.04, h: 0.22, fill: { color: b.color }, line: { color: b.color } });
    cursor += w;
  });
  slide.addText("90 MIN", {
    x: 11.62,
    y: 6.62,
    w: 0.98,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.6,
    bold: true,
    color: C.slate,
    align: "right",
    margin: 0,
  });
  addNotesAndValidate(slide, "Mostrar la proporcion: los bloques 3 y 4 ocupan mas de la mitad de la sesion.");
}

// 06 · Producto de salida
{
  const slide = pptx.addSlide();
  addHeader(slide, "Producto de la sesión", "Una carpeta que se abre, se prueba y se explica", "El resultado no depende de una promesa: queda visible en archivos y evidencia.", 6);

  const filas = [
    ["index.html", "Interfaz funcional en el navegador", C.cyan],
    ["ESPECIFICACION.md", "Variable, unidad, reglas y límites", C.gold],
    ["registro-pruebas.md", "Tres resultados esperados y observados", C.green],
    ["cambio-aplicado.md", "Una mejora comprobada", C.red],
    ["captura-prototipo.png", "Evidencia visual del avance", C.blue],
  ];

  // Ventana del prototipo: el producto principal ocupa la mayor masa visual.
  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 1.98,
    w: 7.0,
    h: 4.38,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
    shadow: { type: "outer", color: "7B8A99", opacity: 0.17, blur: 2, angle: 45, distance: 1 },
  });
  slide.addShape(SH.rect, { x: 0.72, y: 1.98, w: 7.0, h: 0.4, fill: { color: C.navy }, line: { color: C.navy } });
  [[0.96, C.red], [1.18, C.gold], [1.4, C.green]].forEach(([x, color]) => {
    slide.addShape(SH.ellipse, { x, y: 2.12, w: 0.1, h: 0.1, fill: { color }, line: { color } });
  });
  slide.addText("prototipo-digital-equipo / index.html", {
    x: 1.7,
    y: 2.09,
    w: 3.7,
    h: 0.18,
    fontFace: "Consolas",
    fontSize: 7.6,
    color: "D8E7F5",
    margin: 0,
  });
  addImageCrop(slide, IMG.fichaFull, 0.94, 2.56, 6.56, 3.48);
  slide.addShape(SH.roundRect, {
    x: 4.38,
    y: 5.56,
    w: 2.78,
    h: 0.5,
    rectRadius: 0.04,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("CAMBIAR DATO → OBSERVAR", {
    x: 4.38,
    y: 5.56,
    w: 2.78,
    h: 0.5,
    fontFace: TYPOGRAPHY.display,
    fontSize: 9.8,
    bold: true,
    color: C.white,
    align: "center",
    valign: "mid",
    margin: 0,
  });

  slide.addText("PROTOTIPO DIGITAL", {
    x: 8.1,
    y: 2.02,
    w: 4.2,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    bold: true,
    charSpacing: 1.25,
    color: C.red,
    margin: 0,
  });
  slide.addText("La evidencia vive junto al código", {
    x: 8.1,
    y: 2.38,
    w: 4.3,
    h: 0.54,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  filas.forEach((item, i) => {
    const y = 3.2 + i * 0.58;
    slide.addShape(SH.rect, {
      x: 8.1,
      y: y + 0.02,
      w: 0.07,
      h: 0.36,
      fill: { color: item[2] },
      line: { color: item[2] },
    });
    slide.addText(item[0], {
      x: 8.36,
      y,
      w: 1.82,
      h: 0.22,
      fontFace: "Consolas",
      fontSize: 9.2,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(item[1], {
      x: 10.2,
      y,
      w: 2.18,
      h: 0.34,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
      color: C.slate,
      margin: 0,
    });
  });

  slide.addShape(SH.rect, { x: 8.1, y: 6.18, w: 4.28, h: 0.02, fill: { color: C.border }, line: { color: C.border } });
  slide.addText("PROVISIONAL", {
    x: 8.1,
    y: 6.4,
    w: 1.3,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.2,
    bold: true,
    charSpacing: 1.1,
    color: C.red,
    margin: 0,
  });
  slide.addText("no significa incompleto: significa comprobable y todavía abierto a mejorar.", {
    x: 9.36,
    y: 6.38,
    w: 3.04,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    color: C.navy,
    margin: 0,
  });
  addNotesAndValidate(slide, "Insistir: se demuestra la logica del software, no una conexion fisica que todavia no existe.");
}

/* ============================================================
   BLOQUE 1 · Un numero no toma decisiones (15 min)
   ============================================================ */

// 07 · Apertura Bloque 1
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.prototipo, 6.1, 0, W - 6.1, H);
  slide.addShape(SH.rect, { x: 0, y: 0, w: 6.4, h: H, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addShape(SH.rect, {
    x: 6.4,
    y: 0,
    w: 1.5,
    h: H,
    fill: { color: C.navyDeep, transparency: 45 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  addTopBars(slide);
  slide.addText("BLOQUE 1 · 15 MIN", {
    x: 0.72,
    y: 1.72,
    w: 5,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    charSpacing: 1.8,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Un número\nno toma\ndecisiones", {
    x: 0.7,
    y: 2.2,
    w: 5.5,
    h: 2.6,
    fontFace: TYPOGRAPHY.display,
    fontSize: 40,
    bold: true,
    color: C.white,
    lineSpacingMultiple: 0.96,
    margin: 0,
    breakLine: false,
  });
  slide.addShape(SH.rect, { x: 0.74, y: 5.04, w: 1.7, h: 0.07, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("CONTEXTO · REGLA · TRADUCCIÓN · RESPUESTA", {
    x: 0.72,
    y: 5.32,
    w: 5.4,
    h: 0.4,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.4,
    bold: true,
    charSpacing: 0.8,
    color: "AEC4DB",
    margin: 0,
  });
  addInstitutionalLockup(slide, { white: true, x: 11.5, y: 0.5, w: 1.44, h: 1.08 });
  addFooter(slide, 7, { color: "7E97B4" });
  addNotesAndValidate(slide, "Bloque corto y conversado. La lamina siguiente debe incomodar un poco.");
}

// 08 · El 68
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  slide.addText("68", {
    x: 0,
    y: 1.9,
    w: W,
    h: 3.1,
    fontFace: TYPOGRAPHY.display,
    fontSize: 210,
    bold: true,
    color: C.navy,
    align: "center",
    valign: "mid",
    margin: 0,
  });
  slide.addText("¿Qué decisión podrían tomar solamente con este número?", {
    x: 0,
    y: 5.5,
    w: W,
    h: 0.5,
    fontFace: TYPOGRAPHY.body,
    fontSize: 18,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 8);
  addNotesAndValidate(slide, "Dejar la lamina en silencio unos segundos. Escuchar 3 o 4 respuestas sin corregir ninguna.");
}

// 09 · El reveal
{
  const slide = pptx.addSlide();
  addHeader(slide, "La diferencia clave", "Medir no es lo mismo que decidir", "Un número se vuelve útil cuando alguien puede interpretarlo y actuar.", 9);

  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 2.1,
    w: 4.32,
    h: 3.96,
    rectRadius: 0.06,
    fill: { color: C.mist },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("68", {
    x: 0.72,
    y: 2.56,
    w: 4.32,
    h: 1.5,
    fontFace: TYPOGRAPHY.display,
    fontSize: 88,
    bold: true,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  slide.addText("Solo un valor", {
    x: 0.72,
    y: 4.16,
    w: 4.32,
    h: 0.44,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText("¿De qué? ¿Es alto? ¿Hay que actuar?\n¿Quién debería enterarse?", {
    x: 0.9,
    y: 4.78,
    w: 3.96,
    h: 0.8,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12,
    color: C.slate,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.chevron, {
    x: 5.32,
    y: 3.82,
    w: 0.78,
    h: 0.56,
    fill: { color: C.cyan },
    line: { color: C.cyan },
  });

  slide.addShape(SH.roundRect, {
    x: 6.4,
    y: 2.1,
    w: 6.21,
    h: 3.96,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  addImageContain(slide, IMG.ficha, 6.72, 2.42, 1.96, 3.32);
  slide.addText("68 %", {
    x: 8.94,
    y: 2.5,
    w: 3.4,
    h: 0.86,
    fontFace: TYPOGRAPHY.display,
    fontSize: 42,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  pill(slide, "ESTADO ATENCIÓN", 8.94, 3.5, 2.5, {
    fill: C.gold,
    line: C.gold,
    color: C.navy,
    fontSize: 10.4,
    h: 0.38,
  });
  slide.addText("Planificar una revisión", {
    x: 8.94,
    y: 4.12,
    w: 3.4,
    h: 0.5,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Dato + contexto + regla + forma de comunicarlo\n= una decisión posible.", {
    x: 8.94,
    y: 4.9,
    w: 3.4,
    h: 0.86,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.6,
    color: "C9DAEC",
    margin: 0,
  });

  closingLine(slide, "Si el sistema solo entregara el número, ¿el problema estaría resuelto?", { y: 6.36 });
  addNotesAndValidate(slide, "El mismo 68 del Taller 3, ahora resuelto por software y no por el semaforo del prototipo.");
}

// 10 · Declaracion
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  slide.addShape(SH.rect, { x: 0.72, y: 2.3, w: 0.14, h: 2.9, fill: { color: C.red }, line: { color: C.red } });
  slide.addText(
    [
      { text: "Un dato describe algo.\n", options: { color: C.slate } },
      { text: "Un sistema útil ayuda a entender qué significa\ny qué se puede hacer con él.", options: { color: C.navy } },
    ],
    {
      x: 1.24,
      y: 2.42,
      w: 10.6,
      h: 2.7,
      fontFace: TYPOGRAPHY.display,
      fontSize: 33,
      bold: true,
      lineSpacingMultiple: 1.16,
      margin: 0,
    }
  );
  slide.addText("Esa diferencia es todo el taller.", {
    x: 1.24,
    y: 5.5,
    w: 8,
    h: 0.44,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15,
    bold: true,
    color: C.red,
    margin: 0,
  });
  addInstitutionalLockup(slide);
  addFooter(slide, 10);
  addNotesAndValidate(slide, "Lamina de respiro. Dejarla mientras se cierra la conversacion de apertura.");
}

// 11 · El recorrido completo
{
  const slide = pptx.addSlide();
  addHeader(slide, "El recorrido completo", "Dónde entra el software", "El sensor abre. La decisión cierra. Lo del medio es lo que ustedes escriben.", 11);
  // Tres masas distintas: fenómeno físico, interpretación programada y respuesta humana.
  slide.addShape(SH.rect, { x: 0.72, y: 2.08, w: 2.92, h: 3.98, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  addImageCrop(slide, IMG.prototipo, 0.72, 2.08, 2.92, 2.62);
  slide.addShape(SH.rect, { x: 0.72, y: 4.22, w: 2.92, h: 0.48, fill: { color: C.navyDeep, transparency: 8 }, line: { color: C.navyDeep, transparency: 100 } });
  slide.addText("MUNDO FÍSICO", {
    x: 1.02,
    y: 4.36,
    w: 2.3,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    charSpacing: 1.1,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("El sensor observa", {
    x: 1.02,
    y: 4.94,
    w: 2.3,
    h: 0.38,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.5,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Distancia → porcentaje", {
    x: 1.02,
    y: 5.42,
    w: 2.3,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    color: "AEC4DB",
    margin: 0,
  });

  slide.addShape(SH.chevron, { x: 3.76, y: 3.7, w: 0.44, h: 0.5, fill: { color: C.cyan }, line: { color: C.cyan } });

  slide.addShape(SH.rect, { x: 4.34, y: 2.08, w: 4.72, h: 3.98, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("SOFTWARE", {
    x: 4.68,
    y: 2.4,
    w: 1.5,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    bold: true,
    charSpacing: 1.2,
    color: C.red,
    margin: 0,
  });
  slide.addText("Convierte un valor en significado", {
    x: 4.68,
    y: 2.74,
    w: 3.9,
    h: 0.44,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17.5,
    bold: true,
    color: C.white,
    margin: 0,
  });
  const motor = [
    ["DATO", "68 %", "lectura actual", C.cyan],
    ["REGLA", "40–79", "rango amarillo", C.gold],
    ["ESTADO", "ATENCIÓN", "ya tiene significado", C.red],
  ];
  motor.forEach((item, i) => {
    const y = 3.48 + i * 0.72;
    slide.addText(item[0], {
      x: 4.68,
      y,
      w: 0.9,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.2,
      bold: true,
      charSpacing: 1,
      color: item[3],
      margin: 0,
    });
    slide.addText(item[1], {
      x: 5.64,
      y: y - 0.06,
      w: 1.52,
      h: 0.34,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.2,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(item[2], {
      x: 7.18,
      y,
      w: 1.48,
      h: 0.26,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.6,
      color: "AFC4D8",
      margin: 0,
    });
    if (i < motor.length - 1) {
      slide.addShape(SH.line, { x: 5.64, y: y + 0.42, w: 2.98, h: 0, line: { color: "315779", pt: 1 } });
    }
  });

  slide.addShape(SH.chevron, { x: 9.2, y: 3.7, w: 0.44, h: 0.5, fill: { color: C.red }, line: { color: C.red } });

  slide.addShape(SH.rect, { x: 9.78, y: 2.08, w: 2.83, h: 3.98, fill: { color: C.white }, line: { color: C.border, pt: 1 } });
  slide.addText("PERSONA", {
    x: 10.08,
    y: 2.38,
    w: 2.23,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.2,
    bold: true,
    charSpacing: 1,
    color: C.red,
    align: "center",
    margin: 0,
  });
  slide.addText("comprende y decide", {
    x: 10.08,
    y: 2.68,
    w: 2.23,
    h: 0.38,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.6,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addImageContain(slide, IMG.ficha, 10.44, 3.14, 1.5, 1.94);
  slide.addShape(SH.rect, { x: 10.08, y: 5.28, w: 2.23, h: 0.06, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("Planificar una revisión", {
    x: 10.08,
    y: 5.5,
    w: 2.23,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.8,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  closingLine(slide, "El sensor mide. El software interpreta. La persona decide.", { y: 6.4 });
  addNotesAndValidate(slide, "Es el mismo diagrama del Taller 3 con otros rotulos: alli se veia el hardware, aqui el trabajo del software.");
}

// 12 · GeoGreen como especificacion
{
  const slide = pptx.addSlide();
  addHeader(slide, "De la idea a la regla", "GeoGreen convertido en una especificación", "Estas cinco líneas son las que su equipo tendrá que escribir en el Bloque 2.", 12, { titleSize: 25 });

  const filas = [
    ["variable", "llenado", C.cyan],
    ["unidad", "%", C.cyan],
    ["verde", "valor < 40", C.green],
    ["amarillo", "40 ≤ valor < 80", C.gold],
    ["rojo", "valor ≥ 80", C.red],
  ];

  slide.addShape(SH.rect, {
    x: 0.72,
    y: 2.04,
    w: 6.88,
    h: 4.04,
    fill: { color: C.navyDeep },
    line: { color: C.navyDeep },
  });
  slide.addShape(SH.rect, { x: 0.72, y: 2.04, w: 6.88, h: 0.42, fill: { color: "102E4C" }, line: { color: "102E4C" } });
  slide.addText("ESPECIFICACION.md", {
    x: 1.04,
    y: 2.16,
    w: 2.4,
    h: 0.18,
    fontFace: "Consolas",
    fontSize: 8.2,
    bold: true,
    color: "D8E7F5",
    margin: 0,
  });
  filas.forEach((f, i) => {
    const y = 2.78 + i * 0.56;
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: 1.02,
      y,
      w: 0.34,
      h: 0.25,
      fontFace: "Consolas",
      fontSize: 8.4,
      color: "55718B",
      align: "right",
      margin: 0,
    });
    slide.addShape(SH.rect, {
      x: 1.62,
      y: y + 0.04,
      w: 0.07,
      h: 0.25,
      fill: { color: f[2] },
      line: { color: f[2] },
    });
    slide.addText(f[0], {
      x: 1.88,
      y,
      w: 1.62,
      h: 0.28,
      fontFace: "Consolas",
      fontSize: 11.2,
      bold: true,
      color: f[2],
      margin: 0,
    });
    slide.addText(":", {
      x: 3.46,
      y,
      w: 0.18,
      h: 0.28,
      fontFace: "Consolas",
      fontSize: 11.2,
      color: "8EA5BA",
      margin: 0,
    });
    slide.addText(f[1], {
      x: 3.72,
      y,
      w: 3.42,
      h: 0.28,
      fontFace: "Consolas",
      fontSize: 11.2,
      color: C.white,
      margin: 0,
    });
  });
  slide.addShape(SH.rect, { x: 1.02, y: 5.74, w: 6.0, h: 0.02, fill: { color: "315779" }, line: { color: "315779" } });
  slide.addText("La especificación permite anticipar qué debería ocurrir antes de abrir la aplicación.", {
    x: 1.02,
    y: 5.76,
    w: 5.94,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.6,
    color: "AFC4D8",
    margin: 0,
  });

  slide.addShape(SH.chevron, { x: 7.82, y: 3.64, w: 0.48, h: 0.52, fill: { color: C.gold }, line: { color: C.gold } });

  slide.addShape(SH.rect, { x: 8.54, y: 2.04, w: 4.06, h: 4.04, fill: { color: C.white }, line: { color: C.border, pt: 1 } });
  slide.addText("PRUEBA MENTAL", {
    x: 8.9,
    y: 2.38,
    w: 3.34,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    charSpacing: 1.2,
    color: C.red,
    margin: 0,
  });
  slide.addText("Si entra 68…", {
    x: 8.9,
    y: 2.78,
    w: 3.34,
    h: 0.52,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("68 %", {
    x: 8.9,
    y: 3.42,
    w: 1.68,
    h: 0.8,
    fontFace: TYPOGRAPHY.display,
    fontSize: 40,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  pill(slide, "ATENCIÓN", 10.52, 3.58, 1.46, { fill: C.gold, line: C.gold, color: C.navy, h: 0.34, fontSize: 9.2 });
  slide.addShape(SH.rect, { x: 8.9, y: 4.46, w: 3.0, h: 0.05, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("Se aproxima al nivel de retiro", {
    x: 8.9,
    y: 4.78,
    w: 3.08,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("ACCIÓN POSIBLE  ·  planificar una revisión", {
    x: 8.9,
    y: 5.48,
    w: 3.08,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.7,
    bold: true,
    charSpacing: 0.65,
    color: C.red,
    margin: 0,
  });

  closingLine(slide, "Si otra persona lee estas cinco líneas, debería poder predecir lo que muestra la pantalla.", { y: 6.34 });
  addNotesAndValidate(slide, "Esta lamina es la plantilla del Bloque 2. Conviene dejarla proyectada mientras trabajan.");
}

// 13 · La interfaz traduce
{
  const slide = pptx.addSlide();
  addHeader(slide, "Lo que ve una persona", "Una interfaz no decora el dato: lo traduce", "El mismo sistema, tres traducciones según la decisión que apoya.", 13);

  const paneles = [
    { n: "01", t: "¿Dónde está?", d: "El mapa ubica el hecho en la ciudad.", img: IMG.mapaFull, color: C.cyan },
    { n: "02", t: "¿Qué atiendo primero?", d: "El inventario ordena por prioridad.", img: IMG.inventarioFull, color: C.gold },
    { n: "03", t: "¿Qué no puede esperar?", d: "La alerta reduce todo a lo urgente.", img: IMG.alertasFull, color: C.red },
  ];

  paneles.forEach((p, i) => {
    const x = 0.72 + i * 4.02;
    slide.addShape(SH.roundRect, {
      x,
      y: 2.06,
      w: 3.85,
      h: 4.04,
      rectRadius: 0.04,
      fill: { color: C.white },
      line: { color: C.border, pt: 1 },
    });
    slide.addShape(SH.rect, { x, y: 2.06, w: 3.85, h: 0.1, fill: { color: p.color }, line: { color: p.color } });
    addImageCrop(slide, p.img, x + 0.16, 2.34, 3.53, 2.48);
    slide.addText(p.n, {
      x: x + 0.28,
      y: 4.98,
      w: 0.46,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      bold: true,
      color: p.color,
      margin: 0,
    });
    slide.addText(p.t, {
      x: x + 0.78,
      y: 4.94,
      w: 2.72,
      h: 0.42,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.8,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(p.d, {
      x: x + 0.3,
      y: 5.46,
      w: 3.3,
      h: 0.56,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.6,
      color: C.slate,
      margin: 0,
    });
  });

  closingLine(slide, "Elegir qué mostrar y qué dejar fuera ya es una decisión del equipo.", { y: 6.3 });
  addNotesAndValidate(slide, "Preguntar cual de las tres necesitaria la persona que identificaron en el Taller 1.");
}

// 14 · Construir rapido con agentes
{
  const slide = pptx.addSlide();
  addHeader(slide, "El atajo real", "Construir rápido con agentes", "Una buena definición puede convertirse en una primera versión funcional en minutos.", 14);

  slide.addText("EL EQUIPO ENTREGA", {
    x: 0.72,
    y: 2.04,
    w: 3.64,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    charSpacing: 1.2,
    color: C.red,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 2.38,
    w: 3.7,
    h: 3.72,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Quiero una interfaz que:", {
    x: 1.02,
    y: 2.72,
    w: 3.1,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    ["entrada", "porcentaje 0–100"],
    ["reglas", "verde · amarillo · rojo"],
    ["salida", "estado + mensaje + acción"],
    ["pruebas", "20 · 68 · 92"],
  ].forEach((item, i) => {
    const y = 3.28 + i * 0.56;
    slide.addText(item[0].toUpperCase(), {
      x: 1.02,
      y,
      w: 0.82,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 7.8,
      bold: true,
      charSpacing: 0.8,
      color: i === 0 ? C.cyan : i === 1 ? C.gold : i === 2 ? C.red : C.green,
      margin: 0,
    });
    slide.addText(item[1], {
      x: 1.84,
      y: y - 0.02,
      w: 2.14,
      h: 0.28,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      color: C.ink,
      margin: 0,
    });
  });
  slide.addShape(SH.rect, { x: 1.02, y: 5.64, w: 3.08, h: 0.02, fill: { color: C.border }, line: { color: C.border } });
  slide.addText("La intención ya viene con criterios para revisar el resultado.", {
    x: 1.02,
    y: 5.8,
    w: 3.06,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.6,
    color: C.slate,
    margin: 0,
  });

  slide.addShape(SH.chevron, { x: 4.6, y: 3.88, w: 0.38, h: 0.46, fill: { color: C.red }, line: { color: C.red } });
  slide.addShape(SH.rect, { x: 5.12, y: 2.38, w: 2.08, h: 3.72, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("CODEX", {
    x: 5.46,
    y: 2.72,
    w: 1.4,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  ["crea", "ordena", "explica", "corrige"].forEach((t, i) => {
    const y = 3.36 + i * 0.54;
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: 5.46,
      y,
      w: 0.34,
      h: 0.2,
      fontFace: "Consolas",
      fontSize: 8.4,
      color: i % 2 === 0 ? C.cyan : C.gold,
      margin: 0,
    });
    slide.addText(t.toUpperCase(), {
      x: 5.86,
      y: y - 0.02,
      w: 0.92,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      bold: true,
      charSpacing: 0.8,
      color: C.white,
      margin: 0,
    });
  });
  slide.addText("rápido", {
    x: 5.46,
    y: 5.66,
    w: 1.4,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.2,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.chevron, { x: 7.38, y: 3.88, w: 0.38, h: 0.46, fill: { color: C.cyan }, line: { color: C.cyan } });
  slide.addText("EL EQUIPO RECIBE", {
    x: 7.92,
    y: 2.04,
    w: 4.68,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    charSpacing: 1.2,
    color: C.red,
    margin: 0,
  });
  slide.addShape(SH.rect, { x: 7.92, y: 2.38, w: 4.68, h: 3.72, fill: { color: C.white }, line: { color: C.border, pt: 1 } });
  slide.addShape(SH.rect, { x: 7.92, y: 2.38, w: 4.68, h: 0.34, fill: { color: C.navy }, line: { color: C.navy } });
  addImageCrop(slide, IMG.inventarioFull, 8.1, 2.9, 4.32, 2.82);
  pill(slide, "PRIMERA VERSIÓN", 10.24, 5.46, 1.86, { fill: C.red, line: C.red, color: C.white, h: 0.34, fontSize: 8.6 });

  closingLine(slide, "El agente entrega velocidad. El equipo transforma esa velocidad en una decisión defendible.", { y: 6.34 });
  addNotesAndValidate(slide, "Contar como se construyo la app GeoGreen: el agente escribio gran parte, pero cada umbral se decidio y se comprobo.");
}

// 15 · Pedir apariencia vs especificar
{
  const slide = pptx.addSlide();
  addHeader(slide, "Cómo se pide", "Pedir una apariencia no es especificar un sistema", "Las dos frases piden lo mismo. Solo una se puede comprobar.", 15);

  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 2.16,
    w: 5.72,
    h: 3.5,
    rectRadius: 0.06,
    fill: { color: C.mist },
    line: { color: C.border, pt: 1 },
  });
  pill(slide, "NO ALCANZA", 1.06, 2.46, 1.9, { fill: C.white, line: C.border, color: C.slate, fontSize: 9.4, h: 0.32 });
  slide.addText("“Haz una aplicación bacán\npara nuestro sensor.”", {
    x: 1.06,
    y: 3.1,
    w: 5.04,
    h: 1.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20,
    bold: true,
    color: C.slate,
    margin: 0,
  });
  slide.addText("No dice qué mide, cómo clasificar ni qué mostrar.\nNo hay forma de saber si quedó bien.", {
    x: 1.06,
    y: 4.5,
    w: 5.04,
    h: 0.86,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.4,
    color: C.slate,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 6.89,
    y: 2.16,
    w: 5.72,
    h: 3.5,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  pill(slide, "SE PUEDE CONSTRUIR Y PROBAR", 7.23, 2.46, 3.3, {
    fill: C.gold,
    line: C.gold,
    color: C.navy,
    fontSize: 9.4,
    h: 0.32,
  });
  slide.addText("“Recibe un porcentaje de 0 a 100,\naplica tres estados y explica\nqué acción corresponde.”", {
    x: 7.23,
    y: 3.1,
    w: 5.04,
    h: 1.5,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Debe poder probarse con 20, 68 y 92.", {
    x: 7.23,
    y: 4.82,
    w: 5.04,
    h: 0.5,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13,
    bold: true,
    color: C.gold,
    margin: 0,
  });

  closingLine(slide, "La diferencia no es la extensión: es que la segunda trae sus propias pruebas.", { y: 6.06 });
  addNotesAndValidate(slide, "Leer las dos en voz alta. Cada equipo preparara su version antes de pedir la implementacion.");
}

// 16 · El ciclo con el agente
{
  const slide = pptx.addSlide();
  addHeader(slide, "El método", "El agente acelera. El equipo decide.", "Cuatro movimientos que se repiten durante todo el sprint del Bloque 3.", 16);
  const pasos = [
    { n: "01", t: "El equipo define", d: "Problema, variable, reglas y acción esperada.", color: C.red },
    { n: "02", t: "El agente construye", d: "Estructura, interfaz, lógica y datos de prueba.", color: C.cyan },
    { n: "03", t: "El equipo prueba", d: "¿Muestra lo correcto? ¿La regla se cumple?", color: C.gold },
    { n: "04", t: "Se corrige y verifica", d: "Con el error observado y el esperado a la vista.", color: C.red },
  ];
  // El producto queda al centro; el proceso lo rodea y vuelve sobre sí mismo.
  slide.addShape(SH.roundRect, {
    x: 4.6,
    y: 2.42,
    w: 4.14,
    h: 3.24,
    rectRadius: 0.05,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
    shadow: { type: "outer", color: "7B8A99", opacity: 0.15, blur: 2, angle: 45, distance: 1 },
  });
  slide.addShape(SH.rect, { x: 4.6, y: 2.42, w: 4.14, h: 0.34, fill: { color: C.navy }, line: { color: C.navy } });
  addImageCrop(slide, IMG.fichaFull, 4.8, 2.96, 3.74, 2.34);
  slide.addText("PROTOTIPO 0.1", {
    x: 5.54,
    y: 5.26,
    w: 2.24,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    charSpacing: 1.15,
    color: C.red,
    align: "center",
    margin: 0,
  });

  const pos = [
    [0.72, 2.18],
    [9.06, 2.18],
    [9.06, 4.56],
    [0.72, 4.56],
  ];
  pasos.forEach((p, i) => {
    const [x, y] = pos[i];
    slide.addShape(SH.rect, { x, y, w: 3.54, h: 1.34, fill: { color: i === 1 ? C.navy : C.white }, line: { color: p.color, pt: 1.3 } });
    slide.addText(p.n, {
      x: x + 0.22,
      y: y + 0.18,
      w: 0.48,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.4,
      bold: true,
      color: p.color,
      margin: 0,
    });
    slide.addText(p.t, {
      x: x + 0.72,
      y: y + 0.12,
      w: 2.5,
      h: 0.34,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.6,
      bold: true,
      color: i === 1 ? C.white : C.navy,
      margin: 0,
    });
    slide.addText(p.d, {
      x: x + 0.22,
      y: y + 0.62,
      w: 3.06,
      h: 0.48,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.8,
      color: i === 1 ? "C9DAEC" : C.slate,
      margin: 0,
    });
  });
  const arrowStyle = { color: "98A8B7", pt: 1.5, beginArrowType: "none", endArrowType: "triangle" };
  const arrowBack = { color: "98A8B7", pt: 1.5, beginArrowType: "triangle", endArrowType: "none" };
  slide.addShape(SH.line, { x: 4.32, y: 2.86, w: 0.64, h: 0, line: arrowStyle });
  slide.addShape(SH.line, { x: 8.74, y: 2.86, w: 0.28, h: 0, line: arrowStyle });
  slide.addShape(SH.line, { x: 10.82, y: 3.56, w: 0, h: 0.94, line: arrowStyle });
  slide.addShape(SH.line, { x: 8.68, y: 5.22, w: 0.34, h: 0, line: arrowBack });
  slide.addShape(SH.line, { x: 4.26, y: 5.22, w: 0.34, h: 0, line: arrowBack });
  slide.addShape(SH.line, { x: 2.48, y: 3.62, w: 0, h: 0.92, line: arrowBack });
  slide.addText("REPETIR HASTA QUE LA EVIDENCIA COINCIDA CON LA INTENCIÓN", {
    x: 3.16,
    y: 6.28,
    w: 7.02,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    charSpacing: 1.2,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, "Este ciclo es exactamente el que van a ejecutar en el sprint del Bloque 3.");
}

// 17 · Que no se delega
{
  const slide = pptx.addSlide();
  addHeader(slide, "La frontera", "La velocidad se delega. El criterio, no.", "La diferencia está en quién responde por cada decisión.", 17);

  slide.addShape(SH.rect, {
    x: 0.72,
    y: 2.06,
    w: 4.66,
    h: 4.2,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("AGENTE", {
    x: 1.08,
    y: 2.42,
    w: 3.94,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    bold: true,
    charSpacing: 1.4,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Carga mecánica", {
    x: 1.08,
    y: 2.82,
    w: 3.94,
    h: 0.52,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  ["escribir código", "maquetar la interfaz", "crear datos de prueba", "explicar archivos"].forEach((t, i) => {
    const y = 3.62 + i * 0.54;
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: 1.08,
      y,
      w: 0.42,
      h: 0.22,
      fontFace: "Consolas",
      fontSize: 8.2,
      color: C.cyan,
      margin: 0,
    });
    slide.addText(t, {
      x: 1.58,
      y: y - 0.03,
      w: 3.1,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.6,
      bold: true,
      color: C.navy,
      margin: 0,
    });
  });
  slide.addShape(SH.rect, { x: 1.08, y: 5.86, w: 3.88, h: 0.02, fill: { color: C.border }, line: { color: C.border } });
  slide.addText("Produce velocidad", {
    x: 1.08,
    y: 6.02,
    w: 3.86,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.6,
    bold: true,
    color: C.slate,
    margin: 0,
  });

  slide.addShape(SH.rect, { x: 5.68, y: 2.06, w: 0.08, h: 4.2, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("EQUIPO", {
    x: 6.18,
    y: 2.42,
    w: 5.98,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    bold: true,
    charSpacing: 1.4,
    color: C.red,
    margin: 0,
  });
  slide.addText("Criterio y responsabilidad", {
    x: 6.18,
    y: 2.82,
    w: 5.98,
    h: 0.52,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    ["PROPÓSITO", "qué problema vale la pena resolver"],
    ["SIGNIFICADO", "qué representa el dato en su contexto"],
    ["LÍMITES", "dónde cambia cada estado"],
    ["VEREDICTO", "si el resultado observado es aceptable"],
  ].forEach((item, i) => {
    const y = 3.58 + i * 0.58;
    slide.addText(item[0], {
      x: 6.18,
      y,
      w: 1.2,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.2,
      bold: true,
      charSpacing: 0.8,
      color: C.red,
      margin: 0,
    });
    slide.addText(item[1], {
      x: 7.54,
      y: y - 0.02,
      w: 4.58,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.4,
      bold: true,
      color: C.navy,
      margin: 0,
    });
  });
  slide.addShape(SH.rect, { x: 6.18, y: 5.92, w: 5.94, h: 0.02, fill: { color: C.border }, line: { color: C.border } });
  slide.addText("Produce un proyecto que el equipo puede defender", {
    x: 6.18,
    y: 6.08,
    w: 5.94,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    color: C.red,
    margin: 0,
  });
  addNotesAndValidate(slide, "Decir explicitamente que la columna derecha es lo que el jurado va a preguntar.");
}

// 18 · Activacion por equipos
{
  const slide = pptx.addSlide();
  addHeader(slide, "Activen sus equipos · 5 min", "Antes de programar, tres frases", "Todavía no hay que definir umbrales ni pantallas.", 18);

  const frases = [
    "Nuestra propuesta recibirá un dato sobre…",
    "Ese dato podría ayudar a comprender…",
    "Al ver la información, una persona podría decidir…",
  ];
  frases.forEach((f, i) => {
    const y = 2.06 + i * 1.08;
    const ultima = i === 2;
    slide.addShape(SH.rect, {
      x: 0.72,
      y,
      w: 11.89,
      h: 0.92,
      fill: { color: ultima ? C.navy : C.white },
      line: { color: ultima ? C.navy : C.border, pt: 1 },
    });
    slide.addText(String(i + 1), {
      x: 1.02,
      y,
      w: 0.7,
      h: 0.92,
      fontFace: TYPOGRAPHY.display,
      fontSize: 26,
      bold: true,
      color: ultima ? C.gold : i === 0 ? C.cyan : C.gold,
      valign: "mid",
      margin: 0,
    });
    slide.addText(f, {
      x: 1.9,
      y,
      w: 9.98,
      h: 0.92,
      fontFace: TYPOGRAPHY.display,
      fontSize: 18.2,
      bold: true,
      color: ultima ? C.white : C.navy,
      valign: "mid",
      margin: 0,
    });
  });

  slide.addText("CADA ROL APORTA UNA COSA", {
    x: 0.72,
    y: 5.54,
    w: 3.0,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.2,
    bold: true,
    charSpacing: 1.1,
    color: C.red,
    margin: 0,
  });
  [
    ["COORDINA", "registra"],
    ["INVESTIGA", "conecta"],
    ["DISEÑA", "prioriza"],
    ["TECNOLOGÍA", "estructura"],
    ["PRUEBAS", "propone"],
    ["COMUNICA", "explica"],
  ].forEach((r, i) => {
    const x = 0.72 + i * 1.98;
    slide.addShape(SH.rect, { x, y: 5.98, w: 1.78, h: 0.66, fill: { color: i === 3 ? C.navy : C.white }, line: { color: i === 3 ? C.navy : C.border, pt: 1 } });
    slide.addText(r[0], {
      x: x + 0.12,
      y: 6.08,
      w: 1.54,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 7.6,
      bold: true,
      charSpacing: 0.7,
      color: i === 3 ? C.cyan : C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(r[1], {
      x: x + 0.12,
      y: 6.32,
      w: 1.54,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.4,
      color: i === 3 ? C.white : C.slate,
      align: "center",
      margin: 0,
    });
  });

  slide.addText("Si la tercera frase no aparece, todavía falta explicar para qué sirve el dato.", {
    x: 3.82,
    y: 5.5,
    w: 8.78,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    bold: true,
    color: C.red,
    align: "right",
    margin: 0,
  });
  addNotesAndValidate(slide, "Cinco minutos reales. Pasar por las mesas leyendo solo la tercera frase.");
}

// 19 · Preguntas guia
{
  const slide = pptx.addSlide();
  slide.background = { color: C.softBlue };
  addTopBars(slide);
  slide.addText("ANTES DE AVANZAR", {
    x: 0.72,
    y: 0.8,
    w: 6,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    charSpacing: 1.5,
    color: C.red,
    margin: 0,
  });
  slide.addText("Para conversar antes de avanzar", {
    x: 0.72,
    y: 1.16,
    w: 9,
    h: 0.6,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const preguntas = [
    "¿Qué diferencia hay entre medir una situación y comprenderla?",
    "¿Quién usa la información y qué decisión necesita tomar?",
    "¿Qué parte puede construir rápidamente un agente?",
    "¿Cómo demostrarían que la interfaz responde bien y no solo se ve bien?",
  ];
  preguntas.forEach((p, i) => {
    const x = 0.72 + (i % 2) * 6.05;
    const y = 2.5 + Math.floor(i / 2) * 2.24;
    slide.addShape(SH.rect, { x, y, w: 0.09, h: 1.66, fill: { color: C.red }, line: { color: C.red } });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: x + 0.36,
      y,
      w: 0.8,
      h: 0.5,
      fontFace: TYPOGRAPHY.display,
      fontSize: 24,
      bold: true,
      color: C.red,
      margin: 0,
    });
    slide.addText(p, {
      x: x + 0.36,
      y: y + 0.6,
      w: 5.2,
      h: 1.06,
      fontFace: TYPOGRAPHY.display,
      fontSize: 19,
      color: C.navy,
      margin: 0,
    });
  });
  addInstitutionalLockup(slide);
  addFooter(slide, 19);
  addNotesAndValidate(slide, "Elegir dos segun como venga la conversacion; las otras quedan para el cierre del taller.");
}

// 20 · Cierre del bloque 1
{
  const slide = pptx.addSlide();
  addHeader(slide, "Cierre del bloque 1", "El dato ya tiene un destino", "El equipo puede explicar qué entra, qué significa y qué decisión puede apoyar.", 20);

  slide.addShape(SH.rect, { x: 0.72, y: 2.02, w: 4.72, h: 4.12, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("DATO", {
    x: 1.12,
    y: 2.48,
    w: 3.9,
    h: 0.48,
    fontFace: TYPOGRAPHY.display,
    fontSize: 25,
    bold: true,
    color: C.cyan,
    margin: 0,
  });
  slide.addShape(SH.chevron, { x: 1.16, y: 3.14, w: 0.4, h: 0.34, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("SIGNIFICADO", {
    x: 1.72,
    y: 3.02,
    w: 3.18,
    h: 0.48,
    fontFace: TYPOGRAPHY.display,
    fontSize: 23,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addShape(SH.chevron, { x: 1.16, y: 3.92, w: 0.4, h: 0.34, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("DECISIÓN", {
    x: 1.72,
    y: 3.8,
    w: 3.18,
    h: 0.48,
    fontFace: TYPOGRAPHY.display,
    fontSize: 23,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addShape(SH.rect, { x: 1.12, y: 4.62, w: 3.72, h: 0.04, fill: { color: "315779" }, line: { color: "315779" } });
  slide.addText("El software completa el puente entre una medición y una acción posible.", {
    x: 1.12,
    y: 4.96,
    w: 3.7,
    h: 0.82,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.4,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText("EL EQUIPO PUEDE DECIR", {
    x: 5.92,
    y: 2.08,
    w: 6.48,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    bold: true,
    charSpacing: 1.2,
    color: C.red,
    margin: 0,
  });
  slide.addText("“Nuestro sistema recibe…", {
    x: 5.92,
    y: 2.62,
    w: 5.9,
    h: 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addShape(SH.line, { x: 9.46, y: 3.0, w: 2.72, h: 0, line: { color: C.cyan, pt: 2 } });
  slide.addText("muestra…", {
    x: 5.92,
    y: 3.5,
    w: 2.9,
    h: 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addShape(SH.line, { x: 8.72, y: 3.88, w: 3.46, h: 0, line: { color: C.gold, pt: 2 } });
  slide.addText("y ayuda a decidir…", {
    x: 5.92,
    y: 4.38,
    w: 3.84,
    h: 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addShape(SH.line, { x: 9.78, y: 4.76, w: 2.4, h: 0, line: { color: C.red, pt: 2 } });
  slide.addText("Producto del bloque: primer mapa dato → significado → decisión del equipo.", {
    x: 5.92,
    y: 5.34,
    w: 6.24,
    h: 0.46,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    bold: true,
    color: C.green,
    margin: 0,
  });

  slide.addShape(SH.rect, { x: 0.72, y: 6.34, w: 11.89, h: 0.5, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addShape(SH.chevron, { x: 1.02, y: 6.48, w: 0.34, h: 0.24, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText(
    [
      { text: "Bloque 2:  ", options: { bold: true, color: C.gold } },
      { text: "ese mapa se convierte en variable, unidad, reglas, estados, mensajes y acciones.", options: { color: C.white } },
    ],
    {
      x: 1.58,
      y: 6.34,
      w: 10.58,
      h: 0.5,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.5,
      valign: "mid",
      margin: 0,
    }
  );
  addNotesAndValidate(slide, "Cerrar en 60 segundos. La frase de comprobacion es el pase de entrada al Bloque 2.");
}

/* ================================================================
   BLOQUE 2 · Del dato al estado (20 min)
   ================================================================ */

// 21 · Apertura de bloque
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });

  slide.addText("BLOQUE 2 · 20 MIN", {
    x: 0.76, y: 0.55, w: 3.1, h: 0.28,
    fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true,
    charSpacing: 1.8, color: C.cyan, margin: 0,
  });
  slide.addText("Del dato\nal estado", {
    x: 0.76, y: 1.13, w: 5.5, h: 1.52,
    fontFace: TYPOGRAPHY.display, fontSize: 35, bold: true,
    color: C.white, margin: 0, breakLine: false,
  });
  slide.addText("Una regla precisa convierte una lectura en una respuesta que se puede anticipar, construir y probar.", {
    x: 0.78, y: 3.02, w: 4.75, h: 0.9,
    fontFace: TYPOGRAPHY.body, fontSize: 14, color: "D7E4F2",
    margin: 0, breakLine: false,
  });

  slide.addText("68", {
    x: 6.45, y: 1.05, w: 3.35, h: 1.78,
    fontFace: TYPOGRAPHY.display, fontSize: 82, bold: true,
    color: C.white, align: "right", margin: 0,
  });
  slide.addText("%", {
    x: 9.86, y: 1.38, w: 0.62, h: 0.72,
    fontFace: TYPOGRAPHY.display, fontSize: 30, bold: true,
    color: C.gold, margin: 0,
  });
  slide.addShape(SH.rect, { x: 6.62, y: 3.2, w: 5.72, h: 0.42, fill: { color: "17395F" }, line: { color: "17395F" } });
  slide.addShape(SH.rect, { x: 6.62, y: 3.2, w: 2.29, h: 0.42, fill: { color: C.green }, line: { color: C.green } });
  slide.addShape(SH.rect, { x: 8.91, y: 3.2, w: 2.29, h: 0.42, fill: { color: C.amber }, line: { color: C.amber } });
  slide.addShape(SH.rect, { x: 11.2, y: 3.2, w: 1.14, h: 0.42, fill: { color: C.red }, line: { color: C.red } });
  slide.addShape(SH.line, { x: 10.51, y: 2.96, w: 0, h: 0.92, line: { color: C.white, pt: 2 } });
  pill(slide, "ATENCIÓN", 8.55, 4.16, 2.2, { fill: C.gold, line: C.gold, color: C.navyDeep, h: 0.46, fontSize: 11.2 });
  slide.addText("El número no cambió.\nLo que cambió fue su significado.", {
    x: 7.1, y: 5.02, w: 4.72, h: 0.84,
    fontFace: TYPOGRAPHY.body, fontSize: 15.2, bold: true,
    color: C.white, align: "center", margin: 0,
  });
  slide.addText("VARIABLE  →  REGLA  →  ESTADO  →  MENSAJE  →  ACCIÓN", {
    x: 0.78, y: 6.5, w: 11.8, h: 0.32,
    fontFace: TYPOGRAPHY.body, fontSize: 11, bold: true,
    charSpacing: 0.7, color: C.cyan, align: "center", margin: 0,
  });
  addFooter(slide, 21, { color: "9EB3CA" });
  addNotesAndValidate(slide, "Abrir el bloque con el 68 %. Pedir una lectura rapida: que significa por si solo. Luego revelar que el estado depende de una regla definida por el equipo.");
}

// 22 · Las siete piezas
{
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía de una especificación", "Siete piezas convierten una lectura en respuesta", "Si falta una, el software tendrá que adivinar.", 22, { titleSize: 25 });

  const pieces = [
    ["01", "VARIABLE", "Qué cambia", C.cyan],
    ["02", "UNIDAD", "Cómo se expresa", C.blue],
    ["03", "RANGO", "Qué valores esperamos", C.gold],
    ["04", "REGLA", "Cómo se clasifica", C.red],
    ["05", "ESTADO", "Qué significa", C.green],
    ["06", "MENSAJE", "Qué comprende alguien", "8A55B0"],
    ["07", "ACCIÓN", "Qué decisión puede apoyar", C.navy],
  ];
  const xs = [0.84, 2.58, 4.32, 6.06, 7.8, 9.54, 11.28];
  pieces.forEach((p, i) => {
    const x = xs[i];
    slide.addShape(SH.line, { x: x + 1.44, y: 3.07, w: i < 6 ? 0.31 : 0, h: 0, line: { color: C.border, pt: 2, endArrowType: i < 6 ? "triangle" : undefined } });
    slide.addShape(SH.roundRect, {
      x, y: 2.34, w: 1.46, h: 1.58, rectRadius: 0.05,
      fill: { color: C.white }, line: { color: p[3], pt: 1.2 },
    });
    slide.addText(p[0], { x: x + 0.12, y: 2.51, w: 0.35, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 12, bold: true, color: p[3], margin: 0 });
    slide.addText(p[1], { x: x + 0.12, y: 2.91, w: 1.22, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 10.5, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addText(p[2], { x: x + 0.12, y: 3.31, w: 1.22, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 8.3, color: C.slate, align: "center", margin: 0 });
  });

  slide.addShape(SH.roundRect, { x: 1.02, y: 4.62, w: 11.28, h: 1.02, rectRadius: 0.04, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("GeoGreen", { x: 1.28, y: 4.86, w: 1.18, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 12, bold: true, color: C.cyan, margin: 0 });
  slide.addText("llenado", { x: 2.55, y: 4.86, w: 1.06, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("%", { x: 4.18, y: 4.86, w: 0.45, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("0–100", { x: 5.05, y: 4.86, w: 0.82, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("40 / 80", { x: 6.35, y: 4.86, w: 0.88, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("atención", { x: 7.63, y: 4.86, w: 1.0, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.gold, align: "center", margin: 0 });
  slide.addText("se aproxima al retiro", { x: 8.92, y: 4.82, w: 1.55, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 9.3, color: C.white, align: "center", margin: 0 });
  slide.addText("planificar revisión", { x: 10.68, y: 4.82, w: 1.32, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 9.3, color: C.white, align: "center", margin: 0 });
  closingLine(slide, "Una interfaz útil comienza mucho antes de elegir colores o botones.", { y: 6.32 });
  addNotesAndValidate(slide, "Recorrer las siete piezas sin detenerse demasiado. Usar la fila GeoGreen como ejemplo ya resuelto y anticipar que el equipo construira su propia version.");
}

// 23 · Lectura directa y dato procesado
{
  const slide = pptx.addSlide();
  addHeader(slide, "Primera decisión", "¿Mostrar la lectura o transformarla?", "El sensor habla en su escala. La persona necesita una medida comprensible.", 23);

  slide.addShape(SH.roundRect, { x: 0.86, y: 2.04, w: 3.02, h: 3.78, rectRadius: 0.05, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("LECTURA DEL SENSOR", { x: 1.14, y: 2.38, w: 2.46, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 9.5, bold: true, charSpacing: 1.1, color: C.cyan, align: "center", margin: 0 });
  slide.addText("18", { x: 1.15, y: 2.94, w: 1.6, h: 1.0, fontFace: TYPOGRAPHY.display, fontSize: 48, bold: true, color: C.white, align: "right", margin: 0 });
  slide.addText("cm", { x: 2.82, y: 3.31, w: 0.62, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.gold, margin: 0 });
  slide.addText("Distancia desde el sensor\nhasta el contenido", { x: 1.28, y: 4.32, w: 2.18, h: 0.62, fontFace: TYPOGRAPHY.body, fontSize: 11, color: "D5E3F1", align: "center", margin: 0 });

  slide.addShape(SH.chevron, { x: 4.28, y: 3.18, w: 1.25, h: 1.0, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("CONVERSIÓN", { x: 4.21, y: 4.44, w: 1.4, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 8.7, bold: true, color: C.slate, align: "center", margin: 0 });

  slide.addShape(SH.roundRect, { x: 5.92, y: 2.04, w: 3.1, h: 3.78, rectRadius: 0.05, fill: { color: C.white }, line: { color: C.cyan, pt: 1.5 } });
  slide.addText("DATO PARA LA PERSONA", { x: 6.2, y: 2.38, w: 2.54, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 9.5, bold: true, charSpacing: 1.0, color: C.blue, align: "center", margin: 0 });
  slide.addText("68", { x: 6.34, y: 2.94, w: 1.62, h: 1.0, fontFace: TYPOGRAPHY.display, fontSize: 48, bold: true, color: C.navy, align: "right", margin: 0 });
  slide.addText("%", { x: 8.03, y: 3.31, w: 0.5, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.red, margin: 0 });
  slide.addText("Porcentaje estimado\nde llenado", { x: 6.55, y: 4.32, w: 1.86, h: 0.62, fontFace: TYPOGRAPHY.body, fontSize: 11, color: C.slate, align: "center", margin: 0 });

  slide.addShape(SH.roundRect, { x: 9.46, y: 2.04, w: 2.94, h: 3.78, rectRadius: 0.05, fill: { color: C.softNeutral }, line: { color: C.green, pt: 1.2 } });
  slide.addText("LA PREGUNTA", { x: 9.76, y: 2.38, w: 2.34, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 9.5, bold: true, charSpacing: 1.2, color: C.green, align: "center", margin: 0 });
  slide.addText("¿Qué medida ayuda mejor a comprender el problema?", { x: 9.86, y: 3.0, w: 2.14, h: 1.08, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.navy, align: "center", valign: "mid", margin: 0 });
  slide.addText("Puede ser una lectura directa o un dato calculado.", { x: 9.9, y: 4.5, w: 2.06, h: 0.62, fontFace: TYPOGRAPHY.body, fontSize: 10.2, color: C.slate, align: "center", margin: 0 });
  closingLine(slide, "No cambien de unidad a mitad del recorrido.", { y: 6.34 });
  addNotesAndValidate(slide, "Explicar la diferencia entre lectura directa y dato procesado. Preguntar si el sensor elegido por cada equipo entrega una medida lista para mostrar o necesita conversion.");
}

// 24 · Cuántos estados
{
  const slide = pptx.addSlide();
  addHeader(slide, "Diseñar la decisión", "La cantidad de estados depende del problema", "GeoGreen usa tres. Su propuesta puede necesitar dos, tres o una clasificación diferente.", 24, { titleSize: 25 });

  const configs = [
    { x: 0.86, w: 3.34, n: "2", title: "DECISIÓN BINARIA", body: "detectado / no detectado", colors: [C.navy, C.cyan] },
    { x: 4.52, w: 3.8, n: "3", title: "NIVELES DE ATENCIÓN", body: "normal / atención / crítico", colors: [C.green, C.amber, C.red] },
    { x: 8.64, w: 3.82, n: "N", title: "CATEGORÍAS PROPIAS", body: "las que la decisión realmente necesite", colors: [C.blue, "8A55B0", C.gold, C.green] },
  ];
  configs.forEach((cfg) => {
    slide.addText(cfg.n, { x: cfg.x, y: 2.12, w: cfg.w, h: 1.0, fontFace: TYPOGRAPHY.display, fontSize: 44, bold: true, color: C.navy, align: "center", margin: 0 });
    const segW = (cfg.w - 0.34) / cfg.colors.length;
    cfg.colors.forEach((color, i) => slide.addShape(SH.rect, { x: cfg.x + 0.17 + i * segW, y: 3.3, w: segW, h: 0.34, fill: { color }, line: { color } }));
    slide.addText(cfg.title, { x: cfg.x + 0.18, y: 3.92, w: cfg.w - 0.36, h: 0.32, fontFace: TYPOGRAPHY.display, fontSize: 12.5, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addText(cfg.body, { x: cfg.x + 0.28, y: 4.48, w: cfg.w - 0.56, h: 0.56, fontFace: TYPOGRAPHY.body, fontSize: 10.8, color: C.slate, align: "center", margin: 0 });
  });
  slide.addShape(SH.line, { x: 4.36, y: 2.25, w: 0, h: 3.08, line: { color: C.border, pt: 1 } });
  slide.addShape(SH.line, { x: 8.48, y: 2.25, w: 0, h: 3.08, line: { color: C.border, pt: 1 } });
  slide.addShape(SH.roundRect, { x: 2.48, y: 5.64, w: 8.38, h: 0.7, rectRadius: 0.04, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("La clasificación correcta es la que cambia una decisión, no la que se ve más llamativa.", { x: 2.8, y: 5.64, w: 7.74, h: 0.7, fontFace: TYPOGRAPHY.body, fontSize: 12.5, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
  addNotesAndValidate(slide, "Evitar que los equipos copien por reflejo el semaforo. Cada estado debe corresponder a una diferencia real en lo que una persona comprende o hace.");
}

// 25 · Umbrales
{
  const slide = pptx.addSlide();
  addHeader(slide, "Una frontera precisa", "Un umbral decide dónde cambia el significado", "En GeoGreen, 40 y 80 no son decoración: separan respuestas distintas.", 25);

  const x0 = 1.08;
  const totalW = 11.04;
  const y = 3.32;
  slide.addText("0 %", { x: x0 - 0.16, y: 4.2, w: 0.7, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 11, bold: true, color: C.slate, margin: 0 });
  slide.addText("100 %", { x: x0 + totalW - 0.56, y: 4.2, w: 0.8, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 11, bold: true, color: C.slate, align: "right", margin: 0 });
  slide.addShape(SH.rect, { x: x0, y, w: totalW * 0.4, h: 0.66, fill: { color: C.green }, line: { color: C.green } });
  slide.addShape(SH.rect, { x: x0 + totalW * 0.4, y, w: totalW * 0.4, h: 0.66, fill: { color: C.amber }, line: { color: C.amber } });
  slide.addShape(SH.rect, { x: x0 + totalW * 0.8, y, w: totalW * 0.2, h: 0.66, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("NORMAL", { x: x0, y: 3.32, w: totalW * 0.4, h: 0.66, fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
  slide.addText("ATENCIÓN", { x: x0 + totalW * 0.4, y: 3.32, w: totalW * 0.4, h: 0.66, fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: C.navyDeep, align: "center", valign: "mid", margin: 0 });
  slide.addText("LLENO", { x: x0 + totalW * 0.8, y: 3.32, w: totalW * 0.2, h: 0.66, fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
  [40, 80].forEach((v) => {
    const px = x0 + totalW * (v / 100);
    slide.addShape(SH.line, { x: px, y: 2.52, w: 0, h: 2.08, line: { color: C.navyDeep, pt: 2 } });
    slide.addShape(SH.ellipse, { x: px - 0.28, y: 2.06, w: 0.56, h: 0.56, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
    slide.addText(String(v), { x: px - 0.28, y: 2.06, w: 0.56, h: 0.56, fontFace: TYPOGRAPHY.display, fontSize: 12, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
  });
  slide.addText("menor que 40", { x: 1.1, y: 5.08, w: 4.25, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 12, bold: true, color: C.green, align: "center", margin: 0 });
  slide.addText("desde 40 y menor que 80", { x: 5.4, y: 5.08, w: 4.12, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 12, bold: true, color: "9A6800", align: "center", margin: 0 });
  slide.addText("desde 80", { x: 9.75, y: 5.08, w: 2.35, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 12, bold: true, color: C.red, align: "center", margin: 0 });
  closingLine(slide, "Cada valor debe caer en una zona, y solo en una.", { y: 6.2 });
  addNotesAndValidate(slide, "Leer la barra de izquierda a derecha. Subrayar la diferencia entre menor que y desde. Preparar la pregunta de los valores exactos 40 y 80.");
}

// 26 · Cuatro condiciones de una regla
{
  const slide = pptx.addSlide();
  addHeader(slide, "Control de calidad", "Una regla lista para programarse pasa cuatro pruebas", "No basta con que funcione para los ejemplos fáciles.", 26);
  const checks = [
    ["01", "UNA UNIDAD", "La escala se mantiene de principio a fin.", C.cyan],
    ["02", "SIN VACÍOS", "Todo valor posible obtiene respuesta.", C.green],
    ["03", "SIN DUPLICADOS", "Ningún valor activa dos estados.", C.gold],
    ["04", "LÍMITES DEFINIDOS", "El borde también tiene resultado.", C.red],
  ];
  checks.forEach((c, i) => {
    const x = 0.9 + i * 3.08;
    slide.addShape(SH.roundRect, { x, y: 2.12, w: 2.72, h: 2.78, rectRadius: 0.05, fill: { color: C.white }, line: { color: c[3], pt: 1.2 } });
    slide.addShape(SH.ellipse, { x: x + 0.92, y: 2.42, w: 0.88, h: 0.88, fill: { color: c[3] }, line: { color: c[3] } });
    slide.addText("✓", { x: x + 0.92, y: 2.42, w: 0.88, h: 0.88, fontFace: TYPOGRAPHY.display, fontSize: 23, bold: true, color: i === 2 ? C.navyDeep : C.white, align: "center", valign: "mid", margin: 0 });
    slide.addText(c[0], { x: x + 0.16, y: 2.42, w: 0.38, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 10, bold: true, color: c[3], margin: 0 });
    slide.addText(c[1], { x: x + 0.22, y: 3.62, w: 2.28, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 12, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addText(c[2], { x: x + 0.32, y: 4.14, w: 2.08, h: 0.56, fontFace: TYPOGRAPHY.body, fontSize: 10.2, color: C.slate, align: "center", margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 2.07, y: 5.44, w: 9.18, h: 0.7, rectRadius: 0.04, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("100 valores posibles  →  100 respuestas  →  1 estado por valor", { x: 2.42, y: 5.44, w: 8.48, h: 0.7, fontFace: TYPOGRAPHY.display, fontSize: 14.2, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
  addNotesAndValidate(slide, "Usar esta lamina como lista de chequeo. No explicar codigo aun; mantener la conversacion en decisiones observables.");
}

// 27 · Vacíos y superposiciones
{
  const slide = pptx.addSlide();
  addHeader(slide, "Dos errores silenciosos", "Un vacío no responde. Una superposición responde dos veces.", "Ambos aparecen cuando las condiciones no encajan con precisión.", 27, { titleSize: 24 });

  slide.addShape(SH.roundRect, { x: 0.84, y: 2.02, w: 5.78, h: 3.9, rectRadius: 0.05, fill: { color: C.white }, line: { color: C.red, pt: 1.2 } });
  pill(slide, "VACÍO", 1.18, 2.32, 1.18, { fill: C.redSoft, line: C.red, color: C.red });
  slide.addText("si valor < 40  →  NORMAL\nsi valor > 40  →  ATENCIÓN", { x: 1.18, y: 3.02, w: 3.2, h: 0.96, fontFace: "Aptos Mono", fontSize: 14.2, color: C.ink, margin: 0, breakLine: false });
  slide.addShape(SH.ellipse, { x: 4.9, y: 3.0, w: 0.92, h: 0.92, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("40", { x: 4.9, y: 3.0, w: 0.92, h: 0.92, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
  slide.addText("¿Qué estado recibe exactamente 40?", { x: 1.18, y: 4.64, w: 4.82, h: 0.5, fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: C.red, margin: 0 });

  slide.addShape(SH.roundRect, { x: 6.84, y: 2.02, w: 5.64, h: 3.9, rectRadius: 0.05, fill: { color: C.white }, line: { color: C.gold, pt: 1.2 } });
  pill(slide, "SUPERPOSICIÓN", 7.18, 2.32, 1.74, { fill: C.goldSoft, line: C.gold, color: "8C6500" });
  slide.addText("si valor ≤ 40  →  NORMAL\nsi valor ≥ 40  →  ATENCIÓN", { x: 7.18, y: 3.02, w: 3.2, h: 0.96, fontFace: "Aptos Mono", fontSize: 14.2, color: C.ink, margin: 0, breakLine: false });
  slide.addShape(SH.ellipse, { x: 10.82, y: 3.0, w: 0.92, h: 0.92, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("40", { x: 10.82, y: 3.0, w: 0.92, h: 0.92, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.navyDeep, align: "center", valign: "mid", margin: 0 });
  slide.addText("¿Qué estado gana cuando ambos se cumplen?", { x: 7.18, y: 4.64, w: 4.72, h: 0.5, fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: "8C6500", margin: 0 });
  closingLine(slide, "La regla correcta no obliga al programa a improvisar.", { y: 6.3 });
  addNotesAndValidate(slide, "Presentar los dos errores como diagnostico rapido. Pedir que identifiquen el problema antes de mostrar la pregunta inferior.");
}

// 28 · Casos límite
{
  const slide = pptx.addSlide();
  addHeader(slide, "Prueba relámpago", "Los bordes revelan si la regla está completa", "Predigan el estado antes de mirar la respuesta.", 28);
  const cases = [
    ["39 %", "NORMAL", C.green, C.white],
    ["40 %", "ATENCIÓN", C.amber, C.navyDeep],
    ["79 %", "ATENCIÓN", C.amber, C.navyDeep],
    ["80 %", "LLENO", C.red, C.white],
  ];
  cases.forEach((c, i) => {
    const x = 0.86 + i * 3.08;
    slide.addShape(SH.roundRect, { x, y: 2.22, w: 2.72, h: 3.36, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.border, pt: 1 } });
    slide.addText(c[0], { x: x + 0.16, y: 2.72, w: 2.4, h: 0.76, fontFace: TYPOGRAPHY.display, fontSize: 31, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addShape(SH.line, { x: x + 0.4, y: 3.76, w: 1.92, h: 0, line: { color: C.border, pt: 1.3 } });
    slide.addText("↓", { x: x + 0.96, y: 3.82, w: 0.8, h: 0.5, fontFace: TYPOGRAPHY.display, fontSize: 21, bold: true, color: C.slate, align: "center", margin: 0 });
    slide.addShape(SH.roundRect, { x: x + 0.38, y: 4.5, w: 1.96, h: 0.56, rectRadius: 0.05, fill: { color: c[2] }, line: { color: c[2] } });
    slide.addText(c[1], { x: x + 0.38, y: 4.5, w: 1.96, h: 0.56, fontFace: TYPOGRAPHY.display, fontSize: 12.4, bold: true, color: c[3], align: "center", valign: "mid", margin: 0 });
  });
  closingLine(slide, "Si el borde se puede predecir, la regla se puede programar.", { y: 6.2 });
  addNotesAndValidate(slide, "Dar cinco segundos por caso. La clave es que 40 ya pertenece a atencion y 80 ya pertenece a lleno. Conectar con menor que y desde.");
}

// 29 · La regla en pseudocódigo
{
  const slide = pptx.addSlide();
  addHeader(slide, "La misma decisión, escrita para ejecutarse", "De “cuando… entonces…” a una secuencia sin dudas", "El orden de las condiciones también forma parte de la regla.", 29, { titleSize: 24 });

  slide.addShape(SH.roundRect, { x: 0.84, y: 1.94, w: 7.34, h: 4.42, rectRadius: 0.05, fill: { color: "0B1F33" }, line: { color: "28425C", pt: 1 } });
  slide.addShape(SH.rect, { x: 0.84, y: 1.94, w: 7.34, h: 0.44, fill: { color: "142D46" }, line: { color: "142D46" } });
  [C.red, C.gold, C.green].forEach((color, i) => slide.addShape(SH.ellipse, { x: 1.08 + i * 0.22, y: 2.09, w: 0.1, h: 0.1, fill: { color }, line: { color } }));
  slide.addText("reglas.txt", { x: 1.84, y: 2.03, w: 1.2, h: 0.22, fontFace: "Aptos Mono", fontSize: 8.5, color: "A9BBD0", margin: 0 });
  const code = [
    ["SI", " porcentaje < 40", C.cyan],
    ["    estado = ", "NORMAL", C.green],
    ["SI NO, SI", " porcentaje < 80", C.cyan],
    ["    estado = ", "ATENCIÓN", C.gold],
    ["SI NO", "", C.cyan],
    ["    estado = ", "LLENO", C.red],
  ];
  code.forEach((line, i) => {
    slide.addText([
      { text: line[0], options: { bold: line[0].trim().startsWith("SI"), color: line[2] } },
      { text: line[1], options: { color: line[1].trim().startsWith("porcentaje") ? C.white : line[2], bold: line[1].trim().startsWith("porcentaje") ? false : true } },
    ], { x: 1.32, y: 2.76 + i * 0.5, w: 5.9, h: 0.34, fontFace: "Aptos Mono", fontSize: 15, margin: 0 });
  });

  const annotations = [
    ["PRIMER BORDE", "Todo lo anterior a 40.", 2.56, C.green],
    ["SEGUNDO BORDE", "Lo restante hasta 80.", 3.82, C.gold],
    ["CASO RESTANTE", "Todo lo que queda.", 5.08, C.red],
  ];
  annotations.forEach((a) => {
    slide.addShape(SH.line, { x: 8.18, y: a[2] + 0.34, w: 0.42, h: 0, line: { color: a[3], pt: 1.3 } });
    slide.addShape(SH.roundRect, { x: 8.62, y: a[2], w: 3.74, h: 0.76, rectRadius: 0.04, fill: { color: C.white }, line: { color: a[3], pt: 1.2 } });
    slide.addText(a[0], { x: 8.84, y: a[2] + 0.12, w: 1.52, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 9.5, bold: true, color: a[3], margin: 0 });
    slide.addText(a[1], { x: 10.22, y: a[2] + 0.1, w: 1.9, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 9.5, color: C.slate, margin: 0 });
  });
  closingLine(slide, "“Si no” evita repetir rangos y asegura una única salida.", { y: 6.46, fontSize: 12.8 });
  addNotesAndValidate(slide, "Leer el pseudocodigo como recorrido. Enfatizar que el programa prueba en orden y se detiene al encontrar la primera condicion verdadera.");
}

// 30 · Tres escenarios
{
  const slide = pptx.addSlide();
  addHeader(slide, "La regla ya puede predecirse", "Tres entradas. Tres resultados esperados.", "El mensaje y la acción cambian junto con el estado.", 30);
  const rows = [
    { value: "20 %", state: "NORMAL", message: "Capacidad disponible", action: "Mantener observación", color: C.green, soft: C.greenSoft },
    { value: "68 %", state: "ATENCIÓN", message: "Se aproxima al nivel de retiro", action: "Planificar revisión", color: C.amber, soft: C.goldSoft },
    { value: "92 %", state: "LLENO", message: "Capacidad alcanzada", action: "Priorizar el retiro", color: C.red, soft: C.redSoft },
  ];
  slide.addText("ENTRADA", { x: 0.98, y: 1.98, w: 1.42, h: 0.26, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: C.slate, align: "center", margin: 0 });
  slide.addText("ESTADO", { x: 2.78, y: 1.98, w: 1.72, h: 0.26, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: C.slate, align: "center", margin: 0 });
  slide.addText("MENSAJE", { x: 5.06, y: 1.98, w: 3.34, h: 0.26, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: C.slate, align: "center", margin: 0 });
  slide.addText("ACCIÓN POSIBLE", { x: 9.0, y: 1.98, w: 3.12, h: 0.26, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: C.slate, align: "center", margin: 0 });
  rows.forEach((r, i) => {
    const y = 2.48 + i * 1.18;
    slide.addShape(SH.roundRect, { x: 0.82, y, w: 11.68, h: 0.94, rectRadius: 0.04, fill: { color: i === 1 ? r.soft : C.white }, line: { color: r.color, pt: i === 1 ? 1.5 : 0.8 } });
    slide.addText(r.value, { x: 1.02, y, w: 1.38, h: 0.94, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.navy, align: "center", valign: "mid", margin: 0 });
    slide.addShape(SH.roundRect, { x: 2.72, y: y + 0.22, w: 1.86, h: 0.5, rectRadius: 0.04, fill: { color: r.color }, line: { color: r.color } });
    slide.addText(r.state, { x: 2.72, y: y + 0.22, w: 1.86, h: 0.5, fontFace: TYPOGRAPHY.display, fontSize: 11, bold: true, color: r.color === C.amber ? C.navyDeep : C.white, align: "center", valign: "mid", margin: 0 });
    slide.addText(r.message, { x: 5.04, y, w: 3.38, h: 0.94, fontFace: TYPOGRAPHY.body, fontSize: 11.2, bold: true, color: C.ink, align: "center", valign: "mid", margin: 0 });
    slide.addText(r.action, { x: 8.96, y, w: 3.18, h: 0.94, fontFace: TYPOGRAPHY.body, fontSize: 11.2, color: C.slate, align: "center", valign: "mid", margin: 0 });
  });
  closingLine(slide, "Un caso de prueba declara el resultado antes de abrir la interfaz.", { y: 6.24 });
  addNotesAndValidate(slide, "Recorrer horizontalmente cada fila. Mostrar que probar no es mirar si se ve bonito: es comparar entrada y salida esperada.");
}

// 31 · Estado accesible
{
  const slide = pptx.addSlide();
  addHeader(slide, "Más que un color", "Un estado debe comprenderse en distintas condiciones", "Combinen señales: nombre, forma, texto y una acción posible.", 31);

  slide.addShape(SH.roundRect, { x: 0.82, y: 1.98, w: 5.18, h: 4.26, rectRadius: 0.07, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("68 %", { x: 1.24, y: 2.38, w: 2.28, h: 1.02, fontFace: TYPOGRAPHY.display, fontSize: 42, bold: true, color: C.white, margin: 0 });
  slide.addShape(SH.roundRect, { x: 3.8, y: 2.48, w: 1.54, h: 0.52, rectRadius: 0.05, fill: { color: C.amber }, line: { color: C.amber } });
  slide.addText("ATENCIÓN", { x: 3.8, y: 2.48, w: 1.54, h: 0.52, fontFace: TYPOGRAPHY.display, fontSize: 10.5, bold: true, color: C.navyDeep, align: "center", valign: "mid", margin: 0 });
  slide.addText("Se aproxima al nivel de retiro", { x: 1.24, y: 3.72, w: 4.1, h: 0.52, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.white, margin: 0 });
  slide.addShape(SH.line, { x: 1.24, y: 4.52, w: 4.1, h: 0, line: { color: "365371", pt: 1 } });
  slide.addText("Acción posible", { x: 1.24, y: 4.86, w: 1.45, h: 0.26, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: C.cyan, margin: 0 });
  slide.addText("Planificar una revisión", { x: 1.24, y: 5.24, w: 3.62, h: 0.42, fontFace: TYPOGRAPHY.body, fontSize: 13, color: C.white, margin: 0 });

  const signals = [
    ["01", "NOMBRE", "Se entiende sin ver el color.", C.amber],
    ["02", "SEÑAL VISUAL", "Ayuda a reconocer con rapidez.", C.cyan],
    ["03", "MENSAJE", "Explica qué significa el estado.", C.green],
    ["04", "ACCIÓN", "Orienta una decisión proporcional.", C.red],
  ];
  signals.forEach((s, i) => {
    const x = 6.58 + (i % 2) * 2.92;
    const y = 2.02 + Math.floor(i / 2) * 1.86;
    slide.addText(s[0], { x, y: y + 0.08, w: 0.4, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 11, bold: true, color: s[3], margin: 0 });
    slide.addText(s[1], { x: x + 0.54, y, w: 2.08, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 11.5, bold: true, color: C.navy, margin: 0 });
    slide.addText(s[2], { x: x + 0.54, y: y + 0.48, w: 2.12, h: 0.58, fontFace: TYPOGRAPHY.body, fontSize: 10, color: C.slate, margin: 0 });
    slide.addShape(SH.line, { x, y: y + 1.28, w: 2.62, h: 0, line: { color: C.border, pt: 1 } });
  });
  closingLine(slide, "El color llama la atención. El lenguaje permite actuar.", { y: 6.38 });
  addNotesAndValidate(slide, "Usar la tarjeta de la izquierda como ejemplo de una salida completa. Mencionar lectura en mala pantalla, daltonismo o notificacion sin color, sin convertirlo en una clase de accesibilidad.");
}

// 32 · Débil vs útil
{
  const slide = pptx.addSlide();
  addHeader(slide, "El mensaje cambia la utilidad", "Mostrar un número no equivale a explicar un estado", "Comparemos dos interfaces para la misma lectura.", 32);

  slide.addText("VERSIÓN DÉBIL", { x: 0.98, y: 1.94, w: 4.62, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 9.8, bold: true, charSpacing: 1.3, color: C.red, align: "center", margin: 0 });
  slide.addShape(SH.roundRect, { x: 0.98, y: 2.4, w: 4.62, h: 3.24, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.border, pt: 1 } });
  slide.addText("Humedad", { x: 1.4, y: 2.84, w: 1.7, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 12.5, color: C.slate, margin: 0 });
  slide.addText("31", { x: 1.36, y: 3.38, w: 2.26, h: 1.1, fontFace: TYPOGRAPHY.display, fontSize: 50, bold: true, color: C.navy, margin: 0 });
  slide.addText("¿Y eso es bueno, malo o normal?", { x: 1.4, y: 4.86, w: 3.76, h: 0.42, fontFace: TYPOGRAPHY.body, fontSize: 11.5, italic: true, color: C.red, margin: 0 });

  slide.addShape(SH.chevron, { x: 5.88, y: 3.62, w: 1.0, h: 0.82, fill: { color: C.cyan }, line: { color: C.cyan } });

  slide.addText("VERSIÓN ÚTIL", { x: 7.22, y: 1.94, w: 5.12, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 9.8, bold: true, charSpacing: 1.3, color: C.green, align: "center", margin: 0 });
  slide.addShape(SH.roundRect, { x: 7.22, y: 2.4, w: 5.12, h: 3.24, rectRadius: 0.06, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("Humedad  ·  31 %", { x: 7.62, y: 2.76, w: 2.62, h: 0.36, fontFace: TYPOGRAPHY.body, fontSize: 12.5, bold: true, color: C.white, margin: 0 });
  pill(slide, "SUELO SECO", 10.28, 2.72, 1.58, { fill: C.gold, line: C.gold, color: C.navyDeep, h: 0.46, fontSize: 10.2 });
  slide.addText("La humedad está bajo el rango definido por el equipo.", { x: 7.62, y: 3.56, w: 4.26, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 15.2, bold: true, color: C.white, margin: 0 });
  slide.addText("Acción posible", { x: 7.62, y: 4.58, w: 1.38, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: C.cyan, margin: 0 });
  slide.addText("Revisar si corresponde regar", { x: 7.62, y: 4.94, w: 3.62, h: 0.36, fontFace: TYPOGRAPHY.body, fontSize: 12, color: C.white, margin: 0 });
  closingLine(slide, "El mensaje interpreta. La acción conecta con el propósito.", { y: 6.3 });
  addNotesAndValidate(slide, "Pedir una lectura rapida de ambas interfaces. La pregunta no es cual se ve mejor, sino cual permite comprender y decidir sin explicacion externa.");
}

// 33 · Acción posible
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  addInstitutionalLockup(slide);
  slide.addText("PRECISIÓN DEL LENGUAJE", { x: 0.74, y: 0.52, w: 4.4, h: 0.26, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.4, color: C.red, margin: 0 });
  slide.addText("El prototipo orienta.\nTodavía no ordena.", { x: 0.76, y: 1.18, w: 5.6, h: 1.48, fontFace: TYPOGRAPHY.display, fontSize: 34, bold: true, color: C.navy, margin: 0 });
  slide.addText("Trabajamos con una hipótesis de software y datos simulados. La relación entre estado y acción deberá contrastarse después.", { x: 0.78, y: 3.0, w: 5.22, h: 0.9, fontFace: TYPOGRAPHY.body, fontSize: 13.5, color: C.slate, margin: 0 });

  slide.addShape(SH.roundRect, { x: 6.72, y: 1.42, w: 5.02, h: 1.62, rectRadius: 0.05, fill: { color: C.redSoft }, line: { color: C.red, pt: 1.2 } });
  slide.addText("AFIRMACIÓN EXCESIVA", { x: 7.02, y: 1.72, w: 2.1, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 9.6, bold: true, color: C.red, margin: 0 });
  slide.addText("“Riegue ahora.”", { x: 7.02, y: 2.2, w: 3.92, h: 0.48, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.navy, margin: 0 });
  slide.addShape(SH.line, { x: 9.24, y: 2.45, w: 1.78, h: 0, line: { color: C.red, pt: 2 } });

  slide.addShape(SH.roundRect, { x: 6.72, y: 3.52, w: 5.02, h: 1.92, rectRadius: 0.05, fill: { color: C.greenSoft }, line: { color: C.green, pt: 1.2 } });
  slide.addText("ACCIÓN POSIBLE", { x: 7.02, y: 3.82, w: 1.8, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 9.6, bold: true, color: C.green, margin: 0 });
  slide.addText("“Revisar si corresponde regar.”", { x: 7.02, y: 4.3, w: 4.18, h: 0.72, fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: C.navy, margin: 0 });
  slide.addShape(SH.line, { x: 7.02, y: 5.12, w: 3.64, h: 0, line: { color: C.green, pt: 2 } });
  slide.addShape(SH.roundRect, { x: 1.12, y: 5.18, w: 4.7, h: 0.7, rectRadius: 0.04, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("Ser prudente también es diseñar bien.", { x: 1.42, y: 5.18, w: 4.1, h: 0.7, fontFace: TYPOGRAPHY.body, fontSize: 13, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
  addFooter(slide, 33);
  addNotesAndValidate(slide, "Distinguir entre orientar y ordenar. El equipo debe escribir acciones proporcionales a la evidencia disponible y registrar lo que aun requiere validacion.");
}

// 34 · Especificación mínima
{
  const slide = pptx.addSlide();
  addHeader(slide, "El contrato del prototipo", "La especificación mínima cabe en una página", "Codex construye desde aquí; el equipo revisa contra aquí.", 34);

  slide.addShape(SH.roundRect, { x: 0.82, y: 1.82, w: 7.3, h: 4.84, rectRadius: 0.04, fill: { color: C.white }, line: { color: C.border, pt: 1 } });
  slide.addShape(SH.rect, { x: 0.82, y: 1.82, w: 7.3, h: 0.52, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("ESPECIFICACION.md", { x: 1.14, y: 1.96, w: 2.42, h: 0.24, fontFace: "Aptos Mono", fontSize: 9.5, bold: true, color: C.white, margin: 0 });
  const spec = [
    ["CONTEXTO", "problema + persona que usaría la información", C.red],
    ["ENTRADA", "variable + unidad + rango + simulación", C.cyan],
    ["REGLAS", "condiciones exactas + límites", C.gold],
    ["SALIDA", "valor + estado + mensaje + acción", C.green],
    ["INTERACCIÓN", "cómo cambiar el valor para probar", C.blue],
    ["RESTRICCIONES", "qué evitar + qué falta validar", "8A55B0"],
    ["PRUEBAS", "tres entradas + resultados esperados", C.red],
  ];
  spec.forEach((s, i) => {
    const y = 2.62 + i * 0.52;
    slide.addText(s[0], { x: 1.12, y, w: 1.48, h: 0.28, fontFace: "Aptos Mono", fontSize: 9.8, bold: true, color: s[2], margin: 0 });
    slide.addText(s[1], { x: 2.74, y, w: 4.9, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 10.3, color: C.ink, margin: 0 });
    if (i < spec.length - 1) slide.addShape(SH.line, { x: 1.12, y: y + 0.38, w: 6.5, h: 0, line: { color: C.mist, pt: 0.8 } });
  });

  slide.addText("DEBE PERMITIR", { x: 8.84, y: 2.0, w: 2.82, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 9.5, bold: true, charSpacing: 1.1, color: C.red, align: "center", margin: 0 });
  const outcomes = [
    ["01", "CONSTRUIR", "sin completar huecos por intuición"],
    ["02", "REVISAR", "sin depender de quien programó"],
    ["03", "PROBAR", "con resultados definidos antes"],
  ];
  outcomes.forEach((o, i) => {
    const y = 2.58 + i * 1.18;
    slide.addShape(SH.ellipse, { x: 8.66, y, w: 0.68, h: 0.68, fill: { color: i === 0 ? C.cyan : i === 1 ? C.gold : C.green }, line: { color: i === 0 ? C.cyan : i === 1 ? C.gold : C.green } });
    slide.addText(o[0], { x: 8.66, y, w: 0.68, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 11, bold: true, color: i === 1 ? C.navyDeep : C.white, align: "center", valign: "mid", margin: 0 });
    slide.addText(o[1], { x: 9.58, y: y + 0.02, w: 2.3, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 11.8, bold: true, color: C.navy, margin: 0 });
    slide.addText(o[2], { x: 9.58, y: y + 0.38, w: 2.42, h: 0.44, fontFace: TYPOGRAPHY.body, fontSize: 9.6, color: C.slate, margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 8.62, y: 5.94, w: 3.54, h: 0.58, rectRadius: 0.04, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("CORTA · CLARA · COMPROBABLE", { x: 8.82, y: 5.94, w: 3.14, h: 0.58, fontFace: TYPOGRAPHY.body, fontSize: 9.8, bold: true, charSpacing: 0.8, color: C.white, align: "center", valign: "mid", margin: 0 });
  addNotesAndValidate(slide, "Presentar la especificacion como contrato de trabajo, no como informe. Mostrar que cada seccion responde una incertidumbre distinta.");
}

// 35 · Solicitud a Codex
{
  const slide = pptx.addSlide();
  addHeader(slide, "Cómo entregar la especificación", "Una buena solicitud incluye controles antes y después", "Así se detectan malentendidos sin perder tiempo construyendo lo equivocado.", 35, { titleSize: 24 });

  slide.addShape(SH.roundRect, { x: 0.82, y: 1.86, w: 8.0, h: 4.7, rectRadius: 0.05, fill: { color: "0B1F33" }, line: { color: "28425C", pt: 1 } });
  slide.addShape(SH.rect, { x: 0.82, y: 1.86, w: 8.0, h: 0.46, fill: { color: "142D46" }, line: { color: "142D46" } });
  slide.addText("solicitud.txt", { x: 1.18, y: 1.98, w: 1.32, h: 0.22, fontFace: "Aptos Mono", fontSize: 8.5, color: "A9BBD0", margin: 0 });
  const promptLines = [
    ["Construye un prototipo web provisional", C.white, true],
    ["a partir de esta especificación.", C.white, false],
    ["", C.white, false],
    ["Contexto:   ", C.red, true, "[problema y personas]"],
    ["Entrada:    ", C.cyan, true, "[variable, unidad y rango]"],
    ["Reglas:     ", C.gold, true, "[condiciones y estados]"],
    ["Debe mostrar:", C.green, true, "[valor, mensaje y acción]"],
    ["Pruebas:    ", "A982C7", true, "[entrada → resultado esperado]"],
  ];
  promptLines.forEach((l, i) => {
    const y = 2.66 + i * 0.39;
    if (l.length > 3) {
      slide.addText([{ text: l[0], options: { color: l[1], bold: l[2] } }, { text: l[3], options: { color: "D6E3F0" } }], { x: 1.18, y, w: 6.98, h: 0.27, fontFace: "Aptos Mono", fontSize: 10.8, margin: 0 });
    } else if (l[0]) {
      slide.addText(l[0], { x: 1.18, y, w: 6.98, h: 0.27, fontFace: "Aptos Mono", fontSize: 10.8, bold: l[2], color: l[1], margin: 0 });
    }
  });

  const controls = [
    ["ANTES", "Resume lo que entendiste y señala cualquier ambigüedad.", C.cyan],
    ["DESPUÉS", "Explica dónde está la lógica y cómo ejecutar las pruebas.", C.green],
  ];
  controls.forEach((c, i) => {
    const y = 2.1 + i * 2.08;
    slide.addShape(SH.roundRect, { x: 9.18, y, w: 3.18, h: 1.62, rectRadius: 0.05, fill: { color: i === 0 ? C.cyanSoft : C.greenSoft }, line: { color: c[2], pt: 1.2 } });
    slide.addText(c[0], { x: 9.48, y: y + 0.28, w: 1.02, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 11.2, bold: true, color: c[2], margin: 0 });
    slide.addText(c[1], { x: 9.48, y: y + 0.72, w: 2.56, h: 0.64, fontFace: TYPOGRAPHY.body, fontSize: 10.1, bold: true, color: C.navy, margin: 0 });
  });
  addNotesAndValidate(slide, "Enfatizar los dos controles: resumen antes de implementar y ubicacion de logica/pruebas despues. Son mecanismos de control del equipo, no adornos del prompt.");
}

// 36 · Trabajo por equipos
{
  const slide = pptx.addSlide();
  addHeader(slide, "Activen sus equipos · 7 min", "Construyan la especificación versión 0.1", "Tres escenarios distintos y justificables. Una sola interpretación posible.", 36);

  slide.addShape(SH.roundRect, { x: 0.84, y: 1.92, w: 6.92, h: 4.74, rectRadius: 0.05, fill: { color: C.white }, line: { color: C.border, pt: 1 } });
  slide.addText("VARIABLE", { x: 1.14, y: 2.18, w: 1.12, h: 0.25, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: C.red, margin: 0 });
  slide.addShape(SH.line, { x: 2.3, y: 2.42, w: 2.0, h: 0, line: { color: C.border, pt: 1 } });
  slide.addText("UNIDAD", { x: 4.64, y: 2.18, w: 0.94, h: 0.25, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: C.cyan, margin: 0 });
  slide.addShape(SH.line, { x: 5.62, y: 2.42, w: 1.52, h: 0, line: { color: C.border, pt: 1 } });
  slide.addText("RANGO", { x: 1.14, y: 2.72, w: 0.96, h: 0.25, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: C.gold, margin: 0 });
  slide.addShape(SH.line, { x: 2.18, y: 2.96, w: 2.12, h: 0, line: { color: C.border, pt: 1 } });
  slide.addText("PERSONA", { x: 4.64, y: 2.72, w: 1.08, h: 0.25, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: C.green, margin: 0 });
  slide.addShape(SH.line, { x: 5.78, y: 2.96, w: 1.36, h: 0, line: { color: C.border, pt: 1 } });
  const cols = [1.16, 2.28, 3.42, 4.62, 5.94];
  ["ENTRADA", "REGLA", "ESTADO", "MENSAJE", "ACCIÓN"].forEach((t, i) => slide.addText(t, { x: cols[i], y: 3.4, w: i === 3 ? 1.18 : 0.96, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 8.2, bold: true, color: C.navy, align: "center", margin: 0 }));
  for (let r = 0; r < 3; r += 1) {
    const y = 3.82 + r * 0.74;
    slide.addShape(SH.rect, { x: 1.08, y, w: 6.4, h: 0.58, fill: { color: r === 1 ? C.softBlue : C.paper }, line: { color: C.border, pt: 0.8 } });
    slide.addText(`CASO ${r + 1}`, { x: 1.16, y, w: 0.96, h: 0.58, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: r === 0 ? C.green : r === 1 ? C.gold : C.red, align: "center", valign: "mid", margin: 0 });
  }
  slide.addText("Una persona habitual · una transición · una situación de atención", { x: 1.18, y: 6.18, w: 6.18, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 10.2, bold: true, color: C.slate, align: "center", margin: 0 });

  slide.addText("SEIS MIRADAS · UNA SOLA ESPECIFICACIÓN", { x: 8.24, y: 1.98, w: 4.0, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 9.6, bold: true, charSpacing: 1.0, color: C.red, align: "center", margin: 0 });
  const roles = [
    ["INVESTIGACIÓN", "variable y sentido", C.cyan],
    ["TECNOLOGÍA", "rangos sin errores", C.blue],
    ["DISEÑO", "estados legibles", C.gold],
    ["PRUEBAS", "límites y resultados", C.green],
    ["COMUNICACIÓN", "mensajes claros", "8A55B0"],
    ["COORDINACIÓN", "integra decisiones", C.red],
  ];
  roles.forEach((r, i) => {
    const x = 8.14 + (i % 2) * 2.18;
    const y = 2.58 + Math.floor(i / 2) * 1.18;
    slide.addShape(SH.roundRect, { x, y, w: 1.94, h: 0.9, rectRadius: 0.04, fill: { color: C.white }, line: { color: r[2], pt: 1 } });
    slide.addText(r[0], { x: x + 0.12, y: y + 0.14, w: 1.7, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 8.8, bold: true, color: r[2], align: "center", margin: 0 });
    slide.addText(r[1], { x: x + 0.12, y: y + 0.5, w: 1.7, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 8.6, color: C.slate, align: "center", margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 8.52, y: 6.12, w: 3.36, h: 0.5, rectRadius: 0.04, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("Producto: especificación v0.1", { x: 8.72, y: 6.12, w: 2.96, h: 0.5, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
  addNotesAndValidate(slide, "Dar siete minutos. Cada responsabilidad hace una contribucion concreta. Pedir tres casos diferentes y unificar todo en una sola especificacion, no seis versiones separadas.");
}

// 37 · Prueba entre pares
{
  const slide = pptx.addSlide();
  addHeader(slide, "Comprobación cruzada · 2 min", "¿Otra persona puede predecir el resultado?", "La prueba se hace leyendo solamente la especificación.", 37);
  slide.addShape(SH.roundRect, { x: 0.9, y: 2.12, w: 3.3, h: 3.68, rectRadius: 0.05, fill: { color: C.white }, line: { color: C.cyan, pt: 1.2 } });
  slide.addText("1", { x: 1.2, y: 2.44, w: 0.62, h: 0.62, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.cyan, align: "center", valign: "mid", margin: 0 });
  slide.addText("ENTREGUEN UN VALOR", { x: 1.18, y: 3.34, w: 2.72, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: C.navy, align: "center", margin: 0 });
  slide.addText("Elijan uno habitual, uno de borde o uno de atención.", { x: 1.42, y: 4.06, w: 2.24, h: 0.7, fontFace: TYPOGRAPHY.body, fontSize: 11, color: C.slate, align: "center", margin: 0 });

  slide.addShape(SH.chevron, { x: 4.42, y: 3.5, w: 0.78, h: 0.72, fill: { color: C.gold }, line: { color: C.gold } });

  slide.addShape(SH.roundRect, { x: 5.42, y: 2.12, w: 3.3, h: 3.68, rectRadius: 0.05, fill: { color: C.white }, line: { color: C.gold, pt: 1.2 } });
  slide.addText("2", { x: 5.72, y: 2.44, w: 0.62, h: 0.62, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: "9A6B00", align: "center", valign: "mid", margin: 0 });
  slide.addText("PREDIGAN LA SALIDA", { x: 5.7, y: 3.34, w: 2.72, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: C.navy, align: "center", margin: 0 });
  slide.addText("Estado + mensaje + acción posible, sin pedir contexto extra.", { x: 5.94, y: 4.06, w: 2.24, h: 0.7, fontFace: TYPOGRAPHY.body, fontSize: 11, color: C.slate, align: "center", margin: 0 });

  slide.addShape(SH.chevron, { x: 8.94, y: 3.5, w: 0.78, h: 0.72, fill: { color: C.green }, line: { color: C.green } });

  slide.addShape(SH.roundRect, { x: 9.94, y: 2.12, w: 2.5, h: 3.68, rectRadius: 0.05, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("3", { x: 10.24, y: 2.44, w: 0.62, h: 0.62, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.green, align: "center", valign: "mid", margin: 0 });
  slide.addText("AJUSTEN", { x: 10.18, y: 3.34, w: 2.02, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("Si hubo duda, la especificación todavía tiene una ambigüedad.", { x: 10.24, y: 4.06, w: 1.9, h: 0.82, fontFace: TYPOGRAPHY.body, fontSize: 10.6, color: "D8E7F5", align: "center", margin: 0 });
  closingLine(slide, "La explicación no rescata una regla ambigua: la regla se corrige.", { y: 6.26 });
  addNotesAndValidate(slide, "Hacer intercambio rapido entre integrantes o equipos cercanos. La persona que predice no puede pedir una explicacion oral adicional.");
}

// 38 · Cierre del bloque 2
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  addInstitutionalLockup(slide);
  slide.addText("CIERRE DEL BLOQUE 2", { x: 0.76, y: 0.5, w: 4.0, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.4, color: C.red, margin: 0 });
  slide.addText("La intención ya se puede ejecutar.", { x: 0.76, y: 1.04, w: 7.4, h: 0.66, fontFace: TYPOGRAPHY.display, fontSize: 30, bold: true, color: C.navy, margin: 0 });
  slide.addText("El equipo definió qué entra, cómo se clasifica y qué debería mostrar el prototipo en cada caso.", { x: 0.78, y: 1.9, w: 7.24, h: 0.62, fontFace: TYPOGRAPHY.body, fontSize: 13.2, color: C.slate, margin: 0 });

  const route = [
    ["VARIABLE", C.cyan], ["UNIDAD", C.blue], ["REGLA", C.gold], ["ESTADO", C.green], ["MENSAJE", "8A55B0"], ["ACCIÓN", C.red],
  ];
  route.forEach((r, i) => {
    const x = 0.88 + i * 1.92;
    if (i < route.length - 1) slide.addShape(SH.line, { x: x + 1.46, y: 3.52, w: 0.48, h: 0, line: { color: C.border, pt: 2, endArrowType: "triangle" } });
    slide.addShape(SH.roundRect, { x, y: 3.12, w: 1.5, h: 0.82, rectRadius: 0.04, fill: { color: C.white }, line: { color: r[1], pt: 1.2 } });
    slide.addText(r[0], { x: x + 0.08, y: 3.12, w: 1.34, h: 0.82, fontFace: TYPOGRAPHY.display, fontSize: 9.8, bold: true, color: r[1], align: "center", valign: "mid", margin: 0 });
  });

  slide.addShape(SH.roundRect, { x: 1.1, y: 4.88, w: 4.92, h: 1.06, rectRadius: 0.05, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("PRODUCTO DEL BLOQUE", { x: 1.42, y: 5.1, w: 1.88, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: C.cyan, margin: 0 });
  slide.addText("Especificación v0.1 + tres casos de prueba", { x: 1.42, y: 5.48, w: 4.1, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 14.2, bold: true, color: C.white, margin: 0 });

  slide.addShape(SH.chevron, { x: 6.46, y: 4.98, w: 0.86, h: 0.84, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addShape(SH.roundRect, { x: 7.72, y: 4.88, w: 4.5, h: 1.06, rectRadius: 0.05, fill: { color: C.cyanSoft }, line: { color: C.cyan, pt: 1.2 } });
  slide.addText("BLOQUE 3", { x: 8.04, y: 5.1, w: 1.22, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: C.blue, margin: 0 });
  slide.addText("Entregar la especificación a Codex y construir la primera interfaz funcional.", { x: 8.04, y: 5.42, w: 3.72, h: 0.48, fontFace: TYPOGRAPHY.display, fontSize: 12.6, bold: true, color: C.navy, margin: 0 });
  closingLine(slide, "Primero se acuerda el comportamiento. Después se acelera la construcción.", { y: 6.48, fontSize: 12.6 });
  addFooter(slide, 38);
  addNotesAndValidate(slide, "Cerrar verificando el producto del bloque. Ningun equipo pasa al sprint sin variable, unidad, reglas, mensajes, acciones y tres resultados esperados.");
}

/**
 * PptxGenJS emite un <a:pPr> antes de CADA run cuando el texto se pasa como arreglo
 * de runs con formato mixto. OpenXML solo admite uno y debe ser el primer hijo del
 * parrafo, asi que los repetidos hacen fallar tools/pptx-validator aunque PowerPoint
 * alcance a abrir el archivo. Aqui se eliminan los que quedaron despues de un run.
 */
const PPR_TRAS_RUN = /(<\/a:r>|<\/a:fld>|<a:br\/>)(?:<a:pPr[^>]*\/>|<a:pPr[^>]*>[\s\S]*?<\/a:pPr>)/g;

async function sanitizarParrafos(archivo) {
  const zip = await JSZip.loadAsync(fs.readFileSync(archivo));
  const slides = Object.keys(zip.files).filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n));
  let corregidas = 0;

  for (const nombre of slides) {
    const original = await zip.file(nombre).async("string");
    let xml = original;
    let previo;
    do {
      previo = xml;
      xml = xml.replace(PPR_TRAS_RUN, "$1");
    } while (xml !== previo);
    if (xml !== original) {
      corregidas += 1;
      zip.file(nombre, xml);
    }
  }

  if (corregidas > 0) {
    const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
    fs.writeFileSync(archivo, buffer);
  }
  return corregidas;
}

pptx
  .writeFile({ fileName: outputPptx })
  .then(() => sanitizarParrafos(outputPptx))
  .then((corregidas) => {
    console.log(`Parrafos normalizados en ${corregidas} diapositiva(s).`);
    console.log("OK ->", outputPptx);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
