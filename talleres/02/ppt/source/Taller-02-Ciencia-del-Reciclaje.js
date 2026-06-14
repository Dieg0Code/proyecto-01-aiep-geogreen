const path = require("path");
const PptxGenJS = require("../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../tools/slides-system");
const { imageSizingCrop, imageSizingContain } = require("../../../../tools/slides-system/vendor/pptxgenjs_helpers/image");

const { theme } = slidesSystem;
const { applyAiepTheme, TOKENS: C, TYPOGRAPHY } = theme;
const { validateSlide } = slidesSystem.utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

applyAiepTheme(pptx, {
  author: "GeoGreen Escolar Osorno",
  company: "AIEP Osorno",
  subject: "Taller 2 - Ciencia del reciclaje",
  title: "Taller 2 - Ciencia del reciclaje",
});

const SH = pptx.ShapeType;
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Taller-02-Ciencia-del-Reciclaje.pptx");
const imgDir = path.resolve(__dirname, "assets/images");

const IMG = {
  pet: path.join(imgDir, "pet-bottles-bales.jpg"),
  cans: path.join(imgDir, "aluminium-cans-compressed.jpg"),
  puntos: path.join(imgDir, "puntos-limpios-colores-cl.jpg"),
  categorias: path.join(imgDir, "contenedor-categorias-cl.jpg"),
  vidrioIgloos: path.join(imgDir, "vidrio-igloos-coaniquem-cl.jpg"),
  recila: path.join(imgDir, "reciclaje-trabajo-recila-cl.jpg"),
  vitacura: path.join(imgDir, "mercado-reciclaje-vitacura-cl.jpg"),
  board: path.join(imgDir, "arduino-uno-r4-geogreen.png"),
};

// Variacion de paleta para el Taller 2: misma paleta AIEP (navy + gold + rojo +
// neutros), pero con el GOLD como acento firma del taller (en vez del rojo del
// Taller 1) y el neutro verdoso institucional como superficie de los materiales.
const A = {
  navy: C.navy,
  navyDeep: "061E3A",
  paper: "F5F2EC",
  gold: C.gold,
  goldSoft: "F3E7C3",
  neutral: "EEF3EF",
  blueSoft: "E9EEF4",
  redSoft: "F8E7E8",
  red: C.red,
  ink: "182B3A",
};

function imageCover(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({
    path: imagePath,
    ...imageSizingCrop(imagePath, x, y, w, h, opts.cx, opts.cy, opts.cw, opts.ch),
  });
}

function imageContain(slide, imagePath, x, y, w, h) {
  slide.addImage({ path: imagePath, ...imageSizingContain(imagePath, x, y, w, h) });
}

function bg(slide, color = A.paper) {
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

// Geometria AIEP: tres barras. En el Taller 2 el acento por defecto es el gold.
function bars(slide, x, y, scale = 1, color = A.gold) {
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
    fontSize: 9,
    bold: true,
    color: C.navy,
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
      fontSize: 11.2,
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
  slide.addText("GeoGreen Escolar Osorno · Taller 2", {
    x: 0.74,
    y: 7.14,
    w: 4.7,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.2,
    color: dark ? "DCE6F2" : C.slate,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 12.16,
    y: 7.08,
    w: 0.42,
    h: 0.24,
    rectRadius: 0.05,
    fill: { color: A.gold },
    line: { color: A.gold, transparency: 100 },
  });
  slide.addText(String(number).padStart(2, "0"), {
    x: 12.16,
    y: 7.145,
    w: 0.42,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.6,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
}

function thesis(slide, text, dark = false) {
  rect(slide, 0.86, 6.36, 0.07, 0.42, A.gold);
  panel(slide, 0.86, 6.36, 11.18, 0.42, {
    fill: dark ? "123C69" : C.navy,
    line: dark ? "123C69" : C.navy,
    shadow: false,
  });
  rect(slide, 0.86, 6.36, 0.08, 0.42, A.gold);
  slide.addText(text, {
    x: 1.12,
    y: 6.515,
    w: 10.66,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.8,
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

function blockIntro(slide, { number, minutes, title, subtitle, image, crop }) {
  // Foto a sangre completa con velo navy: más fuerte a la izquierda (texto),
  // más liviano a la derecha para que la imagen se lea y ocupe todo el ancho.
  imageCover(slide, image, 0, 0, SLIDE_W, SLIDE_H, crop);
  rect(slide, 0, 0, SLIDE_W, SLIDE_H, A.navyDeep, { transparency: 40 });
  rect(slide, 0, 0, 7.8, SLIDE_H, A.navyDeep, { transparency: 20 });
  rect(slide, 7.8, 0, 0.045, SLIDE_H, A.gold, { transparency: 18 });
  const tx = 0.88;
  slide.addText(number, {
    x: tx,
    y: 0.74,
    w: 0.9,
    h: 0.46,
    fontFace: TYPOGRAPHY.display,
    fontSize: 32,
    bold: true,
    color: A.gold,
    margin: 0,
  });
  slide.addText(`BLOQUE ${number} · ${minutes}`, {
    x: tx + 1.06,
    y: 0.96,
    w: 4.4,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    color: A.gold,
    charSpace: 1.2,
    margin: 0,
  });
  bars(slide, tx, 1.62, 1.14);
  slide.addText(title, {
    x: tx,
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
  slide.addText(subtitle, {
    x: tx + 0.04,
    y: 4.18,
    w: 5.86,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.8,
    color: "E9EEF4",
    margin: 0,
  });
}

// ----------------------------------------------------------------------------
// 01 · Portada
// ----------------------------------------------------------------------------
function slide01Cover() {
  const slide = pptx.addSlide();
  imageCover(slide, IMG.pet, 7.3, 0, 6.03, SLIDE_H, { cx: 0.32, cy: 0.1, cw: 0.55, ch: 0.86 });
  rect(slide, 7.3, 0, 6.03, SLIDE_H, A.navyDeep, { transparency: 70 });
  rect(slide, 0, 0, 7.3, SLIDE_H, A.navyDeep);
  rect(slide, 7.27, 0, 0.05, SLIDE_H, A.gold);
  bars(slide, 0.86, 0.78, 1.36);
  slide.addText("GEOGREEN ESCOLAR OSORNO", {
    x: 0.86,
    y: 1.58,
    w: 5.6,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9,
    bold: true,
    color: A.gold,
    charSpace: 1.35,
    margin: 0,
  });
  slide.addText("Taller 2\nCiencia del reciclaje", {
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
  slide.addText("Aprendemos de qué está hecho lo que botamos y por qué el material decide su destino.", {
    x: 0.9,
    y: 3.78,
    w: 6.05,
    h: 0.5,
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

// ----------------------------------------------------------------------------
// 02 · De qué se trata
// ----------------------------------------------------------------------------
function slide02Purpose() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "De qué se trata", "De qué está hecha la basura", "Pasamos de ver un objeto que se bota a entender el material del que está hecho.");
  panel(slide, 0.88, 2.02, 5.58, 2.38, { fill: C.white, shadow: true });
  rect(slide, 0.88, 2.02, 0.09, 2.38, A.gold);
  slide.addText("Un residuo es un material", {
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
  slide.addText("La botella que botas no es solo “una botella”: es plástico PET, y ese material decide si puede recuperarse o no.", {
    x: 1.2,
    y: 3.14,
    w: 4.84,
    h: 0.62,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.2,
    color: A.ink,
    margin: 0,
    breakLine: false,
  });
  imageCover(slide, IMG.cans, 7.12, 1.42, 4.62, 3.36);
  rect(slide, 7.12, 1.42, 4.62, 3.36, C.navy, { transparency: 86, line: C.border, lineTransparency: 0, pt: 0.75 });
  label(slide, "observar el material", 7.30, 5.14, 1.43, { fill: A.neutral, color: C.navy, line: A.neutral, fontSize: 6.9 });
  label(slide, "entender condiciones", 8.81, 5.14, 1.43, { fill: A.goldSoft, color: C.navy, line: A.goldSoft, fontSize: 6.9 });
  label(slide, "clasificar con criterio", 10.32, 5.14, 1.43, { fill: C.white, color: C.navy, fontSize: 6.9 });
  thesis(slide, "No se puede decidir si algo se recicla sin saber de qué está hecho.");
  footer(slide, 2);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 03 · Mapa de la clase
// ----------------------------------------------------------------------------
function slide03Map() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Mapa de la clase", "El recorrido de este taller", "Al cierre, cada equipo tendrá una ficha de material conectada con su problema.");
  const steps = [
    ["01", "Materiales", "de qué está hecho"],
    ["02", "Reciclar bien", "limpio, seco, separado"],
    ["03", "Ficha de material", "trabajo en equipos"],
    ["04", "Material y problema", "conectar y proyectar"],
  ];
  steps.forEach(([n, title, body], i) => {
    const x = 0.92 + i * 3.05;
    const active = i === 0;
    panel(slide, x, 2.48, 2.54, 2.28, {
      fill: active ? A.goldSoft : C.white,
      line: active ? A.gold : C.border,
      shadow: true,
    });
    slide.addText(n, {
      x: x + 0.22,
      y: 2.78,
      w: 0.42,
      h: 0.14,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10,
      bold: true,
      color: active ? "9A7B22" : C.navy,
      margin: 0,
    });
    slide.addText(title, {
      x: x + 0.22,
      y: 3.18,
      w: 2.08,
      h: 0.46,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16.8,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(body, {
      x: x + 0.24,
      y: 3.96,
      w: 2.04,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
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
        fill: { color: A.gold, transparency: 12 },
        line: { color: A.gold, transparency: 100 },
      });
    }
  });
  thesis(slide, "Primero el material, después la solución: la tecnología llega en el Taller 3.");
  footer(slide, 3);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 04 · Intro Bloque 1
// ----------------------------------------------------------------------------
function slide04Block1Intro() {
  const slide = pptx.addSlide();
  blockIntro(slide, {
    number: "01",
    minutes: "20 MIN",
    title: "Nada es\nsolo basura",
    subtitle: "Miramos cada residuo como un material con propiedades, no como un objeto cualquiera.",
    image: IMG.puntos,
    crop: undefined,
  });
  thesis(slide, "Dos objetos distintos pueden ser el mismo material; dos parecidos pueden ser materiales muy distintos.", true);
  footer(slide, 4, true);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 05 · Objeto vs material
// ----------------------------------------------------------------------------
function slide05ObjectVsMaterial() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Distinción clave", "El objeto no es el material", "Lo que usamos es el objeto; lo que decide su reciclaje es el material.");
  const pairs = [
    ["Botella", "PET (plástico)", A.goldSoft, "9A7B22"],
    ["Lata", "Aluminio (metal)", A.neutral, C.navy],
    ["Vaso desechable", "¿papel o multicapa?", C.white, C.navy],
  ];
  pairs.forEach(([obj, mat, fill, accent], i) => {
    const x = 0.92 + i * 3.62;
    panel(slide, x, 2.3, 3.0, 1.62, { fill, line: fill === C.white ? C.border : fill, shadow: true });
    slide.addText("OBJETO", {
      x: x + 0.22,
      y: 2.56,
      w: 1.76,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.2,
      bold: true,
      color: C.slate,
      charSpace: 0.8,
      margin: 0,
    });
    slide.addText(obj, {
      x: x + 0.22,
      y: 2.84,
      w: 2.56,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16.5,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addShape(SH.line, { x: x + 0.22, y: 3.34, w: 2.56, h: 0, line: { color: C.border, pt: 0.75 } });
    slide.addText("MATERIAL", {
      x: x + 0.22,
      y: 3.44,
      w: 1.76,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.2,
      bold: true,
      color: accent,
      charSpace: 0.8,
      margin: 0,
    });
    slide.addText(mat, {
      x: x + 0.22,
      y: 3.66,
      w: 2.6,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.4,
      bold: true,
      color: A.ink,
      margin: 0,
    });
  });
  panel(slide, 0.92, 4.34, 5.5, 1.2, { fill: A.neutral, line: A.neutral, shadow: false });
  slide.addText("Mismo material, objetos distintos", {
    x: 1.16,
    y: 4.56,
    w: 5.0,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Una botella de bebida y una bandeja de fruta pueden ser ambas PET.", {
    x: 1.16,
    y: 4.94,
    w: 5.04,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11,
    color: A.ink,
    margin: 0,
    breakLine: false,
  });
  panel(slide, 6.62, 4.34, 5.1, 1.2, { fill: A.goldSoft, line: A.goldSoft, shadow: false });
  slide.addText("Mismo objeto, materiales distintos", {
    x: 6.86,
    y: 4.56,
    w: 4.6,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Un vaso puede ser plástico reciclable, plástico no reciclable o cartón con película interior.", {
    x: 6.86,
    y: 4.94,
    w: 4.64,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11,
    color: A.ink,
    margin: 0,
    breakLine: false,
  });
  thesis(slide, "Reciclar bien empieza por reconocer el material, no por mirar el objeto.");
  footer(slide, 5);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 06 · Las seis familias de materiales
// ----------------------------------------------------------------------------
function slide06Families() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Ordenar el panorama", "Seis familias de materiales", "No hace falta memorizar química: basta reconocer la familia y una propiedad clave.");
  const fams = [
    ["Plásticos", "varios tipos; no todos se reciclan igual", A.neutral, C.navy],
    ["Papel y cartón", "se arruinan si se mojan o ensucian", C.white, C.navy],
    ["Vidrio", "se recicla muchas veces sin perder calidad", A.blueSoft, C.navy],
    ["Metales", "muy valiosos; el aluminio se recupera fácil", A.goldSoft, "9A7B22"],
    ["Orgánico", "no se recicla: se composta; mezclado contamina", A.neutral, C.navy],
    ["Multicapa", "materiales pegados; difícil de separar", C.white, C.navy],
  ];
  fams.forEach(([title, body, fill, accent], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.92 + col * 3.78;
    const y = 2.12 + row * 1.94;
    panel(slide, x, y, 3.3, 1.66, { fill, line: fill === C.white ? C.border : fill, shadow: true });
    rect(slide, x, y, 0.07, 1.66, accent === "9A7B22" ? A.gold : C.navy);
    slide.addText(title, {
      x: x + 0.26,
      y: y + 0.28,
      w: 2.8,
      h: 0.26,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16.5,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(body, {
      x: x + 0.27,
      y: y + 0.78,
      w: 2.82,
      h: 0.64,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.4,
      bold: true,
      color: C.slate,
      margin: 0,
      breakLine: false,
    });
  });
  thesis(slide, "Cada familia corre una suerte distinta, aunque hayan terminado en el mismo basurero.");
  footer(slide, 6);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 07 · El truco está en lo que no se ve
// ----------------------------------------------------------------------------
function slide07Deceiving() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Objetos que engañan", "El truco está en lo que no se ve", "Muchos residuos parecen un material y son otro: por eso reciclar no es solo sentido común.");
  const cases = [
    ["Vaso de café", "parece papel", "tiene película de plástico por dentro"],
    ["Caja de leche", "parece cartón", "es cartón + plástico + aluminio pegados"],
    ["Envoltorio de snack", "parece plástico", "lleva una capa metálica escondida"],
    ["Hoja con grasa", "parece reciclable", "manchada con comida ya no se recicla"],
  ];
  cases.forEach(([title, looks, real], i) => {
    const x = 0.92 + (i % 2) * 5.48;
    const y = 2.12 + Math.floor(i / 2) * 1.46;
    panel(slide, x, y, 4.82, 1.22, { fill: C.white, line: C.border, shadow: true });
    rect(slide, x, y, 0.07, 1.22, A.gold);
    slide.addText(title, {
      x: x + 0.26,
      y: y + 0.22,
      w: 4.3,
      h: 0.2,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(looks, {
      x: x + 0.26,
      y: y + 0.6,
      w: 1.7,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.6,
      italic: true,
      color: C.slate,
      margin: 0,
    });
    slide.addShape(SH.line, { x: x + 1.98, y: y + 0.5, w: 0, h: 0.5, line: { color: A.gold, pt: 1.0, dashType: "dash" } });
    slide.addText(real, {
      x: x + 2.14,
      y: y + 0.56,
      w: 2.46,
      h: 0.5,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10,
      bold: true,
      color: A.ink,
      margin: 0,
      breakLine: false,
    });
  });
  thesis(slide, "No se puede decidir mirando por encima: hay que saber de qué está hecho.");
  footer(slide, 7);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 08 · Cierre Bloque 1
// ----------------------------------------------------------------------------
function slide08Block1Close() {
  const slide = pptx.addSlide();
  bg(slide, C.navy);
  imageCover(slide, IMG.categorias, 0.92, 1.08, 3.82, 4.88);
  rect(slide, 0.92, 1.08, 3.82, 4.88, A.navyDeep, { transparency: 64, line: "FFFFFF", lineTransparency: 72, pt: 0.7 });
  bars(slide, 5.42, 0.74, 1.12);
  slide.addText("Cierre del Bloque 1", {
    x: 5.42,
    y: 1.42,
    w: 6.0,
    h: 0.44,
    fontFace: TYPOGRAPHY.display,
    fontSize: 26,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Una idea y dos preguntas quedan instaladas para el siguiente bloque.", {
    x: 5.46,
    y: 2.04,
    w: 6.0,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.2,
    color: "DCE6F2",
    margin: 0,
  });
  const items = [
    "Un residuo es un material con propiedades, no un objeto cualquiera.",
    "¿Qué familia de material aparece más en el colegio?",
    "¿Qué objeto parece un material y en realidad es otro?",
  ];
  items.forEach((q, i) => {
    panel(slide, 5.46, 3.0 + i * 0.82, 6.36, 0.58, { fill: i === 0 ? A.gold : "123C69", line: i === 0 ? A.gold : "123C69", shadow: false });
    slide.addText(i === 0 ? "★" : String(i).padStart(2, "0"), {
      x: 5.68,
      y: 3.2 + i * 0.82,
      w: 0.34,
      h: 0.08,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.4,
      bold: true,
      color: i === 0 ? C.navy : C.white,
      margin: 0,
    });
    slide.addText(q, {
      x: 6.2,
      y: 3.16 + i * 0.82,
      w: 5.48,
      h: 0.26,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      bold: true,
      color: i === 0 ? C.navy : C.white,
      margin: 0,
      breakLine: false,
    });
  });
  thesis(slide, "Ya sabemos de qué está hecha la basura; ahora veamos por qué un material se recicla o no.", true);
  footer(slide, 8, true);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 09 · Intro Bloque 2
// ----------------------------------------------------------------------------
function slide09Block2Intro() {
  const slide = pptx.addSlide();
  blockIntro(slide, {
    number: "02",
    minutes: "20 MIN",
    title: "Reciclable no es\nlo mismo que reciclado",
    subtitle: "Un material reciclable puede terminar como basura si se bota mal.",
    image: IMG.vidrioIgloos,
    crop: undefined,
  });
  thesis(slide, "Echar algo al contenedor es solo el primer paso, no la garantía de que se recicle.", true);
  footer(slide, 9, true);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 10 · Reciclable vs reciclado
// ----------------------------------------------------------------------------
function slide10ReciclableVsReciclado() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "La idea incómoda", "Reciclable no es reciclado", "Una cosa es lo que el material podría ser; otra es lo que de verdad ocurre con él.");
  panel(slide, 0.92, 2.06, 5.22, 1.74, { fill: A.neutral, line: A.neutral, shadow: true });
  slide.addText("RECICLABLE", {
    x: 1.18, y: 2.32, w: 3.0, h: 0.12, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: C.navy, charSpace: 1.0, margin: 0,
  });
  slide.addText("Lo que el material podría llegar a ser.", {
    x: 1.18, y: 2.66, w: 4.7, h: 0.5, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.navy, margin: 0, breakLine: false,
  });
  slide.addText("Una botella PET es reciclable… en teoría.", {
    x: 1.18, y: 3.34, w: 4.74, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: A.ink, margin: 0,
  });
  panel(slide, 6.5, 2.06, 5.22, 1.74, { fill: C.navy, line: C.navy, shadow: true });
  slide.addText("RECICLADO", {
    x: 6.76, y: 2.32, w: 3.0, h: 0.12, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: A.gold, charSpace: 1.0, margin: 0,
  });
  slide.addText("Lo que de verdad ocurrió con él.", {
    x: 6.76, y: 2.66, w: 4.7, h: 0.5, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.white, margin: 0, breakLine: false,
  });
  slide.addText("Mojada y mezclada con comida, termina como basura.", {
    x: 6.76, y: 3.34, w: 4.74, h: 0.4, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: "DCE6F2", margin: 0, breakLine: false,
  });
  slide.addText("Entre una cosa y la otra hay una cadena, y depende de las personas:", {
    x: 0.92, y: 4.16, w: 10.8, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.slate, margin: 0,
  });
  const chain = ["separar", "limpio y seco", "entregar bien", "retirar", "procesar", "nuevo material"];
  chain.forEach((step, i) => {
    const x = 0.92 + i * 1.84;
    const last = i === chain.length - 1;
    panel(slide, x, 4.56, 1.6, 0.66, { fill: last ? A.goldSoft : C.white, line: last ? A.gold : C.border, shadow: false });
    slide.addText(step, {
      x: x + 0.1, y: 4.74, w: 1.4, h: 0.32, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: C.navy, align: "center", margin: 0, breakLine: false,
    });
    if (!last) {
      slide.addShape(SH.chevron, { x: x + 1.62, y: 4.74, w: 0.2, h: 0.3, fill: { color: A.gold, transparency: 16 }, line: { color: A.gold, transparency: 100 } });
    }
  });
  thesis(slide, "Si fallan los primeros eslabones —que dependen de nosotros— los demás no ocurren.");
  footer(slide, 10);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 11 · Limpio, seco y separado
// ----------------------------------------------------------------------------
function slide11CleanDrySeparated() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "La regla clave", "Limpio, seco y separado", "Tres condiciones deciden si un reciclable se convierte de verdad en reciclado.");
  // Fórmula-resumen como ancla del concepto.
  panel(slide, 0.92, 1.9, 10.8, 0.58, { fill: A.neutral, line: A.neutral, shadow: false });
  slide.addText([
    { text: "Limpio", options: { color: C.navy, bold: true } },
    { text: "    +    ", options: { color: "9A7B22", bold: true } },
    { text: "Seco", options: { color: C.navy, bold: true } },
    { text: "    +    ", options: { color: "9A7B22", bold: true } },
    { text: "Separado", options: { color: C.navy, bold: true } },
    { text: "    =    ", options: { color: "9A7B22", bold: true } },
    { text: "reciclado de verdad", options: { color: C.navy, bold: true } },
  ], { x: 1.1, y: 2.02, w: 10.44, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 16, align: "center", margin: 0 });

  const conds = [
    ["01", "Limpio", "Sin restos de comida que contaminen el material.", "un envase con restos, una caja con grasa"],
    ["02", "Seco", "La humedad arruina sobre todo el papel y el cartón.", "papel mojado, cartón húmedo"],
    ["03", "Separado", "Cada material por su lado para poder recuperarlo.", "botellas, comida y papel juntos"],
  ];
  conds.forEach(([n, title, why, breaks], i) => {
    const x = 0.92 + i * 3.62;
    const y = 2.72;
    panel(slide, x, y, 3.3, 2.88, { fill: C.white, line: C.border, shadow: true });
    rect(slide, x, y, 3.3, 0.84, C.navy);
    slide.addText(title, {
      x: x + 0.26, y: y + 0.27, w: 2.2, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: C.white, margin: 0,
    });
    slide.addText(n, {
      x: x + 2.42, y: y + 0.26, w: 0.66, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: A.gold, align: "right", margin: 0,
    });
    slide.addText("POR QUÉ IMPORTA", {
      x: x + 0.26, y: y + 1.06, w: 2.8, h: 0.12, fontFace: TYPOGRAPHY.body, fontSize: 8, bold: true, color: C.slate, charSpace: 0.8, margin: 0,
    });
    slide.addText(why, {
      x: x + 0.26, y: y + 1.3, w: 2.82, h: 0.64, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: A.ink, margin: 0, breakLine: false,
    });
    panel(slide, x + 0.24, y + 2.04, 2.82, 0.66, { fill: A.redSoft, line: A.redSoft, shadow: false });
    rect(slide, x + 0.24, y + 2.04, 0.06, 0.66, C.red);
    slide.addText([
      { text: "Lo rompe:  ", options: { color: "9A2C24", bold: true } },
      { text: breaks, options: { color: "9A2C24", bold: false } },
    ], {
      x: x + 0.42, y: y + 2.14, w: 2.52, h: 0.48, fontFace: TYPOGRAPHY.body, fontSize: 9.4, margin: 0, breakLine: false,
    });
  });
  thesis(slide, "Un reciclable sucio no es un reciclable con un detalle menor: muchas veces deja de serlo.");
  footer(slide, 11);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 12 · Los colores del reciclaje en Chile
// ----------------------------------------------------------------------------
function slide12ChileanColors() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Nuestra convención · Norma NCh 3322", "Los colores del reciclaje en Chile", "Cada color dice qué material va dentro. Reconocerlos es separar bien.");
  // Los swatches usan los colores reales de la norma (son contenido, no marca).
  const colors = [
    ["Azul", "Papel y cartón", "diarios, cajas, hojas", "1F6FB2", "FFFFFF"],
    ["Amarillo", "Plásticos", "botellas, envases, bolsas", "F2B500", "1E2A38"],
    ["Verde", "Vidrio", "botellas y frascos", "2E8B4F", "FFFFFF"],
    ["Gris", "Metales", "latas de bebida y conservas", "8A929B", "FFFFFF"],
    ["Café", "Orgánicos", "restos de comida y cáscaras", "7A5230", "FFFFFF"],
    ["Rojo", "Peligrosos", "pilas, baterías, aceites", "C0392B", "FFFFFF"],
  ];
  colors.forEach(([name, cat, ej, hex, txt], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.92 + col * 3.62;
    const y = 2.04 + row * 1.66;
    panel(slide, x, y, 3.3, 1.42, { fill: C.white, line: C.border, shadow: true });
    rect(slide, x, y, 3.3, 0.5, hex);
    slide.addText(name.toUpperCase(), {
      x: x + 0.22, y: y + 0.16, w: 2.9, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 14, bold: true, color: txt, margin: 0,
    });
    slide.addText(cat, {
      x: x + 0.22, y: y + 0.62, w: 2.9, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: C.navy, margin: 0,
    });
    slide.addText(ej, {
      x: x + 0.23, y: y + 1.0, w: 2.9, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 9.8, color: C.slate, margin: 0, breakLine: false,
    });
  });
  thesis(slide, "El gris oscuro o negro es para lo no reciclable: la basura común que ya no se recupera.");
  footer(slide, 12);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 13 · Cómo está estructurado en Chile
// ----------------------------------------------------------------------------
function slide13ChileanStructure() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Cómo se organiza acá", "El reciclaje en Chile tiene reglas", "No depende solo de buena voluntad: hay una ley y un sistema detrás.");
  panel(slide, 0.92, 2.0, 10.8, 0.92, { fill: C.navy, line: C.navy, shadow: true });
  slide.addText("Ley REP · 20.920 (2016)", {
    x: 1.2, y: 2.18, w: 4.2, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: A.gold, margin: 0,
  });
  slide.addText("Responsabilidad Extendida del Productor: quien produce un envase se hace cargo de su reciclaje. El que contamina, paga.", {
    x: 1.2, y: 2.52, w: 10.3, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: "DCE6F2", margin: 0, breakLine: false,
  });
  const flow = [
    ["Separar en origen", "en la casa o el colegio"],
    ["Punto limpio o retiro", "se junta el material"],
    ["Recicladores y gestores", "lo clasifican y procesan"],
    ["Valorización", "vuelve a ser materia prima"],
  ];
  flow.forEach(([t, b], i) => {
    const x = 0.92 + i * 2.74;
    const active = i === 0;
    panel(slide, x, 3.34, 2.42, 1.5, { fill: active ? A.goldSoft : C.white, line: active ? A.gold : C.border, shadow: true });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: x + 0.2, y: 3.56, w: 0.6, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 9.6, bold: true, color: active ? "9A7B22" : C.navy, margin: 0,
    });
    slide.addText(t, {
      x: x + 0.2, y: 3.86, w: 2.04, h: 0.44, fontFace: TYPOGRAPHY.display, fontSize: 13.5, bold: true, color: C.navy, margin: 0,
    });
    slide.addText(b, {
      x: x + 0.21, y: 4.46, w: 2.06, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: C.slate, margin: 0, breakLine: false,
    });
    if (i < 3) {
      slide.addShape(SH.chevron, { x: x + 2.46, y: 3.92, w: 0.24, h: 0.32, fill: { color: A.gold, transparency: 14 }, line: { color: A.gold, transparency: 100 } });
    }
  });
  panel(slide, 0.92, 5.12, 10.8, 0.86, { fill: A.neutral, line: A.neutral, shadow: false });
  slide.addText("ReSimple organiza el reciclaje de envases y embalajes; las y los recicladores de base son clave en toda la cadena.", {
    x: 1.2, y: 5.36, w: 10.3, h: 0.4, fontFace: TYPOGRAPHY.body, fontSize: 11, bold: true, color: C.navy, margin: 0, breakLine: false,
  });
  thesis(slide, "La separación en origen es la pieza que hace funcionar todo lo demás.");
  footer(slide, 13);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 14 · Contaminación cruzada
// ----------------------------------------------------------------------------
function slide14CrossContamination() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Cuidado", "Un sucio arruina a todo el grupo", "La contaminación no afecta solo a un objeto: puede echar a perder a varios.");
  const clean = ["papel limpio", "cartón seco", "botella vacía"];
  clean.forEach((t, i) => {
    const y = 2.2 + i * 0.78;
    panel(slide, 0.92, y, 3.5, 0.62, { fill: A.neutral, line: A.neutral, shadow: false });
    slide.addText(t, {
      x: 1.16, y: y + 0.2, w: 3.1, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.navy, margin: 0,
    });
  });
  panel(slide, 0.92, 4.62, 3.5, 0.62, { fill: A.redSoft, line: C.red, shadow: false });
  slide.addText("+ una caja con grasa", {
    x: 1.16, y: 4.82, w: 3.1, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: "9A2C24", margin: 0,
  });
  slide.addShape(SH.chevron, { x: 4.66, y: 3.46, w: 0.5, h: 0.5, fill: { color: A.gold }, line: { color: A.gold, transparency: 100 } });
  panel(slide, 5.5, 2.5, 6.22, 2.4, { fill: C.navy, line: C.navy, shadow: true });
  slide.addText("Resultado", {
    x: 5.8, y: 2.82, w: 3.0, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: A.gold, charSpace: 1.0, margin: 0,
  });
  slide.addText("Todo el lote se ensucia", {
    x: 5.8, y: 3.18, w: 5.6, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.white, margin: 0,
  });
  slide.addText("La grasa mancha el papel limpio que tenía al lado; el líquido moja el cartón. Lo que iba a reciclarse termina como basura común.", {
    x: 5.8, y: 3.84, w: 5.66, h: 0.9, fontFace: TYPOGRAPHY.body, fontSize: 12.5, color: "DCE6F2", margin: 0, breakLine: false,
  });
  thesis(slide, "Por eso el descuido de una persona puede echar a perder el esfuerzo de varias.");
  footer(slide, 14);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 15 · La decisión antes de botar
// ----------------------------------------------------------------------------
function slide15DecisionBeforeTossing() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "El momento que importa", "La decisión se toma antes de botar", "El mejor momento para reciclar no es en la planta: es en tus manos.");
  const acts = [
    ["01", "Vaciar y enjuagar", "un envase antes de botarlo"],
    ["02", "No mezclar", "lo húmedo con lo seco"],
    ["03", "Apartar el papel", "lejos de los restos de comida"],
    ["04", "Separar en origen", "donde se genera, no después"],
  ];
  acts.forEach(([n, t, b], i) => {
    const x = 0.92 + (i % 2) * 5.48;
    const y = 2.18 + Math.floor(i / 2) * 1.46;
    panel(slide, x, y, 4.82, 1.3, { fill: C.white, line: C.border, shadow: true });
    slide.addShape(SH.roundRect, {
      x: x + 0.26, y: y + 0.32, w: 0.86, h: 0.86, rectRadius: 0.1,
      fill: { color: C.navy }, line: { color: C.navy, transparency: 100 },
    });
    slide.addText(n, {
      x: x + 0.26, y: y + 0.56, w: 0.86, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 21, bold: true, color: A.gold, align: "center", margin: 0,
    });
    slide.addText(t, {
      x: x + 1.32, y: y + 0.34, w: 3.3, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: C.navy, margin: 0,
    });
    slide.addText(b, {
      x: x + 1.32, y: y + 0.82, w: 3.34, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: C.slate, margin: 0,
    });
  });
  panel(slide, 0.92, 5.36, 10.8, 0.62, { fill: A.goldSoft, line: A.goldSoft, shadow: false });
  rect(slide, 0.92, 5.36, 0.08, 0.62, A.gold);
  slide.addText([
    { text: "Conecta con el Taller 1:  ", options: { color: "9A7B22", bold: true } },
    { text: "reciclar bien es, en gran parte, un hábito de separación tomado a tiempo.", options: { color: C.navy, bold: true } },
  ], {
    x: 1.24, y: 5.55, w: 10.3, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.5, margin: 0,
  });
  thesis(slide, "El mejor momento para reciclar algo es justo antes de botarlo, no después.");
  footer(slide, 15);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 16 · Cierre Bloque 2
// ----------------------------------------------------------------------------
function slide16Block2Close() {
  const slide = pptx.addSlide();
  bg(slide, C.navy);
  imageCover(slide, IMG.puntos, 0.92, 1.08, 3.82, 4.88);
  rect(slide, 0.92, 1.08, 3.82, 4.88, A.navyDeep, { transparency: 62, line: "FFFFFF", lineTransparency: 72, pt: 0.7 });
  bars(slide, 5.42, 0.74, 1.12);
  slide.addText("Cierre del Bloque 2", {
    x: 5.42, y: 1.42, w: 6.0, h: 0.44, fontFace: TYPOGRAPHY.display, fontSize: 26, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Una idea y dos preguntas quedan instaladas para el trabajo en equipos.", {
    x: 5.46, y: 2.04, w: 6.0, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 12.2, color: "DCE6F2", margin: 0,
  });
  const items = [
    "Un material se recicla solo si llega limpio, seco y separado, y eso se decide antes de botarlo.",
    "¿Qué color le toca a cada material en Chile?",
    "¿Qué residuo botamos mal sin darnos cuenta?",
  ];
  items.forEach((q, i) => {
    panel(slide, 5.46, 3.0 + i * 0.86, 6.36, 0.66, { fill: i === 0 ? A.gold : "123C69", line: i === 0 ? A.gold : "123C69", shadow: false });
    slide.addText(i === 0 ? "★" : String(i).padStart(2, "0"), {
      x: 5.68, y: 3.24 + i * 0.86, w: 0.34, h: 0.08, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: i === 0 ? C.navy : C.white, margin: 0,
    });
    slide.addText(q, {
      x: 6.2, y: 3.14 + i * 0.86, w: 5.48, h: 0.4, fontFace: TYPOGRAPHY.body, fontSize: 10.2, bold: true, color: i === 0 ? C.navy : C.white, margin: 0, breakLine: false,
    });
  });
  thesis(slide, "Ya sabemos por qué un material se recicla o no; ahora cada equipo investiga uno de cerca.", true);
  footer(slide, 16, true);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 17 · Intro Bloque 3
// ----------------------------------------------------------------------------
function slide17Block3Intro() {
  const slide = pptx.addSlide();
  blockIntro(slide, {
    number: "03",
    minutes: "30 MIN · EN EQUIPOS",
    title: "El material\nbajo la lupa",
    subtitle: "Cada equipo se vuelve experto de un material real de su entorno.",
    image: IMG.recila,
    crop: undefined,
  });
  thesis(slide, "Pasamos de “esto es basura” a “esto es tal material, se comporta así y se arruina por esto”.", true);
  footer(slide, 17, true);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 18 · Equipos y roles
// ----------------------------------------------------------------------------
function slide18TeamsAndRoles() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Trabajo en equipos", "Cada equipo, experto de un material", "Eligen un material real y observable, no el reciclaje en general.");
  panel(slide, 0.92, 2.06, 4.5, 3.5, { fill: C.navy, line: C.navy, shadow: true });
  slide.addText("ELIJAN UN MATERIAL REAL", {
    x: 1.18, y: 2.32, w: 4.0, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: A.gold, charSpace: 0.8, margin: 0,
  });
  slide.addText("Algo concreto que puedan tocar o reconocer:", {
    x: 1.18, y: 2.62, w: 4.0, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: "DCE6F2", margin: 0,
  });
  const ejemplos = ["una botella plástica", "una lata de bebida", "una caja de leche", "un vaso desechable", "un frasco de vidrio", "restos de la colación"];
  ejemplos.forEach((e, i) => {
    const y = 3.18 + i * 0.38;
    slide.addText("•", { x: 1.2, y: y, w: 0.2, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 11, bold: true, color: A.gold, margin: 0 });
    slide.addText(e, { x: 1.42, y: y, w: 3.8, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.white, margin: 0 });
  });
  const roles = [
    ["Coordinación", "mantiene al equipo enfocado"],
    ["Registro", "completa la ficha acordada"],
    ["Vocería", "prepara la síntesis del equipo"],
    ["Investigación de material", "de qué está hecho y cómo se comporta"],
    ["Investigación de condiciones", "qué lo arruina y cómo se recicla"],
  ];
  roles.forEach(([t, b], i) => {
    const y = 2.06 + i * 0.71;
    panel(slide, 5.74, y, 5.98, 0.62, { fill: C.white, line: C.border, shadow: false });
    rect(slide, 5.74, y, 0.07, 0.62, A.gold);
    slide.addText(t, { x: 6.0, y: y + 0.11, w: 5.5, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 13.5, bold: true, color: C.navy, margin: 0 });
    slide.addText(b, { x: 6.0, y: y + 0.37, w: 5.5, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 10, color: C.slate, margin: 0 });
  });
  thesis(slide, "Mejor un material concreto y observable que “el reciclaje” en general.");
  footer(slide, 18);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 19 · La ficha de material (plantilla)
// ----------------------------------------------------------------------------
function slide19MaterialSheet() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "El producto del bloque", "La ficha de material", "Una pequeña investigación ordenada: mirar el material por dentro, no por encima.");
  const fields = [
    "Material o residuo elegido",
    "Familia de material",
    "¿De qué está hecho realmente?",
    "¿Es reciclable? ¿Bajo qué condiciones?",
    "¿Qué lo arruina o lo contamina?",
    "¿Genera duda? ¿Qué información falta?",
    "Relación con el problema del equipo (Taller 1)",
  ];
  fields.forEach((f, i) => {
    const y = 2.12 + i * 0.475;
    panel(slide, 0.92, y, 10.8, 0.42, { fill: i % 2 === 0 ? A.neutral : C.white, line: i % 2 === 0 ? A.neutral : C.border, shadow: false });
    slide.addText(String(i + 1), { x: 1.16, y: y + 0.12, w: 0.32, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 12, bold: true, color: "9A7B22", margin: 0 });
    slide.addText(f, { x: 1.62, y: y + 0.115, w: 5.5, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 11.5, bold: true, color: C.navy, margin: 0 });
    slide.addShape(SH.line, { x: 7.3, y: y + 0.29, w: 4.18, h: 0, line: { color: A.gold, transparency: 30, pt: 0.9, dashType: "dash" } });
  });
  thesis(slide, "La ficha cambia la mirada: el residuo deja de ser “basura” y pasa a ser un material con propiedades.");
  footer(slide, 19);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 20 · Ejemplo de ficha
// ----------------------------------------------------------------------------
function slide20SheetExample() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Cómo se ve completada", "Ejemplo: una lata de aluminio", "No busca ser perfecta ni exhaustiva, sino mostrar el cambio de mirada.");
  label(slide, "EJEMPLO COMPLETADO", 9.68, 1.62, 2.04, { fill: A.goldSoft, line: A.goldSoft, color: "9A7B22", fontSize: 8 });
  const rows = [
    ["Material elegido", "lata de bebida del kiosco"],
    ["Familia", "metal (aluminio)"],
    ["De qué está hecho", "aluminio, un metal liviano y muy valioso"],
    ["¿Reciclable?", "sí, si está vacía y sin aplastar junto a otros residuos"],
    ["¿Qué lo arruina?", "restos de bebida y mezclarse con comida"],
    ["¿Genera duda?", "¿hay dónde separar metales en el colegio?"],
    ["Relación con el problema", "tras el recreo quedan muchas latas en la basura común"],
  ];
  rows.forEach(([k, v], i) => {
    const y = 2.12 + i * 0.475;
    panel(slide, 0.92, y, 10.8, 0.42, { fill: i % 2 === 0 ? A.neutral : C.white, line: i % 2 === 0 ? A.neutral : C.border, shadow: false });
    slide.addText(k, { x: 1.16, y: y + 0.115, w: 3.2, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 11, bold: true, color: C.navy, margin: 0 });
    slide.addText(v, { x: 4.5, y: y + 0.115, w: 7.0, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: A.ink, margin: 0 });
  });
  thesis(slide, "El salto es pasar de “esto es basura” a “esto es aluminio, y así se recupera o se pierde”.");
  footer(slide, 20);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 21 · Clasificación con criterio
// ----------------------------------------------------------------------------
function slide21Classification() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Clasificar con criterio", "Cinco categorías, una decisión", "El foco no es solo acertar: es justificar por qué.");
  const cats = [
    ["Reciclable", "¿de qué familia es? ¿está limpio?", false],
    ["No reciclable", "¿muy mezclado o multicapa?", false],
    ["Orgánico", "¿se podría compostar?", false],
    ["Manejo especial", "pilas, electrónicos, peligrosos", false],
    ["Genera duda", "¿qué dato falta para decidir?", true],
  ];
  cats.forEach(([name, pista, gold], i) => {
    const x = 0.92 + i * 2.18;
    const y = 2.34;
    panel(slide, x, y, 2.04, 2.78, { fill: C.white, line: gold ? A.gold : C.border, shadow: true });
    rect(slide, x, y, 2.04, 0.78, gold ? A.gold : C.navy);
    slide.addText(name, {
      x: x + 0.16, y: y + 0.14, w: 1.74, h: 0.5, fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: gold ? C.navy : C.white, margin: 0,
    });
    slide.addText("PISTA PARA DECIDIR", {
      x: x + 0.16, y: y + 0.96, w: 1.76, h: 0.12, fontFace: TYPOGRAPHY.body, fontSize: 7, bold: true, color: C.slate, charSpace: 0.5, margin: 0,
    });
    slide.addText(pista, {
      x: x + 0.16, y: y + 1.2, w: 1.74, h: 1.4, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: A.ink, margin: 0, breakLine: false,
    });
  });
  thesis(slide, "Reconocer que falta información también es parte del aprendizaje: por eso existe “genera duda”.");
  footer(slide, 21);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 22 · Cierre Bloque 3
// ----------------------------------------------------------------------------
function slide22Block3Close() {
  const slide = pptx.addSlide();
  bg(slide, C.navy);
  bars(slide, 0.86, 0.78, 1.16);
  slide.addText("Cierre del Bloque 3", {
    x: 0.86, y: 1.5, w: 8.0, h: 0.46, fontFace: TYPOGRAPHY.display, fontSize: 28, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Antes del bloque final, cada equipo deja dos productos mínimos.", {
    x: 0.9, y: 2.16, w: 9.0, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 12.6, color: "DCE6F2", margin: 0,
  });
  const products = [
    ["PRODUCTO 1", "Una ficha de material completada"],
    ["PRODUCTO 2", "Una idea de cómo se conecta con el problema del Taller 1"],
  ];
  products.forEach(([tag, text], i) => {
    const x = 0.92 + i * 5.58;
    panel(slide, x, 2.86, 5.22, 1.72, { fill: "123C69", line: "123C69", shadow: false });
    rect(slide, x, 2.86, 5.22, 0.09, A.gold);
    slide.addText(tag, {
      x: x + 0.3, y: 3.18, w: 2.2, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: A.gold, charSpace: 1.0, margin: 0,
    });
    slide.addText("★", {
      x: x + 4.5, y: 3.16, w: 0.5, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 13, bold: true, color: A.gold, align: "right", margin: 0,
    });
    slide.addText(text, {
      x: x + 0.3, y: 3.56, w: 4.64, h: 0.86, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.white, margin: 0, breakLine: false,
    });
  });
  panel(slide, 0.92, 4.86, 10.8, 0.72, { fill: A.gold, line: A.gold, shadow: false });
  slide.addText([
    { text: "Para conversar:   ", options: { color: "9A2C24", bold: true } },
    { text: "¿qué material les generó más duda al clasificar?", options: { color: C.navy, bold: true } },
  ], {
    x: 1.24, y: 5.08, w: 10.2, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 12.5, align: "center", margin: 0,
  });
  thesis(slide, "Ya investigamos el material de cerca; ahora lo conectamos con nuestro problema.", true);
  footer(slide, 22, true);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 23 · Intro Bloque 4
// ----------------------------------------------------------------------------
function slide23Block4Intro() {
  const slide = pptx.addSlide();
  blockIntro(slide, {
    number: "04",
    minutes: "20 MIN",
    title: "Del material\na la solución",
    subtitle: "Unimos lo que aprendimos del material con el problema de cada equipo.",
    image: IMG.vitacura,
    crop: undefined,
  });
  thesis(slide, "Un problema preciso es lo que permite imaginar una solución que valga la pena.", true);
  footer(slide, 23, true);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 24 · Conectar el material con el problema
// ----------------------------------------------------------------------------
function slide24ConnectMaterialProblem() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "El paso clave", "Conectar el material con el problema", "Unimos la ficha del equipo con su frase de problema del Taller 1.");
  panel(slide, 0.92, 2.06, 5.3, 3.5, { fill: C.navy, line: C.navy, shadow: true });
  slide.addText("PLANTILLA · COMPLETAR EN EQUIPO", {
    x: 1.18, y: 2.3, w: 4.8, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 8.6, bold: true, color: A.gold, charSpace: 0.8, margin: 0,
  });
  const prompts = ["Nuestro problema (Taller 1)", "El material en el centro", "Lo que aprendimos del material", "Qué cambia ahora que lo entendemos"];
  prompts.forEach((p, i) => {
    const y = 2.66 + i * 0.68;
    slide.addText(String(i + 1), { x: 1.18, y: y, w: 0.3, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 14, bold: true, color: A.gold, margin: 0 });
    slide.addText(p, { x: 1.56, y: y + 0.02, w: 4.4, h: 0.46, fontFace: TYPOGRAPHY.body, fontSize: 12, bold: true, color: C.white, margin: 0, breakLine: false });
  });
  panel(slide, 6.5, 2.06, 5.22, 3.5, { fill: A.neutral, line: A.neutral, shadow: true });
  slide.addText("EJEMPLO · UNA BOTELLA PET", {
    x: 6.76, y: 2.3, w: 4.7, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 8.6, bold: true, color: "9A7B22", charSpace: 0.8, margin: 0,
  });
  const ej = [
    ["Problema", "en el patio se mezclan botellas y restos de comida"],
    ["Material", "botella plástica PET"],
    ["Aprendimos", "el PET es reciclable, pero mojado con comida deja de servir"],
    ["Qué cambia", "no es solo “hay basura”: se pierde un material que sí se podía recuperar"],
  ];
  ej.forEach(([k, v], i) => {
    const y = 2.66 + i * 0.68;
    slide.addText(k, { x: 6.76, y: y, w: 4.7, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 12.5, bold: true, color: C.navy, margin: 0 });
    slide.addText(v, { x: 6.76, y: y + 0.26, w: 4.72, h: 0.4, fontFace: TYPOGRAPHY.body, fontSize: 10.5, color: A.ink, margin: 0, breakLine: false });
  });
  thesis(slide, "Así una queja general se transforma en un problema entendido y accionable.");
  footer(slide, 24);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 25 · Puesta en común y salida reflexiva
// ----------------------------------------------------------------------------
function slide25ShareAndReflect() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Cerrar compartiendo", "Poner en común y mirar atrás", "Cada equipo comparte su hallazgo y deja una reflexión final.");
  panel(slide, 0.92, 2.1, 5.3, 3.4, { fill: C.white, line: C.border, shadow: true });
  rect(slide, 0.92, 2.1, 5.3, 0.09, A.gold);
  slide.addText("PUESTA EN COMÚN · 30-45 s POR EQUIPO", {
    x: 1.18, y: 2.42, w: 4.8, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 8.6, bold: true, color: "9A7B22", charSpace: 0.6, margin: 0,
  });
  const share = ["El material que investigaron", "Un hallazgo clave de su ficha", "Cómo se conecta con su problema"];
  share.forEach((s, i) => {
    const y = 2.86 + i * 0.74;
    slide.addText("•", { x: 1.2, y: y, w: 0.2, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 12, bold: true, color: A.gold, margin: 0 });
    slide.addText(s, { x: 1.46, y: y, w: 4.5, h: 0.5, fontFace: TYPOGRAPHY.body, fontSize: 12.5, bold: true, color: C.navy, margin: 0, breakLine: false });
  });
  panel(slide, 6.5, 2.1, 5.22, 3.4, { fill: C.navy, line: C.navy, shadow: true });
  slide.addText("SALIDA REFLEXIVA", {
    x: 6.76, y: 2.42, w: 4.7, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 8.6, bold: true, color: A.gold, charSpace: 0.8, margin: 0,
  });
  const refl = ["¿Qué aprendimos del material que antes no sabíamos?", "¿Por qué importa entenderlo para reciclar bien?", "¿Qué información todavía nos falta?"];
  refl.forEach((q, i) => {
    const y = 2.86 + i * 0.74;
    slide.addText(String(i + 1), { x: 6.76, y: y, w: 0.3, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: A.gold, margin: 0 });
    slide.addText(q, { x: 7.14, y: y, w: 4.34, h: 0.5, fontFace: TYPOGRAPHY.body, fontSize: 11.5, color: "DCE6F2", margin: 0, breakLine: false });
  });
  thesis(slide, "Los problemas de reciclaje no son casos aislados: se repiten con formas parecidas.");
  footer(slide, 25);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 26 · Puente al Taller 3
// ----------------------------------------------------------------------------
function slide26BridgeTaller3() {
  const slide = pptx.addSlide();
  bg(slide);
  header(slide, "Lo que viene", "Del material a la tecnología", "Si entendemos el problema y el material, podemos pensar una solución que mida y avise.");
  panel(slide, 0.92, 2.12, 5.2, 3.46, { fill: C.white, line: C.border, shadow: true });
  imageContain(slide, IMG.board, 1.1, 2.34, 4.84, 2.5);
  slide.addText("GeoGreen mide cuánto se llena un contenedor y avisa cuando está lleno.", {
    x: 1.2, y: 4.94, w: 4.7, h: 0.5, fontFace: TYPOGRAPHY.body, fontSize: 11, bold: true, color: C.navy, align: "center", margin: 0,
  });
  const steps = [
    ["Sensar", "mide cuánto se llena el contenedor"],
    ["Enviar", "manda el dato por WiFi o LoRa"],
    ["Visualizar", "muestra el nivel en un tablero"],
    ["Alertar", "avisa cuando está lleno"],
  ];
  steps.forEach(([t, b], i) => {
    const y = 2.12 + i * 0.88;
    panel(slide, 6.4, y, 5.32, 0.76, { fill: i === 0 ? A.goldSoft : C.white, line: i === 0 ? A.gold : C.border, shadow: false });
    slide.addText(String(i + 1), { x: 6.64, y: y + 0.24, w: 0.4, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: "9A7B22", margin: 0 });
    slide.addText(t, { x: 7.16, y: y + 0.14, w: 2.0, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: C.navy, margin: 0 });
    slide.addText(b, { x: 7.16, y: y + 0.44, w: 4.3, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 10, color: C.slate, margin: 0 });
    if (i < 3) {
      slide.addShape(SH.line, { x: 6.66, y: y + 0.76, w: 0, h: 0.12, line: { color: A.gold, pt: 1.2 } });
    }
  });
  thesis(slide, "Una tecnología tiene sentido cuando responde a un problema real y conoce su material.");
  footer(slide, 26);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 27 · Cierre de la clase
// ----------------------------------------------------------------------------
function slide27ClassClose() {
  const slide = pptx.addSlide();
  bg(slide, C.navy);
  bars(slide, 0.86, 0.78, 1.16);
  slide.addText("Cierre de la clase", {
    x: 0.86, y: 1.5, w: 9.0, h: 0.46, fontFace: TYPOGRAPHY.display, fontSize: 28, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Tres ideas para llevarse de hoy.", {
    x: 0.9, y: 2.16, w: 9.0, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 12.6, color: "DCE6F2", margin: 0,
  });
  const ideas = [
    "Un residuo es un material con propiedades; ese material decide qué se puede hacer con él.",
    "Reciclable no es reciclado: depende de llegar limpio, seco y separado, y se decide antes de botar.",
    "Entender el material permite mirar el problema con precisión e imaginar una mejor solución.",
  ];
  ideas.forEach((t, i) => {
    const y = 2.74 + i * 0.78;
    panel(slide, 0.92, y, 10.8, 0.66, { fill: "123C69", line: "123C69", shadow: false });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: 1.18, y: y + 0.22, w: 0.5, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 14, bold: true, color: A.gold, margin: 0,
    });
    slide.addText(t, {
      x: 1.84, y: y + 0.13, w: 9.7, h: 0.44, fontFace: TYPOGRAPHY.body, fontSize: 12, bold: true, color: C.white, margin: 0, breakLine: false,
    });
  });
  slide.addText("«Conocer el material es el primer paso para reciclar de verdad.»", {
    x: 0.92, y: 5.42, w: 10.8, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: A.gold, align: "center", margin: 0,
  });
  footer(slide, 27, true);
  validateSlide(slide, pptx);
}

// ----------------------------------------------------------------------------
// 28 · Cierre final
// ----------------------------------------------------------------------------
function slide28Closing() {
  const slide = pptx.addSlide();
  slide.addImage({ path: IMG.pet, x: 0, y: 0, w: SLIDE_W, h: SLIDE_H });
  rect(slide, 0, 0, SLIDE_W, SLIDE_H, A.navyDeep, { transparency: 12 });
  bars(slide, 6.38, 1.18, 1.2);
  slide.addText("GEOGREEN ESCOLAR OSORNO", {
    x: 3.67, y: 2.18, w: 6.0, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 9.4, bold: true, color: A.gold, charSpace: 1.5, align: "center", margin: 0,
  });
  slide.addText("Gracias por convertir residuos en evidencia.", {
    x: 1.67, y: 2.78, w: 10.0, h: 0.62, fontFace: TYPOGRAPHY.display, fontSize: 33, bold: true, color: C.white, align: "center", margin: 0,
  });
  slide.addText("Las fichas de material de cada equipo abren el camino hacia la solución.", {
    x: 2.67, y: 3.92, w: 8.0, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 13.8, color: "E9EEF4", align: "center", margin: 0,
  });
  label(slide, "Próxima sesión · Taller 3: tecnología y prototipado", 4.12, 4.92, 5.1, { fill: C.white, color: C.navy });
  footer(slide, 28, true);
  validateSlide(slide, pptx);
}

[
  slide01Cover,
  slide02Purpose,
  slide03Map,
  slide04Block1Intro,
  slide05ObjectVsMaterial,
  slide06Families,
  slide07Deceiving,
  slide08Block1Close,
  slide09Block2Intro,
  slide10ReciclableVsReciclado,
  slide11CleanDrySeparated,
  slide12ChileanColors,
  slide13ChileanStructure,
  slide14CrossContamination,
  slide15DecisionBeforeTossing,
  slide16Block2Close,
  slide17Block3Intro,
  slide18TeamsAndRoles,
  slide19MaterialSheet,
  slide20SheetExample,
  slide21Classification,
  slide22Block3Close,
  slide23Block4Intro,
  slide24ConnectMaterialProblem,
  slide25ShareAndReflect,
  slide26BridgeTaller3,
  slide27ClassClose,
  slide28Closing,
].forEach((buildSlide) => buildSlide());

pptx.writeFile({ fileName: outputPptx });
