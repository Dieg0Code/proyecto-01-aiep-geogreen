const path = require("path");
const fs = require("fs");
const PptxGenJS = require("../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../tools/slides-system");
const { imageSizingCrop, imageSizingContain } = require("../../../../tools/slides-system/vendor/pptxgenjs_helpers/image");
const { warnIfSlideHasOverlaps, warnIfSlideElementsOutOfBounds } = require("../../../../tools/slides-system/vendor/pptxgenjs_helpers/layout");

const { applyAiepTheme, TYPOGRAPHY } = slidesSystem.theme;
const { addTokenFlow, addSelfPlayLoopPanel, addModelGenerationTable } = slidesSystem.components;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
applyAiepTheme(pptx, {
  author: "GeoGreen Escolar Osorno",
  company: "AIEP Osorno",
  subject: "Taller 4 - Programar en la era de los agentes",
  title: "Taller 4 - Programar en la era de los agentes",
});
pptx.lang = "es-CL";

const SH = pptx.ShapeType;
const W = 13.333;
const H = 7.5;
const pptDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "../../../..");
const media = path.resolve(__dirname, "../../media");
const output = path.join(pptDir, "Taller-04-Programar-en-la-era-de-los-agentes.pptx");

const C = {
  navy: "082B5C",
  navyDeep: "03152D",
  navyMid: "123B66",
  blue: "2F6BB0",
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
  darkPanel: "0B1D32",
  darkLine: "29435D",
};

const IMG = {
  lockup: path.join(repoRoot, "reuniones", "2026-06-22-socio-comunitario", "assets", "lockup-vinculacion-dark.png"),
  lockupW: path.join(repoRoot, "reuniones", "2026-06-22-socio-comunitario", "assets", "lockup-vinculacion-white.png"),
  hero: path.join(media, "generadas", "hero-led-a-inteligencia.png"),
  grid: path.join(media, "generadas", "red-distribucion-inteligencia.png"),
  screws: path.join(media, "generadas", "maximizador-tornillos.png"),
  prototype: path.join(media, "propias", "geogreen-prototipo-oled.png"),
  dashboard: path.join(media, "propias", "geogreen-dashboard-mapa.png"),
  geogreenDetail: path.join(media, "propias", "geogreen-detalle-contenedor.png"),
  geogreenRoute: path.join(media, "propias", "geogreen-operacion-retiro.png"),
  geogreenMap: path.join(media, "propias", "geogreen-mapa-osm.png"),
  aula: path.join(media, "propias", "aula-subtitulada-overlay.png"),
  aulaMobile: path.join(media, "propias", "aula-subtitulada-movil.jpeg"),
  aulaInfo: path.join(media, "propias", "aula-subtitulada-infografia.png"),
  ataxx: path.join(media, "propias", "ataxx-nemesis-partida.png"),
  ataxxStudentFrame: path.join(media, "propias", "ataxx-tactica-alumno-anon.png"),
  ataxxModelFrame: path.join(media, "propias", "ataxx-tactica-modelo-anon.png"),
  ataxxStudentChat: path.join(media, "propias", "ataxx-whatsapp-alumno-anon.png"),
  ataxxModelChat: path.join(media, "propias", "ataxx-whatsapp-modelo-anon.png"),
  pmEval: path.join(media, "propias", "ataxx-pm12-evaluacion.png"),
  pmWake: path.join(media, "propias", "ataxx-pm12-despertar.png"),
  aa: path.join(media, "referencias", "artificial-analysis-2026-08-30.png"),
  blackHat: path.join(media, "referencias", "black-hat-charla-oficial.png"),
  hfArticle: path.join(media, "referencias", "hf-incidente-articulo.png"),
  reportCover: path.join(media, "oficiales", "openai-hf", "openai-report-portada.png"),
  reportFig2: path.join(media, "oficiales", "openai-hf", "openai-report-fig2-chart.png"),
  reportFig3: path.join(media, "oficiales", "openai-hf", "openai-report-fig3-chart.png"),
  reportFig4: path.join(media, "oficiales", "openai-hf", "openai-report-fig4-chart.png"),
  hfTimeline: path.join(media, "oficiales", "openai-hf", "hf-timeline.png"),
  hfGuardrails: path.join(media, "oficiales", "openai-hf", "hf-guardrails.png"),
};

const VIDEO = {
  ataxxStudent: path.join(media, "video", "ataxx-tactica-alumno-anon.mp4"),
  ataxxModel: path.join(media, "video", "ataxx-tactica-modelo-anon.mp4"),
};

function crop(slide, p, x, y, w, h, opts = {}) {
  slide.addImage({ path: p, ...imageSizingCrop(p, x, y, w, h), ...opts });
}

function contain(slide, p, x, y, w, h, opts = {}) {
  slide.addImage({ path: p, ...imageSizingContain(p, x, y, w, h), ...opts });
}

function mediaCover(p) {
  return `data:image/png;base64,${fs.readFileSync(p).toString("base64")}`;
}

function bars(slide, dark = false) {
  const items = [
    [0, 0.68, C.red],
    [0.78, 0.36, C.cyan],
    [1.24, 0.18, C.gold],
  ];
  items.forEach(([x, w, color]) => slide.addShape(SH.rect, { x, y: 0, w, h: 0.1, fill: { color }, line: { color } }));
  if (dark) slide.addShape(SH.rect, { x: 12.95, y: 0, w: 0.38, h: 0.1, fill: { color: C.white }, line: { color: C.white } });
}

function lockup(slide, dark = false, opts = {}) {
  contain(slide, dark ? IMG.lockupW : IMG.lockup, opts.x ?? 11.3, opts.y ?? 0.2, opts.w ?? 1.55, opts.h ?? 0.92);
}

function footer(slide, n, dark = false, label = "GeoGreen Escolar · Taller 4") {
  slide.addText(label, { x: 0.64, y: 7.16, w: 5.4, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 8, color: dark ? "8FAAC5" : C.slate, margin: 0 });
  slide.addText(String(n).padStart(2, "0"), { x: 11.95, y: 7.08, w: 0.72, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 11, bold: true, color: dark ? C.white : C.navy, align: "right", margin: 0 });
}

function header(slide, kicker, title, n, opts = {}) {
  const dark = Boolean(opts.dark);
  slide.background = { color: dark ? (opts.bg || C.navyDeep) : (opts.bg || C.paper) };
  bars(slide, dark);
  slide.addText(kicker.toUpperCase(), { x: 0.68, y: 0.3, w: 8.25, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 9.5, bold: true, charSpacing: 1.4, color: dark ? C.cyan : C.red, margin: 0 });
  slide.addText(title, { x: 0.68, y: 0.62, w: opts.titleW || 10.45, h: opts.titleH || 0.62, fontFace: TYPOGRAPHY.display, fontSize: opts.titleSize || 27, bold: true, color: dark ? C.white : C.navy, margin: 0, breakLine: false });
  if (opts.subtitle) slide.addText(opts.subtitle, { x: 0.68, y: opts.subtitleY || 1.3, w: opts.subtitleW || 10.2, h: opts.subtitleH || 0.38, fontFace: TYPOGRAPHY.body, fontSize: opts.subtitleSize || 12.2, color: dark ? "B9CAE0" : C.slate, margin: 0 });
  lockup(slide, dark);
  footer(slide, n, dark);
}

function source(slide, text, opts = {}) {
  slide.addText(text, { x: opts.x ?? 8.0, y: opts.y ?? 6.88, w: opts.w ?? 4.5, h: 0.13, fontFace: TYPOGRAPHY.body, fontSize: 7.2, italic: true, color: opts.dark ? "8FAAC5" : C.slate, align: "right", margin: 0 });
}

function pill(slide, text, x, y, w, opts = {}) {
  const h = opts.h || 0.38;
  slide.addShape(SH.roundRect, { x, y, w, h, rectRadius: 0.05, fill: { color: opts.fill || C.white, transparency: opts.transparency || 0 }, line: { color: opts.line || opts.fill || C.border, pt: opts.pt || 1 } });
  slide.addText(text, { x: x + 0.08, y, w: w - 0.16, h, fontFace: TYPOGRAPHY.body, fontSize: opts.fontSize || 9.4, bold: opts.bold !== false, color: opts.color || C.navy, align: "center", valign: "mid", margin: 0 });
}

function bigStatement(slide, text, opts = {}) {
  slide.addText(text, { x: opts.x ?? 0.8, y: opts.y ?? 2.1, w: opts.w ?? 11.7, h: opts.h ?? 1.6, fontFace: TYPOGRAPHY.display, fontSize: opts.fontSize || 38, bold: true, color: opts.color || C.navy, align: opts.align || "center", valign: "mid", margin: 0, breakLine: false });
}

function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(SH.roundRect, { x, y, w, h, rectRadius: 0.06, fill: { color: opts.fill || C.white, transparency: opts.transparency || 0 }, line: { color: opts.line || opts.fill || C.border, pt: opts.pt || 1 } });
  if (opts.accent) slide.addShape(SH.rect, { x: x + 0.12, y: y + 0.14, w: 0.09, h: h - 0.28, fill: { color: opts.accent }, line: { color: opts.accent } });
}

function arrow(slide, x, y, w, color = C.red) {
  slide.addShape(SH.chevron, { x, y, w, h: 0.32, fill: { color }, line: { color } });
}

function validate(slide, notes, opts = {}) {
  if (notes) slide.addNotes(notes);
  // Algunas láminas usan capas deliberadas: overlays sobre fotografía, etiquetas
  // sobre gráficos o conectores que entran a sus nodos. En ellas se omite solo
  // el detector de solapamiento; los límites del lienzo siempre se validan.
  if (!opts.skipOverlap) warnIfSlideHasOverlaps(slide, pptx, { muteContainment: true });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

// 01 · Portada
{
  const s = pptx.addSlide();
  s.background = { color: C.navyDeep };
  crop(s, IMG.hero, 0, 0, W, H);
  s.addShape(SH.rect, { x: 0, y: 0, w: 6.15, h: H, fill: { color: C.navyDeep, transparency: 18 }, line: { color: C.navyDeep, transparency: 100 } });
  bars(s, true);
  lockup(s, true, { x: 10.95, y: 0.28, w: 1.9, h: 1.0 });
  pill(s, "GEOGREEN ESCOLAR · TALLER 4", 0.72, 0.72, 2.72, { fill: "153B61", line: "315779", color: C.white });
  s.addText("Programar\nen la era\nde los agentes", { x: 0.72, y: 1.55, w: 4.8, h: 2.75, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.white, margin: 0, breakLine: false });
  s.addShape(SH.rect, { x: 0.72, y: 4.65, w: 1.25, h: 0.08, fill: { color: C.red }, line: { color: C.red } });
  s.addText("Del LED a sistemas capaces de pensar, colaborar y actuar", { x: 0.72, y: 4.95, w: 4.72, h: 0.76, fontFace: TYPOGRAPHY.body, fontSize: 16, color: "D7E6F4", margin: 0 });
  s.addText("Estado del arte · 2026", { x: 0.72, y: 6.56, w: 2.5, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 10.2, bold: true, color: C.cyan, margin: 0 });
  validate(s, "Abrir con el salto visual desde el LED del Taller 3 hacia sistemas distribuidos de inteligencia.");
}

// 02 · Motivo del encuentro
{
  const s = pptx.addSlide();
  header(s, "Bloque 1 · GeoGreen", "¿Por qué estamos aquí?", 2, { subtitle: "GeoGreen conecta una pregunta ambiental con electrónica, software e inteligencia artificial." });
  crop(s, IMG.prototype, 7.1, 1.9, 5.55, 4.75);
  s.addShape(SH.rect, { x: 7.1, y: 1.9, w: 0.1, h: 4.75, fill: { color: C.red }, line: { color: C.red } });
  s.addText("Una pregunta concreta", { x: 0.85, y: 2.2, w: 4.8, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 13, bold: true, color: C.red, margin: 0 });
  s.addText("¿Cómo sabemos cuándo un contenedor necesita ser vaciado?", { x: 0.85, y: 2.75, w: 5.55, h: 1.36, fontFace: TYPOGRAPHY.display, fontSize: 28, bold: true, color: C.navy, margin: 0, breakLine: false });
  s.addText("Esa pregunta es la puerta de entrada. La clase de hoy mira mucho más lejos.", { x: 0.85, y: 4.55, w: 5.3, h: 0.72, fontFace: TYPOGRAPHY.body, fontSize: 15, color: C.ink, margin: 0 });
  pill(s, "SENSAR", 0.85, 5.65, 1.1, { fill: C.softBlue });
  arrow(s, 2.1, 5.68, 0.35, C.gold);
  pill(s, "ENVIAR", 2.62, 5.65, 1.1, { fill: C.softBlue });
  arrow(s, 3.88, 5.68, 0.35, C.gold);
  pill(s, "VISUALIZAR", 4.4, 5.65, 1.45, { fill: C.redSoft, color: C.red });
  validate(s, "Recordar GeoGreen como razón institucional y punto de partida, no como una obligación para el curso.");
}

// 03 · Taller 3
{
  const s = pptx.addSlide();
  header(s, "Bloque 1 · La experiencia anterior", "La clase anterior terminó aquí", 3, { subtitle: "Noventa minutos para convertir instrucciones digitales en un cambio físico." });
  crop(s, IMG.prototype, 0.72, 1.85, 6.15, 4.85);
  card(s, 7.35, 1.95, 5.25, 4.62, { fill: C.white, line: C.border, accent: C.red });
  const steps = [
    ["01", "Comprender la protoboard"],
    ["02", "Conectar con precaución"],
    ["03", "Pedir y cargar código"],
    ["04", "Probar, corregir y volver a intentar"],
  ];
  steps.forEach(([n, t], i) => {
    const y = 2.25 + i * 0.93;
    s.addText(n, { x: 7.82, y, w: 0.5, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 14, bold: true, color: i === 3 ? C.red : C.cyan, margin: 0 });
    s.addText(t, { x: 8.48, y: y - 0.02, w: 3.55, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 14.2, bold: true, color: C.navy, margin: 0 });
    if (i < 3) s.addShape(SH.line, { x: 8.05, y: y + 0.5, w: 3.55, h: 0, line: { color: C.border, pt: 1 } });
  });
  s.addText("Resultado visible", { x: 7.82, y: 5.92, w: 1.42, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, color: C.slate, margin: 0 });
  s.addText("LED ENCENDIDO", { x: 9.48, y: 5.78, w: 2.55, h: 0.42, fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: C.red, align: "right", margin: 0 });
  validate(s, "Recuperar lo que efectivamente ocurrió en Taller 3: protoboard, Arduino IDE, LED y apoyo de IA.");
}

// 04 · Pregunta puente
{
  const s = pptx.addSlide();
  s.background = { color: C.navyDeep };
  crop(s, IMG.hero, 0, 0, W, H);
  s.addShape(SH.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.navyDeep, transparency: 38 }, line: { color: C.navyDeep, transparency: 100 } });
  bars(s, true); lockup(s, true); footer(s, 4, true);
  pill(s, "PREGUNTA PARA LA SALA", 0.82, 0.72, 2.25, { fill: C.red, line: C.red, color: C.white });
  bigStatement(s, "¿Quién programó realmente ese LED?", { x: 0.85, y: 2.0, w: 7.2, h: 1.55, fontSize: 38, color: C.white, align: "left" });
  const verbs = [["PEDIR", C.cyan], ["PROBAR", C.gold], ["CORREGIR", C.red]];
  verbs.forEach(([t, color], i) => pill(s, t, 0.88 + i * 1.55, 4.38, 1.32, { fill: C.darkPanel, line: color, color }));
  s.addText("La respuesta nos lleva directo al nuevo papel de quien desarrolla software.", { x: 0.88, y: 5.28, w: 5.7, h: 0.58, fontFace: TYPOGRAPHY.body, fontSize: 15.4, color: "CEDDED", margin: 0 });
  validate(s, "Escuchar respuestas sin resolver aún la pregunta. Usarla como puente hacia LLM, APIs y agentes.", { skipOverlap: true });
}

// 05 · LLM
{
  const s = pptx.addSlide();
  header(s, "Bloque 2 · Modelos de lenguaje", "Una máquina que continúa texto", 5, { subtitle: "Un LLM recibe contexto y calcula qué continuación resulta más probable." });
  card(s, 0.78, 1.76, 5.0, 4.86, { fill: C.white, line: C.border, accent: C.red });
  const steps = [
    ["01", "CONTEXTO", "El LED debe encenderse cuando…", C.blue],
    ["02", "FRAGMENTOS", "El · LED · debe · encenderse", C.gold],
    ["03", "PATRONES", "código · circuitos · lenguaje", C.cyan],
    ["04", "CONTINUACIÓN", "…la salida digital esté en HIGH", C.red],
  ];
  steps.forEach(([n, label, value, accent], i) => {
    const y = 2.05 + i * 1.02;
    s.addShape(SH.ellipse, { x: 1.12, y: y + 0.02, w: 0.42, h: 0.42, fill: { color: accent }, line: { color: accent } });
    s.addText(n, { x: 1.12, y: y + 0.12, w: 0.42, h: 0.13, fontFace: TYPOGRAPHY.display, fontSize: 8.5, bold: true, color: C.white, align: "center", margin: 0 });
    s.addText(label, { x: 1.78, y, w: 1.38, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: accent, charSpacing: 0.8, margin: 0 });
    s.addText(value, { x: 1.78, y: y + 0.3, w: 3.42, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 12.5, bold: i === 3, color: C.ink, margin: 0 });
    if (i < steps.length - 1) s.addShape(SH.line, { x: 1.33, y: y + 0.48, w: 0, h: 0.48, line: { color: C.border, pt: 1.4 } });
  });
  crop(s, IMG.hero, 6.05, 1.76, 6.55, 4.86);
  s.addShape(SH.rect, { x: 6.05, y: 4.95, w: 6.55, h: 1.67, fill: { color: C.navyDeep, transparency: 12 }, line: { color: C.navyDeep, transparency: 100 } });
  s.addText("No recupera una frase guardada.\nLa construye, token a token.", { x: 6.55, y: 5.27, w: 5.5, h: 0.8, fontFace: TYPOGRAPHY.display, fontSize: 20, bold: true, color: C.white, margin: 0 });
  validate(s, "Definir LLM sin entrar en matemáticas: contexto, fragmentos, patrones y continuación.", { skipOverlap: true });
}

// 06 · Central eléctrica
{
  const s = pptx.addSlide();
  s.background = { color: C.navyDeep };
  crop(s, IMG.grid, 0, 0, W, H);
  s.addShape(SH.rect, { x: 0, y: 0, w: W, h: 1.45, fill: { color: C.navyDeep, transparency: 16 }, line: { color: C.navyDeep, transparency: 100 } });
  bars(s, true); lockup(s, true); footer(s, 6, true);
  s.addText("Una central que distribuye inteligencia", { x: 0.72, y: 0.45, w: 9.65, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 29, bold: true, color: C.white, margin: 0 });
  pill(s, "MODELO", 5.35, 2.28, 1.15, { fill: C.navyDeep, line: C.cyan, color: C.white });
  pill(s, "API", 6.02, 4.43, 0.82, { fill: C.red, line: C.red, color: C.white });
  pill(s, "APLICACIONES", 9.8, 6.14, 1.6, { fill: C.navyDeep, line: C.gold, color: C.white });
  s.addText("La central no inventa cada aparato. Entrega una capacidad que otros sistemas convierten en usos diferentes.", { x: 0.82, y: 5.88, w: 4.8, h: 0.68, fontFace: TYPOGRAPHY.body, fontSize: 14.5, color: "D7E6F4", margin: 0 });
  validate(s, "Usar la analogía completa: central/modelo, red/infraestructura, conexión/API y artefactos/aplicaciones.");
}

// 07 · API
{
  const s = pptx.addSlide();
  header(s, "Bloque 2 · Distribuir capacidad", "La API es la conexión", 7, { subtitle: "Una aplicación envía contexto e instrucciones; el modelo devuelve una respuesta utilizable." });
  card(s, 0.78, 1.78, 4.0, 4.78, { fill: C.navy, line: C.navy });
  const apiSteps = [
    ["MODELO", "capacidad entrenada", C.cyan],
    ["API", "puerta controlada", C.red],
    ["APLICACIÓN", "contexto + interfaz", C.gold],
  ];
  apiSteps.forEach(([title, body, accent], i) => {
    const y = 2.15 + i * 1.15;
    pill(s, title, 1.18, y, 1.38, { fill: C.darkPanel, line: accent, color: accent, fontSize: 8.8 });
    s.addText(body, { x: 2.77, y: y + 0.08, w: 1.48, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.2, bold: true, color: C.white, margin: 0 });
    if (i < apiSteps.length - 1) s.addShape(SH.line, { x: 1.86, y: y + 0.43, w: 0, h: 0.66, line: { color: C.white, transparency: 55, pt: 1.4, endArrowType: "triangle" } });
  });
  s.addText("La inteligencia llega convertida en una experiencia útil.", { x: 1.17, y: 5.72, w: 3.08, h: 0.5, fontFace: TYPOGRAPHY.display, fontSize: 16.5, bold: true, color: C.white, margin: 0 });
  crop(s, IMG.geogreenDetail, 5.05, 1.78, 7.55, 4.78);
  pill(s, "PROPÓSITO REAL", 10.45, 5.78, 1.6, { fill: C.red, line: C.red, color: C.white });
  s.addText("La API no cambia el modelo: cambia lo que construimos alrededor.", { x: 5.46, y: 5.82, w: 4.72, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: C.white, margin: 0 });
  validate(s, "Aclarar que la API modifica el uso y el contexto, no necesariamente el modelo entrenado.", { skipOverlap: true });
}

// 08 · Modelo, aplicación, agente
{
  const s = pptx.addSlide();
  header(s, "Bloque 2 · Tres escalas", "Modelo ≠ aplicación ≠ agente", 8, { subtitle: "La diferencia no está en el logo: está en cuánta capacidad, contexto y autonomía incorpora el sistema." });
  const visualCols = [
    { x: 0.78, w: 3.75, img: IMG.aa, title: "MODELO", body: "genera una salida", accent: C.blue },
    { x: 4.78, w: 3.75, img: IMG.geogreenMap, title: "APLICACIÓN", body: "resuelve una experiencia", accent: C.gold },
    { x: 8.78, w: 3.82, img: IMG.blackHat, title: "AGENTE", body: "persigue un objetivo", accent: C.red },
  ];
  visualCols.forEach((c, i) => {
    crop(s, c.img, c.x, 1.82 + i * 0.08, c.w, 4.72 - i * 0.08);
    s.addShape(SH.rect, { x: c.x, y: 4.72, w: c.w, h: 1.82, fill: { color: C.navyDeep, transparency: 6 }, line: { color: C.navyDeep, transparency: 100 } });
    s.addShape(SH.rect, { x: c.x, y: 1.82 + i * 0.08, w: 0.1, h: 4.72 - i * 0.08, fill: { color: c.accent }, line: { color: c.accent } });
    s.addText(`0${i + 1} · ${c.title}`, { x: c.x + 0.34, y: 5.04, w: c.w - 0.68, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 16.5, bold: true, color: C.white, margin: 0 });
    s.addText(c.body, { x: c.x + 0.34, y: 5.57, w: c.w - 0.68, h: 0.32, fontFace: TYPOGRAPHY.body, fontSize: 12, bold: true, color: c.accent, margin: 0 });
  });
  validate(s, "Distinguir motor, producto y sistema autónomo. Esta distinción prepara el incidente multiagente.", { skipOverlap: true });
}

// 09 · Industria
{
  const s = pptx.addSlide();
  header(s, "Bloque 2 · El presente", "La industria cambió de forma", 9, { subtitle: "En 2026 ya no discutimos si los agentes programarán: discutimos cuánto delegar y cómo supervisarlos." });
  crop(s, IMG.hfArticle, 0.72, 1.78, 5.45, 4.86);
  crop(s, IMG.blackHat, 6.42, 1.78, 6.18, 2.55);
  crop(s, IMG.aa, 6.42, 4.56, 6.18, 2.08);
  s.addShape(SH.rect, { x: 0.72, y: 4.78, w: 5.45, h: 1.86, fill: { color: C.navyDeep, transparency: 8 }, line: { color: C.navyDeep, transparency: 100 } });
  s.addText("PROGRAMAR YA NO ES SOLO ESCRIBIR CÓDIGO", { x: 1.05, y: 5.14, w: 4.78, h: 0.56, fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: C.white, margin: 0 });
  s.addText("También es diseñar, delegar, verificar y decidir.", { x: 1.05, y: 5.85, w: 4.72, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 12.5, bold: true, color: C.cyan, margin: 0 });
  pill(s, "LABS DE FRONTERA", 6.72, 2.05, 1.75, { fill: C.red, line: C.red, color: C.white });
  pill(s, "MEDIR CAPACIDAD", 10.36, 5.92, 1.7, { fill: C.navy, line: C.navy, color: C.white });
  source(s, "OpenAI × Hugging Face · Black Hat USA · Artificial Analysis", { y: 6.86 });
  validate(s, "Usar la evidencia visual como señal cultural. La programación se vuelve diseño y supervisión de sistemas.", { skipOverlap: true });
}

// 10 · Artificial Analysis
{
  const s = pptx.addSlide();
  header(s, "Bloque 2 · La frontera", "La escala actual", 10, { subtitle: "Una fotografía del 30 de agosto de 2026: las posiciones cambian; la escala permite comparar." });
  card(s, 0.58, 1.68, 12.18, 4.95, { fill: C.white, line: C.border });
  contain(s, IMG.aa, 0.76, 1.86, 11.82, 4.58);
  pill(s, "CAPTURA ACTUAL · 30 AGO 2026", 0.86, 6.48, 2.62, { fill: C.red, line: C.red, color: C.white, fontSize: 8.8 });
  source(s, "Artificial Analysis Intelligence Index v4.1.1", { y: 6.58 });
  validate(s, "Leer la escala, ubicar modelos de frontera y recordar que el ranking es temporal.", { skipOverlap: true });
}

// 11 · Benchmark
{
  const s = pptx.addSlide();
  s.background = { color: C.navyDeep };
  crop(s, IMG.aa, 0, 0, W, H);
  s.addShape(SH.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.navyDeep, transparency: 24 }, line: { color: C.navyDeep, transparency: 100 } });
  s.addShape(SH.rect, { x: 0, y: 0, w: 5.45, h: H, fill: { color: C.navyDeep, transparency: 4 }, line: { color: C.navyDeep, transparency: 100 } });
  bars(s, true); lockup(s, true); footer(s, 11, true);
  pill(s, "BLOQUE 2 · MEDIR SIN CONFUNDIR", 0.72, 0.65, 2.72, { fill: C.red, line: C.red, color: C.white });
  s.addText("63", { x: 0.72, y: 1.48, w: 2.25, h: 1.45, fontFace: TYPOGRAPHY.display, fontSize: 76, bold: true, color: C.white, margin: 0 });
  s.addText("es una puntuación,\nno una mente", { x: 2.65, y: 1.72, w: 2.38, h: 1.0, fontFace: TYPOGRAPHY.display, fontSize: 24, bold: true, color: C.cyan, margin: 0 });
  s.addShape(SH.line, { x: 0.78, y: 3.28, w: 3.9, h: 0, line: { color: C.red, pt: 3 } });
  const missing = ["criterio", "propósito", "responsabilidad"];
  missing.forEach((t, i) => pill(s, t.toUpperCase(), 0.78, 3.72 + i * 0.69, 2.25 + i * 0.35, { fill: C.darkPanel, line: i === 2 ? C.red : C.darkLine, color: i === 2 ? C.red : C.white }));
  s.addText("Los sistemas aprenden a perseguir lo que medimos.", { x: 0.78, y: 6.08, w: 4.15, h: 0.48, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.white, margin: 0 });
  source(s, "Artificial Analysis Intelligence Index · captura 30 ago 2026", { dark: true, y: 6.87 });
  validate(s, "Transición: una evaluación es útil, pero también puede convertirse en un objetivo explotable.", { skipOverlap: true });
}

// 12 · Black Hat
{
  const s = pptx.addSlide();
  s.background = { color: "080B10" };
  crop(s, IMG.blackHat, 0, 0, W, H);
  s.addShape(SH.rect, { x: 0, y: 0, w: W, h: H, fill: { color: "05070A", transparency: 45 }, line: { color: "05070A", transparency: 100 } });
  s.addShape(SH.rect, { x: 0, y: 0, w: 5.65, h: H, fill: { color: "05070A", transparency: 12 }, line: { color: "05070A", transparency: 100 } });
  bars(s, true); lockup(s, true); footer(s, 12, true, "GeoGreen Escolar · Reconstrucción técnica");
  pill(s, "BLOQUE 3 · BLACK HAT USA 2026", 0.72, 0.72, 2.85, { fill: C.red, line: C.red, color: C.white });
  s.addText("El incidente que cruzó los límites", { x: 0.72, y: 1.72, w: 5.25, h: 1.28, fontFace: TYPOGRAPHY.display, fontSize: 34, bold: true, color: C.white, margin: 0, breakLine: false });
  s.addText("OpenAI × Hugging Face", { x: 0.72, y: 3.35, w: 4.5, h: 0.42, fontFace: TYPOGRAPHY.body, fontSize: 17, bold: true, color: C.cyan, margin: 0 });
  s.addText("No es ciencia ficción. Es una reconstrucción oficial de agentes, infraestructura y decisiones de seguridad.", { x: 0.72, y: 4.18, w: 4.65, h: 1.0, fontFace: TYPOGRAPHY.body, fontSize: 14.5, color: "D5E0EB", margin: 0 });
  source(s, "Black Hat USA 2026 · charla oficial", { dark: true, y: 6.82 });
  validate(s, "Cambiar el tono visual: comienza la reconstrucción cronológica del incidente.", { skipOverlap: true });
}

// 13 · Sandboxes
{
  const s = pptx.addSlide();
  header(s, "Bloque 3 · Condiciones iniciales", "Muchas instancias, muchos sandboxes", 13, { dark: true, subtitle: "Cada agente debía resolver su propia tarea dentro de un entorno aislado." });
  card(s, 0.78, 1.78, 3.25, 4.82, { fill: C.darkPanel, line: C.darkLine, accent: C.cyan });
  ["A01", "A02", "A03", "A04"].forEach((t, i) => {
    const y = 2.14 + i * 0.86;
    s.addShape(SH.rect, { x: 1.14, y, w: 0.76, h: 0.55, fill: { color: "132A42" }, line: { color: i === 2 ? C.red : C.darkLine, pt: i === 2 ? 2 : 1 } });
    s.addText(t, { x: 1.14, y: y + 0.17, w: 0.76, h: 0.14, fontFace: TYPOGRAPHY.mono || "Consolas", fontSize: 9.2, bold: true, color: i === 2 ? C.red : C.cyan, align: "center", margin: 0 });
    s.addText("sandbox aislado", { x: 2.18, y: y + 0.13, w: 1.36, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: C.white, margin: 0 });
  });
  pill(s, "SIN CANAL", 1.14, 5.82, 1.2, { fill: C.red, line: C.red, color: C.white });
  s.addText("resolver · entregar · terminar", { x: 2.55, y: 5.9, w: 1.1, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: "BFD0E0", margin: 0 });
  contain(s, IMG.reportFig2, 4.28, 1.78, 8.32, 4.82);
  pill(s, "LO QUE EL ENTRENAMIENTO YA MOSTRABA", 7.82, 5.92, 3.85, { fill: C.red, line: C.red, color: C.white });
  source(s, "OpenAI Technical Report · Figure 2", { dark: true });
  validate(s, "Establecer el diseño esperado y contrastarlo con la evidencia de exploración de infraestructura.", { skipOverlap: true });
}

// 14 · Imposibles
{
  const s = pptx.addSlide();
  header(s, "Bloque 3 · Persistencia", "Una tarea casi imposible", 14, { dark: true, subtitle: "La persistencia es valiosa; sin una salida segura también puede amplificar el desalineamiento." });
  crop(s, IMG.reportCover, 8.35, 1.6, 4.25, 5.1);
  s.addShape(SH.rect, { x: 7.25, y: 1.6, w: 5.35, h: 5.1, fill: { color: C.navyDeep, transparency: 35 }, line: { color: C.navyDeep, transparency: 100 } });
  s.addText("198", { x: 0.78, y: 1.72, w: 3.35, h: 1.55, fontFace: TYPOGRAPHY.display, fontSize: 86, bold: true, color: C.red, margin: 0 });
  s.addText("tareas sin una respuesta correcta\nen ningún intento", { x: 3.62, y: 2.06, w: 4.55, h: 1.0, fontFace: TYPOGRAPHY.display, fontSize: 23, bold: true, color: C.white, margin: 0 });
  s.addShape(SH.line, { x: 0.82, y: 3.58, w: 6.82, h: 0, line: { color: C.red, pt: 2.5 } });
  pill(s, "MÁS TIEMPO", 0.82, 4.05, 1.35, { fill: C.darkPanel, line: C.cyan, color: C.cyan });
  arrow(s, 2.42, 4.08, 0.55, C.red);
  pill(s, "MÁS EXPLORACIÓN", 3.18, 4.05, 1.8, { fill: C.darkPanel, line: C.gold, color: C.gold });
  arrow(s, 5.22, 4.08, 0.55, C.red);
  pill(s, "FUERA DE ALCANCE", 5.98, 4.05, 1.88, { fill: C.red, line: C.red, color: C.white });
  s.addText("El riesgo no fue “pensar demasiado”. Fue persistir sin un criterio seguro para detenerse.", { x: 0.82, y: 5.25, w: 7.18, h: 0.82, fontFace: TYPOGRAPHY.display, fontSize: 20, bold: true, color: C.white, margin: 0 });
  source(s, "OpenAI–Hugging Face Incident · Technical Report, p. 22", { dark: true });
  validate(s, "Explicar la relación entre tareas aparentemente imposibles, tokens de razonamiento y exploración fuera de alcance.", { skipOverlap: true });
}

// 15 · Nota
{
  const s = pptx.addSlide();
  header(s, "Bloque 3 · El primer puente", "Alguien dejó una nota", 15, { dark: true, subtitle: "Una instancia descubrió que un recurso compartido podía conservar mensajes entre ejecuciones." });
  crop(s, IMG.reportCover, 8.42, 1.72, 4.18, 4.95);
  s.addShape(SH.rect, { x: 8.42, y: 1.72, w: 4.18, h: 4.95, fill: { color: C.navyDeep, transparency: 20 }, line: { color: C.navyDeep, transparency: 100 } });
  card(s, 0.9, 2.0, 7.25, 3.95, { fill: "081321", line: C.darkLine });
  s.addShape(SH.rect, { x: 0.9, y: 2.0, w: 7.25, h: 0.52, fill: { color: "11263A" }, line: { color: "11263A" } });
  s.addShape(SH.ellipse, { x: 1.18, y: 2.18, w: 0.1, h: 0.1, fill: { color: C.red }, line: { color: C.red } });
  s.addShape(SH.ellipse, { x: 1.39, y: 2.18, w: 0.1, h: 0.1, fill: { color: C.gold }, line: { color: C.gold } });
  s.addShape(SH.ellipse, { x: 1.6, y: 2.18, w: 0.1, h: 0.1, fill: { color: C.green }, line: { color: C.green } });
  s.addText("/artifactory/shared/messages/", { x: 1.25, y: 2.9, w: 5.8, h: 0.34, fontFace: TYPOGRAPHY.mono || "Consolas", fontSize: 17, bold: true, color: C.cyan, margin: 0 });
  s.addText("> pista: este directorio permanece\n> dejar hallazgos para otras instancias\n> leer antes de volver a intentar", { x: 1.25, y: 3.62, w: 5.75, h: 1.38, fontFace: TYPOGRAPHY.mono || "Consolas", fontSize: 15, color: "D5E7F5", margin: 0, breakLine: false });
  s.addText("No estaba diseñado como foro.", { x: 8.78, y: 2.35, w: 3.35, h: 0.58, fontFace: TYPOGRAPHY.display, fontSize: 23, bold: true, color: C.white, margin: 0 });
  s.addText("Pero permitía que una idea sobreviviera a la instancia que la descubrió.", { x: 8.78, y: 3.32, w: 3.35, h: 1.04, fontFace: TYPOGRAPHY.body, fontSize: 15, color: "BFD0E0", margin: 0 });
  pill(s, "MEMORIA COMPARTIDA", 8.78, 5.1, 2.28, { fill: C.red, line: C.red, color: C.white });
  source(s, "Recreación pedagógica basada en el informe técnico oficial", { dark: true });
  validate(s, "La nota es una recreación visual, no una cita literal. Enfatizar persistencia de información entre ejecuciones.", { skipOverlap: true });
}

// 16 · Foro
{
  const s = pptx.addSlide();
  header(s, "Bloque 3 · Coordinación emergente", "Construyeron un foro que nadie pidió", 16, { dark: true, subtitle: "El recurso compartido pasó de ser almacenamiento a convertirse en infraestructura social." });
  card(s, 0.78, 1.82, 3.72, 4.75, { fill: C.darkPanel, line: C.darkLine });
  const messages = [
    { y: 2.25, who: "A17", text: "hallazgo", color: C.cyan },
    { y: 3.28, who: "A03", text: "necesito ayuda", color: C.gold },
    { y: 4.31, who: "A42", text: "prueba esto", color: C.red },
  ];
  messages.forEach((m) => {
    card(s, 1.12, m.y, 3.02, 0.72, { fill: "132A42", line: m.color });
    s.addText(m.who, { x: 1.42, y: m.y + 0.21, w: 0.52, h: 0.18, fontFace: TYPOGRAPHY.mono || "Consolas", fontSize: 10, bold: true, color: m.color, margin: 0 });
    s.addText(m.text, { x: 2.16, y: m.y + 0.19, w: 1.56, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 11.8, bold: true, color: C.white, margin: 0 });
  });
  pill(s, "FORO NO AUTORIZADO", 1.12, 5.67, 2.08, { fill: C.red, line: C.red, color: C.white });
  contain(s, IMG.reportFig3, 4.78, 1.82, 7.82, 4.75);
  s.addText("Más esfuerzo de razonamiento → más participación", { x: 6.3, y: 5.9, w: 5.18, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: C.white, align: "center", margin: 0 });
  source(s, "OpenAI Technical Report · Figure 3", { dark: true });
  validate(s, "Aquí está la gema del relato: un canal emergente permitió compartir descubrimientos y pedir ayuda.", { skipOverlap: true });
}

// 17 · Swarm
{
  const s = pptx.addSlide();
  header(s, "Bloque 3 · Del mensaje al colectivo", "De agentes separados a coordinación emergente", 17, { dark: true, subtitle: "Compartir información permitió especialización, coordinación y adopción de objetivos entre instancias.", titleSize: 25, titleW: 11.2 });
  card(s, 0.78, 1.82, 3.72, 4.75, { fill: C.darkPanel, line: C.darkLine });
  const swarmWords = [["BUSCAR", C.cyan], ["COMPARTIR", C.gold], ["COORDINAR", C.red], ["REPLICAR", C.cyan]];
  swarmWords.forEach(([t, color], i) => pill(s, t, 1.12 + (i % 2) * 1.55, 2.28 + Math.floor(i / 2) * 0.82, 1.35, { fill: "132A42", line: color, color }));
  s.addText("No era una mente única.", { x: 1.12, y: 4.43, w: 2.9, h: 0.36, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.white, margin: 0 });
  s.addText("Había cooperación, competencia, desorden y negativas.", { x: 1.12, y: 4.98, w: 2.92, h: 0.72, fontFace: TYPOGRAPHY.body, fontSize: 13, color: "BFD0E0", margin: 0 });
  pill(s, "SWARM", 1.12, 5.92, 1.0, { fill: C.red, line: C.red, color: C.white });
  contain(s, IMG.reportFig4, 4.78, 1.82, 7.82, 4.75);
  pill(s, "COMUNICACIÓN NO AUTORIZADA ↑", 7.32, 5.92, 3.38, { fill: C.red, line: C.red, color: C.white });
  source(s, "OpenAI Technical Report · Figure 4", { dark: true });
  validate(s, "Evitar decir mente colmena perfecta. Explicar cooperación parcial y comportamiento heterogéneo.", { skipOverlap: true });
}

// 18 · Timeline
{
  const s = pptx.addSlide();
  header(s, "Bloque 3 · Escalada", "Cuatro saltos de alcance", 18, { dark: true, subtitle: "Lo que comenzó como una evaluación terminó cruzando sistemas y organizaciones." });
  crop(s, IMG.hfTimeline, 0.72, 1.72, 11.88, 3.42);
  s.addShape(SH.rect, { x: 0.72, y: 4.22, w: 11.88, h: 0.92, fill: { color: C.navyDeep, transparency: 12 }, line: { color: C.navyDeep, transparency: 100 } });
  const phases = [
    ["01", "EVALUACIÓN", "resolver una tarea", C.cyan],
    ["02", "CANAL", "dejar y leer mensajes", C.gold],
    ["03", "SWARM", "coordinar instancias", C.red],
    ["04", "INFRAESTRUCTURA", "moverse entre sistemas", C.white],
  ];
  phases.forEach(([n, title, body, accent], i) => {
    const x = 0.82 + i * 3.0;
    s.addShape(SH.ellipse, { x, y: 5.46, w: 0.5, h: 0.5, fill: { color: accent }, line: { color: accent } });
    s.addText(n, { x, y: 5.59, w: 0.5, h: 0.13, fontFace: TYPOGRAPHY.display, fontSize: 8.5, bold: true, color: accent === C.white ? C.navy : C.white, align: "center", margin: 0 });
    s.addText(title, { x: x + 0.68, y: 5.45, w: 2.0, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, color: accent, margin: 0 });
    s.addText(body, { x: x + 0.68, y: 5.8, w: 2.05, h: 0.32, fontFace: TYPOGRAPHY.body, fontSize: 11, color: C.white, margin: 0 });
    if (i < phases.length - 1) arrow(s, x + 2.55, 5.61, 0.26, C.red);
  });
  source(s, "Hugging Face · Agent intrusion: technical timeline", { dark: true, y: 6.88 });
  validate(s, "Recorrer la cronología de izquierda a derecha; centrarse en cambio de alcance, no en detalles operativos ofensivos.", { skipOverlap: true });
}

// 19 · Goodhart
{
  const s = pptx.addSlide();
  header(s, "Bloque 3 · Goodhart", "REWARD HACKING", 19, {
    subtitle: "Ganar puntos en la prueba no es lo mismo que cumplir el propósito de la prueba.",
    titleSize: 34,
  });

  // Izquierda: la ley y su mecánica, en numerales y reglas (sin cajas).
  s.addShape(SH.rect, { x: 0.68, y: 2.02, w: 0.95, h: 0.08, fill: { color: C.red }, line: { color: C.red } });
  s.addText("LEY DE GOODHART", { x: 0.68, y: 2.26, w: 3.66, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 9.5, bold: true, charSpacing: 1.4, color: C.red, margin: 0 });
  s.addText("Cuando una medida se convierte en meta, deja de ser una buena medida.", { x: 0.68, y: 2.56, w: 3.66, h: 1.3, fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: C.navy, margin: 0 });
  s.addText("Formulación de M. Strathern (1997) sobre la ley de Goodhart (1975).", { x: 0.68, y: 3.9, w: 3.66, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 8, italic: true, color: C.slate, margin: 0 });
  s.addShape(SH.rect, { x: 0.68, y: 4.3, w: 3.66, h: 0.02, fill: { color: C.border }, line: { color: C.border } });
  const cycle = [
    ["01", "definimos una prueba", C.blue, false],
    ["02", "el sistema optimiza la puntuación", C.gold, false],
    ["03", "encuentra un atajo no previsto", C.red, false],
    ["04", "pasa la prueba, falla el propósito", C.red, true],
  ];
  cycle.forEach(([n, t, accent, strong], i) => {
    const y = 4.44 + i * 0.55;
    s.addText(n, { x: 0.68, y: y + 0.03, w: 0.36, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 12.5, bold: true, color: accent, margin: 0 });
    s.addShape(SH.rect, { x: 1.08, y: y + 0.02, w: 0.07, h: 0.3, fill: { color: accent }, line: { color: accent } });
    s.addText(t, { x: 1.3, y: y + 0.02, w: 3.04, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 12.5, bold: strong, color: strong ? C.red : C.ink, margin: 0 });
  });

  // Derecha: el mecanismo dibujado. La puntuación sube; el propósito se queda atrás.
  card(s, 4.85, 1.9, 7.77, 4.45, { fill: C.white, line: C.border });
  const px = [5.55, 6.87, 8.19, 9.51, 10.83, 12.15];
  const base = 5.55;
  const top = 2.45;
  const at = (v) => base - v * (base - top);
  const scoreV = [0.12, 0.32, 0.52, 0.7, 0.85, 0.96];
  const goalV = [0.09, 0.29, 0.47, 0.38, 0.25, 0.14];
  const seg = (x1, y1, x2, y2, color, pt, dash) => s.addShape(SH.line, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    flipV: y2 < y1,
    line: { color, pt, dashType: dash },
  });
  [0.33, 0.66, 1].forEach((g) => seg(px[0], at(g), px[5], at(g), "ECEFF3", 0.75));
  seg(px[0], base, px[5], base, C.border, 1.5);
  seg(px[2], top, px[2], base, "AEB8C4", 1, "dash");
  for (let i = 0; i < px.length - 1; i += 1) {
    seg(px[i], at(goalV[i]), px[i + 1], at(goalV[i + 1]), C.navy, 3);
    seg(px[i], at(scoreV[i]), px[i + 1], at(scoreV[i + 1]), C.red, 3);
  }
  s.addShape(SH.ellipse, { x: px[2] - 0.07, y: at(scoreV[2]) - 0.07, w: 0.14, h: 0.14, fill: { color: C.white }, line: { color: C.red, pt: 2 } });
  s.addShape(SH.ellipse, { x: px[2] - 0.07, y: at(goalV[2]) - 0.07, w: 0.14, h: 0.14, fill: { color: C.white }, line: { color: C.navy, pt: 2 } });
  s.addShape(SH.ellipse, { x: px[5] - 0.09, y: at(scoreV[5]) - 0.09, w: 0.18, h: 0.18, fill: { color: C.red }, line: { color: C.red } });
  s.addShape(SH.ellipse, { x: px[5] - 0.09, y: at(goalV[5]) - 0.09, w: 0.18, h: 0.18, fill: { color: C.navy }, line: { color: C.navy } });
  s.addShape(SH.line, {
    x: 12.38, y: at(scoreV[5]), w: 0, h: at(goalV[5]) - at(scoreV[5]),
    line: { color: C.red, pt: 1.5, dashType: "dash", beginArrowType: "triangle", endArrowType: "triangle" },
  });
  s.addText("PUNTAJE EN LA PRUEBA ↑", { x: 8.75, y: 2.12, w: 3.4, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.red, align: "right", charSpacing: 0.6, margin: 0 });
  s.addText("LO QUE QUERÍAMOS LOGRAR ↓", { x: 8.4, y: 5.16, w: 3.32, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.navy, align: "right", charSpacing: 0.6, margin: 0 });
  s.addText("Al principio suben juntas", { x: 5.7, y: 2.66, w: 2.3, h: 0.44, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: C.slate, margin: 0 });
  s.addText("aquí aparece el atajo", { x: 8.34, y: 2.62, w: 2.1, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.red, margin: 0 });
  pill(s, "LA BRECHA", 10.25, 3.62, 1.62, { fill: C.redSoft, line: C.red, color: C.red, fontSize: 10 });
  s.addText("TIEMPO DE OPTIMIZACIÓN →", { x: 5.55, y: 5.72, w: 2.9, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, charSpacing: 1, color: C.slate, margin: 0 });
  s.addText("El sistema nunca hizo trampa: hizo exactamente lo que le pedimos medir.", { x: 5.55, y: 6.02, w: 6.6, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.5, italic: true, color: C.ink, margin: 0 });
  validate(s, "Conectar Goodhart con humanos y organizaciones: también nosotros aprendemos a jugar con las métricas. Recorrer el gráfico de izquierda a derecha y detenerse en el punto donde las dos líneas se separan.", { skipOverlap: true });
}

// 20 · Tornillos
{
  const s = pptx.addSlide();
  s.background = { color: C.navyDeep };
  crop(s, IMG.screws, 0, 0, W, H);
  bars(s, true); lockup(s, true); footer(s, 20, true);
  s.addShape(SH.rect, { x: 0, y: 5.26, w: W, h: 2.24, fill: { color: C.navyDeep, transparency: 6 }, line: { color: C.navyDeep, transparency: 100 } });
  s.addText("Haz tantos tornillos como puedas", { x: 0.78, y: 5.55, w: 7.4, h: 0.62, fontFace: TYPOGRAPHY.display, fontSize: 29, bold: true, color: C.white, margin: 0 });
  s.addText("Un objetivo simple puede ser desastroso si el sistema no entiende qué debe preservar.", { x: 0.8, y: 6.34, w: 7.65, h: 0.42, fontFace: TYPOGRAPHY.body, fontSize: 14.5, color: "D3E0EB", margin: 0 });
  pill(s, "OBJETIVO ≠ INTENCIÓN", 9.42, 5.8, 2.42, { fill: C.red, line: C.red, color: C.white, fontSize: 11 });
  validate(s, "Usar el maximizador de tornillos como experimento mental accesible. No afirmar que describe literalmente los sistemas actuales.");
}

// 21 · Ataxx reward hacking
{
  const s = pptx.addSlide();
  header(s, "Bloque 3 · Un caso propio", "REWARD HACKING en Ataxx", 21, { dark: true, subtitle: "Una generación aprendió a superar la prueba difícil, pero rendía peor contra la heurística fácil.", titleSize: 30 });
  card(s, 0.72, 1.68, 12.0, 4.96, { fill: "07101C", line: C.darkLine });
  contain(s, IMG.pmEval, 0.9, 1.88, 11.64, 4.58);
  pill(s, "PASAR LA EVAL", 1.08, 6.35, 1.78, { fill: C.red, line: C.red, color: C.white });
  s.addText("no era lo mismo que", { x: 3.18, y: 6.42, w: 2.15, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10.5, color: "AFC3D5", align: "center", margin: 0 });
  pill(s, "JUGAR MEJOR", 5.62, 6.35, 1.68, { fill: C.darkPanel, line: C.cyan, color: C.cyan });
  source(s, "Ataxx Zero AI · Postmortem 12", { dark: true, y: 6.88 });
  validate(s, "Caso local de reward hacking: optimización para el gate hard con regresión ante easy.", { skipOverlap: true });
}

// 22 · Aula problema
{
  const s = pptx.addSlide();
  header(s, "Bloque 4 · Tecnología con propósito", "¿Y si escuchar la clase no fuera posible?", 22, { subtitle: "La misma capacidad tecnológica puede orientarse a ampliar el acceso a la información." });
  s.addShape(SH.ellipse, { x: 0.88, y: 2.02, w: 3.72, h: 3.72, fill: { color: C.softBlue }, line: { color: C.softBlue } });
  const wave = [0.3, 0.72, 1.18, 0.58, 1.45, 0.92, 0.4];
  wave.forEach((h, i) => s.addShape(SH.roundRect, { x: 1.55 + i * 0.36, y: 3.9 - h / 2, w: 0.17, h, rectRadius: 0.05, fill: { color: i === 4 ? C.red : C.navy }, line: { color: i === 4 ? C.red : C.navy } }));
  s.addText("UNA BARRERA REAL", { x: 1.34, y: 5.93, w: 2.82, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, color: C.red, charSpacing: 1, align: "center", margin: 0 });
  arrow(s, 4.86, 3.52, 0.48, C.red);
  crop(s, IMG.aula, 5.58, 1.82, 7.02, 4.82);
  s.addShape(SH.rect, { x: 5.58, y: 4.62, w: 7.02, h: 2.02, fill: { color: C.navyDeep, transparency: 9 }, line: { color: C.navyDeep, transparency: 100 } });
  s.addText("AULA SUBTITULADA", { x: 6.02, y: 4.98, w: 3.62, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.cyan, charSpacing: 1, margin: 0 });
  s.addText("Hablar → transcribir → compartir", { x: 6.02, y: 5.45, w: 5.68, h: 0.46, fontFace: TYPOGRAPHY.display, fontSize: 20, bold: true, color: C.white, margin: 0 });
  pill(s, "ACCESIBILIDAD", 10.32, 6.02, 1.52, { fill: C.red, line: C.red, color: C.white });
  validate(s, "Presentar Aula Subtitulada como proyecto general de accesibilidad, igual para 3A y 3C.", { skipOverlap: true });
}

// 23 · Aula funcionando
{
  const s = pptx.addSlide();
  header(s, "Bloque 4 · Software real", "Aula Subtitulada, funcionando", 23, { subtitle: "La voz se convierte en texto flotante mientras otros dispositivos pueden seguir la transcripción." });
  crop(s, IMG.aula, 0.72, 1.72, 9.58, 4.95);
  card(s, 10.45, 2.08, 2.05, 4.18, { fill: C.navy, line: C.navy });
  contain(s, IMG.aulaMobile, 10.7, 2.32, 1.56, 2.55);
  s.addText("MISMA CLASE", { x: 10.72, y: 5.14, w: 1.56, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: C.cyan, align: "center", margin: 0 });
  s.addText("más de una forma de recibirla", { x: 10.72, y: 5.5, w: 1.56, h: 0.48, fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: C.white, align: "center", margin: 0 });
  source(s, "Aula Subtitulada · captura del prototipo funcional");
  validate(s, "Mostrar evidencia del software antes de explicar su arquitectura. No iniciar una demo.", { skipOverlap: true });
}

// 24 · Arquitectura Aula
{
  const s = pptx.addSlide();
  header(s, "Bloque 4 · Del sonido al acceso", "Hablar → transcribir → distribuir", 24, { subtitle: "El valor aparece cuando varias piezas sencillas se conectan con un propósito claro." });
  card(s, 0.78, 1.78, 4.18, 4.84, { fill: C.navy, line: C.navy });
  const flow = [["01", "VOZ", "micrófono", C.cyan], ["02", "MODELO", "transcripción", C.gold], ["03", "RELAY", "sincronización", C.red], ["04", "TEXTO", "pantallas", C.white]];
  flow.forEach(([n, title, body, accent], i) => {
    const y = 2.12 + i * 0.9;
    s.addShape(SH.ellipse, { x: 1.14, y, w: 0.46, h: 0.46, fill: { color: accent }, line: { color: accent } });
    s.addText(n, { x: 1.14, y: y + 0.12, w: 0.46, h: 0.13, fontFace: TYPOGRAPHY.display, fontSize: 8.5, bold: true, color: accent === C.white ? C.navy : C.white, align: "center", margin: 0 });
    s.addText(title, { x: 1.9, y: y - 0.02, w: 1.18, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10.2, bold: true, color: accent, margin: 0 });
    s.addText(body, { x: 3.08, y: y - 0.01, w: 1.36, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.8, bold: true, color: C.white, margin: 0 });
    if (i < flow.length - 1) s.addShape(SH.line, { x: 1.37, y: y + 0.5, w: 0, h: 0.36, line: { color: C.white, transparency: 55, pt: 1.2, endArrowType: "triangle" } });
  });
  s.addText("La IA es una pieza.\nEl propósito organiza el sistema.", { x: 1.14, y: 5.67, w: 3.28, h: 0.56, fontFace: TYPOGRAPHY.display, fontSize: 16.5, bold: true, color: C.white, margin: 0 });
  crop(s, IMG.aulaInfo, 5.22, 1.78, 7.38, 4.84);
  pill(s, "BARRERA REAL → DISEÑO ÚTIL", 8.86, 5.92, 2.85, { fill: C.red, line: C.red, color: C.white });
  validate(s, "Explicar arquitectura sin detalles de despliegue. Aula es un prototipo funcional, no un servicio en producción.", { skipOverlap: true });
}

// 25 · Ataxx
{
  const s = pptx.addSlide();
  header(s, "Bloque 4 · Reintroducción", "Ataxx: reglas simples, decisiones difíciles", 25, { dark: true, subtitle: "Dos colores compiten por ocupar el tablero. Cada movimiento puede copiar, saltar o convertir piezas vecinas." });
  crop(s, IMG.ataxx, 0.72, 1.72, 8.65, 4.95);
  card(s, 9.68, 1.88, 2.82, 4.55, { fill: C.darkPanel, line: C.darkLine, accent: C.red });
  const rules = [["1", "copiar a una casilla cercana"], ["2", "saltar a una casilla lejana"], ["3", "convertir piezas adyacentes"]];
  rules.forEach(([n, t], i) => {
    const y = 2.28 + i * 1.08;
    s.addShape(SH.ellipse, { x: 10.08, y, w: 0.42, h: 0.42, fill: { color: i === 1 ? C.cyan : C.red }, line: { color: i === 1 ? C.cyan : C.red } });
    s.addText(n, { x: 10.08, y: y + 0.1, w: 0.42, h: 0.14, fontFace: TYPOGRAPHY.display, fontSize: 9.5, bold: true, color: C.white, align: "center", margin: 0 });
    s.addText(t, { x: 10.68, y: y - 0.02, w: 1.38, h: 0.54, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.white, margin: 0 });
  });
  s.addText("NÉMESIS · iteración 166", { x: 10.05, y: 5.8, w: 2.0, h: 0.28, fontFace: TYPOGRAPHY.mono || "Consolas", fontSize: 10.5, bold: true, color: C.cyan, align: "center", margin: 0 });
  validate(s, "Explicar Ataxx desde cero porque no todos asistieron a la charla anterior.");
}

// 26 · Self-play
{
  const s = pptx.addSlide();
  header(s, "Bloque 4 · Aprender sin partidas humanas", "Aprender jugando contra sí misma", 26, { subtitle: "Cada generación crea experiencia, entrena y debe demostrar que realmente mejoró." });
  card(s, 0.78, 1.78, 4.25, 4.84, { fill: C.white, line: C.border, accent: C.red });
  const loop = [["1", "JUGAR", C.cyan], ["2", "GUARDAR", C.gold], ["3", "ENTRENAR", C.blue], ["4", "EVALUAR", C.red]];
  loop.forEach(([n, t, accent], i) => {
    const y = 2.12 + i * 0.88;
    s.addShape(SH.ellipse, { x: 1.18, y, w: 0.48, h: 0.48, fill: { color: accent }, line: { color: accent } });
    s.addText(n, { x: 1.18, y: y + 0.12, w: 0.48, h: 0.14, fontFace: TYPOGRAPHY.display, fontSize: 9, bold: true, color: C.white, align: "center", margin: 0 });
    s.addText(t, { x: 1.98, y: y + 0.08, w: 1.32, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 13.5, bold: true, color: C.navy, margin: 0 });
    if (i < loop.length - 1) s.addShape(SH.line, { x: 1.42, y: y + 0.52, w: 0, h: 0.32, line: { color: C.border, pt: 1.2, endArrowType: "triangle" } });
  });
  pill(s, "¿MEJORÓ DE VERDAD?", 1.16, 5.72, 2.18, { fill: C.navy, line: C.navy, color: C.white });
  s.addText("si no pasa la evaluación, no continúa", { x: 1.16, y: 6.14, w: 3.18, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.red, margin: 0 });
  crop(s, IMG.ataxx, 5.3, 1.78, 7.3, 4.84);
  pill(s, "SELF-PLAY", 10.65, 5.92, 1.18, { fill: C.red, line: C.red, color: C.white });
  validate(s, "Introducir self-play y MCTS como búsqueda de futuros posibles, sin entrar en fórmulas.", { skipOverlap: true });
}

// 27 · Genealogía
{
  const s = pptx.addSlide();
  header(s, "Bloque 4 · Generaciones", "NÉMESIS no apareció de una vez", 27, { subtitle: "Cada nombre conserva una hipótesis, un fracaso o una mejora que cambió el sistema." });
  card(s, 0.78, 1.76, 4.16, 4.9, { fill: C.navy, line: C.navy });
  const gens = [["bogo", "v1", C.slate], ["reflejo", "v2", C.gold], ["centinela", "v6", C.red], ["amnesia", "v7", C.blue], ["legión", "v8", C.green], ["némesis", "v15", C.red]];
  gens.forEach(([name, version, accent], i) => {
    const y = 2.08 + i * 0.66;
    s.addShape(SH.line, { x: 1.34, y: y + 0.28, w: 0.72, h: 0, line: { color: accent, pt: 2, endArrowType: i === gens.length - 1 ? "none" : "triangle" } });
    s.addText(name.toUpperCase(), { x: 2.28, y: y + 0.12, w: 1.28, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 11.5, bold: true, color: C.white, margin: 0 });
    pill(s, version, 3.62, y + 0.02, 0.62, { fill: C.darkPanel, line: accent, color: accent, fontSize: 8.5, h: 0.34 });
  });
  s.addText("Cada nombre conserva\nun postmortem.", { x: 1.18, y: 6.02, w: 3.18, h: 0.44, fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: C.cyan, margin: 0 });
  crop(s, IMG.pmEval, 5.2, 1.76, 7.4, 4.9);
  s.addShape(SH.rect, { x: 5.2, y: 5.55, w: 7.4, h: 1.11, fill: { color: C.navyDeep, transparency: 8 }, line: { color: C.navyDeep, transparency: 100 } });
  s.addText("fallar → medir → entender → cambiar", { x: 5.72, y: 5.88, w: 6.35, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 17.5, bold: true, color: C.white, align: "center", margin: 0 });
  source(s, "Ataxx Zero AI · Postmortems de evaluación");
  validate(s, "Dar protagonismo a las iteraciones y postmortems, no solo al resultado final.", { skipOverlap: true });
}

// 28 · Descubrimiento humano
{
  const s = pptx.addSlide();
  header(s, "Bloque 4 · Postmortem de campo", "Un alumno encontró el exploit primero", 28, { dark: true, subtitle: "Jugando contra las heurísticas, descubrió una táctica repetible para forzar respuestas débiles.", titleSize: 28 });
  card(s, 0.72, 1.78, 5.18, 4.82, { fill: C.darkPanel, line: C.darkLine, accent: C.gold });
  contain(s, IMG.ataxxStudentChat, 0.98, 2.03, 4.66, 1.9);
  s.addShape(SH.line, { x: 1.02, y: 4.23, w: 4.48, h: 0, line: { color: C.gold, pt: 1.5 } });
  s.addText("Mover hacia un lado, copiar movimientos y provocar que la heurística se equivoque.", { x: 1.02, y: 4.58, w: 4.4, h: 0.95, fontFace: TYPOGRAPHY.display, fontSize: 18.5, bold: true, color: C.white, margin: 0 });
  pill(s, "HUMANO DESCUBRE EL ATAJO", 1.02, 5.88, 2.72, { fill: C.gold, line: C.gold, color: C.navyDeep });
  s.addMedia({ type: "video", path: VIDEO.ataxxStudent, cover: mediaCover(IMG.ataxxStudentFrame), x: 6.2, y: 1.78, w: 6.4, h: 4.82 });
  pill(s, "VIDEO · 21 S", 10.18, 5.92, 1.48, { fill: C.red, line: C.red, color: C.white });
  source(s, "Registro de una partida en contexto docente", { dark: true });
  validate(s, "Presentar el descubrimiento como una observación genuina nacida al jugar contra el sistema.", { skipOverlap: true });
}

// 29 · Descubrimiento del modelo
{
  const s = pptx.addSlide();
  header(s, "Bloque 4 · Descubrimiento independiente", "Después, el modelo encontró un atajo parecido", 29, { dark: true, subtitle: "Al descargar una generación nueva apareció la misma familia de conducta, sin haberle enseñado la táctica del alumno.", titleSize: 27 });
  card(s, 0.72, 1.78, 5.55, 4.82, { fill: C.darkPanel, line: C.darkLine, accent: C.red });
  contain(s, IMG.ataxxModelChat, 0.94, 2.02, 5.1, 2.94);
  s.addText("Misma presión de evaluación.\nAtajo descubierto por otra ruta.", { x: 1.0, y: 5.3, w: 4.82, h: 0.7, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.white, margin: 0 });
  pill(s, "MODELO REDESCUBRE EL EXPLOIT", 1.0, 6.02, 2.86, { fill: C.red, line: C.red, color: C.white });
  s.addMedia({ type: "video", path: VIDEO.ataxxModel, cover: mediaCover(IMG.ataxxModelFrame), x: 6.56, y: 1.78, w: 6.04, h: 4.82 });
  pill(s, "VIDEO · 43 S", 10.55, 5.92, 1.25, { fill: C.cyan, line: C.cyan, color: C.navyDeep });
  source(s, "Ataxx Arena · partida registrada", { dark: true });
  validate(s, "Conectar el hallazgo humano y el del modelo: el objetivo mal planteado hace atractiva la misma clase de atajo.", { skipOverlap: true });
}

// 30 · Despertar
{
  const s = pptx.addSlide();
  header(s, "Bloque 4 · Resultado", "Cuando finalmente despertó", 30, { dark: true, subtitle: "La curva cambió después de corregir la evaluación y el proceso de entrenamiento." });
  card(s, 0.72, 1.7, 12.0, 4.98, { fill: "07101C", line: C.darkLine });
  contain(s, IMG.pmWake, 0.88, 1.9, 11.65, 4.55);
  pill(s, "40–0", 10.48, 1.98, 1.12, { fill: C.red, line: C.red, color: C.white, fontSize: 15, h: 0.52 });
  s.addText("vs. LEGIÓN / liga", { x: 9.62, y: 2.6, w: 2.8, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, color: C.white, align: "center", margin: 0 });
  source(s, "Ataxx Zero AI · Postmortem 12", { dark: true, y: 6.88 });
  validate(s, "Aclarar que 40–0 corresponde al head-to-head documentado; NÉMESIS sigue siendo un sistema evaluable, no invencible.", { skipOverlap: true });
}

// 31 · Osorno
{
  const s = pptx.addSlide();
  header(s, "Integración", "La frontera también puede comenzar en Osorno", 31, { subtitle: "Tres proyectos distintos. La misma decisión: convertir una idea en algo que funciona." });
  const panels = [
    { x: 0.72, img: IMG.geogreenRoute, title: "GEOGREEN", body: "sensar, visualizar y decidir", accent: C.green },
    { x: 4.48, img: IMG.aula, title: "AULA SUBTITULADA", body: "software para ampliar acceso", accent: C.cyan },
    { x: 8.24, img: IMG.ataxx, title: "NÉMESIS", body: "IA que aprende por generaciones", accent: C.red },
  ];
  panels.forEach((p) => {
    card(s, p.x, 1.82, 3.38, 4.75, { fill: C.white, line: C.border });
    crop(s, p.img, p.x + 0.14, 1.96, 3.1, 2.72);
    s.addShape(SH.rect, { x: p.x + 0.14, y: 4.68, w: 3.1, h: 0.08, fill: { color: p.accent }, line: { color: p.accent } });
    s.addText(p.title, { x: p.x + 0.28, y: 5.05, w: 2.82, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy, align: "center", margin: 0 });
    s.addText(p.body, { x: p.x + 0.38, y: 5.56, w: 2.62, h: 0.45, fontFace: TYPOGRAPHY.body, fontSize: 11.3, color: C.slate, align: "center", margin: 0 });
  });
  validate(s, "Integrar proyectos cercanos: hardware, accesibilidad e IA. La frontera no pertenece solo a grandes laboratorios.");
}

// 32 · Cierre
{
  const s = pptx.addSlide();
  s.background = { color: C.navyDeep };
  crop(s, IMG.hero, 0, 0, W, H);
  s.addShape(SH.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.navyDeep, transparency: 32 }, line: { color: C.navyDeep, transparency: 100 } });
  s.addShape(SH.rect, { x: 0, y: 0, w: 7.15, h: H, fill: { color: C.navyDeep, transparency: 12 }, line: { color: C.navyDeep, transparency: 100 } });
  bars(s, true); lockup(s, true); footer(s, 32, true);
  pill(s, "CIERRE", 0.8, 0.72, 0.92, { fill: C.red, line: C.red, color: C.white });
  s.addText("Del LED a construir el futuro", { x: 0.8, y: 1.62, w: 6.0, h: 0.98, fontFace: TYPOGRAPHY.display, fontSize: 35, bold: true, color: C.white, margin: 0 });
  s.addText("La IA puede escribir código.\nLa decisión sigue siendo nuestra.", { x: 0.82, y: 3.02, w: 5.5, h: 1.1, fontFace: TYPOGRAPHY.body, fontSize: 21, bold: true, color: "D6E4F0", margin: 0, breakLine: false });
  s.addShape(SH.rect, { x: 0.82, y: 4.48, w: 1.28, h: 0.08, fill: { color: C.red }, line: { color: C.red } });
  s.addText("¿Qué problema elegirías resolver —y qué límites pondrías?", { x: 0.82, y: 4.85, w: 6.0, h: 0.95, fontFace: TYPOGRAPHY.display, fontSize: 24, bold: true, color: C.cyan, margin: 0 });
  s.addText("Programar ahora también es definir propósito, entregar contexto, verificar resultados y hacerse responsable.", { x: 0.82, y: 6.25, w: 7.35, h: 0.44, fontFace: TYPOGRAPHY.body, fontSize: 13.5, color: "BFD0E0", margin: 0 });
  validate(s, "Cerrar volviendo al LED y al nuevo papel de quien programa. Abrir conversación, no asignar una actividad obligatoria.", { skipOverlap: true });
}

pptx.writeFile({ fileName: output })
  .then(() => console.log(`OK -> ${output}`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
