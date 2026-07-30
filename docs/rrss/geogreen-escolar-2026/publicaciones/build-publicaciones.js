const fs = require("fs");
const path = require("path");

const root = __dirname;

const defs = `
  <defs>
    <linearGradient id="topShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#001B36" stop-opacity=".88"/>
      <stop offset="58%" stop-color="#00294F" stop-opacity=".50"/>
      <stop offset="100%" stop-color="#00294F" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bottomShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#001A34" stop-opacity="0"/>
      <stop offset="100%" stop-color="#001326" stop-opacity=".94"/>
    </linearGradient>
    <linearGradient id="greenLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#22B66B"/>
      <stop offset="100%" stop-color="#69D69A"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="9" stdDeviation="15" flood-color="#001326" flood-opacity=".34"/>
    </filter>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="1.7" fill="#FFFFFF" opacity=".10"/>
    </pattern>
  </defs>`;

function shell(content, page, extra = "") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${defs}
  ${extra}
  <rect width="1080" height="1350" fill="url(#dots)" opacity=".16"/>
  ${content}
  <g transform="translate(66 1267)">
    <rect x="0" y="0" width="948" height="1" fill="#FFFFFF" opacity=".40"/>
    <text x="0" y="42" fill="#D9E6F1" font-family="Arial" font-size="20" font-weight="700">
      INSTITUTO COMERCIAL LICEO BICENTENARIO · AIEP OSORNO
    </text>
    <text x="948" y="42" text-anchor="end" fill="#FFFFFF" font-family="Arial" font-size="21"
      font-weight="700">${page} / 04</text>
  </g>
</svg>`;
}

const card1 = shell(`
  <g transform="translate(66 80)">
    <rect x="0" y="0" width="276" height="50" rx="25" fill="#E61D2B"/>
    <text x="138" y="33" text-anchor="middle" fill="#FFFFFF" font-family="Arial"
      font-size="21" font-weight="700" letter-spacing="1">AIEP OSORNO · 2026</text>
  </g>

  <g transform="translate(66 244)">
    <text x="0" y="0" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="100"
      font-weight="800" letter-spacing="-2.4">GEOGREEN</text>
    <text x="0" y="90" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="82"
      font-weight="800" letter-spacing="-1.6">ESCOLAR</text>
    <text x="515" y="90" fill="#61D391" font-family="Arial Narrow, Arial" font-size="82"
      font-weight="800">2026</text>
    <rect x="0" y="121" width="720" height="9" rx="4.5" fill="url(#greenLine)"/>

    <text x="0" y="196" fill="#FFFFFF" font-family="Arial" font-size="34" font-weight="700">
      <tspan x="0" dy="0">Ideas jóvenes para transformar desafíos</tspan>
      <tspan x="0" dy="45">ambientales en soluciones tecnológicas.</tspan>
    </text>
  </g>

  <g transform="translate(66 1038)" filter="url(#shadow)">
    <rect x="0" y="0" width="760" height="72" rx="18" fill="#001E3D" fill-opacity=".88"
      stroke="#FFFFFF" stroke-opacity=".25"/>
    <circle cx="38" cy="36" r="9" fill="#22B66B"/>
    <text x="64" y="45" fill="#FFFFFF" font-family="Arial" font-size="25" font-weight="700">
      TALLERES · MENTORÍAS · DESAFÍO FINAL
    </text>
  </g>
`, "01", `
  <rect width="1080" height="770" fill="url(#topShade)"/>
  <rect y="880" width="1080" height="470" fill="url(#bottomShade)"/>`);

const card2 = shell(`
  <g transform="translate(66 126)">
    <rect x="0" y="-30" width="318" height="48" rx="24" fill="#E61D2B"/>
    <text x="159" y="2" text-anchor="middle" fill="#FFFFFF" font-family="Arial"
      font-size="20" font-weight="700" letter-spacing="1.1">¿QUÉ ES GEOGREEN ESCOLAR?</text>
    <text x="0" y="82" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="70"
      font-weight="800" letter-spacing="-1.3">UNA IDEA QUE SE</text>
    <text x="0" y="154" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="70"
      font-weight="800" letter-spacing="-1.3">CONVIERTE EN SOLUCIÓN</text>
    <rect x="0" y="183" width="690" height="8" rx="4" fill="#E61D2B"/>
    <text x="0" y="244" fill="#E2ECF4" font-family="Arial" font-size="28">
      <tspan x="0" dy="0">Un programa educativo de Vinculación con el Medio</tspan>
      <tspan x="0" dy="39">que acompaña a estudiantes en la creación de propuestas</tspan>
      <tspan x="0" dy="39">tecnológicas para desafíos ambientales de su entorno.</tspan>
    </text>
  </g>

  <g transform="translate(66 1035)" filter="url(#shadow)">
    <rect x="0" y="0" width="948" height="138" rx="25" fill="#00264A" fill-opacity=".92"
      stroke="#FFFFFF" stroke-opacity=".22"/>
    <g transform="translate(36 29)">
      <text x="0" y="38" fill="#61D391" font-family="Arial Narrow, Arial" font-size="43"
        font-weight="800">60</text>
      <text x="0" y="75" fill="#FFFFFF" font-family="Arial" font-size="20"
        font-weight="700">ESTUDIANTES</text>
    </g>
    <rect x="274" y="25" width="1" height="88" fill="#FFFFFF" opacity=".28"/>
    <g transform="translate(323 29)">
      <text x="0" y="38" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="43"
        font-weight="800">10</text>
      <text x="0" y="75" fill="#FFFFFF" font-family="Arial" font-size="20"
        font-weight="700">EQUIPOS</text>
    </g>
    <rect x="536" y="25" width="1" height="88" fill="#FFFFFF" opacity=".28"/>
    <g transform="translate(584 29)">
      <text x="0" y="38" fill="#E61D2B" font-family="Arial Narrow, Arial" font-size="43"
        font-weight="800">1</text>
      <text x="0" y="75" fill="#FFFFFF" font-family="Arial" font-size="20"
        font-weight="700">DESAFÍO COMÚN</text>
    </g>
  </g>
`, "02", `
  <rect width="1080" height="620" fill="url(#topShade)"/>
  <rect y="850" width="1080" height="500" fill="url(#bottomShade)"/>`);

const card3 = shell(`
  <g transform="translate(66 94)">
    <rect x="0" y="0" width="300" height="54" rx="27" fill="#E61D2B"/>
    <text x="150" y="36" text-anchor="middle" fill="#FFFFFF" font-family="Arial"
      font-size="23" font-weight="800">17 AGO — 28 SEP</text>

    <text x="0" y="137" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="73"
      font-weight="800" letter-spacing="-1.4">TALLERES Y MENTORÍAS</text>
    <text x="0" y="194" fill="#E1EBF3" font-family="Arial" font-size="29">
      Un proceso guiado para comprender, crear y mejorar una propuesta.
    </text>
  </g>

  <g transform="translate(66 335)" filter="url(#shadow)">
    <rect x="0" y="0" width="948" height="206" rx="26" fill="#00264A" fill-opacity=".91"
      stroke="#FFFFFF" stroke-opacity=".20"/>
    <g transform="translate(30 31)">
      <circle cx="14" cy="16" r="9" fill="#22B66B"/>
      <text x="38" y="24" fill="#FFFFFF" font-family="Arial" font-size="25"
        font-weight="700">Problema ambiental</text>
      <circle cx="14" cy="78" r="9" fill="#22B66B"/>
      <text x="38" y="86" fill="#FFFFFF" font-family="Arial" font-size="25"
        font-weight="700">Ciencia del reciclaje</text>
    </g>
    <rect x="476" y="29" width="1" height="148" fill="#FFFFFF" opacity=".25"/>
    <g transform="translate(512 31)">
      <circle cx="14" cy="16" r="9" fill="#E61D2B"/>
      <text x="38" y="24" fill="#FFFFFF" font-family="Arial" font-size="25"
        font-weight="700">Sensores y prototipado</text>
      <circle cx="14" cy="78" r="9" fill="#E61D2B"/>
      <text x="38" y="86" fill="#FFFFFF" font-family="Arial" font-size="25"
        font-weight="700">Desarrollo de propuestas</text>
    </g>
  </g>

  <g transform="translate(66 1103)">
    <rect x="0" y="0" width="720" height="66" rx="18" fill="#001E3D" fill-opacity=".86"
      stroke="#FFFFFF" stroke-opacity=".22"/>
    <text x="28" y="42" fill="#FFFFFF" font-family="Arial" font-size="23" font-weight="700">
      OBSERVAR · IDEAR · PROTOTIPAR · COMUNICAR
    </text>
  </g>
`, "03", `
  <rect width="1080" height="670" fill="url(#topShade)"/>
  <rect y="900" width="1080" height="450" fill="url(#bottomShade)"/>`);

const card4 = shell(`
  <g transform="translate(66 96)">
    <rect x="0" y="0" width="188" height="54" rx="27" fill="#E61D2B"/>
    <text x="94" y="36" text-anchor="middle" fill="#FFFFFF" font-family="Arial"
      font-size="23" font-weight="800">05 OCT</text>

    <text x="0" y="140" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="73"
      font-weight="800" letter-spacing="-1.4">PRESENTACIÓN FINAL</text>
    <text x="0" y="215" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="73"
      font-weight="800" letter-spacing="-1.4">Y PREMIACIÓN</text>
    <rect x="0" y="245" width="610" height="8" rx="4" fill="url(#greenLine)"/>
    <text x="0" y="309" fill="#E1EBF3" font-family="Arial" font-size="30">
      <tspan x="0" dy="0">Los 10 equipos comparten sus soluciones</tspan>
      <tspan x="0" dy="42">ante la comunidad educativa.</tspan>
    </text>
  </g>

  <g transform="translate(66 1034)" filter="url(#shadow)">
    <rect x="0" y="0" width="818" height="126" rx="24" fill="#00264A" fill-opacity=".94"
      stroke="#FFFFFF" stroke-opacity=".22"/>
    <rect x="0" y="0" width="14" height="126" rx="7" fill="#22B66B"/>
    <text x="42" y="50" fill="#FFFFFF" font-family="Arial" font-size="26" font-weight="700">
      <tspan x="42" dy="0">Una idea crece cuando se prueba,</tspan>
      <tspan x="42" dy="36">se mejora y se comparte.</tspan>
    </text>
  </g>
`, "04", `
  <rect width="1080" height="650" fill="url(#topShade)"/>
  <rect y="850" width="1080" height="500" fill="url(#bottomShade)"/>`);

const cards = [card1, card2, card3, card4];
cards.forEach((svg, index) => {
  const number = String(index + 1).padStart(2, "0");
  fs.writeFileSync(path.join(root, `publicacion-${number}-overlay.svg`), svg, "utf8");
});
