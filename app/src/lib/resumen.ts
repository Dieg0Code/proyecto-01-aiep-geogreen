import type { ContenedorConLectura } from './types'
import { BATERIA_BAJA, estaOffline, estadoLlenado } from './status'

export interface ResumenFlota {
  total: number
  llenos: number
  medios: number
  bajos: number
  offline: number
  bateriaBaja: number
}

export function resumirFlota(
  contenedores: ContenedorConLectura[],
  now = Date.now(),
): ResumenFlota {
  const r: ResumenFlota = { total: contenedores.length, llenos: 0, medios: 0, bajos: 0, offline: 0, bateriaBaja: 0 }
  for (const c of contenedores) {
    if (estaOffline(c, now)) {
      r.offline++
      continue
    }
    if (c.bateria <= BATERIA_BAJA) r.bateriaBaja++
    const e = estadoLlenado(c.llenado)
    if (e === 'lleno') r.llenos++
    else if (e === 'medio') r.medios++
    else r.bajos++
  }
  return r
}

export type Filtro = 'todos' | 'lleno' | 'medio' | 'bajo' | 'offline' | 'bateria'

export function pasaFiltro(c: ContenedorConLectura, filtro: Filtro, now = Date.now()): boolean {
  const offline = estaOffline(c, now)
  switch (filtro) {
    case 'todos':
      return true
    case 'offline':
      return offline
    case 'bateria':
      return !offline && c.bateria <= BATERIA_BAJA
    default:
      return !offline && estadoLlenado(c.llenado) === filtro
  }
}
