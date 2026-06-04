'use strict';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// theme/tokens.js
var require_tokens = __commonJS({
  "theme/tokens.js"(exports$1, module) {
    var TOKENS2 = {
      paper: "F8F3EC",
      white: "FFFFFF",
      navy: "102A43",
      red: "D62027",
      ink: "243B53",
      slate: "52606D",
      guide: "96A3B2",
      border: "D8CFC4",
      softBlue: "E6EEF7",
      softNeutral: "EDE6DA",
      paleRed: "F8E4E5",
      sand: "EADFD0",
      gold: "E0BC5A",
      warm: "F2E7D9",
      mist: "EEF2F6",
      titleFill: "284B75",
      editorBg: "102A43",
      terminalBg: "0F1720",
      terminalPrompt: "E0BC5A",
      terminalOutput: "E6EEF7",
      terminalMuted: "8AA0B6",
      success: "3FAE6A",
      successSoft: "E9F6EE",
      warning: "E0BC5A",
      warningSoft: "FBF3DE",
      shadow: "D9D0C4"
    };
    module.exports = {
      TOKENS: TOKENS2
    };
  }
});

// theme/typography.js
var require_typography = __commonJS({
  "theme/typography.js"(exports$1, module) {
    var TYPOGRAPHY2 = {
      display: "Aptos Display",
      body: "Aptos",
      mono: "Consolas",
      lang: "es-CL"
    };
    module.exports = {
      TYPOGRAPHY: TYPOGRAPHY2
    };
  }
});

// theme/aiep-theme.js
var require_aiep_theme = __commonJS({
  "theme/aiep-theme.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    function applyAiepTheme2(pptx, meta = {}) {
      pptx.layout = meta.layout || "LAYOUT_WIDE";
      pptx.author = meta.author || "Codex";
      pptx.company = meta.company || "AIEP";
      pptx.subject = meta.subject || "Presentacion";
      pptx.title = meta.title || "Deck";
      pptx.lang = TYPOGRAPHY2.lang;
      pptx.theme = {
        headFontFace: TYPOGRAPHY2.display,
        bodyFontFace: TYPOGRAPHY2.body,
        lang: TYPOGRAPHY2.lang
      };
      return pptx;
    }
    module.exports = {
      TOKENS: TOKENS2,
      TYPOGRAPHY: TYPOGRAPHY2,
      applyAiepTheme: applyAiepTheme2
    };
  }
});

// theme/index.js
var require_theme = __commonJS({
  "theme/index.js"(exports$1, module) {
    module.exports = {
      ...require_tokens(),
      ...require_typography(),
      ...require_aiep_theme()
    };
  }
});

// vendor/pptxgenjs_helpers/image.js
var require_image = __commonJS({
  "vendor/pptxgenjs_helpers/image.js"(exports$1, module) {
    var fs = __require("fs");
    function readInputAsBuffer(source) {
      if (!source) throw new Error("Image source is empty");
      if (Buffer.isBuffer(source)) return { buffer: source, type: "buffer" };
      if (typeof source === "string") {
        if (source.startsWith("data:")) {
          const type = "dataUri";
          const comma = source.indexOf(",");
          const payload = comma !== -1 ? source.slice(comma + 1) : source;
          try {
            return { buffer: Buffer.from(payload, "base64"), type };
          } catch (_e) {
            try {
              return {
                buffer: Buffer.from(decodeURIComponent(payload), "utf8"),
                type
              };
            } catch (_e2) {
              return { buffer: Buffer.from(payload, "utf8"), type };
            }
          }
        }
        if (source.includes("<svg")) {
          return { buffer: Buffer.from(source, "utf8"), type: "rawSvg" };
        }
        return { buffer: fs.readFileSync(source), type: "path" };
      }
      throw new Error("Unsupported image source type");
    }
    function isPng(buf) {
      return buf.length >= 24 && buf[0] === 137 && buf[1] === 80 && buf[2] === 78 && buf[3] === 71 && buf[4] === 13 && buf[5] === 10 && buf[6] === 26 && buf[7] === 10;
    }
    function isJpeg(buf) {
      return buf.length > 3 && buf[0] === 255 && buf[1] === 216 && buf[2] === 255;
    }
    function isGif(buf) {
      return buf.length >= 10 && buf[0] === 71 && buf[1] === 73 && buf[2] === 70 && buf[3] === 56 && (buf[4] === 57 || buf[4] === 55) && buf[5] === 97;
    }
    function isWebp(buf) {
      return buf.length >= 16 && buf[0] === 82 && buf[1] === 73 && buf[2] === 70 && buf[3] === 70 && buf[8] === 87 && buf[9] === 69 && buf[10] === 66 && buf[11] === 80;
    }
    function isSvg(buf) {
      const head = buf.slice(0, 200).toString("utf8");
      return head.includes("<svg");
    }
    function readPngSize(buf) {
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      return { width, height, type: "png" };
    }
    function readGifSize(buf) {
      const width = buf.readUInt16LE(6);
      const height = buf.readUInt16LE(8);
      return { width, height, type: "gif" };
    }
    function readWebpSize(buf) {
      const riffSize = buf.readUInt32LE(4) + 8;
      let offset = 12;
      while (offset + 8 <= riffSize && offset + 8 <= buf.length) {
        const chunkTag = buf.slice(offset, offset + 4).toString("ascii");
        const chunkSize = buf.readUInt32LE(offset + 4);
        if (chunkTag === "VP8X") {
          const wMinus1 = buf.readUIntLE(offset + 12, 3);
          const hMinus1 = buf.readUIntLE(offset + 15, 3);
          return { width: wMinus1 + 1, height: hMinus1 + 1, type: "webp" };
        }
        if (chunkTag === "VP8 ") {
          const start = offset + 8;
          if (start + 10 < buf.length) {
            const width = buf.readUInt16LE(start + 6) & 16383;
            const height = buf.readUInt16LE(start + 8) & 16383;
            return { width, height, type: "webp" };
          }
        }
        if (chunkTag === "VP8L") {
          const start = offset + 8;
          if (start + 5 <= buf.length) {
            const b0 = buf[start + 1];
            const b1 = buf[start + 2];
            const b2 = buf[start + 3];
            const b3 = buf[start + 4];
            const width = 1 + ((b1 & 63) << 8 | b0);
            const height = 1 + ((b3 & 15) << 10 | b2 << 2 | (b1 & 192) >> 6);
            return { width, height, type: "webp" };
          }
        }
        offset += 8 + (chunkSize + 1 & -2);
      }
      throw new Error("Unsupported WEBP variant for size detection");
    }
    function readJpegSize(buf) {
      let offset = 2;
      while (offset < buf.length) {
        if (buf[offset] !== 255) {
          offset++;
          continue;
        }
        const marker = buf[offset + 1];
        if (marker >= 192 && marker <= 195 || marker >= 197 && marker <= 199 || marker >= 201 && marker <= 203 || marker >= 205 && marker <= 207) {
          buf.readUInt16BE(offset + 2);
          const height = buf.readUInt16BE(offset + 5);
          const width = buf.readUInt16BE(offset + 7);
          return { width, height, type: "jpeg" };
        }
        const blockLength = buf.readUInt16BE(offset + 2);
        if (!Number.isFinite(blockLength) || blockLength < 2) break;
        offset += 2 + blockLength;
      }
      throw new Error("JPEG size not found");
    }
    function parseSvgSize(buf) {
      const text = buf.toString("utf8");
      const a = text.indexOf("<svg");
      const b = text.indexOf("</svg>");
      const inner = a !== -1 && b !== -1 ? text.slice(a, b + 6) : text;
      const widthMatch = inner.match(/\bwidth\s*=\s*"([^"]+)"/i);
      const heightMatch = inner.match(/\bheight\s*=\s*"([^"]+)"/i);
      const viewBoxMatch = inner.match(/\bviewBox\s*=\s*"([^"]+)"/i);
      function toPx(v) {
        if (!v) return null;
        const m = String(v).trim().match(/([0-9.]+)\s*(px|pt|em|ex|cm|mm|in|%)?/i);
        if (!m) return null;
        const n = parseFloat(m[1]);
        const unit = (m[2] || "px").toLowerCase();
        const dpi = 96;
        switch (unit) {
          case "px":
            return n;
          case "pt":
            return n * dpi / 72;
          case "in":
            return n * dpi;
          case "cm":
            return n * dpi / 2.54;
          case "mm":
            return n * dpi / 25.4;
          case "em":
          case "ex":
            return n * 16;
          // rough fallback
          default:
            return null;
        }
      }
      let widthPx = widthMatch ? toPx(widthMatch[1]) : null;
      let heightPx = heightMatch ? toPx(heightMatch[1]) : null;
      if ((widthPx == null || heightPx == null) && viewBoxMatch) {
        const parts = viewBoxMatch[1].trim().split(/\s+/).map(Number);
        if (parts.length === 4) {
          const vbw = parts[2];
          const vbh = parts[3];
          if (!widthPx && vbh) widthPx = vbw;
          if (!heightPx && vbw) heightPx = vbh;
        }
      }
      if (!widthPx || !heightPx) {
        widthPx = widthPx || 100;
        heightPx = heightPx || 100;
      }
      return { width: widthPx, height: heightPx, type: "svg" };
    }
    function getImageDimensions(pathOrData) {
      const { buffer: buf, type } = readInputAsBuffer(pathOrData);
      let meta;
      if (isPng(buf)) meta = readPngSize(buf);
      else if (isJpeg(buf)) meta = readJpegSize(buf);
      else if (isGif(buf)) meta = readGifSize(buf);
      else if (isWebp(buf)) meta = readWebpSize(buf);
      else if (isSvg(buf)) meta = parseSvgSize(buf);
      else {
        const suffix = type === "path" && typeof pathOrData === "string" ? ` (path: ${pathOrData})` : "";
        throw new Error("Unsupported image format for provided source" + suffix);
      }
      const aspectRatio = meta.width > 0 && meta.height > 0 ? meta.width / meta.height : 1;
      return {
        width: meta.width,
        height: meta.height,
        aspectRatio,
        type: meta.type
      };
    }
    function imageSizingCrop(source, x, y, w, h, cx, cy, cw, ch) {
      const { aspectRatio } = getImageDimensions(source);
      const boxAspect = w / h;
      if (cx === void 0 || cy === void 0 || cw === void 0 || ch === void 0) {
        let cropXFrac, cropYFrac, cropWFrac, cropHFrac;
        if (aspectRatio >= boxAspect) {
          cropHFrac = 1;
          cropWFrac = boxAspect / aspectRatio;
          cropXFrac = (1 - cropWFrac) / 2;
          cropYFrac = 0;
        } else {
          cropWFrac = 1;
          cropHFrac = aspectRatio / boxAspect;
          cropXFrac = 0;
          cropYFrac = (1 - cropHFrac) / 2;
        }
        cx = cropXFrac;
        cy = cropYFrac;
        cw = cropWFrac;
        ch = cropHFrac;
      }
      let virtualW = w / cw;
      let virtualH = virtualW / aspectRatio;
      const eps = 1e-6;
      if (Math.abs(virtualH * ch - h) > eps) {
        virtualH = h / ch;
        virtualW = virtualH * aspectRatio;
      }
      const cropXIn = cx * virtualW;
      const cropYIn = cy * virtualH;
      return {
        x,
        y,
        w: virtualW,
        h: virtualH,
        sizing: {
          type: "crop",
          x: cropXIn,
          y: cropYIn,
          w,
          h
        }
      };
    }
    function imageSizingContain(source, x, y, w, h) {
      const { aspectRatio } = getImageDimensions(source);
      let w2, h2;
      const boxAspect = w / h;
      if (aspectRatio >= boxAspect) {
        w2 = w;
        h2 = w2 / aspectRatio;
      } else {
        h2 = h;
        w2 = h2 * aspectRatio;
      }
      return {
        x: x + (w - w2) / 2,
        y: y + (h - h2) / 2,
        w: w2,
        h: h2
      };
    }
    module.exports = {
      getImageDimensions,
      imageSizingCrop,
      imageSizingContain
    };
  }
});

// components/primitives.js
var require_primitives = __commonJS({
  "components/primitives.js"(exports$1, module) {
    var { imageSizingContain } = require_image();
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    function setBackground2(slide, color = TOKENS2.paper) {
      slide.background = { color };
    }
    function addTopRule2(slide, SH, color = TOKENS2.navy) {
      slide.addShape(SH.rect, {
        x: 0,
        y: 0,
        w: 13.333,
        h: 0.16,
        fill: { color },
        line: { color }
      });
    }
    function addSlideNumber2(slide, pptx, opts = {}) {
      slide.addText(String(pptx._slides.length).padStart(2, "0"), {
        x: opts.x || 10.75,
        y: opts.y || 0.26,
        w: opts.w || 1.9,
        h: opts.h || 0.7,
        fontFace: TYPOGRAPHY2.display,
        fontSize: opts.fontSize || 28,
        bold: true,
        color: opts.color || TOKENS2.sand,
        align: "right",
        margin: 0
      });
    }
    function addMarkBox2(slide, SH, logoMarkPath, opts = {}) {
      slide.addShape(SH.ellipse, {
        x: opts.x || 11.04,
        y: opts.y || 0.94,
        w: opts.w || 1.08,
        h: opts.h || 0.82,
        fill: { color: opts.fill || TOKENS2.softNeutral },
        line: { color: opts.fill || TOKENS2.softNeutral }
      });
      if (logoMarkPath) {
        slide.addImage({
          path: logoMarkPath,
          ...imageSizingContain(
            logoMarkPath,
            opts.imageX || 11.25,
            opts.imageY || 1.16,
            opts.imageW || 0.66,
            opts.imageH || 0.34
          )
        });
      }
    }
    function addChip2(slide, SH, text, opts = {}) {
      const x = opts.x || 0.72;
      const y = opts.y || 0.52;
      const w = opts.w || 2.15;
      const fill = opts.fill || TOKENS2.red;
      const color = opts.color || TOKENS2.white;
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h: opts.h || 0.34,
        rectRadius: opts.rectRadius || 0.05,
        fill: { color: fill },
        line: { color: fill }
      });
      slide.addText(text, {
        x: x + 0.12,
        y: y + 0.04,
        w: w - 0.24,
        h: 0.22,
        fontFace: TYPOGRAPHY2.body,
        fontSize: opts.fontSize || 9.5,
        bold: true,
        color,
        align: "center",
        margin: 0
      });
    }
    function addPill2(slide, SH, text, opts = {}) {
      slide.addShape(SH.roundRect, {
        x: opts.x,
        y: opts.y,
        w: opts.w || 1.2,
        h: opts.h || 0.28,
        rectRadius: opts.rectRadius || 0.05,
        fill: { color: opts.fill || TOKENS2.white },
        line: { color: opts.line || TOKENS2.border, pt: 1 }
      });
      slide.addText(text, {
        x: opts.x + 0.08,
        y: opts.y + 0.04,
        w: (opts.w || 1.2) - 0.16,
        h: (opts.h || 0.28) - 0.08,
        fontFace: TYPOGRAPHY2.body,
        fontSize: opts.fontSize || 9.5,
        bold: true,
        color: opts.color || TOKENS2.navy,
        align: "center",
        margin: 0
      });
    }
    function addCard2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: opts.rectRadius || 0.04,
        fill: { color: opts.fill || TOKENS2.white },
        line: { color: opts.line || TOKENS2.border, pt: 1 }
      });
      slide.addShape(SH.rect, {
        x: x + 0.1,
        y: y + 0.14,
        w: opts.accentW || 0.12,
        h: h - 0.28,
        fill: { color: opts.accent || TOKENS2.red },
        line: { color: opts.accent || TOKENS2.red }
      });
      slide.addText(opts.title || "", {
        x: x + 0.28,
        y: y + 0.12,
        w: w - 0.38,
        h: 0.34,
        fontFace: TYPOGRAPHY2.display,
        fontSize: opts.titleFontSize || 16,
        bold: true,
        color: opts.titleColor || TOKENS2.navy,
        margin: 0
      });
      if (opts.body) {
        slide.addText(opts.body, {
          x: x + 0.28,
          y: y + (opts.bodyYOffset || 0.5),
          w: w - 0.38,
          h: h - (opts.bodyYOffset || 0.5) - 0.14,
          fontFace: TYPOGRAPHY2.body,
          fontSize: opts.bodyFontSize || 12.5,
          color: opts.bodyColor || TOKENS2.ink,
          margin: 0,
          valign: "top",
          align: opts.bodyAlign || "left",
          breakLine: false
        });
      }
    }
    function addMiniCard2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const accentH = Math.max(0.02, h - 0.24);
      const titleH = Math.min(0.24, Math.max(0.18, h - 0.18));
      const bodyY = y + 0.44;
      const bodyH = Math.max(0, h - 0.54);
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: opts.rectRadius || 0.03,
        fill: { color: opts.fill || TOKENS2.white },
        line: { color: opts.line || TOKENS2.border, pt: 1 }
      });
      slide.addShape(SH.rect, {
        x: x + 0.08,
        y: y + 0.12,
        w: 0.11,
        h: accentH,
        fill: { color: opts.accent || TOKENS2.red },
        line: { color: opts.accent || TOKENS2.red }
      });
      slide.addText(opts.title || "", {
        x: x + 0.28,
        y: y + 0.14,
        w: w - 0.36,
        h: titleH,
        fontFace: TYPOGRAPHY2.display,
        fontSize: opts.titleFontSize || 12.5,
        bold: true,
        color: TOKENS2.navy,
        margin: 0
      });
      if (opts.body && bodyH > 0.08) {
        slide.addText(opts.body, {
          x: x + 0.28,
          y: bodyY,
          w: w - 0.36,
          h: bodyH,
          fontFace: TYPOGRAPHY2.body,
          fontSize: opts.bodyFontSize || 10.5,
          color: TOKENS2.ink,
          margin: 0,
          valign: "top"
        });
      }
    }
    function addCenterStatement2(slide, SH, text, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: opts.rectRadius || 0.04,
        fill: { color: opts.fill || TOKENS2.warm },
        line: { color: opts.fill || TOKENS2.warm }
      });
      slide.addText(text, {
        x: x + 0.22,
        y: y + 0.18,
        w: w - 0.44,
        h: h - 0.36,
        fontFace: TYPOGRAPHY2.display,
        fontSize: opts.fontSize || 22,
        bold: true,
        color: opts.color || TOKENS2.navy,
        align: "center",
        valign: "mid",
        margin: 0
      });
    }
    function addHeader2(slide, SH, pptx, title, subtitle, blockLabel, opts = {}) {
      setBackground2(slide, opts.background || TOKENS2.paper);
      addTopRule2(slide, SH, opts.ruleColor || TOKENS2.navy);
      addSlideNumber2(slide, pptx, opts.number || {});
      addChip2(slide, SH, opts.classLabel || `Clase \xB7 ${blockLabel || "Bloque"}`, {
        x: 0.72,
        y: 0.52,
        w: opts.chipW || 2.18,
        fill: TOKENS2.red
      });
      addMarkBox2(slide, SH, opts.logoMarkPath, opts.mark || {});
      slide.addText(title, {
        x: opts.titleX || 0.72,
        y: opts.titleY || 0.98,
        w: opts.titleW || 8.9,
        h: opts.titleH || 0.72,
        fontFace: TYPOGRAPHY2.display,
        fontSize: opts.titleFontSize || 24,
        bold: true,
        color: TOKENS2.navy,
        margin: 0
      });
      if (subtitle) {
        slide.addText(subtitle, {
          x: opts.subtitleX || 0.74,
          y: opts.subtitleY || 1.84,
          w: opts.subtitleW || 8.6,
          h: opts.subtitleH || 0.42,
          fontFace: TYPOGRAPHY2.body,
          fontSize: opts.subtitleFontSize || 12.5,
          color: TOKENS2.slate,
          margin: 0
        });
      }
    }
    module.exports = {
      setBackground: setBackground2,
      addTopRule: addTopRule2,
      addSlideNumber: addSlideNumber2,
      addMarkBox: addMarkBox2,
      addChip: addChip2,
      addPill: addPill2,
      addCard: addCard2,
      addMiniCard: addMiniCard2,
      addCenterStatement: addCenterStatement2,
      addHeader: addHeader2
    };
  }
});

// vendor/pptxgenjs_helpers/svg.js
var require_svg = __commonJS({
  "vendor/pptxgenjs_helpers/svg.js"(exports$1, module) {
    function toDataUri(svg) {
      return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
    }
    function sanitizeSvg(svg) {
      let inner = svg;
      const a = inner.indexOf("<svg");
      const b = inner.indexOf("</svg>");
      if (a !== -1 && b !== -1) inner = inner.slice(a, b + 6);
      inner = inner.replace(/<\?xml[^>]*>/g, "");
      if (!/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/.test(inner)) {
        inner = inner.replace(/<svg /, '<svg xmlns="http://www.w3.org/2000/svg" ');
      }
      inner = inner.replace(
        /(width|height)=\"([0-9.]+)(ex|em)\"/g,
        (_m, attr, num) => {
          const px = Math.round(parseFloat(num) * 8.5);
          return `${attr}="${px}px"`;
        }
      );
      inner = inner.replace(/currentColor/g, "#000000");
      return inner;
    }
    function svgToDataUri(svg) {
      return toDataUri(sanitizeSvg(svg));
    }
    module.exports = {
      toDataUri,
      sanitizeSvg,
      svgToDataUri
    };
  }
});

// utils/code.js
var require_code = __commonJS({
  "utils/code.js"(exports$1, module) {
    var fs = __require("fs");
    var Prism = __require("prismjs");
    var { svgToDataUri } = require_svg();
    var THEME_MAP;
    var FALLBACK_COLORS = {
      plain: "F8F8F2",
      comment: "8292A2",
      punctuation: "F8F8F2",
      tag: "F92672",
      attrName: "A6E22E",
      attrValue: "E6DB74",
      string: "E6DB74",
      keyword: "66D9EF",
      function: "A6E22E",
      operator: "F8F8F2",
      number: "AE81FF",
      boolean: "AE81FF",
      property: "66D9EF",
      className: "A6E22E",
      regex: "FD971F"
    };
    function loadPrismLanguage(lang) {
      const normalized = String(lang || "plaintext").toLowerCase();
      const aliases = {
        js: "javascript",
        ts: "typescript",
        py: "python",
        sh: "bash",
        yml: "yaml",
        html: "markup",
        xml: "markup"
      };
      const id = aliases[normalized] || normalized;
      if (!Prism.languages[id]) {
        try {
          __require(`prismjs/components/prism-${id}`);
        } catch (_error) {
        }
      }
      return Prism.languages[id] || Prism.languages.plain || {};
    }
    function buildThemeMap2(themeCssModule = "prismjs/themes/prism-okaidia.css") {
      try {
        const css = fs.readFileSync(__require.resolve(themeCssModule), "utf8");
        return Object.fromEntries(
          [...css.matchAll(/\.token\.([\w-]+)[^{]*\{[^}]*color:\s*([^;\s]+)[^}]*\}/g)].map(
            ([, token, color]) => [token, color.replace(/#|!important/g, "").trim()]
          )
        );
      } catch (_error) {
        return { plain: "FFFFFF", comment: "999999" };
      }
    }
    function getThemeMap() {
      if (!THEME_MAP) THEME_MAP = buildThemeMap2();
      return THEME_MAP;
    }
    function normalizeType(type = "plain") {
      const raw = Array.isArray(type) ? type[0] : type;
      const key = String(raw || "plain").replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      return key || "plain";
    }
    function resolveColor(type = "plain") {
      const theme = getThemeMap();
      const normalized = normalizeType(type);
      return theme[normalized] || theme[String(normalized).replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)] || FALLBACK_COLORS[normalized] || theme.plain || FALLBACK_COLORS.plain;
    }
    function createRun(text, type = "plain", fontSize = 11.5) {
      return {
        text,
        options: {
          fontFace: "Consolas",
          color: resolveColor(type),
          fontSize
        }
      };
    }
    function escapeXml(text) {
      return String(text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    }
    function normalizeSegmentText(text) {
      return String(text || "").replace(/\t/g, "  ");
    }
    function mergeSegment(segments, text, type = "plain") {
      if (!text) return;
      const color = resolveColor(type);
      const last = segments[segments.length - 1];
      if (last && last.color === color) {
        last.text += text;
        return;
      }
      segments.push({ text, color });
    }
    function tokensToSegments(tokens, inheritedType = "plain", segments = []) {
      tokens.forEach((token) => {
        if (typeof token === "string") {
          mergeSegment(segments, token, inheritedType);
          return;
        }
        const nextType = token.alias || token.type || inheritedType;
        if (Array.isArray(token.content)) {
          tokensToSegments(token.content, nextType, segments);
          return;
        }
        mergeSegment(segments, token.content, nextType);
      });
      return segments;
    }
    function tokensToRuns(tokens, fontSize, inheritedType = "plain") {
      return tokens.flatMap(
        (token) => typeof token === "string" ? [createRun(token, inheritedType, fontSize)] : Array.isArray(token.content) ? tokensToRuns(token.content, fontSize, token.alias || token.type || inheritedType) : [createRun(token.content, token.alias || token.type || inheritedType, fontSize)]
      );
    }
    function makeCodeRuns2(code2, lang = "html", fontSize = 11.5) {
      const grammar = loadPrismLanguage(lang);
      const lines = String(code2 || "").split("\n");
      const pad = lines.length.toString().length;
      return lines.flatMap((line, index) => {
        const lineRuns = [
          createRun(`${(index + 1).toString().padStart(pad, " ")} `, "comment", fontSize),
          ...tokensToRuns(Prism.tokenize(line, grammar), fontSize)
        ];
        if (index < lines.length - 1 && lineRuns.length > 0) {
          const last = lineRuns[lineRuns.length - 1];
          lineRuns[lineRuns.length - 1] = {
            ...last,
            options: {
              ...last.options || {},
              breakLine: true
            }
          };
        }
        return lineRuns;
      });
    }
    function makeCodeText2(code2) {
      const lines = String(code2 || "").split("\n");
      const pad = lines.length.toString().length;
      return {
        lineNumbers: lines.map((_, index) => String(index + 1).padStart(pad, " ")).join("\n"),
        codeText: lines.join("\n"),
        totalLines: lines.length,
        lineDigits: pad
      };
    }
    function makeCodeLines2(code2, lang = "html") {
      const grammar = loadPrismLanguage(lang);
      return String(code2 || "").split("\n").map((line) => ({
        segments: tokensToSegments(Prism.tokenize(line, grammar))
      }));
    }
    function makeCodeLineRuns2(code2, lang = "html", fontSize = 11.5) {
      const grammar = loadPrismLanguage(lang);
      return String(code2 || "").split("\n").map((line) => {
        const runs = tokensToRuns(Prism.tokenize(line, grammar), fontSize);
        return runs.length > 0 ? runs : [createRun(" ", "plain", fontSize)];
      });
    }
    function makeCodeSvgData2(code2, lang = "html", opts = {}) {
      const codeData = makeCodeText2(code2);
      const lines = makeCodeLines2(code2, lang);
      const pxPerIn = opts.pxPerIn || 240;
      const widthPx = Math.max(160, Math.round((opts.width || 4.2) * pxPerIn));
      const heightPx = Math.max(80, Math.round((opts.height || 2.4) * pxPerIn));
      const fontSizePt = opts.fontSize || 11.5;
      const fontSizePx = Math.max(11, Math.round(fontSizePt / 72 * pxPerIn));
      const charWidthPx = Math.max(6, (opts.charW || 0.07) * pxPerIn);
      const linePitchPx = Math.max(16, (opts.linePitch || 0.18) * pxPerIn);
      const lineDigits = opts.lineDigits || codeData.lineDigits || 1;
      const lineNumberRightX = Math.max(18, Math.round((lineDigits + 0.72) * charWidthPx));
      const codeStartX = Math.round((lineDigits + 1) * charWidthPx);
      const topOffsetPx = Math.max(0, Math.round((opts.topOffset || 0) * pxPerIn));
      const lineBaselineOffsetPx = Math.max(12, Math.round(fontSizePx * 0.84));
      const clipId = `code-clip-${codeData.totalLines}-${lineDigits}-${widthPx}-${heightPx}`;
      const numberColor = resolveColor("comment");
      const svgLines = [];
      lines.forEach((line, index) => {
        const lineTop = topOffsetPx + index * linePitchPx + lineBaselineOffsetPx;
        const lineNumber = escapeXml(String(index + 1).padStart(lineDigits, " "));
        svgLines.push(
          `<text x="${lineNumberRightX}" y="${lineTop}" fill="#${numberColor}" text-anchor="end">${lineNumber}</text>`
        );
        const tspans = line.segments.map((segment) => {
          const segmentText = normalizeSegmentText(segment.text);
          if (!segmentText) return "";
          return `<tspan fill="#${segment.color}" xml:space="preserve">${escapeXml(segmentText)}</tspan>`;
        }).filter(Boolean).join("");
        svgLines.push(
          `<text x="${codeStartX}" y="${lineTop}" xml:space="preserve">${tspans || " "}</text>`
        );
      });
      const svg = [
        `<svg xmlns="http://www.w3.org/2000/svg" width="${widthPx}" height="${heightPx}" viewBox="0 0 ${widthPx} ${heightPx}" overflow="hidden">`,
        `<defs><clipPath id="${clipId}"><rect x="0" y="0" width="${widthPx}" height="${heightPx}" rx="0" ry="0"/></clipPath></defs>`,
        `<g clip-path="url(#${clipId})" font-family="Consolas, 'Courier New', monospace" font-size="${fontSizePx}" font-weight="400">`,
        svgLines.join(""),
        "</g>",
        "</svg>"
      ].join("");
      return svgToDataUri(svg).slice(5);
    }
    module.exports = {
      makeCodeRuns: makeCodeRuns2,
      makeCodeText: makeCodeText2,
      makeCodeLines: makeCodeLines2,
      makeCodeLineRuns: makeCodeLineRuns2,
      makeCodeSvgData: makeCodeSvgData2,
      buildThemeMap: buildThemeMap2
    };
  }
});

// components/code-panel.js
var require_code_panel = __commonJS({
  "components/code-panel.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    var { makeCodeText: makeCodeText2, makeCodeSvgData: makeCodeSvgData2 } = require_code();
    function resolveHighlightFill(color) {
      if (color === TOKENS2.red) return TOKENS2.paleRed;
      if (color === TOKENS2.navy) return TOKENS2.softBlue;
      if (color === TOKENS2.gold || color === TOKENS2.warning) return TOKENS2.warm;
      return TOKENS2.softNeutral;
    }
    function addBadge(slide, SH, x, y, size, color, label, fontSize) {
      slide.addShape(SH.roundRect, {
        x: x - size / 2,
        y: y - size / 2,
        w: size,
        h: size,
        rectRadius: size / 2,
        fill: { color },
        line: { color }
      });
      if (!label) return;
      slide.addText(String(label), {
        x: x - size / 2,
        y: y - size / 2 + 0.01,
        w: size,
        h: size - 0.02,
        fontFace: TYPOGRAPHY2.body,
        fontSize,
        bold: true,
        color: TOKENS2.white,
        align: "center",
        valign: "mid",
        margin: 0
      });
    }
    function addTargetTab(slide, SH, x, y, w, h, color, label, fontSize) {
      slide.addShape(SH.roundRect, {
        x,
        y: y - h / 2,
        w,
        h,
        rectRadius: 0.04,
        fill: { color },
        line: { color }
      });
      if (!label) return;
      slide.addText(String(label), {
        x,
        y: y - h / 2 + 0.01,
        w,
        h: h - 0.02,
        fontFace: TYPOGRAPHY2.body,
        fontSize,
        bold: true,
        color: TOKENS2.white,
        align: "center",
        valign: "mid",
        margin: 0
      });
    }
    function addPort(slide, SH, edgeX, y, w, h, color, side = "right") {
      slide.addShape(SH.roundRect, {
        x: side === "right" ? edgeX + 0.02 : edgeX - w - 0.02,
        y: y - h / 2,
        w,
        h,
        rectRadius: Math.min(0.05, h / 2),
        fill: { color },
        line: { color }
      });
    }
    function getCodeMetrics(opts = {}) {
      const fontSize = opts.fontSize || 11.2;
      const code2 = opts.code || "";
      const totalLines = opts.totalLines || Math.max(1, String(code2).split("\n").length);
      const digits = opts.lineDigits || String(totalLines).length;
      const charW = opts.charW || Math.min(0.085, Math.max(0.058, fontSize * 68e-4));
      const linePitch = opts.linePitch || Math.max(0.16, fontSize / 72 * (opts.lineHeight || 1.26));
      return {
        codeX: opts.x,
        codeY: opts.y,
        codeW: opts.w,
        codeH: opts.h,
        fontSize,
        totalLines,
        lineDigits: digits,
        charW,
        linePitch,
        textOffsetX: opts.textOffsetX || 0.24,
        textOffsetY: opts.textOffsetY || 0.62,
        textAreaH: opts.textAreaH || opts.h - 0.82
      };
    }
    function addCodeFocus(slide, SH, metrics, opts = {}) {
      const totalLines = metrics.totalLines || 1;
      const lineNumber = opts.lineNumber || 1;
      const color = opts.color || TOKENS2.red;
      const highlightFill = opts.highlightFill || resolveHighlightFill(color);
      const fontSize = opts.fontSize || metrics.fontSize || 11.2;
      const linePitch = opts.linePitch || metrics.linePitch;
      const digits = opts.lineDigits || metrics.lineDigits || String(totalLines).length;
      const charW = opts.charW || metrics.charW || Math.min(0.085, Math.max(0.058, fontSize * 68e-4));
      const textOffsetX = opts.textOffsetX || metrics.textOffsetX || 0.24;
      const textOffsetY = opts.textOffsetY || metrics.textOffsetY || 0.62;
      const column = opts.column || 1;
      const tokenLength = opts.length || 4;
      const codeStartX = metrics.codeX + textOffsetX + (digits + 1) * charW;
      const markerX = codeStartX + (column - 1) * charW;
      const markerW = Math.max(0.16, tokenLength * charW);
      const highlightX = Math.max(codeStartX - 0.02, markerX - 0.06);
      const highlightY = metrics.codeY + textOffsetY + (lineNumber - 1) * linePitch + linePitch * 0.14;
      const highlightW = Math.max(
        0.22,
        Math.min(metrics.codeX + metrics.codeW - 0.34 - highlightX, markerW + 0.18)
      );
      const highlightH = opts.highlightH || Math.max(0.18, linePitch * 0.72);
      slide.addShape(SH.roundRect, {
        x: highlightX,
        y: highlightY,
        w: highlightW,
        h: highlightH,
        rectRadius: 0.04,
        fill: { color: highlightFill, transparency: 68 },
        line: { color: highlightFill, transparency: 100, pt: 0 }
      });
    }
    function addCodePanel2(slide, SH, opts = {}) {
      slide.addShape(SH.roundRect, {
        x: opts.x,
        y: opts.y,
        w: opts.w,
        h: opts.h,
        rectRadius: opts.rectRadius || 0.04,
        fill: { color: opts.fill || TOKENS2.editorBg },
        line: { color: opts.fill || TOKENS2.editorBg }
      });
      if (opts.title) {
        slide.addShape(SH.roundRect, {
          x: opts.x + 0.14,
          y: opts.y + 0.12,
          w: opts.w - 0.28,
          h: 0.34,
          rectRadius: 0.03,
          fill: { color: opts.titleFill || TOKENS2.titleFill },
          line: { color: opts.titleFill || TOKENS2.titleFill }
        });
        slide.addText(opts.title, {
          x: opts.x + 0.26,
          y: opts.y + 0.2,
          w: opts.w - 0.52,
          h: 0.16,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 10,
          bold: true,
          color: TOKENS2.white,
          margin: 0
        });
      }
      const metrics = getCodeMetrics(opts);
      const codeData = makeCodeText2(opts.code || "");
      const codeImageX = metrics.codeX + metrics.textOffsetX;
      const codeImageY = metrics.codeY + metrics.textOffsetY;
      const codeImageW = Math.max(0.4, metrics.codeW - metrics.textOffsetX - 0.22);
      const codeImageH = Math.max(0.2, metrics.textAreaH);
      if (Array.isArray(opts.annotations)) {
        opts.annotations.forEach((annotation) => {
          addCodeFocus(slide, SH, metrics, annotation);
        });
      }
      slide.addImage({
        data: makeCodeSvgData2(opts.code || "", opts.lang || "html", {
          width: codeImageW,
          height: codeImageH,
          fontSize: metrics.fontSize,
          linePitch: metrics.linePitch,
          charW: metrics.charW,
          lineDigits: codeData.lineDigits,
          topOffset: opts.topOffset != null ? opts.topOffset : opts.title ? 0.06 : 0.03
        }),
        x: codeImageX,
        y: codeImageY,
        w: codeImageW,
        h: codeImageH
      });
      return {
        ...metrics,
        totalLines: codeData.totalLines,
        lineDigits: codeData.lineDigits
      };
    }
    function addSegment(slide, SH, x, y, w, h, color) {
      slide.addShape(SH.rect, {
        x,
        y,
        w,
        h,
        fill: { color },
        line: { color }
      });
    }
    function addCodeAnnotation2(slide, SH, opts = {}) {
      const codeX = opts.codeX;
      const codeY = opts.codeY;
      const codeW = opts.codeW;
      const codeH = opts.codeH;
      const totalLines = opts.totalLines || 1;
      const lineNumber = opts.lineNumber || 1;
      const color = opts.color || TOKENS2.red;
      const connectorColor = opts.connectorColor || TOKENS2.guide || TOKENS2.slate;
      opts.highlightFill || resolveHighlightFill(color);
      const textOffsetX = opts.textOffsetX || 0.24;
      const textOffsetY = opts.textOffsetY || 0.62;
      opts.textAreaH || codeH - 0.82;
      const fontSize = opts.fontSize || 11.2;
      const linePitch = opts.linePitch || Math.max(0.16, fontSize / 72 * (opts.lineHeight || 1.26));
      const digits = opts.lineDigits || String(totalLines).length;
      const charW = opts.charW || Math.min(0.085, Math.max(0.058, fontSize * 68e-4));
      const side = opts.side || "right";
      const stroke = opts.stroke || 0.018;
      const badgeText = opts.badgeText != null ? String(opts.badgeText) : "";
      const showBadge = opts.showBadge !== false;
      const badgeSize = opts.badgeSize || (badgeText ? 0.18 : 0.1);
      const badgeFontSize = opts.badgeFontSize || (badgeText ? 7.6 : 6.2);
      const sourceBadgeStyle = opts.sourceBadgeStyle || "port";
      const targetBadgeStyle = opts.targetBadgeStyle || "none";
      const showTargetBadgeLabel = opts.showTargetBadgeLabel === true;
      const targetBadgeW = opts.targetBadgeW || (showTargetBadgeLabel ? 0.24 : 0.12);
      const targetBadgeH = opts.targetBadgeH || 0.18;
      const targetBadgeFontSize = opts.targetBadgeFontSize || 7.4;
      const sourcePortW = opts.sourcePortW || 0.08;
      const sourcePortH = opts.sourcePortH || 0.18;
      const codeStartX = codeX + textOffsetX + (digits + 1) * charW;
      const column = opts.column || 1;
      const tokenLength = opts.length || 4;
      const markerX = codeStartX + (column - 1) * charW;
      const markerW = Math.max(0.16, tokenLength * charW);
      const anchorY = codeY + textOffsetY + (lineNumber - 1) * linePitch + linePitch * 0.52;
      const markerY = codeY + textOffsetY + (lineNumber - 1) * linePitch + linePitch * 0.8;
      const markerH = opts.markerH || 0.05;
      opts.highlightH || Math.max(0.18, linePitch * 0.74);
      const edgeX = side === "right" ? codeX + codeW : codeX;
      const sourceBadgeX = side === "right" ? codeX + codeW + badgeSize * 0.56 : codeX - badgeSize * 0.56;
      const laneX = opts.laneX || (side === "right" ? edgeX + 0.18 : edgeX - 0.18);
      let toX = opts.toX;
      let toY = opts.toY;
      let targetBadgeX;
      let targetBadgeY;
      let targetSide;
      if (opts.target) {
        targetSide = opts.target.side || (side === "right" ? "left" : "right");
        targetBadgeX = targetSide === "left" ? opts.target.x - targetBadgeW / 2 : opts.target.x + opts.target.w - targetBadgeW / 2;
        targetBadgeY = (opts.target.y || 0) + (opts.target.anchorY != null ? opts.target.anchorY : (opts.target.h || 0) / 2);
        toX = targetBadgeStyle === "tab" ? targetSide === "left" ? targetBadgeX : targetBadgeX + targetBadgeW : targetSide === "left" ? opts.target.x : opts.target.x + opts.target.w;
        toY = (opts.target.y || 0) + (opts.target.anchorY != null ? opts.target.anchorY : (opts.target.h || 0) / 2);
      }
      const routeY = opts.routeY;
      if (opts.showHighlight !== false) {
        addCodeFocus(slide, SH, {
          codeX,
          codeY,
          codeW,
          fontSize,
          totalLines,
          lineDigits: digits,
          charW,
          linePitch,
          textOffsetX,
          textOffsetY}, opts);
      }
      if (opts.showUnderline === true) {
        slide.addShape(SH.roundRect, {
          x: markerX,
          y: markerY,
          w: markerW,
          h: markerH,
          rectRadius: 0.02,
          fill: { color },
          line: { color }
        });
      }
      if (showBadge && sourceBadgeStyle === "circle") {
        addBadge(slide, SH, sourceBadgeX, anchorY, badgeSize, color, badgeText, badgeFontSize);
      } else if (showBadge && sourceBadgeStyle === "port") {
        addPort(slide, SH, edgeX, anchorY, sourcePortW, sourcePortH, color, side);
      }
      const firstSegmentEndX = showBadge && sourceBadgeStyle === "circle" ? side === "right" ? sourceBadgeX - badgeSize / 2 : sourceBadgeX + badgeSize / 2 : showBadge && sourceBadgeStyle === "port" ? side === "right" ? edgeX + 0.02 : edgeX - 0.02 : edgeX;
      const firstSegX = Math.min(edgeX, firstSegmentEndX);
      const firstSegW = Math.abs(firstSegmentEndX - edgeX);
      addSegment(
        slide,
        SH,
        firstSegX,
        anchorY - stroke / 2,
        Math.max(stroke, firstSegW),
        stroke,
        connectorColor
      );
      const laneStartX = showBadge && sourceBadgeStyle === "circle" ? side === "right" ? sourceBadgeX + badgeSize / 2 : sourceBadgeX - badgeSize / 2 : showBadge && sourceBadgeStyle === "port" ? side === "right" ? edgeX + 0.02 + sourcePortW : edgeX - 0.02 - sourcePortW : edgeX;
      addSegment(
        slide,
        SH,
        Math.min(laneStartX, laneX),
        anchorY - stroke / 2,
        Math.max(stroke, Math.abs(laneX - laneStartX)),
        stroke,
        connectorColor
      );
      if (routeY != null) {
        addSegment(
          slide,
          SH,
          laneX - stroke / 2,
          Math.min(anchorY, routeY),
          stroke,
          Math.max(stroke, Math.abs(routeY - anchorY)),
          connectorColor
        );
        addSegment(
          slide,
          SH,
          Math.min(laneX, toX),
          routeY - stroke / 2,
          Math.max(stroke, Math.abs(toX - laneX)),
          stroke,
          connectorColor
        );
        addSegment(
          slide,
          SH,
          toX - stroke / 2,
          Math.min(routeY, toY),
          stroke,
          Math.max(stroke, Math.abs(toY - routeY)),
          connectorColor
        );
      } else {
        addSegment(
          slide,
          SH,
          laneX - stroke / 2,
          Math.min(anchorY, toY),
          stroke,
          Math.max(stroke, Math.abs(toY - anchorY)),
          connectorColor
        );
        addSegment(
          slide,
          SH,
          Math.min(laneX, toX),
          toY - stroke / 2,
          Math.max(stroke, Math.abs(toX - laneX)),
          stroke,
          connectorColor
        );
      }
      if (showBadge && targetBadgeX != null) {
        if (targetBadgeStyle === "circle") {
          addBadge(slide, SH, targetBadgeX, toY, badgeSize, color, badgeText, badgeFontSize);
        } else if (targetBadgeStyle === "tab") {
          addTargetTab(
            slide,
            SH,
            targetBadgeX,
            targetBadgeY != null ? targetBadgeY : toY,
            targetBadgeW,
            targetBadgeH,
            color,
            showTargetBadgeLabel ? badgeText : "",
            targetBadgeFontSize
          );
        }
      }
    }
    module.exports = {
      addCodePanel: addCodePanel2,
      addCodeAnnotation: addCodeAnnotation2
    };
  }
});

// components/terminal-panel.js
var require_terminal_panel = __commonJS({
  "components/terminal-panel.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    function addTerminalPanel2(slide, SH, opts = {}) {
      slide.addShape(SH.roundRect, {
        x: opts.x,
        y: opts.y,
        w: opts.w,
        h: opts.h,
        rectRadius: 0.04,
        fill: { color: opts.fill || TOKENS2.terminalBg },
        line: { color: opts.fill || TOKENS2.terminalBg }
      });
      slide.addShape(SH.roundRect, {
        x: opts.x + 0.14,
        y: opts.y + 0.12,
        w: opts.w - 0.28,
        h: 0.34,
        rectRadius: 0.03,
        fill: { color: "1E2937" },
        line: { color: "1E2937" }
      });
      slide.addText(opts.title || "Terminal", {
        x: opts.x + 0.28,
        y: opts.y + 0.2,
        w: opts.w - 0.56,
        h: 0.14,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 10,
        bold: true,
        color: TOKENS2.white,
        margin: 0
      });
      const lines = opts.lines || [];
      lines.forEach((line, index) => {
        const y = opts.y + 0.62 + index * 0.28;
        if (line.prompt) {
          slide.addText(line.prompt, {
            x: opts.x + 0.24,
            y,
            w: 0.36,
            h: 0.18,
            fontFace: TYPOGRAPHY2.mono,
            fontSize: opts.fontSize || 11,
            bold: true,
            color: TOKENS2.terminalPrompt,
            margin: 0
          });
        }
        slide.addText(line.text || "", {
          x: opts.x + (line.prompt ? 0.58 : 0.24),
          y,
          w: opts.w - 0.82,
          h: 0.18,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: opts.fontSize || 11,
          color: line.kind === "muted" ? TOKENS2.terminalMuted : TOKENS2.terminalOutput,
          margin: 0
        });
      });
    }
    module.exports = {
      addTerminalPanel: addTerminalPanel2
    };
  }
});

// components/browser-mock.js
var require_browser_mock = __commonJS({
  "components/browser-mock.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    function getAddressChromeMetrics(width) {
      if (width < 2.1) {
        return {
          circleX: 0.12,
          circleGap: 0.12,
          circleSize: 0.065,
          addressX: 0.42,
          addressY: 0.105,
          addressW: Math.max(0.9, width - 0.52),
          addressH: 0.205,
          textInset: 0.06,
          fontSize: 6.2,
          align: "center"
        };
      }
      if (width < 3) {
        return {
          circleX: 0.14,
          circleGap: 0.13,
          circleSize: 0.07,
          addressX: 0.48,
          addressY: 0.105,
          addressW: Math.max(1.1, width - 0.6),
          addressH: 0.205,
          textInset: 0.07,
          fontSize: 7,
          align: "left"
        };
      }
      return {
        circleX: 0.16,
        circleGap: 0.16,
        circleSize: 0.08,
        addressX: 0.62,
        addressY: 0.11,
        addressW: width - 1,
        addressH: 0.2,
        textInset: 0.16,
        fontSize: 8.8,
        align: "left"
      };
    }
    function getCompactUrlDisplay(rawUrl, width) {
      const fallback = "app.local";
      const source = String(rawUrl || fallback).trim();
      let host = source;
      let path = "";
      try {
        const normalized = source.includes("://") ? source : `https://${source}`;
        const parsed = new URL(normalized);
        host = parsed.hostname || fallback;
        path = parsed.pathname && parsed.pathname !== "/" ? parsed.pathname.replace(/^\/+/, "") : "";
      } catch {
        const stripped = source.replace(/^[a-z]+:\/\//i, "");
        const parts = stripped.split("/");
        host = parts[0] || fallback;
        path = parts[1] || "";
      }
      if (width < 2.1) {
        if (host.length > 10) {
          return `${host.slice(0, 9)}\u2026`;
        }
        return host;
      }
      if (!path) {
        return host;
      }
      const combined = `${host}/${path}`;
      if (combined.length > 18) {
        return `${host}/\u2026`;
      }
      return combined;
    }
    function addBrowserMock2(slide, SH, opts = {}) {
      const metrics = getAddressChromeMetrics(opts.w);
      const displayUrl = opts.compactUrl || opts.w < 3 ? getCompactUrlDisplay(opts.url, opts.w) : opts.url || "https://app.local";
      slide.addShape(SH.roundRect, {
        x: opts.x,
        y: opts.y,
        w: opts.w,
        h: opts.h,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addShape(SH.roundRect, {
        x: opts.x,
        y: opts.y,
        w: opts.w,
        h: 0.42,
        rectRadius: 0.04,
        fill: { color: TOKENS2.softNeutral },
        line: { color: TOKENS2.softNeutral }
      });
      ["D62027", "E0BC5A", "52606D"].forEach((color, index) => {
        slide.addShape(SH.ellipse, {
          x: opts.x + metrics.circleX + index * metrics.circleGap,
          y: opts.y + 0.14,
          w: metrics.circleSize,
          h: metrics.circleSize,
          fill: { color },
          line: { color }
        });
      });
      slide.addShape(SH.roundRect, {
        x: opts.x + metrics.addressX,
        y: opts.y + metrics.addressY,
        w: metrics.addressW,
        h: metrics.addressH,
        rectRadius: 0.03,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addText(displayUrl, {
        x: opts.x + metrics.addressX + metrics.textInset,
        y: opts.y + 0.15,
        w: Math.max(0.2, metrics.addressW - metrics.textInset * 2),
        h: 0.12,
        fontFace: TYPOGRAPHY2.body,
        fontSize: metrics.fontSize,
        color: TOKENS2.slate,
        margin: 0,
        fit: "shrink",
        align: metrics.align
      });
      if (opts.title) {
        slide.addText(opts.title, {
          x: opts.x + 0.22,
          y: opts.y + 0.62,
          w: opts.w - 0.44,
          h: 0.22,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 16,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
      }
    }
    module.exports = {
      addBrowserMock: addBrowserMock2
    };
  }
});

// components/form-mock.js
var require_form_mock = __commonJS({
  "components/form-mock.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    function addFormMock2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const title = opts.title || "Formulario";
      const fields = opts.fields || [];
      const buttonLabel = opts.buttonLabel || "Enviar";
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addText(title, {
        x: x + 0.28,
        y: y + 0.3,
        w: w - 0.56,
        h: 0.36,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 18,
        bold: true,
        color: TOKENS2.navy,
        margin: 0
      });
      fields.forEach((field, index) => {
        const fieldY = y + 0.88 + index * 0.86;
        slide.addText(field.label, {
          x: x + 0.3,
          y: fieldY,
          w: w - 0.6,
          h: 0.16,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 11,
          bold: true,
          color: TOKENS2.slate,
          margin: 0
        });
        slide.addShape(SH.roundRect, {
          x: x + 0.28,
          y: fieldY + 0.24,
          w: w - 0.56,
          h: field.multiline ? 0.74 : 0.48,
          rectRadius: 0.03,
          fill: { color: TOKENS2.paper },
          line: { color: TOKENS2.border, pt: 1 }
        });
      });
      const buttonW = opts.buttonW || 1.36;
      const buttonX = x + (w - buttonW) / 2;
      const buttonY = y + h - 0.7;
      slide.addShape(SH.roundRect, {
        x: buttonX,
        y: buttonY,
        w: buttonW,
        h: 0.42,
        rectRadius: 0.03,
        fill: { color: TOKENS2.red },
        line: { color: TOKENS2.red }
      });
      slide.addText(buttonLabel, {
        x: buttonX,
        y: buttonY + 0.08,
        w: buttonW,
        h: 0.18,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 10.5,
        bold: true,
        color: TOKENS2.white,
        align: "center",
        valign: "mid",
        margin: 0
      });
    }
    module.exports = {
      addFormMock: addFormMock2
    };
  }
});

// components/dom-tree.js
var require_dom_tree = __commonJS({
  "components/dom-tree.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    function getTone(tone) {
      switch (tone) {
        case "red":
          return { fill: TOKENS2.paleRed, line: TOKENS2.paleRed, accent: TOKENS2.red };
        case "blue":
          return { fill: TOKENS2.softBlue, line: TOKENS2.softBlue, accent: TOKENS2.navy };
        case "gold":
          return { fill: TOKENS2.softNeutral, line: TOKENS2.softNeutral, accent: TOKENS2.gold };
        case "neutral":
        default:
          return { fill: TOKENS2.white, line: TOKENS2.border, accent: TOKENS2.slate };
      }
    }
    function addDomTreePanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const title = opts.title || "\xC1rbol DOM";
      const subtitle = opts.subtitle || "";
      const nodes = opts.nodes || [];
      const rowH = opts.rowH || 0.28;
      const rowGap = opts.rowGap || 0.12;
      const indent = opts.indent || 0.34;
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addShape(SH.roundRect, {
        x: x + 0.14,
        y: y + 0.14,
        w: w - 0.28,
        h: 0.34,
        rectRadius: 0.03,
        fill: { color: TOKENS2.softNeutral },
        line: { color: TOKENS2.softNeutral }
      });
      slide.addText(title, {
        x: x + 0.26,
        y: y + 0.21,
        w: w - 0.52,
        h: 0.16,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 11,
        bold: true,
        color: TOKENS2.navy,
        margin: 0
      });
      if (subtitle) {
        slide.addText(subtitle, {
          x: x + 0.22,
          y: y + 0.56,
          w: w - 0.44,
          h: 0.24,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9.5,
          color: TOKENS2.slate,
          margin: 0
        });
      }
      const contentX = x + 0.28;
      const contentY = y + (subtitle ? 0.96 : 0.78);
      const contentW = w - 0.56;
      const contentH = h - (subtitle ? 1.16 : 0.98);
      const maxDepth = nodes.reduce((max, node) => Math.max(max, node.depth || 0), 0);
      const totalRowsH = nodes.length * rowH + Math.max(0, nodes.length - 1) * rowGap;
      const guideH = Math.min(contentH, totalRowsH + 0.08);
      slide.addShape(SH.roundRect, {
        x: contentX,
        y: contentY,
        w: contentW,
        h: contentH,
        rectRadius: 0.03,
        fill: { color: TOKENS2.paper },
        line: { color: TOKENS2.paper }
      });
      for (let depth = 1; depth <= maxDepth; depth += 1) {
        slide.addShape(SH.line, {
          x: contentX + 0.18 + depth * indent,
          y: contentY + 0.1,
          w: 0,
          h: guideH,
          line: { color: TOKENS2.border, pt: 0.8 }
        });
      }
      nodes.forEach((node, index) => {
        const depth = node.depth || 0;
        const tone = getTone(node.tone);
        const rowY = contentY + 0.1 + index * (rowH + rowGap);
        const chipX = contentX + 0.18 + depth * indent;
        const chipW = node.width || Math.min(1.38, Math.max(0.66, 0.44 + node.tag.length * 0.11));
        const detailX = chipX + chipW + 0.14;
        if (depth > 0) {
          slide.addShape(SH.line, {
            x: chipX - 0.14,
            y: rowY + rowH / 2,
            w: 0.14,
            h: 0,
            line: { color: TOKENS2.guide, pt: 1.1 }
          });
        }
        slide.addShape(SH.ellipse, {
          x: chipX - 0.18,
          y: rowY + rowH / 2 - 0.04,
          w: 0.08,
          h: 0.08,
          fill: { color: tone.accent },
          line: { color: tone.accent }
        });
        slide.addShape(SH.roundRect, {
          x: chipX,
          y: rowY,
          w: chipW,
          h: rowH,
          rectRadius: 0.03,
          fill: { color: tone.fill },
          line: { color: tone.line, pt: 1 }
        });
        slide.addText(node.tag, {
          x: chipX + 0.08,
          y: rowY + 0.06,
          w: chipW - 0.16,
          h: rowH - 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9.6,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          valign: "mid",
          fit: "shrink"
        });
        if (node.detail) {
          slide.addText(node.detail, {
            x: detailX,
            y: rowY + 0.05,
            w: contentX + contentW - detailX - 0.08,
            h: rowH,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 9.1,
            color: TOKENS2.slate,
            margin: 0,
            valign: "mid",
            fit: "shrink"
          });
        }
      });
    }
    module.exports = {
      addDomTreePanel: addDomTreePanel2
    };
  }
});

// components/frontend-panels.js
var require_frontend_panels = __commonJS({
  "components/frontend-panels.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    var { svgToDataUri } = require_svg();
    function asSvgColor(color) {
      const value = String(color || TOKENS2.navy).trim();
      return value.startsWith("#") ? value : `#${value}`;
    }
    function getBlueprintIcon(kind, opts = {}) {
      const stroke = asSvgColor(opts.stroke || TOKENS2.navy);
      const accent = asSvgColor(opts.accent || TOKENS2.red);
      const secondary = asSvgColor(opts.secondary || TOKENS2.gold);
      const icons = {
        sheet: `
      <rect x="14" y="12" width="36" height="40" rx="5" fill="none" stroke="${stroke}" stroke-width="3"/>
      <path d="M22 24 H42" stroke="${stroke}" stroke-width="3" stroke-linecap="round"/>
      <path d="M22 32 H42" stroke="${stroke}" stroke-width="3" stroke-linecap="round"/>
      <path d="M22 40 H34" stroke="${stroke}" stroke-width="3" stroke-linecap="round"/>
      <rect x="18" y="16" width="10" height="6" rx="2" fill="${accent}"/>
    `,
        database: `
      <ellipse cx="32" cy="16" rx="16" ry="6" fill="none" stroke="${stroke}" stroke-width="3"/>
      <path d="M16 16 V38 C16 41.5 23.2 44 32 44 C40.8 44 48 41.5 48 38 V16" fill="none" stroke="${stroke}" stroke-width="3"/>
      <path d="M16 27 C16 30.5 23.2 33 32 33 C40.8 33 48 30.5 48 27" fill="none" stroke="${accent}" stroke-width="3"/>
      <path d="M16 38 C16 41.5 23.2 44 32 44 C40.8 44 48 41.5 48 38" fill="none" stroke="${secondary}" stroke-width="3"/>
    `,
        building: `
      <rect x="18" y="14" width="28" height="36" rx="4" fill="none" stroke="${stroke}" stroke-width="3"/>
      <rect x="24" y="20" width="5" height="5" rx="1.2" fill="${accent}"/>
      <rect x="35" y="20" width="5" height="5" rx="1.2" fill="${secondary}"/>
      <rect x="24" y="30" width="5" height="5" rx="1.2" fill="${secondary}"/>
      <rect x="35" y="30" width="5" height="5" rx="1.2" fill="${accent}"/>
      <rect x="29" y="40" width="6" height="10" rx="1.5" fill="none" stroke="${stroke}" stroke-width="3"/>
    `,
        user: `
      <circle cx="32" cy="22" r="8" fill="none" stroke="${stroke}" stroke-width="3"/>
      <path d="M18 47 C20.5 39.5 26 36 32 36 C38 36 43.5 39.5 46 47" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
    `,
        link: `
      <rect x="12" y="24" width="18" height="12" rx="6" fill="none" stroke="${stroke}" stroke-width="3"/>
      <rect x="34" y="24" width="18" height="12" rx="6" fill="none" stroke="${stroke}" stroke-width="3"/>
      <path d="M26 30 H38" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
    `,
        key: `
      <circle cx="22" cy="28" r="8" fill="none" stroke="${stroke}" stroke-width="3"/>
      <path d="M30 28 H46" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
      <path d="M40 28 V34" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
      <path d="M46 28 V32" stroke="${secondary}" stroke-width="3" stroke-linecap="round"/>
    `,
        sql: `
      <rect x="12" y="14" width="40" height="36" rx="5" fill="none" stroke="${stroke}" stroke-width="3"/>
      <path d="M20 24 H44" stroke="${stroke}" stroke-width="3" stroke-linecap="round"/>
      <path d="M20 32 H36" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
      <path d="M20 40 H30" stroke="${secondary}" stroke-width="3" stroke-linecap="round"/>
      <path d="M42 36 L48 30 L42 24" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    `
      };
      return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${icons[kind] || icons.sheet}
    </svg>
  `);
    }
    function addIconBadge(slide, SH, x, y, w, h, kind, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: 0.08,
        fill: { color: opts.fill || TOKENS2.softNeutral },
        line: { color: opts.line || opts.fill || TOKENS2.softNeutral, pt: 1 }
      });
      slide.addImage({
        data: getBlueprintIcon(kind, {
          stroke: opts.stroke || TOKENS2.navy,
          accent: opts.accent || TOKENS2.red,
          secondary: opts.secondary || TOKENS2.gold
        }),
        x: x + w * 0.18,
        y: y + h * 0.18,
        w: w * 0.64,
        h: h * 0.64
      });
    }
    function addSurface(slide, SH, x, y, w, h, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: opts.rectRadius || 0.04,
        fill: { color: opts.fill || TOKENS2.white },
        line: { color: opts.line || TOKENS2.border, pt: opts.linePt || 1 }
      });
    }
    function addSurfaceHeader(slide, SH, x, y, w, text, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h: opts.h || 0.34,
        rectRadius: opts.rectRadius || 0.03,
        fill: { color: opts.fill || TOKENS2.softNeutral },
        line: { color: opts.fill || TOKENS2.softNeutral }
      });
      slide.addText(text, {
        x: x + 0.12,
        y: y + 0.08,
        w: w - 0.24,
        h: (opts.h || 0.34) - 0.12,
        fontFace: TYPOGRAPHY2.body,
        fontSize: opts.fontSize || 9.8,
        bold: true,
        color: opts.color || TOKENS2.navy,
        margin: 0
      });
    }
    function addViewportCard(slide, SH, x, y, w, h, opts = {}) {
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: opts.line || TOKENS2.border
      });
      slide.addShape(SH.roundRect, {
        x: x + 0.1,
        y: y + 0.1,
        w: w - 0.2,
        h: 0.24,
        rectRadius: 0.03,
        fill: { color: TOKENS2.softNeutral },
        line: { color: TOKENS2.softNeutral }
      });
      ["D62027", "E0BC5A", "52606D"].forEach((color, index) => {
        slide.addShape(SH.ellipse, {
          x: x + 0.18 + index * 0.12,
          y: y + 0.17,
          w: 0.06,
          h: 0.06,
          fill: { color },
          line: { color }
        });
      });
      slide.addText(opts.label || "Viewport", {
        x: x + 0.12,
        y: y + 0.44,
        w: w - 0.24,
        h: 0.22,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 12.5,
        bold: true,
        color: TOKENS2.navy,
        margin: 0
      });
      if (opts.sizeLabel) {
        slide.addShape(SH.roundRect, {
          x: x + 0.12,
          y: y + 0.72,
          w: 0.98,
          h: 0.26,
          rectRadius: 0.03,
          fill: { color: opts.toneFill || TOKENS2.softBlue },
          line: { color: opts.toneFill || TOKENS2.softBlue }
        });
        slide.addText(opts.sizeLabel, {
          x: x + 0.2,
          y: y + 0.78,
          w: 0.82,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9.4,
          bold: true,
          color: opts.tone || TOKENS2.navy,
          margin: 0,
          align: "center"
        });
      }
      const screenX = x + 0.18;
      const screenY = y + 1.1;
      const screenW = w - 0.36;
      const screenH = h - 1.34;
      slide.addShape(SH.roundRect, {
        x: screenX,
        y: screenY,
        w: screenW,
        h: screenH,
        rectRadius: 0.03,
        fill: { color: TOKENS2.paper },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addShape(SH.rect, {
        x: screenX + 0.12,
        y: screenY + 0.12,
        w: screenW - 0.24,
        h: opts.heroH || 0.34,
        fill: { color: opts.heroFill || TOKENS2.navy },
        line: { color: opts.heroFill || TOKENS2.navy }
      });
      for (let index = 0; index < (opts.blockCount || 3); index += 1) {
        const blockY = screenY + 0.58 + index * 0.38;
        slide.addShape(SH.roundRect, {
          x: screenX + 0.12,
          y: blockY,
          w: screenW - 0.24,
          h: 0.22,
          rectRadius: 0.02,
          fill: { color: index % 2 === 0 ? TOKENS2.white : TOKENS2.mist },
          line: { color: index % 2 === 0 ? TOKENS2.border : TOKENS2.mist, pt: 1 }
        });
      }
      const notes = opts.notes || [];
      notes.slice(0, 3).forEach((note, index) => {
        slide.addShape(SH.ellipse, {
          x: x + 0.16,
          y: y + h - 0.7 + index * 0.18,
          w: 0.06,
          h: 0.06,
          fill: { color: opts.tone || TOKENS2.red },
          line: { color: opts.tone || TOKENS2.red }
        });
        slide.addText(note, {
          x: x + 0.28,
          y: y + h - 0.71 + index * 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          color: TOKENS2.slate,
          margin: 0
        });
      });
    }
    function addResponsiveViewportCompare2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const leftW = opts.leftW || w * 0.42;
      const rightW = opts.rightW || w * 0.42;
      const gap = opts.gap || w - leftW - rightW;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Responsive", {
        fill: TOKENS2.softNeutral
      });
      addViewportCard(slide, SH, x + 0.22, y + 0.62, leftW, h - 0.84, {
        label: opts.left && opts.left.label || "M\xF3vil",
        sizeLabel: opts.left && opts.left.sizeLabel || "390 px",
        notes: opts.left && opts.left.notes || ["Una columna", "M\xE1s aire", "Prioridad al CTA"],
        tone: TOKENS2.red,
        toneFill: TOKENS2.paleRed,
        heroFill: TOKENS2.red,
        blockCount: 4
      });
      slide.addShape(SH.chevron, {
        x: x + leftW + 0.34,
        y: y + h / 2 - 0.18,
        w: 0.44,
        h: 0.36,
        fill: { color: TOKENS2.gold },
        line: { color: TOKENS2.gold }
      });
      addViewportCard(slide, SH, x + leftW + gap + 0.1, y + 0.62, rightW, h - 0.84, {
        label: opts.right && opts.right.label || "Desktop",
        sizeLabel: opts.right && opts.right.sizeLabel || "1280 px",
        notes: opts.right && opts.right.notes || ["M\xE1s contexto", "Jerarqu\xEDa lateral", "Aprovecha el ancho"],
        tone: TOKENS2.navy,
        toneFill: TOKENS2.softBlue,
        heroFill: TOKENS2.navy,
        blockCount: 5
      });
    }
    function addMiniViewportScene(slide, SH, x, y, w, h, opts = {}) {
      const tone = opts.tone || TOKENS2.navy;
      const toneFill = opts.toneFill || TOKENS2.softBlue;
      const layout = opts.layout || "desktop";
      const label = opts.label || "Desktop";
      const sizeLabel = opts.sizeLabel || "1280 px";
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      slide.addShape(SH.rect, {
        x,
        y,
        w: 0.08,
        h,
        fill: { color: tone },
        line: { color: tone }
      });
      slide.addText(label, {
        x: x + 0.18,
        y: y + 0.16,
        w: w - 1.22,
        h: 0.16,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 11.4,
        bold: true,
        color: TOKENS2.navy,
        margin: 0
      });
      slide.addShape(SH.roundRect, {
        x: x + w - 0.96,
        y: y + 0.14,
        w: 0.78,
        h: 0.24,
        rectRadius: 0.03,
        fill: { color: toneFill },
        line: { color: toneFill }
      });
      slide.addText(sizeLabel, {
        x: x + w - 0.9,
        y: y + 0.2,
        w: 0.66,
        h: 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8.1,
        bold: true,
        color: tone,
        align: "center",
        margin: 0
      });
      const browserX = x + 0.16;
      const browserY = y + 0.54;
      const browserW = w - 0.32;
      const browserH = h - 0.96;
      slide.addShape(SH.roundRect, {
        x: browserX,
        y: browserY,
        w: browserW,
        h: browserH,
        rectRadius: 0.03,
        fill: { color: TOKENS2.paper },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addShape(SH.roundRect, {
        x: browserX,
        y: browserY,
        w: browserW,
        h: 0.24,
        rectRadius: 0.03,
        fill: { color: TOKENS2.softNeutral },
        line: { color: TOKENS2.softNeutral }
      });
      ["D62027", "E0BC5A", "52606D"].forEach((color, index) => {
        slide.addShape(SH.ellipse, {
          x: browserX + 0.1 + index * 0.1,
          y: browserY + 0.09,
          w: 0.05,
          h: 0.05,
          fill: { color },
          line: { color }
        });
      });
      const screenX = browserX + 0.12;
      const screenY = browserY + 0.34;
      const screenW = browserW - 0.24;
      const screenH = browserH - 0.48;
      const heroH = Math.max(0.18, Math.min(0.3, screenH * 0.18));
      const blockGap = 0.08;
      slide.addShape(SH.roundRect, {
        x: screenX,
        y: screenY,
        w: screenW,
        h: heroH,
        rectRadius: 0.02,
        fill: { color: tone },
        line: { color: tone }
      });
      if (layout === "desktop") {
        const contentY = screenY + heroH + blockGap;
        const leftW = screenW * 0.58;
        const rightW = screenW - leftW - blockGap;
        const leftH = Math.max(0.28, screenH - heroH - blockGap - 0.22);
        const smallH = Math.max(0.12, (leftH - blockGap) / 2);
        slide.addShape(SH.roundRect, {
          x: screenX,
          y: contentY,
          w: leftW,
          h: leftH,
          rectRadius: 0.02,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.border, pt: 1 }
        });
        slide.addShape(SH.roundRect, {
          x: screenX + leftW + blockGap,
          y: contentY,
          w: rightW,
          h: smallH,
          rectRadius: 0.02,
          fill: { color: TOKENS2.mist },
          line: { color: TOKENS2.mist }
        });
        slide.addShape(SH.roundRect, {
          x: screenX + leftW + blockGap,
          y: contentY + smallH + blockGap,
          w: rightW,
          h: smallH,
          rectRadius: 0.02,
          fill: { color: TOKENS2.softNeutral },
          line: { color: TOKENS2.softNeutral }
        });
      } else if (layout === "tablet") {
        const contentY = screenY + heroH + blockGap;
        const boxW = (screenW - blockGap) / 2;
        const midH = Math.max(0.18, screenH * 0.26);
        const footerH = Math.max(0.16, screenH - heroH - midH - blockGap * 2);
        slide.addShape(SH.roundRect, {
          x: screenX,
          y: contentY,
          w: boxW,
          h: midH,
          rectRadius: 0.02,
          fill: { color: TOKENS2.paleRed },
          line: { color: TOKENS2.paleRed }
        });
        slide.addShape(SH.roundRect, {
          x: screenX + boxW + blockGap,
          y: contentY,
          w: boxW,
          h: midH,
          rectRadius: 0.02,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.border, pt: 1 }
        });
        slide.addShape(SH.roundRect, {
          x: screenX,
          y: contentY + midH + blockGap,
          w: screenW,
          h: footerH,
          rectRadius: 0.02,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.border, pt: 1 }
        });
      } else {
        const contentY = screenY + heroH + blockGap;
        const stackH = Math.max(0.12, (screenH - heroH - blockGap * 3) / 3);
        for (let index = 0; index < 3; index += 1) {
          slide.addShape(SH.roundRect, {
            x: screenX,
            y: contentY + index * (stackH + blockGap),
            w: screenW,
            h: stackH,
            rectRadius: 0.02,
            fill: { color: index === 0 ? TOKENS2.paleRed : TOKENS2.white },
            line: { color: index === 0 ? TOKENS2.paleRed : TOKENS2.border, pt: 1 }
          });
        }
      }
      if (opts.behavior) {
        slide.addShape(SH.roundRect, {
          x: x + 0.18,
          y: y + h - 0.26,
          w: w - 0.36,
          h: 0.16,
          rectRadius: 0.02,
          fill: { color: opts.behaviorFill || TOKENS2.softNeutral },
          line: { color: opts.behaviorFill || TOKENS2.softNeutral }
        });
        slide.addText(opts.behavior, {
          x: x + 0.26,
          y: y + h - 0.22,
          w: w - 0.52,
          h: 0.08,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.8,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addResponsiveReflowPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const stages = opts.stages || [
        {
          label: "Desktop",
          sizeLabel: "1280 px",
          behavior: "mas contexto, jerarquia lateral",
          layout: "desktop",
          tone: TOKENS2.navy,
          toneFill: TOKENS2.softBlue
        },
        {
          label: "Tablet",
          sizeLabel: "820 px",
          behavior: "reacomoda bloques sin perder foco",
          layout: "tablet",
          tone: TOKENS2.gold,
          toneFill: TOKENS2.warm
        },
        {
          label: "Movil",
          sizeLabel: "390 px",
          behavior: "una columna y prioridad al CTA",
          layout: "mobile",
          tone: TOKENS2.red,
          toneFill: TOKENS2.paleRed
        }
      ];
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Reflow responsive", {
        fill: TOKENS2.softNeutral
      });
      const visibleStages = stages.slice(0, 3);
      const gap = 0.18;
      const footerReserve = opts.footer ? 0.34 : 0;
      const cardW = (w - 0.44 - gap * (visibleStages.length - 1)) / visibleStages.length;
      const cardH = h - 0.92 - footerReserve;
      const arrowW = Math.max(0.1, gap - 0.06);
      const arrowH = 0.26;
      const contentY = y + 0.58;
      visibleStages.forEach((stage, index) => {
        const cardX = x + 0.22 + index * (cardW + gap);
        addMiniViewportScene(slide, SH, cardX, contentY, cardW, cardH, stage);
        if (index < visibleStages.length - 1) {
          slide.addShape(SH.chevron, {
            x: cardX + cardW + (gap - arrowW) / 2,
            y: contentY + cardH / 2 - arrowH / 2,
            w: arrowW,
            h: arrowH,
            fill: { color: TOKENS2.gold },
            line: { color: TOKENS2.gold }
          });
        }
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addCssRuleStack2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const rules = opts.rules || [];
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Cascada y especificidad", {
        fill: TOKENS2.softBlue
      });
      rules.slice(0, 5).forEach((rule, index) => {
        const rowY = y + 0.66 + index * 0.56;
        const active = Boolean(rule.active);
        const fill = active ? TOKENS2.paleRed : TOKENS2.paper;
        const line = active ? TOKENS2.red : TOKENS2.border;
        const selectorW = w * 0.34;
        const specificityW = 0.88;
        slide.addShape(SH.roundRect, {
          x: x + 0.18,
          y: rowY,
          w: w - 0.36,
          h: 0.42,
          rectRadius: 0.03,
          fill: { color: fill },
          line: { color: line, pt: active ? 1.2 : 1 }
        });
        slide.addShape(SH.rect, {
          x: x + 0.18,
          y: rowY,
          w: 0.08,
          h: 0.42,
          fill: { color: active ? TOKENS2.red : TOKENS2.navy },
          line: { color: active ? TOKENS2.red : TOKENS2.navy }
        });
        slide.addText(rule.selector || ".card", {
          x: x + 0.34,
          y: rowY + 0.08,
          w: selectorW,
          h: 0.12,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 10.2,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(rule.declaration || "color: var(--ink);", {
          x: x + 0.34 + selectorW,
          y: rowY + 0.08,
          w: w - selectorW - specificityW - 0.92,
          h: 0.12,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 10,
          color: TOKENS2.ink,
          margin: 0
        });
        slide.addShape(SH.roundRect, {
          x: x + w - specificityW - 0.18,
          y: rowY + 0.08,
          w: specificityW,
          h: 0.24,
          rectRadius: 0.03,
          fill: { color: active ? TOKENS2.red : TOKENS2.softNeutral },
          line: { color: active ? TOKENS2.red : TOKENS2.softNeutral }
        });
        slide.addText(rule.specificity || "0,1,0", {
          x: x + w - specificityW - 0.12,
          y: rowY + 0.14,
          w: specificityW - 0.12,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          bold: true,
          color: active ? TOKENS2.white : TOKENS2.navy,
          align: "center",
          margin: 0
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.18,
          y: y + h - 0.32,
          w: w - 0.36,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9.2,
          color: TOKENS2.slate,
          margin: 0,
          align: "center"
        });
      }
    }
    function addBoxModelDiagram2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const innerW = w - 0.44;
      const innerH = h - 1.08;
      const stepInset = Math.min(0.3, Math.max(0.18, Math.min((innerW - 1.08) / 6, (innerH - 0.84) / 6)));
      const compact = w <= 3.4 || h <= 3.3;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Box model", {
        fill: TOKENS2.softNeutral
      });
      const levels = [
        { label: "margin", value: opts.margin || "24px", fill: TOKENS2.warm, line: TOKENS2.gold, depth: 0 },
        { label: "border", value: opts.border || "2px", fill: TOKENS2.softBlue, line: TOKENS2.navy, depth: 1 },
        { label: "padding", value: opts.padding || "16px", fill: TOKENS2.softNeutral, line: TOKENS2.sand, depth: 2 },
        { label: "content", value: opts.content || "320 x 120", fill: TOKENS2.white, line: TOKENS2.border, depth: 3 }
      ];
      levels.forEach((level, index) => {
        const inset = stepInset * level.depth;
        const currentX = x + 0.22 + inset;
        const currentY = y + 0.74 + inset;
        const currentW = w - 0.44 - inset * 2;
        const currentH = h - 1.08 - inset * 2;
        const labelW = Math.min(currentW - 0.88, compact ? 0.62 : 0.82);
        const valueW = compact ? 0.58 : 0.72;
        const textY = currentY + (compact ? 0.06 : 0.08);
        slide.addShape(SH.roundRect, {
          x: currentX,
          y: currentY,
          w: currentW,
          h: currentH,
          rectRadius: 0.03,
          fill: { color: level.fill },
          line: { color: level.line, pt: index === 3 ? 1 : 1.2 }
        });
        slide.addText(level.label, {
          x: currentX + 0.12,
          y: textY,
          w: labelW,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 8.6 : 9.4,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(level.value, {
          x: currentX + currentW - valueW - 0.12,
          y: textY,
          w: valueW,
          h: 0.12,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: compact ? 7.8 : 9,
          color: TOKENS2.slate,
          align: "right",
          margin: 0
        });
      });
    }
    function addFlexGridLayout2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const mode = opts.mode || "flex";
      const itemCount = opts.itemCount || 6;
      const columns = opts.columns || 3;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(
        slide,
        SH,
        x + 0.14,
        y + 0.14,
        w - 0.28,
        opts.title || (mode === "grid" ? "Grid layout" : "Flex layout"),
        {
          fill: mode === "grid" ? TOKENS2.softBlue : TOKENS2.paleRed
        }
      );
      const containerX = x + 0.22;
      const containerY = y + 0.68;
      const containerW = w - 0.44;
      const containerH = h - 0.96;
      slide.addShape(SH.roundRect, {
        x: containerX,
        y: containerY,
        w: containerW,
        h: containerH,
        rectRadius: 0.03,
        fill: { color: TOKENS2.paper },
        line: { color: TOKENS2.border, pt: 1 }
      });
      if (mode === "grid") {
        const rows = Math.ceil(itemCount / columns);
        const gap = Math.min(0.16, Math.max(0.04, containerH / (rows * 4 + 1)));
        const itemW = (containerW - gap * (columns + 1)) / columns;
        const itemH = (containerH - gap * (rows + 1)) / rows;
        for (let row = 0; row < rows; row += 1) {
          for (let col = 0; col < columns; col += 1) {
            const index = row * columns + col;
            if (index >= itemCount) continue;
            slide.addShape(SH.roundRect, {
              x: containerX + gap + col * (itemW + gap),
              y: containerY + gap + row * (itemH + gap),
              w: itemW,
              h: itemH,
              rectRadius: 0.03,
              fill: { color: index % 2 === 0 ? TOKENS2.softBlue : TOKENS2.white },
              line: { color: index % 2 === 0 ? TOKENS2.softBlue : TOKENS2.border, pt: 1 }
            });
          }
        }
      } else {
        const flexColumns = opts.flexColumns || (itemCount <= 3 ? itemCount : containerH < 0.92 ? 2 : 3);
        const rows = Math.ceil(itemCount / flexColumns);
        const gap = Math.min(rows > 1 ? 0.14 : 0.16, Math.max(0.04, containerH / (rows * 4 + 1)));
        const itemW = (containerW - gap * (flexColumns + 1)) / flexColumns;
        const itemH = (containerH - gap * (rows + 1)) / rows;
        for (let index = 0; index < itemCount; index += 1) {
          const row = Math.floor(index / flexColumns);
          const col = index % flexColumns;
          slide.addShape(SH.roundRect, {
            x: containerX + gap + col * (itemW + gap),
            y: containerY + gap + row * (itemH + gap),
            w: itemW,
            h: itemH,
            rectRadius: 0.03,
            fill: { color: index % 2 === 0 ? TOKENS2.paleRed : TOKENS2.white },
            line: { color: index % 2 === 0 ? TOKENS2.paleRed : TOKENS2.border, pt: 1 }
          });
        }
      }
    }
    function scoreTone(score) {
      if (score >= 90) return { ring: TOKENS2.success, fill: TOKENS2.successSoft };
      if (score >= 70) return { ring: TOKENS2.warning, fill: TOKENS2.warningSoft };
      return { ring: TOKENS2.red, fill: TOKENS2.paleRed };
    }
    function addLighthouseAuditCard2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const scores = opts.scores || [
        { label: "Performance", score: 86 },
        { label: "Accesibilidad", score: 94 },
        { label: "SEO", score: 92 },
        { label: "Buenas pr\xE1cticas", score: 88 }
      ];
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Auditor\xEDa r\xE1pida", {
        fill: TOKENS2.softBlue
      });
      const gap = 0.18;
      const footerReserve = opts.summary ? 0.34 : 0.12;
      const headerReserve = 0.74;
      const cardY = y + headerReserve;
      const cardH = Math.max(0.88, h - headerReserve - footerReserve);
      const cardW = (w - gap * 5) / 4;
      scores.slice(0, 4).forEach((item, index) => {
        const tone = scoreTone(item.score);
        const cardX = x + gap + index * (cardW + gap);
        const label = String(item.label || "");
        const compactLabel = label.length > 13 || cardH < 1.18;
        const ringSize = Math.min(0.68, Math.max(0.42, cardH * 0.42));
        const ringX = cardX + cardW / 2 - ringSize / 2;
        const ringY = cardY + Math.max(0.08, cardH * 0.12);
        const labelY = ringY + ringSize + Math.max(0.05, cardH * 0.12);
        const labelH = Math.max(0.18, cardY + cardH - 0.08 - labelY);
        slide.addShape(SH.roundRect, {
          x: cardX,
          y: cardY,
          w: cardW,
          h: cardH,
          rectRadius: 0.03,
          fill: { color: tone.fill },
          line: { color: tone.fill }
        });
        slide.addShape(SH.ellipse, {
          x: ringX,
          y: ringY,
          w: ringSize,
          h: ringSize,
          fill: { color: TOKENS2.white },
          line: { color: tone.ring, pt: ringSize < 0.54 ? 2.6 : 3.6 }
        });
        slide.addText(String(item.score), {
          x: cardX + cardW / 2 - ringSize * 0.42,
          y: ringY + ringSize * 0.3,
          w: ringSize * 0.84,
          h: ringSize * 0.3,
          fontFace: TYPOGRAPHY2.display,
          fontSize: ringSize < 0.54 ? 11.6 : 16,
          bold: true,
          color: TOKENS2.navy,
          align: "center",
          margin: 0
        });
        slide.addText(label, {
          x: cardX + 0.08,
          y: labelY,
          w: cardW - 0.16,
          h: labelH,
          fontFace: TYPOGRAPHY2.body,
          fontSize: compactLabel ? 7.6 : 9.2,
          bold: true,
          color: TOKENS2.navy,
          align: "center",
          margin: 0,
          valign: "mid"
        });
      });
      if (opts.summary) {
        slide.addText(opts.summary, {
          x: x + 0.18,
          y: y + h - 0.22,
          w: w - 0.36,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.6,
          color: TOKENS2.slate,
          margin: 0,
          align: "center"
        });
      }
    }
    function addPerformanceMetricsBoard2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const metrics = (opts.metrics || [
        {
          label: "LCP",
          value: "2.4 s",
          note: "cuando aparece el contenido principal",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm
        },
        {
          label: "CLS",
          value: "0.04",
          note: "si la interfaz salta mientras carga",
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue
        },
        {
          label: "INP",
          value: "180 ms",
          note: "qu\xE9 tan bien responde la interacci\xF3n",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        }
      ]).slice(0, 4);
      const footerReserve = opts.footer ? 0.28 : 0;
      const cols = metrics.length <= 3 ? metrics.length : 2;
      const rows = Math.ceil(metrics.length / cols);
      const gapX = 0.16;
      const gapY = 0.18;
      const innerY = y + 0.66;
      const innerH = h - 0.86 - footerReserve;
      const cardW = (w - 0.32 - gapX * (cols - 1)) / cols;
      const cardH = (innerH - gapY * (rows - 1)) / rows;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "M\xE9tricas que conviene interpretar", {
        fill: TOKENS2.softNeutral
      });
      metrics.forEach((metric, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const cardX = x + 0.16 + col * (cardW + gapX);
        const cardY = innerY + row * (cardH + gapY);
        const accent = metric.accent || TOKENS2.navy;
        const fill = metric.fill || TOKENS2.softBlue;
        addSurface(slide, SH, cardX, cardY, cardW, cardH, {
          fill,
          line: fill
        });
        slide.addShape(SH.rect, {
          x: cardX + 0.1,
          y: cardY + 0.12,
          w: 0.08,
          h: cardH - 0.24,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(metric.label || "LCP", {
          x: cardX + 0.22,
          y: cardY + 0.16,
          w: cardW - 0.44,
          h: 0.14,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 12.6,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(metric.value || "0", {
          x: cardX + 0.22,
          y: cardY + 0.42,
          w: cardW - 0.44,
          h: 0.24,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 18.2,
          bold: true,
          color: accent,
          margin: 0
        });
        slide.addText(metric.note || "", {
          x: cardX + 0.22,
          y: cardY + 0.76,
          w: cardW - 0.34,
          h: Math.max(0.2, cardH - 0.9),
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.7,
          color: TOKENS2.slate,
          margin: 0,
          valign: "mid"
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addNetworkLoadBoard2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const resources = (opts.resources || [
        {
          label: "hero-producto.webp",
          kind: "img",
          sizeLabel: "480 KB",
          durationLabel: "620 ms",
          weight: 0.92,
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        },
        {
          label: "app.css",
          kind: "css",
          sizeLabel: "96 KB",
          durationLabel: "180 ms",
          weight: 0.44,
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue
        },
        {
          label: "carousel.js",
          kind: "js",
          sizeLabel: "210 KB",
          durationLabel: "360 ms",
          weight: 0.68,
          accent: TOKENS2.gold,
          fill: TOKENS2.warm
        },
        {
          label: "analytics.js",
          kind: "3rd",
          sizeLabel: "52 KB",
          durationLabel: "240 ms",
          weight: 0.36,
          accent: TOKENS2.navy,
          fill: TOKENS2.white
        }
      ]).slice(0, 5);
      const footerReserve = opts.footer ? 0.3 : 0;
      const summaryW = Math.max(2.1, w * 0.28);
      const listW = w - summaryW - 0.36;
      const innerY = y + 0.66;
      const innerH = h - 0.86 - footerReserve;
      const rowGap = 0.1;
      const rowH = Math.max(0.44, (innerH - rowGap * (resources.length - 1)) / resources.length);
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Lectura inicial de carga", {
        fill: TOKENS2.softNeutral
      });
      resources.forEach((resource, index) => {
        const rowY = innerY + index * (rowH + rowGap);
        const accent = resource.accent || TOKENS2.navy;
        const fill = resource.fill || TOKENS2.softBlue;
        const barW = Math.max(0.32, (listW - 2.54) * Math.max(0.12, Math.min(1, resource.weight || 0.4)));
        addSurface(slide, SH, x + 0.16, rowY, listW, rowH, {
          fill: index % 2 === 0 ? TOKENS2.white : TOKENS2.paper,
          line: TOKENS2.border
        });
        slide.addShape(SH.roundRect, {
          x: x + 0.28,
          y: rowY + 0.12,
          w: 0.54,
          h: 0.2,
          rectRadius: 0.03,
          fill: { color: fill },
          line: { color: fill }
        });
        slide.addText(resource.kind || "res", {
          x: x + 0.32,
          y: rowY + 0.165,
          w: 0.46,
          h: 0.08,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.6,
          bold: true,
          color: accent,
          align: "center",
          margin: 0
        });
        slide.addText(resource.label || "resource.js", {
          x: x + 0.92,
          y: rowY + 0.11,
          w: listW - 3.02,
          h: 0.14,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(`${resource.sizeLabel || ""} \xB7 ${resource.durationLabel || ""}`, {
          x: x + listW - 1.86,
          y: rowY + 0.11,
          w: 1.56,
          h: 0.14,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.2,
          color: TOKENS2.slate,
          align: "right",
          margin: 0
        });
        slide.addShape(SH.roundRect, {
          x: x + 0.92,
          y: rowY + rowH - 0.22,
          w: listW - 1.22,
          h: 0.08,
          rectRadius: 0.02,
          fill: { color: TOKENS2.mist },
          line: { color: TOKENS2.mist }
        });
        slide.addShape(SH.roundRect, {
          x: x + 0.92,
          y: rowY + rowH - 0.22,
          w: barW,
          h: 0.08,
          rectRadius: 0.02,
          fill: { color: accent },
          line: { color: accent }
        });
      });
      addSurface(slide, SH, x + listW + 0.28, innerY, summaryW - 0.12, innerH, {
        fill: TOKENS2.softNeutral,
        line: TOKENS2.softNeutral
      });
      slide.addText(opts.summaryTitle || "Qu\xE9 conviene leer", {
        x: x + listW + 0.46,
        y: innerY + 0.16,
        w: summaryW - 0.48,
        h: 0.14,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 12.4,
        bold: true,
        color: TOKENS2.navy,
        margin: 0
      });
      slide.addText(
        opts.summaryBody || "peso de recursos, orden de carga, terceros y si lo principal aparece tarde frente a elementos secundarios.",
        {
          x: x + listW + 0.46,
          y: innerY + 0.44,
          w: summaryW - 0.52,
          h: innerH - 0.58,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.7,
          color: TOKENS2.ink,
          margin: 0,
          valign: "mid"
        }
      );
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addQualityDimensionsPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const dimensions = (opts.dimensions || [
        {
          title: "SEO tecnico",
          body: "la pagina debe dejar claro de que trata y como se estructura",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        },
        {
          title: "Rendimiento",
          body: "cargar mejor tambien es parte de la experiencia real",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm
        },
        {
          title: "Accesibilidad",
          body: "una interfaz clara debe poder leerse y usarse mejor",
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue
        },
        {
          title: "Auditoria",
          body: "medir y revisar permite pasar de intuicion a evidencia",
          accent: TOKENS2.navy,
          fill: TOKENS2.mist
        }
      ]).slice(0, 4);
      const footerReserve = opts.footer ? 0.3 : 0;
      const compact = w < 8;
      const cols = compact ? 2 : Math.max(1, dimensions.length);
      const rows = compact ? Math.ceil(dimensions.length / 2) : 1;
      const gapX = 0.18;
      const gapY = 0.18;
      const bodyY = y + 0.86;
      const bodyH = h - 1.1 - footerReserve;
      const cardW = (w - 0.32 - gapX * (cols - 1)) / cols;
      const cardH = (bodyH - gapY * (rows - 1)) / rows;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Capas de calidad web", {
        fill: TOKENS2.softNeutral
      });
      slide.addShape(SH.roundRect, {
        x: x + w / 2 - 0.86,
        y: y + 0.5,
        w: 1.72,
        h: 0.24,
        rectRadius: 0.04,
        fill: { color: TOKENS2.navy },
        line: { color: TOKENS2.navy }
      });
      slide.addText(opts.centerLabel || "Calidad web", {
        x: x + w / 2 - 0.74,
        y: y + 0.56,
        w: 1.48,
        h: 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8.6,
        bold: true,
        color: TOKENS2.white,
        align: "center",
        margin: 0
      });
      dimensions.forEach((dimension, index) => {
        const col = compact ? index % cols : index;
        const row = compact ? Math.floor(index / cols) : 0;
        const cardX = x + 0.16 + col * (cardW + gapX);
        const cardY = bodyY + row * (cardH + gapY);
        const accent = dimension.accent || TOKENS2.navy;
        const fill = dimension.fill || TOKENS2.softBlue;
        addSurface(slide, SH, cardX, cardY, cardW, cardH, {
          fill,
          line: fill
        });
        slide.addShape(SH.rect, {
          x: cardX + 0.1,
          y: cardY + 0.12,
          w: 0.08,
          h: cardH - 0.24,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(dimension.title || "Dimension", {
          x: cardX + 0.28,
          y: cardY + 0.16,
          w: cardW - 0.42,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: compact ? 11.6 : 12,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          fit: "shrink"
        });
        slide.addText(dimension.body || "", {
          x: cardX + 0.28,
          y: cardY + 0.42,
          w: cardW - 0.42,
          h: Math.max(0.3, cardH - 0.56),
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 8.1 : 8.4,
          color: TOKENS2.ink,
          margin: 0,
          fit: "shrink",
          valign: "mid"
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addAuditEvidenceBoard2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const items = (opts.items || [
        {
          title: "Documento",
          body: "title, headings, meta y estructura ayudan a entender la pagina",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        },
        {
          title: "Recursos",
          body: "imagenes, CSS, JS y terceros muestran donde se va el peso",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm
        },
        {
          title: "Metricas",
          body: "LCP, CLS e INP acercan la lectura tecnica a la experiencia real",
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue
        },
        {
          title: "Alertas",
          body: "auditorias y paneles senalan problemas, pero no todos pesan igual",
          accent: TOKENS2.navy,
          fill: TOKENS2.mist
        }
      ]).slice(0, 4);
      const steps = (opts.steps || [
        "leer la senal",
        "ordenar impacto",
        "validar en navegador"
      ]).slice(0, 3);
      const footerReserve = opts.footer ? 0.3 : 0;
      const compact = w < 7.8;
      const bodyY = y + 0.62;
      const bodyH = h - 0.82 - footerReserve;
      const gap = 0.18;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Evidencia que conviene leer", {
        fill: TOKENS2.softBlue
      });
      const drawEvidenceTile = (tileX, tileY, tileW, tileH, item) => {
        const accent = item.accent || TOKENS2.navy;
        const fill = item.fill || TOKENS2.softBlue;
        addSurface(slide, SH, tileX, tileY, tileW, tileH, {
          fill,
          line: fill
        });
        slide.addShape(SH.rect, {
          x: tileX + 0.1,
          y: tileY + 0.12,
          w: 0.08,
          h: tileH - 0.24,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(item.title || "Senal", {
          x: tileX + 0.28,
          y: tileY + 0.16,
          w: tileW - 0.4,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          fit: "shrink"
        });
        slide.addText(item.body || "", {
          x: tileX + 0.28,
          y: tileY + 0.4,
          w: tileW - 0.42,
          h: Math.max(0.28, tileH - 0.52),
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8,
          color: TOKENS2.ink,
          margin: 0,
          fit: "shrink",
          valign: "mid"
        });
      };
      if (compact) {
        const gridH = Math.max(1.58, bodyH * 0.56);
        const summaryY = bodyY + gridH + gap;
        const summaryH = bodyH - gridH - gap;
        const tileW = (w - 0.32 - gap) / 2;
        const tileH = (gridH - gap) / 2;
        items.forEach((item, index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          drawEvidenceTile(
            x + 0.16 + col * (tileW + gap),
            bodyY + row * (tileH + gap),
            tileW,
            tileH,
            item
          );
        });
        addSurface(slide, SH, x + 0.16, summaryY, w - 0.32, summaryH, {
          fill: TOKENS2.softNeutral,
          line: TOKENS2.softNeutral
        });
        slide.addText(opts.insightTitle || "Lectura tecnica", {
          x: x + 0.32,
          y: summaryY + 0.16,
          w: w - 0.64,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 12.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(
          opts.insightBody || "La calidad se vuelve visible cuando cruzamos documento, recursos, metricas y alertas con criterio.",
          {
            x: x + 0.32,
            y: summaryY + 0.38,
            w: w - 0.64,
            h: Math.max(0.24, summaryH - 0.62),
            fontFace: TYPOGRAPHY2.body,
            fontSize: 8.2,
            color: TOKENS2.ink,
            margin: 0,
            fit: "shrink"
          }
        );
      } else {
        const leftW = Math.max(4.36, Math.min(w * 0.63, w - 2.26));
        const rightW = w - leftW - gap - 0.32;
        const leftX = x + 0.16;
        const rightX = leftX + leftW + gap;
        const tileW = (leftW - gap) / 2;
        const tileH = (bodyH - gap) / 2;
        items.forEach((item, index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          drawEvidenceTile(
            leftX + col * (tileW + gap),
            bodyY + row * (tileH + gap),
            tileW,
            tileH,
            item
          );
        });
        addSurface(slide, SH, rightX, bodyY, rightW, bodyH, {
          fill: TOKENS2.softNeutral,
          line: TOKENS2.softNeutral
        });
        slide.addText(opts.insightTitle || "Lectura tecnica", {
          x: rightX + 0.16,
          y: bodyY + 0.16,
          w: rightW - 0.32,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 12.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(
          opts.insightBody || "No todo hallazgo pesa igual. La tarea es cruzar estructura, carga, metricas y alertas antes de decidir.",
          {
            x: rightX + 0.16,
            y: bodyY + 0.38,
            w: rightW - 0.32,
            h: 0.54,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 8.3,
            color: TOKENS2.ink,
            margin: 0,
            fit: "shrink"
          }
        );
        steps.forEach((step, index) => {
          const rowY = bodyY + 1.06 + index * 0.46;
          const accent = index === 0 ? TOKENS2.red : index === 1 ? TOKENS2.gold : TOKENS2.navy;
          slide.addShape(SH.roundRect, {
            x: rightX + 0.16,
            y: rowY,
            w: rightW - 0.32,
            h: 0.3,
            rectRadius: 0.03,
            fill: { color: TOKENS2.white },
            line: { color: TOKENS2.border, pt: 1 }
          });
          slide.addShape(SH.ellipse, {
            x: rightX + 0.26,
            y: rowY + 0.1,
            w: 0.1,
            h: 0.1,
            fill: { color: accent },
            line: { color: accent }
          });
          slide.addText(step, {
            x: rightX + 0.42,
            y: rowY + 0.08,
            w: rightW - 0.58,
            h: 0.12,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 8.4,
            bold: true,
            color: TOKENS2.ink,
            margin: 0,
            fit: "shrink"
          });
        });
      }
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addAuditScorePanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const items = (opts.items || [
        { label: "SEO", score: 94, note: "estructura y metadatos comprensibles" },
        { label: "Rendimiento", score: 72, note: "hay costo visible en la primera vista" },
        { label: "Accesibilidad", score: 89, note: "la base est\xE1 razonable, pero faltan ajustes" },
        { label: "Buenas pr\xE1cticas", score: 86, note: "sirve como lectura inicial, no como juicio final" }
      ]).slice(0, 4);
      const footerReserve = opts.footer ? 0.28 : 0;
      const gap = 0.18;
      const compact = w < 7 || h < 2.9;
      const cols = compact ? 2 : Math.max(1, items.length);
      const rows = compact ? Math.ceil(items.length / 2) : 1;
      const bodyY = y + 0.62;
      const bodyH = h - 0.82 - footerReserve;
      const cardW = (w - 0.32 - gap * (cols - 1)) / cols;
      const cardH = (bodyH - gap * (rows - 1)) / rows;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Lectura r\xE1pida de auditor\xEDa", {
        fill: TOKENS2.softBlue
      });
      items.forEach((item, index) => {
        const col = compact ? index % cols : index;
        const row = compact ? Math.floor(index / cols) : 0;
        const cardX = x + 0.16 + col * (cardW + gap);
        const cardY = bodyY + row * (cardH + gap);
        const tone = scoreTone(Number(item.score || 0));
        const ringSize = Math.min(0.62, Math.max(0.4, cardH * 0.34));
        addSurface(slide, SH, cardX, cardY, cardW, cardH, {
          fill: tone.fill,
          line: tone.fill
        });
        slide.addShape(SH.rect, {
          x: cardX + 0.1,
          y: cardY + 0.12,
          w: 0.08,
          h: cardH - 0.24,
          fill: { color: tone.ring },
          line: { color: tone.ring }
        });
        slide.addText(item.label || "Score", {
          x: cardX + 0.28,
          y: cardY + 0.16,
          w: cardW - 1.08,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: compact ? 10.8 : 11.4,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          fit: "shrink"
        });
        slide.addShape(SH.ellipse, {
          x: cardX + cardW - ringSize - 0.18,
          y: cardY + 0.12,
          w: ringSize,
          h: ringSize,
          fill: { color: TOKENS2.white },
          line: { color: tone.ring, pt: ringSize < 0.5 ? 2.4 : 3.2 }
        });
        slide.addText(String(item.score ?? ""), {
          x: cardX + cardW - ringSize - 0.18,
          y: cardY + 0.12 + ringSize * 0.29,
          w: ringSize,
          h: ringSize * 0.28,
          fontFace: TYPOGRAPHY2.display,
          fontSize: ringSize < 0.5 ? 10.6 : 13.4,
          bold: true,
          color: TOKENS2.navy,
          align: "center",
          margin: 0
        });
        slide.addText(item.note || "", {
          x: cardX + 0.28,
          y: cardY + 0.56,
          w: cardW - 0.42,
          h: Math.max(0.24, cardH - 0.72),
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 7.6 : 8.1,
          color: TOKENS2.ink,
          margin: 0,
          fit: "shrink",
          valign: "mid"
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addAccessibilityChecklistPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const items = (opts.items || [
        { label: "Contraste", note: "el texto debe sostener lectura sobre el fondo", status: "critical" },
        { label: "Labels", note: "campos y controles no deber\xEDan quedar an\xF3nimos", status: "warn" },
        { label: "Texto alternativo", note: "las im\xE1genes relevantes necesitan contexto", status: "warn" },
        { label: "Foco visible", note: "el recorrido de teclado no puede desaparecer", status: "ok" }
      ]).slice(0, 6);
      const footerReserve = opts.footer ? 0.28 : 0;
      const compact = w < 7.4 || items.length <= 3;
      const cols = compact ? 1 : 2;
      const rows = Math.ceil(items.length / cols);
      const gapX = 0.18;
      const gapY = 0.16;
      const bodyY = y + 0.62;
      const bodyH = h - 0.82 - footerReserve;
      const cardW = (w - 0.32 - gapX * (cols - 1)) / cols;
      const cardH = (bodyH - gapY * (rows - 1)) / rows;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Checklist inicial de accesibilidad", {
        fill: TOKENS2.softNeutral
      });
      items.forEach((item, index) => {
        const col = compact ? 0 : index % cols;
        const row = compact ? index : Math.floor(index / cols);
        const cardX = x + 0.16 + col * (cardW + gapX);
        const cardY = bodyY + row * (cardH + gapY);
        const status = item.status || "warn";
        const accent = status === "critical" ? TOKENS2.red : status === "ok" ? TOKENS2.success : TOKENS2.gold;
        const fill = status === "critical" ? TOKENS2.paleRed : status === "ok" ? TOKENS2.successSoft : TOKENS2.warm;
        const badgeText = status === "critical" ? "cr\xEDtico" : status === "ok" ? "ok" : "revisar";
        addSurface(slide, SH, cardX, cardY, cardW, cardH, {
          fill,
          line: fill
        });
        slide.addShape(SH.rect, {
          x: cardX + 0.1,
          y: cardY + 0.12,
          w: 0.08,
          h: cardH - 0.24,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(item.label || "Criterio", {
          x: cardX + 0.28,
          y: cardY + 0.16,
          w: cardW - 1.08,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11.4,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          fit: "shrink"
        });
        slide.addShape(SH.roundRect, {
          x: cardX + cardW - 0.88,
          y: cardY + 0.12,
          w: 0.72,
          h: 0.22,
          rectRadius: 0.03,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.white }
        });
        slide.addText(badgeText, {
          x: cardX + cardW - 0.82,
          y: cardY + 0.18,
          w: 0.6,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.2,
          bold: true,
          color: accent,
          align: "center",
          margin: 0,
          fit: "shrink"
        });
        slide.addText(item.note || "", {
          x: cardX + 0.28,
          y: cardY + 0.44,
          w: cardW - 0.42,
          h: Math.max(0.22, cardH - 0.56),
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 7.8 : 8,
          color: TOKENS2.ink,
          margin: 0,
          fit: "shrink",
          valign: "mid"
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addIssuePriorityMatrix2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const items = (opts.items || [
        { label: "Contraste pobre", impact: "high", urgency: "high", accent: TOKENS2.red, fill: TOKENS2.paleRed },
        { label: "Links ambiguos", impact: "high", urgency: "low", accent: TOKENS2.gold, fill: TOKENS2.warm },
        { label: "Alt ausente", impact: "low", urgency: "high", accent: TOKENS2.navy, fill: TOKENS2.softBlue },
        { label: "Orden visual irregular", impact: "low", urgency: "low", accent: TOKENS2.navy, fill: TOKENS2.white }
      ]).slice(0, 8);
      const footerReserve = opts.footer ? 0.28 : 0;
      const matrixX = x + 0.54;
      const matrixY = y + 0.9;
      const matrixW = w - 0.82;
      const matrixH = h - 1.22 - footerReserve;
      const quadW = matrixW / 2;
      const quadH = matrixH / 2;
      const quadrantTitles = {
        "high-high": "resolver primero",
        "high-low": "planificar pronto",
        "low-high": "atender r\xE1pido",
        "low-low": "vigilar"
      };
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Impacto y prioridad de hallazgos", {
        fill: TOKENS2.softBlue
      });
      slide.addText(opts.yAxisLabel || "Impacto", {
        x: x + 0.08,
        y: matrixY + matrixH / 2 - 0.08,
        w: 0.28,
        h: 0.16,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8.4,
        bold: true,
        color: TOKENS2.navy,
        margin: 0,
        rotate: 270,
        align: "center"
      });
      slide.addText(opts.xAxisLabel || "Urgencia", {
        x: matrixX + matrixW / 2 - 0.5,
        y: y + h - footerReserve - 0.24,
        w: 1,
        h: 0.12,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8.4,
        bold: true,
        color: TOKENS2.navy,
        margin: 0,
        align: "center"
      });
      const quadrants = [
        { key: "high-low", x: matrixX, y: matrixY, fill: TOKENS2.warm },
        { key: "high-high", x: matrixX + quadW, y: matrixY, fill: TOKENS2.paleRed },
        { key: "low-low", x: matrixX, y: matrixY + quadH, fill: TOKENS2.white },
        { key: "low-high", x: matrixX + quadW, y: matrixY + quadH, fill: TOKENS2.softBlue }
      ];
      quadrants.forEach((quadrant) => {
        addSurface(slide, SH, quadrant.x, quadrant.y, quadW - 0.06, quadH - 0.06, {
          fill: quadrant.fill,
          line: TOKENS2.border
        });
        slide.addText(quadrantTitles[quadrant.key], {
          x: quadrant.x + 0.14,
          y: quadrant.y + 0.12,
          w: quadW - 0.34,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.2,
          bold: true,
          color: TOKENS2.slate,
          margin: 0,
          fit: "shrink"
        });
      });
      const grouped = {
        "high-high": [],
        "high-low": [],
        "low-high": [],
        "low-low": []
      };
      items.forEach((item) => {
        const key = `${item.impact || "low"}-${item.urgency || "low"}`;
        if (grouped[key]) grouped[key].push(item);
      });
      Object.entries(grouped).forEach(([key, group]) => {
        const isHighImpact = key.startsWith("high");
        const isHighUrgency = key.endsWith("high");
        const baseX = matrixX + (isHighUrgency ? quadW : 0);
        const baseY = matrixY + (isHighImpact ? 0 : quadH);
        group.forEach((item, index) => {
          const chipY = baseY + 0.34 + index * 0.32;
          if (chipY + 0.24 > baseY + quadH - 0.1) {
            return;
          }
          slide.addShape(SH.roundRect, {
            x: baseX + 0.14,
            y: chipY,
            w: quadW - 0.34,
            h: 0.22,
            rectRadius: 0.03,
            fill: { color: item.fill || TOKENS2.white },
            line: { color: item.accent || TOKENS2.navy, pt: 1 }
          });
          slide.addText(item.label || "hallazgo", {
            x: baseX + 0.22,
            y: chipY + 0.05,
            w: quadW - 0.5,
            h: 0.1,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 7.8,
            bold: true,
            color: item.accent || TOKENS2.navy,
            margin: 0,
            fit: "shrink"
          });
        });
      });
      slide.addText("alto", {
        x: matrixX - 0.24,
        y: matrixY + 0.1,
        w: 0.18,
        h: 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 7.6,
        color: TOKENS2.slate,
        margin: 0
      });
      slide.addText("bajo", {
        x: matrixX - 0.24,
        y: matrixY + matrixH - 0.22,
        w: 0.18,
        h: 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 7.6,
        color: TOKENS2.slate,
        margin: 0
      });
      slide.addText("baja", {
        x: matrixX + 0.12,
        y: matrixY + matrixH + 0.04,
        w: 0.3,
        h: 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 7.6,
        color: TOKENS2.slate,
        margin: 0
      });
      slide.addText("alta", {
        x: matrixX + matrixW - 0.34,
        y: matrixY + matrixH + 0.04,
        w: 0.24,
        h: 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 7.6,
        color: TOKENS2.slate,
        margin: 0,
        align: "right"
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addSeoSnippetPreview2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: opts.borderColor || TOKENS2.border
      });
      if (opts.title) {
        slide.addText(opts.title, {
          x: x + 0.18,
          y: y + 0.18,
          w: w - 0.36,
          h: 0.38,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 13.2,
          bold: true,
          color: opts.titleColor || TOKENS2.titleFill,
          margin: 0,
          fit: "shrink"
        });
      }
      const metaY = y + 0.62;
      if (opts.breadcrumb) {
        slide.addText(opts.breadcrumb, {
          x: x + 0.18,
          y: metaY,
          w: w - 0.36,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.6,
          color: TOKENS2.slate,
          margin: 0,
          fit: "shrink"
        });
      }
      slide.addText(opts.url || "https://example.com/guia-accesibilidad", {
        x: x + 0.18,
        y: metaY + (opts.breadcrumb ? 0.13 : 0),
        w: w - 0.36,
        h: 0.14,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8.4,
        color: opts.urlColor || TOKENS2.success,
        margin: 0,
        fit: "shrink"
      });
      slide.addText(
        opts.description || "Introducci\xF3n a estructura sem\xE1ntica, contraste, formularios y revisi\xF3n b\xE1sica de accesibilidad web.",
        {
          x: x + 0.18,
          y: y + 0.94,
          w: w - 0.36,
          h: Math.max(0.26, h - 1.12),
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          color: opts.descriptionColor || TOKENS2.ink,
          margin: 0,
          fit: "shrink",
          valign: "mid"
        }
      );
    }
    function addCascadeInspector2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const rules = opts.rules || [];
      const compactInspector = w < 7.2;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Inspector de cascada", {
        fill: TOKENS2.softBlue
      });
      const elementW = opts.elementW || Math.max(1.24, Math.min(1.72, w * (compactInspector ? 0.2 : 0.22)));
      const resultW = opts.resultW || Math.max(1.3, Math.min(1.58, w * (compactInspector ? 0.22 : 0.24)));
      const inspectorGap = opts.gap || (compactInspector ? 0.24 : 0.22);
      const stackX = x + 0.2 + elementW + inspectorGap;
      const stackW = w - elementW - resultW - inspectorGap * 2 - 0.4;
      const stackY = y + 0.72;
      const stackH = h - 1;
      const connectorW = opts.connectorW || (compactInspector ? 0.2 : 0.22);
      const connectorH = opts.connectorH || (compactInspector ? 0.28 : 0.3);
      const connectorY = y + h / 2 - connectorH / 2;
      slide.addShape(SH.roundRect, {
        x: x + 0.2,
        y: y + 0.92,
        w: elementW,
        h: h - 1.38,
        rectRadius: 0.04,
        fill: { color: TOKENS2.paper },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addText(opts.elementLabel || '<p class="destacado">', {
        x: x + 0.34,
        y: y + 1.12,
        w: elementW - 0.28,
        h: 0.32,
        fontFace: TYPOGRAPHY2.mono,
        fontSize: compactInspector ? 9.4 : 10.2,
        bold: true,
        color: TOKENS2.navy,
        margin: 0
      });
      slide.addText(opts.propertyLabel || "Propiedad observada", {
        x: x + 0.34,
        y: y + 1.56,
        w: elementW - 0.28,
        h: 0.12,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8.9,
        color: TOKENS2.slate,
        margin: 0
      });
      slide.addShape(SH.roundRect, {
        x: x + 0.34,
        y: y + 1.82,
        w: elementW - 0.28,
        h: 0.38,
        rectRadius: 0.03,
        fill: { color: TOKENS2.warm },
        line: { color: TOKENS2.warm }
      });
      slide.addText(opts.propertyValue || "color", {
        x: x + 0.44,
        y: y + 1.94,
        w: elementW - 0.48,
        h: 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 9.2,
        bold: true,
        color: TOKENS2.navy,
        align: "center",
        margin: 0
      });
      slide.addShape(SH.chevron, {
        x: x + 0.2 + elementW + (inspectorGap - connectorW) / 2,
        y: connectorY,
        w: connectorW,
        h: connectorH,
        fill: { color: TOKENS2.red },
        line: { color: TOKENS2.red }
      });
      slide.addShape(SH.roundRect, {
        x: stackX,
        y: stackY,
        w: stackW,
        h: stackH,
        rectRadius: 0.04,
        fill: { color: TOKENS2.paper },
        line: { color: TOKENS2.border, pt: 1 }
      });
      const rowGap = 0.12;
      const visibleRules = rules.slice(0, 4);
      const rawRowH = (stackH - 0.3 - rowGap * (Math.max(visibleRules.length, 1) - 1)) / Math.max(visibleRules.length, 1);
      const rowH = Math.max(compactInspector ? 0.52 : 0.56, Math.min(compactInspector ? 0.78 : 0.82, rawRowH));
      visibleRules.forEach((rule, index) => {
        const rowY = stackY + 0.14 + index * (rowH + rowGap);
        const active = Boolean(rule.active);
        const selectorW = Math.max(0.72, stackW * (compactInspector ? 0.32 : 0.34));
        const declarationW = Math.max(0.72, stackW * (compactInspector ? 0.36 : 0.38));
        const badgeW = compactInspector ? 0.7 : 0.78;
        const badgeX = stackX + stackW - (compactInspector ? 0.98 : 1.08);
        slide.addShape(SH.roundRect, {
          x: stackX + 0.12,
          y: rowY,
          w: stackW - 0.24,
          h: rowH,
          rectRadius: 0.03,
          fill: { color: active ? TOKENS2.paleRed : TOKENS2.white },
          line: { color: active ? TOKENS2.red : TOKENS2.border, pt: active ? 1.2 : 1 }
        });
        slide.addShape(SH.rect, {
          x: stackX + 0.12,
          y: rowY,
          w: 0.08,
          h: rowH,
          fill: { color: active ? TOKENS2.red : TOKENS2.navy },
          line: { color: active ? TOKENS2.red : TOKENS2.navy }
        });
        slide.addText(rule.selector || ".card", {
          x: stackX + 0.28,
          y: rowY + 0.08,
          w: selectorW,
          h: 0.12,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: compactInspector ? 8.4 : 9.2,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(rule.declaration || "color: var(--ink);", {
          x: stackX + 0.28,
          y: rowY + (compactInspector ? 0.28 : 0.26),
          w: declarationW,
          h: 0.12,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: compactInspector ? 7.9 : 8.5,
          color: TOKENS2.ink,
          margin: 0
        });
        slide.addShape(SH.roundRect, {
          x: badgeX,
          y: rowY + 0.08,
          w: badgeW,
          h: 0.22,
          rectRadius: 0.03,
          fill: { color: active ? TOKENS2.red : TOKENS2.softNeutral },
          line: { color: active ? TOKENS2.red : TOKENS2.softNeutral }
        });
        slide.addText(rule.specificity || "0,1,0", {
          x: badgeX + 0.06,
          y: rowY + 0.135,
          w: badgeW - 0.12,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: compactInspector ? 7.6 : 8.1,
          bold: true,
          color: active ? TOKENS2.white : TOKENS2.navy,
          align: "center",
          margin: 0
        });
        slide.addText(rule.reason || (active ? "aplica" : "pierde por peso u orden"), {
          x: badgeX - (compactInspector ? 0.02 : 0.08),
          y: rowY + rowH - 0.17,
          w: compactInspector ? 0.82 : 0.9,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: compactInspector ? 7.1 : 7.6,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      });
      slide.addShape(SH.chevron, {
        x: stackX + stackW + (inspectorGap - connectorW) / 2,
        y: connectorY,
        w: connectorW,
        h: connectorH,
        fill: { color: TOKENS2.gold },
        line: { color: TOKENS2.gold }
      });
      slide.addShape(SH.roundRect, {
        x: x + w - resultW - 0.2,
        y: y + 0.92,
        w: resultW,
        h: h - 1.38,
        rectRadius: 0.04,
        fill: { color: TOKENS2.softBlue },
        line: { color: TOKENS2.softBlue }
      });
      slide.addText(opts.resultLabel || "Resultado", {
        x: x + w - resultW - 0.04,
        y: y + 1.12,
        w: resultW - 0.32,
        h: 0.16,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 13,
        bold: true,
        color: TOKENS2.navy,
        align: "center",
        margin: 0
      });
      slide.addShape(SH.roundRect, {
        x: x + w - resultW - 0.06,
        y: y + 1.56,
        w: resultW - 0.28,
        h: 0.42,
        rectRadius: 0.03,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addText(opts.resolvedValue || "#d62027", {
        x: x + w - resultW - 0.02,
        y: y + 1.7,
        w: resultW - 0.36,
        h: 0.1,
        fontFace: TYPOGRAPHY2.mono,
        fontSize: 10,
        bold: true,
        color: TOKENS2.red,
        align: "center",
        margin: 0
      });
      const resultNote = opts.resultNote === void 0 ? "la regla activa domina la propiedad final" : opts.resultNote;
      if (resultNote) {
        slide.addText(resultNote, {
          x: x + w - resultW - 0.06,
          y: y + 2.16,
          w: resultW - 0.28,
          h: 0.36,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.9,
          color: TOKENS2.ink,
          align: "center",
          valign: "mid",
          margin: 0
        });
      }
    }
    function addSpecificityScale2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const entries = opts.entries || [
        { label: "Etiqueta", value: "0,0,1", weightLabel: "bajo" },
        { label: "Clase", value: "0,1,0", weightLabel: "medio" },
        { label: "ID", value: "1,0,0", weightLabel: "alto", active: true },
        { label: "Inline", value: "inline", weightLabel: "m\xE1ximo" }
      ];
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Escala de especificidad", {
        fill: TOKENS2.paleRed
      });
      const compact = h < 1.8;
      if (!compact) {
        slide.addText(opts.subtitle || "a medida que el selector gana precisi\xF3n, tambi\xE9n gana peso", {
          x: x + 0.2,
          y: y + 0.56,
          w: w - 0.4,
          h: 0.14,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9.1,
          color: TOKENS2.slate,
          margin: 0
        });
      }
      const trackX = x + 0.4;
      const trackY = y + h - 0.72;
      const trackW = w - 0.8;
      if (!compact) {
        slide.addShape(SH.rect, {
          x: trackX,
          y: trackY,
          w: trackW,
          h: 0.06,
          fill: { color: TOKENS2.guide },
          line: { color: TOKENS2.guide }
        });
      }
      const maxBarW = trackW - 0.6;
      const barYBase = compact ? y + 0.58 : y + 0.98;
      const gap = compact ? 0.08 : 0.16;
      const availableH = compact ? Math.max(0.9, h - 0.72) : Math.max(1.2, trackY - barYBase - 0.08);
      const rowH = Math.max(
        compact ? 0.2 : 0.28,
        Math.min(0.56, (availableH - gap * (entries.length - 1)) / Math.max(entries.length, 1))
      );
      entries.slice(0, 5).forEach((entry, index) => {
        const currentY = barYBase + index * (rowH + gap);
        const tone = entry.active ? TOKENS2.red : index >= 2 ? TOKENS2.navy : TOKENS2.sand;
        const fill = entry.active ? TOKENS2.paleRed : index >= 2 ? TOKENS2.softBlue : TOKENS2.warm;
        const factor = entry.scale || (index === 0 ? 0.28 : index === 1 ? 0.48 : index === 2 ? 0.72 : index === 3 ? 0.94 : 0.82);
        const barW = Math.max(1.3, maxBarW * factor);
        slide.addText(entry.label || "Clase", {
          x: x + 0.26,
          y: currentY + (compact ? 0.07 : 0.12),
          w: 1.12,
          h: 0.12,
          fontFace: TYPOGRAPHY2.display,
          fontSize: compact ? 9.6 : 11.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addShape(SH.roundRect, {
          x: x + 1.48,
          y: currentY,
          w: barW,
          h: rowH,
          rectRadius: 0.03,
          fill: { color: fill },
          line: { color: tone, pt: entry.active ? 1.4 : 1 }
        });
        slide.addShape(SH.rect, {
          x: x + 1.48,
          y: currentY,
          w: 0.1,
          h: rowH,
          fill: { color: tone },
          line: { color: tone }
        });
        slide.addText(entry.value || "0,1,0", {
          x: x + 1.68,
          y: currentY + (compact ? 0.07 : 0.11),
          w: 0.72,
          h: 0.12,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: compact ? 8.2 : 9.2,
          bold: true,
          color: entry.active ? TOKENS2.red : TOKENS2.navy,
          margin: 0
        });
        slide.addText(entry.weightLabel || "medio", {
          x: x + 2.48,
          y: currentY + (compact ? 0.07 : 0.11),
          w: barW - 1.02,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 7.8 : 8.9,
          color: TOKENS2.ink,
          margin: 0
        });
      });
      if (opts.footer && !compact) {
        slide.addText(opts.footer, {
          x: x + 0.22,
          y: y + h - 0.34,
          w: w - 0.44,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addTokenBoard2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const groups = opts.groups || [
        {
          title: "Color",
          tone: TOKENS2.red,
          items: [
            { label: "--color-primario", value: "#D62027", swatch: TOKENS2.red },
            { label: "--text-main", value: "#102A43", swatch: TOKENS2.navy }
          ]
        },
        {
          title: "Espacio",
          tone: TOKENS2.gold,
          items: [
            { label: "--space-sm", value: "8px" },
            { label: "--space-md", value: "16px" }
          ]
        },
        {
          title: "Superficie",
          tone: TOKENS2.navy,
          items: [
            { label: "--surface-card", value: "#FFFFFF", swatch: TOKENS2.white },
            { label: "--radius-md", value: "12px" }
          ]
        }
      ];
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Tablero de tokens", {
        fill: TOKENS2.softNeutral
      });
      const visibleGroups = groups.slice(0, 4);
      const gap = 0.18;
      const groupW = (w - 0.4 - gap * (visibleGroups.length - 1)) / visibleGroups.length;
      const footerReserve = opts.footer ? 0.34 : 0;
      visibleGroups.forEach((group, index) => {
        const groupX = x + 0.2 + index * (groupW + gap);
        const tone = group.tone || (index === 0 ? TOKENS2.red : index === 1 ? TOKENS2.gold : TOKENS2.navy);
        const fill = group.fill || (index === 0 ? TOKENS2.paleRed : index === 1 ? TOKENS2.warm : TOKENS2.softBlue);
        slide.addShape(SH.roundRect, {
          x: groupX,
          y: y + 0.72,
          w: groupW,
          h: h - 0.94 - footerReserve,
          rectRadius: 0.04,
          fill: { color: fill },
          line: { color: fill }
        });
        slide.addShape(SH.rect, {
          x: groupX,
          y: y + 0.72,
          w: 0.1,
          h: h - 0.94 - footerReserve,
          fill: { color: tone },
          line: { color: tone }
        });
        slide.addText(group.title || "Grupo", {
          x: groupX + 0.2,
          y: y + 0.88,
          w: groupW - 0.28,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 12.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        const items = group.items || [];
        items.slice(0, 4).forEach((item, itemIndex) => {
          const itemY = y + 1.26 + itemIndex * 0.56;
          const hasSwatch = Boolean(item.swatch);
          const labelFontSize = hasSwatch && String(item.label || "").length > 14 ? 7.6 : 8.2;
          const labelX = groupX + (hasSwatch ? 0.48 : 0.24);
          const labelW = groupW - (hasSwatch ? 0.82 : 0.52);
          const valueX = labelX;
          const valueW = labelW;
          slide.addShape(SH.roundRect, {
            x: groupX + 0.16,
            y: itemY,
            w: groupW - 0.3,
            h: 0.42,
            rectRadius: 0.03,
            fill: { color: TOKENS2.white },
            line: { color: TOKENS2.border, pt: 1 }
          });
          if (hasSwatch) {
            slide.addShape(SH.roundRect, {
              x: groupX + 0.24,
              y: itemY + 0.11,
              w: 0.16,
              h: 0.16,
              rectRadius: 0.03,
              fill: { color: item.swatch },
              line: { color: item.swatch === TOKENS2.white ? TOKENS2.border : item.swatch, pt: 1 }
            });
          }
          slide.addText(item.label || "--token", {
            x: labelX,
            y: itemY + 0.08,
            w: labelW,
            h: 0.12,
            fontFace: TYPOGRAPHY2.mono,
            fontSize: labelFontSize,
            color: TOKENS2.navy,
            margin: 0
          });
          slide.addText(item.value || "#FFFFFF", {
            x: valueX,
            y: itemY + 0.22,
            w: valueW,
            h: 0.1,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 8.4,
            color: TOKENS2.slate,
            margin: 0
          });
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addBreakpointDecisionPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const stages = (opts.stages || [
        {
          label: "Amplio",
          sizeLabel: "1280 px",
          note: "la composici\xF3n todav\xEDa respira",
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue
        },
        {
          label: "Tensi\xF3n",
          sizeLabel: "820 px",
          note: "la lectura empieza a comprimirse",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm,
          active: true
        },
        {
          label: "Quiebre",
          sizeLabel: "640 px",
          note: "el layout ya pide otra decisi\xF3n",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        }
      ]).slice(0, 4);
      const footerReserve = opts.footer ? 0.34 : 0;
      const railY = y + 0.62;
      const railH = 0.92;
      const railGap = 0.1;
      const railInnerW = w - 0.44;
      const stageW = (railInnerW - railGap * Math.max(0, stages.length - 1)) / Math.max(stages.length, 1);
      const bodyY = railY + railH + 0.16;
      const bodyH = h - (bodyY - y) - 0.18 - footerReserve;
      const bodyGap = 0.16;
      const signalW = Math.max(1.92, Math.min(2.56, w * 0.25));
      const focusW = Math.max(1.46, Math.min(1.82, w * 0.17));
      const decisionW = w - 0.44 - signalW - focusW - bodyGap * 2;
      const signalX = x + 0.22;
      const focusX = signalX + signalW + bodyGap;
      const decisionX = focusX + focusW + bodyGap;
      const activeStage = stages.find((stage) => stage.active) || stages[Math.min(1, stages.length - 1)] || {};
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Breakpoint con criterio", {
        fill: TOKENS2.softNeutral
      });
      stages.forEach((stage, index) => {
        const stageX = x + 0.22 + index * (stageW + railGap);
        const accent = stage.accent || TOKENS2.navy;
        const fill = stage.fill || TOKENS2.white;
        addSurface(slide, SH, stageX, railY, stageW, railH, {
          fill,
          line: stage.active ? accent : fill === TOKENS2.white ? TOKENS2.border : fill,
          linePt: stage.active ? 1.2 : 1
        });
        slide.addShape(SH.rect, {
          x: stageX,
          y: railY,
          w: stageW,
          h: 0.08,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(stage.label || "Etapa", {
          x: stageX + 0.1,
          y: railY + 0.14,
          w: stageW - 0.2,
          h: 0.2,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 9.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center",
          fit: "shrink"
        });
        slide.addShape(SH.roundRect, {
          x: stageX + (stageW - 0.68) / 2,
          y: railY + 0.4,
          w: 0.68,
          h: 0.2,
          rectRadius: 0.03,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.white }
        });
        slide.addText(stage.sizeLabel || "", {
          x: stageX + (stageW - 0.62) / 2,
          y: railY + 0.45,
          w: 0.62,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7,
          bold: true,
          color: accent,
          margin: 0,
          align: "center",
          fit: "shrink"
        });
        if (stage.note) {
          slide.addText(stage.note, {
            x: stageX + 0.12,
            y: railY + 0.67,
            w: stageW - 0.24,
            h: 0.12,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 6.8,
            color: TOKENS2.slate,
            margin: 0,
            align: "center",
            fit: "shrink"
          });
        }
        if (index < stages.length - 1) {
          const laneX = stageX + stageW;
          slide.addShape(SH.line, {
            x: laneX + 0.02,
            y: railY + railH / 2,
            w: Math.max(0.02, railGap - 0.12),
            h: 0,
            line: { color: TOKENS2.guide, pt: 1.2, beginArrowType: "none", endArrowType: "triangle" }
          });
        }
      });
      [
        {
          x: signalX,
          w: signalW,
          fill: TOKENS2.softBlue,
          accent: TOKENS2.navy,
          kicker: "Se\xF1al",
          title: opts.signalTitle || "Cuando aparece el quiebre",
          body: opts.signalBody || "La lectura se aprieta, el CTA pierde foco o una segunda columna ya no ayuda a entender."
        },
        {
          x: decisionX,
          w: decisionW,
          fill: TOKENS2.paleRed,
          accent: TOKENS2.red,
          kicker: "Decisi\xF3n",
          title: opts.decisionTitle || "Qu\xE9 conviene cambiar",
          body: opts.decisionBody || "Apilar, redistribuir, cambiar proporciones o mover piezas para recuperar claridad."
        }
      ].forEach((card) => {
        addSurface(slide, SH, card.x, bodyY, card.w, bodyH, {
          fill: card.fill,
          line: card.fill
        });
        slide.addShape(SH.rect, {
          x: card.x + 0.12,
          y: bodyY + 0.14,
          w: 0.1,
          h: bodyH - 0.28,
          fill: { color: card.accent },
          line: { color: card.accent }
        });
        addSurfaceHeader(slide, SH, card.x + 0.3, bodyY + 0.14, 0.82, card.kicker, {
          h: 0.22,
          fill: TOKENS2.white,
          fontSize: 8.4
        });
        slide.addText(card.title, {
          x: card.x + 0.3,
          y: bodyY + 0.46,
          w: card.w - 0.42,
          h: 0.28,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 12.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          fit: "shrink"
        });
        slide.addText(card.body, {
          x: card.x + 0.3,
          y: bodyY + 0.84,
          w: card.w - 0.42,
          h: bodyH - 1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.9,
          color: TOKENS2.ink,
          margin: 0,
          valign: "mid",
          fit: "shrink"
        });
      });
      addSurface(slide, SH, focusX, bodyY + 0.22, focusW, bodyH - 0.44, {
        fill: TOKENS2.warm,
        line: TOKENS2.warm
      });
      slide.addShape(SH.roundRect, {
        x: focusX + 0.12,
        y: bodyY + 0.28,
        w: focusW - 0.24,
        h: 0.24,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.white }
      });
      slide.addText(opts.breakpointTitle || "Quiebre real", {
        x: focusX + 0.18,
        y: bodyY + 0.33,
        w: focusW - 0.36,
        h: 0.12,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 9.4,
        bold: true,
        color: TOKENS2.navy,
        margin: 0,
        align: "center",
        fit: "shrink"
      });
      slide.addShape(SH.chevron, {
        x: focusX + 0.18,
        y: bodyY + 0.78,
        w: focusW - 0.36,
        h: 0.22,
        fill: { color: activeStage.accent || TOKENS2.gold },
        line: { color: activeStage.accent || TOKENS2.gold }
      });
      slide.addShape(SH.roundRect, {
        x: focusX + 0.22,
        y: bodyY + 1.16,
        w: focusW - 0.44,
        h: 0.24,
        rectRadius: 0.03,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.white }
      });
      slide.addText(activeStage.sizeLabel || opts.focusSizeLabel || "", {
        x: focusX + 0.28,
        y: bodyY + 1.22,
        w: focusW - 0.56,
        h: 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8,
        bold: true,
        color: activeStage.accent || TOKENS2.red,
        margin: 0,
        align: "center",
        fit: "shrink"
      });
      slide.addText(
        opts.breakpointBody || "No nace de un n\xFAmero dogm\xE1tico: nace cuando la interfaz deja de leerse igual.",
        {
          x: focusX + 0.18,
          y: bodyY + 1.56,
          w: focusW - 0.36,
          h: Math.max(0.24, bodyH - 1.94),
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.2,
          color: TOKENS2.slate,
          margin: 0,
          align: "center",
          valign: "mid",
          fit: "shrink"
        }
      );
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addComponentVariantBoard2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.3 : 0;
      const variants = (opts.variants || [
        {
          label: "Base",
          role: "default",
          description: "la versi\xF3n estable que fija jerarqu\xEDa y ritmo",
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue,
          preview: "card"
        },
        {
          label: "Destacada",
          role: "feature",
          description: "sube visibilidad sin romper la familia",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed,
          preview: "card"
        },
        {
          label: "Compacta",
          role: "compact",
          description: "reduce aire sin perder identidad",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm,
          preview: "stack"
        },
        {
          label: "Acci\xF3n",
          role: "action",
          description: "prioriza respuesta y llamado visible",
          accent: TOKENS2.navy,
          fill: TOKENS2.white,
          preview: "button"
        }
      ]).slice(0, 4);
      const compact = variants.length > 3 || w < 8.8;
      const cols = compact ? 2 : variants.length;
      const rows = compact ? Math.ceil(variants.length / 2) : 1;
      const gapX = 0.18;
      const gapY = 0.18;
      const bodyY = y + 0.62;
      const bodyH = h - 0.82 - footerReserve;
      const cardW = (w - 0.32 - gapX * (cols - 1)) / cols;
      const cardH = (bodyH - gapY * (rows - 1)) / rows;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Variantes de un mismo componente", {
        fill: TOKENS2.softNeutral
      });
      variants.forEach((variant, index) => {
        const col = compact ? index % cols : index;
        const row = compact ? Math.floor(index / cols) : 0;
        const cardX = x + 0.16 + col * (cardW + gapX);
        const cardY = bodyY + row * (cardH + gapY);
        const accent = variant.accent || TOKENS2.navy;
        const fill = variant.fill || TOKENS2.white;
        const preview = variant.preview || "card";
        const contentInset = compact ? 0.28 : 0.3;
        const previewX = cardX + contentInset;
        const previewY = cardY + (compact ? 0.46 : 0.64);
        const previewW = cardW - contentInset * 2;
        const previewH = compact ? 0.44 : Math.max(0.62, cardH - 1.12);
        addSurface(slide, SH, cardX, cardY, cardW, cardH, {
          fill,
          line: fill === TOKENS2.white ? TOKENS2.border : fill
        });
        slide.addShape(SH.rect, {
          x: cardX + 0.1,
          y: cardY + 0.12,
          w: 0.08,
          h: cardH - 0.24,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(variant.label || "Variante", {
          x: cardX + 0.38,
          y: cardY + 0.14,
          w: cardW - 1.14,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 12.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addShape(SH.roundRect, {
          x: cardX + cardW - 0.82,
          y: cardY + 0.12,
          w: 0.64,
          h: 0.22,
          rectRadius: 0.03,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.white }
        });
        slide.addText(variant.role || "", {
          x: cardX + cardW - 0.78,
          y: cardY + 0.17,
          w: 0.56,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.8,
          bold: true,
          color: accent,
          margin: 0,
          align: "center",
          fit: "shrink"
        });
        addSurface(slide, SH, previewX, previewY, previewW, previewH, {
          fill: TOKENS2.paper,
          line: TOKENS2.border
        });
        if (preview === "button") {
          slide.addShape(SH.roundRect, {
            x: previewX + 0.16,
            y: previewY + previewH / 2 - (compact ? 0.12 : 0.19),
            w: previewW - 0.32,
            h: compact ? 0.24 : 0.38,
            rectRadius: 0.05,
            fill: { color: accent },
            line: { color: accent }
          });
          slide.addText(variant.ctaLabel || "Acci\xF3n principal", {
            x: previewX + 0.24,
            y: previewY + previewH / 2 - (compact ? 0.06 : 0.11),
            w: previewW - 0.48,
            h: 0.12,
            fontFace: TYPOGRAPHY2.body,
            fontSize: compact ? 7.4 : 8.6,
            bold: true,
            color: TOKENS2.white,
            margin: 0,
            align: "center",
            fit: "shrink"
          });
        } else if (preview === "stack") {
          [0, 1, 2].forEach((rowIndex) => {
            slide.addShape(SH.roundRect, {
              x: previewX + 0.12,
              y: previewY + 0.08 + rowIndex * (compact ? 0.12 : 0.28),
              w: previewW - 0.24,
              h: compact ? 0.08 : 0.18,
              rectRadius: 0.02,
              fill: { color: rowIndex === 0 ? TOKENS2.white : TOKENS2.softNeutral },
              line: { color: rowIndex === 0 ? TOKENS2.border : TOKENS2.softNeutral, pt: 1 }
            });
          });
        } else if (preview === "nav") {
          [0, 1, 2].forEach((tabIndex) => {
            slide.addShape(SH.roundRect, {
              x: previewX + 0.12 + tabIndex * ((previewW - 0.36) / 3),
              y: previewY + (compact ? 0.08 : 0.16),
              w: (previewW - 0.48) / 3,
              h: compact ? 0.12 : 0.22,
              rectRadius: 0.02,
              fill: { color: tabIndex === 0 ? accent : TOKENS2.white },
              line: { color: tabIndex === 0 ? accent : TOKENS2.border, pt: 1 }
            });
          });
          slide.addShape(SH.roundRect, {
            x: previewX + 0.12,
            y: previewY + (compact ? 0.26 : 0.52),
            w: previewW - 0.24,
            h: compact ? 0.12 : 0.24,
            rectRadius: 0.02,
            fill: { color: TOKENS2.softNeutral },
            line: { color: TOKENS2.softNeutral }
          });
        } else {
          slide.addShape(SH.roundRect, {
            x: previewX + 0.12,
            y: previewY + (compact ? 0.08 : 0.12),
            w: previewW - 0.24,
            h: compact ? 0.1 : 0.22,
            rectRadius: 0.02,
            fill: { color: accent },
            line: { color: accent }
          });
          slide.addShape(SH.roundRect, {
            x: previewX + 0.12,
            y: previewY + (compact ? 0.22 : 0.44),
            w: previewW - 0.24,
            h: compact ? 0.12 : Math.max(0.12, previewH - 0.76),
            rectRadius: 0.02,
            fill: { color: TOKENS2.white },
            line: { color: TOKENS2.border, pt: 1 }
          });
          slide.addShape(SH.roundRect, {
            x: previewX + 0.12,
            y: previewY + (compact ? 0.38 : previewH - 0.22),
            w: Math.max(0.7, previewW * 0.42),
            h: compact ? 0.08 : 0.12,
            rectRadius: 0.02,
            fill: { color: accent === TOKENS2.red ? TOKENS2.paleRed : TOKENS2.softBlue },
            line: { color: accent === TOKENS2.red ? TOKENS2.paleRed : TOKENS2.softBlue }
          });
        }
        slide.addText(variant.description || "", {
          x: cardX + contentInset,
          y: cardY + (compact ? 0.94 : cardH - 0.34),
          w: cardW - contentInset * 2,
          h: compact ? 0.14 : 0.22,
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 7.6 : 8.6,
          color: TOKENS2.slate,
          margin: 0,
          align: "center",
          fit: "shrink"
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addComponentConsistencyPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.3 : 0;
      const bodyY = y + 0.62;
      const bodyH = h - 0.82 - footerReserve;
      const gap = 0.2;
      const colW = (w - 0.32 - gap) / 2;
      const leftX = x + 0.16;
      const rightX = leftX + colW + gap;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Consistencia entre piezas compartidas", {
        fill: TOKENS2.softNeutral
      });
      [
        {
          x: leftX,
          title: opts.leftTitle || "Repetici\xF3n manual",
          subtitle: opts.leftSubtitle || "mismas piezas, pero con variaciones accidentales",
          fill: opts.leftFill || TOKENS2.paleRed,
          accent: opts.leftAccent || TOKENS2.red,
          mode: "manual"
        },
        {
          x: rightX,
          title: opts.rightTitle || "Patr\xF3n compartido",
          subtitle: opts.rightSubtitle || "misma familia, con decisiones visibles y estables",
          fill: opts.rightFill || TOKENS2.softBlue,
          accent: opts.rightAccent || TOKENS2.navy,
          mode: "system"
        }
      ].forEach((column) => {
        addSurface(slide, SH, column.x, bodyY, colW, bodyH, {
          fill: column.fill,
          line: column.fill
        });
        slide.addShape(SH.rect, {
          x: column.x + 0.12,
          y: bodyY + 0.14,
          w: 0.1,
          h: bodyH - 0.28,
          fill: { color: column.accent },
          line: { color: column.accent }
        });
        slide.addText(column.title, {
          x: column.x + 0.32,
          y: bodyY + 0.14,
          w: colW - 0.46,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 12.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(column.subtitle, {
          x: column.x + 0.32,
          y: bodyY + 0.36,
          w: colW - 0.46,
          h: 0.2,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          margin: 0,
          fit: "shrink"
        });
        if (column.mode === "manual") {
          const rows = [
            { y: bodyY + 0.72, w: colW - 0.56, accent: TOKENS2.red, fill: TOKENS2.white, label: "Card A" },
            { y: bodyY + 1.08, w: colW - 0.78, accent: TOKENS2.gold, fill: TOKENS2.white, label: "Card B" },
            { y: bodyY + 1.44, w: colW - 0.66, accent: TOKENS2.navy, fill: TOKENS2.white, label: "Card C" }
          ];
          rows.forEach((row, index) => {
            slide.addShape(SH.roundRect, {
              x: column.x + 0.32 + index * 0.04,
              y: row.y,
              w: row.w,
              h: 0.3,
              rectRadius: 0.03,
              fill: { color: row.fill },
              line: { color: TOKENS2.border, pt: 1 }
            });
            slide.addShape(SH.rect, {
              x: column.x + 0.34 + index * 0.04,
              y: row.y + 0.04,
              w: 0.08,
              h: 0.22,
              fill: { color: row.accent },
              line: { color: row.accent }
            });
            slide.addText(row.label, {
              x: column.x + 0.48 + index * 0.04,
              y: row.y + 0.09,
              w: row.w - 0.18,
              h: 0.1,
              fontFace: TYPOGRAPHY2.body,
              fontSize: 8.4,
              bold: true,
              color: TOKENS2.ink,
              margin: 0
            });
          });
          slide.addText(
            opts.leftBody || "Cada pieza se parece a la anterior, pero cambia espaciado, ancho o acentos sin que exista una regla clara.",
            {
              x: column.x + 0.32,
              y: bodyY + 1.88,
              w: colW - 0.5,
              h: Math.max(0.3, bodyH - 2.02),
              fontFace: TYPOGRAPHY2.body,
              fontSize: 8.6,
              color: TOKENS2.ink,
              margin: 0,
              valign: "mid",
              fit: "shrink"
            }
          );
        } else {
          [0, 1, 2].forEach((rowIndex) => {
            slide.addShape(SH.roundRect, {
              x: column.x + 0.32,
              y: bodyY + 0.74 + rowIndex * 0.36,
              w: colW - 0.5,
              h: 0.24,
              rectRadius: 0.03,
              fill: { color: TOKENS2.white },
              line: { color: TOKENS2.border, pt: 1 }
            });
            slide.addShape(SH.rect, {
              x: column.x + 0.34,
              y: bodyY + 0.82 + rowIndex * 0.44,
              w: 0.08,
              h: 0.22,
              fill: { color: column.accent },
              line: { color: column.accent }
            });
          });
          slide.addShape(SH.roundRect, {
            x: column.x + 0.32,
            y: bodyY + 1.9,
            w: colW - 0.5,
            h: 0.3,
            rectRadius: 0.04,
            fill: { color: column.accent },
            line: { color: column.accent }
          });
          slide.addText(
            opts.rightBody || "Las piezas comparten ritmo, borde, acento y jerarqu\xEDa. Cambian por intenci\xF3n, no por accidente visual.",
            {
              x: column.x + 0.32,
              y: bodyY + 2.3,
              w: colW - 0.5,
              h: Math.max(0.24, bodyH - 2.42),
              fontFace: TYPOGRAPHY2.body,
              fontSize: 8.6,
              color: TOKENS2.ink,
              margin: 0,
              valign: "mid",
              fit: "shrink"
            }
          );
        }
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addEvaluationRubricPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const rows = (opts.rows || [
        {
          label: "HTML y sem\xE1ntica",
          weight: 20,
          note: "Jerarqu\xEDa clara, tags correctas y estructura legible.",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        },
        {
          label: "CSS y sistema visual",
          weight: 20,
          note: "Tokens, spacing, jerarqu\xEDa y consistencia entre secciones.",
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue
        },
        {
          label: "Responsive y versi\xF3n m\xF3vil",
          weight: 20,
          note: "La p\xE1gina se adapta bien y conserva claridad en celular.",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm
        },
        {
          label: "Calidad visual general",
          weight: 15,
          note: "Debe sentirse real, no escolar ni de juguete.",
          accent: TOKENS2.navy,
          fill: TOKENS2.mist
        },
        {
          label: "Accesibilidad b\xE1sica",
          weight: 10,
          note: "Contraste, labels, alt y lectura razonable.",
          accent: TOKENS2.success,
          fill: TOKENS2.successSoft
        },
        {
          label: "Uso de Codex con criterio",
          weight: 10,
          note: "Buen contexto, iteraci\xF3n \xFAtil y validaci\xF3n humana.",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        },
        {
          label: "Entrega",
          weight: 5,
          note: "Orden, limpieza y m\xE9todo de entrega consistente.",
          accent: TOKENS2.gold,
          fill: TOKENS2.warningSoft
        }
      ]).slice(0, 7);
      const footerReserve = opts.footer ? 0.28 : 0;
      const gap = 0.12;
      const compact = h < 4 || rows.length > 6;
      const summaryH = 0.44;
      const rowsY = y + 1.02;
      const availableRowsH = h - 1.24 - footerReserve;
      const rowH = Math.max(0.42, (availableRowsH - gap * (rows.length - 1)) / Math.max(rows.length, 1));
      const maxWeight = Math.max(...rows.map((row) => Number(row.weight || 0)), 1);
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "R\xFAbrica de evaluaci\xF3n", {
        fill: TOKENS2.softNeutral
      });
      addSurface(slide, SH, x + 0.16, y + 0.62, w - 0.32, summaryH, {
        fill: TOKENS2.paper,
        line: TOKENS2.paper
      });
      slide.addText("Qu\xE9 pesa m\xE1s en la nota", {
        x: x + 0.3,
        y: y + 0.73,
        w: w - 1.62,
        h: 0.16,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 12,
        bold: true,
        color: TOKENS2.navy,
        margin: 0
      });
      slide.addShape(SH.roundRect, {
        x: x + w - 1.3,
        y: y + 0.7,
        w: 0.98,
        h: 0.24,
        rectRadius: 0.03,
        fill: { color: TOKENS2.navy },
        line: { color: TOKENS2.navy }
      });
      slide.addText(opts.totalLabel || "100 pts", {
        x: x + w - 1.22,
        y: y + 0.76,
        w: 0.82,
        h: 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8.6,
        bold: true,
        color: TOKENS2.white,
        margin: 0,
        align: "center"
      });
      rows.forEach((row, index) => {
        const rowY = rowsY + index * (rowH + gap);
        const accent = row.accent || TOKENS2.navy;
        const fill = row.fill || TOKENS2.softBlue;
        const weight = Number(row.weight || 0);
        const labelW = Math.max(1.4, w * 0.34);
        const noteX = x + labelW + 0.34;
        const noteW = Math.max(2.2, w - labelW - 1.66);
        const badgeW = compact ? 0.72 : 0.84;
        const barY = rowY + rowH - 0.16;
        const trackX = x + 0.26;
        const trackW = w - 1.5;
        addSurface(slide, SH, x + 0.16, rowY, w - 0.32, rowH, {
          fill,
          line: fill
        });
        slide.addShape(SH.rect, {
          x: x + 0.16,
          y: rowY,
          w: 0.08,
          h: rowH,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(row.label || "Criterio", {
          x: x + 0.32,
          y: rowY + 0.11,
          w: labelW - 0.18,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: compact ? 10.6 : 11.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          fit: "shrink"
        });
        slide.addShape(SH.roundRect, {
          x: x + w - badgeW - 0.32,
          y: rowY + 0.1,
          w: badgeW,
          h: 0.22,
          rectRadius: 0.03,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.white }
        });
        slide.addText(row.weightLabel || `${weight}%`, {
          x: x + w - badgeW - 0.26,
          y: rowY + 0.16,
          w: badgeW - 0.12,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.4,
          bold: true,
          color: accent,
          margin: 0,
          align: "center"
        });
        slide.addText(row.note || "", {
          x: noteX,
          y: rowY + 0.11,
          w: noteW - 0.12,
          h: Math.max(0.14, rowH - 0.24),
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 7.2 : 7.8,
          color: TOKENS2.ink,
          margin: 0,
          fit: "shrink",
          valign: "mid"
        });
        slide.addShape(SH.roundRect, {
          x: trackX,
          y: barY,
          w: trackW,
          h: 0.06,
          rectRadius: 0.02,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.white }
        });
        slide.addShape(SH.roundRect, {
          x: trackX,
          y: barY,
          w: Math.max(0.14, trackW * (weight / maxWeight)),
          h: 0.06,
          rectRadius: 0.02,
          fill: { color: accent },
          line: { color: accent }
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addScoreBoostsAndPenalties2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const boosts = (opts.boosts || [
        {
          title: "Sem\xE1ntica real",
          body: "Header, main, section y footer bien usados suman bastante.",
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue
        },
        {
          title: "Responsive cuidado",
          body: "La versi\xF3n m\xF3vil debe verse pensada, no apenas sobrevivir.",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm
        },
        {
          title: "Entrega en GitHub",
          body: "Orden, versionado y presentaci\xF3n profesional del trabajo.",
          accent: TOKENS2.success,
          fill: TOKENS2.successSoft
        }
      ]).slice(0, 4);
      const penalties = (opts.penalties || [
        {
          title: "Texto meta visible",
          body: "Nada de copy tipo demo, ejemplo o comentarios para el profe.",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        },
        {
          title: "UI gen\xE9rica o infantil",
          body: "La interfaz debe sentirse seria y del mundo real.",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        },
        {
          title: "Entrega desordenada",
          body: "WhatsApp o correo con archivos sueltos baja puntos de forma.",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm
        }
      ]).slice(0, 4);
      const footerReserve = opts.footer ? 0.28 : 0;
      const gap = 0.18;
      const columnW = (w - 0.5) / 2;
      const bodyY = y + 0.62;
      const bodyH = h - 0.82 - footerReserve;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Qu\xE9 suma puntos y qu\xE9 baja puntos", {
        fill: TOKENS2.softNeutral
      });
      const columns = [
        {
          x: x + 0.16,
          w: columnW,
          title: opts.boostsTitle || "Suma puntos",
          subtitle: opts.boostsSubtitle || "Refuerza criterio, calidad y forma de trabajo.",
          items: boosts,
          fill: TOKENS2.softBlue,
          accent: TOKENS2.navy
        },
        {
          x: x + 0.16 + columnW + gap,
          w: columnW,
          title: opts.penaltiesTitle || "Baja puntos",
          subtitle: opts.penaltiesSubtitle || "Rompe profesionalismo, claridad o m\xE9todo de entrega.",
          items: penalties,
          fill: TOKENS2.paleRed,
          accent: TOKENS2.red
        }
      ];
      columns.forEach((column) => {
        addSurface(slide, SH, column.x, bodyY, column.w, bodyH, {
          fill: TOKENS2.white,
          line: TOKENS2.border
        });
        slide.addShape(SH.rect, {
          x: column.x,
          y: bodyY,
          w: 0.08,
          h: bodyH,
          fill: { color: column.accent },
          line: { color: column.accent }
        });
        slide.addShape(SH.roundRect, {
          x: column.x + 0.18,
          y: bodyY + 0.16,
          w: column.w - 0.34,
          h: 0.34,
          rectRadius: 0.03,
          fill: { color: column.fill },
          line: { color: column.fill }
        });
        slide.addText(column.title, {
          x: column.x + 0.28,
          y: bodyY + 0.24,
          w: column.w - 0.54,
          h: 0.12,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(column.subtitle, {
          x: column.x + 0.22,
          y: bodyY + 0.58,
          w: column.w - 0.4,
          h: 0.24,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.8,
          color: TOKENS2.slate,
          margin: 0,
          fit: "shrink",
          valign: "mid"
        });
        const itemGap = 0.12;
        const itemsY = bodyY + 0.92;
        const itemH = Math.max(
          0.44,
          (bodyH - 1.06 - itemGap * (column.items.length - 1)) / Math.max(column.items.length, 1)
        );
        column.items.forEach((item, index) => {
          const itemY = itemsY + index * (itemH + itemGap);
          addSurface(slide, SH, column.x + 0.18, itemY, column.w - 0.34, itemH, {
            fill: item.fill || column.fill,
            line: item.fill || column.fill
          });
          slide.addShape(SH.rect, {
            x: column.x + 0.18,
            y: itemY,
            w: 0.08,
            h: itemH,
            fill: { color: item.accent || column.accent },
            line: { color: item.accent || column.accent }
          });
          slide.addText(item.title || "Punto", {
            x: column.x + 0.32,
            y: itemY + 0.1,
            w: column.w - 0.52,
            h: 0.16,
            fontFace: TYPOGRAPHY2.display,
            fontSize: 10.6,
            bold: true,
            color: TOKENS2.navy,
            margin: 0,
            fit: "shrink"
          });
          slide.addText(item.body || "", {
            x: column.x + 0.32,
            y: itemY + 0.3,
            w: column.w - 0.52,
            h: Math.max(0.14, itemH - 0.38),
            fontFace: TYPOGRAPHY2.body,
            fontSize: 7.6,
            color: TOKENS2.ink,
            margin: 0,
            fit: "shrink",
            valign: "mid"
          });
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addProjectWorkflowPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const stages = (opts.stages || [
        { step: "01", title: "Brief", artifact: "encargo", accent: TOKENS2.red, fill: TOKENS2.paleRed },
        { step: "02", title: "Spec", artifact: "alcance", accent: TOKENS2.navy, fill: TOKENS2.softBlue },
        { step: "03", title: "Design", artifact: "ui/ux", accent: TOKENS2.gold, fill: TOKENS2.warm },
        { step: "04", title: "Agents", artifact: "reglas", accent: TOKENS2.navy, fill: TOKENS2.mist },
        { step: "05", title: "Implementaci\xF3n", artifact: "html + css", accent: TOKENS2.red, fill: TOKENS2.paleRed },
        { step: "06", title: "Validaci\xF3n", artifact: "navegador", accent: TOKENS2.success, fill: TOKENS2.successSoft },
        { step: "07", title: "Entrega", artifact: "github", accent: TOKENS2.navy, fill: TOKENS2.softBlue }
      ]).slice(0, 7);
      const footerReserve = opts.footer ? 0.28 : 0;
      const compact = w < 8.6;
      const gap = compact ? 0.08 : 0.1;
      const laneY = y + 0.78;
      const laneH = h - 1 - footerReserve;
      const cardW = (w - 0.32 - gap * (stages.length - 1)) / Math.max(stages.length, 1);
      const chevronW = Math.min(0.14, gap);
      const cardH = laneH - 0.04;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Flujo recomendado de trabajo", {
        fill: TOKENS2.softNeutral
      });
      stages.forEach((stage, index) => {
        const cardX = x + 0.16 + index * (cardW + gap);
        const accent = stage.accent || TOKENS2.navy;
        const fill = stage.fill || TOKENS2.softBlue;
        addSurface(slide, SH, cardX, laneY, cardW, cardH, {
          fill,
          line: fill
        });
        slide.addShape(SH.rect, {
          x: cardX,
          y: laneY,
          w: 0.08,
          h: cardH,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addShape(SH.roundRect, {
          x: cardX + 0.16,
          y: laneY + 0.14,
          w: Math.min(0.42, cardW - 0.24),
          h: 0.22,
          rectRadius: 0.03,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.white }
        });
        slide.addText(stage.step || String(index + 1).padStart(2, "0"), {
          x: cardX + 0.2,
          y: laneY + 0.19,
          w: Math.min(0.34, cardW - 0.32),
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.2,
          bold: true,
          color: accent,
          align: "center",
          margin: 0
        });
        slide.addText(stage.title || "Etapa", {
          x: cardX + 0.16,
          y: laneY + 0.48,
          w: cardW - 0.22,
          h: compact ? 0.34 : 0.3,
          fontFace: TYPOGRAPHY2.display,
          fontSize: compact ? 8.6 : 9.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center",
          fit: "shrink",
          valign: "mid"
        });
        if (stage.body && cardH > 1.12) {
          slide.addText(stage.body, {
            x: cardX + 0.14,
            y: laneY + 0.84,
            w: cardW - 0.2,
            h: 0.24,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 7,
            color: TOKENS2.ink,
            margin: 0,
            align: "center",
            fit: "shrink",
            valign: "mid"
          });
        }
        slide.addShape(SH.roundRect, {
          x: cardX + 0.12,
          y: laneY + cardH - 0.3,
          w: cardW - 0.2,
          h: 0.2,
          rectRadius: 0.03,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.white }
        });
        slide.addText(stage.artifact || "", {
          x: cardX + 0.16,
          y: laneY + cardH - 0.25,
          w: cardW - 0.28,
          h: 0.08,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 6.6,
          bold: true,
          color: TOKENS2.slate,
          align: "center",
          margin: 0,
          fit: "shrink"
        });
        if (index < stages.length - 1) {
          const laneStart = cardX + cardW;
          const laneEnd = laneStart + gap;
          const chevronX = laneStart + Math.max(0, (gap - chevronW) / 2);
          slide.addShape(SH.chevron, {
            x: chevronX,
            y: laneY + cardH / 2 - 0.14,
            w: Math.max(0.08, Math.min(chevronW, laneEnd - chevronX)),
            h: 0.28,
            fill: { color: TOKENS2.gold },
            line: { color: TOKENS2.gold }
          });
        }
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addPromptQualityCompare2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.28 : 0;
      const gap = 0.18;
      const columnW = (w - 0.5) / 2;
      const bodyY = y + 0.62;
      const bodyH = h - 0.82 - footerReserve;
      const compact = bodyH < 2.4;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Prompt malo vs prompt \xFAtil", {
        fill: TOKENS2.softNeutral
      });
      const columns = [
        {
          x: x + 0.16,
          w: columnW,
          title: opts.badTitle || "Prompt flojo",
          subtitle: opts.badSubtitle || "Pide una p\xE1gina sin contexto ni criterio.",
          prompt: opts.badPrompt || "Hazme una landing moderna y bonita con HTML y CSS. Quiero algo llamativo y r\xE1pido.",
          notes: (opts.badNotes || [
            "no define p\xFAblico ni objetivo",
            "no fija restricciones t\xE9cnicas",
            "deja abierta una UI gen\xE9rica"
          ]).slice(0, 4),
          fill: TOKENS2.paleRed,
          accent: TOKENS2.red
        },
        {
          x: x + 0.16 + columnW + gap,
          w: columnW,
          title: opts.goodTitle || "Prompt \xFAtil",
          subtitle: opts.goodSubtitle || "Da contexto, criterio y restricciones reales.",
          prompt: opts.goodPrompt || "Crea una landing para un servicio tecnol\xF3gico local. Usa HTML sem\xE1ntico, CSS con tokens, mobile-first, tono sobrio y CTA claro. No uses texto meta ni est\xE9tica infantil.",
          notes: (opts.goodNotes || [
            "define producto y p\xFAblico objetivo",
            "fija HTML, CSS y responsive",
            "protege tono visual y realismo"
          ]).slice(0, 4),
          fill: TOKENS2.softBlue,
          accent: TOKENS2.navy
        }
      ];
      columns.forEach((column) => {
        addSurface(slide, SH, column.x, bodyY, column.w, bodyH, {
          fill: TOKENS2.white,
          line: TOKENS2.border
        });
        slide.addShape(SH.rect, {
          x: column.x,
          y: bodyY,
          w: 0.08,
          h: bodyH,
          fill: { color: column.accent },
          line: { color: column.accent }
        });
        slide.addShape(SH.roundRect, {
          x: column.x + 0.18,
          y: bodyY + 0.16,
          w: column.w - 0.34,
          h: 0.34,
          rectRadius: 0.03,
          fill: { color: column.fill },
          line: { color: column.fill }
        });
        slide.addText(column.title, {
          x: column.x + 0.28,
          y: bodyY + 0.24,
          w: column.w - 0.54,
          h: 0.12,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          fit: "shrink"
        });
        slide.addText(column.subtitle, {
          x: column.x + 0.22,
          y: bodyY + 0.58,
          w: column.w - 0.4,
          h: 0.22,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.8,
          color: TOKENS2.slate,
          margin: 0,
          fit: "shrink",
          valign: "mid"
        });
        addSurface(slide, SH, column.x + 0.18, bodyY + 0.86, column.w - 0.34, compact ? 0.88 : 1.02, {
          fill: TOKENS2.editorBg,
          line: TOKENS2.editorBg
        });
        slide.addText(column.prompt, {
          x: column.x + 0.3,
          y: bodyY + 0.98,
          w: column.w - 0.58,
          h: compact ? 0.56 : 0.7,
          fontFace: "Courier New",
          fontSize: compact ? 7.2 : 7.8,
          color: TOKENS2.white,
          margin: 0,
          fit: "shrink",
          valign: "mid"
        });
        const notesY = bodyY + (compact ? 1.88 : 2.06);
        const noteH = Math.max(0.18, bodyH - (compact ? 2.06 : 2.24));
        const noteGap = 0.08;
        const rowH = Math.max(0.16, (noteH - noteGap * (column.notes.length - 1)) / Math.max(column.notes.length, 1));
        column.notes.forEach((note, index) => {
          const rowY = notesY + index * (rowH + noteGap);
          slide.addShape(SH.ellipse, {
            x: column.x + 0.24,
            y: rowY + Math.max(0.02, rowH / 2 - 0.03),
            w: 0.06,
            h: 0.06,
            fill: { color: column.accent },
            line: { color: column.accent }
          });
          slide.addText(note, {
            x: column.x + 0.36,
            y: rowY,
            w: column.w - 0.54,
            h: rowH,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 7.4,
            color: TOKENS2.ink,
            margin: 0,
            fit: "shrink",
            valign: "mid"
          });
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addStaticVsInteractiveCompare2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.28 : 0;
      const gap = 0.18;
      const columnW = (w - 0.5) / 2;
      const bodyY = y + 0.62;
      const bodyH = h - 0.82 - footerReserve;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Statico vs interactivo", {
        fill: TOKENS2.softNeutral
      });
      const columns = [
        {
          x: x + 0.16,
          title: opts.leftTitle || "Solo HTML + CSS",
          subtitle: opts.leftSubtitle || "la interfaz se ve correcta, pero todavia no responde",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed,
          cta: opts.leftCta || "Boton visible",
          note: opts.leftNote || "sin evento ni respuesta",
          sideLabel: opts.leftSideLabel || "estado fijo"
        },
        {
          x: x + 0.16 + columnW + gap,
          title: opts.rightTitle || "Con JavaScript",
          subtitle: opts.rightSubtitle || "la accion del usuario dispara una respuesta observable",
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue,
          cta: opts.rightCta || "Boton activo",
          note: opts.rightNote || "click -> mensaje en consola",
          sideLabel: opts.rightSideLabel || "comportamiento"
        }
      ];
      columns.forEach((column, index) => {
        addSurface(slide, SH, column.x, bodyY, columnW, bodyH, {
          fill: TOKENS2.white,
          line: TOKENS2.border
        });
        slide.addShape(SH.rect, {
          x: column.x,
          y: bodyY,
          w: 0.08,
          h: bodyH,
          fill: { color: column.accent },
          line: { color: column.accent }
        });
        slide.addShape(SH.roundRect, {
          x: column.x + 0.18,
          y: bodyY + 0.16,
          w: columnW - 0.34,
          h: 0.34,
          rectRadius: 0.03,
          fill: { color: column.fill },
          line: { color: column.fill }
        });
        slide.addText(column.title, {
          x: column.x + 0.28,
          y: bodyY + 0.24,
          w: columnW - 0.54,
          h: 0.12,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11.4,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          fit: "shrink"
        });
        slide.addText(column.subtitle, {
          x: column.x + 0.22,
          y: bodyY + 0.58,
          w: columnW - 0.4,
          h: 0.24,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.8,
          color: TOKENS2.slate,
          margin: 0,
          fit: "shrink",
          valign: "mid"
        });
        const browserX = column.x + 0.2;
        const browserY = bodyY + 0.94;
        const browserW = columnW - 0.4;
        const browserH = Math.min(1.18, Math.max(1.02, bodyH - 1.72));
        slide.addShape(SH.roundRect, {
          x: browserX,
          y: browserY,
          w: browserW,
          h: browserH,
          rectRadius: 0.03,
          fill: { color: TOKENS2.paper },
          line: { color: TOKENS2.border, pt: 1 }
        });
        slide.addShape(SH.roundRect, {
          x: browserX,
          y: browserY,
          w: browserW,
          h: 0.22,
          rectRadius: 0.03,
          fill: { color: TOKENS2.softNeutral },
          line: { color: TOKENS2.softNeutral }
        });
        ["D62027", "E0BC5A", "52606D"].forEach((color, dotIndex) => {
          slide.addShape(SH.ellipse, {
            x: browserX + 0.08 + dotIndex * 0.1,
            y: browserY + 0.08,
            w: 0.05,
            h: 0.05,
            fill: { color },
            line: { color }
          });
        });
        slide.addShape(SH.roundRect, {
          x: browserX + 0.12,
          y: browserY + 0.34,
          w: browserW - 0.24,
          h: 0.26,
          rectRadius: 0.02,
          fill: { color: index === 0 ? TOKENS2.white : TOKENS2.softBlue },
          line: { color: index === 0 ? TOKENS2.border : TOKENS2.softBlue, pt: 1 }
        });
        slide.addShape(SH.roundRect, {
          x: browserX + 0.12,
          y: browserY + 0.68,
          w: browserW * 0.42,
          h: 0.44,
          rectRadius: 0.02,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.border, pt: 1 }
        });
        slide.addShape(SH.roundRect, {
          x: browserX + browserW * 0.5,
          y: browserY + 0.68,
          w: browserW * 0.34,
          h: 0.22,
          rectRadius: 0.03,
          fill: { color: column.accent },
          line: { color: column.accent }
        });
        slide.addText(column.cta, {
          x: browserX + browserW * 0.5 + 0.06,
          y: browserY + 0.75,
          w: browserW * 0.34 - 0.12,
          h: 0.08,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.4,
          bold: true,
          color: TOKENS2.white,
          align: "center",
          margin: 0,
          fit: "shrink"
        });
        slide.addShape(SH.roundRect, {
          x: column.x + 0.2,
          y: bodyY + bodyH - 0.44,
          w: columnW - 0.4,
          h: 0.24,
          rectRadius: 0.03,
          fill: { color: index === 0 ? TOKENS2.warm : TOKENS2.successSoft },
          line: { color: index === 0 ? TOKENS2.warm : TOKENS2.successSoft }
        });
        slide.addText(column.note, {
          x: column.x + 0.28,
          y: bodyY + bodyH - 0.37,
          w: columnW - 0.56,
          h: 0.08,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.3,
          color: TOKENS2.navy,
          align: "center",
          margin: 0,
          fit: "shrink"
        });
        slide.addText(column.sideLabel, {
          x: column.x + 0.22,
          y: browserY + browserH + 0.06,
          w: columnW - 0.44,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      });
      slide.addShape(SH.chevron, {
        x: x + columnW + 0.19,
        y: bodyY + bodyH / 2 - 0.16,
        w: 0.12,
        h: 0.32,
        fill: { color: TOKENS2.gold },
        line: { color: TOKENS2.gold }
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addDataTypesBoard2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.24 : 0;
      const gap = 0.14;
      const rowGap = 0.16;
      const cards = (opts.cards || [
        {
          label: "string",
          sample: '"Nodo Web"',
          note: "texto para nombres, mensajes y contenido",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        },
        {
          label: "number",
          sample: "14990",
          note: "sirve para calcular, contar o comparar",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm
        },
        {
          label: "boolean",
          sample: "true",
          note: "marca si una condicion se cumple o no",
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue
        },
        {
          label: "variable",
          sample: "const precio = 14990",
          note: "un nombre que guarda un valor util",
          accent: TOKENS2.navy,
          fill: TOKENS2.mist
        }
      ]).slice(0, 4);
      const innerX = x + 0.22;
      const topY = y + 0.62;
      const bodyH = Math.max(1.2, h - 0.84 - footerReserve);
      const minCardW = opts.minCardWidth || 1.55;
      let columns = Math.max(1, Math.min(cards.length, opts.columns || cards.length));
      while (columns > 1) {
        const candidate = (w - 0.44 - gap * (columns - 1)) / columns;
        if (candidate >= minCardW) {
          break;
        }
        columns -= 1;
      }
      const rows = Math.max(1, Math.ceil(cards.length / columns));
      const cardW = (w - 0.44 - gap * (columns - 1)) / Math.max(columns, 1);
      const cardH = (bodyH - rowGap * (rows - 1)) / rows;
      const compactLayout = rows > 1 || cardH < 1.55;
      const pillH = compactLayout ? 0.24 : 0.3;
      const pillTop = compactLayout ? 0.12 : 0.16;
      const sampleTop = pillTop + pillH + (compactLayout ? 0.08 : 0.12);
      const sampleH = compactLayout ? 0.38 : 0.52;
      const sampleSide = compactLayout ? 0.14 : 0.16;
      const noteTop = sampleTop + sampleH + (compactLayout ? 0.08 : 0.14);
      const noteBottom = compactLayout ? 0.12 : 0.18;
      const labelFontSize = compactLayout ? 10.4 : 11.2;
      const sampleFontSize = compactLayout ? 7.4 : 8.4;
      const noteFontSize = compactLayout ? 7 : 7.6;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Tipos de datos y variables", {
        fill: TOKENS2.softNeutral
      });
      cards.forEach((card, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;
        const cardX = innerX + col * (cardW + gap);
        const cardY = topY + row * (cardH + rowGap);
        addSurface(slide, SH, cardX, cardY, cardW, cardH, {
          fill: TOKENS2.white,
          line: TOKENS2.border
        });
        slide.addShape(SH.rect, {
          x: cardX,
          y: cardY,
          w: 0.08,
          h: cardH,
          fill: { color: card.accent || TOKENS2.navy },
          line: { color: card.accent || TOKENS2.navy }
        });
        slide.addShape(SH.roundRect, {
          x: cardX + sampleSide,
          y: cardY + pillTop,
          w: cardW - sampleSide * 2,
          h: pillH,
          rectRadius: 0.03,
          fill: { color: card.fill || TOKENS2.softBlue },
          line: { color: card.fill || TOKENS2.softBlue }
        });
        slide.addText(card.label || "tipo", {
          x: cardX + sampleSide + 0.06,
          y: cardY + pillTop,
          w: cardW - sampleSide * 2 - 0.12,
          h: pillH,
          fontFace: TYPOGRAPHY2.display,
          fontSize: labelFontSize,
          bold: true,
          color: TOKENS2.navy,
          align: "center",
          valign: "mid",
          margin: 0,
          fit: "shrink"
        });
        addSurface(slide, SH, cardX + sampleSide, cardY + sampleTop, cardW - sampleSide * 2, sampleH, {
          fill: TOKENS2.editorBg,
          line: TOKENS2.editorBg
        });
        slide.addText(card.sample || "", {
          x: cardX + sampleSide + 0.08,
          y: cardY + sampleTop,
          w: cardW - sampleSide * 2 - 0.16,
          h: sampleH,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: sampleFontSize,
          color: TOKENS2.white,
          align: "center",
          valign: "mid",
          margin: 0,
          fit: "shrink"
        });
        slide.addText(card.note || "", {
          x: cardX + 0.16,
          y: cardY + noteTop,
          w: cardW - 0.32,
          h: Math.max(0.18, cardH - noteTop - noteBottom),
          fontFace: TYPOGRAPHY2.body,
          fontSize: noteFontSize,
          color: TOKENS2.ink,
          margin: 0,
          valign: "mid",
          fit: "shrink",
          align: "center"
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addControlFlowPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.28 : 0;
      const bodyY = y + 0.62;
      const bodyH = h - 0.82 - footerReserve;
      const sideW = Math.max(1.5, w * 0.25);
      const centerW = Math.max(1.4, w * 0.18);
      const gap = 0.18;
      const rightW = w - sideW - centerW - gap * 2 - 0.36;
      const leftX = x + 0.18;
      const centerX = leftX + sideW + gap;
      const rightX = centerX + centerW + gap;
      const compactLayout = bodyH < 1.8;
      const panelTitleY = bodyY + (compactLayout ? 0.12 : 0.18);
      const panelTitleH = compactLayout ? 0.1 : 0.14;
      const panelTitleFont = compactLayout ? 10.6 : 12;
      const codeBoxY = bodyY + (compactLayout ? 0.36 : 0.52);
      const codeBoxH = compactLayout ? 0.34 : 0.54;
      const codeTextY = codeBoxY + (compactLayout ? 0.11 : 0.19);
      const codeTextH = compactLayout ? 0.08 : 0.12;
      const codeFont = compactLayout ? 7.2 : 8.4;
      const bodyTextY = codeBoxY + codeBoxH + (compactLayout ? 0.08 : 0.2);
      const bodyTextFont = compactLayout ? 6.5 : 7.8;
      const bodyTextH = Math.max(0.16, bodyH - (bodyTextY - bodyY) - 0.12);
      const centerArrowY = compactLayout ? bodyY + 0.52 : bodyY + 0.62;
      const centerArrowW = compactLayout ? 0.5 : 0.68;
      const centerArrowH = compactLayout ? 0.24 : 0.34;
      const conditionLabelY = centerArrowY + centerArrowH + (compactLayout ? 0.1 : 0.12);
      const conditionLabelFont = compactLayout ? 7.4 : 8.2;
      const conditionBodyY = conditionLabelY + (compactLayout ? 0.16 : 0.34);
      const conditionBodyFont = compactLayout ? 6.5 : 7.3;
      const conditionBodyH = Math.max(0.14, bodyH - (conditionBodyY - bodyY) - 0.12);
      const outputTitleY = bodyY + (compactLayout ? 0.1 : 0.18);
      const outputTitleFont = compactLayout ? 10.6 : 11.6;
      const outputCardsTop = bodyY + (compactLayout ? 0.34 : 0.54);
      const outputGap = compactLayout ? 0.08 : 0.18;
      const outputCardH = Math.max(0.28, (bodyH - (outputCardsTop - bodyY) - outputGap - 0.12) / 2);
      const outputTitleInnerY = compactLayout ? 0.08 : 0.12;
      const outputBodyInnerY = compactLayout ? 0.22 : 0.3;
      const outputInnerTitleFont = compactLayout ? 7.4 : 8.8;
      const outputInnerBodyFont = compactLayout ? 6.7 : 7.8;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Funcion -> condicion -> salida", {
        fill: TOKENS2.softNeutral
      });
      addSurface(slide, SH, leftX, bodyY, sideW, bodyH, {
        fill: TOKENS2.softBlue,
        line: TOKENS2.softBlue
      });
      slide.addText(opts.inputTitle || "Entrada", {
        x: leftX + 0.18,
        y: panelTitleY,
        w: sideW - 0.36,
        h: panelTitleH,
        fontFace: TYPOGRAPHY2.display,
        fontSize: panelTitleFont,
        bold: true,
        color: TOKENS2.navy,
        margin: 0,
        align: "center",
        fit: "shrink"
      });
      addSurface(slide, SH, leftX + 0.18, codeBoxY, sideW - 0.36, codeBoxH, {
        fill: TOKENS2.editorBg,
        line: TOKENS2.editorBg
      });
      slide.addText(opts.inputCode || "verificarAcceso(edad)", {
        x: leftX + 0.26,
        y: codeTextY,
        w: sideW - 0.52,
        h: codeTextH,
        fontFace: TYPOGRAPHY2.mono,
        fontSize: codeFont,
        color: TOKENS2.white,
        margin: 0,
        fit: "shrink",
        align: "center"
      });
      slide.addText(opts.inputBody || "entra un dato que la funcion debe interpretar", {
        x: leftX + 0.18,
        y: bodyTextY,
        w: sideW - 0.36,
        h: bodyTextH,
        fontFace: TYPOGRAPHY2.body,
        fontSize: bodyTextFont,
        color: TOKENS2.ink,
        margin: 0,
        fit: "shrink",
        valign: "mid",
        align: "center"
      });
      slide.addShape(SH.chevron, {
        x: leftX + sideW + (gap - 0.12) / 2,
        y: bodyY + bodyH / 2 - 0.16,
        w: 0.12,
        h: 0.32,
        fill: { color: TOKENS2.gold },
        line: { color: TOKENS2.gold }
      });
      addSurface(slide, SH, centerX, bodyY, centerW, bodyH, {
        fill: TOKENS2.warm,
        line: TOKENS2.warm
      });
      slide.addText(opts.conditionTitle || "Condicion", {
        x: centerX + 0.12,
        y: panelTitleY,
        w: centerW - 0.24,
        h: panelTitleH,
        fontFace: TYPOGRAPHY2.display,
        fontSize: compactLayout ? 9.8 : 10.8,
        bold: true,
        color: TOKENS2.navy,
        align: "center",
        margin: 0,
        fit: "shrink"
      });
      slide.addShape(SH.chevron, {
        x: centerX + centerW / 2 - centerArrowW / 2,
        y: centerArrowY,
        w: centerArrowW,
        h: centerArrowH,
        fill: { color: TOKENS2.red },
        line: { color: TOKENS2.red }
      });
      slide.addText(opts.conditionLabel || "edad >= 18", {
        x: centerX + 0.14,
        y: conditionLabelY,
        w: centerW - 0.28,
        h: 0.14,
        fontFace: TYPOGRAPHY2.mono,
        fontSize: conditionLabelFont,
        bold: true,
        color: TOKENS2.navy,
        align: "center",
        margin: 0,
        fit: "shrink"
      });
      slide.addText(opts.conditionBody || "segun el resultado, el programa toma un camino u otro", {
        x: centerX + 0.12,
        y: conditionBodyY,
        w: centerW - 0.24,
        h: conditionBodyH,
        fontFace: TYPOGRAPHY2.body,
        fontSize: conditionBodyFont,
        color: TOKENS2.slate,
        margin: 0,
        fit: "shrink",
        valign: "mid",
        align: "center"
      });
      slide.addShape(SH.chevron, {
        x: centerX + centerW + (gap - 0.12) / 2,
        y: bodyY + bodyH / 2 - 0.16,
        w: 0.12,
        h: 0.32,
        fill: { color: TOKENS2.gold },
        line: { color: TOKENS2.gold }
      });
      addSurface(slide, SH, rightX, bodyY, rightW, bodyH, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      slide.addText(opts.outputTitle || "Salidas posibles", {
        x: rightX + 0.16,
        y: outputTitleY,
        w: rightW - 0.32,
        h: panelTitleH,
        fontFace: TYPOGRAPHY2.display,
        fontSize: outputTitleFont,
        bold: true,
        color: TOKENS2.navy,
        align: "center",
        margin: 0,
        fit: "shrink"
      });
      [
        {
          title: opts.trueTitle || "Si se cumple",
          body: opts.trueBody || "Acceso permitido",
          fill: TOKENS2.successSoft,
          accent: TOKENS2.success,
          y: outputCardsTop
        },
        {
          title: opts.falseTitle || "Si no se cumple",
          body: opts.falseBody || "Acceso denegado",
          fill: TOKENS2.paleRed,
          accent: TOKENS2.red,
          y: outputCardsTop + outputCardH + outputGap
        }
      ].forEach((item) => {
        addSurface(slide, SH, rightX + 0.14, item.y, rightW - 0.28, outputCardH, {
          fill: item.fill,
          line: item.fill
        });
        slide.addShape(SH.rect, {
          x: rightX + 0.14,
          y: item.y,
          w: 0.08,
          h: outputCardH,
          fill: { color: item.accent },
          line: { color: item.accent }
        });
        slide.addText(item.title, {
          x: rightX + 0.28,
          y: item.y + outputTitleInnerY,
          w: rightW - 0.48,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: outputInnerTitleFont,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          fit: "shrink"
        });
        slide.addText(item.body, {
          x: rightX + 0.28,
          y: item.y + outputBodyInnerY,
          w: rightW - 0.48,
          h: Math.max(0.1, outputCardH - outputBodyInnerY - 0.08),
          fontFace: TYPOGRAPHY2.body,
          fontSize: outputInnerBodyFont,
          color: TOKENS2.ink,
          margin: 0,
          fit: "shrink"
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addEventReactionPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.28 : 0;
      const stages = (opts.stages || [
        { title: "Usuario", body: "hace click", accent: TOKENS2.red, fill: TOKENS2.paleRed },
        { title: "Evento", body: "click", accent: TOKENS2.gold, fill: TOKENS2.warm },
        { title: "Handler", body: "listener corre", accent: TOKENS2.navy, fill: TOKENS2.softBlue },
        { title: "Respuesta", body: "console.log()", accent: TOKENS2.success, fill: TOKENS2.successSoft }
      ]).slice(0, 4);
      const gap = 0.12;
      const laneY = y + 0.68;
      const laneH = 0.86;
      const stageW = (w - 0.44 - gap * (stages.length - 1)) / Math.max(stages.length, 1);
      const browserY = laneY + laneH + 0.18;
      const browserH = h - (browserY - y) - 0.2 - footerReserve;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Evento -> reaccion", {
        fill: TOKENS2.softNeutral
      });
      stages.forEach((stage, index) => {
        const stageX = x + 0.22 + index * (stageW + gap);
        addSurface(slide, SH, stageX, laneY, stageW, laneH, {
          fill: stage.fill || TOKENS2.softBlue,
          line: stage.fill || TOKENS2.softBlue
        });
        slide.addShape(SH.rect, {
          x: stageX,
          y: laneY,
          w: 0.08,
          h: laneH,
          fill: { color: stage.accent || TOKENS2.navy },
          line: { color: stage.accent || TOKENS2.navy }
        });
        slide.addText(stage.title || "Etapa", {
          x: stageX + 0.16,
          y: laneY + 0.16,
          w: stageW - 0.24,
          h: 0.12,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 10.4,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center",
          fit: "shrink"
        });
        slide.addText(stage.body || "", {
          x: stageX + 0.14,
          y: laneY + 0.42,
          w: stageW - 0.22,
          h: 0.18,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.6,
          color: TOKENS2.ink,
          margin: 0,
          align: "center",
          fit: "shrink",
          valign: "mid"
        });
        if (index < stages.length - 1) {
          const laneStart = stageX + stageW;
          const laneEnd = laneStart + gap;
          const arrowW = Math.min(0.1, gap);
          slide.addShape(SH.chevron, {
            x: laneStart + Math.max(0, (gap - arrowW) / 2),
            y: laneY + laneH / 2 - 0.12,
            w: Math.max(0.08, Math.min(arrowW, laneEnd - (laneStart + Math.max(0, (gap - arrowW) / 2)))),
            h: 0.24,
            fill: { color: TOKENS2.gold },
            line: { color: TOKENS2.gold }
          });
        }
      });
      const browserX = x + 0.22;
      const browserW = w - 0.44;
      addSurface(slide, SH, browserX, browserY, browserW, browserH, {
        fill: TOKENS2.paper,
        line: TOKENS2.border
      });
      slide.addShape(SH.roundRect, {
        x: browserX,
        y: browserY,
        w: browserW,
        h: 0.24,
        rectRadius: 0.03,
        fill: { color: TOKENS2.softNeutral },
        line: { color: TOKENS2.softNeutral }
      });
      ["D62027", "E0BC5A", "52606D"].forEach((color, dotIndex) => {
        slide.addShape(SH.ellipse, {
          x: browserX + 0.1 + dotIndex * 0.1,
          y: browserY + 0.09,
          w: 0.05,
          h: 0.05,
          fill: { color },
          line: { color }
        });
      });
      slide.addText(opts.browserLabel || "Interfaz observada", {
        x: browserX + 0.2,
        y: browserY + 0.38,
        w: browserW - 0.4,
        h: 0.12,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 11,
        bold: true,
        color: TOKENS2.navy,
        margin: 0
      });
      slide.addShape(SH.roundRect, {
        x: browserX + 0.2,
        y: browserY + 0.66,
        w: browserW * 0.34,
        h: 0.34,
        rectRadius: 0.03,
        fill: { color: TOKENS2.red },
        line: { color: TOKENS2.red }
      });
      slide.addText(opts.triggerLabel || "Click en boton", {
        x: browserX + 0.28,
        y: browserY + 0.77,
        w: browserW * 0.34 - 0.16,
        h: 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8,
        bold: true,
        color: TOKENS2.white,
        align: "center",
        margin: 0,
        fit: "shrink"
      });
      slide.addShape(SH.chevron, {
        x: browserX + browserW * 0.4,
        y: browserY + 0.73,
        w: 0.22,
        h: 0.2,
        fill: { color: TOKENS2.gold },
        line: { color: TOKENS2.gold }
      });
      addSurface(slide, SH, browserX + browserW * 0.48, browserY + 0.58, browserW * 0.38, 0.5, {
        fill: TOKENS2.successSoft,
        line: TOKENS2.successSoft
      });
      slide.addText(opts.responseLabel || "Respuesta en consola o en la UI", {
        x: browserX + browserW * 0.48 + 0.1,
        y: browserY + 0.76,
        w: browserW * 0.38 - 0.2,
        h: 0.12,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8,
        color: TOKENS2.navy,
        margin: 0,
        align: "center",
        fit: "shrink"
      });
      slide.addText(
        opts.browserNote || "el codigo importa porque escucha una accion y corre en el momento correcto",
        {
          x: browserX + 0.2,
          y: browserY + browserH - 0.26,
          w: browserW - 0.4,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.6,
          color: TOKENS2.slate,
          margin: 0,
          align: "center",
          fit: "shrink"
        }
      );
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addDomMutationFlow2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.28 : 0;
      const gap = 0.16;
      const bodyY = y + 0.62;
      const bodyH = h - 0.84 - footerReserve;
      const colW = (w - 0.44 - gap * 2) / 3;
      const columns = [
        {
          title: opts.selectorTitle || "Selector",
          badge: "document.querySelector(...)",
          body: opts.selectorBody || "Ubica el nodo correcto dentro del DOM real.",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed,
          icon: "link"
        },
        {
          title: opts.mutationTitle || "Mutaci\xF3n",
          badge: "nodo.textContent = ...",
          body: opts.mutationBody || "Cambia una propiedad observable del elemento.",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm,
          icon: "key"
        },
        {
          title: opts.resultTitle || "Resultado",
          badge: opts.resultBadge || "La interfaz se actualiza",
          body: opts.resultBody || "El cambio debe verse y tambi\xE9n poder comprobarse.",
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue,
          icon: "building"
        }
      ];
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Selector -> mutacion -> resultado visible", {
        fill: TOKENS2.softNeutral
      });
      function renderFlowCard(column, colX, colY, cardW, cardH, cardOpts = {}) {
        addSurface(slide, SH, colX, colY, cardW, cardH, {
          fill: TOKENS2.white,
          line: TOKENS2.border
        });
        slide.addShape(SH.rect, {
          x: colX,
          y: colY,
          w: 0.08,
          h: cardH,
          fill: { color: column.accent },
          line: { color: column.accent }
        });
        addIconBadge(
          slide,
          SH,
          colX + 0.16,
          colY + 0.16,
          cardOpts.iconSize || 0.48,
          cardOpts.iconSize || 0.48,
          column.icon,
          {
            fill: column.fill,
            stroke: column.accent,
            accent: column.accent,
            secondary: TOKENS2.navy,
            line: column.fill
          }
        );
        slide.addText(column.title, {
          x: colX + (cardOpts.titleXOffset || 0.74),
          y: colY + 0.22,
          w: cardW - (cardOpts.titleXOffset || 0.74) - 0.18,
          h: 0.14,
          fontFace: TYPOGRAPHY2.display,
          fontSize: cardOpts.titleFontSize || 11.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          fit: "shrink"
        });
        slide.addShape(SH.roundRect, {
          x: colX + 0.16,
          y: colY + (cardOpts.badgeY || 0.78),
          w: cardW - 0.32,
          h: cardOpts.badgeH || 0.42,
          rectRadius: 0.03,
          fill: { color: TOKENS2.editorBg },
          line: { color: TOKENS2.editorBg }
        });
        slide.addText(column.badge, {
          x: colX + 0.24,
          y: colY + (cardOpts.badgeTextY || 0.91),
          w: cardW - 0.48,
          h: 0.12,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: cardOpts.badgeFontSize || 8,
          color: TOKENS2.white,
          align: "center",
          margin: 0,
          fit: "shrink"
        });
        slide.addText(column.body, {
          x: colX + 0.16,
          y: colY + (cardOpts.bodyY || 1.38),
          w: cardW - 0.32,
          h: Math.max(0.22, cardH - (cardOpts.bodyY || 1.38) - 0.16),
          fontFace: TYPOGRAPHY2.body,
          fontSize: cardOpts.bodyFontSize || 8,
          color: TOKENS2.ink,
          margin: 0,
          valign: cardOpts.bodyVAlign || "mid",
          align: "center",
          fit: "shrink"
        });
      }
      const useStackedLayout = colW < 1.55;
      if (useStackedLayout) {
        const laneY = bodyY + 0.14;
        const cardGap = 0.1;
        const cardW = w - 0.44;
        const cardH = Math.max(0.72, (bodyH - 0.14 - cardGap * 2) / 3);
        const leftX = x + 0.22;
        renderFlowCard(columns[0], leftX, laneY, cardW, cardH, {
          iconSize: 0.34,
          titleXOffset: 0.56,
          titleFontSize: 9.8,
          badgeY: 0.3,
          badgeH: 0.22,
          badgeTextY: 0.36,
          badgeFontSize: 5.8,
          bodyY: 0.56,
          bodyFontSize: 6.4,
          bodyVAlign: "top"
        });
        renderFlowCard(columns[1], leftX, laneY + cardH + cardGap, cardW, cardH, {
          iconSize: 0.34,
          titleXOffset: 0.56,
          titleFontSize: 9.8,
          badgeY: 0.3,
          badgeH: 0.22,
          badgeTextY: 0.36,
          badgeFontSize: 5.8,
          bodyY: 0.56,
          bodyFontSize: 6.4,
          bodyVAlign: "top"
        });
        renderFlowCard(columns[2], leftX, laneY + (cardH + cardGap) * 2, cardW, cardH, {
          iconSize: 0.34,
          titleXOffset: 0.56,
          titleFontSize: 9.8,
          badgeY: 0.3,
          badgeH: 0.22,
          badgeTextY: 0.36,
          badgeFontSize: 5.8,
          bodyY: 0.56,
          bodyFontSize: 6.4,
          bodyVAlign: "top"
        });
      } else {
        const laneY = bodyY + 0.14;
        const laneH = Math.max(1.28, bodyH - 0.54);
        columns.forEach((column, index) => {
          const colX = x + 0.22 + index * (colW + gap);
          renderFlowCard(column, colX, laneY, colW, laneH);
          if (index < columns.length - 1) {
            slide.addShape(SH.chevron, {
              x: colX + colW + (gap - 0.1) / 2,
              y: laneY + laneH / 2 - 0.13,
              w: 0.1,
              h: 0.26,
              fill: { color: TOKENS2.gold },
              line: { color: TOKENS2.gold }
            });
          }
        });
      }
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - (useStackedLayout ? 0.16 : 0.18),
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: useStackedLayout ? 7.6 : 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addDebugEvidenceBoard2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.28 : 0;
      const gap = 0.16;
      const bodyY = y + 0.62;
      const bodyH = h - 0.84 - footerReserve;
      const cardH = Math.max(0.9, bodyH - 0.58);
      const cardW = (w - 0.44 - gap * 2) / 3;
      const cards = (opts.cards || [
        {
          title: "Elements",
          body: "Confirma si el nodo existe y si el selector apunta al lugar correcto.",
          question: "\xBFEse elemento est\xE1 realmente en el DOM?",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed,
          icon: "sheet"
        },
        {
          title: "Console",
          body: "Mira valores, errores y el punto exacto donde el flujo se corta.",
          question: "\xBFQu\xE9 evidencia entrega el c\xF3digo al ejecutarse?",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm,
          icon: "sql"
        },
        {
          title: "Network",
          body: "Verifica si `fetch` sali\xF3, respondi\xF3 y devolvi\xF3 la estructura esperada.",
          question: "\xBFLa solicitud ocurri\xF3 y trajo datos v\xE1lidos?",
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue,
          icon: "database"
        }
      ]).slice(0, 3);
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Evidencia de debugging", {
        fill: TOKENS2.softNeutral
      });
      cards.forEach((card, index) => {
        const cardX = x + 0.22 + index * (cardW + gap);
        addSurface(slide, SH, cardX, bodyY, cardW, cardH, {
          fill: TOKENS2.white,
          line: TOKENS2.border
        });
        slide.addShape(SH.rect, {
          x: cardX,
          y: bodyY,
          w: 0.08,
          h: cardH,
          fill: { color: card.accent || TOKENS2.navy },
          line: { color: card.accent || TOKENS2.navy }
        });
        addIconBadge(slide, SH, cardX + 0.16, bodyY + 0.16, 0.48, 0.48, card.icon || "sheet", {
          fill: card.fill || TOKENS2.softBlue,
          stroke: card.accent || TOKENS2.navy,
          accent: card.accent || TOKENS2.navy,
          secondary: TOKENS2.gold,
          line: card.fill || TOKENS2.softBlue
        });
        slide.addText(card.title || "Panel", {
          x: cardX + 0.74,
          y: bodyY + 0.22,
          w: cardW - 0.92,
          h: 0.14,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          fit: "shrink"
        });
        slide.addText(card.body || "", {
          x: cardX + 0.16,
          y: bodyY + 0.8,
          w: cardW - 0.32,
          h: 0.5,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.8,
          color: TOKENS2.ink,
          margin: 0,
          fit: "shrink",
          valign: "mid"
        });
        slide.addShape(SH.roundRect, {
          x: cardX + 0.16,
          y: bodyY + cardH - 0.54,
          w: cardW - 0.32,
          h: 0.34,
          rectRadius: 0.03,
          fill: { color: card.fill || TOKENS2.softBlue },
          line: { color: card.fill || TOKENS2.softBlue }
        });
        slide.addText(card.question || "", {
          x: cardX + 0.24,
          y: bodyY + cardH - 0.45,
          w: cardW - 0.48,
          h: 0.16,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center",
          fit: "shrink",
          valign: "mid"
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addSpreadsheetProblemPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.26 : 0;
      const columns = (opts.columns || ["Obra", "Cliente", "Direccion", "Profesional"]).slice(0, 5);
      const rows = (opts.rows || [
        ["Edificio A", "Constructora Sur", "Los Aromos 220", "Patricia Rojas"],
        ["Edificio A", "Constructora Sur", "Los Aromos 220", "Patricia Rojas"],
        ["Casa B", "Inmobiliaria Norte", "Ruta 5 km 18", "Diego Salas"],
        ["Casa B", "Inmobiliaria Norte", "Ruta 5 km 18", "Diego Salas"]
      ]).slice(0, 5);
      const highlights = opts.highlights || [
        { row: 0, col: 1, accent: TOKENS2.red, fill: TOKENS2.paleRed },
        { row: 1, col: 1, accent: TOKENS2.red, fill: TOKENS2.paleRed },
        { row: 0, col: 3, accent: TOKENS2.gold, fill: TOKENS2.warm },
        { row: 1, col: 3, accent: TOKENS2.gold, fill: TOKENS2.warm }
      ];
      const callouts = (opts.callouts || [
        {
          title: "Redundancia visible",
          body: "Cliente y profesional se repiten en cada fila de obra.",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        },
        {
          title: "Riesgo operativo",
          body: "Si cambia un telefono o un nombre, hay que editar muchas celdas.",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm
        }
      ]).slice(0, 3);
      const bodyY = y + 0.62;
      const bodyH = h - 0.82 - footerReserve;
      const tableW = w * 0.6;
      const calloutW = w - tableW - 0.54;
      const tableX = x + 0.18;
      const tableY = bodyY + 0.02;
      const tableH = bodyH - 0.04;
      const headerH = 0.36;
      const rowGap = 0.06;
      const cellGap = 0.04;
      const rowH = (tableH - headerH - rowGap * rows.length) / Math.max(rows.length, 1);
      const colW = (tableW - cellGap * (columns.length - 1)) / Math.max(columns.length, 1);
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "De planilla util a planilla fragil", {
        fill: TOKENS2.softNeutral
      });
      addIconBadge(slide, SH, x + w - 0.78, y + 0.56, 0.42, 0.42, "sheet", {
        fill: TOKENS2.softBlue,
        stroke: TOKENS2.navy,
        accent: TOKENS2.red,
        secondary: TOKENS2.gold,
        line: TOKENS2.softBlue
      });
      columns.forEach((column, colIndex) => {
        const cellX = tableX + colIndex * (colW + cellGap);
        slide.addShape(SH.roundRect, {
          x: cellX,
          y: tableY,
          w: colW,
          h: headerH,
          rectRadius: 0.03,
          fill: { color: TOKENS2.navy },
          line: { color: TOKENS2.navy, pt: 1 }
        });
        slide.addText(column, {
          x: cellX + 0.08,
          y: tableY + 0.11,
          w: colW - 0.16,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          bold: true,
          color: TOKENS2.white,
          margin: 0,
          align: "center",
          fit: "shrink"
        });
      });
      rows.forEach((row, rowIndex) => {
        const cellY = tableY + headerH + rowGap + rowIndex * (rowH + rowGap);
        columns.forEach((_, colIndex) => {
          const cellX = tableX + colIndex * (colW + cellGap);
          const highlighted = highlights.find(
            (entry) => entry.row === rowIndex && entry.col === colIndex
          );
          slide.addShape(SH.roundRect, {
            x: cellX,
            y: cellY,
            w: colW,
            h: rowH,
            rectRadius: 0.02,
            fill: { color: highlighted?.fill || (rowIndex % 2 === 0 ? TOKENS2.paper : TOKENS2.white) },
            line: { color: highlighted?.accent || TOKENS2.border, pt: highlighted ? 1.25 : 1 }
          });
          slide.addText(row[colIndex] || "", {
            x: cellX + 0.08,
            y: cellY + 0.09,
            w: colW - 0.16,
            h: rowH - 0.16,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 7.6,
            color: TOKENS2.ink,
            margin: 0,
            valign: "mid",
            fit: "shrink"
          });
        });
      });
      const calloutX = tableX + tableW + 0.18;
      const calloutGap = 0.12;
      const calloutH = (tableH - calloutGap * (callouts.length - 1)) / Math.max(callouts.length, 1);
      callouts.forEach((callout, index) => {
        const cardY = tableY + index * (calloutH + calloutGap);
        addSurface(slide, SH, calloutX, cardY, calloutW, calloutH, {
          fill: callout.fill || TOKENS2.softBlue,
          line: callout.fill || TOKENS2.softBlue
        });
        slide.addShape(SH.rect, {
          x: calloutX,
          y: cardY,
          w: 0.08,
          h: calloutH,
          fill: { color: callout.accent || TOKENS2.red },
          line: { color: callout.accent || TOKENS2.red }
        });
        slide.addText(callout.title || "", {
          x: calloutX + 0.14,
          y: cardY + 0.14,
          w: calloutW - 0.24,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(callout.body || "", {
          x: calloutX + 0.14,
          y: cardY + 0.36,
          w: calloutW - 0.24,
          h: calloutH - 0.46,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.ink,
          margin: 0,
          valign: "mid",
          fit: "shrink"
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addEntityRelationshipBlueprint2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.24 : 0;
      const entities = (opts.entities || [
        {
          title: "Cliente",
          icon: "user",
          fields: ["cliente_id (PK)", "nombre", "rut", "telefono"],
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        },
        {
          title: "Obra",
          icon: "building",
          fields: ["obra_id (PK)", "cliente_id (FK)", "nombre", "direccion"],
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue
        },
        {
          title: "Profesional",
          icon: "user",
          fields: ["profesional_id (PK)", "nombre", "especialidad"],
          accent: TOKENS2.gold,
          fill: TOKENS2.warm
        },
        {
          title: "Asignacion",
          icon: "link",
          fields: ["asignacion_id (PK)", "obra_id (FK)", "profesional_id (FK)"],
          accent: TOKENS2.navy,
          fill: TOKENS2.mist
        }
      ]).slice(0, 4);
      const relations = (opts.relations || [
        { from: 0, to: 1, label: "1:N", accent: TOKENS2.red },
        { from: 1, to: 3, label: "1:N", accent: TOKENS2.gold },
        { from: 2, to: 3, label: "1:N", accent: TOKENS2.navy }
      ]).slice(0, 4);
      const bodyY = y + 0.62;
      const bodyH = h - 0.82 - footerReserve;
      const gapX = 0.32;
      const gapY = 0.24;
      const cardW = (w - 0.36 - gapX) / 2;
      const cardH = (bodyH - gapY) / 2;
      const positions = [
        { x: x + 0.18, y: bodyY },
        { x: x + 0.18 + cardW + gapX, y: bodyY },
        { x: x + 0.18, y: bodyY + cardH + gapY },
        { x: x + 0.18 + cardW + gapX, y: bodyY + cardH + gapY }
      ];
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.paper,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "MER del caso de obras", {
        fill: TOKENS2.softNeutral
      });
      const centers = positions.map((position) => ({
        cx: position.x + cardW / 2,
        cy: position.y + cardH / 2
      }));
      relations.forEach((relation) => {
        const from = centers[relation.from ?? 0];
        const to = centers[relation.to ?? 1];
        if (!from || !to) {
          return;
        }
        if (Math.abs(from.cy - to.cy) < 0.1) {
          const startX = Math.min(from.cx, to.cx);
          const endX = Math.max(from.cx, to.cx);
          slide.addShape(SH.rect, {
            x: startX,
            y: from.cy - 0.02,
            w: Math.max(0.1, endX - startX),
            h: 0.04,
            fill: { color: relation.accent || TOKENS2.gold },
            line: { color: relation.accent || TOKENS2.gold }
          });
          slide.addText(relation.label || "", {
            x: startX + (endX - startX) / 2 - 0.2,
            y: from.cy - 0.18,
            w: 0.4,
            h: 0.1,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 8,
            bold: true,
            color: relation.accent || TOKENS2.gold,
            margin: 0,
            align: "center"
          });
        } else {
          const topY = Math.min(from.cy, to.cy);
          const leftX = Math.min(from.cx, to.cx);
          slide.addShape(SH.rect, {
            x: leftX - 0.02,
            y: topY,
            w: 0.04,
            h: Math.abs(from.cy - to.cy),
            fill: { color: relation.accent || TOKENS2.gold },
            line: { color: relation.accent || TOKENS2.gold }
          });
          slide.addText(relation.label || "", {
            x: leftX + 0.08,
            y: topY + Math.abs(from.cy - to.cy) / 2 - 0.05,
            w: 0.4,
            h: 0.1,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 8,
            bold: true,
            color: relation.accent || TOKENS2.gold,
            margin: 0
          });
        }
      });
      entities.forEach((entity, index) => {
        const position = positions[index];
        addSurface(slide, SH, position.x, position.y, cardW, cardH, {
          fill: TOKENS2.white,
          line: entity.accent || TOKENS2.border,
          linePt: 1.2
        });
        slide.addShape(SH.rect, {
          x: position.x,
          y: position.y,
          w: 0.08,
          h: cardH,
          fill: { color: entity.accent || TOKENS2.red },
          line: { color: entity.accent || TOKENS2.red }
        });
        addIconBadge(slide, SH, position.x + 0.14, position.y + 0.12, 0.42, 0.42, entity.icon || "database", {
          fill: entity.fill || TOKENS2.softNeutral,
          accent: entity.accent || TOKENS2.red,
          secondary: TOKENS2.gold
        });
        slide.addText(entity.title || "", {
          x: position.x + 0.64,
          y: position.y + 0.18,
          w: cardW - 0.78,
          h: 0.14,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11.6,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        (entity.fields || []).slice(0, 4).forEach((field, fieldIndex) => {
          const rowY = position.y + 0.62 + fieldIndex * 0.28;
          slide.addShape(SH.roundRect, {
            x: position.x + 0.14,
            y: rowY,
            w: cardW - 0.28,
            h: 0.22,
            rectRadius: 0.02,
            fill: { color: field.includes("(PK)") ? TOKENS2.softBlue : field.includes("(FK)") ? TOKENS2.warm : TOKENS2.paper },
            line: { color: field.includes("(PK)") ? TOKENS2.navy : field.includes("(FK)") ? TOKENS2.gold : TOKENS2.border, pt: 1 }
          });
          slide.addText(field, {
            x: position.x + 0.24,
            y: rowY + 0.06,
            w: cardW - 0.46,
            h: 0.1,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 8.1,
            color: TOKENS2.ink,
            margin: 0,
            fit: "shrink"
          });
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addNormalizationStepper2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.26 : 0;
      const stages = (opts.stages || [
        {
          badge: "0",
          title: "Tabla inicial",
          focus: "todo mezclado",
          note: "Cliente, obra y profesional viven en la misma hoja.",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed,
          sample: ["obra", "cliente", "direccion", "profesional"]
        },
        {
          badge: "1NF",
          title: "Valores at\xF3micos",
          focus: "una celda, un valor",
          note: "Se evitan listas o datos compuestos en una misma columna.",
          accent: TOKENS2.navy,
          fill: TOKENS2.softBlue,
          sample: ["obra", "cliente", "direccion", "profesional"]
        },
        {
          badge: "2NF",
          title: "Sin dependencia parcial",
          focus: "cada dato depende de la llave completa",
          note: "Los datos de cliente y profesional se separan de la obra.",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm,
          sample: ["cliente", "obra", "profesional", "asignacion"]
        },
        {
          badge: "3NF",
          title: "Sin dependencia transitiva",
          focus: "cada tabla guarda un solo tipo de hecho",
          note: "El modelo queda listo para mantener consistencia y crecer.",
          accent: TOKENS2.success,
          fill: TOKENS2.successSoft,
          sample: ["cliente", "obra", "profesional", "asignacion"]
        }
      ]).slice(0, 4);
      const footerY = y + h - 0.18;
      const wide = w >= 8.2;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Normalizacion paso a paso", {
        fill: TOKENS2.softNeutral
      });
      if (wide) {
        const gap = 0.16;
        const cardW = (w - 0.36 - gap * (stages.length - 1)) / stages.length;
        const cardH = h - 1 - footerReserve;
        stages.forEach((stage, index) => {
          const cardX = x + 0.18 + index * (cardW + gap);
          const cardY = y + 0.64;
          addSurface(slide, SH, cardX, cardY, cardW, cardH, {
            fill: stage.fill || TOKENS2.paper,
            line: stage.accent || TOKENS2.border,
            linePt: 1.1
          });
          slide.addShape(SH.roundRect, {
            x: cardX + 0.12,
            y: cardY + 0.1,
            w: 0.54,
            h: 0.24,
            rectRadius: 0.04,
            fill: { color: stage.accent || TOKENS2.red },
            line: { color: stage.accent || TOKENS2.red }
          });
          slide.addText(stage.badge || "", {
            x: cardX + 0.16,
            y: cardY + 0.15,
            w: 0.46,
            h: 0.1,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 8.2,
            bold: true,
            color: TOKENS2.white,
            margin: 0,
            align: "center"
          });
          slide.addText(stage.title || "", {
            x: cardX + 0.12,
            y: cardY + 0.42,
            w: cardW - 0.24,
            h: 0.16,
            fontFace: TYPOGRAPHY2.display,
            fontSize: 11.2,
            bold: true,
            color: TOKENS2.navy,
            margin: 0
          });
          slide.addShape(SH.roundRect, {
            x: cardX + 0.12,
            y: cardY + 0.7,
            w: cardW - 0.24,
            h: 0.28,
            rectRadius: 0.03,
            fill: { color: TOKENS2.navy },
            line: { color: TOKENS2.navy }
          });
          slide.addText(stage.focus || "", {
            x: cardX + 0.16,
            y: cardY + 0.78,
            w: cardW - 0.32,
            h: 0.1,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 7.6,
            bold: true,
            color: TOKENS2.white,
            margin: 0,
            align: "center",
            fit: "shrink"
          });
          (stage.sample || []).slice(0, 4).forEach((item, itemIndex) => {
            const rowY = cardY + 1.14 + itemIndex * 0.26;
            slide.addShape(SH.roundRect, {
              x: cardX + 0.12,
              y: rowY,
              w: cardW - 0.24,
              h: 0.2,
              rectRadius: 0.02,
              fill: { color: itemIndex % 2 === 0 ? TOKENS2.white : TOKENS2.mist },
              line: { color: TOKENS2.border, pt: 1 }
            });
            slide.addText(item, {
              x: cardX + 0.2,
              y: rowY + 0.05,
              w: cardW - 0.4,
              h: 0.08,
              fontFace: TYPOGRAPHY2.body,
              fontSize: 7.8,
              color: TOKENS2.ink,
              margin: 0,
              fit: "shrink"
            });
          });
          slide.addText(stage.note || "", {
            x: cardX + 0.12,
            y: cardY + cardH - 0.54,
            w: cardW - 0.24,
            h: 0.42,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 7.7,
            color: TOKENS2.slate,
            margin: 0,
            valign: "mid"
          });
          if (index < stages.length - 1) {
            slide.addShape(SH.chevron, {
              x: cardX + cardW + 0.03,
              y: cardY + cardH / 2 - 0.14,
              w: 0.1,
              h: 0.28,
              fill: { color: TOKENS2.gold },
              line: { color: TOKENS2.gold }
            });
          }
        });
      } else {
        const gapX = 0.14;
        const gapY = 0.16;
        const cardW = (w - 0.36 - gapX) / 2;
        const cardH = (h - 1 - footerReserve - gapY) / 2;
        stages.forEach((stage, index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          const cardX = x + 0.18 + col * (cardW + gapX);
          const cardY = y + 0.64 + row * (cardH + gapY);
          addSurface(slide, SH, cardX, cardY, cardW, cardH, {
            fill: stage.fill || TOKENS2.paper,
            line: stage.accent || TOKENS2.border,
            linePt: 1.1
          });
          slide.addShape(SH.roundRect, {
            x: cardX + 0.12,
            y: cardY + 0.1,
            w: 0.58,
            h: 0.24,
            rectRadius: 0.04,
            fill: { color: stage.accent || TOKENS2.red },
            line: { color: stage.accent || TOKENS2.red }
          });
          slide.addText(stage.badge || "", {
            x: cardX + 0.16,
            y: cardY + 0.15,
            w: 0.5,
            h: 0.1,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 8.1,
            bold: true,
            color: TOKENS2.white,
            margin: 0,
            align: "center"
          });
          slide.addText(stage.title || "", {
            x: cardX + 0.12,
            y: cardY + 0.42,
            w: cardW - 0.24,
            h: 0.16,
            fontFace: TYPOGRAPHY2.display,
            fontSize: 10.4,
            bold: true,
            color: TOKENS2.navy,
            margin: 0
          });
          slide.addText(stage.focus || "", {
            x: cardX + 0.12,
            y: cardY + 0.66,
            w: cardW - 0.24,
            h: 0.16,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 7.4,
            bold: true,
            color: stage.accent || TOKENS2.red,
            margin: 0
          });
          slide.addText(stage.note || "", {
            x: cardX + 0.12,
            y: cardY + 0.92,
            w: cardW - 0.24,
            h: cardH - 1.04,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 7.4,
            color: TOKENS2.slate,
            margin: 0,
            valign: "mid"
          });
        });
      }
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: footerY,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addSqlBridgePanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const footerReserve = opts.footer ? 0.26 : 0;
      const tables = (opts.tables || [
        { title: "Cliente", meta: "cliente_id (PK)", accent: TOKENS2.red, fill: TOKENS2.paleRed },
        { title: "Obra", meta: "cliente_id (FK)", accent: TOKENS2.navy, fill: TOKENS2.softBlue },
        { title: "Asignacion", meta: "obra_id + profesional_id", accent: TOKENS2.gold, fill: TOKENS2.warm }
      ]).slice(0, 4);
      const codeLines = (opts.codeLines || [
        "CREATE TABLE cliente (",
        "  cliente_id INT PRIMARY KEY,",
        "  nombre VARCHAR(120) NOT NULL",
        ");",
        "SELECT * FROM obra;"
      ]).slice(0, 8);
      const bodyY = y + 0.62;
      const bodyH = h - 0.82 - footerReserve;
      const leftW = w * 0.38;
      const bridgeW = 0.44;
      const rightW = w - leftW - bridgeW - 0.54;
      const leftX = x + 0.18;
      const rightX = leftX + leftW + bridgeW + 0.18;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.paper,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Del modelo relacional a SQL", {
        fill: TOKENS2.softNeutral
      });
      addSurface(slide, SH, leftX, bodyY, leftW, bodyH, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      slide.addText("Modelo logico", {
        x: leftX + 0.14,
        y: bodyY + 0.14,
        w: leftW - 0.28,
        h: 0.14,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 11.6,
        bold: true,
        color: TOKENS2.navy,
        margin: 0
      });
      const chipGap = 0.14;
      const chipH = (bodyH - 0.64 - chipGap * (tables.length - 1)) / Math.max(tables.length, 1);
      tables.forEach((table, index) => {
        const chipY = bodyY + 0.46 + index * (chipH + chipGap);
        addSurface(slide, SH, leftX + 0.12, chipY, leftW - 0.24, chipH, {
          fill: table.fill || TOKENS2.softBlue,
          line: table.accent || TOKENS2.border,
          linePt: 1.1
        });
        addIconBadge(slide, SH, leftX + 0.24, chipY + 0.12, 0.38, 0.38, index === 0 ? "user" : index === 1 ? "building" : "link", {
          fill: TOKENS2.white,
          accent: table.accent || TOKENS2.red,
          secondary: TOKENS2.gold
        });
        slide.addText(table.title || "", {
          x: leftX + 0.72,
          y: chipY + 0.16,
          w: leftW - 0.96,
          h: 0.12,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 10.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(table.meta || "", {
          x: leftX + 0.72,
          y: chipY + 0.38,
          w: leftW - 0.96,
          h: chipH - 0.46,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.8,
          color: TOKENS2.ink,
          margin: 0,
          valign: "mid",
          fit: "shrink"
        });
      });
      slide.addShape(SH.chevron, {
        x: leftX + leftW + 0.1,
        y: bodyY + bodyH / 2 - 0.28,
        w: 0.24,
        h: 0.56,
        fill: { color: TOKENS2.gold },
        line: { color: TOKENS2.gold }
      });
      addSurface(slide, SH, rightX, bodyY, rightW, bodyH, {
        fill: TOKENS2.editorBg,
        line: TOKENS2.editorBg
      });
      slide.addShape(SH.roundRect, {
        x: rightX + 0.1,
        y: bodyY + 0.1,
        w: rightW - 0.2,
        h: 0.28,
        rectRadius: 0.03,
        fill: { color: TOKENS2.titleFill },
        line: { color: TOKENS2.titleFill }
      });
      slide.addText(opts.codeTitle || "SQL minimo", {
        x: rightX + 0.18,
        y: bodyY + 0.17,
        w: rightW - 1.16,
        h: 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8.4,
        bold: true,
        color: TOKENS2.white,
        margin: 0
      });
      addIconBadge(slide, SH, rightX + rightW - 0.34, bodyY + 0.15, 0.14, 0.14, "sql", {
        fill: TOKENS2.softNeutral,
        accent: TOKENS2.red,
        secondary: TOKENS2.gold
      });
      codeLines.forEach((line, index) => {
        const lineY = bodyY + 0.5 + index * 0.24;
        slide.addText(`${index + 1}`, {
          x: rightX + 0.12,
          y: lineY,
          w: 0.16,
          h: 0.1,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 7.2,
          color: TOKENS2.terminalMuted,
          margin: 0,
          align: "right"
        });
        slide.addText(line, {
          x: rightX + 0.34,
          y: lineY,
          w: rightW - 0.46,
          h: 0.1,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 8,
          color: line.includes("CREATE TABLE") || line.includes("SELECT") ? TOKENS2.warning : line.includes("PRIMARY KEY") || line.includes("NOT NULL") ? TOKENS2.success : TOKENS2.white,
          margin: 0,
          fit: "shrink"
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    function addFrameworkDecisionMatrix2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const rows = opts.rows || [
        {
          label: "Layout",
          helps: "Acelera una primera grilla o utilidades base.",
          risk: "Si se copia sin entender, el layout se vuelve rigido.",
          decision: "Definir que patron quedara compartido.",
          accent: TOKENS2.navy
        },
        {
          label: "Componentes",
          helps: "Entrega piezas listas y variantes iniciales.",
          risk: "Puede arrastrar UI ajena o verbosa.",
          decision: "Adaptar estados, nombres y espaciado propios.",
          accent: TOKENS2.red
        },
        {
          label: "Tema",
          helps: "Ordena color, espacio y consistencia visual.",
          risk: "Si nadie entiende el theme, queda caja negra.",
          decision: "Documentar tokens minimos del equipo.",
          accent: TOKENS2.gold
        }
      ];
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Frameworks con criterio", {
        fill: TOKENS2.softNeutral
      });
      const footerReserve = opts.footer ? 0.34 : 0;
      const innerX = x + 0.18;
      const innerY = y + 0.62;
      const innerW = w - 0.36;
      const innerH = h - 0.82 - footerReserve;
      const topicW = Math.max(1.1, innerW * 0.18);
      const helpW = Math.max(1.8, innerW * 0.3);
      const riskW = Math.max(1.8, innerW * 0.3);
      const decisionW = innerW - topicW - helpW - riskW - 0.18;
      const headerH = 0.34;
      const rowGap = 0.08;
      const rowH = Math.max(0.56, (innerH - headerH - rowGap * rows.length) / Math.max(rows.length, 1));
      const colGap = 0.06;
      const helpX = innerX + topicW + colGap;
      const riskX = helpX + helpW + colGap;
      const decisionX = riskX + riskW + colGap;
      [
        { x: innerX, w: topicW, text: "Zona", fill: TOKENS2.softNeutral },
        { x: helpX, w: helpW, text: "Si acelera", fill: TOKENS2.softBlue },
        { x: riskX, w: riskW, text: "Puede volver fija la interfaz", fill: TOKENS2.paleRed },
        { x: decisionX, w: decisionW, text: "Decide el equipo", fill: TOKENS2.warm }
      ].forEach((header) => {
        slide.addShape(SH.roundRect, {
          x: header.x,
          y: innerY,
          w: header.w,
          h: headerH,
          rectRadius: 0.03,
          fill: { color: header.fill },
          line: { color: header.fill }
        });
        slide.addText(header.text, {
          x: header.x + 0.12,
          y: innerY + 0.09,
          w: header.w - 0.24,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9.2,
          bold: true,
          color: TOKENS2.navy,
          align: "center",
          margin: 0
        });
      });
      rows.slice(0, 4).forEach((row, index) => {
        const rowY = innerY + headerH + rowGap + index * (rowH + rowGap);
        const accent = row.accent || (index === 0 ? TOKENS2.navy : index === 1 ? TOKENS2.red : TOKENS2.gold);
        slide.addShape(SH.roundRect, {
          x: innerX,
          y: rowY,
          w: topicW,
          h: rowH,
          rectRadius: 0.03,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.border, pt: 1 }
        });
        slide.addShape(SH.rect, {
          x: innerX,
          y: rowY,
          w: 0.08,
          h: rowH,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(row.label || "Tema", {
          x: innerX + 0.16,
          y: rowY + 0.16,
          w: topicW - 0.26,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11.2,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center"
        });
        [
          { x: helpX, w: helpW, text: row.helps || "", fill: TOKENS2.softBlue, line: TOKENS2.softBlue },
          { x: riskX, w: riskW, text: row.risk || "", fill: TOKENS2.paleRed, line: TOKENS2.paleRed },
          { x: decisionX, w: decisionW, text: row.decision || "", fill: TOKENS2.warm, line: TOKENS2.warm }
        ].forEach((cell) => {
          slide.addShape(SH.roundRect, {
            x: cell.x,
            y: rowY,
            w: cell.w,
            h: rowH,
            rectRadius: 0.03,
            fill: { color: cell.fill },
            line: { color: cell.line, pt: 1 }
          });
          slide.addText(cell.text, {
            x: cell.x + 0.14,
            y: rowY + 0.12,
            w: cell.w - 0.28,
            h: rowH - 0.18,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 8.6,
            color: TOKENS2.ink,
            margin: 0,
            valign: "mid"
          });
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.2,
          y: y + h - 0.18,
          w: w - 0.4,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.4,
          color: TOKENS2.slate,
          align: "center",
          margin: 0
        });
      }
    }
    module.exports = {
      addResponsiveViewportCompare: addResponsiveViewportCompare2,
      addResponsiveReflowPanel: addResponsiveReflowPanel2,
      addBreakpointDecisionPanel: addBreakpointDecisionPanel2,
      addComponentVariantBoard: addComponentVariantBoard2,
      addQualityDimensionsPanel: addQualityDimensionsPanel2,
      addAuditEvidenceBoard: addAuditEvidenceBoard2,
      addSeoSnippetPreview: addSeoSnippetPreview2,
      addComponentConsistencyPanel: addComponentConsistencyPanel2,
      addCssRuleStack: addCssRuleStack2,
      addCascadeInspector: addCascadeInspector2,
      addSpecificityScale: addSpecificityScale2,
      addTokenBoard: addTokenBoard2,
      addFrameworkDecisionMatrix: addFrameworkDecisionMatrix2,
      addBoxModelDiagram: addBoxModelDiagram2,
      addFlexGridLayout: addFlexGridLayout2,
      addLighthouseAuditCard: addLighthouseAuditCard2,
      addPerformanceMetricsBoard: addPerformanceMetricsBoard2,
      addNetworkLoadBoard: addNetworkLoadBoard2,
      addAuditScorePanel: addAuditScorePanel2,
      addAccessibilityChecklistPanel: addAccessibilityChecklistPanel2,
      addIssuePriorityMatrix: addIssuePriorityMatrix2,
      addEvaluationRubricPanel: addEvaluationRubricPanel2,
      addScoreBoostsAndPenalties: addScoreBoostsAndPenalties2,
      addProjectWorkflowPanel: addProjectWorkflowPanel2,
      addPromptQualityCompare: addPromptQualityCompare2,
      addSpreadsheetProblemPanel: addSpreadsheetProblemPanel2,
      addEntityRelationshipBlueprint: addEntityRelationshipBlueprint2,
      addNormalizationStepper: addNormalizationStepper2,
      addSqlBridgePanel: addSqlBridgePanel2,
      addStaticVsInteractiveCompare: addStaticVsInteractiveCompare2,
      addDataTypesBoard: addDataTypesBoard2,
      addControlFlowPanel: addControlFlowPanel2,
      addEventReactionPanel: addEventReactionPanel2,
      addDomMutationFlow: addDomMutationFlow2,
      addDebugEvidenceBoard: addDebugEvidenceBoard2
    };
  }
});

// components/foundation-panels.js
var require_foundation_panels = __commonJS({
  "components/foundation-panels.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    var PALANTIR = {
      bg: "0B0D10",
      panel: "161A1F",
      line: "2A3138",
      text: "F4F7FA",
      muted: "A8B2BD",
      steel: "5E6873",
      amber: "C89B3C",
      red: "B63A3A",
      blue: "2D4F63"
    };
    function addSurface(slide, SH, x, y, w, h, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: opts.rectRadius || 0.04,
        fill: { color: opts.fill || TOKENS2.white },
        line: { color: opts.line || TOKENS2.border, pt: opts.linePt || 1 }
      });
    }
    function addSurfaceHeader(slide, SH, x, y, w, text, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h: opts.h || 0.34,
        rectRadius: opts.rectRadius || 0.03,
        fill: { color: opts.fill || TOKENS2.softNeutral },
        line: { color: opts.fill || TOKENS2.softNeutral }
      });
      slide.addText(text, {
        x: x + 0.12,
        y: y + 0.08,
        w: w - 0.24,
        h: (opts.h || 0.34) - 0.12,
        fontFace: TYPOGRAPHY2.body,
        fontSize: opts.fontSize || 9.8,
        bold: true,
        color: opts.color || TOKENS2.navy,
        margin: 0
      });
    }
    function addUrlBreakdown2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const segments = opts.segments || [];
      const footerH = opts.footer ? 0.26 : 0;
      const innerX = x + 0.22;
      const innerW = w - 0.44;
      const urlY = y + 0.54;
      const urlH = 0.72;
      const cardsY = y + 1.52;
      const cardsH = h - (cardsY - y) - 0.2 - footerH;
      const ratios = segments.map((segment) => Math.max(0.75, segment.ratio || 1));
      const totalRatio = ratios.reduce((sum, ratio) => sum + ratio, 0) || 1;
      let cursor = innerX;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: opts.line || TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Anatomia de URL", {
        fill: opts.headerFill || TOKENS2.softNeutral
      });
      slide.addShape(SH.roundRect, {
        x: innerX,
        y: urlY,
        w: innerW,
        h: urlH,
        rectRadius: 0.04,
        fill: { color: opts.urlFill || TOKENS2.navy },
        line: { color: opts.urlFill || TOKENS2.navy }
      });
      slide.addText(opts.url || "", {
        x: innerX + 0.22,
        y: urlY + 0.2,
        w: innerW - 0.44,
        h: 0.22,
        fontFace: TYPOGRAPHY2.mono,
        fontSize: opts.urlFontSize || 16.5,
        bold: true,
        color: TOKENS2.white,
        margin: 0,
        align: "center"
      });
      segments.forEach((segment, index) => {
        const slotW = innerW * ratios[index] / totalRatio;
        const anchorX = cursor + slotW / 2;
        const cardX = cursor + 0.04;
        const cardW = Math.max(1.22, slotW - 0.08);
        const accent = segment.accent || TOKENS2.red;
        slide.addShape(SH.rect, {
          x: cursor + 0.08,
          y: urlY + urlH + 0.08,
          w: Math.max(0.2, slotW - 0.16),
          h: 0.05,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addShape(SH.line, {
          x: anchorX,
          y: urlY + urlH + 0.13,
          w: 0,
          h: 0.16,
          line: { color: accent, pt: 1.2 }
        });
        slide.addShape(SH.ellipse, {
          x: anchorX - 0.05,
          y: urlY + urlH + 0.24,
          w: 0.1,
          h: 0.1,
          fill: { color: accent },
          line: { color: accent }
        });
        addSurface(slide, SH, cardX, cardsY, cardW, cardsH, {
          fill: segment.fill || TOKENS2.white,
          line: TOKENS2.border
        });
        slide.addShape(SH.rect, {
          x: cardX + 0.1,
          y: cardsY + 0.14,
          w: 0.1,
          h: cardsH - 0.28,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(segment.label || "", {
          x: cardX + 0.28,
          y: cardsY + 0.14,
          w: cardW - 0.4,
          h: 0.16,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9.8,
          bold: true,
          color: TOKENS2.slate,
          margin: 0
        });
        slide.addText(segment.value || "", {
          x: cardX + 0.28,
          y: cardsY + 0.38,
          w: cardW - 0.4,
          h: 0.24,
          fontFace: segment.mono ? TYPOGRAPHY2.mono : TYPOGRAPHY2.display,
          fontSize: segment.valueFontSize || 13.4,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(segment.note || "", {
          x: cardX + 0.28,
          y: cardsY + 0.72,
          w: cardW - 0.4,
          h: Math.max(0.34, cardsH - 0.86),
          fontFace: TYPOGRAPHY2.body,
          fontSize: segment.noteFontSize || 10.4,
          color: TOKENS2.ink,
          margin: 0,
          valign: "top"
        });
        cursor += slotW;
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.22,
          y: y + h - 0.22,
          w: w - 0.44,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          color: TOKENS2.slate,
          margin: 0,
          align: "center"
        });
      }
    }
    function addMythRealityGrid2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const entries = opts.entries || [];
      const cols = Math.max(1, Math.min(3, opts.columns || 2));
      const rows = Math.max(1, Math.ceil(entries.length / cols));
      const gapX = 0.22;
      const gapY = 0.2;
      const footerH = opts.footer ? 0.28 : 0;
      const gridY = y + 0.6;
      const cellW = (w - 0.32 - (cols - 1) * gapX) / cols;
      const cellH = (h - 0.82 - footerH - (rows - 1) * gapY) / rows;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: opts.line || TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Confusiones comunes", {
        fill: opts.headerFill || TOKENS2.softNeutral
      });
      entries.forEach((entry, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const cellX = x + 0.16 + col * (cellW + gapX);
        const cellY = gridY + row * (cellH + gapY);
        const accent = entry.accent || TOKENS2.red;
        addSurface(slide, SH, cellX, cellY, cellW, cellH, {
          fill: entry.fill || TOKENS2.white,
          line: TOKENS2.border
        });
        slide.addShape(SH.rect, {
          x: cellX + 0.1,
          y: cellY + 0.12,
          w: 0.1,
          h: cellH - 0.24,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addShape(SH.roundRect, {
          x: cellX + 0.26,
          y: cellY + 0.14,
          w: 0.64,
          h: 0.24,
          rectRadius: 0.04,
          fill: { color: entry.badgeFill || TOKENS2.paleRed },
          line: { color: entry.badgeFill || TOKENS2.paleRed }
        });
        slide.addText(entry.badge || "Mito", {
          x: cellX + 0.26,
          y: cellY + 0.19,
          w: 0.64,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          bold: true,
          color: accent,
          margin: 0,
          align: "center"
        });
        slide.addText(entry.myth || "", {
          x: cellX + 0.26,
          y: cellY + 0.46,
          w: cellW - 0.38,
          h: 0.3,
          fontFace: TYPOGRAPHY2.display,
          fontSize: entry.mythFontSize || 13.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(entry.reality || "", {
          x: cellX + 0.26,
          y: cellY + 0.88,
          w: cellW - 0.38,
          h: Math.max(0.28, cellH - 1.02),
          fontFace: TYPOGRAPHY2.body,
          fontSize: entry.realityFontSize || 10.4,
          color: TOKENS2.ink,
          margin: 0,
          valign: "top"
        });
      });
      if (opts.footer) {
        slide.addShape(SH.roundRect, {
          x: x + 0.22,
          y: y + h - 0.44,
          w: w - 0.44,
          h: 0.24,
          rectRadius: 0.03,
          fill: { color: TOKENS2.warm },
          line: { color: TOKENS2.warm }
        });
        slide.addText(opts.footer, {
          x: x + 0.34,
          y: y + h - 0.39,
          w: w - 0.68,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center"
        });
      }
    }
    function addActorLane2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const entries = opts.entries || [];
      const railY = y + (opts.railYOffset || 1.72);
      const cardW = opts.cardW || Math.min(2.08, (w - 1.3) / Math.max(entries.length, 1));
      const topY = y + 0.6;
      const bottomY = railY + 0.34;
      const cardH = opts.cardH || 0.92;
      const startX = x + 0.58;
      const endX = x + w - 0.58;
      const step = entries.length > 1 ? (endX - startX) / (entries.length - 1) : 0;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: opts.line || TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Actores de una interaccion web", {
        fill: opts.headerFill || TOKENS2.softNeutral
      });
      slide.addShape(SH.line, {
        x: startX,
        y: railY,
        w: endX - startX,
        h: 0,
        line: { color: TOKENS2.guide, pt: 1.8 }
      });
      entries.forEach((entry, index) => {
        const nodeX = startX + step * index;
        const cardY = index % 2 === 0 ? topY : bottomY;
        const isTop = index % 2 === 0;
        const anchorY = isTop ? cardY + cardH : cardY;
        const accent = entry.accent || TOKENS2.red;
        const fill = entry.fill || TOKENS2.white;
        const dark = fill === TOKENS2.navy;
        slide.addShape(SH.ellipse, {
          x: nodeX - 0.08,
          y: railY - 0.08,
          w: 0.16,
          h: 0.16,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addShape(SH.line, {
          x: nodeX,
          y: Math.min(railY, anchorY),
          w: 0,
          h: Math.abs(anchorY - railY),
          line: { color: accent, pt: 1.1 }
        });
        addSurface(slide, SH, nodeX - cardW / 2, cardY, cardW, cardH, {
          fill,
          line: dark ? TOKENS2.navy : TOKENS2.border
        });
        slide.addShape(SH.rect, {
          x: nodeX - cardW / 2 + 0.08,
          y: cardY + 0.1,
          w: 0.08,
          h: cardH - 0.2,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(entry.label || "", {
          x: nodeX - cardW / 2 + 0.24,
          y: cardY + 0.1,
          w: cardW - 0.34,
          h: 0.2,
          fontFace: TYPOGRAPHY2.display,
          fontSize: entry.titleFontSize || 12.2,
          bold: true,
          color: dark ? TOKENS2.white : TOKENS2.navy,
          margin: 0
        });
        slide.addText(entry.body || "", {
          x: nodeX - cardW / 2 + 0.24,
          y: cardY + 0.38,
          w: cardW - 0.34,
          h: cardH - 0.5,
          fontFace: TYPOGRAPHY2.body,
          fontSize: entry.bodyFontSize || 9.6,
          color: dark ? TOKENS2.white : TOKENS2.ink,
          margin: 0,
          valign: "top"
        });
      });
      if (opts.footer) {
        slide.addShape(SH.roundRect, {
          x: x + 0.18,
          y: y + h - 0.42,
          w: w - 0.36,
          h: 0.24,
          rectRadius: 0.03,
          fill: { color: TOKENS2.warm },
          line: { color: TOKENS2.warm }
        });
        slide.addText(opts.footer, {
          x: x + 0.32,
          y: y + h - 0.37,
          w: w - 0.64,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center"
        });
      }
    }
    function addStageChain2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const stages = opts.stages || [];
      const notes = opts.notes || [];
      const compact = opts.compact ?? stages.length >= 5;
      const headerH = 0.34;
      const innerX = x + 0.18;
      const innerW = w - 0.36;
      const stageY = y + 0.58;
      const stageH = compact ? 1.22 : 1.36;
      const chevronW = compact ? 0.18 : 0.22;
      const stageGap = compact ? 0.12 : 0.16;
      const totalChevron = Math.max(0, stages.length - 1) * chevronW;
      const totalGap = Math.max(0, stages.length - 1) * stageGap;
      const stageW = stages.length > 0 ? (innerW - totalChevron - totalGap) / stages.length : innerW;
      const footerH = opts.footer ? 0.34 : 0;
      const notesY = stageY + stageH + 0.34;
      const noteH = notes.length > 0 ? h - (notesY - y) - footerH - 0.2 : 0;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: opts.line || TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Cadena de etapas", {
        fill: opts.headerFill || TOKENS2.softNeutral,
        h: headerH
      });
      stages.forEach((stage, index) => {
        const stageX = innerX + index * (stageW + stageGap + chevronW);
        const accent = stage.accent || TOKENS2.red;
        const fill = stage.fill || (stage.tone === "dark" ? TOKENS2.navy : TOKENS2.white);
        const dark = fill === TOKENS2.navy;
        const stepLabel = String(stage.step || String(index + 1));
        const timeLike = /[:.]/.test(stepLabel) || stepLabel.length >= 4;
        const badgeW = compact ? timeLike ? 0.56 : 0.22 : timeLike ? 0.72 : 0.24;
        const badgeH = compact ? 0.2 : 0.22;
        const badgeX = stageX + 0.18;
        const badgeY = stageY + 0.12;
        const titleX = badgeX + badgeW + 0.08;
        const titleW = Math.max(0.54, stageW - (titleX - stageX) - 0.12);
        addSurface(slide, SH, stageX, stageY, stageW, stageH, {
          fill,
          line: dark ? TOKENS2.navy : TOKENS2.border
        });
        slide.addShape(SH.rect, {
          x: stageX + 0.08,
          y: stageY + 0.1,
          w: 0.09,
          h: stageH - 0.2,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addShape(SH.roundRect, {
          x: badgeX,
          y: badgeY,
          w: badgeW,
          h: badgeH,
          rectRadius: 0.03,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(stepLabel, {
          x: badgeX,
          y: badgeY + 0.05,
          w: badgeW,
          h: 0.1,
          fontFace: timeLike ? TYPOGRAPHY2.mono : TYPOGRAPHY2.body,
          fontSize: timeLike ? compact ? 5.8 : 6.2 : compact ? 6.8 : 7.2,
          bold: true,
          color: accent === TOKENS2.navy ? TOKENS2.white : TOKENS2.navy,
          margin: 0,
          align: "center",
          breakLine: false,
          fit: "shrink",
          valign: "mid"
        });
        slide.addText(stage.title || "", {
          x: titleX,
          y: stageY + 0.11,
          w: titleW,
          h: 0.2,
          fontFace: TYPOGRAPHY2.display,
          fontSize: compact ? 11.4 : 12.4,
          bold: true,
          color: dark ? TOKENS2.white : TOKENS2.navy,
          margin: 0
        });
        slide.addText(stage.body || "", {
          x: stageX + 0.22,
          y: stageY + 0.44,
          w: stageW - 0.32,
          h: stageH - 0.58,
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 9.1 : 9.8,
          color: dark ? TOKENS2.white : TOKENS2.ink,
          margin: 0,
          valign: "top"
        });
        if (index < stages.length - 1) {
          slide.addShape(SH.chevron, {
            x: stageX + stageW + stageGap * 0.5,
            y: stageY + stageH / 2 - 0.15,
            w: chevronW,
            h: 0.3,
            fill: { color: opts.chevronColor || TOKENS2.gold },
            line: { color: opts.chevronColor || TOKENS2.gold }
          });
        }
      });
      if (notes.length > 0) {
        const noteGap = 0.18;
        const noteW = (innerW - noteGap * (notes.length - 1)) / notes.length;
        notes.forEach((note, index) => {
          const noteX = innerX + index * (noteW + noteGap);
          const accent = note.accent || TOKENS2.red;
          addSurface(slide, SH, noteX, notesY, noteW, noteH, {
            fill: note.fill || TOKENS2.white,
            line: note.fill === TOKENS2.navy ? TOKENS2.navy : TOKENS2.border
          });
          slide.addShape(SH.rect, {
            x: noteX + 0.08,
            y: notesY + 0.12,
            w: 0.1,
            h: noteH - 0.24,
            fill: { color: accent },
            line: { color: accent }
          });
          slide.addText(note.title || "", {
            x: noteX + 0.26,
            y: notesY + 0.12,
            w: noteW - 0.36,
            h: 0.18,
            fontFace: TYPOGRAPHY2.display,
            fontSize: 11.4,
            bold: true,
            color: note.fill === TOKENS2.navy ? TOKENS2.white : TOKENS2.navy,
            margin: 0
          });
          slide.addText(note.body || "", {
            x: noteX + 0.26,
            y: notesY + 0.42,
            w: noteW - 0.36,
            h: noteH - 0.54,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 9.5,
            color: note.fill === TOKENS2.navy ? TOKENS2.white : TOKENS2.ink,
            margin: 0,
            valign: "top"
          });
        });
      }
      if (opts.footer) {
        slide.addShape(SH.roundRect, {
          x: x + 0.22,
          y: y + h - 0.34,
          w: w - 0.44,
          h: 0.22,
          rectRadius: 0.03,
          fill: { color: TOKENS2.warm },
          line: { color: TOKENS2.warm }
        });
        slide.addText(opts.footer, {
          x: x + 0.36,
          y: y + h - 0.29,
          w: w - 0.72,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center"
        });
      }
    }
    function addIntelTimelinePanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const items = opts.items || [
        {
          date: "ABR 2025",
          title: "NATO adquiere Maven",
          body: "La OTAN incorpora una variante de MSS para fusionar inteligencia y acelerar decisiones.",
          accent: PALANTIR.amber
        },
        {
          date: "MAY 2025",
          title: "Contrato DoD",
          body: "El Pentagono amplia el contrato de Maven Smart System a escala mucho mayor.",
          accent: PALANTIR.red
        },
        {
          date: "JUL 2025",
          title: "Army enterprise",
          body: "El U.S. Army consolida multiples contratos en un acuerdo mas estructural.",
          accent: PALANTIR.blue
        },
        {
          date: "DIC 2025",
          title: "UK MoD",
          body: "Reino Unido profundiza su relacion con Palantir para decision y defensa.",
          accent: PALANTIR.steel
        }
      ];
      const headerH = 0.34;
      const footerH = opts.footer ? 0.28 : 0;
      const innerX = x + 0.18;
      const innerW = w - 0.36;
      const railY = y + 1.12;
      const cardY = y + 1.38;
      const cardH = h - (cardY - y) - footerH - 0.26;
      const cardGap = 0.16;
      const chevronW = 0.18;
      const totalChevron = Math.max(0, items.length - 1) * chevronW;
      const totalGap = Math.max(0, items.length - 1) * cardGap;
      const cardW = items.length > 0 ? (innerW - totalChevron - totalGap) / items.length : innerW;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || PALANTIR.bg,
        line: opts.line || PALANTIR.line
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Hitos recientes de Palantir", {
        fill: opts.headerFill || PALANTIR.panel,
        color: PALANTIR.text,
        h: headerH
      });
      slide.addShape(SH.rect, {
        x: innerX,
        y: railY,
        w: innerW,
        h: 0.04,
        fill: { color: PALANTIR.line },
        line: { color: PALANTIR.line }
      });
      items.forEach((item, index) => {
        const cardX = innerX + index * (cardW + cardGap + chevronW);
        const accent = item.accent || PALANTIR.amber;
        const badgeW = 0.68;
        slide.addShape(SH.ellipse, {
          x: cardX + cardW / 2 - 0.06,
          y: railY - 0.06,
          w: 0.12,
          h: 0.12,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addShape(SH.rect, {
          x: cardX + cardW / 2 - 0.01,
          y: railY + 0.04,
          w: 0.02,
          h: 0.18,
          fill: { color: accent },
          line: { color: accent }
        });
        addSurface(slide, SH, cardX, cardY, cardW, cardH, {
          fill: item.fill || PALANTIR.panel,
          line: PALANTIR.line
        });
        slide.addShape(SH.rect, {
          x: cardX + 0.1,
          y: cardY + 0.12,
          w: 0.08,
          h: cardH - 0.24,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addShape(SH.roundRect, {
          x: cardX + 0.26,
          y: cardY + 0.12,
          w: badgeW,
          h: 0.22,
          rectRadius: 0.04,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(item.date || "", {
          x: cardX + 0.26,
          y: cardY + 0.17,
          w: badgeW,
          h: 0.08,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 7.2,
          bold: true,
          color: PALANTIR.bg,
          margin: 0,
          align: "center"
        });
        slide.addText(item.title || "", {
          x: cardX + 0.26,
          y: cardY + 0.44,
          w: cardW - 0.36,
          h: 0.32,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 12.2,
          bold: true,
          color: PALANTIR.text,
          margin: 0,
          fit: "shrink"
        });
        slide.addText(item.body || "", {
          x: cardX + 0.26,
          y: cardY + 0.84,
          w: cardW - 0.36,
          h: cardH - 0.96,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9.2,
          color: PALANTIR.muted,
          margin: 0,
          valign: "top"
        });
        if (index < items.length - 1) {
          slide.addShape(SH.chevron, {
            x: cardX + cardW + cardGap * 0.5,
            y: cardY + cardH / 2 - 0.12,
            w: chevronW,
            h: 0.24,
            fill: { color: opts.chevronColor || PALANTIR.steel },
            line: { color: opts.chevronColor || PALANTIR.steel }
          });
        }
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.22,
          y: y + h - 0.2,
          w: w - 0.44,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          color: PALANTIR.muted,
          margin: 0,
          align: "center"
        });
      }
    }
    function addDecisionPipelinePanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const stages = opts.stages || [
        { label: "01", title: "Datos", body: "Sensores, imagenes, reportes y se\xF1ales fragmentadas.", accent: PALANTIR.steel },
        { label: "02", title: "Deteccion", body: "El sistema identifica patrones, objetos o eventos relevantes.", accent: PALANTIR.amber },
        { label: "03", title: "Analisis", body: "La informacion se cruza, ordena y contextualiza.", accent: PALANTIR.blue },
        { label: "04", title: "Priorizacion", body: "Se destacan amenazas, objetivos o decisiones urgentes.", accent: PALANTIR.red },
        { label: "05", title: "Operador", body: "Un humano interpreta y valida antes de actuar.", accent: PALANTIR.steel },
        { label: "06", title: "Decision", body: "La salida se convierte en accion o recomendacion operacional.", accent: PALANTIR.amber }
      ];
      const footerH = opts.footer ? 0.28 : 0;
      const innerX = x + 0.18;
      const innerW = w - 0.36;
      const stageY = y + 0.62;
      const stageH = h - 1.04 - footerH;
      const gap = 0.12;
      const chevronW = 0.16;
      const totalChevron = Math.max(0, stages.length - 1) * chevronW;
      const totalGap = Math.max(0, stages.length - 1) * gap;
      const stageW = stages.length > 0 ? (innerW - totalChevron - totalGap) / stages.length : innerW;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || PALANTIR.bg,
        line: opts.line || PALANTIR.line
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Pipeline de decision de Maven", {
        fill: opts.headerFill || PALANTIR.panel,
        color: PALANTIR.text
      });
      stages.forEach((stage, index) => {
        const stageX = innerX + index * (stageW + gap + chevronW);
        const accent = stage.accent || PALANTIR.amber;
        addSurface(slide, SH, stageX, stageY, stageW, stageH, {
          fill: stage.fill || PALANTIR.panel,
          line: PALANTIR.line
        });
        slide.addShape(SH.rect, {
          x: stageX + 0.08,
          y: stageY + 0.1,
          w: 0.08,
          h: stageH - 0.2,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addShape(SH.roundRect, {
          x: stageX + 0.22,
          y: stageY + 0.12,
          w: 0.32,
          h: 0.22,
          rectRadius: 0.04,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(stage.label || String(index + 1).padStart(2, "0"), {
          x: stageX + 0.22,
          y: stageY + 0.17,
          w: 0.32,
          h: 0.08,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 6.8,
          bold: true,
          color: PALANTIR.bg,
          margin: 0,
          align: "center"
        });
        slide.addText(stage.title || "", {
          x: stageX + 0.22,
          y: stageY + 0.44,
          w: stageW - 0.3,
          h: 0.22,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11.4,
          bold: true,
          color: PALANTIR.text,
          margin: 0,
          fit: "shrink"
        });
        slide.addText(stage.body || "", {
          x: stageX + 0.22,
          y: stageY + 0.78,
          w: stageW - 0.3,
          h: stageH - 0.9,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9,
          color: PALANTIR.muted,
          margin: 0,
          valign: "top"
        });
        if (index < stages.length - 1) {
          slide.addShape(SH.chevron, {
            x: stageX + stageW + gap * 0.5,
            y: stageY + stageH / 2 - 0.12,
            w: chevronW,
            h: 0.24,
            fill: { color: opts.chevronColor || PALANTIR.amber },
            line: { color: opts.chevronColor || PALANTIR.amber }
          });
        }
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.22,
          y: y + h - 0.2,
          w: w - 0.44,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          color: PALANTIR.muted,
          margin: 0,
          align: "center"
        });
      }
    }
    function addPowerNetworkMap2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const center = opts.center || {
        title: "Palantir",
        body: "Plataforma de datos, IA y soporte a decisiones.",
        accent: PALANTIR.amber
      };
      const nodes = opts.nodes || [
        { title: "DoD", body: "Maven y contratos de defensa", accent: PALANTIR.red, position: "lt" },
        { title: "U.S. Army", body: "Acuerdos enterprise y consolidacion", accent: PALANTIR.blue, position: "lb" },
        { title: "NATO", body: "Adopcion de MSS NATO", accent: PALANTIR.amber, position: "rt" },
        { title: "UK MoD", body: "Uso estrategico y operacional", accent: PALANTIR.steel, position: "rb" },
        { title: "Anthropic / IA", body: "Modelos frontier en redes clasificadas", accent: PALANTIR.amber, position: "bc" }
      ];
      const positions = {
        lt: { x: x + 0.38, y: y + 0.9 },
        lb: { x: x + 0.38, y: y + h - 1.64 },
        rt: { x: x + w - 2.72, y: y + 0.9 },
        rb: { x: x + w - 2.72, y: y + h - 1.64 },
        bc: { x: x + w / 2 - 1.18, y: y + h - 1.1 }
      };
      const centerW = 2.36;
      const centerH = 1.16;
      const centerX = x + w / 2 - centerW / 2;
      const centerY = y + h / 2 - centerH / 2 - 0.18;
      const nodeW = 2.34;
      const nodeH = 0.96;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || PALANTIR.bg,
        line: opts.line || PALANTIR.line
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Red de poder y contratos", {
        fill: opts.headerFill || PALANTIR.panel,
        color: PALANTIR.text
      });
      nodes.forEach((node) => {
        const pos = positions[node.position] || positions.lt;
        const accent = node.accent || PALANTIR.red;
        const nodeCenterX = pos.x + nodeW / 2;
        const nodeCenterY = pos.y + nodeH / 2;
        const centerMidX = centerX + centerW / 2;
        const centerMidY = centerY + centerH / 2;
        const horizontalY = nodeCenterY < centerMidY ? nodeCenterY + 0.02 : nodeCenterY - 0.02;
        const leftX = Math.min(nodeCenterX, centerMidX);
        const rightX = Math.max(nodeCenterX, centerMidX);
        const topY = Math.min(horizontalY, centerMidY);
        const bottomY = Math.max(horizontalY, centerMidY);
        slide.addShape(SH.rect, {
          x: leftX,
          y: horizontalY,
          w: rightX - leftX,
          h: 0.02,
          fill: { color: PALANTIR.line },
          line: { color: PALANTIR.line }
        });
        slide.addShape(SH.rect, {
          x: centerMidX - 0.01,
          y: topY,
          w: 0.02,
          h: bottomY - topY,
          fill: { color: PALANTIR.line },
          line: { color: PALANTIR.line }
        });
        slide.addShape(SH.ellipse, {
          x: nodeCenterX - 0.05,
          y: nodeCenterY - 0.05,
          w: 0.1,
          h: 0.1,
          fill: { color: accent },
          line: { color: accent }
        });
        addSurface(slide, SH, pos.x, pos.y, nodeW, nodeH, {
          fill: PALANTIR.panel,
          line: PALANTIR.line
        });
        slide.addShape(SH.rect, {
          x: pos.x + 0.08,
          y: pos.y + 0.1,
          w: 0.08,
          h: nodeH - 0.2,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(node.title || "", {
          x: pos.x + 0.24,
          y: pos.y + 0.12,
          w: nodeW - 0.34,
          h: 0.18,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11.2,
          bold: true,
          color: PALANTIR.text,
          margin: 0,
          fit: "shrink"
        });
        slide.addText(node.body || "", {
          x: pos.x + 0.24,
          y: pos.y + 0.42,
          w: nodeW - 0.34,
          h: nodeH - 0.52,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          color: PALANTIR.muted,
          margin: 0,
          valign: "top"
        });
      });
      addSurface(slide, SH, centerX, centerY, centerW, centerH, {
        fill: PALANTIR.panel,
        line: center.accent || PALANTIR.amber,
        linePt: 1.4
      });
      slide.addShape(SH.rect, {
        x: centerX + 0.1,
        y: centerY + 0.12,
        w: 0.1,
        h: centerH - 0.24,
        fill: { color: center.accent || PALANTIR.amber },
        line: { color: center.accent || PALANTIR.amber }
      });
      slide.addText(center.title || "", {
        x: centerX + 0.28,
        y: centerY + 0.18,
        w: centerW - 0.38,
        h: 0.22,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 13.8,
        bold: true,
        color: PALANTIR.text,
        margin: 0,
        align: "center"
      });
      slide.addText(center.body || "", {
        x: centerX + 0.28,
        y: centerY + 0.5,
        w: centerW - 0.38,
        h: 0.4,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 9.2,
        color: PALANTIR.muted,
        margin: 0,
        align: "center",
        valign: "mid"
      });
    }
    module.exports = {
      addUrlBreakdown: addUrlBreakdown2,
      addMythRealityGrid: addMythRealityGrid2,
      addActorLane: addActorLane2,
      addStageChain: addStageChain2,
      addIntelTimelinePanel: addIntelTimelinePanel2,
      addDecisionPipelinePanel: addDecisionPipelinePanel2,
      addPowerNetworkMap: addPowerNetworkMap2
    };
  }
});

// components/security-panels.js
var require_security_panels = __commonJS({
  "components/security-panels.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    function addSurface(slide, SH, x, y, w, h, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: opts.rectRadius || 0.04,
        fill: { color: opts.fill || TOKENS2.white },
        line: { color: opts.line || TOKENS2.border, pt: opts.linePt || 1 }
      });
    }
    function addSurfaceHeader(slide, SH, x, y, w, text, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h: opts.h || 0.34,
        rectRadius: opts.rectRadius || 0.03,
        fill: { color: opts.fill || TOKENS2.softNeutral },
        line: { color: opts.fill || TOKENS2.softNeutral }
      });
      slide.addText(text, {
        x: x + 0.12,
        y: y + 0.08,
        w: w - 0.24,
        h: (opts.h || 0.34) - 0.12,
        fontFace: TYPOGRAPHY2.body,
        fontSize: opts.fontSize || 9.8,
        bold: true,
        color: opts.color || TOKENS2.navy,
        margin: 0
      });
    }
    function addExposureCompare2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const leftW = opts.leftW || 3.18;
      const bridgeW = opts.bridgeW || 1.06;
      const gap = opts.gap || 0.22;
      const rightW = w - leftW - bridgeW - gap * 2;
      const panelY = y + 0.6;
      const panelH = h - 1.2;
      const left = opts.left || {};
      const right = opts.right || {};
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: opts.line || TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Cambio de exposicion", {
        fill: opts.headerFill || TOKENS2.softNeutral
      });
      addSurface(slide, SH, x + 0.16, panelY, leftW, panelH, {
        fill: left.fill || TOKENS2.navy,
        line: left.fill || TOKENS2.navy
      });
      slide.addShape(SH.rect, {
        x: x + 0.3,
        y: panelY + 0.16,
        w: 0.12,
        h: panelH - 0.32,
        fill: { color: left.accent || TOKENS2.gold },
        line: { color: left.accent || TOKENS2.gold }
      });
      slide.addText(left.label || "En local", {
        x: x + 0.54,
        y: panelY + 0.18,
        w: leftW - 0.74,
        h: 0.18,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 11,
        bold: true,
        color: left.fill ? TOKENS2.gold : TOKENS2.navy,
        margin: 0
      });
      slide.addText(left.title || "", {
        x: x + 0.54,
        y: panelY + 0.52,
        w: leftW - 0.74,
        h: 0.6,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 19,
        bold: true,
        color: TOKENS2.white,
        margin: 0
      });
      slide.addText(left.body || "", {
        x: x + 0.54,
        y: panelY + 1.36,
        w: leftW - 0.74,
        h: panelH - 1.58,
        fontFace: TYPOGRAPHY2.body,
        fontSize: left.bodyFontSize || 13.2,
        color: "E7EEF8",
        margin: 0
      });
      const bridgeX = x + 0.16 + leftW + gap;
      slide.addShape(SH.roundRect, {
        x: bridgeX + 0.1,
        y: panelY + 0.92,
        w: bridgeW - 0.2,
        h: 0.72,
        rectRadius: 0.08,
        fill: { color: TOKENS2.warm },
        line: { color: TOKENS2.warm }
      });
      slide.addText(opts.bridgeLabel || "Al publicar", {
        x: bridgeX + 0.18,
        y: panelY + 1.1,
        w: bridgeW - 0.36,
        h: 0.18,
        fontFace: TYPOGRAPHY2.body,
        fontSize: opts.bridgeFontSize || 8.8,
        bold: true,
        color: TOKENS2.navy,
        margin: 0,
        align: "center"
      });
      slide.addShape(SH.chevron, {
        x: bridgeX + 0.18,
        y: panelY + 1.92,
        w: bridgeW - 0.36,
        h: 0.34,
        fill: { color: opts.bridgeAccent || TOKENS2.orange },
        line: { color: opts.bridgeAccent || TOKENS2.orange }
      });
      addSurface(slide, SH, bridgeX + bridgeW + gap, panelY, rightW, panelH, {
        fill: right.fill || TOKENS2.softBlue,
        line: right.fill || TOKENS2.softBlue
      });
      slide.addShape(SH.rect, {
        x: bridgeX + bridgeW + gap + 0.14,
        y: panelY + 0.16,
        w: 0.12,
        h: panelH - 0.32,
        fill: { color: right.accent || TOKENS2.red },
        line: { color: right.accent || TOKENS2.red }
      });
      slide.addText(right.label || "Publicado", {
        x: bridgeX + bridgeW + gap + 0.42,
        y: panelY + 0.18,
        w: rightW - 0.58,
        h: 0.18,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 11,
        bold: true,
        color: TOKENS2.slate,
        margin: 0
      });
      slide.addText(right.title || "", {
        x: bridgeX + bridgeW + gap + 0.42,
        y: panelY + 0.52,
        w: rightW - 0.58,
        h: 0.54,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 18,
        bold: true,
        color: TOKENS2.navy,
        margin: 0
      });
      slide.addText(right.body || "", {
        x: bridgeX + bridgeW + gap + 0.42,
        y: panelY + 1.24,
        w: rightW - 0.58,
        h: panelH - 1.46,
        fontFace: TYPOGRAPHY2.body,
        fontSize: right.bodyFontSize || 13,
        color: TOKENS2.ink,
        margin: 0
      });
      if (opts.footer) {
        slide.addShape(SH.roundRect, {
          x: x + 0.22,
          y: y + h - 0.42,
          w: w - 0.44,
          h: 0.24,
          rectRadius: 0.03,
          fill: { color: TOKENS2.warm },
          line: { color: TOKENS2.warm }
        });
        slide.addText(opts.footer, {
          x: x + 0.34,
          y: y + h - 0.37,
          w: w - 0.68,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center"
        });
      }
    }
    function addChecklistGrid2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const entries = opts.entries || [];
      const cols = Math.max(1, Math.min(3, opts.columns || 2));
      const rows = Math.max(1, Math.ceil(entries.length / cols));
      const gapX = 0.2;
      const gapY = 0.18;
      const footerH = opts.footer ? 0.28 : 0;
      const headerY = y + 0.56;
      const cellH = (h - 0.84 - footerH - (rows - 1) * gapY) / rows;
      const cellW = (w - 0.32 - (cols - 1) * gapX) / cols;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: opts.line || TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Checklist", {
        fill: opts.headerFill || TOKENS2.softNeutral
      });
      entries.forEach((entry, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const cellX = x + 0.16 + col * (cellW + gapX);
        const currentY = headerY + row * (cellH + gapY);
        const accent = entry.accent || TOKENS2.red;
        const badgeText = entry.badge || "Revisar";
        const badgeW = Math.min(cellW * 0.34, Math.max(0.42, badgeText.length * 0.06 + 0.1));
        const badgeX = cellX + 0.12;
        const accentX = badgeX + badgeW + 0.14;
        const textX = accentX + 0.22;
        const textW = cellW - (textX - cellX) - 0.14;
        addSurface(slide, SH, cellX, currentY, cellW, cellH, {
          fill: entry.fill || TOKENS2.white,
          line: TOKENS2.border
        });
        slide.addShape(SH.roundRect, {
          x: badgeX,
          y: currentY + 0.14,
          w: badgeW,
          h: 0.24,
          rectRadius: 0.05,
          fill: { color: entry.badgeFill || TOKENS2.paleRed },
          line: { color: entry.badgeFill || TOKENS2.paleRed }
        });
        slide.addText(badgeText, {
          x: badgeX,
          y: currentY + 0.19,
          w: badgeW,
          h: 0.08,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.8,
          bold: true,
          color: accent,
          margin: 0,
          align: "center"
        });
        slide.addShape(SH.rect, {
          x: accentX,
          y: currentY + 0.14,
          w: 0.08,
          h: cellH - 0.28,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(entry.title || "", {
          x: textX,
          y: currentY + 0.16,
          w: textW,
          h: 0.18,
          fontFace: TYPOGRAPHY2.display,
          fontSize: entry.titleFontSize || 13.6,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText(entry.body || "", {
          x: textX,
          y: currentY + 0.48,
          w: textW,
          h: cellH - 0.64,
          fontFace: TYPOGRAPHY2.body,
          fontSize: entry.bodyFontSize || 10.6,
          color: TOKENS2.ink,
          margin: 0,
          valign: "top"
        });
      });
      if (opts.footer) {
        slide.addShape(SH.roundRect, {
          x: x + 0.22,
          y: y + h - 0.42,
          w: w - 0.44,
          h: 0.24,
          rectRadius: 0.03,
          fill: { color: TOKENS2.softNeutral },
          line: { color: TOKENS2.softNeutral }
        });
        slide.addText(opts.footer, {
          x: x + 0.34,
          y: y + h - 0.37,
          w: w - 0.68,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center"
        });
      }
    }
    function addAuthFlow2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const steps = opts.steps || [];
      const footerH = opts.footer ? 0.3 : 0;
      const exampleH = opts.example ? 0.86 : 0;
      const gap = 0.22;
      const innerW = w - 0.32 - gap * Math.max(0, steps.length - 1);
      const stepW = innerW / Math.max(steps.length, 1);
      const stepH = h - 0.9 - exampleH - footerH;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: opts.line || TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Flujo de acceso", {
        fill: opts.headerFill || TOKENS2.softNeutral
      });
      steps.forEach((step, index) => {
        const stepX = x + 0.16 + index * (stepW + gap);
        const accent = step.accent || TOKENS2.red;
        const fill = step.fill || TOKENS2.white;
        const dark = fill === TOKENS2.navy;
        addSurface(slide, SH, stepX, y + 0.58, stepW, stepH, {
          fill,
          line: dark ? TOKENS2.navy : TOKENS2.border
        });
        slide.addShape(SH.roundRect, {
          x: stepX + stepW - 0.44,
          y: y + 0.68,
          w: 0.28,
          h: 0.22,
          rectRadius: 0.05,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(step.step || String(index + 1), {
          x: stepX + stepW - 0.44,
          y: y + 0.74,
          w: 0.28,
          h: 0.08,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.8,
          bold: true,
          color: TOKENS2.white,
          margin: 0,
          align: "center"
        });
        slide.addShape(SH.rect, {
          x: stepX + 0.14,
          y: y + 0.76,
          w: 0.1,
          h: stepH - 0.28,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(step.title || "", {
          x: stepX + 0.34,
          y: y + 0.76,
          w: stepW - 0.48,
          h: 0.2,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 13.8,
          bold: true,
          color: dark ? TOKENS2.white : TOKENS2.navy,
          margin: 0
        });
        slide.addText(step.body || "", {
          x: stepX + 0.34,
          y: y + 1.1,
          w: stepW - 0.48,
          h: stepH - 0.52,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 10.6,
          color: dark ? TOKENS2.white : TOKENS2.ink,
          margin: 0,
          valign: "top"
        });
        if (index < steps.length - 1) {
          slide.addShape(SH.chevron, {
            x: stepX + stepW + 0.05,
            y: y + 1.48,
            w: 0.12,
            h: 0.26,
            fill: { color: opts.chevronColor || TOKENS2.orange },
            line: { color: opts.chevronColor || TOKENS2.orange }
          });
        }
      });
      if (opts.example) {
        slide.addShape(SH.roundRect, {
          x: x + 0.22,
          y: y + h - footerH - 0.58,
          w: w - 0.44,
          h: 0.38,
          rectRadius: 0.03,
          fill: { color: TOKENS2.warm },
          line: { color: TOKENS2.warm }
        });
        slide.addText(opts.example, {
          x: x + 0.36,
          y: y + h - footerH - 0.47,
          w: w - 0.72,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center"
        });
      }
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.22,
          y: y + h - 0.16,
          w: w - 0.44,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.6,
          color: TOKENS2.slate,
          margin: 0,
          align: "center"
        });
      }
    }
    module.exports = {
      addExposureCompare: addExposureCompare2,
      addChecklistGrid: addChecklistGrid2,
      addAuthFlow: addAuthFlow2
    };
  }
});

// components/app-panels.js
var require_app_panels = __commonJS({
  "components/app-panels.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    var { makeCodeText: makeCodeText2 } = require_code();
    function addSurface(slide, SH, x, y, w, h, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: opts.rectRadius || 0.04,
        fill: { color: opts.fill || TOKENS2.white },
        line: { color: opts.line || TOKENS2.border, pt: opts.linePt || 1 }
      });
    }
    function addHeader2(slide, SH, x, y, w, text, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h: 0.34,
        rectRadius: 0.03,
        fill: { color: opts.fill || TOKENS2.softNeutral },
        line: { color: opts.fill || TOKENS2.softNeutral }
      });
      slide.addText(text, {
        x: x + 0.12,
        y: y + 0.08,
        w: w - 0.24,
        h: 0.14,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 9.8,
        bold: true,
        color: opts.color || TOKENS2.navy,
        margin: 0
      });
    }
    function addJsonPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: 0.04,
        fill: { color: opts.fill || TOKENS2.editorBg },
        line: { color: opts.fill || TOKENS2.editorBg }
      });
      slide.addShape(SH.roundRect, {
        x: x + 0.14,
        y: y + 0.12,
        w: w - 0.28,
        h: 0.34,
        rectRadius: 0.03,
        fill: { color: opts.titleFill || TOKENS2.titleFill },
        line: { color: opts.titleFill || TOKENS2.titleFill }
      });
      slide.addText(opts.title || "JSON", {
        x: x + 0.26,
        y: y + 0.2,
        w: w - 0.52,
        h: 0.14,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 10,
        bold: true,
        color: TOKENS2.white,
        margin: 0
      });
      const codeData = makeCodeText2(opts.code || '{\n  "ok": true\n}');
      const fontSize = opts.fontSize || 10.6;
      const digits = codeData.lineDigits;
      const charW = Math.min(0.085, Math.max(0.058, fontSize * 68e-4));
      const numbersW = charW * (digits + 0.6);
      const codeX = x + 0.24 + numbersW + 0.08;
      const codeW = Math.max(0.4, w - (codeX - x) - 0.24);
      slide.addText(codeData.lineNumbers, {
        x: x + 0.24,
        y: y + 0.62,
        w: numbersW,
        h: h - 0.82,
        margin: 0,
        breakLine: false,
        valign: "top",
        align: "right",
        fontFace: "Consolas",
        fontSize,
        color: TOKENS2.slate
      });
      slide.addText(codeData.codeText, {
        x: codeX,
        y: y + 0.62,
        w: codeW,
        h: h - 0.82,
        margin: 0,
        breakLine: false,
        valign: "top",
        fontFace: "Consolas",
        fontSize,
        color: TOKENS2.white
      });
    }
    function addRequestResponseFlow2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const laneY = y + h / 2 - 0.18;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addHeader2(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Request / Response", {
        fill: TOKENS2.softNeutral
      });
      addSurface(slide, SH, x + 0.24, laneY, 1.28, 0.74, {
        fill: TOKENS2.softBlue,
        line: TOKENS2.softBlue
      });
      slide.addText(opts.clientLabel || "Cliente", {
        x: x + 0.24,
        y: laneY + 0.16,
        w: 1.28,
        h: 0.16,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 12.5,
        bold: true,
        color: TOKENS2.navy,
        align: "center",
        margin: 0
      });
      addSurface(slide, SH, x + w - 1.52, laneY, 1.28, 0.74, {
        fill: TOKENS2.paleRed,
        line: TOKENS2.paleRed
      });
      slide.addText(opts.serverLabel || "Servidor", {
        x: x + w - 1.52,
        y: laneY + 0.16,
        w: 1.28,
        h: 0.16,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 12.5,
        bold: true,
        color: TOKENS2.navy,
        align: "center",
        margin: 0
      });
      slide.addShape(SH.chevron, {
        x: x + 1.82,
        y: laneY + 0.08,
        w: 0.48,
        h: 0.24,
        fill: { color: TOKENS2.red },
        line: { color: TOKENS2.red }
      });
      slide.addText(opts.requestLabel || "GET /api/cursos", {
        x: x + 2.34,
        y: laneY - 0.02,
        w: w - 4.68,
        h: 0.18,
        fontFace: TYPOGRAPHY2.mono,
        fontSize: 10.2,
        color: TOKENS2.navy,
        align: "center",
        margin: 0
      });
      slide.addText(opts.requestMeta || "Headers, params, auth, payload", {
        x: x + 2.34,
        y: laneY + 0.2,
        w: w - 4.68,
        h: 0.12,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8.8,
        color: TOKENS2.slate,
        align: "center",
        margin: 0
      });
      slide.addShape(SH.chevron, {
        x: x + w - 2.3,
        y: laneY + 0.42,
        w: 0.48,
        h: 0.24,
        rotate: 180,
        fill: { color: TOKENS2.navy },
        line: { color: TOKENS2.navy }
      });
      slide.addText(opts.responseLabel || "200 OK", {
        x: x + 2.34,
        y: laneY + 0.48,
        w: w - 4.68,
        h: 0.16,
        fontFace: TYPOGRAPHY2.mono,
        fontSize: 10.2,
        color: TOKENS2.navy,
        align: "center",
        margin: 0
      });
      slide.addText(opts.responseMeta || "JSON, errores o confirmaci\xF3n", {
        x: x + 2.34,
        y: laneY + 0.7,
        w: w - 4.68,
        h: 0.12,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8.8,
        color: TOKENS2.slate,
        align: "center",
        margin: 0
      });
    }
    function addComponentTree2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const nodes = opts.nodes || [];
      const compact = w <= 3.6;
      const rowStep = compact ? 0.5 : 0.54;
      const nodeHeight = compact ? 0.28 : 0.32;
      const nodeLabelInset = compact ? 0.08 : 0.1;
      const nodeLabelY = compact ? 0.065 : 0.08;
      addSurface(slide, SH, x, y, w, h, {
        fill: TOKENS2.white,
        line: TOKENS2.border
      });
      addHeader2(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "\xC1rbol de componentes", {
        fill: TOKENS2.softBlue
      });
      nodes.forEach((node, index) => {
        const nodeY = y + 0.74 + index * rowStep;
        const depth = node.depth || 0;
        const nodeX = x + 0.34 + depth * 1.02;
        const fill = depth === 0 ? TOKENS2.paleRed : depth % 2 === 0 ? TOKENS2.softNeutral : TOKENS2.softBlue;
        const line = depth === 0 ? TOKENS2.red : depth % 2 === 0 ? TOKENS2.gold : TOKENS2.navy;
        const nodeWidth = Math.min(1.64, 0.74 + (node.label || "").length * 0.1);
        const labelWidth = Math.min(1.44, 0.54 + (node.label || "").length * 0.1);
        if (depth > 0) {
          slide.addShape(SH.line, {
            x: nodeX - 0.16,
            y: nodeY + nodeHeight / 2,
            w: 0.16,
            h: 0,
            line: { color: TOKENS2.guide, pt: 1 }
          });
        }
        if (index < nodes.length - 1 && (nodes[index + 1].depth || 0) > depth) {
          slide.addShape(SH.line, {
            x: nodeX - 0.16,
            y: nodeY + nodeHeight / 2,
            w: 0,
            h: rowStep,
            line: { color: TOKENS2.guide, pt: 1 }
          });
        }
        slide.addShape(SH.roundRect, {
          x: nodeX,
          y: nodeY,
          w: nodeWidth,
          h: nodeHeight,
          rectRadius: 0.03,
          fill: { color: fill },
          line: { color: line, pt: 1 }
        });
        slide.addText(node.label || "Component", {
          x: nodeX + nodeLabelInset,
          y: nodeY + nodeLabelY,
          w: labelWidth,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 8.8 : 9.4,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center"
        });
        if (node.meta) {
          const sideMetaX = nodeX + nodeWidth + 0.18;
          const sideMetaW = x + w - sideMetaX - 0.18;
          const metaOptions = compact ? {
            x: nodeX + 0.08,
            y: nodeY + 0.31,
            w: Math.max(0.84, w - (nodeX - x) - 0.24),
            h: 0.1,
            fontSize: 7.1
          } : sideMetaW >= 0.92 ? {
            x: sideMetaX,
            y: nodeY + 0.04,
            w: sideMetaW,
            h: 0.22,
            fontSize: sideMetaW < 1.28 ? 7.2 : 7.8
          } : {
            x: nodeX + 0.08,
            y: nodeY + 0.35,
            w: Math.max(0.9, w - (nodeX - x) - 0.24),
            h: 0.1,
            fontSize: 7
          };
          slide.addText(node.meta, {
            ...metaOptions,
            fontFace: TYPOGRAPHY2.body,
            color: TOKENS2.slate,
            margin: 0,
            fit: "shrink",
            valign: "mid"
          });
        }
      });
    }
    module.exports = {
      addJsonPanel: addJsonPanel2,
      addRequestResponseFlow: addRequestResponseFlow2,
      addComponentTree: addComponentTree2
    };
  }
});

// components/agentic-panels.js
var require_agentic_panels = __commonJS({
  "components/agentic-panels.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    function addSurface(slide, SH, x, y, w, h, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: opts.rectRadius || 0.04,
        fill: { color: opts.fill || TOKENS2.white },
        line: { color: opts.line || TOKENS2.border, pt: opts.linePt || 1 }
      });
    }
    function addSurfaceHeader(slide, SH, x, y, w, text, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h: opts.h || 0.34,
        rectRadius: opts.rectRadius || 0.03,
        fill: { color: opts.fill || TOKENS2.softNeutral },
        line: { color: opts.fill || TOKENS2.softNeutral }
      });
      slide.addText(text, {
        x: x + 0.12,
        y: y + 0.08,
        w: w - 0.24,
        h: (opts.h || 0.34) - 0.12,
        fontFace: TYPOGRAPHY2.body,
        fontSize: opts.fontSize || 9.8,
        bold: true,
        color: opts.color || TOKENS2.navy,
        margin: 0
      });
    }
    function addLabelPill(slide, SH, x, y, w, text, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h: opts.h || 0.24,
        rectRadius: 0.04,
        fill: { color: opts.fill || TOKENS2.warm },
        line: { color: opts.fill || TOKENS2.warm }
      });
      slide.addText(text, {
        x,
        y: y + 0.05,
        w,
        h: (opts.h || 0.24) - 0.08,
        fontFace: TYPOGRAPHY2.body,
        fontSize: opts.fontSize || 8.2,
        bold: true,
        color: opts.color || TOKENS2.slate,
        margin: 0,
        align: "center"
      });
    }
    function addAgenticFlow2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const steps = opts.steps || [
        { step: "1", title: "Intencion", body: "Que debe lograrse y para quien.", accent: TOKENS2.red },
        { step: "2", title: "Contexto", body: "Restricciones, archivos y entorno real.", accent: TOKENS2.gold },
        { step: "3", title: "Agente", body: "Propone, ejecuta o acelera tareas acotadas.", accent: TOKENS2.titleFill },
        { step: "4", title: "Validacion", body: "Pruebas, lectura, inspeccion y decision.", accent: TOKENS2.red }
      ];
      const compact = Boolean(opts.compact || w < 8.6 || steps.length > 4);
      const footerH = opts.footer ? 0.28 : 0;
      const innerY = y + 0.62;
      const innerH = h - 0.84 - footerH;
      const cols = compact ? 2 : steps.length;
      const rows = compact ? Math.ceil(steps.length / 2) : 1;
      const gapX = compact ? 0.22 : 0.18;
      const gapY = 0.22;
      const cellW = (w - 0.32 - gapX * (cols - 1)) / cols;
      const cellH = (innerH - gapY * (rows - 1)) / rows;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: opts.line || TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Flujo de trabajo con agentes", {
        fill: opts.headerFill || TOKENS2.softNeutral
      });
      steps.forEach((entry, index) => {
        const col = compact ? index % cols : index;
        const row = compact ? Math.floor(index / cols) : 0;
        const cellX = x + 0.16 + col * (cellW + gapX);
        const cellY = innerY + row * (cellH + gapY);
        const accent = entry.accent || TOKENS2.red;
        const fill = entry.fill || TOKENS2.white;
        const tone = entry.tone || "light";
        const titleColor = tone === "dark" ? TOKENS2.white : TOKENS2.navy;
        const bodyColor = tone === "dark" ? "E7EEF8" : TOKENS2.ink;
        addSurface(slide, SH, cellX, cellY, cellW, cellH, {
          fill,
          line: fill === TOKENS2.white ? TOKENS2.border : fill
        });
        slide.addShape(SH.rect, {
          x: cellX + 0.1,
          y: cellY + 0.14,
          w: 0.1,
          h: cellH - 0.28,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addShape(SH.roundRect, {
          x: cellX + 0.26,
          y: cellY + 0.14,
          w: 0.34,
          h: 0.24,
          rectRadius: 0.05,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(entry.step || String(index + 1), {
          x: cellX + 0.26,
          y: cellY + 0.19,
          w: 0.34,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.6,
          bold: true,
          color: TOKENS2.white,
          margin: 0,
          align: "center"
        });
        slide.addText(entry.title || "", {
          x: cellX + 0.68,
          y: cellY + 0.14,
          w: cellW - 0.82,
          h: 0.2,
          fontFace: TYPOGRAPHY2.display,
          fontSize: compact ? 13.6 : 14.2,
          bold: true,
          color: titleColor,
          margin: 0
        });
        slide.addText(entry.body || "", {
          x: cellX + 0.26,
          y: cellY + 0.52,
          w: cellW - 0.38,
          h: Math.max(0.38, cellH - 0.66),
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 10.1 : 10.4,
          color: bodyColor,
          margin: 0,
          valign: "mid"
        });
        if (!compact && index < steps.length - 1) {
          slide.addShape(SH.chevron, {
            x: cellX + cellW + 0.04,
            y: cellY + cellH / 2 - 0.12,
            w: 0.1,
            h: 0.24,
            fill: { color: opts.chevronColor || TOKENS2.gold },
            line: { color: opts.chevronColor || TOKENS2.gold }
          });
        }
      });
      if (opts.footer) {
        slide.addShape(SH.roundRect, {
          x: x + 0.22,
          y: y + h - 0.44,
          w: w - 0.44,
          h: 0.24,
          rectRadius: 0.03,
          fill: { color: TOKENS2.warm },
          line: { color: TOKENS2.warm }
        });
        slide.addText(opts.footer, {
          x: x + 0.34,
          y: y + h - 0.39,
          w: w - 0.68,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center"
        });
      }
    }
    function addSpecWorkflow2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const phases = opts.phases || [
        {
          step: "1",
          title: "Spec",
          question: "Que debe lograrse?",
          artifact: "Requisitos, historias y restricciones.",
          control: "Claridad funcional.",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed
        },
        {
          step: "2",
          title: "Plan",
          question: "Como se construira?",
          artifact: "Arquitectura, stack y limites.",
          control: "Consistencia tecnica.",
          accent: TOKENS2.titleFill,
          fill: TOKENS2.softBlue
        },
        {
          step: "3",
          title: "Tasks",
          question: "En que orden?",
          artifact: "Tareas pequenas y testeables.",
          control: "Aislamiento y trazabilidad.",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm
        },
        {
          step: "4",
          title: "Implement",
          question: "Que cambia en el sistema?",
          artifact: "Codigo, pruebas y evidencia.",
          control: "Resultado verificable.",
          accent: TOKENS2.red,
          fill: TOKENS2.white
        }
      ];
      const compact = Boolean(opts.compact || w < 8.8);
      const cols = compact ? 2 : Math.min(4, phases.length);
      const rows = compact ? Math.ceil(phases.length / 2) : 1;
      const gapX = 0.22;
      const gapY = 0.2;
      const footerH = opts.footer ? 0.28 : 0;
      const bodyY = y + 0.62;
      const bodyH = h - 0.84 - footerH;
      const cardW = (w - 0.32 - gapX * (cols - 1)) / cols;
      const cardH = (bodyH - gapY * (rows - 1)) / rows;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: opts.line || TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Spec-driven workflow", {
        fill: opts.headerFill || TOKENS2.softNeutral
      });
      phases.forEach((phase, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const cardX = x + 0.16 + col * (cardW + gapX);
        const cardY = bodyY + row * (cardH + gapY);
        const accent = phase.accent || TOKENS2.red;
        addSurface(slide, SH, cardX, cardY, cardW, cardH, {
          fill: phase.fill || TOKENS2.white,
          line: TOKENS2.border
        });
        addLabelPill(slide, SH, cardX + 0.12, cardY + 0.14, 0.42, phase.step || String(index + 1), {
          fill: accent,
          color: TOKENS2.white
        });
        slide.addText(phase.title || "", {
          x: cardX + 0.64,
          y: cardY + 0.14,
          w: cardW - 0.76,
          h: 0.18,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 13.6,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addShape(SH.rect, {
          x: cardX + 0.12,
          y: cardY + 0.48,
          w: 0.08,
          h: cardH - 0.62,
          fill: { color: accent },
          line: { color: accent }
        });
        const textX = cardX + 0.28;
        const textW = cardW - 0.4;
        slide.addText("Pregunta guia", {
          x: textX,
          y: cardY + 0.5,
          w: textW,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8,
          bold: true,
          color: TOKENS2.slate,
          margin: 0
        });
        slide.addText(phase.question || "", {
          x: textX,
          y: cardY + 0.66,
          w: textW,
          h: 0.28,
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 9.4 : 9.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
        slide.addText("Artefacto", {
          x: textX,
          y: cardY + 1.04,
          w: textW,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8,
          bold: true,
          color: TOKENS2.slate,
          margin: 0
        });
        slide.addText(phase.artifact || "", {
          x: textX,
          y: cardY + 1.2,
          w: textW,
          h: 0.34,
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 8.9 : 9.2,
          color: TOKENS2.ink,
          margin: 0
        });
        slide.addText("Control", {
          x: textX,
          y: cardY + cardH - 0.62,
          w: textW,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8,
          bold: true,
          color: TOKENS2.slate,
          margin: 0
        });
        slide.addText(phase.control || "", {
          x: textX,
          y: cardY + cardH - 0.46,
          w: textW,
          h: 0.22,
          fontFace: TYPOGRAPHY2.body,
          fontSize: compact ? 8.8 : 9,
          bold: true,
          color: TOKENS2.navy,
          margin: 0
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.22,
          y: y + h - 0.22,
          w: w - 0.44,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          color: TOKENS2.slate,
          margin: 0,
          align: "center"
        });
      }
    }
    function addDelegationSplit2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const left = opts.left || {};
      const right = opts.right || {};
      const footerH = opts.footer ? 0.28 : 0;
      const gap = opts.gap || 0.2;
      const bridgeW = opts.bridgeW || 1.48;
      const colW = (w - 0.32 - gap * 2 - bridgeW) / 2;
      const innerY = y + 0.62;
      const innerH = h - 0.84 - footerH;
      const leftX = x + 0.16;
      const bridgeX = leftX + colW + gap;
      const rightX = bridgeX + bridgeW + gap;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: opts.line || TOKENS2.border
      });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Ayuda posible vs validacion obligatoria", {
        fill: opts.headerFill || TOKENS2.softNeutral
      });
      function drawColumn(colX, entries, title, subtitle, accent, fill, dark) {
        addSurface(slide, SH, colX, innerY, colW, innerH, {
          fill,
          line: fill === TOKENS2.white ? TOKENS2.border : fill
        });
        slide.addShape(SH.rect, {
          x: colX + 0.12,
          y: innerY + 0.14,
          w: 0.12,
          h: innerH - 0.28,
          fill: { color: accent },
          line: { color: accent }
        });
        slide.addText(title, {
          x: colX + 0.34,
          y: innerY + 0.14,
          w: colW - 0.48,
          h: 0.22,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 15,
          bold: true,
          color: dark ? TOKENS2.white : TOKENS2.navy,
          margin: 0
        });
        if (subtitle) {
          slide.addText(subtitle, {
            x: colX + 0.34,
            y: innerY + 0.44,
            w: colW - 0.48,
            h: 0.24,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 9.4,
            color: dark ? "DCE6F2" : TOKENS2.slate,
            margin: 0
          });
        }
        const rows = entries || [];
        const listY = innerY + 0.82;
        const rowGap = rows.length >= 4 ? 0.1 : 0.14;
        const availableListH = innerH - (listY - innerY) - 0.12;
        const rowH = Math.max(
          0.22,
          Math.min(0.34, (availableListH - rowGap * Math.max(0, rows.length - 1)) / Math.max(rows.length, 1))
        );
        rows.forEach((item, idx) => {
          const itemY = listY + idx * (rowH + rowGap);
          slide.addShape(SH.roundRect, {
            x: colX + 0.34,
            y: itemY,
            w: colW - 0.5,
            h: rowH,
            rectRadius: 0.04,
            fill: { color: dark ? "173A5A" : TOKENS2.white },
            line: { color: dark ? "173A5A" : TOKENS2.border, pt: 0.8 }
          });
          slide.addShape(SH.ellipse, {
            x: colX + 0.44,
            y: itemY + rowH / 2 - 0.045,
            w: 0.09,
            h: 0.09,
            fill: { color: accent },
            line: { color: accent }
          });
          slide.addText(item, {
            x: colX + 0.6,
            y: itemY + 0.05,
            w: colW - 0.82,
            h: rowH - 0.08,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 8.5,
            color: dark ? TOKENS2.white : TOKENS2.ink,
            margin: 0,
            valign: "mid"
          });
        });
      }
      drawColumn(
        leftX,
        left.items || ["Explorar opciones", "Pedir una primera version", "Detectar repeticion"],
        left.title || "El agente puede ayudar con",
        left.subtitle || "apoyo rapido y trabajo repetitivo",
        left.accent || TOKENS2.titleFill,
        left.fill || TOKENS2.softBlue,
        Boolean(left.dark)
      );
      drawColumn(
        rightX,
        right.items || ["Leer el resultado real", "Validar en herramientas", "Decidir que se integra"],
        right.title || "No conviene delegar",
        right.subtitle || "criterio, lectura y validacion final",
        right.accent || TOKENS2.red,
        right.fill || TOKENS2.white,
        Boolean(right.dark)
      );
      const bridgeOuterX = bridgeX + 0.08;
      const bridgeOuterW = bridgeW - 0.16;
      const bridgeOuterH = opts.bridgeOuterH || 1.78;
      const bridgeOuterY = innerY + innerH / 2 - bridgeOuterH / 2;
      const bridgeLabelH = 0.3;
      const bridgeBodyH = 0.4;
      slide.addShape(SH.roundRect, {
        x: bridgeOuterX,
        y: bridgeOuterY,
        w: bridgeOuterW,
        h: bridgeOuterH,
        rectRadius: 0.06,
        fill: { color: opts.bridgeFill || TOKENS2.warm },
        line: { color: opts.bridgeFill || TOKENS2.warm }
      });
      slide.addShape(SH.roundRect, {
        x: bridgeOuterX + 0.12,
        y: bridgeOuterY + 0.16,
        w: bridgeOuterW - 0.24,
        h: bridgeLabelH,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.white }
      });
      slide.addShape(SH.chevron, {
        x: bridgeOuterX + 0.2,
        y: bridgeOuterY + 0.62,
        w: bridgeOuterW - 0.4,
        h: 0.18,
        fill: { color: opts.bridgeAccent || TOKENS2.gold },
        line: { color: opts.bridgeAccent || TOKENS2.gold }
      });
      slide.addText(opts.bridgeLabel || "Flujo sano", {
        x: bridgeOuterX + 0.18,
        y: bridgeOuterY + 0.21,
        w: bridgeOuterW - 0.36,
        h: bridgeLabelH - 0.08,
        fontFace: TYPOGRAPHY2.display,
        fontSize: opts.bridgeLabelFontSize || 10.6,
        bold: true,
        color: TOKENS2.navy,
        margin: 0,
        align: "center",
        fit: "shrink"
      });
      slide.addText(opts.bridgeBody || "Intentar, leer y decidir con evidencia.", {
        x: bridgeOuterX + 0.14,
        y: bridgeOuterY + 1.07,
        w: bridgeOuterW - 0.28,
        h: bridgeBodyH,
        fontFace: TYPOGRAPHY2.body,
        fontSize: opts.bridgeBodyFontSize || 7.2,
        color: TOKENS2.slate,
        margin: 0,
        align: "center",
        valign: "mid",
        fit: "shrink"
      });
      if (opts.footer) {
        slide.addShape(SH.roundRect, {
          x: x + 0.22,
          y: y + h - 0.44,
          w: w - 0.44,
          h: 0.24,
          rectRadius: 0.03,
          fill: { color: TOKENS2.warm },
          line: { color: TOKENS2.warm }
        });
        slide.addText(opts.footer, {
          x: x + 0.34,
          y: y + h - 0.39,
          w: w - 0.68,
          h: 0.1,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          align: "center"
        });
      }
    }
    function addAgentOrchestrationDiagram2(slide, SH, opts = {}) {
      const x = opts.x || 0.88;
      const y = opts.y || 2.22;
      const w = opts.w || 10.26;
      const h = opts.h || 4.54;
      addSurface(slide, SH, x, y, w, h, { fill: TOKENS2.navy, line: TOKENS2.navy });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Orquestacion del Ecosistema Agentico", {
        fill: "173A5A",
        color: TOKENS2.white
      });
      const centerX = x + w / 2;
      const centerY = y + h / 2 + 0.45;
      slide.addShape(SH.ellipse, {
        x: centerX - 0.6,
        y: centerY - 0.6,
        w: 1.2,
        h: 1.2,
        fill: { color: TOKENS2.red },
        line: { color: TOKENS2.white, pt: 2 }
      });
      slide.addText("AGENTE", {
        x: centerX - 0.6,
        y: centerY - 0.2,
        w: 1.2,
        h: 0.4,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 11,
        bold: true,
        color: TOKENS2.white,
        align: "center"
      });
      const nodes = [
        { t: "MEMORIA", b: ".md / Contexto", icon: "\u{1F9E0}", ang: 210, color: TOKENS2.gold },
        { t: "MCPs", b: "Filesystem / DB", icon: "\u{1F6E0}\uFE0F", ang: 330, color: TOKENS2.softBlue },
        { t: "SUB-AGENTES", b: "Especialistas", icon: "\u{1F916}", ang: 90, color: TOKENS2.red }
      ];
      const dist = 1.7;
      nodes.forEach((n) => {
        const rad = n.ang * Math.PI / 180;
        const nx = centerX + dist * Math.cos(rad) - 0.8;
        const ny = centerY - dist * Math.sin(rad) - 0.45;
        const lineW = dist * Math.cos(rad);
        const lineH = -dist * Math.sin(rad);
        slide.addShape(SH.line, {
          x: lineW < 0 ? centerX + lineW : centerX,
          y: lineH < 0 ? centerY + lineH : centerY,
          w: Math.abs(lineW),
          h: Math.abs(lineH),
          flipH: lineW * lineH < 0,
          // Voltear horizontalmente si los signos son opuestos
          line: { color: TOKENS2.white, pt: 1, dashType: "dash" }
        });
        addSurface(slide, SH, nx, ny, 1.6, 0.9, { fill: "173A5A", line: n.color });
        slide.addText(n.icon, { x: nx, y: ny + 0.05, w: 1.6, h: 0.3, fontSize: 16, align: "center" });
        slide.addText(n.t, {
          x: nx,
          y: ny + 0.35,
          w: 1.6,
          h: 0.2,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 9,
          bold: true,
          color: TOKENS2.white,
          align: "center"
        });
        slide.addText(n.b, {
          x: nx,
          y: ny + 0.55,
          w: 1.6,
          h: 0.2,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 7.5,
          color: "A8C4E0",
          align: "center"
        });
      });
    }
    function addMcpBridgePanel2(slide, SH, opts = {}) {
      const x = opts.x || 0.88;
      const y = opts.y || 2.22;
      const w = opts.w || 10.26;
      const h = opts.h || 4.54;
      addSurface(slide, SH, x, y, w, h, { fill: TOKENS2.white, line: TOKENS2.border });
      const midX = x + w / 2;
      const panelY = y + 1;
      const panelH = h - 1.6;
      const panelW = w / 2 - 1.4;
      slide.addText("Mundo del Lenguaje", {
        x: x + 0.2,
        y: y + 0.3,
        w: w / 2 - 0.4,
        h: 0.4,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 14,
        bold: true,
        color: TOKENS2.navy,
        align: "center"
      });
      slide.addShape(SH.rect, {
        x: x + 0.4,
        y: panelY,
        w: panelW,
        h: panelH,
        fill: { color: TOKENS2.softBlue },
        line: { color: TOKENS2.navy, pt: 1 }
      });
      slide.addText("RAZONAMIENTO\nTokens, Patrones", {
        x: x + 0.4,
        y: panelY + 0.2,
        w: panelW,
        h: panelH - 0.4,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 11,
        color: TOKENS2.navy,
        align: "center",
        valign: "mid"
      });
      slide.addText("Mundo Fisico", {
        x: midX + 0.2,
        y: y + 0.3,
        w: w / 2 - 0.4,
        h: 0.4,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 14,
        bold: true,
        color: TOKENS2.red,
        align: "center"
      });
      slide.addShape(SH.rect, {
        x: midX + 1,
        y: panelY,
        w: panelW,
        h: panelH,
        fill: { color: TOKENS2.paleRed },
        line: { color: TOKENS2.red, pt: 1 }
      });
      slide.addText("ACCION REAL\nTerminal, SQL", {
        x: midX + 1,
        y: panelY + 0.2,
        w: panelW,
        h: panelH - 0.4,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 11,
        color: TOKENS2.red,
        align: "center",
        valign: "mid"
      });
      slide.addShape(SH.roundRect, {
        x: midX - 0.7,
        y: y + h / 2 - 0.2,
        w: 1.4,
        h: 0.6,
        rectRadius: 0.2,
        fill: { color: TOKENS2.gold },
        line: { color: TOKENS2.navy, pt: 1.5 }
      });
      slide.addText("MCP", {
        x: midX - 0.7,
        y: y + h / 2 - 0.1,
        w: 1.4,
        h: 0.4,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 12,
        bold: true,
        color: TOKENS2.navy,
        align: "center"
      });
    }
    function addToolExecutionConsole2(slide, SH, opts = {}) {
      const x = opts.x || 0.88;
      const y = opts.y || 2.22;
      const w = opts.w || 10.26;
      const h = opts.h || 4.54;
      addSurface(slide, SH, x, y, w, h, { fill: "1E1E1E", line: "333333" });
      const btnColors = ["FF5F56", "FFBD2E", "27C93F"];
      btnColors.forEach((color, i) => {
        slide.addShape(SH.ellipse, {
          x: x + 0.2 + i * 0.25,
          y: y + 0.15,
          w: 0.15,
          h: 0.15,
          fill: { color },
          line: { color }
        });
      });
      slide.addText(opts.command || "> /execute_tool", {
        x: x + 0.2,
        y: y + 0.5,
        w: w - 0.4,
        h: 0.4,
        fontFace: "Consolas",
        fontSize: 14,
        color: "27C93F",
        bold: true
      });
      const params = opts.params || { target: "src/api.py", action: "refactor" };
      let paramStr = JSON.stringify(params, null, 2);
      slide.addText("Arguments:", {
        x: x + 0.4,
        y: y + 1,
        w: w - 0.8,
        h: 0.3,
        fontFace: "Consolas",
        fontSize: 11,
        color: "A8C4E0"
      });
      slide.addText(paramStr, {
        x: x + 0.4,
        y: y + 1.3,
        w: w - 0.8,
        h: 1.2,
        fontFace: "Consolas",
        fontSize: 10,
        color: TOKENS2.white
      });
      slide.addShape(SH.line, {
        x: x + 0.4,
        y: y + 2.6,
        w: w - 0.8,
        h: 0,
        line: { color: "333333", pt: 1 }
      });
      slide.addText("Result:", {
        x: x + 0.4,
        y: y + 2.8,
        w: w - 0.8,
        h: 0.3,
        fontFace: "Consolas",
        fontSize: 11,
        color: "27C93F"
      });
      slide.addText(opts.result || "Success: File modified surgically.", {
        x: x + 0.4,
        y: y + 3.1,
        w: w - 0.8,
        h: 1,
        fontFace: "Consolas",
        fontSize: 10,
        color: "DCE6F2"
      });
    }
    function addValidationLayerRadar2(slide, SH, opts = {}) {
      const x = opts.x || 0.88;
      const y = opts.y || 2.22;
      const w = opts.w || 10.26;
      const h = opts.h || 4.54;
      addSurface(slide, SH, x, y, w, h, { fill: TOKENS2.softNeutral, line: TOKENS2.border });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Monitor de Validacion de 4 Capas");
      const layers = opts.layers || [
        { name: "TIPOS", status: "OK", desc: "Pydantic & Python 3.12", color: "27C93F" },
        { name: "LOGICA", status: "OK", desc: "Reglas de Negocio", color: "27C93F" },
        { name: "SEGURIDAD", status: "WARN", desc: "Secret Detectado", color: "FFBD2E" },
        { name: "ESTANDAR", status: "FAIL", desc: "Snake Case Violado", color: "FF5F56" }
      ];
      layers.forEach((l, i) => {
        const lx = x + 0.2;
        const ly = y + 0.8 + i * 0.9;
        const lw = w - 0.4;
        const lh = 0.7;
        addSurface(slide, SH, lx, ly, lw, lh, { fill: TOKENS2.white, line: TOKENS2.border });
        slide.addShape(SH.ellipse, {
          x: lx + 0.2,
          y: ly + 0.2,
          w: 0.3,
          h: 0.3,
          fill: { color: l.color },
          line: { color: l.color }
        });
        slide.addText(l.name, {
          x: lx + 0.7,
          y: ly + 0.15,
          w: 2,
          h: 0.4,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 14,
          bold: true,
          color: TOKENS2.navy
        });
        slide.addText(l.status, {
          x: lx + lw - 1.2,
          y: ly + 0.15,
          w: 1,
          h: 0.4,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 14,
          bold: true,
          color: l.color,
          align: "right"
        });
        slide.addText(l.desc, {
          x: lx + 0.7,
          y: ly + 0.45,
          w: lw - 1,
          h: 0.2,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9,
          color: TOKENS2.slate
        });
      });
    }
    function addAgentReasoningLoop2(slide, SH, opts = {}) {
      const x = opts.x || 0.88;
      const y = opts.y || 2.22;
      const w = opts.w || 10.26;
      const h = opts.h || 4.54;
      addSurface(slide, SH, x, y, w, h, { fill: TOKENS2.white, line: TOKENS2.border });
      addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Ciclo de Razonamiento Autonomo (ReAct)");
      const centerX = x + w / 2;
      const centerY = y + h / 2 + 0.2;
      const radius = 1.4;
      const steps = [
        { t: "PENSAR", b: "Analiza el objetivo y el contexto.", ang: 90, color: TOKENS2.navy, icon: "\u{1F4AD}" },
        { t: "ACTUAR", b: "Ejecuta una Tool (Read, Write, Terminal).", ang: 330, color: TOKENS2.red, icon: "\u{1F6E0}\uFE0F" },
        { t: "OBSERVAR", b: "Lee el resultado del sistema.", ang: 210, color: TOKENS2.gold, icon: "\u{1F441}\uFE0F" }
      ];
      steps.forEach((s, i) => {
        const rad = s.ang * Math.PI / 180;
        const sx = centerX + radius * Math.cos(rad) - 1;
        const sy = centerY - radius * Math.sin(rad) - 0.6;
        addSurface(slide, SH, sx, sy, 2, 1.2, { fill: TOKENS2.white, line: s.color });
        slide.addText(s.icon, { x: sx, y: sy + 0.1, w: 2, h: 0.4, fontSize: 20, align: "center" });
        slide.addText(s.t, {
          x: sx,
          y: sy + 0.5,
          w: 2,
          h: 0.3,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 12,
          bold: true,
          color: s.color,
          align: "center"
        });
        slide.addText(s.b, {
          x: sx,
          y: sy + 0.8,
          w: 2,
          h: 0.25,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.5,
          color: TOKENS2.slate,
          align: "center"
        });
        const nextStep = steps[(i + 1) % steps.length];
        const midAngle = (s.ang + (s.ang > nextStep.ang ? nextStep.ang : nextStep.ang - 360)) / 2;
        const radArrow = midAngle * Math.PI / 180;
        const fx = centerX + radius * 1.1 * Math.cos(radArrow);
        const fy = centerY - radius * 1.1 * Math.sin(radArrow);
        slide.addShape(SH.rightArrow, {
          x: fx - 0.15,
          y: fy - 0.15,
          w: 0.3,
          h: 0.3,
          rotate: 360 - midAngle + 90,
          fill: { color: TOKENS2.softNeutral },
          line: { color: TOKENS2.border, pt: 1 }
        });
      });
      slide.addText("REPETIR HASTA CUMPLIR EL OBJETIVO", {
        x: centerX - 1.5,
        y: centerY - 0.35,
        w: 3,
        h: 0.3,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 9,
        bold: true,
        color: TOKENS2.red,
        align: "center"
      });
    }
    module.exports = {
      addAgenticFlow: addAgenticFlow2,
      addSpecWorkflow: addSpecWorkflow2,
      addDelegationSplit: addDelegationSplit2,
      addAgentOrchestrationDiagram: addAgentOrchestrationDiagram2,
      addMcpBridgePanel: addMcpBridgePanel2,
      addToolExecutionConsole: addToolExecutionConsole2,
      addValidationLayerRadar: addValidationLayerRadar2,
      addAgentReasoningLoop: addAgentReasoningLoop2
    };
  }
});

// components/async-panels.js
var require_async_panels = __commonJS({
  "components/async-panels.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    var { makeCodeSvgData: makeCodeSvgData2 } = require_code();
    function addSurface(slide, SH, x, y, w, h, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: opts.rectRadius || 0.04,
        fill: { color: opts.fill || TOKENS2.white },
        line: { color: opts.line || TOKENS2.border, pt: opts.linePt || 1 }
      });
    }
    function addZoneHeader(slide, SH, x, y, w, text, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h: opts.h || 0.28,
        rectRadius: 0.03,
        fill: { color: opts.fill || TOKENS2.titleFill },
        line: { color: opts.fill || TOKENS2.titleFill }
      });
      slide.addText(text, {
        x: x + 0.1,
        y: y + 0.06,
        w: w - 0.2,
        h: (opts.h || 0.28) - 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: opts.fontSize || 9.2,
        bold: true,
        color: opts.color || TOKENS2.white,
        margin: 0,
        align: "center"
      });
    }
    function addEventLoopDiagram2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const stackFrames = opts.stackFrames || ["(empty)"];
      const apiItems = opts.apiItems || [];
      const queueItems = opts.queueItems || [];
      const highlight = opts.highlightPhase || null;
      const captionH = opts.caption ? 0.24 : 0;
      addSurface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.white,
        line: TOKENS2.border
      });
      const innerX = x + 0.18;
      const innerW = w - 0.36;
      const zonesY = y + 0.18;
      const arrowBeltH = 0.34;
      const zonesH = h - 0.36 - arrowBeltH - captionH;
      const zoneGap = 0.16;
      const stackW = Math.round(innerW * 0.3 * 100) / 100;
      const apiW = Math.round((innerW - 2 * zoneGap) * 0.38 * 100) / 100;
      const queueW = innerW - stackW - apiW - 2 * zoneGap;
      const stackX = innerX;
      const apiX = innerX + stackW + zoneGap;
      const queueX = apiX + apiW + zoneGap;
      const arrowY = zonesY + zonesH + 0.1;
      function zoneFill(zone) {
        if (highlight === zone) return "103560";
        return TOKENS2.editorBg;
      }
      function zoneLine(zone) {
        if (highlight === zone) return TOKENS2.red;
        return "1E3A5C";
      }
      slide.addShape(SH.roundRect, {
        x: stackX,
        y: zonesY,
        w: stackW,
        h: zonesH,
        rectRadius: 0.04,
        fill: { color: zoneFill("stack") },
        line: { color: zoneLine("stack"), pt: highlight === "stack" ? 1.8 : 1 }
      });
      addZoneHeader(slide, SH, stackX + 0.08, zonesY + 0.08, stackW - 0.16, "Call Stack", {
        fill: highlight === "stack" ? TOKENS2.red : TOKENS2.titleFill,
        h: 0.26,
        fontSize: 8.8
      });
      const frameH = 0.28;
      const frameGap = 0.06;
      const framesAreaY = zonesY + 0.44;
      const visibleFrames = Math.min(
        stackFrames.length,
        Math.max(1, Math.floor((zonesH - 0.54) / (frameH + frameGap)))
      );
      for (let i = 0; i < visibleFrames; i++) {
        const frameIndex = stackFrames.length - 1 - i;
        const frameY = framesAreaY + i * (frameH + frameGap);
        const frameFill = frameIndex === stackFrames.length - 1 && highlight === "stack" ? TOKENS2.red : "1E3A5C";
        slide.addShape(SH.roundRect, {
          x: stackX + 0.1,
          y: frameY,
          w: stackW - 0.2,
          h: frameH,
          rectRadius: 0.03,
          fill: { color: frameFill },
          line: { color: frameFill }
        });
        slide.addText(stackFrames[frameIndex] || "", {
          x: stackX + 0.14,
          y: frameY + 0.06,
          w: stackW - 0.28,
          h: frameH - 0.1,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 8.4,
          color: TOKENS2.white,
          margin: 0,
          align: "center",
          fit: "shrink"
        });
      }
      slide.addShape(SH.roundRect, {
        x: apiX,
        y: zonesY,
        w: apiW,
        h: zonesH,
        rectRadius: 0.04,
        fill: { color: zoneFill("apis") },
        line: { color: zoneLine("apis"), pt: highlight === "apis" ? 1.8 : 1 }
      });
      addZoneHeader(slide, SH, apiX + 0.08, zonesY + 0.08, apiW - 0.16, "Web APIs", {
        fill: highlight === "apis" ? TOKENS2.red : TOKENS2.titleFill,
        h: 0.26,
        fontSize: 8.8
      });
      const apiItemH = 0.28;
      const apiItemGap = 0.08;
      const apiAreaY = zonesY + 0.44;
      const visibleApis = Math.min(
        apiItems.length,
        Math.max(0, Math.floor((zonesH - 0.54) / (apiItemH + apiItemGap)))
      );
      for (let i = 0; i < visibleApis; i++) {
        const itemY = apiAreaY + i * (apiItemH + apiItemGap);
        const itemFill = highlight === "apis" ? "1E4A70" : "1E3A5C";
        slide.addShape(SH.roundRect, {
          x: apiX + 0.12,
          y: itemY,
          w: apiW - 0.24,
          h: apiItemH,
          rectRadius: 0.03,
          fill: { color: itemFill },
          line: { color: itemFill }
        });
        slide.addShape(SH.ellipse, {
          x: apiX + 0.16,
          y: itemY + apiItemH / 2 - 0.06,
          w: 0.12,
          h: 0.12,
          fill: { color: TOKENS2.gold },
          line: { color: TOKENS2.gold }
        });
        slide.addText(apiItems[i] || "", {
          x: apiX + 0.34,
          y: itemY + 0.06,
          w: apiW - 0.5,
          h: apiItemH - 0.1,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 8.2,
          color: TOKENS2.white,
          margin: 0,
          fit: "shrink"
        });
      }
      if (apiItems.length === 0) {
        slide.addText("(sin tareas activas)", {
          x: apiX + 0.12,
          y: zonesY + 0.46,
          w: apiW - 0.24,
          h: 0.18,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.2,
          color: TOKENS2.guide,
          margin: 0,
          align: "center"
        });
      }
      slide.addShape(SH.roundRect, {
        x: queueX,
        y: zonesY,
        w: queueW,
        h: zonesH,
        rectRadius: 0.04,
        fill: { color: zoneFill("queue") },
        line: { color: zoneLine("queue"), pt: highlight === "queue" ? 1.8 : 1 }
      });
      addZoneHeader(slide, SH, queueX + 0.08, zonesY + 0.08, queueW - 0.16, "Task Queue", {
        fill: highlight === "queue" ? TOKENS2.red : TOKENS2.titleFill,
        h: 0.26,
        fontSize: 8.8
      });
      const qItemH = 0.28;
      const qItemGap = 0.06;
      const qAreaY = zonesY + 0.44;
      const visibleQueue = Math.min(
        queueItems.length,
        Math.max(0, Math.floor((zonesH - 0.54) / (qItemH + qItemGap)))
      );
      for (let i = 0; i < visibleQueue; i++) {
        const itemY = qAreaY + i * (qItemH + qItemGap);
        const itemFill = i === 0 && highlight === "queue" ? TOKENS2.red : "1E3A5C";
        slide.addShape(SH.roundRect, {
          x: queueX + 0.1,
          y: itemY,
          w: queueW - 0.2,
          h: qItemH,
          rectRadius: 0.03,
          fill: { color: itemFill },
          line: { color: itemFill }
        });
        slide.addText(queueItems[i] || "", {
          x: queueX + 0.14,
          y: itemY + 0.06,
          w: queueW - 0.28,
          h: qItemH - 0.1,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 8.2,
          color: TOKENS2.white,
          margin: 0,
          align: "center",
          fit: "shrink"
        });
      }
      if (queueItems.length === 0) {
        slide.addText("(cola vacia)", {
          x: queueX + 0.1,
          y: zonesY + 0.46,
          w: queueW - 0.2,
          h: 0.18,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.2,
          color: TOKENS2.guide,
          margin: 0,
          align: "center"
        });
      }
      const arrowMidY = zonesY + zonesH * 0.5;
      slide.addShape(SH.line, {
        x: apiX + apiW,
        y: arrowMidY,
        w: zoneGap,
        h: 0,
        line: { color: TOKENS2.gold, pt: 1.4 }
      });
      slide.addShape(SH.chevron, {
        x: apiX + apiW + zoneGap * 0.55,
        y: arrowMidY - 0.1,
        w: 0.16,
        h: 0.2,
        fill: { color: TOKENS2.gold },
        line: { color: TOKENS2.gold }
      });
      const loopColor = highlight === "loop" ? TOKENS2.red : TOKENS2.guide;
      const loopPt = highlight === "loop" ? 2 : 1.4;
      slide.addShape(SH.line, {
        x: queueX + queueW * 0.5,
        y: zonesY + zonesH,
        w: 0,
        h: arrowBeltH * 0.5,
        line: { color: loopColor, pt: loopPt }
      });
      slide.addShape(SH.line, {
        x: stackX + stackW * 0.5,
        y: arrowY + arrowBeltH * 0.5,
        w: queueX + queueW * 0.5 - (stackX + stackW * 0.5),
        h: 0,
        line: { color: loopColor, pt: loopPt }
      });
      slide.addShape(SH.line, {
        x: stackX + stackW * 0.5,
        y: zonesY + zonesH,
        w: 0,
        h: arrowBeltH * 0.5,
        line: { color: loopColor, pt: loopPt }
      });
      slide.addShape(SH.chevron, {
        x: stackX + stackW * 0.5 - 0.1,
        y: zonesY + zonesH - 0.22,
        w: 0.2,
        h: 0.24,
        rotate: 270,
        fill: { color: loopColor },
        line: { color: loopColor }
      });
      slide.addText("Event Loop", {
        x: innerX + innerW * 0.3,
        y: arrowY + 0.04,
        w: innerW * 0.4,
        h: 0.18,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8.2,
        bold: true,
        color: loopColor,
        margin: 0,
        align: "center"
      });
      if (opts.caption) {
        slide.addText(opts.caption, {
          x: x + 0.2,
          y: y + h - captionH + 0.04,
          w: w - 0.4,
          h: captionH - 0.06,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          color: TOKENS2.slate,
          margin: 0,
          align: "center"
        });
      }
    }
    function addSyntaxCompare2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const beforeLabel = opts.beforeLabel || "Antes";
      const afterLabel = opts.afterLabel || "ES6+";
      const beforeCode = opts.beforeCode || "";
      const afterCode = opts.afterCode || "";
      const lang = opts.language || "js";
      const captionH = opts.caption ? 0.24 : 0;
      const dividerW = 0.06;
      const panelGap = dividerW + 0.1;
      const panelW = (w - 0.36 - panelGap) / 2;
      const leftX = x + 0.18;
      const rightX = leftX + panelW + panelGap;
      const headerH = 0.32;
      const panelH = h - 0.18 - captionH;
      slide.addShape(SH.roundRect, {
        x: leftX,
        y,
        w: panelW,
        h: panelH,
        rectRadius: 0.04,
        fill: { color: TOKENS2.editorBg },
        line: { color: "2A3A4E", pt: 1 }
      });
      slide.addShape(SH.roundRect, {
        x: leftX + 0.1,
        y: y + 0.1,
        w: panelW - 0.2,
        h: headerH,
        rectRadius: 0.03,
        fill: { color: "3A4A5E" },
        line: { color: "3A4A5E" }
      });
      slide.addText(beforeLabel, {
        x: leftX + 0.12,
        y: y + 0.16,
        w: panelW - 0.24,
        h: 0.18,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 9.8,
        bold: true,
        color: TOKENS2.guide,
        margin: 0,
        align: "center"
      });
      const codeAreaH = Math.max(0.3, panelH - headerH - 0.28);
      const codeY = y + headerH + 0.2;
      slide.addImage({
        data: makeCodeSvgData2(beforeCode, lang, {
          width: panelW - 0.2,
          height: codeAreaH,
          fontSize: opts.fontSize || 10.2
        }),
        x: leftX + 0.1,
        y: codeY,
        w: panelW - 0.2,
        h: codeAreaH
      });
      const dividerX = leftX + panelW + (panelGap - dividerW) / 2;
      slide.addShape(SH.rect, {
        x: dividerX,
        y: y + 0.14,
        w: dividerW,
        h: panelH - 0.28,
        fill: { color: TOKENS2.border },
        line: { color: TOKENS2.border }
      });
      slide.addShape(SH.roundRect, {
        x: rightX,
        y,
        w: panelW,
        h: panelH,
        rectRadius: 0.04,
        fill: { color: TOKENS2.editorBg },
        line: { color: "1C3A2E", pt: 1 }
      });
      slide.addShape(SH.roundRect, {
        x: rightX + 0.1,
        y: y + 0.1,
        w: panelW - 0.2,
        h: headerH,
        rectRadius: 0.03,
        fill: { color: "1A4230" },
        line: { color: "1A4230" }
      });
      slide.addText(afterLabel, {
        x: rightX + 0.12,
        y: y + 0.16,
        w: panelW - 0.24,
        h: 0.18,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 9.8,
        bold: true,
        color: TOKENS2.success,
        margin: 0,
        align: "center"
      });
      slide.addImage({
        data: makeCodeSvgData2(afterCode, lang, {
          width: panelW - 0.2,
          height: codeAreaH,
          fontSize: opts.fontSize || 10.2
        }),
        x: rightX + 0.1,
        y: codeY,
        w: panelW - 0.2,
        h: codeAreaH
      });
      if (opts.caption) {
        slide.addText(opts.caption, {
          x: x + 0.2,
          y: y + h - captionH + 0.04,
          w: w - 0.4,
          h: captionH - 0.06,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          color: TOKENS2.slate,
          margin: 0,
          align: "center"
        });
      }
    }
    module.exports = {
      addEventLoopDiagram: addEventLoopDiagram2,
      addSyntaxCompare: addSyntaxCompare2
    };
  }
});

// components/backend-panels.js
var require_backend_panels = __commonJS({
  "components/backend-panels.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    var { svgToDataUri } = require_svg();
    function escapeXml(text = "") {
      return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    }
    function asSvgColor(color) {
      const value = String(color || TOKENS2.navy).trim();
      return value.startsWith("#") ? value : `#${value}`;
    }
    function joinTypeCopy(type, leftLabel, rightLabel) {
      const copy = {
        inner: {
          badge: "INNER JOIN",
          result: "Solo filas con coincidencia en ambas tablas.",
          formula: `${leftLabel} \u2229 ${rightLabel}`
        },
        left: {
          badge: "LEFT JOIN",
          result: `Todo ${leftLabel} y las coincidencias de ${rightLabel}.`,
          formula: `${leftLabel} completo`
        },
        right: {
          badge: "RIGHT JOIN",
          result: `Todo ${rightLabel} y las coincidencias de ${leftLabel}.`,
          formula: `${rightLabel} completo`
        },
        full: {
          badge: "FULL JOIN",
          result: "Todas las filas de ambos lados, coincidan o no.",
          formula: `${leftLabel} \u222A ${rightLabel}`
        },
        leftOnly: {
          badge: "LEFT ANTI",
          result: `${leftLabel} sin coincidencia en ${rightLabel}.`,
          formula: `${leftLabel} - ${rightLabel}`
        },
        rightOnly: {
          badge: "RIGHT ANTI",
          result: `${rightLabel} sin coincidencia en ${leftLabel}.`,
          formula: `${rightLabel} - ${leftLabel}`
        }
      };
      return copy[type] || copy.inner;
    }
    function joinDiagramSvg(opts = {}) {
      const type = opts.type || "inner";
      const leftColor = asSvgColor(opts.leftColor || TOKENS2.navy);
      const rightColor = asSvgColor(opts.rightColor || TOKENS2.red);
      const highlightColor = asSvgColor(opts.highlightColor || TOKENS2.red);
      const mutedFill = asSvgColor(opts.mutedFill || "FFFFFF");
      const inkColor = asSvgColor(TOKENS2.ink);
      const leftLabel = escapeXml(opts.leftLabel || "Tabla A");
      const rightLabel = escapeXml(opts.rightLabel || "Tabla B");
      const copy = joinTypeCopy(type, opts.leftLabel || "Tabla A", opts.rightLabel || "Tabla B");
      const result = escapeXml(opts.result || copy.formula);
      const highlight = {
        inner: `
      <g clip-path="url(#clip-left)">
        <circle cx="290" cy="160" r="102" fill="${highlightColor}" opacity="0.82"/>
      </g>
    `,
        left: `<circle cx="190" cy="160" r="102" fill="${highlightColor}" opacity="0.76"/>`,
        right: `<circle cx="290" cy="160" r="102" fill="${highlightColor}" opacity="0.76"/>`,
        full: `
      <circle cx="190" cy="160" r="102" fill="${highlightColor}" opacity="0.64"/>
      <circle cx="290" cy="160" r="102" fill="${highlightColor}" opacity="0.64"/>
    `,
        leftOnly: `
      <circle cx="190" cy="160" r="102" fill="${highlightColor}" opacity="0.78"/>
      <circle cx="290" cy="160" r="102" fill="${mutedFill}" opacity="0.96"/>
    `,
        rightOnly: `
      <circle cx="290" cy="160" r="102" fill="${highlightColor}" opacity="0.78"/>
      <circle cx="190" cy="160" r="102" fill="${mutedFill}" opacity="0.96"/>
    `
      }[type] || "";
      return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 340">
      <defs>
        <clipPath id="clip-left">
          <circle cx="190" cy="160" r="102"/>
        </clipPath>
      </defs>
      <rect x="0" y="0" width="480" height="340" fill="none"/>
      <g>
        <circle cx="190" cy="160" r="102" fill="${mutedFill}" opacity="0.55"/>
        <circle cx="290" cy="160" r="102" fill="${mutedFill}" opacity="0.55"/>
        ${highlight}
        <circle cx="190" cy="160" r="102" fill="none" stroke="${leftColor}" stroke-width="7"/>
        <circle cx="290" cy="160" r="102" fill="none" stroke="${rightColor}" stroke-width="7"/>
      </g>
      <text x="144" y="36" font-family="Aptos, Arial, sans-serif" font-size="20" font-weight="700" text-anchor="middle" fill="${leftColor}">${leftLabel}</text>
      <text x="336" y="36" font-family="Aptos, Arial, sans-serif" font-size="20" font-weight="700" text-anchor="middle" fill="${rightColor}">${rightLabel}</text>
      <text x="240" y="292" font-family="Aptos, Arial, sans-serif" font-size="22" font-weight="800" text-anchor="middle" fill="${inkColor}">${result}</text>
    </svg>
  `);
    }
    function addServerCycle2(slide, SH, opts = {}) {
      const x = opts.x || 0.88;
      const y = opts.y || 2.22;
      const w = opts.w || 10.26;
      const h = opts.h || 3.12;
      const defaultSteps = [
        { title: "Escuchar", body: "Puerto abierto, esperando HTTP", icon: "\u{1F442}", accent: TOKENS2.navy },
        { title: "Validar", body: "\xBFDatos completos y correctos?", icon: "\u{1F6E1}\uFE0F", accent: TOKENS2.red },
        { title: "Procesar", body: "C\xE1lculos y coordinaci\xF3n", icon: "\u2699\uFE0F", accent: TOKENS2.gold },
        { title: "Responder", body: "Enviar JSON + Status Code", icon: "\u{1F680}", accent: "28A745" }
      ];
      const steps = opts.steps || defaultSteps;
      const stepW = (w - (steps.length - 1) * 0.4) / steps.length;
      steps.forEach((step, i) => {
        const stepX = x + i * (stepW + 0.4);
        if (i < steps.length - 1) {
          slide.addShape(SH.chevron, {
            x: stepX + stepW + 0.05,
            y: y + h / 2 - 0.15,
            w: 0.3,
            h: 0.3,
            fill: { color: TOKENS2.border },
            line: { color: TOKENS2.border }
          });
        }
        slide.addShape(SH.roundRect, {
          x: stepX,
          y,
          w: stepW,
          h,
          rectRadius: 0.05,
          fill: { color: TOKENS2.white },
          line: { color: step.accent, pt: 2 }
        });
        slide.addText(step.icon, {
          x: stepX,
          y: y + 0.3,
          w: stepW,
          h: 0.6,
          fontSize: 28,
          align: "center"
        });
        slide.addText(step.title, {
          x: stepX + 0.1,
          y: y + 1.1,
          w: stepW - 0.2,
          h: 0.4,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 14,
          bold: true,
          color: step.accent,
          align: "center"
        });
        slide.addText(step.body, {
          x: stepX + 0.1,
          y: y + 1.6,
          w: stepW - 0.2,
          h: 0.8,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 10,
          color: TOKENS2.slate,
          align: "center"
        });
      });
    }
    function addRestResource2(slide, SH, opts = {}) {
      const { x, y, w, h, verb, url, json } = opts;
      const verbColors = {
        GET: "28A745",
        POST: TOKENS2.gold,
        PUT: TOKENS2.navy,
        DELETE: TOKENS2.red
      };
      const accent = verbColors[verb] || TOKENS2.navy;
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 1 }
      });
      const verbBoxW = 1.2;
      const verbBoxH = 0.44;
      slide.addShape(SH.roundRect, {
        x: x + 0.14,
        y: y + 0.14,
        w: verbBoxW,
        h: verbBoxH,
        rectRadius: 0.02,
        fill: { color: accent },
        line: { color: accent }
      });
      slide.addText(verb, {
        x: x + 0.14,
        y: y + 0.15,
        // Desplazamiento mínimo vertical para romper la simetría de colisión
        w: verbBoxW,
        h: verbBoxH,
        fontFace: TYPOGRAPHY2.mono,
        fontSize: 14,
        bold: true,
        color: TOKENS2.white,
        align: "center",
        valign: "mid"
      });
      slide.addText(url, {
        x: x + 1.44,
        y: y + 0.14,
        w: w - 1.58,
        h: 0.44,
        fontFace: TYPOGRAPHY2.mono,
        fontSize: 12,
        color: TOKENS2.navy,
        valign: "mid"
      });
      if (json) {
        slide.addShape(SH.rect, {
          x: x + 0.14,
          y: y + 0.72,
          w: w - 0.28,
          h: h - 0.86,
          fill: { color: "F8F9FA" },
          line: { color: TOKENS2.border, pt: 0.5 }
        });
        slide.addText(json, {
          x: x + 0.24,
          y: y + 0.82,
          w: w - 0.48,
          h: h - 1.06,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 9,
          color: TOKENS2.slate,
          valign: "top"
        });
      }
    }
    function addLayerStack2(slide, SH, opts = {}) {
      const x = opts.x || 0.88;
      const y = opts.y || 2.22;
      const w = opts.w || 5;
      const h = opts.h || 4.54;
      const layers = [
        { title: "Capa de API", subtitle: "Controladores / HTTP", fill: TOKENS2.softBlue, accent: TOKENS2.navy },
        { title: "Capa de Negocio", subtitle: "Servicios / Reglas", fill: TOKENS2.paleRed, accent: TOKENS2.red },
        { title: "Capa de Datos", subtitle: "Persistencia / SQL", fill: TOKENS2.softNeutral, accent: TOKENS2.gold }
      ];
      const layerH = (h - 0.4) / layers.length;
      layers.forEach((layer, i) => {
        const layerY = y + i * (layerH + 0.2);
        slide.addShape(SH.roundRect, {
          x,
          y: layerY,
          w,
          h: layerH,
          rectRadius: 0.06,
          fill: { color: layer.fill },
          line: { color: layer.accent, pt: 2 }
        });
        slide.addText(layer.title, {
          x: x + 0.2,
          y: layerY + 0.2,
          w: w - 0.4,
          h: 0.4,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 16,
          bold: true,
          color: layer.accent
        });
        slide.addText(layer.subtitle, {
          x: x + 0.2,
          y: layerY + 0.6,
          w: w - 0.4,
          h: 0.3,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 11,
          color: TOKENS2.slate
        });
      });
      slide.addShape(SH.downArrow, {
        x: x + w + 0.2,
        // Más cerca del stack
        y: y + 0.5,
        w: 0.3,
        // Más delgada
        h: h - 1,
        fill: { color: TOKENS2.navy },
        line: { color: TOKENS2.navy }
      });
      slide.addText("Petici\xF3n", {
        x: x + w + 0.55,
        // Más espacio para el texto explicativo lateral
        y: y + h / 2 - 0.2,
        w: 1.2,
        h: 0.4,
        fontSize: 11,
        bold: true,
        color: TOKENS2.navy
      });
    }
    function addTableSchema2(slide, SH, opts = {}) {
      const x = opts.x || 0.88;
      const y = opts.y || 2.22;
      const w = opts.w || 3.6;
      const headerH = 0.4;
      const rowH = 0.26;
      const title = opts.title || "Table";
      const columns = opts.columns || [];
      const h = headerH + columns.length * rowH + 0.1;
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addText(title, {
        x,
        y,
        w,
        h: headerH,
        fontFace: TYPOGRAPHY2.mono,
        fontSize: 13,
        bold: true,
        color: TOKENS2.white,
        valign: "mid",
        align: "center",
        fill: { color: TOKENS2.navy }
      });
      columns.forEach((col, i) => {
        const rowY = y + headerH + i * rowH;
        const isPK = col.key === "PK";
        const isFK = col.key === "FK";
        TOKENS2.slate;
        let keyText = "";
        if (isPK) {
          TOKENS2.gold;
          keyText = "\u{1F511}";
        } else if (isFK) {
          TOKENS2.red;
          keyText = "\u{1F517}";
        }
        if (keyText) {
          slide.addText(keyText, {
            x: x + 0.05,
            y: rowY + 0.03,
            w: 0.3,
            h: rowH - 0.06,
            fontSize: 10,
            valign: "mid",
            align: "center"
          });
        }
        slide.addText(col.name, {
          x: x + 0.35,
          y: rowY + 0.03,
          w: w - 1.85,
          h: rowH - 0.06,
          // Frontera reducida para evitar choque
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 11,
          bold: isPK,
          color: isPK ? TOKENS2.navy : TOKENS2.ink,
          valign: "mid"
        });
        slide.addText(col.type, {
          x: x + w - 1.45,
          y: rowY + 0.03,
          w: 1.35,
          h: rowH - 0.06,
          // Posición ajustada
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 9,
          color: TOKENS2.slate,
          valign: "mid",
          align: "right"
        });
        if (i < columns.length - 1) {
          slide.addShape(SH.line, {
            x: x + 0.1,
            y: rowY + rowH,
            w: w - 0.2,
            h: 0.01,
            line: { color: TOKENS2.paper, pt: 1 }
          });
        }
      });
    }
    function addErRelationship2(slide, SH, opts = {}) {
      const round = (n) => Math.round(n * 100) / 100;
      const startX = round(opts.startX);
      const startY = round(opts.startY);
      const endX = round(opts.endX);
      const endY = round(opts.endY);
      const type = opts.type || "1:N";
      const label = opts.label || "";
      const color = opts.color || TOKENS2.navy;
      const isFlippedH = endX < startX;
      const dir = isFlippedH ? -1 : 1;
      slide.addShape(SH.line, {
        x: round(Math.min(startX, endX)),
        y: round(Math.min(startY, endY)),
        w: round(Math.max(0.01, Math.abs(endX - startX))),
        h: round(Math.max(0.01, Math.abs(endY - startY))),
        line: { color, pt: 1.5 },
        flipH: isFlippedH,
        flipV: endY < startY
      });
      slide.addShape(SH.line, {
        x: round(startX + dir * 0.15),
        y: round(startY - 0.1),
        w: 0,
        h: 0.2,
        line: { color, pt: 1.5 }
      });
      slide.addShape(SH.line, {
        x: round(startX + dir * 0.35),
        y: round(startY - 0.1),
        w: 0,
        h: 0.2,
        line: { color, pt: 1.5 }
      });
      if (type === "1:N" || type === "N:M") {
        const tipX = endX;
        const baseW = 0.28;
        const baseH = 0.12;
        slide.addShape(SH.line, {
          x: round(Math.min(tipX, tipX - dir * baseW)),
          y: round(endY - baseH),
          w: baseW,
          h: baseH,
          line: { color, pt: 1.5 },
          flipH: !isFlippedH,
          flipV: true
        });
        slide.addShape(SH.line, {
          x: round(Math.min(tipX, tipX - dir * baseW)),
          y: endY,
          w: baseW,
          h: baseH,
          line: { color, pt: 1.5 },
          flipH: !isFlippedH,
          flipV: false
        });
        slide.addShape(SH.line, {
          x: round(endX - dir * 0.48),
          y: round(endY - 0.1),
          w: 0,
          h: 0.2,
          line: { color, pt: 1.5 }
        });
      } else if (type === "1:1") {
        slide.addShape(SH.line, {
          x: round(endX - dir * 0.15),
          y: round(endY - 0.1),
          w: 0,
          h: 0.2,
          line: { color, pt: 1.5 }
        });
        slide.addShape(SH.line, {
          x: round(endX - dir * 0.35),
          y: round(endY - 0.1),
          w: 0,
          h: 0.2,
          line: { color, pt: 1.5 }
        });
      }
      if (label) {
        const midX = startX + (endX - startX) / 2;
        slide.addText(label, {
          x: round(midX - 0.5),
          y: round(startY - 0.25),
          w: 1,
          h: 0.2,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8,
          bold: true,
          color,
          align: "center",
          valign: "mid",
          fill: { color: TOKENS2.white }
        });
      }
    }
    function addJoinSetDiagram2(slide, SH, opts = {}) {
      const x = opts.x || 0.88;
      const y = opts.y || 1.8;
      const w = opts.w || 5.2;
      const h = opts.h || 4.2;
      const type = opts.type || "inner";
      const leftLabel = opts.leftLabel || "Tabla A";
      const rightLabel = opts.rightLabel || "Tabla B";
      const title = opts.title || "Lectura visual del JOIN";
      const copy = joinTypeCopy(type, leftLabel, rightLabel);
      const headerH = opts.title === false ? 0 : 0.52;
      const footerH = opts.caption === false ? 0 : 0.58;
      const pad = opts.pad || 0.16;
      const badgeW = Math.min(1.42, Math.max(1.08, w * 0.22));
      const badgeX = x + w - pad - badgeW;
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: 0.04,
        fill: { color: opts.fill || TOKENS2.white },
        line: { color: opts.line || TOKENS2.border, pt: 1 }
      });
      if (headerH > 0) {
        slide.addShape(SH.roundRect, {
          x: x + pad,
          y: y + pad,
          w: w - pad * 2,
          h: 0.36,
          rectRadius: 0.03,
          fill: { color: opts.headerFill || TOKENS2.softNeutral },
          line: { color: opts.headerFill || TOKENS2.softNeutral }
        });
        slide.addText(title, {
          x: x + pad + 0.12,
          y: y + pad + 0.09,
          w: w - pad * 2 - badgeW - 0.24,
          h: 0.12,
          fontFace: TYPOGRAPHY2.display,
          fontSize: opts.titleFontSize || 10.6,
          bold: true,
          color: TOKENS2.navy,
          margin: 0,
          fit: "shrink"
        });
        slide.addShape(SH.roundRect, {
          x: badgeX,
          y: y + pad + 0.06,
          w: badgeW,
          h: 0.24,
          rectRadius: 0.03,
          fill: { color: opts.badgeFill || TOKENS2.navy },
          line: { color: opts.badgeFill || TOKENS2.navy }
        });
        slide.addText(opts.badge || copy.badge, {
          x: badgeX + 0.06,
          y: y + pad + 0.13,
          w: badgeW - 0.12,
          h: 0.08,
          fontFace: TYPOGRAPHY2.body,
          fontSize: opts.badgeFontSize || 7.4,
          bold: true,
          color: TOKENS2.white,
          align: "center",
          margin: 0,
          fit: "shrink"
        });
      }
      const diagramX = x + pad;
      const diagramY = y + pad + headerH;
      const diagramW = w - pad * 2;
      const diagramH = Math.max(1.1, h - pad * 2 - headerH - footerH);
      const imageH = Math.min(diagramH, diagramW * 0.72);
      const imageW = Math.min(diagramW, imageH * (480 / 340));
      const imageX = diagramX + (diagramW - imageW) / 2;
      const imageY = diagramY + (diagramH - imageH) / 2;
      slide.addImage({
        data: joinDiagramSvg({
          type,
          leftLabel,
          rightLabel,
          result: opts.result,
          leftColor: opts.leftColor,
          rightColor: opts.rightColor,
          highlightColor: opts.highlightColor,
          paperColor: opts.diagramFill || TOKENS2.paper
        }),
        x: imageX,
        y: imageY,
        w: imageW,
        h: imageH
      });
      if (footerH > 0) {
        slide.addText(opts.caption || copy.result, {
          x: x + pad + 0.08,
          y: y + h - pad - 0.36,
          w: w - pad * 2 - 0.16,
          h: 0.28,
          fontFace: TYPOGRAPHY2.body,
          fontSize: opts.captionFontSize || 8.8,
          color: TOKENS2.slate,
          align: "center",
          valign: "mid",
          margin: 0,
          fit: "shrink"
        });
      }
    }
    function addSupabaseProjectSetupPanel2(slide, SH, opts = {}) {
      const x = opts.x || 0.88;
      const y = opts.y || 2.22;
      const w = opts.w || 10.26;
      const h = opts.h || 3.9;
      const title = opts.title || "Supabase: crear proyecto";
      const footerH = opts.footer ? 0.28 : 0;
      const bodyY = y + 0.58;
      const bodyH = h - 0.72 - footerH;
      const gap = 0.22;
      const leftW = opts.leftW || w * 0.47;
      const rightW = w - leftW - gap;
      const leftX = x;
      const rightX = x + leftW + gap;
      const organizationName = opts.organizationName || "AIEP Sandbox";
      const projectName = opts.projectName || "cine-db-demo";
      const databasePassword = opts.databasePassword || "db-pass-2026";
      const regionName = opts.regionName || "South America (Sao Paulo)";
      const planLabel = opts.planLabel || "Free";
      const statusItems = opts.statusItems || [
        "Project provisioned",
        "Database online",
        "API ready"
      ];
      const tabs = opts.tabs || ["Table Editor", "SQL Editor", "API Docs"];
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addText(title, {
        x: x + 0.16,
        y: y + 0.12,
        w: w - 0.32,
        h: 0.3,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 16,
        bold: true,
        color: TOKENS2.navy
      });
      slide.addShape(SH.line, {
        x: x + 0.14,
        y: y + 0.48,
        w: w - 0.28,
        h: 0,
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addShape(SH.roundRect, {
        x: leftX,
        y: bodyY,
        w: leftW,
        h: bodyH,
        rectRadius: 0.04,
        fill: { color: TOKENS2.softNeutral },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addText("Paso 1: formulario base", {
        x: leftX + 0.18,
        y: bodyY + 0.16,
        w: leftW - 0.36,
        h: 0.24,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 12.5,
        bold: true,
        color: TOKENS2.navy
      });
      const fieldX = leftX + 0.18;
      const fieldW = leftW - 0.36;
      const labelW = 1.55;
      const valueX = fieldX + labelW + 0.12;
      const valueW = fieldW - labelW - 0.12;
      const rows = [
        { label: "Organization", value: organizationName },
        { label: "Project name", value: projectName },
        { label: "DB password", value: databasePassword },
        { label: "Region", value: regionName },
        { label: "Plan", value: planLabel }
      ];
      rows.forEach((row, index) => {
        const rowY = bodyY + 0.54 + index * 0.42;
        slide.addText(row.label, {
          x: fieldX,
          y: rowY + 0.04,
          w: labelW,
          h: 0.2,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 10,
          bold: true,
          color: TOKENS2.slate
        });
        slide.addShape(SH.roundRect, {
          x: valueX,
          y: rowY,
          w: valueW,
          h: 0.28,
          rectRadius: 0.02,
          fill: { color: TOKENS2.white },
          line: { color: TOKENS2.border, pt: 0.75 }
        });
        slide.addText(row.value, {
          x: valueX + 0.08,
          y: rowY + 0.04,
          w: valueW - 0.16,
          h: 0.2,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 9.5,
          color: TOKENS2.ink
        });
      });
      slide.addShape(SH.roundRect, {
        x: leftX + 0.18,
        y: bodyY + bodyH - 0.52,
        w: 1.7,
        h: 0.3,
        rectRadius: 0.03,
        fill: { color: TOKENS2.red },
        line: { color: TOKENS2.red, pt: 1 }
      });
      slide.addText("Create project", {
        x: leftX + 0.18,
        y: bodyY + bodyH - 0.47,
        w: 1.7,
        h: 0.18,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 10,
        bold: true,
        color: TOKENS2.white,
        align: "center"
      });
      const statusH = 1.34;
      const workspaceY = bodyY + statusH + 0.16;
      const workspaceH = bodyH - statusH - 0.16;
      slide.addShape(SH.roundRect, {
        x: rightX,
        y: bodyY,
        w: rightW,
        h: statusH,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addText("Paso 2: proyecto listo", {
        x: rightX + 0.16,
        y: bodyY + 0.14,
        w: rightW - 0.32,
        h: 0.22,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 12.5,
        bold: true,
        color: TOKENS2.navy
      });
      statusItems.forEach((item, index) => {
        const itemY = bodyY + 0.46 + index * 0.24;
        slide.addShape(SH.rect, {
          x: rightX + 0.18,
          y: itemY + 0.03,
          w: 0.12,
          h: 0.12,
          fill: { color: index === 1 ? TOKENS2.red : TOKENS2.gold },
          line: { color: index === 1 ? TOKENS2.red : TOKENS2.gold, pt: 0.75 }
        });
        slide.addText(item, {
          x: rightX + 0.38,
          y: itemY,
          w: rightW - 0.56,
          h: 0.18,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 10,
          color: TOKENS2.slate
        });
      });
      slide.addShape(SH.roundRect, {
        x: rightX,
        y: workspaceY,
        w: rightW,
        h: workspaceH,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addText("Paso 3: orientarse en el dashboard", {
        x: rightX + 0.16,
        y: workspaceY + 0.14,
        w: rightW - 0.32,
        h: 0.2,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 12.5,
        bold: true,
        color: TOKENS2.navy
      });
      tabs.forEach((tab, index) => {
        const tabW = (rightW - 0.52) / tabs.length;
        const tabX = rightX + 0.16 + index * tabW;
        slide.addShape(SH.roundRect, {
          x: tabX,
          y: workspaceY + 0.44,
          w: tabW - 0.08,
          h: 0.26,
          rectRadius: 0.02,
          fill: { color: index === 0 ? TOKENS2.navy : TOKENS2.softBlue },
          line: { color: index === 0 ? TOKENS2.navy : TOKENS2.border, pt: 0.75 }
        });
        slide.addText(tab, {
          x: tabX,
          y: workspaceY + 0.5,
          w: tabW - 0.08,
          h: 0.14,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9,
          bold: index === 0,
          color: index === 0 ? TOKENS2.white : TOKENS2.navy,
          align: "center"
        });
      });
      const miniCardY = workspaceY + 0.86;
      const miniCardW = (rightW - 0.42) / 2;
      [
        { title: "Database", body: "La instancia PostgreSQL ya vive aqui.", accent: TOKENS2.red, x: rightX + 0.16 },
        { title: "API", body: "Supabase prepara acceso REST y metadatos.", accent: TOKENS2.gold, x: rightX + 0.26 + miniCardW }
      ].forEach((card) => {
        slide.addShape(SH.roundRect, {
          x: card.x,
          y: miniCardY,
          w: miniCardW,
          h: workspaceH - 1.02,
          rectRadius: 0.03,
          fill: { color: TOKENS2.softNeutral },
          line: { color: TOKENS2.border, pt: 0.75 }
        });
        slide.addShape(SH.rect, {
          x: card.x,
          y: miniCardY,
          w: 0.08,
          h: workspaceH - 1.02,
          fill: { color: card.accent },
          line: { color: card.accent, pt: 0.75 }
        });
        slide.addText(card.title, {
          x: card.x + 0.16,
          y: miniCardY + 0.14,
          w: miniCardW - 0.24,
          h: 0.18,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11,
          bold: true,
          color: TOKENS2.navy
        });
        slide.addText(card.body, {
          x: card.x + 0.16,
          y: miniCardY + 0.4,
          w: miniCardW - 0.24,
          h: 0.42,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9.5,
          color: TOKENS2.slate
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.18,
          y: y + h - 0.2,
          w: w - 0.36,
          h: 0.14,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9,
          color: TOKENS2.slate,
          align: "center"
        });
      }
    }
    function addSupabaseTableEditorPanel2(slide, SH, opts = {}) {
      const x = opts.x || 0.88;
      const y = opts.y || 2.22;
      const w = opts.w || 10.26;
      const h = opts.h || 4;
      const title = opts.title || "Supabase: Table Editor";
      const footerH = opts.footer ? 0.28 : 0;
      const bodyY = y + 0.58;
      const bodyH = h - 0.72 - footerH;
      const gap = 0.22;
      const leftW = opts.leftW || w * 0.61;
      const rightW = w - leftW - gap;
      const tableName = opts.tableName || "peliculas";
      const columns = opts.columns || [
        { name: "id", type: "uuid", key: "PK" },
        { name: "titulo", type: "text" },
        { name: "duracion_min", type: "int4" },
        { name: "sala_id", type: "uuid", key: "FK" }
      ];
      const relationshipTitle = opts.relationshipTitle || "Relationship";
      const relationshipBody = opts.relationshipBody || "funciones.sala_id -> salas.id";
      const sampleRowTitle = opts.sampleRowTitle || "Sample row";
      const sampleValues = opts.sampleValues || [
        'id: "a1b2-c3d4"',
        'titulo: "Batman"',
        "duracion_min: 168"
      ];
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addText(title, {
        x: x + 0.16,
        y: y + 0.12,
        w: w - 0.32,
        h: 0.3,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 16,
        bold: true,
        color: TOKENS2.navy
      });
      slide.addShape(SH.line, {
        x: x + 0.14,
        y: y + 0.48,
        w: w - 0.28,
        h: 0,
        line: { color: TOKENS2.border, pt: 1 }
      });
      const leftX = x;
      const rightX = x + leftW + gap;
      slide.addShape(SH.roundRect, {
        x: leftX,
        y: bodyY,
        w: leftW,
        h: bodyH,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 1 }
      });
      slide.addShape(SH.rect, {
        x: leftX,
        y: bodyY,
        w: leftW,
        h: 0.32,
        fill: { color: TOKENS2.softNeutral },
        line: { color: TOKENS2.border, pt: 0.75 }
      });
      slide.addText("Table Editor", {
        x: leftX + 0.14,
        y: bodyY + 0.08,
        w: 1.2,
        h: 0.14,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 9.5,
        bold: true,
        color: TOKENS2.navy
      });
      slide.addShape(SH.roundRect, {
        x: leftX + leftW - 0.98,
        y: bodyY + 0.05,
        w: 0.78,
        h: 0.2,
        rectRadius: 0.02,
        fill: { color: TOKENS2.red },
        line: { color: TOKENS2.red, pt: 0.75 }
      });
      slide.addText("Save", {
        x: leftX + leftW - 0.98,
        y: bodyY + 0.09,
        w: 0.78,
        h: 0.1,
        fontFace: TYPOGRAPHY2.body,
        fontSize: 8.5,
        bold: true,
        color: TOKENS2.white,
        align: "center"
      });
      slide.addShape(SH.roundRect, {
        x: leftX + 0.16,
        y: bodyY + 0.44,
        w: 1.6,
        h: 0.24,
        rectRadius: 0.02,
        fill: { color: TOKENS2.navy },
        line: { color: TOKENS2.navy, pt: 0.75 }
      });
      slide.addText(tableName, {
        x: leftX + 0.16,
        y: bodyY + 0.5,
        w: 1.6,
        h: 0.1,
        fontFace: TYPOGRAPHY2.mono,
        fontSize: 9.5,
        bold: true,
        color: TOKENS2.white,
        align: "center"
      });
      const tableX = leftX + 0.16;
      const tableY = bodyY + 0.82;
      const tableW = leftW - 0.32;
      const headerH = 0.3;
      const rowH = 0.32;
      slide.addShape(SH.roundRect, {
        x: tableX,
        y: tableY,
        w: tableW,
        h: headerH + columns.length * rowH,
        rectRadius: 0.03,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 0.75 }
      });
      slide.addShape(SH.rect, {
        x: tableX,
        y: tableY,
        w: tableW,
        h: headerH,
        fill: { color: TOKENS2.softBlue },
        line: { color: TOKENS2.border, pt: 0.5 }
      });
      [
        { text: "Column", x: tableX + 0.16, w: tableW - 2.1, align: "left" },
        { text: "Type", x: tableX + tableW - 1.78, w: 0.72, align: "left" },
        { text: "Key", x: tableX + tableW - 0.74, w: 0.46, align: "center" }
      ].forEach((header) => {
        slide.addText(header.text, {
          x: header.x,
          y: tableY + 0.08,
          w: header.w,
          h: 0.12,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 8.8,
          bold: true,
          color: TOKENS2.navy,
          align: header.align
        });
      });
      columns.forEach((column, index) => {
        const rowY = tableY + headerH + index * rowH;
        if (index > 0) {
          slide.addShape(SH.line, {
            x: tableX + 0.08,
            y: rowY,
            w: tableW - 0.16,
            h: 0,
            line: { color: TOKENS2.paper, pt: 0.75 }
          });
        }
        slide.addText(column.name, {
          x: tableX + 0.14,
          y: rowY + 0.09,
          w: tableW - 2.06,
          h: 0.12,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 9,
          bold: column.key === "PK",
          color: column.key === "PK" ? TOKENS2.navy : TOKENS2.ink
        });
        slide.addText(column.type, {
          x: tableX + tableW - 1.76,
          y: rowY + 0.09,
          w: 0.72,
          h: 0.12,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 8.7,
          color: TOKENS2.slate
        });
        if (column.key) {
          const keyFill = column.key === "PK" ? TOKENS2.gold : TOKENS2.red;
          slide.addShape(SH.roundRect, {
            x: tableX + tableW - 0.72,
            y: rowY + 0.06,
            w: 0.5,
            h: 0.18,
            rectRadius: 0.02,
            fill: { color: keyFill },
            line: { color: keyFill, pt: 0.75 }
          });
          slide.addText(column.key, {
            x: tableX + tableW - 0.72,
            y: rowY + 0.1,
            w: 0.5,
            h: 0.08,
            fontFace: TYPOGRAPHY2.body,
            fontSize: 7.8,
            bold: true,
            color: column.key === "PK" ? TOKENS2.navy : TOKENS2.white,
            align: "center"
          });
        }
      });
      slide.addShape(SH.roundRect, {
        x: rightX,
        y: bodyY,
        w: rightW,
        h: 1.22,
        rectRadius: 0.04,
        fill: { color: TOKENS2.softNeutral },
        line: { color: TOKENS2.border, pt: 0.75 }
      });
      slide.addText(relationshipTitle, {
        x: rightX + 0.16,
        y: bodyY + 0.14,
        w: rightW - 0.32,
        h: 0.18,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 11.5,
        bold: true,
        color: TOKENS2.navy
      });
      slide.addText(relationshipBody, {
        x: rightX + 0.16,
        y: bodyY + 0.48,
        w: rightW - 0.32,
        h: 0.36,
        fontFace: TYPOGRAPHY2.mono,
        fontSize: 9.5,
        color: TOKENS2.red
      });
      slide.addShape(SH.roundRect, {
        x: rightX,
        y: bodyY + 1.42,
        w: rightW,
        h: bodyH - 1.42,
        rectRadius: 0.04,
        fill: { color: TOKENS2.white },
        line: { color: TOKENS2.border, pt: 0.75 }
      });
      slide.addText(sampleRowTitle, {
        x: rightX + 0.16,
        y: bodyY + 1.56,
        w: rightW - 0.32,
        h: 0.18,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 11.5,
        bold: true,
        color: TOKENS2.navy
      });
      sampleValues.forEach((line, index) => {
        slide.addShape(SH.roundRect, {
          x: rightX + 0.16,
          y: bodyY + 1.9 + index * 0.34,
          w: rightW - 0.32,
          h: 0.24,
          rectRadius: 0.02,
          fill: { color: TOKENS2.softNeutral },
          line: { color: TOKENS2.border, pt: 0.5 }
        });
        slide.addText(line, {
          x: rightX + 0.24,
          y: bodyY + 1.97 + index * 0.34,
          w: rightW - 0.48,
          h: 0.1,
          fontFace: TYPOGRAPHY2.mono,
          fontSize: 8.8,
          color: TOKENS2.slate
        });
      });
      if (opts.footer) {
        slide.addText(opts.footer, {
          x: x + 0.18,
          y: y + h - 0.2,
          w: w - 0.36,
          h: 0.14,
          fontFace: TYPOGRAPHY2.body,
          fontSize: 9,
          color: TOKENS2.slate,
          align: "center"
        });
      }
    }
    module.exports = {
      addServerCycle: addServerCycle2,
      addRestResource: addRestResource2,
      addLayerStack: addLayerStack2,
      addTableSchema: addTableSchema2,
      addErRelationship: addErRelationship2,
      addSupabaseProjectSetupPanel: addSupabaseProjectSetupPanel2,
      addSupabaseTableEditorPanel: addSupabaseTableEditorPanel2,
      addJoinSetDiagram: addJoinSetDiagram2
    };
  }
});

// components/game-ai-panels.js
var require_game_ai_panels = __commonJS({
  "components/game-ai-panels.js"(exports$1, module) {
    var { TOKENS: TOKENS2 } = require_tokens();
    var { TYPOGRAPHY: TYPOGRAPHY2 } = require_typography();
    function text(slide, value, opts = {}) {
      slide.addText(value || "", {
        x: opts.x,
        y: opts.y,
        w: opts.w,
        h: opts.h,
        fontFace: opts.fontFace || TYPOGRAPHY2.body,
        fontSize: opts.fontSize || 10,
        bold: opts.bold || false,
        color: opts.color || TOKENS2.ink,
        align: opts.align || "left",
        valign: opts.valign || "top",
        margin: opts.margin ?? 0,
        fit: opts.fit || "shrink",
        breakLine: false
      });
    }
    function surface(slide, SH, x, y, w, h, opts = {}) {
      slide.addShape(SH.roundRect, {
        x,
        y,
        w,
        h,
        rectRadius: opts.rectRadius || 0.05,
        fill: { color: opts.fill || TOKENS2.white, transparency: opts.transparency },
        line: {
          color: opts.line || TOKENS2.border,
          pt: opts.linePt || 1,
          transparency: opts.lineTransparency
        }
      });
    }
    function accent(slide, SH, x, y, h, color = TOKENS2.red, w = 0.12) {
      slide.addShape(SH.rect, {
        x,
        y,
        w,
        h,
        fill: { color },
        line: { color }
      });
    }
    function line(slide, SH, x1, y1, x2, y2, opts = {}) {
      const reverse = x2 < x1 || y2 < y1;
      slide.addShape(SH.line, {
        x: reverse ? x2 : x1,
        y: reverse ? y2 : y1,
        w: Math.abs(x2 - x1),
        h: Math.abs(y2 - y1),
        line: {
          color: opts.color || TOKENS2.guide,
          pt: opts.pt || 1.15,
          beginArrowType: reverse ? opts.endArrowType || "triangle" : opts.beginArrowType || "none",
          endArrowType: reverse ? opts.beginArrowType || "none" : opts.endArrowType || "triangle",
          dash: opts.dash,
          transparency: opts.transparency
        }
      });
    }
    function panelTitle(slide, x, y, w, title, subtitle, opts = {}) {
      text(slide, title, {
        x,
        y,
        w,
        h: opts.titleH || 0.32,
        fontFace: TYPOGRAPHY2.display,
        fontSize: opts.titleFontSize || 14.5,
        bold: true,
        color: opts.titleColor || TOKENS2.navy
      });
      if (!subtitle) return;
      text(slide, subtitle, {
        x,
        y: y + (opts.subtitleY || 0.38),
        w,
        h: opts.subtitleH || 0.28,
        fontSize: opts.subtitleFontSize || 9.2,
        color: opts.subtitleColor || TOKENS2.slate
      });
    }
    function badge(slide, SH, x, y, label, opts = {}) {
      const w = opts.w || 0.74;
      const h = opts.h || 0.28;
      surface(slide, SH, x, y, w, h, {
        fill: opts.fill || TOKENS2.navy,
        line: opts.fill || TOKENS2.navy,
        rectRadius: 0.04
      });
      text(slide, label, {
        x: x + 0.06,
        y: y + 0.07,
        w: w - 0.12,
        h: 0.1,
        fontFace: TYPOGRAPHY2.display,
        fontSize: opts.fontSize || 8,
        bold: true,
        color: opts.color || TOKENS2.white,
        align: "center"
      });
    }
    function drawPiece(slide, SH, cx, cy, size, player, opts = {}) {
      const red = opts.red || TOKENS2.red;
      const blue = opts.blue || TOKENS2.titleFill;
      const color = player === 1 || player === "p1" || player === "red" ? red : blue;
      const lineColor = player === 1 || player === "p1" || player === "red" ? "9E171B" : TOKENS2.navy;
      slide.addShape(SH.ellipse, {
        x: cx - size / 2,
        y: cy - size / 2,
        w: size,
        h: size,
        fill: { color },
        line: { color: lineColor, pt: 1 }
      });
      slide.addShape(SH.ellipse, {
        x: cx - size * 0.23,
        y: cy - size * 0.25,
        w: size * 0.24,
        h: size * 0.18,
        fill: { color: TOKENS2.white, transparency: 55 },
        line: { color: TOKENS2.white, transparency: 100 }
      });
    }
    function normalizeCell(cell) {
      if (cell === 1 || cell === "1" || cell === "p1" || cell === "red" || cell === "R") return 1;
      if (cell === -1 || cell === "-1" || cell === "p2" || cell === "blue" || cell === "B") return -1;
      return 0;
    }
    function addAtaxxBoardState2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const titleH = opts.title ? 0.64 : 0.08;
      const boardSize = 7;
      const boardSide = Math.min(w * (opts.boardRatio || 0.58), h - titleH - 0.18);
      const boardX = x + 0.2;
      const boardY = y + titleH + 0.12;
      const sideX = boardX + boardSide + 0.28;
      const sideW = Math.max(1.2, x + w - sideX - 0.2);
      const cell = boardSide / boardSize;
      const grid = opts.grid || [
        [1, 0, 0, 0, 0, 0, -1],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [-1, 0, 0, 0, 0, 0, 1]
      ];
      const highlights = opts.highlights || [];
      const highlightKey = new Map(highlights.map((item) => [`${item.r},${item.c}`, item]));
      surface(slide, SH, x, y, w, h, { fill: opts.fill || TOKENS2.white, line: opts.line || TOKENS2.border });
      if (opts.title) {
        panelTitle(slide, x + 0.24, y + 0.14, w - 0.48, opts.title, opts.subtitle, {
          titleFontSize: opts.titleFontSize || 13.8,
          subtitleFontSize: opts.subtitleFontSize || 8.8
        });
      }
      slide.addShape(SH.rect, {
        x: boardX,
        y: boardY,
        w: boardSide,
        h: boardSide,
        fill: { color: opts.boardFill || "F2F5F8" },
        line: { color: TOKENS2.navy, pt: 1.2 }
      });
      for (let r = 0; r < boardSize; r += 1) {
        for (let c = 0; c < boardSize; c += 1) {
          const cx = boardX + c * cell;
          const cy = boardY + r * cell;
          const fill = (r + c) % 2 === 0 ? "F8FBFD" : "E8EEF5";
          slide.addShape(SH.rect, {
            x: cx,
            y: cy,
            w: cell,
            h: cell,
            fill: { color: fill },
            line: { color: "D5DFEA", pt: 0.55 }
          });
          const hi = highlightKey.get(`${r},${c}`);
          if (hi) {
            slide.addShape(SH.rect, {
              x: cx + 0.03,
              y: cy + 0.03,
              w: cell - 0.06,
              h: cell - 0.06,
              fill: { color: hi.fill || TOKENS2.gold, transparency: hi.transparency ?? 18 },
              line: { color: hi.line || hi.fill || TOKENS2.gold, pt: 1.4 }
            });
          }
          const piece = normalizeCell(grid[r]?.[c]);
          if (piece !== 0) {
            drawPiece(slide, SH, cx + cell / 2, cy + cell / 2, cell * 0.62, piece, opts);
          }
        }
      }
      if (opts.move) {
        const fromX = boardX + opts.move.from.c * cell + cell / 2;
        const fromY = boardY + opts.move.from.r * cell + cell / 2;
        const toX = boardX + opts.move.to.c * cell + cell / 2;
        const toY = boardY + opts.move.to.r * cell + cell / 2;
        line(slide, SH, fromX, fromY, toX, toY, {
          color: opts.move.color || TOKENS2.red,
          pt: opts.move.pt || 2.2,
          dash: opts.move.dash
        });
      }
      const metrics = opts.metrics || [
        { label: "Tablero", value: "7 x 7" },
        { label: "Estado", value: "49 casillas" },
        { label: "Acciones", value: "793 indices" }
      ];
      metrics.slice(0, 4).forEach((metric, index) => {
        const rowY = boardY + index * 0.62;
        surface(slide, SH, sideX, rowY, sideW, 0.46, {
          fill: metric.fill || (index % 2 === 0 ? TOKENS2.softBlue : TOKENS2.warm),
          line: metric.fill || (index % 2 === 0 ? TOKENS2.softBlue : TOKENS2.warm),
          rectRadius: 0.04
        });
        text(slide, metric.label, {
          x: sideX + 0.16,
          y: rowY + 0.11,
          w: sideW * 0.42,
          h: 0.12,
          fontSize: 8.4,
          bold: true,
          color: metric.accent || TOKENS2.navy
        });
        text(slide, metric.value, {
          x: sideX + sideW * 0.48,
          y: rowY + 0.08,
          w: sideW * 0.46,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11.4,
          bold: true,
          color: TOKENS2.ink,
          align: "right"
        });
      });
      const note = opts.note || "Cada jugada modifica el tablero y tambien cambia el espacio de decisiones del rival.";
      text(slide, note, {
        x: sideX,
        y: boardY + Math.max(2.68, metrics.length * 0.62 + 0.22),
        w: sideW,
        h: Math.max(0.56, boardY + boardSide - (boardY + Math.max(2.68, metrics.length * 0.62 + 0.22))),
        fontSize: opts.noteFontSize || 9,
        color: TOKENS2.slate,
        valign: "mid"
      });
    }
    function addMoveAnatomyPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const titleH = opts.title ? 0.68 : 0.1;
      const rowY = y + titleH + 0.18;
      const gap = opts.gap || 0.2;
      const cardW = (w - gap * 2) / 3;
      const cardH = h - titleH - 0.22;
      const moves = opts.moves || [
        {
          label: "01",
          title: "Clonar",
          rule: "distancia 1",
          body: "La pieza original queda en su lugar y aparece una copia.",
          accent: TOKENS2.success,
          fill: TOKENS2.successSoft,
          path: "clone"
        },
        {
          label: "02",
          title: "Saltar",
          rule: "distancia 2",
          body: "La pieza cambia de posicion sin aumentar el conteo total.",
          accent: TOKENS2.gold,
          fill: TOKENS2.warm,
          path: "jump"
        },
        {
          label: "03",
          title: "Infectar",
          rule: "radio 1",
          body: "Las piezas rivales adyacentes al destino cambian de lado.",
          accent: TOKENS2.red,
          fill: TOKENS2.paleRed,
          path: "infect"
        }
      ];
      if (opts.title) {
        panelTitle(slide, x, y, w, opts.title, opts.subtitle, opts);
      }
      moves.forEach((move, index) => {
        const cardX = x + index * (cardW + gap);
        surface(slide, SH, cardX, rowY, cardW, cardH, { fill: move.fill, line: move.fill });
        accent(slide, SH, cardX + 0.14, rowY + 0.16, cardH - 0.32, move.accent);
        badge(slide, SH, cardX + 0.34, rowY + 0.18, move.label, { fill: move.accent, w: 0.46, fontSize: 7.5 });
        text(slide, move.title, {
          x: cardX + 0.92,
          y: rowY + 0.17,
          w: cardW - 1.16,
          h: 0.25,
          fontFace: TYPOGRAPHY2.display,
          fontSize: opts.cardTitleFontSize || 14.5,
          bold: true,
          color: TOKENS2.navy
        });
        text(slide, move.rule, {
          x: cardX + 0.34,
          y: rowY + 0.58,
          w: cardW - 0.58,
          h: 0.18,
          fontSize: 8.8,
          bold: true,
          color: move.accent
        });
        const diagramX = cardX + 0.38;
        const diagramY = rowY + 0.98;
        const diagramW = cardW - 0.76;
        const cell = Math.min(0.34, diagramW / 5.2);
        const gridX = diagramX + (diagramW - cell * 5) / 2;
        for (let r = 0; r < 3; r += 1) {
          for (let c = 0; c < 5; c += 1) {
            slide.addShape(SH.rect, {
              x: gridX + c * cell,
              y: diagramY + r * cell,
              w: cell,
              h: cell,
              fill: { color: (r + c) % 2 === 0 ? TOKENS2.white : "E8EEF5" },
              line: { color: "D3DDE8", pt: 0.45 }
            });
          }
        }
        const midY = diagramY + cell * 1.5;
        drawPiece(slide, SH, gridX + cell * 0.5, midY, cell * 0.6, 1);
        const targetCol = move.path === "clone" ? 1 : 2;
        line(slide, SH, gridX + cell * 0.55, midY, gridX + cell * (targetCol + 0.5), midY, {
          color: move.accent,
          pt: 1.5
        });
        drawPiece(slide, SH, gridX + cell * (targetCol + 0.5), midY, cell * 0.6, 1);
        if (move.path === "jump") {
          slide.addShape(SH.rect, {
            x: gridX + cell * 0.12,
            y: midY - cell * 0.24,
            w: cell * 0.76,
            h: cell * 0.48,
            fill: { color: TOKENS2.white, transparency: 30 },
            line: { color: TOKENS2.guide, pt: 1, dash: "dash" }
          });
        }
        if (move.path === "infect") {
          drawPiece(slide, SH, gridX + cell * 3.5, diagramY + cell * 0.5, cell * 0.54, -1);
          drawPiece(slide, SH, gridX + cell * 3.5, diagramY + cell * 2.5, cell * 0.54, -1);
          line(slide, SH, gridX + cell * 2.7, midY, gridX + cell * 3.2, diagramY + cell * 0.66, {
            color: TOKENS2.red,
            pt: 1
          });
          line(slide, SH, gridX + cell * 2.7, midY, gridX + cell * 3.2, diagramY + cell * 2.34, {
            color: TOKENS2.red,
            pt: 1
          });
        }
        text(slide, move.body, {
          x: cardX + 0.34,
          y: rowY + cardH - 0.78,
          w: cardW - 0.58,
          h: 0.46,
          fontSize: opts.bodyFontSize || 8.9,
          color: TOKENS2.ink,
          valign: "mid"
        });
      });
    }
    function addMctsSearchPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const titleH = opts.title ? 0.68 : 0.08;
      const treeX = x + 0.26;
      const treeY = y + titleH + 0.22;
      const treeW = w * 0.62;
      const treeH = h - titleH - 0.34;
      const sideX = treeX + treeW + 0.28;
      const sideW = x + w - sideX - 0.22;
      const phases = opts.phases || [
        { title: "Seleccion", body: "baja por PUCT", accent: TOKENS2.navy },
        { title: "Expansion", body: "crea hijos legales", accent: TOKENS2.gold },
        { title: "Evaluacion", body: "policy + value", accent: TOKENS2.titleFill },
        { title: "Backprop", body: "actualiza visitas", accent: TOKENS2.red }
      ];
      const nodes = opts.nodes || [
        { id: "root", label: "estado actual", visits: "400", value: "+0.18", x: 0.5, y: 0.12, fill: TOKENS2.navy, color: TOKENS2.white },
        { id: "a", label: "A", visits: "184", value: "+0.31", x: 0.18, y: 0.48, fill: TOKENS2.success, color: TOKENS2.white, best: true },
        { id: "b", label: "B", visits: "132", value: "+0.12", x: 0.5, y: 0.48, fill: TOKENS2.gold, color: TOKENS2.navy },
        { id: "c", label: "C", visits: "84", value: "-0.08", x: 0.82, y: 0.48, fill: TOKENS2.paleRed, color: TOKENS2.navy },
        { id: "a1", label: "A1", visits: "71", value: "+0.24", x: 0.1, y: 0.82, fill: TOKENS2.softBlue, color: TOKENS2.navy },
        { id: "a2", label: "A2", visits: "113", value: "+0.37", x: 0.28, y: 0.82, fill: TOKENS2.successSoft, color: TOKENS2.navy, best: true },
        { id: "b1", label: "B1", visits: "76", value: "+0.05", x: 0.5, y: 0.82, fill: TOKENS2.warm, color: TOKENS2.navy },
        { id: "c1", label: "C1", visits: "49", value: "-0.14", x: 0.78, y: 0.82, fill: TOKENS2.white, color: TOKENS2.navy }
      ];
      const edges = opts.edges || [
        ["root", "a"],
        ["root", "b"],
        ["root", "c"],
        ["a", "a1"],
        ["a", "a2"],
        ["b", "b1"],
        ["c", "c1"]
      ];
      const byId = new Map(nodes.map((node) => [node.id, node]));
      surface(slide, SH, x, y, w, h, { fill: opts.fill || TOKENS2.white, line: opts.line || TOKENS2.border });
      if (opts.title) {
        panelTitle(slide, x + 0.24, y + 0.14, w - 0.48, opts.title, opts.subtitle, {
          titleFontSize: opts.titleFontSize || 13.8,
          subtitleFontSize: opts.subtitleFontSize || 8.8
        });
      }
      surface(slide, SH, treeX, treeY, treeW, treeH, { fill: "F7FAFD", line: "E1E8F0", rectRadius: 0.04 });
      edges.forEach(([from, to]) => {
        const a = byId.get(from);
        const b = byId.get(to);
        if (!a || !b) return;
        line(
          slide,
          SH,
          treeX + a.x * treeW,
          treeY + a.y * treeH + 0.14,
          treeX + b.x * treeW,
          treeY + b.y * treeH - 0.14,
          { color: b.best ? TOKENS2.success : TOKENS2.guide, pt: b.best ? 1.9 : 1.05, endArrowType: "none" }
        );
      });
      nodes.forEach((node) => {
        const nodeW = node.id === "root" ? 1.32 : 0.86;
        const nodeH = node.id === "root" ? 0.56 : 0.5;
        const nx = treeX + node.x * treeW - nodeW / 2;
        const ny = treeY + node.y * treeH - nodeH / 2;
        surface(slide, SH, nx, ny, nodeW, nodeH, {
          fill: node.fill,
          line: node.best ? TOKENS2.success : node.fill,
          linePt: node.best ? 2 : 1,
          rectRadius: 0.05
        });
        text(slide, node.label, {
          x: nx + 0.08,
          y: ny + 0.09,
          w: nodeW - 0.16,
          h: 0.12,
          fontFace: TYPOGRAPHY2.display,
          fontSize: node.id === "root" ? 8.8 : 8.2,
          bold: true,
          color: node.color,
          align: "center"
        });
        text(slide, `N=${node.visits}  V=${node.value}`, {
          x: nx + 0.08,
          y: ny + 0.29,
          w: nodeW - 0.16,
          h: 0.1,
          fontFace: TYPOGRAPHY2.mono || "Aptos Mono",
          fontSize: 6.8,
          bold: true,
          color: node.color,
          align: "center"
        });
      });
      phases.forEach((phase, index) => {
        const phY = treeY + index * ((treeH - 0.12) / phases.length);
        surface(slide, SH, sideX, phY, sideW, 0.68, {
          fill: index % 2 === 0 ? TOKENS2.softBlue : TOKENS2.warm,
          line: index % 2 === 0 ? TOKENS2.softBlue : TOKENS2.warm,
          rectRadius: 0.04
        });
        badge(slide, SH, sideX + 0.14, phY + 0.15, String(index + 1).padStart(2, "0"), {
          fill: phase.accent,
          w: 0.42,
          h: 0.26,
          fontSize: 7.2
        });
        text(slide, phase.title, {
          x: sideX + 0.68,
          y: phY + 0.12,
          w: sideW - 0.84,
          h: 0.18,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 10.8,
          bold: true,
          color: TOKENS2.navy
        });
        text(slide, phase.body, {
          x: sideX + 0.68,
          y: phY + 0.38,
          w: sideW - 0.84,
          h: 0.12,
          fontSize: 7.8,
          color: TOKENS2.slate
        });
      });
    }
    function addPolicyValueArchitecture2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const titleH = opts.title ? 0.68 : 0.08;
      const rowY = y + titleH + 0.28;
      const rowH = h - titleH - 0.46;
      const columns = opts.columns || [
        { title: "Observacion", body: "11 canales\n7 x 7 casillas", accent: TOKENS2.red, fill: TOKENS2.paleRed },
        { title: "Tokens", body: "49 casillas\n+ token CLS", accent: TOKENS2.gold, fill: TOKENS2.warm },
        { title: "Transformer", body: "6 capas\n8 cabezas", accent: TOKENS2.navy, fill: TOKENS2.softBlue }
      ];
      const gap = opts.gap || 0.18;
      const leftW = w * 0.62;
      const colW = (leftW - gap * (columns.length - 1)) / columns.length;
      const headX = x + leftW + 0.32;
      const headW = x + w - headX;
      surface(slide, SH, x, y, w, h, { fill: opts.fill || TOKENS2.white, line: opts.line || TOKENS2.border });
      if (opts.title) {
        panelTitle(slide, x + 0.24, y + 0.14, w - 0.48, opts.title, opts.subtitle, {
          titleFontSize: opts.titleFontSize || 13.8,
          subtitleFontSize: opts.subtitleFontSize || 8.8
        });
      }
      columns.forEach((col, index) => {
        const cx = x + 0.24 + index * (colW + gap);
        surface(slide, SH, cx, rowY, colW, rowH, { fill: col.fill, line: col.fill });
        accent(slide, SH, cx + 0.14, rowY + 0.16, rowH - 0.32, col.accent);
        text(slide, col.title, {
          x: cx + 0.34,
          y: rowY + 0.22,
          w: colW - 0.52,
          h: 0.26,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 13.2,
          bold: true,
          color: TOKENS2.navy
        });
        text(slide, col.body, {
          x: cx + 0.34,
          y: rowY + 0.72,
          w: colW - 0.52,
          h: 0.48,
          fontFace: TYPOGRAPHY2.mono || "Aptos Mono",
          fontSize: 9.2,
          bold: true,
          color: TOKENS2.ink
        });
        const iconY = rowY + 1.45;
        const iconW = colW - 0.72;
        if (index === 0) {
          for (let r = 0; r < 4; r += 1) {
            for (let c = 0; c < 4; c += 1) {
              slide.addShape(SH.rect, {
                x: cx + 0.36 + c * (iconW / 4),
                y: iconY + r * 0.22,
                w: iconW / 4 - 0.02,
                h: 0.19,
                fill: { color: (r + c) % 2 === 0 ? TOKENS2.white : "DDE8F4" },
                line: { color: "D3DDE8", pt: 0.35 }
              });
            }
          }
        } else if (index === 1) {
          for (let i = 0; i < 9; i += 1) {
            surface(slide, SH, cx + 0.36 + i % 3 * (iconW / 3), iconY + Math.floor(i / 3) * 0.27, iconW / 3 - 0.04, 0.21, {
              fill: i === 0 ? TOKENS2.navy : TOKENS2.white,
              line: i === 0 ? TOKENS2.navy : TOKENS2.border,
              rectRadius: 0.03
            });
          }
        } else {
          [0, 1, 2].forEach((layer) => {
            surface(slide, SH, cx + 0.4 + layer * 0.18, iconY + layer * 0.25, iconW - 0.36, 0.36, {
              fill: layer === 1 ? TOKENS2.white : "DDE8F4",
              line: TOKENS2.titleFill,
              rectRadius: 0.04
            });
          });
        }
        if (index < columns.length - 1) {
          line(slide, SH, cx + colW + 0.04, rowY + rowH / 2, cx + colW + gap - 0.04, rowY + rowH / 2, {
            color: TOKENS2.guide
          });
        }
      });
      line(slide, SH, x + 0.24 + leftW - 0.18, rowY + rowH / 2, headX - 0.1, rowY + rowH / 2, {
        color: TOKENS2.guide
      });
      const heads = opts.heads || [
        { title: "Policy head", value: "793 logits", body: "elige movimiento legal", accent: TOKENS2.red, fill: TOKENS2.paleRed },
        { title: "Value head", value: "[-1, +1]", body: "estima resultado", accent: TOKENS2.success, fill: TOKENS2.successSoft }
      ];
      heads.forEach((head, index) => {
        const headY = rowY + index * ((rowH - 0.16) / 2);
        surface(slide, SH, headX, headY, headW - 0.22, (rowH - 0.16) / 2, { fill: head.fill, line: head.fill });
        accent(slide, SH, headX + 0.14, headY + 0.16, (rowH - 0.16) / 2 - 0.32, head.accent);
        text(slide, head.title, {
          x: headX + 0.36,
          y: headY + 0.2,
          w: headW - 0.72,
          h: 0.22,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 13.5,
          bold: true,
          color: TOKENS2.navy
        });
        text(slide, head.value, {
          x: headX + 0.36,
          y: headY + 0.58,
          w: headW - 0.72,
          h: 0.22,
          fontFace: TYPOGRAPHY2.mono || "Aptos Mono",
          fontSize: 11.2,
          bold: true,
          color: head.accent
        });
        text(slide, head.body, {
          x: headX + 0.36,
          y: headY + 0.94,
          w: headW - 0.72,
          h: 0.24,
          fontSize: 8.6,
          color: TOKENS2.slate
        });
      });
    }
    function addSelfPlayLoopPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const titleH = opts.title ? 0.68 : 0.08;
      const cx = x + w / 2;
      const cy = y + titleH + (h - titleH) / 2 + 0.08;
      const rx = w * 0.34;
      const ry = (h - titleH) * 0.32;
      const steps = opts.steps || [
        { title: "Modelo actual", body: "checkpoint", accent: TOKENS2.navy, fill: TOKENS2.softBlue },
        { title: "Self-play", body: "partidas propias", accent: TOKENS2.red, fill: TOKENS2.paleRed },
        { title: "Replay buffer", body: "observacion + visitas + resultado", accent: TOKENS2.gold, fill: TOKENS2.warm },
        { title: "Entrenamiento", body: "policy loss + value loss", accent: TOKENS2.titleFill, fill: TOKENS2.mist },
        { title: "Evaluacion", body: "heuristicas + head-to-head", accent: TOKENS2.success, fill: TOKENS2.successSoft }
      ];
      surface(slide, SH, x, y, w, h, { fill: opts.fill || TOKENS2.white, line: opts.line || TOKENS2.border });
      if (opts.title) {
        panelTitle(slide, x + 0.24, y + 0.14, w - 0.48, opts.title, opts.subtitle, {
          titleFontSize: opts.titleFontSize || 13.8,
          subtitleFontSize: opts.subtitleFontSize || 8.8
        });
      }
      const positioned = steps.map((step, index) => {
        const angle = -Math.PI / 2 + index * 2 * Math.PI / steps.length;
        return {
          ...step,
          x: cx + Math.cos(angle) * rx,
          y: cy + Math.sin(angle) * ry
        };
      });
      const arrowMarkers = [
        { x: cx + rx * 0.54, y: cy - ry * 0.62, rotate: 42 },
        { x: cx + rx * 0.62, y: cy + ry * 0.5, rotate: 118 },
        { x: cx - rx * 0.18, y: cy + ry * 0.86, rotate: 192 },
        { x: cx - rx * 0.72, y: cy - ry * 0.05, rotate: 265 },
        { x: cx - rx * 0.18, y: cy - ry * 0.82, rotate: 330 }
      ];
      arrowMarkers.forEach((marker) => {
        slide.addShape(SH.triangle, {
          x: marker.x - 0.08,
          y: marker.y - 0.08,
          w: 0.16,
          h: 0.16,
          rotate: marker.rotate,
          fill: { color: TOKENS2.guide, transparency: 12 },
          line: { color: TOKENS2.guide, transparency: 100 }
        });
      });
      positioned.forEach((step, index) => {
        const cardW = index === 2 ? 2.1 : 1.78;
        const cardH = 0.72;
        surface(slide, SH, step.x - cardW / 2, step.y - cardH / 2, cardW, cardH, {
          fill: step.fill,
          line: step.fill,
          rectRadius: 0.05
        });
        badge(slide, SH, step.x - cardW / 2 + 0.12, step.y - cardH / 2 + 0.14, String(index + 1), {
          fill: step.accent,
          w: 0.3,
          h: 0.24,
          fontSize: 7
        });
        text(slide, step.title, {
          x: step.x - cardW / 2 + 0.52,
          y: step.y - cardH / 2 + 0.13,
          w: cardW - 0.66,
          h: 0.18,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 9.5,
          bold: true,
          color: TOKENS2.navy
        });
        text(slide, step.body, {
          x: step.x - cardW / 2 + 0.52,
          y: step.y - cardH / 2 + 0.4,
          w: cardW - 0.66,
          h: 0.12,
          fontSize: 7.3,
          color: TOKENS2.slate
        });
      });
      surface(slide, SH, cx - 1.35, cy - 0.45, 2.7, 0.9, {
        fill: opts.centerFill || TOKENS2.navy,
        line: opts.centerFill || TOKENS2.navy,
        rectRadius: 0.05
      });
      text(slide, opts.centerTitle || "mejorar sin copiar humanos", {
        x: cx - 1.15,
        y: cy - 0.25,
        w: 2.3,
        h: 0.18,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 11.4,
        bold: true,
        color: TOKENS2.white,
        align: "center"
      });
      text(slide, opts.centerBody || "la calidad depende de datos, rivales y evaluacion", {
        x: cx - 1.15,
        y: cy + 0.08,
        w: 2.3,
        h: 0.14,
        fontSize: 7.8,
        color: TOKENS2.terminalOutput,
        align: "center"
      });
    }
    function addModelGenerationTable2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const titleH = opts.title ? 0.68 : 0.08;
      const rows = opts.rows || [
        { name: "bogo", version: "v1", score: "0.17", lesson: "oscila piezas", state: "fallo", accent: TOKENS2.guide },
        { name: "reflejo", version: "v2", score: "0.29", lesson: "bias de desempate", state: "bug", accent: TOKENS2.gold },
        { name: "centinela", version: "v6", score: "0.81", lesson: "overfit a sentinel", state: "alerta", accent: TOKENS2.red },
        { name: "amnesia", version: "v7", score: "0.75", lesson: "bootstrap sin contexto", state: "regresion", accent: TOKENS2.titleFill },
        { name: "liga", version: "v8", score: "0.94", lesson: "league system", state: "campeon", accent: TOKENS2.success },
        { name: "espejismo", version: "v9", score: "0.69", lesson: "curriculum drift", state: "advertencia", accent: TOKENS2.red }
      ];
      const tableY = y + titleH + 0.14;
      const rowGap = 0.07;
      const headerH = 0.38;
      const rowH = Math.min(0.48, (h - titleH - 0.26 - headerH - rowGap * rows.length) / rows.length);
      const col = {
        name: w * 0.18,
        version: w * 0.1,
        score: w * 0.14,
        state: w * 0.2,
        lesson: w * 0.32
      };
      surface(slide, SH, x, y, w, h, { fill: opts.fill || TOKENS2.white, line: opts.line || TOKENS2.border });
      if (opts.title) {
        panelTitle(slide, x + 0.24, y + 0.14, w - 0.48, opts.title, opts.subtitle, {
          titleFontSize: opts.titleFontSize || 13.8,
          subtitleFontSize: opts.subtitleFontSize || 8.8
        });
      }
      surface(slide, SH, x + 0.22, tableY, w - 0.44, headerH, { fill: TOKENS2.navy, line: TOKENS2.navy, rectRadius: 0.04 });
      const headers = [
        ["generacion", col.name],
        ["ver.", col.version],
        ["rr", col.score],
        ["estado", col.state],
        ["leccion tecnica", col.lesson]
      ];
      let cursor = x + 0.36;
      headers.forEach(([label, width]) => {
        text(slide, label, {
          x: cursor,
          y: tableY + 0.12,
          w: width - 0.08,
          h: 0.1,
          fontSize: 7.6,
          bold: true,
          color: TOKENS2.white,
          align: label === "rr" ? "center" : "left"
        });
        cursor += width;
      });
      rows.slice(0, 8).forEach((row, index) => {
        const rowY = tableY + headerH + rowGap + index * (rowH + rowGap);
        surface(slide, SH, x + 0.22, rowY, w - 0.44, rowH, {
          fill: index % 2 === 0 ? "F7FAFD" : TOKENS2.softNeutral,
          line: index % 2 === 0 ? "F7FAFD" : TOKENS2.softNeutral,
          rectRadius: 0.035
        });
        accent(slide, SH, x + 0.34, rowY + 0.09, rowH - 0.18, row.accent, 0.08);
        let cx = x + 0.5;
        text(slide, row.name, {
          x: cx,
          y: rowY + rowH * 0.28,
          w: col.name - 0.14,
          h: 0.1,
          fontFace: TYPOGRAPHY2.mono || "Aptos Mono",
          fontSize: 8.6,
          bold: true,
          color: TOKENS2.navy
        });
        cx += col.name;
        text(slide, row.version, {
          x: cx,
          y: rowY + rowH * 0.28,
          w: col.version - 0.1,
          h: 0.1,
          fontSize: 8.4,
          bold: true,
          color: TOKENS2.slate
        });
        cx += col.version;
        text(slide, row.score, {
          x: cx,
          y: rowY + rowH * 0.25,
          w: col.score - 0.12,
          h: 0.12,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 9.4,
          bold: true,
          color: row.accent,
          align: "center"
        });
        cx += col.score;
        surface(slide, SH, cx + 0.02, rowY + rowH * 0.2, col.state - 0.22, rowH * 0.55, {
          fill: row.accent,
          line: row.accent,
          rectRadius: 0.04
        });
        text(slide, row.state, {
          x: cx + 0.08,
          y: rowY + rowH * 0.35,
          w: col.state - 0.34,
          h: 0.08,
          fontSize: 6.9,
          bold: true,
          color: row.accent === TOKENS2.gold || row.accent === TOKENS2.guide ? TOKENS2.navy : TOKENS2.white,
          align: "center"
        });
        cx += col.state;
        text(slide, row.lesson, {
          x: cx,
          y: rowY + rowH * 0.24,
          w: col.lesson - 0.18,
          h: 0.14,
          fontSize: 8,
          color: TOKENS2.ink
        });
      });
    }
    function addTournamentRulesPanel2(slide, SH, opts = {}) {
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const titleH = opts.title ? 0.72 : 0.08;
      const leftW = w * 0.46;
      const rightX = x + leftW + 0.28;
      const rightW = w - leftW - 0.28;
      const contentY = y + titleH + 0.12;
      const contentH = h - titleH - 0.22;
      const rules = opts.rules || [
        { label: "Formato", value: "2 rondas Bo3" },
        { label: "Modelo", value: "liga + 400 sims" },
        { label: "Puntaje", value: "V 1 / E 0.5 / D 0" },
        { label: "Ranking", value: "puntos, victorias, dif. piezas" }
      ];
      const bonuses = opts.bonuses || [
        { place: "1", value: "+1.0", fill: TOKENS2.success },
        { place: "2", value: "+0.5", fill: TOKENS2.gold },
        { place: "3", value: "+0.3", fill: TOKENS2.titleFill }
      ];
      surface(slide, SH, x, y, w, h, { fill: opts.fill || TOKENS2.white, line: opts.line || TOKENS2.border });
      if (opts.title) {
        panelTitle(slide, x + 0.24, y + 0.14, w - 0.48, opts.title, opts.subtitle, {
          titleFontSize: opts.titleFontSize || 13.8,
          subtitleFontSize: opts.subtitleFontSize || 8.8
        });
      }
      surface(slide, SH, x + 0.24, contentY, leftW - 0.24, contentH, {
        fill: TOKENS2.navy,
        line: TOKENS2.navy,
        rectRadius: 0.05
      });
      text(slide, opts.eventTitle || "Torneo Humanos vs IA", {
        x: x + 0.48,
        y: contentY + 0.28,
        w: leftW - 0.72,
        h: 0.44,
        fontFace: TYPOGRAPHY2.display,
        fontSize: 20,
        bold: true,
        color: TOKENS2.white,
        fit: "shrink"
      });
      text(slide, opts.eventBody || "La partida no es solo competencia: es una prueba publica del sistema, sus reglas y sus metricas.", {
        x: x + 0.48,
        y: contentY + 1.08,
        w: leftW - 0.72,
        h: 0.72,
        fontSize: 10.2,
        color: TOKENS2.terminalOutput,
        valign: "mid"
      });
      bonuses.forEach((bonus, index) => {
        const bx = x + 0.5 + index * ((leftW - 0.94) / 3);
        const bw = (leftW - 1.1) / 3;
        surface(slide, SH, bx, contentY + contentH - 0.92, bw, 0.56, {
          fill: bonus.fill,
          line: bonus.fill,
          rectRadius: 0.05
        });
        text(slide, `${bonus.place}. lugar`, {
          x: bx + 0.08,
          y: contentY + contentH - 0.78,
          w: bw - 0.16,
          h: 0.1,
          fontSize: 6.8,
          bold: true,
          color: bonus.fill === TOKENS2.gold ? TOKENS2.navy : TOKENS2.white,
          align: "center"
        });
        text(slide, bonus.value, {
          x: bx + 0.08,
          y: contentY + contentH - 0.58,
          w: bw - 0.16,
          h: 0.14,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 12,
          bold: true,
          color: bonus.fill === TOKENS2.gold ? TOKENS2.navy : TOKENS2.white,
          align: "center"
        });
      });
      rules.forEach((rule, index) => {
        const rh = Math.min(0.68, (contentH - 0.18) / rules.length - 0.08);
        const ry = contentY + 0.04 + index * (rh + 0.14);
        surface(slide, SH, rightX, ry, rightW - 0.24, rh, {
          fill: index % 2 === 0 ? TOKENS2.softBlue : TOKENS2.warm,
          line: index % 2 === 0 ? TOKENS2.softBlue : TOKENS2.warm,
          rectRadius: 0.04
        });
        badge(slide, SH, rightX + 0.16, ry + 0.18, String(index + 1).padStart(2, "0"), {
          fill: index === 0 ? TOKENS2.red : TOKENS2.navy,
          w: 0.42,
          h: 0.25,
          fontSize: 7.2
        });
        text(slide, rule.label, {
          x: rightX + 0.72,
          y: ry + 0.13,
          w: 1.24,
          h: 0.14,
          fontSize: 8,
          bold: true,
          color: TOKENS2.slate
        });
        text(slide, rule.value, {
          x: rightX + 2.08,
          y: ry + 0.12,
          w: rightW - 2.48,
          h: 0.16,
          fontFace: TYPOGRAPHY2.display,
          fontSize: 11.5,
          bold: true,
          color: TOKENS2.navy,
          align: "right"
        });
      });
    }
    module.exports = {
      addAtaxxBoardState: addAtaxxBoardState2,
      addMoveAnatomyPanel: addMoveAnatomyPanel2,
      addMctsSearchPanel: addMctsSearchPanel2,
      addPolicyValueArchitecture: addPolicyValueArchitecture2,
      addSelfPlayLoopPanel: addSelfPlayLoopPanel2,
      addModelGenerationTable: addModelGenerationTable2,
      addTournamentRulesPanel: addTournamentRulesPanel2
    };
  }
});

// utils/spacing.js
var require_spacing = __commonJS({
  "utils/spacing.js"(exports$1, module) {
    var SPACING2 = {
      xxs: 0.08,
      xs: 0.12,
      sm: 0.18,
      md: 0.24,
      lg: 0.32,
      xl: 0.48,
      xxl: 0.64
    };
    module.exports = {
      SPACING: SPACING2
    };
  }
});

// vendor/pptxgenjs_helpers/layout.js
var require_layout = __commonJS({
  "vendor/pptxgenjs_helpers/layout.js"(exports$1, module) {
    function inferElementType(obj) {
      if (!obj) return "unknown";
      const data = obj.data || obj.options || {};
      if (obj.type === "line") return "line";
      if (obj.type && typeof obj.type === "string") return obj.type;
      if (obj.text || typeof data.text === "string") return "text";
      if (data.path || obj.image) return "image";
      if (data.chartType) return "chart";
      if (data.shape || data.line) return "shape";
      if (data.mediaType) return "media";
      if (data.table || Array.isArray(data.rows)) return "table";
      if (data.smartArt) return "smartart";
      return "unknown";
    }
    var TEXT_OVERLAP_ERROR_THRESHOLD = 0.1;
    var RECTIFY_DIRECTION_EQUALITY_TOLERANCE = 0.15;
    function warnIfSlideHasOverlaps(slide, pptx, options = {}) {
      if (!slide || !Array.isArray(slide._slideObjects)) {
        console.warn("Invalid slide object passed to warnIfSlideOverlaps()");
        return;
      }
      const opts = {
        // By default, containment cases are very common (e.g., full-slide backgrounds)
        // and usually not actionable. Mute them unless explicitly requested.
        muteContainment: options.muteContainment !== void 0 ? options.muteContainment : true,
        // Do NOT ignore lines or decorative shapes by default; users want true overlaps.
        ignoreLines: options.ignoreLines !== void 0 ? options.ignoreLines : false,
        ignoreDecorativeShapes: options.ignoreDecorativeShapes !== void 0 ? options.ignoreDecorativeShapes : false
      };
      const slideIndex = pptx && Array.isArray(pptx._slides) ? pptx._slides.indexOf(slide) : -1;
      const slideLabel = slideIndex >= 0 ? `Slide ${slideIndex + 1}` : "(Unknown slide index)";
      const formatElement = (el) => {
        const cx = (el.x + el.w / 2).toFixed(3);
        const cy = (el.y + el.h / 2).toFixed(3);
        return `element ${el.index} (${el.type}, center_x=${cx}, center_y=${cy})`;
      };
      const elements = slide._slideObjects.map((obj, i) => {
        const {
          x = 0,
          y = 0,
          w = 0,
          h = 0,
          fill,
          line
        } = obj.data || obj.options || {};
        const type = inferElementType(obj);
        const isDecorative = (() => {
          if (!opts.ignoreDecorativeShapes) return false;
          const transparency = typeof fill?.transparency === "number" ? fill.transparency : null;
          const hasOnlyBorder = !!line && (!fill || transparency !== null);
          const fullyTransparent = transparency !== null && transparency >= 99;
          return type === "shape" && hasOnlyBorder && fullyTransparent;
        })();
        const ignorable = opts.ignoreLines && type === "line" || isDecorative;
        return { index: i, type, x, y, w, h, ignorable };
      });
      let overlapCount = 0;
      let containmentCount = 0;
      for (let i = 0; i < elements.length; i++) {
        const a = elements[i];
        if (a.ignorable) continue;
        for (let j = i + 1; j < elements.length; j++) {
          const b = elements[j];
          if (b.ignorable) continue;
          const comparison = compareElementPosition(slide, a.index, b.index);
          if (comparison.relation === "overlapping") {
            const EPS = 1e-6;
            const getBounds = (e) => ({
              x: e.x,
              y: e.y,
              x2: e.x + e.w,
              y2: e.y + e.h
            });
            const lineRectFalsePositive = (() => {
              const oneIsLine = a.type === "line" ^ b.type === "line";
              if (!oneIsLine) return false;
              const line = a.type === "line" ? a : b;
              const rect = a.type === "line" ? b : a;
              const isDiagonal = line.w > EPS && line.h > EPS;
              const lineSeg = {
                x1: line.x,
                y1: line.y,
                x2: line.x + line.w,
                y2: line.y + line.h
              };
              const rectB = getBounds(rect);
              const pointInRect = (px, py, rb) => px >= rb.x - EPS && px <= rb.x2 + EPS && py >= rb.y - EPS && py <= rb.y2 + EPS;
              const segsIntersect = (p1, p2, q1, q2) => {
                const cross = (ax, ay, bx, by) => ax * by - ay * bx;
                const d1x = p2.x - p1.x, d1y = p2.y - p1.y;
                const d2x = q2.x - q1.x, d2y = q2.y - q1.y;
                const denom = cross(d1x, d1y, d2x, d2y);
                if (Math.abs(denom) < EPS) {
                  const crossCol = cross(q1.x - p1.x, q1.y - p1.y, d1x, d1y);
                  if (Math.abs(crossCol) > EPS) return false;
                  const overlapX = !(Math.max(p1.x, p2.x) < Math.min(q1.x, q2.x) - EPS || Math.max(q1.x, q2.x) < Math.min(p1.x, p2.x) - EPS);
                  const overlapY = !(Math.max(p1.y, p2.y) < Math.min(q1.y, q2.y) - EPS || Math.max(q1.y, q2.y) < Math.min(p1.y, p2.y) - EPS);
                  return overlapX && overlapY;
                }
                const t = cross(q1.x - p1.x, q1.y - p1.y, d2x, d2y) / denom;
                const u = cross(q1.x - p1.x, q1.y - p1.y, d1x, d1y) / denom;
                return t >= -EPS && t <= 1 + EPS && u >= -EPS && u <= 1 + EPS;
              };
              const intersectsRect = (seg, rb) => {
                if (pointInRect(seg.x1, seg.y1, rb) || pointInRect(seg.x2, seg.y2, rb))
                  return true;
                const r1 = { x: rb.x, y: rb.y }, r2 = { x: rb.x2, y: rb.y }, r3 = { x: rb.x2, y: rb.y2 }, r4 = { x: rb.x, y: rb.y2 };
                const p1 = { x: seg.x1, y: seg.y1 }, p2 = { x: seg.x2, y: seg.y2 };
                return segsIntersect(p1, p2, r1, r2) || segsIntersect(p1, p2, r2, r3) || segsIntersect(p1, p2, r3, r4) || segsIntersect(p1, p2, r4, r1);
              };
              return isDiagonal && !intersectsRect(lineSeg, rectB);
            })();
            if (!lineRectFalsePositive) {
              overlapCount++;
              const severeTextOverlap = (() => {
                if (!comparison.intersection) return false;
                const exceedsThreshold = (element) => element.type === "text" && comparison.intersection.w >= TEXT_OVERLAP_ERROR_THRESHOLD && comparison.intersection.h >= TEXT_OVERLAP_ERROR_THRESHOLD;
                return exceedsThreshold(a) || exceedsThreshold(b);
              })();
              if (severeTextOverlap) {
                const overlapW = comparison.intersection.w;
                const overlapH = comparison.intersection.h;
                let rectificationSuggestion = "";
                if (overlapW > EPS && overlapH > EPS) {
                  const maxOverlap = Math.max(overlapW, overlapH);
                  const diffRatio = Math.abs(overlapW - overlapH) / maxOverlap;
                  const directions = [];
                  if (diffRatio <= RECTIFY_DIRECTION_EQUALITY_TOLERANCE) {
                    directions.push("horizontally", "vertically");
                  } else if (overlapW < overlapH) {
                    directions.push("horizontally");
                  } else {
                    directions.push("vertically");
                  }
                  rectificationSuggestion = `Suggestion: reposition elements ${directions.join(
                    " and "
                  )}.`;
                }
                console.error(
                  `\u274C ${slideLabel}: Severe text overlap detected between ${formatElement(
                    a
                  )} and ${formatElement(
                    b
                  )} (overlap_horizontal=${comparison.intersection.w.toFixed(
                    3
                  )}, overlap_vertical=${comparison.intersection.h.toFixed(
                    3
                  )}). THIS MUST BE FIXED. ${rectificationSuggestion}`
                );
              } else {
                console.warn(
                  `\u26A0\uFE0F ${slideLabel}: Overlap detected between ${formatElement(
                    a
                  )} and ${formatElement(b)}.`
                );
              }
            }
          } else if (comparison.relation === "contained") {
            if (!opts.muteContainment) {
              containmentCount++;
              const container = elements[comparison.containerIndex];
              const contained = elements[comparison.containedIndex];
              console.warn(
                `\u26A0\uFE0F ${slideLabel}: ${formatElement(
                  contained
                )} is fully contained within ${formatElement(container)}`
              );
            }
          }
        }
      }
      if (!(overlapCount === 0 && (!containmentCount || opts.muteContainment))) {
        const issues = [];
        if (overlapCount > 0) issues.push(`${overlapCount} overlapping pair(s)`);
        if (!opts.muteContainment && containmentCount > 0)
          issues.push(`${containmentCount} containment case(s)`);
        console.log(`\u26A0\uFE0F ${slideLabel}: Found ${issues.join(" and ")}.`);
      }
    }
    function compareElementPosition(slide, firstIndex, secondIndex) {
      if (!slide || !Array.isArray(slide._slideObjects)) {
        throw new Error("Invalid slide object passed to compareElementPosition()");
      }
      if (typeof firstIndex !== "number" || typeof secondIndex !== "number" || !Number.isInteger(firstIndex) || !Number.isInteger(secondIndex)) {
        throw new Error("Element indices must be integer values.");
      }
      const elements = slide._slideObjects;
      if (firstIndex < 0 || firstIndex >= elements.length || secondIndex < 0 || secondIndex >= elements.length) {
        throw new Error(
          "Element index out of bounds for compareElementPosition()."
        );
      }
      const EPS = 1e-4;
      const getBounds = (obj) => {
        const source = obj?.data || obj?.options || {};
        let x = typeof source.x === "number" ? source.x : 0;
        let y = typeof source.y === "number" ? source.y : 0;
        let w = typeof source.w === "number" ? source.w : 0;
        let h = typeof source.h === "number" ? source.h : 0;
        if (source.sizing && source.sizing.type === "crop") {
          if (typeof source.sizing.w === "number") w = source.sizing.w;
          if (typeof source.sizing.h === "number") h = source.sizing.h;
        }
        return { x, y, w, h, x2: x + w, y2: y + h };
      };
      const boundsA = getBounds(elements[firstIndex]);
      const boundsB = getBounds(elements[secondIndex]);
      const separated = boundsA.x2 < boundsB.x - EPS || boundsB.x2 < boundsA.x - EPS || boundsA.y2 < boundsB.y - EPS || boundsB.y2 < boundsA.y - EPS;
      if (separated) {
        return {
          relation: "disjoint",
          containerIndex: null,
          containedIndex: null,
          aBounds: boundsA,
          bBounds: boundsB,
          intersection: null
        };
      }
      const aContainsB = boundsA.x <= boundsB.x + EPS && boundsA.y <= boundsB.y + EPS && boundsA.x2 >= boundsB.x2 - EPS && boundsA.y2 >= boundsB.y2 - EPS;
      const bContainsA = boundsB.x <= boundsA.x + EPS && boundsB.y <= boundsA.y + EPS && boundsB.x2 >= boundsA.x2 - EPS && boundsB.y2 >= boundsA.y2 - EPS;
      const ix1 = Math.max(boundsA.x, boundsB.x);
      const iy1 = Math.max(boundsA.y, boundsB.y);
      const ix2 = Math.min(boundsA.x2, boundsB.x2);
      const iy2 = Math.min(boundsA.y2, boundsB.y2);
      const intersectionWidth = Math.max(0, ix2 - ix1);
      const intersectionHeight = Math.max(0, iy2 - iy1);
      const intersection = intersectionWidth > EPS && intersectionHeight > EPS ? { x: ix1, y: iy1, w: intersectionWidth, h: intersectionHeight } : null;
      if (aContainsB && !bContainsA) {
        return {
          relation: "contained",
          containerIndex: firstIndex,
          containedIndex: secondIndex,
          aBounds: boundsA,
          bBounds: boundsB,
          intersection
        };
      }
      if (bContainsA && !aContainsB) {
        return {
          relation: "contained",
          containerIndex: secondIndex,
          containedIndex: firstIndex,
          aBounds: boundsA,
          bBounds: boundsB,
          intersection
        };
      }
      if (intersection) {
        return {
          relation: "overlapping",
          containerIndex: null,
          containedIndex: null,
          aBounds: boundsA,
          bBounds: boundsB,
          intersection
        };
      }
      return {
        relation: "touching",
        containerIndex: null,
        containedIndex: null,
        aBounds: boundsA,
        bBounds: boundsB,
        intersection: null
      };
    }
    var VALID_ALIGNMENTS = /* @__PURE__ */ new Set([
      "left",
      "right",
      "top",
      "bottom",
      "verticallyCenter",
      "horizontallyCenter"
    ]);
    var getElementBounds = (obj) => {
      const source = obj?.data || obj?.options || {};
      let x = typeof source.x === "number" ? source.x : 0;
      let y = typeof source.y === "number" ? source.y : 0;
      let w = typeof source.w === "number" ? source.w : 0;
      let h = typeof source.h === "number" ? source.h : 0;
      if (source.sizing && source.sizing.type === "crop") {
        if (typeof source.sizing.w === "number") w = source.sizing.w;
        if (typeof source.sizing.h === "number") h = source.sizing.h;
      }
      return { x, y, w, h, x2: x + w, y2: y + h };
    };
    var setElementPosition = (obj, coords) => {
      const ensureTarget = (targetObj) => {
        if (!targetObj || typeof targetObj !== "object") return null;
        return targetObj;
      };
      const targets = [];
      const dataTarget = ensureTarget(obj.data);
      if (dataTarget) targets.push(dataTarget);
      const optionsTarget = obj.options && obj.options !== obj.data ? ensureTarget(obj.options) : null;
      if (optionsTarget) targets.push(optionsTarget);
      if (targets.length === 0) {
        obj.data = obj.data && typeof obj.data === "object" ? obj.data : {};
        targets.push(obj.data);
      }
      targets.forEach((target) => {
        if (coords.x !== void 0) target.x = coords.x;
        if (coords.y !== void 0) target.y = coords.y;
      });
    };
    var dimensionKeyPairs = [
      ["width", "height"],
      ["w", "h"],
      ["cx", "cy"],
      ["slideWidth", "slideHeight"],
      ["slideWidthInches", "slideHeightInches"],
      ["widthInches", "heightInches"]
    ];
    var toNumber = (value) => {
      if (typeof value === "number" && Number.isFinite(value)) return value;
      if (typeof value === "string") {
        const parsed = parseFloat(value);
        return Number.isFinite(parsed) ? parsed : null;
      }
      return null;
    };
    var readDimensionsFromObject = (candidate, seen = /* @__PURE__ */ new Set()) => {
      if (!candidate || typeof candidate !== "object") return null;
      if (seen.has(candidate)) return null;
      seen.add(candidate);
      for (const [wKey, hKey] of dimensionKeyPairs) {
        const width = toNumber(candidate[wKey]);
        const height = toNumber(candidate[hKey]);
        if (width !== null && height !== null && width > 0 && height > 0) {
          return { width, height };
        }
      }
      const nestedKeys = ["size", "slideSize", "layout", "slideLayout"];
      for (const key of nestedKeys) {
        const nested = readDimensionsFromObject(candidate[key], seen);
        if (nested) return nested;
      }
      return null;
    };
    var getSlideDimensions = (slide, pptx) => {
      const candidates = [
        slide?._presLayout,
        slide?._slideLayout,
        slide?._pres?.layout,
        slide?._parent?.layout,
        slide?._layout,
        pptx?._presLayout,
        pptx?._layout,
        pptx?.layout,
        pptx?.presLayout
      ];
      for (const candidate of candidates) {
        const dims = readDimensionsFromObject(candidate);
        if (dims) {
          const EMU_PER_IN = 914400;
          const looksEmu = dims.width > 1e3 || dims.height > 1e3;
          if (looksEmu) {
            return {
              width: dims.width / EMU_PER_IN,
              height: dims.height / EMU_PER_IN,
              source: "emu_converted"
            };
          }
          return { ...dims, source: "detected" };
        }
      }
      throw new Error(
        "getSlideDimensions(): Unable to determine slide dimensions from pptxgenjs internals."
      );
    };
    function alignSlideElements(slide, indices, alignment) {
      if (!slide || !Array.isArray(slide._slideObjects)) {
        throw new Error("Invalid slide object passed to alignSlideElements()");
      }
      if (!Array.isArray(indices) || indices.length === 0) {
        throw new Error("indices must be a non-empty array.");
      }
      if (!VALID_ALIGNMENTS.has(alignment)) {
        throw new Error(`Unsupported alignment option: ${alignment}`);
      }
      const uniqueIndices = [...new Set(indices)];
      const elements = slide._slideObjects;
      const selected = uniqueIndices.map((idx) => {
        if (typeof idx !== "number" || !Number.isInteger(idx)) {
          throw new Error("Element indices must be integers.");
        }
        if (idx < 0 || idx >= elements.length) {
          throw new Error("Element index out of bounds for alignSlideElements().");
        }
        const obj = elements[idx];
        const bounds = getElementBounds(obj);
        return { index: idx, obj, bounds };
      });
      if (selected.length < 2) return;
      const minX = Math.min(...selected.map((item) => item.bounds.x));
      const maxX2 = Math.max(...selected.map((item) => item.bounds.x2));
      const minY = Math.min(...selected.map((item) => item.bounds.y));
      const maxY2 = Math.max(...selected.map((item) => item.bounds.y2));
      const centerX = (minX + maxX2) / 2;
      const centerY = (minY + maxY2) / 2;
      selected.forEach(({ obj, bounds }) => {
        const { w, h } = bounds;
        switch (alignment) {
          case "left":
            setElementPosition(obj, { x: minX });
            break;
          case "right":
            setElementPosition(obj, { x: maxX2 - w });
            break;
          case "top":
            setElementPosition(obj, { y: minY });
            break;
          case "bottom":
            setElementPosition(obj, { y: maxY2 - h });
            break;
          case "horizontallyCenter":
            setElementPosition(obj, { x: centerX - w / 2 });
            break;
          case "verticallyCenter":
            setElementPosition(obj, { y: centerY - h / 2 });
            break;
          default:
            throw new Error(`Unhandled alignment option: ${alignment}`);
        }
      });
    }
    function distributeSlideElements(slide, indices, direction) {
      if (!slide || !Array.isArray(slide._slideObjects)) {
        throw new Error("Invalid slide object passed to distributeSlideElements()");
      }
      if (!Array.isArray(indices) || indices.length === 0) {
        throw new Error("indices must be a non-empty array.");
      }
      if (direction !== "horizontal" && direction !== "vertical") {
        throw new Error(`Unsupported distribution direction: ${direction}`);
      }
      const uniqueIndices = [...new Set(indices)];
      if (uniqueIndices.length < 2) return;
      const elements = slide._slideObjects;
      const selected = uniqueIndices.map((idx) => {
        if (typeof idx !== "number" || !Number.isInteger(idx)) {
          throw new Error("Element indices must be integers.");
        }
        if (idx < 0 || idx >= elements.length) {
          throw new Error(
            "Element index out of bounds for distributeSlideElements()."
          );
        }
        const obj = elements[idx];
        const bounds = getElementBounds(obj);
        return { index: idx, obj, bounds };
      });
      const axisStartKey = direction === "horizontal" ? "x" : "y";
      const axisEndKey = direction === "horizontal" ? "x2" : "y2";
      const sizeKey = direction === "horizontal" ? "w" : "h";
      selected.sort((a, b) => {
        const delta = a.bounds[axisStartKey] - b.bounds[axisStartKey];
        return Math.abs(delta) > 1e-6 ? delta : a.index - b.index;
      });
      const minCoord = Math.min(
        ...selected.map((item) => item.bounds[axisStartKey])
      );
      const maxCoord = Math.max(...selected.map((item) => item.bounds[axisEndKey]));
      const totalSpan = maxCoord - minCoord;
      const gaps = selected.length - 1;
      const totalSize = selected.reduce(
        (sum, item) => sum + item.bounds[sizeKey],
        0
      );
      const gapSize = gaps > 0 ? (totalSpan - totalSize) / gaps : 0;
      let cursor = minCoord;
      selected.forEach(({ obj, bounds }) => {
        if (direction === "horizontal") {
          setElementPosition(obj, { x: cursor });
          cursor += bounds.w + gapSize;
        } else {
          setElementPosition(obj, { y: cursor });
          cursor += bounds.h + gapSize;
        }
      });
    }
    function warnIfSlideElementsOutOfBounds(slide, pptx) {
      if (!slide || !Array.isArray(slide._slideObjects)) {
        console.warn(
          "Invalid slide object passed to warnIfSlideElementsOutOfBounds()"
        );
        return;
      }
      const {
        width: slideWidth,
        height: slideHeight,
        source
      } = getSlideDimensions(slide, pptx);
      const slideIndex = pptx && Array.isArray(pptx._slides) ? pptx._slides.indexOf(slide) : -1;
      const slideLabel = slideIndex >= 0 ? `Slide ${slideIndex + 1}` : "(Unknown slide index)";
      if (source === "default") {
        console.warn(
          `\u26A0\uFE0F ${slideLabel}: Unable to determine slide dimensions from pptxgenjs internals; assuming width=${slideWidth}, height=${slideHeight}.`
        );
      }
      const EPS = 1e-4;
      let outOfBoundsCount = 0;
      const formatElement = (idx, type, bounds) => {
        const cx = (bounds.x + bounds.w / 2).toFixed(3);
        const cy = (bounds.y + bounds.h / 2).toFixed(3);
        return `Element ${idx} (${type}, center_x=${cx}, center_y=${cy})`;
      };
      slide._slideObjects.forEach((obj, index) => {
        const bounds = getElementBounds(obj);
        const type = inferElementType(obj);
        const violations = [];
        if (bounds.x < -EPS) violations.push(`left=${bounds.x.toFixed(3)} < 0`);
        if (bounds.y < -EPS) violations.push(`top=${bounds.y.toFixed(3)} < 0`);
        if (bounds.x2 > slideWidth + EPS)
          violations.push(
            `right=${bounds.x2.toFixed(3)} > width=${slideWidth.toFixed(3)}`
          );
        if (bounds.y2 > slideHeight + EPS)
          violations.push(
            `bottom=${bounds.y2.toFixed(3)} > height=${slideHeight.toFixed(3)}`
          );
        if (violations.length > 0) {
          outOfBoundsCount++;
          console.warn(
            `\u26A0\uFE0F ${slideLabel}: ${formatElement(
              index,
              type,
              bounds
            )} exceeds slide bounds (${violations.join(", ")}).`
          );
        }
      });
      if (outOfBoundsCount > 0) {
        console.log(
          `\u26A0\uFE0F ${slideLabel}: Found ${outOfBoundsCount} element(s) extending beyond the slide bounds.`
        );
      }
    }
    module.exports = {
      inferElementType,
      compareElementPosition,
      warnIfSlideHasOverlaps,
      alignSlideElements,
      distributeSlideElements,
      warnIfSlideElementsOutOfBounds,
      getSlideDimensions
    };
  }
});

// utils/validation.js
var require_validation = __commonJS({
  "utils/validation.js"(exports$1, module) {
    var {
      warnIfSlideHasOverlaps,
      warnIfSlideElementsOutOfBounds
    } = require_layout();
    function validateSlide2(slide, pptx) {
      warnIfSlideHasOverlaps(slide, pptx, { muteContainment: true });
      warnIfSlideElementsOutOfBounds(slide, pptx);
    }
    module.exports = {
      validateSlide: validateSlide2
    };
  }
});

// src/theme/index.ts
var theme_exports = {};
__export(theme_exports, {
  TOKENS: () => TOKENS,
  TYPOGRAPHY: () => TYPOGRAPHY,
  applyAiepTheme: () => applyAiepTheme
});
var jsTheme = __toESM(require_theme());
var themeModule = jsTheme;
var TOKENS = themeModule.TOKENS;
var TYPOGRAPHY = themeModule.TYPOGRAPHY;
function applyAiepTheme(pptx, meta = {}) {
  return themeModule.applyAiepTheme(pptx, meta);
}

// src/components/index.ts
var components_exports = {};
__export(components_exports, {
  addAccessibilityChecklistPanel: () => addAccessibilityChecklistPanel,
  addActorLane: () => addActorLane,
  addAgentOrchestrationDiagram: () => addAgentOrchestrationDiagram,
  addAgentReasoningLoop: () => addAgentReasoningLoop,
  addAgenticFlow: () => addAgenticFlow,
  addAtaxxBoardState: () => addAtaxxBoardState,
  addAuditEvidenceBoard: () => addAuditEvidenceBoard,
  addAuditScorePanel: () => addAuditScorePanel,
  addAuthFlow: () => addAuthFlow,
  addBoxModelDiagram: () => addBoxModelDiagram,
  addBreakpointDecisionPanel: () => addBreakpointDecisionPanel,
  addBrowserMock: () => addBrowserMock,
  addCard: () => addCard,
  addCascadeInspector: () => addCascadeInspector,
  addCenterStatement: () => addCenterStatement,
  addChecklistGrid: () => addChecklistGrid,
  addChip: () => addChip,
  addCodeAnnotation: () => addCodeAnnotation,
  addCodePanel: () => addCodePanel,
  addComponentConsistencyPanel: () => addComponentConsistencyPanel,
  addComponentTree: () => addComponentTree,
  addComponentVariantBoard: () => addComponentVariantBoard,
  addControlFlowPanel: () => addControlFlowPanel,
  addCssRuleStack: () => addCssRuleStack,
  addDataTypesBoard: () => addDataTypesBoard,
  addDebugEvidenceBoard: () => addDebugEvidenceBoard,
  addDecisionPipelinePanel: () => addDecisionPipelinePanel,
  addDelegationSplit: () => addDelegationSplit,
  addDomMutationFlow: () => addDomMutationFlow,
  addDomTreePanel: () => addDomTreePanel,
  addEntityRelationshipBlueprint: () => addEntityRelationshipBlueprint,
  addErRelationship: () => addErRelationship,
  addEvaluationRubricPanel: () => addEvaluationRubricPanel,
  addEventLoopDiagram: () => addEventLoopDiagram,
  addEventReactionPanel: () => addEventReactionPanel,
  addExposureCompare: () => addExposureCompare,
  addFlexGridLayout: () => addFlexGridLayout,
  addFormMock: () => addFormMock,
  addFrameworkDecisionMatrix: () => addFrameworkDecisionMatrix,
  addHeader: () => addHeader,
  addIntelTimelinePanel: () => addIntelTimelinePanel,
  addIssuePriorityMatrix: () => addIssuePriorityMatrix,
  addJoinSetDiagram: () => addJoinSetDiagram,
  addJsonPanel: () => addJsonPanel,
  addLayerStack: () => addLayerStack,
  addLighthouseAuditCard: () => addLighthouseAuditCard,
  addMarkBox: () => addMarkBox,
  addMcpBridgePanel: () => addMcpBridgePanel,
  addMctsSearchPanel: () => addMctsSearchPanel,
  addMiniCard: () => addMiniCard,
  addModelGenerationTable: () => addModelGenerationTable,
  addMoveAnatomyPanel: () => addMoveAnatomyPanel,
  addMythRealityGrid: () => addMythRealityGrid,
  addNetworkLoadBoard: () => addNetworkLoadBoard,
  addNormalizationStepper: () => addNormalizationStepper,
  addPerformanceMetricsBoard: () => addPerformanceMetricsBoard,
  addPill: () => addPill,
  addPolicyValueArchitecture: () => addPolicyValueArchitecture,
  addPowerNetworkMap: () => addPowerNetworkMap,
  addProjectWorkflowPanel: () => addProjectWorkflowPanel,
  addPromptQualityCompare: () => addPromptQualityCompare,
  addQualityDimensionsPanel: () => addQualityDimensionsPanel,
  addRequestResponseFlow: () => addRequestResponseFlow,
  addResponsiveReflowPanel: () => addResponsiveReflowPanel,
  addResponsiveViewportCompare: () => addResponsiveViewportCompare,
  addRestResource: () => addRestResource,
  addScoreBoostsAndPenalties: () => addScoreBoostsAndPenalties,
  addSelfPlayLoopPanel: () => addSelfPlayLoopPanel,
  addSeoSnippetPreview: () => addSeoSnippetPreview,
  addServerCycle: () => addServerCycle,
  addSlideNumber: () => addSlideNumber,
  addSpecWorkflow: () => addSpecWorkflow,
  addSpecificityScale: () => addSpecificityScale,
  addSpreadsheetProblemPanel: () => addSpreadsheetProblemPanel,
  addSqlBridgePanel: () => addSqlBridgePanel,
  addStageChain: () => addStageChain,
  addStaticVsInteractiveCompare: () => addStaticVsInteractiveCompare,
  addSupabaseProjectSetupPanel: () => addSupabaseProjectSetupPanel,
  addSupabaseTableEditorPanel: () => addSupabaseTableEditorPanel,
  addSyntaxCompare: () => addSyntaxCompare,
  addTableSchema: () => addTableSchema,
  addTerminalPanel: () => addTerminalPanel,
  addTokenBoard: () => addTokenBoard,
  addToolExecutionConsole: () => addToolExecutionConsole,
  addTopRule: () => addTopRule,
  addTournamentRulesPanel: () => addTournamentRulesPanel,
  addUrlBreakdown: () => addUrlBreakdown,
  addValidationLayerRadar: () => addValidationLayerRadar,
  setBackground: () => setBackground
});
var primitivesJs = __toESM(require_primitives());
var codePanelJs = __toESM(require_code_panel());
var terminalPanelJs = __toESM(require_terminal_panel());
var browserMockJs = __toESM(require_browser_mock());
var formMockJs = __toESM(require_form_mock());
var domTreeJs = __toESM(require_dom_tree());
var frontendPanelsJs = __toESM(require_frontend_panels());
var foundationPanelsJs = __toESM(require_foundation_panels());
var securityPanelsJs = __toESM(require_security_panels());
var appPanelsJs = __toESM(require_app_panels());
var agenticPanelsJs = __toESM(require_agentic_panels());
var asyncPanelsJs = __toESM(require_async_panels());
var backendPanelsJs = __toESM(require_backend_panels());
var gameAiPanelsJs = __toESM(require_game_ai_panels());
var primitives = primitivesJs;
var codePanel = codePanelJs;
var terminalPanel = terminalPanelJs;
var browserMock = browserMockJs;
var formMock = formMockJs;
var domTree = domTreeJs;
var frontendPanels = frontendPanelsJs;
var foundationPanels = foundationPanelsJs;
var securityPanels = securityPanelsJs;
var appPanels = appPanelsJs;
var agenticPanels = agenticPanelsJs;
var asyncPanels = asyncPanelsJs;
var backendPanels = backendPanelsJs;
var gameAiPanels = gameAiPanelsJs;
var setBackground = primitives.setBackground;
var addTopRule = primitives.addTopRule;
var addSlideNumber = primitives.addSlideNumber;
var addMarkBox = primitives.addMarkBox;
var addChip = primitives.addChip;
var addPill = primitives.addPill;
var addCard = primitives.addCard;
var addMiniCard = primitives.addMiniCard;
var addCenterStatement = primitives.addCenterStatement;
var addHeader = primitives.addHeader;
var addCodePanel = codePanel.addCodePanel;
var addCodeAnnotation = codePanel.addCodeAnnotation;
var addTerminalPanel = terminalPanel.addTerminalPanel;
var addBrowserMock = browserMock.addBrowserMock;
var addFormMock = formMock.addFormMock;
var addDomTreePanel = domTree.addDomTreePanel;
var addResponsiveViewportCompare = frontendPanels.addResponsiveViewportCompare;
var addResponsiveReflowPanel = frontendPanels.addResponsiveReflowPanel;
var addBreakpointDecisionPanel = frontendPanels.addBreakpointDecisionPanel;
var addComponentVariantBoard = frontendPanels.addComponentVariantBoard;
var addQualityDimensionsPanel = frontendPanels.addQualityDimensionsPanel;
var addAuditEvidenceBoard = frontendPanels.addAuditEvidenceBoard;
var addSeoSnippetPreview = frontendPanels.addSeoSnippetPreview;
var addComponentConsistencyPanel = frontendPanels.addComponentConsistencyPanel;
var addCssRuleStack = frontendPanels.addCssRuleStack;
var addCascadeInspector = frontendPanels.addCascadeInspector;
var addSpecificityScale = frontendPanels.addSpecificityScale;
var addTokenBoard = frontendPanels.addTokenBoard;
var addFrameworkDecisionMatrix = frontendPanels.addFrameworkDecisionMatrix;
var addBoxModelDiagram = frontendPanels.addBoxModelDiagram;
var addFlexGridLayout = frontendPanels.addFlexGridLayout;
var addLighthouseAuditCard = frontendPanels.addLighthouseAuditCard;
var addPerformanceMetricsBoard = frontendPanels.addPerformanceMetricsBoard;
var addNetworkLoadBoard = frontendPanels.addNetworkLoadBoard;
var addAuditScorePanel = frontendPanels.addAuditScorePanel;
var addAccessibilityChecklistPanel = frontendPanels.addAccessibilityChecklistPanel;
var addIssuePriorityMatrix = frontendPanels.addIssuePriorityMatrix;
var addEvaluationRubricPanel = frontendPanels.addEvaluationRubricPanel;
var addScoreBoostsAndPenalties = frontendPanels.addScoreBoostsAndPenalties;
var addProjectWorkflowPanel = frontendPanels.addProjectWorkflowPanel;
var addPromptQualityCompare = frontendPanels.addPromptQualityCompare;
var addSpreadsheetProblemPanel = frontendPanels.addSpreadsheetProblemPanel;
var addEntityRelationshipBlueprint = frontendPanels.addEntityRelationshipBlueprint;
var addNormalizationStepper = frontendPanels.addNormalizationStepper;
var addSqlBridgePanel = frontendPanels.addSqlBridgePanel;
var addStaticVsInteractiveCompare = frontendPanels.addStaticVsInteractiveCompare;
var addDataTypesBoard = frontendPanels.addDataTypesBoard;
var addControlFlowPanel = frontendPanels.addControlFlowPanel;
var addEventReactionPanel = frontendPanels.addEventReactionPanel;
var addDomMutationFlow = frontendPanels.addDomMutationFlow;
var addDebugEvidenceBoard = frontendPanels.addDebugEvidenceBoard;
var addUrlBreakdown = foundationPanels.addUrlBreakdown;
var addMythRealityGrid = foundationPanels.addMythRealityGrid;
var addActorLane = foundationPanels.addActorLane;
var addStageChain = foundationPanels.addStageChain;
var addIntelTimelinePanel = foundationPanels.addIntelTimelinePanel;
var addDecisionPipelinePanel = foundationPanels.addDecisionPipelinePanel;
var addPowerNetworkMap = foundationPanels.addPowerNetworkMap;
var addExposureCompare = securityPanels.addExposureCompare;
var addChecklistGrid = securityPanels.addChecklistGrid;
var addAuthFlow = securityPanels.addAuthFlow;
var addJsonPanel = appPanels.addJsonPanel;
var addRequestResponseFlow = appPanels.addRequestResponseFlow;
var addComponentTree = appPanels.addComponentTree;
var addAgenticFlow = agenticPanels.addAgenticFlow;
var addSpecWorkflow = agenticPanels.addSpecWorkflow;
var addDelegationSplit = agenticPanels.addDelegationSplit;
var addAgentOrchestrationDiagram = agenticPanels.addAgentOrchestrationDiagram;
var addMcpBridgePanel = agenticPanels.addMcpBridgePanel;
var addToolExecutionConsole = agenticPanels.addToolExecutionConsole;
var addValidationLayerRadar = agenticPanels.addValidationLayerRadar;
var addAgentReasoningLoop = agenticPanels.addAgentReasoningLoop;
var addEventLoopDiagram = asyncPanels.addEventLoopDiagram;
var addSyntaxCompare = asyncPanels.addSyntaxCompare;
var addServerCycle = backendPanels.addServerCycle;
var addRestResource = backendPanels.addRestResource;
var addLayerStack = backendPanels.addLayerStack;
var addTableSchema = backendPanels.addTableSchema;
var addJoinSetDiagram = backendPanels.addJoinSetDiagram;
var addErRelationship = backendPanels.addErRelationship;
var addSupabaseProjectSetupPanel = backendPanels.addSupabaseProjectSetupPanel;
var addSupabaseTableEditorPanel = backendPanels.addSupabaseTableEditorPanel;
var addAtaxxBoardState = gameAiPanels.addAtaxxBoardState;
var addMoveAnatomyPanel = gameAiPanels.addMoveAnatomyPanel;
var addMctsSearchPanel = gameAiPanels.addMctsSearchPanel;
var addPolicyValueArchitecture = gameAiPanels.addPolicyValueArchitecture;
var addSelfPlayLoopPanel = gameAiPanels.addSelfPlayLoopPanel;
var addModelGenerationTable = gameAiPanels.addModelGenerationTable;
var addTournamentRulesPanel = gameAiPanels.addTournamentRulesPanel;

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  SPACING: () => SPACING,
  buildThemeMap: () => buildThemeMap,
  containsMojibake: () => containsMojibake,
  findMojibakeMatches: () => findMojibakeMatches,
  makeCodeLineRuns: () => makeCodeLineRuns,
  makeCodeLines: () => makeCodeLines,
  makeCodeRuns: () => makeCodeRuns,
  makeCodeSvgData: () => makeCodeSvgData,
  makeCodeText: () => makeCodeText,
  suspiciousMojibakePatterns: () => suspiciousMojibakePatterns,
  validateSlide: () => validateSlide
});
var spacingJs = __toESM(require_spacing());
var validationJs = __toESM(require_validation());
var codeJs = __toESM(require_code());

// src/utils/text-quality.ts
var suspiciousMojibakePatterns = [
  "\xC3",
  "\xC2",
  "\xE2\u20AC",
  "\xE2\u20AC\u201D",
  "\xE2\u20AC\u201C",
  "\xE2\u20AC\u0153",
  "\xE2\u20AC\x9D",
  "\xE2\u20AC\u2122"
];
function findMojibakeMatches(input) {
  const text = String(input ?? "");
  const matches = suspiciousMojibakePatterns.filter((pattern) => text.includes(pattern));
  return [...new Set(matches)];
}
function containsMojibake(input) {
  return findMojibakeMatches(input).length > 0;
}

// src/utils/index.ts
var spacing = spacingJs;
var validation = validationJs;
var code = codeJs;
var SPACING = spacing.SPACING;
var validateSlide = validation.validateSlide;
var makeCodeRuns = code.makeCodeRuns;
var makeCodeText = code.makeCodeText;
var makeCodeLines = code.makeCodeLines;
var makeCodeLineRuns = code.makeCodeLineRuns;
var makeCodeSvgData = code.makeCodeSvgData;
var buildThemeMap = code.buildThemeMap;

// src/adapters/recording-slide.ts
var RecordingSlide = class {
  constructor() {
    this.shapes = [];
    this.texts = [];
    this.images = [];
  }
  addShape(shapeType, options) {
    const entry = {
      kind: "shape",
      shapeType,
      options: { ...options }
    };
    this.shapes.push(entry);
    return entry;
  }
  addText(text, options = {}) {
    const entry = {
      kind: "text",
      text,
      options: { ...options }
    };
    this.texts.push(entry);
    return entry;
  }
  addImage(options) {
    const entry = {
      kind: "image",
      options: { ...options }
    };
    this.images.push(entry);
    return entry;
  }
  getEntries() {
    return [...this.shapes, ...this.texts, ...this.images];
  }
};
function getEntryBounds(entry) {
  const rawX = Number(entry.options.x ?? 0);
  const rawY = Number(entry.options.y ?? 0);
  const rawW = Number(entry.options.w ?? 0);
  const rawH = Number(entry.options.h ?? 0);
  return {
    x: Math.min(rawX, rawX + rawW),
    y: Math.min(rawY, rawY + rawH),
    w: Math.abs(rawW),
    h: Math.abs(rawH)
  };
}
function isBoxWithin(inner, outer, tolerance = 1e-3) {
  return inner.x >= outer.x - tolerance && inner.y >= outer.y - tolerance && inner.x + inner.w <= outer.x + outer.w + tolerance && inner.y + inner.h <= outer.y + outer.h + tolerance;
}
function boxesIntersect(a, b, tolerance = 1e-3) {
  return !(a.x + a.w <= b.x + tolerance || b.x + b.w <= a.x + tolerance || a.y + a.h <= b.y + tolerance || b.y + b.h <= a.y + tolerance);
}

exports.RecordingSlide = RecordingSlide;
exports.SPACING = SPACING;
exports.TOKENS = TOKENS;
exports.TYPOGRAPHY = TYPOGRAPHY;
exports.addAccessibilityChecklistPanel = addAccessibilityChecklistPanel;
exports.addActorLane = addActorLane;
exports.addAgentOrchestrationDiagram = addAgentOrchestrationDiagram;
exports.addAgentReasoningLoop = addAgentReasoningLoop;
exports.addAgenticFlow = addAgenticFlow;
exports.addAtaxxBoardState = addAtaxxBoardState;
exports.addAuditEvidenceBoard = addAuditEvidenceBoard;
exports.addAuditScorePanel = addAuditScorePanel;
exports.addAuthFlow = addAuthFlow;
exports.addBoxModelDiagram = addBoxModelDiagram;
exports.addBreakpointDecisionPanel = addBreakpointDecisionPanel;
exports.addBrowserMock = addBrowserMock;
exports.addCard = addCard;
exports.addCascadeInspector = addCascadeInspector;
exports.addCenterStatement = addCenterStatement;
exports.addChecklistGrid = addChecklistGrid;
exports.addChip = addChip;
exports.addCodeAnnotation = addCodeAnnotation;
exports.addCodePanel = addCodePanel;
exports.addComponentConsistencyPanel = addComponentConsistencyPanel;
exports.addComponentTree = addComponentTree;
exports.addComponentVariantBoard = addComponentVariantBoard;
exports.addControlFlowPanel = addControlFlowPanel;
exports.addCssRuleStack = addCssRuleStack;
exports.addDataTypesBoard = addDataTypesBoard;
exports.addDebugEvidenceBoard = addDebugEvidenceBoard;
exports.addDecisionPipelinePanel = addDecisionPipelinePanel;
exports.addDelegationSplit = addDelegationSplit;
exports.addDomMutationFlow = addDomMutationFlow;
exports.addDomTreePanel = addDomTreePanel;
exports.addEntityRelationshipBlueprint = addEntityRelationshipBlueprint;
exports.addErRelationship = addErRelationship;
exports.addEvaluationRubricPanel = addEvaluationRubricPanel;
exports.addEventLoopDiagram = addEventLoopDiagram;
exports.addEventReactionPanel = addEventReactionPanel;
exports.addExposureCompare = addExposureCompare;
exports.addFlexGridLayout = addFlexGridLayout;
exports.addFormMock = addFormMock;
exports.addFrameworkDecisionMatrix = addFrameworkDecisionMatrix;
exports.addHeader = addHeader;
exports.addIntelTimelinePanel = addIntelTimelinePanel;
exports.addIssuePriorityMatrix = addIssuePriorityMatrix;
exports.addJoinSetDiagram = addJoinSetDiagram;
exports.addJsonPanel = addJsonPanel;
exports.addLayerStack = addLayerStack;
exports.addLighthouseAuditCard = addLighthouseAuditCard;
exports.addMarkBox = addMarkBox;
exports.addMcpBridgePanel = addMcpBridgePanel;
exports.addMctsSearchPanel = addMctsSearchPanel;
exports.addMiniCard = addMiniCard;
exports.addModelGenerationTable = addModelGenerationTable;
exports.addMoveAnatomyPanel = addMoveAnatomyPanel;
exports.addMythRealityGrid = addMythRealityGrid;
exports.addNetworkLoadBoard = addNetworkLoadBoard;
exports.addNormalizationStepper = addNormalizationStepper;
exports.addPerformanceMetricsBoard = addPerformanceMetricsBoard;
exports.addPill = addPill;
exports.addPolicyValueArchitecture = addPolicyValueArchitecture;
exports.addPowerNetworkMap = addPowerNetworkMap;
exports.addProjectWorkflowPanel = addProjectWorkflowPanel;
exports.addPromptQualityCompare = addPromptQualityCompare;
exports.addQualityDimensionsPanel = addQualityDimensionsPanel;
exports.addRequestResponseFlow = addRequestResponseFlow;
exports.addResponsiveReflowPanel = addResponsiveReflowPanel;
exports.addResponsiveViewportCompare = addResponsiveViewportCompare;
exports.addRestResource = addRestResource;
exports.addScoreBoostsAndPenalties = addScoreBoostsAndPenalties;
exports.addSelfPlayLoopPanel = addSelfPlayLoopPanel;
exports.addSeoSnippetPreview = addSeoSnippetPreview;
exports.addServerCycle = addServerCycle;
exports.addSlideNumber = addSlideNumber;
exports.addSpecWorkflow = addSpecWorkflow;
exports.addSpecificityScale = addSpecificityScale;
exports.addSpreadsheetProblemPanel = addSpreadsheetProblemPanel;
exports.addSqlBridgePanel = addSqlBridgePanel;
exports.addStageChain = addStageChain;
exports.addStaticVsInteractiveCompare = addStaticVsInteractiveCompare;
exports.addSupabaseProjectSetupPanel = addSupabaseProjectSetupPanel;
exports.addSupabaseTableEditorPanel = addSupabaseTableEditorPanel;
exports.addSyntaxCompare = addSyntaxCompare;
exports.addTableSchema = addTableSchema;
exports.addTerminalPanel = addTerminalPanel;
exports.addTokenBoard = addTokenBoard;
exports.addToolExecutionConsole = addToolExecutionConsole;
exports.addTopRule = addTopRule;
exports.addTournamentRulesPanel = addTournamentRulesPanel;
exports.addUrlBreakdown = addUrlBreakdown;
exports.addValidationLayerRadar = addValidationLayerRadar;
exports.applyAiepTheme = applyAiepTheme;
exports.boxesIntersect = boxesIntersect;
exports.buildThemeMap = buildThemeMap;
exports.components = components_exports;
exports.containsMojibake = containsMojibake;
exports.findMojibakeMatches = findMojibakeMatches;
exports.getEntryBounds = getEntryBounds;
exports.isBoxWithin = isBoxWithin;
exports.makeCodeLineRuns = makeCodeLineRuns;
exports.makeCodeLines = makeCodeLines;
exports.makeCodeRuns = makeCodeRuns;
exports.makeCodeSvgData = makeCodeSvgData;
exports.makeCodeText = makeCodeText;
exports.setBackground = setBackground;
exports.suspiciousMojibakePatterns = suspiciousMojibakePatterns;
exports.theme = theme_exports;
exports.utils = utils_exports;
exports.validateSlide = validateSlide;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map