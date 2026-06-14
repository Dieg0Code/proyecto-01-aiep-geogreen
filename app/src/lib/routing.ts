import type { ContenedorConLectura } from './types'
import type { LatLon } from './geo'
import {
  PUNTO_PARTIDA,
  VOLUMEN_CONTENEDOR_M3,
  lineaRuta,
  planificarRuta,
  type ParadaRuta,
} from './ruta'
import { resolverCVRP } from './vrp'

// Ruteo vial keyless sobre OSRM público (perfil `driving` → respeta sentidos y
// giros). Cambiar OSRM_BASE por el mirror FOSSGIS si el host principal falla:
//   https://routing.openstreetmap.de/routed-car
const OSRM_BASE = 'https://router.project-osrm.org'
const TIMEOUT_MS = 8000

export interface RutaCamion {
  vehiculo: number
  paradas: ParadaRuta[]
  /** Geometría vial (sigue las calles, o recta si es aproximada). */
  geometria: LatLon[]
  distanciaKm: number
  duracionMin: number
  cargaM3: number
}

export interface SolucionVRP {
  rutas: RutaCamion[]
  distanciaKm: number
  duracionMin: number | null
  aproximada: boolean
}

export interface OpcionesVRP {
  camiones: number
  capacidadM3: number
  inicio?: LatLon
}

async function fetchJSON(url: string): Promise<any> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

const toCoords = (pts: LatLon[]) => pts.map(([lat, lon]) => `${lon},${lat}`).join(';')

/** Matriz de tiempos de manejo (segundos) entre todos los puntos (índice 0 = base). */
async function tablaOSRM(coords: LatLon[]): Promise<number[][]> {
  const url = `${OSRM_BASE}/table/v1/driving/${toCoords(coords)}?annotations=duration`
  const data = await fetchJSON(url)
  if (data.code !== 'Ok' || !data.durations) throw new Error('OSRM table')
  return data.durations as number[][]
}

/** Geometría vial de una secuencia de puntos (sigue las calles). */
async function geometriaDe(
  secuencia: LatLon[],
): Promise<{ geometria: LatLon[]; distanciaKm: number; duracionMin: number }> {
  const url = `${OSRM_BASE}/route/v1/driving/${toCoords(secuencia)}?overview=full&geometries=geojson`
  const data = await fetchJSON(url)
  const r = data.routes?.[0]
  if (data.code !== 'Ok' || !r) throw new Error('OSRM route')
  return {
    geometria: (r.geometry.coordinates as [number, number][]).map(([lon, lat]): LatLon => [lat, lon]),
    distanciaKm: r.distance / 1000,
    duracionMin: r.duration / 60,
  }
}

const demandaDe = (c: ContenedorConLectura) => (c.llenado / 100) * VOLUMEN_CONTENEDOR_M3

/** Fallback sin ruteo: una sola ruta en línea recta (vecino más próximo), marcada. */
function fallback(contenedores: ContenedorConLectura[], inicio: LatLon): SolucionVRP {
  const r = planificarRuta(contenedores, inicio)
  return {
    rutas: [
      {
        vehiculo: 0,
        paradas: r.paradas,
        geometria: [...lineaRuta(r, inicio), inicio],
        distanciaKm: r.distanciaKm,
        duracionMin: 0,
        cargaM3: contenedores.reduce((s, c) => s + demandaDe(c), 0),
      },
    ],
    distanciaKm: r.distanciaKm,
    duracionMin: null,
    aproximada: true,
  }
}

/**
 * Resuelve el VRP de recolección: matriz de tiempos reales (OSRM) → reparto en K
 * camiones con capacidad (CVRP) → geometría vial por camión. Cada ruta parte y
 * vuelve a la base. Cae a una ruta aproximada recta si OSRM no responde.
 */
export async function calcularVRP(
  contenedores: ContenedorConLectura[],
  { camiones, capacidadM3, inicio = PUNTO_PARTIDA }: OpcionesVRP,
): Promise<SolucionVRP> {
  if (contenedores.length === 0) {
    return { rutas: [], distanciaKm: 0, duracionMin: null, aproximada: false }
  }

  const coords: LatLon[] = [inicio, ...contenedores.map((c): LatLon => [c.lat, c.lon])]
  const demandas = [0, ...contenedores.map(demandaDe)]

  try {
    const durations = await tablaOSRM(coords)
    const solucion = resolverCVRP(durations, coords, demandas, { camiones, capacidadM3 })

    const rutas: RutaCamion[] = []
    let totalKm = 0
    let totalMin = 0
    for (const r of solucion) {
      const secuencia: LatLon[] = [inicio, ...r.orden.map((i) => coords[i]), inicio]
      const geo = await geometriaDe(secuencia)
      rutas.push({
        vehiculo: r.vehiculo,
        paradas: r.orden.map((mi, k) => ({
          contenedor: contenedores[mi - 1],
          orden: k + 1,
          distanciaDesdeAnterior: 0,
        })),
        geometria: geo.geometria,
        distanciaKm: geo.distanciaKm,
        duracionMin: geo.duracionMin,
        cargaM3: r.cargaM3,
      })
      totalKm += geo.distanciaKm
      totalMin += geo.duracionMin
    }
    return { rutas, distanciaKm: totalKm, duracionMin: totalMin, aproximada: false }
  } catch {
    return fallback(contenedores, inicio)
  }
}
