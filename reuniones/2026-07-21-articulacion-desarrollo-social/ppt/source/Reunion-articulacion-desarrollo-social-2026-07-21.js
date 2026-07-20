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
  subject: "Reunión de articulación con Desarrollo Social",
  title: "GeoGreen Escolar · Articulación con Desarrollo Social",
});

const SH = pptx.ShapeType;
const W = 13.333;
const H = 7.5;
const rootDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "../../../..");
const outputPptx = path.join(rootDir, "Reunion-articulacion-desarrollo-social-2026-07-21.pptx");

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
  gold: "E0BC5A",
  goldSoft: "FBF3DE",
  green: "2E8B57",
  greenSoft: "E5F3EA",
  darkPanel: "0D223A",
  paleInk: "D8E7F5",
};

const IMG = {
  lockup: path.join(repoRoot, "reuniones", "2026-06-22-socio-comunitario", "assets", "lockup-vinculacion-dark.png"),
  lockupW: path.join(repoRoot, "reuniones", "2026-06-22-socio-comunitario", "assets", "lockup-vinculacion-white.png"),
  opening: path.join(repoRoot, "talleres", "03", "media", "generadas", "apertura-estudiantes-innovacion-geogreen.png"),
  original: path.join(repoRoot, "talleres", "03", "media", "generadas", "prototipo-original-hc-sr04-sim7600sa.png"),
  prototype: path.join(repoRoot, "talleres", "03", "media", "fotos", "prototipo-oled-geogreen-landscape.png"),
  pcb: path.join(repoRoot, "geogreen-v1", "hardware", "kicad", "exports", "geogreen-v1-product-render.jpg"),
  dashboard: path.join(repoRoot, "reuniones", "2026-06-15", "ppt", "source", "assets", "app-geogreen-mapa-osorno.png"),
  system: path.join(repoRoot, "talleres", "03", "media", "generadas", "sistema-geogreen-sensor-dato-respuesta.png"),
  logic: path.join(repoRoot, "cronograma", "infografias", "infografia-maestra-pseudocronograma-geogreen.png"),
  socialRoute: path.join(repoRoot, "docs", "infografias", "infografia-ruta-desarrollo-social-geogreen-gptimage.png"),
  roles: path.join(repoRoot, "docs", "infografias", "infografia-roles-equipo-geogreen-gptimage.png"),
  t1: path.join(repoRoot, "talleres", "01", "infografias", "infografia-taller-1-resumen-docente-gptimage.png"),
  t2: path.join(repoRoot, "talleres", "02", "infografias", "infografia-taller-2-resumen-docente-gptimage.png"),
  m1: path.join(repoRoot, "mentorias", "01", "infografias", "infografia-mentoria-1-resumen-docente-gptimage.png"),
  m4: path.join(repoRoot, "mentorias", "04", "infografias", "infografia-mentoria-4-mapa-clase-gptimage.png"),
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

function addLockup(slide, opts = {}) {
  const x = opts.x ?? 11.42;
  const y = opts.y ?? 0.2;
  const w = opts.w ?? 1.55;
  const h = opts.h ?? 1.0;
  if (opts.panel) {
    slide.addShape(SH.roundRect, {
      x: x - 0.12,
      y: y - 0.06,
      w: w + 0.24,
      h: h + 0.12,
      rectRadius: 0.04,
      fill: { color: opts.panelFill ?? C.white, transparency: opts.panelTransparency ?? 4 },
      line: { color: opts.panelFill ?? C.white, transparency: 100 },
    });
  }
  addImageContain(slide, opts.white ? IMG.lockupW : IMG.lockup, x, y, w, h);
}

function addFooter(slide, number, opts = {}) {
  const color = opts.white ? C.paleInk : C.slate;
  slide.addText("GeoGreen Escolar · Articulación con Desarrollo Social", {
    x: 0.72,
    y: 7.12,
    w: 6.6,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.6,
    color,
    margin: 0,
  });
  slide.addText(String(number).padStart(2, "0"), {
    x: 11.68,
    y: 7.02,
    w: 0.9,
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
    y: 0.35,
    w: 6.2,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.25,
    color: opts.kickerColor ?? C.red,
    margin: 0,
  });
  slide.addText(title, {
    x: 0.72,
    y: 0.69,
    w: opts.titleW ?? 10.1,
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
      y: opts.subtitleY ?? 1.3,
      w: opts.subtitleW ?? 10.0,
      h: opts.subtitleH ?? 0.4,
      fontFace: TYPOGRAPHY.body,
      fontSize: opts.subtitleFontSize ?? 14.5,
      color: opts.subtitleColor ?? C.slate,
      margin: 0,
    });
  }
  addLockup(slide, { white: opts.whiteLockup });
  addFooter(slide, number, { white: opts.whiteFooter });
}

function addPill(slide, text, x, y, w, opts = {}) {
  const h = opts.h ?? 0.38;
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.05,
    fill: { color: opts.fill ?? C.white, transparency: opts.transparency ?? 0 },
    line: { color: opts.line ?? opts.fill ?? C.border, pt: opts.linePt ?? 1 },
  });
  slide.addText(text, {
    x: x + 0.1,
    y: y + 0.055,
    w: w - 0.2,
    h: h - 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.fontSize ?? 10,
    bold: opts.bold ?? true,
    color: opts.color ?? C.navy,
    align: opts.align ?? "center",
    valign: "mid",
    margin: 0,
  });
}

function addCard(slide, x, y, w, h, opts = {}) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.045,
    fill: { color: opts.fill ?? C.white },
    line: { color: opts.line ?? C.border, pt: opts.linePt ?? 1 },
    shadow: opts.shadow === false ? undefined : { type: "outer", color: "B7C0CC", opacity: 0.14, blur: 1.5, angle: 45, distance: 1 },
  });
  if (opts.accent) {
    slide.addShape(SH.rect, {
      x,
      y,
      w: 0.09,
      h,
      fill: { color: opts.accent },
      line: { color: opts.accent },
    });
  }
}

function addCircleText(slide, text, x, y, d, opts = {}) {
  slide.addShape(SH.ellipse, {
    x,
    y,
    w: d,
    h: d,
    fill: { color: opts.fill ?? C.red },
    line: { color: opts.line ?? opts.fill ?? C.red, pt: opts.linePt ?? 1 },
  });
  slide.addText(text, {
    x: x + 0.01,
    y: y + 0.01,
    w: d - 0.02,
    h: d - 0.02,
    fontFace: opts.fontFace ?? TYPOGRAPHY.display,
    fontSize: opts.fontSize ?? 15,
    bold: opts.bold ?? true,
    color: opts.color ?? C.white,
    align: "center",
    valign: "mid",
    margin: 0,
  });
}

function addTakeaway(slide, text, opts = {}) {
  const x = opts.x ?? 0.78;
  const y = opts.y ?? 6.25;
  const w = opts.w ?? 11.75;
  const h = opts.h ?? 0.6;
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.04,
    fill: { color: opts.fill ?? C.navy },
    line: { color: opts.fill ?? C.navy },
  });
  slide.addText(text, {
    x: x + 0.28,
    y: y + 0.13,
    w: w - 0.56,
    h: h - 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.fontSize ?? 14,
    bold: true,
    color: opts.color ?? C.white,
    align: "center",
    valign: "mid",
    margin: 0,
  });
}

function addNotesAndValidate(slide, notes, opts = {}) {
  if (notes) slide.addNotes(notes);
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
  slide.background = { color: C.navyDeep };
  addImageCrop(slide, IMG.opening, 6.78, 0, 6.55, H);
  slide.addShape(SH.rect, {
    x: 6.75,
    y: 0,
    w: 2.8,
    h: H,
    fill: { color: C.navyDeep, transparency: 18 },
    line: { color: C.navyDeep, transparency: 100 },
  });
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true, panelFill: C.navyDeep, panelTransparency: 10 });
  addPill(slide, "REUNIÓN DE ARTICULACIÓN · 21 JUL 2026", 0.78, 0.62, 3.38, {
    fill: C.red,
    line: C.red,
    color: C.white,
    fontSize: 10.4,
  });
  slide.addText("GeoGreen Escolar", {
    x: 0.78,
    y: 1.42,
    w: 5.7,
    h: 0.78,
    fontFace: TYPOGRAPHY.display,
    fontSize: 35,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Articulación con Desarrollo Social", {
    x: 0.8,
    y: 2.24,
    w: 5.92,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20.5,
    bold: true,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Una ruta interdisciplinaria para convertir problemas ambientales cercanos en propuestas con sentido, evidencia y voz estudiantil.", {
    x: 0.82,
    y: 3.12,
    w: 5.12,
    h: 1.05,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17,
    color: C.paleInk,
    breakLine: false,
    margin: 0,
  });
  slide.addShape(SH.line, { x: 0.82, y: 4.55, w: 4.75, h: 0, line: { color: C.cyan, pt: 2 } });
  slide.addText("Instituto Comercial Liceo Bicentenario · AIEP Osorno", {
    x: 0.82,
    y: 4.78,
    w: 5.35,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.5,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Talleres · mentorías · desafío final", {
    x: 0.82,
    y: 5.24,
    w: 5.0,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.5,
    color: C.gold,
    margin: 0,
  });
  addFooter(slide, 1, { white: true });
  addNotesAndValidate(slide, "Abrir con la idea central: GeoGreen ya no es solo un dispositivo; es una experiencia escolar interdisciplinaria. Esta reunión busca que todos compartamos el mismo mapa antes de ejecutar.", { ignoreLines: true, skipOverlap: true });
}

// 02 · GeoGreen en 60 segundos
{
  const slide = pptx.addSlide();
  addHeader(slide, "El proyecto", "GeoGreen en 60 segundos", "Un caso tecnológico que se transformó en una experiencia educativa completa.", 2);
  const panels = [
    { x: 0.76, image: IMG.original, n: "01", title: "SENSAR", body: "Un sensor ultrasónico mide la distancia hasta los residuos.", color: C.red },
    { x: 4.46, image: IMG.prototype, n: "02", title: "INTERPRETAR Y ALERTAR", body: "El prototipo convierte la lectura en porcentaje, semáforo y aviso.", color: C.cyan },
    { x: 8.16, image: IMG.dashboard, n: "03", title: "VISUALIZAR", body: "La información puede llegar a un panel y apoyar decisiones.", color: C.gold },
  ];
  panels.forEach((p) => {
    addCard(slide, p.x, 1.86, 3.38, 3.95, { fill: C.white, accent: p.color });
    addImageCrop(slide, p.image, p.x + 0.16, 2.02, 3.06, 1.76);
    addCircleText(slide, p.n, p.x + 0.22, 3.96, 0.52, { fill: p.color, color: p.color === C.gold ? C.navyDeep : C.white, fontSize: 11 });
    slide.addText(p.title, {
      x: p.x + 0.88,
      y: 4.02,
      w: 2.15,
      h: 0.26,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.5,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(p.body, {
      x: p.x + 0.22,
      y: 4.62,
      w: 2.94,
      h: 0.78,
      fontFace: TYPOGRAPHY.body,
      fontSize: 13,
      color: C.ink,
      valign: "mid",
      margin: 0,
    });
  });
  addTakeaway(slide, "GeoGreen conecta una medición física con una respuesta visible y útil.");
  addNotesAndValidate(slide, "Explicar el ciclo sin entrar en electrónica: sensar, interpretar y visualizar. Lo importante en esta reunión es comprender qué hace el sistema y por qué puede convertirse en un caso educativo.");
}

// 03 · Hasta dónde puede crecer una idea
{
  const slide = pptx.addSlide();
  addHeader(slide, "Potencial", "Hasta dónde puede crecer una idea", "Una solución se fortalece cuando integra tecnología, diseño, evidencia y comunicación.", 3);
  const items = [
    { x: 0.78, w: 2.12, image: IMG.original, label: "PUNTO DE PARTIDA", body: "Sensor + conectividad", color: C.red },
    { x: 3.15, w: 2.12, image: IMG.prototype, label: "PROTOTIPO", body: "Lectura + semáforo + alerta", color: C.cyan },
    { x: 5.52, w: 2.12, image: IMG.dashboard, label: "SOFTWARE", body: "Datos + mapa + decisiones", color: C.blue },
    { x: 7.89, w: 2.12, image: IMG.pcb, label: "PRODUCTO", body: "PCB + integración", color: C.gold },
    { x: 10.26, w: 2.12, image: IMG.opening, label: "APRENDIZAJE", body: "Equipos que crean su propia propuesta", color: C.green },
  ];
  items.forEach((item, index) => {
    addCard(slide, item.x, 1.82, item.w, 3.98, { fill: C.white, line: C.border, shadow: true });
    addImageCrop(slide, item.image, item.x + 0.12, 1.94, item.w - 0.24, 1.6);
    addPill(slide, item.label, item.x + 0.17, 3.73, item.w - 0.34, {
      fill: item.color,
      line: item.color,
      color: item.color === C.gold ? C.navyDeep : C.white,
      fontSize: 9,
      h: 0.34,
    });
    slide.addText(item.body, {
      x: item.x + 0.2,
      y: 4.38,
      w: item.w - 0.4,
      h: 0.78,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.3,
      bold: true,
      color: C.navy,
      align: "center",
      valign: "mid",
      margin: 0,
    });
    if (index < items.length - 1) {
      slide.addShape(SH.chevron, {
        x: item.x + item.w + 0.05,
        y: 3.18,
        w: 0.14,
        h: 0.52,
        fill: { color: C.border },
        line: { color: C.border },
      });
    }
  });
  addTakeaway(slide, "GeoGreen demuestra hasta dónde puede crecer una idea. El desafío es que cada equipo haga crecer la suya.");
  addNotesAndValidate(slide, "Esta lámina instala ambición sin convertir GeoGreen en una respuesta obligatoria. El proyecto funciona como referente: muestra capas posibles de desarrollo, desde el problema hasta una solución comunicable.");
}

// 04 · Desafío escolar
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addLockup(slide, { white: true });
  slide.addText("EL DESAFÍO ESCOLAR", {
    x: 0.74,
    y: 0.4,
    w: 5.0,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.25,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Una ruta común para que 60 estudiantes conviertan una observación en una propuesta", {
    x: 0.74,
    y: 0.82,
    w: 9.95,
    h: 1.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.white,
    margin: 0,
  });
  const stats = [
    { x: 0.8, n: "60", label: "ESTUDIANTES", sub: "Instituto Comercial", color: C.red },
    { x: 3.52, n: "2", label: "BLOQUES", sub: "30 estudiantes cada uno", color: C.cyan },
    { x: 6.24, n: "10", label: "EQUIPOS", sub: "5 equipos por bloque", color: C.gold },
    { x: 8.96, n: "6", label: "RESPONSABILIDADES", sub: "una por integrante", color: C.green },
  ];
  stats.forEach((s) => {
    addCard(slide, s.x, 2.34, 2.42, 1.84, { fill: C.darkPanel, line: "28435F", shadow: false });
    slide.addText(s.n, {
      x: s.x + 0.18,
      y: 2.52,
      w: 2.06,
      h: 0.62,
      fontFace: TYPOGRAPHY.display,
      fontSize: 31,
      bold: true,
      color: s.color,
      align: "center",
      margin: 0,
    });
    slide.addText(s.label, {
      x: s.x + 0.18,
      y: 3.18,
      w: 2.06,
      h: 0.23,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.2,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
    slide.addText(s.sub, {
      x: s.x + 0.18,
      y: 3.52,
      w: 2.06,
      h: 0.34,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.4,
      color: C.paleInk,
      align: "center",
      margin: 0,
    });
  });
  const milestones = [
    { x: 1.7, date: "17 AGO", title: "COMIENZA LA RUTA", color: C.red },
    { x: 4.9, date: "3 TALLERES", title: "BASE COMÚN", color: C.cyan },
    { x: 8.1, date: "4 MENTORÍAS", title: "DESARROLLO Y MEJORA", color: C.gold },
    { x: 11.3, date: "05 OCT", title: "EVENTO FINAL", color: C.green },
  ];
  slide.addShape(SH.line, { x: 1.91, y: 5.17, w: 9.6, h: 0, line: { color: "54708D", pt: 2 } });
  milestones.forEach((m) => {
    addCircleText(slide, "", m.x, 4.96, 0.42, { fill: m.color, line: m.color });
    slide.addText(m.date, {
      x: m.x - 0.59,
      y: 5.52,
      w: 1.6,
      h: 0.25,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.5,
      bold: true,
      color: m.color,
      align: "center",
      margin: 0,
    });
    slide.addText(m.title, {
      x: m.x - 0.52,
      y: 5.88,
      w: 1.48,
      h: 0.42,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.5,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
  });
  slide.addText("La competencia reconoce el proceso completo: problema, propuesta, evidencia y comunicación.", {
    x: 1.16,
    y: 6.48,
    w: 11.0,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 4, { white: true });
  addNotesAndValidate(slide, "Precisar que la competencia ocurre al final, después de los talleres y mentorías. Las sesiones entregan herramientas; el desarrollo principal continúa con el trabajo del equipo entre encuentros.", { ignoreLines: true });
}

// 05 · Propósito de la reunión
{
  const slide = pptx.addSlide();
  addHeader(slide, "Hoy", "Una conversación para salir con un mapa común", "Tres movimientos ordenan el diálogo sin convertirlo en una exposición rígida.", 5);
  slide.addShape(SH.roundRect, {
    x: 0.82,
    y: 1.92,
    w: 11.7,
    h: 4.16,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("PUNTO DE PARTIDA", {
    x: 1.14,
    y: 2.27,
    w: 1.55,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.8,
    bold: true,
    charSpacing: 0.9,
    color: C.paleInk,
    align: "center",
    margin: 0,
  });
  addCircleText(slide, "HOY", 1.38, 2.91, 1.02, { fill: C.white, line: C.cyan, linePt: 2, color: C.navy, fontSize: 15 });
  slide.addShape(SH.line, {
    x: 2.38,
    y: 3.42,
    w: 7.2,
    h: 0,
    line: { color: "54708D", pt: 3, beginArrowType: "none", endArrowType: "triangle" },
  });
  const outcomes = [
    { x: 3.0, y: 3.03, n: "01", title: "COMPRENDER", body: "La experiencia completa que vivirán los estudiantes.", color: C.red },
    { x: 5.72, y: 3.03, n: "02", title: "ARTICULAR", body: "El liderazgo de Desarrollo Social y sus conexiones.", color: C.cyan },
    { x: 8.44, y: 3.03, n: "03", title: "CONTINUAR", body: "Lo que puede variar y lo que debe permanecer.", color: C.gold },
  ];
  outcomes.forEach((o) => {
    addCircleText(slide, o.n, o.x, o.y, 0.78, { fill: o.color, color: o.color === C.gold ? C.navyDeep : C.white, fontSize: 14.5 });
    slide.addText(o.title, {
      x: o.x - 0.48,
      y: o.y + 1.02,
      w: 1.74,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.6,
      bold: true,
      color: o.color,
      align: "center",
      margin: 0,
    });
    slide.addText(o.body, {
      x: o.x - 0.65,
      y: o.y + 1.48,
      w: 2.08,
      h: 0.72,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.7,
      color: C.white,
      align: "center",
      margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 10.34,
    y: 2.43,
    w: 1.72,
    h: 2.62,
    rectRadius: 0.05,
    fill: { color: C.white },
    line: { color: C.gold, pt: 2 },
  });
  slide.addText("SALIMOS CON", {
    x: 10.56,
    y: 2.78,
    w: 1.28,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.5,
    bold: true,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  slide.addText("UN MAPA\nCOMÚN", {
    x: 10.53,
    y: 3.28,
    w: 1.34,
    h: 0.88,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18.5,
    bold: true,
    color: C.navy,
    align: "center",
    valign: "mid",
    margin: 0,
  });
  addPill(slide, "PROYECTO + ROLES + CONTINUIDAD", 9.96, 5.36, 2.5, { fill: C.gold, line: C.gold, color: C.navyDeep, fontSize: 8.8, h: 0.38 });
  addTakeaway(slide, "Resultado esperado: comprender la ruta, reconocer el aporte y resguardar sus conexiones.");
  // La línea de recorrido atraviesa deliberadamente los nodos para construir una ruta visual.
  addNotesAndValidate(slide, "Usar esta lámina como agenda flexible. No es necesario leerla completa: sirve para recordar los tres acuerdos cognitivos que debe dejar la conversación.", { skipOverlap: true });
}

// 06 · Desarrollo Social es indispensable
{
  const slide = pptx.addSlide();
  addHeader(slide, "Aporte disciplinar", "La tecnología entrega capacidad. La mirada social le da sentido.", "Un dispositivo puede medir y alertar; una propuesta pertinente comprende el problema, las personas y su contexto.", 6, { titleFontSize: 27, titleH: 0.72, subtitleY: 1.5 });

  slide.addShape(SH.roundRect, {
    x: 0.8,
    y: 2.22,
    w: 5.65,
    h: 3.42,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.blue, pt: 1.5 },
    shadow: { type: "outer", color: "16304A", opacity: 0.14, blur: 2, angle: 45, distance: 1.2 },
  });
  addImageCrop(slide, IMG.system, 0.88, 2.3, 5.49, 2.68);
  slide.addShape(SH.rect, { x: 0.88, y: 4.64, w: 5.49, h: 0.34, fill: { color: C.navy, transparency: 5 }, line: { color: C.navy, transparency: 100 } });
  slide.addText("SENSAR  →  PROCESAR  →  VISUALIZAR  →  ALERTAR", {
    x: 1.08,
    y: 4.71,
    w: 5.09,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 10.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addPill(slide, "CAPACIDAD TÉCNICA", 1.06, 5.13, 2.06, { fill: C.blue, line: C.blue, color: C.white, fontSize: 9.8, h: 0.32 });
  slide.addText("Lo que el sistema puede medir, construir y comunicar.", {
    x: 3.26,
    y: 5.12,
    w: 2.82,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.4,
    color: C.ink,
    valign: "mid",
    margin: 0,
  });

  addCircleText(slide, "+", 6.64, 3.48, 0.64, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 22 });
  addPill(slide, "LECTURA SOCIAL", 8.75, 2.16, 2.18, { fill: C.green, line: C.green, color: C.white, fontSize: 10.3, h: 0.34 });
  const socialQuestions = [
    { x: 7.28, y: 2.72, w: 2.48, text: "¿QUÉ PROBLEMA\nIMPORTA?", color: C.red },
    { x: 10.0, y: 2.72, w: 2.48, text: "¿A QUIÉN AFECTA\nY CÓMO?", color: C.gold },
    { x: 7.28, y: 3.82, w: 2.48, text: "¿QUÉ CONTEXTO\nDEBEMOS LEER?", color: C.green },
    { x: 10.0, y: 3.82, w: 2.48, text: "¿CÓMO PARTICIPARÁ\nLA COMUNIDAD?", color: C.cyan },
  ];
  socialQuestions.forEach((q) => {
    slide.addShape(SH.roundRect, {
      x: q.x,
      y: q.y,
      w: q.w,
      h: 0.78,
      rectRadius: 0.04,
      fill: { color: C.white },
      line: { color: q.color, pt: 1.5 },
    });
    slide.addText(q.text, {
      x: q.x + 0.14,
      y: q.y + 0.16,
      w: q.w - 0.28,
      h: 0.46,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.5,
      bold: true,
      color: C.navy,
      align: "center",
      valign: "mid",
      margin: 0,
    });
  });
  slide.addShape(SH.line, { x: 8.52, y: 4.6, w: 0, h: 0.32, line: { color: C.border, pt: 1.4 } });
  slide.addShape(SH.line, { x: 11.24, y: 4.6, w: 0, h: 0.32, line: { color: C.border, pt: 1.4 } });
  slide.addShape(SH.line, { x: 8.52, y: 4.92, w: 2.72, h: 0, line: { color: C.border, pt: 1.4 } });
  slide.addShape(SH.line, { x: 9.88, y: 4.92, w: 0, h: 0.24, line: { color: C.border, pt: 1.4 } });
  slide.addShape(SH.roundRect, {
    x: 7.68,
    y: 5.12,
    w: 4.4,
    h: 0.66,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.cyan, pt: 2 },
  });
  slide.addText("PROPUESTA CON SENTIDO", {
    x: 8.0,
    y: 5.32,
    w: 3.76,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addTakeaway(slide, "La interdisciplinariedad conecta capacidad técnica, contexto y decisiones.", { fill: C.red });
  addNotesAndValidate(slide, "Aquí está el argumento central para Desarrollo Social. Su aporte no es decorar una solución terminada: es sostener la formulación del problema, la lectura del contexto, la participación y la comunicación durante la ruta.");
}

// 07 · Base común + sello profesional
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addTopBars(slide);
  addLockup(slide, { white: true });
  slide.addText("FORMA DE TRABAJO", {
    x: 0.72,
    y: 0.35,
    w: 3.2,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    bold: true,
    charSpacing: 1.25,
    color: C.cyan,
    margin: 0,
  });
  slide.addText("Base común + sello profesional", {
    x: 0.72,
    y: 0.72,
    w: 8.2,
    h: 0.58,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("El material entrega estructura; la experiencia docente aporta profundidad y pertinencia.", {
    x: 0.74,
    y: 1.36,
    w: 8.9,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.5,
    color: C.paleInk,
    margin: 0,
  });
  addPill(slide, "BASE LISTA PARA USAR", 0.86, 1.98, 2.45, { fill: C.red, line: C.red, color: C.white, fontSize: 10.4 });
  const previews = [
    { x: 0.94, y: 2.56, image: IMG.t1, rotate: -5, color: C.red },
    { x: 1.98, y: 2.42, image: IMG.t2, rotate: -1.5, color: C.cyan },
    { x: 3.02, y: 2.5, image: IMG.m1, rotate: 2.5, color: C.gold },
    { x: 4.06, y: 2.62, image: IMG.m4, rotate: 5, color: C.green },
  ];
  previews.forEach((p) => {
    slide.addShape(SH.roundRect, {
      x: p.x - 0.06,
      y: p.y - 0.06,
      w: 1.48,
      h: 2.72,
      rotate: p.rotate,
      rectRadius: 0.03,
      fill: { color: C.white },
      line: { color: p.color, pt: 1.5 },
      shadow: { type: "outer", color: "000000", opacity: 0.25, blur: 2, angle: 45, distance: 1.5 },
    });
    addImageCrop(slide, p.image, p.x, p.y, 1.36, 2.6, { rotate: p.rotate });
  });
  slide.addText("README · planificación · PPT · fichas · infografías", {
    x: 0.96,
    y: 5.54,
    w: 4.5,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.8,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addCircleText(slide, "+", 5.76, 3.28, 0.9, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 25 });
  addPill(slide, "SELLO PROFESIONAL", 7.0, 1.98, 2.38, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 10.4 });
  addCircleText(slide, "MIRADA\nDOCENTE", 8.16, 2.72, 2.12, { fill: C.white, line: C.cyan, linePt: 2.2, color: C.navy, fontSize: 18 });
  const lenses = [
    { x: 6.42, y: 2.58, text: "PREGUNTAS\nPERTINENTES", color: C.red },
    { x: 10.48, y: 2.58, text: "EJEMPLOS DEL\nTERRITORIO", color: C.gold },
    { x: 6.42, y: 4.52, text: "LECTURA DE\nACTORES", color: C.green },
    { x: 10.48, y: 4.52, text: "MEDIACIÓN\nDEL GRUPO", color: C.cyan },
  ];
  lenses.forEach((l) => {
    slide.addShape(SH.roundRect, {
      x: l.x,
      y: l.y,
      w: 1.52,
      h: 0.72,
      rectRadius: 0.04,
      fill: { color: C.darkPanel },
      line: { color: l.color, pt: 1.5 },
    });
    slide.addText(l.text, {
      x: l.x + 0.12,
      y: l.y + 0.14,
      w: 1.28,
      h: 0.4,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.8,
      bold: true,
      color: C.white,
      align: "center",
      valign: "mid",
      margin: 0,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 6.78,
    y: 5.64,
    w: 5.36,
    h: 0.82,
    rectRadius: 0.04,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("EXPERIENCIA COHERENTE ENTRE SESIONES", {
    x: 7.08,
    y: 5.88,
    w: 4.76,
    h: 0.3,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.8,
    bold: true,
    color: C.navyDeep,
    align: "center",
    margin: 0,
  });
  slide.addText("Los materiales apoyan. La experiencia docente guía. Los entregables sostienen la continuidad.", {
    x: 0.86,
    y: 6.62,
    w: 11.45,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.8,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 7, { white: true });
  addNotesAndValidate(slide, "Presentar los materiales como una ventaja y una invitación profesional, no como una pauta cerrada. El equipo puede usar, adaptar o enriquecer la base; lo importante es que la salida de cada sesión llegue completa a la siguiente.", { skipOverlap: true });
}

// 08 · Lógica completa
{
  const slide = pptx.addSlide();
  addHeader(slide, "Ruta completa", "Diez etapas. Una sola cadena.", "Cada encuentro recibe un avance concreto y deja preparado el siguiente punto de partida.", 8);
  const roleColors = { social: C.red, tech: C.blue, joint: C.green };
  const stages = [
    { n: "01", x: 0.78, y: 2.08, code: "T1 · 17 AGO", title: "PROBLEMA", output: "Equipo + problema concreto", role: "social" },
    { n: "02", x: 3.2, y: 2.08, code: "T2 · 18 AGO", title: "MATERIAL", output: "Ficha de análisis", role: "social" },
    { n: "03", x: 5.62, y: 2.08, code: "T3 · 24 AGO", title: "IDEA", output: "Propuesta tecnológica", role: "tech" },
    { n: "04", x: 8.04, y: 2.08, code: "M1 · 31 AGO", title: "CONTEXTO", output: "Problema validado", role: "social" },
    { n: "05", x: 10.46, y: 2.08, code: "M2 · 07 SEP", title: "SOLUCIÓN", output: "Solución + recursos", role: "tech" },
    { n: "06", x: 0.78, y: 4.32, code: "M3 · 21 SEP", title: "EVIDENCIA", output: "Avance comprobable", role: "tech" },
    { n: "07", x: 3.2, y: 4.32, code: "M4 · 28 SEP", title: "PITCH", output: "Presentación corregida", role: "social" },
    { n: "08", x: 5.62, y: 4.32, code: "HITO · 02 OCT", title: "DIFUSIÓN", output: "Cierre próximo", role: "joint" },
    { n: "09", x: 8.04, y: 4.32, code: "EVENTO · 05 OCT", title: "PRESENTAR", output: "Jurado + premiación", role: "joint" },
    { n: "10", x: 10.46, y: 4.32, code: "CIERRE · 12 OCT", title: "APRENDER", output: "Informe + mejoras", role: "joint" },
  ];
  stages.forEach((s, index) => {
    const color = roleColors[s.role];
    addCard(slide, s.x, s.y, 2.08, 1.56, { fill: C.white, line: color, linePt: 1.4, accent: color, shadow: false });
    addCircleText(slide, s.n, s.x + 0.16, s.y + 0.16, 0.42, { fill: color, line: color, fontSize: 9.4 });
    slide.addText(s.code, {
      x: s.x + 0.72,
      y: s.y + 0.2,
      w: 1.14,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      bold: true,
      color,
      align: "right",
      margin: 0,
    });
    slide.addText(s.title, {
      x: s.x + 0.22,
      y: s.y + 0.67,
      w: 1.64,
      h: 0.25,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.8,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(s.output, {
      x: s.x + 0.22,
      y: s.y + 1.08,
      w: 1.64,
      h: 0.3,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.8,
      color: C.ink,
      margin: 0,
    });
    const isEndOfRow = index === 4 || index === 9;
    if (!isEndOfRow) {
      slide.addShape(SH.chevron, {
        x: s.x + 2.12,
        y: s.y + 0.59,
        w: 0.22,
        h: 0.38,
        fill: { color: C.border },
        line: { color: C.border },
      });
    }
  });
  addPill(slide, "DESARROLLO SOCIAL", 0.8, 1.76, 1.66, { fill: C.red, line: C.red, color: C.white, fontSize: 8.8, h: 0.26 });
  addPill(slide, "PROGRAMACIÓN / SISTEMAS", 2.58, 1.76, 2.18, { fill: C.blue, line: C.blue, color: C.white, fontSize: 8.4, h: 0.26 });
  addPill(slide, "EQUIPO CONJUNTO", 4.88, 1.76, 1.66, { fill: C.green, line: C.green, color: C.white, fontSize: 8.5, h: 0.26 });
  addTakeaway(slide, "Regla de continuidad: lo que un equipo produce hoy alimenta la etapa siguiente.", { y: 6.32 });
  addNotesAndValidate(slide, "Recorrer el mapa en dos filas. Los colores identifican el liderazgo de cada etapa; el énfasis debe estar en el producto que viaja hacia la siguiente sesión, no en memorizar fechas.", { ignoreLines: true });
}

// 09 · Cuatro momentos de liderazgo
{
  const slide = pptx.addSlide();
  addHeader(slide, "Ruta de Desarrollo Social", "Cuatro momentos conectan sentido, contexto y comunicación", "Dos talleres instalan la base; dos mentorías validan y preparan la presentación.", 9);
  const sessions = [
    { x: 0.82, date: "17 AGO", code: "T1", title: "OBSERVAR", body: "Problema ambiental concreto", output: "EQUIPO + PROBLEMA", color: C.red, image: IMG.t1 },
    { x: 3.85, date: "18 AGO", code: "T2", title: "COMPRENDER", body: "Residuo, material y hábitos", output: "FICHA DE MATERIAL", color: C.cyan, image: IMG.t2 },
    { x: 6.88, date: "31 AGO", code: "M1", title: "VALIDAR", body: "Contexto, actores y contraste", output: "PROBLEMA VALIDADO", color: C.gold, image: IMG.m1 },
    { x: 9.91, date: "28 SEP", code: "M4", title: "COMUNICAR", body: "Seis voces, ensayo y mejora", output: "PRESENTACIÓN PREPARADA", color: C.green, image: IMG.m4 },
  ];
  slide.addShape(SH.line, { x: 1.78, y: 3.62, w: 9.18, h: 0, line: { color: C.border, pt: 4, endArrowType: "triangle" } });
  sessions.forEach((s) => {
    slide.addShape(SH.roundRect, {
      x: s.x,
      y: 1.92,
      w: 2.58,
      h: 1.46,
      rectRadius: 0.04,
      fill: { color: C.white },
      line: { color: s.color, pt: 1.8 },
      shadow: { type: "outer", color: "A5AFBB", opacity: 0.18, blur: 1.5, angle: 45, distance: 1 },
    });
    addImageCrop(slide, s.image, s.x + 0.13, 2.05, 2.32, 1.2);
    addCircleText(slide, s.code, s.x + 0.9, 3.28, 0.78, { fill: C.navy, line: s.color, linePt: 2, fontSize: 13 });
    addPill(slide, s.date, s.x + 0.08, 4.26, 0.98, { fill: s.color, line: s.color, color: s.color === C.gold ? C.navyDeep : C.white, fontSize: 9.4, h: 0.34 });
    slide.addText(s.title, {
      x: s.x + 1.18,
      y: 4.3,
      w: 1.3,
      h: 0.26,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.8,
      bold: true,
      color: C.navy,
      align: "right",
      margin: 0,
    });
    slide.addText(s.body, {
      x: s.x + 0.08,
      y: 4.88,
      w: 2.42,
      h: 0.34,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.7,
      color: C.ink,
      align: "center",
      margin: 0,
    });
    addPill(slide, s.output, s.x + 0.12, 5.4, 2.34, { fill: C.white, line: s.color, color: C.navy, fontSize: 8.8, h: 0.42 });
  });
  addTakeaway(slide, "Desarrollo Social acompaña el arco completo: del problema observado a la propuesta comunicable.");
  addNotesAndValidate(slide, "Nombrar con precisión las cuatro intervenciones y su salida. T1 y T2 construyen la base; M1 valida; M4 recupera todo lo anterior para ensayar. Las mentorías intermedias técnicas ocurren entre M1 y M4.", { ignoreLines: true, skipOverlap: true });
}

// 10 · Adaptable y continuidad
{
  const slide = pptx.addSlide();
  addHeader(slide, "Marco común", "El cómo se adapta. El qué sostiene la continuidad.", "La experiencia docente puede transformar la mediación sin cortar la cadena del proyecto.", 10);
  addPill(slide, "EL DOCENTE ADAPTA EL CÓMO", 0.92, 1.78, 3.0, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 10.8 });
  const flexible = [
    { x: 1.0, w: 3.28, title: "LENGUAJE + EJEMPLOS", sub: "La explicación se acerca al grupo." },
    { x: 4.58, w: 3.28, title: "PREGUNTAS + DINÁMICA", sub: "La mediación activa su experiencia." },
    { x: 8.16, w: 3.28, title: "RECURSOS + PRESENTACIÓN", sub: "El soporte puede cambiar." },
  ];
  flexible.forEach((f) => {
    addCard(slide, f.x, 2.34, f.w, 0.98, { fill: C.cyanSoft, line: C.cyan, accent: C.cyan, shadow: false });
    slide.addText(f.title, {
      x: f.x + 0.24,
      y: 2.52,
      w: f.w - 0.48,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.2,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(f.sub, {
      x: f.x + 0.24,
      y: 2.85,
      w: f.w - 0.48,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.9,
      color: C.slate,
      align: "center",
      margin: 0,
    });
    slide.addShape(SH.line, { x: f.x + f.w / 2, y: 3.32, w: 0, h: 0.38, line: { color: C.cyan, pt: 1.4, dash: "dash" } });
  });
  slide.addShape(SH.roundRect, {
    x: 0.9,
    y: 3.72,
    w: 11.58,
    h: 0.88,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("CONTINUIDAD ENTRE SESIONES", {
    x: 3.3,
    y: 3.98,
    w: 6.8,
    h: 0.3,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addPill(slide, "EL PROYECTO PRESERVA EL QUÉ", 0.92, 4.82, 3.12, { fill: C.red, line: C.red, color: C.white, fontSize: 10.8 });
  const fixed = [
    { x: 0.94, title: "EQUIPOS", sub: "6 responsabilidades" },
    { x: 3.25, title: "PROTAGONISMO", sub: "decisiones estudiantiles" },
    { x: 5.56, title: "PRODUCTO", sub: "salida obligatoria" },
    { x: 7.87, title: "AUTONOMÍA", sub: "trabajo entre sesiones" },
    { x: 10.18, title: "CONEXIÓN", sub: "entrada siguiente" },
  ];
  fixed.forEach((f, index) => {
    addCircleText(slide, String(index + 1).padStart(2, "0"), f.x + 0.62, 5.34, 0.62, { fill: C.white, line: C.red, color: C.red, fontSize: 10.5 });
    slide.addText(f.title, {
      x: f.x,
      y: 6.08,
      w: 1.86,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.4,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(f.sub, {
      x: f.x,
      y: 6.39,
      w: 1.86,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.8,
      color: C.slate,
      align: "center",
      margin: 0,
    });
  });
  addTakeaway(slide, "Libertad para enseñar desde la experiencia; claridad para entregar continuidad.", { fill: C.navy, y: 6.7, w: 10.46, h: 0.34, fontSize: 11.2 });
  addNotesAndValidate(slide, "Este es el acuerdo más importante. La presentación o dinámica puede cambiar. Lo que no puede desaparecer es el producto que el siguiente equipo docente necesita recibir, junto con la organización y el protagonismo de los estudiantes.", { ignoreLines: true });
}

// 11 · Cadena de entregables
{
  const slide = pptx.addSlide();
  addHeader(slide, "Continuidad", "Siete productos convierten actividades aisladas en un solo proceso", "Cada resultado queda visible, se recupera y se mejora en la etapa siguiente.", 11);
  const nodes = [
    { x: 0.76, code: "T1", label: "PROBLEMA", sub: "concreto", color: C.red },
    { x: 2.48, code: "T2", label: "MATERIAL", sub: "analizado", color: C.cyan },
    { x: 4.2, code: "T3", label: "IDEA", sub: "tecnológica", color: C.blue },
    { x: 5.92, code: "M1", label: "CONTEXTO", sub: "validado", color: C.gold },
    { x: 7.64, code: "M2", label: "SOLUCIÓN", sub: "+ recursos", color: C.green },
    { x: 9.36, code: "M3", label: "EVIDENCIA", sub: "de avance", color: C.cyan },
    { x: 11.08, code: "M4", label: "PITCH", sub: "corregido", color: C.red },
  ];
  slide.addShape(SH.line, { x: 1.25, y: 3.12, w: 10.37, h: 0, line: { color: C.border, pt: 4 } });
  nodes.forEach((n, index) => {
    addCircleText(slide, n.code, n.x, 2.67, 0.9, { fill: n.color, color: n.color === C.gold ? C.navyDeep : C.white, fontSize: 13 });
    slide.addText(n.label, {
      x: n.x - 0.27,
      y: 3.91,
      w: 1.44,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.6,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(n.sub, {
      x: n.x - 0.27,
      y: 4.28,
      w: 1.44,
      h: 0.26,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.6,
      color: C.slate,
      align: "center",
      margin: 0,
    });
    if (index < nodes.length - 1) {
      slide.addShape(SH.chevron, { x: n.x + 1.15, y: 2.92, w: 0.28, h: 0.4, fill: { color: C.white }, line: { color: C.white } });
    }
  });
  addCard(slide, 1.1, 5.05, 11.15, 0.92, { fill: C.white, line: C.border, shadow: false });
  slide.addText("ENTRE SESIONES", {
    x: 1.38,
    y: 5.35,
    w: 1.45,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.3,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText("Los equipos desarrollan, prueban y mejoran. Las mentorías orientan, contrastan y destraban; no reemplazan ese trabajo.", {
    x: 2.98,
    y: 5.27,
    w: 8.86,
    h: 0.4,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.2,
    bold: true,
    color: C.navy,
    valign: "mid",
    margin: 0,
  });
  addTakeaway(slide, "Si falta un producto, la siguiente etapa pierde su punto de partida.");
  addNotesAndValidate(slide, "Recorrer rápidamente la cadena y detenerse en los cuatro productos donde participa Desarrollo Social: T1, T2, M1 y M4. Reforzar que el trabajo entre sesiones pertenece a los equipos.", { ignoreLines: true });
}

// 12 · Equipos y autonomía
{
  const slide = pptx.addSlide();
  addHeader(slide, "Experiencia estudiantil", "Una estructura simple distribuye el trabajo y mantiene seis voces activas", "Cada equipo conserva las mismas responsabilidades durante toda la ruta.", 12);
  addCard(slide, 0.78, 1.86, 3.76, 4.16, { fill: C.white, line: C.border });
  addImageContain(slide, IMG.roles, 1.17, 2.02, 2.98, 3.78);
  addCard(slide, 4.86, 1.86, 7.68, 2.0, { fill: C.navy, line: C.navy, shadow: false });
  slide.addText("2 BLOQUES", { x: 5.22, y: 2.28, w: 1.74, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 21, bold: true, color: C.cyan, align: "center", margin: 0 });
  slide.addText("×", { x: 7.08, y: 2.28, w: 0.42, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 21, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("5 EQUIPOS", { x: 7.62, y: 2.28, w: 1.8, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 21, bold: true, color: C.gold, align: "center", margin: 0 });
  slide.addText("×", { x: 9.54, y: 2.28, w: 0.42, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 21, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("6", { x: 10.02, y: 2.12, w: 2.05, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 20, bold: true, color: C.red, align: "center", margin: 0 });
  slide.addText("ESTUDIANTES", { x: 10.02, y: 2.56, w: 2.05, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 16.5, bold: true, color: C.red, align: "center", margin: 0 });
  slide.addText("= 60 protagonistas del proceso", { x: 6.05, y: 3.08, w: 5.25, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 14.5, bold: true, color: C.white, align: "center", margin: 0 });
  const roles = [
    { x: 4.92, y: 4.25, title: "COORDINACIÓN", color: C.red },
    { x: 7.45, y: 4.25, title: "INVESTIGACIÓN", color: C.cyan },
    { x: 9.98, y: 4.25, title: "DISEÑO", color: C.gold },
    { x: 4.92, y: 5.12, title: "TECNOLOGÍA", color: C.blue },
    { x: 7.45, y: 5.12, title: "PRUEBAS Y EVIDENCIA", color: C.green },
    { x: 9.98, y: 5.12, title: "COMUNICACIÓN", color: C.red },
  ];
  roles.forEach((r) => {
    addCard(slide, r.x, r.y, 2.28, 0.66, { fill: C.white, line: r.color, accent: r.color, shadow: false });
    slide.addText(r.title, { x: r.x + 0.24, y: r.y + 0.18, w: 1.86, h: 0.23, fontFace: TYPOGRAPHY.body, fontSize: 10.7, bold: true, color: C.navy, align: "center", margin: 0 });
  });
  addTakeaway(slide, "La estructura distribuye responsabilidades; las decisiones siguen perteneciendo al equipo.");
  addNotesAndValidate(slide, "La asignación de seis responsabilidades no encierra a los estudiantes en tareas aisladas. Hace visible quién cuida cada dimensión y permite que todos tengan una intervención real en el proceso y en la presentación final.");
}

// 13 · Material disponible
{
  const slide = pptx.addSlide();
  addHeader(slide, "Material preparado", "Cuatro paquetes permiten profundizar y ejecutar cada intervención", "Se pueden usar directamente o adaptar, conservando el producto de continuidad.", 13);
  const packs = [
    { x: 0.74, image: IMG.t1, code: "TALLER 1", title: "Conciencia ambiental", output: "Equipo + problema", color: C.red },
    { x: 3.82, image: IMG.t2, code: "TALLER 2", title: "Ciencia del reciclaje", output: "Ficha de material", color: C.cyan },
    { x: 6.9, image: IMG.m1, code: "MENTORÍA 1", title: "Problema y contexto", output: "Problema validado", color: C.gold },
    { x: 9.98, image: IMG.m4, code: "MENTORÍA 4", title: "Comunicar y ensayar", output: "Pitch corregido", color: C.green },
  ];
  packs.forEach((p) => {
    addCard(slide, p.x, 1.82, 2.62, 4.44, { fill: C.white, line: C.border, shadow: true });
    addImageCrop(slide, p.image, p.x + 0.16, 1.98, 2.3, 2.18);
    addPill(slide, p.code, p.x + 0.22, 4.32, 2.18, { fill: p.color, line: p.color, color: p.color === C.gold ? C.navyDeep : C.white, fontSize: 10.1 });
    slide.addText(p.title, { x: p.x + 0.22, y: 4.92, w: 2.18, h: 0.42, fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addText(p.output, { x: p.x + 0.22, y: 5.56, w: 2.18, h: 0.26, fontFace: TYPOGRAPHY.body, fontSize: 11, bold: true, color: p.color === C.gold ? "9A6C00" : p.color, align: "center", margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 1.08, y: 6.48, w: 11.16, h: 0.44, rectRadius: 0.04, fill: { color: C.softBlue }, line: { color: C.softBlue } });
  slide.addText("Cada RAR incluye orientación, planificación, PPT, fichas e infografías según la sesión.", { x: 1.36, y: 6.58, w: 10.6, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 12.2, bold: true, color: C.navy, align: "center", margin: 0 });
  addNotesAndValidate(slide, "No recorrer el contenido de cada RAR en detalle salvo que se solicite. El mensaje es que existe una base completa, coherente y lista para revisar; después de la reunión, cada docente puede profundizar en el paquete que le corresponda.");
}

// 14 · Cierre
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navyDeep };
  addImageCrop(slide, IMG.opening, 7.35, 0, 5.98, H);
  slide.addShape(SH.rect, { x: 6.45, y: 0, w: 2.5, h: H, fill: { color: C.navyDeep, transparency: 16 }, line: { color: C.navyDeep, transparency: 100 } });
  addTopBars(slide);
  addLockup(slide, { white: true, panel: true, panelFill: C.navyDeep, panelTransparency: 10 });
  addPill(slide, "CIERRE", 0.78, 0.6, 1.18, { fill: C.red, line: C.red, color: C.white, fontSize: 10.8 });
  slide.addText("Desarrollo Social sostiene el sentido del proyecto", {
    x: 0.78,
    y: 1.38,
    w: 5.75,
    h: 1.05,
    fontFace: TYPOGRAPHY.display,
    fontSize: 32,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Ayuda a que cada propuesta responda a un problema real, situado y comunicable.", {
    x: 0.82,
    y: 2.68,
    w: 5.35,
    h: 0.82,
    fontFace: TYPOGRAPHY.body,
    fontSize: 18,
    color: C.paleInk,
    margin: 0,
  });
  const pillars = [
    { y: 3.92, n: "01", title: "PROBLEMA CON SENTIDO", color: C.red },
    { y: 4.65, n: "02", title: "PARTICIPACIÓN CON ROLES", color: C.cyan },
    { y: 5.38, n: "03", title: "PROPUESTA QUE SE COMPRENDE", color: C.gold },
  ];
  pillars.forEach((p) => {
    addCircleText(slide, p.n, 0.86, p.y, 0.5, { fill: p.color, color: p.color === C.gold ? C.navyDeep : C.white, fontSize: 10.6 });
    slide.addText(p.title, { x: 1.62, y: p.y + 0.11, w: 4.3, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: p.color, margin: 0 });
  });
  slide.addShape(SH.roundRect, { x: 0.8, y: 6.28, w: 5.42, h: 0.62, rectRadius: 0.04, fill: { color: C.white, transparency: 4 }, line: { color: C.white, transparency: 100 } });
  slide.addText("Una ruta común. Distintas miradas. Un desafío compartido.", { x: 1.08, y: 6.45, w: 4.86, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 14.3, bold: true, color: C.navyDeep, align: "center", margin: 0 });
  addFooter(slide, 14, { white: true });
  addNotesAndValidate(slide, "Cerrar y abrir la conversación. La idea final es que la base común aporta previsibilidad, mientras la experiencia de cada disciplina hace que el proyecto sea más profundo, pertinente y ejecutable.", { skipOverlap: true });
}

(async () => {
  await pptx.writeFile({ fileName: outputPptx });
  console.log(`PPTX generado: ${outputPptx}`);
  console.log(`Diapositivas: ${pptx._slides.length}`);
})();
