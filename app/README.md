# GeoGreen — App de monitoreo

PWA que **visualiza** la telemetría de los contenedores GeoGreen: cierra la cadena
del proyecto **sensar → enviar → visualizar → alertar**. Cada dispositivo mide el
nivel de llenado de un contenedor y lo envía por internet; esta app lo muestra
georreferenciado en un mapa real de Osorno, con su batería, señal y alertas.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** con design system propio (paleta institucional AIEP, ver
  `tailwind.config.js` — espejo de `../tools/slides-system/theme/tokens.js`)
- **react-leaflet** + tiles CARTO Positron (OpenStreetMap, sin API key)
- **Recharts** (gráfico histórico) · **lucide-react** (iconos)
- **@tanstack/react-query** (refresco "en vivo")
- **vite-plugin-pwa** (instalable, offline)

## Comandos

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + bundle de producción (genera el service worker)
npm run preview    # sirve el build (para probar la PWA instalable)
node scripts/generate-icons.mjs   # regenera los iconos PWA desde la marca GeoGreen
```

## Pantallas

- **Mapa** (`/`) — contenedores georreferenciados, pin con color de semáforo,
  batería y señal; KPIs que filtran; detalle en panel lateral.
- **Alertas** (`/alertas`) — lleno / batería baja / sin señal, enlazadas al detalle.
- **Detalle** (panel) — gauge de llenado, histórico 24 h, batería, señal, última lectura.

## Fuente de telemetría

`src/lib/telemetry.ts` utiliza actualmente un generador determinista de lecturas
para representar una flota de aproximadamente 12 contenedores en Osorno. La
fuente está aislada detrás de la interfaz `TelemetryService`, por lo que una
integración de red con UNO R4 WiFi, ESP32 o un backend puede reemplazarla sin
reescribir las pantallas.

El prototipo físico ya existe en `../arduino-r4/geogreen_proto/`; la transmisión
de esas lecturas hacia la aplicación es una etapa de integración distinta del
funcionamiento local del sensor, OLED, semáforo y buzzer.

El semáforo (`src/lib/status.ts`) usa los mismos umbrales que el firmware:
**< 40 % verde · 40–80 % amarillo · ≥ 80 % rojo**.
