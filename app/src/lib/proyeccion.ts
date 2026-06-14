import type { PuntoHistorial } from './types'

export interface Proyeccion {
  /** Horas estimadas hasta el 100% de llenado, o null si no hay tendencia clara. */
  horasParaLlenar: number | null
  /** Velocidad de llenado estimada en % por hora. */
  tasaPorHora: number
}

/** Tamaño de caída entre lecturas que se interpreta como un retiro (reinicio). */
const SALTO_RESET = 25

/**
 * Estima cuánto falta para que el contenedor se llene, proyectando la tendencia
 * reciente. Solo considera el tramo posterior al último retiro para no mezclar
 * ciclos, y descarta tendencias planas o decrecientes.
 */
export function proyectarLlenado(
  historial: PuntoHistorial[],
  llenadoActual: number,
): Proyeccion {
  if (historial.length < 3 || llenadoActual >= 100) {
    return { horasParaLlenar: null, tasaPorHora: 0 }
  }

  // Recortar al tramo posterior al último reinicio (caída brusca).
  let inicio = 0
  for (let i = 1; i < historial.length; i++) {
    if (historial[i - 1].llenado - historial[i].llenado > SALTO_RESET) inicio = i
  }
  const tramo = historial.slice(inicio)
  if (tramo.length < 3) return { horasParaLlenar: null, tasaPorHora: 0 }

  // Regresión lineal: x en horas desde el primer punto del tramo, y = llenado.
  const t0 = new Date(tramo[0].t).getTime()
  const puntos = tramo.map((p) => ({
    x: (new Date(p.t).getTime() - t0) / 3_600_000,
    y: p.llenado,
  }))
  const n = puntos.length
  const sx = puntos.reduce((a, p) => a + p.x, 0)
  const sy = puntos.reduce((a, p) => a + p.y, 0)
  const sxy = puntos.reduce((a, p) => a + p.x * p.y, 0)
  const sxx = puntos.reduce((a, p) => a + p.x * p.x, 0)
  const denom = n * sxx - sx * sx
  const pendiente = denom === 0 ? 0 : (n * sxy - sx * sy) / denom

  // Tendencia plana o decreciente → sin proyección.
  if (pendiente < 0.5) return { horasParaLlenar: null, tasaPorHora: pendiente }

  return {
    horasParaLlenar: (100 - llenadoActual) / pendiente,
    tasaPorHora: pendiente,
  }
}

/** Texto legible: "~5 h", "~40 min", "menos de 1 h". */
export function formatearProyeccion(horas: number | null): string {
  if (horas === null) return 'Sin tendencia de llenado'
  if (horas < 1) return `${Math.round(horas * 60)} min`
  if (horas < 48) return `~${Math.round(horas)} h`
  return `~${Math.round(horas / 24)} días`
}
