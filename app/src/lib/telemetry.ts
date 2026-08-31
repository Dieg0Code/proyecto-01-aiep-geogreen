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
  direccion: string
  lat: number
  lon: number
  osmUrl: string
  perfil: PerfilActividad
  /** Horas equivalentes de actividad que tarda en llenarse y reiniciarse. */
  periodoH: number
  /** Llenado de diseño (%) en el momento de referencia; ancla el reparto actual. */
  baseLlenado: number
  bateria: number
  rssi: number
  /** Minutos de antigüedad de la última lectura (alto = sin señal). */
  desfaseMin: number
}

type PerfilActividad =
  | 'espacio-publico'
  | 'mercado'
  | 'comercio'
  | 'educacion'
  | 'salud'
  | 'transporte'
  | 'deporte'

// Lugares y coordenadas verificadas contra OpenStreetMap/Nominatim y, cuando
// existe, la dirección publicada por la institución. La telemetría es simulada;
// la geografía no. El motor de rutas ajusta estos centroides a la calle cercana.
const FLOTA: ParametrosSim[] = [
  { id: 'GG-01', nombre: 'Plaza de Armas de Osorno', sector: 'Centro', direccion: 'Plaza de Armas de Osorno', lat: -40.5736242, lon: -73.1358144, osmUrl: 'https://www.openstreetmap.org/way/27420261', perfil: 'espacio-publico', periodoH: 42, baseLlenado: 76, bateria: 88, rssi: -61, desfaseMin: 2 },
  { id: 'GG-02', nombre: 'Mercado Municipal de Osorno', sector: 'Centro', direccion: 'Federico Errázuriz, Osorno', lat: -40.5729830, lon: -73.1287142, osmUrl: 'https://www.openstreetmap.org/node/1288545916', perfil: 'mercado', periodoH: 18, baseLlenado: 91, bateria: 73, rssi: -59, desfaseMin: 1 },
  { id: 'GG-03', nombre: 'Portal Osorno', sector: 'Centro', direccion: 'Plaza Yungay 645, Osorno', lat: -40.5741404, lon: -73.1305151, osmUrl: 'https://www.openstreetmap.org/way/236439770', perfil: 'comercio', periodoH: 28, baseLlenado: 63, bateria: 95, rssi: -55, desfaseMin: 2 },
  { id: 'GG-04', nombre: 'Universidad Santo Tomás · Sede Osorno', sector: 'Centro', direccion: 'Los Carrera 753, Osorno', lat: -40.5720525, lon: -73.1374923, osmUrl: 'https://www.openstreetmap.org/way/313839874', perfil: 'educacion', periodoH: 46, baseLlenado: 47, bateria: 64, rssi: -66, desfaseMin: 2 },
  { id: 'GG-05', nombre: 'Hospital Base San José de Osorno', sector: 'Pampa Alegre', direccion: 'Av. Dr. Guillermo Bühler 1765, Osorno', lat: -40.5878934, lon: -73.1281111, osmUrl: 'https://www.openstreetmap.org/way/144924895', perfil: 'salud', periodoH: 30, baseLlenado: 54, bateria: 38, rssi: -72, desfaseMin: 3 },
  { id: 'GG-06', nombre: 'Universidad de Los Lagos · Casa Central', sector: 'Centro', direccion: 'Lord Cochrane 1046, Osorno', lat: -40.5793089, lon: -73.1323055, osmUrl: 'https://www.openstreetmap.org/node/11125160460', perfil: 'educacion', periodoH: 52, baseLlenado: 29, bateria: 80, rssi: -60, desfaseMin: 1 },
  { id: 'GG-07', nombre: 'Liceo Industrial Osorno', sector: 'Oriente', direccion: 'Guillermo Hollstein 125, Osorno', lat: -40.5809982, lon: -73.1014136, osmUrl: 'https://www.openstreetmap.org/way/815004860', perfil: 'educacion', periodoH: 58, baseLlenado: 68, bateria: 57, rssi: -83, desfaseMin: 70 },
  { id: 'GG-08', nombre: 'Terminal Línea 9 · Ovejería', sector: 'Ovejería', direccion: 'Terminal Línea 9, Ovejería, Osorno', lat: -40.5902803, lon: -73.1424638, osmUrl: 'https://www.openstreetmap.org/way/998571072', perfil: 'transporte', periodoH: 24, baseLlenado: 84, bateria: 41, rssi: -75, desfaseMin: 4 },
  { id: 'GG-09', nombre: 'Mercado Municipal de Rahue', sector: 'Rahue Bajo', direccion: 'Tarapacá, Rahue Bajo, Osorno', lat: -40.5791546, lon: -73.1560277, osmUrl: 'https://www.openstreetmap.org/way/313085787', perfil: 'mercado', periodoH: 21, baseLlenado: 58, bateria: 69, rssi: -70, desfaseMin: 2 },
  { id: 'GG-10', nombre: 'Complejo Deportivo Rahue Alto', sector: 'Rahue Alto', direccion: 'Av. Nueva Poniente, Rahue Alto, Osorno', lat: -40.5811211, lon: -73.1733818, osmUrl: 'https://www.openstreetmap.org/way/144884099', perfil: 'deporte', periodoH: 64, baseLlenado: 41, bateria: 46, rssi: -74, desfaseMin: 3 },
  { id: 'GG-11', nombre: 'Líder René Soriano', sector: 'Oriente', direccion: 'Av. Alcalde René Soriano 2855, Osorno', lat: -40.5893667, lon: -73.1040604, osmUrl: 'https://www.openstreetmap.org/way/144926317', perfil: 'comercio', periodoH: 26, baseLlenado: 31, bateria: 92, rssi: -63, desfaseMin: 2 },
  { id: 'GG-12', nombre: 'Estadio Municipal Rubén Marcos Peralta', sector: 'Pilmaiquén', direccion: 'Sector Pilmaiquén, Osorno', lat: -40.5835039, lon: -73.1309432, osmUrl: 'https://www.openstreetmap.org/relation/7683599', perfil: 'deporte', periodoH: 72, baseLlenado: 14, bateria: 12, rssi: -69, desfaseMin: 5 },
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

function factorActividad(perfil: PerfilActividad, ms: number): number {
  const fecha = new Date(ms)
  const hora = fecha.getHours() + fecha.getMinutes() / 60
  const finDeSemana = fecha.getDay() === 0 || fecha.getDay() === 6

  switch (perfil) {
    case 'mercado':
      if (hora < 5 || hora >= 21) return 0.05
      if (hora < 7) return 0.75
      if (hora < 15) return 1.3
      if (hora < 19) return 0.55
      return 0.18
    case 'comercio':
      if (hora < 8 || hora >= 23) return 0.05
      if (hora < 11) return 0.5
      if (hora < 20) return 1
      return 0.45
    case 'educacion':
      if (finDeSemana) return hora >= 9 && hora < 17 ? 0.14 : 0.02
      if (hora < 7 || hora >= 20) return 0.02
      if (hora < 9) return 0.55
      if (hora < 16) return 1
      return 0.42
    case 'salud':
      if (hora < 7) return 0.45
      if (hora < 19) return 0.9
      return 0.62
    case 'transporte':
      if (hora < 5) return 0.2
      if (hora < 9) return 0.8
      if (hora < 17) return 0.48
      if (hora < 22) return 0.78
      return 0.32
    case 'deporte':
      if (finDeSemana) return hora >= 10 && hora < 22 ? 0.72 : 0.06
      if (hora < 16 || hora >= 23) return 0.05
      return 0.62
    case 'espacio-publico':
      if (hora < 7) return 0.12
      if (hora < 11) return 0.55
      if (hora < 20) return 0.9
      return 0.48
  }
}

/** Integra actividad ponderada en tramos de 15 minutos. */
function horasActividadEntre(desde: number, hasta: number, perfil: PerfilActividad): number {
  if (desde === hasta) return 0
  const signo = hasta > desde ? 1 : -1
  const inicio = Math.min(desde, hasta)
  const fin = Math.max(desde, hasta)
  const paso = 15 * 60_000
  let acumulado = 0

  for (let t = inicio; t < fin; t += paso) {
    const siguiente = Math.min(t + paso, fin)
    acumulado += ((siguiente - t) / 3_600_000) * factorActividad(perfil, (t + siguiente) / 2)
  }
  return acumulado * signo
}

/**
 * El llenado crece según el patrón horario del lugar y reinicia al completarse
 * un ciclo de retiro. El ruido representa variación normal del sensor.
 */
function llenadoEn(p: ParametrosSim, ms: number): number {
  const horasActivas = horasActividadEntre(T_REF, ms, p.perfil)
  let ciclo = (p.baseLlenado / 100 + horasActivas / p.periodoH) % 1
  if (ciclo < 0) ciclo += 1
  const fase = hash01(p.id) * Math.PI * 2
  const ruido = Math.sin(ms / 3_600_000 * 0.72 + fase) * 0.8
  return clamp(ciclo * 100 + ruido, 0, 100)
}

function lecturaActual(p: ParametrosSim, now: number): ContenedorConLectura {
  const tsLectura = now - p.desfaseMin * 60_000
  return {
    id: p.id,
    nombre: p.nombre,
    sector: p.sector,
    direccion: p.direccion,
    lat: p.lat,
    lon: p.lon,
    osmUrl: p.osmUrl,
    llenado: Math.round(llenadoEn(p, tsLectura)),
    bateria: Math.round(clamp(p.bateria + (hash01(`${p.id}:bat`) - 0.5), 0, 100)),
    rssi: Math.round(p.rssi + (hash01(`${p.id}:rssi:${Math.floor(tsLectura / 300_000)}`) - 0.5) * 4),
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
