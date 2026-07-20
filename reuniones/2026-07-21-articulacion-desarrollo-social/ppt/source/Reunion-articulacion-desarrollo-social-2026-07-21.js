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
    { x: 1.02, date: "17 AGO", title: "COMIENZA LA RUTA", color: C.red },
    { x: 4.3, date: "3 TALLERES", title: "BASE COMÚN", color: C.cyan },
    { x: 7.58, date: "4 MENTORÍAS", title: "DESARROLLO Y MEJORA", color: C.gold },
    { x: 10.08, date: "05 OCT", title: "EVENTO FINAL", color: C.green },
  ];
  slide.addShape(SH.line, { x: 1.45, y: 5.17, w: 9.65, h: 0, line: { color: "54708D", pt: 2 } });
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
  addHeader(slide, "Hoy", "Una conversación con tres resultados claros", "El PPT ordena el mapa; la reunión permite enriquecerlo con la experiencia de cada área.", 5);
  const outcomes = [
    { x: 0.82, n: "01", title: "COMPRENDER", body: "Qué experiencia vivirán los estudiantes y cómo avanza la ruta completa.", color: C.red },
    { x: 4.5, n: "02", title: "ARTICULAR", body: "Dónde lidera Desarrollo Social y cómo sus productos alimentan las etapas técnicas.", color: C.cyan },
    { x: 8.18, n: "03", title: "CONTINUAR", body: "Qué puede adaptarse y qué elementos comunes sostienen la cadena del proyecto.", color: C.gold },
  ];
  outcomes.forEach((o) => {
    addCard(slide, o.x, 1.95, 3.36, 3.62, { fill: C.white, line: C.border, accent: o.color });
    addCircleText(slide, o.n, o.x + 1.29, 2.28, 0.78, { fill: o.color, color: o.color === C.gold ? C.navyDeep : C.white, fontSize: 15 });
    slide.addText(o.title, {
      x: o.x + 0.3,
      y: 3.35,
      w: 2.76,
      h: 0.34,
      fontFace: TYPOGRAPHY.display,
      fontSize: 17,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(o.body, {
      x: o.x + 0.38,
      y: 3.98,
      w: 2.6,
      h: 1.0,
      fontFace: TYPOGRAPHY.body,
      fontSize: 13.2,
      color: C.ink,
      align: "center",
      valign: "mid",
      margin: 0,
    });
  });
  addTakeaway(slide, "Resultado esperado: una lectura común del proyecto y de sus conexiones.");
  addNotesAndValidate(slide, "Usar esta lámina como agenda flexible. No es necesario leerla completa: sirve para recordar los tres acuerdos cognitivos que debe dejar la conversación.");
}

// 06 · Desarrollo Social es indispensable
{
  const slide = pptx.addSlide();
  addHeader(slide, "Aporte disciplinar", "La tecnología responde al cómo. Desarrollo Social ayuda a comprender el para qué y con quién.", "Una solución cobra sentido cuando parte de un problema situado y puede ser comprendida por su comunidad.", 6, { titleFontSize: 25, titleH: 0.9, subtitleY: 1.62 });
  addCard(slide, 0.82, 2.25, 3.5, 3.3, { fill: C.softBlue, line: C.softBlue, accent: C.blue, shadow: false });
  addPill(slide, "CAPACIDAD TÉCNICA", 1.12, 2.56, 2.9, { fill: C.blue, line: C.blue, color: C.white, fontSize: 11 });
  ["¿Qué podemos medir?", "¿Cómo construimos?", "¿Cómo mostramos evidencia?"].forEach((t, i) => {
    slide.addText(t, {
      x: 1.12,
      y: 3.25 + i * 0.58,
      w: 2.9,
      h: 0.32,
      fontFace: TYPOGRAPHY.body,
      fontSize: 14,
      bold: i === 0,
      color: C.navy,
      margin: 0,
    });
  });
  addCard(slide, 9.02, 2.25, 3.5, 3.3, { fill: C.greenSoft, line: C.greenSoft, accent: C.green, shadow: false });
  addPill(slide, "LECTURA SOCIAL", 9.32, 2.56, 2.9, { fill: C.green, line: C.green, color: C.white, fontSize: 11 });
  ["¿Qué problema importa?", "¿A quién afecta y cómo?", "¿Cómo participarán y comprenderán?"].forEach((t, i) => {
    slide.addText(t, {
      x: 9.32,
      y: 3.25 + i * 0.58,
      w: 2.9,
      h: 0.32,
      fontFace: TYPOGRAPHY.body,
      fontSize: 14,
      bold: i === 0,
      color: C.navy,
      margin: 0,
    });
  });
  slide.addShape(SH.chevron, { x: 4.62, y: 3.47, w: 0.58, h: 0.8, fill: { color: C.cyan }, line: { color: C.cyan } });
  slide.addShape(SH.chevron, { x: 8.13, y: 3.47, w: 0.58, h: 0.8, rotate: 180, fill: { color: C.cyan }, line: { color: C.cyan } });
  addCircleText(slide, "PROPUESTA\nCON SENTIDO", 5.38, 2.67, 2.58, { fill: C.navy, line: C.cyan, linePt: 2.2, fontSize: 19 });
  addTakeaway(slide, "La interdisciplinariedad no suma partes aisladas: conecta decisiones.", { fill: C.red });
  addNotesAndValidate(slide, "Aquí está el argumento central para Desarrollo Social. Su aporte no es decorar una solución terminada: es sostener la formulación del problema, la lectura del contexto, la participación y la comunicación durante la ruta.");
}

// 07 · Base común + sello profesional
{
  const slide = pptx.addSlide();
  addHeader(slide, "Forma de trabajo", "Base común + sello profesional", "El material reduce la carga de preparación; la experiencia docente le da profundidad y pertinencia.", 7);
  addCard(slide, 0.8, 1.94, 3.25, 3.74, { fill: C.white, line: C.border, accent: C.red });
  addPill(slide, "BASE LISTA PARA USAR", 1.12, 2.25, 2.62, { fill: C.red, line: C.red, color: C.white, fontSize: 10.7 });
  ["README de la sesión", "planificación docente", "PPT y fichas de trabajo", "infografías de apoyo"].forEach((t, i) => {
    addCircleText(slide, String(i + 1), 1.14, 3.0 + i * 0.57, 0.34, { fill: C.redSoft, line: C.red, color: C.red, fontSize: 9.6 });
    slide.addText(t, {
      x: 1.62,
      y: 3.05 + i * 0.57,
      w: 2.05,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.7,
      color: C.ink,
      margin: 0,
    });
  });
  slide.addShape(SH.chevron, { x: 4.38, y: 3.27, w: 0.72, h: 1.0, fill: { color: C.cyan }, line: { color: C.cyan } });
  addCard(slide, 5.32, 1.94, 3.25, 3.74, { fill: C.cyanSoft, line: C.cyan, accent: C.cyan, shadow: false });
  addPill(slide, "SELLO PROFESIONAL", 5.64, 2.25, 2.62, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 10.7 });
  ["preguntas pertinentes", "ejemplos del territorio", "lectura de actores", "mediación del grupo"].forEach((t, i) => {
    addCircleText(slide, String(i + 1), 5.66, 3.0 + i * 0.57, 0.34, { fill: C.white, line: C.cyan, color: C.navy, fontSize: 9.6 });
    slide.addText(t, {
      x: 6.14,
      y: 3.05 + i * 0.57,
      w: 2.05,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.7,
      color: C.ink,
      margin: 0,
    });
  });
  slide.addShape(SH.chevron, { x: 8.9, y: 3.27, w: 0.72, h: 1.0, fill: { color: C.gold }, line: { color: C.gold } });
  addCard(slide, 9.84, 1.94, 2.7, 3.74, { fill: C.navy, line: C.navy, accent: C.gold, shadow: false });
  slide.addText("RESULTADO", {
    x: 10.15,
    y: 2.34,
    w: 2.08,
    h: 0.3,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16,
    bold: true,
    color: C.gold,
    align: "center",
    margin: 0,
  });
  slide.addText("Una experiencia coherente entre sesiones, enriquecida por quienes la facilitan.", {
    x: 10.18,
    y: 3.08,
    w: 2.02,
    h: 1.45,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.white,
    align: "center",
    valign: "mid",
    margin: 0,
  });
  addTakeaway(slide, "Los materiales apoyan. La experiencia docente guía. Los entregables sostienen la continuidad.");
  addNotesAndValidate(slide, "Presentar los materiales como una ventaja y una invitación profesional, no como una pauta cerrada. El equipo puede usar, adaptar o enriquecer la base; lo importante es que la salida de cada sesión llegue completa a la siguiente.");
}

// 08 · Lógica completa
{
  const slide = pptx.addSlide();
  addHeader(slide, "Ruta del proyecto", "Cada etapa recibe algo, lo transforma y entrega el siguiente punto de partida", "La continuidad permite que distintas disciplinas acompañen un mismo proyecto sin fragmentarlo.", 8, { titleFontSize: 24.5 });
  addCard(slide, 0.78, 1.82, 4.1, 4.92, { fill: C.white, line: C.border });
  addImageContain(slide, IMG.logic, 1.05, 1.98, 3.56, 4.58);
  slide.addShape(SH.roundRect, {
    x: 5.2,
    y: 2.12,
    w: 7.28,
    h: 3.96,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  const chain = [
    { x: 5.58, n: "1", title: "PROBLEMA", sub: "situado", color: C.red },
    { x: 6.95, n: "2", title: "MATERIAL", sub: "comprendido", color: C.cyan },
    { x: 8.32, n: "3", title: "TECNOLOGÍA", sub: "propuesta", color: C.gold },
    { x: 9.69, n: "4", title: "EVIDENCIA", sub: "visible", color: C.green },
    { x: 11.06, n: "5", title: "RELATO", sub: "comunicable", color: C.red },
  ];
  slide.addShape(SH.line, { x: 5.88, y: 3.35, w: 5.76, h: 0, line: { color: "54708D", pt: 2 } });
  chain.forEach((c) => {
    addCircleText(slide, c.n, c.x, 3.02, 0.66, { fill: c.color, color: c.color === C.gold ? C.navyDeep : C.white, fontSize: 14 });
    slide.addText(c.title, {
      x: c.x - 0.28,
      y: 3.93,
      w: 1.22,
      h: 0.26,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11,
      bold: true,
      color: c.color,
      align: "center",
      margin: 0,
    });
    slide.addText(c.sub, {
      x: c.x - 0.28,
      y: 4.3,
      w: 1.22,
      h: 0.26,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.5,
      color: C.white,
      align: "center",
      margin: 0,
    });
  });
  slide.addText("La pregunta clave no es solo “¿qué hacemos hoy?”, sino “¿qué debe quedar listo para que el equipo pueda avanzar después?”.", {
    x: 5.72,
    y: 5.08,
    w: 6.2,
    h: 0.55,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.2,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addNotesAndValidate(slide, "La infografía completa queda disponible como referencia. En la conversación, usar la síntesis de cinco pasos para explicar la lógica: cada sesión transforma una entrada en un producto verificable.", { ignoreLines: true });
}

// 09 · Cuatro momentos de liderazgo
{
  const slide = pptx.addSlide();
  addHeader(slide, "Ruta de Desarrollo Social", "Cuatro momentos conectan sentido, contexto y comunicación", "Dos talleres instalan la base; dos mentorías validan y preparan la presentación.", 9);
  const sessions = [
    { x: 0.76, date: "17 AGO", code: "T1", title: "OBSERVAR", body: "Formar equipos y formular un problema ambiental concreto.", output: "Equipo + problema", color: C.red },
    { x: 3.75, date: "18 AGO", code: "T2", title: "COMPRENDER", body: "Relacionar problema, residuo, materiales y condiciones de recuperación.", output: "Ficha de material", color: C.cyan },
    { x: 6.74, date: "31 AGO", code: "M1", title: "VALIDAR", body: "Situar el problema, reconocer actores y definir un próximo paso.", output: "Problema validado", color: C.gold },
    { x: 9.73, date: "28 SEP", code: "M4", title: "COMUNICAR", body: "Integrar la propuesta, distribuir seis voces, ensayar y corregir.", output: "Presentación preparada", color: C.green },
  ];
  sessions.forEach((s, index) => {
    addCard(slide, s.x, 1.88, 2.82, 4.18, { fill: C.white, line: C.border, accent: s.color });
    addPill(slide, s.date, s.x + 0.28, 2.18, 1.05, { fill: s.color, line: s.color, color: s.color === C.gold ? C.navyDeep : C.white, fontSize: 10.2 });
    addCircleText(slide, s.code, s.x + 1.86, 2.08, 0.62, { fill: C.navy, line: C.navy, fontSize: 12 });
    slide.addText(s.title, {
      x: s.x + 0.28,
      y: 3.0,
      w: 2.26,
      h: 0.34,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16.2,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(s.body, {
      x: s.x + 0.28,
      y: 3.56,
      w: 2.26,
      h: 1.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.4,
      color: C.ink,
      valign: "top",
      margin: 0,
    });
    const outputFill = s.color === C.gold ? C.goldSoft : s.color === C.red ? C.redSoft : s.color === C.cyan ? C.cyanSoft : C.greenSoft;
    addPill(slide, s.output, s.x + 0.28, 5.18, 2.26, { fill: outputFill, line: s.color, color: C.navy, fontSize: 10.2, h: 0.48 });
  });
  addTakeaway(slide, "Desarrollo Social acompaña el arco completo: del problema observado a la propuesta comunicable.");
  addNotesAndValidate(slide, "Nombrar con precisión las cuatro intervenciones y su salida. T1 y T2 construyen la base; M1 valida; M4 recupera todo lo anterior para ensayar. Las mentorías intermedias técnicas ocurren entre M1 y M4.");
}

// 10 · Adaptable y continuidad
{
  const slide = pptx.addSlide();
  addHeader(slide, "Marco común", "La mediación puede cambiar. La cadena de aprendizaje debe permanecer.", "La flexibilidad pedagógica y la continuidad del proyecto cumplen funciones distintas y complementarias.", 10, { titleFontSize: 25 });
  addCard(slide, 0.82, 1.92, 5.72, 4.18, { fill: C.cyanSoft, line: C.cyan, accent: C.cyan, shadow: false });
  addPill(slide, "SE PUEDE ADAPTAR", 1.22, 2.25, 2.6, { fill: C.cyan, line: C.cyan, color: C.navyDeep, fontSize: 11.2 });
  const flexible = ["forma de explicar", "ejemplos y preguntas", "dinámicas de facilitación", "recursos y presentación", "experiencia disciplinar incorporada"];
  flexible.forEach((t, i) => {
    addCircleText(slide, "✓", 1.22, 3.05 + i * 0.5, 0.32, { fill: C.white, line: C.cyan, color: C.navy, fontSize: 10.2 });
    slide.addText(t, { x: 1.7, y: 3.08 + i * 0.5, w: 4.25, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 13.2, color: C.ink, margin: 0 });
  });
  addCard(slide, 6.8, 1.92, 5.72, 4.18, { fill: C.redSoft, line: C.red, accent: C.red, shadow: false });
  addPill(slide, "SE DEBE PRESERVAR", 7.2, 2.25, 2.82, { fill: C.red, line: C.red, color: C.white, fontSize: 11.2 });
  const fixed = ["equipos y seis responsabilidades", "protagonismo estudiantil", "producto obligatorio de la etapa", "trabajo autónomo entre sesiones", "entrada clara para la etapa siguiente"];
  fixed.forEach((t, i) => {
    addCircleText(slide, "•", 7.2, 3.05 + i * 0.5, 0.32, { fill: C.white, line: C.red, color: C.red, fontSize: 12 });
    slide.addText(t, { x: 7.68, y: 3.08 + i * 0.5, w: 4.25, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 13.2, color: C.ink, margin: 0 });
  });
  addTakeaway(slide, "Libertad para enseñar desde la experiencia; claridad para entregar continuidad.", { fill: C.navy });
  addNotesAndValidate(slide, "Este es el acuerdo más importante. La presentación o dinámica puede cambiar. Lo que no puede desaparecer es el producto que el siguiente equipo docente necesita recibir, junto con la organización y el protagonismo de los estudiantes.");
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
