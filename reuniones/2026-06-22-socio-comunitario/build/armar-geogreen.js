/**
 * Genera las slides 6-22 del deck del socio comunitario con NUESTRO sistema
 * (PptxGenJS + tema AIEP de tools/slides-system). Audience-facing, sin contexto
 * interno. Lleva el lockup "Vinculación con el Medio" (sello) en cada slide.
 * Salida: build/parte-geogreen.pptx  (se fusiona luego con las slides 1-5 de la base)
 *
 * Uso: node build/armar-geogreen.js
 */
const path = require("path");
const SS = path.resolve(__dirname, "../../../tools/slides-system");
const PptxGenJS = require(path.join(SS, "node_modules/pptxgenjs"));
const { theme } = require(SS);
const { imageSizingContain } = require(path.join(SS, "vendor/pptxgenjs_helpers/image"));
const { TOKENS: C, TYPOGRAPHY: T } = theme;

const HERE = path.resolve(__dirname, "..");
const REPO = path.resolve(__dirname, "../../..");
const ASSETS = path.join(HERE, "assets");
const IMG = {
  lockup: path.join(ASSETS, "lockup-vinculacion-dark.png"),
  lockupW: path.join(ASSETS, "lockup-vinculacion-white.png"),
  app: path.join(REPO, "reuniones/2026-06-15/ppt/source/assets/app-geogreen-mapa-osorno.png"),
  proto: path.join(REPO, "docs/infografias/infografia-prototipo-original-sim-geogreen.jpg"),
  render: path.join(ASSETS, "render-poster.jpg"),
  objetivo: path.join(REPO, "cronograma/infografias/infografia-objetivo-transversal-geogreen.png"),
  r4: path.join(REPO, "docs/arduino-uno-r4-wifi-dibujo-digital-crop.png"),
  s_hc: path.join(REPO, "docs/kit-sensores/assets/hc-sr04.jpg"),
  s_mpu: path.join(REPO, "docs/kit-sensores/assets/mpu6050.jpg"),
  s_rgb: path.join(REPO, "docs/kit-sensores/assets/ky-016.jpg"),
  s_buz: path.join(REPO, "docs/kit-sensores/assets/ky-006.jpg"),
  s_rel: path.join(REPO, "docs/kit-sensores/assets/ky-019.jpg"),
  sensores: path.join(ASSETS, "info-sensores.png"),
  actuadores: path.join(ASSETS, "info-actuadores.png"),
  protoboard: path.join(ASSETS, "info-protoboard.png"),
  t1: path.join(ASSETS, "info-taller1.png"),
  t2: path.join(ASSETS, "info-taller2.png"),
  t3: path.join(ASSETS, "info-taller3.png"),
  pb2: path.join(ASSETS, "info-protoboard2.png"),
  elec: path.join(ASSETS, "info-electricidad.png"),
};

const A = {
  navy: C.navy, red: C.red, gold: C.gold, slate: C.slate, border: C.border,
  ink: C.ink, paper: C.paper, white: "FFFFFF", softBlue: C.softBlue, guide: C.guide,
  green: C.success, softGreen: C.successSoft, softGold: C.warningSoft,
  softRed: C.paleRed, navyDeep: "0B1B30", line2: "E3E7EC",
};

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
theme.applyAiepTheme(pptx, {
  author: "GeoGreen Escolar Osorno", company: "AIEP Osorno",
  subject: "GeoGreen - Presentacion socio comunitario",
  title: "GeoGreen Escolar - Socio comunitario",
});
const SH = pptx.ShapeType;
const W = 13.333, H = 7.5;
let PAGE = 5; const pg = () => ++PAGE; // continúa la numeración tras las 5 slides de la base

// ---------- helpers ----------
const bg = (s, c = A.paper) => { s.background = { color: c }; rect(s, 0, 0, W, H, c); };
const rect = (s, x, y, w, h, fill, o = {}) => s.addShape(SH.rect, {
  x, y, w, h, fill: { color: fill, transparency: o.transparency ?? 0 },
  line: { color: o.line ?? fill, transparency: o.lineTransparency ?? 100, pt: o.pt ?? 0 },
});
const line = (s, x, y, w, c = A.border, pt = 0.8) => s.addShape(SH.line, { x, y, w, h: 0, line: { color: c, pt } });
const panel = (s, x, y, w, h, o = {}) => s.addShape(SH.roundRect, {
  x, y, w, h, rectRadius: o.radius ?? 0.09,
  fill: { color: o.fill ?? A.white, transparency: o.transparency ?? 0 },
  line: { color: o.line ?? A.border, transparency: o.lineTransparency ?? 0, pt: o.pt ?? 0.9 },
  shadow: o.shadow ? { type: "outer", color: "D8DEE6", opacity: 0.16, blur: 2, angle: 45, distance: 1.5 } : undefined,
});
const imgC = (s, p, x, y, w, h) => s.addImage({ path: p, ...imageSizingContain(p, x, y, w, h) });
const txt = (s, t, x, y, w, h, o = {}) => s.addText(t, {
  x, y, w, h, fontFace: o.face ?? T.body, fontSize: o.size ?? 12, color: o.color ?? A.ink,
  bold: o.bold ?? false, italic: o.italic ?? false, align: o.align ?? "left",
  valign: o.valign ?? "top", margin: o.margin ?? 0.02, breakLine: false, fit: o.fit ?? "shrink",
  charSpace: o.charSpace,
});

function lockup(s, white = false) { imgC(s, white ? IMG.lockupW : IMG.lockup, 11.55, 0.34, 1.42, 1.06); }
function bars(s, x, y, scale = 1, color = A.red) {
  rect(s, x, y + 0.16 * scale, 0.14 * scale, 0.42 * scale, color);
  rect(s, x + 0.2 * scale, y, 0.16 * scale, 0.58 * scale, color);
  rect(s, x + 0.42 * scale, y + 0.16 * scale, 0.14 * scale, 0.42 * scale, color);
}
function header(s, eyebrow, title, subtitle = "", o = {}) {
  bars(s, 0.74, 0.5, 1.0, o.accent ?? A.red);
  txt(s, eyebrow.toUpperCase(), 1.42, 0.5, 8.4, 0.18, { size: 9, bold: true, color: o.eyebrowColor ?? A.red, charSpace: 0.9 });
  s.addText(title, { x: 1.42, y: 0.78, w: o.titleW ?? 9.2, h: 0.46, fontFace: T.display, fontSize: o.titleSize ?? 24, bold: true, color: A.navy, margin: 0, breakLine: false, fit: "shrink" });
  if (subtitle) txt(s, subtitle, 1.42, 1.3, o.subtitleW ?? 9.0, 0.26, { size: 11, color: A.slate });
}
function footer(s, n, dark = false) {
  line(s, 0.74, 7.02, 11.82, dark ? "FFFFFF" : A.border, 0.65);
  txt(s, "GeoGreen Escolar · AIEP Osorno", 0.74, 7.13, 6.0, 0.16, { size: 8, color: dark ? "DCE6F2" : A.slate });
  s.addShape(SH.roundRect, { x: 12.12, y: 7.07, w: 0.46, h: 0.24, rectRadius: 0.05, fill: { color: dark ? A.red : A.navy }, line: { color: dark ? A.red : A.navy, transparency: 100 } });
  txt(s, String(n).padStart(2, "0"), 12.12, 7.135, 0.46, 0.1, { size: 7.6, bold: true, color: A.white, align: "center" });
}
function band(s, x, y, w, h, text, o = {}) {
  panel(s, x, y, w, h, { fill: o.fill ?? A.navy, line: o.fill ?? A.navy, radius: 0.08 });
  txt(s, text, x + 0.26, y, w - 0.52, h, { size: o.size ?? 11, color: o.color ?? A.white, bold: true, align: "center", valign: "middle" });
}
function statCard(s, big, label, x, y, w, h, o = {}) {
  panel(s, x, y, w, h, { fill: A.white, line: o.line ?? A.border, shadow: true });
  rect(s, x, y, w, 0.1, o.accent ?? A.navy);
  txt(s, big, x + 0.16, y + 0.34, w - 0.32, 0.7, { size: o.bigSize ?? 30, bold: true, color: o.accent ?? A.navy, align: "center", face: T.display });
  txt(s, label, x + 0.18, y + h - 0.78, w - 0.36, 0.66, { size: 11, color: A.ink, align: "center", valign: "top" });
}
function bullets(s, items, x, y, w, o = {}) {
  const gap = o.gap ?? 0.62;
  items.forEach((it, i) => {
    const yy = y + i * gap;
    s.addShape(SH.ellipse, { x, y: yy + 0.07, w: 0.15, h: 0.15, fill: { color: o.accent ?? A.green }, line: { color: o.accent ?? A.green, transparency: 100 } });
    txt(s, it, x + 0.3, yy, w - 0.3, o.itemH ?? 0.5, { size: o.size ?? 11.5, color: A.ink });
  });
}
function pillTitle(s, label, x, y, w, color) {
  s.addShape(SH.roundRect, { x, y, w, h: 0.34, rectRadius: 0.06, fill: { color }, line: { color, transparency: 100 } });
  txt(s, label, x + 0.12, y + 0.02, w - 0.24, 0.3, { size: 10.5, bold: true, color: A.white, align: "center", valign: "middle" });
}
function infoCard(s, x, y, w, h, label, body, accent, fillSoft) {
  panel(s, x, y, w, h, { fill: fillSoft ?? A.white, line: accent, pt: 1.2, shadow: true });
  pillTitle(s, label, x + 0.22, y + 0.24, Math.min(w - 0.44, 2.9), accent);
  txt(s, body, x + 0.24, y + 0.78, w - 0.48, h - 1.0, { size: 11.5, color: A.ink, valign: "top" });
}
// chip cuadrado con número/glyph (badge de icono)
function badge(s, x, y, sz, color, glyph, o = {}) {
  s.addShape(SH.roundRect, { x, y, w: sz, h: sz, rectRadius: sz * 0.26, fill: { color }, line: { color, transparency: 100 } });
  if (glyph != null) txt(s, String(glyph), x, y + (o.dy ?? 0), sz, sz, { size: o.size ?? sz * 26, bold: true, color: A.white, align: "center", valign: "middle", face: T.display });
}
// fila de feature: badge + título + bajada
function featRow(s, x, y, w, color, glyph, title, desc, o = {}) {
  const sz = o.sz ?? 0.5;
  badge(s, x, y, sz, color, glyph, { size: o.glyphSize ?? 16 });
  txt(s, title, x + sz + 0.26, y - 0.05, w - sz - 0.26, 0.32, { size: o.titleSize ?? 13.5, bold: true, color: A.navy, face: T.display });
  if (desc) txt(s, desc, x + sz + 0.26, y + 0.3, w - sz - 0.26, o.descH ?? 0.62, { size: o.descSize ?? 11, color: A.slate });
}
// semáforo (poste oscuro + 3 luces)
function semaforo(s, x, y, sc = 1) {
  const pw = 0.74 * sc, ph = 2.0 * sc, d = 0.46 * sc, pad = 0.14 * sc, gapc = 0.11 * sc;
  s.addShape(SH.roundRect, { x, y, w: pw, h: ph, rectRadius: 0.12 * sc, fill: { color: A.navyDeep }, line: { color: A.navyDeep, transparency: 100 } });
  const cx = x + pw / 2 - d / 2;
  [A.red, A.gold, A.green].forEach((c, i) => s.addShape(SH.ellipse, { x: cx, y: y + pad + i * (d + gapc), w: d, h: d, fill: { color: c }, line: { color: "0B1B30", pt: 1 } }));
}
// rail de acento a la izquierda
function rail(s, color = A.red) { rect(s, 0, 0, 0.16, H, color); }
// imagen enmarcada en panel blanco con sombra
function framed(s, p, x, y, w, h, o = {}) {
  panel(s, x, y, w, h, { fill: A.white, line: o.line ?? A.border, radius: o.radius ?? 0.05, shadow: true });
  imgC(s, p, x + 0.18, y + 0.16, w - 0.36, h - 0.32);
}
// chip de etiqueta (pill outline)
function tag(s, label, x, y, color) {
  const w = 0.2 + label.length * 0.085;
  s.addShape(SH.roundRect, { x, y, w, h: 0.3, rectRadius: 0.15, fill: { color: A.white }, line: { color, pt: 1.1 } });
  txt(s, label.toUpperCase(), x, y + 0.015, w, 0.27, { size: 8.5, bold: true, color, align: "center", valign: "middle", charSpace: 0.5 });
}

// =================== SLIDE 6 · Divisor GEOGREEN ===================
function s06() {
  const s = pptx.addSlide(); pg(); bg(s, A.navyDeep); lockup(s, true);
  bars(s, 0.9, 2.5, 1.3, A.red);
  s.addText("GeoGreen", { x: 0.86, y: 3.1, w: 9.0, h: 1.1, fontFace: T.display, fontSize: 52, bold: true, color: A.white, margin: 0 });
  txt(s, "Tecnología con sentido para el reciclaje en Osorno", 0.92, 4.35, 9.0, 0.4, { size: 18, color: "DCE6F2" });
  rect(s, 0, 7.06, W, 0.08, A.red);
}

// =================== SLIDE 7 · Problema Osorno ===================
function s07() {
  const s = pptx.addSlide(); bg(s, A.white); lockup(s);
  header(s, "Contexto territorial", "Osorno: un desafío local de reciclaje",
    "El programa nace de un problema visible del territorio, no de un ejercicio tecnológico.");
  const cards = [["75%", "meta de reciclaje al 2028", A.red], ["+1,3 M", "kg de reciclaje recuperados al año en la comuna", A.navy], ["+100", "puntos limpios y verdes en la ciudad", A.green]];
  cards.forEach(([b, l, ac], i) => statCard(s, b, l, 0.78 + i * 4.0, 1.92, 3.72, 1.9, { accent: ac, bigSize: 31 }));
  bullets(s, [
    "La brecha crítica está en la separación en origen.",
    "Material reciclable se pierde al mezclarse o contaminarse.",
    "Falta información para decidir y actuar a tiempo.",
  ], 0.95, 4.2, 11.0, { accent: A.red, gap: 0.5, size: 12.5, itemH: 0.4 });
  band(s, 0.78, 6.18, 11.72, 0.62, "GeoGreen conecta datos, hábitos y tecnología para mejorar esas decisiones.");
  footer(s, pg());
}

// =================== SLIDE 8 · Qué es GeoGreen ===================
function s08() {
  const s = pptx.addSlide(); bg(s, A.paper); rail(s, A.red); lockup(s);
  header(s, "La solución", "¿Qué es GeoGreen?",
    "Un dispositivo que mide cuánto se llena un contenedor de reciclaje y lo avisa a tiempo.");
  // pipeline de 3 pasos con badge + chevrons
  const steps = [
    ["1", "Sensar", "Un sensor mide cuánto se\nllena el contenedor.", A.navy],
    ["2", "Avisar", "Un semáforo y una alarma\nmuestran el estado.", A.gold],
    ["3", "Visualizar", "El nivel se ve en un\ntablero, al instante.", A.green],
  ];
  const cw = 2.56, gap = 0.42; let x = 0.78;
  steps.forEach(([n, t, d, c], i) => {
    panel(s, x, 2.45, cw, 2.35, { fill: A.white, line: A.border, shadow: true });
    rect(s, x, 2.45, cw, 0.1, c);
    badge(s, x + cw / 2 - 0.33, 2.74, 0.66, c, n, { size: 21 });
    txt(s, t.toUpperCase(), x + 0.16, 3.56, cw - 0.32, 0.3, { size: 14, bold: true, color: A.navy, align: "center", face: T.display, charSpace: 0.4 });
    txt(s, d, x + 0.2, 3.96, cw - 0.4, 0.8, { size: 10.5, color: A.slate, align: "center" });
    if (i < 2) s.addShape(SH.chevron, { x: x + cw + 0.0, y: 3.38, w: 0.36, h: 0.46, fill: { color: A.red }, line: { color: A.red, transparency: 100 } });
    x += cw + gap;
  });
  // panel del semáforo (el "avisar" hecho concreto)
  const px = 0.78 + 3 * cw + 2 * gap + 0.06, pr = 12.55;
  panel(s, px, 2.45, pr - px, 2.35, { fill: A.navyDeep, line: A.navyDeep, shadow: true });
  txt(s, "EL SEMÁFORO", px + 0.28, 2.66, pr - px - 0.5, 0.26, { size: 11, bold: true, color: A.white, face: T.display, charSpace: 0.8 });
  semaforo(s, px + 0.26, 3.12, 0.74);
  const tx = px + 1.04;
  [["≥ 80%", "Rojo", A.red], ["40–80%", "Amarillo", A.gold], ["< 40%", "Verde", A.green]].forEach(([pc, l, c], i) => {
    const yy = 3.2 + i * 0.5;
    s.addShape(SH.ellipse, { x: tx, y: yy + 0.04, w: 0.2, h: 0.2, fill: { color: c }, line: { color: c, transparency: 100 } });
    txt(s, pc, tx + 0.3, yy - 0.02, 0.92, 0.3, { size: 11.5, bold: true, color: A.white });
    txt(s, l, tx + 0.3, yy + 0.21, 1.4, 0.22, { size: 8.6, color: "9FB4CC" });
  });
  band(s, 0.78, 5.66, 11.77, 0.62, "Una idea simple, al servicio de un problema real.");
  footer(s, pg());
}

// =================== SLIDE 9 · El dispositivo ===================
function s09() {
  const s = pptx.addSlide(); bg(s, A.paper); rail(s, A.green); lockup(s);
  header(s, "El prototipo", "Así pensamos el dispositivo",
    "Del sensor al aviso: cómo funciona GeoGreen dentro del contenedor.", { titleW: 8.6, subtitleW: 8.4 });
  const feats = [
    [A.navy, "1", "Mide sin abrir", "Calcula cuánto se llena el contenedor con un sensor, desde la tapa."],
    [A.gold, "2", "Avisa al instante", "Lo muestra con un semáforo de color y alerta cuando está lleno."],
    [A.green, "3", "Decide mejor", "Una base concreta para un reciclaje más inteligente y a tiempo."],
  ];
  feats.forEach(([c, n, t, d], i) => featRow(s, 0.95, 2.32 + i * 1.18, 5.0, c, n, t, d, { sz: 0.56, glyphSize: 18, descH: 0.72 }));
  framed(s, IMG.proto, 6.35, 1.74, 6.2, 5.32, { radius: 0.04 });
  footer(s, pg());
}

// =================== SLIDE 9b · Visualización 3D del dispositivo ===================
function s09b() {
  const s = pptx.addSlide(); bg(s, A.paper); rail(s, A.navy); lockup(s);
  header(s, "Visualización", "El dispositivo en 3D",
    "Una vista del aparato, el caso central de GeoGreen Escolar.", { titleW: 8.6, subtitleW: 8.4 });
  tag(s, "Modelado 3D", 0.95, 2.46, A.navy);
  bullets(s, [
    "Los equipos modelan en 3D la carcasa que protege el dispositivo.",
    "Una vista de cómo se vería el aparato fuera de la protoboard.",
  ], 0.95, 3.1, 5.2, { accent: A.navy, gap: 0.95, size: 12.5, itemH: 0.82 });
  framed(s, IMG.render, 6.7, 1.95, 5.9, 4.65, { radius: 0.04 });
  footer(s, pg());
}

// =================== SLIDE 10 · Componente tecnológico real ===================
function s10() {
  const s = pptx.addSlide(); bg(s, A.white); lockup(s);
  header(s, "El componente tecnológico", "La tecnología es real y está al alcance",
    "No es una promesa: el equipo está listo para que los estudiantes lo usen.", { titleW: 8.6, subtitleW: 8.4 });
  bullets(s, [
    "Una placa Arduino UNO R4 WiFi, robusta y conectada.",
    "Un kit de sensores para medir el mundo físico.",
    "El mismo dispositivo que los estudiantes prototipan.",
  ], 0.95, 2.2, 5.1, { accent: A.green, gap: 0.74, size: 12.5, itemH: 0.66 });
  panel(s, 6.35, 1.95, 6.2, 2.95, { fill: A.white, line: A.border, radius: 0.05, shadow: true });
  imgC(s, IMG.r4, 6.55, 2.12, 5.8, 2.6);
  txt(s, "Placa Arduino UNO R4 WiFi", 6.35, 4.92, 6.2, 0.2, { size: 9, color: A.slate, align: "center" });
  const sensors = [IMG.s_hc, IMG.s_mpu, IMG.s_rgb, IMG.s_buz, IMG.s_rel];
  const sw = 1.12, sgap = 0.2; let sx = 6.35 + (6.2 - (sensors.length * sw + (sensors.length - 1) * sgap)) / 2;
  sensors.forEach((p) => { panel(s, sx, 5.35, sw, sw, { fill: A.white, line: A.border, radius: 0.07 }); imgC(s, p, sx + 0.08, 5.43, sw - 0.16, sw - 0.16); sx += sw + sgap; });
  txt(s, "Sensores del kit (medir nivel, luz, sonido, movimiento, actuar)", 6.35, 6.6, 6.2, 0.2, { size: 9, color: A.slate, align: "center" });
  footer(s, pg());
}

// =================== SLIDE 10b · Sensores y actuadores ===================
function s10b() {
  const s = pptx.addSlide(); bg(s, A.paper); rail(s, A.navy); lockup(s);
  header(s, "El lenguaje del dispositivo", "Sensar el mundo, actuar sobre él",
    "Dos familias de componentes que los estudiantes aprenden a combinar.", { titleW: 8.6, subtitleW: 8.6 });
  const pw = 4.95, ph = 4.62, y = 1.95;
  // sensores
  framed(s, IMG.sensores, 1.05, y, pw, ph, { radius: 0.05 });
  tag(s, "Entran datos · Sensores", 1.05, y + ph + 0.12, A.navy);
  // actuadores
  const x2 = 1.05 + pw + 0.95;
  framed(s, IMG.actuadores, x2, y, pw, ph, { radius: 0.05 });
  tag(s, "Salen acciones · Actuadores", x2, y + ph + 0.12, A.red);
  footer(s, pg());
}

// =================== SLIDE 11 · La visión / app ===================
function s11() {
  const s = pptx.addSlide(); bg(s, A.white); lockup(s);
  header(s, "La plataforma", "Del contenedor al mapa",
    "Cada dispositivo informa por internet; el tablero muestra los puntos de Osorno en un mapa.", { titleW: 8.6, subtitleW: 8.4 });
  panel(s, 0.78, 1.95, 7.55, 4.0, { fill: A.white, line: A.border, radius: 0.04, shadow: true });
  imgC(s, IMG.app, 0.95, 2.12, 7.2, 3.66);
  bullets(s, [
    "Mapa con los contenedores en ubicaciones reales de Osorno.",
    "Estado por llenado: verde, amarillo y rojo.",
    "Alertas de lleno, batería baja o sin señal.",
    "Ruta de retiro sugerida por la ciudad.",
  ], 8.7, 2.05, 3.9, { accent: A.green, gap: 0.72, size: 11, itemH: 0.62 });
  band(s, 0.78, 6.22, 11.72, 0.62, "Ahí está el “Geo” de GeoGreen: del dato al mapa que ayuda a decidir.");
  footer(s, pg());
}

// =================== SLIDE 12 · GeoGreen Escolar ===================
function s12() {
  const s = pptx.addSlide(); bg(s, A.paper); lockup(s);
  header(s, "El programa", "GeoGreen Escolar",
    "Un programa STEM que llevamos a su colegio, con el dispositivo como caso central.");
  const cards = [["60", "estudiantes participantes", A.red], ["Talleres", "+ mentorías de acompañamiento", A.navy], ["Desafío", "final con pitch por equipos", A.green], ["3 carreras", "AIEP involucradas", A.gold]];
  cards.forEach(([b, l, ac], i) => statCard(s, b, l, 0.78 + i * 3.0, 1.95, 2.78, 1.92, { accent: ac, bigSize: b.length > 4 ? 22 : 30 }));
  band(s, 0.78, 4.35, 11.72, 1.7, "Los estudiantes viven el ciclo completo: observar un problema real de su entorno, entenderlo y proponer una solución con tecnología.", { fill: A.navy, size: 14 });
  footer(s, pg());
}

// =================== SLIDE 13 · Objetivo transversal ===================
function s13() {
  const s = pptx.addSlide(); bg(s, A.paper); rail(s, A.gold); lockup(s);
  header(s, "La gran foto", "Una sola experiencia integrada",
    "Sostenibilidad, datos y tecnología en un recorrido con propósito.", { titleW: 9.2, subtitleW: 8.6 });
  // flujo vertical de 3 etapas, conectadas por una línea
  const stages = [
    [A.green, "Talleres", "Observar el problema, entender el material y la tecnología."],
    [A.navy, "Mentorías", "Acompañamiento cercano para madurar cada propuesta."],
    [A.red, "Desafío", "Un pitch final donde los equipos presentan su solución."],
  ];
  const bx = 1.0, by = 2.28, step = 1.24, bsz = 0.6;
  s.addShape(SH.line, { x: bx + bsz / 2, y: by + bsz / 2, w: 0, h: step * 2, line: { color: A.border, pt: 1.4 } });
  stages.forEach(([c, t, d], i) => {
    const yy = by + i * step;
    badge(s, bx, yy, bsz, c, i + 1, { size: 19 });
    txt(s, t, bx + bsz + 0.26, yy - 0.04, 3.6, 0.34, { size: 15, bold: true, color: A.navy, face: T.display });
    txt(s, d, bx + bsz + 0.26, yy + 0.32, 3.7, 0.66, { size: 11, color: A.slate });
  });
  panel(s, bx, 6.16, 4.85, 0.66, { fill: A.softGold, line: A.gold, pt: 1, radius: 0.07 });
  txt(s, "Cada etapa deja entregables que alimentan la siguiente.", bx + 0.2, 6.16, 4.5, 0.66, { size: 11, bold: true, color: A.ink, valign: "middle" });
  framed(s, IMG.objetivo, 6.05, 1.7, 6.5, 5.4, { radius: 0.04 });
  footer(s, pg());
}

// =================== SLIDE 14 · Recorrido formativo ===================
function s14() {
  const s = pptx.addSlide(); bg(s, A.white); rail(s, A.navy); lockup(s);
  header(s, "La secuencia", "El recorrido que viven los estudiantes",
    "Una progresión que va del problema observado a la propuesta presentada.");
  const steps = [["1", "Observar", "el problema", A.green], ["2", "Entender", "el material", A.gold], ["3", "La tecnología", "sensar y avisar", A.navy], ["4", "Mentorías", "diseñar la solución", A.red], ["5", "Desafío", "el pitch final", A.green]];
  const cw = 2.24, gap = 0.22; let x = 0.6;
  const cy = 3.18; // centro de los badges
  // track line continua detrás de los badges
  s.addShape(SH.line, { x: 0.6 + cw / 2, y: cy, w: 4 * (cw + gap), h: 0, line: { color: A.line2, pt: 2.2 } });
  steps.forEach(([n, t, d, c], i) => {
    panel(s, x, 2.62, cw, 2.62, { fill: A.white, line: A.border, shadow: true });
    rect(s, x, 2.62, cw, 0.09, c);
    s.addShape(SH.ellipse, { x: x + cw / 2 - 0.34, y: cy - 0.34, w: 0.68, h: 0.68, fill: { color: A.white }, line: { color: c, pt: 2.4 } });
    s.addShape(SH.ellipse, { x: x + cw / 2 - 0.24, y: cy - 0.24, w: 0.48, h: 0.48, fill: { color: c }, line: { color: c, transparency: 100 } });
    txt(s, n, x + cw / 2 - 0.24, cy - 0.235, 0.48, 0.47, { size: 16, bold: true, color: A.white, align: "center", valign: "middle", face: T.display });
    txt(s, t, x + 0.12, 3.78, cw - 0.24, 0.5, { size: 12.5, bold: true, color: A.navy, align: "center", face: T.display });
    txt(s, d, x + 0.12, 4.3, cw - 0.24, 0.6, { size: 10, color: A.slate, align: "center" });
    x += cw + gap;
  });
  band(s, 0.78, 5.74, 11.72, 0.62, "Cada etapa deja un producto que alimenta la siguiente.");
  footer(s, pg());
}

// =================== SLIDES 15-17 · Talleres ===================
// Template: la infografía-resumen del taller es protagonista (derecha),
// con título-frase + mini stepper del recorrido + tarjeta de producto (izquierda).
function taller(num, phrase, lead, accent, soft, img, items, llevan) {
  const s = pptx.addSlide(); bg(s, A.paper); rail(s, accent); lockup(s);
  // encabezado: eyebrow + frase ancla
  bars(s, 0.74, 0.5, 1.0, accent);
  txt(s, ("Taller " + num).toUpperCase(), 1.42, 0.5, 5.6, 0.18, { size: 9, bold: true, color: accent, charSpace: 1.0 });
  s.addText(phrase, { x: 1.42, y: 0.78, w: 5.65, h: 1.15, fontFace: T.display, fontSize: 21, bold: true, color: A.navy, margin: 0, fit: "shrink", valign: "top" });
  txt(s, lead, 0.95, 2.0, 5.85, 0.5, { size: 12, color: A.slate });
  // qué hacen, como apoyo a la infografía
  txt(s, "EN EL TALLER", 0.97, 2.62, 5.5, 0.2, { size: 9, bold: true, color: accent, charSpace: 0.9 });
  bullets(s, items, 0.99, 2.96, 5.85, { accent, gap: 0.46, size: 11.5, itemH: 0.42 });
  // tarjeta de producto
  panel(s, 0.95, 4.5, 5.85, 1.7, { fill: soft, line: accent, pt: 1.2, radius: 0.09, shadow: true });
  badge(s, 1.2, 4.76, 0.58, accent, "★", { size: 16, dy: -0.02 });
  txt(s, "El equipo se lleva", 1.95, 4.8, 4.7, 0.4, { size: 13, bold: true, color: accent, face: T.display, valign: "middle" });
  txt(s, llevan, 1.2, 5.46, 5.45, 0.66, { size: 13, color: A.ink, valign: "top" });
  // infografía-resumen (protagonista, derecha)
  framed(s, img, 7.5, 1.7, 5.05, 5.34, { radius: 0.04 });
  footer(s, pg());
}
const s15 = () => taller("1",
  "“La basura no aparece de la nada.”",
  "Primero observar el problema de los residuos; después, proponer una solución.",
  A.green, A.softGreen, IMG.t1,
  ["Reconocen los residuos y hábitos de su entorno.", "Distinguen síntoma, causa y consecuencia.", "Construyen un mapa de problema en equipo."],
  "Una frase de problema ambiental concreto y real de su propio entorno.");
const s16 = () => taller("2",
  "“Reciclable no es lo mismo que reciclado.”",
  "El residuo es un material con propiedades que se pueden recuperar.",
  A.gold, A.softGold, IMG.t2,
  ["Reconocen las familias de materiales.", "Aplican la regla: limpio, seco y separado.", "Conectan el material con el problema que definieron."],
  "Una ficha del material, conectada con el problema que definieron.");
const s17 = () => taller("3",
  "“La tecnología tiene sentido cuando responde a un problema real.”",
  "Sensar, avisar y visualizar, aplicado al problema de cada equipo.",
  A.navy, A.softBlue, IMG.t3,
  ["Conocen sensores, Arduino y la protoboard.", "Ven GeoGreen como caso: sensar, avisar, visualizar.", "Diseñan una idea tecnológica para su problema."],
  "Una idea tecnológica inicial para resolver el problema de su equipo.");

// =================== SLIDE 18b · El wow técnico (hardware real) ===================
function s17b() {
  const s = pptx.addSlide(); bg(s, A.navyDeep); rail(s, A.red); lockup(s, true);
  bars(s, 0.74, 0.5, 1.0, A.red);
  txt(s, "LO TANGIBLE", 1.42, 0.5, 6, 0.18, { size: 9, bold: true, color: A.gold, charSpace: 1.1 });
  s.addText("Tecnología real, en sus manos", { x: 1.42, y: 0.78, w: 9.5, h: 0.5, fontFace: T.display, fontSize: 24, bold: true, color: A.white, margin: 0 });
  txt(s, "No es una maqueta de cartón: es el mismo equipo con el que se prototipa de verdad.", 1.42, 1.34, 9.5, 0.3, { size: 12, color: "DCE6F2" });
  // R4 hero (izquierda)
  panel(s, 0.78, 1.98, 6.3, 2.46, { fill: A.white, line: A.white, radius: 0.06, shadow: true });
  imgC(s, IMG.r4, 1.0, 2.14, 5.86, 2.14);
  txt(s, "Arduino UNO R4 WiFi · 5V · WiFi · matriz LED 12×8", 0.78, 4.5, 6.3, 0.2, { size: 10, color: "9FB4CC", align: "center" });
  // sensores (chips, izquierda-abajo)
  const sens = [IMG.s_hc, IMG.s_mpu, IMG.s_rgb, IMG.s_buz];
  const sw = 1.42, sgap = 0.17; let sx = 0.875;
  sens.forEach((p) => { panel(s, sx, 4.9, sw, sw, { fill: A.white, line: A.white, radius: 0.08 }); imgC(s, p, sx + 0.1, 5.0, sw - 0.2, sw - 0.2); sx += sw + sgap; });
  txt(s, "Sensores del kit: medir nivel, movimiento, luz y sonido", 0.78, 6.42, 6.3, 0.2, { size: 10, color: "9FB4CC", align: "center" });
  // protoboard (derecha, la infografía)
  panel(s, 7.4, 1.98, 5.15, 4.78, { fill: A.white, line: A.white, radius: 0.05, shadow: true });
  imgC(s, IMG.pb2, 7.6, 2.14, 4.75, 4.46);
  footer(s, pg(), true);
}

// =================== SLIDE 18 · Productos esperados ===================
function s18() {
  const s = pptx.addSlide(); bg(s, A.white); rail(s, A.navy); lockup(s);
  header(s, "Resultados", "Lo que producen los estudiantes",
    "Cada taller deja un producto que se acumula hacia el desafío final.");
  const cards = [
    ["1", "Taller 1", "Mapa de problema", "Una frase de problema ambiental real, situado en su entorno.", A.green],
    ["2", "Taller 2", "Ficha de material", "Qué material está en juego y bajo qué condiciones se recupera.", A.gold],
    ["3", "Taller 3", "Idea tecnológica", "Una propuesta inicial que mide, avisa o visualiza.", A.navy],
  ];
  const cw = 3.72, gap = 0.28; let x = 0.78;
  cards.forEach(([n, k, t, d, c], i) => {
    panel(s, x, 2.2, cw, 3.12, { fill: A.white, line: A.border, shadow: true });
    rect(s, x, 2.2, cw, 0.1, c);
    badge(s, x + 0.28, 2.52, 0.66, c, n, { size: 21 });
    txt(s, k.toUpperCase(), x + 1.12, 2.58, cw - 1.2, 0.22, { size: 9.5, bold: true, color: c, charSpace: 0.7 });
    txt(s, t, x + 1.12, 2.82, cw - 1.2, 0.42, { size: 15, bold: true, color: A.navy, face: T.display });
    line(s, x + 0.28, 3.46, cw - 0.56, A.line2, 1);
    txt(s, d, x + 0.3, 3.64, cw - 0.6, 1.5, { size: 11.5, color: A.slate });
    if (i < 2) s.addShape(SH.chevron, { x: x + cw + 0.0, y: 3.52, w: 0.32, h: 0.4, fill: { color: A.guide }, line: { color: A.guide, transparency: 100 } });
    x += cw + gap;
  });
  band(s, 0.78, 5.62, 11.72, 0.66, "Tres piezas que, juntas, sostienen la propuesta del pitch final.");
  footer(s, pg());
}

// =================== SLIDE 19 · Mentorías ===================
function s19() {
  const s = pptx.addSlide(); bg(s, A.white); rail(s, A.red); lockup(s);
  header(s, "Acompañamiento", "Mentorías: del producto a la propuesta",
    "Entre los talleres y el desafío, cada equipo madura su idea con apoyo cercano.");
  const steps = [
    ["Validar", "El problema y a quién afecta dentro de su entorno.", A.red],
    ["Definir", "La solución y los componentes que necesita.", A.gold],
    ["Construir", "Maqueta, simulación o prototipo funcional.", A.navy],
    ["Preparar", "El guion y el material del pitch final.", A.green],
  ];
  const cw = 2.74, gap = 0.32; let x = 0.78;
  const cy = 2.92; // centro de los badges
  s.addShape(SH.line, { x: 0.78 + cw / 2, y: cy, w: 3 * (cw + gap), h: 0, line: { color: A.line2, pt: 2.2 } });
  steps.forEach(([t, d, c], i) => {
    // badge ring sobre la línea
    s.addShape(SH.ellipse, { x: x + cw / 2 - 0.42, y: cy - 0.42, w: 0.84, h: 0.84, fill: { color: A.white }, line: { color: c, pt: 2.6 } });
    badge(s, x + cw / 2 - 0.28, cy - 0.28, 0.56, c, i + 1, { size: 19 });
    // tarjeta debajo, con aire
    panel(s, x, 3.74, cw, 2.16, { fill: A.white, line: A.border, shadow: true });
    rect(s, x, 3.74, cw, 0.09, c);
    txt(s, t, x + 0.18, 4.04, cw - 0.36, 0.4, { size: 15.5, bold: true, color: A.navy, align: "center", face: T.display });
    txt(s, d, x + 0.24, 4.58, cw - 0.48, 1.1, { size: 11, color: A.slate, align: "center" });
    x += cw + gap;
  });
  band(s, 0.78, 6.24, 11.72, 0.62, "El equipo llega al desafío con una propuesta sólida y presentable.", { fill: A.navy });
  footer(s, pg());
}

// =================== SLIDE 20 · Evento final / pitch ===================
function s20() {
  const s = pptx.addSlide(); bg(s, A.white); rail(s, A.red); lockup(s);
  header(s, "El cierre", "Un desafío final con pitch escolar",
    "Los equipos presentan su propuesta ante la comunidad: el broche del programa.");
  // hero izquierda
  panel(s, 0.78, 2.1, 5.0, 4.0, { fill: A.navyDeep, line: A.navyDeep, shadow: true });
  bars(s, 1.08, 2.46, 0.9, A.red);
  txt(s, "EL DESAFÍO FINAL", 1.08, 3.12, 4.3, 0.28, { size: 11, bold: true, color: "DCE6F2", charSpace: 0.9 });
  s.addText("Cada equipo presenta su solución", { x: 1.06, y: 3.46, w: 4.55, h: 1.3, fontFace: T.display, fontSize: 23, bold: true, color: A.white, margin: 0, fit: "shrink" });
  txt(s, "El broche del recorrido: pasar de la idea a una propuesta presentada en público.", 1.08, 5.0, 4.4, 0.9, { size: 12, color: "DCE6F2" });
  // 3 mini-tarjetas derecha
  const items = [
    ["Presentan", "Cada equipo expone la solución al problema que eligió.", A.green],
    ["Reconocen", "Jurado y reconocimientos al trabajo de los equipos.", A.gold],
    ["Comparten", "Una muestra abierta a la comunidad educativa.", A.red],
  ];
  let yy = 2.1; const ch = 1.24, cgap = 0.14;
  items.forEach(([t, d, c]) => {
    panel(s, 6.05, yy, 6.5, ch, { fill: A.white, line: A.border, shadow: true });
    rect(s, 6.05, yy, 0.13, ch, c);
    badge(s, 6.38, yy + ch / 2 - 0.28, 0.56, c, "★", { size: 17, dy: -0.02 });
    txt(s, t, 7.2, yy + 0.2, 5.1, 0.34, { size: 15.5, bold: true, color: A.navy, face: T.display });
    txt(s, d, 7.2, yy + 0.64, 5.1, 0.5, { size: 11, color: A.slate });
    yy += ch + cgap;
  });
  footer(s, pg());
}

// =================== SLIDE 21 · La alianza ===================
function s21() {
  const s = pptx.addSlide(); bg(s, A.white); rail(s, A.navy); lockup(s);
  header(s, "Vinculación con el Medio", "Damos juntos el siguiente paso",
    "Cada parte aporta lo suyo; el valor está en seguir haciéndolo en conjunto.");
  panel(s, 0.78, 2.05, 5.72, 3.5, { fill: A.white, line: A.navy, pt: 1.2, shadow: true });
  rect(s, 0.78, 2.05, 5.72, 0.1, A.navy);
  pillTitle(s, "DESDE AIEP", 1.04, 2.36, 2.5, A.navy);
  bullets(s, ["Equipo docente y estudiantes de tres carreras.", "Los talleres y las mentorías del programa.", "GeoGreen como caso de aprendizaje real."], 1.04, 3.04, 5.2, { accent: A.navy, gap: 0.66, size: 12, itemH: 0.56 });
  panel(s, 6.82, 2.05, 5.72, 3.5, { fill: A.white, line: A.red, pt: 1.2, shadow: true });
  rect(s, 6.82, 2.05, 5.72, 0.1, A.red);
  pillTitle(s, "DESDE EL LICEO", 7.08, 2.36, 2.9, A.red);
  bullets(s, ["Sus estudiantes y su comunidad educativa.", "El compromiso y la mirada de su equipo docente.", "Un problema real de su entorno para trabajar."], 7.08, 3.04, 5.2, { accent: A.red, gap: 0.66, size: 12, itemH: 0.56 });
  band(s, 0.78, 5.85, 11.74, 0.6, "Una colaboración con sentido territorial, dentro de la Vinculación con el Medio de AIEP.");
  footer(s, pg());
}

// =================== SLIDE 22 · Cierre ===================
function s22() {
  const s = pptx.addSlide(); pg(); bg(s, A.navyDeep); lockup(s, true);
  bars(s, 0.86, 0.56, 1.1, A.red);
  s.addText("Queremos mirar, entender y mejorar el reciclaje de Osorno, junto a su comunidad educativa.", {
    x: 1.1, y: 2.5, w: 9.4, h: 2.0, fontFace: T.display, fontSize: 30, bold: true, color: A.white, margin: 0, fit: "shrink", valign: "top",
  });
  txt(s, "Los invitamos a ser parte de GeoGreen Escolar.", 1.12, 4.7, 9.0, 0.5, { size: 18, color: "DCE6F2" });
  rect(s, 0, 7.04, W, 0.08, A.red);
  txt(s, "GeoGreen Escolar Osorno · AIEP", 0.9, 7.2, 6.0, 0.16, { size: 8.4, color: "DCE6F2" });
}

[s06, s07, s08, s09, s09b, s10, s10b, s11, s12, s13, s14, s15, s16, s17, s17b, s18, s19, s20, s21, s22].forEach((fn) => fn());
pptx.writeFile({ fileName: path.join(HERE, "build", "parte-geogreen.pptx") }).then((f) => console.log("OK:", f, "·", PAGE - 5, "slides"));
