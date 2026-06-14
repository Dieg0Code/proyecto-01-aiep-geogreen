import type { ContenedorConLectura } from './types'
import { haversineKm, type LatLon } from './geo'
import { estaOffline, estadoLlenado } from './status'

/**
 * Base de la recolección: el Vertedero/Relleno de Curaco (sitio de disposición real
 * de la provincia de Osorno, al poniente). Los camiones parten y vuelven aquí.
 */
export const PUNTO_PARTIDA: LatLon = [-40.57577, -73.22257]
export const NOMBRE_BASE = 'Vertedero Curaco'

/** Capacidad útil de un recolector compactador típico (Servitrans usa ~este rango). */
export const CAPACIDAD_CAMION_M3 = 19
/** Volumen de un contenedor comunal lleno (1.100 L). */
export const VOLUMEN_CONTENEDOR_M3 = 1.1
/** Color por camión en el mapa/resumen (sobrio, distinto del semáforo). */
export const COLORES_CAMION = ['#102A43', '#B45309', '#0F766E']

export interface ParadaRuta {
  contenedor: ContenedorConLectura
  orden: number
  distanciaDesdeAnterior: number
}

export interface Ruta {
  paradas: ParadaRuta[]
  distanciaKm: number
}

/** Qué contenedores entran en la ruta de retiro. */
export type AlcanceRuta = 'llenos' | 'medios' | 'todos'

/**
 * Contenedores a incluir en el retiro (siempre excluye los sin señal, porque su
 * estado está obsoleto). Por defecto incluye llenos + medios: si el camión ya
 * sale, conviene vaciar también los medios y evitar un segundo viaje.
 */
export function contenedoresParaRetiro(
  contenedores: ContenedorConLectura[],
  alcance: AlcanceRuta = 'medios',
  now = Date.now(),
): ContenedorConLectura[] {
  return contenedores.filter((c) => {
    if (estaOffline(c, now)) return false
    if (alcance === 'todos') return true
    const e = estadoLlenado(c.llenado)
    return alcance === 'llenos' ? e === 'lleno' : e === 'lleno' || e === 'medio'
  })
}

/**
 * Ordena los contenedores en un recorrido por cercanía (heurística del vecino
 * más próximo) partiendo desde `PUNTO_PARTIDA`. Suficiente para priorizar el
 * retiro; no pretende ser una ruta vial real.
 */
export function planificarRuta(
  contenedores: ContenedorConLectura[],
  inicio: LatLon = PUNTO_PARTIDA,
): Ruta {
  const restantes = [...contenedores]
  const paradas: ParadaRuta[] = []
  let actual = inicio
  let total = 0
  let orden = 1

  while (restantes.length > 0) {
    let mejor = 0
    let mejorDist = Infinity
    for (let i = 0; i < restantes.length; i++) {
      const d = haversineKm(actual, [restantes[i].lat, restantes[i].lon])
      if (d < mejorDist) {
        mejorDist = d
        mejor = i
      }
    }
    const [c] = restantes.splice(mejor, 1)
    paradas.push({ contenedor: c, orden: orden++, distanciaDesdeAnterior: mejorDist })
    total += mejorDist
    actual = [c.lat, c.lon]
  }

  return { paradas, distanciaKm: total }
}

/** Filas para dibujar la polyline: partida → cada parada en orden. */
export function lineaRuta(ruta: Ruta, inicio: LatLon = PUNTO_PARTIDA): LatLon[] {
  return [inicio, ...ruta.paradas.map((p): LatLon => [p.contenedor.lat, p.contenedor.lon])]
}
