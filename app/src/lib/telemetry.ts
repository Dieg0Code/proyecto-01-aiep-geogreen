import { clamp } from './utils'
import type { ContenedorConLectura, PuntoHistorial } from './types'

// ---------------------------------------------------------------------------
// Capa de telemetría. Hoy es un SIMULADOR determinista (no hay flota física
// instalada). La interfaz `TelemetryService` está pensada para sustituir la
// implementación por `fetch` a la API del ESP32 real sin tocar la UI.
// ---------------------------------------------------------------------------

/** Centro real de Osorno (Plaza de Armas) — ancla del mapa. */
export const OSORNO_CENTER: [number, number] = [-40.5739, -73.1336]

// Momento de referencia (carga del módulo): fija el llenado "actual" de cada
// contenedor en su valor de diseño, garantizando un reparto realista (varios
// llenos / medios / bajos) en cada sesión, y luego deja que evolucione en vivo.
const T_REF = Date.now()

interface ParametrosSim {
  id: string
  nombre: string
  sector: string
  lat: number
  lon: number
  /** Horas que tarda el contenedor en llenarse y reiniciarse (retiro). */
  periodoH: number
  /** Llenado de diseño (%) en el momento de referencia; ancla el reparto actual. */
  baseLlenado: number
  bateria: number
  rssi: number
  /** Minutos de antigüedad de la última lectura (alto = sin señal). */
  desfaseMin: number
}

// Coordenadas reales de Osorno, ancladas a la red vial (OSRM /nearest) para que
// caigan sobre calles y la ruta de recolección llegue exacto a cada contenedor.
const FLOTA: ParametrosSim[] = [
  { id: 'GG-01', nombre: 'Plaza de Armas', sector: 'Centro', lat: -40.57425, lon: -73.13452, periodoH: 18, baseLlenado: 88, bateria: 88, rssi: -57, desfaseMin: 1 },
  { id: 'GG-02', nombre: 'Mercado Municipal', sector: 'Centro', lat: -40.57314, lon: -73.12887, periodoH: 14, baseLlenado: 92, bateria: 73, rssi: -61, desfaseMin: 1 },
  { id: 'GG-03', nombre: 'Mall Portal Osorno', sector: 'Centro', lat: -40.57386, lon: -73.13009, periodoH: 16, baseLlenado: 35, bateria: 95, rssi: -54, desfaseMin: 2 },
  { id: 'GG-04', nombre: 'Universidad Santo Tomás', sector: 'Centro', lat: -40.57175, lon: -73.13747, periodoH: 22, baseLlenado: 64, bateria: 64, rssi: -66, desfaseMin: 2 },
  { id: 'GG-05', nombre: 'Hospital Base San José', sector: 'Pampa Alegre', lat: -40.58861, lon: -73.12809, periodoH: 20, baseLlenado: 48, bateria: 18, rssi: -72, desfaseMin: 3 },
  { id: 'GG-06', nombre: 'Universidad de Los Lagos', sector: 'Centro', lat: -40.57933, lon: -73.13258, periodoH: 24, baseLlenado: 25, bateria: 80, rssi: -60, desfaseMin: 1 },
  { id: 'GG-07', nombre: 'Liceo Industrial', sector: 'Oriente', lat: -40.5806, lon: -73.10085, periodoH: 30, baseLlenado: 70, bateria: 57, rssi: -83, desfaseMin: 70 },
  { id: 'GG-08', nombre: 'Terminal de Buses', sector: 'Ovejería', lat: -40.59061, lon: -73.14268, periodoH: 16, baseLlenado: 84, bateria: 41, rssi: -75, desfaseMin: 4 },
  { id: 'GG-09', nombre: 'Mercado de Rahue', sector: 'Rahue', lat: -40.5789, lon: -73.15599, periodoH: 15, baseLlenado: 58, bateria: 69, rssi: -70, desfaseMin: 2 },
  { id: 'GG-10', nombre: 'Rahue Alto', sector: 'Rahue Alto', lat: -40.58381, lon: -73.16922, periodoH: 26, baseLlenado: 40, bateria: 46, rssi: -88, desfaseMin: 320 },
  { id: 'GG-11', nombre: 'Supermercado Líder', sector: 'Oriente', lat: -40.58967, lon: -73.10371, periodoH: 19, baseLlenado: 30, bateria: 92, rssi: -63, desfaseMin: 2 },
  { id: 'GG-12', nombre: 'Estadio Rubén Marcos Peralta', sector: 'Pilmaiquén', lat: -40.58348, lon: -73.13075, periodoH: 34, baseLlenado: 12, bateria: 12, rssi: -69, desfaseMin: 5 },
]

/** Hash determinista de string → [0, 1). */
function hash01(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) / 4294967295
}

/**
 * Llenado en un instante dado: diente de sierra (sube y se reinicia al retirar),
 * anclado a `baseLlenado` en T_REF para garantizar el reparto actual de estados.
 */
function llenadoEn(p: ParametrosSim, ms: number): number {
  const horas = (ms - T_REF) / 3_600_000
  let ciclo = (p.baseLlenado / 100 + horas / p.periodoH) % 1
  if (ciclo < 0) ciclo += 1
  // Ruido suave por tramo de 30 min para que la curva no sea perfectamente recta.
  const tramo = Math.floor(ms / 1_800_000)
  const ruido = (hash01(`${p.id}:${tramo}`) - 0.5) * 4
  return clamp(ciclo * 100 + ruido, 0, 100)
}

function lecturaActual(p: ParametrosSim, now: number): ContenedorConLectura {
  const tsLectura = now - p.desfaseMin * 60_000
  return {
    id: p.id,
    nombre: p.nombre,
    sector: p.sector,
    lat: p.lat,
    lon: p.lon,
    llenado: Math.round(llenadoEn(p, tsLectura)),
    bateria: Math.round(clamp(p.bateria + (hash01(`${p.id}:bat`) - 0.5), 0, 100)),
    rssi: Math.round(p.rssi + (hash01(`${p.id}:rssi`) - 0.5) * 3),
    ultimaLectura: new Date(tsLectura).toISOString(),
  }
}

export interface TelemetryService {
  getContenedores(now?: number): ContenedorConLectura[]
  getContenedor(id: string, now?: number): ContenedorConLectura | undefined
  getHistorial(id: string, opts?: { horas?: number; puntos?: number; now?: number }): PuntoHistorial[]
}

export const telemetry: TelemetryService = {
  getContenedores(now = Date.now()) {
    return FLOTA.map((p) => lecturaActual(p, now))
  },

  getContenedor(id, now = Date.now()) {
    const p = FLOTA.find((c) => c.id === id)
    return p ? lecturaActual(p, now) : undefined
  },

  getHistorial(id, opts = {}) {
    const { horas = 24, puntos = 48, now = Date.now() } = opts
    const p = FLOTA.find((c) => c.id === id)
    if (!p) return []
    const paso = (horas * 3_600_000) / (puntos - 1)
    return Array.from({ length: puntos }, (_, i) => {
      const ms = now - (puntos - 1 - i) * paso
      return { t: new Date(ms).toISOString(), llenado: Math.round(llenadoEn(p, ms)) }
    })
  },
}
