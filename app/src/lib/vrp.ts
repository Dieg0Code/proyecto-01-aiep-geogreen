import type { LatLon } from './geo'

// Solver CVRP (Capacitated Vehicle Routing Problem) sobre una matriz de tiempos
// reales. Construcción por barrido angular (sweep) balanceado por carga +
// refinamiento local 2-opt / Or-opt. Es la misma familia de heurísticas que usan
// motores como VROOM; corre 100% en el cliente, sin servicios externos.
//
// Convención de índices: 0 = base (depósito); 1..n = contenedores.

export interface RutaVehiculo {
  /** Camión asignado (0-indexed). */
  vehiculo: number
  /** Índices de matriz (1..n) en orden de visita. */
  orden: number[]
  cargaM3: number
}

/** Costo (tiempo) de un tour cerrado base → ...orden... → base. */
function costoTour(d: number[][], orden: number[]): number {
  if (orden.length === 0) return 0
  let t = d[0][orden[0]] + d[orden[orden.length - 1]][0]
  for (let i = 0; i < orden.length - 1; i++) t += d[orden[i]][orden[i + 1]]
  return t
}

/** 2-opt: invierte segmentos mientras mejore el tour cerrado. */
function dosOpt(orden: number[], d: number[][]): number[] {
  if (orden.length < 3) return orden
  const ruta = [0, ...orden, 0]
  let mejora = true
  while (mejora) {
    mejora = false
    for (let i = 1; i < ruta.length - 2; i++) {
      for (let k = i + 1; k < ruta.length - 1; k++) {
        const delta =
          d[ruta[i - 1]][ruta[k]] +
          d[ruta[i]][ruta[k + 1]] -
          (d[ruta[i - 1]][ruta[i]] + d[ruta[k]][ruta[k + 1]])
        if (delta < -1e-6) {
          let a = i
          let b = k
          while (a < b) {
            const tmp = ruta[a]
            ruta[a] = ruta[b]
            ruta[b] = tmp
            a++
            b--
          }
          mejora = true
        }
      }
    }
  }
  return ruta.slice(1, -1)
}

/** Or-opt: reubica un nodo en la mejor posición mientras mejore. */
function orOpt(orden: number[], d: number[][]): number[] {
  if (orden.length < 3) return orden
  let best = [...orden]
  let mejora = true
  while (mejora) {
    mejora = false
    for (let i = 0; i < best.length; i++) {
      const sin = best.slice(0, i).concat(best.slice(i + 1))
      const nodo = best[i]
      let mejorCosto = costoTour(d, best)
      let mejorPos = -1
      for (let j = 0; j <= sin.length; j++) {
        const cand = sin.slice(0, j).concat(nodo, sin.slice(j))
        const c = costoTour(d, cand)
        if (c < mejorCosto - 1e-6) {
          mejorCosto = c
          mejorPos = j
        }
      }
      if (mejorPos >= 0) {
        best = sin.slice(0, mejorPos).concat(nodo, sin.slice(mejorPos))
        mejora = true
      }
    }
  }
  return best
}

function anguloDesdeBase(base: LatLon, p: LatLon): number {
  // lat = eje Y, lon = eje X
  return Math.atan2(p[0] - base[0], p[1] - base[1])
}

export interface OpcionesVRP {
  camiones: number
  capacidadM3: number
}

/**
 * Reparte los contenedores en K camiones por barrido angular balanceado por carga,
 * respeta la capacidad (si una zona excede, se parte en otra vuelta) y optimiza la
 * secuencia de cada ruta con 2-opt + Or-opt.
 */
export function resolverCVRP(
  durations: number[][],
  puntos: LatLon[],
  demandas: number[],
  { camiones, capacidadM3 }: OpcionesVRP,
): RutaVehiculo[] {
  const n = puntos.length - 1
  if (n === 0) return []

  const indices = Array.from({ length: n }, (_, i) => i + 1)
  indices.sort(
    (a, b) => anguloDesdeBase(puntos[0], puntos[a]) - anguloDesdeBase(puntos[0], puntos[b]),
  )

  const k = Math.max(1, Math.min(camiones, n))

  // Reparto angular en k zonas con cantidad de paradas equilibrada (garantiza k
  // zonas no vacías cuando hay al menos k contenedores).
  const zonas: number[][] = Array.from({ length: k }, () => [])
  indices.forEach((idx, i) => {
    zonas[Math.min(k - 1, Math.floor((i * k) / n))].push(idx)
  })

  // Cada zona → uno o más viajes según capacidad → secuencia optimizada.
  const rutas: RutaVehiculo[] = []
  zonas.forEach((z, vehiculo) => {
    let viaje: number[] = []
    let carga = 0
    const viajes: number[][] = []
    for (const idx of z) {
      if (viaje.length && carga + demandas[idx] > capacidadM3) {
        viajes.push(viaje)
        viaje = []
        carga = 0
      }
      viaje.push(idx)
      carga += demandas[idx]
    }
    if (viaje.length) viajes.push(viaje)

    for (const v of viajes) {
      const orden = dosOpt(orOpt(v, durations), durations)
      rutas.push({
        vehiculo,
        orden,
        cargaM3: v.reduce((s, i) => s + demandas[i], 0),
      })
    }
  })

  return rutas
}
