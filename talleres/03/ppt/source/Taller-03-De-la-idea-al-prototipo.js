const path = require("path");
const fs = require("fs");
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

const { applyAiepTheme, TOKENS: BASE, TYPOGRAPHY } = slidesSystem.theme;
const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
applyAiepTheme(pptx, {
  author: "GeoGreen Escolar Osorno",
  company: "AIEP Osorno",
  subject: "Taller 3 - De la idea al prototipo",
  title: "Taller 3 - De la idea al prototipo",
});

const SH = pptx.ShapeType;
const W = 13.333;
const H = 7.5;
const rootDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "../../../..");
const outputPptx = path.join(rootDir, "Taller-03-De-la-idea-al-prototipo.pptx");
const mediaDir = path.join(repoRoot, "talleres", "03", "media");
const logoDir = "C:/Users/Diego Obando/.agents/skills/slides-aiep/assets";

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
  amber: "E0A323",
  darkPanel: "0D223A",
};

const IMG = {
  logo: path.join(logoDir, "logo-aiep.png"),
  mark: path.join(logoDir, "logo-aiep-mark.png"),
  lockup: path.join(repoRoot, "reuniones", "2026-06-22-socio-comunitario", "assets", "lockup-vinculacion-dark.png"),
  lockupW: path.join(repoRoot, "reuniones", "2026-06-22-socio-comunitario", "assets", "lockup-vinculacion-white.png"),
  opening: path.join(mediaDir, "generadas", "apertura-estudiantes-innovacion-geogreen.png"),
  original: path.join(mediaDir, "generadas", "prototipo-original-hc-sr04-sim7600sa.png"),
  system: path.join(mediaDir, "generadas", "sistema-geogreen-sensor-dato-respuesta.png"),
  agentic: path.join(mediaDir, "generadas", "desarrollo-agentico-prototipado-supervisado.png"),
  agenticBlock3: path.join(mediaDir, "generadas", "desarrollo-agentico-apertura-bloque3.png"),
  pitchMic: path.join(mediaDir, "generadas", "icono-microfono-pitch.png"),
  prototype: path.join(mediaDir, "fotos", "prototipo-fisico-oled-2026-06-21.jpeg"),
  prototypeFocus: path.join(mediaDir, "fotos", "prototipo-oled-geogreen-detalle.png"),
  prototypeLandscape: path.join(mediaDir, "fotos", "prototipo-oled-geogreen-landscape.png"),
  pcb: path.join(mediaDir, "fotos", "pcb-v1-kicad-2026-07-02.jpeg"),
  pcbRender: path.join(repoRoot, "geogreen-v1", "hardware", "kicad", "exports", "geogreen-v1-product-render.jpg"),
  blender: path.join(mediaDir, "fotos", "render-carcasa-3d-felipe-poster.jpg"),
  wokwi: path.join(mediaDir, "oficiales", "wokwi-diagrama-vscode-oficial.png"),
  wokwiLogo: path.join(mediaDir, "oficiales", "wokwi-logo-oficial.png"),
  wokwiCli: path.join(mediaDir, "oficiales", "wokwi-cli-captura-oficial.png"),
  platformioLogo: path.join(mediaDir, "oficiales", "platformio-logo-oficial.png"),
  platformioCli: path.join(mediaDir, "oficiales", "platformio-cli-vscode-captura-oficial.png"),
  platformioBoards: path.join(mediaDir, "oficiales", "platformio-boards-captura-oficial.png"),
  r4: path.join(mediaDir, "oficiales", "arduino-uno-r4-wifi-vista-oficial.png"),
  r4Pinout: path.join(mediaDir, "oficiales", "arduino-uno-r4-wifi-pinout-oficial-pagina-1.png"),
  r4PinoutPower: path.join(mediaDir, "oficiales", "arduino-uno-r4-wifi-pinout-power-analog-recorte.png"),
  r4PinoutDigital: path.join(mediaDir, "oficiales", "arduino-uno-r4-wifi-pinout-digital-recorte.png"),
  esp32: path.join(mediaDir, "oficiales", "esp32-devkitc-v4-vista-funcional-oficial.jpg"),
  esp32Pinout: path.join(mediaDir, "oficiales", "esp32-devkitc-v4-pinout-oficial.png"),
  breadboardDiagram: path.join(mediaDir, "oficiales", "protoboard-conexiones-internas-adafruit.jpg"),
  breadboardContacts: path.join(mediaDir, "oficiales", "protoboard-contactos-internos-adafruit.jpg"),
  breadboardOpen: path.join(mediaDir, "oficiales", "protoboard-conexiones-cc0.png"),
  safety: path.join(mediaDir, "generadas", "seguridad-revision-antes-de-conectar-usb.png"),
  inventoryKit: path.join(repoRoot, "docs", "inventario", "assets", "inventario-aiep-12.jpg"),
  hcSr04: path.join(repoRoot, "docs", "kit-sensores", "assets", "hc-sr04.jpg"),
  ky015: path.join(repoRoot, "docs", "kit-sensores", "assets", "ky-015.jpg"),
  ky001: path.join(repoRoot, "docs", "kit-sensores", "assets", "ky-001.jpg"),
  ky018: path.join(repoRoot, "docs", "kit-sensores", "assets", "ky-018.jpg"),
  soil: path.join(repoRoot, "docs", "kit-sensores", "assets", "soil-moisture.jpg"),
  water: path.join(repoRoot, "docs", "kit-sensores", "assets", "water-level.jpg"),
  ky021: path.join(repoRoot, "docs", "kit-sensores", "assets", "ky-021.jpg"),
  ky011: path.join(repoRoot, "docs", "kit-sensores", "assets", "ky-011.jpg"),
  ky012: path.join(repoRoot, "docs", "kit-sensores", "assets", "ky-012.jpg"),
  ky019: path.join(repoRoot, "docs", "kit-sensores", "assets", "ky-019.jpg"),
  dashboard: path.join(repoRoot, "reuniones", "2026-06-15", "ppt", "source", "assets", "app-geogreen-mapa-osorno.png"),
  videoPrototype: path.join(mediaDir, "videos", "prototipo-fisico-funcionando-2026-06-21.mp4"),
  videoCarcasa: path.join(mediaDir, "videos", "render-carcasa-3d-felipe.mp4"),
  teamRoles: path.join(repoRoot, "docs", "infografias", "infografia-roles-equipo-geogreen-gptimage.png"),
};

function imageDataUri(p) {
  const ext = path.extname(p).toLowerCase();
  const mime = ext === ".png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${fs.readFileSync(p).toString("base64")}`;
}

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
    slide.addShape(SH.rect, {
      x,
      y: 0,
      w: widths[i],
      h: 0.12,
      fill: { color },
      line: { color },
    });
    x += widths[i] + 0.08;
  });
}

function addInstitutionalLockup(slide, opts = {}) {
  const white = Boolean(opts.white);
  const x = opts.x ?? 11.55;
  const y = opts.y ?? 0.24;
  const w = opts.w ?? 1.42;
  const h = opts.h ?? 1.06;
  addImageContain(slide, white ? IMG.lockupW : IMG.lockup, x, y, w, h);
}

function addFooter(slide, number, label = "GeoGreen Escolar · Taller 3") {
  slide.addText(label, {
    x: 0.72,
    y: 7.16,
    w: 5.8,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.5,
    color: C.slate,
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
    w: 3.8,
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
    y: 0.7,
    w: 10.35,
    h: 0.54,
    fontFace: TYPOGRAPHY.display,
    fontSize: 25,
    bold: true,
    color: C.navy,
    margin: 0,
    breakLine: false,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.72,
      y: 1.3,
      w: 10.25,
      h: 0.35,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.2,
      color: C.slate,
      margin: 0,
    });
  }
  addInstitutionalLockup(slide);
  addFooter(slide, number);
}

function pill(slide, text, x, y, w, opts = {}) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h: opts.h || 0.34,
    rectRadius: 0.05,
    fill: { color: opts.fill || C.white, transparency: opts.transparency || 0 },
    line: { color: opts.line || opts.fill || C.border, pt: opts.linePt || 1 },
  });
  slide.addText(text, {
    x: x + 0.1,
    y: y + 0.06,
    w: w - 0.2,
    h: (opts.h || 0.34) - 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.fontSize || 9.2,
    bold: opts.bold !== false,
    color: opts.color || C.navy,
    align: opts.align || "center",
    margin: 0,
  });
}

function numberBadge(slide, number, x, y, color = C.red) {
  slide.addShape(SH.ellipse, {
    x,
    y,
    w: 0.42,
    h: 0.42,
    fill: { color },
    line: { color },
  });
  slide.addText(String(number), {
    x,
    y: y + 0.08,
    w: 0.42,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 10.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
}

function addNotesAndValidate(slide, notes) {
  if (notes) slide.addNotes(notes);
  // Some overlaps are intentional: text and labels sit over image panels.
  warnIfSlideHasOverlaps(slide, pptx, { muteContainment: true });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

// 01 · Portada
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.opening, 0, 0, W, H);
  slide.addShape(SH.rect, {
    x: 0,
    y: 0,
    w: 6.2,
    h: H,
    fill: { color: C.navyDeep, transparency: 5 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  slide.addShape(SH.rect, {
    x: 0.72,
    y: 1.14,
    w: 0.12,
    h: 3.92,
    fill: { color: C.red },
    line: { color: C.red },
  });
  pill(slide, "GEOGREEN ESCOLAR · TALLER 3", 1.06, 0.72, 2.72, {
    fill: C.white,
    line: C.white,
    color: C.navy,
    fontSize: 9.6,
  });
  slide.addText("De la idea\nal prototipo", {
    x: 1.05,
    y: 1.32,
    w: 4.75,
    h: 1.58,
    fontFace: TYPOGRAPHY.display,
    fontSize: 36,
    bold: true,
    color: C.white,
    margin: 0,
    breakLine: false,
  });
  slide.addText("Sensores · prototipado · desarrollo con agentes", {
    x: 1.07,
    y: 3.08,
    w: 4.55,
    h: 0.62,
    fontFace: TYPOGRAPHY.body,
    fontSize: 16.5,
    color: "D8E7F5",
    margin: 0,
  });
  slide.addText("GeoGreen demuestra hasta dónde puede crecer una idea.", {
    x: 1.07,
    y: 4.28,
    w: 4.62,
    h: 0.44,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.2,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("Hoy comienza la de ustedes.", {
    x: 1.07,
    y: 4.82,
    w: 4.55,
    h: 0.52,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20,
    bold: true,
    color: C.white,
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
  slide.addText("24 AGO 2026 · AIEP OSORNO", {
    x: 1.07,
    y: 6.62,
    w: 4.0,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.2,
    bold: true,
    charSpacing: 1.1,
    color: "C4D7EA",
    margin: 0,
  });
  addNotesAndValidate(slide, "Apertura: recibir al curso con la tesis del taller. No explicar todavía las herramientas. Dar tiempo para observar la escena y anticipar que trabajarán en equipos.");
}

// 02 · Tres etapas de evolución
{
  const slide = pptx.addSlide();
  slide.background = { color: C.darkPanel };
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("OBSERVEN LA EVOLUCIÓN", {
    x: 0.72,
    y: 0.42,
    w: 4.3,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    charSpacing: 1.6,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Una misma idea, tres momentos", {
    x: 0.72,
    y: 0.78,
    w: 8.8,
    h: 0.5,
    fontFace: TYPOGRAPHY.display,
    fontSize: 27,
    bold: true,
    color: C.white,
    margin: 0,
  });
  const frames = [
    { x: 0.72, w: 3.65, img: IMG.original, n: "01", label: "ORIGINAL CELULAR", sub: "HC-SR04 + módulo SIM", accent: C.cyan },
    { x: 4.84, w: 3.65, img: IMG.prototypeLandscape, n: "02", label: "VERSIÓN ESCOLAR", sub: "WiFi + señales locales", accent: C.gold },
    { x: 8.96, w: 3.65, img: IMG.pcbRender, n: "03", label: "PLACA DISEÑADA", sub: "Integrar como producto", accent: C.red },
  ];
  frames.forEach((f) => {
    slide.addShape(SH.roundRect, {
      x: f.x,
      y: 1.62,
      w: f.w,
      h: 4.38,
      rectRadius: 0.06,
      fill: { color: "132F4C" },
      line: { color: "365A7B", pt: 1.2 },
    });
    addImageCrop(slide, f.img, f.x + 0.12, 1.74, f.w - 0.24, 2.9);
    pill(slide, f.n, f.x + 0.22, 4.43, 0.54, { fill: f.accent, line: f.accent, color: C.navyDeep, fontSize: 10 });
    slide.addText(f.label, {
      x: f.x + 0.22,
      y: 4.94,
      w: f.w - 0.44,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(f.sub, {
      x: f.x + 0.22,
      y: 5.34,
      w: f.w - 0.44,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.5,
      color: "BFD1E2",
      margin: 0,
    });
  });
  slide.addText("¿Qué cambió? ¿Qué se mantuvo? ¿Qué proceso imaginan?", {
    x: 0.72,
    y: 6.52,
    w: 8.0,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.5,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  addFooter(slide, 2, "GeoGreen Escolar · Evolución del sistema");
  addNotesAndValidate(slide, "Mostrar las tres etapas y pedir observaciones. El original medía con HC-SR04 y comunicaba por red celular. La versión escolar reemplaza ese camino por WiFi y agrega respuestas locales; el PCB integra la solución.");
}

// 03 · Pregunta de activación
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  // Contraste intencional: las fotografías funcionan como campo visual detrás de velos de color.
  addImageCrop(slide, IMG.original, 0, 0, 6.78, 7.5);
  addImageCrop(slide, IMG.prototypeFocus, 6.55, 0, 6.78, 7.5);
  slide.addShape(SH.rect, {
    x: 0,
    y: 0,
    w: 6.9,
    h: 7.5,
    fill: { color: C.navyDeep, transparency: 27 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  slide.addShape(SH.rect, {
    x: 6.42,
    y: 0,
    w: 6.91,
    h: 7.5,
    fill: { color: C.navyDeep, transparency: 31 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  slide.addShape(SH.rect, {
    x: 0,
    y: 0,
    w: 13.33,
    h: 7.5,
    fill: { color: C.navy, transparency: 34 },
    line: { color: C.navy, transparency: 100 },
  });
  addTopBars(slide, [C.cyan, C.red, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("PREGUNTA DE APERTURA", {
    x: 0.86,
    y: 0.5,
    w: 3.5,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.7,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("¿Qué decisiones transforman una idea?", {
    x: 0.86,
    y: 0.98,
    w: 10.7,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 31,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("No busquen solo piezas nuevas: descubran qué problema resolvió cada cambio.", {
    x: 0.88,
    y: 1.72,
    w: 10.7,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.3,
    bold: true,
    color: "D8E7F5",
    margin: 0,
  });

  const prompts = [
    { n: "01", title: "¿QUÉ CAMBIÓ?", body: "Comparen componentes, señales y forma de conexión.", color: C.cyan },
    { n: "02", title: "¿PARA QUÉ?", body: "Expliquen qué necesidad resuelve cada mejora.", color: C.gold },
    { n: "03", title: "¿CÓMO LO PRUEBO?", body: "Propongan una evidencia que permita verificarlo.", color: C.red },
  ];
  prompts.forEach((p, i) => {
    const x = 0.88 + i * 4.1;
    slide.addShape(SH.roundRect, {
      x,
      y: 2.55,
      w: 3.55,
      h: 2.12,
      rectRadius: 0.06,
      fill: { color: "0B2949", transparency: 7 },
      line: { color: p.color, pt: 1.35, transparency: 5 },
      shadow: { type: "outer", color: "000000", opacity: 0.24, blur: 2, angle: 45, distance: 1.2 },
    });
    pill(slide, p.n, x + 0.22, 2.78, 0.58, {
      fill: p.color,
      line: p.color,
      color: p.color === C.gold || p.color === C.cyan ? C.navyDeep : C.white,
      fontSize: 10,
    });
    slide.addText(p.title, {
      x: x + 0.22,
      y: 3.36,
      w: 3.08,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.5,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(p.body, {
      x: x + 0.22,
      y: 3.84,
      w: 3.08,
      h: 0.58,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      color: "D6E5F2",
      margin: 0,
      breakLine: false,
    });
  });

  pill(slide, "2 O 3 HIPÓTESIS", 0.9, 5.18, 1.82, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 10,
  });
  slide.addText("OBSERVAR  →  COMPARAR  →  EXPLICAR", {
    x: 3.08,
    y: 5.28,
    w: 6.2,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    bold: true,
    charSpacing: 0.7,
    color: C.cyan,
    margin: 0,
  });
  slide.addShape(SH.line, {
    x: 0.9,
    y: 5.88,
    w: 11.48,
    h: 0,
    line: { color: C.gold, pt: 1.4, transparency: 20 },
  });
  slide.addText("Una mejora se justifica por el problema que resuelve.", {
    x: 0.9,
    y: 6.14,
    w: 10.8,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  addNotesAndValidate(slide, "Pausa real. Pedir dos o tres hipótesis. Guiar la conversación desde la pieza hacia su función: qué cambió, qué necesidad resolvió y qué evidencia permitiría comprobarlo.");
}

// 04 · Mapa de aprendizaje
{
  const slide = pptx.addSlide();
  addHeader(slide, "El recorrido de hoy", "De una idea a una prueba que entrega evidencia", "Cuatro decisiones ordenan el trabajo. Las herramientas aparecen cuando una de ellas las necesita.", 4);
  const stages = [
    { n: "01", title: "PROBLEMA", body: "¿Qué queremos mejorar y para quién?", color: C.red, yText: 2.16 },
    { n: "02", title: "VARIABLE", body: "¿Qué cambio puede detectar un sensor?", color: C.cyan, yText: 4.54 },
    { n: "03", title: "PRUEBA", body: "¿Qué comportamiento construiremos primero?", color: C.gold, yText: 2.16 },
    { n: "04", title: "EVIDENCIA", body: "¿Funcionó? ¿Qué conviene mejorar después?", color: C.navy, yText: 4.54 },
  ];
  const stationX = [1.35, 4.48, 7.61, 10.74];
  slide.addShape(SH.line, {
    x: 1.18,
    y: 3.88,
    w: 10.92,
    h: 0,
    line: { color: "C8D4DF", pt: 8, beginArrowType: "none", endArrowType: "triangle" },
  });
  stages.forEach((s, i) => {
    const x = stationX[i];
    slide.addShape(SH.ellipse, {
      x,
      y: 3.48,
      w: 0.82,
      h: 0.82,
      fill: { color: s.color },
      line: { color: C.white, pt: 2 },
      shadow: { type: "outer", color: "637487", opacity: 0.2, blur: 1.2, angle: 45, distance: 0.8 },
    });
    slide.addText(s.n, {
      x: x + 0.04,
      y: 3.71,
      w: 0.74,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.5,
      bold: true,
      color: s.color === C.gold || s.color === C.cyan ? C.navyDeep : C.white,
      align: "center",
      margin: 0,
    });
    const above = i % 2 === 0;
    const lineY = above ? 3.12 : 4.34;
    slide.addShape(SH.line, {
      x: x + 0.41,
      y: above ? lineY : 4.3,
      w: 0,
      h: 0.34,
      line: { color: s.color, pt: 1.5 },
    });
    slide.addText(s.title, {
      x: x - 0.56,
      y: s.yText,
      w: 1.94,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.5,
      bold: true,
      color: s.color,
      align: "center",
      margin: 0,
    });
    slide.addText(s.body, {
      x: x - 0.82,
      y: s.yText + 0.46,
      w: 2.46,
      h: 0.62,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      color: C.ink,
      align: "center",
      margin: 0,
    });
  });
  // El chip IDEA toca deliberadamente la primera estación para marcar el punto de entrada a la ruta.
  pill(slide, "IDEA", 0.72, 3.69, 0.66, { fill: C.white, line: C.red, color: C.red, fontSize: 9.2 });
  pill(slide, "SIGUIENTE PASO", 11.82, 3.69, 1.15, { fill: C.navy, line: C.navy, color: C.white, fontSize: 8.4 });
  slide.addShape(SH.roundRect, {
    x: 1.02,
    y: 6.18,
    w: 11.28,
    h: 0.68,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("SALIDA DEL TALLER 3", {
    x: 1.28,
    y: 6.39,
    w: 2.0,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.5,
    bold: true,
    charSpacing: 1.0,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Una propuesta + un sensor elegido + una primera prueba para continuar en las mentorías.", {
    x: 3.28,
    y: 6.35,
    w: 8.58,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.8,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addNotesAndValidate(slide, "Presentar el taller como cuatro decisiones conectadas. Las herramientas no son el objetivo: sirven para pasar de problema a evidencia. La salida de hoy alimenta las mentorías; no representa un proyecto terminado.");
}

// 05 · Activación de roles del equipo
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true, x: 5.86, y: 0.24, w: 1.48, h: 1.06 });

  slide.addShape(SH.roundRect, {
    x: 8.03,
    y: 0.12,
    w: 5.02,
    h: 7.25,
    rectRadius: 0.05,
    fill: { color: C.paper },
    line: { color: "C9D5E0", pt: 1.1 },
    shadow: { type: "outer", color: "000000", opacity: 0.22, blur: 2, angle: 45, distance: 1.2 },
  });
  addImageContain(slide, IMG.teamRoles, 8.13, 0.2, 4.82, 7.08);

  pill(slide, "ACTIVEN SUS ROLES · 2 MIN", 0.78, 0.68, 2.42, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 9.8,
  });
  slide.addText("Antes de construir,\nrepartan responsabilidades", {
    x: 0.78,
    y: 1.38,
    w: 6.62,
    h: 1.25,
    fontFace: TYPOGRAPHY.display,
    fontSize: 31,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("El equipo ya comparte un problema. Ahora cada integrante retoma una misión concreta.", {
    x: 0.8,
    y: 2.9,
    w: 6.28,
    h: 0.62,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.3,
    color: "D8E7F5",
    margin: 0,
  });

  const actions = [
    ["01", "CONFIRMEN", "Los seis roles tienen responsable."],
    ["02", "ASUMAN", "Cada persona sabe qué debe cuidar y dejar como evidencia."],
    ["03", "TRANSFIERAN", "Si un rol rota, entrega contexto antes de cambiar."],
  ];
  actions.forEach((a, i) => {
    const y = 3.86 + i * 0.84;
    numberBadge(slide, a[0], 0.82, y, [C.red, C.cyan, C.gold][i]);
    slide.addText(a[1], {
      x: 1.48,
      y: y - 0.01,
      w: 1.58,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      bold: true,
      charSpacing: 0.8,
      color: [C.red, C.cyan, C.gold][i],
      margin: 0,
    });
    slide.addText(a[2], {
      x: 3.12,
      y: y - 0.02,
      w: 4.06,
      h: 0.42,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.8,
      color: C.white,
      margin: 0,
    });
  });

  slide.addShape(SH.line, {
    x: 0.8,
    y: 6.48,
    w: 6.38,
    h: 0,
    line: { color: C.cyan, pt: 1.5, transparency: 18 },
  });
  slide.addText("El rol tiene responsable. La idea pertenece al equipo.", {
    x: 0.8,
    y: 6.7,
    w: 6.4,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.5,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("05", {
    x: 7.12,
    y: 7.08,
    w: 0.5,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11,
    bold: true,
    color: "BFD1E2",
    align: "right",
    margin: 0,
  });
  addNotesAndValidate(slide, "Dar dos minutos para confirmar responsabilidades. Los equipos vienen del Taller 1; no es necesario volver a formarlos. Recordar que los roles pueden rotar, pero la responsabilidad debe transferirse con contexto y evidencia.");
}

// 06 · Apertura Bloque 1
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addImageCrop(slide, IMG.prototypeFocus, 7.72, 0, 5.61, 7.5);
  slide.addShape(SH.rect, {
    x: 6.35,
    y: 0,
    w: 2.2,
    h: 7.5,
    fill: { color: C.navy, transparency: 18 },
    line: { color: C.navy, transparency: 100 },
  });
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  pill(slide, "BLOQUE 1 · 15 MIN", 0.78, 0.72, 1.82, { fill: C.red, line: C.red, color: C.white, fontSize: 9.8 });
  slide.addText("Una idea que\nsiguió creciendo", {
    x: 0.78,
    y: 1.58,
    w: 6.34,
    h: 1.5,
    fontFace: TYPOGRAPHY.display,
    fontSize: 35,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("GeoGreen como proyecto emblemático, caso real y punto de partida para crear.", {
    x: 0.8,
    y: 3.42,
    w: 5.66,
    h: 0.84,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17,
    color: "D8E7F5",
    margin: 0,
  });
  slide.addShape(SH.line, {
    x: 0.8,
    y: 4.72,
    w: 4.62,
    h: 0,
    line: { color: C.cyan, pt: 2.2 },
  });
  slide.addText("PROBLEMA → PRUEBA → EVIDENCIA → MEJORA", {
    x: 0.8,
    y: 4.98,
    w: 5.9,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12,
    bold: true,
    color: C.gold,
    charSpacing: 0.7,
    margin: 0,
  });
  addImageContain(slide, IMG.mark, 0.82, 6.22, 0.66, 0.46);
  slide.addText("AIEP Osorno · GeoGreen Escolar", {
    x: 1.62,
    y: 6.34,
    w: 3.2,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.5,
    color: "BFD1E2",
    margin: 0,
  });
  addNotesAndValidate(slide, "Cambio de ritmo. Presentar el bloque como una historia de decisiones verificables. Evitar una cronología institucional larga.");
}

// 07 · Comparación entre versiones
{
  const slide = pptx.addSlide();
  addHeader(slide, "Decisiones de diseño", "Del prototipo original a GeoGreen Escolar", "La idea central se mantiene; cada cambio agrega una respuesta más clara para quien usa el sistema.", 7);

  const versions = [
    {
      x: 0.72,
      w: 5.72,
      img: IMG.original,
      tag: "PROTOTIPO ORIGINAL",
      tagColor: C.cyan,
      title: "Medir y comunicar a distancia",
      items: [
        ["HC-SR04", "detecta el nivel de llenado"],
        ["SIM7600SA", "envía información por red celular"],
      ],
    },
    {
      x: 6.89,
      w: 5.72,
      img: IMG.prototypeLandscape,
      tag: "VERSIÓN GEOGREEN ESCOLAR",
      tagColor: C.red,
      title: "Hacer el estado visible y accionable",
      items: [
        ["UNO R4 WiFi", "conecta sin módulo SIM externo"],
        ["Semáforo + buzzer", "avisan de inmediato en el lugar"],
      ],
    },
  ];

  versions.forEach((v) => {
    slide.addShape(SH.roundRect, {
      x: v.x,
      y: 1.88,
      w: v.w,
      h: 4.55,
      rectRadius: 0.06,
      fill: { color: C.white },
      line: { color: v.tagColor, pt: 1.35 },
      shadow: { type: "outer", color: "9EABB7", opacity: 0.15, blur: 1.4, angle: 45, distance: 1 },
    });
    addImageCrop(slide, v.img, v.x + 0.12, 2.0, v.w - 0.24, 2.42);
    pill(slide, v.tag, v.x + 0.24, 2.18, 2.48, {
      fill: v.tagColor,
      line: v.tagColor,
      color: v.tagColor === C.cyan ? C.navyDeep : C.white,
      fontSize: 9.4,
    });
    slide.addText(v.title, {
      x: v.x + 0.26,
      y: 4.66,
      w: v.w - 0.52,
      h: 0.34,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16.5,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    v.items.forEach((item, i) => {
      const y = 5.24 + i * 0.62;
      slide.addShape(SH.ellipse, {
        x: v.x + 0.28,
        y: y + 0.04,
        w: 0.15,
        h: 0.15,
        fill: { color: v.tagColor },
        line: { color: v.tagColor },
      });
      slide.addText(item[0], {
        x: v.x + 0.56,
        y,
        w: 1.46,
        h: 0.22,
        fontFace: TYPOGRAPHY.body,
        fontSize: 11.2,
        bold: true,
        color: C.navy,
        margin: 0,
      });
      slide.addText(item[1], {
        x: v.x + 2.12,
        y,
        w: v.w - 2.42,
        h: 0.3,
        fontFace: TYPOGRAPHY.body,
        fontSize: 10.8,
        color: C.ink,
        margin: 0,
      });
    });
  });

  slide.addShape(SH.chevron, {
    x: 6.52,
    y: 3.15,
    w: 0.28,
    h: 0.46,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("Una mejora vale cuando resuelve algo concreto.", {
    x: 4.13,
    y: 6.55,
    w: 5.08,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.2,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, "Comparar funciones, no solo componentes. El original usaba HC-SR04 y comunicación celular mediante SIM7600SA; no tenía semáforo ni buzzer. La versión escolar usa UNO R4 WiFi y agrega señales locales para comprender y actuar de inmediato.");
}

// 08 · Problema ambiental
{
  const slide = pptx.addSlide();
  addHeader(slide, "El punto de partida", "Un contenedor puede llenarse sin avisar", "La tecnología aparece porque existe una decisión que debe tomarse a tiempo.", 8);
  addImageCrop(slide, IMG.system, 0.72, 1.88, 6.88, 4.76);
  slide.addShape(SH.roundRect, {
    x: 7.9,
    y: 2.02,
    w: 4.55,
    h: 0.88,
    rectRadius: 0.04,
    fill: { color: "F8E7E8" },
    line: { color: C.red, pt: 1.1 },
  });
  slide.addText("Si nadie lo detecta a tiempo…", {
    x: 8.2,
    y: 2.3,
    w: 3.92,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.5,
    bold: true,
    color: C.red,
    margin: 0,
  });
  const impacts = ["Acumulación", "Malos olores", "Retiro ineficiente", "Puntos de reciclaje desordenados"];
  impacts.forEach((item, i) => {
    const y = 3.32 + i * 0.58;
    slide.addShape(SH.ellipse, {
      x: 8.04,
      y: y + 0.02,
      w: 0.16,
      h: 0.16,
      fill: { color: i < 2 ? C.red : C.gold },
      line: { color: i < 2 ? C.red : C.gold },
    });
    slide.addText(item, {
      x: 8.42,
      y,
      w: 3.72,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12,
      color: C.ink,
      margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 7.9,
    y: 5.88,
    w: 4.55,
    h: 0.7,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("¿Qué tendría que observar el sistema?", {
    x: 8.18,
    y: 6.1,
    w: 4.0,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, "Recuperar conocimientos de Taller 1 y 2. Pedir una respuesta concreta: distancia, altura o nivel de llenado. No comenzar todavía por el nombre del sensor.");
}

// 09 · Pipeline del sistema
{
  const slide = pptx.addSlide();
  addHeader(slide, "Versión GeoGreen Escolar", "Del mundo físico a una decisión útil", "Cada parte cumple una función. Si falta una, la información puede llegar tarde o no servir.", 9);
  addImageCrop(slide, IMG.system, 0.72, 1.9, 11.9, 4.72);
  const stages = [
    { x: 0.96, w: 2.22, title: "SENSAR", body: "Medir la distancia", color: C.cyan },
    { x: 3.65, w: 2.22, title: "ENVIAR", body: "Mover o compartir el dato", color: C.gold },
    { x: 6.34, w: 2.22, title: "VISUALIZAR", body: "Mostrar el estado", color: C.green },
    { x: 9.03, w: 2.22, title: "ALERTAR", body: "Provocar una acción", color: C.red },
  ];
  stages.forEach((s, i) => {
    slide.addShape(SH.roundRect, {
      x: s.x,
      y: 5.46,
      w: s.w,
      h: 0.86,
      rectRadius: 0.04,
      fill: { color: C.navy, transparency: 4 },
      line: { color: s.color, pt: 1.8 },
    });
    slide.addText(s.title, {
      x: s.x + 0.12,
      y: 5.62,
      w: s.w - 0.24,
      h: 0.2,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.8,
      bold: true,
      color: s.color,
      align: "center",
      margin: 0,
    });
    slide.addText(s.body, {
      x: s.x + 0.12,
      y: 5.92,
      w: s.w - 0.24,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      color: C.white,
      align: "center",
      margin: 0,
    });
    if (i < 3) {
      slide.addShape(SH.chevron, {
        x: s.x + s.w + 0.23,
        y: 5.74,
        w: 0.24,
        h: 0.24,
        fill: { color: C.cyan },
        line: { color: C.cyan },
      });
    }
  });
  addNotesAndValidate(slide, "Recorrer de izquierda a derecha. Aclarar que enviar puede ser interno —del sensor a la placa— o por red en una versión conectada. La salida puede ser luz, sonido, pantalla, app o acción física.");
}

// 10 · Demostración real
{
  const slide = pptx.addSlide();
  addHeader(slide, "Demostración", "Observen qué cambia cuando el sensor detecta algo", "No miren solo el circuito: sigan la cadena desde el movimiento hasta la respuesta.", 10);
  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 1.86,
    w: 7.24,
    h: 4.82,
    rectRadius: 0.06,
    fill: { color: C.darkPanel },
    line: { color: C.navy, pt: 1.2 },
  });
  slide.addMedia({
    type: "video",
    path: IMG.videoPrototype,
    cover: imageDataUri(IMG.prototypeLandscape),
    x: 0.88,
    y: 2.02,
    w: 6.92,
    h: 4.5,
  });
  pill(slide, "▶ REPRODUCIR", 1.08, 5.9, 1.55, { fill: C.red, line: C.red, color: C.white, fontSize: 9.8 });
  slide.addText("Mientras se reproduce, identifiquen:", {
    x: 8.36,
    y: 2.08,
    w: 4.0,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  const checks = [
    { n: "1", title: "ENTRADA", body: "¿Qué cambia frente al sensor?", color: C.cyan },
    { n: "2", title: "DATO", body: "¿Qué valor aparece en pantalla?", color: C.gold },
    { n: "3", title: "RESPUESTA", body: "¿Qué luz o alerta se activa?", color: C.red },
  ];
  checks.forEach((c, i) => {
    const y = 2.78 + i * 1.08;
    numberBadge(slide, c.n, 8.42, y, c.color);
    slide.addText(c.title, {
      x: 9.06,
      y: y - 0.01,
      w: 1.48,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10,
      bold: true,
      color: c.color,
      margin: 0,
    });
    slide.addText(c.body, {
      x: 9.06,
      y: y + 0.28,
      w: 3.06,
      h: 0.26,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11,
      color: C.ink,
      margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 8.36,
    y: 5.94,
    w: 4.02,
    h: 0.62,
    rectRadius: 0.04,
    fill: { color: C.cyanSoft },
    line: { color: C.cyan, pt: 1 },
  });
  slide.addText("La evidencia es observable: algo cambia y podemos explicarlo.", {
    x: 8.62,
    y: 6.12,
    w: 3.5,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, "Reproducir el video o realizar la demostración física. Pedir al curso que narre entrada, dato y respuesta. La atención debe ir al comportamiento, no a memorizar los cables.");
}

// 11 · Medición versus información útil
{
  const slide = pptx.addSlide();
  addHeader(slide, "La diferencia clave", "Medir no es lo mismo que resolver", "Un número se vuelve útil cuando permite interpretar una situación y decidir qué hacer.", 11);
  slide.addShape(SH.roundRect, {
    x: 0.76,
    y: 2.02,
    w: 4.3,
    h: 3.88,
    rectRadius: 0.06,
    fill: { color: "F2EEE8" },
    line: { color: C.border, pt: 1.2 },
  });
  slide.addText("68%", {
    x: 1.12,
    y: 2.62,
    w: 3.56,
    h: 1.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 56,
    bold: true,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  slide.addText("Solo un valor", {
    x: 1.26,
    y: 4.02,
    w: 3.28,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText("¿Es alto? ¿Hay que actuar? ¿Quién debe enterarse?", {
    x: 1.18,
    y: 4.58,
    w: 3.44,
    h: 0.62,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.4,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.chevron, {
    x: 5.44,
    y: 3.65,
    w: 0.72,
    h: 0.72,
    fill: { color: C.cyan },
    line: { color: C.cyan },
  });
  slide.addShape(SH.roundRect, {
    x: 6.52,
    y: 1.88,
    w: 5.96,
    h: 4.18,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  // Esta composición conserva el encuadre vertical aprobado: OLED + señal local + sensor.
  addImageCrop(slide, IMG.prototype, 6.72, 2.08, 2.22, 3.78);
  slide.addText("68%", {
    x: 9.22,
    y: 2.36,
    w: 2.72,
    h: 0.72,
    fontFace: TYPOGRAPHY.display,
    fontSize: 36,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  pill(slide, "ESTADO AMARILLO", 9.22, 3.24, 2.38, { fill: C.gold, line: C.gold, color: C.navyDeep, fontSize: 10.2 });
  slide.addText("Revisar pronto", {
    x: 9.22,
    y: 3.9,
    w: 2.82,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Dato + regla + forma de comunicar = una decisión posible.", {
    x: 9.22,
    y: 4.5,
    w: 2.66,
    h: 0.76,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12,
    color: "D8E7F5",
    margin: 0,
  });
  slide.addText("Si el sensor solo entregara un número, ¿el problema estaría realmente resuelto?", {
    x: 1.18,
    y: 6.42,
    w: 10.96,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, "Pregunta de comprensión. Buscar que aparezcan ideas como umbral, contexto, alerta, persona responsable y decisión. No aceptar solo sí/no.");
}

// 12 · Primera mitad de la ruta
{
  const slide = pptx.addSlide();
  addHeader(slide, "La ruta real · Parte 1", "Primero: hacer que la idea funcione", "Cada herramienta respondió una pregunta concreta y produjo una evidencia observable.", 12);
  const panels = [
    { x: 0.72, w: 2.55, color: C.red, n: "01", title: "DEFINIR", question: "¿Qué debe medir y para qué?" },
    { x: 3.46, w: 2.8, color: C.cyan, n: "02", title: "SIMULAR", question: "¿Funciona la lógica sin arriesgar la placa?" },
    { x: 6.45, w: 3.02, color: C.gold, n: "03", title: "REPETIR", question: "¿Podemos ejecutar la misma prueba otra vez?" },
    { x: 9.66, w: 2.95, color: C.navy, n: "04", title: "LLEVAR AL MUNDO FÍSICO", question: "¿Se comporta igual en la placa real?" },
  ];
  panels.forEach((p, i) => {
    slide.addShape(SH.roundRect, {
      x: p.x,
      y: 1.9,
      w: p.w,
      h: 4.72,
      rectRadius: 0.05,
      fill: { color: i === 0 ? C.navy : C.white },
      line: { color: p.color, pt: 1.25 },
    });
    pill(slide, p.n, p.x + 0.16, 2.08, 0.52, {
      fill: p.color,
      line: p.color,
      color: i === 2 ? C.navyDeep : C.white,
      fontSize: 9.4,
    });
    slide.addText(p.title, {
      x: p.x + 0.16,
      y: 2.62,
      w: p.w - 0.32,
      h: 0.46,
      fontFace: TYPOGRAPHY.display,
      fontSize: i === 3 ? 12.8 : 15,
      bold: true,
      color: i === 0 ? C.white : C.navy,
      margin: 0,
    });
    slide.addText(p.question, {
      x: p.x + 0.16,
      y: 3.14,
      w: p.w - 0.32,
      h: 0.58,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.6,
      color: i === 0 ? "D8E7F5" : C.ink,
      margin: 0,
    });
    if (i < panels.length - 1) {
      slide.addShape(SH.chevron, {
        x: p.x + p.w + 0.08,
        y: 4.0,
        w: 0.16,
        h: 0.3,
        fill: { color: C.cyan },
        line: { color: C.cyan },
      });
    }
  });

  slide.addText("CASO GEOGREEN", {
    x: 0.92,
    y: 4.06,
    w: 1.7,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    charSpacing: 1,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("La distancia al contenido cambia con el nivel de llenado.", {
    x: 0.92,
    y: 4.42,
    w: 2.14,
    h: 0.84,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Evidencia: problema y comportamiento esperado.", {
    x: 0.92,
    y: 5.72,
    w: 2.08,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    color: C.gold,
    margin: 0,
  });

  addImageCrop(slide, IMG.wokwi, 3.62, 3.92, 2.48, 1.5);
  pill(slide, "WOKWI", 3.72, 5.56, 0.94, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 10 });
  slide.addText("Circuito + código + valores", {
    x: 4.74,
    y: 5.58,
    w: 1.22,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  slidesSystem.components.addTerminalPanel(slide, SH, {
    x: 6.62,
    y: 3.94,
    w: 2.68,
    h: 1.66,
    title: "Prueba desde la terminal",
    fontSize: 9.8,
    lines: [
      { prompt: "$", text: "wokwi-cli ." },
      { text: "simulación completada", kind: "muted" },
      { prompt: "$", text: "wokwi-cli ." },
      { text: "misma prueba · nuevo resultado", kind: "muted" },
    ],
  });
  slide.addText("CLI = compilar, ejecutar y repetir sin depender de clics.", {
    x: 6.7,
    y: 5.78,
    w: 2.48,
    h: 0.44,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  addImageContain(slide, IMG.r4, 9.92, 3.72, 2.42, 1.72);
  pill(slide, "PLATFORMIO", 9.94, 5.5, 1.34, { fill: C.navy, line: C.navy, color: C.white, fontSize: 10 });
  slide.addText("Carga el programa en la placa.", {
    x: 11.4,
    y: 5.5,
    w: 1.0,
    h: 0.62,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.1,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addNotesAndValidate(slide, "Recorrer las cuatro preguntas. Wokwi permite experimentar sin placa; la CLI hace repetible cualquier proyecto preparado por el equipo; PlatformIO lleva el programa a la placa física. El comando es genérico y sirve para comprender la función de la herramienta, no para memorizarlo.");
}

// 13 · Segunda mitad de la ruta
{
  const slide = pptx.addSlide();
  addHeader(slide, "La ruta real · Parte 2", "Después: hacerla confiable, comprensible y utilizable", "Profesionalizar no es agregar cosas porque sí; es resolver mejor el problema.", 13);
  const items = [
    { x: 0.72, y: 1.92, w: 3.0, h: 2.03, img: IMG.prototypeLandscape, tag: "5 · INTEGRAR", title: "Protoboard + sensores", body: "Conectar, observar y corregir." },
    { x: 3.93, y: 2.28, w: 3.0, h: 2.03, img: IMG.dashboard, tag: "6 · VISUALIZAR", title: "Dashboard + mapa", body: "Transformar datos en información." },
    { x: 7.14, y: 1.92, w: 2.42, h: 2.03, img: IMG.blender, tag: "7 · PROTEGER", title: "Diseño 3D", body: "Pensar uso, forma y montaje." },
    { x: 9.77, y: 2.28, w: 2.84, h: 2.03, img: IMG.pcbRender, tag: "8 · PROFESIONALIZAR", title: "PCB propia", body: "Integrar un circuito ya validado." },
  ];
  items.forEach((it, i) => {
    slide.addShape(SH.roundRect, {
      x: it.x,
      y: it.y,
      w: it.w,
      h: 3.58,
      rectRadius: 0.05,
      fill: { color: C.white },
      line: { color: [C.cyan, C.gold, C.green, C.red][i], pt: 1.2 },
    });
    addImageCrop(slide, it.img, it.x + 0.1, it.y + 0.1, it.w - 0.2, it.h);
    pill(slide, it.tag, it.x + 0.16, it.y + 1.84, it.w - 0.32, {
      fill: [C.cyan, C.gold, C.green, C.red][i],
      line: [C.cyan, C.gold, C.green, C.red][i],
      color: i === 1 ? C.navyDeep : C.white,
      fontSize: 10,
    });
    slide.addText(it.title, {
      x: it.x + 0.18,
      y: it.y + 2.38,
      w: it.w - 0.36,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.4,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(it.body, {
      x: it.x + 0.18,
      y: it.y + 2.84,
      w: it.w - 0.36,
      h: 0.46,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      color: C.ink,
      margin: 0,
    });
  });
  slide.addText("Cada capa se ganó con pruebas. Ninguna reemplaza comprender el problema.", {
    x: 1.0,
    y: 6.48,
    w: 11.25,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.8,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, "Mostrar amplitud, no exigencias. El modelado 3D y la PCB son posibles etapas posteriores. Aclarar que una propuesta sencilla pero bien probada puede ser más sólida que una llena de componentes sin propósito.");
}

// 14 · Desarrollo agéntico y caja de herramientas
{
  const slide = pptx.addSlide();
  addHeader(slide, "El método", "La IA acelera. La evidencia decide.", "Un agente puede investigar, proponer y ejecutar; el equipo define el propósito, revisa y comprueba.", 14);
  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 1.88,
    w: 5.12,
    h: 4.86,
    rectRadius: 0.05,
    fill: { color: C.darkPanel },
    line: { color: C.navy, pt: 1.2 },
  });
  addImageCrop(slide, IMG.agentic, 0.82, 1.98, 4.92, 4.66);
  slide.addShape(SH.rect, {
    x: 0.82,
    y: 5.72,
    w: 4.92,
    h: 0.92,
    fill: { color: C.navyDeep, transparency: 8 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  pill(slide, "EQUIPO + AGENTE + EVIDENCIA", 1.06, 5.94, 2.72, {
    fill: C.cyan,
    line: C.cyan,
    color: C.navyDeep,
    fontSize: 10.2,
  });
  slide.addText("La IA trabaja sobre el contexto que ustedes entregan.", {
    x: 3.94,
    y: 5.9,
    w: 1.52,
    h: 0.46,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.1,
    bold: true,
    color: C.white,
    margin: 0,
  });

  const moves = [
    {
      y: 1.92,
      h: 1.27,
      n: "01",
      color: C.cyan,
      title: "DAR CONTEXTO",
      body: "Sensor KY-018 · Arduino R4 · Queremos detectar poca luz.",
      tag: "Qué tenemos + qué queremos lograr",
    },
    {
      y: 3.34,
      h: 1.43,
      n: "02",
      color: C.gold,
      title: "PEDIR UNA PRUEBA PEQUEÑA",
      body: "“Primero lee el sensor y muestra el valor. No construyas todo de una vez.”",
      tag: "Una pregunta que pueda comprobarse",
    },
    {
      y: 4.92,
      h: 1.45,
      n: "03",
      color: C.green,
      title: "VERIFICAR ANTES DE AVANZAR",
      body: "Pinout oficial · voltaje · compilación · lectura real.",
      tag: "Si no hay evidencia, sigue siendo una propuesta",
    },
  ];
  moves.forEach((m, i) => {
    slide.addShape(SH.roundRect, {
      x: 6.12,
      y: m.y,
      w: 6.46,
      h: m.h,
      rectRadius: 0.05,
      fill: { color: i === 1 ? "FFF8E5" : C.white },
      line: { color: m.color, pt: 1.2 },
    });
    slide.addShape(SH.rect, {
      x: 6.12,
      y: m.y,
      w: 0.14,
      h: m.h,
      fill: { color: m.color },
      line: { color: m.color },
    });
    pill(slide, m.n, 6.44, m.y + 0.18, 0.5, {
      fill: m.color,
      line: m.color,
      color: i === 1 ? C.navyDeep : C.white,
      fontSize: 8.8,
    });
    slide.addText(m.title, {
      x: 7.12,
      y: m.y + 0.17,
      w: 4.92,
      h: 0.25,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.3,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(m.body, {
      x: 7.12,
      y: m.y + 0.52,
      w: 4.96,
      h: i === 1 ? 0.42 : 0.3,
      fontFace: i === 1 ? TYPOGRAPHY.mono : TYPOGRAPHY.body,
      fontSize: i === 1 ? 10.4 : 11.2,
      bold: i !== 1,
      color: C.ink,
      margin: 0,
    });
    slide.addText(m.tag, {
      x: 7.12,
      y: m.y + m.h - 0.29,
      w: 4.96,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10,
      bold: true,
      color: m.color,
      margin: 0,
    });
  });
  slide.addText("AGENTE", {
    x: 6.3,
    y: 6.57,
    w: 0.78,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    color: C.cyan,
    align: "center",
    margin: 0,
  });
  slide.addText("propone", {
    x: 7.18,
    y: 6.55,
    w: 0.7,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.chevron, { x: 7.98, y: 6.55, w: 0.15, h: 0.2, fill: { color: C.slate }, line: { color: C.slate } });
  slide.addText("EQUIPO", {
    x: 8.26,
    y: 6.57,
    w: 0.82,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    color: C.gold,
    align: "center",
    margin: 0,
  });
  slide.addText("comprueba", {
    x: 9.2,
    y: 6.55,
    w: 0.82,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.chevron, { x: 10.14, y: 6.55, w: 0.15, h: 0.2, fill: { color: C.slate }, line: { color: C.slate } });
  slide.addText("EVIDENCIA", {
    x: 10.4,
    y: 6.57,
    w: 1.0,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    color: C.green,
    align: "center",
    margin: 0,
  });
  slide.addText("decide", {
    x: 11.58,
    y: 6.55,
    w: 0.66,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, "Usar el ejemplo visible para modelar una interacción agéntica. Señalar que el contexto limita la respuesta, la prueba pequeña reduce riesgos y la verificación humana decide si se puede avanzar.");
}

// 15 · El reto empieza hoy, continúa en mentorías
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.opening, 0, 0, W, H);
  slide.addShape(SH.rect, {
    x: 0,
    y: 0,
    w: W,
    h: H,
    fill: { color: C.navyDeep, transparency: 30 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  addTopBars(slide);
  addInstitutionalLockup(slide, { white: true });
  pill(slide, "EL DESAFÍO", 0.78, 0.62, 1.42, { fill: C.red, line: C.red, color: C.white, fontSize: 10 });
  slide.addText("GeoGreen demuestra hasta dónde puede crecer una idea.", {
    x: 0.78,
    y: 1.18,
    w: 7.3,
    h: 0.72,
    fontFace: TYPOGRAPHY.display,
    fontSize: 27,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Hoy comienza la de ustedes.", {
    x: 0.78,
    y: 2.04,
    w: 5.5,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 25,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  const phases = [
    { x: 0.82, w: 3.36, label: "HOY · TALLER 3", title: "Elegir y probar", body: "Problema + variable + sensor + primera prueba", color: C.cyan },
    { x: 4.48, w: 3.82, label: "DESPUÉS · MENTORÍAS", title: "Construir y mejorar", body: "Validar, corregir, integrar y guardar evidencia", color: C.gold },
    { x: 8.6, w: 3.86, label: "AL FINAL · EVENTO", title: "Presentar lo logrado", body: "Explicar la solución y demostrar su avance", color: C.red },
  ];
  phases.forEach((p, i) => {
    slide.addShape(SH.roundRect, {
      x: p.x,
      y: 4.08,
      w: p.w,
      h: 1.7,
      rectRadius: 0.05,
      fill: { color: C.navyDeep, transparency: 4 },
      line: { color: p.color, pt: 1.6 },
    });
    slide.addText(p.label, {
      x: p.x + 0.2,
      y: 4.28,
      w: p.w - 0.4,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10,
      bold: true,
      charSpacing: 0.9,
      color: p.color,
      margin: 0,
    });
    slide.addText(p.title, {
      x: p.x + 0.2,
      y: 4.62,
      w: p.w - 0.4,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.5,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(p.body, {
      x: p.x + 0.2,
      y: 5.12,
      w: p.w - 0.4,
      h: 0.38,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      color: "D8E7F5",
      margin: 0,
    });
    if (i < 2) {
      slide.addShape(SH.chevron, {
        x: p.x + p.w + 0.12,
        y: 4.77,
        w: 0.22,
        h: 0.3,
        fill: { color: C.white, transparency: 15 },
        line: { color: C.white, transparency: 15 },
      });
    }
  });
  slide.addText("No tienen que terminar hoy. Tienen que descubrir qué vale la pena desarrollar.", {
    x: 1.0,
    y: 6.48,
    w: 11.3,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, "Aclaración temporal explícita: el taller abre el proceso; las mentorías permiten construir y mejorar; el evento final ocurre después. La competencia es horizonte, no actividad del Taller 3.");
}

// 16 · Cierre del bloque y puente
{
  const slide = pptx.addSlide();
  addHeader(slide, "Cierre del Bloque 1", "Seis preguntas convierten una idea en proyecto", "Si el equipo puede responderlas con claridad, ya tiene una base que puede probar y mejorar.", 16);
  slide.addShape(SH.roundRect, {
    x: 0.72,
    y: 1.84,
    w: 11.9,
    h: 4.82,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("PASAPORTE", {
    x: 1.0,
    y: 2.08,
    w: 1.28,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    charSpacing: 1.35,
    color: C.cyan,
    margin: 0,
  });
  pill(slide, "PREGUNTA PARA CUALQUIER EQUIPO", 2.48, 2.02, 4.2, {
    fill: "173E6B",
    line: "3F668D",
    color: C.white,
    fontSize: 10.2,
  });
  pill(slide, "EJEMPLO GEOGREEN", 7.08, 2.02, 4.92, {
    fill: C.white,
    line: C.white,
    color: C.navy,
    fontSize: 10.2,
  });
  const rows = [
    { label: "PROPÓSITO", question: "¿Qué problema y para quién?", example: "Detectar un contenedor lleno a tiempo.", color: C.red },
    { label: "VARIABLE", question: "¿Qué podemos medir?", example: "Distancia entre sensor y contenido.", color: C.cyan },
    { label: "REGLA", question: "¿Cuándo responde?", example: "Si llega a 80 %, cambia a rojo.", color: C.gold },
    { label: "RESPUESTA", question: "¿Qué hará o comunicará?", example: "Luz roja + buzzer + alerta.", color: C.red },
    { label: "EVIDENCIA", question: "¿Cómo lo demostramos?", example: "Repetir la prueba y observar el cambio.", color: C.green },
    { label: "PRÓXIMO PASO", question: "¿Qué probaremos después?", example: "Calibrar y comparar lecturas.", color: C.cyan },
  ];
  rows.forEach((r, i) => {
    const y = 2.58 + i * 0.61;
    if (i % 2 === 0) {
      slide.addShape(SH.rect, {
        x: 0.94,
        y: y - 0.05,
        w: 11.42,
        h: 0.56,
        fill: { color: "173E6B" },
        line: { color: "173E6B" },
      });
    }
    slide.addShape(SH.rect, {
      x: 1.0,
      y: y - 0.01,
      w: 0.08,
      h: 0.43,
      fill: { color: r.color },
      line: { color: r.color },
    });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: 1.18,
      y: y + 0.08,
      w: 0.34,
      h: 0.16,
      fontFace: TYPOGRAPHY.display,
      fontSize: 9.2,
      bold: true,
      color: r.color,
      margin: 0,
    });
    slide.addText(r.label, {
      x: 1.52,
      y: y + 0.06,
      w: 1.08,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10,
      bold: true,
      color: C.white,
      margin: 0,
    });
    slide.addText(r.question, {
      x: 2.75,
      y: y + 0.03,
      w: 3.75,
      h: 0.28,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      bold: true,
      color: C.white,
      margin: 0,
      valign: "mid",
    });
    slide.addText(r.example, {
      x: 7.16,
      y: y + 0.03,
      w: 4.78,
      h: 0.28,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      color: "D8E7F5",
      margin: 0,
      valign: "mid",
    });
  });
  pill(slide, "SIGUIENTE · ¿CÓMO UNA PLACA, UN SENSOR Y UNA SALIDA HACEN POSIBLE ESTA CADENA?", 1.5, 6.72, 9.92, {
    fill: C.cyanSoft,
    line: C.cyan,
    color: C.navy,
    fontSize: 10.5,
  });
  addNotesAndValidate(slide, "Usar la tabla como síntesis y como apoyo para preguntar al curso. Leer una fila y pedir que identifiquen la respuesta GeoGreen. El puente inferior abre el Bloque 2: comprender placa, protoboard, sensor y salida.");
}

// Helpers específicos del Bloque 2. Se mantienen locales al deck porque explican hardware escolar.
function addSourceTag(slide, textValue, opts = {}) {
  slide.addText(textValue, {
    x: opts.x ?? 0.74,
    y: opts.y ?? 6.88,
    w: opts.w ?? 5.5,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.fontSize ?? 7.6,
    color: opts.dark ? "BFD1E2" : C.slate,
    margin: 0,
    italic: true,
    align: opts.align ?? "left",
  });
}

function addSensorTile(slide, cfg) {
  slide.addShape(SH.roundRect, {
    x: cfg.x,
    y: cfg.y,
    w: cfg.w,
    h: cfg.h,
    rectRadius: 0.05,
    fill: { color: C.white },
    line: { color: cfg.color, pt: 1.15 },
    shadow: { type: "outer", color: "9DA9B4", opacity: 0.12, blur: 1, angle: 45, distance: 0.7 },
  });
  addImageContain(slide, cfg.img, cfg.x + 0.12, cfg.y + 0.16, 0.88, cfg.h - 0.32);
  slide.addText(cfg.title, {
    x: cfg.x + 1.12,
    y: cfg.y + 0.22,
    w: cfg.w - 1.28,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: cfg.titleSize ?? 13.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText(cfg.body, {
    x: cfg.x + 1.12,
    y: cfg.y + 0.62,
    w: cfg.w - 1.28,
    h: 0.4,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    color: C.ink,
    margin: 0,
  });
  pill(slide, cfg.code, cfg.x + 1.12, cfg.y + cfg.h - 0.4, Math.min(1.08, cfg.w - 1.36), {
    fill: cfg.soft || C.softBlue,
    line: cfg.soft || C.softBlue,
    color: cfg.color,
    fontSize: 8.4,
  });
}

// 17 · Apertura Bloque 2
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addShape(SH.ellipse, {
    x: 7.2,
    y: 0.8,
    w: 5.45,
    h: 5.45,
    fill: { color: "16487C", transparency: 8 },
    line: { color: "3C6E9D", pt: 1.2, transparency: 30 },
  });
  addImageContain(slide, IMG.r4, 7.42, 1.2, 5.0, 4.62);
  pill(slide, "BLOQUE 2 · 20 MIN", 0.78, 0.72, 1.82, { fill: C.red, line: C.red, color: C.white, fontSize: 9.8 });
  slide.addText("Del mundo físico\nal dato", {
    x: 0.78,
    y: 1.58,
    w: 5.82,
    h: 1.35,
    fontFace: TYPOGRAPHY.display,
    fontSize: 37,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Placa, protoboard, sensores y seguridad para experimentar sin conectar a ciegas.", {
    x: 0.8,
    y: 3.3,
    w: 5.62,
    h: 0.9,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17,
    color: "D8E7F5",
    margin: 0,
  });
  const chain = [
    ["FENÓMENO", C.cyan],
    ["SENSOR", C.gold],
    ["PLACA", C.white],
    ["REGLA", C.cyan],
    ["SALIDA", C.red],
  ];
  chain.forEach((item, i) => {
    const x = 0.8 + i * 1.24;
    pill(slide, item[0], x, 5.1, 0.98, {
      fill: i === 4 ? C.red : "17436E",
      line: item[1],
      color: C.white,
      fontSize: 8.3,
    });
    if (i < chain.length - 1) {
      slide.addShape(SH.chevron, {
        x: x + 1.03,
        y: 5.18,
        w: 0.14,
        h: 0.16,
        fill: { color: C.gold },
        line: { color: C.gold },
      });
    }
  });
  slide.addText("Meta del bloque: reconocer qué hace cada pieza y qué revisar antes de energizar.", {
    x: 0.8,
    y: 6.12,
    w: 6.2,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.2,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  addSourceTag(slide, "Imagen oficial: Arduino UNO R4 WiFi · Arduino Docs", { x: 7.72, y: 6.54, w: 4.4, dark: true, align: "center" });
  addNotesAndValidate(slide, "Abrir el bloque mostrando la placa física. Aclarar que no se enseñará electrónica completa: se instalará un mapa mental y un protocolo seguro para que el equipo pueda experimentar con apoyo.");
}

// 18 · Una placa conecta dos mundos
{
  const slide = pptx.addSlide();
  addHeader(slide, "La idea central", "Una placa conecta dos mundos", "El sensor traduce un fenómeno físico; la placa ejecuta reglas y convierte la lectura en una respuesta.", 18);

  slide.addShape(SH.roundRect, {
    x: 0.76,
    y: 2.02,
    w: 3.35,
    h: 3.88,
    rectRadius: 0.06,
    fill: { color: "E4F3F4" },
    line: { color: C.cyan, pt: 1.2 },
  });
  slide.addText("MUNDO FÍSICO", {
    x: 1.04,
    y: 2.32,
    w: 2.8,
    h: 0.3,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  const physical = ["distancia", "temperatura", "luz", "humedad", "movimiento"];
  physical.forEach((v, i) => pill(slide, v.toUpperCase(), 1.1 + (i % 2) * 1.38, 3.02 + Math.floor(i / 2) * 0.62, 1.16, {
    fill: C.white,
    line: C.cyan,
    color: C.navy,
    fontSize: 8.8,
  }));
  slide.addText("Existe aunque la placa no esté conectada.", {
    x: 1.04,
    y: 5.18,
    w: 2.8,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.3,
    bold: true,
    color: C.slate,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.chevron, {
    x: 4.35,
    y: 3.65,
    w: 0.38,
    h: 0.65,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addShape(SH.ellipse, {
    x: 4.82,
    y: 2.42,
    w: 3.68,
    h: 3.68,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  addImageContain(slide, IMG.r4, 5.2, 3.02, 2.92, 2.3);
  pill(slide, "LEE · CALCULA · DECIDE", 5.42, 5.42, 2.5, { fill: C.gold, line: C.gold, color: C.navyDeep, fontSize: 9.5 });
  slide.addShape(SH.chevron, {
    x: 8.62,
    y: 3.65,
    w: 0.38,
    h: 0.65,
    fill: { color: C.gold },
    line: { color: C.gold },
  });

  slide.addShape(SH.roundRect, {
    x: 9.12,
    y: 2.02,
    w: 3.45,
    h: 3.88,
    rectRadius: 0.06,
    fill: { color: "F7E8E9" },
    line: { color: C.red, pt: 1.2 },
  });
  slide.addText("MUNDO DIGITAL", {
    x: 9.42,
    y: 2.32,
    w: 2.85,
    h: 0.3,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  const digital = [
    ["68 %", "dato"],
    ["> 80 %", "regla"],
    ["ROJO", "estado"],
    ["BEEP", "alerta"],
  ];
  digital.forEach((v, i) => {
    const y = 3.05 + i * 0.58;
    slide.addText(v[0], { x: 9.52, y, w: 1.08, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: i > 1 ? C.red : C.navy, margin: 0 });
    slide.addText(v[1], { x: 10.78, y: y + 0.04, w: 1.14, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 11, color: C.ink, margin: 0 });
  });
  slide.addText("La placa no comprende el problema: ejecuta instrucciones diseñadas por personas.", {
    x: 1.1,
    y: 6.28,
    w: 11.12,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.3,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, "Usar la comparación para corregir la idea de que la placa 'sabe'. Sin sensor no observa; sin programa no decide; sin salida no comunica. El criterio sigue siendo humano.");
}

// 19 · Cadena funcional
{
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa del sistema", "Una idea se convierte en respuesta cuando completa la cadena", "GeoGreen no es una sola pieza: cada etapa transforma lo que recibe.", 19);
  const stages = [
    { title: "FENÓMENO", verb: "CAMBIA", example: "El contenedor\nse llena", color: C.cyan },
    { title: "SENSOR", verb: "OBSERVA", example: "HC-SR04\nmide distancia", color: C.gold },
    { title: "PLACA", verb: "INTERPRETA", example: "Calcula\n68 %", color: C.white },
    { title: "REGLA", verb: "DECIDE", example: "¿Llegó\na 80 %?", color: C.green },
    { title: "SALIDA", verb: "RESPONDE", example: "Luz +\nsonido", color: C.red },
  ];
  slide.addShape(SH.roundRect, { x: 0.56, y: 1.92, w: 12.22, h: 4.84, rectRadius: 0.08, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addShape(SH.line, { x: 1.42, y: 3.65, w: 10.5, h: 0, line: { color: C.gold, pt: 3.2, endArrowType: "triangle" } });
  stages.forEach((s, i) => {
    const x = 0.82 + i * 2.42;
    const nodeFill = i === 2 ? C.red : C.navy;
    slide.addText(s.title, { x, y: 2.3, w: 1.96, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: s.color, align: "center", margin: 0 });
    slide.addText(s.verb, { x, y: 2.72, w: 1.96, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 9.4, bold: true, charSpacing: 1.1, color: "B9CBE0", align: "center", margin: 0 });
    slide.addShape(SH.ellipse, { x: x + 0.54, y: 3.1, w: 0.88, h: 0.88, fill: { color: nodeFill }, line: { color: s.color, pt: 2.2 } });
    slide.addText(String(i + 1).padStart(2, "0"), { x: x + 0.54, y: 3.37, w: 0.88, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 13.5, bold: true, color: C.white, align: "center", margin: 0 });
    slide.addText(s.example, { x, y: 4.3, w: 1.96, h: 0.74, fontFace: TYPOGRAPHY.display, fontSize: i === 2 ? 18 : 15.5, bold: true, color: i === 2 ? C.white : s.color, align: "center", valign: "mid", margin: 0 });
    slide.addShape(SH.line, { x: x + 0.34, y: 5.35, w: 1.28, h: 0, line: { color: s.color, pt: 1.5 } });
  });
  slide.addText("Si falta una etapa, el sistema puede medir algo… pero todavía no resuelve el problema.", { x: 1.15, y: 5.72, w: 11.02, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 13.2, bold: true, color: C.white, align: "center", margin: 0 });
  pill(slide, "SENSAR", 2.08, 6.28, 1.36, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 9 });
  pill(slide, "ENVIAR", 4.28, 6.28, 1.36, { fill: C.gold, line: C.gold, color: C.navyDeep, fontSize: 9 });
  pill(slide, "VISUALIZAR", 6.48, 6.28, 1.62, { fill: C.white, line: C.white, color: C.navyDeep, fontSize: 9 });
  pill(slide, "ALERTAR", 8.94, 6.28, 1.36, { fill: C.red, line: C.red, color: C.white, fontSize: 9 });
  addNotesAndValidate(slide, "Recorrer la cadena de izquierda a derecha con GeoGreen. Preguntar qué etapa faltaría si el sistema solo entregara 68 %. Conectar la respuesta con visualizar o alertar.");
}

// 20 · Arduino y ESP32
{
  const slide = pptx.addSlide();
  addHeader(slide, "Elegir la placa", "Arduino y ESP32: misma clase de herramienta, límites distintos", "No compiten por ser 'la mejor'. La elección depende de voltaje, conectividad, componentes y forma de prueba.", 20);
  const boards = [
    {
      x: 0.72,
      title: "ARDUINO UNO R4 WiFi",
      voltage: "5 V",
      img: IMG.r4,
      color: C.cyan,
      facts: ["Placa física de GeoGreen", "WiFi + matriz LED integrada", "Compatible con señales lógicas de 5 V"],
      source: "Arduino Docs",
    },
    {
      x: 6.89,
      title: "ESP32 DevKitC",
      voltage: "3,3 V",
      img: IMG.esp32,
      color: C.red,
      facts: ["WiFi + Bluetooth integrados", "Muy usado en proyectos conectados", "GPIO no tolera directamente señales de 5 V"],
      source: "Espressif Systems",
    },
  ];
  boards.forEach((b) => {
    slide.addShape(SH.roundRect, {
      x: b.x,
      y: 1.96,
      w: 5.72,
      h: 4.62,
      rectRadius: 0.06,
      fill: { color: C.white },
      line: { color: b.color, pt: 1.3 },
    });
    slide.addText(b.title, { x: b.x + 0.28, y: 2.2, w: 3.72, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.navy, margin: 0 });
    pill(slide, b.voltage, b.x + 4.34, 2.12, 0.92, { fill: b.color, line: b.color, color: b.color === C.cyan ? C.navyDeep : C.white, fontSize: 12.5 });
    if (b.title.startsWith("ESP32")) {
      addImageCrop(slide, b.img, b.x + 0.34, 2.82, 2.54, 2.18);
    } else {
      addImageContain(slide, b.img, b.x + 0.34, 2.78, 2.54, 2.32);
    }
    b.facts.forEach((f, i) => {
      slide.addShape(SH.ellipse, { x: b.x + 3.0, y: 2.98 + i * 0.65, w: 0.14, h: 0.14, fill: { color: b.color }, line: { color: b.color } });
      slide.addText(f, { x: b.x + 3.28, y: 2.92 + i * 0.65, w: 2.06, h: 0.42, fontFace: TYPOGRAPHY.body, fontSize: 10.8, color: C.ink, margin: 0 });
    });
    slide.addText(`Fuente: ${b.source}`, { x: b.x + 0.34, y: 6.12, w: 2.4, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 7.5, italic: true, color: C.slate, margin: 0 });
  });
  slide.addText("La misma conexión puede ser correcta en una placa y peligrosa en otra.", {
    x: 2.32,
    y: 6.76,
    w: 8.7,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.6,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, "No convertir la comparación en catálogo. Pedir que identifiquen la diferencia de voltaje. Aclarar que WiFi aparece en ambas, pero los límites eléctricos y la forma de trabajo no son iguales.");
}

// 21 · Caso de voltaje HC-SR04
{
  const slide = pptx.addSlide();
  slide.background = { color: C.darkPanel };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("UN MISMO SENSOR · DOS DECISIONES", { x: 0.78, y: 0.5, w: 4.8, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.3, color: C.cyan, margin: 0 });
  slide.addText("5 V no significa lo mismo para todas las placas", { x: 0.78, y: 0.88, w: 10.4, h: 0.5, fontFace: TYPOGRAPHY.display, fontSize: 27, bold: true, color: C.white, margin: 0 });
  slide.addText("El pin Echo del HC-SR04 entrega 5 V. La conexión depende del límite de entrada de la placa.", { x: 0.8, y: 1.46, w: 9.9, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 12.5, color: "D8E7F5", margin: 0 });

  addImageContain(slide, IMG.hcSr04, 5.22, 2.08, 2.9, 2.0);
  pill(slide, "HC-SR04 · ECHO = 5 V", 5.22, 4.08, 2.9, { fill: C.gold, line: C.gold, color: C.navyDeep, fontSize: 11.2 });

  slide.addShape(SH.roundRect, { x: 0.76, y: 2.16, w: 4.02, h: 3.82, rectRadius: 0.06, fill: { color: "103454" }, line: { color: C.cyan, pt: 1.35 } });
  addImageContain(slide, IMG.r4, 1.22, 2.5, 2.0, 1.56);
  slide.addText("UNO R4 WiFi", { x: 1.04, y: 4.28, w: 2.4, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.white, margin: 0 });
  slide.addText("Lógica de 5 V", { x: 1.04, y: 4.72, w: 2.0, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.cyan, margin: 0 });
  slide.addText("Echo puede conectarse directamente.", { x: 1.04, y: 5.18, w: 3.0, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: C.white, margin: 0 });
  pill(slide, "CONEXIÓN DIRECTA", 3.18, 4.64, 1.28, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 8.2 });

  slide.addShape(SH.roundRect, { x: 8.56, y: 2.16, w: 4.02, h: 3.82, rectRadius: 0.06, fill: { color: "103454" }, line: { color: C.red, pt: 1.35 } });
  addImageCrop(slide, IMG.esp32, 9.04, 2.5, 2.0, 1.56);
  slide.addText("ESP32 DevKitC", { x: 8.86, y: 4.28, w: 2.4, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.white, margin: 0 });
  slide.addText("GPIO de 3,3 V", { x: 8.86, y: 4.72, w: 2.0, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.red, margin: 0 });
  slide.addText("Echo necesita divisor de voltaje o adaptación de nivel.", { x: 8.86, y: 5.18, w: 3.1, h: 0.48, fontFace: TYPOGRAPHY.body, fontSize: 11.2, color: C.white, margin: 0 });
  pill(slide, "NO DIRECTO", 11.02, 4.64, 1.18, { fill: C.red, line: C.red, color: C.white, fontSize: 8.4 });

  slide.addShape(SH.line, { x: 4.54, y: 3.18, w: 0.72, h: 0, line: { color: C.cyan, pt: 2.3, endArrowType: "triangle" } });
  slide.addShape(SH.line, { x: 8.08, y: 3.18, w: 0.48, h: 0, line: { color: C.red, pt: 2.3, endArrowType: "triangle" } });
  slide.addText("Regla: verificar el voltaje de salida del sensor y el límite de entrada de la placa.", { x: 1.28, y: 6.44, w: 10.78, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 13, bold: true, color: C.gold, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Presentar este caso como evidencia de por qué el contexto importa. No enseñar todavía a calcular el divisor; basta comprender que el agente debe conocer la placa exacta y que la persona debe verificar el pinout.");
}

// 22 · Leer el pinout
{
  const slide = pptx.addSlide();
  addHeader(slide, "Leer antes de conectar", "Cada pin tiene nombre, función y límites", "El pinout traduce la placa: indica qué puede entrar, salir o alimentar en cada conector.", 22);
  const panels = [
    { x: 0.58, title: "ALIMENTACIÓN + ANALÓGICOS", image: IMG.r4PinoutPower, accent: C.red },
    { x: 6.79, title: "PINES DIGITALES", image: IMG.r4PinoutDigital, accent: C.cyan },
  ];
  panels.forEach((p) => {
    slide.addShape(SH.roundRect, { x: p.x, y: 1.86, w: 5.96, h: 4.98, rectRadius: 0.06, fill: { color: C.white }, line: { color: p.accent, pt: 1.35 } });
    slide.addShape(SH.rect, { x: p.x, y: 1.86, w: 5.96, h: 0.48, fill: { color: p.accent }, line: { color: p.accent } });
    slide.addText(p.title, { x: p.x + 0.22, y: 2.02, w: 5.52, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 12.8, bold: true, color: p.accent === C.red ? C.white : C.navyDeep, align: "center", margin: 0 });
    addImageContain(slide, p.image, p.x + 0.18, 2.42, 3.8, 4.12);
  });
  const leftLabels = [
    ["5V / 3V3 / VIN", "entregan o reciben energía", C.red],
    ["GND", "referencia común del circuito", C.navy],
    ["A0–A5", "leen valores variables", C.green],
  ];
  const rightLabels = [
    ["D0–D13", "leen o activan estados", C.cyan],
    ["~ PWM", "controlan intensidad o velocidad", C.gold],
    ["TX / RX", "comunicación serial", "C772A8"],
  ];
  [leftLabels, rightLabels].forEach((labels, side) => {
    const x = side === 0 ? 4.68 : 10.88;
    labels.forEach((item, i) => {
      const y = 2.72 + i * 1.12;
      slide.addShape(SH.roundRect, { x, y, w: 1.68, h: 0.86, rectRadius: 0.04, fill: { color: side === 0 && i === 0 ? "F8E7E8" : C.softBlue }, line: { color: item[2], pt: 1 } });
      slide.addText(item[0], { x: x + 0.12, y: y + 0.13, w: 1.44, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 11.8, bold: true, color: item[2], align: "center", margin: 0 });
      slide.addText(item[1], { x: x + 0.1, y: y + 0.42, w: 1.48, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 8.7, color: C.ink, align: "center", margin: 0 });
    });
  });
  slide.addText("El texto junto al conector es su identidad. Antes de cablear: nombre → función → voltaje.", { x: 2.0, y: 6.93, w: 9.34, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 12.2, bold: true, color: C.navy, align: "center", margin: 0 });
  addSourceTag(slide, "Fuente: Arduino Docs · UNO R4 WiFi · recortes del pinout oficial · CC BY-SA 4.0", { x: 0.76, y: 6.58, w: 5.6 });
  addNotesAndValidate(slide, "Usar las dos ampliaciones para señalar físicamente los conectores. Primero alimentación y GND; después analógicos y digitales. La meta es que entiendan que cada punto de conexión corresponde a un pin identificado, no que memoricen el mapa.");
}

// 23 · Anatomía de la protoboard
{
  const slide = pptx.addSlide();
  addHeader(slide, "Conexiones invisibles", "La protoboard parece una matriz de puntos; por dentro hay caminos conductores", "La fotografía abierta permite ver exactamente qué puntos están unidos.", 23);
  slide.addShape(SH.roundRect, { x: 0.56, y: 1.9, w: 8.18, h: 4.82, rectRadius: 0.05, fill: { color: C.white }, line: { color: C.border, pt: 1.1 } });
  pill(slide, "PLÁSTICO", 1.02, 2.04, 1.18, { fill: C.navy, line: C.navy, color: C.white, fontSize: 8.8 });
  pill(slide, "LÁMINAS INTERNAS", 6.58, 2.04, 1.66, { fill: C.red, line: C.red, color: C.white, fontSize: 8.8 });
  addImageContain(slide, IMG.breadboardOpen, 0.72, 2.44, 7.86, 4.1);
  slide.addShape(SH.roundRect, { x: 8.98, y: 1.9, w: 3.8, h: 4.82, rectRadius: 0.05, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  const zones = [
    ["RIELES", "Las tiras largas llevan alimentación por los costados.", C.red, "01"],
    ["FILAS DE CINCO", "Cada lámina corta une cinco orificios, no toda la fila.", C.cyan, "02"],
    ["CANAL CENTRAL", "Los dos lados quedan separados: no existe puente bajo el canal.", C.gold, "03"],
  ];
  zones.forEach((z, i) => {
    const y = 2.28 + i * 1.34;
    numberBadge(slide, z[3], 9.24, y, z[2]);
    slide.addText(z[0], { x: 9.92, y: y + 0.05, w: 2.4, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 13.5, bold: true, color: z[2], margin: 0 });
    slide.addText(z[1], { x: 9.24, y: y + 0.48, w: 3.02, h: 0.54, fontFace: TYPOGRAPHY.body, fontSize: 11.2, color: C.white, margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 9.22, y: 6.16, w: 3.3, h: 0.48, rectRadius: 0.04, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("MISMA LÁMINA = MISMA CONEXIÓN", { x: 9.4, y: 6.32, w: 2.94, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 9.7, bold: true, color: C.navyDeep, align: "center", margin: 0 });
  addSourceTag(slide, "Imagen: Wikimedia Commons · CC0", { x: 0.78, y: 6.55, w: 3.4 });
  slide.addText("Regla visual: seguir el metal por dentro explica el circuito por fuera.", { x: 2.0, y: 6.82, w: 9.3, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 11.8, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Mostrar una protoboard real desconectada junto con la diapositiva. Pedir que señalen rieles, filas de cinco y canal central. No asumir que todos los rieles recorren la placa completa.");
}

// 24 · Alimentación, tierra y señal
{
  const slide = pptx.addSlide();
  addHeader(slide, "Tres funciones", "VCC, GND y señal no son intercambiables", "Antes de insertar un cable, el equipo debe poder explicar qué función cumple.", 24);
  slide.addShape(SH.roundRect, {
    x: 0.76,
    y: 2.02,
    w: 3.25,
    h: 4.54,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  addImageContain(slide, IMG.ky015, 1.2, 2.52, 2.36, 2.44);
  slide.addText("Un módulo puede tener 3, 4 o más pines.", { x: 1.08, y: 5.28, w: 2.62, h: 0.36, fontFace: TYPOGRAPHY.body, fontSize: 12, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("La etiqueta y el pinout mandan; el color del cable no.", { x: 1.08, y: 5.82, w: 2.62, h: 0.42, fontFace: TYPOGRAPHY.body, fontSize: 10.8, color: "D8E7F5", align: "center", margin: 0 });

  const pins = [
    { x: 4.4, label: "VCC", title: "ALIMENTACIÓN", body: "Entrega al componente el voltaje correcto.", check: "¿3,3 V o 5 V?", color: C.red, fill: "F8E7E8" },
    { x: 7.2, label: "GND", title: "REFERENCIA COMÚN", body: "Cierra el camino de retorno del circuito.", check: "¿Comparte tierra?", color: C.navy, fill: C.softBlue },
    { x: 10.0, label: "SIG", title: "SEÑAL", body: "Transporta una lectura o una orden.", check: "¿Entrada o salida?", color: C.cyan, fill: C.cyanSoft },
  ];
  pins.forEach((p) => {
    slide.addShape(SH.roundRect, { x: p.x, y: 2.24, w: 2.42, h: 3.88, rectRadius: 0.06, fill: { color: p.fill }, line: { color: p.color, pt: 1.25 } });
    slide.addShape(SH.ellipse, { x: p.x + 0.71, y: 2.55, w: 1.0, h: 1.0, fill: { color: p.color }, line: { color: p.color } });
    slide.addText(p.label, { x: p.x + 0.79, y: 2.86, w: 0.84, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.white, align: "center", margin: 0 });
    slide.addText(p.title, { x: p.x + 0.18, y: 3.82, w: 2.06, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 13.8, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addText(p.body, { x: p.x + 0.24, y: 4.34, w: 1.94, h: 0.6, fontFace: TYPOGRAPHY.body, fontSize: 10.8, color: C.ink, align: "center", margin: 0 });
    pill(slide, p.check, p.x + 0.32, 5.36, 1.78, { fill: C.white, line: p.color, color: p.color, fontSize: 8.8 });
  });
  slide.addText("Una conexión ordenada puede seguir siendo incorrecta. La función se verifica, no se adivina.", { x: 1.2, y: 6.72, w: 10.94, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 12.4, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Tomar un módulo de tres pines y pedir que identifiquen etiquetas impresas. No enseñar el orden de un modelo como regla universal: distintos módulos pueden ordenar sus pines de otra forma.");
}

// 25 · Banco de sensores
{
  const slide = pptx.addSlide();
  addHeader(slide, "Banco inicial", "Siete sensores: siete formas de observar", "El equipo elegirá según la variable de su problema, no según cuál componente se vea más llamativo.", 25);
  const row1 = [
    { title: "Distancia", body: "Nivel, cercanía o presencia", code: "HC-SR04", img: IMG.hcSr04, color: C.cyan, soft: C.cyanSoft },
    { title: "Aire", body: "Temperatura + humedad", code: "KY-015", img: IMG.ky015, color: C.red, soft: "F8E7E8" },
    { title: "Temperatura", body: "Cambio térmico puntual", code: "KY-001", img: IMG.ky001, color: C.gold, soft: "F8F0D8" },
    { title: "Luz", body: "Claridad u oscuridad", code: "KY-018", img: IMG.ky018, color: C.green, soft: C.greenSoft },
  ];
  row1.forEach((s, i) => addSensorTile(slide, { ...s, x: 0.72 + i * 3.08, y: 2.02, w: 2.7, h: 1.82 }));
  const row2 = [
    { title: "Tierra", body: "Humedad del suelo", code: "SOIL", img: IMG.soil, color: C.green, soft: C.greenSoft },
    { title: "Agua", body: "Nivel o presencia", code: "WATER", img: IMG.water, color: C.cyan, soft: C.cyanSoft },
    { title: "Apertura", body: "Imán: abierto o cerrado", code: "KY-021", img: IMG.ky021, color: C.red, soft: "F8E7E8" },
  ];
  row2.forEach((s, i) => addSensorTile(slide, { ...s, x: 1.3 + i * 3.74, y: 4.18, w: 3.32, h: 1.82 }));
  slide.addShape(SH.roundRect, { x: 2.0, y: 6.34, w: 9.34, h: 0.46, rectRadius: 0.04, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("Elección correcta = variable observable + rango útil + conexión segura.", { x: 2.28, y: 6.48, w: 8.78, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 11.4, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Mostrar el banco disponible como posibilidades, no como proyectos ya resueltos. Pedir dos ejemplos: un problema donde sirva el sensor de luz y otro donde no aportaría información útil.");
}

// 26 · Salidas y resistencia
{
  const slide = pptx.addSlide();
  addHeader(slide, "Responder al dato", "Una salida hace visible, audible o accionable la decisión", "El sensor observa. La salida comunica o provoca una acción que alguien puede reconocer.", 26);
  const outputs = [
    { x: 0.72, title: "LUZ BICOLOR", code: "KY-011", body: "Comunica estados mediante color.", img: IMG.ky011, color: C.cyan },
    { x: 4.32, title: "ZUMBADOR", code: "KY-012", body: "Produce una alerta sonora inmediata.", img: IMG.ky012, color: C.gold },
    { x: 7.92, title: "RELÉ", code: "KY-019", body: "Permite controlar otra carga de bajo voltaje.", img: IMG.ky019, color: C.red },
  ];
  outputs.forEach((o) => {
    slide.addShape(SH.roundRect, { x: o.x, y: 2.02, w: 3.18, h: 3.45, rectRadius: 0.06, fill: { color: C.white }, line: { color: o.color, pt: 1.25 } });
    addImageContain(slide, o.img, o.x + 0.34, 2.32, 2.5, 1.44);
    pill(slide, o.code, o.x + 0.3, 3.86, 0.82, { fill: o.color, line: o.color, color: o.color === C.gold || o.color === C.cyan ? C.navyDeep : C.white, fontSize: 8.8 });
    slide.addText(o.title, { x: o.x + 1.24, y: 3.9, w: 1.62, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 13.5, bold: true, color: C.navy, margin: 0 });
    slide.addText(o.body, { x: o.x + 0.3, y: 4.42, w: 2.58, h: 0.48, fontFace: TYPOGRAPHY.body, fontSize: 10.8, color: C.ink, align: "center", margin: 0 });
  });
  pill(slide, "SOLO BAJO VOLTAJE EN EL TALLER · NUNCA 220 V", 8.15, 5.1, 2.72, { fill: "F8E7E8", line: C.red, color: C.red, fontSize: 8.2 });

  slide.addShape(SH.roundRect, { x: 0.96, y: 5.86, w: 11.44, h: 0.86, rectRadius: 0.05, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("RESISTENCIA", { x: 1.28, y: 6.08, w: 1.54, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: C.gold, margin: 0 });
  slide.addText("Limita la corriente. En un LED externo protege al componente y al pin de la placa.", { x: 2.96, y: 6.07, w: 6.24, h: 0.26, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.white, margin: 0 });
  slide.addText("No es decoración", { x: 9.68, y: 6.07, w: 2.18, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.cyan, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Diferenciar sensor y salida. Advertir que el relé del taller solo se usa en demostraciones de bajo voltaje. Presentar la resistencia como protección; no entrar todavía en cálculos.");
}

// 27 · Tres preguntas antes de conectar
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.safety, 0, 0, 13.33, 7.5);
  // Velo intencional para transformar la ilustración en un fondo legible.
  slide.addShape(SH.rect, { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: C.navyDeep, transparency: 14 }, line: { color: C.navyDeep, transparency: 100 } });
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("ANTES DE INSERTAR UN CABLE", { x: 0.78, y: 0.52, w: 4.8, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.4, color: C.cyan, margin: 0 });
  slide.addText("Tres preguntas detienen los errores más peligrosos", { x: 0.78, y: 0.92, w: 10.6, h: 0.52, fontFace: TYPOGRAPHY.display, fontSize: 28, bold: true, color: C.white, margin: 0 });
  slide.addText("Si el equipo no puede responderlas, el USB permanece desconectado.", { x: 0.8, y: 1.56, w: 9.6, h: 0.32, fontFace: TYPOGRAPHY.body, fontSize: 13, bold: true, color: C.gold, margin: 0 });

  const qs = [
    { n: "01", title: "¿CON QUÉ VOLTAJE?", body: "Placa, sensor y señal deben ser compatibles.", color: C.red },
    { n: "02", title: "¿QUÉ SIGNIFICA CADA PIN?", body: "VCC, GND y señal tienen funciones distintas.", color: C.cyan },
    { n: "03", title: "¿QUÉ PRECAUCIÓN EXIGE?", body: "Resistencia, divisor, polaridad, librería o límite especial.", color: C.gold },
  ];
  qs.forEach((q, i) => {
    const x = 0.82 + i * 4.15;
    slide.addShape(SH.roundRect, { x, y: 2.48, w: 3.62, h: 2.68, rectRadius: 0.06, fill: { color: "0C2947", transparency: 5 }, line: { color: q.color, pt: 1.4 } });
    numberBadge(slide, q.n, x + 0.24, 2.78, q.color);
    slide.addText(q.title, { x: x + 0.24, y: 3.48, w: 3.08, h: 0.44, fontFace: TYPOGRAPHY.display, fontSize: 15.2, bold: true, color: C.white, margin: 0 });
    slide.addText(q.body, { x: x + 0.24, y: 4.16, w: 3.08, h: 0.64, fontFace: TYPOGRAPHY.body, fontSize: 11.2, color: "D8E7F5", margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 2.06, y: 5.7, w: 9.18, h: 0.62, rectRadius: 0.05, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("NO CONECTAR PARA 'VER QUÉ PASA'. PRIMERO EXPLICAR, DESPUÉS REVISAR.", { x: 2.36, y: 5.9, w: 8.58, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 11.4, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Detenerse en esta diapositiva. Pedir respuestas en voz alta y conectar con el caso HC-SR04. La regla no busca asustar: establece una forma confiable de trabajar.");
}

// 28 · Protocolo USB desconectado
{
  const slide = pptx.addSlide();
  addHeader(slide, "Protocolo de trabajo", "El circuito se arma y revisa con el USB desconectado", "El agente puede proponer; la documentación y una revisión humana deciden si se puede energizar.", 28);
  slide.addShape(SH.roundRect, { x: 0.72, y: 1.96, w: 5.66, h: 4.92, rectRadius: 0.06, fill: { color: C.darkPanel }, line: { color: C.navy, pt: 1.1 } });
  addImageCrop(slide, IMG.safety, 0.88, 2.12, 5.34, 4.58);
  pill(slide, "USB DESCONECTADO", 1.1, 6.14, 1.7, { fill: C.red, line: C.red, color: C.white, fontSize: 9.2 });

  const steps = [
    ["01", "IDENTIFICAR", "Componente exacto y texto impreso."],
    ["02", "COMPROBAR", "Voltaje, pinout y polaridad."],
    ["03", "DIAGRAMAR", "Cada cable tiene una razón."],
    ["04", "PREGUNTAR", "El agente explica cada conexión."],
    ["05", "REVISAR", "Persona verifica GND, alimentación y cortos."],
    ["06", "CONECTAR", "Prueba pequeña y observación atenta."],
  ];
  steps.forEach((s, i) => {
    const y = 2.02 + i * 0.73;
    const color = [C.red, C.cyan, C.gold, C.cyan, C.green, C.red][i];
    numberBadge(slide, s[0], 6.74, y, color);
    slide.addText(s[1], { x: 7.36, y: y - 0.01, w: 1.42, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 9.8, bold: true, color, margin: 0 });
    slide.addText(s[2], { x: 8.84, y: y - 0.02, w: 3.58, h: 0.36, fontFace: TYPOGRAPHY.body, fontSize: 10.7, color: C.ink, margin: 0 });
    if (i < steps.length - 1) slide.addShape(SH.line, { x: 7.04, y: y + 0.52, w: 5.22, h: 0, line: { color: C.border, pt: 0.8 } });
  });
  slide.addShape(SH.roundRect, { x: 6.72, y: 6.48, w: 5.74, h: 0.42, rectRadius: 0.04, fill: { color: C.cyanSoft }, line: { color: C.cyan } });
  slide.addText("La revisión humana ocurre antes de energizar, no después del error.", { x: 6.96, y: 6.6, w: 5.26, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 10.4, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Recorrer los seis pasos con el kit desconectado. El agente puede ayudar a identificar o explicar, pero no puede observar con certeza el componente real ni autorizar la conexión.");
}

// 29 · Señales de alarma y errores frecuentes
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("PROTOCOLO DE EMERGENCIA", { x: 0.72, y: 0.48, w: 4.2, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.4, color: C.red, margin: 0 });
  slide.addText("¿Calor, olor o reinicio? USB fuera.", { x: 0.72, y: 0.9, w: 10.1, h: 0.6, fontFace: TYPOGRAPHY.display, fontSize: 29, bold: true, color: C.white, margin: 0 });
  slide.addText("Desconectar primero evita que un síntoma pequeño se convierta en daño.", { x: 0.74, y: 1.56, w: 9.4, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 13.2, color: "D8E7F5", margin: 0 });

  slide.addShape(SH.roundRect, { x: 0.64, y: 2.04, w: 3.16, h: 3.42, rectRadius: 0.08, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("01", { x: 0.94, y: 2.32, w: 0.82, h: 0.48, fontFace: TYPOGRAPHY.display, fontSize: 28, bold: true, color: C.white, margin: 0 });
  slide.addShape(SH.line, { x: 1.86, y: 2.57, w: 1.44, h: 0, line: { color: C.white, pt: 1.5, transparency: 30 } });
  slide.addText("USB\nFUERA", { x: 0.94, y: 3.0, w: 2.52, h: 1.08, fontFace: TYPOGRAPHY.display, fontSize: 31, bold: true, color: C.white, breakLine: false, margin: 0, valign: "mid" });
  slide.addText("No prueben “una vez más”.\nNo toquen el circuito energizado.", { x: 0.96, y: 4.35, w: 2.44, h: 0.58, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.white, margin: 0 });
  pill(slide, "CORTAR ALIMENTACIÓN", 0.96, 5.02, 2.32, { fill: C.navyDeep, line: C.navyDeep, color: C.white, fontSize: 9.2 });

  slide.addText("SEÑALES QUE MANDAN DETENERSE", { x: 4.18, y: 2.04, w: 4.2, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 10.2, bold: true, charSpacing: 1.2, color: C.cyan, margin: 0 });
  const alarms = [
    ["CALOR", "posible corto o polaridad", C.red],
    ["OLOR", "corriente o componente incorrecto", C.gold],
    ["REINICIO", "alimentación inestable o corto", C.cyan],
    ["LECTURA RARA", "voltaje, pinout o diagrama sin revisar", C.green],
  ];
  alarms.forEach((a, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 4.16 + col * 4.24;
    const y = 2.48 + row * 1.28;
    slide.addShape(SH.roundRect, { x, y, w: 3.86, h: 1.02, rectRadius: 0.05, fill: { color: "12385E" }, line: { color: a[2], pt: 1.25 } });
    slide.addShape(SH.ellipse, { x: x + 0.22, y: y + 0.25, w: 0.46, h: 0.46, fill: { color: a[2] }, line: { color: a[2] } });
    slide.addText(String(i + 1).padStart(2, "0"), { x: x + 0.22, y: y + 0.39, w: 0.46, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 9.5, bold: true, color: i === 1 ? C.navyDeep : C.white, align: "center", margin: 0 });
    slide.addText(a[0], { x: x + 0.88, y: y + 0.2, w: 2.62, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: a[2], margin: 0 });
    slide.addText(a[1], { x: x + 0.88, y: y + 0.56, w: 2.68, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 10.4, color: C.white, margin: 0 });
  });

  slide.addText("REVISAR SIN ENERGÍA", { x: 4.18, y: 5.1, w: 2.7, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 9.6, bold: true, charSpacing: 1.1, color: C.gold, margin: 0 });
  const checks = ["5V ↔ GND", "RESISTENCIA", "POLARIDAD", "VOLTAJE", "PINOUT + IA"];
  checks.forEach((check, i) => {
    pill(slide, check, 4.16 + i * 1.66, 5.45, 1.48, { fill: i === 4 ? C.red : "12385E", line: i === 4 ? C.red : C.cyan, color: C.white, fontSize: 8.5 });
  });

  slide.addShape(SH.line, { x: 1.22, y: 6.42, w: 10.52, h: 0, line: { color: C.gold, pt: 2.6, endArrowType: "triangle" } });
  const recovery = [
    ["01", "CORTAR", C.red],
    ["02", "OBSERVAR", C.cyan],
    ["03", "HIPÓTESIS", C.gold],
    ["04", "CORREGIR", C.green],
  ];
  recovery.forEach((step, i) => {
    const x = 1.06 + i * 3.06;
    slide.addShape(SH.ellipse, { x, y: 6.02, w: 0.78, h: 0.78, fill: { color: C.navyDeep }, line: { color: step[2], pt: 2 } });
    slide.addText(step[0], { x, y: 6.26, w: 0.78, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 11.5, bold: true, color: C.white, align: "center", margin: 0 });
    slide.addText(step[1], { x: x + 0.96, y: 6.25, w: 1.72, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: step[2], margin: 0 });
  });
  slide.addText("La seguridad también es evidencia de buen diseño.", { x: 3.7, y: 7.02, w: 5.94, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 11.2, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Ensayar una respuesta automática: ante calor, olor, reinicio o comportamiento extraño, retirar USB. Solo después observar, formular una hipótesis y corregir sin energía. Recordar que un diagrama generado por IA se compara con el pinout y el componente real.");
}

// 30 · Actividad breve de inspección
{
  const slide = pptx.addSlide();
  addHeader(slide, "Misión de inspección", "Dos minutos para demostrar que el equipo sabe mirar", "Sin USB. Cada rol vuelve con una evidencia concreta.", 30);
  slide.addShape(SH.roundRect, { x: 0.56, y: 1.88, w: 2.44, h: 5.04, rectRadius: 0.06, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("02:00", { x: 0.78, y: 2.18, w: 2.0, h: 0.72, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.gold, align: "center", margin: 0 });
  slide.addText("MISIÓN", { x: 0.8, y: 3.1, w: 1.96, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11, bold: true, charSpacing: 1.8, color: C.cyan, align: "center", margin: 0 });
  ["MIRAR", "SEÑALAR", "EXPLICAR"].forEach((word, i) => {
    const y = 3.68 + i * 0.7;
    numberBadge(slide, String(i + 1).padStart(2, "0"), 0.86, y, i === 2 ? C.red : C.cyan);
    slide.addText(word, { x: 1.5, y: y + 0.11, w: 1.22, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 12.2, bold: true, color: C.white, margin: 0 });
  });
  pill(slide, "USB DESCONECTADO", 0.88, 6.32, 1.8, { fill: C.red, line: C.red, color: C.white, fontSize: 8.5 });

  slide.addShape(SH.roundRect, { x: 3.22, y: 1.88, w: 4.02, h: 5.04, rectRadius: 0.06, fill: { color: C.darkPanel }, line: { color: C.navy, pt: 1.1 } });
  addImageCrop(slide, IMG.inventoryKit, 3.38, 2.04, 3.7, 4.72);
  pill(slide, "KIT REAL", 3.6, 6.3, 1.1, { fill: C.navy, line: C.navy, color: C.white, fontSize: 8.8 });

  slide.addText("UNA EVIDENCIA POR ROL", { x: 7.58, y: 1.96, w: 3.4, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 10.4, bold: true, charSpacing: 1.25, color: C.red, margin: 0 });
  const evidence = [
    ["TECNOLOGÍA", "PLACA + PINES", C.cyan],
    ["DISEÑO", "PROTOBOARD", C.gold],
    ["INVESTIGACIÓN", "UN SENSOR", C.green],
    ["COMUNICACIÓN", "UNA SALIDA", C.red],
    ["PRUEBAS", "VCC, GND + RIESGO", C.cyan],
    ["COORDINACIÓN", "TIEMPO + VOCES", C.gold],
  ];
  evidence.forEach((e, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 7.56 + col * 2.58;
    const y = 2.42 + row * 1.14;
    slide.addShape(SH.roundRect, { x, y, w: 2.34, h: 0.92, rectRadius: 0.05, fill: { color: C.white }, line: { color: e[2], pt: 1.2 } });
    slide.addShape(SH.rect, { x, y, w: 0.12, h: 0.92, fill: { color: e[2] }, line: { color: e[2] } });
    slide.addText(e[0], { x: x + 0.26, y: y + 0.15, w: 1.88, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.8, bold: true, color: C.slate, margin: 0 });
    slide.addText(e[1], { x: x + 0.26, y: y + 0.48, w: 1.88, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 11.1, bold: true, color: C.navy, margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 7.56, y: 6.02, w: 4.92, h: 0.72, rectRadius: 0.04, fill: { color: C.cyanSoft }, line: { color: C.cyan } });
  slide.addText("EVIDENCIA FINAL · una explicación clara de 20 segundos", { x: 7.82, y: 6.25, w: 4.4, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 11.2, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Entregar el kit desconectado. Cronometrar dos minutos. Pedir a uno o dos equipos que muestren un sensor, nombren VCC/GND si están rotulados y mencionen una precaución. No armar todavía.");
}

// 31 · Cierre Bloque 2
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("CIERRE DEL BLOQUE 2", { x: 0.78, y: 0.5, w: 4.2, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.4, color: C.cyan, margin: 0 });
  slide.addText("Antes del USB, cuatro respuestas.", { x: 0.78, y: 0.9, w: 9.8, h: 0.62, fontFace: TYPOGRAPHY.display, fontSize: 30, bold: true, color: C.white, margin: 0 });
  slide.addText("Si el equipo puede explicarlas, ya no está conectando al azar.", { x: 0.8, y: 1.58, w: 8.8, h: 0.32, fontFace: TYPOGRAPHY.body, fontSize: 13.2, color: "D8E7F5", margin: 0 });
  const exit = [
    { x: 1.18, n: "01", title: "ENTRADA", question: "¿Qué observa?", color: C.cyan },
    { x: 4.18, n: "02", title: "PLACA", question: "¿Qué interpreta?", color: C.gold },
    { x: 7.18, n: "03", title: "SALIDA", question: "¿Qué comunica?", color: C.red },
    { x: 10.18, n: "04", title: "SEGURIDAD", question: "¿Qué revisamos?", color: C.green },
  ];
  slide.addShape(SH.line, { x: 1.5, y: 3.35, w: 10.34, h: 0, line: { color: C.gold, pt: 3, endArrowType: "triangle" } });
  exit.forEach((e, i) => {
    slide.addShape(SH.ellipse, { x: e.x, y: 2.76, w: 1.18, h: 1.18, fill: { color: C.navyDeep }, line: { color: e.color, pt: 2.6 } });
    slide.addText(e.n, { x: e.x, y: 2.76, w: 1.18, h: 1.18, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
    slide.addText(e.title, { x: e.x - 0.48, y: i % 2 === 0 ? 2.2 : 4.18, w: 2.14, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 15.4, bold: true, color: e.color, align: "center", margin: 0 });
    slide.addText(e.question, { x: e.x - 0.58, y: i % 2 === 0 ? 4.16 : 2.22, w: 2.34, h: 0.36, fontFace: TYPOGRAPHY.body, fontSize: 11.3, bold: true, color: C.white, align: "center", margin: 0 });
  });
  slide.addText("COMPRENDER", { x: 1.14, y: 5.08, w: 3.1, h: 0.46, fontFace: TYPOGRAPHY.display, fontSize: 23, bold: true, color: C.cyan, align: "center", margin: 0 });
  slide.addShape(SH.chevron, { x: 4.42, y: 5.12, w: 0.44, h: 0.38, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("EXPLICAR", { x: 5.02, y: 5.08, w: 3.1, h: 0.46, fontFace: TYPOGRAPHY.display, fontSize: 23, bold: true, color: C.gold, align: "center", margin: 0 });
  slide.addShape(SH.chevron, { x: 8.28, y: 5.12, w: 0.44, h: 0.38, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("PROBAR", { x: 8.92, y: 5.08, w: 3.1, h: 0.46, fontFace: TYPOGRAPHY.display, fontSize: 23, bold: true, color: C.red, align: "center", margin: 0 });
  slide.addShape(SH.roundRect, { x: 1.18, y: 5.92, w: 10.98, h: 0.72, rectRadius: 0.05, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("SIGUIENTE · ELEGIR UN SENSOR Y ESCRIBIR QUÉ QUEREMOS QUE HAGA", { x: 1.54, y: 6.16, w: 10.26, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 12, bold: true, color: C.navyDeep, align: "center", margin: 0 });
  slide.addText("Un prototipo seguro no comienza con un cable: comienza con una explicación.", { x: 1.46, y: 6.9, w: 10.42, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.6, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Cerrar con una comprobación oral usando una pieza real. El equipo debe nombrar entrada, procesamiento, salida y una revisión de seguridad. El puente abre el Bloque 3 sin comenzar todavía el montaje.");
}

// 32 · Apertura Bloque 3
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addImageContain(slide, IMG.agenticBlock3, 6.72, 0, 6.61, 7.5);
  // Velo intencional: integra la ilustración con el fondo y protege la lectura del título.
  slide.addShape(SH.rect, { x: 6.62, y: 0, w: 6.71, h: 7.5, fill: { color: C.navyDeep, transparency: 34 }, line: { color: C.navyDeep, transparency: 100 } });
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  pill(slide, "BLOQUE 3 · 35 MIN", 0.76, 0.78, 1.56, { fill: C.red, line: C.red, color: C.white, fontSize: 9.2 });
  slide.addText("De la idea a la\nprimera evidencia", { x: 0.76, y: 1.5, w: 5.7, h: 1.48, fontFace: TYPOGRAPHY.display, fontSize: 31, bold: true, color: C.white, margin: 0 });
  slide.addText("Elegir · especificar · preguntar · probar · registrar", { x: 0.8, y: 3.2, w: 5.4, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 14, bold: true, color: C.cyan, margin: 0 });
  slide.addText("La meta no es terminar el producto. Es demostrar que la idea puede comenzar a funcionar.", { x: 0.8, y: 3.84, w: 5.3, h: 0.82, fontFace: TYPOGRAPHY.body, fontSize: 15, color: C.white, margin: 0 });
  const openingSteps = [["01", "VARIABLE"], ["02", "SENSOR"], ["03", "PRUEBA"], ["04", "EVIDENCIA"]];
  openingSteps.forEach((s, i) => {
    const x = 0.82 + i * 1.42;
    slide.addShape(SH.ellipse, { x, y: 5.16, w: 0.62, h: 0.62, fill: { color: i === 3 ? C.red : C.navy }, line: { color: i === 3 ? C.red : C.cyan, pt: 1.5 } });
    slide.addText(s[0], { x, y: 5.16, w: 0.62, h: 0.62, fontFace: TYPOGRAPHY.display, fontSize: 10.5, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
    slide.addText(s[1], { x: x - 0.26, y: 5.98, w: 1.14, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.8, bold: true, color: i === 3 ? C.red : C.white, align: "center", margin: 0 });
  });
  slide.addText("Meta del bloque: salir con un punto de partida que el equipo pueda continuar desarrollando.", { x: 0.82, y: 6.72, w: 5.6, h: 0.26, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.gold, margin: 0 });
  addNotesAndValidate(slide, "Presentar este bloque como el paso desde comprender componentes hacia tomar decisiones propias. Aclarar que una primera evidencia puede ser una especificación revisada, una simulación, una lectura o una prueba física pequeña.");
}

// 33 · La misión del bloque
{
  const slide = pptx.addSlide();
  addHeader(slide, "Misión del bloque", "Un sensor. Un cambio. Una evidencia.", "Hoy no terminan el producto: demuestran que una parte de la idea puede funcionar.", 33);
  slide.addShape(SH.roundRect, { x: 0.58, y: 1.92, w: 6.18, h: 4.98, rectRadius: 0.07, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("1", { x: 0.88, y: 2.22, w: 0.72, h: 0.64, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.red, margin: 0 });
  slide.addText("SENSOR REAL", { x: 1.72, y: 2.42, w: 2.5, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.white, margin: 0 });
  addImageContain(slide, IMG.r4, 0.86, 2.98, 3.42, 2.24);
  addImageContain(slide, IMG.hcSr04, 4.18, 3.26, 1.82, 1.4);
  slide.addShape(SH.chevron, { x: 3.88, y: 3.74, w: 0.34, h: 0.46, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("placa", { x: 1.7, y: 5.28, w: 1.3, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, color: C.cyan, align: "center", margin: 0 });
  slide.addText("sensor", { x: 4.42, y: 4.78, w: 1.3, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, color: C.gold, align: "center", margin: 0 });
  slide.addShape(SH.roundRect, { x: 0.92, y: 5.78, w: 5.46, h: 0.64, rectRadius: 0.04, fill: { color: "12385E" }, line: { color: C.cyan, pt: 1 } });
  slide.addText("Leer una señal que cambie de forma coherente", { x: 1.22, y: 5.99, w: 4.86, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 13.8, bold: true, color: C.white, align: "center", margin: 0 });

  slide.addText("SALIDA DEL BLOQUE", { x: 7.18, y: 2.04, w: 2.84, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.2, color: C.red, margin: 0 });
  const outputs = [
    ["01", "VARIABLE", "qué observar", C.cyan],
    ["02", "SENSOR", "por qué sirve", C.gold],
    ["03", "REGLA", "cuando → entonces", C.red],
    ["04", "PRUEBA", "qué demostrar", C.green],
  ];
  outputs.forEach((o, i) => {
    const y = 2.48 + i * 0.92;
    slide.addShape(SH.line, { x: 7.38, y: y + 0.32, w: 4.68, h: 0, line: { color: o[3], pt: 2.2 } });
    slide.addShape(SH.ellipse, { x: 7.14, y, w: 0.64, h: 0.64, fill: { color: C.white }, line: { color: o[3], pt: 1.8 } });
    slide.addText(o[0], { x: 7.14, y, w: 0.64, h: 0.64, fontFace: TYPOGRAPHY.display, fontSize: 10, bold: true, color: o[3], align: "center", valign: "mid", margin: 0 });
    slide.addText(o[1], { x: 8.08, y: y + 0.06, w: 1.72, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: C.navy, margin: 0 });
    slide.addText(o[2], { x: 10.0, y: y + 0.07, w: 2.16, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10.8, color: C.ink, margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 7.18, y: 6.22, w: 5.16, h: 0.48, rectRadius: 0.04, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("NO UN PRODUCTO COMPLETO", { x: 7.48, y: 6.37, w: 4.56, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 10.8, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Acordar el criterio de éxito antes de comenzar la actividad. La salida mínima es variable, sensor, regla y prueba; si además logran una lectura o respuesta, esa evidencia amplía el avance.");
}

// 34 · Del problema a la variable
{
  const slide = pptx.addSlide();
  addHeader(slide, "Primera decisión", "El problema no se conecta: primero hay que volverlo observable", "Pregunten qué cambio del mundo físico permitiría comprender o mejorar la situación.", 34);
  const rows = [
    ["CONTENEDOR SIN AVISO", "¿Qué cambia cuando se llena?", "DISTANCIA", C.cyan],
    ["RIEGO SIN INFORMACIÓN", "¿Qué diferencia tierra seca y húmeda?", "HUMEDAD", C.green],
    ["LUZ ENCENDIDA DE DÍA", "¿Cuánta luz existe en el lugar?", "NIVEL DE LUZ", C.gold],
  ];
  slide.addText("PROBLEMA", { x: 0.86, y: 2.04, w: 2.8, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.1, color: C.red, align: "center", margin: 0 });
  slide.addText("PREGUNTA OBSERVABLE", { x: 4.26, y: 2.04, w: 4.7, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.1, color: C.navy, align: "center", margin: 0 });
  slide.addText("VARIABLE", { x: 9.66, y: 2.04, w: 2.76, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.1, color: C.green, align: "center", margin: 0 });
  rows.forEach((r, i) => {
    const y = 2.5 + i * 1.2;
    slide.addShape(SH.roundRect, { x: 0.72, y, w: 3.14, h: 0.84, rectRadius: 0.05, fill: { color: "F8E7E8" }, line: { color: C.red, pt: 1 } });
    slide.addText(r[0], { x: 0.94, y: y + 0.28, w: 2.7, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 12.7, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addShape(SH.chevron, { x: 3.98, y: y + 0.26, w: 0.28, h: 0.32, fill: { color: C.gold }, line: { color: C.gold } });
    slide.addShape(SH.roundRect, { x: 4.38, y, w: 4.52, h: 0.84, rectRadius: 0.05, fill: { color: C.white }, line: { color: C.border, pt: 1 } });
    slide.addText(r[1], { x: 4.64, y: y + 0.23, w: 4.0, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 12, bold: true, color: C.ink, align: "center", margin: 0 });
    slide.addShape(SH.chevron, { x: 9.04, y: y + 0.26, w: 0.28, h: 0.32, fill: { color: C.gold }, line: { color: C.gold } });
    slide.addShape(SH.roundRect, { x: 9.48, y, w: 3.12, h: 0.84, rectRadius: 0.05, fill: { color: i === 1 ? C.greenSoft : i === 2 ? "F8F0D8" : C.cyanSoft }, line: { color: r[3], pt: 1.2 } });
    slide.addText(r[2], { x: 9.74, y: y + 0.28, w: 2.6, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 13.6, bold: true, color: r[3], align: "center", margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 1.2, y: 6.16, w: 10.94, h: 0.64, rectRadius: 0.04, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("Pregunta del equipo: ¿qué tendría que observar nuestro sistema para ayudar con este problema?", { x: 1.52, y: 6.37, w: 10.3, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 12.8, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Pedir un ejemplo nuevo al curso antes de mostrar la respuesta. Corregir ideas que nombran directamente un componente sin identificar primero la variable observable.");
}

// 35 · Elegir sensor por variable
{
  const slide = pptx.addSlide();
  addHeader(slide, "Elegir con criterio", "El sensor correcto es el que puede observar la variable", "No elijan por apariencia ni por cantidad de pines: el problema define qué necesitan medir.", 35);
  const sensors = [
    { title: "DISTANCIA", body: "¿cambia al acercar un objeto?", code: "HC-SR04", img: IMG.hcSr04, color: C.cyan },
    { title: "AIRE", body: "¿cambian temperatura y humedad?", code: "KY-015", img: IMG.ky015, color: C.red },
    { title: "TEMPERATURA", body: "¿distingue frío y calor?", code: "KY-001", img: IMG.ky001, color: C.gold },
    { title: "LUZ", body: "¿cambia al cubrirlo?", code: "KY-018", img: IMG.ky018, color: C.green },
    { title: "TIERRA", body: "¿distingue seco y húmedo?", code: "SOIL", img: IMG.soil, color: C.green },
    { title: "AGUA", body: "¿detecta nivel o presencia?", code: "WATER", img: IMG.water, color: C.cyan },
    { title: "APERTURA", body: "¿detecta el imán?", code: "KY-021", img: IMG.ky021, color: C.red },
  ];
  sensors.forEach((s, i) => {
    const top = i < 4;
    const col = top ? i : i - 4;
    const x = top ? 0.58 + col * 3.14 : 2.14 + col * 3.14;
    const y = top ? 2.02 : 4.22;
    addSensorTile(slide, { x, y, w: 2.78, h: 1.82, title: s.title, body: s.body, code: s.code, img: s.img, color: s.color, soft: i % 2 ? "F8F0D8" : C.softBlue, titleSize: 11.4 });
  });
  slide.addText("Elección defendible = variable correcta + rango útil + conexión segura", { x: 2.0, y: 6.46, w: 9.3, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Usar las preguntas de cada tarjeta como prueba de pertinencia. Si los siete sensores no observan la variable necesaria, el equipo puede explorar otro módulo, pero debe justificar y revisar su elección.");
}

// 36 · Tres rutas de entrada
{
  const slide = pptx.addSlide();
  addHeader(slide, "Tres formas de comenzar", "El banco de ideas desbloquea; no decide por el equipo", "La propuesta sigue siendo propia cuando el equipo modifica, justifica y prueba sus decisiones.", 36);
  // Escalera visual intencional: las tres rutas avanzan hacia la derecha sin superponerse.
  const routes = [
    { x: 0.72, y: 2.08, w: 3.82, h: 3.86, n: "01", title: "IDEA PROPIA", body: "Parten del problema trabajado y eligen una variable que realmente puedan observar.", action: "JUSTIFICAR EL SENSOR", color: C.cyan, fill: C.navyDeep, dark: true },
    { x: 4.76, y: 2.7, w: 3.64, h: 3.62, n: "02", title: "IDEA ADAPTADA", body: "Toman una semilla y cambian contexto, condición, respuesta o proyección.", action: "HACERLA SUYA", color: C.gold, fill: C.white, dark: false },
    { x: 8.62, y: 3.3, w: 3.96, h: 3.38, n: "03", title: "EXPLORACIÓN", body: "Usan otro sensor del kit cuando los siete principales no observan la variable necesaria.", action: "REVISAR ANTES DE CONECTAR", color: C.red, fill: "F8E7E8", dark: false },
  ];
  routes.forEach((r) => {
    slide.addShape(SH.roundRect, { x: r.x, y: r.y, w: r.w, h: r.h, rectRadius: 0.06, fill: { color: r.fill }, line: { color: r.color, pt: 1.25 } });
    numberBadge(slide, r.n, r.x + 0.28, r.y + 0.3, r.color);
    slide.addText(r.title, { x: r.x + 1.0, y: r.y + 0.34, w: r.w - 1.3, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: r.dark ? C.white : C.navy, margin: 0 });
    slide.addText(r.body, { x: r.x + 0.34, y: r.y + 1.22, w: r.w - 0.68, h: 1.08, fontFace: TYPOGRAPHY.body, fontSize: 12.2, color: r.dark ? C.white : C.ink, margin: 0, valign: "mid" });
    pill(slide, r.action, r.x + 0.34, r.y + r.h - 0.72, r.w - 0.68, { fill: r.color, line: r.color, color: r.color === C.gold ? C.navyDeep : C.white, fontSize: 8.7 });
  });
  addNotesAndValidate(slide, "Presentar las tres rutas con el mismo valor. Evitar que la idea adaptada se convierta en copia: el equipo debe poder explicar qué cambió y por qué.");
}

// 37 · Especificación inicial
{
  const slide = pptx.addSlide();
  addHeader(slide, "Antes del prompt", "La especificación es el contrato del equipo", "Define la intención con suficiente claridad para que el agente ayude sin inventar el objetivo.", 37);
  slide.addShape(SH.roundRect, { x: 0.64, y: 1.92, w: 12.06, h: 4.96, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.navy, pt: 1.2 } });
  slide.addShape(SH.rect, { x: 0.64, y: 1.92, w: 12.06, h: 0.52, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("FICHA DE ESPECIFICACIÓN INICIAL", { x: 0.98, y: 2.09, w: 5.4, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: C.white, margin: 0 });
  pill(slide, "NO ES EL PRODUCTO FINAL", 10.0, 2.07, 2.22, { fill: C.red, line: C.red, color: C.white, fontSize: 8.4 });
  const fields = [
    ["NOMBRE PROVISIONAL", "____________________________"],
    ["PROBLEMA + PERSONAS", "____________________________"],
    ["VARIABLE OBSERVABLE", "____________________________"],
    ["SENSOR EXACTO", "____________________________"],
    ["PLACA DISPONIBLE", "____________________________"],
    ["CUANDO DETECTE…", "____________________________"],
    ["ENTONCES DEBE…", "____________________________"],
    ["PRIMERA PRUEBA", "____________________________"],
    ["EVIDENCIA ESPERADA", "____________________________"],
    ["RIESGO O RESTRICCIÓN", "____________________________"],
  ];
  fields.forEach((f, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.98 + col * 5.98;
    const y = 2.74 + row * 0.72;
    slide.addText(f[0], { x, y, w: 2.12, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 8.8, bold: true, color: i >= 7 ? C.red : C.slate, margin: 0 });
    slide.addText(f[1], { x: x + 2.2, y: y - 0.02, w: 3.24, h: 0.18, fontFace: TYPOGRAPHY.mono, fontSize: 10.4, color: C.navy, margin: 0 });
    slide.addShape(SH.line, { x: x + 2.2, y: y + 0.32, w: 3.2, h: 0, line: { color: C.border, pt: 1 } });
  });
  slide.addText("Una especificación útil permite hacer preguntas mejores y detectar supuestos antes de conectar.", { x: 2.0, y: 6.52, w: 9.3, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 12, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "No exigir redacción perfecta. La ficha debe ser breve, concreta y revisable. Destacar primera prueba, evidencia esperada y riesgo porque convierten una idea general en trabajo técnico.");
}

// 38 · Especificación GeoGreen completa
{
  const slide = pptx.addSlide();
  addHeader(slide, "Ejemplo completo", "GeoGreen también puede expresarse como una especificación", "La claridad del objetivo permite que herramientas y personas trabajen sobre la misma intención.", 38);
  slide.addShape(SH.roundRect, { x: 0.62, y: 1.98, w: 3.18, h: 4.82, rectRadius: 0.06, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("PROBLEMA", { x: 0.94, y: 2.34, w: 1.6, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.2, color: C.red, margin: 0 });
  slide.addText("El contenedor se llena sin aviso.", { x: 0.94, y: 2.82, w: 2.48, h: 0.86, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.white, margin: 0 });
  slide.addText("VARIABLE", { x: 0.94, y: 4.02, w: 1.6, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.2, color: C.cyan, margin: 0 });
  slide.addText("Distancia hasta los residuos", { x: 0.94, y: 4.46, w: 2.48, h: 0.58, fontFace: TYPOGRAPHY.display, fontSize: 16.5, bold: true, color: C.cyan, margin: 0 });
  addImageContain(slide, IMG.r4, 0.84, 5.32, 1.44, 1.02);
  slide.addShape(SH.chevron, { x: 2.14, y: 5.68, w: 0.26, h: 0.34, fill: { color: C.gold }, line: { color: C.gold } });
  addImageContain(slide, IMG.hcSr04, 2.42, 5.46, 1.02, 0.72);
  slide.addText("UNO R4 + HC-SR04", { x: 0.94, y: 6.4, w: 2.36, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: C.gold, align: "center", margin: 0 });

  const facts = [
    ["ENTRADA", "La distancia disminuye cuando el contenido sube.", C.cyan],
    ["REGLA", "Cuando el llenado alcanza 80 % o más…", C.gold],
    ["SALIDA", "…enciende rojo y activa el buzzer.", C.red],
  ];
  facts.forEach((f, i) => {
    const y = 2.06 + i * 1.42;
    slide.addShape(SH.roundRect, { x: 4.16, y, w: 4.04, h: 1.12, rectRadius: 0.05, fill: { color: C.white }, line: { color: f[2], pt: 1.2 } });
    slide.addShape(SH.rect, { x: 4.16, y, w: 0.12, h: 1.12, fill: { color: f[2] }, line: { color: f[2] } });
    slide.addText(f[0], { x: 4.52, y: y + 0.18, w: 1.1, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 9.4, bold: true, color: f[2], margin: 0 });
    slide.addText(f[1], { x: 5.7, y: y + 0.17, w: 2.16, h: 0.58, fontFace: TYPOGRAPHY.body, fontSize: 11.4, bold: true, color: C.ink, margin: 0, valign: "mid" });
  });

  slide.addShape(SH.roundRect, { x: 8.56, y: 2.06, w: 4.06, h: 4.58, rectRadius: 0.06, fill: { color: "F8F0D8" }, line: { color: C.gold, pt: 1.2 } });
  slide.addText("PRIMERA PRUEBA", { x: 8.9, y: 2.38, w: 2.2, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.navy, margin: 0 });
  slide.addText("Mover un objeto frente al sensor y comprobar que la distancia cambia.", { x: 8.9, y: 2.94, w: 3.36, h: 0.82, fontFace: TYPOGRAPHY.body, fontSize: 13.2, bold: true, color: C.ink, margin: 0 });
  slide.addText("EVIDENCIA", { x: 8.9, y: 4.08, w: 1.6, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 9.4, bold: true, color: C.green, margin: 0 });
  slide.addText("Valores distintos y coherentes en el monitor serie.", { x: 8.9, y: 4.44, w: 3.3, h: 0.54, fontFace: TYPOGRAPHY.body, fontSize: 12.2, color: C.ink, margin: 0 });
  slide.addText("REVISAR", { x: 8.9, y: 5.34, w: 1.6, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 9.4, bold: true, color: C.red, margin: 0 });
  slide.addText("Voltaje · pinout · TRIG/ECHO · alimentación", { x: 8.9, y: 5.7, w: 3.28, h: 0.46, fontFace: TYPOGRAPHY.body, fontSize: 11.2, bold: true, color: C.red, margin: 0 });
  addNotesAndValidate(slide, "Usar GeoGreen como ejemplo de especificación, no como respuesta obligatoria. Mostrar que el prototipo completo se descompone en una primera prueba mucho más pequeña: comprobar una lectura de distancia.");
}

// 39 · Roles en acción
{
  const slide = pptx.addSlide();
  addHeader(slide, "Trabajo colaborativo", "Cada rol debe dejar una evidencia, no solo ocupar un nombre", "Las responsabilidades se coordinan; la explicación final pertenece a todo el equipo.", 39);
  const roles = [
    ["TECNOLOGÍA", "modelo de placa + pines", C.cyan],
    ["INVESTIGACIÓN", "sensor + documentación", C.green],
    ["PRUEBAS", "criterio + registro", C.red],
    ["DISEÑO", "diagrama comprensible", C.gold],
    ["COMUNICACIÓN", "explicación de 20 segundos", C.cyan],
    ["COORDINACIÓN", "tiempo + decisiones", C.red],
  ];
  roles.forEach((r, i) => {
    const top = i < 3;
    const col = top ? i : i - 3;
    const x = 0.72 + col * 4.16;
    const y = top ? 2.04 : 4.82;
    slide.addShape(SH.roundRect, { x, y, w: 3.72, h: 1.42, rectRadius: 0.05, fill: { color: top ? C.white : C.softBlue }, line: { color: r[2], pt: 1.2 } });
    numberBadge(slide, String(i + 1).padStart(2, "0"), x + 0.22, y + 0.28, r[2]);
    slide.addText(r[0], { x: x + 0.94, y: y + 0.25, w: 2.46, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 13.4, bold: true, color: C.navy, margin: 0 });
    slide.addText(r[1], { x: x + 0.94, y: y + 0.72, w: 2.46, h: 0.32, fontFace: TYPOGRAPHY.body, fontSize: 10.6, color: C.ink, margin: 0 });
  });
  slide.addShape(SH.ellipse, { x: 5.82, y: 3.64, w: 1.7, h: 0.86, fill: { color: C.navyDeep }, line: { color: C.gold, pt: 2 } });
  // Texto centrado dentro del nodo central.
  slide.addText("SPEC + PRUEBA", { x: 5.82, y: 3.64, w: 1.7, h: 0.86, fontFace: TYPOGRAPHY.display, fontSize: 10.8, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
  slide.addText("Si una sola persona entiende la propuesta, el equipo todavía no está listo.", { x: 2.06, y: 6.62, w: 9.2, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 12.2, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Retomar la infografía de roles sin volver a explicarla completa. Pedir que cada responsable identifique qué evidencia concreta debe aportar durante la actividad.");
}

// 40 · Flujo agéntico
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("DESARROLLO AGÉNTICO SUPERVISADO", { x: 0.74, y: 0.5, w: 5.5, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.35, color: C.cyan, margin: 0 });
  slide.addText("El agente acelera el recorrido; la evidencia decide", { x: 0.74, y: 0.94, w: 10.2, h: 0.56, fontFace: TYPOGRAPHY.display, fontSize: 28, bold: true, color: C.white, margin: 0 });
  slide.addText("No es una conversación mágica. Es un proceso de trabajo con contexto, tareas pequeñas y verificación.", { x: 0.76, y: 1.56, w: 9.4, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 13, color: "D8E7F5", margin: 0 });
  const flow = [
    ["01", "INTENCIÓN", "qué queremos lograr", C.red],
    ["02", "CONTEXTO", "problema, sensor, placa", C.cyan],
    ["03", "PREGUNTAS", "qué falta saber", C.gold],
    ["04", "PLAN", "orden y límites", C.green],
    ["05", "TAREA", "una acción pequeña", C.cyan],
    ["06", "PRUEBA", "observar el resultado", C.red],
    ["07", "EVIDENCIA", "decidir el siguiente paso", C.gold],
  ];
  slide.addShape(SH.line, { x: 1.02, y: 3.52, w: 11.1, h: 0, line: { color: C.gold, pt: 3, endArrowType: "triangle" } });
  // Los números se centran intencionalmente dentro de cada nodo del flujo.
  flow.forEach((f, i) => {
    const x = 0.66 + i * 1.78;
    slide.addShape(SH.ellipse, { x, y: 3.02, w: 1.02, h: 1.02, fill: { color: C.navyDeep }, line: { color: f[3], pt: 2.1 } });
    slide.addText(f[0], { x, y: 3.02, w: 1.02, h: 1.02, fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
    slide.addText(f[1], { x: x - 0.24, y: i % 2 === 0 ? 2.42 : 4.3, w: 1.5, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 11.1, bold: true, color: f[3], align: "center", margin: 0 });
    slide.addText(f[2], { x: x - 0.3, y: i % 2 === 0 ? 4.34 : 2.3, w: 1.62, h: 0.42, fontFace: TYPOGRAPHY.body, fontSize: 8.9, color: C.white, align: "center", margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 1.16, y: 5.54, w: 11.0, h: 0.7, rectRadius: 0.04, fill: { color: "12385E" }, line: { color: C.cyan, pt: 1.1 } });
  slide.addText("El código aparece después de entender el caso y acordar la primera prueba.", { x: 1.48, y: 5.78, w: 10.36, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 13.2, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("Entender primero · apoyo inteligente · verificar después", { x: 2.7, y: 6.72, w: 7.9, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: C.gold, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Presentar este recorrido como la metodología transferida desde GeoGreen. Detenerse en tarea pequeña y evidencia: son los puntos que evitan pedir un proyecto completo y aceptar una respuesta sin verificar.");
}

// 41 · Petición débil versus contexto útil
{
  const slide = pptx.addSlide();
  addHeader(slide, "La calidad de la ayuda depende del contexto", "Una petición corta puede producir una respuesta convincente… y equivocada", "El equipo debe entregar intención, componentes exactos, condición esperada y restricciones.", 41);
  slide.addShape(SH.roundRect, { x: 0.64, y: 2.02, w: 3.64, h: 4.62, rectRadius: 0.06, fill: { color: "F8E7E8" }, line: { color: C.red, pt: 1.2 } });
  slide.addText("PETICIÓN DÉBIL", { x: 0.96, y: 2.34, w: 2.46, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.red, margin: 0 });
  slide.addShape(SH.roundRect, { x: 0.96, y: 3.02, w: 2.98, h: 1.14, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.border } });
  slide.addText("“Hazme un sistema con Arduino y un sensor.”", { x: 1.22, y: 3.34, w: 2.46, h: 0.48, fontFace: TYPOGRAPHY.body, fontSize: 13.2, bold: true, color: C.ink, margin: 0 });
  const weak = ["No define el problema", "No identifica la placa", "No fija una prueba", "No declara riesgos"];
  weak.forEach((t, i) => {
    slide.addShape(SH.ellipse, { x: 1.04, y: 4.58 + i * 0.42, w: 0.16, h: 0.16, fill: { color: C.red }, line: { color: C.red } });
    slide.addText(t, { x: 1.36, y: 4.53 + i * 0.42, w: 2.36, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10.6, color: C.ink, margin: 0 });
  });

  slide.addShape(SH.roundRect, { x: 4.62, y: 2.02, w: 8.04, h: 4.62, rectRadius: 0.06, fill: { color: C.navyDeep }, line: { color: C.cyan, pt: 1.2 } });
  slide.addText("CONTEXTO ÚTIL", { x: 4.96, y: 2.3, w: 2.46, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.cyan, margin: 0 });
  pill(slide, "PROBLEMA", 4.96, 2.8, 1.02, { fill: C.red, line: C.red, color: C.white, fontSize: 8.2 });
  slide.addText("Detectar cuándo una tapa queda abierta", { x: 6.2, y: 2.78, w: 5.74, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 15.2, bold: true, color: C.white, margin: 0 });

  slide.addShape(SH.roundRect, { x: 4.96, y: 3.32, w: 3.1, h: 1.34, rectRadius: 0.05, fill: { color: C.white, transparency: 3 }, line: { color: C.cyan, pt: 1 } });
  addImageContain(slide, IMG.ky021, 5.18, 3.48, 1.42, 0.88);
  slide.addText("KY-021", { x: 6.58, y: 3.72, w: 1.16, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: C.navy, align: "center", margin: 0 });
  slide.addShape(SH.chevron, { x: 8.26, y: 3.72, w: 0.54, h: 0.5, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addShape(SH.roundRect, { x: 9.02, y: 3.32, w: 3.22, h: 1.34, rectRadius: 0.05, fill: { color: C.white, transparency: 3 }, line: { color: C.cyan, pt: 1 } });
  addImageContain(slide, IMG.r4, 9.18, 3.46, 1.62, 0.92);
  slide.addText("UNO R4 WIFI", { x: 10.76, y: 3.66, w: 1.24, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 11.8, bold: true, color: C.navy, align: "center", margin: 0 });

  slide.addShape(SH.roundRect, { x: 4.96, y: 4.94, w: 3.34, h: 0.82, rectRadius: 0.04, fill: { color: "12385E" }, line: { color: C.gold, pt: 1 } });
  slide.addText("REGLA", { x: 5.2, y: 5.12, w: 0.72, h: 0.18, fontFace: TYPOGRAPHY.mono, fontSize: 9, bold: true, color: C.gold, margin: 0 });
  slide.addText("sin imán → alerta", { x: 5.2, y: 5.4, w: 2.76, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.white, margin: 0 });
  slide.addShape(SH.roundRect, { x: 8.52, y: 4.94, w: 3.72, h: 0.82, rectRadius: 0.04, fill: { color: "12385E" }, line: { color: C.cyan, pt: 1 } });
  slide.addText("PRIMERA PRUEBA", { x: 8.76, y: 5.12, w: 1.48, h: 0.18, fontFace: TYPOGRAPHY.mono, fontSize: 9, bold: true, color: C.cyan, margin: 0 });
  slide.addText("acercar / alejar → observar", { x: 8.76, y: 5.4, w: 3.08, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 11.2, bold: true, color: C.white, margin: 0 });
  slide.addShape(SH.roundRect, { x: 4.96, y: 6.0, w: 7.28, h: 0.38, rectRadius: 0.03, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("EXPLICAR CONEXIONES · REVISIÓN HUMANA ANTES DEL USB", { x: 5.18, y: 6.12, w: 6.84, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 9.3, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Leer ambas peticiones y pedir al curso que identifique qué información cambia la calidad de la respuesta. No reducir la diferencia a escribir más texto: el valor está en el contexto técnico relevante.");
}

// 42 · Construir el encargo por capas
{
  const slide = pptx.addSlide();
  addHeader(slide, "Construir el encargo", "Un buen contexto se arma por capas, no con palabras mágicas", "Cada capa reduce una ambigüedad y permite que el agente haga preguntas más útiles.", 42);
  const layers = [
    ["01", "QUIÉNES SOMOS", "Equipo de tercero medio · desafío GeoGreen Escolar", C.cyan],
    ["02", "PROBLEMA", "Qué queremos mejorar y a quién afecta", C.red],
    ["03", "HARDWARE REAL", "Sensor exacto + placa exacta + voltaje", C.gold],
    ["04", "COMPORTAMIENTO", "Cuando ocurra X, entonces debe pasar Y", C.green],
    ["05", "PRIMERA PRUEBA", "Una pregunta pequeña que podamos observar", C.cyan],
    ["06", "RESTRICCIONES", "Explicar conexiones · declarar supuestos · esperar revisión", C.red],
  ];
  layers.forEach((l, i) => {
    const x = 0.84 + i * 0.36;
    const y = 2.02 + i * 0.72;
    const w = 11.56 - i * 0.72;
    slide.addShape(SH.roundRect, { x, y, w, h: 0.56, rectRadius: 0.04, fill: { color: i % 2 === 0 ? C.white : C.softBlue }, line: { color: l[3], pt: 1.1 } });
    slide.addShape(SH.roundRect, { x: x + 0.14, y: y + 0.13, w: 0.52, h: 0.3, rectRadius: 0.04, fill: { color: l[3] }, line: { color: l[3] } });
    slide.addText(l[0], { x: x + 0.14, y: y + 0.2, w: 0.52, h: 0.14, fontFace: TYPOGRAPHY.display, fontSize: 9.2, bold: true, color: l[3] === C.gold ? C.navyDeep : C.white, align: "center", margin: 0 });
    slide.addText(l[1], { x: x + 0.86, y: y + 0.17, w: 2.28, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 12.7, bold: true, color: C.navy, margin: 0 });
    slide.addText(l[2], { x: x + 3.3, y: y + 0.16, w: w - 3.62, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 11, color: C.ink, margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 2.08, y: 6.52, w: 9.16, h: 0.4, rectRadius: 0.04, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("Primero preguntas. Después plan. Código solamente cuando la prueba esté clara.", { x: 2.36, y: 6.64, w: 8.6, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Construir verbalmente un encargo con el curso. Mostrar que cada capa tiene una función y que restricciones como revisión humana o declarar supuestos cambian el comportamiento esperado del agente.");
}

// 43 · El agente pregunta antes de proponer
{
  const slide = pptx.addSlide();
  addHeader(slide, "Conversación útil", "Si falta información, el agente debe preguntar antes de escribir código", "Las preguntas revelan decisiones que el equipo todavía no ha tomado.", 43);
  slide.addShape(SH.roundRect, { x: 0.68, y: 1.98, w: 12.0, h: 4.88, rectRadius: 0.06, fill: { color: C.softBlue }, line: { color: C.border, pt: 1 } });
  slide.addShape(SH.roundRect, { x: 1.0, y: 2.3, w: 4.62, h: 1.18, rectRadius: 0.1, fill: { color: C.navy }, line: { color: C.navy } });
  pill(slide, "EQUIPO", 1.22, 2.48, 0.92, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 8.4 });
  slide.addText("Queremos detectar una tapa abierta con KY-021 y UNO R4.", { x: 1.22, y: 2.88, w: 4.0, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 12.2, bold: true, color: C.white, margin: 0 });
  slide.addShape(SH.chevron, { x: 5.88, y: 2.68, w: 0.42, h: 0.46, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addShape(SH.roundRect, { x: 6.58, y: 2.2, w: 5.72, h: 3.56, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.cyan, pt: 1.2 } });
  pill(slide, "AGENTE · ANTES DEL CÓDIGO", 6.86, 2.44, 2.22, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 8.6 });
  const questions = [
    ["01", "¿La alerta será una luz, un sonido o ambas?"],
    ["02", "¿Qué estado eléctrico entrega el módulo con el imán cerca?"],
    ["03", "¿La primera prueba será simulada o con el sensor físico?"],
  ];
  questions.forEach((q, i) => {
    const y = 3.08 + i * 0.78;
    numberBadge(slide, q[0], 6.9, y, i === 1 ? C.gold : C.cyan);
    slide.addText(q[1], { x: 7.62, y: y + 0.08, w: 4.2, h: 0.36, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.ink, margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 1.16, y: 4.16, w: 4.32, h: 1.5, rectRadius: 0.06, fill: { color: "F8F0D8" }, line: { color: C.gold, pt: 1.1 } });
  slide.addText("EL EQUIPO DECIDE", { x: 1.46, y: 4.46, w: 2.12, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.navy, margin: 0 });
  slide.addText("Responde con datos reales o reconoce qué falta investigar.", { x: 1.46, y: 4.94, w: 3.62, h: 0.44, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: C.ink, margin: 0 });
  slide.addText("Una buena pregunta evita una conexión inventada.", { x: 2.4, y: 6.34, w: 8.5, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Representar una interacción real. Si el equipo no conoce una respuesta, esa incertidumbre se registra y se investiga; no se rellena con una suposición conveniente.");
}

// 44 · Delegación responsable
{
  const slide = pptx.addSlide();
  addHeader(slide, "Responsabilidad compartida", "El agente puede proponer; el equipo debe comprobar", "La velocidad sirve solamente cuando la decisión final se apoya en evidencia.", 44);
  slide.addShape(SH.roundRect, { x: 0.68, y: 2.0, w: 6.12, h: 4.74, rectRadius: 0.06, fill: { color: C.navyDeep }, line: { color: C.cyan, pt: 1.2 } });
  addImageContain(slide, IMG.agenticBlock3, 0.86, 2.14, 3.02, 4.42);
  slide.addText("EL AGENTE", { x: 3.72, y: 2.36, w: 2.4, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: C.cyan, margin: 0 });
  const can = [["01", "PREGUNTA"], ["02", "PROPONE"], ["03", "EXPLICA"]];
  can.forEach((t, i) => {
    const y = 3.12 + i * 0.82;
    numberBadge(slide, t[0], 3.72, y, i === 1 ? C.gold : C.cyan);
    slide.addText(t[1], { x: 4.48, y: y + 0.1, w: 1.72, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14.4, bold: true, color: C.white, margin: 0 });
  });
  pill(slide, "ACELERA LA PRIMERA VERSIÓN", 3.72, 5.86, 2.62, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 8.5 });

  slide.addShape(SH.chevron, { x: 6.96, y: 3.88, w: 0.62, h: 0.62, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addShape(SH.roundRect, { x: 7.78, y: 2.0, w: 4.88, h: 4.74, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.red, pt: 1.2 } });
  slide.addText("EL EQUIPO", { x: 8.14, y: 2.36, w: 2.62, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: C.red, margin: 0 });
  const must = [
    ["01", "VERIFICAR", "pinout + voltaje", C.red],
    ["02", "OBSERVAR", "resultado real", C.cyan],
    ["03", "DECIDIR", "qué cambia después", C.gold],
  ];
  must.forEach((t, i) => {
    const y = 3.04 + i * 0.92;
    numberBadge(slide, t[0], 8.14, y, t[3]);
    slide.addText(t[1], { x: 8.9, y: y + 0.02, w: 1.54, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14.2, bold: true, color: t[3], margin: 0 });
    slide.addText(t[2], { x: 8.9, y: y + 0.34, w: 2.9, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 11.2, bold: true, color: C.ink, margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 8.14, y: 5.9, w: 4.02, h: 0.48, rectRadius: 0.04, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("RESPONDE POR LA DECISIÓN", { x: 8.38, y: 6.06, w: 3.54, h: 0.17, fontFace: TYPOGRAPHY.body, fontSize: 9.3, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Usar esta comparación para instalar autonomía. El agente puede acelerar trabajo, pero la placa física, el sensor real y la evidencia observada tienen prioridad sobre una respuesta plausible.");
}

// 45 · La prueba más pequeña
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("PRINCIPIO DE PROTOTIPADO", { x: 0.74, y: 0.5, w: 4.4, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.35, color: C.cyan, margin: 0 });
  slide.addText("No construyan todo.\nComprueben una sola cosa.", { x: 0.74, y: 1.08, w: 7.7, h: 1.34, fontFace: TYPOGRAPHY.display, fontSize: 32, bold: true, color: C.white, margin: 0 });
  slide.addText("La primera prueba debe responder una pregunta concreta en pocos minutos.", { x: 0.78, y: 2.66, w: 7.4, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 14, color: "D8E7F5", margin: 0 });
  const criteria = [
    ["01", "UNA ENTRADA", "un sensor", C.cyan],
    ["02", "UN CAMBIO", "acercar, cubrir, mojar…", C.gold],
    ["03", "UNA EVIDENCIA", "valor, estado o respuesta", C.red],
  ];
  criteria.forEach((c, i) => {
    const x = 0.82 + i * 4.16;
    slide.addShape(SH.roundRect, { x, y: 3.52, w: 3.72, h: 2.12, rectRadius: 0.06, fill: { color: "12385E" }, line: { color: c[3], pt: 1.4 } });
    numberBadge(slide, c[0], x + 0.24, 3.82, c[3]);
    slide.addText(c[1], { x: x + 0.96, y: 3.84, w: 2.4, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.white, margin: 0 });
    slide.addText(c[2], { x: x + 0.28, y: 4.66, w: 3.16, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 12.2, bold: true, color: c[3], align: "center", margin: 0 });
  });
  slide.addText("Si la lectura cambia de forma coherente, ya existe una primera evidencia.", { x: 1.46, y: 6.36, w: 10.4, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 16.5, bold: true, color: C.gold, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Frenar propuestas que intenten integrar sensor, app, carcasa y comunicación de una vez. Reducir la primera prueba hasta que tenga una entrada, un cambio controlado y una evidencia observable.");
}

// 46 · Banco de primeras pruebas
{
  const slide = pptx.addSlide();
  addHeader(slide, "Banco de pruebas pequeñas", "Cada sensor necesita una pregunta que pueda responder", "La prueba correcta cambia una sola condición y observa una sola evidencia.", 46);
  const tests = [
    ["HC-SR04", "acercar un objeto", "¿cambia la distancia?", C.cyan, IMG.hcSr04],
    ["KY-015", "respirar cerca", "¿cambia la humedad?", C.red, IMG.ky015],
    ["KY-001", "tocar suavemente", "¿cambia la temperatura?", C.gold, IMG.ky001],
    ["KY-018", "cubrir el sensor", "¿baja la lectura?", C.green, IMG.ky018],
    ["SOIL", "seco vs húmedo", "¿distingue estados?", C.green, IMG.soil],
    ["WATER", "contacto gradual", "¿detecta presencia?", C.cyan, IMG.water],
    ["KY-021", "acercar el imán", "¿cambia el estado?", C.red, IMG.ky021],
  ];
  tests.forEach((t, i) => {
    const top = i < 4;
    const col = top ? i : i - 4;
    const x = top ? 0.66 + col * 3.14 : 2.22 + col * 3.14;
    const y = top ? 2.06 : 4.34;
    slide.addShape(SH.roundRect, { x, y, w: 2.82, h: 1.82, rectRadius: 0.05, fill: { color: C.white }, line: { color: t[3], pt: 1.15 } });
    pill(slide, t[0], x + 0.16, y + 0.16, 1.04, { fill: t[3], line: t[3], color: t[3] === C.gold ? C.navyDeep : C.white, fontSize: 8.2 });
    addImageContain(slide, t[4], x + 1.54, y + 0.12, 1.08, 0.64);
    slide.addText(t[1], { x: x + 0.18, y: y + 0.86, w: 2.46, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 12.1, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addText(t[2], { x: x + 0.2, y: y + 1.34, w: 2.42, h: 0.26, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, color: t[3], align: "center", margin: 0 });
  });
  slide.addText("Primero leer el sensor. Después agregar reglas y salidas.", { x: 2.14, y: 6.56, w: 9.04, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Cada equipo elige o adapta una pregunta de prueba. Aclarar que estas acciones son ejemplos controlados; deben respetar la ficha y las condiciones seguras de cada módulo.");
}

// 47 · Dos carriles de prueba
{
  const slide = pptx.addSlide();
  addHeader(slide, "Elegir dónde probar", "Simulación y hardware físico responden preguntas distintas", "El equipo elige el carril que entregue evidencia segura y útil para su sensor.", 47);
  slide.addShape(SH.roundRect, { x: 0.62, y: 1.98, w: 6.0, h: 4.88, rectRadius: 0.06, fill: { color: C.navyDeep }, line: { color: C.cyan, pt: 1.2 } });
  addImageCrop(slide, IMG.wokwi, 0.86, 2.22, 5.52, 2.32);
  addImageContain(slide, IMG.wokwiLogo, 0.98, 2.34, 1.16, 0.46);
  slide.addText("CARRIL A · WOKWI", { x: 0.98, y: 4.86, w: 2.7, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.cyan, margin: 0 });
  slide.addText("Probar lógica, conexiones compatibles y comportamiento sin arriesgar la placa.", { x: 0.98, y: 5.34, w: 4.98, h: 0.58, fontFace: TYPOGRAPHY.body, fontSize: 12.2, color: C.white, margin: 0 });
  pill(slide, "SIMULAR ANTES DE ENERGIZAR", 0.98, 6.16, 2.62, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 8.7 });

  slide.addShape(SH.roundRect, { x: 6.86, y: 1.98, w: 5.82, h: 4.88, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.red, pt: 1.2 } });
  addImageCrop(slide, IMG.prototypeLandscape, 7.1, 2.22, 5.34, 2.32);
  slide.addText("CARRIL B · HARDWARE", { x: 7.1, y: 4.86, w: 3.0, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.red, margin: 0 });
  slide.addText("Contrastar la lectura con el sensor real después de revisar voltaje, pinout y circuito.", { x: 7.1, y: 5.34, w: 4.9, h: 0.58, fontFace: TYPOGRAPHY.body, fontSize: 12.2, color: C.ink, margin: 0 });
  pill(slide, "REVISIÓN HUMANA ANTES DEL USB", 7.1, 6.16, 2.82, { fill: C.red, line: C.red, color: C.white, fontSize: 8.7 });
  addNotesAndValidate(slide, "No presentar Wokwi y hardware como etapas obligatorias idénticas para todos. Algunos sensores pueden no existir en la simulación; en ese caso se puede usar un equivalente para la lógica o avanzar al sensor físico con revisión.");
}

// 48 · Herramientas que producen evidencia
{
  const slide = pptx.addSlide();
  addHeader(slide, "Herramientas del proceso", "Un comando sirve cuando sabemos qué evidencia entrega", "No memoricen sintaxis: aprendan a distinguir compilar, simular, probar y cargar.", 48);
  const toolCards = [
    { x: 0.66, color: C.cyan, title: "WOKWI", action: "DISEÑAR + SIMULAR", evidence: "ver el circuito comportarse", logo: IMG.wokwiLogo, shot: IMG.wokwi },
    { x: 4.86, color: C.gold, title: "WOKWI CLI", action: "REPETIR + PROBAR", evidence: "ejecutar la misma prueba", logo: IMG.wokwiLogo, shot: IMG.wokwiCli },
    { x: 9.06, color: C.red, title: "PLATFORMIO", action: "COMPILAR + CARGAR", evidence: "llevar el programa a la placa", logo: IMG.platformioLogo, shot: IMG.platformioBoards },
  ];
  toolCards.forEach((t) => {
    slide.addShape(SH.roundRect, { x: t.x, y: 2.0, w: 3.62, h: 4.34, rectRadius: 0.05, fill: { color: C.white }, line: { color: t.color, pt: 1.25 } });
    slide.addShape(SH.rect, { x: t.x, y: 2.0, w: 3.62, h: 0.1, fill: { color: t.color }, line: { color: t.color } });
    addImageContain(slide, t.logo, t.x + 0.2, 2.24, 0.72, 0.5);
    slide.addText(t.title, { x: t.x + 1.02, y: 2.36, w: 2.28, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: C.navy, margin: 0 });
    addImageCrop(slide, t.shot, t.x + 0.2, 2.94, 3.22, 1.62);
    slide.addShape(SH.roundRect, { x: t.x + 0.2, y: 4.82, w: 3.22, h: 0.48, rectRadius: 0.04, fill: { color: t.color }, line: { color: t.color } });
    slide.addText(t.action, { x: t.x + 0.38, y: 4.98, w: 2.86, h: 0.17, fontFace: TYPOGRAPHY.body, fontSize: 9.5, bold: true, color: t.color === C.gold ? C.navyDeep : C.white, align: "center", margin: 0 });
    slide.addText(t.evidence, { x: t.x + 0.3, y: 5.58, w: 3.02, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 11.2, bold: true, color: C.ink, align: "center", margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 1.5, y: 6.52, w: 10.34, h: 0.4, rectRadius: 0.04, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("El agente puede ejecutar · el equipo observa la evidencia e interpreta", { x: 1.78, y: 6.65, w: 9.78, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 10.8, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Mostrar uno de los comandos en vivo si el tiempo lo permite. La enseñanza no es memorizar comandos, sino comprender que cada herramienta produce un tipo distinto de evidencia.");
}

// 49 · Puerta de seguridad
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("PUERTA DE SEGURIDAD", { x: 0.74, y: 0.5, w: 4.0, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.35, color: C.red, margin: 0 });
  slide.addText("El USB se conecta después de seis respuestas", { x: 0.74, y: 0.94, w: 9.8, h: 0.56, fontFace: TYPOGRAPHY.display, fontSize: 28, bold: true, color: C.white, margin: 0 });
  slide.addText("Si una respuesta falta, el circuito permanece sin energía.", { x: 0.76, y: 1.56, w: 8.4, h: 0.32, fontFace: TYPOGRAPHY.body, fontSize: 13.2, color: "D8E7F5", margin: 0 });
  const gate = [
    ["01", "PLACA", "modelo exacto", C.cyan],
    ["02", "SENSOR", "modelo exacto", C.green],
    ["03", "VOLTAJE", "alimentación y señales", C.red],
    ["04", "DIAGRAMA", "función de cada cable", C.gold],
    ["05", "PROTECCIÓN", "resistencia o adaptación", C.cyan],
    ["06", "EXPECTATIVA", "qué debe ocurrir", C.green],
  ];
  gate.forEach((g, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.82 + col * 4.14;
    const y = 2.34 + row * 1.52;
    slide.addShape(SH.roundRect, { x, y, w: 3.74, h: 1.18, rectRadius: 0.05, fill: { color: "12385E" }, line: { color: g[3], pt: 1.2 } });
    numberBadge(slide, g[0], x + 0.22, y + 0.26, g[3]);
    slide.addText(g[1], { x: x + 0.94, y: y + 0.24, w: 2.44, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 13.6, bold: true, color: g[3], margin: 0 });
    slide.addText(g[2], { x: x + 0.94, y: y + 0.66, w: 2.42, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10.5, color: C.white, margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 2.02, y: 5.68, w: 9.3, h: 0.72, rectRadius: 0.05, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("REVISIÓN HUMANA → CONECTAR → OBSERVAR UNA PRUEBA PEQUEÑA", { x: 2.34, y: 5.92, w: 8.66, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 12.4, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("Ante calor, olor, reinicio o comportamiento extraño: USB fuera.", { x: 2.3, y: 6.78, w: 8.72, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.gold, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Usar esta diapositiva como autorización visible. No energizar por presión de tiempo. Si el equipo no llega a la prueba física, una especificación y un diagrama bien revisados siguen siendo evidencia de avance.");
}

// 50 · Misión práctica del bloque
{
  const slide = pptx.addSlide();
  addHeader(slide, "Misión de equipo · 12 minutos", "Construyan el punto de partida que podrán continuar por su cuenta", "El objetivo es una decisión explicable y una primera evidencia, no un proyecto completo.", 50);
  slide.addShape(SH.roundRect, { x: 0.58, y: 1.92, w: 2.5, h: 4.98, rectRadius: 0.06, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("12:00", { x: 0.8, y: 2.26, w: 2.06, h: 0.7, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.gold, align: "center", margin: 0 });
  slide.addText("TRABAJO EN EQUIPO", { x: 0.82, y: 3.14, w: 2.02, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, charSpacing: 1.15, color: C.cyan, align: "center", margin: 0 });
  const mini = [["01", "ELEGIR"], ["02", "ESCRIBIR"], ["03", "PREGUNTAR"], ["04", "PROBAR"]];
  mini.forEach((m, i) => {
    const y = 3.68 + i * 0.56;
    numberBadge(slide, m[0], 0.86, y, i === 3 ? C.red : C.cyan);
    slide.addText(m[1], { x: 1.48, y: y + 0.1, w: 1.34, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 10.7, bold: true, color: C.white, margin: 0 });
  });
  pill(slide, "KIT SIN USB AL INICIO", 0.86, 6.24, 1.86, { fill: C.red, line: C.red, color: C.white, fontSize: 8.4 });

  slide.addText("ENTREGABLES DEL EQUIPO", { x: 3.42, y: 2.02, w: 3.2, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 10.3, bold: true, charSpacing: 1.15, color: C.red, margin: 0 });
  const deliverables = [
    ["01", "VARIABLE + SENSOR", "Qué observarán y por qué ese módulo sirve.", C.cyan],
    ["02", "REGLA", "Cuando… entonces…", C.gold],
    ["03", "PLAN SEGURO", "Diagrama, voltaje y primera prueba.", C.red],
    ["04", "EVIDENCIA", "Qué esperaban, qué ocurrió y qué sigue.", C.green],
  ];
  deliverables.forEach((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 3.4 + col * 3.1;
    const y = 2.48 + row * 1.48;
    slide.addShape(SH.roundRect, { x, y, w: 2.8, h: 1.18, rectRadius: 0.05, fill: { color: C.white }, line: { color: d[3], pt: 1.15 } });
    numberBadge(slide, d[0], x + 0.18, y + 0.24, d[3]);
    slide.addText(d[1], { x: x + 0.86, y: y + 0.2, w: 1.66, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 12.4, bold: true, color: C.navy, margin: 0 });
    slide.addText(d[2], { x: x + 0.22, y: y + 0.68, w: 2.36, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 9.8, color: C.ink, align: "center", margin: 0 });
  });

  slide.addShape(SH.roundRect, { x: 9.84, y: 1.92, w: 2.84, h: 4.98, rectRadius: 0.06, fill: { color: "F8F0D8" }, line: { color: C.gold, pt: 1.15 } });
  slide.addText("REGISTRO", { x: 10.18, y: 2.26, w: 1.5, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy, margin: 0 });
  const record = ["Qué intentamos", "Qué esperábamos", "Qué ocurrió", "Qué evidencia guardamos", "Qué cambiaremos"];
  record.forEach((t, i) => {
    const y = 2.92 + i * 0.62;
    slide.addShape(SH.ellipse, { x: 10.16, y: y + 0.02, w: 0.18, h: 0.18, fill: { color: i === 4 ? C.red : C.gold }, line: { color: i === 4 ? C.red : C.gold } });
    slide.addText(t, { x: 10.52, y, w: 1.74, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: i === 4, color: C.ink, margin: 0 });
  });
  slide.addText("Si no alcanzan a energizar, entreguen una especificación y un plan revisado.", { x: 10.16, y: 6.16, w: 2.2, h: 0.48, fontFace: TYPOGRAPHY.body, fontSize: 9.8, bold: true, color: C.red, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Mantener esta diapositiva proyectada durante la actividad. Circular usando la escalera de acompañamiento: pregunta, pista, referencia, revisión e intervención solamente ante riesgo o bloqueo técnico real.");
}

// 51 · Cierre Bloque 3 y continuidad autónoma
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("CIERRE DEL BLOQUE 3", { x: 0.76, y: 0.5, w: 4.2, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.35, color: C.cyan, margin: 0 });
  slide.addText("El taller entrega el punto de partida.\nEl avance lo construye el equipo.", { x: 0.76, y: 0.94, w: 9.8, h: 1.02, fontFace: TYPOGRAPHY.display, fontSize: 28, bold: true, color: C.white, margin: 0 });
  slide.addText("La propuesta más sólida será la que acumule más trabajo útil, iteraciones y evidencia.", { x: 0.8, y: 2.08, w: 9.6, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 13.5, color: C.gold, margin: 0 });
  const continuity = [
    ["HOY", "definir y probar", C.cyan],
    ["ENTRE SESIONES", "construir e iterar", C.gold],
    ["MENTORÍA", "orientar · revisar · destrabar", C.red],
    ["NUEVA ITERACIÓN", "aplicar y demostrar", C.green],
    ["EVENTO FINAL", "presentar y defender", C.cyan],
  ];
  slide.addShape(SH.line, { x: 1.14, y: 4.02, w: 10.86, h: 0, line: { color: C.gold, pt: 3, endArrowType: "triangle" } });
  // Los números se centran intencionalmente dentro de cada nodo de continuidad.
  continuity.forEach((c, i) => {
    const x = 0.82 + i * 2.5;
    slide.addShape(SH.ellipse, { x, y: 3.48, w: 1.08, h: 1.08, fill: { color: C.navyDeep }, line: { color: c[2], pt: 2.2 } });
    slide.addText(String(i + 1).padStart(2, "0"), { x, y: 3.48, w: 1.08, h: 1.08, fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: C.white, align: "center", valign: "mid", margin: 0 });
    slide.addText(c[0], { x: x - 0.5, y: i % 2 === 0 ? 3.0 : 4.82, w: 2.08, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: c[2], align: "center", margin: 0 });
    slide.addText(c[1], { x: x - 0.56, y: i % 2 === 0 ? 4.78 : 2.74, w: 2.2, h: 0.4, fontFace: TYPOGRAPHY.body, fontSize: 9.8, color: C.white, align: "center", margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 1.18, y: 5.76, w: 10.98, h: 0.72, rectRadius: 0.05, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("ANTES DE LA PRÓXIMA MENTORÍA · DEFINAN UN HITO QUE PUEDAN DEMOSTRAR", { x: 1.5, y: 6.0, w: 10.34, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 11.8, bold: true, color: C.navyDeep, align: "center", margin: 0 });
  slide.addText("Las mentorías ayudan a avanzar; no reemplazan el trabajo del equipo.", { x: 2.24, y: 6.82, w: 8.84, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.8, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Cerrar pidiendo a dos vocerías que declaren variable, sensor, primera prueba y el hito que realizarán antes de la mentoría. Aclarar que la mentoría revisa trabajo existente y ayuda con bloqueos; no es la sesión donde el monitor construye el proyecto por ellos.");
}

// 52 · Apertura Bloque 4
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("BLOQUE 4 · 20 MIN", { x: 0.74, y: 0.56, w: 2.24, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.25, color: C.red, margin: 0 });
  slide.addText("Del prototipo\nal producto", { x: 0.74, y: 1.28, w: 5.46, h: 1.46, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, margin: 0 });
  slide.addText("Una idea crece cuando cada nueva capa aporta evidencia y ayuda a alguien a decidir.", { x: 0.78, y: 3.08, w: 4.98, h: 0.82, fontFace: TYPOGRAPHY.body, fontSize: 16, color: "D8E7F5", margin: 0 });
  const block4Chips = [["HARDWARE", C.cyan], ["SOFTWARE", C.red], ["DISEÑO", C.gold]];
  block4Chips.forEach((c, i) => pill(slide, c[0], 0.78 + i * 1.48, 4.42, 1.26, { fill: c[1], line: c[1], color: c[1] === C.gold ? C.navyDeep : C.white, fontSize: 8.7 }));
  slide.addText("Meta del bloque: reconocer dónde está su propuesta y elegir el próximo hito que puedan demostrar.", { x: 0.78, y: 5.3, w: 4.94, h: 0.72, fontFace: TYPOGRAPHY.body, fontSize: 12.2, bold: true, color: C.gold, margin: 0 });

  addImageCrop(slide, IMG.dashboard, 6.3, 1.3, 6.32, 2.12);
  addImageCrop(slide, IMG.blender, 6.3, 3.68, 2.98, 2.5);
  addImageCrop(slide, IMG.pcbRender, 9.54, 3.68, 3.08, 2.5);
  pill(slide, "DATOS QUE SE ENTIENDEN", 6.56, 2.92, 2.18, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 8.4 });
  pill(slide, "FORMA QUE PROTEGE", 6.56, 5.68, 1.9, { fill: C.gold, line: C.gold, color: C.navyDeep, fontSize: 8.2 });
  pill(slide, "CIRCUITO INTEGRADO", 9.8, 5.68, 1.88, { fill: C.red, line: C.red, color: C.white, fontSize: 8.2 });
  slide.addText("GeoGreen Escolar · Taller 3", { x: 0.78, y: 6.86, w: 3.2, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 9.5, color: "B9C9D9", margin: 0 });
  addNotesAndValidate(slide, "Abrir el bloque mostrando que hardware, software y diseño son capas conectadas. No presentar estas imágenes como requisitos mínimos: son referencias del recorrido posible desde una primera prueba.");
}

// 53 · Escala de madurez
{
  const slide = pptx.addSlide();
  addHeader(slide, "Escala de madurez", "Una solución crece por evidencia, no por cantidad de componentes", "Cada nivel responde una pregunta distinta. El equipo avanza cuando puede demostrar la anterior.", 53);
  const maturity = [
    ["01", "PROBLEMA", "¿a quién ayuda?", C.red],
    ["02", "VARIABLE", "¿qué observar?", C.cyan],
    ["03", "LECTURA", "¿el sensor cambia?", C.gold],
    ["04", "RESPUESTA", "¿qué ocurre entonces?", C.green],
    ["05", "SISTEMA", "¿funciona varias veces?", C.cyan],
    ["06", "EXPERIENCIA", "¿se entiende y se usa?", C.gold],
    ["07", "PRODUCTO", "¿se protege y documenta?", C.red],
  ];
  maturity.forEach((m, i) => {
    const x = 0.66 + i * 1.77;
    const y = 5.46 - i * 0.48;
    slide.addShape(SH.roundRect, { x, y, w: 1.52, h: 1.02, rectRadius: 0.05, fill: { color: i < 3 ? C.navy : C.white }, line: { color: m[3], pt: 1.25 } });
    slide.addText(m[0], { x: x + 0.12, y: y + 0.12, w: 0.38, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 9.2, bold: true, color: m[3], margin: 0 });
    slide.addText(m[1], { x: x + 0.12, y: y + 0.38, w: 1.28, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 10.4, bold: true, color: i < 3 ? C.white : C.navy, margin: 0 });
    slide.addText(m[2], { x: x + 0.12, y: y + 0.68, w: 1.28, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 8.2, color: i < 3 ? "D8E7F5" : C.slate, margin: 0 });
    if (i < maturity.length - 1) slide.addShape(SH.chevron, { x: x + 1.57, y: y + 0.34, w: 0.18, h: 0.3, fill: { color: C.gold }, line: { color: C.gold } });
  });
  slide.addShape(SH.roundRect, { x: 0.92, y: 6.7, w: 11.48, h: 0.34, rectRadius: 0.04, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("No hay atajos: una interfaz bonita no corrige una lectura que todavía no es confiable.", { x: 1.18, y: 6.81, w: 10.96, h: 0.15, fontFace: TYPOGRAPHY.body, fontSize: 10.4, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Recorrer la escala de izquierda a derecha. Pedir a los equipos que ubiquen mentalmente su avance actual. Destacar que un proyecto puede cerrar correctamente en distintos niveles si resuelve su propósito con evidencia.");
}

// 54 · Evolución GeoGreen
{
  const slide = pptx.addSlide();
  addHeader(slide, "Caso GeoGreen", "La evolución no fue un salto: fue una cadena de decisiones", "Cada versión conservó lo que funcionaba y agregó una capa con propósito.", 54);
  const evolution = [
    { x: 0.62, n: "01", title: "MEDIR", body: "HC-SR04 + comunicación móvil", img: IMG.original, color: C.cyan },
    { x: 3.82, n: "02", title: "RESPONDER", body: "semáforo + buzzer + pantalla", img: IMG.prototypeLandscape, color: C.gold },
    { x: 7.02, n: "03", title: "VISUALIZAR", body: "estados, alertas y mapa", img: IMG.dashboard, color: C.red },
    { x: 10.22, n: "04", title: "INTEGRAR", body: "carcasa + PCB", img: IMG.pcbRender, color: C.green },
  ];
  evolution.forEach((e, i) => {
    slide.addShape(SH.roundRect, { x: e.x, y: 2.02, w: 2.76, h: 4.56, rectRadius: 0.05, fill: { color: i === 1 ? C.navyDeep : C.white }, line: { color: e.color, pt: 1.2 } });
    addImageCrop(slide, e.img, e.x + 0.16, 2.18, 2.44, 2.02);
    numberBadge(slide, e.n, e.x + 0.18, 4.42, e.color);
    slide.addText(e.title, { x: e.x + 0.86, y: 4.52, w: 1.54, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 14.2, bold: true, color: i === 1 ? C.white : C.navy, margin: 0 });
    slide.addText(e.body, { x: e.x + 0.22, y: 5.18, w: 2.3, h: 0.48, fontFace: TYPOGRAPHY.body, fontSize: 10.6, bold: true, color: i === 1 ? C.gold : C.ink, align: "center", margin: 0 });
    if (i < 3) slide.addShape(SH.chevron, { x: e.x + 2.84, y: 3.92, w: 0.24, h: 0.4, fill: { color: C.gold }, line: { color: C.gold } });
  });
  slide.addText("El referente muestra posibilidades. Cada equipo construye una respuesta propia.", { x: 2.18, y: 6.82, w: 8.98, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Narrar la evolución como decisiones: primero medir, luego comunicar localmente, después visualizar a distancia y finalmente integrar el hardware. Evitar presentar la secuencia como una receta obligatoria.");
}

// 55 · Ciclo completo
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("EL CICLO COMPLETO", { x: 0.74, y: 0.5, w: 4.2, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.35, color: C.cyan, margin: 0 });
  slide.addText("Del mundo físico a una decisión", { x: 0.74, y: 0.94, w: 8.6, h: 0.56, fontFace: TYPOGRAPHY.display, fontSize: 29, bold: true, color: C.white, margin: 0 });
  slide.addText("El software completa el recorrido cuando convierte lecturas en información comprensible.", { x: 0.78, y: 1.6, w: 8.44, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 13.3, color: "D8E7F5", margin: 0 });
  const cycle = [
    ["01", "SENSAR", "el HC-SR04 mide distancia", C.cyan],
    ["02", "ENVIAR", "la placa transmite el dato", C.gold],
    ["03", "VISUALIZAR", "la app organiza y muestra", C.green],
    ["04", "ALERTAR", "una persona sabe que actuar", C.red],
  ];
  cycle.forEach((c, i) => {
    const x = 0.82 + i * 3.12;
    slide.addShape(SH.roundRect, { x, y: 2.64, w: 2.58, h: 2.62, rectRadius: 0.06, fill: { color: "12385E" }, line: { color: c[3], pt: 1.4 } });
    numberBadge(slide, c[0], x + 0.22, 2.96, c[3]);
    slide.addText(c[1], { x: x + 0.94, y: 3.04, w: 1.54, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 13.7, bold: true, color: c[3], margin: 0 });
    slide.addText(c[2], { x: x + 0.28, y: 3.86, w: 2.02, h: 0.62, fontFace: TYPOGRAPHY.body, fontSize: 11.1, bold: true, color: C.white, align: "center", margin: 0 });
    if (i < 3) slide.addShape(SH.chevron, { x: x + 2.7, y: 3.64, w: 0.3, h: 0.54, fill: { color: C.gold }, line: { color: C.gold } });
  });
  slide.addShape(SH.roundRect, { x: 1.58, y: 5.82, w: 10.16, h: 0.76, rectRadius: 0.05, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("DATO ÚTIL = lectura + contexto + una persona que puede decidir", { x: 1.92, y: 6.08, w: 9.48, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 15.3, bold: true, color: C.navyDeep, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Explicar el ciclo completo con un ejemplo: el sensor mide, la placa procesa y transmite, la app muestra el estado y la alerta permite actuar. Aclarar que no todos los proyectos necesitan conectividad; deben justificarla según el problema.");
}

// 56 · Dashboard GeoGreen
{
  const slide = pptx.addSlide();
  addHeader(slide, "Software que vuelve visible el sistema", "El dashboard responde preguntas que el sensor aislado no puede", "La interfaz ordena muchos datos para que una persona pueda comprender, comparar y actuar.", 56);
  slide.addShape(SH.roundRect, { x: 0.54, y: 1.9, w: 12.22, h: 4.82, rectRadius: 0.05, fill: { color: C.white }, line: { color: C.cyan, pt: 1.1 } });
  addImageCrop(slide, IMG.dashboard, 0.7, 2.06, 12.0, 4.5);
  const calls = [
    ["01", "ESTADO", "¿cuáles necesitan atención?", 2.82, 2.2, C.red],
    ["02", "UBICACIÓN", "¿dónde está cada punto?", 6.0, 4.14, C.cyan],
    ["03", "RUTA", "¿en qué orden actuar?", 10.04, 3.2, C.gold],
  ];
  calls.forEach((c) => {
    slide.addShape(SH.roundRect, { x: c[3], y: c[4], w: 2.28, h: 0.72, rectRadius: 0.04, fill: { color: C.navyDeep, transparency: 5 }, line: { color: c[5], pt: 1.2 } });
    slide.addText(c[0], { x: c[3] + 0.14, y: c[4] + 0.12, w: 0.34, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 9, bold: true, color: c[5], margin: 0 });
    slide.addText(c[1], { x: c[3] + 0.56, y: c[4] + 0.1, w: 1.46, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 10.6, bold: true, color: C.white, margin: 0 });
    slide.addText(c[2], { x: c[3] + 0.56, y: c[4] + 0.38, w: 1.48, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.3, color: C.white, margin: 0 });
  });
  slide.addText("El sensor produce datos. El software construye una vista para tomar decisiones.", { x: 2.08, y: 6.82, w: 9.14, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14.2, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Usar la captura real del dashboard. Señalar que una sola lectura no explica una red completa: el software permite ver estados, ubicación, alertas y rutas. La interfaz debe diseñarse desde la decisión que necesita tomar su usuario.");
}

// 57 · Imaginar la visualización propia
{
  const slide = pptx.addSlide();
  addHeader(slide, "Diseñar desde la pregunta", "¿Qué debería entender una persona al mirar su sistema?", "La mejor pantalla no muestra todos los datos: destaca los que ayudan a actuar.", 57);
  const uiIdeas = [
    ["TIERRA", "humedad", "¿necesita riego?", "SECO · ÓPTIMO · HÚMEDO", C.green],
    ["AMBIENTE", "temperatura", "¿existe riesgo?", "NORMAL · ADVERTENCIA", C.red],
    ["AGUA", "nivel", "¿hay presencia o fuga?", "SIN AGUA · DETECTADA", C.cyan],
    ["APERTURA", "estado", "¿quedó abierto?", "CERRADO · ABIERTO", C.gold],
  ];
  uiIdeas.forEach((u, i) => {
    const x = 0.7 + i * 3.14;
    slide.addShape(SH.roundRect, { x, y: 2.08, w: 2.84, h: 4.42, rectRadius: 0.06, fill: { color: i === 1 ? C.navyDeep : C.white }, line: { color: u[4], pt: 1.2 } });
    pill(slide, u[0], x + 0.2, 2.3, 1.08, { fill: u[4], line: u[4], color: u[4] === C.gold ? C.navyDeep : C.white, fontSize: 8.2 });
    slide.addText(u[1], { x: x + 0.2, y: 3.02, w: 2.4, h: 0.36, fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: i === 1 ? C.white : C.navy, align: "center", margin: 0 });
    slide.addShape(SH.line, { x: x + 0.5, y: 3.64, w: 1.84, h: 0, line: { color: u[4], pt: 2 } });
    slide.addText(u[2], { x: x + 0.28, y: 4.02, w: 2.28, h: 0.52, fontFace: TYPOGRAPHY.body, fontSize: 11.7, bold: true, color: i === 1 ? C.gold : C.ink, align: "center", margin: 0 });
    slide.addShape(SH.roundRect, { x: x + 0.24, y: 5.12, w: 2.36, h: 0.72, rectRadius: 0.05, fill: { color: u[4] }, line: { color: u[4] } });
    slide.addText(u[3], { x: x + 0.4, y: 5.38, w: 2.04, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 9.1, bold: true, color: u[4] === C.gold ? C.navyDeep : C.white, align: "center", margin: 0 });
  });
  slide.addText("Variable → pregunta humana → estado comprensible", { x: 2.7, y: 6.82, w: 7.94, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14.6, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Pedir que un equipo elija una variable y responda qué debería entender una persona al verla. Mostrar que el diseño de software comienza antes de programar: primero se define la pregunta y el estado comprensible.");
}

// 58 · Complejidad con propósito
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("COMPLEJIDAD CON PROPÓSITO", { x: 0.74, y: 0.5, w: 4.4, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.3, color: C.red, margin: 0 });
  slide.addText("MÁS", { x: 0.74, y: 0.96, w: 2.34, h: 0.74, fontFace: TYPOGRAPHY.display, fontSize: 39, bold: true, color: C.red, margin: 0 });
  slide.addText("≠", { x: 3.04, y: 0.92, w: 1.0, h: 0.78, fontFace: TYPOGRAPHY.display, fontSize: 42, bold: true, color: C.gold, align: "center", margin: 0 });
  slide.addText("MEJOR", { x: 4.18, y: 0.96, w: 3.4, h: 0.74, fontFace: TYPOGRAPHY.display, fontSize: 39, bold: true, color: C.cyan, margin: 0 });
  slide.addText("Una capa nueva vale solamente si mejora la respuesta al problema.", { x: 0.78, y: 1.76, w: 7.0, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 13.6, color: "D8E7F5", margin: 0 });

  slide.addShape(SH.roundRect, { x: 0.7, y: 2.42, w: 5.52, h: 3.92, rectRadius: 0.06, fill: { color: "12385E" }, line: { color: C.red, pt: 1.2 } });
  slide.addText("ACUMULAR TECNOLOGÍA", { x: 1.0, y: 2.7, w: 2.9, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 15.8, bold: true, color: C.red, margin: 0 });
  addImageCrop(slide, IMG.dashboard, 1.0, 3.2, 2.06, 1.28, { rotate: -4 });
  addImageCrop(slide, IMG.blender, 3.72, 3.02, 1.78, 1.48, { rotate: 5 });
  addImageContain(slide, IMG.r4, 1.12, 4.76, 1.88, 1.04, { rotate: 3 });
  addImageCrop(slide, IMG.pcbRender, 3.42, 4.62, 2.14, 1.22, { rotate: -4 });
  const pluses = [[3.2, 3.54], [2.92, 4.78], [3.0, 5.62]];
  pluses.forEach((p) => slide.addText("+", { x: p[0], y: p[1], w: 0.34, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 24, bold: true, color: C.gold, align: "center", margin: 0 }));
  slide.addShape(SH.roundRect, { x: 1.02, y: 5.9, w: 4.84, h: 0.3, rectRadius: 0.03, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("MÁS TRABAJO · NINGUNA EVIDENCIA NUEVA", { x: 1.22, y: 6.0, w: 4.44, h: 0.12, fontFace: TYPOGRAPHY.body, fontSize: 8.6, bold: true, color: C.white, align: "center", margin: 0 });

  slide.addShape(SH.chevron, { x: 6.42, y: 3.9, w: 0.62, h: 0.72, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addShape(SH.roundRect, { x: 7.28, y: 2.42, w: 5.36, h: 3.92, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.cyan, pt: 1.25 } });
  slide.addText("FILTRAR CADA CAPA", { x: 7.64, y: 2.7, w: 2.8, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 15.8, bold: true, color: C.navy, margin: 0 });
  const filters = [
    ["01", "NECESIDAD", "¿qué mejora?", C.red],
    ["02", "PRUEBA", "¿cómo se demuestra?", C.gold],
    ["03", "APORTE", "¿qué cambia al integrarla?", C.cyan],
  ];
  filters.forEach((f, i) => {
    const y = 3.26 + i * 0.78;
    slide.addShape(SH.roundRect, { x: 7.64, y, w: 4.64, h: 0.6, rectRadius: 0.04, fill: { color: i === 1 ? "F8F0D8" : C.softBlue }, line: { color: f[3], pt: 1 } });
    numberBadge(slide, f[0], 7.82, y + 0.08, f[3]);
    slide.addText(f[1], { x: 8.52, y: y + 0.17, w: 1.22, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 11.6, bold: true, color: f[3], margin: 0 });
    slide.addText(f[2], { x: 9.82, y: y + 0.16, w: 2.12, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10.3, bold: true, color: C.ink, margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 7.64, y: 5.82, w: 4.64, h: 0.38, rectRadius: 0.04, fill: { color: C.cyan }, line: { color: C.cyan } });
  slide.addText("RESULTADO · EVIDENCIA NUEVA", { x: 7.9, y: 5.95, w: 4.12, h: 0.15, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: C.navyDeep, align: "center", margin: 0 });
  slide.addText("La ambición se demuestra con coherencia, no con una lista de funciones.", { x: 2.02, y: 6.76, w: 9.3, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 14.2, bold: true, color: C.gold, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Contrastar cantidad con coherencia. WiFi, pantalla o aplicación pueden ser valiosos, pero solamente cuando existe una necesidad, una prueba y un aporte concreto que el equipo pueda explicar.");
}

// 59 · Disciplinas que completan una solución
{
  const slide = pptx.addSlide();
  addHeader(slide, "Construir en equipo", "Una solución completa conecta distintas formas de pensar", "Nadie necesita dominar todo: el equipo debe formular buenas preguntas y unir aportes coherentes.", 59);
  const disciplines = [
    ["01", "PROPÓSITO", "problema + personas", 0.72, 2.06, C.red],
    ["02", "ELECTRÓNICA", "sensores + seguridad", 0.72, 3.72, C.cyan],
    ["03", "PROGRAMACIÓN", "reglas + automatización", 0.72, 5.38, C.gold],
    ["04", "SOFTWARE", "datos + interfaz", 10.08, 2.06, C.green],
    ["05", "DISEÑO 3D", "forma + protección", 10.08, 3.72, C.gold],
    ["06", "COMUNICACIÓN", "explicar + defender", 10.08, 5.38, C.red],
  ];
  // Los conectores se dibujan primero y terminan detrás del núcleo central.
  [2.6, 4.26, 5.92].forEach((y) => {
    slide.addShape(SH.line, { x: 3.42, y, w: 2.08, h: 0, line: { color: C.border, pt: 1.8 } });
    slide.addShape(SH.line, { x: 7.84, y, w: 2.08, h: 0, line: { color: C.border, pt: 1.8 } });
  });
  disciplines.forEach((d) => {
    slide.addShape(SH.roundRect, { x: d[3], y: d[4], w: 2.72, h: 1.1, rectRadius: 0.05, fill: { color: C.white }, line: { color: d[5], pt: 1.2 } });
    numberBadge(slide, d[0], d[3] + 0.18, d[4] + 0.22, d[5]);
    slide.addText(d[1], { x: d[3] + 0.88, y: d[4] + 0.2, w: 1.58, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 11.8, bold: true, color: d[5], margin: 0 });
    slide.addText(d[2], { x: d[3] + 0.88, y: d[4] + 0.62, w: 1.58, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.9, bold: true, color: C.ink, margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 4.86, y: 2.42, w: 3.62, h: 3.94, rectRadius: 0.08, fill: { color: C.navyDeep }, line: { color: C.gold, pt: 1.8 } });
  slide.addText("UNA SOLUCIÓN", { x: 5.28, y: 2.8, w: 2.78, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("que funciona", { x: 5.54, y: 3.3, w: 2.26, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 12.6, bold: true, color: C.cyan, align: "center", margin: 0 });
  slide.addShape(SH.line, { x: 5.5, y: 3.86, w: 2.34, h: 0, line: { color: C.gold, pt: 2 } });
  slide.addText("PARA ALGUIEN", { x: 5.26, y: 4.18, w: 2.82, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: C.gold, align: "center", margin: 0 });
  slide.addText("Cada área responde una pregunta.\nEl equipo une las respuestas.", { x: 5.32, y: 4.86, w: 2.7, h: 0.68, fontFace: TYPOGRAPHY.body, fontSize: 11, bold: true, color: C.white, align: "center", margin: 0 });
  pill(slide, "COHERENCIA", 5.7, 5.8, 1.94, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 8.8 });
  slide.addText("La calidad aparece cuando los aportes dejan de ser piezas sueltas.", { x: 2.46, y: 6.88, w: 8.42, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 13.6, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Relacionar el proyecto con distintas áreas. Destacar software como la capa que organiza datos e interfaz, y comunicación como la capacidad de defender decisiones. Invitar a reconocer talentos distintos dentro de cada equipo.");
}

// 60 · Diseño 3D
{
  const slide = pptx.addSlide();
  addHeader(slide, "Diseño 3D", "Una carcasa no decora el circuito: lo prepara para el mundo real", "La forma debe responder a dimensiones, protección, montaje, acceso y mantenimiento.", 60);
  slide.addShape(SH.roundRect, { x: 0.62, y: 1.96, w: 7.42, h: 4.92, rectRadius: 0.05, fill: { color: C.navyDeep }, line: { color: C.cyan, pt: 1.2 } });
  slide.addMedia({
    type: "video",
    path: IMG.videoCarcasa,
    cover: imageDataUri(IMG.blender),
    x: 0.82,
    y: 2.16,
    w: 7.02,
    h: 4.52,
  });
  pill(slide, "▶ REPRODUCIR RENDER 3D", 1.04, 6.14, 2.22, { fill: C.red, line: C.red, color: C.white, fontSize: 8.5 });
  pill(slide, "MODELO EN BLENDER", 5.74, 6.14, 1.78, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 8.3 });
  const formFns = [
    ["01", "PROTEGER", "golpes, humedad y cables", C.red],
    ["02", "FIJAR", "cómo se instala", C.cyan],
    ["03", "ACCEDER", "carga y mantenimiento", C.gold],
    ["04", "COMPROBAR", "medidas y ubicación", C.green],
  ];
  formFns.forEach((f, i) => {
    const y = 2.08 + i * 1.1;
    numberBadge(slide, f[0], 8.46, y, f[3]);
    slide.addText(f[1], { x: 9.22, y: y + 0.02, w: 1.48, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14, bold: true, color: f[3], margin: 0 });
    slide.addText(f[2], { x: 9.22, y: y + 0.38, w: 2.8, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.2, bold: true, color: C.ink, margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 8.46, y: 6.22, w: 3.82, h: 0.52, rectRadius: 0.04, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("DISEÑAR TAMBIÉN ES RESOLVER", { x: 8.7, y: 6.4, w: 3.34, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 9.6, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Dar espacio a la intervención breve del estudiante colaborador con experiencia en Blender. Orientar su explicación hacia decisiones concretas: medidas, encaje, orientación del sensor, acceso y protección.");
}

// 61 · PCB
{
  const slide = pptx.addSlide();
  addHeader(slide, "Del prototipo a una placa propia", "La PCB aparece al final de la comprensión, no al comienzo", "Primero se prueba y corrige el circuito. Después se integra para hacerlo compacto y reproducible.", 61);
  slide.addShape(SH.roundRect, { x: 0.66, y: 2.02, w: 5.1, h: 4.54, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.cyan, pt: 1.2 } });
  addImageCrop(slide, IMG.prototypeLandscape, 0.84, 2.2, 4.74, 2.42);
  pill(slide, "PROTOTIPO", 0.96, 4.82, 1.18, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 8.8 });
  slide.addText("Cambiar · medir · corregir", { x: 2.34, y: 4.86, w: 2.94, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 13.6, bold: true, color: C.navy, margin: 0 });
  slide.addText("La protoboard mantiene el circuito flexible mientras todavía estamos aprendiendo.", { x: 1.02, y: 5.54, w: 4.4, h: 0.48, fontFace: TYPOGRAPHY.body, fontSize: 11.3, color: C.ink, align: "center", margin: 0 });
  slide.addShape(SH.chevron, { x: 5.98, y: 3.78, w: 0.72, h: 0.74, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addShape(SH.roundRect, { x: 6.94, y: 2.02, w: 5.72, h: 4.54, rectRadius: 0.06, fill: { color: C.navyDeep }, line: { color: C.red, pt: 1.2 } });
  addImageCrop(slide, IMG.pcbRender, 7.14, 2.2, 5.32, 2.42);
  pill(slide, "PCB", 7.26, 4.82, 0.82, { fill: C.red, line: C.red, color: C.white, fontSize: 8.8 });
  slide.addText("Integrar · ordenar · reproducir", { x: 8.3, y: 4.86, w: 3.72, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 13.6, bold: true, color: C.white, margin: 0 });
  slide.addText("La placa propia conserva un circuito que ya fue entendido, probado y documentado.", { x: 7.38, y: 5.54, w: 4.84, h: 0.48, fontFace: TYPOGRAPHY.body, fontSize: 11.3, color: C.gold, align: "center", margin: 0 });
  slide.addText("Profesionalizar es reducir incertidumbre, no esconderla.", { x: 2.46, y: 6.84, w: 8.44, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14.2, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Explicar que el diseño de una PCB es una etapa de integración. No sugerir que los equipos deban fabricar una durante el taller. Mostrarla como una proyección para circuitos ya validados.");
}

// 62 · Elegir el próximo hito
{
  const slide = pptx.addSlide();
  addHeader(slide, "Próximo hito", "No intenten avanzar en todo: elijan qué evidencia necesitan después", "Un hito debe ser pequeño, demostrable y suficientemente importante para cambiar el proyecto.", 62);
  const milestones = [
    ["A", "LECTURA", "hacer confiable el sensor", IMG.hcSr04, C.cyan],
    ["B", "RESPUESTA", "activar una luz o alerta", IMG.ky011, C.red],
    ["C", "SOFTWARE", "mostrar el dato con claridad", IMG.dashboard, C.green],
    ["D", "FORMA", "proteger y montar", IMG.blender, C.gold],
  ];
  milestones.forEach((m, i) => {
    const x = 0.66 + i * 3.16;
    slide.addShape(SH.roundRect, { x, y: 2.04, w: 2.84, h: 4.48, rectRadius: 0.06, fill: { color: i === 2 ? C.navyDeep : C.white }, line: { color: m[4], pt: 1.2 } });
    pill(slide, m[0], x + 0.18, 2.24, 0.52, { fill: m[4], line: m[4], color: m[4] === C.gold ? C.navyDeep : C.white, fontSize: 8.8 });
    addImageCrop(slide, m[3], x + 0.18, 2.92, 2.48, 1.58);
    slide.addText(m[1], { x: x + 0.22, y: 4.82, w: 2.4, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 15.6, bold: true, color: i === 2 ? C.white : C.navy, align: "center", margin: 0 });
    slide.addText(m[2], { x: x + 0.28, y: 5.38, w: 2.28, h: 0.48, fontFace: TYPOGRAPHY.body, fontSize: 11, bold: true, color: i === 2 ? C.gold : C.ink, align: "center", margin: 0 });
  });
  slide.addText("Nuestro próximo hito será demostrable cuando…", { x: 2.64, y: 6.84, w: 8.06, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.red, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Cada equipo elige solamente un próximo hito. Software es una opción válida cuando ya existe una lectura o una fuente de datos definida. La forma puede planificarse antes, pero debe basarse en medidas y componentes reales.");
}

// 63 · Ficha de propuesta
{
  const slide = pptx.addSlide();
  addHeader(slide, "Ficha de propuesta tecnológica", "Registrar permite continuar sin volver a empezar", "La ficha conserva las decisiones del equipo y convierte la idea en un plan que puede revisarse.", 63);
  slide.addShape(SH.roundRect, { x: 0.68, y: 1.94, w: 11.98, h: 4.98, rectRadius: 0.04, fill: { color: C.softBlue }, line: { color: C.navy, pt: 1.1 } });
  slide.addShape(SH.rect, { x: 0.68, y: 1.94, w: 11.98, h: 0.48, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("PROPUESTA TECNOLÓGICA INICIAL", { x: 0.98, y: 2.1, w: 4.04, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 12.4, bold: true, color: C.white, margin: 0 });
  pill(slide, "RUMBO A LA COMPETENCIA", 10.04, 2.06, 2.18, { fill: C.red, line: C.red, color: C.white, fontSize: 8.1 });
  const fields = [
    ["NOMBRE DEL PROYECTO", 0.94, 2.66, 3.46, C.navy],
    ["PROBLEMA + CONTEXTO", 4.58, 2.66, 3.46, C.red],
    ["A QUIÉN APORTA", 8.22, 2.66, 3.98, C.amber],
    ["VARIABLE + SENSOR", 0.94, 3.78, 3.46, C.green],
    ["CUANDO… ENTONCES…", 4.58, 3.78, 3.46, C.blue],
    ["EVIDENCIA ACTUAL", 8.22, 3.78, 3.98, C.red],
    ["NIVEL DE MADUREZ", 0.94, 4.9, 3.46, C.amber],
    ["PRÓXIMO HITO", 4.58, 4.9, 3.46, C.green],
    ["APORTE PROPIO DEL EQUIPO", 8.22, 4.9, 3.98, C.navy],
  ];
  fields.forEach((f) => {
    slide.addShape(SH.roundRect, { x: f[1], y: f[2], w: f[3], h: 0.88, rectRadius: 0.035, fill: { color: C.white }, line: { color: "C7D0DB", pt: 1 } });
    slide.addShape(SH.rect, { x: f[1], y: f[2], w: f[3], h: 0.3, fill: { color: f[4] }, line: { color: f[4] } });
    slide.addText(f[0], { x: f[1] + 0.14, y: f[2] + 0.09, w: f[3] - 0.28, h: 0.14, fontFace: TYPOGRAPHY.mono, fontSize: 8.7, bold: true, color: C.white, margin: 0 });
    slide.addShape(SH.line, { x: f[1] + 0.18, y: f[2] + 0.67, w: f[3] - 0.36, h: 0, line: { color: C.border, pt: 1.15 } });
  });
  slide.addShape(SH.roundRect, { x: 2.18, y: 6.12, w: 8.98, h: 0.52, rectRadius: 0.04, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("Una ficha clara permite recibir mejores preguntas y aprovechar mejor una mentoría.", { x: 2.46, y: 6.3, w: 8.42, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 10.6, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Mantener la ficha proyectada mientras los equipos completan o revisan su registro. Pedir frases breves y decisiones verificables, no descripciones extensas. El aporte propio puede ser una adaptación, una regla, una interfaz o un contexto distinto.");
}

// 64 · Criterios de solidez
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("RUMBO A LA COMPETENCIA", { x: 0.74, y: 0.5, w: 4.2, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.35, color: C.red, margin: 0 });
  slide.addText("¿Qué vuelve sólida una propuesta?", { x: 0.74, y: 0.94, w: 8.7, h: 0.56, fontFace: TYPOGRAPHY.display, fontSize: 29, bold: true, color: C.white, margin: 0 });
  slide.addText("El referente es alto, pero cada avance debe poder demostrarse y explicarse.", { x: 0.78, y: 1.6, w: 8.4, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 13.3, color: "D8E7F5", margin: 0 });
  const solid = [
    ["01", "RELEVANCIA", "problema que importa", C.red],
    ["02", "COHERENCIA", "sensor, dato y respuesta", C.cyan],
    ["03", "EVIDENCIA", "pruebas y mejoras", C.gold],
    ["04", "DESARROLLO", "capas con propósito", C.green],
    ["05", "COMUNICACIÓN", "explicar y defender", C.red],
  ];
  solid.forEach((s, i) => {
    const x = 0.74 + i * 2.48;
    slide.addShape(SH.roundRect, { x, y: 2.62, w: 2.16, h: 2.84, rectRadius: 0.06, fill: { color: "12385E" }, line: { color: s[3], pt: 1.3 } });
    slide.addShape(SH.ellipse, { x: x + 0.66, y: 2.94, w: 0.84, h: 0.84, fill: { color: s[3] }, line: { color: s[3] } });
    slide.addText(s[0], { x: x + 0.66, y: 2.94, w: 0.84, h: 0.84, fontFace: TYPOGRAPHY.display, fontSize: 12, bold: true, color: s[3] === C.gold ? C.navyDeep : C.white, align: "center", valign: "mid", margin: 0 });
    slide.addText(s[1], { x: x + 0.2, y: 4.06, w: 1.76, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 12.2, bold: true, color: s[3], align: "center", margin: 0 });
    slide.addText(s[2], { x: x + 0.24, y: 4.54, w: 1.68, h: 0.4, fontFace: TYPOGRAPHY.body, fontSize: 10.1, bold: true, color: C.white, align: "center", margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 1.62, y: 5.92, w: 10.08, h: 0.68, rectRadius: 0.05, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("Si superan el referente, la diferencia debe verse en la evidencia.", { x: 1.94, y: 6.14, w: 9.44, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 14.6, bold: true, color: C.navyDeep, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Presentar estos criterios como brújula para desarrollar y comunicar, no como una premiación dentro del taller. Reforzar que el trabajo sostenido permite acumular iteraciones y evidencia antes del evento final.");
}

// 65 · Pitch relámpago
{
  const slide = pptx.addSlide();
  addHeader(slide, "Presentación relámpago", "40 segundos para hacer comprensible el punto de partida", "No expliquen todo: conecten problema, sensor, regla, evidencia y próximo hito.", 65);
  slide.addShape(SH.roundRect, { x: 0.62, y: 1.98, w: 3.06, h: 4.94, rectRadius: 0.06, fill: { color: C.navyDeep }, line: { color: C.navyDeep } });
  slide.addText("00:40", { x: 0.88, y: 2.38, w: 2.54, h: 0.82, fontFace: TYPOGRAPHY.display, fontSize: 42, bold: true, color: C.gold, align: "center", margin: 0 });
  addImageContain(slide, IMG.pitchMic, 1.36, 3.54, 1.54, 1.86);
  pill(slide, "PITCH DEL EQUIPO", 1.12, 5.34, 2.06, { fill: C.red, line: C.red, color: C.white, fontSize: 8.7 });
  slide.addText("UNA IDEA\nUNA EVIDENCIA\nUN SIGUIENTE PASO", { x: 0.98, y: 5.94, w: 2.34, h: 0.72, fontFace: TYPOGRAPHY.body, fontSize: 10.4, bold: true, color: C.cyan, align: "center", margin: 0 });
  slide.addShape(SH.roundRect, { x: 4.02, y: 1.98, w: 8.64, h: 4.94, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.cyan, pt: 1.2 } });
  slide.addText("“Somos el equipo ____________.”", { x: 4.46, y: 2.34, w: 7.62, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.navy, margin: 0 });
  const pitchLines = [
    ["PROBLEMA", "Queremos abordar…", C.red],
    ["VARIABLE", "Mediremos… con el sensor…", C.cyan],
    ["REGLA", "Cuando… entonces…", C.gold],
    ["EVIDENCIA", "Hoy comprobamos / necesitamos comprobar…", C.green],
    ["HITO", "Nuestro próximo avance demostrable será…", C.red],
  ];
  pitchLines.forEach((p, i) => {
    const y = 3.06 + i * 0.66;
    slide.addText(p[0], { x: 4.48, y, w: 1.18, h: 0.18, fontFace: TYPOGRAPHY.mono, fontSize: 8.9, bold: true, color: p[2], margin: 0 });
    slide.addText(p[1], { x: 5.9, y: y - 0.02, w: 5.98, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.7, bold: true, color: C.ink, margin: 0 });
    slide.addShape(SH.line, { x: 5.9, y: y + 0.38, w: 5.94, h: 0, line: { color: C.border, pt: 1 } });
  });
  slide.addText("Después de cada pitch: una pregunta que ayude a precisar, no a resolver por el equipo.", { x: 4.72, y: 6.48, w: 7.18, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10.8, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Dar entre 30 y 40 segundos por equipo. Formular una sola pregunta de contraste. No abrir una asesoría completa ni corregir todas las decisiones durante el pitch; el objetivo es hacer visible el punto de partida.");
}

// 66 · Trabajo autónomo y mentorías
{
  const slide = pptx.addSlide();
  addHeader(slide, "Cómo aprovechar las mentorías", "Llegar con trabajo permite recibir ayuda más precisa", "La mentoría orienta, revisa y destraba. El desarrollo continúa en el tiempo del equipo.", 66);
  const before = [
    ["01", "TRAER EVIDENCIA", "foto, lectura, prueba o error"],
    ["02", "TRAER UNA PREGUNTA", "qué necesitan comprender"],
    ["03", "TRAER UN INTENTO", "qué probaron y qué ocurrió"],
  ];
  slide.addShape(SH.roundRect, { x: 0.66, y: 2.02, w: 5.06, h: 4.62, rectRadius: 0.06, fill: { color: C.navyDeep }, line: { color: C.cyan, pt: 1.2 } });
  slide.addText("ANTES DE LA MENTORÍA", { x: 1.0, y: 2.38, w: 3.2, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.cyan, margin: 0 });
  before.forEach((b, i) => {
    const y = 3.12 + i * 0.92;
    numberBadge(slide, b[0], 1.02, y, i === 1 ? C.gold : C.cyan);
    slide.addText(b[1], { x: 1.78, y: y + 0.02, w: 2.74, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 12.6, bold: true, color: C.white, margin: 0 });
    slide.addText(b[2], { x: 1.78, y: y + 0.34, w: 2.76, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10.4, color: "D8E7F5", margin: 0 });
  });
  pill(slide, "EL EQUIPO CONSTRUYE", 1.02, 5.96, 2.2, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 8.8 });
  slide.addShape(SH.chevron, { x: 5.98, y: 3.78, w: 0.72, h: 0.72, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addShape(SH.roundRect, { x: 6.94, y: 2.02, w: 5.72, h: 4.62, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.red, pt: 1.2 } });
  slide.addText("DURANTE LA MENTORÍA", { x: 7.3, y: 2.38, w: 3.24, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.red, margin: 0 });
  const during = [
    ["ORIENTAR", "ver el problema desde otro ángulo", C.red],
    ["REVISAR", "contrastar seguridad y evidencia", C.cyan],
    ["DESTRABAR", "encontrar el siguiente intento", C.gold],
  ];
  during.forEach((d, i) => {
    const y = 3.12 + i * 0.92;
    slide.addShape(SH.roundRect, { x: 7.34, y, w: 4.8, h: 0.68, rectRadius: 0.04, fill: { color: i % 2 ? C.softBlue : C.white }, line: { color: d[2], pt: 1 } });
    slide.addText(d[0], { x: 7.58, y: y + 0.18, w: 1.28, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 12.5, bold: true, color: d[2], margin: 0 });
    slide.addText(d[1], { x: 8.94, y: y + 0.16, w: 2.84, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.ink, margin: 0 });
  });
  pill(slide, "LA MENTORÍA ACELERA", 7.34, 5.96, 2.3, { fill: C.red, line: C.red, color: C.white, fontSize: 8.8 });
  slide.addText("Más trabajo autónomo → mejores preguntas → mentorías más útiles → más evidencia", { x: 1.8, y: 6.84, w: 9.74, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 13.8, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Aclarar la dinámica de continuidad. Una mentoría no reemplaza el tiempo de desarrollo. Los equipos obtendrán más valor si llegan con evidencia, una pregunta y un intento concreto.");
}

// 67 · Cierre de la clase
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addTopBars(slide, [C.red, C.cyan, C.gold]);
  addInstitutionalLockup(slide, { white: true });
  slide.addText("CIERRE DEL TALLER 3", { x: 0.74, y: 0.5, w: 4.2, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, charSpacing: 1.35, color: C.cyan, margin: 0 });
  slide.addText("GeoGreen demuestra hasta dónde puede crecer una idea.", { x: 0.74, y: 0.98, w: 10.56, h: 0.72, fontFace: TYPOGRAPHY.display, fontSize: 31, bold: true, color: C.white, margin: 0 });
  slide.addText("Hoy comienza la de ustedes.", { x: 0.74, y: 1.78, w: 7.4, h: 0.54, fontFace: TYPOGRAPHY.display, fontSize: 27, bold: true, color: C.gold, margin: 0 });
  const recap = [
    ["01", "SENSAR", "convertir un fenómeno en datos", C.cyan],
    ["02", "PROBAR", "avanzar con seguridad y evidencia", C.red],
    ["03", "VISUALIZAR", "hacer los datos comprensibles", C.green],
    ["04", "MEJORAR", "integrar solamente lo que aporta", C.gold],
  ];
  recap.forEach((r, i) => {
    const x = 0.82 + i * 3.12;
    slide.addShape(SH.roundRect, { x, y: 3.02, w: 2.64, h: 1.62, rectRadius: 0.05, fill: { color: "12385E" }, line: { color: r[3], pt: 1.2 } });
    numberBadge(slide, r[0], x + 0.22, 3.3, r[3]);
    slide.addText(r[1], { x: x + 0.98, y: 3.38, w: 1.38, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 13.5, bold: true, color: r[3], margin: 0 });
    slide.addText(r[2], { x: x + 0.26, y: 4.02, w: 2.12, h: 0.36, fontFace: TYPOGRAPHY.body, fontSize: 10.2, bold: true, color: C.white, align: "center", margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 1.26, y: 5.18, w: 10.82, h: 0.96, rectRadius: 0.05, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText("Nuestra propuesta avanzará cuando podamos demostrar que ____________________.", { x: 1.62, y: 5.52, w: 10.1, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 16.4, bold: true, color: C.navyDeep, align: "center", margin: 0 });
  slide.addText("El taller entrega herramientas. El trabajo sostenido convierte la intención en proyecto.", { x: 1.72, y: 6.58, w: 9.88, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 13.2, bold: true, color: C.white, align: "center", margin: 0 });
  addNotesAndValidate(slide, "Cerrar recuperando los cuatro aprendizajes y pedir que cada equipo complete la frase final. Reforzar que el desafío continúa con trabajo autónomo, mentorías de orientación y una presentación final respaldada por evidencia.");
}

(async () => {
  await pptx.writeFile({ fileName: outputPptx });
  console.log(`PPTX generado: ${outputPptx}`);
  console.log(`Diapositivas: ${pptx._slides.length}`);
})();
