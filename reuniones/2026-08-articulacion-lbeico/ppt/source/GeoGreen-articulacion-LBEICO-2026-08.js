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

const { applyAiepTheme, TYPOGRAPHY } = slidesSystem.theme;
const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
applyAiepTheme(pptx, {
  author: "GeoGreen Escolar Osorno",
  company: "AIEP Osorno",
  subject: "Articulación con el Liceo Bicentenario de Excelencia Instituto Comercial de Osorno",
  title: "GeoGreen Escolar 2026 · Articulación AIEP Osorno y LBEICO",
});

const SH = pptx.ShapeType;
const W = 13.333;
const H = 7.5;
const rootDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "../../../..");
const outputPptx = path.join(rootDir, "GeoGreen-articulacion-LBEICO-2026-08.pptx");

const C = {
  navy: "082B5C",
  navyDeep: "031D3B",
  blue: "1D4E89",
  cyan: "35B7C6",
  red: "D62027",
  paper: "F5F2EC",
  white: "FFFFFF",
  ink: "182B3A",
  slate: "5F6B7A",
  border: "D8DEE6",
  softBlue: "E9EEF4",
  gold: "E0BC5A",
  green: "2E8B57",
  greenSoft: "E5F3EA",
  paleInk: "D8E7F5",
};

const IMG = {
  lockup: path.join(repoRoot, "reuniones", "2026-06-22-socio-comunitario", "assets", "lockup-vinculacion-dark.png"),
  lockupW: path.join(repoRoot, "reuniones", "2026-06-22-socio-comunitario", "assets", "lockup-vinculacion-white.png"),
  students: path.join(repoRoot, "talleres", "03", "media", "generadas", "apertura-estudiantes-innovacion-geogreen.png"),
  socialCover: path.join(repoRoot, "docs", "rrss", "geogreen-escolar-2026", "publicaciones", "assets", "fondo-01-portada-gptimage.png"),
  prototype: path.join(repoRoot, "talleres", "03", "media", "fotos", "prototipo-oled-geogreen-landscape.png"),
  prototypeVideo: path.join(repoRoot, "talleres", "03", "media", "videos", "prototipo-fisico-funcionando-2026-06-21.mp4"),
  prototypePoster: path.join(__dirname, "assets", "poster-prototipo-funcionando.jpg"),
  dashboard: path.join(__dirname, "assets", "dashboard-geogreen-ruta-osorno-1920x1080.png"),
  pcbVideo: path.join(repoRoot, "talleres", "03", "media", "videos", "pcb-v1-kicad-2026-07-02.mp4"),
  pcbPoster: path.join(repoRoot, "talleres", "03", "media", "fotos", "pcb-v1-kicad-2026-07-02.jpeg"),
  pcbRender: path.join(repoRoot, "geogreen-v1", "hardware", "kicad", "exports", "geogreen-v1-product-render.jpg"),
  caseVideo: path.join(repoRoot, "talleres", "03", "media", "videos", "render-carcasa-3d-felipe.mp4"),
  casePoster: path.join(repoRoot, "talleres", "03", "media", "fotos", "render-carcasa-3d-felipe-poster.jpg"),
  competition: path.join(repoRoot, "talleres", "03", "media", "generadas", "cierre-competencia-prototipos-jurado.png"),
  lbeicoFacade: path.join(__dirname, "assets", "fachada-lbeico-soychile-2021.jpg"),
};

function addImageCrop(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({ path: imagePath, ...imageSizingCrop(imagePath, x, y, w, h), ...opts });
}

function addImageContain(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({ path: imagePath, ...imageSizingContain(imagePath, x, y, w, h), ...opts });
}

function imageFileToDataUri(imagePath, mimeType = "image/jpeg") {
  return `data:${mimeType};base64,${fs.readFileSync(imagePath).toString("base64")}`;
}

function addTopBars(slide, colors = [C.red, C.cyan, C.gold]) {
  const widths = [0.78, 0.44, 0.22];
  let x = 0;
  colors.forEach((color, index) => {
    slide.addShape(SH.rect, { x, y: 0, w: widths[index], h: 0.12, fill: { color }, line: { color } });
    x += widths[index] + 0.08;
  });
}

function addLockup(slide, { white = false, x = 11.3, y = 0.18, w = 1.68, h = 1.03, panel = false } = {}) {
  if (panel) {
    slide.addShape(SH.roundRect, {
      x: x - 0.12, y: y - 0.05, w: w + 0.24, h: h + 0.1,
      rectRadius: 0.04,
      fill: { color: white ? C.navyDeep : C.white, transparency: 6 },
      line: { color: white ? C.navyDeep : C.white, transparency: 100 },
    });
  }
  addImageContain(slide, white ? IMG.lockupW : IMG.lockup, x, y, w, h);
}

function addPartnerMark(slide, { white = false, x = 0.74, y = 6.92, w = 5.4 } = {}) {
  slide.addText("LBEICO  ×  AIEP OSORNO", {
    x, y, w, h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    bold: true,
    charSpacing: 1.1,
    color: white ? C.paleInk : C.slate,
    margin: 0,
  });
}

function addFooter(slide, number, { white = false } = {}) {
  addPartnerMark(slide, { white });
  slide.addText(String(number).padStart(2, "0"), {
    x: 11.85, y: 6.9, w: 0.75, h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12,
    bold: true,
    color: white ? C.paleInk : C.slate,
    align: "right",
    margin: 0,
  });
}

function addHeader(slide, kicker, title, subtitle, number, opts = {}) {
  slide.background = { color: opts.background ?? C.paper };
  addTopBars(slide, opts.bars);
  slide.addText(kicker.toUpperCase(), {
    x: 0.72, y: 0.34, w: 6.4, h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    charSpacing: 1.2,
    color: opts.kickerColor ?? C.red,
    margin: 0,
  });
  slide.addText(title, {
    x: 0.72, y: 0.7, w: opts.titleW ?? 10.1, h: opts.titleH ?? 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.titleFontSize ?? 27,
    bold: true,
    color: opts.titleColor ?? C.navy,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.74, y: opts.subtitleY ?? 1.36, w: opts.subtitleW ?? 10.2, h: opts.subtitleH ?? 0.38,
      fontFace: TYPOGRAPHY.body,
      fontSize: opts.subtitleFontSize ?? 14,
      color: opts.subtitleColor ?? C.slate,
      margin: 0,
    });
  }
  addLockup(slide);
  addFooter(slide, number);
}

function addPill(slide, text, x, y, w, opts = {}) {
  const h = opts.h ?? 0.4;
  slide.addShape(SH.roundRect, {
    x, y, w, h, rectRadius: 0.05,
    fill: { color: opts.fill ?? C.white, transparency: opts.transparency ?? 0 },
    line: { color: opts.line ?? opts.fill ?? C.border, pt: opts.linePt ?? 1 },
  });
  slide.addText(text, {
    x: x + 0.1, y: y + 0.04, w: w - 0.2, h: h - 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.fontSize ?? 10,
    bold: opts.bold ?? true,
    color: opts.color ?? C.navy,
    align: "center",
    valign: "mid",
    margin: 0,
  });
}

function addTakeaway(slide, text, { y = 6.2, fill = C.navy, color = C.white, x = 0.82, w = 11.7 } = {}) {
  slide.addShape(SH.roundRect, {
    x, y, w, h: 0.58, rectRadius: 0.04,
    fill: { color: fill }, line: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.25, y: y + 0.13, w: w - 0.5, h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.2,
    bold: true,
    color,
    align: "center",
    margin: 0,
  });
}

function addNotesAndValidate(slide, notes, opts = {}) {
  if (notes) slide.addNotes(notes);
  if (!opts.skipOverlap) {
    warnIfSlideHasOverlaps(slide, pptx, {
      muteContainment: true,
      ignoreLines: opts.ignoreLines ?? false,
      ignoreDecorativeShapes: true,
    });
  }
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

// 01 · Portada institucional
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addImageCrop(slide, IMG.students, 6.6, 0, 6.73, H);
  slide.addShape(SH.rect, {
    x: 5.9, y: 0, w: 2.35, h: H,
    fill: { color: C.navyDeep, transparency: 18 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true });
  addPill(slide, "ARTICULACIÓN INSTITUCIONAL · 2026", 0.78, 0.66, 3.32, {
    fill: C.red, line: C.red, color: C.white, fontSize: 10.2,
  });
  slide.addText("GeoGreen\nEscolar 2026", {
    x: 0.78, y: 1.42, w: 5.55, h: 1.5,
    fontFace: TYPOGRAPHY.display,
    fontSize: 35,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
  });
  slide.addText("Talento técnico-profesional que transforma problemas reales en soluciones visibles.", {
    x: 0.82, y: 3.3, w: 4.95, h: 1.02,
    fontFace: TYPOGRAPHY.body,
    fontSize: 19,
    bold: true,
    color: C.paleInk,
    margin: 0,
  });
  slide.addShape(SH.line, { x: 0.82, y: 4.68, w: 1.02, h: 0, line: { color: C.cyan, pt: 4 } });
  slide.addText("Liceo Bicentenario de Excelencia Instituto Comercial de Osorno\nAIEP Osorno · Vinculación con el Medio", {
    x: 0.82, y: 4.98, w: 5.25, h: 0.74,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13,
    color: C.white,
    margin: 0,
  });
  addPartnerMark(slide, { white: true });
  addNotesAndValidate(slide, "GeoGreen Escolar se presenta como una experiencia conjunta: el liceo aporta su trayectoria técnico-profesional y el conocimiento de sus estudiantes; AIEP aporta acompañamiento interdisciplinario y una ruta para convertir ideas en soluciones demostrables.", { skipOverlap: true });
}

// 02 · Declaración de oportunidad
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addImageCrop(slide, IMG.socialCover, 7.48, 0, 5.85, H);
  slide.addShape(SH.rect, {
    x: 6.66, y: 0, w: 2.2, h: H,
    fill: { color: C.navyDeep, transparency: 12 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true });
  addPill(slide, "UNA OPORTUNIDAD FORMATIVA", 0.78, 0.62, 2.78, {
    fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 10.1,
  });
  slide.addText("El liceo ya forma talento.", {
    x: 0.78, y: 1.5, w: 5.95, h: 0.58,
    fontFace: TYPOGRAPHY.display,
    fontSize: 29,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("GeoGreen abre un nuevo escenario para ponerlo en acción.", {
    x: 0.78, y: 2.2, w: 5.95, h: 1.04,
    fontFace: TYPOGRAPHY.display,
    fontSize: 29,
    bold: true,
    color: C.cyan,
    margin: 0,
  });
  const anchors = [
    { x: 0.82, n: "01", title: "TERRITORIO", body: "Problemas ambientales cercanos.", color: C.red },
    { x: 2.78, n: "02", title: "TECNOLOGÍA", body: "Ideas que se prueban y mejoran.", color: C.cyan },
    { x: 4.74, n: "03", title: "FUTURO", body: "Competencias que se proyectan.", color: C.gold },
  ];
  anchors.forEach((a) => {
    slide.addText(a.n, {
      x: a.x, y: 4.0, w: 0.52, h: 0.34,
      fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: a.color, align: "center", margin: 0,
    });
    slide.addShape(SH.line, { x: a.x + 0.6, y: 4.16, w: 0.94, h: 0, line: { color: a.color, pt: 2 } });
    slide.addText(a.title, {
      x: a.x, y: 4.56, w: 1.62, h: 0.26,
      fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: C.white, align: "center", margin: 0,
    });
    slide.addText(a.body, {
      x: a.x - 0.02, y: 4.98, w: 1.68, h: 0.58,
      fontFace: TYPOGRAPHY.body, fontSize: 11.6, color: C.paleInk, align: "center", margin: 0,
    });
  });
  slide.addText("Una experiencia donde el aprendizaje se vuelve visible.", {
    x: 0.82, y: 6.18, w: 5.6, h: 0.42,
    fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.white, margin: 0,
  });
  addFooter(slide, 2, { white: true });
  addNotesAndValidate(slide, "La propuesta no reemplaza lo que el establecimiento ya realiza. Agrega un desafío situado donde los estudiantes pueden aplicar conocimientos, tomar decisiones, construir evidencias y mostrar públicamente lo aprendido.", { skipOverlap: true });
}

// 03 · Encaje con la formación TP
{
  const slide = pptx.addSlide();
  addHeader(slide, "Formación técnico-profesional", "El estudiante TP está en el centro", "GeoGreen combina autonomía, aplicación práctica, acompañamiento y proyección.", 3, { titleW: 9.7 });

  // Núcleo visual: una sola línea permite centrar el concepto con precisión.
  slide.addShape(SH.ellipse, {
    x: 0.92, y: 2.12, w: 3.9, h: 3.9,
    fill: { color: C.white }, line: { color: C.softBlue, pt: 1.2 },
  });
  slide.addShape(SH.ellipse, {
    x: 1.18, y: 2.38, w: 3.38, h: 3.38,
    fill: { color: C.navy }, line: { color: C.gold, pt: 3 },
    shadow: { type: "outer", color: "7D8B9D", opacity: 0.2, blur: 2, angle: 45, distance: 1.5 },
  });
  slide.addText("ESTUDIANTE TP", {
    x: 1.48, y: 3.76, w: 2.78, h: 0.42,
    fontFace: TYPOGRAPHY.display, fontSize: 18.5, bold: true, color: C.white,
    align: "center", valign: "mid", margin: 0,
  });
  slide.addText("DECIDE · CONSTRUYE · DEMUESTRA", {
    x: 1.48, y: 4.37, w: 2.78, h: 0.24,
    fontFace: TYPOGRAPHY.body, fontSize: 8.9, bold: true, charSpacing: 0.8,
    color: C.cyan, align: "center", margin: 0,
  });
  const orbit = [
    { x: 1.0, y: 2.48, n: "01", color: C.red },
    { x: 4.08, y: 2.48, n: "02", color: C.cyan },
    { x: 1.0, y: 5.12, n: "03", color: C.gold },
    { x: 4.08, y: 5.12, n: "04", color: C.green },
  ];
  orbit.forEach((o) => {
    slide.addShape(SH.ellipse, {
      x: o.x, y: o.y, w: 0.62, h: 0.62,
      fill: { color: o.color }, line: { color: C.paper, pt: 2 },
    });
    slide.addText(o.n, {
      x: o.x, y: o.y + 0.08, w: 0.62, h: 0.28,
      fontFace: TYPOGRAPHY.display, fontSize: 10.8, bold: true,
      color: o.color === C.gold ? C.navyDeep : C.white,
      align: "center", valign: "mid", margin: 0,
    });
  });
  const pillars = [
    { y: 2.06, n: "01", title: "PROTAGONISMO", body: "Observa, propone y toma decisiones.", color: C.red },
    { y: 3.08, n: "02", title: "APLICACIÓN PRÁCTICA", body: "Integra conocimientos en un desafío real.", color: C.cyan },
    { y: 4.1, n: "03", title: "ACOMPAÑAMIENTO", body: "Recibe orientación sin perder autonomía.", color: C.gold },
    { y: 5.12, n: "04", title: "PROYECCIÓN", body: "Comunica capacidades y abre posibilidades.", color: C.green },
  ];
  pillars.forEach((p) => {
    slide.addShape(SH.line, { x: 5.23, y: p.y + 0.82, w: 6.95, h: 0, line: { color: p.color, pt: 1.4 } });
    slide.addShape(SH.rect, { x: 5.23, y: p.y + 0.1, w: 0.09, h: 0.64, fill: { color: p.color }, line: { color: p.color } });
    slide.addText(p.n, {
      x: 5.55, y: p.y + 0.12, w: 0.58, h: 0.34,
      fontFace: TYPOGRAPHY.display, fontSize: 16.5, bold: true, color: p.color, align: "center", margin: 0,
    });
    slide.addText(p.title, {
      x: 6.38, y: p.y + 0.1, w: 2.85, h: 0.3,
      fontFace: TYPOGRAPHY.display, fontSize: 14.2, bold: true, color: C.navy, margin: 0,
    });
    slide.addText(p.body, {
      x: 6.38, y: p.y + 0.48, w: 5.68, h: 0.25,
      fontFace: TYPOGRAPHY.body, fontSize: 11.4, color: C.slate, margin: 0,
    });
  });
  addTakeaway(slide, "La tecnología es el medio; el desarrollo de capacidades es el propósito.", { y: 6.22 });
  addNotesAndValidate(slide, "GeoGreen combina protagonismo, aplicación práctica, acompañamiento y proyección. El centro no es reproducir un artefacto: es que cada estudiante participe en decisiones y pueda demostrar lo que aprendió.", { skipOverlap: true });
}

// 04 · Recorrido formativo
{
  const slide = pptx.addSlide();
  addHeader(slide, "Recorrido de aprendizaje", "De un problema cercano a una solución visible", "Cada etapa agrega una decisión, una evidencia y una nueva capacidad al trabajo del equipo.", 4);
  const steps = [
    { x: 0.82, y: 4.58, n: "01", verb: "OBSERVAR", body: "una situación del entorno", color: C.red },
    { x: 2.78, y: 4.03, n: "02", verb: "COMPRENDER", body: "causas, actores y materiales", color: "B84A4F" },
    { x: 4.74, y: 3.48, n: "03", verb: "IDEAR", body: "una respuesta pertinente", color: C.gold },
    { x: 6.7, y: 2.93, n: "04", verb: "CONSTRUIR", body: "un prototipo mínimo", color: C.cyan },
    { x: 8.66, y: 2.38, n: "05", verb: "DEMOSTRAR", body: "datos y evidencia", color: C.blue },
    { x: 10.62, y: 1.83, n: "06", verb: "COMUNICAR", body: "valor y aprendizaje", color: C.green },
  ];
  steps.forEach((s, index) => {
    if (index < steps.length - 1) {
      const next = steps[index + 1];
      slide.addShape(SH.line, {
        x: s.x + 1.5, y: next.y + 0.78,
        w: next.x - s.x - 1.42, h: s.y - next.y,
        flipV: true,
        line: { color: C.border, pt: 4, endArrowType: "triangle" },
      });
    }
    slide.addShape(SH.roundRect, {
      x: s.x, y: s.y, w: 1.62, h: 1.55, rectRadius: 0.05,
      fill: { color: C.white }, line: { color: s.color, pt: 1.6 },
      shadow: { type: "outer", color: "A9B2BE", opacity: 0.15, blur: 1.2, angle: 45, distance: 1 },
    });
    slide.addShape(SH.ellipse, {
      x: s.x + 0.16, y: s.y + 0.18, w: 0.44, h: 0.44,
      fill: { color: s.color }, line: { color: s.color },
    });
    slide.addText(s.n, {
      x: s.x + 0.16, y: s.y + 0.21, w: 0.44, h: 0.28,
      fontFace: TYPOGRAPHY.display, fontSize: 10.6, bold: true,
      color: s.color === C.gold ? C.navyDeep : C.white,
      align: "center", valign: "mid", margin: 0,
    });
    slide.addText(s.verb, {
      x: s.x + 0.12, y: s.y + 0.72, w: 1.38, h: 0.25,
      fontFace: TYPOGRAPHY.display, fontSize: 11.4, bold: true, color: C.navy, align: "center", margin: 0,
    });
    slide.addText(s.body, {
      x: s.x + 0.12, y: s.y + 1.06, w: 1.38, h: 0.35,
      fontFace: TYPOGRAPHY.body, fontSize: 9.6, color: C.slate, align: "center", valign: "mid", margin: 0,
    });
  });
  slide.addShape(SH.arc, {
    x: 0.98, y: 1.22, w: 10.84, h: 5.18,
    adjustPoint: 0.25,
    rotate: 180,
    fill: { color: C.paper, transparency: 100 },
    line: { color: C.softBlue, pt: 1.2, transparency: 25 },
  });
  addTakeaway(slide, "El resultado final se construye paso a paso; no aparece solamente el día de la presentación.", { y: 6.24 });
  addNotesAndValidate(slide, "El recorrido parte en el entorno y termina en una propuesta comunicable. Talleres, trabajo autónomo y mentorías se ordenan sobre esta progresión para evitar actividades aisladas.", { ignoreLines: true, skipOverlap: true });
}

// 05 · Prototipo real en funcionamiento
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true });
  addPill(slide, "PROTOTIPO REAL · VIDEO", 0.78, 0.62, 2.5, { fill: C.red, line: C.red, color: C.white, fontSize: 10.1 });
  slide.addText("Cuando el entorno cambia,\nel sistema responde.", {
    x: 0.78, y: 1.38, w: 5.75, h: 1.15,
    fontFace: TYPOGRAPHY.display, fontSize: 31, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Una lectura física se convierte en porcentaje, señal visual y alerta.", {
    x: 0.82, y: 2.78, w: 5.35, h: 0.62,
    fontFace: TYPOGRAPHY.body, fontSize: 16.2, color: C.paleInk, margin: 0,
  });
  const reactions = [
    { y: 3.72, n: "01", title: "SENSOR", body: "mide distancia", color: C.red },
    { y: 4.28, n: "02", title: "PROGRAMA", body: "calcula nivel", color: C.cyan },
    { y: 4.84, n: "03", title: "SEMÁFORO", body: "muestra estado", color: C.gold },
    { y: 5.4, n: "04", title: "ALERTA", body: "activa respuesta", color: C.green },
  ];
  reactions.forEach((r) => {
    slide.addText(r.n, { x: 0.86, y: r.y, w: 0.46, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 11, bold: true, color: r.color, align: "center", margin: 0 });
    slide.addShape(SH.line, { x: 1.46, y: r.y + 0.13, w: 0.72, h: 0, line: { color: r.color, pt: 2 } });
    slide.addText(r.title, { x: 2.42, y: r.y - 0.01, w: 1.34, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 12.8, bold: true, color: C.white, margin: 0 });
    slide.addText(r.body, { x: 3.92, y: r.y, w: 1.72, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: C.paleInk, margin: 0 });
  });
  slide.addShape(SH.roundRect, {
    x: 7.34, y: 0.88, w: 3.5, h: 5.96, rectRadius: 0.05,
    fill: { color: C.white }, line: { color: C.cyan, pt: 2 },
    shadow: { type: "outer", color: "000000", opacity: 0.28, blur: 2, angle: 45, distance: 1.5 },
  });
  slide.addMedia({
    type: "video",
    path: IMG.prototypeVideo,
    cover: imageFileToDataUri(IMG.prototypePoster),
    x: 7.48, y: 1.02, w: 3.22, h: 5.68,
    objectName: "Video · prototipo GeoGreen funcionando",
  });
  addFooter(slide, 5, { white: true });
  addNotesAndValidate(slide, "Reproducir el video completo. Señalar la cadena visible: el sensor detecta el cambio, el programa calcula el porcentaje, el semáforo comunica el estado y el sistema puede activar una alerta.", { skipOverlap: true });
}

// 06 · Dashboard a escala completa
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addImageCrop(slide, IMG.dashboard, 0, 0, W, H);
  slide.addShape(SH.roundRect, {
    x: 0.62, y: 0.52, w: 6.42, h: 1.04, rectRadius: 0.04,
    fill: { color: C.navyDeep, transparency: 4 }, line: { color: C.navyDeep, transparency: 100 },
    shadow: { type: "outer", color: "000000", opacity: 0.2, blur: 1.5, angle: 45, distance: 1 },
  });
  addPill(slide, "DATOS · DECISIÓN · RUTA", 0.86, 0.7, 2.38, { fill: C.red, line: C.red, color: C.white, fontSize: 9.4, h: 0.34 });
  slide.addText("Una ruta de retiro sobre calles reales", {
    x: 0.86, y: 1.08, w: 5.88, h: 0.34,
    fontFace: TYPOGRAPHY.display, fontSize: 21.5, bold: true, color: C.white, margin: 0,
  });
  addLockup(slide, { panel: true, x: 11.1, y: 0.16, w: 1.72, h: 1.02 });
  slide.addShape(SH.roundRect, {
    x: 2.26, y: 6.58, w: 8.82, h: 0.56, rectRadius: 0.04,
    fill: { color: C.navyDeep, transparency: 4 }, line: { color: C.navyDeep, transparency: 100 },
  });
  slide.addText("Ruta por calles de Osorno · 6 paradas · 30,3 km · ~54 min", {
    x: 2.54, y: 6.72, w: 8.26, h: 0.24,
    fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: C.white, align: "center", margin: 0,
  });
  addPartnerMark(slide);
  slide.addText("06", {
    x: 10.38, y: 6.72, w: 0.42, h: 0.24,
    fontFace: TYPOGRAPHY.display, fontSize: 11.5, bold: true,
    color: C.white, align: "right", margin: 0,
  });
  addNotesAndValidate(slide, "El dispositivo completa su valor cuando el dato orienta una acción. Esta vista selecciona contenedores, calcula una ruta por calles de Osorno, numera las paradas y estima distancia y duración desde el punto de partida.", { skipOverlap: true });
}

// 07 · Profesionalizar el prototipo
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true });

  slide.addShape(SH.roundRect, {
    x: 0.62, y: 0.62, w: 7.78, h: 5.92, rectRadius: 0.05,
    fill: { color: "101820" }, line: { color: C.cyan, pt: 1.7 },
    shadow: { type: "outer", color: "000000", opacity: 0.34, blur: 2.4, angle: 45, distance: 1.5 },
  });
  slide.addMedia({
    type: "video",
    path: IMG.pcbVideo,
    cover: imageFileToDataUri(IMG.pcbPoster),
    x: 0.76, y: 0.76, w: 7.5, h: 4.22,
    objectName: "Video · diseño de PCB GeoGreen en KiCad",
  });
  slide.addShape(SH.rect, {
    x: 0.76, y: 4.98, w: 7.5, h: 1.42,
    fill: { color: C.navyDeep }, line: { color: C.navyDeep },
  });
  slide.addText("DEL PROTOTIPO A UNA PLACA PROPIA", {
    x: 1.02, y: 5.22, w: 3.72, h: 0.24,
    fontFace: TYPOGRAPHY.body, fontSize: 10.2, bold: true, charSpacing: 1.1,
    color: C.cyan, margin: 0,
  });
  slide.addText("Diseñar una PCB integra el circuito, ordena sus conexiones y prepara una fabricación repetible.", {
    x: 1.02, y: 5.62, w: 6.7, h: 0.52,
    fontFace: TYPOGRAPHY.display, fontSize: 16.2, bold: true, color: C.white, margin: 0,
  });

  addPill(slide, "UNA RUTA DE PROFUNDIZACIÓN", 8.82, 1.18, 3.22, {
    fill: C.red, line: C.red, color: C.white, fontSize: 9.4,
  });
  slide.addText("Cuando una prueba funciona,\npuede convertirse en producto.", {
    x: 8.82, y: 1.88, w: 3.7, h: 1.1,
    fontFace: TYPOGRAPHY.display, fontSize: 23, bold: true, color: C.white, margin: 0,
  });
  const pcbSteps = [
    { n: "01", title: "INTEGRAR", body: "componentes y energía", color: C.red },
    { n: "02", title: "ORDENAR", body: "conexiones y montaje", color: C.cyan },
    { n: "03", title: "PREPARAR", body: "pruebas y fabricación", color: C.gold },
  ];
  pcbSteps.forEach((item, index) => {
    const y = 3.38 + index * 0.82;
    slide.addText(item.n, {
      x: 8.86, y, w: 0.52, h: 0.3,
      fontFace: TYPOGRAPHY.display, fontSize: 14, bold: true, color: item.color,
      align: "center", margin: 0,
    });
    slide.addShape(SH.line, {
      x: 9.55, y: y + 0.15, w: 0.7, h: 0,
      line: { color: item.color, pt: 2 },
    });
    slide.addText(item.title, {
      x: 10.52, y: y - 0.01, w: 1.68, h: 0.28,
      fontFace: TYPOGRAPHY.display, fontSize: 12.6, bold: true, color: C.white, margin: 0,
    });
    slide.addText(item.body, {
      x: 10.52, y: y + 0.32, w: 1.9, h: 0.24,
      fontFace: TYPOGRAPHY.body, fontSize: 10.3, color: C.paleInk, margin: 0,
    });
  });
  slide.addText("La PCB no inicia la idea: profesionaliza una solución ya comprobada.", {
    x: 8.82, y: 6.18, w: 3.75, h: 0.48,
    fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: C.cyan, margin: 0,
  });
  addFooter(slide, 7, { white: true });
  addNotesAndValidate(slide, "Reproducir el video de KiCad. Esta etapa muestra hasta dónde puede avanzar una solución después de validar su funcionamiento. Una PCB no es un requisito para todos los equipos: es una ruta de profundización que integra y ordena un circuito ya probado.", { skipOverlap: true });
}

// 08 · Anatomía de la PCB GeoGreen
{
  const slide = pptx.addSlide();
  addHeader(slide, "Arquitectura electrónica", "Una placa diseñada para GeoGreen", "Cada componente cumple una función dentro de una arquitectura integrada y verificable.", 8, { titleW: 9.7 });

  slide.addShape(SH.roundRect, {
    x: 0.7, y: 1.84, w: 8.08, h: 4.68, rectRadius: 0.05,
    fill: { color: C.white }, line: { color: C.border, pt: 1.2 },
    shadow: { type: "outer", color: "929CA8", opacity: 0.16, blur: 1.8, angle: 45, distance: 1.2 },
  });
  addImageContain(slide, IMG.pcbRender, 0.84, 2.02, 7.8, 4.26);

  const markers = [
    { n: "1", x: 2.72, y: 3.66, color: C.red },
    { n: "2", x: 3.18, y: 2.62, color: C.cyan },
    { n: "3", x: 2.42, y: 5.08, color: C.gold },
    { n: "4", x: 5.76, y: 4.2, color: C.blue },
    { n: "5", x: 7.38, y: 4.62, color: C.green },
    { n: "6", x: 6.08, y: 5.32, color: "8E55A8" },
  ];
  markers.forEach((m) => {
    slide.addShape(SH.ellipse, {
      x: m.x, y: m.y, w: 0.42, h: 0.42,
      fill: { color: m.color }, line: { color: C.white, pt: 1.6 },
      shadow: { type: "outer", color: "000000", opacity: 0.24, blur: 1, angle: 45, distance: 0.8 },
    });
    slide.addText(m.n, {
      x: m.x, y: m.y + 0.075, w: 0.42, h: 0.22,
      fontFace: TYPOGRAPHY.display, fontSize: 10.5, bold: true,
      color: m.color === C.gold ? C.navyDeep : C.white,
      align: "center", valign: "mid", margin: 0,
    });
  });

  const parts = [
    { n: "1", title: "SENSOR A02YYUW", body: "mide distancia", color: C.red },
    { n: "2", title: "SEMÁFORO RGB", body: "comunica el estado", color: C.cyan },
    { n: "3", title: "USB-C", body: "alimenta la placa", color: C.gold },
    { n: "4", title: "ESP32-C6", body: "procesa y conecta", color: C.blue },
    { n: "5", title: "BUZZER", body: "activa una alerta", color: C.green },
    { n: "6", title: "PUNTOS DE PRUEBA", body: "permiten verificar", color: "8E55A8" },
  ];
  parts.forEach((p, index) => {
    const y = 1.92 + index * 0.7;
    slide.addShape(SH.ellipse, {
      x: 9.18, y, w: 0.42, h: 0.42,
      fill: { color: p.color }, line: { color: p.color },
    });
    slide.addText(p.n, {
      x: 9.18, y: y + 0.075, w: 0.42, h: 0.22,
      fontFace: TYPOGRAPHY.display, fontSize: 10.4, bold: true,
      color: p.color === C.gold ? C.navyDeep : C.white,
      align: "center", valign: "mid", margin: 0,
    });
    slide.addText(p.title, {
      x: 9.82, y: y - 0.01, w: 2.64, h: 0.24,
      fontFace: TYPOGRAPHY.display, fontSize: 11.6, bold: true, color: C.navy, margin: 0,
    });
    slide.addText(p.body, {
      x: 9.82, y: y + 0.28, w: 2.64, h: 0.22,
      fontFace: TYPOGRAPHY.body, fontSize: 9.9, color: C.slate, margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 9.08, y: 6.2, w: 3.42, h: 0.48, rectRadius: 0.04,
    fill: { color: C.softBlue }, line: { color: C.blue, pt: 1 },
  });
  slide.addText("Ruta PCB: ESP32-C6 + A02YYUW", {
    x: 9.28, y: 6.32, w: 3.02, h: 0.22,
    fontFace: TYPOGRAPHY.body, fontSize: 10.1, bold: true, color: C.navy, align: "center", margin: 0,
  });
  addNotesAndValidate(slide, "Esta es la arquitectura de la ruta PCB de GeoGreen: ESP32-C6 y sensor A02YYUW. Es distinta del prototipo físico mostrado anteriormente, construido en protoboard con Arduino UNO R4 WiFi y HC-SR04. Ambas rutas sirven para explicar que una misma necesidad puede resolverse con arquitecturas diferentes.", { skipOverlap: true });
}

// 09 · Diseño físico y colaboración estudiantil
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true, x: 10.92, y: 0.08, w: 1.98, h: 0.88 });
  addPill(slide, "DISEÑO FÍSICO · VIDEO", 0.76, 0.66, 2.42, {
    fill: C.gold, line: C.gold, color: C.navyDeep, fontSize: 9.8,
  });
  slide.addText("La tecnología también\nnecesita una forma.", {
    x: 0.76, y: 1.4, w: 4.55, h: 1.18,
    fontFace: TYPOGRAPHY.display, fontSize: 30, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Una carcasa protege, organiza y permite instalar el sistema en el mundo real.", {
    x: 0.8, y: 2.88, w: 4.18, h: 0.8,
    fontFace: TYPOGRAPHY.body, fontSize: 16.2, color: C.paleInk, margin: 0,
  });
  const layers = [
    { n: "01", title: "HARDWARE", body: "hace funcionar", color: C.red },
    { n: "02", title: "CARCASA", body: "protege e instala", color: C.cyan },
    { n: "03", title: "DISEÑO", body: "da forma y uso", color: C.gold },
  ];
  layers.forEach((item, index) => {
    const x = 0.8 + index * 1.45;
    slide.addShape(SH.line, { x, y: 4.14, w: 1.05, h: 0, line: { color: item.color, pt: 3 } });
    slide.addText(item.n, {
      x, y: 4.42, w: 1.05, h: 0.26,
      fontFace: TYPOGRAPHY.display, fontSize: 13.4, bold: true, color: item.color, align: "center", margin: 0,
    });
    slide.addText(item.title, {
      x: x - 0.1, y: 4.86, w: 1.25, h: 0.24,
      fontFace: TYPOGRAPHY.display, fontSize: 11.2, bold: true, color: C.white, align: "center", margin: 0,
    });
    slide.addText(item.body, {
      x: x - 0.18, y: 5.22, w: 1.42, h: 0.24,
      fontFace: TYPOGRAPHY.body, fontSize: 9.8, color: C.paleInk, align: "center", margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 5.58, y: 1.16, w: 7.02, h: 5.44, rectRadius: 0.05,
    fill: { color: "101820" }, line: { color: C.cyan, pt: 1.6 },
    shadow: { type: "outer", color: "000000", opacity: 0.34, blur: 2.2, angle: 45, distance: 1.4 },
  });
  slide.addMedia({
    type: "video",
    path: IMG.caseVideo,
    cover: imageFileToDataUri(IMG.casePoster),
    x: 5.72, y: 1.3, w: 6.74, h: 4.58,
    objectName: "Video · render 3D de carcasa GeoGreen desarrollado por Felipe",
  });
  slide.addShape(SH.rect, {
    x: 5.72, y: 5.88, w: 6.74, h: 0.58,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  slide.addText("Render 3D desarrollado por Felipe · estudiante AIEP", {
    x: 5.98, y: 6.05, w: 6.22, h: 0.23,
    fontFace: TYPOGRAPHY.display, fontSize: 11.8, bold: true, color: C.white, align: "center", margin: 0,
  });
  slide.addText("La colaboración entre capacidades convierte componentes en una solución utilizable.", {
    x: 0.8, y: 6.02, w: 4.32, h: 0.52,
    fontFace: TYPOGRAPHY.display, fontSize: 13.5, bold: true, color: C.cyan, margin: 0,
  });
  addFooter(slide, 9, { white: true });
  addNotesAndValidate(slide, "Reproducir el render. Reconocer el trabajo de Felipe, estudiante AIEP, como ejemplo de cómo el talento de una persona puede ampliar el proyecto completo. El diseño físico complementa la electrónica y el software: protege, organiza y vuelve instalable la solución.", { skipOverlap: true });
}

// 10 · Evolución de una idea
{
  const slide = pptx.addSlide();
  addHeader(slide, "Evolución del proyecto", "GeoGreen demuestra hasta dónde puede crecer una idea", "No apareció terminado: avanzó mediante decisiones, pruebas y mejoras visibles.", 10, { titleFontSize: 25.2, titleW: 10.0 });

  const growth = [
    { x: 0.72, w: 1.92, n: "01", title: "PROBLEMA", body: "¿Qué necesita cambiar?", color: C.red, image: null },
    { x: 2.78, w: 2.26, n: "02", title: "PRUEBA FÍSICA", body: "El sensor responde.", color: C.cyan, image: IMG.prototypePoster },
    { x: 5.18, w: 2.26, n: "03", title: "DATOS ÚTILES", body: "La lectura orienta acciones.", color: C.gold, image: IMG.dashboard },
    { x: 7.58, w: 2.26, n: "04", title: "PLACA PROPIA", body: "El circuito se integra.", color: C.blue, image: IMG.pcbRender },
    { x: 9.98, w: 2.62, n: "05", title: "DISEÑO FÍSICO", body: "La solución toma forma.", color: C.green, image: IMG.casePoster },
  ];
  growth.forEach((item, index) => {
    const y = 2.02 - index * 0.03;
    const h = 3.58 + index * 0.08;
    slide.addShape(SH.roundRect, {
      x: item.x, y, w: item.w, h, rectRadius: 0.05,
      fill: { color: item.image ? C.white : C.navy }, line: { color: item.color, pt: 1.6 },
      shadow: { type: "outer", color: "9BA4AF", opacity: 0.14, blur: 1.2, angle: 45, distance: 0.8 },
    });
    if (item.image) {
      addImageCrop(slide, item.image, item.x + 0.08, y + 0.08, item.w - 0.16, 2.02);
      slide.addShape(SH.rect, {
        x: item.x + 0.08, y: y + 1.72, w: item.w - 0.16, h: 0.38,
        fill: { color: C.navyDeep, transparency: 12 }, line: { color: C.navyDeep, transparency: 100 },
      });
    } else {
      slide.addText("?", {
        x: item.x + 0.22, y: y + 0.42, w: item.w - 0.44, h: 1.12,
        fontFace: TYPOGRAPHY.display, fontSize: 48, bold: true, color: C.red, align: "center", margin: 0,
      });
      slide.addText("OBSERVAR\nANTES DE CONSTRUIR", {
        x: item.x + 0.18, y: y + 1.72, w: item.w - 0.36, h: 0.62,
        fontFace: TYPOGRAPHY.display, fontSize: 11.2, bold: true, color: C.white, align: "center", margin: 0,
      });
    }
    slide.addText(item.n, {
      x: item.x + 0.16, y: y + 2.4, w: 0.42, h: 0.28,
      fontFace: TYPOGRAPHY.display, fontSize: 13.4, bold: true, color: item.color, align: "center", margin: 0,
    });
    slide.addText(item.title, {
      x: item.x + 0.7, y: y + 2.4, w: item.w - 0.86, h: 0.28,
      fontFace: TYPOGRAPHY.display, fontSize: 11.6, bold: true,
      color: item.image ? C.navy : C.white, margin: 0,
    });
    slide.addText(item.body, {
      x: item.x + 0.18, y: y + 2.92, w: item.w - 0.36, h: 0.46,
      fontFace: TYPOGRAPHY.body, fontSize: 10.5,
      color: item.image ? C.slate : C.paleInk, align: "center", valign: "mid", margin: 0,
    });
    if (index < growth.length - 1) {
      slide.addShape(SH.chevron, {
        x: item.x + item.w - 0.08, y: 3.44, w: 0.28, h: 0.48,
        fill: { color: item.color }, line: { color: item.color },
      });
    }
  });
  addTakeaway(slide, "Cada mejora nace de una evidencia: algo funciona, algo falta o una decisión puede hacerse mejor.", { y: 6.18 });
  addNotesAndValidate(slide, "Leer la secuencia como crecimiento, no como una receta obligatoria. GeoGreen comenzó con un problema y una prueba mínima; luego incorporó visualización, diseño electrónico y diseño físico. Los equipos podrán decidir hasta dónde profundizar según su idea y sus capacidades.", { skipOverlap: true });
}

// 11 · Transferencia del desafío a los equipos
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTopBars(slide);
  addLockup(slide);
  addPill(slide, "EL DESAFÍO DE LOS EQUIPOS", 0.78, 0.6, 2.72, {
    fill: C.red, line: C.red, color: C.white, fontSize: 9.8,
  });
  slide.addText("El desafío no es copiar GeoGreen.", {
    x: 0.78, y: 1.34, w: 7.22, h: 0.64,
    fontFace: TYPOGRAPHY.display, fontSize: 31, bold: true, color: C.navy, margin: 0,
  });
  slide.addText("Es convertir una observación propia en una solución que funcione, muestre evidencia y pueda explicarse.", {
    x: 0.8, y: 2.18, w: 7.6, h: 0.8,
    fontFace: TYPOGRAPHY.body, fontSize: 17.2, color: C.slate, margin: 0,
  });

  const actionPath = [
    { x: 0.8, label: "OBSERVA", color: C.red },
    { x: 2.68, label: "DEFINE", color: C.cyan },
    { x: 4.56, label: "PRUEBA", color: C.gold },
    { x: 6.44, label: "DEMUESTRA", color: C.green },
  ];
  actionPath.forEach((item, index) => {
    slide.addShape(SH.roundRect, {
      x: item.x, y: 3.54, w: 1.52, h: 0.58, rectRadius: 0.05,
      fill: { color: C.white }, line: { color: item.color, pt: 1.5 },
    });
    slide.addText(item.label, {
      x: item.x + 0.1, y: 3.69, w: 1.32, h: 0.24,
      fontFace: TYPOGRAPHY.display, fontSize: 11.8, bold: true, color: C.navy,
      align: "center", margin: 0,
    });
    if (index < actionPath.length - 1) {
      slide.addShape(SH.chevron, {
        x: item.x + 1.62, y: 3.69, w: 0.18, h: 0.28,
        fill: { color: item.color }, line: { color: item.color },
      });
    }
  });

  slide.addShape(SH.roundRect, {
    x: 8.78, y: 1.42, w: 3.78, h: 3.8, rectRadius: 0.05,
    fill: { color: C.navy }, line: { color: C.navy },
    shadow: { type: "outer", color: "8D98A5", opacity: 0.2, blur: 1.7, angle: 45, distance: 1 },
  });
  slide.addText("CADA EQUIPO\nDECIDE", {
    x: 9.24, y: 2.28, w: 2.86, h: 0.9,
    fontFace: TYPOGRAPHY.display, fontSize: 24, bold: true, color: C.white,
    align: "center", valign: "mid", margin: 0,
  });
  slide.addShape(SH.line, { x: 9.64, y: 3.52, w: 2.06, h: 0, line: { color: C.cyan, pt: 3 } });
  slide.addText("qué problema aborda\ny hasta dónde llevar su solución", {
    x: 9.26, y: 3.9, w: 2.82, h: 0.72,
    fontFace: TYPOGRAPHY.body, fontSize: 13.2, color: C.paleInk,
    align: "center", valign: "mid", margin: 0,
  });

  const choices = [
    { x: 0.8, n: "01", title: "PROBLEMA", color: C.red },
    { x: 2.78, n: "02", title: "VARIABLE", color: C.cyan },
    { x: 4.76, n: "03", title: "SENSOR", color: C.gold },
    { x: 6.74, n: "04", title: "RESPUESTA", color: C.green },
    { x: 8.72, n: "05", title: "DATOS", color: C.blue },
    { x: 10.7, n: "06", title: "ALCANCE", color: "8E55A8" },
  ];
  choices.forEach((item) => {
    slide.addText(item.n, {
      x: item.x, y: 5.58, w: 0.46, h: 0.28,
      fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: item.color, align: "center", margin: 0,
    });
    slide.addShape(SH.line, {
      x: item.x + 0.58, y: 5.72, w: 0.96, h: 0,
      line: { color: item.color, pt: 2.6 },
    });
    slide.addText(item.title, {
      x: item.x - 0.04, y: 6.04, w: 1.62, h: 0.28,
      fontFace: TYPOGRAPHY.display, fontSize: 11.3, bold: true, color: C.navy, align: "center", margin: 0,
    });
  });
  slide.addText("GeoGreen es el referente. La próxima idea pertenece a los estudiantes del LBEICO.", {
    x: 0.82, y: 6.62, w: 11.7, h: 0.36,
    fontFace: TYPOGRAPHY.display, fontSize: 16.2, bold: true, color: C.navy, align: "center", margin: 0,
  });
  addPartnerMark(slide, { y: 7.08 });
  slide.addText("11", {
    x: 11.85, y: 7.06, w: 0.75, h: 0.24,
    fontFace: TYPOGRAPHY.display, fontSize: 11.4, bold: true, color: C.slate, align: "right", margin: 0,
  });
  addNotesAndValidate(slide, "GeoGreen funciona como referente de posibilidades, no como modelo para copiar. Cada equipo define su problema, la variable que observará, el sensor o fuente de información, la respuesta del sistema, la forma de mostrar evidencia y el alcance realista que quiere desarrollar.", { skipOverlap: true });
}

// 12 · Arquitectura completa del programa
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true });
  addPill(slide, "UN PROCESO FORMATIVO COMPLETO", 0.78, 0.62, 3.18, {
    fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 9.8,
  });
  slide.addText("Aprender, desarrollar y mostrar", {
    x: 0.78, y: 1.35, w: 7.9, h: 0.62,
    fontFace: TYPOGRAPHY.display, fontSize: 30, bold: true, color: C.white, margin: 0,
  });
  slide.addText("GeoGreen articula una base común, trabajo sostenido de los equipos y una instancia pública de demostración.", {
    x: 0.8, y: 2.16, w: 8.3, h: 0.72,
    fontFace: TYPOGRAPHY.body, fontSize: 16.2, color: C.paleInk, margin: 0,
  });

  const phases = [
    {
      x: 0.78, w: 3.34, n: "01", title: "BASE COMÚN", label: "4 TALLERES",
      body: "Comprender el problema, el material, la tecnología y el valor de los datos.",
      footer: "APRENDER Y APLICAR", color: C.red,
    },
    {
      x: 4.43, w: 4.42, n: "02", title: "DESARROLLO ACOMPAÑADO", label: "TRABAJO + 4 MENTORÍAS",
      body: "Investigar, construir y probar entre sesiones; recibir orientación para decidir el próximo paso.",
      footer: "MEJORAR CON EVIDENCIA", color: C.gold,
    },
    {
      x: 9.16, w: 3.4, n: "03", title: "VITRINA DE APRENDIZAJE", label: "EVENTO FINAL",
      body: "Demostrar la propuesta, comunicar capacidades y recibir retroalimentación del jurado.",
      footer: "MOSTRAR Y PROYECTAR", color: C.green,
    },
  ];
  phases.forEach((p, index) => {
    slide.addShape(SH.roundRect, {
      x: p.x, y: 3.24, w: p.w, h: 2.56, rectRadius: 0.05,
      fill: { color: C.white, transparency: 2 }, line: { color: p.color, pt: 1.7 },
      shadow: { type: "outer", color: "000000", opacity: 0.22, blur: 1.5, angle: 45, distance: 1 },
    });
    slide.addShape(SH.rect, {
      x: p.x, y: 3.24, w: 0.1, h: 2.56,
      fill: { color: p.color }, line: { color: p.color },
    });
    slide.addText(p.n, {
      x: p.x + 0.28, y: 3.52, w: 0.5, h: 0.32,
      fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: p.color, align: "center", margin: 0,
    });
    slide.addText(p.title, {
      x: p.x + 0.98, y: 3.5, w: p.w - 1.25, h: 0.32,
      fontFace: TYPOGRAPHY.display, fontSize: 13.8, bold: true, color: C.navy, margin: 0,
    });
    slide.addText(p.label, {
      x: p.x + 0.3, y: 4.08, w: p.w - 0.6, h: 0.3,
      fontFace: TYPOGRAPHY.body, fontSize: 11.3, bold: true, charSpacing: 0.6,
      color: p.color, align: "center", margin: 0,
    });
    slide.addText(p.body, {
      x: p.x + 0.32, y: 4.56, w: p.w - 0.64, h: 0.66,
      fontFace: TYPOGRAPHY.body, fontSize: 12.2, color: C.slate,
      align: "center", valign: "mid", margin: 0,
    });
    slide.addShape(SH.line, {
      x: p.x + 0.56, y: 5.42, w: p.w - 1.12, h: 0,
      line: { color: p.color, pt: 1.5 },
    });
    slide.addText(p.footer, {
      x: p.x + 0.28, y: 5.56, w: p.w - 0.56, h: 0.24,
      fontFace: TYPOGRAPHY.display, fontSize: 10.7, bold: true, color: C.navy, align: "center", margin: 0,
    });
    if (index < phases.length - 1) {
      slide.addShape(SH.chevron, {
        x: p.x + p.w + 0.13, y: 4.28, w: 0.2, h: 0.5,
        fill: { color: p.color }, line: { color: p.color },
      });
    }
  });
  slide.addText("La continuidad convierte actividades breves en un proceso de aprendizaje con propósito y proyección.", {
    x: 1.12, y: 6.24, w: 11.1, h: 0.42,
    fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.cyan, align: "center", margin: 0,
  });
  addFooter(slide, 12, { white: true });
  addNotesAndValidate(slide, "La propuesta se organiza como un proceso y no como una suma de actividades. Los talleres entregan una base común; los equipos desarrollan su propuesta entre sesiones y pueden acudir a mentorías para revisar decisiones; el evento final vuelve visible el aprendizaje y las capacidades desarrolladas.", { skipOverlap: true });
}

// 13 · Cuatro talleres, una base común
{
  const slide = pptx.addSlide();
  addHeader(slide, "Formación aplicada", "Cuatro talleres conectan territorio, ciencia y tecnología", "Cada jornada deja un producto que permite avanzar a la siguiente decisión.", 13, { titleFontSize: 25, titleW: 10.1 });

  const workshops = [
    {
      x: 0.72, date: "17 AGO", n: "01", title: "PROBLEMA\nAMBIENTAL", action: "Observar el entorno", product: "Problema definido",
      owner: "DESARROLLO SOCIAL", color: C.red, soft: "FBE9EA",
    },
    {
      x: 3.82, date: "18 AGO", n: "02", title: "CIENCIA DEL\nRECICLAJE", action: "Comprender el material", product: "Ficha de material",
      owner: "DESARROLLO SOCIAL", color: "B84A4F", soft: "F4E9E8",
    },
    {
      x: 6.92, date: "24 AGO", n: "03", title: "SENSORES Y\nGEOGREEN", action: "Relacionar variable y sensor", product: "Idea tecnológica inicial",
      owner: "I/E/T", color: C.blue, soft: C.softBlue,
    },
    {
      x: 10.02, date: "25 AGO", n: "04", title: "DEL DATO A\nLA ACCIÓN", action: "Convertir datos en decisiones", product: "Prototipo digital\nprovisional",
      owner: "I/E/T", color: C.cyan, soft: "E7F6F7",
    },
  ];
  workshops.forEach((w, index) => {
    const topY = 1.94 + index * 0.12;
    const cardH = 3.82 - index * 0.04;
    slide.addShape(SH.roundRect, {
      x: w.x, y: topY, w: 2.58, h: cardH, rectRadius: 0.05,
      fill: { color: C.white }, line: { color: w.color, pt: 1.5 },
      shadow: { type: "outer", color: "9AA4B0", opacity: 0.14, blur: 1.2, angle: 45, distance: 0.8 },
    });
    slide.addShape(SH.rect, {
      x: w.x, y: topY, w: 2.58, h: 0.66,
      fill: { color: w.color }, line: { color: w.color },
    });
    slide.addText(w.date, {
      x: w.x + 0.18, y: topY + 0.18, w: 0.84, h: 0.26,
      fontFace: TYPOGRAPHY.display, fontSize: 12.3, bold: true, color: C.white, margin: 0,
    });
    slide.addText(w.owner, {
      x: w.x + 1.02, y: topY + 0.18, w: 1.36, h: 0.26,
      fontFace: TYPOGRAPHY.body, fontSize: 8.8, bold: true, color: C.white, align: "right", margin: 0,
    });
    slide.addText(w.n, {
      x: w.x + 0.18, y: topY + 1.0, w: 0.48, h: 0.34,
      fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: w.color, align: "center", margin: 0,
    });
    slide.addText(w.title, {
      x: w.x + 0.76, y: topY + 0.9, w: 1.56, h: 0.72,
      fontFace: TYPOGRAPHY.display, fontSize: 14.4, bold: true, color: C.navy, margin: 0,
    });
    slide.addShape(SH.roundRect, {
      x: w.x + 0.2, y: topY + 1.82, w: 2.18, h: 0.64, rectRadius: 0.04,
      fill: { color: w.soft }, line: { color: w.soft },
    });
    slide.addText(w.action, {
      x: w.x + 0.34, y: topY + 2.0, w: 1.9, h: 0.26,
      fontFace: TYPOGRAPHY.body, fontSize: 11.2, bold: true, color: C.navy, align: "center", margin: 0,
    });
    slide.addText("PRODUCTO", {
      x: w.x + 0.22, y: topY + 2.78, w: 2.14, h: 0.22,
      fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, charSpacing: 0.7,
      color: w.color, align: "center", margin: 0,
    });
    slide.addText(w.product, {
      x: w.x + 0.28, y: topY + 3.06, w: 2.02, h: 0.54,
      fontFace: TYPOGRAPHY.display, fontSize: 11.6, bold: true, color: C.navy,
      align: "center", valign: "mid", margin: 0,
    });
    if (index < workshops.length - 1) {
      slide.addShape(SH.chevron, {
        x: w.x + 2.72, y: 3.72, w: 0.22, h: 0.46,
        fill: { color: w.color }, line: { color: w.color },
      });
    }
  });
  addTakeaway(slide, "Problema → material → idea tecnológica → software útil", { y: 6.22 });
  addNotesAndValidate(slide, "Los cuatro talleres construyen una base común para todos los estudiantes. Desarrollo Social conduce la comprensión del problema y del material; I/E/T conecta esa base con sensores y software. Cada jornada entrega un producto concreto que alimenta la etapa siguiente.", { skipOverlap: true });
}

// 14 · Mentorías como acompañamiento
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true });
  addPill(slide, "ACOMPAÑAMIENTO AL PROCESO", 0.78, 0.62, 2.92, {
    fill: C.gold, line: C.gold, color: C.navyDeep, fontSize: 9.8,
  });
  slide.addText("Orientar el avance sin reemplazarlo", {
    x: 0.78, y: 1.34, w: 8.2, h: 0.62,
    fontFace: TYPOGRAPHY.display, fontSize: 29, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Dos bloques de 90 minutos por fecha · disponibles para los equipos que quieran apoyo.", {
    x: 0.8, y: 2.14, w: 8.9, h: 0.4,
    fontFace: TYPOGRAPHY.body, fontSize: 14.5, color: C.paleInk, margin: 0,
  });

  slide.addShape(SH.line, {
    x: 1.42, y: 3.54, w: 10.48, h: 0,
    line: { color: C.paleInk, pt: 3.2, transparency: 28 },
  });
  const mentors = [
    { x: 1.18, date: "31 AGO", n: "M1", title: "PROBLEMA Y CONTEXTO", product: "Problema validado", color: C.red, owner: "DESARROLLO SOCIAL" },
    { x: 4.12, date: "07 SEP", n: "M2", title: "SOLUCIÓN Y RECURSOS", product: "Solución y recursos\ndefinidos", color: C.cyan, owner: "I/E/T" },
    { x: 7.06, date: "21 SEP", n: "M3", title: "AVANCE Y EVIDENCIA", product: "Evidencia revisada", color: C.blue, owner: "I/E/T" },
    { x: 10.0, date: "28 SEP", n: "M4", title: "COMUNICACIÓN Y ENSAYO", product: "Presentación corregida", color: C.gold, owner: "DESARROLLO SOCIAL" },
  ];
  mentors.forEach((m) => {
    slide.addShape(SH.ellipse, {
      x: m.x, y: 3.18, w: 0.72, h: 0.72,
      fill: { color: m.color }, line: { color: C.white, pt: 2 },
      shadow: { type: "outer", color: "000000", opacity: 0.2, blur: 1, angle: 45, distance: 0.8 },
    });
    slide.addText(m.n, {
      x: m.x, y: 3.36, w: 0.72, h: 0.24,
      fontFace: TYPOGRAPHY.display, fontSize: 12.2, bold: true,
      color: m.color === C.gold ? C.navyDeep : C.white,
      align: "center", valign: "mid", margin: 0,
    });
    slide.addText(m.date, {
      x: m.x - 0.64, y: 2.78, w: 2.0, h: 0.24,
      fontFace: TYPOGRAPHY.body, fontSize: 10.1, bold: true,
      color: m.color === C.blue ? C.cyan : m.color, align: "center", margin: 0,
    });
    slide.addText(m.title, {
      x: m.x - 0.72, y: 4.14, w: 2.16, h: 0.48,
      fontFace: TYPOGRAPHY.display, fontSize: 11.5, bold: true, color: C.white,
      align: "center", valign: "mid", margin: 0,
    });
    slide.addText(m.owner, {
      x: m.x - 0.72, y: 4.78, w: 2.16, h: 0.22,
      fontFace: TYPOGRAPHY.body, fontSize: 8.8, bold: true, charSpacing: 0.4,
      color: C.paleInk, align: "center", margin: 0,
    });
    slide.addShape(SH.roundRect, {
      x: m.x - 0.58, y: 5.22, w: 1.88, h: 0.58, rectRadius: 0.04,
      fill: { color: C.white, transparency: 5 }, line: { color: m.color, pt: 1.2 },
    });
    slide.addText(m.product, {
      x: m.x - 0.44, y: 5.31, w: 1.6, h: 0.38,
      fontFace: TYPOGRAPHY.display, fontSize: 9.9, bold: true, color: C.navy,
      align: "center", valign: "mid", margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 1.24, y: 6.15, w: 10.86, h: 0.54, rectRadius: 0.04,
    fill: { color: C.navy, transparency: 8 }, line: { color: C.cyan, pt: 1.2 },
  });
  slide.addText("ENTRE SESIONES · investigar · construir · probar · registrar · mejorar", {
    x: 1.52, y: 6.3, w: 10.3, h: 0.24,
    fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: C.cyan, align: "center", margin: 0,
  });
  addFooter(slide, 14, { white: true });
  addNotesAndValidate(slide, "Las mentorías revisan decisiones, contrastan evidencia y ayudan a destrabar un siguiente paso. El desarrollo ocurre principalmente entre sesiones y sigue perteneciendo a cada equipo. Las mentorías 1 y 4 se enfocan en contexto y comunicación; las mentorías 2 y 3 profundizan solución, recursos, prototipo y evidencia.", { skipOverlap: true });
}

// 15 · Calendario operativo
{
  const slide = pptx.addSlide();
  addHeader(slide, "Calendario de ejecución", "Un recorrido breve, progresivo y predecible", "Del 17 de agosto al 5 de octubre con pausa programada por Fiestas Patrias.", 15, { titleW: 9.9 });

  const rows = [
    {
      y: 1.92, label: "TALLERES", color: C.red, soft: "FBE9EA",
      events: [
        { date: "17 AGO", title: "Problema ambiental" },
        { date: "18 AGO", title: "Ciencia del reciclaje" },
        { date: "24 AGO", title: "Sensores y GeoGreen" },
        { date: "25 AGO", title: "Del dato a la acción" },
      ],
    },
    {
      y: 3.22, label: "MENTORÍAS", color: C.blue, soft: C.softBlue,
      events: [
        { date: "31 AGO", title: "Problema y contexto" },
        { date: "07 SEP", title: "Solución y recursos" },
        { date: "21 SEP", title: "Avance y evidencia" },
        { date: "28 SEP", title: "Comunicación y ensayo" },
      ],
    },
    {
      y: 4.52, label: "CIERRE", color: C.green, soft: C.greenSoft,
      events: [
        { date: "02 OCT", title: "Hito comunicacional" },
        { date: "05 OCT", title: "Concurso final" },
        { date: "SEM. 12 OCT", title: "Cierre interno" },
      ],
    },
  ];
  rows.forEach((row) => {
    slide.addShape(SH.roundRect, {
      x: 0.72, y: row.y, w: 1.54, h: 1.02, rectRadius: 0.04,
      fill: { color: row.color }, line: { color: row.color },
    });
    slide.addText(row.label, {
      x: 0.86, y: row.y + 0.34, w: 1.26, h: 0.28,
      fontFace: TYPOGRAPHY.display, fontSize: 11.7, bold: true, color: C.white, align: "center", margin: 0,
    });
    const eventW = row.events.length === 4 ? 2.35 : 3.16;
    const gap = 0.17;
    row.events.forEach((event, index) => {
      const x = 2.58 + index * (eventW + gap);
      slide.addShape(SH.roundRect, {
        x, y: row.y, w: eventW, h: 1.02, rectRadius: 0.04,
        fill: { color: C.white }, line: { color: row.color, pt: 1.2 },
      });
      slide.addShape(SH.rect, {
        x, y: row.y, w: 0.08, h: 1.02,
        fill: { color: row.color }, line: { color: row.color },
      });
      slide.addText(event.date, {
        x: x + 0.2, y: row.y + 0.16, w: eventW - 0.4, h: 0.23,
        fontFace: TYPOGRAPHY.display, fontSize: 10.8, bold: true, color: row.color, margin: 0,
      });
      slide.addText(event.title, {
        x: x + 0.2, y: row.y + 0.52, w: eventW - 0.4, h: 0.3,
        fontFace: TYPOGRAPHY.body, fontSize: 10.8, bold: true, color: C.navy,
        valign: "mid", margin: 0,
      });
    });
  });
  slide.addShape(SH.roundRect, {
    x: 2.58, y: 5.8, w: 9.97, h: 0.5, rectRadius: 0.04,
    fill: { color: "FBE9EA" }, line: { color: C.red, pt: 1 },
  });
  slide.addText("SEMANA DEL 14 SEP · SIN ACTIVIDADES · FIESTAS PATRIAS", {
    x: 2.82, y: 5.94, w: 9.49, h: 0.22,
    fontFace: TYPOGRAPHY.display, fontSize: 11.5, bold: true, color: C.red, align: "center", margin: 0,
  });
  slide.addText("La secuencia deja tiempo para producir avances entre una revisión y la siguiente.", {
    x: 1.02, y: 6.5, w: 11.28, h: 0.32,
    fontFace: TYPOGRAPHY.display, fontSize: 14.4, bold: true, color: C.navy, align: "center", margin: 0,
  });
  addNotesAndValidate(slide, "El calendario concentra los cuatro talleres durante agosto y distribuye las mentorías durante septiembre, con una pausa programada por Fiestas Patrias. El hito comunicacional del 2 de octubre prepara el concurso final del 5 de octubre; la semana del 12 queda destinada al cierre interno.", { skipOverlap: true });
}

// 16 · Organización de estudiantes y responsabilidades
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true });
  addPill(slide, "TALLERES · COHORTE COMPLETA", 0.78, 0.62, 2.86, {
    fill: C.red, line: C.red, color: C.white, fontSize: 9.8,
  });
  slide.addText("Una organización que hace visible la participación", {
    x: 0.78, y: 1.34, w: 9.2, h: 0.64,
    fontFace: TYPOGRAPHY.display, fontSize: 28.5, bold: true, color: C.white, margin: 0,
  });

  const metrics = [
    { x: 0.82, n: "60", label: "ESTUDIANTES", note: "cobertura aproximada", color: C.red },
    { x: 3.92, n: "2", label: "BLOQUES", note: "30 estudiantes cada uno", color: C.cyan },
    { x: 7.02, n: "10", label: "EQUIPOS", note: "5 equipos por bloque", color: C.gold },
    { x: 10.12, n: "6", label: "PERSONAS", note: "por equipo", color: C.green },
  ];
  metrics.forEach((m, index) => {
    slide.addShape(SH.roundRect, {
      x: m.x, y: 2.3, w: 2.38, h: 1.62, rectRadius: 0.05,
      fill: { color: C.navy, transparency: 4 }, line: { color: m.color, pt: 1.4 },
    });
    slide.addText(m.n, {
      x: m.x + 0.18, y: 2.56, w: 2.02, h: 0.52,
      fontFace: TYPOGRAPHY.display, fontSize: 28, bold: true, color: m.color, align: "center", margin: 0,
    });
    slide.addText(m.label, {
      x: m.x + 0.18, y: 3.16, w: 2.02, h: 0.24,
      fontFace: TYPOGRAPHY.display, fontSize: 11.5, bold: true, color: C.white, align: "center", margin: 0,
    });
    slide.addText(m.note, {
      x: m.x + 0.16, y: 3.52, w: 2.06, h: 0.22,
      fontFace: TYPOGRAPHY.body, fontSize: 9.6, color: C.paleInk, align: "center", margin: 0,
    });
    if (index < metrics.length - 1) {
      slide.addShape(SH.chevron, {
        x: m.x + 2.53, y: 2.93, w: 0.28, h: 0.42,
        fill: { color: C.paleInk, transparency: 8 }, line: { color: C.paleInk, transparency: 100 },
      });
    }
  });

  slide.addText("6 RESPONSABILIDADES · 1 EQUIPO", {
    x: 0.82, y: 4.36, w: 4.3, h: 0.34,
    fontFace: TYPOGRAPHY.display, fontSize: 15.2, bold: true, color: C.cyan, margin: 0,
  });
  const roles = [
    { n: "01", label: "COORDINACIÓN", color: C.red },
    { n: "02", label: "INVESTIGACIÓN", color: C.cyan },
    { n: "03", label: "DISEÑO", color: C.gold },
    { n: "04", label: "TECNOLOGÍA", color: C.green },
    { n: "05", label: "PRUEBAS Y\nEVIDENCIA", color: C.blue },
    { n: "06", label: "COMUNICACIÓN", color: "8E55A8" },
  ];
  roles.forEach((role, index) => {
    const x = 0.82 + index * 2.02;
    slide.addShape(SH.roundRect, {
      x, y: 4.92, w: 1.76, h: 1.04, rectRadius: 0.04,
      fill: { color: C.white, transparency: 2 }, line: { color: role.color, pt: 1.2 },
    });
    slide.addText(role.n, {
      x: x + 0.14, y: 5.12, w: 0.42, h: 0.26,
      fontFace: TYPOGRAPHY.display, fontSize: 12, bold: true, color: role.color, align: "center", margin: 0,
    });
    slide.addShape(SH.line, {
      x: x + 0.68, y: 5.25, w: 0.72, h: 0,
      line: { color: role.color, pt: 1.7 },
    });
    slide.addText(role.label, {
      x: x + 0.12, y: 5.52, w: 1.52, h: 0.32,
      fontFace: TYPOGRAPHY.display, fontSize: 9.8, bold: true, color: C.navy,
      align: "center", valign: "mid", margin: 0,
    });
  });
  slide.addText("Los roles pueden rotar. Las responsabilidades no quedan vacías y las decisiones pertenecen al equipo completo.", {
    x: 1.12, y: 6.32, w: 11.1, h: 0.42,
    fontFace: TYPOGRAPHY.display, fontSize: 13.8, bold: true, color: C.white, align: "center", margin: 0,
  });
  addFooter(slide, 16, { white: true });
  addNotesAndValidate(slide, "Los talleres se repiten en dos bloques de 90 minutos: aproximadamente 30 estudiantes y cinco equipos por bloque. Cada equipo reúne seis responsabilidades persistentes para asegurar participación, trazabilidad del trabajo y una presentación donde todos puedan explicar la lógica básica de la propuesta.", { skipOverlap: true });
}

// Rediseño integral de 12, 13, 14 y 16: el layout explica la lógica, no la encierra en tarjetas genéricas.
function resetSlideForRedesign(slide, background) {
  slide._slideObjects = [];
  slide._rels = [];
  slide._relsChart = [];
  slide._relsMedia = [];
  slide.background = { color: background };
}

// 12 · Escalera de crecimiento
{
  const slide = pptx._slides[11];
  resetSlideForRedesign(slide, C.navyDeep);
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true });
  addPill(slide, "UN PROCESO FORMATIVO COMPLETO", 0.78, 0.58, 3.18, {
    fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 9.8,
  });
  slide.addText("Aprender, desarrollar y mostrar", {
    x: 0.78, y: 1.27, w: 8.1, h: 0.62,
    fontFace: TYPOGRAPHY.display, fontSize: 30.5, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Una trayectoria que convierte capacidades en evidencias visibles.", {
    x: 0.8, y: 2.05, w: 7.4, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.paleInk, margin: 0,
  });

  // Línea ascendente intencional: representa continuidad y proyección.
  slide.addShape(SH.line, {
    x: 1.1, y: 2.66, w: 10.7, h: 1.86, flipV: true,
    line: { color: C.cyan, pt: 2.2, endArrowType: "triangle", transparency: 8 },
  });

  const staircase = [
    {
      x: 0.82, y: 4.55, w: 3.1, h: 1.5, n: "01", color: C.red, text: C.white,
      eyebrow: "4 TALLERES", title: "BASE COMÚN", body: "Comprender y aplicar",
    },
    {
      x: 4.12, y: 3.7, w: 4.05, h: 2.35, n: "02", color: C.gold, text: C.navyDeep,
      eyebrow: "TRABAJO + 4 MENTORÍAS", title: "DESARROLLO ACOMPAÑADO", body: "Mejorar con evidencia",
    },
    {
      x: 8.38, y: 2.85, w: 4.12, h: 3.2, n: "03", color: C.green, text: C.white,
      eyebrow: "EVENTO FINAL", title: "VITRINA DE APRENDIZAJE", body: "Mostrar y proyectar",
    },
  ];
  staircase.forEach((s, index) => {
    slide.addShape(SH.rect, {
      x: s.x, y: s.y, w: s.w, h: s.h,
      fill: { color: s.color }, line: { color: s.color },
      shadow: { type: "outer", color: "000000", opacity: 0.22, blur: 1.5, angle: 45, distance: 1 },
    });
    slide.addText(s.n, {
      x: s.x + 0.25, y: s.y + 0.22, w: 0.62, h: 0.42,
      fontFace: TYPOGRAPHY.display, fontSize: 21, bold: true, color: s.text, align: "center", margin: 0,
    });
    slide.addShape(SH.line, {
      x: s.x + 1.02, y: s.y + 0.43, w: s.w - 1.3, h: 0,
      line: { color: s.text, pt: 1.5, transparency: 22 },
    });
    slide.addText(s.eyebrow, {
      x: s.x + 0.28, y: s.y + (index === 0 ? 0.78 : 0.86), w: s.w - 0.56, h: 0.26,
      fontFace: TYPOGRAPHY.body, fontSize: 10.2, bold: true, charSpacing: 0.6,
      color: s.text, align: "center", margin: 0,
    });
    slide.addText(s.title, {
      x: s.x + 0.28, y: s.y + (index === 0 ? 1.08 : 1.34), w: s.w - 0.56,
      h: index === 2 ? 0.68 : 0.4,
      fontFace: TYPOGRAPHY.display, fontSize: index === 0 ? 16 : 17.2, bold: true,
      color: s.text, align: "center", valign: "mid", margin: 0,
    });
    if (index > 0) {
      slide.addText(s.body, {
        x: s.x + 0.3, y: s.y + s.h - 0.54, w: s.w - 0.6, h: 0.25,
        fontFace: TYPOGRAPHY.display, fontSize: 11.4, bold: true,
        color: s.text, align: "center", margin: 0,
      });
    }
  });
  slide.addText("La continuidad transforma actividades breves en un proceso con propósito y proyección.", {
    x: 1.02, y: 6.36, w: 11.3, h: 0.36,
    fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: C.cyan, align: "center", margin: 0,
  });
  addFooter(slide, 12, { white: true });
  addNotesAndValidate(slide, "La propuesta se organiza como una trayectoria ascendente. Los talleres entregan una base común; el trabajo entre sesiones y las mentorías permiten desarrollar y mejorar; el evento final hace visible el aprendizaje y las capacidades de los estudiantes.", { skipOverlap: true });
}

// 13 · Cadena de transformación
{
  const slide = pptx._slides[12];
  resetSlideForRedesign(slide, C.paper);
  addHeader(slide, "Formación aplicada", "Cuatro talleres, una cadena de decisiones", "Territorio, ciencia y tecnología se conectan mediante productos verificables.", 13, { titleW: 9.8 });

  slide.addText("4", {
    x: 0.72, y: 1.72, w: 1.25, h: 1.1,
    fontFace: TYPOGRAPHY.display, fontSize: 58, bold: true, color: "E5A9AC", align: "center", margin: 0,
  });
  slide.addText("TALLERES", {
    x: 0.72, y: 2.86, w: 1.25, h: 0.26,
    fontFace: TYPOGRAPHY.display, fontSize: 10.8, bold: true, charSpacing: 0.8,
    color: C.red, align: "center", margin: 0,
  });
  slide.addShape(SH.line, { x: 1.34, y: 3.32, w: 0, h: 2.46, line: { color: C.border, pt: 2 } });

  const chain = [
    { y: 1.92, x: 2.08, w: 10.35, n: "01", date: "17 AGO", owner: "DESARROLLO SOCIAL", title: "PROBLEMA AMBIENTAL", action: "Observar el entorno", product: "PROBLEMA DEFINIDO", color: C.red, soft: "FBE9EA" },
    { y: 3.0, x: 2.42, w: 10.01, n: "02", date: "18 AGO", owner: "DESARROLLO SOCIAL", title: "CIENCIA DEL RECICLAJE", action: "Comprender el material", product: "FICHA DE MATERIAL", color: "B84A4F", soft: "F4E9E8" },
    { y: 4.08, x: 2.76, w: 9.67, n: "03", date: "24 AGO", owner: "I/E/T", title: "SENSORES Y GEOGREEN", action: "Relacionar variable y sensor", product: "IDEA TECNOLÓGICA", color: C.blue, soft: C.softBlue },
    { y: 5.16, x: 3.1, w: 9.33, n: "04", date: "25 AGO", owner: "I/E/T", title: "DEL DATO A LA ACCIÓN", action: "Convertir datos en decisiones", product: "PROTOTIPO DIGITAL PROVISIONAL", color: C.cyan, soft: "E7F6F7" },
  ];
  chain.forEach((item, index) => {
    slide.addShape(SH.parallelogram, {
      x: item.x, y: item.y, w: item.w, h: 0.84,
      fill: { color: item.soft }, line: { color: item.color, pt: 1.3 },
      shadow: { type: "outer", color: "9BA4AF", opacity: 0.11, blur: 0.8, angle: 45, distance: 0.6 },
    });
    slide.addShape(SH.rect, {
      x: item.x, y: item.y, w: 0.12, h: 0.84,
      fill: { color: item.color }, line: { color: item.color },
    });
    slide.addText(item.n, {
      x: item.x + 0.24, y: item.y + 0.23, w: 0.46, h: 0.3,
      fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: item.color, align: "center", margin: 0,
    });
    slide.addText(`${item.date} · ${item.owner}`, {
      x: item.x + 0.84, y: item.y + 0.13, w: 2.0, h: 0.22,
      fontFace: TYPOGRAPHY.body, fontSize: 8.9, bold: true, color: item.color, margin: 0,
    });
    slide.addText(item.title, {
      x: item.x + 0.84, y: item.y + 0.43, w: 2.75, h: 0.24,
      fontFace: TYPOGRAPHY.display, fontSize: 11.8, bold: true, color: C.navy, margin: 0,
    });
    slide.addText(item.action, {
      x: item.x + 3.88, y: item.y + 0.29, w: 2.55, h: 0.25,
      fontFace: TYPOGRAPHY.body, fontSize: 11.2, bold: true, color: C.slate, align: "center", margin: 0,
    });
    slide.addShape(SH.chevron, {
      x: item.x + 6.66, y: item.y + 0.26, w: 0.26, h: 0.34,
      fill: { color: item.color }, line: { color: item.color },
    });
    slide.addShape(SH.roundRect, {
      x: item.x + 7.15, y: item.y + 0.13, w: item.w - 7.45, h: 0.58, rectRadius: 0.04,
      fill: { color: C.navy }, line: { color: C.navy },
    });
    slide.addText(item.product, {
      x: item.x + 7.3, y: item.y + 0.29, w: item.w - 7.75, h: 0.24,
      fontFace: TYPOGRAPHY.display, fontSize: item.product.length > 24 ? 9.3 : 10.4,
      bold: true, color: C.white, align: "center", margin: 0,
    });
    if (index < chain.length - 1) {
      slide.addShape(SH.line, {
        x: item.x + 0.52, y: item.y + 0.84, w: 0.34, h: 0.24,
        line: { color: item.color, pt: 1.5, endArrowType: "triangle" },
      });
    }
  });
  addTakeaway(slide, "Problema → material → idea tecnológica → software útil", { y: 6.3 });
  addNotesAndValidate(slide, "Los cuatro talleres forman una cadena de decisiones y productos. Cada salida se convierte en una entrada para la etapa siguiente: problema definido, ficha de material, idea tecnológica y prototipo digital provisional.", { skipOverlap: true });
}

// 14 · El trabajo del equipo al centro
{
  const slide = pptx._slides[13];
  resetSlideForRedesign(slide, C.navyDeep);
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true });
  addPill(slide, "ACOMPAÑAMIENTO AL PROCESO", 0.78, 0.58, 2.92, {
    fill: C.gold, line: C.gold, color: C.navyDeep, fontSize: 9.8,
  });
  slide.addText("El equipo avanza. La mentoría orienta.", {
    x: 0.78, y: 1.28, w: 8.5, h: 0.62,
    fontFace: TYPOGRAPHY.display, fontSize: 29.5, bold: true, color: C.white, margin: 0,
  });
  slide.addText("2 × 90 minutos por fecha · apoyo disponible para los equipos que lo requieran.", {
    x: 0.8, y: 2.04, w: 8.9, h: 0.36,
    fontFace: TYPOGRAPHY.body, fontSize: 14.2, color: C.paleInk, margin: 0,
  });

  // Banda protagonista: el desarrollo autónomo atraviesa todo el período.
  slide.addShape(SH.chevron, {
    x: 0.82, y: 3.38, w: 11.7, h: 1.0,
    fill: { color: C.blue }, line: { color: C.cyan, pt: 1.4 },
    shadow: { type: "outer", color: "000000", opacity: 0.2, blur: 1.2, angle: 45, distance: 0.8 },
  });
  slide.addText("EL EQUIPO", {
    x: 1.38, y: 3.61, w: 1.42, h: 0.3,
    fontFace: TYPOGRAPHY.display, fontSize: 14.8, bold: true, color: C.white, margin: 0,
  });
  slide.addText("INVESTIGA  →  CONSTRUYE  →  PRUEBA  →  REGISTRA  →  MEJORA", {
    x: 3.0, y: 3.61, w: 8.42, h: 0.3,
    fontFace: TYPOGRAPHY.display, fontSize: 13.3, bold: true, color: C.white, align: "center", margin: 0,
  });

  const checkpoints = [
    { x: 1.02, top: true, date: "31 AGO", n: "M1", title: "PROBLEMA Y CONTEXTO", owner: "DESARROLLO SOCIAL", product: "Problema validado", color: C.red },
    { x: 3.96, top: false, date: "07 SEP", n: "M2", title: "SOLUCIÓN Y RECURSOS", owner: "I/E/T", product: "Recursos definidos", color: C.cyan },
    { x: 6.9, top: true, date: "21 SEP", n: "M3", title: "AVANCE Y EVIDENCIA", owner: "I/E/T", product: "Evidencia revisada", color: C.blue },
    { x: 9.84, top: false, date: "28 SEP", n: "M4", title: "COMUNICACIÓN Y ENSAYO", owner: "DESARROLLO SOCIAL", product: "Presentación corregida", color: C.gold },
  ];
  checkpoints.forEach((m) => {
    const boxY = m.top ? 2.5 : 4.66;
    const lineY = m.top ? 3.18 : 4.38;
    slide.addShape(SH.line, {
      x: m.x + 0.92, y: lineY, w: 0, h: m.top ? 0.2 : 0.28,
      line: { color: m.color, pt: 2 },
    });
    slide.addShape(SH.roundRect, {
      x: m.x, y: boxY, w: 2.18, h: m.top ? 0.68 : 1.04, rectRadius: 0.04,
      fill: { color: C.white }, line: { color: m.color, pt: 1.4 },
    });
    slide.addShape(SH.rect, {
      x: m.x, y: boxY, w: 0.1, h: m.top ? 0.68 : 1.04,
      fill: { color: m.color }, line: { color: m.color },
    });
    slide.addText(`${m.date} · ${m.n}`, {
      x: m.x + 0.22, y: boxY + 0.12, w: 0.86, h: 0.22,
      fontFace: TYPOGRAPHY.display, fontSize: 9.8, bold: true, color: m.color, margin: 0,
    });
    slide.addText(m.owner, {
      x: m.x + 1.08, y: boxY + 0.12, w: 0.86, h: 0.22,
      fontFace: TYPOGRAPHY.body, fontSize: 7.5, bold: true, color: C.slate, align: "right", margin: 0,
    });
    slide.addText(m.title, {
      x: m.x + 0.22, y: boxY + 0.39, w: 1.72, h: 0.22,
      fontFace: TYPOGRAPHY.display, fontSize: 9.7, bold: true, color: C.navy, align: "center", margin: 0,
    });
    if (!m.top) {
      slide.addText(m.product, {
        x: m.x + 0.22, y: boxY + 0.72, w: 1.72, h: 0.22,
        fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: m.color, align: "center", margin: 0,
      });
    } else {
      slide.addShape(SH.roundRect, {
        x: m.x + 0.18, y: 4.48, w: 1.82, h: 0.4, rectRadius: 0.04,
        fill: { color: C.white }, line: { color: m.color, pt: 1.1 },
      });
      slide.addText(m.product, {
        x: m.x + 0.28, y: 4.58, w: 1.62, h: 0.2,
        fontFace: TYPOGRAPHY.body, fontSize: 8.9, bold: true,
        color: m.color === C.blue ? C.navy : m.color, align: "center", margin: 0,
      });
    }
  });
  slide.addShape(SH.line, { x: 1.2, y: 6.15, w: 10.9, h: 0, line: { color: C.cyan, pt: 1.4 } });
  slide.addText("La mentoría revisa, orienta y destraba. El desarrollo sigue perteneciendo al equipo.", {
    x: 1.1, y: 6.35, w: 11.1, h: 0.34,
    fontFace: TYPOGRAPHY.display, fontSize: 14.1, bold: true, color: C.cyan, align: "center", margin: 0,
  });
  addFooter(slide, 14, { white: true });
  addNotesAndValidate(slide, "La banda central representa el trabajo continuo de los equipos entre sesiones. Las mentorías aparecen como puntos de apoyo que revisan, orientan y destraban decisiones sin producir el proyecto por los estudiantes.", { skipOverlap: true });
}

// 16 · Sesenta estudiantes representados visualmente
{
  const slide = pptx._slides[15];
  resetSlideForRedesign(slide, C.navyDeep);
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true });
  addPill(slide, "TALLERES · 2 × 90 MINUTOS", 0.78, 0.58, 2.74, {
    fill: C.red, line: C.red, color: C.white, fontSize: 9.8,
  });
  slide.addText("60 estudiantes. 10 equipos. 6 responsabilidades.", {
    x: 0.78, y: 1.25, w: 9.6, h: 0.62,
    fontFace: TYPOGRAPHY.display, fontSize: 28.5, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Cada punto representa a una persona y cada color mantiene una responsabilidad visible.", {
    x: 0.8, y: 2.0, w: 8.8, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 14.1, color: C.paleInk, margin: 0,
  });

  const roleColors = [C.red, C.cyan, C.gold, C.green, C.blue, "8E55A8"];
  const blockDefs = [
    { x: 0.78, label: "BLOQUE 1", note: "30 estudiantes · 5 equipos" },
    { x: 4.96, label: "BLOQUE 2", note: "30 estudiantes · 5 equipos" },
  ];
  blockDefs.forEach((block, blockIndex) => {
    slide.addShape(SH.roundRect, {
      x: block.x, y: 2.62, w: 3.86, h: 3.2, rectRadius: 0.05,
      fill: { color: C.navy, transparency: 4 }, line: { color: blockIndex === 0 ? C.red : C.cyan, pt: 1.4 },
    });
    slide.addText(block.label, {
      x: block.x + 0.22, y: 2.86, w: 1.32, h: 0.28,
      fontFace: TYPOGRAPHY.display, fontSize: 13.1, bold: true,
      color: blockIndex === 0 ? C.red : C.cyan, margin: 0,
    });
    slide.addText(block.note, {
      x: block.x + 1.5, y: 2.89, w: 2.05, h: 0.22,
      fontFace: TYPOGRAPHY.body, fontSize: 9.6, color: C.paleInk, align: "right", margin: 0,
    });
    for (let team = 0; team < 5; team += 1) {
      const tx = block.x + 0.25 + team * 0.72;
      slide.addShape(SH.roundRect, {
        x: tx, y: 3.45, w: 0.58, h: 1.76, rectRadius: 0.04,
        fill: { color: C.white, transparency: 3 }, line: { color: C.white, transparency: 78, pt: 0.8 },
      });
      for (let person = 0; person < 6; person += 1) {
        const col = person % 2;
        const row = Math.floor(person / 2);
        slide.addShape(SH.ellipse, {
          x: tx + 0.1 + col * 0.22, y: 3.7 + row * 0.36, w: 0.16, h: 0.16,
          fill: { color: roleColors[person] }, line: { color: roleColors[person] },
        });
      }
      slide.addText(`E${blockIndex * 5 + team + 1}`, {
        x: tx + 0.06, y: 4.87, w: 0.46, h: 0.2,
        fontFace: TYPOGRAPHY.display, fontSize: 8.6, bold: true, color: C.navy, align: "center", margin: 0,
      });
    }
    slide.addText("5 EQUIPOS × 6 PERSONAS", {
      x: block.x + 0.42, y: 5.45, w: 3.02, h: 0.24,
      fontFace: TYPOGRAPHY.display, fontSize: 10.5, bold: true, color: C.white, align: "center", margin: 0,
    });
  });

  slide.addText("UNA RESPONSABILIDAD POR COLOR", {
    x: 9.18, y: 2.67, w: 3.22, h: 0.28,
    fontFace: TYPOGRAPHY.display, fontSize: 11.5, bold: true, color: C.cyan, margin: 0,
  });
  const roleLabels = ["Coordinación", "Investigación", "Diseño", "Tecnología", "Pruebas y evidencia", "Comunicación"];
  roleLabels.forEach((label, index) => {
    const y = 3.18 + index * 0.47;
    slide.addShape(SH.rect, {
      x: 9.2, y: y + 0.03, w: 0.48, h: 0.15,
      fill: { color: roleColors[index] }, line: { color: roleColors[index] },
    });
    slide.addText(String(index + 1).padStart(2, "0"), {
      x: 9.84, y, w: 0.36, h: 0.22,
      fontFace: TYPOGRAPHY.display, fontSize: 9.8, bold: true, color: roleColors[index], align: "center", margin: 0,
    });
    slide.addText(label.toUpperCase(), {
      x: 10.36, y, w: 2.02, h: 0.22,
      fontFace: TYPOGRAPHY.display, fontSize: 9.7, bold: true, color: C.white, margin: 0,
    });
  });
  slide.addShape(SH.line, { x: 9.18, y: 6.0, w: 3.22, h: 0, line: { color: C.cyan, pt: 1.3 } });
  slide.addText("Los roles pueden rotar; las responsabilidades no quedan vacías.", {
    x: 9.18, y: 6.18, w: 3.22, h: 0.48,
    fontFace: TYPOGRAPHY.body, fontSize: 11.1, bold: true, color: C.paleInk, align: "center", margin: 0,
  });
  addFooter(slide, 16, { white: true });
  addNotesAndValidate(slide, "Los sesenta puntos representan a los estudiantes organizados en dos bloques de treinta. Cada bloque contiene cinco equipos de seis. Los seis colores muestran que las mismas responsabilidades permanecen visibles en todos los equipos, aunque los roles puedan rotar.", { skipOverlap: true });
}

// 17 · El aprendizaje se hace visible
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addImageCrop(slide, IMG.competition, 0, 0, W, H);
  slide.addShape(SH.rect, {
    x: 0, y: 0, w: 4.95, h: H,
    fill: { color: C.navyDeep, transparency: 5 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  slide.addShape(SH.rect, {
    x: 4.82, y: 0, w: 0.62, h: H,
    fill: { color: C.navyDeep, transparency: 62 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true });
  addPill(slide, "EVENTO FINAL · 05 OCTUBRE", 0.72, 0.56, 2.72, {
    fill: C.red, line: C.red, color: C.white, fontSize: 9.8,
  });
  slide.addText("El aprendizaje\nse hace visible.", {
    x: 0.72, y: 1.28, w: 3.82, h: 1.22,
    fontFace: TYPOGRAPHY.display, fontSize: 31, bold: true,
    color: C.white, breakLine: false, margin: 0,
  });
  slide.addText("Diez equipos presentan, demuestran y responden ante una audiencia real.", {
    x: 0.74, y: 2.7, w: 3.72, h: 0.68,
    fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: C.paleInk,
    breakLine: false, margin: 0,
  });

  const stages = [
    { n: "04", label: "PITCH +\nDEMOSTRACIÓN", color: C.red },
    { n: "02", label: "PREGUNTAS\nDEL JURADO", color: C.cyan },
    { n: "02", label: "REGISTRO +\nTRANSICIÓN", color: C.gold },
  ];
  stages.forEach((stage, index) => {
    const x = 0.66 + index * 1.3;
    slide.addShape(SH.roundRect, {
      x, y: 4.02, w: 1.18, h: 1.35, rectRadius: 0.04,
      fill: { color: C.white, transparency: 7 },
      line: { color: stage.color, pt: 1.35 },
    });
    slide.addText(stage.n, {
      x: x + 0.13, y: 4.18, w: 0.92, h: 0.38,
      fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true,
      color: stage.color, align: "center", margin: 0,
    });
    slide.addText("MIN", {
      x: x + 0.13, y: 4.58, w: 0.92, h: 0.18,
      fontFace: TYPOGRAPHY.body, fontSize: 7.6, bold: true,
      charSpacing: 1.1, color: C.slate, align: "center", margin: 0,
    });
    slide.addText(stage.label, {
      x: x + 0.08, y: 4.86, w: 1.02, h: 0.34,
      fontFace: TYPOGRAPHY.display, fontSize: 7.7, bold: true,
      color: C.navy, align: "center", valign: "mid", margin: 0,
    });
  });
  slide.addText("TRES PERSPECTIVAS · UNA RÚBRICA COMÚN", {
    x: 0.74, y: 5.75, w: 3.7, h: 0.24,
    fontFace: TYPOGRAPHY.display, fontSize: 10.4, bold: true,
    charSpacing: 0.5, color: C.cyan, align: "center", margin: 0,
  });
  slide.addShape(SH.line, {
    x: 0.92, y: 6.16, w: 3.34, h: 0,
    line: { color: C.white, transparency: 72, pt: 1 },
  });
  slide.addText("Concurso final · evaluación · retroalimentación · reconocimiento", {
    x: 0.74, y: 6.38, w: 3.7, h: 0.42,
    fontFace: TYPOGRAPHY.body, fontSize: 10.8, bold: true,
    color: C.white, align: "center", margin: 0,
  });
  addFooter(slide, 17, { white: true });
  addNotesAndValidate(slide, "El concurso convierte el proceso en una experiencia pública de comunicación y demostración. Cada equipo dispone de cuatro minutos para presentar y demostrar, dos minutos para responder al jurado y dos minutos para registro y transición. La evaluación reúne perspectivas técnica, social-ambiental y educativa mediante una rúbrica común.", { skipOverlap: true });
}

// 18 · Proyección de las capacidades TP
{
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Formación técnico-profesional",
    "Una vitrina para el talento TP",
    "El desafío deja capacidades transferibles para continuar estudios y construir una futura trayectoria laboral.",
    18,
    { titleW: 8.7, subtitleW: 10.7 }
  );

  // Dos territorios conectados por un puente de capacidades.
  // La estructura inferior usa pilares y diagonales completas para evitar
  // curvas ambiguas que parezcan conectores interrumpidos.
  slide.addShape(SH.line, {
    x: 2.94, y: 5.14, w: 7.12, h: 0,
    line: { color: C.blue, transparency: 35, pt: 1.5 },
  });
  slide.addShape(SH.line, {
    x: 3.16, y: 3.74, w: 0, h: 1.4,
    line: { color: C.blue, transparency: 24, pt: 2.2 },
  });
  slide.addShape(SH.line, {
    x: 9.84, y: 3.74, w: 0, h: 1.4,
    line: { color: C.blue, transparency: 24, pt: 2.2 },
  });
  slide.addShape(SH.line, {
    x: 3.16, y: 3.74, w: 1.6, h: 1.4, flipV: true,
    line: { color: C.cyan, transparency: 38, pt: 1.55 },
  });
  slide.addShape(SH.line, {
    x: 8.24, y: 3.74, w: 1.6, h: 1.4,
    line: { color: C.cyan, transparency: 38, pt: 1.55 },
  });
  slide.addShape(SH.rect, {
    x: 1.36, y: 3.24, w: 10.58, h: 0.52,
    fill: { color: C.navy }, line: { color: C.navy },
    shadow: { type: "outer", color: "7E8994", opacity: 0.14, blur: 1.1, angle: 45, distance: 0.7 },
  });

  const capabilities = [
    { label: "OBSERVAR", color: C.red },
    { label: "COLABORAR", color: C.cyan },
    { label: "DISEÑAR", color: C.gold },
    { label: "PROBAR", color: C.green },
    { label: "COMUNICAR", color: C.blue },
    { label: "MEJORAR", color: "8E55A8" },
  ];
  capabilities.forEach((cap, index) => {
    const x = 2.74 + index * 1.34;
    slide.addShape(SH.ellipse, {
      x, y: 3.04, w: 0.42, h: 0.42,
      fill: { color: cap.color }, line: { color: C.white, pt: 1.2 },
    });
    slide.addText(cap.label, {
      x: x - 0.32, y: 3.87, w: 1.06, h: 0.24,
      fontFace: TYPOGRAPHY.display, fontSize: 8.9, bold: true,
      color: cap.color, align: "center", margin: 0,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 0.7, y: 2.67, w: 1.76, h: 1.62, rectRadius: 0.05,
    fill: { color: C.white }, line: { color: C.red, pt: 1.5 },
    shadow: { type: "outer", color: "7E8994", opacity: 0.12, blur: 1, angle: 45, distance: 0.6 },
  });
  slide.addText("PUNTO DE\nPARTIDA", {
    x: 0.92, y: 2.91, w: 1.32, h: 0.42,
    fontFace: TYPOGRAPHY.display, fontSize: 12.4, bold: true,
    color: C.red, align: "center", margin: 0,
  });
  slide.addText("Un desafío\nambiental real", {
    x: 0.92, y: 3.48, w: 1.32, h: 0.42,
    fontFace: TYPOGRAPHY.body, fontSize: 10.2, color: C.slate,
    align: "center", margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 4.87, y: 4.48, w: 3.58, h: 0.66, rectRadius: 0.05,
    fill: { color: C.navy }, line: { color: C.cyan, pt: 1.3 },
  });
  slide.addText("TALENTO TP EN ACCIÓN", {
    x: 5.08, y: 4.68, w: 3.16, h: 0.25,
    fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true,
    color: C.white, align: "center", margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 10.88, y: 1.96, w: 1.78, h: 1.22, rectRadius: 0.05,
    fill: { color: C.greenSoft }, line: { color: C.green, pt: 1.45 },
  });
  slide.addText("CONTINUIDAD\nDE ESTUDIOS", {
    x: 11.03, y: 2.31, w: 1.48, h: 0.38,
    fontFace: TYPOGRAPHY.display, fontSize: 10.6, bold: true,
    color: C.green, align: "center", margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 10.88, y: 4.02, w: 1.78, h: 1.22, rectRadius: 0.05,
    fill: { color: "F7EDEE" }, line: { color: C.red, pt: 1.45 },
  });
  slide.addText("FUTURA\nTRAYECTORIA LABORAL", {
    x: 11.02, y: 4.32, w: 1.5, h: 0.48,
    fontFace: TYPOGRAPHY.display, fontSize: 9.8, bold: true,
    color: C.red, align: "center", margin: 0,
  });
  slide.addShape(SH.line, {
    x: 9.9, y: 2.58, w: 0.92, h: 0.92, flipV: true,
    line: { color: C.green, pt: 2.1, endArrowType: "triangle" },
  });
  slide.addShape(SH.line, {
    x: 9.9, y: 3.5, w: 0.92, h: 1.12,
    line: { color: C.red, pt: 2.1, endArrowType: "triangle" },
  });

  addTakeaway(slide, "El prototipo es la evidencia; la capacidad desarrollada es el valor que permanece.", {
    y: 6.15, x: 1.05, w: 11.23,
  });
  addNotesAndValidate(slide, "GeoGreen usa un desafío ambiental concreto para poner en acción capacidades técnico-profesionales transferibles: observar, colaborar, diseñar, probar, comunicar y mejorar. El prototipo hace visible el aprendizaje y fortalece la proyección hacia la continuidad de estudios y una futura trayectoria laboral.", { skipOverlap: true });
}

// 19 · Cierre institucional
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addLockup(slide, { white: true, x: 10.94, y: 0.34, w: 1.95, h: 1.18, panel: true });

  // El edificio del LBEICO convierte el cierre en una invitación situada,
  // no en una declaración institucional abstracta.
  slide.addShape(SH.rect, {
    x: 8.03, y: 1.65, w: 4.8, h: 4.05,
    fill: { color: C.white }, line: { color: C.cyan, transparency: 24, pt: 1.2 },
    shadow: { type: "outer", color: "000000", opacity: 0.22, blur: 1.6, angle: 45, distance: 1 },
  });
  addImageCrop(slide, IMG.lbeicoFacade, 8.12, 1.74, 4.62, 3.87);
  slide.addShape(SH.rect, {
    x: 8.12, y: 4.83, w: 4.62, h: 0.78,
    fill: { color: C.navyDeep, transparency: 9 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  slide.addText("LICEO BICENTENARIO DE EXCELENCIA\nINSTITUTO COMERCIAL DE OSORNO", {
    x: 8.36, y: 4.98, w: 3.9, h: 0.32,
    fontFace: TYPOGRAPHY.display, fontSize: 9.4, bold: true,
    color: C.white, align: "center", margin: 0,
  });
  slide.addText("Fotografía: SoyChile · 2021", {
    x: 8.36, y: 5.36, w: 3.9, h: 0.14,
    fontFace: TYPOGRAPHY.body, fontSize: 6.5,
    color: C.paleInk, align: "center", margin: 0,
  });

  addPill(slide, "LBEICO × AIEP OSORNO", 0.8, 0.72, 2.55, {
    fill: C.white, line: C.white, color: C.navyDeep, fontSize: 9.8,
  });
  slide.addText("GeoGreen demuestra\nhasta dónde puede crecer\nuna idea.", {
    x: 0.8, y: 1.58, w: 7.45, h: 2.1,
    fontFace: TYPOGRAPHY.display, fontSize: 32.5, bold: true,
    color: C.white, breakLine: false, margin: 0,
  });
  slide.addText("La próxima pertenece a sus estudiantes.", {
    x: 0.82, y: 4.08, w: 7.05, h: 0.58,
    fontFace: TYPOGRAPHY.display, fontSize: 22.2, bold: true,
    color: C.cyan, margin: 0,
  });
  slide.addShape(SH.line, {
    x: 0.82, y: 4.94, w: 6.92, h: 0,
    line: { color: C.red, pt: 2.3 },
  });
  slide.addText("Una experiencia para aprender haciendo, proyectarse y mostrar el trabajo en comunidad.", {
    x: 0.82, y: 5.28, w: 6.95, h: 0.68,
    fontFace: TYPOGRAPHY.body, fontSize: 15.5,
    color: C.paleInk, margin: 0,
  });

  const closingConcepts = [
    { text: "PROTAGONISMO", x: 8.38, w: 1.46, color: C.red },
    { text: "·", x: 9.84, w: 0.2, color: C.paleInk },
    { text: "APLICACIÓN", x: 10.04, w: 1.18, color: C.cyan },
    { text: "·", x: 11.22, w: 0.2, color: C.paleInk },
    { text: "PROYECCIÓN", x: 11.42, w: 1.2, color: C.gold },
  ];
  closingConcepts.forEach((concept) => {
    slide.addText(concept.text, {
      x: concept.x, y: 6.08, w: concept.w, h: 0.26,
      fontFace: TYPOGRAPHY.display, fontSize: 8.8, bold: concept.text !== "·",
      charSpacing: concept.text === "·" ? 0 : 0.55,
      color: concept.color, align: "center", margin: 0,
    });
  });
  addFooter(slide, 19, { white: true });
  addNotesAndValidate(slide, "GeoGreen Escolar propone una experiencia coherente con la formación técnico-profesional: protagonismo estudiantil, aplicación práctica, acompañamiento y proyección. El cierre invita a reconocer que el proyecto no termina en GeoGreen; abre un escenario para que nuevas ideas de los estudiantes puedan crecer y mostrarse en comunidad.", { skipOverlap: true });
}

(async () => {
  await pptx.writeFile({ fileName: outputPptx });
  console.log(`PPTX generado: ${outputPptx}`);
  console.log(`Diapositivas: ${pptx._slides.length}`);
})();
