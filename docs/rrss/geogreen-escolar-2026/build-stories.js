const fs = require("fs");
const path = require("path");

const root = __dirname;

const sharedDefs = `
  <defs>
    <linearGradient id="coverShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#001E3D" stop-opacity=".04"/>
      <stop offset="55%" stop-color="#001E3D" stop-opacity=".10"/>
      <stop offset="100%" stop-color="#00172F" stop-opacity=".94"/>
    </linearGradient>
    <linearGradient id="titleShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#002B55" stop-opacity=".94"/>
      <stop offset="70%" stop-color="#002B55" stop-opacity=".64"/>
      <stop offset="100%" stop-color="#002B55" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="greenLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#24B36B"/>
      <stop offset="100%" stop-color="#72D5A2"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="#001326" flood-opacity=".32"/>
    </filter>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="2" fill="#FFFFFF" opacity=".12"/>
    </pattern>
  </defs>`;

const story1 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="1080" height="1920" viewBox="0 0 1080 1920">
  ${sharedDefs}
  <rect x="0" y="0" width="1080" height="1920" fill="url(#coverShade)"/>
  <path d="M0 244 H850 L1000 394 H0 Z" fill="url(#titleShade)"/>
  <rect x="0" y="0" width="1080" height="1920" fill="url(#dots)" opacity=".16"/>

  <g transform="translate(72 300)">
    <rect x="0" y="0" width="326" height="58" rx="29" fill="#E51B2A"/>
    <text x="163" y="38" text-anchor="middle" fill="#FFFFFF"
      font-family="Arial" font-size="24" font-weight="700" letter-spacing="1.2">AIEP OSORNO · 2026</text>

    <text x="0" y="174" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="122"
      font-weight="800" letter-spacing="-2.8">GEOGREEN</text>
    <text x="0" y="276" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="98"
      font-weight="800" letter-spacing="-2">ESCOLAR</text>
    <text x="608" y="276" fill="#61D391" font-family="Arial Narrow, Arial" font-size="98"
      font-weight="800">2026</text>
    <rect x="0" y="310" width="790" height="10" rx="5" fill="url(#greenLine)"/>

    <text x="0" y="390" fill="#FFFFFF" font-family="Arial" font-size="39" font-weight="700">
      <tspan x="0" dy="0">Ideas jóvenes para un futuro</tspan>
      <tspan x="0" dy="50">más sostenible.</tspan>
    </text>

    <g transform="translate(0 520)" filter="url(#shadow)">
      <rect x="0" y="0" width="790" height="76" rx="18" fill="#001E3D" fill-opacity=".84"
        stroke="#FFFFFF" stroke-opacity=".22"/>
      <circle cx="42" cy="38" r="10" fill="#24B36B"/>
      <text x="70" y="48" fill="#FFFFFF" font-family="Arial" font-size="27"
        font-weight="700" letter-spacing=".4">TALLERES · MENTORÍAS · DESAFÍO FINAL</text>
    </g>
  </g>

  <g transform="translate(72 1624)">
    <rect x="0" y="0" width="936" height="1" fill="#FFFFFF" opacity=".46"/>
    <text x="0" y="58" fill="#FFFFFF" font-family="Arial" font-size="27" font-weight="700">
      INSTITUTO COMERCIAL LICEO BICENTENARIO
    </text>
    <text x="0" y="96" fill="#D7E5F1" font-family="Arial" font-size="24">
      Vinculación con el Medio · AIEP Osorno
    </text>
  </g>
</svg>`;

const story2 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="1080" height="1920" viewBox="0 0 1080 1920">
  ${sharedDefs}
  <rect x="0" y="0" width="1080" height="1920" fill="url(#dots)" opacity=".11"/>

  <g transform="translate(72 520)">
    <text x="0" y="0" fill="#61D391" font-family="Arial" font-size="25" font-weight="700"
      letter-spacing="2.5">GEOGREEN ESCOLAR 2026</text>
    <text x="0" y="92" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="78"
      font-weight="800" letter-spacing="-1.7">DE LA IDEA</text>
    <text x="0" y="174" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="78"
      font-weight="800" letter-spacing="-1.7">A LA ACCIÓN</text>
    <rect x="0" y="204" width="640" height="8" rx="4" fill="#E51B2A"/>
    <text x="0" y="271" fill="#DCE8F2" font-family="Arial" font-size="30">
      <tspan x="0" dy="0">60 estudiantes transforman desafíos ambientales</tspan>
      <tspan x="0" dy="42">en propuestas tecnológicas con impacto local.</tspan>
    </text>
  </g>

  <g transform="translate(72 900)" filter="url(#shadow)">
    <rect x="0" y="0" width="936" height="270" rx="30" fill="#072E55" fill-opacity=".94"
      stroke="#62D293" stroke-width="2"/>
    <rect x="0" y="0" width="16" height="270" rx="8" fill="#24B36B"/>
    <text x="48" y="66" fill="#61D391" font-family="Arial Narrow, Arial" font-size="48"
      font-weight="800">17 AGO — 28 SEP</text>
    <text x="48" y="128" fill="#FFFFFF" font-family="Arial Narrow, Arial" font-size="43"
      font-weight="800">CICLO DE TALLERES Y MENTORÍAS</text>
    <text x="48" y="184" fill="#DCE8F2" font-family="Arial" font-size="27">
      Problema ambiental · reciclaje · sensores
    </text>
    <text x="48" y="224" fill="#DCE8F2" font-family="Arial" font-size="27">
      y desarrollo de propuestas.
    </text>
  </g>

  <g transform="translate(72 1202)" filter="url(#shadow)">
    <rect x="0" y="0" width="936" height="250" rx="30" fill="#FFFFFF" fill-opacity=".97"/>
    <rect x="0" y="0" width="16" height="250" rx="8" fill="#E51B2A"/>
    <text x="48" y="66" fill="#E51B2A" font-family="Arial Narrow, Arial" font-size="48"
      font-weight="800">05 OCT</text>
    <text x="48" y="128" fill="#002B55" font-family="Arial Narrow, Arial" font-size="43"
      font-weight="800">PRESENTACIÓN Y PREMIACIÓN</text>
    <text x="48" y="184" fill="#3C5268" font-family="Arial" font-size="27">
      Los equipos comparten sus soluciones
    </text>
    <text x="48" y="224" fill="#3C5268" font-family="Arial" font-size="27">
      ante la comunidad educativa.
    </text>
  </g>

  <g transform="translate(72 1510)">
    <rect x="0" y="0" width="936" height="104" rx="22" fill="#001D3B" fill-opacity=".88"
      stroke="#FFFFFF" stroke-opacity=".24"/>
    <text x="468" y="47" text-anchor="middle" fill="#FFFFFF" font-family="Arial Narrow, Arial"
      font-size="31" font-weight="800" letter-spacing=".5">60 ESTUDIANTES · 10 EQUIPOS</text>
    <text x="468" y="82" text-anchor="middle" fill="#61D391" font-family="Arial"
      font-size="23" font-weight="700">UN DESAFÍO COMÚN: CREAR SOLUCIONES CON IMPACTO LOCAL</text>
  </g>

  <text x="72" y="1680" fill="#D7E5F1" font-family="Arial" font-size="24" font-weight="700">
    INSTITUTO COMERCIAL LICEO BICENTENARIO · AIEP OSORNO
  </text>
</svg>`;

fs.writeFileSync(path.join(root, "historia-01-portada-overlay.svg"), story1, "utf8");
fs.writeFileSync(path.join(root, "historia-02-programa-overlay.svg"), story2, "utf8");
