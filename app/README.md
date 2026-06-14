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

## Datos: simulados hoy, ESP32 mañana

Hoy no hay flota física, así que `src/lib/telemetry.ts` es un **simulador
determinista** de ~12 contenedores en Osorno. Está detrás de la interfaz
`TelemetryService`; para conectar dispositivos reales basta reemplazar esa
implementación por `fetch` a la API del ESP32 — la UI no cambia.

El semáforo (`src/lib/status.ts`) usa los mismos umbrales que el firmware:
**< 40 % verde · 40–80 % amarillo · ≥ 80 % rojo**.
