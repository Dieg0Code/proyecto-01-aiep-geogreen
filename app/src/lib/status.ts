import type {
  Alerta,
  ContenedorConLectura,
  EstadoLlenado,
  TipoAlerta,
} from './types'

// Umbrales del semáforo — calzan con el firmware del dispositivo
// (arduino: LOW_LIMIT=40, HIGH_LIMIT=80 → LED verde / amarillo / rojo).
export const LOW_LIMIT = 40
export const HIGH_LIMIT = 80

/** Minutos sin reportar tras los cuales el contenedor se considera sin señal. */
export const OFFLINE_MIN = 15
/** Bajo este % de batería se levanta alerta. */
export const BATERIA_BAJA = 20

export function estadoLlenado(pct: number): EstadoLlenado {
  if (pct >= HIGH_LIMIT) return 'lleno'
  if (pct >= LOW_LIMIT) return 'medio'
  return 'bajo'
}

interface EstadoMeta {
  label: string
  accion: string
  /** Clase de color de texto/icono. */
  fg: string
  /** Clase de fondo suave. */
  bg: string
  /** Color hex del semáforo (para el pin del mapa y gráficos). */
  hex: string
}

export const ESTADO_META: Record<EstadoLlenado, EstadoMeta> = {
  bajo: {
    label: 'Nivel bajo',
    accion: 'Seguir monitoreando',
    fg: 'text-verde',
    bg: 'bg-verde-soft',
    hex: '#3FAE6A',
  },
  medio: {
    label: 'Nivel medio',
    accion: 'Revisar pronto',
    fg: 'text-[#b08a1f]',
    bg: 'bg-gold-soft',
    hex: '#E0BC5A',
  },
  lleno: {
    label: 'Nivel lleno',
    accion: 'Programar retiro',
    fg: 'text-rojo',
    bg: 'bg-red-pale',
    hex: '#D62027',
  },
}

export function minutosDesde(iso: string, now = Date.now()): number {
  return (now - new Date(iso).getTime()) / 60000
}

export function estaOffline(c: ContenedorConLectura, now = Date.now()): boolean {
  return minutosDesde(c.ultimaLectura, now) > OFFLINE_MIN
}

/** Nivel cualitativo de señal a partir del RSSI en dBm. */
export function nivelSenal(rssi: number): 'fuerte' | 'media' | 'debil' {
  if (rssi >= -67) return 'fuerte'
  if (rssi >= -80) return 'media'
  return 'debil'
}

export const ALERTA_META: Record<
  TipoAlerta,
  { label: string; descripcion: string; fg: string; bg: string }
> = {
  lleno: {
    label: 'Contenedor lleno',
    descripcion: 'Superó el 80% de llenado. Programar retiro.',
    fg: 'text-rojo',
    bg: 'bg-red-pale',
  },
  'bateria-baja': {
    label: 'Batería baja',
    descripcion: 'Carga bajo el 20%. Revisar alimentación del módulo.',
    fg: 'text-[#b08a1f]',
    bg: 'bg-gold-soft',
  },
  'sin-senal': {
    label: 'Sin señal',
    descripcion: 'No reporta hace más de 15 min. Verificar conectividad.',
    fg: 'text-navy',
    bg: 'bg-soft-blue',
  },
}

/** Prioridad para ordenar alertas: lleno > sin señal > batería. */
const PRIORIDAD: Record<TipoAlerta, number> = {
  lleno: 0,
  'sin-senal': 1,
  'bateria-baja': 2,
}

/** Deriva las alertas activas a partir del estado actual de los contenedores. */
export function derivarAlertas(
  contenedores: ContenedorConLectura[],
  now = Date.now(),
): Alerta[] {
  const alertas: Alerta[] = []

  for (const c of contenedores) {
    const offline = estaOffline(c, now)
    const base = {
      contenedorId: c.id,
      contenedorNombre: c.nombre,
      sector: c.sector,
    }

    if (offline) {
      alertas.push({ ...base, id: `${c.id}-sin-senal`, tipo: 'sin-senal', desde: c.ultimaLectura })
      // Si está sin señal, su llenado/batería pueden estar obsoletos: no duplicar.
      continue
    }
    if (c.llenado >= HIGH_LIMIT) {
      alertas.push({ ...base, id: `${c.id}-lleno`, tipo: 'lleno', desde: c.ultimaLectura })
    }
    if (c.bateria <= BATERIA_BAJA) {
      alertas.push({ ...base, id: `${c.id}-bat`, tipo: 'bateria-baja', desde: c.ultimaLectura })
    }
  }

  return alertas.sort((a, b) => {
    const p = PRIORIDAD[a.tipo] - PRIORIDAD[b.tipo]
    if (p !== 0) return p
    return new Date(a.desde).getTime() - new Date(b.desde).getTime()
  })
}
