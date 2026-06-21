# Kit de 45 sensores — Manual de identificación

Documento de referencia para **identificar físicamente** cada módulo del "Kit de 45
sensores compatibles con Arduino" (caja GALF) que llegó sin manual. Una ficha por módulo
con: nombre, **etiqueta serigrafiada en la placa** (ej. `KY-018`), qué hace, voltaje y tipo
de señal, cómo reconocerlo a simple vista, pinout, foto real incrustada y enlace a más fotos.
Los módulos útiles para el prototipo GeoGreen llevan el badge **GeoGreen**.

## Archivos

- `kit-45-sensores-identificacion.tex` — fuente LaTeX (motor XeTeX / `tectonic`).
- `kit-45-sensores-identificacion.pdf` — PDF final (10 páginas, 45 fichas).
- `assets/` — fotos de cada módulo (`ky-001.jpg` … `ky-040.jpg`, más `hc-sr04.jpg`,
  `mpu6050.jpg`, `ds1302.jpg`, `sd-reader.jpg`, `mb-102.jpg`, `mp1584en.jpg`,
  `soil-moisture.jpg`, `water-level.jpg`).

## Recompilar

```bash
tectonic kit-45-sensores-identificacion.tex
```

Cada ficha usa la macro `\ficha`. Si falta una imagen en `assets/`, la ficha muestra un
recuadro "foto: ver enlace" en su lugar (el documento compila igual).

## Origen de las fotos

- Módulos KY-001 … KY-037: [arduinomodules.info](https://arduinomodules.info) (imagen destacada de cada página).
- KY-038, KY-039, KY-040, HC-SR04, DS1302: [espboards.dev](https://www.espboards.dev) (convertidas de WebP a JPG).
- MPU-6050, lector microSD, MB-102, MP1584EN, humedad de suelo: [components101.com](https://components101.com).
- Nivel de agua: [lastminuteengineers.com](https://lastminuteengineers.com).

Son fotos de referencia de terceros, solo para identificación interna del kit.
